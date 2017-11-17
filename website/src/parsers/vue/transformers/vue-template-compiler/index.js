import compileModule from '../../../utils/compileModule';
import pkg from 'vue-template-compiler/package.json';

const ID = 'vue-template-compiler';

function methodNameFix(babel, {nameMap = {}} = {}) {
  return {
    visitor: {
      Identifier(path) {
        // path.node.name = path.node.name.split('').reverse().join('');
        if (path.parent.type === 'CallExpression' && path.node === path.parent.callee && path.node.name in nameMap) {
          path.node.name = nameMap[path.node.name];
        }
      },
    },
  };
}

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  transformCodeMode: 'javascript',
  outputCodeMode: 'javascript',

  defaultParserID: 'vue-template-compiler',

  loadTransformer(callback) {
    require([
      'vue-template-compiler',
      'prettier',
      'babel7',
      'recast',
    ], (compiler, prettier, babel, recast) => callback({compiler, prettier, babel, recast}));
  },

  transform({compiler, prettier, babel, recast}, transformCode, code) {
    const config = compileModule( // eslint-disable-line no-shadow
      transformCode
    );
    let {ssr, nameMap, ...options} = config.default || config;

    // console.log('vue-compiler transform', options.default || options);
    const {render, staticRenderFns} = ssr ? compiler.ssrCompile(code, options) : compiler.compile(code, options);
    const fmt = src => prettier.format(src.code);

    const vueRenderCode = `const C = {render(){${render}}, staticRenderFns: [${
      staticRenderFns.map(src => `function() { ${src} }`).join(',')
    }]};`;

    return fmt(babel.transform(vueRenderCode, {
      sourceType: 'script',
      parserOpts: {
        parser: recast.parse,
        plugins: [
          'classProperties',
          'objectRestSpread',
          'importMeta',
        ],
      },
      generatorOpts: {
        generator: recast.print,
      },
      plugins: [methodNameFix(babel, {nameMap})],
      sourceMaps: true,
    }));
  },
};
