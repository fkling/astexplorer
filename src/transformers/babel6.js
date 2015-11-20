import compileModule from './utils/compileModule';
import pkg from 'babel6/node_modules/babel-core/package.json';

var fs = require('fs');

const ID = 'babelv6';

const defaultTransform =
  fs.readFileSync(__dirname + '/transformBabel6.txt', 'utf8');


function transform(transformCode, code) {
  return new Promise((resolve, reject) => {
    loadjs(
      ['babel-preset-es2015', 'babel-preset-stage-0', 'babel-preset-react', 'babel6'],
      (es2015, stage0, react, babel) => {
        const options = {
          presets: [es2015, stage0, react],
        };
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
                plugins: [(transform['default'] || transform)(babel)],
              }
            ).code
          );
        } catch(ex) {
          reject(ex);
        }
      }
    );
  });
}

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  defaultParser: {
    id: 'babylon6',
  },
  defaultTransform,
  transform,
};
