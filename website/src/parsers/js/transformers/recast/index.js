import compileModule from '../../../utils/compileModule';
import pkg from 'recast/package.json';

const ID = 'recast';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/benjamn/recast',

  defaultParserID: 'recast',

  loadTransformer(callback) {
    require(
      [
        '../../../transpilers/babel',
        'recast',
        'recast/parsers/acorn',
        'recast/parsers/babel',
        'recast/parsers/babylon',
        'recast/parsers/esprima',
        'recast/parsers/flow',
        'recast/parsers/typescript',
      ],
      (transpile, recast, acorn, babel, babylon, esprima, flow, typescript) => {
        callback({
          transpile: transpile.default,
          recast,
          parsers: {
            acorn,
            babel,
            babylon,
            esprima,
            flow,
            typescript,
          },
        });
      },
    );
  },

  transform(
    { transpile, recast, parsers },
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

    const result = transform(
      code,
      {
        recast,
        parsers,
      },
    );
    if (typeof result !== 'string') {
      throw new Error(
        'Transformers must either return undefined, null or a string, not ' +
        `"${typeof result}".`,
      );
    }
    return result;
  },
};
