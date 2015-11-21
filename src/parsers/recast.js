import React from 'react'; // eslint-disable-line no-unused-vars
import pkg from 'recast/package.json';
import SettingsRenderer from './utils/SettingsRenderer';
import * as LocalStorage from '../LocalStorage';

const ID = 'recast';
const options = Object.assign(
  {
    tolerant: false,
    range: true,
    parser: 'esprima-fb',
  },
  LocalStorage.getParserSettings(ID)
);

const settings = [
  'range',
  'tolerant',
  ['parser', ['esprima-fb', 'esprima', 'babel-core']],
];

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return new Promise((resolve, reject) => {
      require.ensure(
        ['recast', 'esprima', 'babel-core'],
        require => {
          try {
            const recast = require('recast');
            const parsers = {
              esprima: require('esprima'),
              'babel-core': require('babel-core'),
            };
            let localOptions = {...options};
            delete localOptions.parser;
            if (options !== 'esprima-fb') {
              localOptions.esprima = parsers[options.parser];
            }
            resolve(recast.parse(code, localOptions));
          } catch(err) {
            reject(err);
          }
        }
      );
    });
  },

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
