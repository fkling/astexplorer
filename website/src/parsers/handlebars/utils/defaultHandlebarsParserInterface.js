import defaultParserInterface from '../../utils/defaultParserInterface';

export default {
  ...defaultParserInterface,

  locationProps: new Set(['loc']),

  parse(parseHandlebars, code) {
    this.lineOffsets = [];
    let index = 0;
    do {
      this.lineOffsets.push(index);
    } while (index = code.indexOf('\n', index) + 1); // eslint-disable-line no-cond-assign
    return parseHandlebars(code);
  },

  getOffset({ line, column }) {
    return this.lineOffsets[line - 1] + column;
  },

  nodeToRange({ loc }) {
    if (!loc) return;
    return [loc.start, loc.end].map(pos => this.getOffset(pos));
  },
};
