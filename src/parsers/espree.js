import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'espree/package.json';
import * as LocalStorage from '../LocalStorage';
import SettingsRenderer from './utils/SettingsRenderer';

const ID = 'espree';
const options = Object.assign(
  {
    range: true,
    loc: false,
    comments: false,
    attachComment: false,
    tokens: false,
    tolerant: true,
    ecmaFeatures: {
      arrowFunctions: true,
      blockBindings: true,
      destructuring: true,
      regexYFlag: true,
      regexUFlag: true,
      templateStrings: true,
      binaryLiterals: true,
      octalLiterals: true,
      unicodeCodePointEscapes: true,
      defaultParams: true,
      restParams: true,
      forOf: true,
      objectLiteralComputedProperties: true,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
      objectLiteralDuplicateProperties: true,
      generators: true,
      spread: true,
      superInFunctions: true,
      classes: true,
      newTarget: false,
      modules: true,
      jsx: true,
      globalReturn: true,
      experimentalObjectRestSpread: true,
    },
  },
  LocalStorage.getParserSettings(ID)
);

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return new Promise((resolve, reject) => {
      require.ensure(['espree'], require => {
        try {
          const espree = require('espree');
          resolve(espree.parse(code, options));
        } catch(err) {
          reject(err);
        }
      });
    });
  },

  renderSettings() {
    return Settings();
  },
};

let parserSettings = Object.keys(options).filter(v => v !== 'ecmaFeatures');
let ecmaFeatures = Object.keys(options.ecmaFeatures);

function changeOption(name, {target}) {
  if (parserSettings.indexOf(name) > -1) {
    options[name] = target.checked;
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
