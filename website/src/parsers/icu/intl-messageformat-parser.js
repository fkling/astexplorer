import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'intl-messageformat-parser/package.json';

const ID = 'intl-messageformat-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/yahoo/intl-messageformat-parser',
  locationProps: new Set(['location']),

  loadParser(callback) {
    require(['intl-messageformat-parser'], callback);
  },

  parse(parser, code) {
    return parser.parse(code);
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange({ location }) {
    if (location && location.start && location.end) {
      return [location.start.offset, location.end.offset];
    }
  },

  opensByDefault(node, key) {
    return key === 'elements' || key === 'options';
  },
};
