import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'espree/package.json';
import * as LocalStorage from '../../LocalStorage';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'espree';
const options = {
  range: true,
  loc: false,
  comment: false,
  attachComment: false,
  tokens: false,
  tolerant: true,
  ecmaVersion: 6,
  sourceType: 'module',

  ecmaFeatures: {
    jsx: true,
    globalReturn: true,
    experimentalObjectRestSpread: true,
  },

  ...LocalStorage.getParserSettings(ID),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['range']),

  loadParser(callback) {
    require(['espree'], callback);
  },

  parse(espree, code) {
    return espree.parse(code, options);
  },

  renderSettings() {
    return Settings();
  },
};

let parserSettings = [
  ['ecmaVersion', [3, 5, 6]],
  ['sourceType', ['script', 'module']],
  ...Object.keys(options).filter(v => v !== 'ecmaFeatures'),
];
let ecmaFeatures = Object.keys(options.ecmaFeatures);

function changeOption(name, {target}) {
  if (parserSettings.indexOf(name) > -1) {
    switch (name) {
      case 'ecmaVersion':
      case 'sourceType':
        options[name] = target.value;
        break;
      default:
        options[name] = target.checked;
    }
  } else {
    options.ecmaFeatures[name] = target.checked;
  }
  LocalStorage.setParserSettings(ID, options);
}

function Settings() {
  return (
    <div>
      <p>
        <a
          href="https://github.com/eslint/espree#usage"
          target="_blank">
          Option descriptions
        </a>
      </p>
      {SettingsRenderer({
        settings: parserSettings,
        values: options,
        required: new Set(['range']),
        onChange: changeOption,
      })}
      <h4>ecmaFeatures</h4>
      {SettingsRenderer({
        settings: ecmaFeatures,
        values: options.ecmaFeatures,
        onChange: changeOption,
      })}
    </div>
  );
}
