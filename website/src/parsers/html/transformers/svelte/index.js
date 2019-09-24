import compileModule from '../../../utils/compileModule';
import pkg from 'svelte/package.json';

const ID = 'svelte';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://sveltejs/svelte',

  defaultParserID: 'svelte',

  loadTransformer(callback) {
    require(
      ['svelte/compiler'],
      callback,
    );
  },

  transform({ preprocess }, transformCode, code) {
    const transform = compileModule(transformCode);

    // Identity functions in case of missing transforms
    const _markupIdentity = (content, _filename) => content;
    const _scriptIdentity = (content, _attributes, _filename) => content;
    const _styleIdentity = (content, _attributes, _filename) => content;

    // Check if there is a transform
    // If Yes, set the appropriate transform or else use identity functions
    const markupTransform = transform().markup || _markupIdentity;
    const scriptTransform = transform().script || _scriptIdentity;
    const styleTransform = transform().style || _styleIdentity;

    const result = preprocess(code, {
      markup:({ content, _filename}) => {
        return {
          code: markupTransform(content),
        };
      },
      script: ({content, attributes, _filename}) => {
        return {
          code: scriptTransform(content, attributes),
        };
      },
      style: ({content, attributes, _filename}) => {
        return {
          code: styleTransform(content, attributes),
        };
      },
    });
    return result;
  },
}
