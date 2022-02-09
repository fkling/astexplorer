import defaultParserInterface from '../utils/defaultParserInterface';

const pkg = {
  version: '0.0.1-x',
  homepage: 'https://engine262.js.org',
};

const ID = 'engine262';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['location']),

  loadParser(callback) {
    require(['@engine262/engine262'], callback);
  },

  parse(e262, source, options) {
    e262.setSurroundingAgent(new e262.Agent());
    const p = new e262.Parser({ source, json: false });
    const parseMethod = options.sourceType === 'module' ?
      'parseModule' :
      'parseScript';
    const ast = p[parseMethod]();
    if (options.earlyErrors && p.earlyErrors.size > 0) {
      throw [...p.earlyErrors][0];
    }
    return ast;
  },

  nodeToRange({ location }) {
    if (location) {
      return [location.startIndex, location.endIndex];
    }
  },

  opensByDefault(node, key) {
    return key !== 'location';
  },

  getDefaultOptions() {
    return {
      earlyErrors: false,
      sourceType: 'module',
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['sourceType', ['script', 'module']],
        'earlyErrors',
      ],
    };
  },

  _ignoredProperties: new Set([
    'strict',
    'arrowInfo',
  ]),
};
