import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'remark/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'remark';
const defaultOptions = {
  gfm: true,
  yaml: true,
  commonmark: false,
  footnotes: false,
};

const parserSettingsConfiguration = {
  fields: Object.keys(defaultOptions),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['position']),

  loadParser(callback) {
    require(['remark'], callback);
  },

  parse(remark, code, options) {
    return remark()
      .data('settings', {...defaultOptions, ...options})
      .parse(code);
  },

  nodeToRange({position}) {
    if (position) {
      return [position.start.offset, position.end.offset];
    }
  },

  getNodeName(node) {
    return node.type;
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href="https://github.com/wooorm/remark/tree/master/packages/remark-parse#options"
            target="_blank" rel="noopener noreferrer">
            Option descriptions
          </a>
        </p>
        <SettingsRenderer
          settingsConfiguration={parserSettingsConfiguration}
          parserSettings={{...defaultOptions, ...parserSettings}}
          onChange={onChange}
        />
      </div>
    );
  },
};
