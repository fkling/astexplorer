import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'vue-eslint-parser/package.json';

const ID = 'vue-eslint-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['start', 'end']),
  typeProps: new Set(['tag']),

  loadParser(callback) {
    require(['vue-eslint-parser'], callback);
  },

  parse(parser, code, options) {
    return parser.parse(code, options);
  },

  nodeToRange(node) {
    if (node.type || node.name) {
      return node.range;
    }
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  getNodeName(node) {
    return node.tag;
  },

  getDefaultOptions() {
    return {
      sourceType: 'module',
    };
  },

  _ignoredProperties: new Set(['parent', 'tokens']),
};
