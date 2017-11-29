import compileModule from '../../../utils/compileModule';
import transpile from '../../../transpilers/babelTranspile';
import pkg from 'regexp-tree/package.json';

const ID = 'regexp-tree';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: ID,

  loadTransformer(callback) {
    require([
      'regexp-tree',
    ], callback);
  },

  transform(regexpTree, transformCode, code) {
    transformCode = transpile(transformCode);
    let handler = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    return regexpTree.transform(code, handler).toString();
  },
};
