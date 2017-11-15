import compileModule from '../../../utils/compileModule';
import pkg from 'babel7/babel7-package';

const ID = 'babelv7';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babylon7',

  loadTransformer(callback) {
    require([
      'babel7',
      'recast',
    ], (babel, recast) => callback({ babel, recast }));
  },

  transform({ babel, recast }, transformCode, code) {
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    return babel.transform(code, {
      parserOpts: {
        parser: recast.parse,
        plugins: [
          'asyncGenerators',
          'classPrivateProperties',
          'classProperties',
          'decorators',
          'doExpressions',
          'exportExtensions',
          'flow',
          'functionSent',
          'functionBind',
          'jsx',
          'objectRestSpread',
          'dynamicImport',
          'numericSeparator',
          'optionalChaining',
          'importMeta',
          'bigInt',
          'optionalCatchBinding',
        ],
      },
      generatorOpts: {
        generator: recast.print,
      },
      plugins: [(transform.default || transform)(babel)],
      sourceMaps: true,
    });
  },
};
