import React from 'react'; // eslint-disable-line no-unused-vars
import pkg from 'esprima/package.json';
import loadAndExectue from './utils/loadAndExecute';
import SettingsRenderer from './utils/SettingsRenderer';
import * as LocalStorage from '../LocalStorage';

const ID = 'esprima';
const options = Object.assign(
  {
    loc: false,
    range: true,
    tokens: false,
    comment: false,
    attachComment: false,
    tolerant: false,
    sourceType: 'module',
  },
  LocalStorage.getParserSettings(ID)
);

const settings = [
  'range',
  'loc',
  'attachComment',
  'comment',
  'tokens',
  'tolerant',
  ['sourceType', ['script', 'module']],
];

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return loadAndExectue(
      ['esprima'],
      parser => parser.parse(code, options)
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
