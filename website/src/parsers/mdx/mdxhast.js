import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@mdx-js/mdx/package.json';

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
    require(['@mdx-js/mdx', '@mdx-js/mdx/mdx-ast-to-mdx-hast'], (mdx, mdxAstToMdxHast) => callback({mdx, mdxAstToMdxHast}));
  },

  parse({mdx, mdxAstToMdxHast}, code) {
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

  opensByDefault(node, key) {
    return key === 'children';
  },
};
