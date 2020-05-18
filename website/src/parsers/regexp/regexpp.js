import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'regexpp/package.json';

const ID = 'regexpp';

/** @type {import("regexpp").RegExpParser.Options} */
export const defaultOptions = {
  strict: false,
  ecmaVersion: 2020,
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['end', 'start']),

  loadParser(callback) {
    require(['regexpp'], callback);
  },

  parse(regexpp, code, options) {
    if (Object.keys(options).length === 0) {
      options = this.getDefaultOptions();
    }
    return regexpp.parseRegExpLiteral(code, options);
  },

  nodeToRange(node) {
    if (typeof node.start === 'number' && typeof node.end === 'number') {
      return [node.start, node.end];
    }
  },

  opensByDefault(node, key) {
    return (
      key === 'pattern' ||
      key === 'elements' ||
      key === 'element' ||
      key === 'alternatives'
    );
  },

  getDefaultOptions() {
    return defaultOptions;
  },

  _ignoredProperties: new Set(['parent', 'references', 'resolved']),

};
