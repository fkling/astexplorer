import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'mdx1/package.json';

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
  homepage: pkg.homepage,
  locationProps: new Set(['position']),

  loadParser(callback) {
    require(['mdx1', 'mdx1/mdx-ast-to-mdx-hast'], (mdx, mdxAstToMdxHast) => callback({mdx, mdxAstToMdxHast}));
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
