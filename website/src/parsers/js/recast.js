import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'recast/package.json';

import flowParser, * as flowSettings from './flow';
import babylon6Parser, * as babylon6Settings from './babylon6';
import babylon7Parser, * as babylon7Settings from './babylon7';

const ID = 'recast';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser(callback) {
    require(
      ['recast', 'babel5', 'babylon6', 'babylon7', 'flow-parser', 'recast/parsers/typescript'],
      (recast, babelCore, babylon6, babylon7, flow, typescript) => {
        callback({
          recast,
          parsers: {
            'babel5': babelCore,
            babylon6,
            babylon7,
            flow,
            typescript,
          },
        });
      },
    );
  },

  parse({ recast, parsers }, code, options) {
    options = {...options}; // a copy is needed since we are mutating options
    const flowOptions = options.flow;
    const babylon6Options = options.babylon6;
    const babylon7Options = options.babylon7;
    delete options.flow;
    delete options.babylon6;
    delete options.babylon7;

    switch (options.parser) {
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
            return babylon6Parser.parse(parsers.babylon6, code, babylon6Options);
          },
        };
        break;
      case 'babylon7':
        options.parser = {
          parse(code) {
            return babylon7Parser.parse(parsers.babylon7, code, babylon7Options);
          },
        };
        break;
      case 'babel5':
        options.parser = parsers[options.parser];
        break;
      case 'typescript':
        options.parser = parsers.typescript;
        break
      default:
        delete options.parser; // default parser
        break;
    }
    return recast.parse(code, options);
  },

  _ignoredProperties: new Set(['__clone']),

  *forEachProperty(node) {
    if (node && typeof node === 'object') {
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
    }
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
    return node.range;
  },

  getDefaultOptions() {
    return {
      tolerant: false,
      range: true,
      parser: 'esprima',
      flow: flowSettings.defaultOptions,
      babylon6: babylon6Settings.defaultOptions,
      babylon7: babylon7Settings.defaultOptions,
    };
  },

  _getSettingsConfiguration(defaultOptions) {
    return {
      fields: [
        ['parser', ['esprima', 'babel5', 'babylon6', 'babylon7', 'flow', 'typescript']],
        'range',
        'tolerant',
        {
          key: 'flow',
          title: 'Flow Settings',
          fields: flowSettings.parserSettingsConfiguration.fields,
          settings: settings => settings.flow || defaultOptions.flow,
        },
        {
          key: 'babylon6',
          title: 'Babylon 6 Settings',
          fields: babylon6Settings.parserSettingsConfiguration.fields,
          settings: settings => settings.babylon6 || defaultOptions.babylon6,
        },
        {
          key: 'babylon7',
          title: 'Babylon 7 Settings',
          fields: babylon7Settings.parserSettingsConfiguration.fields,
          settings: settings => settings.babylon7 || defaultOptions.babylon7,
        },
      ],
      required: new Set(['range']),
    };
  },

};
