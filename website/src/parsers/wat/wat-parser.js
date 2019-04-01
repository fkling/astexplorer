import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@webassemblyjs/wast-parser/package.json';

const ID = 'wat-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: 'https://webassembly.js.org/',

  locationProps: new Set(['loc']),

  getOffset({ line, column }) {
    return this.lineOffsets[line - 1] + column;
  },

  nodeToRange({ loc }) {
    if (!loc) return;
    return [loc.start, loc.end].map(pos => this.getOffset(pos));
  },

  loadParser(callback) {
    require(['@webassemblyjs/wast-parser'], function(parser) {
      callback(parser);
    });
  },

  parse({ parse }, code) {
    this.lineOffsets = [];
    let index = 0;
    do {
      this.lineOffsets.push(index);
    } while (index = code.indexOf('\n', index) + 1); // eslint-disable-line no-cond-assign
    return parse(code);
  },
};
