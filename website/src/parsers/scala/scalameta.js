import pkg from 'scalameta-parsers/package.json';
import defaultParserInterface from '../utils/defaultParserInterface';

const ID = 'scalameta';

const dialects = {
  'Scala 2.10': 'Scala210',
  'Scala 2.11': 'Scala211',
  'Scala 2.12': 'Scala212',
  'Scala 2.13': 'Scala213',
  'Scala 3': 'Scala3',
  'Sbt 0.13.6': 'Sbt0136',
  'Sbt 0.13.7': 'Sbt0137',
  'Sbt 1': 'Sbt 1',
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/scalameta/scalameta',
  locationProps: new Set(['pos']),

  loadParser(callback) {
    require(['scalameta-parsers'], callback);
  },

  parse(scalametaParser, code, options) {
    const parsed = scalametaParser.parseSource(code, options);
    const { error, lineNumber, columnNumber } = parsed;
    if (error) {
      const e = new SyntaxError(parsed.error);
      e.lineNumber = lineNumber + 1;
      e.columnNumber = columnNumber + 1;
      throw e;
    }
    return parsed;
  },

  nodeToRange(node) {
    if (node.pos) {
      return [node.pos.start, node.pos.end];
    }
  },

  opensByDefault(node, key) {
    return (
      node.type === 'Program' ||
      key === 'body' ||
      key === 'self' ||
      key === 'stats'
    );
  },

  getDefaultOptions() {
    return {
      dialect: 'Scala213',
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [['dialect', dialects]],
      required: new Set('dialect'),
    };
  },
};
