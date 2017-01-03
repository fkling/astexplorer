import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'yaml-ast-parser/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'yaml-ast-parser';
let Kind = null;

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://www.npmjs.com/package/yaml-ast-parser',

  _ignoredProperties: new Set(['parent', 'errors', 'kind']),
  locationProps: new Set(['startPosition', 'endPosition']),

  nodeToRange(node) {
    return [node.startPosition, node.endPosition];
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
