import defaultParserInterface from '../../utils/defaultParserInterface';

export default {
  ...defaultParserInterface,

  getOffset({ line, column }) {
    return this.lineOffsets[line - 1] + column - 1;
  },

  parse(parseCSS, code) {
    this.lineOffsets = [];
    let index = 0;
    do {
      this.lineOffsets.push(index);
    } while (index = code.indexOf('\n', index) + 1); // eslint-disable-line no-cond-assign
    return parseCSS(code);
  },
};
