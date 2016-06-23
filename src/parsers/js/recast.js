import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'recast/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'recast';
const defaultOptions = {
  tolerant: false,
  range: true,
  parser: 'esprima',
};

const parserSettingsConfiguration = {
  fields: [
    ['parser', ['esprima', 'babel-core']],
    'range',
    'tolerant',
  ],
  required: new Set(['range']),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser(callback) {
    require(['recast', 'babel-core'], (recast, babelCore) => {
      callback({
        recast,
        parsers: {
          'babel-core': babelCore,
        },
      });
    });
  },

  parse({ recast, parsers }, code, options) {
    options = {...defaultOptions, ...options};
    switch (options.parser) {
      case 'esprima':
        delete options.parser; // default parser
        break;
      default:
        options.parser = parsers[options.parser];
    }
    return recast.parse(code, options);
  },

  _ignoredProperties: new Set(['__clone']),

  *forEachProperty(node) {
    for (let prop in node) {
      if (
        this._ignoredProperties.has(prop) || typeof node[prop] === 'function'
      ) {
        continue;
      }
      yield {
        value: node[prop],
        key: prop,
        computed: false,
      };
    }
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
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
