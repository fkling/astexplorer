#!/usr/bin/env node
/* eslint no-console: 0 */

require('isomorphic-fetch');
const fs = require('fs-promise');
const path = require('path');
const semver = require('semver');
const child_process = require('child_process');
const webpack = require('webpack');

const REGISTRY_DIR = path.join(__dirname, 'tools');
const BUNDLE_DIR = process.env.BUNDLE_DIR;

const toolID = process.argv[2];
const version = process.argv[3] || 'latest';

if (!(toolID && version)) {
  console.error('You need to provide a tool ID and a version to build');
}

const diff = measure();
buildVersion(toolID, version)
  .then(() => console.log(`Built in ${diff().toFixed(2)} sec.`))
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

function buildVersion(toolID, version) {
  const toolDir = path.join(REGISTRY_DIR, toolID);
  if (!exists(toolDir)) {
    return Promise.reject(new Error(`${toolID} doesn't exist.`));
  }
  const toolConfig = require(path.resolve(path.join(toolDir, 'package.js')));
  const latest = version === 'latest';

  return fetchInfo(toolID, version).then(npmPkg => {
    const version = npmPkg.version;

    const versionConfig = toolConfig.versions.find(
      config => semver.satisfies(version, config.dependencies[toolID])
    );
    if (!versionConfig) {
        throw new Error(`No suitable package found for ${toolID}@${version}.`);
    }

    return install(npmPkg, toolDir, versionConfig)
      .then(cacheDir =>
        bundleVersion(
          cacheDir,
          versionConfig,
          npmPkg,
          latest
        ).then(() => fs.remove(cacheDir))
      );
    })
}

function fetchInfo(name, version) {
  console.log(`Fetching ${name}...`);
  return fetch(`https://registry.npmjs.org/${name}/${version}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
}

function matchesVersion(toolID, versionPath, version) {
  return fs.readJSON(versionPath)
    .then(
      pkg => semver.satisfies(version, pkg.dependencies[toolID]) ?
        versionPath :
        null
    );
}

function preparePackage(npmPkg, packagePath) {
  return fs.readJSON(packagePath)
    .then(localPkg => {
      // Get all versions that need to be built
      const acceptedVersion = localPkg.dependencies[npmPkg.name];
      let versions = Object.keys(npmPkg.versions)
        .filter(v => semver.satisfies(v, acceptedVersion))
        .filter(x => x);
      if (versions.length === 0) {
        // nothing to do
        console.log(`Nothing to do for ${npmPkg.name}...`);
      }
      // versions = getLatestMinorVersions(versions);
      versions = versions.slice(0,1);
      // Install specific version and its dependencies
      return Promise.all(versions.map(
        v => install(npmPkg.versions[v], packagePath)
          .then(bundleVersion)
          .then(() => console.log('Bundle built'))
      ));
    });
}

function bundleVersion(packagePath, versionConfig, npmPkg, latest) {
  return new Promise((resolve, reject) => {
    const name = `${npmPkg.name}@${latest ? 'latest' : npmPkg.version}`;
    webpack(
      Object.assign(
        versionConfig.webpackConfig,
        {
          entry: path.join(packagePath, versionConfig.main),
          context: __dirname,
          output: {
            filename: `${name}.js`,
            path: BUNDLE_DIR,
            libraryTarget: 'amd',
          },
        }
      ),
      (err, stats) => {
        if (err) {
          return reject(err);
        }
        if (stats.hasErrors()) {
          console.error(stats.toJson().errors);
          return reject('Bundle compilation error');
        }
        resolve();
      }
    );
  });

}

function install(npmVersion, toolDir, versionConfig) {
  console.log(`Installing ${npmVersion.name}@${npmVersion.version}...`);
  // Create version folder
  const cacheDir = path.join(toolDir, '..', `.${npmVersion.name}@${npmVersion.version}`);
  const packagePath = path.join(cacheDir, 'package.json');
  return fs.ensureDir(cacheDir)
      .then(() => Promise.all([
        fs.copy(toolDir, cacheDir),
        fs.writeJSON(packagePath, pick(versionConfig, 'main', 'dependencies')),
      ]))
      .then(() => run(
        `yarn add --exact --no-lockfile --no-bin-links --prod --no-progress ${npmVersion.name}@${npmVersion.version}`,
        {cwd: cacheDir}
      ))
      .then(() => run(
        'yarn --prefer-offline --prod --no-lockfile --no-progress',
        {cwd: cacheDir}
      ))
      .then(() => cacheDir);
}

function pick(obj, ...props) {
  const result = {};
  for (var prop in obj) {
    result[prop] = obj[prop];
  }
  return result;
}

function getPackagePath(p) {
  return path.join(p, 'package.json');
}

function exists(p) {
  try {
    fs.accessSync(p, fs.constants.R_OK);
    return true;
  } catch(e) {}
  return false;
}

// Given a list of versions, these function removes all but the latest patch
// version. E.g.
// In:  [1.0.1, 1.0.2, 1.1.2, 1.1.3, 1.1.4]
// Out: [1.0.2, 1.1.4]
function getLatestMinorVersions(versions) {
  const last = versions.length - 1;
  return versions.sort(semver.compare)
    .filter((v, i) => {
      if (i === last) {
        return true;
      }
      if (semver.diff(v, versions[i+1]) === 'minor') {
        return true;
      }
      return false;
    });
}

function run(command, options) {
  options = Object.assign({}, options, {env: {PATH: process.env.PATH}});
  return new Promise((resolve, reject) => {
    child_process.exec(command, options, (error, stdout, stderr) => {
      if (error) {
        reject({error, stdout, stderr});
      } else {
        resolve({stdout, stderr});
      }
    });
  });
}

function withoutHidden(p) {
  return p[0] !== '.';
}

function measure() {
  const start = Date.now();
  return function() {
    return (Date.now() - start) / 1000;
  }
}
