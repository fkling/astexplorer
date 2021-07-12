import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'jsonnet-astexplorer/package.json';

const ID = 'yolodev-jsonnet';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  _ignoredProperties: new Set(['span', 'type']),
  locationProps: new Set(['span']),

  loadParser(callback) {
    require(['jsonnet-astexplorer'], callback);
  },

  parse(parser, code) {
    return parser.parse(code);
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange(node) {
    return node.span;
  },
};
