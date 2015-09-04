import compileModule from './utils/compileModule';
import pkg from 'babel-core/package.json';

var fs = require('fs');

const ID = 'babel';

const defaultTransform =
  fs.readFileSync(__dirname + '/transformBabel.txt', 'utf8');

function transform({transformCode, code}) {
  return new Promise((resolve, reject) => {
    loadjs(['babel-core'], babel => {
      try {
        // This might throw
        var transform = compileModule(
          babel.transform(transformCode).code
        );

        resolve(babel.transform(
          code,
          {plugins: [transform]},
        ).code);
      } catch(ex) {
        reject(ex);
      }
    });
  });
}

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  defaultParser: {
    id: 'babylon',
  },
  defaultTransform,
  transform,
};
