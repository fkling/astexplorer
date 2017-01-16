import React from 'react';
import defaultParserInterface from './utils/defaultCSSParserInterface';
import pkg from 'postcss/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'postcss';
const defaultOptions = {
  parser: 'built-in',
};

const parserSettingsConfiguration = {
  fields: [
    ['parser', ['built-in', 'scss', 'less', 'safe-parser']],
  ],
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['source']),

  loadParser(callback) {
    require(['postcss/lib/parse', 'postcss-scss/lib/scss-parse', 'postcss-less/dist/less-parse', 'postcss-safe-parser'], (builtIn, scss, less, safe) => {
      callback({
        'built-in': builtIn,
        scss,
        less,
        'safe-parser': safe,
      });
    });
  },

  parse(parsers, code, options) {
    return defaultParserInterface.parse.call(
      this,
      parsers[options.parser || defaultOptions.parser],
      code
    );
  },

  nodeToRange({ source: range }) {
    if (!range || !range.end) return;
    return [
      this.getOffset(range.start),
      this.getOffset(range.end) + 1,
    ];
  },

  opensByDefault(node, key) {
    return key === 'nodes';
  },

  _ignoredProperties: new Set(['parent', 'input']),

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
