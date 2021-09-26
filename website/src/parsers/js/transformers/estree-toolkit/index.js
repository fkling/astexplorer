import compileModule from '../../../utils/compileModule';
import pkg from 'estree-toolkit/package.json';

const ID = 'estree-toolkit';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/sarsamurmu/estree-toolkit',

  defaultParserID: 'meriyah',

  loadTransformer(callback) {
    require(
      [
        '../../../transpilers/babel',
        'estree-toolkit',
        'recast',
        'acorn',
        'espree',
        'esprima',
        'meriyah',
        'seafox',
        'tenko',
      ],
      (transpile, estreeToolkit, recast, acorn, espree, esprima, meriyah, seafox, tenko) => {
        callback({
          transpile: transpile.default,
          estreeToolkit,
          recast,
          parsers: { acorn, espree, esprima, meriyah, seafox, tenko },
        });
      },
    );
  },

  transform(
    { transpile, estreeToolkit, recast, parsers },
    transformCode,
    code,
  ) {
    transformCode = transpile(transformCode);
    const transformModule = compileModule( // eslint-disable-line no-shadow
      transformCode,
    );
    const transform = transformModule.__esModule ?
      transformModule.default :
      transformModule;

    const ast = transform(code, { estreeToolkit, parsers });

    if (ast == null) {
      throw new Error('`transform` function must return an AST object');
    }

    return recast.print(ast);
  },
};
