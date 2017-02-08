const Queue = require('bee-queue');
const child_process = require('child_process');
const constants = require('../constants');
const express = require('express');
const fs = require('fs');
const logger = require('../logger');
const path = require('path');
const redis = require('redis');

const BUNDLE_DIR = path.resolve(constants.BUNDLE_DIR);

const client = redis.createClient();
const buildQueue = new Queue('build');

module.exports = express.Router()
  .get('/:tool/:version', buildTool);

function buildTool(req, res, next) {
  let {tool, version} = req.params;
  version = version.replace(/\.js$/, '');
  const bundlePath = path.join(BUNDLE_DIR, `${tool}@${version}.js`);
  const buildKey = `ae:build:${tool}`;

  function sendFile() {
    res.sendFile(bundlePath, error => {
      if (error) {
        return next(error);
      }
    });
  }

  function error(status, err) {
    res.send(status).send(err.message || msg);
  }

  // Is the version already built? Serve that one instead.
  if (exists(bundlePath)) {
    logger.log(`Serving ${tool}@${version} from file...`);
    return sendFile();
  }
  logger.log(`Requesting build of ${tool}@${version}...`);

  isBuildInProgress(buildKey, tool, version)
    .then(yes => yes ?
      waitForBuild(buildKey, tool, version) :
      build(buildKey, tool, version)
    )
    .then(() => {
      cleanup(buildKey, version);
      sendFile();
    })
    .catch(err => {
      cleanup(buildKey, version);
      res.status(500).send(err.message || err)
      logger.error(`Error: ${err.message || err}`);
    });
}

function isBuildInProgress(buildKey, tool, version) {
  return new Promise((resolve, reject) => {
    client.sismember(buildKey, version, function(err, yes) {
      if (err) {
        reject(err);
      } else {
        resolve(yes === 1);
      }
    });
  });
}

function waitForBuild(buildKey, tool, version) {
  return new Promise((resolve, reject) => {
    const handler = (jobID, result) => {
      if (result === `${tool}@${version}`) {
        clearTimeout(timer);
        resolve();
      }
    };
    // Cancel the request if we have to wait longer than 30 sec
    const timer = setTimeout(() => {
      buildQueue.removeListener('job succeeded', handler);
      reject(new Error('Tool build timeout'));
    }, 30000);

    buildQueue.on('job succeeded', handler);
  });
}

function build(buildKey, tool, version) {
  return new Promise((resolve, reject) => {
    client.sadd(buildKey, version, err => {
      if (err) {
        return reject(err);
      }

      buildQueue.createJob({tool, version})
        .timeout(30000)
        .save((err, job) => {
          if (err) {
            reject(err);
          }
        })
        .on('succeeded', () => resolve())
        .on('failed', err => reject(err));
    });
  });
}

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch(e) {}
  return false;
}

function cleanup(key, version) {
  client.srem(key, version);
}
