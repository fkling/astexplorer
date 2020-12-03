import defaultParserInterface from '../js/utils/defaultESTreeParserInterface';
import pkg from '@angular-eslint/template-parser/package.json';

const ID = '@angular-eslint/template-parser';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/angular-eslint/angular-eslint',
  locationProps: new Set(['loc', 'start', 'end', 'range']),

  loadParser(callback) {
    require(['@angular-eslint/template-parser'], callback);
  },

  parse(parser, code, options) {
    return parser.parse(code, options);
  },
};
