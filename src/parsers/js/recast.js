import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'recast/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

import flowParser, * as flowSettings from './flow';
import babylonParser, * as babylonSettings from './babylon6';

const ID = 'recast';
const defaultOptions = {
  tolerant: false,
  range: true,
  parser: 'esprima',
  flow: flowSettings.defaultOptions,
  babylon: babylonSettings.defaultOptions,
};

const parserSettingsConfiguration = {
  fields: [
    ['parser', ['esprima', 'babel5', 'babylon6', 'flow']],
    'range',
    'tolerant',
    {
      key: 'flow',
      title: 'Flow Settings',
      fields: flowSettings.parserSettingsConfiguration.fields,
      settings: settings => settings.flow || defaultOptions.flow,
    },
    {
      key: 'babylon',
      title: 'Babylon 6 Settings',
      fields: babylonSettings.parserSettingsConfiguration.fields,
      settings: settings => settings.babylon || defaultOptions.babylon,
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
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser(callback) {
    require(
      ['recast', 'babel5', 'babylon6', 'flow-parser'],
      (recast, babelCore, babylon6, flow) => {
        callback({
          recast,
          parsers: {
            'babel5': babelCore,
            babylon6,
            flow,
          },
        });
      }
    );
  },

  parse({ recast, parsers }, code, options) {
    options = {...defaultOptions, ...options};
    const flowOptions = options.flow;
    const babylonOptions = options.babylon;
    delete options.flow;
    delete options.babylon;

    switch (options.parser) {
      case 'esprima':
        delete options.parser; // default parser
        break;
      case 'flow':
        options.parser = {
          parse(code) {
            return flowParser.parse(parsers.flow, code, flowOptions);
          },
        };
        break;
      case 'babylon6':
        options.parser = {
          parse(code) {
            return babylonParser.parse(parsers.babylon6, code, babylonOptions);
          },
        };
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
