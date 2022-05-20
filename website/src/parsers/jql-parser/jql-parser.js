import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@atlassianlabs/jql-parser/package.json';
import { CharStreams, CommonTokenStream } from 'antlr4ts';

const ID = 'jql-parser';
function traverse(tree, map, lexer) {
  const name = tree.constructor.name;
  if (name === "TerminalNode") {
    const token = tree.symbol;
    map["type"] = lexer.vocabulary.getSymbolicName(token.type);
    map["text"] = token.text;
    map["position"] = { startIndex: token.startIndex, stopIndex: token.stopIndex };
  }
  else {
    const children = [];
    map[name] = children;

    if (tree.children) {
      for (var i = 0; i < tree.children.length; i++) {
        const nested = {};
        children.push(nested);
        traverse(tree.children[i], nested, lexer);
      }
    }
  }
}

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: pkg.name,
  version: pkg.version,
  homepage: 'https://www.npmjs.com/package/@atlassianlabs/jql-parser',
  locationProps: new Set(['position']),
  typeProps: new Set(['type']),

  loadParser(callback) {
    require(['@atlassianlabs/jql-parser'], callback);
  },

  parse(jqlParser, code) {
    const chars = CharStreams.fromString(code);
    const lexer = new jqlParser.JQLLexer(chars);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new jqlParser.JQLParser(tokenStream);
    const map = {};
    traverse(parser.jqlQuery(), map, lexer)
    return map;
  },

  getNodeName(node) {
    return node.type;
  },

  nodeToRange({ position }) {
    if (!position) {
      return;
    }
    return [position.startIndex, position.stopIndex];
  },
};
