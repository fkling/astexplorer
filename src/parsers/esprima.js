import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'esprima/package.json';
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
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['esprima'], callback);
  },

  parse(esprima, code) {
    return esprima.parse(code, options);
  },

  forEachProperty(node, callback) {
    for (var prop in node) {
      if (typeof node[prop] === 'function') {
        continue;
      }
      var result = callback({
        value: node[prop],
        key: prop,
        computed: false,
      });
      if (result === false) {
        break;
      }
    }
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
