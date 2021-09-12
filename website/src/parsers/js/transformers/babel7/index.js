import compileModule from '../../../utils/compileModule';
import {getPlugins} from '../../babylon7';
import pkg from 'babel7/package.json';

const ID = 'babelv7';
const defaultParserID = 'babylon7';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID,

  loadTransformer(callback) {
    require([
      '../../../transpilers/babel',
      'babel7',
      'recast',
    ], (transpile, babel, recast) => callback({ transpile: transpile.default, babel, recast }));
  },

  transform({ transpile, babel, recast }, transformCode, code, parserSettings) {
    transformCode = transpile(transformCode);
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode,
    );

    return babel.transformAsync(code, {
      parserOpts: {
        parser: recast.parse,
        plugins: getPlugins(parserSettings),
      },
      retainLines: false,
      generatorOpts: {
        generator: recast.print,
      },
      plugins: [(transform.default || transform)(babel)],
      sourceMaps: true,
    });
  },
};
