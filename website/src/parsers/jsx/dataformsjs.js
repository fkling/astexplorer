import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'dataformsjs/package.json';

const ID = 'dataformsjs';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  // Link to the main DataFormsJS JSX Loader Documentation rather than project Homepage.
  // The main project homepage contains additional JS code not related to the compiler.
  //
  // homepage: pkg.homepage,
  homepage: 'https://github.com/dataformsjs/dataformsjs/blob/master/docs/jsx-loader.md',
  locationProps: new Set(['pos']),
  typeProps: new Set(['type']),

  loadParser(callback) {
    require(['dataformsjs/js/react/jsxLoader'], () => {
      callback({ jsxLoader: window.jsxLoader });
    });
  },

  parse({ jsxLoader }, code, options) {
    // AST is built using internal logic from `jsxLoader.compiler.compile()`.
    // When calling the `compile()` function, generated JS code is returned
    // while AST is needed for this site.
    if (jsxLoader.compiler.isMinimized(code)) {
        throw new Error('Unable to parse minimized code');
    }
    var newInput = jsxLoader.compiler.removeComments(code);
    var tokens = jsxLoader.compiler.tokenizer(newInput);
    var ast = jsxLoader.compiler.parser(tokens, code);
    return ast;
  },

  nodeToRange(node) {
    // The property `pos` is included in the AST by jsxLoader for developer debugging
    // however the compiler itself does not use it other than for error messages.
    // `pos` is not completely accurate so code here makes some corrections.
    // A length property is not included by the in the AST but one is needed for this
    // site so it is calculated here. The result is often correct but not 100% of
    // the time. When the node doesn't match it will generally be very close.
    if (node.pos !== null) {
      let pos = node.pos;
      let len = 0;
      switch (node.type) {
        case 'js':
          len = node.value.length;
          break;
        case 'e_child_whitespace':
        case 'e_child_js':
        case 'e_child_js_start':
        case 'e_child_js_end':
        case 'e_child_text':
          len = node.value.length;
          pos -= len;
          break;
        case 'createElement':
          if (node.children.length > 0) {
            len = node.children[node.children.length-1].pos - pos;
          } else {
            len = node.name.length + 1;
            for (var n = 0; n < node.props.length; n++) {
              if (typeof node.props[n].value === 'string') {
                len += node.props[n].name.length + node.props[n].value.length + 1;
              }
            }
          }
          len++;
          pos -= node.name.length + 1;
          break;
        case 'e_start':
          if (node.value && node.value.type && node.value.type === 'createElement') {
            const name = node.value.name;
            len = name.length + 1;
            pos -= name.length + 1;
          }
          break;
      }
      return [pos, pos + len];
    }
  },

  getNodeName(node) {
    return node.type;
  },

  opensByDefault(node, key) {
    return (
      (node.type === 'program')
      || (node.children && node.children.length)
      || (node.props && node.props.length)
    );
  },

  getDefaultOptions() {
    // JSX Loader provides some options for run-time code generation
    // and do not apply to the lower-level API calls made for this site.
    return {};
  },
};
