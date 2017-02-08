import React from 'react';
import defaultParserInterface from '../../utils/defaultParserInterface';
import SettingsRenderer from '../../utils/SettingsRenderer';
import * as category from '../../categories/js';
import codeExample from '../../categories/js/codeExample.txt';

import pkg from 'acorn/package.json';
import * as acorn from 'acorn';
import {parse_dammit} from 'acorn/dist/acorn_loose.js';
import jsxInject from 'acorn-jsx/inject';

const ID = 'acorn';
console.log(acorn);
console.log(acorn.parse);

export default function getBase(defaultOptions, settingsConfiguration) {
  return {
    ...defaultParserInterface,

    displayName: ID,
    homepage: pkg.homepage,
    category,
    codeExample,

    locationProps: new Set(['range', 'loc', 'start', 'end']),

    loadParser(callback) {
      callback({
        acorn: jsxInject(acorn),
        parse_dammit,
      });
    },

    parse(parsers, code, options={}) {
      options = Object.assign({}, defaultOptions, options);
      const parser = options.loose ?
        parsers.parse_dammit :
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
              target="_blank">
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
}
