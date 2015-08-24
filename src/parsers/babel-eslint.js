import React from 'react';
import pkg from 'acorn-to-esprima/package.json';
import loadAndExecute from './utils/loadAndExecute';

const ID = 'acorn-to-esprima';
const name = 'babel-eslint';

export default {
  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return loadAndExecute(
      ['acorn-to-esprima', 'babel-core'],
      (acornToEsprima, {acorn, traverse, parse}) => {
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

        // remove node._paths
        traverse(ast, {
          noScope: true,
          exit: function (node) {
            if (node._paths) {
              delete node._paths;
            }
          },
        });
        delete ast._paths;

        return ast;
      }
    );
  },

  nodeToRange(node) {
    if (typeof node.start !== 'undefined') {
      return [node.start, node.end];
    }
  },
};
