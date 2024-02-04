import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'pgsql-ast-parser/package.json';

const ID = 'pgsql-ast-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/oguimbal/pgsql-ast-parser',

  loadParser(callback) {
    require(['pgsql-ast-parser'], callback);
  },

  parse(parser, code) {
    return parser.parse(code);
  },

  getNodeName(node) {
    return node.type;
  },
};
