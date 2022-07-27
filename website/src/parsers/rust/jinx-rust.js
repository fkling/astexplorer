import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'jinx-rust/package.json';

const id = 'jinx-rust';

function is_Circular(data, key) {
  return key === 'src';
}

/** @type {typeof defaultParserInterface} */
export default {
  ...defaultParserInterface,

  id,
  displayName: id,
  version: pkg.version,
  homepage: `https://www.github.com/jinxdash/jinx-rust/`,

  _ignoredProperties: new Set(['toJSON']),

  locationProps: new Set(['loc']),
  typeProps: new Set(['type', 'get type()', 'nodeType']),

  loadParser(callback) {
    require(['jinx-rust'], callback);
  },

  parse(module, code, options) {
    return module.rs.parseFile(code, { filepath: 'undefined.rs' });
  },

  getNodeName(node) {
    return is_object(node)
      ? 'type' in node
        ? node.type
        : node.constructor.name
      : null;
  },

  *forEachProperty(data) {
    if (!is_object(data)) return;

    if (Array.isArray(data)) {
      for (var key in data)
        yield {
          key,
          value: data[key],
          computed: false,
        };
    } else {
      const descriptors = getAllPropertyDescriptors(data);
      const keys = Object.keys(descriptors);

      const typeIndex =
        keys.length > 2 && keys[0] === 'nodeType' && keys[1] === 'loc'
          ? keys.indexOf('type')
          : -1;

      if (typeIndex !== -1) {
        keys.splice(typeIndex, 1);
        yield { key: 'get type()', value: () => data.type };
      }

      for (var key of keys) {
        if (this._ignoredProperties.has(key)) continue;
        var descriptor = descriptors[key];
        var value = data[key];
        yield {
          key: 'get' in descriptor ? 'get ' + key + '()' : key,
          value: is_Circular(data, key)
            ? `[Circular] ${this.getNodeName(value)}`
            : typeof value === 'function'
            ? value.bind(data)
            : 'get' in descriptor
            ? () => value
            : value,
        };
      }
    }
  },

  nodeToRange(node) {
    return is_object(node) && 'loc' in node ? [node.loc[0], node.loc[1]] : null;
  },
};

function is_object(data) {
  return typeof data === 'object' && null !== data;
}

/** @returns {{ [key: string]: PropertyDescriptor }} */
function getAllPropertyDescriptors(data) {
  const descriptors = Object.create(null);
  for (var key of Object.getOwnPropertyNames(data)) {
    descriptors[key] = Object.getOwnPropertyDescriptor(data, key);
  }
  var p1 = Object.getPrototypeOf(data);
  if (null !== p1)
    while (null !== Object.getPrototypeOf(p1)) {
      for (var key of Object.getOwnPropertyNames(p1)) {
        if ('constructor' !== key && !(key in descriptors)) {
          descriptors[key] = Object.getOwnPropertyDescriptor(p1, key);
        }
      }
      p1 = Object.getPrototypeOf(p1);
    }
  return descriptors;
}
