import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'typescript-eslint-parser/package.json';

const ID = 'typescript-eslint-parser';
const name = pkg.name;

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end', 'range']),

  loadParser(callback) {
    require(['typescript-eslint-parser'], callback);
  },

  parse(parser, code) {
    const opts = {};
    const ast = parser.parse(code, opts);
    delete ast.tokens;
    return ast;
  },
};
