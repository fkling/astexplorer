import compileModule from '../../utils/compileModule';
import transpile from '../../transpilers/babel';
import { parseNoPatch } from 'babel-eslint';

export function formatResults(results, code) {
  return results.length === 0
    ? '// Lint rule not fired.'
    : results
        .map((result) => formatResult(result, code))
        .join('')
        .trim();
}

export function formatResult(result, code) {
  var pointer = '-'.repeat(result.column - 1) + '^';
  return `
// ${result.message} (at ${result.line}:${result.column})
   ${getSourceFromResult(result, code)}
// ${pointer}
`;
}
function getSourceFromResult(result, code) {
  if (result.source) {
    return result.source;
  }
  let linesOfCode = code.split('\n');
  return linesOfCode[result.line - 1];
}
export function defineRule(eslint, code) {
  // Compile the transform code and install it as an ESLint rule. The rule
  // name doesn't really matter here, so we'll just use a hard-coded name.
  code = transpile(code);
  const rule = compileModule(code);
  eslint.defineRule('astExplorerRule', rule.default || rule);
}

export function runRule(code, eslint) {
  // Run the ESLint rule on the AST of the provided code.
  // Reference: http://eslint.org/docs/developer-guide/nodejs-api
  eslint.defineParser('babel-eslint', {
    parse(code) {
      return parseNoPatch(code, { sourceType: 'module' });
    },
  });
  const results = eslint.verifyAndFix(code, {
    env: { es6: true },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 8,
      sourceType: 'module',
      ecmaFeatures: { experimentalObjectRestSpread: true },
    },
    rules: {
      astExplorerRule: 2,
    },
  });
  let output = formatResults(results.messages, code);
  output += `

// Fixed output follows:
// ${'-'.repeat(80)}
`;
  return output + results.output;
}
