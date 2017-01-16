// Explicitly require just the stuff we care about to avoid loading
// RuleTester and CLIEngine, which are unnecessary and bloat out the
// package size.
module.exports = {
  eslint: require('eslint/lib/eslint'),
  sourceCode: require('eslint/lib/util/source-code'),
  rules: require('eslint/lib/rules'),
};
