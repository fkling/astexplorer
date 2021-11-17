import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'ret/package.json';

const ID = 'ret';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,

  loadParser(callback) {
    require(['ret'], (ret) => {
      callback(ret);
    });
  },

  parse(ret, code, options={}) {
    this.types = ret.types;

    // Enforce /regexp/ syntax to match other regexp parsers.
    const firstSlash = code.indexOf('/');
    const lastSlash = code.lastIndexOf('/');
    if (firstSlash !== 0 || lastSlash < 1) {
      throw new Error('Please wrap the regex pattern by slash `/`, i.e. /foo/');
    }

    // ret does not do anything with the flags, so just strip them.
    const pattern = code.slice(firstSlash + 1, lastSlash);
    return ret(pattern);
  },

  *forEachProperty(node) {
    if (node && typeof node === 'object') {
      for (let prop in node) {
        if (prop === 'type') {
          continue;
        }

        yield {
          value: node[prop],
          key: prop,
          computed: false,
        };
      }

      if (node.type === this.types.CHAR) {
        yield {
          value: String.fromCharCode(node.value),
          key: 'char',
          computed: true,
        };
      }
    }
  },

  getNodeName(node) {
    switch (node.type) {
      case this.types.ROOT:
        return "ROOT";
      case this.types.GROUP:
        return "GROUP";
      case this.types.POSITION:
        return "POSITION";
      case this.types.SET:
        return "SET";
      case this.types.RANGE:
        return "RANGE";
      case this.types.REPETITION:
        return "REPETITION";
      case this.types.REFERENCE:
        return "REFERENCE";
      case this.types.CHAR:
        return "CHAR";
    }
  },

  opensByDefault(node, key) {
    return (
      key === "options" ||
      key === "stack" ||
      node.type === this.types.CHAR ||
      Array.isArray(node)
    );
  },

  getDefaultOptions() {
    return {};
  },
};
