import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'typescript-eslint-parser/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'typescript-eslint-parser';

const defaultOptions = {
  range: true,
  loc: false,
  tokens: false,
  comment: false,
  tolerant: true,
  useJSXTextNode: false,

  ecmaFeatures: {
    jsx: true,
  },
};

const parserSettingsConfiguration = {
  fields: [
    'range',
    'loc',
    'tokens',
    'comment',
    'tolerant',
    'useJSXTextNode',
    {
      key: 'ecmaFeatures',
      title: 'ecmaFeatures',
      fields: Object.keys(defaultOptions.ecmaFeatures),
      settings:
        settings => settings.ecmaFeatures || {...defaultOptions.ecmaFeatures},
    },
  ],
  required: new Set(['range']),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end', 'range']),

  loadParser(callback) {
    require(['typescript-eslint-parser'], callback);
  },

  parse(parser, code, options) {
    return parser.parse(code, {...defaultOptions, ...options} );
  },

  nodeToRange(node) {
    return node.range;
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
