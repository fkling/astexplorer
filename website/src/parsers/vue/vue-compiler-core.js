import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@vue/compiler-core/package.json';
import { isVoidTag, isHTMLTag, isSVGTag } from '@vue/shared';

const ID = '@vue/compiler-core';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['start', 'end']),
  typeProps: new Set(['tag']),

  loadParser(callback) {
    require(['@vue/compiler-core'], callback);
  },

  parse(parser, code, options) {
    return parser.baseParse(code, options);
  },

  nodeToRange(node) {
    if (node.type || node.name) {
      return [node.loc.start.offset, node.loc.end.offset];
    }
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  getNodeName(node) {
    return node.tag;
  },

  getDefaultOptions() {
    // https://github.com/vuejs/vue-next/blob/e58beec/packages/compiler-dom/src/parserOptions.ts
    return {
      isVoidTag,
      isNativeTag: tag => isHTMLTag(tag) || isSVGTag(tag),
      isPreTag: tag => tag === 'pre',
    };
  },

  _ignoredProperties: new Set([
    'components',
    'directives',
    'codegenNode',
    'helpers',
    'hoists',
    'imports',
    'cached',
    'temps',
  ]),
};
