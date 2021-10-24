import defaultParserInterface from './utils/defaultHandlebarsParserInterface';
import pkg from 'bigodon/package.json';

const ID = 'bigodon';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['bigodon'], (bigodon) => callback(bigodon.parse));
  },

  getOffset(position) {
    return position;
  },

  opensByDefault(node, key) {
    return key === 'params';
  },
};
