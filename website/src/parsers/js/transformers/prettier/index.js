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
      ['../../../transpilers/babel', 'prettier'],
      (transpile, prettier) => callback({ transpile: transpile.default, prettier })
    );
  },

  transform({ transpile, prettier }, transformCode, code) {
    transformCode = transpile(transformCode);
    const options = compileModule(transformCode);
    return prettier.format(code, options.default || options);
  },
};
