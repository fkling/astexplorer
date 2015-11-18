import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'acorn-to-esprima/package.json';

const ID = 'acorn-to-esprima';
const name = 'babel-eslint';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return new Promise((resolve, reject) => {
      require.ensure(['acorn-to-esprima', 'babel-core'], require => {
        try {
          const acornToEsprima = require('acorn-to-esprima');
          const {acorn, traverse, parse} = require('babel-core');
          const opts = {
            locations: true,
            ranges: true,
          };

          const comments = opts.onComment = [];
          const tokens = opts.onToken = [];

          let ast;
          try {
            ast = parse(code, opts);
          } catch (err) {
            throw err;
          }

          ast.tokens = acornToEsprima.toTokens(tokens, acorn.tokTypes);
          acornToEsprima.convertComments(comments);
          ast.comments = comments;
          acornToEsprima.attachComments(ast, comments, ast.tokens);
          acornToEsprima.toAST(ast, traverse);

          resolve(ast);
        } catch(err) {
          reject(err);
        }
      });
    });
  },

  nodeToRange(node) {
    if (typeof node.start !== 'undefined') {
      return [node.start, node.end];
    }
  },

  _ignoredProperties: new Set([
    '_paths',
    '_babelType',
    '__clone',
  ]),
};
