webpackJsonp([15],{

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

/***/ 5:
/***/ function(module, exports) {

	/* (ignored) */

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

/***/ "./node_modules/recast/lib/types.js":
/***/ function(module, exports, __webpack_require__) {

	// This module was originally created so that Recast could add its own
	// custom types to the AST type system (in particular, the File type), but
	// those types are now incorporated into ast-types, so this module doesn't
	// have much to do anymore. Still, it might prove useful in the future.
	module.exports = __webpack_require__("./node_modules/ast-types/main.js");


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


/***/ }

});