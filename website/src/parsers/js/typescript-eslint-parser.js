import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'typescript-eslint-parser/package.json';

const ID = 'typescript-eslint-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end', 'range']),

  loadParser(callback) {
    require(['typescript-eslint-parser'], callback);
  },

  parse(parser, code) {
    const opts = {
      sourceType: 'module',
    };

    const ast = parser.parse(code, opts);
    return ast;
  },

  nodeToRange(node) {
    if (node.range) {
      return [node.range[0], node.range[1]];
    }
  },
};
