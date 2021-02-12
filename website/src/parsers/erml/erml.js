import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'erml/package.json';

const ID = 'erml';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['erml'], callback);
  },

  parse(ERMLParser, code) {
    return ERMLParser(code);
  },

  nodeToRange(node) {
    return [node.start, node.end + 1];
  },

  getNodeName(node) {
    return node.type;
  },
};
