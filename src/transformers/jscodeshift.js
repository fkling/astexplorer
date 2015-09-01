import compileModule from './utils/compileModule';

var fs = require('fs');

const ID = 'jscodeshift';

const defaultTransform =
  fs.readFileSync(__dirname + '/transformJscodeshift.txt', 'utf8');

function transform({transformCode, code}) {
  return new Promise((resolve, reject) => {
    loadjs(['babel-core', 'jscodeshift'], (babel, jscodeshift) => {
      try {
        // This might throw
        var transform = compileModule(
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
  name: ID,
  defaultTransform,
  transform,
};
