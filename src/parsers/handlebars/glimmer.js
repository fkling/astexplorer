import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'glimmer-syntax/package.json';

const ID = 'glimmer';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  locationProps: new Set(['loc']),

  loadParser(callback) {
    require(['glimmer-syntax'], callback);
  },

  parse(glimmer, code, options) {
    this.lineOffsets = [];
    let index = 0;
    do {
      this.lineOffsets.push(index);
    } while (index = code.indexOf('\n', index) + 1); // eslint-disable-line no-cond-assign

    return glimmer.preprocess(code, options);
  },

  getOffset({ line, column }) {
    return this.lineOffsets[line - 1] + column;
  },

  nodeToRange({ loc }) {
    if (!loc) return;
    return [loc.start, loc.end].map(pos => this.getOffset(pos));
  },

  opensByDefault(node, key) {
    return key === 'body';
  },
};
