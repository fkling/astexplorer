import defaultParserInterface from '../utils/defaultParserInterface'
import pkg from 'kotlin-parser-antlr/package.json'

const ID = 'kotlin-parser-antlr'

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  locationProps: new Set(['location']),

  loadParser(callback) {
    require(['kotlin-parser-antlr'], module => {
      callback(module.default)
    })
  },

  parse(parser, code, options) {
    return parser.parse(code, options)
  },

  nodeToRange({ location }) {
    if (location) {
      return [location.start.offset, location.stop.offset + 1]
    }
  },

  getDefaultOptions() {
    return {
      simplifyTree: false,
    }
  },
}
