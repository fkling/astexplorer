import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'tenko/package.json';

const ID = 'tenko';
export const defaultOptions = {
  goalMode: 'script',
  webCompat: true,
  strictMode: false,
  targetEsVersion: Infinity,
  ranges: true,

  babelCompat: false,
  acornCompat: false,

  exposeScopes: false,
  astUids: false,
  allowGlobalReturn: false,
  fullErrorContext: false,
  templateNewlineNormalization: true,
};

export const parserSettingsConfiguration = {
  fields: [
    ['goalMode', ['script', 'module']],
    'allowGlobalReturn',
    'strictMode',
    'webCompat',
    ['targetEsVersion', [Infinity, 6, 7, 8, 9, 10, 11]],
    'exposeScopes',
    'astUids',
    'fullErrorContext',
    'templateNewlineNormalization',
    'ranges',
    'acornCompat',
    'babelCompat',
  ],
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['loc']),

  loadParser(callback) {
    require(['tenko'], callback);
  },

  parse(tenko, code, options) {
    return tenko.Tenko(code, {...options});
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange(node) {
    if (node.loc && node.loc.range) {
      return [node.loc.range.start, node.loc.range.end];
    }
  },

  getDefaultOptions() {
    return defaultOptions;
  },

  _getSettingsConfiguration() {
    return parserSettingsConfiguration;
  },
};
