#!/usr/bin/env node
/* eslint no-console: 0 */

require('isomorphic-fetch');
const fs = require('fs-promise');
const path = require('path');
const semver = require('semver');

const REGISTRY_DIR = path.join(__dirname, 'tools');
const BUNDLE_DIR = process.env.BUNDLE_DIR;

const diff = measure();
findPackages()
  .then(pkgs => Promise.all(pkgs.map(getVersions)))
  .then(writeInventoryFile)
  .then(() => console.log(`Built in ${diff().toFixed(2)} sec.`))
  .catch(error => console.error(error));


function findPackages() {
  return fs.readdir(REGISTRY_DIR)
    .then(tools => tools.filter(isDir).filter(withoutHidden))
    .then(tools => tools.map(
      tool => require(path.join(REGISTRY_DIR, tool, 'package.js'))
    ));
}

function getVersions(pkg) {
  return fetchInfo(pkg.name).then(npmPkg => {
    const acceptedVersions = pkg.versions.map(v => v.dependencies[pkg.name]);
    const versions = Object.keys(npmPkg.versions)
      .filter(v => acceptedVersions.some(range => semver.satisfies(v, range)));

    pkg.availableVersions = semver.lt(npmPkg['dist-tags'].latest, '1.0.0') ?
        getLatestPatchVersions(versions) :
        getLatestMinorVersions(versions);
    return pkg;
  });
}

function writeInventoryFile(data) {
  return fs.writeJSON(path.join(BUNDLE_DIR, 'inventory.json'), data.map(pkg => ({
    name: pkg.name,
    displayName: pkg.displayName,
    homepage: pkg.homepage,
    versions: pkg.availableVersions,
    category: pkg.category,
  })));
}


function fetchInfo(name) {
  console.log(`Fetching ${name}...`);
  return fetch(`https://registry.npmjs.org/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
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

function getLatestPatchVersions(versions) {
  const last = versions.length - 1;
  return versions.sort(semver.compare)
    .filter((v, i) => {
      if (i === last) {
        return true;
      }
      if (semver.diff(v, versions[i+1]) === 'patch') {
        return true;
      }
      return false;
    });
}

function withoutHidden(p) {
  return p[0] !== '.';
}

function isDir(p) {
  return !/\..{2,}$/.test(p);
}

function measure() {
  const start = Date.now();
  return function() {
    return (Date.now() - start) / 1000;
  }
}
