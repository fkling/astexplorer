import pkg from 'eslint4/eslint4-package';

const ID = 'eslint-v4';
const name = 'ESLint v4';

export default {
  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'babel-eslint',

  loadTransformer(callback) {
    require(
      ['eslint4', '../../utils/eslint4Utils'],
      (eslint, utils) => callback({...eslint, utils})
    );
  },

  transform({ eslint, sourceCode, utils }, transformCode, code) {
    utils.defineRule(eslint, transformCode);
    return utils.runRule(code, eslint, sourceCode);
  },
};
