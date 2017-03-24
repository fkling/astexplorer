import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'regexp-tree/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'regexp-tree';

const defaultOptions = {
  captureLocations: true,
};

const settingsConfiguration = {
  fields: Object.keys(defaultOptions),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc']),

  loadParser(callback) {
    require(['regexp-tree'], (regexpTree) => {
      callback(regexpTree);
    });
  },

  parse(regexpTree, code, options={}) {
    options = Object.assign({}, defaultOptions, options);

    regexpTree
      .parser
      .setOptions(options);

    return regexpTree.parse(code);
  },

  nodeToRange(node) {
    if (node.loc != null) {
      return [node.loc.start, node.loc.end];
    }
  },

  getNodeName(node) {
    return node.type;
  },

  opensByDefault(node, key) {
    return (
      node.type === 'RegExp' ||
      key === 'body' ||
      key === 'expressions'
    );
  },

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        settingsConfiguration={settingsConfiguration}
        parserSettings={{...defaultOptions, ...parserSettings}}
        onChange={onChange}
      />
    );
  },
};
