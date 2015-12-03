import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'babylon6/node_modules/babylon/package.json';
import * as LocalStorage from '../LocalStorage';
import SettingsRenderer from './utils/SettingsRenderer';

const ID = 'babylon6';
const plugins = [
  'asyncFunctions',
  'asyncGenerators',
  'classConstructorCall',
  'classProperties',
  'decorators',
  'doExpressions',
  'exponentiationOperator',
  'exportExtensions',
  'flow',
  'functionSent',
  'jsx',
  'objectRestSpread',
  'trailingFunctionCommas',
];
const options = Object.assign(
  {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    allowReturnOutsideFunction: false,
    plugins: plugins.slice(0),
  },
  LocalStorage.getParserSettings(ID)
);

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['babylon6'], callback);
  },

  parse(babylon, code) {
    return babylon.parse(code, options);
  },

  getNodeName(node) {
    switch (typeof node.type) {
      case 'string':
        return node.type;
      case 'object':
        return `Token (${node.type.label})`;
    }
  },

  nodeToRange(node) {
    if (typeof node.start !== 'undefined') {
      return [node.start, node.end];
    }
  },

  renderSettings() {
    return Settings();
  },
};

let parserSettings = [
  ['sourceType', ['module', 'script']],
  'allowReturnOutsideFunction',
  'allowImportExportEverywhere',
];

function changeOption(name, {target}) {
  if (name === 'sourceType') {
    options.sourceType = target.vaue;
  } else if (parserSettings.indexOf(name) > -1) {
    options[name] = target.checked;
  } else if (plugins.indexOf(name) > -1) {
    let plugs = new Set(options.plugins);
    if (target.checked) {
      plugs.add(name);
    } else {
      plugs.delete(name);
    }
    options.plugins = Array.from(plugs);
  }
  LocalStorage.setParserSettings(ID, options);
}

function Settings() {
  return (
    <div>
      {SettingsRenderer({
        settings: parserSettings,
        values: options,
        onChange: changeOption,
      })}
      <h4>plugins</h4>
      {SettingsRenderer({
        settings: plugins,
        values: plugins.reduce(
          (obj, p) => ((obj[p] = options.plugins.indexOf(p) > -1), obj),
          {}
        ),
        onChange: changeOption,
      })}
    </div>
  );
}
