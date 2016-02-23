webpackJsonp([19,15],{

/***/ "./node_modules/jscodeshift/index.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2015-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	module.exports = __webpack_require__("./node_modules/jscodeshift/dist/core.js");


/***/ },

/***/ "./node_modules/jscodeshift/dist/template.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray = __webpack_require__("./node_modules/babel-runtime/helpers/to-consumable-array.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.statements = statements;
	exports.statement = statement;
	exports.expression = expression;
	var babel = __webpack_require__("./node_modules/babel-core/index.js");
	
	function splice(arr, element, replacement) {
	  arr.splice.apply(arr, [arr.indexOf(element), 1].concat(_toConsumableArray(replacement)));
	}
	
	function getPlugin(varName, nodes) {
	  var counter = 0;
	
	  return function (_ref) {
	    var Plugin = _ref.Plugin;
	    var t = _ref.types;
	
	    return new Plugin('template', {
	      visitor: {
	        Identifier: {
	          exit: function exit(node, parent) {
	            if (node.name !== varName) {
	              return node;
	            }
	
	            var replacement = nodes[counter++];
	            if (Array.isArray(replacement)) {
	              // check whether we can explode arrays here
	              if (t.isFunction(parent) && parent.params.indexOf(node) > -1) {
	                // function foo(${bar}) {}
	                splice(parent.params, node, replacement);
	              } else if (t.isVariableDeclarator(parent)) {
	                // var foo = ${bar}, baz = 42;
	                splice(this.parentPath.parentPath.node.declarations, parent, replacement);
	              } else if (t.isArrayExpression(parent)) {
	                // var foo = [${bar}, baz];
	                splice(parent.elements, node, replacement);
	              } else if (t.isProperty(parent) && parent.shorthand) {
	                // var foo = {${bar}, baz: 42};
	                splice(this.parentPath.parentPath.node.properties, parent, replacement);
	              } else if (t.isCallExpression(parent) && parent.arguments.indexOf(node) > -1) {
	                // foo(${bar}, baz)
	                splice(parent.arguments, node, replacement);
	              } else if (t.isExpressionStatement(parent)) {
	                this.parentPath.replaceWithMultiple(replacement);
	              } else {
	                this.replaceWithMultiple(replacement);
	              }
	            } else if (t.isExpressionStatement(parent)) {
	              this.parentPath.replaceWith(replacement);
	            } else {
	              return replacement;
	            }
	          }
	        }
	      }
	    });
	  };
	}
	
	function replaceNodes(src, varName, nodes) {
	  return babel.transform(src, {
	    plugins: [getPlugin(varName, nodes)],
	    whitelist: [],
	    code: false
	  }).ast;
	}
	
	function getRandomVarName() {
	  return '$jscodeshift' + Math.floor(Math.random() * 1000) + '$';
	}
	
	function statements(template) {
	  template = [].concat(_toConsumableArray(template));
	  var varName = getRandomVarName();
	  var src = template.join(varName);
	
	  for (var _len = arguments.length, nodes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    nodes[_key - 1] = arguments[_key];
	  }
	
	  return replaceNodes(src, varName, nodes).program.body;
	}
	
	function statement(template) {
	  for (var _len2 = arguments.length, nodes = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    nodes[_key2 - 1] = arguments[_key2];
	  }
	
	  return statements.apply(undefined, [template].concat(nodes))[0];
	}
	
	function expression(template) {
	  // wrap code in `(...)` to force evaluation as expression
	  template = [].concat(_toConsumableArray(template));
	  if (template.length > 1) {
	    template[0] = '(' + template[0];
	    template[template.length - 1] += ')';
	  } else if (template.length === 0) {
	    template[0] = '(' + template[0] + ')';
	  }
	
	  for (var _len3 = arguments.length, nodes = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	    nodes[_key3 - 1] = arguments[_key3];
	  }
	
	  return statement.apply(undefined, [template].concat(nodes)).expression;
	}

/***/ },

/***/ "./node_modules/jscodeshift/dist/Collection.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2015-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var recast = __webpack_require__("./node_modules/recast/main.js");
	var _ = __webpack_require__("./node_modules/lodash/index.js");
	
	var astTypes = recast.types;
	var types = astTypes.namedTypes;
	var NodePath = astTypes.NodePath;
	var Node = types.Node;
	
	/**
	 * This represents a generic collection of node paths. It only has a generic
	 * API to access and process the elements of the list. It doesn't know anything
	 * about AST types.
	 */
	
	var Collection = (function () {
	
	  /**
	   * @param {Array} paths An array of AST paths
	   * @param {Collection} parent A parent collection
	   * @param {Array} types An array of types all the paths in the collection
	   *  have in common. If not passed, it will be inferred from the paths.
	   * @return {Collection}
	   */
	
	  function Collection(paths, parent, types) {
	    _classCallCheck(this, Collection);
	
	    assert.ok(Array.isArray(paths), 'Collection is passed an array');
	    assert.ok(paths.every(function (p) {
	      return p instanceof NodePath;
	    }), 'Array contains only paths');
	    this._parent = parent;
	    this.__paths = paths;
	    if (types && !Array.isArray(types)) {
	      types = _toTypeArray(types);
	    } else if (!types || Array.isArray(types) && types.length === 0) {
	      types = _inferTypes(paths);
	    }
	    this._types = types.length === 0 ? _defaultType : types;
	  }
	
	  /**
	   * Given a set of paths, this infers the common types of all paths.
	   *
	   * @param {Array} paths An array of paths.
	   * @return {Type} type An AST type
	   */
	
	  /**
	   * Returns a new collection containing the nodes for which the callback
	   * returns true.
	   *
	   * @param {function} callback
	   * @return {Collection}
	   */
	
	  _createClass(Collection, [{
	    key: 'filter',
	    value: function filter(callback) {
	      return new this.constructor(this.__paths.filter(callback), this);
	    }
	
	    /**
	     * Executes callback for each node/path in the collection.
	     *
	     * @param {function} callback
	     * @return {Collection} The collection itself
	     */
	  }, {
	    key: 'forEach',
	    value: function forEach(callback) {
	      this.__paths.forEach(function (path, i, paths) {
	        return callback.call(path, path, i, paths);
	      });
	      return this;
	    }
	
	    /**
	     * Executes the callback for every path in the collection and returns a new
	     * collection from the return values (which must be paths).
	     *
	     * The callback can return null to indicate to exclude the element from the
	     * new collection.
	     *
	     * If an array is returned, the array will be flattened into the result
	     * collection.
	     *
	     * @param {function} callback
	     * @param {Type} type Force the new collection to be of a specific type
	     */
	  }, {
	    key: 'map',
	    value: function map(callback, type) {
	      var paths = [];
	      this.forEach(function (path) {
	        /*jshint eqnull:true*/
	        var result = callback.apply(path, arguments);
	        if (result == null) return;
	        if (!Array.isArray(result)) {
	          result = [result];
	        }
	        for (var i = 0; i < result.length; i++) {
	          if (paths.indexOf(result[i]) === -1) {
	            paths.push(result[i]);
	          }
	        }
	      });
	      return fromPaths(paths, this, type);
	    }
	
	    /**
	     * Returns the number of elements in this collection.
	     *
	     * @return {number}
	     */
	  }, {
	    key: 'size',
	    value: function size() {
	      return this.__paths.length;
	    }
	
	    /**
	     * Returns an array of AST nodes in this collection.
	     *
	     * @return {Array}
	     */
	  }, {
	    key: 'nodes',
	    value: function nodes() {
	      return this.__paths.map(function (p) {
	        return p.value;
	      });
	    }
	  }, {
	    key: 'paths',
	    value: function paths() {
	      return this.__paths;
	    }
	  }, {
	    key: 'getAST',
	    value: function getAST() {
	      if (this._parent) {
	        return this._parent.getAST();
	      }
	      return this.__paths;
	    }
	  }, {
	    key: 'toSource',
	    value: function toSource(options) {
	      if (this._parent) {
	        return this._parent.toSource(options);
	      }
	      if (this.__paths.length === 1) {
	        return recast.print(this.__paths[0], options).code;
	      } else {
	        return this.__paths.map(function (p) {
	          return recast.print(p, options).code;
	        });
	      }
	    }
	
	    /**
	     * Returns a new collection containing only the element at position index.
	     *
	     * In case of a negative index, the element is taken from the end:
	     *
	     *   .at(0)  - first element
	     *   .at(-1) - last element
	     *
	     * @param {number} index
	     * @return {Collection}
	     */
	  }, {
	    key: 'at',
	    value: function at(index) {
	      return fromPaths(this.__paths.slice(index, index === -1 ? undefined : index + 1), this);
	    }
	
	    /**
	     * Proxies to NodePath#get of the first path.
	     *
	     * @param {string|number} ...fields
	     */
	  }, {
	    key: 'get',
	    value: function get() {
	      var path = this.__paths[0];
	      return path.get.apply(path, arguments);
	    }
	
	    /**
	     * Returns the type(s) of the collection. This is only used for unit tests,
	     * I don't think other consumers would need it.
	     *
	     * @return {Array<string>}
	     */
	  }, {
	    key: 'getTypes',
	    value: function getTypes() {
	      return this._types;
	    }
	
	    /**
	     * Returns true if this collection has the type 'type'.
	     *
	     * @param {Type} type
	     * @return {boolean}
	     */
	  }, {
	    key: 'isOfType',
	    value: function isOfType(type) {
	      return !!type && this._types.indexOf(type.toString()) > -1;
	    }
	  }]);
	
	  return Collection;
	})();
	
	function _inferTypes(paths) {
	  var _types = [];
	
	  if (paths.length > 0 && Node.check(paths[0].node)) {
	    var nodeType = types[paths[0].node.type];
	    var sameType = paths.length === 1 || paths.every(function (path) {
	      return nodeType.check(path.node);
	    });
	
	    if (sameType) {
	      _types = [nodeType.toString()].concat(astTypes.getSupertypeNames(nodeType.toString()));
	    } else {
	      // try to find a common type
	      _types = _.intersection.apply(null, paths.map(function (path) {
	        return astTypes.getSupertypeNames(path.node.type);
	      }));
	    }
	  }
	
	  return _types;
	}
	
	function _toTypeArray(value) {
	  value = !Array.isArray(value) ? [value] : value;
	  value = value.map(function (v) {
	    return v.toString();
	  });
	  if (value.length > 1) {
	    return _.union(value, _.intersection.apply(null, value.map(function (type) {
	      return astTypes.getSupertypeNames(type);
	    })));
	  } else {
	    return value.concat(astTypes.getSupertypeNames(value[0]));
	  }
	}
	
	/**
	 * Creates a new collection from an array of node paths.
	 *
	 * If type is passed, it will create a typed collection if such a collection
	 * exists. The nodes or path values must be of the same type.
	 *
	 * Otherwise it will try to infer the type from the path list. If every
	 * element has the same type, a typed collection is created (if it exists),
	 * otherwise, a generic collection will be created.
	 *
	 * @param {Array} paths An array of paths
	 * @param {Collection} parent A parent collection
	 * @param {Type} type An AST type
	 * @return {Collection}
	 */
	function fromPaths(paths, parent, type) {
	  assert.ok(paths.every(function (n) {
	    return n instanceof NodePath;
	  }), 'Every element in the array is a NodePath');
	
	  return new Collection(paths, parent, type);
	}
	
	/**
	 * Creates a new collection from an array of nodes. This is a convenience
	 * method which converts the nodes to node paths first and calls
	 *
	 *    Collections.fromPaths(paths, parent, type)
	 *
	 * @param {Array} nodes An array of AST nodes
	 * @param {Collection} parent A parent collection
	 * @param {Type} type An AST type
	 * @return {Collection}
	 */
	function fromNodes(nodes, parent, type) {
	  assert.ok(nodes.every(function (n) {
	    return Node.check(n);
	  }), 'Every element in the array is a Node');
	  return fromPaths(nodes.map(function (n) {
	    return new NodePath(n);
	  }), parent, type);
	}
	
	var CPt = Collection.prototype;
	
	/**
	 * This function adds the provided methods to the prototype of the corresponding
	 * typed collection. If no type is passed, the methods are added to
	 * Collection.prototype and are available for all collections.
	 *
	 * @param {Object} methods Methods to add to the prototype
	 * @param {Type=} type Optional type to add the methods to
	 */
	function registerMethods(methods, type) {
	  for (var methodName in methods) {
	    if (CPt.hasOwnProperty(methodName)) {
	      throw Error('A method with name "' + methodName + '" already exists.');
	    }
	    if (!type) {
	      CPt[methodName] = methods[methodName];
	    } else {
	      type = type.toString();
	      (function (methodName, method) {
	        CPt[methodName] = function () {
	          if (!this.isOfType(type)) {
	            throw Error('You have a collection of type [' + this.getTypes() + ']. ' + ('"' + methodName + '" is is only defined for "' + type + '".'));
	          }
	          return method.apply(this, arguments);
	        };
	      })(methodName, methods[methodName]);
	    }
	  }
	}
	
	var _defaultType = [];
	
	/**
	 * Sets the default collection type. In case a collection is created form an
	 * empty set of paths and no type is specified, we return a collection of this
	 * type.
	 *
	 * @param {Type} type
	 */
	function setDefaultCollectionType(type) {
	  _defaultType = _toTypeArray(type);
	}
	
	exports.fromPaths = fromPaths;
	exports.fromNodes = fromNodes;
	exports.registerMethods = registerMethods;
	exports.setDefaultCollectionType = setDefaultCollectionType;

/***/ },

/***/ "./node_modules/recast/main.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var parse = __webpack_require__("./node_modules/recast/lib/parser.js").parse;
	var Printer = __webpack_require__("./node_modules/recast/lib/printer.js").Printer;
	
	function print(node, options) {
	    return new Printer(options).print(node);
	}
	
	function prettyPrint(node, options) {
	    return new Printer(options).printGenerically(node);
	}
	
	function run(transformer, options) {
	    return runFile(process.argv[2], transformer, options);
	}
	
	function runFile(path, transformer, options) {
	    __webpack_require__(5).readFile(path, "utf-8", function(err, code) {
	        if (err) {
	            console.error(err);
	            return;
	        }
	
	        runString(code, transformer, options);
	    });
	}
	
	function defaultWriteback(output) {
	    process.stdout.write(output);
	}
	
	function runString(code, transformer, options) {
	    var writeback = options && options.writeback || defaultWriteback;
	    transformer(parse(code, options), function(node) {
	        writeback(print(node, options).code);
	    });
	}
	
	Object.defineProperties(exports, {
	    /**
	     * Parse a string of code into an augmented syntax tree suitable for
	     * arbitrary modification and reprinting.
	     */
	    parse: {
	        enumerable: true,
	        value: parse
	    },
	
	    /**
	     * Traverse and potentially modify an abstract syntax tree using a
	     * convenient visitor syntax:
	     *
	     *   recast.visit(ast, {
	     *     names: [],
	     *     visitIdentifier: function(path) {
	     *       var node = path.value;
	     *       this.visitor.names.push(node.name);
	     *       this.traverse(path);
	     *     }
	     *   });
	     */
	    visit: {
	        enumerable: true,
	        value: types.visit
	    },
	
	    /**
	     * Reprint a modified syntax tree using as much of the original source
	     * code as possible.
	     */
	    print: {
	        enumerable: true,
	        value: print
	    },
	
	    /**
	     * Print without attempting to reuse any original source code.
	     */
	    prettyPrint: {
	        enumerable: false,
	        value: prettyPrint
	    },
	
	    /**
	     * Customized version of require("ast-types").
	     */
	    types: {
	        enumerable: false,
	        value: types
	    },
	
	    /**
	     * Convenient command-line interface (see e.g. example/add-braces).
	     */
	    run: {
	        enumerable: false,
	        value: run
	    }
	});
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/recast/lib/types.js":
/***/ function(module, exports, __webpack_require__) {

	// This module was originally created so that Recast could add its own
	// custom types to the AST type system (in particular, the File type), but
	// those types are now incorporated into ast-types, so this module doesn't
	// have much to do anymore. Still, it might prove useful in the future.
	module.exports = __webpack_require__("./node_modules/ast-types/main.js");


/***/ },

/***/ "./node_modules/ast-types/main.js":
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	
	// This core module of AST types captures ES5 as it is parsed today by
	// git://github.com/ariya/esprima.git#master.
	__webpack_require__("./node_modules/ast-types/def/core.js");
	
	// Feel free to add to or remove from this list of extension modules to
	// configure the precise type hierarchy that you need.
	__webpack_require__("./node_modules/ast-types/def/es6.js");
	__webpack_require__("./node_modules/ast-types/def/es7.js");
	__webpack_require__("./node_modules/ast-types/def/mozilla.js");
	__webpack_require__("./node_modules/ast-types/def/e4x.js");
	__webpack_require__("./node_modules/ast-types/def/fb-harmony.js");
	__webpack_require__("./node_modules/ast-types/def/esprima.js");
	__webpack_require__("./node_modules/ast-types/def/babel.js");
	
	types.finalize();
	
	exports.Type = types.Type;
	exports.builtInTypes = types.builtInTypes;
	exports.namedTypes = types.namedTypes;
	exports.builders = types.builders;
	exports.defineMethod = types.defineMethod;
	exports.getFieldNames = types.getFieldNames;
	exports.getFieldValue = types.getFieldValue;
	exports.eachField = types.eachField;
	exports.someField = types.someField;
	exports.getSupertypeNames = types.getSupertypeNames;
	exports.astNodesAreEquivalent = __webpack_require__("./node_modules/ast-types/lib/equiv.js");
	exports.finalize = types.finalize;
	exports.NodePath = __webpack_require__("./node_modules/ast-types/lib/node-path.js");
	exports.PathVisitor = __webpack_require__("./node_modules/ast-types/lib/path-visitor.js");
	exports.visit = exports.PathVisitor.visit;


/***/ },

/***/ "./node_modules/ast-types/lib/types.js":
/***/ function(module, exports) {

	var Ap = Array.prototype;
	var slice = Ap.slice;
	var map = Ap.map;
	var each = Ap.forEach;
	var Op = Object.prototype;
	var objToStr = Op.toString;
	var funObjStr = objToStr.call(function(){});
	var strObjStr = objToStr.call("");
	var hasOwn = Op.hasOwnProperty;
	
	// A type is an object with a .check method that takes a value and returns
	// true or false according to whether the value matches the type.
	
	function Type(check, name) {
	    var self = this;
	    if (!(self instanceof Type)) {
	        throw new Error("Type constructor cannot be invoked without 'new'");
	    }
	
	    // Unfortunately we can't elegantly reuse isFunction and isString,
	    // here, because this code is executed while defining those types.
	    if (objToStr.call(check) !== funObjStr) {
	        throw new Error(check + " is not a function");
	    }
	
	    // The `name` parameter can be either a function or a string.
	    var nameObjStr = objToStr.call(name);
	    if (!(nameObjStr === funObjStr ||
	          nameObjStr === strObjStr)) {
	        throw new Error(name + " is neither a function nor a string");
	    }
	
	    Object.defineProperties(self, {
	        name: { value: name },
	        check: {
	            value: function(value, deep) {
	                var result = check.call(self, value, deep);
	                if (!result && deep && objToStr.call(deep) === funObjStr)
	                    deep(self, value);
	                return result;
	            }
	        }
	    });
	}
	
	var Tp = Type.prototype;
	
	// Throughout this file we use Object.defineProperty to prevent
	// redefinition of exported properties.
	exports.Type = Type;
	
	// Like .check, except that failure triggers an AssertionError.
	Tp.assert = function(value, deep) {
	    if (!this.check(value, deep)) {
	        var str = shallowStringify(value);
	        throw new Error(str + " does not match type " + this);
	    }
	    return true;
	};
	
	function shallowStringify(value) {
	    if (isObject.check(value))
	        return "{" + Object.keys(value).map(function(key) {
	            return key + ": " + value[key];
	        }).join(", ") + "}";
	
	    if (isArray.check(value))
	        return "[" + value.map(shallowStringify).join(", ") + "]";
	
	    return JSON.stringify(value);
	}
	
	Tp.toString = function() {
	    var name = this.name;
	
	    if (isString.check(name))
	        return name;
	
	    if (isFunction.check(name))
	        return name.call(this) + "";
	
	    return name + " type";
	};
	
	var builtInCtorFns = [];
	var builtInCtorTypes = [];
	var builtInTypes = {};
	exports.builtInTypes = builtInTypes;
	
	function defBuiltInType(example, name) {
	    var objStr = objToStr.call(example);
	
	    var type = new Type(function(value) {
	        return objToStr.call(value) === objStr;
	    }, name);
	
	    builtInTypes[name] = type;
	
	    if (example && typeof example.constructor === "function") {
	        builtInCtorFns.push(example.constructor);
	        builtInCtorTypes.push(type);
	    }
	
	    return type;
	}
	
	// These types check the underlying [[Class]] attribute of the given
	// value, rather than using the problematic typeof operator. Note however
	// that no subtyping is considered; so, for instance, isObject.check
	// returns false for [], /./, new Date, and null.
	var isString = defBuiltInType("truthy", "string");
	var isFunction = defBuiltInType(function(){}, "function");
	var isArray = defBuiltInType([], "array");
	var isObject = defBuiltInType({}, "object");
	var isRegExp = defBuiltInType(/./, "RegExp");
	var isDate = defBuiltInType(new Date, "Date");
	var isNumber = defBuiltInType(3, "number");
	var isBoolean = defBuiltInType(true, "boolean");
	var isNull = defBuiltInType(null, "null");
	var isUndefined = defBuiltInType(void 0, "undefined");
	
	// There are a number of idiomatic ways of expressing types, so this
	// function serves to coerce them all to actual Type objects. Note that
	// providing the name argument is not necessary in most cases.
	function toType(from, name) {
	    // The toType function should of course be idempotent.
	    if (from instanceof Type)
	        return from;
	
	    // The Def type is used as a helper for constructing compound
	    // interface types for AST nodes.
	    if (from instanceof Def)
	        return from.type;
	
	    // Support [ElemType] syntax.
	    if (isArray.check(from))
	        return Type.fromArray(from);
	
	    // Support { someField: FieldType, ... } syntax.
	    if (isObject.check(from))
	        return Type.fromObject(from);
	
	    if (isFunction.check(from)) {
	        var bicfIndex = builtInCtorFns.indexOf(from);
	        if (bicfIndex >= 0) {
	            return builtInCtorTypes[bicfIndex];
	        }
	
	        // If isFunction.check(from), and from is not a built-in
	        // constructor, assume from is a binary predicate function we can
	        // use to define the type.
	        return new Type(from, name);
	    }
	
	    // As a last resort, toType returns a type that matches any value that
	    // is === from. This is primarily useful for literal values like
	    // toType(null), but it has the additional advantage of allowing
	    // toType to be a total function.
	    return new Type(function(value) {
	        return value === from;
	    }, isUndefined.check(name) ? function() {
	        return from + "";
	    } : name);
	}
	
	// Returns a type that matches the given value iff any of type1, type2,
	// etc. match the value.
	Type.or = function(/* type1, type2, ... */) {
	    var types = [];
	    var len = arguments.length;
	    for (var i = 0; i < len; ++i)
	        types.push(toType(arguments[i]));
	
	    return new Type(function(value, deep) {
	        for (var i = 0; i < len; ++i)
	            if (types[i].check(value, deep))
	                return true;
	        return false;
	    }, function() {
	        return types.join(" | ");
	    });
	};
	
	Type.fromArray = function(arr) {
	    if (!isArray.check(arr)) {
	        throw new Error("");
	    }
	    if (arr.length !== 1) {
	        throw new Error("only one element type is permitted for typed arrays");
	    }
	    return toType(arr[0]).arrayOf();
	};
	
	Tp.arrayOf = function() {
	    var elemType = this;
	    return new Type(function(value, deep) {
	        return isArray.check(value) && value.every(function(elem) {
	            return elemType.check(elem, deep);
	        });
	    }, function() {
	        return "[" + elemType + "]";
	    });
	};
	
	Type.fromObject = function(obj) {
	    var fields = Object.keys(obj).map(function(name) {
	        return new Field(name, obj[name]);
	    });
	
	    return new Type(function(value, deep) {
	        return isObject.check(value) && fields.every(function(field) {
	            return field.type.check(value[field.name], deep);
	        });
	    }, function() {
	        return "{ " + fields.join(", ") + " }";
	    });
	};
	
	function Field(name, type, defaultFn, hidden) {
	    var self = this;
	
	    if (!(self instanceof Field)) {
	        throw new Error("Field constructor cannot be invoked without 'new'");
	    }
	    isString.assert(name);
	
	    type = toType(type);
	
	    var properties = {
	        name: { value: name },
	        type: { value: type },
	        hidden: { value: !!hidden }
	    };
	
	    if (isFunction.check(defaultFn)) {
	        properties.defaultFn = { value: defaultFn };
	    }
	
	    Object.defineProperties(self, properties);
	}
	
	var Fp = Field.prototype;
	
	Fp.toString = function() {
	    return JSON.stringify(this.name) + ": " + this.type;
	};
	
	Fp.getValue = function(obj) {
	    var value = obj[this.name];
	
	    if (!isUndefined.check(value))
	        return value;
	
	    if (this.defaultFn)
	        value = this.defaultFn.call(obj);
	
	    return value;
	};
	
	// Define a type whose name is registered in a namespace (the defCache) so
	// that future definitions will return the same type given the same name.
	// In particular, this system allows for circular and forward definitions.
	// The Def object d returned from Type.def may be used to configure the
	// type d.type by calling methods such as d.bases, d.build, and d.field.
	Type.def = function(typeName) {
	    isString.assert(typeName);
	    return hasOwn.call(defCache, typeName)
	        ? defCache[typeName]
	        : defCache[typeName] = new Def(typeName);
	};
	
	// In order to return the same Def instance every time Type.def is called
	// with a particular name, those instances need to be stored in a cache.
	var defCache = Object.create(null);
	
	function Def(typeName) {
	    var self = this;
	    if (!(self instanceof Def)) {
	        throw new Error("Def constructor cannot be invoked without 'new'");
	    }
	
	    Object.defineProperties(self, {
	        typeName: { value: typeName },
	        baseNames: { value: [] },
	        ownFields: { value: Object.create(null) },
	
	        // These two are populated during finalization.
	        allSupertypes: { value: Object.create(null) }, // Includes own typeName.
	        supertypeList: { value: [] }, // Linear inheritance hierarchy.
	        allFields: { value: Object.create(null) }, // Includes inherited fields.
	        fieldNames: { value: [] }, // Non-hidden keys of allFields.
	
	        type: {
	            value: new Type(function(value, deep) {
	                return self.check(value, deep);
	            }, typeName)
	        }
	    });
	}
	
	Def.fromValue = function(value) {
	    if (value && typeof value === "object") {
	        var type = value.type;
	        if (typeof type === "string" &&
	            hasOwn.call(defCache, type)) {
	            var d = defCache[type];
	            if (d.finalized) {
	                return d;
	            }
	        }
	    }
	
	    return null;
	};
	
	var Dp = Def.prototype;
	
	Dp.isSupertypeOf = function(that) {
	    if (that instanceof Def) {
	        if (this.finalized !== true ||
	            that.finalized !== true) {
	            throw new Error("");
	        }
	        return hasOwn.call(that.allSupertypes, this.typeName);
	    } else {
	        throw new Error(that + " is not a Def");
	    }
	};
	
	// Note that the list returned by this function is a copy of the internal
	// supertypeList, *without* the typeName itself as the first element.
	exports.getSupertypeNames = function(typeName) {
	    if (!hasOwn.call(defCache, typeName)) {
	        throw new Error("");
	    }
	    var d = defCache[typeName];
	    if (d.finalized !== true) {
	        throw new Error("");
	    }
	    return d.supertypeList.slice(1);
	};
	
	// Returns an object mapping from every known type in the defCache to the
	// most specific supertype whose name is an own property of the candidates
	// object.
	exports.computeSupertypeLookupTable = function(candidates) {
	    var table = {};
	    var typeNames = Object.keys(defCache);
	    var typeNameCount = typeNames.length;
	
	    for (var i = 0; i < typeNameCount; ++i) {
	        var typeName = typeNames[i];
	        var d = defCache[typeName];
	        if (d.finalized !== true) {
	            throw new Error("" + typeName);
	        }
	        for (var j = 0; j < d.supertypeList.length; ++j) {
	            var superTypeName = d.supertypeList[j];
	            if (hasOwn.call(candidates, superTypeName)) {
	                table[typeName] = superTypeName;
	                break;
	            }
	        }
	    }
	
	    return table;
	};
	
	Dp.checkAllFields = function(value, deep) {
	    var allFields = this.allFields;
	    if (this.finalized !== true) {
	        throw new Error("" + this.typeName);
	    }
	
	    function checkFieldByName(name) {
	        var field = allFields[name];
	        var type = field.type;
	        var child = field.getValue(value);
	        return type.check(child, deep);
	    }
	
	    return isObject.check(value)
	        && Object.keys(allFields).every(checkFieldByName);
	};
	
	Dp.check = function(value, deep) {
	    if (this.finalized !== true) {
	        throw new Error(
	            "prematurely checking unfinalized type " + this.typeName
	        );
	    }
	
	    // A Def type can only match an object value.
	    if (!isObject.check(value))
	        return false;
	
	    var vDef = Def.fromValue(value);
	    if (!vDef) {
	        // If we couldn't infer the Def associated with the given value,
	        // and we expected it to be a SourceLocation or a Position, it was
	        // probably just missing a "type" field (because Esprima does not
	        // assign a type property to such nodes). Be optimistic and let
	        // this.checkAllFields make the final decision.
	        if (this.typeName === "SourceLocation" ||
	            this.typeName === "Position") {
	            return this.checkAllFields(value, deep);
	        }
	
	        // Calling this.checkAllFields for any other type of node is both
	        // bad for performance and way too forgiving.
	        return false;
	    }
	
	    // If checking deeply and vDef === this, then we only need to call
	    // checkAllFields once. Calling checkAllFields is too strict when deep
	    // is false, because then we only care about this.isSupertypeOf(vDef).
	    if (deep && vDef === this)
	        return this.checkAllFields(value, deep);
	
	    // In most cases we rely exclusively on isSupertypeOf to make O(1)
	    // subtyping determinations. This suffices in most situations outside
	    // of unit tests, since interface conformance is checked whenever new
	    // instances are created using builder functions.
	    if (!this.isSupertypeOf(vDef))
	        return false;
	
	    // The exception is when deep is true; then, we recursively check all
	    // fields.
	    if (!deep)
	        return true;
	
	    // Use the more specific Def (vDef) to perform the deep check, but
	    // shallow-check fields defined by the less specific Def (this).
	    return vDef.checkAllFields(value, deep)
	        && this.checkAllFields(value, false);
	};
	
	Dp.bases = function() {
	    var args = slice.call(arguments);
	    var bases = this.baseNames;
	
	    if (this.finalized) {
	        if (args.length !== bases.length) {
	            throw new Error("");
	        }
	        for (var i = 0; i < args.length; i++) {
	            if (args[i] !== bases[i]) {
	                throw new Error("");
	            }
	        }
	        return this;
	    }
	
	    args.forEach(function(baseName) {
	        isString.assert(baseName);
	
	        // This indexOf lookup may be O(n), but the typical number of base
	        // names is very small, and indexOf is a native Array method.
	        if (bases.indexOf(baseName) < 0)
	            bases.push(baseName);
	    });
	
	    return this; // For chaining.
	};
	
	// False by default until .build(...) is called on an instance.
	Object.defineProperty(Dp, "buildable", { value: false });
	
	var builders = {};
	exports.builders = builders;
	
	// This object is used as prototype for any node created by a builder.
	var nodePrototype = {};
	
	// Call this function to define a new method to be shared by all AST
	// nodes. The replaced method (if any) is returned for easy wrapping.
	exports.defineMethod = function(name, func) {
	    var old = nodePrototype[name];
	
	    // Pass undefined as func to delete nodePrototype[name].
	    if (isUndefined.check(func)) {
	        delete nodePrototype[name];
	
	    } else {
	        isFunction.assert(func);
	
	        Object.defineProperty(nodePrototype, name, {
	            enumerable: true, // For discoverability.
	            configurable: true, // For delete proto[name].
	            value: func
	        });
	    }
	
	    return old;
	};
	
	var isArrayOfString = isString.arrayOf();
	
	// Calling the .build method of a Def simultaneously marks the type as
	// buildable (by defining builders[getBuilderName(typeName)]) and
	// specifies the order of arguments that should be passed to the builder
	// function to create an instance of the type.
	Dp.build = function(/* param1, param2, ... */) {
	    var self = this;
	
	    var newBuildParams = slice.call(arguments);
	    isArrayOfString.assert(newBuildParams);
	
	    // Calling Def.prototype.build multiple times has the effect of merely
	    // redefining this property.
	    Object.defineProperty(self, "buildParams", {
	        value: newBuildParams,
	        writable: false,
	        enumerable: false,
	        configurable: true
	    });
	
	    if (self.buildable) {
	        // If this Def is already buildable, update self.buildParams and
	        // continue using the old builder function.
	        return self;
	    }
	
	    // Every buildable type will have its "type" field filled in
	    // automatically. This includes types that are not subtypes of Node,
	    // like SourceLocation, but that seems harmless (TODO?).
	    self.field("type", String, function() { return self.typeName });
	
	    // Override Dp.buildable for this Def instance.
	    Object.defineProperty(self, "buildable", { value: true });
	
	    Object.defineProperty(builders, getBuilderName(self.typeName), {
	        enumerable: true,
	
	        value: function() {
	            var args = arguments;
	            var argc = args.length;
	            var built = Object.create(nodePrototype);
	
	            if (!self.finalized) {
	                throw new Error(
	                    "attempting to instantiate unfinalized type " +
	                        self.typeName
	                );
	            }
	
	            function add(param, i) {
	                if (hasOwn.call(built, param))
	                    return;
	
	                var all = self.allFields;
	                if (!hasOwn.call(all, param)) {
	                    throw new Error("" + param);
	                }
	
	                var field = all[param];
	                var type = field.type;
	                var value;
	
	                if (isNumber.check(i) && i < argc) {
	                    value = args[i];
	                } else if (field.defaultFn) {
	                    // Expose the partially-built object to the default
	                    // function as its `this` object.
	                    value = field.defaultFn.call(built);
	                } else {
	                    var message = "no value or default function given for field " +
	                        JSON.stringify(param) + " of " + self.typeName + "(" +
	                            self.buildParams.map(function(name) {
	                                return all[name];
	                            }).join(", ") + ")";
	                    throw new Error(message);
	                }
	
	                if (!type.check(value)) {
	                    throw new Error(
	                        shallowStringify(value) +
	                            " does not match field " + field +
	                            " of type " + self.typeName
	                    );
	                }
	
	                // TODO Could attach getters and setters here to enforce
	                // dynamic type safety.
	                built[param] = value;
	            }
	
	            self.buildParams.forEach(function(param, i) {
	                add(param, i);
	            });
	
	            Object.keys(self.allFields).forEach(function(param) {
	                add(param); // Use the default value.
	            });
	
	            // Make sure that the "type" field was filled automatically.
	            if (built.type !== self.typeName) {
	                throw new Error("");
	            }
	
	            return built;
	        }
	    });
	
	    return self; // For chaining.
	};
	
	function getBuilderName(typeName) {
	    return typeName.replace(/^[A-Z]+/, function(upperCasePrefix) {
	        var len = upperCasePrefix.length;
	        switch (len) {
	        case 0: return "";
	        // If there's only one initial capital letter, just lower-case it.
	        case 1: return upperCasePrefix.toLowerCase();
	        default:
	            // If there's more than one initial capital letter, lower-case
	            // all but the last one, so that XMLDefaultDeclaration (for
	            // example) becomes xmlDefaultDeclaration.
	            return upperCasePrefix.slice(
	                0, len - 1).toLowerCase() +
	                upperCasePrefix.charAt(len - 1);
	        }
	    });
	}
	exports.getBuilderName = getBuilderName;
	
	function getStatementBuilderName(typeName) {
	    typeName = getBuilderName(typeName);
	    return typeName.replace(/(Expression)?$/, "Statement");
	}
	exports.getStatementBuilderName = getStatementBuilderName;
	
	// The reason fields are specified using .field(...) instead of an object
	// literal syntax is somewhat subtle: the object literal syntax would
	// support only one key and one value, but with .field(...) we can pass
	// any number of arguments to specify the field.
	Dp.field = function(name, type, defaultFn, hidden) {
	    if (this.finalized) {
	        console.error("Ignoring attempt to redefine field " +
	                      JSON.stringify(name) + " of finalized type " +
	                      JSON.stringify(this.typeName));
	        return this;
	    }
	    this.ownFields[name] = new Field(name, type, defaultFn, hidden);
	    return this; // For chaining.
	};
	
	var namedTypes = {};
	exports.namedTypes = namedTypes;
	
	// Like Object.keys, but aware of what fields each AST type should have.
	function getFieldNames(object) {
	    var d = Def.fromValue(object);
	    if (d) {
	        return d.fieldNames.slice(0);
	    }
	
	    if ("type" in object) {
	        throw new Error(
	            "did not recognize object of type " +
	                JSON.stringify(object.type)
	        );
	    }
	
	    return Object.keys(object);
	}
	exports.getFieldNames = getFieldNames;
	
	// Get the value of an object property, taking object.type and default
	// functions into account.
	function getFieldValue(object, fieldName) {
	    var d = Def.fromValue(object);
	    if (d) {
	        var field = d.allFields[fieldName];
	        if (field) {
	            return field.getValue(object);
	        }
	    }
	
	    return object[fieldName];
	}
	exports.getFieldValue = getFieldValue;
	
	// Iterate over all defined fields of an object, including those missing
	// or undefined, passing each field name and effective value (as returned
	// by getFieldValue) to the callback. If the object has no corresponding
	// Def, the callback will never be called.
	exports.eachField = function(object, callback, context) {
	    getFieldNames(object).forEach(function(name) {
	        callback.call(this, name, getFieldValue(object, name));
	    }, context);
	};
	
	// Similar to eachField, except that iteration stops as soon as the
	// callback returns a truthy value. Like Array.prototype.some, the final
	// result is either true or false to indicates whether the callback
	// returned true for any element or not.
	exports.someField = function(object, callback, context) {
	    return getFieldNames(object).some(function(name) {
	        return callback.call(this, name, getFieldValue(object, name));
	    }, context);
	};
	
	// This property will be overridden as true by individual Def instances
	// when they are finalized.
	Object.defineProperty(Dp, "finalized", { value: false });
	
	Dp.finalize = function() {
	    var self = this;
	
	    // It's not an error to finalize a type more than once, but only the
	    // first call to .finalize does anything.
	    if (!self.finalized) {
	        var allFields = self.allFields;
	        var allSupertypes = self.allSupertypes;
	
	        self.baseNames.forEach(function(name) {
	            var def = defCache[name];
	            if (def instanceof Def) {
	                def.finalize();
	                extend(allFields, def.allFields);
	                extend(allSupertypes, def.allSupertypes);
	            } else {
	                var message = "unknown supertype name " +
	                    JSON.stringify(name) +
	                    " for subtype " +
	                    JSON.stringify(self.typeName);
	                throw new Error(message);
	            }
	        });
	
	        // TODO Warn if fields are overridden with incompatible types.
	        extend(allFields, self.ownFields);
	        allSupertypes[self.typeName] = self;
	
	        self.fieldNames.length = 0;
	        for (var fieldName in allFields) {
	            if (hasOwn.call(allFields, fieldName) &&
	                !allFields[fieldName].hidden) {
	                self.fieldNames.push(fieldName);
	            }
	        }
	
	        // Types are exported only once they have been finalized.
	        Object.defineProperty(namedTypes, self.typeName, {
	            enumerable: true,
	            value: self.type
	        });
	
	        Object.defineProperty(self, "finalized", { value: true });
	
	        // A linearization of the inheritance hierarchy.
	        populateSupertypeList(self.typeName, self.supertypeList);
	
	        if (self.buildable && self.supertypeList.lastIndexOf("Expression") >= 0) {
	            wrapExpressionBuilderWithStatement(self.typeName);
	        }
	    }
	};
	
	// Adds an additional builder for Expression subtypes
	// that wraps the built Expression in an ExpressionStatements.
	function wrapExpressionBuilderWithStatement(typeName) {
	    var wrapperName = getStatementBuilderName(typeName);
	
	    // skip if the builder already exists
	    if (builders[wrapperName]) return;
	
	    // the builder function to wrap with builders.ExpressionStatement
	    var wrapped = builders[getBuilderName(typeName)];
	
	    // skip if there is nothing to wrap
	    if (!wrapped) return;
	
	    builders[wrapperName] = function() {
	        return builders.expressionStatement(wrapped.apply(builders, arguments));
	    };
	}
	
	function populateSupertypeList(typeName, list) {
	    list.length = 0;
	    list.push(typeName);
	
	    var lastSeen = Object.create(null);
	
	    for (var pos = 0; pos < list.length; ++pos) {
	        typeName = list[pos];
	        var d = defCache[typeName];
	        if (d.finalized !== true) {
	            throw new Error("");
	        }
	
	        // If we saw typeName earlier in the breadth-first traversal,
	        // delete the last-seen occurrence.
	        if (hasOwn.call(lastSeen, typeName)) {
	            delete list[lastSeen[typeName]];
	        }
	
	        // Record the new index of the last-seen occurrence of typeName.
	        lastSeen[typeName] = pos;
	
	        // Enqueue the base names of this type.
	        list.push.apply(list, d.baseNames);
	    }
	
	    // Compaction loop to remove array holes.
	    for (var to = 0, from = to, len = list.length; from < len; ++from) {
	        if (hasOwn.call(list, from)) {
	            list[to++] = list[from];
	        }
	    }
	
	    list.length = to;
	}
	
	function extend(into, from) {
	    Object.keys(from).forEach(function(name) {
	        into[name] = from[name];
	    });
	
	    return into;
	};
	
	exports.finalize = function() {
	    Object.keys(defCache).forEach(function(name) {
	        defCache[name].finalize();
	    });
	};


/***/ },

/***/ "./node_modules/ast-types/def/core.js":
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var Type = types.Type;
	var def = Type.def;
	var or = Type.or;
	var shared = __webpack_require__("./node_modules/ast-types/lib/shared.js");
	var defaults = shared.defaults;
	var geq = shared.geq;
	
	// Abstract supertype of all syntactic entities that are allowed to have a
	// .loc field.
	def("Printable")
	    .field("loc", or(
	        def("SourceLocation"),
	        null
	    ), defaults["null"], true);
	
	def("Node")
	    .bases("Printable")
	    .field("type", String)
	    .field("comments", or(
	        [def("Comment")],
	        null
	    ), defaults["null"], true);
	
	def("SourceLocation")
	    .build("start", "end", "source")
	    .field("start", def("Position"))
	    .field("end", def("Position"))
	    .field("source", or(String, null), defaults["null"]);
	
	def("Position")
	    .build("line", "column")
	    .field("line", geq(1))
	    .field("column", geq(0));
	
	def("File")
	    .bases("Node")
	    .build("program")
	    .field("program", def("Program"));
	
	def("Program")
	    .bases("Node")
	    .build("body")
	    .field("body", [def("Statement")]);
	
	def("Function")
	    .bases("Node")
	    .field("id", or(def("Identifier"), null), defaults["null"])
	    .field("params", [def("Pattern")])
	    .field("body", def("BlockStatement"));
	
	def("Statement").bases("Node");
	
	// The empty .build() here means that an EmptyStatement can be constructed
	// (i.e. it's not abstract) but that it needs no arguments.
	def("EmptyStatement").bases("Statement").build();
	
	def("BlockStatement")
	    .bases("Statement")
	    .build("body")
	    .field("body", [def("Statement")]);
	
	// TODO Figure out how to silently coerce Expressions to
	// ExpressionStatements where a Statement was expected.
	def("ExpressionStatement")
	    .bases("Statement")
	    .build("expression")
	    .field("expression", def("Expression"));
	
	def("IfStatement")
	    .bases("Statement")
	    .build("test", "consequent", "alternate")
	    .field("test", def("Expression"))
	    .field("consequent", def("Statement"))
	    .field("alternate", or(def("Statement"), null), defaults["null"]);
	
	def("LabeledStatement")
	    .bases("Statement")
	    .build("label", "body")
	    .field("label", def("Identifier"))
	    .field("body", def("Statement"));
	
	def("BreakStatement")
	    .bases("Statement")
	    .build("label")
	    .field("label", or(def("Identifier"), null), defaults["null"]);
	
	def("ContinueStatement")
	    .bases("Statement")
	    .build("label")
	    .field("label", or(def("Identifier"), null), defaults["null"]);
	
	def("WithStatement")
	    .bases("Statement")
	    .build("object", "body")
	    .field("object", def("Expression"))
	    .field("body", def("Statement"));
	
	def("SwitchStatement")
	    .bases("Statement")
	    .build("discriminant", "cases", "lexical")
	    .field("discriminant", def("Expression"))
	    .field("cases", [def("SwitchCase")])
	    .field("lexical", Boolean, defaults["false"]);
	
	def("ReturnStatement")
	    .bases("Statement")
	    .build("argument")
	    .field("argument", or(def("Expression"), null));
	
	def("ThrowStatement")
	    .bases("Statement")
	    .build("argument")
	    .field("argument", def("Expression"));
	
	def("TryStatement")
	    .bases("Statement")
	    .build("block", "handler", "finalizer")
	    .field("block", def("BlockStatement"))
	    .field("handler", or(def("CatchClause"), null), function() {
	        return this.handlers && this.handlers[0] || null;
	    })
	    .field("handlers", [def("CatchClause")], function() {
	        return this.handler ? [this.handler] : [];
	    }, true) // Indicates this field is hidden from eachField iteration.
	    .field("guardedHandlers", [def("CatchClause")], defaults.emptyArray)
	    .field("finalizer", or(def("BlockStatement"), null), defaults["null"]);
	
	def("CatchClause")
	    .bases("Node")
	    .build("param", "guard", "body")
	    .field("param", def("Pattern"))
	    .field("guard", or(def("Expression"), null), defaults["null"])
	    .field("body", def("BlockStatement"));
	
	def("WhileStatement")
	    .bases("Statement")
	    .build("test", "body")
	    .field("test", def("Expression"))
	    .field("body", def("Statement"));
	
	def("DoWhileStatement")
	    .bases("Statement")
	    .build("body", "test")
	    .field("body", def("Statement"))
	    .field("test", def("Expression"));
	
	def("ForStatement")
	    .bases("Statement")
	    .build("init", "test", "update", "body")
	    .field("init", or(
	        def("VariableDeclaration"),
	        def("Expression"),
	        null))
	    .field("test", or(def("Expression"), null))
	    .field("update", or(def("Expression"), null))
	    .field("body", def("Statement"));
	
	def("ForInStatement")
	    .bases("Statement")
	    .build("left", "right", "body")
	    .field("left", or(
	        def("VariableDeclaration"),
	        def("Expression")))
	    .field("right", def("Expression"))
	    .field("body", def("Statement"));
	
	def("DebuggerStatement").bases("Statement").build();
	
	def("Declaration").bases("Statement");
	
	def("FunctionDeclaration")
	    .bases("Function", "Declaration")
	    .build("id", "params", "body")
	    .field("id", def("Identifier"));
	
	def("FunctionExpression")
	    .bases("Function", "Expression")
	    .build("id", "params", "body");
	
	def("VariableDeclaration")
	    .bases("Declaration")
	    .build("kind", "declarations")
	    .field("kind", or("var", "let", "const"))
	    .field("declarations", [def("VariableDeclarator")]);
	
	def("VariableDeclarator")
	    .bases("Node")
	    .build("id", "init")
	    .field("id", def("Pattern"))
	    .field("init", or(def("Expression"), null));
	
	// TODO Are all Expressions really Patterns?
	def("Expression").bases("Node", "Pattern");
	
	def("ThisExpression").bases("Expression").build();
	
	def("ArrayExpression")
	    .bases("Expression")
	    .build("elements")
	    .field("elements", [or(def("Expression"), null)]);
	
	def("ObjectExpression")
	    .bases("Expression")
	    .build("properties")
	    .field("properties", [def("Property")]);
	
	// TODO Not in the Mozilla Parser API, but used by Esprima.
	def("Property")
	    .bases("Node") // Want to be able to visit Property Nodes.
	    .build("kind", "key", "value")
	    .field("kind", or("init", "get", "set"))
	    .field("key", or(def("Literal"), def("Identifier")))
	    .field("value", def("Expression"));
	
	def("SequenceExpression")
	    .bases("Expression")
	    .build("expressions")
	    .field("expressions", [def("Expression")]);
	
	var UnaryOperator = or(
	    "-", "+", "!", "~",
	    "typeof", "void", "delete");
	
	def("UnaryExpression")
	    .bases("Expression")
	    .build("operator", "argument", "prefix")
	    .field("operator", UnaryOperator)
	    .field("argument", def("Expression"))
	    // Esprima doesn't bother with this field, presumably because it's
	    // always true for unary operators.
	    .field("prefix", Boolean, defaults["true"]);
	
	var BinaryOperator = or(
	    "==", "!=", "===", "!==",
	    "<", "<=", ">", ">=",
	    "<<", ">>", ">>>",
	    "+", "-", "*", "/", "%",
	    "&", // TODO Missing from the Parser API.
	    "|", "^", "in",
	    "instanceof", "..");
	
	def("BinaryExpression")
	    .bases("Expression")
	    .build("operator", "left", "right")
	    .field("operator", BinaryOperator)
	    .field("left", def("Expression"))
	    .field("right", def("Expression"));
	
	var AssignmentOperator = or(
	    "=", "+=", "-=", "*=", "/=", "%=",
	    "<<=", ">>=", ">>>=",
	    "|=", "^=", "&=");
	
	def("AssignmentExpression")
	    .bases("Expression")
	    .build("operator", "left", "right")
	    .field("operator", AssignmentOperator)
	    .field("left", def("Pattern"))
	    .field("right", def("Expression"));
	
	var UpdateOperator = or("++", "--");
	
	def("UpdateExpression")
	    .bases("Expression")
	    .build("operator", "argument", "prefix")
	    .field("operator", UpdateOperator)
	    .field("argument", def("Expression"))
	    .field("prefix", Boolean);
	
	var LogicalOperator = or("||", "&&");
	
	def("LogicalExpression")
	    .bases("Expression")
	    .build("operator", "left", "right")
	    .field("operator", LogicalOperator)
	    .field("left", def("Expression"))
	    .field("right", def("Expression"));
	
	def("ConditionalExpression")
	    .bases("Expression")
	    .build("test", "consequent", "alternate")
	    .field("test", def("Expression"))
	    .field("consequent", def("Expression"))
	    .field("alternate", def("Expression"));
	
	def("NewExpression")
	    .bases("Expression")
	    .build("callee", "arguments")
	    .field("callee", def("Expression"))
	    // The Mozilla Parser API gives this type as [or(def("Expression"),
	    // null)], but null values don't really make sense at the call site.
	    // TODO Report this nonsense.
	    .field("arguments", [def("Expression")]);
	
	def("CallExpression")
	    .bases("Expression")
	    .build("callee", "arguments")
	    .field("callee", def("Expression"))
	    // See comment for NewExpression above.
	    .field("arguments", [def("Expression")]);
	
	def("MemberExpression")
	    .bases("Expression")
	    .build("object", "property", "computed")
	    .field("object", def("Expression"))
	    .field("property", or(def("Identifier"), def("Expression")))
	    .field("computed", Boolean, function(){
	        var type = this.property.type;
	        if (type === 'Literal' ||
	            type === 'MemberExpression' ||
	            type === 'BinaryExpression') {
	            return true;
	        }
	        return false;
	    });
	
	def("Pattern").bases("Node");
	
	def("SwitchCase")
	    .bases("Node")
	    .build("test", "consequent")
	    .field("test", or(def("Expression"), null))
	    .field("consequent", [def("Statement")]);
	
	def("Identifier")
	    // But aren't Expressions and Patterns already Nodes? TODO Report this.
	    .bases("Node", "Expression", "Pattern")
	    .build("name")
	    .field("name", String);
	
	def("Literal")
	    // But aren't Expressions already Nodes? TODO Report this.
	    .bases("Node", "Expression")
	    .build("value")
	    .field("value", or(String, Boolean, null, Number, RegExp))
	    .field("regex", or({
	        pattern: String,
	        flags: String
	    }, null), function() {
	        if (this.value instanceof RegExp) {
	            var flags = "";
	
	            if (this.value.ignoreCase) flags += "i";
	            if (this.value.multiline) flags += "m";
	            if (this.value.global) flags += "g";
	
	            return {
	                pattern: this.value.source,
	                flags: flags
	            };
	        }
	
	        return null;
	    });
	
	// Abstract (non-buildable) comment supertype. Not a Node.
	def("Comment")
	    .bases("Printable")
	    .field("value", String)
	    // A .leading comment comes before the node, whereas a .trailing
	    // comment comes after it. These two fields should not both be true,
	    // but they might both be false when the comment falls inside a node
	    // and the node has no children for the comment to lead or trail,
	    // e.g. { /*dangling*/ }.
	    .field("leading", Boolean, defaults["true"])
	    .field("trailing", Boolean, defaults["false"]);


/***/ },

/***/ "./node_modules/ast-types/lib/shared.js":
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var Type = types.Type;
	var builtin = types.builtInTypes;
	var isNumber = builtin.number;
	
	// An example of constructing a new type with arbitrary constraints from
	// an existing type.
	exports.geq = function(than) {
	    return new Type(function(value) {
	        return isNumber.check(value) && value >= than;
	    }, isNumber + " >= " + than);
	};
	
	// Default value-returning functions that may optionally be passed as a
	// third argument to Def.prototype.field.
	exports.defaults = {
	    // Functions were used because (among other reasons) that's the most
	    // elegant way to allow for the emptyArray one always to give a new
	    // array instance.
	    "null": function() { return null },
	    "emptyArray": function() { return [] },
	    "false": function() { return false },
	    "true": function() { return true },
	    "undefined": function() {}
	};
	
	var naiveIsPrimitive = Type.or(
	    builtin.string,
	    builtin.number,
	    builtin.boolean,
	    builtin.null,
	    builtin.undefined
	);
	
	exports.isPrimitive = new Type(function(value) {
	    if (value === null)
	        return true;
	    var type = typeof value;
	    return !(type === "object" ||
	             type === "function");
	}, naiveIsPrimitive.toString());


/***/ },

/***/ "./node_modules/ast-types/def/es6.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/ast-types/def/core.js");
	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var def = types.Type.def;
	var or = types.Type.or;
	var defaults = __webpack_require__("./node_modules/ast-types/lib/shared.js").defaults;
	
	def("Function")
	    .field("generator", Boolean, defaults["false"])
	    .field("expression", Boolean, defaults["false"])
	    .field("defaults", [or(def("Expression"), null)], defaults.emptyArray)
	    // TODO This could be represented as a RestElement in .params.
	    .field("rest", or(def("Identifier"), null), defaults["null"]);
	
	// The ESTree way of representing a ...rest parameter.
	def("RestElement")
	    .bases("Pattern")
	    .build("argument")
	    .field("argument", def("Pattern"));
	
	def("SpreadElementPattern")
	    .bases("Pattern")
	    .build("argument")
	    .field("argument", def("Pattern"));
	
	def("FunctionDeclaration")
	    .build("id", "params", "body", "generator", "expression");
	
	def("FunctionExpression")
	    .build("id", "params", "body", "generator", "expression");
	
	// The Parser API calls this ArrowExpression, but Esprima and all other
	// actual parsers use ArrowFunctionExpression.
	def("ArrowFunctionExpression")
	    .bases("Function", "Expression")
	    .build("params", "body", "expression")
	    // The forced null value here is compatible with the overridden
	    // definition of the "id" field in the Function interface.
	    .field("id", null, defaults["null"])
	    // Arrow function bodies are allowed to be expressions.
	    .field("body", or(def("BlockStatement"), def("Expression")))
	    // The current spec forbids arrow generators, so I have taken the
	    // liberty of enforcing that. TODO Report this.
	    .field("generator", false, defaults["false"]);
	
	def("YieldExpression")
	    .bases("Expression")
	    .build("argument", "delegate")
	    .field("argument", or(def("Expression"), null))
	    .field("delegate", Boolean, defaults["false"]);
	
	def("GeneratorExpression")
	    .bases("Expression")
	    .build("body", "blocks", "filter")
	    .field("body", def("Expression"))
	    .field("blocks", [def("ComprehensionBlock")])
	    .field("filter", or(def("Expression"), null));
	
	def("ComprehensionExpression")
	    .bases("Expression")
	    .build("body", "blocks", "filter")
	    .field("body", def("Expression"))
	    .field("blocks", [def("ComprehensionBlock")])
	    .field("filter", or(def("Expression"), null));
	
	def("ComprehensionBlock")
	    .bases("Node")
	    .build("left", "right", "each")
	    .field("left", def("Pattern"))
	    .field("right", def("Expression"))
	    .field("each", Boolean);
	
	def("Property")
	    .field("key", or(def("Literal"), def("Identifier"), def("Expression")))
	    .field("value", or(def("Expression"), def("Pattern")))
	    .field("method", Boolean, defaults["false"])
	    .field("shorthand", Boolean, defaults["false"])
	    .field("computed", Boolean, defaults["false"]);
	
	def("PropertyPattern")
	    .bases("Pattern")
	    .build("key", "pattern")
	    .field("key", or(def("Literal"), def("Identifier"), def("Expression")))
	    .field("pattern", def("Pattern"))
	    .field("computed", Boolean, defaults["false"]);
	
	def("ObjectPattern")
	    .bases("Pattern")
	    .build("properties")
	    .field("properties", [or(def("PropertyPattern"), def("Property"))]);
	
	def("ArrayPattern")
	    .bases("Pattern")
	    .build("elements")
	    .field("elements", [or(def("Pattern"), null)]);
	
	def("MethodDefinition")
	    .bases("Declaration")
	    .build("kind", "key", "value", "static")
	    .field("kind", or("constructor", "method", "get", "set"))
	    .field("key", or(def("Literal"), def("Identifier"), def("Expression")))
	    .field("value", def("Function"))
	    .field("computed", Boolean, defaults["false"])
	    .field("static", Boolean, defaults["false"]);
	
	def("SpreadElement")
	    .bases("Node")
	    .build("argument")
	    .field("argument", def("Expression"));
	
	def("ArrayExpression")
	    .field("elements", [or(
	        def("Expression"),
	        def("SpreadElement"),
	        def("RestElement"),
	        null
	    )]);
	
	def("NewExpression")
	    .field("arguments", [or(def("Expression"), def("SpreadElement"))]);
	
	def("CallExpression")
	    .field("arguments", [or(def("Expression"), def("SpreadElement"))]);
	
	// Note: this node type is *not* an AssignmentExpression with a Pattern on
	// the left-hand side! The existing AssignmentExpression type already
	// supports destructuring assignments. AssignmentPattern nodes may appear
	// wherever a Pattern is allowed, and the right-hand side represents a
	// default value to be destructured against the left-hand side, if no
	// value is otherwise provided. For example: default parameter values.
	def("AssignmentPattern")
	    .bases("Pattern")
	    .build("left", "right")
	    .field("left", def("Pattern"))
	    .field("right", def("Expression"));
	
	var ClassBodyElement = or(
	    def("MethodDefinition"),
	    def("VariableDeclarator"),
	    def("ClassPropertyDefinition"),
	    def("ClassProperty")
	);
	
	def("ClassProperty")
	  .bases("Declaration")
	  .build("key")
	  .field("key", or(def("Literal"), def("Identifier"), def("Expression")))
	  .field("computed", Boolean, defaults["false"]);
	
	def("ClassPropertyDefinition") // static property
	    .bases("Declaration")
	    .build("definition")
	    // Yes, Virginia, circular definitions are permitted.
	    .field("definition", ClassBodyElement);
	
	def("ClassBody")
	    .bases("Declaration")
	    .build("body")
	    .field("body", [ClassBodyElement]);
	
	def("ClassDeclaration")
	    .bases("Declaration")
	    .build("id", "body", "superClass")
	    .field("id", or(def("Identifier"), null))
	    .field("body", def("ClassBody"))
	    .field("superClass", or(def("Expression"), null), defaults["null"]);
	
	def("ClassExpression")
	    .bases("Expression")
	    .build("id", "body", "superClass")
	    .field("id", or(def("Identifier"), null), defaults["null"])
	    .field("body", def("ClassBody"))
	    .field("superClass", or(def("Expression"), null), defaults["null"])
	    .field("implements", [def("ClassImplements")], defaults.emptyArray);
	
	def("ClassImplements")
	    .bases("Node")
	    .build("id")
	    .field("id", def("Identifier"))
	    .field("superClass", or(def("Expression"), null), defaults["null"]);
	
	// Specifier and ModuleSpecifier are abstract non-standard types
	// introduced for definitional convenience.
	def("Specifier").bases("Node");
	
	// This supertype is shared/abused by both def/babel.js and
	// def/esprima.js. In the future, it will be possible to load only one set
	// of definitions appropriate for a given parser, but until then we must
	// rely on default functions to reconcile the conflicting AST formats.
	def("ModuleSpecifier")
	    .bases("Specifier")
	    // This local field is used by Babel/Acorn. It should not technically
	    // be optional in the Babel/Acorn AST format, but it must be optional
	    // in the Esprima AST format.
	    .field("local", or(def("Identifier"), null), defaults["null"])
	    // The id and name fields are used by Esprima. The id field should not
	    // technically be optional in the Esprima AST format, but it must be
	    // optional in the Babel/Acorn AST format.
	    .field("id", or(def("Identifier"), null), defaults["null"])
	    .field("name", or(def("Identifier"), null), defaults["null"]);
	
	def("TaggedTemplateExpression")
	    .bases("Expression")
	    .build("tag", "quasi")
	    .field("tag", def("Expression"))
	    .field("quasi", def("TemplateLiteral"));
	
	def("TemplateLiteral")
	    .bases("Expression")
	    .build("quasis", "expressions")
	    .field("quasis", [def("TemplateElement")])
	    .field("expressions", [def("Expression")]);
	
	def("TemplateElement")
	    .bases("Node")
	    .build("value", "tail")
	    .field("value", {"cooked": String, "raw": String})
	    .field("tail", Boolean);


/***/ },

/***/ "./node_modules/ast-types/def/es7.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/ast-types/def/es6.js");
	
	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var def = types.Type.def;
	var or = types.Type.or;
	var builtin = types.builtInTypes;
	var defaults = __webpack_require__("./node_modules/ast-types/lib/shared.js").defaults;
	
	def("Function")
	    .field("async", Boolean, defaults["false"]);
	
	def("SpreadProperty")
	    .bases("Node")
	    .build("argument")
	    .field("argument", def("Expression"));
	
	def("ObjectExpression")
	    .field("properties", [or(def("Property"), def("SpreadProperty"))]);
	
	def("SpreadPropertyPattern")
	    .bases("Pattern")
	    .build("argument")
	    .field("argument", def("Pattern"));
	
	def("ObjectPattern")
	    .field("properties", [or(
	        def("Property"),
	        def("PropertyPattern"),
	        def("SpreadPropertyPattern")
	    )]);
	
	def("AwaitExpression")
	    .bases("Expression")
	    .build("argument", "all")
	    .field("argument", or(def("Expression"), null))
	    .field("all", Boolean, defaults["false"]);


/***/ },

/***/ "./node_modules/ast-types/def/mozilla.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/ast-types/def/core.js");
	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var def = types.Type.def;
	var or = types.Type.or;
	var shared = __webpack_require__("./node_modules/ast-types/lib/shared.js");
	var geq = shared.geq;
	var defaults = shared.defaults;
	
	def("Function")
	    // SpiderMonkey allows expression closures: function(x) x+1
	    .field("body", or(def("BlockStatement"), def("Expression")));
	
	def("ForInStatement")
	    .build("left", "right", "body", "each")
	    .field("each", Boolean, defaults["false"]);
	
	def("ForOfStatement")
	    .bases("Statement")
	    .build("left", "right", "body")
	    .field("left", or(
	        def("VariableDeclaration"),
	        def("Expression")))
	    .field("right", def("Expression"))
	    .field("body", def("Statement"));
	
	def("LetStatement")
	    .bases("Statement")
	    .build("head", "body")
	    // TODO Deviating from the spec by reusing VariableDeclarator here.
	    .field("head", [def("VariableDeclarator")])
	    .field("body", def("Statement"));
	
	def("LetExpression")
	    .bases("Expression")
	    .build("head", "body")
	    // TODO Deviating from the spec by reusing VariableDeclarator here.
	    .field("head", [def("VariableDeclarator")])
	    .field("body", def("Expression"));
	
	def("GraphExpression")
	    .bases("Expression")
	    .build("index", "expression")
	    .field("index", geq(0))
	    .field("expression", def("Literal"));
	
	def("GraphIndexExpression")
	    .bases("Expression")
	    .build("index")
	    .field("index", geq(0));


/***/ },

/***/ "./node_modules/ast-types/def/e4x.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/ast-types/def/core.js");
	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var def = types.Type.def;
	var or = types.Type.or;
	
	// Note that none of these types are buildable because the Mozilla Parser
	// API doesn't specify any builder functions, and nobody uses E4X anymore.
	
	def("XMLDefaultDeclaration")
	    .bases("Declaration")
	    .field("namespace", def("Expression"));
	
	def("XMLAnyName").bases("Expression");
	
	def("XMLQualifiedIdentifier")
	    .bases("Expression")
	    .field("left", or(def("Identifier"), def("XMLAnyName")))
	    .field("right", or(def("Identifier"), def("Expression")))
	    .field("computed", Boolean);
	
	def("XMLFunctionQualifiedIdentifier")
	    .bases("Expression")
	    .field("right", or(def("Identifier"), def("Expression")))
	    .field("computed", Boolean);
	
	def("XMLAttributeSelector")
	    .bases("Expression")
	    .field("attribute", def("Expression"));
	
	def("XMLFilterExpression")
	    .bases("Expression")
	    .field("left", def("Expression"))
	    .field("right", def("Expression"));
	
	def("XMLElement")
	    .bases("XML", "Expression")
	    .field("contents", [def("XML")]);
	
	def("XMLList")
	    .bases("XML", "Expression")
	    .field("contents", [def("XML")]);
	
	def("XML").bases("Node");
	
	def("XMLEscape")
	    .bases("XML")
	    .field("expression", def("Expression"));
	
	def("XMLText")
	    .bases("XML")
	    .field("text", String);
	
	def("XMLStartTag")
	    .bases("XML")
	    .field("contents", [def("XML")]);
	
	def("XMLEndTag")
	    .bases("XML")
	    .field("contents", [def("XML")]);
	
	def("XMLPointTag")
	    .bases("XML")
	    .field("contents", [def("XML")]);
	
	def("XMLName")
	    .bases("XML")
	    .field("contents", or(String, [def("XML")]));
	
	def("XMLAttribute")
	    .bases("XML")
	    .field("value", String);
	
	def("XMLCdata")
	    .bases("XML")
	    .field("contents", String);
	
	def("XMLComment")
	    .bases("XML")
	    .field("contents", String);
	
	def("XMLProcessingInstruction")
	    .bases("XML")
	    .field("target", String)
	    .field("contents", or(String, null));


/***/ },

/***/ "./node_modules/ast-types/def/fb-harmony.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/ast-types/def/es7.js");
	
	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var def = types.Type.def;
	var or = types.Type.or;
	var defaults = __webpack_require__("./node_modules/ast-types/lib/shared.js").defaults;
	
	def("JSXAttribute")
	    .bases("Node")
	    .build("name", "value")
	    .field("name", or(def("JSXIdentifier"), def("JSXNamespacedName")))
	    .field("value", or(
	        def("Literal"), // attr="value"
	        def("JSXExpressionContainer"), // attr={value}
	        null // attr= or just attr
	    ), defaults["null"]);
	
	def("JSXIdentifier")
	    .bases("Identifier")
	    .build("name")
	    .field("name", String);
	
	def("JSXNamespacedName")
	    .bases("Node")
	    .build("namespace", "name")
	    .field("namespace", def("JSXIdentifier"))
	    .field("name", def("JSXIdentifier"));
	
	def("JSXMemberExpression")
	    .bases("MemberExpression")
	    .build("object", "property")
	    .field("object", or(def("JSXIdentifier"), def("JSXMemberExpression")))
	    .field("property", def("JSXIdentifier"))
	    .field("computed", Boolean, defaults.false);
	
	var JSXElementName = or(
	    def("JSXIdentifier"),
	    def("JSXNamespacedName"),
	    def("JSXMemberExpression")
	);
	
	def("JSXSpreadAttribute")
	    .bases("Node")
	    .build("argument")
	    .field("argument", def("Expression"));
	
	var JSXAttributes = [or(
	    def("JSXAttribute"),
	    def("JSXSpreadAttribute")
	)];
	
	def("JSXExpressionContainer")
	    .bases("Expression")
	    .build("expression")
	    .field("expression", def("Expression"));
	
	def("JSXElement")
	    .bases("Expression")
	    .build("openingElement", "closingElement", "children")
	    .field("openingElement", def("JSXOpeningElement"))
	    .field("closingElement", or(def("JSXClosingElement"), null), defaults["null"])
	    .field("children", [or(
	        def("JSXElement"),
	        def("JSXExpressionContainer"),
	        def("JSXText"),
	        def("Literal") // TODO Esprima should return JSXText instead.
	    )], defaults.emptyArray)
	    .field("name", JSXElementName, function() {
	        // Little-known fact: the `this` object inside a default function
	        // is none other than the partially-built object itself, and any
	        // fields initialized directly from builder function arguments
	        // (like openingElement, closingElement, and children) are
	        // guaranteed to be available.
	        return this.openingElement.name;
	    }, true) // hidden from traversal
	    .field("selfClosing", Boolean, function() {
	        return this.openingElement.selfClosing;
	    }, true) // hidden from traversal
	    .field("attributes", JSXAttributes, function() {
	        return this.openingElement.attributes;
	    }, true); // hidden from traversal
	
	def("JSXOpeningElement")
	    .bases("Node") // TODO Does this make sense? Can't really be an JSXElement.
	    .build("name", "attributes", "selfClosing")
	    .field("name", JSXElementName)
	    .field("attributes", JSXAttributes, defaults.emptyArray)
	    .field("selfClosing", Boolean, defaults["false"]);
	
	def("JSXClosingElement")
	    .bases("Node") // TODO Same concern.
	    .build("name")
	    .field("name", JSXElementName);
	
	def("JSXText")
	    .bases("Literal")
	    .build("value")
	    .field("value", String);
	
	def("JSXEmptyExpression").bases("Expression").build();
	
	// Type Annotations
	def("Type").bases("Node");
	
	def("AnyTypeAnnotation")
	  .bases("Type")
	  .build();
	
	def("MixedTypeAnnotation")
	  .bases("Type")
	  .build();
	
	def("VoidTypeAnnotation")
	  .bases("Type")
	  .build();
	
	def("NumberTypeAnnotation")
	  .bases("Type")
	  .build();
	
	def("NumberLiteralTypeAnnotation")
	  .bases("Type")
	  .build("value", "raw")
	  .field("value", Number)
	  .field("raw", String);
	
	def("StringTypeAnnotation")
	  .bases("Type")
	  .build();
	
	def("StringLiteralTypeAnnotation")
	  .bases("Type")
	  .build("value", "raw")
	  .field("value", String)
	  .field("raw", String);
	
	def("BooleanTypeAnnotation")
	  .bases("Type")
	  .build();
	
	def("BooleanLiteralTypeAnnotation")
	  .bases("Type")
	  .build("value", "raw")
	  .field("value", Boolean)
	  .field("raw", String);
	
	def("TypeAnnotation")
	  .bases("Node")
	  .build("typeAnnotation")
	  .field("typeAnnotation", def("Type"));
	
	def("NullableTypeAnnotation")
	  .bases("Type")
	  .build("typeAnnotation")
	  .field("typeAnnotation", def("Type"));
	
	def("FunctionTypeAnnotation")
	  .bases("Type")
	  .build("params", "returnType", "rest", "typeParameters")
	  .field("params", [def("FunctionTypeParam")])
	  .field("returnType", def("Type"))
	  .field("rest", or(def("FunctionTypeParam"), null))
	  .field("typeParameters", or(def("TypeParameterDeclaration"), null));
	
	def("FunctionTypeParam")
	  .bases("Node")
	  .build("name", "typeAnnotation", "optional")
	  .field("name", def("Identifier"))
	  .field("typeAnnotation", def("Type"))
	  .field("optional", Boolean);
	
	def("ArrayTypeAnnotation")
	  .bases("Type")
	  .build("elementType")
	  .field("elementType", def("Type"));
	
	def("ObjectTypeAnnotation")
	  .bases("Type")
	  .build("properties")
	  .field("properties", [def("ObjectTypeProperty")])
	  .field("indexers", [def("ObjectTypeIndexer")], defaults.emptyArray)
	  .field("callProperties",
	         [def("ObjectTypeCallProperty")],
	         defaults.emptyArray);
	
	def("ObjectTypeProperty")
	  .bases("Node")
	  .build("key", "value", "optional")
	  .field("key", or(def("Literal"), def("Identifier")))
	  .field("value", def("Type"))
	  .field("optional", Boolean);
	
	def("ObjectTypeIndexer")
	  .bases("Node")
	  .build("id", "key", "value")
	  .field("id", def("Identifier"))
	  .field("key", def("Type"))
	  .field("value", def("Type"));
	
	def("ObjectTypeCallProperty")
	  .bases("Node")
	  .build("value")
	  .field("value", def("FunctionTypeAnnotation"))
	  .field("static", Boolean, false);
	
	def("QualifiedTypeIdentifier")
	  .bases("Node")
	  .build("qualification", "id")
	  .field("qualification",
	         or(def("Identifier"),
	            def("QualifiedTypeIdentifier")))
	  .field("id", def("Identifier"));
	
	def("GenericTypeAnnotation")
	  .bases("Type")
	  .build("id", "typeParameters")
	  .field("id", or(def("Identifier"), def("QualifiedTypeIdentifier")))
	  .field("typeParameters", or(def("TypeParameterInstantiation"), null));
	
	def("MemberTypeAnnotation")
	  .bases("Type")
	  .build("object", "property")
	  .field("object", def("Identifier"))
	  .field("property",
	         or(def("MemberTypeAnnotation"),
	            def("GenericTypeAnnotation")));
	
	def("UnionTypeAnnotation")
	  .bases("Type")
	  .build("types")
	  .field("types", [def("Type")]);
	
	def("IntersectionTypeAnnotation")
	  .bases("Type")
	  .build("types")
	  .field("types", [def("Type")]);
	
	def("TypeofTypeAnnotation")
	  .bases("Type")
	  .build("argument")
	  .field("argument", def("Type"));
	
	def("Identifier")
	  .field("typeAnnotation", or(def("TypeAnnotation"), null), defaults["null"]);
	
	def("TypeParameterDeclaration")
	  .bases("Node")
	  .build("params")
	  .field("params", [def("Identifier")]);
	
	def("TypeParameterInstantiation")
	  .bases("Node")
	  .build("params")
	  .field("params", [def("Type")]);
	
	def("Function")
	  .field("returnType",
	         or(def("TypeAnnotation"), null),
	         defaults["null"])
	  .field("typeParameters",
	         or(def("TypeParameterDeclaration"), null),
	         defaults["null"]);
	
	def("ClassProperty")
	  .build("key", "value", "typeAnnotation", "static")
	  .field("value", or(def("Expression"), null))
	  .field("typeAnnotation", or(def("TypeAnnotation"), null))
	  .field("static", Boolean, defaults["false"]);
	
	def("ClassImplements")
	  .field("typeParameters",
	         or(def("TypeParameterInstantiation"), null),
	         defaults["null"]);
	
	def("InterfaceDeclaration")
	  .bases("Statement")
	  .build("id", "body", "extends")
	  .field("id", def("Identifier"))
	  .field("typeParameters",
	         or(def("TypeParameterDeclaration"), null),
	         defaults["null"])
	  .field("body", def("ObjectTypeAnnotation"))
	  .field("extends", [def("InterfaceExtends")]);
	
	def("InterfaceExtends")
	  .bases("Node")
	  .build("id")
	  .field("id", def("Identifier"))
	  .field("typeParameters", or(def("TypeParameterInstantiation"), null));
	
	def("TypeAlias")
	  .bases("Declaration")
	  .build("id", "typeParameters", "right")
	  .field("id", def("Identifier"))
	  .field("typeParameters", or(def("TypeParameterDeclaration"), null))
	  .field("right", def("Type"));
	
	def("TypeCastExpression")
	  .bases("Expression")
	  .build("expression", "typeAnnotation")
	  .field("expression", def("Expression"))
	  .field("typeAnnotation", def("TypeAnnotation"));
	
	def("TupleTypeAnnotation")
	  .bases("Type")
	  .build("types")
	  .field("types", [def("Type")]);
	
	def("DeclareVariable")
	  .bases("Statement")
	  .build("id")
	  .field("id", def("Identifier"));
	
	def("DeclareFunction")
	  .bases("Statement")
	  .build("id")
	  .field("id", def("Identifier"));
	
	def("DeclareClass")
	  .bases("InterfaceDeclaration")
	  .build("id");
	
	def("DeclareModule")
	  .bases("Statement")
	  .build("id", "body")
	  .field("id", or(def("Identifier"), def("Literal")))
	  .field("body", def("BlockStatement"));
	
	def("DeclareExportDeclaration")
	    .bases("Declaration")
	    .build("default", "declaration", "specifiers", "source")
	    .field("default", Boolean)
	    .field("declaration", or(
	        def("DeclareVariable"),
	        def("DeclareFunction"),
	        def("DeclareClass"),
	        def("Type"), // Implies default.
	        null
	    ))
	    .field("specifiers", [or(
	        def("ExportSpecifier"),
	        def("ExportBatchSpecifier")
	    )], defaults.emptyArray)
	    .field("source", or(
	        def("Literal"),
	        null
	    ), defaults["null"]);


/***/ },

/***/ "./node_modules/ast-types/def/esprima.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/ast-types/def/es7.js");
	
	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var defaults = __webpack_require__("./node_modules/ast-types/lib/shared.js").defaults;
	var def = types.Type.def;
	var or = types.Type.or;
	
	def("VariableDeclaration")
	    .field("declarations", [or(
	        def("VariableDeclarator"),
	        def("Identifier") // Esprima deviation.
	    )]);
	
	def("Property")
	    .field("value", or(
	        def("Expression"),
	        def("Pattern") // Esprima deviation.
	    ));
	
	def("ArrayPattern")
	    .field("elements", [or(
	        def("Pattern"),
	        def("SpreadElement"),
	        null
	    )]);
	
	def("ObjectPattern")
	    .field("properties", [or(
	        def("Property"),
	        def("PropertyPattern"),
	        def("SpreadPropertyPattern"),
	        def("SpreadProperty") // Used by Esprima.
	    )]);
	
	// Like ModuleSpecifier, except type:"ExportSpecifier" and buildable.
	// export {<id [as name]>} [from ...];
	def("ExportSpecifier")
	    .bases("ModuleSpecifier")
	    .build("id", "name");
	
	// export <*> from ...;
	def("ExportBatchSpecifier")
	    .bases("Specifier")
	    .build();
	
	// Like ModuleSpecifier, except type:"ImportSpecifier" and buildable.
	// import {<id [as name]>} from ...;
	def("ImportSpecifier")
	    .bases("ModuleSpecifier")
	    .build("id", "name");
	
	// import <* as id> from ...;
	def("ImportNamespaceSpecifier")
	    .bases("ModuleSpecifier")
	    .build("id");
	
	// import <id> from ...;
	def("ImportDefaultSpecifier")
	    .bases("ModuleSpecifier")
	    .build("id");
	
	def("ExportDeclaration")
	    .bases("Declaration")
	    .build("default", "declaration", "specifiers", "source")
	    .field("default", Boolean)
	    .field("declaration", or(
	        def("Declaration"),
	        def("Expression"), // Implies default.
	        null
	    ))
	    .field("specifiers", [or(
	        def("ExportSpecifier"),
	        def("ExportBatchSpecifier")
	    )], defaults.emptyArray)
	    .field("source", or(
	        def("Literal"),
	        null
	    ), defaults["null"]);
	
	def("ImportDeclaration")
	    .bases("Declaration")
	    .build("specifiers", "source")
	    .field("specifiers", [or(
	        def("ImportSpecifier"),
	        def("ImportNamespaceSpecifier"),
	        def("ImportDefaultSpecifier")
	    )], defaults.emptyArray)
	    .field("source", def("Literal"));
	
	def("Block")
	    .bases("Comment")
	    .build("value", /*optional:*/ "leading", "trailing");
	
	def("Line")
	    .bases("Comment")
	    .build("value", /*optional:*/ "leading", "trailing");


/***/ },

/***/ "./node_modules/ast-types/def/babel.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/ast-types/def/es7.js");
	
	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var defaults = __webpack_require__("./node_modules/ast-types/lib/shared.js").defaults;
	var def = types.Type.def;
	var or = types.Type.or;
	
	def("Noop")
	  .bases("Node")
	  .build();
	
	def("DoExpression")
	  .bases("Expression")
	  .build("body")
	  .field("body", [def("Statement")]);
	
	def("Super")
	  .bases("Expression")
	  .build();
	
	def("BindExpression")
	  .bases("Expression")
	  .build("object", "callee")
	  .field("object", or(def("Expression"), null))
	  .field("callee", def("Expression"));
	
	def("Decorator")
	  .bases("Node")
	  .build("expression")
	  .field("expression", def("Expression"));
	
	def("Property")
	  .field("decorators",
	         or([def("Decorator")], null),
	         defaults["null"]);
	
	def("MethodDefinition")
	  .field("decorators",
	         or([def("Decorator")], null),
	         defaults["null"]);
	
	def("MetaProperty")
	  .bases("Expression")
	  .build("meta", "property")
	  .field("meta", def("Identifier"))
	  .field("property", def("Identifier"));
	
	def("ParenthesizedExpression")
	  .bases("Expression")
	  .build("expression")
	  .field("expression", def("Expression"));
	
	def("ImportSpecifier")
	  .bases("ModuleSpecifier")
	  .build("imported", "local")
	  .field("imported", def("Identifier"));
	
	def("ImportDefaultSpecifier")
	  .bases("ModuleSpecifier")
	  .build("local");
	
	def("ImportNamespaceSpecifier")
	  .bases("ModuleSpecifier")
	  .build("local");
	
	def("ExportDefaultDeclaration")
	  .bases("Declaration")
	  .build("declaration")
	  .field("declaration", or(def("Declaration"), def("Expression")));
	
	def("ExportNamedDeclaration")
	  .bases("Declaration")
	  .build("declaration", "specifiers", "source")
	  .field("declaration", or(def("Declaration"), null))
	  .field("specifiers", [def("ExportSpecifier")], defaults.emptyArray)
	  .field("source", or(def("Literal"), null), defaults["null"]);
	
	def("ExportSpecifier")
	  .bases("ModuleSpecifier")
	  .build("local", "exported")
	  .field("exported", def("Identifier"));
	
	def("ExportNamespaceSpecifier")
	  .bases("Specifier")
	  .build("exported")
	  .field("exported", def("Identifier"));
	
	def("ExportDefaultSpecifier")
	  .bases("Specifier")
	  .build("exported")
	  .field("exported", def("Identifier"));
	
	def("ExportAllDeclaration")
	  .bases("Declaration")
	  .build("exported", "source")
	  .field("exported", or(def("Identifier"), null))
	  .field("source", def("Literal"));
	
	def("CommentBlock")
	    .bases("Comment")
	    .build("value", /*optional:*/ "leading", "trailing");
	
	def("CommentLine")
	    .bases("Comment")
	    .build("value", /*optional:*/ "leading", "trailing");


/***/ },

/***/ "./node_modules/ast-types/lib/equiv.js":
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__("./node_modules/ast-types/main.js");
	var getFieldNames = types.getFieldNames;
	var getFieldValue = types.getFieldValue;
	var isArray = types.builtInTypes.array;
	var isObject = types.builtInTypes.object;
	var isDate = types.builtInTypes.Date;
	var isRegExp = types.builtInTypes.RegExp;
	var hasOwn = Object.prototype.hasOwnProperty;
	
	function astNodesAreEquivalent(a, b, problemPath) {
	    if (isArray.check(problemPath)) {
	        problemPath.length = 0;
	    } else {
	        problemPath = null;
	    }
	
	    return areEquivalent(a, b, problemPath);
	}
	
	astNodesAreEquivalent.assert = function(a, b) {
	    var problemPath = [];
	    if (!astNodesAreEquivalent(a, b, problemPath)) {
	        if (problemPath.length === 0) {
	            if (a !== b) {
	                throw new Error("Nodes must be equal");
	            }
	        } else {
	            throw new Error(
	                "Nodes differ in the following path: " +
	                    problemPath.map(subscriptForProperty).join("")
	            );
	        }
	    }
	};
	
	function subscriptForProperty(property) {
	    if (/[_$a-z][_$a-z0-9]*/i.test(property)) {
	        return "." + property;
	    }
	    return "[" + JSON.stringify(property) + "]";
	}
	
	function areEquivalent(a, b, problemPath) {
	    if (a === b) {
	        return true;
	    }
	
	    if (isArray.check(a)) {
	        return arraysAreEquivalent(a, b, problemPath);
	    }
	
	    if (isObject.check(a)) {
	        return objectsAreEquivalent(a, b, problemPath);
	    }
	
	    if (isDate.check(a)) {
	        return isDate.check(b) && (+a === +b);
	    }
	
	    if (isRegExp.check(a)) {
	        return isRegExp.check(b) && (
	            a.source === b.source &&
	            a.global === b.global &&
	            a.multiline === b.multiline &&
	            a.ignoreCase === b.ignoreCase
	        );
	    }
	
	    return a == b;
	}
	
	function arraysAreEquivalent(a, b, problemPath) {
	    isArray.assert(a);
	    var aLength = a.length;
	
	    if (!isArray.check(b) || b.length !== aLength) {
	        if (problemPath) {
	            problemPath.push("length");
	        }
	        return false;
	    }
	
	    for (var i = 0; i < aLength; ++i) {
	        if (problemPath) {
	            problemPath.push(i);
	        }
	
	        if (i in a !== i in b) {
	            return false;
	        }
	
	        if (!areEquivalent(a[i], b[i], problemPath)) {
	            return false;
	        }
	
	        if (problemPath) {
	            var problemPathTail = problemPath.pop();
	            if (problemPathTail !== i) {
	                throw new Error("" + problemPathTail);
	            }
	        }
	    }
	
	    return true;
	}
	
	function objectsAreEquivalent(a, b, problemPath) {
	    isObject.assert(a);
	    if (!isObject.check(b)) {
	        return false;
	    }
	
	    // Fast path for a common property of AST nodes.
	    if (a.type !== b.type) {
	        if (problemPath) {
	            problemPath.push("type");
	        }
	        return false;
	    }
	
	    var aNames = getFieldNames(a);
	    var aNameCount = aNames.length;
	
	    var bNames = getFieldNames(b);
	    var bNameCount = bNames.length;
	
	    if (aNameCount === bNameCount) {
	        for (var i = 0; i < aNameCount; ++i) {
	            var name = aNames[i];
	            var aChild = getFieldValue(a, name);
	            var bChild = getFieldValue(b, name);
	
	            if (problemPath) {
	                problemPath.push(name);
	            }
	
	            if (!areEquivalent(aChild, bChild, problemPath)) {
	                return false;
	            }
	
	            if (problemPath) {
	                var problemPathTail = problemPath.pop();
	                if (problemPathTail !== name) {
	                    throw new Error("" + problemPathTail);
	                }
	            }
	        }
	
	        return true;
	    }
	
	    if (!problemPath) {
	        return false;
	    }
	
	    // Since aNameCount !== bNameCount, we need to find some name that's
	    // missing in aNames but present in bNames, or vice-versa.
	
	    var seenNames = Object.create(null);
	
	    for (i = 0; i < aNameCount; ++i) {
	        seenNames[aNames[i]] = true;
	    }
	
	    for (i = 0; i < bNameCount; ++i) {
	        name = bNames[i];
	
	        if (!hasOwn.call(seenNames, name)) {
	            problemPath.push(name);
	            return false;
	        }
	
	        delete seenNames[name];
	    }
	
	    for (name in seenNames) {
	        problemPath.push(name);
	        break;
	    }
	
	    return false;
	}
	
	module.exports = astNodesAreEquivalent;


/***/ },

/***/ "./node_modules/ast-types/lib/node-path.js":
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var n = types.namedTypes;
	var b = types.builders;
	var isNumber = types.builtInTypes.number;
	var isArray = types.builtInTypes.array;
	var Path = __webpack_require__("./node_modules/ast-types/lib/path.js");
	var Scope = __webpack_require__("./node_modules/ast-types/lib/scope.js");
	
	function NodePath(value, parentPath, name) {
	    if (!(this instanceof NodePath)) {
	        throw new Error("NodePath constructor cannot be invoked without 'new'");
	    }
	    Path.call(this, value, parentPath, name);
	}
	
	var NPp = NodePath.prototype = Object.create(Path.prototype, {
	    constructor: {
	        value: NodePath,
	        enumerable: false,
	        writable: true,
	        configurable: true
	    }
	});
	
	Object.defineProperties(NPp, {
	    node: {
	        get: function() {
	            Object.defineProperty(this, "node", {
	                configurable: true, // Enable deletion.
	                value: this._computeNode()
	            });
	
	            return this.node;
	        }
	    },
	
	    parent: {
	        get: function() {
	            Object.defineProperty(this, "parent", {
	                configurable: true, // Enable deletion.
	                value: this._computeParent()
	            });
	
	            return this.parent;
	        }
	    },
	
	    scope: {
	        get: function() {
	            Object.defineProperty(this, "scope", {
	                configurable: true, // Enable deletion.
	                value: this._computeScope()
	            });
	
	            return this.scope;
	        }
	    }
	});
	
	NPp.replace = function() {
	    delete this.node;
	    delete this.parent;
	    delete this.scope;
	    return Path.prototype.replace.apply(this, arguments);
	};
	
	NPp.prune = function() {
	    var remainingNodePath = this.parent;
	
	    this.replace();
	
	    return cleanUpNodesAfterPrune(remainingNodePath);
	};
	
	// The value of the first ancestor Path whose value is a Node.
	NPp._computeNode = function() {
	    var value = this.value;
	    if (n.Node.check(value)) {
	        return value;
	    }
	
	    var pp = this.parentPath;
	    return pp && pp.node || null;
	};
	
	// The first ancestor Path whose value is a Node distinct from this.node.
	NPp._computeParent = function() {
	    var value = this.value;
	    var pp = this.parentPath;
	
	    if (!n.Node.check(value)) {
	        while (pp && !n.Node.check(pp.value)) {
	            pp = pp.parentPath;
	        }
	
	        if (pp) {
	            pp = pp.parentPath;
	        }
	    }
	
	    while (pp && !n.Node.check(pp.value)) {
	        pp = pp.parentPath;
	    }
	
	    return pp || null;
	};
	
	// The closest enclosing scope that governs this node.
	NPp._computeScope = function() {
	    var value = this.value;
	    var pp = this.parentPath;
	    var scope = pp && pp.scope;
	
	    if (n.Node.check(value) &&
	        Scope.isEstablishedBy(value)) {
	        scope = new Scope(this, scope);
	    }
	
	    return scope || null;
	};
	
	NPp.getValueProperty = function(name) {
	    return types.getFieldValue(this.value, name);
	};
	
	/**
	 * Determine whether this.node needs to be wrapped in parentheses in order
	 * for a parser to reproduce the same local AST structure.
	 *
	 * For instance, in the expression `(1 + 2) * 3`, the BinaryExpression
	 * whose operator is "+" needs parentheses, because `1 + 2 * 3` would
	 * parse differently.
	 *
	 * If assumeExpressionContext === true, we don't worry about edge cases
	 * like an anonymous FunctionExpression appearing lexically first in its
	 * enclosing statement and thus needing parentheses to avoid being parsed
	 * as a FunctionDeclaration with a missing name.
	 */
	NPp.needsParens = function(assumeExpressionContext) {
	    var pp = this.parentPath;
	    if (!pp) {
	        return false;
	    }
	
	    var node = this.value;
	
	    // Only expressions need parentheses.
	    if (!n.Expression.check(node)) {
	        return false;
	    }
	
	    // Identifiers never need parentheses.
	    if (node.type === "Identifier") {
	        return false;
	    }
	
	    while (!n.Node.check(pp.value)) {
	        pp = pp.parentPath;
	        if (!pp) {
	            return false;
	        }
	    }
	
	    var parent = pp.value;
	
	    switch (node.type) {
	    case "UnaryExpression":
	    case "SpreadElement":
	    case "SpreadProperty":
	        return parent.type === "MemberExpression"
	            && this.name === "object"
	            && parent.object === node;
	
	    case "BinaryExpression":
	    case "LogicalExpression":
	        switch (parent.type) {
	        case "CallExpression":
	            return this.name === "callee"
	                && parent.callee === node;
	
	        case "UnaryExpression":
	        case "SpreadElement":
	        case "SpreadProperty":
	            return true;
	
	        case "MemberExpression":
	            return this.name === "object"
	                && parent.object === node;
	
	        case "BinaryExpression":
	        case "LogicalExpression":
	            var po = parent.operator;
	            var pp = PRECEDENCE[po];
	            var no = node.operator;
	            var np = PRECEDENCE[no];
	
	            if (pp > np) {
	                return true;
	            }
	
	            if (pp === np && this.name === "right") {
	                if (parent.right !== node) {
	                    throw new Error("Nodes must be equal");
	                }
	                return true;
	            }
	
	        default:
	            return false;
	        }
	
	    case "SequenceExpression":
	        switch (parent.type) {
	        case "ForStatement":
	            // Although parentheses wouldn't hurt around sequence
	            // expressions in the head of for loops, traditional style
	            // dictates that e.g. i++, j++ should not be wrapped with
	            // parentheses.
	            return false;
	
	        case "ExpressionStatement":
	            return this.name !== "expression";
	
	        default:
	            // Otherwise err on the side of overparenthesization, adding
	            // explicit exceptions above if this proves overzealous.
	            return true;
	        }
	
	    case "YieldExpression":
	        switch (parent.type) {
	        case "BinaryExpression":
	        case "LogicalExpression":
	        case "UnaryExpression":
	        case "SpreadElement":
	        case "SpreadProperty":
	        case "CallExpression":
	        case "MemberExpression":
	        case "NewExpression":
	        case "ConditionalExpression":
	        case "YieldExpression":
	            return true;
	
	        default:
	            return false;
	        }
	
	    case "Literal":
	        return parent.type === "MemberExpression"
	            && isNumber.check(node.value)
	            && this.name === "object"
	            && parent.object === node;
	
	    case "AssignmentExpression":
	    case "ConditionalExpression":
	        switch (parent.type) {
	        case "UnaryExpression":
	        case "SpreadElement":
	        case "SpreadProperty":
	        case "BinaryExpression":
	        case "LogicalExpression":
	            return true;
	
	        case "CallExpression":
	            return this.name === "callee"
	                && parent.callee === node;
	
	        case "ConditionalExpression":
	            return this.name === "test"
	                && parent.test === node;
	
	        case "MemberExpression":
	            return this.name === "object"
	                && parent.object === node;
	
	        default:
	            return false;
	        }
	
	    default:
	        if (parent.type === "NewExpression" &&
	            this.name === "callee" &&
	            parent.callee === node) {
	            return containsCallExpression(node);
	        }
	    }
	
	    if (assumeExpressionContext !== true &&
	        !this.canBeFirstInStatement() &&
	        this.firstInStatement())
	        return true;
	
	    return false;
	};
	
	function isBinary(node) {
	    return n.BinaryExpression.check(node)
	        || n.LogicalExpression.check(node);
	}
	
	function isUnaryLike(node) {
	    return n.UnaryExpression.check(node)
	        // I considered making SpreadElement and SpreadProperty subtypes
	        // of UnaryExpression, but they're not really Expression nodes.
	        || (n.SpreadElement && n.SpreadElement.check(node))
	        || (n.SpreadProperty && n.SpreadProperty.check(node));
	}
	
	var PRECEDENCE = {};
	[["||"],
	 ["&&"],
	 ["|"],
	 ["^"],
	 ["&"],
	 ["==", "===", "!=", "!=="],
	 ["<", ">", "<=", ">=", "in", "instanceof"],
	 [">>", "<<", ">>>"],
	 ["+", "-"],
	 ["*", "/", "%"]
	].forEach(function(tier, i) {
	    tier.forEach(function(op) {
	        PRECEDENCE[op] = i;
	    });
	});
	
	function containsCallExpression(node) {
	    if (n.CallExpression.check(node)) {
	        return true;
	    }
	
	    if (isArray.check(node)) {
	        return node.some(containsCallExpression);
	    }
	
	    if (n.Node.check(node)) {
	        return types.someField(node, function(name, child) {
	            return containsCallExpression(child);
	        });
	    }
	
	    return false;
	}
	
	NPp.canBeFirstInStatement = function() {
	    var node = this.node;
	    return !n.FunctionExpression.check(node)
	        && !n.ObjectExpression.check(node);
	};
	
	NPp.firstInStatement = function() {
	    return firstInStatement(this);
	};
	
	function firstInStatement(path) {
	    for (var node, parent; path.parent; path = path.parent) {
	        node = path.node;
	        parent = path.parent.node;
	
	        if (n.BlockStatement.check(parent) &&
	            path.parent.name === "body" &&
	            path.name === 0) {
	            if (parent.body[0] !== node) {
	                throw new Error("Nodes must be equal");
	            }
	            return true;
	        }
	
	        if (n.ExpressionStatement.check(parent) &&
	            path.name === "expression") {
	            if (parent.expression !== node) {
	                throw new Error("Nodes must be equal");
	            }
	            return true;
	        }
	
	        if (n.SequenceExpression.check(parent) &&
	            path.parent.name === "expressions" &&
	            path.name === 0) {
	            if (parent.expressions[0] !== node) {
	                throw new Error("Nodes must be equal");
	            }
	            continue;
	        }
	
	        if (n.CallExpression.check(parent) &&
	            path.name === "callee") {
	            if (parent.callee !== node) {
	                throw new Error("Nodes must be equal");
	            }
	            continue;
	        }
	
	        if (n.MemberExpression.check(parent) &&
	            path.name === "object") {
	            if (parent.object !== node) {
	                throw new Error("Nodes must be equal");
	            }
	            continue;
	        }
	
	        if (n.ConditionalExpression.check(parent) &&
	            path.name === "test") {
	            if (parent.test !== node) {
	                throw new Error("Nodes must be equal");
	            }
	            continue;
	        }
	
	        if (isBinary(parent) &&
	            path.name === "left") {
	            if (parent.left !== node) {
	                throw new Error("Nodes must be equal");
	            }
	            continue;
	        }
	
	        if (n.UnaryExpression.check(parent) &&
	            !parent.prefix &&
	            path.name === "argument") {
	            if (parent.argument !== node) {
	                throw new Error("Nodes must be equal");
	            }
	            continue;
	        }
	
	        return false;
	    }
	
	    return true;
	}
	
	/**
	 * Pruning certain nodes will result in empty or incomplete nodes, here we clean those nodes up.
	 */
	function cleanUpNodesAfterPrune(remainingNodePath) {
	    if (n.VariableDeclaration.check(remainingNodePath.node)) {
	        var declarations = remainingNodePath.get('declarations').value;
	        if (!declarations || declarations.length === 0) {
	            return remainingNodePath.prune();
	        }
	    } else if (n.ExpressionStatement.check(remainingNodePath.node)) {
	        if (!remainingNodePath.get('expression').value) {
	            return remainingNodePath.prune();
	        }
	    } else if (n.IfStatement.check(remainingNodePath.node)) {
	        cleanUpIfStatementAfterPrune(remainingNodePath);
	    }
	
	    return remainingNodePath;
	}
	
	function cleanUpIfStatementAfterPrune(ifStatement) {
	    var testExpression = ifStatement.get('test').value;
	    var alternate = ifStatement.get('alternate').value;
	    var consequent = ifStatement.get('consequent').value;
	
	    if (!consequent && !alternate) {
	        var testExpressionStatement = b.expressionStatement(testExpression);
	
	        ifStatement.replace(testExpressionStatement);
	    } else if (!consequent && alternate) {
	        var negatedTestExpression = b.unaryExpression('!', testExpression, true);
	
	        if (n.UnaryExpression.check(testExpression) && testExpression.operator === '!') {
	            negatedTestExpression = testExpression.argument;
	        }
	
	        ifStatement.get("test").replace(negatedTestExpression);
	        ifStatement.get("consequent").replace(alternate);
	        ifStatement.get("alternate").replace();
	    }
	}
	
	module.exports = NodePath;


/***/ },

/***/ "./node_modules/ast-types/lib/path.js":
/***/ function(module, exports, __webpack_require__) {

	var Op = Object.prototype;
	var hasOwn = Op.hasOwnProperty;
	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var isArray = types.builtInTypes.array;
	var isNumber = types.builtInTypes.number;
	var Ap = Array.prototype;
	var slice = Ap.slice;
	var map = Ap.map;
	
	function Path(value, parentPath, name) {
	    if (!(this instanceof Path)) {
	        throw new Error("Path constructor cannot be invoked without 'new'");
	    }
	
	    if (parentPath) {
	        if (!(parentPath instanceof Path)) {
	            throw new Error("");
	        }
	    } else {
	        parentPath = null;
	        name = null;
	    }
	
	    // The value encapsulated by this Path, generally equal to
	    // parentPath.value[name] if we have a parentPath.
	    this.value = value;
	
	    // The immediate parent Path of this Path.
	    this.parentPath = parentPath;
	
	    // The name of the property of parentPath.value through which this
	    // Path's value was reached.
	    this.name = name;
	
	    // Calling path.get("child") multiple times always returns the same
	    // child Path object, for both performance and consistency reasons.
	    this.__childCache = null;
	}
	
	var Pp = Path.prototype;
	
	function getChildCache(path) {
	    // Lazily create the child cache. This also cheapens cache
	    // invalidation, since you can just reset path.__childCache to null.
	    return path.__childCache || (path.__childCache = Object.create(null));
	}
	
	function getChildPath(path, name) {
	    var cache = getChildCache(path);
	    var actualChildValue = path.getValueProperty(name);
	    var childPath = cache[name];
	    if (!hasOwn.call(cache, name) ||
	        // Ensure consistency between cache and reality.
	        childPath.value !== actualChildValue) {
	        childPath = cache[name] = new path.constructor(
	            actualChildValue, path, name
	        );
	    }
	    return childPath;
	}
	
	// This method is designed to be overridden by subclasses that need to
	// handle missing properties, etc.
	Pp.getValueProperty = function getValueProperty(name) {
	    return this.value[name];
	};
	
	Pp.get = function get(name) {
	    var path = this;
	    var names = arguments;
	    var count = names.length;
	
	    for (var i = 0; i < count; ++i) {
	        path = getChildPath(path, names[i]);
	    }
	
	    return path;
	};
	
	Pp.each = function each(callback, context) {
	    var childPaths = [];
	    var len = this.value.length;
	    var i = 0;
	
	    // Collect all the original child paths before invoking the callback.
	    for (var i = 0; i < len; ++i) {
	        if (hasOwn.call(this.value, i)) {
	            childPaths[i] = this.get(i);
	        }
	    }
	
	    // Invoke the callback on just the original child paths, regardless of
	    // any modifications made to the array by the callback. I chose these
	    // semantics over cleverly invoking the callback on new elements because
	    // this way is much easier to reason about.
	    context = context || this;
	    for (i = 0; i < len; ++i) {
	        if (hasOwn.call(childPaths, i)) {
	            callback.call(context, childPaths[i]);
	        }
	    }
	};
	
	Pp.map = function map(callback, context) {
	    var result = [];
	
	    this.each(function(childPath) {
	        result.push(callback.call(this, childPath));
	    }, context);
	
	    return result;
	};
	
	Pp.filter = function filter(callback, context) {
	    var result = [];
	
	    this.each(function(childPath) {
	        if (callback.call(this, childPath)) {
	            result.push(childPath);
	        }
	    }, context);
	
	    return result;
	};
	
	function emptyMoves() {}
	function getMoves(path, offset, start, end) {
	    isArray.assert(path.value);
	
	    if (offset === 0) {
	        return emptyMoves;
	    }
	
	    var length = path.value.length;
	    if (length < 1) {
	        return emptyMoves;
	    }
	
	    var argc = arguments.length;
	    if (argc === 2) {
	        start = 0;
	        end = length;
	    } else if (argc === 3) {
	        start = Math.max(start, 0);
	        end = length;
	    } else {
	        start = Math.max(start, 0);
	        end = Math.min(end, length);
	    }
	
	    isNumber.assert(start);
	    isNumber.assert(end);
	
	    var moves = Object.create(null);
	    var cache = getChildCache(path);
	
	    for (var i = start; i < end; ++i) {
	        if (hasOwn.call(path.value, i)) {
	            var childPath = path.get(i);
	            if (childPath.name !== i) {
	                throw new Error("");
	            }
	            var newIndex = i + offset;
	            childPath.name = newIndex;
	            moves[newIndex] = childPath;
	            delete cache[i];
	        }
	    }
	
	    delete cache.length;
	
	    return function() {
	        for (var newIndex in moves) {
	            var childPath = moves[newIndex];
	            if (childPath.name !== +newIndex) {
	                throw new Error("");
	            }
	            cache[newIndex] = childPath;
	            path.value[newIndex] = childPath.value;
	        }
	    };
	}
	
	Pp.shift = function shift() {
	    var move = getMoves(this, -1);
	    var result = this.value.shift();
	    move();
	    return result;
	};
	
	Pp.unshift = function unshift(node) {
	    var move = getMoves(this, arguments.length);
	    var result = this.value.unshift.apply(this.value, arguments);
	    move();
	    return result;
	};
	
	Pp.push = function push(node) {
	    isArray.assert(this.value);
	    delete getChildCache(this).length
	    return this.value.push.apply(this.value, arguments);
	};
	
	Pp.pop = function pop() {
	    isArray.assert(this.value);
	    var cache = getChildCache(this);
	    delete cache[this.value.length - 1];
	    delete cache.length;
	    return this.value.pop();
	};
	
	Pp.insertAt = function insertAt(index, node) {
	    var argc = arguments.length;
	    var move = getMoves(this, argc - 1, index);
	    if (move === emptyMoves) {
	        return this;
	    }
	
	    index = Math.max(index, 0);
	
	    for (var i = 1; i < argc; ++i) {
	        this.value[index + i - 1] = arguments[i];
	    }
	
	    move();
	
	    return this;
	};
	
	Pp.insertBefore = function insertBefore(node) {
	    var pp = this.parentPath;
	    var argc = arguments.length;
	    var insertAtArgs = [this.name];
	    for (var i = 0; i < argc; ++i) {
	        insertAtArgs.push(arguments[i]);
	    }
	    return pp.insertAt.apply(pp, insertAtArgs);
	};
	
	Pp.insertAfter = function insertAfter(node) {
	    var pp = this.parentPath;
	    var argc = arguments.length;
	    var insertAtArgs = [this.name + 1];
	    for (var i = 0; i < argc; ++i) {
	        insertAtArgs.push(arguments[i]);
	    }
	    return pp.insertAt.apply(pp, insertAtArgs);
	};
	
	function repairRelationshipWithParent(path) {
	    if (!(path instanceof Path)) {
	        throw new Error("");
	    }
	
	    var pp = path.parentPath;
	    if (!pp) {
	        // Orphan paths have no relationship to repair.
	        return path;
	    }
	
	    var parentValue = pp.value;
	    var parentCache = getChildCache(pp);
	
	    // Make sure parentCache[path.name] is populated.
	    if (parentValue[path.name] === path.value) {
	        parentCache[path.name] = path;
	    } else if (isArray.check(parentValue)) {
	        // Something caused path.name to become out of date, so attempt to
	        // recover by searching for path.value in parentValue.
	        var i = parentValue.indexOf(path.value);
	        if (i >= 0) {
	            parentCache[path.name = i] = path;
	        }
	    } else {
	        // If path.value disagrees with parentValue[path.name], and
	        // path.name is not an array index, let path.value become the new
	        // parentValue[path.name] and update parentCache accordingly.
	        parentValue[path.name] = path.value;
	        parentCache[path.name] = path;
	    }
	
	    if (parentValue[path.name] !== path.value) {
	        throw new Error("");
	    }
	    if (path.parentPath.get(path.name) !== path) {
	        throw new Error("");
	    }
	
	    return path;
	}
	
	Pp.replace = function replace(replacement) {
	    var results = [];
	    var parentValue = this.parentPath.value;
	    var parentCache = getChildCache(this.parentPath);
	    var count = arguments.length;
	
	    repairRelationshipWithParent(this);
	
	    if (isArray.check(parentValue)) {
	        var originalLength = parentValue.length;
	        var move = getMoves(this.parentPath, count - 1, this.name + 1);
	
	        var spliceArgs = [this.name, 1];
	        for (var i = 0; i < count; ++i) {
	            spliceArgs.push(arguments[i]);
	        }
	
	        var splicedOut = parentValue.splice.apply(parentValue, spliceArgs);
	
	        if (splicedOut[0] !== this.value) {
	            throw new Error("");
	        }
	        if (parentValue.length !== (originalLength - 1 + count)) {
	            throw new Error("");
	        }
	
	        move();
	
	        if (count === 0) {
	            delete this.value;
	            delete parentCache[this.name];
	            this.__childCache = null;
	
	        } else {
	            if (parentValue[this.name] !== replacement) {
	                throw new Error("");
	            }
	
	            if (this.value !== replacement) {
	                this.value = replacement;
	                this.__childCache = null;
	            }
	
	            for (i = 0; i < count; ++i) {
	                results.push(this.parentPath.get(this.name + i));
	            }
	
	            if (results[0] !== this) {
	                throw new Error("");
	            }
	        }
	
	    } else if (count === 1) {
	        if (this.value !== replacement) {
	            this.__childCache = null;
	        }
	        this.value = parentValue[this.name] = replacement;
	        results.push(this);
	
	    } else if (count === 0) {
	        delete parentValue[this.name];
	        delete this.value;
	        this.__childCache = null;
	
	        // Leave this path cached as parentCache[this.name], even though
	        // it no longer has a value defined.
	
	    } else {
	        throw new Error("Could not replace path");
	    }
	
	    return results;
	};
	
	module.exports = Path;


/***/ },

/***/ "./node_modules/jscodeshift/dist/core.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2015-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	var Collection = __webpack_require__("./node_modules/jscodeshift/dist/Collection.js");
	
	var collections = __webpack_require__("./node_modules/jscodeshift/dist/collections/index.js");
	var babel = __webpack_require__("./node_modules/babel-core/index.js");
	var matchNode = __webpack_require__("./node_modules/jscodeshift/dist/matchNode.js");
	var recast = __webpack_require__("./node_modules/recast/main.js");
	var template = __webpack_require__("./node_modules/jscodeshift/dist/template.js");
	var _ = __webpack_require__("./node_modules/lodash/index.js");
	
	var Node = recast.types.namedTypes.Node;
	var NodePath = recast.types.NodePath;
	
	// Register all built-in collections
	for (var name in collections) {
	  collections[name].register();
	}
	
	/**
	 * Main entry point to the tool. The function accepts multiple different kinds
	 * of arguments as a convenience. In particular the function accepts either
	 *
	 * - a string containing source code
	 *   The string is parsed with Recast
	 * - a single AST node
	 * - a single node path
	 * - an array of nodes
	 * - an array of node paths
	 *
	 * @param {Node|NodePath|Array|string} source
	 * @return {Collection}
	 */
	function core(source) {
	  return typeof source === 'string' ? fromSource(source) : fromAST(source);
	}
	
	/**
	 * Returns a collection from a node, node path, array of nodes or array of node
	 * paths.
	 *
	 * @param {Node|NodePath|Array} source
	 * @return {Collection}
	 */
	function fromAST(ast) {
	  if (Array.isArray(ast)) {
	    if (ast[0] instanceof NodePath || ast.length === 0) {
	      return Collection.fromPaths(ast);
	    } else if (Node.check(ast[0])) {
	      return Collection.fromNodes(ast);
	    }
	  } else {
	    if (ast instanceof NodePath) {
	      return Collection.fromPaths([ast]);
	    } else if (Node.check(ast)) {
	      return Collection.fromNodes([ast]);
	    }
	  }
	  throw new TypeError('Received an unexpected value ' + Object.prototype.toString.call(ast));
	}
	
	function fromSource(source) {
	  return fromAST(recast.parse(source, { esprima: babel }));
	}
	
	/**
	 * Utility function to match a node against a pattern.
	 *
	 * @param {Node|NodePath|Object} path
	 * @parma {Object} filter
	 * @return boolean
	 */
	function match(path, filter) {
	  if (!(path instanceof NodePath)) {
	    if (typeof path.get === 'function') {
	      path = path.get();
	    } else {
	      path = { value: path };
	    }
	  }
	  return matchNode(path.value, filter);
	}
	
	// add builders and types to the function for simple access
	_.assign(core, recast.types.namedTypes);
	_.assign(core, recast.types.builders);
	core.registerMethods = Collection.registerMethods;
	core.types = recast.types;
	core.match = match;
	core.template = template;
	
	// add mappings and filters to function
	core.filters = {};
	core.mappings = {};
	for (var name in collections) {
	  if (collections[name].filters) {
	    core.filters[name] = collections[name].filters;
	  }
	  if (collections[name].mappings) {
	    core.mappings[name] = collections[name].mappings;
	  }
	}
	
	module.exports = core;

/***/ },

/***/ "./node_modules/ast-types/lib/path-visitor.js":
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var NodePath = __webpack_require__("./node_modules/ast-types/lib/node-path.js");
	var Printable = types.namedTypes.Printable;
	var isArray = types.builtInTypes.array;
	var isObject = types.builtInTypes.object;
	var isFunction = types.builtInTypes.function;
	var hasOwn = Object.prototype.hasOwnProperty;
	var undefined;
	
	function PathVisitor() {
	    if (!(this instanceof PathVisitor)) {
	        throw new Error(
	            "PathVisitor constructor cannot be invoked without 'new'"
	        );
	    }
	
	    // Permanent state.
	    this._reusableContextStack = [];
	
	    this._methodNameTable = computeMethodNameTable(this);
	    this._shouldVisitComments =
	        hasOwn.call(this._methodNameTable, "Block") ||
	        hasOwn.call(this._methodNameTable, "Line");
	
	    this.Context = makeContextConstructor(this);
	
	    // State reset every time PathVisitor.prototype.visit is called.
	    this._visiting = false;
	    this._changeReported = false;
	}
	
	function computeMethodNameTable(visitor) {
	    var typeNames = Object.create(null);
	
	    for (var methodName in visitor) {
	        if (/^visit[A-Z]/.test(methodName)) {
	            typeNames[methodName.slice("visit".length)] = true;
	        }
	    }
	
	    var supertypeTable = types.computeSupertypeLookupTable(typeNames);
	    var methodNameTable = Object.create(null);
	
	    var typeNames = Object.keys(supertypeTable);
	    var typeNameCount = typeNames.length;
	    for (var i = 0; i < typeNameCount; ++i) {
	        var typeName = typeNames[i];
	        methodName = "visit" + supertypeTable[typeName];
	        if (isFunction.check(visitor[methodName])) {
	            methodNameTable[typeName] = methodName;
	        }
	    }
	
	    return methodNameTable;
	}
	
	PathVisitor.fromMethodsObject = function fromMethodsObject(methods) {
	    if (methods instanceof PathVisitor) {
	        return methods;
	    }
	
	    if (!isObject.check(methods)) {
	        // An empty visitor?
	        return new PathVisitor;
	    }
	
	    function Visitor() {
	        if (!(this instanceof Visitor)) {
	            throw new Error(
	                "Visitor constructor cannot be invoked without 'new'"
	            );
	        }
	        PathVisitor.call(this);
	    }
	
	    var Vp = Visitor.prototype = Object.create(PVp);
	    Vp.constructor = Visitor;
	
	    extend(Vp, methods);
	    extend(Visitor, PathVisitor);
	
	    isFunction.assert(Visitor.fromMethodsObject);
	    isFunction.assert(Visitor.visit);
	
	    return new Visitor;
	};
	
	function extend(target, source) {
	    for (var property in source) {
	        if (hasOwn.call(source, property)) {
	            target[property] = source[property];
	        }
	    }
	
	    return target;
	}
	
	PathVisitor.visit = function visit(node, methods) {
	    return PathVisitor.fromMethodsObject(methods).visit(node);
	};
	
	var PVp = PathVisitor.prototype;
	
	PVp.visit = function() {
	    if (this._visiting) {
	        throw new Error(
	            "Recursively calling visitor.visit(path) resets visitor state. " +
	                "Try this.visit(path) or this.traverse(path) instead."
	        );
	    }
	
	    // Private state that needs to be reset before every traversal.
	    this._visiting = true;
	    this._changeReported = false;
	    this._abortRequested = false;
	
	    var argc = arguments.length;
	    var args = new Array(argc)
	    for (var i = 0; i < argc; ++i) {
	        args[i] = arguments[i];
	    }
	
	    if (!(args[0] instanceof NodePath)) {
	        args[0] = new NodePath({ root: args[0] }).get("root");
	    }
	
	    // Called with the same arguments as .visit.
	    this.reset.apply(this, args);
	
	    try {
	        var root = this.visitWithoutReset(args[0]);
	        var didNotThrow = true;
	    } finally {
	        this._visiting = false;
	
	        if (!didNotThrow && this._abortRequested) {
	            // If this.visitWithoutReset threw an exception and
	            // this._abortRequested was set to true, return the root of
	            // the AST instead of letting the exception propagate, so that
	            // client code does not have to provide a try-catch block to
	            // intercept the AbortRequest exception.  Other kinds of
	            // exceptions will propagate without being intercepted and
	            // rethrown by a catch block, so their stacks will accurately
	            // reflect the original throwing context.
	            return args[0].value;
	        }
	    }
	
	    return root;
	};
	
	PVp.AbortRequest = function AbortRequest() {};
	PVp.abort = function() {
	    var visitor = this;
	    visitor._abortRequested = true;
	    var request = new visitor.AbortRequest();
	
	    // If you decide to catch this exception and stop it from propagating,
	    // make sure to call its cancel method to avoid silencing other
	    // exceptions that might be thrown later in the traversal.
	    request.cancel = function() {
	        visitor._abortRequested = false;
	    };
	
	    throw request;
	};
	
	PVp.reset = function(path/*, additional arguments */) {
	    // Empty stub; may be reassigned or overridden by subclasses.
	};
	
	PVp.visitWithoutReset = function(path) {
	    if (this instanceof this.Context) {
	        // Since this.Context.prototype === this, there's a chance we
	        // might accidentally call context.visitWithoutReset. If that
	        // happens, re-invoke the method against context.visitor.
	        return this.visitor.visitWithoutReset(path);
	    }
	
	    if (!(path instanceof NodePath)) {
	        throw new Error("");
	    }
	
	    var value = path.value;
	
	    var methodName = value &&
	        typeof value === "object" &&
	        typeof value.type === "string" &&
	        this._methodNameTable[value.type];
	
	    if (methodName) {
	        var context = this.acquireContext(path);
	        try {
	            return context.invokeVisitorMethod(methodName);
	        } finally {
	            this.releaseContext(context);
	        }
	
	    } else {
	        // If there was no visitor method to call, visit the children of
	        // this node generically.
	        return visitChildren(path, this);
	    }
	};
	
	function visitChildren(path, visitor) {
	    if (!(path instanceof NodePath)) {
	        throw new Error("");
	    }
	    if (!(visitor instanceof PathVisitor)) {
	        throw new Error("");
	    }
	
	    var value = path.value;
	
	    if (isArray.check(value)) {
	        path.each(visitor.visitWithoutReset, visitor);
	    } else if (!isObject.check(value)) {
	        // No children to visit.
	    } else {
	        var childNames = types.getFieldNames(value);
	
	        // The .comments field of the Node type is hidden, so we only
	        // visit it if the visitor defines visitBlock or visitLine, and
	        // value.comments is defined.
	        if (visitor._shouldVisitComments &&
	            value.comments &&
	            childNames.indexOf("comments") < 0) {
	            childNames.push("comments");
	        }
	
	        var childCount = childNames.length;
	        var childPaths = [];
	
	        for (var i = 0; i < childCount; ++i) {
	            var childName = childNames[i];
	            if (!hasOwn.call(value, childName)) {
	                value[childName] = types.getFieldValue(value, childName);
	            }
	            childPaths.push(path.get(childName));
	        }
	
	        for (var i = 0; i < childCount; ++i) {
	            visitor.visitWithoutReset(childPaths[i]);
	        }
	    }
	
	    return path.value;
	}
	
	PVp.acquireContext = function(path) {
	    if (this._reusableContextStack.length === 0) {
	        return new this.Context(path);
	    }
	    return this._reusableContextStack.pop().reset(path);
	};
	
	PVp.releaseContext = function(context) {
	    if (!(context instanceof this.Context)) {
	        throw new Error("");
	    }
	    this._reusableContextStack.push(context);
	    context.currentPath = null;
	};
	
	PVp.reportChanged = function() {
	    this._changeReported = true;
	};
	
	PVp.wasChangeReported = function() {
	    return this._changeReported;
	};
	
	function makeContextConstructor(visitor) {
	    function Context(path) {
	        if (!(this instanceof Context)) {
	            throw new Error("");
	        }
	        if (!(this instanceof PathVisitor)) {
	            throw new Error("");
	        }
	        if (!(path instanceof NodePath)) {
	            throw new Error("");
	        }
	
	        Object.defineProperty(this, "visitor", {
	            value: visitor,
	            writable: false,
	            enumerable: true,
	            configurable: false
	        });
	
	        this.currentPath = path;
	        this.needToCallTraverse = true;
	
	        Object.seal(this);
	    }
	
	    if (!(visitor instanceof PathVisitor)) {
	        throw new Error("");
	    }
	
	    // Note that the visitor object is the prototype of Context.prototype,
	    // so all visitor methods are inherited by context objects.
	    var Cp = Context.prototype = Object.create(visitor);
	
	    Cp.constructor = Context;
	    extend(Cp, sharedContextProtoMethods);
	
	    return Context;
	}
	
	// Every PathVisitor has a different this.Context constructor and
	// this.Context.prototype object, but those prototypes can all use the
	// same reset, invokeVisitorMethod, and traverse function objects.
	var sharedContextProtoMethods = Object.create(null);
	
	sharedContextProtoMethods.reset =
	function reset(path) {
	    if (!(this instanceof this.Context)) {
	        throw new Error("");
	    }
	    if (!(path instanceof NodePath)) {
	        throw new Error("");
	    }
	
	    this.currentPath = path;
	    this.needToCallTraverse = true;
	
	    return this;
	};
	
	sharedContextProtoMethods.invokeVisitorMethod =
	function invokeVisitorMethod(methodName) {
	    if (!(this instanceof this.Context)) {
	        throw new Error("");
	    }
	    if (!(this.currentPath instanceof NodePath)) {
	        throw new Error("");
	    }
	
	    var result = this.visitor[methodName].call(this, this.currentPath);
	
	    if (result === false) {
	        // Visitor methods return false to indicate that they have handled
	        // their own traversal needs, and we should not complain if
	        // this.needToCallTraverse is still true.
	        this.needToCallTraverse = false;
	
	    } else if (result !== undefined) {
	        // Any other non-undefined value returned from the visitor method
	        // is interpreted as a replacement value.
	        this.currentPath = this.currentPath.replace(result)[0];
	
	        if (this.needToCallTraverse) {
	            // If this.traverse still hasn't been called, visit the
	            // children of the replacement node.
	            this.traverse(this.currentPath);
	        }
	    }
	
	    if (this.needToCallTraverse !== false) {
	        throw new Error(
	            "Must either call this.traverse or return false in " + methodName
	        );
	    }
	
	    var path = this.currentPath;
	    return path && path.value;
	};
	
	sharedContextProtoMethods.traverse =
	function traverse(path, newVisitor) {
	    if (!(this instanceof this.Context)) {
	        throw new Error("");
	    }
	    if (!(path instanceof NodePath)) {
	        throw new Error("");
	    }
	    if (!(this.currentPath instanceof NodePath)) {
	        throw new Error("");
	    }
	
	    this.needToCallTraverse = false;
	
	    return visitChildren(path, PathVisitor.fromMethodsObject(
	        newVisitor || this.visitor
	    ));
	};
	
	sharedContextProtoMethods.visit =
	function visit(path, newVisitor) {
	    if (!(this instanceof this.Context)) {
	        throw new Error("");
	    }
	    if (!(path instanceof NodePath)) {
	        throw new Error("");
	    }
	    if (!(this.currentPath instanceof NodePath)) {
	        throw new Error("");
	    }
	
	    this.needToCallTraverse = false;
	
	    return PathVisitor.fromMethodsObject(
	        newVisitor || this.visitor
	    ).visitWithoutReset(path);
	};
	
	sharedContextProtoMethods.reportChanged = function reportChanged() {
	    this.visitor.reportChanged();
	};
	
	sharedContextProtoMethods.abort = function abort() {
	    this.needToCallTraverse = false;
	    this.visitor.abort();
	};
	
	module.exports = PathVisitor;


/***/ },

/***/ "./node_modules/recast/lib/parser.js":
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var n = types.namedTypes;
	var b = types.builders;
	var isObject = types.builtInTypes.object;
	var isArray = types.builtInTypes.array;
	var isFunction = types.builtInTypes.function;
	var Patcher = __webpack_require__("./node_modules/recast/lib/patcher.js").Patcher;
	var normalizeOptions = __webpack_require__("./node_modules/recast/lib/options.js").normalize;
	var fromString = __webpack_require__("./node_modules/recast/lib/lines.js").fromString;
	var attachComments = __webpack_require__("./node_modules/recast/lib/comments.js").attach;
	var util = __webpack_require__("./node_modules/recast/lib/util.js");
	
	exports.parse = function parse(source, options) {
	    options = normalizeOptions(options);
	
	    var lines = fromString(source, options);
	
	    var sourceWithoutTabs = lines.toString({
	        tabWidth: options.tabWidth,
	        reuseWhitespace: false,
	        useTabs: false
	    });
	
	    var comments = [];
	    var program = options.parser.parse(sourceWithoutTabs, {
	        loc: true,
	        locations: true,
	        range: options.range,
	        comment: true,
	        onComment: comments,
	        tolerant: options.tolerant,
	        ecmaVersion: 6,
	        sourceType: 'module'
	    });
	
	    // If the source was empty, some parsers give loc.{start,end}.line
	    // values of 0, instead of the minimum of 1.
	    util.fixFaultyLocations(program, lines);
	
	    program.loc = program.loc || {
	        start: lines.firstPos(),
	        end: lines.lastPos()
	    };
	
	    program.loc.lines = lines;
	    program.loc.indent = 0;
	
	    // Expand the Program node's .loc to include all comments, since
	    // typically its .loc.start and .loc.end will coincide with those of
	    // the first and last statements, respectively, excluding any comments
	    // that fall outside that region.
	    var trueProgramLoc = util.getTrueLoc(program, lines);
	    program.loc.start = trueProgramLoc.start;
	    program.loc.end = trueProgramLoc.end;
	
	    if (program.comments) {
	        comments = program.comments;
	        delete program.comments;
	    }
	
	    // In order to ensure we reprint leading and trailing program
	    // comments, wrap the original Program node with a File node.
	    var file = program;
	    if (file.type === "Program") {
	        var file = b.file(program);
	        file.loc = {
	            lines: lines,
	            indent: 0,
	            start: lines.firstPos(),
	            end: lines.lastPos()
	        };
	    } else if (file.type === "File") {
	      program = file.program;
	    }
	
	    // Passing file.program here instead of just file means that initial
	    // comments will be attached to program.body[0] instead of program.
	    attachComments(
	        comments,
	        program.body.length ? file.program : file,
	        lines
	    );
	
	    // Return a copy of the original AST so that any changes made may be
	    // compared to the original.
	    return new TreeCopier(lines).copy(file);
	};
	
	function TreeCopier(lines) {
	    assert.ok(this instanceof TreeCopier);
	    this.lines = lines;
	    this.indent = 0;
	}
	
	var TCp = TreeCopier.prototype;
	
	TCp.copy = function(node) {
	    if (isArray.check(node)) {
	        return node.map(this.copy, this);
	    }
	
	    if (!isObject.check(node)) {
	        return node;
	    }
	
	    util.fixFaultyLocations(node, this.lines);
	
	    var copy = Object.create(Object.getPrototypeOf(node), {
	        original: { // Provide a link from the copy to the original.
	            value: node,
	            configurable: false,
	            enumerable: false,
	            writable: true
	        }
	    });
	
	    var loc = node.loc;
	    var oldIndent = this.indent;
	    var newIndent = oldIndent;
	
	    if (loc) {
	        // When node is a comment, we set node.loc.indent to
	        // node.loc.start.column so that, when/if we print the comment by
	        // itself, we can strip that much whitespace from the left margin
	        // of the comment. This only really matters for multiline Block
	        // comments, but it doesn't hurt for Line comments.
	        if (node.type === "Block" || node.type === "Line" ||
	            node.type === "CommentBlock" || node.type === "CommentLine" ||
	            this.lines.isPrecededOnlyByWhitespace(loc.start)) {
	            newIndent = this.indent = loc.start.column;
	        }
	
	        loc.lines = this.lines;
	        loc.indent = newIndent;
	    }
	
	    var keys = Object.keys(node);
	    var keyCount = keys.length;
	    for (var i = 0; i < keyCount; ++i) {
	        var key = keys[i];
	        if (key === "loc") {
	            copy[key] = node[key];
	        } else {
	            copy[key] = this.copy(node[key]);
	        }
	    }
	
	    this.indent = oldIndent;
	
	    return copy;
	};


/***/ },

/***/ "./node_modules/recast/lib/patcher.js":
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var linesModule = __webpack_require__("./node_modules/recast/lib/lines.js");
	var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var getFieldValue = types.getFieldValue;
	var Printable = types.namedTypes.Printable;
	var Expression = types.namedTypes.Expression;
	var SourceLocation = types.namedTypes.SourceLocation;
	var util = __webpack_require__("./node_modules/recast/lib/util.js");
	var comparePos = util.comparePos;
	var FastPath = __webpack_require__("./node_modules/recast/lib/fast-path.js");
	var isObject = types.builtInTypes.object;
	var isArray = types.builtInTypes.array;
	var isString = types.builtInTypes.string;
	var riskyAdjoiningCharExp = /[0-9a-z_$]/i;
	
	function Patcher(lines) {
	    assert.ok(this instanceof Patcher);
	    assert.ok(lines instanceof linesModule.Lines);
	
	    var self = this,
	        replacements = [];
	
	    self.replace = function(loc, lines) {
	        if (isString.check(lines))
	            lines = linesModule.fromString(lines);
	
	        replacements.push({
	            lines: lines,
	            start: loc.start,
	            end: loc.end
	        });
	    };
	
	    self.get = function(loc) {
	        // If no location is provided, return the complete Lines object.
	        loc = loc || {
	            start: { line: 1, column: 0 },
	            end: { line: lines.length,
	                   column: lines.getLineLength(lines.length) }
	        };
	
	        var sliceFrom = loc.start,
	            toConcat = [];
	
	        function pushSlice(from, to) {
	            assert.ok(comparePos(from, to) <= 0);
	            toConcat.push(lines.slice(from, to));
	        }
	
	        replacements.sort(function(a, b) {
	            return comparePos(a.start, b.start);
	        }).forEach(function(rep) {
	            if (comparePos(sliceFrom, rep.start) > 0) {
	                // Ignore nested replacement ranges.
	            } else {
	                pushSlice(sliceFrom, rep.start);
	                toConcat.push(rep.lines);
	                sliceFrom = rep.end;
	            }
	        });
	
	        pushSlice(sliceFrom, loc.end);
	
	        return linesModule.concat(toConcat);
	    };
	}
	exports.Patcher = Patcher;
	
	var Pp = Patcher.prototype;
	
	Pp.tryToReprintComments = function(newNode, oldNode, print) {
	    var patcher = this;
	
	    if (!newNode.comments &&
	        !oldNode.comments) {
	        // We were (vacuously) able to reprint all the comments!
	        return true;
	    }
	
	    var newPath = FastPath.from(newNode);
	    var oldPath = FastPath.from(oldNode);
	
	    newPath.stack.push("comments", getSurroundingComments(newNode));
	    oldPath.stack.push("comments", getSurroundingComments(oldNode));
	
	    var reprints = [];
	    var ableToReprintComments =
	        findArrayReprints(newPath, oldPath, reprints);
	
	    // No need to pop anything from newPath.stack or oldPath.stack, since
	    // newPath and oldPath are fresh local variables.
	
	    if (ableToReprintComments && reprints.length > 0) {
	        reprints.forEach(function(reprint) {
	            var oldComment = reprint.oldPath.getValue();
	            assert.ok(oldComment.leading || oldComment.trailing);
	            patcher.replace(
	                oldComment.loc,
	                // Comments can't have .comments, so it doesn't matter
	                // whether we print with comments or without.
	                print(reprint.newPath).indentTail(oldComment.loc.indent)
	            );
	        });
	    }
	
	    return ableToReprintComments;
	};
	
	// Get all comments that are either leading or trailing, ignoring any
	// comments that occur inside node.loc. Returns an empty array for nodes
	// with no leading or trailing comments.
	function getSurroundingComments(node) {
	    var result = [];
	    if (node.comments &&
	        node.comments.length > 0) {
	        node.comments.forEach(function(comment) {
	            if (comment.leading || comment.trailing) {
	                result.push(comment);
	            }
	        });
	    }
	    return result;
	}
	
	Pp.deleteComments = function(node) {
	    if (!node.comments) {
	        return;
	    }
	
	    var patcher = this;
	
	    node.comments.forEach(function(comment) {
	        if (comment.leading) {
	            // Delete leading comments along with any trailing whitespace
	            // they might have.
	            patcher.replace({
	                start: comment.loc.start,
	                end: node.loc.lines.skipSpaces(
	                    comment.loc.end, false, false)
	            }, "");
	
	        } else if (comment.trailing) {
	            // Delete trailing comments along with any leading whitespace
	            // they might have.
	            patcher.replace({
	                start: node.loc.lines.skipSpaces(
	                    comment.loc.start, true, false),
	                end: comment.loc.end
	            }, "");
	        }
	    });
	};
	
	exports.getReprinter = function(path) {
	    assert.ok(path instanceof FastPath);
	
	    // Make sure that this path refers specifically to a Node, rather than
	    // some non-Node subproperty of a Node.
	    var node = path.getValue();
	    if (!Printable.check(node))
	        return;
	
	    var orig = node.original;
	    var origLoc = orig && orig.loc;
	    var lines = origLoc && origLoc.lines;
	    var reprints = [];
	
	    if (!lines || !findReprints(path, reprints))
	        return;
	
	    return function(print) {
	        var patcher = new Patcher(lines);
	
	        reprints.forEach(function(reprint) {
	            var newNode = reprint.newPath.getValue();
	            var oldNode = reprint.oldPath.getValue();
	
	            SourceLocation.assert(oldNode.loc, true);
	
	            var needToPrintNewPathWithComments =
	                !patcher.tryToReprintComments(newNode, oldNode, print)
	
	            if (needToPrintNewPathWithComments) {
	                // Since we were not able to preserve all leading/trailing
	                // comments, we delete oldNode's comments, print newPath
	                // with comments, and then patch the resulting lines where
	                // oldNode used to be.
	                patcher.deleteComments(oldNode);
	            }
	
	            var newLines = print(
	                reprint.newPath,
	                needToPrintNewPathWithComments
	            ).indentTail(oldNode.loc.indent);
	
	            var nls = needsLeadingSpace(lines, oldNode.loc, newLines);
	            var nts = needsTrailingSpace(lines, oldNode.loc, newLines);
	
	            // If we try to replace the argument of a ReturnStatement like
	            // return"asdf" with e.g. a literal null expression, we run
	            // the risk of ending up with returnnull, so we need to add an
	            // extra leading space in situations where that might
	            // happen. Likewise for "asdf"in obj. See #170.
	            if (nls || nts) {
	                var newParts = [];
	                nls && newParts.push(" ");
	                newParts.push(newLines);
	                nts && newParts.push(" ");
	                newLines = linesModule.concat(newParts);
	            }
	
	            patcher.replace(oldNode.loc, newLines);
	        });
	
	        // Recall that origLoc is the .loc of an ancestor node that is
	        // guaranteed to contain all the reprinted nodes and comments.
	        return patcher.get(origLoc).indentTail(-orig.loc.indent);
	    };
	};
	
	// If the last character before oldLoc and the first character of newLines
	// are both identifier characters, they must be separated by a space,
	// otherwise they will most likely get fused together into a single token.
	function needsLeadingSpace(oldLines, oldLoc, newLines) {
	    var posBeforeOldLoc = util.copyPos(oldLoc.start);
	
	    // The character just before the location occupied by oldNode.
	    var charBeforeOldLoc =
	        oldLines.prevPos(posBeforeOldLoc) &&
	        oldLines.charAt(posBeforeOldLoc);
	
	    // First character of the reprinted node.
	    var newFirstChar = newLines.charAt(newLines.firstPos());
	
	    return charBeforeOldLoc &&
	        riskyAdjoiningCharExp.test(charBeforeOldLoc) &&
	        newFirstChar &&
	        riskyAdjoiningCharExp.test(newFirstChar);
	}
	
	// If the last character of newLines and the first character after oldLoc
	// are both identifier characters, they must be separated by a space,
	// otherwise they will most likely get fused together into a single token.
	function needsTrailingSpace(oldLines, oldLoc, newLines) {
	    // The character just after the location occupied by oldNode.
	    var charAfterOldLoc = oldLines.charAt(oldLoc.end);
	
	    var newLastPos = newLines.lastPos();
	
	    // Last character of the reprinted node.
	    var newLastChar = newLines.prevPos(newLastPos) &&
	        newLines.charAt(newLastPos);
	
	    return newLastChar &&
	        riskyAdjoiningCharExp.test(newLastChar) &&
	        charAfterOldLoc &&
	        riskyAdjoiningCharExp.test(charAfterOldLoc);
	}
	
	function findReprints(newPath, reprints) {
	    var newNode = newPath.getValue();
	    Printable.assert(newNode);
	
	    var oldNode = newNode.original;
	    Printable.assert(oldNode);
	
	    assert.deepEqual(reprints, []);
	
	    if (newNode.type !== oldNode.type) {
	        return false;
	    }
	
	    var oldPath = new FastPath(oldNode);
	    var canReprint = findChildReprints(newPath, oldPath, reprints);
	
	    if (!canReprint) {
	        // Make absolutely sure the calling code does not attempt to reprint
	        // any nodes.
	        reprints.length = 0;
	    }
	
	    return canReprint;
	}
	
	function findAnyReprints(newPath, oldPath, reprints) {
	    var newNode = newPath.getValue();
	    var oldNode = oldPath.getValue();
	
	    if (newNode === oldNode)
	        return true;
	
	    if (isArray.check(newNode))
	        return findArrayReprints(newPath, oldPath, reprints);
	
	    if (isObject.check(newNode))
	        return findObjectReprints(newPath, oldPath, reprints);
	
	    return false;
	}
	
	function findArrayReprints(newPath, oldPath, reprints) {
	    var newNode = newPath.getValue();
	    var oldNode = oldPath.getValue();
	    isArray.assert(newNode);
	    var len = newNode.length;
	
	    if (!(isArray.check(oldNode) &&
	          oldNode.length === len))
	        return false;
	
	    for (var i = 0; i < len; ++i) {
	        newPath.stack.push(i, newNode[i]);
	        oldPath.stack.push(i, oldNode[i]);
	        var canReprint = findAnyReprints(newPath, oldPath, reprints);
	        newPath.stack.length -= 2;
	        oldPath.stack.length -= 2;
	        if (!canReprint) {
	            return false;
	        }
	    }
	
	    return true;
	}
	
	function findObjectReprints(newPath, oldPath, reprints) {
	    var newNode = newPath.getValue();
	    isObject.assert(newNode);
	
	    if (newNode.original === null) {
	        // If newNode.original node was set to null, reprint the node.
	        return false;
	    }
	
	    var oldNode = oldPath.getValue();
	    if (!isObject.check(oldNode))
	        return false;
	
	    if (Printable.check(newNode)) {
	        if (!Printable.check(oldNode)) {
	            return false;
	        }
	
	        // Here we need to decide whether the reprinted code for newNode
	        // is appropriate for patching into the location of oldNode.
	
	        if (newNode.type === oldNode.type) {
	            var childReprints = [];
	
	            if (findChildReprints(newPath, oldPath, childReprints)) {
	                reprints.push.apply(reprints, childReprints);
	            } else if (oldNode.loc) {
	                // If we have no .loc information for oldNode, then we
	                // won't be able to reprint it.
	                reprints.push({
	                    oldPath: oldPath.copy(),
	                    newPath: newPath.copy()
	                });
	            } else {
	                return false;
	            }
	
	            return true;
	        }
	
	        if (Expression.check(newNode) &&
	            Expression.check(oldNode) &&
	            // If we have no .loc information for oldNode, then we won't
	            // be able to reprint it.
	            oldNode.loc) {
	
	            // If both nodes are subtypes of Expression, then we should be
	            // able to fill the location occupied by the old node with
	            // code printed for the new node with no ill consequences.
	            reprints.push({
	                oldPath: oldPath.copy(),
	                newPath: newPath.copy()
	            });
	
	            return true;
	        }
	
	        // The nodes have different types, and at least one of the types
	        // is not a subtype of the Expression type, so we cannot safely
	        // assume the nodes are syntactically interchangeable.
	        return false;
	    }
	
	    return findChildReprints(newPath, oldPath, reprints);
	}
	
	// This object is reused in hasOpeningParen and hasClosingParen to avoid
	// having to allocate a temporary object.
	var reusablePos = { line: 1, column: 0 };
	var nonSpaceExp = /\S/;
	
	function hasOpeningParen(oldPath) {
	    var oldNode = oldPath.getValue();
	    var loc = oldNode.loc;
	    var lines = loc && loc.lines;
	
	    if (lines) {
	        var pos = reusablePos;
	        pos.line = loc.start.line;
	        pos.column = loc.start.column;
	
	        while (lines.prevPos(pos)) {
	            var ch = lines.charAt(pos);
	
	            if (ch === "(") {
	                // If we found an opening parenthesis but it occurred before
	                // the start of the original subtree for this reprinting, then
	                // we must not return true for hasOpeningParen(oldPath).
	                return comparePos(oldPath.getRootValue().loc.start, pos) <= 0;
	            }
	
	            if (nonSpaceExp.test(ch)) {
	                return false;
	            }
	        }
	    }
	
	    return false;
	}
	
	function hasClosingParen(oldPath) {
	    var oldNode = oldPath.getValue();
	    var loc = oldNode.loc;
	    var lines = loc && loc.lines;
	
	    if (lines) {
	        var pos = reusablePos;
	        pos.line = loc.end.line;
	        pos.column = loc.end.column;
	
	        do {
	            var ch = lines.charAt(pos);
	
	            if (ch === ")") {
	                // If we found a closing parenthesis but it occurred after the
	                // end of the original subtree for this reprinting, then we
	                // must not return true for hasClosingParen(oldPath).
	                return comparePos(pos, oldPath.getRootValue().loc.end) <= 0;
	            }
	
	            if (nonSpaceExp.test(ch)) {
	                return false;
	            }
	
	        } while (lines.nextPos(pos));
	    }
	
	    return false;
	}
	
	function hasParens(oldPath) {
	    // This logic can technically be fooled if the node has parentheses
	    // but there are comments intervening between the parentheses and the
	    // node. In such cases the node will be harmlessly wrapped in an
	    // additional layer of parentheses.
	    return hasOpeningParen(oldPath) && hasClosingParen(oldPath);
	}
	
	function findChildReprints(newPath, oldPath, reprints) {
	    var newNode = newPath.getValue();
	    var oldNode = oldPath.getValue();
	
	    isObject.assert(newNode);
	    isObject.assert(oldNode);
	
	    if (newNode.original === null) {
	        // If newNode.original node was set to null, reprint the node.
	        return false;
	    }
	
	    // If this type of node cannot come lexically first in its enclosing
	    // statement (e.g. a function expression or object literal), and it
	    // seems to be doing so, then the only way we can ignore this problem
	    // and save ourselves from falling back to the pretty printer is if an
	    // opening parenthesis happens to precede the node.  For example,
	    // (function(){ ... }()); does not need to be reprinted, even though
	    // the FunctionExpression comes lexically first in the enclosing
	    // ExpressionStatement and fails the hasParens test, because the
	    // parent CallExpression passes the hasParens test. If we relied on
	    // the path.needsParens() && !hasParens(oldNode) check below, the
	    // absence of a closing parenthesis after the FunctionExpression would
	    // trigger pretty-printing unnecessarily.
	    if (!newPath.canBeFirstInStatement() &&
	        newPath.firstInStatement() &&
	        !hasOpeningParen(oldPath))
	        return false;
	
	    // If this node needs parentheses and will not be wrapped with
	    // parentheses when reprinted, then return false to skip reprinting
	    // and let it be printed generically.
	    if (newPath.needsParens(true) && !hasParens(oldPath)) {
	        return false;
	    }
	
	    for (var k in util.getUnionOfKeys(newNode, oldNode)) {
	        if (k === "loc")
	            continue;
	
	        newPath.stack.push(k, types.getFieldValue(newNode, k));
	        oldPath.stack.push(k, types.getFieldValue(oldNode, k));
	        var canReprint = findAnyReprints(newPath, oldPath, reprints);
	        newPath.stack.length -= 2;
	        oldPath.stack.length -= 2;
	
	        if (!canReprint) {
	            return false;
	        }
	    }
	
	    return true;
	}


/***/ },

/***/ "./node_modules/recast/lib/lines.js":
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var sourceMap = __webpack_require__("./node_modules/source-map/source-map.js");
	var normalizeOptions = __webpack_require__("./node_modules/recast/lib/options.js").normalize;
	var secretKey = __webpack_require__("./node_modules/private/private.js").makeUniqueKey();
	var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var isString = types.builtInTypes.string;
	var comparePos = __webpack_require__("./node_modules/recast/lib/util.js").comparePos;
	var Mapping = __webpack_require__("./node_modules/recast/lib/mapping.js");
	
	// Goals:
	// 1. Minimize new string creation.
	// 2. Keep (de)identation O(lines) time.
	// 3. Permit negative indentations.
	// 4. Enforce immutability.
	// 5. No newline characters.
	
	function getSecret(lines) {
	    return lines[secretKey];
	}
	
	function Lines(infos, sourceFileName) {
	    assert.ok(this instanceof Lines);
	    assert.ok(infos.length > 0);
	
	    if (sourceFileName) {
	        isString.assert(sourceFileName);
	    } else {
	        sourceFileName = null;
	    }
	
	    Object.defineProperty(this, secretKey, {
	        value: {
	            infos: infos,
	            mappings: [],
	            name: sourceFileName,
	            cachedSourceMap: null
	        }
	    });
	
	    if (sourceFileName) {
	        getSecret(this).mappings.push(new Mapping(this, {
	            start: this.firstPos(),
	            end: this.lastPos()
	        }));
	    }
	}
	
	// Exposed for instanceof checks. The fromString function should be used
	// to create new Lines objects.
	exports.Lines = Lines;
	var Lp = Lines.prototype;
	
	// These properties used to be assigned to each new object in the Lines
	// constructor, but we can more efficiently stuff them into the secret and
	// let these lazy accessors compute their values on-the-fly.
	Object.defineProperties(Lp, {
	    length: {
	        get: function() {
	            return getSecret(this).infos.length;
	        }
	    },
	
	    name: {
	        get: function() {
	            return getSecret(this).name;
	        }
	    }
	});
	
	function copyLineInfo(info) {
	    return {
	        line: info.line,
	        indent: info.indent,
	        locked: info.locked,
	        sliceStart: info.sliceStart,
	        sliceEnd: info.sliceEnd
	    };
	}
	
	var fromStringCache = {};
	var hasOwn = fromStringCache.hasOwnProperty;
	var maxCacheKeyLen = 10;
	
	function countSpaces(spaces, tabWidth) {
	    var count = 0;
	    var len = spaces.length;
	
	    for (var i = 0; i < len; ++i) {
	        switch (spaces.charCodeAt(i)) {
	        case 9: // '\t'
	            assert.strictEqual(typeof tabWidth, "number");
	            assert.ok(tabWidth > 0);
	
	            var next = Math.ceil(count / tabWidth) * tabWidth;
	            if (next === count) {
	                count += tabWidth;
	            } else {
	                count = next;
	            }
	
	            break;
	
	        case 11: // '\v'
	        case 12: // '\f'
	        case 13: // '\r'
	        case 0xfeff: // zero-width non-breaking space
	            // These characters contribute nothing to indentation.
	            break;
	
	        case 32: // ' '
	        default: // Treat all other whitespace like ' '.
	            count += 1;
	            break;
	        }
	    }
	
	    return count;
	}
	exports.countSpaces = countSpaces;
	
	var leadingSpaceExp = /^\s*/;
	
	// As specified here: http://www.ecma-international.org/ecma-262/6.0/#sec-line-terminators
	var lineTerminatorSeqExp =
	    /\u000D\u000A|\u000D(?!\u000A)|\u000A|\u2028|\u2029/;
	
	/**
	 * @param {Object} options - Options object that configures printing.
	 */
	function fromString(string, options) {
	    if (string instanceof Lines)
	        return string;
	
	    string += "";
	
	    var tabWidth = options && options.tabWidth;
	    var tabless = string.indexOf("\t") < 0;
	    var locked = !! (options && options.locked);
	    var cacheable = !options && tabless && (string.length <= maxCacheKeyLen);
	
	    assert.ok(tabWidth || tabless, "No tab width specified but encountered tabs in string\n" + string);
	
	    if (cacheable && hasOwn.call(fromStringCache, string))
	        return fromStringCache[string];
	
	    var lines = new Lines(string.split(lineTerminatorSeqExp).map(function(line) {
	        var spaces = leadingSpaceExp.exec(line)[0];
	        return {
	            line: line,
	            indent: countSpaces(spaces, tabWidth),
	            // Boolean indicating whether this line can be reindented.
	            locked: locked,
	            sliceStart: spaces.length,
	            sliceEnd: line.length
	        };
	    }), normalizeOptions(options).sourceFileName);
	
	    if (cacheable)
	        fromStringCache[string] = lines;
	
	    return lines;
	}
	exports.fromString = fromString;
	
	function isOnlyWhitespace(string) {
	    return !/\S/.test(string);
	}
	
	Lp.toString = function(options) {
	    return this.sliceString(this.firstPos(), this.lastPos(), options);
	};
	
	Lp.getSourceMap = function(sourceMapName, sourceRoot) {
	    if (!sourceMapName) {
	        // Although we could make up a name or generate an anonymous
	        // source map, instead we assume that any consumer who does not
	        // provide a name does not actually want a source map.
	        return null;
	    }
	
	    var targetLines = this;
	
	    function updateJSON(json) {
	        json = json || {};
	
	        isString.assert(sourceMapName);
	        json.file = sourceMapName;
	
	        if (sourceRoot) {
	            isString.assert(sourceRoot);
	            json.sourceRoot = sourceRoot;
	        }
	
	        return json;
	    }
	
	    var secret = getSecret(targetLines);
	    if (secret.cachedSourceMap) {
	        // Since Lines objects are immutable, we can reuse any source map
	        // that was previously generated. Nevertheless, we return a new
	        // JSON object here to protect the cached source map from outside
	        // modification.
	        return updateJSON(secret.cachedSourceMap.toJSON());
	    }
	
	    var smg = new sourceMap.SourceMapGenerator(updateJSON());
	    var sourcesToContents = {};
	
	    secret.mappings.forEach(function(mapping) {
	        var sourceCursor = mapping.sourceLines.skipSpaces(
	            mapping.sourceLoc.start
	        ) || mapping.sourceLines.lastPos();
	
	        var targetCursor = targetLines.skipSpaces(
	            mapping.targetLoc.start
	        ) || targetLines.lastPos();
	
	        while (comparePos(sourceCursor, mapping.sourceLoc.end) < 0 &&
	               comparePos(targetCursor, mapping.targetLoc.end) < 0) {
	
	            var sourceChar = mapping.sourceLines.charAt(sourceCursor);
	            var targetChar = targetLines.charAt(targetCursor);
	            assert.strictEqual(sourceChar, targetChar);
	
	            var sourceName = mapping.sourceLines.name;
	
	            // Add mappings one character at a time for maximum resolution.
	            smg.addMapping({
	                source: sourceName,
	                original: { line: sourceCursor.line,
	                            column: sourceCursor.column },
	                generated: { line: targetCursor.line,
	                             column: targetCursor.column }
	            });
	
	            if (!hasOwn.call(sourcesToContents, sourceName)) {
	                var sourceContent = mapping.sourceLines.toString();
	                smg.setSourceContent(sourceName, sourceContent);
	                sourcesToContents[sourceName] = sourceContent;
	            }
	
	            targetLines.nextPos(targetCursor, true);
	            mapping.sourceLines.nextPos(sourceCursor, true);
	        }
	    });
	
	    secret.cachedSourceMap = smg;
	
	    return smg.toJSON();
	};
	
	Lp.bootstrapCharAt = function(pos) {
	    assert.strictEqual(typeof pos, "object");
	    assert.strictEqual(typeof pos.line, "number");
	    assert.strictEqual(typeof pos.column, "number");
	
	    var line = pos.line,
	        column = pos.column,
	        strings = this.toString().split(lineTerminatorSeqExp),
	        string = strings[line - 1];
	
	    if (typeof string === "undefined")
	        return "";
	
	    if (column === string.length &&
	        line < strings.length)
	        return "\n";
	
	    if (column >= string.length)
	        return "";
	
	    return string.charAt(column);
	};
	
	Lp.charAt = function(pos) {
	    assert.strictEqual(typeof pos, "object");
	    assert.strictEqual(typeof pos.line, "number");
	    assert.strictEqual(typeof pos.column, "number");
	
	    var line = pos.line,
	        column = pos.column,
	        secret = getSecret(this),
	        infos = secret.infos,
	        info = infos[line - 1],
	        c = column;
	
	    if (typeof info === "undefined" || c < 0)
	        return "";
	
	    var indent = this.getIndentAt(line);
	    if (c < indent)
	        return " ";
	
	    c += info.sliceStart - indent;
	
	    if (c === info.sliceEnd &&
	        line < this.length)
	        return "\n";
	
	    if (c >= info.sliceEnd)
	        return "";
	
	    return info.line.charAt(c);
	};
	
	Lp.stripMargin = function(width, skipFirstLine) {
	    if (width === 0)
	        return this;
	
	    assert.ok(width > 0, "negative margin: " + width);
	
	    if (skipFirstLine && this.length === 1)
	        return this;
	
	    var secret = getSecret(this);
	
	    var lines = new Lines(secret.infos.map(function(info, i) {
	        if (info.line && (i > 0 || !skipFirstLine)) {
	            info = copyLineInfo(info);
	            info.indent = Math.max(0, info.indent - width);
	        }
	        return info;
	    }));
	
	    if (secret.mappings.length > 0) {
	        var newMappings = getSecret(lines).mappings;
	        assert.strictEqual(newMappings.length, 0);
	        secret.mappings.forEach(function(mapping) {
	            newMappings.push(mapping.indent(width, skipFirstLine, true));
	        });
	    }
	
	    return lines;
	};
	
	Lp.indent = function(by) {
	    if (by === 0)
	        return this;
	
	    var secret = getSecret(this);
	
	    var lines = new Lines(secret.infos.map(function(info) {
	        if (info.line && ! info.locked) {
	            info = copyLineInfo(info);
	            info.indent += by;
	        }
	        return info
	    }));
	
	    if (secret.mappings.length > 0) {
	        var newMappings = getSecret(lines).mappings;
	        assert.strictEqual(newMappings.length, 0);
	        secret.mappings.forEach(function(mapping) {
	            newMappings.push(mapping.indent(by));
	        });
	    }
	
	    return lines;
	};
	
	Lp.indentTail = function(by) {
	    if (by === 0)
	        return this;
	
	    if (this.length < 2)
	        return this;
	
	    var secret = getSecret(this);
	
	    var lines = new Lines(secret.infos.map(function(info, i) {
	        if (i > 0 && info.line && ! info.locked) {
	            info = copyLineInfo(info);
	            info.indent += by;
	        }
	
	        return info;
	    }));
	
	    if (secret.mappings.length > 0) {
	        var newMappings = getSecret(lines).mappings;
	        assert.strictEqual(newMappings.length, 0);
	        secret.mappings.forEach(function(mapping) {
	            newMappings.push(mapping.indent(by, true));
	        });
	    }
	
	    return lines;
	};
	
	Lp.lockIndentTail = function () {
	    if (this.length < 2) {
	        return this;
	    }
	
	    var infos = getSecret(this).infos;
	
	    return new Lines(infos.map(function (info, i) {
	        info = copyLineInfo(info);
	        info.locked = i > 0;
	        return info;
	    }));
	};
	
	Lp.getIndentAt = function(line) {
	    assert.ok(line >= 1, "no line " + line + " (line numbers start from 1)");
	    var secret = getSecret(this),
	        info = secret.infos[line - 1];
	    return Math.max(info.indent, 0);
	};
	
	Lp.guessTabWidth = function() {
	    var secret = getSecret(this);
	    if (hasOwn.call(secret, "cachedTabWidth")) {
	        return secret.cachedTabWidth;
	    }
	
	    var counts = []; // Sparse array.
	    var lastIndent = 0;
	
	    for (var line = 1, last = this.length; line <= last; ++line) {
	        var info = secret.infos[line - 1];
	        var sliced = info.line.slice(info.sliceStart, info.sliceEnd);
	
	        // Whitespace-only lines don't tell us much about the likely tab
	        // width of this code.
	        if (isOnlyWhitespace(sliced)) {
	            continue;
	        }
	
	        var diff = Math.abs(info.indent - lastIndent);
	        counts[diff] = ~~counts[diff] + 1;
	        lastIndent = info.indent;
	    }
	
	    var maxCount = -1;
	    var result = 2;
	
	    for (var tabWidth = 1;
	         tabWidth < counts.length;
	         tabWidth += 1) {
	        if (hasOwn.call(counts, tabWidth) &&
	            counts[tabWidth] > maxCount) {
	            maxCount = counts[tabWidth];
	            result = tabWidth;
	        }
	    }
	
	    return secret.cachedTabWidth = result;
	};
	
	Lp.isOnlyWhitespace = function() {
	    return isOnlyWhitespace(this.toString());
	};
	
	Lp.isPrecededOnlyByWhitespace = function(pos) {
	    var secret = getSecret(this);
	    var info = secret.infos[pos.line - 1];
	    var indent = Math.max(info.indent, 0);
	
	    var diff = pos.column - indent;
	    if (diff <= 0) {
	        // If pos.column does not exceed the indentation amount, then
	        // there must be only whitespace before it.
	        return true;
	    }
	
	    var start = info.sliceStart;
	    var end = Math.min(start + diff, info.sliceEnd);
	    var prefix = info.line.slice(start, end);
	
	    return isOnlyWhitespace(prefix);
	};
	
	Lp.getLineLength = function(line) {
	    var secret = getSecret(this),
	        info = secret.infos[line - 1];
	    return this.getIndentAt(line) + info.sliceEnd - info.sliceStart;
	};
	
	Lp.nextPos = function(pos, skipSpaces) {
	    var l = Math.max(pos.line, 0),
	        c = Math.max(pos.column, 0);
	
	    if (c < this.getLineLength(l)) {
	        pos.column += 1;
	
	        return skipSpaces
	            ? !!this.skipSpaces(pos, false, true)
	            : true;
	    }
	
	    if (l < this.length) {
	        pos.line += 1;
	        pos.column = 0;
	
	        return skipSpaces
	            ? !!this.skipSpaces(pos, false, true)
	            : true;
	    }
	
	    return false;
	};
	
	Lp.prevPos = function(pos, skipSpaces) {
	    var l = pos.line,
	        c = pos.column;
	
	    if (c < 1) {
	        l -= 1;
	
	        if (l < 1)
	            return false;
	
	        c = this.getLineLength(l);
	
	    } else {
	        c = Math.min(c - 1, this.getLineLength(l));
	    }
	
	    pos.line = l;
	    pos.column = c;
	
	    return skipSpaces
	        ? !!this.skipSpaces(pos, true, true)
	        : true;
	};
	
	Lp.firstPos = function() {
	    // Trivial, but provided for completeness.
	    return { line: 1, column: 0 };
	};
	
	Lp.lastPos = function() {
	    return {
	        line: this.length,
	        column: this.getLineLength(this.length)
	    };
	};
	
	Lp.skipSpaces = function(pos, backward, modifyInPlace) {
	    if (pos) {
	        pos = modifyInPlace ? pos : {
	            line: pos.line,
	            column: pos.column
	        };
	    } else if (backward) {
	        pos = this.lastPos();
	    } else {
	        pos = this.firstPos();
	    }
	
	    if (backward) {
	        while (this.prevPos(pos)) {
	            if (!isOnlyWhitespace(this.charAt(pos)) &&
	                this.nextPos(pos)) {
	                return pos;
	            }
	        }
	
	        return null;
	
	    } else {
	        while (isOnlyWhitespace(this.charAt(pos))) {
	            if (!this.nextPos(pos)) {
	                return null;
	            }
	        }
	
	        return pos;
	    }
	};
	
	Lp.trimLeft = function() {
	    var pos = this.skipSpaces(this.firstPos(), false, true);
	    return pos ? this.slice(pos) : emptyLines;
	};
	
	Lp.trimRight = function() {
	    var pos = this.skipSpaces(this.lastPos(), true, true);
	    return pos ? this.slice(this.firstPos(), pos) : emptyLines;
	};
	
	Lp.trim = function() {
	    var start = this.skipSpaces(this.firstPos(), false, true);
	    if (start === null)
	        return emptyLines;
	
	    var end = this.skipSpaces(this.lastPos(), true, true);
	    assert.notStrictEqual(end, null);
	
	    return this.slice(start, end);
	};
	
	Lp.eachPos = function(callback, startPos, skipSpaces) {
	    var pos = this.firstPos();
	
	    if (startPos) {
	        pos.line = startPos.line,
	        pos.column = startPos.column
	    }
	
	    if (skipSpaces && !this.skipSpaces(pos, false, true)) {
	        return; // Encountered nothing but spaces.
	    }
	
	    do callback.call(this, pos);
	    while (this.nextPos(pos, skipSpaces));
	};
	
	Lp.bootstrapSlice = function(start, end) {
	    var strings = this.toString().split(
	        lineTerminatorSeqExp
	    ).slice(
	        start.line - 1,
	        end.line
	    );
	
	    strings.push(strings.pop().slice(0, end.column));
	    strings[0] = strings[0].slice(start.column);
	
	    return fromString(strings.join("\n"));
	};
	
	Lp.slice = function(start, end) {
	    if (!end) {
	        if (!start) {
	            // The client seems to want a copy of this Lines object, but
	            // Lines objects are immutable, so it's perfectly adequate to
	            // return the same object.
	            return this;
	        }
	
	        // Slice to the end if no end position was provided.
	        end = this.lastPos();
	    }
	
	    var secret = getSecret(this);
	    var sliced = secret.infos.slice(start.line - 1, end.line);
	
	    if (start.line === end.line) {
	        sliced[0] = sliceInfo(sliced[0], start.column, end.column);
	    } else {
	        assert.ok(start.line < end.line);
	        sliced[0] = sliceInfo(sliced[0], start.column);
	        sliced.push(sliceInfo(sliced.pop(), 0, end.column));
	    }
	
	    var lines = new Lines(sliced);
	
	    if (secret.mappings.length > 0) {
	        var newMappings = getSecret(lines).mappings;
	        assert.strictEqual(newMappings.length, 0);
	        secret.mappings.forEach(function(mapping) {
	            var sliced = mapping.slice(this, start, end);
	            if (sliced) {
	                newMappings.push(sliced);
	            }
	        }, this);
	    }
	
	    return lines;
	};
	
	function sliceInfo(info, startCol, endCol) {
	    var sliceStart = info.sliceStart;
	    var sliceEnd = info.sliceEnd;
	    var indent = Math.max(info.indent, 0);
	    var lineLength = indent + sliceEnd - sliceStart;
	
	    if (typeof endCol === "undefined") {
	        endCol = lineLength;
	    }
	
	    startCol = Math.max(startCol, 0);
	    endCol = Math.min(endCol, lineLength);
	    endCol = Math.max(endCol, startCol);
	
	    if (endCol < indent) {
	        indent = endCol;
	        sliceEnd = sliceStart;
	    } else {
	        sliceEnd -= lineLength - endCol;
	    }
	
	    lineLength = endCol;
	    lineLength -= startCol;
	
	    if (startCol < indent) {
	        indent -= startCol;
	    } else {
	        startCol -= indent;
	        indent = 0;
	        sliceStart += startCol;
	    }
	
	    assert.ok(indent >= 0);
	    assert.ok(sliceStart <= sliceEnd);
	    assert.strictEqual(lineLength, indent + sliceEnd - sliceStart);
	
	    if (info.indent === indent &&
	        info.sliceStart === sliceStart &&
	        info.sliceEnd === sliceEnd) {
	        return info;
	    }
	
	    return {
	        line: info.line,
	        indent: indent,
	        // A destructive slice always unlocks indentation.
	        locked: false,
	        sliceStart: sliceStart,
	        sliceEnd: sliceEnd
	    };
	}
	
	Lp.bootstrapSliceString = function(start, end, options) {
	    return this.slice(start, end).toString(options);
	};
	
	Lp.sliceString = function(start, end, options) {
	    if (!end) {
	        if (!start) {
	            // The client seems to want a copy of this Lines object, but
	            // Lines objects are immutable, so it's perfectly adequate to
	            // return the same object.
	            return this;
	        }
	
	        // Slice to the end if no end position was provided.
	        end = this.lastPos();
	    }
	
	    options = normalizeOptions(options);
	
	    var infos = getSecret(this).infos;
	    var parts = [];
	    var tabWidth = options.tabWidth;
	
	    for (var line = start.line; line <= end.line; ++line) {
	        var info = infos[line - 1];
	
	        if (line === start.line) {
	            if (line === end.line) {
	                info = sliceInfo(info, start.column, end.column);
	            } else {
	                info = sliceInfo(info, start.column);
	            }
	        } else if (line === end.line) {
	            info = sliceInfo(info, 0, end.column);
	        }
	
	        var indent = Math.max(info.indent, 0);
	
	        var before = info.line.slice(0, info.sliceStart);
	        if (options.reuseWhitespace &&
	            isOnlyWhitespace(before) &&
	            countSpaces(before, options.tabWidth) === indent) {
	            // Reuse original spaces if the indentation is correct.
	            parts.push(info.line.slice(0, info.sliceEnd));
	            continue;
	        }
	
	        var tabs = 0;
	        var spaces = indent;
	
	        if (options.useTabs) {
	            tabs = Math.floor(indent / tabWidth);
	            spaces -= tabs * tabWidth;
	        }
	
	        var result = "";
	
	        if (tabs > 0) {
	            result += new Array(tabs + 1).join("\t");
	        }
	
	        if (spaces > 0) {
	            result += new Array(spaces + 1).join(" ");
	        }
	
	        result += info.line.slice(info.sliceStart, info.sliceEnd);
	
	        parts.push(result);
	    }
	
	    return parts.join(options.lineTerminator);
	};
	
	Lp.isEmpty = function() {
	    return this.length < 2 && this.getLineLength(1) < 1;
	};
	
	Lp.join = function(elements) {
	    var separator = this;
	    var separatorSecret = getSecret(separator);
	    var infos = [];
	    var mappings = [];
	    var prevInfo;
	
	    function appendSecret(secret) {
	        if (secret === null)
	            return;
	
	        if (prevInfo) {
	            var info = secret.infos[0];
	            var indent = new Array(info.indent + 1).join(" ");
	            var prevLine = infos.length;
	            var prevColumn = Math.max(prevInfo.indent, 0) +
	                prevInfo.sliceEnd - prevInfo.sliceStart;
	
	            prevInfo.line = prevInfo.line.slice(
	                0, prevInfo.sliceEnd) + indent + info.line.slice(
	                    info.sliceStart, info.sliceEnd);
	
	            // If any part of a line is indentation-locked, the whole line
	            // will be indentation-locked.
	            prevInfo.locked = prevInfo.locked || info.locked;
	
	            prevInfo.sliceEnd = prevInfo.line.length;
	
	            if (secret.mappings.length > 0) {
	                secret.mappings.forEach(function(mapping) {
	                    mappings.push(mapping.add(prevLine, prevColumn));
	                });
	            }
	
	        } else if (secret.mappings.length > 0) {
	            mappings.push.apply(mappings, secret.mappings);
	        }
	
	        secret.infos.forEach(function(info, i) {
	            if (!prevInfo || i > 0) {
	                prevInfo = copyLineInfo(info);
	                infos.push(prevInfo);
	            }
	        });
	    }
	
	    function appendWithSeparator(secret, i) {
	        if (i > 0)
	            appendSecret(separatorSecret);
	        appendSecret(secret);
	    }
	
	    elements.map(function(elem) {
	        var lines = fromString(elem);
	        if (lines.isEmpty())
	            return null;
	        return getSecret(lines);
	    }).forEach(separator.isEmpty()
	               ? appendSecret
	               : appendWithSeparator);
	
	    if (infos.length < 1)
	        return emptyLines;
	
	    var lines = new Lines(infos);
	
	    getSecret(lines).mappings = mappings;
	
	    return lines;
	};
	
	exports.concat = function(elements) {
	    return emptyLines.join(elements);
	};
	
	Lp.concat = function(other) {
	    var args = arguments,
	        list = [this];
	    list.push.apply(list, args);
	    assert.strictEqual(list.length, args.length + 1);
	    return emptyLines.join(list);
	};
	
	// The emptyLines object needs to be created all the way down here so that
	// Lines.prototype will be fully populated.
	var emptyLines = fromString("");


/***/ },

/***/ "./node_modules/recast/lib/options.js":
/***/ function(module, exports, __webpack_require__) {

	var defaults = {
	    // If you want to use a different branch of esprima, or any other
	    // module that supports a .parse function, pass that module object to
	    // recast.parse as options.parser (legacy synonym: options.esprima).
	    parser: __webpack_require__("./node_modules/esprima/esprima.js"),
	
	    // Number of spaces the pretty-printer should use per tab for
	    // indentation. If you do not pass this option explicitly, it will be
	    // (quite reliably!) inferred from the original code.
	    tabWidth: 4,
	
	    // If you really want the pretty-printer to use tabs instead of
	    // spaces, make this option true.
	    useTabs: false,
	
	    // The reprinting code leaves leading whitespace untouched unless it
	    // has to reindent a line, or you pass false for this option.
	    reuseWhitespace: true,
	
	    // Override this option to use a different line terminator, e.g. \r\n.
	    lineTerminator: __webpack_require__("./node_modules/os-browserify/browser.js").EOL,
	
	    // Some of the pretty-printer code (such as that for printing function
	    // parameter lists) makes a valiant attempt to prevent really long
	    // lines. You can adjust the limit by changing this option; however,
	    // there is no guarantee that line length will fit inside this limit.
	    wrapColumn: 74, // Aspirational for now.
	
	    // Pass a string as options.sourceFileName to recast.parse to tell the
	    // reprinter to keep track of reused code so that it can construct a
	    // source map automatically.
	    sourceFileName: null,
	
	    // Pass a string as options.sourceMapName to recast.print, and
	    // (provided you passed options.sourceFileName earlier) the
	    // PrintResult of recast.print will have a .map property for the
	    // generated source map.
	    sourceMapName: null,
	
	    // If provided, this option will be passed along to the source map
	    // generator as a root directory for relative source file paths.
	    sourceRoot: null,
	
	    // If you provide a source map that was generated from a previous call
	    // to recast.print as options.inputSourceMap, the old source map will
	    // be composed with the new source map.
	    inputSourceMap: null,
	
	    // If you want esprima to generate .range information (recast only
	    // uses .loc internally), pass true for this option.
	    range: false,
	
	    // If you want esprima not to throw exceptions when it encounters
	    // non-fatal errors, keep this option true.
	    tolerant: true,
	
	    // If you want to override the quotes used in string literals, specify
	    // either "single", "double", or "auto" here ("auto" will select the one
	    // which results in the shorter literal)
	    // Otherwise, double quotes are used.
	    quote: null,
	
	    // If you want to print trailing commas in object literals,
	    // array expressions, functions calls and function definitions pass true
	    // for this option.
	    trailingComma: false,
	}, hasOwn = defaults.hasOwnProperty;
	
	// Copy options and fill in default values.
	exports.normalize = function(options) {
	    options = options || defaults;
	
	    function get(key) {
	        return hasOwn.call(options, key)
	            ? options[key]
	            : defaults[key];
	    }
	
	    return {
	        tabWidth: +get("tabWidth"),
	        useTabs: !!get("useTabs"),
	        reuseWhitespace: !!get("reuseWhitespace"),
	        lineTerminator: get("lineTerminator"),
	        wrapColumn: Math.max(get("wrapColumn"), 0),
	        sourceFileName: get("sourceFileName"),
	        sourceMapName: get("sourceMapName"),
	        sourceRoot: get("sourceRoot"),
	        inputSourceMap: get("inputSourceMap"),
	        parser: get("esprima") || get("parser"),
	        range: get("range"),
	        tolerant: get("tolerant"),
	        quote: get("quote"),
	        trailingComma: get("trailingComma"),
	    };
	};


/***/ },

/***/ "./node_modules/recast/lib/util.js":
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var getFieldValue = types.getFieldValue;
	var n = types.namedTypes;
	var sourceMap = __webpack_require__("./node_modules/source-map/source-map.js");
	var SourceMapConsumer = sourceMap.SourceMapConsumer;
	var SourceMapGenerator = sourceMap.SourceMapGenerator;
	var hasOwn = Object.prototype.hasOwnProperty;
	var util = exports;
	
	function getUnionOfKeys() {
	  var result = {};
	  var argc = arguments.length;
	  for (var i = 0; i < argc; ++i) {
	    var keys = Object.keys(arguments[i]);
	    var keyCount = keys.length;
	    for (var j = 0; j < keyCount; ++j) {
	      result[keys[j]] = true;
	    }
	  }
	  return result;
	}
	util.getUnionOfKeys = getUnionOfKeys;
	
	function comparePos(pos1, pos2) {
	  return (pos1.line - pos2.line) || (pos1.column - pos2.column);
	}
	util.comparePos = comparePos;
	
	function copyPos(pos) {
	  return {
	    line: pos.line,
	    column: pos.column
	  };
	}
	util.copyPos = copyPos;
	
	util.composeSourceMaps = function(formerMap, latterMap) {
	  if (formerMap) {
	    if (!latterMap) {
	      return formerMap;
	    }
	  } else {
	    return latterMap || null;
	  }
	
	  var smcFormer = new SourceMapConsumer(formerMap);
	  var smcLatter = new SourceMapConsumer(latterMap);
	  var smg = new SourceMapGenerator({
	    file: latterMap.file,
	    sourceRoot: latterMap.sourceRoot
	  });
	
	  var sourcesToContents = {};
	
	  smcLatter.eachMapping(function(mapping) {
	    var origPos = smcFormer.originalPositionFor({
	      line: mapping.originalLine,
	      column: mapping.originalColumn
	    });
	
	    var sourceName = origPos.source;
	    if (sourceName === null) {
	      return;
	    }
	
	    smg.addMapping({
	      source: sourceName,
	      original: copyPos(origPos),
	      generated: {
	        line: mapping.generatedLine,
	        column: mapping.generatedColumn
	      },
	      name: mapping.name
	    });
	
	    var sourceContent = smcFormer.sourceContentFor(sourceName);
	    if (sourceContent && !hasOwn.call(sourcesToContents, sourceName)) {
	      sourcesToContents[sourceName] = sourceContent;
	      smg.setSourceContent(sourceName, sourceContent);
	    }
	  });
	
	  return smg.toJSON();
	};
	
	util.getTrueLoc = function(node, lines) {
	  // It's possible that node is newly-created (not parsed by Esprima),
	  // in which case it probably won't have a .loc property (or an
	  // .original property for that matter). That's fine; we'll just
	  // pretty-print it as usual.
	  if (!node.loc) {
	    return null;
	  }
	
	  var result = {
	    start: node.loc.start,
	    end: node.loc.end
	  };
	
	  function include(node) {
	    expandLoc(result, node.loc);
	  }
	
	  // If the node has any comments, their locations might contribute to
	  // the true start/end positions of the node.
	  if (node.comments) {
	    node.comments.forEach(include);
	  }
	
	  // If the node is an export declaration and its .declaration has any
	  // decorators, their locations might contribute to the true start/end
	  // positions of the export declaration node.
	  if (util.isExportDeclaration(node) &&
	      node.declaration.decorators) {
	    node.declaration.decorators.forEach(include);
	  }
	
	  if (comparePos(result.start, result.end) < 0) {
	    // Trim leading whitespace.
	    result.start = copyPos(result.start);
	    lines.skipSpaces(result.start, false, true);
	
	    if (comparePos(result.start, result.end) < 0) {
	      // Trim trailing whitespace, if the end location is not already the
	      // same as the start location.
	      result.end = copyPos(result.end);
	      lines.skipSpaces(result.end, true, true);
	    }
	  }
	
	  return result;
	};
	
	function expandLoc(parentLoc, childLoc) {
	  if (parentLoc && childLoc) {
	    if (comparePos(childLoc.start, parentLoc.start) < 0) {
	      parentLoc.start = childLoc.start;
	    }
	
	    if (comparePos(parentLoc.end, childLoc.end) < 0) {
	      parentLoc.end = childLoc.end;
	    }
	  }
	}
	
	util.fixFaultyLocations = function(node, lines) {
	  var loc = node.loc;
	  if (loc) {
	    if (loc.start.line < 1) {
	      loc.start.line = 1;
	    }
	
	    if (loc.end.line < 1) {
	      loc.end.line = 1;
	    }
	  }
	
	  if (node.type === "TemplateLiteral") {
	    fixTemplateLiteral(node, lines);
	
	  } else if (loc && node.decorators) {
	    // Expand the .loc of the node responsible for printing the decorators
	    // (here, the decorated node) so that it includes node.decorators.
	    node.decorators.forEach(function (decorator) {
	      expandLoc(loc, decorator.loc);
	    });
	
	  } else if (node.declaration && util.isExportDeclaration(node)) {
	    // Nullify .loc information for the child declaration so that we never
	    // try to reprint it without also reprinting the export declaration.
	    node.declaration.loc = null;
	
	    // Expand the .loc of the node responsible for printing the decorators
	    // (here, the export declaration) so that it includes node.decorators.
	    var decorators = node.declaration.decorators;
	    if (decorators) {
	      decorators.forEach(function (decorator) {
	        expandLoc(loc, decorator.loc);
	      });
	    }
	
	  } else if ((n.MethodDefinition && n.MethodDefinition.check(node)) ||
	             (n.Property.check(node) && (node.method || node.shorthand))) {
	    // If the node is a MethodDefinition or a .method or .shorthand
	    // Property, then the location information stored in
	    // node.value.loc is very likely untrustworthy (just the {body}
	    // part of a method, or nothing in the case of shorthand
	    // properties), so we null out that information to prevent
	    // accidental reuse of bogus source code during reprinting.
	    node.value.loc = null;
	
	    if (n.FunctionExpression.check(node.value)) {
	      // FunctionExpression method values should be anonymous,
	      // because their .id fields are ignored anyway.
	      node.value.id = null;
	    }
	  }
	};
	
	function fixTemplateLiteral(node, lines) {
	  assert.strictEqual(node.type, "TemplateLiteral");
	
	  if (node.quasis.length === 0) {
	    // If there are no quasi elements, then there is nothing to fix.
	    return;
	  }
	
	  // First we need to exclude the opening ` from the .loc of the first
	  // quasi element, in case the parser accidentally decided to include it.
	  var afterLeftBackTickPos = copyPos(node.loc.start);
	  assert.strictEqual(lines.charAt(afterLeftBackTickPos), "`");
	  assert.ok(lines.nextPos(afterLeftBackTickPos));
	  var firstQuasi = node.quasis[0];
	  if (comparePos(firstQuasi.loc.start, afterLeftBackTickPos) < 0) {
	    firstQuasi.loc.start = afterLeftBackTickPos;
	  }
	
	  // Next we need to exclude the closing ` from the .loc of the last quasi
	  // element, in case the parser accidentally decided to include it.
	  var rightBackTickPos = copyPos(node.loc.end);
	  assert.ok(lines.prevPos(rightBackTickPos));
	  assert.strictEqual(lines.charAt(rightBackTickPos), "`");
	  var lastQuasi = node.quasis[node.quasis.length - 1];
	  if (comparePos(rightBackTickPos, lastQuasi.loc.end) < 0) {
	    lastQuasi.loc.end = rightBackTickPos;
	  }
	
	  // Now we need to exclude ${ and } characters from the .loc's of all
	  // quasi elements, since some parsers accidentally include them.
	  node.expressions.forEach(function (expr, i) {
	    // Rewind from expr.loc.start over any whitespace and the ${ that
	    // precedes the expression. The position of the $ should be the same
	    // as the .loc.end of the preceding quasi element, but some parsers
	    // accidentally include the ${ in the .loc of the quasi element.
	    var dollarCurlyPos = lines.skipSpaces(expr.loc.start, true, false);
	    if (lines.prevPos(dollarCurlyPos) &&
	        lines.charAt(dollarCurlyPos) === "{" &&
	        lines.prevPos(dollarCurlyPos) &&
	        lines.charAt(dollarCurlyPos) === "$") {
	      var quasiBefore = node.quasis[i];
	      if (comparePos(dollarCurlyPos, quasiBefore.loc.end) < 0) {
	        quasiBefore.loc.end = dollarCurlyPos;
	      }
	    }
	
	    // Likewise, some parsers accidentally include the } that follows
	    // the expression in the .loc of the following quasi element.
	    var rightCurlyPos = lines.skipSpaces(expr.loc.end, false, false);
	    if (lines.charAt(rightCurlyPos) === "}") {
	      assert.ok(lines.nextPos(rightCurlyPos));
	      // Now rightCurlyPos is technically the position just after the }.
	      var quasiAfter = node.quasis[i + 1];
	      if (comparePos(quasiAfter.loc.start, rightCurlyPos) < 0) {
	        quasiAfter.loc.start = rightCurlyPos;
	      }
	    }
	  });
	}
	
	util.isExportDeclaration = function (node) {
	  if (node) switch (node.type) {
	  case "ExportDeclaration":
	  case "ExportDefaultSpecifier":
	  case "DeclareExportDeclaration":
	  case "ExportNamedDeclaration":
	  case "ExportAllDeclaration":
	    return true;
	  }
	
	  return false;
	};
	
	util.getParentExportDeclaration = function (path) {
	  var parentNode = path.getParentNode();
	  if (path.getName() === "declaration" &&
	      util.isExportDeclaration(parentNode)) {
	    return parentNode;
	  }
	
	  return null;
	};


/***/ },

/***/ "./node_modules/recast/lib/mapping.js":
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var isString = types.builtInTypes.string;
	var isNumber = types.builtInTypes.number;
	var SourceLocation = types.namedTypes.SourceLocation;
	var Position = types.namedTypes.Position;
	var linesModule = __webpack_require__("./node_modules/recast/lib/lines.js");
	var comparePos = __webpack_require__("./node_modules/recast/lib/util.js").comparePos;
	
	function Mapping(sourceLines, sourceLoc, targetLoc) {
	    assert.ok(this instanceof Mapping);
	    assert.ok(sourceLines instanceof linesModule.Lines);
	    SourceLocation.assert(sourceLoc);
	
	    if (targetLoc) {
	        // In certain cases it's possible for targetLoc.{start,end}.column
	        // values to be negative, which technically makes them no longer
	        // valid SourceLocation nodes, so we need to be more forgiving.
	        assert.ok(
	            isNumber.check(targetLoc.start.line) &&
	            isNumber.check(targetLoc.start.column) &&
	            isNumber.check(targetLoc.end.line) &&
	            isNumber.check(targetLoc.end.column)
	        );
	    } else {
	        // Assume identity mapping if no targetLoc specified.
	        targetLoc = sourceLoc;
	    }
	
	    Object.defineProperties(this, {
	        sourceLines: { value: sourceLines },
	        sourceLoc: { value: sourceLoc },
	        targetLoc: { value: targetLoc }
	    });
	}
	
	var Mp = Mapping.prototype;
	module.exports = Mapping;
	
	Mp.slice = function(lines, start, end) {
	    assert.ok(lines instanceof linesModule.Lines);
	    Position.assert(start);
	
	    if (end) {
	        Position.assert(end);
	    } else {
	        end = lines.lastPos();
	    }
	
	    var sourceLines = this.sourceLines;
	    var sourceLoc = this.sourceLoc;
	    var targetLoc = this.targetLoc;
	
	    function skip(name) {
	        var sourceFromPos = sourceLoc[name];
	        var targetFromPos = targetLoc[name];
	        var targetToPos = start;
	
	        if (name === "end") {
	            targetToPos = end;
	        } else {
	            assert.strictEqual(name, "start");
	        }
	
	        return skipChars(
	            sourceLines, sourceFromPos,
	            lines, targetFromPos, targetToPos
	        );
	    }
	
	    if (comparePos(start, targetLoc.start) <= 0) {
	        if (comparePos(targetLoc.end, end) <= 0) {
	            targetLoc = {
	                start: subtractPos(targetLoc.start, start.line, start.column),
	                end: subtractPos(targetLoc.end, start.line, start.column)
	            };
	
	            // The sourceLoc can stay the same because the contents of the
	            // targetLoc have not changed.
	
	        } else if (comparePos(end, targetLoc.start) <= 0) {
	            return null;
	
	        } else {
	            sourceLoc = {
	                start: sourceLoc.start,
	                end: skip("end")
	            };
	
	            targetLoc = {
	                start: subtractPos(targetLoc.start, start.line, start.column),
	                end: subtractPos(end, start.line, start.column)
	            };
	        }
	
	    } else {
	        if (comparePos(targetLoc.end, start) <= 0) {
	            return null;
	        }
	
	        if (comparePos(targetLoc.end, end) <= 0) {
	            sourceLoc = {
	                start: skip("start"),
	                end: sourceLoc.end
	            };
	
	            targetLoc = {
	                // Same as subtractPos(start, start.line, start.column):
	                start: { line: 1, column: 0 },
	                end: subtractPos(targetLoc.end, start.line, start.column)
	            };
	
	        } else {
	            sourceLoc = {
	                start: skip("start"),
	                end: skip("end")
	            };
	
	            targetLoc = {
	                // Same as subtractPos(start, start.line, start.column):
	                start: { line: 1, column: 0 },
	                end: subtractPos(end, start.line, start.column)
	            };
	        }
	    }
	
	    return new Mapping(this.sourceLines, sourceLoc, targetLoc);
	};
	
	Mp.add = function(line, column) {
	    return new Mapping(this.sourceLines, this.sourceLoc, {
	        start: addPos(this.targetLoc.start, line, column),
	        end: addPos(this.targetLoc.end, line, column)
	    });
	};
	
	function addPos(toPos, line, column) {
	    return {
	        line: toPos.line + line - 1,
	        column: (toPos.line === 1)
	            ? toPos.column + column
	            : toPos.column
	    };
	}
	
	Mp.subtract = function(line, column) {
	    return new Mapping(this.sourceLines, this.sourceLoc, {
	        start: subtractPos(this.targetLoc.start, line, column),
	        end: subtractPos(this.targetLoc.end, line, column)
	    });
	};
	
	function subtractPos(fromPos, line, column) {
	    return {
	        line: fromPos.line - line + 1,
	        column: (fromPos.line === line)
	            ? fromPos.column - column
	            : fromPos.column
	    };
	}
	
	Mp.indent = function(by, skipFirstLine, noNegativeColumns) {
	    if (by === 0) {
	        return this;
	    }
	
	    var targetLoc = this.targetLoc;
	    var startLine = targetLoc.start.line;
	    var endLine = targetLoc.end.line;
	
	    if (skipFirstLine && startLine === 1 && endLine === 1) {
	        return this;
	    }
	
	    targetLoc = {
	        start: targetLoc.start,
	        end: targetLoc.end
	    };
	
	    if (!skipFirstLine || startLine > 1) {
	        var startColumn = targetLoc.start.column + by;
	        targetLoc.start = {
	            line: startLine,
	            column: noNegativeColumns
	                ? Math.max(0, startColumn)
	                : startColumn
	        };
	    }
	
	    if (!skipFirstLine || endLine > 1) {
	        var endColumn = targetLoc.end.column + by;
	        targetLoc.end = {
	            line: endLine,
	            column: noNegativeColumns
	                ? Math.max(0, endColumn)
	                : endColumn
	        };
	    }
	
	    return new Mapping(this.sourceLines, this.sourceLoc, targetLoc);
	};
	
	function skipChars(
	    sourceLines, sourceFromPos,
	    targetLines, targetFromPos, targetToPos
	) {
	    assert.ok(sourceLines instanceof linesModule.Lines);
	    assert.ok(targetLines instanceof linesModule.Lines);
	    Position.assert(sourceFromPos);
	    Position.assert(targetFromPos);
	    Position.assert(targetToPos);
	
	    var targetComparison = comparePos(targetFromPos, targetToPos);
	    if (targetComparison === 0) {
	        // Trivial case: no characters to skip.
	        return sourceFromPos;
	    }
	
	    if (targetComparison < 0) {
	        // Skipping forward.
	
	        var sourceCursor = sourceLines.skipSpaces(sourceFromPos);
	        var targetCursor = targetLines.skipSpaces(targetFromPos);
	
	        var lineDiff = targetToPos.line - targetCursor.line;
	        sourceCursor.line += lineDiff;
	        targetCursor.line += lineDiff;
	
	        if (lineDiff > 0) {
	            // If jumping to later lines, reset columns to the beginnings
	            // of those lines.
	            sourceCursor.column = 0;
	            targetCursor.column = 0;
	        } else {
	            assert.strictEqual(lineDiff, 0);
	        }
	
	        while (comparePos(targetCursor, targetToPos) < 0 &&
	               targetLines.nextPos(targetCursor, true)) {
	            assert.ok(sourceLines.nextPos(sourceCursor, true));
	            assert.strictEqual(
	                sourceLines.charAt(sourceCursor),
	                targetLines.charAt(targetCursor)
	            );
	        }
	
	    } else {
	        // Skipping backward.
	
	        var sourceCursor = sourceLines.skipSpaces(sourceFromPos, true);
	        var targetCursor = targetLines.skipSpaces(targetFromPos, true);
	
	        var lineDiff = targetToPos.line - targetCursor.line;
	        sourceCursor.line += lineDiff;
	        targetCursor.line += lineDiff;
	
	        if (lineDiff < 0) {
	            // If jumping to earlier lines, reset columns to the ends of
	            // those lines.
	            sourceCursor.column = sourceLines.getLineLength(sourceCursor.line);
	            targetCursor.column = targetLines.getLineLength(targetCursor.line);
	        } else {
	            assert.strictEqual(lineDiff, 0);
	        }
	
	        while (comparePos(targetToPos, targetCursor) < 0 &&
	               targetLines.prevPos(targetCursor, true)) {
	            assert.ok(sourceLines.prevPos(sourceCursor, true));
	            assert.strictEqual(
	                sourceLines.charAt(sourceCursor),
	                targetLines.charAt(targetCursor)
	            );
	        }
	    }
	
	    return sourceCursor;
	}


/***/ },

/***/ "./node_modules/recast/lib/fast-path.js":
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var n = types.namedTypes;
	var Node = n.Node;
	var isArray = types.builtInTypes.array;
	var isNumber = types.builtInTypes.number;
	
	function FastPath(value) {
	    assert.ok(this instanceof FastPath);
	    this.stack = [value];
	}
	
	var FPp = FastPath.prototype;
	module.exports = FastPath;
	
	// Static convenience function for coercing a value to a FastPath.
	FastPath.from = function(obj) {
	    if (obj instanceof FastPath) {
	        // Return a defensive copy of any existing FastPath instances.
	        return obj.copy();
	    }
	
	    if (obj instanceof types.NodePath) {
	        // For backwards compatibility, unroll NodePath instances into
	        // lightweight FastPath [..., name, value] stacks.
	        var copy = Object.create(FastPath.prototype);
	        var stack = [obj.value];
	        for (var pp; (pp = obj.parentPath); obj = pp)
	            stack.push(obj.name, pp.value);
	        copy.stack = stack.reverse();
	        return copy;
	    }
	
	    // Otherwise use obj as the value of the new FastPath instance.
	    return new FastPath(obj);
	};
	
	FPp.copy = function copy() {
	    var copy = Object.create(FastPath.prototype);
	    copy.stack = this.stack.slice(0);
	    return copy;
	};
	
	// The name of the current property is always the penultimate element of
	// this.stack, and always a String.
	FPp.getName = function getName() {
	    var s = this.stack;
	    var len = s.length;
	    if (len > 1) {
	        return s[len - 2];
	    }
	    // Since the name is always a string, null is a safe sentinel value to
	    // return if we do not know the name of the (root) value.
	    return null;
	};
	
	// The value of the current property is always the final element of
	// this.stack.
	FPp.getValue = function getValue() {
	    var s = this.stack;
	    return s[s.length - 1];
	};
	
	function getNodeHelper(path, count) {
	    var s = path.stack;
	
	    for (var i = s.length - 1; i >= 0; i -= 2) {
	        var value = s[i];
	        if (n.Node.check(value) && --count < 0) {
	            return value;
	        }
	    }
	
	    return null;
	}
	
	FPp.getNode = function getNode(count) {
	    return getNodeHelper(this, ~~count);
	};
	
	FPp.getParentNode = function getParentNode(count) {
	    return getNodeHelper(this, ~~count + 1);
	};
	
	// The length of the stack can be either even or odd, depending on whether
	// or not we have a name for the root value. The difference between the
	// index of the root value and the index of the final value is always
	// even, though, which allows us to return the root value in constant time
	// (i.e. without iterating backwards through the stack).
	FPp.getRootValue = function getRootValue() {
	    var s = this.stack;
	    if (s.length % 2 === 0) {
	        return s[1];
	    }
	    return s[0];
	};
	
	// Temporarily push properties named by string arguments given after the
	// callback function onto this.stack, then call the callback with a
	// reference to this (modified) FastPath object. Note that the stack will
	// be restored to its original state after the callback is finished, so it
	// is probably a mistake to retain a reference to the path.
	FPp.call = function call(callback/*, name1, name2, ... */) {
	    var s = this.stack;
	    var origLen = s.length;
	    var value = s[origLen - 1];
	    var argc = arguments.length;
	    for (var i = 1; i < argc; ++i) {
	        var name = arguments[i];
	        value = value[name];
	        s.push(name, value);
	    }
	    var result = callback(this);
	    s.length = origLen;
	    return result;
	};
	
	// Similar to FastPath.prototype.call, except that the value obtained by
	// accessing this.getValue()[name1][name2]... should be array-like. The
	// callback will be called with a reference to this path object for each
	// element of the array.
	FPp.each = function each(callback/*, name1, name2, ... */) {
	    var s = this.stack;
	    var origLen = s.length;
	    var value = s[origLen - 1];
	    var argc = arguments.length;
	
	    for (var i = 1; i < argc; ++i) {
	        var name = arguments[i];
	        value = value[name];
	        s.push(name, value);
	    }
	
	    for (var i = 0; i < value.length; ++i) {
	        if (i in value) {
	            s.push(i, value[i]);
	            // If the callback needs to know the value of i, call
	            // path.getName(), assuming path is the parameter name.
	            callback(this);
	            s.length -= 2;
	        }
	    }
	
	    s.length = origLen;
	};
	
	// Similar to FastPath.prototype.each, except that the results of the
	// callback function invocations are stored in an array and returned at
	// the end of the iteration.
	FPp.map = function map(callback/*, name1, name2, ... */) {
	    var s = this.stack;
	    var origLen = s.length;
	    var value = s[origLen - 1];
	    var argc = arguments.length;
	
	    for (var i = 1; i < argc; ++i) {
	        var name = arguments[i];
	        value = value[name];
	        s.push(name, value);
	    }
	
	    var result = new Array(value.length);
	
	    for (var i = 0; i < value.length; ++i) {
	        if (i in value) {
	            s.push(i, value[i]);
	            result[i] = callback(this, i);
	            s.length -= 2;
	        }
	    }
	
	    s.length = origLen;
	
	    return result;
	};
	
	// Inspired by require("ast-types").NodePath.prototype.needsParens, but
	// more efficient because we're iterating backwards through a stack.
	FPp.needsParens = function(assumeExpressionContext) {
	    var parent = this.getParentNode();
	    if (!parent) {
	        return false;
	    }
	
	    var name = this.getName();
	    var node = this.getNode();
	
	    // If the value of this path is some child of a Node and not a Node
	    // itself, then it doesn't need parentheses. Only Node objects (in
	    // fact, only Expression nodes) need parentheses.
	    if (this.getValue() !== node) {
	        return false;
	    }
	
	    // Only expressions need parentheses.
	    if (!n.Expression.check(node)) {
	        return false;
	    }
	
	    // Identifiers never need parentheses.
	    if (node.type === "Identifier") {
	        return false;
	    }
	
	    if (parent.type === "ParenthesizedExpression") {
	        return false;
	    }
	
	    switch (node.type) {
	    case "UnaryExpression":
	    case "SpreadElement":
	    case "SpreadProperty":
	        return parent.type === "MemberExpression"
	            && name === "object"
	            && parent.object === node;
	
	    case "BinaryExpression":
	    case "LogicalExpression":
	        switch (parent.type) {
	        case "CallExpression":
	            return name === "callee"
	                && parent.callee === node;
	
	        case "UnaryExpression":
	        case "SpreadElement":
	        case "SpreadProperty":
	            return true;
	
	        case "MemberExpression":
	            return name === "object"
	                && parent.object === node;
	
	        case "BinaryExpression":
	        case "LogicalExpression":
	            var po = parent.operator;
	            var pp = PRECEDENCE[po];
	            var no = node.operator;
	            var np = PRECEDENCE[no];
	
	            if (pp > np) {
	                return true;
	            }
	
	            if (pp === np && name === "right") {
	                assert.strictEqual(parent.right, node);
	                return true;
	            }
	
	        default:
	            return false;
	        }
	
	    case "SequenceExpression":
	        switch (parent.type) {
	        case "ForStatement":
	            // Although parentheses wouldn't hurt around sequence
	            // expressions in the head of for loops, traditional style
	            // dictates that e.g. i++, j++ should not be wrapped with
	            // parentheses.
	            return false;
	
	        case "ExpressionStatement":
	            return name !== "expression";
	
	        default:
	            // Otherwise err on the side of overparenthesization, adding
	            // explicit exceptions above if this proves overzealous.
	            return true;
	        }
	
	    case "YieldExpression":
	        switch (parent.type) {
	        case "BinaryExpression":
	        case "LogicalExpression":
	        case "UnaryExpression":
	        case "SpreadElement":
	        case "SpreadProperty":
	        case "CallExpression":
	        case "MemberExpression":
	        case "NewExpression":
	        case "ConditionalExpression":
	        case "YieldExpression":
	            return true;
	
	        default:
	            return false;
	        }
	
	    case "Literal":
	        return parent.type === "MemberExpression"
	            && isNumber.check(node.value)
	            && name === "object"
	            && parent.object === node;
	
	    case "AssignmentExpression":
	    case "ConditionalExpression":
	        switch (parent.type) {
	        case "UnaryExpression":
	        case "SpreadElement":
	        case "SpreadProperty":
	        case "BinaryExpression":
	        case "LogicalExpression":
	            return true;
	
	        case "CallExpression":
	            return name === "callee"
	                && parent.callee === node;
	
	        case "ConditionalExpression":
	            return name === "test"
	                && parent.test === node;
	
	        case "MemberExpression":
	            return name === "object"
	                && parent.object === node;
	
	        default:
	            return false;
	        }
	
	    case "ArrowFunctionExpression":
	        if(parent.type === 'CallExpression' && 
	           name === 'callee') {
	            return true;
	        };
	
	        return isBinary(parent);
	
	    case "ObjectExpression":
	        if (parent.type === "ArrowFunctionExpression" &&
	            name === "body") {
	            return true;
	        }
	
	    default:
	        if (parent.type === "NewExpression" &&
	            name === "callee" &&
	            parent.callee === node) {
	            return containsCallExpression(node);
	        }
	    }
	
	    if (assumeExpressionContext !== true &&
	        !this.canBeFirstInStatement() &&
	        this.firstInStatement())
	        return true;
	
	    return false;
	};
	
	function isBinary(node) {
	    return n.BinaryExpression.check(node)
	        || n.LogicalExpression.check(node);
	}
	
	function isUnaryLike(node) {
	    return n.UnaryExpression.check(node)
	        // I considered making SpreadElement and SpreadProperty subtypes
	        // of UnaryExpression, but they're not really Expression nodes.
	        || (n.SpreadElement && n.SpreadElement.check(node))
	        || (n.SpreadProperty && n.SpreadProperty.check(node));
	}
	
	var PRECEDENCE = {};
	[["||"],
	 ["&&"],
	 ["|"],
	 ["^"],
	 ["&"],
	 ["==", "===", "!=", "!=="],
	 ["<", ">", "<=", ">=", "in", "instanceof"],
	 [">>", "<<", ">>>"],
	 ["+", "-"],
	 ["*", "/", "%"]
	].forEach(function(tier, i) {
	    tier.forEach(function(op) {
	        PRECEDENCE[op] = i;
	    });
	});
	
	function containsCallExpression(node) {
	    if (n.CallExpression.check(node)) {
	        return true;
	    }
	
	    if (isArray.check(node)) {
	        return node.some(containsCallExpression);
	    }
	
	    if (n.Node.check(node)) {
	        return types.someField(node, function(name, child) {
	            return containsCallExpression(child);
	        });
	    }
	
	    return false;
	}
	
	FPp.canBeFirstInStatement = function() {
	    var node = this.getNode();
	    return !n.FunctionExpression.check(node)
	        && !n.ObjectExpression.check(node);
	};
	
	FPp.firstInStatement = function() {
	    var s = this.stack;
	    var parentName, parent;
	    var childName, child;
	
	    for (var i = s.length - 1; i >= 0; i -= 2) {
	        if (n.Node.check(s[i])) {
	            childName = parentName;
	            child = parent;
	            parentName = s[i - 1];
	            parent = s[i];
	        }
	
	        if (!parent || !child) {
	            continue;
	        }
	
	        if (n.BlockStatement.check(parent) &&
	            parentName === "body" &&
	            childName === 0) {
	            assert.strictEqual(parent.body[0], child);
	            return true;
	        }
	
	        if (n.ExpressionStatement.check(parent) &&
	            childName === "expression") {
	            assert.strictEqual(parent.expression, child);
	            return true;
	        }
	
	        if (n.SequenceExpression.check(parent) &&
	            parentName === "expressions" &&
	            childName === 0) {
	            assert.strictEqual(parent.expressions[0], child);
	            continue;
	        }
	
	        if (n.CallExpression.check(parent) &&
	            childName === "callee") {
	            assert.strictEqual(parent.callee, child);
	            continue;
	        }
	
	        if (n.MemberExpression.check(parent) &&
	            childName === "object") {
	            assert.strictEqual(parent.object, child);
	            continue;
	        }
	
	        if (n.ConditionalExpression.check(parent) &&
	            childName === "test") {
	            assert.strictEqual(parent.test, child);
	            continue;
	        }
	
	        if (isBinary(parent) &&
	            childName === "left") {
	            assert.strictEqual(parent.left, child);
	            continue;
	        }
	
	        if (n.UnaryExpression.check(parent) &&
	            !parent.prefix &&
	            childName === "argument") {
	            assert.strictEqual(parent.argument, child);
	            continue;
	        }
	
	        return false;
	    }
	
	    return true;
	};


/***/ },

/***/ "./node_modules/recast/lib/comments.js":
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var n = types.namedTypes;
	var isArray = types.builtInTypes.array;
	var isObject = types.builtInTypes.object;
	var linesModule = __webpack_require__("./node_modules/recast/lib/lines.js");
	var fromString = linesModule.fromString;
	var Lines = linesModule.Lines;
	var concat = linesModule.concat;
	var util = __webpack_require__("./node_modules/recast/lib/util.js");
	var comparePos = util.comparePos;
	var childNodesCacheKey = __webpack_require__("./node_modules/private/private.js").makeUniqueKey();
	
	// TODO Move a non-caching implementation of this function into ast-types,
	// and implement a caching wrapper function here.
	function getSortedChildNodes(node, lines, resultArray) {
	    if (!node) {
	        return;
	    }
	
	    // The .loc checks below are sensitive to some of the problems that
	    // are fixed by this utility function. Specifically, if it decides to
	    // set node.loc to null, indicating that the node's .loc information
	    // is unreliable, then we don't want to add node to the resultArray.
	    util.fixFaultyLocations(node, lines);
	
	    if (resultArray) {
	        if (n.Node.check(node) &&
	            n.SourceLocation.check(node.loc)) {
	            // This reverse insertion sort almost always takes constant
	            // time because we almost always (maybe always?) append the
	            // nodes in order anyway.
	            for (var i = resultArray.length - 1; i >= 0; --i) {
	                if (comparePos(resultArray[i].loc.end,
	                               node.loc.start) <= 0) {
	                    break;
	                }
	            }
	            resultArray.splice(i + 1, 0, node);
	            return;
	        }
	    } else if (node[childNodesCacheKey]) {
	        return node[childNodesCacheKey];
	    }
	
	    var names;
	    if (isArray.check(node)) {
	        names = Object.keys(node);
	    } else if (isObject.check(node)) {
	        names = types.getFieldNames(node);
	    } else {
	        return;
	    }
	
	    if (!resultArray) {
	        Object.defineProperty(node, childNodesCacheKey, {
	            value: resultArray = [],
	            enumerable: false
	        });
	    }
	
	    for (var i = 0, nameCount = names.length; i < nameCount; ++i) {
	        getSortedChildNodes(node[names[i]], lines, resultArray);
	    }
	
	    return resultArray;
	}
	
	// As efficiently as possible, decorate the comment object with
	// .precedingNode, .enclosingNode, and/or .followingNode properties, at
	// least one of which is guaranteed to be defined.
	function decorateComment(node, comment, lines) {
	    var childNodes = getSortedChildNodes(node, lines);
	
	    // Time to dust off the old binary search robes and wizard hat.
	    var left = 0, right = childNodes.length;
	    while (left < right) {
	        var middle = (left + right) >> 1;
	        var child = childNodes[middle];
	
	        if (comparePos(child.loc.start, comment.loc.start) <= 0 &&
	            comparePos(comment.loc.end, child.loc.end) <= 0) {
	            // The comment is completely contained by this child node.
	            decorateComment(comment.enclosingNode = child, comment, lines);
	            return; // Abandon the binary search at this level.
	        }
	
	        if (comparePos(child.loc.end, comment.loc.start) <= 0) {
	            // This child node falls completely before the comment.
	            // Because we will never consider this node or any nodes
	            // before it again, this node must be the closest preceding
	            // node we have encountered so far.
	            var precedingNode = child;
	            left = middle + 1;
	            continue;
	        }
	
	        if (comparePos(comment.loc.end, child.loc.start) <= 0) {
	            // This child node falls completely after the comment.
	            // Because we will never consider this node or any nodes after
	            // it again, this node must be the closest following node we
	            // have encountered so far.
	            var followingNode = child;
	            right = middle;
	            continue;
	        }
	
	        throw new Error("Comment location overlaps with node location");
	    }
	
	    if (precedingNode) {
	        comment.precedingNode = precedingNode;
	    }
	
	    if (followingNode) {
	        comment.followingNode = followingNode;
	    }
	}
	
	exports.attach = function(comments, ast, lines) {
	    if (!isArray.check(comments)) {
	        return;
	    }
	
	    var tiesToBreak = [];
	
	    comments.forEach(function(comment) {
	        comment.loc.lines = lines;
	        decorateComment(ast, comment, lines);
	
	        var pn = comment.precedingNode;
	        var en = comment.enclosingNode;
	        var fn = comment.followingNode;
	
	        if (pn && fn) {
	            var tieCount = tiesToBreak.length;
	            if (tieCount > 0) {
	                var lastTie = tiesToBreak[tieCount - 1];
	
	                assert.strictEqual(
	                    lastTie.precedingNode === comment.precedingNode,
	                    lastTie.followingNode === comment.followingNode
	                );
	
	                if (lastTie.followingNode !== comment.followingNode) {
	                    breakTies(tiesToBreak, lines);
	                }
	            }
	
	            tiesToBreak.push(comment);
	
	        } else if (pn) {
	            // No contest: we have a trailing comment.
	            breakTies(tiesToBreak, lines);
	            addTrailingComment(pn, comment);
	
	        } else if (fn) {
	            // No contest: we have a leading comment.
	            breakTies(tiesToBreak, lines);
	            addLeadingComment(fn, comment);
	
	        } else if (en) {
	            // The enclosing node has no child nodes at all, so what we
	            // have here is a dangling comment, e.g. [/* crickets */].
	            breakTies(tiesToBreak, lines);
	            addDanglingComment(en, comment);
	
	        } else {
	            throw new Error("AST contains no nodes at all?");
	        }
	    });
	
	    breakTies(tiesToBreak, lines);
	
	    comments.forEach(function(comment) {
	        // These node references were useful for breaking ties, but we
	        // don't need them anymore, and they create cycles in the AST that
	        // may lead to infinite recursion if we don't delete them here.
	        delete comment.precedingNode;
	        delete comment.enclosingNode;
	        delete comment.followingNode;
	    });
	};
	
	function breakTies(tiesToBreak, lines) {
	    var tieCount = tiesToBreak.length;
	    if (tieCount === 0) {
	        return;
	    }
	
	    var pn = tiesToBreak[0].precedingNode;
	    var fn = tiesToBreak[0].followingNode;
	    var gapEndPos = fn.loc.start;
	
	    // Iterate backwards through tiesToBreak, examining the gaps
	    // between the tied comments. In order to qualify as leading, a
	    // comment must be separated from fn by an unbroken series of
	    // whitespace-only gaps (or other comments).
	    for (var indexOfFirstLeadingComment = tieCount;
	         indexOfFirstLeadingComment > 0;
	         --indexOfFirstLeadingComment) {
	        var comment = tiesToBreak[indexOfFirstLeadingComment - 1];
	        assert.strictEqual(comment.precedingNode, pn);
	        assert.strictEqual(comment.followingNode, fn);
	
	        var gap = lines.sliceString(comment.loc.end, gapEndPos);
	        if (/\S/.test(gap)) {
	            // The gap string contained something other than whitespace.
	            break;
	        }
	
	        gapEndPos = comment.loc.start;
	    }
	
	    while (indexOfFirstLeadingComment <= tieCount &&
	           (comment = tiesToBreak[indexOfFirstLeadingComment]) &&
	           // If the comment is a //-style comment and indented more
	           // deeply than the node itself, reconsider it as trailing.
	           (comment.type === "Line" || comment.type === "CommentLine") &&
	           comment.loc.start.column > fn.loc.start.column) {
	        ++indexOfFirstLeadingComment;
	    }
	
	    tiesToBreak.forEach(function(comment, i) {
	        if (i < indexOfFirstLeadingComment) {
	            addTrailingComment(pn, comment);
	        } else {
	            addLeadingComment(fn, comment);
	        }
	    });
	
	    tiesToBreak.length = 0;
	}
	
	function addCommentHelper(node, comment) {
	    var comments = node.comments || (node.comments = []);
	    comments.push(comment);
	}
	
	function addLeadingComment(node, comment) {
	    comment.leading = true;
	    comment.trailing = false;
	    addCommentHelper(node, comment);
	}
	
	function addDanglingComment(node, comment) {
	    comment.leading = false;
	    comment.trailing = false;
	    addCommentHelper(node, comment);
	}
	
	function addTrailingComment(node, comment) {
	    comment.leading = false;
	    comment.trailing = true;
	    addCommentHelper(node, comment);
	}
	
	function printLeadingComment(commentPath, print) {
	    var comment = commentPath.getValue();
	    n.Comment.assert(comment);
	
	    var loc = comment.loc;
	    var lines = loc && loc.lines;
	    var parts = [print(commentPath)];
	
	    if (comment.trailing) {
	        // When we print trailing comments as leading comments, we don't
	        // want to bring any trailing spaces along.
	        parts.push("\n");
	
	    } else if (lines instanceof Lines) {
	        var trailingSpace = lines.slice(
	            loc.end,
	            lines.skipSpaces(loc.end)
	        );
	
	        if (trailingSpace.length === 1) {
	            // If the trailing space contains no newlines, then we want to
	            // preserve it exactly as we found it.
	            parts.push(trailingSpace);
	        } else {
	            // If the trailing space contains newlines, then replace it
	            // with just that many newlines, with all other spaces removed.
	            parts.push(new Array(trailingSpace.length).join("\n"));
	        }
	
	    } else {
	        parts.push("\n");
	    }
	
	    return concat(parts);
	}
	
	function printTrailingComment(commentPath, print) {
	    var comment = commentPath.getValue(commentPath);
	    n.Comment.assert(comment);
	
	    var loc = comment.loc;
	    var lines = loc && loc.lines;
	    var parts = [];
	
	    if (lines instanceof Lines) {
	        var fromPos = lines.skipSpaces(loc.start, true) || lines.firstPos();
	        var leadingSpace = lines.slice(fromPos, loc.start);
	
	        if (leadingSpace.length === 1) {
	            // If the leading space contains no newlines, then we want to
	            // preserve it exactly as we found it.
	            parts.push(leadingSpace);
	        } else {
	            // If the leading space contains newlines, then replace it
	            // with just that many newlines, sans all other spaces.
	            parts.push(new Array(leadingSpace.length).join("\n"));
	        }
	    }
	
	    parts.push(print(commentPath));
	
	    return concat(parts);
	}
	
	exports.printComments = function(path, print) {
	    var value = path.getValue();
	    var innerLines = print(path);
	    var comments = n.Node.check(value) &&
	        types.getFieldValue(value, "comments");
	
	    if (!comments || comments.length === 0) {
	        return innerLines;
	    }
	
	    var leadingParts = [];
	    var trailingParts = [innerLines];
	
	    path.each(function(commentPath) {
	        var comment = commentPath.getValue();
	        var leading = types.getFieldValue(comment, "leading");
	        var trailing = types.getFieldValue(comment, "trailing");
	
	        if (leading || (trailing && !(n.Statement.check(value) ||
	                                      comment.type === "Block" ||
	                                      comment.type === "CommentBlock"))) {
	            leadingParts.push(printLeadingComment(commentPath, print));
	        } else if (trailing) {
	            trailingParts.push(printTrailingComment(commentPath, print));
	        }
	    }, "comments");
	
	    leadingParts.push.apply(leadingParts, trailingParts);
	    return concat(leadingParts);
	};


/***/ },

/***/ "./node_modules/recast/lib/printer.js":
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var sourceMap = __webpack_require__("./node_modules/source-map/source-map.js");
	var printComments = __webpack_require__("./node_modules/recast/lib/comments.js").printComments;
	var linesModule = __webpack_require__("./node_modules/recast/lib/lines.js");
	var fromString = linesModule.fromString;
	var concat = linesModule.concat;
	var normalizeOptions = __webpack_require__("./node_modules/recast/lib/options.js").normalize;
	var getReprinter = __webpack_require__("./node_modules/recast/lib/patcher.js").getReprinter;
	var types = __webpack_require__("./node_modules/recast/lib/types.js");
	var namedTypes = types.namedTypes;
	var isString = types.builtInTypes.string;
	var isObject = types.builtInTypes.object;
	var FastPath = __webpack_require__("./node_modules/recast/lib/fast-path.js");
	var util = __webpack_require__("./node_modules/recast/lib/util.js");
	
	function PrintResult(code, sourceMap) {
	    assert.ok(this instanceof PrintResult);
	
	    isString.assert(code);
	    this.code = code;
	
	    if (sourceMap) {
	        isObject.assert(sourceMap);
	        this.map = sourceMap;
	    }
	}
	
	var PRp = PrintResult.prototype;
	var warnedAboutToString = false;
	
	PRp.toString = function() {
	    if (!warnedAboutToString) {
	        console.warn(
	            "Deprecation warning: recast.print now returns an object with " +
	            "a .code property. You appear to be treating the object as a " +
	            "string, which might still work but is strongly discouraged."
	        );
	
	        warnedAboutToString = true;
	    }
	
	    return this.code;
	};
	
	var emptyPrintResult = new PrintResult("");
	
	function Printer(originalOptions) {
	    assert.ok(this instanceof Printer);
	
	    var explicitTabWidth = originalOptions && originalOptions.tabWidth;
	    var options = normalizeOptions(originalOptions);
	    assert.notStrictEqual(options, originalOptions);
	
	    // It's common for client code to pass the same options into both
	    // recast.parse and recast.print, but the Printer doesn't need (and
	    // can be confused by) options.sourceFileName, so we null it out.
	    options.sourceFileName = null;
	
	    function printWithComments(path) {
	        assert.ok(path instanceof FastPath);
	        return printComments(path, print);
	    }
	
	    function print(path, includeComments) {
	        if (includeComments)
	            return printWithComments(path);
	
	        assert.ok(path instanceof FastPath);
	
	        if (!explicitTabWidth) {
	            var oldTabWidth = options.tabWidth;
	            var loc = path.getNode().loc;
	            if (loc && loc.lines && loc.lines.guessTabWidth) {
	                options.tabWidth = loc.lines.guessTabWidth();
	                var lines = maybeReprint(path);
	                options.tabWidth = oldTabWidth;
	                return lines;
	            }
	        }
	
	        return maybeReprint(path);
	    }
	
	    function maybeReprint(path) {
	        var reprinter = getReprinter(path);
	        if (reprinter) {
	            // Since the print function that we pass to the reprinter will
	            // be used to print "new" nodes, it's tempting to think we
	            // should pass printRootGenerically instead of print, to avoid
	            // calling maybeReprint again, but that would be a mistake
	            // because the new nodes might not be entirely new, but merely
	            // moved from elsewhere in the AST. The print function is the
	            // right choice because it gives us the opportunity to reprint
	            // such nodes using their original source.
	            return maybeAddParens(path, reprinter(print));
	        }
	        return printRootGenerically(path);
	    }
	
	    // Print the root node generically, but then resume reprinting its
	    // children non-generically.
	    function printRootGenerically(path, includeComments) {
	        return includeComments
	            ? printComments(path, printRootGenerically)
	            : genericPrint(path, options, printWithComments);
	    }
	
	    // Print the entire AST generically.
	    function printGenerically(path) {
	        return genericPrint(path, options, printGenerically);
	    }
	
	    this.print = function(ast) {
	        if (!ast) {
	            return emptyPrintResult;
	        }
	
	        var lines = print(FastPath.from(ast), true);
	
	        return new PrintResult(
	            lines.toString(options),
	            util.composeSourceMaps(
	                options.inputSourceMap,
	                lines.getSourceMap(
	                    options.sourceMapName,
	                    options.sourceRoot
	                )
	            )
	        );
	    };
	
	    this.printGenerically = function(ast) {
	        if (!ast) {
	            return emptyPrintResult;
	        }
	
	        var path = FastPath.from(ast);
	        var oldReuseWhitespace = options.reuseWhitespace;
	
	        // Do not reuse whitespace (or anything else, for that matter)
	        // when printing generically.
	        options.reuseWhitespace = false;
	
	        // TODO Allow printing of comments?
	        var pr = new PrintResult(printGenerically(path).toString(options));
	        options.reuseWhitespace = oldReuseWhitespace;
	        return pr;
	    };
	}
	
	exports.Printer = Printer;
	
	function maybeAddParens(path, lines) {
	    return path.needsParens() ? concat(["(", lines, ")"]) : lines;
	}
	
	function genericPrint(path, options, printPath) {
	    assert.ok(path instanceof FastPath);
	
	    var node = path.getValue();
	    var parts = [];
	    var needsParens = false;
	    var linesWithoutParens =
	        genericPrintNoParens(path, options, printPath);
	
	    if (! node || linesWithoutParens.isEmpty()) {
	        return linesWithoutParens;
	    }
	
	    if (node.decorators &&
	        node.decorators.length > 0 &&
	        // If the parent node is an export declaration, it will be
	        // responsible for printing node.decorators.
	        ! util.getParentExportDeclaration(path)) {
	
	        path.each(function(decoratorPath) {
	            parts.push(printPath(decoratorPath), "\n");
	        }, "decorators");
	
	    } else if (util.isExportDeclaration(node) &&
	               node.declaration &&
	               node.declaration.decorators) {
	        // Export declarations are responsible for printing any decorators
	        // that logically apply to node.declaration.
	        path.each(function(decoratorPath) {
	            parts.push(printPath(decoratorPath), "\n");
	        }, "declaration", "decorators");
	
	    } else {
	        // Nodes with decorators can't have parentheses, so we can avoid
	        // computing path.needsParens() except in this case.
	        needsParens = path.needsParens();
	    }
	
	    if (needsParens) {
	        parts.unshift("(");
	    }
	
	    parts.push(linesWithoutParens);
	
	    if (needsParens) {
	        parts.push(")");
	    }
	
	    return concat(parts);
	}
	
	function genericPrintNoParens(path, options, print) {
	    var n = path.getValue();
	
	    if (!n) {
	        return fromString("");
	    }
	
	    if (typeof n === "string") {
	        return fromString(n, options);
	    }
	
	    namedTypes.Printable.assert(n);
	
	    switch (n.type) {
	    case "File":
	        return path.call(print, "program");
	
	    case "Program":
	        return path.call(function(bodyPath) {
	            return printStatementSequence(bodyPath, options, print);
	        }, "body");
	
	    case "Noop": // Babel extension.
	    case "EmptyStatement":
	        return fromString("");
	
	    case "ExpressionStatement":
	        return concat([path.call(print, "expression"), ";"]);
	
	    case "ParenthesizedExpression": // Babel extension.
	        return concat(["(", path.call(print, "expression"), ")"]);
	
	    case "BinaryExpression":
	    case "LogicalExpression":
	    case "AssignmentExpression":
	        return fromString(" ").join([
	            path.call(print, "left"),
	            n.operator,
	            path.call(print, "right")
	        ]);
	
	    case "AssignmentPattern":
	        return concat([
	            path.call(print, "left"),
	            "=",
	            path.call(print, "right")
	        ]);
	
	    case "MemberExpression":
	        var parts = [path.call(print, "object")];
	
	        var property = path.call(print, "property");
	        if (n.computed) {
	            parts.push("[", property, "]");
	        } else {
	            parts.push(".", property);
	        }
	
	        return concat(parts);
	
	    case "MetaProperty":
	        return concat([
	            path.call(print, "meta"),
	            ".",
	            path.call(print, "property")
	        ]);
	
	    case "BindExpression":
	        var parts = [];
	
	        if (n.object) {
	            parts.push(path.call(print, "object"));
	        }
	
	        parts.push("::", path.call(print, "callee"));
	
	        return concat(parts);
	
	    case "Path":
	        return fromString(".").join(n.body);
	
	    case "Identifier":
	        return concat([
	            fromString(n.name, options),
	            path.call(print, "typeAnnotation")
	        ]);
	
	    case "SpreadElement":
	    case "SpreadElementPattern":
	    case "SpreadProperty":
	    case "SpreadPropertyPattern":
	    case "RestElement":
	        return concat(["...", path.call(print, "argument")]);
	
	    case "FunctionDeclaration":
	    case "FunctionExpression":
	        var parts = [];
	
	        if (n.async)
	            parts.push("async ");
	
	        parts.push("function");
	
	        if (n.generator)
	            parts.push("*");
	
	        if (n.id) {
	            parts.push(
	                " ",
	                path.call(print, "id"),
	                path.call(print, "typeParameters")
	            );
	        }
	
	        parts.push(
	            "(",
	            printFunctionParams(path, options, print),
	            ")",
	            path.call(print, "returnType"),
	            " ",
	            path.call(print, "body")
	        );
	
	        return concat(parts);
	
	    case "ArrowFunctionExpression":
	        var parts = [];
	
	        if (n.async)
	            parts.push("async ");
	
	        if (
	            n.params.length === 1 &&
	            !n.rest &&
	            n.params[0].type === 'Identifier' &&
	            !n.params[0].typeAnnotation
	        ) {
	            parts.push(path.call(print, "params", 0));
	        } else {
	            parts.push(
	                "(",
	                printFunctionParams(path, options, print),
	                ")"
	            );
	        }
	
	        parts.push(" => ", path.call(print, "body"));
	
	        return concat(parts);
	
	    case "MethodDefinition":
	        var parts = [];
	
	        if (n.static) {
	            parts.push("static ");
	        }
	
	        parts.push(printMethod(path, options, print));
	
	        return concat(parts);
	
	    case "YieldExpression":
	        var parts = ["yield"];
	
	        if (n.delegate)
	            parts.push("*");
	
	        if (n.argument)
	            parts.push(" ", path.call(print, "argument"));
	
	        return concat(parts);
	
	    case "AwaitExpression":
	        var parts = ["await"];
	
	        if (n.all)
	            parts.push("*");
	
	        if (n.argument)
	            parts.push(" ", path.call(print, "argument"));
	
	        return concat(parts);
	
	    case "ModuleDeclaration":
	        var parts = ["module", path.call(print, "id")];
	
	        if (n.source) {
	            assert.ok(!n.body);
	            parts.push("from", path.call(print, "source"));
	        } else {
	            parts.push(path.call(print, "body"));
	        }
	
	        return fromString(" ").join(parts);
	
	    case "ImportSpecifier":
	        var parts = [];
	
	        if (n.imported) {
	            parts.push(path.call(print, "imported"));
	            if (n.local &&
	                n.local.name !== n.imported.name) {
	                parts.push(" as ", path.call(print, "local"));
	            }
	        } else if (n.id) {
	            parts.push(path.call(print, "id"));
	            if (n.name) {
	                parts.push(" as ", path.call(print, "name"));
	            }
	        }
	
	        return concat(parts);
	
	    case "ExportSpecifier":
	        var parts = [];
	
	        if (n.local) {
	            parts.push(path.call(print, "local"));
	            if (n.exported &&
	                n.exported.name !== n.local.name) {
	                parts.push(" as ", path.call(print, "exported"));
	            }
	        } else if (n.id) {
	            parts.push(path.call(print, "id"));
	            if (n.name) {
	                parts.push(" as ", path.call(print, "name"));
	            }
	        }
	
	        return concat(parts);
	
	    case "ExportBatchSpecifier":
	        return fromString("*");
	
	    case "ImportNamespaceSpecifier":
	        var parts = ["* as "];
	        if (n.local) {
	            parts.push(path.call(print, "local"));
	        } else if (n.id) {
	            parts.push(path.call(print, "id"));
	        }
	        return concat(parts);
	
	    case "ImportDefaultSpecifier":
	        if (n.local) {
	            return path.call(print, "local");
	        }
	        return path.call(print, "id");
	
	    case "ExportDeclaration":
	    case "ExportDefaultDeclaration":
	    case "ExportNamedDeclaration":
	        return printExportDeclaration(path, options, print);
	
	    case "ExportAllDeclaration":
	        var parts = ["export *"];
	
	        if (n.exported) {
	            parts.push(" as ", path.call(print, "exported"));
	        }
	
	        parts.push(
	            " from ",
	            path.call(print, "source")
	        );
	
	        return concat(parts);
	
	    case "ExportNamespaceSpecifier":
	        return concat(["* as ", path.call(print, "exported")]);
	
	    case "ExportDefaultSpecifier":
	        return path.call(print, "exported");
	
	    case "ImportDeclaration":
	        var parts = ["import "];
	
	        if (n.importKind && n.importKind !== "value") {
	            parts.push(n.importKind + " ");
	        }
	
	        if (n.specifiers &&
	            n.specifiers.length > 0) {
	
	            var foundImportSpecifier = false;
	
	            path.each(function(specifierPath) {
	                var i = specifierPath.getName();
	                if (i > 0) {
	                    parts.push(", ");
	                }
	
	                var value = specifierPath.getValue();
	
	                if (namedTypes.ImportDefaultSpecifier.check(value) ||
	                    namedTypes.ImportNamespaceSpecifier.check(value)) {
	                    assert.strictEqual(foundImportSpecifier, false);
	                } else {
	                    namedTypes.ImportSpecifier.assert(value);
	                    if (!foundImportSpecifier) {
	                        foundImportSpecifier = true;
	                        parts.push("{");
	                    }
	                }
	
	                parts.push(print(specifierPath));
	            }, "specifiers");
	
	            if (foundImportSpecifier) {
	                parts.push("}");
	            }
	
	            parts.push(" from ");
	        }
	
	        parts.push(path.call(print, "source"), ";");
	
	        return concat(parts);
	
	    case "BlockStatement":
	        var naked = path.call(function(bodyPath) {
	            return printStatementSequence(bodyPath, options, print);
	        }, "body");
	
	        if (naked.isEmpty()) {
	            return fromString("{}");
	        }
	
	        return concat([
	            "{\n",
	            naked.indent(options.tabWidth),
	            "\n}"
	        ]);
	
	    case "ReturnStatement":
	        var parts = ["return"];
	
	        if (n.argument) {
	            var argLines = path.call(print, "argument");
	            if (argLines.length > 1 &&
	                (namedTypes.XJSElement &&
	                 namedTypes.XJSElement.check(n.argument) ||
	                 namedTypes.JSXElement &&
	                 namedTypes.JSXElement.check(n.argument))) {
	                parts.push(
	                    " (\n",
	                    argLines.indent(options.tabWidth),
	                    "\n)"
	                );
	            } else {
	                parts.push(" ", argLines);
	            }
	        }
	
	        parts.push(";");
	
	        return concat(parts);
	
	    case "CallExpression":
	        return concat([
	            path.call(print, "callee"),
	            printArgumentsList(path, options, print)
	        ]);
	
	    case "ObjectExpression":
	    case "ObjectPattern":
	    case "ObjectTypeAnnotation":
	        var allowBreak = false;
	        var isTypeAnnotation = n.type === "ObjectTypeAnnotation";
	        var separator = isTypeAnnotation ? ';' : ',';
	        var fields = [];
	
	        if (isTypeAnnotation) {
	            fields.push("indexers", "callProperties");
	        }
	
	        fields.push("properties");
	
	        var len = 0;
	        fields.forEach(function(field) {
	            len += n[field].length;
	        });
	
	        var oneLine = (isTypeAnnotation && len === 1) || len === 0;
	        var parts = [oneLine ? "{" : "{\n"];
	
	        var i = 0;
	        fields.forEach(function(field) {
	            path.each(function(childPath) {
	                var lines = print(childPath);
	
	                if (!oneLine) {
	                    lines = lines.indent(options.tabWidth);
	                }
	
	                var multiLine = !isTypeAnnotation && lines.length > 1;
	                if (multiLine && allowBreak) {
	                    // Similar to the logic for BlockStatement.
	                    parts.push("\n");
	                }
	
	                parts.push(lines);
	
	                if (i < len - 1) {
	                    // Add an extra line break if the previous object property
	                    // had a multi-line value.
	                    parts.push(separator + (multiLine ? "\n\n" : "\n"));
	                    allowBreak = !multiLine;
	                } else if (len !== 1 && isTypeAnnotation) {
	                    parts.push(separator);
	                } else if (options.trailingComma) {
	                    parts.push(separator);
	                }
	                i++;
	            }, field);
	        });
	
	        parts.push(oneLine ? "}" : "\n}");
	
	        return concat(parts);
	
	    case "PropertyPattern":
	        return concat([
	            path.call(print, "key"),
	            ": ",
	            path.call(print, "pattern")
	        ]);
	
	    case "Property": // Non-standard AST node type.
	        if (n.method || n.kind === "get" || n.kind === "set") {
	            return printMethod(path, options, print);
	        }
	
	        var parts = [];
	
	        var key = path.call(print, "key");
	        if (n.computed) {
	            parts.push("[", key, "]");
	        } else {
	            parts.push(key);
	        }
	
	        if (! n.shorthand) {
	            parts.push(": ", path.call(print, "value"));
	        }
	
	        return concat(parts);
	
	    case "Decorator":
	        return concat(["@", path.call(print, "expression")]);
	
	    case "ArrayExpression":
	    case "ArrayPattern":
	        var elems = n.elements,
	            len = elems.length;
	
	        var printed = path.map(print, "elements");
	        var joined = fromString(", ").join(printed);
	        var oneLine = joined.getLineLength(1) <= options.wrapColumn;
	        var parts = [oneLine ? "[" : "[\n"];
	
	        path.each(function(elemPath) {
	            var i = elemPath.getName();
	            var elem = elemPath.getValue();
	            if (!elem) {
	                // If the array expression ends with a hole, that hole
	                // will be ignored by the interpreter, but if it ends with
	                // two (or more) holes, we need to write out two (or more)
	                // commas so that the resulting code is interpreted with
	                // both (all) of the holes.
	                parts.push(",");
	            } else {
	                var lines = printed[i];
	                if (oneLine) {
	                    if (i > 0)
	                        parts.push(" ");
	                } else {
	                    lines = lines.indent(options.tabWidth);
	                }
	                parts.push(lines);
	                if (i < len - 1 || (!oneLine && options.trailingComma))
	                    parts.push(",");
	                if (!oneLine)
	                    parts.push("\n");
	            }
	        }, "elements");
	
	        parts.push("]");
	
	        return concat(parts);
	
	    case "SequenceExpression":
	        return fromString(", ").join(path.map(print, "expressions"));
	
	    case "ThisExpression":
	        return fromString("this");
	
	    case "Super":
	        return fromString("super");
	
	    case "Literal":
	        if (typeof n.value !== "string")
	            return fromString(n.value, options);
	
	        return fromString(nodeStr(n.value, options), options);
	
	    case "ModuleSpecifier":
	        if (n.local) {
	            throw new Error(
	                "The ESTree ModuleSpecifier type should be abstract"
	            );
	        }
	
	        // The Esprima ModuleSpecifier type is just a string-valued
	        // Literal identifying the imported-from module.
	        return fromString(nodeStr(n.value, options), options);
	
	    case "UnaryExpression":
	        var parts = [n.operator];
	        if (/[a-z]$/.test(n.operator))
	            parts.push(" ");
	        parts.push(path.call(print, "argument"));
	        return concat(parts);
	
	    case "UpdateExpression":
	        var parts = [path.call(print, "argument"), n.operator];
	
	        if (n.prefix)
	            parts.reverse();
	
	        return concat(parts);
	
	    case "ConditionalExpression":
	        return concat([
	            "(", path.call(print, "test"),
	            " ? ", path.call(print, "consequent"),
	            " : ", path.call(print, "alternate"), ")"
	        ]);
	
	    case "NewExpression":
	        var parts = ["new ", path.call(print, "callee")];
	        var args = n.arguments;
	        if (args) {
	            parts.push(printArgumentsList(path, options, print));
	        }
	
	        return concat(parts);
	
	    case "VariableDeclaration":
	        var parts = [n.kind, " "];
	        var maxLen = 0;
	        var printed = path.map(function(childPath) {
	            var lines = print(childPath);
	            maxLen = Math.max(lines.length, maxLen);
	            return lines;
	        }, "declarations");
	
	        if (maxLen === 1) {
	            parts.push(fromString(", ").join(printed));
	        } else if (printed.length > 1 ) {
	            parts.push(
	                fromString(",\n").join(printed)
	                    .indentTail(n.kind.length + 1)
	            );
	        } else {
	            parts.push(printed[0]);
	        }
	
	        // We generally want to terminate all variable declarations with a
	        // semicolon, except when they are children of for loops.
	        var parentNode = path.getParentNode();
	        if (!namedTypes.ForStatement.check(parentNode) &&
	            !namedTypes.ForInStatement.check(parentNode) &&
	            !(namedTypes.ForOfStatement &&
	              namedTypes.ForOfStatement.check(parentNode))) {
	            parts.push(";");
	        }
	
	        return concat(parts);
	
	    case "VariableDeclarator":
	        return n.init ? fromString(" = ").join([
	            path.call(print, "id"),
	            path.call(print, "init")
	        ]) : path.call(print, "id");
	
	    case "WithStatement":
	        return concat([
	            "with (",
	            path.call(print, "object"),
	            ") ",
	            path.call(print, "body")
	        ]);
	
	    case "IfStatement":
	        var con = adjustClause(path.call(print, "consequent"), options),
	            parts = ["if (", path.call(print, "test"), ")", con];
	
	        if (n.alternate)
	            parts.push(
	                endsWithBrace(con) ? " else" : "\nelse",
	                adjustClause(path.call(print, "alternate"), options));
	
	        return concat(parts);
	
	    case "ForStatement":
	        // TODO Get the for (;;) case right.
	        var init = path.call(print, "init"),
	            sep = init.length > 1 ? ";\n" : "; ",
	            forParen = "for (",
	            indented = fromString(sep).join([
	                init,
	                path.call(print, "test"),
	                path.call(print, "update")
	            ]).indentTail(forParen.length),
	            head = concat([forParen, indented, ")"]),
	            clause = adjustClause(path.call(print, "body"), options),
	            parts = [head];
	
	        if (head.length > 1) {
	            parts.push("\n");
	            clause = clause.trimLeft();
	        }
	
	        parts.push(clause);
	
	        return concat(parts);
	
	    case "WhileStatement":
	        return concat([
	            "while (",
	            path.call(print, "test"),
	            ")",
	            adjustClause(path.call(print, "body"), options)
	        ]);
	
	    case "ForInStatement":
	        // Note: esprima can't actually parse "for each (".
	        return concat([
	            n.each ? "for each (" : "for (",
	            path.call(print, "left"),
	            " in ",
	            path.call(print, "right"),
	            ")",
	            adjustClause(path.call(print, "body"), options)
	        ]);
	
	    case "ForOfStatement":
	        return concat([
	            "for (",
	            path.call(print, "left"),
	            " of ",
	            path.call(print, "right"),
	            ")",
	            adjustClause(path.call(print, "body"), options)
	        ]);
	
	    case "DoWhileStatement":
	        var doBody = concat([
	            "do",
	            adjustClause(path.call(print, "body"), options)
	        ]), parts = [doBody];
	
	        if (endsWithBrace(doBody))
	            parts.push(" while");
	        else
	            parts.push("\nwhile");
	
	        parts.push(" (", path.call(print, "test"), ");");
	
	        return concat(parts);
	
	    case "DoExpression":
	        var statements = path.call(function(bodyPath) {
	            return printStatementSequence(bodyPath, options, print);
	        }, "body");
	
	        return concat([
	            "do {\n",
	            statements.indent(options.tabWidth),
	            "\n}"
	        ]);
	
	    case "BreakStatement":
	        var parts = ["break"];
	        if (n.label)
	            parts.push(" ", path.call(print, "label"));
	        parts.push(";");
	        return concat(parts);
	
	    case "ContinueStatement":
	        var parts = ["continue"];
	        if (n.label)
	            parts.push(" ", path.call(print, "label"));
	        parts.push(";");
	        return concat(parts);
	
	    case "LabeledStatement":
	        return concat([
	            path.call(print, "label"),
	            ":\n",
	            path.call(print, "body")
	        ]);
	
	    case "TryStatement":
	        var parts = [
	            "try ",
	            path.call(print, "block")
	        ];
	
	        if (n.handler) {
	            parts.push(" ", path.call(print, "handler"));
	        } else if (n.handlers) {
	            path.each(function(handlerPath) {
	                parts.push(" ", print(handlerPath));
	            }, "handlers");
	        }
	
	        if (n.finalizer) {
	            parts.push(" finally ", path.call(print, "finalizer"));
	        }
	
	        return concat(parts);
	
	    case "CatchClause":
	        var parts = ["catch (", path.call(print, "param")];
	
	        if (n.guard)
	            // Note: esprima does not recognize conditional catch clauses.
	            parts.push(" if ", path.call(print, "guard"));
	
	        parts.push(") ", path.call(print, "body"));
	
	        return concat(parts);
	
	    case "ThrowStatement":
	        return concat(["throw ", path.call(print, "argument"), ";"]);
	
	    case "SwitchStatement":
	        return concat([
	            "switch (",
	            path.call(print, "discriminant"),
	            ") {\n",
	            fromString("\n").join(path.map(print, "cases")),
	            "\n}"
	        ]);
	
	        // Note: ignoring n.lexical because it has no printing consequences.
	
	    case "SwitchCase":
	        var parts = [];
	
	        if (n.test)
	            parts.push("case ", path.call(print, "test"), ":");
	        else
	            parts.push("default:");
	
	        if (n.consequent.length > 0) {
	            parts.push("\n", path.call(function(consequentPath) {
	                return printStatementSequence(consequentPath, options, print);
	            }, "consequent").indent(options.tabWidth));
	        }
	
	        return concat(parts);
	
	    case "DebuggerStatement":
	        return fromString("debugger;");
	
	    // JSX extensions below.
	
	    case "XJSAttribute":
	    case "JSXAttribute":
	        var parts = [path.call(print, "name")];
	        if (n.value)
	            parts.push("=", path.call(print, "value"));
	        return concat(parts);
	
	    case "XJSIdentifier":
	    case "JSXIdentifier":
	        return fromString(n.name, options);
	
	    case "XJSNamespacedName":
	    case "JSXNamespacedName":
	        return fromString(":").join([
	            path.call(print, "namespace"),
	            path.call(print, "name")
	        ]);
	
	    case "XJSMemberExpression":
	    case "JSXMemberExpression":
	        return fromString(".").join([
	            path.call(print, "object"),
	            path.call(print, "property")
	        ]);
	
	    case "XJSSpreadAttribute":
	    case "JSXSpreadAttribute":
	        return concat(["{...", path.call(print, "argument"), "}"]);
	
	    case "XJSExpressionContainer":
	    case "JSXExpressionContainer":
	        return concat(["{", path.call(print, "expression"), "}"]);
	
	    case "XJSElement":
	    case "JSXElement":
	        var openingLines = path.call(print, "openingElement");
	
	        if (n.openingElement.selfClosing) {
	            assert.ok(!n.closingElement);
	            return openingLines;
	        }
	
	        var childLines = concat(
	            path.map(function(childPath) {
	                var child = childPath.getValue();
	
	                if (namedTypes.Literal.check(child) &&
	                    typeof child.value === "string") {
	                    if (/\S/.test(child.value)) {
	                        return child.value.replace(/^\s+|\s+$/g, "");
	                    } else if (/\n/.test(child.value)) {
	                        return "\n";
	                    }
	                }
	
	                return print(childPath);
	            }, "children")
	        ).indentTail(options.tabWidth);
	
	        var closingLines = path.call(print, "closingElement");
	
	        return concat([
	            openingLines,
	            childLines,
	            closingLines
	        ]);
	
	    case "XJSOpeningElement":
	    case "JSXOpeningElement":
	        var parts = ["<", path.call(print, "name")];
	        var attrParts = [];
	
	        path.each(function(attrPath) {
	            attrParts.push(" ", print(attrPath));
	        }, "attributes");
	
	        var attrLines = concat(attrParts);
	
	        var needLineWrap = (
	            attrLines.length > 1 ||
	            attrLines.getLineLength(1) > options.wrapColumn
	        );
	
	        if (needLineWrap) {
	            attrParts.forEach(function(part, i) {
	                if (part === " ") {
	                    assert.strictEqual(i % 2, 0);
	                    attrParts[i] = "\n";
	                }
	            });
	
	            attrLines = concat(attrParts).indentTail(options.tabWidth);
	        }
	
	        parts.push(attrLines, n.selfClosing ? " />" : ">");
	
	        return concat(parts);
	
	    case "XJSClosingElement":
	    case "JSXClosingElement":
	        return concat(["</", path.call(print, "name"), ">"]);
	
	    case "XJSText":
	    case "JSXText":
	        return fromString(n.value, options);
	
	    case "XJSEmptyExpression":
	    case "JSXEmptyExpression":
	        return fromString("");
	
	    case "TypeAnnotatedIdentifier":
	        return concat([
	            path.call(print, "annotation"),
	            " ",
	            path.call(print, "identifier")
	        ]);
	
	    case "ClassBody":
	        if (n.body.length === 0) {
	            return fromString("{}");
	        }
	
	        return concat([
	            "{\n",
	            path.call(function(bodyPath) {
	                return printStatementSequence(bodyPath, options, print);
	            }, "body").indent(options.tabWidth),
	            "\n}"
	        ]);
	
	    case "ClassPropertyDefinition":
	        var parts = ["static ", path.call(print, "definition")];
	        if (!namedTypes.MethodDefinition.check(n.definition))
	            parts.push(";");
	        return concat(parts);
	
	    case "ClassProperty":
	        var parts = [];
	        if (n.static)
	            parts.push("static ");
	
	        parts.push(path.call(print, "key"));
	        if (n.typeAnnotation)
	            parts.push(path.call(print, "typeAnnotation"));
	
	        if (n.value)
	            parts.push(" = ", path.call(print, "value"));
	
	        parts.push(";");
	        return concat(parts);
	
	    case "ClassDeclaration":
	    case "ClassExpression":
	        var parts = [];
	
	        parts.push("class");
	
	        if (n.id) {
	            parts.push(
	                " ",
	                path.call(print, "id"),
	                path.call(print, "typeParameters")
	            );
	        }
	
	        if (n.superClass) {
	            parts.push(
	                " extends ",
	                path.call(print, "superClass"),
	                path.call(print, "superTypeParameters")
	            );
	        }
	
	        if (n["implements"] && n['implements'].length > 0) {
	            parts.push(
	                " implements ",
	                fromString(", ").join(path.map(print, "implements"))
	            );
	        }
	
	        parts.push(" ", path.call(print, "body"));
	
	        return concat(parts);
	
	    case "TemplateElement":
	        return fromString(n.value.raw, options).lockIndentTail();
	
	    case "TemplateLiteral":
	        var expressions = path.map(print, "expressions");
	        var parts = ["`"];
	
	        path.each(function(childPath) {
	            var i = childPath.getName();
	            parts.push(print(childPath));
	            if (i < expressions.length) {
	                parts.push("${", expressions[i], "}");
	            }
	        }, "quasis");
	
	        parts.push("`");
	
	        return concat(parts).lockIndentTail();
	
	    case "TaggedTemplateExpression":
	        return concat([
	            path.call(print, "tag"),
	            path.call(print, "quasi")
	        ]);
	
	    // These types are unprintable because they serve as abstract
	    // supertypes for other (printable) types.
	    case "Node":
	    case "Printable":
	    case "SourceLocation":
	    case "Position":
	    case "Statement":
	    case "Function":
	    case "Pattern":
	    case "Expression":
	    case "Declaration":
	    case "Specifier":
	    case "NamedSpecifier":
	    case "Comment": // Supertype of Block and Line.
	    case "MemberTypeAnnotation": // Flow
	    case "TupleTypeAnnotation": // Flow
	    case "Type": // Flow
	        throw new Error("unprintable type: " + JSON.stringify(n.type));
	
	    case "CommentBlock": // Babel block comment.
	    case "Block": // Esprima block comment.
	        return concat(["/*", fromString(n.value, options), "*/"]);
	
	    case "CommentLine": // Babel line comment.
	    case "Line": // Esprima line comment.
	        return concat(["//", fromString(n.value, options)]);
	
	    // Type Annotations for Facebook Flow, typically stripped out or
	    // transformed away before printing.
	    case "TypeAnnotation":
	        var parts = [];
	
	        if (n.typeAnnotation) {
	            if (n.typeAnnotation.type !== "FunctionTypeAnnotation") {
	                parts.push(": ");
	            }
	            parts.push(path.call(print, "typeAnnotation"));
	            return concat(parts);
	        }
	
	        return fromString("");
	
	    case "AnyTypeAnnotation":
	        return fromString("any", options);
	
	    case "MixedTypeAnnotation":
	        return fromString("mixed", options);
	
	    case "ArrayTypeAnnotation":
	        return concat([
	            path.call(print, "elementType"),
	            "[]"
	        ]);
	
	    case "BooleanTypeAnnotation":
	        return fromString("boolean", options);
	
	    case "BooleanLiteralTypeAnnotation":
	        assert.strictEqual(typeof n.value, "boolean");
	        return fromString("" + n.value, options);
	
	    case "DeclareClass":
	        return printFlowDeclaration(path, [
	            "class ",
	            path.call(print, "id"),
	            " ",
	            path.call(print, "body"),
	        ]);
	
	    case "DeclareFunction":
	        return printFlowDeclaration(path, [
	            "function ",
	            path.call(print, "id"),
	            ";"
	        ]);
	
	    case "DeclareModule":
	        return printFlowDeclaration(path, [
	            "module ",
	            path.call(print, "id"),
	            " ",
	            path.call(print, "body"),
	        ]);
	
	    case "DeclareVariable":
	        return printFlowDeclaration(path, [
	            "var ",
	            path.call(print, "id"),
	            ";"
	        ]);
	
	    case "DeclareExportDeclaration":
	        return concat([
	            "declare ",
	            printExportDeclaration(path, options, print)
	        ]);
	
	    case "FunctionTypeAnnotation":
	        // FunctionTypeAnnotation is ambiguous:
	        // declare function(a: B): void; OR
	        // var A: (a: B) => void;
	        var parts = [];
	        var parent = path.getParentNode(0);
	        var isArrowFunctionTypeAnnotation = !(
	            namedTypes.ObjectTypeCallProperty.check(parent) ||
	            namedTypes.DeclareFunction.check(path.getParentNode(2))
	        );
	
	        var needsColon =
	            isArrowFunctionTypeAnnotation &&
	            !namedTypes.FunctionTypeParam.check(parent);
	
	        if (needsColon) {
	            parts.push(": ");
	        }
	
	        parts.push(
	            "(",
	            fromString(", ").join(path.map(print, "params")),
	            ")"
	        );
	
	        // The returnType is not wrapped in a TypeAnnotation, so the colon
	        // needs to be added separately.
	        if (n.returnType) {
	            parts.push(
	                isArrowFunctionTypeAnnotation ? " => " : ": ",
	                path.call(print, "returnType")
	            );
	        }
	
	        return concat(parts);
	
	    case "FunctionTypeParam":
	        return concat([
	            path.call(print, "name"),
	            n.optional ? '?' : '',
	            ": ",
	            path.call(print, "typeAnnotation"),
	        ]);
	
	    case "GenericTypeAnnotation":
	        return concat([
	            path.call(print, "id"),
	            path.call(print, "typeParameters")
	        ]);
	
	    case "InterfaceDeclaration":
	        var parts = [
	            fromString("interface ", options),
	            path.call(print, "id"),
	            path.call(print, "typeParameters"),
	            " "
	        ];
	
	        if (n["extends"]) {
	            parts.push(
	                "extends ",
	                fromString(", ").join(path.map(print, "extends"))
	            );
	        }
	
	        parts.push(" ", path.call(print, "body"));
	
	        return concat(parts);
	
	    case "ClassImplements":
	    case "InterfaceExtends":
	        return concat([
	            path.call(print, "id"),
	            path.call(print, "typeParameters")
	        ]);
	
	    case "IntersectionTypeAnnotation":
	        return fromString(" & ").join(path.map(print, "types"));
	
	    case "NullableTypeAnnotation":
	        return concat([
	            "?",
	            path.call(print, "typeAnnotation")
	        ]);
	
	    case "NumberTypeAnnotation":
	        return fromString("number", options);
	
	    case "ObjectTypeCallProperty":
	        return path.call(print, "value");
	
	    case "ObjectTypeIndexer":
	        return concat([
	            "[",
	            path.call(print, "id"),
	            ": ",
	            path.call(print, "key"),
	            "]: ",
	            path.call(print, "value")
	        ]);
	
	    case "ObjectTypeProperty":
	        return concat([
	            path.call(print, "key"),
	            ": ",
	            path.call(print, "value")
	        ]);
	
	    case "QualifiedTypeIdentifier":
	        return concat([
	            path.call(print, "qualification"),
	            ".",
	            path.call(print, "id")
	        ]);
	
	    case "StringLiteralTypeAnnotation":
	        return fromString(nodeStr(n.value, options), options);
	
	    case "NumberLiteralTypeAnnotation":
	        assert.strictEqual(typeof n.value, "number");
	        return fromString("" + n.value, options);
	
	    case "StringTypeAnnotation":
	        return fromString("string", options);
	
	    case "TypeAlias":
	        return concat([
	            "type ",
	            path.call(print, "id"),
	            " = ",
	            path.call(print, "right"),
	            ";"
	        ]);
	
	    case "TypeCastExpression":
	        return concat([
	            "(",
	            path.call(print, "expression"),
	            path.call(print, "typeAnnotation"),
	            ")"
	        ]);
	
	    case "TypeParameterDeclaration":
	    case "TypeParameterInstantiation":
	        return concat([
	            "<",
	            fromString(", ").join(path.map(print, "params")),
	            ">"
	        ]);
	
	    case "TypeofTypeAnnotation":
	        return concat([
	            fromString("typeof ", options),
	            path.call(print, "argument")
	        ]);
	
	    case "UnionTypeAnnotation":
	        return fromString(" | ").join(path.map(print, "types"));
	
	    case "VoidTypeAnnotation":
	        return fromString("void", options);
	
	    // Unhandled types below. If encountered, nodes of these types should
	    // be either left alone or desugared into AST types that are fully
	    // supported by the pretty-printer.
	    case "ClassHeritage": // TODO
	    case "ComprehensionBlock": // TODO
	    case "ComprehensionExpression": // TODO
	    case "Glob": // TODO
	    case "GeneratorExpression": // TODO
	    case "LetStatement": // TODO
	    case "LetExpression": // TODO
	    case "GraphExpression": // TODO
	    case "GraphIndexExpression": // TODO
	
	    // XML types that nobody cares about or needs to print.
	    case "XMLDefaultDeclaration":
	    case "XMLAnyName":
	    case "XMLQualifiedIdentifier":
	    case "XMLFunctionQualifiedIdentifier":
	    case "XMLAttributeSelector":
	    case "XMLFilterExpression":
	    case "XML":
	    case "XMLElement":
	    case "XMLList":
	    case "XMLEscape":
	    case "XMLText":
	    case "XMLStartTag":
	    case "XMLEndTag":
	    case "XMLPointTag":
	    case "XMLName":
	    case "XMLAttribute":
	    case "XMLCdata":
	    case "XMLComment":
	    case "XMLProcessingInstruction":
	    default:
	        debugger;
	        throw new Error("unknown type: " + JSON.stringify(n.type));
	    }
	
	    return p;
	}
	
	function printStatementSequence(path, options, print) {
	    var inClassBody =
	        namedTypes.ClassBody &&
	        namedTypes.ClassBody.check(path.getParentNode());
	
	    var filtered = [];
	    var sawComment = false;
	    var sawStatement = false;
	
	    path.each(function(stmtPath) {
	        var i = stmtPath.getName();
	        var stmt = stmtPath.getValue();
	
	        // Just in case the AST has been modified to contain falsy
	        // "statements," it's safer simply to skip them.
	        if (!stmt) {
	            return;
	        }
	
	        // Skip printing EmptyStatement nodes to avoid leaving stray
	        // semicolons lying around.
	        if (stmt.type === "EmptyStatement") {
	            return;
	        }
	
	        if (namedTypes.Comment.check(stmt)) {
	            // The pretty printer allows a dangling Comment node to act as
	            // a Statement when the Comment can't be attached to any other
	            // non-Comment node in the tree.
	            sawComment = true;
	        } else if (namedTypes.Statement.check(stmt)) {
	            sawStatement = true;
	        } else {
	            // When the pretty printer encounters a string instead of an
	            // AST node, it just prints the string. This behavior can be
	            // useful for fine-grained formatting decisions like inserting
	            // blank lines.
	            isString.assert(stmt);
	        }
	
	        // We can't hang onto stmtPath outside of this function, because
	        // it's just a reference to a mutable FastPath object, so we have
	        // to go ahead and print it here.
	        filtered.push({
	            node: stmt,
	            printed: print(stmtPath)
	        });
	    });
	
	    if (sawComment) {
	        assert.strictEqual(
	            sawStatement, false,
	            "Comments may appear as statements in otherwise empty statement " +
	                "lists, but may not coexist with non-Comment nodes."
	        );
	    }
	
	    var prevTrailingSpace = null;
	    var len = filtered.length;
	    var parts = [];
	
	    filtered.forEach(function(info, i) {
	        var printed = info.printed;
	        var stmt = info.node;
	        var multiLine = printed.length > 1;
	        var notFirst = i > 0;
	        var notLast = i < len - 1;
	        var leadingSpace;
	        var trailingSpace;
	        var lines = stmt && stmt.loc && stmt.loc.lines;
	        var trueLoc = lines && options.reuseWhitespace &&
	            util.getTrueLoc(stmt, lines);
	
	        if (notFirst) {
	            if (trueLoc) {
	                var beforeStart = lines.skipSpaces(trueLoc.start, true);
	                var beforeStartLine = beforeStart ? beforeStart.line : 1;
	                var leadingGap = trueLoc.start.line - beforeStartLine;
	                leadingSpace = Array(leadingGap + 1).join("\n");
	            } else {
	                leadingSpace = multiLine ? "\n\n" : "\n";
	            }
	        } else {
	            leadingSpace = "";
	        }
	
	        if (notLast) {
	            if (trueLoc) {
	                var afterEnd = lines.skipSpaces(trueLoc.end);
	                var afterEndLine = afterEnd ? afterEnd.line : lines.length;
	                var trailingGap = afterEndLine - trueLoc.end.line;
	                trailingSpace = Array(trailingGap + 1).join("\n");
	            } else {
	                trailingSpace = multiLine ? "\n\n" : "\n";
	            }
	        } else {
	            trailingSpace = "";
	        }
	
	        parts.push(
	            maxSpace(prevTrailingSpace, leadingSpace),
	            printed
	        );
	
	        if (notLast) {
	            prevTrailingSpace = trailingSpace;
	        } else if (trailingSpace) {
	            parts.push(trailingSpace);
	        }
	    });
	
	    return concat(parts);
	}
	
	function maxSpace(s1, s2) {
	    if (!s1 && !s2) {
	        return fromString("");
	    }
	
	    if (!s1) {
	        return fromString(s2);
	    }
	
	    if (!s2) {
	        return fromString(s1);
	    }
	
	    var spaceLines1 = fromString(s1);
	    var spaceLines2 = fromString(s2);
	
	    if (spaceLines2.length > spaceLines1.length) {
	        return spaceLines2;
	    }
	
	    return spaceLines1;
	}
	
	function printMethod(path, options, print) {
	    var node = path.getNode();
	    var kind = node.kind;
	    var parts = [];
	
	    namedTypes.FunctionExpression.assert(node.value);
	
	    if (node.value.async) {
	        parts.push("async ");
	    }
	
	    if (!kind || kind === "init" || kind === "method" || kind === "constructor") {
	        if (node.value.generator) {
	            parts.push("*");
	        }
	    } else {
	        assert.ok(kind === "get" || kind === "set");
	        parts.push(kind, " ");
	    }
	
	    var key = path.call(print, "key");
	    if (node.computed) {
	        key = concat(["[", key, "]"]);
	    }
	
	    parts.push(
	        key,
	        path.call(print, "value", "typeParameters"),
	        "(",
	        path.call(function(valuePath) {
	            return printFunctionParams(valuePath, options, print);
	        }, "value"),
	        ")",
	        path.call(print, "value", "returnType"),
	        " ",
	        path.call(print, "value", "body")
	    );
	
	    return concat(parts);
	}
	
	function printArgumentsList(path, options, print) {
	    var printed = path.map(print, "arguments");
	
	    var joined = fromString(", ").join(printed);
	    if (joined.getLineLength(1) > options.wrapColumn) {
	        joined = fromString(",\n").join(printed);
	        return concat([
	            "(\n",
	            joined.indent(options.tabWidth),
	            options.trailingComma ? ",\n)" : "\n)"
	        ]);
	    }
	
	    return concat(["(", joined, ")"]);
	}
	
	function printFunctionParams(path, options, print) {
	    var fun = path.getValue();
	    namedTypes.Function.assert(fun);
	
	    var printed = path.map(print, "params");
	
	    if (fun.defaults) {
	        path.each(function(defExprPath) {
	            var i = defExprPath.getName();
	            var p = printed[i];
	            if (p && defExprPath.getValue()) {
	                printed[i] = concat([p, "=", print(defExprPath)]);
	            }
	        }, "defaults");
	    }
	
	    if (fun.rest) {
	        printed.push(concat(["...", path.call(print, "rest")]));
	    }
	
	    var joined = fromString(", ").join(printed);
	    if (joined.length > 1 ||
	        joined.getLineLength(1) > options.wrapColumn) {
	        joined = fromString(",\n").join(printed);
	        if (options.trailingComma && !fun.rest) {
	            joined = concat([joined, ",\n"]);
	        }
	        return concat(["\n", joined.indent(options.tabWidth)]);
	    }
	
	    return joined;
	}
	
	function printExportDeclaration(path, options, print) {
	    var decl = path.getValue();
	    var parts = ["export "];
	
	    namedTypes.Declaration.assert(decl);
	
	    if (decl["default"] ||
	        decl.type === "ExportDefaultDeclaration") {
	        parts.push("default ");
	    }
	
	    if (decl.declaration) {
	        parts.push(path.call(print, "declaration"));
	
	    } else if (decl.specifiers &&
	               decl.specifiers.length > 0) {
	
	        if (decl.specifiers.length === 1 &&
	            decl.specifiers[0].type === "ExportBatchSpecifier") {
	            parts.push("*");
	        } else {
	            parts.push(
	                "{",
	                fromString(", ").join(path.map(print, "specifiers")),
	                "}"
	            );
	        }
	
	        if (decl.source) {
	            parts.push(" from ", path.call(print, "source"));
	        }
	    }
	
	    var lines = concat(parts);
	
	    if (lastNonSpaceCharacter(lines) !== ";") {
	        lines = concat([lines, ";"]);
	    }
	
	    return lines;
	}
	
	function printFlowDeclaration(path, parts) {
	    var parentExportDecl = util.getParentExportDeclaration(path);
	
	    if (parentExportDecl) {
	        assert.strictEqual(
	            parentExportDecl.type,
	            "DeclareExportDeclaration"
	        );
	    } else {
	        // If the parent node has type DeclareExportDeclaration, then it
	        // will be responsible for printing the "declare" token. Otherwise
	        // it needs to be printed with this non-exported declaration node.
	        parts.unshift("declare ");
	    }
	
	    return concat(parts);
	}
	
	function adjustClause(clause, options) {
	    if (clause.length > 1)
	        return concat([" ", clause]);
	
	    return concat([
	        "\n",
	        maybeAddSemicolon(clause).indent(options.tabWidth)
	    ]);
	}
	
	function lastNonSpaceCharacter(lines) {
	    var pos = lines.lastPos();
	    do {
	        var ch = lines.charAt(pos);
	        if (/\S/.test(ch))
	            return ch;
	    } while (lines.prevPos(pos));
	}
	
	function endsWithBrace(lines) {
	    return lastNonSpaceCharacter(lines) === "}";
	}
	
	function swapQuotes(str) {
	    return str.replace(/['"]/g, function(m) {
	        return m === '"' ? '\'' : '"';
	    });
	}
	
	function nodeStr(str, options) {
	    isString.assert(str);
	    switch (options.quote) {
	    case "auto":
	        var double = JSON.stringify(str);
	        var single = swapQuotes(JSON.stringify(swapQuotes(str)));
	        return double.length > single.length ? single : double;
	    case "single":
	        return swapQuotes(JSON.stringify(swapQuotes(str)));
	    case "double":
	    default:
	        return JSON.stringify(str);
	    }
	}
	
	function maybeAddSemicolon(lines) {
	    var eoc = lastNonSpaceCharacter(lines);
	    if (!eoc || "\n};".indexOf(eoc) < 0)
	        return concat([lines, ";"]);
	    return lines;
	}


/***/ },

/***/ 5:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ "./node_modules/lodash/index.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern -d -o ./index.js`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	;(function() {
	
	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;
	
	  /** Used as the semantic version number. */
	  var VERSION = '3.10.1';
	
	  /** Used to compose bitmasks for wrapper metadata. */
	  var BIND_FLAG = 1,
	      BIND_KEY_FLAG = 2,
	      CURRY_BOUND_FLAG = 4,
	      CURRY_FLAG = 8,
	      CURRY_RIGHT_FLAG = 16,
	      PARTIAL_FLAG = 32,
	      PARTIAL_RIGHT_FLAG = 64,
	      ARY_FLAG = 128,
	      REARG_FLAG = 256;
	
	  /** Used as default options for `_.trunc`. */
	  var DEFAULT_TRUNC_LENGTH = 30,
	      DEFAULT_TRUNC_OMISSION = '...';
	
	  /** Used to detect when a function becomes hot. */
	  var HOT_COUNT = 150,
	      HOT_SPAN = 16;
	
	  /** Used as the size to enable large array optimizations. */
	  var LARGE_ARRAY_SIZE = 200;
	
	  /** Used to indicate the type of lazy iteratees. */
	  var LAZY_FILTER_FLAG = 1,
	      LAZY_MAP_FLAG = 2;
	
	  /** Used as the `TypeError` message for "Functions" methods. */
	  var FUNC_ERROR_TEXT = 'Expected a function';
	
	  /** Used as the internal argument placeholder. */
	  var PLACEHOLDER = '__lodash_placeholder__';
	
	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      mapTag = '[object Map]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      setTag = '[object Set]',
	      stringTag = '[object String]',
	      weakMapTag = '[object WeakMap]';
	
	  var arrayBufferTag = '[object ArrayBuffer]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';
	
	  /** Used to match empty string literals in compiled template source. */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
	
	  /** Used to match HTML entities and HTML characters. */
	  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
	      reUnescapedHtml = /[&<>"'`]/g,
	      reHasEscapedHtml = RegExp(reEscapedHtml.source),
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
	
	  /** Used to match template delimiters. */
	  var reEscape = /<%-([\s\S]+?)%>/g,
	      reEvaluate = /<%([\s\S]+?)%>/g,
	      reInterpolate = /<%=([\s\S]+?)%>/g;
	
	  /** Used to match property names within property paths. */
	  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	      reIsPlainProp = /^\w*$/,
	      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;
	
	  /**
	   * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
	   * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
	   */
	  var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
	      reHasRegExpChars = RegExp(reRegExpChars.source);
	
	  /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
	  var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;
	
	  /** Used to match backslashes in property paths. */
	  var reEscapeChar = /\\(\\)?/g;
	
	  /** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
	
	  /** Used to match `RegExp` flags from their coerced string values. */
	  var reFlags = /\w*$/;
	
	  /** Used to detect hexadecimal string values. */
	  var reHasHexPrefix = /^0[xX]/;
	
	  /** Used to detect host constructors (Safari > 5). */
	  var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	  /** Used to detect unsigned integer values. */
	  var reIsUint = /^\d+$/;
	
	  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;
	
	  /** Used to ensure capturing order of template delimiters. */
	  var reNoMatch = /($^)/;
	
	  /** Used to match unescaped characters in compiled string literals. */
	  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
	
	  /** Used to match words to create compound words. */
	  var reWords = (function() {
	    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
	        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
	
	    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
	  }());
	
	  /** Used to assign default `context` object properties. */
	  var contextProps = [
	    'Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array',
	    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number',
	    'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'isFinite',
	    'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array',
	    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap'
	  ];
	
	  /** Used to make template sourceURLs easier to identify. */
	  var templateCounter = -1;
	
	  /** Used to identify `toStringTag` values of typed arrays. */
	  var typedArrayTags = {};
	  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	  typedArrayTags[uint32Tag] = true;
	  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
	
	  /** Used to identify `toStringTag` values supported by `_.clone`. */
	  var cloneableTags = {};
	  cloneableTags[argsTag] = cloneableTags[arrayTag] =
	  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	  cloneableTags[dateTag] = cloneableTags[float32Tag] =
	  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	  cloneableTags[numberTag] = cloneableTags[objectTag] =
	  cloneableTags[regexpTag] = cloneableTags[stringTag] =
	  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	  cloneableTags[errorTag] = cloneableTags[funcTag] =
	  cloneableTags[mapTag] = cloneableTags[setTag] =
	  cloneableTags[weakMapTag] = false;
	
	  /** Used to map latin-1 supplementary letters to basic latin letters. */
	  var deburredLetters = {
	    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	    '\xc7': 'C',  '\xe7': 'c',
	    '\xd0': 'D',  '\xf0': 'd',
	    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	    '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	    '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	    '\xd1': 'N',  '\xf1': 'n',
	    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	    '\xc6': 'Ae', '\xe6': 'ae',
	    '\xde': 'Th', '\xfe': 'th',
	    '\xdf': 'ss'
	  };
	
	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '`': '&#96;'
	  };
	
	  /** Used to map HTML entities to characters. */
	  var htmlUnescapes = {
	    '&amp;': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&#39;': "'",
	    '&#96;': '`'
	  };
	
	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };
	
	  /** Used to escape characters for inclusion in compiled regexes. */
	  var regexpEscapes = {
	    '0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
	    '5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
	    'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
	    'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
	    'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
	  };
	
	  /** Used to escape characters for inclusion in compiled string literals. */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  /** Detect free variable `module`. */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	
	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;
	
	  /** Detect free variable `self`. */
	  var freeSelf = objectTypes[typeof self] && self && self.Object && self;
	
	  /** Detect free variable `window`. */
	  var freeWindow = objectTypes[typeof window] && window && window.Object && window;
	
	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
	
	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it's the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * The base implementation of `compareAscending` which compares values and
	   * sorts them in ascending order without guaranteeing a stable sort.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */
	  function baseCompareAscending(value, other) {
	    if (value !== other) {
	      var valIsNull = value === null,
	          valIsUndef = value === undefined,
	          valIsReflexive = value === value;
	
	      var othIsNull = other === null,
	          othIsUndef = other === undefined,
	          othIsReflexive = other === other;
	
	      if ((value > other && !othIsNull) || !valIsReflexive ||
	          (valIsNull && !othIsUndef && othIsReflexive) ||
	          (valIsUndef && othIsReflexive)) {
	        return 1;
	      }
	      if ((value < other && !valIsNull) || !othIsReflexive ||
	          (othIsNull && !valIsUndef && valIsReflexive) ||
	          (othIsUndef && valIsReflexive)) {
	        return -1;
	      }
	    }
	    return 0;
	  }
	
	  /**
	   * The base implementation of `_.findIndex` and `_.findLastIndex` without
	   * support for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseFindIndex(array, predicate, fromRight) {
	    var length = array.length,
	        index = fromRight ? length : -1;
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (predicate(array[index], index, array)) {
	        return index;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * The base implementation of `_.indexOf` without support for binary searches.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseIndexOf(array, value, fromIndex) {
	    if (value !== value) {
	      return indexOfNaN(array, fromIndex);
	    }
	    var index = fromIndex - 1,
	        length = array.length;
	
	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * The base implementation of `_.isFunction` without support for environments
	   * with incorrect `typeof` results.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   */
	  function baseIsFunction(value) {
	    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
	    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
	    return typeof value == 'function' || false;
	  }
	
	  /**
	   * Converts `value` to a string if it's not one. An empty string is returned
	   * for `null` or `undefined` values.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   */
	  function baseToString(value) {
	    return value == null ? '' : (value + '');
	  }
	
	  /**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the first character not found in `chars`.
	   */
	  function charsLeftIndex(string, chars) {
	    var index = -1,
	        length = string.length;
	
	    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
	    return index;
	  }
	
	  /**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the last character not found in `chars`.
	   */
	  function charsRightIndex(string, chars) {
	    var index = string.length;
	
	    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
	    return index;
	  }
	
	  /**
	   * Used by `_.sortBy` to compare transformed elements of a collection and stable
	   * sort them in ascending order.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */
	  function compareAscending(object, other) {
	    return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
	  }
	
	  /**
	   * Used by `_.sortByOrder` to compare multiple properties of a value to another
	   * and stable sort them.
	   *
	   * If `orders` is unspecified, all valuess are sorted in ascending order. Otherwise,
	   * a value is sorted in ascending order if its corresponding order is "asc", and
	   * descending if "desc".
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {boolean[]} orders The order to sort by for each property.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */
	  function compareMultiple(object, other, orders) {
	    var index = -1,
	        objCriteria = object.criteria,
	        othCriteria = other.criteria,
	        length = objCriteria.length,
	        ordersLength = orders.length;
	
	    while (++index < length) {
	      var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
	      if (result) {
	        if (index >= ordersLength) {
	          return result;
	        }
	        var order = orders[index];
	        return result * ((order === 'asc' || order === true) ? 1 : -1);
	      }
	    }
	    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	    // that causes it, under certain circumstances, to provide the same value for
	    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	    // for more details.
	    //
	    // This also ensures a stable sort in V8 and other engines.
	    // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
	    return object.index - other.index;
	  }
	
	  /**
	   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	   *
	   * @private
	   * @param {string} letter The matched letter to deburr.
	   * @returns {string} Returns the deburred letter.
	   */
	  function deburrLetter(letter) {
	    return deburredLetters[letter];
	  }
	
	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeHtmlChar(chr) {
	    return htmlEscapes[chr];
	  }
	
	  /**
	   * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @param {string} leadingChar The capture group for a leading character.
	   * @param {string} whitespaceChar The capture group for a whitespace character.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
	    if (leadingChar) {
	      chr = regexpEscapes[chr];
	    } else if (whitespaceChar) {
	      chr = stringEscapes[chr];
	    }
	    return '\\' + chr;
	  }
	
	  /**
	   * Used by `_.template` to escape characters for inclusion in compiled string literals.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeStringChar(chr) {
	    return '\\' + stringEscapes[chr];
	  }
	
	  /**
	   * Gets the index at which the first occurrence of `NaN` is found in `array`.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {number} fromIndex The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	   */
	  function indexOfNaN(array, fromIndex, fromRight) {
	    var length = array.length,
	        index = fromIndex + (fromRight ? 0 : -1);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      var other = array[index];
	      if (other !== other) {
	        return index;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */
	  function isObjectLike(value) {
	    return !!value && typeof value == 'object';
	  }
	
	  /**
	   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
	   * character code is whitespace.
	   *
	   * @private
	   * @param {number} charCode The character code to inspect.
	   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
	   */
	  function isSpace(charCode) {
	    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
	      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
	  }
	
	  /**
	   * Replaces all `placeholder` elements in `array` with an internal placeholder
	   * and returns an array of their indexes.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {*} placeholder The placeholder to replace.
	   * @returns {Array} Returns the new array of placeholder indexes.
	   */
	  function replaceHolders(array, placeholder) {
	    var index = -1,
	        length = array.length,
	        resIndex = -1,
	        result = [];
	
	    while (++index < length) {
	      if (array[index] === placeholder) {
	        array[index] = PLACEHOLDER;
	        result[++resIndex] = index;
	      }
	    }
	    return result;
	  }
	
	  /**
	   * An implementation of `_.uniq` optimized for sorted arrays without support
	   * for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {Function} [iteratee] The function invoked per iteration.
	   * @returns {Array} Returns the new duplicate-value-free array.
	   */
	  function sortedUniq(array, iteratee) {
	    var seen,
	        index = -1,
	        length = array.length,
	        resIndex = -1,
	        result = [];
	
	    while (++index < length) {
	      var value = array[index],
	          computed = iteratee ? iteratee(value, index, array) : value;
	
	      if (!index || seen !== computed) {
	        seen = computed;
	        result[++resIndex] = value;
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the first non-whitespace character.
	   */
	  function trimmedLeftIndex(string) {
	    var index = -1,
	        length = string.length;
	
	    while (++index < length && isSpace(string.charCodeAt(index))) {}
	    return index;
	  }
	
	  /**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the last non-whitespace character.
	   */
	  function trimmedRightIndex(string) {
	    var index = string.length;
	
	    while (index-- && isSpace(string.charCodeAt(index))) {}
	    return index;
	  }
	
	  /**
	   * Used by `_.unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {string} chr The matched character to unescape.
	   * @returns {string} Returns the unescaped character.
	   */
	  function unescapeHtmlChar(chr) {
	    return htmlUnescapes[chr];
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Create a new pristine `lodash` function using the given `context` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns a new `lodash` function.
	   * @example
	   *
	   * _.mixin({ 'foo': _.constant('foo') });
	   *
	   * var lodash = _.runInContext();
	   * lodash.mixin({ 'bar': lodash.constant('bar') });
	   *
	   * _.isFunction(_.foo);
	   * // => true
	   * _.isFunction(_.bar);
	   * // => false
	   *
	   * lodash.isFunction(lodash.foo);
	   * // => false
	   * lodash.isFunction(lodash.bar);
	   * // => true
	   *
	   * // using `context` to mock `Date#getTime` use in `_.now`
	   * var mock = _.runInContext({
	   *   'Date': function() {
	   *     return { 'getTime': getTimeMock };
	   *   }
	   * });
	   *
	   * // or creating a suped-up `defer` in Node.js
	   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
	   */
	  function runInContext(context) {
	    // Avoid issues with some ES3 environments that attempt to use values, named
	    // after built-in constructors like `Object`, for the creation of literals.
	    // ES5 clears this up by stating that literals must use built-in constructors.
	    // See https://es5.github.io/#x11.1.5 for more details.
	    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
	
	    /** Native constructor references. */
	    var Array = context.Array,
	        Date = context.Date,
	        Error = context.Error,
	        Function = context.Function,
	        Math = context.Math,
	        Number = context.Number,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String,
	        TypeError = context.TypeError;
	
	    /** Used for native method references. */
	    var arrayProto = Array.prototype,
	        objectProto = Object.prototype,
	        stringProto = String.prototype;
	
	    /** Used to resolve the decompiled source of functions. */
	    var fnToString = Function.prototype.toString;
	
	    /** Used to check objects for own properties. */
	    var hasOwnProperty = objectProto.hasOwnProperty;
	
	    /** Used to generate unique IDs. */
	    var idCounter = 0;
	
	    /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var objToString = objectProto.toString;
	
	    /** Used to restore the original `_` reference in `_.noConflict`. */
	    var oldDash = root._;
	
	    /** Used to detect if a method is native. */
	    var reIsNative = RegExp('^' +
	      fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	    );
	
	    /** Native method references. */
	    var ArrayBuffer = context.ArrayBuffer,
	        clearTimeout = context.clearTimeout,
	        parseFloat = context.parseFloat,
	        pow = Math.pow,
	        propertyIsEnumerable = objectProto.propertyIsEnumerable,
	        Set = getNative(context, 'Set'),
	        setTimeout = context.setTimeout,
	        splice = arrayProto.splice,
	        Uint8Array = context.Uint8Array,
	        WeakMap = getNative(context, 'WeakMap');
	
	    /* Native method references for those with the same name as other `lodash` methods. */
	    var nativeCeil = Math.ceil,
	        nativeCreate = getNative(Object, 'create'),
	        nativeFloor = Math.floor,
	        nativeIsArray = getNative(Array, 'isArray'),
	        nativeIsFinite = context.isFinite,
	        nativeKeys = getNative(Object, 'keys'),
	        nativeMax = Math.max,
	        nativeMin = Math.min,
	        nativeNow = getNative(Date, 'now'),
	        nativeParseInt = context.parseInt,
	        nativeRandom = Math.random;
	
	    /** Used as references for `-Infinity` and `Infinity`. */
	    var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
	        POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
	
	    /** Used as references for the maximum length and index of an array. */
	    var MAX_ARRAY_LENGTH = 4294967295,
	        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
	        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
	
	    /**
	     * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	     * of an array-like value.
	     */
	    var MAX_SAFE_INTEGER = 9007199254740991;
	
	    /** Used to store function metadata. */
	    var metaMap = WeakMap && new WeakMap;
	
	    /** Used to lookup unminified function names. */
	    var realNames = {};
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
	     * Methods that operate on and return arrays, collections, and functions can
	     * be chained together. Methods that retrieve a single value or may return a
	     * primitive value will automatically end the chain returning the unwrapped
	     * value. Explicit chaining may be enabled using `_.chain`. The execution of
	     * chained methods is lazy, that is, execution is deferred until `_#value`
	     * is implicitly or explicitly called.
	     *
	     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	     * fusion is an optimization strategy which merge iteratee calls; this can help
	     * to avoid the creation of intermediate data structures and greatly reduce the
	     * number of iteratee executions.
	     *
	     * Chaining is supported in custom builds as long as the `_#value` method is
	     * directly or indirectly included in the build.
	     *
	     * In addition to lodash methods, wrappers have `Array` and `String` methods.
	     *
	     * The wrapper `Array` methods are:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
	     * `splice`, and `unshift`
	     *
	     * The wrapper `String` methods are:
	     * `replace` and `split`
	     *
	     * The wrapper methods that support shortcut fusion are:
	     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
	     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
	     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
	     * and `where`
	     *
	     * The chainable wrapper methods are:
	     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
	     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
	     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
	     * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
	     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
	     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	     * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
	     * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
	     * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	     * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
	     * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
	     * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
	     * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
	     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
	     * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
	     * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
	     *
	     * The wrapper methods that are **not** chainable by default are:
	     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
	     * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
	     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
	     * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
	     * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	     * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
	     * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
	     * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
	     * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
	     * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
	     * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
	     * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
	     * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
	     * `unescape`, `uniqueId`, `value`, and `words`
	     *
	     * The wrapper method `sample` will return a wrapped value when `n` is provided,
	     * otherwise an unwrapped value is returned.
	     *
	     * @name _
	     * @constructor
	     * @category Chain
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(total, n) {
	     *   return total + n;
	     * });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(n) {
	     *   return n * n;
	     * });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
	    function lodash(value) {
	      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	        if (value instanceof LodashWrapper) {
	          return value;
	        }
	        if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
	          return wrapperClone(value);
	        }
	      }
	      return new LodashWrapper(value);
	    }
	
	    /**
	     * The function whose prototype all chaining wrappers inherit from.
	     *
	     * @private
	     */
	    function baseLodash() {
	      // No operation performed.
	    }
	
	    /**
	     * The base constructor for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
	     */
	    function LodashWrapper(value, chainAll, actions) {
	      this.__wrapped__ = value;
	      this.__actions__ = actions || [];
	      this.__chain__ = !!chainAll;
	    }
	
	    /**
	     * An object environment feature flags.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    var support = lodash.support = {};
	
	    /**
	     * By default, the template delimiters used by lodash are like those in
	     * embedded Ruby (ERB). Change the following template settings to use
	     * alternative delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    lodash.templateSettings = {
	
	      /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'escape': reEscape,
	
	      /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'evaluate': reEvaluate,
	
	      /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'interpolate': reInterpolate,
	
	      /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */
	      'variable': '',
	
	      /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */
	      'imports': {
	
	        /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */
	        '_': lodash
	      }
	    };
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     */
	    function LazyWrapper(value) {
	      this.__wrapped__ = value;
	      this.__actions__ = [];
	      this.__dir__ = 1;
	      this.__filtered__ = false;
	      this.__iteratees__ = [];
	      this.__takeCount__ = POSITIVE_INFINITY;
	      this.__views__ = [];
	    }
	
	    /**
	     * Creates a clone of the lazy wrapper object.
	     *
	     * @private
	     * @name clone
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the cloned `LazyWrapper` object.
	     */
	    function lazyClone() {
	      var result = new LazyWrapper(this.__wrapped__);
	      result.__actions__ = arrayCopy(this.__actions__);
	      result.__dir__ = this.__dir__;
	      result.__filtered__ = this.__filtered__;
	      result.__iteratees__ = arrayCopy(this.__iteratees__);
	      result.__takeCount__ = this.__takeCount__;
	      result.__views__ = arrayCopy(this.__views__);
	      return result;
	    }
	
	    /**
	     * Reverses the direction of lazy iteration.
	     *
	     * @private
	     * @name reverse
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the new reversed `LazyWrapper` object.
	     */
	    function lazyReverse() {
	      if (this.__filtered__) {
	        var result = new LazyWrapper(this);
	        result.__dir__ = -1;
	        result.__filtered__ = true;
	      } else {
	        result = this.clone();
	        result.__dir__ *= -1;
	      }
	      return result;
	    }
	
	    /**
	     * Extracts the unwrapped value from its lazy wrapper.
	     *
	     * @private
	     * @name value
	     * @memberOf LazyWrapper
	     * @returns {*} Returns the unwrapped value.
	     */
	    function lazyValue() {
	      var array = this.__wrapped__.value(),
	          dir = this.__dir__,
	          isArr = isArray(array),
	          isRight = dir < 0,
	          arrLength = isArr ? array.length : 0,
	          view = getView(0, arrLength, this.__views__),
	          start = view.start,
	          end = view.end,
	          length = end - start,
	          index = isRight ? end : (start - 1),
	          iteratees = this.__iteratees__,
	          iterLength = iteratees.length,
	          resIndex = 0,
	          takeCount = nativeMin(length, this.__takeCount__);
	
	      if (!isArr || arrLength < LARGE_ARRAY_SIZE || (arrLength == length && takeCount == length)) {
	        return baseWrapperValue((isRight && isArr) ? array.reverse() : array, this.__actions__);
	      }
	      var result = [];
	
	      outer:
	      while (length-- && resIndex < takeCount) {
	        index += dir;
	
	        var iterIndex = -1,
	            value = array[index];
	
	        while (++iterIndex < iterLength) {
	          var data = iteratees[iterIndex],
	              iteratee = data.iteratee,
	              type = data.type,
	              computed = iteratee(value);
	
	          if (type == LAZY_MAP_FLAG) {
	            value = computed;
	          } else if (!computed) {
	            if (type == LAZY_FILTER_FLAG) {
	              continue outer;
	            } else {
	              break outer;
	            }
	          }
	        }
	        result[resIndex++] = value;
	      }
	      return result;
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Creates a cache object to store key/value pairs.
	     *
	     * @private
	     * @static
	     * @name Cache
	     * @memberOf _.memoize
	     */
	    function MapCache() {
	      this.__data__ = {};
	    }
	
	    /**
	     * Removes `key` and its value from the cache.
	     *
	     * @private
	     * @name delete
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
	     */
	    function mapDelete(key) {
	      return this.has(key) && delete this.__data__[key];
	    }
	
	    /**
	     * Gets the cached value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the cached value.
	     */
	    function mapGet(key) {
	      return key == '__proto__' ? undefined : this.__data__[key];
	    }
	
	    /**
	     * Checks if a cached value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function mapHas(key) {
	      return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
	    }
	
	    /**
	     * Sets `value` to `key` of the cache.
	     *
	     * @private
	     * @name set
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to cache.
	     * @param {*} value The value to cache.
	     * @returns {Object} Returns the cache object.
	     */
	    function mapSet(key, value) {
	      if (key != '__proto__') {
	        this.__data__[key] = value;
	      }
	      return this;
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     *
	     * Creates a cache object to store unique values.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     */
	    function SetCache(values) {
	      var length = values ? values.length : 0;
	
	      this.data = { 'hash': nativeCreate(null), 'set': new Set };
	      while (length--) {
	        this.push(values[length]);
	      }
	    }
	
	    /**
	     * Checks if `value` is in `cache` mimicking the return signature of
	     * `_.indexOf` by returning `0` if the value is found, else `-1`.
	     *
	     * @private
	     * @param {Object} cache The cache to search.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns `0` if `value` is found, else `-1`.
	     */
	    function cacheIndexOf(cache, value) {
	      var data = cache.data,
	          result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];
	
	      return result ? 0 : -1;
	    }
	
	    /**
	     * Adds `value` to the cache.
	     *
	     * @private
	     * @name push
	     * @memberOf SetCache
	     * @param {*} value The value to cache.
	     */
	    function cachePush(value) {
	      var data = this.data;
	      if (typeof value == 'string' || isObject(value)) {
	        data.set.add(value);
	      } else {
	        data.hash[value] = true;
	      }
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Creates a new array joining `array` with `other`.
	     *
	     * @private
	     * @param {Array} array The array to join.
	     * @param {Array} other The other array to join.
	     * @returns {Array} Returns the new concatenated array.
	     */
	    function arrayConcat(array, other) {
	      var index = -1,
	          length = array.length,
	          othIndex = -1,
	          othLength = other.length,
	          result = Array(length + othLength);
	
	      while (++index < length) {
	        result[index] = array[index];
	      }
	      while (++othIndex < othLength) {
	        result[index++] = other[othIndex];
	      }
	      return result;
	    }
	
	    /**
	     * Copies the values of `source` to `array`.
	     *
	     * @private
	     * @param {Array} source The array to copy values from.
	     * @param {Array} [array=[]] The array to copy values to.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayCopy(source, array) {
	      var index = -1,
	          length = source.length;
	
	      array || (array = Array(length));
	      while (++index < length) {
	        array[index] = source[index];
	      }
	      return array;
	    }
	
	    /**
	     * A specialized version of `_.forEach` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayEach(array, iteratee) {
	      var index = -1,
	          length = array.length;
	
	      while (++index < length) {
	        if (iteratee(array[index], index, array) === false) {
	          break;
	        }
	      }
	      return array;
	    }
	
	    /**
	     * A specialized version of `_.forEachRight` for arrays without support for
	     * callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayEachRight(array, iteratee) {
	      var length = array.length;
	
	      while (length--) {
	        if (iteratee(array[length], length, array) === false) {
	          break;
	        }
	      }
	      return array;
	    }
	
	    /**
	     * A specialized version of `_.every` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     */
	    function arrayEvery(array, predicate) {
	      var index = -1,
	          length = array.length;
	
	      while (++index < length) {
	        if (!predicate(array[index], index, array)) {
	          return false;
	        }
	      }
	      return true;
	    }
	
	    /**
	     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
	     * with one argument: (value).
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {*} Returns the extremum value.
	     */
	    function arrayExtremum(array, iteratee, comparator, exValue) {
	      var index = -1,
	          length = array.length,
	          computed = exValue,
	          result = computed;
	
	      while (++index < length) {
	        var value = array[index],
	            current = +iteratee(value);
	
	        if (comparator(current, computed)) {
	          computed = current;
	          result = value;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * A specialized version of `_.filter` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */
	    function arrayFilter(array, predicate) {
	      var index = -1,
	          length = array.length,
	          resIndex = -1,
	          result = [];
	
	      while (++index < length) {
	        var value = array[index];
	        if (predicate(value, index, array)) {
	          result[++resIndex] = value;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * A specialized version of `_.map` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
	    function arrayMap(array, iteratee) {
	      var index = -1,
	          length = array.length,
	          result = Array(length);
	
	      while (++index < length) {
	        result[index] = iteratee(array[index], index, array);
	      }
	      return result;
	    }
	
	    /**
	     * Appends the elements of `values` to `array`.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to append.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayPush(array, values) {
	      var index = -1,
	          length = values.length,
	          offset = array.length;
	
	      while (++index < length) {
	        array[offset + index] = values[index];
	      }
	      return array;
	    }
	
	    /**
	     * A specialized version of `_.reduce` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {boolean} [initFromArray] Specify using the first element of `array`
	     *  as the initial value.
	     * @returns {*} Returns the accumulated value.
	     */
	    function arrayReduce(array, iteratee, accumulator, initFromArray) {
	      var index = -1,
	          length = array.length;
	
	      if (initFromArray && length) {
	        accumulator = array[++index];
	      }
	      while (++index < length) {
	        accumulator = iteratee(accumulator, array[index], index, array);
	      }
	      return accumulator;
	    }
	
	    /**
	     * A specialized version of `_.reduceRight` for arrays without support for
	     * callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {boolean} [initFromArray] Specify using the last element of `array`
	     *  as the initial value.
	     * @returns {*} Returns the accumulated value.
	     */
	    function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
	      var length = array.length;
	      if (initFromArray && length) {
	        accumulator = array[--length];
	      }
	      while (length--) {
	        accumulator = iteratee(accumulator, array[length], length, array);
	      }
	      return accumulator;
	    }
	
	    /**
	     * A specialized version of `_.some` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */
	    function arraySome(array, predicate) {
	      var index = -1,
	          length = array.length;
	
	      while (++index < length) {
	        if (predicate(array[index], index, array)) {
	          return true;
	        }
	      }
	      return false;
	    }
	
	    /**
	     * A specialized version of `_.sum` for arrays without support for callback
	     * shorthands and `this` binding..
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {number} Returns the sum.
	     */
	    function arraySum(array, iteratee) {
	      var length = array.length,
	          result = 0;
	
	      while (length--) {
	        result += +iteratee(array[length]) || 0;
	      }
	      return result;
	    }
	
	    /**
	     * Used by `_.defaults` to customize its `_.assign` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */
	    function assignDefaults(objectValue, sourceValue) {
	      return objectValue === undefined ? sourceValue : objectValue;
	    }
	
	    /**
	     * Used by `_.template` to customize its `_.assign` use.
	     *
	     * **Note:** This function is like `assignDefaults` except that it ignores
	     * inherited property values when checking if a property is `undefined`.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @param {string} key The key associated with the object and source values.
	     * @param {Object} object The destination object.
	     * @returns {*} Returns the value to assign to the destination object.
	     */
	    function assignOwnDefaults(objectValue, sourceValue, key, object) {
	      return (objectValue === undefined || !hasOwnProperty.call(object, key))
	        ? sourceValue
	        : objectValue;
	    }
	
	    /**
	     * A specialized version of `_.assign` for customizing assigned values without
	     * support for argument juggling, multiple sources, and `this` binding `customizer`
	     * functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     */
	    function assignWith(object, source, customizer) {
	      var index = -1,
	          props = keys(source),
	          length = props.length;
	
	      while (++index < length) {
	        var key = props[index],
	            value = object[key],
	            result = customizer(value, source[key], key, object, source);
	
	        if ((result === result ? (result !== value) : (value === value)) ||
	            (value === undefined && !(key in object))) {
	          object[key] = result;
	        }
	      }
	      return object;
	    }
	
	    /**
	     * The base implementation of `_.assign` without support for argument juggling,
	     * multiple sources, and `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */
	    function baseAssign(object, source) {
	      return source == null
	        ? object
	        : baseCopy(source, keys(source), object);
	    }
	
	    /**
	     * The base implementation of `_.at` without support for string collections
	     * and individual key arguments.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {number[]|string[]} props The property names or indexes of elements to pick.
	     * @returns {Array} Returns the new array of picked elements.
	     */
	    function baseAt(collection, props) {
	      var index = -1,
	          isNil = collection == null,
	          isArr = !isNil && isArrayLike(collection),
	          length = isArr ? collection.length : 0,
	          propsLength = props.length,
	          result = Array(propsLength);
	
	      while(++index < propsLength) {
	        var key = props[index];
	        if (isArr) {
	          result[index] = isIndex(key, length) ? collection[key] : undefined;
	        } else {
	          result[index] = isNil ? undefined : collection[key];
	        }
	      }
	      return result;
	    }
	
	    /**
	     * Copies properties of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy properties from.
	     * @param {Array} props The property names to copy.
	     * @param {Object} [object={}] The object to copy properties to.
	     * @returns {Object} Returns `object`.
	     */
	    function baseCopy(source, props, object) {
	      object || (object = {});
	
	      var index = -1,
	          length = props.length;
	
	      while (++index < length) {
	        var key = props[index];
	        object[key] = source[key];
	      }
	      return object;
	    }
	
	    /**
	     * The base implementation of `_.callback` which supports specifying the
	     * number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */
	    function baseCallback(func, thisArg, argCount) {
	      var type = typeof func;
	      if (type == 'function') {
	        return thisArg === undefined
	          ? func
	          : bindCallback(func, thisArg, argCount);
	      }
	      if (func == null) {
	        return identity;
	      }
	      if (type == 'object') {
	        return baseMatches(func);
	      }
	      return thisArg === undefined
	        ? property(func)
	        : baseMatchesProperty(func, thisArg);
	    }
	
	    /**
	     * The base implementation of `_.clone` without support for argument juggling
	     * and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {string} [key] The key of `value`.
	     * @param {Object} [object] The object `value` belongs to.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */
	    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	      var result;
	      if (customizer) {
	        result = object ? customizer(value, key, object) : customizer(value);
	      }
	      if (result !== undefined) {
	        return result;
	      }
	      if (!isObject(value)) {
	        return value;
	      }
	      var isArr = isArray(value);
	      if (isArr) {
	        result = initCloneArray(value);
	        if (!isDeep) {
	          return arrayCopy(value, result);
	        }
	      } else {
	        var tag = objToString.call(value),
	            isFunc = tag == funcTag;
	
	        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	          result = initCloneObject(isFunc ? {} : value);
	          if (!isDeep) {
	            return baseAssign(result, value);
	          }
	        } else {
	          return cloneableTags[tag]
	            ? initCloneByTag(value, tag, isDeep)
	            : (object ? value : {});
	        }
	      }
	      // Check for circular references and return its corresponding clone.
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	
	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == value) {
	          return stackB[length];
	        }
	      }
	      // Add the source value to the stack of traversed objects and associate it with its clone.
	      stackA.push(value);
	      stackB.push(result);
	
	      // Recursively populate clone (susceptible to call stack limits).
	      (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	        result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	      });
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
	    var baseCreate = (function() {
	      function object() {}
	      return function(prototype) {
	        if (isObject(prototype)) {
	          object.prototype = prototype;
	          var result = new object;
	          object.prototype = undefined;
	        }
	        return result || {};
	      };
	    }());
	
	    /**
	     * The base implementation of `_.delay` and `_.defer` which accepts an index
	     * of where to slice the arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {Object} args The arguments provide to `func`.
	     * @returns {number} Returns the timer id.
	     */
	    function baseDelay(func, wait, args) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return setTimeout(function() { func.apply(undefined, args); }, wait);
	    }
	
	    /**
	     * The base implementation of `_.difference` which accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Array} values The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     */
	    function baseDifference(array, values) {
	      var length = array ? array.length : 0,
	          result = [];
	
	      if (!length) {
	        return result;
	      }
	      var index = -1,
	          indexOf = getIndexOf(),
	          isCommon = indexOf == baseIndexOf,
	          cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
	          valuesLength = values.length;
	
	      if (cache) {
	        indexOf = cacheIndexOf;
	        isCommon = false;
	        values = cache;
	      }
	      outer:
	      while (++index < length) {
	        var value = array[index];
	
	        if (isCommon && value === value) {
	          var valuesIndex = valuesLength;
	          while (valuesIndex--) {
	            if (values[valuesIndex] === value) {
	              continue outer;
	            }
	          }
	          result.push(value);
	        }
	        else if (indexOf(values, value, 0) < 0) {
	          result.push(value);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.forEach` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    var baseEach = createBaseEach(baseForOwn);
	
	    /**
	     * The base implementation of `_.forEachRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    var baseEachRight = createBaseEach(baseForOwnRight, true);
	
	    /**
	     * The base implementation of `_.every` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`
	     */
	    function baseEvery(collection, predicate) {
	      var result = true;
	      baseEach(collection, function(value, index, collection) {
	        result = !!predicate(value, index, collection);
	        return result;
	      });
	      return result;
	    }
	
	    /**
	     * Gets the extremum value of `collection` invoking `iteratee` for each value
	     * in `collection` to generate the criterion by which the value is ranked.
	     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {*} Returns the extremum value.
	     */
	    function baseExtremum(collection, iteratee, comparator, exValue) {
	      var computed = exValue,
	          result = computed;
	
	      baseEach(collection, function(value, index, collection) {
	        var current = +iteratee(value, index, collection);
	        if (comparator(current, computed) || (current === exValue && current === result)) {
	          computed = current;
	          result = value;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.fill` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     */
	    function baseFill(array, value, start, end) {
	      var length = array.length;
	
	      start = start == null ? 0 : (+start || 0);
	      if (start < 0) {
	        start = -start > length ? 0 : (length + start);
	      }
	      end = (end === undefined || end > length) ? length : (+end || 0);
	      if (end < 0) {
	        end += length;
	      }
	      length = start > end ? 0 : (end >>> 0);
	      start >>>= 0;
	
	      while (start < length) {
	        array[start++] = value;
	      }
	      return array;
	    }
	
	    /**
	     * The base implementation of `_.filter` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */
	    function baseFilter(collection, predicate) {
	      var result = [];
	      baseEach(collection, function(value, index, collection) {
	        if (predicate(value, index, collection)) {
	          result.push(value);
	        }
	      });
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	     * without support for callback shorthands and `this` binding, which iterates
	     * over `collection` using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @param {boolean} [retKey] Specify returning the key of the found element
	     *  instead of the element itself.
	     * @returns {*} Returns the found element or its key, else `undefined`.
	     */
	    function baseFind(collection, predicate, eachFunc, retKey) {
	      var result;
	      eachFunc(collection, function(value, key, collection) {
	        if (predicate(value, key, collection)) {
	          result = retKey ? key : value;
	          return false;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.flatten` with added support for restricting
	     * flattening and specifying the start index.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	     * @param {Array} [result=[]] The initial result value.
	     * @returns {Array} Returns the new flattened array.
	     */
	    function baseFlatten(array, isDeep, isStrict, result) {
	      result || (result = []);
	
	      var index = -1,
	          length = array.length;
	
	      while (++index < length) {
	        var value = array[index];
	        if (isObjectLike(value) && isArrayLike(value) &&
	            (isStrict || isArray(value) || isArguments(value))) {
	          if (isDeep) {
	            // Recursively flatten arrays (susceptible to call stack limits).
	            baseFlatten(value, isDeep, isStrict, result);
	          } else {
	            arrayPush(result, value);
	          }
	        } else if (!isStrict) {
	          result[result.length] = value;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `baseForIn` and `baseForOwn` which iterates
	     * over `object` properties returned by `keysFunc` invoking `iteratee` for
	     * each property. Iteratee functions may exit iteration early by explicitly
	     * returning `false`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    var baseFor = createBaseFor();
	
	    /**
	     * This function is like `baseFor` except that it iterates over properties
	     * in the opposite order.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    var baseForRight = createBaseFor(true);
	
	    /**
	     * The base implementation of `_.forIn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForIn(object, iteratee) {
	      return baseFor(object, iteratee, keysIn);
	    }
	
	    /**
	     * The base implementation of `_.forOwn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwn(object, iteratee) {
	      return baseFor(object, iteratee, keys);
	    }
	
	    /**
	     * The base implementation of `_.forOwnRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwnRight(object, iteratee) {
	      return baseForRight(object, iteratee, keys);
	    }
	
	    /**
	     * The base implementation of `_.functions` which creates an array of
	     * `object` function property names filtered from those provided.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} props The property names to filter.
	     * @returns {Array} Returns the new array of filtered property names.
	     */
	    function baseFunctions(object, props) {
	      var index = -1,
	          length = props.length,
	          resIndex = -1,
	          result = [];
	
	      while (++index < length) {
	        var key = props[index];
	        if (isFunction(object[key])) {
	          result[++resIndex] = key;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `get` without support for string paths
	     * and default values.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} path The path of the property to get.
	     * @param {string} [pathKey] The key representation of path.
	     * @returns {*} Returns the resolved value.
	     */
	    function baseGet(object, path, pathKey) {
	      if (object == null) {
	        return;
	      }
	      if (pathKey !== undefined && pathKey in toObject(object)) {
	        path = [pathKey];
	      }
	      var index = 0,
	          length = path.length;
	
	      while (object != null && index < length) {
	        object = object[path[index++]];
	      }
	      return (index && index == length) ? object : undefined;
	    }
	
	    /**
	     * The base implementation of `_.isEqual` without support for `this` binding
	     * `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	      if (value === other) {
	        return true;
	      }
	      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	        return value !== value && other !== other;
	      }
	      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	    }
	
	    /**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * deep comparisons and tracks traversed objects enabling objects with circular
	     * references to be compared.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	      var objIsArr = isArray(object),
	          othIsArr = isArray(other),
	          objTag = arrayTag,
	          othTag = arrayTag;
	
	      if (!objIsArr) {
	        objTag = objToString.call(object);
	        if (objTag == argsTag) {
	          objTag = objectTag;
	        } else if (objTag != objectTag) {
	          objIsArr = isTypedArray(object);
	        }
	      }
	      if (!othIsArr) {
	        othTag = objToString.call(other);
	        if (othTag == argsTag) {
	          othTag = objectTag;
	        } else if (othTag != objectTag) {
	          othIsArr = isTypedArray(other);
	        }
	      }
	      var objIsObj = objTag == objectTag,
	          othIsObj = othTag == objectTag,
	          isSameTag = objTag == othTag;
	
	      if (isSameTag && !(objIsArr || objIsObj)) {
	        return equalByTag(object, other, objTag);
	      }
	      if (!isLoose) {
	        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	        if (objIsWrapped || othIsWrapped) {
	          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	        }
	      }
	      if (!isSameTag) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      // For more information on detecting circular references see https://es5.github.io/#JO.
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	
	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == object) {
	          return stackB[length] == other;
	        }
	      }
	      // Add `object` and `other` to the stack of traversed objects.
	      stackA.push(object);
	      stackB.push(other);
	
	      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);
	
	      stackA.pop();
	      stackB.pop();
	
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.isMatch` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} matchData The propery names, values, and compare flags to match.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */
	    function baseIsMatch(object, matchData, customizer) {
	      var index = matchData.length,
	          length = index,
	          noCustomizer = !customizer;
	
	      if (object == null) {
	        return !length;
	      }
	      object = toObject(object);
	      while (index--) {
	        var data = matchData[index];
	        if ((noCustomizer && data[2])
	              ? data[1] !== object[data[0]]
	              : !(data[0] in object)
	            ) {
	          return false;
	        }
	      }
	      while (++index < length) {
	        data = matchData[index];
	        var key = data[0],
	            objValue = object[key],
	            srcValue = data[1];
	
	        if (noCustomizer && data[2]) {
	          if (objValue === undefined && !(key in object)) {
	            return false;
	          }
	        } else {
	          var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	            return false;
	          }
	        }
	      }
	      return true;
	    }
	
	    /**
	     * The base implementation of `_.map` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
	    function baseMap(collection, iteratee) {
	      var index = -1,
	          result = isArrayLike(collection) ? Array(collection.length) : [];
	
	      baseEach(collection, function(value, key, collection) {
	        result[++index] = iteratee(value, key, collection);
	      });
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.matches` which does not clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     */
	    function baseMatches(source) {
	      var matchData = getMatchData(source);
	      if (matchData.length == 1 && matchData[0][2]) {
	        var key = matchData[0][0],
	            value = matchData[0][1];
	
	        return function(object) {
	          if (object == null) {
	            return false;
	          }
	          return object[key] === value && (value !== undefined || (key in toObject(object)));
	        };
	      }
	      return function(object) {
	        return baseIsMatch(object, matchData);
	      };
	    }
	
	    /**
	     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	     *
	     * @private
	     * @param {string} path The path of the property to get.
	     * @param {*} srcValue The value to compare.
	     * @returns {Function} Returns the new function.
	     */
	    function baseMatchesProperty(path, srcValue) {
	      var isArr = isArray(path),
	          isCommon = isKey(path) && isStrictComparable(srcValue),
	          pathKey = (path + '');
	
	      path = toPath(path);
	      return function(object) {
	        if (object == null) {
	          return false;
	        }
	        var key = pathKey;
	        object = toObject(object);
	        if ((isArr || !isCommon) && !(key in object)) {
	          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	          if (object == null) {
	            return false;
	          }
	          key = last(path);
	          object = toObject(object);
	        }
	        return object[key] === srcValue
	          ? (srcValue !== undefined || (key in object))
	          : baseIsEqual(srcValue, object[key], undefined, true);
	      };
	    }
	
	    /**
	     * The base implementation of `_.merge` without support for argument juggling,
	     * multiple sources, and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {Object} Returns `object`.
	     */
	    function baseMerge(object, source, customizer, stackA, stackB) {
	      if (!isObject(object)) {
	        return object;
	      }
	      var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	          props = isSrcArr ? undefined : keys(source);
	
	      arrayEach(props || source, function(srcValue, key) {
	        if (props) {
	          key = srcValue;
	          srcValue = source[key];
	        }
	        if (isObjectLike(srcValue)) {
	          stackA || (stackA = []);
	          stackB || (stackB = []);
	          baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	        }
	        else {
	          var value = object[key],
	              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	              isCommon = result === undefined;
	
	          if (isCommon) {
	            result = srcValue;
	          }
	          if ((result !== undefined || (isSrcArr && !(key in object))) &&
	              (isCommon || (result === result ? (result !== value) : (value === value)))) {
	            object[key] = result;
	          }
	        }
	      });
	      return object;
	    }
	
	    /**
	     * A specialized version of `baseMerge` for arrays and objects which performs
	     * deep merges and tracks traversed objects enabling objects with circular
	     * references to be merged.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {string} key The key of the value to merge.
	     * @param {Function} mergeFunc The function to merge values.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	      var length = stackA.length,
	          srcValue = source[key];
	
	      while (length--) {
	        if (stackA[length] == srcValue) {
	          object[key] = stackB[length];
	          return;
	        }
	      }
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;
	
	      if (isCommon) {
	        result = srcValue;
	        if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	          result = isArray(value)
	            ? value
	            : (isArrayLike(value) ? arrayCopy(value) : []);
	        }
	        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	          result = isArguments(value)
	            ? toPlainObject(value)
	            : (isPlainObject(value) ? value : {});
	        }
	        else {
	          isCommon = false;
	        }
	      }
	      // Add the source value to the stack of traversed objects and associate
	      // it with its merged value.
	      stackA.push(srcValue);
	      stackB.push(result);
	
	      if (isCommon) {
	        // Recursively merge objects and arrays (susceptible to call stack limits).
	        object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	      } else if (result === result ? (result !== value) : (value === value)) {
	        object[key] = result;
	      }
	    }
	
	    /**
	     * The base implementation of `_.property` without support for deep paths.
	     *
	     * @private
	     * @param {string} key The key of the property to get.
	     * @returns {Function} Returns the new function.
	     */
	    function baseProperty(key) {
	      return function(object) {
	        return object == null ? undefined : object[key];
	      };
	    }
	
	    /**
	     * A specialized version of `baseProperty` which supports deep paths.
	     *
	     * @private
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     */
	    function basePropertyDeep(path) {
	      var pathKey = (path + '');
	      path = toPath(path);
	      return function(object) {
	        return baseGet(object, path, pathKey);
	      };
	    }
	
	    /**
	     * The base implementation of `_.pullAt` without support for individual
	     * index arguments and capturing the removed elements.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {number[]} indexes The indexes of elements to remove.
	     * @returns {Array} Returns `array`.
	     */
	    function basePullAt(array, indexes) {
	      var length = array ? indexes.length : 0;
	      while (length--) {
	        var index = indexes[length];
	        if (index != previous && isIndex(index)) {
	          var previous = index;
	          splice.call(array, index, 1);
	        }
	      }
	      return array;
	    }
	
	    /**
	     * The base implementation of `_.random` without support for argument juggling
	     * and returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns the random number.
	     */
	    function baseRandom(min, max) {
	      return min + nativeFloor(nativeRandom() * (max - min + 1));
	    }
	
	    /**
	     * The base implementation of `_.reduce` and `_.reduceRight` without support
	     * for callback shorthands and `this` binding, which iterates over `collection`
	     * using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} accumulator The initial value.
	     * @param {boolean} initFromCollection Specify using the first or last element
	     *  of `collection` as the initial value.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @returns {*} Returns the accumulated value.
	     */
	    function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
	      eachFunc(collection, function(value, index, collection) {
	        accumulator = initFromCollection
	          ? (initFromCollection = false, value)
	          : iteratee(accumulator, value, index, collection);
	      });
	      return accumulator;
	    }
	
	    /**
	     * The base implementation of `setData` without support for hot loop detection.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
	    var baseSetData = !metaMap ? identity : function(func, data) {
	      metaMap.set(func, data);
	      return func;
	    };
	
	    /**
	     * The base implementation of `_.slice` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function baseSlice(array, start, end) {
	      var index = -1,
	          length = array.length;
	
	      start = start == null ? 0 : (+start || 0);
	      if (start < 0) {
	        start = -start > length ? 0 : (length + start);
	      }
	      end = (end === undefined || end > length) ? length : (+end || 0);
	      if (end < 0) {
	        end += length;
	      }
	      length = start > end ? 0 : ((end - start) >>> 0);
	      start >>>= 0;
	
	      var result = Array(length);
	      while (++index < length) {
	        result[index] = array[index + start];
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.some` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */
	    function baseSome(collection, predicate) {
	      var result;
	
	      baseEach(collection, function(value, index, collection) {
	        result = predicate(value, index, collection);
	        return !result;
	      });
	      return !!result;
	    }
	
	    /**
	     * The base implementation of `_.sortBy` which uses `comparer` to define
	     * the sort order of `array` and replaces criteria objects with their
	     * corresponding values.
	     *
	     * @private
	     * @param {Array} array The array to sort.
	     * @param {Function} comparer The function to define sort order.
	     * @returns {Array} Returns `array`.
	     */
	    function baseSortBy(array, comparer) {
	      var length = array.length;
	
	      array.sort(comparer);
	      while (length--) {
	        array[length] = array[length].value;
	      }
	      return array;
	    }
	
	    /**
	     * The base implementation of `_.sortByOrder` without param guards.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {boolean[]} orders The sort orders of `iteratees`.
	     * @returns {Array} Returns the new sorted array.
	     */
	    function baseSortByOrder(collection, iteratees, orders) {
	      var callback = getCallback(),
	          index = -1;
	
	      iteratees = arrayMap(iteratees, function(iteratee) { return callback(iteratee); });
	
	      var result = baseMap(collection, function(value) {
	        var criteria = arrayMap(iteratees, function(iteratee) { return iteratee(value); });
	        return { 'criteria': criteria, 'index': ++index, 'value': value };
	      });
	
	      return baseSortBy(result, function(object, other) {
	        return compareMultiple(object, other, orders);
	      });
	    }
	
	    /**
	     * The base implementation of `_.sum` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {number} Returns the sum.
	     */
	    function baseSum(collection, iteratee) {
	      var result = 0;
	      baseEach(collection, function(value, index, collection) {
	        result += +iteratee(value, index, collection) || 0;
	      });
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The function invoked per iteration.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     */
	    function baseUniq(array, iteratee) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array.length,
	          isCommon = indexOf == baseIndexOf,
	          isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
	          seen = isLarge ? createCache() : null,
	          result = [];
	
	      if (seen) {
	        indexOf = cacheIndexOf;
	        isCommon = false;
	      } else {
	        isLarge = false;
	        seen = iteratee ? [] : result;
	      }
	      outer:
	      while (++index < length) {
	        var value = array[index],
	            computed = iteratee ? iteratee(value, index, array) : value;
	
	        if (isCommon && value === value) {
	          var seenIndex = seen.length;
	          while (seenIndex--) {
	            if (seen[seenIndex] === computed) {
	              continue outer;
	            }
	          }
	          if (iteratee) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	        else if (indexOf(seen, computed, 0) < 0) {
	          if (iteratee || isLarge) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.values` and `_.valuesIn` which creates an
	     * array of `object` property values corresponding to the property names
	     * of `props`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} props The property names to get values for.
	     * @returns {Object} Returns the array of property values.
	     */
	    function baseValues(object, props) {
	      var index = -1,
	          length = props.length,
	          result = Array(length);
	
	      while (++index < length) {
	        result[index] = object[props[index]];
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
	     * and `_.takeWhile` without support for callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function baseWhile(array, predicate, isDrop, fromRight) {
	      var length = array.length,
	          index = fromRight ? length : -1;
	
	      while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
	      return isDrop
	        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
	        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
	    }
	
	    /**
	     * The base implementation of `wrapperValue` which returns the result of
	     * performing a sequence of actions on the unwrapped `value`, where each
	     * successive action is supplied the return value of the previous.
	     *
	     * @private
	     * @param {*} value The unwrapped value.
	     * @param {Array} actions Actions to peform to resolve the unwrapped value.
	     * @returns {*} Returns the resolved value.
	     */
	    function baseWrapperValue(value, actions) {
	      var result = value;
	      if (result instanceof LazyWrapper) {
	        result = result.value();
	      }
	      var index = -1,
	          length = actions.length;
	
	      while (++index < length) {
	        var action = actions[index];
	        result = action.func.apply(action.thisArg, arrayPush([result], action.args));
	      }
	      return result;
	    }
	
	    /**
	     * Performs a binary search of `array` to determine the index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
	    function binaryIndex(array, value, retHighest) {
	      var low = 0,
	          high = array ? array.length : low;
	
	      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
	        while (low < high) {
	          var mid = (low + high) >>> 1,
	              computed = array[mid];
	
	          if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
	            low = mid + 1;
	          } else {
	            high = mid;
	          }
	        }
	        return high;
	      }
	      return binaryIndexBy(array, value, identity, retHighest);
	    }
	
	    /**
	     * This function is like `binaryIndex` except that it invokes `iteratee` for
	     * `value` and each element of `array` to compute their sort ranking. The
	     * iteratee is invoked with one argument; (value).
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
	    function binaryIndexBy(array, value, iteratee, retHighest) {
	      value = iteratee(value);
	
	      var low = 0,
	          high = array ? array.length : 0,
	          valIsNaN = value !== value,
	          valIsNull = value === null,
	          valIsUndef = value === undefined;
	
	      while (low < high) {
	        var mid = nativeFloor((low + high) / 2),
	            computed = iteratee(array[mid]),
	            isDef = computed !== undefined,
	            isReflexive = computed === computed;
	
	        if (valIsNaN) {
	          var setLow = isReflexive || retHighest;
	        } else if (valIsNull) {
	          setLow = isReflexive && isDef && (retHighest || computed != null);
	        } else if (valIsUndef) {
	          setLow = isReflexive && (retHighest || isDef);
	        } else if (computed == null) {
	          setLow = false;
	        } else {
	          setLow = retHighest ? (computed <= value) : (computed < value);
	        }
	        if (setLow) {
	          low = mid + 1;
	        } else {
	          high = mid;
	        }
	      }
	      return nativeMin(high, MAX_ARRAY_INDEX);
	    }
	
	    /**
	     * A specialized version of `baseCallback` which only supports `this` binding
	     * and specifying the number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */
	    function bindCallback(func, thisArg, argCount) {
	      if (typeof func != 'function') {
	        return identity;
	      }
	      if (thisArg === undefined) {
	        return func;
	      }
	      switch (argCount) {
	        case 1: return function(value) {
	          return func.call(thisArg, value);
	        };
	        case 3: return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	        case 4: return function(accumulator, value, index, collection) {
	          return func.call(thisArg, accumulator, value, index, collection);
	        };
	        case 5: return function(value, other, key, object, source) {
	          return func.call(thisArg, value, other, key, object, source);
	        };
	      }
	      return function() {
	        return func.apply(thisArg, arguments);
	      };
	    }
	
	    /**
	     * Creates a clone of the given array buffer.
	     *
	     * @private
	     * @param {ArrayBuffer} buffer The array buffer to clone.
	     * @returns {ArrayBuffer} Returns the cloned array buffer.
	     */
	    function bufferClone(buffer) {
	      var result = new ArrayBuffer(buffer.byteLength),
	          view = new Uint8Array(result);
	
	      view.set(new Uint8Array(buffer));
	      return result;
	    }
	
	    /**
	     * Creates an array that is the composition of partially applied arguments,
	     * placeholders, and provided arguments into a single array of arguments.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to prepend to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
	    function composeArgs(args, partials, holders) {
	      var holdersLength = holders.length,
	          argsIndex = -1,
	          argsLength = nativeMax(args.length - holdersLength, 0),
	          leftIndex = -1,
	          leftLength = partials.length,
	          result = Array(leftLength + argsLength);
	
	      while (++leftIndex < leftLength) {
	        result[leftIndex] = partials[leftIndex];
	      }
	      while (++argsIndex < holdersLength) {
	        result[holders[argsIndex]] = args[argsIndex];
	      }
	      while (argsLength--) {
	        result[leftIndex++] = args[argsIndex++];
	      }
	      return result;
	    }
	
	    /**
	     * This function is like `composeArgs` except that the arguments composition
	     * is tailored for `_.partialRight`.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to append to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
	    function composeArgsRight(args, partials, holders) {
	      var holdersIndex = -1,
	          holdersLength = holders.length,
	          argsIndex = -1,
	          argsLength = nativeMax(args.length - holdersLength, 0),
	          rightIndex = -1,
	          rightLength = partials.length,
	          result = Array(argsLength + rightLength);
	
	      while (++argsIndex < argsLength) {
	        result[argsIndex] = args[argsIndex];
	      }
	      var offset = argsIndex;
	      while (++rightIndex < rightLength) {
	        result[offset + rightIndex] = partials[rightIndex];
	      }
	      while (++holdersIndex < holdersLength) {
	        result[offset + holders[holdersIndex]] = args[argsIndex++];
	      }
	      return result;
	    }
	
	    /**
	     * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
	     *
	     * @private
	     * @param {Function} setter The function to set keys and values of the accumulator object.
	     * @param {Function} [initializer] The function to initialize the accumulator object.
	     * @returns {Function} Returns the new aggregator function.
	     */
	    function createAggregator(setter, initializer) {
	      return function(collection, iteratee, thisArg) {
	        var result = initializer ? initializer() : {};
	        iteratee = getCallback(iteratee, thisArg, 3);
	
	        if (isArray(collection)) {
	          var index = -1,
	              length = collection.length;
	
	          while (++index < length) {
	            var value = collection[index];
	            setter(result, value, iteratee(value, index, collection), collection);
	          }
	        } else {
	          baseEach(collection, function(value, key, collection) {
	            setter(result, value, iteratee(value, key, collection), collection);
	          });
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @returns {Function} Returns the new assigner function.
	     */
	    function createAssigner(assigner) {
	      return restParam(function(object, sources) {
	        var index = -1,
	            length = object == null ? 0 : sources.length,
	            customizer = length > 2 ? sources[length - 2] : undefined,
	            guard = length > 2 ? sources[2] : undefined,
	            thisArg = length > 1 ? sources[length - 1] : undefined;
	
	        if (typeof customizer == 'function') {
	          customizer = bindCallback(customizer, thisArg, 5);
	          length -= 2;
	        } else {
	          customizer = typeof thisArg == 'function' ? thisArg : undefined;
	          length -= (customizer ? 1 : 0);
	        }
	        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	          customizer = length < 3 ? undefined : customizer;
	          length = 1;
	        }
	        while (++index < length) {
	          var source = sources[index];
	          if (source) {
	            assigner(object, source, customizer);
	          }
	        }
	        return object;
	      });
	    }
	
	    /**
	     * Creates a `baseEach` or `baseEachRight` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
	    function createBaseEach(eachFunc, fromRight) {
	      return function(collection, iteratee) {
	        var length = collection ? getLength(collection) : 0;
	        if (!isLength(length)) {
	          return eachFunc(collection, iteratee);
	        }
	        var index = fromRight ? length : -1,
	            iterable = toObject(collection);
	
	        while ((fromRight ? index-- : ++index < length)) {
	          if (iteratee(iterable[index], index, iterable) === false) {
	            break;
	          }
	        }
	        return collection;
	      };
	    }
	
	    /**
	     * Creates a base function for `_.forIn` or `_.forInRight`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
	    function createBaseFor(fromRight) {
	      return function(object, iteratee, keysFunc) {
	        var iterable = toObject(object),
	            props = keysFunc(object),
	            length = props.length,
	            index = fromRight ? length : -1;
	
	        while ((fromRight ? index-- : ++index < length)) {
	          var key = props[index];
	          if (iteratee(iterable[key], key, iterable) === false) {
	            break;
	          }
	        }
	        return object;
	      };
	    }
	
	    /**
	     * Creates a function that wraps `func` and invokes it with the `this`
	     * binding of `thisArg`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @returns {Function} Returns the new bound function.
	     */
	    function createBindWrapper(func, thisArg) {
	      var Ctor = createCtorWrapper(func);
	
	      function wrapper() {
	        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	        return fn.apply(thisArg, arguments);
	      }
	      return wrapper;
	    }
	
	    /**
	     * Creates a `Set` cache object to optimize linear searches of large arrays.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	     */
	    function createCache(values) {
	      return (nativeCreate && Set) ? new SetCache(values) : null;
	    }
	
	    /**
	     * Creates a function that produces compound words out of the words in a
	     * given string.
	     *
	     * @private
	     * @param {Function} callback The function to combine each word.
	     * @returns {Function} Returns the new compounder function.
	     */
	    function createCompounder(callback) {
	      return function(string) {
	        var index = -1,
	            array = words(deburr(string)),
	            length = array.length,
	            result = '';
	
	        while (++index < length) {
	          result = callback(result, array[index], index);
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Creates a function that produces an instance of `Ctor` regardless of
	     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	     *
	     * @private
	     * @param {Function} Ctor The constructor to wrap.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createCtorWrapper(Ctor) {
	      return function() {
	        // Use a `switch` statement to work with class constructors.
	        // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	        // for more details.
	        var args = arguments;
	        switch (args.length) {
	          case 0: return new Ctor;
	          case 1: return new Ctor(args[0]);
	          case 2: return new Ctor(args[0], args[1]);
	          case 3: return new Ctor(args[0], args[1], args[2]);
	          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	        }
	        var thisBinding = baseCreate(Ctor.prototype),
	            result = Ctor.apply(thisBinding, args);
	
	        // Mimic the constructor's `return` behavior.
	        // See https://es5.github.io/#x13.2.2 for more details.
	        return isObject(result) ? result : thisBinding;
	      };
	    }
	
	    /**
	     * Creates a `_.curry` or `_.curryRight` function.
	     *
	     * @private
	     * @param {boolean} flag The curry bit flag.
	     * @returns {Function} Returns the new curry function.
	     */
	    function createCurry(flag) {
	      function curryFunc(func, arity, guard) {
	        if (guard && isIterateeCall(func, arity, guard)) {
	          arity = undefined;
	        }
	        var result = createWrapper(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
	        result.placeholder = curryFunc.placeholder;
	        return result;
	      }
	      return curryFunc;
	    }
	
	    /**
	     * Creates a `_.defaults` or `_.defaultsDeep` function.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Function} Returns the new defaults function.
	     */
	    function createDefaults(assigner, customizer) {
	      return restParam(function(args) {
	        var object = args[0];
	        if (object == null) {
	          return object;
	        }
	        args.push(customizer);
	        return assigner.apply(undefined, args);
	      });
	    }
	
	    /**
	     * Creates a `_.max` or `_.min` function.
	     *
	     * @private
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {Function} Returns the new extremum function.
	     */
	    function createExtremum(comparator, exValue) {
	      return function(collection, iteratee, thisArg) {
	        if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	          iteratee = undefined;
	        }
	        iteratee = getCallback(iteratee, thisArg, 3);
	        if (iteratee.length == 1) {
	          collection = isArray(collection) ? collection : toIterable(collection);
	          var result = arrayExtremum(collection, iteratee, comparator, exValue);
	          if (!(collection.length && result === exValue)) {
	            return result;
	          }
	        }
	        return baseExtremum(collection, iteratee, comparator, exValue);
	      };
	    }
	
	    /**
	     * Creates a `_.find` or `_.findLast` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new find function.
	     */
	    function createFind(eachFunc, fromRight) {
	      return function(collection, predicate, thisArg) {
	        predicate = getCallback(predicate, thisArg, 3);
	        if (isArray(collection)) {
	          var index = baseFindIndex(collection, predicate, fromRight);
	          return index > -1 ? collection[index] : undefined;
	        }
	        return baseFind(collection, predicate, eachFunc);
	      };
	    }
	
	    /**
	     * Creates a `_.findIndex` or `_.findLastIndex` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new find function.
	     */
	    function createFindIndex(fromRight) {
	      return function(array, predicate, thisArg) {
	        if (!(array && array.length)) {
	          return -1;
	        }
	        predicate = getCallback(predicate, thisArg, 3);
	        return baseFindIndex(array, predicate, fromRight);
	      };
	    }
	
	    /**
	     * Creates a `_.findKey` or `_.findLastKey` function.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new find function.
	     */
	    function createFindKey(objectFunc) {
	      return function(object, predicate, thisArg) {
	        predicate = getCallback(predicate, thisArg, 3);
	        return baseFind(object, predicate, objectFunc, true);
	      };
	    }
	
	    /**
	     * Creates a `_.flow` or `_.flowRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new flow function.
	     */
	    function createFlow(fromRight) {
	      return function() {
	        var wrapper,
	            length = arguments.length,
	            index = fromRight ? length : -1,
	            leftIndex = 0,
	            funcs = Array(length);
	
	        while ((fromRight ? index-- : ++index < length)) {
	          var func = funcs[leftIndex++] = arguments[index];
	          if (typeof func != 'function') {
	            throw new TypeError(FUNC_ERROR_TEXT);
	          }
	          if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
	            wrapper = new LodashWrapper([], true);
	          }
	        }
	        index = wrapper ? -1 : length;
	        while (++index < length) {
	          func = funcs[index];
	
	          var funcName = getFuncName(func),
	              data = funcName == 'wrapper' ? getData(func) : undefined;
	
	          if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
	            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
	          } else {
	            wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
	          }
	        }
	        return function() {
	          var args = arguments,
	              value = args[0];
	
	          if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
	            return wrapper.plant(value).value();
	          }
	          var index = 0,
	              result = length ? funcs[index].apply(this, args) : value;
	
	          while (++index < length) {
	            result = funcs[index].call(this, result);
	          }
	          return result;
	        };
	      };
	    }
	
	    /**
	     * Creates a function for `_.forEach` or `_.forEachRight`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over an array.
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @returns {Function} Returns the new each function.
	     */
	    function createForEach(arrayFunc, eachFunc) {
	      return function(collection, iteratee, thisArg) {
	        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	          ? arrayFunc(collection, iteratee)
	          : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	      };
	    }
	
	    /**
	     * Creates a function for `_.forIn` or `_.forInRight`.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new each function.
	     */
	    function createForIn(objectFunc) {
	      return function(object, iteratee, thisArg) {
	        if (typeof iteratee != 'function' || thisArg !== undefined) {
	          iteratee = bindCallback(iteratee, thisArg, 3);
	        }
	        return objectFunc(object, iteratee, keysIn);
	      };
	    }
	
	    /**
	     * Creates a function for `_.forOwn` or `_.forOwnRight`.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new each function.
	     */
	    function createForOwn(objectFunc) {
	      return function(object, iteratee, thisArg) {
	        if (typeof iteratee != 'function' || thisArg !== undefined) {
	          iteratee = bindCallback(iteratee, thisArg, 3);
	        }
	        return objectFunc(object, iteratee);
	      };
	    }
	
	    /**
	     * Creates a function for `_.mapKeys` or `_.mapValues`.
	     *
	     * @private
	     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
	     * @returns {Function} Returns the new map function.
	     */
	    function createObjectMapper(isMapKeys) {
	      return function(object, iteratee, thisArg) {
	        var result = {};
	        iteratee = getCallback(iteratee, thisArg, 3);
	
	        baseForOwn(object, function(value, key, object) {
	          var mapped = iteratee(value, key, object);
	          key = isMapKeys ? mapped : key;
	          value = isMapKeys ? value : mapped;
	          result[key] = value;
	        });
	        return result;
	      };
	    }
	
	    /**
	     * Creates a function for `_.padLeft` or `_.padRight`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify padding from the right.
	     * @returns {Function} Returns the new pad function.
	     */
	    function createPadDir(fromRight) {
	      return function(string, length, chars) {
	        string = baseToString(string);
	        return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
	      };
	    }
	
	    /**
	     * Creates a `_.partial` or `_.partialRight` function.
	     *
	     * @private
	     * @param {boolean} flag The partial bit flag.
	     * @returns {Function} Returns the new partial function.
	     */
	    function createPartial(flag) {
	      var partialFunc = restParam(function(func, partials) {
	        var holders = replaceHolders(partials, partialFunc.placeholder);
	        return createWrapper(func, flag, undefined, partials, holders);
	      });
	      return partialFunc;
	    }
	
	    /**
	     * Creates a function for `_.reduce` or `_.reduceRight`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over an array.
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @returns {Function} Returns the new each function.
	     */
	    function createReduce(arrayFunc, eachFunc) {
	      return function(collection, iteratee, accumulator, thisArg) {
	        var initFromArray = arguments.length < 3;
	        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	          ? arrayFunc(collection, iteratee, accumulator, initFromArray)
	          : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
	      };
	    }
	
	    /**
	     * Creates a function that wraps `func` and invokes it with optional `this`
	     * binding of, partial application, and currying.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	      var isAry = bitmask & ARY_FLAG,
	          isBind = bitmask & BIND_FLAG,
	          isBindKey = bitmask & BIND_KEY_FLAG,
	          isCurry = bitmask & CURRY_FLAG,
	          isCurryBound = bitmask & CURRY_BOUND_FLAG,
	          isCurryRight = bitmask & CURRY_RIGHT_FLAG,
	          Ctor = isBindKey ? undefined : createCtorWrapper(func);
	
	      function wrapper() {
	        // Avoid `arguments` object use disqualifying optimizations by
	        // converting it to an array before providing it to other functions.
	        var length = arguments.length,
	            index = length,
	            args = Array(length);
	
	        while (index--) {
	          args[index] = arguments[index];
	        }
	        if (partials) {
	          args = composeArgs(args, partials, holders);
	        }
	        if (partialsRight) {
	          args = composeArgsRight(args, partialsRight, holdersRight);
	        }
	        if (isCurry || isCurryRight) {
	          var placeholder = wrapper.placeholder,
	              argsHolders = replaceHolders(args, placeholder);
	
	          length -= argsHolders.length;
	          if (length < arity) {
	            var newArgPos = argPos ? arrayCopy(argPos) : undefined,
	                newArity = nativeMax(arity - length, 0),
	                newsHolders = isCurry ? argsHolders : undefined,
	                newHoldersRight = isCurry ? undefined : argsHolders,
	                newPartials = isCurry ? args : undefined,
	                newPartialsRight = isCurry ? undefined : args;
	
	            bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	            bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);
	
	            if (!isCurryBound) {
	              bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	            }
	            var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
	                result = createHybridWrapper.apply(undefined, newData);
	
	            if (isLaziable(func)) {
	              setData(result, newData);
	            }
	            result.placeholder = placeholder;
	            return result;
	          }
	        }
	        var thisBinding = isBind ? thisArg : this,
	            fn = isBindKey ? thisBinding[func] : func;
	
	        if (argPos) {
	          args = reorder(args, argPos);
	        }
	        if (isAry && ary < args.length) {
	          args.length = ary;
	        }
	        if (this && this !== root && this instanceof wrapper) {
	          fn = Ctor || createCtorWrapper(func);
	        }
	        return fn.apply(thisBinding, args);
	      }
	      return wrapper;
	    }
	
	    /**
	     * Creates the padding required for `string` based on the given `length`.
	     * The `chars` string is truncated if the number of characters exceeds `length`.
	     *
	     * @private
	     * @param {string} string The string to create padding for.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the pad for `string`.
	     */
	    function createPadding(string, length, chars) {
	      var strLength = string.length;
	      length = +length;
	
	      if (strLength >= length || !nativeIsFinite(length)) {
	        return '';
	      }
	      var padLength = length - strLength;
	      chars = chars == null ? ' ' : (chars + '');
	      return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
	    }
	
	    /**
	     * Creates a function that wraps `func` and invokes it with the optional `this`
	     * binding of `thisArg` and the `partials` prepended to those provided to
	     * the wrapper.
	     *
	     * @private
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {Array} partials The arguments to prepend to those provided to the new function.
	     * @returns {Function} Returns the new bound function.
	     */
	    function createPartialWrapper(func, bitmask, thisArg, partials) {
	      var isBind = bitmask & BIND_FLAG,
	          Ctor = createCtorWrapper(func);
	
	      function wrapper() {
	        // Avoid `arguments` object use disqualifying optimizations by
	        // converting it to an array before providing it `func`.
	        var argsIndex = -1,
	            argsLength = arguments.length,
	            leftIndex = -1,
	            leftLength = partials.length,
	            args = Array(leftLength + argsLength);
	
	        while (++leftIndex < leftLength) {
	          args[leftIndex] = partials[leftIndex];
	        }
	        while (argsLength--) {
	          args[leftIndex++] = arguments[++argsIndex];
	        }
	        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	        return fn.apply(isBind ? thisArg : this, args);
	      }
	      return wrapper;
	    }
	
	    /**
	     * Creates a `_.ceil`, `_.floor`, or `_.round` function.
	     *
	     * @private
	     * @param {string} methodName The name of the `Math` method to use when rounding.
	     * @returns {Function} Returns the new round function.
	     */
	    function createRound(methodName) {
	      var func = Math[methodName];
	      return function(number, precision) {
	        precision = precision === undefined ? 0 : (+precision || 0);
	        if (precision) {
	          precision = pow(10, precision);
	          return func(number * precision) / precision;
	        }
	        return func(number);
	      };
	    }
	
	    /**
	     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
	     *
	     * @private
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {Function} Returns the new index function.
	     */
	    function createSortedIndex(retHighest) {
	      return function(array, value, iteratee, thisArg) {
	        var callback = getCallback(iteratee);
	        return (iteratee == null && callback === baseCallback)
	          ? binaryIndex(array, value, retHighest)
	          : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
	      };
	    }
	
	    /**
	     * Creates a function that either curries or invokes `func` with optional
	     * `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags.
	     *  The bitmask may be composed of the following flags:
	     *     1 - `_.bind`
	     *     2 - `_.bindKey`
	     *     4 - `_.curry` or `_.curryRight` of a bound function
	     *     8 - `_.curry`
	     *    16 - `_.curryRight`
	     *    32 - `_.partial`
	     *    64 - `_.partialRight`
	     *   128 - `_.rearg`
	     *   256 - `_.ary`
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to be partially applied.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	      var isBindKey = bitmask & BIND_KEY_FLAG;
	      if (!isBindKey && typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var length = partials ? partials.length : 0;
	      if (!length) {
	        bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	        partials = holders = undefined;
	      }
	      length -= (holders ? holders.length : 0);
	      if (bitmask & PARTIAL_RIGHT_FLAG) {
	        var partialsRight = partials,
	            holdersRight = holders;
	
	        partials = holders = undefined;
	      }
	      var data = isBindKey ? undefined : getData(func),
	          newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];
	
	      if (data) {
	        mergeData(newData, data);
	        bitmask = newData[1];
	        arity = newData[9];
	      }
	      newData[9] = arity == null
	        ? (isBindKey ? 0 : func.length)
	        : (nativeMax(arity - length, 0) || 0);
	
	      if (bitmask == BIND_FLAG) {
	        var result = createBindWrapper(newData[0], newData[2]);
	      } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
	        result = createPartialWrapper.apply(undefined, newData);
	      } else {
	        result = createHybridWrapper.apply(undefined, newData);
	      }
	      var setter = data ? baseSetData : setData;
	      return setter(result, newData);
	    }
	
	    /**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare.
	     * @param {Array} other The other array to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing arrays.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */
	    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	      var index = -1,
	          arrLength = array.length,
	          othLength = other.length;
	
	      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	        return false;
	      }
	      // Ignore non-index properties.
	      while (++index < arrLength) {
	        var arrValue = array[index],
	            othValue = other[index],
	            result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;
	
	        if (result !== undefined) {
	          if (result) {
	            continue;
	          }
	          return false;
	        }
	        // Recursively compare arrays (susceptible to call stack limits).
	        if (isLoose) {
	          if (!arraySome(other, function(othValue) {
	                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	              })) {
	            return false;
	          }
	        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	          return false;
	        }
	      }
	      return true;
	    }
	
	    /**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `toStringTag`.
	     *
	     * **Note:** This function only supports comparing values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {string} tag The `toStringTag` of the objects to compare.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalByTag(object, other, tag) {
	      switch (tag) {
	        case boolTag:
	        case dateTag:
	          // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	          return +object == +other;
	
	        case errorTag:
	          return object.name == other.name && object.message == other.message;
	
	        case numberTag:
	          // Treat `NaN` vs. `NaN` as equal.
	          return (object != +object)
	            ? other != +other
	            : object == +other;
	
	        case regexpTag:
	        case stringTag:
	          // Coerce regexes to strings and treat strings primitives and string
	          // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	          return object == (other + '');
	      }
	      return false;
	    }
	
	    /**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	      var objProps = keys(object),
	          objLength = objProps.length,
	          othProps = keys(other),
	          othLength = othProps.length;
	
	      if (objLength != othLength && !isLoose) {
	        return false;
	      }
	      var index = objLength;
	      while (index--) {
	        var key = objProps[index];
	        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	          return false;
	        }
	      }
	      var skipCtor = isLoose;
	      while (++index < objLength) {
	        key = objProps[index];
	        var objValue = object[key],
	            othValue = other[key],
	            result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;
	
	        // Recursively compare objects (susceptible to call stack limits).
	        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	          return false;
	        }
	        skipCtor || (skipCtor = key == 'constructor');
	      }
	      if (!skipCtor) {
	        var objCtor = object.constructor,
	            othCtor = other.constructor;
	
	        // Non `Object` object instances with different constructors are not equal.
	        if (objCtor != othCtor &&
	            ('constructor' in object && 'constructor' in other) &&
	            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	          return false;
	        }
	      }
	      return true;
	    }
	
	    /**
	     * Gets the appropriate "callback" function. If the `_.callback` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseCallback` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function} Returns the chosen function or its result.
	     */
	    function getCallback(func, thisArg, argCount) {
	      var result = lodash.callback || callback;
	      result = result === callback ? baseCallback : result;
	      return argCount ? result(func, thisArg, argCount) : result;
	    }
	
	    /**
	     * Gets metadata for `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {*} Returns the metadata for `func`.
	     */
	    var getData = !metaMap ? noop : function(func) {
	      return metaMap.get(func);
	    };
	
	    /**
	     * Gets the name of `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {string} Returns the function name.
	     */
	    function getFuncName(func) {
	      var result = func.name,
	          array = realNames[result],
	          length = array ? array.length : 0;
	
	      while (length--) {
	        var data = array[length],
	            otherFunc = data.func;
	        if (otherFunc == null || otherFunc == func) {
	          return data.name;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseIndexOf` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function|number} Returns the chosen function or its result.
	     */
	    function getIndexOf(collection, target, fromIndex) {
	      var result = lodash.indexOf || indexOf;
	      result = result === indexOf ? baseIndexOf : result;
	      return collection ? result(collection, target, fromIndex) : result;
	    }
	
	    /**
	     * Gets the "length" property value of `object`.
	     *
	     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	     * that affects Safari on at least iOS 8.1-8.3 ARM64.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {*} Returns the "length" value.
	     */
	    var getLength = baseProperty('length');
	
	    /**
	     * Gets the propery names, values, and compare flags of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the match data of `object`.
	     */
	    function getMatchData(object) {
	      var result = pairs(object),
	          length = result.length;
	
	      while (length--) {
	        result[length][2] = isStrictComparable(result[length][1]);
	      }
	      return result;
	    }
	
	    /**
	     * Gets the native function at `key` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {string} key The key of the method to get.
	     * @returns {*} Returns the function if it's native, else `undefined`.
	     */
	    function getNative(object, key) {
	      var value = object == null ? undefined : object[key];
	      return isNative(value) ? value : undefined;
	    }
	
	    /**
	     * Gets the view, applying any `transforms` to the `start` and `end` positions.
	     *
	     * @private
	     * @param {number} start The start of the view.
	     * @param {number} end The end of the view.
	     * @param {Array} transforms The transformations to apply to the view.
	     * @returns {Object} Returns an object containing the `start` and `end`
	     *  positions of the view.
	     */
	    function getView(start, end, transforms) {
	      var index = -1,
	          length = transforms.length;
	
	      while (++index < length) {
	        var data = transforms[index],
	            size = data.size;
	
	        switch (data.type) {
	          case 'drop':      start += size; break;
	          case 'dropRight': end -= size; break;
	          case 'take':      end = nativeMin(end, start + size); break;
	          case 'takeRight': start = nativeMax(start, end - size); break;
	        }
	      }
	      return { 'start': start, 'end': end };
	    }
	
	    /**
	     * Initializes an array clone.
	     *
	     * @private
	     * @param {Array} array The array to clone.
	     * @returns {Array} Returns the initialized clone.
	     */
	    function initCloneArray(array) {
	      var length = array.length,
	          result = new array.constructor(length);
	
	      // Add array properties assigned by `RegExp#exec`.
	      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	        result.index = array.index;
	        result.input = array.input;
	      }
	      return result;
	    }
	
	    /**
	     * Initializes an object clone.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @returns {Object} Returns the initialized clone.
	     */
	    function initCloneObject(object) {
	      var Ctor = object.constructor;
	      if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	        Ctor = Object;
	      }
	      return new Ctor;
	    }
	
	    /**
	     * Initializes an object clone based on its `toStringTag`.
	     *
	     * **Note:** This function only supports cloning values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @param {string} tag The `toStringTag` of the object to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the initialized clone.
	     */
	    function initCloneByTag(object, tag, isDeep) {
	      var Ctor = object.constructor;
	      switch (tag) {
	        case arrayBufferTag:
	          return bufferClone(object);
	
	        case boolTag:
	        case dateTag:
	          return new Ctor(+object);
	
	        case float32Tag: case float64Tag:
	        case int8Tag: case int16Tag: case int32Tag:
	        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	          var buffer = object.buffer;
	          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);
	
	        case numberTag:
	        case stringTag:
	          return new Ctor(object);
	
	        case regexpTag:
	          var result = new Ctor(object.source, reFlags.exec(object));
	          result.lastIndex = object.lastIndex;
	      }
	      return result;
	    }
	
	    /**
	     * Invokes the method at `path` on `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {Array} args The arguments to invoke the method with.
	     * @returns {*} Returns the result of the invoked method.
	     */
	    function invokePath(object, path, args) {
	      if (object != null && !isKey(path, object)) {
	        path = toPath(path);
	        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	        path = last(path);
	      }
	      var func = object == null ? object : object[path];
	      return func == null ? undefined : func.apply(object, args);
	    }
	
	    /**
	     * Checks if `value` is array-like.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	     */
	    function isArrayLike(value) {
	      return value != null && isLength(getLength(value));
	    }
	
	    /**
	     * Checks if `value` is a valid array-like index.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	     */
	    function isIndex(value, length) {
	      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	      length = length == null ? MAX_SAFE_INTEGER : length;
	      return value > -1 && value % 1 == 0 && value < length;
	    }
	
	    /**
	     * Checks if the provided arguments are from an iteratee call.
	     *
	     * @private
	     * @param {*} value The potential iteratee value argument.
	     * @param {*} index The potential iteratee index or key argument.
	     * @param {*} object The potential iteratee object argument.
	     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	     */
	    function isIterateeCall(value, index, object) {
	      if (!isObject(object)) {
	        return false;
	      }
	      var type = typeof index;
	      if (type == 'number'
	          ? (isArrayLike(object) && isIndex(index, object.length))
	          : (type == 'string' && index in object)) {
	        var other = object[index];
	        return value === value ? (value === other) : (other !== other);
	      }
	      return false;
	    }
	
	    /**
	     * Checks if `value` is a property name and not a property path.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	     */
	    function isKey(value, object) {
	      var type = typeof value;
	      if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	        return true;
	      }
	      if (isArray(value)) {
	        return false;
	      }
	      var result = !reIsDeepProp.test(value);
	      return result || (object != null && value in toObject(object));
	    }
	
	    /**
	     * Checks if `func` has a lazy counterpart.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	     */
	    function isLaziable(func) {
	      var funcName = getFuncName(func);
	      if (!(funcName in LazyWrapper.prototype)) {
	        return false;
	      }
	      var other = lodash[funcName];
	      if (func === other) {
	        return true;
	      }
	      var data = getData(other);
	      return !!data && func === data[0];
	    }
	
	    /**
	     * Checks if `value` is a valid array-like length.
	     *
	     * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	     */
	    function isLength(value) {
	      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	    }
	
	    /**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */
	    function isStrictComparable(value) {
	      return value === value && !isObject(value);
	    }
	
	    /**
	     * Merges the function metadata of `source` into `data`.
	     *
	     * Merging metadata reduces the number of wrappers required to invoke a function.
	     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	     * augment function arguments, making the order in which they are executed important,
	     * preventing the merging of metadata. However, we make an exception for a safe
	     * common case where curried functions have `_.ary` and or `_.rearg` applied.
	     *
	     * @private
	     * @param {Array} data The destination metadata.
	     * @param {Array} source The source metadata.
	     * @returns {Array} Returns `data`.
	     */
	    function mergeData(data, source) {
	      var bitmask = data[1],
	          srcBitmask = source[1],
	          newBitmask = bitmask | srcBitmask,
	          isCommon = newBitmask < ARY_FLAG;
	
	      var isCombo =
	        (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
	        (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
	        (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);
	
	      // Exit early if metadata can't be merged.
	      if (!(isCommon || isCombo)) {
	        return data;
	      }
	      // Use source `thisArg` if available.
	      if (srcBitmask & BIND_FLAG) {
	        data[2] = source[2];
	        // Set when currying a bound function.
	        newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
	      }
	      // Compose partial arguments.
	      var value = source[3];
	      if (value) {
	        var partials = data[3];
	        data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
	        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
	      }
	      // Compose partial right arguments.
	      value = source[5];
	      if (value) {
	        partials = data[5];
	        data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
	        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
	      }
	      // Use source `argPos` if available.
	      value = source[7];
	      if (value) {
	        data[7] = arrayCopy(value);
	      }
	      // Use source `ary` if it's smaller.
	      if (srcBitmask & ARY_FLAG) {
	        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	      }
	      // Use source `arity` if one is not provided.
	      if (data[9] == null) {
	        data[9] = source[9];
	      }
	      // Use source `func` and merge bitmasks.
	      data[0] = source[0];
	      data[1] = newBitmask;
	
	      return data;
	    }
	
	    /**
	     * Used by `_.defaultsDeep` to customize its `_.merge` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */
	    function mergeDefaults(objectValue, sourceValue) {
	      return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
	    }
	
	    /**
	     * A specialized version of `_.pick` which picks `object` properties specified
	     * by `props`.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} props The property names to pick.
	     * @returns {Object} Returns the new object.
	     */
	    function pickByArray(object, props) {
	      object = toObject(object);
	
	      var index = -1,
	          length = props.length,
	          result = {};
	
	      while (++index < length) {
	        var key = props[index];
	        if (key in object) {
	          result[key] = object[key];
	        }
	      }
	      return result;
	    }
	
	    /**
	     * A specialized version of `_.pick` which picks `object` properties `predicate`
	     * returns truthy for.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Object} Returns the new object.
	     */
	    function pickByCallback(object, predicate) {
	      var result = {};
	      baseForIn(object, function(value, key, object) {
	        if (predicate(value, key, object)) {
	          result[key] = value;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * Reorder `array` according to the specified indexes where the element at
	     * the first index is assigned as the first element, the element at
	     * the second index is assigned as the second element, and so on.
	     *
	     * @private
	     * @param {Array} array The array to reorder.
	     * @param {Array} indexes The arranged array indexes.
	     * @returns {Array} Returns `array`.
	     */
	    function reorder(array, indexes) {
	      var arrLength = array.length,
	          length = nativeMin(indexes.length, arrLength),
	          oldArray = arrayCopy(array);
	
	      while (length--) {
	        var index = indexes[length];
	        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	      }
	      return array;
	    }
	
	    /**
	     * Sets metadata for `func`.
	     *
	     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	     * period of time, it will trip its breaker and transition to an identity function
	     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	     * for more details.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
	    var setData = (function() {
	      var count = 0,
	          lastCalled = 0;
	
	      return function(key, value) {
	        var stamp = now(),
	            remaining = HOT_SPAN - (stamp - lastCalled);
	
	        lastCalled = stamp;
	        if (remaining > 0) {
	          if (++count >= HOT_COUNT) {
	            return key;
	          }
	        } else {
	          count = 0;
	        }
	        return baseSetData(key, value);
	      };
	    }());
	
	    /**
	     * A fallback implementation of `Object.keys` which creates an array of the
	     * own enumerable property names of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
	    function shimKeys(object) {
	      var props = keysIn(object),
	          propsLength = props.length,
	          length = propsLength && object.length;
	
	      var allowIndexes = !!length && isLength(length) &&
	        (isArray(object) || isArguments(object));
	
	      var index = -1,
	          result = [];
	
	      while (++index < propsLength) {
	        var key = props[index];
	        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	          result.push(key);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * Converts `value` to an array-like object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array|Object} Returns the array-like object.
	     */
	    function toIterable(value) {
	      if (value == null) {
	        return [];
	      }
	      if (!isArrayLike(value)) {
	        return values(value);
	      }
	      return isObject(value) ? value : Object(value);
	    }
	
	    /**
	     * Converts `value` to an object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Object} Returns the object.
	     */
	    function toObject(value) {
	      return isObject(value) ? value : Object(value);
	    }
	
	    /**
	     * Converts `value` to property path array if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array} Returns the property path array.
	     */
	    function toPath(value) {
	      if (isArray(value)) {
	        return value;
	      }
	      var result = [];
	      baseToString(value).replace(rePropName, function(match, number, quote, string) {
	        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	      });
	      return result;
	    }
	
	    /**
	     * Creates a clone of `wrapper`.
	     *
	     * @private
	     * @param {Object} wrapper The wrapper to clone.
	     * @returns {Object} Returns the cloned wrapper.
	     */
	    function wrapperClone(wrapper) {
	      return wrapper instanceof LazyWrapper
	        ? wrapper.clone()
	        : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Creates an array of elements split into groups the length of `size`.
	     * If `collection` can't be split evenly, the final chunk will be the remaining
	     * elements.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to process.
	     * @param {number} [size=1] The length of each chunk.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new array containing chunks.
	     * @example
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 2);
	     * // => [['a', 'b'], ['c', 'd']]
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 3);
	     * // => [['a', 'b', 'c'], ['d']]
	     */
	    function chunk(array, size, guard) {
	      if (guard ? isIterateeCall(array, size, guard) : size == null) {
	        size = 1;
	      } else {
	        size = nativeMax(nativeFloor(size) || 1, 1);
	      }
	      var index = 0,
	          length = array ? array.length : 0,
	          resIndex = -1,
	          result = Array(nativeCeil(length / size));
	
	      while (index < length) {
	        result[++resIndex] = baseSlice(array, index, (index += size));
	      }
	      return result;
	    }
	
	    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
	    function compact(array) {
	      var index = -1,
	          length = array ? array.length : 0,
	          resIndex = -1,
	          result = [];
	
	      while (++index < length) {
	        var value = array[index];
	        if (value) {
	          result[++resIndex] = value;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * Creates an array of unique `array` values not included in the other
	     * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3], [4, 2]);
	     * // => [1, 3]
	     */
	    var difference = restParam(function(array, values) {
	      return (isObjectLike(array) && isArrayLike(array))
	        ? baseDifference(array, baseFlatten(values, false, true))
	        : [];
	    });
	
	    /**
	     * Creates a slice of `array` with `n` elements dropped from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.drop([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.drop([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.drop([1, 2, 3], 5);
	     * // => []
	     *
	     * _.drop([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
	    function drop(array, n, guard) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      return baseSlice(array, n < 0 ? 0 : n);
	    }
	
	    /**
	     * Creates a slice of `array` with `n` elements dropped from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRight([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.dropRight([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.dropRight([1, 2, 3], 5);
	     * // => []
	     *
	     * _.dropRight([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
	    function dropRight(array, n, guard) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      n = length - (+n || 0);
	      return baseSlice(array, 0, n < 0 ? 0 : n);
	    }
	
	    /**
	     * Creates a slice of `array` excluding elements dropped from the end.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that match the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRightWhile([1, 2, 3], function(n) {
	     *   return n > 1;
	     * });
	     * // => [1]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
	     * // => ['barney', 'fred']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */
	    function dropRightWhile(array, predicate, thisArg) {
	      return (array && array.length)
	        ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true)
	        : [];
	    }
	
	    /**
	     * Creates a slice of `array` excluding elements dropped from the beginning.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropWhile([1, 2, 3], function(n) {
	     *   return n < 3;
	     * });
	     * // => [3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.dropWhile(users, 'active', false), 'user');
	     * // => ['pebbles']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.dropWhile(users, 'active'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */
	    function dropWhile(array, predicate, thisArg) {
	      return (array && array.length)
	        ? baseWhile(array, getCallback(predicate, thisArg, 3), true)
	        : [];
	    }
	
	    /**
	     * Fills elements of `array` with `value` from `start` up to, but not
	     * including, `end`.
	     *
	     * **Note:** This method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.fill(array, 'a');
	     * console.log(array);
	     * // => ['a', 'a', 'a']
	     *
	     * _.fill(Array(3), 2);
	     * // => [2, 2, 2]
	     *
	     * _.fill([4, 6, 8], '*', 1, 2);
	     * // => [4, '*', 8]
	     */
	    function fill(array, value, start, end) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
	        start = 0;
	        end = length;
	      }
	      return baseFill(array, value, start, end);
	    }
	
	    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.findIndex(users, function(chr) {
	     *   return chr.user == 'barney';
	     * });
	     * // => 0
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findIndex(users, { 'user': 'fred', 'active': false });
	     * // => 1
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findIndex(users, 'active', false);
	     * // => 0
	     *
	     * // using the `_.property` callback shorthand
	     * _.findIndex(users, 'active');
	     * // => 2
	     */
	    var findIndex = createFindIndex();
	
	    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of `collection` from right to left.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.findLastIndex(users, function(chr) {
	     *   return chr.user == 'pebbles';
	     * });
	     * // => 2
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	     * // => 0
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findLastIndex(users, 'active', false);
	     * // => 2
	     *
	     * // using the `_.property` callback shorthand
	     * _.findLastIndex(users, 'active');
	     * // => 0
	     */
	    var findLastIndex = createFindIndex(true);
	
	    /**
	     * Gets the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the first element of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([]);
	     * // => undefined
	     */
	    function first(array) {
	      return array ? array[0] : undefined;
	    }
	
	    /**
	     * Flattens a nested array. If `isDeep` is `true` the array is recursively
	     * flattened, otherwise it is only flattened a single level.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, [4]]
	     *
	     * // using `isDeep`
	     * _.flatten([1, [2, 3, [4]]], true);
	     * // => [1, 2, 3, 4]
	     */
	    function flatten(array, isDeep, guard) {
	      var length = array ? array.length : 0;
	      if (guard && isIterateeCall(array, isDeep, guard)) {
	        isDeep = false;
	      }
	      return length ? baseFlatten(array, isDeep) : [];
	    }
	
	    /**
	     * Recursively flattens a nested array.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to recursively flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flattenDeep([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, 4]
	     */
	    function flattenDeep(array) {
	      var length = array ? array.length : 0;
	      return length ? baseFlatten(array, true) : [];
	    }
	
	    /**
	     * Gets the index at which the first occurrence of `value` is found in `array`
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
	     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
	     * performs a faster binary search.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 1, 2], 2);
	     * // => 1
	     *
	     * // using `fromIndex`
	     * _.indexOf([1, 2, 1, 2], 2, 2);
	     * // => 3
	     *
	     * // performing a binary search
	     * _.indexOf([1, 1, 2, 2], 2, true);
	     * // => 2
	     */
	    function indexOf(array, value, fromIndex) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return -1;
	      }
	      if (typeof fromIndex == 'number') {
	        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
	      } else if (fromIndex) {
	        var index = binaryIndex(array, value);
	        if (index < length &&
	            (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
	          return index;
	        }
	        return -1;
	      }
	      return baseIndexOf(array, value, fromIndex || 0);
	    }
	
	    /**
	     * Gets all but the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     */
	    function initial(array) {
	      return dropRight(array, 1);
	    }
	
	    /**
	     * Creates an array of unique values that are included in all of the provided
	     * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of shared values.
	     * @example
	     * _.intersection([1, 2], [4, 2], [2, 1]);
	     * // => [2]
	     */
	    var intersection = restParam(function(arrays) {
	      var othLength = arrays.length,
	          othIndex = othLength,
	          caches = Array(length),
	          indexOf = getIndexOf(),
	          isCommon = indexOf == baseIndexOf,
	          result = [];
	
	      while (othIndex--) {
	        var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
	        caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
	      }
	      var array = arrays[0],
	          index = -1,
	          length = array ? array.length : 0,
	          seen = caches[0];
	
	      outer:
	      while (++index < length) {
	        value = array[index];
	        if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
	          var othIndex = othLength;
	          while (--othIndex) {
	            var cache = caches[othIndex];
	            if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
	              continue outer;
	            }
	          }
	          if (seen) {
	            seen.push(value);
	          }
	          result.push(value);
	        }
	      }
	      return result;
	    });
	
	    /**
	     * Gets the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the last element of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     */
	    function last(array) {
	      var length = array ? array.length : 0;
	      return length ? array[length - 1] : undefined;
	    }
	
	    /**
	     * This method is like `_.indexOf` except that it iterates over elements of
	     * `array` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
	     *  or `true` to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 1, 2], 2);
	     * // => 3
	     *
	     * // using `fromIndex`
	     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	     * // => 1
	     *
	     * // performing a binary search
	     * _.lastIndexOf([1, 1, 2, 2], 2, true);
	     * // => 3
	     */
	    function lastIndexOf(array, value, fromIndex) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return -1;
	      }
	      var index = length;
	      if (typeof fromIndex == 'number') {
	        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
	      } else if (fromIndex) {
	        index = binaryIndex(array, value, true) - 1;
	        var other = array[index];
	        if (value === value ? (value === other) : (other !== other)) {
	          return index;
	        }
	        return -1;
	      }
	      if (value !== value) {
	        return indexOfNaN(array, index, true);
	      }
	      while (index--) {
	        if (array[index] === value) {
	          return index;
	        }
	      }
	      return -1;
	    }
	
	    /**
	     * Removes all provided values from `array` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * **Note:** Unlike `_.without`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...*} [values] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     *
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */
	    function pull() {
	      var args = arguments,
	          array = args[0];
	
	      if (!(array && array.length)) {
	        return array;
	      }
	      var index = 0,
	          indexOf = getIndexOf(),
	          length = args.length;
	
	      while (++index < length) {
	        var fromIndex = 0,
	            value = args[index];
	
	        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
	          splice.call(array, fromIndex, 1);
	        }
	      }
	      return array;
	    }
	
	    /**
	     * Removes elements from `array` corresponding to the given indexes and returns
	     * an array of the removed elements. Indexes may be specified as an array of
	     * indexes or as individual arguments.
	     *
	     * **Note:** Unlike `_.at`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [5, 10, 15, 20];
	     * var evens = _.pullAt(array, 1, 3);
	     *
	     * console.log(array);
	     * // => [5, 15]
	     *
	     * console.log(evens);
	     * // => [10, 20]
	     */
	    var pullAt = restParam(function(array, indexes) {
	      indexes = baseFlatten(indexes);
	
	      var result = baseAt(array, indexes);
	      basePullAt(array, indexes.sort(baseCompareAscending));
	      return result;
	    });
	
	    /**
	     * Removes all elements from `array` that `predicate` returns truthy for
	     * and returns an array of the removed elements. The predicate is bound to
	     * `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * **Note:** Unlike `_.filter`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4];
	     * var evens = _.remove(array, function(n) {
	     *   return n % 2 == 0;
	     * });
	     *
	     * console.log(array);
	     * // => [1, 3]
	     *
	     * console.log(evens);
	     * // => [2, 4]
	     */
	    function remove(array, predicate, thisArg) {
	      var result = [];
	      if (!(array && array.length)) {
	        return result;
	      }
	      var index = -1,
	          indexes = [],
	          length = array.length;
	
	      predicate = getCallback(predicate, thisArg, 3);
	      while (++index < length) {
	        var value = array[index];
	        if (predicate(value, index, array)) {
	          result.push(value);
	          indexes.push(index);
	        }
	      }
	      basePullAt(array, indexes);
	      return result;
	    }
	
	    /**
	     * Gets all but the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias tail
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     */
	    function rest(array) {
	      return drop(array, 1);
	    }
	
	    /**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This method is used instead of `Array#slice` to support node
	     * lists in IE < 9 and to ensure dense arrays are returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function slice(array, start, end) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
	        start = 0;
	        end = length;
	      }
	      return baseSlice(array, start, end);
	    }
	
	    /**
	     * Uses a binary search to determine the lowest index at which `value` should
	     * be inserted into `array` in order to maintain its sort order. If an iteratee
	     * function is provided it is invoked for `value` and each element of `array`
	     * to compute their sort ranking. The iteratee is bound to `thisArg` and
	     * invoked with one argument; (value).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([30, 50], 40);
	     * // => 1
	     *
	     * _.sortedIndex([4, 4, 5, 5], 5);
	     * // => 2
	     *
	     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
	     *
	     * // using an iteratee function
	     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
	     *   return this.data[word];
	     * }, dict);
	     * // => 1
	     *
	     * // using the `_.property` callback shorthand
	     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 1
	     */
	    var sortedIndex = createSortedIndex();
	
	    /**
	     * This method is like `_.sortedIndex` except that it returns the highest
	     * index at which `value` should be inserted into `array` in order to
	     * maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedLastIndex([4, 4, 5, 5], 5);
	     * // => 4
	     */
	    var sortedLastIndex = createSortedIndex(true);
	
	    /**
	     * Creates a slice of `array` with `n` elements taken from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.take([1, 2, 3]);
	     * // => [1]
	     *
	     * _.take([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.take([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.take([1, 2, 3], 0);
	     * // => []
	     */
	    function take(array, n, guard) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      return baseSlice(array, 0, n < 0 ? 0 : n);
	    }
	
	    /**
	     * Creates a slice of `array` with `n` elements taken from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRight([1, 2, 3]);
	     * // => [3]
	     *
	     * _.takeRight([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.takeRight([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.takeRight([1, 2, 3], 0);
	     * // => []
	     */
	    function takeRight(array, n, guard) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      n = length - (+n || 0);
	      return baseSlice(array, n < 0 ? 0 : n);
	    }
	
	    /**
	     * Creates a slice of `array` with elements taken from the end. Elements are
	     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
	     * and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRightWhile([1, 2, 3], function(n) {
	     *   return n > 1;
	     * });
	     * // => [2, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
	     * // => ['pebbles']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
	     * // => []
	     */
	    function takeRightWhile(array, predicate, thisArg) {
	      return (array && array.length)
	        ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true)
	        : [];
	    }
	
	    /**
	     * Creates a slice of `array` with elements taken from the beginning. Elements
	     * are taken until `predicate` returns falsey. The predicate is bound to
	     * `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeWhile([1, 2, 3], function(n) {
	     *   return n < 3;
	     * });
	     * // => [1, 2]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false},
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.takeWhile(users, 'active', false), 'user');
	     * // => ['barney', 'fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.takeWhile(users, 'active'), 'user');
	     * // => []
	     */
	    function takeWhile(array, predicate, thisArg) {
	      return (array && array.length)
	        ? baseWhile(array, getCallback(predicate, thisArg, 3))
	        : [];
	    }
	
	    /**
	     * Creates an array of unique values, in order, from all of the provided arrays
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of combined values.
	     * @example
	     *
	     * _.union([1, 2], [4, 2], [2, 1]);
	     * // => [1, 2, 4]
	     */
	    var union = restParam(function(arrays) {
	      return baseUniq(baseFlatten(arrays, false, true));
	    });
	
	    /**
	     * Creates a duplicate-free version of an array, using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons, in which only the first occurence of each element
	     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
	     * for sorted arrays. If an iteratee function is provided it is invoked for
	     * each element in the array to generate the criterion by which uniqueness
	     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, array).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {boolean} [isSorted] Specify the array is sorted.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([2, 1, 2]);
	     * // => [2, 1]
	     *
	     * // using `isSorted`
	     * _.uniq([1, 1, 2], true);
	     * // => [1, 2]
	     *
	     * // using an iteratee function
	     * _.uniq([1, 2.5, 1.5, 2], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => [1, 2.5]
	     *
	     * // using the `_.property` callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    function uniq(array, isSorted, iteratee, thisArg) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (isSorted != null && typeof isSorted != 'boolean') {
	        thisArg = iteratee;
	        iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
	        isSorted = false;
	      }
	      var callback = getCallback();
	      if (!(iteratee == null && callback === baseCallback)) {
	        iteratee = callback(iteratee, thisArg, 3);
	      }
	      return (isSorted && getIndexOf() == baseIndexOf)
	        ? sortedUniq(array, iteratee)
	        : baseUniq(array, iteratee);
	    }
	
	    /**
	     * This method is like `_.zip` except that it accepts an array of grouped
	     * elements and creates an array regrouping the elements to their pre-zip
	     * configuration.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     *
	     * _.unzip(zipped);
	     * // => [['fred', 'barney'], [30, 40], [true, false]]
	     */
	    function unzip(array) {
	      if (!(array && array.length)) {
	        return [];
	      }
	      var index = -1,
	          length = 0;
	
	      array = arrayFilter(array, function(group) {
	        if (isArrayLike(group)) {
	          length = nativeMax(group.length, length);
	          return true;
	        }
	      });
	      var result = Array(length);
	      while (++index < length) {
	        result[index] = arrayMap(array, baseProperty(index));
	      }
	      return result;
	    }
	
	    /**
	     * This method is like `_.unzip` except that it accepts an iteratee to specify
	     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
	     * and invoked with four arguments: (accumulator, value, index, group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @param {Function} [iteratee] The function to combine regrouped values.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
	     * // => [[1, 10, 100], [2, 20, 200]]
	     *
	     * _.unzipWith(zipped, _.add);
	     * // => [3, 30, 300]
	     */
	    function unzipWith(array, iteratee, thisArg) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      var result = unzip(array);
	      if (iteratee == null) {
	        return result;
	      }
	      iteratee = bindCallback(iteratee, thisArg, 4);
	      return arrayMap(result, function(group) {
	        return arrayReduce(group, iteratee, undefined, true);
	      });
	    }
	
	    /**
	     * Creates an array excluding all provided values using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to filter.
	     * @param {...*} [values] The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 3], 1, 2);
	     * // => [3]
	     */
	    var without = restParam(function(array, values) {
	      return isArrayLike(array)
	        ? baseDifference(array, values)
	        : [];
	    });
	
	    /**
	     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	     * of the provided arrays.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of values.
	     * @example
	     *
	     * _.xor([1, 2], [4, 2]);
	     * // => [1, 4]
	     */
	    function xor() {
	      var index = -1,
	          length = arguments.length;
	
	      while (++index < length) {
	        var array = arguments[index];
	        if (isArrayLike(array)) {
	          var result = result
	            ? arrayPush(baseDifference(result, array), baseDifference(array, result))
	            : array;
	        }
	      }
	      return result ? baseUniq(result) : [];
	    }
	
	    /**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second elements
	     * of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */
	    var zip = restParam(unzip);
	
	    /**
	     * The inverse of `_.pairs`; this method returns an object composed from arrays
	     * of property names and values. Provide either a single two dimensional array,
	     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
	     * and one of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Array
	     * @param {Array} props The property names.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObject([['fred', 30], ['barney', 40]]);
	     * // => { 'fred': 30, 'barney': 40 }
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */
	    function zipObject(props, values) {
	      var index = -1,
	          length = props ? props.length : 0,
	          result = {};
	
	      if (length && !values && !isArray(props[0])) {
	        values = [];
	      }
	      while (++index < length) {
	        var key = props[index];
	        if (values) {
	          result[key] = values[index];
	        } else if (key) {
	          result[key[0]] = key[1];
	        }
	      }
	      return result;
	    }
	
	    /**
	     * This method is like `_.zip` except that it accepts an iteratee to specify
	     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
	     * and invoked with four arguments: (accumulator, value, index, group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @param {Function} [iteratee] The function to combine grouped values.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
	     * // => [111, 222]
	     */
	    var zipWith = restParam(function(arrays) {
	      var length = arrays.length,
	          iteratee = length > 2 ? arrays[length - 2] : undefined,
	          thisArg = length > 1 ? arrays[length - 1] : undefined;
	
	      if (length > 2 && typeof iteratee == 'function') {
	        length -= 2;
	      } else {
	        iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
	        thisArg = undefined;
	      }
	      arrays.length = length;
	      return unzipWith(arrays, iteratee, thisArg);
	    });
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Creates a `lodash` object that wraps `value` with explicit method
	     * chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36 },
	     *   { 'user': 'fred',    'age': 40 },
	     *   { 'user': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(users)
	     *   .sortBy('age')
	     *   .map(function(chr) {
	     *     return chr.user + ' is ' + chr.age;
	     *   })
	     *   .first()
	     *   .value();
	     * // => 'pebbles is 1'
	     */
	    function chain(value) {
	      var result = lodash(value);
	      result.__chain__ = true;
	      return result;
	    }
	
	    /**
	     * This method invokes `interceptor` and returns `value`. The interceptor is
	     * bound to `thisArg` and invoked with one argument; (value). The purpose of
	     * this method is to "tap into" a method chain in order to perform operations
	     * on intermediate results within the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .tap(function(array) {
	     *    array.pop();
	     *  })
	     *  .reverse()
	     *  .value();
	     * // => [2, 1]
	     */
	    function tap(value, interceptor, thisArg) {
	      interceptor.call(thisArg, value);
	      return value;
	    }
	
	    /**
	     * This method is like `_.tap` except that it returns the result of `interceptor`.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns the result of `interceptor`.
	     * @example
	     *
	     * _('  abc  ')
	     *  .chain()
	     *  .trim()
	     *  .thru(function(value) {
	     *    return [value];
	     *  })
	     *  .value();
	     * // => ['abc']
	     */
	    function thru(value, interceptor, thisArg) {
	      return interceptor.call(thisArg, value);
	    }
	
	    /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(users).first();
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(users).chain()
	     *   .first()
	     *   .pick('user')
	     *   .value();
	     * // => { 'user': 'barney' }
	     */
	    function wrapperChain() {
	      return chain(this);
	    }
	
	    /**
	     * Executes the chained sequence and returns the wrapped result.
	     *
	     * @name commit
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).push(3);
	     *
	     * console.log(array);
	     * // => [1, 2]
	     *
	     * wrapped = wrapped.commit();
	     * console.log(array);
	     * // => [1, 2, 3]
	     *
	     * wrapped.last();
	     * // => 3
	     *
	     * console.log(array);
	     * // => [1, 2, 3]
	     */
	    function wrapperCommit() {
	      return new LodashWrapper(this.value(), this.__chain__);
	    }
	
	    /**
	     * Creates a new array joining a wrapped array with any additional arrays
	     * and/or values.
	     *
	     * @name concat
	     * @memberOf _
	     * @category Chain
	     * @param {...*} [values] The values to concatenate.
	     * @returns {Array} Returns the new concatenated array.
	     * @example
	     *
	     * var array = [1];
	     * var wrapped = _(array).concat(2, [3], [[4]]);
	     *
	     * console.log(wrapped.value());
	     * // => [1, 2, 3, [4]]
	     *
	     * console.log(array);
	     * // => [1]
	     */
	    var wrapperConcat = restParam(function(values) {
	      values = baseFlatten(values);
	      return this.thru(function(array) {
	        return arrayConcat(isArray(array) ? array : [toObject(array)], values);
	      });
	    });
	
	    /**
	     * Creates a clone of the chained sequence planting `value` as the wrapped value.
	     *
	     * @name plant
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).map(function(value) {
	     *   return Math.pow(value, 2);
	     * });
	     *
	     * var other = [3, 4];
	     * var otherWrapped = wrapped.plant(other);
	     *
	     * otherWrapped.value();
	     * // => [9, 16]
	     *
	     * wrapped.value();
	     * // => [1, 4]
	     */
	    function wrapperPlant(value) {
	      var result,
	          parent = this;
	
	      while (parent instanceof baseLodash) {
	        var clone = wrapperClone(parent);
	        if (result) {
	          previous.__wrapped__ = clone;
	        } else {
	          result = clone;
	        }
	        var previous = clone;
	        parent = parent.__wrapped__;
	      }
	      previous.__wrapped__ = value;
	      return result;
	    }
	
	    /**
	     * Reverses the wrapped array so the first element becomes the last, the
	     * second element becomes the second to last, and so on.
	     *
	     * **Note:** This method mutates the wrapped array.
	     *
	     * @name reverse
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _(array).reverse().value()
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
	    function wrapperReverse() {
	      var value = this.__wrapped__;
	
	      var interceptor = function(value) {
	        return (wrapped && wrapped.__dir__ < 0) ? value : value.reverse();
	      };
	      if (value instanceof LazyWrapper) {
	        var wrapped = value;
	        if (this.__actions__.length) {
	          wrapped = new LazyWrapper(this);
	        }
	        wrapped = wrapped.reverse();
	        wrapped.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
	        return new LodashWrapper(wrapped, this.__chain__);
	      }
	      return this.thru(interceptor);
	    }
	
	    /**
	     * Produces the result of coercing the unwrapped value to a string.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chain
	     * @returns {string} Returns the coerced string value.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */
	    function wrapperToString() {
	      return (this.value() + '');
	    }
	
	    /**
	     * Executes the chained sequence to extract the unwrapped value.
	     *
	     * @name value
	     * @memberOf _
	     * @alias run, toJSON, valueOf
	     * @category Chain
	     * @returns {*} Returns the resolved unwrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).value();
	     * // => [1, 2, 3]
	     */
	    function wrapperValue() {
	      return baseWrapperValue(this.__wrapped__, this.__actions__);
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Creates an array of elements corresponding to the given keys, or indexes,
	     * of `collection`. Keys may be specified as individual arguments or as arrays
	     * of keys.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [props] The property names
	     *  or indexes of elements to pick, specified individually or in arrays.
	     * @returns {Array} Returns the new array of picked elements.
	     * @example
	     *
	     * _.at(['a', 'b', 'c'], [0, 2]);
	     * // => ['a', 'c']
	     *
	     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
	     * // => ['barney', 'pebbles']
	     */
	    var at = restParam(function(collection, props) {
	      return baseAt(collection, baseFlatten(props));
	    });
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the number of times the key was returned by `iteratee`.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) {
	     *   return Math.floor(n);
	     * });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */
	    var countBy = createAggregator(function(result, value, key) {
	      hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
	    });
	
	    /**
	     * Checks if `predicate` returns truthy for **all** elements of `collection`.
	     * The predicate is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes'], Boolean);
	     * // => false
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': false },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.every(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.every(users, 'active', false);
	     * // => true
	     *
	     * // using the `_.property` callback shorthand
	     * _.every(users, 'active');
	     * // => false
	     */
	    function every(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayEvery : baseEvery;
	      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	        predicate = undefined;
	      }
	      if (typeof predicate != 'function' || thisArg !== undefined) {
	        predicate = getCallback(predicate, thisArg, 3);
	      }
	      return func(collection, predicate);
	    }
	
	    /**
	     * Iterates over elements of `collection`, returning an array of all elements
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * _.filter([4, 5, 6], function(n) {
	     *   return n % 2 == 0;
	     * });
	     * // => [4, 6]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.filter(users, 'active', false), 'user');
	     * // => ['fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.filter(users, 'active'), 'user');
	     * // => ['barney']
	     */
	    function filter(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayFilter : baseFilter;
	      predicate = getCallback(predicate, thisArg, 3);
	      return func(collection, predicate);
	    }
	
	    /**
	     * Iterates over elements of `collection`, returning the first element
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': true },
	     *   { 'user': 'fred',    'age': 40, 'active': false },
	     *   { 'user': 'pebbles', 'age': 1,  'active': true }
	     * ];
	     *
	     * _.result(_.find(users, function(chr) {
	     *   return chr.age < 40;
	     * }), 'user');
	     * // => 'barney'
	     *
	     * // using the `_.matches` callback shorthand
	     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	     * // => 'pebbles'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.result(_.find(users, 'active', false), 'user');
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.result(_.find(users, 'active'), 'user');
	     * // => 'barney'
	     */
	    var find = createFind(baseEach);
	
	    /**
	     * This method is like `_.find` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 1;
	     * });
	     * // => 3
	     */
	    var findLast = createFind(baseEachRight, true);
	
	    /**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning the first element that has equivalent property
	     * values.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
	     * // => 'barney'
	     *
	     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
	     * // => 'fred'
	     */
	    function findWhere(collection, source) {
	      return find(collection, baseMatches(source));
	    }
	
	    /**
	     * Iterates over elements of `collection` invoking `iteratee` for each element.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection). Iteratee functions may exit iteration early
	     * by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a "length" property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEach(function(n) {
	     *   console.log(n);
	     * }).value();
	     * // => logs each value from left to right and returns the array
	     *
	     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	     *   console.log(n, key);
	     * });
	     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	     */
	    var forEach = createForEach(arrayEach, baseEach);
	
	    /**
	     * This method is like `_.forEach` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEachRight(function(n) {
	     *   console.log(n);
	     * }).value();
	     * // => logs each value from right to left and returns the array
	     */
	    var forEachRight = createForEach(arrayEachRight, baseEachRight);
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) {
	     *   return Math.floor(n);
	     * });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using the `_.property` callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */
	    var groupBy = createAggregator(function(result, value, key) {
	      if (hasOwnProperty.call(result, key)) {
	        result[key].push(value);
	      } else {
	        result[key] = [value];
	      }
	    });
	
	    /**
	     * Checks if `value` is in `collection` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
	     * from the end of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @alias contains, include
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {*} target The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
	     * @example
	     *
	     * _.includes([1, 2, 3], 1);
	     * // => true
	     *
	     * _.includes([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.includes('pebbles', 'eb');
	     * // => true
	     */
	    function includes(collection, target, fromIndex, guard) {
	      var length = collection ? getLength(collection) : 0;
	      if (!isLength(length)) {
	        collection = values(collection);
	        length = collection.length;
	      }
	      if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
	        fromIndex = 0;
	      } else {
	        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
	      }
	      return (typeof collection == 'string' || !isArray(collection) && isString(collection))
	        ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1)
	        : (!!length && getIndexOf(collection, target, fromIndex) > -1);
	    }
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the last element responsible for generating the key. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keyData = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keyData, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) {
	     *   return String.fromCharCode(object.code);
	     * });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) {
	     *   return this.fromCharCode(object.code);
	     * }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */
	    var indexBy = createAggregator(function(result, value, key) {
	      result[key] = value;
	    });
	
	    /**
	     * Invokes the method at `path` of each element in `collection`, returning
	     * an array of the results of each invoked method. Any additional arguments
	     * are provided to each invoked method. If `methodName` is a function it is
	     * invoked for, and `this` bound to, each element in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|string} path The path of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */
	    var invoke = restParam(function(collection, path, args) {
	      var index = -1,
	          isFunc = typeof path == 'function',
	          isProp = isKey(path),
	          result = isArrayLike(collection) ? Array(collection.length) : [];
	
	      baseEach(collection, function(value) {
	        var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
	        result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
	      });
	      return result;
	    });
	
	    /**
	     * Creates an array of values by running each element in `collection` through
	     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	     *
	     * The guarded methods are:
	     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
	     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
	     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
	     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
	     * `sum`, `uniq`, and `words`
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new mapped array.
	     * @example
	     *
	     * function timesThree(n) {
	     *   return n * 3;
	     * }
	     *
	     * _.map([1, 2], timesThree);
	     * // => [3, 6]
	     *
	     * _.map({ 'a': 1, 'b': 2 }, timesThree);
	     * // => [3, 6] (iteration order is not guaranteed)
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * // using the `_.property` callback shorthand
	     * _.map(users, 'user');
	     * // => ['barney', 'fred']
	     */
	    function map(collection, iteratee, thisArg) {
	      var func = isArray(collection) ? arrayMap : baseMap;
	      iteratee = getCallback(iteratee, thisArg, 3);
	      return func(collection, iteratee);
	    }
	
	    /**
	     * Creates an array of elements split into two groups, the first of which
	     * contains elements `predicate` returns truthy for, while the second of which
	     * contains elements `predicate` returns falsey for. The predicate is bound
	     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the array of grouped elements.
	     * @example
	     *
	     * _.partition([1, 2, 3], function(n) {
	     *   return n % 2;
	     * });
	     * // => [[1, 3], [2]]
	     *
	     * _.partition([1.2, 2.3, 3.4], function(n) {
	     *   return this.floor(n) % 2;
	     * }, Math);
	     * // => [[1.2, 3.4], [2.3]]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': false },
	     *   { 'user': 'fred',    'age': 40, 'active': true },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * var mapper = function(array) {
	     *   return _.pluck(array, 'user');
	     * };
	     *
	     * // using the `_.matches` callback shorthand
	     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
	     * // => [['pebbles'], ['barney', 'fred']]
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.map(_.partition(users, 'active', false), mapper);
	     * // => [['barney', 'pebbles'], ['fred']]
	     *
	     * // using the `_.property` callback shorthand
	     * _.map(_.partition(users, 'active'), mapper);
	     * // => [['fred'], ['barney', 'pebbles']]
	     */
	    var partition = createAggregator(function(result, value, key) {
	      result[key ? 0 : 1].push(value);
	    }, function() { return [[], []]; });
	
	    /**
	     * Gets the property value of `path` from all elements in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|string} path The path of the property to pluck.
	     * @returns {Array} Returns the property values.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(users, 'user');
	     * // => ['barney', 'fred']
	     *
	     * var userIndex = _.indexBy(users, 'user');
	     * _.pluck(userIndex, 'age');
	     * // => [36, 40] (iteration order is not guaranteed)
	     */
	    function pluck(collection, path) {
	      return map(collection, property(path));
	    }
	
	    /**
	     * Reduces `collection` to a value which is the accumulated result of running
	     * each element in `collection` through `iteratee`, where each successive
	     * invocation is supplied the return value of the previous. If `accumulator`
	     * is not provided the first element of `collection` is used as the initial
	     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
	     * (accumulator, value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.reduce`, `_.reduceRight`, and `_.transform`.
	     *
	     * The guarded methods are:
	     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `sortByAll`,
	     * and `sortByOrder`
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.reduce([1, 2], function(total, n) {
	     *   return total + n;
	     * });
	     * // => 3
	     *
	     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
	     */
	    var reduce = createReduce(arrayReduce, baseEach);
	
	    /**
	     * This method is like `_.reduce` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var array = [[0, 1], [2, 3], [4, 5]];
	     *
	     * _.reduceRight(array, function(flattened, other) {
	     *   return flattened.concat(other);
	     * }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
	    var reduceRight = createReduce(arrayReduceRight, baseEachRight);
	
	    /**
	     * The opposite of `_.filter`; this method returns the elements of `collection`
	     * that `predicate` does **not** return truthy for.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * _.reject([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 0;
	     * });
	     * // => [1, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.reject(users, 'active', false), 'user');
	     * // => ['fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.reject(users, 'active'), 'user');
	     * // => ['barney']
	     */
	    function reject(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayFilter : baseFilter;
	      predicate = getCallback(predicate, thisArg, 3);
	      return func(collection, function(value, index, collection) {
	        return !predicate(value, index, collection);
	      });
	    }
	
	    /**
	     * Gets a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {*} Returns the random sample(s).
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */
	    function sample(collection, n, guard) {
	      if (guard ? isIterateeCall(collection, n, guard) : n == null) {
	        collection = toIterable(collection);
	        var length = collection.length;
	        return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
	      }
	      var index = -1,
	          result = toArray(collection),
	          length = result.length,
	          lastIndex = length - 1;
	
	      n = nativeMin(n < 0 ? 0 : (+n || 0), length);
	      while (++index < n) {
	        var rand = baseRandom(index, lastIndex),
	            value = result[rand];
	
	        result[rand] = result[index];
	        result[index] = value;
	      }
	      result.length = n;
	      return result;
	    }
	
	    /**
	     * Creates an array of shuffled values, using a version of the
	     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4]);
	     * // => [4, 1, 3, 2]
	     */
	    function shuffle(collection) {
	      return sample(collection, POSITIVE_INFINITY);
	    }
	
	    /**
	     * Gets the size of `collection` by returning its length for array-like
	     * values or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns the size of `collection`.
	     * @example
	     *
	     * _.size([1, 2, 3]);
	     * // => 3
	     *
	     * _.size({ 'a': 1, 'b': 2 });
	     * // => 2
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
	    function size(collection) {
	      var length = collection ? getLength(collection) : 0;
	      return isLength(length) ? length : keys(collection).length;
	    }
	
	    /**
	     * Checks if `predicate` returns truthy for **any** element of `collection`.
	     * The function returns as soon as it finds a passing value and does not iterate
	     * over the entire collection. The predicate is bound to `thisArg` and invoked
	     * with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': true },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.some(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.some(users, 'active', false);
	     * // => true
	     *
	     * // using the `_.property` callback shorthand
	     * _.some(users, 'active');
	     * // => true
	     */
	    function some(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arraySome : baseSome;
	      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	        predicate = undefined;
	      }
	      if (typeof predicate != 'function' || thisArg !== undefined) {
	        predicate = getCallback(predicate, thisArg, 3);
	      }
	      return func(collection, predicate);
	    }
	
	    /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through `iteratee`. This method performs
	     * a stable sort, that is, it preserves the original sort order of equal elements.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(n) {
	     *   return Math.sin(n);
	     * });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(n) {
	     *   return this.sin(n);
	     * }, Math);
	     * // => [3, 1, 2]
	     *
	     * var users = [
	     *   { 'user': 'fred' },
	     *   { 'user': 'pebbles' },
	     *   { 'user': 'barney' }
	     * ];
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.sortBy(users, 'user'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */
	    function sortBy(collection, iteratee, thisArg) {
	      if (collection == null) {
	        return [];
	      }
	      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	        iteratee = undefined;
	      }
	      var index = -1;
	      iteratee = getCallback(iteratee, thisArg, 3);
	
	      var result = baseMap(collection, function(value, key, collection) {
	        return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
	      });
	      return baseSortBy(result, compareAscending);
	    }
	
	    /**
	     * This method is like `_.sortBy` except that it can sort by multiple iteratees
	     * or property names.
	     *
	     * If a property name is provided for an iteratee the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If an object is provided for an iteratee the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
	     *  The iteratees to sort by, specified as individual values or arrays of values.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 34 }
	     * ];
	     *
	     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
	     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
	     *
	     * _.map(_.sortByAll(users, 'user', function(chr) {
	     *   return Math.floor(chr.age / 10);
	     * }), _.values);
	     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */
	    var sortByAll = restParam(function(collection, iteratees) {
	      if (collection == null) {
	        return [];
	      }
	      var guard = iteratees[2];
	      if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
	        iteratees.length = 1;
	      }
	      return baseSortByOrder(collection, baseFlatten(iteratees), []);
	    });
	
	    /**
	     * This method is like `_.sortByAll` except that it allows specifying the
	     * sort orders of the iteratees to sort by. If `orders` is unspecified, all
	     * values are sorted in ascending order. Otherwise, a value is sorted in
	     * ascending order if its corresponding order is "asc", and descending if "desc".
	     *
	     * If a property name is provided for an iteratee the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If an object is provided for an iteratee the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {boolean[]} [orders] The sort orders of `iteratees`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 34 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 36 }
	     * ];
	     *
	     * // sort by `user` in ascending order and by `age` in descending order
	     * _.map(_.sortByOrder(users, ['user', 'age'], ['asc', 'desc']), _.values);
	     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */
	    function sortByOrder(collection, iteratees, orders, guard) {
	      if (collection == null) {
	        return [];
	      }
	      if (guard && isIterateeCall(iteratees, orders, guard)) {
	        orders = undefined;
	      }
	      if (!isArray(iteratees)) {
	        iteratees = iteratees == null ? [] : [iteratees];
	      }
	      if (!isArray(orders)) {
	        orders = orders == null ? [] : [orders];
	      }
	      return baseSortByOrder(collection, iteratees, orders);
	    }
	
	    /**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
	     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
	     * // => ['barney']
	     *
	     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
	     * // => ['fred']
	     */
	    function where(collection, source) {
	      return filter(collection, baseMatches(source));
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Date
	     * @example
	     *
	     * _.defer(function(stamp) {
	     *   console.log(_.now() - stamp);
	     * }, _.now());
	     * // => logs the number of milliseconds it took for the deferred function to be invoked
	     */
	    var now = nativeNow || function() {
	      return new Date().getTime();
	    };
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * The opposite of `_.before`; this method creates a function that invokes
	     * `func` once it is called `n` or more times.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls before `func` is invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'done saving!' after the two async saves have completed
	     */
	    function after(n, func) {
	      if (typeof func != 'function') {
	        if (typeof n == 'function') {
	          var temp = n;
	          n = func;
	          func = temp;
	        } else {
	          throw new TypeError(FUNC_ERROR_TEXT);
	        }
	      }
	      n = nativeIsFinite(n = +n) ? n : 0;
	      return function() {
	        if (--n < 1) {
	          return func.apply(this, arguments);
	        }
	      };
	    }
	
	    /**
	     * Creates a function that accepts up to `n` arguments ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @param {number} [n=func.length] The arity cap.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	     * // => [6, 8, 10]
	     */
	    function ary(func, n, guard) {
	      if (guard && isIterateeCall(func, n, guard)) {
	        n = undefined;
	      }
	      n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
	      return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
	    }
	
	    /**
	     * Creates a function that invokes `func`, with the `this` binding and arguments
	     * of the created function, while it is called less than `n` times. Subsequent
	     * calls to the created function return the result of the last `func` invocation.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls at which `func` is no longer invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * jQuery('#add').on('click', _.before(5, addContactToList));
	     * // => allows adding up to 4 contacts to the list
	     */
	    function before(n, func) {
	      var result;
	      if (typeof func != 'function') {
	        if (typeof n == 'function') {
	          var temp = n;
	          n = func;
	          func = temp;
	        } else {
	          throw new TypeError(FUNC_ERROR_TEXT);
	        }
	      }
	      return function() {
	        if (--n > 0) {
	          result = func.apply(this, arguments);
	        }
	        if (n <= 1) {
	          func = undefined;
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and prepends any additional `_.bind` arguments to those provided to the
	     * bound function.
	     *
	     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** Unlike native `Function#bind` this method does not set the "length"
	     * property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var greet = function(greeting, punctuation) {
	     *   return greeting + ' ' + this.user + punctuation;
	     * };
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * var bound = _.bind(greet, object, 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * // using placeholders
	     * var bound = _.bind(greet, object, _, '!');
	     * bound('hi');
	     * // => 'hi fred!'
	     */
	    var bind = restParam(function(func, thisArg, partials) {
	      var bitmask = BIND_FLAG;
	      if (partials.length) {
	        var holders = replaceHolders(partials, bind.placeholder);
	        bitmask |= PARTIAL_FLAG;
	      }
	      return createWrapper(func, bitmask, thisArg, partials, holders);
	    });
	
	    /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all enumerable function
	     * properties, own and inherited, of `object` are bound.
	     *
	     * **Note:** This method does not set the "length" property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...(string|string[])} [methodNames] The object method names to bind,
	     *  specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() {
	     *     console.log('clicked ' + this.label);
	     *   }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs' when the element is clicked
	     */
	    var bindAll = restParam(function(object, methodNames) {
	      methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);
	
	      var index = -1,
	          length = methodNames.length;
	
	      while (++index < length) {
	        var key = methodNames[index];
	        object[key] = createWrapper(object[key], BIND_FLAG, object);
	      }
	      return object;
	    });
	
	    /**
	     * Creates a function that invokes the method at `object[key]` and prepends
	     * any additional `_.bindKey` arguments to those provided to the bound function.
	     *
	     * This method differs from `_.bind` by allowing bound functions to reference
	     * methods that may be redefined or don't yet exist.
	     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
	     * for more details.
	     *
	     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'user': 'fred',
	     *   'greet': function(greeting, punctuation) {
	     *     return greeting + ' ' + this.user + punctuation;
	     *   }
	     * };
	     *
	     * var bound = _.bindKey(object, 'greet', 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * object.greet = function(greeting, punctuation) {
	     *   return greeting + 'ya ' + this.user + punctuation;
	     * };
	     *
	     * bound('!');
	     * // => 'hiya fred!'
	     *
	     * // using placeholders
	     * var bound = _.bindKey(object, 'greet', _, '!');
	     * bound('hi');
	     * // => 'hiya fred!'
	     */
	    var bindKey = restParam(function(object, key, partials) {
	      var bitmask = BIND_FLAG | BIND_KEY_FLAG;
	      if (partials.length) {
	        var holders = replaceHolders(partials, bindKey.placeholder);
	        bitmask |= PARTIAL_FLAG;
	      }
	      return createWrapper(key, bitmask, object, partials, holders);
	    });
	
	    /**
	     * Creates a function that accepts one or more arguments of `func` that when
	     * called either invokes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` may be specified
	     * if `func.length` is not sufficient.
	     *
	     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curry(abc);
	     *
	     * curried(1)(2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(1)(_, 3)(2);
	     * // => [1, 2, 3]
	     */
	    var curry = createCurry(CURRY_FLAG);
	
	    /**
	     * This method is like `_.curry` except that arguments are applied to `func`
	     * in the manner of `_.partialRight` instead of `_.partial`.
	     *
	     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curryRight(abc);
	     *
	     * curried(3)(2)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(2, 3)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(3)(1, _)(2);
	     * // => [1, 2, 3]
	     */
	    var curryRight = createCurry(CURRY_RIGHT_FLAG);
	
	    /**
	     * Creates a debounced function that delays invoking `func` until after `wait`
	     * milliseconds have elapsed since the last time the debounced function was
	     * invoked. The debounced function comes with a `cancel` method to cancel
	     * delayed invocations. Provide an options object to indicate that `func`
	     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	     * Subsequent calls to the debounced function return the result of the last
	     * `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.debounce` and `_.throttle`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to debounce.
	     * @param {number} [wait=0] The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	     *  delayed before it is invoked.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	     *
	     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * }));
	     *
	     * // ensure `batchLog` is invoked once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * jQuery(source).on('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }));
	     *
	     * // cancel a debounced call
	     * var todoChanges = _.debounce(batchLog, 1000);
	     * Object.observe(models.todo, todoChanges);
	     *
	     * Object.observe(models, function(changes) {
	     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	     *     todoChanges.cancel();
	     *   }
	     * }, ['delete']);
	     *
	     * // ...at some point `models.todo` is changed
	     * models.todo.completed = true;
	     *
	     * // ...before 1 second has passed `models.todo` is deleted
	     * // which cancels the debounced `todoChanges` call
	     * delete models.todo;
	     */
	    function debounce(func, wait, options) {
	      var args,
	          maxTimeoutId,
	          result,
	          stamp,
	          thisArg,
	          timeoutId,
	          trailingCall,
	          lastCalled = 0,
	          maxWait = false,
	          trailing = true;
	
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      wait = wait < 0 ? 0 : (+wait || 0);
	      if (options === true) {
	        var leading = true;
	        trailing = false;
	      } else if (isObject(options)) {
	        leading = !!options.leading;
	        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	        trailing = 'trailing' in options ? !!options.trailing : trailing;
	      }
	
	      function cancel() {
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	        if (maxTimeoutId) {
	          clearTimeout(maxTimeoutId);
	        }
	        lastCalled = 0;
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	      }
	
	      function complete(isCalled, id) {
	        if (id) {
	          clearTimeout(id);
	        }
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	        if (isCalled) {
	          lastCalled = now();
	          result = func.apply(thisArg, args);
	          if (!timeoutId && !maxTimeoutId) {
	            args = thisArg = undefined;
	          }
	        }
	      }
	
	      function delayed() {
	        var remaining = wait - (now() - stamp);
	        if (remaining <= 0 || remaining > wait) {
	          complete(trailingCall, maxTimeoutId);
	        } else {
	          timeoutId = setTimeout(delayed, remaining);
	        }
	      }
	
	      function maxDelayed() {
	        complete(trailing, timeoutId);
	      }
	
	      function debounced() {
	        args = arguments;
	        stamp = now();
	        thisArg = this;
	        trailingCall = trailing && (timeoutId || !leading);
	
	        if (maxWait === false) {
	          var leadingCall = leading && !timeoutId;
	        } else {
	          if (!maxTimeoutId && !leading) {
	            lastCalled = stamp;
	          }
	          var remaining = maxWait - (stamp - lastCalled),
	              isCalled = remaining <= 0 || remaining > maxWait;
	
	          if (isCalled) {
	            if (maxTimeoutId) {
	              maxTimeoutId = clearTimeout(maxTimeoutId);
	            }
	            lastCalled = stamp;
	            result = func.apply(thisArg, args);
	          }
	          else if (!maxTimeoutId) {
	            maxTimeoutId = setTimeout(maxDelayed, remaining);
	          }
	        }
	        if (isCalled && timeoutId) {
	          timeoutId = clearTimeout(timeoutId);
	        }
	        else if (!timeoutId && wait !== maxWait) {
	          timeoutId = setTimeout(delayed, wait);
	        }
	        if (leadingCall) {
	          isCalled = true;
	          result = func.apply(thisArg, args);
	        }
	        if (isCalled && !timeoutId && !maxTimeoutId) {
	          args = thisArg = undefined;
	        }
	        return result;
	      }
	      debounced.cancel = cancel;
	      return debounced;
	    }
	
	    /**
	     * Defers invoking the `func` until the current call stack has cleared. Any
	     * additional arguments are provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to defer.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) {
	     *   console.log(text);
	     * }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */
	    var defer = restParam(function(func, args) {
	      return baseDelay(func, 1, args);
	    });
	
	    /**
	     * Invokes `func` after `wait` milliseconds. Any additional arguments are
	     * provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) {
	     *   console.log(text);
	     * }, 1000, 'later');
	     * // => logs 'later' after one second
	     */
	    var delay = restParam(function(func, wait, args) {
	      return baseDelay(func, wait, args);
	    });
	
	    /**
	     * Creates a function that returns the result of invoking the provided
	     * functions with the `this` binding of the created function, where each
	     * successive invocation is supplied the return value of the previous.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flow(_.add, square);
	     * addSquare(1, 2);
	     * // => 9
	     */
	    var flow = createFlow();
	
	    /**
	     * This method is like `_.flow` except that it creates a function that
	     * invokes the provided functions from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias backflow, compose
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flowRight(square, _.add);
	     * addSquare(1, 2);
	     * // => 9
	     */
	    var flowRight = createFlow(true);
	
	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is coerced to a string and used as the
	     * cache key. The `func` is invoked with the `this` binding of the memoized
	     * function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	     * method interface of `get`, `has`, and `set`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var upperCase = _.memoize(function(string) {
	     *   return string.toUpperCase();
	     * });
	     *
	     * upperCase('fred');
	     * // => 'FRED'
	     *
	     * // modifying the result cache
	     * upperCase.cache.set('fred', 'BARNEY');
	     * upperCase('fred');
	     * // => 'BARNEY'
	     *
	     * // replacing `_.memoize.Cache`
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'barney' };
	     * var identity = _.memoize(_.identity);
	     *
	     * identity(object);
	     * // => { 'user': 'fred' }
	     * identity(other);
	     * // => { 'user': 'fred' }
	     *
	     * _.memoize.Cache = WeakMap;
	     * var identity = _.memoize(_.identity);
	     *
	     * identity(object);
	     * // => { 'user': 'fred' }
	     * identity(other);
	     * // => { 'user': 'barney' }
	     */
	    function memoize(func, resolver) {
	      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var memoized = function() {
	        var args = arguments,
	            key = resolver ? resolver.apply(this, args) : args[0],
	            cache = memoized.cache;
	
	        if (cache.has(key)) {
	          return cache.get(key);
	        }
	        var result = func.apply(this, args);
	        memoized.cache = cache.set(key, result);
	        return result;
	      };
	      memoized.cache = new memoize.Cache;
	      return memoized;
	    }
	
	    /**
	     * Creates a function that runs each argument through a corresponding
	     * transform function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to wrap.
	     * @param {...(Function|Function[])} [transforms] The functions to transform
	     * arguments, specified as individual functions or arrays of functions.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function doubled(n) {
	     *   return n * 2;
	     * }
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var modded = _.modArgs(function(x, y) {
	     *   return [x, y];
	     * }, square, doubled);
	     *
	     * modded(1, 2);
	     * // => [1, 4]
	     *
	     * modded(5, 10);
	     * // => [25, 20]
	     */
	    var modArgs = restParam(function(func, transforms) {
	      transforms = baseFlatten(transforms);
	      if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var length = transforms.length;
	      return restParam(function(args) {
	        var index = nativeMin(args.length, length);
	        while (index--) {
	          args[index] = transforms[index](args[index]);
	        }
	        return func.apply(this, args);
	      });
	    });
	
	    /**
	     * Creates a function that negates the result of the predicate `func`. The
	     * `func` predicate is invoked with the `this` binding and arguments of the
	     * created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} predicate The predicate to negate.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function isEven(n) {
	     *   return n % 2 == 0;
	     * }
	     *
	     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	     * // => [1, 3, 5]
	     */
	    function negate(predicate) {
	      if (typeof predicate != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return function() {
	        return !predicate.apply(this, arguments);
	      };
	    }
	
	    /**
	     * Creates a function that is restricted to invoking `func` once. Repeat calls
	     * to the function return the value of the first call. The `func` is invoked
	     * with the `this` binding and arguments of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` invokes `createApplication` once
	     */
	    function once(func) {
	      return before(2, func);
	    }
	
	    /**
	     * Creates a function that invokes `func` with `partial` arguments prepended
	     * to those provided to the new function. This method is like `_.bind` except
	     * it does **not** alter the `this` binding.
	     *
	     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var sayHelloTo = _.partial(greet, 'hello');
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     *
	     * // using placeholders
	     * var greetFred = _.partial(greet, _, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     */
	    var partial = createPartial(PARTIAL_FLAG);
	
	    /**
	     * This method is like `_.partial` except that partially applied arguments
	     * are appended to those provided to the new function.
	     *
	     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var greetFred = _.partialRight(greet, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     *
	     * // using placeholders
	     * var sayHelloTo = _.partialRight(greet, 'hello', _);
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     */
	    var partialRight = createPartial(PARTIAL_RIGHT_FLAG);
	
	    /**
	     * Creates a function that invokes `func` with arguments arranged according
	     * to the specified indexes where the argument value at the first index is
	     * provided as the first argument, the argument value at the second index is
	     * provided as the second argument, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to rearrange arguments for.
	     * @param {...(number|number[])} indexes The arranged argument indexes,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var rearged = _.rearg(function(a, b, c) {
	     *   return [a, b, c];
	     * }, 2, 0, 1);
	     *
	     * rearged('b', 'c', 'a')
	     * // => ['a', 'b', 'c']
	     *
	     * var map = _.rearg(_.map, [1, 0]);
	     * map(function(n) {
	     *   return n * 3;
	     * }, [1, 2, 3]);
	     * // => [3, 6, 9]
	     */
	    var rearg = restParam(function(func, indexes) {
	      return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
	    });
	
	    /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * created function and arguments from `start` and beyond provided as an array.
	     *
	     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.restParam(function(what, names) {
	     *   return what + ' ' + _.initial(names).join(', ') +
	     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	     * });
	     *
	     * say('hello', 'fred', 'barney', 'pebbles');
	     * // => 'hello fred, barney, & pebbles'
	     */
	    function restParam(func, start) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	      return function() {
	        var args = arguments,
	            index = -1,
	            length = nativeMax(args.length - start, 0),
	            rest = Array(length);
	
	        while (++index < length) {
	          rest[index] = args[start + index];
	        }
	        switch (start) {
	          case 0: return func.call(this, rest);
	          case 1: return func.call(this, args[0], rest);
	          case 2: return func.call(this, args[0], args[1], rest);
	        }
	        var otherArgs = Array(start + 1);
	        index = -1;
	        while (++index < start) {
	          otherArgs[index] = args[index];
	        }
	        otherArgs[start] = rest;
	        return func.apply(this, otherArgs);
	      };
	    }
	
	    /**
	     * Creates a function that invokes `func` with the `this` binding of the created
	     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
	     *
	     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to spread arguments over.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.spread(function(who, what) {
	     *   return who + ' says ' + what;
	     * });
	     *
	     * say(['fred', 'hello']);
	     * // => 'fred says hello'
	     *
	     * // with a Promise
	     * var numbers = Promise.all([
	     *   Promise.resolve(40),
	     *   Promise.resolve(36)
	     * ]);
	     *
	     * numbers.then(_.spread(function(x, y) {
	     *   return x + y;
	     * }));
	     * // => a Promise of 76
	     */
	    function spread(func) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return function(array) {
	        return func.apply(this, array);
	      };
	    }
	
	    /**
	     * Creates a throttled function that only invokes `func` at most once per
	     * every `wait` milliseconds. The throttled function comes with a `cancel`
	     * method to cancel delayed invocations. Provide an options object to indicate
	     * that `func` should be invoked on the leading and/or trailing edge of the
	     * `wait` timeout. Subsequent calls to the throttled function return the
	     * result of the last `func` call.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.throttle` and `_.debounce`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to throttle.
	     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	     *
	     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	     *   'trailing': false
	     * }));
	     *
	     * // cancel a trailing throttled call
	     * jQuery(window).on('popstate', throttled.cancel);
	     */
	    function throttle(func, wait, options) {
	      var leading = true,
	          trailing = true;
	
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      if (options === false) {
	        leading = false;
	      } else if (isObject(options)) {
	        leading = 'leading' in options ? !!options.leading : leading;
	        trailing = 'trailing' in options ? !!options.trailing : trailing;
	      }
	      return debounce(func, wait, { 'leading': leading, 'maxWait': +wait, 'trailing': trailing });
	    }
	
	    /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Any additional arguments provided to the function are
	     * appended to those provided to the wrapper function. The wrapper is invoked
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('fred, barney, & pebbles');
	     * // => '<p>fred, barney, &amp; pebbles</p>'
	     */
	    function wrap(value, wrapper) {
	      wrapper = wrapper == null ? identity : wrapper;
	      return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
	     * otherwise they are assigned by reference. If `customizer` is provided it is
	     * invoked to produce the cloned values. If `customizer` returns `undefined`
	     * cloning is handled by the method instead. The `customizer` is bound to
	     * `thisArg` and invoked with two argument; (value [, index|key, object]).
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var shallow = _.clone(users);
	     * shallow[0] === users[0];
	     * // => true
	     *
	     * var deep = _.clone(users, true);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * // using a customizer callback
	     * var el = _.clone(document.body, function(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(false);
	     *   }
	     * });
	     *
	     * el === document.body
	     * // => false
	     * el.nodeName
	     * // => BODY
	     * el.childNodes.length;
	     * // => 0
	     */
	    function clone(value, isDeep, customizer, thisArg) {
	      if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
	        isDeep = false;
	      }
	      else if (typeof isDeep == 'function') {
	        thisArg = customizer;
	        customizer = isDeep;
	        isDeep = false;
	      }
	      return typeof customizer == 'function'
	        ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1))
	        : baseClone(value, isDeep);
	    }
	
	    /**
	     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
	     * to produce the cloned values. If `customizer` returns `undefined` cloning
	     * is handled by the method instead. The `customizer` is bound to `thisArg`
	     * and invoked with two argument; (value [, index|key, object]).
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var deep = _.cloneDeep(users);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * // using a customizer callback
	     * var el = _.cloneDeep(document.body, function(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(true);
	     *   }
	     * });
	     *
	     * el === document.body
	     * // => false
	     * el.nodeName
	     * // => BODY
	     * el.childNodes.length;
	     * // => 20
	     */
	    function cloneDeep(value, customizer, thisArg) {
	      return typeof customizer == 'function'
	        ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
	        : baseClone(value, true);
	    }
	
	    /**
	     * Checks if `value` is greater than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
	     * @example
	     *
	     * _.gt(3, 1);
	     * // => true
	     *
	     * _.gt(3, 3);
	     * // => false
	     *
	     * _.gt(1, 3);
	     * // => false
	     */
	    function gt(value, other) {
	      return value > other;
	    }
	
	    /**
	     * Checks if `value` is greater than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.gte(3, 1);
	     * // => true
	     *
	     * _.gte(3, 3);
	     * // => true
	     *
	     * _.gte(1, 3);
	     * // => false
	     */
	    function gte(value, other) {
	      return value >= other;
	    }
	
	    /**
	     * Checks if `value` is classified as an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArguments(function() { return arguments; }());
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    function isArguments(value) {
	      return isObjectLike(value) && isArrayLike(value) &&
	        hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	    }
	
	    /**
	     * Checks if `value` is classified as an `Array` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     *
	     * _.isArray(function() { return arguments; }());
	     * // => false
	     */
	    var isArray = nativeIsArray || function(value) {
	      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	    };
	
	    /**
	     * Checks if `value` is classified as a boolean primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isBoolean(false);
	     * // => true
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
	    function isBoolean(value) {
	      return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
	    }
	
	    /**
	     * Checks if `value` is classified as a `Date` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     *
	     * _.isDate('Mon April 23 2012');
	     * // => false
	     */
	    function isDate(value) {
	      return isObjectLike(value) && objToString.call(value) == dateTag;
	    }
	
	    /**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     *
	     * _.isElement('<body>');
	     * // => false
	     */
	    function isElement(value) {
	      return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
	    }
	
	    /**
	     * Checks if `value` is empty. A value is considered empty unless it is an
	     * `arguments` object, array, string, or jQuery-like collection with a length
	     * greater than `0` or an object with own enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty(null);
	     * // => true
	     *
	     * _.isEmpty(true);
	     * // => true
	     *
	     * _.isEmpty(1);
	     * // => true
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({ 'a': 1 });
	     * // => false
	     */
	    function isEmpty(value) {
	      if (value == null) {
	        return true;
	      }
	      if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
	          (isObjectLike(value) && isFunction(value.splice)))) {
	        return !value.length;
	      }
	      return !keys(value).length;
	    }
	
	    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent. If `customizer` is provided it is invoked to compare values.
	     * If `customizer` returns `undefined` comparisons are handled by the method
	     * instead. The `customizer` is bound to `thisArg` and invoked with three
	     * arguments: (value, other [, index|key]).
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. Functions and DOM nodes
	     * are **not** supported. Provide a customizer function to extend support
	     * for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @alias eq
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize value comparisons.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'fred' };
	     *
	     * object == other;
	     * // => false
	     *
	     * _.isEqual(object, other);
	     * // => true
	     *
	     * // using a customizer callback
	     * var array = ['hello', 'goodbye'];
	     * var other = ['hi', 'goodbye'];
	     *
	     * _.isEqual(array, other, function(value, other) {
	     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
	     *     return true;
	     *   }
	     * });
	     * // => true
	     */
	    function isEqual(value, other, customizer, thisArg) {
	      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
	      var result = customizer ? customizer(value, other) : undefined;
	      return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
	    }
	
	    /**
	     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	     * `SyntaxError`, `TypeError`, or `URIError` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	     * @example
	     *
	     * _.isError(new Error);
	     * // => true
	     *
	     * _.isError(Error);
	     * // => false
	     */
	    function isError(value) {
	      return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
	    }
	
	    /**
	     * Checks if `value` is a finite primitive number.
	     *
	     * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	     * @example
	     *
	     * _.isFinite(10);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => false
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite(Object(10));
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */
	    function isFinite(value) {
	      return typeof value == 'number' && nativeIsFinite(value);
	    }
	
	    /**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */
	    function isFunction(value) {
	      // The use of `Object#toString` avoids issues with the `typeof` operator
	      // in older versions of Chrome and Safari which return 'function' for regexes
	      // and Safari 8 equivalents which return 'object' for typed array constructors.
	      return isObject(value) && objToString.call(value) == funcTag;
	    }
	
	    /**
	     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */
	    function isObject(value) {
	      // Avoid a V8 JIT bug in Chrome 19-20.
	      // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	      var type = typeof value;
	      return !!value && (type == 'object' || type == 'function');
	    }
	
	    /**
	     * Performs a deep comparison between `object` and `source` to determine if
	     * `object` contains equivalent property values. If `customizer` is provided
	     * it is invoked to compare values. If `customizer` returns `undefined`
	     * comparisons are handled by the method instead. The `customizer` is bound
	     * to `thisArg` and invoked with three arguments: (value, other, index|key).
	     *
	     * **Note:** This method supports comparing properties of arrays, booleans,
	     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
	     * and DOM nodes are **not** supported. Provide a customizer function to extend
	     * support for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Function} [customizer] The function to customize value comparisons.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.isMatch(object, { 'age': 40 });
	     * // => true
	     *
	     * _.isMatch(object, { 'age': 36 });
	     * // => false
	     *
	     * // using a customizer callback
	     * var object = { 'greeting': 'hello' };
	     * var source = { 'greeting': 'hi' };
	     *
	     * _.isMatch(object, source, function(value, other) {
	     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
	     * });
	     * // => true
	     */
	    function isMatch(object, source, customizer, thisArg) {
	      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
	      return baseIsMatch(object, getMatchData(source), customizer);
	    }
	
	    /**
	     * Checks if `value` is `NaN`.
	     *
	     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
	     * which returns `true` for `undefined` and other non-numeric values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
	    function isNaN(value) {
	      // An `NaN` primitive is the only value that is not equal to itself.
	      // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
	      return isNumber(value) && value != +value;
	    }
	
	    /**
	     * Checks if `value` is a native function.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */
	    function isNative(value) {
	      if (value == null) {
	        return false;
	      }
	      if (isFunction(value)) {
	        return reIsNative.test(fnToString.call(value));
	      }
	      return isObjectLike(value) && reIsHostCtor.test(value);
	    }
	
	    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(void 0);
	     * // => false
	     */
	    function isNull(value) {
	      return value === null;
	    }
	
	    /**
	     * Checks if `value` is classified as a `Number` primitive or object.
	     *
	     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	     * as numbers, use the `_.isFinite` method.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4);
	     * // => true
	     *
	     * _.isNumber(NaN);
	     * // => true
	     *
	     * _.isNumber('8.4');
	     * // => false
	     */
	    function isNumber(value) {
	      return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
	    }
	
	    /**
	     * Checks if `value` is a plain object, that is, an object created by the
	     * `Object` constructor or one with a `[[Prototype]]` of `null`.
	     *
	     * **Note:** This method assumes objects created by the `Object` constructor
	     * have no inherited enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * _.isPlainObject(new Foo);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     *
	     * _.isPlainObject(Object.create(null));
	     * // => true
	     */
	    function isPlainObject(value) {
	      var Ctor;
	
	      // Exit early for non `Object` objects.
	      if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	          (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	        return false;
	      }
	      // IE < 9 iterates inherited properties before own properties. If the first
	      // iterated property is an object's own property then there are no inherited
	      // enumerable properties.
	      var result;
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      baseForIn(value, function(subValue, key) {
	        result = key;
	      });
	      return result === undefined || hasOwnProperty.call(value, result);
	    }
	
	    /**
	     * Checks if `value` is classified as a `RegExp` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isRegExp(/abc/);
	     * // => true
	     *
	     * _.isRegExp('/abc/');
	     * // => false
	     */
	    function isRegExp(value) {
	      return isObject(value) && objToString.call(value) == regexpTag;
	    }
	
	    /**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */
	    function isString(value) {
	      return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	    }
	
	    /**
	     * Checks if `value` is classified as a typed array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isTypedArray(new Uint8Array);
	     * // => true
	     *
	     * _.isTypedArray([]);
	     * // => false
	     */
	    function isTypedArray(value) {
	      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	    }
	
	    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     *
	     * _.isUndefined(null);
	     * // => false
	     */
	    function isUndefined(value) {
	      return value === undefined;
	    }
	
	    /**
	     * Checks if `value` is less than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
	     * @example
	     *
	     * _.lt(1, 3);
	     * // => true
	     *
	     * _.lt(3, 3);
	     * // => false
	     *
	     * _.lt(3, 1);
	     * // => false
	     */
	    function lt(value, other) {
	      return value < other;
	    }
	
	    /**
	     * Checks if `value` is less than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.lte(1, 3);
	     * // => true
	     *
	     * _.lte(3, 3);
	     * // => true
	     *
	     * _.lte(3, 1);
	     * // => false
	     */
	    function lte(value, other) {
	      return value <= other;
	    }
	
	    /**
	     * Converts `value` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the converted array.
	     * @example
	     *
	     * (function() {
	     *   return _.toArray(arguments).slice(1);
	     * }(1, 2, 3));
	     * // => [2, 3]
	     */
	    function toArray(value) {
	      var length = value ? getLength(value) : 0;
	      if (!isLength(length)) {
	        return values(value);
	      }
	      if (!length) {
	        return [];
	      }
	      return arrayCopy(value);
	    }
	
	    /**
	     * Converts `value` to a plain object flattening inherited enumerable
	     * properties of `value` to own properties of the plain object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Object} Returns the converted plain object.
	     * @example
	     *
	     * function Foo() {
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.assign({ 'a': 1 }, new Foo);
	     * // => { 'a': 1, 'b': 2 }
	     *
	     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	     * // => { 'a': 1, 'b': 2, 'c': 3 }
	     */
	    function toPlainObject(value) {
	      return baseCopy(value, keysIn(value));
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * overwrite property assignments of previous sources. If `customizer` is
	     * provided it is invoked to produce the merged values of the destination and
	     * source properties. If `customizer` returns `undefined` merging is handled
	     * by the method instead. The `customizer` is bound to `thisArg` and invoked
	     * with five arguments: (objectValue, sourceValue, key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var users = {
	     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	     * };
	     *
	     * var ages = {
	     *   'data': [{ 'age': 36 }, { 'age': 40 }]
	     * };
	     *
	     * _.merge(users, ages);
	     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	     *
	     * // using a customizer callback
	     * var object = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var other = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(object, other, function(a, b) {
	     *   if (_.isArray(a)) {
	     *     return a.concat(b);
	     *   }
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	     */
	    var merge = createAssigner(baseMerge);
	
	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources overwrite property assignments of previous sources.
	     * If `customizer` is provided it is invoked to produce the assigned values.
	     * The `customizer` is bound to `thisArg` and invoked with five arguments:
	     * (objectValue, sourceValue, key, object, source).
	     *
	     * **Note:** This method mutates `object` and is based on
	     * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	     *
	     * @static
	     * @memberOf _
	     * @alias extend
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	     * // => { 'user': 'fred', 'age': 40 }
	     *
	     * // using a customizer callback
	     * var defaults = _.partialRight(_.assign, function(value, other) {
	     *   return _.isUndefined(value) ? other : value;
	     * });
	     *
	     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	     * // => { 'user': 'barney', 'age': 36 }
	     */
	    var assign = createAssigner(function(object, source, customizer) {
	      return customizer
	        ? assignWith(object, source, customizer)
	        : baseAssign(object, source);
	    });
	
	    /**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, {
	     *   'constructor': Circle
	     * });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
	    function create(prototype, properties, guard) {
	      var result = baseCreate(prototype);
	      if (guard && isIterateeCall(prototype, properties, guard)) {
	        properties = undefined;
	      }
	      return properties ? baseAssign(result, properties) : result;
	    }
	
	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional values of the same property are ignored.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	     * // => { 'user': 'barney', 'age': 36 }
	     */
	    var defaults = createDefaults(assign, assignDefaults);
	
	    /**
	     * This method is like `_.defaults` except that it recursively assigns
	     * default properties.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
	     * // => { 'user': { 'name': 'barney', 'age': 36 } }
	     *
	     */
	    var defaultsDeep = createDefaults(merge, mergeDefaults);
	
	    /**
	     * This method is like `_.find` except that it returns the key of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findKey(users, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => 'barney' (iteration order is not guaranteed)
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findKey(users, { 'age': 1, 'active': true });
	     * // => 'pebbles'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findKey(users, 'active', false);
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.findKey(users, 'active');
	     * // => 'barney'
	     */
	    var findKey = createFindKey(baseForOwn);
	
	    /**
	     * This method is like `_.findKey` except that it iterates over elements of
	     * a collection in the opposite order.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findLastKey(users, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => returns `pebbles` assuming `_.findKey` returns `barney`
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findLastKey(users, { 'age': 36, 'active': true });
	     * // => 'barney'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findLastKey(users, 'active', false);
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.findLastKey(users, 'active');
	     * // => 'pebbles'
	     */
	    var findLastKey = createFindKey(baseForOwnRight);
	
	    /**
	     * Iterates over own and inherited enumerable properties of an object invoking
	     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	     * with three arguments: (value, key, object). Iteratee functions may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forIn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
	     */
	    var forIn = createForIn(baseFor);
	
	    /**
	     * This method is like `_.forIn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forInRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
	     */
	    var forInRight = createForIn(baseForRight);
	
	    /**
	     * Iterates over own enumerable properties of an object invoking `iteratee`
	     * for each property. The `iteratee` is bound to `thisArg` and invoked with
	     * three arguments: (value, key, object). Iteratee functions may exit iteration
	     * early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a' and 'b' (iteration order is not guaranteed)
	     */
	    var forOwn = createForOwn(baseForOwn);
	
	    /**
	     * This method is like `_.forOwn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwnRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
	     */
	    var forOwnRight = createForOwn(baseForOwnRight);
	
	    /**
	     * Creates an array of function property names from all enumerable properties,
	     * own and inherited, of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the new array of property names.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['after', 'ary', 'assign', ...]
	     */
	    function functions(object) {
	      return baseFunctions(object, keysIn(object));
	    }
	
	    /**
	     * Gets the property value at `path` of `object`. If the resolved value is
	     * `undefined` the `defaultValue` is used in its place.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.get(object, 'a[0].b.c');
	     * // => 3
	     *
	     * _.get(object, ['a', '0', 'b', 'c']);
	     * // => 3
	     *
	     * _.get(object, 'a.b.c', 'default');
	     * // => 'default'
	     */
	    function get(object, path, defaultValue) {
	      var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
	      return result === undefined ? defaultValue : result;
	    }
	
	    /**
	     * Checks if `path` is a direct property.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
	     * @example
	     *
	     * var object = { 'a': { 'b': { 'c': 3 } } };
	     *
	     * _.has(object, 'a');
	     * // => true
	     *
	     * _.has(object, 'a.b.c');
	     * // => true
	     *
	     * _.has(object, ['a', 'b', 'c']);
	     * // => true
	     */
	    function has(object, path) {
	      if (object == null) {
	        return false;
	      }
	      var result = hasOwnProperty.call(object, path);
	      if (!result && !isKey(path)) {
	        path = toPath(path);
	        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	        if (object == null) {
	          return false;
	        }
	        path = last(path);
	        result = hasOwnProperty.call(object, path);
	      }
	      return result || (isLength(object.length) && isIndex(path, object.length) &&
	        (isArray(object) || isArguments(object)));
	    }
	
	    /**
	     * Creates an object composed of the inverted keys and values of `object`.
	     * If `object` contains duplicate values, subsequent values overwrite property
	     * assignments of previous values unless `multiValue` is `true`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to invert.
	     * @param {boolean} [multiValue] Allow multiple values per key.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new inverted object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2, 'c': 1 };
	     *
	     * _.invert(object);
	     * // => { '1': 'c', '2': 'b' }
	     *
	     * // with `multiValue`
	     * _.invert(object, true);
	     * // => { '1': ['a', 'c'], '2': ['b'] }
	     */
	    function invert(object, multiValue, guard) {
	      if (guard && isIterateeCall(object, multiValue, guard)) {
	        multiValue = undefined;
	      }
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = {};
	
	      while (++index < length) {
	        var key = props[index],
	            value = object[key];
	
	        if (multiValue) {
	          if (hasOwnProperty.call(result, value)) {
	            result[value].push(key);
	          } else {
	            result[value] = [key];
	          }
	        }
	        else {
	          result[value] = key;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects. See the
	     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keys(new Foo);
	     * // => ['a', 'b'] (iteration order is not guaranteed)
	     *
	     * _.keys('hi');
	     * // => ['0', '1']
	     */
	    var keys = !nativeKeys ? shimKeys : function(object) {
	      var Ctor = object == null ? undefined : object.constructor;
	      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	          (typeof object != 'function' && isArrayLike(object))) {
	        return shimKeys(object);
	      }
	      return isObject(object) ? nativeKeys(object) : [];
	    };
	
	    /**
	     * Creates an array of the own and inherited enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keysIn(new Foo);
	     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	     */
	    function keysIn(object) {
	      if (object == null) {
	        return [];
	      }
	      if (!isObject(object)) {
	        object = Object(object);
	      }
	      var length = object.length;
	      length = (length && isLength(length) &&
	        (isArray(object) || isArguments(object)) && length) || 0;
	
	      var Ctor = object.constructor,
	          index = -1,
	          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	          result = Array(length),
	          skipIndexes = length > 0;
	
	      while (++index < length) {
	        result[index] = (index + '');
	      }
	      for (var key in object) {
	        if (!(skipIndexes && isIndex(key, length)) &&
	            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	          result.push(key);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The opposite of `_.mapValues`; this method creates an object with the
	     * same values as `object` and keys generated by running each own enumerable
	     * property of `object` through `iteratee`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   return key + value;
	     * });
	     * // => { 'a1': 1, 'b2': 2 }
	     */
	    var mapKeys = createObjectMapper(true);
	
	    /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through `iteratee`. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments:
	     * (value, key, object).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
	     *   return n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6 }
	     *
	     * var users = {
	     *   'fred':    { 'user': 'fred',    'age': 40 },
	     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using the `_.property` callback shorthand
	     * _.mapValues(users, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     */
	    var mapValues = createObjectMapper();
	
	    /**
	     * The opposite of `_.pick`; this method creates an object composed of the
	     * own and inherited enumerable properties of `object` that are not omitted.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to omit, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.omit(object, 'age');
	     * // => { 'user': 'fred' }
	     *
	     * _.omit(object, _.isNumber);
	     * // => { 'user': 'fred' }
	     */
	    var omit = restParam(function(object, props) {
	      if (object == null) {
	        return {};
	      }
	      if (typeof props[0] != 'function') {
	        var props = arrayMap(baseFlatten(props), String);
	        return pickByArray(object, baseDifference(keysIn(object), props));
	      }
	      var predicate = bindCallback(props[0], props[1], 3);
	      return pickByCallback(object, function(value, key, object) {
	        return !predicate(value, key, object);
	      });
	    });
	
	    /**
	     * Creates a two dimensional array of the key-value pairs for `object`,
	     * e.g. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	     */
	    function pairs(object) {
	      object = toObject(object);
	
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);
	
	      while (++index < length) {
	        var key = props[index];
	        result[index] = [key, object[key]];
	      }
	      return result;
	    }
	
	    /**
	     * Creates an object composed of the picked `object` properties. Property
	     * names may be specified as individual arguments or as arrays of property
	     * names. If `predicate` is provided it is invoked for each property of `object`
	     * picking the properties `predicate` returns truthy for. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.pick(object, 'user');
	     * // => { 'user': 'fred' }
	     *
	     * _.pick(object, _.isString);
	     * // => { 'user': 'fred' }
	     */
	    var pick = restParam(function(object, props) {
	      if (object == null) {
	        return {};
	      }
	      return typeof props[0] == 'function'
	        ? pickByCallback(object, bindCallback(props[0], props[1], 3))
	        : pickByArray(object, baseFlatten(props));
	    });
	
	    /**
	     * This method is like `_.get` except that if the resolved value is a function
	     * it is invoked with the `this` binding of its parent object and its result
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to resolve.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	     *
	     * _.result(object, 'a[0].b.c1');
	     * // => 3
	     *
	     * _.result(object, 'a[0].b.c2');
	     * // => 4
	     *
	     * _.result(object, 'a.b.c', 'default');
	     * // => 'default'
	     *
	     * _.result(object, 'a.b.c', _.constant('default'));
	     * // => 'default'
	     */
	    function result(object, path, defaultValue) {
	      var result = object == null ? undefined : object[path];
	      if (result === undefined) {
	        if (object != null && !isKey(path, object)) {
	          path = toPath(path);
	          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	          result = object == null ? undefined : object[last(path)];
	        }
	        result = result === undefined ? defaultValue : result;
	      }
	      return isFunction(result) ? result.call(object) : result;
	    }
	
	    /**
	     * Sets the property value of `path` on `object`. If a portion of `path`
	     * does not exist it is created.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to augment.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.set(object, 'a[0].b.c', 4);
	     * console.log(object.a[0].b.c);
	     * // => 4
	     *
	     * _.set(object, 'x[0].y.z', 5);
	     * console.log(object.x[0].y.z);
	     * // => 5
	     */
	    function set(object, path, value) {
	      if (object == null) {
	        return object;
	      }
	      var pathKey = (path + '');
	      path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);
	
	      var index = -1,
	          length = path.length,
	          lastIndex = length - 1,
	          nested = object;
	
	      while (nested != null && ++index < length) {
	        var key = path[index];
	        if (isObject(nested)) {
	          if (index == lastIndex) {
	            nested[key] = value;
	          } else if (nested[key] == null) {
	            nested[key] = isIndex(path[index + 1]) ? [] : {};
	          }
	        }
	        nested = nested[key];
	      }
	      return object;
	    }
	
	    /**
	     * An alternative to `_.reduce`; this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own enumerable
	     * properties through `iteratee`, with each invocation potentially mutating
	     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
	     * with four arguments: (accumulator, value, key, object). Iteratee functions
	     * may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.transform([2, 3, 4], function(result, n) {
	     *   result.push(n *= n);
	     *   return n % 2 == 0;
	     * });
	     * // => [4, 9]
	     *
	     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6 }
	     */
	    function transform(object, iteratee, accumulator, thisArg) {
	      var isArr = isArray(object) || isTypedArray(object);
	      iteratee = getCallback(iteratee, thisArg, 4);
	
	      if (accumulator == null) {
	        if (isArr || isObject(object)) {
	          var Ctor = object.constructor;
	          if (isArr) {
	            accumulator = isArray(object) ? new Ctor : [];
	          } else {
	            accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
	          }
	        } else {
	          accumulator = {};
	        }
	      }
	      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
	        return iteratee(accumulator, value, index, object);
	      });
	      return accumulator;
	    }
	
	    /**
	     * Creates an array of the own enumerable property values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.values(new Foo);
	     * // => [1, 2] (iteration order is not guaranteed)
	     *
	     * _.values('hi');
	     * // => ['h', 'i']
	     */
	    function values(object) {
	      return baseValues(object, keys(object));
	    }
	
	    /**
	     * Creates an array of the own and inherited enumerable property values
	     * of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.valuesIn(new Foo);
	     * // => [1, 2, 3] (iteration order is not guaranteed)
	     */
	    function valuesIn(object) {
	      return baseValues(object, keysIn(object));
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Checks if `n` is between `start` and up to but not including, `end`. If
	     * `end` is not specified it is set to `start` with `start` then set to `0`.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} n The number to check.
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
	     * @example
	     *
	     * _.inRange(3, 2, 4);
	     * // => true
	     *
	     * _.inRange(4, 8);
	     * // => true
	     *
	     * _.inRange(4, 2);
	     * // => false
	     *
	     * _.inRange(2, 2);
	     * // => false
	     *
	     * _.inRange(1.2, 2);
	     * // => true
	     *
	     * _.inRange(5.2, 4);
	     * // => false
	     */
	    function inRange(value, start, end) {
	      start = +start || 0;
	      if (end === undefined) {
	        end = start;
	        start = 0;
	      } else {
	        end = +end || 0;
	      }
	      return value >= nativeMin(start, end) && value < nativeMax(start, end);
	    }
	
	    /**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number is returned.
	     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
	     * number is returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating] Specify returning a floating-point number.
	     * @returns {number} Returns the random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
	    function random(min, max, floating) {
	      if (floating && isIterateeCall(min, max, floating)) {
	        max = floating = undefined;
	      }
	      var noMin = min == null,
	          noMax = max == null;
	
	      if (floating == null) {
	        if (noMax && typeof min == 'boolean') {
	          floating = min;
	          min = 1;
	        }
	        else if (typeof max == 'boolean') {
	          floating = max;
	          noMax = true;
	        }
	      }
	      if (noMin && noMax) {
	        max = 1;
	        noMax = false;
	      }
	      min = +min || 0;
	      if (noMax) {
	        max = min;
	        min = 0;
	      } else {
	        max = +max || 0;
	      }
	      if (floating || min % 1 || max % 1) {
	        var rand = nativeRandom();
	        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
	      }
	      return baseRandom(min, max);
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the camel cased string.
	     * @example
	     *
	     * _.camelCase('Foo Bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('--foo-bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('__foo_bar__');
	     * // => 'fooBar'
	     */
	    var camelCase = createCompounder(function(result, word, index) {
	      word = word.toLowerCase();
	      return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
	    });
	
	    /**
	     * Capitalizes the first character of `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to capitalize.
	     * @returns {string} Returns the capitalized string.
	     * @example
	     *
	     * _.capitalize('fred');
	     * // => 'Fred'
	     */
	    function capitalize(string) {
	      string = baseToString(string);
	      return string && (string.charAt(0).toUpperCase() + string.slice(1));
	    }
	
	    /**
	     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to deburr.
	     * @returns {string} Returns the deburred string.
	     * @example
	     *
	     * _.deburr('déjà vu');
	     * // => 'deja vu'
	     */
	    function deburr(string) {
	      string = baseToString(string);
	      return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
	    }
	
	    /**
	     * Checks if `string` ends with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=string.length] The position to search from.
	     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
	     * @example
	     *
	     * _.endsWith('abc', 'c');
	     * // => true
	     *
	     * _.endsWith('abc', 'b');
	     * // => false
	     *
	     * _.endsWith('abc', 'b', 2);
	     * // => true
	     */
	    function endsWith(string, target, position) {
	      string = baseToString(string);
	      target = (target + '');
	
	      var length = string.length;
	      position = position === undefined
	        ? length
	        : nativeMin(position < 0 ? 0 : (+position || 0), length);
	
	      position -= target.length;
	      return position >= 0 && string.indexOf(target, position) == position;
	    }
	
	    /**
	     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
	     * their corresponding HTML entities.
	     *
	     * **Note:** No other characters are escaped. To escape additional characters
	     * use a third-party library like [_he_](https://mths.be/he).
	     *
	     * Though the ">" character is escaped for symmetry, characters like
	     * ">" and "/" don't need escaping in HTML and have no special meaning
	     * unless they're part of a tag or unquoted attribute value.
	     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	     * (under "semi-related fun fact") for more details.
	     *
	     * Backticks are escaped because in Internet Explorer < 9, they can break out
	     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	     * for more details.
	     *
	     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	     * to reduce XSS vectors.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('fred, barney, & pebbles');
	     * // => 'fred, barney, &amp; pebbles'
	     */
	    function escape(string) {
	      // Reset `lastIndex` because in IE < 9 `String#replace` does not.
	      string = baseToString(string);
	      return (string && reHasUnescapedHtml.test(string))
	        ? string.replace(reUnescapedHtml, escapeHtmlChar)
	        : string;
	    }
	
	    /**
	     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escapeRegExp('[lodash](https://lodash.com/)');
	     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	     */
	    function escapeRegExp(string) {
	      string = baseToString(string);
	      return (string && reHasRegExpChars.test(string))
	        ? string.replace(reRegExpChars, escapeRegExpChar)
	        : (string || '(?:)');
	    }
	
	    /**
	     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the kebab cased string.
	     * @example
	     *
	     * _.kebabCase('Foo Bar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('fooBar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('__foo_bar__');
	     * // => 'foo-bar'
	     */
	    var kebabCase = createCompounder(function(result, word, index) {
	      return result + (index ? '-' : '') + word.toLowerCase();
	    });
	
	    /**
	     * Pads `string` on the left and right sides if it's shorter than `length`.
	     * Padding characters are truncated if they can't be evenly divided by `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.pad('abc', 8);
	     * // => '  abc   '
	     *
	     * _.pad('abc', 8, '_-');
	     * // => '_-abc_-_'
	     *
	     * _.pad('abc', 3);
	     * // => 'abc'
	     */
	    function pad(string, length, chars) {
	      string = baseToString(string);
	      length = +length;
	
	      var strLength = string.length;
	      if (strLength >= length || !nativeIsFinite(length)) {
	        return string;
	      }
	      var mid = (length - strLength) / 2,
	          leftLength = nativeFloor(mid),
	          rightLength = nativeCeil(mid);
	
	      chars = createPadding('', rightLength, chars);
	      return chars.slice(0, leftLength) + string + chars;
	    }
	
	    /**
	     * Pads `string` on the left side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padLeft('abc', 6);
	     * // => '   abc'
	     *
	     * _.padLeft('abc', 6, '_-');
	     * // => '_-_abc'
	     *
	     * _.padLeft('abc', 3);
	     * // => 'abc'
	     */
	    var padLeft = createPadDir();
	
	    /**
	     * Pads `string` on the right side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padRight('abc', 6);
	     * // => 'abc   '
	     *
	     * _.padRight('abc', 6, '_-');
	     * // => 'abc_-_'
	     *
	     * _.padRight('abc', 3);
	     * // => 'abc'
	     */
	    var padRight = createPadDir(true);
	
	    /**
	     * Converts `string` to an integer of the specified radix. If `radix` is
	     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
	     * in which case a `radix` of `16` is used.
	     *
	     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
	     * of `parseInt`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} string The string to convert.
	     * @param {number} [radix] The radix to interpret `value` by.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     *
	     * _.map(['6', '08', '10'], _.parseInt);
	     * // => [6, 8, 10]
	     */
	    function parseInt(string, radix, guard) {
	      // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
	      // Chrome fails to trim leading <BOM> whitespace characters.
	      // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
	      if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
	        radix = 0;
	      } else if (radix) {
	        radix = +radix;
	      }
	      string = trim(string);
	      return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
	    }
	
	    /**
	     * Repeats the given string `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to repeat.
	     * @param {number} [n=0] The number of times to repeat the string.
	     * @returns {string} Returns the repeated string.
	     * @example
	     *
	     * _.repeat('*', 3);
	     * // => '***'
	     *
	     * _.repeat('abc', 2);
	     * // => 'abcabc'
	     *
	     * _.repeat('abc', 0);
	     * // => ''
	     */
	    function repeat(string, n) {
	      var result = '';
	      string = baseToString(string);
	      n = +n;
	      if (n < 1 || !string || !nativeIsFinite(n)) {
	        return result;
	      }
	      // Leverage the exponentiation by squaring algorithm for a faster repeat.
	      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
	      do {
	        if (n % 2) {
	          result += string;
	        }
	        n = nativeFloor(n / 2);
	        string += string;
	      } while (n);
	
	      return result;
	    }
	
	    /**
	     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the snake cased string.
	     * @example
	     *
	     * _.snakeCase('Foo Bar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('fooBar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('--foo-bar');
	     * // => 'foo_bar'
	     */
	    var snakeCase = createCompounder(function(result, word, index) {
	      return result + (index ? '_' : '') + word.toLowerCase();
	    });
	
	    /**
	     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the start cased string.
	     * @example
	     *
	     * _.startCase('--foo-bar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('fooBar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('__foo_bar__');
	     * // => 'Foo Bar'
	     */
	    var startCase = createCompounder(function(result, word, index) {
	      return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
	    });
	
	    /**
	     * Checks if `string` starts with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=0] The position to search from.
	     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
	     * @example
	     *
	     * _.startsWith('abc', 'a');
	     * // => true
	     *
	     * _.startsWith('abc', 'b');
	     * // => false
	     *
	     * _.startsWith('abc', 'b', 1);
	     * // => true
	     */
	    function startsWith(string, target, position) {
	      string = baseToString(string);
	      position = position == null
	        ? 0
	        : nativeMin(position < 0 ? 0 : (+position || 0), string.length);
	
	      return string.lastIndexOf(target, position) == position;
	    }
	
	    /**
	     * Creates a compiled template function that can interpolate data properties
	     * in "interpolate" delimiters, HTML-escape interpolated data properties in
	     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	     * properties may be accessed as free variables in the template. If a setting
	     * object is provided it takes precedence over `_.templateSettings` values.
	     *
	     * **Note:** In the development build `_.template` utilizes
	     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	     * for easier debugging.
	     *
	     * For more information on precompiling templates see
	     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	     *
	     * For more information on Chrome extension sandboxes see
	     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The template string.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as free variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [options.variable] The data object variable name.
	     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
	     * @returns {Function} Returns the compiled template function.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= user %>!');
	     * compiled({ 'user': 'fred' });
	     * // => 'hello fred!'
	     *
	     * // using the HTML "escape" delimiter to escape data property values
	     * var compiled = _.template('<b><%- value %></b>');
	     * compiled({ 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
	     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * var compiled = _.template('<% print("hello " + user); %>!');
	     * compiled({ 'user': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
	     * var compiled = _.template('hello ${ user }!');
	     * compiled({ 'user': 'pebbles' });
	     * // => 'hello pebbles!'
	     *
	     * // using custom template delimiters
	     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	     * var compiled = _.template('hello {{ user }}!');
	     * compiled({ 'user': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using backslashes to treat delimiters as plain text
	     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	     * compiled({ 'value': 'ignored' });
	     * // => '<%- value %>'
	     *
	     * // using the `imports` option to import `jQuery` as `jq`
	     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     * //   var __t, __p = '';
	     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	     * //   return __p;
	     * // }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
	    function template(string, options, otherOptions) {
	      // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
	      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
	      var settings = lodash.templateSettings;
	
	      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
	        options = otherOptions = undefined;
	      }
	      string = baseToString(string);
	      options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);
	
	      var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
	          importsKeys = keys(imports),
	          importsValues = baseValues(imports, importsKeys);
	
	      var isEscaping,
	          isEvaluating,
	          index = 0,
	          interpolate = options.interpolate || reNoMatch,
	          source = "__p += '";
	
	      // Compile the regexp to match each delimiter.
	      var reDelimiters = RegExp(
	        (options.escape || reNoMatch).source + '|' +
	        interpolate.source + '|' +
	        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	        (options.evaluate || reNoMatch).source + '|$'
	      , 'g');
	
	      // Use a sourceURL for easier debugging.
	      var sourceURL = '//# sourceURL=' +
	        ('sourceURL' in options
	          ? options.sourceURL
	          : ('lodash.templateSources[' + (++templateCounter) + ']')
	        ) + '\n';
	
	      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	        interpolateValue || (interpolateValue = esTemplateValue);
	
	        // Escape characters that can't be included in string literals.
	        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
	
	        // Replace delimiters with snippets.
	        if (escapeValue) {
	          isEscaping = true;
	          source += "' +\n__e(" + escapeValue + ") +\n'";
	        }
	        if (evaluateValue) {
	          isEvaluating = true;
	          source += "';\n" + evaluateValue + ";\n__p += '";
	        }
	        if (interpolateValue) {
	          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	        }
	        index = offset + match.length;
	
	        // The JS engine embedded in Adobe products requires returning the `match`
	        // string in order to produce the correct `offset` value.
	        return match;
	      });
	
	      source += "';\n";
	
	      // If `variable` is not specified wrap a with-statement around the generated
	      // code to add the data object to the top of the scope chain.
	      var variable = options.variable;
	      if (!variable) {
	        source = 'with (obj) {\n' + source + '\n}\n';
	      }
	      // Cleanup code by stripping empty strings.
	      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	        .replace(reEmptyStringMiddle, '$1')
	        .replace(reEmptyStringTrailing, '$1;');
	
	      // Frame code as the function body.
	      source = 'function(' + (variable || 'obj') + ') {\n' +
	        (variable
	          ? ''
	          : 'obj || (obj = {});\n'
	        ) +
	        "var __t, __p = ''" +
	        (isEscaping
	           ? ', __e = _.escape'
	           : ''
	        ) +
	        (isEvaluating
	          ? ', __j = Array.prototype.join;\n' +
	            "function print() { __p += __j.call(arguments, '') }\n"
	          : ';\n'
	        ) +
	        source +
	        'return __p\n}';
	
	      var result = attempt(function() {
	        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
	      });
	
	      // Provide the compiled function's source by its `toString` method or
	      // the `source` property as a convenience for inlining compiled templates.
	      result.source = source;
	      if (isError(result)) {
	        throw result;
	      }
	      return result;
	    }
	
	    /**
	     * Removes leading and trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trim('  abc  ');
	     * // => 'abc'
	     *
	     * _.trim('-_-abc-_-', '_-');
	     * // => 'abc'
	     *
	     * _.map(['  foo  ', '  bar  '], _.trim);
	     * // => ['foo', 'bar']
	     */
	    function trim(string, chars, guard) {
	      var value = string;
	      string = baseToString(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
	      }
	      chars = (chars + '');
	      return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
	    }
	
	    /**
	     * Removes leading whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimLeft('  abc  ');
	     * // => 'abc  '
	     *
	     * _.trimLeft('-_-abc-_-', '_-');
	     * // => 'abc-_-'
	     */
	    function trimLeft(string, chars, guard) {
	      var value = string;
	      string = baseToString(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(trimmedLeftIndex(string));
	      }
	      return string.slice(charsLeftIndex(string, (chars + '')));
	    }
	
	    /**
	     * Removes trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimRight('  abc  ');
	     * // => '  abc'
	     *
	     * _.trimRight('-_-abc-_-', '_-');
	     * // => '-_-abc'
	     */
	    function trimRight(string, chars, guard) {
	      var value = string;
	      string = baseToString(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(0, trimmedRightIndex(string) + 1);
	      }
	      return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
	    }
	
	    /**
	     * Truncates `string` if it's longer than the given maximum string length.
	     * The last characters of the truncated string are replaced with the omission
	     * string which defaults to "...".
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to truncate.
	     * @param {Object|number} [options] The options object or maximum string length.
	     * @param {number} [options.length=30] The maximum string length.
	     * @param {string} [options.omission='...'] The string to indicate text is omitted.
	     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the truncated string.
	     * @example
	     *
	     * _.trunc('hi-diddly-ho there, neighborino');
	     * // => 'hi-diddly-ho there, neighbo...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', 24);
	     * // => 'hi-diddly-ho there, n...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': ' '
	     * });
	     * // => 'hi-diddly-ho there,...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': /,? +/
	     * });
	     * // => 'hi-diddly-ho there...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'omission': ' [...]'
	     * });
	     * // => 'hi-diddly-ho there, neig [...]'
	     */
	    function trunc(string, options, guard) {
	      if (guard && isIterateeCall(string, options, guard)) {
	        options = undefined;
	      }
	      var length = DEFAULT_TRUNC_LENGTH,
	          omission = DEFAULT_TRUNC_OMISSION;
	
	      if (options != null) {
	        if (isObject(options)) {
	          var separator = 'separator' in options ? options.separator : separator;
	          length = 'length' in options ? (+options.length || 0) : length;
	          omission = 'omission' in options ? baseToString(options.omission) : omission;
	        } else {
	          length = +options || 0;
	        }
	      }
	      string = baseToString(string);
	      if (length >= string.length) {
	        return string;
	      }
	      var end = length - omission.length;
	      if (end < 1) {
	        return omission;
	      }
	      var result = string.slice(0, end);
	      if (separator == null) {
	        return result + omission;
	      }
	      if (isRegExp(separator)) {
	        if (string.slice(end).search(separator)) {
	          var match,
	              newEnd,
	              substring = string.slice(0, end);
	
	          if (!separator.global) {
	            separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
	          }
	          separator.lastIndex = 0;
	          while ((match = separator.exec(substring))) {
	            newEnd = match.index;
	          }
	          result = result.slice(0, newEnd == null ? end : newEnd);
	        }
	      } else if (string.indexOf(separator, end) != end) {
	        var index = result.lastIndexOf(separator);
	        if (index > -1) {
	          result = result.slice(0, index);
	        }
	      }
	      return result + omission;
	    }
	
	    /**
	     * The inverse of `_.escape`; this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
	     * corresponding characters.
	     *
	     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
	     * entities use a third-party library like [_he_](https://mths.be/he).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('fred, barney, &amp; pebbles');
	     * // => 'fred, barney, & pebbles'
	     */
	    function unescape(string) {
	      string = baseToString(string);
	      return (string && reHasEscapedHtml.test(string))
	        ? string.replace(reEscapedHtml, unescapeHtmlChar)
	        : string;
	    }
	
	    /**
	     * Splits `string` into an array of its words.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {RegExp|string} [pattern] The pattern to match words.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the words of `string`.
	     * @example
	     *
	     * _.words('fred, barney, & pebbles');
	     * // => ['fred', 'barney', 'pebbles']
	     *
	     * _.words('fred, barney, & pebbles', /[^, ]+/g);
	     * // => ['fred', 'barney', '&', 'pebbles']
	     */
	    function words(string, pattern, guard) {
	      if (guard && isIterateeCall(string, pattern, guard)) {
	        pattern = undefined;
	      }
	      string = baseToString(string);
	      return string.match(pattern || reWords) || [];
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Attempts to invoke `func`, returning either the result or the caught error
	     * object. Any additional arguments are provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function} func The function to attempt.
	     * @returns {*} Returns the `func` result or error object.
	     * @example
	     *
	     * // avoid throwing errors for invalid selectors
	     * var elements = _.attempt(function(selector) {
	     *   return document.querySelectorAll(selector);
	     * }, '>_>');
	     *
	     * if (_.isError(elements)) {
	     *   elements = [];
	     * }
	     */
	    var attempt = restParam(function(func, args) {
	      try {
	        return func.apply(undefined, args);
	      } catch(e) {
	        return isError(e) ? e : new Error(e);
	      }
	    });
	
	    /**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and arguments of the created function. If `func` is a property name the
	     * created callback returns the property value for a given element. If `func`
	     * is an object the created callback returns `true` for elements that contain
	     * the equivalent object properties, otherwise it returns `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias iteratee
	     * @category Utility
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the callback.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
	     *   if (!match) {
	     *     return callback(func, thisArg);
	     *   }
	     *   return function(object) {
	     *     return match[2] == 'gt'
	     *       ? object[match[1]] > match[3]
	     *       : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(users, 'age__gt36');
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     */
	    function callback(func, thisArg, guard) {
	      if (guard && isIterateeCall(func, thisArg, guard)) {
	        thisArg = undefined;
	      }
	      return isObjectLike(func)
	        ? matches(func)
	        : baseCallback(func, thisArg);
	    }
	
	    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var getter = _.constant(object);
	     *
	     * getter() === object;
	     * // => true
	     */
	    function constant(value) {
	      return function() {
	        return value;
	      };
	    }
	
	    /**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.identity(object) === object;
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }
	
	    /**
	     * Creates a function that performs a deep comparison between a given object
	     * and `source`, returning `true` if the given object has equivalent property
	     * values, else `false`.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
	     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
	     */
	    function matches(source) {
	      return baseMatches(baseClone(source, true));
	    }
	
	    /**
	     * Creates a function that compares the property value of `path` on a given
	     * object to `value`.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * _.find(users, _.matchesProperty('user', 'fred'));
	     * // => { 'user': 'fred' }
	     */
	    function matchesProperty(path, srcValue) {
	      return baseMatchesProperty(path, baseClone(srcValue, true));
	    }
	
	    /**
	     * Creates a function that invokes the method at `path` on a given object.
	     * Any additional arguments are provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': _.constant(2) } } },
	     *   { 'a': { 'b': { 'c': _.constant(1) } } }
	     * ];
	     *
	     * _.map(objects, _.method('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */
	    var method = restParam(function(path, args) {
	      return function(object) {
	        return invokePath(object, path, args);
	      };
	    });
	
	    /**
	     * The opposite of `_.method`; this method creates a function that invokes
	     * the method at a given path on `object`. Any additional arguments are
	     * provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to query.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = _.times(3, _.constant),
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
	     * // => [2, 0]
	     */
	    var methodOf = restParam(function(object, args) {
	      return function(path) {
	        return invokePath(object, path, args);
	      };
	    });
	
	    /**
	     * Adds all own enumerable function properties of a source object to the
	     * destination object. If `object` is a function then methods are added to
	     * its prototype as well.
	     *
	     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	     * avoid conflicts caused by modifying the original.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function|Object} [object=lodash] The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added
	     *  are chainable.
	     * @returns {Function|Object} Returns `object`.
	     * @example
	     *
	     * function vowels(string) {
	     *   return _.filter(string, function(v) {
	     *     return /[aeiou]/i.test(v);
	     *   });
	     * }
	     *
	     * _.mixin({ 'vowels': vowels });
	     * _.vowels('fred');
	     * // => ['e']
	     *
	     * _('fred').vowels().value();
	     * // => ['e']
	     *
	     * _.mixin({ 'vowels': vowels }, { 'chain': false });
	     * _('fred').vowels();
	     * // => ['e']
	     */
	    function mixin(object, source, options) {
	      if (options == null) {
	        var isObj = isObject(source),
	            props = isObj ? keys(source) : undefined,
	            methodNames = (props && props.length) ? baseFunctions(source, props) : undefined;
	
	        if (!(methodNames ? methodNames.length : isObj)) {
	          methodNames = false;
	          options = source;
	          source = object;
	          object = this;
	        }
	      }
	      if (!methodNames) {
	        methodNames = baseFunctions(source, keys(source));
	      }
	      var chain = true,
	          index = -1,
	          isFunc = isFunction(object),
	          length = methodNames.length;
	
	      if (options === false) {
	        chain = false;
	      } else if (isObject(options) && 'chain' in options) {
	        chain = options.chain;
	      }
	      while (++index < length) {
	        var methodName = methodNames[index],
	            func = source[methodName];
	
	        object[methodName] = func;
	        if (isFunc) {
	          object.prototype[methodName] = (function(func) {
	            return function() {
	              var chainAll = this.__chain__;
	              if (chain || chainAll) {
	                var result = object(this.__wrapped__),
	                    actions = result.__actions__ = arrayCopy(this.__actions__);
	
	                actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
	                result.__chain__ = chainAll;
	                return result;
	              }
	              return func.apply(object, arrayPush([this.value()], arguments));
	            };
	          }(func));
	        }
	      }
	      return object;
	    }
	
	    /**
	     * Reverts the `_` variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
	    function noConflict() {
	      root._ = oldDash;
	      return this;
	    }
	
	    /**
	     * A no-operation function that returns `undefined` regardless of the
	     * arguments it receives.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.noop(object) === undefined;
	     * // => true
	     */
	    function noop() {
	      // No operation performed.
	    }
	
	    /**
	     * Creates a function that returns the property value at `path` on a
	     * given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': 2 } } },
	     *   { 'a': { 'b': { 'c': 1 } } }
	     * ];
	     *
	     * _.map(objects, _.property('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */
	    function property(path) {
	      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	    }
	
	    /**
	     * The opposite of `_.property`; this method creates a function that returns
	     * the property value at a given path on `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to query.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = [0, 1, 2],
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
	     * // => [2, 0]
	     */
	    function propertyOf(object) {
	      return function(path) {
	        return baseGet(object, toPath(path), path + '');
	      };
	    }
	
	    /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to, but not including, `end`. If `end` is not specified it is
	     * set to `start` with `start` then set to `0`. If `end` is less than `start`
	     * a zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns the new array of numbers.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */
	    function range(start, end, step) {
	      if (step && isIterateeCall(start, end, step)) {
	        end = step = undefined;
	      }
	      start = +start || 0;
	      step = step == null ? 1 : (+step || 0);
	
	      if (end == null) {
	        end = start;
	        start = 0;
	      } else {
	        end = +end || 0;
	      }
	      // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	      // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	      var index = -1,
	          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	          result = Array(length);
	
	      while (++index < length) {
	        result[index] = start;
	        start += step;
	      }
	      return result;
	    }
	
	    /**
	     * Invokes the iteratee function `n` times, returning an array of the results
	     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
	     * one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) {
	     *   mage.castSpell(n);
	     * });
	     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
	     *
	     * _.times(3, function(n) {
	     *   this.cast(n);
	     * }, mage);
	     * // => also invokes `mage.castSpell(n)` three times
	     */
	    function times(n, iteratee, thisArg) {
	      n = nativeFloor(n);
	
	      // Exit early to avoid a JSC JIT bug in Safari 8
	      // where `Array(0)` is treated as `Array(1)`.
	      if (n < 1 || !nativeIsFinite(n)) {
	        return [];
	      }
	      var index = -1,
	          result = Array(nativeMin(n, MAX_ARRAY_LENGTH));
	
	      iteratee = bindCallback(iteratee, thisArg, 1);
	      while (++index < n) {
	        if (index < MAX_ARRAY_LENGTH) {
	          result[index] = iteratee(index);
	        } else {
	          iteratee(index);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
	    function uniqueId(prefix) {
	      var id = ++idCounter;
	      return baseToString(prefix) + id;
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * Adds two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} augend The first number to add.
	     * @param {number} addend The second number to add.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.add(6, 4);
	     * // => 10
	     */
	    function add(augend, addend) {
	      return (+augend || 0) + (+addend || 0);
	    }
	
	    /**
	     * Calculates `n` rounded up to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round up.
	     * @param {number} [precision=0] The precision to round up to.
	     * @returns {number} Returns the rounded up number.
	     * @example
	     *
	     * _.ceil(4.006);
	     * // => 5
	     *
	     * _.ceil(6.004, 2);
	     * // => 6.01
	     *
	     * _.ceil(6040, -2);
	     * // => 6100
	     */
	    var ceil = createRound('ceil');
	
	    /**
	     * Calculates `n` rounded down to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round down.
	     * @param {number} [precision=0] The precision to round down to.
	     * @returns {number} Returns the rounded down number.
	     * @example
	     *
	     * _.floor(4.006);
	     * // => 4
	     *
	     * _.floor(0.046, 2);
	     * // => 0.04
	     *
	     * _.floor(4060, -2);
	     * // => 4000
	     */
	    var floor = createRound('floor');
	
	    /**
	     * Gets the maximum value of `collection`. If `collection` is empty or falsey
	     * `-Infinity` is returned. If an iteratee function is provided it is invoked
	     * for each value in `collection` to generate the criterion by which the value
	     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * _.max([]);
	     * // => -Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(users, function(chr) {
	     *   return chr.age;
	     * });
	     * // => { 'user': 'fred', 'age': 40 }
	     *
	     * // using the `_.property` callback shorthand
	     * _.max(users, 'age');
	     * // => { 'user': 'fred', 'age': 40 }
	     */
	    var max = createExtremum(gt, NEGATIVE_INFINITY);
	
	    /**
	     * Gets the minimum value of `collection`. If `collection` is empty or falsey
	     * `Infinity` is returned. If an iteratee function is provided it is invoked
	     * for each value in `collection` to generate the criterion by which the value
	     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * _.min([]);
	     * // => Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(users, function(chr) {
	     *   return chr.age;
	     * });
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // using the `_.property` callback shorthand
	     * _.min(users, 'age');
	     * // => { 'user': 'barney', 'age': 36 }
	     */
	    var min = createExtremum(lt, POSITIVE_INFINITY);
	
	    /**
	     * Calculates `n` rounded to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round.
	     * @param {number} [precision=0] The precision to round to.
	     * @returns {number} Returns the rounded number.
	     * @example
	     *
	     * _.round(4.006);
	     * // => 4
	     *
	     * _.round(4.006, 2);
	     * // => 4.01
	     *
	     * _.round(4060, -2);
	     * // => 4100
	     */
	    var round = createRound('round');
	
	    /**
	     * Gets the sum of the values in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.sum([4, 6]);
	     * // => 10
	     *
	     * _.sum({ 'a': 4, 'b': 6 });
	     * // => 10
	     *
	     * var objects = [
	     *   { 'n': 4 },
	     *   { 'n': 6 }
	     * ];
	     *
	     * _.sum(objects, function(object) {
	     *   return object.n;
	     * });
	     * // => 10
	     *
	     * // using the `_.property` callback shorthand
	     * _.sum(objects, 'n');
	     * // => 10
	     */
	    function sum(collection, iteratee, thisArg) {
	      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	        iteratee = undefined;
	      }
	      iteratee = getCallback(iteratee, thisArg, 3);
	      return iteratee.length == 1
	        ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee)
	        : baseSum(collection, iteratee);
	    }
	
	    /*------------------------------------------------------------------------*/
	
	    // Ensure wrappers are instances of `baseLodash`.
	    lodash.prototype = baseLodash.prototype;
	
	    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	    LodashWrapper.prototype.constructor = LodashWrapper;
	
	    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	    LazyWrapper.prototype.constructor = LazyWrapper;
	
	    // Add functions to the `Map` cache.
	    MapCache.prototype['delete'] = mapDelete;
	    MapCache.prototype.get = mapGet;
	    MapCache.prototype.has = mapHas;
	    MapCache.prototype.set = mapSet;
	
	    // Add functions to the `Set` cache.
	    SetCache.prototype.push = cachePush;
	
	    // Assign cache to `_.memoize`.
	    memoize.Cache = MapCache;
	
	    // Add functions that return wrapped values when chaining.
	    lodash.after = after;
	    lodash.ary = ary;
	    lodash.assign = assign;
	    lodash.at = at;
	    lodash.before = before;
	    lodash.bind = bind;
	    lodash.bindAll = bindAll;
	    lodash.bindKey = bindKey;
	    lodash.callback = callback;
	    lodash.chain = chain;
	    lodash.chunk = chunk;
	    lodash.compact = compact;
	    lodash.constant = constant;
	    lodash.countBy = countBy;
	    lodash.create = create;
	    lodash.curry = curry;
	    lodash.curryRight = curryRight;
	    lodash.debounce = debounce;
	    lodash.defaults = defaults;
	    lodash.defaultsDeep = defaultsDeep;
	    lodash.defer = defer;
	    lodash.delay = delay;
	    lodash.difference = difference;
	    lodash.drop = drop;
	    lodash.dropRight = dropRight;
	    lodash.dropRightWhile = dropRightWhile;
	    lodash.dropWhile = dropWhile;
	    lodash.fill = fill;
	    lodash.filter = filter;
	    lodash.flatten = flatten;
	    lodash.flattenDeep = flattenDeep;
	    lodash.flow = flow;
	    lodash.flowRight = flowRight;
	    lodash.forEach = forEach;
	    lodash.forEachRight = forEachRight;
	    lodash.forIn = forIn;
	    lodash.forInRight = forInRight;
	    lodash.forOwn = forOwn;
	    lodash.forOwnRight = forOwnRight;
	    lodash.functions = functions;
	    lodash.groupBy = groupBy;
	    lodash.indexBy = indexBy;
	    lodash.initial = initial;
	    lodash.intersection = intersection;
	    lodash.invert = invert;
	    lodash.invoke = invoke;
	    lodash.keys = keys;
	    lodash.keysIn = keysIn;
	    lodash.map = map;
	    lodash.mapKeys = mapKeys;
	    lodash.mapValues = mapValues;
	    lodash.matches = matches;
	    lodash.matchesProperty = matchesProperty;
	    lodash.memoize = memoize;
	    lodash.merge = merge;
	    lodash.method = method;
	    lodash.methodOf = methodOf;
	    lodash.mixin = mixin;
	    lodash.modArgs = modArgs;
	    lodash.negate = negate;
	    lodash.omit = omit;
	    lodash.once = once;
	    lodash.pairs = pairs;
	    lodash.partial = partial;
	    lodash.partialRight = partialRight;
	    lodash.partition = partition;
	    lodash.pick = pick;
	    lodash.pluck = pluck;
	    lodash.property = property;
	    lodash.propertyOf = propertyOf;
	    lodash.pull = pull;
	    lodash.pullAt = pullAt;
	    lodash.range = range;
	    lodash.rearg = rearg;
	    lodash.reject = reject;
	    lodash.remove = remove;
	    lodash.rest = rest;
	    lodash.restParam = restParam;
	    lodash.set = set;
	    lodash.shuffle = shuffle;
	    lodash.slice = slice;
	    lodash.sortBy = sortBy;
	    lodash.sortByAll = sortByAll;
	    lodash.sortByOrder = sortByOrder;
	    lodash.spread = spread;
	    lodash.take = take;
	    lodash.takeRight = takeRight;
	    lodash.takeRightWhile = takeRightWhile;
	    lodash.takeWhile = takeWhile;
	    lodash.tap = tap;
	    lodash.throttle = throttle;
	    lodash.thru = thru;
	    lodash.times = times;
	    lodash.toArray = toArray;
	    lodash.toPlainObject = toPlainObject;
	    lodash.transform = transform;
	    lodash.union = union;
	    lodash.uniq = uniq;
	    lodash.unzip = unzip;
	    lodash.unzipWith = unzipWith;
	    lodash.values = values;
	    lodash.valuesIn = valuesIn;
	    lodash.where = where;
	    lodash.without = without;
	    lodash.wrap = wrap;
	    lodash.xor = xor;
	    lodash.zip = zip;
	    lodash.zipObject = zipObject;
	    lodash.zipWith = zipWith;
	
	    // Add aliases.
	    lodash.backflow = flowRight;
	    lodash.collect = map;
	    lodash.compose = flowRight;
	    lodash.each = forEach;
	    lodash.eachRight = forEachRight;
	    lodash.extend = assign;
	    lodash.iteratee = callback;
	    lodash.methods = functions;
	    lodash.object = zipObject;
	    lodash.select = filter;
	    lodash.tail = rest;
	    lodash.unique = uniq;
	
	    // Add functions to `lodash.prototype`.
	    mixin(lodash, lodash);
	
	    /*------------------------------------------------------------------------*/
	
	    // Add functions that return unwrapped values when chaining.
	    lodash.add = add;
	    lodash.attempt = attempt;
	    lodash.camelCase = camelCase;
	    lodash.capitalize = capitalize;
	    lodash.ceil = ceil;
	    lodash.clone = clone;
	    lodash.cloneDeep = cloneDeep;
	    lodash.deburr = deburr;
	    lodash.endsWith = endsWith;
	    lodash.escape = escape;
	    lodash.escapeRegExp = escapeRegExp;
	    lodash.every = every;
	    lodash.find = find;
	    lodash.findIndex = findIndex;
	    lodash.findKey = findKey;
	    lodash.findLast = findLast;
	    lodash.findLastIndex = findLastIndex;
	    lodash.findLastKey = findLastKey;
	    lodash.findWhere = findWhere;
	    lodash.first = first;
	    lodash.floor = floor;
	    lodash.get = get;
	    lodash.gt = gt;
	    lodash.gte = gte;
	    lodash.has = has;
	    lodash.identity = identity;
	    lodash.includes = includes;
	    lodash.indexOf = indexOf;
	    lodash.inRange = inRange;
	    lodash.isArguments = isArguments;
	    lodash.isArray = isArray;
	    lodash.isBoolean = isBoolean;
	    lodash.isDate = isDate;
	    lodash.isElement = isElement;
	    lodash.isEmpty = isEmpty;
	    lodash.isEqual = isEqual;
	    lodash.isError = isError;
	    lodash.isFinite = isFinite;
	    lodash.isFunction = isFunction;
	    lodash.isMatch = isMatch;
	    lodash.isNaN = isNaN;
	    lodash.isNative = isNative;
	    lodash.isNull = isNull;
	    lodash.isNumber = isNumber;
	    lodash.isObject = isObject;
	    lodash.isPlainObject = isPlainObject;
	    lodash.isRegExp = isRegExp;
	    lodash.isString = isString;
	    lodash.isTypedArray = isTypedArray;
	    lodash.isUndefined = isUndefined;
	    lodash.kebabCase = kebabCase;
	    lodash.last = last;
	    lodash.lastIndexOf = lastIndexOf;
	    lodash.lt = lt;
	    lodash.lte = lte;
	    lodash.max = max;
	    lodash.min = min;
	    lodash.noConflict = noConflict;
	    lodash.noop = noop;
	    lodash.now = now;
	    lodash.pad = pad;
	    lodash.padLeft = padLeft;
	    lodash.padRight = padRight;
	    lodash.parseInt = parseInt;
	    lodash.random = random;
	    lodash.reduce = reduce;
	    lodash.reduceRight = reduceRight;
	    lodash.repeat = repeat;
	    lodash.result = result;
	    lodash.round = round;
	    lodash.runInContext = runInContext;
	    lodash.size = size;
	    lodash.snakeCase = snakeCase;
	    lodash.some = some;
	    lodash.sortedIndex = sortedIndex;
	    lodash.sortedLastIndex = sortedLastIndex;
	    lodash.startCase = startCase;
	    lodash.startsWith = startsWith;
	    lodash.sum = sum;
	    lodash.template = template;
	    lodash.trim = trim;
	    lodash.trimLeft = trimLeft;
	    lodash.trimRight = trimRight;
	    lodash.trunc = trunc;
	    lodash.unescape = unescape;
	    lodash.uniqueId = uniqueId;
	    lodash.words = words;
	
	    // Add aliases.
	    lodash.all = every;
	    lodash.any = some;
	    lodash.contains = includes;
	    lodash.eq = isEqual;
	    lodash.detect = find;
	    lodash.foldl = reduce;
	    lodash.foldr = reduceRight;
	    lodash.head = first;
	    lodash.include = includes;
	    lodash.inject = reduce;
	
	    mixin(lodash, (function() {
	      var source = {};
	      baseForOwn(lodash, function(func, methodName) {
	        if (!lodash.prototype[methodName]) {
	          source[methodName] = func;
	        }
	      });
	      return source;
	    }()), false);
	
	    /*------------------------------------------------------------------------*/
	
	    // Add functions capable of returning wrapped and unwrapped values when chaining.
	    lodash.sample = sample;
	
	    lodash.prototype.sample = function(n) {
	      if (!this.__chain__ && n == null) {
	        return sample(this.value());
	      }
	      return this.thru(function(value) {
	        return sample(value, n);
	      });
	    };
	
	    /*------------------------------------------------------------------------*/
	
	    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */
	    lodash.VERSION = VERSION;
	
	    // Assign default placeholders.
	    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
	      lodash[methodName].placeholder = lodash;
	    });
	
	    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
	    arrayEach(['drop', 'take'], function(methodName, index) {
	      LazyWrapper.prototype[methodName] = function(n) {
	        var filtered = this.__filtered__;
	        if (filtered && !index) {
	          return new LazyWrapper(this);
	        }
	        n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);
	
	        var result = this.clone();
	        if (filtered) {
	          result.__takeCount__ = nativeMin(result.__takeCount__, n);
	        } else {
	          result.__views__.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
	        }
	        return result;
	      };
	
	      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
	        return this.reverse()[methodName](n).reverse();
	      };
	    });
	
	    // Add `LazyWrapper` methods that accept an `iteratee` value.
	    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
	      var type = index + 1,
	          isFilter = type != LAZY_MAP_FLAG;
	
	      LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
	        var result = this.clone();
	        result.__iteratees__.push({ 'iteratee': getCallback(iteratee, thisArg, 1), 'type': type });
	        result.__filtered__ = result.__filtered__ || isFilter;
	        return result;
	      };
	    });
	
	    // Add `LazyWrapper` methods for `_.first` and `_.last`.
	    arrayEach(['first', 'last'], function(methodName, index) {
	      var takeName = 'take' + (index ? 'Right' : '');
	
	      LazyWrapper.prototype[methodName] = function() {
	        return this[takeName](1).value()[0];
	      };
	    });
	
	    // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
	    arrayEach(['initial', 'rest'], function(methodName, index) {
	      var dropName = 'drop' + (index ? '' : 'Right');
	
	      LazyWrapper.prototype[methodName] = function() {
	        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
	      };
	    });
	
	    // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
	    arrayEach(['pluck', 'where'], function(methodName, index) {
	      var operationName = index ? 'filter' : 'map',
	          createCallback = index ? baseMatches : property;
	
	      LazyWrapper.prototype[methodName] = function(value) {
	        return this[operationName](createCallback(value));
	      };
	    });
	
	    LazyWrapper.prototype.compact = function() {
	      return this.filter(identity);
	    };
	
	    LazyWrapper.prototype.reject = function(predicate, thisArg) {
	      predicate = getCallback(predicate, thisArg, 1);
	      return this.filter(function(value) {
	        return !predicate(value);
	      });
	    };
	
	    LazyWrapper.prototype.slice = function(start, end) {
	      start = start == null ? 0 : (+start || 0);
	
	      var result = this;
	      if (result.__filtered__ && (start > 0 || end < 0)) {
	        return new LazyWrapper(result);
	      }
	      if (start < 0) {
	        result = result.takeRight(-start);
	      } else if (start) {
	        result = result.drop(start);
	      }
	      if (end !== undefined) {
	        end = (+end || 0);
	        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
	      }
	      return result;
	    };
	
	    LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
	      return this.reverse().takeWhile(predicate, thisArg).reverse();
	    };
	
	    LazyWrapper.prototype.toArray = function() {
	      return this.take(POSITIVE_INFINITY);
	    };
	
	    // Add `LazyWrapper` methods to `lodash.prototype`.
	    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
	      var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
	          retUnwrapped = /^(?:first|last)$/.test(methodName),
	          lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];
	
	      if (!lodashFunc) {
	        return;
	      }
	      lodash.prototype[methodName] = function() {
	        var args = retUnwrapped ? [1] : arguments,
	            chainAll = this.__chain__,
	            value = this.__wrapped__,
	            isHybrid = !!this.__actions__.length,
	            isLazy = value instanceof LazyWrapper,
	            iteratee = args[0],
	            useLazy = isLazy || isArray(value);
	
	        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
	          // Avoid lazy use if the iteratee has a "length" value other than `1`.
	          isLazy = useLazy = false;
	        }
	        var interceptor = function(value) {
	          return (retUnwrapped && chainAll)
	            ? lodashFunc(value, 1)[0]
	            : lodashFunc.apply(undefined, arrayPush([value], args));
	        };
	
	        var action = { 'func': thru, 'args': [interceptor], 'thisArg': undefined },
	            onlyLazy = isLazy && !isHybrid;
	
	        if (retUnwrapped && !chainAll) {
	          if (onlyLazy) {
	            value = value.clone();
	            value.__actions__.push(action);
	            return func.call(value);
	          }
	          return lodashFunc.call(undefined, this.value())[0];
	        }
	        if (!retUnwrapped && useLazy) {
	          value = onlyLazy ? value : new LazyWrapper(this);
	          var result = func.apply(value, args);
	          result.__actions__.push(action);
	          return new LodashWrapper(result, chainAll);
	        }
	        return this.thru(interceptor);
	      };
	    });
	
	    // Add `Array` and `String` methods to `lodash.prototype`.
	    arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
	      var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
	          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
	          retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);
	
	      lodash.prototype[methodName] = function() {
	        var args = arguments;
	        if (retUnwrapped && !this.__chain__) {
	          return func.apply(this.value(), args);
	        }
	        return this[chainName](function(value) {
	          return func.apply(value, args);
	        });
	      };
	    });
	
	    // Map minified function names to their real names.
	    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
	      var lodashFunc = lodash[methodName];
	      if (lodashFunc) {
	        var key = lodashFunc.name,
	            names = realNames[key] || (realNames[key] = []);
	
	        names.push({ 'name': methodName, 'func': lodashFunc });
	      }
	    });
	
	    realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': undefined }];
	
	    // Add functions to the lazy wrapper.
	    LazyWrapper.prototype.clone = lazyClone;
	    LazyWrapper.prototype.reverse = lazyReverse;
	    LazyWrapper.prototype.value = lazyValue;
	
	    // Add chaining functions to the `lodash` wrapper.
	    lodash.prototype.chain = wrapperChain;
	    lodash.prototype.commit = wrapperCommit;
	    lodash.prototype.concat = wrapperConcat;
	    lodash.prototype.plant = wrapperPlant;
	    lodash.prototype.reverse = wrapperReverse;
	    lodash.prototype.toString = wrapperToString;
	    lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
	
	    // Add function aliases to the `lodash` wrapper.
	    lodash.prototype.collect = lodash.prototype.map;
	    lodash.prototype.head = lodash.prototype.first;
	    lodash.prototype.select = lodash.prototype.filter;
	    lodash.prototype.tail = lodash.prototype.rest;
	
	    return lodash;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  // Export lodash.
	  var _ = runInContext();
	
	  // Some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Expose lodash to the global object when an AMD loader is present to avoid
	    // errors in cases where lodash is loaded by a script tag and not intended
	    // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
	    // more details.
	    root._ = _;
	
	    // Define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
	  else if (freeExports && freeModule) {
	    // Export for Node.js or RingoJS.
	    if (moduleExports) {
	      (freeModule.exports = _)._ = _;
	    }
	    // Export for Rhino with CommonJS support.
	    else {
	      freeExports._ = _;
	    }
	  }
	  else {
	    // Export for a browser or Rhino.
	    root._ = _;
	  }
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module), (function() { return this; }())))

/***/ },

/***/ "./node_modules/jscodeshift/dist/collections/index.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2015-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	module.exports = {
	  Node: __webpack_require__("./node_modules/jscodeshift/dist/collections/Node.js"),
	  JSXElement: __webpack_require__("./node_modules/jscodeshift/dist/collections/JSXElement.js"),
	  VariableDeclarator: __webpack_require__("./node_modules/jscodeshift/dist/collections/VariableDeclarator.js")
	};

/***/ },

/***/ "./node_modules/jscodeshift/dist/collections/Node.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2015-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _toConsumableArray = __webpack_require__("./node_modules/babel-runtime/helpers/to-consumable-array.js")['default'];
	
	var _ = __webpack_require__("./node_modules/lodash/index.js");
	var Collection = __webpack_require__("./node_modules/jscodeshift/dist/Collection.js");
	
	var matchNode = __webpack_require__("./node_modules/jscodeshift/dist/matchNode.js");
	var recast = __webpack_require__("./node_modules/recast/main.js");
	
	var Node = recast.types.namedTypes.Node;
	var types = recast.types.namedTypes;
	
	var traversalMethods = {
	
	  /**
	   * Find nodes of a specific type within the nodes of this collection.
	   *
	   * @param {type}
	   * @param {filter}
	   * @return {Collection}
	   */
	  find: function find(type, filter) {
	    var paths = [];
	    var visitorMethodName = 'visit' + type;
	
	    var visitor = {};
	    function visit(path) {
	      /*jshint validthis:true */
	      if (!filter || matchNode(path.value, filter)) {
	        paths.push(path);
	      }
	      this.traverse(path);
	    }
	    this.__paths.forEach(function (p, i) {
	      var self = this;
	      visitor[visitorMethodName] = function (path) {
	        if (self.__paths[i] === path) {
	          this.traverse(path);
	        } else {
	          return visit.call(this, path);
	        }
	      };
	      recast.visit(p, visitor);
	    }, this);
	
	    return Collection.fromPaths(paths, this, type);
	  },
	
	  /**
	   * Returns a collection containing the paths that create the scope of the
	   * currently selected paths. Dedupes the paths.
	   *
	   * @return {Collection}
	   */
	  closestScope: function closestScope() {
	    return this.map(function (path) {
	      return path.scope && path.scope.path;
	    });
	  },
	
	  /**
	   * Traverse the AST up and finds the closest node of the provided type.
	   *
	   * @param {Collection}
	   * @param {filter}
	   * @return {Collection}
	   */
	  closest: function closest(type, filter) {
	    return this.map(function (path) {
	      var parent = path.parent;
	      while (parent && !(type.check(parent.value) && (!filter || matchNode(parent.value, filter)))) {
	        parent = parent.parent;
	      }
	      return parent || null;
	    });
	  },
	
	  /**
	   * Finds the declaration for each selected path. Useful for member expressions
	   * or JSXElements. Expects a callback function that maps each path to the name
	   * to look for.
	   *
	   * If the callback returns a falsey value, the element is skipped.
	   *
	   * @param {function} nameGetter
	   *
	   * @return {Collection}
	   */
	  getVariableDeclarators: function getVariableDeclarators(nameGetter) {
	    return this.map(function (path) {
	      /*jshint curly:false*/
	      var scope = path.scope;
	      if (!scope) return;
	      var name = nameGetter.apply(path, arguments);
	      if (!name) return;
	      scope = scope.lookup(name);
	      if (!scope) return;
	      var bindings = scope.getBindings()[name];
	      if (!bindings) return;
	      var decl = Collection.fromPaths(bindings).closest(types.VariableDeclarator);
	      if (decl.size() === 1) {
	        return decl.paths()[0];
	      }
	    }, types.VariableDeclarator);
	  }
	};
	
	function toArray(value) {
	  return Array.isArray(value) ? value : [value];
	}
	
	var mutationMethods = {
	  /**
	   * Simply replaces the selected nodes with the provided node. If a function
	   * is provided it is executed for every node and the node is replaced with the
	   * functions return value.
	   *
	   * @param {Node|Array<Node>|function} nodes
	   * @return {Collection}
	   */
	  replaceWith: function replaceWith(nodes) {
	    return this.forEach(function (path, i) {
	      var newNodes = typeof nodes === 'function' ? nodes.call(path, path, i) : nodes;
	      path.replace.apply(path, _toConsumableArray(toArray(newNodes)));
	    });
	  },
	
	  /**
	   * Inserts a new node before the current one.
	   *
	   * @param {Node|Array<Node>|function} insert
	   * @return {Collection}
	   */
	  insertBefore: function insertBefore(insert) {
	    return this.forEach(function (path, i) {
	      var newNodes = typeof insert === 'function' ? insert.call(path, path, i) : insert;
	      path.insertBefore.apply(path, _toConsumableArray(toArray(newNodes)));
	    });
	  },
	
	  /**
	   * Inserts a new node after the current one.
	   *
	   * @param {Node|Array<Node>|function} insert
	   * @return {Collection}
	   */
	  insertAfter: function insertAfter(insert) {
	    return this.forEach(function (path, i) {
	      var newNodes = typeof insert === 'function' ? insert.call(path, path, i) : insert;
	      path.insertAfter.apply(path, _toConsumableArray(toArray(newNodes)));
	    });
	  },
	
	  remove: function remove() {
	    return this.forEach(function (path) {
	      return path.prune();
	    });
	  }
	
	};
	
	function register() {
	  Collection.registerMethods(traversalMethods, Node);
	  Collection.registerMethods(mutationMethods, Node);
	  Collection.setDefaultCollectionType(Node);
	}
	
	exports.register = _.once(register);

/***/ },

/***/ "./node_modules/jscodeshift/dist/matchNode.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2015-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	var hasOwn = Object.prototype.hasOwnProperty.call.bind(Object.prototype.hasOwnProperty);
	
	/**
	 * Checks whether needle is a strict subset of haystack.
	 *
	 * @param {*} haystack Value to test.
	 * @param {*} needle Test function or value to look for in `haystack`.
	 * @return {bool}
	 */
	function matchNode(haystack, needle) {
	  if (typeof needle === 'function') {
	    return needle(haystack);
	  }
	  if (isNode(needle) && isNode(haystack)) {
	    return _Object$keys(needle).every(function (property) {
	      return hasOwn(haystack, property) && matchNode(haystack[property], needle[property]);
	    });
	  }
	  return haystack === needle;
	}
	
	function isNode(value) {
	  return typeof value === 'object' && value;
	}
	
	module.exports = matchNode;

/***/ },

/***/ "./node_modules/jscodeshift/dist/collections/JSXElement.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2015-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	var _Object$create = __webpack_require__("./node_modules/babel-runtime/core-js/object/create.js")['default'];
	
	var _ = __webpack_require__("./node_modules/lodash/index.js");
	var Collection = __webpack_require__("./node_modules/jscodeshift/dist/Collection.js");
	var NodeCollection = __webpack_require__("./node_modules/jscodeshift/dist/collections/Node.js");
	
	var assert = __webpack_require__("./node_modules/assert/assert.js");
	var recast = __webpack_require__("./node_modules/recast/main.js");
	var requiresModule = __webpack_require__("./node_modules/jscodeshift/dist/collections/VariableDeclarator.js").filters.requiresModule;
	
	var types = recast.types.namedTypes;
	var JSXElement = types.JSXElement;
	var JSXAttribute = types.JSXAttribute;
	var Literal = types.Literal;
	
	/**
	 * Contains filter methods and mutation methods for processing JSXElements.
	 */
	var globalMethods = {
	  /**
	   * Finds all JSXElements optionally filtered by name
	   *
	   * @param {string} name
	   * @return {Collection}
	   */
	  findJSXElements: function findJSXElements(name) {
	    var nameFilter = name && { openingElement: { name: { name: name } } };
	    return this.find(JSXElement, nameFilter);
	  },
	
	  /**
	   * Finds all JSXElements by module name. Given
	   *
	   *     var Bar = require('Foo');
	   *     <Bar />
	   *
	   * findJSXElementsByModuleName('Foo') will find <Bar />, without having to
	   * know the variable name.
	   */
	  findJSXElementsByModuleName: function findJSXElementsByModuleName(moduleName) {
	    assert.ok(moduleName && typeof moduleName === 'string', 'findJSXElementsByModuleName(...) needs a name to look for');
	
	    return this.find(types.VariableDeclarator).filter(requiresModule(moduleName)).map(function (path) {
	      var id = path.value.id.name;
	      if (id) {
	        return Collection.fromPaths([path]).closestScope().findJSXElements(id).paths();
	      }
	    });
	  }
	};
	
	var filterMethods = {
	
	  /**
	   * Filter method for attributes.
	   *
	   * @param {Object} attributeFilter
	   * @return {function}
	   */
	  hasAttributes: function hasAttributes(attributeFilter) {
	    var attributeNames = _Object$keys(attributeFilter);
	    return function filter(path) {
	      if (!JSXElement.check(path.value)) {
	        return false;
	      }
	      var elementAttributes = _Object$create(null);
	      path.value.openingElement.attributes.forEach(function (attr) {
	        if (!JSXAttribute.check(attr) || !(attr.name.name in attributeFilter)) {
	          return;
	        }
	        elementAttributes[attr.name.name] = attr;
	      });
	
	      return attributeNames.every(function (name) {
	        if (!(name in elementAttributes)) {
	          return false;
	        }
	        var value = elementAttributes[name].value;
	        var expected = attributeFilter[name];
	        var actual = Literal.check(value) ? value.value : value.expression;
	        if (typeof expected === 'function') {
	          return expected(actual);
	        } else {
	          // Literal attribute values are always strings
	          return String(expected) === actual;
	        }
	      });
	    };
	  },
	
	  /**
	   * Filter elements which contain a specific child type
	   *
	   * @param {string} name
	   * @return {function}
	   */
	  hasChildren: function hasChildren(name) {
	    return function filter(path) {
	      return JSXElement.check(path.value) && path.value.children.some(function (child) {
	        return JSXElement.check(child) && child.openingElement.name.name === name;
	      });
	    };
	  }
	};
	
	var traversalMethods = {
	
	  /**
	   * Returns all child nodes, including literals and expressions.
	   *
	   * @return {Collection}
	   */
	  childNodes: function childNodes() {
	    var paths = [];
	    this.forEach(function (path) {
	      var children = path.get('children');
	      var l = children.value.length;
	      for (var i = 0; i < l; i++) {
	        paths.push(children.get(i));
	      }
	    });
	    return Collection.fromPaths(paths, this);
	  },
	
	  /**
	   * Returns all children that are JSXElements.
	   *
	   * @return {JSXElementCollection}
	   */
	  childElements: function childElements() {
	    var paths = [];
	    this.forEach(function (path) {
	      var children = path.get('children');
	      var l = children.value.length;
	      for (var i = 0; i < l; i++) {
	        if (types.JSXElement.check(children.value[i])) {
	          paths.push(children.get(i));
	        }
	      }
	    });
	    return Collection.fromPaths(paths, this, JSXElement);
	  }
	};
	
	var mappingMethods = {
	  /**
	   * Given a JSXElement, returns its "root" name. E.g. it would return "Foo" for
	   * both <Foo /> and <Foo.Bar />.
	   *
	   * @param {NodePath} path
	   * @return {string}
	   */
	  getRootName: function getRootName(path) {
	    var name = path.value.openingElement.name;
	    while (types.JSXMemberExpression.check(name)) {
	      name = name.object;
	    }
	
	    return name && name.name || null;
	  }
	};
	
	function register() {
	  NodeCollection.register();
	  Collection.registerMethods(globalMethods, types.Node);
	  Collection.registerMethods(traversalMethods, JSXElement);
	}
	
	exports.register = _.once(register);
	exports.filters = filterMethods;
	exports.mappings = mappingMethods;

/***/ },

/***/ "./node_modules/jscodeshift/dist/collections/VariableDeclarator.js":
/***/ function(module, exports, __webpack_require__) {

	/*
	 *  Copyright (c) 2015-present, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	var _ = __webpack_require__("./node_modules/lodash/index.js");
	var Collection = __webpack_require__("./node_modules/jscodeshift/dist/Collection.js");
	var NodeCollection = __webpack_require__("./node_modules/jscodeshift/dist/collections/Node.js");
	var matchNode = __webpack_require__("./node_modules/jscodeshift/dist/matchNode.js");
	var recast = __webpack_require__("./node_modules/recast/main.js");
	
	var astNodesAreEquivalent = recast.types.astNodesAreEquivalent;
	var b = recast.types.builders;
	var types = recast.types.namedTypes;
	
	var VariableDeclarator = recast.types.namedTypes.VariableDeclarator;
	
	var globalMethods = {
	  /**
	   * Finds all variable declarators, optionally filtered by name.
	   *
	   * @param {string} name
	   * @return {Collection}
	   */
	  findVariableDeclarators: function findVariableDeclarators(name) {
	    var filter = name ? { id: { name: name } } : null;
	    return this.find(VariableDeclarator, filter);
	  }
	};
	
	var filterMethods = {
	  /**
	   * Returns a function that returns true if the provided path is a variable
	   * declarator and requires one of the specified module names.
	   *
	   * @param {string|Array} names A module name or an array of module names
	   * @return {Function}
	   */
	  requiresModule: function requiresModule(names) {
	    if (names && !Array.isArray(names)) {
	      names = [names];
	    }
	    var requireIdentifier = b.identifier('require');
	    return function (path) {
	      var node = path.value;
	      if (!VariableDeclarator.check(node) || !types.CallExpression.check(node.init) || !astNodesAreEquivalent(node.init.callee, requireIdentifier)) {
	        return false;
	      }
	      return !names || names.some(function (n) {
	        return astNodesAreEquivalent(node.init.arguments[0], b.literal(n));
	      });
	    };
	  }
	};
	
	var transformMethods = {
	  /**
	   * Renames a variable and all its occurrences.
	   *
	   * @param {string} newName
	   * @return {Collection}
	   */
	  renameTo: function renameTo(newName) {
	    // TODO: Include JSXElements
	    return this.forEach(function (path) {
	      var node = path.value;
	      var oldName = node.id.name;
	      var rootScope = path.scope;
	      var rootPath = rootScope.path;
	      Collection.fromPaths([rootPath]).find(types.Identifier, { name: oldName }).filter(function (path) {
	        // ignore properties in MemberExpressions
	        var parent = path.parent.node;
	        return !types.MemberExpression.check(parent) || parent.property !== path.node || !parent.computed;
	      }).forEach(function (path) {
	        var scope = path.scope;
	        while (scope && scope !== rootScope) {
	          if (scope.declares(oldName)) {
	            return;
	          }
	          scope = scope.parent;
	        }
	        if (scope) {
	          // identifier must refer to declared variable
	          path.get('name').replace(newName);
	        }
	      });
	    });
	  }
	};
	
	function register() {
	  NodeCollection.register();
	  Collection.registerMethods(globalMethods);
	  Collection.registerMethods(transformMethods, VariableDeclarator);
	}
	
	exports.register = _.once(register);
	exports.filters = filterMethods;

/***/ },

/***/ "./node_modules/ast-types/lib/scope.js":
/***/ function(module, exports, __webpack_require__) {

	var types = __webpack_require__("./node_modules/ast-types/lib/types.js");
	var Type = types.Type;
	var namedTypes = types.namedTypes;
	var Node = namedTypes.Node;
	var Expression = namedTypes.Expression;
	var isArray = types.builtInTypes.array;
	var hasOwn = Object.prototype.hasOwnProperty;
	var b = types.builders;
	
	function Scope(path, parentScope) {
	    if (!(this instanceof Scope)) {
	        throw new Error("Scope constructor cannot be invoked without 'new'");
	    }
	    if (!(path instanceof __webpack_require__("./node_modules/ast-types/lib/node-path.js"))) {
	        throw new Error("");
	    }
	    ScopeType.assert(path.value);
	
	    var depth;
	
	    if (parentScope) {
	        if (!(parentScope instanceof Scope)) {
	            throw new Error("");
	        }
	        depth = parentScope.depth + 1;
	    } else {
	        parentScope = null;
	        depth = 0;
	    }
	
	    Object.defineProperties(this, {
	        path: { value: path },
	        node: { value: path.value },
	        isGlobal: { value: !parentScope, enumerable: true },
	        depth: { value: depth },
	        parent: { value: parentScope },
	        bindings: { value: {} },
	        types: { value: {} },
	    });
	}
	
	var scopeTypes = [
	    // Program nodes introduce global scopes.
	    namedTypes.Program,
	
	    // Function is the supertype of FunctionExpression,
	    // FunctionDeclaration, ArrowExpression, etc.
	    namedTypes.Function,
	
	    // In case you didn't know, the caught parameter shadows any variable
	    // of the same name in an outer scope.
	    namedTypes.CatchClause
	];
	
	var ScopeType = Type.or.apply(Type, scopeTypes);
	
	Scope.isEstablishedBy = function(node) {
	    return ScopeType.check(node);
	};
	
	var Sp = Scope.prototype;
	
	// Will be overridden after an instance lazily calls scanScope.
	Sp.didScan = false;
	
	Sp.declares = function(name) {
	    this.scan();
	    return hasOwn.call(this.bindings, name);
	};
	
	Sp.declaresType = function(name) {
	    this.scan();
	    return hasOwn.call(this.types, name);
	};
	
	Sp.declareTemporary = function(prefix) {
	    if (prefix) {
	        if (!/^[a-z$_]/i.test(prefix)) {
	            throw new Error("");
	        }
	    } else {
	        prefix = "t$";
	    }
	
	    // Include this.depth in the name to make sure the name does not
	    // collide with any variables in nested/enclosing scopes.
	    prefix += this.depth.toString(36) + "$";
	
	    this.scan();
	
	    var index = 0;
	    while (this.declares(prefix + index)) {
	        ++index;
	    }
	
	    var name = prefix + index;
	    return this.bindings[name] = types.builders.identifier(name);
	};
	
	Sp.injectTemporary = function(identifier, init) {
	    identifier || (identifier = this.declareTemporary());
	
	    var bodyPath = this.path.get("body");
	    if (namedTypes.BlockStatement.check(bodyPath.value)) {
	        bodyPath = bodyPath.get("body");
	    }
	
	    bodyPath.unshift(
	        b.variableDeclaration(
	            "var",
	            [b.variableDeclarator(identifier, init || null)]
	        )
	    );
	
	    return identifier;
	};
	
	Sp.scan = function(force) {
	    if (force || !this.didScan) {
	        for (var name in this.bindings) {
	            // Empty out this.bindings, just in cases.
	            delete this.bindings[name];
	        }
	        scanScope(this.path, this.bindings, this.types);
	        this.didScan = true;
	    }
	};
	
	Sp.getBindings = function () {
	    this.scan();
	    return this.bindings;
	};
	
	Sp.getTypes = function () {
	    this.scan();
	    return this.types;
	};
	
	function scanScope(path, bindings, scopeTypes) {
	    var node = path.value;
	    ScopeType.assert(node);
	
	    if (namedTypes.CatchClause.check(node)) {
	        // A catch clause establishes a new scope but the only variable
	        // bound in that scope is the catch parameter. Any other
	        // declarations create bindings in the outer scope.
	        addPattern(path.get("param"), bindings);
	
	    } else {
	        recursiveScanScope(path, bindings, scopeTypes);
	    }
	}
	
	function recursiveScanScope(path, bindings, scopeTypes) {
	    var node = path.value;
	
	    if (path.parent &&
	        namedTypes.FunctionExpression.check(path.parent.node) &&
	        path.parent.node.id) {
	        addPattern(path.parent.get("id"), bindings);
	    }
	
	    if (!node) {
	        // None of the remaining cases matter if node is falsy.
	
	    } else if (isArray.check(node)) {
	        path.each(function(childPath) {
	            recursiveScanChild(childPath, bindings, scopeTypes);
	        });
	
	    } else if (namedTypes.Function.check(node)) {
	        path.get("params").each(function(paramPath) {
	            addPattern(paramPath, bindings);
	        });
	
	        recursiveScanChild(path.get("body"), bindings, scopeTypes);
	
	    } else if (namedTypes.TypeAlias && namedTypes.TypeAlias.check(node)) {
	        addTypePattern(path.get("id"), scopeTypes);
	
	    } else if (namedTypes.VariableDeclarator.check(node)) {
	        addPattern(path.get("id"), bindings);
	        recursiveScanChild(path.get("init"), bindings, scopeTypes);
	
	    } else if (node.type === "ImportSpecifier" ||
	               node.type === "ImportNamespaceSpecifier" ||
	               node.type === "ImportDefaultSpecifier") {
	        addPattern(
	            // Esprima used to use the .name field to refer to the local
	            // binding identifier for ImportSpecifier nodes, but .id for
	            // ImportNamespaceSpecifier and ImportDefaultSpecifier nodes.
	            // ESTree/Acorn/ESpree use .local for all three node types.
	            path.get(node.local ? "local" :
	                     node.name ? "name" : "id"),
	            bindings
	        );
	
	    } else if (Node.check(node) && !Expression.check(node)) {
	        types.eachField(node, function(name, child) {
	            var childPath = path.get(name);
	            if (childPath.value !== child) {
	                throw new Error("");
	            }
	            recursiveScanChild(childPath, bindings, scopeTypes);
	        });
	    }
	}
	
	function recursiveScanChild(path, bindings, scopeTypes) {
	    var node = path.value;
	
	    if (!node || Expression.check(node)) {
	        // Ignore falsy values and Expressions.
	
	    } else if (namedTypes.FunctionDeclaration.check(node)) {
	        addPattern(path.get("id"), bindings);
	
	    } else if (namedTypes.ClassDeclaration &&
	               namedTypes.ClassDeclaration.check(node)) {
	        addPattern(path.get("id"), bindings);
	
	    } else if (ScopeType.check(node)) {
	        if (namedTypes.CatchClause.check(node)) {
	            var catchParamName = node.param.name;
	            var hadBinding = hasOwn.call(bindings, catchParamName);
	
	            // Any declarations that occur inside the catch body that do
	            // not have the same name as the catch parameter should count
	            // as bindings in the outer scope.
	            recursiveScanScope(path.get("body"), bindings, scopeTypes);
	
	            // If a new binding matching the catch parameter name was
	            // created while scanning the catch body, ignore it because it
	            // actually refers to the catch parameter and not the outer
	            // scope that we're currently scanning.
	            if (!hadBinding) {
	                delete bindings[catchParamName];
	            }
	        }
	
	    } else {
	        recursiveScanScope(path, bindings, scopeTypes);
	    }
	}
	
	function addPattern(patternPath, bindings) {
	    var pattern = patternPath.value;
	    namedTypes.Pattern.assert(pattern);
	
	    if (namedTypes.Identifier.check(pattern)) {
	        if (hasOwn.call(bindings, pattern.name)) {
	            bindings[pattern.name].push(patternPath);
	        } else {
	            bindings[pattern.name] = [patternPath];
	        }
	
	    } else if (namedTypes.ObjectPattern &&
	               namedTypes.ObjectPattern.check(pattern)) {
	        patternPath.get('properties').each(function(propertyPath) {
	            var property = propertyPath.value;
	            if (namedTypes.Pattern.check(property)) {
	                addPattern(propertyPath, bindings);
	            } else  if (namedTypes.Property.check(property)) {
	                addPattern(propertyPath.get('value'), bindings);
	            } else if (namedTypes.SpreadProperty &&
	                       namedTypes.SpreadProperty.check(property)) {
	                addPattern(propertyPath.get('argument'), bindings);
	            }
	        });
	
	    } else if (namedTypes.ArrayPattern &&
	               namedTypes.ArrayPattern.check(pattern)) {
	        patternPath.get('elements').each(function(elementPath) {
	            var element = elementPath.value;
	            if (namedTypes.Pattern.check(element)) {
	                addPattern(elementPath, bindings);
	            } else if (namedTypes.SpreadElement &&
	                       namedTypes.SpreadElement.check(element)) {
	                addPattern(elementPath.get("argument"), bindings);
	            }
	        });
	
	    } else if (namedTypes.PropertyPattern &&
	               namedTypes.PropertyPattern.check(pattern)) {
	        addPattern(patternPath.get('pattern'), bindings);
	
	    } else if ((namedTypes.SpreadElementPattern &&
	                namedTypes.SpreadElementPattern.check(pattern)) ||
	               (namedTypes.SpreadPropertyPattern &&
	                namedTypes.SpreadPropertyPattern.check(pattern))) {
	        addPattern(patternPath.get('argument'), bindings);
	    }
	}
	
	function addTypePattern(patternPath, types) {
	    var pattern = patternPath.value;
	    namedTypes.Pattern.assert(pattern);
	
	    if (namedTypes.Identifier.check(pattern)) {
	        if (hasOwn.call(types, pattern.name)) {
	            types[pattern.name].push(patternPath);
	        } else {
	            types[pattern.name] = [patternPath];
	        }
	
	    }
	}
	
	Sp.lookup = function(name) {
	    for (var scope = this; scope; scope = scope.parent)
	        if (scope.declares(name))
	            break;
	    return scope;
	};
	
	Sp.lookupType = function(name) {
	    for (var scope = this; scope; scope = scope.parent)
	        if (scope.declaresType(name))
	            break;
	    return scope;
	};
	
	Sp.getGlobalScope = function() {
	    var scope = this;
	    while (!scope.isGlobal)
	        scope = scope.parent;
	    return scope;
	};
	
	module.exports = Scope;


/***/ }

});