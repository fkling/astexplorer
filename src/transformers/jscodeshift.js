import compileModule from './utils/compileModule';
import pkg from 'jscodeshift/package.json';

var fs = require('fs');

const ID = 'jscodeshift';

const defaultTransform =
  fs.readFileSync(__dirname + '/transformJscodeshift.txt', 'utf8');

function transform(transformCode, code) {
  return new Promise((resolve, reject) => {
    loadjs(['babel-core', 'jscodeshift'], (babel, jscodeshift) => {
      try {
        // This might throw
        let transform = compileModule( // eslint-disable-line no-shadow
          babel.transform(transformCode).code
        );
        resolve(transform(
          {
            path: 'Live.js',
            source: code,
          },
          {jscodeshift},
          {}
        ));
      } catch(ex) {
        reject(ex);
      }
    });
  });
}

export default {
  id: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  defaultParser: {
    id: 'recast',
  },
  displayName: ID,
  defaultTransform,
  transform,
};
