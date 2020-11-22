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
    ], (remark, unistUtilIs, unistUtilVisit, unistUtilVisitParents) => {
      callback({ remark, unistUtilIs, unistUtilVisit, unistUtilVisitParents });
    });
  },

  transform(
    { remark, unistUtilIs, unistUtilVisit, unistUtilVisitParents },
    transformCode,
    code,
  ) {
    const availableModules = {
      'unist-util-is': unistUtilIs,
      'unist-util-visit': unistUtilVisit,
      'unist-util-visit-parents': unistUtilVisitParents,
    };

    function sandboxRequire(name) {
      if (!Object.getOwnPropertyNames(availableModules).includes(name))
        throw new Error(`Cannot find module '${name}'`);
      return availableModules[name];
    }

    const transform = compileModule(transformCode, { require: sandboxRequire });
    return remark().use(transform).processSync(code).contents;
  },
};
