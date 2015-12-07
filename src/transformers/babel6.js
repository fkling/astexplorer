import compileModule from '../utils/compileModule';
import pkg from 'babel6/node_modules/babel-core/package.json';
import defaultTransform from './transformBabel6.txt';

const ID = 'babelv6';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParser: {
    id: 'babylon6',
  },

  defaultTransform,

  loadTransformer(callback) {
    require([
      'babel6',
      'babel-preset-es2015',
      'babel-preset-stage-0',
      'babel-preset-react',
    ], (babel, ...presets) => callback({ babel, presets }));
  },

  transform({ babel, presets }, transformCode, code) {
    let transform = compileModule( // eslint-disable-line no-shadow
      babel.transform(transformCode, { presets }).code
    );

    return babel.transform(code, {
      presets,
      plugins: [(transform.default || transform)(babel)],
    }).code;
  },
};
