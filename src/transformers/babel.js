import compileModule from './utils/compileModule';
import pkg from 'babel-core/package.json';
import defaultTransform from './transformBabel.txt';

const ID = 'babel';
const options = {
  stage: 0,
};

function transform(transformCode, code) {
  return new Promise((resolve, reject) => {
    require.ensure(['babel-core'], require => {
      try {
        const babel = require('babel-core');
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
