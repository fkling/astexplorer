import compileModule from '../../../utils/compileModule';
import transpile from '../../../transpilers/babelTranspile';
import pkg from '@glimmer/syntax/package.json';

const ID = 'glimmer';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/glimmerjs/glimmer-vm',

  defaultParserID: 'glimmer',

  loadTransformer(callback) {
    require(['@glimmer/syntax'], callback);
  },

  transform(glimmer, transformCode, code) {
    transformCode = transpile(transformCode);
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
