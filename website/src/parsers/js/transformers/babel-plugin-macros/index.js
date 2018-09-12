import compileModule from '../../../utils/compileModule';
import pkg from 'babel-plugin-macros/package';
import macro, {createMacro, MacroError} from 'babel-plugin-macros';

const ID = 'babel-plugin-macros';
export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babylon7',

  loadTransformer(callback) {
    require([
      '../../../transpilers/babel',
      'babel7',
      'recast',
    ], (transpile, babel, recast) => callback({ transpile: transpile.default, babel, recast }));
  },

  transform({ transpile, babel, recast }, transformCode, code) {
    transformCode = transpile(transformCode);
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode,
      {createMacro, MacroError}
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
          'pipelineOperator',
        ],
      },
      generatorOpts: {
        generator: recast.print,
      },
      plugins: [macro(babel, {require: () => transform})],
      sourceMaps: true,
    });
  },
};
