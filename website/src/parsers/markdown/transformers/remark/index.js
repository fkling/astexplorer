import compileModule from '../../../utils/compileModule';
import pkg from 'remark/package.json';

const ID = 'remark';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: ID,

  loadTransformer(callback) {
    require([
      'remark',
      'unist-util-is',
      'unist-util-visit',
      'unist-util-visit-parents',
    ], ({ remark }, { is }, { visit }, { visitParents }) => {
      callback({
        remark,
        'unist-util-is': is,
        'unist-util-visit': visit,
        'unist-util-visit-parents': visitParents,
      });
    });
  },

  transform({ remark, ...availableModules }, transformCode, code) {
    function sandboxRequire(name) {
      if (!Object.getOwnPropertyNames(availableModules).includes(name))
        throw new Error(`Cannot find module '${name}'`);
      return availableModules[name];
    }

    const transform = compileModule(transformCode, { require: sandboxRequire });
    return remark().use(transform).processSync(code).value;
  },
};
