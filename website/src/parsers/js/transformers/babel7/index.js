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
      '../../../transpilers/babel',
      'babel7',
      'recast',
    ], (transpile, babel, recast) => callback({ transpile: transpile.default, babel, recast }));
  },

  transform({ transpile, babel, recast }, transformCode, code) {
    transformCode = transpile(transformCode);
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    return babel.transformAsync(code, {
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
      retainLines: true,
      generatorOpts: {
        generator: recast.print,
      },
      plugins: [(transform.default || transform)(babel)],
      sourceMaps: true,
    });
  },
};
