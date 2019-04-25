/**
 * Configurable base class for all tree traversal.
 */
class TreeAdapter {

  constructor(adapterOptions, walkOptions) {
    this._ranges = new WeakMap();
    this._walkOptions = walkOptions;
    this._adapterOptions = adapterOptions;
  }

  /**
   * Used by the UI

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

  hasChildrenInRange(node) {
    if (!this.isInRange(node)) {
      return false;
    }
    for (const {value: child} of this.walkNode(node)) {
      if (this.isInRange(child)) {
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
    const walkOptions = this._walkOptions;
    for (const result of this._walkNode(node)) {
      if (
        this._adapterOptions.ignoredKeys.has(result.key) ||
        walkOptions.hideFunctions && typeof result.value === 'function' ||
        walkOptions.hideEmptyKeys && result.value == null ||
        walkOptions.hideLocationData && this._adapterOptions.locationKeys.has(result.key) ||
        walkOptions.hideTypeKeys && result.key === 'type'
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
    ignoredKeys: new Set(),
    locationKeys: new Set(),
    openByDefault: () => false,
    nodeToRange: () => null,
    nodeToName: () => { throw new Error('nodeToName must be passed');},
    walkNode: () => { throw new Error('walkNode must be passed');},
  },

  estree: {
    ignoredKeys: new Set(),
    locationKeys: new Set(['range', 'loc', 'start', 'end']),
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

function createTreeAdapter(type, adapterOptions, walkOptions) {
  if (TreeAdapterConfigs[type] == null) {
    throw new Error(`Unknown tree adapter type "${type}"`);
  }
  return new TreeAdapter(
    Object.assign({}, TreeAdapterConfigs[type], adapterOptions),
    walkOptions,
  );
}

export function treeAdapterFromParseResult({treeAdapter}, walkOptions) {
  return createTreeAdapter(
    treeAdapter.type,
    treeAdapter.options,
    walkOptions
  );
}
