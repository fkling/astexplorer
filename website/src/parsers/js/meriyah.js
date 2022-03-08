import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'meriyah/package.json';

const ID = pkg.name;

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['meriyah'], callback);
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
      // The flag to allow module code
      module: false,

      // The flag to enable stage 3 support (ESNext)
      next: false,

      // The flag to enable start and end offsets to each node
      ranges: false,

      // Enable web compability
      webcompat: true,

      // The flag to enable line/column location information to each node
      loc: false,

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

      // Enable lexical binding and scope tracking
      lexical: true,

      // Adds a source attribute in every node’s loc object when the locations option is `true`
      source: false,

      // Distinguish Identifier from IdentifierPattern
      identifierPattern: false,

      // Enable React JSX parsing
      jsx: false,

      // Allow edge cases that deviate from the spec
      specDeviation: false,

      // Allowes comment extraction. Accepts either a function or array
      // onComment:
      
      // Allows token extraction. Accepts either a a callback function or an array
      // onToken:
      
      // Creates unique key for in ObjectPattern when key value are same
      uniqueKeyInPattern: false,

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
