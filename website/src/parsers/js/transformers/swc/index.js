const ID = 'swc';

export default {
  id: ID,
  displayName: ID,
  homepage: 'https://swc.rs/',

  defaultParserID: ID,

  loadTransformer(callback) {
    import("@swc/wasm-web/wasm.js").then(mod => mod.default().then(callback));
  },

  transform(swc, options, code) {
    try {
      const Plugin = eval(`
        import Visitor from "@swc/core/Visitor";

        ${options}
      `);

      return swc.transformSync(code, {
        "jsc": {
          "target": "es2016",
          "parser": {
            "syntax": "ecmascript",
            "jsx": true,
            "dynamicImport": true,
          }
        },
        plugin: m => new Plugin().visitProgram(m)
      });
    } catch (e) {
      throw new SyntaxError(e);
    }
  },
};
