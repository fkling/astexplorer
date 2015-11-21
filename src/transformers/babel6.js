import compileModule from './utils/compileModule';
import pkg from 'babel6/node_modules/babel-core/package.json';
import defaultTransform from './transformBabel6.txt';

const ID = 'babelv6';

function transform(transformCode, code) {
  return new Promise((resolve, reject) => {
    require.ensure(
      [
        'babel6',
        'babel-preset-es2015',
        'babel-preset-stage-0',
        'babel-preset-react',
      ],
      require => {
        try {
          const babel = require('babel6');
          const es2015 = require('babel-preset-es2015');
          const stage0 = require('babel-preset-stage-0');
          const react = require('babel-preset-react');
          const options = {
            presets: [es2015, stage0, react],
          };

          // This might throw
          let transform = compileModule( // eslint-disable-line no-shadow
            babel.transform(transformCode, options).code
          );

          resolve(
            babel.transform(
              code,
              {
                ...options,
                plugins: [(transform.default || transform)(babel)],
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
