const Queue = require('bee-queue');
const child_process = require('child_process');
const logger = require('./logger');
const path = require('path');

const BUNDLE_DIR = path.resolve(process.env.BUNDLE_DIR);

const buildQueue = new Queue('build');

buildQueue.process(2, (job, done) => {
  const {tool, version} = job.data;
  const key = `${tool}@${version}`;
  const diff = measure();

  child_process.fork(
    path.join(__dirname, 'build.js'),
    [tool, version],
    {
      env: {
        BUNDLE_DIR,
        PATH: process.env.PATH,
      },
    }
  )
  .on('close', code => {
    if (code) {
      const error = new Error(
        `Unable to build package ${tool}@${version}`
      );
      logger.error(error);
      return done(error);
    }
    logger.log(`Built ${tool}@${version} in ${diff().toFixed(2)} sec`);
    done(null, key);
  });
});

function measure() {
  const startTime = Date.now();
  return () => ((Date.now() - startTime) / 1000);
}
