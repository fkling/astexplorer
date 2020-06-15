import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'htmlparser2/package.json';

const ID = 'htmlparser2';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/fb55/htmlparser2',
  locationProps: new Set(['startIndex']),
  typeProps: new Set(['type', 'name']),

  loadParser(callback) {
    require(['htmlparser2/lib/Parser', 'domhandler'], (Parser, {DomHandler}) => {
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

  parse({ Parser: {Parser}, Handler }, code, options) {
    let handler = new Handler();
    new Parser(handler, options).end(code);
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

  getDefaultOptions() {
    return {
      xmlMode: false,
      lowerCaseAttributeNames: true,
      lowerCaseTags: true,
    };
  },

  _ignoredProperties: new Set(['prev', 'next', 'parent', 'parentNode', 'endIndex']),
};
