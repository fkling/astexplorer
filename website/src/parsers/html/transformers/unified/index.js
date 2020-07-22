import compileModule from '../../../utils/compileModule';
// eslint-disable-next-line require-in-package/require-in-package
import pkg from 'unified/package.json';

const ID = 'unified';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'rehype',

  loadTransformer(callback) {
    require(
      [
        '../../../transpilers/babel',
        'rehype',
        'rehype-format',
        'unist-util-visit',
        'hastscript',
      ], (transpile, rehype, format, visit, hastscript) =>
      callback({
        transpile: transpile.default,
        rehype,
        format,
        visit,
        hastscript,
      }));
  },

  transform({ transpile, rehype, format, visit, hastscript }, transformCode, code) {
    const moduleMap = {
      hastscript,
      'unist-util-visit':visit,
    }
    // transpile with babel for es6+ support
    transformCode = transpile(transformCode);
    // compile to turn from string into a module
    const transform = compileModule(
      transformCode,
      {
        require(name){
          const module = moduleMap[name];
          if(module) return module;
          throw new Error(`Cannot find module '${name}'`)
        },
      },
    );
    
    return rehype()
      .data('settings', { fragment: true })
      .use(transform.default || transform)
      .use(format)
      .processSync(code).toString();
  },
};
