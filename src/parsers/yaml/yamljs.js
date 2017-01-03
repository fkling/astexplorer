import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'yamljs/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'yaml';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/jeremyfa/yaml.js',

  getNodeName(node) {
    if (node.name) {
        return node.name + (node.optional ? '?' : '');
    } else if (node.type) {
        return node.type;
    } else if (node.idlType) {
        return node.idlType.idlType || node.idlType;
    }
  },

  loadParser(callback) {
    require(['yamljs'], callback);
  },

  parse({ dump }, code) {
    return dump(code);
  },

  opensByDefault(node, key) {
    return key === 'members';
  },
};
