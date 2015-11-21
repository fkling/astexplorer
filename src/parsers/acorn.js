import React from 'react';
import pkg from 'acorn/package.json';
import * as LocalStorage from '../LocalStorage';
import SettingsRenderer from './utils/SettingsRenderer';

const ID = 'acorn';
const options = Object.assign(
  {
    ecmaVersion: 6,
    ranges: true,
    sourceType: 'module',
  },
  LocalStorage.getParserSettings(ID)
);

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return new Promise((resolve, reject) => {
      require.ensure(['acorn'], require => {
        let acorn = require('acorn');
        try {
          resolve(acorn.parse(code, options));
        } catch (err) {
          reject(err);
        }
      });
    });
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
  },

  renderSettings() {
    return Settings();
  },
};

const settings = [
  ['ecmaVersion', [3, 5, 6]],
  ['sourceType', ['script', 'module']],
  'allowReserved',
  'allowReturnOutsideFunction',
  'allowImportExportEverywhere',
  'allowHashBang',
  'locations',
  'ranges',
  'preserveParens',
];

function changeOption(name, {target}) {
  let value;
  switch (name) {
    case 'ecmaVersion':
    case 'sourceType':
      value = target.value;
      break;
    default:
      value = target.checked;
  }
  options[name] = value;
  LocalStorage.setParserSettings(ID, options);
}

function Settings() {
  return (
    <div>
      <p>
        <a
          href="https://github.com/marijnh/acorn/blob/master/src/options.js"
          target="_blank">
          Option descriptions
        </a>
      </p>
      {SettingsRenderer({
        settings,
        values: options,
        onChange: changeOption,
      })}
    </div>
  );
}
