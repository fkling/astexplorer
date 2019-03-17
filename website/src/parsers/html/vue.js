import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'vue-template-compiler/package.json';

const ID = 'vue';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['start', 'end']),

  loadParser(callback) {
    require(['vue-template-compiler/browser'], callback);
  },

  parse(parser, code, options) {
    return parser.compile(code, options).ast;
  },

  nodeToRange(node) {
    if (node.type || node.name) {
      return [node.start, node.end];
    }
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  getNodeName(node) {
    let nodeName = node.tag;
    if (nodeName && node.name) {
      nodeName += `(${node.name})`;
    }
    return nodeName;
  },

  getDefaultOptions() {
    return {
      outputSourceRange: true,
      whitespace: 'preserve',
    };
  },
  _ignoredProperties: new Set(['parent']),
};
