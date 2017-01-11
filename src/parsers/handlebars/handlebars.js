import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'handlebars/package.json';

const ID = 'handlebars';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  locationProps: new Set(['loc']),

  loadParser(callback) {
    require(['handlebars'], callback);
  },

  parse(handlebars, code, options) {
    this.lineOffsets = [];
    let index = 0;
    do {
      this.lineOffsets.push(index);
    } while (index = code.indexOf('\n', index) + 1); // eslint-disable-line no-cond-assign

    return handlebars.parse(code, options);
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
