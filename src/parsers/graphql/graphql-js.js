import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'graphql/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'graphql-js';
const defaultOptions = {
  noLocation: false,
  noSource: false,
};

const parserSettingsConfiguration = {
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
    require(['graphql/language'], ({ parse }) => {
      callback({ parse });
    });
  },

  parse({ parse }, code, options) {
    return parse(code, {...defaultOptions, ...options});
  },

  nodeToRange(node) {
    if (node.loc) {
      return [node.loc.start, node.loc.end];
    }
  },

  getNodeName(node) {
    return node.kind;
  },

  opensByDefault(node, key) {
    return key === 'definitions';
  },

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        settingsConfiguration={parserSettingsConfiguration}
        parserSettings={{...defaultOptions, ...parserSettings}}
        onChange={onChange}
      />
    );
  },
};
