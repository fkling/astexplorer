import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'htmlparser2/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

const ID = 'htmlparser2';
const defaultOptions = {
  xmlMode: false,
  lowerCaseAttributeNames: true,
  lowerCaseTags: true,
};

const parserSettingsConfiguration = {
  fields: Object.keys(defaultOptions),
};

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/fb55/htmlparser2',
  locationProps: new Set(['startIndex']),

  loadParser(callback) {
    require(['htmlparser2/lib/Parser', 'domhandler'], (Parser, DomHandler) => {
      class Handler extends DomHandler {
        constructor() {
          super({ withStartIndices: true });
        }

        _setEnd(elem) {
          elem.endIndex = this._parser.endIndex + 1;
        }

        onprocessinginstruction(name, data) {
          this._parser.endIndex = this._parser._tokenizer._index;
          super.onprocessinginstruction(name, data);
        }

        _addDomElement(elem) {
          super._addDomElement(elem);
          this._setEnd(elem);
        }
      }

      Handler.prototype.onclosetag =
      Handler.prototype.oncommentend =
      Handler.prototype.oncdataend =
        function onElemEnd() {
          this._setEnd(this._tagStack.pop());
        };

      callback({ Parser, Handler });
    });
  },

  parse({ Parser, Handler }, code, options) {
    let handler = new Handler();
    new Parser(handler, {...defaultOptions, ...options}).end(code);
    return handler.dom;
  },

  nodeToRange(node) {
    if (node.type) {
      return [node.startIndex, node.endIndex];
    }
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  getNodeName(node) {
    let nodeName = node.type;
    if (nodeName && node.name) {
      nodeName += `(${node.name})`;
    }
    return nodeName;
  },

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        settingsConfiguration={parserSettingsConfiguration}
        parserSettings={{...defaultOptions, ...parserSettings}}
        onChange={onChange}
      />
    );
  },

  _ignoredProperties: new Set(['prev', 'next', 'parent', 'endIndex']),
};
