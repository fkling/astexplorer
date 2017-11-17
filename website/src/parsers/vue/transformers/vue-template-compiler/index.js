import compileModule from '../../../utils/compileModule';
import pkg from 'vue-template-compiler/package.json';

const ID = 'vue-template-compiler';

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
    let {ssr, ...options} = compileModule( // eslint-disable-line no-shadow
      transformCode
    );

    function methodNameFix(babel) {
      const { types: t } = babel;
      const nameMap = { _c: 'createElement', _o: 'markOnce', _n: 'toNumber', _s: 'toString', _l: 'renderList', _t: 'renderSlot', _q: 'looseEqual', _i: 'looseIndexOf', _m: 'renderStatic', _f: 'resolveFilter', _k: 'checkKeyCodes', _b: 'bindObjectProps', _v: 'createTextVNode', _e: 'createEmptyVNode', _u: 'resolveScopedSlots', _g: 'bindObjectListeners' };

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
      plugins: [methodNameFix(babel)],
      sourceMaps: true,
    }));
  },
};
