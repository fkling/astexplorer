import pkg from 'eslint2/node_modules/eslint/package.json';

const ID = 'eslint-v2';
const name = 'ESLint v2'

export default {
  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'acorn-to-esprima',

  loadTransformer(callback) {
    require(
      ['eslint2', '../../utils/eslintUtils'],
      (eslint, utils) => callback({...eslint, utils})
    );
  },

  transform({ eslint, rules, sourceCode, utils }, transformCode, code) {
    utils.defineRule(rules, transformCode);
    return utils.runRule(code, eslint, sourceCode);
  },
};
