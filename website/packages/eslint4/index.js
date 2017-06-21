// Explicitly require just the stuff we care about to avoid loading
// RuleTester and CLIEngine, which are unnecessary and bloat out the
// package size.
const Linter = require('eslint/lib/linter');

module.exports = {
  eslint: new Linter(),
  sourceCode: require('eslint/lib/util/source-code')
};
