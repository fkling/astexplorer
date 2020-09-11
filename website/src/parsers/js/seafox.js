import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'seafox/package.json';

const ID = pkg.name;

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['seafox'], callback);
  },

  parse(parser, code, options) {
    return parser.parse(code, options);
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
  },

  getDefaultOptions() {
    return {
      // Allow parsing using Module as the goal symbol
      module: false,

      // The flag to enable start and end offsets and line/column to each node
      loc: true,

      // Disable web compatibility
      disableWebCompat: false,

      // The flag to attach raw property to each literal and identifier node
      raw: false,

      // Enabled directives
      directives: false,

      // The flag to allow return in the global scope
      globalReturn: false,

      // The flag to enable implied strict mode
      impliedStrict: false,

      // Enable non-standard parenthesized expression node
      preserveParens: false,

      // Allows token extraction, accepts only a function
      // onToken: function () {},
    };
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href={pkg.homepage}
            target="_blank"
            rel="noopener noreferrer"
          >
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
