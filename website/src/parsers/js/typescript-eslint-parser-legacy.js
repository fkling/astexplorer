import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'typescript-eslint-parser/package.json';

const ID = 'typescript-eslint-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc', 'start', 'end', 'range']),

  loadParser(callback) {
    require(['typescript-eslint-parser'], callback);
  },

  parse(parser, code, options) {
    return parser.parse(code, options);
  },

  getDefaultOptions() {
    return {
      range: true,
      loc: false,
      tokens: false,
      comment: false,
      tolerant: false,
      useJSXTextNode: false,

      ecmaFeatures: {
        jsx: true,
      },
    };
  },

  _getSettingsConfiguration(defaultOptions) {
    return {
      fields: [
        'range',
        'loc',
        'tokens',
        'comment',
        'tolerant',
        'useJSXTextNode',
        {
          key: 'ecmaFeatures',
          title: 'ecmaFeatures',
          fields: Object.keys(defaultOptions.ecmaFeatures),
          settings:
          settings => settings.ecmaFeatures || {...defaultOptions.ecmaFeatures},
        },
      ],
      required: new Set(['range']),
    };
  },
};
