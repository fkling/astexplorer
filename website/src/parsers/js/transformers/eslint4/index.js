import pkg from 'eslint4/package.json';

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
      [
        'eslint4/lib/linter',
        'eslint4/lib/util/source-code',
        '../../utils/eslint4Utils',
      ],
      (Linter, sourceCode, utils) => callback({eslint: new Linter(), sourceCode, utils}),
    );
  },

  transform({ eslint, sourceCode, utils }, transformCode, code) {
    utils.defineRule(eslint, transformCode);
    return utils.runRule(code, eslint, sourceCode);
  },
};
