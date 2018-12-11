import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'yaml/package.json';

const ID = 'yaml';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['position']),

  loadParser(callback) {
    require(['yaml'], callback);
  },

  nodeToRange(node) {
    if (node.range) {
      return node.range;
    }
    if (node.type === 'PAIR' && (node.key || node.value)) {
      if (node.key && node.value) {
        return [node.key.range[0], node.value.range[1]];
      } else if (node.key) {
        return node.key.range;
      } else {
        return node.value.range;
      }
    }
  },

  getNodeName(node) {
    return node.type;
  },

  parse({ parseAllDocuments }, code, options) {
    return parseAllDocuments(code, options);
  },

  getDefaultOptions() {
    return {
      keepBlobsInJSON: true,
      keepCstNodes: false,
      keepNodeTypes: true,
      merge: false,
    };
  },
};
