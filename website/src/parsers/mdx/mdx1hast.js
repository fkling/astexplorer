import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'mdx1/package.json';

const ID = 'mdx1-hast';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['position']),

  loadParser(callback) {
    require(['mdx1'], (mdx) => callback({ mdx }));
  },

  parse({ mdx }, code) {
    let result;
    mdx.sync(code, {
      rehypePlugins: [
        () => (tree) => {
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
