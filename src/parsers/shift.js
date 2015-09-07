import React from 'react'; // eslint-disable-line no-unused-vars
import pkg from 'shift-parser/package.json';
import loadAndExecute from './utils/loadAndExecute';
import SettingsRenderer from './utils/SettingsRenderer';
import * as LocalStorage from '../LocalStorage';

const ID = 'shift';
const options = Object.assign(
  {
    loc: false,
    earlyErrors: false,
    sourceType: 'module',
  },
  LocalStorage.getParserSettings(ID)
);

const settings = [
  'loc',
  'earlyErrors',
  ['sourceType', ['script', 'module']],
];

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return loadAndExecute(
      ['shift-parser'],
      parser => {
        if (options.sourceType === 'module') {
          return parser.parseModule(code, options);
        } else {
          return parser.parseScript(code, options);
        }
      }
    );
  },

  nodeToRange(node) {
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
    case 'sourceType':
      value = target.value;
      break;
    default:
      value = target.checked;
  }
  options[name] = value;
  LocalStorage.setParserSettings(ID, options);
}
