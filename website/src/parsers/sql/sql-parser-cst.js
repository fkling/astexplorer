import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'sql-parser-cst/package.json';

const ID = 'sql-parser-cst';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/nene/sql-parser-cst',
  locationProps: new Set(['range']),

  loadParser(callback) {
    require(['sql-parser-cst'], callback);
  },

  parse(parser, code, options) {
    return parser.parse(code, options);
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange(node) {
    return node.range;
  },

  getDefaultOptions() {
    return {
      dialect: 'sqlite',
      preserveComments: true,
      includeRange: true,
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['dialect', ['sqlite', 'mysql']],
        'preserveComments',
        'preserveNewlines',
        'preserveSpaces',
        'includeRange',
      ],
    };
  },
};
