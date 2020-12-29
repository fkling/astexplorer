import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'intl-messageformat-parser/package.json';

const ID = 'intl-messageformat-parser';
const TYPES = {};

export const parserSettingsConfiguration = {
  fields: [
    'captureLocation',
    'ignoreTag',
    'normalizeHashtagInPlural',
    'shouldParseSkeletons',
  ],
};

const defaultOptions = {
  captureLocation: true,
  normalizeHashtagInPlural: true,
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage:
    pkg.homepage || 'https://formatjs.io/docs/intl-messageformat-parser/',
  locationProps: new Set(['location']),

  loadParser(callback) {
    require(['intl-messageformat-parser'], (all) => {
      Object.keys(all.TYPE).forEach((k) => {
        TYPES[k] = all.TYPE[k];
      });
      callback(all);
    });
  },

  parse(parser, code, opts) {
    return parser.parse(code, opts);
  },

  _getSettingsConfiguration() {
    return parserSettingsConfiguration;
  },

  getDefaultOptions() {
    return defaultOptions;
  },

  getNodeName(node) {
    return node.type != null && TYPES[node.type];
  },

  nodeToRange({ location }) {
    if (location && location.start && location.end) {
      return [location.start.offset, location.end.offset];
    }
  },
};
