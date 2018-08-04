interface FileObject {
  /**
   * The source code of the current file.
   */
  source: string;
  /**
   * The absolute path to the current file
   */
  path: string;
}

interface ApiObject {
  /**
   * "Helper function to collect data during --dry runs.
   * This function keeps a counter for how often it was called with a specific argument.
   * The result is shown in the console. Useful for finding out how many files match a criterion."
   */
  stats: (value: string) => void;
  jscodeshift: Jscodeshift
}

interface Jscodeshift {
  (source: string | NodePath): Collection;
}

interface Collection {
  /**
   * Returns a new collection containing the nodes for which the callback returns true.
   */
  filter(cb: (this: NodePath, path: NodePath) => boolean): Collection;

  /**
   * Executes callback for each NodePath in the collection.
   */
  forEach(cb: (this: NodePath, path: NodePath) => void): this;

  /**
   *  Executes the callback for every path in the collection and returns a
   *  new collection from the return values (which must be paths).
   *
   * The callback can return null to remove the element from the new collection.
   *
   * If an array is returned, it will be flattened into the result collection.
   */
  map(cb: (this: NodePath, path: NodePath) => NodePath | NodePath[]): Collection;

  /**
   * Returns the number of elements in this collection.
   */
  size(): number;

  /**
   * Returns an array of AST nodes in this collection.
   */
  nodes(): ASTNode[];

  /**
   * Returns an array of NodePaths in this this collection.
   */
  paths(): NodePath[];

  /**
   * Converts the AST back to a string, using recast.
   * The options are directly passed to recast's printer.
   */
  toSource(options: any): string; // todo: add Recast printer options type

  /**
   * Returns a new collection containing only the element at the position
   * index`. In case of a negative index, the element is taken from the end.
   */
  at(index: number): Collection;

  /**
   * Calls "get" on the first path (same as "collection.paths(0).get(...)").
   */
  get(name: string|number): NodePath;

  // ## Node specific methods

  /**
   * Finds descendants of a specific type within the Nodes of this collection.
   */
  find(type: TypeDefinition, filter?: object): Collection;

  /**
   * Returns a collection containing the Paths that
   * create the scope which contains the selected Nodes.
   */
  closestScope(): Collection;

  /**
   * For each node in the collection, traverses the AST up
   * and finds the closest node that matches the type and filter.
   */
  closest(type: TypeDefinition, filter?: object): Collection;

  /**
   * Replaces the selected nodes with the provided node(s). If a function is
   * provided, it is executed for every node and the node is replaced with
   * the return value of the function.
   */
  replaceWith(nodes: ASTNode | ((path: NodePath, index: number) => ASTNode | ASTNode[])): this;

  /**
   * Inserts the new node(s) before each of the selected nodes. If a function
   * is provided, it is executed for every node and return value is inserted
   * before that node.
   */
  insertBefore(nodes: ASTNode | ((path: NodePath, index: number) => ASTNode | ASTNode[])): this;

  /**
   * Inserts the new node(s) after each of the selected nodes. If a function
   * is provided, it is executed for every node and return value is inserted
   * after that node.
   */
  insertAfter(nodes: ASTNode | ((path: NodePath, index: number) => ASTNode | ASTNode[])): this;

  /**
   * Calls "prune" on every selected NodePath.
   */
  remove(): this;

}

interface NodePath {
  parentPath: NodePath;
  name: string;
  /**
   * The value of the first ancestor NodePath whose value is a Node.
   */
  node: ASTNode;
  /**
   * The first ancestor Path whose value is a Node distinct from this.node.
   */
  parent: NodePath;

  /**
   * The closest enclosing scope that governs this node.
   */
  scope: Scope;

  /**
   * Replaces the Node(s) represented by this Path, or removes it if no argument is passed.
   */
  replace(newNode?: ASTNode | ASTNode[]): void;

  /**
   * Removes this Node and any ancestor that would become "empty".
   */
  prune(): void;

  /**
   * Returns the value of of that property. This is different from 'path.node.value' because
   * it will return the default value for that field as defined in the Node definition.
   */
  getValueProperty(name: string): any;

  /**
   *  If the Path represents an array of nodes, applies the provided function to each
   *  Node in the array.
   * @param callback
   * @param context
   */
  each(callback: (childPath: NodePath) => void, context?: any): void;

  /**
   * If the Path represents an array of nodes, applies the provided function to each
   * Node in the array and returns an array of the results.
   */
  map(callback: (childPath: NodePath) => any, context?: any): any[];

  /**
   * If the Path represents an array of nodes, applies the provided function to each
   * Node in the array and returns an array of Paths for which the callback returned true.
   */
  filter(callback: (childPath: NodePath) => boolean, context?: any): NodePath[];

  /**
   * If the Path represents an array of nodes, removes the first Node in that array and returns it.
   */
  shift(): NodePath;

  unshift(newNode: ASTNode): void;

  push(newNode: ASTNode): void;
  pop(): NodePath;
  insertAt(index: number, node: ASTNode): void;
  insertBefore(node: ASTNode): void;
  insertAfter(node: ASTNode): void;
}

interface ASTNode {
  /**
   * The type of this AST node.
   */
  type: string;
}

interface Expression {}

interface TypeDefinition {}

interface Scope {
  isEstablishedBy(node: ASTNode): boolean;
  getGlobalScope(): Scope;
  declares(name: string): boolean;
  declaresType(name: string): boolean;
  declareTemporary(prefix: string): Identifier;
  injectTemporary(prefix: string, init?: ASTNode): Identifier;
  getBindings(): ASTNode[];
  getTypes(): ASTNode[];
  lookup(name: string): Scope;
  lookupType(name: string): Scope;
}

interface Identifier {}

interface TemplateElementValue {
  cooked: string;
  raw: string;
}

interface TypeDefinition {
  name: string;
  check(node: Node, deep: any): boolean;
}
