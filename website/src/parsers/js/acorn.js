import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'acorn/package.json';

const ID = 'acorn';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser(callback) {
    require(['acorn', 'acorn-loose', 'acorn-jsx'], (acorn, acornLoose, acornJsx) => {
      callback({
        acorn,
        acornLoose,
        acornJsx,
      });
    });
  },

  parse(parsers, code, options={}) {
    if (Object.keys(options).length === 0) {
      options = this.getDefaultOptions();
    }
    let parser;
    if (options['plugins.jsx'] && !options.loose) {
      const cls = parsers.acorn.Parser.extend(parsers.acornJsx());
      parser = cls.parse.bind(cls);
    } else {
      parser = options.loose ?
        parsers.acornLoose.parse:
        parsers.acorn.parse;
    }

    return parser(code, {
      ...options,
      // Replace `false` with `null` to use the default value calculated from ecmaVersion.
      allowAwaitOutsideFunction: options.allowAwaitOutsideFunction || null,
    });
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
  },

  getDefaultOptions() {
    return {
      ecmaVersion: 'latest',
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
        ['ecmaVersion', [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 'latest'], x => x === 'latest' ? x : Number(x)],
        ['sourceType', ['script', 'module']],
        'allowReserved',
        'allowReturnOutsideFunction',
        'allowImportExportEverywhere',
        'allowAwaitOutsideFunction',
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
