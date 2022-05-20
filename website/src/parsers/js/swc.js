import React from 'react';
import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from '@swc/wasm-web/package.json';
// Webpack is configured to resolve this to a file path which is loaded
// dynamically below.
import wasm_bg from '@swc/wasm-web/wasm_bg.wasm';

const ID = 'swc';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: `${pkg.version}`,
  homepage: pkg.repository.url,
  locationProps: new Set(['range', 'loc', 'start', 'end']),

  loadParser(callback) {
    require(['@swc/wasm-web/wasm.js'], (instance) => {
      instance.default(wasm_bg).then(() => {
        callback(instance)
      });
    });
  },

  parse(parsers, code, options = {}) {
    try {
      return parsers.parseSync(code, {...this.getDefaultOptions(), ...options});
    } catch (message) {
      throw new SyntaxError(message);
    }
  },

  nodeToRange(node) {
    if (node && node.span && typeof node.span.start === 'number') {
      return [node.span.start, node.span.end];
    }
  },

  getNodeName(node) {
    return node.type;
  },

  getDefaultOptions() {
    return {
      syntax: "ecmascript",
      jsx: false
    };
  },

  _getSettingsConfiguration() {
    return {
      fields: [
        ['syntax', ['typescript', 'ecmascript']],
        'jsx',
        'tsx',
        'dynamicImport',
        'privateMethod',
        'functionBind',
        'exportDefaultFrom',
        'exportNamespaceFrom',
        'decorators',
        'decoratorsBeforeExport',
        'topLevelAwait',
        'importMeta'
      ],
    };
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          <a
            href="https://swc.rs/docs/configuration/compilation#jscparser"
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
