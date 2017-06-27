import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'acorn/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'acorn';
const defaultOptions = {
  ecmaVersion: 7,
  sourceType: 'module',
  allowReserved: false,
  allowReturnOutsideFunction: false,
  allowImportExportEverywhere: false,
  allowHashBang: false,
  locations: false,
  loose: false,
  ranges: false,
  preserveParens: false,
  'plugins.jsx': true,
};

const settingsConfiguration = {
  fields: [
    ['ecmaVersion', [3, 5, 6, 7, 8], x => Number(x)],
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

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  homepage: pkg.homepage,
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser(callback) {
    require(['acorn', 'acorn/dist/acorn_loose', 'acorn-jsx/inject'], (acorn, acornLoose, jsxInject) => {
      acorn = jsxInject(acorn);
      callback({
        acorn,
        acornLoose,
      });
    });
  },

  parse(parsers, code, options={}) {
    options = Object.assign({}, defaultOptions, options);
    const parser = options.loose ?
      parsers.acornLoose.parse_dammit :
      parsers.acorn.parse;

    // put deep option into correspondent place
    return parser(code, {
      ...options,
      plugins: options['plugins.jsx'] && !options.loose ? { jsx: true } : {},
    });
  },

  nodeToRange(node) {
    if (typeof node.start === 'number') {
      return [node.start, node.end];
    }
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href="https://github.com/marijnh/acorn/blob/master/src/options.js"
            target="_blank" rel="noopener noreferrer">
            Option descriptions
          </a>
        </p>
        <SettingsRenderer
          settingsConfiguration={settingsConfiguration}
          parserSettings={{...defaultOptions, ...parserSettings}}
          onChange={onChange}
        />
      </div>
    );
  },
};
