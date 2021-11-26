import defaultParserInterface from '../utils/defaultParserInterface';

const pkg = {
  version: '0.0.1-x',
  homepage: 'https://engine262.js.org',
};

export default {
  ...defaultParserInterface,

  id: 'engine262-re',
  displayName: 'engine262',
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set([]),

  loadParser(callback) {
    require(['@engine262/engine262'], callback);
  },

  parse(e262, source, options) {
    e262.setSurroundingAgent(new e262.Agent());
    const jsParser = new e262.Parser({ source, json: false });
    const jsExp = jsParser.parseRegularExpressionLiteral();

    const parse = (flags) => {
      const p = new e262.RegExpParser(jsExp.RegularExpressionBody);
      return p.scope(flags, () => p.parsePattern());
    };

    if (jsExp.RegularExpressionFlags.includes('u')) {
      return parse({ U: true, N: true });
    } else {
      const pattern = parse({ U: false, N: false });
      if (pattern.groupSpecifiers.size > 0) {
        return parse({ U: false, N: true });
      }
      return pattern;
    }
  },

  nodeToRange() {},

  opensByDefault(node, key) {
    return true;
  },

  getDefaultOptions() {
    return {};
  },

  _getSettingsConfiguration() {
    return {};
  },

  _ignoredProperties: new Set(['groupSpecifiers', 'capturingGroups', 'capturingParenthesesBefore']),
};
