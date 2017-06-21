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
    require(['prettier'], callback);
  },

  transform(prettier, transformCode, code) {
    const options = compileModule(transformCode);
    return prettier.format(code, options.default || options);
  },
};
