#!/usr/bin/env node

require('isomorphic-fetch');
const fs = require('fs-promise');
const path = require('path');
const semver = require('semver');
const child_process = require('child_process');
const rollup = require('rollup');

const REGISTRY_DIR = process.env.REGISTRY_DIR;
const BUNDLE_DIR = process.env.BUNDLE_DIR;

const toolID = process.argv[2];
const version = process.argv[3];

if (!(toolID && version)) {
  console.error('You need to provide a tool ID and a version to build');
}

buildVersion(toolID, version)
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

function buildVersion(toolID, version) {
  const toolDir = path.join(REGISTRY_DIR, toolID);
  if (!exists(toolDir)) {
    return Promise.reject(new Error(`${toolID} doesn't exist.`));
  }

  return fetchInfo(toolID, version).then(npmPkg => {
    return (
      exists(getPackagePath(toolDir)) ?
        // Find package information
        // ... in the folder itself
        matchesVersion(toolID, toolDir, version) :
        // ... or in subfolders
        fs.readdir(toolDir)
          .then(names => Promise.all(
            names
              .filter(withoutHidden)
              .map(name => {
                const versionPath = path.join(toolDir, name);
                return exists(getPackagePath(versionPath)) ?
                  matchesVersion(toolID, versionPath, version) :
                  Promise.resolve(null);
              })
          ))
          .then(pkgs => pkgs.find(x => x != null))
    )
    .then(versionPath => {
      if (!versionPath) {
        throw new Error(`No suitable package found for ${toolID}@${version}.`);
      }
      return install(npmPkg, versionPath);
    })
    .then(p => bundleVersion(p, npmPkg));
  });
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
  return fs.readJSON(getPackagePath(versionPath))
    .then(
      pkg => semver.satisfies(version, pkg.dependencies[toolID]) ?
        versionPath :
        null
    );
}

function preparePackage(npmPkg, packagePath) {
  return fs.readJSON(getPackagePath(packagePath))
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

function bundleVersion(p, npmPkg) {
  return rollup.rollup({
    entry: path.join(p, 'index.js'),
    plugins: [
      require('rollup-plugin-json')(),
      require('rollup-plugin-babel')({
        externalHelpers: true,
        presets: [
          require('babel-preset-es2015-rollup'),
          require('babel-preset-react'),
        ],
        plugins: [
          [
            require('babel-plugin-transform-object-rest-spread'),
            {"useBuiltIns": true},
          ],
        ],
      }),
      require('rollup-plugin-node-resolve')(),
      require('rollup-plugin-commonjs')(),
      require('rollup-plugin-uglify')(),
    ],
    external: [
      'react',
      'SettingsRenderer',
    ],
  })
  .then(bundle => (
    fs.ensureDir(BUNDLE_DIR)
      .then(() => bundle.write({
        format: 'amd',
        dest: path.join(BUNDLE_DIR, `${npmPkg.name}@${npmPkg.version}.js`),
        exports: 'named',
        moduleName: 'parser',
      }))
      .then(() => fs.remove(p))
  ));
}

function install(npmVersion, p) {
  console.log(`Installing ${npmVersion.name}@${npmVersion.version}...`);
  // Create version folder
  const cacheDir = path.join(p, '..', `.${npmVersion.name}@${npmVersion.version}`);
  return fs.ensureDir(cacheDir)
      .then(() => fs.copy(p, cacheDir))
      .then(() => run(
        `yarn add --prefer-offline --exact --no-lockfile --prod --no-progress ${npmVersion.dist.tarball}`,
        {cwd: cacheDir}
      ))
      .then(() => run(
        'yarn --prefer-offline --prod --no-lockfile --no-progress',
        {cwd: cacheDir}
      ))
      .then(() => cacheDir);
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
