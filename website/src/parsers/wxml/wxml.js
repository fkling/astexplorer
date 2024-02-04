import { VERSION, parse } from '@wxml/parser';
import defaultParserInterface from '../utils/defaultParserInterface';

const ID = 'wxml';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  homepage: 'https://github.com/wxmlfile/wxml-parser',
  version: VERSION,
  locationProps: new Set(['start', 'end', 'loc']),

  async loadParser(callback) {
    require(['@wxml/parser'], callback);
  },

  parse(parser, code) {
    try {
      return parser.parse(code);
    } catch (message) {
      // AST Explorer expects the thrown error to be an object, not a string.
      throw new SyntaxError(message);
    }
  },
  opensByDefault(node, key) {
    return key === 'children';
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
    return node.range;
  },
};
