import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'erml/package.json';

import { id, displayName } from "./index";

export default {
  ...defaultParserInterface,

  id,
  displayName,
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
