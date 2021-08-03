import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'stylis/package.json';

const ID = 'stylis';

function removeLength(node, lineLengths) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => removeLength(child, lineLengths));
  }
  if ('line' in node && 'column' in node) {
    delete(node.length);
    if (Array.isArray(node.children)) {
      node.length = node.children.length;
    }
  }
}

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://stylis.js.org/',
  locationProps: new Set(['line', 'column']),

  loadParser(callback) {
    require(['stylis'], callback);
  },

  parse(stylis, code) {
    const ast = stylis.compile(code);
    const rootNode = {
      type: 'Stylesheet',
      line:0,
      column:0,
      length: ast.length,
      children: ast,
    };
    removeLength(rootNode);
    return rootNode;
  },

  nodeToRange() { 
    // Return void until the stylis provides the correct position
    // @see https://github.com/thysultan/stylis.js/issues/269
  },

  _ignoredProperties: new Set(['parent', 'root']),

  opensByDefault(node, key) {
    return key === 'children' && typeof node[key] !== 'string';
  },

  getDefaultOptions() {
    return {
    };
  },

};
