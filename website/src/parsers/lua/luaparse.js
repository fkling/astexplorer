import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'luaparse/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'luaparse';

const defaultOptions = {
  ranges: true,
  locations: false,
  comments: true,
  scope: false,
  luaVersion: '5.1',
};

const settingsConfiguration = {
  fields: [
    'ranges',
    'locations',
    'comments',
    'scope',
    ['luaVersion', ['5.1', '5.2', '5.3']],
  ],
  required: new Set(['ranges']),
};

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
    return luaparse.parse(code, {...defaultOptions, ...options});
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href="https://oxyc.github.io/luaparse/#parser-interface"
            target="_blank">
            Option descriptions
          </a>
        </p>
        <SettingsRenderer
          settingsConfiguration={settingsConfiguration}
          parserSettings={{...defaultOptions, ...parserSettings}}
          onChange={onChange}
        />
      </div>
    );
  },
};
