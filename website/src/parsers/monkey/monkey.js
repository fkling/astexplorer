import pkg from '@gengjiawen/monkey-wasm/package.json';

import defaultParserInterface from '../utils/defaultParserInterface'

const ID = 'monkey'

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: 'https://monkeylang.org/',
  locationProps: new Set(['span']),

  async loadParser(callback) {
    require(['@gengjiawen/monkey-wasm/monkey_wasm.js'], callback);
  },

  parse(parser, code) {
    try {
      return JSON.parse(parser.parse(code));
    } catch (message) {
      // AST Explorer expects the thrown error to be an object, not a string.
      throw new SyntaxError(message);
    }
  },

  getNodeName(node) {
    return node.type
  },

  nodeToRange(node) {
    if (node && node.span && typeof node.span.start === 'number') {
      return [node.span.start, node.span.end];
    }
  },
}
