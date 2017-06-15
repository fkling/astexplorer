import React from 'react';
import pkg from 'scalameta-parsers/package.json';
import defaultParserInterface from '../utils/defaultParserInterface';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'scalameta';

const dialects = {
  'Scala 2.10': 'Scala210',
  'Scala 2.11': 'Scala211',
  'Scala 2.12': 'Scala212',
  'Sbt 0.13.6': 'Sbt0136',
  'Sbt 0.13.7': 'Sbt0137',
  'Dotty': 'Dotty',
  'Typelevel 2.11': 'Typelevel211',
  'Typelevel 2.12': 'Typelevel212',
  'Paradise 2.11': 'Paradise211',
  'Paradise 2.12': 'Paradise212',
  'Paradise Typelevel 2.11': 'ParadiseTypelevel211',
  'Paradise Typelevel 2.12': 'ParadiseTypelevel212'
}

const defaultOptions = {
  dialect: 'Scala 2.11'
}

const settingsConfiguration = {
  fields: [
    ['dialect', Object.keys(dialects)]
  ],
  required: new Set('dialect')
}

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
    return scalametaParser.parseSource(code, {
      ...defaultOptions,
      ...options,
      dialect: dialects[defaultOptions.dialect || options.dialect]
    });
  },

  nodeToRange(node) {
    if (node.pos) {
      return [node.pos.start, node.pos.end];
    }
  },

  getNodeName(node) {
    return node.type;
  },

  opensByDefault(node, key) {
    return node.type === 'Program'
      || key === 'body'
      || key === 'self'
      || key === 'stats';
  },

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        settingsConfiguration={settingsConfiguration}
        parserSettings={{...defaultOptions, ...parserSettings}}
        onChange={onChange}
      />
    )
  }

};

