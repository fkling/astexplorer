import compileModule from '../../../utils/compileModule';
import pkg from 'babel5/babel5-package';

const ID = 'babel';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babylon',

  loadTransformer(callback) {
    require(
      ['../../../transpilers/babel', 'babel5'],
      (transpile, babel) => callback({ transpile: transpile.default, babel: babel })
    );
  },

  transform({ transpile, babel }, transformCode, code) {
    transformCode = transpile(transformCode);
    let transform = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    return babel.transform(code, {
      whitelist: [],
      plugins: [transform.default || transform],
      sourceMaps: true,
    });
  },
};
