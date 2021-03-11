import pkg from '@swc/wasm-web/package.json';

const ID = 'swc';

export default {
    id: ID,
    displayName: ID,
    version: `${pkg.version}`,
    homepage: 'https://swc.rs/',

    defaultParserID: ID,

    loadTransformer(callback) {
        require(['@swc/wasm-web/wasm'], callback);
    },

    transform(swc, options, code) {
        try {
            return swc.transformSync(code, JSON.parse(options));
        } catch (e) {
            throw new SyntaxError(e);
        }
    },
};
