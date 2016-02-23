webpackJsonp([16],{

/***/ "./node_modules/shift-parser/dist/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TokenType = exports.TokenClass = exports.Tokenizer = exports.EarlyErrorChecker = exports.parseScript = exports.parseModule = undefined;
	
	var _tokenizer = __webpack_require__("./node_modules/shift-parser/dist/tokenizer.js");
	
	Object.defineProperty(exports, "Tokenizer", {
	  enumerable: true,
	  get: function get() {
	    return _tokenizer.default;
	  }
	});
	Object.defineProperty(exports, "TokenClass", {
	  enumerable: true,
	  get: function get() {
	    return _tokenizer.TokenClass;
	  }
	});
	Object.defineProperty(exports, "TokenType", {
	  enumerable: true,
	  get: function get() {
	    return _tokenizer.TokenType;
	  }
	});
	
	var _parser = __webpack_require__("./node_modules/shift-parser/dist/parser.js");
	
	var _earlyErrors = __webpack_require__("./node_modules/shift-parser/dist/early-errors.js");
	
	function markLocation(node, location) {
	  node.loc = {
	    start: location,
	    end: {
	      line: this.lastLine + 1,
	      column: this.lastIndex - this.lastLineStart,
	      offset: this.lastIndex
	    },
	    source: null
	  };
	  return node;
	} /**
	   * Copyright 2014 Shape Security, Inc.
	   *
	   * Licensed under the Apache License, Version 2.0 (the "License")
	   * you may not use this file except in compliance with the License.
	   * You may obtain a copy of the License at
	   *
	   *     http://www.apache.org/licenses/LICENSE-2.0
	   *
	   * Unless required by applicable law or agreed to in writing, software
	   * distributed under the License is distributed on an "AS IS" BASIS,
	   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	   * See the License for the specific language governing permissions and
	   * limitations under the License.
	   */
	
	function generateInterface(parsingFunctionName) {
	  return function parse(code) {
	    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var _ref$loc = _ref.loc;
	    var loc = _ref$loc === undefined ? false : _ref$loc;
	    var _ref$earlyErrors = _ref.earlyErrors;
	    var earlyErrors = _ref$earlyErrors === undefined ? true : _ref$earlyErrors;
	
	    var parser = new _parser.Parser(code);
	    if (loc) {
	      parser.markLocation = markLocation;
	    }
	    var ast = parser[parsingFunctionName]();
	    if (earlyErrors) {
	      var errors = _earlyErrors.EarlyErrorChecker.check(ast);
	      // for now, just throw the first error; we will handle multiple errors later
	      if (errors.length > 0) {
	        var _errors$ = errors[0];
	        var node = _errors$.node;
	        var message = _errors$.message;
	
	        var offset = 0,
	            line = 1,
	            column = 0;
	        if (node.loc != null) {
	          var _node$loc$start = node.loc.start;
	          offset = _node$loc$start.offset;
	          line = _node$loc$start.line;
	          column = _node$loc$start.column;
	        }
	        throw new _tokenizer.JsError(offset, line, column, message);
	      }
	    }
	    return ast;
	  };
	}
	
	var parseModule = exports.parseModule = generateInterface("parseModule");
	var parseScript = exports.parseScript = generateInterface("parseScript");
	exports.default = parseScript;
	exports.EarlyErrorChecker = _earlyErrors.EarlyErrorChecker;

/***/ },

/***/ "./node_modules/shift-parser/dist/pattern-acceptor.js":
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Copyright 2014 Shape Security, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License")
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	var PatternAcceptor = exports.PatternAcceptor = function () {
	  function PatternAcceptor(pattern, u) {
	    _classCallCheck(this, PatternAcceptor);
	
	    this.index = 0;
	    this.nCapturingParens = 0;
	    // constants
	    this.length = pattern.length;
	    this.pattern = pattern;
	    this.u = u;
	  }
	
	  _createClass(PatternAcceptor, [{
	    key: "eat",
	    value: function eat(ch) {
	      if (this.index >= this.length || this.pattern[this.index] !== ch) return false;
	      ++this.index;
	      return true;
	    }
	  }, {
	    key: "eatRegExp",
	    value: function eatRegExp(r) {
	      if (this.index >= this.length || !r.test(this.pattern[this.index])) return false;
	      ++this.index;
	      return true;
	    }
	  }, {
	    key: "eatN",
	    value: function eatN(n, r) {
	      if (this.index + n <= this.length && r.test(this.pattern.slice(this.index, this.index + n))) {
	        this.index += n;
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: "match",
	    value: function match(ch) {
	      return this.index < this.length && this.pattern[this.index] === ch;
	    }
	  }, {
	    key: "matchRegExp",
	    value: function matchRegExp(r) {
	      return this.index < this.length && r.test(this.pattern[this.index]);
	    }
	  }, {
	    key: "trackback",
	    value: function trackback(start, result) {
	      if (result) return true;
	      this.index = start;
	      return false;
	    }
	  }, {
	    key: "readDisjunction",
	    value: function readDisjunction() {
	      return this.readAlternative() && (this.eat("|") ? this.readDisjunction() : true);
	    }
	  }, {
	    key: "readAlternative",
	    value: function readAlternative() {
	      var savedIndex = this.index;
	      while (this.readTerm()) {
	        savedIndex = this.index;
	      }
	      this.index = savedIndex;
	      return true;
	    }
	  }, {
	    key: "readTerm",
	    value: function readTerm() {
	      if (!this.u) return this.readExtendedTerm();
	      return this.readAssertion() || this.readQuantifiableAssertion() || this.readAtom() && (this.readQuantifier(), true);
	    }
	  }, {
	    key: "readExtendedTerm",
	    value: function readExtendedTerm() {
	      return this.readQuantifiableAssertion() && (this.readQuantifier(), true) || this.readAssertion() || this.readAtomNoBrace() && (this.readQuantifier(), true) || this.readAtom();
	    }
	  }, {
	    key: "readAssertion",
	    value: function readAssertion() {
	      return this.eat("^") || this.eat("$") || this.eatN(2, /^\\[bB]$/);
	    }
	  }, {
	    key: "readQuantifiableAssertion",
	    value: function readQuantifiableAssertion() {
	      var start = this.index;
	      return this.eatN(3, /^\(\?[=!]$/) && this.trackback(start, this.readDisjunction() && this.eat(")"));
	    }
	  }, {
	    key: "readQuantifier",
	    value: function readQuantifier() {
	      return this.readQuantifierPrefix() && (this.eat("?"), true);
	    }
	  }, {
	    key: "readQuantifierPrefix",
	    value: function readQuantifierPrefix() {
	      if (this.eat("*") || this.eat("+") || this.eat("?")) return true;
	      if (this.eat("{") && this.readDecimalDigits()) {
	        if (this.eat(",")) this.readDecimalDigits();
	        return this.eat("}");
	      }
	      return false;
	    }
	  }, {
	    key: "readDecimalDigits",
	    value: function readDecimalDigits() {
	      var start = this.index;
	      while (this.eatRegExp(/^\d$/)) {}
	      return this.index > start;
	    }
	  }, {
	    key: "readAtomNoBrace",
	    value: function readAtomNoBrace() {
	      var start = this.index;
	      var startingParens = this.nCapturingParens;
	      if (this.readPatternCharacterNoBrace() || this.eat(".")) return true;
	      if (this.eat("\\")) return this.trackback(start, this.readAtomEscape());
	      if (this.readCharacterClass()) return true;
	      if (this.eat("(")) {
	        if (!this.eatN(2, /^\?:$/)) ++this.nCapturingParens;
	        if (this.readDisjunction() && this.eat(")")) return true;
	        this.nCapturingParens = startingParens;
	        this.index = start;
	        return false;
	      }
	      return false;
	    }
	  }, {
	    key: "readAtom",
	    value: function readAtom() {
	      return this.readAtomNoBrace() || this.eat("{") || this.eat("}");
	    }
	  }, {
	    key: "readSyntaxCharacter",
	    value: function readSyntaxCharacter() {
	      return this.eatRegExp(/^[\^$\\.*+?()[\]{}|]$/);
	    }
	  }, {
	    key: "readPatternCharacterNoBrace",
	    value: function readPatternCharacterNoBrace() {
	      return this.eatRegExp(/^[^\^$\\.*+?()[\]{}|]$/);
	    }
	  }, {
	    key: "readAtomEscape",
	    value: function readAtomEscape() {
	      return this.readDecimalEscape() || this.readCharacterEscape() || this.readCharacterClassEscape();
	    }
	  }, {
	    key: "readCharacterEscape",
	    value: function readCharacterEscape() {
	      return this.readControlEscape() || this.eat("c") && this.readControlLetter() || this.readHexEscapeSequence() || this.readRegExpUnicodeEscapeSequence() || this.readIdentityEscape();
	    }
	  }, {
	    key: "readControlEscape",
	    value: function readControlEscape() {
	      return this.eatRegExp(/^[fnrtv]$/);
	    }
	  }, {
	    key: "readControlLetter",
	    value: function readControlLetter() {
	      return this.eatRegExp(/^[a-zA-Z]$/);
	    }
	  }, {
	    key: "readHexEscapeSequence",
	    value: function readHexEscapeSequence() {
	      return this.eat("x") && this.readHexDigit() && this.readHexDigit();
	    }
	  }, {
	    key: "readHexDigit",
	    value: function readHexDigit() {
	      return this.eatRegExp(/^[a-fA-F0-9]$/);
	    }
	  }, {
	    key: "readRegExpUnicodeEscapeSequence",
	    value: function readRegExpUnicodeEscapeSequence() {
	      if (!this.eat("u")) return false;
	      if (this.u) {
	        if (this.eatN(4, /^D[abAB89][a-fA-F0-9]{2}$/)) {
	          this.eatN(6, /^\\u[dD][c-fC-F0-9][a-fA-F0-9]{2}$/);
	          return true;
	        }
	        return this.readHex4Digits() || this.eat("{") && this.readHexDigits() && this.eat("}");
	      } else {
	        return this.readHex4Digits();
	      }
	    }
	  }, {
	    key: "readHex4Digits",
	    value: function readHex4Digits() {
	      var k = 4;
	      while (k > 0) {
	        --k;
	        if (!this.readHexDigit()) return false;
	      }
	      return true;
	    }
	  }, {
	    key: "readHexDigits",
	    value: function readHexDigits() {
	      var start = this.index;
	      while (this.readHexDigit()) {}
	      return this.index > start;
	    }
	  }, {
	    key: "readIdentityEscape",
	    value: function readIdentityEscape() {
	      if (this.u) {
	        return this.readSyntaxCharacter() || this.eat("/");
	      } else {
	        return this.eatRegExp(/^[^a-zA-Z0-9_]$/); // TODO: SourceCharacter but not UnicodeIDContinue
	      }
	    }
	  }, {
	    key: "readDecimalEscape",
	    value: function readDecimalEscape() {
	      if (this.eat("0")) {
	        if (!this.matchRegExp(/^\d$/)) return true;
	        --this.index;
	        return false;
	      }
	      var start = this.index;
	      while (this.eatRegExp(/^\d$/)) {}
	      return this.trackback(start, this.index > start && (this.u || +this.pattern.slice(start, this.index) <= this.nCapturingParens));
	    }
	  }, {
	    key: "readCharacterClassEscape",
	    value: function readCharacterClassEscape() {
	      return this.eatRegExp(/^[dDsSwW]$/);
	    }
	  }, {
	    key: "readCharacterClass",
	    value: function readCharacterClass() {
	      var start = this.index;
	      return this.eat("[") && this.trackback(start, (this.eat("^"), true) && this.readClassRanges() && this.eat("]"));
	    }
	  }, {
	    key: "readClassRanges",
	    value: function readClassRanges() {
	      var start = this.index;
	      if (!this.readNonemptyClassRanges()) {
	        this.index = start;
	      }
	      return true;
	    }
	  }, {
	    key: "readNonemptyClassRanges",
	    value: function readNonemptyClassRanges() {
	      if (!this.readClassAtom()) return false;
	      if (this.match("]")) return true;
	      if (this.eat("-")) {
	        if (this.match("]")) return true;
	        return this.readClassAtom() && this.readClassRanges();
	      }
	      return this.readNonemptyClassRangesNoDash();
	    }
	  }, {
	    key: "readNonemptyClassRangesNoDash",
	    value: function readNonemptyClassRangesNoDash() {
	      // NOTE: it is impossible to reach this next line with a value matched by RegularExpressionLiteral;
	      // the pattern "[-a" would reach here if it could get past RegularExpressionLiteral
	      /* istanbul ignore next */
	      if (!this.readClassAtomNoDash()) return false;
	      if (this.match("]")) return true;
	      if (this.eat("-")) {
	        if (this.match("]")) return true;
	        return this.readClassAtom() && this.readClassRanges();
	      }
	      return this.readNonemptyClassRangesNoDash();
	    }
	  }, {
	    key: "readClassAtom",
	    value: function readClassAtom() {
	      return this.eat("-") || this.readClassAtomNoDash();
	    }
	  }, {
	    key: "readClassAtomNoDash",
	    value: function readClassAtomNoDash() {
	      return this.eatRegExp(/^[^\\\]-]$/) || this.eat("\\") && this.readClassEscape();
	    }
	  }, {
	    key: "readClassEscape",
	    value: function readClassEscape() {
	      return this.readDecimalEscape() || this.eat("b") || this.u && this.eat("-") || this.readCharacterEscape() || this.readCharacterClassEscape();
	    }
	  }], [{
	    key: "test",
	    value: function test(pattern, u) {
	      var acceptor = new PatternAcceptor(pattern, u);
	      return acceptor.readDisjunction() && acceptor.index === acceptor.length;
	    }
	  }]);
	
	  return PatternAcceptor;
	}();

/***/ },

/***/ "./node_modules/shift-parser/dist/utils.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isDecimalDigit = exports.isLineTerminator = exports.isWhiteSpace = exports.isIdentifierPart = exports.isIdentifierStart = exports.isRestrictedWord = undefined;
	exports.isStrictModeReservedWord = isStrictModeReservedWord;
	exports.getHexValue = getHexValue;
	
	var _esutils = __webpack_require__("./node_modules/esutils/lib/utils.js");
	
	var isReservedWordES6 = _esutils.keyword.isReservedWordES6; /**
	                                                             * Copyright 2014 Shape Security, Inc.
	                                                             *
	                                                             * Licensed under the Apache License, Version 2.0 (the "License")
	                                                             * you may not use this file except in compliance with the License.
	                                                             * You may obtain a copy of the License at
	                                                             *
	                                                             *     http://www.apache.org/licenses/LICENSE-2.0
	                                                             *
	                                                             * Unless required by applicable law or agreed to in writing, software
	                                                             * distributed under the License is distributed on an "AS IS" BASIS,
	                                                             * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                             * See the License for the specific language governing permissions and
	                                                             * limitations under the License.
	                                                             */
	
	var isRestrictedWord = _esutils.keyword.isRestrictedWord;
	var isIdentifierStartES6 = _esutils.code.isIdentifierStartES6;
	var isIdentifierPartES6 = _esutils.code.isIdentifierPartES6;
	var isWhiteSpace = _esutils.code.isWhiteSpace;
	var isLineTerminator = _esutils.code.isLineTerminator;
	var isDecimalDigit = _esutils.code.isDecimalDigit;
	exports.isRestrictedWord = isRestrictedWord;
	exports.isIdentifierStart = isIdentifierStartES6;
	exports.isIdentifierPart = isIdentifierPartES6;
	exports.isWhiteSpace = isWhiteSpace;
	exports.isLineTerminator = isLineTerminator;
	exports.isDecimalDigit = isDecimalDigit;
	function isStrictModeReservedWord(id) {
	  return isReservedWordES6(id, true);
	}
	
	function getHexValue(rune) {
	  if ("0" <= rune && rune <= "9") {
	    return rune.charCodeAt(0) - 48;
	  }
	  if ("a" <= rune && rune <= "f") {
	    return rune.charCodeAt(0) - 87;
	  }
	  if ("A" <= rune && rune <= "F") {
	    return rune.charCodeAt(0) - 55;
	  }
	  return -1;
	}

/***/ },

/***/ "./node_modules/shift-parser/dist/errors.js":
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Copyright 2014 Shape Security, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License")
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	var ErrorMessages = exports.ErrorMessages = {
	  UNEXPECTED_TOKEN: "Unexpected token {0}",
	  UNEXPECTED_ILLEGAL_TOKEN: "Unexpected {0}",
	  UNEXPECTED_NUMBER: "Unexpected number",
	  UNEXPECTED_STRING: "Unexpected string",
	  UNEXPECTED_IDENTIFIER: "Unexpected identifier",
	  UNEXPECTED_RESERVED_WORD: "Unexpected reserved word",
	  UNEXPECTED_TEMPLATE: "Unexpected template",
	  UNEXPECTED_EOS: "Unexpected end of input",
	  UNEXPECTED_LINE_TERMINATOR: "Unexpected line terminator",
	  NEWLINE_AFTER_THROW: "Illegal newline after throw",
	  UNTERMINATED_REGEXP: "Invalid regular expression: missing /",
	  INVALID_REGEXP_FLAGS: "Invalid regular expression flags",
	  INVALID_LHS_IN_ASSIGNMENT: "Invalid left-hand side in assignment",
	  INVALID_LHS_IN_FOR_IN: "Invalid left-hand side in for-in",
	  INVALID_LHS_IN_FOR_OF: "Invalid left-hand side in for-of",
	  INVALID_UPDATE_OPERAND: "Increment/decrement target must be an identifier or member expression",
	  MULTIPLE_DEFAULTS_IN_SWITCH: "More than one default clause in switch statement",
	  NO_CATCH_OR_FINALLY: "Missing catch or finally after try",
	  ILLEGAL_RETURN: "Illegal return statement",
	  ILLEGAL_ARROW_FUNCTION_PARAMS: "Illegal arrow function parameter list",
	  INVALID_VAR_INIT_FOR_IN: "Invalid variable declaration in for-in statement",
	  INVALID_VAR_INIT_FOR_OF: "Invalid variable declaration in for-of statement",
	  ILLEGAL_PROPERTY: "Illegal property initializer"
	};

/***/ },

/***/ "./node_modules/shift-parser/dist/parser.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Parser = undefined;
	
	var _errors = __webpack_require__("./node_modules/shift-parser/dist/errors.js");
	
	var _tokenizer = __webpack_require__("./node_modules/shift-parser/dist/tokenizer.js");
	
	var _tokenizer2 = _interopRequireDefault(_tokenizer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014 Shape Security, Inc.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License")
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	// Empty parameter list for ArrowExpression
	var ARROW_EXPRESSION_PARAMS = "CoverParenthesizedExpressionAndArrowParameterList";
	
	var Precedence = {
	  Sequence: 0,
	  Yield: 1,
	  Assignment: 1,
	  Conditional: 2,
	  ArrowFunction: 2,
	  LogicalOR: 3,
	  LogicalAND: 4,
	  BitwiseOR: 5,
	  BitwiseXOR: 6,
	  BitwiseAND: 7,
	  Equality: 8,
	  Relational: 9,
	  BitwiseSHIFT: 10,
	  Additive: 11,
	  Multiplicative: 12,
	  Unary: 13,
	  Postfix: 14,
	  Call: 15,
	  New: 16,
	  TaggedTemplate: 17,
	  Member: 18,
	  Primary: 19
	};
	
	var BinaryPrecedence = {
	  "||": Precedence.LogicalOR,
	  "&&": Precedence.LogicalAND,
	  "|": Precedence.BitwiseOR,
	  "^": Precedence.BitwiseXOR,
	  "&": Precedence.BitwiseAND,
	  "==": Precedence.Equality,
	  "!=": Precedence.Equality,
	  "===": Precedence.Equality,
	  "!==": Precedence.Equality,
	  "<": Precedence.Relational,
	  ">": Precedence.Relational,
	  "<=": Precedence.Relational,
	  ">=": Precedence.Relational,
	  "in": Precedence.Relational,
	  "instanceof": Precedence.Relational,
	  "<<": Precedence.BitwiseSHIFT,
	  ">>": Precedence.BitwiseSHIFT,
	  ">>>": Precedence.BitwiseSHIFT,
	  "+": Precedence.Additive,
	  "-": Precedence.Additive,
	  "*": Precedence.Multiplicative,
	  "%": Precedence.Multiplicative,
	  "/": Precedence.Multiplicative
	};
	
	function copyLocation(from, to) {
	  if ("loc" in from) {
	    to.loc = from.loc;
	  }
	  return to;
	}
	
	function isValidSimpleAssignmentTarget(node) {
	  switch (node.type) {
	    case "IdentifierExpression":
	    case "ComputedMemberExpression":
	    case "StaticMemberExpression":
	      return true;
	  }
	  return false;
	}
	
	function isPrefixOperator(token) {
	  switch (token.type) {
	    case _tokenizer.TokenType.INC:
	    case _tokenizer.TokenType.DEC:
	    case _tokenizer.TokenType.ADD:
	    case _tokenizer.TokenType.SUB:
	    case _tokenizer.TokenType.BIT_NOT:
	    case _tokenizer.TokenType.NOT:
	    case _tokenizer.TokenType.DELETE:
	    case _tokenizer.TokenType.VOID:
	    case _tokenizer.TokenType.TYPEOF:
	      return true;
	  }
	  return false;
	}
	
	function isUpdateOperator(token) {
	  return token.type === _tokenizer.TokenType.INC || token.type === _tokenizer.TokenType.DEC;
	}
	
	var Parser = exports.Parser = function (_Tokenizer) {
	  _inherits(Parser, _Tokenizer);
	
	  function Parser(source) {
	    _classCallCheck(this, Parser);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Parser).call(this, source));
	
	    _this.allowIn = true;
	    _this.inFunctionBody = false;
	    _this.inParameter = false;
	    _this.allowYieldExpression = false;
	    _this.module = false;
	    _this.moduleIsTheGoalSymbol = false;
	    _this.strict = false;
	
	    // Cover grammar
	    _this.isBindingElement = true;
	    _this.isAssignmentTarget = true;
	    _this.firstExprError = null;
	    return _this;
	  }
	
	  _createClass(Parser, [{
	    key: "match",
	    value: function match(subType) {
	      return this.lookahead.type === subType;
	    }
	  }, {
	    key: "eat",
	    value: function eat(tokenType) {
	      if (this.lookahead.type === tokenType) {
	        return this.lex();
	      }
	    }
	  }, {
	    key: "expect",
	    value: function expect(tokenType) {
	      if (this.lookahead.type === tokenType) {
	        return this.lex();
	      }
	      throw this.createUnexpected(this.lookahead);
	    }
	  }, {
	    key: "matchContextualKeyword",
	    value: function matchContextualKeyword(keyword) {
	      return this.lookahead.type === _tokenizer.TokenType.IDENTIFIER && this.lookahead.value === keyword;
	    }
	  }, {
	    key: "expectContextualKeyword",
	    value: function expectContextualKeyword(keyword) {
	      if (this.lookahead.type === _tokenizer.TokenType.IDENTIFIER && this.lookahead.value === keyword) {
	        return this.lex();
	      } else {
	        throw this.createUnexpected(this.lookahead);
	      }
	    }
	  }, {
	    key: "eatContextualKeyword",
	    value: function eatContextualKeyword(keyword) {
	      if (this.lookahead.type === _tokenizer.TokenType.IDENTIFIER && this.lookahead.value === keyword) {
	        return this.lex();
	      }
	    }
	  }, {
	    key: "consumeSemicolon",
	    value: function consumeSemicolon() {
	      if (this.hasLineTerminatorBeforeNext) return;
	      if (this.eat(_tokenizer.TokenType.SEMICOLON)) return;
	      if (!this.eof() && !this.match(_tokenizer.TokenType.RBRACE)) {
	        throw this.createUnexpected(this.lookahead);
	      }
	    }
	
	    // this is a no-op, reserved for future use
	
	  }, {
	    key: "markLocation",
	    value: function markLocation(node /*, startLocation*/) {
	      return node;
	    }
	  }, {
	    key: "parseModule",
	    value: function parseModule() {
	      this.moduleIsTheGoalSymbol = this.module = this.strict = true;
	      this.lookahead = this.advance();
	
	      var startLocation = this.getLocation();
	
	      var _parseBody = this.parseBody();
	
	      var directives = _parseBody.directives;
	      var statements = _parseBody.statements;
	
	      if (!this.match(_tokenizer.TokenType.EOS)) {
	        throw this.createUnexpected(this.lookahead);
	      }
	      return this.markLocation({ type: "Module", directives: directives, items: statements }, startLocation);
	    }
	  }, {
	    key: "parseScript",
	    value: function parseScript() {
	      this.lookahead = this.advance();
	
	      var startLocation = this.getLocation();
	
	      var _parseBody2 = this.parseBody();
	
	      var directives = _parseBody2.directives;
	      var statements = _parseBody2.statements;
	
	      if (!this.match(_tokenizer.TokenType.EOS)) {
	        throw this.createUnexpected(this.lookahead);
	      }
	      return this.markLocation({ type: "Script", directives: directives, statements: statements }, startLocation);
	    }
	  }, {
	    key: "parseFunctionBody",
	    value: function parseFunctionBody() {
	      var startLocation = this.getLocation();
	
	      var oldInFunctionBody = this.inFunctionBody;
	      var oldModule = this.module;
	      var oldStrict = this.strict;
	      this.inFunctionBody = true;
	      this.module = false;
	      this.strict = false;
	
	      this.expect(_tokenizer.TokenType.LBRACE);
	      var body = this.parseBody();
	      this.expect(_tokenizer.TokenType.RBRACE);
	
	      this.inFunctionBody = oldInFunctionBody;
	      this.module = oldModule;
	      this.strict = oldStrict;
	
	      return this.markLocation(body, startLocation);
	    }
	  }, {
	    key: "parseBody",
	    value: function parseBody() {
	      var directives = [],
	          statements = [],
	          parsingDirectives = true;
	
	      while (true) {
	        if (this.eof() || this.match(_tokenizer.TokenType.RBRACE)) break;
	        var token = this.lookahead;
	        var text = token.slice.text;
	        var isStringLiteral = token.type === _tokenizer.TokenType.STRING;
	        var isModule = this.module;
	        var directiveLocation = this.getLocation();
	        var stmt = isModule ? this.parseModuleItem() : this.parseStatementListItem();
	        if (parsingDirectives) {
	          if (isStringLiteral && stmt.type === "ExpressionStatement" && stmt.expression.type === "LiteralStringExpression") {
	            var rawValue = text.slice(1, -1);
	            if (rawValue === "use strict") {
	              this.strict = true;
	            }
	            directives.push(this.markLocation({ type: "Directive", rawValue: rawValue }, directiveLocation));
	          } else {
	            parsingDirectives = false;
	            statements.push(stmt);
	          }
	        } else {
	          statements.push(stmt);
	        }
	      }
	
	      return { type: "FunctionBody", directives: directives, statements: statements };
	    }
	  }, {
	    key: "parseImportSpecifier",
	    value: function parseImportSpecifier() {
	      var startLocation = this.getLocation(),
	          name = undefined;
	      if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET)) {
	        name = this.parseIdentifier();
	        if (!this.eatContextualKeyword("as")) {
	          return this.markLocation({
	            type: "ImportSpecifier",
	            name: null,
	            binding: this.markLocation({ type: "BindingIdentifier", name: name }, startLocation)
	          }, startLocation);
	        }
	      } else if (this.lookahead.type.klass.isIdentifierName) {
	        name = this.parseIdentifierName();
	        this.expectContextualKeyword("as");
	      }
	
	      return this.markLocation({ type: "ImportSpecifier", name: name, binding: this.parseBindingIdentifier() }, startLocation);
	    }
	  }, {
	    key: "parseNameSpaceBinding",
	    value: function parseNameSpaceBinding() {
	      this.expect(_tokenizer.TokenType.MUL);
	      this.expectContextualKeyword("as");
	      return this.parseBindingIdentifier();
	    }
	  }, {
	    key: "parseNamedImports",
	    value: function parseNamedImports() {
	      var result = [];
	      this.expect(_tokenizer.TokenType.LBRACE);
	      while (!this.eat(_tokenizer.TokenType.RBRACE)) {
	        result.push(this.parseImportSpecifier());
	        if (!this.eat(_tokenizer.TokenType.COMMA)) {
	          this.expect(_tokenizer.TokenType.RBRACE);
	          break;
	        }
	      }
	      return result;
	    }
	  }, {
	    key: "parseFromClause",
	    value: function parseFromClause() {
	      this.expectContextualKeyword("from");
	      var value = this.expect(_tokenizer.TokenType.STRING).str;
	      this.consumeSemicolon();
	      return value;
	    }
	  }, {
	    key: "parseImportDeclaration",
	    value: function parseImportDeclaration() {
	      var startLocation = this.getLocation(),
	          defaultBinding = null,
	          moduleSpecifier = undefined;
	      this.expect(_tokenizer.TokenType.IMPORT);
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.STRING:
	          moduleSpecifier = this.lex().str;
	          this.consumeSemicolon();
	          return this.markLocation({ type: "Import", defaultBinding: null, namedImports: [], moduleSpecifier: moduleSpecifier }, startLocation);
	        case _tokenizer.TokenType.IDENTIFIER:
	        case _tokenizer.TokenType.YIELD:
	        case _tokenizer.TokenType.LET:
	          defaultBinding = this.parseBindingIdentifier();
	          if (!this.eat(_tokenizer.TokenType.COMMA)) {
	            return this.markLocation({ type: "Import", defaultBinding: defaultBinding, namedImports: [], moduleSpecifier: this.parseFromClause() }, startLocation);
	          }
	          break;
	      }
	      if (this.match(_tokenizer.TokenType.MUL)) {
	        return this.markLocation({
	          type: "ImportNamespace",
	          defaultBinding: defaultBinding,
	          namespaceBinding: this.parseNameSpaceBinding(),
	          moduleSpecifier: this.parseFromClause()
	        }, startLocation);
	      } else if (this.match(_tokenizer.TokenType.LBRACE)) {
	        return this.markLocation({
	          type: "Import",
	          defaultBinding: defaultBinding,
	          namedImports: this.parseNamedImports(),
	          moduleSpecifier: this.parseFromClause()
	        }, startLocation);
	      } else {
	        throw this.createUnexpected(this.lookahead);
	      }
	    }
	  }, {
	    key: "parseExportSpecifier",
	    value: function parseExportSpecifier() {
	      var startLocation = this.getLocation();
	      var name = this.parseIdentifierName();
	      if (this.eatContextualKeyword("as")) {
	        var exportedName = this.parseIdentifierName();
	        return this.markLocation({ type: "ExportSpecifier", name: name, exportedName: exportedName }, startLocation);
	      }
	      return this.markLocation({ type: "ExportSpecifier", name: null, exportedName: name }, startLocation);
	    }
	  }, {
	    key: "parseExportClause",
	    value: function parseExportClause() {
	      this.expect(_tokenizer.TokenType.LBRACE);
	      var result = [];
	      while (!this.eat(_tokenizer.TokenType.RBRACE)) {
	        result.push(this.parseExportSpecifier());
	        if (!this.eat(_tokenizer.TokenType.COMMA)) {
	          this.expect(_tokenizer.TokenType.RBRACE);
	          break;
	        }
	      }
	      return result;
	    }
	  }, {
	    key: "parseExportDeclaration",
	    value: function parseExportDeclaration() {
	      var startLocation = this.getLocation(),
	          decl = undefined;
	      this.expect(_tokenizer.TokenType.EXPORT);
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.MUL:
	          this.lex();
	          // export * FromClause ;
	          decl = { type: "ExportAllFrom", moduleSpecifier: this.parseFromClause() };
	          break;
	        case _tokenizer.TokenType.LBRACE:
	          // export ExportClause FromClause ;
	          // export ExportClause ;
	          var namedExports = this.parseExportClause();
	          var moduleSpecifier = null;
	          if (this.matchContextualKeyword("from")) {
	            moduleSpecifier = this.parseFromClause();
	          }
	          decl = { type: "ExportFrom", namedExports: namedExports, moduleSpecifier: moduleSpecifier };
	          break;
	        case _tokenizer.TokenType.CLASS:
	          // export ClassDeclaration
	          decl = { type: "Export", declaration: this.parseClass({ isExpr: false, inDefault: false }) };
	          break;
	        case _tokenizer.TokenType.FUNCTION:
	          // export HoistableDeclaration
	          decl = { type: "Export", declaration: this.parseFunction({ isExpr: false, inDefault: false, allowGenerator: true }) };
	          break;
	        case _tokenizer.TokenType.DEFAULT:
	          this.lex();
	          switch (this.lookahead.type) {
	            case _tokenizer.TokenType.FUNCTION:
	              // export default HoistableDeclaration[Default]
	              decl = {
	                type: "ExportDefault",
	                body: this.parseFunction({ isExpr: false, inDefault: true, allowGenerator: true })
	              };
	              break;
	            case _tokenizer.TokenType.CLASS:
	              // export default ClassDeclaration[Default]
	              decl = { type: "ExportDefault", body: this.parseClass({ isExpr: false, inDefault: true }) };
	              break;
	            default:
	              // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
	              decl = { type: "ExportDefault", body: this.parseAssignmentExpression() };
	              this.consumeSemicolon();
	              break;
	          }
	          break;
	        case _tokenizer.TokenType.VAR:
	        case _tokenizer.TokenType.LET:
	        case _tokenizer.TokenType.CONST:
	          // export LexicalDeclaration
	          decl = { type: "Export", declaration: this.parseVariableDeclaration(true) };
	          this.consumeSemicolon();
	          break;
	        default:
	          throw this.createUnexpected(this.lookahead);
	      }
	      return this.markLocation(decl, startLocation);
	    }
	  }, {
	    key: "parseModuleItem",
	    value: function parseModuleItem() {
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.IMPORT:
	          return this.parseImportDeclaration();
	        case _tokenizer.TokenType.EXPORT:
	          return this.parseExportDeclaration();
	        default:
	          return this.parseStatementListItem();
	      }
	    }
	  }, {
	    key: "lookaheadLexicalDeclaration",
	    value: function lookaheadLexicalDeclaration() {
	      if (this.match(_tokenizer.TokenType.LET) || this.match(_tokenizer.TokenType.CONST)) {
	        var lexerState = this.saveLexerState();
	        this.lex();
	        if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET) || this.match(_tokenizer.TokenType.LBRACE) || this.match(_tokenizer.TokenType.LBRACK)) {
	          this.restoreLexerState(lexerState);
	          return true;
	        } else {
	          this.restoreLexerState(lexerState);
	        }
	      }
	      return false;
	    }
	  }, {
	    key: "parseStatementListItem",
	    value: function parseStatementListItem() {
	      if (this.eof()) throw this.createUnexpected(this.lookahead);
	
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.FUNCTION:
	          return this.parseFunction({ isExpr: false, inDefault: false, allowGenerator: true });
	        case _tokenizer.TokenType.CLASS:
	          return this.parseClass({ isExpr: false, inDefault: false });
	        default:
	          if (this.lookaheadLexicalDeclaration()) {
	            var startLocation = this.getLocation();
	            return this.markLocation(this.parseVariableDeclarationStatement(), startLocation);
	          } else {
	            return this.parseStatement();
	          }
	      }
	    }
	  }, {
	    key: "parseStatement",
	    value: function parseStatement() {
	      var startLocation = this.getLocation();
	      var stmt = this.isolateCoverGrammar(this.parseStatementHelper);
	      return this.markLocation(stmt, startLocation);
	    }
	  }, {
	    key: "parseStatementHelper",
	    value: function parseStatementHelper() {
	      if (this.eof()) {
	        throw this.createUnexpected(this.lookahead);
	      }
	
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.SEMICOLON:
	          return this.parseEmptyStatement();
	        case _tokenizer.TokenType.LBRACE:
	          return this.parseBlockStatement();
	        case _tokenizer.TokenType.LPAREN:
	          return this.parseExpressionStatement();
	        case _tokenizer.TokenType.BREAK:
	          return this.parseBreakStatement();
	        case _tokenizer.TokenType.CONTINUE:
	          return this.parseContinueStatement();
	        case _tokenizer.TokenType.DEBUGGER:
	          return this.parseDebuggerStatement();
	        case _tokenizer.TokenType.DO:
	          return this.parseDoWhileStatement();
	        case _tokenizer.TokenType.FOR:
	          return this.parseForStatement();
	        case _tokenizer.TokenType.IF:
	          return this.parseIfStatement();
	        case _tokenizer.TokenType.RETURN:
	          return this.parseReturnStatement();
	        case _tokenizer.TokenType.SWITCH:
	          return this.parseSwitchStatement();
	        case _tokenizer.TokenType.THROW:
	          return this.parseThrowStatement();
	        case _tokenizer.TokenType.TRY:
	          return this.parseTryStatement();
	        case _tokenizer.TokenType.VAR:
	          return this.parseVariableDeclarationStatement();
	        case _tokenizer.TokenType.WHILE:
	          return this.parseWhileStatement();
	        case _tokenizer.TokenType.WITH:
	          return this.parseWithStatement();
	        case _tokenizer.TokenType.FUNCTION:
	        case _tokenizer.TokenType.CLASS:
	          throw this.createUnexpected(this.lookahead);
	
	        default:
	          {
	            if (this.lookaheadLexicalDeclaration()) {
	              throw this.createUnexpected(this.lookahead);
	            }
	            var expr = this.parseExpression();
	            // 12.12 Labelled Statements;
	            if (expr.type === "IdentifierExpression" && this.eat(_tokenizer.TokenType.COLON)) {
	              var labeledBody = this.match(_tokenizer.TokenType.FUNCTION) ? this.parseFunction({ isExpr: false, inDefault: false, allowGenerator: false }) : this.parseStatement();
	              return { type: "LabeledStatement", label: expr.name, body: labeledBody };
	            } else {
	              this.consumeSemicolon();
	              return { type: "ExpressionStatement", expression: expr };
	            }
	          }
	      }
	    }
	  }, {
	    key: "parseEmptyStatement",
	    value: function parseEmptyStatement() {
	      this.lex();
	      return { type: "EmptyStatement" };
	    }
	  }, {
	    key: "parseBlockStatement",
	    value: function parseBlockStatement() {
	      return { type: "BlockStatement", block: this.parseBlock() };
	    }
	  }, {
	    key: "parseExpressionStatement",
	    value: function parseExpressionStatement() {
	      var expr = this.parseExpression();
	      this.consumeSemicolon();
	      return { type: "ExpressionStatement", expression: expr };
	    }
	  }, {
	    key: "parseBreakStatement",
	    value: function parseBreakStatement() {
	      this.lex();
	
	      // Catch the very common case first: immediately a semicolon (U+003B).
	      if (this.eat(_tokenizer.TokenType.SEMICOLON) || this.hasLineTerminatorBeforeNext) {
	        return { type: "BreakStatement", label: null };
	      }
	
	      var label = null;
	      if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET)) {
	        label = this.parseIdentifier();
	      }
	
	      this.consumeSemicolon();
	
	      return { type: "BreakStatement", label: label };
	    }
	  }, {
	    key: "parseContinueStatement",
	    value: function parseContinueStatement() {
	      this.lex();
	
	      // Catch the very common case first: immediately a semicolon (U+003B).
	      if (this.eat(_tokenizer.TokenType.SEMICOLON) || this.hasLineTerminatorBeforeNext) {
	        return { type: "ContinueStatement", label: null };
	      }
	
	      var label = null;
	      if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET)) {
	        label = this.parseIdentifier();
	      }
	
	      this.consumeSemicolon();
	
	      return { type: "ContinueStatement", label: label };
	    }
	  }, {
	    key: "parseDebuggerStatement",
	    value: function parseDebuggerStatement() {
	      this.lex();
	      this.consumeSemicolon();
	      return { type: "DebuggerStatement" };
	    }
	  }, {
	    key: "parseDoWhileStatement",
	    value: function parseDoWhileStatement() {
	      this.lex();
	      var body = this.parseStatement();
	      this.expect(_tokenizer.TokenType.WHILE);
	      this.expect(_tokenizer.TokenType.LPAREN);
	      var test = this.parseExpression();
	      this.expect(_tokenizer.TokenType.RPAREN);
	      this.eat(_tokenizer.TokenType.SEMICOLON);
	      return { type: "DoWhileStatement", body: body, test: test };
	    }
	  }, {
	    key: "parseForStatement",
	    value: function parseForStatement() {
	      this.lex();
	      this.expect(_tokenizer.TokenType.LPAREN);
	      var test = null;
	      var right = null;
	      if (this.eat(_tokenizer.TokenType.SEMICOLON)) {
	        if (!this.match(_tokenizer.TokenType.SEMICOLON)) {
	          test = this.parseExpression();
	        }
	        this.expect(_tokenizer.TokenType.SEMICOLON);
	        if (!this.match(_tokenizer.TokenType.RPAREN)) {
	          right = this.parseExpression();
	        }
	        return { type: "ForStatement", init: null, test: test, update: right, body: this.getIteratorStatementEpilogue() };
	      } else {
	        var startsWithLet = this.match(_tokenizer.TokenType.LET);
	        var isForDecl = this.lookaheadLexicalDeclaration();
	        var leftLocation = this.getLocation();
	        if (this.match(_tokenizer.TokenType.VAR) || isForDecl) {
	          var previousAllowIn = this.allowIn;
	          this.allowIn = false;
	          var init = this.parseVariableDeclaration(false);
	          this.allowIn = previousAllowIn;
	
	          if (init.declarators.length === 1 && (this.match(_tokenizer.TokenType.IN) || this.matchContextualKeyword("of"))) {
	            var type = undefined;
	
	            if (this.match(_tokenizer.TokenType.IN)) {
	              if (init.declarators[0].init != null) {
	                throw this.createError(_errors.ErrorMessages.INVALID_VAR_INIT_FOR_IN);
	              }
	              type = "ForInStatement";
	              this.lex();
	              right = this.parseExpression();
	            } else {
	              if (init.declarators[0].init != null) {
	                throw this.createError(_errors.ErrorMessages.INVALID_VAR_INIT_FOR_OF);
	              }
	              type = "ForOfStatement";
	              this.lex();
	              right = this.parseAssignmentExpression();
	            }
	
	            var body = this.getIteratorStatementEpilogue();
	
	            return { type: type, left: init, right: right, body: body };
	          } else {
	            this.expect(_tokenizer.TokenType.SEMICOLON);
	            if (!this.match(_tokenizer.TokenType.SEMICOLON)) {
	              test = this.parseExpression();
	            }
	            this.expect(_tokenizer.TokenType.SEMICOLON);
	            if (!this.match(_tokenizer.TokenType.RPAREN)) {
	              right = this.parseExpression();
	            }
	            return { type: "ForStatement", init: init, test: test, update: right, body: this.getIteratorStatementEpilogue() };
	          }
	        } else {
	          var previousAllowIn = this.allowIn;
	          this.allowIn = false;
	          var expr = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
	          this.allowIn = previousAllowIn;
	
	          if (this.isAssignmentTarget && expr.type !== "AssignmentExpression" && (this.match(_tokenizer.TokenType.IN) || this.matchContextualKeyword("of"))) {
	            if (startsWithLet && this.matchContextualKeyword("of")) {
	              throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_FOR_OF);
	            }
	            var type = this.match(_tokenizer.TokenType.IN) ? "ForInStatement" : "ForOfStatement";
	
	            this.lex();
	            right = this.parseExpression();
	
	            return { type: type, left: this.transformDestructuring(expr), right: right, body: this.getIteratorStatementEpilogue() };
	          } else {
	            if (this.firstExprError) {
	              throw this.firstExprError;
	            }
	            while (this.eat(_tokenizer.TokenType.COMMA)) {
	              var rhs = this.parseAssignmentExpression();
	              expr = this.markLocation({ type: "BinaryExpression", left: expr, operator: ",", right: rhs }, leftLocation);
	            }
	            if (this.match(_tokenizer.TokenType.IN)) {
	              throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_FOR_IN);
	            }
	            if (this.matchContextualKeyword("of")) {
	              throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_FOR_OF);
	            }
	            this.expect(_tokenizer.TokenType.SEMICOLON);
	            if (!this.match(_tokenizer.TokenType.SEMICOLON)) {
	              test = this.parseExpression();
	            }
	            this.expect(_tokenizer.TokenType.SEMICOLON);
	            if (!this.match(_tokenizer.TokenType.RPAREN)) {
	              right = this.parseExpression();
	            }
	            return { type: "ForStatement", init: expr, test: test, update: right, body: this.getIteratorStatementEpilogue() };
	          }
	        }
	      }
	    }
	  }, {
	    key: "getIteratorStatementEpilogue",
	    value: function getIteratorStatementEpilogue() {
	      this.expect(_tokenizer.TokenType.RPAREN);
	      var body = this.parseStatement();
	      return body;
	    }
	  }, {
	    key: "parseIfStatementChild",
	    value: function parseIfStatementChild() {
	      return this.match(_tokenizer.TokenType.FUNCTION) ? this.parseFunction({ isExpr: false, inDefault: false, allowGenerator: false }) : this.parseStatement();
	    }
	  }, {
	    key: "parseIfStatement",
	    value: function parseIfStatement() {
	      this.lex();
	      this.expect(_tokenizer.TokenType.LPAREN);
	      var test = this.parseExpression();
	      this.expect(_tokenizer.TokenType.RPAREN);
	      var consequent = this.parseIfStatementChild();
	      var alternate = null;
	      if (this.eat(_tokenizer.TokenType.ELSE)) {
	        alternate = this.parseIfStatementChild();
	      }
	      return { type: "IfStatement", test: test, consequent: consequent, alternate: alternate };
	    }
	  }, {
	    key: "parseReturnStatement",
	    value: function parseReturnStatement() {
	      if (!this.inFunctionBody) {
	        throw this.createError(_errors.ErrorMessages.ILLEGAL_RETURN);
	      }
	
	      this.lex();
	
	      if (this.hasLineTerminatorBeforeNext) {
	        return { type: "ReturnStatement", expression: null };
	      }
	
	      var expression = null;
	      if (!this.match(_tokenizer.TokenType.SEMICOLON)) {
	        if (!this.match(_tokenizer.TokenType.RBRACE) && !this.eof()) {
	          expression = this.parseExpression();
	        }
	      }
	
	      this.consumeSemicolon();
	      return { type: "ReturnStatement", expression: expression };
	    }
	  }, {
	    key: "parseSwitchStatement",
	    value: function parseSwitchStatement() {
	      this.lex();
	      this.expect(_tokenizer.TokenType.LPAREN);
	      var discriminant = this.parseExpression();
	      this.expect(_tokenizer.TokenType.RPAREN);
	      this.expect(_tokenizer.TokenType.LBRACE);
	
	      if (this.eat(_tokenizer.TokenType.RBRACE)) {
	        return { type: "SwitchStatement", discriminant: discriminant, cases: [] };
	      }
	
	      var cases = this.parseSwitchCases();
	      if (this.match(_tokenizer.TokenType.DEFAULT)) {
	        var defaultCase = this.parseSwitchDefault();
	        var postDefaultCases = this.parseSwitchCases();
	        if (this.match(_tokenizer.TokenType.DEFAULT)) {
	          throw this.createError(_errors.ErrorMessages.MULTIPLE_DEFAULTS_IN_SWITCH);
	        }
	        this.expect(_tokenizer.TokenType.RBRACE);
	        return {
	          type: "SwitchStatementWithDefault",
	          discriminant: discriminant,
	          preDefaultCases: cases,
	          defaultCase: defaultCase,
	          postDefaultCases: postDefaultCases
	        };
	      } else {
	        this.expect(_tokenizer.TokenType.RBRACE);
	        return { type: "SwitchStatement", discriminant: discriminant, cases: cases };
	      }
	    }
	  }, {
	    key: "parseSwitchCases",
	    value: function parseSwitchCases() {
	      var result = [];
	      while (!(this.eof() || this.match(_tokenizer.TokenType.RBRACE) || this.match(_tokenizer.TokenType.DEFAULT))) {
	        result.push(this.parseSwitchCase());
	      }
	      return result;
	    }
	  }, {
	    key: "parseSwitchCase",
	    value: function parseSwitchCase() {
	      var startLocation = this.getLocation();
	      this.expect(_tokenizer.TokenType.CASE);
	      return this.markLocation({
	        type: "SwitchCase",
	        test: this.parseExpression(),
	        consequent: this.parseSwitchCaseBody()
	      }, startLocation);
	    }
	  }, {
	    key: "parseSwitchDefault",
	    value: function parseSwitchDefault() {
	      var startLocation = this.getLocation();
	      this.expect(_tokenizer.TokenType.DEFAULT);
	      return this.markLocation({ type: "SwitchDefault", consequent: this.parseSwitchCaseBody() }, startLocation);
	    }
	  }, {
	    key: "parseSwitchCaseBody",
	    value: function parseSwitchCaseBody() {
	      this.expect(_tokenizer.TokenType.COLON);
	      return this.parseStatementListInSwitchCaseBody();
	    }
	  }, {
	    key: "parseStatementListInSwitchCaseBody",
	    value: function parseStatementListInSwitchCaseBody() {
	      var result = [];
	      while (!(this.eof() || this.match(_tokenizer.TokenType.RBRACE) || this.match(_tokenizer.TokenType.DEFAULT) || this.match(_tokenizer.TokenType.CASE))) {
	        result.push(this.parseStatementListItem());
	      }
	      return result;
	    }
	  }, {
	    key: "parseThrowStatement",
	    value: function parseThrowStatement() {
	      var token = this.lex();
	      if (this.hasLineTerminatorBeforeNext) {
	        throw this.createErrorWithLocation(token, _errors.ErrorMessages.NEWLINE_AFTER_THROW);
	      }
	      var expression = this.parseExpression();
	      this.consumeSemicolon();
	      return { type: "ThrowStatement", expression: expression };
	    }
	  }, {
	    key: "parseTryStatement",
	    value: function parseTryStatement() {
	      this.lex();
	      var body = this.parseBlock();
	
	      if (this.match(_tokenizer.TokenType.CATCH)) {
	        var catchClause = this.parseCatchClause();
	        if (this.eat(_tokenizer.TokenType.FINALLY)) {
	          var finalizer = this.parseBlock();
	          return { type: "TryFinallyStatement", body: body, catchClause: catchClause, finalizer: finalizer };
	        }
	        return { type: "TryCatchStatement", body: body, catchClause: catchClause };
	      }
	
	      if (this.eat(_tokenizer.TokenType.FINALLY)) {
	        var finalizer = this.parseBlock();
	        return { type: "TryFinallyStatement", body: body, catchClause: null, finalizer: finalizer };
	      } else {
	        throw this.createError(_errors.ErrorMessages.NO_CATCH_OR_FINALLY);
	      }
	    }
	  }, {
	    key: "parseVariableDeclarationStatement",
	    value: function parseVariableDeclarationStatement() {
	      var declaration = this.parseVariableDeclaration(true);
	      this.consumeSemicolon();
	      return { type: "VariableDeclarationStatement", declaration: declaration };
	    }
	  }, {
	    key: "parseWhileStatement",
	    value: function parseWhileStatement() {
	      this.lex();
	      this.expect(_tokenizer.TokenType.LPAREN);
	      var test = this.parseExpression();
	      var body = this.getIteratorStatementEpilogue();
	      return { type: "WhileStatement", test: test, body: body };
	    }
	  }, {
	    key: "parseWithStatement",
	    value: function parseWithStatement() {
	      this.lex();
	      this.expect(_tokenizer.TokenType.LPAREN);
	      var object = this.parseExpression();
	      this.expect(_tokenizer.TokenType.RPAREN);
	      var body = this.parseStatement();
	      return { type: "WithStatement", object: object, body: body };
	    }
	  }, {
	    key: "parseCatchClause",
	    value: function parseCatchClause() {
	      var startLocation = this.getLocation();
	
	      this.lex();
	      this.expect(_tokenizer.TokenType.LPAREN);
	      if (this.match(_tokenizer.TokenType.RPAREN) || this.match(_tokenizer.TokenType.LPAREN)) {
	        throw this.createUnexpected(this.lookahead);
	      }
	      var binding = this.parseBindingTarget();
	      this.expect(_tokenizer.TokenType.RPAREN);
	      var body = this.parseBlock();
	
	      return this.markLocation({ type: "CatchClause", binding: binding, body: body }, startLocation);
	    }
	  }, {
	    key: "parseBlock",
	    value: function parseBlock() {
	      var startLocation = this.getLocation();
	      this.expect(_tokenizer.TokenType.LBRACE);
	      var body = [];
	      while (!this.match(_tokenizer.TokenType.RBRACE)) {
	        body.push(this.parseStatementListItem());
	      }
	      this.expect(_tokenizer.TokenType.RBRACE);
	      return this.markLocation({ type: "Block", statements: body }, startLocation);
	    }
	  }, {
	    key: "parseVariableDeclaration",
	    value: function parseVariableDeclaration(bindingPatternsMustHaveInit) {
	      var startLocation = this.getLocation();
	      var token = this.lex();
	
	      // preceded by this.match(TokenSubType.VAR) || this.match(TokenSubType.LET);
	      var kind = token.type === _tokenizer.TokenType.VAR ? "var" : token.type === _tokenizer.TokenType.CONST ? "const" : "let";
	      var declarators = this.parseVariableDeclaratorList(bindingPatternsMustHaveInit);
	      return this.markLocation({ type: "VariableDeclaration", kind: kind, declarators: declarators }, startLocation);
	    }
	  }, {
	    key: "parseVariableDeclaratorList",
	    value: function parseVariableDeclaratorList(bindingPatternsMustHaveInit) {
	      var result = [];
	      do {
	        result.push(this.parseVariableDeclarator(bindingPatternsMustHaveInit));
	      } while (this.eat(_tokenizer.TokenType.COMMA));
	      return result;
	    }
	  }, {
	    key: "parseVariableDeclarator",
	    value: function parseVariableDeclarator(bindingPatternsMustHaveInit) {
	      var startLocation = this.getLocation();
	
	      if (this.match(_tokenizer.TokenType.LPAREN)) {
	        throw this.createUnexpected(this.lookahead);
	      }
	
	      var binding = this.parseBindingTarget();
	      if (bindingPatternsMustHaveInit && binding.type !== "BindingIdentifier" && !this.match(_tokenizer.TokenType.ASSIGN)) {
	        this.expect(_tokenizer.TokenType.ASSIGN);
	      }
	
	      var init = null;
	      if (this.eat(_tokenizer.TokenType.ASSIGN)) {
	        init = this.parseAssignmentExpression();
	      }
	
	      return this.markLocation({ type: "VariableDeclarator", binding: binding, init: init }, startLocation);
	    }
	  }, {
	    key: "isolateCoverGrammar",
	    value: function isolateCoverGrammar(parser) {
	      var oldIsBindingElement = this.isBindingElement,
	          oldIsAssignmentTarget = this.isAssignmentTarget,
	          oldFirstExprError = this.firstExprError,
	          result;
	      this.isBindingElement = this.isAssignmentTarget = true;
	      this.firstExprError = null;
	      result = parser.call(this);
	      if (this.firstExprError !== null) {
	        throw this.firstExprError;
	      }
	      this.isBindingElement = oldIsBindingElement;
	      this.isAssignmentTarget = oldIsAssignmentTarget;
	      this.firstExprError = oldFirstExprError;
	      return result;
	    }
	  }, {
	    key: "inheritCoverGrammar",
	    value: function inheritCoverGrammar(parser) {
	      var oldIsBindingElement = this.isBindingElement,
	          oldIsAssignmentTarget = this.isAssignmentTarget,
	          oldFirstExprError = this.firstExprError,
	          result;
	      this.isBindingElement = this.isAssignmentTarget = true;
	      this.firstExprError = null;
	      result = parser.call(this);
	      this.isBindingElement = this.isBindingElement && oldIsBindingElement;
	      this.isAssignmentTarget = this.isAssignmentTarget && oldIsAssignmentTarget;
	      this.firstExprError = oldFirstExprError || this.firstExprError;
	      return result;
	    }
	  }, {
	    key: "parseExpression",
	    value: function parseExpression() {
	      var startLocation = this.getLocation();
	
	      var left = this.parseAssignmentExpression();
	      if (this.match(_tokenizer.TokenType.COMMA)) {
	        while (!this.eof()) {
	          if (!this.match(_tokenizer.TokenType.COMMA)) break;
	          this.lex();
	          var right = this.parseAssignmentExpression();
	          left = this.markLocation({ type: "BinaryExpression", left: left, operator: ",", right: right }, startLocation);
	        }
	      }
	      return left;
	    }
	  }, {
	    key: "parseArrowExpressionTail",
	    value: function parseArrowExpressionTail(head, startLocation) {
	      // Convert param list.
	      var _head$params = head.params;
	      var params = _head$params === undefined ? null : _head$params;
	      var _head$rest = head.rest;
	      var rest = _head$rest === undefined ? null : _head$rest;
	
	      if (head.type !== ARROW_EXPRESSION_PARAMS) {
	        if (head.type === "IdentifierExpression") {
	          params = [this.transformDestructuring(head)];
	        } else {
	          throw this.createUnexpected(this.lookahead);
	        }
	      }
	
	      var paramsNode = this.markLocation({ type: "FormalParameters", items: params, rest: rest }, startLocation);
	
	      var arrow = this.expect(_tokenizer.TokenType.ARROW);
	
	      if (this.match(_tokenizer.TokenType.LBRACE)) {
	        var previousYield = this.allowYieldExpression;
	        this.allowYieldExpression = false;
	        var body = this.parseFunctionBody();
	        this.allowYieldExpression = previousYield;
	        return this.markLocation({ type: "ArrowExpression", params: paramsNode, body: body }, startLocation);
	      } else {
	        var body = this.parseAssignmentExpression();
	        return this.markLocation({ type: "ArrowExpression", params: paramsNode, body: body }, startLocation);
	      }
	    }
	  }, {
	    key: "parseAssignmentExpression",
	    value: function parseAssignmentExpression() {
	      return this.isolateCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
	    }
	  }, {
	    key: "parseAssignmentExpressionOrBindingElement",
	    value: function parseAssignmentExpressionOrBindingElement() {
	      var startLocation = this.getLocation();
	
	      if (this.allowYieldExpression && this.match(_tokenizer.TokenType.YIELD)) {
	        this.isBindingElement = this.isAssignmentTarget = false;
	        return this.parseYieldExpression();
	      }
	
	      var expr = this.parseConditionalExpression();
	
	      if (!this.hasLineTerminatorBeforeNext && this.match(_tokenizer.TokenType.ARROW)) {
	        this.isBindingElement = this.isAssignmentTarget = false;
	        this.firstExprError = null;
	        return this.parseArrowExpressionTail(expr, startLocation);
	      }
	
	      var isAssignmentOperator = false;
	      var operator = this.lookahead;
	      switch (operator.type) {
	        case _tokenizer.TokenType.ASSIGN_BIT_OR:
	        case _tokenizer.TokenType.ASSIGN_BIT_XOR:
	        case _tokenizer.TokenType.ASSIGN_BIT_AND:
	        case _tokenizer.TokenType.ASSIGN_SHL:
	        case _tokenizer.TokenType.ASSIGN_SHR:
	        case _tokenizer.TokenType.ASSIGN_SHR_UNSIGNED:
	        case _tokenizer.TokenType.ASSIGN_ADD:
	        case _tokenizer.TokenType.ASSIGN_SUB:
	        case _tokenizer.TokenType.ASSIGN_MUL:
	        case _tokenizer.TokenType.ASSIGN_DIV:
	        case _tokenizer.TokenType.ASSIGN_MOD:
	          isAssignmentOperator = true;
	          break;
	      }
	      if (isAssignmentOperator) {
	        if (!this.isAssignmentTarget || !isValidSimpleAssignmentTarget(expr)) {
	          throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_ASSIGNMENT);
	        }
	        expr = this.transformDestructuring(expr);
	      } else if (operator.type === _tokenizer.TokenType.ASSIGN) {
	        if (!this.isAssignmentTarget) {
	          throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_ASSIGNMENT);
	        }
	        expr = this.transformDestructuring(expr);
	      } else {
	        return expr;
	      }
	
	      this.lex();
	      var rhs = this.parseAssignmentExpression();
	
	      this.firstExprError = null;
	      return this.markLocation(operator.type === _tokenizer.TokenType.ASSIGN ? { type: "AssignmentExpression", binding: expr, expression: rhs } : { type: "CompoundAssignmentExpression", binding: expr, operator: operator.type.name, expression: rhs }, startLocation);
	    }
	  }, {
	    key: "transformDestructuring",
	    value: function transformDestructuring(node) {
	      var _this2 = this;
	
	      switch (node.type) {
	
	        case "DataProperty":
	          return copyLocation(node, {
	            type: "BindingPropertyProperty",
	            name: node.name,
	            binding: this.transformDestructuringWithDefault(node.expression)
	          });
	        case "ShorthandProperty":
	          return copyLocation(node, {
	            type: "BindingPropertyIdentifier",
	            binding: copyLocation(node, { type: "BindingIdentifier", name: node.name }),
	            init: null
	          });
	
	        case "ObjectExpression":
	          return copyLocation(node, {
	            type: "ObjectBinding",
	            properties: node.properties.map(function (x) {
	              return _this2.transformDestructuring(x);
	            })
	          });
	        case "ArrayExpression":
	          var last = node.elements[node.elements.length - 1];
	          if (last != null && last.type === "SpreadElement") {
	            return copyLocation(node, {
	              type: "ArrayBinding",
	              elements: node.elements.slice(0, -1).map(function (e) {
	                return e && _this2.transformDestructuringWithDefault(e);
	              }),
	              restElement: copyLocation(last.expression, this.transformDestructuring(last.expression))
	            });
	          } else {
	            return copyLocation(node, {
	              type: "ArrayBinding",
	              elements: node.elements.map(function (e) {
	                return e && _this2.transformDestructuringWithDefault(e);
	              }),
	              restElement: null
	            });
	          }
	          /* istanbul ignore next */
	          break;
	        case "IdentifierExpression":
	          return copyLocation(node, { type: "BindingIdentifier", name: node.name });
	        case "AssignmentExpression":
	          throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_ASSIGNMENT);
	
	        case "StaticPropertyName":
	          return copyLocation(node, { type: "BindingIdentifier", name: node.value });
	
	        case "ComputedMemberExpression":
	        case "StaticMemberExpression":
	        case "ArrayBinding":
	        case "BindingIdentifier":
	        case "BindingPropertyIdentifier":
	        case "BindingPropertyProperty":
	        case "BindingWithDefault":
	        case "ObjectBinding":
	          return node;
	      }
	
	      // istanbul ignore next
	      throw new Error("Not reached");
	    }
	  }, {
	    key: "transformDestructuringWithDefault",
	    value: function transformDestructuringWithDefault(node) {
	      switch (node.type) {
	        case "AssignmentExpression":
	          return copyLocation(node, {
	            type: "BindingWithDefault",
	            binding: this.transformDestructuring(node.binding),
	            init: node.expression
	          });
	      }
	      return this.transformDestructuring(node);
	    }
	  }, {
	    key: "lookaheadAssignmentExpression",
	    value: function lookaheadAssignmentExpression() {
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.ADD:
	        case _tokenizer.TokenType.ASSIGN_DIV:
	        case _tokenizer.TokenType.CLASS:
	        case _tokenizer.TokenType.DEC:
	        case _tokenizer.TokenType.DIV:
	        case _tokenizer.TokenType.FALSE:
	        case _tokenizer.TokenType.FUNCTION:
	        case _tokenizer.TokenType.IDENTIFIER:
	        case _tokenizer.TokenType.INC:
	        case _tokenizer.TokenType.LET:
	        case _tokenizer.TokenType.LBRACE:
	        case _tokenizer.TokenType.LBRACK:
	        case _tokenizer.TokenType.LPAREN:
	        case _tokenizer.TokenType.NEW:
	        case _tokenizer.TokenType.NOT:
	        case _tokenizer.TokenType.NULL:
	        case _tokenizer.TokenType.NUMBER:
	        case _tokenizer.TokenType.STRING:
	        case _tokenizer.TokenType.SUB:
	        case _tokenizer.TokenType.SUPER:
	        case _tokenizer.TokenType.THIS:
	        case _tokenizer.TokenType.TRUE:
	        case _tokenizer.TokenType.YIELD:
	        case _tokenizer.TokenType.TEMPLATE:
	          return true;
	      }
	      return false;
	    }
	  }, {
	    key: "parseYieldExpression",
	    value: function parseYieldExpression() {
	      var startLocation = this.getLocation();
	
	      this.lex();
	      if (this.hasLineTerminatorBeforeNext) {
	        return this.markLocation({ type: "YieldExpression", expression: null }, startLocation);
	      }
	      var isGenerator = !!this.eat(_tokenizer.TokenType.MUL);
	      var expr = null;
	      if (isGenerator || this.lookaheadAssignmentExpression()) {
	        expr = this.parseAssignmentExpression();
	      }
	      var type = isGenerator ? "YieldGeneratorExpression" : "YieldExpression";
	      return this.markLocation({ type: type, expression: expr }, startLocation);
	    }
	  }, {
	    key: "parseConditionalExpression",
	    value: function parseConditionalExpression() {
	      var startLocation = this.getLocation();
	      var test = this.parseBinaryExpression();
	      if (this.firstExprError) return test;
	      if (this.eat(_tokenizer.TokenType.CONDITIONAL)) {
	        this.isBindingElement = this.isAssignmentTarget = false;
	        var previousAllowIn = this.allowIn;
	        this.allowIn = true;
	        var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        this.allowIn = previousAllowIn;
	        this.expect(_tokenizer.TokenType.COLON);
	        var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
	        return this.markLocation({ type: "ConditionalExpression", test: test, consequent: consequent, alternate: alternate }, startLocation);
	      }
	      return test;
	    }
	  }, {
	    key: "isBinaryOperator",
	    value: function isBinaryOperator(type) {
	      switch (type) {
	        case _tokenizer.TokenType.OR:
	        case _tokenizer.TokenType.AND:
	        case _tokenizer.TokenType.BIT_OR:
	        case _tokenizer.TokenType.BIT_XOR:
	        case _tokenizer.TokenType.BIT_AND:
	        case _tokenizer.TokenType.EQ:
	        case _tokenizer.TokenType.NE:
	        case _tokenizer.TokenType.EQ_STRICT:
	        case _tokenizer.TokenType.NE_STRICT:
	        case _tokenizer.TokenType.LT:
	        case _tokenizer.TokenType.GT:
	        case _tokenizer.TokenType.LTE:
	        case _tokenizer.TokenType.GTE:
	        case _tokenizer.TokenType.INSTANCEOF:
	        case _tokenizer.TokenType.SHL:
	        case _tokenizer.TokenType.SHR:
	        case _tokenizer.TokenType.SHR_UNSIGNED:
	        case _tokenizer.TokenType.ADD:
	        case _tokenizer.TokenType.SUB:
	        case _tokenizer.TokenType.MUL:
	        case _tokenizer.TokenType.DIV:
	        case _tokenizer.TokenType.MOD:
	          return true;
	        case _tokenizer.TokenType.IN:
	          return this.allowIn;
	        default:
	          return false;
	      }
	    }
	  }, {
	    key: "parseBinaryExpression",
	    value: function parseBinaryExpression() {
	      var _this3 = this;
	
	      var startLocation = this.getLocation();
	      var left = this.parseUnaryExpression();
	      if (this.firstExprError) {
	        return left;
	      }
	
	      var operator = this.lookahead.type;
	
	      if (!this.isBinaryOperator(operator)) return left;
	
	      this.isBindingElement = this.isAssignmentTarget = false;
	
	      this.lex();
	      var stack = [];
	      stack.push({ startLocation: startLocation, left: left, operator: operator, precedence: BinaryPrecedence[operator.name] });
	      startLocation = this.getLocation();
	      var right = this.isolateCoverGrammar(this.parseUnaryExpression);
	      operator = this.lookahead.type;
	      while (this.isBinaryOperator(operator)) {
	        var precedence = BinaryPrecedence[operator.name];
	        // Reduce: make a binary expression from the three topmost entries.
	        while (stack.length && precedence <= stack[stack.length - 1].precedence) {
	          var stackItem = stack[stack.length - 1];
	          var stackOperator = stackItem.operator;
	          left = stackItem.left;
	          stack.pop();
	          startLocation = stackItem.startLocation;
	          right = this.markLocation({ type: "BinaryExpression", left: left, operator: stackOperator.name, right: right }, startLocation);
	        }
	
	        this.lex();
	        stack.push({ startLocation: startLocation, left: right, operator: operator, precedence: precedence });
	
	        startLocation = this.getLocation();
	        right = this.isolateCoverGrammar(this.parseUnaryExpression);
	        operator = this.lookahead.type;
	      }
	
	      // Final reduce to clean-up the stack.
	      return stack.reduceRight(function (expr, stackItem) {
	        return _this3.markLocation({
	          type: "BinaryExpression",
	          left: stackItem.left,
	          operator: stackItem.operator.name,
	          right: expr
	        }, stackItem.startLocation);
	      }, right);
	    }
	  }, {
	    key: "parseUnaryExpression",
	    value: function parseUnaryExpression() {
	      if (this.lookahead.type.klass !== _tokenizer.TokenClass.Punctuator && this.lookahead.type.klass !== _tokenizer.TokenClass.Keyword) {
	        return this.parseUpdateExpression();
	      }
	      var startLocation = this.getLocation();
	      var operator = this.lookahead;
	      if (!isPrefixOperator(operator)) {
	        return this.parseUpdateExpression();
	      }
	
	      this.lex();
	      this.isBindingElement = this.isAssignmentTarget = false;
	
	      var node = undefined;
	      if (isUpdateOperator(operator)) {
	        var operandStartLocation = this.getLocation();
	        var operand = this.isolateCoverGrammar(this.parseUnaryExpression);
	        if (operand.type === "IdentifierExpression") {
	          operand.type = "BindingIdentifier";
	        } else if (!isValidSimpleAssignmentTarget(operand)) {
	          throw this.createErrorWithLocation(operandStartLocation, _errors.ErrorMessages.INVALID_UPDATE_OPERAND);
	        }
	        node = { type: "UpdateExpression", isPrefix: true, operator: operator.value, operand: operand };
	      } else {
	        var operand = this.isolateCoverGrammar(this.parseUnaryExpression);
	        node = { type: "UnaryExpression", operator: operator.value, operand: operand };
	      }
	
	      return this.markLocation(node, startLocation);
	    }
	  }, {
	    key: "parseUpdateExpression",
	    value: function parseUpdateExpression() {
	      var startLocation = this.getLocation();
	
	      var operand = this.parseLeftHandSideExpression({ allowCall: true });
	      if (this.firstExprError || this.hasLineTerminatorBeforeNext) return operand;
	
	      var operator = this.lookahead;
	      if (!isUpdateOperator(operator)) return operand;
	      this.lex();
	      this.isBindingElement = this.isAssignmentTarget = false;
	      if (operand.type === "IdentifierExpression") {
	        operand.type = "BindingIdentifier";
	      } else if (!isValidSimpleAssignmentTarget(operand)) {
	        throw this.createErrorWithLocation(startLocation, _errors.ErrorMessages.INVALID_UPDATE_OPERAND);
	      }
	
	      return this.markLocation({ type: "UpdateExpression", isPrefix: false, operator: operator.value, operand: operand }, startLocation);
	    }
	  }, {
	    key: "parseLeftHandSideExpression",
	    value: function parseLeftHandSideExpression(_ref) {
	      var allowCall = _ref.allowCall;
	
	      var startLocation = this.getLocation();
	      var previousAllowIn = this.allowIn;
	      this.allowIn = allowCall;
	
	      var expr = undefined,
	          token = this.lookahead;
	
	      if (this.eat(_tokenizer.TokenType.SUPER)) {
	        this.isBindingElement = false;
	        this.isAssignmentTarget = false;
	        expr = this.markLocation({ type: "Super" }, startLocation);
	        if (this.match(_tokenizer.TokenType.LPAREN)) {
	          if (allowCall) {
	            expr = this.markLocation({
	              type: "CallExpression",
	              callee: expr,
	              arguments: this.parseArgumentList()
	            }, startLocation);
	          } else {
	            throw this.createUnexpected(token);
	          }
	        } else if (this.match(_tokenizer.TokenType.LBRACK)) {
	          expr = this.markLocation({
	            type: "ComputedMemberExpression",
	            object: expr,
	            expression: this.parseComputedMember()
	          }, startLocation);
	          this.isAssignmentTarget = true;
	        } else if (this.match(_tokenizer.TokenType.PERIOD)) {
	          expr = this.markLocation({
	            type: "StaticMemberExpression",
	            object: expr,
	            property: this.parseStaticMember()
	          }, startLocation);
	          this.isAssignmentTarget = true;
	        } else {
	          throw this.createUnexpected(token);
	        }
	      } else if (this.match(_tokenizer.TokenType.NEW)) {
	        this.isBindingElement = this.isAssignmentTarget = false;
	        expr = this.parseNewExpression();
	      } else {
	        expr = this.parsePrimaryExpression();
	        if (this.firstExprError) {
	          return expr;
	        }
	      }
	
	      while (true) {
	        if (allowCall && this.match(_tokenizer.TokenType.LPAREN)) {
	          this.isBindingElement = this.isAssignmentTarget = false;
	          expr = this.markLocation({
	            type: "CallExpression",
	            callee: expr,
	            arguments: this.parseArgumentList()
	          }, startLocation);
	        } else if (this.match(_tokenizer.TokenType.LBRACK)) {
	          this.isBindingElement = false;
	          this.isAssignmentTarget = true;
	          expr = this.markLocation({
	            type: "ComputedMemberExpression",
	            object: expr,
	            expression: this.parseComputedMember()
	          }, startLocation);
	        } else if (this.match(_tokenizer.TokenType.PERIOD)) {
	          this.isBindingElement = false;
	          this.isAssignmentTarget = true;
	          expr = this.markLocation({
	            type: "StaticMemberExpression",
	            object: expr,
	            property: this.parseStaticMember()
	          }, startLocation);
	        } else if (this.match(_tokenizer.TokenType.TEMPLATE)) {
	          this.isBindingElement = this.isAssignmentTarget = false;
	          expr = this.markLocation({
	            type: "TemplateExpression",
	            tag: expr,
	            elements: this.parseTemplateElements()
	          }, startLocation);
	        } else {
	          break;
	        }
	      }
	
	      this.allowIn = previousAllowIn;
	
	      return expr;
	    }
	  }, {
	    key: "parseTemplateElements",
	    value: function parseTemplateElements() {
	      var startLocation = this.getLocation();
	      var token = this.lookahead;
	      if (token.tail) {
	        this.lex();
	        return [this.markLocation({ type: "TemplateElement", rawValue: token.slice.text.slice(1, -1) }, startLocation)];
	      }
	      var result = [this.markLocation({ type: "TemplateElement", rawValue: this.lex().slice.text.slice(1, -2) }, startLocation)];
	      while (true) {
	        result.push(this.parseExpression());
	        if (!this.match(_tokenizer.TokenType.RBRACE)) {
	          throw this.createILLEGAL();
	        }
	        this.index = this.startIndex;
	        this.line = this.startLine;
	        this.lineStart = this.startLineStart;
	        this.lookahead = this.scanTemplateElement();
	        startLocation = this.getLocation();
	        token = this.lex();
	        if (token.tail) {
	          result.push(this.markLocation({ type: "TemplateElement", rawValue: token.slice.text.slice(1, -1) }, startLocation));
	          return result;
	        } else {
	          result.push(this.markLocation({ type: "TemplateElement", rawValue: token.slice.text.slice(1, -2) }, startLocation));
	        }
	      }
	    }
	  }, {
	    key: "parseStaticMember",
	    value: function parseStaticMember() {
	      this.lex();
	      if (!this.lookahead.type.klass.isIdentifierName) {
	        throw this.createUnexpected(this.lookahead);
	      } else {
	        return this.lex().value;
	      }
	    }
	  }, {
	    key: "parseComputedMember",
	    value: function parseComputedMember() {
	      this.lex();
	      var expr = this.parseExpression();
	      this.expect(_tokenizer.TokenType.RBRACK);
	      return expr;
	    }
	  }, {
	    key: "parseNewExpression",
	    value: function parseNewExpression() {
	      var _this4 = this;
	
	      var startLocation = this.getLocation();
	      this.lex();
	      if (this.eat(_tokenizer.TokenType.PERIOD)) {
	        var ident = this.expect(_tokenizer.TokenType.IDENTIFIER);
	        if (ident.value !== "target") {
	          throw this.createUnexpected(ident);
	        }
	        return this.markLocation({ type: "NewTargetExpression" }, startLocation);
	      }
	      var callee = this.isolateCoverGrammar(function () {
	        return _this4.parseLeftHandSideExpression({ allowCall: false });
	      });
	      return this.markLocation({
	        type: "NewExpression",
	        callee: callee,
	        arguments: this.match(_tokenizer.TokenType.LPAREN) ? this.parseArgumentList() : []
	      }, startLocation);
	    }
	  }, {
	    key: "parsePrimaryExpression",
	    value: function parsePrimaryExpression() {
	      if (this.match(_tokenizer.TokenType.LPAREN)) {
	        return this.parseGroupExpression();
	      }
	
	      var startLocation = this.getLocation();
	
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.IDENTIFIER:
	        case _tokenizer.TokenType.YIELD:
	        case _tokenizer.TokenType.LET:
	          return this.markLocation({ type: "IdentifierExpression", name: this.parseIdentifier() }, startLocation);
	        case _tokenizer.TokenType.STRING:
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.parseStringLiteral();
	        case _tokenizer.TokenType.NUMBER:
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.parseNumericLiteral();
	        case _tokenizer.TokenType.THIS:
	          this.lex();
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.markLocation({ type: "ThisExpression" }, startLocation);
	        case _tokenizer.TokenType.FUNCTION:
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.markLocation(this.parseFunction({ isExpr: true, inDefault: false, allowGenerator: true }), startLocation);
	        case _tokenizer.TokenType.TRUE:
	          this.lex();
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.markLocation({ type: "LiteralBooleanExpression", value: true }, startLocation);
	        case _tokenizer.TokenType.FALSE:
	          this.lex();
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.markLocation({ type: "LiteralBooleanExpression", value: false }, startLocation);
	        case _tokenizer.TokenType.NULL:
	          this.lex();
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.markLocation({ type: "LiteralNullExpression" }, startLocation);
	        case _tokenizer.TokenType.LBRACK:
	          return this.parseArrayExpression();
	        case _tokenizer.TokenType.LBRACE:
	          return this.parseObjectExpression();
	        case _tokenizer.TokenType.TEMPLATE:
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.markLocation({ type: "TemplateExpression", tag: null, elements: this.parseTemplateElements() }, startLocation);
	        case _tokenizer.TokenType.DIV:
	        case _tokenizer.TokenType.ASSIGN_DIV:
	          this.isBindingElement = this.isAssignmentTarget = false;
	          this.lookahead = this.scanRegExp(this.match(_tokenizer.TokenType.DIV) ? "/" : "/=");
	          var token = this.lex();
	          var lastSlash = token.value.lastIndexOf("/");
	          var pattern = token.value.slice(1, lastSlash);
	          var flags = token.value.slice(lastSlash + 1);
	          return this.markLocation({ type: "LiteralRegExpExpression", pattern: pattern, flags: flags }, startLocation);
	        case _tokenizer.TokenType.CLASS:
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return this.parseClass({ isExpr: true, inDefault: false });
	        default:
	          throw this.createUnexpected(this.lookahead);
	      }
	    }
	  }, {
	    key: "parseNumericLiteral",
	    value: function parseNumericLiteral() {
	      var startLocation = this.getLocation();
	      var token = this.lex();
	      if (token.octal && this.strict) {
	        if (token.noctal) {
	          throw this.createErrorWithLocation(startLocation, "Unexpected noctal integer literal");
	        } else {
	          throw this.createErrorWithLocation(startLocation, "Unexpected legacy octal integer literal");
	        }
	      }
	      var node = token.value === 1 / 0 ? { type: "LiteralInfinityExpression" } : { type: "LiteralNumericExpression", value: token.value };
	      return this.markLocation(node, startLocation);
	    }
	  }, {
	    key: "parseStringLiteral",
	    value: function parseStringLiteral() {
	      var startLocation = this.getLocation();
	      var token = this.lex();
	      if (token.octal != null && this.strict) {
	        throw this.createErrorWithLocation(startLocation, "Unexpected legacy octal escape sequence: \\" + token.octal);
	      }
	      return this.markLocation({ type: "LiteralStringExpression", value: token.str }, startLocation);
	    }
	  }, {
	    key: "parseIdentifierName",
	    value: function parseIdentifierName() {
	      if (this.lookahead.type.klass.isIdentifierName) {
	        return this.lex().value;
	      } else {
	        throw this.createUnexpected(this.lookahead);
	      }
	    }
	  }, {
	    key: "parseBindingIdentifier",
	    value: function parseBindingIdentifier() {
	      var startLocation = this.getLocation();
	      return this.markLocation({ type: "BindingIdentifier", name: this.parseIdentifier() }, startLocation);
	    }
	  }, {
	    key: "parseIdentifier",
	    value: function parseIdentifier() {
	      var type = this.lookahead.type;
	      if (type === _tokenizer.TokenType.IDENTIFIER || type === _tokenizer.TokenType.YIELD && !this.allowYieldExpression || type === _tokenizer.TokenType.LET) {
	        return this.lex().value;
	      }
	      throw this.createUnexpected(this.lookahead);
	    }
	  }, {
	    key: "parseArgumentList",
	    value: function parseArgumentList() {
	      this.lex();
	      var args = this.parseArguments();
	      this.expect(_tokenizer.TokenType.RPAREN);
	      return args;
	    }
	  }, {
	    key: "parseArguments",
	    value: function parseArguments() {
	      var result = [];
	      while (true) {
	        if (this.match(_tokenizer.TokenType.RPAREN) || this.eof()) {
	          return result;
	        }
	        var arg = undefined;
	        if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
	          var startLocation = this.getLocation();
	          arg = this.markLocation({ type: "SpreadElement", expression: this.parseAssignmentExpression() }, startLocation);
	        } else {
	          arg = this.parseAssignmentExpression();
	        }
	        result.push(arg);
	        if (!this.eat(_tokenizer.TokenType.COMMA)) break;
	      }
	      return result;
	    }
	
	    // 11.2 Left-Hand-Side Expressions;
	
	  }, {
	    key: "ensureArrow",
	    value: function ensureArrow() {
	      if (this.hasLineTerminatorBeforeNext) {
	        throw this.createError(_errors.ErrorMessages.UNEXPECTED_LINE_TERMINATOR);
	      }
	      if (!this.match(_tokenizer.TokenType.ARROW)) {
	        this.expect(_tokenizer.TokenType.ARROW);
	      }
	    }
	  }, {
	    key: "parseGroupExpression",
	    value: function parseGroupExpression() {
	      // At this point, we need to parse 3 things:
	      //  1. Group expression
	      //  2. Assignment target of assignment expression
	      //  3. Parameter list of arrow function
	      var rest = null;
	      var start = this.expect(_tokenizer.TokenType.LPAREN);
	      if (this.eat(_tokenizer.TokenType.RPAREN)) {
	        this.ensureArrow();
	        this.isBindingElement = this.isAssignmentTarget = false;
	        return {
	          type: ARROW_EXPRESSION_PARAMS,
	          params: [],
	          rest: null
	        };
	      } else if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
	        rest = this.parseBindingIdentifier();
	        this.expect(_tokenizer.TokenType.RPAREN);
	        this.ensureArrow();
	        this.isBindingElement = this.isAssignmentTarget = false;
	        return {
	          type: ARROW_EXPRESSION_PARAMS,
	          params: [],
	          rest: rest
	        };
	      }
	
	      var startLocation = this.getLocation();
	      var group = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
	
	      var params = this.isBindingElement ? [this.transformDestructuringWithDefault(group)] : null;
	
	      while (this.eat(_tokenizer.TokenType.COMMA)) {
	        this.isAssignmentTarget = false;
	        if (this.match(_tokenizer.TokenType.ELLIPSIS)) {
	          if (!this.isBindingElement) {
	            throw this.createUnexpected(this.lookahead);
	          }
	          this.lex();
	          rest = this.parseBindingIdentifier();
	          break;
	        }
	
	        if (!group) {
	          // Can be only binding elements.
	          var binding = this.parseBindingElement();
	          params.push(binding);
	        } else {
	          // Can be either binding element or assignment target.
	          var expr = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
	          if (!this.isBindingElement) {
	            params = null;
	          } else {
	            params.push(this.transformDestructuringWithDefault(expr));
	          }
	
	          if (this.firstExprError) {
	            group = null;
	          } else {
	            group = this.markLocation({
	              type: "BinaryExpression",
	              left: group,
	              operator: ",",
	              right: expr
	            }, startLocation);
	          }
	        }
	      }
	
	      this.expect(_tokenizer.TokenType.RPAREN);
	
	      if (!this.hasLineTerminatorBeforeNext && this.match(_tokenizer.TokenType.ARROW)) {
	        if (!this.isBindingElement) {
	          throw this.createErrorWithLocation(start, _errors.ErrorMessages.ILLEGAL_ARROW_FUNCTION_PARAMS);
	        }
	
	        this.isBindingElement = false;
	        return { type: ARROW_EXPRESSION_PARAMS, params: params, rest: rest };
	      } else {
	        // Ensure assignment pattern:
	        if (rest) {
	          this.ensureArrow();
	        }
	        this.isBindingElement = false;
	        return group;
	      }
	    }
	  }, {
	    key: "parseArrayExpression",
	    value: function parseArrayExpression() {
	      var startLocation = this.getLocation();
	
	      this.lex();
	
	      var exprs = [];
	
	      while (true) {
	        if (this.match(_tokenizer.TokenType.RBRACK)) {
	          break;
	        }
	        if (this.eat(_tokenizer.TokenType.COMMA)) {
	          exprs.push(null);
	        } else {
	          var elementLocation = this.getLocation();
	          var expr = undefined;
	          if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
	            // Spread/Rest element
	            expr = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
	            if (!this.isAssignmentTarget && this.firstExprError) {
	              throw this.firstExprError;
	            }
	            expr = this.markLocation({ type: "SpreadElement", expression: expr }, elementLocation);
	            if (!this.match(_tokenizer.TokenType.RBRACK)) {
	              this.isBindingElement = this.isAssignmentTarget = false;
	            }
	          } else {
	            expr = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
	            if (!this.isAssignmentTarget && this.firstExprError) {
	              throw this.firstExprError;
	            }
	          }
	          exprs.push(expr);
	
	          if (!this.match(_tokenizer.TokenType.RBRACK)) {
	            this.expect(_tokenizer.TokenType.COMMA);
	          }
	        }
	      }
	
	      this.expect(_tokenizer.TokenType.RBRACK);
	
	      return this.markLocation({ type: "ArrayExpression", elements: exprs }, startLocation);
	    }
	  }, {
	    key: "parseObjectExpression",
	    value: function parseObjectExpression() {
	      var startLocation = this.getLocation();
	
	      this.lex();
	
	      var properties = [];
	      while (!this.match(_tokenizer.TokenType.RBRACE)) {
	        var property = this.inheritCoverGrammar(this.parsePropertyDefinition);
	        properties.push(property);
	        if (!this.match(_tokenizer.TokenType.RBRACE)) {
	          this.expect(_tokenizer.TokenType.COMMA);
	        }
	      }
	      this.expect(_tokenizer.TokenType.RBRACE);
	      return this.markLocation({ type: "ObjectExpression", properties: properties }, startLocation);
	    }
	  }, {
	    key: "parsePropertyDefinition",
	    value: function parsePropertyDefinition() {
	      var startLocation = this.getLocation();
	      var token = this.lookahead;
	
	      var _parseMethodDefinitio = this.parseMethodDefinition();
	
	      var methodOrKey = _parseMethodDefinitio.methodOrKey;
	      var kind = _parseMethodDefinitio.kind;
	
	      switch (kind) {
	        case "method":
	          this.isBindingElement = this.isAssignmentTarget = false;
	          return methodOrKey;
	        case "identifier":
	          if (this.eat(_tokenizer.TokenType.ASSIGN)) {
	            // CoverInitializedName
	            var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
	            this.firstExprError = this.createErrorWithLocation(startLocation, _errors.ErrorMessages.ILLEGAL_PROPERTY);
	            return this.markLocation({
	              type: "BindingPropertyIdentifier",
	              binding: this.transformDestructuring(methodOrKey),
	              init: init
	            }, startLocation);
	          } else if (!this.match(_tokenizer.TokenType.COLON)) {
	            if (token.type !== _tokenizer.TokenType.IDENTIFIER && token.type !== _tokenizer.TokenType.YIELD && token.type !== _tokenizer.TokenType.LET) {
	              throw this.createUnexpected(token);
	            }
	            return this.markLocation({ type: "ShorthandProperty", name: methodOrKey.value }, startLocation);
	          }
	      }
	
	      // DataProperty
	      this.expect(_tokenizer.TokenType.COLON);
	
	      var expr = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
	      return this.markLocation({ type: "DataProperty", name: methodOrKey, expression: expr }, startLocation);
	    }
	  }, {
	    key: "parsePropertyName",
	    value: function parsePropertyName() {
	      // PropertyName[Yield,GeneratorParameter]:
	      var token = this.lookahead;
	      var startLocation = this.getLocation();
	
	      if (this.eof()) {
	        throw this.createUnexpected(token);
	      }
	
	      switch (token.type) {
	        case _tokenizer.TokenType.STRING:
	          return {
	            name: this.markLocation({
	              type: "StaticPropertyName",
	              value: this.parseStringLiteral().value
	            }, startLocation),
	            binding: null
	          };
	        case _tokenizer.TokenType.NUMBER:
	          var numLiteral = this.parseNumericLiteral();
	          return {
	            name: this.markLocation({
	              type: "StaticPropertyName",
	              value: "" + (numLiteral.type === "LiteralInfinityExpression" ? 1 / 0 : numLiteral.value)
	            }, startLocation),
	            binding: null
	          };
	        case _tokenizer.TokenType.LBRACK:
	          var previousYield = this.allowYieldExpression;
	          this.lex();
	          var expr = this.parseAssignmentExpression();
	          this.expect(_tokenizer.TokenType.RBRACK);
	          this.allowYieldExpression = previousYield;
	          return { name: this.markLocation({ type: "ComputedPropertyName", expression: expr }, startLocation), binding: null };
	      }
	
	      var name = this.parseIdentifierName();
	      return {
	        name: this.markLocation({ type: "StaticPropertyName", value: name }, startLocation),
	        binding: this.markLocation({ type: "BindingIdentifier", name: name }, startLocation)
	      };
	    }
	
	    /**
	     * Test if lookahead can be the beginning of a `PropertyName`.
	     * @returns {boolean}
	     */
	
	  }, {
	    key: "lookaheadPropertyName",
	    value: function lookaheadPropertyName() {
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.NUMBER:
	        case _tokenizer.TokenType.STRING:
	        case _tokenizer.TokenType.LBRACK:
	          return true;
	        default:
	          return this.lookahead.type.klass.isIdentifierName;
	      }
	    }
	
	    /**
	     * Try to parse a method definition.
	     *
	     * If it turns out to be one of:
	     *  * `IdentifierReference`
	     *  * `CoverInitializedName` (`IdentifierReference "=" AssignmentExpression`)
	     *  * `PropertyName : AssignmentExpression`
	     * The parser will stop at the end of the leading `Identifier` or `PropertyName` and return it.
	     *
	     * @returns {{methodOrKey: (Method|PropertyName), kind: string}}
	     */
	
	  }, {
	    key: "parseMethodDefinition",
	    value: function parseMethodDefinition() {
	      var token = this.lookahead;
	      var startLocation = this.getLocation();
	
	      var isGenerator = !!this.eat(_tokenizer.TokenType.MUL);
	
	      var _parsePropertyName = this.parsePropertyName();
	
	      var name = _parsePropertyName.name;
	      var binding = _parsePropertyName.binding;
	
	      if (!isGenerator && token.type === _tokenizer.TokenType.IDENTIFIER) {
	        var _name = token.value;
	        if (_name.length === 3) {
	          // Property Assignment: Getter and Setter.
	          if (_name === "get" && this.lookaheadPropertyName()) {
	            var _parsePropertyName2 = this.parsePropertyName();
	
	            _name = _parsePropertyName2.name;
	
	            this.expect(_tokenizer.TokenType.LPAREN);
	            this.expect(_tokenizer.TokenType.RPAREN);
	            var body = this.parseFunctionBody();
	            return {
	              methodOrKey: this.markLocation({ type: "Getter", name: _name, body: body }, startLocation),
	              kind: "method"
	            };
	          } else if (_name === "set" && this.lookaheadPropertyName()) {
	            var _parsePropertyName3 = this.parsePropertyName();
	
	            _name = _parsePropertyName3.name;
	
	            this.expect(_tokenizer.TokenType.LPAREN);
	            var param = this.parseBindingElement();
	            this.expect(_tokenizer.TokenType.RPAREN);
	            var previousYield = this.allowYieldExpression;
	            this.allowYieldExpression = false;
	            var body = this.parseFunctionBody();
	            this.allowYieldExpression = previousYield;
	            return {
	              methodOrKey: this.markLocation({ type: "Setter", name: _name, param: param, body: body }, startLocation),
	              kind: "method"
	            };
	          }
	        }
	      }
	
	      if (this.match(_tokenizer.TokenType.LPAREN)) {
	        var previousYield = this.allowYieldExpression;
	        this.allowYieldExpression = isGenerator;
	        var params = this.parseParams();
	        this.allowYieldExpression = isGenerator;
	        var body = this.parseFunctionBody();
	        this.allowYieldExpression = previousYield;
	
	        return {
	          methodOrKey: this.markLocation({ type: "Method", isGenerator: isGenerator, name: name, params: params, body: body }, startLocation),
	          kind: "method"
	        };
	      }
	
	      if (isGenerator && this.match(_tokenizer.TokenType.COLON)) {
	        throw this.createUnexpected(this.lookahead);
	      }
	
	      return {
	        methodOrKey: name,
	        kind: token.type.klass.isIdentifierName ? "identifier" : "property",
	        binding: binding
	      };
	    }
	  }, {
	    key: "parseClass",
	    value: function parseClass(_ref2) {
	      var _this5 = this;
	
	      var isExpr = _ref2.isExpr;
	      var inDefault = _ref2.inDefault;
	
	      var startLocation = this.getLocation();
	
	      this.lex();
	      var name = null;
	      var heritage = null;
	
	      if (this.match(_tokenizer.TokenType.IDENTIFIER)) {
	        name = this.parseBindingIdentifier();
	      } else if (!isExpr) {
	        if (inDefault) {
	          name = { type: "BindingIdentifier", name: "*default*" };
	        } else {
	          throw this.createUnexpected(this.lookahead);
	        }
	      }
	
	      var previousParamYield = this.allowYieldExpression;
	
	      if (isExpr) {
	        this.allowYieldExpression = false;
	      }
	
	      if (this.eat(_tokenizer.TokenType.EXTENDS)) {
	        heritage = this.isolateCoverGrammar(function () {
	          return _this5.parseLeftHandSideExpression({ allowCall: true });
	        });
	      }
	
	      this.expect(_tokenizer.TokenType.LBRACE);
	      var elements = [];
	      while (!this.eat(_tokenizer.TokenType.RBRACE)) {
	        if (this.eat(_tokenizer.TokenType.SEMICOLON)) {
	          continue;
	        }
	        var isStatic = false;
	
	        var _parseMethodDefinitio2 = this.parseMethodDefinition();
	
	        var methodOrKey = _parseMethodDefinitio2.methodOrKey;
	        var kind = _parseMethodDefinitio2.kind;
	
	        if (kind === "identifier" && methodOrKey.value === "static") {
	          isStatic = true;
	
	          var _parseMethodDefinitio3 = this.parseMethodDefinition();
	
	          methodOrKey = _parseMethodDefinitio3.methodOrKey;
	          kind = _parseMethodDefinitio3.kind;
	        }
	        if (kind === "method") {
	          elements.push(copyLocation(methodOrKey, { type: "ClassElement", isStatic: isStatic, method: methodOrKey }));
	        } else {
	          throw this.createError("Only methods are allowed in classes");
	        }
	      }
	      this.allowYieldExpression = previousParamYield;
	      return this.markLocation({ type: isExpr ? "ClassExpression" : "ClassDeclaration", name: name, super: heritage, elements: elements }, startLocation);
	    }
	  }, {
	    key: "parseFunction",
	    value: function parseFunction(_ref3) {
	      var isExpr = _ref3.isExpr;
	      var inDefault = _ref3.inDefault;
	      var allowGenerator = _ref3.allowGenerator;
	
	      var startLocation = this.getLocation();
	
	      this.lex();
	
	      var name = null;
	      var isGenerator = allowGenerator && !!this.eat(_tokenizer.TokenType.MUL);
	
	      var previousYield = this.allowYieldExpression;
	
	      if (isExpr) {
	        this.allowYieldExpression = isGenerator;
	      }
	
	      if (!this.match(_tokenizer.TokenType.LPAREN)) {
	        name = this.parseBindingIdentifier();
	      } else if (!isExpr) {
	        if (inDefault) {
	          name = { type: "BindingIdentifier", name: "*default*" };
	        } else {
	          throw this.createUnexpected(this.lookahead);
	        }
	      }
	
	      this.allowYieldExpression = isGenerator;
	      var params = this.parseParams();
	      this.allowYieldExpression = isGenerator;
	      var body = this.parseFunctionBody();
	      this.allowYieldExpression = previousYield;
	
	      var type = isExpr ? "FunctionExpression" : "FunctionDeclaration";
	      return this.markLocation({ type: type, isGenerator: isGenerator, name: name, params: params, body: body }, startLocation);
	    }
	  }, {
	    key: "parseArrayBinding",
	    value: function parseArrayBinding() {
	      var startLocation = this.getLocation();
	
	      this.expect(_tokenizer.TokenType.LBRACK);
	
	      var elements = [],
	          restElement = null;
	
	      while (true) {
	        if (this.match(_tokenizer.TokenType.RBRACK)) {
	          break;
	        }
	        var el = undefined;
	
	        if (this.eat(_tokenizer.TokenType.COMMA)) {
	          el = null;
	        } else {
	          if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
	            restElement = this.parseBindingTarget();
	            break;
	          } else {
	            el = this.parseBindingElement();
	          }
	          if (!this.match(_tokenizer.TokenType.RBRACK)) {
	            this.expect(_tokenizer.TokenType.COMMA);
	          }
	        }
	        elements.push(el);
	      }
	
	      this.expect(_tokenizer.TokenType.RBRACK);
	
	      return this.markLocation({ type: "ArrayBinding", elements: elements, restElement: restElement }, startLocation);
	    }
	  }, {
	    key: "parseBindingProperty",
	    value: function parseBindingProperty() {
	      var startLocation = this.getLocation();
	      var token = this.lookahead;
	
	      var _parsePropertyName4 = this.parsePropertyName();
	
	      var name = _parsePropertyName4.name;
	      var binding = _parsePropertyName4.binding;
	
	      if ((token.type === _tokenizer.TokenType.IDENTIFIER || token.type === _tokenizer.TokenType.LET || token.type === _tokenizer.TokenType.YIELD) && name.type === "StaticPropertyName") {
	        if (!this.match(_tokenizer.TokenType.COLON)) {
	          var defaultValue = null;
	          if (this.eat(_tokenizer.TokenType.ASSIGN)) {
	            var previousAllowYieldExpression = this.allowYieldExpression;
	            var expr = this.parseAssignmentExpression();
	            defaultValue = expr;
	            this.allowYieldExpression = previousAllowYieldExpression;
	          } else if (token.type === _tokenizer.TokenType.YIELD && this.allowYieldExpression) {
	            throw this.createUnexpected(token);
	          }
	          return this.markLocation({
	            type: "BindingPropertyIdentifier",
	            binding: binding,
	            init: defaultValue
	          }, startLocation);
	        }
	      }
	      this.expect(_tokenizer.TokenType.COLON);
	      binding = this.parseBindingElement();
	      return this.markLocation({ type: "BindingPropertyProperty", name: name, binding: binding }, startLocation);
	    }
	  }, {
	    key: "parseObjectBinding",
	    value: function parseObjectBinding() {
	      var startLocation = this.getLocation();
	
	      this.expect(_tokenizer.TokenType.LBRACE);
	
	      var properties = [];
	      while (!this.match(_tokenizer.TokenType.RBRACE)) {
	        properties.push(this.parseBindingProperty());
	        if (!this.match(_tokenizer.TokenType.RBRACE)) {
	          this.expect(_tokenizer.TokenType.COMMA);
	        }
	      }
	
	      this.expect(_tokenizer.TokenType.RBRACE);
	
	      return this.markLocation({ type: "ObjectBinding", properties: properties }, startLocation);
	    }
	  }, {
	    key: "parseBindingTarget",
	    value: function parseBindingTarget() {
	      switch (this.lookahead.type) {
	        case _tokenizer.TokenType.IDENTIFIER:
	        case _tokenizer.TokenType.LET:
	        case _tokenizer.TokenType.YIELD:
	          return this.parseBindingIdentifier();
	        case _tokenizer.TokenType.LBRACK:
	          return this.parseArrayBinding();
	        case _tokenizer.TokenType.LBRACE:
	          return this.parseObjectBinding();
	      }
	      throw this.createUnexpected(this.lookahead);
	    }
	  }, {
	    key: "parseBindingElement",
	    value: function parseBindingElement() {
	      var startLocation = this.getLocation();
	      var binding = this.parseBindingTarget();
	
	      if (this.eat(_tokenizer.TokenType.ASSIGN)) {
	        var previousYieldExpression = this.allowYieldExpression;
	        var init = this.parseAssignmentExpression();
	        binding = this.markLocation({ type: "BindingWithDefault", binding: binding, init: init }, startLocation);
	        this.allowYieldExpression = previousYieldExpression;
	      }
	      return binding;
	    }
	  }, {
	    key: "parseParam",
	    value: function parseParam() {
	      var previousInParameter = this.inParameter;
	      this.inParameter = true;
	      var param = this.parseBindingElement();
	      this.inParameter = previousInParameter;
	      return param;
	    }
	  }, {
	    key: "parseParams",
	    value: function parseParams() {
	      var paramsLocation = this.getLocation();
	
	      this.expect(_tokenizer.TokenType.LPAREN);
	
	      var items = [],
	          rest = null;
	      if (!this.match(_tokenizer.TokenType.RPAREN)) {
	        while (!this.eof()) {
	          if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
	            rest = this.parseBindingIdentifier();
	            break;
	          }
	          items.push(this.parseParam());
	          if (this.match(_tokenizer.TokenType.RPAREN)) break;
	          this.expect(_tokenizer.TokenType.COMMA);
	        }
	      }
	
	      this.expect(_tokenizer.TokenType.RPAREN);
	
	      return this.markLocation({ type: "FormalParameters", items: items, rest: rest }, paramsLocation);
	    }
	  }]);
	
	  return Parser;
	}(_tokenizer2.default);

/***/ },

/***/ "./node_modules/shift-parser/dist/early-errors.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EarlyErrorChecker = undefined;
	
	var _shiftReducer = __webpack_require__("./node_modules/shift-reducer/dist/index.js");
	
	var _shiftReducer2 = _interopRequireDefault(_shiftReducer);
	
	var _utils = __webpack_require__("./node_modules/shift-parser/dist/utils.js");
	
	var _earlyErrorState = __webpack_require__("./node_modules/shift-parser/dist/early-error-state.js");
	
	var _patternAcceptor = __webpack_require__("./node_modules/shift-parser/dist/pattern-acceptor.js");
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014 Shape Security, Inc.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License")
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	function isStrictFunctionBody(_ref) {
	  var directives = _ref.directives;
	
	  return directives.some(function (directive) {
	    return directive.rawValue === "use strict";
	  });
	}
	
	function containsDuplicates(list) {
	  var uniqs = [];
	  for (var i = 0, l = list.length; i < l; ++i) {
	    var item = list[i];
	    if (uniqs.indexOf(item) >= 0) {
	      return true;
	    }
	    uniqs.push(item);
	  }
	  return false;
	}
	
	function isLabelledFunction(node) {
	  return node.type === "LabeledStatement" && (node.body.type === "FunctionDeclaration" || isLabelledFunction(node.body));
	}
	
	function isIterationStatement(node) {
	  switch (node.type) {
	    case "LabeledStatement":
	      return isIterationStatement(node.body);
	    case "DoWhileStatement":
	    case "ForInStatement":
	    case "ForOfStatement":
	    case "ForStatement":
	    case "WhileStatement":
	      return true;
	  }
	  return false;
	}
	
	function isSpecialMethod(methodDefinition) {
	  if (methodDefinition.name.type !== "StaticPropertyName" || methodDefinition.name.value !== "constructor") {
	    return false;
	  }
	  switch (methodDefinition.type) {
	    case "Getter":
	    case "Setter":
	      return true;
	    case "Method":
	      return methodDefinition.isGenerator;
	  }
	  /* istanbul ignore next */
	  throw new Error("not reached");
	}
	
	function enforceDuplicateConstructorMethods(node, s) {
	  var ctors = node.elements.filter(function (e) {
	    return !e.isStatic && e.method.type === "Method" && !e.method.isGenerator && e.method.name.type === "StaticPropertyName" && e.method.name.value === "constructor";
	  });
	  if (ctors.length > 1) {
	    ctors.slice(1).forEach(function (ctor) {
	      s = s.addError(new _earlyErrorState.EarlyError(ctor, "Duplicate constructor method in class"));
	    });
	  }
	  return s;
	}
	
	var SUPERCALL_ERROR = function SUPERCALL_ERROR(node) {
	  return new _earlyErrorState.EarlyError(node, "Calls to super must be in the \"constructor\" method of a class expression or class declaration that has a superclass");
	};
	var SUPERPROPERTY_ERROR = function SUPERPROPERTY_ERROR(node) {
	  return new _earlyErrorState.EarlyError(node, "Member access on super must be in a method");
	};
	var DUPLICATE_BINDING = function DUPLICATE_BINDING(node) {
	  return new _earlyErrorState.EarlyError(node, "Duplicate binding " + JSON.stringify(node.name));
	};
	var FREE_CONTINUE = function FREE_CONTINUE(node) {
	  return new _earlyErrorState.EarlyError(node, "Continue statement must be nested within an iteration statement");
	};
	var UNBOUND_CONTINUE = function UNBOUND_CONTINUE(node) {
	  return new _earlyErrorState.EarlyError(node, "Continue statement must be nested within an iteration statement with label " + JSON.stringify(node.label));
	};
	var FREE_BREAK = function FREE_BREAK(node) {
	  return new _earlyErrorState.EarlyError(node, "Break statement must be nested within an iteration statement or a switch statement");
	};
	var UNBOUND_BREAK = function UNBOUND_BREAK(node) {
	  return new _earlyErrorState.EarlyError(node, "Break statement must be nested within a statement with label " + JSON.stringify(node.label));
	};
	
	var EarlyErrorChecker = exports.EarlyErrorChecker = function (_MonoidalReducer) {
	  _inherits(EarlyErrorChecker, _MonoidalReducer);
	
	  function EarlyErrorChecker() {
	    _classCallCheck(this, EarlyErrorChecker);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(EarlyErrorChecker).call(this, _earlyErrorState.EarlyErrorState));
	  }
	
	  _createClass(EarlyErrorChecker, [{
	    key: "reduceAssignmentExpression",
	    value: function reduceAssignmentExpression() {
	      return _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceAssignmentExpression", this).apply(this, arguments).clearBoundNames();
	    }
	  }, {
	    key: "reduceArrowExpression",
	    value: function reduceArrowExpression(node, _ref2) {
	      var params = _ref2.params;
	      var body = _ref2.body;
	
	      params = params.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      if (node.body.type === "FunctionBody") {
	        body = body.enforceConflictingLexicallyDeclaredNames(params.lexicallyDeclaredNames, DUPLICATE_BINDING);
	        if (isStrictFunctionBody(node.body)) {
	          params = params.enforceStrictErrors();
	          body = body.enforceStrictErrors();
	        }
	      }
	      body.yieldExpressions.forEach(function (node) {
	        body = body.addError(new _earlyErrorState.EarlyError(node, "Concise arrow bodies must not contain yield expressions"));
	      });
	      params.yieldExpressions.forEach(function (node) {
	        params = params.addError(new _earlyErrorState.EarlyError(node, "Arrow parameters must not contain yield expressions"));
	      });
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceArrowExpression", this).call(this, node, { params: params, body: body });
	      s = s.clearYieldExpressions();
	      s = s.observeVarBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceBindingIdentifier",
	    value: function reduceBindingIdentifier(node) {
	      var s = this.identity;
	      if ((0, _utils.isRestrictedWord)(node.name) || (0, _utils.isStrictModeReservedWord)(node.name)) {
	        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "The identifier " + JSON.stringify(node.name) + " must not be in binding position in strict mode"));
	      }
	      s = s.bindName(node.name, node);
	      return s;
	    }
	  }, {
	    key: "reduceBlock",
	    value: function reduceBlock() {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceBlock", this).apply(this, arguments);
	      s = s.functionDeclarationNamesAreLexical();
	      s = s.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      s = s.enforceConflictingLexicallyDeclaredNames(s.varDeclaredNames, DUPLICATE_BINDING);
	      s = s.observeLexicalBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceBreakStatement",
	    value: function reduceBreakStatement(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceBreakStatement", this).apply(this, arguments);
	      s = node.label == null ? s.addFreeBreakStatement(node) : s.addFreeLabeledBreakStatement(node);
	      return s;
	    }
	  }, {
	    key: "reduceCallExpression",
	    value: function reduceCallExpression(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceCallExpression", this).apply(this, arguments);
	      if (node.callee.type === "Super") {
	        s = s.observeSuperCallExpression(node);
	      }
	      return s;
	    }
	  }, {
	    key: "reduceCatchClause",
	    value: function reduceCatchClause(node, _ref3) {
	      var binding = _ref3.binding;
	      var body = _ref3.body;
	
	      binding = binding.observeLexicalDeclaration();
	      binding = binding.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      binding = binding.enforceConflictingLexicallyDeclaredNames(body.previousLexicallyDeclaredNames, DUPLICATE_BINDING);
	      binding.lexicallyDeclaredNames.forEachEntry(function (nodes, bindingName) {
	        if (body.varDeclaredNames.has(bindingName)) {
	          body.varDeclaredNames.get(bindingName).forEach(function (conflictingNode) {
	            if (body.forOfVarDeclaredNames.indexOf(conflictingNode) >= 0) {
	              binding = binding.addError(DUPLICATE_BINDING(conflictingNode));
	            }
	          });
	        }
	      });
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceCatchClause", this).call(this, node, { binding: binding, body: body });
	      s = s.observeLexicalBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceClassDeclaration",
	    value: function reduceClassDeclaration(node, _ref4) {
	      var name = _ref4.name;
	      var _super = _ref4.super;
	      var elements = _ref4.elements;
	
	      var s = name;
	      var sElements = this.fold(elements);
	      sElements = sElements.enforceStrictErrors();
	      if (node.super != null) {
	        _super = _super.enforceStrictErrors();
	        s = this.append(s, _super);
	        sElements = sElements.clearSuperCallExpressionsInConstructorMethod();
	      }
	      sElements = sElements.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      sElements = sElements.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
	      s = this.append(s, sElements);
	      s = enforceDuplicateConstructorMethods(node, s);
	      s = s.observeLexicalDeclaration();
	      return s;
	    }
	  }, {
	    key: "reduceClassElement",
	    value: function reduceClassElement(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceClassElement", this).apply(this, arguments);
	      if (!node.isStatic && isSpecialMethod(node.method)) {
	        s = s.addError(new _earlyErrorState.EarlyError(node, "Constructors cannot be generators, getters or setters"));
	      }
	      if (node.isStatic && node.method.name.type === "StaticPropertyName" && node.method.name.value === "prototype") {
	        s = s.addError(new _earlyErrorState.EarlyError(node, "Static class methods cannot be named \"prototype\""));
	      }
	      return s;
	    }
	  }, {
	    key: "reduceClassExpression",
	    value: function reduceClassExpression(node, _ref5) {
	      var name = _ref5.name;
	      var _super = _ref5.super;
	      var elements = _ref5.elements;
	
	      var s = node.name == null ? this.identity : name;
	      var sElements = this.fold(elements);
	      sElements = sElements.enforceStrictErrors();
	      if (node.super != null) {
	        _super = _super.enforceStrictErrors();
	        s = this.append(s, _super);
	        sElements = sElements.clearSuperCallExpressionsInConstructorMethod();
	      }
	      sElements = sElements.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      sElements = sElements.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
	      s = this.append(s, sElements);
	      s = enforceDuplicateConstructorMethods(node, s);
	      s = s.clearBoundNames();
	      return s;
	    }
	  }, {
	    key: "reduceCompoundAssignmentExpression",
	    value: function reduceCompoundAssignmentExpression() {
	      return _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceCompoundAssignmentExpression", this).apply(this, arguments).clearBoundNames();
	    }
	  }, {
	    key: "reduceComputedMemberExpression",
	    value: function reduceComputedMemberExpression(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceComputedMemberExpression", this).apply(this, arguments);
	      if (node.object.type === "Super") {
	        s = s.observeSuperPropertyExpression(node);
	      }
	      return s;
	    }
	  }, {
	    key: "reduceContinueStatement",
	    value: function reduceContinueStatement(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceContinueStatement", this).apply(this, arguments);
	      s = node.label == null ? s.addFreeContinueStatement(node) : s.addFreeLabeledContinueStatement(node);
	      return s;
	    }
	  }, {
	    key: "reduceDoWhileStatement",
	    value: function reduceDoWhileStatement(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceDoWhileStatement", this).apply(this, arguments);
	      if (isLabelledFunction(node.body)) {
	        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a do-while statement must not be a labeled function declaration"));
	      }
	      s = s.clearFreeContinueStatements();
	      s = s.clearFreeBreakStatements();
	      return s;
	    }
	  }, {
	    key: "reduceExport",
	    value: function reduceExport() {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceExport", this).apply(this, arguments);
	      s = s.functionDeclarationNamesAreLexical();
	      s = s.exportDeclaredNames();
	      return s;
	    }
	  }, {
	    key: "reduceExportFrom",
	    value: function reduceExportFrom(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceExportFrom", this).apply(this, arguments);
	      if (node.moduleSpecifier != null) {
	        s = s.clearExportedBindings();
	      }
	      return s;
	    }
	  }, {
	    key: "reduceExportSpecifier",
	    value: function reduceExportSpecifier(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceExportSpecifier", this).apply(this, arguments);
	      s = s.exportName(node.exportedName, node);
	      s = s.exportBinding(node.name || node.exportedName, node);
	      return s;
	    }
	  }, {
	    key: "reduceExportDefault",
	    value: function reduceExportDefault(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceExportDefault", this).apply(this, arguments);
	      s = s.functionDeclarationNamesAreLexical();
	      switch (node.body.type) {
	        case "FunctionDeclaration":
	        case "ClassDeclaration":
	          if (node.body.name.name !== "*default*") {
	            s = s.exportDeclaredNames();
	          }
	          break;
	      }
	      s = s.exportName("*default*", node);
	      return s;
	    }
	  }, {
	    key: "reduceFormalParameters",
	    value: function reduceFormalParameters() {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceFormalParameters", this).apply(this, arguments);
	      s = s.observeLexicalDeclaration();
	      return s;
	    }
	  }, {
	    key: "reduceForStatement",
	    value: function reduceForStatement(node, _ref6) {
	      var init = _ref6.init;
	      var test = _ref6.test;
	      var update = _ref6.update;
	      var body = _ref6.body;
	
	      if (init != null) {
	        init = init.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	        init = init.enforceConflictingLexicallyDeclaredNames(body.varDeclaredNames, DUPLICATE_BINDING);
	      }
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceForStatement", this).call(this, node, { init: init, test: test, update: update, body: body });
	      if (node.init != null && node.init.type === "VariableDeclaration" && node.init.kind === "const") {
	        node.init.declarators.forEach(function (declarator) {
	          if (declarator.init == null) {
	            s = s.addError(new _earlyErrorState.EarlyError(declarator, "Constant lexical declarations must have an initialiser"));
	          }
	        });
	      }
	      if (isLabelledFunction(node.body)) {
	        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a for statement must not be a labeled function declaration"));
	      }
	      s = s.clearFreeContinueStatements();
	      s = s.clearFreeBreakStatements();
	      s = s.observeLexicalBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceForInStatement",
	    value: function reduceForInStatement(node, _ref7) {
	      var left = _ref7.left;
	      var right = _ref7.right;
	      var body = _ref7.body;
	
	      left = left.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      left = left.enforceConflictingLexicallyDeclaredNames(body.varDeclaredNames, DUPLICATE_BINDING);
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceForInStatement", this).call(this, node, { left: left, right: right, body: body });
	      if (isLabelledFunction(node.body)) {
	        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a for-in statement must not be a labeled function declaration"));
	      }
	      s = s.clearFreeContinueStatements();
	      s = s.clearFreeBreakStatements();
	      s = s.observeLexicalBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceForOfStatement",
	    value: function reduceForOfStatement(node, _ref8) {
	      var left = _ref8.left;
	      var right = _ref8.right;
	      var body = _ref8.body;
	
	      left = left.recordForOfVars();
	      left = left.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      left = left.enforceConflictingLexicallyDeclaredNames(body.varDeclaredNames, DUPLICATE_BINDING);
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceForOfStatement", this).call(this, node, { left: left, right: right, body: body });
	      if (isLabelledFunction(node.body)) {
	        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a for-of statement must not be a labeled function declaration"));
	      }
	      s = s.clearFreeContinueStatements();
	      s = s.clearFreeBreakStatements();
	      s = s.observeLexicalBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceFunctionBody",
	    value: function reduceFunctionBody(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceFunctionBody", this).apply(this, arguments);
	      s = s.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      s = s.enforceConflictingLexicallyDeclaredNames(s.varDeclaredNames, DUPLICATE_BINDING);
	      s = s.enforceFreeContinueStatementErrors(FREE_CONTINUE);
	      s = s.enforceFreeLabeledContinueStatementErrors(UNBOUND_CONTINUE);
	      s = s.enforceFreeBreakStatementErrors(FREE_BREAK);
	      s = s.enforceFreeLabeledBreakStatementErrors(UNBOUND_BREAK);
	      s = s.clearUsedLabelNames();
	      s = s.clearYieldExpressions();
	      if (isStrictFunctionBody(node)) {
	        s = s.enforceStrictErrors();
	      }
	      return s;
	    }
	  }, {
	    key: "reduceFunctionDeclaration",
	    value: function reduceFunctionDeclaration(node, _ref9) {
	      var name = _ref9.name;
	      var params = _ref9.params;
	      var body = _ref9.body;
	
	      var isSimpleParameterList = node.params.rest == null && node.params.items.every(function (i) {
	        return i.type === "BindingIdentifier";
	      });
	      var addError = !isSimpleParameterList || node.isGenerator ? "addError" : "addStrictError";
	      params.lexicallyDeclaredNames.forEachEntry(function (nodes /*, bindingName*/) {
	        if (nodes.length > 1) {
	          nodes.slice(1).forEach(function (dupeNode) {
	            params = params[addError](DUPLICATE_BINDING(dupeNode));
	          });
	        }
	      });
	      body = body.enforceConflictingLexicallyDeclaredNames(params.lexicallyDeclaredNames, DUPLICATE_BINDING);
	      body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      body = body.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
	      params = params.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      params = params.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
	      if (node.isGenerator) {
	        params.yieldExpressions.forEach(function (node) {
	          params = params.addError(new _earlyErrorState.EarlyError(node, "Generator parameters must not contain yield expressions"));
	        });
	      }
	      params = params.clearNewTargetExpressions();
	      body = body.clearNewTargetExpressions();
	      if (isStrictFunctionBody(node.body)) {
	        params = params.enforceStrictErrors();
	        body = body.enforceStrictErrors();
	      }
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceFunctionDeclaration", this).call(this, node, { name: name, params: params, body: body });
	      s = s.clearYieldExpressions();
	      s = s.observeFunctionDeclaration();
	      return s;
	    }
	  }, {
	    key: "reduceFunctionExpression",
	    value: function reduceFunctionExpression(node, _ref10) {
	      var name = _ref10.name;
	      var params = _ref10.params;
	      var body = _ref10.body;
	
	      var isSimpleParameterList = node.params.rest == null && node.params.items.every(function (i) {
	        return i.type === "BindingIdentifier";
	      });
	      var addError = !isSimpleParameterList || node.isGenerator ? "addError" : "addStrictError";
	      params.lexicallyDeclaredNames.forEachEntry(function (nodes, bindingName) {
	        if (nodes.length > 1) {
	          nodes.slice(1).forEach(function (dupeNode) {
	            params = params[addError](new _earlyErrorState.EarlyError(dupeNode, "Duplicate binding " + JSON.stringify(bindingName)));
	          });
	        }
	      });
	      body = body.enforceConflictingLexicallyDeclaredNames(params.lexicallyDeclaredNames, DUPLICATE_BINDING);
	      body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      body = body.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
	      params = params.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      params = params.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
	      if (node.isGenerator) {
	        params.yieldExpressions.forEach(function (node) {
	          params = params.addError(new _earlyErrorState.EarlyError(node, "Generator parameters must not contain yield expressions"));
	        });
	      }
	      params = params.clearNewTargetExpressions();
	      body = body.clearNewTargetExpressions();
	      if (isStrictFunctionBody(node.body)) {
	        params = params.enforceStrictErrors();
	        body = body.enforceStrictErrors();
	      }
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceFunctionExpression", this).call(this, node, { name: name, params: params, body: body });
	      s = s.clearBoundNames();
	      s = s.clearYieldExpressions();
	      s = s.observeVarBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceGetter",
	    value: function reduceGetter(node, _ref11) {
	      var name = _ref11.name;
	      var body = _ref11.body;
	
	      body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      body = body.clearSuperPropertyExpressions();
	      body = body.clearNewTargetExpressions();
	      if (isStrictFunctionBody(node.body)) {
	        body = body.enforceStrictErrors();
	      }
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceGetter", this).call(this, node, { name: name, body: body });
	      s = s.observeVarBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceIdentifierExpression",
	    value: function reduceIdentifierExpression(node) {
	      var s = this.identity;
	      if ((0, _utils.isStrictModeReservedWord)(node.name)) {
	        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "The identifier " + JSON.stringify(node.name) + " must not be in expression position in strict mode"));
	      }
	      return s;
	    }
	  }, {
	    key: "reduceIfStatement",
	    value: function reduceIfStatement(node, _ref12) {
	      var test = _ref12.test;
	      var consequent = _ref12.consequent;
	      var alternate = _ref12.alternate;
	
	      if (isLabelledFunction(node.consequent)) {
	        consequent = consequent.addError(new _earlyErrorState.EarlyError(node.consequent, "The consequent of an if statement must not be a labeled function declaration"));
	      }
	      if (node.alternate != null && isLabelledFunction(node.alternate)) {
	        alternate = alternate.addError(new _earlyErrorState.EarlyError(node.alternate, "The alternate of an if statement must not be a labeled function declaration"));
	      }
	      if (node.consequent.type === "FunctionDeclaration") {
	        consequent = consequent.addStrictError(new _earlyErrorState.EarlyError(node.consequent, "FunctionDeclarations in IfStatements are disallowed in strict mode"));
	        consequent = consequent.observeLexicalBoundary();
	      }
	      if (node.alternate != null && node.alternate.type === "FunctionDeclaration") {
	        alternate = alternate.addStrictError(new _earlyErrorState.EarlyError(node.alternate, "FunctionDeclarations in IfStatements are disallowed in strict mode"));
	        alternate = alternate.observeLexicalBoundary();
	      }
	      return _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceIfStatement", this).call(this, node, { test: test, consequent: consequent, alternate: alternate });
	    }
	  }, {
	    key: "reduceImport",
	    value: function reduceImport() {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceImport", this).apply(this, arguments);
	      s = s.observeLexicalDeclaration();
	      return s;
	    }
	  }, {
	    key: "reduceImportNamespace",
	    value: function reduceImportNamespace() {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceImportNamespace", this).apply(this, arguments);
	      s = s.observeLexicalDeclaration();
	      return s;
	    }
	  }, {
	    key: "reduceLabeledStatement",
	    value: function reduceLabeledStatement(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceLabeledStatement", this).apply(this, arguments);
	      if (node.label === "yield") {
	        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "The identifier " + JSON.stringify(node.label) + " must not be in label position in strict mode"));
	      }
	      if (s.usedLabelNames.indexOf(node.label) >= 0) {
	        s = s.addError(new _earlyErrorState.EarlyError(node, "Label " + JSON.stringify(node.label) + " has already been declared"));
	      }
	      if (node.body.type === "FunctionDeclaration") {
	        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "Labeled FunctionDeclarations are disallowed in strict mode"));
	      }
	      s = isIterationStatement(node.body) ? s.observeIterationLabel(node.label) : s.observeNonIterationLabel(node.label);
	      return s;
	    }
	  }, {
	    key: "reduceLiteralRegExpExpression",
	    value: function reduceLiteralRegExpExpression(node) {
	      var s = this.identity;
	      // NOTE: the RegExp pattern acceptor is disabled until we have more confidence in its correctness (more tests)
	      //if (!PatternAcceptor.test(node.pattern, node.flags.indexOf("u") >= 0)) {
	      //  s = s.addError(new EarlyError(node, "Invalid regular expression pattern"));
	      //}
	      if (!/^[igmyu]*$/.test(node.flags) || containsDuplicates(node.flags)) {
	        s = s.addError(new _earlyErrorState.EarlyError(node, "Invalid regular expression flags"));
	      }
	      return s;
	    }
	  }, {
	    key: "reduceMethod",
	    value: function reduceMethod(node, _ref13) {
	      var name = _ref13.name;
	      var params = _ref13.params;
	      var body = _ref13.body;
	
	      params = params.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      body = body.enforceConflictingLexicallyDeclaredNames(params.lexicallyDeclaredNames, DUPLICATE_BINDING);
	      if (node.name.type === "StaticPropertyName" && node.name.value === "constructor") {
	        body = body.observeConstructorMethod();
	        params = params.observeConstructorMethod();
	      } else {
	        body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
	        params = params.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      }
	      if (node.isGenerator) {
	        params.yieldExpressions.forEach(function (node) {
	          params = params.addError(new _earlyErrorState.EarlyError(node, "Generator parameters must not contain yield expressions"));
	        });
	      }
	      body = body.clearSuperPropertyExpressions();
	      params = params.clearSuperPropertyExpressions();
	      params = params.clearNewTargetExpressions();
	      body = body.clearNewTargetExpressions();
	      if (isStrictFunctionBody(node.body)) {
	        params = params.enforceStrictErrors();
	        body = body.enforceStrictErrors();
	      }
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceMethod", this).call(this, node, { name: name, params: params, body: body });
	      s = s.clearYieldExpressions();
	      s = s.observeVarBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceModule",
	    value: function reduceModule() {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceModule", this).apply(this, arguments);
	      s = s.functionDeclarationNamesAreLexical();
	      s = s.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      s = s.enforceConflictingLexicallyDeclaredNames(s.varDeclaredNames, DUPLICATE_BINDING);
	      s.exportedNames.forEachEntry(function (nodes, bindingName) {
	        if (nodes.length > 1) {
	          nodes.slice(1).forEach(function (dupeNode) {
	            s = s.addError(new _earlyErrorState.EarlyError(dupeNode, "Duplicate export " + JSON.stringify(bindingName)));
	          });
	        }
	      });
	      s.exportedBindings.forEachEntry(function (nodes, bindingName) {
	        if (bindingName !== "*default*" && !s.lexicallyDeclaredNames.has(bindingName) && !s.varDeclaredNames.has(bindingName)) {
	          nodes.forEach(function (undeclaredNode) {
	            s = s.addError(new _earlyErrorState.EarlyError(undeclaredNode, "Exported binding " + JSON.stringify(bindingName) + " is not declared"));
	          });
	        }
	      });
	      s.newTargetExpressions.forEach(function (node) {
	        s = s.addError(new _earlyErrorState.EarlyError(node, "new.target must be within function (but not arrow expression) code"));
	      });
	      s = s.enforceFreeContinueStatementErrors(FREE_CONTINUE);
	      s = s.enforceFreeLabeledContinueStatementErrors(UNBOUND_CONTINUE);
	      s = s.enforceFreeBreakStatementErrors(FREE_BREAK);
	      s = s.enforceFreeLabeledBreakStatementErrors(UNBOUND_BREAK);
	      s = s.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      s = s.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
	      s = s.enforceStrictErrors();
	      return s;
	    }
	  }, {
	    key: "reduceNewTargetExpression",
	    value: function reduceNewTargetExpression(node) {
	      return this.identity.observeNewTargetExpression(node);
	    }
	  }, {
	    key: "reduceObjectExpression",
	    value: function reduceObjectExpression(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceObjectExpression", this).apply(this, arguments);
	      s = s.enforceSuperCallExpressionsInConstructorMethod(SUPERCALL_ERROR);
	      var protos = node.properties.filter(function (p) {
	        return p.type === "DataProperty" && p.name.type === "StaticPropertyName" && p.name.value === "__proto__";
	      });
	      protos.slice(1).forEach(function (n) {
	        s = s.addError(new _earlyErrorState.EarlyError(n, "Duplicate __proto__ property in object literal not allowed"));
	      });
	      return s;
	    }
	  }, {
	    key: "reduceUpdateExpression",
	    value: function reduceUpdateExpression(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceUpdateExpression", this).apply(this, arguments);
	      s = s.clearBoundNames();
	      return s;
	    }
	  }, {
	    key: "reduceUnaryExpression",
	    value: function reduceUnaryExpression(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceUnaryExpression", this).apply(this, arguments);
	      if (node.operator === "delete" && node.operand.type === "IdentifierExpression") {
	        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "Identifier expressions must not be deleted in strict mode"));
	      }
	      return s;
	    }
	  }, {
	    key: "reduceScript",
	    value: function reduceScript(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceScript", this).apply(this, arguments);
	      s = s.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      s = s.enforceConflictingLexicallyDeclaredNames(s.varDeclaredNames, DUPLICATE_BINDING);
	      s.newTargetExpressions.forEach(function (node) {
	        s = s.addError(new _earlyErrorState.EarlyError(node, "new.target must be within function (but not arrow expression) code"));
	      });
	      s = s.enforceFreeContinueStatementErrors(FREE_CONTINUE);
	      s = s.enforceFreeLabeledContinueStatementErrors(UNBOUND_CONTINUE);
	      s = s.enforceFreeBreakStatementErrors(FREE_BREAK);
	      s = s.enforceFreeLabeledBreakStatementErrors(UNBOUND_BREAK);
	      s = s.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      s = s.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
	      if (isStrictFunctionBody(node)) {
	        s = s.enforceStrictErrors();
	      }
	      return s;
	    }
	  }, {
	    key: "reduceSetter",
	    value: function reduceSetter(node, _ref14) {
	      var name = _ref14.name;
	      var param = _ref14.param;
	      var body = _ref14.body;
	
	      param = param.observeLexicalDeclaration();
	      param = param.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      body = body.enforceConflictingLexicallyDeclaredNames(param.lexicallyDeclaredNames, DUPLICATE_BINDING);
	      param = param.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
	      param = param.clearSuperPropertyExpressions();
	      body = body.clearSuperPropertyExpressions();
	      param = param.clearNewTargetExpressions();
	      body = body.clearNewTargetExpressions();
	      if (isStrictFunctionBody(node.body)) {
	        param = param.enforceStrictErrors();
	        body = body.enforceStrictErrors();
	      }
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceSetter", this).call(this, node, { name: name, param: param, body: body });
	      s = s.observeVarBoundary();
	      return s;
	    }
	  }, {
	    key: "reduceStaticMemberExpression",
	    value: function reduceStaticMemberExpression(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceStaticMemberExpression", this).apply(this, arguments);
	      if (node.object.type === "Super") {
	        s = s.observeSuperPropertyExpression(node);
	      }
	      return s;
	    }
	  }, {
	    key: "reduceSwitchStatement",
	    value: function reduceSwitchStatement(node, _ref15) {
	      var discriminant = _ref15.discriminant;
	      var cases = _ref15.cases;
	
	      var sCases = this.fold(cases);
	      sCases = sCases.functionDeclarationNamesAreLexical();
	      sCases = sCases.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      sCases = sCases.enforceConflictingLexicallyDeclaredNames(sCases.varDeclaredNames, DUPLICATE_BINDING);
	      sCases = sCases.observeLexicalBoundary();
	      var s = this.append(discriminant, sCases);
	      s = s.clearFreeBreakStatements();
	      return s;
	    }
	  }, {
	    key: "reduceSwitchStatementWithDefault",
	    value: function reduceSwitchStatementWithDefault(node, _ref16) {
	      var discriminant = _ref16.discriminant;
	      var preDefaultCases = _ref16.preDefaultCases;
	      var defaultCase = _ref16.defaultCase;
	      var postDefaultCases = _ref16.postDefaultCases;
	
	      var sCases = this.append(defaultCase, this.append(this.fold(preDefaultCases), this.fold(postDefaultCases)));
	      sCases = sCases.functionDeclarationNamesAreLexical();
	      sCases = sCases.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
	      sCases = sCases.enforceConflictingLexicallyDeclaredNames(sCases.varDeclaredNames, DUPLICATE_BINDING);
	      sCases = sCases.observeLexicalBoundary();
	      var s = this.append(discriminant, sCases);
	      s = s.clearFreeBreakStatements();
	      return s;
	    }
	  }, {
	    key: "reduceVariableDeclaration",
	    value: function reduceVariableDeclaration(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceVariableDeclaration", this).apply(this, arguments);
	      switch (node.kind) {
	        case "const":
	        case "let":
	          {
	            s = s.observeLexicalDeclaration();
	            if (s.lexicallyDeclaredNames.has("let")) {
	              s.lexicallyDeclaredNames.get("let").forEach(function (n) {
	                s = s.addError(new _earlyErrorState.EarlyError(n, "Lexical declarations must not have a binding named \"let\""));
	              });
	            }
	            break;
	          }
	        case "var":
	          s = s.observeVarDeclaration();
	          break;
	      }
	      return s;
	    }
	  }, {
	    key: "reduceVariableDeclarationStatement",
	    value: function reduceVariableDeclarationStatement(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceVariableDeclarationStatement", this).apply(this, arguments);
	      if (node.declaration.kind === "const") {
	        node.declaration.declarators.forEach(function (declarator) {
	          if (declarator.init == null) {
	            s = s.addError(new _earlyErrorState.EarlyError(declarator, "Constant lexical declarations must have an initialiser"));
	          }
	        });
	      }
	      return s;
	    }
	  }, {
	    key: "reduceWhileStatement",
	    value: function reduceWhileStatement(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceWhileStatement", this).apply(this, arguments);
	      if (isLabelledFunction(node.body)) {
	        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a while statement must not be a labeled function declaration"));
	      }
	      s = s.clearFreeContinueStatements().clearFreeBreakStatements();
	      return s;
	    }
	  }, {
	    key: "reduceWithStatement",
	    value: function reduceWithStatement(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceWithStatement", this).apply(this, arguments);
	      if (isLabelledFunction(node.body)) {
	        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a with statement must not be a labeled function declaration"));
	      }
	      s = s.addStrictError(new _earlyErrorState.EarlyError(node, "Strict mode code must not include a with statement"));
	      return s;
	    }
	  }, {
	    key: "reduceYieldExpression",
	    value: function reduceYieldExpression(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceYieldExpression", this).apply(this, arguments);
	      s = s.observeYieldExpression(node);
	      return s;
	    }
	  }, {
	    key: "reduceYieldGeneratorExpression",
	    value: function reduceYieldGeneratorExpression(node) {
	      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceYieldGeneratorExpression", this).apply(this, arguments);
	      s = s.observeYieldExpression(node);
	      return s;
	    }
	  }], [{
	    key: "check",
	    value: function check(node) {
	      return (0, _shiftReducer2.default)(new EarlyErrorChecker(), node).errors;
	    }
	  }]);
	
	  return EarlyErrorChecker;
	}(_shiftReducer.MonoidalReducer);

/***/ },

/***/ "./node_modules/shift-reducer/dist/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MonoidalReducer = exports.CloneReducer = undefined;
	exports.default = reduce;
	
	var _cloneReducer = __webpack_require__("./node_modules/shift-reducer/dist/clone-reducer.js");
	
	Object.defineProperty(exports, "CloneReducer", {
	  enumerable: true,
	  get: function get() {
	    return _cloneReducer.default;
	  }
	});
	
	var _monoidalReducer = __webpack_require__("./node_modules/shift-reducer/dist/monoidal-reducer.js");
	
	Object.defineProperty(exports, "MonoidalReducer", {
	  enumerable: true,
	  get: function get() {
	    return _monoidalReducer.default;
	  }
	});
	
	var _shiftSpec = __webpack_require__("./node_modules/shift-spec/dist/index.js");
	
	var _shiftSpec2 = _interopRequireDefault(_shiftSpec);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function transformWithSpec(transformer, node, spec) {
	  switch (spec.typeName) {
	    case "Enum":
	    case "String":
	    case "Number":
	    case "Boolean":
	    case "SourceSpan":
	      return node;
	    case "Const":
	      // TODO: checked version
	      return transformWithSpec(transformer, node, spec.argument);
	    case "Maybe":
	      return node && transformWithSpec(transformer, node, spec.argument);
	    case "List":
	      return node.map(function (e) {
	        return transformWithSpec(transformer, e, spec.argument);
	      });
	    case "Union":
	      // TODO: checked version
	      return transformWithSpec(transformer, node, _shiftSpec2.default[node.type]);
	    default:
	      var state = {};
	      spec.fields.forEach(function (field) {
	        var v = transformWithSpec(transformer, node[field.name], field.type);
	        state[field.name] = v == null ? null : v;
	      });
	      if (typeof transformer["reduce" + node.type] !== "function") {
	        throw new Error("Encountered " + node.type + ", which the provided reducer does not handle.");
	      }
	      return transformer["reduce" + node.type](node, state);
	  }
	} /**
	   * Copyright 2014 Shape Security, Inc.
	   *
	   * Licensed under the Apache License, Version 2.0 (the "License")
	   * you may not use this file except in compliance with the License.
	   * You may obtain a copy of the License at
	   *
	   *     http://www.apache.org/licenses/LICENSE-2.0
	   *
	   * Unless required by applicable law or agreed to in writing, software
	   * distributed under the License is distributed on an "AS IS" BASIS,
	   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	   * See the License for the specific language governing permissions and
	   * limitations under the License.
	   */
	
	function reduce(reducer, reducible) {
	  return transformWithSpec(reducer, reducible, _shiftSpec2.default[reducible.type]);
	}

/***/ },

/***/ "./node_modules/shift-reducer/dist/clone-reducer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _shiftSpec = __webpack_require__("./node_modules/shift-spec/dist/index.js");
	
	var _shiftSpec2 = _interopRequireDefault(_shiftSpec);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
	                                                                                                                                                           * Copyright 2014 Shape Security, Inc.
	                                                                                                                                                           *
	                                                                                                                                                           * Licensed under the Apache License, Version 2.0 (the "License")
	                                                                                                                                                           * you may not use this file except in compliance with the License.
	                                                                                                                                                           * You may obtain a copy of the License at
	                                                                                                                                                           *
	                                                                                                                                                           *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                           *
	                                                                                                                                                           * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                           * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                           * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                           * See the License for the specific language governing permissions and
	                                                                                                                                                           * limitations under the License.
	                                                                                                                                                           */
	
	var CloneReducer = function CloneReducer() {
	  _classCallCheck(this, CloneReducer);
	};
	
	exports.default = CloneReducer;
	
	for (var typeName in _shiftSpec2.default) {
	  var type = _shiftSpec2.default[typeName];
	  Object.defineProperty(CloneReducer.prototype, "reduce" + typeName, {
	    value: function value(node, state) {
	      return state;
	    }
	  });
	}

/***/ },

/***/ "./node_modules/shift-spec/dist/index.js":
/***/ function(module, exports) {

	// Generated by src/generate-spec.js. 
	
	/**
	 * Copyright 2015 Shape Security, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *     http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	// Hack to make Babel6 import this as a module.
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	// Meta data generated from spec.idl.
	exports.default = (function() {
	  var SPEC = {};
	
	  var BOOLEAN = { typeName: "Boolean" };
	  var DOUBLE = { typeName: "Number" };
	  var STRING = { typeName: "String" };
	  function Maybe(arg) { return { typeName: "Maybe", argument: arg }; }
	  function List(arg) { return { typeName: "List", argument: arg }; }
	  function Const(arg) { return { typeName: "Const", argument: arg }; }
	  function Union() { return { typeName: "Union", arguments: [].slice.call(arguments, 0) }; }
	
	  var TYPE_INDICATOR = {
	    typeName: "Enum",
	    values: ["ArrayBinding", "ArrayExpression", "ArrowExpression", "AssignmentExpression", "BinaryExpression", "BindingIdentifier", "BindingProperty", "BindingPropertyIdentifier", "BindingPropertyProperty", "BindingWithDefault", "Block", "BlockStatement", "BreakStatement", "CallExpression", "CatchClause", "Class", "ClassDeclaration", "ClassElement", "ClassExpression", "CompoundAssignmentExpression", "ComputedMemberExpression", "ComputedPropertyName", "ConditionalExpression", "ContinueStatement", "DataProperty", "DebuggerStatement", "Directive", "DoWhileStatement", "EmptyStatement", "Export", "ExportAllFrom", "ExportDeclaration", "ExportDefault", "ExportFrom", "ExportSpecifier", "Expression", "ExpressionStatement", "ForInStatement", "ForOfStatement", "ForStatement", "FormalParameters", "Function", "FunctionBody", "FunctionDeclaration", "FunctionExpression", "Getter", "IdentifierExpression", "IfStatement", "Import", "ImportDeclaration", "ImportNamespace", "ImportSpecifier", "IterationStatement", "LabeledStatement", "LiteralBooleanExpression", "LiteralInfinityExpression", "LiteralNullExpression", "LiteralNumericExpression", "LiteralRegExpExpression", "LiteralStringExpression", "MemberExpression", "Method", "MethodDefinition", "Module", "NamedObjectProperty", "NewExpression", "NewTargetExpression", "Node", "ObjectBinding", "ObjectExpression", "ObjectProperty", "PropertyName", "ReturnStatement", "Script", "Setter", "ShorthandProperty", "SourceLocation", "SourceSpan", "SpreadElement", "Statement", "StaticMemberExpression", "StaticPropertyName", "Super", "SwitchCase", "SwitchDefault", "SwitchStatement", "SwitchStatementWithDefault", "TemplateElement", "TemplateExpression", "ThisExpression", "ThrowStatement", "TryCatchStatement", "TryFinallyStatement", "UnaryExpression", "UpdateExpression", "VariableDeclaration", "VariableDeclarationStatement", "VariableDeclarator", "WhileStatement", "WithStatement", "YieldExpression", "YieldGeneratorExpression"]
	  };
	
	  var VariableDeclarationKind = {
	    typeName: "Enum",
	    values: ["var", "let", "const"]
	  };
	
	  var CompoundAssignmentOperator = {
	    typeName: "Enum",
	    values: ["+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "|=", "^=", "&="]
	  };
	
	  var BinaryOperator = {
	    typeName: "Enum",
	    values: ["==", "!=", "===", "!==", "<", "<=", ">", ">=", "in", "instanceof", "<<", ">>", ">>>", "+", "-", "*", "/", "%", ",", "||", "&&", "|", "^", "&"]
	  };
	
	  var UnaryOperator = {
	    typeName: "Enum",
	    values: ["+", "-", "!", "~", "typeof", "void", "delete"]
	  };
	
	  var UpdateOperator = {
	    typeName: "Enum",
	    values: ["++", "--"]
	  };
	
	  var SourceLocation = SPEC.SourceLocation = {};
	  var SourceSpan = SPEC.SourceSpan = {};
	  var BindingWithDefault = SPEC.BindingWithDefault = {};
	  var BindingIdentifier = SPEC.BindingIdentifier = {};
	  var ArrayBinding = SPEC.ArrayBinding = {};
	  var ObjectBinding = SPEC.ObjectBinding = {};
	  var BindingPropertyIdentifier = SPEC.BindingPropertyIdentifier = {};
	  var BindingPropertyProperty = SPEC.BindingPropertyProperty = {};
	  var ClassExpression = SPEC.ClassExpression = {};
	  var ClassDeclaration = SPEC.ClassDeclaration = {};
	  var ClassElement = SPEC.ClassElement = {};
	  var Module = SPEC.Module = {};
	  var Import = SPEC.Import = {};
	  var ImportNamespace = SPEC.ImportNamespace = {};
	  var ImportSpecifier = SPEC.ImportSpecifier = {};
	  var ExportAllFrom = SPEC.ExportAllFrom = {};
	  var ExportFrom = SPEC.ExportFrom = {};
	  var Export = SPEC.Export = {};
	  var ExportDefault = SPEC.ExportDefault = {};
	  var ExportSpecifier = SPEC.ExportSpecifier = {};
	  var Method = SPEC.Method = {};
	  var Getter = SPEC.Getter = {};
	  var Setter = SPEC.Setter = {};
	  var DataProperty = SPEC.DataProperty = {};
	  var ShorthandProperty = SPEC.ShorthandProperty = {};
	  var ComputedPropertyName = SPEC.ComputedPropertyName = {};
	  var StaticPropertyName = SPEC.StaticPropertyName = {};
	  var LiteralBooleanExpression = SPEC.LiteralBooleanExpression = {};
	  var LiteralInfinityExpression = SPEC.LiteralInfinityExpression = {};
	  var LiteralNullExpression = SPEC.LiteralNullExpression = {};
	  var LiteralNumericExpression = SPEC.LiteralNumericExpression = {};
	  var LiteralRegExpExpression = SPEC.LiteralRegExpExpression = {};
	  var LiteralStringExpression = SPEC.LiteralStringExpression = {};
	  var ArrayExpression = SPEC.ArrayExpression = {};
	  var ArrowExpression = SPEC.ArrowExpression = {};
	  var AssignmentExpression = SPEC.AssignmentExpression = {};
	  var BinaryExpression = SPEC.BinaryExpression = {};
	  var CallExpression = SPEC.CallExpression = {};
	  var CompoundAssignmentExpression = SPEC.CompoundAssignmentExpression = {};
	  var ComputedMemberExpression = SPEC.ComputedMemberExpression = {};
	  var ConditionalExpression = SPEC.ConditionalExpression = {};
	  var FunctionExpression = SPEC.FunctionExpression = {};
	  var IdentifierExpression = SPEC.IdentifierExpression = {};
	  var NewExpression = SPEC.NewExpression = {};
	  var NewTargetExpression = SPEC.NewTargetExpression = {};
	  var ObjectExpression = SPEC.ObjectExpression = {};
	  var UnaryExpression = SPEC.UnaryExpression = {};
	  var StaticMemberExpression = SPEC.StaticMemberExpression = {};
	  var TemplateExpression = SPEC.TemplateExpression = {};
	  var ThisExpression = SPEC.ThisExpression = {};
	  var UpdateExpression = SPEC.UpdateExpression = {};
	  var YieldExpression = SPEC.YieldExpression = {};
	  var YieldGeneratorExpression = SPEC.YieldGeneratorExpression = {};
	  var BlockStatement = SPEC.BlockStatement = {};
	  var BreakStatement = SPEC.BreakStatement = {};
	  var ContinueStatement = SPEC.ContinueStatement = {};
	  var DebuggerStatement = SPEC.DebuggerStatement = {};
	  var DoWhileStatement = SPEC.DoWhileStatement = {};
	  var EmptyStatement = SPEC.EmptyStatement = {};
	  var ExpressionStatement = SPEC.ExpressionStatement = {};
	  var ForInStatement = SPEC.ForInStatement = {};
	  var ForOfStatement = SPEC.ForOfStatement = {};
	  var ForStatement = SPEC.ForStatement = {};
	  var IfStatement = SPEC.IfStatement = {};
	  var LabeledStatement = SPEC.LabeledStatement = {};
	  var ReturnStatement = SPEC.ReturnStatement = {};
	  var SwitchStatement = SPEC.SwitchStatement = {};
	  var SwitchStatementWithDefault = SPEC.SwitchStatementWithDefault = {};
	  var ThrowStatement = SPEC.ThrowStatement = {};
	  var TryCatchStatement = SPEC.TryCatchStatement = {};
	  var TryFinallyStatement = SPEC.TryFinallyStatement = {};
	  var VariableDeclarationStatement = SPEC.VariableDeclarationStatement = {};
	  var WhileStatement = SPEC.WhileStatement = {};
	  var WithStatement = SPEC.WithStatement = {};
	  var Block = SPEC.Block = {};
	  var CatchClause = SPEC.CatchClause = {};
	  var Directive = SPEC.Directive = {};
	  var FormalParameters = SPEC.FormalParameters = {};
	  var FunctionBody = SPEC.FunctionBody = {};
	  var FunctionDeclaration = SPEC.FunctionDeclaration = {};
	  var Script = SPEC.Script = {};
	  var SpreadElement = SPEC.SpreadElement = {};
	  var Super = SPEC.Super = {};
	  var SwitchCase = SPEC.SwitchCase = {};
	  var SwitchDefault = SPEC.SwitchDefault = {};
	  var TemplateElement = SPEC.TemplateElement = {};
	  var VariableDeclaration = SPEC.VariableDeclaration = {};
	  var VariableDeclarator = SPEC.VariableDeclarator = {};
	
	  var Class = Union(ClassExpression, ClassDeclaration);
	  var BindingProperty = Union(BindingPropertyIdentifier, BindingPropertyProperty);
	  var ExportDeclaration = Union(ExportAllFrom, ExportFrom, Export, ExportDefault);
	  var ImportDeclaration = Union(Import, ImportNamespace);
	  var MethodDefinition = Union(Method, Getter, Setter);
	  var NamedObjectProperty = Union(MethodDefinition, DataProperty);
	  var ObjectProperty = Union(NamedObjectProperty, ShorthandProperty);
	  var PropertyName = Union(ComputedPropertyName, StaticPropertyName);
	  var MemberExpression = Union(ComputedMemberExpression, StaticMemberExpression);
	  var Expression = Union(MemberExpression, ClassExpression, LiteralBooleanExpression, LiteralInfinityExpression, LiteralNullExpression, LiteralNumericExpression, LiteralRegExpExpression, LiteralStringExpression, ArrayExpression, ArrowExpression, AssignmentExpression, BinaryExpression, CallExpression, CompoundAssignmentExpression, ConditionalExpression, FunctionExpression, IdentifierExpression, NewExpression, NewTargetExpression, ObjectExpression, UnaryExpression, TemplateExpression, ThisExpression, UpdateExpression, YieldExpression, YieldGeneratorExpression);
	  var IterationStatement = Union(DoWhileStatement, ForInStatement, ForOfStatement, ForStatement, WhileStatement);
	  var Statement = Union(IterationStatement, ClassDeclaration, BlockStatement, BreakStatement, ContinueStatement, DebuggerStatement, EmptyStatement, ExpressionStatement, IfStatement, LabeledStatement, ReturnStatement, SwitchStatement, SwitchStatementWithDefault, ThrowStatement, TryCatchStatement, TryFinallyStatement, VariableDeclarationStatement, WithStatement, FunctionDeclaration);
	  var Node = Union(Statement, Expression, PropertyName, ObjectProperty, ImportDeclaration, ExportDeclaration, BindingWithDefault, BindingIdentifier, ArrayBinding, ObjectBinding, BindingProperty, ClassElement, Module, ImportSpecifier, ExportSpecifier, Block, CatchClause, Directive, FormalParameters, FunctionBody, Script, SpreadElement, Super, SwitchCase, SwitchDefault, TemplateElement, VariableDeclaration, VariableDeclarator);
	  var Function = Union(FunctionExpression, FunctionDeclaration);
	
	  SourceLocation.typeName = "SourceLocation";
	  SourceLocation.fields = [
	    { name: "line", type: DOUBLE },
	    { name: "column", type: DOUBLE },
	    { name: "offset", type: DOUBLE },
	  ];
	
	  SourceSpan.typeName = "SourceSpan";
	  SourceSpan.fields = [
	    { name: "source", type: Maybe(STRING) },
	    { name: "start", type: SourceLocation },
	    { name: "end", type: SourceLocation },
	  ];
	
	  BindingWithDefault.typeName = "BindingWithDefault";
	  BindingWithDefault.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "BindingWithDefault" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
	    { name: "init", type: Expression },
	  ];
	
	  BindingIdentifier.typeName = "BindingIdentifier";
	  BindingIdentifier.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "BindingIdentifier" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: STRING },
	  ];
	
	  ArrayBinding.typeName = "ArrayBinding";
	  ArrayBinding.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ArrayBinding" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "elements", type: List(Maybe(Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression, BindingWithDefault))) },
	    { name: "restElement", type: Maybe(Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression)) },
	  ];
	
	  ObjectBinding.typeName = "ObjectBinding";
	  ObjectBinding.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ObjectBinding" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "properties", type: List(BindingProperty) },
	  ];
	
	  BindingPropertyIdentifier.typeName = "BindingPropertyIdentifier";
	  BindingPropertyIdentifier.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "BindingPropertyIdentifier" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "binding", type: BindingIdentifier },
	    { name: "init", type: Maybe(Expression) },
	  ];
	
	  BindingPropertyProperty.typeName = "BindingPropertyProperty";
	  BindingPropertyProperty.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "BindingPropertyProperty" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: PropertyName },
	    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression, BindingWithDefault) },
	  ];
	
	  ClassExpression.typeName = "ClassExpression";
	  ClassExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ClassExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: Maybe(BindingIdentifier) },
	    { name: "super", type: Maybe(Expression) },
	    { name: "elements", type: List(ClassElement) },
	  ];
	
	  ClassDeclaration.typeName = "ClassDeclaration";
	  ClassDeclaration.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ClassDeclaration" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: BindingIdentifier },
	    { name: "super", type: Maybe(Expression) },
	    { name: "elements", type: List(ClassElement) },
	  ];
	
	  ClassElement.typeName = "ClassElement";
	  ClassElement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ClassElement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "isStatic", type: BOOLEAN },
	    { name: "method", type: MethodDefinition },
	  ];
	
	  Module.typeName = "Module";
	  Module.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Module" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "directives", type: List(Directive) },
	    { name: "items", type: List(Union(ImportDeclaration, ExportDeclaration, Statement)) },
	  ];
	
	  Import.typeName = "Import";
	  Import.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Import" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "moduleSpecifier", type: STRING },
	    { name: "defaultBinding", type: Maybe(BindingIdentifier) },
	    { name: "namedImports", type: List(ImportSpecifier) },
	  ];
	
	  ImportNamespace.typeName = "ImportNamespace";
	  ImportNamespace.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ImportNamespace" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "moduleSpecifier", type: STRING },
	    { name: "defaultBinding", type: Maybe(BindingIdentifier) },
	    { name: "namespaceBinding", type: BindingIdentifier },
	  ];
	
	  ImportSpecifier.typeName = "ImportSpecifier";
	  ImportSpecifier.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ImportSpecifier" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: Maybe(STRING) },
	    { name: "binding", type: BindingIdentifier },
	  ];
	
	  ExportAllFrom.typeName = "ExportAllFrom";
	  ExportAllFrom.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ExportAllFrom" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "moduleSpecifier", type: STRING },
	  ];
	
	  ExportFrom.typeName = "ExportFrom";
	  ExportFrom.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ExportFrom" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "namedExports", type: List(ExportSpecifier) },
	    { name: "moduleSpecifier", type: Maybe(STRING) },
	  ];
	
	  Export.typeName = "Export";
	  Export.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Export" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "declaration", type: Union(FunctionDeclaration, ClassDeclaration, VariableDeclaration) },
	  ];
	
	  ExportDefault.typeName = "ExportDefault";
	  ExportDefault.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ExportDefault" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "body", type: Union(FunctionDeclaration, ClassDeclaration, Expression) },
	  ];
	
	  ExportSpecifier.typeName = "ExportSpecifier";
	  ExportSpecifier.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ExportSpecifier" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: Maybe(STRING) },
	    { name: "exportedName", type: STRING },
	  ];
	
	  Method.typeName = "Method";
	  Method.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Method" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: PropertyName },
	    { name: "isGenerator", type: BOOLEAN },
	    { name: "params", type: FormalParameters },
	    { name: "body", type: FunctionBody },
	  ];
	
	  Getter.typeName = "Getter";
	  Getter.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Getter" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: PropertyName },
	    { name: "body", type: FunctionBody },
	  ];
	
	  Setter.typeName = "Setter";
	  Setter.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Setter" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: PropertyName },
	    { name: "param", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression, BindingWithDefault) },
	    { name: "body", type: FunctionBody },
	  ];
	
	  DataProperty.typeName = "DataProperty";
	  DataProperty.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "DataProperty" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: PropertyName },
	    { name: "expression", type: Expression },
	  ];
	
	  ShorthandProperty.typeName = "ShorthandProperty";
	  ShorthandProperty.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ShorthandProperty" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: STRING },
	  ];
	
	  ComputedPropertyName.typeName = "ComputedPropertyName";
	  ComputedPropertyName.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ComputedPropertyName" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "expression", type: Expression },
	  ];
	
	  StaticPropertyName.typeName = "StaticPropertyName";
	  StaticPropertyName.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "StaticPropertyName" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "value", type: STRING },
	  ];
	
	  LiteralBooleanExpression.typeName = "LiteralBooleanExpression";
	  LiteralBooleanExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralBooleanExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "value", type: BOOLEAN },
	  ];
	
	  LiteralInfinityExpression.typeName = "LiteralInfinityExpression";
	  LiteralInfinityExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralInfinityExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	  ];
	
	  LiteralNullExpression.typeName = "LiteralNullExpression";
	  LiteralNullExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralNullExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	  ];
	
	  LiteralNumericExpression.typeName = "LiteralNumericExpression";
	  LiteralNumericExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralNumericExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "value", type: DOUBLE },
	  ];
	
	  LiteralRegExpExpression.typeName = "LiteralRegExpExpression";
	  LiteralRegExpExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralRegExpExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "pattern", type: STRING },
	    { name: "flags", type: STRING },
	  ];
	
	  LiteralStringExpression.typeName = "LiteralStringExpression";
	  LiteralStringExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralStringExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "value", type: STRING },
	  ];
	
	  ArrayExpression.typeName = "ArrayExpression";
	  ArrayExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ArrayExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "elements", type: List(Maybe(Union(SpreadElement, Expression))) },
	  ];
	
	  ArrowExpression.typeName = "ArrowExpression";
	  ArrowExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ArrowExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "params", type: FormalParameters },
	    { name: "body", type: Union(FunctionBody, Expression) },
	  ];
	
	  AssignmentExpression.typeName = "AssignmentExpression";
	  AssignmentExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "AssignmentExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
	    { name: "expression", type: Expression },
	  ];
	
	  BinaryExpression.typeName = "BinaryExpression";
	  BinaryExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "BinaryExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "operator", type: BinaryOperator },
	    { name: "left", type: Expression },
	    { name: "right", type: Expression },
	  ];
	
	  CallExpression.typeName = "CallExpression";
	  CallExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "CallExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "callee", type: Union(Expression, Super) },
	    { name: "arguments", type: List(Union(SpreadElement, Expression)) },
	  ];
	
	  CompoundAssignmentExpression.typeName = "CompoundAssignmentExpression";
	  CompoundAssignmentExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "CompoundAssignmentExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "operator", type: CompoundAssignmentOperator },
	    { name: "binding", type: Union(BindingIdentifier, MemberExpression) },
	    { name: "expression", type: Expression },
	  ];
	
	  ComputedMemberExpression.typeName = "ComputedMemberExpression";
	  ComputedMemberExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ComputedMemberExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "object", type: Union(Expression, Super) },
	    { name: "expression", type: Expression },
	  ];
	
	  ConditionalExpression.typeName = "ConditionalExpression";
	  ConditionalExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ConditionalExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "test", type: Expression },
	    { name: "consequent", type: Expression },
	    { name: "alternate", type: Expression },
	  ];
	
	  FunctionExpression.typeName = "FunctionExpression";
	  FunctionExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "FunctionExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "isGenerator", type: BOOLEAN },
	    { name: "name", type: Maybe(BindingIdentifier) },
	    { name: "params", type: FormalParameters },
	    { name: "body", type: FunctionBody },
	  ];
	
	  IdentifierExpression.typeName = "IdentifierExpression";
	  IdentifierExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "IdentifierExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "name", type: STRING },
	  ];
	
	  NewExpression.typeName = "NewExpression";
	  NewExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "NewExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "callee", type: Expression },
	    { name: "arguments", type: List(Union(SpreadElement, Expression)) },
	  ];
	
	  NewTargetExpression.typeName = "NewTargetExpression";
	  NewTargetExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "NewTargetExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	  ];
	
	  ObjectExpression.typeName = "ObjectExpression";
	  ObjectExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ObjectExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "properties", type: List(ObjectProperty) },
	  ];
	
	  UnaryExpression.typeName = "UnaryExpression";
	  UnaryExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "UnaryExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "operator", type: UnaryOperator },
	    { name: "operand", type: Expression },
	  ];
	
	  StaticMemberExpression.typeName = "StaticMemberExpression";
	  StaticMemberExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "StaticMemberExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "object", type: Union(Expression, Super) },
	    { name: "property", type: STRING },
	  ];
	
	  TemplateExpression.typeName = "TemplateExpression";
	  TemplateExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "TemplateExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "tag", type: Maybe(Expression) },
	    { name: "elements", type: List(Union(Expression, TemplateElement)) },
	  ];
	
	  ThisExpression.typeName = "ThisExpression";
	  ThisExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ThisExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	  ];
	
	  UpdateExpression.typeName = "UpdateExpression";
	  UpdateExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "UpdateExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "isPrefix", type: BOOLEAN },
	    { name: "operator", type: UpdateOperator },
	    { name: "operand", type: Union(BindingIdentifier, MemberExpression) },
	  ];
	
	  YieldExpression.typeName = "YieldExpression";
	  YieldExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "YieldExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "expression", type: Maybe(Expression) },
	  ];
	
	  YieldGeneratorExpression.typeName = "YieldGeneratorExpression";
	  YieldGeneratorExpression.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "YieldGeneratorExpression" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "expression", type: Expression },
	  ];
	
	  BlockStatement.typeName = "BlockStatement";
	  BlockStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "BlockStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "block", type: Block },
	  ];
	
	  BreakStatement.typeName = "BreakStatement";
	  BreakStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "BreakStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "label", type: Maybe(STRING) },
	  ];
	
	  ContinueStatement.typeName = "ContinueStatement";
	  ContinueStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ContinueStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "label", type: Maybe(STRING) },
	  ];
	
	  DebuggerStatement.typeName = "DebuggerStatement";
	  DebuggerStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "DebuggerStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	  ];
	
	  DoWhileStatement.typeName = "DoWhileStatement";
	  DoWhileStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "DoWhileStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "body", type: Statement },
	    { name: "test", type: Expression },
	  ];
	
	  EmptyStatement.typeName = "EmptyStatement";
	  EmptyStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "EmptyStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	  ];
	
	  ExpressionStatement.typeName = "ExpressionStatement";
	  ExpressionStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ExpressionStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "expression", type: Expression },
	  ];
	
	  ForInStatement.typeName = "ForInStatement";
	  ForInStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ForInStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "left", type: Union(VariableDeclaration, ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
	    { name: "right", type: Expression },
	    { name: "body", type: Statement },
	  ];
	
	  ForOfStatement.typeName = "ForOfStatement";
	  ForOfStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ForOfStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "left", type: Union(VariableDeclaration, ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
	    { name: "right", type: Expression },
	    { name: "body", type: Statement },
	  ];
	
	  ForStatement.typeName = "ForStatement";
	  ForStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ForStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "init", type: Maybe(Union(VariableDeclaration, Expression)) },
	    { name: "test", type: Maybe(Expression) },
	    { name: "update", type: Maybe(Expression) },
	    { name: "body", type: Statement },
	  ];
	
	  IfStatement.typeName = "IfStatement";
	  IfStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "IfStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "test", type: Expression },
	    { name: "consequent", type: Statement },
	    { name: "alternate", type: Maybe(Statement) },
	  ];
	
	  LabeledStatement.typeName = "LabeledStatement";
	  LabeledStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "LabeledStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "label", type: STRING },
	    { name: "body", type: Statement },
	  ];
	
	  ReturnStatement.typeName = "ReturnStatement";
	  ReturnStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ReturnStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "expression", type: Maybe(Expression) },
	  ];
	
	  SwitchStatement.typeName = "SwitchStatement";
	  SwitchStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "SwitchStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "discriminant", type: Expression },
	    { name: "cases", type: List(SwitchCase) },
	  ];
	
	  SwitchStatementWithDefault.typeName = "SwitchStatementWithDefault";
	  SwitchStatementWithDefault.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "SwitchStatementWithDefault" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "discriminant", type: Expression },
	    { name: "preDefaultCases", type: List(SwitchCase) },
	    { name: "defaultCase", type: SwitchDefault },
	    { name: "postDefaultCases", type: List(SwitchCase) },
	  ];
	
	  ThrowStatement.typeName = "ThrowStatement";
	  ThrowStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "ThrowStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "expression", type: Expression },
	  ];
	
	  TryCatchStatement.typeName = "TryCatchStatement";
	  TryCatchStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "TryCatchStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "body", type: Block },
	    { name: "catchClause", type: CatchClause },
	  ];
	
	  TryFinallyStatement.typeName = "TryFinallyStatement";
	  TryFinallyStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "TryFinallyStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "body", type: Block },
	    { name: "catchClause", type: Maybe(CatchClause) },
	    { name: "finalizer", type: Block },
	  ];
	
	  VariableDeclarationStatement.typeName = "VariableDeclarationStatement";
	  VariableDeclarationStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "VariableDeclarationStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "declaration", type: VariableDeclaration },
	  ];
	
	  WhileStatement.typeName = "WhileStatement";
	  WhileStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "WhileStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "test", type: Expression },
	    { name: "body", type: Statement },
	  ];
	
	  WithStatement.typeName = "WithStatement";
	  WithStatement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "WithStatement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "object", type: Expression },
	    { name: "body", type: Statement },
	  ];
	
	  Block.typeName = "Block";
	  Block.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Block" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "statements", type: List(Statement) },
	  ];
	
	  CatchClause.typeName = "CatchClause";
	  CatchClause.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "CatchClause" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
	    { name: "body", type: Block },
	  ];
	
	  Directive.typeName = "Directive";
	  Directive.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Directive" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "rawValue", type: STRING },
	  ];
	
	  FormalParameters.typeName = "FormalParameters";
	  FormalParameters.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "FormalParameters" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "items", type: List(Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression, BindingWithDefault)) },
	    { name: "rest", type: Maybe(BindingIdentifier) },
	  ];
	
	  FunctionBody.typeName = "FunctionBody";
	  FunctionBody.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "FunctionBody" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "directives", type: List(Directive) },
	    { name: "statements", type: List(Statement) },
	  ];
	
	  FunctionDeclaration.typeName = "FunctionDeclaration";
	  FunctionDeclaration.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "FunctionDeclaration" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "isGenerator", type: BOOLEAN },
	    { name: "name", type: BindingIdentifier },
	    { name: "params", type: FormalParameters },
	    { name: "body", type: FunctionBody },
	  ];
	
	  Script.typeName = "Script";
	  Script.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Script" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "directives", type: List(Directive) },
	    { name: "statements", type: List(Statement) },
	  ];
	
	  SpreadElement.typeName = "SpreadElement";
	  SpreadElement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "SpreadElement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "expression", type: Expression },
	  ];
	
	  Super.typeName = "Super";
	  Super.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "Super" },
	    { name: "loc", type: Maybe(SourceSpan) },
	  ];
	
	  SwitchCase.typeName = "SwitchCase";
	  SwitchCase.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "SwitchCase" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "test", type: Expression },
	    { name: "consequent", type: List(Statement) },
	  ];
	
	  SwitchDefault.typeName = "SwitchDefault";
	  SwitchDefault.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "SwitchDefault" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "consequent", type: List(Statement) },
	  ];
	
	  TemplateElement.typeName = "TemplateElement";
	  TemplateElement.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "TemplateElement" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "rawValue", type: STRING },
	  ];
	
	  VariableDeclaration.typeName = "VariableDeclaration";
	  VariableDeclaration.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "VariableDeclaration" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "kind", type: VariableDeclarationKind },
	    { name: "declarators", type: List(VariableDeclarator) },
	  ];
	
	  VariableDeclarator.typeName = "VariableDeclarator";
	  VariableDeclarator.fields = [
	    { name: "type", type: Const(TYPE_INDICATOR), value: "VariableDeclarator" },
	    { name: "loc", type: Maybe(SourceSpan) },
	    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
	    { name: "init", type: Maybe(Expression) },
	  ];
	
	  return SPEC;
	}());


/***/ },

/***/ "./node_modules/shift-reducer/dist/monoidal-reducer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
	                                                                                                                                                                                                                                                   * Copyright 2014 Shape Security, Inc.
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * Licensed under the Apache License, Version 2.0 (the "License")
	                                                                                                                                                                                                                                                   * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                   * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                   *
	                                                                                                                                                                                                                                                   * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                   * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                   * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                   * limitations under the License.
	                                                                                                                                                                                                                                                   */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _shiftSpec = __webpack_require__("./node_modules/shift-spec/dist/index.js");
	
	var _shiftSpec2 = _interopRequireDefault(_shiftSpec);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var methods = {};
	
	function id(x) {
	  return x;
	}
	
	function handlerForFieldOfType(type) {
	  switch (type.typeName) {
	    case "Enum":
	    case "String":
	    case "Boolean":
	    case "Number":
	    case "SourceSpan":
	      return null;
	    case "Const":
	      return handlerForFieldOfType(type.argument);
	    case "Maybe":
	      {
	        var _ret = function () {
	          var subHandler = handlerForFieldOfType(type.argument);
	          if (subHandler == null) return {
	              v: null
	            };
	          return {
	            v: function v(t) {
	              return t == null ? this.identity : subHandler.call(this, t);
	            }
	          };
	        }();
	
	        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	      }
	    case "List":
	      {
	        var _ret2 = function () {
	          var subHandler = handlerForFieldOfType(type.argument);
	          if (subHandler == null) return {
	              v: null
	            };
	          return {
	            v: function v(t) {
	              var _this = this;
	
	              return this.fold(t.map(function (x) {
	                return subHandler.call(_this, x);
	              }));
	            }
	          };
	        }();
	
	        if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
	      }
	    default:
	      return id;
	  }
	}
	
	var _loop = function _loop(typeName) {
	  var type = _shiftSpec2.default[typeName];
	
	  var handlers = {};
	  type.fields.forEach(function (field) {
	    var handler = handlerForFieldOfType(field.type);
	    if (handler != null) handlers[field.name] = handler;
	  });
	  var fieldNames = Object.keys(handlers);
	
	  methods["reduce" + typeName] = {
	    value: function value(node, state) {
	      var _this3 = this;
	
	      return this.fold(fieldNames.map(function (fieldName) {
	        return handlers[fieldName].call(_this3, state[fieldName]);
	      }));
	    }
	  };
	};
	
	for (var typeName in _shiftSpec2.default) {
	  _loop(typeName);
	}
	
	var MonoidalReducer = function () {
	  function MonoidalReducer(monoid) {
	    _classCallCheck(this, MonoidalReducer);
	
	    this.identity = monoid.empty();
	    var concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
	    this.append = function (a, b) {
	      return concat.call(a, b);
	    };
	  }
	
	  _createClass(MonoidalReducer, [{
	    key: "fold",
	    value: function fold(list, a) {
	      var _this2 = this;
	
	      return list.reduce(function (memo, x) {
	        return _this2.append(memo, x);
	      }, a == null ? this.identity : a);
	    }
	  }]);
	
	  return MonoidalReducer;
	}();
	
	exports.default = MonoidalReducer;
	
	Object.defineProperties(MonoidalReducer.prototype, methods);

/***/ },

/***/ "./node_modules/shift-parser/dist/early-error-state.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2014 Shape Security, Inc.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Licensed under the Apache License, Version 2.0 (the "License")
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EarlyError = exports.EarlyErrorState = undefined;
	
	__webpack_require__("./node_modules/es6-map/implement.js");
	
	var _multimap = __webpack_require__("./node_modules/multimap/index.js");
	
	var _multimap2 = _interopRequireDefault(_multimap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// FIXME: remove this when collections/multi-map is working
	_multimap2.default.prototype.addEach = function (otherMap) {
	  var _this = this;
	
	  otherMap.forEachEntry(function (v, k) {
	    _this.set.apply(_this, [k].concat(v));
	  });
	  return this;
	};
	
	var identity = undefined; // initialised below EarlyErrorState
	
	var EarlyErrorState = exports.EarlyErrorState = function () {
	  function EarlyErrorState() {
	    _classCallCheck(this, EarlyErrorState);
	
	    this.errors = [];
	    // errors that are only errors in strict mode code
	    this.strictErrors = [];
	
	    // Label values used in LabeledStatement nodes; cleared at function boundaries
	    this.usedLabelNames = [];
	
	    // BreakStatement nodes; cleared at iteration; switch; and function boundaries
	    this.freeBreakStatements = [];
	    // ContinueStatement nodes; cleared at
	    this.freeContinueStatements = [];
	
	    // labeled BreakStatement nodes; cleared at LabeledStatement with same Label and function boundaries
	    this.freeLabeledBreakStatements = [];
	    // labeled ContinueStatement nodes; cleared at labeled iteration statement with same Label and function boundaries
	    this.freeLabeledContinueStatements = [];
	
	    // NewTargetExpression nodes; cleared at function (besides arrow expression) boundaries
	    this.newTargetExpressions = [];
	
	    // BindingIdentifier nodes; cleared at containing declaration node
	    this.boundNames = new _multimap2.default();
	    // BindingIdentifiers that were found to be in a lexical binding position
	    this.lexicallyDeclaredNames = new _multimap2.default();
	    // BindingIdentifiers that were the name of a FunctionDeclaration
	    this.functionDeclarationNames = new _multimap2.default();
	    // BindingIdentifiers that were found to be in a variable binding position
	    this.varDeclaredNames = new _multimap2.default();
	    // BindingIdentifiers that were found to be in a variable binding position
	    this.forOfVarDeclaredNames = [];
	
	    // Names that this module exports
	    this.exportedNames = new _multimap2.default();
	    // Locally declared names that are referenced in export declarations
	    this.exportedBindings = new _multimap2.default();
	
	    // CallExpressions with Super callee
	    this.superCallExpressions = [];
	    // SuperCall expressions in the context of a Method named "constructor"
	    this.superCallExpressionsInConstructorMethod = [];
	    // MemberExpressions with Super object
	    this.superPropertyExpressions = [];
	
	    // YieldExpression and YieldGeneratorExpression nodes; cleared at function boundaries
	    this.yieldExpressions = [];
	  }
	
	  _createClass(EarlyErrorState, [{
	    key: "addFreeBreakStatement",
	    value: function addFreeBreakStatement(s) {
	      this.freeBreakStatements.push(s);
	      return this;
	    }
	  }, {
	    key: "addFreeLabeledBreakStatement",
	    value: function addFreeLabeledBreakStatement(s) {
	      this.freeLabeledBreakStatements.push(s);
	      return this;
	    }
	  }, {
	    key: "clearFreeBreakStatements",
	    value: function clearFreeBreakStatements() {
	      this.freeBreakStatements = [];
	      return this;
	    }
	  }, {
	    key: "addFreeContinueStatement",
	    value: function addFreeContinueStatement(s) {
	      this.freeContinueStatements.push(s);
	      return this;
	    }
	  }, {
	    key: "addFreeLabeledContinueStatement",
	    value: function addFreeLabeledContinueStatement(s) {
	      this.freeLabeledContinueStatements.push(s);
	      return this;
	    }
	  }, {
	    key: "clearFreeContinueStatements",
	    value: function clearFreeContinueStatements() {
	      this.freeContinueStatements = [];
	      return this;
	    }
	  }, {
	    key: "enforceFreeBreakStatementErrors",
	    value: function enforceFreeBreakStatementErrors(createError) {
	      [].push.apply(this.errors, this.freeBreakStatements.map(createError));
	      this.freeBreakStatements = [];
	      return this;
	    }
	  }, {
	    key: "enforceFreeLabeledBreakStatementErrors",
	    value: function enforceFreeLabeledBreakStatementErrors(createError) {
	      [].push.apply(this.errors, this.freeLabeledBreakStatements.map(createError));
	      this.freeLabeledBreakStatements = [];
	      return this;
	    }
	  }, {
	    key: "enforceFreeContinueStatementErrors",
	    value: function enforceFreeContinueStatementErrors(createError) {
	      [].push.apply(this.errors, this.freeContinueStatements.map(createError));
	      this.freeContinueStatements = [];
	      return this;
	    }
	  }, {
	    key: "enforceFreeLabeledContinueStatementErrors",
	    value: function enforceFreeLabeledContinueStatementErrors(createError) {
	      [].push.apply(this.errors, this.freeLabeledContinueStatements.map(createError));
	      this.freeLabeledContinueStatements = [];
	      return this;
	    }
	  }, {
	    key: "observeIterationLabel",
	    value: function observeIterationLabel(label) {
	      this.usedLabelNames.push(label);
	      this.freeLabeledBreakStatements = this.freeLabeledBreakStatements.filter(function (s) {
	        return s.label !== label;
	      });
	      this.freeLabeledContinueStatements = this.freeLabeledContinueStatements.filter(function (s) {
	        return s.label !== label;
	      });
	      return this;
	    }
	  }, {
	    key: "observeNonIterationLabel",
	    value: function observeNonIterationLabel(label) {
	      this.usedLabelNames.push(label);
	      this.freeLabeledBreakStatements = this.freeLabeledBreakStatements.filter(function (s) {
	        return s.label !== label;
	      });
	      return this;
	    }
	  }, {
	    key: "clearUsedLabelNames",
	    value: function clearUsedLabelNames() {
	      this.usedLabelNames = [];
	      return this;
	    }
	  }, {
	    key: "observeSuperCallExpression",
	    value: function observeSuperCallExpression(node) {
	      this.superCallExpressions.push(node);
	      return this;
	    }
	  }, {
	    key: "observeConstructorMethod",
	    value: function observeConstructorMethod() {
	      this.superCallExpressionsInConstructorMethod = this.superCallExpressions;
	      this.superCallExpressions = [];
	      return this;
	    }
	  }, {
	    key: "clearSuperCallExpressionsInConstructorMethod",
	    value: function clearSuperCallExpressionsInConstructorMethod() {
	      this.superCallExpressionsInConstructorMethod = [];
	      return this;
	    }
	  }, {
	    key: "enforceSuperCallExpressions",
	    value: function enforceSuperCallExpressions(createError) {
	      [].push.apply(this.errors, this.superCallExpressions.map(createError));
	      [].push.apply(this.errors, this.superCallExpressionsInConstructorMethod.map(createError));
	      this.superCallExpressions = [];
	      this.superCallExpressionsInConstructorMethod = [];
	      return this;
	    }
	  }, {
	    key: "enforceSuperCallExpressionsInConstructorMethod",
	    value: function enforceSuperCallExpressionsInConstructorMethod(createError) {
	      [].push.apply(this.errors, this.superCallExpressionsInConstructorMethod.map(createError));
	      this.superCallExpressionsInConstructorMethod = [];
	      return this;
	    }
	  }, {
	    key: "observeSuperPropertyExpression",
	    value: function observeSuperPropertyExpression(node) {
	      this.superPropertyExpressions.push(node);
	      return this;
	    }
	  }, {
	    key: "clearSuperPropertyExpressions",
	    value: function clearSuperPropertyExpressions() {
	      this.superPropertyExpressions = [];
	      return this;
	    }
	  }, {
	    key: "enforceSuperPropertyExpressions",
	    value: function enforceSuperPropertyExpressions(createError) {
	      [].push.apply(this.errors, this.superPropertyExpressions.map(createError));
	      this.superPropertyExpressions = [];
	      return this;
	    }
	  }, {
	    key: "observeNewTargetExpression",
	    value: function observeNewTargetExpression(node) {
	      this.newTargetExpressions.push(node);
	      return this;
	    }
	  }, {
	    key: "clearNewTargetExpressions",
	    value: function clearNewTargetExpressions() {
	      this.newTargetExpressions = [];
	      return this;
	    }
	  }, {
	    key: "bindName",
	    value: function bindName(name, node) {
	      this.boundNames.set(name, node);
	      return this;
	    }
	  }, {
	    key: "clearBoundNames",
	    value: function clearBoundNames() {
	      this.boundNames = new _multimap2.default();
	      return this;
	    }
	  }, {
	    key: "observeLexicalDeclaration",
	    value: function observeLexicalDeclaration() {
	      this.lexicallyDeclaredNames.addEach(this.boundNames);
	      this.boundNames = new _multimap2.default();
	      return this;
	    }
	  }, {
	    key: "observeLexicalBoundary",
	    value: function observeLexicalBoundary() {
	      this.previousLexicallyDeclaredNames = this.lexicallyDeclaredNames;
	      this.lexicallyDeclaredNames = new _multimap2.default();
	      this.functionDeclarationNames = new _multimap2.default();
	      return this;
	    }
	  }, {
	    key: "enforceDuplicateLexicallyDeclaredNames",
	    value: function enforceDuplicateLexicallyDeclaredNames(createError) {
	      var _this2 = this;
	
	      this.lexicallyDeclaredNames.forEachEntry(function (nodes /*, bindingName*/) {
	        if (nodes.length > 1) {
	          nodes.slice(1).forEach(function (dupeNode) {
	            _this2.addError(createError(dupeNode));
	          });
	        }
	      });
	      return this;
	    }
	  }, {
	    key: "enforceConflictingLexicallyDeclaredNames",
	    value: function enforceConflictingLexicallyDeclaredNames(otherNames, createError) {
	      var _this3 = this;
	
	      this.lexicallyDeclaredNames.forEachEntry(function (nodes, bindingName) {
	        if (otherNames.has(bindingName)) {
	          nodes.forEach(function (conflictingNode) {
	            _this3.addError(createError(conflictingNode));
	          });
	        }
	      });
	      return this;
	    }
	  }, {
	    key: "observeFunctionDeclaration",
	    value: function observeFunctionDeclaration() {
	      this.observeVarBoundary();
	      this.functionDeclarationNames.addEach(this.boundNames);
	      this.boundNames = new _multimap2.default();
	      return this;
	    }
	  }, {
	    key: "functionDeclarationNamesAreLexical",
	    value: function functionDeclarationNamesAreLexical() {
	      this.lexicallyDeclaredNames.addEach(this.functionDeclarationNames);
	      this.functionDeclarationNames = new _multimap2.default();
	      return this;
	    }
	  }, {
	    key: "observeVarDeclaration",
	    value: function observeVarDeclaration() {
	      this.varDeclaredNames.addEach(this.boundNames);
	      this.boundNames = new _multimap2.default();
	      return this;
	    }
	  }, {
	    key: "recordForOfVars",
	    value: function recordForOfVars() {
	      var _this4 = this;
	
	      this.varDeclaredNames.forEach(function (bindingIdentifier) {
	        _this4.forOfVarDeclaredNames.push(bindingIdentifier);
	      });
	      return this;
	    }
	  }, {
	    key: "observeVarBoundary",
	    value: function observeVarBoundary() {
	      this.lexicallyDeclaredNames = new _multimap2.default();
	      this.functionDeclarationNames = new _multimap2.default();
	      this.varDeclaredNames = new _multimap2.default();
	      this.forOfVarDeclaredNames = [];
	      return this;
	    }
	  }, {
	    key: "exportName",
	    value: function exportName(name, node) {
	      this.exportedNames.set(name, node);
	      return this;
	    }
	  }, {
	    key: "exportDeclaredNames",
	    value: function exportDeclaredNames() {
	      this.exportedNames.addEach(this.lexicallyDeclaredNames).addEach(this.varDeclaredNames);
	      this.exportedBindings.addEach(this.lexicallyDeclaredNames).addEach(this.varDeclaredNames);
	      return this;
	    }
	  }, {
	    key: "exportBinding",
	    value: function exportBinding(name, node) {
	      this.exportedBindings.set(name, node);
	      return this;
	    }
	  }, {
	    key: "clearExportedBindings",
	    value: function clearExportedBindings() {
	      this.exportedBindings = new _multimap2.default();
	      return this;
	    }
	  }, {
	    key: "observeYieldExpression",
	    value: function observeYieldExpression(node) {
	      this.yieldExpressions.push(node);
	      return this;
	    }
	  }, {
	    key: "clearYieldExpressions",
	    value: function clearYieldExpressions() {
	      this.yieldExpressions = [];
	      return this;
	    }
	  }, {
	    key: "addError",
	    value: function addError(e) {
	      this.errors.push(e);
	      return this;
	    }
	  }, {
	    key: "addStrictError",
	    value: function addStrictError(e) {
	      this.strictErrors.push(e);
	      return this;
	    }
	  }, {
	    key: "enforceStrictErrors",
	    value: function enforceStrictErrors() {
	      [].push.apply(this.errors, this.strictErrors);
	      this.strictErrors = [];
	      return this;
	    }
	
	    // MONOID IMPLEMENTATION
	
	  }, {
	    key: "concat",
	    value: function concat(s) {
	      if (this === identity) return s;
	      if (s === identity) return this;
	      [].push.apply(this.errors, s.errors);
	      [].push.apply(this.strictErrors, s.strictErrors);
	      [].push.apply(this.usedLabelNames, s.usedLabelNames);
	      [].push.apply(this.freeBreakStatements, s.freeBreakStatements);
	      [].push.apply(this.freeContinueStatements, s.freeContinueStatements);
	      [].push.apply(this.freeLabeledBreakStatements, s.freeLabeledBreakStatements);
	      [].push.apply(this.freeLabeledContinueStatements, s.freeLabeledContinueStatements);
	      [].push.apply(this.newTargetExpressions, s.newTargetExpressions);
	      this.boundNames.addEach(s.boundNames);
	      this.lexicallyDeclaredNames.addEach(s.lexicallyDeclaredNames);
	      this.functionDeclarationNames.addEach(s.functionDeclarationNames);
	      this.varDeclaredNames.addEach(s.varDeclaredNames);
	      [].push.apply(this.forOfVarDeclaredNames, s.forOfVarDeclaredNames);
	      this.exportedNames.addEach(s.exportedNames);
	      this.exportedBindings.addEach(s.exportedBindings);
	      [].push.apply(this.superCallExpressions, s.superCallExpressions);
	      [].push.apply(this.superCallExpressionsInConstructorMethod, s.superCallExpressionsInConstructorMethod);
	      [].push.apply(this.superPropertyExpressions, s.superPropertyExpressions);
	      [].push.apply(this.yieldExpressions, s.yieldExpressions);
	      return this;
	    }
	  }], [{
	    key: "empty",
	    value: function empty() {
	      return identity;
	    }
	  }]);
	
	  return EarlyErrorState;
	}();
	
	identity = new EarlyErrorState();
	Object.getOwnPropertyNames(EarlyErrorState.prototype).forEach(function (methodName) {
	  if (methodName === "constructor") return;
	  Object.defineProperty(identity, methodName, {
	    value: function value() {
	      return EarlyErrorState.prototype[methodName].apply(new EarlyErrorState(), arguments);
	    },
	    enumerable: false,
	    writable: true,
	    configurable: true
	  });
	});
	
	var EarlyError = exports.EarlyError = function (_Error) {
	  _inherits(EarlyError, _Error);
	
	  function EarlyError(node, message) {
	    _classCallCheck(this, EarlyError);
	
	    var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(EarlyError).call(this, message));
	
	    _this5.node = node;
	    _this5.message = message;
	    return _this5;
	  }
	
	  return EarlyError;
	}(Error);

/***/ },

/***/ "./node_modules/es6-map/implement.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	if (!__webpack_require__("./node_modules/es6-map/is-implemented.js")()) {
		Object.defineProperty(__webpack_require__("./node_modules/es5-ext/global.js"), 'Map',
			{ value: __webpack_require__("./node_modules/es6-map/polyfill.js"), configurable: true, enumerable: false,
				writable: true });
	}


/***/ },

/***/ "./node_modules/es6-map/is-implemented.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var map, iterator, result;
		if (typeof Map !== 'function') return false;
		try {
			// WebKit doesn't support arguments and crashes
			map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
		} catch (e) {
			return false;
		}
		if (String(map) !== '[object Map]') return false;
		if (map.size !== 3) return false;
		if (typeof map.clear !== 'function') return false;
		if (typeof map.delete !== 'function') return false;
		if (typeof map.entries !== 'function') return false;
		if (typeof map.forEach !== 'function') return false;
		if (typeof map.get !== 'function') return false;
		if (typeof map.has !== 'function') return false;
		if (typeof map.keys !== 'function') return false;
		if (typeof map.set !== 'function') return false;
		if (typeof map.values !== 'function') return false;
	
		iterator = map.entries();
		result = iterator.next();
		if (result.done !== false) return false;
		if (!result.value) return false;
		if (result.value[0] !== 'raz') return false;
		if (result.value[1] !== 'one') return false;
	
		return true;
	};


/***/ },

/***/ "./node_modules/es5-ext/global.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = new Function("return this")();


/***/ },

/***/ "./node_modules/es6-map/polyfill.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var clear          = __webpack_require__("./node_modules/es5-ext/array/#/clear.js")
	  , eIndexOf       = __webpack_require__("./node_modules/es5-ext/array/#/e-index-of.js")
	  , setPrototypeOf = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/index.js")
	  , callable       = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js")
	  , validValue     = __webpack_require__("./node_modules/es5-ext/object/valid-value.js")
	  , d              = __webpack_require__("./node_modules/d/index.js")
	  , ee             = __webpack_require__("./node_modules/event-emitter/index.js")
	  , Symbol         = __webpack_require__("./node_modules/es6-symbol/index.js")
	  , iterator       = __webpack_require__("./node_modules/es6-iterator/valid-iterable.js")
	  , forOf          = __webpack_require__("./node_modules/es6-iterator/for-of.js")
	  , Iterator       = __webpack_require__("./node_modules/es6-map/lib/iterator.js")
	  , isNative       = __webpack_require__("./node_modules/es6-map/is-native-implemented.js")
	
	  , call = Function.prototype.call
	  , defineProperties = Object.defineProperties, getPrototypeOf = Object.getPrototypeOf
	  , MapPoly;
	
	module.exports = MapPoly = function (/*iterable*/) {
		var iterable = arguments[0], keys, values, self;
		if (!(this instanceof MapPoly)) throw new TypeError('Constructor requires \'new\'');
		if (isNative && setPrototypeOf && (Map !== MapPoly)) {
			self = setPrototypeOf(new Map(), getPrototypeOf(this));
		} else {
			self = this;
		}
		if (iterable != null) iterator(iterable);
		defineProperties(self, {
			__mapKeysData__: d('c', keys = []),
			__mapValuesData__: d('c', values = [])
		});
		if (!iterable) return self;
		forOf(iterable, function (value) {
			var key = validValue(value)[0];
			value = value[1];
			if (eIndexOf.call(keys, key) !== -1) return;
			keys.push(key);
			values.push(value);
		}, self);
		return self;
	};
	
	if (isNative) {
		if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
		MapPoly.prototype = Object.create(Map.prototype, {
			constructor: d(MapPoly)
		});
	}
	
	ee(defineProperties(MapPoly.prototype, {
		clear: d(function () {
			if (!this.__mapKeysData__.length) return;
			clear.call(this.__mapKeysData__);
			clear.call(this.__mapValuesData__);
			this.emit('_clear');
		}),
		delete: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return false;
			this.__mapKeysData__.splice(index, 1);
			this.__mapValuesData__.splice(index, 1);
			this.emit('_delete', index, key);
			return true;
		}),
		entries: d(function () { return new Iterator(this, 'key+value'); }),
		forEach: d(function (cb/*, thisArg*/) {
			var thisArg = arguments[1], iterator, result;
			callable(cb);
			iterator = this.entries();
			result = iterator._next();
			while (result !== undefined) {
				call.call(cb, thisArg, this.__mapValuesData__[result],
					this.__mapKeysData__[result], this);
				result = iterator._next();
			}
		}),
		get: d(function (key) {
			var index = eIndexOf.call(this.__mapKeysData__, key);
			if (index === -1) return;
			return this.__mapValuesData__[index];
		}),
		has: d(function (key) {
			return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
		}),
		keys: d(function () { return new Iterator(this, 'key'); }),
		set: d(function (key, value) {
			var index = eIndexOf.call(this.__mapKeysData__, key), emit;
			if (index === -1) {
				index = this.__mapKeysData__.push(key) - 1;
				emit = true;
			}
			this.__mapValuesData__[index] = value;
			if (emit) this.emit('_add', index, key);
			return this;
		}),
		size: d.gs(function () { return this.__mapKeysData__.length; }),
		values: d(function () { return new Iterator(this, 'value'); }),
		toString: d(function () { return '[object Map]'; })
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
		return this.entries();
	}));
	Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));


/***/ },

/***/ "./node_modules/es5-ext/array/#/clear.js":
/***/ function(module, exports, __webpack_require__) {

	// Inspired by Google Closure:
	// http://closure-library.googlecode.com/svn/docs/
	// closure_goog_array_array.js.html#goog.array.clear
	
	'use strict';
	
	var value = __webpack_require__("./node_modules/es5-ext/object/valid-value.js");
	
	module.exports = function () {
		value(this).length = 0;
		return this;
	};


/***/ },

/***/ "./node_modules/es5-ext/object/valid-value.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },

/***/ "./node_modules/es5-ext/array/#/e-index-of.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toPosInt = __webpack_require__("./node_modules/es5-ext/number/to-pos-integer.js")
	  , value    = __webpack_require__("./node_modules/es5-ext/object/valid-value.js")
	
	  , indexOf = Array.prototype.indexOf
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , abs = Math.abs, floor = Math.floor;
	
	module.exports = function (searchElement/*, fromIndex*/) {
		var i, l, fromIndex, val;
		if (searchElement === searchElement) { //jslint: ignore
			return indexOf.apply(this, arguments);
		}
	
		l = toPosInt(value(this).length);
		fromIndex = arguments[1];
		if (isNaN(fromIndex)) fromIndex = 0;
		else if (fromIndex >= 0) fromIndex = floor(fromIndex);
		else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));
	
		for (i = fromIndex; i < l; ++i) {
			if (hasOwnProperty.call(this, i)) {
				val = this[i];
				if (val !== val) return i; //jslint: ignore
			}
		}
		return -1;
	};


/***/ },

/***/ "./node_modules/es5-ext/number/to-pos-integer.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toInteger = __webpack_require__("./node_modules/es5-ext/number/to-integer.js")
	
	  , max = Math.max;
	
	module.exports = function (value) { return max(0, toInteger(value)); };


/***/ },

/***/ "./node_modules/es5-ext/number/to-integer.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sign = __webpack_require__("./node_modules/es5-ext/math/sign/index.js")
	
	  , abs = Math.abs, floor = Math.floor;
	
	module.exports = function (value) {
		if (isNaN(value)) return 0;
		value = Number(value);
		if ((value === 0) || !isFinite(value)) return value;
		return sign(value) * floor(abs(value));
	};


/***/ },

/***/ "./node_modules/es5-ext/math/sign/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__("./node_modules/es5-ext/math/sign/is-implemented.js")()
		? Math.sign
		: __webpack_require__("./node_modules/es5-ext/math/sign/shim.js");


/***/ },

/***/ "./node_modules/es5-ext/math/sign/is-implemented.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var sign = Math.sign;
		if (typeof sign !== 'function') return false;
		return ((sign(10) === 1) && (sign(-20) === -1));
	};


/***/ },

/***/ "./node_modules/es5-ext/math/sign/shim.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (value) {
		value = Number(value);
		if (isNaN(value) || (value === 0)) return value;
		return (value > 0) ? 1 : -1;
	};


/***/ },

/***/ "./node_modules/es5-ext/object/set-prototype-of/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/is-implemented.js")()
		? Object.setPrototypeOf
		: __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/shim.js");


/***/ },

/***/ "./node_modules/es5-ext/object/set-prototype-of/is-implemented.js":
/***/ function(module, exports) {

	'use strict';
	
	var create = Object.create, getPrototypeOf = Object.getPrototypeOf
	  , x = {};
	
	module.exports = function (/*customCreate*/) {
		var setPrototypeOf = Object.setPrototypeOf
		  , customCreate = arguments[0] || create;
		if (typeof setPrototypeOf !== 'function') return false;
		return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
	};


/***/ },

/***/ "./node_modules/es5-ext/object/set-prototype-of/shim.js":
/***/ function(module, exports, __webpack_require__) {

	// Big thanks to @WebReflection for sorting this out
	// https://gist.github.com/WebReflection/5593554
	
	'use strict';
	
	var isObject      = __webpack_require__("./node_modules/es5-ext/object/is-object.js")
	  , value         = __webpack_require__("./node_modules/es5-ext/object/valid-value.js")
	
	  , isPrototypeOf = Object.prototype.isPrototypeOf
	  , defineProperty = Object.defineProperty
	  , nullDesc = { configurable: true, enumerable: false, writable: true,
			value: undefined }
	  , validate;
	
	validate = function (obj, prototype) {
		value(obj);
		if ((prototype === null) || isObject(prototype)) return obj;
		throw new TypeError('Prototype must be null or an object');
	};
	
	module.exports = (function (status) {
		var fn, set;
		if (!status) return null;
		if (status.level === 2) {
			if (status.set) {
				set = status.set;
				fn = function (obj, prototype) {
					set.call(validate(obj, prototype), prototype);
					return obj;
				};
			} else {
				fn = function (obj, prototype) {
					validate(obj, prototype).__proto__ = prototype;
					return obj;
				};
			}
		} else {
			fn = function self(obj, prototype) {
				var isNullBase;
				validate(obj, prototype);
				isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
				if (isNullBase) delete self.nullPolyfill.__proto__;
				if (prototype === null) prototype = self.nullPolyfill;
				obj.__proto__ = prototype;
				if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
				return obj;
			};
		}
		return Object.defineProperty(fn, 'level', { configurable: false,
			enumerable: false, writable: false, value: status.level });
	}((function () {
		var x = Object.create(null), y = {}, set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
	
		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(x, y);
			} catch (ignore) { }
			if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
		}
	
		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 2 };
	
		x = {};
		x.__proto__ = y;
		if (Object.getPrototypeOf(x) === y) return { level: 1 };
	
		return false;
	}())));
	
	__webpack_require__("./node_modules/es5-ext/object/create.js");


/***/ },

/***/ "./node_modules/es5-ext/object/is-object.js":
/***/ function(module, exports) {

	'use strict';
	
	var map = { function: true, object: true };
	
	module.exports = function (x) {
		return ((x != null) && map[typeof x]) || false;
	};


/***/ },

/***/ "./node_modules/es5-ext/object/create.js":
/***/ function(module, exports, __webpack_require__) {

	// Workaround for http://code.google.com/p/v8/issues/detail?id=2804
	
	'use strict';
	
	var create = Object.create, shim;
	
	if (!__webpack_require__("./node_modules/es5-ext/object/set-prototype-of/is-implemented.js")()) {
		shim = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/shim.js");
	}
	
	module.exports = (function () {
		var nullObject, props, desc;
		if (!shim) return create;
		if (shim.level !== 1) return create;
	
		nullObject = {};
		props = {};
		desc = { configurable: false, enumerable: false, writable: true,
			value: undefined };
		Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
			if (name === '__proto__') {
				props[name] = { configurable: true, enumerable: false, writable: true,
					value: undefined };
				return;
			}
			props[name] = desc;
		});
		Object.defineProperties(nullObject, props);
	
		Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
			enumerable: false, writable: false, value: nullObject });
	
		return function (prototype, props) {
			return create((prototype === null) ? nullObject : prototype, props);
		};
	}());


/***/ },

/***/ "./node_modules/es5-ext/object/valid-callable.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ },

/***/ "./node_modules/d/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign        = __webpack_require__("./node_modules/es5-ext/object/assign/index.js")
	  , normalizeOpts = __webpack_require__("./node_modules/es5-ext/object/normalize-options.js")
	  , isCallable    = __webpack_require__("./node_modules/es5-ext/object/is-callable.js")
	  , contains      = __webpack_require__("./node_modules/es5-ext/string/#/contains/index.js")
	
	  , d;
	
	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}
	
		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};
	
	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}
	
		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },

/***/ "./node_modules/es5-ext/object/assign/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__("./node_modules/es5-ext/object/assign/is-implemented.js")()
		? Object.assign
		: __webpack_require__("./node_modules/es5-ext/object/assign/shim.js");


/***/ },

/***/ "./node_modules/es5-ext/object/assign/is-implemented.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },

/***/ "./node_modules/es5-ext/object/assign/shim.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys  = __webpack_require__("./node_modules/es5-ext/object/keys/index.js")
	  , value = __webpack_require__("./node_modules/es5-ext/object/valid-value.js")
	
	  , max = Math.max;
	
	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },

/***/ "./node_modules/shift-parser/dist/tokenizer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.JsError = exports.TokenType = exports.TokenClass = undefined;
	
	var _utils = __webpack_require__("./node_modules/shift-parser/dist/utils.js");
	
	var _errors = __webpack_require__("./node_modules/shift-parser/dist/errors.js");
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014 Shape Security, Inc.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache License, Version 2.0 (the "License")
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * you may not use this file except in compliance with the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * You may obtain a copy of the License at
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *     http://www.apache.org/licenses/LICENSE-2.0
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Unless required by applicable law or agreed to in writing, software
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * distributed under the License is distributed on an "AS IS" BASIS,
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * See the License for the specific language governing permissions and
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * limitations under the License.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	var TokenClass = exports.TokenClass = {
	  Eof: { name: "<End>" },
	  Ident: { name: "Identifier", isIdentifierName: true },
	  Keyword: { name: "Keyword", isIdentifierName: true },
	  NumericLiteral: { name: "Numeric" },
	  TemplateElement: { name: "Template" },
	  Punctuator: { name: "Punctuator" },
	  StringLiteral: { name: "String" },
	  RegularExpression: { name: "RegularExpression" },
	  Illegal: { name: "Illegal" }
	};
	
	var TokenType = exports.TokenType = {
	  EOS: { klass: TokenClass.Eof, name: "EOS" },
	  LPAREN: { klass: TokenClass.Punctuator, name: "(" },
	  RPAREN: { klass: TokenClass.Punctuator, name: ")" },
	  LBRACK: { klass: TokenClass.Punctuator, name: "[" },
	  RBRACK: { klass: TokenClass.Punctuator, name: "]" },
	  LBRACE: { klass: TokenClass.Punctuator, name: "{" },
	  RBRACE: { klass: TokenClass.Punctuator, name: "}" },
	  COLON: { klass: TokenClass.Punctuator, name: ":" },
	  SEMICOLON: { klass: TokenClass.Punctuator, name: ";" },
	  PERIOD: { klass: TokenClass.Punctuator, name: "." },
	  ELLIPSIS: { klass: TokenClass.Punctuator, name: "..." },
	  ARROW: { klass: TokenClass.Punctuator, name: "=>" },
	  CONDITIONAL: { klass: TokenClass.Punctuator, name: "?" },
	  INC: { klass: TokenClass.Punctuator, name: "++" },
	  DEC: { klass: TokenClass.Punctuator, name: "--" },
	  ASSIGN: { klass: TokenClass.Punctuator, name: "=" },
	  ASSIGN_BIT_OR: { klass: TokenClass.Punctuator, name: "|=" },
	  ASSIGN_BIT_XOR: { klass: TokenClass.Punctuator, name: "^=" },
	  ASSIGN_BIT_AND: { klass: TokenClass.Punctuator, name: "&=" },
	  ASSIGN_SHL: { klass: TokenClass.Punctuator, name: "<<=" },
	  ASSIGN_SHR: { klass: TokenClass.Punctuator, name: ">>=" },
	  ASSIGN_SHR_UNSIGNED: { klass: TokenClass.Punctuator, name: ">>>=" },
	  ASSIGN_ADD: { klass: TokenClass.Punctuator, name: "+=" },
	  ASSIGN_SUB: { klass: TokenClass.Punctuator, name: "-=" },
	  ASSIGN_MUL: { klass: TokenClass.Punctuator, name: "*=" },
	  ASSIGN_DIV: { klass: TokenClass.Punctuator, name: "/=" },
	  ASSIGN_MOD: { klass: TokenClass.Punctuator, name: "%=" },
	  COMMA: { klass: TokenClass.Punctuator, name: "," },
	  OR: { klass: TokenClass.Punctuator, name: "||" },
	  AND: { klass: TokenClass.Punctuator, name: "&&" },
	  BIT_OR: { klass: TokenClass.Punctuator, name: "|" },
	  BIT_XOR: { klass: TokenClass.Punctuator, name: "^" },
	  BIT_AND: { klass: TokenClass.Punctuator, name: "&" },
	  SHL: { klass: TokenClass.Punctuator, name: "<<" },
	  SHR: { klass: TokenClass.Punctuator, name: ">>" },
	  SHR_UNSIGNED: { klass: TokenClass.Punctuator, name: ">>>" },
	  ADD: { klass: TokenClass.Punctuator, name: "+" },
	  SUB: { klass: TokenClass.Punctuator, name: "-" },
	  MUL: { klass: TokenClass.Punctuator, name: "*" },
	  DIV: { klass: TokenClass.Punctuator, name: "/" },
	  MOD: { klass: TokenClass.Punctuator, name: "%" },
	  EQ: { klass: TokenClass.Punctuator, name: "==" },
	  NE: { klass: TokenClass.Punctuator, name: "!=" },
	  EQ_STRICT: { klass: TokenClass.Punctuator, name: "===" },
	  NE_STRICT: { klass: TokenClass.Punctuator, name: "!==" },
	  LT: { klass: TokenClass.Punctuator, name: "<" },
	  GT: { klass: TokenClass.Punctuator, name: ">" },
	  LTE: { klass: TokenClass.Punctuator, name: "<=" },
	  GTE: { klass: TokenClass.Punctuator, name: ">=" },
	  INSTANCEOF: { klass: TokenClass.Keyword, name: "instanceof" },
	  IN: { klass: TokenClass.Keyword, name: "in" },
	  NOT: { klass: TokenClass.Punctuator, name: "!" },
	  BIT_NOT: { klass: TokenClass.Punctuator, name: "~" },
	  AWAIT: { klass: TokenClass.Keyword, name: "await" },
	  DELETE: { klass: TokenClass.Keyword, name: "delete" },
	  TYPEOF: { klass: TokenClass.Keyword, name: "typeof" },
	  VOID: { klass: TokenClass.Keyword, name: "void" },
	  BREAK: { klass: TokenClass.Keyword, name: "break" },
	  CASE: { klass: TokenClass.Keyword, name: "case" },
	  CATCH: { klass: TokenClass.Keyword, name: "catch" },
	  CLASS: { klass: TokenClass.Keyword, name: "class" },
	  CONTINUE: { klass: TokenClass.Keyword, name: "continue" },
	  DEBUGGER: { klass: TokenClass.Keyword, name: "debugger" },
	  DEFAULT: { klass: TokenClass.Keyword, name: "default" },
	  DO: { klass: TokenClass.Keyword, name: "do" },
	  ELSE: { klass: TokenClass.Keyword, name: "else" },
	  EXPORT: { klass: TokenClass.Keyword, name: "export" },
	  EXTENDS: { klass: TokenClass.Keyword, name: "extends" },
	  FINALLY: { klass: TokenClass.Keyword, name: "finally" },
	  FOR: { klass: TokenClass.Keyword, name: "for" },
	  FUNCTION: { klass: TokenClass.Keyword, name: "function" },
	  IF: { klass: TokenClass.Keyword, name: "if" },
	  IMPORT: { klass: TokenClass.Keyword, name: "import" },
	  LET: { klass: TokenClass.Keyword, name: "let" },
	  NEW: { klass: TokenClass.Keyword, name: "new" },
	  RETURN: { klass: TokenClass.Keyword, name: "return" },
	  SUPER: { klass: TokenClass.Keyword, name: "super" },
	  SWITCH: { klass: TokenClass.Keyword, name: "switch" },
	  THIS: { klass: TokenClass.Keyword, name: "this" },
	  THROW: { klass: TokenClass.Keyword, name: "throw" },
	  TRY: { klass: TokenClass.Keyword, name: "try" },
	  VAR: { klass: TokenClass.Keyword, name: "var" },
	  WHILE: { klass: TokenClass.Keyword, name: "while" },
	  WITH: { klass: TokenClass.Keyword, name: "with" },
	  NULL: { klass: TokenClass.Keyword, name: "null" },
	  TRUE: { klass: TokenClass.Keyword, name: "true" },
	  FALSE: { klass: TokenClass.Keyword, name: "false" },
	  YIELD: { klass: TokenClass.Keyword, name: "yield" },
	  NUMBER: { klass: TokenClass.NumericLiteral, name: "" },
	  STRING: { klass: TokenClass.StringLiteral, name: "" },
	  REGEXP: { klass: TokenClass.RegularExpression, name: "" },
	  IDENTIFIER: { klass: TokenClass.Ident, name: "" },
	  CONST: { klass: TokenClass.Keyword, name: "const" },
	  TEMPLATE: { klass: TokenClass.TemplateElement, name: "" },
	  ILLEGAL: { klass: TokenClass.Illegal, name: "" }
	};
	
	var TT = TokenType;
	var I = TT.ILLEGAL;
	var F = false;
	var T = true;
	
	var ONE_CHAR_PUNCTUATOR = [I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, TT.NOT, I, I, I, TT.MOD, TT.BIT_AND, I, TT.LPAREN, TT.RPAREN, TT.MUL, TT.ADD, TT.COMMA, TT.SUB, TT.PERIOD, TT.DIV, I, I, I, I, I, I, I, I, I, I, TT.COLON, TT.SEMICOLON, TT.LT, TT.ASSIGN, TT.GT, TT.CONDITIONAL, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, TT.LBRACK, I, TT.RBRACK, TT.BIT_XOR, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, TT.LBRACE, TT.BIT_OR, TT.RBRACE, TT.BIT_NOT];
	
	var PUNCTUATOR_START = [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, T, F, F, F, T, T, F, T, T, T, T, T, T, F, T, F, F, F, F, F, F, F, F, F, F, T, T, T, T, T, T, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, T, F, T, T, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, T, T, T, T, F];
	
	var JsError = exports.JsError = function (_Error) {
	  _inherits(JsError, _Error);
	
	  function JsError(index, line, column, msg) {
	    _classCallCheck(this, JsError);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JsError).call(this, msg));
	
	    _this.index = index;
	    _this.line = line;
	    _this.column = column;
	    _this.description = msg;
	    _this.message = "[" + line + ":" + column + "]: " + msg;
	    return _this;
	  }
	
	  return JsError;
	}(Error);
	
	function fromCodePoint(cp) {
	  if (cp <= 0xFFFF) return String.fromCharCode(cp);
	  var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
	  var cu2 = String.fromCharCode((cp - 0x10000) % 0x400 + 0xDC00);
	  return cu1 + cu2;
	}
	
	function decodeUtf16(lead, trail) {
	  return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	}
	
	var Tokenizer = function () {
	  function Tokenizer(source) {
	    _classCallCheck(this, Tokenizer);
	
	    this.source = source;
	    this.index = 0;
	    this.line = 0;
	    this.lineStart = 0;
	    this.startIndex = 0;
	    this.startLine = 0;
	    this.startLineStart = 0;
	    this.lastIndex = 0;
	    this.lastLine = 0;
	    this.lastLineStart = 0;
	    this.hasLineTerminatorBeforeNext = false;
	    this.tokenIndex = 0;
	  }
	
	  _createClass(Tokenizer, [{
	    key: "saveLexerState",
	    value: function saveLexerState() {
	      return {
	        source: this.source,
	        index: this.index,
	        line: this.line,
	        lineStart: this.lineStart,
	        startIndex: this.startIndex,
	        startLine: this.startLine,
	        startLineStart: this.startLineStart,
	        lastIndex: this.lastIndex,
	        lastLine: this.lastLine,
	        lastLineStart: this.lastLineStart,
	        lookahead: this.lookahead,
	        hasLineTerminatorBeforeNext: this.hasLineTerminatorBeforeNext,
	        tokenIndex: this.tokenIndex
	      };
	    }
	  }, {
	    key: "restoreLexerState",
	    value: function restoreLexerState(state) {
	      this.source = state.source;
	      this.index = state.index;
	      this.line = state.line;
	      this.lineStart = state.lineStart;
	      this.startIndex = state.startIndex;
	      this.startLine = state.startLine;
	      this.startLineStart = state.startLineStart;
	      this.lastIndex = state.lastIndex;
	      this.lastLine = state.lastLine;
	      this.lastLineStart = state.lastLineStart;
	      this.lookahead = state.lookahead;
	      this.hasLineTerminatorBeforeNext = state.hasLineTerminatorBeforeNext;
	      this.tokenIndex = state.tokenIndex;
	    }
	  }, {
	    key: "createILLEGAL",
	    value: function createILLEGAL() {
	      this.startIndex = this.index;
	      this.startLine = this.line;
	      this.startLineStart = this.lineStart;
	      return this.index < this.source.length ? this.createError(_errors.ErrorMessages.UNEXPECTED_ILLEGAL_TOKEN, this.source.charAt(this.index)) : this.createError(_errors.ErrorMessages.UNEXPECTED_EOS);
	    }
	  }, {
	    key: "createUnexpected",
	    value: function createUnexpected(token) {
	      switch (token.type.klass) {
	        case TokenClass.Eof:
	          return this.createError(_errors.ErrorMessages.UNEXPECTED_EOS);
	        case TokenClass.Ident:
	          return this.createError(_errors.ErrorMessages.UNEXPECTED_IDENTIFIER);
	        case TokenClass.Keyword:
	          return this.createError(_errors.ErrorMessages.UNEXPECTED_TOKEN, token.slice.text);
	        case TokenClass.NumericLiteral:
	          return this.createError(_errors.ErrorMessages.UNEXPECTED_NUMBER);
	        case TokenClass.TemplateElement:
	          return this.createError(_errors.ErrorMessages.UNEXPECTED_TEMPLATE);
	        case TokenClass.Punctuator:
	          return this.createError(_errors.ErrorMessages.UNEXPECTED_TOKEN, token.type.name);
	        case TokenClass.StringLiteral:
	          return this.createError(_errors.ErrorMessages.UNEXPECTED_STRING);
	        // the other token classes are RegularExpression and Illegal, but they cannot reach here
	      }
	    }
	  }, {
	    key: "createError",
	    value: function createError(message) {
	      var _arguments = arguments;
	
	      /* istanbul ignore next */
	      var msg = message.replace(/\{(\d+)\}/g, function (_, n) {
	        return JSON.stringify(_arguments[+n + 1]);
	      });
	      return new JsError(this.startIndex, this.startLine + 1, this.startIndex - this.startLineStart + 1, msg);
	    }
	  }, {
	    key: "createErrorWithLocation",
	    value: function createErrorWithLocation(location, message) {
	      var _arguments2 = arguments;
	
	      /* istanbul ignore next */
	      var msg = message.replace(/\{(\d+)\}/g, function (_, n) {
	        return JSON.stringify(_arguments2[+n + 2]);
	      });
	      if (location.slice && location.slice.startLocation) {
	        location = location.slice.startLocation;
	      }
	      return new JsError(location.offset, location.line, location.column + 1, msg);
	    }
	  }, {
	    key: "getKeyword",
	    value: function getKeyword(id) {
	      if (id.length === 1 || id.length > 10) {
	        return TokenType.IDENTIFIER;
	      }
	
	      /* istanbul ignore next */
	      switch (id.length) {
	        case 2:
	          switch (id.charAt(0)) {
	            case "i":
	              switch (id.charAt(1)) {
	                case "f":
	                  return TokenType.IF;
	                case "n":
	                  return TokenType.IN;
	                default:
	                  break;
	              }
	              break;
	            case "d":
	              if (id.charAt(1) === "o") {
	                return TokenType.DO;
	              }
	              break;
	          }
	          break;
	        case 3:
	          switch (id.charAt(0)) {
	            case "v":
	              if (Tokenizer.cse2(id, "a", "r")) {
	                return TokenType.VAR;
	              }
	              break;
	            case "f":
	              if (Tokenizer.cse2(id, "o", "r")) {
	                return TokenType.FOR;
	              }
	              break;
	            case "n":
	              if (Tokenizer.cse2(id, "e", "w")) {
	                return TokenType.NEW;
	              }
	              break;
	            case "t":
	              if (Tokenizer.cse2(id, "r", "y")) {
	                return TokenType.TRY;
	              }
	              break;
	            case "l":
	              if (Tokenizer.cse2(id, "e", "t")) {
	                return TokenType.LET;
	              }
	              break;
	          }
	          break;
	        case 4:
	          switch (id.charAt(0)) {
	            case "t":
	              if (Tokenizer.cse3(id, "h", "i", "s")) {
	                return TokenType.THIS;
	              } else if (Tokenizer.cse3(id, "r", "u", "e")) {
	                return TokenType.TRUE;
	              }
	              break;
	            case "n":
	              if (Tokenizer.cse3(id, "u", "l", "l")) {
	                return TokenType.NULL;
	              }
	              break;
	            case "e":
	              if (Tokenizer.cse3(id, "l", "s", "e")) {
	                return TokenType.ELSE;
	              }
	              break;
	            case "c":
	              if (Tokenizer.cse3(id, "a", "s", "e")) {
	                return TokenType.CASE;
	              }
	              break;
	            case "v":
	              if (Tokenizer.cse3(id, "o", "i", "d")) {
	                return TokenType.VOID;
	              }
	              break;
	            case "w":
	              if (Tokenizer.cse3(id, "i", "t", "h")) {
	                return TokenType.WITH;
	              }
	              break;
	          }
	          break;
	        case 5:
	          switch (id.charAt(0)) {
	            case "a":
	              if (this.moduleIsTheGoalSymbol && Tokenizer.cse4(id, "w", "a", "i", "t")) {
	                return TokenType.AWAIT;
	              }
	              break;
	            case "w":
	              if (Tokenizer.cse4(id, "h", "i", "l", "e")) {
	                return TokenType.WHILE;
	              }
	              break;
	            case "b":
	              if (Tokenizer.cse4(id, "r", "e", "a", "k")) {
	                return TokenType.BREAK;
	              }
	              break;
	            case "f":
	              if (Tokenizer.cse4(id, "a", "l", "s", "e")) {
	                return TokenType.FALSE;
	              }
	              break;
	            case "c":
	              if (Tokenizer.cse4(id, "a", "t", "c", "h")) {
	                return TokenType.CATCH;
	              } else if (Tokenizer.cse4(id, "o", "n", "s", "t")) {
	                return TokenType.CONST;
	              } else if (Tokenizer.cse4(id, "l", "a", "s", "s")) {
	                return TokenType.CLASS;
	              }
	              break;
	            case "t":
	              if (Tokenizer.cse4(id, "h", "r", "o", "w")) {
	                return TokenType.THROW;
	              }
	              break;
	            case "y":
	              if (Tokenizer.cse4(id, "i", "e", "l", "d")) {
	                return TokenType.YIELD;
	              }
	              break;
	            case "s":
	              if (Tokenizer.cse4(id, "u", "p", "e", "r")) {
	                return TokenType.SUPER;
	              }
	              break;
	          }
	          break;
	        case 6:
	          switch (id.charAt(0)) {
	            case "r":
	              if (Tokenizer.cse5(id, "e", "t", "u", "r", "n")) {
	                return TokenType.RETURN;
	              }
	              break;
	            case "t":
	              if (Tokenizer.cse5(id, "y", "p", "e", "o", "f")) {
	                return TokenType.TYPEOF;
	              }
	              break;
	            case "d":
	              if (Tokenizer.cse5(id, "e", "l", "e", "t", "e")) {
	                return TokenType.DELETE;
	              }
	              break;
	            case "s":
	              if (Tokenizer.cse5(id, "w", "i", "t", "c", "h")) {
	                return TokenType.SWITCH;
	              }
	              break;
	            case "e":
	              if (Tokenizer.cse5(id, "x", "p", "o", "r", "t")) {
	                return TokenType.EXPORT;
	              }
	              break;
	            case "i":
	              if (Tokenizer.cse5(id, "m", "p", "o", "r", "t")) {
	                return TokenType.IMPORT;
	              }
	              break;
	          }
	          break;
	        case 7:
	          switch (id.charAt(0)) {
	            case "d":
	              if (Tokenizer.cse6(id, "e", "f", "a", "u", "l", "t")) {
	                return TokenType.DEFAULT;
	              }
	              break;
	            case "f":
	              if (Tokenizer.cse6(id, "i", "n", "a", "l", "l", "y")) {
	                return TokenType.FINALLY;
	              }
	              break;
	            case "e":
	              if (Tokenizer.cse6(id, "x", "t", "e", "n", "d", "s")) {
	                return TokenType.EXTENDS;
	              }
	              break;
	          }
	          break;
	        case 8:
	          switch (id.charAt(0)) {
	            case "f":
	              if (Tokenizer.cse7(id, "u", "n", "c", "t", "i", "o", "n")) {
	                return TokenType.FUNCTION;
	              }
	              break;
	            case "c":
	              if (Tokenizer.cse7(id, "o", "n", "t", "i", "n", "u", "e")) {
	                return TokenType.CONTINUE;
	              }
	              break;
	            case "d":
	              if (Tokenizer.cse7(id, "e", "b", "u", "g", "g", "e", "r")) {
	                return TokenType.DEBUGGER;
	              }
	              break;
	          }
	          break;
	        case 10:
	          if (id === "instanceof") {
	            return TokenType.INSTANCEOF;
	          }
	          break;
	      }
	      return TokenType.IDENTIFIER;
	    }
	  }, {
	    key: "skipSingleLineComment",
	    value: function skipSingleLineComment(offset) {
	      this.index += offset;
	      while (this.index < this.source.length) {
	        /**
	         * @type {Number}
	         */
	        var chCode = this.source.charCodeAt(this.index);
	        this.index++;
	        if ((0, _utils.isLineTerminator)(chCode)) {
	          this.hasLineTerminatorBeforeNext = true;
	          if (chCode === 0xD /* "\r" */ && this.source.charCodeAt(this.index) === 0xA /*"\n" */) {
	              this.index++;
	            }
	          this.lineStart = this.index;
	          this.line++;
	          return;
	        }
	      }
	    }
	  }, {
	    key: "skipMultiLineComment",
	    value: function skipMultiLineComment() {
	      this.index += 2;
	      var length = this.source.length;
	      var isLineStart = false;
	      while (this.index < length) {
	        var chCode = this.source.charCodeAt(this.index);
	        if (chCode < 0x80) {
	          switch (chCode) {
	            case 42:
	              // "*"
	              // Block comment ends with "*/".
	              if (this.source.charAt(this.index + 1) === "/") {
	                this.index = this.index + 2;
	                return isLineStart;
	              }
	              this.index++;
	              break;
	            case 10:
	              // "\n"
	              isLineStart = true;
	              this.hasLineTerminatorBeforeNext = true;
	              this.index++;
	              this.lineStart = this.index;
	              this.line++;
	              break;
	            case 13:
	              // "\r":
	              isLineStart = true;
	              this.hasLineTerminatorBeforeNext = true;
	              if (this.source.charAt(this.index + 1) === "\n") {
	                this.index++;
	              }
	              this.index++;
	              this.lineStart = this.index;
	              this.line++;
	              break;
	            default:
	              this.index++;
	          }
	        } else if (chCode === 0x2028 || chCode === 0x2029) {
	          isLineStart = true;
	          this.hasLineTerminatorBeforeNext = true;
	          this.index++;
	          this.lineStart = this.index;
	          this.line++;
	        } else {
	          this.index++;
	        }
	      }
	      throw this.createILLEGAL();
	    }
	  }, {
	    key: "skipComment",
	    value: function skipComment() {
	      this.hasLineTerminatorBeforeNext = false;
	
	      var isLineStart = this.index === 0;
	      var length = this.source.length;
	
	      while (this.index < length) {
	        var chCode = this.source.charCodeAt(this.index);
	        if ((0, _utils.isWhiteSpace)(chCode)) {
	          this.index++;
	        } else if ((0, _utils.isLineTerminator)(chCode)) {
	          this.hasLineTerminatorBeforeNext = true;
	          this.index++;
	          if (chCode === 13 /* "\r" */ && this.source.charAt(this.index) === "\n") {
	            this.index++;
	          }
	          this.lineStart = this.index;
	          this.line++;
	          isLineStart = true;
	        } else if (chCode === 47 /* "/" */) {
	            if (this.index + 1 >= length) {
	              break;
	            }
	            chCode = this.source.charCodeAt(this.index + 1);
	            if (chCode === 47 /* "/" */) {
	                this.skipSingleLineComment(2);
	                isLineStart = true;
	              } else if (chCode === 42 /* "*" */) {
	                isLineStart = this.skipMultiLineComment() || isLineStart;
	              } else {
	              break;
	            }
	          } else if (!this.moduleIsTheGoalSymbol && isLineStart && chCode === 45 /* "-" */) {
	            if (this.index + 2 >= length) {
	              break;
	            }
	            // U+003E is ">"
	            if (this.source.charAt(this.index + 1) === "-" && this.source.charAt(this.index + 2) === ">") {
	              // "-->" is a single-line comment
	              this.skipSingleLineComment(3);
	            } else {
	              break;
	            }
	          } else if (!this.moduleIsTheGoalSymbol && chCode === 60 /* "<" */) {
	            if (this.source.slice(this.index + 1, this.index + 4) === "!--") {
	              this.skipSingleLineComment(4);
	            } else {
	              break;
	            }
	          } else {
	          break;
	        }
	      }
	    }
	  }, {
	    key: "scanHexEscape2",
	    value: function scanHexEscape2() {
	      if (this.index + 2 > this.source.length) {
	        return -1;
	      }
	      var r1 = (0, _utils.getHexValue)(this.source.charAt(this.index));
	      if (r1 === -1) {
	        return -1;
	      }
	      var r2 = (0, _utils.getHexValue)(this.source.charAt(this.index + 1));
	      if (r2 === -1) {
	        return -1;
	      }
	      this.index += 2;
	      return r1 << 4 | r2;
	    }
	  }, {
	    key: "scanUnicode",
	    value: function scanUnicode() {
	      if (this.source.charAt(this.index) === "{") {
	        //\u{HexDigits}
	        var i = this.index + 1;
	        var hexDigits = 0,
	            ch = undefined;
	        while (i < this.source.length) {
	          ch = this.source.charAt(i);
	          var hex = (0, _utils.getHexValue)(ch);
	          if (hex === -1) {
	            break;
	          }
	          hexDigits = hexDigits << 4 | hex;
	          if (hexDigits > 0x10FFFF) {
	            throw this.createILLEGAL();
	          }
	          i++;
	        }
	        if (ch !== "}") {
	          throw this.createILLEGAL();
	        }
	        this.index = i + 1;
	        return hexDigits;
	      } else {
	        //\uHex4Digits
	        if (this.index + 4 > this.source.length) {
	          return -1;
	        }
	        var r1 = (0, _utils.getHexValue)(this.source.charAt(this.index));
	        if (r1 === -1) {
	          return -1;
	        }
	        var r2 = (0, _utils.getHexValue)(this.source.charAt(this.index + 1));
	        if (r2 === -1) {
	          return -1;
	        }
	        var r3 = (0, _utils.getHexValue)(this.source.charAt(this.index + 2));
	        if (r3 === -1) {
	          return -1;
	        }
	        var r4 = (0, _utils.getHexValue)(this.source.charAt(this.index + 3));
	        if (r4 === -1) {
	          return -1;
	        }
	        this.index += 4;
	        return r1 << 12 | r2 << 8 | r3 << 4 | r4;
	      }
	    }
	  }, {
	    key: "getEscapedIdentifier",
	    value: function getEscapedIdentifier() {
	      var id = "";
	      var check = _utils.isIdentifierStart;
	
	      while (this.index < this.source.length) {
	        var ch = this.source.charAt(this.index);
	        var code = ch.charCodeAt(0);
	        var start = this.index;
	        ++this.index;
	        if (ch === "\\") {
	          if (this.index >= this.source.length) {
	            throw this.createILLEGAL();
	          }
	          if (this.source.charAt(this.index) !== "u") {
	            throw this.createILLEGAL();
	          }
	          ++this.index;
	          code = this.scanUnicode();
	          if (code < 0) {
	            throw this.createILLEGAL();
	          }
	          ch = fromCodePoint(code);
	        } else if (0xD800 <= code && code <= 0xDBFF) {
	          if (this.index >= this.source.length) {
	            throw this.createILLEGAL();
	          }
	          var lowSurrogateCode = this.source.charCodeAt(this.index);
	          ++this.index;
	          if (!(0xDC00 <= lowSurrogateCode && lowSurrogateCode <= 0xDFFF)) {
	            throw this.createILLEGAL();
	          }
	          code = decodeUtf16(code, lowSurrogateCode);
	          ch = fromCodePoint(code);
	        }
	        if (!check(code)) {
	          if (id.length < 1) {
	            throw this.createILLEGAL();
	          }
	          this.index = start;
	          return id;
	        }
	        check = _utils.isIdentifierPart;
	        id += ch;
	      }
	      return id;
	    }
	  }, {
	    key: "getIdentifier",
	    value: function getIdentifier() {
	      var start = this.index;
	      var l = this.source.length;
	      var i = this.index;
	      var check = _utils.isIdentifierStart;
	      while (i < l) {
	        var ch = this.source.charAt(i);
	        var code = ch.charCodeAt(0);
	        if (ch === "\\" || 0xD800 <= code && code <= 0xDBFF) {
	          // Go back and try the hard one.
	          this.index = start;
	          return this.getEscapedIdentifier();
	        }
	        if (!check(code)) {
	          this.index = i;
	          return this.source.slice(start, i);
	        }
	        ++i;
	        check = _utils.isIdentifierPart;
	      }
	      this.index = i;
	      return this.source.slice(start, i);
	    }
	  }, {
	    key: "scanIdentifier",
	    value: function scanIdentifier() {
	      var startLocation = this.getLocation();
	      var start = this.index;
	
	      // Backslash (U+005C) starts an escaped character.
	      var id = this.source.charAt(this.index) === "\\" ? this.getEscapedIdentifier() : this.getIdentifier();
	
	      // There is no keyword or literal with only one character.
	      // Thus, it must be an identifier.
	      var slice = this.getSlice(start, startLocation);
	      slice.text = id;
	
	      return { type: this.getKeyword(id), value: id, slice: slice };
	    }
	  }, {
	    key: "getLocation",
	    value: function getLocation() {
	      return {
	        line: this.startLine + 1,
	        column: this.startIndex - this.startLineStart,
	        offset: this.startIndex
	      };
	    }
	  }, {
	    key: "getSlice",
	    value: function getSlice(start, startLocation) {
	      return { text: this.source.slice(start, this.index), start: start, startLocation: startLocation, end: this.index };
	    }
	  }, {
	    key: "scanPunctuatorHelper",
	    value: function scanPunctuatorHelper() {
	      var ch1 = this.source.charAt(this.index);
	
	      switch (ch1) {
	        // Check for most common single-character punctuators.
	        case ".":
	          var ch2 = this.source.charAt(this.index + 1);
	          if (ch2 !== ".") return TokenType.PERIOD;
	          var ch3 = this.source.charAt(this.index + 2);
	          if (ch3 !== ".") return TokenType.PERIOD;
	          return TokenType.ELLIPSIS;
	        case "(":
	          return TokenType.LPAREN;
	        case ")":
	        case ";":
	        case ",":
	          return ONE_CHAR_PUNCTUATOR[ch1.charCodeAt(0)];
	        case "{":
	          return TokenType.LBRACE;
	        case "}":
	        case "[":
	        case "]":
	        case ":":
	        case "?":
	        case "~":
	          return ONE_CHAR_PUNCTUATOR[ch1.charCodeAt(0)];
	        default:
	          // "=" (U+003D) marks an assignment or comparison operator.
	          if (this.index + 1 < this.source.length && this.source.charAt(this.index + 1) === "=") {
	            switch (ch1) {
	              case "=":
	                if (this.index + 2 < this.source.length && this.source.charAt(this.index + 2) === "=") {
	                  return TokenType.EQ_STRICT;
	                }
	                return TokenType.EQ;
	              case "!":
	                if (this.index + 2 < this.source.length && this.source.charAt(this.index + 2) === "=") {
	                  return TokenType.NE_STRICT;
	                }
	                return TokenType.NE;
	              case "|":
	                return TokenType.ASSIGN_BIT_OR;
	              case "+":
	                return TokenType.ASSIGN_ADD;
	              case "-":
	                return TokenType.ASSIGN_SUB;
	              case "*":
	                return TokenType.ASSIGN_MUL;
	              case "<":
	                return TokenType.LTE;
	              case ">":
	                return TokenType.GTE;
	              case "/":
	                return TokenType.ASSIGN_DIV;
	              case "%":
	                return TokenType.ASSIGN_MOD;
	              case "^":
	                return TokenType.ASSIGN_BIT_XOR;
	              case "&":
	                return TokenType.ASSIGN_BIT_AND;
	              // istanbul ignore next
	              default:
	                break; //failed
	            }
	          }
	      }
	
	      if (this.index + 1 < this.source.length) {
	        var ch2 = this.source.charAt(this.index + 1);
	        if (ch1 === ch2) {
	          if (this.index + 2 < this.source.length) {
	            var ch3 = this.source.charAt(this.index + 2);
	            if (ch1 === ">" && ch3 === ">") {
	              // 4-character punctuator: >>>=
	              if (this.index + 3 < this.source.length && this.source.charAt(this.index + 3) === "=") {
	                return TokenType.ASSIGN_SHR_UNSIGNED;
	              }
	              return TokenType.SHR_UNSIGNED;
	            }
	
	            if (ch1 === "<" && ch3 === "=") {
	              return TokenType.ASSIGN_SHL;
	            }
	
	            if (ch1 === ">" && ch3 === "=") {
	              return TokenType.ASSIGN_SHR;
	            }
	          }
	          // Other 2-character punctuators: ++ -- << >> && ||
	          switch (ch1) {
	            case "+":
	              return TokenType.INC;
	            case "-":
	              return TokenType.DEC;
	            case "<":
	              return TokenType.SHL;
	            case ">":
	              return TokenType.SHR;
	            case "&":
	              return TokenType.AND;
	            case "|":
	              return TokenType.OR;
	            // istanbul ignore next
	            default:
	              break; //failed
	          }
	        } else if (ch1 === "=" && ch2 === ">") {
	            return TokenType.ARROW;
	          }
	      }
	
	      return ONE_CHAR_PUNCTUATOR[ch1.charCodeAt(0)];
	    }
	
	    // 7.7 Punctuators
	
	  }, {
	    key: "scanPunctuator",
	    value: function scanPunctuator() {
	      var startLocation = this.getLocation();
	      var start = this.index;
	      var subType = this.scanPunctuatorHelper();
	      this.index += subType.name.length;
	      return { type: subType, value: subType.name, slice: this.getSlice(start, startLocation) };
	    }
	  }, {
	    key: "scanHexLiteral",
	    value: function scanHexLiteral(start, startLocation) {
	      var i = this.index;
	      while (i < this.source.length) {
	        var ch = this.source.charAt(i);
	        var hex = (0, _utils.getHexValue)(ch);
	        if (hex === -1) {
	          break;
	        }
	        i++;
	      }
	
	      if (this.index === i) {
	        throw this.createILLEGAL();
	      }
	
	      if (i < this.source.length && (0, _utils.isIdentifierStart)(this.source.charCodeAt(i))) {
	        throw this.createILLEGAL();
	      }
	
	      this.index = i;
	
	      var slice = this.getSlice(start, startLocation);
	      return { type: TokenType.NUMBER, value: parseInt(slice.text.substr(2), 16), slice: slice };
	    }
	  }, {
	    key: "scanBinaryLiteral",
	    value: function scanBinaryLiteral(start, startLocation) {
	      var offset = this.index - start;
	
	      while (this.index < this.source.length) {
	        var ch = this.source.charAt(this.index);
	        if (ch !== "0" && ch !== "1") {
	          break;
	        }
	        this.index++;
	      }
	
	      if (this.index - start <= offset) {
	        throw this.createILLEGAL();
	      }
	
	      if (this.index < this.source.length && ((0, _utils.isIdentifierStart)(this.source.charCodeAt(this.index)) || (0, _utils.isDecimalDigit)(this.source.charCodeAt(this.index)))) {
	        throw this.createILLEGAL();
	      }
	
	      return {
	        type: TokenType.NUMBER,
	        value: parseInt(this.getSlice(start, startLocation).text.substr(offset), 2),
	        slice: this.getSlice(start, startLocation),
	        octal: false,
	        noctal: false
	      };
	    }
	  }, {
	    key: "scanOctalLiteral",
	    value: function scanOctalLiteral(start, startLocation) {
	      while (this.index < this.source.length) {
	        var ch = this.source.charAt(this.index);
	        if ("0" <= ch && ch <= "7") {
	          this.index++;
	        } else if ((0, _utils.isIdentifierPart)(ch.charCodeAt(0))) {
	          throw this.createILLEGAL();
	        } else {
	          break;
	        }
	      }
	
	      if (this.index - start === 2) {
	        throw this.createILLEGAL();
	      }
	
	      return {
	        type: TokenType.NUMBER,
	        value: parseInt(this.getSlice(start, startLocation).text.substr(2), 8),
	        slice: this.getSlice(start, startLocation),
	        octal: false,
	        noctal: false
	      };
	    }
	  }, {
	    key: "scanLegacyOctalLiteral",
	    value: function scanLegacyOctalLiteral(start, startLocation) {
	      var isOctal = true;
	
	      while (this.index < this.source.length) {
	        var ch = this.source.charAt(this.index);
	        if ("0" <= ch && ch <= "7") {
	          this.index++;
	        } else if (ch === "8" || ch === "9") {
	          isOctal = false;
	          this.index++;
	        } else if ((0, _utils.isIdentifierPart)(ch.charCodeAt(0))) {
	          throw this.createILLEGAL();
	        } else {
	          break;
	        }
	      }
	
	      return {
	        type: TokenType.NUMBER,
	        slice: this.getSlice(start, startLocation),
	        value: parseInt(this.getSlice(start, startLocation).text.substr(1), isOctal ? 8 : 10),
	        octal: true,
	        noctal: !isOctal
	      };
	    }
	  }, {
	    key: "scanNumericLiteral",
	    value: function scanNumericLiteral() {
	      var ch = this.source.charAt(this.index);
	      // assert(ch === "." || "0" <= ch && ch <= "9")
	      var startLocation = this.getLocation();
	      var start = this.index;
	
	      if (ch === "0") {
	        this.index++;
	        if (this.index < this.source.length) {
	          ch = this.source.charAt(this.index);
	          if (ch === "x" || ch === "X") {
	            this.index++;
	            return this.scanHexLiteral(start, startLocation);
	          } else if (ch === "b" || ch === "B") {
	            this.index++;
	            return this.scanBinaryLiteral(start, startLocation);
	          } else if (ch === "o" || ch === "O") {
	            this.index++;
	            return this.scanOctalLiteral(start, startLocation);
	          } else if ("0" <= ch && ch <= "9") {
	            return this.scanLegacyOctalLiteral(start, startLocation);
	          }
	        } else {
	          var _slice = this.getSlice(start, startLocation);
	          return {
	            type: TokenType.NUMBER,
	            value: +_slice.text,
	            slice: _slice,
	            octal: false,
	            noctal: false
	          };
	        }
	      } else if (ch !== ".") {
	        // Must be "1".."9"
	        ch = this.source.charAt(this.index);
	        while ("0" <= ch && ch <= "9") {
	          this.index++;
	          if (this.index === this.source.length) {
	            var _slice2 = this.getSlice(start, startLocation);
	            return {
	              type: TokenType.NUMBER,
	              value: +_slice2.text,
	              slice: _slice2,
	              octal: false,
	              noctal: false
	            };
	          }
	          ch = this.source.charAt(this.index);
	        }
	      }
	
	      var e = 0;
	      if (ch === ".") {
	        this.index++;
	        if (this.index === this.source.length) {
	          var _slice3 = this.getSlice(start, startLocation);
	          return {
	            type: TokenType.NUMBER,
	            value: +_slice3.text,
	            slice: _slice3,
	            octal: false,
	            noctal: false
	          };
	        }
	
	        ch = this.source.charAt(this.index);
	        while ("0" <= ch && ch <= "9") {
	          e++;
	          this.index++;
	          if (this.index === this.source.length) {
	            var _slice4 = this.getSlice(start, startLocation);
	            return {
	              type: TokenType.NUMBER,
	              value: +_slice4.text,
	              slice: _slice4,
	              octal: false,
	              noctal: false
	            };
	          }
	          ch = this.source.charAt(this.index);
	        }
	      }
	
	      // EOF not reached here
	      if (ch === "e" || ch === "E") {
	        this.index++;
	        if (this.index === this.source.length) {
	          throw this.createILLEGAL();
	        }
	
	        ch = this.source.charAt(this.index);
	        var neg = false;
	        if (ch === "+" || ch === "-") {
	          neg = ch === "-";
	          this.index++;
	          if (this.index === this.source.length) {
	            throw this.createILLEGAL();
	          }
	          ch = this.source.charAt(this.index);
	        }
	
	        var f = 0;
	        if ("0" <= ch && ch <= "9") {
	          while ("0" <= ch && ch <= "9") {
	            f *= 10;
	            f += +ch;
	            this.index++;
	            if (this.index === this.source.length) {
	              break;
	            }
	            ch = this.source.charAt(this.index);
	          }
	        } else {
	          throw this.createILLEGAL();
	        }
	        e += neg ? f : -f;
	      }
	
	      if ((0, _utils.isIdentifierStart)(ch.charCodeAt(0))) {
	        throw this.createILLEGAL();
	      }
	
	      var slice = this.getSlice(start, startLocation);
	      return {
	        type: TokenType.NUMBER,
	        value: +slice.text,
	        slice: slice,
	        octal: false,
	        noctal: false
	      };
	    }
	  }, {
	    key: "scanStringEscape",
	    value: function scanStringEscape(str, octal) {
	      this.index++;
	      if (this.index === this.source.length) {
	        throw this.createILLEGAL();
	      }
	      var ch = this.source.charAt(this.index);
	      if (!(0, _utils.isLineTerminator)(ch.charCodeAt(0))) {
	        switch (ch) {
	          case "n":
	            str += "\n";
	            this.index++;
	            break;
	          case "r":
	            str += "\r";
	            this.index++;
	            break;
	          case "t":
	            str += "\t";
	            this.index++;
	            break;
	          case "u":
	          case "x":
	            var unescaped = undefined;
	            this.index++;
	            if (this.index >= this.source.length) {
	              throw this.createILLEGAL();
	            }
	            unescaped = ch === "u" ? this.scanUnicode() : this.scanHexEscape2();
	            if (unescaped < 0) {
	              throw this.createILLEGAL();
	            }
	            str += fromCodePoint(unescaped);
	            break;
	          case "b":
	            str += "\b";
	            this.index++;
	            break;
	          case "f":
	            str += "\f";
	            this.index++;
	            break;
	          case "v":
	            str += "\u000b";
	            this.index++;
	            break;
	          default:
	            if ("0" <= ch && ch <= "7") {
	              var octalStart = this.index;
	              var octLen = 1;
	              // 3 digits are only allowed when string starts
	              // with 0, 1, 2, 3
	              if ("0" <= ch && ch <= "3") {
	                octLen = 0;
	              }
	              var code = 0;
	              while (octLen < 3 && "0" <= ch && ch <= "7") {
	                this.index++;
	                if (octLen > 0 || ch !== "0") {
	                  octal = this.source.slice(octalStart, this.index);
	                }
	                code *= 8;
	                code += ch - "0";
	                octLen++;
	                if (this.index === this.source.length) {
	                  throw this.createILLEGAL();
	                }
	                ch = this.source.charAt(this.index);
	              }
	              str += String.fromCharCode(code);
	            } else if (ch === "8" || ch === "9") {
	              throw this.createILLEGAL();
	            } else {
	              str += ch;
	              this.index++;
	            }
	        }
	      } else {
	        this.index++;
	        if (ch === "\r" && this.source.charAt(this.index) === "\n") {
	          this.index++;
	        }
	        this.lineStart = this.index;
	        this.line++;
	      }
	      return [str, octal];
	    }
	    // 7.8.4 String Literals
	
	  }, {
	    key: "scanStringLiteral",
	    value: function scanStringLiteral() {
	      var str = "";
	
	      var quote = this.source.charAt(this.index);
	      //  assert((quote === "\"" || quote === """), "String literal must starts with a quote")
	
	      var startLocation = this.getLocation();
	      var start = this.index;
	      this.index++;
	
	      var octal = null;
	      while (this.index < this.source.length) {
	        var ch = this.source.charAt(this.index);
	        if (ch === quote) {
	          this.index++;
	          return { type: TokenType.STRING, slice: this.getSlice(start, startLocation), str: str, octal: octal };
	        } else if (ch === "\\") {
	          var _scanStringEscape = this.scanStringEscape(str, octal);
	
	          var _scanStringEscape2 = _slicedToArray(_scanStringEscape, 2);
	
	          str = _scanStringEscape2[0];
	          octal = _scanStringEscape2[1];
	        } else if ((0, _utils.isLineTerminator)(ch.charCodeAt(0))) {
	          throw this.createILLEGAL();
	        } else {
	          str += ch;
	          this.index++;
	        }
	      }
	
	      throw this.createILLEGAL();
	    }
	  }, {
	    key: "scanTemplateElement",
	    value: function scanTemplateElement() {
	      var startLocation = this.getLocation();
	      var start = this.index;
	      this.index++;
	      while (this.index < this.source.length) {
	        var ch = this.source.charCodeAt(this.index);
	        switch (ch) {
	          case 0x60:
	            // `
	            this.index++;
	            return { type: TokenType.TEMPLATE, tail: true, slice: this.getSlice(start, startLocation) };
	          case 0x24:
	            // $
	            if (this.source.charCodeAt(this.index + 1) === 0x7B) {
	              // {
	              this.index += 2;
	              return { type: TokenType.TEMPLATE, tail: false, slice: this.getSlice(start, startLocation) };
	            }
	            this.index++;
	            break;
	          case 0x5C:
	            // \\
	            {
	              var octal = this.scanStringEscape("", null)[1];
	              if (octal != null) {
	                throw this.createILLEGAL();
	              }
	              break;
	            }
	          default:
	            this.index++;
	        }
	      }
	
	      throw this.createILLEGAL();
	    }
	  }, {
	    key: "scanRegExp",
	    value: function scanRegExp(str) {
	      var startLocation = this.getLocation();
	      var start = this.index;
	
	      var terminated = false;
	      var classMarker = false;
	      while (this.index < this.source.length) {
	        var ch = this.source.charAt(this.index);
	        if (ch === "\\") {
	          str += ch;
	          this.index++;
	          ch = this.source.charAt(this.index);
	          // ECMA-262 7.8.5
	          if ((0, _utils.isLineTerminator)(ch.charCodeAt(0))) {
	            throw this.createError(_errors.ErrorMessages.UNTERMINATED_REGEXP);
	          }
	          str += ch;
	          this.index++;
	        } else if ((0, _utils.isLineTerminator)(ch.charCodeAt(0))) {
	          throw this.createError(_errors.ErrorMessages.UNTERMINATED_REGEXP);
	        } else {
	          if (classMarker) {
	            if (ch === "]") {
	              classMarker = false;
	            }
	          } else {
	            if (ch === "/") {
	              terminated = true;
	              str += ch;
	              this.index++;
	              break;
	            } else if (ch === "[") {
	              classMarker = true;
	            }
	          }
	          str += ch;
	          this.index++;
	        }
	      }
	
	      if (!terminated) {
	        throw this.createError(_errors.ErrorMessages.UNTERMINATED_REGEXP);
	      }
	
	      while (this.index < this.source.length) {
	        var ch = this.source.charAt(this.index);
	        if (ch === "\\") {
	          throw this.createError(_errors.ErrorMessages.INVALID_REGEXP_FLAGS);
	        }
	        if (!(0, _utils.isIdentifierPart)(ch.charCodeAt(0))) {
	          break;
	        }
	        this.index++;
	        str += ch;
	      }
	      return { type: TokenType.REGEXP, value: str, slice: this.getSlice(start, startLocation) };
	    }
	  }, {
	    key: "advance",
	    value: function advance() {
	      var startLocation = this.getLocation();
	
	      this.lastIndex = this.index;
	      this.lastLine = this.line;
	      this.lastLineStart = this.lineStart;
	
	      this.skipComment();
	
	      this.startIndex = this.index;
	      this.startLine = this.line;
	      this.startLineStart = this.lineStart;
	
	      if (this.lastIndex === 0) {
	        this.lastIndex = this.index;
	        this.lastLine = this.line;
	        this.lastLineStart = this.lineStart;
	      }
	
	      if (this.index >= this.source.length) {
	        return { type: TokenType.EOS, slice: this.getSlice(this.index, startLocation) };
	      }
	
	      var charCode = this.source.charCodeAt(this.index);
	
	      if (charCode < 0x80) {
	        if (PUNCTUATOR_START[charCode]) {
	          return this.scanPunctuator();
	        }
	
	        if ((0, _utils.isIdentifierStart)(charCode) || charCode === 0x5C /* backslash (\) */) {
	            return this.scanIdentifier();
	          }
	
	        // Dot (.) U+002E can also start a floating-point number, hence the need
	        // to check the next character.
	        if (charCode === 0x2E) {
	          if (this.index + 1 < this.source.length && (0, _utils.isDecimalDigit)(this.source.charCodeAt(this.index + 1))) {
	            return this.scanNumericLiteral();
	          }
	          return this.scanPunctuator();
	        }
	
	        // String literal starts with single quote (U+0027) or double quote (U+0022).
	        if (charCode === 0x27 || charCode === 0x22) {
	          return this.scanStringLiteral();
	        }
	
	        // Template literal starts with back quote (U+0060)
	        if (charCode === 0x60) {
	          return this.scanTemplateElement();
	        }
	
	        if (0x30 /* "0" */ <= charCode && charCode <= 0x39 /* "9" */) {
	            return this.scanNumericLiteral();
	          }
	
	        // Slash (/) U+002F can also start a regex.
	        throw this.createILLEGAL();
	      } else {
	        if ((0, _utils.isIdentifierStart)(charCode) || 0xD800 <= charCode && charCode <= 0xDBFF) {
	          return this.scanIdentifier();
	        }
	
	        throw this.createILLEGAL();
	      }
	    }
	  }, {
	    key: "eof",
	    value: function eof() {
	      return this.lookahead.type === TokenType.EOS;
	    }
	  }, {
	    key: "lex",
	    value: function lex() {
	      var prevToken = this.lookahead;
	      this.lookahead = this.advance();
	      this.tokenIndex++;
	      return prevToken;
	    }
	  }], [{
	    key: "cse2",
	    value: function cse2(id, ch1, ch2) {
	      return id.charAt(1) === ch1 && id.charAt(2) === ch2;
	    }
	  }, {
	    key: "cse3",
	    value: function cse3(id, ch1, ch2, ch3) {
	      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3;
	    }
	  }, {
	    key: "cse4",
	    value: function cse4(id, ch1, ch2, ch3, ch4) {
	      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3 && id.charAt(4) === ch4;
	    }
	  }, {
	    key: "cse5",
	    value: function cse5(id, ch1, ch2, ch3, ch4, ch5) {
	      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3 && id.charAt(4) === ch4 && id.charAt(5) === ch5;
	    }
	  }, {
	    key: "cse6",
	    value: function cse6(id, ch1, ch2, ch3, ch4, ch5, ch6) {
	      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3 && id.charAt(4) === ch4 && id.charAt(5) === ch5 && id.charAt(6) === ch6;
	    }
	  }, {
	    key: "cse7",
	    value: function cse7(id, ch1, ch2, ch3, ch4, ch5, ch6, ch7) {
	      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3 && id.charAt(4) === ch4 && id.charAt(5) === ch5 && id.charAt(6) === ch6 && id.charAt(7) === ch7;
	    }
	  }]);
	
	  return Tokenizer;
	}();
	
	exports.default = Tokenizer;

/***/ },

/***/ "./node_modules/es5-ext/object/keys/is-implemented.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },

/***/ "./node_modules/es5-ext/object/keys/shim.js":
/***/ function(module, exports) {

	'use strict';
	
	var keys = Object.keys;
	
	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },

/***/ "./node_modules/es5-ext/object/normalize-options.js":
/***/ function(module, exports) {

	'use strict';
	
	var forEach = Array.prototype.forEach, create = Object.create;
	
	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};
	
	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },

/***/ "./node_modules/es5-ext/object/is-callable.js":
/***/ function(module, exports) {

	// Deprecated
	
	'use strict';
	
	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },

/***/ "./node_modules/es5-ext/string/#/contains/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__("./node_modules/es5-ext/string/#/contains/is-implemented.js")()
		? String.prototype.contains
		: __webpack_require__("./node_modules/es5-ext/string/#/contains/shim.js");


/***/ },

/***/ "./node_modules/es5-ext/string/#/contains/is-implemented.js":
/***/ function(module, exports) {

	'use strict';
	
	var str = 'razdwatrzy';
	
	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },

/***/ "./node_modules/es5-ext/string/#/contains/shim.js":
/***/ function(module, exports) {

	'use strict';
	
	var indexOf = String.prototype.indexOf;
	
	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },

/***/ "./node_modules/event-emitter/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var d        = __webpack_require__("./node_modules/d/index.js")
	  , callable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js")
	
	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }
	
	  , on, once, off, emit, methods, descriptors, base;
	
	on = function (type, listener) {
		var data;
	
		callable(listener);
	
		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];
	
		return this;
	};
	
	once = function (type, listener) {
		var once, self;
	
		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});
	
		once.__eeOnceListener__ = listener;
		return this;
	};
	
	off = function (type, listener) {
		var data, listeners, candidate, i;
	
		callable(listener);
	
		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];
	
		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}
	
		return this;
	};
	
	emit = function (type) {
		var i, l, listener, listeners, args;
	
		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;
	
		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
	
			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};
	
	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};
	
	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};
	
	base = defineProperties({}, descriptors);
	
	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ },

/***/ "./node_modules/es6-symbol/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__("./node_modules/es6-symbol/is-implemented.js")() ? Symbol : __webpack_require__("./node_modules/es6-symbol/polyfill.js");


/***/ },

/***/ "./node_modules/es6-symbol/is-implemented.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
		var symbol;
		if (typeof Symbol !== 'function') return false;
		symbol = Symbol('test symbol');
		try { String(symbol); } catch (e) { return false; }
		if (typeof Symbol.iterator === 'symbol') return true;
	
		// Return 'true' for polyfills
		if (typeof Symbol.isConcatSpreadable !== 'object') return false;
		if (typeof Symbol.iterator !== 'object') return false;
		if (typeof Symbol.toPrimitive !== 'object') return false;
		if (typeof Symbol.toStringTag !== 'object') return false;
		if (typeof Symbol.unscopables !== 'object') return false;
	
		return true;
	};


/***/ },

/***/ "./node_modules/es6-symbol/polyfill.js":
/***/ function(module, exports, __webpack_require__) {

	// ES2015 Symbol polyfill for environments that do not support it (or partially support it_
	
	'use strict';
	
	var d              = __webpack_require__("./node_modules/d/index.js")
	  , validateSymbol = __webpack_require__("./node_modules/es6-symbol/validate-symbol.js")
	
	  , create = Object.create, defineProperties = Object.defineProperties
	  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
	  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null);
	
	if (typeof Symbol === 'function') NativeSymbol = Symbol;
	
	var generateName = (function () {
		var created = create(null);
		return function (desc) {
			var postfix = 0, name, ie11BugWorkaround;
			while (created[desc + (postfix || '')]) ++postfix;
			desc += (postfix || '');
			created[desc] = true;
			name = '@@' + desc;
			defineProperty(objPrototype, name, d.gs(null, function (value) {
				// For IE11 issue see:
				// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
				//    ie11-broken-getters-on-dom-objects
				// https://github.com/medikoo/es6-symbol/issues/12
				if (ie11BugWorkaround) return;
				ie11BugWorkaround = true;
				defineProperty(this, name, d(value));
				ie11BugWorkaround = false;
			}));
			return name;
		};
	}());
	
	// Internal constructor (not one exposed) for creating Symbol instances.
	// This one is used to ensure that `someSymbol instanceof Symbol` always return false
	HiddenSymbol = function Symbol(description) {
		if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
		return SymbolPolyfill(description);
	};
	
	// Exposed `Symbol` constructor
	// (returns instances of HiddenSymbol)
	module.exports = SymbolPolyfill = function Symbol(description) {
		var symbol;
		if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
		symbol = create(HiddenSymbol.prototype);
		description = (description === undefined ? '' : String(description));
		return defineProperties(symbol, {
			__description__: d('', description),
			__name__: d('', generateName(description))
		});
	};
	defineProperties(SymbolPolyfill, {
		for: d(function (key) {
			if (globalSymbols[key]) return globalSymbols[key];
			return (globalSymbols[key] = SymbolPolyfill(String(key)));
		}),
		keyFor: d(function (s) {
			var key;
			validateSymbol(s);
			for (key in globalSymbols) if (globalSymbols[key] === s) return key;
		}),
	
		// If there's native implementation of given symbol, let's fallback to it
		// to ensure proper interoperability with other native functions e.g. Array.from
		hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
		isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
			SymbolPolyfill('isConcatSpreadable')),
		iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
		match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
		replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
		search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
		species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
		split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
		toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
		toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
		unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
	});
	
	// Internal tweaks for real symbol producer
	defineProperties(HiddenSymbol.prototype, {
		constructor: d(SymbolPolyfill),
		toString: d('', function () { return this.__name__; })
	});
	
	// Proper implementation of methods exposed on Symbol.prototype
	// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
	defineProperties(SymbolPolyfill.prototype, {
		toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
		valueOf: d(function () { return validateSymbol(this); })
	});
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('',
		function () { return validateSymbol(this); }));
	defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));
	
	// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));
	
	// Note: It's important to define `toPrimitive` as last one, as some implementations
	// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
	// And that may invoke error in definition flow:
	// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
	defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
		d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ },

/***/ "./node_modules/es6-symbol/validate-symbol.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isSymbol = __webpack_require__("./node_modules/es6-symbol/is-symbol.js");
	
	module.exports = function (value) {
		if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
		return value;
	};


/***/ },

/***/ "./node_modules/es6-symbol/is-symbol.js":
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (x) {
		return (x && ((typeof x === 'symbol') || (x['@@toStringTag'] === 'Symbol'))) || false;
	};


/***/ },

/***/ "./node_modules/es6-iterator/valid-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isIterable = __webpack_require__("./node_modules/es6-iterator/is-iterable.js");
	
	module.exports = function (value) {
		if (!isIterable(value)) throw new TypeError(value + " is not iterable");
		return value;
	};


/***/ },

/***/ "./node_modules/es6-iterator/is-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArguments    = __webpack_require__("./node_modules/es5-ext/function/is-arguments.js")
	  , isString       = __webpack_require__("./node_modules/es5-ext/string/is-string.js")
	  , iteratorSymbol = __webpack_require__("./node_modules/es6-symbol/index.js").iterator
	
	  , isArray = Array.isArray;
	
	module.exports = function (value) {
		if (value == null) return false;
		if (isArray(value)) return true;
		if (isString(value)) return true;
		if (isArguments(value)) return true;
		return (typeof value[iteratorSymbol] === 'function');
	};


/***/ },

/***/ "./node_modules/es5-ext/function/is-arguments.js":
/***/ function(module, exports) {

	'use strict';
	
	var toString = Object.prototype.toString
	
	  , id = toString.call((function () { return arguments; }()));
	
	module.exports = function (x) { return (toString.call(x) === id); };


/***/ },

/***/ "./node_modules/es5-ext/string/is-string.js":
/***/ function(module, exports) {

	'use strict';
	
	var toString = Object.prototype.toString
	
	  , id = toString.call('');
	
	module.exports = function (x) {
		return (typeof x === 'string') || (x && (typeof x === 'object') &&
			((x instanceof String) || (toString.call(x) === id))) || false;
	};


/***/ },

/***/ "./node_modules/es6-iterator/for-of.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArguments = __webpack_require__("./node_modules/es5-ext/function/is-arguments.js")
	  , callable    = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js")
	  , isString    = __webpack_require__("./node_modules/es5-ext/string/is-string.js")
	  , get         = __webpack_require__("./node_modules/es6-iterator/get.js")
	
	  , isArray = Array.isArray, call = Function.prototype.call
	  , some = Array.prototype.some;
	
	module.exports = function (iterable, cb/*, thisArg*/) {
		var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
		if (isArray(iterable) || isArguments(iterable)) mode = 'array';
		else if (isString(iterable)) mode = 'string';
		else iterable = get(iterable);
	
		callable(cb);
		doBreak = function () { broken = true; };
		if (mode === 'array') {
			some.call(iterable, function (value) {
				call.call(cb, thisArg, value, doBreak);
				if (broken) return true;
			});
			return;
		}
		if (mode === 'string') {
			l = iterable.length;
			for (i = 0; i < l; ++i) {
				char = iterable[i];
				if ((i + 1) < l) {
					code = char.charCodeAt(0);
					if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
				}
				call.call(cb, thisArg, char, doBreak);
				if (broken) break;
			}
			return;
		}
		result = iterable.next();
	
		while (!result.done) {
			call.call(cb, thisArg, result.value, doBreak);
			if (broken) return;
			result = iterable.next();
		}
	};


/***/ },

/***/ "./node_modules/es6-iterator/get.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isArguments    = __webpack_require__("./node_modules/es5-ext/function/is-arguments.js")
	  , isString       = __webpack_require__("./node_modules/es5-ext/string/is-string.js")
	  , ArrayIterator  = __webpack_require__("./node_modules/es6-iterator/array.js")
	  , StringIterator = __webpack_require__("./node_modules/es6-iterator/string.js")
	  , iterable       = __webpack_require__("./node_modules/es6-iterator/valid-iterable.js")
	  , iteratorSymbol = __webpack_require__("./node_modules/es6-symbol/index.js").iterator;
	
	module.exports = function (obj) {
		if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
		if (isArguments(obj)) return new ArrayIterator(obj);
		if (isString(obj)) return new StringIterator(obj);
		return new ArrayIterator(obj);
	};


/***/ },

/***/ "./node_modules/es6-iterator/array.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setPrototypeOf = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/index.js")
	  , contains       = __webpack_require__("./node_modules/es5-ext/string/#/contains/index.js")
	  , d              = __webpack_require__("./node_modules/d/index.js")
	  , Iterator       = __webpack_require__("./node_modules/es6-iterator/index.js")
	
	  , defineProperty = Object.defineProperty
	  , ArrayIterator;
	
	ArrayIterator = module.exports = function (arr, kind) {
		if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
		Iterator.call(this, arr);
		if (!kind) kind = 'value';
		else if (contains.call(kind, 'key+value')) kind = 'key+value';
		else if (contains.call(kind, 'key')) kind = 'key';
		else kind = 'value';
		defineProperty(this, '__kind__', d('', kind));
	};
	if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);
	
	ArrayIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(ArrayIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__list__[i];
			if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
			return i;
		}),
		toString: d(function () { return '[object Array Iterator]'; })
	});


/***/ },

/***/ "./node_modules/es6-iterator/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var clear    = __webpack_require__("./node_modules/es5-ext/array/#/clear.js")
	  , assign   = __webpack_require__("./node_modules/es5-ext/object/assign/index.js")
	  , callable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js")
	  , value    = __webpack_require__("./node_modules/es5-ext/object/valid-value.js")
	  , d        = __webpack_require__("./node_modules/d/index.js")
	  , autoBind = __webpack_require__("./node_modules/d/auto-bind.js")
	  , Symbol   = __webpack_require__("./node_modules/es6-symbol/index.js")
	
	  , defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , Iterator;
	
	module.exports = Iterator = function (list, context) {
		if (!(this instanceof Iterator)) return new Iterator(list, context);
		defineProperties(this, {
			__list__: d('w', value(list)),
			__context__: d('w', context),
			__nextIndex__: d('w', 0)
		});
		if (!context) return;
		callable(context.on);
		context.on('_add', this._onAdd);
		context.on('_delete', this._onDelete);
		context.on('_clear', this._onClear);
	};
	
	defineProperties(Iterator.prototype, assign({
		constructor: d(Iterator),
		_next: d(function () {
			var i;
			if (!this.__list__) return;
			if (this.__redo__) {
				i = this.__redo__.shift();
				if (i !== undefined) return i;
			}
			if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
			this._unBind();
		}),
		next: d(function () { return this._createResult(this._next()); }),
		_createResult: d(function (i) {
			if (i === undefined) return { done: true, value: undefined };
			return { done: false, value: this._resolve(i) };
		}),
		_resolve: d(function (i) { return this.__list__[i]; }),
		_unBind: d(function () {
			this.__list__ = null;
			delete this.__redo__;
			if (!this.__context__) return;
			this.__context__.off('_add', this._onAdd);
			this.__context__.off('_delete', this._onDelete);
			this.__context__.off('_clear', this._onClear);
			this.__context__ = null;
		}),
		toString: d(function () { return '[object Iterator]'; })
	}, autoBind({
		_onAdd: d(function (index) {
			if (index >= this.__nextIndex__) return;
			++this.__nextIndex__;
			if (!this.__redo__) {
				defineProperty(this, '__redo__', d('c', [index]));
				return;
			}
			this.__redo__.forEach(function (redo, i) {
				if (redo >= index) this.__redo__[i] = ++redo;
			}, this);
			this.__redo__.push(index);
		}),
		_onDelete: d(function (index) {
			var i;
			if (index >= this.__nextIndex__) return;
			--this.__nextIndex__;
			if (!this.__redo__) return;
			i = this.__redo__.indexOf(index);
			if (i !== -1) this.__redo__.splice(i, 1);
			this.__redo__.forEach(function (redo, i) {
				if (redo > index) this.__redo__[i] = --redo;
			}, this);
		}),
		_onClear: d(function () {
			if (this.__redo__) clear.call(this.__redo__);
			this.__nextIndex__ = 0;
		})
	})));
	
	defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
		return this;
	}));
	defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ },

/***/ "./node_modules/d/auto-bind.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var copy       = __webpack_require__("./node_modules/es5-ext/object/copy.js")
	  , map        = __webpack_require__("./node_modules/es5-ext/object/map.js")
	  , callable   = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js")
	  , validValue = __webpack_require__("./node_modules/es5-ext/object/valid-value.js")
	
	  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , define;
	
	define = function (name, desc, bindTo) {
		var value = validValue(desc) && callable(desc.value), dgs;
		dgs = copy(desc);
		delete dgs.writable;
		delete dgs.value;
		dgs.get = function () {
			if (hasOwnProperty.call(this, name)) return value;
			desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
			defineProperty(this, name, desc);
			return this[name];
		};
		return dgs;
	};
	
	module.exports = function (props/*, bindTo*/) {
		var bindTo = arguments[1];
		return map(props, function (desc, name) {
			return define(name, desc, bindTo);
		});
	};


/***/ },

/***/ "./node_modules/es5-ext/object/copy.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var assign = __webpack_require__("./node_modules/es5-ext/object/assign/index.js")
	  , value  = __webpack_require__("./node_modules/es5-ext/object/valid-value.js");
	
	module.exports = function (obj) {
		var copy = Object(value(obj));
		if (copy !== obj) return copy;
		return assign({}, obj);
	};


/***/ },

/***/ "./node_modules/es5-ext/object/map.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var callable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js")
	  , forEach  = __webpack_require__("./node_modules/es5-ext/object/for-each.js")
	
	  , call = Function.prototype.call;
	
	module.exports = function (obj, cb/*, thisArg*/) {
		var o = {}, thisArg = arguments[2];
		callable(cb);
		forEach(obj, function (value, key, obj, index) {
			o[key] = call.call(cb, thisArg, value, key, obj, index);
		});
		return o;
	};


/***/ },

/***/ "./node_modules/es5-ext/object/for-each.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__("./node_modules/es5-ext/object/_iterate.js")('forEach');


/***/ },

/***/ "./node_modules/es5-ext/object/_iterate.js":
/***/ function(module, exports, __webpack_require__) {

	// Internal method, used by iteration functions.
	// Calls a function for each key-value pair found in object
	// Optionally takes compareFn to iterate object in specific order
	
	'use strict';
	
	var callable = __webpack_require__("./node_modules/es5-ext/object/valid-callable.js")
	  , value    = __webpack_require__("./node_modules/es5-ext/object/valid-value.js")
	
	  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
	  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	module.exports = function (method, defVal) {
		return function (obj, cb/*, thisArg, compareFn*/) {
			var list, thisArg = arguments[2], compareFn = arguments[3];
			obj = Object(value(obj));
			callable(cb);
	
			list = keys(obj);
			if (compareFn) {
				list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
			}
			if (typeof method !== 'function') method = list[method];
			return call.call(method, list, function (key, index) {
				if (!propertyIsEnumerable.call(obj, key)) return defVal;
				return call.call(cb, thisArg, obj[key], key, obj, index);
			});
		};
	};


/***/ },

/***/ "./node_modules/es6-iterator/string.js":
/***/ function(module, exports, __webpack_require__) {

	// Thanks @mathiasbynens
	// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols
	
	'use strict';
	
	var setPrototypeOf = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/index.js")
	  , d              = __webpack_require__("./node_modules/d/index.js")
	  , Iterator       = __webpack_require__("./node_modules/es6-iterator/index.js")
	
	  , defineProperty = Object.defineProperty
	  , StringIterator;
	
	StringIterator = module.exports = function (str) {
		if (!(this instanceof StringIterator)) return new StringIterator(str);
		str = String(str);
		Iterator.call(this, str);
		defineProperty(this, '__length__', d('', str.length));
	
	};
	if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);
	
	StringIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(StringIterator),
		_next: d(function () {
			if (!this.__list__) return;
			if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
			this._unBind();
		}),
		_resolve: d(function (i) {
			var char = this.__list__[i], code;
			if (this.__nextIndex__ === this.__length__) return char;
			code = char.charCodeAt(0);
			if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
			return char;
		}),
		toString: d(function () { return '[object String Iterator]'; })
	});


/***/ },

/***/ "./node_modules/es6-map/lib/iterator.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var setPrototypeOf    = __webpack_require__("./node_modules/es5-ext/object/set-prototype-of/index.js")
	  , d                 = __webpack_require__("./node_modules/d/index.js")
	  , Iterator          = __webpack_require__("./node_modules/es6-iterator/index.js")
	  , toStringTagSymbol = __webpack_require__("./node_modules/es6-symbol/index.js").toStringTag
	  , kinds             = __webpack_require__("./node_modules/es6-map/lib/iterator-kinds.js")
	
	  , defineProperties = Object.defineProperties
	  , unBind = Iterator.prototype._unBind
	  , MapIterator;
	
	MapIterator = module.exports = function (map, kind) {
		if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
		Iterator.call(this, map.__mapKeysData__, map);
		if (!kind || !kinds[kind]) kind = 'key+value';
		defineProperties(this, {
			__kind__: d('', kind),
			__values__: d('w', map.__mapValuesData__)
		});
	};
	if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);
	
	MapIterator.prototype = Object.create(Iterator.prototype, {
		constructor: d(MapIterator),
		_resolve: d(function (i) {
			if (this.__kind__ === 'value') return this.__values__[i];
			if (this.__kind__ === 'key') return this.__list__[i];
			return [this.__list__[i], this.__values__[i]];
		}),
		_unBind: d(function () {
			this.__values__ = null;
			unBind.call(this);
		}),
		toString: d(function () { return '[object Map Iterator]'; })
	});
	Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
		d('c', 'Map Iterator'));


/***/ },

/***/ "./node_modules/es6-map/lib/iterator-kinds.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__("./node_modules/es5-ext/object/primitive-set.js")('key',
		'value', 'key+value');


/***/ },

/***/ "./node_modules/es5-ext/object/primitive-set.js":
/***/ function(module, exports) {

	'use strict';
	
	var forEach = Array.prototype.forEach, create = Object.create;
	
	module.exports = function (arg/*, …args*/) {
		var set = create(null);
		forEach.call(arguments, function (name) { set[name] = true; });
		return set;
	};


/***/ },

/***/ "./node_modules/es6-map/is-native-implemented.js":
/***/ function(module, exports) {

	// Exports true if environment provides native `Map` implementation,
	// whatever that is.
	
	'use strict';
	
	module.exports = (function () {
		if (typeof Map === 'undefined') return false;
		return (Object.prototype.toString.call(new Map()) === '[object Map]');
	}());


/***/ },

/***/ "./node_modules/multimap/index.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";
	
	/* global module, define */
	
	var Multimap = (function() {
	  var mapCtor;
	  if (typeof Map !== 'undefined') {
	    mapCtor = Map;
	  }
	
	  function Multimap(iterable) {
	    var self = this;
	
	    self._map = mapCtor;
	    
	    if (Multimap.Map) {
	      self._map = Multimap.Map;
	    }
	
	    self._ = self._map ? new self._map() : {};
	
	    if (iterable) {
	      iterable.forEach(function(i) {
	        self.set(i[0], i[1]);
	      });
	    }
	  }
	
	  /**
	   * @param {Object} key
	   * @return {Array} An array of values, undefined if no such a key;
	   */
	  Multimap.prototype.get = function(key) {
	    return this._map ? this._.get(key) : this._[key];
	  };
	
	  /** 
	   * @param {Object} key
	   * @param {Object} val...
	   */
	  Multimap.prototype.set = function(key, val) {
	    var args = Array.prototype.slice.call(arguments);
	
	    key = args.shift();
	
	    var entry = this.get(key);
	    if (!entry) {
	      entry = [];
	      if (this._map)
	        this._.set(key, entry);
	      else
	        this._[key] = entry;
	    }
	
	    Array.prototype.push.apply(entry, args);
	    return this;
	  };
	
	  /**
	   * @param {Object} key
	   * @param {Object=} val
	   * @return {boolean} true if any thing changed
	   */
	  Multimap.prototype.delete = function(key, val) {
	    if (!this.has(key))
	      return false;
	
	    if (arguments.length == 1) {
	      this._map ? (this._.delete(key)) : (delete this._[key]);
	      return true;
	    } else {
	      var entry = this.get(key);
	      var idx = entry.indexOf(val);
	      if (idx != -1) {
	        entry.splice(idx, 1);
	        return true;
	      }
	    }
	
	    return false;
	  };
	
	  /**
	   * @param {Object} key
	   * @param {Object=} val
	   * @return {boolean} whether the map contains 'key' or 'key=>val' pair
	   */
	  Multimap.prototype.has = function(key, val) {
	    var hasKey = this._map ? this._.has(key) : this._.hasOwnProperty(key);
	
	    if (arguments.length == 1 || !hasKey)
	      return hasKey;
	
	    var entry = this.get(key) || [];
	    return entry.indexOf(val) != -1;
	  };
	
	  /**
	   * @return {Array} all the keys in the map
	   */
	  Multimap.prototype.keys = function() {
	    if (this._map) 
	      return this._.keys();
	
	    return makeIterator(Object.keys(this._));
	  };
	
	  /**
	   * @return {Array} all the values in the map
	   */
	  Multimap.prototype.values = function() {
	    var vals = [];
	    this.forEachEntry(function(entry) {
	      Array.prototype.push.apply(vals, entry);
	    });
	
	    return makeIterator(vals);
	  };
	
	  /**
	   *
	   */
	  Multimap.prototype.forEachEntry = function(iter) {
	    var self = this;
	
	    var keys = self.keys();
	    var next;
	    while(!(next = keys.next()).done) {
	      iter(self.get(next.value), next.value, self);
	    }
	  };
	
	  Multimap.prototype.forEach = function(iter) {
	    var self = this;
	    self.forEachEntry(function(entry, key) {
	      entry.forEach(function(item) {
	        iter(item, key, self);
	      });
	    });
	  };
	
	
	  Multimap.prototype.clear = function() {
	    if (this._map) {
	      this._.clear();
	    } else {
	      this._ = {};
	    }
	  };
	
	  Object.defineProperty(
	    Multimap.prototype,
	    "size", {
	      configurable: false,
	      enumerable: true,
	      get: function() {
	        var self = this;
	        var keys = self.keys();
	        var next, total = 0;
	        while(!(next = keys.next()).done) {
	          total += self.get(next.value).length;
	        }
	        return total;
	      }
	    });
	
	
	  function makeIterator(array){
	    var nextIndex = 0;
	    
	    return {
	      next: function(){
	        return nextIndex < array.length ?
	          {value: array[nextIndex++], done: false} :
	        {done: true};
	      }
	    };
	  }
	
	  return Multimap;
	})();
	
	
	if(typeof exports === 'object' && module && module.exports)
	  module.exports = Multimap;
	else if(true)
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return Multimap; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ },

/***/ "./node_modules/es5-ext/object/keys/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__("./node_modules/es5-ext/object/keys/is-implemented.js")()
		? Object.keys
		: __webpack_require__("./node_modules/es5-ext/object/keys/shim.js");


/***/ }

});