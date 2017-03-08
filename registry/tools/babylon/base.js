import React from 'react';
import * as category from '../../categories/js';
import codeExample from '../../categories/js/codeExample.txt';
import defaultParserInterface from '../../utils/defaultESTreeParserInterface';
import SettingsRenderer from '../../utils/SettingsRenderer';

export default {
  ...defaultParserInterface,

  category,
  codeExample,
  locationProps: new Set(['loc', 'start', 'end']),

  parse(babylon, code, parserSettings) {
    return babylon.parse(
      code,
      {...this.defaultOptions, ...parserSettings}
    );
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
        settingsConfiguration={this.settingsConfiguration}
        parserSettings={{...this.defaultOptions, ...parserSettings}}
        onChange={onChange}
      />
    );
  },
};
