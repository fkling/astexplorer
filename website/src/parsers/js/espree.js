import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'espree/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'espree';
const defaultOptions = {
  range: true,
  loc: false,
  comment: false,
  attachComment: false,
  tokens: false,
  tolerant: true,
  ecmaVersion: 6,
  sourceType: 'module',

  ecmaFeatures: {
    jsx: true,
    globalReturn: true,
    experimentalObjectRestSpread: true,
  },
};
const parserSettingsConfiguration = {
  fields: [
    ['ecmaVersion', [3, 5, 6, 7], value => Number(value)],
    ['sourceType', ['script', 'module']],
    'range',
    'loc',
    'comment',
    'attachComment',
    'tokens',
    'tolerant',
    {
      key: 'ecmaFeatures',
      title: 'ecmaFeatures',
      fields: Object.keys(defaultOptions.ecmaFeatures),
      settings:
        settings => settings.ecmaFeatures || {...defaultOptions.ecmaFeatures},
    },
  ],
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser(callback) {
    require(['espree'], callback);
  },

  parse(espree, code, options) {
    return espree.parse(code, {...defaultOptions, ...options});
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href="https://github.com/eslint/espree#usage"
            target="_blank" rel="noopener noreferrer">
            Option descriptions
          </a>
        </p>
        <SettingsRenderer
          settingsConfiguration={parserSettingsConfiguration}
          parserSettings={{...defaultOptions, ...parserSettings}}
          onChange={onChange}
        />
      </div>
    );
  },
};
