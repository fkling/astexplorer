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
interface Jscodeshift {
  Printable: TypeDefinition;
  SourceLocation: TypeDefinition;
  Node: TypeDefinition;
  Comment: TypeDefinition;
  Position: TypeDefinition;
  File: TypeDefinition;
  Program: TypeDefinition;
  Statement: TypeDefinition;
  Function: TypeDefinition;
  Pattern: TypeDefinition;
  Expression: TypeDefinition;
  Identifier: TypeDefinition;
  BlockStatement: TypeDefinition;
  EmptyStatement: TypeDefinition;
  ExpressionStatement: TypeDefinition;
  IfStatement: TypeDefinition;
  LabeledStatement: TypeDefinition;
  BreakStatement: TypeDefinition;
  ContinueStatement: TypeDefinition;
  WithStatement: TypeDefinition;
  SwitchStatement: TypeDefinition;
  SwitchCase: TypeDefinition;
  ReturnStatement: TypeDefinition;
  ThrowStatement: TypeDefinition;
  TryStatement: TypeDefinition;
  CatchClause: TypeDefinition;
  WhileStatement: TypeDefinition;
  DoWhileStatement: TypeDefinition;
  ForStatement: TypeDefinition;
  Declaration: TypeDefinition;
  VariableDeclaration: TypeDefinition;
  ForInStatement: TypeDefinition;
  DebuggerStatement: TypeDefinition;
  FunctionDeclaration: TypeDefinition;
  FunctionExpression: TypeDefinition;
  VariableDeclarator: TypeDefinition;
  ThisExpression: TypeDefinition;
  ArrayExpression: TypeDefinition;
  ObjectExpression: TypeDefinition;
  Property: TypeDefinition;
  Literal: TypeDefinition;
  SequenceExpression: TypeDefinition;
  UnaryExpression: TypeDefinition;
  BinaryExpression: TypeDefinition;
  AssignmentExpression: TypeDefinition;
  UpdateExpression: TypeDefinition;
  LogicalExpression: TypeDefinition;
  ConditionalExpression: TypeDefinition;
  NewExpression: TypeDefinition;
  CallExpression: TypeDefinition;
  MemberExpression: TypeDefinition;
  RestElement: TypeDefinition;
  TypeAnnotation: TypeDefinition;
  TSTypeAnnotation: TypeDefinition;
  SpreadElementPattern: TypeDefinition;
  ArrowFunctionExpression: TypeDefinition;
  ForOfStatement: TypeDefinition;
  YieldExpression: TypeDefinition;
  GeneratorExpression: TypeDefinition;
  ComprehensionBlock: TypeDefinition;
  ComprehensionExpression: TypeDefinition;
  PropertyPattern: TypeDefinition;
  ObjectPattern: TypeDefinition;
  ArrayPattern: TypeDefinition;
  MethodDefinition: TypeDefinition;
  SpreadElement: TypeDefinition;
  AssignmentPattern: TypeDefinition;
  ClassPropertyDefinition: TypeDefinition;
  ClassProperty: TypeDefinition;
  ClassBody: TypeDefinition;
  ClassDeclaration: TypeDefinition;
  ClassExpression: TypeDefinition;
  Specifier: TypeDefinition;
  ModuleSpecifier: TypeDefinition;
  ImportSpecifier: TypeDefinition;
  ImportNamespaceSpecifier: TypeDefinition;
  ImportDefaultSpecifier: TypeDefinition;
  ImportDeclaration: TypeDefinition;
  TaggedTemplateExpression: TypeDefinition;
  TemplateLiteral: TypeDefinition;
  TemplateElement: TypeDefinition;
  SpreadProperty: TypeDefinition;
  SpreadPropertyPattern: TypeDefinition;
  AwaitExpression: TypeDefinition;
  LetStatement: TypeDefinition;
  LetExpression: TypeDefinition;
  GraphExpression: TypeDefinition;
  GraphIndexExpression: TypeDefinition;
  XMLDefaultDeclaration: TypeDefinition;
  XMLAnyName: TypeDefinition;
  XMLQualifiedIdentifier: TypeDefinition;
  XMLFunctionQualifiedIdentifier: TypeDefinition;
  XMLAttributeSelector: TypeDefinition;
  XMLFilterExpression: TypeDefinition;
  XML: TypeDefinition;
  XMLElement: TypeDefinition;
  XMLList: TypeDefinition;
  XMLEscape: TypeDefinition;
  XMLText: TypeDefinition;
  XMLStartTag: TypeDefinition;
  XMLEndTag: TypeDefinition;
  XMLPointTag: TypeDefinition;
  XMLName: TypeDefinition;
  XMLAttribute: TypeDefinition;
  XMLCdata: TypeDefinition;
  XMLComment: TypeDefinition;
  XMLProcessingInstruction: TypeDefinition;
  JSXAttribute: TypeDefinition;
  JSXIdentifier: TypeDefinition;
  JSXNamespacedName: TypeDefinition;
  JSXExpressionContainer: TypeDefinition;
  JSXMemberExpression: TypeDefinition;
  JSXSpreadAttribute: TypeDefinition;
  JSXElement: TypeDefinition;
  JSXOpeningElement: TypeDefinition;
  JSXClosingElement: TypeDefinition;
  JSXFragment: TypeDefinition;
  JSXText: TypeDefinition;
  JSXOpeningFragment: TypeDefinition;
  JSXClosingFragment: TypeDefinition;
  JSXEmptyExpression: TypeDefinition;
  JSXSpreadChild: TypeDefinition;
  Flow: TypeDefinition;
  FlowType: TypeDefinition;
  AnyTypeAnnotation: TypeDefinition;
  EmptyTypeAnnotation: TypeDefinition;
  MixedTypeAnnotation: TypeDefinition;
  VoidTypeAnnotation: TypeDefinition;
  NumberTypeAnnotation: TypeDefinition;
  NumberLiteralTypeAnnotation: TypeDefinition;
  NumericLiteralTypeAnnotation: TypeDefinition;
  StringTypeAnnotation: TypeDefinition;
  StringLiteralTypeAnnotation: TypeDefinition;
  BooleanTypeAnnotation: TypeDefinition;
  BooleanLiteralTypeAnnotation: TypeDefinition;
  NullableTypeAnnotation: TypeDefinition;
  NullLiteralTypeAnnotation: TypeDefinition;
  NullTypeAnnotation: TypeDefinition;
  ThisTypeAnnotation: TypeDefinition;
  ExistsTypeAnnotation: TypeDefinition;
  ExistentialTypeParam: TypeDefinition;
  FunctionTypeAnnotation: TypeDefinition;
  FunctionTypeParam: TypeDefinition;
  TypeParameterDeclaration: TypeDefinition;
  ArrayTypeAnnotation: TypeDefinition;
  ObjectTypeAnnotation: TypeDefinition;
  ObjectTypeProperty: TypeDefinition;
  ObjectTypeSpreadProperty: TypeDefinition;
  ObjectTypeIndexer: TypeDefinition;
  ObjectTypeCallProperty: TypeDefinition;
  Variance: TypeDefinition;
  QualifiedTypeIdentifier: TypeDefinition;
  GenericTypeAnnotation: TypeDefinition;
  TypeParameterInstantiation: TypeDefinition;
  MemberTypeAnnotation: TypeDefinition;
  UnionTypeAnnotation: TypeDefinition;
  IntersectionTypeAnnotation: TypeDefinition;
  TypeofTypeAnnotation: TypeDefinition;
  TypeParameter: TypeDefinition;
  ClassImplements: TypeDefinition;
  InterfaceDeclaration: TypeDefinition;
  InterfaceExtends: TypeDefinition;
  DeclareInterface: TypeDefinition;
  TypeAlias: TypeDefinition;
  OpaqueType: TypeDefinition;
  DeclareTypeAlias: TypeDefinition;
  DeclareOpaqueType: TypeDefinition;
  TypeCastExpression: TypeDefinition;
  TupleTypeAnnotation: TypeDefinition;
  DeclareVariable: TypeDefinition;
  DeclareFunction: TypeDefinition;
  DeclareClass: TypeDefinition;
  DeclareModule: TypeDefinition;
  DeclareModuleExports: TypeDefinition;
  DeclareExportDeclaration: TypeDefinition;
  ExportSpecifier: TypeDefinition;
  ExportBatchSpecifier: TypeDefinition;
  DeclareExportAllDeclaration: TypeDefinition;
  FlowPredicate: TypeDefinition;
  InferredPredicate: TypeDefinition;
  DeclaredPredicate: TypeDefinition;
  ExportDeclaration: TypeDefinition;
  Block: TypeDefinition;
  Line: TypeDefinition;
  Noop: TypeDefinition;
  DoExpression: TypeDefinition;
  Super: TypeDefinition;
  BindExpression: TypeDefinition;
  Decorator: TypeDefinition;
  MetaProperty: TypeDefinition;
  ParenthesizedExpression: TypeDefinition;
  ExportDefaultDeclaration: TypeDefinition;
  ExportNamedDeclaration: TypeDefinition;
  ExportNamespaceSpecifier: TypeDefinition;
  ExportDefaultSpecifier: TypeDefinition;
  ExportAllDeclaration: TypeDefinition;
  CommentBlock: TypeDefinition;
  CommentLine: TypeDefinition;
  Directive: TypeDefinition;
  DirectiveLiteral: TypeDefinition;
  StringLiteral: TypeDefinition;
  NumericLiteral: TypeDefinition;
  BigIntLiteral: TypeDefinition;
  NullLiteral: TypeDefinition;
  BooleanLiteral: TypeDefinition;
  RegExpLiteral: TypeDefinition;
  ObjectMethod: TypeDefinition;
  ObjectProperty: TypeDefinition;
  ClassMethod: TypeDefinition;
  RestProperty: TypeDefinition;
  ForAwaitStatement: TypeDefinition;
  Import: TypeDefinition;
  TSType: TypeDefinition;
  TSQualifiedName: TypeDefinition;
  TSTypeReference: TypeDefinition;
  TSTypeParameterInstantiation: TypeDefinition;
  TSHasOptionalTypeParameters: TypeDefinition;
  TSTypeParameterDeclaration: TypeDefinition;
  TSHasOptionalTypeAnnotation: TypeDefinition;
  TSAsExpression: TypeDefinition;
  TSNonNullExpression: TypeDefinition;
  TSAnyKeyword: TypeDefinition;
  TSBooleanKeyword: TypeDefinition;
  TSNeverKeyword: TypeDefinition;
  TSNullKeyword: TypeDefinition;
  TSNumberKeyword: TypeDefinition;
  TSObjectKeyword: TypeDefinition;
  TSStringKeyword: TypeDefinition;
  TSSymbolKeyword: TypeDefinition;
  TSUndefinedKeyword: TypeDefinition;
  TSVoidKeyword: TypeDefinition;
  TSThisType: TypeDefinition;
  TSArrayType: TypeDefinition;
  TSLiteralType: TypeDefinition;
  TSUnionType: TypeDefinition;
  TSIntersectionType: TypeDefinition;
  TSConditionalType: TypeDefinition;
  TSInferType: TypeDefinition;
  TSTypeParameter: TypeDefinition;
  TSParenthesizedType: TypeDefinition;
  TSFunctionType: TypeDefinition;
  TSConstructorType: TypeDefinition;
  TSDeclareFunction: TypeDefinition;
  TSDeclareMethod: TypeDefinition;
  TSMappedType: TypeDefinition;
  TSTupleType: TypeDefinition;
  TSIndexedAccessType: TypeDefinition;
  TSTypeOperator: TypeDefinition;
  TSIndexSignature: TypeDefinition;
  TSPropertySignature: TypeDefinition;
  TSMethodSignature: TypeDefinition;
  TSTypePredicate: TypeDefinition;
  TSCallSignatureDeclaration: TypeDefinition;
  TSConstructSignatureDeclaration: TypeDefinition;
  TSEnumMember: TypeDefinition;
  TSTypeQuery: TypeDefinition;
  TSTypeLiteral: TypeDefinition;
  TSTypeAssertion: TypeDefinition;
  TSEnumDeclaration: TypeDefinition;
  TSTypeAliasDeclaration: TypeDefinition;
  TSModuleBlock: TypeDefinition;
  TSModuleDeclaration: TypeDefinition;
  TSImportEqualsDeclaration: TypeDefinition;
  TSExternalModuleReference: TypeDefinition;
  TSExportAssignment: TypeDefinition;
  TSNamespaceExportDeclaration: TypeDefinition;
  TSInterfaceBody: TypeDefinition;
  TSExpressionWithTypeArguments: TypeDefinition;
  TSInterfaceDeclaration: TypeDefinition;
  TSParameterProperty: TypeDefinition;
  OptionalMemberExpression: TypeDefinition;
  OptionalCallExpression: TypeDefinition;
  /** 
   * Builds an AST node of type 'SourceLocation'.
   */
  sourceLocation(start: Position, end: Position, source: string | null): SourceLocation;
  
  /** 
   * Builds an AST node of type 'Position'.
   * @param line must be >= 1
   * @param column must be >= 0
   */
  position(line: number, column: number): Position;
  
  /** 
   * Builds an AST node of type 'File'.
   * Super types: Node, Printable
   */
  file(program: Program, name: string | null): File;
  
  /** 
   * Builds an AST node of type 'Program'.
   * Super types: Node, Printable
   */
  program(body: Array<Statement>): Program;
  
  /** 
   * Builds an AST node of type 'Identifier'.
   * Super types: Expression, Pattern, Node, Printable
   */
  identifier(name: string): Identifier;
  
  /** 
   * Builds an AST node of type 'BlockStatement'.
   * Super types: Statement, Node, Printable
   */
  blockStatement(body: Array<Statement>): BlockStatement;
  
  /** 
   * Builds an AST node of type 'EmptyStatement'.
   * Super types: Statement, Node, Printable
   */
  emptyStatement(): EmptyStatement;
  
  /** 
   * Builds an AST node of type 'ExpressionStatement'.
   * Super types: Statement, Node, Printable
   */
  expressionStatement(expression: Expression): ExpressionStatement;
  
  /** 
   * Builds an AST node of type 'IfStatement'.
   * Super types: Statement, Node, Printable
   */
  ifStatement(test: Expression, consequent: Statement, alternate: Statement | null): IfStatement;
  
  /** 
   * Builds an AST node of type 'LabeledStatement'.
   * Super types: Statement, Node, Printable
   */
  labeledStatement(label: Identifier, body: Statement): LabeledStatement;
  
  /** 
   * Builds an AST node of type 'BreakStatement'.
   * Super types: Statement, Node, Printable
   */
  breakStatement(label: Identifier | null): BreakStatement;
  
  /** 
   * Builds an AST node of type 'ContinueStatement'.
   * Super types: Statement, Node, Printable
   */
  continueStatement(label: Identifier | null): ContinueStatement;
  
  /** 
   * Builds an AST node of type 'WithStatement'.
   * Super types: Statement, Node, Printable
   */
  withStatement(object: Expression, body: Statement): WithStatement;
  
  /** 
   * Builds an AST node of type 'SwitchStatement'.
   * Super types: Statement, Node, Printable
   */
  switchStatement(discriminant: Expression, cases: Array<SwitchCase>, lexical: boolean): SwitchStatement;
  
  /** 
   * Builds an AST node of type 'SwitchCase'.
   * Super types: Node, Printable
   */
  switchCase(test: Expression | null, consequent: Array<Statement>): SwitchCase;
  
  /** 
   * Builds an AST node of type 'ReturnStatement'.
   * Super types: Statement, Node, Printable
   */
  returnStatement(argument: Expression | null): ReturnStatement;
  
  /** 
   * Builds an AST node of type 'ThrowStatement'.
   * Super types: Statement, Node, Printable
   */
  throwStatement(argument: Expression): ThrowStatement;
  
  /** 
   * Builds an AST node of type 'TryStatement'.
   * Super types: Statement, Node, Printable
   */
  tryStatement(block: BlockStatement, handler: CatchClause | null, finalizer: BlockStatement | null): TryStatement;
  
  /** 
   * Builds an AST node of type 'CatchClause'.
   * Super types: Node, Printable
   */
  catchClause(param: Pattern | null, guard: Expression | null, body: BlockStatement): CatchClause;
  
  /** 
   * Builds an AST node of type 'WhileStatement'.
   * Super types: Statement, Node, Printable
   */
  whileStatement(test: Expression, body: Statement): WhileStatement;
  
  /** 
   * Builds an AST node of type 'DoWhileStatement'.
   * Super types: Statement, Node, Printable
   */
  doWhileStatement(body: Statement, test: Expression): DoWhileStatement;
  
  /** 
   * Builds an AST node of type 'ForStatement'.
   * Super types: Statement, Node, Printable
   */
  forStatement(init: VariableDeclaration | Expression | null, test: Expression | null, update: Expression | null, body: Statement): ForStatement;
  
  /** 
   * Builds an AST node of type 'VariableDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  variableDeclaration(kind: 'var' | 'let' | 'const', declarations: Array<VariableDeclarator | Identifier>): VariableDeclaration;
  
  /** 
   * Builds an AST node of type 'ForInStatement'.
   * Super types: Statement, Node, Printable
   */
  forInStatement(left: VariableDeclaration | Expression, right: Expression, body: Statement, each: boolean): ForInStatement;
  
  /** 
   * Builds an AST node of type 'DebuggerStatement'.
   * Super types: Statement, Node, Printable
   */
  debuggerStatement(): DebuggerStatement;
  
  /** 
   * Builds an AST node of type 'FunctionDeclaration'.
   * Super types: Function, Declaration, Statement, Node, Printable
   */
  functionDeclaration(id: Identifier, params: Array<Pattern>, body: BlockStatement | Expression, generator: boolean, expression: boolean): FunctionDeclaration;
  
  /** 
   * Builds an AST node of type 'FunctionExpression'.
   * Super types: Function, Expression, Pattern, Node, Printable
   */
  functionExpression(id: Identifier | null, params: Array<Pattern>, body: BlockStatement | Expression, generator: boolean, expression: boolean): FunctionExpression;
  
  /** 
   * Builds an AST node of type 'VariableDeclarator'.
   * Super types: Node, Printable
   */
  variableDeclarator(id: Pattern, init: Expression | null): VariableDeclarator;
  
  /** 
   * Builds an AST node of type 'ThisExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  thisExpression(): ThisExpression;
  
  /** 
   * Builds an AST node of type 'ArrayExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  arrayExpression(elements: Array<Expression | SpreadElement | RestElement | null>): ArrayExpression;
  
  /** 
   * Builds an AST node of type 'ObjectExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  objectExpression(properties: Array<Property | ObjectMethod | ObjectProperty | SpreadProperty | SpreadElement>): ObjectExpression;
  
  /** 
   * Builds an AST node of type 'Property'.
   * Super types: Node, Printable
   */
  property(kind: 'init' | 'get' | 'set', key: Literal | Identifier | Expression, value: Expression | Pattern): Property;
  
  /** 
   * Builds an AST node of type 'Literal'.
   * Super types: Expression, Pattern, Node, Printable
   */
  literal(value: string | boolean | null | number | RegExp): Literal;
  
  /** 
   * Builds an AST node of type 'SequenceExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  sequenceExpression(expressions: Array<Expression>): SequenceExpression;
  
  /** 
   * Builds an AST node of type 'UnaryExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  unaryExpression(operator: '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete', argument: Expression, prefix: boolean): UnaryExpression;
  
  /** 
   * Builds an AST node of type 'BinaryExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  binaryExpression(operator: '==' | '!=' | '===' | '!==' | '<' | '<=' | '>' | '>=' | '<<' | '>>' | '>>>' | '+' | '-' | '*' | '/' | '%' | '**' | '&' | '' | '' | '^' | 'in' | 'instanceof' | '..', left: Expression, right: Expression): BinaryExpression;
  
  /** 
   * Builds an AST node of type 'AssignmentExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  assignmentExpression(operator: '=' | '+=' | '-=' | '*=' | '/=' | '%=' | '<<=' | '>>=' | '>>>=' | '' | '=' | '^=' | '&=', left: Pattern, right: Expression): AssignmentExpression;
  
  /** 
   * Builds an AST node of type 'UpdateExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  updateExpression(operator: '++' | '--', argument: Expression, prefix: boolean): UpdateExpression;
  
  /** 
   * Builds an AST node of type 'LogicalExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  logicalExpression(operator: '' | '' | '' | '&&' | '??', left: Expression, right: Expression): LogicalExpression;
  
  /** 
   * Builds an AST node of type 'ConditionalExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  conditionalExpression(test: Expression, consequent: Expression, alternate: Expression): ConditionalExpression;
  
  /** 
   * Builds an AST node of type 'NewExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  newExpression(callee: Expression, arguments: Array<Expression | SpreadElement>): NewExpression;
  
  /** 
   * Builds an AST node of type 'CallExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  callExpression(callee: Expression, arguments: Array<Expression | SpreadElement>): CallExpression;
  
  /** 
   * Builds an AST node of type 'MemberExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  memberExpression(object: Expression, property: Identifier | Expression, computed: boolean): MemberExpression;
  
  /** 
   * Builds an AST node of type 'RestElement'.
   * Super types: Pattern, Node, Printable
   */
  restElement(argument: Pattern): RestElement;
  
  /** 
   * Builds an AST node of type 'TypeAnnotation'.
   * Super types: Node, Printable
   */
  typeAnnotation(typeAnnotation: FlowType): TypeAnnotation;
  
  /** 
   * Builds an AST node of type 'TSTypeAnnotation'.
   * Super types: Node, Printable
   */
  tsTypeAnnotation(typeAnnotation: TSType | TSTypeAnnotation): TSTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'SpreadElementPattern'.
   * Super types: Pattern, Node, Printable
   */
  spreadElementPattern(argument: Pattern): SpreadElementPattern;
  
  /** 
   * Builds an AST node of type 'ArrowFunctionExpression'.
   * Super types: Function, Expression, Pattern, Node, Printable
   */
  arrowFunctionExpression(params: Array<Pattern>, body: BlockStatement | Expression, expression: boolean): ArrowFunctionExpression;
  
  /** 
   * Builds an AST node of type 'ForOfStatement'.
   * Super types: Statement, Node, Printable
   */
  forOfStatement(left: VariableDeclaration | Pattern, right: Expression, body: Statement): ForOfStatement;
  
  /** 
   * Builds an AST node of type 'YieldExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  yieldExpression(argument: Expression | null, delegate: boolean): YieldExpression;
  
  /** 
   * Builds an AST node of type 'GeneratorExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  generatorExpression(body: Expression, blocks: Array<ComprehensionBlock>, filter: Expression | null): GeneratorExpression;
  
  /** 
   * Builds an AST node of type 'ComprehensionBlock'.
   * Super types: Node, Printable
   */
  comprehensionBlock(left: Pattern, right: Expression, each: boolean): ComprehensionBlock;
  
  /** 
   * Builds an AST node of type 'ComprehensionExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  comprehensionExpression(body: Expression, blocks: Array<ComprehensionBlock>, filter: Expression | null): ComprehensionExpression;
  
  /** 
   * Builds an AST node of type 'PropertyPattern'.
   * Super types: Pattern, Node, Printable
   */
  propertyPattern(key: Literal | Identifier | Expression, pattern: Pattern): PropertyPattern;
  
  /** 
   * Builds an AST node of type 'ObjectPattern'.
   * Super types: Pattern, Node, Printable
   */
  objectPattern(properties: Array<Property | PropertyPattern | SpreadPropertyPattern | SpreadProperty | ObjectProperty | RestProperty>): ObjectPattern;
  
  /** 
   * Builds an AST node of type 'ArrayPattern'.
   * Super types: Pattern, Node, Printable
   */
  arrayPattern(elements: Array<Pattern | SpreadElement | null>): ArrayPattern;
  
  /** 
   * Builds an AST node of type 'MethodDefinition'.
   * Super types: Declaration, Statement, Node, Printable
   */
  methodDefinition(kind: 'constructor' | 'method' | 'get' | 'set', key: Expression, value: Function, static_: boolean): MethodDefinition;
  
  /** 
   * Builds an AST node of type 'SpreadElement'.
   * Super types: Node, Printable
   */
  spreadElement(argument: Expression): SpreadElement;
  
  /** 
   * Builds an AST node of type 'AssignmentPattern'.
   * Super types: Pattern, Node, Printable
   */
  assignmentPattern(left: Pattern, right: Expression): AssignmentPattern;
  
  /** 
   * Builds an AST node of type 'ClassPropertyDefinition'.
   * Super types: Declaration, Statement, Node, Printable
   */
  classPropertyDefinition(definition: MethodDefinition | VariableDeclarator | ClassPropertyDefinition | ClassProperty): ClassPropertyDefinition;
  
  /** 
   * Builds an AST node of type 'ClassProperty'.
   * Super types: Declaration, Statement, Node, Printable
   */
  classProperty(key: Literal | Identifier | Expression, value: Expression | null, typeAnnotation: TypeAnnotation | null, static_: boolean): ClassProperty;
  
  /** 
   * Builds an AST node of type 'ClassBody'.
   * Super types: Declaration, Statement, Node, Printable
   */
  classBody(body: Array<MethodDefinition | VariableDeclarator | ClassPropertyDefinition | ClassProperty | ClassMethod | TSDeclareMethod | TSCallSignatureDeclaration | TSConstructSignatureDeclaration | TSIndexSignature | TSMethodSignature | TSPropertySignature>): ClassBody;
  
  /** 
   * Builds an AST node of type 'ClassDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  classDeclaration(id: Identifier | null, body: ClassBody, superClass: Expression | null): ClassDeclaration;
  
  /** 
   * Builds an AST node of type 'ClassExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  classExpression(id: Identifier | null, body: ClassBody, superClass: Expression | null): ClassExpression;
  
  /** 
   * Builds an AST node of type 'ImportSpecifier'.
   * Super types: ModuleSpecifier, Specifier, Node, Printable
   */
  importSpecifier(imported: Identifier, local: Identifier | null): ImportSpecifier;
  
  /** 
   * Builds an AST node of type 'ImportNamespaceSpecifier'.
   * Super types: ModuleSpecifier, Specifier, Node, Printable
   */
  importNamespaceSpecifier(local: Identifier | null): ImportNamespaceSpecifier;
  
  /** 
   * Builds an AST node of type 'ImportDefaultSpecifier'.
   * Super types: ModuleSpecifier, Specifier, Node, Printable
   */
  importDefaultSpecifier(local: Identifier | null): ImportDefaultSpecifier;
  
  /** 
   * Builds an AST node of type 'ImportDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  importDeclaration(specifiers: Array<ImportSpecifier | ImportNamespaceSpecifier | ImportDefaultSpecifier>, source: Literal, importKind: 'value' | 'type'): ImportDeclaration;
  
  /** 
   * Builds an AST node of type 'TaggedTemplateExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  taggedTemplateExpression(tag: Expression, quasi: TemplateLiteral): TaggedTemplateExpression;
  
  /** 
   * Builds an AST node of type 'TemplateLiteral'.
   * Super types: Expression, Pattern, Node, Printable
   */
  templateLiteral(quasis: Array<TemplateElement>, expressions: Array<Expression>): TemplateLiteral;
  
  /** 
   * Builds an AST node of type 'TemplateElement'.
   * Super types: Node, Printable
   */
  templateElement(value: TemplateElementValue, tail: boolean): TemplateElement;
  
  /** 
   * Builds an AST node of type 'SpreadProperty'.
   * Super types: Node, Printable
   */
  spreadProperty(argument: Expression): SpreadProperty;
  
  /** 
   * Builds an AST node of type 'SpreadPropertyPattern'.
   * Super types: Pattern, Node, Printable
   */
  spreadPropertyPattern(argument: Pattern): SpreadPropertyPattern;
  
  /** 
   * Builds an AST node of type 'AwaitExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  awaitExpression(argument: Expression | null, all: boolean): AwaitExpression;
  
  /** 
   * Builds an AST node of type 'LetStatement'.
   * Super types: Statement, Node, Printable
   */
  letStatement(head: Array<VariableDeclarator>, body: Statement): LetStatement;
  
  /** 
   * Builds an AST node of type 'LetExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  letExpression(head: Array<VariableDeclarator>, body: Expression): LetExpression;
  
  /** 
   * Builds an AST node of type 'GraphExpression'.
   * Super types: Expression, Pattern, Node, Printable
   * @param index must be >= 0
   */
  graphExpression(index: number, expression: Literal): GraphExpression;
  
  /** 
   * Builds an AST node of type 'GraphIndexExpression'.
   * Super types: Expression, Pattern, Node, Printable
   * @param index must be >= 0
   */
  graphIndexExpression(index: number): GraphIndexExpression;
  
  /** 
   * Builds an AST node of type 'JSXAttribute'.
   * Super types: Node, Printable
   */
  jsxAttribute(name: JSXIdentifier | JSXNamespacedName, value: Literal | JSXExpressionContainer | null): JSXAttribute;
  
  /** 
   * Builds an AST node of type 'JSXIdentifier'.
   * Super types: Identifier, Expression, Pattern, Node, Printable
   */
  jsxIdentifier(name: string): JSXIdentifier;
  
  /** 
   * Builds an AST node of type 'JSXNamespacedName'.
   * Super types: Node, Printable
   */
  jsxNamespacedName(namespace: JSXIdentifier, name: JSXIdentifier): JSXNamespacedName;
  
  /** 
   * Builds an AST node of type 'JSXExpressionContainer'.
   * Super types: Expression, Pattern, Node, Printable
   */
  jsxExpressionContainer(expression: Expression): JSXExpressionContainer;
  
  /** 
   * Builds an AST node of type 'JSXMemberExpression'.
   * Super types: MemberExpression, Expression, Pattern, Node, Printable
   */
  jsxMemberExpression(object: JSXIdentifier | JSXMemberExpression, property: JSXIdentifier): JSXMemberExpression;
  
  /** 
   * Builds an AST node of type 'JSXSpreadAttribute'.
   * Super types: Node, Printable
   */
  jsxSpreadAttribute(argument: Expression): JSXSpreadAttribute;
  
  /** 
   * Builds an AST node of type 'JSXElement'.
   * Super types: Expression, Pattern, Node, Printable
   */
  jsxElement(openingElement: JSXOpeningElement, closingElement: JSXClosingElement | null, children: Array<JSXElement | JSXExpressionContainer | JSXFragment | JSXText | Literal>): JSXElement;
  
  /** 
   * Builds an AST node of type 'JSXOpeningElement'.
   * Super types: Node, Printable
   */
  jsxOpeningElement(name: JSXIdentifier | JSXNamespacedName | JSXMemberExpression, attributes: Array<JSXAttribute | JSXSpreadAttribute>, selfClosing: boolean): JSXOpeningElement;
  
  /** 
   * Builds an AST node of type 'JSXClosingElement'.
   * Super types: Node, Printable
   */
  jsxClosingElement(name: JSXIdentifier | JSXNamespacedName | JSXMemberExpression): JSXClosingElement;
  
  /** 
   * Builds an AST node of type 'JSXFragment'.
   * Super types: Expression, Pattern, Node, Printable
   */
  jsxFragment(openingElement: JSXOpeningFragment, closingElement: JSXClosingFragment, children: Array<JSXElement | JSXExpressionContainer | JSXFragment | JSXText | Literal>): JSXFragment;
  
  /** 
   * Builds an AST node of type 'JSXText'.
   * Super types: Literal, Expression, Pattern, Node, Printable
   */
  jsxText(value: string): JSXText;
  
  /** 
   * Builds an AST node of type 'JSXOpeningFragment'.
   * Super types: Node, Printable
   */
  jsxOpeningFragment(): JSXOpeningFragment;
  
  /** 
   * Builds an AST node of type 'JSXClosingFragment'.
   * Super types: Node, Printable
   */
  jsxClosingFragment(): JSXClosingFragment;
  
  /** 
   * Builds an AST node of type 'JSXEmptyExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  jsxEmptyExpression(): JSXEmptyExpression;
  
  /** 
   * Builds an AST node of type 'JSXSpreadChild'.
   * Super types: Expression, Pattern, Node, Printable
   */
  jsxSpreadChild(expression: Expression): JSXSpreadChild;
  
  /** 
   * Builds an AST node of type 'AnyTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  anyTypeAnnotation(): AnyTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'EmptyTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  emptyTypeAnnotation(): EmptyTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'MixedTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  mixedTypeAnnotation(): MixedTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'VoidTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  voidTypeAnnotation(): VoidTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'NumberTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  numberTypeAnnotation(): NumberTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'NumberLiteralTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  numberLiteralTypeAnnotation(value: number, raw: string): NumberLiteralTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'NumericLiteralTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  numericLiteralTypeAnnotation(value: number, raw: string): NumericLiteralTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'StringTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  stringTypeAnnotation(): StringTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'StringLiteralTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  stringLiteralTypeAnnotation(value: string, raw: string): StringLiteralTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'BooleanTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  booleanTypeAnnotation(): BooleanTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'BooleanLiteralTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  booleanLiteralTypeAnnotation(value: boolean, raw: string): BooleanLiteralTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'NullableTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  nullableTypeAnnotation(typeAnnotation: FlowType): NullableTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'NullLiteralTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  nullLiteralTypeAnnotation(): NullLiteralTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'NullTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  nullTypeAnnotation(): NullTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'ThisTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  thisTypeAnnotation(): ThisTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'ExistsTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  existsTypeAnnotation(): ExistsTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'ExistentialTypeParam'.
   * Super types: FlowType, Flow, Node, Printable
   */
  existentialTypeParam(): ExistentialTypeParam;
  
  /** 
   * Builds an AST node of type 'FunctionTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  functionTypeAnnotation(params: Array<FunctionTypeParam>, returnType: FlowType, rest: FunctionTypeParam | null, typeParameters: TypeParameterDeclaration | null): FunctionTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'FunctionTypeParam'.
   * Super types: Node, Printable
   */
  functionTypeParam(name: Identifier, typeAnnotation: FlowType, optional: boolean): FunctionTypeParam;
  
  /** 
   * Builds an AST node of type 'TypeParameterDeclaration'.
   * Super types: Node, Printable
   */
  typeParameterDeclaration(params: Array<TypeParameter>): TypeParameterDeclaration;
  
  /** 
   * Builds an AST node of type 'ArrayTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  arrayTypeAnnotation(elementType: FlowType): ArrayTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'ObjectTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  objectTypeAnnotation(properties: Array<ObjectTypeProperty | ObjectTypeSpreadProperty>, indexers: Array<ObjectTypeIndexer>, callProperties: Array<ObjectTypeCallProperty>): ObjectTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'ObjectTypeProperty'.
   * Super types: Node, Printable
   */
  objectTypeProperty(key: Literal | Identifier, value: FlowType, optional: boolean): ObjectTypeProperty;
  
  /** 
   * Builds an AST node of type 'ObjectTypeSpreadProperty'.
   * Super types: Node, Printable
   */
  objectTypeSpreadProperty(argument: FlowType): ObjectTypeSpreadProperty;
  
  /** 
   * Builds an AST node of type 'ObjectTypeIndexer'.
   * Super types: Node, Printable
   */
  objectTypeIndexer(id: Identifier, key: FlowType, value: FlowType): ObjectTypeIndexer;
  
  /** 
   * Builds an AST node of type 'ObjectTypeCallProperty'.
   * Super types: Node, Printable
   */
  objectTypeCallProperty(value: FunctionTypeAnnotation): ObjectTypeCallProperty;
  
  /** 
   * Builds an AST node of type 'Variance'.
   * Super types: Node, Printable
   */
  variance(kind: 'plus' | 'minus'): Variance;
  
  /** 
   * Builds an AST node of type 'QualifiedTypeIdentifier'.
   * Super types: Node, Printable
   */
  qualifiedTypeIdentifier(qualification: Identifier | QualifiedTypeIdentifier, id: Identifier): QualifiedTypeIdentifier;
  
  /** 
   * Builds an AST node of type 'GenericTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  genericTypeAnnotation(id: Identifier | QualifiedTypeIdentifier, typeParameters: TypeParameterInstantiation | null): GenericTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'TypeParameterInstantiation'.
   * Super types: Node, Printable
   */
  typeParameterInstantiation(params: Array<FlowType>): TypeParameterInstantiation;
  
  /** 
   * Builds an AST node of type 'MemberTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  memberTypeAnnotation(object: Identifier, property: MemberTypeAnnotation | GenericTypeAnnotation): MemberTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'UnionTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  unionTypeAnnotation(types: Array<FlowType>): UnionTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'IntersectionTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  intersectionTypeAnnotation(types: Array<FlowType>): IntersectionTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'TypeofTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  typeofTypeAnnotation(argument: FlowType): TypeofTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'TypeParameter'.
   * Super types: FlowType, Flow, Node, Printable
   */
  typeParameter(name: string, variance: 'Variance' | 'plus' | 'minus' | 'null', bound: TypeAnnotation | null): TypeParameter;
  
  /** 
   * Builds an AST node of type 'ClassImplements'.
   * Super types: Node, Printable
   */
  classImplements(id: Identifier): ClassImplements;
  
  /** 
   * Builds an AST node of type 'InterfaceDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  interfaceDeclaration(id: Identifier, body: ObjectTypeAnnotation, extends_: Array<InterfaceExtends>): InterfaceDeclaration;
  
  /** 
   * Builds an AST node of type 'InterfaceExtends'.
   * Super types: Node, Printable
   */
  interfaceExtends(id: Identifier): InterfaceExtends;
  
  /** 
   * Builds an AST node of type 'DeclareInterface'.
   * Super types: InterfaceDeclaration, Declaration, Statement, Node, Printable
   */
  declareInterface(id: Identifier, body: ObjectTypeAnnotation, extends_: Array<InterfaceExtends>): DeclareInterface;
  
  /** 
   * Builds an AST node of type 'TypeAlias'.
   * Super types: Declaration, Statement, Node, Printable
   */
  typeAlias(id: Identifier, typeParameters: TypeParameterDeclaration | null, right: FlowType): TypeAlias;
  
  /** 
   * Builds an AST node of type 'OpaqueType'.
   * Super types: Declaration, Statement, Node, Printable
   */
  opaqueType(id: Identifier, typeParameters: TypeParameterDeclaration | null): OpaqueType;
  
  /** 
   * Builds an AST node of type 'DeclareTypeAlias'.
   * Super types: TypeAlias, Declaration, Statement, Node, Printable
   */
  declareTypeAlias(id: Identifier, typeParameters: TypeParameterDeclaration | null, right: FlowType): DeclareTypeAlias;
  
  /** 
   * Builds an AST node of type 'DeclareOpaqueType'.
   * Super types: TypeAlias, Declaration, Statement, Node, Printable
   */
  declareOpaqueType(id: Identifier, typeParameters: TypeParameterDeclaration | null): DeclareOpaqueType;
  
  /** 
   * Builds an AST node of type 'TypeCastExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  typeCastExpression(expression: Expression, typeAnnotation: TypeAnnotation): TypeCastExpression;
  
  /** 
   * Builds an AST node of type 'TupleTypeAnnotation'.
   * Super types: FlowType, Flow, Node, Printable
   */
  tupleTypeAnnotation(types: Array<FlowType>): TupleTypeAnnotation;
  
  /** 
   * Builds an AST node of type 'DeclareVariable'.
   * Super types: Statement, Node, Printable
   */
  declareVariable(id: Identifier): DeclareVariable;
  
  /** 
   * Builds an AST node of type 'DeclareFunction'.
   * Super types: Statement, Node, Printable
   */
  declareFunction(id: Identifier): DeclareFunction;
  
  /** 
   * Builds an AST node of type 'DeclareClass'.
   * Super types: InterfaceDeclaration, Declaration, Statement, Node, Printable
   */
  declareClass(id: Identifier): DeclareClass;
  
  /** 
   * Builds an AST node of type 'DeclareModule'.
   * Super types: Statement, Node, Printable
   */
  declareModule(id: Identifier | Literal, body: BlockStatement): DeclareModule;
  
  /** 
   * Builds an AST node of type 'DeclareModuleExports'.
   * Super types: Statement, Node, Printable
   */
  declareModuleExports(typeAnnotation: TypeAnnotation): DeclareModuleExports;
  
  /** 
   * Builds an AST node of type 'DeclareExportDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  declareExportDeclaration(default_: boolean, declaration: DeclareVariable | DeclareFunction | DeclareClass | FlowType | null, specifiers: Array<ExportSpecifier | ExportBatchSpecifier>, source: Literal | null): DeclareExportDeclaration;
  
  /** 
   * Builds an AST node of type 'ExportSpecifier'.
   * Super types: ModuleSpecifier, Specifier, Node, Printable
   */
  exportSpecifier(local: Identifier | null, exported: Identifier): ExportSpecifier;
  
  /** 
   * Builds an AST node of type 'ExportBatchSpecifier'.
   * Super types: Specifier, Node, Printable
   */
  exportBatchSpecifier(): ExportBatchSpecifier;
  
  /** 
   * Builds an AST node of type 'DeclareExportAllDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  declareExportAllDeclaration(source: Literal | null): DeclareExportAllDeclaration;
  
  /** 
   * Builds an AST node of type 'InferredPredicate'.
   * Super types: FlowPredicate, Flow, Node, Printable
   */
  inferredPredicate(): InferredPredicate;
  
  /** 
   * Builds an AST node of type 'DeclaredPredicate'.
   * Super types: FlowPredicate, Flow, Node, Printable
   */
  declaredPredicate(value: Expression): DeclaredPredicate;
  
  /** 
   * Builds an AST node of type 'ExportDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  exportDeclaration(default_: boolean, declaration: Declaration | Expression | null, specifiers: Array<ExportSpecifier | ExportBatchSpecifier>, source: Literal | null): ExportDeclaration;
  
  /** 
   * Builds an AST node of type 'Block'.
   * Super types: Comment, Printable
   */
  block(value: string, leading: boolean, trailing: boolean): Block;
  
  /** 
   * Builds an AST node of type 'Line'.
   * Super types: Comment, Printable
   */
  line(value: string, leading: boolean, trailing: boolean): Line;
  
  /** 
   * Builds an AST node of type 'Noop'.
   * Super types: Statement, Node, Printable
   */
  noop(): Noop;
  
  /** 
   * Builds an AST node of type 'DoExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  doExpression(body: Array<Statement>): DoExpression;
  
  /** 
   * Builds an AST node of type 'Super'.
   * Super types: Expression, Pattern, Node, Printable
   */
  super(): Super;
  
  /** 
   * Builds an AST node of type 'BindExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  bindExpression(object: Expression | null, callee: Expression): BindExpression;
  
  /** 
   * Builds an AST node of type 'Decorator'.
   * Super types: Node, Printable
   */
  decorator(expression: Expression): Decorator;
  
  /** 
   * Builds an AST node of type 'MetaProperty'.
   * Super types: Expression, Pattern, Node, Printable
   */
  metaProperty(meta: Identifier, property: Identifier): MetaProperty;
  
  /** 
   * Builds an AST node of type 'ParenthesizedExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  parenthesizedExpression(expression: Expression): ParenthesizedExpression;
  
  /** 
   * Builds an AST node of type 'ExportDefaultDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  exportDefaultDeclaration(declaration: Declaration | Expression): ExportDefaultDeclaration;
  
  /** 
   * Builds an AST node of type 'ExportNamedDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  exportNamedDeclaration(declaration: Declaration | null, specifiers: Array<ExportSpecifier>, source: Literal | null): ExportNamedDeclaration;
  
  /** 
   * Builds an AST node of type 'ExportNamespaceSpecifier'.
   * Super types: Specifier, Node, Printable
   */
  exportNamespaceSpecifier(exported: Identifier): ExportNamespaceSpecifier;
  
  /** 
   * Builds an AST node of type 'ExportDefaultSpecifier'.
   * Super types: Specifier, Node, Printable
   */
  exportDefaultSpecifier(exported: Identifier): ExportDefaultSpecifier;
  
  /** 
   * Builds an AST node of type 'ExportAllDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  exportAllDeclaration(exported: Identifier | null, source: Literal): ExportAllDeclaration;
  
  /** 
   * Builds an AST node of type 'CommentBlock'.
   * Super types: Comment, Printable
   */
  commentBlock(value: string, leading: boolean, trailing: boolean): CommentBlock;
  
  /** 
   * Builds an AST node of type 'CommentLine'.
   * Super types: Comment, Printable
   */
  commentLine(value: string, leading: boolean, trailing: boolean): CommentLine;
  
  /** 
   * Builds an AST node of type 'Directive'.
   * Super types: Node, Printable
   */
  directive(value: DirectiveLiteral): Directive;
  
  /** 
   * Builds an AST node of type 'DirectiveLiteral'.
   * Super types: Expression, Pattern, Node, Printable
   */
  directiveLiteral(value: string): DirectiveLiteral;
  
  /** 
   * Builds an AST node of type 'StringLiteral'.
   * Super types: Literal, Expression, Pattern, Node, Printable
   */
  stringLiteral(value: string): StringLiteral;
  
  /** 
   * Builds an AST node of type 'NumericLiteral'.
   * Super types: Literal, Expression, Pattern, Node, Printable
   */
  numericLiteral(value: number): NumericLiteral;
  
  /** 
   * Builds an AST node of type 'BigIntLiteral'.
   * Super types: Literal, Expression, Pattern, Node, Printable
   */
  bigIntLiteral(value: string | number): BigIntLiteral;
  
  /** 
   * Builds an AST node of type 'NullLiteral'.
   * Super types: Literal, Expression, Pattern, Node, Printable
   */
  nullLiteral(): NullLiteral;
  
  /** 
   * Builds an AST node of type 'BooleanLiteral'.
   * Super types: Literal, Expression, Pattern, Node, Printable
   */
  booleanLiteral(value: boolean): BooleanLiteral;
  
  /** 
   * Builds an AST node of type 'RegExpLiteral'.
   * Super types: Literal, Expression, Pattern, Node, Printable
   */
  regExpLiteral(pattern: string, flags: string): RegExpLiteral;
  
  /** 
   * Builds an AST node of type 'ObjectMethod'.
   * Super types: Function, Node, Printable
   */
  objectMethod(kind: 'method' | 'get' | 'set', key: Literal | Identifier | Expression, params: Array<Pattern>, body: BlockStatement, computed: boolean): ObjectMethod;
  
  /** 
   * Builds an AST node of type 'ObjectProperty'.
   * Super types: Node, Printable
   */
  objectProperty(key: Literal | Identifier | Expression, value: Expression | Pattern): ObjectProperty;
  
  /** 
   * Builds an AST node of type 'ClassMethod'.
   * Super types: Declaration, Function, Statement, Node, Printable
   */
  classMethod(kind: 'get' | 'set' | 'method' | 'constructor', key: Literal | Identifier | Expression, params: Array<Pattern>, body: BlockStatement, computed: boolean, static_: boolean): ClassMethod;
  
  /** 
   * Builds an AST node of type 'RestProperty'.
   * Super types: Node, Printable
   */
  restProperty(argument: Expression): RestProperty;
  
  /** 
   * Builds an AST node of type 'ForAwaitStatement'.
   * Super types: Statement, Node, Printable
   */
  forAwaitStatement(left: VariableDeclaration | Expression, right: Expression, body: Statement): ForAwaitStatement;
  
  /** 
   * Builds an AST node of type 'Import'.
   * Super types: Expression, Pattern, Node, Printable
   */
  import(): Import;
  
  /** 
   * Builds an AST node of type 'TSQualifiedName'.
   * Super types: Node, Printable
   */
  tsQualifiedName(left: Identifier | TSQualifiedName, right: Identifier | TSQualifiedName): TSQualifiedName;
  
  /** 
   * Builds an AST node of type 'TSTypeReference'.
   * Super types: TSType, Node, Printable
   */
  tsTypeReference(typeName: Identifier | TSQualifiedName, typeParameters: TSTypeParameterInstantiation | null): TSTypeReference;
  
  /** 
   * Builds an AST node of type 'TSTypeParameterInstantiation'.
   * Super types: Node, Printable
   */
  tsTypeParameterInstantiation(params: Array<TSType>): TSTypeParameterInstantiation;
  
  /** 
   * Builds an AST node of type 'TSTypeParameterDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  tsTypeParameterDeclaration(params: Array<TSTypeParameter>): TSTypeParameterDeclaration;
  
  /** 
   * Builds an AST node of type 'TSAsExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  tsAsExpression(expression: Expression): TSAsExpression;
  
  /** 
   * Builds an AST node of type 'TSNonNullExpression'.
   * Super types: Expression, Pattern, Node, Printable
   */
  tsNonNullExpression(expression: Expression): TSNonNullExpression;
  
  /** 
   * Builds an AST node of type 'TSAnyKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsAnyKeyword(): TSAnyKeyword;
  
  /** 
   * Builds an AST node of type 'TSBooleanKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsBooleanKeyword(): TSBooleanKeyword;
  
  /** 
   * Builds an AST node of type 'TSNeverKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsNeverKeyword(): TSNeverKeyword;
  
  /** 
   * Builds an AST node of type 'TSNullKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsNullKeyword(): TSNullKeyword;
  
  /** 
   * Builds an AST node of type 'TSNumberKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsNumberKeyword(): TSNumberKeyword;
  
  /** 
   * Builds an AST node of type 'TSObjectKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsObjectKeyword(): TSObjectKeyword;
  
  /** 
   * Builds an AST node of type 'TSStringKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsStringKeyword(): TSStringKeyword;
  
  /** 
   * Builds an AST node of type 'TSSymbolKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsSymbolKeyword(): TSSymbolKeyword;
  
  /** 
   * Builds an AST node of type 'TSUndefinedKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsUndefinedKeyword(): TSUndefinedKeyword;
  
  /** 
   * Builds an AST node of type 'TSVoidKeyword'.
   * Super types: TSType, Node, Printable
   */
  tsVoidKeyword(): TSVoidKeyword;
  
  /** 
   * Builds an AST node of type 'TSThisType'.
   * Super types: TSType, Node, Printable
   */
  tsThisType(): TSThisType;
  
  /** 
   * Builds an AST node of type 'TSArrayType'.
   * Super types: TSType, Node, Printable
   */
  tsArrayType(elementType: TSType): TSArrayType;
  
  /** 
   * Builds an AST node of type 'TSLiteralType'.
   * Super types: TSType, Node, Printable
   */
  tsLiteralType(literal: NumericLiteral | StringLiteral | BooleanLiteral): TSLiteralType;
  
  /** 
   * Builds an AST node of type 'TSUnionType'.
   * Super types: TSType, Node, Printable
   */
  tsUnionType(types: Array<TSType>): TSUnionType;
  
  /** 
   * Builds an AST node of type 'TSIntersectionType'.
   * Super types: TSType, Node, Printable
   */
  tsIntersectionType(types: Array<TSType>): TSIntersectionType;
  
  /** 
   * Builds an AST node of type 'TSConditionalType'.
   * Super types: TSType, Node, Printable
   */
  tsConditionalType(checkType: TSType, extendsType: TSType, trueType: TSType, falseType: TSType): TSConditionalType;
  
  /** 
   * Builds an AST node of type 'TSInferType'.
   * Super types: TSType, Node, Printable
   */
  tsInferType(typeParameter: TSTypeParameter): TSInferType;
  
  /** 
   * Builds an AST node of type 'TSParenthesizedType'.
   * Super types: TSType, Node, Printable
   */
  tsParenthesizedType(typeAnnotation: TSType): TSParenthesizedType;
  
  /** 
   * Builds an AST node of type 'TSFunctionType'.
   * Super types: TSType, TSHasOptionalTypeParameters, TSHasOptionalTypeAnnotation, Node, Printable
   */
  tsFunctionType(parameters: Array<Identifier | RestElement>): TSFunctionType;
  
  /** 
   * Builds an AST node of type 'TSConstructorType'.
   * Super types: TSType, TSHasOptionalTypeParameters, TSHasOptionalTypeAnnotation, Node, Printable
   */
  tsConstructorType(parameters: Array<Identifier | RestElement>): TSConstructorType;
  
  /** 
   * Builds an AST node of type 'TSDeclareFunction'.
   * Super types: Declaration, TSHasOptionalTypeParameters, Statement, Node, Printable
   */
  tsDeclareFunction(id: Identifier | null, params: Array<Pattern>, returnType: TSTypeAnnotation | Noop | null): TSDeclareFunction;
  
  /** 
   * Builds an AST node of type 'TSDeclareMethod'.
   * Super types: Declaration, TSHasOptionalTypeParameters, Statement, Node, Printable
   */
  tsDeclareMethod(key: Identifier | StringLiteral | NumericLiteral | Expression, params: Array<Pattern>, returnType: TSTypeAnnotation | Noop | null): TSDeclareMethod;
  
  /** 
   * Builds an AST node of type 'TSMappedType'.
   * Super types: TSType, Node, Printable
   */
  tsMappedType(typeParameter: TSTypeParameter, typeAnnotation: TSType | null): TSMappedType;
  
  /** 
   * Builds an AST node of type 'TSTupleType'.
   * Super types: TSType, Node, Printable
   */
  tsTupleType(elementTypes: Array<TSType>): TSTupleType;
  
  /** 
   * Builds an AST node of type 'TSIndexedAccessType'.
   * Super types: TSType, Node, Printable
   */
  tsIndexedAccessType(objectType: TSType, indexType: TSType): TSIndexedAccessType;
  
  /** 
   * Builds an AST node of type 'TSTypeOperator'.
   * Super types: TSType, Node, Printable
   */
  tsTypeOperator(operator: 'string'): TSTypeOperator;
  
  /** 
   * Builds an AST node of type 'TSIndexSignature'.
   * Super types: Declaration, TSHasOptionalTypeAnnotation, Statement, Node, Printable
   */
  tsIndexSignature(parameters: Array<Identifier>): TSIndexSignature;
  
  /** 
   * Builds an AST node of type 'TSPropertySignature'.
   * Super types: Declaration, TSHasOptionalTypeAnnotation, Statement, Node, Printable
   */
  tsPropertySignature(key: Expression): TSPropertySignature;
  
  /** 
   * Builds an AST node of type 'TSMethodSignature'.
   * Super types: Declaration, TSHasOptionalTypeParameters, TSHasOptionalTypeAnnotation, Statement, Node, Printable
   */
  tsMethodSignature(key: Expression): TSMethodSignature;
  
  /** 
   * Builds an AST node of type 'TSTypePredicate'.
   * Super types: TSTypeAnnotation, Node, Printable
   */
  tsTypePredicate(parameterName: Identifier | TSThisType, typeAnnotation: TSTypeAnnotation): TSTypePredicate;
  
  /** 
   * Builds an AST node of type 'TSCallSignatureDeclaration'.
   * Super types: Declaration, TSHasOptionalTypeParameters, TSHasOptionalTypeAnnotation, Statement, Node, Printable
   */
  tsCallSignatureDeclaration(parameters: Array<Identifier | RestElement>): TSCallSignatureDeclaration;
  
  /** 
   * Builds an AST node of type 'TSConstructSignatureDeclaration'.
   * Super types: Declaration, TSHasOptionalTypeParameters, TSHasOptionalTypeAnnotation, Statement, Node, Printable
   */
  tsConstructSignatureDeclaration(parameters: Array<Identifier | RestElement>): TSConstructSignatureDeclaration;
  
  /** 
   * Builds an AST node of type 'TSEnumMember'.
   * Super types: Node, Printable
   */
  tsEnumMember(id: Identifier | StringLiteral, initializer: Expression | null): TSEnumMember;
  
  /** 
   * Builds an AST node of type 'TSTypeQuery'.
   * Super types: TSType, Node, Printable
   */
  tsTypeQuery(exprName: Identifier): TSTypeQuery;
  
  /** 
   * Builds an AST node of type 'TSTypeLiteral'.
   * Super types: TSType, Node, Printable
   */
  tsTypeLiteral(members: Array<TSCallSignatureDeclaration | TSConstructSignatureDeclaration | TSIndexSignature | TSMethodSignature | TSPropertySignature>): TSTypeLiteral;
  
  /** 
   * Builds an AST node of type 'TSTypeAssertion'.
   * Super types: Expression, Pattern, Node, Printable
   */
  tsTypeAssertion(typeAnnotation: TSType, expression: Expression): TSTypeAssertion;
  
  /** 
   * Builds an AST node of type 'TSEnumDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  tsEnumDeclaration(id: Identifier, members: Array<TSEnumMember>): TSEnumDeclaration;
  
  /** 
   * Builds an AST node of type 'TSTypeAliasDeclaration'.
   * Super types: Declaration, TSHasOptionalTypeParameters, Statement, Node, Printable
   */
  tsTypeAliasDeclaration(id: Identifier): TSTypeAliasDeclaration;
  
  /** 
   * Builds an AST node of type 'TSModuleBlock'.
   * Super types: Node, Printable
   */
  tsModuleBlock(body: Array<Statement>): TSModuleBlock;
  
  /** 
   * Builds an AST node of type 'TSModuleDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  tsModuleDeclaration(id: StringLiteral | Identifier | TSQualifiedName, body: TSModuleBlock | TSModuleDeclaration | null): TSModuleDeclaration;
  
  /** 
   * Builds an AST node of type 'TSImportEqualsDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  tsImportEqualsDeclaration(id: Identifier, moduleReference: Identifier | TSQualifiedName | TSExternalModuleReference): TSImportEqualsDeclaration;
  
  /** 
   * Builds an AST node of type 'TSExternalModuleReference'.
   * Super types: Declaration, Statement, Node, Printable
   */
  tsExternalModuleReference(expression: StringLiteral): TSExternalModuleReference;
  
  /** 
   * Builds an AST node of type 'TSExportAssignment'.
   * Super types: Statement, Node, Printable
   */
  tsExportAssignment(expression: Expression): TSExportAssignment;
  
  /** 
   * Builds an AST node of type 'TSNamespaceExportDeclaration'.
   * Super types: Declaration, Statement, Node, Printable
   */
  tsNamespaceExportDeclaration(id: Identifier): TSNamespaceExportDeclaration;
  
  /** 
   * Builds an AST node of type 'TSInterfaceBody'.
   * Super types: Node, Printable
   */
  tsInterfaceBody(body: Array<TSCallSignatureDeclaration | TSConstructSignatureDeclaration | TSIndexSignature | TSMethodSignature | TSPropertySignature>): TSInterfaceBody;
  
  /** 
   * Builds an AST node of type 'TSExpressionWithTypeArguments'.
   * Super types: TSType, Node, Printable
   */
  tsExpressionWithTypeArguments(expression: Identifier | TSQualifiedName, typeParameters: TSTypeParameterInstantiation | null): TSExpressionWithTypeArguments;
  
  /** 
   * Builds an AST node of type 'TSInterfaceDeclaration'.
   * Super types: Declaration, TSHasOptionalTypeParameters, Statement, Node, Printable
   */
  tsInterfaceDeclaration(id: Identifier | TSQualifiedName, body: TSInterfaceBody): TSInterfaceDeclaration;
  
  /** 
   * Builds an AST node of type 'TSParameterProperty'.
   * Super types: Pattern, Node, Printable
   */
  tsParameterProperty(parameter: Identifier | AssignmentPattern): TSParameterProperty;
  
  /** 
   * Builds an AST node of type 'OptionalMemberExpression'.
   * Super types: MemberExpression, Expression, Pattern, Node, Printable
   */
  optionalMemberExpression(object: Expression, property: Identifier | Expression, computed: boolean, optional: boolean): OptionalMemberExpression;
  
  /** 
   * Builds an AST node of type 'OptionalCallExpression'.
   * Super types: CallExpression, Expression, Pattern, Node, Printable
   */
  optionalCallExpression(callee: Expression, arguments: Array<Expression | SpreadElement>, optional: boolean): OptionalCallExpression;
  }interface Printable extends ASTNode {} 
interface SourceLocation extends ASTNode {} 
interface Node extends ASTNode {} 
interface Comment extends ASTNode {} 
interface Position extends ASTNode {} 
interface File extends ASTNode {} 
interface Program extends ASTNode {} 
interface Statement extends ASTNode {} 
interface Function extends ASTNode {} 
interface Pattern extends ASTNode {} 
interface Expression extends ASTNode {} 
interface Identifier extends ASTNode {} 
interface BlockStatement extends ASTNode {} 
interface EmptyStatement extends ASTNode {} 
interface ExpressionStatement extends ASTNode {} 
interface IfStatement extends ASTNode {} 
interface LabeledStatement extends ASTNode {} 
interface BreakStatement extends ASTNode {} 
interface ContinueStatement extends ASTNode {} 
interface WithStatement extends ASTNode {} 
interface SwitchStatement extends ASTNode {} 
interface SwitchCase extends ASTNode {} 
interface ReturnStatement extends ASTNode {} 
interface ThrowStatement extends ASTNode {} 
interface TryStatement extends ASTNode {} 
interface CatchClause extends ASTNode {} 
interface WhileStatement extends ASTNode {} 
interface DoWhileStatement extends ASTNode {} 
interface ForStatement extends ASTNode {} 
interface Declaration extends ASTNode {} 
interface VariableDeclaration extends ASTNode {} 
interface ForInStatement extends ASTNode {} 
interface DebuggerStatement extends ASTNode {} 
interface FunctionDeclaration extends ASTNode {} 
interface FunctionExpression extends ASTNode {} 
interface VariableDeclarator extends ASTNode {} 
interface ThisExpression extends ASTNode {} 
interface ArrayExpression extends ASTNode {} 
interface ObjectExpression extends ASTNode {} 
interface Property extends ASTNode {} 
interface Literal extends ASTNode {} 
interface SequenceExpression extends ASTNode {} 
interface UnaryExpression extends ASTNode {} 
interface BinaryExpression extends ASTNode {} 
interface AssignmentExpression extends ASTNode {} 
interface UpdateExpression extends ASTNode {} 
interface LogicalExpression extends ASTNode {} 
interface ConditionalExpression extends ASTNode {} 
interface NewExpression extends ASTNode {} 
interface CallExpression extends ASTNode {} 
interface MemberExpression extends ASTNode {} 
interface RestElement extends ASTNode {} 
interface TypeAnnotation extends ASTNode {} 
interface TSTypeAnnotation extends ASTNode {} 
interface SpreadElementPattern extends ASTNode {} 
interface ArrowFunctionExpression extends ASTNode {} 
interface ForOfStatement extends ASTNode {} 
interface YieldExpression extends ASTNode {} 
interface GeneratorExpression extends ASTNode {} 
interface ComprehensionBlock extends ASTNode {} 
interface ComprehensionExpression extends ASTNode {} 
interface PropertyPattern extends ASTNode {} 
interface ObjectPattern extends ASTNode {} 
interface ArrayPattern extends ASTNode {} 
interface MethodDefinition extends ASTNode {} 
interface SpreadElement extends ASTNode {} 
interface AssignmentPattern extends ASTNode {} 
interface ClassPropertyDefinition extends ASTNode {} 
interface ClassProperty extends ASTNode {} 
interface ClassBody extends ASTNode {} 
interface ClassDeclaration extends ASTNode {} 
interface ClassExpression extends ASTNode {} 
interface Specifier extends ASTNode {} 
interface ModuleSpecifier extends ASTNode {} 
interface ImportSpecifier extends ASTNode {} 
interface ImportNamespaceSpecifier extends ASTNode {} 
interface ImportDefaultSpecifier extends ASTNode {} 
interface ImportDeclaration extends ASTNode {} 
interface TaggedTemplateExpression extends ASTNode {} 
interface TemplateLiteral extends ASTNode {} 
interface TemplateElement extends ASTNode {} 
interface SpreadProperty extends ASTNode {} 
interface SpreadPropertyPattern extends ASTNode {} 
interface AwaitExpression extends ASTNode {} 
interface LetStatement extends ASTNode {} 
interface LetExpression extends ASTNode {} 
interface GraphExpression extends ASTNode {} 
interface GraphIndexExpression extends ASTNode {} 
interface XMLDefaultDeclaration extends ASTNode {} 
interface XMLAnyName extends ASTNode {} 
interface XMLQualifiedIdentifier extends ASTNode {} 
interface XMLFunctionQualifiedIdentifier extends ASTNode {} 
interface XMLAttributeSelector extends ASTNode {} 
interface XMLFilterExpression extends ASTNode {} 
interface XML extends ASTNode {} 
interface XMLElement extends ASTNode {} 
interface XMLList extends ASTNode {} 
interface XMLEscape extends ASTNode {} 
interface XMLText extends ASTNode {} 
interface XMLStartTag extends ASTNode {} 
interface XMLEndTag extends ASTNode {} 
interface XMLPointTag extends ASTNode {} 
interface XMLName extends ASTNode {} 
interface XMLAttribute extends ASTNode {} 
interface XMLCdata extends ASTNode {} 
interface XMLComment extends ASTNode {} 
interface XMLProcessingInstruction extends ASTNode {} 
interface JSXAttribute extends ASTNode {} 
interface JSXIdentifier extends ASTNode {} 
interface JSXNamespacedName extends ASTNode {} 
interface JSXExpressionContainer extends ASTNode {} 
interface JSXMemberExpression extends ASTNode {} 
interface JSXSpreadAttribute extends ASTNode {} 
interface JSXElement extends ASTNode {} 
interface JSXOpeningElement extends ASTNode {} 
interface JSXClosingElement extends ASTNode {} 
interface JSXFragment extends ASTNode {} 
interface JSXText extends ASTNode {} 
interface JSXOpeningFragment extends ASTNode {} 
interface JSXClosingFragment extends ASTNode {} 
interface JSXEmptyExpression extends ASTNode {} 
interface JSXSpreadChild extends ASTNode {} 
interface Flow extends ASTNode {} 
interface FlowType extends ASTNode {} 
interface AnyTypeAnnotation extends ASTNode {} 
interface EmptyTypeAnnotation extends ASTNode {} 
interface MixedTypeAnnotation extends ASTNode {} 
interface VoidTypeAnnotation extends ASTNode {} 
interface NumberTypeAnnotation extends ASTNode {} 
interface NumberLiteralTypeAnnotation extends ASTNode {} 
interface NumericLiteralTypeAnnotation extends ASTNode {} 
interface StringTypeAnnotation extends ASTNode {} 
interface StringLiteralTypeAnnotation extends ASTNode {} 
interface BooleanTypeAnnotation extends ASTNode {} 
interface BooleanLiteralTypeAnnotation extends ASTNode {} 
interface NullableTypeAnnotation extends ASTNode {} 
interface NullLiteralTypeAnnotation extends ASTNode {} 
interface NullTypeAnnotation extends ASTNode {} 
interface ThisTypeAnnotation extends ASTNode {} 
interface ExistsTypeAnnotation extends ASTNode {} 
interface ExistentialTypeParam extends ASTNode {} 
interface FunctionTypeAnnotation extends ASTNode {} 
interface FunctionTypeParam extends ASTNode {} 
interface TypeParameterDeclaration extends ASTNode {} 
interface ArrayTypeAnnotation extends ASTNode {} 
interface ObjectTypeAnnotation extends ASTNode {} 
interface ObjectTypeProperty extends ASTNode {} 
interface ObjectTypeSpreadProperty extends ASTNode {} 
interface ObjectTypeIndexer extends ASTNode {} 
interface ObjectTypeCallProperty extends ASTNode {} 
interface Variance extends ASTNode {} 
interface QualifiedTypeIdentifier extends ASTNode {} 
interface GenericTypeAnnotation extends ASTNode {} 
interface TypeParameterInstantiation extends ASTNode {} 
interface MemberTypeAnnotation extends ASTNode {} 
interface UnionTypeAnnotation extends ASTNode {} 
interface IntersectionTypeAnnotation extends ASTNode {} 
interface TypeofTypeAnnotation extends ASTNode {} 
interface TypeParameter extends ASTNode {} 
interface ClassImplements extends ASTNode {} 
interface InterfaceDeclaration extends ASTNode {} 
interface InterfaceExtends extends ASTNode {} 
interface DeclareInterface extends ASTNode {} 
interface TypeAlias extends ASTNode {} 
interface OpaqueType extends ASTNode {} 
interface DeclareTypeAlias extends ASTNode {} 
interface DeclareOpaqueType extends ASTNode {} 
interface TypeCastExpression extends ASTNode {} 
interface TupleTypeAnnotation extends ASTNode {} 
interface DeclareVariable extends ASTNode {} 
interface DeclareFunction extends ASTNode {} 
interface DeclareClass extends ASTNode {} 
interface DeclareModule extends ASTNode {} 
interface DeclareModuleExports extends ASTNode {} 
interface DeclareExportDeclaration extends ASTNode {} 
interface ExportSpecifier extends ASTNode {} 
interface ExportBatchSpecifier extends ASTNode {} 
interface DeclareExportAllDeclaration extends ASTNode {} 
interface FlowPredicate extends ASTNode {} 
interface InferredPredicate extends ASTNode {} 
interface DeclaredPredicate extends ASTNode {} 
interface ExportDeclaration extends ASTNode {} 
interface Block extends ASTNode {} 
interface Line extends ASTNode {} 
interface Noop extends ASTNode {} 
interface DoExpression extends ASTNode {} 
interface Super extends ASTNode {} 
interface BindExpression extends ASTNode {} 
interface Decorator extends ASTNode {} 
interface MetaProperty extends ASTNode {} 
interface ParenthesizedExpression extends ASTNode {} 
interface ExportDefaultDeclaration extends ASTNode {} 
interface ExportNamedDeclaration extends ASTNode {} 
interface ExportNamespaceSpecifier extends ASTNode {} 
interface ExportDefaultSpecifier extends ASTNode {} 
interface ExportAllDeclaration extends ASTNode {} 
interface CommentBlock extends ASTNode {} 
interface CommentLine extends ASTNode {} 
interface Directive extends ASTNode {} 
interface DirectiveLiteral extends ASTNode {} 
interface StringLiteral extends ASTNode {} 
interface NumericLiteral extends ASTNode {} 
interface BigIntLiteral extends ASTNode {} 
interface NullLiteral extends ASTNode {} 
interface BooleanLiteral extends ASTNode {} 
interface RegExpLiteral extends ASTNode {} 
interface ObjectMethod extends ASTNode {} 
interface ObjectProperty extends ASTNode {} 
interface ClassMethod extends ASTNode {} 
interface RestProperty extends ASTNode {} 
interface ForAwaitStatement extends ASTNode {} 
interface Import extends ASTNode {} 
interface TSType extends ASTNode {} 
interface TSQualifiedName extends ASTNode {} 
interface TSTypeReference extends ASTNode {} 
interface TSTypeParameterInstantiation extends ASTNode {} 
interface TSHasOptionalTypeParameters extends ASTNode {} 
interface TSTypeParameterDeclaration extends ASTNode {} 
interface TSHasOptionalTypeAnnotation extends ASTNode {} 
interface TSAsExpression extends ASTNode {} 
interface TSNonNullExpression extends ASTNode {} 
interface TSAnyKeyword extends ASTNode {} 
interface TSBooleanKeyword extends ASTNode {} 
interface TSNeverKeyword extends ASTNode {} 
interface TSNullKeyword extends ASTNode {} 
interface TSNumberKeyword extends ASTNode {} 
interface TSObjectKeyword extends ASTNode {} 
interface TSStringKeyword extends ASTNode {} 
interface TSSymbolKeyword extends ASTNode {} 
interface TSUndefinedKeyword extends ASTNode {} 
interface TSVoidKeyword extends ASTNode {} 
interface TSThisType extends ASTNode {} 
interface TSArrayType extends ASTNode {} 
interface TSLiteralType extends ASTNode {} 
interface TSUnionType extends ASTNode {} 
interface TSIntersectionType extends ASTNode {} 
interface TSConditionalType extends ASTNode {} 
interface TSInferType extends ASTNode {} 
interface TSTypeParameter extends ASTNode {} 
interface TSParenthesizedType extends ASTNode {} 
interface TSFunctionType extends ASTNode {} 
interface TSConstructorType extends ASTNode {} 
interface TSDeclareFunction extends ASTNode {} 
interface TSDeclareMethod extends ASTNode {} 
interface TSMappedType extends ASTNode {} 
interface TSTupleType extends ASTNode {} 
interface TSIndexedAccessType extends ASTNode {} 
interface TSTypeOperator extends ASTNode {} 
interface TSIndexSignature extends ASTNode {} 
interface TSPropertySignature extends ASTNode {} 
interface TSMethodSignature extends ASTNode {} 
interface TSTypePredicate extends ASTNode {} 
interface TSCallSignatureDeclaration extends ASTNode {} 
interface TSConstructSignatureDeclaration extends ASTNode {} 
interface TSEnumMember extends ASTNode {} 
interface TSTypeQuery extends ASTNode {} 
interface TSTypeLiteral extends ASTNode {} 
interface TSTypeAssertion extends ASTNode {} 
interface TSEnumDeclaration extends ASTNode {} 
interface TSTypeAliasDeclaration extends ASTNode {} 
interface TSModuleBlock extends ASTNode {} 
interface TSModuleDeclaration extends ASTNode {} 
interface TSImportEqualsDeclaration extends ASTNode {} 
interface TSExternalModuleReference extends ASTNode {} 
interface TSExportAssignment extends ASTNode {} 
interface TSNamespaceExportDeclaration extends ASTNode {} 
interface TSInterfaceBody extends ASTNode {} 
interface TSExpressionWithTypeArguments extends ASTNode {} 
interface TSInterfaceDeclaration extends ASTNode {} 
interface TSParameterProperty extends ASTNode {} 
interface OptionalMemberExpression extends ASTNode {} 
interface OptionalCallExpression extends ASTNode {} 
