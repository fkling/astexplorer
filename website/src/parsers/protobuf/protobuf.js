import defaultParserInterface from '../utils/defaultParserInterface';

const ID = 'pbkit';

export default {
  ...defaultParserInterface,
  id: ID,
  displayName: ID,
  version: '0.0.0',
  homepage: 'https://github.com/riiid/pbkit',
  locationProps: new Set(['start', 'end']),
  typeProps: new Set(['type']),

  loadParser(callback) {
    import('./parser.mjs').then(callback);
  },

  parse(parser, code) {
    return parser.parse(code).ast;
  },

  nodeToRange(node) {
    const { start, end } = node;
    return [start, end];
  },

  opensByDefault(node, key) {
    if (key === 'statements') {
      return true;
    }
  },
};
