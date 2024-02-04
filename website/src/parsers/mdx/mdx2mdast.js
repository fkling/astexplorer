import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'mdx2/package.json';

const ID = 'mdx2-mdast';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['position']),

  loadParser(callback) {
    require([
      'mdx2',
      'remark-gfm',
      'remark-directive',
      'remark-footnotes',
      'remark-frontmatter',
      'remark-math',
    ], (
      { compileSync: mdx },
      { default: gfm },
      { default: directive },
      { default: footnotes },
      { default: frontmatter },
      { default: math },
    ) => callback({ mdx, gfm, directive, footnotes, frontmatter, math }));
  },

  parse({ mdx, gfm, directive, footnotes, frontmatter, math }, code, options) {
    let result = null;
    const plugins = [
      options['remark-gfm'] ? gfm : false,
      options['remark-directive'] ? directive : false,
      options['remark-footnotes'] ? footnotes : false,
      options['remark-frontmatter'] ? [frontmatter, ['yaml', 'toml']] : false,
      options['remark-math'] ? math : false,
      () => (tree) => {
        result = tree;
      },
    ].filter((plugin) => plugin !== false);
    mdx(code, { remarkPlugins: plugins });

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

  getDefaultOptions() {
    return {
      'remark-directive': false,
      'remark-footnotes': false,
      'remark-frontmatter': false,
      'remark-gfm': false,
      'remark-math': false,
    };
  },

  renderSettings(parserSettings, onChange) {
    return (
      <div>
        <p>
          mdx syntax is extended through{' '}
          <a
            href="https://github.com/remarkjs/remark/blob/HEAD/doc/plugins.md"
            target="_blank"
            rel="noreferrer noopener"
          >
            remark plugins
          </a>
        </p>
        {defaultParserInterface.renderSettings.call(
          this,
          parserSettings,
          onChange,
        )}
      </div>
    );
  },
};
