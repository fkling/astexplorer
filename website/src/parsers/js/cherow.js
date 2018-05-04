import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'cherow/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'cherow';
const defaultOptions = {
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
    require(['cherow'], callback);
  },

  parse(cherow, code, options) {
    return cherow.parseScript(code, {...defaultOptions, ...options});
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
