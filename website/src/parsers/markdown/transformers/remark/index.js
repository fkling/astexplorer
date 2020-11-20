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
    require(['remark'], (remark) => {
      callback({ remark });
    });
  },

  transform({ remark }, transformCode, code) {
    const transform = compileModule(transformCode);
    return remark().use(transform).processSync(code).contents;
  },
};
