import pkg from 'eslint1/package.js';

const ID = 'eslint-v1';
const name = 'ESLint v1'

export default {
  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'acorn-to-esprima',

  loadTransformer(callback) {
    require(
      ['eslint1', '../../utils/eslintUtils'],
      (eslint, utils) => callback({...eslint, utils})
    );
  },

  transform({ eslint, sourceCode, rules, utils }, transformCode, code) {
    utils.defineRule(rules, transformCode);
    return utils.runRule(code, eslint, sourceCode);
  },
};
