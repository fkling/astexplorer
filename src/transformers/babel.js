import compileModule from './utils/compileModule';
import pkg from 'babel-core/package.json';

var fs = require('fs');

const ID = 'babel';

const defaultTransform =
  fs.readFileSync(__dirname + '/transformBabel.txt', 'utf8');

const options = {
  stage: 0,
};

function transform({transformCode, code}) {
  return new Promise((resolve, reject) => {
    loadjs(['babel-core'], babel => {
      try {
        // This might throw
        let transform = compileModule( // eslint-disable-line no-shadow
          babel.transform(transformCode, options).code
        );

        resolve(
            babel.transform(
              code,
              {
                ...options,
                plugins: [transform],
              }
            ).code
        );
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
