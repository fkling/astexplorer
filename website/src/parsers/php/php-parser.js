import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'php-parser/package.json';

const ID = 'php-parser';

const defaultOptions = {
  parser: {
    extractDoc: true,
  },
  ast: {
    withPositions: true,
  },
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc']),
  typeProps: new Set(['kind']),

  loadParser(callback) {
    require(['php-parser'], callback);
  },

  parse(Engine, code) {
    const parser = new Engine(defaultOptions);
    return parser.parseCode(code, '');
  },

  getNodeName(node) {
    return node.kind;
  },

  nodeToRange(node) {
    if (node.loc && node.loc.start && node.loc.end) {
      return [node.loc.start.offset, node.loc.end.offset];
    }
  },

  opensByDefault(node, key) {
    return key === 'body' || key === 'what' || key === 'items';
  },
};
