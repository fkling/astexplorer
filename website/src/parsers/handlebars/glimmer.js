import defaultParserInterface from './utils/defaultHandlebarsParserInterface';
import pkg from '@glimmer/syntax/package.json';

const ID = 'glimmer';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/glimmerjs/glimmer-vm',

  loadParser(callback) {
    require(['@glimmer/syntax'], (glimmer) => callback(glimmer.preprocess));
  },

  opensByDefault(node, key) {
    return key === 'body';
  },
};
