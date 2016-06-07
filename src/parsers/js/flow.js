import React from 'react'; // eslint-disable-line no-unused-vars
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'flow-parser/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'flow';
const defaultOptions = {
  esproposal_class_instance_fields: true,
  esproposal_class_static_fields: true,
  esproposal_decorators: true,
  esproposal_export_star_as: true,
  types: true,
};
const parserSettingsConfiguration = {
  fields: [
    'esproposal_class_instance_fields',
    'esproposal_class_static_fields',
    'esproposal_decorators',
    'esproposal_export_star_as',
    'types',
  ],
};

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

  parse(flowParser, code, options) {
    return flowParser.parse(code, {...defaultOptions, ...options});
  },

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        settingsConfiguration={parserSettingsConfiguration}
        parserSettings={{...defaultOptions, ...parserSettings}}
        onChange={onChange}
      />
    );
  },
};
