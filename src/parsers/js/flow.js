import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'flow-parser/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';
import * as LocalStorage from '../../LocalStorage';

const ID = 'flow';
const options = {
  esproposal_decorators: true,
  esproposal_class_instance_fields: true,
  esproposal_class_static_fields: true,
  types: true,
  ...LocalStorage.getParserSettings(ID),
};

const settings = [
  'esproposal_decorators',
  'esproposal_class_instance_fields',
  'esproposal_class_static_fields',
  'types',
];

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc']),

  loadParser(callback) {
    require(['flow-parser'], callback);
  },

  parse(flowParser, code) {
    return flowParser.parse(code, options);
  },

  renderSettings() {
    return SettingsRenderer({
      settings,
      values: options,
      onChange: changeOption,
    });
  },
};

function changeOption(name, {target}) {
  options[name] = target.checked;
  LocalStorage.setParserSettings(ID, options);
}
