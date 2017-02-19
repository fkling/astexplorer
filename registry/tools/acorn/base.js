import React from 'react';
import defaultParserInterface from '../../utils/defaultESTreeParserInterface.js';
import SettingsRenderer from '../../utils/SettingsRenderer';
import * as category from '../../categories/js';
import codeExample from '../../categories/js/codeExample.txt';

import pkg from 'acorn/package.json';

const ID = 'acorn';

export default {
  ...defaultParserInterface,

  displayName: ID,
  homepage: pkg.homepage,
  category,
  codeExample,

  locationProps: new Set(['range', 'loc', 'start', 'end']),

  // load needs to be implement in the "child" objects
  // and pass `parse` and `loose` to the callback
  //
  // load() {
  //  return Promise.resolve({
  //    parse: jsxInject(acorn).parse,
  //    loose: parse_dammit,
  //  });
  // },

  parse(parser, code, options={}) {
    options = Object.assign({}, this.defaultOptions, options);
    const parse = options.loose ?
      parser.loose :
      parser.parse;

    // put deep option into correspondent place
    return parse(code, {
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
          settingsConfiguration={this.settingsConfiguration}
          parserSettings={{...this.defaultOptions, ...parserSettings}}
          onChange={onChange}
        />
      </div>
    );
  },
};
