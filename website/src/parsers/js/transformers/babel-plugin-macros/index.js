import compileModule from '../../../utils/compileModule';
import pkg from 'babel-plugin-macros/package';

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
      'babel-plugin-macros',
    ], (transpile, babel, recast, macro) => callback({ transpile: transpile.default, babel, recast, macro}));
  },

  transform({ transpile, babel, recast, macro}, transformCode, code) {
    transformCode = transpile(transformCode);
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode,
      {createMacro: macro.createMacro, MacroError: macro.MacroError},
    );

    return babel.transform(code, {
      parserOpts: {
        parser: recast.parse,
        plugins: [
          'asyncGenerators',
          'bigInt',
          'classPrivateMethods',
          'classPrivateProperties',
          'classProperties',
          ['decorators', {decoratorsBeforeExport: false}],
          'doExpressions',
          'dynamicImport',
          'exportDefaultFrom',
          'exportNamespaceFrom',
          'flow',
          'flowComments',
          'functionBind',
          'functionSent',
          'importMeta',
          'jsx',
          'logicalAssignment',
          'nullishCoalescingOperator',
          'numericSeparator',
          'objectRestSpread',
          'optionalCatchBinding',
          'optionalChaining',
          ['pipelineOperator', {proposal: 'minimal'}],
          'throwExpressions',
        ],
      },
      generatorOpts: {
        generator: recast.print,
      },
      plugins: [macro(babel, {require: () => transform, resolvePath: src => src})],
      sourceMaps: true,
    });
  },
};
