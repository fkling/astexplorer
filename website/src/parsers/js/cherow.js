import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'cherow/package.json';

const ID = 'cherow';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['cherow'], callback);
  },

  parse(cherow, code, options) {
    return cherow.parse(code, options);
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
  },

  getDefaultOptions() {
    return {
      module: false,
      loc: false,
      ranges: false,
      globalReturn: false,
      skipShebang: false,
      impliedStrict: false,
      next: false,
      jsx: false,
      tolerant: false,
      // source: '',
      experimental: false,
      raw: false,
      rawIdentifier: false,
      node: false,
    };
  },

  _getSettingsConfiguration() {

    return {
      fields: [
        'module',
        'loc',
        'ranges',
        'globalReturn',
        'skipShebang',
        'impliedStrict',
        'next',
        'jsx',
        'tolerant',
        // 'source',
        'experimental',
        'raw',
        'rawIdentifier',
        'node',
      ],
    };
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href="https://github.com/cherow/cherow/tree/master/packages/cherow"
            target="_blank" rel="noopener noreferrer">
            Option descriptions
          </a>
        </p>
        {defaultParserInterface.renderSettings.call(
          this,
          parserSettings,
          onChange
        )}
      </div>
    );
  },
};
