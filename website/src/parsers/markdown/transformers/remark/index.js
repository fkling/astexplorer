import compileModule from '../../../utils/compileModule';
import pkg from 'remark/package.json';
import unistUtilIs from 'unist-util-is';
import unistUtilVisit from 'unist-util-visit';
import unistUtilVisitParents from 'unist-util-visit-parents';

const availableModules = {
  'unist-util-is': unistUtilIs,
  'unist-util-visit': unistUtilVisit,
  'unist-util-visit-parents': unistUtilVisitParents,
};

function sandboxRequire(name) {
  const module = availableModules[name];
  if (!module) throw new Error(`Cannot find module '${name}'`);
  return module;
}

const ID = 'remark';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: ID,

  loadTransformer(callback) {
    require(['remark'], (remark) => {
      callback({ remark });
    });
  },

  transform({ remark }, transformCode, code) {
    const transform = compileModule(transformCode, { require: sandboxRequire });
    return remark().use(transform).processSync(code).contents;
  },
};
