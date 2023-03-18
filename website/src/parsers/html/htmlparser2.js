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
          super({ withStartIndices: true, withEndIndices: true });
        }

        // It appears that htmlparser2 doesn't correctly process
        // ProcessingInstructions. Their "endIndex" isn't set properly.
        onprocessinginstruction(name, data) {
          this.parser.endIndex = this.parser.tokenizer._index;
          super.onprocessinginstruction(name, data);
        }

      }

      callback({ Parser, Handler });
    });
  },

  parse({ Parser: {Parser}, Handler }, code, options) {
    let handler = new Handler();
    new Parser(handler, options).end(code);
    return handler.root;
  },

  nodeToRange(node) {
    if (node.type) {
      return [node.startIndex, node.endIndex+1];
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

  _ignoredProperties: new Set(['prev', 'next', 'parent', 'parentNode']),
};
