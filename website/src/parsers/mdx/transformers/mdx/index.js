import compileModule from '../../../utils/compileModule';
import pkg from 'mdx1/package.json';

const ID = 'mdx';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'mdxhast',

  loadTransformer(callback) {
    require([
      '../../../transpilers/babel',
      'mdx1',
      'prettier/standalone',
      'prettier/parser-babel',
    ], (transpile, mdx, prettier, babel) => {
      callback({ transpile: transpile.default, mdx, prettier, babel });
    });
  },

  transform({ transpile, mdx, prettier, babylon }, transformCode, code) {
    transformCode = transpile(transformCode);
    const transform = compileModule(transformCode);
    const jsxCode = mdx.sync(code, {
      ...(transform.default || transform),
    });
    try {
      return prettier.format(jsxCode, {
        parser: 'babylon',
        plugins: [babylon],
      });
    } catch (err) {
      return `
${err.message}

------------
Full output:
------------

${jsxCode.trim()}
`.trim();
    }
  },
};
