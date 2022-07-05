import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from '@ibyar/expressions/package.json';

const ID = '@ibyar/expressions';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    import('@ibyar/expressions').then(module => callback(module.JavaScriptParser));
  },

  parse(parser, code) {
    return parser.parse(code);
  },
};
