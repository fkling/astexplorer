import compileModule from '../../../utils/compileModule';
import pkg from 'remark/package.json';

const ID = 'mdx2';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'mdx2-mdast',

  loadTransformer(callback) {
    require([
      'mdx2',
      'unist-util-is',
      'unist-util-visit',
      'unist-util-visit-parents',
    ], ({ compileSync: mdx }, { is }, { visit }, { visitParents }) => {
      callback({
        mdx,
        'unist-util-is': is,
        'unist-util-visit': visit,
        'unist-util-visit-parents': visitParents,
      });
    });
  },

  transform({ mdx, ...availableModules }, transformCode, code) {
    function sandboxRequire(name) {
      if (!Object.getOwnPropertyNames(availableModules).includes(name))
        throw new Error(`Cannot find module '${name}'`);
      return availableModules[name];
    }

    const transform = compileModule(transformCode, { require: sandboxRequire });
    return mdx(code, transform).value;
  },
};
