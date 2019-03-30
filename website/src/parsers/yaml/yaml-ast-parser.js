import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'yaml-ast-parser/package.json';

const ID = 'yaml-ast-parser';
let Kind = null;

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://www.npmjs.com/package/yaml-ast-parser',

  _ignoredProperties: new Set(['parent', 'errors']),
  locationProps: new Set(['startPosition', 'endPosition']),
  typeProps: new Set(['kind']),

  nodeToRange(node) {
    if (typeof node.startPosition === 'number') {
      return [node.startPosition, node.endPosition];
    }
  },

  getNodeName(node) {
    return Kind[node.kind];
  },

  loadParser(callback) {
    require(['yaml-ast-parser'], function(yamlAstParser) {
      Kind = yamlAstParser.Kind;
      callback(yamlAstParser);
    });
  },

  parse({ load }, code) {
    return load(code);
  },
};
