const ID = 'swc';

export default {
  id: ID,
  displayName: ID,
  homepage: 'https://swc.rs/',

  defaultParserID: ID,

  loadTransformer(callback) {
    import("@swc/wasm-web/wasm.js").then(console.log);
  },

  transform(swc, options, code) {
    console.log(swc, options, code);
    try {
      return swc.transformSync(code, {
        "jsc": {
          "target": "es5",
          "parser": {
            "syntax": "ecmascript"
          },
          "transform": {
            "optimizer": {
              "globals": {
                "vars": {
                  "__DEBUG__": "true"
                }
              }
            }
          }
        },
        "minify": false,
        "module": {
          "type": "commonjs",
          "strict": false,
          "strictMode": true,
          "lazy": false,
          "noInterop": false
        }
      });
    } catch (e) {
      throw new SyntaxError(e);
    }
  },
};
