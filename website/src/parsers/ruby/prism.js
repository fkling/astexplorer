import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@ruby/prism/package.json';
import wasmUrl from '@ruby/prism/src/prism.wasm';

const ID = 'prism';
const PRISM_LENGTH = Symbol('length');

function wrapLocation(loc) {
  const wrapper = Object.create(null);
  wrapper.startOffset = loc.startOffset;
  wrapper[PRISM_LENGTH] = loc.length;
  return wrapper;
}

const wasiShim = new Proxy({
  args_get: () => 0,
  args_sizes_get: () => 0,
  environ_get: () => 0,
  environ_sizes_get: () => 0,
  clock_res_get: () => 0,
  clock_time_get: () => 0,
  fd_close: () => 0,
  fd_fdstat_get: () => 0,
  fd_prestat_get: () => 8,
  fd_prestat_dir_name: () => 8,
  fd_read: () => 0,
  fd_seek: () => 0,
  fd_write: () => 0,
  proc_exit: () => {},
  random_get: () => 0,
}, {
  get(target, prop) {
    if (prop in target) return target[prop];
    if (typeof prop === 'symbol') return undefined;
    return () => 0;
  },
});

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: 'https://github.com/ruby/prism',
  locationProps: new Set(['location']),
  _ignoredProperties: new Set(['nodeID']),

  loadParser(callback) {
    require(['@ruby/prism/src/parsePrism.js'], ({ parsePrism }) => {
      WebAssembly.compileStreaming(fetch(wasmUrl))
        .then(wasm =>
          WebAssembly.instantiate(wasm, {
            wasi_snapshot_preview1: wasiShim,
          }),
        )
        .then(instance => {
          instance.exports._initialize();
          callback({ parsePrism, exports: instance.exports });
        });
    });
  },

  parse({ parsePrism, exports }, code) {
    const result = parsePrism(exports, code);
    return result.value;
  },

  getNodeName(node) {
    if (node && node.constructor && node.constructor.name) {
      return node.constructor.name;
    }
  },

  nodeToRange(node) {
    if (node && node.location) {
      return [
        node.location.startOffset,
        node.location.startOffset + node.location.length,
      ];
    }
  },

  opensByDefault(node, key) {
    return key === 'statements' || key === 'body';
  },

  *forEachProperty(node) {
    if (node && typeof node === 'object') {
      if (PRISM_LENGTH in node) {
        yield { value: node.startOffset, key: 'startOffset', computed: false };
        yield { value: node[PRISM_LENGTH], key: 'length', computed: false };
        return;
      }

      for (let prop in node) {
        if (this._ignoredProperties.has(prop)) continue;
        let value = node[prop];

        if (
          value && typeof value === 'object' &&
          value.constructor === Object &&
          'startOffset' in value &&
          'length' in value
        ) {
          value = wrapLocation(value);
        }

        yield { value, key: prop, computed: false };
      }
    }
  },
};
