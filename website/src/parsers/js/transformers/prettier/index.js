import compileModule from '../../../utils/compileModule';
import pkg from 'prettier/package.json';

const ID = 'prettier';
const name = 'prettier';

export default {
  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babylon7',

  loadTransformer(callback) {
    require(
      ['../../../transpilers/babel', 'prettier/standalone', 'prettier/parser-babylon'],
      (transpile, prettier, babylon) => callback({ transpile: transpile.default, prettier, babylon })
    );
  },

  transform({ transpile, prettier, babylon }, transformCode, code) {
    transformCode = transpile(transformCode);
    const options = compileModule(transformCode);
    return prettier.format(
      code,
      Object.assign({plugins: [babylon]}, options.default || options),
    );
  },
};
