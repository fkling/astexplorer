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
    require(['@babel/eslint-parser', '@babel/preset-react'], (
      babelEslintParser,
      babelPresetReact
    ) => {
      callback({
        babelEslintParser,
        babelPresetReact,
      });
    });
  },

  parse(parsers, code) {
    const opts = {
      sourceType: 'module',
      requireConfigFile: false,
      babelOptions: {
        presets: ['@babel/preset-react'],
      },
    };

    const ast = parsers.babelEslintParser.parse(code, opts);
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
