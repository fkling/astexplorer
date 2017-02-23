import pkg from 'eslint3/eslint3-package';

const ID = 'eslint-v3';
const name = 'ESLint v3'

export default {
  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'espree',

  loadTransformer(callback) {
    require(
      ['eslint3', '../../utils/eslintUtils'],
      (eslint, utils) => callback({...eslint, utils})
    );
  },

  transform({ eslint, rules, sourceCode, utils }, transformCode, code) {
    utils.defineRule(rules, transformCode);
    return utils.runRule(code, eslint, sourceCode);
  },
};
