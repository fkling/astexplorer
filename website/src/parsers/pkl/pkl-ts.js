import defaultParserInterface from '../utils/defaultParserInterface';
import { PKL_TS_VERSION } from '@pkl-ts/astexplorer';

const ID = 'pkl-ts';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: PKL_TS_VERSION,
  homepage: 'https://github.com/pkl-ts/pkl-ts',
  locationProps: new Set(['start', 'stop']),

  loadParser(callback) {
    require(['@pkl-ts/astexplorer'], callback);
  },

  parse(parsers, code, options = {}) {
    this.parsers = parsers;
    return parsers.parse(code);
  },

  nodeToRange(node) {
    return this.parsers.getNodeRange(node);
  },

  getNodeName(node) {
    return this.parsers.getNodeName(node);
  },

  *forEachProperty(node) {
    yield* this.parsers.getProperties(node);
  },
};
