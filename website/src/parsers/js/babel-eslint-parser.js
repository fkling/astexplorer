import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from '@babel/eslint-parser/package.json';

const ID = '@babel/eslint-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end', 'range']),

  loadParser(callback) {
    require(['@babel/eslint-parser'], callback);
  },

  parse(parser, code) {
    const opts = {
      sourceType: 'module',
      requireConfigFile: false,
      babelOptions: {
        parserOpts: {
          plugins: ['jsx'],
        },
      },
    };

    const ast = parser.parse(code, opts);
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
