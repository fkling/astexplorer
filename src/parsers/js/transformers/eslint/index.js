import compileModule from '../../../utils/compileModule';
import pkg from 'eslint/package.json';

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
      [
        // Explicitly require just the stuff we care about to avoid loading
        // RuleTester and CLIEngine, which are unnecessary and bloat out the
        // package size.
        'eslint/lib/eslint',
        'eslint/lib/util/source-code',
        'eslint/lib/rules',
        'babel-core',
        'babel-eslint'
      ],
      (eslint, eslintSourceCode, eslintRules, babel, babelESLint) => {
        callback({ eslint, eslintSourceCode, eslintRules, babel, babelESLint });
      }
    );
  },

  transform({ eslint, eslintSourceCode, eslintRules, babel, babelESLint }, transformCode, code) {
    // Compile the transform code and install it as an ESLint rule. The rule
    // name doesn't really matter here, so we'll just use a hard-coded name.
    const rule = compileModule(
      babel.transform(transformCode).code
    );
    eslintRules.define('astExplorerRule', rule);

    // Run the ESLint rule on the AST of the provided code.
    // Reference: http://eslint.org/docs/developer-guide/nodejs-api
    const ast = babelESLint.parseNoPatch(code);
    const sourceCode = new eslintSourceCode(code, ast);
    const results = eslint.verify(sourceCode, {
      rules: {
        astExplorerRule: 2
      }
    });
    return formatResults(results);
  },
};

function formatResults(results) {
  return results.length === 0
    ? 'Lint rule not fired.'
    : results.map(formatResult).join('').trim();
}

function formatResult(result) {
  var pointer = '-'.repeat(result.column - 1) + '^';
  return `
// ${result.message} (at ${result.line}:${result.column})
   ${result.source}
// ${pointer}
`;
}
