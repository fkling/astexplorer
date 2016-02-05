import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'recast/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';
import * as LocalStorage from '../../LocalStorage';

const ID = 'recast';
const options = {
  tolerant: false,
  range: true,
  parser: 'esprima-fb',
  ...LocalStorage.getParserSettings(ID),
};

const settings = [
  'range',
  'tolerant',
  ['parser', ['esprima', 'babel-core']],
];

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

  parse({ recast, parsers }, code) {
    let {parser, ...localOptions} = options;
    if (parser !== 'esprima') {
      localOptions.esprima = parsers[parser];
    }
    return recast.parse(code, localOptions);
  },

  _ignoredProperties: new Set(['__clone']),

  nodeToRange(node) {
    if (options.parser === 'babel-core' && typeof node.start === 'number') {
      return [node.start, node.end];
    }
    return node.range;
  },

  renderSettings() {
    return SettingsRenderer({
      settings,
      required: new Set(['range']),
      values: options,
      onChange: changeOption,
    });

  },
};

function changeOption(name, {target}) {
  let value;
  switch (name) {
    case 'parser':
      value = target.value;
      break;
    default:
      value = target.checked;
  }
  options[name] = value;
  LocalStorage.setParserSettings(ID, options);
}
