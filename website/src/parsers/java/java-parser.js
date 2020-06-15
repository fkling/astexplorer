import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'java-parser/package.json';

const ID = 'java-parser';

export const parserSettingsConfiguration = {
  fields: [],
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage:
    pkg.homepage ||
    'https://github.com/jhipster/prettier-java/tree/master/packages/java-parser',

  locationProps: new Set(['location']),
  typeProps: new Set(['name']),

  loadParser(callback) {
    require(['java-parser'], callback);
  },

  parse(parser, code) {
    console.time('p');
    const cst = parser.parse(code);

    const clone = JSON.parse(JSON.stringify(cst));

    console.timeEnd('p');
    return clone;
  },

  _ignoredProperties: new Set(['tokenType']),

  getDefaultOptions() {
    return {};
  },

  getNodeName({ name }) {
    return name;
  },

  nodeToRange({ location }) {
    if (!location) {
      return;
    }
    return [location.startOffset, location.endOffset + 1];
  },
};
