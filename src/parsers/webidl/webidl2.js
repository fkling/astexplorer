import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'webidl2/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'webidl2';
const defaultOptions = {
  allowNestedTypedefs: false,
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
    require(['webidl2'], callback);
  },

  parse({ parse }, code, options) {
    return parse(code, {...defaultOptions, ...options});
  },

  opensByDefault(node, key) {
    return key === 'members';
  },

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        settingsConfiguration={parserSettingsConfiguration}
        parserSettings={{...defaultOptions, parserSettings}}
        onChange={onChange}
      />
    );
  },
};
