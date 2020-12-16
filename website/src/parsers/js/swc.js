import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from '@swc/wasm-web/package.json';

const ID = 'swc';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  homepage: 'https://swc.rs/',
  locationProps: new Set(['span']),

  loadParser(callback) {
    require(['@swc/wasm-web/wasm.js'], callback);
  },

  parse(parser, code, options={}) {
    try {
      return parser.parseSync(code, options);
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
