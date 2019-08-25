import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'lucene/package.json';

const ID = 'lucene';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['fieldLocation', 'termLocation', 'location']),

  loadParser(callback) {
    require(['lucene'], callback);
  },

  parse({parse}, code) {
    return parse(code);
  },

  nodeToRange(node) {
    let start = [];
    let end = [];

    if (node.location) {
      start.push(node.location.start.offset);
      end.push(node.location.end.offset);
    }
    if (node.fieldLocation) {
      start.push(node.fieldLocation.start.offset);
      end.push(node.fieldLocation.end.offset);
    }
    if (node.termLocation) {
      start.push(node.termLocation.start.offset);
      end.push(node.termLocation.end.offset);
    }

    if (start.length === 0 || end.length === 0) {
      return;
    }

    return [start.reduce((a, b) => Math.min(a, b)), end.reduce((a, b) => Math.max(a, b))];
  },

  getDefaultOptions() {
    return {};
  },

};
