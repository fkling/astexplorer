import React from 'react';
import pkg from 'babylon/package.json';
import loadAndExectue from './utils/loadAndExecute';
import * as LocalStorage from '../LocalStorage';
import SettingsRenderer from './utils/SettingsRenderer';

const ID = 'babylon';
const options = Object.assign(
  {
    sourceType: 'module',
    features: {
      'es7.asyncFunctions': true,
      'es7.classProperties': true,
      'es7.comprehensions': true,
      'es7.decorators': true,
      'es7.exportExtensions': true,
      'es7.functionBind': true,
      'es7.objectRestSpread': true,
      'es7.trailingFunctionCommas': true,
    },
    plugins: { jsx: true, flow: true },
  },
  LocalStorage.getParserSettings(ID)
);

export default {
  name: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return loadAndExectue(
      ['babylon'],
      parser => parser.parse(code, options)
    );
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
  'allowReserved',
  'allowReturnOutsideFunction',
  'strictMode',
];
let features = Object.keys(options.features);
let plugins = ['jsx', 'flow'];

function changeOption(name, {target}) {
  if (name === 'sourceType') {
    options.sourceType = target.vaue;
  } else if(parserSettings.indexOf(name) > -1) {
    options[name] = target.checked;
  } else if (features.indexOf(name) > -1) {
    options.features[name] = target.checked;
  } else if (plugins.indexOf(name) > -1) {
    if (target.checked) {
      options.plugins[name] = true;
    } else {
      delete options.plugins[name];
    }
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
      <h4>features</h4>
      {SettingsRenderer({
        settings: features,
        values: options.features,
        onChange: changeOption,
      })}
      <h4>plugins</h4>
      {SettingsRenderer({
        settings: plugins,
        values: options.plugins,
        onChange: changeOption,
      })}
    </div>
  );
}
