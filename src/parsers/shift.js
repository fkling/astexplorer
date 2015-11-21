import React from 'react'; // eslint-disable-line no-unused-vars
import pkg from 'shift-parser/package.json';
import SettingsRenderer from './utils/SettingsRenderer';
import * as LocalStorage from '../LocalStorage';

const ID = 'shift';
const options = Object.assign(
  {
    loc: true,
    earlyErrors: false,
    sourceType: 'module',
  },
  LocalStorage.getParserSettings(ID)
);

const settings = [
  'loc',
  'earlyErrors',
  ['sourceType', ['script', 'module']],
];

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  parse(code) {
    return new Promise((resolve, reject) => {
      require.ensure(['shift-parser'], require => {
        try {
          const shift = require('shift-parser');
          if (options.sourceType === 'module') {
            resolve(shift.parseModule(code, options));
          } else {
            resolve(shift.parseScript(code, options));
          }
        } catch(err) {
          reject(err);
        }
      });
    });
  },

  nodeToRange(node) {
    if (node.loc) {
      return [node.loc.start.offset, node.loc.end.offset];
    }
  },

  renderSettings() {
    return SettingsRenderer({
      settings,
      required: new Set(['loc']),
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
