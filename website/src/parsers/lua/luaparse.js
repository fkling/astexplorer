import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'luaparse/package.json';

const ID = 'luaparse';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc']),

  loadParser(callback) {
    require(['luaparse'], callback);
  },

  parse(luaparse, code, options={}) {
    return luaparse.parse(code, options);
  },

  getDefaultOptions() {
    return {
      ranges: true,
      locations: false,
      comments: true,
      scope: false,
      luaVersion: '5.1',
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        'ranges',
        'locations',
        'comments',
        'scope',
        ['luaVersion', ['5.1', '5.2', '5.3']],
      ],
      required: new Set(['ranges']),
    };

  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href="https://oxyc.github.io/luaparse/#parser-interface"
            target="_blank" rel="noopener noreferrer">
            Option descriptions
          </a>
        </p>
        {defaultParserInterface.renderSettings.call(
          this,
          parserSettings,
          onChange,
        )}
      </div>
    );
  },
};
