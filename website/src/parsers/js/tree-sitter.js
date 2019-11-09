import defaultParserInterface from './utils/defaultESTreeParserInterface';
import pkg from 'tree-sitter-javascript/package.json';

/** @typedef {typeof import('web-tree-sitter')} ParserCtor */
/** @typedef {import('web-tree-sitter')} Parser */
/** @typedef {import('web-tree-sitter').Language} Language */
/** @typedef {import('web-tree-sitter').Tree} Tree */
/** @typedef {import('web-tree-sitter').SyntaxNode} SyntaxNode */

const ID = 'tree-sitter-javascript';
export const defaultOptions = {
};
export const parserSettingsConfiguration = {
};

export async function loadParser() {
  const {default: Parser, Language} = await import('web-tree-sitter');
  await Parser.init();
  const parser = new Parser();
  const JavaScript = await Language.load('tree-sitter-javascript.wasm');
  parserInterface.forEachProperty = createForEachProperty(JavaScript);
  parser.setLanguage(JavaScript);
  return parser;
}

/** @param language {Language} */
export const createForEachProperty = (language) =>
/** @param node {SyntaxNode | Array<SyntaxNode>} */ 
function *forEachProperty(node) {
  if (node.rootNode) {
    node = node.rootNode;
  }
  if (Array.isArray(node)) {
    for (let i in node) {
      yield {
        value: node[i],
        key: i
      }
    }
    return;
  }
  yield {
    value: node.type,
    key: 'type',
  }
  for (let i = 0; i < language.fieldCount; i++) {
    const id = i + 1;
    const key = language.fieldNameForId(id);
    const value = key && node.childForFieldId(id);
    if (value) {
      yield {value, key}
    }
  }
  if (node.children.length > 0) {
    yield {
      value: node.children,
      key: 'children',
    }
  }
  if (node.namedChildCount === 0) {
    yield {
      value: node.text,
      key: 'text',
    }
  }
}

const parserInterface = {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'http://tree-sitter.github.io',
  locationProps: new Set(['range', 'loc']),

  loadParser(resolve, reject) {
    loadParser().then(resolve, reject);
  },

  parse(/** @type {Parser} */ parser, code, options, previous) {
    return parser.parse(code, previous, options)
  },


  /** @param node {SyntaxNode} */
  nodeToRange(node) {
    // Might be the tree, we need the node.
    if (node.rootNode) {
      node = node.rootNode;
    }
    return [node.startIndex, node.endIndex]
  },
  // getDefaultOptions() {
  //   return defaultOptions;
  // },

  /** @param treeOrNode {Tree | SyntaxNode} */
  *forEachProperty(treeOrNode) {
    // This will be replaced on loadParser
  },

  getNodeName(node) {
    return node.type;
  },

  // _getSettingsConfiguration() {
  //   return parserSettingsConfiguration;
  // },
};
export default parserInterface;
