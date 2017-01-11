import defaultParserInterface from './utils/defaultHandlebarsParserInterface';
import pkg from 'glimmer-syntax/package.json';

const ID = 'glimmer';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['glimmer-syntax'], (glimmer) => callback(glimmer.preprocess));
  },

  opensByDefault(node, key) {
    return key === 'body';
  },
};
