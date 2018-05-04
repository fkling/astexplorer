import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'cherow/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'cherow';
const defaultOptions = {
  sourceType: 'module',
  comments: false,
  next: true,
  ranges: true,
  loc: false,
  jsx: false,
  raw: false,
  rawIdentifier: false,
  source: false,
  impliedStrict: false,
  globalReturn: false,
  experimental: true,
  skipShebang: false,
  tolerant: false,
  node: false,
};

const parserSettingsConfiguration = {
  fields: [
    ['sourceType', ['script', 'module']],
    'comments',
    'next',
    'ranges',
    'loc',
    'jsx',
    'raw',
    'rawIdentifier',
    'source',
    'impliedStrict',
    'globalReturn',
    'experimental',
    'skipShebang',
    'tolerant',
    'node',
  ],
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  homepage: pkg.homepage,
  locationProps: new Set(['start', 'end', 'loc']),

  loadParser(callback) {
    require(['cherow/dist/cherow'], callback);
  },

  parse(cherow, code, options) {
    if (options.sourceType === 'script') {
      return cherow.parseScript(code, {...defaultOptions, ...options});
    } else {
      return cherow.parseModule(code, {...defaultOptions, ...options});
    }
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
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
