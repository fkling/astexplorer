webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	var _ASTOutput = __webpack_require__("./src/ASTOutput.js");
	
	var _ASTOutput2 = _interopRequireDefault(_ASTOutput);
	
	var _Editor = __webpack_require__("./src/Editor.js");
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	var _ErrorMessage = __webpack_require__("./src/ErrorMessage.js");
	
	var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);
	
	var _JSCodeshiftEditor = __webpack_require__("./src/JSCodeshiftEditor.js");
	
	var _JSCodeshiftEditor2 = _interopRequireDefault(_JSCodeshiftEditor);
	
	var _PasteDropTarget = __webpack_require__("./src/PasteDropTarget.js");
	
	var _PasteDropTarget2 = _interopRequireDefault(_PasteDropTarget);
	
	var _pubsubJs = __webpack_require__("./node_modules/pubsub-js/src/pubsub.js");
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Snippet = __webpack_require__("./src/Snippet.js");
	
	var _Snippet2 = _interopRequireDefault(_Snippet);
	
	var _SplitPane = __webpack_require__("./src/SplitPane.js");
	
	var _SplitPane2 = _interopRequireDefault(_SplitPane);
	
	var _Toolbar = __webpack_require__("./src/Toolbar.js");
	
	var _Toolbar2 = _interopRequireDefault(_Toolbar);
	
	var _TransformOutput = __webpack_require__("./src/TransformOutput.js");
	
	var _TransformOutput2 = _interopRequireDefault(_TransformOutput);
	
	var _SettingsDialog = __webpack_require__("./src/SettingsDialog.js");
	
	var _SettingsDialog2 = _interopRequireDefault(_SettingsDialog);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var _getFocusPath = __webpack_require__("./src/getFocusPath.js");
	
	var _getFocusPath2 = _interopRequireDefault(_getFocusPath);
	
	var _keypress = __webpack_require__("./node_modules/keypress/keypress.js");
	
	var _keypress2 = _interopRequireDefault(_keypress);
	
	var _parsers = __webpack_require__("./src/parsers/index.js");
	
	function updateHashWithIDAndRevision(id, rev) {
	  global.location.hash = '/' + id + (rev && rev !== 0 ? '/' + rev : '');
	}
	
	var App = (function (_React$Component) {
	  _inherits(App, _React$Component);
	
	  function App(props, context) {
	    _classCallCheck(this, App);
	
	    _get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props, context);
	    this._onCategoryChange = this._onCategoryChange.bind(this);
	    this._onDropError = this._onDropError.bind(this);
	    this._onDropText = this._onDropText.bind(this);
	    this._onFork = this._onFork.bind(this);
	    this._onParserChange = this._onParserChange.bind(this);
	    this._onResize = this._onResize.bind(this);
	    this._onSave = this._onSave.bind(this);
	    this._onSettingsChange = this._onSettingsChange.bind(this);
	    this.onActivity = this.onActivity.bind(this);
	    this.onContentChange = this.onContentChange.bind(this);
	    this.onTransformChange = this.onTransformChange.bind(this);
	    this.onTransformCodeChange = this.onTransformCodeChange.bind(this);
	    var snippet = props.snippet;
	    var revision = props.revision;
	
	    if (snippet && !revision || !snippet && revision) {
	      throw Error('Must set both, snippet and revision');
	    }
	
	    var parser = undefined;
	    var transformer = undefined;
	    var initialCode = undefined;
	    var initialTransformCode = undefined;
	
	    if (revision) {
	      var _getDataFromRevision2 = this._getDataFromRevision(revision);
	
	      parser = _getDataFromRevision2.parser;
	      transformer = _getDataFromRevision2.transformer;
	      initialCode = _getDataFromRevision2.code;
	      initialTransformCode = _getDataFromRevision2.transformCode;
	    } else {
	      parser = (0, _parsers.getParserByID)(LocalStorage.getParser()) || (0, _parsers.getDefaultParser)((0, _parsers.getCategoryByID)(LocalStorage.getCategory()));
	      initialCode = this._getDefaultCode(parser);
	    }
	
	    this.state = _extends({
	      forking: false,
	      saving: false,
	      ast: null,
	      transformer: transformer,
	      focusPath: []
	    }, this._setCode(initialCode), this._setTransformCode(initialTransformCode), {
	      snippet: snippet,
	      showTransformPanel: !!transformer,
	      revision: revision,
	      parser: parser
	    });
	  }
	
	  _createClass(App, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      if (this.props.error) {
	        this._showError(this.props.error);
	      }
	      global.onhashchange = function () {
	        if (!_this.state.saving || !_this.state.forking) {
	          _Snippet2['default'].fetchFromURL().then(function (data) {
	            if (data) {
	              _this._setRevision(data.snippet, data.revision);
	            } else {
	              _this._clearRevision();
	            }
	          }, function (error) {
	            return _this._showError('Failed to fetch revision: ' + error.message);
	          });
	        }
	      };
	
	      global.onbeforeunload = function () {
	        if (_this.state.initialTransformCode !== _this.state.currentTransformCode) {
	          return 'You have unsaved transform code. Do you really want to leave?';
	        }
	      };
	
	      var listener = new _keypress2['default'].Listener();
	      listener.simple_combo('meta s', function (event) {
	        event.preventDefault();
	        _this._onSave();
	      });
	      listener.simple_combo('cmd shift s', function (event) {
	        event.preventDefault();
	        _this._onFork();
	      });
	      listener.simple_combo('ctrl alt s', function (event) {
	        event.preventDefault();
	        _this._onFork();
	      });
	
	      _pubsubJs2['default'].subscribe('HIGHLIGHT', function (_, astNode) {
	        var range = (0, _getFocusPath.nodeToRange)(_this.state.parser, astNode);
	        if (range) {
	          _pubsubJs2['default'].publish('CM.HIGHLIGHT', range);
	        }
	      });
	      _pubsubJs2['default'].subscribe('CLEAR_HIGHLIGHT', function (_, astNode) {
	        return _pubsubJs2['default'].publish('CM.CLEAR_HIGHLIGHT', astNode && (0, _getFocusPath.nodeToRange)(_this.state.parser, astNode));
	      });
	    }
	  }, {
	    key: '_getDefaultCode',
	    value: function _getDefaultCode() {
	      var parser = arguments.length <= 0 || arguments[0] === undefined ? this.state.parser : arguments[0];
	
	      return parser.category.codeExample;
	    }
	  }, {
	    key: '_getDataFromRevision',
	    value: function _getDataFromRevision(revision) {
	      var transformerID = revision.get('toolID');
	      var transformer = transformerID && (0, _parsers.getTransformerByID)(transformerID);
	      var transformCode = revision.get('transform');
	      if (transformCode && !transformer) {
	        // jscodeshift was the first transformer tool. Instead of updating
	        // existing rows in the DB, we do this
	        transformer = (0, _parsers.getTransformerByID)('jscodeshift');
	      } else if (transformer && !transformCode) {
	        transformCode = transformer.defaultTransform;
	      }
	
	      // Get parser from transformer > revision > local storage > default
	      var parser = undefined;
	      if (transformer) {
	        parser = (0, _parsers.getParserByID)(transformer.defaultParserID);
	      }
	      if (!parser) {
	        parser = (0, _parsers.getParserByID)(revision.get('parserID'));
	      }
	      if (!parser) {
	        parser = (0, _parsers.getParserByID)(LocalStorage.getParser());
	      }
	      if (!parser) {
	        parser = (0, _parsers.getDefaultParser)();
	      }
	
	      var code = revision.get('code') || this._getDefaultCode(parser);
	
	      return { parser: parser, transformer: transformer, code: code, transformCode: transformCode };
	    }
	  }, {
	    key: '_setCode',
	    value: function _setCode(code) {
	      return { initialCode: code, currentCode: code };
	    }
	  }, {
	    key: '_setTransformCode',
	    value: function _setTransformCode(transformCode) {
	      return {
	        initialTransformCode: transformCode,
	        currentTransformCode: transformCode
	      };
	    }
	  }, {
	    key: '_setRevision',
	    value: function _setRevision(snippet, revision) {
	      var _this2 = this;
	
	      if (!snippet || !revision) {
	        this.setError('Something went wrong fetching the revision. Try to refresh!');
	      }
	
	      var _getDataFromRevision3 = this._getDataFromRevision(revision);
	
	      var parser = _getDataFromRevision3.parser;
	      var transformer = _getDataFromRevision3.transformer;
	      var code = _getDataFromRevision3.code;
	      var transformCode = _getDataFromRevision3.transformCode;
	
	      var update = function update(data) {
	        // eslint-disable-line no-shadow
	        _this2.setState(_extends({}, data, {
	          snippet: snippet,
	          revision: revision,
	          transformer: transformer
	        }, _this2._setCode(code), _this2._setTransformCode(transformCode), {
	          focusPath: [],
	          parser: parser
	        }));
	      };
	
	      if (!this.state.snippet || snippet.id !== this.state.snippet.id || revision.id !== this.state.revision.id) {
	        if (this.state.revision && (code !== this.state.revision.get('code') || transformCode !== this.state.revision.get('transform')) || parser !== this.state.parser) {
	          this.parse(code).then(function (ast) {
	            return update({ ast: ast, editorError: null });
	          }, function (error) {
	            return update({ ast: null, editorError: error });
	          });
	        } else {
	          update({ ast: this.state.ast, editorError: null });
	        }
	      }
	    }
	  }, {
	    key: '_clearRevision',
	    value: function _clearRevision() {
	      var _this3 = this;
	
	      var defaultCode = this._getDefaultCode();
	      var update = function update(newState) {
	        _this3.setState(_extends({}, newState, {
	          focusPath: []
	        }, _this3._setCode(defaultCode), _this3._setTransformCode(_this3.state.transformer ? _this3.state.transformer.defaultTransform : ''), {
	          snippet: null,
	          revision: null
	        }));
	      };
	
	      this.parse(defaultCode).then(function (ast) {
	        return update({ ast: ast, editorError: null });
	      }, function (error) {
	        return update({ ast: null, editorError: error });
	      });
	    }
	  }, {
	    key: 'parse',
	    value: function parse(code, parser) {
	      if (!parser) {
	        parser = this.state.parser;
	      }
	      if (!parser._promise) {
	        parser._promise = new _Promise(parser.loadParser);
	      }
	      return parser._promise.then(function (realParser) {
	        return parser.parse(realParser, code);
	      });
	    }
	  }, {
	    key: 'onContentChange',
	    value: function onContentChange(_ref) {
	      var _this4 = this;
	
	      var code = _ref.value;
	      var cursor = _ref.cursor;
	
	      if (this.state.ast && this.state.currentCode === code) {
	        return;
	      }
	
	      this.parse(code).then(function (ast) {
	        return _this4.setState({
	          ast: ast,
	          currentCode: code,
	          focusPath: cursor ? (0, _getFocusPath2['default'])(ast, cursor, _this4.state.parser) : [],
	          editorError: null
	        });
	      }, function (error) {
	        return _this4.setState({
	          ast: null,
	          currentCode: code,
	          editorError: error
	        });
	      });
	    }
	  }, {
	    key: 'onTransformCodeChange',
	    value: function onTransformCodeChange(_ref2) {
	      var transformCode = _ref2.value;
	
	      this.setState({
	        currentTransformCode: transformCode
	      });
	    }
	  }, {
	    key: 'onTransformChange',
	    value: function onTransformChange(transformer) {
	      var _this5 = this;
	
	      var showTransformPanel = !this.state.showTransformPanel || transformer !== this.state.transformer;
	      var parser = showTransformPanel ? (0, _parsers.getParserByID)(transformer.defaultParserID) : this.state.parser;
	
	      var transformCode = this.state.currentTransformCode;
	      if (transformer !== this.state.transformer) {
	        transformCode = transformer.defaultTransform;
	      }
	
	      if (parser !== this.state.parser) {
	        this.parse(this.state.currentCode, parser).then(function (ast) {
	          return _this5.setState(_extends({
	            ast: ast,
	            parser: parser,
	            transformer: transformer
	          }, _this5._setTransformCode(transformCode), {
	            focusPath: [],
	            editorError: null,
	            showTransformPanel: showTransformPanel
	          }));
	        }, function (error) {
	          return _this5.setState(_extends({
	            ast: null,
	            editError: error,
	            parser: parser,
	            transformer: transformer
	          }, _this5._setTransformCode(transformCode), {
	            showTransformPanel: showTransformPanel
	          }));
	        });
	      } else {
	        this.setState(_extends({
	          showTransformPanel: showTransformPanel,
	          parser: parser,
	          transformer: transformer
	        }, this._setTransformCode(transformCode)));
	      }
	      this._onResize();
	    }
	  }, {
	    key: 'onActivity',
	    value: function onActivity(cursorPos) {
	      if (this.state.ast) {
	        this.setState({
	          focusPath: (0, _getFocusPath2['default'])(this.state.ast, cursorPos, this.state.parser)
	        });
	      }
	    }
	  }, {
	    key: '_showError',
	    value: function _showError(msg) {
	      var _this6 = this;
	
	      this.setState({ error: msg });
	      setTimeout(function () {
	        if (msg === _this6.state.error) {
	          _this6.setState({ error: false });
	        }
	      }, 3000);
	    }
	  }, {
	    key: '_save',
	    value: function _save(fork) {
	      var _this7 = this;
	
	      var snippet = !fork && this.state.snippet || new _Snippet2['default']();
	      var code = this.refs.editor.getValue();
	      var transformer = this.state.transformer;
	
	      var transformerID = transformer && transformer.id;
	      var transformCode = this.refs.transformEditor && this.refs.transformEditor.getValue();
	
	      var data = {
	        parserID: this.state.parser.id
	      };
	      if (code !== this._getDefaultCode()) {
	        data.code = code;
	      }
	      if (this.state.showTransformPanel && transformCode && transformCode !== transformer.defaultTransform) {
	        data.transform = transformCode;
	        data.toolID = transformerID;
	      }
	
	      this.setState({ saving: !fork, forking: fork });
	      snippet.createNewRevision(data).then(function (response) {
	        if (response) {
	          updateHashWithIDAndRevision(snippet.id, response.revisionNumber);
	        }
	        _this7.setState({
	          saving: false,
	          forking: false
	        });
	      }, function (_, error) {
	        _this7._showError('Could not save: ' + error.message);
	        _this7.setState({ saving: false, forking: false });
	      });
	    }
	  }, {
	    key: '_onSave',
	    value: function _onSave() {
	      var revision = this.state.revision;
	
	      var isNewRevision = !revision && (this.state.currentCode !== this._getDefaultCode() || this.state.showTransformPanel && this.state.currentTransformCode !== this.state.transformer.defaultTransform);
	      var isModified = revision && (this.state.initalCode !== this.state.currentCode || this.state.showTransformPanel && this.state.initialTransformCode !== this.state.currentTransformCode);
	
	      if (isNewRevision || isModified) {
	        this._save();
	      }
	    }
	  }, {
	    key: '_onFork',
	    value: function _onFork() {
	      if (this.state.revision) {
	        this._save(true);
	      }
	    }
	  }, {
	    key: '_onResize',
	    value: function _onResize() {
	      _pubsubJs2['default'].publish('PANEL_RESIZE');
	    }
	  }, {
	    key: '_onDropText',
	    value: function _onDropText(type, event, text, categoryId) {
	      var _this8 = this;
	
	      var parser = this.state.parser;
	
	      if (categoryId && categoryId !== parser.category.id) {
	        parser = (0, _parsers.getDefaultParser)((0, _parsers.getCategoryByID)(categoryId));
	      }
	      this.parse(text, parser).then(function (ast) {
	        return _this8.setState(_extends({}, _this8._setCode(text), {
	          ast: ast,
	          parser: parser,
	          focusPath: [],
	          editorError: null
	        }));
	      }, function (error) {
	        return _this8.setState(_extends({}, _this8._setCode(text), {
	          ast: null,
	          editorError: error,
	          parser: parser
	        }));
	      });
	    }
	  }, {
	    key: '_onDropError',
	    value: function _onDropError(type, event, msg) {
	      this._showError(msg);
	    }
	  }, {
	    key: '_onCategoryChange',
	    value: function _onCategoryChange(category) {
	      var _this9 = this;
	
	      if (category === this.state.parser.category) {
	        return;
	      }
	
	      LocalStorage.setCategory(category.id);
	      var parser = (0, _parsers.getParserByID)(LocalStorage.getParser(category.id)) || (0, _parsers.getDefaultParser)(category);
	
	      // Verify that local storage wasn't corrupted
	      if (parser.category !== category) {
	        parser = (0, _parsers.getDefaultParser)(category);
	      }
	
	      this.setState({
	        showTransformPanel: false,
	        parser: parser
	      }, function () {
	        _this9._clearRevision();
	      });
	    }
	  }, {
	    key: '_onParserChange',
	    value: function _onParserChange(parser) {
	      var _this10 = this;
	
	      LocalStorage.setParser(parser);
	      this.parse(this.state.currentCode, parser).then(function (ast) {
	        return _this10.setState({
	          ast: ast,
	          parser: parser,
	          focusPath: [],
	          editorError: null
	        });
	      }, function (error) {
	        return _this10.setState({
	          ast: null,
	          editorError: error,
	          parser: parser
	        });
	      });
	    }
	  }, {
	    key: '_onSettingsChange',
	    value: function _onSettingsChange() {
	      this._onParserChange(this.state.parser);
	    }
	  }, {
	    key: '_canSave',
	    value: function _canSave() {
	      var _state = this.state;
	      var revision = _state.revision;
	      var showTransformPanel = _state.showTransformPanel;
	      var currentTransformCode = _state.currentTransformCode;
	      var initialTransformCode = _state.initialTransformCode;
	
	      var revisionCode = revision && revision.get('code') || this._getDefaultCode();
	
	      return revisionCode !== this.state.currentCode || showTransformPanel && currentTransformCode !== initialTransformCode && currentTransformCode !== this.state.transformer.defaultTransform;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var showTransformPanel = this.state.showTransformPanel;
	
	      return _react2['default'].createElement(
	        _PasteDropTarget2['default'],
	        {
	          className: 'dropTarget',
	          dropindicator: _react2['default'].createElement(
	            'div',
	            { className: 'dropIndicator' },
	            _react2['default'].createElement(
	              'div',
	              null,
	              'Drop the code or (JSON-encoded) AST file here'
	            )
	          ),
	          onText: this._onDropText,
	          onError: this._onDropError },
	        _react2['default'].createElement(_Toolbar2['default'], {
	          forking: this.state.forking,
	          saving: this.state.saving,
	          onSave: this._onSave,
	          onFork: this._onFork,
	          onCategoryChange: this._onCategoryChange,
	          onParserChange: this._onParserChange,
	          onTransformChange: this.onTransformChange,
	          canSave: this._canSave(),
	          canFork: !!this.state.revision,
	          category: this.state.parser.category,
	          parser: this.state.parser,
	          transformer: this.state.transformer,
	          transformPanelIsEnabled: showTransformPanel
	        }),
	        this.state.error ? _react2['default'].createElement(_ErrorMessage2['default'], { message: this.state.error }) : null,
	        _react2['default'].createElement(
	          _SplitPane2['default'],
	          {
	            className: 'splitpane-content',
	            vertical: true,
	            onResize: this._onResize },
	          _react2['default'].createElement(
	            _SplitPane2['default'],
	            {
	              className: 'splitpane',
	              onResize: this._onResize },
	            _react2['default'].createElement(_Editor2['default'], {
	              ref: 'editor',
	              mode: this.state.parser.category.id,
	              defaultValue: this.state.initialCode,
	              error: this.state.editorError,
	              onContentChange: this.onContentChange,
	              onActivity: this.onActivity
	            }),
	            _react2['default'].createElement(_ASTOutput2['default'], {
	              ast: this.state.ast,
	              editorError: this.state.editorError,
	              focusPath: this.state.focusPath,
	              parser: this.state.parser
	            })
	          ),
	          showTransformPanel ? _react2['default'].createElement(
	            _SplitPane2['default'],
	            {
	              className: 'splitpane',
	              onResize: this._onResize },
	            this.state.transformer.id === 'jscodeshift' ? _react2['default'].createElement(_JSCodeshiftEditor2['default'], {
	              ref: 'transformEditor',
	              defaultValue: this.state.initialTransformCode,
	              onContentChange: this.onTransformCodeChange
	            }) : _react2['default'].createElement(_Editor2['default'], {
	              ref: 'transformEditor',
	              highlight: false,
	              defaultValue: this.state.initialTransformCode,
	              onContentChange: this.onTransformCodeChange
	            }),
	            _react2['default'].createElement(_TransformOutput2['default'], {
	              transformer: this.state.transformer,
	              transformCode: this.state.currentTransformCode,
	              code: this.state.currentCode,
	              mode: this.state.parser.category.id
	            })
	          ) : null
	        ),
	        _react2['default'].createElement(_SettingsDialog2['default'], {
	          parser: this.state.parser,
	          onChange: this._onSettingsChange
	        })
	      );
	    }
	  }]);
	
	  return App;
	})(_react2['default'].Component);
	
	function render(props) {
	  _react2['default'].render(_react2['default'].createElement(App, props), document.getElementById('container'));
	}
	
	_Snippet2['default'].fetchFromURL().then(function (data) {
	  return render(data);
	}, function (error) {
	  return render({ error: 'Failed to fetch revision: ' + error.message });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./src/getFocusPath.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _getIterator = __webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.nodeToRange = nodeToRange;
	exports['default'] = getFocusPath;
	function isInRange(range, pos) {
	  return pos >= range[0] && pos <= range[1];
	}
	
	function nodeToRange(parser, node) {
	  var range = parser.nodeToRange(node);
	  if (range) {
	    return range;
	  }
	  if (node.length > 0) {
	    // check first and last child
	    var rangeFirst = node[0] && parser.nodeToRange(node[0]);
	    var rangeLast = node[node.length - 1] && parser.nodeToRange(node[node.length - 1]);
	    if (rangeFirst && rangeLast) {
	      return [rangeFirst[0], rangeLast[1]];
	    }
	  }
	}
	
	function getFocusPath(node, pos, parser) {
	  var seen = arguments.length <= 3 || arguments[3] === undefined ? new _Set() : arguments[3];
	
	  seen.add(node);
	
	  var path = [];
	  var range = nodeToRange(parser, node);
	  if (range) {
	    if (isInRange(range, pos)) {
	      path.push(node);
	    } else {
	      return [];
	    }
	  }
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = _getIterator(parser.forEachProperty(node)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var value = _step.value.value;
	
	      if (value && typeof value === 'object' && !seen.has(value)) {
	        var childPath = getFocusPath(value, pos, parser, seen);
	        if (childPath.length > 0) {
	          path = path.concat(childPath);
	          break;
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator['return']) {
	        _iterator['return']();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return path;
	}

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/assign.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/object/assign.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/object/assign.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.assign.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").Object.assign;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.assign.js":
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__("./node_modules/core-js/library/modules/$.export.js");
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__("./node_modules/core-js/library/modules/$.object-assign.js")});

/***/ },

/***/ "./node_modules/core-js/library/modules/$.object-assign.js":
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__("./node_modules/core-js/library/modules/$.js")
	  , toObject = __webpack_require__("./node_modules/core-js/library/modules/$.to-object.js")
	  , IObject  = __webpack_require__("./node_modules/core-js/library/modules/$.iobject.js");
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.fails.js")(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },

/***/ "./node_modules/babel-runtime/core-js/promise.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/promise.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/promise.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js");
	__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.promise.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").Promise;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__("./node_modules/core-js/library/modules/$.string-at.js")(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__("./node_modules/core-js/library/modules/$.iter-define.js")(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },

/***/ "./node_modules/core-js/library/modules/$.string-at.js":
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__("./node_modules/core-js/library/modules/$.to-integer.js")
	  , defined   = __webpack_require__("./node_modules/core-js/library/modules/$.defined.js");
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.promise.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__("./node_modules/core-js/library/modules/$.js")
	  , LIBRARY    = __webpack_require__("./node_modules/core-js/library/modules/$.library.js")
	  , global     = __webpack_require__("./node_modules/core-js/library/modules/$.global.js")
	  , ctx        = __webpack_require__("./node_modules/core-js/library/modules/$.ctx.js")
	  , classof    = __webpack_require__("./node_modules/core-js/library/modules/$.classof.js")
	  , $export    = __webpack_require__("./node_modules/core-js/library/modules/$.export.js")
	  , isObject   = __webpack_require__("./node_modules/core-js/library/modules/$.is-object.js")
	  , anObject   = __webpack_require__("./node_modules/core-js/library/modules/$.an-object.js")
	  , aFunction  = __webpack_require__("./node_modules/core-js/library/modules/$.a-function.js")
	  , strictNew  = __webpack_require__("./node_modules/core-js/library/modules/$.strict-new.js")
	  , forOf      = __webpack_require__("./node_modules/core-js/library/modules/$.for-of.js")
	  , setProto   = __webpack_require__("./node_modules/core-js/library/modules/$.set-proto.js").set
	  , same       = __webpack_require__("./node_modules/core-js/library/modules/$.same-value.js")
	  , SPECIES    = __webpack_require__("./node_modules/core-js/library/modules/$.wks.js")('species')
	  , speciesConstructor = __webpack_require__("./node_modules/core-js/library/modules/$.species-constructor.js")
	  , asap       = __webpack_require__("./node_modules/core-js/library/modules/$.microtask.js")
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__("./node_modules/core-js/library/modules/$.descriptors.js")){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__("./node_modules/core-js/library/modules/$.redefine-all.js")(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__("./node_modules/core-js/library/modules/$.set-to-string-tag.js")(P, PROMISE);
	__webpack_require__("./node_modules/core-js/library/modules/$.set-species.js")(PROMISE);
	Wrapper = __webpack_require__("./node_modules/core-js/library/modules/$.core.js")[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("./node_modules/core-js/library/modules/$.iter-detect.js")(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },

/***/ "./node_modules/core-js/library/modules/$.same-value.js":
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.species-constructor.js":
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__("./node_modules/core-js/library/modules/$.an-object.js")
	  , aFunction = __webpack_require__("./node_modules/core-js/library/modules/$.a-function.js")
	  , SPECIES   = __webpack_require__("./node_modules/core-js/library/modules/$.wks.js")('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.microtask.js":
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__("./node_modules/core-js/library/modules/$.global.js")
	  , macrotask = __webpack_require__("./node_modules/core-js/library/modules/$.task.js").set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__("./node_modules/core-js/library/modules/$.cof.js")(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.task.js":
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__("./node_modules/core-js/library/modules/$.ctx.js")
	  , invoke             = __webpack_require__("./node_modules/core-js/library/modules/$.invoke.js")
	  , html               = __webpack_require__("./node_modules/core-js/library/modules/$.html.js")
	  , cel                = __webpack_require__("./node_modules/core-js/library/modules/$.dom-create.js")
	  , global             = __webpack_require__("./node_modules/core-js/library/modules/$.global.js")
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__("./node_modules/core-js/library/modules/$.cof.js")(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.invoke.js":
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.html.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.global.js").document && document.documentElement;

/***/ },

/***/ "./node_modules/core-js/library/modules/$.dom-create.js":
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__("./node_modules/core-js/library/modules/$.is-object.js")
	  , document = __webpack_require__("./node_modules/core-js/library/modules/$.global.js").document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.set-species.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__("./node_modules/core-js/library/modules/$.core.js")
	  , $           = __webpack_require__("./node_modules/core-js/library/modules/$.js")
	  , DESCRIPTORS = __webpack_require__("./node_modules/core-js/library/modules/$.descriptors.js")
	  , SPECIES     = __webpack_require__("./node_modules/core-js/library/modules/$.wks.js")('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.iter-detect.js":
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__("./node_modules/core-js/library/modules/$.wks.js")('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },

/***/ "./src/ASTOutput.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__("./node_modules/classnames/index.js");
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _componentsVisualization = __webpack_require__("./src/components/visualization/index.js");
	
	var _componentsVisualization2 = _interopRequireDefault(_componentsVisualization);
	
	var PropTypes = _react2['default'].PropTypes;
	
	var _default = (function (_React$Component) {
	  _inherits(_default, _React$Component);
	
	  _createClass(_default, null, [{
	    key: 'propTypes',
	    value: {
	      ast: _react2['default'].PropTypes.object,
	      focusPath: _react2['default'].PropTypes.array.isRequired,
	      parser: PropTypes.object.isRequired
	    },
	    enumerable: true
	  }]);
	
	  function _default(props, context) {
	    _classCallCheck(this, _default);
	
	    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props, context);
	    this._changeOutput = this._changeOutput.bind(this);
	
	    this.state = {
	      output: 0
	    };
	  }
	
	  _createClass(_default, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      var newFocusPath = nextProps.focusPath;
	
	      return this.props.editorError !== nextProps.editorError || this.props.ast !== nextProps.ast || this.props.focusPath.length !== newFocusPath.length || this.props.focusPath.some(function (obj, i) {
	        return obj !== newFocusPath[i];
	      }) || this.state.output !== nextState.output || this.state.parser !== nextState.parser;
	    }
	  }, {
	    key: '_changeOutput',
	    value: function _changeOutput(event) {
	      this.setState({ output: event.target.value });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      var output = undefined;
	      if (this.props.ast) {
	        output = _react2['default'].createElement(_componentsVisualization2['default'][this.state.output], this.props);
	      } else if (this.props.editorError) {
	        output = _react2['default'].createElement(
	          'div',
	          { style: { padding: 20 } },
	          this.props.editorError.message
	        );
	      }
	
	      var buttons = _componentsVisualization2['default'].map(function (cls, index) {
	        return _react2['default'].createElement(
	          'button',
	          {
	            key: index,
	            value: index,
	            onClick: _this._changeOutput,
	            className: (0, _classnames2['default'])({
	              active: _this.state.output == index
	            }) },
	          cls.name
	        );
	      });
	
	      return _react2['default'].createElement(
	        'div',
	        { className: 'output highlight' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'toolbar' },
	          buttons
	        ),
	        output
	      );
	    }
	  }]);
	
	  return _default;
	})(_react2['default'].Component);
	
	exports['default'] = _default;
	module.exports = exports['default'];

/***/ },

/***/ "./src/components/visualization/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _JSON = __webpack_require__("./src/components/visualization/JSON.js");
	
	var _JSON2 = _interopRequireDefault(_JSON);
	
	var _Tree = __webpack_require__("./src/components/visualization/Tree.js");
	
	var _Tree2 = _interopRequireDefault(_Tree);
	
	exports['default'] = [_Tree2['default'], _JSON2['default']];
	module.exports = exports['default'];

/***/ },

/***/ "./src/components/visualization/JSON.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _JSONEditor = __webpack_require__("./src/JSONEditor.js");
	
	var _JSONEditor2 = _interopRequireDefault(_JSONEditor);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _jsonStringifySafe = __webpack_require__("./node_modules/json-stringify-safe/stringify.js");
	
	var _jsonStringifySafe2 = _interopRequireDefault(_jsonStringifySafe);
	
	var JSON = (function () {
	  function JSON() {
	    _classCallCheck(this, JSON);
	  }
	
	  _createClass(JSON, [{
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(_JSONEditor2['default'], {
	        className: 'container',
	        value: (0, _jsonStringifySafe2['default'])(this.props.ast, null, 2)
	      });
	    }
	  }]);
	
	  return JSON;
	})();
	
	exports['default'] = JSON;
	module.exports = exports['default'];

/***/ },

/***/ "./src/JSONEditor.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _codemirror = __webpack_require__("./node_modules/codemirror/lib/codemirror.js");
	
	var _codemirror2 = _interopRequireDefault(_codemirror);
	
	__webpack_require__("./node_modules/codemirror/mode/javascript/javascript.js");
	
	__webpack_require__("./node_modules/codemirror/addon/fold/foldgutter.js");
	
	__webpack_require__("./node_modules/codemirror/addon/fold/foldcode.js");
	
	__webpack_require__("./node_modules/codemirror/addon/fold/brace-fold.js");
	
	var _pubsubJs = __webpack_require__("./node_modules/pubsub-js/src/pubsub.js");
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var Editor = (function (_React$Component) {
	  _inherits(Editor, _React$Component);
	
	  function Editor() {
	    _classCallCheck(this, Editor);
	
	    _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Editor, [{
	    key: 'getValue',
	    value: function getValue() {
	      return this.codeMirror && this.codeMirror.getValue();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.value !== this.codeMirror.getValue()) {
	        // preserve scroll position
	        var info = this.codeMirror.getScrollInfo();
	        this.codeMirror.setValue(nextProps.value);
	        this.codeMirror.scrollTo(info.left, info.top);
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return false;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      this._CMHandlers = [];
	      this._subscriptions = [];
	      this.codeMirror = (0, _codemirror2['default'])( // eslint-disable-line new-cap
	      this.refs.container.getDOMNode(), {
	        value: this.props.value,
	        mode: { name: 'javascript', json: true },
	        readOnly: true,
	        lineNumbers: true,
	        foldGutter: true,
	        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
	      });
	
	      if (this.props.onContentChange) {
	        this._onContentChange();
	      }
	
	      this._subscriptions.push(_pubsubJs2['default'].subscribe('PANEL_RESIZE', function () {
	        if (_this.codeMirror) {
	          _this.codeMirror.refresh();
	        }
	      }));
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._unbindHandlers();
	      var container = this.refs.container.getDOMNode();
	      container.removeChild(container.children[0]);
	      this.codeMirror = null;
	    }
	  }, {
	    key: '_bindCMHandler',
	    value: function _bindCMHandler(event, handler) {
	      this._CMHandlers.push(event, handler);
	      this.codeMirror.on(event, handler);
	    }
	  }, {
	    key: '_unbindHandlers',
	    value: function _unbindHandlers() {
	      var cmHandlers = this._CMHandlers;
	      for (var i = 0; i < cmHandlers.length; i += 2) {
	        this.codeMirror.off(cmHandlers[i], cmHandlers[i + 1]);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('div', { id: 'JSONEditor', className: this.props.className, ref: 'container' });
	    }
	  }]);
	
	  return Editor;
	})(_react2['default'].Component);
	
	exports['default'] = Editor;
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/codemirror/mode/javascript/javascript.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	// TODO actually recognize syntax of TypeScript constructs
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";
	
	function expressionAllowed(stream, state, backUp) {
	  return /^(?:operator|sof|keyword c|case|new|[\[{}\(,;:]|=>)$/.test(state.lastType) ||
	    (state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0))))
	}
	
	CodeMirror.defineMode("javascript", function(config, parserConfig) {
	  var indentUnit = config.indentUnit;
	  var statementIndent = parserConfig.statementIndent;
	  var jsonldMode = parserConfig.jsonld;
	  var jsonMode = parserConfig.json || jsonldMode;
	  var isTS = parserConfig.typescript;
	  var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
	
	  // Tokenizer
	
	  var keywords = function(){
	    function kw(type) {return {type: type, style: "keyword"};}
	    var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c");
	    var operator = kw("operator"), atom = {type: "atom", style: "atom"};
	
	    var jsKeywords = {
	      "if": kw("if"), "while": A, "with": A, "else": B, "do": B, "try": B, "finally": B,
	      "return": C, "break": C, "continue": C, "new": kw("new"), "delete": C, "throw": C, "debugger": C,
	      "var": kw("var"), "const": kw("var"), "let": kw("var"),
	      "function": kw("function"), "catch": kw("catch"),
	      "for": kw("for"), "switch": kw("switch"), "case": kw("case"), "default": kw("default"),
	      "in": operator, "typeof": operator, "instanceof": operator,
	      "true": atom, "false": atom, "null": atom, "undefined": atom, "NaN": atom, "Infinity": atom,
	      "this": kw("this"), "class": kw("class"), "super": kw("atom"),
	      "yield": C, "export": kw("export"), "import": kw("import"), "extends": C
	    };
	
	    // Extend the 'normal' keywords with the TypeScript language extensions
	    if (isTS) {
	      var type = {type: "variable", style: "variable-3"};
	      var tsKeywords = {
	        // object-like things
	        "interface": kw("class"),
	        "implements": C,
	        "namespace": C,
	        "module": kw("module"),
	        "enum": kw("module"),
	
	        // scope modifiers
	        "public": kw("modifier"),
	        "private": kw("modifier"),
	        "protected": kw("modifier"),
	        "abstract": kw("modifier"),
	
	        // operators
	        "as": operator,
	
	        // types
	        "string": type, "number": type, "boolean": type, "any": type
	      };
	
	      for (var attr in tsKeywords) {
	        jsKeywords[attr] = tsKeywords[attr];
	      }
	    }
	
	    return jsKeywords;
	  }();
	
	  var isOperatorChar = /[+\-*&%=<>!?|~^]/;
	  var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
	
	  function readRegexp(stream) {
	    var escaped = false, next, inSet = false;
	    while ((next = stream.next()) != null) {
	      if (!escaped) {
	        if (next == "/" && !inSet) return;
	        if (next == "[") inSet = true;
	        else if (inSet && next == "]") inSet = false;
	      }
	      escaped = !escaped && next == "\\";
	    }
	  }
	
	  // Used as scratch variables to communicate multiple values without
	  // consing up tons of objects.
	  var type, content;
	  function ret(tp, style, cont) {
	    type = tp; content = cont;
	    return style;
	  }
	  function tokenBase(stream, state) {
	    var ch = stream.next();
	    if (ch == '"' || ch == "'") {
	      state.tokenize = tokenString(ch);
	      return state.tokenize(stream, state);
	    } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
	      return ret("number", "number");
	    } else if (ch == "." && stream.match("..")) {
	      return ret("spread", "meta");
	    } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
	      return ret(ch);
	    } else if (ch == "=" && stream.eat(">")) {
	      return ret("=>", "operator");
	    } else if (ch == "0" && stream.eat(/x/i)) {
	      stream.eatWhile(/[\da-f]/i);
	      return ret("number", "number");
	    } else if (ch == "0" && stream.eat(/o/i)) {
	      stream.eatWhile(/[0-7]/i);
	      return ret("number", "number");
	    } else if (ch == "0" && stream.eat(/b/i)) {
	      stream.eatWhile(/[01]/i);
	      return ret("number", "number");
	    } else if (/\d/.test(ch)) {
	      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
	      return ret("number", "number");
	    } else if (ch == "/") {
	      if (stream.eat("*")) {
	        state.tokenize = tokenComment;
	        return tokenComment(stream, state);
	      } else if (stream.eat("/")) {
	        stream.skipToEnd();
	        return ret("comment", "comment");
	      } else if (expressionAllowed(stream, state, 1)) {
	        readRegexp(stream);
	        stream.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/);
	        return ret("regexp", "string-2");
	      } else {
	        stream.eatWhile(isOperatorChar);
	        return ret("operator", "operator", stream.current());
	      }
	    } else if (ch == "`") {
	      state.tokenize = tokenQuasi;
	      return tokenQuasi(stream, state);
	    } else if (ch == "#") {
	      stream.skipToEnd();
	      return ret("error", "error");
	    } else if (isOperatorChar.test(ch)) {
	      stream.eatWhile(isOperatorChar);
	      return ret("operator", "operator", stream.current());
	    } else if (wordRE.test(ch)) {
	      stream.eatWhile(wordRE);
	      var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
	      return (known && state.lastType != ".") ? ret(known.type, known.style, word) :
	                     ret("variable", "variable", word);
	    }
	  }
	
	  function tokenString(quote) {
	    return function(stream, state) {
	      var escaped = false, next;
	      if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)){
	        state.tokenize = tokenBase;
	        return ret("jsonld-keyword", "meta");
	      }
	      while ((next = stream.next()) != null) {
	        if (next == quote && !escaped) break;
	        escaped = !escaped && next == "\\";
	      }
	      if (!escaped) state.tokenize = tokenBase;
	      return ret("string", "string");
	    };
	  }
	
	  function tokenComment(stream, state) {
	    var maybeEnd = false, ch;
	    while (ch = stream.next()) {
	      if (ch == "/" && maybeEnd) {
	        state.tokenize = tokenBase;
	        break;
	      }
	      maybeEnd = (ch == "*");
	    }
	    return ret("comment", "comment");
	  }
	
	  function tokenQuasi(stream, state) {
	    var escaped = false, next;
	    while ((next = stream.next()) != null) {
	      if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
	        state.tokenize = tokenBase;
	        break;
	      }
	      escaped = !escaped && next == "\\";
	    }
	    return ret("quasi", "string-2", stream.current());
	  }
	
	  var brackets = "([{}])";
	  // This is a crude lookahead trick to try and notice that we're
	  // parsing the argument patterns for a fat-arrow function before we
	  // actually hit the arrow token. It only works if the arrow is on
	  // the same line as the arguments and there's no strange noise
	  // (comments) in between. Fallback is to only notice when we hit the
	  // arrow, and not declare the arguments as locals for the arrow
	  // body.
	  function findFatArrow(stream, state) {
	    if (state.fatArrowAt) state.fatArrowAt = null;
	    var arrow = stream.string.indexOf("=>", stream.start);
	    if (arrow < 0) return;
	
	    var depth = 0, sawSomething = false;
	    for (var pos = arrow - 1; pos >= 0; --pos) {
	      var ch = stream.string.charAt(pos);
	      var bracket = brackets.indexOf(ch);
	      if (bracket >= 0 && bracket < 3) {
	        if (!depth) { ++pos; break; }
	        if (--depth == 0) break;
	      } else if (bracket >= 3 && bracket < 6) {
	        ++depth;
	      } else if (wordRE.test(ch)) {
	        sawSomething = true;
	      } else if (/["'\/]/.test(ch)) {
	        return;
	      } else if (sawSomething && !depth) {
	        ++pos;
	        break;
	      }
	    }
	    if (sawSomething && !depth) state.fatArrowAt = pos;
	  }
	
	  // Parser
	
	  var atomicTypes = {"atom": true, "number": true, "variable": true, "string": true, "regexp": true, "this": true, "jsonld-keyword": true};
	
	  function JSLexical(indented, column, type, align, prev, info) {
	    this.indented = indented;
	    this.column = column;
	    this.type = type;
	    this.prev = prev;
	    this.info = info;
	    if (align != null) this.align = align;
	  }
	
	  function inScope(state, varname) {
	    for (var v = state.localVars; v; v = v.next)
	      if (v.name == varname) return true;
	    for (var cx = state.context; cx; cx = cx.prev) {
	      for (var v = cx.vars; v; v = v.next)
	        if (v.name == varname) return true;
	    }
	  }
	
	  function parseJS(state, style, type, content, stream) {
	    var cc = state.cc;
	    // Communicate our context to the combinators.
	    // (Less wasteful than consing up a hundred closures on every call.)
	    cx.state = state; cx.stream = stream; cx.marked = null, cx.cc = cc; cx.style = style;
	
	    if (!state.lexical.hasOwnProperty("align"))
	      state.lexical.align = true;
	
	    while(true) {
	      var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
	      if (combinator(type, content)) {
	        while(cc.length && cc[cc.length - 1].lex)
	          cc.pop()();
	        if (cx.marked) return cx.marked;
	        if (type == "variable" && inScope(state, content)) return "variable-2";
	        return style;
	      }
	    }
	  }
	
	  // Combinator utils
	
	  var cx = {state: null, column: null, marked: null, cc: null};
	  function pass() {
	    for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
	  }
	  function cont() {
	    pass.apply(null, arguments);
	    return true;
	  }
	  function register(varname) {
	    function inList(list) {
	      for (var v = list; v; v = v.next)
	        if (v.name == varname) return true;
	      return false;
	    }
	    var state = cx.state;
	    cx.marked = "def";
	    if (state.context) {
	      if (inList(state.localVars)) return;
	      state.localVars = {name: varname, next: state.localVars};
	    } else {
	      if (inList(state.globalVars)) return;
	      if (parserConfig.globalVars)
	        state.globalVars = {name: varname, next: state.globalVars};
	    }
	  }
	
	  // Combinators
	
	  var defaultVars = {name: "this", next: {name: "arguments"}};
	  function pushcontext() {
	    cx.state.context = {prev: cx.state.context, vars: cx.state.localVars};
	    cx.state.localVars = defaultVars;
	  }
	  function popcontext() {
	    cx.state.localVars = cx.state.context.vars;
	    cx.state.context = cx.state.context.prev;
	  }
	  function pushlex(type, info) {
	    var result = function() {
	      var state = cx.state, indent = state.indented;
	      if (state.lexical.type == "stat") indent = state.lexical.indented;
	      else for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
	        indent = outer.indented;
	      state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
	    };
	    result.lex = true;
	    return result;
	  }
	  function poplex() {
	    var state = cx.state;
	    if (state.lexical.prev) {
	      if (state.lexical.type == ")")
	        state.indented = state.lexical.indented;
	      state.lexical = state.lexical.prev;
	    }
	  }
	  poplex.lex = true;
	
	  function expect(wanted) {
	    function exp(type) {
	      if (type == wanted) return cont();
	      else if (wanted == ";") return pass();
	      else return cont(exp);
	    };
	    return exp;
	  }
	
	  function statement(type, value) {
	    if (type == "var") return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
	    if (type == "keyword a") return cont(pushlex("form"), expression, statement, poplex);
	    if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
	    if (type == "{") return cont(pushlex("}"), block, poplex);
	    if (type == ";") return cont();
	    if (type == "if") {
	      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
	        cx.state.cc.pop()();
	      return cont(pushlex("form"), expression, statement, poplex, maybeelse);
	    }
	    if (type == "function") return cont(functiondef);
	    if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
	    if (type == "variable") return cont(pushlex("stat"), maybelabel);
	    if (type == "switch") return cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"),
	                                      block, poplex, poplex);
	    if (type == "case") return cont(expression, expect(":"));
	    if (type == "default") return cont(expect(":"));
	    if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
	                                     statement, poplex, popcontext);
	    if (type == "class") return cont(pushlex("form"), className, poplex);
	    if (type == "export") return cont(pushlex("stat"), afterExport, poplex);
	    if (type == "import") return cont(pushlex("stat"), afterImport, poplex);
	    if (type == "module") return cont(pushlex("form"), pattern, pushlex("}"), expect("{"), block, poplex, poplex)
	    return pass(pushlex("stat"), expression, expect(";"), poplex);
	  }
	  function expression(type) {
	    return expressionInner(type, false);
	  }
	  function expressionNoComma(type) {
	    return expressionInner(type, true);
	  }
	  function expressionInner(type, noComma) {
	    if (cx.state.fatArrowAt == cx.stream.start) {
	      var body = noComma ? arrowBodyNoComma : arrowBody;
	      if (type == "(") return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext);
	      else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
	    }
	
	    var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
	    if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
	    if (type == "function") return cont(functiondef, maybeop);
	    if (type == "keyword c") return cont(noComma ? maybeexpressionNoComma : maybeexpression);
	    if (type == "(") return cont(pushlex(")"), maybeexpression, comprehension, expect(")"), poplex, maybeop);
	    if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
	    if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
	    if (type == "{") return contCommasep(objprop, "}", null, maybeop);
	    if (type == "quasi") return pass(quasi, maybeop);
	    if (type == "new") return cont(maybeTarget(noComma));
	    return cont();
	  }
	  function maybeexpression(type) {
	    if (type.match(/[;\}\)\],]/)) return pass();
	    return pass(expression);
	  }
	  function maybeexpressionNoComma(type) {
	    if (type.match(/[;\}\)\],]/)) return pass();
	    return pass(expressionNoComma);
	  }
	
	  function maybeoperatorComma(type, value) {
	    if (type == ",") return cont(expression);
	    return maybeoperatorNoComma(type, value, false);
	  }
	  function maybeoperatorNoComma(type, value, noComma) {
	    var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
	    var expr = noComma == false ? expression : expressionNoComma;
	    if (type == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
	    if (type == "operator") {
	      if (/\+\+|--/.test(value)) return cont(me);
	      if (value == "?") return cont(expression, expect(":"), expr);
	      return cont(expr);
	    }
	    if (type == "quasi") { return pass(quasi, me); }
	    if (type == ";") return;
	    if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
	    if (type == ".") return cont(property, me);
	    if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
	  }
	  function quasi(type, value) {
	    if (type != "quasi") return pass();
	    if (value.slice(value.length - 2) != "${") return cont(quasi);
	    return cont(expression, continueQuasi);
	  }
	  function continueQuasi(type) {
	    if (type == "}") {
	      cx.marked = "string-2";
	      cx.state.tokenize = tokenQuasi;
	      return cont(quasi);
	    }
	  }
	  function arrowBody(type) {
	    findFatArrow(cx.stream, cx.state);
	    return pass(type == "{" ? statement : expression);
	  }
	  function arrowBodyNoComma(type) {
	    findFatArrow(cx.stream, cx.state);
	    return pass(type == "{" ? statement : expressionNoComma);
	  }
	  function maybeTarget(noComma) {
	    return function(type) {
	      if (type == ".") return cont(noComma ? targetNoComma : target);
	      else return pass(noComma ? expressionNoComma : expression);
	    };
	  }
	  function target(_, value) {
	    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorComma); }
	  }
	  function targetNoComma(_, value) {
	    if (value == "target") { cx.marked = "keyword"; return cont(maybeoperatorNoComma); }
	  }
	  function maybelabel(type) {
	    if (type == ":") return cont(poplex, statement);
	    return pass(maybeoperatorComma, expect(";"), poplex);
	  }
	  function property(type) {
	    if (type == "variable") {cx.marked = "property"; return cont();}
	  }
	  function objprop(type, value) {
	    if (type == "variable" || cx.style == "keyword") {
	      cx.marked = "property";
	      if (value == "get" || value == "set") return cont(getterSetter);
	      return cont(afterprop);
	    } else if (type == "number" || type == "string") {
	      cx.marked = jsonldMode ? "property" : (cx.style + " property");
	      return cont(afterprop);
	    } else if (type == "jsonld-keyword") {
	      return cont(afterprop);
	    } else if (type == "modifier") {
	      return cont(objprop)
	    } else if (type == "[") {
	      return cont(expression, expect("]"), afterprop);
	    } else if (type == "spread") {
	      return cont(expression);
	    }
	  }
	  function getterSetter(type) {
	    if (type != "variable") return pass(afterprop);
	    cx.marked = "property";
	    return cont(functiondef);
	  }
	  function afterprop(type) {
	    if (type == ":") return cont(expressionNoComma);
	    if (type == "(") return pass(functiondef);
	  }
	  function commasep(what, end) {
	    function proceed(type) {
	      if (type == ",") {
	        var lex = cx.state.lexical;
	        if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
	        return cont(what, proceed);
	      }
	      if (type == end) return cont();
	      return cont(expect(end));
	    }
	    return function(type) {
	      if (type == end) return cont();
	      return pass(what, proceed);
	    };
	  }
	  function contCommasep(what, end, info) {
	    for (var i = 3; i < arguments.length; i++)
	      cx.cc.push(arguments[i]);
	    return cont(pushlex(end, info), commasep(what, end), poplex);
	  }
	  function block(type) {
	    if (type == "}") return cont();
	    return pass(statement, block);
	  }
	  function maybetype(type) {
	    if (isTS && type == ":") return cont(typedef);
	  }
	  function maybedefault(_, value) {
	    if (value == "=") return cont(expressionNoComma);
	  }
	  function typedef(type) {
	    if (type == "variable") {cx.marked = "variable-3"; return cont();}
	  }
	  function vardef() {
	    return pass(pattern, maybetype, maybeAssign, vardefCont);
	  }
	  function pattern(type, value) {
	    if (type == "modifier") return cont(pattern)
	    if (type == "variable") { register(value); return cont(); }
	    if (type == "spread") return cont(pattern);
	    if (type == "[") return contCommasep(pattern, "]");
	    if (type == "{") return contCommasep(proppattern, "}");
	  }
	  function proppattern(type, value) {
	    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
	      register(value);
	      return cont(maybeAssign);
	    }
	    if (type == "variable") cx.marked = "property";
	    if (type == "spread") return cont(pattern);
	    if (type == "}") return pass();
	    return cont(expect(":"), pattern, maybeAssign);
	  }
	  function maybeAssign(_type, value) {
	    if (value == "=") return cont(expressionNoComma);
	  }
	  function vardefCont(type) {
	    if (type == ",") return cont(vardef);
	  }
	  function maybeelse(type, value) {
	    if (type == "keyword b" && value == "else") return cont(pushlex("form", "else"), statement, poplex);
	  }
	  function forspec(type) {
	    if (type == "(") return cont(pushlex(")"), forspec1, expect(")"), poplex);
	  }
	  function forspec1(type) {
	    if (type == "var") return cont(vardef, expect(";"), forspec2);
	    if (type == ";") return cont(forspec2);
	    if (type == "variable") return cont(formaybeinof);
	    return pass(expression, expect(";"), forspec2);
	  }
	  function formaybeinof(_type, value) {
	    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
	    return cont(maybeoperatorComma, forspec2);
	  }
	  function forspec2(type, value) {
	    if (type == ";") return cont(forspec3);
	    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
	    return pass(expression, expect(";"), forspec3);
	  }
	  function forspec3(type) {
	    if (type != ")") cont(expression);
	  }
	  function functiondef(type, value) {
	    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
	    if (type == "variable") {register(value); return cont(functiondef);}
	    if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, statement, popcontext);
	  }
	  function funarg(type) {
	    if (type == "spread") return cont(funarg);
	    return pass(pattern, maybetype, maybedefault);
	  }
	  function className(type, value) {
	    if (type == "variable") {register(value); return cont(classNameAfter);}
	  }
	  function classNameAfter(type, value) {
	    if (value == "extends") return cont(expression, classNameAfter);
	    if (type == "{") return cont(pushlex("}"), classBody, poplex);
	  }
	  function classBody(type, value) {
	    if (type == "variable" || cx.style == "keyword") {
	      if (value == "static") {
	        cx.marked = "keyword";
	        return cont(classBody);
	      }
	      cx.marked = "property";
	      if (value == "get" || value == "set") return cont(classGetterSetter, functiondef, classBody);
	      return cont(functiondef, classBody);
	    }
	    if (value == "*") {
	      cx.marked = "keyword";
	      return cont(classBody);
	    }
	    if (type == ";") return cont(classBody);
	    if (type == "}") return cont();
	  }
	  function classGetterSetter(type) {
	    if (type != "variable") return pass();
	    cx.marked = "property";
	    return cont();
	  }
	  function afterExport(_type, value) {
	    if (value == "*") { cx.marked = "keyword"; return cont(maybeFrom, expect(";")); }
	    if (value == "default") { cx.marked = "keyword"; return cont(expression, expect(";")); }
	    return pass(statement);
	  }
	  function afterImport(type) {
	    if (type == "string") return cont();
	    return pass(importSpec, maybeFrom);
	  }
	  function importSpec(type, value) {
	    if (type == "{") return contCommasep(importSpec, "}");
	    if (type == "variable") register(value);
	    if (value == "*") cx.marked = "keyword";
	    return cont(maybeAs);
	  }
	  function maybeAs(_type, value) {
	    if (value == "as") { cx.marked = "keyword"; return cont(importSpec); }
	  }
	  function maybeFrom(_type, value) {
	    if (value == "from") { cx.marked = "keyword"; return cont(expression); }
	  }
	  function arrayLiteral(type) {
	    if (type == "]") return cont();
	    return pass(expressionNoComma, maybeArrayComprehension);
	  }
	  function maybeArrayComprehension(type) {
	    if (type == "for") return pass(comprehension, expect("]"));
	    if (type == ",") return cont(commasep(maybeexpressionNoComma, "]"));
	    return pass(commasep(expressionNoComma, "]"));
	  }
	  function comprehension(type) {
	    if (type == "for") return cont(forspec, comprehension);
	    if (type == "if") return cont(expression, comprehension);
	  }
	
	  function isContinuedStatement(state, textAfter) {
	    return state.lastType == "operator" || state.lastType == "," ||
	      isOperatorChar.test(textAfter.charAt(0)) ||
	      /[,.]/.test(textAfter.charAt(0));
	  }
	
	  // Interface
	
	  return {
	    startState: function(basecolumn) {
	      var state = {
	        tokenize: tokenBase,
	        lastType: "sof",
	        cc: [],
	        lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
	        localVars: parserConfig.localVars,
	        context: parserConfig.localVars && {vars: parserConfig.localVars},
	        indented: basecolumn || 0
	      };
	      if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
	        state.globalVars = parserConfig.globalVars;
	      return state;
	    },
	
	    token: function(stream, state) {
	      if (stream.sol()) {
	        if (!state.lexical.hasOwnProperty("align"))
	          state.lexical.align = false;
	        state.indented = stream.indentation();
	        findFatArrow(stream, state);
	      }
	      if (state.tokenize != tokenComment && stream.eatSpace()) return null;
	      var style = state.tokenize(stream, state);
	      if (type == "comment") return style;
	      state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
	      return parseJS(state, style, type, content, stream);
	    },
	
	    indent: function(state, textAfter) {
	      if (state.tokenize == tokenComment) return CodeMirror.Pass;
	      if (state.tokenize != tokenBase) return 0;
	      var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
	      // Kludge to prevent 'maybelse' from blocking lexical scope pops
	      if (!/^\s*else\b/.test(textAfter)) for (var i = state.cc.length - 1; i >= 0; --i) {
	        var c = state.cc[i];
	        if (c == poplex) lexical = lexical.prev;
	        else if (c != maybeelse) break;
	      }
	      if (lexical.type == "stat" && firstChar == "}") lexical = lexical.prev;
	      if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
	        lexical = lexical.prev;
	      var type = lexical.type, closing = firstChar == type;
	
	      if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0);
	      else if (type == "form" && firstChar == "{") return lexical.indented;
	      else if (type == "form") return lexical.indented + indentUnit;
	      else if (type == "stat")
	        return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
	      else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
	        return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
	      else if (lexical.align) return lexical.column + (closing ? 0 : 1);
	      else return lexical.indented + (closing ? 0 : indentUnit);
	    },
	
	    electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
	    blockCommentStart: jsonMode ? null : "/*",
	    blockCommentEnd: jsonMode ? null : "*/",
	    lineComment: jsonMode ? null : "//",
	    fold: "brace",
	    closeBrackets: "()[]{}''\"\"``",
	
	    helperType: jsonMode ? "json" : "javascript",
	    jsonldMode: jsonldMode,
	    jsonMode: jsonMode,
	
	    expressionAllowed: expressionAllowed,
	    skipExpression: function(state) {
	      var top = state.cc[state.cc.length - 1]
	      if (top == expression || top == expressionNoComma) state.cc.pop()
	    }
	  };
	});
	
	CodeMirror.registerHelper("wordChars", "javascript", /[\w$]/);
	
	CodeMirror.defineMIME("text/javascript", "javascript");
	CodeMirror.defineMIME("text/ecmascript", "javascript");
	CodeMirror.defineMIME("application/javascript", "javascript");
	CodeMirror.defineMIME("application/x-javascript", "javascript");
	CodeMirror.defineMIME("application/ecmascript", "javascript");
	CodeMirror.defineMIME("application/json", {name: "javascript", json: true});
	CodeMirror.defineMIME("application/x-json", {name: "javascript", json: true});
	CodeMirror.defineMIME("application/ld+json", {name: "javascript", jsonld: true});
	CodeMirror.defineMIME("text/typescript", { name: "javascript", typescript: true });
	CodeMirror.defineMIME("application/typescript", { name: "javascript", typescript: true });
	
	});


/***/ },

/***/ "./node_modules/codemirror/addon/fold/foldgutter.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"), __webpack_require__("./node_modules/codemirror/addon/fold/foldcode.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror", "./foldcode"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	
	  CodeMirror.defineOption("foldGutter", false, function(cm, val, old) {
	    if (old && old != CodeMirror.Init) {
	      cm.clearGutter(cm.state.foldGutter.options.gutter);
	      cm.state.foldGutter = null;
	      cm.off("gutterClick", onGutterClick);
	      cm.off("change", onChange);
	      cm.off("viewportChange", onViewportChange);
	      cm.off("fold", onFold);
	      cm.off("unfold", onFold);
	      cm.off("swapDoc", onChange);
	    }
	    if (val) {
	      cm.state.foldGutter = new State(parseOptions(val));
	      updateInViewport(cm);
	      cm.on("gutterClick", onGutterClick);
	      cm.on("change", onChange);
	      cm.on("viewportChange", onViewportChange);
	      cm.on("fold", onFold);
	      cm.on("unfold", onFold);
	      cm.on("swapDoc", onChange);
	    }
	  });
	
	  var Pos = CodeMirror.Pos;
	
	  function State(options) {
	    this.options = options;
	    this.from = this.to = 0;
	  }
	
	  function parseOptions(opts) {
	    if (opts === true) opts = {};
	    if (opts.gutter == null) opts.gutter = "CodeMirror-foldgutter";
	    if (opts.indicatorOpen == null) opts.indicatorOpen = "CodeMirror-foldgutter-open";
	    if (opts.indicatorFolded == null) opts.indicatorFolded = "CodeMirror-foldgutter-folded";
	    return opts;
	  }
	
	  function isFolded(cm, line) {
	    var marks = cm.findMarksAt(Pos(line));
	    for (var i = 0; i < marks.length; ++i)
	      if (marks[i].__isFold && marks[i].find().from.line == line) return marks[i];
	  }
	
	  function marker(spec) {
	    if (typeof spec == "string") {
	      var elt = document.createElement("div");
	      elt.className = spec + " CodeMirror-guttermarker-subtle";
	      return elt;
	    } else {
	      return spec.cloneNode(true);
	    }
	  }
	
	  function updateFoldInfo(cm, from, to) {
	    var opts = cm.state.foldGutter.options, cur = from;
	    var minSize = cm.foldOption(opts, "minFoldSize");
	    var func = cm.foldOption(opts, "rangeFinder");
	    cm.eachLine(from, to, function(line) {
	      var mark = null;
	      if (isFolded(cm, cur)) {
	        mark = marker(opts.indicatorFolded);
	      } else {
	        var pos = Pos(cur, 0);
	        var range = func && func(cm, pos);
	        if (range && range.to.line - range.from.line >= minSize)
	          mark = marker(opts.indicatorOpen);
	      }
	      cm.setGutterMarker(line, opts.gutter, mark);
	      ++cur;
	    });
	  }
	
	  function updateInViewport(cm) {
	    var vp = cm.getViewport(), state = cm.state.foldGutter;
	    if (!state) return;
	    cm.operation(function() {
	      updateFoldInfo(cm, vp.from, vp.to);
	    });
	    state.from = vp.from; state.to = vp.to;
	  }
	
	  function onGutterClick(cm, line, gutter) {
	    var state = cm.state.foldGutter;
	    if (!state) return;
	    var opts = state.options;
	    if (gutter != opts.gutter) return;
	    var folded = isFolded(cm, line);
	    if (folded) folded.clear();
	    else cm.foldCode(Pos(line, 0), opts.rangeFinder);
	  }
	
	  function onChange(cm) {
	    var state = cm.state.foldGutter;
	    if (!state) return;
	    var opts = state.options;
	    state.from = state.to = 0;
	    clearTimeout(state.changeUpdate);
	    state.changeUpdate = setTimeout(function() { updateInViewport(cm); }, opts.foldOnChangeTimeSpan || 600);
	  }
	
	  function onViewportChange(cm) {
	    var state = cm.state.foldGutter;
	    if (!state) return;
	    var opts = state.options;
	    clearTimeout(state.changeUpdate);
	    state.changeUpdate = setTimeout(function() {
	      var vp = cm.getViewport();
	      if (state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20) {
	        updateInViewport(cm);
	      } else {
	        cm.operation(function() {
	          if (vp.from < state.from) {
	            updateFoldInfo(cm, vp.from, state.from);
	            state.from = vp.from;
	          }
	          if (vp.to > state.to) {
	            updateFoldInfo(cm, state.to, vp.to);
	            state.to = vp.to;
	          }
	        });
	      }
	    }, opts.updateViewportTimeSpan || 400);
	  }
	
	  function onFold(cm, from) {
	    var state = cm.state.foldGutter;
	    if (!state) return;
	    var line = from.line;
	    if (line >= state.from && line < state.to)
	      updateFoldInfo(cm, line, line + 1);
	  }
	});


/***/ },

/***/ "./node_modules/codemirror/addon/fold/foldcode.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	
	  function doFold(cm, pos, options, force) {
	    if (options && options.call) {
	      var finder = options;
	      options = null;
	    } else {
	      var finder = getOption(cm, options, "rangeFinder");
	    }
	    if (typeof pos == "number") pos = CodeMirror.Pos(pos, 0);
	    var minSize = getOption(cm, options, "minFoldSize");
	
	    function getRange(allowFolded) {
	      var range = finder(cm, pos);
	      if (!range || range.to.line - range.from.line < minSize) return null;
	      var marks = cm.findMarksAt(range.from);
	      for (var i = 0; i < marks.length; ++i) {
	        if (marks[i].__isFold && force !== "fold") {
	          if (!allowFolded) return null;
	          range.cleared = true;
	          marks[i].clear();
	        }
	      }
	      return range;
	    }
	
	    var range = getRange(true);
	    if (getOption(cm, options, "scanUp")) while (!range && pos.line > cm.firstLine()) {
	      pos = CodeMirror.Pos(pos.line - 1, 0);
	      range = getRange(false);
	    }
	    if (!range || range.cleared || force === "unfold") return;
	
	    var myWidget = makeWidget(cm, options);
	    CodeMirror.on(myWidget, "mousedown", function(e) {
	      myRange.clear();
	      CodeMirror.e_preventDefault(e);
	    });
	    var myRange = cm.markText(range.from, range.to, {
	      replacedWith: myWidget,
	      clearOnEnter: true,
	      __isFold: true
	    });
	    myRange.on("clear", function(from, to) {
	      CodeMirror.signal(cm, "unfold", cm, from, to);
	    });
	    CodeMirror.signal(cm, "fold", cm, range.from, range.to);
	  }
	
	  function makeWidget(cm, options) {
	    var widget = getOption(cm, options, "widget");
	    if (typeof widget == "string") {
	      var text = document.createTextNode(widget);
	      widget = document.createElement("span");
	      widget.appendChild(text);
	      widget.className = "CodeMirror-foldmarker";
	    }
	    return widget;
	  }
	
	  // Clumsy backwards-compatible interface
	  CodeMirror.newFoldFunction = function(rangeFinder, widget) {
	    return function(cm, pos) { doFold(cm, pos, {rangeFinder: rangeFinder, widget: widget}); };
	  };
	
	  // New-style interface
	  CodeMirror.defineExtension("foldCode", function(pos, options, force) {
	    doFold(this, pos, options, force);
	  });
	
	  CodeMirror.defineExtension("isFolded", function(pos) {
	    var marks = this.findMarksAt(pos);
	    for (var i = 0; i < marks.length; ++i)
	      if (marks[i].__isFold) return true;
	  });
	
	  CodeMirror.commands.toggleFold = function(cm) {
	    cm.foldCode(cm.getCursor());
	  };
	  CodeMirror.commands.fold = function(cm) {
	    cm.foldCode(cm.getCursor(), null, "fold");
	  };
	  CodeMirror.commands.unfold = function(cm) {
	    cm.foldCode(cm.getCursor(), null, "unfold");
	  };
	  CodeMirror.commands.foldAll = function(cm) {
	    cm.operation(function() {
	      for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
	        cm.foldCode(CodeMirror.Pos(i, 0), null, "fold");
	    });
	  };
	  CodeMirror.commands.unfoldAll = function(cm) {
	    cm.operation(function() {
	      for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
	        cm.foldCode(CodeMirror.Pos(i, 0), null, "unfold");
	    });
	  };
	
	  CodeMirror.registerHelper("fold", "combine", function() {
	    var funcs = Array.prototype.slice.call(arguments, 0);
	    return function(cm, start) {
	      for (var i = 0; i < funcs.length; ++i) {
	        var found = funcs[i](cm, start);
	        if (found) return found;
	      }
	    };
	  });
	
	  CodeMirror.registerHelper("fold", "auto", function(cm, start) {
	    var helpers = cm.getHelpers(start, "fold");
	    for (var i = 0; i < helpers.length; i++) {
	      var cur = helpers[i](cm, start);
	      if (cur) return cur;
	    }
	  });
	
	  var defaultOptions = {
	    rangeFinder: CodeMirror.fold.auto,
	    widget: "\u2194",
	    minFoldSize: 0,
	    scanUp: false
	  };
	
	  CodeMirror.defineOption("foldOptions", null);
	
	  function getOption(cm, options, name) {
	    if (options && options[name] !== undefined)
	      return options[name];
	    var editorOptions = cm.options.foldOptions;
	    if (editorOptions && editorOptions[name] !== undefined)
	      return editorOptions[name];
	    return defaultOptions[name];
	  }
	
	  CodeMirror.defineExtension("foldOption", function(options, name) {
	    return getOption(this, options, name);
	  });
	});


/***/ },

/***/ "./node_modules/codemirror/addon/fold/brace-fold.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";
	
	CodeMirror.registerHelper("fold", "brace", function(cm, start) {
	  var line = start.line, lineText = cm.getLine(line);
	  var startCh, tokenType;
	
	  function findOpening(openCh) {
	    for (var at = start.ch, pass = 0;;) {
	      var found = at <= 0 ? -1 : lineText.lastIndexOf(openCh, at - 1);
	      if (found == -1) {
	        if (pass == 1) break;
	        pass = 1;
	        at = lineText.length;
	        continue;
	      }
	      if (pass == 1 && found < start.ch) break;
	      tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
	      if (!/^(comment|string)/.test(tokenType)) return found + 1;
	      at = found - 1;
	    }
	  }
	
	  var startToken = "{", endToken = "}", startCh = findOpening("{");
	  if (startCh == null) {
	    startToken = "[", endToken = "]";
	    startCh = findOpening("[");
	  }
	
	  if (startCh == null) return;
	  var count = 1, lastLine = cm.lastLine(), end, endCh;
	  outer: for (var i = line; i <= lastLine; ++i) {
	    var text = cm.getLine(i), pos = i == line ? startCh : 0;
	    for (;;) {
	      var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
	      if (nextOpen < 0) nextOpen = text.length;
	      if (nextClose < 0) nextClose = text.length;
	      pos = Math.min(nextOpen, nextClose);
	      if (pos == text.length) break;
	      if (cm.getTokenTypeAt(CodeMirror.Pos(i, pos + 1)) == tokenType) {
	        if (pos == nextOpen) ++count;
	        else if (!--count) { end = i; endCh = pos; break outer; }
	      }
	      ++pos;
	    }
	  }
	  if (end == null || line == end && endCh == startCh) return;
	  return {from: CodeMirror.Pos(line, startCh),
	          to: CodeMirror.Pos(end, endCh)};
	});
	
	CodeMirror.registerHelper("fold", "import", function(cm, start) {
	  function hasImport(line) {
	    if (line < cm.firstLine() || line > cm.lastLine()) return null;
	    var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
	    if (!/\S/.test(start.string)) start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1));
	    if (start.type != "keyword" || start.string != "import") return null;
	    // Now find closing semicolon, return its position
	    for (var i = line, e = Math.min(cm.lastLine(), line + 10); i <= e; ++i) {
	      var text = cm.getLine(i), semi = text.indexOf(";");
	      if (semi != -1) return {startCh: start.end, end: CodeMirror.Pos(i, semi)};
	    }
	  }
	
	  var start = start.line, has = hasImport(start), prev;
	  if (!has || hasImport(start - 1) || ((prev = hasImport(start - 2)) && prev.end.line == start - 1))
	    return null;
	  for (var end = has.end;;) {
	    var next = hasImport(end.line + 1);
	    if (next == null) break;
	    end = next.end;
	  }
	  return {from: cm.clipPos(CodeMirror.Pos(start, has.startCh + 1)), to: end};
	});
	
	CodeMirror.registerHelper("fold", "include", function(cm, start) {
	  function hasInclude(line) {
	    if (line < cm.firstLine() || line > cm.lastLine()) return null;
	    var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
	    if (!/\S/.test(start.string)) start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1));
	    if (start.type == "meta" && start.string.slice(0, 8) == "#include") return start.start + 8;
	  }
	
	  var start = start.line, has = hasInclude(start);
	  if (has == null || hasInclude(start - 1) != null) return null;
	  for (var end = start;;) {
	    var next = hasInclude(end + 1);
	    if (next == null) break;
	    ++end;
	  }
	  return {from: CodeMirror.Pos(start, has + 1),
	          to: cm.clipPos(CodeMirror.Pos(end))};
	});
	
	});


/***/ },

/***/ "./src/components/visualization/Tree.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _defineProperty = __webpack_require__("./node_modules/babel-runtime/helpers/define-property.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _astElement = __webpack_require__("./src/components/ast/Element.js");
	
	var _astElement2 = _interopRequireDefault(_astElement);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pubsubJs = __webpack_require__("./node_modules/pubsub-js/src/pubsub.js");
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	__webpack_require__("./src/components/visualization/css/tree.css");
	
	var ID = 'tree';
	
	var Tree = (function (_React$Component) {
	  _inherits(Tree, _React$Component);
	
	  function Tree(props) {
	    _classCallCheck(this, Tree);
	
	    _get(Object.getPrototypeOf(Tree.prototype), 'constructor', this).call(this, props);
	
	    this.state = (0, _LocalStorage.getVisualizationSettings)(ID, { autofocus: true, hideFunctions: true });
	  }
	
	  _createClass(Tree, [{
	    key: '_setOption',
	    value: function _setOption(name, event) {
	      var _this = this;
	
	      this.setState(_defineProperty({}, name, event.target.checked), function () {
	        return (0, _LocalStorage.setVisualizationSettings)(ID, _this.state);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: 'tree-visualization container' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'toolbar' },
	          _react2['default'].createElement(
	            'label',
	            { title: 'Auto open the node at the cursor in the source code' },
	            _react2['default'].createElement('input', {
	              type: 'checkbox',
	              checked: this.state.autofocus,
	              onChange: this._setOption.bind(this, 'autofocus')
	            }),
	            'Autofocus'
	          ),
	          _react2['default'].createElement(
	            'label',
	            null,
	            _react2['default'].createElement('input', {
	              type: 'checkbox',
	              checked: this.state.hideFunctions,
	              onChange: this._setOption.bind(this, 'hideFunctions')
	            }),
	            'Hide methods'
	          ),
	          _react2['default'].createElement(
	            'label',
	            null,
	            _react2['default'].createElement('input', {
	              type: 'checkbox',
	              checked: this.state.hideEmptyKeys,
	              onChange: this._setOption.bind(this, 'hideEmptyKeys')
	            }),
	            'Hide empty keys'
	          ),
	          _react2['default'].createElement(
	            'label',
	            null,
	            _react2['default'].createElement('input', {
	              type: 'checkbox',
	              checked: this.state.hideLocationData,
	              onChange: this._setOption.bind(this, 'hideLocationData')
	            }),
	            'Hide location data'
	          )
	        ),
	        _react2['default'].createElement(
	          'ul',
	          { onMouseLeave: function () {
	              _pubsubJs2['default'].publish('CLEAR_HIGHLIGHT');
	            } },
	          _react2['default'].createElement(_astElement2['default'], {
	            focusPath: this.props.focusPath,
	            value: this.props.ast,
	            level: 0,
	            parser: this.props.parser,
	            settings: this.state
	          })
	        )
	      );
	    }
	  }]);
	
	  return Tree;
	})(_react2['default'].Component);
	
	exports['default'] = Tree;
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/babel-runtime/helpers/define-property.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$defineProperty = __webpack_require__("./node_modules/babel-runtime/core-js/object/define-property.js")["default"];
	
	exports["default"] = function (obj, key, value) {
	  if (key in obj) {
	    _Object$defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};
	
	exports.__esModule = true;

/***/ },

/***/ "./src/components/ast/Element.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _toConsumableArray = __webpack_require__("./node_modules/babel-runtime/helpers/to-consumable-array.js")['default'];
	
	var _Number$isInteger = __webpack_require__("./node_modules/babel-runtime/core-js/number/is-integer.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _CompactArrayView = __webpack_require__("./src/components/ast/CompactArrayView.js");
	
	var _CompactArrayView2 = _interopRequireDefault(_CompactArrayView);
	
	var _CompactObjectView = __webpack_require__("./src/components/ast/CompactObjectView.js");
	
	var _CompactObjectView2 = _interopRequireDefault(_CompactObjectView);
	
	var _pubsubJs = __webpack_require__("./node_modules/pubsub-js/src/pubsub.js");
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RecursiveTreeElement = __webpack_require__("./src/components/ast/RecursiveTreeElement.js");
	
	var _RecursiveTreeElement2 = _interopRequireDefault(_RecursiveTreeElement);
	
	var _classnames = __webpack_require__("./node_modules/classnames/index.js");
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _utilsStringify = __webpack_require__("./src/utils/stringify.js");
	
	var _utilsStringify2 = _interopRequireDefault(_utilsStringify);
	
	var PropTypes = _react2['default'].PropTypes;
	
	/*
	// For debugging
	function log(f) {
	  return function(a, b) {
	    let result = f.call(this, a,b);
	    console.log(a.name, a.name || a.value && a.value.type, 'Updates', result);
	    return result;
	  };
	}
	*/
	
	var Element = (function (_React$Component) {
	  _inherits(Element, _React$Component);
	
	  _createClass(Element, null, [{
	    key: 'propTypes',
	    value: {
	      name: PropTypes.string,
	      value: PropTypes.any.isRequired,
	      computed: PropTypes.bool,
	      deepOpen: PropTypes.bool,
	      focusPath: PropTypes.array.isRequired,
	      level: PropTypes.number,
	      parser: PropTypes.object.isRequired,
	      settings: PropTypes.object.isRequired,
	      parent: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
	    },
	    enumerable: true
	  }]);
	
	  function Element(props, context) {
	    _classCallCheck(this, _Element);
	
	    _get(Object.getPrototypeOf(_Element.prototype), 'constructor', this).call(this, props, context);
	    this._execFunction = this._execFunction.bind(this);
	    this._onMouseLeave = this._onMouseLeave.bind(this);
	    this._onMouseOver = this._onMouseOver.bind(this);
	    this._toggleClick = this._toggleClick.bind(this);
	    var value = props.value;
	    var name = props.name;
	    var deepOpen = props.deepOpen;
	    var parser = props.parser;
	
	    // Some elements should be open by default
	    var open = props.open || props.level === 0 || deepOpen || !!value && parser.opensByDefault(value, name);
	
	    this.state = {
	      open: open,
	      deepOpen: deepOpen,
	      value: value
	    };
	  }
	
	  _createClass(Element, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.setState({
	        open: nextProps.open || nextProps.deepOpen || this.state.open,
	        deepOpen: nextProps.deepOpen,
	        value: nextProps.value
	      });
	    }
	  }, {
	    key: '_shouldAutoFocus',
	    value: function _shouldAutoFocus(thisProps, nextProps) {
	      var thisFocusPath = thisProps.focusPath;
	      var nextSettings = nextProps.settings;
	      var nextFocusPath = nextProps.focusPath;
	
	      return thisFocusPath !== nextFocusPath && nextFocusPath.indexOf(nextProps.value) > -1 && nextSettings.autofocus;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.settings.autofocus) {
	        this._scrollIntoView();
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (this._shouldAutoFocus(prevProps, this.props)) {
	        this._scrollIntoView();
	      }
	    }
	  }, {
	    key: '_scrollIntoView',
	    value: function _scrollIntoView() {
	      var _this = this;
	
	      var _props = this.props;
	      var focusPath = _props.focusPath;
	      var value = _props.value;
	
	      if (focusPath.length > 0 && focusPath[focusPath.length - 1] === value) {
	        setTimeout(function () {
	          var node = _react2['default'].findDOMNode(_this);
	          node.scrollIntoView();
	        }, 0);
	      }
	    }
	  }, {
	    key: '_toggleClick',
	    value: function _toggleClick(event) {
	      // Make AST node accessible
	      global.$node = this.state.value;
	
	      this.setState({
	        open: event.shiftKey || !this.state.open,
	        deepOpen: event.shiftKey
	      });
	    }
	  }, {
	    key: '_onMouseOver',
	    value: function _onMouseOver(e) {
	      e.stopPropagation();
	      _pubsubJs2['default'].publish('HIGHLIGHT', this.state.value);
	    }
	  }, {
	    key: '_onMouseLeave',
	    value: function _onMouseLeave() {
	      _pubsubJs2['default'].publish('CLEAR_HIGHLIGHT', this.state.value);
	    }
	  }, {
	    key: '_isFocused',
	    value: function _isFocused(level, path, value, open) {
	      return level !== 0 && path.indexOf(value) > -1 && (!open || path[path.length - 1] === value);
	    }
	  }, {
	    key: '_getProperties',
	    value: function _getProperties(parser, value) {
	      var _props$settings = this.props.settings;
	      var hideFunctions = _props$settings.hideFunctions;
	      var hideEmptyKeys = _props$settings.hideEmptyKeys;
	      var hideLocationData = _props$settings.hideLocationData;
	
	      var properties = [].concat(_toConsumableArray(parser.forEachProperty(value)));
	      return properties.filter(function (_ref) {
	        var value = _ref.value;
	        return !hideFunctions || typeof value !== 'function';
	      }).filter(function (_ref2) {
	        var value = _ref2.value;
	        return !hideEmptyKeys || value != null;
	      }).filter(function (_ref3) {
	        var key = _ref3.key;
	        return !hideLocationData || !parser.locationProps.has(key);
	      });
	    }
	  }, {
	    key: '_execFunction',
	    value: function _execFunction() {
	      var state = { error: null };
	      try {
	        state.value = this.state.value.call(this.props.parent);
	        console.log(state.value);
	      } catch (err) {
	        console.error('Unable to run "' + this.props.name + '": ', err.message);
	        state.error = err;
	      }
	      this.setState(state);
	    }
	  }, {
	    key: '_createSubElement',
	    value: function _createSubElement(key, value, name, computed) {
	      return _react2['default'].createElement(Element, {
	        key: key,
	        name: name,
	        focusPath: this.props.focusPath,
	        deepOpen: this.state.deepOpen,
	        value: value,
	        computed: computed,
	        level: this.props.level + 1,
	        parser: this.props.parser,
	        settings: this.props.settings,
	        parent: value
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props2 = this.props;
	      var focusPath = _props2.focusPath;
	      var parser = _props2.parser;
	      var level = _props2.level;
	      var _state = this.state;
	      var open = _state.open;
	      var value = _state.value;
	
	      var focused = this._isFocused(level, focusPath, value, open);
	      var valueOutput = null;
	      var content = null;
	      var prefix = null;
	      var suffix = null;
	      var showToggler = false;
	      var enableHighlight = false;
	
	      if (value && typeof value === 'object') {
	        if (!Array.isArray(value)) {
	          var nodeName = parser.getNodeName(value);
	          if (nodeName) {
	            valueOutput = _react2['default'].createElement(
	              'span',
	              { className: 'tokenName nc', onClick: this._toggleClick },
	              nodeName
	            );
	          }
	          enableHighlight = parser.nodeToRange(value) && level !== 0;
	        } else {
	          enableHighlight = true;
	        }
	
	        if (typeof value.length === 'number') {
	          if (value.length > 0 && open) {
	            prefix = '[';
	            suffix = ']';
	            var elements = this._getProperties(parser, value).filter(function (_ref4) {
	              var key = _ref4.key;
	              return key !== 'length';
	            }).map(function (_ref5) {
	              var key = _ref5.key;
	              var value = _ref5.value;
	              var computed = _ref5.computed;
	              return _this2._createSubElement(key, value, _Number$isInteger(+key) ? undefined : key, computed);
	            });
	            content = _react2['default'].createElement(
	              'ul',
	              { className: 'value-body' },
	              elements
	            );
	          } else {
	            valueOutput = _react2['default'].createElement(
	              'span',
	              null,
	              valueOutput,
	              _react2['default'].createElement(_CompactArrayView2['default'], {
	                array: value,
	                onClick: this._toggleClick
	              })
	            );
	          }
	          showToggler = value.length > 0;
	        } else {
	          if (open) {
	            prefix = '{';
	            suffix = '}';
	            var elements = this._getProperties(parser, value).map(function (_ref6) {
	              var key = _ref6.key;
	              var value = _ref6.value;
	              var computed = _ref6.computed;
	              return _this2._createSubElement(key, value, key, computed);
	            });
	            content = _react2['default'].createElement(
	              'ul',
	              { className: 'value-body' },
	              elements
	            );
	            showToggler = elements.length > 0;
	          } else {
	            var keys = this._getProperties(parser, value).map(function (_ref7) {
	              var key = _ref7.key;
	              return key;
	            });
	            valueOutput = _react2['default'].createElement(
	              'span',
	              null,
	              valueOutput,
	              _react2['default'].createElement(_CompactObjectView2['default'], {
	                onClick: this._toggleClick,
	                keys: keys
	              })
	            );
	            showToggler = keys.length > 0;
	          }
	        }
	      } else {
	        valueOutput = _react2['default'].createElement(
	          'span',
	          { className: 's' },
	          (0, _utilsStringify2['default'])(value)
	        );
	        showToggler = false;
	      }
	
	      var name = this.props.name ? _react2['default'].createElement(
	        'span',
	        {
	          className: 'key',
	          onClick: showToggler ? this._toggleClick : typeof value === 'function' ? this._execFunction : null },
	        _react2['default'].createElement(
	          'span',
	          { className: 'name nb' },
	          this.props.computed ? _react2['default'].createElement(
	            'span',
	            { title: 'computed' },
	            '*',
	            this.props.name
	          ) : this.props.name
	        ),
	        _react2['default'].createElement(
	          'span',
	          { className: 'p' },
	          ': '
	        )
	      ) : null;
	
	      var classNames = (0, _classnames2['default'])({
	        entry: true,
	        focused: focused,
	        toggable: showToggler,
	        open: open,
	        func: typeof value === 'function'
	      });
	      return _react2['default'].createElement(
	        'li',
	        {
	          ref: 'container',
	          className: classNames,
	          onMouseOver: enableHighlight ? this._onMouseOver : null,
	          onMouseLeave: enableHighlight ? this._onMouseLeave : null },
	        name,
	        _react2['default'].createElement(
	          'span',
	          {
	            className: 'value',
	            onClick: typeof value === 'function' ? this._execFunction : null },
	          valueOutput
	        ),
	        prefix ? _react2['default'].createElement(
	          'span',
	          { className: 'prefix p' },
	          ' ',
	          prefix
	        ) : null,
	        content,
	        suffix ? _react2['default'].createElement(
	          'div',
	          { className: 'suffix p' },
	          suffix
	        ) : null,
	        this.state.error ? _react2['default'].createElement(
	          'span',
	          null,
	          ' ',
	          _react2['default'].createElement('i', {
	            title: this.state.error.message,
	            className: 'fa fa-exclamation-triangle'
	          })
	        ) : null
	      );
	    }
	  }]);
	
	  var _Element = Element;
	  Element = (0, _RecursiveTreeElement2['default'])(Element) || Element;
	  return Element;
	})(_react2['default'].Component);
	
	exports['default'] = Element;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-runtime/helpers/to-consumable-array.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Array$from = __webpack_require__("./node_modules/babel-runtime/core-js/array/from.js")["default"];
	
	exports["default"] = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
	
	    return arr2;
	  } else {
	    return _Array$from(arr);
	  }
	};
	
	exports.__esModule = true;

/***/ },

/***/ "./node_modules/babel-runtime/core-js/array/from.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/array/from.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/array/from.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.array.from.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").Array.from;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.array.from.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx         = __webpack_require__("./node_modules/core-js/library/modules/$.ctx.js")
	  , $export     = __webpack_require__("./node_modules/core-js/library/modules/$.export.js")
	  , toObject    = __webpack_require__("./node_modules/core-js/library/modules/$.to-object.js")
	  , call        = __webpack_require__("./node_modules/core-js/library/modules/$.iter-call.js")
	  , isArrayIter = __webpack_require__("./node_modules/core-js/library/modules/$.is-array-iter.js")
	  , toLength    = __webpack_require__("./node_modules/core-js/library/modules/$.to-length.js")
	  , getIterFn   = __webpack_require__("./node_modules/core-js/library/modules/core.get-iterator-method.js");
	$export($export.S + $export.F * !__webpack_require__("./node_modules/core-js/library/modules/$.iter-detect.js")(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , $$      = arguments
	      , $$len   = $$.length
	      , mapfn   = $$len > 1 ? $$[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        result[index] = mapping ? mapfn(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },

/***/ "./node_modules/babel-runtime/core-js/number/is-integer.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/number/is-integer.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/number/is-integer.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.number.is-integer.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").Number.isInteger;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.number.is-integer.js":
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__("./node_modules/core-js/library/modules/$.export.js");
	
	$export($export.S, 'Number', {isInteger: __webpack_require__("./node_modules/core-js/library/modules/$.is-integer.js")});

/***/ },

/***/ "./node_modules/core-js/library/modules/$.is-integer.js":
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__("./node_modules/core-js/library/modules/$.is-object.js")
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },

/***/ "./src/components/ast/CompactArrayView.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")["default"];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")["default"];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")["default"];
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var CompactArrayView = (function () {
	  function CompactArrayView() {
	    _classCallCheck(this, CompactArrayView);
	  }
	
	  _createClass(CompactArrayView, [{
	    key: "shouldComponentUpdate",
	    value: function shouldComponentUpdate(nextProps) {
	      return nextProps.array.length !== this.props.array.length;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var array = this.props.array;
	
	      var count = array.length;
	
	      if (count === 0) {
	        return _react2["default"].createElement(
	          "span",
	          { className: "p" },
	          "[ ]"
	        );
	      } else {
	        return _react2["default"].createElement(
	          "span",
	          null,
	          _react2["default"].createElement(
	            "span",
	            { className: "p" },
	            "["
	          ),
	          _react2["default"].createElement(
	            "span",
	            { className: "compact placeholder ge", onClick: this.props.onClick },
	            count + ' element' + (count > 1 ? 's' : '')
	          ),
	          _react2["default"].createElement(
	            "span",
	            { className: "p" },
	            "]"
	          )
	        );
	      }
	    }
	  }], [{
	    key: "propTypes",
	    value: {
	      /**
	       * The array of elements to represent.
	       */
	      array: _react2["default"].PropTypes.shape({ length: _react2["default"].PropTypes.number }).isRequired,
	      onClick: _react2["default"].PropTypes.func
	    },
	    enumerable: true
	  }]);
	
	  return CompactArrayView;
	})();
	
	exports["default"] = CompactArrayView;
	module.exports = exports["default"];

/***/ },

/***/ "./src/components/ast/CompactObjectView.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")["default"];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")["default"];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")["default"];
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var CompactObjectView = (function () {
	  function CompactObjectView() {
	    _classCallCheck(this, CompactObjectView);
	  }
	
	  _createClass(CompactObjectView, [{
	    key: "render",
	    value: function render() {
	      var keys = this.props.keys;
	
	      if (keys.length === 0) {
	        return _react2["default"].createElement(
	          "span",
	          { className: "p" },
	          "{ }"
	        );
	      } else {
	        if (keys.length > 5) {
	          keys = keys.slice(0, 5).concat(["... +" + (keys.length - 5)]);
	        }
	        return _react2["default"].createElement(
	          "span",
	          null,
	          _react2["default"].createElement(
	            "span",
	            { className: "p" },
	            " {"
	          ),
	          _react2["default"].createElement(
	            "span",
	            { className: "compact placeholder ge", onClick: this.props.onClick },
	            keys.join(', ')
	          ),
	          _react2["default"].createElement(
	            "span",
	            { className: "p" },
	            "}"
	          )
	        );
	      }
	    }
	  }]);
	
	  return CompactObjectView;
	})();
	
	exports["default"] = CompactObjectView;
	module.exports = exports["default"];

/***/ },

/***/ "./src/components/ast/RecursiveTreeElement.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _WeakMap = __webpack_require__("./node_modules/babel-runtime/core-js/weak-map.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = RecursiveTreeElement;
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	function shouldAutoFocus(_ref) {
	  var value = _ref.value;
	  var settings = _ref.settings;
	  var focusPath = _ref.focusPath;
	
	  return !!settings.autofocus && focusPath.indexOf(value) > -1;
	}
	
	/**
	 * This is a higher order component the prevents infinite recursion when opening
	 * the element tree.
	 */
	
	function RecursiveTreeElement(Element) {
	  var openValues = new _WeakMap();
	
	  function addValue(value) {
	    if (openValues.has(value)) {
	      openValues.set(value, openValues.get(value) + 1);
	    } else {
	      openValues.set(value, 1);
	    }
	  }
	
	  function removeValue(value) {
	    var n = openValues.get(value) - 1;
	    if (n === 0) {
	      openValues['delete'](value);
	    } else {
	      openValues.set(value, n);
	    }
	  }
	
	  return (function (_React$Component) {
	    _inherits(_class, _React$Component);
	
	    function _class(props) {
	      _classCallCheck(this, _class);
	
	      _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props);
	      var deepOpen = props.deepOpen;
	
	      var open = shouldAutoFocus(props);
	      if (props.value && typeof props.value === 'object') {
	        if (openValues.has(props.value)) {
	          deepOpen = false;
	          open = false;
	        }
	        addValue(props.value);
	      }
	      this.state = { deepOpen: deepOpen, open: open };
	    }
	
	    _createClass(_class, [{
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        var value = this.props.value;
	
	        if (value && typeof value === 'object') {
	          removeValue(value);
	        }
	      }
	    }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(props) {
	        var deepOpen = props.deepOpen;
	
	        var open = shouldAutoFocus(props);
	        if (!this.props.value !== props.value) {
	          if (this.props.value && typeof this.props.value === 'object') {
	            removeValue(this.props.value);
	          }
	          if (props.value && typeof props.value === 'object') {
	            if (openValues.has(props.value)) {
	              deepOpen = false;
	              open = false;
	            }
	            addValue(props.value);
	          }
	        }
	        this.setState({ deepOpen: deepOpen, open: open });
	      }
	    }, {
	      key: 'render',
	      value: function render() {
	        var props = this.props;
	
	        return _react2['default'].createElement(Element, _extends({}, props, {
	          open: this.state.open,
	          deepOpen: this.state.deepOpen
	        }));
	      }
	    }]);
	
	    return _class;
	  })(_react2['default'].Component);
	}
	
	module.exports = exports['default'];

/***/ },

/***/ "./src/utils/stringify.js":
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Converts a JS value to a sensible string representation.
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = stringify;
	
	function stringify(value) {
	  switch (typeof value) {
	    case 'function':
	      return value.toString().match(/function[^(]*\([^)]*\)/)[0];
	    case 'object':
	      return value ? JSON.stringify(value, stringify) : 'null';
	    case 'undefined':
	      return 'undefined';
	    case 'number':
	      return global.isNaN(value) ? 'NaN' : value;
	    default:
	      return JSON.stringify(value);
	  }
	}
	
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./src/LocalStorage.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _Object$assign = __webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getParser = getParser;
	exports.setParser = setParser;
	exports.getCategory = getCategory;
	exports.setCategory = setCategory;
	exports.getParserSettings = getParserSettings;
	exports.setParserSettings = setParserSettings;
	exports.setVisualizationSettings = setVisualizationSettings;
	exports.getVisualizationSettings = getVisualizationSettings;
	var storage = global.localStorage;
	var defaultConfig = {
	  parser: {},
	  parserSettings: {},
	  visualizationSettings: {},
	  category: 'javascript'
	};
	
	var config = storage ? JSON.parse(storage.getItem('explorerSettings') || '0') || {} : {};
	
	config = _Object$assign(defaultConfig, config);
	
	var writeConfig = storage ? function () {
	  return storage.setItem('explorerSettings', JSON.stringify(config));
	} : function () {};
	
	// Upgrade local storage
	// Since the introduction of categories, we save the last used parser per
	// category.
	var _config = config;
	var parser = _config.parser;
	
	if (parser == null || typeof parser === 'string') {
	  config.parser = {};
	  writeConfig();
	}
	
	function getParser(category) {
	  return config.parser[category || getCategory()];
	}
	
	function setParser(parser) {
	  config.parser[parser.category.id] = parser.id;
	  writeConfig();
	}
	
	function getCategory() {
	  return config.category;
	}
	
	function setCategory(category) {
	  config.category = category;
	  writeConfig();
	}
	
	function getParserSettings(parser) {
	  return config.parserSettings[parser] || {};
	}
	
	function setParserSettings(parser, settings) {
	  config.parserSettings[parser] = settings;
	  writeConfig();
	}
	
	function setVisualizationSettings(visualization, settings) {
	  config.visualizationSettings[visualization] = settings;
	  writeConfig();
	}
	
	function getVisualizationSettings(visualization, def) {
	  return config.visualizationSettings[visualization] || def || {};
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./src/components/visualization/css/tree.css":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "./src/Editor.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _slicedToArray = __webpack_require__("./node_modules/babel-runtime/helpers/sliced-to-array.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _codemirror = __webpack_require__("./node_modules/codemirror/lib/codemirror.js");
	
	var _codemirror2 = _interopRequireDefault(_codemirror);
	
	var _pubsubJs = __webpack_require__("./node_modules/pubsub-js/src/pubsub.js");
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var Editor = (function (_React$Component) {
	  _inherits(Editor, _React$Component);
	
	  function Editor() {
	    _classCallCheck(this, Editor);
	
	    _get(Object.getPrototypeOf(Editor.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Editor, [{
	    key: 'getValue',
	    value: function getValue() {
	      return this.codeMirror && this.codeMirror.getValue();
	    }
	  }, {
	    key: '_getErrorLine',
	    value: function _getErrorLine(error) {
	      return error.loc ? error.loc.line : error.lineNumber || error.line;
	    }
	  }, {
	    key: '_setError',
	    value: function _setError(error) {
	      if (this.codeMirror) {
	        var oldError = this.props.error;
	        if (oldError) {
	          var lineNumber = this._getErrorLine(oldError);
	          if (lineNumber) {
	            this.codeMirror.removeLineClass(lineNumber - 1, 'text', 'errorMarker');
	          }
	        }
	
	        if (error) {
	          var lineNumber = this._getErrorLine(error);
	          if (lineNumber) {
	            this.codeMirror.addLineClass(lineNumber - 1, 'text', 'errorMarker');
	          }
	        }
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.defaultValue !== this.props.defaultValue) {
	        this.codeMirror.setValue(nextProps.defaultValue);
	      }
	      if (nextProps.mode !== this.props.mode) {
	        this.codeMirror.setOption('mode', nextProps.mode);
	      }
	      this._setError(nextProps.error);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return false;
	    }
	  }, {
	    key: '_posFromIndex',
	    value: function _posFromIndex(doc, index) {
	      return (this.props.posFromIndex ? this.props : doc).posFromIndex(index);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      this._CMHandlers = [];
	      this._subscriptions = [];
	      this.codeMirror = (0, _codemirror2['default'])( // eslint-disable-line new-cap
	      _react2['default'].findDOMNode(this.refs.container), {
	        value: this.props.defaultValue,
	        mode: this.props.mode,
	        lineNumbers: this.props.lineNumbers,
	        readOnly: this.props.readOnly
	      });
	
	      if (this.props.onContentChange) {
	        this._onContentChange();
	      }
	
	      this._bindCMHandler('changes', function () {
	        clearTimeout(_this._updateTimer);
	        _this._updateTimer = setTimeout(_this._onContentChange.bind(_this), 200);
	      });
	      this._bindCMHandler('cursorActivity', function () {
	        clearTimeout(_this._updateTimer);
	        _this._updateTimer = setTimeout(_this._onActivity.bind(_this), 100);
	      });
	
	      this._subscriptions.push(_pubsubJs2['default'].subscribe('PANEL_RESIZE', function () {
	        if (_this.codeMirror) {
	          _this.codeMirror.refresh();
	        }
	      }));
	
	      if (this.props.highlight) {
	        this._markerRange = null;
	        this._mark = null;
	        this._subscriptions.push(_pubsubJs2['default'].subscribe('CM.HIGHLIGHT', function (_, range) {
	          var doc = _this.codeMirror.getDoc();
	          _this._markerRange = range;
	          // We only want one mark at a time.
	          if (_this._mark) {
	            _this._mark.clear();
	          }
	
	          var _range$map = range.map(function (index) {
	            return _this._posFromIndex(doc, index);
	          });
	
	          var _range$map2 = _slicedToArray(_range$map, 2);
	
	          var start = _range$map2[0];
	          var end = _range$map2[1];
	
	          if (!start || !end) {
	            _this._markerRange = _this._mark = null;
	            return;
	          }
	          _this._mark = _this.codeMirror.markText(start, end, { className: 'marked' });
	        }), _pubsubJs2['default'].subscribe('CM.CLEAR_HIGHLIGHT', function (_, range) {
	          if (!range || _this._markerRange && range[0] === _this._markerRange[0] && range[1] === _this._markerRange[1]) {
	            _this._markerRange = null;
	            if (_this._mark) {
	              _this._mark.clear();
	              _this._mark = null;
	            }
	          }
	        }));
	      }
	
	      if (this.props.error) {
	        this._setError(this.props.error);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._unbindHandlers();
	      this._markerRange = null;
	      this._mark = null;
	      var container = this.refs.container.getDOMNode();
	      container.removeChild(container.children[0]);
	      this.codeMirror = null;
	    }
	  }, {
	    key: '_bindCMHandler',
	    value: function _bindCMHandler(event, handler) {
	      this._CMHandlers.push(event, handler);
	      this.codeMirror.on(event, handler);
	    }
	  }, {
	    key: '_unbindHandlers',
	    value: function _unbindHandlers() {
	      var cmHandlers = this._CMHandlers;
	      for (var i = 0; i < cmHandlers.length; i += 2) {
	        this.codeMirror.off(cmHandlers[i], cmHandlers[i + 1]);
	      }
	      this._subscriptions.forEach(function (token) {
	        _pubsubJs2['default'].unsubscribe(token);
	      });
	    }
	  }, {
	    key: '_onContentChange',
	    value: function _onContentChange() {
	      var doc = this.codeMirror.getDoc();
	      this.props.onContentChange({
	        value: doc.getValue(),
	        cursor: doc.indexFromPos(doc.getCursor())
	      });
	    }
	  }, {
	    key: '_onActivity',
	    value: function _onActivity() {
	      this.props.onActivity(this.codeMirror.getDoc().indexFromPos(this.codeMirror.getCursor()));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('div', { className: 'editor', ref: 'container' });
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      defaultValue: _react2['default'].PropTypes.string,
	      highlight: _react2['default'].PropTypes.bool,
	      lineNumbers: _react2['default'].PropTypes.bool,
	      readOnly: _react2['default'].PropTypes.bool,
	      onContentChange: _react2['default'].PropTypes.func,
	      onActivity: _react2['default'].PropTypes.func,
	      posFromIndex: _react2['default'].PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      highlight: true,
	      lineNumbers: true,
	      readOnly: false,
	      mode: 'javascript',
	      onContentChange: function onContentChange() {},
	      onActivity: function onActivity() {}
	    },
	    enumerable: true
	  }]);
	
	  return Editor;
	})(_react2['default'].Component);
	
	exports['default'] = Editor;
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/babel-runtime/helpers/sliced-to-array.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _getIterator = __webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js")["default"];
	
	var _isIterable = __webpack_require__("./node_modules/babel-runtime/core-js/is-iterable.js")["default"];
	
	exports["default"] = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (_isIterable(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();
	
	exports.__esModule = true;

/***/ },

/***/ "./node_modules/babel-runtime/core-js/get-iterator.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/get-iterator.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/get-iterator.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/core.get-iterator.js");

/***/ },

/***/ "./node_modules/core-js/library/modules/core.get-iterator.js":
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__("./node_modules/core-js/library/modules/$.an-object.js")
	  , get      = __webpack_require__("./node_modules/core-js/library/modules/core.get-iterator-method.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/is-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/is-iterable.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/is-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/core.is-iterable.js");

/***/ },

/***/ "./node_modules/core-js/library/modules/core.is-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__("./node_modules/core-js/library/modules/$.classof.js")
	  , ITERATOR  = __webpack_require__("./node_modules/core-js/library/modules/$.wks.js")('iterator')
	  , Iterators = __webpack_require__("./node_modules/core-js/library/modules/$.iterators.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },

/***/ "./src/ErrorMessage.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")["default"];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")["default"];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")["default"];
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var ErrorMessage = (function () {
	  function ErrorMessage() {
	    _classCallCheck(this, ErrorMessage);
	  }
	
	  _createClass(ErrorMessage, [{
	    key: "render",
	    value: function render() {
	      return _react2["default"].createElement(
	        "div",
	        { id: "Error" },
	        this.props.message
	      );
	    }
	  }]);
	
	  return ErrorMessage;
	})();
	
	exports["default"] = ErrorMessage;
	module.exports = exports["default"];

/***/ },

/***/ "./src/JSCodeshiftEditor.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _codemirror = __webpack_require__("./node_modules/codemirror/lib/codemirror.js");
	
	var _codemirror2 = _interopRequireDefault(_codemirror);
	
	var _pubsubJs = __webpack_require__("./node_modules/pubsub-js/src/pubsub.js");
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	__webpack_require__("./node_modules/codemirror/addon/hint/show-hint.css");
	
	__webpack_require__("./node_modules/codemirror/addon/tern/tern.css");
	
	var server = undefined;
	
	var JSCodeshiftEditor = (function (_React$Component) {
	  _inherits(JSCodeshiftEditor, _React$Component);
	
	  _createClass(JSCodeshiftEditor, null, [{
	    key: 'propTypes',
	    value: {
	      defaultValue: _react2['default'].PropTypes.string,
	      onContentChange: _react2['default'].PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      onContentChange: function onContentChange() {},
	      onActivity: function onActivity() {}
	    },
	    enumerable: true
	  }]);
	
	  function JSCodeshiftEditor(props) {
	    _classCallCheck(this, JSCodeshiftEditor);
	
	    _get(Object.getPrototypeOf(JSCodeshiftEditor.prototype), 'constructor', this).call(this, props);
	    loadTern();
	  }
	
	  _createClass(JSCodeshiftEditor, [{
	    key: 'getValue',
	    value: function getValue() {
	      return this.codeMirror && this.codeMirror.getValue();
	    }
	  }, {
	    key: '_getErrorLine',
	    value: function _getErrorLine(error) {
	      return error.loc ? error.loc.line : error.lineNumber || error.line;
	    }
	  }, {
	    key: '_setError',
	    value: function _setError(error) {
	      if (this.codeMirror) {
	        var oldError = this.props.error;
	        if (oldError) {
	          var lineNumber = this._getErrorLine(oldError);
	          if (lineNumber) {
	            this.codeMirror.removeLineClass(lineNumber - 1, 'text', 'errorMarker');
	          }
	        }
	
	        if (error) {
	          var lineNumber = this._getErrorLine(error);
	          if (lineNumber) {
	            this.codeMirror.addLineClass(lineNumber - 1, 'text', 'errorMarker');
	          }
	        }
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.defaultValue !== this.props.defaultValue) {
	        this.codeMirror.setValue(nextProps.defaultValue);
	      }
	      if (nextProps.mode !== this.props.mode) {
	        this.codeMirror.setOption('mode', nextProps.mode);
	      }
	      this._setError(nextProps.error);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return false;
	    }
	  }, {
	    key: '_posFromIndex',
	    value: function _posFromIndex(doc, index) {
	      return (this.props.posFromIndex ? this.props : doc).posFromIndex(index);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      this._CMHandlers = [];
	      this._subscriptions = [];
	      this.codeMirror = (0, _codemirror2['default'])( // eslint-disable-line new-cap
	      _react2['default'].findDOMNode(this.refs.container), {
	        value: this.props.defaultValue,
	        mode: 'javascript',
	        lineNumbers: true
	      });
	      this.codeMirror.setOption("extraKeys", {
	        "Ctrl-Space": function CtrlSpace(cm) {
	          return server && server.complete(cm);
	        },
	        "Ctrl-I": function CtrlI(cm) {
	          return server && server.showType(cm);
	        },
	        "Ctrl-O": function CtrlO(cm) {
	          return server && server.showDocs(cm);
	        }
	      });
	
	      if (this.props.onContentChange) {
	        this._onContentChange();
	      }
	
	      this._bindCMHandler('changes', function () {
	        clearTimeout(_this._updateTimer);
	        _this._updateTimer = setTimeout(_this._onContentChange.bind(_this), 200);
	      });
	      this._bindCMHandler('cursorActivity', function (cm) {
	        clearTimeout(_this._updateTimer);
	        _this._updateTimer = setTimeout(_this._onActivity.bind(_this), 100);
	        server && server.updateArgHints(cm);
	      });
	
	      this._subscriptions.push(_pubsubJs2['default'].subscribe('PANEL_RESIZE', function () {
	        if (_this.codeMirror) {
	          _this.codeMirror.refresh();
	        }
	      }));
	
	      if (this.props.error) {
	        this._setError(this.props.error);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._unbindHandlers();
	      this._markerRange = null;
	      this._mark = null;
	      var container = this.refs.container.getDOMNode();
	      container.removeChild(container.children[0]);
	      this.codeMirror = null;
	    }
	  }, {
	    key: '_bindCMHandler',
	    value: function _bindCMHandler(event, handler) {
	      this._CMHandlers.push(event, handler);
	      this.codeMirror.on(event, handler);
	    }
	  }, {
	    key: '_unbindHandlers',
	    value: function _unbindHandlers() {
	      var cmHandlers = this._CMHandlers;
	      for (var i = 0; i < cmHandlers.length; i += 2) {
	        this.codeMirror.off(cmHandlers[i], cmHandlers[i + 1]);
	      }
	      this._subscriptions.forEach(function (token) {
	        _pubsubJs2['default'].unsubscribe(token);
	      });
	    }
	  }, {
	    key: '_onContentChange',
	    value: function _onContentChange() {
	      var doc = this.codeMirror.getDoc();
	      this.props.onContentChange({
	        value: doc.getValue(),
	        cursor: doc.indexFromPos(doc.getCursor())
	      });
	    }
	  }, {
	    key: '_onActivity',
	    value: function _onActivity() {
	      this.props.onActivity(this.codeMirror.getDoc().indexFromPos(this.codeMirror.getCursor()));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('div', { className: 'editor', ref: 'container' });
	    }
	  }]);
	
	  return JSCodeshiftEditor;
	})(_react2['default'].Component);
	
	exports['default'] = JSCodeshiftEditor;
	
	function loadTern() {
	  (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/codemirror/addon/hint/show-hint.js"), __webpack_require__("./node_modules/codemirror/addon/tern/tern.js"), __webpack_require__("./node_modules/acorn/dist/acorn.js")]; (function (_1, _2, acorn) {
	    global.acorn = acorn;
	    __webpack_require__.e/* require */(2, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/tern/lib/tern.js"), __webpack_require__("./node_modules/tern/plugin/doc_comment.js"), __webpack_require__("./node_modules/tern/lib/infer.js"), __webpack_require__("./src/defs/jscodeshift.json"), __webpack_require__("./node_modules/tern/defs/ecma5.json"), __webpack_require__("./node_modules/tern/defs/ecma6.json")]; (function (tern, _, infer, jscs_def, ecma5_def, ecma6_def) {
	      global.tern = tern;
	      tern.registerPlugin("transformer", function (server, options) {
	        server.on("afterLoad", function (file) {
	          var fnVal = file.scope.props.transformer;
	          if (fnVal) {
	            var fnType = fnVal.getFunctionType();
	            var cx = infer.cx();
	            fnType.propagate(new infer.IsCallee(infer.cx().topScope, [cx.definitions.jscodeshift.file, cx.definitions.jscodeshift.apiObject], null, infer.ANull));
	          }
	        });
	      });
	
	      server = new _codemirror2['default'].TernServer({
	        defs: [jscs_def, ecma6_def, ecma5_def],
	        plugins: {
	          transformer: { strong: true }
	        }
	      });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	  }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(1, __WEBPACK_CALLBACK__);}());
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/codemirror/addon/hint/show-hint.css":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "./node_modules/codemirror/addon/tern/tern.css":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "./src/PasteDropTarget.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _slicedToArray = __webpack_require__("./node_modules/babel-runtime/helpers/sliced-to-array.js")['default'];
	
	var _objectWithoutProperties = __webpack_require__("./node_modules/babel-runtime/helpers/object-without-properties.js")['default'];
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js")['default'];
	
	var _Map = __webpack_require__("./node_modules/babel-runtime/core-js/map.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _parsers = __webpack_require__("./src/parsers/index.js");
	
	function importEscodegen() {
	  return new _Promise(function (resolve) {
	    return (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/escodegen/escodegen.js")]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(23, __WEBPACK_CALLBACK__);}());
	  });
	}
	
	var acceptedFileTypes = new _Map([['application/json', 'JSON'], ['text/plain', 'TEXT']]);
	
	_parsers.categories.forEach(function (_ref) {
	  var id = _ref.id;
	  var mimeTypes = _ref.mimeTypes;
	
	  mimeTypes.forEach(function (mimeType) {
	    acceptedFileTypes.set(mimeType, id);
	  });
	});
	
	var PasteDropTarget = (function (_React$Component) {
	  _inherits(PasteDropTarget, _React$Component);
	
	  _createClass(PasteDropTarget, null, [{
	    key: 'propTypes',
	    value: {
	      dropindiciator: _react2['default'].PropTypes.element,
	      onText: _react2['default'].PropTypes.func,
	      onError: _react2['default'].PropTypes.func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      onError: function onError() {}
	    },
	    enumerable: true
	  }]);
	
	  function PasteDropTarget(props) {
	    _classCallCheck(this, PasteDropTarget);
	
	    _get(Object.getPrototypeOf(PasteDropTarget.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      dragging: false
	    };
	  }
	
	  _createClass(PasteDropTarget, [{
	    key: '_onASTError',
	    value: function _onASTError(type, event, ex) {
	      this.props.onError(type, event, 'Cannot process pasted AST: ' + ex.message);
	      throw ex;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      this._listeners = [];
	      var target = _react2['default'].findDOMNode(this.refs.container);
	
	      // Handle pastes
	      this._bindListener(document, 'paste', function (event) {
	        if (!event.clipboardData) {
	          // No browser support? :(
	          return;
	        }
	        var cbdata = event.clipboardData;
	        // Plain text
	        if (!cbdata.types.indexOf || !cbdata.types.indexOf('text/plain') > -1) {
	          return;
	        }
	        event.stopPropagation();
	        event.preventDefault();
	        _this._jsonToCode(cbdata.getData('text/plain')).then(function (code) {
	          return _this.props.onText('paste', event, code);
	        }, function (ex) {
	          if (event.target.nodeName !== 'TEXTAREA') {
	            _this._onASTError('paste', event, ex);
	          }
	        });
	      }, true);
	
	      var timer = undefined;
	
	      // Handle file drops
	      this._bindListener(target, 'dragenter', function (event) {
	        clearTimeout(timer);
	        event.preventDefault();
	        _this.setState({ dragging: true });
	      }, true);
	
	      this._bindListener(target, 'dragover', function (event) {
	        clearTimeout(timer);
	        event.preventDefault();
	        event.dataTransfer.dropEffect = 'copy';
	      }, true);
	
	      this._bindListener(target, 'drop', function (event) {
	        _this.setState({ dragging: false });
	        var file = event.dataTransfer.files[0];
	        var categoryId = acceptedFileTypes.get(file.type);
	        if (!categoryId || !_this.props.onText) {
	          return;
	        }
	        event.preventDefault();
	        event.stopPropagation();
	        var reader = new FileReader();
	        reader.onload = function (readerEvent) {
	          var text = readerEvent.target.result;
	          if (categoryId === 'JSON' || categoryId === 'TEXT') {
	            text = _this._jsonToCode(text).then(function (text) {
	              categoryId = 'javascript';
	              return text;
	            }, function (ex) {
	              if (categoryId === 'JSON') {
	                _this._onASTError('drop', readerEvent, ex);
	              } else {
	                categoryId = undefined;
	                return text;
	              }
	            });
	          }
	          _Promise.resolve(text).then(function (text) {
	            _this.props.onText('drop', readerEvent, text, categoryId);
	          });
	        };
	        reader.readAsText(file);
	      }, true);
	
	      this._bindListener(target, 'dragleave', function () {
	        clearTimeout(timer);
	        timer = setTimeout(function () {
	          return _this.setState({ dragging: false });
	        }, 50);
	      }, true);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      for (var i = 0; i < this._listeners.length; i += 4) {
	        var _listeners$i = _slicedToArray(this._listeners[i], 4);
	
	        var elem = _listeners$i[0];
	        var _event = _listeners$i[1];
	        var listener = _listeners$i[2];
	        var capture = _listeners$i[3];
	
	        elem.removeEventListener(_event, listener, capture);
	      }
	      this._listeners = null;
	    }
	  }, {
	    key: '_jsonToCode',
	    value: function _jsonToCode(json) {
	      var ast = JSON.parse(json);
	      return importEscodegen().then(function (escodegen) {
	        return escodegen.generate(ast, { format: { indent: { style: '  ' } } });
	      });
	    }
	  }, {
	    key: '_bindListener',
	    value: function _bindListener(elem, event, listener, capture) {
	      var _this2 = this;
	
	      event.split(/\s+/).forEach(function (e) {
	        elem.addEventListener(e, listener, capture);
	        _this2._listeners.push(elem, listener, capture);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	      var dropindicator = _props.dropindicator;
	
	      var props = _objectWithoutProperties(_props, ['children', 'dropindicator']);
	
	      if (!this.state.dragging) {
	        dropindicator = null;
	      }
	      return _react2['default'].createElement(
	        'div',
	        _extends({
	          ref: 'container'
	        }, props),
	        dropindicator,
	        children
	      );
	    }
	  }]);
	
	  return PasteDropTarget;
	})(_react2['default'].Component);
	
	exports['default'] = PasteDropTarget;
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/babel-runtime/helpers/object-without-properties.js":
/***/ function(module, exports) {

	"use strict";
	
	exports["default"] = function (obj, keys) {
	  var target = {};
	
	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }
	
	  return target;
	};
	
	exports.__esModule = true;

/***/ },

/***/ "./node_modules/babel-runtime/core-js/map.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/map.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/map.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js");
	__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.map.js");
	__webpack_require__("./node_modules/core-js/library/modules/es7.map.to-json.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").Map;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.map.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__("./node_modules/core-js/library/modules/$.collection-strong.js");
	
	// 23.1 Map Objects
	__webpack_require__("./node_modules/core-js/library/modules/$.collection.js")('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },

/***/ "./node_modules/core-js/library/modules/$.collection-strong.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__("./node_modules/core-js/library/modules/$.js")
	  , hide         = __webpack_require__("./node_modules/core-js/library/modules/$.hide.js")
	  , redefineAll  = __webpack_require__("./node_modules/core-js/library/modules/$.redefine-all.js")
	  , ctx          = __webpack_require__("./node_modules/core-js/library/modules/$.ctx.js")
	  , strictNew    = __webpack_require__("./node_modules/core-js/library/modules/$.strict-new.js")
	  , defined      = __webpack_require__("./node_modules/core-js/library/modules/$.defined.js")
	  , forOf        = __webpack_require__("./node_modules/core-js/library/modules/$.for-of.js")
	  , $iterDefine  = __webpack_require__("./node_modules/core-js/library/modules/$.iter-define.js")
	  , step         = __webpack_require__("./node_modules/core-js/library/modules/$.iter-step.js")
	  , ID           = __webpack_require__("./node_modules/core-js/library/modules/$.uid.js")('id')
	  , $has         = __webpack_require__("./node_modules/core-js/library/modules/$.has.js")
	  , isObject     = __webpack_require__("./node_modules/core-js/library/modules/$.is-object.js")
	  , setSpecies   = __webpack_require__("./node_modules/core-js/library/modules/$.set-species.js")
	  , DESCRIPTORS  = __webpack_require__("./node_modules/core-js/library/modules/$.descriptors.js")
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;
	
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/es7.map.to-json.js":
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__("./node_modules/core-js/library/modules/$.export.js");
	
	$export($export.P, 'Map', {toJSON: __webpack_require__("./node_modules/core-js/library/modules/$.collection-to-json.js")('Map')});

/***/ },

/***/ "./node_modules/core-js/library/modules/$.collection-to-json.js":
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__("./node_modules/core-js/library/modules/$.for-of.js")
	  , classof = __webpack_require__("./node_modules/core-js/library/modules/$.classof.js");
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },

/***/ "./src/parsers/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = __webpack_require__("./node_modules/babel-runtime/helpers/sliced-to-array.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getDefaultCategory = getDefaultCategory;
	exports.getDefaultParser = getDefaultParser;
	exports.getCategoryByID = getCategoryByID;
	exports.getParserByID = getParserByID;
	exports.getTransformerByID = getTransformerByID;
	var localRequire = __webpack_require__(1);
	
	var files = localRequire.keys().map(function (name) {
	  return name.split('/').slice(1);
	});
	
	var categoryByID = {};
	var parserByID = {};
	var transformerByID = {};
	
	var restrictedParserNames = new _Set(['index.js', 'codeExample.txt', 'transformers']);
	
	var categories = files.filter(function (name) {
	  return name[1] === 'index.js';
	}).map(function (_ref) {
	  var _ref2 = _slicedToArray(_ref, 1);
	
	  var catName = _ref2[0];
	
	  var category = localRequire('./' + catName + '/index.js');
	
	  categoryByID[category.id] = category;
	
	  category.codeExample = localRequire('./' + catName + '/codeExample.txt');
	
	  var catFiles = files.filter(function (_ref3) {
	    var _ref32 = _slicedToArray(_ref3, 1);
	
	    var curCatName = _ref32[0];
	    return curCatName === catName;
	  }).map(function (name) {
	    return name.slice(1);
	  });
	
	  category.parsers = catFiles.filter(function (_ref4) {
	    var _ref42 = _slicedToArray(_ref4, 1);
	
	    var parserName = _ref42[0];
	    return !restrictedParserNames.has(parserName);
	  }).map(function (_ref5) {
	    var _ref52 = _slicedToArray(_ref5, 1);
	
	    var parserName = _ref52[0];
	
	    var parser = localRequire('./' + catName + '/' + parserName);
	    parserByID[parser.id] = parser;
	    parser.category = category;
	    return parser;
	  });
	
	  category.transformers = catFiles.filter(function (_ref6) {
	    var _ref62 = _slicedToArray(_ref6, 3);
	
	    var dirName = _ref62[0];
	    var fileName = _ref62[2];
	    return dirName === 'transformers' && fileName === 'index.js';
	  }).map(function (_ref7) {
	    var _ref72 = _slicedToArray(_ref7, 2);
	
	    var transformerName = _ref72[1];
	
	    var transformerDir = './' + catName + '/transformers/' + transformerName;
	    var transformer = localRequire(transformerDir + '/index.js');
	    transformerByID[transformer.id] = transformer;
	    transformer.defaultTransform = localRequire(transformerDir + '/codeExample.txt');
	    return transformer;
	  });
	
	  return category;
	});
	
	exports.categories = categories;
	
	function getDefaultCategory() {
	  return categoryByID.javascript;
	}
	
	function getDefaultParser() {
	  var category = arguments.length <= 0 || arguments[0] === undefined ? getDefaultCategory() : arguments[0];
	
	  return category.parsers[0];
	}
	
	function getCategoryByID(id) {
	  return categoryByID[id];
	}
	
	function getParserByID(id) {
	  return parserByID[id];
	}
	
	function getTransformerByID(id) {
	  return transformerByID[id];
	}

/***/ },

/***/ "./node_modules/babel-runtime/core-js/set.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/set.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/set.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js");
	__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.set.js");
	__webpack_require__("./node_modules/core-js/library/modules/es7.set.to-json.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").Set;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.set.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__("./node_modules/core-js/library/modules/$.collection-strong.js");
	
	// 23.2 Set Objects
	__webpack_require__("./node_modules/core-js/library/modules/$.collection.js")('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },

/***/ "./node_modules/core-js/library/modules/es7.set.to-json.js":
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__("./node_modules/core-js/library/modules/$.export.js");
	
	$export($export.P, 'Set', {toJSON: __webpack_require__("./node_modules/core-js/library/modules/$.collection-to-json.js")('Set')});

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./css/codeExample.txt": "./src/parsers/css/codeExample.txt",
		"./css/cssom.js": "./src/parsers/css/cssom.js",
		"./css/index.js": "./src/parsers/css/index.js",
		"./css/postcss.js": "./src/parsers/css/postcss.js",
		"./css/rework.js": "./src/parsers/css/rework.js",
		"./css/transformers/postcss/codeExample.txt": "./src/parsers/css/transformers/postcss/codeExample.txt",
		"./css/transformers/postcss/index.js": "./src/parsers/css/transformers/postcss/index.js",
		"./graphql/codeExample.txt": "./src/parsers/graphql/codeExample.txt",
		"./graphql/graphql-js.js": "./src/parsers/graphql/graphql-js.js",
		"./graphql/index.js": "./src/parsers/graphql/index.js",
		"./html/codeExample.txt": "./src/parsers/html/codeExample.txt",
		"./html/htmlparser2.js": "./src/parsers/html/htmlparser2.js",
		"./html/index.js": "./src/parsers/html/index.js",
		"./html/parse5.js": "./src/parsers/html/parse5.js",
		"./js/acorn.js": "./src/parsers/js/acorn.js",
		"./js/babel-eslint.js": "./src/parsers/js/babel-eslint.js",
		"./js/babylon.js": "./src/parsers/js/babylon.js",
		"./js/babylon6.js": "./src/parsers/js/babylon6.js",
		"./js/codeExample.txt": "./src/parsers/js/codeExample.txt",
		"./js/espree.js": "./src/parsers/js/espree.js",
		"./js/esprima.js": "./src/parsers/js/esprima.js",
		"./js/flow.js": "./src/parsers/js/flow.js",
		"./js/index.js": "./src/parsers/js/index.js",
		"./js/recast.js": "./src/parsers/js/recast.js",
		"./js/shift.js": "./src/parsers/js/shift.js",
		"./js/traceur.js": "./src/parsers/js/traceur.js",
		"./js/transformers/babel/codeExample.txt": "./src/parsers/js/transformers/babel/codeExample.txt",
		"./js/transformers/babel/index.js": "./src/parsers/js/transformers/babel/index.js",
		"./js/transformers/babel6/codeExample.txt": "./src/parsers/js/transformers/babel6/codeExample.txt",
		"./js/transformers/babel6/index.js": "./src/parsers/js/transformers/babel6/index.js",
		"./js/transformers/jscodeshift/codeExample.txt": "./src/parsers/js/transformers/jscodeshift/codeExample.txt",
		"./js/transformers/jscodeshift/index.js": "./src/parsers/js/transformers/jscodeshift/index.js",
		"./js/typescript.js": "./src/parsers/js/typescript.js",
		"./js/uglify.js": "./src/parsers/js/uglify.js",
		"./webidl/codeExample.txt": "./src/parsers/webidl/codeExample.txt",
		"./webidl/index.js": "./src/parsers/webidl/index.js",
		"./webidl/webidl2.js": "./src/parsers/webidl/webidl2.js"
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },

/***/ "./src/parsers/css/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "/**\n * Paste or drop some CSS here and explore\n * the syntax tree created by chosen parser.\n * Enjoy!\n */\n\n@media screen and (min-width: 480px) {\n    body {\n        background-color: lightgreen;\n    }\n}\n\n#main {\n    border: 1px solid black;\n}\n\nul li {\n\tpadding: 5px;\n}\n"

/***/ },

/***/ "./src/parsers/css/cssom.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _cssomPackageJson = __webpack_require__("./node_modules/cssom/package.json");
	
	var _cssomPackageJson2 = _interopRequireDefault(_cssomPackageJson);
	
	var ID = 'cssom';
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _cssomPackageJson2['default'].version,
	  homepage: _cssomPackageJson2['default'].homepage,
	  locationProps: new _Set(['__starts', '__ends']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(3, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/cssom/lib/parse.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  parse: function parse(CSSOM, code) {
	    return CSSOM.parse(code);
	  },
	
	  getNodeName: function getNodeName(node) {
	    return node.constructor.name;
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    var __starts = node.__starts;
	    var __ends = node.__ends;
	
	    if (__ends === undefined && node.parentRule) {
	      __ends = node.parentRule.__ends;
	    }
	    if (__ends !== undefined) {
	      return [__starts, __ends];
	    }
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'cssRules' || key === 'style';
	  },
	
	  _ignoredProperties: new _Set(['parentRule', 'parentStyleSheet', '_importants'])
	});
	module.exports = exports['default'];

/***/ },

/***/ "./src/parsers/utils/defaultParserInterface.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")["default"];
	
	var _regeneratorRuntime = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js")["default"];
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = {
	  _ignoredProperties: new _Set(),
	  locationProps: new _Set(),
	
	  opensByDefault: function opensByDefault() /*node, key*/{
	    return false;
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    return node.range;
	  },
	
	  getNodeName: function getNodeName(node) {
	    return node.type;
	  },
	
	  forEachProperty: _regeneratorRuntime.mark(function forEachProperty(node) {
	    var prop;
	    return _regeneratorRuntime.wrap(function forEachProperty$(context$1$0) {
	      while (1) switch (context$1$0.prev = context$1$0.next) {
	        case 0:
	          context$1$0.t0 = _regeneratorRuntime.keys(node);
	
	        case 1:
	          if ((context$1$0.t1 = context$1$0.t0()).done) {
	            context$1$0.next = 9;
	            break;
	          }
	
	          prop = context$1$0.t1.value;
	
	          if (!this._ignoredProperties.has(prop)) {
	            context$1$0.next = 5;
	            break;
	          }
	
	          return context$1$0.abrupt("continue", 1);
	
	        case 5:
	          context$1$0.next = 7;
	          return {
	            value: node[prop],
	            key: prop,
	            computed: false
	          };
	
	        case 7:
	          context$1$0.next = 1;
	          break;
	
	        case 9:
	        case "end":
	          return context$1$0.stop();
	      }
	    }, forEachProperty, this);
	  })
	};
	module.exports = exports["default"];

/***/ },

/***/ "./node_modules/babel-runtime/regenerator/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__("./node_modules/babel-runtime/regenerator/runtime.js");
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}
	
	module.exports = { "default": module.exports, __esModule: true };
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-runtime/regenerator/runtime.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	"use strict";
	
	var _Symbol = __webpack_require__("./node_modules/babel-runtime/core-js/symbol.js")["default"];
	
	var _Object$create = __webpack_require__("./node_modules/babel-runtime/core-js/object/create.js")["default"];
	
	var _Object$setPrototypeOf = __webpack_require__("./node_modules/babel-runtime/core-js/object/set-prototype-of.js")["default"];
	
	var _Promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js")["default"];
	
	!(function (global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof _Symbol === "function" ? _Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = _Object$create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };
	
	  runtime.mark = function (genFun) {
	    if (_Object$setPrototypeOf) {
	      _Object$setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = _Object$create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function (arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return _Promise.resolve(value.arg).then(function (value) {
	            invoke("next", value, resolve, reject);
	          }, function (err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return _Promise.resolve(value).then(function (unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new _Promise(function (resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	      // If enqueue has been called before, then we want to wait until
	      // all previous Promises have been resolved before calling invoke,
	      // so that results are always delivered in the correct order. If
	      // enqueue has not been called before, then it is important to
	      // call invoke immediately, without waiting on a callback to fire,
	      // so that the async generator function has the opportunity to do
	      // any necessary setup in a predictable way. This predictability
	      // is why the Promise constructor synchronously invokes its
	      // executor callback, and why async functions synchronously
	      // execute code before the first await. Since we implement simple
	      // async functions in terms of async generators, it is especially
	      // important to get this right, even though it requires care.
	      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	      // Avoid propagating failures to Promises returned by later
	      // invocations of the iterator.
	      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	
	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function () {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function () {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function (object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function reset(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function stop() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/babel-runtime/core-js/symbol.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/symbol/index.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/symbol/index.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.symbol.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js");
	module.exports = __webpack_require__("./node_modules/core-js/library/modules/$.core.js").Symbol;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.symbol.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__("./node_modules/core-js/library/modules/$.js")
	  , global         = __webpack_require__("./node_modules/core-js/library/modules/$.global.js")
	  , has            = __webpack_require__("./node_modules/core-js/library/modules/$.has.js")
	  , DESCRIPTORS    = __webpack_require__("./node_modules/core-js/library/modules/$.descriptors.js")
	  , $export        = __webpack_require__("./node_modules/core-js/library/modules/$.export.js")
	  , redefine       = __webpack_require__("./node_modules/core-js/library/modules/$.redefine.js")
	  , $fails         = __webpack_require__("./node_modules/core-js/library/modules/$.fails.js")
	  , shared         = __webpack_require__("./node_modules/core-js/library/modules/$.shared.js")
	  , setToStringTag = __webpack_require__("./node_modules/core-js/library/modules/$.set-to-string-tag.js")
	  , uid            = __webpack_require__("./node_modules/core-js/library/modules/$.uid.js")
	  , wks            = __webpack_require__("./node_modules/core-js/library/modules/$.wks.js")
	  , keyOf          = __webpack_require__("./node_modules/core-js/library/modules/$.keyof.js")
	  , $names         = __webpack_require__("./node_modules/core-js/library/modules/$.get-names.js")
	  , enumKeys       = __webpack_require__("./node_modules/core-js/library/modules/$.enum-keys.js")
	  , isArray        = __webpack_require__("./node_modules/core-js/library/modules/$.is-array.js")
	  , anObject       = __webpack_require__("./node_modules/core-js/library/modules/$.an-object.js")
	  , toIObject      = __webpack_require__("./node_modules/core-js/library/modules/$.to-iobject.js")
	  , createDesc     = __webpack_require__("./node_modules/core-js/library/modules/$.property-desc.js")
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__("./node_modules/core-js/library/modules/$.library.js")){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },

/***/ "./node_modules/core-js/library/modules/$.keyof.js":
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__("./node_modules/core-js/library/modules/$.js")
	  , toIObject = __webpack_require__("./node_modules/core-js/library/modules/$.to-iobject.js");
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.get-names.js":
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__("./node_modules/core-js/library/modules/$.to-iobject.js")
	  , getNames  = __webpack_require__("./node_modules/core-js/library/modules/$.js").getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/$.enum-keys.js":
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__("./node_modules/core-js/library/modules/$.js");
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },

/***/ "./node_modules/cssom/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"cssom@https://registry.npmjs.org/cssom/-/cssom-0.3.1.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "cssom@>=0.3.0 <0.4.0",
		"_id": "cssom@0.3.1",
		"_inCache": true,
		"_location": "/cssom",
		"_phantomChildren": {},
		"_requested": {
			"name": "cssom",
			"raw": "cssom@https://registry.npmjs.org/cssom/-/cssom-0.3.1.tgz",
			"rawSpec": "https://registry.npmjs.org/cssom/-/cssom-0.3.1.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/cssom/-/cssom-0.3.1.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/cssom/-/cssom-0.3.1.tgz",
		"_shasum": "c9e37ef2490e64f6d1baa10fda852257082c25d3",
		"_shrinkwrap": null,
		"_spec": "cssom@https://registry.npmjs.org/cssom/-/cssom-0.3.1.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "me@elv1s.ru",
			"name": "Nikita Vasilyev"
		},
		"bugs": {
			"url": "https://github.com/nv/CSSOM/issues"
		},
		"dependencies": {},
		"description": "CSS Object Model implementation and CSS parser",
		"devDependencies": {
			"jake": "~0.7.3"
		},
		"files": [
			"lib/"
		],
		"homepage": "https://github.com/nv/CSSOM#readme",
		"keywords": [
			"CSS",
			"CSSOM",
			"parser",
			"styleSheet"
		],
		"license": "MIT",
		"main": "./lib/index.js",
		"name": "cssom",
		"optionalDependencies": {},
		"readme": "# CSSOM\n\nCSSOM.js is a CSS parser written in pure JavaScript. It also a partial implementation of [CSS Object Model](http://dev.w3.org/csswg/cssom/). \n\n    CSSOM.parse(\"body {color: black}\")\n    -> {\n      cssRules: [\n        {\n          selectorText: \"body\",\n          style: {\n            0: \"color\",\n            color: \"black\",\n            length: 1\n          }\n        }\n      ]\n    }\n\n\n## [Parser demo](http://nv.github.com/CSSOM/docs/parse.html)\n\nWorks well in Google Chrome 6+, Safari 5+, Firefox 3.6+, Opera 10.63+.\nDoesn't work in IE < 9 because of unsupported getters/setters.\n\nTo use CSSOM.js in the browser you might want to build a one-file version that exposes CSSOM global variable:\n\n    ➤ git clone https://github.com/NV/CSSOM.git\n    ➤ cd CSSOM\n    ➤ npm install -d\n    ➤ ./node_modules/.bin/jake\n    build/CSSOM.js is done\n\nTo use it with Node.js or any other CommonJS loader:\n\n    ➤ npm install cssom\n\n## Don’t use it if...\n\nYou parse CSS to mungle, minify or reformat the following code:\n\n```css\ndiv {\n  background: gray;\n  background: linear-gradient(to bottom, white 0%, black 100%);\n}\n```\n\nThis pattern is often used to give browsers that don’t understand linear gradients a fallback solution (e.g. gray color in the example).\nIn CSSOM, `background: gray` [gets overwritten](http://nv.github.io/CSSOM/docs/parse.html#css=div%20%7B%0A%20%20%20%20%20%20background%3A%20gray%3B%0A%20%20%20%20background%3A%20linear-gradient(to%20bottom%2C%20white%200%25%2C%20black%20100%25)%3B%0A%7D).\nThe last same-name property always overwrites all the previous ones.\n\n\nIf you do CSS mungling, minification, image inlining, and such, CSSOM.js is no good for you, considere using one of the following:\n\n  * [postcss](https://github.com/postcss/postcss)\n  * [reworkcss/css](https://github.com/reworkcss/css)\n  * [csso](https://github.com/css/csso)\n  * [mensch](https://github.com/brettstimmerman/mensch)\n\n\n## [Specs](http://nv.github.com/CSSOM/spec/)\n\nTo run specs locally:\n\n    ➤ git submodule init\n    ➤ git submodule update\n\n\n## [Who uses CSSOM.js](https://github.com/NV/CSSOM/wiki/Who-uses-CSSOM.js)\n",
		"readmeFilename": "README.mdown",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/nv/CSSOM.git"
		},
		"scripts": {
			"prepublish": "jake lib/index.js"
		},
		"version": "0.3.1"
	};

/***/ },

/***/ "./src/parsers/css/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	__webpack_require__("./node_modules/codemirror/mode/css/css.js");
	
	var id = 'css';
	exports.id = id;
	var displayName = 'CSS';
	exports.displayName = displayName;
	var mimeTypes = ['text/css'];
	exports.mimeTypes = mimeTypes;

/***/ },

/***/ "./node_modules/codemirror/mode/css/css.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";
	
	CodeMirror.defineMode("css", function(config, parserConfig) {
	  var inline = parserConfig.inline
	  if (!parserConfig.propertyKeywords) parserConfig = CodeMirror.resolveMode("text/css");
	
	  var indentUnit = config.indentUnit,
	      tokenHooks = parserConfig.tokenHooks,
	      documentTypes = parserConfig.documentTypes || {},
	      mediaTypes = parserConfig.mediaTypes || {},
	      mediaFeatures = parserConfig.mediaFeatures || {},
	      mediaValueKeywords = parserConfig.mediaValueKeywords || {},
	      propertyKeywords = parserConfig.propertyKeywords || {},
	      nonStandardPropertyKeywords = parserConfig.nonStandardPropertyKeywords || {},
	      fontProperties = parserConfig.fontProperties || {},
	      counterDescriptors = parserConfig.counterDescriptors || {},
	      colorKeywords = parserConfig.colorKeywords || {},
	      valueKeywords = parserConfig.valueKeywords || {},
	      allowNested = parserConfig.allowNested,
	      supportsAtComponent = parserConfig.supportsAtComponent === true;
	
	  var type, override;
	  function ret(style, tp) { type = tp; return style; }
	
	  // Tokenizers
	
	  function tokenBase(stream, state) {
	    var ch = stream.next();
	    if (tokenHooks[ch]) {
	      var result = tokenHooks[ch](stream, state);
	      if (result !== false) return result;
	    }
	    if (ch == "@") {
	      stream.eatWhile(/[\w\\\-]/);
	      return ret("def", stream.current());
	    } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
	      return ret(null, "compare");
	    } else if (ch == "\"" || ch == "'") {
	      state.tokenize = tokenString(ch);
	      return state.tokenize(stream, state);
	    } else if (ch == "#") {
	      stream.eatWhile(/[\w\\\-]/);
	      return ret("atom", "hash");
	    } else if (ch == "!") {
	      stream.match(/^\s*\w*/);
	      return ret("keyword", "important");
	    } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
	      stream.eatWhile(/[\w.%]/);
	      return ret("number", "unit");
	    } else if (ch === "-") {
	      if (/[\d.]/.test(stream.peek())) {
	        stream.eatWhile(/[\w.%]/);
	        return ret("number", "unit");
	      } else if (stream.match(/^-[\w\\\-]+/)) {
	        stream.eatWhile(/[\w\\\-]/);
	        if (stream.match(/^\s*:/, false))
	          return ret("variable-2", "variable-definition");
	        return ret("variable-2", "variable");
	      } else if (stream.match(/^\w+-/)) {
	        return ret("meta", "meta");
	      }
	    } else if (/[,+>*\/]/.test(ch)) {
	      return ret(null, "select-op");
	    } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
	      return ret("qualifier", "qualifier");
	    } else if (/[:;{}\[\]\(\)]/.test(ch)) {
	      return ret(null, ch);
	    } else if ((ch == "u" && stream.match(/rl(-prefix)?\(/)) ||
	               (ch == "d" && stream.match("omain(")) ||
	               (ch == "r" && stream.match("egexp("))) {
	      stream.backUp(1);
	      state.tokenize = tokenParenthesized;
	      return ret("property", "word");
	    } else if (/[\w\\\-]/.test(ch)) {
	      stream.eatWhile(/[\w\\\-]/);
	      return ret("property", "word");
	    } else {
	      return ret(null, null);
	    }
	  }
	
	  function tokenString(quote) {
	    return function(stream, state) {
	      var escaped = false, ch;
	      while ((ch = stream.next()) != null) {
	        if (ch == quote && !escaped) {
	          if (quote == ")") stream.backUp(1);
	          break;
	        }
	        escaped = !escaped && ch == "\\";
	      }
	      if (ch == quote || !escaped && quote != ")") state.tokenize = null;
	      return ret("string", "string");
	    };
	  }
	
	  function tokenParenthesized(stream, state) {
	    stream.next(); // Must be '('
	    if (!stream.match(/\s*[\"\')]/, false))
	      state.tokenize = tokenString(")");
	    else
	      state.tokenize = null;
	    return ret(null, "(");
	  }
	
	  // Context management
	
	  function Context(type, indent, prev) {
	    this.type = type;
	    this.indent = indent;
	    this.prev = prev;
	  }
	
	  function pushContext(state, stream, type, indent) {
	    state.context = new Context(type, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
	    return type;
	  }
	
	  function popContext(state) {
	    if (state.context.prev)
	      state.context = state.context.prev;
	    return state.context.type;
	  }
	
	  function pass(type, stream, state) {
	    return states[state.context.type](type, stream, state);
	  }
	  function popAndPass(type, stream, state, n) {
	    for (var i = n || 1; i > 0; i--)
	      state.context = state.context.prev;
	    return pass(type, stream, state);
	  }
	
	  // Parser
	
	  function wordAsValue(stream) {
	    var word = stream.current().toLowerCase();
	    if (valueKeywords.hasOwnProperty(word))
	      override = "atom";
	    else if (colorKeywords.hasOwnProperty(word))
	      override = "keyword";
	    else
	      override = "variable";
	  }
	
	  var states = {};
	
	  states.top = function(type, stream, state) {
	    if (type == "{") {
	      return pushContext(state, stream, "block");
	    } else if (type == "}" && state.context.prev) {
	      return popContext(state);
	    } else if (supportsAtComponent && /@component/.test(type)) {
	      return pushContext(state, stream, "atComponentBlock");
	    } else if (/^@(-moz-)?document$/.test(type)) {
	      return pushContext(state, stream, "documentTypes");
	    } else if (/^@(media|supports|(-moz-)?document|import)$/.test(type)) {
	      return pushContext(state, stream, "atBlock");
	    } else if (/^@(font-face|counter-style)/.test(type)) {
	      state.stateArg = type;
	      return "restricted_atBlock_before";
	    } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(type)) {
	      return "keyframes";
	    } else if (type && type.charAt(0) == "@") {
	      return pushContext(state, stream, "at");
	    } else if (type == "hash") {
	      override = "builtin";
	    } else if (type == "word") {
	      override = "tag";
	    } else if (type == "variable-definition") {
	      return "maybeprop";
	    } else if (type == "interpolation") {
	      return pushContext(state, stream, "interpolation");
	    } else if (type == ":") {
	      return "pseudo";
	    } else if (allowNested && type == "(") {
	      return pushContext(state, stream, "parens");
	    }
	    return state.context.type;
	  };
	
	  states.block = function(type, stream, state) {
	    if (type == "word") {
	      var word = stream.current().toLowerCase();
	      if (propertyKeywords.hasOwnProperty(word)) {
	        override = "property";
	        return "maybeprop";
	      } else if (nonStandardPropertyKeywords.hasOwnProperty(word)) {
	        override = "string-2";
	        return "maybeprop";
	      } else if (allowNested) {
	        override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
	        return "block";
	      } else {
	        override += " error";
	        return "maybeprop";
	      }
	    } else if (type == "meta") {
	      return "block";
	    } else if (!allowNested && (type == "hash" || type == "qualifier")) {
	      override = "error";
	      return "block";
	    } else {
	      return states.top(type, stream, state);
	    }
	  };
	
	  states.maybeprop = function(type, stream, state) {
	    if (type == ":") return pushContext(state, stream, "prop");
	    return pass(type, stream, state);
	  };
	
	  states.prop = function(type, stream, state) {
	    if (type == ";") return popContext(state);
	    if (type == "{" && allowNested) return pushContext(state, stream, "propBlock");
	    if (type == "}" || type == "{") return popAndPass(type, stream, state);
	    if (type == "(") return pushContext(state, stream, "parens");
	
	    if (type == "hash" && !/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(stream.current())) {
	      override += " error";
	    } else if (type == "word") {
	      wordAsValue(stream);
	    } else if (type == "interpolation") {
	      return pushContext(state, stream, "interpolation");
	    }
	    return "prop";
	  };
	
	  states.propBlock = function(type, _stream, state) {
	    if (type == "}") return popContext(state);
	    if (type == "word") { override = "property"; return "maybeprop"; }
	    return state.context.type;
	  };
	
	  states.parens = function(type, stream, state) {
	    if (type == "{" || type == "}") return popAndPass(type, stream, state);
	    if (type == ")") return popContext(state);
	    if (type == "(") return pushContext(state, stream, "parens");
	    if (type == "interpolation") return pushContext(state, stream, "interpolation");
	    if (type == "word") wordAsValue(stream);
	    return "parens";
	  };
	
	  states.pseudo = function(type, stream, state) {
	    if (type == "word") {
	      override = "variable-3";
	      return state.context.type;
	    }
	    return pass(type, stream, state);
	  };
	
	  states.documentTypes = function(type, stream, state) {
	    if (type == "word" && documentTypes.hasOwnProperty(stream.current())) {
	      override = "tag";
	      return state.context.type;
	    } else {
	      return states.atBlock(type, stream, state);
	    }
	  };
	
	  states.atBlock = function(type, stream, state) {
	    if (type == "(") return pushContext(state, stream, "atBlock_parens");
	    if (type == "}" || type == ";") return popAndPass(type, stream, state);
	    if (type == "{") return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");
	
	    if (type == "interpolation") return pushContext(state, stream, "interpolation");
	
	    if (type == "word") {
	      var word = stream.current().toLowerCase();
	      if (word == "only" || word == "not" || word == "and" || word == "or")
	        override = "keyword";
	      else if (mediaTypes.hasOwnProperty(word))
	        override = "attribute";
	      else if (mediaFeatures.hasOwnProperty(word))
	        override = "property";
	      else if (mediaValueKeywords.hasOwnProperty(word))
	        override = "keyword";
	      else if (propertyKeywords.hasOwnProperty(word))
	        override = "property";
	      else if (nonStandardPropertyKeywords.hasOwnProperty(word))
	        override = "string-2";
	      else if (valueKeywords.hasOwnProperty(word))
	        override = "atom";
	      else if (colorKeywords.hasOwnProperty(word))
	        override = "keyword";
	      else
	        override = "error";
	    }
	    return state.context.type;
	  };
	
	  states.atComponentBlock = function(type, stream, state) {
	    if (type == "}")
	      return popAndPass(type, stream, state);
	    if (type == "{")
	      return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
	    if (type == "word")
	      override = "error";
	    return state.context.type;
	  };
	
	  states.atBlock_parens = function(type, stream, state) {
	    if (type == ")") return popContext(state);
	    if (type == "{" || type == "}") return popAndPass(type, stream, state, 2);
	    return states.atBlock(type, stream, state);
	  };
	
	  states.restricted_atBlock_before = function(type, stream, state) {
	    if (type == "{")
	      return pushContext(state, stream, "restricted_atBlock");
	    if (type == "word" && state.stateArg == "@counter-style") {
	      override = "variable";
	      return "restricted_atBlock_before";
	    }
	    return pass(type, stream, state);
	  };
	
	  states.restricted_atBlock = function(type, stream, state) {
	    if (type == "}") {
	      state.stateArg = null;
	      return popContext(state);
	    }
	    if (type == "word") {
	      if ((state.stateArg == "@font-face" && !fontProperties.hasOwnProperty(stream.current().toLowerCase())) ||
	          (state.stateArg == "@counter-style" && !counterDescriptors.hasOwnProperty(stream.current().toLowerCase())))
	        override = "error";
	      else
	        override = "property";
	      return "maybeprop";
	    }
	    return "restricted_atBlock";
	  };
	
	  states.keyframes = function(type, stream, state) {
	    if (type == "word") { override = "variable"; return "keyframes"; }
	    if (type == "{") return pushContext(state, stream, "top");
	    return pass(type, stream, state);
	  };
	
	  states.at = function(type, stream, state) {
	    if (type == ";") return popContext(state);
	    if (type == "{" || type == "}") return popAndPass(type, stream, state);
	    if (type == "word") override = "tag";
	    else if (type == "hash") override = "builtin";
	    return "at";
	  };
	
	  states.interpolation = function(type, stream, state) {
	    if (type == "}") return popContext(state);
	    if (type == "{" || type == ";") return popAndPass(type, stream, state);
	    if (type == "word") override = "variable";
	    else if (type != "variable" && type != "(" && type != ")") override = "error";
	    return "interpolation";
	  };
	
	  return {
	    startState: function(base) {
	      return {tokenize: null,
	              state: inline ? "block" : "top",
	              stateArg: null,
	              context: new Context(inline ? "block" : "top", base || 0, null)};
	    },
	
	    token: function(stream, state) {
	      if (!state.tokenize && stream.eatSpace()) return null;
	      var style = (state.tokenize || tokenBase)(stream, state);
	      if (style && typeof style == "object") {
	        type = style[1];
	        style = style[0];
	      }
	      override = style;
	      state.state = states[state.state](type, stream, state);
	      return override;
	    },
	
	    indent: function(state, textAfter) {
	      var cx = state.context, ch = textAfter && textAfter.charAt(0);
	      var indent = cx.indent;
	      if (cx.type == "prop" && (ch == "}" || ch == ")")) cx = cx.prev;
	      if (cx.prev) {
	        if (ch == "}" && (cx.type == "block" || cx.type == "top" ||
	                          cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
	          // Resume indentation from parent context.
	          cx = cx.prev;
	          indent = cx.indent;
	        } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") ||
	            ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
	          // Dedent relative to current context.
	          indent = Math.max(0, cx.indent - indentUnit);
	          cx = cx.prev;
	        }
	      }
	      return indent;
	    },
	
	    electricChars: "}",
	    blockCommentStart: "/*",
	    blockCommentEnd: "*/",
	    fold: "brace"
	  };
	});
	
	  function keySet(array) {
	    var keys = {};
	    for (var i = 0; i < array.length; ++i) {
	      keys[array[i]] = true;
	    }
	    return keys;
	  }
	
	  var documentTypes_ = [
	    "domain", "regexp", "url", "url-prefix"
	  ], documentTypes = keySet(documentTypes_);
	
	  var mediaTypes_ = [
	    "all", "aural", "braille", "handheld", "print", "projection", "screen",
	    "tty", "tv", "embossed"
	  ], mediaTypes = keySet(mediaTypes_);
	
	  var mediaFeatures_ = [
	    "width", "min-width", "max-width", "height", "min-height", "max-height",
	    "device-width", "min-device-width", "max-device-width", "device-height",
	    "min-device-height", "max-device-height", "aspect-ratio",
	    "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio",
	    "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color",
	    "max-color", "color-index", "min-color-index", "max-color-index",
	    "monochrome", "min-monochrome", "max-monochrome", "resolution",
	    "min-resolution", "max-resolution", "scan", "grid", "orientation",
	    "device-pixel-ratio", "min-device-pixel-ratio", "max-device-pixel-ratio",
	    "pointer", "any-pointer", "hover", "any-hover"
	  ], mediaFeatures = keySet(mediaFeatures_);
	
	  var mediaValueKeywords_ = [
	    "landscape", "portrait", "none", "coarse", "fine", "on-demand", "hover",
	    "interlace", "progressive"
	  ], mediaValueKeywords = keySet(mediaValueKeywords_);
	
	  var propertyKeywords_ = [
	    "align-content", "align-items", "align-self", "alignment-adjust",
	    "alignment-baseline", "anchor-point", "animation", "animation-delay",
	    "animation-direction", "animation-duration", "animation-fill-mode",
	    "animation-iteration-count", "animation-name", "animation-play-state",
	    "animation-timing-function", "appearance", "azimuth", "backface-visibility",
	    "background", "background-attachment", "background-blend-mode", "background-clip",
	    "background-color", "background-image", "background-origin", "background-position",
	    "background-repeat", "background-size", "baseline-shift", "binding",
	    "bleed", "bookmark-label", "bookmark-level", "bookmark-state",
	    "bookmark-target", "border", "border-bottom", "border-bottom-color",
	    "border-bottom-left-radius", "border-bottom-right-radius",
	    "border-bottom-style", "border-bottom-width", "border-collapse",
	    "border-color", "border-image", "border-image-outset",
	    "border-image-repeat", "border-image-slice", "border-image-source",
	    "border-image-width", "border-left", "border-left-color",
	    "border-left-style", "border-left-width", "border-radius", "border-right",
	    "border-right-color", "border-right-style", "border-right-width",
	    "border-spacing", "border-style", "border-top", "border-top-color",
	    "border-top-left-radius", "border-top-right-radius", "border-top-style",
	    "border-top-width", "border-width", "bottom", "box-decoration-break",
	    "box-shadow", "box-sizing", "break-after", "break-before", "break-inside",
	    "caption-side", "clear", "clip", "color", "color-profile", "column-count",
	    "column-fill", "column-gap", "column-rule", "column-rule-color",
	    "column-rule-style", "column-rule-width", "column-span", "column-width",
	    "columns", "content", "counter-increment", "counter-reset", "crop", "cue",
	    "cue-after", "cue-before", "cursor", "direction", "display",
	    "dominant-baseline", "drop-initial-after-adjust",
	    "drop-initial-after-align", "drop-initial-before-adjust",
	    "drop-initial-before-align", "drop-initial-size", "drop-initial-value",
	    "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis",
	    "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap",
	    "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings",
	    "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust",
	    "font-stretch", "font-style", "font-synthesis", "font-variant",
	    "font-variant-alternates", "font-variant-caps", "font-variant-east-asian",
	    "font-variant-ligatures", "font-variant-numeric", "font-variant-position",
	    "font-weight", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow",
	    "grid-auto-position", "grid-auto-rows", "grid-column", "grid-column-end",
	    "grid-column-start", "grid-row", "grid-row-end", "grid-row-start",
	    "grid-template", "grid-template-areas", "grid-template-columns",
	    "grid-template-rows", "hanging-punctuation", "height", "hyphens",
	    "icon", "image-orientation", "image-rendering", "image-resolution",
	    "inline-box-align", "justify-content", "left", "letter-spacing",
	    "line-break", "line-height", "line-stacking", "line-stacking-ruby",
	    "line-stacking-shift", "line-stacking-strategy", "list-style",
	    "list-style-image", "list-style-position", "list-style-type", "margin",
	    "margin-bottom", "margin-left", "margin-right", "margin-top",
	    "marker-offset", "marks", "marquee-direction", "marquee-loop",
	    "marquee-play-count", "marquee-speed", "marquee-style", "max-height",
	    "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index",
	    "nav-left", "nav-right", "nav-up", "object-fit", "object-position",
	    "opacity", "order", "orphans", "outline",
	    "outline-color", "outline-offset", "outline-style", "outline-width",
	    "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y",
	    "padding", "padding-bottom", "padding-left", "padding-right", "padding-top",
	    "page", "page-break-after", "page-break-before", "page-break-inside",
	    "page-policy", "pause", "pause-after", "pause-before", "perspective",
	    "perspective-origin", "pitch", "pitch-range", "play-during", "position",
	    "presentation-level", "punctuation-trim", "quotes", "region-break-after",
	    "region-break-before", "region-break-inside", "region-fragment",
	    "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness",
	    "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang",
	    "ruby-position", "ruby-span", "shape-image-threshold", "shape-inside", "shape-margin",
	    "shape-outside", "size", "speak", "speak-as", "speak-header",
	    "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set",
	    "tab-size", "table-layout", "target", "target-name", "target-new",
	    "target-position", "text-align", "text-align-last", "text-decoration",
	    "text-decoration-color", "text-decoration-line", "text-decoration-skip",
	    "text-decoration-style", "text-emphasis", "text-emphasis-color",
	    "text-emphasis-position", "text-emphasis-style", "text-height",
	    "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow",
	    "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position",
	    "text-wrap", "top", "transform", "transform-origin", "transform-style",
	    "transition", "transition-delay", "transition-duration",
	    "transition-property", "transition-timing-function", "unicode-bidi",
	    "vertical-align", "visibility", "voice-balance", "voice-duration",
	    "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress",
	    "voice-volume", "volume", "white-space", "widows", "width", "word-break",
	    "word-spacing", "word-wrap", "z-index",
	    // SVG-specific
	    "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color",
	    "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events",
	    "color-interpolation", "color-interpolation-filters",
	    "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering",
	    "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke",
	    "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin",
	    "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering",
	    "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal",
	    "glyph-orientation-vertical", "text-anchor", "writing-mode"
	  ], propertyKeywords = keySet(propertyKeywords_);
	
	  var nonStandardPropertyKeywords_ = [
	    "scrollbar-arrow-color", "scrollbar-base-color", "scrollbar-dark-shadow-color",
	    "scrollbar-face-color", "scrollbar-highlight-color", "scrollbar-shadow-color",
	    "scrollbar-3d-light-color", "scrollbar-track-color", "shape-inside",
	    "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button",
	    "searchfield-results-decoration", "zoom"
	  ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);
	
	  var fontProperties_ = [
	    "font-family", "src", "unicode-range", "font-variant", "font-feature-settings",
	    "font-stretch", "font-weight", "font-style"
	  ], fontProperties = keySet(fontProperties_);
	
	  var counterDescriptors_ = [
	    "additive-symbols", "fallback", "negative", "pad", "prefix", "range",
	    "speak-as", "suffix", "symbols", "system"
	  ], counterDescriptors = keySet(counterDescriptors_);
	
	  var colorKeywords_ = [
	    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige",
	    "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown",
	    "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue",
	    "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod",
	    "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen",
	    "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
	    "darkslateblue", "darkslategray", "darkturquoise", "darkviolet",
	    "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick",
	    "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
	    "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew",
	    "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
	    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral",
	    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink",
	    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray",
	    "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta",
	    "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple",
	    "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise",
	    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin",
	    "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
	    "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
	    "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue",
	    "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown",
	    "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue",
	    "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan",
	    "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white",
	    "whitesmoke", "yellow", "yellowgreen"
	  ], colorKeywords = keySet(colorKeywords_);
	
	  var valueKeywords_ = [
	    "above", "absolute", "activeborder", "additive", "activecaption", "afar",
	    "after-white-space", "ahead", "alias", "all", "all-scroll", "alphabetic", "alternate",
	    "always", "amharic", "amharic-abegede", "antialiased", "appworkspace",
	    "arabic-indic", "armenian", "asterisks", "attr", "auto", "avoid", "avoid-column", "avoid-page",
	    "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary",
	    "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box",
	    "both", "bottom", "break", "break-all", "break-word", "bullets", "button", "button-bevel",
	    "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "calc", "cambodian",
	    "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret",
	    "cell", "center", "checkbox", "circle", "cjk-decimal", "cjk-earthly-branch",
	    "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote",
	    "col-resize", "collapse", "color", "color-burn", "color-dodge", "column", "column-reverse",
	    "compact", "condensed", "contain", "content",
	    "content-box", "context-menu", "continuous", "copy", "counter", "counters", "cover", "crop",
	    "cross", "crosshair", "currentcolor", "cursive", "cyclic", "darken", "dashed", "decimal",
	    "decimal-leading-zero", "default", "default-button", "destination-atop",
	    "destination-in", "destination-out", "destination-over", "devanagari", "difference",
	    "disc", "discard", "disclosure-closed", "disclosure-open", "document",
	    "dot-dash", "dot-dot-dash",
	    "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out",
	    "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede",
	    "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er",
	    "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er",
	    "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et",
	    "ethiopic-halehame-gez", "ethiopic-halehame-om-et",
	    "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et",
	    "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig",
	    "ethiopic-numeric", "ew-resize", "exclusion", "expanded", "extends", "extra-condensed",
	    "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "flex", "flex-end", "flex-start", "footnotes",
	    "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove",
	    "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hard-light", "hebrew",
	    "help", "hidden", "hide", "higher", "highlight", "highlighttext",
	    "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "hue", "icon", "ignore",
	    "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite",
	    "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis",
	    "inline-block", "inline-flex", "inline-table", "inset", "inside", "intrinsic", "invert",
	    "italic", "japanese-formal", "japanese-informal", "justify", "kannada",
	    "katakana", "katakana-iroha", "keep-all", "khmer",
	    "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal",
	    "landscape", "lao", "large", "larger", "left", "level", "lighter", "lighten",
	    "line-through", "linear", "linear-gradient", "lines", "list-item", "listbox", "listitem",
	    "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian",
	    "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian",
	    "lower-roman", "lowercase", "ltr", "luminosity", "malayalam", "match", "matrix", "matrix3d",
	    "media-controls-background", "media-current-time-display",
	    "media-fullscreen-button", "media-mute-button", "media-play-button",
	    "media-return-to-realtime-button", "media-rewind-button",
	    "media-seek-back-button", "media-seek-forward-button", "media-slider",
	    "media-sliderthumb", "media-time-remaining-display", "media-volume-slider",
	    "media-volume-slider-container", "media-volume-sliderthumb", "medium",
	    "menu", "menulist", "menulist-button", "menulist-text",
	    "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic",
	    "mix", "mongolian", "monospace", "move", "multiple", "multiply", "myanmar", "n-resize",
	    "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop",
	    "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap",
	    "ns-resize", "numbers", "numeric", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote",
	    "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset",
	    "outside", "outside-shape", "overlay", "overline", "padding", "padding-box",
	    "painted", "page", "paused", "persian", "perspective", "plus-darker", "plus-lighter",
	    "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d",
	    "progress", "push-button", "radial-gradient", "radio", "read-only",
	    "read-write", "read-write-plaintext-only", "rectangle", "region",
	    "relative", "repeat", "repeating-linear-gradient",
	    "repeating-radial-gradient", "repeat-x", "repeat-y", "reset", "reverse",
	    "rgb", "rgba", "ridge", "right", "rotate", "rotate3d", "rotateX", "rotateY",
	    "rotateZ", "round", "row", "row-resize", "row-reverse", "rtl", "run-in", "running",
	    "s-resize", "sans-serif", "saturation", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "screen",
	    "scroll", "scrollbar", "se-resize", "searchfield",
	    "searchfield-cancel-button", "searchfield-decoration",
	    "searchfield-results-button", "searchfield-results-decoration",
	    "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama",
	    "simp-chinese-formal", "simp-chinese-informal", "single",
	    "skew", "skewX", "skewY", "skip-white-space", "slide", "slider-horizontal",
	    "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow",
	    "small", "small-caps", "small-caption", "smaller", "soft-light", "solid", "somali",
	    "source-atop", "source-in", "source-out", "source-over", "space", "space-around", "space-between", "spell-out", "square",
	    "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub",
	    "subpixel-antialiased", "super", "sw-resize", "symbolic", "symbols", "table",
	    "table-caption", "table-cell", "table-column", "table-column-group",
	    "table-footer-group", "table-header-group", "table-row", "table-row-group",
	    "tamil",
	    "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai",
	    "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight",
	    "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er",
	    "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top",
	    "trad-chinese-formal", "trad-chinese-informal",
	    "translate", "translate3d", "translateX", "translateY", "translateZ",
	    "transparent", "ultra-condensed", "ultra-expanded", "underline", "up",
	    "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal",
	    "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url",
	    "var", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted",
	    "visibleStroke", "visual", "w-resize", "wait", "wave", "wider",
	    "window", "windowframe", "windowtext", "words", "wrap", "wrap-reverse", "x-large", "x-small", "xor",
	    "xx-large", "xx-small"
	  ], valueKeywords = keySet(valueKeywords_);
	
	  var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_)
	    .concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_)
	    .concat(valueKeywords_);
	  CodeMirror.registerHelper("hintWords", "css", allWords);
	
	  function tokenCComment(stream, state) {
	    var maybeEnd = false, ch;
	    while ((ch = stream.next()) != null) {
	      if (maybeEnd && ch == "/") {
	        state.tokenize = null;
	        break;
	      }
	      maybeEnd = (ch == "*");
	    }
	    return ["comment", "comment"];
	  }
	
	  CodeMirror.defineMIME("text/css", {
	    documentTypes: documentTypes,
	    mediaTypes: mediaTypes,
	    mediaFeatures: mediaFeatures,
	    mediaValueKeywords: mediaValueKeywords,
	    propertyKeywords: propertyKeywords,
	    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
	    fontProperties: fontProperties,
	    counterDescriptors: counterDescriptors,
	    colorKeywords: colorKeywords,
	    valueKeywords: valueKeywords,
	    tokenHooks: {
	      "/": function(stream, state) {
	        if (!stream.eat("*")) return false;
	        state.tokenize = tokenCComment;
	        return tokenCComment(stream, state);
	      }
	    },
	    name: "css"
	  });
	
	  CodeMirror.defineMIME("text/x-scss", {
	    mediaTypes: mediaTypes,
	    mediaFeatures: mediaFeatures,
	    mediaValueKeywords: mediaValueKeywords,
	    propertyKeywords: propertyKeywords,
	    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
	    colorKeywords: colorKeywords,
	    valueKeywords: valueKeywords,
	    fontProperties: fontProperties,
	    allowNested: true,
	    tokenHooks: {
	      "/": function(stream, state) {
	        if (stream.eat("/")) {
	          stream.skipToEnd();
	          return ["comment", "comment"];
	        } else if (stream.eat("*")) {
	          state.tokenize = tokenCComment;
	          return tokenCComment(stream, state);
	        } else {
	          return ["operator", "operator"];
	        }
	      },
	      ":": function(stream) {
	        if (stream.match(/\s*\{/))
	          return [null, "{"];
	        return false;
	      },
	      "$": function(stream) {
	        stream.match(/^[\w-]+/);
	        if (stream.match(/^\s*:/, false))
	          return ["variable-2", "variable-definition"];
	        return ["variable-2", "variable"];
	      },
	      "#": function(stream) {
	        if (!stream.eat("{")) return false;
	        return [null, "interpolation"];
	      }
	    },
	    name: "css",
	    helperType: "scss"
	  });
	
	  CodeMirror.defineMIME("text/x-less", {
	    mediaTypes: mediaTypes,
	    mediaFeatures: mediaFeatures,
	    mediaValueKeywords: mediaValueKeywords,
	    propertyKeywords: propertyKeywords,
	    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
	    colorKeywords: colorKeywords,
	    valueKeywords: valueKeywords,
	    fontProperties: fontProperties,
	    allowNested: true,
	    tokenHooks: {
	      "/": function(stream, state) {
	        if (stream.eat("/")) {
	          stream.skipToEnd();
	          return ["comment", "comment"];
	        } else if (stream.eat("*")) {
	          state.tokenize = tokenCComment;
	          return tokenCComment(stream, state);
	        } else {
	          return ["operator", "operator"];
	        }
	      },
	      "@": function(stream) {
	        if (stream.eat("{")) return [null, "interpolation"];
	        if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/, false)) return false;
	        stream.eatWhile(/[\w\\\-]/);
	        if (stream.match(/^\s*:/, false))
	          return ["variable-2", "variable-definition"];
	        return ["variable-2", "variable"];
	      },
	      "&": function() {
	        return ["atom", "atom"];
	      }
	    },
	    name: "css",
	    helperType: "less"
	  });
	
	  CodeMirror.defineMIME("text/x-gss", {
	    documentTypes: documentTypes,
	    mediaTypes: mediaTypes,
	    mediaFeatures: mediaFeatures,
	    propertyKeywords: propertyKeywords,
	    nonStandardPropertyKeywords: nonStandardPropertyKeywords,
	    fontProperties: fontProperties,
	    counterDescriptors: counterDescriptors,
	    colorKeywords: colorKeywords,
	    valueKeywords: valueKeywords,
	    supportsAtComponent: true,
	    tokenHooks: {
	      "/": function(stream, state) {
	        if (!stream.eat("*")) return false;
	        state.tokenize = tokenCComment;
	        return tokenCComment(stream, state);
	      }
	    },
	    name: "css",
	    helperType: "gss"
	  });
	
	});


/***/ },

/***/ "./node_modules/babel-runtime/helpers/extends.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Object$assign = __webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js")["default"];
	
	exports["default"] = _Object$assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	
	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }
	
	  return target;
	};
	
	exports.__esModule = true;

/***/ },

/***/ "./src/parsers/css/utils/defaultCSSParserInterface.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  getOffset: function getOffset(_ref) {
	    var line = _ref.line;
	    var column = _ref.column;
	
	    return this.lineOffsets[line - 1] + column - 1;
	  },
	
	  parse: function parse(parseCSS, code) {
	    this.lineOffsets = [];
	    var index = 0;
	    do {
	      this.lineOffsets.push(index);
	    } while (index = code.indexOf('\n', index) + 1);
	    return parseCSS(code);
	  }
	});
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/postcss/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"postcss@5.0.16",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "postcss@5.0.16",
		"_id": "postcss@5.0.16",
		"_inCache": true,
		"_installable": true,
		"_location": "/postcss",
		"_nodeVersion": "5.4.1",
		"_npmOperationalInternal": {
			"host": "packages-5-east.internal.npmjs.com",
			"tmp": "tmp/postcss-5.0.16.tgz_1455440055139_0.9799389296676964"
		},
		"_npmUser": {
			"email": "andrey@sitnik.ru",
			"name": "ai"
		},
		"_npmVersion": "3.3.12",
		"_phantomChildren": {
			"has-flag": "1.0.0"
		},
		"_requested": {
			"name": "postcss",
			"raw": "postcss@5.0.16",
			"rawSpec": "5.0.16",
			"scope": null,
			"spec": "5.0.16",
			"type": "version"
		},
		"_requiredBy": [
			"/",
			"/autoprefixer",
			"/autoprefixer-loader",
			"/css-loader",
			"/cssnano",
			"/postcss-calc",
			"/postcss-colormin",
			"/postcss-convert-values",
			"/postcss-discard-comments",
			"/postcss-discard-duplicates",
			"/postcss-discard-empty",
			"/postcss-discard-unused",
			"/postcss-filter-plugins",
			"/postcss-merge-idents",
			"/postcss-merge-longhand",
			"/postcss-merge-rules",
			"/postcss-minify-font-values",
			"/postcss-minify-gradients",
			"/postcss-minify-params",
			"/postcss-minify-selectors",
			"/postcss-modules-extract-imports",
			"/postcss-modules-local-by-default",
			"/postcss-modules-scope",
			"/postcss-modules-values",
			"/postcss-normalize-charset",
			"/postcss-normalize-url",
			"/postcss-ordered-values",
			"/postcss-reduce-idents",
			"/postcss-reduce-transforms",
			"/postcss-safe-parser",
			"/postcss-scss",
			"/postcss-svgo",
			"/postcss-unique-selectors",
			"/postcss-zindex"
		],
		"_resolved": "https://registry.npmjs.org/postcss/-/postcss-5.0.16.tgz",
		"_shasum": "b14b9fdef1151d8ca32422e51d8c95b5d409004c",
		"_shrinkwrap": null,
		"_spec": "postcss@5.0.16",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "andrey@sitnik.ru",
			"name": "Andrey Sitnik"
		},
		"bugs": {
			"url": "https://github.com/postcss/postcss/issues"
		},
		"dependencies": {
			"js-base64": "^2.1.9",
			"source-map": "^0.5.1",
			"supports-color": "^3.1.2"
		},
		"description": "Tool for transforming styles with JS plugins",
		"devDependencies": {
			"babel-core": "6.5.2",
			"babel-eslint": "5.0.0-beta10",
			"babel-plugin-add-module-exports": "0.1.2",
			"babel-preset-es2015": "6.5.0",
			"babel-preset-es2015-loose": "7.0.0",
			"babel-preset-stage-0": "6.5.0",
			"chai": "3.5.0",
			"concat-with-sourcemaps": "1.0.4",
			"del": "2.2.0",
			"eslint": "2.0.0",
			"eslint-config-postcss": "2.0.0",
			"fs-extra": "0.26.5",
			"gulp": "3.9.1",
			"gulp-babel": "6.1.2",
			"gulp-eslint": "2.0.0",
			"gulp-istanbul": "0.10.3",
			"gulp-json-editor": "2.2.1",
			"gulp-mocha": "2.2.0",
			"gulp-shell": "0.5.2",
			"isparta": "4.0.0",
			"mocha": "2.4.5",
			"postcss-parser-tests": "5.0.5",
			"run-sequence": "1.1.5",
			"sinon": "1.17.3",
			"strip-ansi": "3.0.0",
			"yaspeller": "2.6.0"
		},
		"directories": {},
		"dist": {
			"shasum": "b14b9fdef1151d8ca32422e51d8c95b5d409004c",
			"tarball": "http://registry.npmjs.org/postcss/-/postcss-5.0.16.tgz"
		},
		"engines": {
			"node": ">=0.12"
		},
		"homepage": "http://postcss.org/",
		"keywords": [
			"css",
			"manipulation",
			"parser",
			"postcss",
			"preprocessor",
			"rework",
			"source map",
			"transform",
			"transpiler"
		],
		"license": "MIT",
		"main": "lib/postcss",
		"maintainers": [
			{
				"name": "ai",
				"email": "andrey@sitnik.ru"
			},
			{
				"name": "beneb",
				"email": "beneb.info@gmail.com"
			}
		],
		"name": "postcss",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/postcss/postcss.git"
		},
		"scripts": {
			"test": "gulp"
		},
		"version": "5.0.16"
	};

/***/ },

/***/ "./src/parsers/utils/SettingsRenderer.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _slicedToArray = __webpack_require__("./node_modules/babel-runtime/helpers/sliced-to-array.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = SettingsRenderer;
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	function SettingsRenderer(props) {
	  var settings = props.settings;
	  var values = props.values;
	  var _props$required = props.required;
	  var required = _props$required === undefined ? new _Set() : _props$required;
	  var onChange = props.onChange;
	
	  return _react2['default'].createElement(
	    'ul',
	    { className: 'settings' },
	    settings.map(function (setting) {
	      if (typeof setting === 'string') {
	        return _react2['default'].createElement(
	          'li',
	          { key: setting },
	          _react2['default'].createElement(
	            'label',
	            null,
	            _react2['default'].createElement('input', {
	              type: 'checkbox',
	              readOnly: required.has(setting),
	              disabled: required.has(setting),
	              defaultChecked: values[setting],
	              onChange: onChange.bind(null, setting)
	            }),
	            ' ',
	            setting
	          )
	        );
	      } else if (Array.isArray(setting)) {
	        var _setting = _slicedToArray(setting, 2);
	
	        var _name = _setting[0];
	        var options = _setting[1];
	
	        return _react2['default'].createElement(
	          'li',
	          { key: _name },
	          _react2['default'].createElement(
	            'label',
	            null,
	            _name,
	            ': ',
	            _react2['default'].createElement(
	              'select',
	              {
	                onChange: onChange.bind(null, _name),
	                defaultValue: values[_name] },
	              options.map(function (o) {
	                return _react2['default'].createElement(
	                  'option',
	                  { key: o },
	                  o
	                );
	              })
	            )
	          )
	        );
	      }
	    })
	  );
	}
	
	module.exports = exports['default'];

/***/ },

/***/ "./src/parsers/css/rework.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultCSSParserInterface = __webpack_require__("./src/parsers/css/utils/defaultCSSParserInterface.js");
	
	var _utilsDefaultCSSParserInterface2 = _interopRequireDefault(_utilsDefaultCSSParserInterface);
	
	var _cssPackageJson = __webpack_require__("./node_modules/css/package.json");
	
	var _cssPackageJson2 = _interopRequireDefault(_cssPackageJson);
	
	var ID = 'rework';
	
	exports['default'] = _extends({}, _utilsDefaultCSSParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _cssPackageJson2['default'].version,
	  homepage: _cssPackageJson2['default'].homepage,
	  locationProps: new _Set(['position']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(5, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/css/lib/parse/index.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  nodeToRange: function nodeToRange(_ref) {
	    var _this = this;
	
	    var range = _ref.position;
	
	    if (!range) return;
	    return [range.start, range.end].map(function (pos) {
	      return _this.getOffset(pos);
	    });
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'rules';
	  },
	
	  _ignoredProperties: new _Set(['parsingErrors', 'source', 'content'])
	});
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/css/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"css@https://registry.npmjs.org/css/-/css-2.2.1.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "css@>=2.2.1 <3.0.0",
		"_id": "css@2.2.1",
		"_inCache": true,
		"_location": "/css",
		"_phantomChildren": {
			"amdefine": "1.0.0"
		},
		"_requested": {
			"name": "css",
			"raw": "css@https://registry.npmjs.org/css/-/css-2.2.1.tgz",
			"rawSpec": "https://registry.npmjs.org/css/-/css-2.2.1.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/css/-/css-2.2.1.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/css/-/css-2.2.1.tgz",
		"_shasum": "73a4c81de85db664d4ee674f7d47085e3b2d55dc",
		"_shrinkwrap": null,
		"_spec": "css@https://registry.npmjs.org/css/-/css-2.2.1.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "tj@vision-media.ca",
			"name": "TJ Holowaychuk"
		},
		"bugs": {
			"url": "https://github.com/reworkcss/css/issues"
		},
		"dependencies": {
			"inherits": "^2.0.1",
			"source-map": "^0.1.38",
			"source-map-resolve": "^0.3.0",
			"urix": "^0.1.0"
		},
		"description": "CSS parser / stringifier",
		"devDependencies": {
			"bytes": "^1.0.0",
			"matcha": "^0.5.0",
			"mocha": "^1.21.3",
			"should": "^4.0.4"
		},
		"files": [
			"index.js",
			"lib"
		],
		"homepage": "https://github.com/reworkcss/css#readme",
		"keywords": [
			"css",
			"parser",
			"stringifier",
			"stylesheet"
		],
		"license": "MIT",
		"main": "index",
		"name": "css",
		"optionalDependencies": {},
		"readme": "# css [![Build Status](https://travis-ci.org/reworkcss/css.svg?branch=master)](https://travis-ci.org/reworkcss/css)\n\nCSS parser / stringifier.\n\n## Installation\n\n    $ npm install css\n\n## Usage\n\n```js\nvar css = require('css');\nvar obj = css.parse('body { font-size: 12px; }', options);\ncss.stringify(obj, options);\n```\n\n## API\n\n### css.parse(code, [options])\n\nAccepts a CSS string and returns an AST `object`.\n\n`options`:\n\n- silent: silently fail on parse errors.\n- source: the path to the file containing `css`. Makes errors and source\n  maps more helpful, by letting them know where code comes from.\n\n### css.stringify(object, [options])\n\nAccepts an AST `object` (as `css.parse` produces) and returns a CSS string.\n\n`options`:\n\n- indent: the string used to indent the output. Defaults to two spaces.\n- compress: omit comments and extraneous whitespace.\n- sourcemap: return a sourcemap along with the CSS output. Using the `source`\n  option of `css.parse` is strongly recommended when creating a source map.\n  Specify `sourcemap: 'generator'` to return the SourceMapGenerator object\n  instead of serializing the source map.\n- inputSourcemaps: (enabled by default, specify `false` to disable) reads any\n  source maps referenced by the input files when generating the output source\n  map. When enabled, file system access may be required for reading the\n  referenced source maps.\n\n### Example\n\n```js\nvar ast = css.parse('body { font-size: 12px; }', { source: 'source.css' });\n\nvar css = css.stringify(ast);\n\nvar result = css.stringify(ast, { sourcemap: true });\nresult.code // string with CSS\nresult.map // source map object\n```\n\n### Errors\n\nErrors thrown during parsing have the following properties:\n\n- message: `String`. The full error message with the source position.\n- reason: `String`. The error message without position.\n- filename: `String` or `undefined`. The value of `options.source` if\n  passed to `css.parse`. Otherwise `undefined`.\n- line: `Integer`.\n- column: `Integer`.\n- source: `String`. The portion of code that couldn't be parsed.\n\nWhen parsing with the `silent` option, errors are listed in the\n`parsingErrors` property of the [`stylesheet`](#stylesheet) node instead\nof being thrown.\n\nIf you create any errors in plugins such as in\n[rework](https://github.com/reworkcss/rework), you __must__ set the same\nproperties for consistency.\n\n## AST\n\nInteractively explore the AST with <http://iamdustan.com/reworkcss_ast_explorer/>.\n\n### Common properties\n\nAll nodes have the following properties.\n\n#### position\n\nInformation about the position in the source string that corresponds to\nthe node.\n\n`Object`:\n\n- start: `Object`:\n  - line: `Number`.\n  - column: `Number`.\n- end: `Object`:\n  - line: `Number`.\n  - column: `Number`.\n- source: `String` or `undefined`. The value of `options.source` if passed to\n  `css.parse`. Otherwise `undefined`.\n- content: `String`. The full source string passed to `css.parse`.\n\nThe line and column numbers are 1-based: The first line is 1 and the first\ncolumn of a line is 1 (not 0).\n\nThe `position` property lets you know from which source file the node comes\nfrom (if available), what that file contains, and what part of that file was\nparsed into the node.\n\n#### type\n\n`String`. The possible values are the ones listed in the Types section below.\n\n#### parent\n\nA reference to the parent node, or `null` if the node has no parent.\n\n### Types\n\nThe available values of `node.type` are listed below, as well as the available\nproperties of each node (other than the common properties listed above.)\n\n#### stylesheet\n\nThe root node returned by `css.parse`.\n\n- stylesheet: `Object`:\n  - rules: `Array` of nodes with the types `rule`, `comment` and any of the\n    at-rule types.\n  - parsingErrors: `Array` of `Error`s. Errors collected during parsing when\n    option `silent` is true.\n\n#### rule\n\n- selectors: `Array` of `String`s. The list of selectors of the rule, split\n  on commas. Each selector is trimmed from whitespace and comments.\n- declarations: `Array` of nodes with the types `declaration` and `comment`.\n\n#### declaration\n\n- property: `String`. The property name, trimmed from whitespace and\n  comments. May not be empty.\n- value: `String`. The value of the property, trimmed from whitespace and\n  comments. Empty values are allowed.\n\n#### comment\n\nA rule-level or declaration-level comment. Comments inside selectors,\nproperties and values etc. are lost.\n\n- comment: `String`. The part between the starting `/*` and the ending `*/`\n  of the comment, including whitespace.\n\n#### charset\n\nThe `@charset` at-rule.\n\n- charset: `String`. The part following `@charset `.\n\n#### custom-media\n\nThe `@custom-media` at-rule.\n\n- name: `String`. The `--`-prefixed name.\n- media: `String`. The part following the name.\n\n#### document\n\nThe `@document` at-rule.\n\n- document: `String`. The part following `@document `.\n- vendor: `String` or `undefined`. The vendor prefix in `@document`, or\n  `undefined` if there is none.\n- rules: `Array` of nodes with the types `rule`, `comment` and any of the\n  at-rule types.\n\n#### font-face\n\nThe `@font-face` at-rule.\n\n- declarations: `Array` of nodes with the types `declaration` and `comment`.\n\n#### host\n\nThe `@host` at-rule.\n\n- rules: `Array` of nodes with the types `rule`, `comment` and any of the\n  at-rule types.\n\n#### import\n\nThe `@import` at-rule.\n\n- import: `String`. The part following `@import `.\n\n#### keyframes\n\nThe `@keyframes` at-rule.\n\n- name: `String`. The name of the keyframes rule.\n- vendor: `String` or `undefined`. The vendor prefix in `@keyframes`, or\n  `undefined` if there is none.\n- keyframes: `Array` of nodes with the types `keyframe` and `comment`.\n\n#### keyframe\n\n- values: `Array` of `String`s. The list of “selectors” of the keyframe rule,\n  split on commas. Each “selector” is trimmed from whitespace.\n- declarations: `Array` of nodes with the types `declaration` and `comment`.\n\n#### media\n\nThe `@media` at-rule.\n\n- media: `String`. The part following `@media `.\n- rules: `Array` of nodes with the types `rule`, `comment` and any of the\n  at-rule types.\n\n#### namespace\n\nThe `@namespace` at-rule.\n\n- namespace: `String`. The part following `@namespace `.\n\n#### page\n\nThe `@page` at-rule.\n\n- selectors: `Array` of `String`s. The list of selectors of the rule, split\n  on commas. Each selector is trimmed from whitespace and comments.\n- declarations: `Array` of nodes with the types `declaration` and `comment`.\n\n#### supports\n\nThe `@supports` at-rule.\n\n- supports: `String`. The part following `@supports `.\n- rules: `Array` of nodes with the types `rule`, `comment` and any of the\n  at-rule types.\n\n### Example\n\nCSS:\n\n```css\nbody {\n  background: #eee;\n  color: #888;\n}\n```\n\nParse tree:\n\n```json\n{\n  \"type\": \"stylesheet\",\n  \"stylesheet\": {\n    \"rules\": [\n      {\n        \"type\": \"rule\",\n        \"selectors\": [\n          \"body\"\n        ],\n        \"declarations\": [\n          {\n            \"type\": \"declaration\",\n            \"property\": \"background\",\n            \"value\": \"#eee\",\n            \"position\": {\n              \"start\": {\n                \"line\": 2,\n                \"column\": 3\n              },\n              \"end\": {\n                \"line\": 2,\n                \"column\": 19\n              }\n            }\n          },\n          {\n            \"type\": \"declaration\",\n            \"property\": \"color\",\n            \"value\": \"#888\",\n            \"position\": {\n              \"start\": {\n                \"line\": 3,\n                \"column\": 3\n              },\n              \"end\": {\n                \"line\": 3,\n                \"column\": 14\n              }\n            }\n          }\n        ],\n        \"position\": {\n          \"start\": {\n            \"line\": 1,\n            \"column\": 1\n          },\n          \"end\": {\n            \"line\": 4,\n            \"column\": 2\n          }\n        }\n      }\n    ]\n  }\n}\n```\n\n## License\n\nMIT\n",
		"readmeFilename": "Readme.md",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/reworkcss/css.git"
		},
		"scripts": {
			"benchmark": "matcha",
			"test": "mocha --require should --reporter spec --bail test/*.js"
		},
		"version": "2.2.1"
	};

/***/ },

/***/ "./src/parsers/css/transformers/postcss/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "import * as postcss from 'postcss';\n\nexport default postcss.plugin('postcss-reverse-props', (options = {}) => {\n    // Work with options here\n    return css => {\n        // Transform CSS AST here\n        css.walkRules(rule => {\n            // Transform each rule here\n            rule.walkDecls(decl => {\n                // Transform each property declaration here\n                decl.prop = decl.prop.split('').reverse().join('');\n            });\n        });\n    };\n});\n"

/***/ },

/***/ "./src/parsers/css/transformers/postcss/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsCompileModule = __webpack_require__("./src/parsers/utils/compileModule.js");
	
	var _utilsCompileModule2 = _interopRequireDefault(_utilsCompileModule);
	
	var _postcssPackageJson = __webpack_require__("./node_modules/postcss/package.json");
	
	var _postcssPackageJson2 = _interopRequireDefault(_postcssPackageJson);
	
	var ID = 'postcss';
	
	exports['default'] = {
	  id: ID,
	  displayName: ID,
	  version: _postcssPackageJson2['default'].version,
	  homepage: _postcssPackageJson2['default'].homepage,
	
	  defaultParserID: 'postcss',
	
	  loadTransformer: function loadTransformer(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/postcss/lib/postcss.js"), __webpack_require__("./node_modules/babel-core/index.js")]; (function (postcss, babel) {
	      callback({ postcss: postcss, babel: babel });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(6, __WEBPACK_CALLBACK__);}());
	  },
	
	  transform: function transform(_ref, transformCode, code) {
	    var postcss = _ref.postcss;
	    var babel = _ref.babel;
	
	    var transform = (0, _utilsCompileModule2['default'])( // eslint-disable-line no-shadow
	    babel.transform(transformCode).code, {
	      require: function require(name) {
	        switch (name) {
	          case 'postcss':
	            return postcss;
	          default:
	            throw new Error('Cannot find module \'' + name + '\'');
	        }
	      }
	    });
	    return postcss([(transform['default'] || transform)()]).process(code).css;
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ "./src/parsers/utils/compileModule.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toConsumableArray = __webpack_require__("./node_modules/babel-runtime/helpers/to-consumable-array.js")['default'];
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = compileModule;
	
	function compileModule(code) {
	  var globals = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  var exports = {};
	  var module = { exports: exports };
	  var globalNames = _Object$keys(globals);
	  var keys = ['module', 'exports'].concat(_toConsumableArray(globalNames));
	  var values = [module, exports].concat(_toConsumableArray(globalNames.map(function (key) {
	    return globals[key];
	  })));
	  new Function(keys.join(), code).apply(exports, values);
	  return module.exports;
	}
	
	module.exports = exports['default'];

/***/ },

/***/ "./src/parsers/graphql/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "# Paste or drop some GraphQL queries or schema\n# definitions here and explore the syntax tree\n# created by the GraphQL parser.\n\nquery GetUser($userId: ID!) {\n  user(id: $userId) {\n    id,\n    name,\n    isViewerFriend,\n    profilePicture(size: 50)  {\n      ...PictureFragment\n    }\n  }\n}\n\nfragment PictureFragment on Picture {\n  uri,\n  width,\n  height\n}\n"

/***/ },

/***/ "./src/parsers/graphql/graphql-js.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _graphqlPackageJson = __webpack_require__("./node_modules/graphql/package.json");
	
	var _graphqlPackageJson2 = _interopRequireDefault(_graphqlPackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'graphql-js';
	var options = _extends({
	  noLocation: false,
	  noSource: false
	}, LocalStorage.getParserSettings(ID));
	
	var settings = _Object$keys(options);
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _graphqlPackageJson2['default'].version,
	  homepage: _graphqlPackageJson2['default'].homepage,
	  locationProps: new _Set(['loc']),
	
	  loadParser: function loadParser(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/graphql/language/index.js")]; (function (_ref) {
	      var parse = _ref.parse;
	
	      callback({ parse: parse });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(7, __WEBPACK_CALLBACK__);}());
	  },
	
	  parse: function parse(_ref2, code) {
	    var _parse = _ref2.parse;
	
	    return _parse(code, options);
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    if (node.loc) {
	      return [node.loc.start, node.loc.end];
	    }
	  },
	
	  getNodeName: function getNodeName(node) {
	    return node.kind;
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'definitions';
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      values: options,
	      onChange: changeOption
	    });
	  }
	});
	
	function changeOption(name, _ref3) {
	  var target = _ref3.target;
	
	  options[name] = target.checked;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/graphql/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"graphql@0.4.18",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "graphql@0.4.18",
		"_id": "graphql@0.4.18",
		"_inCache": true,
		"_installable": true,
		"_location": "/graphql",
		"_nodeVersion": "5.6.0",
		"_npmOperationalInternal": {
			"host": "packages-9-west.internal.npmjs.com",
			"tmp": "tmp/graphql-0.4.18.tgz_1455760186695_0.47671561944298446"
		},
		"_npmUser": {
			"email": "lee@leebyron.com",
			"name": "leebyron"
		},
		"_npmVersion": "3.6.0",
		"_phantomChildren": {},
		"_requested": {
			"name": "graphql",
			"raw": "graphql@0.4.18",
			"rawSpec": "0.4.18",
			"scope": null,
			"spec": "0.4.18",
			"type": "version"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/graphql/-/graphql-0.4.18.tgz",
		"_shasum": "80b923f2d801e5373df99316b9c5829f206c482c",
		"_shrinkwrap": null,
		"_spec": "graphql@0.4.18",
		"_where": "/Users/fkling/git/astexplorer",
		"bugs": {
			"url": "https://github.com/graphql/graphql-js/issues"
		},
		"contributors": [
			{
				"name": "Lee Byron",
				"email": "lee@leebyron.com",
				"url": "http://leebyron.com/"
			},
			{
				"name": "Nicholas Schrock",
				"email": "schrockn@fb.com"
			},
			{
				"name": "Daniel Schafer",
				"email": "dschafer@fb.com"
			}
		],
		"dependencies": {
			"babel-runtime": "^5.8.x"
		},
		"description": "A Query Language and Runtime which can target any service.",
		"devDependencies": {
			"babel": "5.8.21",
			"babel-core": "5.8.22",
			"babel-eslint": "4.1.7",
			"chai": "3.4.1",
			"chai-subset": "1.1.0",
			"coveralls": "2.11.4",
			"eslint": "1.10.1",
			"eslint-plugin-babel": "^2.1.1",
			"flow-bin": "0.20.1",
			"isparta": "3.0.3",
			"mocha": "2.3.4",
			"sane": "1.3.0"
		},
		"directories": {},
		"dist": {
			"shasum": "80b923f2d801e5373df99316b9c5829f206c482c",
			"tarball": "http://registry.npmjs.org/graphql/-/graphql-0.4.18.tgz"
		},
		"gitHead": "75e7be00285a5aa3b1ef3397a4e544148d9b1660",
		"homepage": "https://github.com/graphql/graphql-js",
		"license": "BSD-3-Clause",
		"main": "index.js",
		"maintainers": [
			{
				"name": "leebyron",
				"email": "lee@leebyron.com"
			},
			{
				"name": "dschafer",
				"email": "dschafer@fb.com"
			},
			{
				"name": "schrockn",
				"email": "schrockn@gmail.com"
			}
		],
		"name": "graphql",
		"optionalDependencies": {},
		"options": {
			"mocha": "--require resources/mocha-bootload src/**/__tests__/**/*.js"
		},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+ssh://git@github.com/graphql/graphql-js.git"
		},
		"scripts": {
			"build": "babel src --optional runtime --ignore __tests__ --out-dir dist/ && cp package.json dist/",
			"check": "flow check",
			"cover": "babel-node node_modules/.bin/isparta cover --root src --report html node_modules/.bin/_mocha -- $npm_package_options_mocha",
			"cover:lcov": "babel-node node_modules/.bin/isparta cover --root src --report lcovonly node_modules/.bin/_mocha -- $npm_package_options_mocha",
			"lint": "eslint src",
			"prepublish": ". ./resources/prepublish.sh",
			"preversion": ". ./resources/checkgit.sh && npm test",
			"t": "mocha --require resources/mocha-bootload",
			"test": "npm run lint && npm run check && npm run testonly",
			"testonly": "mocha $npm_package_options_mocha",
			"watch": "babel --optional runtime resources/watch.js | node"
		},
		"version": "0.4.18"
	};

/***/ },

/***/ "./src/parsers/graphql/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	__webpack_require__("./node_modules/codemirror-graphql/mode.js");
	
	var id = 'graphql';
	exports.id = id;
	var displayName = 'GraphQL';
	exports.displayName = displayName;
	var mimeTypes = ['application/graphql'];
	exports.mimeTypes = mimeTypes;

/***/ },

/***/ "./node_modules/codemirror-graphql/mode.js":
/***/ function(module, exports, __webpack_require__) {

	/**
	 *  Copyright (c) 2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _codemirror = __webpack_require__("./node_modules/codemirror/lib/codemirror.js");
	
	var _codemirror2 = _interopRequireDefault(_codemirror);
	
	/**
	 * The GraphQL mode is defined as a tokenizer along with a list of rules, each
	 * of which is either a function or an array.
	 *
	 *   * Function: Provided a token and the stream, returns an expected next step.
	 *   * Array: A list of steps to take in order.
	 *
	 * A step is either another rule, or a terminal description of a token. If it
	 * is a rule, that rule is pushed onto the stack and the parsing continues from
	 * that point.
	 *
	 * If it is a terminal description, the token is checked against it using a
	 * `match` function. If the match is successful, the token is colored and the
	 * rule is stepped forward. If the match is unsuccessful, the remainder of the
	 * rule is skipped and the previous rule is advanced.
	 *
	 * This parsing algorithm allows for incremental online parsing within various
	 * levels of the syntax tree and results in a structured `state` linked-list
	 * which contains the relevant information to produce valuable typeaheads.
	 */
	_codemirror2['default'].defineMode('graphql', function (config) {
	  return {
	    config: config,
	    token: getToken,
	    indent: indent,
	    startState: function startState() {
	      var initialState = { level: 0 };
	      pushRule(initialState, 'Document');
	      return initialState;
	    },
	    electricInput: /^\s*[})\]]/,
	    fold: 'brace',
	    lineComment: '#',
	    closeBrackets: {
	      pairs: '()[]{}""',
	      explode: '()[]{}'
	    }
	  };
	});
	
	function getToken(stream, state) {
	  if (state.needsAdvance) {
	    state.needsAdvance = false;
	    advanceRule(state);
	  }
	
	  // Remember initial indentation
	  if (stream.sol()) {
	    state.indentLevel = Math.floor(stream.indentation() / this.config.tabSize);
	  }
	
	  // Consume spaces and ignored characters
	  if (stream.eatSpace() || stream.eatWhile(',')) {
	    return null;
	  }
	
	  // Tokenize line comment
	  if (stream.match(this.lineComment)) {
	    stream.skipToEnd();
	    return 'comment';
	  }
	
	  // Lex a token from the stream
	  var token = lex(stream);
	
	  // If there's no matching token, skip ahead.
	  if (!token) {
	    stream.match(/\w+|./);
	    return 'invalidchar';
	  }
	
	  // Save state before continuing.
	  saveState(state);
	
	  // Handle changes in expected indentation level
	  if (token.kind === 'Punctuation') {
	    if (/^[{([]/.test(token.value)) {
	      // Push on the stack of levels one level deeper than the current level.
	      state.levels = (state.levels || []).concat(state.indentLevel + 1);
	    } else if (/^[})\]]/.test(token.value)) {
	      // Pop from the stack of levels.
	      // If the top of the stack is lower than the current level, lower the
	      // current level to match.
	      var levels = state.levels = (state.levels || []).slice(0, -1);
	      if (levels.length > 0 && levels[levels.length - 1] < state.indentLevel) {
	        state.indentLevel = levels[levels.length - 1];
	      }
	    }
	  }
	
	  while (state.rule) {
	    // If this is a forking rule, determine what rule to use based on
	    // the current token, otherwise expect based on the current step.
	    var expected = typeof state.rule === 'function' ? state.step === 0 ? state.rule(token, stream) : null : state.rule[state.step];
	
	    if (expected) {
	      // Un-wrap optional/list ParseRules.
	      if (expected.ofRule) {
	        expected = expected.ofRule;
	      }
	
	      // A string represents a Rule
	      if (typeof expected === 'string') {
	        pushRule(state, expected);
	        continue;
	      }
	
	      // Otherwise, match a Terminal.
	      if (expected.match && expected.match(token)) {
	        if (expected.update) {
	          expected.update(state, token);
	        }
	        // If this token was a punctuator, advance the parse rule, otherwise
	        // mark the state to be advanced before the next token. This ensures
	        // that tokens which can be appended to keep the appropriate state.
	        if (token.kind === 'Punctuation') {
	          advanceRule(state);
	        } else {
	          state.needsAdvance = true;
	        }
	        return expected.style;
	      }
	    }
	
	    unsuccessful(state);
	  }
	
	  // The parser does not know how to interpret this token, do not affect state.
	  restoreState(state);
	  return 'invalidchar';
	}
	
	function indent(state, textAfter) {
	  var levels = state.levels;
	  // If there is no stack of levels, use the current level.
	  // Otherwise, use the top level, pre-emptively dedenting for close braces.
	  var level = !levels || levels.length === 0 ? state.indentLevel : levels[levels.length - 1] - (this.electricInput.test(textAfter) ? 1 : 0);
	  return level * this.config.indentUnit;
	}
	
	function assign(to, from) {
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}
	
	var stateCache = {};
	
	// Save the current state in the cache.
	function saveState(state) {
	  assign(stateCache, state);
	}
	
	// Restore from the state cache.
	function restoreState(state) {
	  assign(state, stateCache);
	}
	
	// Push a new rule onto the state.
	function pushRule(state, ruleKind) {
	  state.prevState = assign({}, state);
	  state.kind = ruleKind;
	  state.name = null;
	  state.type = null;
	  state.rule = ParseRules[ruleKind];
	  state.step = 0;
	}
	
	// Pop the current rule from the state.
	function popRule(state) {
	  state.kind = state.prevState.kind;
	  state.name = state.prevState.name;
	  state.type = state.prevState.type;
	  state.rule = state.prevState.rule;
	  state.step = state.prevState.step;
	  state.prevState = state.prevState.prevState;
	}
	
	// Advance the step of the current rule.
	function advanceRule(state) {
	  // Advance the step in the rule. If the rule is completed, pop
	  // the rule and advance the parent rule as well (recursively).
	  state.step++;
	  while (state.rule && !(Array.isArray(state.rule) && state.step < state.rule.length)) {
	    popRule(state);
	    // Do not advance a List step so it has the opportunity to repeat itself.
	    if (state.rule && !(Array.isArray(state.rule) && state.rule[state.step].isList)) {
	      state.step++;
	    }
	  }
	}
	
	// Unwind the state after an unsuccessful match.
	function unsuccessful(state) {
	  // Fall back to the parent rule until you get to an optional or list rule or
	  // until the entire stack of rules is empty.
	  while (state.rule && !(Array.isArray(state.rule) && state.rule[state.step].ofRule)) {
	    popRule(state);
	  }
	
	  // If there is still a rule, it must be an optional or list rule.
	  // Consider this rule a success so that we may move past it.
	  if (state.rule) {
	    advanceRule(state);
	  }
	}
	
	// Given a stream, returns a { kind, value } pair, or null.
	function lex(stream) {
	  var kinds = Object.keys(LexRules);
	  for (var i = 0; i < kinds.length; i++) {
	    var match = stream.match(LexRules[kinds[i]]);
	    if (match) {
	      return { kind: kinds[i], value: match[0] };
	    }
	  }
	}
	
	// An constraint described as `but not` in the GraphQL spec.
	function butNot(rule, exclusions) {
	  var ruleMatch = rule.match;
	  rule.match = function (token) {
	    return ruleMatch(token) && exclusions.every(function (exclusion) {
	      return !exclusion.match(token);
	    });
	  };
	  return rule;
	}
	
	// An optional rule.
	function opt(ofRule) {
	  return { ofRule: ofRule };
	}
	
	// A list of another rule.
	function list(ofRule) {
	  return { ofRule: ofRule, isList: true };
	}
	
	// Token of a kind
	function t(kind, style) {
	  return { style: style, match: function match(token) {
	      return token.kind === kind;
	    } };
	}
	
	// Punctuator
	function p(value, style) {
	  return {
	    style: style || 'punctuation',
	    match: function match(token) {
	      return token.kind === 'Punctuation' && token.value === value;
	    }
	  };
	}
	
	// A keyword Token
	function word(value) {
	  return {
	    style: 'keyword',
	    match: function match(token) {
	      return token.kind === 'Name' && token.value === value;
	    }
	  };
	}
	
	// A Name Token which will decorate the state with a `name`
	function name(style) {
	  return {
	    style: style,
	    match: function match(token) {
	      return token.kind === 'Name';
	    },
	    update: function update(state, token) {
	      state.name = token.value;
	    }
	  };
	}
	
	// A Name Token which will decorate the previous state with a `type`
	function type(style) {
	  return {
	    style: style,
	    match: function match(token) {
	      return token.kind === 'Name';
	    },
	    update: function update(state, token) {
	      state.prevState.type = token.value;
	    }
	  };
	}
	
	/**
	 * The lexer rules. These are exactly as described by the spec.
	 */
	var LexRules = {
	  // The Name token.
	  Name: /^[_A-Za-z][_0-9A-Za-z]*/,
	
	  // All Punctuation used in GraphQL
	  Punctuation: /^(?:!|\$|\(|\)|\.\.\.|:|=|@|\[|\]|\{|\})/,
	
	  // Combines the IntValue and FloatValue tokens.
	  Number: /^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,
	
	  // Note the closing quote is made optional as an IDE experience improvment.
	  String: /^"(?:[^"\\]|\\(?:b|f|n|r|t|u[0-9a-fA-F]{4}))*"?/
	};
	
	/**
	 * The parser rules. These are very close to, but not exactly the same as the
	 * spec. Minor deviations allow for a simpler implementation. The resulting
	 * parser can parse everything the spec declares possible.
	 */
	var ParseRules = {
	  Document: [list('Definition')],
	  Definition: function Definition(token) {
	    switch (token.value) {
	      case 'query':
	        return 'Query';
	      case 'mutation':
	        return 'Mutation';
	      case 'subscription':
	        return 'Subscription';
	      case 'fragment':
	        return 'FragmentDefinition';
	      case '{':
	        return 'ShortQuery';
	    }
	  },
	  // Note: instead of "Operation", these rules have been separated out.
	  Query: [word('query'), opt(name('def')), opt('VariableDefinitions'), list('Directive'), 'SelectionSet'],
	  ShortQuery: ['SelectionSet'],
	  Mutation: [word('mutation'), opt(name('def')), opt('VariableDefinitions'), list('Directive'), 'SelectionSet'],
	  Subscription: [word('subscription'), opt(name('def')), opt('VariableDefinitions'), list('Directive'), 'SelectionSet'],
	  VariableDefinitions: [p('('), list('VariableDefinition'), p(')')],
	  VariableDefinition: ['Variable', p(':'), 'Type', opt('DefaultValue')],
	  Variable: [p('$', 'variable'), name('variable')],
	  DefaultValue: [p('='), 'Value'],
	  SelectionSet: [p('{'), list('Selection'), p('}')],
	  Selection: function Selection(token, stream) {
	    return token.value === '...' ? stream.match(/[\s\u00a0,]*(on\b|@|{)/, false) ? 'InlineFragment' : 'FragmentSpread' : stream.match(/[\s\u00a0,]*:/, false) ? 'AliasedField' : 'Field';
	  },
	  // Note: this minor deviation of "AliasedField" simplifies the lookahead.
	  AliasedField: [name('qualifier'), p(':'), 'Field'],
	  Field: [name('property'), opt('Arguments'), list('Directive'), opt('SelectionSet')],
	  Arguments: [p('('), list('Argument'), p(')')],
	  Argument: [name('attribute'), p(':'), 'Value'],
	  FragmentSpread: [p('...'), name('def'), list('Directive')],
	  InlineFragment: [p('...'), opt('TypeCondition'), list('Directive'), 'SelectionSet'],
	  FragmentDefinition: [word('fragment'), opt(butNot(name('def'), [word('on')])), 'TypeCondition', list('Directive'), 'SelectionSet'],
	  TypeCondition: [word('on'), type('atom')],
	  // Variables could be parsed in cases where only Const is expected by spec.
	  Value: function Value(token) {
	    switch (token.kind) {
	      case 'Number':
	        return 'NumberValue';
	      case 'String':
	        return 'StringValue';
	      case 'Punctuation':
	        switch (token.value) {
	          case '[':
	            return 'ListValue';
	          case '{':
	            return 'ObjectValue';
	          case '$':
	            return 'Variable';
	        }
	        return null;
	      case 'Name':
	        switch (token.value) {
	          case 'true':case 'false':
	            return 'BooleanValue';
	        }
	        return 'EnumValue';
	    }
	  },
	  NumberValue: [t('Number', 'number')],
	  StringValue: [t('String', 'string')],
	  BooleanValue: [t('Name', 'builtin')],
	  EnumValue: [name('string-2')],
	  ListValue: [p('['), list('Value'), p(']')],
	  ObjectValue: [p('{'), list('ObjectField'), p('}')],
	  ObjectField: [name('attribute'), p(':'), 'Value'],
	  Type: function Type(token) {
	    return token.value === '[' ? 'ListType' : 'NamedType';
	  },
	  // NonNullType has been merged into ListType and NamedType to simplify.
	  ListType: [p('['), 'NamedType', p(']'), opt(p('!'))],
	  NamedType: [name('atom'), opt(p('!'))],
	  Directive: [p('@', 'meta'), name('meta'), opt('Arguments')]
	};

/***/ },

/***/ "./src/parsers/html/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html>\n\n<body>\n    <h1>My First Heading</h1>\n    <p>My first paragraph.</p>\n</body>\n\n</html>\n"

/***/ },

/***/ "./src/parsers/html/htmlparser2.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _htmlparser2PackageJson = __webpack_require__("./node_modules/htmlparser2/package.json");
	
	var _htmlparser2PackageJson2 = _interopRequireDefault(_htmlparser2PackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'htmlparser2';
	var options = _extends({
	  xmlMode: false,
	  lowerCaseAttributeNames: true,
	  lowerCaseTags: true
	}, LocalStorage.getParserSettings(ID));
	
	var settings = _Object$keys(options);
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _htmlparser2PackageJson2['default'].version,
	  homepage: _htmlparser2PackageJson2['default'].homepage,
	  locationProps: new _Set(['startIndex']),
	
	  loadParser: function loadParser(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/htmlparser2/lib/Parser.js"), __webpack_require__("./node_modules/domhandler/index.js")]; (function (Parser, DomHandler) {
	      var Handler = (function (_DomHandler) {
	        _inherits(Handler, _DomHandler);
	
	        function Handler() {
	          _classCallCheck(this, Handler);
	
	          _get(Object.getPrototypeOf(Handler.prototype), 'constructor', this).call(this, { withStartIndices: true });
	        }
	
	        _createClass(Handler, [{
	          key: '_setEnd',
	          value: function _setEnd(elem) {
	            elem.endIndex = this._parser.endIndex + 1;
	          }
	        }, {
	          key: 'onprocessinginstruction',
	          value: function onprocessinginstruction(name, data) {
	            this._parser.endIndex = this._parser._tokenizer._index;
	            _get(Object.getPrototypeOf(Handler.prototype), 'onprocessinginstruction', this).call(this, name, data);
	          }
	        }, {
	          key: '_addDomElement',
	          value: function _addDomElement(elem) {
	            _get(Object.getPrototypeOf(Handler.prototype), '_addDomElement', this).call(this, elem);
	            this._setEnd(elem);
	          }
	        }]);
	
	        return Handler;
	      })(DomHandler);
	
	      Handler.prototype.onclosetag = Handler.prototype.oncommentend = Handler.prototype.oncdataend = function onElemEnd() {
	        this._setEnd(this._tagStack.pop());
	      };
	
	      callback({ Parser: Parser, Handler: Handler });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(8, __WEBPACK_CALLBACK__);}());
	  },
	
	  parse: function parse(_ref, code) {
	    var Parser = _ref.Parser;
	    var Handler = _ref.Handler;
	
	    var handler = new Handler();
	    new Parser(handler, options).end(code);
	    return handler.dom;
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    if (node.type) {
	      return [node.startIndex, node.endIndex];
	    }
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'children';
	  },
	
	  getNodeName: function getNodeName(node) {
	    var nodeName = node.type;
	    if (nodeName && node.name) {
	      nodeName += '(' + node.name + ')';
	    }
	    return nodeName;
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      required: new _Set(['xmlMode']),
	      values: options,
	      onChange: changeOption
	    });
	  },
	
	  _ignoredProperties: new _Set(['prev', 'next', 'parent', 'endIndex'])
	});
	
	function changeOption(name, _ref2) {
	  var target = _ref2.target;
	
	  options[name] = target.checked;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/htmlparser2/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"htmlparser2@https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.9.0.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "htmlparser2@>=3.9.0 <4.0.0",
		"_id": "htmlparser2@3.9.0",
		"_inCache": true,
		"_location": "/htmlparser2",
		"_phantomChildren": {},
		"_requested": {
			"name": "htmlparser2",
			"raw": "htmlparser2@https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.9.0.tgz",
			"rawSpec": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.9.0.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.9.0.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.9.0.tgz",
		"_shasum": "1bd6ba4d3358bbd31f93e13fb952961cf4d31b3f",
		"_shrinkwrap": null,
		"_spec": "htmlparser2@https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.9.0.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "me@feedic.com",
			"name": "Felix Boehm"
		},
		"browser": {
			"readable-stream": false
		},
		"bugs": {
			"url": "http://github.com/fb55/htmlparser2/issues"
		},
		"dependencies": {
			"domelementtype": "^1.3.0",
			"domhandler": "^2.3.0",
			"domutils": "^1.5.1",
			"entities": "^1.1.1",
			"readable-stream": "^2.0.2"
		},
		"description": "Fast & forgiving HTML/XML/RSS parser",
		"devDependencies": {
			"coveralls": "^2.11.4",
			"istanbul": "^0.3.18",
			"jscs": "^2.1.0",
			"jshint": "^2.8.0",
			"mocha": "^2.2.5",
			"mocha-lcov-reporter": "^0.0.2"
		},
		"directories": {
			"lib": "lib/"
		},
		"files": [
			"lib"
		],
		"homepage": "https://github.com/fb55/htmlparser2#readme",
		"jshintConfig": {
			"eqeqeq": true,
			"eqnull": true,
			"freeze": true,
			"globals": {
				"describe": true,
				"it": true
			},
			"latedef": "nofunc",
			"noarg": true,
			"node": true,
			"nonbsp": true,
			"proto": true,
			"quotmark": "double",
			"smarttabs": true,
			"trailing": true,
			"undef": true,
			"unused": true
		},
		"keywords": [
			"atom",
			"dom",
			"feed",
			"html",
			"parser",
			"rss",
			"streams",
			"xml"
		],
		"license": "MIT",
		"main": "lib/index.js",
		"name": "htmlparser2",
		"optionalDependencies": {},
		"readme": "# htmlparser2\n\n[![NPM version](http://img.shields.io/npm/v/htmlparser2.svg?style=flat)](https://npmjs.org/package/htmlparser2)\n[![Downloads](https://img.shields.io/npm/dm/htmlparser2.svg?style=flat)](https://npmjs.org/package/htmlparser2)\n[![Build Status](http://img.shields.io/travis/fb55/htmlparser2/master.svg?style=flat)](http://travis-ci.org/fb55/htmlparser2)\n[![Coverage](http://img.shields.io/coveralls/fb55/htmlparser2.svg?style=flat)](https://coveralls.io/r/fb55/htmlparser2)\n\nA forgiving HTML/XML/RSS parser. The parser can handle streams and provides a callback interface.\n\n## Installation\n\tnpm install htmlparser2\n\t\nA live demo of htmlparser2 is available [here](http://demos.forbeslindesay.co.uk/htmlparser2/).\n\n## Usage\n\n```javascript\nvar htmlparser = require(\"htmlparser2\");\nvar parser = new htmlparser.Parser({\n\tonopentag: function(name, attribs){\n\t\tif(name === \"script\" && attribs.type === \"text/javascript\"){\n\t\t\tconsole.log(\"JS! Hooray!\");\n\t\t}\n\t},\n\tontext: function(text){\n\t\tconsole.log(\"-->\", text);\n\t},\n\tonclosetag: function(tagname){\n\t\tif(tagname === \"script\"){\n\t\t\tconsole.log(\"That's it?!\");\n\t\t}\n\t}\n}, {decodeEntities: true});\nparser.write(\"Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>\");\nparser.end();\n```\n\nOutput (simplified):\n\n```javascript\n--> Xyz \nJS! Hooray!\n--> var foo = '<<bar>>';\nThat's it?!\n```\n\n## Documentation\n\nRead more about the parser and its options in the [wiki](https://github.com/fb55/htmlparser2/wiki/Parser-options).\n\n## Get a DOM\nThe `DomHandler` (known as `DefaultHandler` in the original `htmlparser` module) produces a DOM (document object model) that can be manipulated using the [`DomUtils`](https://github.com/fb55/DomUtils) helper.\n\nThe `DomHandler`, while still bundled with this module, was moved to its [own module](https://github.com/fb55/domhandler). Have a look at it for further information.\n\n## Parsing RSS/RDF/Atom Feeds\n\n```javascript\nnew htmlparser.FeedHandler(function(<error> error, <object> feed){\n    ...\n});\n```\n\nNote: While the provided feed handler works for most feeds, you might want to use  [danmactough/node-feedparser](https://github.com/danmactough/node-feedparser), which is much better tested and actively maintained.\n\n## Performance\n\nAfter having some artificial benchmarks for some time, __@AndreasMadsen__ published his [`htmlparser-benchmark`](https://github.com/AndreasMadsen/htmlparser-benchmark), which benchmarks HTML parses based on real-world websites.\n\nAt the time of writing, the latest versions of all supported parsers show the following performance characteristics on [Travis CI](https://travis-ci.org/AndreasMadsen/htmlparser-benchmark/builds/10805007) (please note that Travis doesn't guarantee equal conditions for all tests):\n\n```\ngumbo-parser   : 34.9208 ms/file ± 21.4238\nhtml-parser    : 24.8224 ms/file ± 15.8703\nhtml5          : 419.597 ms/file ± 264.265\nhtmlparser     : 60.0722 ms/file ± 384.844\nhtmlparser2-dom: 12.0749 ms/file ± 6.49474\nhtmlparser2    : 7.49130 ms/file ± 5.74368\nhubbub         : 30.4980 ms/file ± 16.4682\nlibxmljs       : 14.1338 ms/file ± 18.6541\nparse5         : 22.0439 ms/file ± 15.3743\nsax            : 49.6513 ms/file ± 26.6032\n```\n\n## How does this module differ from [node-htmlparser](https://github.com/tautologistics/node-htmlparser)?\n\nThis is a fork of the `htmlparser` module. The main difference is that this is intended to be used only with node (it runs on other platforms using [browserify](https://github.com/substack/node-browserify)). `htmlparser2` was rewritten multiple times and, while it maintains an API that's compatible with `htmlparser` in most cases, the projects don't share any code anymore.\n\nThe parser now provides a callback interface close to [sax.js](https://github.com/isaacs/sax-js) (originally targeted at [readabilitySAX](https://github.com/fb55/readabilitysax)). As a result, old handlers won't work anymore.\n\nThe `DefaultHandler` and the `RssHandler` were renamed to clarify their purpose (to `DomHandler` and `FeedHandler`). The old names are still available when requiring `htmlparser2`, your code should work as expected.\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git://github.com/fb55/htmlparser2.git"
		},
		"scripts": {
			"coveralls": "npm run lint && npm run lcov && (cat coverage/lcov.info | coveralls || exit 0)",
			"lcov": "istanbul cover _mocha --report lcovonly -- -R spec",
			"lint": "jshint lib test && jscs lib test",
			"test": "mocha && npm run lint"
		},
		"version": "3.9.0"
	};

/***/ },

/***/ "./src/parsers/html/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	__webpack_require__("./node_modules/codemirror/mode/htmlmixed/htmlmixed.js");
	
	var id = 'htmlmixed';
	exports.id = id;
	var displayName = 'HTML';
	exports.displayName = displayName;
	var mimeTypes = ['text/html'];
	exports.mimeTypes = mimeTypes;

/***/ },

/***/ "./node_modules/codemirror/mode/htmlmixed/htmlmixed.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"), __webpack_require__("./node_modules/codemirror/mode/xml/xml.js"), __webpack_require__("./node_modules/codemirror/mode/javascript/javascript.js"), __webpack_require__("./node_modules/codemirror/mode/css/css.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	
	  var defaultTags = {
	    script: [
	      ["lang", /(javascript|babel)/i, "javascript"],
	      ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i, "javascript"],
	      ["type", /./, "text/plain"],
	      [null, null, "javascript"]
	    ],
	    style:  [
	      ["lang", /^css$/i, "css"],
	      ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
	      ["type", /./, "text/plain"],
	      [null, null, "css"]
	    ]
	  };
	
	  function maybeBackup(stream, pat, style) {
	    var cur = stream.current(), close = cur.search(pat);
	    if (close > -1) {
	      stream.backUp(cur.length - close);
	    } else if (cur.match(/<\/?$/)) {
	      stream.backUp(cur.length);
	      if (!stream.match(pat, false)) stream.match(cur);
	    }
	    return style;
	  }
	
	  var attrRegexpCache = {};
	  function getAttrRegexp(attr) {
	    var regexp = attrRegexpCache[attr];
	    if (regexp) return regexp;
	    return attrRegexpCache[attr] = new RegExp("\\s+" + attr + "\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*");
	  }
	
	  function getAttrValue(text, attr) {
	    var match = text.match(getAttrRegexp(attr))
	    return match ? match[2] : ""
	  }
	
	  function getTagRegexp(tagName, anchored) {
	    return new RegExp((anchored ? "^" : "") + "<\/\s*" + tagName + "\s*>", "i");
	  }
	
	  function addTags(from, to) {
	    for (var tag in from) {
	      var dest = to[tag] || (to[tag] = []);
	      var source = from[tag];
	      for (var i = source.length - 1; i >= 0; i--)
	        dest.unshift(source[i])
	    }
	  }
	
	  function findMatchingMode(tagInfo, tagText) {
	    for (var i = 0; i < tagInfo.length; i++) {
	      var spec = tagInfo[i];
	      if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0]))) return spec[2];
	    }
	  }
	
	  CodeMirror.defineMode("htmlmixed", function (config, parserConfig) {
	    var htmlMode = CodeMirror.getMode(config, {
	      name: "xml",
	      htmlMode: true,
	      multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
	      multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag
	    });
	
	    var tags = {};
	    var configTags = parserConfig && parserConfig.tags, configScript = parserConfig && parserConfig.scriptTypes;
	    addTags(defaultTags, tags);
	    if (configTags) addTags(configTags, tags);
	    if (configScript) for (var i = configScript.length - 1; i >= 0; i--)
	      tags.script.unshift(["type", configScript[i].matches, configScript[i].mode])
	
	    function html(stream, state) {
	      var style = htmlMode.token(stream, state.htmlState), tag = /\btag\b/.test(style), tagName
	      if (tag && !/[<>\s\/]/.test(stream.current()) &&
	          (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) &&
	          tags.hasOwnProperty(tagName)) {
	        state.inTag = tagName + " "
	      } else if (state.inTag && tag && />$/.test(stream.current())) {
	        var inTag = /^([\S]+) (.*)/.exec(state.inTag)
	        state.inTag = null
	        var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2])
	        var mode = CodeMirror.getMode(config, modeSpec)
	        var endTagA = getTagRegexp(inTag[1], true), endTag = getTagRegexp(inTag[1], false);
	        state.token = function (stream, state) {
	          if (stream.match(endTagA, false)) {
	            state.token = html;
	            state.localState = state.localMode = null;
	            return null;
	          }
	          return maybeBackup(stream, endTag, state.localMode.token(stream, state.localState));
	        };
	        state.localMode = mode;
	        state.localState = CodeMirror.startState(mode, htmlMode.indent(state.htmlState, ""));
	      } else if (state.inTag) {
	        state.inTag += stream.current()
	        if (stream.eol()) state.inTag += " "
	      }
	      return style;
	    };
	
	    return {
	      startState: function () {
	        var state = htmlMode.startState();
	        return {token: html, inTag: null, localMode: null, localState: null, htmlState: state};
	      },
	
	      copyState: function (state) {
	        var local;
	        if (state.localState) {
	          local = CodeMirror.copyState(state.localMode, state.localState);
	        }
	        return {token: state.token, inTag: state.inTag,
	                localMode: state.localMode, localState: local,
	                htmlState: CodeMirror.copyState(htmlMode, state.htmlState)};
	      },
	
	      token: function (stream, state) {
	        return state.token(stream, state);
	      },
	
	      indent: function (state, textAfter) {
	        if (!state.localMode || /^\s*<\//.test(textAfter))
	          return htmlMode.indent(state.htmlState, textAfter);
	        else if (state.localMode.indent)
	          return state.localMode.indent(state.localState, textAfter);
	        else
	          return CodeMirror.Pass;
	      },
	
	      innerMode: function (state) {
	        return {state: state.localState || state.htmlState, mode: state.localMode || htmlMode};
	      }
	    };
	  }, "xml", "javascript", "css");
	
	  CodeMirror.defineMIME("text/html", "htmlmixed");
	});


/***/ },

/***/ "./node_modules/codemirror/mode/xml/xml.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	"use strict";
	
	var htmlConfig = {
	  autoSelfClosers: {'area': true, 'base': true, 'br': true, 'col': true, 'command': true,
	                    'embed': true, 'frame': true, 'hr': true, 'img': true, 'input': true,
	                    'keygen': true, 'link': true, 'meta': true, 'param': true, 'source': true,
	                    'track': true, 'wbr': true, 'menuitem': true},
	  implicitlyClosed: {'dd': true, 'li': true, 'optgroup': true, 'option': true, 'p': true,
	                     'rp': true, 'rt': true, 'tbody': true, 'td': true, 'tfoot': true,
	                     'th': true, 'tr': true},
	  contextGrabbers: {
	    'dd': {'dd': true, 'dt': true},
	    'dt': {'dd': true, 'dt': true},
	    'li': {'li': true},
	    'option': {'option': true, 'optgroup': true},
	    'optgroup': {'optgroup': true},
	    'p': {'address': true, 'article': true, 'aside': true, 'blockquote': true, 'dir': true,
	          'div': true, 'dl': true, 'fieldset': true, 'footer': true, 'form': true,
	          'h1': true, 'h2': true, 'h3': true, 'h4': true, 'h5': true, 'h6': true,
	          'header': true, 'hgroup': true, 'hr': true, 'menu': true, 'nav': true, 'ol': true,
	          'p': true, 'pre': true, 'section': true, 'table': true, 'ul': true},
	    'rp': {'rp': true, 'rt': true},
	    'rt': {'rp': true, 'rt': true},
	    'tbody': {'tbody': true, 'tfoot': true},
	    'td': {'td': true, 'th': true},
	    'tfoot': {'tbody': true},
	    'th': {'td': true, 'th': true},
	    'thead': {'tbody': true, 'tfoot': true},
	    'tr': {'tr': true}
	  },
	  doNotIndent: {"pre": true},
	  allowUnquoted: true,
	  allowMissing: true,
	  caseFold: true
	}
	
	var xmlConfig = {
	  autoSelfClosers: {},
	  implicitlyClosed: {},
	  contextGrabbers: {},
	  doNotIndent: {},
	  allowUnquoted: false,
	  allowMissing: false,
	  caseFold: false
	}
	
	CodeMirror.defineMode("xml", function(editorConf, config_) {
	  var indentUnit = editorConf.indentUnit
	  var config = {}
	  var defaults = config_.htmlMode ? htmlConfig : xmlConfig
	  for (var prop in defaults) config[prop] = defaults[prop]
	  for (var prop in config_) config[prop] = config_[prop]
	
	  // Return variables for tokenizers
	  var type, setStyle;
	
	  function inText(stream, state) {
	    function chain(parser) {
	      state.tokenize = parser;
	      return parser(stream, state);
	    }
	
	    var ch = stream.next();
	    if (ch == "<") {
	      if (stream.eat("!")) {
	        if (stream.eat("[")) {
	          if (stream.match("CDATA[")) return chain(inBlock("atom", "]]>"));
	          else return null;
	        } else if (stream.match("--")) {
	          return chain(inBlock("comment", "-->"));
	        } else if (stream.match("DOCTYPE", true, true)) {
	          stream.eatWhile(/[\w\._\-]/);
	          return chain(doctype(1));
	        } else {
	          return null;
	        }
	      } else if (stream.eat("?")) {
	        stream.eatWhile(/[\w\._\-]/);
	        state.tokenize = inBlock("meta", "?>");
	        return "meta";
	      } else {
	        type = stream.eat("/") ? "closeTag" : "openTag";
	        state.tokenize = inTag;
	        return "tag bracket";
	      }
	    } else if (ch == "&") {
	      var ok;
	      if (stream.eat("#")) {
	        if (stream.eat("x")) {
	          ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
	        } else {
	          ok = stream.eatWhile(/[\d]/) && stream.eat(";");
	        }
	      } else {
	        ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
	      }
	      return ok ? "atom" : "error";
	    } else {
	      stream.eatWhile(/[^&<]/);
	      return null;
	    }
	  }
	  inText.isInText = true;
	
	  function inTag(stream, state) {
	    var ch = stream.next();
	    if (ch == ">" || (ch == "/" && stream.eat(">"))) {
	      state.tokenize = inText;
	      type = ch == ">" ? "endTag" : "selfcloseTag";
	      return "tag bracket";
	    } else if (ch == "=") {
	      type = "equals";
	      return null;
	    } else if (ch == "<") {
	      state.tokenize = inText;
	      state.state = baseState;
	      state.tagName = state.tagStart = null;
	      var next = state.tokenize(stream, state);
	      return next ? next + " tag error" : "tag error";
	    } else if (/[\'\"]/.test(ch)) {
	      state.tokenize = inAttribute(ch);
	      state.stringStartCol = stream.column();
	      return state.tokenize(stream, state);
	    } else {
	      stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
	      return "word";
	    }
	  }
	
	  function inAttribute(quote) {
	    var closure = function(stream, state) {
	      while (!stream.eol()) {
	        if (stream.next() == quote) {
	          state.tokenize = inTag;
	          break;
	        }
	      }
	      return "string";
	    };
	    closure.isInAttribute = true;
	    return closure;
	  }
	
	  function inBlock(style, terminator) {
	    return function(stream, state) {
	      while (!stream.eol()) {
	        if (stream.match(terminator)) {
	          state.tokenize = inText;
	          break;
	        }
	        stream.next();
	      }
	      return style;
	    };
	  }
	  function doctype(depth) {
	    return function(stream, state) {
	      var ch;
	      while ((ch = stream.next()) != null) {
	        if (ch == "<") {
	          state.tokenize = doctype(depth + 1);
	          return state.tokenize(stream, state);
	        } else if (ch == ">") {
	          if (depth == 1) {
	            state.tokenize = inText;
	            break;
	          } else {
	            state.tokenize = doctype(depth - 1);
	            return state.tokenize(stream, state);
	          }
	        }
	      }
	      return "meta";
	    };
	  }
	
	  function Context(state, tagName, startOfLine) {
	    this.prev = state.context;
	    this.tagName = tagName;
	    this.indent = state.indented;
	    this.startOfLine = startOfLine;
	    if (config.doNotIndent.hasOwnProperty(tagName) || (state.context && state.context.noIndent))
	      this.noIndent = true;
	  }
	  function popContext(state) {
	    if (state.context) state.context = state.context.prev;
	  }
	  function maybePopContext(state, nextTagName) {
	    var parentTagName;
	    while (true) {
	      if (!state.context) {
	        return;
	      }
	      parentTagName = state.context.tagName;
	      if (!config.contextGrabbers.hasOwnProperty(parentTagName) ||
	          !config.contextGrabbers[parentTagName].hasOwnProperty(nextTagName)) {
	        return;
	      }
	      popContext(state);
	    }
	  }
	
	  function baseState(type, stream, state) {
	    if (type == "openTag") {
	      state.tagStart = stream.column();
	      return tagNameState;
	    } else if (type == "closeTag") {
	      return closeTagNameState;
	    } else {
	      return baseState;
	    }
	  }
	  function tagNameState(type, stream, state) {
	    if (type == "word") {
	      state.tagName = stream.current();
	      setStyle = "tag";
	      return attrState;
	    } else {
	      setStyle = "error";
	      return tagNameState;
	    }
	  }
	  function closeTagNameState(type, stream, state) {
	    if (type == "word") {
	      var tagName = stream.current();
	      if (state.context && state.context.tagName != tagName &&
	          config.implicitlyClosed.hasOwnProperty(state.context.tagName))
	        popContext(state);
	      if ((state.context && state.context.tagName == tagName) || config.matchClosing === false) {
	        setStyle = "tag";
	        return closeState;
	      } else {
	        setStyle = "tag error";
	        return closeStateErr;
	      }
	    } else {
	      setStyle = "error";
	      return closeStateErr;
	    }
	  }
	
	  function closeState(type, _stream, state) {
	    if (type != "endTag") {
	      setStyle = "error";
	      return closeState;
	    }
	    popContext(state);
	    return baseState;
	  }
	  function closeStateErr(type, stream, state) {
	    setStyle = "error";
	    return closeState(type, stream, state);
	  }
	
	  function attrState(type, _stream, state) {
	    if (type == "word") {
	      setStyle = "attribute";
	      return attrEqState;
	    } else if (type == "endTag" || type == "selfcloseTag") {
	      var tagName = state.tagName, tagStart = state.tagStart;
	      state.tagName = state.tagStart = null;
	      if (type == "selfcloseTag" ||
	          config.autoSelfClosers.hasOwnProperty(tagName)) {
	        maybePopContext(state, tagName);
	      } else {
	        maybePopContext(state, tagName);
	        state.context = new Context(state, tagName, tagStart == state.indented);
	      }
	      return baseState;
	    }
	    setStyle = "error";
	    return attrState;
	  }
	  function attrEqState(type, stream, state) {
	    if (type == "equals") return attrValueState;
	    if (!config.allowMissing) setStyle = "error";
	    return attrState(type, stream, state);
	  }
	  function attrValueState(type, stream, state) {
	    if (type == "string") return attrContinuedState;
	    if (type == "word" && config.allowUnquoted) {setStyle = "string"; return attrState;}
	    setStyle = "error";
	    return attrState(type, stream, state);
	  }
	  function attrContinuedState(type, stream, state) {
	    if (type == "string") return attrContinuedState;
	    return attrState(type, stream, state);
	  }
	
	  return {
	    startState: function(baseIndent) {
	      var state = {tokenize: inText,
	                   state: baseState,
	                   indented: baseIndent || 0,
	                   tagName: null, tagStart: null,
	                   context: null}
	      if (baseIndent != null) state.baseIndent = baseIndent
	      return state
	    },
	
	    token: function(stream, state) {
	      if (!state.tagName && stream.sol())
	        state.indented = stream.indentation();
	
	      if (stream.eatSpace()) return null;
	      type = null;
	      var style = state.tokenize(stream, state);
	      if ((style || type) && style != "comment") {
	        setStyle = null;
	        state.state = state.state(type || style, stream, state);
	        if (setStyle)
	          style = setStyle == "error" ? style + " error" : setStyle;
	      }
	      return style;
	    },
	
	    indent: function(state, textAfter, fullLine) {
	      var context = state.context;
	      // Indent multi-line strings (e.g. css).
	      if (state.tokenize.isInAttribute) {
	        if (state.tagStart == state.indented)
	          return state.stringStartCol + 1;
	        else
	          return state.indented + indentUnit;
	      }
	      if (context && context.noIndent) return CodeMirror.Pass;
	      if (state.tokenize != inTag && state.tokenize != inText)
	        return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
	      // Indent the starts of attribute names.
	      if (state.tagName) {
	        if (config.multilineTagIndentPastTag !== false)
	          return state.tagStart + state.tagName.length + 2;
	        else
	          return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
	      }
	      if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter)) return 0;
	      var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
	      if (tagAfter && tagAfter[1]) { // Closing tag spotted
	        while (context) {
	          if (context.tagName == tagAfter[2]) {
	            context = context.prev;
	            break;
	          } else if (config.implicitlyClosed.hasOwnProperty(context.tagName)) {
	            context = context.prev;
	          } else {
	            break;
	          }
	        }
	      } else if (tagAfter) { // Opening tag spotted
	        while (context) {
	          var grabbers = config.contextGrabbers[context.tagName];
	          if (grabbers && grabbers.hasOwnProperty(tagAfter[2]))
	            context = context.prev;
	          else
	            break;
	        }
	      }
	      while (context && context.prev && !context.startOfLine)
	        context = context.prev;
	      if (context) return context.indent + indentUnit;
	      else return state.baseIndent || 0;
	    },
	
	    electricInput: /<\/[\s\w:]+>$/,
	    blockCommentStart: "<!--",
	    blockCommentEnd: "-->",
	
	    configuration: config.htmlMode ? "html" : "xml",
	    helperType: config.htmlMode ? "html" : "xml",
	
	    skipAttribute: function(state) {
	      if (state.state == attrValueState)
	        state.state = attrState
	    }
	  };
	});
	
	CodeMirror.defineMIME("text/xml", "xml");
	CodeMirror.defineMIME("application/xml", "xml");
	if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
	  CodeMirror.defineMIME("text/html", {name: "xml", htmlMode: true});
	
	});


/***/ },

/***/ "./src/parsers/html/parse5.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _parse5PackageJson = __webpack_require__("./node_modules/parse5/package.json");
	
	var _parse5PackageJson2 = _interopRequireDefault(_parse5PackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'parse5';
	var options = _extends({
	  treeAdapter: 'default'
	}, LocalStorage.getParserSettings(ID));
	
	var settings = [['treeAdapter', ['default', 'htmlparser2']]];
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _parse5PackageJson2['default'].version,
	  homepage: _parse5PackageJson2['default'].homepage,
	  locationProps: new _Set(['__location']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(9, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/parse5/lib/parser/index.js"), __webpack_require__("./node_modules/parse5/lib/tree_adapters/default.js"), __webpack_require__("./node_modules/parse5/lib/tree_adapters/htmlparser2.js")]; (function (Parser, defaultAdapter, htmlparser2Adapter) {
	      callback({
	        Parser: Parser,
	        TreeAdapters: {
	          'default': defaultAdapter,
	          htmlparser2: htmlparser2Adapter
	        }
	      });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	  },
	
	  parse: function parse(_ref, code) {
	    var Parser = _ref.Parser;
	    var TreeAdapters = _ref.TreeAdapters;
	
	    return new Parser({
	      treeAdapter: TreeAdapters[options.treeAdapter],
	      locationInfo: true
	    }).parse(code);
	  },
	
	  getNodeName: function getNodeName(node) {
	    if (options.treeAdapter === 'htmlparser2') {
	      return node.type + (node.name && node.type !== 'root' ? '(' + node.name + ')' : '');
	    } else {
	      return node.nodeName;
	    }
	  },
	
	  nodeToRange: function nodeToRange(_ref2) {
	    var loc = _ref2.__location;
	
	    if (loc) {
	      return [loc.startOffset, loc.endOffset];
	    }
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'children' || key === 'childNodes';
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      values: options,
	      onChange: changeOption
	    });
	  },
	
	  _ignoredProperties: new _Set(['parentNode', 'prev', 'next', 'parent', 'firstChild', 'lastChild'])
	});
	
	function changeOption(name, _ref3) {
	  var target = _ref3.target;
	
	  var value = undefined;
	  switch (name) {
	    case 'treeAdapter':
	      value = target.value;
	      break;
	    default:
	      value = target.checked;
	  }
	  options[name] = value;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/parse5/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"parse5@https://registry.npmjs.org/parse5/-/parse5-2.1.5.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "parse5@>=2.0.0 <3.0.0",
		"_id": "parse5@2.1.5",
		"_inCache": true,
		"_location": "/parse5",
		"_phantomChildren": {},
		"_requested": {
			"name": "parse5",
			"raw": "parse5@https://registry.npmjs.org/parse5/-/parse5-2.1.5.tgz",
			"rawSpec": "https://registry.npmjs.org/parse5/-/parse5-2.1.5.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/parse5/-/parse5-2.1.5.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/parse5/-/parse5-2.1.5.tgz",
		"_shasum": "7a8677ade25ddac04237905f7be54645572dcf05",
		"_shrinkwrap": null,
		"_spec": "parse5@https://registry.npmjs.org/parse5/-/parse5-2.1.5.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "ifaaan@gmail.com",
			"name": "Ivan Nikulin",
			"url": "https://github.com/inikulin"
		},
		"bugs": {
			"url": "https://github.com/inikulin/parse5/issues"
		},
		"contributors": [
			{
				"name": "Alan Clarke",
				"url": "https://github.com/alanclarke"
			},
			{
				"name": "Evan You",
				"url": "http://evanyou.me"
			},
			{
				"name": "Saksham Aggarwal",
				"email": "s.agg2021@gmail.com"
			},
			{
				"name": "Sebastian Mayr",
				"email": "sebmaster16@gmail.com",
				"url": "http://blog.smayr.name"
			},
			{
				"name": "Sean Lang",
				"email": "slang800@gmail.com",
				"url": "http://slang.cx"
			}
		],
		"dependencies": {},
		"description": "WHATWG HTML5 specification-compliant, fast and ready for production HTML parsing/serialization toolset for Node.js",
		"devDependencies": {
			"del": "^2.0.2",
			"gulp": "^3.9.0",
			"gulp-benchmark": "^1.1.1",
			"gulp-concat": "^2.6.0",
			"gulp-download": "0.0.1",
			"gulp-eslint": "^1.0.0",
			"gulp-insert": "^0.5.0",
			"gulp-install": "^0.5.0",
			"gulp-jsdoc-to-markdown": "^1.1.1",
			"gulp-mocha": "^2.1.3",
			"gulp-rename": "^1.2.2",
			"promise": "^7.0.4",
			"publish-please": "^1.1.0",
			"through2": "^2.0.0"
		},
		"files": [
			"lib"
		],
		"homepage": "https://github.com/inikulin/parse5",
		"keywords": [
			"WHATWG",
			"fast",
			"html",
			"html parser",
			"html serializer",
			"html5",
			"html5 parser",
			"htmlparser",
			"htmlserializer",
			"parse",
			"parse5",
			"parser",
			"sax",
			"serialize",
			"serializer",
			"simple api",
			"specification",
			"tokenize",
			"tokenizer"
		],
		"license": "MIT",
		"main": "./lib/index.js",
		"name": "parse5",
		"optionalDependencies": {},
		"readme": "<p align=\"center\">\n    <a href=\"https://github.com/inikulin/parse5\">\n        <img src=\"https://raw.github.com/inikulin/parse5/master/docs/logo.png\" alt=\"parse5\" />\n    </a>\n</p>\n\n<p align=\"center\">\n<i>WHATWG HTML5 specification-compliant, fast and ready for production HTML parsing/serialization toolset for Node.js</i>\n</p>\n\n<p align=\"center\">\n  <a href=\"https://travis-ci.org/inikulin/parse5\"><img alt=\"Build Status\" src=\"https://api.travis-ci.org/inikulin/parse5.svg\"></a>\n  <a href=\"https://www.npmjs.com/package/parse5\"><img alt=\"NPM Version\" src=\"https://img.shields.io/npm/v/parse5.svg\"></a>\n  <a href=\"https://npmjs.org/package/parse5\"><img alt=\"Downloads\" src=\"http://img.shields.io/npm/dm/parse5.svg\"></a>\n  <a href=\"https://npmjs.org/package/parse5\"><img alt=\"Downloads total\" src=\"http://img.shields.io/npm/dt/parse5.svg\"></a>\n</p>\n\n<p align=\"center\">\n<b><i>parse5</i></b> provides nearly everything you may need when dealing with HTML. It's the fastest spec-compliant HTML parser\nfor Node to date. It parses HTML the way the latest version of your browser does. It has proven itself reliable in such projects\nas <a href=\"https://github.com/tmpvar/jsdom\">jsdom</a>, <a href=\"https://github.com/angular/angular\">Angular2</a>, <a href=\"https://www.polymer-project.org\">Polymer</a> and many more.\n</p>\n\n----\n\n<p align=\"center\">\n  <a href=\"https://github.com/inikulin/parse5/wiki/Documentation\">Documentation</a>\n</p>\n\n<p align=\"center\">\n  <a href=\"https://github.com/inikulin/parse5/wiki/Documentation#version-history\">Version history</a>\n</p>\n\n<p align=\"center\">\n  <a href=\"http://astexplorer.net/#/1CHlCXc4n4\">Online playground</a>\n</p>\n\n<p align=\"center\">\n  <a href=\"https://github.com/inikulin/parse5/issues\">Issue tracker</a>\n</p>\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git://github.com/inikulin/parse5.git"
		},
		"scripts": {
			"test": "gulp test"
		},
		"version": "2.1.5"
	};

/***/ },

/***/ "./src/parsers/js/acorn.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDefaultESTreeParserInterface = __webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js");
	
	var _utilsDefaultESTreeParserInterface2 = _interopRequireDefault(_utilsDefaultESTreeParserInterface);
	
	var _acornPackageJson = __webpack_require__("./node_modules/acorn/package.json");
	
	var _acornPackageJson2 = _interopRequireDefault(_acornPackageJson);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var ID = 'acorn';
	var options = _extends({
	  ecmaVersion: 6,
	  ranges: true,
	  sourceType: 'module',
	  'plugins.jsx': true
	}, LocalStorage.getParserSettings(ID));
	
	exports['default'] = _extends({}, _utilsDefaultESTreeParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: '' + _acornPackageJson2['default'].version,
	  homepage: _acornPackageJson2['default'].homepage,
	  locationProps: new _Set(['range', 'loc', 'start', 'end']),
	
	  loadParser: function loadParser(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/acorn/dist/acorn.js"), __webpack_require__("./node_modules/acorn-jsx/inject.js")]; (function (acorn, jsxInject) {
	      callback(jsxInject(acorn));
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(10, __WEBPACK_CALLBACK__);}());
	  },
	
	  parse: function parse(acorn, code) {
	    // put deep option into correspondent place
	    return acorn.parse(code, _extends({}, options, {
	      plugins: options['plugins.jsx'] ? { jsx: true } : {}
	    }));
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    if (typeof node.start === 'number') {
	      return [node.start, node.end];
	    }
	  },
	
	  renderSettings: function renderSettings() {
	    return Settings();
	  }
	});
	
	var settings = [['ecmaVersion', [3, 5, 6, 7]], ['sourceType', ['script', 'module']], 'allowReserved', 'allowReturnOutsideFunction', 'allowImportExportEverywhere', 'allowHashBang', 'locations', 'ranges', 'preserveParens', 'plugins.jsx'];
	
	function changeOption(name, _ref) {
	  var target = _ref.target;
	
	  var value = undefined;
	  switch (name) {
	    case 'ecmaVersion':
	    case 'sourceType':
	      value = target.value;
	      break;
	    default:
	      value = target.checked;
	  }
	  options[name] = value;
	  LocalStorage.setParserSettings(ID, options);
	}
	
	function Settings() {
	  return _react2['default'].createElement(
	    'div',
	    null,
	    _react2['default'].createElement(
	      'p',
	      null,
	      _react2['default'].createElement(
	        'a',
	        {
	          href: 'https://github.com/marijnh/acorn/blob/master/src/options.js',
	          target: '_blank' },
	        'Option descriptions'
	      )
	    ),
	    (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      values: options,
	      onChange: changeOption
	    })
	  );
	}
	module.exports = exports['default'];

/***/ },

/***/ "./src/parsers/js/utils/defaultESTreeParserInterface.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  opensByDefault: function opensByDefault(node, key) {
	    return node.type === 'Program' || key === 'body' || key === 'elements' || // array literals
	    key === 'declarations' || // variable declaration
	    key === 'expression';
	  }
	
	});
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/acorn/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"acorn@3.0.4",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "acorn@3.0.4",
		"_id": "acorn@3.0.4",
		"_inCache": true,
		"_installable": true,
		"_location": "/acorn",
		"_nodeVersion": "4.3.1",
		"_npmOperationalInternal": {
			"host": "packages-6-west.internal.npmjs.com",
			"tmp": "tmp/acorn-3.0.4.tgz_1456390282440_0.9833372407592833"
		},
		"_npmUser": {
			"email": "marijnh@gmail.com",
			"name": "marijn"
		},
		"_npmVersion": "2.14.12",
		"_phantomChildren": {},
		"_requested": {
			"name": "acorn",
			"raw": "acorn@3.0.4",
			"rawSpec": "3.0.4",
			"scope": null,
			"spec": "3.0.4",
			"type": "version"
		},
		"_requiredBy": [
			"/",
			"/espree"
		],
		"_resolved": "https://registry.npmjs.org/acorn/-/acorn-3.0.4.tgz",
		"_shasum": "04f244950fdb8faf85507ad481c2edee7aecdeec",
		"_shrinkwrap": null,
		"_spec": "acorn@3.0.4",
		"_where": "/Users/fkling/git/astexplorer",
		"bin": {
			"acorn": "./bin/acorn"
		},
		"bugs": {
			"url": "https://github.com/ternjs/acorn/issues"
		},
		"contributors": [
			{
				"name": "keeyipchan"
			},
			{
				"name": "List of Acorn contributors. Updated before every release."
			},
			{
				"name": "Alistair Braidwood"
			},
			{
				"name": "Andres Suarez"
			},
			{
				"name": "Aparajita Fishman"
			},
			{
				"name": "Arian Stolwijk"
			},
			{
				"name": "Artem Govorov"
			},
			{
				"name": "Brandon Mills"
			},
			{
				"name": "Charles Hughes"
			},
			{
				"name": "Conrad Irwin"
			},
			{
				"name": "David Bonnet"
			},
			{
				"name": "ForbesLindesay"
			},
			{
				"name": "Forbes Lindesay"
			},
			{
				"name": "Gilad Peleg"
			},
			{
				"name": "impinball"
			},
			{
				"name": "Ingvar Stepanyan"
			},
			{
				"name": "Jesse McCarthy"
			},
			{
				"name": "Jiaxing Wang"
			},
			{
				"name": "Joel Kemp"
			},
			{
				"name": "Johannes Herr"
			},
			{
				"name": "Jürg Lehni"
			},
			{
				"name": "Adrian Rakovsky"
			},
			{
				"name": "Kevin Kwok"
			},
			{
				"name": "krator"
			},
			{
				"name": "Marijn Haverbeke"
			},
			{
				"name": "Martin Carlberg"
			},
			{
				"name": "Mathias Bynens"
			},
			{
				"name": "Mathieu 'p01' Henri"
			},
			{
				"name": "Max Schaefer"
			},
			{
				"name": "Max Zerzouri"
			},
			{
				"name": "Mihai Bazon"
			},
			{
				"name": "Mike Rennie"
			},
			{
				"name": "Nick Fitzgerald"
			},
			{
				"name": "Oskar Schöldström"
			},
			{
				"name": "Paul Harper"
			},
			{
				"name": "Peter Rust"
			},
			{
				"name": "PlNG"
			},
			{
				"name": "r-e-d"
			},
			{
				"name": "Rich Harris"
			},
			{
				"name": "Sebastian McKenzie"
			},
			{
				"name": "Timothy Gu"
			},
			{
				"name": "zsjforcn"
			}
		],
		"dependencies": {},
		"description": "ECMAScript parser",
		"devDependencies": {
			"babel-core": "^5.6.15",
			"babelify": "^6.1.2",
			"browserify": "^10.2.4",
			"browserify-derequire": "^0.9.4",
			"unicode-8.0.0": "^0.1.5"
		},
		"directories": {},
		"dist": {
			"shasum": "04f244950fdb8faf85507ad481c2edee7aecdeec",
			"tarball": "http://registry.npmjs.org/acorn/-/acorn-3.0.4.tgz"
		},
		"engines": {
			"node": ">=0.4.0"
		},
		"gitHead": "327cef57d0907500ec1ab5508c6eccd727a79cf9",
		"homepage": "https://github.com/ternjs/acorn",
		"license": "MIT",
		"main": "dist/acorn.js",
		"maintainers": [
			{
				"name": "marijn",
				"email": "marijnh@gmail.com"
			},
			{
				"name": "rreverser",
				"email": "me@rreverser.com"
			}
		],
		"name": "acorn",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/ternjs/acorn.git"
		},
		"scripts": {
			"prepublish": "node bin/build-acorn.js",
			"test": "node test/run.js"
		},
		"version": "3.0.4"
	};

/***/ },

/***/ "./src/parsers/js/babel-eslint.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultESTreeParserInterface = __webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js");
	
	var _utilsDefaultESTreeParserInterface2 = _interopRequireDefault(_utilsDefaultESTreeParserInterface);
	
	var _acornToEsprimaPackageJson = __webpack_require__("./node_modules/acorn-to-esprima/package.json");
	
	var _acornToEsprimaPackageJson2 = _interopRequireDefault(_acornToEsprimaPackageJson);
	
	var ID = 'acorn-to-esprima';
	var name = 'babel-eslint';
	
	exports['default'] = _extends({}, _utilsDefaultESTreeParserInterface2['default'], {
	
	  id: ID,
	  displayName: name,
	  version: _acornToEsprimaPackageJson2['default'].version,
	  homepage: _acornToEsprimaPackageJson2['default'].homepage,
	  locationProps: new _Set(['loc', 'start', 'end', 'range']),
	
	  loadParser: function loadParser(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/acorn-to-esprima/src/index.js"), __webpack_require__("./node_modules/babel-core/index.js")]; (function (acornToEsprima, _ref) {
	      var tokTypes = _ref.acorn.tokTypes;
	      var traverse = _ref.traverse;
	      var parse = _ref.parse;
	
	      callback(_extends({}, acornToEsprima, {
	        tokTypes: tokTypes,
	        traverse: traverse,
	        parse: parse
	      }));
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(11, __WEBPACK_CALLBACK__);}());
	  },
	
	  parse: function parse(parser, code) {
	    var opts = {
	      locations: true,
	      ranges: true
	    };
	
	    var comments = opts.onComment = [];
	    var tokens = opts.onToken = [];
	
	    var ast = parser.parse(code, opts);
	
	    ast.tokens = parser.toTokens(tokens, parser.tokTypes);
	    parser.convertComments(comments);
	    ast.comments = comments;
	    parser.attachComments(ast, comments, ast.tokens);
	    parser.toAST(ast, parser.traverse);
	
	    return ast;
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    if (typeof node.start !== 'undefined') {
	      return [node.start, node.end];
	    }
	  },
	
	  _ignoredProperties: new _Set(['_paths', '_babelType', '__clone'])
	});
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/acorn-to-esprima/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"acorn-to-esprima@https://registry.npmjs.org/acorn-to-esprima/-/acorn-to-esprima-1.0.7.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "acorn-to-esprima@>=1.0.2 <2.0.0",
		"_id": "acorn-to-esprima@1.0.7",
		"_inCache": true,
		"_location": "/acorn-to-esprima",
		"_phantomChildren": {},
		"_requested": {
			"name": "acorn-to-esprima",
			"raw": "acorn-to-esprima@https://registry.npmjs.org/acorn-to-esprima/-/acorn-to-esprima-1.0.7.tgz",
			"rawSpec": "https://registry.npmjs.org/acorn-to-esprima/-/acorn-to-esprima-1.0.7.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/acorn-to-esprima/-/acorn-to-esprima-1.0.7.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/",
			"/babel-eslint"
		],
		"_resolved": "https://registry.npmjs.org/acorn-to-esprima/-/acorn-to-esprima-1.0.7.tgz",
		"_shasum": "9436259760098f9ead9b9da2242fab2f4850281b",
		"_shrinkwrap": null,
		"_spec": "acorn-to-esprima@https://registry.npmjs.org/acorn-to-esprima/-/acorn-to-esprima-1.0.7.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "sebmck@gmail.com",
			"name": "Sebastian McKenzie"
		},
		"bugs": {
			"url": "https://github.com/babel/acorn-to-esprima/issues"
		},
		"dependencies": {},
		"description": "Convert acorn tokens to esprima",
		"devDependencies": {},
		"homepage": "https://github.com/babel/acorn-to-esprima#readme",
		"keywords": [
			"acorn",
			"babel",
			"babel-eslint",
			"babel-jscs",
			"esprima"
		],
		"license": "MIT",
		"main": "src/index.js",
		"name": "acorn-to-esprima",
		"optionalDependencies": {},
		"readme": "# acorn-to-esprima\n\nSome functions to help transform an acorn/babel ast to esprima format.\n\nPrimarily for use in [babel-eslint](https://github.com/babel/babel-eslint), [babel-jscs](https://github.com/jscs-dev/babel-jscs), and [ast explorer](https://github.com/fkling/esprima_ast_explorer)\n\n**There are no dependencies** (the methods were changed to pass in dependencies instead)\n\nThe current functions exposed are:\n\n- `function attachComments(ast, comments, tokens)`\n  - This modifies the comments passed in.\n- `function toTokens(tokens, tt)`\n  - `tt` is `require(\"babel-core\").acorn.tokTypes`\n  - Converts template string tokens (`convertTemplateType`)\n  - filters out comment tokens\n  - runs `toToken` over each token\n- `function toToken(token, tt)`\n  - Sets `token.type`, `token.range`, and `token.value`\n- `function toAST(ast, traverse)`\n  - `traverse` is `require(\"babel-core\").traverse;`\n  - traverses over the ast and makes any necessary changes (usually es6+)\n- `function convertComments(comments)`\n  - Modifies `comment.type`\n\nHow to use:\n\nCheck out the parse method of https://github.com/babel/babel-eslint/blob/master/index.js\n```js\n// example\nexports.parse = function (code) {\n  var comments = opts.onComment = [];\n  var tokens = opts.onToken = [];\n\n  var ast;\n  try {\n    ast = parse(code, {\n        locations: true,\n        ranges: true\n    });\n  } catch (err) { throw err; }\n\n  tokens.pop();\n  ast.tokens = acornToEsprima.toTokens(tokens, tt);\n\n  acornToEsprima.convertComments(comments);\n  ast.comments = comments;\n  acornToEsprima.attachComments(ast, comments, ast.tokens);\n\n  acornToEsprima.toAST(ast, traverse);\n\n  return ast;\n}\n```",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/babel/acorn-to-esprima.git"
		},
		"version": "1.0.7"
	};

/***/ },

/***/ "./src/parsers/js/babylon.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDefaultESTreeParserInterface = __webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js");
	
	var _utilsDefaultESTreeParserInterface2 = _interopRequireDefault(_utilsDefaultESTreeParserInterface);
	
	var _babylonPackageJson = __webpack_require__("./node_modules/babylon/package.json");
	
	var _babylonPackageJson2 = _interopRequireDefault(_babylonPackageJson);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var ID = 'babylon';
	var options = _extends({
	  sourceType: 'module',
	
	  features: {
	    'es7.asyncFunctions': true,
	    'es7.classProperties': true,
	    'es7.comprehensions': true,
	    'es7.decorators': true,
	    'es7.exportExtensions': true,
	    'es7.functionBind': true,
	    'es7.objectRestSpread': true,
	    'es7.trailingFunctionCommas': true
	  },
	
	  plugins: { jsx: true, flow: true }
	
	}, LocalStorage.getParserSettings(ID));
	
	exports['default'] = _extends({}, _utilsDefaultESTreeParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _babylonPackageJson2['default'].version,
	  homepage: _babylonPackageJson2['default'].homepage,
	  locationProps: new _Set(['loc', 'start', 'end']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(26, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/babylon/lib/index.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  parse: function parse(babylon, code) {
	    return babylon.parse(code, options);
	  },
	
	  getNodeName: function getNodeName(node) {
	    switch (typeof node.type) {
	      case 'string':
	        return node.type;
	      case 'object':
	        return 'Token (' + node.type.label + ')';
	    }
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    if (typeof node.start !== 'undefined') {
	      return [node.start, node.end];
	    }
	  },
	
	  _ignoredProperties: new _Set(['__clone']),
	
	  renderSettings: function renderSettings() {
	    return Settings();
	  }
	});
	
	var parserSettings = [['sourceType', ['module', 'script']], 'allowReserved', 'allowReturnOutsideFunction', 'strictMode'];
	var features = _Object$keys(options.features);
	var plugins = ['jsx', 'flow'];
	
	function changeOption(name, _ref) {
	  var target = _ref.target;
	
	  if (name === 'sourceType') {
	    options.sourceType = target.value;
	  } else if (parserSettings.indexOf(name) > -1) {
	    options[name] = target.checked;
	  } else if (features.indexOf(name) > -1) {
	    options.features[name] = target.checked;
	  } else if (plugins.indexOf(name) > -1) {
	    if (target.checked) {
	      options.plugins[name] = true;
	    } else {
	      delete options.plugins[name];
	    }
	  }
	  LocalStorage.setParserSettings(ID, options);
	}
	
	function Settings() {
	  return _react2['default'].createElement(
	    'div',
	    null,
	    (0, _utilsSettingsRenderer2['default'])({
	      settings: parserSettings,
	      values: options,
	      onChange: changeOption
	    }),
	    _react2['default'].createElement(
	      'h4',
	      null,
	      'features'
	    ),
	    (0, _utilsSettingsRenderer2['default'])({
	      settings: features,
	      values: options.features,
	      onChange: changeOption
	    }),
	    _react2['default'].createElement(
	      'h4',
	      null,
	      'plugins'
	    ),
	    (0, _utilsSettingsRenderer2['default'])({
	      settings: plugins,
	      values: options.plugins,
	      onChange: changeOption
	    })
	  );
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/babylon/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"babylon@https://registry.npmjs.org/babylon/-/babylon-5.8.35.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "babylon@>=5.8.22 <6.0.0",
		"_id": "babylon@5.8.35",
		"_inCache": true,
		"_location": "/babylon",
		"_phantomChildren": {},
		"_requested": {
			"name": "babylon",
			"raw": "babylon@https://registry.npmjs.org/babylon/-/babylon-5.8.35.tgz",
			"rawSpec": "https://registry.npmjs.org/babylon/-/babylon-5.8.35.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/babylon/-/babylon-5.8.35.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/",
			"/babel-core"
		],
		"_resolved": "https://registry.npmjs.org/babylon/-/babylon-5.8.35.tgz",
		"_shasum": "34fbc3155b228b0b6780d0623ac4ff32a97647c4",
		"_shrinkwrap": null,
		"_spec": "babylon@https://registry.npmjs.org/babylon/-/babylon-5.8.35.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "sebmck@gmail.com",
			"name": "Sebastian McKenzie"
		},
		"bugs": {
			"url": "https://github.com/babel/babel/issues"
		},
		"contributors": [
			{
				"name": "keeyipchan"
			},
			{
				"name": "List of Acorn contributors. Updated before every release."
			},
			{
				"name": "Alistair Braidwood"
			},
			{
				"name": "Andres Suarez"
			},
			{
				"name": "Aparajita Fishman"
			},
			{
				"name": "Arian Stolwijk"
			},
			{
				"name": "Artem Govorov"
			},
			{
				"name": "Brandon Mills"
			},
			{
				"name": "Charles Hughes"
			},
			{
				"name": "Conrad Irwin"
			},
			{
				"name": "David Bonnet"
			},
			{
				"name": "Forbes Lindesay"
			},
			{
				"name": "Gilad Peleg"
			},
			{
				"name": "impinball"
			},
			{
				"name": "Ingvar Stepanyan"
			},
			{
				"name": "Jesse McCarthy"
			},
			{
				"name": "Jiaxing Wang"
			},
			{
				"name": "Joel Kemp"
			},
			{
				"name": "Johannes Herr"
			},
			{
				"name": "Jürg Lehni"
			},
			{
				"name": "Adrian Rakovsky"
			},
			{
				"name": "Kevin Kwok"
			},
			{
				"name": "krator"
			},
			{
				"name": "Marijn Haverbeke"
			},
			{
				"name": "Martin Carlberg"
			},
			{
				"name": "Mathias Bynens"
			},
			{
				"name": "Mathieu 'p01' Henri"
			},
			{
				"name": "Max Schaefer"
			},
			{
				"name": "Max Zerzouri"
			},
			{
				"name": "Mihai Bazon"
			},
			{
				"name": "Mike Rennie"
			},
			{
				"name": "Nick Fitzgerald"
			},
			{
				"name": "Oskar Schöldström"
			},
			{
				"name": "Paul Harper"
			},
			{
				"name": "Peter Rust"
			},
			{
				"name": "PlNG"
			},
			{
				"name": "r-e-d"
			},
			{
				"name": "Rich Harris"
			},
			{
				"name": "Sebastian McKenzie"
			},
			{
				"name": "zsjforcn"
			}
		],
		"dependencies": {},
		"description": "<p align=\"center\">   <img alt=\"babylon\" src=\"https://raw.githubusercontent.com/babel/logo/master/babylon.png\" width=\"700\"> </p>",
		"devDependencies": {},
		"homepage": "https://babeljs.io/",
		"license": "MIT",
		"main": "lib/index.js",
		"name": "babylon",
		"optionalDependencies": {},
		"readme": "<p align=\"center\">\n  <img alt=\"babylon\" src=\"https://raw.githubusercontent.com/babel/logo/master/babylon.png\" width=\"700\">\n</p>\n\n<p align=\"center\">\n  Babylon is a JavaScript parser used in <a href=\"https://github.com/babel/babel\">Babel</a>.\n</p>\n\n## Credits\n\nHeavily based on [acorn](https://github.com/marijnh/acorn) and [acorn-jsx](https://github.com/RReverser/acorn-jsx),\nthanks to the awesome work of [@RReverser](https://github.com/RReverser) and [@marijnh](https://github.com/marijnh).\n\nSignificant diversions are expected to occur in the future such as streaming, EBNF definitions, sweet.js integration,\ninterspacial parsing, comment attachment and more.\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/babel/babel.git"
		},
		"version": "5.8.35"
	};

/***/ },

/***/ "./src/parsers/js/babylon6.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _Array$from = __webpack_require__("./node_modules/babel-runtime/core-js/array/from.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDefaultESTreeParserInterface = __webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js");
	
	var _utilsDefaultESTreeParserInterface2 = _interopRequireDefault(_utilsDefaultESTreeParserInterface);
	
	var _babylon6Node_modulesBabylonPackageJson = __webpack_require__("./node_modules/babylon6/node_modules/babylon/package.json");
	
	var _babylon6Node_modulesBabylonPackageJson2 = _interopRequireDefault(_babylon6Node_modulesBabylonPackageJson);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var ID = 'babylon6';
	var plugins = ['asyncFunctions', 'asyncGenerators', 'classConstructorCall', 'classProperties', 'decorators', 'doExpressions', 'exponentiationOperator', 'exportExtensions', 'flow', 'functionSent', 'functionBind', 'jsx', 'objectRestSpread', 'trailingFunctionCommas'];
	var options = _extends({
	  sourceType: 'module',
	  allowImportExportEverywhere: false,
	  allowReturnOutsideFunction: false,
	  plugins: plugins.slice(0)
	}, LocalStorage.getParserSettings(ID));
	
	exports['default'] = _extends({}, _utilsDefaultESTreeParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _babylon6Node_modulesBabylonPackageJson2['default'].version,
	  homepage: _babylon6Node_modulesBabylonPackageJson2['default'].homepage,
	  locationProps: new _Set(['loc', 'start', 'end']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(12, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/babylon6/index.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  parse: function parse(babylon, code) {
	    return babylon.parse(code, options);
	  },
	
	  getNodeName: function getNodeName(node) {
	    switch (typeof node.type) {
	      case 'string':
	        return node.type;
	      case 'object':
	        return 'Token (' + node.type.label + ')';
	    }
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    if (typeof node.start !== 'undefined') {
	      return [node.start, node.end];
	    }
	  },
	
	  renderSettings: function renderSettings() {
	    return Settings();
	  }
	});
	
	var parserSettings = [['sourceType', ['module', 'script']], 'allowReturnOutsideFunction', 'allowImportExportEverywhere'];
	
	function changeOption(name, _ref) {
	  var target = _ref.target;
	
	  if (name === 'sourceType') {
	    options.sourceType = target.value;
	  } else if (parserSettings.indexOf(name) > -1) {
	    options[name] = target.checked;
	  } else if (plugins.indexOf(name) > -1) {
	    var plugs = new _Set(options.plugins);
	    if (target.checked) {
	      plugs.add(name);
	    } else {
	      plugs['delete'](name);
	    }
	    options.plugins = _Array$from(plugs);
	  }
	  LocalStorage.setParserSettings(ID, options);
	}
	
	function Settings() {
	  return _react2['default'].createElement(
	    'div',
	    null,
	    (0, _utilsSettingsRenderer2['default'])({
	      settings: parserSettings,
	      values: options,
	      onChange: changeOption
	    }),
	    _react2['default'].createElement(
	      'h4',
	      null,
	      'plugins'
	    ),
	    (0, _utilsSettingsRenderer2['default'])({
	      settings: plugins,
	      values: plugins.reduce(function (obj, p) {
	        return obj[p] = options.plugins.indexOf(p) > -1, obj;
	      }, {}),
	      onChange: changeOption
	    })
	  );
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/babylon6/node_modules/babylon/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"babylon@https://registry.npmjs.org/babylon/-/babylon-6.4.5.tgz",
				"/Users/fkling/git/astexplorer/node_modules/babylon6"
			]
		],
		"_from": "babylon@>=6.1.21 <7.0.0",
		"_id": "babylon@6.4.5",
		"_inCache": true,
		"_location": "/babylon6/babylon",
		"_phantomChildren": {},
		"_requested": {
			"name": "babylon",
			"raw": "babylon@https://registry.npmjs.org/babylon/-/babylon-6.4.5.tgz",
			"rawSpec": "https://registry.npmjs.org/babylon/-/babylon-6.4.5.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/babylon/-/babylon-6.4.5.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/babylon6"
		],
		"_resolved": "https://registry.npmjs.org/babylon/-/babylon-6.4.5.tgz",
		"_shasum": "ba23b94e16c46f4b618e1f2bf99efe384acb498a",
		"_shrinkwrap": null,
		"_spec": "babylon@https://registry.npmjs.org/babylon/-/babylon-6.4.5.tgz",
		"_where": "/Users/fkling/git/astexplorer/node_modules/babylon6",
		"author": {
			"email": "sebmck@gmail.com",
			"name": "Sebastian McKenzie"
		},
		"bin": {
			"babylon": "./bin/babylon.js"
		},
		"contributors": [
			{
				"name": "keeyipchan"
			},
			{
				"name": "List of Acorn contributors. Updated before every release."
			},
			{
				"name": "Alistair Braidwood"
			},
			{
				"name": "Andres Suarez"
			},
			{
				"name": "Aparajita Fishman"
			},
			{
				"name": "Arian Stolwijk"
			},
			{
				"name": "Artem Govorov"
			},
			{
				"name": "Brandon Mills"
			},
			{
				"name": "Charles Hughes"
			},
			{
				"name": "Conrad Irwin"
			},
			{
				"name": "David Bonnet"
			},
			{
				"name": "Forbes Lindesay"
			},
			{
				"name": "Gilad Peleg"
			},
			{
				"name": "impinball"
			},
			{
				"name": "Ingvar Stepanyan"
			},
			{
				"name": "Jesse McCarthy"
			},
			{
				"name": "Jiaxing Wang"
			},
			{
				"name": "Joel Kemp"
			},
			{
				"name": "Johannes Herr"
			},
			{
				"name": "Jürg Lehni"
			},
			{
				"name": "Adrian Rakovsky"
			},
			{
				"name": "Kevin Kwok"
			},
			{
				"name": "krator"
			},
			{
				"name": "Marijn Haverbeke"
			},
			{
				"name": "Martin Carlberg"
			},
			{
				"name": "Mathias Bynens"
			},
			{
				"name": "Mathieu 'p01' Henri"
			},
			{
				"name": "Max Schaefer"
			},
			{
				"name": "Max Zerzouri"
			},
			{
				"name": "Mihai Bazon"
			},
			{
				"name": "Mike Rennie"
			},
			{
				"name": "Nick Fitzgerald"
			},
			{
				"name": "Oskar Schöldström"
			},
			{
				"name": "Paul Harper"
			},
			{
				"name": "Peter Rust"
			},
			{
				"name": "PlNG"
			},
			{
				"name": "r-e-d"
			},
			{
				"name": "Rich Harris"
			},
			{
				"name": "Sebastian McKenzie"
			},
			{
				"name": "zsjforcn"
			}
		],
		"dependencies": {
			"babel-runtime": "^5.0.0"
		},
		"description": "A JavaScript parser",
		"devDependencies": {
			"babel-helper-fixtures": "^6.3.13"
		},
		"homepage": "https://babeljs.io/",
		"license": "MIT",
		"main": "index.js",
		"name": "babylon",
		"optionalDependencies": {},
		"readme": "<p align=\"center\">\n  <img alt=\"babylon\" src=\"https://raw.githubusercontent.com/babel/logo/master/babylon.png\" width=\"700\">\n</p>\n\n<p align=\"center\">\n  Babylon is a JavaScript parser used in <a href=\"https://github.com/babel/babel\">Babel</a>.\n</p>\n\n - ES6 enabled by default.\n - Comment attachment.\n - Support for JSX and Flow.\n - Support for experimental language proposals.\n\n## Credits\n\nHeavily based on [acorn](https://github.com/marijnh/acorn) and [acorn-jsx](https://github.com/RReverser/acorn-jsx),\nthanks to the awesome work of [@RReverser](https://github.com/RReverser) and [@marijnh](https://github.com/marijnh).\n\nSignificant diversions are expected to occur in the future such as streaming, EBNF definitions, sweet.js integration, interspacial parsing and more.\n\n## API\n\n### `babylon.parse(code, [options])`\n\n## Options\n\n- **allowImportExportEverywhere**: By default, `import` and `export`\n  declarations can only appear at a program's top level. Setting this\n  option to `true` allows them anywhere where a statement is allowed.\n\n- **allowReturnOutsideFunction**: By default, a return statement at\n  the top level raises an error. Set this to `true` to accept such\n  code.\n\n- **allowSuperOutsideMethod** TODO\n\n- **sourceType**: Indicate the mode the code should be parsed in. Can be\n  either `\"script\"` or `\"module\"`.\n\n- **plugins**: Array containing the plugins that you want to enable.\n\n### Example\n\n```javascript\nrequire(\"babylon\").parse(\"code\", {\n  // parse in strict mode and allow module declarations\n  sourceType: \"module\",\n\n  plugins: [\n    // enable experimental async functions\n    \"asyncFunctions\",\n\n    // enable jsx and flow syntax\n    \"jsx\",\n    \"flow\"\n  ]\n});\n```\n\n### Plugins\n\n - `jsx`\n - `flow`\n - `asyncFunctions`\n - `classConstructorCall`\n - `doExpressions`\n - `trailingFunctionCommas`\n - `objectRestSpread`\n - `decorators`\n - `classProperties`\n - `exportExtensions`\n - `exponentiationOperator`\n - `asyncGenerators`\n - `functionBind`\n - `functionSent`\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "https://github.com/babel/babel/tree/master/packages/babylon"
		},
		"version": "6.4.5"
	};

/***/ },

/***/ "./src/parsers/js/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "/**\n * Paste or drop some JavaScript here and explore\n * the syntax tree created by chosen parser.\n * You can use all the cool new features from ES6\n * and even more. Enjoy!\n */\n\nlet tips = [\n  \"Click on any AST node with a '+' to expand it\",\n\n  \"Hovering over a node highlights the \\\n   corresponding part in the source code\",\n\n  \"Shift click on an AST node expands the whole substree\"\n];\n\nfunction printTips() {\n  tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip));\n}\n"

/***/ },

/***/ "./src/parsers/js/espree.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _toConsumableArray = __webpack_require__("./node_modules/babel-runtime/helpers/to-consumable-array.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utilsDefaultESTreeParserInterface = __webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js");
	
	var _utilsDefaultESTreeParserInterface2 = _interopRequireDefault(_utilsDefaultESTreeParserInterface);
	
	var _espreePackageJson = __webpack_require__("./node_modules/espree/package.json");
	
	var _espreePackageJson2 = _interopRequireDefault(_espreePackageJson);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var ID = 'espree';
	var options = _extends({
	  range: true,
	  loc: false,
	  comment: false,
	  attachComment: false,
	  tokens: false,
	  tolerant: true,
	  ecmaVersion: 6,
	  sourceType: 'module',
	
	  ecmaFeatures: {
	    jsx: true,
	    globalReturn: true,
	    experimentalObjectRestSpread: true
	  }
	
	}, LocalStorage.getParserSettings(ID));
	
	exports['default'] = _extends({}, _utilsDefaultESTreeParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _espreePackageJson2['default'].version,
	  homepage: _espreePackageJson2['default'].homepage,
	  locationProps: new _Set(['range']),
	
	  loadParser: function loadParser(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/espree/espree.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(13, __WEBPACK_CALLBACK__);}());
	  },
	
	  parse: function parse(espree, code) {
	    return espree.parse(code, options);
	  },
	
	  renderSettings: function renderSettings() {
	    return Settings();
	  }
	});
	
	var parserSettings = [['ecmaVersion', [3, 5, 6, 7]], ['sourceType', ['script', 'module']]].concat(_toConsumableArray(_Object$keys(options).filter(function (v) {
	  return v !== 'ecmaFeatures';
	})));
	var ecmaFeatures = _Object$keys(options.ecmaFeatures);
	
	function changeOption(name, _ref) {
	  var target = _ref.target;
	
	  if (parserSettings.indexOf(name) > -1) {
	    switch (name) {
	      case 'ecmaVersion':
	        options[name] = +target.value;
	        break;
	      case 'sourceType':
	        options[name] = target.value;
	        break;
	      default:
	        options[name] = target.checked;
	    }
	  } else {
	    options.ecmaFeatures[name] = target.checked;
	  }
	  LocalStorage.setParserSettings(ID, options);
	}
	
	function Settings() {
	  return _react2['default'].createElement(
	    'div',
	    null,
	    _react2['default'].createElement(
	      'p',
	      null,
	      _react2['default'].createElement(
	        'a',
	        {
	          href: 'https://github.com/eslint/espree#usage',
	          target: '_blank' },
	        'Option descriptions'
	      )
	    ),
	    (0, _utilsSettingsRenderer2['default'])({
	      settings: parserSettings,
	      values: options,
	      required: new _Set(['range']),
	      onChange: changeOption
	    }),
	    _react2['default'].createElement(
	      'h4',
	      null,
	      'ecmaFeatures'
	    ),
	    (0, _utilsSettingsRenderer2['default'])({
	      settings: ecmaFeatures,
	      values: options.ecmaFeatures,
	      onChange: changeOption
	    })
	  );
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/espree/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"espree@3.1.0",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "espree@3.1.0",
		"_id": "espree@3.1.0",
		"_inCache": true,
		"_installable": true,
		"_location": "/espree",
		"_npmOperationalInternal": {
			"host": "packages-6-west.internal.npmjs.com",
			"tmp": "tmp/espree-3.1.0.tgz_1456437396736_0.8026967260520905"
		},
		"_npmUser": {
			"email": "nicholas@nczconsulting.com",
			"name": "nzakas"
		},
		"_npmVersion": "1.4.10",
		"_phantomChildren": {},
		"_requested": {
			"name": "espree",
			"raw": "espree@3.1.0",
			"rawSpec": "3.1.0",
			"scope": null,
			"spec": "3.1.0",
			"type": "version"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/espree/-/espree-3.1.0.tgz",
		"_shasum": "527c24d5032567ddde877b31f19ce7bebda97b81",
		"_shrinkwrap": null,
		"_spec": "espree@3.1.0",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "nicholas+npm@nczconsulting.com",
			"name": "Nicholas C. Zakas"
		},
		"bugs": {
			"url": "http://github.com/eslint/espree.git"
		},
		"dependencies": {
			"acorn": "^3.0.4",
			"acorn-jsx": "^2.0.1"
		},
		"description": "An Esprima-compatible JavaScript parser built on Acorn",
		"devDependencies": {
			"browserify": "^7.0.0",
			"chai": "^1.10.0",
			"eslint": "^2.0.0-beta.1",
			"eslint-config-eslint": "^3.0.0",
			"eslint-release": "^0.3.0",
			"esprima": "latest",
			"esprima-fb": "^8001.2001.0-dev-harmony-fb",
			"istanbul": "~0.2.6",
			"json-diff": "~0.3.1",
			"leche": "^1.0.1",
			"mocha": "^2.0.1",
			"optimist": "~0.6.0",
			"regenerate": "~0.5.4",
			"shelljs": "^0.3.0",
			"shelljs-nodecli": "^0.1.1",
			"unicode-6.3.0": "~0.1.0"
		},
		"directories": {},
		"dist": {
			"shasum": "527c24d5032567ddde877b31f19ce7bebda97b81",
			"tarball": "http://registry.npmjs.org/espree/-/espree-3.1.0.tgz"
		},
		"engines": {
			"node": ">=0.10.0"
		},
		"files": [
			"espree.js",
			"lib"
		],
		"homepage": "https://github.com/eslint/espree",
		"keywords": [
			"acorn",
			"ast",
			"ecmascript",
			"javascript",
			"parser",
			"syntax"
		],
		"license": "BSD-2-Clause",
		"main": "espree.js",
		"maintainers": [
			{
				"name": "nzakas",
				"email": "nicholas@nczconsulting.com"
			}
		],
		"name": "espree",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+ssh://git@github.com/eslint/espree.git"
		},
		"scripts": {
			"alpharelease": "eslint-prelease alpha",
			"betarelease": "eslint-prelease beta",
			"browserify": "node Makefile.js browserify",
			"generate-regex": "node tools/generate-identifier-regex.js",
			"lint": "node Makefile.js lint",
			"release": "eslint-release",
			"test": "npm run-script lint && node Makefile.js test"
		},
		"version": "3.1.0"
	};

/***/ },

/***/ "./src/parsers/js/esprima.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _regeneratorRuntime = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	// eslint-disable-line no-unused-vars
	
	var _utilsDefaultESTreeParserInterface = __webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js");
	
	var _utilsDefaultESTreeParserInterface2 = _interopRequireDefault(_utilsDefaultESTreeParserInterface);
	
	var _esprimaPackageJson = __webpack_require__("./node_modules/esprima/package.json");
	
	var _esprimaPackageJson2 = _interopRequireDefault(_esprimaPackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'esprima';
	var options = _extends({
	  loc: false,
	  range: true,
	  tokens: false,
	  comment: false,
	  attachComment: false,
	  tolerant: false,
	  sourceType: 'module'
	}, LocalStorage.getParserSettings(ID));
	
	var settings = ['range', 'loc', 'attachComment', 'comment', 'tokens', 'tolerant', ['sourceType', ['script', 'module']]];
	
	exports['default'] = _extends({}, _utilsDefaultESTreeParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _esprimaPackageJson2['default'].version,
	  homepage: _esprimaPackageJson2['default'].homepage,
	  locationProps: new _Set(['range', 'loc']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(26, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/esprima/esprima.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  parse: function parse(esprima, code) {
	    return esprima.parse(code, options);
	  },
	
	  forEachProperty: _regeneratorRuntime.mark(function forEachProperty(node) {
	    var prop;
	    return _regeneratorRuntime.wrap(function forEachProperty$(context$1$0) {
	      while (1) switch (context$1$0.prev = context$1$0.next) {
	        case 0:
	          context$1$0.t0 = _regeneratorRuntime.keys(node);
	
	        case 1:
	          if ((context$1$0.t1 = context$1$0.t0()).done) {
	            context$1$0.next = 9;
	            break;
	          }
	
	          prop = context$1$0.t1.value;
	
	          if (!(typeof node[prop] === 'function')) {
	            context$1$0.next = 5;
	            break;
	          }
	
	          return context$1$0.abrupt('continue', 1);
	
	        case 5:
	          context$1$0.next = 7;
	          return {
	            value: node[prop],
	            key: prop,
	            computed: false
	          };
	
	        case 7:
	          context$1$0.next = 1;
	          break;
	
	        case 9:
	        case 'end':
	          return context$1$0.stop();
	      }
	    }, forEachProperty, this);
	  }),
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      required: new _Set(['range']),
	      values: options,
	      onChange: changeOption
	    });
	  }
	});
	
	function changeOption(name, _ref) {
	  var target = _ref.target;
	
	  var value = undefined;
	  switch (name) {
	    case 'sourceType':
	      value = target.value;
	      break;
	    default:
	      value = target.checked;
	  }
	  options[name] = value;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/esprima/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"esprima@https://registry.npmjs.org/esprima/-/esprima-2.7.2.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "esprima@>=2.5.0 <3.0.0",
		"_id": "esprima@2.7.2",
		"_inCache": true,
		"_location": "/esprima",
		"_phantomChildren": {},
		"_requested": {
			"name": "esprima",
			"raw": "esprima@https://registry.npmjs.org/esprima/-/esprima-2.7.2.tgz",
			"rawSpec": "https://registry.npmjs.org/esprima/-/esprima-2.7.2.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/esprima/-/esprima-2.7.2.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/",
			"/escodegen",
			"/eslint/js-yaml",
			"/js-yaml",
			"/recast",
			"/regexpu",
			"/webpack"
		],
		"_resolved": "https://registry.npmjs.org/esprima/-/esprima-2.7.2.tgz",
		"_shasum": "f43be543609984eae44c933ac63352a6af35f339",
		"_shrinkwrap": null,
		"_spec": "esprima@https://registry.npmjs.org/esprima/-/esprima-2.7.2.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "ariya.hidayat@gmail.com",
			"name": "Ariya Hidayat"
		},
		"bin": {
			"esparse": "./bin/esparse.js",
			"esvalidate": "./bin/esvalidate.js"
		},
		"bugs": {
			"url": "https://github.com/jquery/esprima/issues"
		},
		"dependencies": {},
		"description": "ECMAScript parsing infrastructure for multipurpose analysis",
		"devDependencies": {
			"codecov.io": "~0.1.6",
			"escomplex-js": "1.2.0",
			"eslint": "~1.7.2",
			"everything.js": "~1.0.3",
			"glob": "^5.0.15",
			"istanbul": "~0.4.0",
			"jscs": "~2.3.5",
			"json-diff": "~0.3.1",
			"karma": "^0.13.11",
			"karma-chrome-launcher": "^0.2.1",
			"karma-detect-browsers": "^2.0.2",
			"karma-firefox-launcher": "^0.1.6",
			"karma-ie-launcher": "^0.2.0",
			"karma-mocha": "^0.2.0",
			"karma-safari-launcher": "^0.1.1",
			"karma-sauce-launcher": "^0.2.14",
			"lodash": "^3.10.0",
			"mocha": "^2.3.3",
			"node-tick-processor": "~0.0.2",
			"regenerate": "~1.2.1",
			"temp": "~0.8.3",
			"unicode-7.0.0": "~0.1.5"
		},
		"engines": {
			"node": ">=0.10.0"
		},
		"files": [
			"bin",
			"esprima.js",
			"unit-tests.js"
		],
		"homepage": "http://esprima.org",
		"keywords": [
			"ast",
			"ecmascript",
			"javascript",
			"parser",
			"syntax"
		],
		"license": "BSD-2-Clause",
		"main": "esprima.js",
		"maintainers": [
			{
				"name": "Ariya Hidayat",
				"email": "ariya.hidayat@gmail.com",
				"url": "http://ariya.ofilabs.com"
			}
		],
		"name": "esprima",
		"optionalDependencies": {},
		"readme": "[![NPM version](https://img.shields.io/npm/v/esprima.svg)](https://www.npmjs.com/package/esprima)\n[![npm download](https://img.shields.io/npm/dm/esprima.svg)](https://www.npmjs.com/package/esprima)\n[![Build Status](https://img.shields.io/travis/jquery/esprima/master.svg)](https://travis-ci.org/jquery/esprima)\n[![Coverage Status](https://img.shields.io/codecov/c/github/jquery/esprima/master.svg)](https://codecov.io/github/jquery/esprima)\n\n**Esprima** ([esprima.org](http://esprima.org), BSD license) is a high performance,\nstandard-compliant [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)\nparser written in ECMAScript (also popularly known as\n[JavaScript](https://en.wikipedia.org/wiki/JavaScript)).\nEsprima is created and maintained by [Ariya Hidayat](https://twitter.com/ariyahidayat),\nwith the help of [many contributors](https://github.com/jquery/esprima/contributors).\n\n### Features\n\n- Full support for ECMAScript 6 ([ECMA-262](http://www.ecma-international.org/publications/standards/Ecma-262.htm))\n- Sensible [syntax tree format](https://github.com/estree/estree/blob/master/spec.md) as standardized by [ESTree project](https://github.com/estree/estree)\n- Optional tracking of syntax node location (index-based and line-column)\n- [Heavily tested](http://esprima.org/test/ci.html) (~1250 [unit tests](https://github.com/jquery/esprima/tree/master/test/fixtures) with [full code coverage](https://codecov.io/github/jquery/esprima))\n\nEsprima serves as a **building block** for some JavaScript\nlanguage tools, from [code instrumentation](http://esprima.org/demo/functiontrace.html)\nto [editor autocompletion](http://esprima.org/demo/autocomplete.html).\n\nEsprima runs on many popular web browsers, as well as other ECMAScript platforms such as\n[Rhino](http://www.mozilla.org/rhino), [Nashorn](http://openjdk.java.net/projects/nashorn/), and [Node.js](https://npmjs.org/package/esprima).\n\nFor more information, check the web site [esprima.org](http://esprima.org).\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/jquery/esprima.git"
		},
		"scripts": {
			"all-tests": "npm run generate-fixtures && npm run unit-tests && npm run grammar-tests && npm run regression-tests",
			"analyze-coverage": "istanbul cover test/unit-tests.js",
			"appveyor": "npm run all-tests && npm run browser-tests && npm run dynamic-analysis",
			"benchmark": "node test/benchmarks.js",
			"benchmark-quick": "node test/benchmarks.js quick",
			"browser-tests": "npm run generate-fixtures && cd test && karma start --single-run",
			"check-coverage": "istanbul check-coverage --statement 100 --branch 100 --function 100",
			"check-version": "node test/check-version.js",
			"circleci": "npm test && npm run codecov && npm run downstream",
			"codecov": "istanbul report cobertura && codecov < ./coverage/cobertura-coverage.xml",
			"complexity": "node test/check-complexity.js",
			"downstream": "node test/downstream.js",
			"droneio": "npm test && npm run saucelabs-evergreen && npm run saucelabs-ie && npm run saucelabs-safari",
			"dynamic-analysis": "npm run analyze-coverage && npm run check-coverage",
			"eslint": "node node_modules/eslint/bin/eslint.js -c .lintrc esprima.js",
			"generate-fixtures": "node tools/generate-fixtures.js",
			"generate-regex": "node tools/generate-identifier-regex.js",
			"grammar-tests": "node test/grammar-tests.js",
			"jscs": "jscs -p crockford esprima.js && jscs -p crockford test/*.js",
			"profile": "node --prof test/profile.js && mv isolate*.log v8.log && node-tick-processor",
			"regression-tests": "node test/regression-tests.js",
			"saucelabs-evergreen": "cd test && karma start saucelabs-evergreen.conf.js",
			"saucelabs-ie": "cd test && karma start saucelabs-ie.conf.js",
			"saucelabs-safari": "cd test && karma start saucelabs-safari.conf.js",
			"static-analysis": "npm run check-version && npm run jscs && npm run eslint && npm run complexity",
			"test": "npm run all-tests && npm run static-analysis && npm run dynamic-analysis",
			"travis": "npm test",
			"unit-tests": "node test/unit-tests.js"
		},
		"version": "2.7.2"
	};

/***/ },

/***/ "./src/parsers/js/flow.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	// eslint-disable-line no-unused-vars
	
	var _utilsDefaultESTreeParserInterface = __webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js");
	
	var _utilsDefaultESTreeParserInterface2 = _interopRequireDefault(_utilsDefaultESTreeParserInterface);
	
	var _flowParserPackageJson = __webpack_require__("./node_modules/flow-parser/package.json");
	
	var _flowParserPackageJson2 = _interopRequireDefault(_flowParserPackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'flow';
	var options = _extends({
	  esproposal_decorators: true,
	  esproposal_class_instance_fields: true,
	  esproposal_class_static_fields: true,
	  types: true
	}, LocalStorage.getParserSettings(ID));
	
	var settings = ['esproposal_decorators', 'esproposal_class_instance_fields', 'esproposal_class_static_fields', 'types'];
	
	exports['default'] = _extends({}, _utilsDefaultESTreeParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _flowParserPackageJson2['default'].version,
	  homepage: _flowParserPackageJson2['default'].homepage,
	  locationProps: new _Set(['range', 'loc']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(14, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/flow-parser/flow_parser.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  parse: function parse(flowParser, code) {
	    return flowParser.parse(code, options);
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      values: options,
	      onChange: changeOption
	    });
	  }
	});
	
	function changeOption(name, _ref) {
	  var target = _ref.target;
	
	  options[name] = target.checked;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/flow-parser/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"flow-parser@https://registry.npmjs.org/flow-parser/-/flow-parser-0.21.0.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "flow-parser@>=0.21.0 <0.22.0",
		"_id": "flow-parser@0.21.0",
		"_inCache": true,
		"_location": "/flow-parser",
		"_phantomChildren": {},
		"_requested": {
			"name": "flow-parser",
			"raw": "flow-parser@https://registry.npmjs.org/flow-parser/-/flow-parser-0.21.0.tgz",
			"rawSpec": "https://registry.npmjs.org/flow-parser/-/flow-parser-0.21.0.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/flow-parser/-/flow-parser-0.21.0.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/flow-parser/-/flow-parser-0.21.0.tgz",
		"_shasum": "80b575c7e67c2c6e483ed3aade98a190e2ef7ae9",
		"_shrinkwrap": null,
		"_spec": "flow-parser@https://registry.npmjs.org/flow-parser/-/flow-parser-0.21.0.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "gabe@fb.com",
			"name": "Gabe Levi"
		},
		"bin": {
			"flowparse": "tools/inspect_ast.js",
			"flowvalidate": "tools/js_test_files.js"
		},
		"dependencies": {
			"ast-types": "0.8.14",
			"colors": ">=0.6.2",
			"minimist": ">=0.2.0"
		},
		"description": "JavaScript parser written in OCaml. Produces SpiderMonkey AST",
		"devDependencies": {
			"esprima-fb": "15001.1001.0-dev-harmony-fb"
		},
		"engines": {
			"node": ">=0.4.0"
		},
		"license": "BSD-3-Clause",
		"main": "flow_parser.js",
		"name": "flow-parser",
		"optionalDependencies": {},
		"readme": "# The Flow Parser\n\nThe Flow Parser is a JavaScript parser written in OCaml. It produces an AST that conforms to [SpiderMonkey's Parser API](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API) and that mostly matches what [esprima](http://esprima.org/) produces. The Flow Parser can be compiled to native code or can be compiled to JavaScript using [js_of_ocaml](http://ocsigen.org/js_of_ocaml/).\n\n## Building the Flow Parser\n\nBuilding the Flow Parser requires OCaml. Compiling to JavaScript requires js_of_ocaml.\n\n### Initial set up\n\n* [Install opam](https://opam.ocaml.org/doc/Install.html)\n* `opam install js_of_ocaml`\n\n### Building the OCaml Flow Parser library\n\n    make\n    \n### Compiling the Flow Parser to JavaScript\n\n    make js\n\n## Tests\n\nThe Flow Parser's test suite tests the JavaScript version of the parser, so you will need js_of_ocaml installed. The tests and tools also have some node module dependencies, so you will need to run\n\n### Initial set up\n\n* Follow the steps in [Building the Flow Parser](https://github.com/facebook/flow/blob/master/src/parser/README.md#building-the-flow-parser)\n* `npm install`\n\n### Running the Tests\n\n    make test\n",
		"readmeFilename": "README.md",
		"repository": {
			"private": true
		},
		"scripts": {
			"prepublish": "make js",
			"test": "node test/run_tests.js"
		},
		"version": "0.21.0"
	};

/***/ },

/***/ "./src/parsers/js/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	__webpack_require__("./node_modules/codemirror/mode/javascript/javascript.js");
	
	var id = 'javascript';
	exports.id = id;
	var displayName = 'JavaScript';
	exports.displayName = displayName;
	var mimeTypes = ['text/javascript'];
	exports.mimeTypes = mimeTypes;

/***/ },

/***/ "./src/parsers/js/recast.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _objectWithoutProperties = __webpack_require__("./node_modules/babel-runtime/helpers/object-without-properties.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	// eslint-disable-line no-unused-vars
	
	var _utilsDefaultESTreeParserInterface = __webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js");
	
	var _utilsDefaultESTreeParserInterface2 = _interopRequireDefault(_utilsDefaultESTreeParserInterface);
	
	var _recastPackageJson = __webpack_require__("./node_modules/recast/package.json");
	
	var _recastPackageJson2 = _interopRequireDefault(_recastPackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'recast';
	var options = _extends({
	  tolerant: false,
	  range: true,
	  parser: 'esprima-fb'
	}, LocalStorage.getParserSettings(ID));
	
	var settings = ['range', 'tolerant', ['parser', ['esprima', 'babel-core']]];
	
	exports['default'] = _extends({}, _utilsDefaultESTreeParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _recastPackageJson2['default'].version,
	  homepage: _recastPackageJson2['default'].homepage,
	  locationProps: new _Set(['range', 'loc', 'start', 'end']),
	
	  loadParser: function loadParser(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/recast/main.js"), __webpack_require__("./node_modules/babel-core/index.js")]; (function (recast, babelCore) {
	      callback({
	        recast: recast,
	        parsers: {
	          'babel-core': babelCore
	        }
	      });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(15, __WEBPACK_CALLBACK__);}());
	  },
	
	  parse: function parse(_ref, code) {
	    var recast = _ref.recast;
	    var parsers = _ref.parsers;
	    var parser = options.parser;
	
	    var localOptions = _objectWithoutProperties(options, ['parser']);
	
	    if (parser !== 'esprima') {
	      localOptions.esprima = parsers[parser];
	    }
	    return recast.parse(code, localOptions);
	  },
	
	  _ignoredProperties: new _Set(['__clone']),
	
	  nodeToRange: function nodeToRange(node) {
	    if (options.parser === 'babel-core' && typeof node.start === 'number') {
	      return [node.start, node.end];
	    }
	    return node.range;
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      required: new _Set(['range']),
	      values: options,
	      onChange: changeOption
	    });
	  }
	});
	
	function changeOption(name, _ref2) {
	  var target = _ref2.target;
	
	  var value = undefined;
	  switch (name) {
	    case 'parser':
	      value = target.value;
	      break;
	    default:
	      value = target.checked;
	  }
	  options[name] = value;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/recast/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"recast@0.11.2",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "recast@0.11.2",
		"_id": "recast@0.11.2",
		"_inCache": true,
		"_installable": true,
		"_location": "/recast",
		"_nodeVersion": "4.2.4",
		"_npmOperationalInternal": {
			"host": "packages-6-west.internal.npmjs.com",
			"tmp": "tmp/recast-0.11.2.tgz_1455993688097_0.9990146656055003"
		},
		"_npmUser": {
			"email": "bn@cs.stanford.edu",
			"name": "benjamn"
		},
		"_npmVersion": "3.3.9",
		"_phantomChildren": {},
		"_requested": {
			"name": "recast",
			"raw": "recast@0.11.2",
			"rawSpec": "0.11.2",
			"scope": null,
			"spec": "0.11.2",
			"type": "version"
		},
		"_requiredBy": [
			"/",
			"/jscodeshift"
		],
		"_resolved": "https://registry.npmjs.org/recast/-/recast-0.11.2.tgz",
		"_shasum": "4e060a49b763ceb6292d2c34aae63fec7aad7893",
		"_shrinkwrap": null,
		"_spec": "recast@0.11.2",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "bn@cs.stanford.edu",
			"name": "Ben Newman"
		},
		"browser": {
			"fs": false
		},
		"bugs": {
			"url": "https://github.com/benjamn/recast/issues"
		},
		"dependencies": {
			"ast-types": "0.8.15",
			"esprima": "~2.7.1",
			"private": "~0.1.5",
			"source-map": "~0.5.0"
		},
		"description": "JavaScript syntax tree transformer, nondestructive pretty-printer, and automatic source map generator",
		"devDependencies": {
			"babylon": "~6.4.2",
			"esprima-fb": "^15001.1001.0-dev-harmony-fb",
			"mocha": "~2.2.5"
		},
		"directories": {},
		"dist": {
			"shasum": "4e060a49b763ceb6292d2c34aae63fec7aad7893",
			"tarball": "http://registry.npmjs.org/recast/-/recast-0.11.2.tgz"
		},
		"engines": {
			"node": ">= 0.8"
		},
		"gitHead": "d7108087d56d43f7841117d6ea7682758d538a27",
		"homepage": "http://github.com/benjamn/recast",
		"keywords": [
			"ast",
			"codegen",
			"parsing",
			"pretty-printing",
			"refactoring",
			"rewriting",
			"syntax",
			"transformation"
		],
		"license": "MIT",
		"main": "main.js",
		"maintainers": [
			{
				"name": "benjamn",
				"email": "bn@cs.stanford.edu"
			}
		],
		"name": "recast",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git://github.com/benjamn/recast.git"
		},
		"scripts": {
			"debug": "node ./node_modules/mocha/bin/mocha --debug-brk --reporter spec",
			"test": "node ./node_modules/mocha/bin/mocha --reporter spec --full-trace"
		},
		"version": "0.11.2"
	};

/***/ },

/***/ "./src/parsers/js/shift.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _shiftParserPackageJson = __webpack_require__("./node_modules/shift-parser/package.json");
	
	var _shiftParserPackageJson2 = _interopRequireDefault(_shiftParserPackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'shift';
	var options = _extends({
	  loc: true,
	  earlyErrors: false,
	  sourceType: 'module'
	}, LocalStorage.getParserSettings(ID));
	
	var settings = ['loc', 'earlyErrors', ['sourceType', ['script', 'module']]];
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _shiftParserPackageJson2['default'].version,
	  homepage: _shiftParserPackageJson2['default'].homepage,
	  locationProps: new _Set(['loc']),
	
	  loadParser: function loadParser(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/shift-parser/dist/index.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(16, __WEBPACK_CALLBACK__);}());
	  },
	
	  parse: function parse(shift, code) {
	    if (options.sourceType === 'module') {
	      return shift.parseModule(code, options);
	    } else {
	      return shift.parseScript(code, options);
	    }
	  },
	
	  nodeToRange: function nodeToRange(_ref) {
	    var loc = _ref.loc;
	
	    if (loc) {
	      return [loc.start.offset, loc.end.offset];
	    }
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      required: new _Set(['loc']),
	      values: options,
	      onChange: changeOption
	    });
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'items' || key === 'declaration' || key === 'declarators' || key === 'statements' || key === 'expression' || key === 'body';
	  }
	});
	
	function changeOption(name, _ref2) {
	  var target = _ref2.target;
	
	  var value = undefined;
	  switch (name) {
	    case 'sourceType':
	      value = target.value;
	      break;
	    default:
	      value = target.checked;
	  }
	  options[name] = value;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/shift-parser/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"shift-parser@https://registry.npmjs.org/shift-parser/-/shift-parser-4.1.0.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "shift-parser@>=4.1.0 <5.0.0",
		"_id": "shift-parser@4.1.0",
		"_inCache": true,
		"_location": "/shift-parser",
		"_phantomChildren": {},
		"_requested": {
			"name": "shift-parser",
			"raw": "shift-parser@https://registry.npmjs.org/shift-parser/-/shift-parser-4.1.0.tgz",
			"rawSpec": "https://registry.npmjs.org/shift-parser/-/shift-parser-4.1.0.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/shift-parser/-/shift-parser-4.1.0.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/shift-parser/-/shift-parser-4.1.0.tgz",
		"_shasum": "1de50f56f3bc2da678d1e8f1ed506c71e07a4411",
		"_shrinkwrap": null,
		"_spec": "shift-parser@https://registry.npmjs.org/shift-parser/-/shift-parser-4.1.0.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"name": "Shape Security Labs"
		},
		"bugs": {
			"url": "https://github.com/shapesecurity/shift-parser-js/issues"
		},
		"dependencies": {
			"es6-map": "^0.1.1",
			"esutils": "^2.0.2",
			"multimap": "^0.1.1",
			"shift-reducer": "^3.0.2"
		},
		"description": "ECMAScript parser that produces a Shift format AST",
		"devDependencies": {
			"acorn": "2.1.0",
			"angular": "1.4.3",
			"babel-cli": "6.3.13",
			"babel-preset-es2015": "6.3.13",
			"babel-register": "6.3.13",
			"benchmark": "1.0.0",
			"commonjs-everywhere": "0.9.7",
			"esprima": "2.5.0",
			"everything.js": "1.0.3",
			"expect.js": "0.3.1",
			"microtime": "^2.0.0",
			"mocha": "2.2.5",
			"shift-spec": "2015.2.1",
			"tick": "0.1.1",
			"traceur": "0.0.91",
			"uglifyjs": "2.4.10"
		},
		"files": [
			"dist"
		],
		"homepage": "https://github.com/shapesecurity/shift-parser-js",
		"keywords": [
			"API",
			"AST",
			"Parser",
			"Shift",
			"SpiderMonkey",
			"abstract",
			"monkey",
			"node",
			"parse",
			"parser",
			"spider",
			"syntax",
			"tree"
		],
		"license": "Apache-2.0",
		"main": "dist/index.js",
		"name": "shift-parser",
		"optionalDependencies": {},
		"readme": "Shift Parser\n============\n\n\n## About\n\nThis module provides an [ECMAScript](http://www.ecma-international.org/publications/standards/Ecma-262.htm)\nparser that produces a [Shift format](https://github.com/shapesecurity/shift-spec) AST.\n\n\n## Status\n\n[Stable](http://nodejs.org/api/documentation.html#documentation_stability_index).\n\nThe parser supports version 6 (release candidate 2) of the ECMA-262 standard.\n\n\n## Installation\n\n```sh\nnpm install shift-parser\n```\n\n\n## Usage\n\n```es6\nimport parse from \"shift-parser\";\nlet ast = parse(\"/* ECMAScript program text */\");\n```\n\n```es6\nimport {parseScript, parseModule} from \"shift-parser\";\nlet scriptAST = parseScript(\"/* ECMAScript Script text */\");\nlet moduleAST = parseModule(\"/* ECMAScript Module text */\");\n```\n\nOr in node.js:\n\n```js\nvar parseScript = require(\"shift-parser\").parseScript;\nvar scriptAST = parseScript(\"/* ECMAScript Script text */\");\n```\n\n\n## Contributing\n\n* Open a Github issue with a description of your desired change. If one exists already, leave a message stating that you are working on it with the date you expect it to be complete.\n* Fork this repo, and clone the forked repo.\n* Install dependencies with `npm install`.\n* Build and test in your environment with `npm run build && npm test`.\n* Create a feature branch. Make your changes. Add tests.\n* Build and test in your environment with `npm run build && npm test`.\n* Make a commit that includes the text \"fixes #*XX*\" where *XX* is the Github issue.\n* Open a Pull Request on Github.\n\n\n## License\n\n    Copyright 2014 Shape Security, Inc.\n\n    Licensed under the Apache License, Version 2.0 (the \"License\");\n    you may not use this file except in compliance with the License.\n    You may obtain a copy of the License at\n\n        http://www.apache.org/licenses/LICENSE-2.0\n\n    Unless required by applicable law or agreed to in writing, software\n    distributed under the License is distributed on an \"AS IS\" BASIS,\n    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n    See the License for the specific language governing permissions and\n    limitations under the License.\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/shapesecurity/shift-parser-js.git"
		},
		"scripts": {
			"benchmark": "node benchmark",
			"build": "babel --source-maps-inline --out-dir dist src",
			"cjsify": "npm run build && cjsify dist/index.js --no-node --export Shift --output dist/shift.js",
			"prepublish": "rm -rf dist/* && npm update && npm run build",
			"profile": "node --prof profile.js && node-tick-processor",
			"test": "mocha --inline-diffs --check-leaks --ui tdd --reporter dot --slow 200 --timeout 5000 --recursive test"
		},
		"version": "4.1.0"
	};

/***/ },

/***/ "./src/parsers/js/traceur.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _toConsumableArray = __webpack_require__("./node_modules/babel-runtime/helpers/to-consumable-array.js")['default'];
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _regeneratorRuntime = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _traceurPackageJson = __webpack_require__("./node_modules/traceur/package.json");
	
	var _traceurPackageJson2 = _interopRequireDefault(_traceurPackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'traceur';
	var FILENAME = 'astExplorer.js';
	
	var parseOptionsDefaults = {
	  annotations: false,
	  arrayComprehension: false,
	  arrowFunctions: true,
	  asyncFunctions: false,
	  asyncGenerators: false,
	  blockBinding: true,
	  classes: true,
	  computedPropertyNames: true,
	  destructuring: true,
	  exponentiation: false,
	  exportFromExtended: false,
	  forOf: true,
	  forOn: false,
	  generatorComprehension: false,
	  generators: true,
	  jsx: true,
	  memberVariables: false,
	  numericLiterals: true,
	  propertyMethods: true,
	  propertyNameShorthand: true,
	  restParameters: true,
	  spread: true,
	  templateLiterals: true,
	  types: false,
	  unicodeEscapeSequences: true
	};
	
	var options = _extends({
	  SourceType: 'Script',
	  TolerateErrors: false,
	  commentCallback: true
	}, parseOptionsDefaults, LocalStorage.getParserSettings(ID));
	
	var settings = [['SourceType', ['Script', 'Module']], 'TolerateErrors'].concat(_toConsumableArray(_Object$keys(parseOptionsDefaults)));
	
	var changeOption = function changeOption(name, _ref) {
	  var target = _ref.target;
	
	  options[name] = name === 'SourceType' ? target.value : target.checked;
	  LocalStorage.setParserSettings(ID, options);
	};
	
	var Comment = function Comment(sourceRange) {
	  _classCallCheck(this, Comment);
	
	  this.type = 'COMMENT';
	  Object.defineProperty(this, 'location', { value: sourceRange });
	  this.value = sourceRange.toString();
	};
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _traceurPackageJson2['default'].version,
	  homepage: _traceurPackageJson2['default'].homepage,
	  locationProps: new _Set(['location']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(17, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/exports-loader/index.js?traceur!./node_modules/traceur/bin/traceur.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  parse: function parse(traceur, code) {
	    var sourceFile = new traceur.syntax.SourceFile(FILENAME, code);
	    var errorReporter = new traceur.util.ErrorReporter();
	    errorReporter.reportMessageInternal = function (sourceRange, message) {
	      if (options.TolerateErrors) {
	        return;
	      }
	      var start = sourceRange.start;
	      var end = sourceRange.end;
	
	      if (start.offset < end.offset) {
	        message += ': ' + sourceRange;
	      }
	      var err = new SyntaxError(message);
	      err.lineNumber = start.line + 1;
	      err.columnNumber = start.column;
	      throw err;
	    };
	    var parser = new traceur.syntax.Parser(sourceFile, errorReporter, new traceur.util.Options(options));
	    var comments = [];
	    parser.handleComment = function (sourceRange) {
	      comments.push(new Comment(sourceRange));
	    };
	    var ast = options.SourceType === 'Script' ? parser.parseScript() : parser.parseModule();
	    ast.comments = comments;
	    return ast;
	  },
	
	  getNodeName: function getNodeName(node) {
	    return node.constructor.name;
	  },
	
	  forEachProperty: _regeneratorRuntime.mark(function forEachProperty(node) {
	    var prop;
	    return _regeneratorRuntime.wrap(function forEachProperty$(context$1$0) {
	      while (1) switch (context$1$0.prev = context$1$0.next) {
	        case 0:
	          if (!('type' in node)) {
	            context$1$0.next = 3;
	            break;
	          }
	
	          context$1$0.next = 3;
	          return {
	            value: node.type,
	            key: 'type'
	          };
	
	        case 3:
	          context$1$0.t0 = _regeneratorRuntime.keys(node);
	
	        case 4:
	          if ((context$1$0.t1 = context$1$0.t0()).done) {
	            context$1$0.next = 13;
	            break;
	          }
	
	          prop = context$1$0.t1.value;
	
	          if (prop === 'line_' || prop === 'column_') {
	            prop = prop.slice(0, -1);
	          }
	
	          if (!(prop === 'type' || prop === 'lineNumberTable')) {
	            context$1$0.next = 9;
	            break;
	          }
	
	          return context$1$0.abrupt('continue', 4);
	
	        case 9:
	          context$1$0.next = 11;
	          return {
	            value: node[prop],
	            key: prop
	          };
	
	        case 11:
	          context$1$0.next = 4;
	          break;
	
	        case 13:
	        case 'end':
	          return context$1$0.stop();
	      }
	    }, forEachProperty, this);
	  }),
	
	  nodeToRange: function nodeToRange(_ref2) {
	    var loc = _ref2.location;
	
	    if (loc) {
	      return [loc.start.offset, loc.end.offset];
	    }
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'scriptItemList' || key === 'declarations' || key === 'statements' || key === 'parameters' || Array.isArray(node) && key === 'args' || key === 'binding' || key === 'expression' || key === 'expressions' || key === 'literalToken' || key === 'identifierToken';
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      values: options,
	      onChange: changeOption
	    });
	  }
	});
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/traceur/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"traceur@https://registry.npmjs.org/traceur/-/traceur-0.0.102.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "traceur@0.0.102",
		"_id": "traceur@0.0.102",
		"_inCache": true,
		"_location": "/traceur",
		"_phantomChildren": {
			"inflight": "1.0.4",
			"inherits": "2.0.1",
			"minimatch": "2.0.10",
			"once": "1.3.3"
		},
		"_requested": {
			"name": "traceur",
			"raw": "traceur@https://registry.npmjs.org/traceur/-/traceur-0.0.102.tgz",
			"rawSpec": "https://registry.npmjs.org/traceur/-/traceur-0.0.102.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/traceur/-/traceur-0.0.102.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/traceur/-/traceur-0.0.102.tgz",
		"_shasum": "cdcd98419ceac31453b9066f4fa3aa972c206f6e",
		"_shrinkwrap": null,
		"_spec": "traceur@https://registry.npmjs.org/traceur/-/traceur-0.0.102.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"name": "Traceur Authors"
		},
		"bin": {
			"traceur": "./traceur"
		},
		"bugs": {
			"url": "https://github.com/google/traceur-compiler/issues"
		},
		"dependencies": {
			"commander": "2.6",
			"glob": "4.3",
			"rsvp": "^3.0.13",
			"semver": "4.3.2",
			"source-map-support": "~0.2.8"
		},
		"description": "ES6 to ES5 compiler",
		"devDependencies": {
			"chai": "2.2.x",
			"express": "4.x",
			"mocha": "2.2.x",
			"node-uuid": "1.x",
			"promises-aplus-tests": "2.x",
			"regenerate": "1.2.1",
			"regexpu": "1.1.0",
			"regjsgen": "0.2.0",
			"regjsparser": "0.1.5",
			"requirejs": "2.x",
			"serve-index": "1.x",
			"source-map": "0.1.43",
			"traceur": "0.0.101",
			"webcomponents.js": "^0.5.4-1"
		},
		"engines": {
			"node": ">=0.10"
		},
		"files": [
			"bin/traceur-runtime.js",
			"bin/traceur.js",
			"dist/",
			"src/",
			"traceur"
		],
		"homepage": "https://github.com/google/traceur-compiler",
		"keywords": [
			"ES.next",
			"compiler",
			"ecmascript",
			"es5",
			"es6",
			"harmony",
			"javascript",
			"language",
			"transpiler"
		],
		"license": "Apache-2.0",
		"main": "./src/node/api.js",
		"name": "traceur",
		"optionalDependencies": {},
		"readme": "[![Join the chat at https://gitter.im/google/traceur-compiler](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/google/traceur-compiler?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)\n[![Build Status](https://travis-ci.org/google/traceur-compiler.svg)](https://travis-ci.org/google/traceur-compiler)\n\n<img src=\"https://google.github.com/traceur-compiler/logo/tc.svg\" alt=\"Traceur logo\" width=\"200px\">\n\n## What is Traceur?\n\nTraceur is a JavaScript.next-to-JavaScript-of-today compiler that allows you to\nuse features from the future **today**. Traceur supports ES6 as well as some experimental ES.next features.\n\nTraceur's goal is to inform the design\nof new JavaScript features which are only valuable if they allow you to write\nbetter code. Traceur allows you to try out new and proposed\n[language features](https://github.com/google/traceur-compiler/wiki/LanguageFeatures)\ntoday, helping you say what you mean in your code while informing the standards process.\n\nJavaScript's evolution needs your input.\n[Try](https://github.com/google/traceur-compiler/wiki/Getting-Started) out the\nnew language features.\n[Tell us](http://groups.google.com/group/traceur-compiler-discuss)\nhow they work for you and what's still causing you to use more boilerplate and\n\"design patterns\" than you prefer.\n\n## What now? What can Traceur do for me?\n\nRead the\n[Getting Started](https://github.com/google/traceur-compiler/wiki/Getting-Started)\npage to get up and running. You can use some language features right now and\neven try it out in your browser\n[here](https://google.github.io/traceur-compiler/demo/repl.html).\nJust type in some code and see what Traceur produces. For an idea of what is\navailable and what we have in the pipeline, see the\n[Language Features](https://github.com/google/traceur-compiler/wiki/LanguageFeatures)\npage.\n\nThe JSConf 2011 presentation of Traceur describes the goals of the project and\nwhat it can do today. Some documentation is on the wiki on this site.\nExtra demos are in the source repository.\n\nWe also presented Traceur at NodeConf 2011. The video is\navailable on [YouTube](http://www.youtube.com/watch?feature=player_detailpage&v=ntDZa7ekFEA).\n\nQuestions, suggestions, and comments can be directed to the\n[discussion group](http://groups.google.com/group/traceur-compiler-discuss).\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/google/traceur-compiler.git"
		},
		"scripts": {
			"/** Update Version Number **/": "After publishing version N, update the version number and commit the result",
			"/** Update gh-pages branch **/": "Ater publishing version N, update the github docs and REPL",
			"checkout-gh-pages": "git checkout -b upstream_gh_pages upstream/master",
			"checkout-upstream": "git checkout -b upstream_master upstream/master",
			"commit-gh-pages": "git add -- src/ bin/ && ./traceur -v | xargs -I VERSION git commit -a -m \"Commit binaries for VERSION\"",
			"commit-published": "cat build/npm-version-number | xargs -I VERSION git commit -a -m \"VERSION\"",
			"just-publish": "npm publish # workaround https://github.com/npm/npm/issues/10074 ",
			"postjust-publish": "npm run push-published && npm run push-gh-pages",
			"postpush-gh-pages": "git checkout master && git branch -D upstream_gh_pages",
			"postpush-published": "git checkout master && git branch -D upstream_master",
			"precheckout-gh-pages": "git branch -D upstream_gh_pages || true",
			"precheckout-upstream": "git fetch upstream && git branch -D upstream_master || true",
			"precommit-gh-pages": "npm run checkout-gh-pages && npm run rebuild && cp gh-pages.gitignore .gitignore # tell git to commit built files.",
			"precommit-published": "npm run update-semver && npm run rebuild",
			"prejust-publish": "npm run checkout-upstream && npm run rebuild",
			"prepush-gh-pages": "npm run commit-gh-pages",
			"prepush-published": "npm run commit-published && npm run tag-published",
			"push-gh-pages": "git push -f upstream upstream_gh_pages:gh-pages",
			"push-published": "git push --tags upstream upstream_master:master && git push upstream upstream_master:master  # Push source for version N+1",
			"rebuild": "make clean && make dist/commonjs && make test",
			"start": "make && node ./demo/expressServer.js",
			"store-semver": "node build/versionInfo.js -v > build/npm-version-number",
			"tag-published": "cat build/npm-version-number | xargs -I VERSION git tag -a VERSION -m \"Tagged version VERSION \"",
			"test": "make test",
			"update-semver": "npm run store-semver && git diff --quiet -- package.json && node build/versionInfo.js -n"
		},
		"subdomain": "traceur",
		"version": "0.0.102"
	};

/***/ },

/***/ "./src/parsers/js/transformers/babel/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "export default function ({Plugin, types: t}) {\n  return new Plugin('ast-transform', {\n    visitor: {\n      Identifier(node) {\n        return t.identifier(node.name.split('').reverse().join(''));\n      }\n    }\n  });\n}\n"

/***/ },

/***/ "./src/parsers/js/transformers/babel/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsCompileModule = __webpack_require__("./src/parsers/utils/compileModule.js");
	
	var _utilsCompileModule2 = _interopRequireDefault(_utilsCompileModule);
	
	var _babelCorePackageJson = __webpack_require__("./node_modules/babel-core/package.json");
	
	var _babelCorePackageJson2 = _interopRequireDefault(_babelCorePackageJson);
	
	var ID = 'babel';
	
	var options = {
	  stage: 0
	};
	
	exports['default'] = {
	  id: ID,
	  displayName: ID,
	  version: _babelCorePackageJson2['default'].version,
	  homepage: _babelCorePackageJson2['default'].homepage,
	
	  defaultParserID: 'babylon',
	
	  loadTransformer: function loadTransformer(callback) {
	    __webpack_require__.e/* require */(26, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/babel-core/index.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  transform: function transform(babel, transformCode, code) {
	    var transform = (0, _utilsCompileModule2['default'])( // eslint-disable-line no-shadow
	    babel.transform(transformCode, options).code);
	
	    return babel.transform(code, _extends({}, options, {
	      plugins: [transform],
	      sourceMaps: true
	    }));
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/babel-core/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"babel-core@https://registry.npmjs.org/babel-core/-/babel-core-5.8.35.tgz",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "babel-core@>=5.7.3 <6.0.0",
		"_id": "babel-core@5.8.35",
		"_inCache": true,
		"_location": "/babel-core",
		"_phantomChildren": {},
		"_requested": {
			"name": "babel-core",
			"raw": "babel-core@https://registry.npmjs.org/babel-core/-/babel-core-5.8.35.tgz",
			"rawSpec": "https://registry.npmjs.org/babel-core/-/babel-core-5.8.35.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/babel-core/-/babel-core-5.8.35.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/",
			"/babel-eslint",
			"/babel-loader",
			"/jscodeshift"
		],
		"_resolved": "https://registry.npmjs.org/babel-core/-/babel-core-5.8.35.tgz",
		"_shasum": "9d27c5f7199a400cc426ce1f6fac149065ea14bf",
		"_shrinkwrap": null,
		"_spec": "babel-core@https://registry.npmjs.org/babel-core/-/babel-core-5.8.35.tgz",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "sebmck@gmail.com",
			"name": "Sebastian McKenzie"
		},
		"browser": {
			"./lib/api/register/node.js": "./lib/api/register/browser.js"
		},
		"bugs": {
			"url": "https://github.com/babel/babel/issues"
		},
		"dependencies": {
			"babel-plugin-constant-folding": "^1.0.1",
			"babel-plugin-dead-code-elimination": "^1.0.2",
			"babel-plugin-eval": "^1.0.1",
			"babel-plugin-inline-environment-variables": "^1.0.1",
			"babel-plugin-jscript": "^1.0.4",
			"babel-plugin-member-expression-literals": "^1.0.1",
			"babel-plugin-property-literals": "^1.0.1",
			"babel-plugin-proto-to-assign": "^1.0.3",
			"babel-plugin-react-constant-elements": "^1.0.3",
			"babel-plugin-react-display-name": "^1.0.3",
			"babel-plugin-remove-console": "^1.0.1",
			"babel-plugin-remove-debugger": "^1.0.1",
			"babel-plugin-runtime": "^1.0.7",
			"babel-plugin-undeclared-variables-check": "^1.0.2",
			"babel-plugin-undefined-to-void": "^1.1.6",
			"babylon": "^5.8.35",
			"bluebird": "^2.9.33",
			"chalk": "^1.0.0",
			"convert-source-map": "^1.1.0",
			"core-js": "^1.0.0",
			"debug": "^2.1.1",
			"detect-indent": "^3.0.0",
			"esutils": "^2.0.0",
			"fs-readdir-recursive": "^0.1.0",
			"globals": "^6.4.0",
			"home-or-tmp": "^1.0.0",
			"is-integer": "^1.0.4",
			"js-tokens": "1.0.1",
			"json5": "^0.4.0",
			"line-numbers": "0.2.0",
			"lodash": "^3.10.0",
			"minimatch": "^2.0.3",
			"output-file-sync": "^1.1.0",
			"path-exists": "^1.0.0",
			"path-is-absolute": "^1.0.0",
			"private": "^0.1.6",
			"regenerator": "0.8.40",
			"regexpu": "^1.3.0",
			"repeating": "^1.1.2",
			"resolve": "^1.1.6",
			"shebang-regex": "^1.0.0",
			"slash": "^1.0.0",
			"source-map": "^0.5.0",
			"source-map-support": "^0.2.10",
			"to-fast-properties": "^1.0.0",
			"trim-right": "^1.0.0",
			"try-resolve": "^1.0.0"
		},
		"description": "A compiler for writing next generation JavaScript",
		"devDependencies": {},
		"homepage": "https://babeljs.io/",
		"keywords": [
			"6to5",
			"babel",
			"classes",
			"const",
			"es6",
			"harmony",
			"let",
			"modules",
			"transpile",
			"transpiler",
			"var"
		],
		"license": "MIT",
		"name": "babel-core",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/babel/babel.git"
		},
		"scripts": {
			"bench": "make bench",
			"test": "make test"
		},
		"version": "5.8.35"
	};

/***/ },

/***/ "./src/parsers/js/transformers/babel6/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "export default function ({types: t}) {\n  return {\n    visitor: {\n      Identifier(path) {\n        path.node.name = path.node.name.split('').reverse().join('');\n      }\n    }\n  };\n}\n"

/***/ },

/***/ "./src/parsers/js/transformers/babel6/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsCompileModule = __webpack_require__("./src/parsers/utils/compileModule.js");
	
	var _utilsCompileModule2 = _interopRequireDefault(_utilsCompileModule);
	
	var _babel6Node_modulesBabelCorePackageJson = __webpack_require__("./node_modules/babel6/node_modules/babel-core/package.json");
	
	var _babel6Node_modulesBabelCorePackageJson2 = _interopRequireDefault(_babel6Node_modulesBabelCorePackageJson);
	
	var ID = 'babelv6';
	
	exports['default'] = {
	  id: ID,
	  displayName: ID,
	  version: _babel6Node_modulesBabelCorePackageJson2['default'].version,
	  homepage: _babel6Node_modulesBabelCorePackageJson2['default'].homepage,
	
	  defaultParserID: 'babylon6',
	
	  loadTransformer: function loadTransformer(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/babel6/index.js"), __webpack_require__("./node_modules/babel-preset-es2015/index.js"), __webpack_require__("./node_modules/babel-preset-stage-0/index.js"), __webpack_require__("./node_modules/babel-preset-react/index.js")]; (function (babel) {
	      for (var _len = arguments.length, presets = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        presets[_key - 1] = arguments[_key];
	      }
	
	      return callback({ babel: babel, presets: presets });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(18, __WEBPACK_CALLBACK__);}());
	  },
	
	  transform: function transform(_ref, transformCode, code) {
	    var babel = _ref.babel;
	    var presets = _ref.presets;
	
	    var transform = (0, _utilsCompileModule2['default'])( // eslint-disable-line no-shadow
	    babel.transform(transformCode, { presets: presets }).code);
	
	    return babel.transform(code, {
	      presets: presets,
	      plugins: [(transform['default'] || transform)(babel)],
	      sourceMaps: true
	    });
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/babel6/node_modules/babel-core/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"babel-core@https://registry.npmjs.org/babel-core/-/babel-core-6.4.5.tgz",
				"/Users/fkling/git/astexplorer/node_modules/babel6"
			]
		],
		"_from": "babel-core@>=6.2.0 <7.0.0",
		"_id": "babel-core@6.4.5",
		"_inCache": true,
		"_location": "/babel6/babel-core",
		"_phantomChildren": {},
		"_requested": {
			"name": "babel-core",
			"raw": "babel-core@https://registry.npmjs.org/babel-core/-/babel-core-6.4.5.tgz",
			"rawSpec": "https://registry.npmjs.org/babel-core/-/babel-core-6.4.5.tgz",
			"scope": null,
			"spec": "https://registry.npmjs.org/babel-core/-/babel-core-6.4.5.tgz",
			"type": "remote"
		},
		"_requiredBy": [
			"/babel6"
		],
		"_resolved": "https://registry.npmjs.org/babel-core/-/babel-core-6.4.5.tgz",
		"_shasum": "5973f9418cd97fde664186f288c16dc4edb65f4f",
		"_shrinkwrap": null,
		"_spec": "babel-core@https://registry.npmjs.org/babel-core/-/babel-core-6.4.5.tgz",
		"_where": "/Users/fkling/git/astexplorer/node_modules/babel6",
		"author": {
			"email": "sebmck@gmail.com",
			"name": "Sebastian McKenzie"
		},
		"dependencies": {
			"babel-code-frame": "^6.3.13",
			"babel-generator": "^6.4.5",
			"babel-helpers": "^6.4.5",
			"babel-messages": "^6.3.13",
			"babel-register": "^6.3.13",
			"babel-runtime": "^5.0.0",
			"babel-template": "^6.3.13",
			"babel-traverse": "^6.4.5",
			"babel-types": "^6.4.5",
			"babylon": "^6.4.5",
			"convert-source-map": "^1.1.0",
			"debug": "^2.1.1",
			"json5": "^0.4.0",
			"lodash": "^3.10.0",
			"minimatch": "^2.0.3",
			"path-exists": "^1.0.0",
			"path-is-absolute": "^1.0.0",
			"private": "^0.1.6",
			"shebang-regex": "^1.0.0",
			"slash": "^1.0.0",
			"source-map": "^0.5.0"
		},
		"description": "Babel compiler core.",
		"devDependencies": {
			"babel-helper-fixtures": "^6.3.13",
			"babel-helper-transform-fixture-test-runner": "^6.3.13",
			"babel-polyfill": "^6.3.13"
		},
		"homepage": "https://babeljs.io/",
		"keywords": [
			"6to5",
			"babel",
			"classes",
			"const",
			"es6",
			"harmony",
			"let",
			"modules",
			"transpile",
			"transpiler",
			"var"
		],
		"license": "MIT",
		"name": "babel-core",
		"optionalDependencies": {},
		"readme": "# babel-core\n\n> Babel compiler core.\n\n## Install\n\n```\n$ npm install babel-core\n```\n\n## Usage\n\n```js\nimport babel from 'babel-core';\n\nconst code = `class Example {}`;\nconst result = babel.transform(code, { /* options */ });\n\nresult.code; // Generated code\nresult.map; // Sourcemap\nresult.ast; // AST\n```\n\nFor more in depth documentation see: http://babeljs.io/docs/usage/api/\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "https://github.com/babel/babel/tree/master/packages/babel-core"
		},
		"scripts": {
			"bench": "make bench",
			"test": "make test"
		},
		"version": "6.4.5"
	};

/***/ },

/***/ "./src/parsers/js/transformers/jscodeshift/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "export default function transformer(file, api) {\n  const j = api.jscodeshift;\n  const {expression, statement, statements} = j.template;\n\n  return j(file.source)\n    .find(j.Identifier)\n    .replaceWith(\n      p => j.identifier(p.node.name.split('').reverse().join(''))\n    )\n    .toSource();\n};\n"

/***/ },

/***/ "./src/parsers/js/transformers/jscodeshift/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _Object$getOwnPropertyNames = __webpack_require__("./node_modules/babel-runtime/core-js/object/get-own-property-names.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsCompileModule = __webpack_require__("./src/parsers/utils/compileModule.js");
	
	var _utilsCompileModule2 = _interopRequireDefault(_utilsCompileModule);
	
	var _jscodeshiftPackageJson = __webpack_require__("./node_modules/jscodeshift/package.json");
	
	var _jscodeshiftPackageJson2 = _interopRequireDefault(_jscodeshiftPackageJson);
	
	var ID = 'jscodeshift';
	
	var sessionMethods = new _Set();
	
	exports['default'] = {
	  id: ID,
	  displayName: ID,
	  version: _jscodeshiftPackageJson2['default'].version,
	  homepage: _jscodeshiftPackageJson2['default'].homepage,
	
	  defaultParserID: 'recast',
	
	  loadTransformer: function loadTransformer(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/jscodeshift/index.js"), __webpack_require__("./node_modules/babel-core/index.js")]; (function (jscodeshift, babel) {
	      var registerMethods = jscodeshift.registerMethods;
	
	      var origMethods = undefined;
	
	      jscodeshift.registerMethods({
	        hasOwnProperty: function hasOwnProperty(name) {
	          // compare only against current-session & very original methods
	          if (!origMethods) {
	            origMethods = new _Set(_Object$getOwnPropertyNames(this));
	          }
	          return origMethods.has(name) || sessionMethods.has(name);
	        }
	      });
	
	      // patch in order to collect user-defined method names
	      jscodeshift.registerMethods = function (methods) {
	        registerMethods.apply(this, arguments);
	        for (var _name in methods) {
	          sessionMethods.add(_name);
	        }
	      };
	
	      callback({ jscodeshift: jscodeshift, babel: babel });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(19, __WEBPACK_CALLBACK__);}());
	  },
	
	  transform: function transform(_ref, transformCode, code) {
	    var jscodeshift = _ref.jscodeshift;
	    var babel = _ref.babel;
	
	    sessionMethods.clear();
	    var transform = (0, _utilsCompileModule2['default'])( // eslint-disable-line no-shadow
	    babel.transform(transformCode).code);
	    var result = transform({
	      path: 'Live.js',
	      source: code
	    }, { jscodeshift: jscodeshift }, {});
	    if (result == null) {
	      // If null is returned, the jscodeshift runner won't touch the original
	      // code, so we just return that.
	      return code;
	    } else if (typeof result !== 'string') {
	      throw new Error('Transformers must either return undefined, null or a string, not ' + ('"' + typeof result + '".'));
	    }
	    return result;
	  }
	};
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/get-own-property-names.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__("./node_modules/core-js/library/fn/object/get-own-property-names.js"), __esModule: true };

/***/ },

/***/ "./node_modules/core-js/library/fn/object/get-own-property-names.js":
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__("./node_modules/core-js/library/modules/$.js");
	__webpack_require__("./node_modules/core-js/library/modules/es6.object.get-own-property-names.js");
	module.exports = function getOwnPropertyNames(it){
	  return $.getNames(it);
	};

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.get-own-property-names.js":
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__("./node_modules/core-js/library/modules/$.object-sap.js")('getOwnPropertyNames', function(){
	  return __webpack_require__("./node_modules/core-js/library/modules/$.get-names.js").get;
	});

/***/ },

/***/ "./node_modules/jscodeshift/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"jscodeshift@0.3.13",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "jscodeshift@0.3.13",
		"_id": "jscodeshift@0.3.13",
		"_inCache": true,
		"_location": "/jscodeshift",
		"_nodeVersion": "5.4.1",
		"_npmUser": {
			"email": "felix.kling@gmx.net",
			"name": "fkling"
		},
		"_npmVersion": "3.5.3",
		"_phantomChildren": {},
		"_requested": {
			"name": "jscodeshift",
			"raw": "jscodeshift@0.3.13",
			"rawSpec": "0.3.13",
			"scope": null,
			"spec": "0.3.13",
			"type": "version"
		},
		"_requiredBy": [
			"/"
		],
		"_shasum": "775023e8a45fa07f2aa711acce2c589f3a641f5a",
		"_shrinkwrap": null,
		"_spec": "jscodeshift@0.3.13",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"name": "Felix Kling"
		},
		"bin": {
			"jscodeshift": "./bin/jscodeshift.sh"
		},
		"bugs": {
			"url": "https://github.com/facebook/jscodeshift/issues"
		},
		"dependencies": {
			"async": "^1.5.0",
			"babel-core": "^5.8.21",
			"babel-runtime": "^5.6.18",
			"cli-color": "^1.0.0",
			"es6-promise": "^3.0.0",
			"lodash": "^3.5.0",
			"node-dir": "0.1.8",
			"nomnom": "^1.8.1",
			"recast": "^0.11.0"
		},
		"description": "A toolkit for JavaScript codemods",
		"devDependencies": {
			"babel": "^5.6.14",
			"babel-jest": "^5.3.0",
			"jest-cli": "^0.8.0",
			"temp": "^0.8.1"
		},
		"directories": {},
		"dist": {
			"shasum": "775023e8a45fa07f2aa711acce2c589f3a641f5a",
			"tarball": "http://registry.npmjs.org/jscodeshift/-/jscodeshift-0.3.13.tgz"
		},
		"gitHead": "b5e05937a3a3abe2580e5de13b1af2539e03caa8",
		"homepage": "https://github.com/facebook/jscodeshift#readme",
		"jest": {
			"preprocessCachingDisabled": true,
			"scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
			"testPathDirs": [
				"bin",
				"src"
			],
			"unmockedModulePathPatterns": [
				"node_modules/"
			]
		},
		"keywords": [
			"codemod",
			"recast"
		],
		"license": "BSD-3-Clause",
		"main": "index.js",
		"maintainers": [
			{
				"name": "fkling",
				"email": "felix.kling@gmx.net"
			}
		],
		"name": "jscodeshift",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/facebook/jscodeshift.git"
		},
		"scripts": {
			"build": "rm -rf dist; babel src/ --out-dir dist/",
			"prepublish": "npm run test && npm run build",
			"test": " npm run build && jest",
			"watch": "babel src/ --out-dir dist/ --watch"
		},
		"version": "0.3.13"
	};

/***/ },

/***/ "./src/parsers/js/typescript.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _regeneratorRuntime = __webpack_require__("./node_modules/babel-runtime/regenerator/index.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _typescriptPackageJson = __webpack_require__("./node_modules/typescript/package.json");
	
	var _typescriptPackageJson2 = _interopRequireDefault(_typescriptPackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'typescript';
	var FILENAME = 'astExplorer.ts';
	var options = _extends({
	  experimentalDecorators: true,
	  experimentalAsyncFunctions: true,
	  jsx: true
	}, LocalStorage.getParserSettings(ID));
	
	var settings = ['experimentalDecorators', 'experimentalAsyncFunctions', 'jsx'];
	
	var changeOption = function changeOption(name, _ref) {
	  var target = _ref.target;
	
	  options[name] = target.checked;
	  LocalStorage.setParserSettings(ID, options);
	};
	
	var ts = undefined;
	var getComments = undefined;
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _typescriptPackageJson2['default'].version,
	  homepage: _typescriptPackageJson2['default'].homepage,
	  locationProps: new _Set(['pos', 'end']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(20, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/typescript/lib/typescript.js")]; (function (_ts) {
	      return callback(ts = _ts);
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	  },
	
	  parse: function parse(ts, code) {
	    var compilerHost = {
	      fileExists: function fileExists() {
	        return true;
	      },
	      getCanonicalFileName: function getCanonicalFileName(filename) {
	        return filename;
	      },
	      getCurrentDirectory: function getCurrentDirectory() {
	        return '';
	      },
	      getDefaultLibFileName: function getDefaultLibFileName() {
	        return 'lib.d.ts';
	      },
	      getNewLine: function getNewLine() {
	        return '\n';
	      },
	      getSourceFile: function getSourceFile(filename) {
	        return ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true);
	      },
	      readFile: function readFile() {
	        return null;
	      },
	      useCaseSensitiveFileNames: function useCaseSensitiveFileNames() {
	        return true;
	      },
	      writeFile: function writeFile() {
	        return null;
	      }
	    };
	
	    var filename = FILENAME + (options.jsx ? 'x' : '');
	
	    var program = ts.createProgram([filename], {
	      noResolve: true,
	      target: ts.ScriptTarget.Latest,
	      experimentalDecorators: options.experimentalDecorators,
	      experimentalAsyncFunctions: options.experimentalAsyncFunctions,
	      jsx: options.jsx ? 'preserve' : undefined
	    }, compilerHost);
	
	    var sourceFile = program.getSourceFile(filename);
	
	    getComments = function (node, isTrailing) {
	      if (node.parent) {
	        var nodePos = isTrailing ? node.end : node.pos;
	        var parentPos = isTrailing ? node.parent.end : node.parent.pos;
	
	        if (node.parent.kind === ts.SyntaxKind.SourceFile || nodePos !== parentPos) {
	          var comments = isTrailing ? ts.getTrailingCommentRanges(sourceFile.text, nodePos) : ts.getLeadingCommentRanges(sourceFile.text, nodePos);
	
	          if (Array.isArray(comments)) {
	            comments.forEach(function (comment) {
	              comment.type = ts.SyntaxKind[comment.kind];
	              comment.text = sourceFile.text.substring(comment.pos, comment.end);
	            });
	
	            return comments;
	          }
	        }
	      }
	    };
	
	    return sourceFile;
	  },
	
	  getNodeName: function getNodeName(node) {
	    if (node.kind) {
	      return ts.SyntaxKind[node.kind];
	    }
	  },
	
	  forEachProperty: _regeneratorRuntime.mark(function forEachProperty(node) {
	    var prop;
	    return _regeneratorRuntime.wrap(function forEachProperty$(context$1$0) {
	      while (1) switch (context$1$0.prev = context$1$0.next) {
	        case 0:
	          context$1$0.t0 = _regeneratorRuntime.keys(node);
	
	        case 1:
	          if ((context$1$0.t1 = context$1$0.t0()).done) {
	            context$1$0.next = 9;
	            break;
	          }
	
	          prop = context$1$0.t1.value;
	
	          if (!(prop === 'constructor' || prop.charAt(0) === '_')) {
	            context$1$0.next = 5;
	            break;
	          }
	
	          return context$1$0.abrupt('continue', 1);
	
	        case 5:
	          context$1$0.next = 7;
	          return {
	            value: node[prop],
	            key: prop
	          };
	
	        case 7:
	          context$1$0.next = 1;
	          break;
	
	        case 9:
	          context$1$0.next = 11;
	          return {
	            value: getComments(node),
	            key: 'leadingComments',
	            computed: true
	          };
	
	        case 11:
	          context$1$0.next = 13;
	          return {
	            value: getComments(node, true),
	            key: 'trailingCommments',
	            computed: true
	          };
	
	        case 13:
	        case 'end':
	          return context$1$0.stop();
	      }
	    }, forEachProperty, this);
	  }),
	
	  nodeToRange: function nodeToRange(node) {
	    if (typeof node.getStart === 'function' && typeof node.getEnd === 'function') {
	      return [node.getStart(), node.getEnd()];
	    } else if (typeof node.pos !== 'undefined' && typeof node.end !== 'undefined') {
	      return [node.pos, node.end];
	    }
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'statements' || key === 'declarationList' || key === 'declarations';
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      values: options,
	      onChange: changeOption
	    });
	  }
	});
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/typescript/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"typescript@1.8.2",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "typescript@1.8.2",
		"_id": "typescript@1.8.2",
		"_inCache": true,
		"_installable": true,
		"_location": "/typescript",
		"_npmOperationalInternal": {
			"host": "packages-6-west.internal.npmjs.com",
			"tmp": "tmp/typescript-1.8.2.tgz_1456180363305_0.6699868906289339"
		},
		"_npmUser": {
			"email": "typescript@microsoft.com",
			"name": "typescript"
		},
		"_npmVersion": "2.0.0",
		"_phantomChildren": {},
		"_requested": {
			"name": "typescript",
			"raw": "typescript@1.8.2",
			"rawSpec": "1.8.2",
			"scope": null,
			"spec": "1.8.2",
			"type": "version"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/typescript/-/typescript-1.8.2.tgz",
		"_shasum": "4d2ad7db172be67a913d09862b510133bad61b33",
		"_shrinkwrap": null,
		"_spec": "typescript@1.8.2",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"name": "Microsoft Corp."
		},
		"bin": {
			"tsc": "./bin/tsc",
			"tsserver": "./bin/tsserver"
		},
		"browser": {
			"buffer": false,
			"fs": false,
			"os": false,
			"path": false
		},
		"bugs": {
			"url": "https://github.com/Microsoft/TypeScript/issues"
		},
		"dependencies": {},
		"description": "TypeScript is a language for application scale JavaScript development",
		"devDependencies": {
			"browserify": "latest",
			"chai": "latest",
			"istanbul": "latest",
			"jake": "latest",
			"mocha": "2.3.4",
			"mocha-fivemat-progress-reporter": "latest",
			"tsd": "latest",
			"tslint": "next",
			"typescript": "next"
		},
		"directories": {},
		"dist": {
			"shasum": "4d2ad7db172be67a913d09862b510133bad61b33",
			"tarball": "http://registry.npmjs.org/typescript/-/typescript-1.8.2.tgz"
		},
		"engines": {
			"node": ">=0.8.0"
		},
		"gitHead": "e5dd34f9e69f517182abfc996a10b8312b14e015",
		"homepage": "http://typescriptlang.org/",
		"keywords": [
			"Microsoft",
			"TypeScript",
			"compiler",
			"javascript",
			"language"
		],
		"license": "Apache-2.0",
		"main": "./lib/typescript.js",
		"maintainers": [
			{
				"name": "typescript",
				"email": "typescript@microsoft.com"
			}
		],
		"name": "typescript",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/Microsoft/TypeScript.git"
		},
		"scripts": {
			"build": "npm run build:compiler && npm run build:tests",
			"build:compiler": "jake local",
			"build:tests": "jake tests",
			"clean": "jake clean",
			"jake": "jake",
			"lint": "jake lint",
			"pretest": "jake tests",
			"setup-hooks": "node scripts/link-hooks.js",
			"test": "jake runtests"
		},
		"typings": "./lib/typescript.d.ts",
		"version": "1.8.2"
	};

/***/ },

/***/ "./src/parsers/js/uglify.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _uglifyJsPackageJson = __webpack_require__("./node_modules/uglify-js/package.json");
	
	var _uglifyJsPackageJson2 = _interopRequireDefault(_uglifyJsPackageJson);
	
	var _utilsCompileModule = __webpack_require__("./src/parsers/utils/compileModule.js");
	
	var _utilsCompileModule2 = _interopRequireDefault(_utilsCompileModule);
	
	var ID = 'uglify-js';
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _uglifyJsPackageJson2['default'].version,
	  homepage: _uglifyJsPackageJson2['default'].homepage,
	  locationProps: new _Set(['start', 'end']),
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(21, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/raw-loader/index.js!./node_modules/uglify-js/lib/utils.js"), __webpack_require__("./node_modules/raw-loader/index.js!./node_modules/uglify-js/lib/ast.js"), __webpack_require__("./node_modules/raw-loader/index.js!./node_modules/uglify-js/lib/parse.js")]; (function () {
	      for (var _len = arguments.length, contents = Array(_len), _key = 0; _key < _len; _key++) {
	        contents[_key] = arguments[_key];
	      }
	
	      contents.push('exports.parse = parse;');
	      callback((0, _utilsCompileModule2['default'])(contents.join('\n\n')));
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	  },
	
	  parse: function parse(UglifyJS, code) {
	    return UglifyJS.parse(code);
	  },
	
	  getNodeName: function getNodeName(node) {
	    var type = node.TYPE;
	    if (type === 'Token') {
	      type += '(' + node.type + ')';
	    }
	    return type;
	  },
	
	  nodeToRange: function nodeToRange(node) {
	    var start = undefined,
	        end = undefined;
	    switch (node.TYPE) {
	      case 'Token':
	        start = end = node;
	        break;
	      case undefined:
	        return;
	      default:
	        start = node.start;
	        end = node.end;
	
	        break;
	    }
	    return [start.pos, end.endpos];
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'body' || key === 'elements' || // array literals
	    key === 'definitions' || // variable declaration
	    key === 'properties';
	  },
	
	  _ignoredProperties: new _Set(['_walk', 'CTOR'])
	});
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/uglify-js/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"git+https://github.com/mishoo/UglifyJS2.git#harmony",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "git+https://github.com/mishoo/UglifyJS2.git#harmony",
		"_id": "uglify-js@2.6.1",
		"_inCache": true,
		"_installable": true,
		"_location": "/uglify-js",
		"_phantomChildren": {
			"camelcase": "1.2.1",
			"cliui": "2.1.0",
			"decamelize": "1.1.2"
		},
		"_requested": {
			"hosted": {
				"directUrl": "https://raw.githubusercontent.com/mishoo/UglifyJS2/harmony/package.json",
				"gitUrl": "git://github.com/mishoo/UglifyJS2.git#harmony",
				"httpsUrl": "git+https://github.com/mishoo/UglifyJS2.git#harmony",
				"shortcut": "github:mishoo/UglifyJS2#harmony",
				"ssh": "git@github.com:mishoo/UglifyJS2.git#harmony",
				"sshUrl": "git+ssh://git@github.com/mishoo/UglifyJS2.git#harmony",
				"type": "github"
			},
			"name": null,
			"raw": "git+https://github.com/mishoo/UglifyJS2.git#harmony",
			"rawSpec": "git+https://github.com/mishoo/UglifyJS2.git#harmony",
			"scope": null,
			"spec": "git+https://github.com/mishoo/UglifyJS2.git#harmony",
			"type": "hosted"
		},
		"_requiredBy": [
			"/",
			"/handlebars",
			"/html-minifier",
			"/webpack"
		],
		"_resolved": "git+https://github.com/mishoo/UglifyJS2.git#0b303379c0cdc33a8c14c97ab29148d981b4887e",
		"_shasum": "8102a8ed7d037f4b981e2bbc43937a8b02e0c13e",
		"_shrinkwrap": null,
		"_spec": "git+https://github.com/mishoo/UglifyJS2.git#harmony",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "mihai.bazon@gmail.com",
			"name": "Mihai Bazon",
			"url": "http://lisperator.net/"
		},
		"bin": {
			"uglifyjs": "bin/uglifyjs"
		},
		"browserify": {
			"transform": [
				"uglify-to-browserify"
			]
		},
		"bugs": {
			"url": "https://github.com/mishoo/UglifyJS2/issues"
		},
		"dependencies": {
			"async": "~0.2.6",
			"source-map": "~0.5.1",
			"uglify-to-browserify": "~1.0.0",
			"yargs": "~3.10.0"
		},
		"description": "JavaScript parser, mangler/compressor and beautifier toolkit",
		"devDependencies": {
			"acorn": "~0.6.0",
			"escodegen": "~1.3.3",
			"esfuzz": "~0.3.1",
			"estraverse": "~1.5.1"
		},
		"engines": {
			"node": ">=0.8.0"
		},
		"files": [
			"LICENSE",
			"bin",
			"lib",
			"tools"
		],
		"gitHead": "0b303379c0cdc33a8c14c97ab29148d981b4887e",
		"homepage": "http://lisperator.net/uglifyjs",
		"license": "BSD-2-Clause",
		"main": "tools/node.js",
		"maintainers": [
			{
				"name": "Mihai Bazon",
				"email": "mihai.bazon@gmail.com",
				"url": "http://lisperator.net/"
			}
		],
		"name": "uglify-js",
		"optionalDependencies": {},
		"readme": "UglifyJS 2\n==========\n[![Build Status](https://travis-ci.org/mishoo/UglifyJS2.svg)](https://travis-ci.org/mishoo/UglifyJS2)\n\nUglifyJS is a JavaScript parser, minifier, compressor or beautifier toolkit.\n\nThis page documents the command line utility.  For\n[API and internals documentation see my website](http://lisperator.net/uglifyjs/).\nThere's also an\n[in-browser online demo](http://lisperator.net/uglifyjs/#demo) (for Firefox,\nChrome and probably Safari).\n\nInstall\n-------\n\nFirst make sure you have installed the latest version of [node.js](http://nodejs.org/)\n(You may need to restart your computer after this step).\n\nFrom NPM for use as a command line app:\n\n    npm install uglify-js -g\n\nFrom NPM for programmatic use:\n\n    npm install uglify-js\n\nFrom Git:\n\n    git clone git://github.com/mishoo/UglifyJS2.git\n    cd UglifyJS2\n    npm link .\n\nUsage\n-----\n\n    uglifyjs [input files] [options]\n\nUglifyJS2 can take multiple input files.  It's recommended that you pass the\ninput files first, then pass the options.  UglifyJS will parse input files\nin sequence and apply any compression options.  The files are parsed in the\nsame global scope, that is, a reference from a file to some\nvariable/function declared in another file will be matched properly.\n\nIf you want to read from STDIN instead, pass a single dash instead of input\nfiles.\n\nIf you wish to pass your options before the input files, separate the two with\na double dash to prevent input files being used as option arguments:\n\n    uglifyjs --compress --mangle -- input.js\n\nThe available options are:\n\n```\n  --source-map                  Specify an output file where to generate source\n                                map.\n  --source-map-root             The path to the original source to be included\n                                in the source map.\n  --source-map-url              The path to the source map to be added in //#\n                                sourceMappingURL.  Defaults to the value passed\n                                with --source-map.\n  --source-map-include-sources  Pass this flag if you want to include the\n                                content of source files in the source map as\n                                sourcesContent property.\n  --in-source-map               Input source map, useful if you're compressing\n                                JS that was generated from some other original\n                                code.\n  --screw-ie8                   Pass this flag if you don't care about full\n                                compliance with Internet Explorer 6-8 quirks\n                                (by default UglifyJS will try to be IE-proof).\n  --expr                        Parse a single expression, rather than a\n                                program (for parsing JSON)\n  -p, --prefix                  Skip prefix for original filenames that appear\n                                in source maps. For example -p 3 will drop 3\n                                directories from file names and ensure they are\n                                relative paths. You can also specify -p\n                                relative, which will make UglifyJS figure out\n                                itself the relative paths between original\n                                sources, the source map and the output file.\n  -o, --output                  Output file (default STDOUT).\n  -b, --beautify                Beautify output/specify output options.\n  -m, --mangle                  Mangle names/pass mangler options.\n  -r, --reserved                Reserved names to exclude from mangling.\n  -c, --compress                Enable compressor/pass compressor options. Pass\n                                options like -c\n                                hoist_vars=false,if_return=false. Use -c with\n                                no argument to use the default compression\n                                options.\n  -d, --define                  Global definitions\n  -e, --enclose                 Embed everything in a big function, with a\n                                configurable parameter/argument list.\n  --comments                    Preserve copyright comments in the output. By\n                                default this works like Google Closure, keeping\n                                JSDoc-style comments that contain \"@license\" or\n                                \"@preserve\". You can optionally pass one of the\n                                following arguments to this flag:\n                                - \"all\" to keep all comments\n                                - a valid JS regexp (needs to start with a\n                                slash) to keep only comments that match.\n                                Note that currently not *all* comments can be\n                                kept when compression is on, because of dead\n                                code removal or cascading statements into\n                                sequences.\n  --preamble                    Preamble to prepend to the output.  You can use\n                                this to insert a comment, for example for\n                                licensing information.  This will not be\n                                parsed, but the source map will adjust for its\n                                presence.\n  --stats                       Display operations run time on STDERR.\n  --acorn                       Use Acorn for parsing.\n  --spidermonkey                Assume input files are SpiderMonkey AST format\n                                (as JSON).\n  --self                        Build itself (UglifyJS2) as a library (implies\n                                --wrap=UglifyJS --export-all)\n  --wrap                        Embed everything in a big function, making the\n                                “exports” and “global” variables available. You\n                                need to pass an argument to this option to\n                                specify the name that your module will take\n                                when included in, say, a browser.\n  --export-all                  Only used when --wrap, this tells UglifyJS to\n                                add code to automatically export all globals.\n  --lint                        Display some scope warnings\n  -v, --verbose                 Verbose\n  -V, --version                 Print version number and exit.\n  --noerr                       Don't throw an error for unknown options in -c,\n                                -b or -m.\n  --bare-returns                Allow return outside of functions.  Useful when\n                                minifying CommonJS modules.\n  --keep-fnames                 Do not mangle/drop function names.  Useful for\n                                code relying on Function.prototype.name.\n  --reserved-file               File containing reserved names\n  --reserve-domprops            Make (most?) DOM properties reserved for\n                                --mangle-props\n  --mangle-props                Mangle property names\n  --mangle-regex                Only mangle property names matching the regex\n  --name-cache                  File to hold mangled names mappings\n  --pure-funcs                  List of functions that can be safely removed if\n                                their return value is not used           [array]\n```\n\nSpecify `--output` (`-o`) to declare the output file.  Otherwise the output\ngoes to STDOUT.\n\n## Source map options\n\nUglifyJS2 can generate a source map file, which is highly useful for\ndebugging your compressed JavaScript.  To get a source map, pass\n`--source-map output.js.map` (full path to the file where you want the\nsource map dumped).\n\nAdditionally you might need `--source-map-root` to pass the URL where the\noriginal files can be found.  In case you are passing full paths to input\nfiles to UglifyJS, you can use `--prefix` (`-p`) to specify the number of\ndirectories to drop from the path prefix when declaring files in the source\nmap.\n\nFor example:\n\n    uglifyjs /home/doe/work/foo/src/js/file1.js \\\n             /home/doe/work/foo/src/js/file2.js \\\n             -o foo.min.js \\\n             --source-map foo.min.js.map \\\n             --source-map-root http://foo.com/src \\\n             -p 5 -c -m\n\nThe above will compress and mangle `file1.js` and `file2.js`, will drop the\noutput in `foo.min.js` and the source map in `foo.min.js.map`.  The source\nmapping will refer to `http://foo.com/src/js/file1.js` and\n`http://foo.com/src/js/file2.js` (in fact it will list `http://foo.com/src`\nas the source map root, and the original files as `js/file1.js` and\n`js/file2.js`).\n\n### Composed source map\n\nWhen you're compressing JS code that was output by a compiler such as\nCoffeeScript, mapping to the JS code won't be too helpful.  Instead, you'd\nlike to map back to the original code (i.e. CoffeeScript).  UglifyJS has an\noption to take an input source map.  Assuming you have a mapping from\nCoffeeScript → compiled JS, UglifyJS can generate a map from CoffeeScript →\ncompressed JS by mapping every token in the compiled JS to its original\nlocation.\n\nTo use this feature you need to pass `--in-source-map\n/path/to/input/source.map`.  Normally the input source map should also point\nto the file containing the generated JS, so if that's correct you can omit\ninput files from the command line.\n\n## Mangler options\n\nTo enable the mangler you need to pass `--mangle` (`-m`).  The following\n(comma-separated) options are supported:\n\n- `sort` — to assign shorter names to most frequently used variables.  This\n  saves a few hundred bytes on jQuery before gzip, but the output is\n  _bigger_ after gzip (and seems to happen for other libraries I tried it\n  on) therefore it's not enabled by default.\n\n- `toplevel` — mangle names declared in the toplevel scope (disabled by\n  default).\n\n- `eval` — mangle names visible in scopes where `eval` or `with` are used\n  (disabled by default).\n\nWhen mangling is enabled but you want to prevent certain names from being\nmangled, you can declare those names with `--reserved` (`-r`) — pass a\ncomma-separated list of names.  For example:\n\n    uglifyjs ... -m -r '$,require,exports'\n\nto prevent the `require`, `exports` and `$` names from being changed.\n\n### Mangling property names (`--mangle-props`)\n\n**Note:** this will probably break your code.  Mangling property names is a\nseparate step, different from variable name mangling.  Pass\n`--mangle-props`.  It will mangle all properties that are seen in some\nobject literal, or that are assigned to.  For example:\n\n```js\nvar x = {\n  foo: 1\n};\n\nx.bar = 2;\nx[\"baz\"] = 3;\nx[condition ? \"moo\" : \"boo\"] = 4;\nconsole.log(x.something());\n```\n\nIn the above code, `foo`, `bar`, `baz`, `moo` and `boo` will be replaced\nwith single characters, while `something()` will be left as is.\n\nIn order for this to be of any use, we should avoid mangling standard JS\nnames.  For instance, if your code would contain `x.length = 10`, then\n`length` becomes a candidate for mangling and it will be mangled throughout\nthe code, regardless if it's being used as part of your own objects or\naccessing an array's length.  To avoid that, you can use `--reserved-file`\nto pass a filename that should contain the names to be excluded from\nmangling.  This file can be used both for excluding variable names and\nproperty names.  It could look like this, for example:\n\n```js\n{\n  \"vars\": [ \"define\", \"require\", ... ],\n  \"props\": [ \"length\", \"prototype\", ... ]\n}\n```\n\n`--reserved-file` can be an array of file names (either a single\ncomma-separated argument, or you can pass multiple `--reserved-file`\narguments) — in this case it will exclude names from all those files.\n\nA default exclusion file is provided in `tools/domprops.json` which should\ncover most standard JS and DOM properties defined in various browsers.  Pass\n`--reserve-domprops` to read that in.\n\nYou can also use a regular expression to define which property names should be\nmangled.  For example, `--mangle-regex=\"/^_/\"` will only mangle property names\nthat start with an underscore.\n\nWhen you compress multiple files using this option, in order for them to\nwork together in the end we need to ensure somehow that one property gets\nmangled to the same name in all of them.  For this, pass `--name-cache\nfilename.json` and UglifyJS will maintain these mappings in a file which can\nthen be reused.  It should be initially empty.  Example:\n\n```\nrm -f /tmp/cache.json  # start fresh\nuglifyjs file1.js file2.js --mangle-props --name-cache /tmp/cache.json -o part1.js\nuglifyjs file3.js file4.js --mangle-props --name-cache /tmp/cache.json -o part2.js\n```\n\nNow, `part1.js` and `part2.js` will be consistent with each other in terms\nof mangled property names.\n\nUsing the name cache is not necessary if you compress all your files in a\nsingle call to UglifyJS.\n\n## Compressor options\n\nYou need to pass `--compress` (`-c`) to enable the compressor.  Optionally\nyou can pass a comma-separated list of options.  Options are in the form\n`foo=bar`, or just `foo` (the latter implies a boolean option that you want\nto set `true`; it's effectively a shortcut for `foo=true`).\n\n- `sequences` -- join consecutive simple statements using the comma operator\n\n- `properties` -- rewrite property access using the dot notation, for\n  example `foo[\"bar\"] → foo.bar`\n\n- `dead_code` -- remove unreachable code\n\n- `drop_debugger` -- remove `debugger;` statements\n\n- `unsafe` (default: false) -- apply \"unsafe\" transformations (discussion below)\n\n- `conditionals` -- apply optimizations for `if`-s and conditional\n  expressions\n\n- `comparisons` -- apply certain optimizations to binary nodes, for example:\n  `!(a <= b) → a > b` (only when `unsafe`), attempts to negate binary nodes,\n  e.g. `a = !b && !c && !d && !e → a=!(b||c||d||e)` etc.\n\n- `evaluate` -- attempt to evaluate constant expressions\n\n- `booleans` -- various optimizations for boolean context, for example `!!a\n  ? b : c → a ? b : c`\n\n- `loops` -- optimizations for `do`, `while` and `for` loops when we can\n  statically determine the condition\n\n- `unused` -- drop unreferenced functions and variables\n\n- `hoist_funs` -- hoist function declarations\n\n- `hoist_vars` (default: false) -- hoist `var` declarations (this is `false`\n  by default because it seems to increase the size of the output in general)\n\n- `if_return` -- optimizations for if/return and if/continue\n\n- `join_vars` -- join consecutive `var` statements\n\n- `cascade` -- small optimization for sequences, transform `x, x` into `x`\n  and `x = something(), x` into `x = something()`\n\n- `warnings` -- display warnings when dropping unreachable code or unused\n  declarations etc.\n\n- `negate_iife` -- negate \"Immediately-Called Function Expressions\"\n  where the return value is discarded, to avoid the parens that the\n  code generator would insert.\n\n- `pure_getters` -- the default is `false`.  If you pass `true` for\n  this, UglifyJS will assume that object property access\n  (e.g. `foo.bar` or `foo[\"bar\"]`) doesn't have any side effects.\n\n- `pure_funcs` -- default `null`.  You can pass an array of names and\n  UglifyJS will assume that those functions do not produce side\n  effects.  DANGER: will not check if the name is redefined in scope.\n  An example case here, for instance `var q = Math.floor(a/b)`.  If\n  variable `q` is not used elsewhere, UglifyJS will drop it, but will\n  still keep the `Math.floor(a/b)`, not knowing what it does.  You can\n  pass `pure_funcs: [ 'Math.floor' ]` to let it know that this\n  function won't produce any side effect, in which case the whole\n  statement would get discarded.  The current implementation adds some\n  overhead (compression will be slower).\n\n- `drop_console` -- default `false`.  Pass `true` to discard calls to\n  `console.*` functions.\n\n- `keep_fargs` -- default `true`.  Prevents the\n  compressor from discarding unused function arguments.  You need this\n  for code which relies on `Function.length`.\n\n- `keep_fnames` -- default `false`.  Pass `true` to prevent the\n  compressor from mangling/discarding function names.  Useful for code relying on\n  `Function.prototype.name`.\n\n\n### The `unsafe` option\n\nIt enables some transformations that *might* break code logic in certain\ncontrived cases, but should be fine for most code.  You might want to try it\non your own code, it should reduce the minified size.  Here's what happens\nwhen this flag is on:\n\n- `new Array(1, 2, 3)` or `Array(1, 2, 3)` → `[ 1, 2, 3 ]`\n- `new Object()` → `{}`\n- `String(exp)` or `exp.toString()` → `\"\" + exp`\n- `new Object/RegExp/Function/Error/Array (...)` → we discard the `new`\n- `typeof foo == \"undefined\"` → `foo === void 0`\n- `void 0` → `undefined` (if there is a variable named \"undefined\" in\n  scope; we do it because the variable name will be mangled, typically\n  reduced to a single character)\n\n### Conditional compilation\n\nYou can use the `--define` (`-d`) switch in order to declare global\nvariables that UglifyJS will assume to be constants (unless defined in\nscope).  For example if you pass `--define DEBUG=false` then, coupled with\ndead code removal UglifyJS will discard the following from the output:\n```javascript\nif (DEBUG) {\n\tconsole.log(\"debug stuff\");\n}\n```\n\nUglifyJS will warn about the condition being always false and about dropping\nunreachable code; for now there is no option to turn off only this specific\nwarning, you can pass `warnings=false` to turn off *all* warnings.\n\nAnother way of doing that is to declare your globals as constants in a\nseparate file and include it into the build.  For example you can have a\n`build/defines.js` file with the following:\n```javascript\nconst DEBUG = false;\nconst PRODUCTION = true;\n// etc.\n```\n\nand build your code like this:\n\n    uglifyjs build/defines.js js/foo.js js/bar.js... -c\n\nUglifyJS will notice the constants and, since they cannot be altered, it\nwill evaluate references to them to the value itself and drop unreachable\ncode as usual.  The possible downside of this approach is that the build\nwill contain the `const` declarations.\n\n<a name=\"codegen-options\"></a>\n## Beautifier options\n\nThe code generator tries to output shortest code possible by default.  In\ncase you want beautified output, pass `--beautify` (`-b`).  Optionally you\ncan pass additional arguments that control the code output:\n\n- `beautify` (default `true`) -- whether to actually beautify the output.\n  Passing `-b` will set this to true, but you might need to pass `-b` even\n  when you want to generate minified code, in order to specify additional\n  arguments, so you can use `-b beautify=false` to override it.\n- `indent-level` (default 4)\n- `indent-start` (default 0) -- prefix all lines by that many spaces\n- `quote-keys` (default `false`) -- pass `true` to quote all keys in literal\n  objects\n- `space-colon` (default `true`) -- insert a space after the colon signs\n- `ascii-only` (default `false`) -- escape Unicode characters in strings and\n  regexps\n- `inline-script` (default `false`) -- escape the slash in occurrences of\n  `</script` in strings\n- `width` (default 80) -- only takes effect when beautification is on, this\n  specifies an (orientative) line width that the beautifier will try to\n  obey.  It refers to the width of the line text (excluding indentation).\n  It doesn't work very well currently, but it does make the code generated\n  by UglifyJS more readable.\n- `max-line-len` (default 32000) -- maximum line length (for uglified code)\n- `bracketize` (default `false`) -- always insert brackets in `if`, `for`,\n  `do`, `while` or `with` statements, even if their body is a single\n  statement.\n- `semicolons` (default `true`) -- separate statements with semicolons.  If\n  you pass `false` then whenever possible we will use a newline instead of a\n  semicolon, leading to more readable output of uglified code (size before\n  gzip could be smaller; size after gzip insignificantly larger).\n- `preamble` (default `null`) -- when passed it must be a string and\n  it will be prepended to the output literally.  The source map will\n  adjust for this text.  Can be used to insert a comment containing\n  licensing information, for example.\n- `quote_style` (default `0`) -- preferred quote style for strings (affects\n  quoted property names and directives as well):\n  - `0` -- prefers double quotes, switches to single quotes when there are\n    more double quotes in the string itself.\n  - `1` -- always use single quotes\n  - `2` -- always use double quotes\n  - `3` -- always use the original quotes\n\n### Keeping copyright notices or other comments\n\nYou can pass `--comments` to retain certain comments in the output.  By\ndefault it will keep JSDoc-style comments that contain \"@preserve\",\n\"@license\" or \"@cc_on\" (conditional compilation for IE).  You can pass\n`--comments all` to keep all the comments, or a valid JavaScript regexp to\nkeep only comments that match this regexp.  For example `--comments\n'/foo|bar/'` will keep only comments that contain \"foo\" or \"bar\".\n\nNote, however, that there might be situations where comments are lost.  For\nexample:\n```javascript\nfunction f() {\n\t/** @preserve Foo Bar */\n\tfunction g() {\n\t  // this function is never called\n\t}\n\treturn something();\n}\n```\n\nEven though it has \"@preserve\", the comment will be lost because the inner\nfunction `g` (which is the AST node to which the comment is attached to) is\ndiscarded by the compressor as not referenced.\n\nThe safest comments where to place copyright information (or other info that\nneeds to be kept in the output) are comments attached to toplevel nodes.\n\n## Support for the SpiderMonkey AST\n\nUglifyJS2 has its own abstract syntax tree format; for\n[practical reasons](http://lisperator.net/blog/uglifyjs-why-not-switching-to-spidermonkey-ast/)\nwe can't easily change to using the SpiderMonkey AST internally.  However,\nUglifyJS now has a converter which can import a SpiderMonkey AST.\n\nFor example [Acorn][acorn] is a super-fast parser that produces a\nSpiderMonkey AST.  It has a small CLI utility that parses one file and dumps\nthe AST in JSON on the standard output.  To use UglifyJS to mangle and\ncompress that:\n\n    acorn file.js | uglifyjs --spidermonkey -m -c\n\nThe `--spidermonkey` option tells UglifyJS that all input files are not\nJavaScript, but JS code described in SpiderMonkey AST in JSON.  Therefore we\ndon't use our own parser in this case, but just transform that AST into our\ninternal AST.\n\n### Use Acorn for parsing\n\nMore for fun, I added the `--acorn` option which will use Acorn to do all\nthe parsing.  If you pass this option, UglifyJS will `require(\"acorn\")`.\n\nAcorn is really fast (e.g. 250ms instead of 380ms on some 650K code), but\nconverting the SpiderMonkey tree that Acorn produces takes another 150ms so\nin total it's a bit more than just using UglifyJS's own parser.\n\n### Using UglifyJS to transform SpiderMonkey AST\n\nNow you can use UglifyJS as any other intermediate tool for transforming\nJavaScript ASTs in SpiderMonkey format.\n\nExample:\n\n```javascript\nfunction uglify(ast, options, mangle) {\n  // Conversion from SpiderMonkey AST to internal format\n  var uAST = UglifyJS.AST_Node.from_mozilla_ast(ast);\n\n  // Compression\n  uAST.figure_out_scope();\n  uAST = uAST.transform(UglifyJS.Compressor(options));\n\n  // Mangling (optional)\n  if (mangle) {\n    uAST.figure_out_scope();\n    uAST.compute_char_frequency();\n    uAST.mangle_names();\n  }\n\n  // Back-conversion to SpiderMonkey AST\n  return uAST.to_mozilla_ast();\n}\n```\n\nCheck out\n[original blog post](http://rreverser.com/using-mozilla-ast-with-uglifyjs/)\nfor details.\n\nAPI Reference\n-------------\n\nAssuming installation via NPM, you can load UglifyJS in your application\nlike this:\n```javascript\nvar UglifyJS = require(\"uglify-js\");\n```\n\nIt exports a lot of names, but I'll discuss here the basics that are needed\nfor parsing, mangling and compressing a piece of code.  The sequence is (1)\nparse, (2) compress, (3) mangle, (4) generate output code.\n\n### The simple way\n\nThere's a single toplevel function which combines all the steps.  If you\ndon't need additional customization, you might want to go with `minify`.\nExample:\n```javascript\nvar result = UglifyJS.minify(\"/path/to/file.js\");\nconsole.log(result.code); // minified output\n// if you need to pass code instead of file name\nvar result = UglifyJS.minify(\"var b = function () {};\", {fromString: true});\n```\n\nYou can also compress multiple files:\n```javascript\nvar result = UglifyJS.minify([ \"file1.js\", \"file2.js\", \"file3.js\" ]);\nconsole.log(result.code);\n```\n\nTo generate a source map:\n```javascript\nvar result = UglifyJS.minify([ \"file1.js\", \"file2.js\", \"file3.js\" ], {\n\toutSourceMap: \"out.js.map\"\n});\nconsole.log(result.code); // minified output\nconsole.log(result.map);\n```\n\nNote that the source map is not saved in a file, it's just returned in\n`result.map`.  The value passed for `outSourceMap` is only used to set the\n`file` attribute in the source map (see [the spec][sm-spec]).\n\nYou can also specify sourceRoot property to be included in source map:\n```javascript\nvar result = UglifyJS.minify([ \"file1.js\", \"file2.js\", \"file3.js\" ], {\n\toutSourceMap: \"out.js.map\",\n\tsourceRoot: \"http://example.com/src\"\n});\n```\n\nIf you're compressing compiled JavaScript and have a source map for it, you\ncan use the `inSourceMap` argument:\n```javascript\nvar result = UglifyJS.minify(\"compiled.js\", {\n\tinSourceMap: \"compiled.js.map\",\n\toutSourceMap: \"minified.js.map\"\n});\n// same as before, it returns `code` and `map`\n```\n\nIf your input source map is not in a file, you can pass it in as an object\nusing the `inSourceMap` argument:\n\n```javascript\nvar result = UglifyJS.minify(\"compiled.js\", {\n\tinSourceMap: JSON.parse(my_source_map_string),\n\toutSourceMap: \"minified.js.map\"\n});\n```\n\nThe `inSourceMap` is only used if you also request `outSourceMap` (it makes\nno sense otherwise).\n\nOther options:\n\n- `warnings` (default `false`) — pass `true` to display compressor warnings.\n\n- `fromString` (default `false`) — if you pass `true` then you can pass\n  JavaScript source code, rather than file names.\n\n- `mangle` — pass `false` to skip mangling names.\n\n- `output` (default `null`) — pass an object if you wish to specify\n  additional [output options][codegen].  The defaults are optimized\n  for best compression.\n\n- `compress` (default `{}`) — pass `false` to skip compressing entirely.\n  Pass an object to specify custom [compressor options][compressor].\n\nWe could add more options to `UglifyJS.minify` — if you need additional\nfunctionality please suggest!\n\n### The hard way\n\nFollowing there's more detailed API info, in case the `minify` function is\ntoo simple for your needs.\n\n#### The parser\n```javascript\nvar toplevel_ast = UglifyJS.parse(code, options);\n```\n\n`options` is optional and if present it must be an object.  The following\nproperties are available:\n\n- `strict` — disable automatic semicolon insertion and support for trailing\n  comma in arrays and objects\n- `filename` — the name of the file where this code is coming from\n- `toplevel` — a `toplevel` node (as returned by a previous invocation of\n  `parse`)\n\nThe last two options are useful when you'd like to minify multiple files and\nget a single file as the output and a proper source map.  Our CLI tool does\nsomething like this:\n```javascript\nvar toplevel = null;\nfiles.forEach(function(file){\n\tvar code = fs.readFileSync(file, \"utf8\");\n\ttoplevel = UglifyJS.parse(code, {\n\t\tfilename: file,\n\t\ttoplevel: toplevel\n\t});\n});\n```\n\nAfter this, we have in `toplevel` a big AST containing all our files, with\neach token having proper information about where it came from.\n\n#### Scope information\n\nUglifyJS contains a scope analyzer that you need to call manually before\ncompressing or mangling.  Basically it augments various nodes in the AST\nwith information about where is a name defined, how many times is a name\nreferenced, if it is a global or not, if a function is using `eval` or the\n`with` statement etc.  I will discuss this some place else, for now what's\nimportant to know is that you need to call the following before doing\nanything with the tree:\n```javascript\ntoplevel.figure_out_scope()\n```\n\n#### Compression\n\nLike this:\n```javascript\nvar compressor = UglifyJS.Compressor(options);\nvar compressed_ast = toplevel.transform(compressor);\n```\n\nThe `options` can be missing.  Available options are discussed above in\n“Compressor options”.  Defaults should lead to best compression in most\nscripts.\n\nThe compressor is destructive, so don't rely that `toplevel` remains the\noriginal tree.\n\n#### Mangling\n\nAfter compression it is a good idea to call again `figure_out_scope` (since\nthe compressor might drop unused variables / unreachable code and this might\nchange the number of identifiers or their position).  Optionally, you can\ncall a trick that helps after Gzip (counting character frequency in\nnon-mangleable words).  Example:\n```javascript\ncompressed_ast.figure_out_scope();\ncompressed_ast.compute_char_frequency();\ncompressed_ast.mangle_names();\n```\n\n#### Generating output\n\nAST nodes have a `print` method that takes an output stream.  Essentially,\nto generate code you do this:\n```javascript\nvar stream = UglifyJS.OutputStream(options);\ncompressed_ast.print(stream);\nvar code = stream.toString(); // this is your minified code\n```\n\nor, for a shortcut you can do:\n```javascript\nvar code = compressed_ast.print_to_string(options);\n```\n\nAs usual, `options` is optional.  The output stream accepts a lot of options,\nmost of them documented above in section “Beautifier options”.  The two\nwhich we care about here are `source_map` and `comments`.\n\n#### Keeping comments in the output\n\nIn order to keep certain comments in the output you need to pass the\n`comments` option.  Pass a RegExp or a function.  If you pass a RegExp, only\nthose comments whose body matches the regexp will be kept.  Note that body\nmeans without the initial `//` or `/*`.  If you pass a function, it will be\ncalled for every comment in the tree and will receive two arguments: the\nnode that the comment is attached to, and the comment token itself.\n\nThe comment token has these properties:\n\n- `type`: \"comment1\" for single-line comments or \"comment2\" for multi-line\n  comments\n- `value`: the comment body\n- `pos` and `endpos`: the start/end positions (zero-based indexes) in the\n  original code where this comment appears\n- `line` and `col`: the line and column where this comment appears in the\n  original code\n- `file` — the file name of the original file\n- `nlb` — true if there was a newline before this comment in the original\n  code, or if this comment contains a newline.\n\nYour function should return `true` to keep the comment, or a falsy value\notherwise.\n\n#### Generating a source mapping\n\nYou need to pass the `source_map` argument when calling `print`.  It needs\nto be a `SourceMap` object (which is a thin wrapper on top of the\n[source-map][source-map] library).\n\nExample:\n```javascript\nvar source_map = UglifyJS.SourceMap(source_map_options);\nvar stream = UglifyJS.OutputStream({\n\t...\n\tsource_map: source_map\n});\ncompressed_ast.print(stream);\n\nvar code = stream.toString();\nvar map = source_map.toString(); // json output for your source map\n```\n\nThe `source_map_options` (optional) can contain the following properties:\n\n- `file`: the name of the JavaScript output file that this mapping refers to\n- `root`: the `sourceRoot` property (see the [spec][sm-spec])\n- `orig`: the \"original source map\", handy when you compress generated JS\n  and want to map the minified output back to the original code where it\n  came from.  It can be simply a string in JSON, or a JSON object containing\n  the original source map.\n\n  [acorn]: https://github.com/ternjs/acorn\n  [source-map]: https://github.com/mozilla/source-map\n  [sm-spec]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit\n  [codegen]: http://lisperator.net/uglifyjs/codegen\n  [compressor]: http://lisperator.net/uglifyjs/compress\n",
		"readmeFilename": "README.md",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/mishoo/UglifyJS2.git"
		},
		"scripts": {
			"shrinkwrap": "rm ./npm-shrinkwrap.json; rm -rf ./node_modules; npm i && npm shrinkwrap && npm outdated",
			"test": "node test/run-tests.js"
		},
		"version": "2.6.1"
	};

/***/ },

/***/ "./src/parsers/webidl/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "[\n  Constructor(ArrayBuffer buffer,\n              optional unsigned long byteOffset,\n              optional unsigned long byteLength)\n]\ninterface DataView {\n    // Gets the value of the given type at the specified byte offset\n    // from the start of the view. There is no alignment constraint;\n    // multi-byte values may be fetched from any offset.\n    //\n    // For multi-byte values, the optional littleEndian argument\n    // indicates whether a big-endian or little-endian value should be\n    // read. If false or undefined, a big-endian value is read.\n    //\n    // These methods raise an exception if they would read\n    // beyond the end of the view.\n    byte getInt8(unsigned long byteOffset);\n    octet getUint8(unsigned long byteOffset);\n    short getInt16(unsigned long byteOffset,\n                   optional boolean littleEndian);\n    unsigned short getUint16(unsigned long byteOffset,\n                             optional boolean littleEndian);\n    long getInt32(unsigned long byteOffset,\n                  optional boolean littleEndian);\n    unsigned long getUint32(unsigned long byteOffset,\n                            optional boolean littleEndian);\n    float getFloat32(unsigned long byteOffset,\n                     optional boolean littleEndian);\n    double getFloat64(unsigned long byteOffset,\n                      optional boolean littleEndian);\n\n    // Stores a value of the given type at the specified byte offset\n    // from the start of the view. There is no alignment constraint;\n    // multi-byte values may be stored at any offset.\n    //\n    // For multi-byte values, the optional littleEndian argument\n    // indicates whether the value should be stored in big-endian or\n    // little-endian byte order. If false or undefined, the value is\n    // stored in big-endian byte order.\n    //\n    // These methods raise an exception if they would write\n    // beyond the end of the view.\n    void setInt8(unsigned long byteOffset,\n                 byte value);\n    void setUint8(unsigned long byteOffset,\n                  octet value);\n    void setInt16(unsigned long byteOffset,\n                  short value,\n                  optional boolean littleEndian);\n    void setUint16(unsigned long byteOffset,\n                   unsigned short value,\n                   optional boolean littleEndian);\n    void setInt32(unsigned long byteOffset,\n                  long value,\n                  optional boolean littleEndian);\n    void setUint32(unsigned long byteOffset,\n                   unsigned long value,\n                   optional boolean littleEndian);\n    void setFloat32(unsigned long byteOffset,\n                    float value,\n                    optional boolean littleEndian);\n    void setFloat64(unsigned long byteOffset,\n                    double value,\n                    optional boolean littleEndian);\n};\nDataView implements ArrayBufferView;\n"

/***/ },

/***/ "./src/parsers/webidl/index.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	__webpack_require__("./node_modules/codemirror/mode/idl/idl.js");
	
	var id = 'idl';
	exports.id = id;
	var displayName = 'WebIDL';
	exports.displayName = displayName;
	var mimeTypes = ['text/x-idl'];
	exports.mimeTypes = mimeTypes;

/***/ },

/***/ "./node_modules/codemirror/mode/idl/idl.js":
/***/ function(module, exports, __webpack_require__) {

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: http://codemirror.net/LICENSE
	
	(function(mod) {
	  if (true) // CommonJS
	    mod(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"));
	  else if (typeof define == "function" && define.amd) // AMD
	    define(["../../lib/codemirror"], mod);
	  else // Plain browser env
	    mod(CodeMirror);
	})(function(CodeMirror) {
	  "use strict";
	
	  function wordRegexp(words) {
	    return new RegExp('^((' + words.join(')|(') + '))\\b', 'i');
	  };
	
	  var builtinArray = [
	    'a_correlate', 'abs', 'acos', 'adapt_hist_equal', 'alog',
	    'alog2', 'alog10', 'amoeba', 'annotate', 'app_user_dir',
	    'app_user_dir_query', 'arg_present', 'array_equal', 'array_indices',
	    'arrow', 'ascii_template', 'asin', 'assoc', 'atan',
	    'axis', 'axis', 'bandpass_filter', 'bandreject_filter', 'barplot',
	    'bar_plot', 'beseli', 'beselj', 'beselk', 'besely',
	    'beta', 'biginteger', 'bilinear', 'bin_date', 'binary_template',
	    'bindgen', 'binomial', 'bit_ffs', 'bit_population', 'blas_axpy',
	    'blk_con', 'boolarr', 'boolean', 'boxplot', 'box_cursor',
	    'breakpoint', 'broyden', 'bubbleplot', 'butterworth', 'bytarr',
	    'byte', 'byteorder', 'bytscl', 'c_correlate', 'calendar',
	    'caldat', 'call_external', 'call_function', 'call_method',
	    'call_procedure', 'canny', 'catch', 'cd', 'cdf', 'ceil',
	    'chebyshev', 'check_math', 'chisqr_cvf', 'chisqr_pdf', 'choldc',
	    'cholsol', 'cindgen', 'cir_3pnt', 'clipboard', 'close',
	    'clust_wts', 'cluster', 'cluster_tree', 'cmyk_convert', 'code_coverage',
	    'color_convert', 'color_exchange', 'color_quan', 'color_range_map',
	    'colorbar', 'colorize_sample', 'colormap_applicable',
	    'colormap_gradient', 'colormap_rotation', 'colortable',
	    'comfit', 'command_line_args', 'common', 'compile_opt', 'complex',
	    'complexarr', 'complexround', 'compute_mesh_normals', 'cond', 'congrid',
	    'conj', 'constrained_min', 'contour', 'contour', 'convert_coord',
	    'convol', 'convol_fft', 'coord2to3', 'copy_lun', 'correlate',
	    'cos', 'cosh', 'cpu', 'cramer', 'createboxplotdata',
	    'create_cursor', 'create_struct', 'create_view', 'crossp', 'crvlength',
	    'ct_luminance', 'cti_test', 'cursor', 'curvefit', 'cv_coord',
	    'cvttobm', 'cw_animate', 'cw_animate_getp', 'cw_animate_load',
	    'cw_animate_run', 'cw_arcball', 'cw_bgroup', 'cw_clr_index',
	    'cw_colorsel', 'cw_defroi', 'cw_field', 'cw_filesel', 'cw_form',
	    'cw_fslider', 'cw_light_editor', 'cw_light_editor_get',
	    'cw_light_editor_set', 'cw_orient', 'cw_palette_editor',
	    'cw_palette_editor_get', 'cw_palette_editor_set', 'cw_pdmenu',
	    'cw_rgbslider', 'cw_tmpl', 'cw_zoom', 'db_exists',
	    'dblarr', 'dcindgen', 'dcomplex', 'dcomplexarr', 'define_key',
	    'define_msgblk', 'define_msgblk_from_file', 'defroi', 'defsysv',
	    'delvar', 'dendro_plot', 'dendrogram', 'deriv', 'derivsig',
	    'determ', 'device', 'dfpmin', 'diag_matrix', 'dialog_dbconnect',
	    'dialog_message', 'dialog_pickfile', 'dialog_printersetup',
	    'dialog_printjob', 'dialog_read_image',
	    'dialog_write_image', 'dictionary', 'digital_filter', 'dilate', 'dindgen',
	    'dissolve', 'dist', 'distance_measure', 'dlm_load', 'dlm_register',
	    'doc_library', 'double', 'draw_roi', 'edge_dog', 'efont',
	    'eigenql', 'eigenvec', 'ellipse', 'elmhes', 'emboss',
	    'empty', 'enable_sysrtn', 'eof', 'eos', 'erase',
	    'erf', 'erfc', 'erfcx', 'erode', 'errorplot',
	    'errplot', 'estimator_filter', 'execute', 'exit', 'exp',
	    'expand', 'expand_path', 'expint', 'extrac', 'extract_slice',
	    'f_cvf', 'f_pdf', 'factorial', 'fft', 'file_basename',
	    'file_chmod', 'file_copy', 'file_delete', 'file_dirname',
	    'file_expand_path', 'file_gunzip', 'file_gzip', 'file_info',
	    'file_lines', 'file_link', 'file_mkdir', 'file_move',
	    'file_poll_input', 'file_readlink', 'file_same',
	    'file_search', 'file_tar', 'file_test', 'file_untar', 'file_unzip',
	    'file_which', 'file_zip', 'filepath', 'findgen', 'finite',
	    'fix', 'flick', 'float', 'floor', 'flow3',
	    'fltarr', 'flush', 'format_axis_values', 'forward_function', 'free_lun',
	    'fstat', 'fulstr', 'funct', 'function', 'fv_test',
	    'fx_root', 'fz_roots', 'gamma', 'gamma_ct', 'gauss_cvf',
	    'gauss_pdf', 'gauss_smooth', 'gauss2dfit', 'gaussfit',
	    'gaussian_function', 'gaussint', 'get_drive_list', 'get_dxf_objects',
	    'get_kbrd', 'get_login_info',
	    'get_lun', 'get_screen_size', 'getenv', 'getwindows', 'greg2jul',
	    'grib', 'grid_input', 'grid_tps', 'grid3', 'griddata',
	    'gs_iter', 'h_eq_ct', 'h_eq_int', 'hanning', 'hash',
	    'hdf', 'hdf5', 'heap_free', 'heap_gc', 'heap_nosave',
	    'heap_refcount', 'heap_save', 'help', 'hilbert', 'hist_2d',
	    'hist_equal', 'histogram', 'hls', 'hough', 'hqr',
	    'hsv', 'i18n_multibytetoutf8',
	    'i18n_multibytetowidechar', 'i18n_utf8tomultibyte',
	    'i18n_widechartomultibyte',
	    'ibeta', 'icontour', 'iconvertcoord', 'idelete', 'identity',
	    'idl_base64', 'idl_container', 'idl_validname',
	    'idlexbr_assistant', 'idlitsys_createtool',
	    'idlunit', 'iellipse', 'igamma', 'igetcurrent', 'igetdata',
	    'igetid', 'igetproperty', 'iimage', 'image', 'image_cont',
	    'image_statistics', 'image_threshold', 'imaginary', 'imap', 'indgen',
	    'int_2d', 'int_3d', 'int_tabulated', 'intarr', 'interpol',
	    'interpolate', 'interval_volume', 'invert', 'ioctl', 'iopen',
	    'ir_filter', 'iplot', 'ipolygon', 'ipolyline', 'iputdata',
	    'iregister', 'ireset', 'iresolve', 'irotate', 'isa',
	    'isave', 'iscale', 'isetcurrent', 'isetproperty', 'ishft',
	    'isocontour', 'isosurface', 'isurface', 'itext', 'itranslate',
	    'ivector', 'ivolume', 'izoom', 'journal', 'json_parse',
	    'json_serialize', 'jul2greg', 'julday', 'keyword_set', 'krig2d',
	    'kurtosis', 'kw_test', 'l64indgen', 'la_choldc', 'la_cholmprove',
	    'la_cholsol', 'la_determ', 'la_eigenproblem', 'la_eigenql', 'la_eigenvec',
	    'la_elmhes', 'la_gm_linear_model', 'la_hqr', 'la_invert',
	    'la_least_square_equality', 'la_least_squares', 'la_linear_equation',
	    'la_ludc', 'la_lumprove', 'la_lusol',
	    'la_svd', 'la_tridc', 'la_trimprove', 'la_triql', 'la_trired',
	    'la_trisol', 'label_date', 'label_region', 'ladfit', 'laguerre',
	    'lambda', 'lambdap', 'lambertw', 'laplacian', 'least_squares_filter',
	    'leefilt', 'legend', 'legendre', 'linbcg', 'lindgen',
	    'linfit', 'linkimage', 'list', 'll_arc_distance', 'lmfit',
	    'lmgr', 'lngamma', 'lnp_test', 'loadct', 'locale_get',
	    'logical_and', 'logical_or', 'logical_true', 'lon64arr', 'lonarr',
	    'long', 'long64', 'lsode', 'lu_complex', 'ludc',
	    'lumprove', 'lusol', 'm_correlate', 'machar', 'make_array',
	    'make_dll', 'make_rt', 'map', 'mapcontinents', 'mapgrid',
	    'map_2points', 'map_continents', 'map_grid', 'map_image', 'map_patch',
	    'map_proj_forward', 'map_proj_image', 'map_proj_info',
	    'map_proj_init', 'map_proj_inverse',
	    'map_set', 'matrix_multiply', 'matrix_power', 'max', 'md_test',
	    'mean', 'meanabsdev', 'mean_filter', 'median', 'memory',
	    'mesh_clip', 'mesh_decimate', 'mesh_issolid',
	    'mesh_merge', 'mesh_numtriangles',
	    'mesh_obj', 'mesh_smooth', 'mesh_surfacearea',
	    'mesh_validate', 'mesh_volume',
	    'message', 'min', 'min_curve_surf', 'mk_html_help', 'modifyct',
	    'moment', 'morph_close', 'morph_distance',
	    'morph_gradient', 'morph_hitormiss',
	    'morph_open', 'morph_thin', 'morph_tophat', 'multi', 'n_elements',
	    'n_params', 'n_tags', 'ncdf', 'newton', 'noise_hurl',
	    'noise_pick', 'noise_scatter', 'noise_slur', 'norm', 'obj_class',
	    'obj_destroy', 'obj_hasmethod', 'obj_isa', 'obj_new', 'obj_valid',
	    'objarr', 'on_error', 'on_ioerror', 'online_help', 'openr',
	    'openu', 'openw', 'oplot', 'oploterr', 'orderedhash',
	    'p_correlate', 'parse_url', 'particle_trace', 'path_cache', 'path_sep',
	    'pcomp', 'plot', 'plot3d', 'plot', 'plot_3dbox',
	    'plot_field', 'ploterr', 'plots', 'polar_contour', 'polar_surface',
	    'polyfill', 'polyshade', 'pnt_line', 'point_lun', 'polarplot',
	    'poly', 'poly_2d', 'poly_area', 'poly_fit', 'polyfillv',
	    'polygon', 'polyline', 'polywarp', 'popd', 'powell',
	    'pref_commit', 'pref_get', 'pref_set', 'prewitt', 'primes',
	    'print', 'printf', 'printd', 'pro', 'product',
	    'profile', 'profiler', 'profiles', 'project_vol', 'ps_show_fonts',
	    'psafm', 'pseudo', 'ptr_free', 'ptr_new', 'ptr_valid',
	    'ptrarr', 'pushd', 'qgrid3', 'qhull', 'qromb',
	    'qromo', 'qsimp', 'query_*', 'query_ascii', 'query_bmp',
	    'query_csv', 'query_dicom', 'query_gif', 'query_image', 'query_jpeg',
	    'query_jpeg2000', 'query_mrsid', 'query_pict', 'query_png', 'query_ppm',
	    'query_srf', 'query_tiff', 'query_video', 'query_wav', 'r_correlate',
	    'r_test', 'radon', 'randomn', 'randomu', 'ranks',
	    'rdpix', 'read', 'readf', 'read_ascii', 'read_binary',
	    'read_bmp', 'read_csv', 'read_dicom', 'read_gif', 'read_image',
	    'read_interfile', 'read_jpeg', 'read_jpeg2000', 'read_mrsid', 'read_pict',
	    'read_png', 'read_ppm', 'read_spr', 'read_srf', 'read_sylk',
	    'read_tiff', 'read_video', 'read_wav', 'read_wave', 'read_x11_bitmap',
	    'read_xwd', 'reads', 'readu', 'real_part', 'rebin',
	    'recall_commands', 'recon3', 'reduce_colors', 'reform', 'region_grow',
	    'register_cursor', 'regress', 'replicate',
	    'replicate_inplace', 'resolve_all',
	    'resolve_routine', 'restore', 'retall', 'return', 'reverse',
	    'rk4', 'roberts', 'rot', 'rotate', 'round',
	    'routine_filepath', 'routine_info', 'rs_test', 's_test', 'save',
	    'savgol', 'scale3', 'scale3d', 'scatterplot', 'scatterplot3d',
	    'scope_level', 'scope_traceback', 'scope_varfetch',
	    'scope_varname', 'search2d',
	    'search3d', 'sem_create', 'sem_delete', 'sem_lock', 'sem_release',
	    'set_plot', 'set_shading', 'setenv', 'sfit', 'shade_surf',
	    'shade_surf_irr', 'shade_volume', 'shift', 'shift_diff', 'shmdebug',
	    'shmmap', 'shmunmap', 'shmvar', 'show3', 'showfont',
	    'signum', 'simplex', 'sin', 'sindgen', 'sinh',
	    'size', 'skewness', 'skip_lun', 'slicer3', 'slide_image',
	    'smooth', 'sobel', 'socket', 'sort', 'spawn',
	    'sph_4pnt', 'sph_scat', 'spher_harm', 'spl_init', 'spl_interp',
	    'spline', 'spline_p', 'sprsab', 'sprsax', 'sprsin',
	    'sprstp', 'sqrt', 'standardize', 'stddev', 'stop',
	    'strarr', 'strcmp', 'strcompress', 'streamline', 'streamline',
	    'stregex', 'stretch', 'string', 'strjoin', 'strlen',
	    'strlowcase', 'strmatch', 'strmessage', 'strmid', 'strpos',
	    'strput', 'strsplit', 'strtrim', 'struct_assign', 'struct_hide',
	    'strupcase', 'surface', 'surface', 'surfr', 'svdc',
	    'svdfit', 'svsol', 'swap_endian', 'swap_endian_inplace', 'symbol',
	    'systime', 't_cvf', 't_pdf', 't3d', 'tag_names',
	    'tan', 'tanh', 'tek_color', 'temporary', 'terminal_size',
	    'tetra_clip', 'tetra_surface', 'tetra_volume', 'text', 'thin',
	    'thread', 'threed', 'tic', 'time_test2', 'timegen',
	    'timer', 'timestamp', 'timestamptovalues', 'tm_test', 'toc',
	    'total', 'trace', 'transpose', 'tri_surf', 'triangulate',
	    'trigrid', 'triql', 'trired', 'trisol', 'truncate_lun',
	    'ts_coef', 'ts_diff', 'ts_fcast', 'ts_smooth', 'tv',
	    'tvcrs', 'tvlct', 'tvrd', 'tvscl', 'typename',
	    'uindgen', 'uint', 'uintarr', 'ul64indgen', 'ulindgen',
	    'ulon64arr', 'ulonarr', 'ulong', 'ulong64', 'uniq',
	    'unsharp_mask', 'usersym', 'value_locate', 'variance', 'vector',
	    'vector_field', 'vel', 'velovect', 'vert_t3d', 'voigt',
	    'volume', 'voronoi', 'voxel_proj', 'wait', 'warp_tri',
	    'watershed', 'wdelete', 'wf_draw', 'where', 'widget_base',
	    'widget_button', 'widget_combobox', 'widget_control',
	    'widget_displaycontextmenu', 'widget_draw',
	    'widget_droplist', 'widget_event', 'widget_info',
	    'widget_label', 'widget_list',
	    'widget_propertysheet', 'widget_slider', 'widget_tab',
	    'widget_table', 'widget_text',
	    'widget_tree', 'widget_tree_move', 'widget_window',
	    'wiener_filter', 'window',
	    'window', 'write_bmp', 'write_csv', 'write_gif', 'write_image',
	    'write_jpeg', 'write_jpeg2000', 'write_nrif', 'write_pict', 'write_png',
	    'write_ppm', 'write_spr', 'write_srf', 'write_sylk', 'write_tiff',
	    'write_video', 'write_wav', 'write_wave', 'writeu', 'wset',
	    'wshow', 'wtn', 'wv_applet', 'wv_cwt', 'wv_cw_wavelet',
	    'wv_denoise', 'wv_dwt', 'wv_fn_coiflet',
	    'wv_fn_daubechies', 'wv_fn_gaussian',
	    'wv_fn_haar', 'wv_fn_morlet', 'wv_fn_paul',
	    'wv_fn_symlet', 'wv_import_data',
	    'wv_import_wavelet', 'wv_plot3d_wps', 'wv_plot_multires',
	    'wv_pwt', 'wv_tool_denoise',
	    'xbm_edit', 'xdisplayfile', 'xdxf', 'xfont', 'xinteranimate',
	    'xloadct', 'xmanager', 'xmng_tmpl', 'xmtool', 'xobjview',
	    'xobjview_rotate', 'xobjview_write_image',
	    'xpalette', 'xpcolor', 'xplot3d',
	    'xregistered', 'xroi', 'xsq_test', 'xsurface', 'xvaredit',
	    'xvolume', 'xvolume_rotate', 'xvolume_write_image',
	    'xyouts', 'zlib_compress', 'zlib_uncompress', 'zoom', 'zoom_24'
	  ];
	  var builtins = wordRegexp(builtinArray);
	
	  var keywordArray = [
	    'begin', 'end', 'endcase', 'endfor',
	    'endwhile', 'endif', 'endrep', 'endforeach',
	    'break', 'case', 'continue', 'for',
	    'foreach', 'goto', 'if', 'then', 'else',
	    'repeat', 'until', 'switch', 'while',
	    'do', 'pro', 'function'
	  ];
	  var keywords = wordRegexp(keywordArray);
	
	  CodeMirror.registerHelper("hintWords", "idl", builtinArray.concat(keywordArray));
	
	  var identifiers = new RegExp('^[_a-z\xa1-\uffff][_a-z0-9\xa1-\uffff]*', 'i');
	
	  var singleOperators = /[+\-*&=<>\/@#~$]/;
	  var boolOperators = new RegExp('(and|or|eq|lt|le|gt|ge|ne|not)', 'i');
	
	  function tokenBase(stream) {
	    // whitespaces
	    if (stream.eatSpace()) return null;
	
	    // Handle one line Comments
	    if (stream.match(';')) {
	      stream.skipToEnd();
	      return 'comment';
	    }
	
	    // Handle Number Literals
	    if (stream.match(/^[0-9\.+-]/, false)) {
	      if (stream.match(/^[+-]?0x[0-9a-fA-F]+/))
	        return 'number';
	      if (stream.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?/))
	        return 'number';
	      if (stream.match(/^[+-]?\d+([EeDd][+-]?\d+)?/))
	        return 'number';
	    }
	
	    // Handle Strings
	    if (stream.match(/^"([^"]|(""))*"/)) { return 'string'; }
	    if (stream.match(/^'([^']|(''))*'/)) { return 'string'; }
	
	    // Handle words
	    if (stream.match(keywords)) { return 'keyword'; }
	    if (stream.match(builtins)) { return 'builtin'; }
	    if (stream.match(identifiers)) { return 'variable'; }
	
	    if (stream.match(singleOperators) || stream.match(boolOperators)) {
	      return 'operator'; }
	
	    // Handle non-detected items
	    stream.next();
	    return null;
	  };
	
	  CodeMirror.defineMode('idl', function() {
	    return {
	      token: function(stream) {
	        return tokenBase(stream);
	      }
	    };
	  });
	
	  CodeMirror.defineMIME('text/x-idl', 'idl');
	});


/***/ },

/***/ "./src/parsers/webidl/webidl2.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Object$keys = __webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultParserInterface = __webpack_require__("./src/parsers/utils/defaultParserInterface.js");
	
	var _utilsDefaultParserInterface2 = _interopRequireDefault(_utilsDefaultParserInterface);
	
	var _webidl2PackageJson = __webpack_require__("./node_modules/webidl2/package.json");
	
	var _webidl2PackageJson2 = _interopRequireDefault(_webidl2PackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'webidl2';
	var options = _extends({
	  allowNestedTypedefs: false
	}, LocalStorage.getParserSettings(ID));
	
	var settings = _Object$keys(options);
	
	exports['default'] = _extends({}, _utilsDefaultParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _webidl2PackageJson2['default'].version,
	  homepage: _webidl2PackageJson2['default'].homepage,
	
	  getNodeName: function getNodeName(node) {
	    if (node.name) {
	      return node.name + (node.optional ? '?' : '');
	    } else if (node.type) {
	      return node.type;
	    } else if (node.idlType) {
	      return node.idlType.idlType || node.idlType;
	    }
	  },
	
	  loadParser: function loadParser(callback) {
	    __webpack_require__.e/* require */(22, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/webidl2/index.js")]; (callback.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this));
	  },
	
	  parse: function parse(_ref, code) {
	    var _parse = _ref.parse;
	
	    return _parse(code, options);
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'members';
	  },
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      values: options,
	      onChange: changeOption
	    });
	  }
	});
	
	function changeOption(name, _ref2) {
	  var target = _ref2.target;
	
	  options[name] = target.checked;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/webidl2/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"webidl2@^2.0.11",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "webidl2@>=2.0.11 <3.0.0",
		"_id": "webidl2@2.0.11",
		"_inCache": true,
		"_installable": true,
		"_location": "/webidl2",
		"_npmUser": {
			"email": "robin@berjon.com",
			"name": "robin.berjon"
		},
		"_npmVersion": "1.4.28",
		"_phantomChildren": {},
		"_requested": {
			"name": "webidl2",
			"raw": "webidl2@^2.0.11",
			"rawSpec": "^2.0.11",
			"scope": null,
			"spec": ">=2.0.11 <3.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/webidl2/-/webidl2-2.0.11.tgz",
		"_shasum": "788ba6daad0a14e20fc396b860296a07b55b8a17",
		"_shrinkwrap": null,
		"_spec": "webidl2@^2.0.11",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "robin@berjon.com",
			"name": "Robin Berjon"
		},
		"bugs": {
			"url": "https://github.com/darobin/webidl2.js/issues"
		},
		"dependencies": {},
		"description": "A WebIDL Parser",
		"devDependencies": {
			"benchmark": "*",
			"expect.js": "0.3.1",
			"jsondiffpatch": "0.1.31",
			"microtime": "1.4.2",
			"mocha": "2.2.5",
			"underscore": "1.8.3"
		},
		"directories": {},
		"dist": {
			"shasum": "788ba6daad0a14e20fc396b860296a07b55b8a17",
			"tarball": "http://registry.npmjs.org/webidl2/-/webidl2-2.0.11.tgz"
		},
		"gitHead": "bd216bcd5596d60734450adc938155deab1e1a80",
		"homepage": "https://github.com/darobin/webidl2.js",
		"license": "MIT",
		"main": "index",
		"maintainers": [
			{
				"name": "robin.berjon",
				"email": "robin@berjon.com"
			}
		],
		"name": "webidl2",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git://github.com/darobin/webidl2.js.git"
		},
		"scripts": {
			"test": "mocha"
		},
		"version": "2.0.11"
	};

/***/ },

/***/ "./src/Snippet.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _Promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _Parse = __webpack_require__("./src/Parse.js");
	
	var _Parse2 = _interopRequireDefault(_Parse);
	
	var _SnippetRevision = __webpack_require__("./src/SnippetRevision.js");
	
	var _SnippetRevision2 = _interopRequireDefault(_SnippetRevision);
	
	var snippetQuery = undefined;
	var cache = {};
	// global.__cache = cache;
	
	function getIDAndRevisionFromHash() {
	  var match = global.location.hash.match(/^#\/([^\/]+)(?:\/(\d*))?/);
	  if (match) {
	    return {
	      id: match[1],
	      rev: match[2] || 0
	    };
	  }
	  return null;
	}
	
	function getFromCache(snippetID, rev) {
	  var cacheEntry = cache[snippetID];
	  return {
	    snippet: cacheEntry && cacheEntry.snippet || null,
	    revision: cacheEntry && cacheEntry[rev] || null
	  };
	}
	
	function setInCache(snippet, revision, rev) {
	  var cacheEntry = cache[snippet.id] || (cache[snippet.id] = {});
	  cacheEntry.snippet = snippet;
	  cacheEntry[rev] = revision;
	}
	
	var Snippet = (function (_Parse$Object) {
	  _inherits(Snippet, _Parse$Object);
	
	  function Snippet() {
	    _classCallCheck(this, Snippet);
	
	    _get(Object.getPrototypeOf(Snippet.prototype), 'constructor', this).call(this, 'Snippet');
	  }
	
	  _createClass(Snippet, [{
	    key: 'fetchLatestRevision',
	    value: function fetchLatestRevision() {
	      var _this = this;
	
	      if (this._latestRevision) {
	        return _Promise.resolve(this._latestRevision);
	      } else {
	        var revisions = this.get('revisions');
	        if (!revisions || revisions.length === 0) {
	          return _Promise.resolve(null);
	        }
	        return revisions[revisions.length - 1].fetch(function (revision) {
	          _this._latestRevision = revision;
	        });
	      }
	    }
	  }, {
	    key: 'createNewRevision',
	    value: function createNewRevision(data) {
	      var _this2 = this;
	
	      // we only create a new revision if the code is different from the previous
	      // revision
	      return this.fetchLatestRevision().then(function (revision) {
	        var isNew = !revision || revision.get('code') !== data.code || revision.get('transform') !== data.transform || revision.get('toolID') !== data.toolID || revision.get('parserID') !== data.parserID;
	
	        if (isNew) {
	          var newRevision = new _SnippetRevision2['default']();
	          newRevision.set('code', data.code);
	          newRevision.set('transform', data.transform);
	          newRevision.set('toolID', data.toolID);
	          newRevision.set('parserID', data.parserID);
	          return newRevision.save().then(function (revision) {
	            _this2.add('revisions', revision);
	            return _this2.save().then(function (snippet) {
	              var revisionNumber = snippet.get('revisions').length - 1;
	              _this2._latestRevision = revision;
	              setInCache(snippet, revision, revisionNumber);
	              return {
	                snippet: snippet,
	                revision: revision,
	                revisionNumber: revisionNumber
	              };
	            });
	          });
	        }
	        return null;
	      });
	    }
	  }], [{
	    key: 'fetch',
	    value: function fetch(snippetID, rev) {
	      var cacheEntry = getFromCache(snippetID, rev);
	      if (cacheEntry.snippet && cacheEntry.revision) {
	        return _Promise.resolve(cacheEntry);
	      }
	      var snippet = cacheEntry.snippet;
	
	      if (!snippet) {
	        if (!snippetQuery) {
	          snippetQuery = new _Parse2['default'].Query(Snippet);
	        }
	        snippet = snippetQuery.get(snippetID);
	      }
	      return _Promise.resolve(snippet).then(function (snippet) {
	        var revisions = snippet.get('revisions');
	        if (!revisions[rev]) {
	          throw new Error('Revision "' + snippetID + '/' + rev + '" does not exist.');
	        }
	        return revisions[rev].fetch().then(function (revision) {
	          setInCache(snippet, revision, rev);
	          return { snippet: snippet, revision: revision };
	        });
	      });
	    }
	  }, {
	    key: 'fetchFromURL',
	    value: function fetchFromURL() {
	      var urlParameters = getIDAndRevisionFromHash();
	      if (urlParameters) {
	        return Snippet.fetch(urlParameters.id, urlParameters.rev).then(function (data) {
	          data.revisionNumber = urlParameters.rev;
	          return data;
	        });
	      }
	      return _Promise.resolve(null);
	    }
	  }]);
	
	  return Snippet;
	})(_Parse2['default'].Object);
	
	exports['default'] = Snippet;
	
	_Parse2['default'].Object.registerSubclass('Snippet', Snippet);
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./src/Parse.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _parse = __webpack_require__("./node_modules/parse/index.js");
	
	var _parse2 = _interopRequireDefault(_parse);
	
	_parse2['default'].initialize('PFIYect6yceEsU1m43fONUUKbJe89SRBZRuzJOGj', '0L4YKtVRqey2vRG0hjemm9TKb4edjNBSnZXC5Lni');
	exports['default'] = _parse2['default'];
	module.exports = exports['default'];

/***/ },

/***/ "./src/SnippetRevision.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _Parse = __webpack_require__("./src/Parse.js");
	
	var _Parse2 = _interopRequireDefault(_Parse);
	
	var SnippetRevision = (function (_Parse$Object) {
		_inherits(SnippetRevision, _Parse$Object);
	
		function SnippetRevision() {
			_classCallCheck(this, SnippetRevision);
	
			_get(Object.getPrototypeOf(SnippetRevision.prototype), 'constructor', this).call(this, 'SnippetRevision');
		}
	
		return SnippetRevision;
	})(_Parse2['default'].Object);
	
	exports['default'] = SnippetRevision;
	
	_Parse2['default'].Object.registerSubclass('SnippetRevision', SnippetRevision);
	module.exports = exports['default'];

/***/ },

/***/ "./src/SplitPane.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var baseStyleHorizontal = {
	  position: 'absolute',
	  top: 0,
	  bottom: 0,
	  boxSizing: 'border-box'
	};
	
	var baseStyleVertical = {
	  position: 'absolute',
	  left: 0,
	  right: 0,
	  boxSizing: 'border-box'
	};
	
	/**
	 * Creates a left-right split pane inside its container.
	 */
	
	var _default = (function (_React$Component) {
	  _inherits(_default, _React$Component);
	
	  function _default(props, context) {
	    _classCallCheck(this, _default);
	
	    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, props, context);
	    this._onMouseDown = this._onMouseDown.bind(this);
	
	    this.state = {
	      dividerPosition: 50
	    };
	  }
	
	  _createClass(_default, [{
	    key: '_onMouseDown',
	    value: function _onMouseDown() {
	      var _this = this;
	
	      var vertical = this.props.vertical;
	
	      var max = vertical ? global.innerHeight : global.innerWidth;
	      global.document.body.style.cursor = vertical ? 'row-resize' : 'col-resize';
	      var moveHandler = function moveHandler(event) {
	        event.preventDefault();
	        _this.setState({
	          dividerPosition: (vertical ? event.pageY : event.pageX) / max * 100 });
	      };
	      var upHandler = function upHandler() {
	        document.removeEventListener('mousemove', moveHandler);
	        document.removeEventListener('mouseup', upHandler);
	        global.document.body.style.cursor = '';
	
	        if (_this.props.onResize) {
	          _this.props.onResize();
	        }
	      };
	
	      document.addEventListener('mousemove', moveHandler);
	      document.addEventListener('mouseup', upHandler);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;
	
	      var dividerPos = this.state.dividerPosition;
	      var styleA = undefined;
	      var styleB = undefined;
	      var dividerStyle = undefined;
	
	      if (!Array.isArray(children) || children.filter(function (x) {
	        return x;
	      }).length !== 2) {
	        return _react2['default'].createElement(
	          'div',
	          { className: this.props.className },
	          _react2['default'].createElement(
	            'div',
	            { style: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 } },
	            this.props.children
	          )
	        );
	      }
	
	      if (this.props.vertical) {
	        // top
	        styleA = _extends({}, baseStyleVertical, {
	          top: 0,
	          height: dividerPos + '%',
	          paddingBottom: 3
	        });
	        // bottom
	        styleB = _extends({}, baseStyleVertical, {
	          bottom: 0,
	          height: 100 - dividerPos + '%',
	          paddingTop: 3
	        });
	        dividerStyle = _extends({}, baseStyleVertical, {
	          top: dividerPos + '%',
	          height: 5,
	          marginTop: -2.5,
	          zIndex: 100
	        });
	      } else {
	        // left
	        styleA = _extends({}, baseStyleHorizontal, {
	          left: 0,
	          width: dividerPos + '%',
	          paddingRight: 3
	        });
	        // right
	        styleB = _extends({}, baseStyleHorizontal, {
	          right: 0,
	          width: 100 - dividerPos + '%',
	          paddingLeft: 3
	        });
	        dividerStyle = _extends({}, baseStyleHorizontal, {
	          left: dividerPos + '%',
	          width: 5,
	          marginLeft: -2.5,
	          zIndex: 100
	        });
	      }
	
	      return _react2['default'].createElement(
	        'div',
	        { className: this.props.className },
	        _react2['default'].createElement(
	          'div',
	          { style: styleA },
	          this.props.children[0]
	        ),
	        _react2['default'].createElement('div', {
	          className: 'splitpane-divider' + (this.props.vertical ? ' vertical' : ''),
	          onMouseDown: this._onMouseDown,
	          style: dividerStyle
	        }),
	        _react2['default'].createElement(
	          'div',
	          { style: styleB },
	          this.props.children[1]
	        )
	      );
	    }
	  }]);
	
	  return _default;
	})(_react2['default'].Component);
	
	exports['default'] = _default;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./src/Toolbar.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__("./node_modules/classnames/index.js");
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _CategoryButton = __webpack_require__("./src/CategoryButton.js");
	
	var _CategoryButton2 = _interopRequireDefault(_CategoryButton);
	
	var _ParserButton = __webpack_require__("./src/ParserButton.js");
	
	var _ParserButton2 = _interopRequireDefault(_ParserButton);
	
	var _TransformButton = __webpack_require__("./src/TransformButton.js");
	
	var _TransformButton2 = _interopRequireDefault(_TransformButton);
	
	var _ParserSettingsButton = __webpack_require__("./src/ParserSettingsButton.js");
	
	var _ParserSettingsButton2 = _interopRequireDefault(_ParserSettingsButton);
	
	var Toolbar = (function () {
	  function Toolbar() {
	    _classCallCheck(this, Toolbar);
	  }
	
	  _createClass(Toolbar, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var parser = _props.parser;
	      var transformer = _props.transformer;
	      var transformPanelIsEnabled = _props.transformPanelIsEnabled;
	
	      var parserInfo = parser.id;
	      var transformerInfo = '';
	      if (parser) {
	        if (parser.version) {
	          parserInfo += '-' + parser.version;
	        }
	        if (parser.homepage) {
	          parserInfo = _react2['default'].createElement(
	            'a',
	            { href: parser.homepage, target: '_blank' },
	            parserInfo
	          );
	        }
	      }
	      if (transformPanelIsEnabled) {
	        transformerInfo = transformer.displayName;
	        if (transformer.version) {
	          transformerInfo += '-' + transformer.version;
	        }
	        if (transformer.homepage) {
	          transformerInfo = _react2['default'].createElement(
	            'a',
	            { href: transformer.homepage, target: '_blank' },
	            transformerInfo
	          );
	        }
	        transformerInfo = _react2['default'].createElement(
	          'span',
	          null,
	          'Transformer: ',
	          transformerInfo
	        );
	      }
	
	      return _react2['default'].createElement(
	        'div',
	        { id: 'Toolbar' },
	        _react2['default'].createElement(
	          'h1',
	          null,
	          'AST Explorer'
	        ),
	        _react2['default'].createElement(
	          'button',
	          {
	            type: 'button',
	            disabled: !this.props.canSave || this.props.saving || this.props.forking,
	            onClick: this.props.onSave },
	          _react2['default'].createElement('i', {
	            className: (0, _classnames2['default'])({
	              fa: true,
	              'fa-spinner': this.props.saving,
	              'fa-floppy-o': !this.props.saving,
	              'fa-lg': true,
	              'fa-fw': true
	            })
	          }),
	          'Save'
	        ),
	        _react2['default'].createElement(
	          'button',
	          {
	            type: 'button',
	            disabled: !this.props.canFork || this.props.saving || this.props.forking,
	            onClick: this.props.onFork },
	          _react2['default'].createElement('i', {
	            className: (0, _classnames2['default'])({
	              fa: true,
	              'fa-spinner': this.props.forking,
	              'fa-code-fork': !this.props.forking,
	              'fa-lg': true,
	              'fa-fw': true
	            })
	          }),
	          'Fork'
	        ),
	        _react2['default'].createElement(_CategoryButton2['default'], this.props),
	        _react2['default'].createElement(_ParserButton2['default'], this.props),
	        _react2['default'].createElement(_ParserSettingsButton2['default'], this.props),
	        _react2['default'].createElement(_TransformButton2['default'], this.props),
	        _react2['default'].createElement(
	          'a',
	          {
	            target: '_blank',
	            href: 'https://github.com/fkling/esprima_ast_explorer#features' },
	          _react2['default'].createElement('i', {
	            className: (0, _classnames2['default'])({
	              fa: true,
	              'fa-lg': true,
	              'fa-question': true,
	              'fa-fw': true
	            })
	          }),
	          'Help'
	        ),
	        _react2['default'].createElement(
	          'div',
	          { id: 'info', className: transformerInfo ? 'small' : '' },
	          'Parser: ',
	          parserInfo,
	          _react2['default'].createElement('br', null),
	          transformerInfo
	        )
	      );
	    }
	  }], [{
	    key: 'propTypes',
	    value: {
	      saving: _react2['default'].PropTypes.bool,
	      forking: _react2['default'].PropTypes.bool,
	      onSave: _react2['default'].PropTypes.func,
	      onFork: _react2['default'].PropTypes.func,
	      onParserChange: _react2['default'].PropTypes.func,
	      onTransformChange: _react2['default'].PropTypes.func,
	      parser: _react2['default'].PropTypes.object,
	      transformer: _react2['default'].PropTypes.object
	    },
	    enumerable: true
	  }]);
	
	  return Toolbar;
	})();
	
	exports['default'] = Toolbar;
	module.exports = exports['default'];

/***/ },

/***/ "./src/CategoryButton.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__("./node_modules/classnames/index.js");
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _parsers = __webpack_require__("./src/parsers/index.js");
	
	var categoryIcon = {
	  javascript: 'fa-jsfiddle',
	  css: 'fa-css3',
	  htmlmixed: 'fa-html5',
	  idl: 'fa-th-list'
	};
	
	var CategoryButton = (function (_React$Component) {
	  _inherits(CategoryButton, _React$Component);
	
	  function CategoryButton(props) {
	    _classCallCheck(this, CategoryButton);
	
	    _get(Object.getPrototypeOf(CategoryButton.prototype), 'constructor', this).call(this, props);
	    this._onClick = this._onClick.bind(this);
	  }
	
	  _createClass(CategoryButton, [{
	    key: '_onClick',
	    value: function _onClick(_ref) {
	      var currentTarget = _ref.currentTarget;
	
	      var categoryID = currentTarget.getAttribute('data-id');
	      this.props.onCategoryChange((0, _parsers.getCategoryByID)(categoryID));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      return _react2['default'].createElement(
	        'div',
	        { className: 'button menuButton categoryButton' },
	        _react2['default'].createElement(
	          'button',
	          { type: 'button' },
	          _react2['default'].createElement('i', {
	            className: (0, _classnames2['default'])(categoryIcon[this.props.category.id] || 'fa-file-o', {
	              fa: true,
	              'fa-lg': true,
	              'fa-fw': true
	            })
	          }),
	          ' ',
	          this.props.category.displayName
	        ),
	        _react2['default'].createElement(
	          'ul',
	          null,
	          _parsers.categories.map(function (category) {
	            return _react2['default'].createElement(
	              'li',
	              { key: category.id, onClick: _this._onClick, 'data-id': category.id },
	              _react2['default'].createElement(
	                'button',
	                { type: 'button' },
	                _react2['default'].createElement('i', {
	                  className: (0, _classnames2['default'])(categoryIcon[category.id] || 'fa-file-o', {
	                    fa: true,
	                    'fa-lg': true,
	                    'fa-fw': true
	                  })
	                }),
	                ' ',
	                category.displayName
	              )
	            );
	          })
	        )
	      );
	    }
	  }]);
	
	  return CategoryButton;
	})(_react2['default'].Component);
	
	exports['default'] = CategoryButton;
	module.exports = exports['default'];

/***/ },

/***/ "./src/ParserButton.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__("./node_modules/classnames/index.js");
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _parsers = __webpack_require__("./src/parsers/index.js");
	
	var ParserButton = (function (_React$Component) {
	  _inherits(ParserButton, _React$Component);
	
	  function ParserButton(props) {
	    _classCallCheck(this, ParserButton);
	
	    _get(Object.getPrototypeOf(ParserButton.prototype), 'constructor', this).call(this, props);
	    this._onClick = this._onClick.bind(this);
	  }
	
	  _createClass(ParserButton, [{
	    key: '_onClick',
	    value: function _onClick(_ref) {
	      var currentTarget = _ref.currentTarget;
	
	      var parserID = currentTarget.getAttribute('data-id');
	      this.props.onParserChange((0, _parsers.getParserByID)(parserID));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      return _react2['default'].createElement(
	        'div',
	        {
	          className: 'button menuButton' },
	        _react2['default'].createElement(
	          'button',
	          {
	            type: 'button' },
	          _react2['default'].createElement('i', {
	            className: (0, _classnames2['default'])({
	              fa: true,
	              'fa-lg': true,
	              'fa-code': true,
	              'fa-fw': true
	            })
	          }),
	          ' ',
	          this.props.parser.displayName
	        ),
	        _react2['default'].createElement(
	          'ul',
	          null,
	          this.props.category.parsers.map(function (parser) {
	            return _react2['default'].createElement(
	              'li',
	              { key: parser.id, onClick: _this._onClick, 'data-id': parser.id },
	              _react2['default'].createElement(
	                'button',
	                { type: 'button' },
	                parser.displayName
	              )
	            );
	          })
	        )
	      );
	    }
	  }]);
	
	  return ParserButton;
	})(_react2['default'].Component);
	
	exports['default'] = ParserButton;
	module.exports = exports['default'];

/***/ },

/***/ "./src/TransformButton.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__("./node_modules/classnames/index.js");
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _parsers = __webpack_require__("./src/parsers/index.js");
	
	var TransformButton = (function (_React$Component) {
	  _inherits(TransformButton, _React$Component);
	
	  function TransformButton(props) {
	    _classCallCheck(this, TransformButton);
	
	    _get(Object.getPrototypeOf(TransformButton.prototype), 'constructor', this).call(this, props);
	    this._onClick = this._onClick.bind(this);
	    this._onToggle = this._onToggle.bind(this);
	  }
	
	  _createClass(TransformButton, [{
	    key: '_onClick',
	    value: function _onClick(_ref) {
	      var target = _ref.target;
	
	      var transformID = undefined;
	      if (target.nodeName.toLowerCase() === 'li') {
	        transformID = target.children[0].value;
	      } else {
	        transformID = target.value;
	      }
	      this.props.onTransformChange((0, _parsers.getTransformerByID)(transformID));
	    }
	  }, {
	    key: '_onToggle',
	    value: function _onToggle() {
	      if (this.props.transformer) {
	        this.props.onTransformChange(this.props.transformer);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;
	
	      return _react2['default'].createElement(
	        'div',
	        { className: (0, _classnames2['default'])({
	            button: true,
	            menuButton: true,
	            disabled: !this.props.category.transformers.length
	          }) },
	        _react2['default'].createElement(
	          'button',
	          { type: 'button', onClick: this._onToggle, disabled: !this.props.category.transformers.length },
	          _react2['default'].createElement('i', {
	            className: (0, _classnames2['default'])({
	              fa: true,
	              'fa-lg': true,
	              'fa-toggle-off': !this.props.transformPanelIsEnabled,
	              'fa-toggle-on': this.props.transformPanelIsEnabled,
	              'fa-fw': true
	            })
	          }),
	          ' Transform'
	        ),
	        !!this.props.category.transformers.length && _react2['default'].createElement(
	          'ul',
	          null,
	          this.props.category.transformers.map(function (transformer) {
	            return _react2['default'].createElement(
	              'li',
	              {
	                key: transformer.id,
	                className: (0, _classnames2['default'])({
	                  selected: _this.props.transformPanelIsEnabled && _this.props.transformer === transformer
	                }),
	                onClick: _this._onClick },
	              _react2['default'].createElement(
	                'button',
	                { value: transformer.id, type: 'button' },
	                transformer.displayName
	              )
	            );
	          })
	        )
	      );
	    }
	  }]);
	
	  return TransformButton;
	})(_react2['default'].Component);
	
	exports['default'] = TransformButton;
	module.exports = exports['default'];

/***/ },

/***/ "./src/ParserSettingsButton.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pubsubJs = __webpack_require__("./node_modules/pubsub-js/src/pubsub.js");
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	var ParserSettingsButton = (function (_React$Component) {
	  _inherits(ParserSettingsButton, _React$Component);
	
	  function ParserSettingsButton() {
	    _classCallCheck(this, ParserSettingsButton);
	
	    _get(Object.getPrototypeOf(ParserSettingsButton.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(ParserSettingsButton, [{
	    key: '_show',
	    value: function _show() {
	      _pubsubJs2['default'].publish('PARSER.SHOW_SETTINGS');
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var settings = this.props.parser.renderSettings;
	      return _react2['default'].createElement(
	        'button',
	        {
	          type: 'button',
	          disabled: !settings,
	          onClick: this._show },
	        _react2['default'].createElement('i', { className: 'fa fa-cog fa-fw' }),
	        ' Parser Settings'
	      );
	    }
	  }]);
	
	  return ParserSettingsButton;
	})(_react2['default'].Component);
	
	exports['default'] = ParserSettingsButton;
	module.exports = exports['default'];

/***/ },

/***/ "./src/TransformOutput.js":
/***/ function(module, exports, __webpack_require__) {

	/*eslint no-new-func: 0*/
	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _Promise = __webpack_require__("./node_modules/babel-runtime/core-js/promise.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _Editor = __webpack_require__("./src/Editor.js");
	
	var _Editor2 = _interopRequireDefault(_Editor);
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _haltingProblem = __webpack_require__("./node_modules/halting-problem/index.js");
	
	var _haltingProblem2 = _interopRequireDefault(_haltingProblem);
	
	var _sourceMapLibSourceMapConsumer = __webpack_require__("./node_modules/source-map/lib/source-map-consumer.js");
	
	function transform(transformer, transformCode, code) {
	  if (!transformer._promise) {
	    transformer._promise = new _Promise(transformer.loadTransformer);
	  }
	  // Use Promise.resolve(null) to return all errors as rejected promises
	  return transformer._promise.then(function (realTransformer) {
	    // assert that there are no obvious infinite loops
	    (0, _haltingProblem2['default'])(transformCode);
	    // guard against non-obvious loops with a timeout of 5 seconds
	    var start = Date.now();
	    transformCode = (0, _haltingProblem.loopProtect)(transformCode, [
	    // this function gets called in all possible loops
	    // it gets passed the line number as its only argument
	    '(function (line) {', 'if (Date.now() > ' + (start + 5000) + ') {', '  throw new Error("Infinite loop detected on line " + line);', '}', '})'].join(''));
	    var result = transformer.transform(realTransformer, transformCode, code);
	    var map = null;
	    if (typeof result !== 'string') {
	      map = new _sourceMapLibSourceMapConsumer.SourceMapConsumer(result.map);
	      result = result.code;
	    }
	    return { result: result, map: map };
	  });
	}
	
	var TransformOutput = (function (_React$Component) {
	  _inherits(TransformOutput, _React$Component);
	
	  _createClass(TransformOutput, null, [{
	    key: 'propTypes',
	    value: {
	      transformer: _react2['default'].PropTypes.object,
	      transformCode: _react2['default'].PropTypes.string,
	      code: _react2['default'].PropTypes.string
	    },
	    enumerable: true
	  }]);
	
	  function TransformOutput(props) {
	    _classCallCheck(this, TransformOutput);
	
	    _get(Object.getPrototypeOf(TransformOutput.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      result: '',
	      map: null,
	      error: null
	    };
	    this._posFromIndex = this._posFromIndex.bind(this);
	  }
	
	  _createClass(TransformOutput, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      transform(this.props.transformer, this.props.transformCode, this.props.code).then(function (_ref) {
	        var result = _ref.result;
	        var map = _ref.map;
	        return _this.setState({ result: result, map: map });
	      }, function (error) {
	        return _this.setState({ error: error });
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this2 = this;
	
	      if (this.props.transformCode !== nextProps.transformCode || this.props.code !== nextProps.code) {
	        if (console.clear) {
	          console.clear();
	        }
	        transform(nextProps.transformer, nextProps.transformCode, nextProps.code).then(function (_ref2) {
	          var result = _ref2.result;
	          var map = _ref2.map;
	          return { result: result, map: map, error: null };
	        }, function (error) {
	          console.error(error);
	          return { error: error };
	        }).then(function (state) {
	          return _this2.setState(state);
	        });
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return this.state.result !== nextState.result || this.state.error !== nextState.error;
	    }
	  }, {
	    key: '_posFromIndex',
	    value: function _posFromIndex(index) {
	      var map = this.state.map;
	
	      if (!map) {
	        return;
	      }
	      var src = map.sourcesContent[0];
	      if (index === 0) {
	        return { line: 0, ch: 0 };
	      }
	      var lineStart = src.lastIndexOf('\n', index - 1);
	      var column = index - lineStart - 1;
	      var line = 1;
	      while (lineStart > 0) {
	        lineStart = src.lastIndexOf('\n', lineStart - 1);
	        line++;
	      }
	      if (lineStart === 0) {
	        line++;
	      }
	
	      var _map$generatedPositionFor = map.generatedPositionFor({
	        line: line,
	        column: column,
	        source: map.sources[0]
	      });
	
	      line = _map$generatedPositionFor.line;
	      column = _map$generatedPositionFor.column;
	
	      if (line === null || column === null) {
	        return;
	      }
	      return { line: line - 1, ch: column };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        { className: 'output highlight' },
	        this.state.error ? _react2['default'].createElement(_Editor2['default'], {
	          highlight: false,
	          key: 'error',
	          lineNumbers: false,
	          readOnly: true,
	          defaultValue: this.state.error.message
	        }) : _react2['default'].createElement(_Editor2['default'], {
	          posFromIndex: this._posFromIndex,
	          mode: this.props.mode,
	          key: 'output',
	          readOnly: true,
	          defaultValue: this.state.result
	        })
	      );
	    }
	  }]);
	
	  return TransformOutput;
	})(_react2['default'].Component);
	
	exports['default'] = TransformOutput;
	module.exports = exports['default'];

/***/ },

/***/ "./node_modules/source-map/lib/source-map-consumer.js":
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	{
	  var util = __webpack_require__("./node_modules/source-map/lib/util.js");
	  var binarySearch = __webpack_require__("./node_modules/source-map/lib/binary-search.js");
	  var ArraySet = __webpack_require__("./node_modules/source-map/lib/array-set.js").ArraySet;
	  var base64VLQ = __webpack_require__("./node_modules/source-map/lib/base64-vlq.js");
	  var quickSort = __webpack_require__("./node_modules/source-map/lib/quick-sort.js").quickSort;
	
	  function SourceMapConsumer(aSourceMap) {
	    var sourceMap = aSourceMap;
	    if (typeof aSourceMap === 'string') {
	      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	    }
	
	    return sourceMap.sections != null
	      ? new IndexedSourceMapConsumer(sourceMap)
	      : new BasicSourceMapConsumer(sourceMap);
	  }
	
	  SourceMapConsumer.fromSourceMap = function(aSourceMap) {
	    return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
	  }
	
	  /**
	   * The version of the source mapping spec that we are consuming.
	   */
	  SourceMapConsumer.prototype._version = 3;
	
	  // `__generatedMappings` and `__originalMappings` are arrays that hold the
	  // parsed mapping coordinates from the source map's "mappings" attribute. They
	  // are lazily instantiated, accessed via the `_generatedMappings` and
	  // `_originalMappings` getters respectively, and we only parse the mappings
	  // and create these arrays once queried for a source location. We jump through
	  // these hoops because there can be many thousands of mappings, and parsing
	  // them is expensive, so we only want to do it if we must.
	  //
	  // Each object in the arrays is of the form:
	  //
	  //     {
	  //       generatedLine: The line number in the generated code,
	  //       generatedColumn: The column number in the generated code,
	  //       source: The path to the original source file that generated this
	  //               chunk of code,
	  //       originalLine: The line number in the original source that
	  //                     corresponds to this chunk of generated code,
	  //       originalColumn: The column number in the original source that
	  //                       corresponds to this chunk of generated code,
	  //       name: The name of the original symbol which generated this chunk of
	  //             code.
	  //     }
	  //
	  // All properties except for `generatedLine` and `generatedColumn` can be
	  // `null`.
	  //
	  // `_generatedMappings` is ordered by the generated positions.
	  //
	  // `_originalMappings` is ordered by the original positions.
	
	  SourceMapConsumer.prototype.__generatedMappings = null;
	  Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
	    get: function () {
	      if (!this.__generatedMappings) {
	        this._parseMappings(this._mappings, this.sourceRoot);
	      }
	
	      return this.__generatedMappings;
	    }
	  });
	
	  SourceMapConsumer.prototype.__originalMappings = null;
	  Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
	    get: function () {
	      if (!this.__originalMappings) {
	        this._parseMappings(this._mappings, this.sourceRoot);
	      }
	
	      return this.__originalMappings;
	    }
	  });
	
	  SourceMapConsumer.prototype._charIsMappingSeparator =
	    function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
	      var c = aStr.charAt(index);
	      return c === ";" || c === ",";
	    };
	
	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  SourceMapConsumer.prototype._parseMappings =
	    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	      throw new Error("Subclasses must implement _parseMappings");
	    };
	
	  SourceMapConsumer.GENERATED_ORDER = 1;
	  SourceMapConsumer.ORIGINAL_ORDER = 2;
	
	  SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	  SourceMapConsumer.LEAST_UPPER_BOUND = 2;
	
	  /**
	   * Iterate over each mapping between an original source/line/column and a
	   * generated line/column in this source map.
	   *
	   * @param Function aCallback
	   *        The function that is called with each mapping.
	   * @param Object aContext
	   *        Optional. If specified, this object will be the value of `this` every
	   *        time that `aCallback` is called.
	   * @param aOrder
	   *        Either `SourceMapConsumer.GENERATED_ORDER` or
	   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	   *        iterate over the mappings sorted by the generated file's line/column
	   *        order or the original's source/line/column order, respectively. Defaults to
	   *        `SourceMapConsumer.GENERATED_ORDER`.
	   */
	  SourceMapConsumer.prototype.eachMapping =
	    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
	      var context = aContext || null;
	      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
	
	      var mappings;
	      switch (order) {
	      case SourceMapConsumer.GENERATED_ORDER:
	        mappings = this._generatedMappings;
	        break;
	      case SourceMapConsumer.ORIGINAL_ORDER:
	        mappings = this._originalMappings;
	        break;
	      default:
	        throw new Error("Unknown order of iteration.");
	      }
	
	      var sourceRoot = this.sourceRoot;
	      mappings.map(function (mapping) {
	        var source = mapping.source === null ? null : this._sources.at(mapping.source);
	        if (source != null && sourceRoot != null) {
	          source = util.join(sourceRoot, source);
	        }
	        return {
	          source: source,
	          generatedLine: mapping.generatedLine,
	          generatedColumn: mapping.generatedColumn,
	          originalLine: mapping.originalLine,
	          originalColumn: mapping.originalColumn,
	          name: mapping.name === null ? null : this._names.at(mapping.name)
	        };
	      }, this).forEach(aCallback, context);
	    };
	
	  /**
	   * Returns all generated line and column information for the original source,
	   * line, and column provided. If no column is provided, returns all mappings
	   * corresponding to a either the line we are searching for or the next
	   * closest line that has any mappings. Otherwise, returns all mappings
	   * corresponding to the given line and either the column we are searching for
	   * or the next closest column that has any offsets.
	   *
	   * The only argument is an object with the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *   - column: Optional. the column number in the original source.
	   *
	   * and an array of objects is returned, each with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  SourceMapConsumer.prototype.allGeneratedPositionsFor =
	    function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
	      var line = util.getArg(aArgs, 'line');
	
	      // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
	      // returns the index of the closest mapping less than the needle. By
	      // setting needle.originalColumn to 0, we thus find the last mapping for
	      // the given line, provided such a mapping exists.
	      var needle = {
	        source: util.getArg(aArgs, 'source'),
	        originalLine: line,
	        originalColumn: util.getArg(aArgs, 'column', 0)
	      };
	
	      if (this.sourceRoot != null) {
	        needle.source = util.relative(this.sourceRoot, needle.source);
	      }
	      if (!this._sources.has(needle.source)) {
	        return [];
	      }
	      needle.source = this._sources.indexOf(needle.source);
	
	      var mappings = [];
	
	      var index = this._findMapping(needle,
	                                    this._originalMappings,
	                                    "originalLine",
	                                    "originalColumn",
	                                    util.compareByOriginalPositions,
	                                    binarySearch.LEAST_UPPER_BOUND);
	      if (index >= 0) {
	        var mapping = this._originalMappings[index];
	
	        if (aArgs.column === undefined) {
	          var originalLine = mapping.originalLine;
	
	          // Iterate until either we run out of mappings, or we run into
	          // a mapping for a different line than the one we found. Since
	          // mappings are sorted, this is guaranteed to find all mappings for
	          // the line we found.
	          while (mapping && mapping.originalLine === originalLine) {
	            mappings.push({
	              line: util.getArg(mapping, 'generatedLine', null),
	              column: util.getArg(mapping, 'generatedColumn', null),
	              lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	            });
	
	            mapping = this._originalMappings[++index];
	          }
	        } else {
	          var originalColumn = mapping.originalColumn;
	
	          // Iterate until either we run out of mappings, or we run into
	          // a mapping for a different line than the one we were searching for.
	          // Since mappings are sorted, this is guaranteed to find all mappings for
	          // the line we are searching for.
	          while (mapping &&
	                 mapping.originalLine === line &&
	                 mapping.originalColumn == originalColumn) {
	            mappings.push({
	              line: util.getArg(mapping, 'generatedLine', null),
	              column: util.getArg(mapping, 'generatedColumn', null),
	              lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	            });
	
	            mapping = this._originalMappings[++index];
	          }
	        }
	      }
	
	      return mappings;
	    };
	
	  exports.SourceMapConsumer = SourceMapConsumer;
	
	  /**
	   * A BasicSourceMapConsumer instance represents a parsed source map which we can
	   * query for information about the original file positions by giving it a file
	   * position in the generated source.
	   *
	   * The only parameter is the raw source map (either as a JSON string, or
	   * already parsed to an object). According to the spec, source maps have the
	   * following attributes:
	   *
	   *   - version: Which version of the source map spec this map is following.
	   *   - sources: An array of URLs to the original source files.
	   *   - names: An array of identifiers which can be referrenced by individual mappings.
	   *   - sourceRoot: Optional. The URL root from which all sources are relative.
	   *   - sourcesContent: Optional. An array of contents of the original source files.
	   *   - mappings: A string of base64 VLQs which contain the actual mappings.
	   *   - file: Optional. The generated file this source map is associated with.
	   *
	   * Here is an example source map, taken from the source map spec[0]:
	   *
	   *     {
	   *       version : 3,
	   *       file: "out.js",
	   *       sourceRoot : "",
	   *       sources: ["foo.js", "bar.js"],
	   *       names: ["src", "maps", "are", "fun"],
	   *       mappings: "AA,AB;;ABCDE;"
	   *     }
	   *
	   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	   */
	  function BasicSourceMapConsumer(aSourceMap) {
	    var sourceMap = aSourceMap;
	    if (typeof aSourceMap === 'string') {
	      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	    }
	
	    var version = util.getArg(sourceMap, 'version');
	    var sources = util.getArg(sourceMap, 'sources');
	    // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
	    // requires the array) to play nice here.
	    var names = util.getArg(sourceMap, 'names', []);
	    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
	    var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
	    var mappings = util.getArg(sourceMap, 'mappings');
	    var file = util.getArg(sourceMap, 'file', null);
	
	    // Once again, Sass deviates from the spec and supplies the version as a
	    // string rather than a number, so we use loose equality checking here.
	    if (version != this._version) {
	      throw new Error('Unsupported version: ' + version);
	    }
	
	    sources = sources
	      // Some source maps produce relative source paths like "./foo.js" instead of
	      // "foo.js".  Normalize these first so that future comparisons will succeed.
	      // See bugzil.la/1090768.
	      .map(util.normalize)
	      // Always ensure that absolute sources are internally stored relative to
	      // the source root, if the source root is absolute. Not doing this would
	      // be particularly problematic when the source root is a prefix of the
	      // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
	      .map(function (source) {
	        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
	          ? util.relative(sourceRoot, source)
	          : source;
	      });
	
	    // Pass `true` below to allow duplicate names and sources. While source maps
	    // are intended to be compressed and deduplicated, the TypeScript compiler
	    // sometimes generates source maps with duplicates in them. See Github issue
	    // #72 and bugzil.la/889492.
	    this._names = ArraySet.fromArray(names, true);
	    this._sources = ArraySet.fromArray(sources, true);
	
	    this.sourceRoot = sourceRoot;
	    this.sourcesContent = sourcesContent;
	    this._mappings = mappings;
	    this.file = file;
	  }
	
	  BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
	
	  /**
	   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
	   *
	   * @param SourceMapGenerator aSourceMap
	   *        The source map that will be consumed.
	   * @returns BasicSourceMapConsumer
	   */
	  BasicSourceMapConsumer.fromSourceMap =
	    function SourceMapConsumer_fromSourceMap(aSourceMap) {
	      var smc = Object.create(BasicSourceMapConsumer.prototype);
	
	      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
	      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
	      smc.sourceRoot = aSourceMap._sourceRoot;
	      smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
	                                                              smc.sourceRoot);
	      smc.file = aSourceMap._file;
	
	      // Because we are modifying the entries (by converting string sources and
	      // names to indices into the sources and names ArraySets), we have to make
	      // a copy of the entry or else bad things happen. Shared mutable state
	      // strikes again! See github issue #191.
	
	      var generatedMappings = aSourceMap._mappings.toArray().slice();
	      var destGeneratedMappings = smc.__generatedMappings = [];
	      var destOriginalMappings = smc.__originalMappings = [];
	
	      for (var i = 0, length = generatedMappings.length; i < length; i++) {
	        var srcMapping = generatedMappings[i];
	        var destMapping = new Mapping;
	        destMapping.generatedLine = srcMapping.generatedLine;
	        destMapping.generatedColumn = srcMapping.generatedColumn;
	
	        if (srcMapping.source) {
	          destMapping.source = sources.indexOf(srcMapping.source);
	          destMapping.originalLine = srcMapping.originalLine;
	          destMapping.originalColumn = srcMapping.originalColumn;
	
	          if (srcMapping.name) {
	            destMapping.name = names.indexOf(srcMapping.name);
	          }
	
	          destOriginalMappings.push(destMapping);
	        }
	
	        destGeneratedMappings.push(destMapping);
	      }
	
	      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
	
	      return smc;
	    };
	
	  /**
	   * The version of the source mapping spec that we are consuming.
	   */
	  BasicSourceMapConsumer.prototype._version = 3;
	
	  /**
	   * The list of original sources.
	   */
	  Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
	    get: function () {
	      return this._sources.toArray().map(function (s) {
	        return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
	      }, this);
	    }
	  });
	
	  /**
	   * Provide the JIT with a nice shape / hidden class.
	   */
	  function Mapping() {
	    this.generatedLine = 0;
	    this.generatedColumn = 0;
	    this.source = null;
	    this.originalLine = null;
	    this.originalColumn = null;
	    this.name = null;
	  }
	
	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  BasicSourceMapConsumer.prototype._parseMappings =
	    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	      var generatedLine = 1;
	      var previousGeneratedColumn = 0;
	      var previousOriginalLine = 0;
	      var previousOriginalColumn = 0;
	      var previousSource = 0;
	      var previousName = 0;
	      var length = aStr.length;
	      var index = 0;
	      var cachedSegments = {};
	      var temp = {};
	      var originalMappings = [];
	      var generatedMappings = [];
	      var mapping, str, segment, end, value;
	
	      while (index < length) {
	        if (aStr.charAt(index) === ';') {
	          generatedLine++;
	          index++;
	          previousGeneratedColumn = 0;
	        }
	        else if (aStr.charAt(index) === ',') {
	          index++;
	        }
	        else {
	          mapping = new Mapping();
	          mapping.generatedLine = generatedLine;
	
	          // Because each offset is encoded relative to the previous one,
	          // many segments often have the same encoding. We can exploit this
	          // fact by caching the parsed variable length fields of each segment,
	          // allowing us to avoid a second parse if we encounter the same
	          // segment again.
	          for (end = index; end < length; end++) {
	            if (this._charIsMappingSeparator(aStr, end)) {
	              break;
	            }
	          }
	          str = aStr.slice(index, end);
	
	          segment = cachedSegments[str];
	          if (segment) {
	            index += str.length;
	          } else {
	            segment = [];
	            while (index < end) {
	              base64VLQ.decode(aStr, index, temp);
	              value = temp.value;
	              index = temp.rest;
	              segment.push(value);
	            }
	
	            if (segment.length === 2) {
	              throw new Error('Found a source, but no line and column');
	            }
	
	            if (segment.length === 3) {
	              throw new Error('Found a source and line, but no column');
	            }
	
	            cachedSegments[str] = segment;
	          }
	
	          // Generated column.
	          mapping.generatedColumn = previousGeneratedColumn + segment[0];
	          previousGeneratedColumn = mapping.generatedColumn;
	
	          if (segment.length > 1) {
	            // Original source.
	            mapping.source = previousSource + segment[1];
	            previousSource += segment[1];
	
	            // Original line.
	            mapping.originalLine = previousOriginalLine + segment[2];
	            previousOriginalLine = mapping.originalLine;
	            // Lines are stored 0-based
	            mapping.originalLine += 1;
	
	            // Original column.
	            mapping.originalColumn = previousOriginalColumn + segment[3];
	            previousOriginalColumn = mapping.originalColumn;
	
	            if (segment.length > 4) {
	              // Original name.
	              mapping.name = previousName + segment[4];
	              previousName += segment[4];
	            }
	          }
	
	          generatedMappings.push(mapping);
	          if (typeof mapping.originalLine === 'number') {
	            originalMappings.push(mapping);
	          }
	        }
	      }
	
	      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
	      this.__generatedMappings = generatedMappings;
	
	      quickSort(originalMappings, util.compareByOriginalPositions);
	      this.__originalMappings = originalMappings;
	    };
	
	  /**
	   * Find the mapping that best matches the hypothetical "needle" mapping that
	   * we are searching for in the given "haystack" of mappings.
	   */
	  BasicSourceMapConsumer.prototype._findMapping =
	    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
	                                           aColumnName, aComparator, aBias) {
	      // To return the position we are searching for, we must first find the
	      // mapping for the given position and then return the opposite position it
	      // points to. Because the mappings are sorted, we can use binary search to
	      // find the best mapping.
	
	      if (aNeedle[aLineName] <= 0) {
	        throw new TypeError('Line must be greater than or equal to 1, got '
	                            + aNeedle[aLineName]);
	      }
	      if (aNeedle[aColumnName] < 0) {
	        throw new TypeError('Column must be greater than or equal to 0, got '
	                            + aNeedle[aColumnName]);
	      }
	
	      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
	    };
	
	  /**
	   * Compute the last column for each generated mapping. The last column is
	   * inclusive.
	   */
	  BasicSourceMapConsumer.prototype.computeColumnSpans =
	    function SourceMapConsumer_computeColumnSpans() {
	      for (var index = 0; index < this._generatedMappings.length; ++index) {
	        var mapping = this._generatedMappings[index];
	
	        // Mappings do not contain a field for the last generated columnt. We
	        // can come up with an optimistic estimate, however, by assuming that
	        // mappings are contiguous (i.e. given two consecutive mappings, the
	        // first mapping ends where the second one starts).
	        if (index + 1 < this._generatedMappings.length) {
	          var nextMapping = this._generatedMappings[index + 1];
	
	          if (mapping.generatedLine === nextMapping.generatedLine) {
	            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
	            continue;
	          }
	        }
	
	        // The last mapping for each line spans the entire line.
	        mapping.lastGeneratedColumn = Infinity;
	      }
	    };
	
	  /**
	   * Returns the original source, line, and column information for the generated
	   * source's line and column positions provided. The only argument is an object
	   * with the following properties:
	   *
	   *   - line: The line number in the generated source.
	   *   - column: The column number in the generated source.
	   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	   *     closest element that is smaller than or greater than the one we are
	   *     searching for, respectively, if the exact element cannot be found.
	   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - source: The original source file, or null.
	   *   - line: The line number in the original source, or null.
	   *   - column: The column number in the original source, or null.
	   *   - name: The original identifier, or null.
	   */
	  BasicSourceMapConsumer.prototype.originalPositionFor =
	    function SourceMapConsumer_originalPositionFor(aArgs) {
	      var needle = {
	        generatedLine: util.getArg(aArgs, 'line'),
	        generatedColumn: util.getArg(aArgs, 'column')
	      };
	
	      var index = this._findMapping(
	        needle,
	        this._generatedMappings,
	        "generatedLine",
	        "generatedColumn",
	        util.compareByGeneratedPositionsDeflated,
	        util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	      );
	
	      if (index >= 0) {
	        var mapping = this._generatedMappings[index];
	
	        if (mapping.generatedLine === needle.generatedLine) {
	          var source = util.getArg(mapping, 'source', null);
	          if (source !== null) {
	            source = this._sources.at(source);
	            if (this.sourceRoot != null) {
	              source = util.join(this.sourceRoot, source);
	            }
	          }
	          var name = util.getArg(mapping, 'name', null);
	          if (name !== null) {
	            name = this._names.at(name);
	          }
	          return {
	            source: source,
	            line: util.getArg(mapping, 'originalLine', null),
	            column: util.getArg(mapping, 'originalColumn', null),
	            name: name
	          };
	        }
	      }
	
	      return {
	        source: null,
	        line: null,
	        column: null,
	        name: null
	      };
	    };
	
	  /**
	   * Return true if we have the source content for every source in the source
	   * map, false otherwise.
	   */
	  BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
	    function BasicSourceMapConsumer_hasContentsOfAllSources() {
	      if (!this.sourcesContent) {
	        return false;
	      }
	      return this.sourcesContent.length >= this._sources.size() &&
	        !this.sourcesContent.some(function (sc) { return sc == null; });
	    };
	
	  /**
	   * Returns the original source content. The only argument is the url of the
	   * original source file. Returns null if no original source content is
	   * available.
	   */
	  BasicSourceMapConsumer.prototype.sourceContentFor =
	    function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	      if (!this.sourcesContent) {
	        return null;
	      }
	
	      if (this.sourceRoot != null) {
	        aSource = util.relative(this.sourceRoot, aSource);
	      }
	
	      if (this._sources.has(aSource)) {
	        return this.sourcesContent[this._sources.indexOf(aSource)];
	      }
	
	      var url;
	      if (this.sourceRoot != null
	          && (url = util.urlParse(this.sourceRoot))) {
	        // XXX: file:// URIs and absolute paths lead to unexpected behavior for
	        // many users. We can help them out when they expect file:// URIs to
	        // behave like it would if they were running a local HTTP server. See
	        // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
	        var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
	        if (url.scheme == "file"
	            && this._sources.has(fileUriAbsPath)) {
	          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
	        }
	
	        if ((!url.path || url.path == "/")
	            && this._sources.has("/" + aSource)) {
	          return this.sourcesContent[this._sources.indexOf("/" + aSource)];
	        }
	      }
	
	      // This function is used recursively from
	      // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
	      // don't want to throw if we can't find the source - we just want to
	      // return null, so we provide a flag to exit gracefully.
	      if (nullOnMissing) {
	        return null;
	      }
	      else {
	        throw new Error('"' + aSource + '" is not in the SourceMap.');
	      }
	    };
	
	  /**
	   * Returns the generated line and column information for the original source,
	   * line, and column positions provided. The only argument is an object with
	   * the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *   - column: The column number in the original source.
	   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	   *     closest element that is smaller than or greater than the one we are
	   *     searching for, respectively, if the exact element cannot be found.
	   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  BasicSourceMapConsumer.prototype.generatedPositionFor =
	    function SourceMapConsumer_generatedPositionFor(aArgs) {
	      var source = util.getArg(aArgs, 'source');
	      if (this.sourceRoot != null) {
	        source = util.relative(this.sourceRoot, source);
	      }
	      if (!this._sources.has(source)) {
	        return {
	          line: null,
	          column: null,
	          lastColumn: null
	        };
	      }
	      source = this._sources.indexOf(source);
	
	      var needle = {
	        source: source,
	        originalLine: util.getArg(aArgs, 'line'),
	        originalColumn: util.getArg(aArgs, 'column')
	      };
	
	      var index = this._findMapping(
	        needle,
	        this._originalMappings,
	        "originalLine",
	        "originalColumn",
	        util.compareByOriginalPositions,
	        util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
	      );
	
	      if (index >= 0) {
	        var mapping = this._originalMappings[index];
	
	        if (mapping.source === needle.source) {
	          return {
	            line: util.getArg(mapping, 'generatedLine', null),
	            column: util.getArg(mapping, 'generatedColumn', null),
	            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
	          };
	        }
	      }
	
	      return {
	        line: null,
	        column: null,
	        lastColumn: null
	      };
	    };
	
	  exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
	
	  /**
	   * An IndexedSourceMapConsumer instance represents a parsed source map which
	   * we can query for information. It differs from BasicSourceMapConsumer in
	   * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	   * input.
	   *
	   * The only parameter is a raw source map (either as a JSON string, or already
	   * parsed to an object). According to the spec for indexed source maps, they
	   * have the following attributes:
	   *
	   *   - version: Which version of the source map spec this map is following.
	   *   - file: Optional. The generated file this source map is associated with.
	   *   - sections: A list of section definitions.
	   *
	   * Each value under the "sections" field has two fields:
	   *   - offset: The offset into the original specified at which this section
	   *       begins to apply, defined as an object with a "line" and "column"
	   *       field.
	   *   - map: A source map definition. This source map could also be indexed,
	   *       but doesn't have to be.
	   *
	   * Instead of the "map" field, it's also possible to have a "url" field
	   * specifying a URL to retrieve a source map from, but that's currently
	   * unsupported.
	   *
	   * Here's an example source map, taken from the source map spec[0], but
	   * modified to omit a section which uses the "url" field.
	   *
	   *  {
	   *    version : 3,
	   *    file: "app.js",
	   *    sections: [{
	   *      offset: {line:100, column:10},
	   *      map: {
	   *        version : 3,
	   *        file: "section.js",
	   *        sources: ["foo.js", "bar.js"],
	   *        names: ["src", "maps", "are", "fun"],
	   *        mappings: "AAAA,E;;ABCDE;"
	   *      }
	   *    }],
	   *  }
	   *
	   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	   */
	  function IndexedSourceMapConsumer(aSourceMap) {
	    var sourceMap = aSourceMap;
	    if (typeof aSourceMap === 'string') {
	      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
	    }
	
	    var version = util.getArg(sourceMap, 'version');
	    var sections = util.getArg(sourceMap, 'sections');
	
	    if (version != this._version) {
	      throw new Error('Unsupported version: ' + version);
	    }
	
	    this._sources = new ArraySet();
	    this._names = new ArraySet();
	
	    var lastOffset = {
	      line: -1,
	      column: 0
	    };
	    this._sections = sections.map(function (s) {
	      if (s.url) {
	        // The url field will require support for asynchronicity.
	        // See https://github.com/mozilla/source-map/issues/16
	        throw new Error('Support for url field in sections not implemented.');
	      }
	      var offset = util.getArg(s, 'offset');
	      var offsetLine = util.getArg(offset, 'line');
	      var offsetColumn = util.getArg(offset, 'column');
	
	      if (offsetLine < lastOffset.line ||
	          (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
	        throw new Error('Section offsets must be ordered and non-overlapping.');
	      }
	      lastOffset = offset;
	
	      return {
	        generatedOffset: {
	          // The offset fields are 0-based, but we use 1-based indices when
	          // encoding/decoding from VLQ.
	          generatedLine: offsetLine + 1,
	          generatedColumn: offsetColumn + 1
	        },
	        consumer: new SourceMapConsumer(util.getArg(s, 'map'))
	      }
	    });
	  }
	
	  IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
	
	  /**
	   * The version of the source mapping spec that we are consuming.
	   */
	  IndexedSourceMapConsumer.prototype._version = 3;
	
	  /**
	   * The list of original sources.
	   */
	  Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
	    get: function () {
	      var sources = [];
	      for (var i = 0; i < this._sections.length; i++) {
	        for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
	          sources.push(this._sections[i].consumer.sources[j]);
	        }
	      }
	      return sources;
	    }
	  });
	
	  /**
	   * Returns the original source, line, and column information for the generated
	   * source's line and column positions provided. The only argument is an object
	   * with the following properties:
	   *
	   *   - line: The line number in the generated source.
	   *   - column: The column number in the generated source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - source: The original source file, or null.
	   *   - line: The line number in the original source, or null.
	   *   - column: The column number in the original source, or null.
	   *   - name: The original identifier, or null.
	   */
	  IndexedSourceMapConsumer.prototype.originalPositionFor =
	    function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
	      var needle = {
	        generatedLine: util.getArg(aArgs, 'line'),
	        generatedColumn: util.getArg(aArgs, 'column')
	      };
	
	      // Find the section containing the generated position we're trying to map
	      // to an original position.
	      var sectionIndex = binarySearch.search(needle, this._sections,
	        function(needle, section) {
	          var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
	          if (cmp) {
	            return cmp;
	          }
	
	          return (needle.generatedColumn -
	                  section.generatedOffset.generatedColumn);
	        });
	      var section = this._sections[sectionIndex];
	
	      if (!section) {
	        return {
	          source: null,
	          line: null,
	          column: null,
	          name: null
	        };
	      }
	
	      return section.consumer.originalPositionFor({
	        line: needle.generatedLine -
	          (section.generatedOffset.generatedLine - 1),
	        column: needle.generatedColumn -
	          (section.generatedOffset.generatedLine === needle.generatedLine
	           ? section.generatedOffset.generatedColumn - 1
	           : 0),
	        bias: aArgs.bias
	      });
	    };
	
	  /**
	   * Return true if we have the source content for every source in the source
	   * map, false otherwise.
	   */
	  IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
	    function IndexedSourceMapConsumer_hasContentsOfAllSources() {
	      return this._sections.every(function (s) {
	        return s.consumer.hasContentsOfAllSources();
	      });
	    };
	
	  /**
	   * Returns the original source content. The only argument is the url of the
	   * original source file. Returns null if no original source content is
	   * available.
	   */
	  IndexedSourceMapConsumer.prototype.sourceContentFor =
	    function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
	      for (var i = 0; i < this._sections.length; i++) {
	        var section = this._sections[i];
	
	        var content = section.consumer.sourceContentFor(aSource, true);
	        if (content) {
	          return content;
	        }
	      }
	      if (nullOnMissing) {
	        return null;
	      }
	      else {
	        throw new Error('"' + aSource + '" is not in the SourceMap.');
	      }
	    };
	
	  /**
	   * Returns the generated line and column information for the original source,
	   * line, and column positions provided. The only argument is an object with
	   * the following properties:
	   *
	   *   - source: The filename of the original source.
	   *   - line: The line number in the original source.
	   *   - column: The column number in the original source.
	   *
	   * and an object is returned with the following properties:
	   *
	   *   - line: The line number in the generated source, or null.
	   *   - column: The column number in the generated source, or null.
	   */
	  IndexedSourceMapConsumer.prototype.generatedPositionFor =
	    function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
	      for (var i = 0; i < this._sections.length; i++) {
	        var section = this._sections[i];
	
	        // Only consider this section if the requested source is in the list of
	        // sources of the consumer.
	        if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
	          continue;
	        }
	        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
	        if (generatedPosition) {
	          var ret = {
	            line: generatedPosition.line +
	              (section.generatedOffset.generatedLine - 1),
	            column: generatedPosition.column +
	              (section.generatedOffset.generatedLine === generatedPosition.line
	               ? section.generatedOffset.generatedColumn - 1
	               : 0)
	          };
	          return ret;
	        }
	      }
	
	      return {
	        line: null,
	        column: null
	      };
	    };
	
	  /**
	   * Parse the mappings in a string in to a data structure which we can easily
	   * query (the ordered arrays in the `this.__generatedMappings` and
	   * `this.__originalMappings` properties).
	   */
	  IndexedSourceMapConsumer.prototype._parseMappings =
	    function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
	      this.__generatedMappings = [];
	      this.__originalMappings = [];
	      for (var i = 0; i < this._sections.length; i++) {
	        var section = this._sections[i];
	        var sectionMappings = section.consumer._generatedMappings;
	        for (var j = 0; j < sectionMappings.length; j++) {
	          var mapping = sectionMappings[j];
	
	          var source = section.consumer._sources.at(mapping.source);
	          if (section.consumer.sourceRoot !== null) {
	            source = util.join(section.consumer.sourceRoot, source);
	          }
	          this._sources.add(source);
	          source = this._sources.indexOf(source);
	
	          var name = section.consumer._names.at(mapping.name);
	          this._names.add(name);
	          name = this._names.indexOf(name);
	
	          // The mappings coming from the consumer for the section have
	          // generated positions relative to the start of the section, so we
	          // need to offset them to be relative to the start of the concatenated
	          // generated file.
	          var adjustedMapping = {
	            source: source,
	            generatedLine: mapping.generatedLine +
	              (section.generatedOffset.generatedLine - 1),
	            generatedColumn: mapping.generatedColumn +
	              (section.generatedOffset.generatedLine === mapping.generatedLine
	              ? section.generatedOffset.generatedColumn - 1
	              : 0),
	            originalLine: mapping.originalLine,
	            originalColumn: mapping.originalColumn,
	            name: name
	          };
	
	          this.__generatedMappings.push(adjustedMapping);
	          if (typeof adjustedMapping.originalLine === 'number') {
	            this.__originalMappings.push(adjustedMapping);
	          }
	        }
	      }
	
	      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
	      quickSort(this.__originalMappings, util.compareByOriginalPositions);
	    };
	
	  exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
	}


/***/ },

/***/ "./node_modules/source-map/lib/util.js":
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	{
	  /**
	   * This is a helper function for getting values from parameter/options
	   * objects.
	   *
	   * @param args The object we are extracting values from
	   * @param name The name of the property we are getting.
	   * @param defaultValue An optional value to return if the property is missing
	   * from the object. If this is not specified and the property is missing, an
	   * error will be thrown.
	   */
	  function getArg(aArgs, aName, aDefaultValue) {
	    if (aName in aArgs) {
	      return aArgs[aName];
	    } else if (arguments.length === 3) {
	      return aDefaultValue;
	    } else {
	      throw new Error('"' + aName + '" is a required argument.');
	    }
	  }
	  exports.getArg = getArg;
	
	  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	  var dataUrlRegexp = /^data:.+\,.+$/;
	
	  function urlParse(aUrl) {
	    var match = aUrl.match(urlRegexp);
	    if (!match) {
	      return null;
	    }
	    return {
	      scheme: match[1],
	      auth: match[2],
	      host: match[3],
	      port: match[4],
	      path: match[5]
	    };
	  }
	  exports.urlParse = urlParse;
	
	  function urlGenerate(aParsedUrl) {
	    var url = '';
	    if (aParsedUrl.scheme) {
	      url += aParsedUrl.scheme + ':';
	    }
	    url += '//';
	    if (aParsedUrl.auth) {
	      url += aParsedUrl.auth + '@';
	    }
	    if (aParsedUrl.host) {
	      url += aParsedUrl.host;
	    }
	    if (aParsedUrl.port) {
	      url += ":" + aParsedUrl.port
	    }
	    if (aParsedUrl.path) {
	      url += aParsedUrl.path;
	    }
	    return url;
	  }
	  exports.urlGenerate = urlGenerate;
	
	  /**
	   * Normalizes a path, or the path portion of a URL:
	   *
	   * - Replaces consequtive slashes with one slash.
	   * - Removes unnecessary '.' parts.
	   * - Removes unnecessary '<dir>/..' parts.
	   *
	   * Based on code in the Node.js 'path' core module.
	   *
	   * @param aPath The path or url to normalize.
	   */
	  function normalize(aPath) {
	    var path = aPath;
	    var url = urlParse(aPath);
	    if (url) {
	      if (!url.path) {
	        return aPath;
	      }
	      path = url.path;
	    }
	    var isAbsolute = exports.isAbsolute(path);
	
	    var parts = path.split(/\/+/);
	    for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
	      part = parts[i];
	      if (part === '.') {
	        parts.splice(i, 1);
	      } else if (part === '..') {
	        up++;
	      } else if (up > 0) {
	        if (part === '') {
	          // The first part is blank if the path is absolute. Trying to go
	          // above the root is a no-op. Therefore we can remove all '..' parts
	          // directly after the root.
	          parts.splice(i + 1, up);
	          up = 0;
	        } else {
	          parts.splice(i, 2);
	          up--;
	        }
	      }
	    }
	    path = parts.join('/');
	
	    if (path === '') {
	      path = isAbsolute ? '/' : '.';
	    }
	
	    if (url) {
	      url.path = path;
	      return urlGenerate(url);
	    }
	    return path;
	  }
	  exports.normalize = normalize;
	
	  /**
	   * Joins two paths/URLs.
	   *
	   * @param aRoot The root path or URL.
	   * @param aPath The path or URL to be joined with the root.
	   *
	   * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	   *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	   *   first.
	   * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	   *   is updated with the result and aRoot is returned. Otherwise the result
	   *   is returned.
	   *   - If aPath is absolute, the result is aPath.
	   *   - Otherwise the two paths are joined with a slash.
	   * - Joining for example 'http://' and 'www.example.com' is also supported.
	   */
	  function join(aRoot, aPath) {
	    if (aRoot === "") {
	      aRoot = ".";
	    }
	    if (aPath === "") {
	      aPath = ".";
	    }
	    var aPathUrl = urlParse(aPath);
	    var aRootUrl = urlParse(aRoot);
	    if (aRootUrl) {
	      aRoot = aRootUrl.path || '/';
	    }
	
	    // `join(foo, '//www.example.org')`
	    if (aPathUrl && !aPathUrl.scheme) {
	      if (aRootUrl) {
	        aPathUrl.scheme = aRootUrl.scheme;
	      }
	      return urlGenerate(aPathUrl);
	    }
	
	    if (aPathUrl || aPath.match(dataUrlRegexp)) {
	      return aPath;
	    }
	
	    // `join('http://', 'www.example.com')`
	    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	      aRootUrl.host = aPath;
	      return urlGenerate(aRootUrl);
	    }
	
	    var joined = aPath.charAt(0) === '/'
	      ? aPath
	      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
	
	    if (aRootUrl) {
	      aRootUrl.path = joined;
	      return urlGenerate(aRootUrl);
	    }
	    return joined;
	  }
	  exports.join = join;
	
	  exports.isAbsolute = function (aPath) {
	    return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
	  };
	
	  /**
	   * Make a path relative to a URL or another path.
	   *
	   * @param aRoot The root path or URL.
	   * @param aPath The path or URL to be made relative to aRoot.
	   */
	  function relative(aRoot, aPath) {
	    if (aRoot === "") {
	      aRoot = ".";
	    }
	
	    aRoot = aRoot.replace(/\/$/, '');
	
	    // It is possible for the path to be above the root. In this case, simply
	    // checking whether the root is a prefix of the path won't work. Instead, we
	    // need to remove components from the root one by one, until either we find
	    // a prefix that fits, or we run out of components to remove.
	    var level = 0;
	    while (aPath.indexOf(aRoot + '/') !== 0) {
	      var index = aRoot.lastIndexOf("/");
	      if (index < 0) {
	        return aPath;
	      }
	
	      // If the only part of the root that is left is the scheme (i.e. http://,
	      // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	      // have exhausted all components, so the path is not relative to the root.
	      aRoot = aRoot.slice(0, index);
	      if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	        return aPath;
	      }
	
	      ++level;
	    }
	
	    // Make sure we add a "../" for each component we removed from the root.
	    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	  }
	  exports.relative = relative;
	
	  /**
	   * Because behavior goes wacky when you set `__proto__` on objects, we
	   * have to prefix all the strings in our set with an arbitrary character.
	   *
	   * See https://github.com/mozilla/source-map/pull/31 and
	   * https://github.com/mozilla/source-map/issues/30
	   *
	   * @param String aStr
	   */
	  function toSetString(aStr) {
	    return '$' + aStr;
	  }
	  exports.toSetString = toSetString;
	
	  function fromSetString(aStr) {
	    return aStr.substr(1);
	  }
	  exports.fromSetString = fromSetString;
	
	  /**
	   * Comparator between two mappings where the original positions are compared.
	   *
	   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	   * mappings with the same original source/line/column, but different generated
	   * line and column the same. Useful when searching for a mapping with a
	   * stubbed out mapping.
	   */
	  function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	    var cmp = mappingA.source - mappingB.source;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp !== 0 || onlyCompareOriginal) {
	      return cmp;
	    }
	
	    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    return mappingA.name - mappingB.name;
	  }
	  exports.compareByOriginalPositions = compareByOriginalPositions;
	
	  /**
	   * Comparator between two mappings with deflated source and name indices where
	   * the generated positions are compared.
	   *
	   * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	   * mappings with the same generated line and column, but different
	   * source/name/original line and column the same. Useful when searching for a
	   * mapping with a stubbed out mapping.
	   */
	  function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
	    var cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	    if (cmp !== 0 || onlyCompareGenerated) {
	      return cmp;
	    }
	
	    cmp = mappingA.source - mappingB.source;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    return mappingA.name - mappingB.name;
	  }
	  exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	
	  function strcmp(aStr1, aStr2) {
	    if (aStr1 === aStr2) {
	      return 0;
	    }
	
	    if (aStr1 > aStr2) {
	      return 1;
	    }
	
	    return -1;
	  }
	
	  /**
	   * Comparator between two mappings with inflated source and name strings where
	   * the generated positions are compared.
	   */
	  function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	    var cmp = mappingA.generatedLine - mappingB.generatedLine;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = strcmp(mappingA.source, mappingB.source);
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalLine - mappingB.originalLine;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    cmp = mappingA.originalColumn - mappingB.originalColumn;
	    if (cmp !== 0) {
	      return cmp;
	    }
	
	    return strcmp(mappingA.name, mappingB.name);
	  }
	  exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	}


/***/ },

/***/ "./node_modules/source-map/lib/binary-search.js":
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	{
	  exports.GREATEST_LOWER_BOUND = 1;
	  exports.LEAST_UPPER_BOUND = 2;
	
	  /**
	   * Recursive implementation of binary search.
	   *
	   * @param aLow Indices here and lower do not contain the needle.
	   * @param aHigh Indices here and higher do not contain the needle.
	   * @param aNeedle The element being searched for.
	   * @param aHaystack The non-empty array being searched.
	   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	   * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	   *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	   *     closest element that is smaller than or greater than the one we are
	   *     searching for, respectively, if the exact element cannot be found.
	   */
	  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
	    // This function terminates when one of the following is true:
	    //
	    //   1. We find the exact element we are looking for.
	    //
	    //   2. We did not find the exact element, but we can return the index of
	    //      the next-closest element.
	    //
	    //   3. We did not find the exact element, and there is no next-closest
	    //      element than the one we are searching for, so we return -1.
	    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
	    var cmp = aCompare(aNeedle, aHaystack[mid], true);
	    if (cmp === 0) {
	      // Found the element we are looking for.
	      return mid;
	    }
	    else if (cmp > 0) {
	      // Our needle is greater than aHaystack[mid].
	      if (aHigh - mid > 1) {
	        // The element is in the upper half.
	        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
	      }
	
	      // The exact needle element was not found in this haystack. Determine if
	      // we are in termination case (3) or (2) and return the appropriate thing.
	      if (aBias == exports.LEAST_UPPER_BOUND) {
	        return aHigh < aHaystack.length ? aHigh : -1;
	      } else {
	        return mid;
	      }
	    }
	    else {
	      // Our needle is less than aHaystack[mid].
	      if (mid - aLow > 1) {
	        // The element is in the lower half.
	        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
	      }
	
	      // we are in termination case (3) or (2) and return the appropriate thing.
	      if (aBias == exports.LEAST_UPPER_BOUND) {
	        return mid;
	      } else {
	        return aLow < 0 ? -1 : aLow;
	      }
	    }
	  }
	
	  /**
	   * This is an implementation of binary search which will always try and return
	   * the index of the closest element if there is no exact hit. This is because
	   * mappings between original and generated line/col pairs are single points,
	   * and there is an implicit region between each of them, so a miss just means
	   * that you aren't on the very start of a region.
	   *
	   * @param aNeedle The element you are looking for.
	   * @param aHaystack The array that is being searched.
	   * @param aCompare A function which takes the needle and an element in the
	   *     array and returns -1, 0, or 1 depending on whether the needle is less
	   *     than, equal to, or greater than the element, respectively.
	   * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	   *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	   *     closest element that is smaller than or greater than the one we are
	   *     searching for, respectively, if the exact element cannot be found.
	   *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	   */
	  exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
	    if (aHaystack.length === 0) {
	      return -1;
	    }
	
	    var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
	                                aCompare, aBias || exports.GREATEST_LOWER_BOUND);
	    if (index < 0) {
	      return -1;
	    }
	
	    // We have found either the exact element, or the next-closest element than
	    // the one we are searching for. However, there may be more than one such
	    // element. Make sure we always return the smallest of these.
	    while (index - 1 >= 0) {
	      if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
	        break;
	      }
	      --index;
	    }
	
	    return index;
	  };
	}


/***/ },

/***/ "./node_modules/source-map/lib/array-set.js":
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	{
	  var util = __webpack_require__("./node_modules/source-map/lib/util.js");
	
	  /**
	   * A data structure which is a combination of an array and a set. Adding a new
	   * member is O(1), testing for membership is O(1), and finding the index of an
	   * element is O(1). Removing elements from the set is not supported. Only
	   * strings are supported for membership.
	   */
	  function ArraySet() {
	    this._array = [];
	    this._set = {};
	  }
	
	  /**
	   * Static method for creating ArraySet instances from an existing array.
	   */
	  ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
	    var set = new ArraySet();
	    for (var i = 0, len = aArray.length; i < len; i++) {
	      set.add(aArray[i], aAllowDuplicates);
	    }
	    return set;
	  };
	
	  /**
	   * Return how many unique items are in this ArraySet. If duplicates have been
	   * added, than those do not count towards the size.
	   *
	   * @returns Number
	   */
	  ArraySet.prototype.size = function ArraySet_size() {
	    return Object.getOwnPropertyNames(this._set).length;
	  };
	
	  /**
	   * Add the given string to this set.
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
	    var sStr = util.toSetString(aStr);
	    var isDuplicate = this._set.hasOwnProperty(sStr);
	    var idx = this._array.length;
	    if (!isDuplicate || aAllowDuplicates) {
	      this._array.push(aStr);
	    }
	    if (!isDuplicate) {
	      this._set[sStr] = idx;
	    }
	  };
	
	  /**
	   * Is the given string a member of this set?
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.has = function ArraySet_has(aStr) {
	    var sStr = util.toSetString(aStr);
	    return this._set.hasOwnProperty(sStr);
	  };
	
	  /**
	   * What is the index of the given string in the array?
	   *
	   * @param String aStr
	   */
	  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
	    var sStr = util.toSetString(aStr);
	    if (this._set.hasOwnProperty(sStr)) {
	      return this._set[sStr];
	    }
	    throw new Error('"' + aStr + '" is not in the set.');
	  };
	
	  /**
	   * What is the element at the given index?
	   *
	   * @param Number aIdx
	   */
	  ArraySet.prototype.at = function ArraySet_at(aIdx) {
	    if (aIdx >= 0 && aIdx < this._array.length) {
	      return this._array[aIdx];
	    }
	    throw new Error('No element indexed by ' + aIdx);
	  };
	
	  /**
	   * Returns the array representation of this set (which has the proper indices
	   * indicated by indexOf). Note that this is a copy of the internal array used
	   * for storing the members so that no one can mess with internal state.
	   */
	  ArraySet.prototype.toArray = function ArraySet_toArray() {
	    return this._array.slice();
	  };
	
	  exports.ArraySet = ArraySet;
	}


/***/ },

/***/ "./node_modules/source-map/lib/base64-vlq.js":
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 *
	 * Based on the Base 64 VLQ implementation in Closure Compiler:
	 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	 *
	 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions are
	 * met:
	 *
	 *  * Redistributions of source code must retain the above copyright
	 *    notice, this list of conditions and the following disclaimer.
	 *  * Redistributions in binary form must reproduce the above
	 *    copyright notice, this list of conditions and the following
	 *    disclaimer in the documentation and/or other materials provided
	 *    with the distribution.
	 *  * Neither the name of Google Inc. nor the names of its
	 *    contributors may be used to endorse or promote products derived
	 *    from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	 */
	{
	  var base64 = __webpack_require__("./node_modules/source-map/lib/base64.js");
	
	  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
	  // length quantities we use in the source map spec, the first bit is the sign,
	  // the next four bits are the actual value, and the 6th bit is the
	  // continuation bit. The continuation bit tells us whether there are more
	  // digits in this value following this digit.
	  //
	  //   Continuation
	  //   |    Sign
	  //   |    |
	  //   V    V
	  //   101011
	
	  var VLQ_BASE_SHIFT = 5;
	
	  // binary: 100000
	  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	
	  // binary: 011111
	  var VLQ_BASE_MASK = VLQ_BASE - 1;
	
	  // binary: 100000
	  var VLQ_CONTINUATION_BIT = VLQ_BASE;
	
	  /**
	   * Converts from a two-complement value to a value where the sign bit is
	   * placed in the least significant bit.  For example, as decimals:
	   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	   */
	  function toVLQSigned(aValue) {
	    return aValue < 0
	      ? ((-aValue) << 1) + 1
	      : (aValue << 1) + 0;
	  }
	
	  /**
	   * Converts to a two-complement value from a value where the sign bit is
	   * placed in the least significant bit.  For example, as decimals:
	   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	   */
	  function fromVLQSigned(aValue) {
	    var isNegative = (aValue & 1) === 1;
	    var shifted = aValue >> 1;
	    return isNegative
	      ? -shifted
	      : shifted;
	  }
	
	  /**
	   * Returns the base 64 VLQ encoded value.
	   */
	  exports.encode = function base64VLQ_encode(aValue) {
	    var encoded = "";
	    var digit;
	
	    var vlq = toVLQSigned(aValue);
	
	    do {
	      digit = vlq & VLQ_BASE_MASK;
	      vlq >>>= VLQ_BASE_SHIFT;
	      if (vlq > 0) {
	        // There are still more digits in this value, so we must make sure the
	        // continuation bit is marked.
	        digit |= VLQ_CONTINUATION_BIT;
	      }
	      encoded += base64.encode(digit);
	    } while (vlq > 0);
	
	    return encoded;
	  };
	
	  /**
	   * Decodes the next base 64 VLQ value from the given string and returns the
	   * value and the rest of the string via the out parameter.
	   */
	  exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
	    var strLen = aStr.length;
	    var result = 0;
	    var shift = 0;
	    var continuation, digit;
	
	    do {
	      if (aIndex >= strLen) {
	        throw new Error("Expected more digits in base 64 VLQ value.");
	      }
	
	      digit = base64.decode(aStr.charCodeAt(aIndex++));
	      if (digit === -1) {
	        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
	      }
	
	      continuation = !!(digit & VLQ_CONTINUATION_BIT);
	      digit &= VLQ_BASE_MASK;
	      result = result + (digit << shift);
	      shift += VLQ_BASE_SHIFT;
	    } while (continuation);
	
	    aOutParam.value = fromVLQSigned(result);
	    aOutParam.rest = aIndex;
	  };
	}


/***/ },

/***/ "./node_modules/source-map/lib/base64.js":
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	{
	  var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
	
	  /**
	   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
	   */
	  exports.encode = function (number) {
	    if (0 <= number && number < intToCharMap.length) {
	      return intToCharMap[number];
	    }
	    throw new TypeError("Must be between 0 and 63: " + number);
	  };
	
	  /**
	   * Decode a single base 64 character code digit to an integer. Returns -1 on
	   * failure.
	   */
	  exports.decode = function (charCode) {
	    var bigA = 65;     // 'A'
	    var bigZ = 90;     // 'Z'
	
	    var littleA = 97;  // 'a'
	    var littleZ = 122; // 'z'
	
	    var zero = 48;     // '0'
	    var nine = 57;     // '9'
	
	    var plus = 43;     // '+'
	    var slash = 47;    // '/'
	
	    var littleOffset = 26;
	    var numberOffset = 52;
	
	    // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
	    if (bigA <= charCode && charCode <= bigZ) {
	      return (charCode - bigA);
	    }
	
	    // 26 - 51: abcdefghijklmnopqrstuvwxyz
	    if (littleA <= charCode && charCode <= littleZ) {
	      return (charCode - littleA + littleOffset);
	    }
	
	    // 52 - 61: 0123456789
	    if (zero <= charCode && charCode <= nine) {
	      return (charCode - zero + numberOffset);
	    }
	
	    // 62: +
	    if (charCode == plus) {
	      return 62;
	    }
	
	    // 63: /
	    if (charCode == slash) {
	      return 63;
	    }
	
	    // Invalid base64 digit.
	    return -1;
	  };
	}


/***/ },

/***/ "./node_modules/source-map/lib/quick-sort.js":
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */
	{
	  // It turns out that some (most?) JavaScript engines don't self-host
	  // `Array.prototype.sort`. This makes sense because C++ will likely remain
	  // faster than JS when doing raw CPU-intensive sorting. However, when using a
	  // custom comparator function, calling back and forth between the VM's C++ and
	  // JIT'd JS is rather slow *and* loses JIT type information, resulting in
	  // worse generated code for the comparator function than would be optimal. In
	  // fact, when sorting with a comparator, these costs outweigh the benefits of
	  // sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	  // a ~3500ms mean speed-up in `bench/bench.html`.
	
	  /**
	   * Swap the elements indexed by `x` and `y` in the array `ary`.
	   *
	   * @param {Array} ary
	   *        The array.
	   * @param {Number} x
	   *        The index of the first item.
	   * @param {Number} y
	   *        The index of the second item.
	   */
	  function swap(ary, x, y) {
	    var temp = ary[x];
	    ary[x] = ary[y];
	    ary[y] = temp;
	  }
	
	  /**
	   * Returns a random integer within the range `low .. high` inclusive.
	   *
	   * @param {Number} low
	   *        The lower bound on the range.
	   * @param {Number} high
	   *        The upper bound on the range.
	   */
	  function randomIntInRange(low, high) {
	    return Math.round(low + (Math.random() * (high - low)));
	  }
	
	  /**
	   * The Quick Sort algorithm.
	   *
	   * @param {Array} ary
	   *        An array to sort.
	   * @param {function} comparator
	   *        Function to use to compare two items.
	   * @param {Number} p
	   *        Start index of the array
	   * @param {Number} r
	   *        End index of the array
	   */
	  function doQuickSort(ary, comparator, p, r) {
	    // If our lower bound is less than our upper bound, we (1) partition the
	    // array into two pieces and (2) recurse on each half. If it is not, this is
	    // the empty array and our base case.
	
	    if (p < r) {
	      // (1) Partitioning.
	      //
	      // The partitioning chooses a pivot between `p` and `r` and moves all
	      // elements that are less than or equal to the pivot to the before it, and
	      // all the elements that are greater than it after it. The effect is that
	      // once partition is done, the pivot is in the exact place it will be when
	      // the array is put in sorted order, and it will not need to be moved
	      // again. This runs in O(n) time.
	
	      // Always choose a random pivot so that an input array which is reverse
	      // sorted does not cause O(n^2) running time.
	      var pivotIndex = randomIntInRange(p, r);
	      var i = p - 1;
	
	      swap(ary, pivotIndex, r);
	      var pivot = ary[r];
	
	      // Immediately after `j` is incremented in this loop, the following hold
	      // true:
	      //
	      //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
	      //
	      //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
	      for (var j = p; j < r; j++) {
	        if (comparator(ary[j], pivot) <= 0) {
	          i += 1;
	          swap(ary, i, j);
	        }
	      }
	
	      swap(ary, i + 1, j);
	      var q = i + 1;
	
	      // (2) Recurse on each half.
	
	      doQuickSort(ary, comparator, p, q - 1);
	      doQuickSort(ary, comparator, q + 1, r);
	    }
	  }
	
	  /**
	   * Sort the given array in-place with the given comparator function.
	   *
	   * @param {Array} ary
	   *        An array to sort.
	   * @param {function} comparator
	   *        Function to use to compare two items.
	   */
	  exports.quickSort = function (ary, comparator) {
	    doQuickSort(ary, comparator, 0, ary.length - 1);
	  };
	}


/***/ },

/***/ "./src/SettingsDialog.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _get = __webpack_require__("./node_modules/babel-runtime/helpers/get.js")['default'];
	
	var _inherits = __webpack_require__("./node_modules/babel-runtime/helpers/inherits.js")['default'];
	
	var _createClass = __webpack_require__("./node_modules/babel-runtime/helpers/create-class.js")['default'];
	
	var _classCallCheck = __webpack_require__("./node_modules/babel-runtime/helpers/class-call-check.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _react = __webpack_require__("./node_modules/react/react.js");
	
	var _react2 = _interopRequireDefault(_react);
	
	var _pubsubJs = __webpack_require__("./node_modules/pubsub-js/src/pubsub.js");
	
	var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
	
	function noop() {}
	
	var SettingsDialog = (function (_React$Component) {
	  _inherits(SettingsDialog, _React$Component);
	
	  function SettingsDialog(props) {
	    _classCallCheck(this, SettingsDialog);
	
	    _get(Object.getPrototypeOf(SettingsDialog.prototype), 'constructor', this).call(this, props);
	    this.state = { show: false };
	
	    this._show = this._toggleVisibility.bind(this, true);
	    this._hide = this._toggleVisibility.bind(this, false);
	    this._onChange = this._onChange.bind(this);
	    this._outerClick = this._outerClick.bind(this);
	  }
	
	  _createClass(SettingsDialog, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      _pubsubJs2['default'].subscribe('PARSER.SHOW_SETTINGS', this._show);
	    }
	  }, {
	    key: '_toggleVisibility',
	    value: function _toggleVisibility(show) {
	      this.setState({
	        show: show
	      });
	    }
	  }, {
	    key: '_outerClick',
	    value: function _outerClick(event) {
	      if (event.target === document.getElementById('SettingsDialog')) {
	        this._onChange();
	      }
	    }
	  }, {
	    key: '_onChange',
	    value: function _onChange() {
	      this._hide();
	      this.props.onChange();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.show) {
	        var settings = (this.props.parser.renderSettings || noop)();
	        return _react2['default'].createElement(
	          'div',
	          { id: 'SettingsDialog', onClick: this._outerClick },
	          _react2['default'].createElement(
	            'div',
	            { className: 'inner' },
	            _react2['default'].createElement(
	              'div',
	              { className: 'header' },
	              _react2['default'].createElement(
	                'h3',
	                null,
	                this.props.parser.displayName,
	                ' Settings'
	              )
	            ),
	            _react2['default'].createElement(
	              'div',
	              { className: 'body' },
	              settings
	            )
	          )
	        );
	      }
	      return null;
	    }
	  }]);
	
	  return SettingsDialog;
	})(_react2['default'].Component);
	
	exports['default'] = SettingsDialog;
	module.exports = exports['default'];

/***/ },

/***/ "./src/parsers/css/postcss.js":
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = __webpack_require__("./node_modules/babel-runtime/helpers/extends.js")['default'];
	
	var _Set = __webpack_require__("./node_modules/babel-runtime/core-js/set.js")['default'];
	
	var _interopRequireDefault = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-default.js")['default'];
	
	var _interopRequireWildcard = __webpack_require__("./node_modules/babel-runtime/helpers/interop-require-wildcard.js")['default'];
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _utilsDefaultCSSParserInterface = __webpack_require__("./src/parsers/css/utils/defaultCSSParserInterface.js");
	
	var _utilsDefaultCSSParserInterface2 = _interopRequireDefault(_utilsDefaultCSSParserInterface);
	
	var _postcssPackageJson = __webpack_require__("./node_modules/postcss/package.json");
	
	var _postcssPackageJson2 = _interopRequireDefault(_postcssPackageJson);
	
	var _utilsSettingsRenderer = __webpack_require__("./src/parsers/utils/SettingsRenderer.js");
	
	var _utilsSettingsRenderer2 = _interopRequireDefault(_utilsSettingsRenderer);
	
	var _LocalStorage = __webpack_require__("./src/LocalStorage.js");
	
	var LocalStorage = _interopRequireWildcard(_LocalStorage);
	
	var ID = 'postcss';
	var options = _extends({
	  parser: 'built-in'
	}, LocalStorage.getParserSettings(ID));
	
	var settings = [['parser', ['built-in', 'scss', 'safe-parser']]];
	
	exports['default'] = _extends({}, _utilsDefaultCSSParserInterface2['default'], {
	
	  id: ID,
	  displayName: ID,
	  version: _postcssPackageJson2['default'].version,
	  homepage: _postcssPackageJson2['default'].homepage,
	  locationProps: new _Set(['source']),
	
	  loadParser: function loadParser(callback) {
	    (function(/* require */) {var __WEBPACK_REMAINING_CHUNKS__ = 2;var __WEBPACK_CALLBACK__ = function() {if(--__WEBPACK_REMAINING_CHUNKS__ < 1) (function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/postcss/lib/parse.js"), __webpack_require__("./node_modules/postcss-scss/lib/scss-parse.js"), __webpack_require__("./node_modules/postcss-safe-parser/lib/safe-parse.js")]; (function (builtIn, scss, safe) {
	      callback({
	        'built-in': builtIn,
	        scss: scss,
	        'safe-parser': safe
	      });
	    }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}(__webpack_require__));};__webpack_require__.e(26, __WEBPACK_CALLBACK__);__webpack_require__.e(4, __WEBPACK_CALLBACK__);}());
	  },
	
	  parse: function parse(parsers, code) {
	    return _utilsDefaultCSSParserInterface2['default'].parse.call(this, parsers[options.parser], code);
	  },
	
	  nodeToRange: function nodeToRange(_ref) {
	    var range = _ref.source;
	
	    if (!range || !range.end) return;
	    return [this.getOffset(range.start), this.getOffset(range.end) + 1];
	  },
	
	  opensByDefault: function opensByDefault(node, key) {
	    return key === 'nodes';
	  },
	
	  _ignoredProperties: new _Set(['parent', 'input']),
	
	  renderSettings: function renderSettings() {
	    return (0, _utilsSettingsRenderer2['default'])({
	      settings: settings,
	      values: options,
	      onChange: changeOption
	    });
	  }
	});
	
	function changeOption(name, _ref2) {
	  var target = _ref2.target;
	
	  options[name] = target.value;
	  LocalStorage.setParserSettings(ID, options);
	}
	module.exports = exports['default'];

/***/ }

});