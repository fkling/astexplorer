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
