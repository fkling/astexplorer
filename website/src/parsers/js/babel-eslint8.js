import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'babel-eslint8/babel-eslint-package';

const ID = 'babel-eslint8';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end', 'range']),

  loadParser(callback) {
    require(['babel-eslint8'], callback);
  },

  parse(parser, code) {
    const opts = {
      sourceType: 'module',
    };

    const ast = parser.parseNoPatch(code, opts);
    delete ast.tokens;
    return ast;
  },

  nodeToRange(node) {
    if (typeof node.start !== 'undefined') {
      return [node.start, node.end];
    }
  },

  _ignoredProperties: new Set([
    '_paths',
    '_babelType',
    '__clone',
  ]),
};
