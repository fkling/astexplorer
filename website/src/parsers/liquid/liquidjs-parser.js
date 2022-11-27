import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'liquidjs/package.json';

const ID = 'liquidjs';

const TokenNames = {
  1: 'Number',
  2: 'Literal',
  4: 'Tag',
  8: 'Output',
  16: 'HTML',
  32: 'Filter',
  64: 'Hash',
  128: 'PropertyAccess',
  256: 'Word',
  512: 'Range',
  1024: 'Quoted',
  2048: 'Operator',
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['begin', 'end']),
  typeProps: new Set(['kind']),

  loadParser(callback) {
    require(['liquidjs'], (module) => callback(new module.Liquid()));
  },

  parse(parser, code) {
    return parser.parse(code);
  },

  opensByDefault(node, key) {
    return key === 'token';
  },

  nodeToRange(node) {
    if (typeof node.kind === 'number') {
      return [node.begin, node.end];
    }
    if (node.token && typeof node.token.kind === 'number') {
      return [node.token.begin, node.token.end];
    }
  },

  getNodeName(node) {
    if (node.kind) {
      return `${TokenNames[node.kind]}Token`
    }
    if (node.token) {
      const tokenKind = TokenNames[node.token.kind];
      if (tokenKind === 'Tag') {
        return `Tag(${node.name})`
      }
      return tokenKind
    }
  },

  getDefaultOptions() {
    return {};
  },
  _ignoredProperties: new Set(['liquid', 'impl', 'file', 'kind', 'input', 'trimLeft', 'trimRight']),
};
