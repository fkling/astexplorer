import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'acorn/package.json';
import * as LocalStorage from '../../LocalStorage';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'acorn';
const options = {
  ecmaVersion: 6,
  ranges: true,
  sourceType: 'module',
  'plugins.jsx': true,
  ...LocalStorage.getParserSettings(ID),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser(callback) {
    require(['acorn/src', 'acorn-jsx/inject'], (acorn, jsxInject) => {
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
  ['ecmaVersion', [3, 5, 6, 7]],
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
