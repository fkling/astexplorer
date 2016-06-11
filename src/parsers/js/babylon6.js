import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'babylon6/node_modules/babylon/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'babylon6';
const defaultOptions = {
  sourceType: 'module',
  allowImportExportEverywhere: false,
  allowReturnOutsideFunction: false,
  plugins: [
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
    'functionBind',
    'jsx',
    'objectRestSpread',
    'trailingFunctionCommas',
  ],
};
const parserSettingsConfiguration = {
  fields: [
    ['sourceType', ['module', 'script']],
    'allowReturnOutsideFunction',
    'allowImportExportEverywhere',
    {
      key: 'plugins',
      title: 'Plugins',
      fields: defaultOptions.plugins,
      settings: settings => settings.plugins || [...defaultOptions.plugins],
    },
  ],
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end']),

  loadParser(callback) {
    require(['babylon6'], callback);
  },

  parse(babylon, code, options) {
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
