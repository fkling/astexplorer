import defaultParserInterface from '../utils/defaultParserInterface';
import { parse } from '@creditkarma/thrift-parser';
import pkg from '@creditkarma/thrift-parser/package.json';

const ID = 'ck-thrift-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: 'https://github.com/creditkarma/thrift-parser',
  locationProps: new Set(['location']),

  loadParser(callback) {
    callback(content => {
      return parse(content);
    });
  },

  parse(parser, code) {
    return parser(code);
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange({ loc }) {
    if (loc !== null && loc !== undefined) {
      return [loc.start.index, loc.end.index];
    }
  },

  opensByDefault(node, key) {
    return node === 'ThriftDocument' || key === 'body';
  },
};
