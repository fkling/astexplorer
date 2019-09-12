import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'esprima/package.json';

const ID = 'esprima';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc']),

  loadParser(callback) {
    require(['esprima'], callback);
  },

  parse(esprima, code, options) {
    return esprima.parse(code, options);
  },

  *forEachProperty(node) {
    if (node && typeof node === 'object') {
      for (let prop in node) {
        if (typeof node[prop] === 'function') {
          continue;
        }
        yield {
          value: node[prop],
          key: prop,
          computed: false,
        };
      }
    }
  },

  getDefaultOptions() {
    return {
      sourceType: 'module',
      loc: false,
      range: true,
      tokens: false,
      comment: false,
      attachComment: false,
      tolerant: false,
      jsx: true,
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['sourceType', ['script', 'module']],
        'range',
        'loc',
        'attachComment',
        'comment',
        'tokens',
        'tolerant',
        'jsx',
      ],
      required: new Set(['range']),
    };
  },

};
