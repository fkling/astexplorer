/**
 * Configurable base class for all tree traversal.
 */
class TreeAdapter {

  constructor(adapterOptions, filterValues) {
    this._ranges = new WeakMap();
    this._filterValues = filterValues;
    this._adapterOptions = adapterOptions;
  }

  /**
   * Used by UI components to render an appropriate input for each filter.
   */
  getConfigurableFilters() {
    return (this._adapterOptions.filters || []).filter(filter => Boolean(filter.key));
  }

  /**
   * A more or less human readable name of the node.
   */
  getNodeName(node) {
    return this._adapterOptions.nodeToName(node);
  }

  /**
   * The start and end indicies of the node in the source text. The return value
   * is an array of form `[start, end]`. This is used for highlighting source
   * text and focusing nodes in the tree.
   */
  getRange(node) {
    if (!(node && typeof node === 'object')) {
      return null;
    }

    if (this._ranges.has(node)) {
      return this._ranges.get(node);
    }
    const {nodeToRange} = this._adapterOptions;
    let range = nodeToRange(node);
    if (!range) {
      // If the node doesn't have location data itself, try to derive it from
      // its first and last child.
      let first, last;
      const iterator = this.walkNode(node);
      let next = iterator.next();
      if (!next.done) {
        first = last = next.value && next.value.value;
      }
      while (!(next = iterator.next()).done) {
        last = next.value && next.value.value;
      }
      const rangeFirst = first && nodeToRange(first);
      const rangeLast = last && nodeToRange(last);
      if (rangeFirst && rangeLast) {
        range = [rangeFirst[0], rangeLast[1]];
      }
    }
    this._ranges.set(node, range);
    return range;
  }

  isInRange(node, position) {
    const range = this.getRange(node);
    if (!range) {
      return false;
    }
    return range[0] <= position && position <= range[1];
  }

  hasChildrenInRange(node, position) {
    if (!this.isInRange(node, position)) {
      return false;
    }
    for (const {value: child} of this.walkNode(node)) {
      if (this.isInRange(child, position)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Whether or not the provided node should be automatically expanded.
   */
  opensByDefault(node, key) {
    return this._adapterOptions.openByDefault(node, key);
  }

  isArray(node) {
    return Array.isArray(node);
  }

  isObject(node) {
    return Boolean(node) && typeof node === 'object' && !this.isArray(node);
  }

  /**
   * A generator to iterate over each "property" of the node.
   * Overwriting _walkNode allows a parser to expose information from a node if
   * the node is not implemented as plain JavaScript object.
   */
  *walkNode(node) {
    for (const result of this._walkNode(node)) {
      if (
        (this._adapterOptions.filters || []).some(filter => {
          if (filter.key && !this._filterValues[filter.key]) {
            return false;
          }
          return filter.test(result.value, result.key);
        })
      ) {
        continue;
      }
      yield result;
    }
  }

  *_walkNode(node) {
    yield* this._adapterOptions.walkNode(node);
  }

}

const TreeAdapterConfigs = {
  default: {
    openByDefault: () => false,
    nodeToRange: () => null,
    nodeToName: () => { throw new Error('nodeToName must be passed');},
    walkNode: () => { throw new Error('walkNode must be passed');},
  },

  estree: {
    filters: [
      functionFilter(),
      emptyKeysFilter(),
      locationInformationFilter(new Set(['range', 'loc', 'start', 'end'])),
      typeKeysFilter(),
    ],
    openByDefaultNodes: new Set(['Program']),
    openByDefaultKeys: new Set([
      'body',
      'elements', // array literals
      'declarations', // variable declaration
      'expression', // expression statements
    ]),
    openByDefault(node, key) {
      return node && this.openByDefaultNodes.has(node.type) ||
        this.openByDefaultKeys.has(key);
    },
    nodeToRange(node) {
      if (node.range) {
        return node.range;
      }
      if (typeof node.start === 'number' && typeof node.end === 'number') {
        return [node.start, node.end];
      }
      return null;
    },
    nodeToName(node) {
      return node.type;
    },
    *walkNode(node) {
      for (let prop in node) {
        yield {
          value: node[prop],
          key: prop,
          computed: false,
        }
      }
    },
  },
};

export function ignoreKeysFilter(keys=new Set(), key, label) {
  return {
    key,
    label,
    test(_, key) { return  keys.has(key); },
  };
}

export function locationInformationFilter(keys) {
  return ignoreKeysFilter(
    keys,
    'hideLocationData',
    'Hide location data',
  );
}

export function functionFilter() {
  return {
    key: 'hideFunctions',
    label: 'Hide methods',
    test(value) { return typeof value === 'function'; },
  };
}

export function emptyKeysFilter() {
  return {
    key: 'hideEmptyKeys',
    label: 'Hide empty keys',
    test(value) { return value == null; },
  };
}

export function typeKeysFilter(keys) {
  return ignoreKeysFilter(
    keys,
    'hideTypeKeys',
    'Hide type keys',
  );
}

function createTreeAdapter(type, adapterOptions, filterValues) {
  if (TreeAdapterConfigs[type] == null) {
    throw new Error(`Unknown tree adapter type "${type}"`);
  }
  return new TreeAdapter(
    Object.assign({}, TreeAdapterConfigs[type], adapterOptions),
    filterValues,
  );
}

export function treeAdapterFromParseResult({treeAdapter}, filterValues) {
  return createTreeAdapter(
    treeAdapter.type,
    treeAdapter.options,
    filterValues
  );
}
