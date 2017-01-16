import compileModule from '../../../utils/compileModule';
import pkg from '@glimmer/syntax/package.json';

const ID = 'glimmer';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/tildeio/glimmer',

  defaultParserID: 'glimmer',

  loadTransformer(callback) {
    require(['@glimmer/syntax'], callback);
  },

  transform(glimmer, transformCode, code) {
    const transformModule = compileModule(transformCode);

    // allow "export default" instead of "module.exports = "
    const transform = transformModule.__esModule ?
      transformModule.default :
      transformModule;

    let ast = glimmer.preprocess(code, {
      plugins: {
        ast: [transform],
      },
    });

    return glimmer.print(ast);
  },
};
