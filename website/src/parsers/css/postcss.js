import defaultParserInterface from './utils/defaultCSSParserInterface';
import pkg from 'postcss/package.json';

const ID = 'postcss';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['source']),

  loadParser(callback) {
    require(['postcss/lib/parse', 'postcss-scss/lib/scss-parse', 'postcss-less/lib/', 'postcss-safe-parser'], (builtIn, scss, less, safe) => {
      callback({
        'built-in': builtIn,
        scss,
        less: less.parse,
        'safe-parser': safe,
      });
    });
  },

  parse(parsers, code, options) {
    return defaultParserInterface.parse.call(
      this,
      parsers[options.parser],
      code,
    );
  },

  nodeToRange({ source: range }) {
    if (!range || !range.end) return;
    return [
      this.getOffset(range.start),
      this.getOffset(range.end) + 1,
    ];
  },

  opensByDefault(node, key) {
    return key === 'nodes';
  },

  _ignoredProperties: new Set(['parent', 'input']),

  getDefaultOptions() {
    return {
      parser: 'built-in',
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['parser', ['built-in', 'scss', 'less', 'safe-parser']],
      ],
    };
  },
};
