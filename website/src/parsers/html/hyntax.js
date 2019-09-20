import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'hyntax/package.json';
import {
  NODE_DOCTYPE,
  NODE_TAG,
  NODE_TEXT,
  NODE_COMMENT,
  NODE_SCRIPT,
  NODE_STYLE,
} from 'hyntax/lib-es5/constants/ast-nodes';

const ID = 'hyntax';

function getTagEndPosition (node) {
  if (node.content.close) {
    return node.content.close.endPosition + 1
  }

  if (node.content.openEnd) {
    return node.content.openEnd.endPosition + 1
  }

  return node.content.openStart.endPosition + 1
}

function getDoctypeRange (node) {
  return [
    node.content.start.startPosition,
    node.content.end.endPosition + 1,
  ];
}

function getTagRange (node) {
  const endPosition = getTagEndPosition(node);

  return [
    node.content.openStart.startPosition,
    endPosition,
  ];
}

function getTextRange (node) {
  return [
    node.content.value.startPosition,
    node.content.value.endPosition + 1,
  ];
}

function getCommentRange (node) {
  return [
    node.content.start.startPosition,
    node.content.end.endPosition + 1,
  ];
}

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/nik-garmash/hyntax',
  locationProps: new Set(['startPosition', 'endPosition']),

  loadParser (callback) {
    require([
      'hyntax/lib-es5/tokenize',
      'hyntax/lib-es5/construct-tree',
    ], (tokenize, constructTree) => {
      callback({ tokenize, constructTree });
    });
  },

  parse ({ tokenize, constructTree }, code) {
    const { tokens } = tokenize(code);
    const { ast } = constructTree(tokens);

    return ast;
  },

  nodeToRange (node) {
    if (node.nodeType !== undefined) {
      if (node.nodeType === NODE_DOCTYPE) {
        return getDoctypeRange(node);
      }

      if (
        node.nodeType === NODE_TAG ||
        node.nodeType === NODE_SCRIPT ||
        node.nodeType === NODE_STYLE
      ) {
        return getTagRange(node);
      }

      if (node.nodeType === NODE_TEXT) {
        return getTextRange(node);
      }

      if (node.nodeType === NODE_COMMENT) {
        return getCommentRange(node);
      }
    }
  },

  opensByDefault (node, key) {
    return [
      'content',
      'children',
      'value',
    ].includes(key)
  },

  getNodeName (node) {
    if (node.nodeType === undefined) {
      return;
    }

    let nodeName = node.nodeType;

    if (node.content.name !== undefined) {
      nodeName += `(${node.content.name})`;
    }

    return nodeName;
  },

  _ignoredProperties: new Set(['parentRef']),
};
