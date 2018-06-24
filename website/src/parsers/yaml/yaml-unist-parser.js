import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'yaml-unist-parser/package.json';

const ID = 'yaml-unist-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://www.npmjs.com/package/yaml-unist-parser',

  _ignoredProperties: new Set(['parent', 'errors', 'type']),
  locationProps: new Set(['position']),

  nodeToRange(node) {
    if (node.position)
      return [node.position.start.offset, node.position.end.offset]
  },

  getNodeName(node) {
    return node.type;
  },

  loadParser(callback) {
    require(['yaml-unist-parser'], function (yamlAstParser) {
      callback(yamlAstParser);
    });
  },

  parse({ parse }, code) {
    return parse(code);
  },
};
