import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'acorn/package.json';
import jsxPkg from 'acorn-jsx/package.json';
import * as LocalStorage from '../../LocalStorage';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'acorn';
const options = Object.assign(
  {
    ecmaVersion: 6,
    ranges: true,
    sourceType: 'module',
    'plugins.jsx': true,
  },
  LocalStorage.getParserSettings(ID)
);

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version} (acorn-jsx: ${jsxPkg.version})`,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['acorn', 'acorn-jsx/inject'], (acorn, jsxInject) => {
      callback(jsxInject(acorn));
    });
  },

  parse(acorn, code) {
    // put deep option into correspondent place
    return acorn.parse(code, {
      ...options,
      plugins: options['plugins.jsx'] ? { jsx: true } : {},
    });
  },

  _ignoredProperties: new Set([
    'start',
    'end',
  ]),

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
  'plugins.jsx',
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
