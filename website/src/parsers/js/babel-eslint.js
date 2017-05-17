import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'babel-eslint/package.json';

const ID = 'babel-eslint';
const name = 'babel-eslint';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end', 'range']),

  loadParser(callback) {
    require(['babel-eslint'], babelEslint => callback(babelEslint));
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
