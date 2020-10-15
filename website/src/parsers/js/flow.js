import defaultParserInterface from './utils/defaultESTreeParserInterface';
import {loadParser} from '../../parser-loader.js';

const ID = 'flow';
export const defaultOptions = {
  enums: false,
  esproposal_class_instance_fields: true,
  esproposal_class_static_fields: true,
  esproposal_decorators: true,
  esproposal_export_star_as: true,
  esproposal_optional_chaining: true,
  esproposal_nullish_coalescing: true,
  tokens: false,
  types: true,
};
export const parserSettingsConfiguration = {
  fields: [
    'enums',
    'esproposal_class_instance_fields',
    'esproposal_class_static_fields',
    'esproposal_decorators',
    'esproposal_export_star_as',
    'esproposal_optional_chaining',
    'esproposal_nullish_coalescing',
    'tokens',
    'types',
  ],
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  homepage: 'https://flowtype.org/',
  locationProps: new Set(['range', 'loc']),

  loadParser() {
    return loadParser('flow-parser@0')
  },

  parse({flowParser}, code, options) {
    console.log(flowParser);
    return flowParser.parse(code, options);
  },

  getDefaultOptions() {
    return defaultOptions;
  },

  _getSettingsConfiguration() {
    return parserSettingsConfiguration;
  },
};
