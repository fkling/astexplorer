import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@mdx-js/mdx/package.json';
import mdxAstToMdxHast from '@mdx-js/mdx/mdx-ast-to-mdx-hast'

const ID = 'mdxhast';

function removeNewlines(node) {
  if (node.children != null) {
    node.children = node.children.filter(node => node.value !== '\n');
    node.children.forEach(removeNewlines);
  }
}

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: 'https://mdxjs.com',
  locationProps: new Set(['position']),

  loadParser(callback) {
    require(['@mdx-js/mdx'], callback);
  },

  parse(mdx, code) {
    let result;

    mdx.sync(code, {
      hastPlugins: [
        mdxAstToMdxHast,
        () => removeNewlines,
        () => tree => {
          result = tree;
        },
      ],
    });

    return result;
  },

  nodeToRange({ position }) {
    if (position) {
      return [position.start.offset, position.end.offset];
    }
  },

  getNodeName(node) {
    return node.type;
  },

  opensByDefault(node, key) {
    return key === 'children';
  },
};
