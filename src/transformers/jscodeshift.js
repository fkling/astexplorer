import compileModule from './utils/compileModule';
import pkg from 'jscodeshift/package.json';
import defaultTransform from './transformJscodeshift.txt';

const ID = 'jscodeshift';

function transform(transformCode, code) {
  return new Promise((resolve, reject) => {
    require.ensure(['jscodeshift', 'babel-core'], require => {
      try {
        const jscodeshift = require('jscodeshift');
        const babel = require('babel-core');

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
