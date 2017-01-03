import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'yaml-js/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'yaml';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://www.npmjs.com/package/yaml-js',

  nodeToRange(node) {
    return [node.start_mark, node.end_mark];
  },

  getNodeName(node) {
    return node.type;
  },

  loadParser(callback) {
    require(['yaml-js'], callback);
  },

  parse({ compose }, code) {
    return compose(code);
  },
};
