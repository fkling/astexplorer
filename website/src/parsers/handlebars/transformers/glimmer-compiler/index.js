import compileModule from '../../../utils/compileModule';
import pkg from '@glimmer/compiler/package.json';

const ID = 'glimmer-compiler';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/tildeio/glimmer',

  defaultParserID: 'glimmer',

  loadTransformer(callback) {
    require(['@glimmer/compiler'], callback);
  },

  transform(glimmer, transformCode, code) {
    const transformModule = compileModule(transformCode);

    // allow "export default" instead of "module.exports = "
    const transform = transformModule.__esModule ?
      transformModule.default :
      transformModule;

    // compile template to wireformat
    let result = glimmer.precompile(code, {
      plugins: {
        ast: [transform],
      },
    });

    // parse wireformat into JSON
    let json = JSON.parse(JSON.parse(result).block);

    // pretty print JSON
    return { code: json };
  },
};
