import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';

const ID = 'swc';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  homepage: 'https://swc.rs/',
  locationProps: new Set(['span']),

  loadParser(callback) {
    import("@swc/wasm-web/wasm.js").then(mod => mod.default().then(() => callback(mod.parseSync)));
  },

  parse(parser, code, options = {}) {
    try {
      return parser(code, options);
    } catch (message) {
      // AST Explorer expects the thrown error to be an object, not a string.
      throw new SyntaxError(message);
    }
  },

  nodeToRange(node) {
    if (node && node.span && typeof node.span.start === 'number') {
      return [node.span.start, node.span.end];
    }
  },

  getDefaultOptions() {
    return {
      syntax: 'ecmascript',
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['syntax', ['ecmascript', 'typescript']],
      ],
    };
  },

};
