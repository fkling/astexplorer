import compileModule from '../../../utils/compileModule';
import pkg from '@glimmer/compiler/package.json';

const ID = 'glimmer-compiler';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/glimmerjs/glimmer-vm',

  defaultParserID: 'glimmer',

  loadTransformer(callback) {
    require(
      ['../../../transpilers/babel', '@glimmer/compiler'],
      (transpile, glimmer) => callback({ transpile: transpile.default, glimmer })
    );
  },

  transform({ transpile, glimmer }, transformCode, code) {
    transformCode = transpile(transformCode);
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
