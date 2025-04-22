import pkg from '@solidity-parser/parser/package.json';
import defaultParserInterface from '../utils/defaultParserInterface';

const ID = 'solidity-parser-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/solidity-parser/parser',

  loadParser(callback) {
    require(['@solidity-parser/parser'], callback);
  },

  parse(parser, code, options) {
    return parser.parse(code, options);
  },

  opensByDefault(node, key) {
    return node.type === 'SourceUnit' ||
      node.type === 'ContractDefinition' ||
      key === 'children' ||
      key === 'subNodes' ||
      key === 'body'
  },

  getDefaultOptions() {
    return {
      range: true,
      loc: false,
      tolerant: false,
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        'range',
        'loc',
        'tolerant',
      ],
    };
  },

};

