import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import {loadParser} from '../../parser-loader.js';

const ID = 'acorn';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  homepage: 'https://github.com/acornjs/acorn',
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser() {
    return loadParser('acorn@7')
  },

  parse(parsers, code, options={}) {
    let parser;
    if (options['plugins.jsx'] && !options.loose) {
      const cls = parsers.acorn.extend(parsers.acornjsx());
      parser = cls.parse.bind(cls);
    } else {
      parser = options.loose ?
        parsers.loose :
        parsers.acorn.parse.bind(parsers.acorn);
    }

    return parser(code, options);
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
  },

  getDefaultOptions() {
    return {
      ecmaVersion: 10,
      sourceType: 'module',
      allowReserved: false,
      allowReturnOutsideFunction: false,
      allowImportExportEverywhere: false,
      allowAwaitOutsideFunction: false,
      allowHashBang: false,
      locations: false,
      loose: false,
      ranges: false,
      preserveParens: false,
      'plugins.jsx': true,
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['ecmaVersion', [3, 5, 6, 7, 8, 9, 10, 11], x => Number(x)],
        ['sourceType', ['script', 'module']],
        'allowReserved',
        'allowReturnOutsideFunction',
        'allowImportExportEverywhere',
        'allowHashBang',
        'locations',
        'loose',
        'ranges',
        'preserveParens',
        'plugins.jsx',
      ],
    };
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href="https://github.com/acornjs/acorn/blob/master/acorn/src/options.js"
            target="_blank" rel="noopener noreferrer">
            Option descriptions
          </a>
        </p>
        {defaultParserInterface.renderSettings.call(
          this,
          parserSettings,
          onChange,
        )}
      </div>
    );
  },
};
