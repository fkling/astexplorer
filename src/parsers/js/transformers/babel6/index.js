import compileModule from '../../../utils/compileModule';
import pkg from 'babel6/babel6-package';

const ID = 'babelv6';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babylon6',

  loadTransformer(callback) {
    require([
      'babel6',
      'babel-preset-syntax-from-presets',
    ], (babel, syntaxPreset) => callback({ babel, syntaxPreset }));
  },

  transform({ babel, syntaxPreset, presets }, transformCode, code) {
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    return babel.transform(code, {
      presets: [syntaxPreset],
      plugins: [(transform.default || transform)(babel)],
      sourceMaps: true,
    });
  },
};
