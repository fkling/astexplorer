import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'esprima/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'esprima';
const defaultOptions = {
  sourceType: 'module',
  loc: false,
  range: true,
  tokens: false,
  comment: false,
  attachComment: false,
  tolerant: false,
  jsx: true,
};

const parserSettingsConfiguration = {
  fields: [
    ['sourceType', ['script', 'module']],
    'range',
    'loc',
    'attachComment',
    'comment',
    'tokens',
    'tolerant',
    'jsx',
  ],
  required: new Set(['range']),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc']),

  loadParser(callback) {
    require(['esprima'], callback);
  },

  parse(esprima, code, options) {
    return esprima.parse(code, {...defaultOptions, ...options});
  },

  *forEachProperty(node) {
    for (let prop in node) {
      if (typeof node[prop] === 'function') {
        continue;
      }
      yield {
        value: node[prop],
        key: prop,
        computed: false,
      };
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
};
