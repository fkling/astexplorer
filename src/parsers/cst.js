import React from 'react';
import pkg from 'cst/package.json';
import loadAndExecute from './utils/loadAndExecute';
import * as LocalStorage from '../LocalStorage';
import SettingsRenderer from './utils/SettingsRenderer';

const ID = 'cst';

const options = {
  strictMode: true
};

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return loadAndExecute(
      ['cst'],
      cst => {
        let parser = new cst.Parser();
        if (!options.strictMode) {
          parser.disableStrictMode();
        }
        return parser.parse(code);
      }
    );
  },

  nodeToRange(node) {
    return node.range;
  },

  renderSettings() {
    return Settings();
  },
};

let parserSettings = [
  'strictMode',
];

function changeOption(name, {target}) {
  if (name === 'strictMode') {
    options.strictMode = target.value;
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
    </div>
  );
}
