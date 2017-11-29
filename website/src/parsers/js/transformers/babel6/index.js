import compileModule from '../../../utils/compileModule';
import transpile from '../../../transpilers/babelTranspile';
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
      'recast',
    ], (babel, recast) => callback({ babel, recast }));
  },

  transform({ babel, recast }, transformCode, code) {
    transformCode = transpile(transformCode);
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    return babel.transform(code, {
      parserOpts: {
        parser: recast.parse,
        plugins: [
          'asyncGenerators',
          'classConstructorCall',
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
