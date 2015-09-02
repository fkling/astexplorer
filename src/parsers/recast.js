import React from 'react'; // eslint-disable-line no-unused-vars
import pkg from 'recast/package.json';
import loadAndExectue from './utils/loadAndExecute';
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
    let modules = ['recast'];
    if (options.parser !== 'esprima-fb') {
      modules[1] = options.parser;
    }
    return loadAndExectue(
      modules,
      (recast, parser) => {
        let localOptions = {...options};
        delete localOptions.parser;
        if (parser) {
          localOptions.esprima = parser;
        }
        return recast.parse(code, localOptions);
      }
    );
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
