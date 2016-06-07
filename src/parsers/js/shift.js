import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'shift-parser/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'shift';
const defaultOptions = {
  loc: true,
  earlyErrors: false,
  sourceType: 'module',
};

const parserSettingsConfiguration = {
  fields: [
    ['sourceType', ['script', 'module']],
    'loc',
    'earlyErrors',
  ],
  required: new Set(['loc']),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc']),

  loadParser(callback) {
    require(['shift-parser'], callback);
  },

  parse(shift, code, options) {
    options = {...defaultOptions, ...options};
    const parseMethod = options.sourceType === 'module' ?
      'parseModule' :
      'parseScript';
    return shift[parseMethod](code, options);
  },

  nodeToRange({ loc }) {
    if (loc) {
      return [loc.start.offset, loc.end.offset];
    }
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

  opensByDefault(node, key) {
    return (
      key === 'items' ||
      key === 'declaration' ||
      key === 'declarators' ||
      key === 'statements' ||
      key === 'expression' ||
      key === 'body'
    );
  },
};
