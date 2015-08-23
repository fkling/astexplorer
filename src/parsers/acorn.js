import React from 'react';
import pkg from 'acorn/package.json';
import loadAndExectue from './utils/loadAndExecute';
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
  name: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return loadAndExectue(
      ['acorn'],
      parser => parser.parse(code, options)
    );
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
