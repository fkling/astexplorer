import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'node-html-parser/package.json';

const ID = 'node-html-parser';
const name = 'node-html-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['node-html-parser'], callback);
  },

  parse(nodeHtmlParser, code, options) {
    return nodeHtmlParser.parse(code, options);
  },

  opensByDefault(node, key) {
    return key === 'childNodes';
  },

  getNodeName(node) {
    return (node.nodeType === 3) ? '#text' :
      (node.nodeType === 8) ? '#comment' :
      (node.id) ? `${node.rawTagName} (id: ${node.id})` :
      node.rawTagName
  },

  getDefaultOptions() {
    return {
      lowerCaseTagName: false,
      comment: true
    };
  },

  typeProps: new Set(['nodeType']),

  _ignoredProperties: new Set(['parentNode']),
};
