import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'css-tree/package.json';

const ID = 'csstree';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/csstree/csstree',
  locationProps: new Set(['loc']),

  loadParser(callback) {
    require(['css-tree'], callback);
  },

  parse(csstree, code) {
    return csstree.toPlainObject(csstree.parse(code, {
      positions: true,
    }));
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange({ loc }) {
    if (loc && loc.start && loc.end) {
      return [loc.start.offset, loc.end.offset];
    }
  },

  opensByDefault(node, key) {
    return key === 'children';
  },
};
