webpackJsonp([92],{

/***/ "./src/parsers/utils/transformJSCode.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function transform(e){return babel.transform(e,options).code}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=transform;var _babel=__webpack_require__("./node_modules/babel6/index.js"),babel=_interopRequireWildcard(_babel),_babelPresetEs=__webpack_require__("./node_modules/babel-preset-es2015/lib/index.js"),_babelPresetEs2=_interopRequireDefault(_babelPresetEs),_babelPresetStage=__webpack_require__("./node_modules/babel-preset-stage-1/lib/index.js"),_babelPresetStage2=_interopRequireDefault(_babelPresetStage),_babelPluginTransformFlowStripTypes=__webpack_require__("./node_modules/babel-plugin-transform-flow-strip-types/lib/index.js"),_babelPluginTransformFlowStripTypes2=_interopRequireDefault(_babelPluginTransformFlowStripTypes),options={presets:[_babelPresetEs2["default"],_babelPresetStage2["default"]],plugins:[_babelPluginTransformFlowStripTypes2["default"]],ast:!1,babelrc:!1,highlightCode:!1};

/***/ },

/***/ "./node_modules/babel-plugin-syntax-flow/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(t,e){e.plugins.push("flow")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-core/index.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/babel-core/lib/api/node.js");

/***/ },

/***/ "./node_modules/babel-core/lib/api/node.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function Plugin(e){throw new Error("The ("+e+") Babel 5 plugin is being run with Babel 6.")}function transformFile(e,r,t){(0,_isFunction2["default"])(r)&&(t=r,r={}),r.filename=e,_fs2["default"].readFile(e,function(e,i){var n=void 0;if(!e)try{n=transform(i,r)}catch(a){e=a}e?t(e):t(null,n)})}function transformFileSync(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return r.filename=e,transform(_fs2["default"].readFileSync(e,"utf8"),r)}exports.__esModule=!0,exports.transformFromAst=exports.transform=exports.analyse=exports.Pipeline=exports.OptionManager=exports.traverse=exports.types=exports.messages=exports.util=exports.version=exports.template=exports.buildExternalHelpers=exports.options=exports.File=void 0;var _file=__webpack_require__("./node_modules/babel-core/lib/transformation/file/index.js");Object.defineProperty(exports,"File",{enumerable:!0,get:function(){return _interopRequireDefault(_file)["default"]}});var _config=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/config.js");Object.defineProperty(exports,"options",{enumerable:!0,get:function(){return _interopRequireDefault(_config)["default"]}});var _buildExternalHelpers=__webpack_require__("./node_modules/babel-core/lib/tools/build-external-helpers.js");Object.defineProperty(exports,"buildExternalHelpers",{enumerable:!0,get:function(){return _interopRequireDefault(_buildExternalHelpers)["default"]}});var _babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js");Object.defineProperty(exports,"template",{enumerable:!0,get:function(){return _interopRequireDefault(_babelTemplate)["default"]}});var _package=__webpack_require__("./node_modules/babel-core/package.json");Object.defineProperty(exports,"version",{enumerable:!0,get:function(){return _package.version}}),exports.Plugin=Plugin,exports.transformFile=transformFile,exports.transformFileSync=transformFileSync;var _isFunction=__webpack_require__("./node_modules/lodash/isFunction.js"),_isFunction2=_interopRequireDefault(_isFunction),_fs=__webpack_require__("./node_modules/webpack/node_modules/node-libs-browser/mock/empty.js"),_fs2=_interopRequireDefault(_fs),_util=__webpack_require__("./node_modules/babel-core/lib/util.js"),util=_interopRequireWildcard(_util),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_babelTraverse=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_babelTraverse2=_interopRequireDefault(_babelTraverse),_optionManager=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/option-manager.js"),_optionManager2=_interopRequireDefault(_optionManager),_pipeline=__webpack_require__("./node_modules/babel-core/lib/transformation/pipeline.js"),_pipeline2=_interopRequireDefault(_pipeline);exports.util=util,exports.messages=messages,exports.types=t,exports.traverse=_babelTraverse2["default"],exports.OptionManager=_optionManager2["default"],exports.Pipeline=_pipeline2["default"];var pipeline=new _pipeline2["default"],analyse=exports.analyse=pipeline.analyse.bind(pipeline),transform=exports.transform=pipeline.transform.bind(pipeline),transformFromAst=exports.transformFromAst=pipeline.transformFromAst.bind(pipeline);

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.File=void 0;var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create),_assign=__webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js"),_assign2=_interopRequireDefault(_assign),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_babelHelpers=__webpack_require__("./node_modules/babel-helpers/lib/index.js"),_babelHelpers2=_interopRequireDefault(_babelHelpers),_metadata=__webpack_require__("./node_modules/babel-core/lib/transformation/file/metadata.js"),metadataVisitor=_interopRequireWildcard(_metadata),_convertSourceMap=__webpack_require__("./node_modules/convert-source-map/index.js"),_convertSourceMap2=_interopRequireDefault(_convertSourceMap),_optionManager=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/option-manager.js"),_optionManager2=_interopRequireDefault(_optionManager),_pluginPass=__webpack_require__("./node_modules/babel-core/lib/transformation/plugin-pass.js"),_pluginPass2=_interopRequireDefault(_pluginPass),_shebangRegex=__webpack_require__("./node_modules/shebang-regex/index.js"),_shebangRegex2=_interopRequireDefault(_shebangRegex),_babelTraverse=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_babelTraverse2=_interopRequireDefault(_babelTraverse),_sourceMap=__webpack_require__("./node_modules/source-map/source-map.js"),_sourceMap2=_interopRequireDefault(_sourceMap),_babelGenerator=__webpack_require__("./node_modules/babel-generator/lib/index.js"),_babelGenerator2=_interopRequireDefault(_babelGenerator),_babelCodeFrame=__webpack_require__("./node_modules/babel-code-frame/lib/index.js"),_babelCodeFrame2=_interopRequireDefault(_babelCodeFrame),_defaults=__webpack_require__("./node_modules/lodash/defaults.js"),_defaults2=_interopRequireDefault(_defaults),_logger=__webpack_require__("./node_modules/babel-core/lib/transformation/file/logger.js"),_logger2=_interopRequireDefault(_logger),_store=__webpack_require__("./node_modules/babel-core/lib/store.js"),_store2=_interopRequireDefault(_store),_babylon=__webpack_require__("./node_modules/babylon/lib/index.js"),_util=__webpack_require__("./node_modules/babel-core/lib/util.js"),util=_interopRequireWildcard(_util),_path=__webpack_require__("./node_modules/path-browserify/index.js"),_path2=_interopRequireDefault(_path),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_resolve=__webpack_require__("./node_modules/babel-core/lib/helpers/resolve.js"),_resolve2=_interopRequireDefault(_resolve),_blockHoist=__webpack_require__("./node_modules/babel-core/lib/transformation/internal-plugins/block-hoist.js"),_blockHoist2=_interopRequireDefault(_blockHoist),_shadowFunctions=__webpack_require__("./node_modules/babel-core/lib/transformation/internal-plugins/shadow-functions.js"),_shadowFunctions2=_interopRequireDefault(_shadowFunctions),INTERNAL_PLUGINS=[[_blockHoist2["default"]],[_shadowFunctions2["default"]]],errorVisitor={enter:function(e,t){var r=e.node.loc;r&&(t.loc=r,e.stop())}},File=function(e){function r(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],a=arguments[1];(0,_classCallCheck3["default"])(this,r);var o=(0,_possibleConstructorReturn3["default"])(this,e.call(this));return o.pipeline=a,o.log=new _logger2["default"](o,t.filename||"unknown"),o.opts=o.initOptions(t),o.parserOpts={highlightCode:o.opts.highlightCode,nonStandard:o.opts.nonStandard,sourceType:o.opts.sourceType,filename:o.opts.filename,sourceFileName:o.opts.filename,plugins:[]},o.pluginVisitors=[],o.pluginPasses=[],o.buildPluginsForOptions(o.opts),o.opts.passPerPreset&&(o.perPresetOpts=[],o.opts.presets.forEach(function(e){var t=(0,_assign2["default"])((0,_create2["default"])(o.opts),e);o.perPresetOpts.push(t),o.buildPluginsForOptions(t)})),o.metadata={usedHelpers:[],marked:[],modules:{imports:[],exports:{exported:[],specifiers:[]}}},o.dynamicImportTypes={},o.dynamicImportIds={},o.dynamicImports=[],o.declarations={},o.usedHelpers={},o.path=null,o.ast={},o.code="",o.shebang="",o.hub=new _babelTraverse.Hub(o),o}return(0,_inherits3["default"])(r,e),r.prototype.getMetadata=function(){for(var e=!1,r=this.ast.program.body,a=Array.isArray(r),o=0,r=a?r:(0,_getIterator3["default"])(r);;){var i;if(a){if(o>=r.length)break;i=r[o++]}else{if(o=r.next(),o.done)break;i=o.value}var s=i;if(t.isModuleDeclaration(s)){e=!0;break}}e&&this.path.traverse(metadataVisitor,this)},r.prototype.initOptions=function(e){e=new _optionManager2["default"](this.log,this.pipeline).init(e),e.inputSourceMap&&(e.sourceMaps=!0),e.moduleId&&(e.moduleIds=!0),e.basename=_path2["default"].basename(e.filename,_path2["default"].extname(e.filename)),e.ignore=util.arrayify(e.ignore,util.regexify),e.only&&(e.only=util.arrayify(e.only,util.regexify)),(0,_defaults2["default"])(e,{moduleRoot:e.sourceRoot}),(0,_defaults2["default"])(e,{sourceRoot:e.moduleRoot}),(0,_defaults2["default"])(e,{filenameRelative:e.filename});var t=_path2["default"].basename(e.filenameRelative);return(0,_defaults2["default"])(e,{sourceFileName:t,sourceMapTarget:t}),e},r.prototype.buildPluginsForOptions=function(e){if(Array.isArray(e.plugins)){for(var t=e.plugins.concat(INTERNAL_PLUGINS),r=[],a=[],o=t,i=Array.isArray(o),s=0,o=i?o:(0,_getIterator3["default"])(o);;){var n;if(i){if(s>=o.length)break;n=o[s++]}else{if(s=o.next(),s.done)break;n=s.value}var u=n,l=u[0],p=u[1];r.push(l.visitor),a.push(new _pluginPass2["default"](this,l,p)),l.manipulateOptions&&l.manipulateOptions(e,this.parserOpts,this)}this.pluginVisitors.push(r),this.pluginPasses.push(a)}},r.prototype.getModuleName=function(){var e=this.opts;if(!e.moduleIds)return null;if(null!=e.moduleId&&!e.getModuleId)return e.moduleId;var t=e.filenameRelative,r="";if(null!=e.moduleRoot&&(r=e.moduleRoot+"/"),!e.filenameRelative)return r+e.filename.replace(/^\//,"");if(null!=e.sourceRoot){var a=new RegExp("^"+e.sourceRoot+"/?");t=t.replace(a,"")}return t=t.replace(/\.(\w*?)$/,""),r+=t,r=r.replace(/\\/g,"/"),e.getModuleId?e.getModuleId(r)||r:r},r.prototype.resolveModuleSource=function a(e){var a=this.opts.resolveModuleSource;return a&&(e=a(e,this.opts.filename)),e},r.prototype.addImport=function(e,r){var a=arguments.length<=2||void 0===arguments[2]?r:arguments[2],o=e+":"+r,i=this.dynamicImportIds[o];if(!i){e=this.resolveModuleSource(e),i=this.dynamicImportIds[o]=this.scope.generateUidIdentifier(a);var s=[];"*"===r?s.push(t.importNamespaceSpecifier(i)):"default"===r?s.push(t.importDefaultSpecifier(i)):s.push(t.importSpecifier(i,t.identifier(r)));var n=t.importDeclaration(s,t.stringLiteral(e));n._blockHoist=3,this.path.unshiftContainer("body",n)}return i},r.prototype.addHelper=function(e){var r=this.declarations[e];if(r)return r;this.usedHelpers[e]||(this.metadata.usedHelpers.push(e),this.usedHelpers[e]=!0);var a=this.get("helperGenerator"),o=this.get("helpersNamespace");if(a){var i=a(e);if(i)return i}else if(o)return t.memberExpression(o,t.identifier(e));var s=(0,_babelHelpers2["default"])(e),n=this.declarations[e]=this.scope.generateUidIdentifier(e);return t.isFunctionExpression(s)&&!s.id?(s.body._compact=!0,s._generated=!0,s.id=n,s.type="FunctionDeclaration",this.path.unshiftContainer("body",s)):(s._compact=!0,this.scope.push({id:n,init:s,unique:!0})),n},r.prototype.addTemplateObject=function(e,r,a){var o=a.elements.map(function(e){return e.value}),i=e+"_"+a.elements.length+"_"+o.join(","),s=this.declarations[i];if(s)return s;var n=this.declarations[i]=this.scope.generateUidIdentifier("templateObject"),u=this.addHelper(e),l=t.callExpression(u,[r,a]);return l._compact=!0,this.scope.push({id:n,init:l,_blockHoist:1.9}),n},r.prototype.buildCodeFrameError=function(e,t){var r=arguments.length<=2||void 0===arguments[2]?SyntaxError:arguments[2],a=e&&(e.loc||e._loc),o=new r(t);return a?o.loc=a.start:((0,_babelTraverse2["default"])(e,errorVisitor,this.scope,o),o.message+=" (This is an error on an internal node. Probably an internal error",o.loc&&(o.message+=". Location has been estimated."),o.message+=")"),o},r.prototype.mergeSourceMap=function(e){var t=this.opts.inputSourceMap;if(!t)return e;var r=function(){var r=new _sourceMap2["default"].SourceMapConsumer(t),a=new _sourceMap2["default"].SourceMapConsumer(e),o=new _sourceMap2["default"].SourceMapGenerator({file:r.file,sourceRoot:r.sourceRoot}),i=a.sources[0];r.eachMapping(function(e){var t=a.generatedPositionFor({line:e.generatedLine,column:e.generatedColumn,source:i});null!=t.column&&o.addMapping({source:e.source,original:null==e.source?null:{line:e.originalLine,column:e.originalColumn},generated:t})});var s=o.toJSON();return t.mappings=s.mappings,{v:t}}();return"object"===("undefined"==typeof r?"undefined":(0,_typeof3["default"])(r))?r.v:void 0},r.prototype.parse=function(e){var t=_babylon.parse,r=this.opts.parserOpts;if(r&&(r=(0,_assign2["default"])({},this.parserOpts,r),r.parser)){if("string"==typeof r.parser){var a=_path2["default"].dirname(this.opts.filename)||process.cwd(),o=(0,_resolve2["default"])(r.parser,a);if(!o)throw new Error("Couldn't find parser "+r.parser+' with "parse" method relative to directory '+a);t=__webpack_require__(14)(o).parse}else t=r.parser;r.parser={parse:function(e){return(0,_babylon.parse)(e,r)}}}this.log.debug("Parse start");var i=t(e,r||this.parserOpts);return this.log.debug("Parse stop"),i},r.prototype._addAst=function(e){this.path=_babelTraverse.NodePath.get({hub:this.hub,parentPath:null,parent:e,container:e,key:"program"}).setContext(),this.scope=this.path.scope,this.ast=e,this.getMetadata()},r.prototype.addAst=function(e){this.log.debug("Start set AST"),this._addAst(e),this.log.debug("End set AST")},r.prototype.transform=function(){for(var e=0;e<this.pluginPasses.length;e++){var t=this.pluginPasses[e];this.call("pre",t),this.log.debug("Start transform traverse");var r=_babelTraverse2["default"].visitors.merge(this.pluginVisitors[e],t,this.opts.wrapPluginVisitorMethod);(0,_babelTraverse2["default"])(this.ast,r,this.scope),this.log.debug("End transform traverse"),this.call("post",t)}return this.generate()},r.prototype.wrap=function(e,t){e+="";try{return this.shouldIgnore()?this.makeResult({code:e,ignored:!0}):t()}catch(r){if(r._babel)throw r;r._babel=!0;var a=r.message=this.opts.filename+": "+r.message,o=r.loc;if(o&&(r.codeFrame=(0,_babelCodeFrame2["default"])(e,o.line,o.column+1,this.opts),a+="\n"+r.codeFrame),process.browser&&(r.message=a),r.stack){var i=r.stack.replace(r.message,a);r.stack=i}throw r}},r.prototype.addCode=function(e){e=(e||"")+"",e=this.parseInputSourceMap(e),this.code=e},r.prototype.parseCode=function(){this.parseShebang();var e=this.parse(this.code);this.addAst(e)},r.prototype.shouldIgnore=function(){var e=this.opts;return util.shouldIgnore(e.filename,e.ignore,e.only)},r.prototype.call=function(e,t){for(var r=t,a=Array.isArray(r),o=0,r=a?r:(0,_getIterator3["default"])(r);;){var i;if(a){if(o>=r.length)break;i=r[o++]}else{if(o=r.next(),o.done)break;i=o.value}var s=i,n=s.plugin,u=n[e];u&&u.call(s,this)}},r.prototype.parseInputSourceMap=function(e){var t=this.opts;if(t.inputSourceMap!==!1){var r=_convertSourceMap2["default"].fromSource(e);r&&(t.inputSourceMap=r.toObject(),e=_convertSourceMap2["default"].removeComments(e))}return e},r.prototype.parseShebang=function(){var e=_shebangRegex2["default"].exec(this.code);e&&(this.shebang=e[0],this.code=this.code.replace(_shebangRegex2["default"],""))},r.prototype.makeResult=function(e){var t=e.code,r=e.map,a=e.ast,o=e.ignored,i={metadata:null,options:this.opts,ignored:!!o,code:null,ast:null,map:r||null};return this.opts.code&&(i.code=t),this.opts.ast&&(i.ast=a),this.opts.metadata&&(i.metadata=this.metadata),i},r.prototype.generate=function(){var e=this.opts,t=this.ast,r={ast:t};if(!e.code)return this.makeResult(r);var a=_babelGenerator2["default"];if(e.generatorOpts.generator&&(a=e.generatorOpts.generator,"string"==typeof a)){var o=_path2["default"].dirname(this.opts.filename)||process.cwd(),i=(0,_resolve2["default"])(a,o);if(!i)throw new Error("Couldn't find generator "+a+' with "print" method relative to directory '+o);a=__webpack_require__(14)(i).print}this.log.debug("Generation start");var s=a(t,e.generatorOpts?(0,_assign2["default"])(e,e.generatorOpts):e,this.code);return r.code=s.code,r.map=s.map,this.log.debug("Generation end"),this.shebang&&(r.code=this.shebang+"\n"+r.code),r.map&&(r.map=this.mergeSourceMap(r.map)),"inline"!==e.sourceMaps&&"both"!==e.sourceMaps||(r.code+="\n"+_convertSourceMap2["default"].fromObject(r.map).toComment()),"inline"===e.sourceMaps&&(r.map=null),this.makeResult(r)},r}(_store2["default"]);exports["default"]=File,exports.File=File;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/babel-helpers/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function get(e){var r=_helpers2["default"][e];if(!r)throw new ReferenceError("Unknown helper "+e);return r().expression}exports.__esModule=!0,exports.list=void 0;var _keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys);exports.get=get;var _helpers=__webpack_require__("./node_modules/babel-helpers/lib/helpers.js"),_helpers2=_interopRequireDefault(_helpers),list=exports.list=(0,_keys2["default"])(_helpers2["default"]).map(function(e){return"_"===e[0]?e.slice(1):e}).filter(function(e){return"__esModule"!==e});exports["default"]=get;

/***/ },

/***/ "./node_modules/babel-helpers/lib/helpers.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),helpers={};exports["default"]=helpers,helpers["typeof"]=(0,_babelTemplate2["default"])('\n  (typeof Symbol === "function" && typeof Symbol.iterator === "symbol")\n    ? function (obj) { return typeof obj; }\n    : function (obj) {\n        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype\n          ? "symbol"\n          : typeof obj;\n      };\n'),helpers.jsx=(0,_babelTemplate2["default"])('\n  (function () {\n    var REACT_ELEMENT_TYPE = (typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")) || 0xeac7;\n\n    return function createRawReactElement (type, props, key, children) {\n      var defaultProps = type && type.defaultProps;\n      var childrenLength = arguments.length - 3;\n\n      if (!props && childrenLength !== 0) {\n        // If we\'re going to assign props.children, we create a new object now\n        // to avoid mutating defaultProps.\n        props = {};\n      }\n      if (props && defaultProps) {\n        for (var propName in defaultProps) {\n          if (props[propName] === void 0) {\n            props[propName] = defaultProps[propName];\n          }\n        }\n      } else if (!props) {\n        props = defaultProps || {};\n      }\n\n      if (childrenLength === 1) {\n        props.children = children;\n      } else if (childrenLength > 1) {\n        var childArray = Array(childrenLength);\n        for (var i = 0; i < childrenLength; i++) {\n          childArray[i] = arguments[i + 3];\n        }\n        props.children = childArray;\n      }\n\n      return {\n        $$typeof: REACT_ELEMENT_TYPE,\n        type: type,\n        key: key === undefined ? null : \'\' + key,\n        ref: null,\n        props: props,\n        _owner: null,\n      };\n    };\n\n  })()\n'),helpers.asyncIterator=(0,_babelTemplate2["default"])('\n  (function (iterable) {\n    if (typeof Symbol === "function") {\n      if (Symbol.asyncIterator) {\n        var method = iterable[Symbol.asyncIterator];\n        if (method != null) return method.call(iterable);\n      }\n      if (Symbol.iterator) {\n        return iterable[Symbol.iterator]();\n      }\n    }\n    throw new TypeError("Object is not async iterable");\n  })\n'),helpers.asyncGenerator=(0,_babelTemplate2["default"])('\n  (function () {\n    function AwaitValue(value) {\n      this.value = value;\n    }\n\n    function AsyncGenerator(gen) {\n      var front, back;\n\n      function send(key, arg) {\n        return new Promise(function (resolve, reject) {\n          var request = {\n            key: key,\n            arg: arg,\n            resolve: resolve,\n            reject: reject,\n            next: null\n          };\n\n          if (back) {\n            back = back.next = request;\n          } else {\n            front = back = request;\n            resume(key, arg);\n          }\n        });\n      }\n\n      function resume(key, arg) {\n        try {\n          var result = gen[key](arg)\n          var value = result.value;\n          if (value instanceof AwaitValue) {\n            Promise.resolve(value.value).then(\n              function (arg) { resume("next", arg); },\n              function (arg) { resume("throw", arg); });\n          } else {\n            settle(result.done ? "return" : "normal", result.value);\n          }\n        } catch (err) {\n          settle("throw", err);\n        }\n      }\n\n      function settle(type, value) {\n        switch (type) {\n          case "return":\n            front.resolve({ value: value, done: true });\n            break;\n          case "throw":\n            front.reject(value);\n            break;\n          default:\n            front.resolve({ value: value, done: false });\n            break;\n        }\n\n        front = front.next;\n        if (front) {\n          resume(front.key, front.arg);\n        } else {\n          back = null;\n        }\n      }\n\n      this._invoke = send;\n\n      // Hide "return" method if generator return is not supported\n      if (typeof gen.return !== "function") {\n        this.return = undefined;\n      }\n    }\n\n    if (typeof Symbol === "function" && Symbol.asyncIterator) {\n      AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; };\n    }\n\n    AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };\n    AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };\n    AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };\n\n    return {\n      wrap: function (fn) {\n        return function () {\n          return new AsyncGenerator(fn.apply(this, arguments));\n        };\n      },\n      await: function (value) {\n        return new AwaitValue(value);\n      }\n    };\n\n  })()\n'),helpers.asyncGeneratorDelegate=(0,_babelTemplate2["default"])('\n  (function (inner, awaitWrap) {\n    var iter = {}, waiting = false;\n\n    function pump(key, value) {\n      waiting = true;\n      value = new Promise(function (resolve) { resolve(inner[key](value)); });\n      return { done: false, value: awaitWrap(value) };\n    };\n\n    if (typeof Symbol === "function" && Symbol.iterator) {\n      iter[Symbol.iterator] = function () { return this; };\n    }\n\n    iter.next = function (value) {\n      if (waiting) {\n        waiting = false;\n        return value;\n      }\n      return pump("next", value);\n    };\n\n    if (typeof inner.throw === "function") {\n      iter.throw = function (value) {\n        if (waiting) {\n          waiting = false;\n          throw value;\n        }\n        return pump("throw", value);\n      };\n    }\n\n    if (typeof inner.return === "function") {\n      iter.return = function (value) {\n        return pump("return", value);\n      };\n    }\n\n    return iter;\n  })\n'),helpers.asyncToGenerator=(0,_babelTemplate2["default"])('\n  (function (fn) {\n    return function () {\n      var gen = fn.apply(this, arguments);\n      return new Promise(function (resolve, reject) {\n        function step(key, arg) {\n          try {\n            var info = gen[key](arg);\n            var value = info.value;\n          } catch (error) {\n            reject(error);\n            return;\n          }\n\n          if (info.done) {\n            resolve(value);\n          } else {\n            return Promise.resolve(value).then(function (value) {\n              step("next", value);\n            }, function (err) {\n              step("throw", err);\n            });\n          }\n        }\n\n        return step("next");\n      });\n    };\n  })\n'),helpers.classCallCheck=(0,_babelTemplate2["default"])('\n  (function (instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n      throw new TypeError("Cannot call a class as a function");\n    }\n  });\n'),helpers.createClass=(0,_babelTemplate2["default"])('\n  (function() {\n    function defineProperties(target, props) {\n      for (var i = 0; i < props.length; i ++) {\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if ("value" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n      }\n    }\n\n    return function (Constructor, protoProps, staticProps) {\n      if (protoProps) defineProperties(Constructor.prototype, protoProps);\n      if (staticProps) defineProperties(Constructor, staticProps);\n      return Constructor;\n    };\n  })()\n'),helpers.defineEnumerableProperties=(0,_babelTemplate2["default"])('\n  (function (obj, descs) {\n    for (var key in descs) {\n      var desc = descs[key];\n      desc.configurable = desc.enumerable = true;\n      if ("value" in desc) desc.writable = true;\n      Object.defineProperty(obj, key, desc);\n    }\n    return obj;\n  })\n'),helpers.defaults=(0,_babelTemplate2["default"])("\n  (function (obj, defaults) {\n    var keys = Object.getOwnPropertyNames(defaults);\n    for (var i = 0; i < keys.length; i++) {\n      var key = keys[i];\n      var value = Object.getOwnPropertyDescriptor(defaults, key);\n      if (value && value.configurable && obj[key] === undefined) {\n        Object.defineProperty(obj, key, value);\n      }\n    }\n    return obj;\n  })\n"),helpers.defineProperty=(0,_babelTemplate2["default"])("\n  (function (obj, key, value) {\n    // Shortcircuit the slow defineProperty path when possible.\n    // We are trying to avoid issues where setters defined on the\n    // prototype cause side effects under the fast path of simple\n    // assignment. By checking for existence of the property with\n    // the in operator, we can optimize most of this overhead away.\n    if (key in obj) {\n      Object.defineProperty(obj, key, {\n        value: value,\n        enumerable: true,\n        configurable: true,\n        writable: true\n      });\n    } else {\n      obj[key] = value;\n    }\n    return obj;\n  });\n"),helpers["extends"]=(0,_babelTemplate2["default"])("\n  Object.assign || (function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n    return target;\n  })\n"),helpers.get=(0,_babelTemplate2["default"])('\n  (function get(object, property, receiver) {\n    if (object === null) object = Function.prototype;\n\n    var desc = Object.getOwnPropertyDescriptor(object, property);\n\n    if (desc === undefined) {\n      var parent = Object.getPrototypeOf(object);\n\n      if (parent === null) {\n        return undefined;\n      } else {\n        return get(parent, property, receiver);\n      }\n    } else if ("value" in desc) {\n      return desc.value;\n    } else {\n      var getter = desc.get;\n\n      if (getter === undefined) {\n        return undefined;\n      }\n\n      return getter.call(receiver);\n    }\n  });\n'),helpers.inherits=(0,_babelTemplate2["default"])('\n  (function (subClass, superClass) {\n    if (typeof superClass !== "function" && superClass !== null) {\n      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n      constructor: {\n        value: subClass,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n  })\n'),helpers["instanceof"]=(0,_babelTemplate2["default"])('\n  (function (left, right) {\n    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {\n      return right[Symbol.hasInstance](left);\n    } else {\n      return left instanceof right;\n    }\n  });\n'),helpers.interopRequireDefault=(0,_babelTemplate2["default"])("\n  (function (obj) {\n    return obj && obj.__esModule ? obj : { default: obj };\n  })\n"),helpers.interopRequireWildcard=(0,_babelTemplate2["default"])("\n  (function (obj) {\n    if (obj && obj.__esModule) {\n      return obj;\n    } else {\n      var newObj = {};\n      if (obj != null) {\n        for (var key in obj) {\n          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];\n        }\n      }\n      newObj.default = obj;\n      return newObj;\n    }\n  })\n"),helpers.newArrowCheck=(0,_babelTemplate2["default"])('\n  (function (innerThis, boundThis) {\n    if (innerThis !== boundThis) {\n      throw new TypeError("Cannot instantiate an arrow function");\n    }\n  });\n'),helpers.objectDestructuringEmpty=(0,_babelTemplate2["default"])('\n  (function (obj) {\n    if (obj == null) throw new TypeError("Cannot destructure undefined");\n  });\n'),helpers.objectWithoutProperties=(0,_babelTemplate2["default"])("\n  (function (obj, keys) {\n    var target = {};\n    for (var i in obj) {\n      if (keys.indexOf(i) >= 0) continue;\n      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;\n      target[i] = obj[i];\n    }\n    return target;\n  })\n"),helpers.possibleConstructorReturn=(0,_babelTemplate2["default"])('\n  (function (self, call) {\n    if (!self) {\n      throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called");\n    }\n    return call && (typeof call === "object" || typeof call === "function") ? call : self;\n  });\n'),helpers.selfGlobal=(0,_babelTemplate2["default"])('\n  typeof global === "undefined" ? self : global\n'),helpers.set=(0,_babelTemplate2["default"])('\n  (function set(object, property, value, receiver) {\n    var desc = Object.getOwnPropertyDescriptor(object, property);\n\n    if (desc === undefined) {\n      var parent = Object.getPrototypeOf(object);\n\n      if (parent !== null) {\n        set(parent, property, value, receiver);\n      }\n    } else if ("value" in desc && desc.writable) {\n      desc.value = value;\n    } else {\n      var setter = desc.set;\n\n      if (setter !== undefined) {\n        setter.call(receiver, value);\n      }\n    }\n\n    return value;\n  });\n'),helpers.slicedToArray=(0,_babelTemplate2["default"])('\n  (function () {\n    // Broken out into a separate function to avoid deoptimizations due to the try/catch for the\n    // array iterator case.\n    function sliceIterator(arr, i) {\n      // this is an expanded form of `for...of` that properly supports abrupt completions of\n      // iterators etc. variable names have been minimised to reduce the size of this massive\n      // helper. sometimes spec compliancy is annoying :(\n      //\n      // _n = _iteratorNormalCompletion\n      // _d = _didIteratorError\n      // _e = _iteratorError\n      // _i = _iterator\n      // _s = _step\n\n      var _arr = [];\n      var _n = true;\n      var _d = false;\n      var _e = undefined;\n      try {\n        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n          _arr.push(_s.value);\n          if (i && _arr.length === i) break;\n        }\n      } catch (err) {\n        _d = true;\n        _e = err;\n      } finally {\n        try {\n          if (!_n && _i["return"]) _i["return"]();\n        } finally {\n          if (_d) throw _e;\n        }\n      }\n      return _arr;\n    }\n\n    return function (arr, i) {\n      if (Array.isArray(arr)) {\n        return arr;\n      } else if (Symbol.iterator in Object(arr)) {\n        return sliceIterator(arr, i);\n      } else {\n        throw new TypeError("Invalid attempt to destructure non-iterable instance");\n      }\n    };\n  })();\n'),helpers.slicedToArrayLoose=(0,_babelTemplate2["default"])('\n  (function (arr, i) {\n    if (Array.isArray(arr)) {\n      return arr;\n    } else if (Symbol.iterator in Object(arr)) {\n      var _arr = [];\n      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {\n        _arr.push(_step.value);\n        if (i && _arr.length === i) break;\n      }\n      return _arr;\n    } else {\n      throw new TypeError("Invalid attempt to destructure non-iterable instance");\n    }\n  });\n'),helpers.taggedTemplateLiteral=(0,_babelTemplate2["default"])("\n  (function (strings, raw) {\n    return Object.freeze(Object.defineProperties(strings, {\n        raw: { value: Object.freeze(raw) }\n    }));\n  });\n"),helpers.taggedTemplateLiteralLoose=(0,_babelTemplate2["default"])("\n  (function (strings, raw) {\n    strings.raw = raw;\n    return strings;\n  });\n"),helpers.temporalRef=(0,_babelTemplate2["default"])('\n  (function (val, name, undef) {\n    if (val === undef) {\n      throw new ReferenceError(name + " is not defined - temporal dead zone");\n    } else {\n      return val;\n    }\n  })\n'),helpers.temporalUndefined=(0,_babelTemplate2["default"])("\n  ({})\n"),helpers.toArray=(0,_babelTemplate2["default"])("\n  (function (arr) {\n    return Array.isArray(arr) ? arr : Array.from(arr);\n  });\n"),helpers.toConsumableArray=(0,_babelTemplate2["default"])("\n  (function (arr) {\n    if (Array.isArray(arr)) {\n      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];\n      return arr2;\n    } else {\n      return Array.from(arr);\n    }\n  });\n"),module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-template/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function useTemplate(e,r){e=(0,_cloneDeep2["default"])(e);var t=e,a=t.program;return r.length&&(0,_babelTraverse2["default"])(e,templateVisitor,null,r),a.body.length>1?a.body:a.body[0]}exports.__esModule=!0;var _symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol);exports["default"]=function(e,r){var t=void 0;try{throw new Error}catch(a){a.stack&&(t=a.stack.split("\n").slice(1).join("\n"))}r=(0,_assign2["default"])({allowReturnOutsideFunction:!0,allowSuperOutsideMethod:!0,preserveComments:!1},r);var n=function(){var a=void 0;try{a=babylon.parse(e,r),a=_babelTraverse2["default"].removeProperties(a,{preserveComments:r.preserveComments}),_babelTraverse2["default"].cheap(a,function(e){e[FROM_TEMPLATE]=!0})}catch(o){throw o.stack=o.stack+"from\n"+t,o}return n=function(){return a},a};return function(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return useTemplate(n(),r)}};var _cloneDeep=__webpack_require__("./node_modules/lodash/cloneDeep.js"),_cloneDeep2=_interopRequireDefault(_cloneDeep),_assign=__webpack_require__("./node_modules/lodash/assign.js"),_assign2=_interopRequireDefault(_assign),_has=__webpack_require__("./node_modules/lodash/has.js"),_has2=_interopRequireDefault(_has),_babelTraverse=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_babelTraverse2=_interopRequireDefault(_babelTraverse),_babylon=__webpack_require__("./node_modules/babylon/lib/index.js"),babylon=_interopRequireWildcard(_babylon),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),FROM_TEMPLATE="_fromTemplate",TEMPLATE_SKIP=(0,_symbol2["default"])(),templateVisitor={noScope:!0,enter:function(e,r){var a=e.node;if(a[TEMPLATE_SKIP])return e.skip();t.isExpressionStatement(a)&&(a=a.expression);var n=void 0;if(t.isIdentifier(a)&&a[FROM_TEMPLATE])if((0,_has2["default"])(r[0],a.name))n=r[0][a.name];else if("$"===a.name[0]){var o=+a.name.slice(1);r[o]&&(n=r[o])}null===n&&e.remove(),n&&(n[TEMPLATE_SKIP]=!0,e.replaceInline(n))},exit:function(e){var r=e.node;r.loc||_babelTraverse2["default"].clearNode(r)}};module.exports=exports["default"];

/***/ },

/***/ "./node_modules/lodash/cloneDeep.js":
/***/ function(module, exports, __webpack_require__) {

	function cloneDeep(e){return baseClone(e,!0,!0)}var baseClone=__webpack_require__("./node_modules/lodash/_baseClone.js");module.exports=cloneDeep;

/***/ },

/***/ "./node_modules/lodash/_baseClone.js":
/***/ function(module, exports, __webpack_require__) {

	function baseClone(e,a,r,g,t,n,o){var l;if(g&&(l=n?g(e,t,n,o):g(e)),void 0!==l)return l;if(!isObject(e))return e;var i=isArray(e);if(i){if(l=initCloneArray(e),!a)return copyArray(e,l)}else{var T=getTag(e),c=T==funcTag||T==genTag;if(isBuffer(e))return cloneBuffer(e,a);if(T==objectTag||T==argsTag||c&&!n){if(l=initCloneObject(c?{}:e),!a)return copySymbols(e,baseAssign(l,e))}else{if(!cloneableTags[T])return n?e:{};l=initCloneByTag(e,T,baseClone,a)}}o||(o=new Stack);var b=o.get(e);if(b)return b;o.set(e,l);var s=i?void 0:(r?getAllKeys:keys)(e);return arrayEach(s||e,function(t,n){s&&(n=t,t=e[n]),assignValue(l,n,baseClone(t,a,r,g,n,e,o))}),l}var Stack=__webpack_require__("./node_modules/lodash/_Stack.js"),arrayEach=__webpack_require__("./node_modules/lodash/_arrayEach.js"),assignValue=__webpack_require__("./node_modules/lodash/_assignValue.js"),baseAssign=__webpack_require__("./node_modules/lodash/_baseAssign.js"),cloneBuffer=__webpack_require__("./node_modules/lodash/_cloneBuffer.js"),copyArray=__webpack_require__("./node_modules/lodash/_copyArray.js"),copySymbols=__webpack_require__("./node_modules/lodash/_copySymbols.js"),getAllKeys=__webpack_require__("./node_modules/lodash/_getAllKeys.js"),getTag=__webpack_require__("./node_modules/lodash/_getTag.js"),initCloneArray=__webpack_require__("./node_modules/lodash/_initCloneArray.js"),initCloneByTag=__webpack_require__("./node_modules/lodash/_initCloneByTag.js"),initCloneObject=__webpack_require__("./node_modules/lodash/_initCloneObject.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js"),isBuffer=__webpack_require__("./node_modules/lodash/isBuffer.js"),isObject=__webpack_require__("./node_modules/lodash/isObject.js"),keys=__webpack_require__("./node_modules/lodash/keys.js"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",genTag="[object GeneratorFunction]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",cloneableTags={};cloneableTags[argsTag]=cloneableTags[arrayTag]=cloneableTags[arrayBufferTag]=cloneableTags[dataViewTag]=cloneableTags[boolTag]=cloneableTags[dateTag]=cloneableTags[float32Tag]=cloneableTags[float64Tag]=cloneableTags[int8Tag]=cloneableTags[int16Tag]=cloneableTags[int32Tag]=cloneableTags[mapTag]=cloneableTags[numberTag]=cloneableTags[objectTag]=cloneableTags[regexpTag]=cloneableTags[setTag]=cloneableTags[stringTag]=cloneableTags[symbolTag]=cloneableTags[uint8Tag]=cloneableTags[uint8ClampedTag]=cloneableTags[uint16Tag]=cloneableTags[uint32Tag]=!0,cloneableTags[errorTag]=cloneableTags[funcTag]=cloneableTags[weakMapTag]=!1,module.exports=baseClone;

/***/ },

/***/ "./node_modules/lodash/_Stack.js":
/***/ function(module, exports, __webpack_require__) {

	function Stack(t){var e=this.__data__=new ListCache(t);this.size=e.size}var ListCache=__webpack_require__("./node_modules/lodash/_ListCache.js"),stackClear=__webpack_require__("./node_modules/lodash/_stackClear.js"),stackDelete=__webpack_require__("./node_modules/lodash/_stackDelete.js"),stackGet=__webpack_require__("./node_modules/lodash/_stackGet.js"),stackHas=__webpack_require__("./node_modules/lodash/_stackHas.js"),stackSet=__webpack_require__("./node_modules/lodash/_stackSet.js");Stack.prototype.clear=stackClear,Stack.prototype["delete"]=stackDelete,Stack.prototype.get=stackGet,Stack.prototype.has=stackHas,Stack.prototype.set=stackSet,module.exports=Stack;

/***/ },

/***/ "./node_modules/lodash/_ListCache.js":
/***/ function(module, exports, __webpack_require__) {

	function ListCache(e){var t=-1,a=e?e.length:0;for(this.clear();++t<a;){var s=e[t];this.set(s[0],s[1])}}var listCacheClear=__webpack_require__("./node_modules/lodash/_listCacheClear.js"),listCacheDelete=__webpack_require__("./node_modules/lodash/_listCacheDelete.js"),listCacheGet=__webpack_require__("./node_modules/lodash/_listCacheGet.js"),listCacheHas=__webpack_require__("./node_modules/lodash/_listCacheHas.js"),listCacheSet=__webpack_require__("./node_modules/lodash/_listCacheSet.js");ListCache.prototype.clear=listCacheClear,ListCache.prototype["delete"]=listCacheDelete,ListCache.prototype.get=listCacheGet,ListCache.prototype.has=listCacheHas,ListCache.prototype.set=listCacheSet,module.exports=ListCache;

/***/ },

/***/ "./node_modules/lodash/_listCacheClear.js":
/***/ function(module, exports) {

	function listCacheClear(){this.__data__=[],this.size=0}module.exports=listCacheClear;

/***/ },

/***/ "./node_modules/lodash/_listCacheDelete.js":
/***/ function(module, exports, __webpack_require__) {

	function listCacheDelete(e){var r=this.__data__,a=assocIndexOf(r,e);if(a<0)return!1;var t=r.length-1;return a==t?r.pop():splice.call(r,a,1),--this.size,!0}var assocIndexOf=__webpack_require__("./node_modules/lodash/_assocIndexOf.js"),arrayProto=Array.prototype,splice=arrayProto.splice;module.exports=listCacheDelete;

/***/ },

/***/ "./node_modules/lodash/_assocIndexOf.js":
/***/ function(module, exports, __webpack_require__) {

	function assocIndexOf(e,r){for(var n=e.length;n--;)if(eq(e[n][0],r))return n;return-1}var eq=__webpack_require__("./node_modules/lodash/eq.js");module.exports=assocIndexOf;

/***/ },

/***/ "./node_modules/lodash/eq.js":
/***/ function(module, exports) {

	function eq(e,n){return e===n||e!==e&&n!==n}module.exports=eq;

/***/ },

/***/ "./node_modules/lodash/_listCacheGet.js":
/***/ function(module, exports, __webpack_require__) {

	function listCacheGet(e){var s=this.__data__,a=assocIndexOf(s,e);return a<0?void 0:s[a][1]}var assocIndexOf=__webpack_require__("./node_modules/lodash/_assocIndexOf.js");module.exports=listCacheGet;

/***/ },

/***/ "./node_modules/lodash/_listCacheHas.js":
/***/ function(module, exports, __webpack_require__) {

	function listCacheHas(s){return assocIndexOf(this.__data__,s)>-1}var assocIndexOf=__webpack_require__("./node_modules/lodash/_assocIndexOf.js");module.exports=listCacheHas;

/***/ },

/***/ "./node_modules/lodash/_listCacheSet.js":
/***/ function(module, exports, __webpack_require__) {

	function listCacheSet(s,e){var t=this.__data__,a=assocIndexOf(t,s);return a<0?(++this.size,t.push([s,e])):t[a][1]=e,this}var assocIndexOf=__webpack_require__("./node_modules/lodash/_assocIndexOf.js");module.exports=listCacheSet;

/***/ },

/***/ "./node_modules/lodash/_stackClear.js":
/***/ function(module, exports, __webpack_require__) {

	function stackClear(){this.__data__=new ListCache,this.size=0}var ListCache=__webpack_require__("./node_modules/lodash/_ListCache.js");module.exports=stackClear;

/***/ },

/***/ "./node_modules/lodash/_stackDelete.js":
/***/ function(module, exports) {

	function stackDelete(e){var t=this.__data__,s=t["delete"](e);return this.size=t.size,s}module.exports=stackDelete;

/***/ },

/***/ "./node_modules/lodash/_stackGet.js":
/***/ function(module, exports) {

	function stackGet(t){return this.__data__.get(t)}module.exports=stackGet;

/***/ },

/***/ "./node_modules/lodash/_stackHas.js":
/***/ function(module, exports) {

	function stackHas(a){return this.__data__.has(a)}module.exports=stackHas;

/***/ },

/***/ "./node_modules/lodash/_stackSet.js":
/***/ function(module, exports, __webpack_require__) {

	function stackSet(e,a){var t=this.__data__;if(t instanceof ListCache){var i=t.__data__;if(!Map||i.length<LARGE_ARRAY_SIZE-1)return i.push([e,a]),this.size=++t.size,this;t=this.__data__=new MapCache(i)}return t.set(e,a),this.size=t.size,this}var ListCache=__webpack_require__("./node_modules/lodash/_ListCache.js"),Map=__webpack_require__("./node_modules/lodash/_Map.js"),MapCache=__webpack_require__("./node_modules/lodash/_MapCache.js"),LARGE_ARRAY_SIZE=200;module.exports=stackSet;

/***/ },

/***/ "./node_modules/lodash/_Map.js":
/***/ function(module, exports, __webpack_require__) {

	var getNative=__webpack_require__("./node_modules/lodash/_getNative.js"),root=__webpack_require__("./node_modules/lodash/_root.js"),Map=getNative(root,"Map");module.exports=Map;

/***/ },

/***/ "./node_modules/lodash/_getNative.js":
/***/ function(module, exports, __webpack_require__) {

	function getNative(e,a){var t=getValue(e,a);return baseIsNative(t)?t:void 0}var baseIsNative=__webpack_require__("./node_modules/lodash/_baseIsNative.js"),getValue=__webpack_require__("./node_modules/lodash/_getValue.js");module.exports=getNative;

/***/ },

/***/ "./node_modules/lodash/_baseIsNative.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIsNative(e){if(!isObject(e)||isMasked(e))return!1;var r=isFunction(e)?reIsNative:reIsHostCtor;return r.test(toSource(e))}var isFunction=__webpack_require__("./node_modules/lodash/isFunction.js"),isMasked=__webpack_require__("./node_modules/lodash/_isMasked.js"),isObject=__webpack_require__("./node_modules/lodash/isObject.js"),toSource=__webpack_require__("./node_modules/lodash/_toSource.js"),reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reIsHostCtor=/^\[object .+?Constructor\]$/,funcProto=Function.prototype,objectProto=Object.prototype,funcToString=funcProto.toString,hasOwnProperty=objectProto.hasOwnProperty,reIsNative=RegExp("^"+funcToString.call(hasOwnProperty).replace(reRegExpChar,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");module.exports=baseIsNative;

/***/ },

/***/ "./node_modules/lodash/isFunction.js":
/***/ function(module, exports, __webpack_require__) {

	function isFunction(o){var t=isObject(o)?objectToString.call(o):"";return t==funcTag||t==genTag||t==proxyTag}var isObject=__webpack_require__("./node_modules/lodash/isObject.js"),funcTag="[object Function]",genTag="[object GeneratorFunction]",proxyTag="[object Proxy]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isFunction;

/***/ },

/***/ "./node_modules/lodash/isObject.js":
/***/ function(module, exports) {

	function isObject(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}module.exports=isObject;

/***/ },

/***/ "./node_modules/lodash/_isMasked.js":
/***/ function(module, exports, __webpack_require__) {

	function isMasked(e){return!!maskSrcKey&&maskSrcKey in e}var coreJsData=__webpack_require__("./node_modules/lodash/_coreJsData.js"),maskSrcKey=function(){var e=/[^.]+$/.exec(coreJsData&&coreJsData.keys&&coreJsData.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}();module.exports=isMasked;

/***/ },

/***/ "./node_modules/lodash/_coreJsData.js":
/***/ function(module, exports, __webpack_require__) {

	var root=__webpack_require__("./node_modules/lodash/_root.js"),coreJsData=root["__core-js_shared__"];module.exports=coreJsData;

/***/ },

/***/ "./node_modules/lodash/_root.js":
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal=__webpack_require__("./node_modules/lodash/_freeGlobal.js"),freeSelf="object"==typeof self&&self&&self.Object===Object&&self,root=freeGlobal||freeSelf||Function("return this")();module.exports=root;

/***/ },

/***/ "./node_modules/lodash/_freeGlobal.js":
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var freeGlobal="object"==typeof global&&global&&global.Object===Object&&global;module.exports=freeGlobal;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/lodash/_toSource.js":
/***/ function(module, exports) {

	function toSource(t){if(null!=t){try{return funcToString.call(t)}catch(r){}try{return t+""}catch(r){}}return""}var funcProto=Function.prototype,funcToString=funcProto.toString;module.exports=toSource;

/***/ },

/***/ "./node_modules/lodash/_getValue.js":
/***/ function(module, exports) {

	function getValue(e,u){return null==e?void 0:e[u]}module.exports=getValue;

/***/ },

/***/ "./node_modules/lodash/_MapCache.js":
/***/ function(module, exports, __webpack_require__) {

	function MapCache(e){var a=-1,p=e?e.length:0;for(this.clear();++a<p;){var t=e[a];this.set(t[0],t[1])}}var mapCacheClear=__webpack_require__("./node_modules/lodash/_mapCacheClear.js"),mapCacheDelete=__webpack_require__("./node_modules/lodash/_mapCacheDelete.js"),mapCacheGet=__webpack_require__("./node_modules/lodash/_mapCacheGet.js"),mapCacheHas=__webpack_require__("./node_modules/lodash/_mapCacheHas.js"),mapCacheSet=__webpack_require__("./node_modules/lodash/_mapCacheSet.js");MapCache.prototype.clear=mapCacheClear,MapCache.prototype["delete"]=mapCacheDelete,MapCache.prototype.get=mapCacheGet,MapCache.prototype.has=mapCacheHas,MapCache.prototype.set=mapCacheSet,module.exports=MapCache;

/***/ },

/***/ "./node_modules/lodash/_mapCacheClear.js":
/***/ function(module, exports, __webpack_require__) {

	function mapCacheClear(){this.size=0,this.__data__={hash:new Hash,map:new(Map||ListCache),string:new Hash}}var Hash=__webpack_require__("./node_modules/lodash/_Hash.js"),ListCache=__webpack_require__("./node_modules/lodash/_ListCache.js"),Map=__webpack_require__("./node_modules/lodash/_Map.js");module.exports=mapCacheClear;

/***/ },

/***/ "./node_modules/lodash/_Hash.js":
/***/ function(module, exports, __webpack_require__) {

	function Hash(e){var h=-1,a=e?e.length:0;for(this.clear();++h<a;){var s=e[h];this.set(s[0],s[1])}}var hashClear=__webpack_require__("./node_modules/lodash/_hashClear.js"),hashDelete=__webpack_require__("./node_modules/lodash/_hashDelete.js"),hashGet=__webpack_require__("./node_modules/lodash/_hashGet.js"),hashHas=__webpack_require__("./node_modules/lodash/_hashHas.js"),hashSet=__webpack_require__("./node_modules/lodash/_hashSet.js");Hash.prototype.clear=hashClear,Hash.prototype["delete"]=hashDelete,Hash.prototype.get=hashGet,Hash.prototype.has=hashHas,Hash.prototype.set=hashSet,module.exports=Hash;

/***/ },

/***/ "./node_modules/lodash/_hashClear.js":
/***/ function(module, exports, __webpack_require__) {

	function hashClear(){this.__data__=nativeCreate?nativeCreate(null):{},this.size=0}var nativeCreate=__webpack_require__("./node_modules/lodash/_nativeCreate.js");module.exports=hashClear;

/***/ },

/***/ "./node_modules/lodash/_nativeCreate.js":
/***/ function(module, exports, __webpack_require__) {

	var getNative=__webpack_require__("./node_modules/lodash/_getNative.js"),nativeCreate=getNative(Object,"create");module.exports=nativeCreate;

/***/ },

/***/ "./node_modules/lodash/_hashDelete.js":
/***/ function(module, exports) {

	function hashDelete(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}module.exports=hashDelete;

/***/ },

/***/ "./node_modules/lodash/_hashGet.js":
/***/ function(module, exports, __webpack_require__) {

	function hashGet(e){var t=this.__data__;if(nativeCreate){var r=t[e];return r===HASH_UNDEFINED?void 0:r}return hasOwnProperty.call(t,e)?t[e]:void 0}var nativeCreate=__webpack_require__("./node_modules/lodash/_nativeCreate.js"),HASH_UNDEFINED="__lodash_hash_undefined__",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=hashGet;

/***/ },

/***/ "./node_modules/lodash/_hashHas.js":
/***/ function(module, exports, __webpack_require__) {

	function hashHas(e){var t=this.__data__;return nativeCreate?void 0!==t[e]:hasOwnProperty.call(t,e)}var nativeCreate=__webpack_require__("./node_modules/lodash/_nativeCreate.js"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=hashHas;

/***/ },

/***/ "./node_modules/lodash/_hashSet.js":
/***/ function(module, exports, __webpack_require__) {

	function hashSet(e,t){var a=this.__data__;return this.size+=this.has(e)?0:1,a[e]=nativeCreate&&void 0===t?HASH_UNDEFINED:t,this}var nativeCreate=__webpack_require__("./node_modules/lodash/_nativeCreate.js"),HASH_UNDEFINED="__lodash_hash_undefined__";module.exports=hashSet;

/***/ },

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/***/ function(module, exports, __webpack_require__) {

	function mapCacheDelete(e){var a=getMapData(this,e)["delete"](e);return this.size-=a?1:0,a}var getMapData=__webpack_require__("./node_modules/lodash/_getMapData.js");module.exports=mapCacheDelete;

/***/ },

/***/ "./node_modules/lodash/_getMapData.js":
/***/ function(module, exports, __webpack_require__) {

	function getMapData(a,e){var t=a.__data__;return isKeyable(e)?t["string"==typeof e?"string":"hash"]:t.map}var isKeyable=__webpack_require__("./node_modules/lodash/_isKeyable.js");module.exports=getMapData;

/***/ },

/***/ "./node_modules/lodash/_isKeyable.js":
/***/ function(module, exports) {

	function isKeyable(e){var o=typeof e;return"string"==o||"number"==o||"symbol"==o||"boolean"==o?"__proto__"!==e:null===e}module.exports=isKeyable;

/***/ },

/***/ "./node_modules/lodash/_mapCacheGet.js":
/***/ function(module, exports, __webpack_require__) {

	function mapCacheGet(a){return getMapData(this,a).get(a)}var getMapData=__webpack_require__("./node_modules/lodash/_getMapData.js");module.exports=mapCacheGet;

/***/ },

/***/ "./node_modules/lodash/_mapCacheHas.js":
/***/ function(module, exports, __webpack_require__) {

	function mapCacheHas(a){return getMapData(this,a).has(a)}var getMapData=__webpack_require__("./node_modules/lodash/_getMapData.js");module.exports=mapCacheHas;

/***/ },

/***/ "./node_modules/lodash/_mapCacheSet.js":
/***/ function(module, exports, __webpack_require__) {

	function mapCacheSet(e,a){var t=getMapData(this,e),i=t.size;return t.set(e,a),this.size+=t.size==i?0:1,this}var getMapData=__webpack_require__("./node_modules/lodash/_getMapData.js");module.exports=mapCacheSet;

/***/ },

/***/ "./node_modules/lodash/_arrayEach.js":
/***/ function(module, exports) {

	function arrayEach(r,a){for(var e=-1,n=r?r.length:0;++e<n&&a(r[e],e,r)!==!1;);return r}module.exports=arrayEach;

/***/ },

/***/ "./node_modules/lodash/_assignValue.js":
/***/ function(module, exports, __webpack_require__) {

	function assignValue(e,s,a){var r=e[s];hasOwnProperty.call(e,s)&&eq(r,a)&&(void 0!==a||s in e)||baseAssignValue(e,s,a)}var baseAssignValue=__webpack_require__("./node_modules/lodash/_baseAssignValue.js"),eq=__webpack_require__("./node_modules/lodash/eq.js"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=assignValue;

/***/ },

/***/ "./node_modules/lodash/_baseAssignValue.js":
/***/ function(module, exports, __webpack_require__) {

	function baseAssignValue(e,r,i){"__proto__"==r&&defineProperty?defineProperty(e,r,{configurable:!0,enumerable:!0,value:i,writable:!0}):e[r]=i}var defineProperty=__webpack_require__("./node_modules/lodash/_defineProperty.js");module.exports=baseAssignValue;

/***/ },

/***/ "./node_modules/lodash/_defineProperty.js":
/***/ function(module, exports, __webpack_require__) {

	var getNative=__webpack_require__("./node_modules/lodash/_getNative.js"),defineProperty=function(){try{var e=getNative(Object,"defineProperty");return e({},"",{}),e}catch(t){}}();module.exports=defineProperty;

/***/ },

/***/ "./node_modules/lodash/_baseAssign.js":
/***/ function(module, exports, __webpack_require__) {

	function baseAssign(e,s){return e&&copyObject(s,keys(s),e)}var copyObject=__webpack_require__("./node_modules/lodash/_copyObject.js"),keys=__webpack_require__("./node_modules/lodash/keys.js");module.exports=baseAssign;

/***/ },

/***/ "./node_modules/lodash/_copyObject.js":
/***/ function(module, exports, __webpack_require__) {

	function copyObject(e,a,s,r){var i=!s;s||(s={});for(var u=-1,n=a.length;++u<n;){var l=a[u],o=r?r(s[l],e[l],l,s,e):void 0;void 0===o&&(o=e[l]),i?baseAssignValue(s,l,o):assignValue(s,l,o)}return s}var assignValue=__webpack_require__("./node_modules/lodash/_assignValue.js"),baseAssignValue=__webpack_require__("./node_modules/lodash/_baseAssignValue.js");module.exports=copyObject;

/***/ },

/***/ "./node_modules/lodash/keys.js":
/***/ function(module, exports, __webpack_require__) {

	function keys(e){return isArrayLike(e)?arrayLikeKeys(e):baseKeys(e)}var arrayLikeKeys=__webpack_require__("./node_modules/lodash/_arrayLikeKeys.js"),baseKeys=__webpack_require__("./node_modules/lodash/_baseKeys.js"),isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js");module.exports=keys;

/***/ },

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/***/ function(module, exports, __webpack_require__) {

	function arrayLikeKeys(e,r){var s=isArray(e),i=!s&&isArguments(e),t=!s&&!i&&isBuffer(e),a=!s&&!i&&!t&&isTypedArray(e),n=s||i||t||a,y=n?baseTimes(e.length,String):[],u=y.length;for(var o in e)!r&&!hasOwnProperty.call(e,o)||n&&("length"==o||t&&("offset"==o||"parent"==o)||a&&("buffer"==o||"byteLength"==o||"byteOffset"==o)||isIndex(o,u))||y.push(o);return y}var baseTimes=__webpack_require__("./node_modules/lodash/_baseTimes.js"),isArguments=__webpack_require__("./node_modules/lodash/isArguments.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js"),isBuffer=__webpack_require__("./node_modules/lodash/isBuffer.js"),isIndex=__webpack_require__("./node_modules/lodash/_isIndex.js"),isTypedArray=__webpack_require__("./node_modules/lodash/isTypedArray.js"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=arrayLikeKeys;

/***/ },

/***/ "./node_modules/lodash/_baseTimes.js":
/***/ function(module, exports) {

	function baseTimes(e,r){for(var s=-1,a=Array(e);++s<e;)a[s]=r(s);return a}module.exports=baseTimes;

/***/ },

/***/ "./node_modules/lodash/isArguments.js":
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments=__webpack_require__("./node_modules/lodash/_baseIsArguments.js"),isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,propertyIsEnumerable=objectProto.propertyIsEnumerable,isArguments=baseIsArguments(function(){return arguments}())?baseIsArguments:function(e){return isObjectLike(e)&&hasOwnProperty.call(e,"callee")&&!propertyIsEnumerable.call(e,"callee")};module.exports=isArguments;

/***/ },

/***/ "./node_modules/lodash/_baseIsArguments.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIsArguments(e){return isObjectLike(e)&&objectToString.call(e)==argsTag}var isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js"),argsTag="[object Arguments]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=baseIsArguments;

/***/ },

/***/ "./node_modules/lodash/isArray.js":
/***/ function(module, exports) {

	var isArray=Array.isArray;module.exports=isArray;

/***/ },

/***/ "./node_modules/lodash/isBuffer.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root=__webpack_require__("./node_modules/lodash/_root.js"),stubFalse=__webpack_require__("./node_modules/lodash/stubFalse.js"),freeExports="object"==typeof exports&&exports&&!exports.nodeType&&exports,freeModule=freeExports&&"object"==typeof module&&module&&!module.nodeType&&module,moduleExports=freeModule&&freeModule.exports===freeExports,Buffer=moduleExports?root.Buffer:void 0,nativeIsBuffer=Buffer?Buffer.isBuffer:void 0,isBuffer=nativeIsBuffer||stubFalse;module.exports=isBuffer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ },

/***/ "./node_modules/lodash/stubFalse.js":
/***/ function(module, exports) {

	function stubFalse(){return!1}module.exports=stubFalse;

/***/ },

/***/ "./node_modules/lodash/_isIndex.js":
/***/ function(module, exports) {

	function isIndex(e,n){return n=null==n?MAX_SAFE_INTEGER:n,!!n&&("number"==typeof e||reIsUint.test(e))&&e>-1&&e%1==0&&e<n}var MAX_SAFE_INTEGER=9007199254740991,reIsUint=/^(?:0|[1-9]\d*)$/;module.exports=isIndex;

/***/ },

/***/ "./node_modules/lodash/isTypedArray.js":
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray=__webpack_require__("./node_modules/lodash/_baseIsTypedArray.js"),baseUnary=__webpack_require__("./node_modules/lodash/_baseUnary.js"),nodeUtil=__webpack_require__("./node_modules/lodash/_nodeUtil.js"),nodeIsTypedArray=nodeUtil&&nodeUtil.isTypedArray,isTypedArray=nodeIsTypedArray?baseUnary(nodeIsTypedArray):baseIsTypedArray;module.exports=isTypedArray;

/***/ },

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIsTypedArray(a){return isObjectLike(a)&&isLength(a.length)&&!!typedArrayTags[objectToString.call(a)]}var isLength=__webpack_require__("./node_modules/lodash/isLength.js"),isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js"),argsTag="[object Arguments]",arrayTag="[object Array]",boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",funcTag="[object Function]",mapTag="[object Map]",numberTag="[object Number]",objectTag="[object Object]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",weakMapTag="[object WeakMap]",arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]",typedArrayTags={};typedArrayTags[float32Tag]=typedArrayTags[float64Tag]=typedArrayTags[int8Tag]=typedArrayTags[int16Tag]=typedArrayTags[int32Tag]=typedArrayTags[uint8Tag]=typedArrayTags[uint8ClampedTag]=typedArrayTags[uint16Tag]=typedArrayTags[uint32Tag]=!0,typedArrayTags[argsTag]=typedArrayTags[arrayTag]=typedArrayTags[arrayBufferTag]=typedArrayTags[boolTag]=typedArrayTags[dataViewTag]=typedArrayTags[dateTag]=typedArrayTags[errorTag]=typedArrayTags[funcTag]=typedArrayTags[mapTag]=typedArrayTags[numberTag]=typedArrayTags[objectTag]=typedArrayTags[regexpTag]=typedArrayTags[setTag]=typedArrayTags[stringTag]=typedArrayTags[weakMapTag]=!1;var objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=baseIsTypedArray;

/***/ },

/***/ "./node_modules/lodash/isLength.js":
/***/ function(module, exports) {

	function isLength(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=MAX_SAFE_INTEGER}var MAX_SAFE_INTEGER=9007199254740991;module.exports=isLength;

/***/ },

/***/ "./node_modules/lodash/_baseUnary.js":
/***/ function(module, exports) {

	function baseUnary(n){return function(r){return n(r)}}module.exports=baseUnary;

/***/ },

/***/ "./node_modules/lodash/_nodeUtil.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal=__webpack_require__("./node_modules/lodash/_freeGlobal.js"),freeExports="object"==typeof exports&&exports&&!exports.nodeType&&exports,freeModule=freeExports&&"object"==typeof module&&module&&!module.nodeType&&module,moduleExports=freeModule&&freeModule.exports===freeExports,freeProcess=moduleExports&&freeGlobal.process,nodeUtil=function(){try{return freeProcess&&freeProcess.binding("util")}catch(e){}}();module.exports=nodeUtil;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ },

/***/ "./node_modules/lodash/_baseKeys.js":
/***/ function(module, exports, __webpack_require__) {

	function baseKeys(e){if(!isPrototype(e))return nativeKeys(e);var r=[];for(var t in Object(e))hasOwnProperty.call(e,t)&&"constructor"!=t&&r.push(t);return r}var isPrototype=__webpack_require__("./node_modules/lodash/_isPrototype.js"),nativeKeys=__webpack_require__("./node_modules/lodash/_nativeKeys.js"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=baseKeys;

/***/ },

/***/ "./node_modules/lodash/_isPrototype.js":
/***/ function(module, exports) {

	function isPrototype(o){var t=o&&o.constructor,r="function"==typeof t&&t.prototype||objectProto;return o===r}var objectProto=Object.prototype;module.exports=isPrototype;

/***/ },

/***/ "./node_modules/lodash/_nativeKeys.js":
/***/ function(module, exports, __webpack_require__) {

	var overArg=__webpack_require__("./node_modules/lodash/_overArg.js"),nativeKeys=overArg(Object.keys,Object);module.exports=nativeKeys;

/***/ },

/***/ "./node_modules/lodash/isArrayLike.js":
/***/ function(module, exports, __webpack_require__) {

	function isArrayLike(i){return null!=i&&isLength(i.length)&&!isFunction(i)}var isFunction=__webpack_require__("./node_modules/lodash/isFunction.js"),isLength=__webpack_require__("./node_modules/lodash/isLength.js");module.exports=isArrayLike;

/***/ },

/***/ "./node_modules/lodash/_cloneBuffer.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {function cloneBuffer(e,o){if(o)return e.slice();var r=e.length,f=allocUnsafe?allocUnsafe(r):new e.constructor(r);return e.copy(f),f}var root=__webpack_require__("./node_modules/lodash/_root.js"),freeExports="object"==typeof exports&&exports&&!exports.nodeType&&exports,freeModule=freeExports&&"object"==typeof module&&module&&!module.nodeType&&module,moduleExports=freeModule&&freeModule.exports===freeExports,Buffer=moduleExports?root.Buffer:void 0,allocUnsafe=Buffer?Buffer.allocUnsafe:void 0;module.exports=cloneBuffer;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ },

/***/ "./node_modules/lodash/_copyArray.js":
/***/ function(module, exports) {

	function copyArray(r,o){var y=-1,a=r.length;for(o||(o=Array(a));++y<a;)o[y]=r[y];return o}module.exports=copyArray;

/***/ },

/***/ "./node_modules/lodash/_copySymbols.js":
/***/ function(module, exports, __webpack_require__) {

	function copySymbols(e,o){return copyObject(e,getSymbols(e),o)}var copyObject=__webpack_require__("./node_modules/lodash/_copyObject.js"),getSymbols=__webpack_require__("./node_modules/lodash/_getSymbols.js");module.exports=copySymbols;

/***/ },

/***/ "./node_modules/lodash/_getSymbols.js":
/***/ function(module, exports, __webpack_require__) {

	var overArg=__webpack_require__("./node_modules/lodash/_overArg.js"),stubArray=__webpack_require__("./node_modules/lodash/stubArray.js"),nativeGetSymbols=Object.getOwnPropertySymbols,getSymbols=nativeGetSymbols?overArg(nativeGetSymbols,Object):stubArray;module.exports=getSymbols;

/***/ },

/***/ "./node_modules/lodash/stubArray.js":
/***/ function(module, exports) {

	function stubArray(){return[]}module.exports=stubArray;

/***/ },

/***/ "./node_modules/lodash/_getAllKeys.js":
/***/ function(module, exports, __webpack_require__) {

	function getAllKeys(e){return baseGetAllKeys(e,keys,getSymbols)}var baseGetAllKeys=__webpack_require__("./node_modules/lodash/_baseGetAllKeys.js"),getSymbols=__webpack_require__("./node_modules/lodash/_getSymbols.js"),keys=__webpack_require__("./node_modules/lodash/keys.js");module.exports=getAllKeys;

/***/ },

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/***/ function(module, exports, __webpack_require__) {

	function baseGetAllKeys(r,a,e){var s=a(r);return isArray(r)?s:arrayPush(s,e(r))}var arrayPush=__webpack_require__("./node_modules/lodash/_arrayPush.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js");module.exports=baseGetAllKeys;

/***/ },

/***/ "./node_modules/lodash/_arrayPush.js":
/***/ function(module, exports) {

	function arrayPush(r,a){for(var e=-1,n=a.length,t=r.length;++e<n;)r[t+e]=a[e];return r}module.exports=arrayPush;

/***/ },

/***/ "./node_modules/lodash/_getTag.js":
/***/ function(module, exports, __webpack_require__) {

	var DataView=__webpack_require__("./node_modules/lodash/_DataView.js"),Map=__webpack_require__("./node_modules/lodash/_Map.js"),Promise=__webpack_require__("./node_modules/lodash/_Promise.js"),Set=__webpack_require__("./node_modules/lodash/_Set.js"),WeakMap=__webpack_require__("./node_modules/lodash/_WeakMap.js"),baseGetTag=__webpack_require__("./node_modules/lodash/_baseGetTag.js"),toSource=__webpack_require__("./node_modules/lodash/_toSource.js"),mapTag="[object Map]",objectTag="[object Object]",promiseTag="[object Promise]",setTag="[object Set]",weakMapTag="[object WeakMap]",dataViewTag="[object DataView]",objectProto=Object.prototype,objectToString=objectProto.toString,dataViewCtorString=toSource(DataView),mapCtorString=toSource(Map),promiseCtorString=toSource(Promise),setCtorString=toSource(Set),weakMapCtorString=toSource(WeakMap),getTag=baseGetTag;(DataView&&getTag(new DataView(new ArrayBuffer(1)))!=dataViewTag||Map&&getTag(new Map)!=mapTag||Promise&&getTag(Promise.resolve())!=promiseTag||Set&&getTag(new Set)!=setTag||WeakMap&&getTag(new WeakMap)!=weakMapTag)&&(getTag=function(e){var a=objectToString.call(e),t=a==objectTag?e.constructor:void 0,r=t?toSource(t):void 0;if(r)switch(r){case dataViewCtorString:return dataViewTag;case mapCtorString:return mapTag;case promiseCtorString:return promiseTag;case setCtorString:return setTag;case weakMapCtorString:return weakMapTag}return a}),module.exports=getTag;

/***/ },

/***/ "./node_modules/lodash/_DataView.js":
/***/ function(module, exports, __webpack_require__) {

	var getNative=__webpack_require__("./node_modules/lodash/_getNative.js"),root=__webpack_require__("./node_modules/lodash/_root.js"),DataView=getNative(root,"DataView");module.exports=DataView;

/***/ },

/***/ "./node_modules/lodash/_Promise.js":
/***/ function(module, exports, __webpack_require__) {

	var getNative=__webpack_require__("./node_modules/lodash/_getNative.js"),root=__webpack_require__("./node_modules/lodash/_root.js"),Promise=getNative(root,"Promise");module.exports=Promise;

/***/ },

/***/ "./node_modules/lodash/_Set.js":
/***/ function(module, exports, __webpack_require__) {

	var getNative=__webpack_require__("./node_modules/lodash/_getNative.js"),root=__webpack_require__("./node_modules/lodash/_root.js"),Set=getNative(root,"Set");module.exports=Set;

/***/ },

/***/ "./node_modules/lodash/_WeakMap.js":
/***/ function(module, exports, __webpack_require__) {

	var getNative=__webpack_require__("./node_modules/lodash/_getNative.js"),root=__webpack_require__("./node_modules/lodash/_root.js"),WeakMap=getNative(root,"WeakMap");module.exports=WeakMap;

/***/ },

/***/ "./node_modules/lodash/_baseGetTag.js":
/***/ function(module, exports) {

	function baseGetTag(t){return objectToString.call(t)}var objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=baseGetTag;

/***/ },

/***/ "./node_modules/lodash/_initCloneArray.js":
/***/ function(module, exports) {

	function initCloneArray(t){var r=t.length,o=t.constructor(r);return r&&"string"==typeof t[0]&&hasOwnProperty.call(t,"index")&&(o.index=t.index,o.input=t.input),o}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=initCloneArray;

/***/ },

/***/ "./node_modules/lodash/_initCloneByTag.js":
/***/ function(module, exports, __webpack_require__) {

	function initCloneByTag(e,a,r,t){var n=e.constructor;switch(a){case arrayBufferTag:return cloneArrayBuffer(e);case boolTag:case dateTag:return new n((+e));case dataViewTag:return cloneDataView(e,t);case float32Tag:case float64Tag:case int8Tag:case int16Tag:case int32Tag:case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:return cloneTypedArray(e,t);case mapTag:return cloneMap(e,t,r);case numberTag:case stringTag:return new n(e);case regexpTag:return cloneRegExp(e);case setTag:return cloneSet(e,t,r);case symbolTag:return cloneSymbol(e)}}var cloneArrayBuffer=__webpack_require__("./node_modules/lodash/_cloneArrayBuffer.js"),cloneDataView=__webpack_require__("./node_modules/lodash/_cloneDataView.js"),cloneMap=__webpack_require__("./node_modules/lodash/_cloneMap.js"),cloneRegExp=__webpack_require__("./node_modules/lodash/_cloneRegExp.js"),cloneSet=__webpack_require__("./node_modules/lodash/_cloneSet.js"),cloneSymbol=__webpack_require__("./node_modules/lodash/_cloneSymbol.js"),cloneTypedArray=__webpack_require__("./node_modules/lodash/_cloneTypedArray.js"),boolTag="[object Boolean]",dateTag="[object Date]",mapTag="[object Map]",numberTag="[object Number]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]",arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",float32Tag="[object Float32Array]",float64Tag="[object Float64Array]",int8Tag="[object Int8Array]",int16Tag="[object Int16Array]",int32Tag="[object Int32Array]",uint8Tag="[object Uint8Array]",uint8ClampedTag="[object Uint8ClampedArray]",uint16Tag="[object Uint16Array]",uint32Tag="[object Uint32Array]";module.exports=initCloneByTag;

/***/ },

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/***/ function(module, exports, __webpack_require__) {

	function cloneArrayBuffer(r){var e=new r.constructor(r.byteLength);return new Uint8Array(e).set(new Uint8Array(r)),e}var Uint8Array=__webpack_require__("./node_modules/lodash/_Uint8Array.js");module.exports=cloneArrayBuffer;

/***/ },

/***/ "./node_modules/lodash/_Uint8Array.js":
/***/ function(module, exports, __webpack_require__) {

	var root=__webpack_require__("./node_modules/lodash/_root.js"),Uint8Array=root.Uint8Array;module.exports=Uint8Array;

/***/ },

/***/ "./node_modules/lodash/_cloneDataView.js":
/***/ function(module, exports, __webpack_require__) {

	function cloneDataView(e,r){var f=r?cloneArrayBuffer(e.buffer):e.buffer;return new e.constructor(f,e.byteOffset,e.byteLength)}var cloneArrayBuffer=__webpack_require__("./node_modules/lodash/_cloneArrayBuffer.js");module.exports=cloneDataView;

/***/ },

/***/ "./node_modules/lodash/_cloneMap.js":
/***/ function(module, exports, __webpack_require__) {

	function cloneMap(r,a,e){var o=a?e(mapToArray(r),!0):mapToArray(r);return arrayReduce(o,addMapEntry,new r.constructor)}var addMapEntry=__webpack_require__("./node_modules/lodash/_addMapEntry.js"),arrayReduce=__webpack_require__("./node_modules/lodash/_arrayReduce.js"),mapToArray=__webpack_require__("./node_modules/lodash/_mapToArray.js");module.exports=cloneMap;

/***/ },

/***/ "./node_modules/lodash/_addMapEntry.js":
/***/ function(module, exports) {

	function addMapEntry(t,d){return t.set(d[0],d[1]),t}module.exports=addMapEntry;

/***/ },

/***/ "./node_modules/lodash/_arrayReduce.js":
/***/ function(module, exports) {

	function arrayReduce(r,e,a,u){var n=-1,o=r?r.length:0;for(u&&o&&(a=r[++n]);++n<o;)a=e(a,r[n],n,r);return a}module.exports=arrayReduce;

/***/ },

/***/ "./node_modules/lodash/_mapToArray.js":
/***/ function(module, exports) {

	function mapToArray(r){var a=-1,o=Array(r.size);return r.forEach(function(r,n){o[++a]=[n,r]}),o}module.exports=mapToArray;

/***/ },

/***/ "./node_modules/lodash/_cloneRegExp.js":
/***/ function(module, exports) {

	function cloneRegExp(e){var r=new e.constructor(e.source,reFlags.exec(e));return r.lastIndex=e.lastIndex,r}var reFlags=/\w*$/;module.exports=cloneRegExp;

/***/ },

/***/ "./node_modules/lodash/_cloneSet.js":
/***/ function(module, exports, __webpack_require__) {

	function cloneSet(r,e,t){var a=e?t(setToArray(r),!0):setToArray(r);return arrayReduce(a,addSetEntry,new r.constructor)}var addSetEntry=__webpack_require__("./node_modules/lodash/_addSetEntry.js"),arrayReduce=__webpack_require__("./node_modules/lodash/_arrayReduce.js"),setToArray=__webpack_require__("./node_modules/lodash/_setToArray.js");module.exports=cloneSet;

/***/ },

/***/ "./node_modules/lodash/_addSetEntry.js":
/***/ function(module, exports) {

	function addSetEntry(d,t){return d.add(t),d}module.exports=addSetEntry;

/***/ },

/***/ "./node_modules/lodash/_setToArray.js":
/***/ function(module, exports) {

	function setToArray(r){var o=-1,e=Array(r.size);return r.forEach(function(r){e[++o]=r}),e}module.exports=setToArray;

/***/ },

/***/ "./node_modules/lodash/_cloneSymbol.js":
/***/ function(module, exports, __webpack_require__) {

	function cloneSymbol(o){return symbolValueOf?Object(symbolValueOf.call(o)):{}}var Symbol=__webpack_require__("./node_modules/lodash/_Symbol.js"),symbolProto=Symbol?Symbol.prototype:void 0,symbolValueOf=symbolProto?symbolProto.valueOf:void 0;module.exports=cloneSymbol;

/***/ },

/***/ "./node_modules/lodash/_Symbol.js":
/***/ function(module, exports, __webpack_require__) {

	var root=__webpack_require__("./node_modules/lodash/_root.js"),Symbol=root.Symbol;module.exports=Symbol;

/***/ },

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/***/ function(module, exports, __webpack_require__) {

	function cloneTypedArray(r,e){var f=e?cloneArrayBuffer(r.buffer):r.buffer;return new r.constructor(f,r.byteOffset,r.length)}var cloneArrayBuffer=__webpack_require__("./node_modules/lodash/_cloneArrayBuffer.js");module.exports=cloneTypedArray;

/***/ },

/***/ "./node_modules/lodash/_initCloneObject.js":
/***/ function(module, exports, __webpack_require__) {

	function initCloneObject(e){return"function"!=typeof e.constructor||isPrototype(e)?{}:baseCreate(getPrototype(e))}var baseCreate=__webpack_require__("./node_modules/lodash/_baseCreate.js"),getPrototype=__webpack_require__("./node_modules/lodash/_getPrototype.js"),isPrototype=__webpack_require__("./node_modules/lodash/_isPrototype.js");module.exports=initCloneObject;

/***/ },

/***/ "./node_modules/lodash/_baseCreate.js":
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__("./node_modules/lodash/isObject.js"),objectCreate=Object.create,baseCreate=function(){function e(){}return function(t){if(!isObject(t))return{};if(objectCreate)return objectCreate(t);e.prototype=t;var r=new e;return e.prototype=void 0,r}}();module.exports=baseCreate;

/***/ },

/***/ "./node_modules/lodash/assign.js":
/***/ function(module, exports, __webpack_require__) {

	var assignValue=__webpack_require__("./node_modules/lodash/_assignValue.js"),copyObject=__webpack_require__("./node_modules/lodash/_copyObject.js"),createAssigner=__webpack_require__("./node_modules/lodash/_createAssigner.js"),isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js"),isPrototype=__webpack_require__("./node_modules/lodash/_isPrototype.js"),keys=__webpack_require__("./node_modules/lodash/keys.js"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty,assign=createAssigner(function(e,r){if(isPrototype(r)||isArrayLike(r))return void copyObject(r,keys(r),e);for(var s in r)hasOwnProperty.call(r,s)&&assignValue(e,s,r[s])});module.exports=assign;

/***/ },

/***/ "./node_modules/lodash/_createAssigner.js":
/***/ function(module, exports, __webpack_require__) {

	function createAssigner(e){return baseRest(function(t,r){var a=-1,i=r.length,s=i>1?r[i-1]:void 0,n=i>2?r[2]:void 0;for(s=e.length>3&&"function"==typeof s?(i--,s):void 0,n&&isIterateeCall(r[0],r[1],n)&&(s=i<3?void 0:s,i=1),t=Object(t);++a<i;){var o=r[a];o&&e(t,o,a,s)}return t})}var baseRest=__webpack_require__("./node_modules/lodash/_baseRest.js"),isIterateeCall=__webpack_require__("./node_modules/lodash/_isIterateeCall.js");module.exports=createAssigner;

/***/ },

/***/ "./node_modules/lodash/_baseRest.js":
/***/ function(module, exports, __webpack_require__) {

	function baseRest(e,t){return setToString(overRest(e,t,identity),e+"")}var identity=__webpack_require__("./node_modules/lodash/identity.js"),overRest=__webpack_require__("./node_modules/lodash/_overRest.js"),setToString=__webpack_require__("./node_modules/lodash/_setToString.js");module.exports=baseRest;

/***/ },

/***/ "./node_modules/lodash/identity.js":
/***/ function(module, exports) {

	function identity(t){return t}module.exports=identity;

/***/ },

/***/ "./node_modules/lodash/_overRest.js":
/***/ function(module, exports, __webpack_require__) {

	function overRest(r,a,e){return a=nativeMax(void 0===a?r.length-1:a,0),function(){for(var t=arguments,n=-1,o=nativeMax(t.length-a,0),v=Array(o);++n<o;)v[n]=t[a+n];n=-1;for(var i=Array(a+1);++n<a;)i[n]=t[n];return i[a]=e(v),apply(r,this,i)}}var apply=__webpack_require__("./node_modules/lodash/_apply.js"),nativeMax=Math.max;module.exports=overRest;

/***/ },

/***/ "./node_modules/lodash/_apply.js":
/***/ function(module, exports) {

	function apply(l,e,a){switch(a.length){case 0:return l.call(e);case 1:return l.call(e,a[0]);case 2:return l.call(e,a[0],a[1]);case 3:return l.call(e,a[0],a[1],a[2])}return l.apply(e,a)}module.exports=apply;

/***/ },

/***/ "./node_modules/lodash/_setToString.js":
/***/ function(module, exports, __webpack_require__) {

	var baseSetToString=__webpack_require__("./node_modules/lodash/_baseSetToString.js"),shortOut=__webpack_require__("./node_modules/lodash/_shortOut.js"),setToString=shortOut(baseSetToString);module.exports=setToString;

/***/ },

/***/ "./node_modules/lodash/_baseSetToString.js":
/***/ function(module, exports, __webpack_require__) {

	var constant=__webpack_require__("./node_modules/lodash/constant.js"),defineProperty=__webpack_require__("./node_modules/lodash/_defineProperty.js"),identity=__webpack_require__("./node_modules/lodash/identity.js"),baseSetToString=defineProperty?function(e,t){return defineProperty(e,"toString",{configurable:!0,enumerable:!1,value:constant(t),writable:!0})}:identity;module.exports=baseSetToString;

/***/ },

/***/ "./node_modules/lodash/constant.js":
/***/ function(module, exports) {

	function constant(n){return function(){return n}}module.exports=constant;

/***/ },

/***/ "./node_modules/lodash/_shortOut.js":
/***/ function(module, exports) {

	function shortOut(t){var r=0,e=0;return function(){var n=nativeNow(),o=HOT_SPAN-(n-e);if(e=n,o>0){if(++r>=HOT_COUNT)return arguments[0]}else r=0;return t.apply(void 0,arguments)}}var HOT_COUNT=500,HOT_SPAN=16,nativeNow=Date.now;module.exports=shortOut;

/***/ },

/***/ "./node_modules/lodash/_isIterateeCall.js":
/***/ function(module, exports, __webpack_require__) {

	function isIterateeCall(e,r,i){if(!isObject(i))return!1;var t=typeof r;return!!("number"==t?isArrayLike(i)&&isIndex(r,i.length):"string"==t&&r in i)&&eq(i[r],e)}var eq=__webpack_require__("./node_modules/lodash/eq.js"),isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js"),isIndex=__webpack_require__("./node_modules/lodash/_isIndex.js"),isObject=__webpack_require__("./node_modules/lodash/isObject.js");module.exports=isIterateeCall;

/***/ },

/***/ "./node_modules/lodash/has.js":
/***/ function(module, exports, __webpack_require__) {

	function has(a,s){return null!=a&&hasPath(a,s,baseHas)}var baseHas=__webpack_require__("./node_modules/lodash/_baseHas.js"),hasPath=__webpack_require__("./node_modules/lodash/_hasPath.js");module.exports=has;

/***/ },

/***/ "./node_modules/lodash/_baseHas.js":
/***/ function(module, exports) {

	function baseHas(o,r){return null!=o&&hasOwnProperty.call(o,r)}var objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=baseHas;

/***/ },

/***/ "./node_modules/lodash/_hasPath.js":
/***/ function(module, exports, __webpack_require__) {

	function hasPath(e,r,i){r=isKey(r,e)?[r]:castPath(r);for(var s=-1,t=r.length,a=!1;++s<t;){var n=toKey(r[s]);if(!(a=null!=e&&i(e,n)))break;e=e[n]}return a||++s!=t?a:(t=e?e.length:0,!!t&&isLength(t)&&isIndex(n,t)&&(isArray(e)||isArguments(e)))}var castPath=__webpack_require__("./node_modules/lodash/_castPath.js"),isArguments=__webpack_require__("./node_modules/lodash/isArguments.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js"),isIndex=__webpack_require__("./node_modules/lodash/_isIndex.js"),isKey=__webpack_require__("./node_modules/lodash/_isKey.js"),isLength=__webpack_require__("./node_modules/lodash/isLength.js"),toKey=__webpack_require__("./node_modules/lodash/_toKey.js");module.exports=hasPath;

/***/ },

/***/ "./node_modules/lodash/_castPath.js":
/***/ function(module, exports, __webpack_require__) {

	function castPath(r){return isArray(r)?r:stringToPath(r)}var isArray=__webpack_require__("./node_modules/lodash/isArray.js"),stringToPath=__webpack_require__("./node_modules/lodash/_stringToPath.js");module.exports=castPath;

/***/ },

/***/ "./node_modules/lodash/_stringToPath.js":
/***/ function(module, exports, __webpack_require__) {

	var memoizeCapped=__webpack_require__("./node_modules/lodash/_memoizeCapped.js"),toString=__webpack_require__("./node_modules/lodash/toString.js"),reLeadingDot=/^\./,rePropName=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,reEscapeChar=/\\(\\)?/g,stringToPath=memoizeCapped(function(e){e=toString(e);var r=[];return reLeadingDot.test(e)&&r.push(""),e.replace(rePropName,function(e,t,a,o){r.push(a?o.replace(reEscapeChar,"$1"):t||e)}),r});module.exports=stringToPath;

/***/ },

/***/ "./node_modules/lodash/_memoizeCapped.js":
/***/ function(module, exports, __webpack_require__) {

	function memoizeCapped(e){var m=memoize(e,function(e){return r.size===MAX_MEMOIZE_SIZE&&r.clear(),e}),r=m.cache;return m}var memoize=__webpack_require__("./node_modules/lodash/memoize.js"),MAX_MEMOIZE_SIZE=500;module.exports=memoizeCapped;

/***/ },

/***/ "./node_modules/lodash/memoize.js":
/***/ function(module, exports, __webpack_require__) {

	function memoize(e,a){if("function"!=typeof e||a&&"function"!=typeof a)throw new TypeError(FUNC_ERROR_TEXT);var c=function(){var r=arguments,t=a?a.apply(this,r):r[0],n=c.cache;if(n.has(t))return n.get(t);var o=e.apply(this,r);return c.cache=n.set(t,o)||n,o};return c.cache=new(memoize.Cache||MapCache),c}var MapCache=__webpack_require__("./node_modules/lodash/_MapCache.js"),FUNC_ERROR_TEXT="Expected a function";memoize.Cache=MapCache,module.exports=memoize;

/***/ },

/***/ "./node_modules/lodash/toString.js":
/***/ function(module, exports, __webpack_require__) {

	function toString(r){return null==r?"":baseToString(r)}var baseToString=__webpack_require__("./node_modules/lodash/_baseToString.js");module.exports=toString;

/***/ },

/***/ "./node_modules/lodash/_baseToString.js":
/***/ function(module, exports, __webpack_require__) {

	function baseToString(r){if("string"==typeof r)return r;if(isArray(r))return arrayMap(r,baseToString)+"";if(isSymbol(r))return symbolToString?symbolToString.call(r):"";var o=r+"";return"0"==o&&1/r==-INFINITY?"-0":o}var Symbol=__webpack_require__("./node_modules/lodash/_Symbol.js"),arrayMap=__webpack_require__("./node_modules/lodash/_arrayMap.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js"),isSymbol=__webpack_require__("./node_modules/lodash/isSymbol.js"),INFINITY=1/0,symbolProto=Symbol?Symbol.prototype:void 0,symbolToString=symbolProto?symbolProto.toString:void 0;module.exports=baseToString;

/***/ },

/***/ "./node_modules/lodash/_arrayMap.js":
/***/ function(module, exports) {

	function arrayMap(r,a){for(var e=-1,n=r?r.length:0,o=Array(n);++e<n;)o[e]=a(r[e],e,r);return o}module.exports=arrayMap;

/***/ },

/***/ "./node_modules/lodash/isSymbol.js":
/***/ function(module, exports, __webpack_require__) {

	function isSymbol(o){return"symbol"==typeof o||isObjectLike(o)&&objectToString.call(o)==symbolTag}var isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js"),symbolTag="[object Symbol]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isSymbol;

/***/ },

/***/ "./node_modules/lodash/_isKey.js":
/***/ function(module, exports, __webpack_require__) {

	function isKey(r,e){if(isArray(r))return!1;var s=typeof r;return!("number"!=s&&"symbol"!=s&&"boolean"!=s&&null!=r&&!isSymbol(r))||(reIsPlainProp.test(r)||!reIsDeepProp.test(r)||null!=e&&r in Object(e))}var isArray=__webpack_require__("./node_modules/lodash/isArray.js"),isSymbol=__webpack_require__("./node_modules/lodash/isSymbol.js"),reIsDeepProp=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,reIsPlainProp=/^\w*$/;module.exports=isKey;

/***/ },

/***/ "./node_modules/lodash/_toKey.js":
/***/ function(module, exports, __webpack_require__) {

	function toKey(r){if("string"==typeof r||isSymbol(r))return r;var e=r+"";return"0"==e&&1/r==-INFINITY?"-0":e}var isSymbol=__webpack_require__("./node_modules/lodash/isSymbol.js"),INFINITY=1/0;module.exports=toKey;

/***/ },

/***/ "./node_modules/babel-traverse/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function traverse(e,r,t,a,i){if(e){if(r||(r={}),!r.noScope&&!t&&"Program"!==e.type&&"File"!==e.type)throw new Error(messages.get("traverseNeedsParent",e.type));visitors.explode(r),traverse.node(e,r,t,a,i)}}function hasBlacklistedType(e,r){e.node.type===r.type&&(r.has=!0,e.stop())}exports.__esModule=!0,exports.visitors=exports.Hub=exports.Scope=exports.NodePath=void 0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_path=__webpack_require__("./node_modules/babel-traverse/lib/path/index.js");Object.defineProperty(exports,"NodePath",{enumerable:!0,get:function(){return _interopRequireDefault(_path)["default"]}});var _scope=__webpack_require__("./node_modules/babel-traverse/lib/scope/index.js");Object.defineProperty(exports,"Scope",{enumerable:!0,get:function(){return _interopRequireDefault(_scope)["default"]}});var _hub=__webpack_require__("./node_modules/babel-traverse/lib/hub.js");Object.defineProperty(exports,"Hub",{enumerable:!0,get:function(){return _interopRequireDefault(_hub)["default"]}}),exports["default"]=traverse;var _context=__webpack_require__("./node_modules/babel-traverse/lib/context.js"),_context2=_interopRequireDefault(_context),_visitors=__webpack_require__("./node_modules/babel-traverse/lib/visitors.js"),visitors=_interopRequireWildcard(_visitors),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_includes=__webpack_require__("./node_modules/lodash/includes.js"),_includes2=_interopRequireDefault(_includes),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_cache=__webpack_require__("./node_modules/babel-traverse/lib/cache.js"),cache=_interopRequireWildcard(_cache);exports.visitors=visitors,traverse.visitors=visitors,traverse.verify=visitors.verify,traverse.explode=visitors.explode,traverse.NodePath=__webpack_require__("./node_modules/babel-traverse/lib/path/index.js"),traverse.Scope=__webpack_require__("./node_modules/babel-traverse/lib/scope/index.js"),traverse.Hub=__webpack_require__("./node_modules/babel-traverse/lib/hub.js"),traverse.cheap=function(e,r){return t.traverseFast(e,r)},traverse.node=function(e,r,a,i,s,o){var u=t.VISITOR_KEYS[e.type];if(u)for(var n=new _context2["default"](a,r,i,s),c=u,p=Array.isArray(c),l=0,c=p?c:(0,_getIterator3["default"])(c);;){var v;if(p){if(l>=c.length)break;v=c[l++]}else{if(l=c.next(),l.done)break;v=l.value}var d=v;if((!o||!o[d])&&n.visit(e,d))return}},traverse.clearNode=function(e,r){t.removeProperties(e,r),cache.path["delete"](e)},traverse.removeProperties=function(e,r){return t.traverseFast(e,traverse.clearNode,r),e},traverse.hasType=function(e,r,t,a){if((0,_includes2["default"])(a,e.type))return!1;if(e.type===t)return!0;var i={has:!1,type:t};return traverse(e,{blacklist:a,enter:hasBlacklistedType},r,i),i.has},traverse.clearCache=function(){cache.clear()},traverse.copyCache=function(e,r){cache.path.has(e)&&cache.path.set(r,cache.path.get(e))};

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_virtualTypes=__webpack_require__("./node_modules/babel-traverse/lib/path/lib/virtual-types.js"),virtualTypes=_interopRequireWildcard(_virtualTypes),_debug2=__webpack_require__("./node_modules/debug/browser.js"),_debug3=_interopRequireDefault(_debug2),_invariant=__webpack_require__("./node_modules/invariant/browser.js"),_invariant2=_interopRequireDefault(_invariant),_index=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_index2=_interopRequireDefault(_index),_assign=__webpack_require__("./node_modules/lodash/assign.js"),_assign2=_interopRequireDefault(_assign),_scope=__webpack_require__("./node_modules/babel-traverse/lib/scope/index.js"),_scope2=_interopRequireDefault(_scope),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_cache=__webpack_require__("./node_modules/babel-traverse/lib/cache.js"),_debug=(0,_debug3["default"])("babel"),NodePath=function(){function e(t,r){(0,_classCallCheck3["default"])(this,e),this.parent=r,this.hub=t,this.contexts=[],this.data={},this.shouldSkip=!1,this.shouldStop=!1,this.removed=!1,this.state=null,this.opts=null,this.skipKeys=null,this.parentPath=null,this.context=null,this.container=null,this.listKey=null,this.inList=!1,this.parentKey=null,this.key=null,this.node=null,this.scope=null,this.type=null,this.typeAnnotation=null}return e.get=function(t){var r=t.hub,i=t.parentPath,a=t.parent,o=t.container,n=t.listKey,s=t.key;!r&&i&&(r=i.hub),(0,_invariant2["default"])(a,"To get a node path the parent needs to exist");var u=o[s],l=_cache.path.get(a)||[];_cache.path.has(a)||_cache.path.set(a,l);for(var p=void 0,h=0;h<l.length;h++){var d=l[h];if(d.node===u){p=d;break}}return p||(p=new e(r,a),l.push(p)),p.setup(i,o,n,s),p},e.prototype.getScope=function(e){var t=e;return this.isScope()&&(t=new _scope2["default"](this,e)),t},e.prototype.setData=function(e,t){return this.data[e]=t},e.prototype.getData=function(e,t){var r=this.data[e];return!r&&t&&(r=this.data[e]=t),r},e.prototype.buildCodeFrameError=function(e){var t=arguments.length<=1||void 0===arguments[1]?SyntaxError:arguments[1];return this.hub.file.buildCodeFrameError(this.node,e,t)},e.prototype.traverse=function(e,t){(0,_index2["default"])(this.node,e,this.scope,t,this)},e.prototype.mark=function(e,t){this.hub.file.metadata.marked.push({type:e,message:t,loc:this.node.loc})},e.prototype.set=function(e,r){t.validate(this.node,e,r),this.node[e]=r},e.prototype.getPathLocation=function(){var e=[],t=this;do{var r=t.key;t.inList&&(r=t.listKey+"["+r+"]"),e.unshift(r)}while(t=t.parentPath);return e.join(".")},e.prototype.debug=function(e){_debug.enabled&&_debug(this.getPathLocation()+" "+this.type+": "+e())},e}();exports["default"]=NodePath,(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/ancestry.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/inference/index.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/replacement.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/evaluation.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/conversion.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/introspection.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/context.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/removal.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/modification.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/family.js")),(0,_assign2["default"])(NodePath.prototype,__webpack_require__("./node_modules/babel-traverse/lib/path/comments.js"));for(var _loop2=function(){if(_isArray){if(_i>=_iterator.length)return"break";_ref2=_iterator[_i++]}else{if(_i=_iterator.next(),_i.done)return"break";_ref2=_i.value}var e=_ref2,r="is"+e;NodePath.prototype[r]=function(e){return t[r](this.node,e)},NodePath.prototype["assert"+e]=function(t){if(!this[r](t))throw new TypeError("Expected node path of type "+e)}},_iterator=t.TYPES,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:(0,_getIterator3["default"])(_iterator);;){var _ref2,_ret2=_loop2();if("break"===_ret2)break}var _loop=function(e){if("_"===e[0])return"continue";t.TYPES.indexOf(e)<0&&t.TYPES.push(e);var r=virtualTypes[e];NodePath.prototype["is"+e]=function(e){return r.checkPath(this,e)}};for(var type in virtualTypes){var _ret=_loop(type)}module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/lib/virtual-types.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}exports.__esModule=!0,exports.Flow=exports.Pure=exports.Generated=exports.User=exports.Var=exports.BlockScoped=exports.Referenced=exports.Scope=exports.Expression=exports.Statement=exports.BindingIdentifier=exports.ReferencedMemberExpression=exports.ReferencedIdentifier=void 0;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),ReferencedIdentifier=exports.ReferencedIdentifier={types:["Identifier","JSXIdentifier"],checkPath:function(e,r){var n=e.node,i=e.parent;if(!t.isIdentifier(n,r)){if(!t.isJSXIdentifier(n,r))return!1;if(_babelTypes.react.isCompatTag(n.name))return!1}return t.isReferenced(n,i)}},ReferencedMemberExpression=exports.ReferencedMemberExpression={types:["MemberExpression"],checkPath:function(e){var r=e.node,n=e.parent;return t.isMemberExpression(r)&&t.isReferenced(r,n)}},BindingIdentifier=exports.BindingIdentifier={types:["Identifier"],checkPath:function(e){var r=e.node,n=e.parent;return t.isIdentifier(r)&&t.isBinding(r,n)}},Statement=exports.Statement={types:["Statement"],checkPath:function(e){var r=e.node,n=e.parent;if(t.isStatement(r)){if(t.isVariableDeclaration(r)){if(t.isForXStatement(n,{left:r}))return!1;if(t.isForStatement(n,{init:r}))return!1}return!0}return!1}},Expression=exports.Expression={types:["Expression"],checkPath:function(e){return e.isIdentifier()?e.isReferencedIdentifier():t.isExpression(e.node)}},Scope=exports.Scope={types:["Scopable"],checkPath:function(e){return t.isScope(e.node,e.parent)}},Referenced=exports.Referenced={checkPath:function(e){return t.isReferenced(e.node,e.parent)}},BlockScoped=exports.BlockScoped={checkPath:function(e){return t.isBlockScoped(e.node)}},Var=exports.Var={types:["VariableDeclaration"],checkPath:function(e){return t.isVar(e.node)}},User=exports.User={checkPath:function(e){return e.node&&!!e.node.loc}},Generated=exports.Generated={checkPath:function(e){return!e.isUser()}},Pure=exports.Pure={checkPath:function(e,t){return e.scope.isPure(e.node,t)}},Flow=exports.Flow={types:["Flow","ImportDeclaration","ExportDeclaration"],checkPath:function(e){var r=e.node;return!!t.isFlow(r)||(t.isImportDeclaration(r)?"type"===r.importKind||"typeof"===r.importKind:!!t.isExportDeclaration(r)&&"type"===r.exportKind)}};

/***/ },

/***/ "./node_modules/babel-types/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function registerType(e){var r=t["is"+e];r||(r=t["is"+e]=function(r,n){return t.is(e,r,n)}),t["assert"+e]=function(t,n){if(n=n||{},!r(t,n))throw new Error("Expected type "+(0,_stringify2["default"])(e)+" with option "+(0,_stringify2["default"])(n))}}function is(e,r,n){if(!r)return!1;var o=isType(r.type,e);return!!o&&("undefined"==typeof n||t.shallowEqual(r,n))}function isType(e,r){if(e===r)return!0;if(t.ALIAS_KEYS[r])return!1;var n=t.FLIPPED_ALIAS_KEYS[r];if(n){if(n[0]===e)return!0;for(var o=n,i=Array.isArray(o),s=0,o=i?o:(0,_getIterator3["default"])(o);;){var a;if(i){if(s>=o.length)break;a=o[s++]}else{if(s=o.next(),s.done)break;a=s.value}var u=a;if(e===u)return!0}}return!1}function validate(e,r,n){if(e){var o=t.NODE_FIELDS[e.type];if(o){var i=o[r];i&&i.validate&&(i.optional&&null==n||i.validate(e,r,n))}}}function shallowEqual(e,t){for(var r=(0,_keys2["default"])(t),n=r,o=Array.isArray(n),i=0,n=o?n:(0,_getIterator3["default"])(n);;){var s;if(o){if(i>=n.length)break;s=n[i++]}else{if(i=n.next(),i.done)break;s=i.value}var a=s;if(e[a]!==t[a])return!1}return!0}function appendToMemberExpression(e,r,n){return e.object=t.memberExpression(e.object,e.property,e.computed),e.property=r,e.computed=!!n,e}function prependToMemberExpression(e,r){return e.object=t.memberExpression(r,e.object),e}function ensureBlock(e){var r=arguments.length<=1||void 0===arguments[1]?"body":arguments[1];return e[r]=t.toBlock(e[r],e)}function clone(e){var t={};for(var r in e)"_"!==r[0]&&(t[r]=e[r]);return t}function cloneWithoutLoc(e){var t=clone(e);return delete t.loc,t}function cloneDeep(e){var r={};for(var n in e)if("_"!==n[0]){var o=e[n];o&&(o.type?o=t.cloneDeep(o):Array.isArray(o)&&(o=o.map(t.cloneDeep))),r[n]=o}return r}function buildMatchMemberExpression(e,r){var n=e.split(".");return function(e){if(!t.isMemberExpression(e))return!1;for(var o=[e],i=0;o.length;){var s=o.shift();if(r&&i===n.length)return!0;if(t.isIdentifier(s)){if(n[i]!==s.name)return!1}else{if(!t.isStringLiteral(s)){if(t.isMemberExpression(s)){if(s.computed&&!t.isStringLiteral(s.property))return!1;o.push(s.object),o.push(s.property);continue}return!1}if(n[i]!==s.value)return!1}if(++i>n.length)return!1}return!0}}function removeComments(e){for(var r=t.COMMENT_KEYS,n=Array.isArray(r),o=0,r=n?r:(0,_getIterator3["default"])(r);;){var i;if(n){if(o>=r.length)break;i=r[o++]}else{if(o=r.next(),o.done)break;i=o.value}var s=i;delete e[s]}return e}function inheritsComments(e,t){return inheritTrailingComments(e,t),inheritLeadingComments(e,t),inheritInnerComments(e,t),e}function inheritTrailingComments(e,t){_inheritComments("trailingComments",e,t)}function inheritLeadingComments(e,t){_inheritComments("leadingComments",e,t)}function inheritInnerComments(e,t){_inheritComments("innerComments",e,t)}function _inheritComments(e,t,r){t&&r&&(t[e]=(0,_uniq2["default"])((0,_compact2["default"])([].concat(t[e],r[e]))))}function inherits(e,r){if(!e||!r)return e;for(var n=t.INHERIT_KEYS.optional,o=Array.isArray(n),i=0,n=o?n:(0,_getIterator3["default"])(n);;){var s;if(o){if(i>=n.length)break;s=n[i++]}else{if(i=n.next(),i.done)break;s=i.value}var a=s;null==e[a]&&(e[a]=r[a])}for(var u in r)"_"===u[0]&&(e[u]=r[u]);for(var p=t.INHERIT_KEYS.force,_=Array.isArray(p),f=0,p=_?p:(0,_getIterator3["default"])(p);;){var c;if(_){if(f>=p.length)break;c=p[f++]}else{if(f=p.next(),f.done)break;c=f.value}var l=c;e[l]=r[l]}return t.inheritsComments(e,r),e}function assertNode(e){if(!isNode(e))throw new TypeError("Not a valid node "+(e&&e.type))}function isNode(e){return!(!e||!_definitions.VISITOR_KEYS[e.type])}function traverseFast(e,r,n){if(e){var o=t.VISITOR_KEYS[e.type];if(o){n=n||{},r(e,n);for(var i=o,s=Array.isArray(i),a=0,i=s?i:(0,_getIterator3["default"])(i);;){var u;if(s){if(a>=i.length)break;u=i[a++]}else{if(a=i.next(),a.done)break;u=a.value}var p=u,_=e[p];if(Array.isArray(_))for(var f=_,c=Array.isArray(f),l=0,f=c?f:(0,_getIterator3["default"])(f);;){var E;if(c){if(l>=f.length)break;E=f[l++]}else{if(l=f.next(),l.done)break;E=l.value}var d=E;traverseFast(d,r,n)}else traverseFast(_,r,n)}}}}function removeProperties(e,t){t=t||{};for(var r=t.preserveComments?CLEAR_KEYS:CLEAR_KEYS_PLUS_COMMENTS,n=r,o=Array.isArray(n),i=0,n=o?n:(0,_getIterator3["default"])(n);;){var s;if(o){if(i>=n.length)break;s=n[i++]}else{if(i=n.next(),i.done)break;s=i.value}var a=s;null!=e[a]&&(e[a]=void 0)}for(var u in e)"_"===u[0]&&null!=e[u]&&(e[u]=void 0);for(var p=(0,_getOwnPropertySymbols2["default"])(e),_=p,f=Array.isArray(_),c=0,_=f?_:(0,_getIterator3["default"])(_);;){var l;if(f){if(c>=_.length)break;l=_[c++]}else{if(c=_.next(),c.done)break;l=c.value}var E=l;e[E]=null}}function removePropertiesDeep(e,t){return traverseFast(e,removeProperties,t),e}exports.__esModule=!0,exports.createTypeAnnotationBasedOnTypeof=exports.removeTypeDuplicates=exports.createUnionTypeAnnotation=exports.valueToNode=exports.toBlock=exports.toExpression=exports.toStatement=exports.toBindingIdentifierName=exports.toIdentifier=exports.toKeyAlias=exports.toSequenceExpression=exports.toComputedKey=exports.isImmutable=exports.isScope=exports.isSpecifierDefault=exports.isVar=exports.isBlockScoped=exports.isLet=exports.isValidIdentifier=exports.isReferenced=exports.isBinding=exports.getOuterBindingIdentifiers=exports.getBindingIdentifiers=exports.TYPES=exports.react=exports.DEPRECATED_KEYS=exports.BUILDER_KEYS=exports.NODE_FIELDS=exports.ALIAS_KEYS=exports.VISITOR_KEYS=exports.NOT_LOCAL_BINDING=exports.BLOCK_SCOPED_SYMBOL=exports.INHERIT_KEYS=exports.UNARY_OPERATORS=exports.STRING_UNARY_OPERATORS=exports.NUMBER_UNARY_OPERATORS=exports.BOOLEAN_UNARY_OPERATORS=exports.BINARY_OPERATORS=exports.NUMBER_BINARY_OPERATORS=exports.BOOLEAN_BINARY_OPERATORS=exports.COMPARISON_BINARY_OPERATORS=exports.EQUALITY_BINARY_OPERATORS=exports.BOOLEAN_NUMBER_BINARY_OPERATORS=exports.UPDATE_OPERATORS=exports.LOGICAL_OPERATORS=exports.COMMENT_KEYS=exports.FOR_INIT_KEYS=exports.FLATTENABLE_KEYS=exports.STATEMENT_OR_BLOCK_KEYS=void 0;var _getOwnPropertySymbols=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-own-property-symbols.js"),_getOwnPropertySymbols2=_interopRequireDefault(_getOwnPropertySymbols),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_constants=__webpack_require__("./node_modules/babel-types/lib/constants.js");Object.defineProperty(exports,"STATEMENT_OR_BLOCK_KEYS",{enumerable:!0,get:function(){return _constants.STATEMENT_OR_BLOCK_KEYS}}),Object.defineProperty(exports,"FLATTENABLE_KEYS",{enumerable:!0,get:function(){return _constants.FLATTENABLE_KEYS}}),Object.defineProperty(exports,"FOR_INIT_KEYS",{enumerable:!0,get:function(){return _constants.FOR_INIT_KEYS}}),Object.defineProperty(exports,"COMMENT_KEYS",{enumerable:!0,get:function(){return _constants.COMMENT_KEYS}}),Object.defineProperty(exports,"LOGICAL_OPERATORS",{enumerable:!0,get:function(){return _constants.LOGICAL_OPERATORS}}),Object.defineProperty(exports,"UPDATE_OPERATORS",{enumerable:!0,get:function(){return _constants.UPDATE_OPERATORS}}),Object.defineProperty(exports,"BOOLEAN_NUMBER_BINARY_OPERATORS",{enumerable:!0,get:function(){return _constants.BOOLEAN_NUMBER_BINARY_OPERATORS}}),Object.defineProperty(exports,"EQUALITY_BINARY_OPERATORS",{enumerable:!0,get:function(){return _constants.EQUALITY_BINARY_OPERATORS}}),Object.defineProperty(exports,"COMPARISON_BINARY_OPERATORS",{enumerable:!0,get:function(){return _constants.COMPARISON_BINARY_OPERATORS}}),Object.defineProperty(exports,"BOOLEAN_BINARY_OPERATORS",{enumerable:!0,get:function(){return _constants.BOOLEAN_BINARY_OPERATORS}}),Object.defineProperty(exports,"NUMBER_BINARY_OPERATORS",{enumerable:!0,get:function(){return _constants.NUMBER_BINARY_OPERATORS}}),Object.defineProperty(exports,"BINARY_OPERATORS",{enumerable:!0,get:function(){return _constants.BINARY_OPERATORS}}),Object.defineProperty(exports,"BOOLEAN_UNARY_OPERATORS",{enumerable:!0,get:function(){return _constants.BOOLEAN_UNARY_OPERATORS}}),Object.defineProperty(exports,"NUMBER_UNARY_OPERATORS",{enumerable:!0,get:function(){return _constants.NUMBER_UNARY_OPERATORS}}),Object.defineProperty(exports,"STRING_UNARY_OPERATORS",{enumerable:!0,get:function(){return _constants.STRING_UNARY_OPERATORS}}),Object.defineProperty(exports,"UNARY_OPERATORS",{enumerable:!0,get:function(){return _constants.UNARY_OPERATORS}}),Object.defineProperty(exports,"INHERIT_KEYS",{enumerable:!0,get:function(){return _constants.INHERIT_KEYS}}),Object.defineProperty(exports,"BLOCK_SCOPED_SYMBOL",{enumerable:!0,get:function(){return _constants.BLOCK_SCOPED_SYMBOL}}),Object.defineProperty(exports,"NOT_LOCAL_BINDING",{enumerable:!0,get:function(){return _constants.NOT_LOCAL_BINDING}}),exports.is=is,exports.isType=isType,exports.validate=validate,exports.shallowEqual=shallowEqual,exports.appendToMemberExpression=appendToMemberExpression,exports.prependToMemberExpression=prependToMemberExpression,exports.ensureBlock=ensureBlock,exports.clone=clone,exports.cloneWithoutLoc=cloneWithoutLoc,exports.cloneDeep=cloneDeep,exports.buildMatchMemberExpression=buildMatchMemberExpression,exports.removeComments=removeComments,exports.inheritsComments=inheritsComments,exports.inheritTrailingComments=inheritTrailingComments,exports.inheritLeadingComments=inheritLeadingComments,exports.inheritInnerComments=inheritInnerComments,exports.inherits=inherits,exports.assertNode=assertNode,exports.isNode=isNode,exports.traverseFast=traverseFast,exports.removeProperties=removeProperties,exports.removePropertiesDeep=removePropertiesDeep;var _retrievers=__webpack_require__("./node_modules/babel-types/lib/retrievers.js");Object.defineProperty(exports,"getBindingIdentifiers",{enumerable:!0,get:function(){return _retrievers.getBindingIdentifiers}}),Object.defineProperty(exports,"getOuterBindingIdentifiers",{enumerable:!0,get:function(){return _retrievers.getOuterBindingIdentifiers}});var _validators=__webpack_require__("./node_modules/babel-types/lib/validators.js");Object.defineProperty(exports,"isBinding",{enumerable:!0,get:function(){return _validators.isBinding}}),Object.defineProperty(exports,"isReferenced",{enumerable:!0,get:function(){return _validators.isReferenced}}),Object.defineProperty(exports,"isValidIdentifier",{enumerable:!0,get:function(){return _validators.isValidIdentifier}}),Object.defineProperty(exports,"isLet",{enumerable:!0,get:function(){return _validators.isLet}}),Object.defineProperty(exports,"isBlockScoped",{enumerable:!0,get:function(){return _validators.isBlockScoped}}),Object.defineProperty(exports,"isVar",{enumerable:!0,get:function(){return _validators.isVar}}),Object.defineProperty(exports,"isSpecifierDefault",{enumerable:!0,get:function(){return _validators.isSpecifierDefault}}),Object.defineProperty(exports,"isScope",{enumerable:!0,get:function(){return _validators.isScope}}),Object.defineProperty(exports,"isImmutable",{enumerable:!0,get:function(){return _validators.isImmutable}});var _converters=__webpack_require__("./node_modules/babel-types/lib/converters.js");Object.defineProperty(exports,"toComputedKey",{enumerable:!0,get:function(){return _converters.toComputedKey}}),Object.defineProperty(exports,"toSequenceExpression",{enumerable:!0,get:function(){return _converters.toSequenceExpression}}),Object.defineProperty(exports,"toKeyAlias",{enumerable:!0,get:function(){return _converters.toKeyAlias}}),Object.defineProperty(exports,"toIdentifier",{enumerable:!0,get:function(){return _converters.toIdentifier}}),Object.defineProperty(exports,"toBindingIdentifierName",{enumerable:!0,get:function(){return _converters.toBindingIdentifierName}}),Object.defineProperty(exports,"toStatement",{enumerable:!0,get:function(){return _converters.toStatement}}),Object.defineProperty(exports,"toExpression",{enumerable:!0,get:function(){return _converters.toExpression}}),Object.defineProperty(exports,"toBlock",{enumerable:!0,get:function(){return _converters.toBlock}}),Object.defineProperty(exports,"valueToNode",{enumerable:!0,get:function(){return _converters.valueToNode}});var _flow=__webpack_require__("./node_modules/babel-types/lib/flow.js");Object.defineProperty(exports,"createUnionTypeAnnotation",{enumerable:!0,get:function(){return _flow.createUnionTypeAnnotation}}),Object.defineProperty(exports,"removeTypeDuplicates",{enumerable:!0,get:function(){return _flow.removeTypeDuplicates}}),Object.defineProperty(exports,"createTypeAnnotationBasedOnTypeof",{enumerable:!0,get:function(){return _flow.createTypeAnnotationBasedOnTypeof}});var _toFastProperties=__webpack_require__("./node_modules/to-fast-properties/index.js"),_toFastProperties2=_interopRequireDefault(_toFastProperties),_compact=__webpack_require__("./node_modules/lodash/compact.js"),_compact2=_interopRequireDefault(_compact),_clone=__webpack_require__("./node_modules/lodash/clone.js"),_clone2=_interopRequireDefault(_clone),_each=__webpack_require__("./node_modules/lodash/each.js"),_each2=_interopRequireDefault(_each),_uniq=__webpack_require__("./node_modules/lodash/uniq.js"),_uniq2=_interopRequireDefault(_uniq);__webpack_require__("./node_modules/babel-types/lib/definitions/init.js");var _definitions=__webpack_require__("./node_modules/babel-types/lib/definitions/index.js"),_react2=__webpack_require__("./node_modules/babel-types/lib/react.js"),_react=_interopRequireWildcard(_react2),t=exports;exports.VISITOR_KEYS=_definitions.VISITOR_KEYS,exports.ALIAS_KEYS=_definitions.ALIAS_KEYS,exports.NODE_FIELDS=_definitions.NODE_FIELDS,exports.BUILDER_KEYS=_definitions.BUILDER_KEYS,exports.DEPRECATED_KEYS=_definitions.DEPRECATED_KEYS,exports.react=_react;for(var type in t.VISITOR_KEYS)registerType(type);t.FLIPPED_ALIAS_KEYS={},(0,_each2["default"])(t.ALIAS_KEYS,function(e,r){(0,_each2["default"])(e,function(e){var n=t.FLIPPED_ALIAS_KEYS[e]=t.FLIPPED_ALIAS_KEYS[e]||[];n.push(r)})}),(0,_each2["default"])(t.FLIPPED_ALIAS_KEYS,function(e,r){t[r.toUpperCase()+"_TYPES"]=e,registerType(r)});var TYPES=exports.TYPES=(0,_keys2["default"])(t.VISITOR_KEYS).concat((0,_keys2["default"])(t.FLIPPED_ALIAS_KEYS)).concat((0,_keys2["default"])(t.DEPRECATED_KEYS));(0,_each2["default"])(t.BUILDER_KEYS,function(e,r){function n(){if(arguments.length>e.length)throw new Error("t."+r+": Too many arguments passed. Received "+arguments.length+" but can receive no more than "+e.length);var n={};n.type=r;for(var o=0,i=e,s=Array.isArray(i),a=0,i=s?i:(0,_getIterator3["default"])(i);;){var u;if(s){if(a>=i.length)break;u=i[a++]}else{if(a=i.next(),a.done)break;u=a.value}var p=u,_=t.NODE_FIELDS[r][p],f=arguments[o++];void 0===f&&(f=(0,_clone2["default"])(_["default"])),n[p]=f}for(var c in n)validate(n,c,n[c]);return n}t[r]=n,t[r[0].toLowerCase()+r.slice(1)]=n});var _loop=function(e){function r(t){return function(){return console.trace("The node type "+e+" has been renamed to "+n),t.apply(this,arguments)}}var n=t.DEPRECATED_KEYS[e];t[e]=t[e[0].toLowerCase()+e.slice(1)]=r(t[n]),t["is"+e]=r(t["is"+n]),t["assert"+e]=r(t["assert"+n])};for(var _type in t.DEPRECATED_KEYS)_loop(_type);(0,_toFastProperties2["default"])(t),(0,_toFastProperties2["default"])(t.VISITOR_KEYS);var CLEAR_KEYS=["tokens","start","end","loc","raw","rawValue"],CLEAR_KEYS_PLUS_COMMENTS=t.COMMENT_KEYS.concat(["comments"]).concat(CLEAR_KEYS);

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/get-own-property-symbols.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/get-own-property-symbols.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/get-own-property-symbols.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.symbol.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object.getOwnPropertySymbols;

/***/ },

/***/ "./node_modules/babel-types/lib/constants.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(R){return R&&R.__esModule?R:{"default":R}}exports.__esModule=!0,exports.NOT_LOCAL_BINDING=exports.BLOCK_SCOPED_SYMBOL=exports.INHERIT_KEYS=exports.UNARY_OPERATORS=exports.STRING_UNARY_OPERATORS=exports.NUMBER_UNARY_OPERATORS=exports.BOOLEAN_UNARY_OPERATORS=exports.BINARY_OPERATORS=exports.NUMBER_BINARY_OPERATORS=exports.BOOLEAN_BINARY_OPERATORS=exports.COMPARISON_BINARY_OPERATORS=exports.EQUALITY_BINARY_OPERATORS=exports.BOOLEAN_NUMBER_BINARY_OPERATORS=exports.UPDATE_OPERATORS=exports.LOGICAL_OPERATORS=exports.COMMENT_KEYS=exports.FOR_INIT_KEYS=exports.FLATTENABLE_KEYS=exports.STATEMENT_OR_BLOCK_KEYS=void 0;var _for=__webpack_require__("./node_modules/babel-runtime/core-js/symbol/for.js"),_for2=_interopRequireDefault(_for),STATEMENT_OR_BLOCK_KEYS=exports.STATEMENT_OR_BLOCK_KEYS=["consequent","body","alternate"],FLATTENABLE_KEYS=exports.FLATTENABLE_KEYS=["body","expressions"],FOR_INIT_KEYS=exports.FOR_INIT_KEYS=["left","init"],COMMENT_KEYS=exports.COMMENT_KEYS=["leadingComments","trailingComments","innerComments"],LOGICAL_OPERATORS=exports.LOGICAL_OPERATORS=["||","&&"],UPDATE_OPERATORS=exports.UPDATE_OPERATORS=["++","--"],BOOLEAN_NUMBER_BINARY_OPERATORS=exports.BOOLEAN_NUMBER_BINARY_OPERATORS=[">","<",">=","<="],EQUALITY_BINARY_OPERATORS=exports.EQUALITY_BINARY_OPERATORS=["==","===","!=","!=="],COMPARISON_BINARY_OPERATORS=exports.COMPARISON_BINARY_OPERATORS=[].concat(EQUALITY_BINARY_OPERATORS,["in","instanceof"]),BOOLEAN_BINARY_OPERATORS=exports.BOOLEAN_BINARY_OPERATORS=[].concat(COMPARISON_BINARY_OPERATORS,BOOLEAN_NUMBER_BINARY_OPERATORS),NUMBER_BINARY_OPERATORS=exports.NUMBER_BINARY_OPERATORS=["-","/","%","*","**","&","|",">>",">>>","<<","^"],BINARY_OPERATORS=exports.BINARY_OPERATORS=["+"].concat(NUMBER_BINARY_OPERATORS,BOOLEAN_BINARY_OPERATORS),BOOLEAN_UNARY_OPERATORS=exports.BOOLEAN_UNARY_OPERATORS=["delete","!"],NUMBER_UNARY_OPERATORS=exports.NUMBER_UNARY_OPERATORS=["+","-","++","--","~"],STRING_UNARY_OPERATORS=exports.STRING_UNARY_OPERATORS=["typeof"],UNARY_OPERATORS=exports.UNARY_OPERATORS=["void"].concat(BOOLEAN_UNARY_OPERATORS,NUMBER_UNARY_OPERATORS,STRING_UNARY_OPERATORS),INHERIT_KEYS=exports.INHERIT_KEYS={optional:["typeAnnotation","typeParameters","returnType"],force:["start","loc","end"]},BLOCK_SCOPED_SYMBOL=exports.BLOCK_SCOPED_SYMBOL=(0,_for2["default"])("var used to be block scoped"),NOT_LOCAL_BINDING=exports.NOT_LOCAL_BINDING=(0,_for2["default"])("should not be considered a local binding");

/***/ },

/***/ "./node_modules/babel-runtime/core-js/symbol/for.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/symbol/for.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/symbol/for.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.symbol.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Symbol["for"];

/***/ },

/***/ "./node_modules/babel-types/lib/retrievers.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(i[t]=e[t]);return i["default"]=e,i}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getBindingIdentifiers(e,i,r){for(var n=[].concat(e),a=(0,_create2["default"])(null);n.length;){var s=n.shift();if(s){var o=t.getBindingIdentifiers.keys[s.type];if(t.isIdentifier(s))if(i){var l=a[s.name]=a[s.name]||[];l.push(s)}else a[s.name]=s;else if(t.isExportDeclaration(s))t.isDeclaration(e.declaration)&&n.push(e.declaration);else{if(r){if(t.isFunctionDeclaration(s)){n.push(s.id);continue}if(t.isFunctionExpression(s))continue}if(o)for(var c=0;c<o.length;c++){var d=o[c];s[d]&&(n=n.concat(s[d]))}}}}return a}function getOuterBindingIdentifiers(e,i){return getBindingIdentifiers(e,i,!0)}exports.__esModule=!0;var _create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create);exports.getBindingIdentifiers=getBindingIdentifiers,exports.getOuterBindingIdentifiers=getOuterBindingIdentifiers;var _index=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_index);getBindingIdentifiers.keys={DeclareClass:["id"],DeclareFunction:["id"],DeclareModule:["id"],DeclareVariable:["id"],InterfaceDeclaration:["id"],TypeAlias:["id"],CatchClause:["param"],LabeledStatement:["label"],UnaryExpression:["argument"],AssignmentExpression:["left"],ImportSpecifier:["local"],ImportNamespaceSpecifier:["local"],ImportDefaultSpecifier:["local"],ImportDeclaration:["specifiers"],ExportSpecifier:["exported"],ExportNamespaceSpecifier:["exported"],ExportDefaultSpecifier:["exported"],FunctionDeclaration:["id","params"],FunctionExpression:["id","params"],ClassDeclaration:["id"],ClassExpression:["id"],RestElement:["argument"],UpdateExpression:["argument"],RestProperty:["argument"],ObjectProperty:["value"],AssignmentPattern:["left"],ArrayPattern:["elements"],ObjectPattern:["properties"],VariableDeclaration:["declarations"],VariableDeclarator:["id"]};

/***/ },

/***/ "./node_modules/babel-types/lib/validators.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function isBinding(e,r){var t=_retrievers.getBindingIdentifiers.keys[r.type];if(t)for(var i=0;i<t.length;i++){var s=t[i],n=r[s];if(Array.isArray(n)){if(n.indexOf(e)>=0)return!0}else if(n===e)return!0}return!1}function isReferenced(e,r){switch(r.type){case"BindExpression":return r.object===e||r.callee===e;case"MemberExpression":case"JSXMemberExpression":return!(r.property!==e||!r.computed)||r.object===e;case"MetaProperty":return!1;case"ObjectProperty":if(r.key===e)return r.computed;case"VariableDeclarator":return r.id!==e;case"ArrowFunctionExpression":case"FunctionDeclaration":case"FunctionExpression":for(var t=r.params,i=Array.isArray(t),s=0,t=i?t:(0,_getIterator3["default"])(t);;){var n;if(i){if(s>=t.length)break;n=t[s++]}else{if(s=t.next(),s.done)break;n=s.value}var a=n;if(a===e)return!1}return r.id!==e;case"ExportSpecifier":return!r.source&&r.local===e;case"ExportNamespaceSpecifier":case"ExportDefaultSpecifier":return!1;case"JSXAttribute":return r.name!==e;case"ClassProperty":return r.key===e?r.computed:r.value===e;case"ImportDefaultSpecifier":case"ImportNamespaceSpecifier":case"ImportSpecifier":return!1;case"ClassDeclaration":case"ClassExpression":return r.id!==e;case"ClassMethod":case"ObjectMethod":return r.key===e&&r.computed;case"LabeledStatement":return!1;case"CatchClause":return r.param!==e;case"RestElement":return!1;case"AssignmentExpression":return r.right===e;case"AssignmentPattern":return r.right===e;case"ObjectPattern":case"ArrayPattern":return!1}return!0}function isValidIdentifier(e){return"string"==typeof e&&!_esutils2["default"].keyword.isReservedWordES6(e,!0)&&_esutils2["default"].keyword.isIdentifierNameES6(e)}function isLet(e){return t.isVariableDeclaration(e)&&("var"!==e.kind||e[_constants.BLOCK_SCOPED_SYMBOL])}function isBlockScoped(e){return t.isFunctionDeclaration(e)||t.isClassDeclaration(e)||t.isLet(e)}function isVar(e){return t.isVariableDeclaration(e,{kind:"var"})&&!e[_constants.BLOCK_SCOPED_SYMBOL]}function isSpecifierDefault(e){return t.isImportDefaultSpecifier(e)||t.isIdentifier(e.imported||e.exported,{name:"default"})}function isScope(e,r){return(!t.isBlockStatement(e)||!t.isFunction(r,{body:e}))&&t.isScopable(e)}function isImmutable(e){return!!t.isType(e.type,"Immutable")||!!t.isIdentifier(e)&&"undefined"===e.name}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.isBinding=isBinding,exports.isReferenced=isReferenced,exports.isValidIdentifier=isValidIdentifier,exports.isLet=isLet,exports.isBlockScoped=isBlockScoped,exports.isVar=isVar,exports.isSpecifierDefault=isSpecifierDefault,exports.isScope=isScope,exports.isImmutable=isImmutable;var _retrievers=__webpack_require__("./node_modules/babel-types/lib/retrievers.js"),_esutils=__webpack_require__("./node_modules/esutils/lib/utils.js"),_esutils2=_interopRequireDefault(_esutils),_index=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_index),_constants=__webpack_require__("./node_modules/babel-types/lib/constants.js");

/***/ },

/***/ "./node_modules/esutils/lib/utils.js":
/***/ function(module, exports, __webpack_require__) {

	!function(){"use strict";exports.ast=__webpack_require__("./node_modules/esutils/lib/ast.js"),exports.code=__webpack_require__("./node_modules/esutils/lib/code.js"),exports.keyword=__webpack_require__("./node_modules/esutils/lib/keyword.js")}();

/***/ },

/***/ "./node_modules/esutils/lib/ast.js":
/***/ function(module, exports) {

	!function(){"use strict";function e(e){if(null==e)return!1;switch(e.type){case"ArrayExpression":case"AssignmentExpression":case"BinaryExpression":case"CallExpression":case"ConditionalExpression":case"FunctionExpression":case"Identifier":case"Literal":case"LogicalExpression":case"MemberExpression":case"NewExpression":case"ObjectExpression":case"SequenceExpression":case"ThisExpression":case"UnaryExpression":case"UpdateExpression":return!0}return!1}function t(e){if(null==e)return!1;switch(e.type){case"DoWhileStatement":case"ForInStatement":case"ForStatement":case"WhileStatement":return!0}return!1}function n(e){if(null==e)return!1;switch(e.type){case"BlockStatement":case"BreakStatement":case"ContinueStatement":case"DebuggerStatement":case"DoWhileStatement":case"EmptyStatement":case"ExpressionStatement":case"ForInStatement":case"ForStatement":case"IfStatement":case"LabeledStatement":case"ReturnStatement":case"SwitchStatement":case"ThrowStatement":case"TryStatement":case"VariableDeclaration":case"WhileStatement":case"WithStatement":return!0}return!1}function a(e){return n(e)||null!=e&&"FunctionDeclaration"===e.type}function s(e){switch(e.type){case"IfStatement":return null!=e.alternate?e.alternate:e.consequent;case"LabeledStatement":case"ForStatement":case"ForInStatement":case"WhileStatement":case"WithStatement":return e.body}return null}function r(e){var t;if("IfStatement"!==e.type)return!1;if(null==e.alternate)return!1;t=e.consequent;do{if("IfStatement"===t.type&&null==t.alternate)return!0;t=s(t)}while(t);return!1}module.exports={isExpression:e,isStatement:n,isIterationStatement:t,isSourceElement:a,isProblematicIfStatement:r,trailingStatement:s}}();

/***/ },

/***/ "./node_modules/esutils/lib/code.js":
/***/ function(module, exports) {

	!function(){"use strict";function u(u){return 48<=u&&u<=57}function D(u){return 48<=u&&u<=57||97<=u&&u<=102||65<=u&&u<=70}function A(u){return u>=48&&u<=55}function F(u){return 32===u||9===u||11===u||12===u||160===u||u>=5760&&x.indexOf(u)>=0}function C(u){return 10===u||13===u||8232===u||8233===u}function E(u){if(u<=65535)return String.fromCharCode(u);var D=String.fromCharCode(Math.floor((u-65536)/1024)+55296),A=String.fromCharCode((u-65536)%1024+56320);return D+A}function B(u){return u<128?o[u]:e.NonAsciiIdentifierStart.test(E(u))}function i(u){return u<128?f[u]:e.NonAsciiIdentifierPart.test(E(u))}function t(u){return u<128?o[u]:n.NonAsciiIdentifierStart.test(E(u))}function r(u){return u<128?f[u]:n.NonAsciiIdentifierPart.test(E(u))}var n,e,x,o,f,a;for(e={NonAsciiIdentifierStart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,NonAsciiIdentifierPart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/},n={NonAsciiIdentifierStart:/[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDE00-\uDE11\uDE13-\uDE2B\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDE00-\uDE2F\uDE44\uDE80-\uDEAA]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/,NonAsciiIdentifierPart:/[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/},x=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279],o=new Array(128),a=0;a<128;++a)o[a]=a>=97&&a<=122||a>=65&&a<=90||36===a||95===a;for(f=new Array(128),a=0;a<128;++a)f[a]=a>=97&&a<=122||a>=65&&a<=90||a>=48&&a<=57||36===a||95===a;module.exports={isDecimalDigit:u,isHexDigit:D,isOctalDigit:A,isWhiteSpace:F,isLineTerminator:C,isIdentifierStartES5:B,isIdentifierPartES5:i,isIdentifierStartES6:t,isIdentifierPartES6:r}}();

/***/ },

/***/ "./node_modules/esutils/lib/keyword.js":
/***/ function(module, exports, __webpack_require__) {

	!function(){"use strict";function e(e){switch(e){case"implements":case"interface":case"package":case"private":case"protected":case"public":case"static":case"let":return!0;default:return!1}}function r(e,r){return!(!r&&"yield"===e)&&t(e,r)}function t(r,t){if(t&&e(r))return!0;switch(r.length){case 2:return"if"===r||"in"===r||"do"===r;case 3:return"var"===r||"for"===r||"new"===r||"try"===r;case 4:return"this"===r||"else"===r||"case"===r||"void"===r||"with"===r||"enum"===r;case 5:return"while"===r||"break"===r||"catch"===r||"throw"===r||"const"===r||"yield"===r||"class"===r||"super"===r;case 6:return"return"===r||"typeof"===r||"delete"===r||"switch"===r||"export"===r||"import"===r;case 7:return"default"===r||"finally"===r||"extends"===r;case 8:return"function"===r||"continue"===r||"debugger"===r;case 10:return"instanceof"===r;default:return!1}}function n(e,t){return"null"===e||"true"===e||"false"===e||r(e,t)}function i(e,r){return"null"===e||"true"===e||"false"===e||t(e,r)}function u(e){return"eval"===e||"arguments"===e}function s(e){var r,t,n;if(0===e.length)return!1;if(n=e.charCodeAt(0),!d.isIdentifierStartES5(n))return!1;for(r=1,t=e.length;r<t;++r)if(n=e.charCodeAt(r),!d.isIdentifierPartES5(n))return!1;return!0}function c(e,r){return 1024*(e-55296)+(r-56320)+65536}function a(e){var r,t,n,i,u;if(0===e.length)return!1;for(u=d.isIdentifierStartES6,r=0,t=e.length;r<t;++r){if(n=e.charCodeAt(r),55296<=n&&n<=56319){if(++r,r>=t)return!1;if(i=e.charCodeAt(r),!(56320<=i&&i<=57343))return!1;n=c(n,i)}if(!u(n))return!1;u=d.isIdentifierPartES6}return!0}function f(e,r){return s(e)&&!n(e,r)}function o(e,r){return a(e)&&!i(e,r)}var d=__webpack_require__("./node_modules/esutils/lib/code.js");module.exports={isKeywordES5:r,isKeywordES6:t,isReservedWordES5:n,isReservedWordES6:i,isRestrictedWord:u,isIdentifierNameES5:s,isIdentifierNameES6:a,isIdentifierES5:f,isIdentifierES6:o}}();

/***/ },

/***/ "./node_modules/babel-types/lib/converters.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function toComputedKey(e){var i=arguments.length<=1||void 0===arguments[1]?e.key||e.property:arguments[1];return e.computed||t.isIdentifier(i)&&(i=t.stringLiteral(i.name)),i}function toSequenceExpression(e,i){function r(e){for(var s=!1,a=[],u=e,l=Array.isArray(u),f=0,u=l?u:(0,_getIterator3["default"])(u);;){var d;if(l){if(f>=u.length)break;d=u[f++]}else{if(f=u.next(),f.done)break;d=f.value}var p=d;if(t.isExpression(p))a.push(p);else if(t.isExpressionStatement(p))a.push(p.expression);else{if(t.isVariableDeclaration(p)){if("var"!==p.kind)return o=!0;for(var c=p.declarations,m=Array.isArray(c),_=0,c=m?c:(0,_getIterator3["default"])(c);;){var g;if(m){if(_>=c.length)break;g=c[_++]}else{if(_=c.next(),_.done)break;g=_.value}var x=g,y=t.getBindingIdentifiers(x);for(var v in y)n.push({kind:p.kind,id:y[v]});x.init&&a.push(t.assignmentExpression("=",x.id,x.init))}s=!0;continue}if(t.isIfStatement(p)){var b=p.consequent?r([p.consequent]):i.buildUndefinedNode(),E=p.alternate?r([p.alternate]):i.buildUndefinedNode();if(!b||!E)return o=!0;a.push(t.conditionalExpression(p.test,b,E))}else{if(!t.isBlockStatement(p)){if(t.isEmptyStatement(p)){s=!0;continue}return o=!0}a.push(r(p.body))}}s=!1}return(s||0===a.length)&&a.push(i.buildUndefinedNode()),1===a.length?a[0]:t.sequenceExpression(a)}if(e&&e.length){var n=[],o=!1,s=r(e);if(!o){for(var a=0;a<n.length;a++)i.push(n[a]);return s}}}function toKeyAlias(e){var i=arguments.length<=1||void 0===arguments[1]?e.key:arguments[1],r=void 0;return"method"===e.kind?toKeyAlias.increment()+"":(r=t.isIdentifier(i)?i.name:t.isStringLiteral(i)?(0,_stringify2["default"])(i.value):(0,_stringify2["default"])(t.removePropertiesDeep(t.cloneDeep(i))),e.computed&&(r="["+r+"]"),e["static"]&&(r="static:"+r),r)}function toIdentifier(e){return e+="",e=e.replace(/[^a-zA-Z0-9$_]/g,"-"),e=e.replace(/^[-0-9]+/,""),e=e.replace(/[-\s]+(.)?/g,function(e,t){return t?t.toUpperCase():""}),t.isValidIdentifier(e)||(e="_"+e),e||"_"}function toBindingIdentifierName(e){return e=toIdentifier(e),"eval"!==e&&"arguments"!==e||(e="_"+e),e}function toStatement(e,i){if(t.isStatement(e))return e;var r=!1,n=void 0;if(t.isClass(e))r=!0,n="ClassDeclaration";else if(t.isFunction(e))r=!0,n="FunctionDeclaration";else if(t.isAssignmentExpression(e))return t.expressionStatement(e);if(r&&!e.id&&(n=!1),!n){if(i)return!1;throw new Error("cannot turn "+e.type+" to a statement")}return e.type=n,e}function toExpression(e){if(t.isExpressionStatement(e)&&(e=e.expression),t.isExpression(e))return e;if(t.isClass(e)?e.type="ClassExpression":t.isFunction(e)&&(e.type="FunctionExpression"),!t.isExpression(e))throw new Error("cannot turn "+e.type+" to an expression");return e}function toBlock(e,i){return t.isBlockStatement(e)?e:(t.isEmptyStatement(e)&&(e=[]),Array.isArray(e)||(t.isStatement(e)||(e=t.isFunction(i)?t.returnStatement(e):t.expressionStatement(e)),e=[e]),t.blockStatement(e))}function valueToNode(e){if(void 0===e)return t.identifier("undefined");if(e===!0||e===!1)return t.booleanLiteral(e);if(null===e)return t.nullLiteral();if((0,_isString2["default"])(e))return t.stringLiteral(e);if((0,_isNumber2["default"])(e))return t.numericLiteral(e);if((0,_isRegExp2["default"])(e)){var i=e.source,r=e.toString().match(/\/([a-z]+|)$/)[1];return t.regExpLiteral(i,r)}if(Array.isArray(e))return t.arrayExpression(e.map(t.valueToNode));if((0,_isPlainObject2["default"])(e)){var n=[];for(var o in e){var s=void 0;s=t.isValidIdentifier(o)?t.identifier(o):t.stringLiteral(o),n.push(t.objectProperty(s,t.valueToNode(e[o])))}return t.objectExpression(n)}throw new Error("don't know how to turn this value into a node")}exports.__esModule=!0;var _maxSafeInteger=__webpack_require__("./node_modules/babel-runtime/core-js/number/max-safe-integer.js"),_maxSafeInteger2=_interopRequireDefault(_maxSafeInteger),_stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.toComputedKey=toComputedKey,exports.toSequenceExpression=toSequenceExpression,exports.toKeyAlias=toKeyAlias,exports.toIdentifier=toIdentifier,exports.toBindingIdentifierName=toBindingIdentifierName,exports.toStatement=toStatement,exports.toExpression=toExpression,exports.toBlock=toBlock,exports.valueToNode=valueToNode;var _isPlainObject=__webpack_require__("./node_modules/lodash/isPlainObject.js"),_isPlainObject2=_interopRequireDefault(_isPlainObject),_isNumber=__webpack_require__("./node_modules/lodash/isNumber.js"),_isNumber2=_interopRequireDefault(_isNumber),_isRegExp=__webpack_require__("./node_modules/lodash/isRegExp.js"),_isRegExp2=_interopRequireDefault(_isRegExp),_isString=__webpack_require__("./node_modules/lodash/isString.js"),_isString2=_interopRequireDefault(_isString),_index=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_index);toKeyAlias.uid=0,toKeyAlias.increment=function(){return toKeyAlias.uid>=_maxSafeInteger2["default"]?toKeyAlias.uid=0:toKeyAlias.uid++};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/number/max-safe-integer.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/number/max-safe-integer.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/number/max-safe-integer.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.number.max-safe-integer.js"),module.exports=9007199254740991;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.number.max-safe-integer.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js");$export($export.S,"Number",{MAX_SAFE_INTEGER:9007199254740991});

/***/ },

/***/ "./node_modules/lodash/isNumber.js":
/***/ function(module, exports, __webpack_require__) {

	function isNumber(e){return"number"==typeof e||isObjectLike(e)&&objectToString.call(e)==numberTag}var isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js"),numberTag="[object Number]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isNumber;

/***/ },

/***/ "./node_modules/lodash/isRegExp.js":
/***/ function(module, exports, __webpack_require__) {

	var baseIsRegExp=__webpack_require__("./node_modules/lodash/_baseIsRegExp.js"),baseUnary=__webpack_require__("./node_modules/lodash/_baseUnary.js"),nodeUtil=__webpack_require__("./node_modules/lodash/_nodeUtil.js"),nodeIsRegExp=nodeUtil&&nodeUtil.isRegExp,isRegExp=nodeIsRegExp?baseUnary(nodeIsRegExp):baseIsRegExp;module.exports=isRegExp;

/***/ },

/***/ "./node_modules/lodash/_baseIsRegExp.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIsRegExp(e){return isObject(e)&&objectToString.call(e)==regexpTag}var isObject=__webpack_require__("./node_modules/lodash/isObject.js"),regexpTag="[object RegExp]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=baseIsRegExp;

/***/ },

/***/ "./node_modules/lodash/isString.js":
/***/ function(module, exports, __webpack_require__) {

	function isString(t){return"string"==typeof t||!isArray(t)&&isObjectLike(t)&&objectToString.call(t)==stringTag}var isArray=__webpack_require__("./node_modules/lodash/isArray.js"),isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js"),stringTag="[object String]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isString;

/***/ },

/***/ "./node_modules/babel-types/lib/flow.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}function createUnionTypeAnnotation(e){var n=removeTypeDuplicates(e);return 1===n.length?n[0]:t.unionTypeAnnotation(n)}function removeTypeDuplicates(e){for(var n={},r={},i=[],o=[],a=0;a<e.length;a++){var p=e[a];if(p&&!(o.indexOf(p)>=0)){if(t.isAnyTypeAnnotation(p))return[p];if(t.isFlowBaseAnnotation(p))r[p.type]=p;else if(t.isUnionTypeAnnotation(p))i.indexOf(p.types)<0&&(e=e.concat(p.types),i.push(p.types));else if(t.isGenericTypeAnnotation(p)){var s=p.id.name;if(n[s]){var y=n[s];y.typeParameters?p.typeParameters&&(y.typeParameters.params=removeTypeDuplicates(y.typeParameters.params.concat(p.typeParameters.params))):y=p.typeParameters}else n[s]=p}else o.push(p)}}for(var u in r)o.push(r[u]);for(var f in n)o.push(n[f]);return o}function createTypeAnnotationBasedOnTypeof(e){if("string"===e)return t.stringTypeAnnotation();if("number"===e)return t.numberTypeAnnotation();if("undefined"===e)return t.voidTypeAnnotation();if("boolean"===e)return t.booleanTypeAnnotation();if("function"===e)return t.genericTypeAnnotation(t.identifier("Function"));if("object"===e)return t.genericTypeAnnotation(t.identifier("Object"));if("symbol"===e)return t.genericTypeAnnotation(t.identifier("Symbol"));throw new Error("Invalid typeof value")}exports.__esModule=!0,exports.createUnionTypeAnnotation=createUnionTypeAnnotation,exports.removeTypeDuplicates=removeTypeDuplicates,exports.createTypeAnnotationBasedOnTypeof=createTypeAnnotationBasedOnTypeof;var _index=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_index);

/***/ },

/***/ "./node_modules/to-fast-properties/index.js":
/***/ function(module, exports) {

	"use strict";module.exports=function t(o){function e(){}e.prototype=o,new e};

/***/ },

/***/ "./node_modules/lodash/compact.js":
/***/ function(module, exports) {

	function compact(o){for(var r=-1,t=o?o.length:0,c=0,a=[];++r<t;){var e=o[r];e&&(a[c++]=e)}return a}module.exports=compact;

/***/ },

/***/ "./node_modules/lodash/clone.js":
/***/ function(module, exports, __webpack_require__) {

	function clone(e){return baseClone(e,!1,!0)}var baseClone=__webpack_require__("./node_modules/lodash/_baseClone.js");module.exports=clone;

/***/ },

/***/ "./node_modules/lodash/each.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/lodash/forEach.js");

/***/ },

/***/ "./node_modules/lodash/forEach.js":
/***/ function(module, exports, __webpack_require__) {

	function forEach(r,a){var e=isArray(r)?arrayEach:baseEach;return e(r,baseIteratee(a,3))}var arrayEach=__webpack_require__("./node_modules/lodash/_arrayEach.js"),baseEach=__webpack_require__("./node_modules/lodash/_baseEach.js"),baseIteratee=__webpack_require__("./node_modules/lodash/_baseIteratee.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js");module.exports=forEach;

/***/ },

/***/ "./node_modules/lodash/_baseEach.js":
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn=__webpack_require__("./node_modules/lodash/_baseForOwn.js"),createBaseEach=__webpack_require__("./node_modules/lodash/_createBaseEach.js"),baseEach=createBaseEach(baseForOwn);module.exports=baseEach;

/***/ },

/***/ "./node_modules/lodash/_baseForOwn.js":
/***/ function(module, exports, __webpack_require__) {

	function baseForOwn(e,r){return e&&baseFor(e,r,keys)}var baseFor=__webpack_require__("./node_modules/lodash/_baseFor.js"),keys=__webpack_require__("./node_modules/lodash/keys.js");module.exports=baseForOwn;

/***/ },

/***/ "./node_modules/lodash/_baseFor.js":
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor=__webpack_require__("./node_modules/lodash/_createBaseFor.js"),baseFor=createBaseFor();module.exports=baseFor;

/***/ },

/***/ "./node_modules/lodash/_createBaseFor.js":
/***/ function(module, exports) {

	function createBaseFor(e){return function(r,t,a){for(var n=-1,o=Object(r),c=a(r),u=c.length;u--;){var f=c[e?u:++n];if(t(o[f],f,o)===!1)break}return r}}module.exports=createBaseFor;

/***/ },

/***/ "./node_modules/lodash/_createBaseEach.js":
/***/ function(module, exports, __webpack_require__) {

	function createBaseEach(r,e){return function(a,i){if(null==a)return a;if(!isArrayLike(a))return r(a,i);for(var t=a.length,n=e?t:-1,u=Object(a);(e?n--:++n<t)&&i(u[n],n,u)!==!1;);return a}}var isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js");module.exports=createBaseEach;

/***/ },

/***/ "./node_modules/lodash/_baseIteratee.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIteratee(e){return"function"==typeof e?e:null==e?identity:"object"==typeof e?isArray(e)?baseMatchesProperty(e[0],e[1]):baseMatches(e):property(e)}var baseMatches=__webpack_require__("./node_modules/lodash/_baseMatches.js"),baseMatchesProperty=__webpack_require__("./node_modules/lodash/_baseMatchesProperty.js"),identity=__webpack_require__("./node_modules/lodash/identity.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js"),property=__webpack_require__("./node_modules/lodash/property.js");module.exports=baseIteratee;

/***/ },

/***/ "./node_modules/lodash/_baseMatches.js":
/***/ function(module, exports, __webpack_require__) {

	function baseMatches(a){var t=getMatchData(a);return 1==t.length&&t[0][2]?matchesStrictComparable(t[0][0],t[0][1]):function(e){return e===a||baseIsMatch(e,a,t)}}var baseIsMatch=__webpack_require__("./node_modules/lodash/_baseIsMatch.js"),getMatchData=__webpack_require__("./node_modules/lodash/_getMatchData.js"),matchesStrictComparable=__webpack_require__("./node_modules/lodash/_matchesStrictComparable.js");module.exports=baseMatches;

/***/ },

/***/ "./node_modules/lodash/_baseIsMatch.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIsMatch(r,e,a,t){var i=a.length,u=i,n=!t;if(null==r)return!u;for(r=Object(r);i--;){var s=a[i];if(n&&s[2]?s[1]!==r[s[0]]:!(s[0]in r))return!1}for(;++i<u;){s=a[i];var A=s[0],E=r[A],R=s[1];if(n&&s[2]){if(void 0===E&&!(A in r))return!1}else{var _=new Stack;if(t)var f=t(E,R,A,r,e,_);if(!(void 0===f?baseIsEqual(R,E,t,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG,_):f))return!1}}return!0}var Stack=__webpack_require__("./node_modules/lodash/_Stack.js"),baseIsEqual=__webpack_require__("./node_modules/lodash/_baseIsEqual.js"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=baseIsMatch;

/***/ },

/***/ "./node_modules/lodash/_baseIsEqual.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIsEqual(e,s,u,a,i){return e===s||(null==e||null==s||!isObject(e)&&!isObjectLike(s)?e!==e&&s!==s:baseIsEqualDeep(e,s,baseIsEqual,u,a,i))}var baseIsEqualDeep=__webpack_require__("./node_modules/lodash/_baseIsEqualDeep.js"),isObject=__webpack_require__("./node_modules/lodash/isObject.js"),isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js");module.exports=baseIsEqual;

/***/ },

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIsEqualDeep(r,e,a,t,u,s){var g=isArray(r),i=isArray(e),y=arrayTag,c=arrayTag;g||(y=getTag(r),y=y==argsTag?objectTag:y),i||(c=getTag(e),c=c==argsTag?objectTag:c);var o=y==objectTag,T=c==objectTag,A=y==c;if(A&&isBuffer(r)){if(!isBuffer(e))return!1;g=!0,o=!1}if(A&&!o)return s||(s=new Stack),g||isTypedArray(r)?equalArrays(r,e,a,t,u,s):equalByTag(r,e,y,a,t,u,s);if(!(u&PARTIAL_COMPARE_FLAG)){var q=o&&hasOwnProperty.call(r,"__wrapped__"),l=T&&hasOwnProperty.call(e,"__wrapped__");if(q||l){var b=q?r.value():r,_=l?e.value():e;return s||(s=new Stack),a(b,_,t,u,s)}}return!!A&&(s||(s=new Stack),equalObjects(r,e,a,t,u,s))}var Stack=__webpack_require__("./node_modules/lodash/_Stack.js"),equalArrays=__webpack_require__("./node_modules/lodash/_equalArrays.js"),equalByTag=__webpack_require__("./node_modules/lodash/_equalByTag.js"),equalObjects=__webpack_require__("./node_modules/lodash/_equalObjects.js"),getTag=__webpack_require__("./node_modules/lodash/_getTag.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js"),isBuffer=__webpack_require__("./node_modules/lodash/isBuffer.js"),isTypedArray=__webpack_require__("./node_modules/lodash/isTypedArray.js"),PARTIAL_COMPARE_FLAG=2,argsTag="[object Arguments]",arrayTag="[object Array]",objectTag="[object Object]",objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=baseIsEqualDeep;

/***/ },

/***/ "./node_modules/lodash/_equalArrays.js":
/***/ function(module, exports, __webpack_require__) {

	function equalArrays(e,r,a,t,i,u){var A=i&PARTIAL_COMPARE_FLAG,n=e.length,c=r.length;if(n!=c&&!(A&&c>n))return!1;var f=u.get(e);if(f&&u.get(r))return f==r;var o=-1,_=!0,s=i&UNORDERED_COMPARE_FLAG?new SetCache:void 0;for(u.set(e,r),u.set(r,e);++o<n;){var R=e[o],h=r[o];if(t)var l=A?t(h,R,o,r,e,u):t(R,h,o,e,r,u);if(void 0!==l){if(l)continue;_=!1;break}if(s){if(!arraySome(r,function(e,r){if(!cacheHas(s,r)&&(R===e||a(R,e,t,i,u)))return s.push(r)})){_=!1;break}}else if(R!==h&&!a(R,h,t,i,u)){_=!1;break}}return u["delete"](e),u["delete"](r),_}var SetCache=__webpack_require__("./node_modules/lodash/_SetCache.js"),arraySome=__webpack_require__("./node_modules/lodash/_arraySome.js"),cacheHas=__webpack_require__("./node_modules/lodash/_cacheHas.js"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=equalArrays;

/***/ },

/***/ "./node_modules/lodash/_SetCache.js":
/***/ function(module, exports, __webpack_require__) {

	function SetCache(e){var a=-1,t=e?e.length:0;for(this.__data__=new MapCache;++a<t;)this.add(e[a])}var MapCache=__webpack_require__("./node_modules/lodash/_MapCache.js"),setCacheAdd=__webpack_require__("./node_modules/lodash/_setCacheAdd.js"),setCacheHas=__webpack_require__("./node_modules/lodash/_setCacheHas.js");SetCache.prototype.add=SetCache.prototype.push=setCacheAdd,SetCache.prototype.has=setCacheHas,module.exports=SetCache;

/***/ },

/***/ "./node_modules/lodash/_setCacheAdd.js":
/***/ function(module, exports) {

	function setCacheAdd(_){return this.__data__.set(_,HASH_UNDEFINED),this}var HASH_UNDEFINED="__lodash_hash_undefined__";module.exports=setCacheAdd;

/***/ },

/***/ "./node_modules/lodash/_setCacheHas.js":
/***/ function(module, exports) {

	function setCacheHas(a){return this.__data__.has(a)}module.exports=setCacheHas;

/***/ },

/***/ "./node_modules/lodash/_arraySome.js":
/***/ function(module, exports) {

	function arraySome(r,e){for(var o=-1,a=r?r.length:0;++o<a;)if(e(r[o],o,r))return!0;return!1}module.exports=arraySome;

/***/ },

/***/ "./node_modules/lodash/_cacheHas.js":
/***/ function(module, exports) {

	function cacheHas(a,c){return a.has(c)}module.exports=cacheHas;

/***/ },

/***/ "./node_modules/lodash/_equalByTag.js":
/***/ function(module, exports, __webpack_require__) {

	function equalByTag(e,r,a,t,o,s,y){switch(a){case dataViewTag:if(e.byteLength!=r.byteLength||e.byteOffset!=r.byteOffset)return!1;e=e.buffer,r=r.buffer;case arrayBufferTag:return!(e.byteLength!=r.byteLength||!t(new Uint8Array(e),new Uint8Array(r)));case boolTag:case dateTag:case numberTag:return eq(+e,+r);case errorTag:return e.name==r.name&&e.message==r.message;case regexpTag:case stringTag:return e==r+"";case mapTag:var b=mapToArray;case setTag:var g=s&PARTIAL_COMPARE_FLAG;if(b||(b=setToArray),e.size!=r.size&&!g)return!1;var u=y.get(e);if(u)return u==r;s|=UNORDERED_COMPARE_FLAG,y.set(e,r);var l=equalArrays(b(e),b(r),t,o,s,y);return y["delete"](e),l;case symbolTag:if(symbolValueOf)return symbolValueOf.call(e)==symbolValueOf.call(r)}return!1}var Symbol=__webpack_require__("./node_modules/lodash/_Symbol.js"),Uint8Array=__webpack_require__("./node_modules/lodash/_Uint8Array.js"),eq=__webpack_require__("./node_modules/lodash/eq.js"),equalArrays=__webpack_require__("./node_modules/lodash/_equalArrays.js"),mapToArray=__webpack_require__("./node_modules/lodash/_mapToArray.js"),setToArray=__webpack_require__("./node_modules/lodash/_setToArray.js"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2,boolTag="[object Boolean]",dateTag="[object Date]",errorTag="[object Error]",mapTag="[object Map]",numberTag="[object Number]",regexpTag="[object RegExp]",setTag="[object Set]",stringTag="[object String]",symbolTag="[object Symbol]",arrayBufferTag="[object ArrayBuffer]",dataViewTag="[object DataView]",symbolProto=Symbol?Symbol.prototype:void 0,symbolValueOf=symbolProto?symbolProto.valueOf:void 0;module.exports=equalByTag;

/***/ },

/***/ "./node_modules/lodash/_equalObjects.js":
/***/ function(module, exports, __webpack_require__) {

	function equalObjects(r,t,e,o,n,c){var a=n&PARTIAL_COMPARE_FLAG,s=keys(r),i=s.length,u=keys(t),f=u.length;if(i!=f&&!a)return!1;for(var v=i;v--;){var y=s[v];if(!(a?y in t:hasOwnProperty.call(t,y)))return!1}var l=c.get(r);if(l&&c.get(t))return l==t;var P=!0;c.set(r,t),c.set(t,r);for(var p=a;++v<i;){y=s[v];var A=r[y],O=t[y];if(o)var b=a?o(O,A,y,t,r,c):o(A,O,y,r,t,c);if(!(void 0===b?A===O||e(A,O,o,n,c):b)){P=!1;break}p||(p="constructor"==y)}if(P&&!p){var h=r.constructor,j=t.constructor;h!=j&&"constructor"in r&&"constructor"in t&&!("function"==typeof h&&h instanceof h&&"function"==typeof j&&j instanceof j)&&(P=!1)}return c["delete"](r),c["delete"](t),P}var keys=__webpack_require__("./node_modules/lodash/keys.js"),PARTIAL_COMPARE_FLAG=2,objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=equalObjects;

/***/ },

/***/ "./node_modules/lodash/_getMatchData.js":
/***/ function(module, exports, __webpack_require__) {

	function getMatchData(r){for(var e=keys(r),t=e.length;t--;){var a=e[t],i=r[a];e[t]=[a,i,isStrictComparable(i)]}return e}var isStrictComparable=__webpack_require__("./node_modules/lodash/_isStrictComparable.js"),keys=__webpack_require__("./node_modules/lodash/keys.js");module.exports=getMatchData;

/***/ },

/***/ "./node_modules/lodash/_isStrictComparable.js":
/***/ function(module, exports, __webpack_require__) {

	function isStrictComparable(e){return e===e&&!isObject(e)}var isObject=__webpack_require__("./node_modules/lodash/isObject.js");module.exports=isStrictComparable;

/***/ },

/***/ "./node_modules/lodash/_matchesStrictComparable.js":
/***/ function(module, exports) {

	function matchesStrictComparable(t,e){return function(r){return null!=r&&(r[t]===e&&(void 0!==e||t in Object(r)))}}module.exports=matchesStrictComparable;

/***/ },

/***/ "./node_modules/lodash/_baseMatchesProperty.js":
/***/ function(module, exports, __webpack_require__) {

	function baseMatchesProperty(e,r){return isKey(e)&&isStrictComparable(r)?matchesStrictComparable(toKey(e),r):function(a){var t=get(a,e);return void 0===t&&t===r?hasIn(a,e):baseIsEqual(r,t,void 0,UNORDERED_COMPARE_FLAG|PARTIAL_COMPARE_FLAG)}}var baseIsEqual=__webpack_require__("./node_modules/lodash/_baseIsEqual.js"),get=__webpack_require__("./node_modules/lodash/get.js"),hasIn=__webpack_require__("./node_modules/lodash/hasIn.js"),isKey=__webpack_require__("./node_modules/lodash/_isKey.js"),isStrictComparable=__webpack_require__("./node_modules/lodash/_isStrictComparable.js"),matchesStrictComparable=__webpack_require__("./node_modules/lodash/_matchesStrictComparable.js"),toKey=__webpack_require__("./node_modules/lodash/_toKey.js"),UNORDERED_COMPARE_FLAG=1,PARTIAL_COMPARE_FLAG=2;module.exports=baseMatchesProperty;

/***/ },

/***/ "./node_modules/lodash/get.js":
/***/ function(module, exports, __webpack_require__) {

	function get(e,t,r){var a=null==e?void 0:baseGet(e,t);return void 0===a?r:a}var baseGet=__webpack_require__("./node_modules/lodash/_baseGet.js");module.exports=get;

/***/ },

/***/ "./node_modules/lodash/_baseGet.js":
/***/ function(module, exports, __webpack_require__) {

	function baseGet(e,t){t=isKey(t,e)?[t]:castPath(t);for(var r=0,a=t.length;null!=e&&r<a;)e=e[toKey(t[r++])];return r&&r==a?e:void 0}var castPath=__webpack_require__("./node_modules/lodash/_castPath.js"),isKey=__webpack_require__("./node_modules/lodash/_isKey.js"),toKey=__webpack_require__("./node_modules/lodash/_toKey.js");module.exports=baseGet;

/***/ },

/***/ "./node_modules/lodash/hasIn.js":
/***/ function(module, exports, __webpack_require__) {

	function hasIn(a,s){return null!=a&&hasPath(a,s,baseHasIn)}var baseHasIn=__webpack_require__("./node_modules/lodash/_baseHasIn.js"),hasPath=__webpack_require__("./node_modules/lodash/_hasPath.js");module.exports=hasIn;

/***/ },

/***/ "./node_modules/lodash/_baseHasIn.js":
/***/ function(module, exports) {

	function baseHasIn(n,e){return null!=n&&e in Object(n)}module.exports=baseHasIn;

/***/ },

/***/ "./node_modules/lodash/property.js":
/***/ function(module, exports, __webpack_require__) {

	function property(e){return isKey(e)?baseProperty(toKey(e)):basePropertyDeep(e)}var baseProperty=__webpack_require__("./node_modules/lodash/_baseProperty.js"),basePropertyDeep=__webpack_require__("./node_modules/lodash/_basePropertyDeep.js"),isKey=__webpack_require__("./node_modules/lodash/_isKey.js"),toKey=__webpack_require__("./node_modules/lodash/_toKey.js");module.exports=property;

/***/ },

/***/ "./node_modules/lodash/_baseProperty.js":
/***/ function(module, exports) {

	function baseProperty(r){return function(e){return null==e?void 0:e[r]}}module.exports=baseProperty;

/***/ },

/***/ "./node_modules/lodash/_basePropertyDeep.js":
/***/ function(module, exports, __webpack_require__) {

	function basePropertyDeep(e){return function(r){return baseGet(r,e)}}var baseGet=__webpack_require__("./node_modules/lodash/_baseGet.js");module.exports=basePropertyDeep;

/***/ },

/***/ "./node_modules/lodash/uniq.js":
/***/ function(module, exports, __webpack_require__) {

	function uniq(e){return e&&e.length?baseUniq(e):[]}var baseUniq=__webpack_require__("./node_modules/lodash/_baseUniq.js");module.exports=uniq;

/***/ },

/***/ "./node_modules/lodash/_baseUniq.js":
/***/ function(module, exports, __webpack_require__) {

	function baseUniq(e,r,a){var s=-1,t=arrayIncludes,u=e.length,c=!0,i=[],n=i;if(a)c=!1,t=arrayIncludesWith;else if(u>=LARGE_ARRAY_SIZE){var h=r?null:createSet(e);if(h)return setToArray(h);c=!1,t=cacheHas,n=new SetCache}else n=r?[]:i;e:for(;++s<u;){var l=e[s],_=r?r(l):l;if(l=a||0!==l?l:0,c&&_===_){for(var o=n.length;o--;)if(n[o]===_)continue e;r&&n.push(_),i.push(l)}else t(n,_,a)||(n!==i&&n.push(_),i.push(l))}return i}var SetCache=__webpack_require__("./node_modules/lodash/_SetCache.js"),arrayIncludes=__webpack_require__("./node_modules/lodash/_arrayIncludes.js"),arrayIncludesWith=__webpack_require__("./node_modules/lodash/_arrayIncludesWith.js"),cacheHas=__webpack_require__("./node_modules/lodash/_cacheHas.js"),createSet=__webpack_require__("./node_modules/lodash/_createSet.js"),setToArray=__webpack_require__("./node_modules/lodash/_setToArray.js"),LARGE_ARRAY_SIZE=200;module.exports=baseUniq;

/***/ },

/***/ "./node_modules/lodash/_arrayIncludes.js":
/***/ function(module, exports, __webpack_require__) {

	function arrayIncludes(e,r){var a=e?e.length:0;return!!a&&baseIndexOf(e,r,0)>-1}var baseIndexOf=__webpack_require__("./node_modules/lodash/_baseIndexOf.js");module.exports=arrayIncludes;

/***/ },

/***/ "./node_modules/lodash/_baseIndexOf.js":
/***/ function(module, exports, __webpack_require__) {

	function baseIndexOf(e,s,n){return s===s?strictIndexOf(e,s,n):baseFindIndex(e,baseIsNaN,n)}var baseFindIndex=__webpack_require__("./node_modules/lodash/_baseFindIndex.js"),baseIsNaN=__webpack_require__("./node_modules/lodash/_baseIsNaN.js"),strictIndexOf=__webpack_require__("./node_modules/lodash/_strictIndexOf.js");module.exports=baseIndexOf;

/***/ },

/***/ "./node_modules/lodash/_baseFindIndex.js":
/***/ function(module, exports) {

	function baseFindIndex(e,n,r,d){for(var t=e.length,i=r+(d?1:-1);d?i--:++i<t;)if(n(e[i],i,e))return i;return-1}module.exports=baseFindIndex;

/***/ },

/***/ "./node_modules/lodash/_baseIsNaN.js":
/***/ function(module, exports) {

	function baseIsNaN(e){return e!==e}module.exports=baseIsNaN;

/***/ },

/***/ "./node_modules/lodash/_strictIndexOf.js":
/***/ function(module, exports) {

	function strictIndexOf(r,t,e){for(var n=e-1,f=r.length;++n<f;)if(r[n]===t)return n;return-1}module.exports=strictIndexOf;

/***/ },

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/***/ function(module, exports) {

	function arrayIncludesWith(r,e,n){for(var t=-1,u=r?r.length:0;++t<u;)if(n(e,r[t]))return!0;return!1}module.exports=arrayIncludesWith;

/***/ },

/***/ "./node_modules/lodash/_createSet.js":
/***/ function(module, exports, __webpack_require__) {

	var Set=__webpack_require__("./node_modules/lodash/_Set.js"),noop=__webpack_require__("./node_modules/lodash/noop.js"),setToArray=__webpack_require__("./node_modules/lodash/_setToArray.js"),INFINITY=1/0,createSet=Set&&1/setToArray(new Set([,-0]))[1]==INFINITY?function(e){return new Set(e)}:noop;module.exports=createSet;

/***/ },

/***/ "./node_modules/lodash/noop.js":
/***/ function(module, exports) {

	function noop(){}module.exports=noop;

/***/ },

/***/ "./node_modules/babel-types/lib/definitions/init.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";__webpack_require__("./node_modules/babel-types/lib/definitions/index.js"),__webpack_require__("./node_modules/babel-types/lib/definitions/core.js"),__webpack_require__("./node_modules/babel-types/lib/definitions/es2015.js"),__webpack_require__("./node_modules/babel-types/lib/definitions/flow.js"),__webpack_require__("./node_modules/babel-types/lib/definitions/jsx.js"),__webpack_require__("./node_modules/babel-types/lib/definitions/misc.js"),__webpack_require__("./node_modules/babel-types/lib/definitions/experimental.js");

/***/ },

/***/ "./node_modules/babel-types/lib/definitions/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getType(e){return Array.isArray(e)?"array":null===e?"null":void 0===e?"undefined":"undefined"==typeof e?"undefined":(0,_typeof3["default"])(e)}function assertEach(e){function r(r,t,i){if(Array.isArray(i))for(var a=0;a<i.length;a++)e(r,t+"["+a+"]",i[a])}return r.each=e,r}function assertOneOf(){function e(e,r,i){if(t.indexOf(i)<0)throw new TypeError("Property "+r+" expected value to be one of "+(0,_stringify2["default"])(t)+" but got "+(0,_stringify2["default"])(i))}for(var r=arguments.length,t=Array(r),i=0;i<r;i++)t[i]=arguments[i];return e.oneOf=t,e}function assertNodeType(){function e(e,r,a){for(var o=!1,n=i,s=Array.isArray(n),f=0,n=s?n:(0,_getIterator3["default"])(n);;){var u;if(s){if(f>=n.length)break;u=n[f++]}else{if(f=n.next(),f.done)break;u=f.value}var l=u;if(t.is(l,a)){o=!0;break}}if(!o)throw new TypeError("Property "+r+" of "+e.type+" expected node to be of a type "+(0,_stringify2["default"])(i)+" but instead got "+(0,_stringify2["default"])(a&&a.type))}for(var r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];return e.oneOfNodeTypes=i,e}function assertNodeOrValueType(){function e(e,r,a){for(var o=!1,n=i,s=Array.isArray(n),f=0,n=s?n:(0,_getIterator3["default"])(n);;){var u;if(s){if(f>=n.length)break;u=n[f++]}else{if(f=n.next(),f.done)break;u=f.value}var l=u;if(getType(a)===l||t.is(l,a)){o=!0;break}}if(!o)throw new TypeError("Property "+r+" of "+e.type+" expected node to be of a type "+(0,_stringify2["default"])(i)+" but instead got "+(0,_stringify2["default"])(a&&a.type))}for(var r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];return e.oneOfNodeOrValueTypes=i,e}function assertValueType(e){function r(r,t,i){var a=getType(i)===e;if(!a)throw new TypeError("Property "+t+" expected type of "+e+" but got "+getType(i))}return r.type=e,r}function chain(){function e(){for(var e=t,r=Array.isArray(e),i=0,e=r?e:(0,_getIterator3["default"])(e);;){var a;if(r){if(i>=e.length)break;a=e[i++]}else{if(i=e.next(),i.done)break;a=i.value}var o=a;o.apply(void 0,arguments)}}for(var r=arguments.length,t=Array(r),i=0;i<r;i++)t[i]=arguments[i];return e.chainOf=t,e}function defineType(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t=r.inherits&&store[r.inherits]||{};r.fields=r.fields||t.fields||{},r.visitor=r.visitor||t.visitor||[],r.aliases=r.aliases||t.aliases||[],r.builder=r.builder||t.builder||r.visitor||[],r.deprecatedAlias&&(DEPRECATED_KEYS[r.deprecatedAlias]=e);for(var i=r.visitor.concat(r.builder),a=Array.isArray(i),o=0,i=a?i:(0,_getIterator3["default"])(i);;){var n;if(a){if(o>=i.length)break;n=i[o++]}else{if(o=i.next(),o.done)break;n=o.value}var s=n;r.fields[s]=r.fields[s]||{}}for(var f in r.fields){var u=r.fields[f];r.builder.indexOf(f)===-1&&(u.optional=!0),void 0===u["default"]?u["default"]=null:u.validate||(u.validate=assertValueType(getType(u["default"])))}VISITOR_KEYS[e]=r.visitor,BUILDER_KEYS[e]=r.builder,NODE_FIELDS[e]=r.fields,ALIAS_KEYS[e]=r.aliases,store[e]=r}exports.__esModule=!0,exports.DEPRECATED_KEYS=exports.BUILDER_KEYS=exports.NODE_FIELDS=exports.ALIAS_KEYS=exports.VISITOR_KEYS=void 0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2);exports.assertEach=assertEach,exports.assertOneOf=assertOneOf,exports.assertNodeType=assertNodeType,exports.assertNodeOrValueType=assertNodeOrValueType,exports.assertValueType=assertValueType,exports.chain=chain,exports["default"]=defineType;var _index=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_index),VISITOR_KEYS=exports.VISITOR_KEYS={},ALIAS_KEYS=exports.ALIAS_KEYS={},NODE_FIELDS=exports.NODE_FIELDS={},BUILDER_KEYS=exports.BUILDER_KEYS={},DEPRECATED_KEYS=exports.DEPRECATED_KEYS={},store={};

/***/ },

/***/ "./node_modules/babel-types/lib/definitions/core.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var a={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(a[t]=e[t]);return a["default"]=e,a}var _index=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_index),_constants=__webpack_require__("./node_modules/babel-types/lib/constants.js"),_index2=__webpack_require__("./node_modules/babel-types/lib/definitions/index.js"),_index3=_interopRequireDefault(_index2);(0,_index3["default"])("ArrayExpression",{fields:{elements:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeOrValueType)("null","Expression","SpreadElement"))),"default":[]}},visitor:["elements"],aliases:["Expression"]}),(0,_index3["default"])("AssignmentExpression",{fields:{operator:{validate:(0,_index2.assertValueType)("string")},left:{validate:(0,_index2.assertNodeType)("LVal")},right:{validate:(0,_index2.assertNodeType)("Expression")}},builder:["operator","left","right"],visitor:["left","right"],aliases:["Expression"]}),(0,_index3["default"])("BinaryExpression",{builder:["operator","left","right"],fields:{operator:{validate:_index2.assertOneOf.apply(void 0,_constants.BINARY_OPERATORS)},left:{validate:(0,_index2.assertNodeType)("Expression")},right:{validate:(0,_index2.assertNodeType)("Expression")}},visitor:["left","right"],aliases:["Binary","Expression"]}),(0,_index3["default"])("Directive",{visitor:["value"],fields:{value:{validate:(0,_index2.assertNodeType)("DirectiveLiteral")}}}),(0,_index3["default"])("DirectiveLiteral",{builder:["value"],fields:{value:{validate:(0,_index2.assertValueType)("string")}}}),(0,_index3["default"])("BlockStatement",{builder:["body","directives"],visitor:["directives","body"],fields:{directives:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Directive"))),"default":[]},body:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Statement")))}},aliases:["Scopable","BlockParent","Block","Statement"]}),(0,_index3["default"])("BreakStatement",{visitor:["label"],fields:{label:{validate:(0,_index2.assertNodeType)("Identifier"),optional:!0}},aliases:["Statement","Terminatorless","CompletionStatement"]}),(0,_index3["default"])("CallExpression",{visitor:["callee","arguments"],fields:{callee:{validate:(0,_index2.assertNodeType)("Expression")},arguments:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Expression","SpreadElement")))}},aliases:["Expression"]}),(0,_index3["default"])("CatchClause",{visitor:["param","body"],fields:{param:{validate:(0,_index2.assertNodeType)("Identifier")},body:{validate:(0,_index2.assertNodeType)("BlockStatement")}},aliases:["Scopable"]}),(0,_index3["default"])("ConditionalExpression",{visitor:["test","consequent","alternate"],fields:{test:{validate:(0,_index2.assertNodeType)("Expression")},consequent:{validate:(0,_index2.assertNodeType)("Expression")},alternate:{validate:(0,_index2.assertNodeType)("Expression")}},aliases:["Expression","Conditional"]}),(0,_index3["default"])("ContinueStatement",{visitor:["label"],fields:{label:{validate:(0,_index2.assertNodeType)("Identifier"),optional:!0}},aliases:["Statement","Terminatorless","CompletionStatement"]}),(0,_index3["default"])("DebuggerStatement",{aliases:["Statement"]}),(0,_index3["default"])("DoWhileStatement",{visitor:["test","body"],fields:{test:{validate:(0,_index2.assertNodeType)("Expression")},body:{validate:(0,_index2.assertNodeType)("Statement")}},aliases:["Statement","BlockParent","Loop","While","Scopable"]}),(0,_index3["default"])("EmptyStatement",{aliases:["Statement"]}),(0,_index3["default"])("ExpressionStatement",{visitor:["expression"],fields:{expression:{validate:(0,_index2.assertNodeType)("Expression")}},aliases:["Statement","ExpressionWrapper"]}),(0,_index3["default"])("File",{builder:["program","comments","tokens"],visitor:["program"],fields:{program:{validate:(0,_index2.assertNodeType)("Program")}}}),(0,_index3["default"])("ForInStatement",{visitor:["left","right","body"],aliases:["Scopable","Statement","For","BlockParent","Loop","ForXStatement"],fields:{left:{validate:(0,_index2.assertNodeType)("VariableDeclaration","LVal")},right:{validate:(0,_index2.assertNodeType)("Expression")},body:{validate:(0,_index2.assertNodeType)("Statement")}}}),(0,_index3["default"])("ForStatement",{visitor:["init","test","update","body"],aliases:["Scopable","Statement","For","BlockParent","Loop"],fields:{init:{validate:(0,_index2.assertNodeType)("VariableDeclaration","Expression"),optional:!0},test:{validate:(0,_index2.assertNodeType)("Expression"),optional:!0},update:{validate:(0,_index2.assertNodeType)("Expression"),optional:!0},body:{validate:(0,_index2.assertNodeType)("Statement")}}}),(0,_index3["default"])("FunctionDeclaration",{builder:["id","params","body","generator","async"],visitor:["id","params","body","returnType","typeParameters"],fields:{id:{validate:(0,_index2.assertNodeType)("Identifier")},params:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("LVal")))},body:{validate:(0,_index2.assertNodeType)("BlockStatement")},generator:{"default":!1,validate:(0,_index2.assertValueType)("boolean")},async:{"default":!1,validate:(0,_index2.assertValueType)("boolean")}},aliases:["Scopable","Function","BlockParent","FunctionParent","Statement","Pureish","Declaration"]}),(0,_index3["default"])("FunctionExpression",{inherits:"FunctionDeclaration",aliases:["Scopable","Function","BlockParent","FunctionParent","Expression","Pureish"],fields:{id:{validate:(0,_index2.assertNodeType)("Identifier"),optional:!0},params:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("LVal")))},body:{validate:(0,_index2.assertNodeType)("BlockStatement")},generator:{"default":!1,validate:(0,_index2.assertValueType)("boolean")},async:{"default":!1,validate:(0,_index2.assertValueType)("boolean")}}}),(0,_index3["default"])("Identifier",{builder:["name"],visitor:["typeAnnotation"],aliases:["Expression","LVal"],fields:{name:{validate:function(e,a,i){!t.isValidIdentifier(i)}},decorators:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Decorator")))}}}),(0,_index3["default"])("IfStatement",{visitor:["test","consequent","alternate"],aliases:["Statement","Conditional"],fields:{test:{validate:(0,_index2.assertNodeType)("Expression")},consequent:{validate:(0,_index2.assertNodeType)("Statement")},alternate:{optional:!0,validate:(0,_index2.assertNodeType)("Statement")}}}),(0,_index3["default"])("LabeledStatement",{visitor:["label","body"],aliases:["Statement"],fields:{label:{validate:(0,_index2.assertNodeType)("Identifier")},body:{validate:(0,_index2.assertNodeType)("Statement")}}}),(0,_index3["default"])("StringLiteral",{builder:["value"],fields:{value:{validate:(0,_index2.assertValueType)("string")}},aliases:["Expression","Pureish","Literal","Immutable"]}),(0,_index3["default"])("NumericLiteral",{builder:["value"],deprecatedAlias:"NumberLiteral",fields:{value:{validate:(0,_index2.assertValueType)("number")}},aliases:["Expression","Pureish","Literal","Immutable"]}),(0,_index3["default"])("NullLiteral",{aliases:["Expression","Pureish","Literal","Immutable"]}),(0,_index3["default"])("BooleanLiteral",{builder:["value"],fields:{value:{validate:(0,_index2.assertValueType)("boolean")}},aliases:["Expression","Pureish","Literal","Immutable"]}),(0,_index3["default"])("RegExpLiteral",{builder:["pattern","flags"],deprecatedAlias:"RegexLiteral",aliases:["Expression","Literal"],fields:{pattern:{validate:(0,_index2.assertValueType)("string")},flags:{validate:(0,_index2.assertValueType)("string"),"default":""}}}),(0,_index3["default"])("LogicalExpression",{builder:["operator","left","right"],visitor:["left","right"],aliases:["Binary","Expression"],fields:{operator:{validate:_index2.assertOneOf.apply(void 0,_constants.LOGICAL_OPERATORS)},left:{validate:(0,_index2.assertNodeType)("Expression")},right:{validate:(0,_index2.assertNodeType)("Expression")}}}),(0,_index3["default"])("MemberExpression",{builder:["object","property","computed"],visitor:["object","property"],aliases:["Expression","LVal"],fields:{object:{validate:(0,_index2.assertNodeType)("Expression")},property:{validate:function(e,a,t){var i=e.computed?"Expression":"Identifier";(0,_index2.assertNodeType)(i)(e,a,t)}},computed:{"default":!1}}}),(0,_index3["default"])("NewExpression",{visitor:["callee","arguments"],aliases:["Expression"],fields:{callee:{validate:(0,_index2.assertNodeType)("Expression")},arguments:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Expression","SpreadElement")))}}}),(0,_index3["default"])("Program",{visitor:["directives","body"],builder:["body","directives"],fields:{directives:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Directive"))),"default":[]},body:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Statement")))}},aliases:["Scopable","BlockParent","Block","FunctionParent"]}),(0,_index3["default"])("ObjectExpression",{visitor:["properties"],aliases:["Expression"],fields:{properties:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("ObjectMethod","ObjectProperty","SpreadProperty")))}}}),(0,_index3["default"])("ObjectMethod",{builder:["kind","key","params","body","computed"],fields:{kind:{validate:(0,_index2.chain)((0,_index2.assertValueType)("string"),(0,_index2.assertOneOf)("method","get","set")),"default":"method"},computed:{validate:(0,_index2.assertValueType)("boolean"),"default":!1},key:{validate:function(e,a,t){var i=e.computed?["Expression"]:["Identifier","StringLiteral","NumericLiteral"];_index2.assertNodeType.apply(void 0,i)(e,a,t)}},decorators:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Decorator")))},body:{validate:(0,_index2.assertNodeType)("BlockStatement")},generator:{"default":!1,validate:(0,_index2.assertValueType)("boolean")},async:{"default":!1,validate:(0,_index2.assertValueType)("boolean")}},visitor:["key","params","body","decorators","returnType","typeParameters"],aliases:["UserWhitespacable","Function","Scopable","BlockParent","FunctionParent","Method","ObjectMember"]}),(0,_index3["default"])("ObjectProperty",{builder:["key","value","computed","shorthand","decorators"],fields:{computed:{validate:(0,_index2.assertValueType)("boolean"),"default":!1},key:{validate:function(e,a,t){var i=e.computed?["Expression"]:["Identifier","StringLiteral","NumericLiteral"];_index2.assertNodeType.apply(void 0,i)(e,a,t)}},value:{validate:(0,_index2.assertNodeType)("Expression")},shorthand:{validate:(0,_index2.assertValueType)("boolean"),"default":!1},decorators:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Decorator"))),optional:!0}},visitor:["key","value","decorators"],aliases:["UserWhitespacable","Property","ObjectMember"]}),(0,_index3["default"])("RestElement",{visitor:["argument","typeAnnotation"],aliases:["LVal"],fields:{argument:{validate:(0,_index2.assertNodeType)("LVal")},decorators:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Decorator")))}}}),(0,_index3["default"])("ReturnStatement",{visitor:["argument"],aliases:["Statement","Terminatorless","CompletionStatement"],fields:{argument:{validate:(0,_index2.assertNodeType)("Expression"),optional:!0}}}),(0,_index3["default"])("SequenceExpression",{visitor:["expressions"],fields:{expressions:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Expression")))}},aliases:["Expression"]}),(0,_index3["default"])("SwitchCase",{visitor:["test","consequent"],fields:{test:{validate:(0,_index2.assertNodeType)("Expression"),optional:!0},consequent:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("Statement")))}}}),(0,_index3["default"])("SwitchStatement",{visitor:["discriminant","cases"],aliases:["Statement","BlockParent","Scopable"],fields:{discriminant:{validate:(0,_index2.assertNodeType)("Expression")},cases:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("SwitchCase")))}}}),(0,_index3["default"])("ThisExpression",{aliases:["Expression"]}),(0,_index3["default"])("ThrowStatement",{visitor:["argument"],aliases:["Statement","Terminatorless","CompletionStatement"],fields:{argument:{validate:(0,_index2.assertNodeType)("Expression")}}}),(0,_index3["default"])("TryStatement",{visitor:["block","handler","finalizer"],aliases:["Statement"],fields:{body:{validate:(0,_index2.assertNodeType)("BlockStatement")},handler:{optional:!0,handler:(0,_index2.assertNodeType)("BlockStatement")},finalizer:{optional:!0,validate:(0,_index2.assertNodeType)("BlockStatement")}}}),(0,_index3["default"])("UnaryExpression",{builder:["operator","argument","prefix"],fields:{prefix:{"default":!0},argument:{validate:(0,_index2.assertNodeType)("Expression")},operator:{validate:_index2.assertOneOf.apply(void 0,_constants.UNARY_OPERATORS)}},visitor:["argument"],aliases:["UnaryLike","Expression"]}),(0,_index3["default"])("UpdateExpression",{builder:["operator","argument","prefix"],fields:{prefix:{"default":!1},argument:{validate:(0,_index2.assertNodeType)("Expression")},operator:{validate:_index2.assertOneOf.apply(void 0,_constants.UPDATE_OPERATORS)}},visitor:["argument"],aliases:["Expression"]}),(0,_index3["default"])("VariableDeclaration",{builder:["kind","declarations"],visitor:["declarations"],aliases:["Statement","Declaration"],fields:{kind:{validate:(0,_index2.chain)((0,_index2.assertValueType)("string"),(0,_index2.assertOneOf)("var","let","const"))},declarations:{validate:(0,_index2.chain)((0,_index2.assertValueType)("array"),(0,_index2.assertEach)((0,_index2.assertNodeType)("VariableDeclarator")))}}}),(0,_index3["default"])("VariableDeclarator",{visitor:["id","init"],fields:{id:{validate:(0,_index2.assertNodeType)("LVal")},init:{optional:!0,validate:(0,_index2.assertNodeType)("Expression")}}}),(0,_index3["default"])("WhileStatement",{visitor:["test","body"],aliases:["Statement","BlockParent","Loop","While","Scopable"],fields:{test:{validate:(0,_index2.assertNodeType)("Expression")},body:{validate:(0,_index2.assertNodeType)("BlockStatement","Statement")}}}),(0,_index3["default"])("WithStatement",{visitor:["object","body"],aliases:["Statement"],fields:{object:{object:(0,_index2.assertNodeType)("Expression")},body:{validate:(0,_index2.assertNodeType)("BlockStatement","Statement")}}});

/***/ },

/***/ "./node_modules/babel-types/lib/definitions/es2015.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _index=__webpack_require__("./node_modules/babel-types/lib/definitions/index.js"),_index2=_interopRequireDefault(_index);(0,_index2["default"])("AssignmentPattern",{visitor:["left","right"],aliases:["Pattern","LVal"],fields:{left:{validate:(0,_index.assertNodeType)("Identifier")},right:{validate:(0,_index.assertNodeType)("Expression")},decorators:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("Decorator")))}}}),(0,_index2["default"])("ArrayPattern",{visitor:["elements","typeAnnotation"],aliases:["Pattern","LVal"],fields:{elements:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("Expression")))},decorators:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("Decorator")))}}}),(0,_index2["default"])("ArrowFunctionExpression",{builder:["params","body","async"],visitor:["params","body","returnType","typeParameters"],aliases:["Scopable","Function","BlockParent","FunctionParent","Expression","Pureish"],fields:{params:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("LVal")))},body:{validate:(0,_index.assertNodeType)("BlockStatement","Expression")},async:{validate:(0,_index.assertValueType)("boolean"),"default":!1}}}),(0,_index2["default"])("ClassBody",{visitor:["body"],fields:{body:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("ClassMethod","ClassProperty")))}}}),(0,_index2["default"])("ClassDeclaration",{builder:["id","superClass","body","decorators"],visitor:["id","body","superClass","mixins","typeParameters","superTypeParameters","implements","decorators"],aliases:["Scopable","Class","Statement","Declaration","Pureish"],fields:{id:{validate:(0,_index.assertNodeType)("Identifier")},body:{validate:(0,_index.assertNodeType)("ClassBody")},superClass:{optional:!0,validate:(0,_index.assertNodeType)("Expression")},decorators:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("Decorator")))}}}),(0,_index2["default"])("ClassExpression",{inherits:"ClassDeclaration",aliases:["Scopable","Class","Expression","Pureish"],fields:{id:{optional:!0,validate:(0,_index.assertNodeType)("Identifier")},body:{validate:(0,_index.assertNodeType)("ClassBody")},superClass:{optional:!0,validate:(0,_index.assertNodeType)("Expression")},decorators:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("Decorator")))}}}),(0,_index2["default"])("ExportAllDeclaration",{visitor:["source"],aliases:["Statement","Declaration","ModuleDeclaration","ExportDeclaration"],fields:{source:{validate:(0,_index.assertNodeType)("StringLiteral")}}}),(0,_index2["default"])("ExportDefaultDeclaration",{visitor:["declaration"],aliases:["Statement","Declaration","ModuleDeclaration","ExportDeclaration"],fields:{declaration:{validate:(0,_index.assertNodeType)("FunctionDeclaration","ClassDeclaration","Expression")}}}),(0,_index2["default"])("ExportNamedDeclaration",{visitor:["declaration","specifiers","source"],aliases:["Statement","Declaration","ModuleDeclaration","ExportDeclaration"],fields:{declaration:{validate:(0,_index.assertNodeType)("Declaration"),optional:!0},specifiers:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("ExportSpecifier")))},source:{validate:(0,_index.assertNodeType)("StringLiteral"),optional:!0}}}),(0,_index2["default"])("ExportSpecifier",{visitor:["local","exported"],aliases:["ModuleSpecifier"],fields:{local:{validate:(0,_index.assertNodeType)("Identifier")},exported:{validate:(0,_index.assertNodeType)("Identifier")}}}),(0,_index2["default"])("ForOfStatement",{visitor:["left","right","body"],aliases:["Scopable","Statement","For","BlockParent","Loop","ForXStatement"],fields:{left:{validate:(0,_index.assertNodeType)("VariableDeclaration","LVal")},right:{validate:(0,_index.assertNodeType)("Expression")},body:{validate:(0,_index.assertNodeType)("Statement")}}}),(0,_index2["default"])("ImportDeclaration",{visitor:["specifiers","source"],aliases:["Statement","Declaration","ModuleDeclaration"],fields:{specifiers:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("ImportSpecifier","ImportDefaultSpecifier","ImportNamespaceSpecifier")))},source:{validate:(0,_index.assertNodeType)("StringLiteral")}}}),(0,_index2["default"])("ImportDefaultSpecifier",{visitor:["local"],aliases:["ModuleSpecifier"],fields:{local:{validate:(0,_index.assertNodeType)("Identifier")}}}),(0,_index2["default"])("ImportNamespaceSpecifier",{visitor:["local"],aliases:["ModuleSpecifier"],fields:{local:{validate:(0,_index.assertNodeType)("Identifier")}}}),(0,_index2["default"])("ImportSpecifier",{visitor:["local","imported"],aliases:["ModuleSpecifier"],fields:{local:{validate:(0,_index.assertNodeType)("Identifier")},imported:{validate:(0,_index.assertNodeType)("Identifier")}}}),(0,_index2["default"])("MetaProperty",{visitor:["meta","property"],aliases:["Expression"],fields:{meta:{validate:(0,_index.assertValueType)("string")},property:{validate:(0,_index.assertValueType)("string")}}}),(0,_index2["default"])("ClassMethod",{aliases:["Function","Scopable","BlockParent","FunctionParent","Method"],builder:["kind","key","params","body","computed","static"],visitor:["key","params","body","decorators","returnType","typeParameters"],fields:{kind:{validate:(0,_index.chain)((0,_index.assertValueType)("string"),(0,_index.assertOneOf)("get","set","method","constructor")),"default":"method"},computed:{"default":!1,validate:(0,_index.assertValueType)("boolean")},"static":{"default":!1,validate:(0,_index.assertValueType)("boolean")},key:{validate:function(e,a,i){var t=e.computed?["Expression"]:["Identifier","StringLiteral","NumericLiteral"];_index.assertNodeType.apply(void 0,t)(e,a,i)}},params:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("LVal")))},body:{validate:(0,_index.assertNodeType)("BlockStatement")},generator:{"default":!1,validate:(0,_index.assertValueType)("boolean")},async:{"default":!1,validate:(0,_index.assertValueType)("boolean")}}}),(0,_index2["default"])("ObjectPattern",{visitor:["properties","typeAnnotation"],aliases:["Pattern","LVal"],fields:{properties:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("RestProperty","Property")))},decorators:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("Decorator")))}}}),(0,_index2["default"])("SpreadElement",{visitor:["argument"],aliases:["UnaryLike"],fields:{argument:{validate:(0,_index.assertNodeType)("Expression")}}}),(0,_index2["default"])("Super",{aliases:["Expression"]}),(0,_index2["default"])("TaggedTemplateExpression",{visitor:["tag","quasi"],aliases:["Expression"],fields:{tag:{validate:(0,_index.assertNodeType)("Expression")},quasi:{validate:(0,_index.assertNodeType)("TemplateLiteral")}}}),(0,_index2["default"])("TemplateElement",{builder:["value","tail"],fields:{value:{},tail:{validate:(0,_index.assertValueType)("boolean"),"default":!1}}}),(0,_index2["default"])("TemplateLiteral",{visitor:["quasis","expressions"],aliases:["Expression","Literal"],fields:{quasis:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("TemplateElement")))},expressions:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("Expression")))}}}),(0,_index2["default"])("YieldExpression",{builder:["argument","delegate"],visitor:["argument"],aliases:["Expression","Terminatorless"],fields:{delegate:{validate:(0,_index.assertValueType)("boolean"),"default":!1},argument:{optional:!0,validate:(0,_index.assertNodeType)("Expression")}}});

/***/ },

/***/ "./node_modules/babel-types/lib/definitions/flow.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _index=__webpack_require__("./node_modules/babel-types/lib/definitions/index.js"),_index2=_interopRequireDefault(_index);(0,_index2["default"])("AnyTypeAnnotation",{aliases:["Flow","FlowBaseAnnotation"],fields:{}}),(0,_index2["default"])("ArrayTypeAnnotation",{visitor:["elementType"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("BooleanTypeAnnotation",{aliases:["Flow","FlowBaseAnnotation"],fields:{}}),(0,_index2["default"])("BooleanLiteralTypeAnnotation",{aliases:["Flow"],fields:{}}),(0,_index2["default"])("NullLiteralTypeAnnotation",{aliases:["Flow","FlowBaseAnnotation"],fields:{}}),(0,_index2["default"])("ClassImplements",{visitor:["id","typeParameters"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("ClassProperty",{visitor:["key","value","typeAnnotation","decorators"],builder:["key","value","typeAnnotation","decorators","computed"],aliases:["Property"],fields:{computed:{validate:(0,_index.assertValueType)("boolean"),"default":!1}}}),(0,_index2["default"])("DeclareClass",{visitor:["id","typeParameters","extends","body"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("DeclareFunction",{visitor:["id"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("DeclareInterface",{visitor:["id","typeParameters","extends","body"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("DeclareModule",{visitor:["id","body"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("DeclareModuleExports",{visitor:["typeAnnotation"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("DeclareTypeAlias",{visitor:["id","typeParameters","right"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("DeclareVariable",{visitor:["id"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("ExistentialTypeParam",{aliases:["Flow"]}),(0,_index2["default"])("FunctionTypeAnnotation",{visitor:["typeParameters","params","rest","returnType"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("FunctionTypeParam",{visitor:["name","typeAnnotation"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("GenericTypeAnnotation",{visitor:["id","typeParameters"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("InterfaceExtends",{visitor:["id","typeParameters"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("InterfaceDeclaration",{visitor:["id","typeParameters","extends","body"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("IntersectionTypeAnnotation",{visitor:["types"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("MixedTypeAnnotation",{aliases:["Flow","FlowBaseAnnotation"]}),(0,_index2["default"])("NullableTypeAnnotation",{visitor:["typeAnnotation"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("NumericLiteralTypeAnnotation",{aliases:["Flow"],fields:{}}),(0,_index2["default"])("NumberTypeAnnotation",{aliases:["Flow","FlowBaseAnnotation"],fields:{}}),(0,_index2["default"])("StringLiteralTypeAnnotation",{aliases:["Flow"],fields:{}}),(0,_index2["default"])("StringTypeAnnotation",{aliases:["Flow","FlowBaseAnnotation"],fields:{}}),(0,_index2["default"])("ThisTypeAnnotation",{aliases:["Flow","FlowBaseAnnotation"],fields:{}}),(0,_index2["default"])("TupleTypeAnnotation",{visitor:["types"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("TypeofTypeAnnotation",{visitor:["argument"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("TypeAlias",{visitor:["id","typeParameters","right"],aliases:["Flow","FlowDeclaration","Statement","Declaration"],fields:{}}),(0,_index2["default"])("TypeAnnotation",{visitor:["typeAnnotation"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("TypeCastExpression",{visitor:["expression","typeAnnotation"],aliases:["Flow","ExpressionWrapper","Expression"],fields:{}}),(0,_index2["default"])("TypeParameter",{visitor:["bound"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("TypeParameterDeclaration",{visitor:["params"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("TypeParameterInstantiation",{visitor:["params"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("ObjectTypeAnnotation",{visitor:["properties","indexers","callProperties"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("ObjectTypeCallProperty",{visitor:["value"],aliases:["Flow","UserWhitespacable"],fields:{}}),(0,_index2["default"])("ObjectTypeIndexer",{visitor:["id","key","value"],aliases:["Flow","UserWhitespacable"],fields:{}}),(0,_index2["default"])("ObjectTypeProperty",{visitor:["key","value"],aliases:["Flow","UserWhitespacable"],fields:{}}),(0,_index2["default"])("QualifiedTypeIdentifier",{visitor:["id","qualification"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("UnionTypeAnnotation",{visitor:["types"],aliases:["Flow"],fields:{}}),(0,_index2["default"])("VoidTypeAnnotation",{aliases:["Flow","FlowBaseAnnotation"],fields:{}});

/***/ },

/***/ "./node_modules/babel-types/lib/definitions/jsx.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _index=__webpack_require__("./node_modules/babel-types/lib/definitions/index.js"),_index2=_interopRequireDefault(_index);(0,_index2["default"])("JSXAttribute",{visitor:["name","value"],aliases:["JSX","Immutable"],fields:{name:{validate:(0,_index.assertNodeType)("JSXIdentifier","JSXNamespacedName")},value:{optional:!0,validate:(0,_index.assertNodeType)("JSXElement","StringLiteral","JSXExpressionContainer")}}}),(0,_index2["default"])("JSXClosingElement",{visitor:["name"],aliases:["JSX","Immutable"],fields:{name:{validate:(0,_index.assertNodeType)("JSXIdentifier","JSXMemberExpression")}}}),(0,_index2["default"])("JSXElement",{builder:["openingElement","closingElement","children","selfClosing"],visitor:["openingElement","children","closingElement"],aliases:["JSX","Immutable","Expression"],fields:{openingElement:{validate:(0,_index.assertNodeType)("JSXOpeningElement")},closingElement:{optional:!0,validate:(0,_index.assertNodeType)("JSXClosingElement")},children:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("JSXText","JSXExpressionContainer","JSXElement")))}}}),(0,_index2["default"])("JSXEmptyExpression",{aliases:["JSX","Expression"]}),(0,_index2["default"])("JSXExpressionContainer",{visitor:["expression"],aliases:["JSX","Immutable"],fields:{expression:{validate:(0,_index.assertNodeType)("Expression")}}}),(0,_index2["default"])("JSXIdentifier",{builder:["name"],aliases:["JSX","Expression"],fields:{name:{validate:(0,_index.assertValueType)("string")}}}),(0,_index2["default"])("JSXMemberExpression",{visitor:["object","property"],aliases:["JSX","Expression"],fields:{object:{validate:(0,_index.assertNodeType)("JSXMemberExpression","JSXIdentifier")},property:{validate:(0,_index.assertNodeType)("JSXIdentifier")}}}),(0,_index2["default"])("JSXNamespacedName",{visitor:["namespace","name"],aliases:["JSX"],fields:{namespace:{validate:(0,_index.assertNodeType)("JSXIdentifier")},name:{validate:(0,_index.assertNodeType)("JSXIdentifier")}}}),(0,_index2["default"])("JSXOpeningElement",{builder:["name","attributes","selfClosing"],visitor:["name","attributes"],aliases:["JSX","Immutable"],fields:{name:{validate:(0,_index.assertNodeType)("JSXIdentifier","JSXMemberExpression")},selfClosing:{"default":!1,validate:(0,_index.assertValueType)("boolean")},attributes:{validate:(0,_index.chain)((0,_index.assertValueType)("array"),(0,_index.assertEach)((0,_index.assertNodeType)("JSXAttribute","JSXSpreadAttribute")))}}}),(0,_index2["default"])("JSXSpreadAttribute",{visitor:["argument"],aliases:["JSX"],fields:{argument:{validate:(0,_index.assertNodeType)("Expression")}}}),(0,_index2["default"])("JSXText",{aliases:["JSX","Immutable"],builder:["value"],fields:{value:{validate:(0,_index.assertValueType)("string")}}});

/***/ },

/***/ "./node_modules/babel-types/lib/definitions/misc.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _index=__webpack_require__("./node_modules/babel-types/lib/definitions/index.js"),_index2=_interopRequireDefault(_index);(0,_index2["default"])("Noop",{visitor:[]}),(0,_index2["default"])("ParenthesizedExpression",{visitor:["expression"],aliases:["Expression","ExpressionWrapper"],fields:{expression:{validate:(0,_index.assertNodeType)("Expression")}}});

/***/ },

/***/ "./node_modules/babel-types/lib/definitions/experimental.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _index=__webpack_require__("./node_modules/babel-types/lib/definitions/index.js"),_index2=_interopRequireDefault(_index);(0,_index2["default"])("AwaitExpression",{builder:["argument"],visitor:["argument"],aliases:["Expression","Terminatorless"],fields:{argument:{validate:(0,_index.assertNodeType)("Expression")}}}),(0,_index2["default"])("ForAwaitStatement",{visitor:["left","right","body"],aliases:["Scopable","Statement","For","BlockParent","Loop","ForXStatement"],fields:{left:{validate:(0,_index.assertNodeType)("VariableDeclaration","LVal")},right:{validate:(0,_index.assertNodeType)("Expression")},body:{validate:(0,_index.assertNodeType)("Statement")}}}),(0,_index2["default"])("BindExpression",{visitor:["object","callee"],aliases:["Expression"],fields:{}}),(0,_index2["default"])("Decorator",{visitor:["expression"],fields:{expression:{validate:(0,_index.assertNodeType)("Expression")}}}),(0,_index2["default"])("DoExpression",{visitor:["body"],aliases:["Expression"],fields:{body:{validate:(0,_index.assertNodeType)("BlockStatement")}}}),(0,_index2["default"])("ExportDefaultSpecifier",{visitor:["exported"],aliases:["ModuleSpecifier"],fields:{exported:{validate:(0,_index.assertNodeType)("Identifier")}}}),(0,_index2["default"])("ExportNamespaceSpecifier",{visitor:["exported"],aliases:["ModuleSpecifier"],fields:{exported:{validate:(0,_index.assertNodeType)("Identifier")}}}),(0,_index2["default"])("RestProperty",{visitor:["argument"],aliases:["UnaryLike"],fields:{argument:{validate:(0,_index.assertNodeType)("LVal")}}}),(0,_index2["default"])("SpreadProperty",{visitor:["argument"],aliases:["UnaryLike"],fields:{argument:{validate:(0,_index.assertNodeType)("Expression")}}});

/***/ },

/***/ "./node_modules/babel-types/lib/react.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function isCompatTag(e){return!!e&&/^[a-z]|\-/.test(e)}function cleanJSXElementLiteralChild(e,r){for(var n=e.value.split(/\r\n|\n|\r/),i=0,o=0;o<n.length;o++)n[o].match(/[^ \t]/)&&(i=o);for(var a="",l=0;l<n.length;l++){var s=n[l],p=0===l,u=l===n.length-1,c=l===i,d=s.replace(/\t/g," ");p||(d=d.replace(/^[ ]+/,"")),u||(d=d.replace(/[ ]+$/,"")),d&&(c||(d+=" "),a+=d)}a&&r.push(t.stringLiteral(a))}function buildChildren(e){for(var r=[],n=0;n<e.children.length;n++){var i=e.children[n];t.isJSXText(i)?cleanJSXElementLiteralChild(i,r):(t.isJSXExpressionContainer(i)&&(i=i.expression),t.isJSXEmptyExpression(i)||r.push(i))}return r}exports.__esModule=!0,exports.isReactComponent=void 0,exports.isCompatTag=isCompatTag,exports.buildChildren=buildChildren;var _index=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_index),isReactComponent=exports.isReactComponent=t.buildMatchMemberExpression("React.Component");

/***/ },

/***/ "./node_modules/debug/browser.js":
/***/ function(module, exports, __webpack_require__) {

	function useColors(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function formatArgs(){var o=arguments,e=this.useColors;if(o[0]=(e?"%c":"")+this.namespace+(e?" %c":" ")+o[0]+(e?"%c ":" ")+"+"+exports.humanize(this.diff),!e)return o;var r="color: "+this.color;o=[o[0],r,"color: inherit"].concat(Array.prototype.slice.call(o,1));var t=0,s=0;return o[0].replace(/%[a-z%]/g,function(o){"%%"!==o&&(t++,"%c"===o&&(s=t))}),o.splice(s,0,r),o}function log(){return"object"==typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function save(o){try{null==o?exports.storage.removeItem("debug"):exports.storage.debug=o}catch(e){}}function load(){var o;try{o=exports.storage.debug}catch(e){}return o}function localstorage(){try{return window.localStorage}catch(o){}}exports=module.exports=__webpack_require__("./node_modules/debug/debug.js"),exports.log=log,exports.formatArgs=formatArgs,exports.save=save,exports.load=load,exports.useColors=useColors,exports.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:localstorage(),exports.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],exports.formatters.j=function(o){return JSON.stringify(o)},exports.enable(load());

/***/ },

/***/ "./node_modules/debug/debug.js":
/***/ function(module, exports, __webpack_require__) {

	function selectColor(){return exports.colors[prevColor++%exports.colors.length]}function debug(e){function r(){}function o(){var e=o,r=+new Date,s=r-(prevTime||r);e.diff=s,e.prev=prevTime,e.curr=r,prevTime=r,null==e.useColors&&(e.useColors=exports.useColors()),null==e.color&&e.useColors&&(e.color=selectColor());var t=Array.prototype.slice.call(arguments);t[0]=exports.coerce(t[0]),"string"!=typeof t[0]&&(t=["%o"].concat(t));var n=0;t[0]=t[0].replace(/%([a-z%])/g,function(r,o){if("%%"===r)return r;n++;var s=exports.formatters[o];if("function"==typeof s){var p=t[n];r=s.call(e,p),t.splice(n,1),n--}return r}),"function"==typeof exports.formatArgs&&(t=exports.formatArgs.apply(e,t));var p=o.log||exports.log||console.log.bind(console);p.apply(e,t)}r.enabled=!1,o.enabled=!0;var s=exports.enabled(e)?o:r;return s.namespace=e,s}function enable(e){exports.save(e);for(var r=(e||"").split(/[\s,]+/),o=r.length,s=0;s<o;s++)r[s]&&(e=r[s].replace(/\*/g,".*?"),"-"===e[0]?exports.skips.push(new RegExp("^"+e.substr(1)+"$")):exports.names.push(new RegExp("^"+e+"$")))}function disable(){exports.enable("")}function enabled(e){var r,o;for(r=0,o=exports.skips.length;r<o;r++)if(exports.skips[r].test(e))return!1;for(r=0,o=exports.names.length;r<o;r++)if(exports.names[r].test(e))return!0;return!1}function coerce(e){return e instanceof Error?e.stack||e.message:e}exports=module.exports=debug,exports.coerce=coerce,exports.disable=disable,exports.enable=enable,exports.enabled=enabled,exports.humanize=__webpack_require__("./node_modules/ms/index.js"),exports.names=[],exports.skips=[],exports.formatters={};var prevColor=0,prevTime;

/***/ },

/***/ "./node_modules/ms/index.js":
/***/ function(module, exports) {

	function parse(e){if(e=""+e,!(e.length>1e4)){var a=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(a){var r=parseFloat(a[1]),c=(a[2]||"ms").toLowerCase();switch(c){case"years":case"year":case"yrs":case"yr":case"y":return r*y;case"days":case"day":case"d":return r*d;case"hours":case"hour":case"hrs":case"hr":case"h":return r*h;case"minutes":case"minute":case"mins":case"min":case"m":return r*m;case"seconds":case"second":case"secs":case"sec":case"s":return r*s;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r}}}}function short(e){return e>=d?Math.round(e/d)+"d":e>=h?Math.round(e/h)+"h":e>=m?Math.round(e/m)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function long(e){return plural(e,d,"day")||plural(e,h,"hour")||plural(e,m,"minute")||plural(e,s,"second")||e+" ms"}function plural(s,e,a){if(!(s<e))return s<1.5*e?Math.floor(s/e)+" "+a:Math.ceil(s/e)+" "+a+"s"}var s=1e3,m=60*s,h=60*m,d=24*h,y=365.25*d;module.exports=function(s,e){return e=e||{},"string"==typeof s?parse(s):e["long"]?long(s):short(s)};

/***/ },

/***/ "./node_modules/babel-traverse/lib/scope/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getCache(e,t,r){for(var i=_cache.scope.get(e.node)||[],n=i,a=Array.isArray(n),o=0,n=a?n:(0,_getIterator3["default"])(n);;){var s;if(a){if(o>=n.length)break;s=n[o++]}else{if(o=n.next(),o.done)break;s=o.value}var l=s;if(l.parent===t&&l.path===e)return l}i.push(r),_cache.scope.has(e.node)||_cache.scope.set(e.node,i)}exports.__esModule=!0;var _keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_includes=__webpack_require__("./node_modules/lodash/includes.js"),_includes2=_interopRequireDefault(_includes),_repeat=__webpack_require__("./node_modules/lodash/repeat.js"),_repeat2=_interopRequireDefault(_repeat),_renamer=__webpack_require__("./node_modules/babel-traverse/lib/scope/lib/renamer.js"),_renamer2=_interopRequireDefault(_renamer),_index=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_index2=_interopRequireDefault(_index),_defaults=__webpack_require__("./node_modules/lodash/defaults.js"),_defaults2=_interopRequireDefault(_defaults),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_binding2=__webpack_require__("./node_modules/babel-traverse/lib/scope/binding.js"),_binding3=_interopRequireDefault(_binding2),_globals=__webpack_require__("./node_modules/globals/index.js"),_globals2=_interopRequireDefault(_globals),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_cache=__webpack_require__("./node_modules/babel-traverse/lib/cache.js"),_crawlCallsCount=0,collectorVisitor={For:function(e){for(var r=t.FOR_INIT_KEYS,i=Array.isArray(r),n=0,r=i?r:(0,_getIterator3["default"])(r);;){var a;if(i){if(n>=r.length)break;a=r[n++]}else{if(n=r.next(),n.done)break;a=n.value}var o=a,s=e.get(o);s.isVar()&&e.scope.getFunctionParent().registerBinding("var",s)}},Declaration:function(e){e.isBlockScoped()||e.isExportDeclaration()&&e.get("declaration").isDeclaration()||e.scope.getFunctionParent().registerDeclaration(e)},ReferencedIdentifier:function(e,t){t.references.push(e)},ForXStatement:function(e,t){var r=e.get("left");(r.isPattern()||r.isIdentifier())&&t.constantViolations.push(r)},ExportDeclaration:{exit:function(e){var r=e.node,i=e.scope,n=r.declaration;if(t.isClassDeclaration(n)||t.isFunctionDeclaration(n)){var a=n.id;if(!a)return;var o=i.getBinding(a.name);o&&o.reference(e)}else if(t.isVariableDeclaration(n))for(var s=n.declarations,l=Array.isArray(s),d=0,s=l?s:(0,_getIterator3["default"])(s);;){var u;if(l){if(d>=s.length)break;u=s[d++]}else{if(d=s.next(),d.done)break;u=d.value}var f=u,c=t.getBindingIdentifiers(f);for(var g in c){var p=i.getBinding(g);p&&p.reference(e)}}}},LabeledStatement:function(e){e.scope.getProgramParent().addGlobal(e.node),e.scope.getBlockParent().registerDeclaration(e)},AssignmentExpression:function(e,t){t.assignments.push(e)},UpdateExpression:function(e,t){t.constantViolations.push(e.get("argument"))},UnaryExpression:function(e,t){"delete"===e.node.operator&&t.constantViolations.push(e.get("argument"))},BlockScoped:function(e){var t=e.scope;t.path===e&&(t=t.parent),t.getBlockParent().registerDeclaration(e)},ClassDeclaration:function(e){var t=e.node.id;if(t){var r=t.name;e.scope.bindings[r]=e.scope.getBinding(r)}},Block:function(e){for(var t=e.get("body"),r=t,i=Array.isArray(r),n=0,r=i?r:(0,_getIterator3["default"])(r);;){var a;if(i){if(n>=r.length)break;a=r[n++]}else{if(n=r.next(),n.done)break;a=n.value}var o=a;o.isFunctionDeclaration()&&e.scope.getBlockParent().registerDeclaration(o)}}},uid=0,Scope=function(){function e(t,r){if((0,_classCallCheck3["default"])(this,e),r&&r.block===t.node)return r;var i=getCache(t,r,this);return i?i:(this.uid=uid++,this.parent=r,this.hub=t.hub,this.parentBlock=t.parent,this.block=t.node,void(this.path=t))}return e.prototype.traverse=function(e,t,r){(0,_index2["default"])(e,t,this,r,this.path)},e.prototype.generateDeclaredUidIdentifier=function(){var e=arguments.length<=0||void 0===arguments[0]?"temp":arguments[0],t=this.generateUidIdentifier(e);return this.push({id:t}),t},e.prototype.generateUidIdentifier=function(){var e=arguments.length<=0||void 0===arguments[0]?"temp":arguments[0];return t.identifier(this.generateUid(e))},e.prototype.generateUid=function(){var e=arguments.length<=0||void 0===arguments[0]?"temp":arguments[0];e=t.toIdentifier(e).replace(/^_+/,"").replace(/[0-9]+$/g,"");var r=void 0,i=0;do r=this._generateUid(e,i),i++;while(this.hasBinding(r)||this.hasGlobal(r)||this.hasReference(r));var n=this.getProgramParent();return n.references[r]=!0,n.uids[r]=!0,r},e.prototype._generateUid=function(e,t){var r=e;return t>1&&(r+=t),"_"+r},e.prototype.generateUidIdentifierBasedOnNode=function(e,r){var i=e;t.isAssignmentExpression(e)?i=e.left:t.isVariableDeclarator(e)?i=e.id:(t.isObjectProperty(i)||t.isObjectMethod(i))&&(i=i.key);var n=[],a=function s(e){if(t.isModuleDeclaration(e))if(e.source)s(e.source);else if(e.specifiers&&e.specifiers.length)for(var r=e.specifiers,i=Array.isArray(r),a=0,r=i?r:(0,_getIterator3["default"])(r);;){var o;if(i){if(a>=r.length)break;o=r[a++]}else{if(a=r.next(),a.done)break;o=a.value}var l=o;s(l)}else e.declaration&&s(e.declaration);else if(t.isModuleSpecifier(e))s(e.local);else if(t.isMemberExpression(e))s(e.object),s(e.property);else if(t.isIdentifier(e))n.push(e.name);else if(t.isLiteral(e))n.push(e.value);else if(t.isCallExpression(e))s(e.callee);else if(t.isObjectExpression(e)||t.isObjectPattern(e))for(var d=e.properties,u=Array.isArray(d),f=0,d=u?d:(0,_getIterator3["default"])(d);;){var c;if(u){if(f>=d.length)break;c=d[f++]}else{if(f=d.next(),f.done)break;c=f.value}var g=c;s(g.key||g.argument)}};a(i);var o=n.join("$");return o=o.replace(/^_/,"")||r||"ref",this.generateUidIdentifier(o.slice(0,20))},e.prototype.isStatic=function(e){if(t.isThisExpression(e)||t.isSuper(e))return!0;if(t.isIdentifier(e)){var r=this.getBinding(e.name);return r?r.constant:this.hasBinding(e.name)}return!1},e.prototype.maybeGenerateMemoised=function(e,t){if(this.isStatic(e))return null;var r=this.generateUidIdentifierBasedOnNode(e);return t||this.push({id:r}),r},e.prototype.checkBlockScopedCollisions=function(e,t,r,i){if("param"!==t&&("hoisted"!==t||"let"!==e.kind)){var n=!1;if(n||(n="let"===t||"let"===e.kind||"const"===e.kind||"module"===e.kind),n||(n="param"===e.kind&&("let"===t||"const"===t)),n)throw this.hub.file.buildCodeFrameError(i,messages.get("scopeDuplicateDeclaration",r),TypeError)}},e.prototype.rename=function(e,t,r){var i=this.getBinding(e);if(i)return t=t||this.generateUidIdentifier(e).name,new _renamer2["default"](i,e,t).rename(r)},e.prototype._renameFromMap=function(e,t,r,i){e[t]&&(e[r]=i,e[t]=null)},e.prototype.dump=function(){var e=(0,_repeat2["default"])("-",60);console.log(e);var t=this;do{console.log("#",t.block.type);for(var r in t.bindings){var i=t.bindings[r];console.log(" -",r,{constant:i.constant,references:i.references,violations:i.constantViolations.length,kind:i.kind})}}while(t=t.parent);console.log(e)},e.prototype.toArray=function(e,r){var i=this.hub.file;if(t.isIdentifier(e)){var n=this.getBinding(e.name);if(n&&n.constant&&n.path.isGenericType("Array"))return e}if(t.isArrayExpression(e))return e;if(t.isIdentifier(e,{name:"arguments"}))return t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier("Array"),t.identifier("prototype")),t.identifier("slice")),t.identifier("call")),[e]);var a="toArray",o=[e];return r===!0?a="toConsumableArray":r&&(o.push(t.numericLiteral(r)),a="slicedToArray"),t.callExpression(i.addHelper(a),o)},e.prototype.registerDeclaration=function(e){if(e.isLabeledStatement())this.registerBinding("label",e);else if(e.isFunctionDeclaration())this.registerBinding("hoisted",e.get("id"),e);else if(e.isVariableDeclaration())for(var t=e.get("declarations"),r=t,i=Array.isArray(r),n=0,r=i?r:(0,_getIterator3["default"])(r);;){var a;if(i){if(n>=r.length)break;a=r[n++]}else{if(n=r.next(),n.done)break;a=n.value}var o=a;this.registerBinding(e.node.kind,o)}else if(e.isClassDeclaration())this.registerBinding("let",e);else if(e.isImportDeclaration())for(var s=e.get("specifiers"),l=s,d=Array.isArray(l),u=0,l=d?l:(0,_getIterator3["default"])(l);;){var f;if(d){if(u>=l.length)break;f=l[u++]}else{if(u=l.next(),u.done)break;f=u.value}var c=f;this.registerBinding("module",c)}else if(e.isExportDeclaration()){var g=e.get("declaration");(g.isClassDeclaration()||g.isFunctionDeclaration()||g.isVariableDeclaration())&&this.registerDeclaration(g)}else this.registerBinding("unknown",e)},e.prototype.buildUndefinedNode=function(){return this.hasBinding("undefined")?t.unaryExpression("void",t.numericLiteral(0),!0):t.identifier("undefined")},e.prototype.registerConstantViolation=function(e){var t=e.getBindingIdentifiers();for(var r in t){var i=this.getBinding(r);i&&i.reassign(e)}},e.prototype.registerBinding=function(e,t){var r=arguments.length<=2||void 0===arguments[2]?t:arguments[2];if(!e)throw new ReferenceError("no `kind`");if(t.isVariableDeclaration())for(var i=t.get("declarations"),n=i,a=Array.isArray(n),o=0,n=a?n:(0,_getIterator3["default"])(n);;){var s;if(a){if(o>=n.length)break;s=n[o++]}else{if(o=n.next(),o.done)break;s=o.value}var l=s;this.registerBinding(e,l)}else{var d=this.getProgramParent(),u=t.getBindingIdentifiers(!0);for(var f in u)for(var c=u[f],g=Array.isArray(c),p=0,c=g?c:(0,_getIterator3["default"])(c);;){var h;if(g){if(p>=c.length)break;h=c[p++]}else{if(p=c.next(),p.done)break;h=p.value}var v=h,b=this.getOwnBinding(f);if(b){if(b.identifier===v)continue;this.checkBlockScopedCollisions(b,e,f,v)}b&&b.path.isFlow()&&(b=null),d.references[f]=!0,this.bindings[f]=new _binding3["default"]({identifier:v,existing:b,scope:this,path:r,kind:e})}}},e.prototype.addGlobal=function(e){this.globals[e.name]=e},e.prototype.hasUid=function(e){var t=this;do if(t.uids[e])return!0;while(t=t.parent);return!1},e.prototype.hasGlobal=function(e){var t=this;do if(t.globals[e])return!0;while(t=t.parent);return!1},e.prototype.hasReference=function(e){var t=this;do if(t.references[e])return!0;while(t=t.parent);return!1},e.prototype.isPure=function(e,r){if(t.isIdentifier(e)){var i=this.getBinding(e.name);return!!i&&(!r||i.constant)}if(t.isClass(e))return!(e.superClass&&!this.isPure(e.superClass,r))&&this.isPure(e.body,r);if(t.isClassBody(e)){for(var n=e.body,a=Array.isArray(n),o=0,n=a?n:(0,_getIterator3["default"])(n);;){var s;if(a){if(o>=n.length)break;s=n[o++]}else{if(o=n.next(),o.done)break;s=o.value}var l=s;if(!this.isPure(l,r))return!1}return!0}if(t.isBinary(e))return this.isPure(e.left,r)&&this.isPure(e.right,r);if(t.isArrayExpression(e)){for(var d=e.elements,u=Array.isArray(d),f=0,d=u?d:(0,_getIterator3["default"])(d);;){var c;if(u){if(f>=d.length)break;c=d[f++]}else{if(f=d.next(),f.done)break;c=f.value}var g=c;if(!this.isPure(g,r))return!1}return!0}if(t.isObjectExpression(e)){for(var p=e.properties,h=Array.isArray(p),v=0,p=h?p:(0,_getIterator3["default"])(p);;){var b;if(h){if(v>=p.length)break;b=p[v++]}else{if(v=p.next(),v.done)break;b=v.value}var y=b;if(!this.isPure(y,r))return!1}return!0}return t.isClassMethod(e)?!(e.computed&&!this.isPure(e.key,r))&&("get"!==e.kind&&"set"!==e.kind):t.isClassProperty(e)||t.isObjectProperty(e)?!(e.computed&&!this.isPure(e.key,r))&&this.isPure(e.value,r):t.isUnaryExpression(e)?this.isPure(e.argument,r):t.isPureish(e)},e.prototype.setData=function(e,t){return this.data[e]=t},e.prototype.getData=function(e){var t=this;do{var r=t.data[e];if(null!=r)return r}while(t=t.parent)},e.prototype.removeData=function(e){var t=this;do{var r=t.data[e];null!=r&&(t.data[e]=null)}while(t=t.parent)},e.prototype.init=function(){this.references||this.crawl()},e.prototype.crawl=function(){_crawlCallsCount++,this._crawl(),_crawlCallsCount--},e.prototype._crawl=function(){var e=this.path;if(this.references=(0,_create2["default"])(null),this.bindings=(0,_create2["default"])(null),this.globals=(0,_create2["default"])(null),this.uids=(0,_create2["default"])(null),this.data=(0,_create2["default"])(null),e.isLoop())for(var r=t.FOR_INIT_KEYS,i=Array.isArray(r),n=0,r=i?r:(0,_getIterator3["default"])(r);;){var a;if(i){if(n>=r.length)break;a=r[n++]}else{if(n=r.next(),n.done)break;a=n.value}var o=a,s=e.get(o);s.isBlockScoped()&&this.registerBinding(s.node.kind,s)}if(e.isFunctionExpression()&&e.has("id")&&(e.get("id").node[t.NOT_LOCAL_BINDING]||this.registerBinding("local",e.get("id"),e)),e.isClassExpression()&&e.has("id")&&(e.get("id").node[t.NOT_LOCAL_BINDING]||this.registerBinding("local",e)),e.isFunction())for(var l=e.get("params"),d=l,u=Array.isArray(d),f=0,d=u?d:(0,_getIterator3["default"])(d);;){var c;if(u){if(f>=d.length)break;c=d[f++]}else{if(f=d.next(),f.done)break;c=f.value}var g=c;this.registerBinding("param",g)}e.isCatchClause()&&this.registerBinding("let",e);var p=this.getProgramParent();if(!p.crawling){var h={references:[],constantViolations:[],assignments:[]};this.crawling=!0,e.traverse(collectorVisitor,h),this.crawling=!1;for(var v=h.assignments,b=Array.isArray(v),y=0,v=b?v:(0,_getIterator3["default"])(v);;){var _;if(b){if(y>=v.length)break;_=v[y++]}else{if(y=v.next(),y.done)break;_=y.value}var k=_,m=k.getBindingIdentifiers(),B=void 0;for(var w in m)k.scope.getBinding(w)||(B=B||k.scope.getProgramParent(),B.addGlobal(m[w]));k.scope.registerConstantViolation(k)}for(var x=h.references,I=Array.isArray(x),A=0,x=I?x:(0,_getIterator3["default"])(x);;){var D;if(I){if(A>=x.length)break;D=x[A++]}else{if(A=x.next(),A.done)break;D=A.value}var P=D,C=P.scope.getBinding(P.node.name);C?C.reference(P):P.scope.getProgramParent().addGlobal(P.node)}for(var E=h.constantViolations,q=Array.isArray(E),O=0,E=q?E:(0,_getIterator3["default"])(E);;){var F;if(q){if(O>=E.length)break;F=E[O++]}else{if(O=E.next(),O.done)break;F=O.value}var S=F;S.scope.registerConstantViolation(S)}}},e.prototype.push=function(e){var r=this.path;r.isBlockStatement()||r.isProgram()||(r=this.getBlockParent().path),r.isSwitchStatement()&&(r=this.getFunctionParent().path),(r.isLoop()||r.isCatchClause()||r.isFunction())&&(t.ensureBlock(r.node),r=r.get("body"));var i=e.unique,n=e.kind||"var",a=null==e._blockHoist?2:e._blockHoist,o="declaration:"+n+":"+a,s=!i&&r.getData(o);if(!s){var l=t.variableDeclaration(n,[]);l._generated=!0,l._blockHoist=a;var d=r.unshiftContainer("body",[l]);s=d[0],i||r.setData(o,s)}var u=t.variableDeclarator(e.id,e.init);s.node.declarations.push(u),this.registerBinding(n,s.get("declarations").pop())},e.prototype.getProgramParent=function(){var e=this;do if(e.path.isProgram())return e;while(e=e.parent);throw new Error("We couldn't find a Function or Program...")},e.prototype.getFunctionParent=function(){var e=this;do if(e.path.isFunctionParent())return e;while(e=e.parent);throw new Error("We couldn't find a Function or Program...")},e.prototype.getBlockParent=function(){var e=this;do if(e.path.isBlockParent())return e;while(e=e.parent);throw new Error("We couldn't find a BlockStatement, For, Switch, Function, Loop or Program...")},e.prototype.getAllBindings=function(){var e=(0,_create2["default"])(null),t=this;do(0,_defaults2["default"])(e,t.bindings),t=t.parent;while(t);return e},e.prototype.getAllBindingsOfKind=function(){for(var e=(0,_create2["default"])(null),t=arguments,r=Array.isArray(t),i=0,t=r?t:(0,_getIterator3["default"])(t);;){var n;if(r){if(i>=t.length)break;n=t[i++]}else{if(i=t.next(),i.done)break;n=i.value}var a=n,o=this;do{for(var s in o.bindings){var l=o.bindings[s];l.kind===a&&(e[s]=l)}o=o.parent}while(o)}return e},e.prototype.bindingIdentifierEquals=function(e,t){return this.getBindingIdentifier(e)===t},e.prototype.warnOnFlowBinding=function(e){return 0===_crawlCallsCount&&e&&e.path.isFlow()&&console.warn("\n        You or one of the Babel plugins you are using are using Flow declarations as bindings.\n        Support for this will be removed in version 6.8. To find out the caller, grep for this\n        message and change it to a `console.trace()`.\n      "),e},e.prototype.getBinding=function(e){var t=this;do{var r=t.getOwnBinding(e);if(r)return this.warnOnFlowBinding(r)}while(t=t.parent)},e.prototype.getOwnBinding=function(e){return this.warnOnFlowBinding(this.bindings[e])},e.prototype.getBindingIdentifier=function(e){var t=this.getBinding(e);return t&&t.identifier},e.prototype.getOwnBindingIdentifier=function(e){var t=this.bindings[e];return t&&t.identifier},e.prototype.hasOwnBinding=function(e){return!!this.getOwnBinding(e)},e.prototype.hasBinding=function(t,r){return!!t&&(!!this.hasOwnBinding(t)||(!!this.parentHasBinding(t,r)||(!!this.hasUid(t)||(!(r||!(0,_includes2["default"])(e.globals,t))||!(r||!(0,_includes2["default"])(e.contextVariables,t))))))},e.prototype.parentHasBinding=function(e,t){return this.parent&&this.parent.hasBinding(e,t)},e.prototype.moveBindingTo=function(e,t){var r=this.getBinding(e);r&&(r.scope.removeOwnBinding(e),r.scope=t,t.bindings[e]=r)},e.prototype.removeOwnBinding=function(e){delete this.bindings[e]},e.prototype.removeBinding=function(e){var t=this.getBinding(e);t&&t.scope.removeOwnBinding(e);var r=this;do r.uids[e]&&(r.uids[e]=!1);while(r=r.parent)},e}();Scope.globals=(0,_keys2["default"])(_globals2["default"].builtin),Scope.contextVariables=["arguments","undefined","Infinity","NaN"],exports["default"]=Scope,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/lodash/includes.js":
/***/ function(module, exports, __webpack_require__) {

	function includes(e,r,i,n){e=isArrayLike(e)?e:values(e),i=i&&!n?toInteger(i):0;var a=e.length;return i<0&&(i=nativeMax(a+i,0)),isString(e)?i<=a&&e.indexOf(r,i)>-1:!!a&&baseIndexOf(e,r,i)>-1}var baseIndexOf=__webpack_require__("./node_modules/lodash/_baseIndexOf.js"),isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js"),isString=__webpack_require__("./node_modules/lodash/isString.js"),toInteger=__webpack_require__("./node_modules/lodash/toInteger.js"),values=__webpack_require__("./node_modules/lodash/values.js"),nativeMax=Math.max;module.exports=includes;

/***/ },

/***/ "./node_modules/lodash/toInteger.js":
/***/ function(module, exports, __webpack_require__) {

	function toInteger(t){var e=toFinite(t),r=e%1;return e===e?r?e-r:e:0}var toFinite=__webpack_require__("./node_modules/lodash/toFinite.js");module.exports=toInteger;

/***/ },

/***/ "./node_modules/lodash/toFinite.js":
/***/ function(module, exports, __webpack_require__) {

	function toFinite(r){if(!r)return 0===r?r:0;if(r=toNumber(r),r===INFINITY||r===-INFINITY){var e=r<0?-1:1;return e*MAX_INTEGER}return r===r?r:0}var toNumber=__webpack_require__("./node_modules/lodash/toNumber.js"),INFINITY=1/0,MAX_INTEGER=1.7976931348623157e308;module.exports=toFinite;

/***/ },

/***/ "./node_modules/lodash/toNumber.js":
/***/ function(module, exports, __webpack_require__) {

	function toNumber(e){if("number"==typeof e)return e;if(isSymbol(e))return NAN;if(isObject(e)){var r="function"==typeof e.valueOf?e.valueOf():e;e=isObject(r)?r+"":r}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(reTrim,"");var t=reIsBinary.test(e);return t||reIsOctal.test(e)?freeParseInt(e.slice(2),t?2:8):reIsBadHex.test(e)?NAN:+e}var isObject=__webpack_require__("./node_modules/lodash/isObject.js"),isSymbol=__webpack_require__("./node_modules/lodash/isSymbol.js"),NAN=NaN,reTrim=/^\s+|\s+$/g,reIsBadHex=/^[-+]0x[0-9a-f]+$/i,reIsBinary=/^0b[01]+$/i,reIsOctal=/^0o[0-7]+$/i,freeParseInt=parseInt;module.exports=toNumber;

/***/ },

/***/ "./node_modules/lodash/values.js":
/***/ function(module, exports, __webpack_require__) {

	function values(e){return e?baseValues(e,keys(e)):[]}var baseValues=__webpack_require__("./node_modules/lodash/_baseValues.js"),keys=__webpack_require__("./node_modules/lodash/keys.js");module.exports=values;

/***/ },

/***/ "./node_modules/lodash/_baseValues.js":
/***/ function(module, exports, __webpack_require__) {

	function baseValues(a,r){return arrayMap(r,function(r){return a[r]})}var arrayMap=__webpack_require__("./node_modules/lodash/_arrayMap.js");module.exports=baseValues;

/***/ },

/***/ "./node_modules/lodash/repeat.js":
/***/ function(module, exports, __webpack_require__) {

	function repeat(e,t,r){return t=(r?isIterateeCall(e,t,r):void 0===t)?1:toInteger(t),baseRepeat(toString(e),t)}var baseRepeat=__webpack_require__("./node_modules/lodash/_baseRepeat.js"),isIterateeCall=__webpack_require__("./node_modules/lodash/_isIterateeCall.js"),toInteger=__webpack_require__("./node_modules/lodash/toInteger.js"),toString=__webpack_require__("./node_modules/lodash/toString.js");module.exports=repeat;

/***/ },

/***/ "./node_modules/lodash/_baseRepeat.js":
/***/ function(module, exports) {

	function baseRepeat(e,o){var r="";if(!e||o<1||o>MAX_SAFE_INTEGER)return r;do o%2&&(r+=e),o=nativeFloor(o/2),o&&(e+=e);while(o);return r}var MAX_SAFE_INTEGER=9007199254740991,nativeFloor=Math.floor;module.exports=baseRepeat;

/***/ },

/***/ "./node_modules/babel-traverse/lib/scope/lib/renamer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var i={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(i[n]=e[n]);return i["default"]=e,i}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_binding=__webpack_require__("./node_modules/babel-traverse/lib/scope/binding.js"),_binding2=_interopRequireDefault(_binding),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),renameVisitor={ReferencedIdentifier:function(e,i){var n=e.node;n.name===i.oldName&&(n.name=i.newName)},Scope:function(e,i){e.scope.bindingIdentifierEquals(i.oldName,i.binding.identifier)||e.skip()},"AssignmentExpression|Declaration":function(e,i){var n=e.getOuterBindingIdentifiers();for(var t in n)t===i.oldName&&(n[t].name=i.newName)}},Renamer=function(){function e(i,n,t){(0,_classCallCheck3["default"])(this,e),this.newName=t,this.oldName=n,this.binding=i}return e.prototype.maybeConvertFromExportDeclaration=function(e){var i=e.parentPath.isExportDeclaration()&&e.parentPath;if(i){var n=i.isExportDefaultDeclaration();n&&(e.isFunctionDeclaration()||e.isClassDeclaration())&&!e.node.id&&(e.node.id=e.scope.generateUidIdentifier("default"));var r=e.getOuterBindingIdentifiers(),a=[];for(var o in r){var s=o===this.oldName?this.newName:o,l=n?"default":o;a.push(t.exportSpecifier(t.identifier(s),t.identifier(l)))}if(a.length){var c=t.exportNamedDeclaration(null,a);e.isFunctionDeclaration()&&(c._blockHoist=3),i.insertAfter(c),i.replaceWith(e.node)}}},e.prototype.maybeConvertFromClassFunctionDeclaration=function(e){},e.prototype.maybeConvertFromClassFunctionExpression=function(e){},e.prototype.rename=function(e){var i=this.binding,n=this.oldName,t=this.newName,r=i.scope,a=i.path,o=a.find(function(e){return e.isDeclaration()||e.isFunctionExpression()});o&&this.maybeConvertFromExportDeclaration(o),r.traverse(e||r.block,renameVisitor,this),e||(r.removeOwnBinding(n),r.bindings[t]=i,this.binding.identifier.name=t),"hoisted"===i.type,o&&(this.maybeConvertFromClassFunctionDeclaration(o),this.maybeConvertFromClassFunctionExpression(o))},e}();exports["default"]=Renamer,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-traverse/lib/scope/binding.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),Binding=function(){function e(t){var s=t.existing,i=t.identifier,n=t.scope,a=t.path,o=t.kind;(0,_classCallCheck3["default"])(this,e),this.identifier=i,this.scope=n,this.path=a,this.kind=o,this.constantViolations=[],this.constant=!0,this.referencePaths=[],this.referenced=!1,this.references=0,this.clearValue(),s&&(this.constantViolations=[].concat(s.path,s.constantViolations,this.constantViolations))}return e.prototype.deoptValue=function(){this.clearValue(),this.hasDeoptedValue=!0},e.prototype.setValue=function(e){this.hasDeoptedValue||(this.hasValue=!0,this.value=e)},e.prototype.clearValue=function(){this.hasDeoptedValue=!1,this.hasValue=!1,this.value=null},e.prototype.reassign=function(e){this.constant=!1,this.constantViolations.indexOf(e)===-1&&this.constantViolations.push(e)},e.prototype.reference=function(e){this.referencePaths.indexOf(e)===-1&&(this.referenced=!0,this.references++,this.referencePaths.push(e))},e.prototype.dereference=function(){this.references--,this.referenced=!!this.references},e}();exports["default"]=Binding,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/lodash/defaults.js":
/***/ function(module, exports, __webpack_require__) {

	var apply=__webpack_require__("./node_modules/lodash/_apply.js"),assignInDefaults=__webpack_require__("./node_modules/lodash/_assignInDefaults.js"),assignInWith=__webpack_require__("./node_modules/lodash/assignInWith.js"),baseRest=__webpack_require__("./node_modules/lodash/_baseRest.js"),defaults=baseRest(function(s){return s.push(void 0,assignInDefaults),apply(assignInWith,void 0,s)});module.exports=defaults;

/***/ },

/***/ "./node_modules/lodash/_assignInDefaults.js":
/***/ function(module, exports, __webpack_require__) {

	function assignInDefaults(e,o,t,r){return void 0===e||eq(e,objectProto[t])&&!hasOwnProperty.call(r,t)?o:e}var eq=__webpack_require__("./node_modules/lodash/eq.js"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=assignInDefaults;

/***/ },

/***/ "./node_modules/lodash/assignInWith.js":
/***/ function(module, exports, __webpack_require__) {

	var copyObject=__webpack_require__("./node_modules/lodash/_copyObject.js"),createAssigner=__webpack_require__("./node_modules/lodash/_createAssigner.js"),keysIn=__webpack_require__("./node_modules/lodash/keysIn.js"),assignInWith=createAssigner(function(e,r,s,n){copyObject(r,keysIn(r),e,n)});module.exports=assignInWith;

/***/ },

/***/ "./node_modules/lodash/keysIn.js":
/***/ function(module, exports, __webpack_require__) {

	function keysIn(e){return isArrayLike(e)?arrayLikeKeys(e,!0):baseKeysIn(e)}var arrayLikeKeys=__webpack_require__("./node_modules/lodash/_arrayLikeKeys.js"),baseKeysIn=__webpack_require__("./node_modules/lodash/_baseKeysIn.js"),isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js");module.exports=keysIn;

/***/ },

/***/ "./node_modules/lodash/_baseKeysIn.js":
/***/ function(module, exports, __webpack_require__) {

	function baseKeysIn(e){if(!isObject(e))return nativeKeysIn(e);var r=isPrototype(e),t=[];for(var o in e)("constructor"!=o||!r&&hasOwnProperty.call(e,o))&&t.push(o);return t}var isObject=__webpack_require__("./node_modules/lodash/isObject.js"),isPrototype=__webpack_require__("./node_modules/lodash/_isPrototype.js"),nativeKeysIn=__webpack_require__("./node_modules/lodash/_nativeKeysIn.js"),objectProto=Object.prototype,hasOwnProperty=objectProto.hasOwnProperty;module.exports=baseKeysIn;

/***/ },

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/***/ function(module, exports) {

	function nativeKeysIn(n){var e=[];if(null!=n)for(var r in Object(n))e.push(r);return e}module.exports=nativeKeysIn;

/***/ },

/***/ "./node_modules/babel-messages/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function get(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var i=MESSAGES[e];if(!i)throw new ReferenceError("Unknown message "+(0,_stringify2["default"])(e));return r=parseArgs(r),i.replace(/\$(\d+)/g,function(e,t){return r[t-1]})}function parseArgs(e){return e.map(function(e){if(null!=e&&e.inspect)return e.inspect();try{return(0,_stringify2["default"])(e)||e+""}catch(t){return util.inspect(e)}})}exports.__esModule=!0,exports.MESSAGES=void 0;var _stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify);exports.get=get,exports.parseArgs=parseArgs;var _util=__webpack_require__("./node_modules/util/util.js"),util=_interopRequireWildcard(_util),MESSAGES=exports.MESSAGES={tailCallReassignmentDeopt:"Function reference has been reassigned, so it will probably be dereferenced, therefore we can't optimise this with confidence",classesIllegalBareSuper:"Illegal use of bare super",classesIllegalSuperCall:"Direct super call is illegal in non-constructor, use super.$1() instead",scopeDuplicateDeclaration:"Duplicate declaration $1",settersNoRest:"Setters aren't allowed to have a rest",noAssignmentsInForHead:"No assignments allowed in for-in/of head",expectedMemberExpressionOrIdentifier:"Expected type MemberExpression or Identifier",invalidParentForThisNode:"We don't know how to handle this node within the current parent - please open an issue",readOnly:"$1 is read-only",unknownForHead:"Unknown node type $1 in ForStatement",didYouMean:"Did you mean $1?",codeGeneratorDeopt:"Note: The code generator has deoptimised the styling of $1 as it exceeds the max of $2.",missingTemplatesDirectory:"no templates directory - this is most likely the result of a broken `npm publish`. Please report to https://github.com/babel/babel/issues",unsupportedOutputType:"Unsupported output type $1",illegalMethodName:"Illegal method name $1",lostTrackNodePath:"We lost track of this node's position, likely because the AST was directly manipulated",modulesIllegalExportName:"Illegal export $1",modulesDuplicateDeclarations:"Duplicate module declarations with the same source but in different scopes",undeclaredVariable:"Reference to undeclared variable $1",undeclaredVariableType:"Referencing a type alias outside of a type annotation",undeclaredVariableSuggestion:"Reference to undeclared variable $1 - did you mean $2?",traverseNeedsParent:"You must pass a scope and parentPath unless traversing a Program/File. Instead of that you tried to traverse a $1 node without passing scope and parentPath.",traverseVerifyRootFunction:"You passed `traverse()` a function when it expected a visitor object, are you sure you didn't mean `{ enter: Function }`?",traverseVerifyVisitorProperty:"You passed `traverse()` a visitor object with the property $1 that has the invalid property $2",traverseVerifyNodeType:"You gave us a visitor for the node type $1 but it's not a valid type",pluginNotObject:"Plugin $2 specified in $1 was expected to return an object when invoked but returned $3",pluginNotFunction:"Plugin $2 specified in $1 was expected to return a function but returned $3",pluginUnknown:"Unknown plugin $1 specified in $2 at $3, attempted to resolve relative to $4",pluginInvalidProperty:"Plugin $2 specified in $1 provided an invalid property of $3"};

/***/ },

/***/ "./node_modules/util/util.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process, global) {function inspect(e,r){var t={seen:[],stylize:stylizeNoColor};return arguments.length>=3&&(t.depth=arguments[2]),arguments.length>=4&&(t.colors=arguments[3]),isBoolean(r)?t.showHidden=r:r&&exports._extend(t,r),isUndefined(t.showHidden)&&(t.showHidden=!1),isUndefined(t.depth)&&(t.depth=2),isUndefined(t.colors)&&(t.colors=!1),isUndefined(t.customInspect)&&(t.customInspect=!0),t.colors&&(t.stylize=stylizeWithColor),formatValue(t,e,t.depth)}function stylizeWithColor(e,r){var t=inspect.styles[r];return t?"["+inspect.colors[t][0]+"m"+e+"["+inspect.colors[t][1]+"m":e}function stylizeNoColor(e,r){return e}function arrayToHash(e){var r={};return e.forEach(function(e,t){r[e]=!0}),r}function formatValue(e,r,t){if(e.customInspect&&r&&isFunction(r.inspect)&&r.inspect!==exports.inspect&&(!r.constructor||r.constructor.prototype!==r)){var n=r.inspect(t,e);return isString(n)||(n=formatValue(e,n,t)),n}var i=formatPrimitive(e,r);if(i)return i;var o=Object.keys(r),s=arrayToHash(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(r)),isError(r)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return formatError(r);if(0===o.length){if(isFunction(r)){var u=r.name?": "+r.name:"";return e.stylize("[Function"+u+"]","special")}if(isRegExp(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(isDate(r))return e.stylize(Date.prototype.toString.call(r),"date");if(isError(r))return formatError(r)}var c="",a=!1,l=["{","}"];if(isArray(r)&&(a=!0,l=["[","]"]),isFunction(r)){var p=r.name?": "+r.name:"";c=" [Function"+p+"]"}if(isRegExp(r)&&(c=" "+RegExp.prototype.toString.call(r)),isDate(r)&&(c=" "+Date.prototype.toUTCString.call(r)),isError(r)&&(c=" "+formatError(r)),0===o.length&&(!a||0==r.length))return l[0]+c+l[1];if(t<0)return isRegExp(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special");e.seen.push(r);var f;return f=a?formatArray(e,r,t,s,o):o.map(function(n){return formatProperty(e,r,t,s,n,a)}),e.seen.pop(),reduceToSingleString(f,c,l)}function formatPrimitive(e,r){if(isUndefined(r))return e.stylize("undefined","undefined");if(isString(r)){var t="'"+JSON.stringify(r).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(t,"string")}return isNumber(r)?e.stylize(""+r,"number"):isBoolean(r)?e.stylize(""+r,"boolean"):isNull(r)?e.stylize("null","null"):void 0}function formatError(e){return"["+Error.prototype.toString.call(e)+"]"}function formatArray(e,r,t,n,i){for(var o=[],s=0,u=r.length;s<u;++s)hasOwnProperty(r,String(s))?o.push(formatProperty(e,r,t,n,String(s),!0)):o.push("");return i.forEach(function(i){i.match(/^\d+$/)||o.push(formatProperty(e,r,t,n,i,!0))}),o}function formatProperty(e,r,t,n,i,o){var s,u,c;if(c=Object.getOwnPropertyDescriptor(r,i)||{value:r[i]},c.get?u=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(u=e.stylize("[Setter]","special")),hasOwnProperty(n,i)||(s="["+i+"]"),u||(e.seen.indexOf(c.value)<0?(u=isNull(t)?formatValue(e,c.value,null):formatValue(e,c.value,t-1),u.indexOf("\n")>-1&&(u=o?u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+u.split("\n").map(function(e){return"   "+e}).join("\n"))):u=e.stylize("[Circular]","special")),isUndefined(s)){if(o&&i.match(/^\d+$/))return u;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+u}function reduceToSingleString(e,r,t){var n=0,i=e.reduce(function(e,r){return n++,r.indexOf("\n")>=0&&n++,e+r.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?t[0]+(""===r?"":r+"\n ")+" "+e.join(",\n  ")+" "+t[1]:t[0]+r+" "+e.join(", ")+" "+t[1]}function isArray(e){return Array.isArray(e)}function isBoolean(e){return"boolean"==typeof e}function isNull(e){return null===e}function isNullOrUndefined(e){return null==e}function isNumber(e){return"number"==typeof e}function isString(e){return"string"==typeof e}function isSymbol(e){return"symbol"==typeof e}function isUndefined(e){return void 0===e}function isRegExp(e){return isObject(e)&&"[object RegExp]"===objectToString(e)}function isObject(e){return"object"==typeof e&&null!==e}function isDate(e){return isObject(e)&&"[object Date]"===objectToString(e)}function isError(e){return isObject(e)&&("[object Error]"===objectToString(e)||e instanceof Error)}function isFunction(e){return"function"==typeof e}function isPrimitive(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function objectToString(e){return Object.prototype.toString.call(e)}function pad(e){return e<10?"0"+e.toString(10):e.toString(10)}function timestamp(){var e=new Date,r=[pad(e.getHours()),pad(e.getMinutes()),pad(e.getSeconds())].join(":");return[e.getDate(),months[e.getMonth()],r].join(" ")}function hasOwnProperty(e,r){return Object.prototype.hasOwnProperty.call(e,r)}var formatRegExp=/%[sdj%]/g;exports.format=function(e){if(!isString(e)){for(var r=[],t=0;t<arguments.length;t++)r.push(inspect(arguments[t]));return r.join(" ")}for(var t=1,n=arguments,i=n.length,o=String(e).replace(formatRegExp,function(e){if("%%"===e)return"%";if(t>=i)return e;switch(e){case"%s":return String(n[t++]);case"%d":return Number(n[t++]);case"%j":try{return JSON.stringify(n[t++])}catch(r){return"[Circular]"}default:return e}}),s=n[t];t<i;s=n[++t])o+=isNull(s)||!isObject(s)?" "+s:" "+inspect(s);return o},exports.deprecate=function(e,r){function t(){if(!n){if(process.throwDeprecation)throw new Error(r);process.traceDeprecation?console.trace(r):console.error(r),n=!0}return e.apply(this,arguments)}if(isUndefined(global.process))return function(){return exports.deprecate(e,r).apply(this,arguments)};if(process.noDeprecation===!0)return e;var n=!1;return t};var debugs={},debugEnviron;exports.debuglog=function(e){if(isUndefined(debugEnviron)&&(debugEnviron=process.env.NODE_DEBUG||""),e=e.toUpperCase(),!debugs[e])if(new RegExp("\\b"+e+"\\b","i").test(debugEnviron)){var r=process.pid;debugs[e]=function(){var t=exports.format.apply(exports,arguments);console.error("%s %d: %s",e,r,t)}}else debugs[e]=function(){};return debugs[e]},exports.inspect=inspect,inspect.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},inspect.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},exports.isArray=isArray,exports.isBoolean=isBoolean,exports.isNull=isNull,exports.isNullOrUndefined=isNullOrUndefined,exports.isNumber=isNumber,exports.isString=isString,exports.isSymbol=isSymbol,exports.isUndefined=isUndefined,exports.isRegExp=isRegExp,exports.isObject=isObject,exports.isDate=isDate,exports.isError=isError,exports.isFunction=isFunction,exports.isPrimitive=isPrimitive,exports.isBuffer=__webpack_require__("./node_modules/util/support/isBufferBrowser.js");var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];exports.log=function(){console.log("%s - %s",timestamp(),exports.format.apply(exports,arguments))},exports.inherits=__webpack_require__("./node_modules/util/node_modules/inherits/inherits_browser.js"),exports._extend=function(e,r){if(!r||!isObject(r))return e;for(var t=Object.keys(r),n=t.length;n--;)e[t[n]]=r[t[n]];return e};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js"), (function() { return this; }())))

/***/ },

/***/ "./node_modules/util/support/isBufferBrowser.js":
/***/ function(module, exports) {

	module.exports=function(o){return o&&"object"==typeof o&&"function"==typeof o.copy&&"function"==typeof o.fill&&"function"==typeof o.readUInt8};

/***/ },

/***/ "./node_modules/util/node_modules/inherits/inherits_browser.js":
/***/ function(module, exports) {

	"function"==typeof Object.create?module.exports=function(t,e){t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}:module.exports=function(t,e){t.super_=e;var o=function(){};o.prototype=e.prototype,t.prototype=new o,t.prototype.constructor=t};

/***/ },

/***/ "./node_modules/globals/index.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/globals/globals.json");

/***/ },

/***/ "./node_modules/globals/globals.json":
/***/ function(module, exports) {

	module.exports = {
		"builtin": {
			"Array": false,
			"ArrayBuffer": false,
			"Boolean": false,
			"constructor": false,
			"DataView": false,
			"Date": false,
			"decodeURI": false,
			"decodeURIComponent": false,
			"encodeURI": false,
			"encodeURIComponent": false,
			"Error": false,
			"escape": false,
			"eval": false,
			"EvalError": false,
			"Float32Array": false,
			"Float64Array": false,
			"Function": false,
			"hasOwnProperty": false,
			"Infinity": false,
			"Int16Array": false,
			"Int32Array": false,
			"Int8Array": false,
			"isFinite": false,
			"isNaN": false,
			"isPrototypeOf": false,
			"JSON": false,
			"Map": false,
			"Math": false,
			"NaN": false,
			"Number": false,
			"Object": false,
			"parseFloat": false,
			"parseInt": false,
			"Promise": false,
			"propertyIsEnumerable": false,
			"Proxy": false,
			"RangeError": false,
			"ReferenceError": false,
			"Reflect": false,
			"RegExp": false,
			"Set": false,
			"String": false,
			"Symbol": false,
			"SyntaxError": false,
			"System": false,
			"toLocaleString": false,
			"toString": false,
			"TypeError": false,
			"Uint16Array": false,
			"Uint32Array": false,
			"Uint8Array": false,
			"Uint8ClampedArray": false,
			"undefined": false,
			"unescape": false,
			"URIError": false,
			"valueOf": false,
			"WeakMap": false,
			"WeakSet": false
		},
		"es5": {
			"Array": false,
			"Boolean": false,
			"constructor": false,
			"Date": false,
			"decodeURI": false,
			"decodeURIComponent": false,
			"encodeURI": false,
			"encodeURIComponent": false,
			"Error": false,
			"escape": false,
			"eval": false,
			"EvalError": false,
			"Float32Array": false,
			"Float64Array": false,
			"Function": false,
			"hasOwnProperty": false,
			"Infinity": false,
			"isFinite": false,
			"isNaN": false,
			"isPrototypeOf": false,
			"JSON": false,
			"Math": false,
			"NaN": false,
			"Number": false,
			"Object": false,
			"parseFloat": false,
			"parseInt": false,
			"propertyIsEnumerable": false,
			"RangeError": false,
			"ReferenceError": false,
			"RegExp": false,
			"String": false,
			"SyntaxError": false,
			"toLocaleString": false,
			"toString": false,
			"TypeError": false,
			"undefined": false,
			"unescape": false,
			"URIError": false,
			"valueOf": false
		},
		"es6": {
			"Array": false,
			"ArrayBuffer": false,
			"Boolean": false,
			"constructor": false,
			"DataView": false,
			"Date": false,
			"decodeURI": false,
			"decodeURIComponent": false,
			"encodeURI": false,
			"encodeURIComponent": false,
			"Error": false,
			"escape": false,
			"eval": false,
			"EvalError": false,
			"Float32Array": false,
			"Float64Array": false,
			"Function": false,
			"hasOwnProperty": false,
			"Infinity": false,
			"Int16Array": false,
			"Int32Array": false,
			"Int8Array": false,
			"isFinite": false,
			"isNaN": false,
			"isPrototypeOf": false,
			"JSON": false,
			"Map": false,
			"Math": false,
			"NaN": false,
			"Number": false,
			"Object": false,
			"parseFloat": false,
			"parseInt": false,
			"Promise": false,
			"propertyIsEnumerable": false,
			"Proxy": false,
			"RangeError": false,
			"ReferenceError": false,
			"Reflect": false,
			"RegExp": false,
			"Set": false,
			"String": false,
			"Symbol": false,
			"SyntaxError": false,
			"System": false,
			"toLocaleString": false,
			"toString": false,
			"TypeError": false,
			"Uint16Array": false,
			"Uint32Array": false,
			"Uint8Array": false,
			"Uint8ClampedArray": false,
			"undefined": false,
			"unescape": false,
			"URIError": false,
			"valueOf": false,
			"WeakMap": false,
			"WeakSet": false
		},
		"browser": {
			"addEventListener": false,
			"alert": false,
			"AnalyserNode": false,
			"AnimationEvent": false,
			"applicationCache": false,
			"ApplicationCache": false,
			"ApplicationCacheErrorEvent": false,
			"atob": false,
			"Attr": false,
			"Audio": false,
			"AudioBuffer": false,
			"AudioBufferSourceNode": false,
			"AudioContext": false,
			"AudioDestinationNode": false,
			"AudioListener": false,
			"AudioNode": false,
			"AudioParam": false,
			"AudioProcessingEvent": false,
			"AutocompleteErrorEvent": false,
			"BarProp": false,
			"BatteryManager": false,
			"BeforeUnloadEvent": false,
			"BiquadFilterNode": false,
			"Blob": false,
			"blur": false,
			"btoa": false,
			"Cache": false,
			"caches": false,
			"CacheStorage": false,
			"cancelAnimationFrame": false,
			"CanvasGradient": false,
			"CanvasPattern": false,
			"CanvasRenderingContext2D": false,
			"CDATASection": false,
			"ChannelMergerNode": false,
			"ChannelSplitterNode": false,
			"CharacterData": false,
			"clearInterval": false,
			"clearTimeout": false,
			"clientInformation": false,
			"ClientRect": false,
			"ClientRectList": false,
			"ClipboardEvent": false,
			"close": false,
			"closed": false,
			"CloseEvent": false,
			"Comment": false,
			"CompositionEvent": false,
			"confirm": false,
			"console": false,
			"ConvolverNode": false,
			"crypto": false,
			"Crypto": false,
			"CryptoKey": false,
			"CSS": false,
			"CSSFontFaceRule": false,
			"CSSImportRule": false,
			"CSSKeyframeRule": false,
			"CSSKeyframesRule": false,
			"CSSMediaRule": false,
			"CSSPageRule": false,
			"CSSRule": false,
			"CSSRuleList": false,
			"CSSStyleDeclaration": false,
			"CSSStyleRule": false,
			"CSSStyleSheet": false,
			"CSSSupportsRule": false,
			"CSSUnknownRule": false,
			"CSSViewportRule": false,
			"CustomEvent": false,
			"DataTransfer": false,
			"DataTransferItem": false,
			"DataTransferItemList": false,
			"Debug": false,
			"defaultStatus": false,
			"defaultstatus": false,
			"DelayNode": false,
			"DeviceMotionEvent": false,
			"DeviceOrientationEvent": false,
			"devicePixelRatio": false,
			"dispatchEvent": false,
			"document": false,
			"Document": false,
			"DocumentFragment": false,
			"DocumentType": false,
			"DOMError": false,
			"DOMException": false,
			"DOMImplementation": false,
			"DOMParser": false,
			"DOMSettableTokenList": false,
			"DOMStringList": false,
			"DOMStringMap": false,
			"DOMTokenList": false,
			"DragEvent": false,
			"DynamicsCompressorNode": false,
			"Element": false,
			"ElementTimeControl": false,
			"ErrorEvent": false,
			"event": false,
			"Event": false,
			"EventSource": false,
			"EventTarget": false,
			"external": false,
			"fetch": false,
			"File": false,
			"FileError": false,
			"FileList": false,
			"FileReader": false,
			"find": false,
			"focus": false,
			"FocusEvent": false,
			"FontFace": false,
			"FormData": false,
			"frameElement": false,
			"frames": false,
			"GainNode": false,
			"Gamepad": false,
			"GamepadButton": false,
			"GamepadEvent": false,
			"getComputedStyle": false,
			"getSelection": false,
			"HashChangeEvent": false,
			"Headers": false,
			"history": false,
			"History": false,
			"HTMLAllCollection": false,
			"HTMLAnchorElement": false,
			"HTMLAppletElement": false,
			"HTMLAreaElement": false,
			"HTMLAudioElement": false,
			"HTMLBaseElement": false,
			"HTMLBlockquoteElement": false,
			"HTMLBodyElement": false,
			"HTMLBRElement": false,
			"HTMLButtonElement": false,
			"HTMLCanvasElement": false,
			"HTMLCollection": false,
			"HTMLContentElement": false,
			"HTMLDataListElement": false,
			"HTMLDetailsElement": false,
			"HTMLDialogElement": false,
			"HTMLDirectoryElement": false,
			"HTMLDivElement": false,
			"HTMLDListElement": false,
			"HTMLDocument": false,
			"HTMLElement": false,
			"HTMLEmbedElement": false,
			"HTMLFieldSetElement": false,
			"HTMLFontElement": false,
			"HTMLFormControlsCollection": false,
			"HTMLFormElement": false,
			"HTMLFrameElement": false,
			"HTMLFrameSetElement": false,
			"HTMLHeadElement": false,
			"HTMLHeadingElement": false,
			"HTMLHRElement": false,
			"HTMLHtmlElement": false,
			"HTMLIFrameElement": false,
			"HTMLImageElement": false,
			"HTMLInputElement": false,
			"HTMLIsIndexElement": false,
			"HTMLKeygenElement": false,
			"HTMLLabelElement": false,
			"HTMLLayerElement": false,
			"HTMLLegendElement": false,
			"HTMLLIElement": false,
			"HTMLLinkElement": false,
			"HTMLMapElement": false,
			"HTMLMarqueeElement": false,
			"HTMLMediaElement": false,
			"HTMLMenuElement": false,
			"HTMLMetaElement": false,
			"HTMLMeterElement": false,
			"HTMLModElement": false,
			"HTMLObjectElement": false,
			"HTMLOListElement": false,
			"HTMLOptGroupElement": false,
			"HTMLOptionElement": false,
			"HTMLOptionsCollection": false,
			"HTMLOutputElement": false,
			"HTMLParagraphElement": false,
			"HTMLParamElement": false,
			"HTMLPictureElement": false,
			"HTMLPreElement": false,
			"HTMLProgressElement": false,
			"HTMLQuoteElement": false,
			"HTMLScriptElement": false,
			"HTMLSelectElement": false,
			"HTMLShadowElement": false,
			"HTMLSourceElement": false,
			"HTMLSpanElement": false,
			"HTMLStyleElement": false,
			"HTMLTableCaptionElement": false,
			"HTMLTableCellElement": false,
			"HTMLTableColElement": false,
			"HTMLTableElement": false,
			"HTMLTableRowElement": false,
			"HTMLTableSectionElement": false,
			"HTMLTemplateElement": false,
			"HTMLTextAreaElement": false,
			"HTMLTitleElement": false,
			"HTMLTrackElement": false,
			"HTMLUListElement": false,
			"HTMLUnknownElement": false,
			"HTMLVideoElement": false,
			"IDBCursor": false,
			"IDBCursorWithValue": false,
			"IDBDatabase": false,
			"IDBEnvironment": false,
			"IDBFactory": false,
			"IDBIndex": false,
			"IDBKeyRange": false,
			"IDBObjectStore": false,
			"IDBOpenDBRequest": false,
			"IDBRequest": false,
			"IDBTransaction": false,
			"IDBVersionChangeEvent": false,
			"Image": false,
			"ImageBitmap": false,
			"ImageData": false,
			"indexedDB": false,
			"innerHeight": false,
			"innerWidth": false,
			"InputEvent": false,
			"InputMethodContext": false,
			"Intl": false,
			"KeyboardEvent": false,
			"length": false,
			"localStorage": false,
			"location": false,
			"Location": false,
			"locationbar": false,
			"matchMedia": false,
			"MediaElementAudioSourceNode": false,
			"MediaEncryptedEvent": false,
			"MediaError": false,
			"MediaKeyError": false,
			"MediaKeyEvent": false,
			"MediaKeyMessageEvent": false,
			"MediaKeys": false,
			"MediaKeySession": false,
			"MediaKeyStatusMap": false,
			"MediaKeySystemAccess": false,
			"MediaList": false,
			"MediaQueryList": false,
			"MediaQueryListEvent": false,
			"MediaSource": false,
			"MediaStreamAudioDestinationNode": false,
			"MediaStreamAudioSourceNode": false,
			"MediaStreamEvent": false,
			"MediaStreamTrack": false,
			"menubar": false,
			"MessageChannel": false,
			"MessageEvent": false,
			"MessagePort": false,
			"MIDIAccess": false,
			"MIDIConnectionEvent": false,
			"MIDIInput": false,
			"MIDIInputMap": false,
			"MIDIMessageEvent": false,
			"MIDIOutput": false,
			"MIDIOutputMap": false,
			"MIDIPort": false,
			"MimeType": false,
			"MimeTypeArray": false,
			"MouseEvent": false,
			"moveBy": false,
			"moveTo": false,
			"MutationEvent": false,
			"MutationObserver": false,
			"MutationRecord": false,
			"name": false,
			"NamedNodeMap": false,
			"navigator": false,
			"Navigator": false,
			"Node": false,
			"NodeFilter": false,
			"NodeIterator": false,
			"NodeList": false,
			"Notification": false,
			"OfflineAudioCompletionEvent": false,
			"OfflineAudioContext": false,
			"offscreenBuffering": false,
			"onbeforeunload": true,
			"onblur": true,
			"onerror": true,
			"onfocus": true,
			"onload": true,
			"onresize": true,
			"onunload": true,
			"open": false,
			"openDatabase": false,
			"opener": false,
			"opera": false,
			"Option": false,
			"OscillatorNode": false,
			"outerHeight": false,
			"outerWidth": false,
			"PageTransitionEvent": false,
			"pageXOffset": false,
			"pageYOffset": false,
			"parent": false,
			"Path2D": false,
			"performance": false,
			"Performance": false,
			"PerformanceEntry": false,
			"PerformanceMark": false,
			"PerformanceMeasure": false,
			"PerformanceNavigation": false,
			"PerformanceResourceTiming": false,
			"PerformanceTiming": false,
			"PeriodicWave": false,
			"Permissions": false,
			"PermissionStatus": false,
			"personalbar": false,
			"Plugin": false,
			"PluginArray": false,
			"PopStateEvent": false,
			"postMessage": false,
			"print": false,
			"ProcessingInstruction": false,
			"ProgressEvent": false,
			"prompt": false,
			"PushManager": false,
			"PushSubscription": false,
			"RadioNodeList": false,
			"Range": false,
			"ReadableByteStream": false,
			"ReadableStream": false,
			"removeEventListener": false,
			"Request": false,
			"requestAnimationFrame": false,
			"resizeBy": false,
			"resizeTo": false,
			"Response": false,
			"RTCIceCandidate": false,
			"RTCSessionDescription": false,
			"screen": false,
			"Screen": false,
			"screenLeft": false,
			"ScreenOrientation": false,
			"screenTop": false,
			"screenX": false,
			"screenY": false,
			"ScriptProcessorNode": false,
			"scroll": false,
			"scrollbars": false,
			"scrollBy": false,
			"scrollTo": false,
			"scrollX": false,
			"scrollY": false,
			"SecurityPolicyViolationEvent": false,
			"Selection": false,
			"self": false,
			"ServiceWorker": false,
			"ServiceWorkerContainer": false,
			"ServiceWorkerRegistration": false,
			"sessionStorage": false,
			"setInterval": false,
			"setTimeout": false,
			"ShadowRoot": false,
			"SharedWorker": false,
			"showModalDialog": false,
			"speechSynthesis": false,
			"SpeechSynthesisEvent": false,
			"SpeechSynthesisUtterance": false,
			"status": false,
			"statusbar": false,
			"stop": false,
			"Storage": false,
			"StorageEvent": false,
			"styleMedia": false,
			"StyleSheet": false,
			"StyleSheetList": false,
			"SubtleCrypto": false,
			"SVGAElement": false,
			"SVGAltGlyphDefElement": false,
			"SVGAltGlyphElement": false,
			"SVGAltGlyphItemElement": false,
			"SVGAngle": false,
			"SVGAnimateColorElement": false,
			"SVGAnimatedAngle": false,
			"SVGAnimatedBoolean": false,
			"SVGAnimatedEnumeration": false,
			"SVGAnimatedInteger": false,
			"SVGAnimatedLength": false,
			"SVGAnimatedLengthList": false,
			"SVGAnimatedNumber": false,
			"SVGAnimatedNumberList": false,
			"SVGAnimatedPathData": false,
			"SVGAnimatedPoints": false,
			"SVGAnimatedPreserveAspectRatio": false,
			"SVGAnimatedRect": false,
			"SVGAnimatedString": false,
			"SVGAnimatedTransformList": false,
			"SVGAnimateElement": false,
			"SVGAnimateMotionElement": false,
			"SVGAnimateTransformElement": false,
			"SVGAnimationElement": false,
			"SVGCircleElement": false,
			"SVGClipPathElement": false,
			"SVGColor": false,
			"SVGColorProfileElement": false,
			"SVGColorProfileRule": false,
			"SVGComponentTransferFunctionElement": false,
			"SVGCSSRule": false,
			"SVGCursorElement": false,
			"SVGDefsElement": false,
			"SVGDescElement": false,
			"SVGDiscardElement": false,
			"SVGDocument": false,
			"SVGElement": false,
			"SVGElementInstance": false,
			"SVGElementInstanceList": false,
			"SVGEllipseElement": false,
			"SVGEvent": false,
			"SVGExternalResourcesRequired": false,
			"SVGFEBlendElement": false,
			"SVGFEColorMatrixElement": false,
			"SVGFEComponentTransferElement": false,
			"SVGFECompositeElement": false,
			"SVGFEConvolveMatrixElement": false,
			"SVGFEDiffuseLightingElement": false,
			"SVGFEDisplacementMapElement": false,
			"SVGFEDistantLightElement": false,
			"SVGFEDropShadowElement": false,
			"SVGFEFloodElement": false,
			"SVGFEFuncAElement": false,
			"SVGFEFuncBElement": false,
			"SVGFEFuncGElement": false,
			"SVGFEFuncRElement": false,
			"SVGFEGaussianBlurElement": false,
			"SVGFEImageElement": false,
			"SVGFEMergeElement": false,
			"SVGFEMergeNodeElement": false,
			"SVGFEMorphologyElement": false,
			"SVGFEOffsetElement": false,
			"SVGFEPointLightElement": false,
			"SVGFESpecularLightingElement": false,
			"SVGFESpotLightElement": false,
			"SVGFETileElement": false,
			"SVGFETurbulenceElement": false,
			"SVGFilterElement": false,
			"SVGFilterPrimitiveStandardAttributes": false,
			"SVGFitToViewBox": false,
			"SVGFontElement": false,
			"SVGFontFaceElement": false,
			"SVGFontFaceFormatElement": false,
			"SVGFontFaceNameElement": false,
			"SVGFontFaceSrcElement": false,
			"SVGFontFaceUriElement": false,
			"SVGForeignObjectElement": false,
			"SVGGElement": false,
			"SVGGeometryElement": false,
			"SVGGlyphElement": false,
			"SVGGlyphRefElement": false,
			"SVGGradientElement": false,
			"SVGGraphicsElement": false,
			"SVGHKernElement": false,
			"SVGICCColor": false,
			"SVGImageElement": false,
			"SVGLangSpace": false,
			"SVGLength": false,
			"SVGLengthList": false,
			"SVGLinearGradientElement": false,
			"SVGLineElement": false,
			"SVGLocatable": false,
			"SVGMarkerElement": false,
			"SVGMaskElement": false,
			"SVGMatrix": false,
			"SVGMetadataElement": false,
			"SVGMissingGlyphElement": false,
			"SVGMPathElement": false,
			"SVGNumber": false,
			"SVGNumberList": false,
			"SVGPaint": false,
			"SVGPathElement": false,
			"SVGPathSeg": false,
			"SVGPathSegArcAbs": false,
			"SVGPathSegArcRel": false,
			"SVGPathSegClosePath": false,
			"SVGPathSegCurvetoCubicAbs": false,
			"SVGPathSegCurvetoCubicRel": false,
			"SVGPathSegCurvetoCubicSmoothAbs": false,
			"SVGPathSegCurvetoCubicSmoothRel": false,
			"SVGPathSegCurvetoQuadraticAbs": false,
			"SVGPathSegCurvetoQuadraticRel": false,
			"SVGPathSegCurvetoQuadraticSmoothAbs": false,
			"SVGPathSegCurvetoQuadraticSmoothRel": false,
			"SVGPathSegLinetoAbs": false,
			"SVGPathSegLinetoHorizontalAbs": false,
			"SVGPathSegLinetoHorizontalRel": false,
			"SVGPathSegLinetoRel": false,
			"SVGPathSegLinetoVerticalAbs": false,
			"SVGPathSegLinetoVerticalRel": false,
			"SVGPathSegList": false,
			"SVGPathSegMovetoAbs": false,
			"SVGPathSegMovetoRel": false,
			"SVGPatternElement": false,
			"SVGPoint": false,
			"SVGPointList": false,
			"SVGPolygonElement": false,
			"SVGPolylineElement": false,
			"SVGPreserveAspectRatio": false,
			"SVGRadialGradientElement": false,
			"SVGRect": false,
			"SVGRectElement": false,
			"SVGRenderingIntent": false,
			"SVGScriptElement": false,
			"SVGSetElement": false,
			"SVGStopElement": false,
			"SVGStringList": false,
			"SVGStylable": false,
			"SVGStyleElement": false,
			"SVGSVGElement": false,
			"SVGSwitchElement": false,
			"SVGSymbolElement": false,
			"SVGTests": false,
			"SVGTextContentElement": false,
			"SVGTextElement": false,
			"SVGTextPathElement": false,
			"SVGTextPositioningElement": false,
			"SVGTitleElement": false,
			"SVGTransform": false,
			"SVGTransformable": false,
			"SVGTransformList": false,
			"SVGTRefElement": false,
			"SVGTSpanElement": false,
			"SVGUnitTypes": false,
			"SVGURIReference": false,
			"SVGUseElement": false,
			"SVGViewElement": false,
			"SVGViewSpec": false,
			"SVGVKernElement": false,
			"SVGZoomAndPan": false,
			"SVGZoomEvent": false,
			"Text": false,
			"TextDecoder": false,
			"TextEncoder": false,
			"TextEvent": false,
			"TextMetrics": false,
			"TextTrack": false,
			"TextTrackCue": false,
			"TextTrackCueList": false,
			"TextTrackList": false,
			"TimeEvent": false,
			"TimeRanges": false,
			"toolbar": false,
			"top": false,
			"Touch": false,
			"TouchEvent": false,
			"TouchList": false,
			"TrackEvent": false,
			"TransitionEvent": false,
			"TreeWalker": false,
			"UIEvent": false,
			"URL": false,
			"ValidityState": false,
			"VTTCue": false,
			"WaveShaperNode": false,
			"WebGLActiveInfo": false,
			"WebGLBuffer": false,
			"WebGLContextEvent": false,
			"WebGLFramebuffer": false,
			"WebGLProgram": false,
			"WebGLRenderbuffer": false,
			"WebGLRenderingContext": false,
			"WebGLShader": false,
			"WebGLShaderPrecisionFormat": false,
			"WebGLTexture": false,
			"WebGLUniformLocation": false,
			"WebSocket": false,
			"WheelEvent": false,
			"window": false,
			"Window": false,
			"Worker": false,
			"XDomainRequest": false,
			"XMLDocument": false,
			"XMLHttpRequest": false,
			"XMLHttpRequestEventTarget": false,
			"XMLHttpRequestProgressEvent": false,
			"XMLHttpRequestUpload": false,
			"XMLSerializer": false,
			"XPathEvaluator": false,
			"XPathException": false,
			"XPathExpression": false,
			"XPathNamespace": false,
			"XPathNSResolver": false,
			"XPathResult": false,
			"XSLTProcessor": false
		},
		"worker": {
			"applicationCache": false,
			"atob": false,
			"Blob": false,
			"BroadcastChannel": false,
			"btoa": false,
			"Cache": false,
			"caches": false,
			"clearInterval": false,
			"clearTimeout": false,
			"close": true,
			"console": false,
			"fetch": false,
			"FileReaderSync": false,
			"FormData": false,
			"Headers": false,
			"IDBCursor": false,
			"IDBCursorWithValue": false,
			"IDBDatabase": false,
			"IDBFactory": false,
			"IDBIndex": false,
			"IDBKeyRange": false,
			"IDBObjectStore": false,
			"IDBOpenDBRequest": false,
			"IDBRequest": false,
			"IDBTransaction": false,
			"IDBVersionChangeEvent": false,
			"ImageData": false,
			"importScripts": true,
			"indexedDB": false,
			"location": false,
			"MessageChannel": false,
			"MessagePort": false,
			"name": false,
			"navigator": false,
			"Notification": false,
			"onclose": true,
			"onconnect": true,
			"onerror": true,
			"onlanguagechange": true,
			"onmessage": true,
			"onoffline": true,
			"ononline": true,
			"onrejectionhandled": true,
			"onunhandledrejection": true,
			"performance": false,
			"Performance": false,
			"PerformanceEntry": false,
			"PerformanceMark": false,
			"PerformanceMeasure": false,
			"PerformanceNavigation": false,
			"PerformanceResourceTiming": false,
			"PerformanceTiming": false,
			"postMessage": true,
			"Promise": false,
			"Request": false,
			"Response": false,
			"self": true,
			"ServiceWorkerRegistration": false,
			"setInterval": false,
			"setTimeout": false,
			"TextDecoder": false,
			"TextEncoder": false,
			"URL": false,
			"WebSocket": false,
			"Worker": false,
			"XMLHttpRequest": false
		},
		"node": {
			"__dirname": false,
			"__filename": false,
			"arguments": false,
			"Buffer": false,
			"clearImmediate": false,
			"clearInterval": false,
			"clearTimeout": false,
			"console": false,
			"exports": true,
			"GLOBAL": false,
			"global": false,
			"module": false,
			"process": false,
			"require": false,
			"root": false,
			"setImmediate": false,
			"setInterval": false,
			"setTimeout": false
		},
		"commonjs": {
			"exports": true,
			"module": false,
			"require": false,
			"global": false
		},
		"amd": {
			"define": false,
			"require": false
		},
		"mocha": {
			"after": false,
			"afterEach": false,
			"before": false,
			"beforeEach": false,
			"context": false,
			"describe": false,
			"it": false,
			"mocha": false,
			"setup": false,
			"specify": false,
			"suite": false,
			"suiteSetup": false,
			"suiteTeardown": false,
			"teardown": false,
			"test": false,
			"xcontext": false,
			"xdescribe": false,
			"xit": false,
			"xspecify": false
		},
		"jasmine": {
			"afterAll": false,
			"afterEach": false,
			"beforeAll": false,
			"beforeEach": false,
			"describe": false,
			"expect": false,
			"fail": false,
			"fdescribe": false,
			"fit": false,
			"it": false,
			"jasmine": false,
			"pending": false,
			"runs": false,
			"spyOn": false,
			"waits": false,
			"waitsFor": false,
			"xdescribe": false,
			"xit": false
		},
		"jest": {
			"afterEach": false,
			"beforeEach": false,
			"describe": false,
			"expect": false,
			"it": false,
			"jest": false,
			"pit": false,
			"require": false,
			"xdescribe": false,
			"xit": false
		},
		"qunit": {
			"asyncTest": false,
			"deepEqual": false,
			"equal": false,
			"expect": false,
			"module": false,
			"notDeepEqual": false,
			"notEqual": false,
			"notOk": false,
			"notPropEqual": false,
			"notStrictEqual": false,
			"ok": false,
			"propEqual": false,
			"QUnit": false,
			"raises": false,
			"start": false,
			"stop": false,
			"strictEqual": false,
			"test": false,
			"throws": false
		},
		"phantomjs": {
			"console": true,
			"exports": true,
			"phantom": true,
			"require": true,
			"WebPage": true
		},
		"couch": {
			"emit": false,
			"exports": false,
			"getRow": false,
			"log": false,
			"module": false,
			"provides": false,
			"require": false,
			"respond": false,
			"send": false,
			"start": false,
			"sum": false
		},
		"rhino": {
			"defineClass": false,
			"deserialize": false,
			"gc": false,
			"help": false,
			"importClass": false,
			"importPackage": false,
			"java": false,
			"load": false,
			"loadClass": false,
			"Packages": false,
			"print": false,
			"quit": false,
			"readFile": false,
			"readUrl": false,
			"runCommand": false,
			"seal": false,
			"serialize": false,
			"spawn": false,
			"sync": false,
			"toint32": false,
			"version": false
		},
		"nashorn": {
			"__DIR__": false,
			"__FILE__": false,
			"__LINE__": false,
			"com": false,
			"edu": false,
			"exit": false,
			"Java": false,
			"java": false,
			"javafx": false,
			"JavaImporter": false,
			"javax": false,
			"JSAdapter": false,
			"load": false,
			"loadWithNewGlobal": false,
			"org": false,
			"Packages": false,
			"print": false,
			"quit": false
		},
		"wsh": {
			"ActiveXObject": true,
			"Enumerator": true,
			"GetObject": true,
			"ScriptEngine": true,
			"ScriptEngineBuildVersion": true,
			"ScriptEngineMajorVersion": true,
			"ScriptEngineMinorVersion": true,
			"VBArray": true,
			"WScript": true,
			"WSH": true,
			"XDomainRequest": true
		},
		"jquery": {
			"$": false,
			"jQuery": false
		},
		"yui": {
			"Y": false,
			"YUI": false,
			"YUI_config": false
		},
		"shelljs": {
			"cat": false,
			"cd": false,
			"chmod": false,
			"config": false,
			"cp": false,
			"dirs": false,
			"echo": false,
			"env": false,
			"error": false,
			"exec": false,
			"exit": false,
			"find": false,
			"grep": false,
			"ls": false,
			"ln": false,
			"mkdir": false,
			"mv": false,
			"popd": false,
			"pushd": false,
			"pwd": false,
			"rm": false,
			"sed": false,
			"target": false,
			"tempdir": false,
			"test": false,
			"which": false
		},
		"prototypejs": {
			"$": false,
			"$$": false,
			"$A": false,
			"$break": false,
			"$continue": false,
			"$F": false,
			"$H": false,
			"$R": false,
			"$w": false,
			"Abstract": false,
			"Ajax": false,
			"Autocompleter": false,
			"Builder": false,
			"Class": false,
			"Control": false,
			"Draggable": false,
			"Draggables": false,
			"Droppables": false,
			"Effect": false,
			"Element": false,
			"Enumerable": false,
			"Event": false,
			"Field": false,
			"Form": false,
			"Hash": false,
			"Insertion": false,
			"ObjectRange": false,
			"PeriodicalExecuter": false,
			"Position": false,
			"Prototype": false,
			"Scriptaculous": false,
			"Selector": false,
			"Sortable": false,
			"SortableObserver": false,
			"Sound": false,
			"Template": false,
			"Toggle": false,
			"Try": false
		},
		"meteor": {
			"$": false,
			"_": false,
			"Accounts": false,
			"App": false,
			"Assets": false,
			"Blaze": false,
			"check": false,
			"Cordova": false,
			"DDP": false,
			"DDPServer": false,
			"Deps": false,
			"EJSON": false,
			"Email": false,
			"HTTP": false,
			"Log": false,
			"Match": false,
			"Meteor": false,
			"Mongo": false,
			"MongoInternals": false,
			"Npm": false,
			"Package": false,
			"Plugin": false,
			"process": false,
			"Random": false,
			"ReactiveDict": false,
			"ReactiveVar": false,
			"Router": false,
			"Session": false,
			"share": false,
			"Spacebars": false,
			"Template": false,
			"Tinytest": false,
			"Tracker": false,
			"UI": false,
			"Utils": false,
			"WebApp": false,
			"WebAppInternals": false
		},
		"mongo": {
			"_isWindows": false,
			"_rand": false,
			"BulkWriteResult": false,
			"cat": false,
			"cd": false,
			"connect": false,
			"db": false,
			"getHostName": false,
			"getMemInfo": false,
			"hostname": false,
			"listFiles": false,
			"load": false,
			"ls": false,
			"md5sumFile": false,
			"mkdir": false,
			"Mongo": false,
			"ObjectId": false,
			"PlanCache": false,
			"print": false,
			"printjson": false,
			"pwd": false,
			"quit": false,
			"removeFile": false,
			"rs": false,
			"sh": false,
			"UUID": false,
			"version": false,
			"WriteResult": false
		},
		"applescript": {
			"$": false,
			"Application": false,
			"Automation": false,
			"console": false,
			"delay": false,
			"Library": false,
			"ObjC": false,
			"ObjectSpecifier": false,
			"Path": false,
			"Progress": false,
			"Ref": false
		},
		"serviceworker": {
			"caches": false,
			"Cache": false,
			"CacheStorage": false,
			"Client": false,
			"clients": false,
			"Clients": false,
			"ExtendableEvent": false,
			"ExtendableMessageEvent": false,
			"FetchEvent": false,
			"importScripts": false,
			"registration": false,
			"self": false,
			"ServiceWorker": false,
			"ServiceWorkerContainer": false,
			"ServiceWorkerGlobalScope": false,
			"ServiceWorkerMessageEvent": false,
			"ServiceWorkerRegistration": false,
			"skipWaiting": false,
			"WindowClient": false
		},
		"atomtest": {
			"advanceClock": false,
			"fakeClearInterval": false,
			"fakeClearTimeout": false,
			"fakeSetInterval": false,
			"fakeSetTimeout": false,
			"resetTimeouts": false,
			"waitsForPromise": false
		},
		"embertest": {
			"andThen": false,
			"click": false,
			"currentPath": false,
			"currentRouteName": false,
			"currentURL": false,
			"fillIn": false,
			"find": false,
			"findWithAssert": false,
			"keyEvent": false,
			"pauseTest": false,
			"triggerEvent": false,
			"visit": false
		},
		"protractor": {
			"$": false,
			"$$": false,
			"browser": false,
			"By": false,
			"by": false,
			"DartObject": false,
			"element": false,
			"protractor": false
		},
		"shared-node-browser": {
			"clearInterval": false,
			"clearTimeout": false,
			"console": false,
			"setInterval": false,
			"setTimeout": false
		},
		"webextensions": {
			"browser": false,
			"chrome": false,
			"opr": false
		},
		"greasemonkey": {
			"GM_addStyle": false,
			"GM_deleteValue": false,
			"GM_getResourceText": false,
			"GM_getResourceURL": false,
			"GM_getValue": false,
			"GM_info": false,
			"GM_listValues": false,
			"GM_log": false,
			"GM_openInTab": false,
			"GM_registerMenuCommand": false,
			"GM_setClipboard": false,
			"GM_setValue": false,
			"GM_xmlhttpRequest": false,
			"unsafeWindow": false
		}
	};

/***/ },

/***/ "./node_modules/babel-traverse/lib/cache.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function clear(){exports.path=path=new _weakMap2["default"],exports.scope=scope=new _weakMap2["default"]}exports.__esModule=!0,exports.scope=exports.path=void 0;var _weakMap=__webpack_require__("./node_modules/babel-runtime/core-js/weak-map.js"),_weakMap2=_interopRequireDefault(_weakMap);exports.clear=clear;var path=exports.path=new _weakMap2["default"],scope=exports.scope=new _weakMap2["default"];

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/ancestry.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function findParent(e){for(var t=this;t=t.parentPath;)if(e(t))return t;return null}function find(e){var t=this;do if(e(t))return t;while(t=t.parentPath);return null}function getFunctionParent(){return this.findParent(function(e){return e.isFunction()||e.isProgram()})}function getStatementParent(){var e=this;do if(Array.isArray(e.container))return e;while(e=e.parentPath)}function getEarliestCommonAncestorFrom(e){return this.getDeepestCommonAncestorFrom(e,function(e,r,n){for(var i=void 0,o=t.VISITOR_KEYS[e.type],a=n,u=Array.isArray(a),s=0,a=u?a:(0,_getIterator3["default"])(a);;){var f;if(u){if(s>=a.length)break;f=a[s++]}else{if(s=a.next(),s.done)break;f=s.value}var l=f,d=l[r+1];if(i)if(d.listKey&&i.listKey===d.listKey&&d.key<i.key)i=d;else{var c=o.indexOf(i.parentKey),p=o.indexOf(d.parentKey);c>p&&(i=d)}else i=d}return i})}function getDeepestCommonAncestorFrom(e,t){var r=this;if(!e.length)return this;if(1===e.length)return e[0];var n=1/0,i=void 0,o=void 0,a=e.map(function(e){var t=[];do t.unshift(e);while((e=e.parentPath)&&e!==r);return t.length<n&&(n=t.length),t}),u=a[0];e:for(var s=0;s<n;s++){for(var f=u[s],l=a,d=Array.isArray(l),c=0,l=d?l:(0,_getIterator3["default"])(l);;){var p;if(d){if(c>=l.length)break;p=l[c++]}else{if(c=l.next(),c.done)break;p=c.value}var h=p;if(h[s]!==f)break e}i=s,o=f}if(o)return t?t(o,i,a):o;throw new Error("Couldn't find intersection")}function getAncestry(){var e=this,t=[];do t.push(e);while(e=e.parentPath);return t}function inType(){for(var e=this;e;){for(var t=arguments,r=Array.isArray(t),n=0,t=r?t:(0,_getIterator3["default"])(t);;){var i;if(r){if(n>=t.length)break;i=t[n++]}else{if(n=t.next(),n.done)break;i=n.value}var o=i;if(e.node.type===o)return!0}e=e.parentPath}return!1}function inShadow(e){var t=this.isFunction()?this:this.findParent(function(e){return e.isFunction()});if(t){if(t.isFunctionExpression()||t.isFunctionDeclaration()){var r=t.node.shadow;if(r&&(!e||r[e]!==!1))return t}else if(t.isArrowFunctionExpression())return t;return null}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.findParent=findParent,exports.find=find,exports.getFunctionParent=getFunctionParent,exports.getStatementParent=getStatementParent,exports.getEarliestCommonAncestorFrom=getEarliestCommonAncestorFrom,exports.getDeepestCommonAncestorFrom=getDeepestCommonAncestorFrom,exports.getAncestry=getAncestry,exports.inType=inType,exports.inShadow=inShadow;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_index=__webpack_require__("./node_modules/babel-traverse/lib/path/index.js"),_index2=_interopRequireDefault(_index);

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/inference/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e["default"]=t,e}function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function getTypeAnnotation(){if(this.typeAnnotation)return this.typeAnnotation;var e=this._getTypeAnnotation()||t.anyTypeAnnotation();return t.isTypeAnnotation(e)&&(e=e.typeAnnotation),this.typeAnnotation=e}function _getTypeAnnotation(){var e=this.node;{if(e){if(e.typeAnnotation)return e.typeAnnotation;var n=inferers[e.type];return n?n.call(this,e):(n=inferers[this.parentPath.type],n&&n.validParent?this.parentPath.getTypeAnnotation():void 0)}if("init"===this.key&&this.parentPath.isVariableDeclarator()){var i=this.parentPath.parentPath,r=i.parentPath;return"left"===i.key&&r.isForInStatement()?t.stringTypeAnnotation():"left"===i.key&&r.isForOfStatement()?t.anyTypeAnnotation():t.voidTypeAnnotation()}}}function isBaseType(t,e){return _isBaseType(t,this.getTypeAnnotation(),e)}function _isBaseType(e,n,i){if("string"===e)return t.isStringTypeAnnotation(n);if("number"===e)return t.isNumberTypeAnnotation(n);if("boolean"===e)return t.isBooleanTypeAnnotation(n);if("any"===e)return t.isAnyTypeAnnotation(n);if("mixed"===e)return t.isMixedTypeAnnotation(n);if("void"===e)return t.isVoidTypeAnnotation(n);if(i)return!1;throw new Error("Unknown base type "+e)}function couldBeBaseType(e){var n=this.getTypeAnnotation();if(t.isAnyTypeAnnotation(n))return!0;if(t.isUnionTypeAnnotation(n)){for(var i=n.types,r=Array.isArray(i),o=0,i=r?i:(0,_getIterator3["default"])(i);;){var a;if(r){if(o>=i.length)break;a=i[o++]}else{if(o=i.next(),o.done)break;a=o.value}var s=a;if(t.isAnyTypeAnnotation(s)||_isBaseType(e,s,!0))return!0}return!1}return _isBaseType(e,n,!0)}function baseTypeStrictlyMatches(e){var n=this.getTypeAnnotation();if(e=e.getTypeAnnotation(),!t.isAnyTypeAnnotation(n)&&t.isFlowBaseAnnotation(n))return e.type===n.type}function isGenericType(e){var n=this.getTypeAnnotation();return t.isGenericTypeAnnotation(n)&&t.isIdentifier(n.id,{name:e})}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.getTypeAnnotation=getTypeAnnotation,exports._getTypeAnnotation=_getTypeAnnotation,exports.isBaseType=isBaseType,exports.couldBeBaseType=couldBeBaseType,exports.baseTypeStrictlyMatches=baseTypeStrictlyMatches,exports.isGenericType=isGenericType;var _inferers=__webpack_require__("./node_modules/babel-traverse/lib/path/inference/inferers.js"),inferers=_interopRequireWildcard(_inferers),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);

/***/ },

/***/ "./node_modules/babel6/index.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/babel-core/index.js");

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/inference/inferer-reference.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e["default"]=t,e}function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function getTypeAnnotationBindingConstantViolations(e,n){var i=e.scope.getBinding(n),o=[];e.typeAnnotation=t.unionTypeAnnotation(o);var r=[],a=getConstantViolationsBefore(i,e,r),s=getConditionalAnnotation(e,n);if(s&&!function(){var t=getConstantViolationsBefore(i,s.ifStatement);a=a.filter(function(e){return t.indexOf(e)<0}),o.push(s.typeAnnotation)}(),a.length){a=a.concat(r);for(var f=a,u=Array.isArray(f),l=0,f=u?f:(0,_getIterator3["default"])(f);;){var p;if(u){if(l>=f.length)break;p=f[l++]}else{if(l=f.next(),l.done)break;p=l.value}var d=p;o.push(d.getTypeAnnotation())}}if(o.length)return t.createUnionTypeAnnotation(o)}function getConstantViolationsBefore(t,e,n){var i=t.constantViolations.slice();return i.unshift(t.path),i.filter(function(t){t=t.resolve();var i=t._guessExecutionStatusRelativeTo(e);return n&&"function"===i&&n.push(t),"before"===i})}function inferAnnotationFromBinaryExpression(e,n){var i=n.node.operator,o=n.get("right").resolve(),r=n.get("left").resolve(),a=void 0;if(r.isIdentifier({name:e})?a=o:o.isIdentifier({name:e})&&(a=r),a)return"==="===i?a.getTypeAnnotation():t.BOOLEAN_NUMBER_BINARY_OPERATORS.indexOf(i)>=0?t.numberTypeAnnotation():void 0;if("==="===i){var s=void 0,f=void 0;if(r.isUnaryExpression({operator:"typeof"})?(s=r,f=o):o.isUnaryExpression({operator:"typeof"})&&(s=o,f=r),(f||s)&&(f=f.resolve(),f.isLiteral())){var u=f.node.value;if("string"==typeof u&&s.get("argument").isIdentifier({name:e}))return t.createTypeAnnotationBasedOnTypeof(f.node.value)}}}function getParentConditionalPath(t){for(var e=void 0;e=t.parentPath;){if(e.isIfStatement()||e.isConditionalExpression())return"test"===t.key?void 0:e;t=e}}function getConditionalAnnotation(e,n){var i=getParentConditionalPath(e);if(i){var o=i.get("test"),r=[o],a=[];do{var s=r.shift().resolve();if(s.isLogicalExpression()&&(r.push(s.get("left")),r.push(s.get("right"))),s.isBinaryExpression()){var f=inferAnnotationFromBinaryExpression(n,s);f&&a.push(f)}}while(r.length);return a.length?{typeAnnotation:t.createUnionTypeAnnotation(a),ifStatement:i}:getConditionalAnnotation(i,n)}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){if(this.isReferenced()){var n=this.scope.getBinding(e.name);return n?n.identifier.typeAnnotation?n.identifier.typeAnnotation:getTypeAnnotationBindingConstantViolations(this,e.name):"undefined"===e.name?t.voidTypeAnnotation():"NaN"===e.name||"Infinity"===e.name?t.numberTypeAnnotation():void("arguments"===e.name)}};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/replacement.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function replaceWithMultiple(e){this.resync(),e=this._verifyNodeList(e),t.inheritLeadingComments(e[0],this.node),t.inheritTrailingComments(e[e.length-1],this.node),this.node=this.container[this.key]=null,this.insertAfter(e),this.node?this.requeue():this.remove()}function replaceWithSourceString(e){this.resync();try{e="("+e+")",e=(0,_babylon.parse)(e)}catch(t){var r=t.loc;throw r&&(t.message+=" - make sure this is an expression.",t.message+="\n"+(0,_babelCodeFrame2["default"])(e,r.line,r.column+1)),t}return e=e.program.body[0].expression,_index2["default"].removeProperties(e),this.replaceWith(e)}function replaceWith(e){if(this.resync(),this.removed)throw new Error("You can't replace this node, we've already removed it");if(e instanceof _index4["default"]&&(e=e.node),!e)throw new Error("You passed `path.replaceWith()` a falsy node, use `path.remove()` instead");if(this.node!==e){if(this.isProgram()&&!t.isProgram(e))throw new Error("You can only replace a Program root node with another Program node");if(Array.isArray(e))throw new Error("Don't use `path.replaceWith()` with an array of nodes, use `path.replaceWithMultiple()`");if("string"==typeof e)throw new Error("Don't use `path.replaceWith()` with a source string, use `path.replaceWithSourceString()`");if(this.isNodeType("Statement")&&t.isExpression(e)&&(this.canHaveVariableDeclarationOrExpression()||this.canSwapBetweenExpressionAndStatement(e)||(e=t.expressionStatement(e))),this.isNodeType("Expression")&&t.isStatement(e)&&!this.canHaveVariableDeclarationOrExpression()&&!this.canSwapBetweenExpressionAndStatement(e))return this.replaceExpressionWithStatements([e]);var r=this.node;r&&(t.inheritsComments(e,r),t.removeComments(r)),this._replaceWith(e),this.type=e.type,this.setScope(),this.requeue()}}function _replaceWith(e){if(!this.container)throw new ReferenceError("Container is falsy");this.inList?t.validate(this.parent,this.key,[e]):t.validate(this.parent,this.key,e),this.debug(function(){return"Replace with "+(e&&e.type)}),this.node=this.container[this.key]=e}function replaceExpressionWithStatements(e){this.resync();var r=t.toSequenceExpression(e,this.scope);if(t.isSequenceExpression(r)){var i=r.expressions;i.length>=2&&this.parentPath.isExpressionStatement()&&this._maybePopFromStatements(i),1===i.length?this.replaceWith(i[0]):this.replaceWith(r)}else{if(!r){var n=t.functionExpression(null,[],t.blockStatement(e));n.shadow=!0,this.replaceWith(t.callExpression(n,[])),this.traverse(hoistVariablesVisitor);for(var a=this.get("callee").getCompletionRecords(),s=a,o=Array.isArray(s),l=0,s=o?s:(0,_getIterator3["default"])(s);;){var h;if(o){if(l>=s.length)break;h=s[l++]}else{if(l=s.next(),l.done)break;h=l.value}var p=h;if(p.isExpressionStatement()){var c=p.findParent(function(e){return e.isLoop()});if(c){var u=this.get("callee"),d=u.scope.generateDeclaredUidIdentifier("ret");u.get("body").pushContainer("body",t.returnStatement(d)),p.get("expression").replaceWith(t.assignmentExpression("=",d,p.node.expression))}else p.replaceWith(t.returnStatement(p.node.expression))}}return this.node}this.replaceWith(r)}}function replaceInline(e){return this.resync(),Array.isArray(e)?Array.isArray(this.container)?(e=this._verifyNodeList(e),this._containerInsertAfter(e),this.remove()):this.replaceWithMultiple(e):this.replaceWith(e)}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.replaceWithMultiple=replaceWithMultiple,exports.replaceWithSourceString=replaceWithSourceString,exports.replaceWith=replaceWith,exports._replaceWith=_replaceWith,exports.replaceExpressionWithStatements=replaceExpressionWithStatements,exports.replaceInline=replaceInline;var _babelCodeFrame=__webpack_require__("./node_modules/babel-code-frame/lib/index.js"),_babelCodeFrame2=_interopRequireDefault(_babelCodeFrame),_index=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_index2=_interopRequireDefault(_index),_index3=__webpack_require__("./node_modules/babel-traverse/lib/path/index.js"),_index4=_interopRequireDefault(_index3),_babylon=__webpack_require__("./node_modules/babylon/lib/index.js"),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),hoistVariablesVisitor={Function:function(e){e.skip()},VariableDeclaration:function(e){if("var"===e.node.kind){var r=e.getBindingIdentifiers();for(var i in r)e.scope.push({id:r[i]});for(var n=[],a=e.node.declarations,s=Array.isArray(a),o=0,a=s?a:(0,_getIterator3["default"])(a);;){var l;if(s){if(o>=a.length)break;l=a[o++]}else{if(o=a.next(),o.done)break;l=o.value}var h=l;h.init&&n.push(t.expressionStatement(t.assignmentExpression("=",h.id,h.init)))}e.replaceWithMultiple(n)}}};

/***/ },

/***/ "./node_modules/babel-code-frame/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getTokenType(e){var t=e.slice(-2),r=t[0],a=t[1],l=_jsTokens2["default"].matchToToken(e);if("name"===l.type){if(_esutils2["default"].keyword.isReservedWordES6(l.value))return"keyword";if(JSX_TAG.test(l.value)&&("<"===a[r-1]||"</"==a.substr(r-2,2)))return"jsx_tag";if(l.value[0]!==l.value[0].toLowerCase())return"capitalized"}return"punctuator"===l.type&&BRACKET.test(l.value)?"bracket":l.type}function highlight(e){return e.replace(_jsTokens2["default"],function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];var a=getTokenType(t),l=defs[a];return l?t[0].split(NEWLINE).map(function(e){return l(e)}).join("\n"):t[0]})}exports.__esModule=!0,exports["default"]=function(e,t,r){var a=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];r=Math.max(r,0);var l=a.highlightCode&&_chalk2["default"].supportsColor,u=function(e,t){return l?e(t):t};l&&(e=highlight(e));var n=a.linesAbove||2,i=a.linesBelow||3,s=e.split(NEWLINE),o=Math.max(t-(n+1),0),f=Math.min(s.length,t+i);t||r||(o=0,f=s.length);var d=String(f).length,c=s.slice(o,f).map(function(e,a){var l=o+1+a,n=(" "+l).slice(-d),i=" "+n+" | ";if(l===t){var s="";if(r){var f=e.slice(0,r-1).replace(/[^\t]/g," ");s=["\n ",u(defs.gutter,i.replace(/\d/g," ")),f,u(defs.marker,"^")].join("")}return[u(defs.marker,">"),u(defs.gutter,i),e,s].join("")}return" "+u(defs.gutter,i)+e}).join("\n");return l?_chalk2["default"].reset(c):c};var _jsTokens=__webpack_require__("./node_modules/js-tokens/index.js"),_jsTokens2=_interopRequireDefault(_jsTokens),_esutils=__webpack_require__("./node_modules/esutils/lib/utils.js"),_esutils2=_interopRequireDefault(_esutils),_chalk=__webpack_require__("./node_modules/chalk/index.js"),_chalk2=_interopRequireDefault(_chalk),defs={keyword:_chalk2["default"].cyan,capitalized:_chalk2["default"].yellow,jsx_tag:_chalk2["default"].yellow,punctuator:_chalk2["default"].yellow,number:_chalk2["default"].magenta,string:_chalk2["default"].green,regex:_chalk2["default"].magenta,comment:_chalk2["default"].grey,invalid:_chalk2["default"].white.bgRed.bold,gutter:_chalk2["default"].grey,marker:_chalk2["default"].red.bold},NEWLINE=/\r\n|[\n\r\u2028\u2029]/,JSX_TAG=/^[a-z][\w-]*$/i,BRACKET=/^[()\[\]{}]$/;module.exports=exports["default"];

/***/ },

/***/ "./node_modules/js-tokens/index.js":
/***/ function(module, exports) {

	module.exports=/((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]{1,6}\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g,module.exports.matchToToken=function(e){var t={type:"invalid",value:e[0]};return e[1]?(t.type="string",t.closed=!(!e[3]&&!e[4])):e[5]?t.type="comment":e[6]?(t.type="comment",t.closed=!!e[7]):e[8]?t.type="regex":e[9]?t.type="number":e[10]?t.type="name":e[11]?t.type="punctuator":e[12]&&(t.type="whitespace"),t};

/***/ },

/***/ "./node_modules/chalk/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";function Chalk(e){this.enabled=e&&void 0!==e.enabled?e.enabled:supportsColor}function build(e){var s=function(){return applyStyle.apply(s,arguments)};return s._styles=e,s.enabled=this.enabled,s.__proto__=proto,s}function applyStyle(){var e=arguments,s=e.length,t=0!==s&&String(arguments[0]);if(s>1)for(var r=1;r<s;r++)t+=" "+e[r];if(!this.enabled||!t)return t;var n=this._styles,i=n.length,o=ansiStyles.dim.open;for(!isSimpleWindowsTerm||n.indexOf("gray")===-1&&n.indexOf("grey")===-1||(ansiStyles.dim.open="");i--;){var l=ansiStyles[n[i]];t=l.open+t.replace(l.closeRe,l.open)+l.close}return ansiStyles.dim.open=o,t}function init(){var e={};return Object.keys(styles).forEach(function(s){e[s]={get:function(){return build.call(this,[s])}}}),e}var escapeStringRegexp=__webpack_require__("./node_modules/escape-string-regexp/index.js"),ansiStyles=__webpack_require__("./node_modules/ansi-styles/index.js"),stripAnsi=__webpack_require__("./node_modules/strip-ansi/index.js"),hasAnsi=__webpack_require__("./node_modules/has-ansi/index.js"),supportsColor=__webpack_require__("./node_modules/supports-color/index.js"),defineProps=Object.defineProperties,isSimpleWindowsTerm="win32"===process.platform&&!/^xterm/i.test(process.env.TERM);isSimpleWindowsTerm&&(ansiStyles.blue.open="[94m");var styles=function(){var e={};return Object.keys(ansiStyles).forEach(function(s){ansiStyles[s].closeRe=new RegExp(escapeStringRegexp(ansiStyles[s].close),"g"),e[s]={get:function(){return build.call(this,this._styles.concat(s))}}}),e}(),proto=defineProps(function(){},styles);defineProps(Chalk.prototype,init()),module.exports=new Chalk,module.exports.styles=ansiStyles,module.exports.hasColor=hasAnsi,module.exports.stripColor=stripAnsi,module.exports.supportsColor=supportsColor;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/escape-string-regexp/index.js":
/***/ function(module, exports) {

	"use strict";var matchOperatorsRe=/[|\\{}()[\]^$+*?.]/g;module.exports=function(r){if("string"!=typeof r)throw new TypeError("Expected a string");return r.replace(matchOperatorsRe,"\\$&")};

/***/ },

/***/ "./node_modules/ansi-styles/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {"use strict";function assembleStyles(){var e={modifiers:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},colors:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],gray:[90,39]},bgColors:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49]}};return e.colors.grey=e.colors.gray,Object.keys(e).forEach(function(r){var l=e[r];Object.keys(l).forEach(function(r){var o=l[r];e[r]=l[r]={open:"["+o[0]+"m",close:"["+o[1]+"m"}}),Object.defineProperty(e,r,{value:l,enumerable:!1})}),e}Object.defineProperty(module,"exports",{enumerable:!0,get:assembleStyles});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ },

/***/ "./node_modules/strip-ansi/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var ansiRegex=__webpack_require__("./node_modules/ansi-regex/index.js")();module.exports=function(e){return"string"==typeof e?e.replace(ansiRegex,""):e};

/***/ },

/***/ "./node_modules/ansi-regex/index.js":
/***/ function(module, exports) {

	"use strict";module.exports=function(){return/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g};

/***/ },

/***/ "./node_modules/has-ansi/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var ansiRegex=__webpack_require__("./node_modules/ansi-regex/index.js"),re=new RegExp(ansiRegex().source);module.exports=re.test.bind(re);

/***/ },

/***/ "./node_modules/supports-color/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";var argv=process.argv,terminator=argv.indexOf("--"),hasFlag=function(r){r="--"+r;var s=argv.indexOf(r);return s!==-1&&(terminator===-1||s<terminator)};module.exports=function(){return"FORCE_COLOR"in process.env||!(hasFlag("no-color")||hasFlag("no-colors")||hasFlag("color=false"))&&(!!(hasFlag("color")||hasFlag("colors")||hasFlag("color=true")||hasFlag("color=always"))||!(process.stdout&&!process.stdout.isTTY)&&("win32"===process.platform||("COLORTERM"in process.env||"dumb"!==process.env.TERM&&!!/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM))))}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/babylon/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function parse(e,r){return new _parser2["default"](r,e).parse()}exports.__esModule=!0,exports.tokTypes=void 0,exports.parse=parse;var _parser=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_parser2=_interopRequireDefault(_parser);__webpack_require__("./node_modules/babylon/lib/parser/util.js"),__webpack_require__("./node_modules/babylon/lib/parser/statement.js"),__webpack_require__("./node_modules/babylon/lib/parser/lval.js"),__webpack_require__("./node_modules/babylon/lib/parser/expression.js"),__webpack_require__("./node_modules/babylon/lib/parser/node.js"),__webpack_require__("./node_modules/babylon/lib/parser/location.js"),__webpack_require__("./node_modules/babylon/lib/parser/comments.js");var _types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js");__webpack_require__("./node_modules/babylon/lib/tokenizer/index.js"),__webpack_require__("./node_modules/babylon/lib/tokenizer/context.js");var _flow=__webpack_require__("./node_modules/babylon/lib/plugins/flow.js"),_flow2=_interopRequireDefault(_flow),_jsx=__webpack_require__("./node_modules/babylon/lib/plugins/jsx/index.js"),_jsx2=_interopRequireDefault(_jsx);_parser.plugins.flow=_flow2["default"],_parser.plugins.jsx=_jsx2["default"],exports.tokTypes=_types.types;

/***/ },

/***/ "./node_modules/babylon/lib/parser/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}exports.__esModule=!0,exports.plugins=void 0;var _identifier=__webpack_require__("./node_modules/babylon/lib/util/identifier.js"),_options=__webpack_require__("./node_modules/babylon/lib/options.js"),_tokenizer=__webpack_require__("./node_modules/babylon/lib/tokenizer/index.js"),_tokenizer2=_interopRequireDefault(_tokenizer),plugins=exports.plugins={},Parser=function(e){function t(r,n){_classCallCheck(this,t),r=(0,_options.getOptions)(r);var o=_possibleConstructorReturn(this,e.call(this,r,n));return o.options=r,o.inModule="module"===o.options.sourceType,o.isReservedWord=_identifier.reservedWords[6],o.input=n,o.plugins=o.loadPlugins(o.options.plugins),o.filename=r.sourceFilename,0===o.state.pos&&"#"===o.input[0]&&"!"===o.input[1]&&o.skipLineComment(2),o}return _inherits(t,e),t.prototype.hasPlugin=function(e){return!(!this.plugins["*"]&&!this.plugins[e])},t.prototype.extend=function(e,t){this[e]=t(this[e])},t.prototype.loadPlugins=function(e){var t={};e.indexOf("flow")>=0&&(e=e.filter(function(e){return"flow"!==e}),e.push("flow"));for(var r=e,n=Array.isArray(r),o=0,r=n?r:r[Symbol.iterator]();;){var i;if(n){if(o>=r.length)break;i=r[o++]}else{if(o=r.next(),o.done)break;i=o.value}var s=i;if(!t[s]){t[s]=!0;var u=exports.plugins[s];u&&u(this)}}return t},t.prototype.parse=function(){var e=this.startNode(),t=this.startNode();return this.nextToken(),this.parseTopLevel(e,t)},t}(_tokenizer2["default"]);exports["default"]=Parser;

/***/ },

/***/ "./node_modules/babylon/lib/util/identifier.js":
/***/ function(module, exports) {

	"use strict";function makePredicate(e){return e=e.split(" "),function(t){return e.indexOf(t)>=0}}function isInAstralSet(e,t){for(var r=65536,i=0;i<t.length;i+=2){if(r+=t[i],r>e)return!1;if(r+=t[i+1],r>=e)return!0}}function isIdentifierStart(e){return e<65?36===e:e<91||(e<97?95===e:e<123||(e<=65535?e>=170&&nonASCIIidentifierStart.test(String.fromCharCode(e)):isInAstralSet(e,astralIdentifierStartCodes)))}function isIdentifierChar(e){return e<48?36===e:e<58||!(e<65)&&(e<91||(e<97?95===e:e<123||(e<=65535?e>=170&&nonASCIIidentifier.test(String.fromCharCode(e)):isInAstralSet(e,astralIdentifierStartCodes)||isInAstralSet(e,astralIdentifierCodes))))}exports.__esModule=!0,exports.isIdentifierStart=isIdentifierStart,exports.isIdentifierChar=isIdentifierChar;var reservedWords=exports.reservedWords={6:makePredicate("enum await"),strict:makePredicate("implements interface let package private protected public static yield"),strictBind:makePredicate("eval arguments")},isKeyword=exports.isKeyword=makePredicate("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this let const class extends export import yield super"),nonASCIIidentifierStartChars="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",nonASCIIidentifierChars="‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣔ-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿",nonASCIIidentifierStart=new RegExp("["+nonASCIIidentifierStartChars+"]"),nonASCIIidentifier=new RegExp("["+nonASCIIidentifierStartChars+nonASCIIidentifierChars+"]");nonASCIIidentifierStartChars=nonASCIIidentifierChars=null;var astralIdentifierStartCodes=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,785,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,54,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,25,391,63,32,0,449,56,264,8,2,36,18,0,50,29,881,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,65,0,32,6124,20,754,9486,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,60,67,1213,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,10591,541],astralIdentifierCodes=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,10,2,4,9,83,11,7,0,161,11,6,9,7,3,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,87,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,423,9,838,7,2,7,17,9,57,21,2,13,19882,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,2214,6,110,6,6,9,792487,239];

/***/ },

/***/ "./node_modules/babylon/lib/options.js":
/***/ function(module, exports) {

	"use strict";function getOptions(t){var e={};for(var o in defaultOptions)e[o]=t&&o in t?t[o]:defaultOptions[o];return e}exports.__esModule=!0,exports.getOptions=getOptions;var defaultOptions=exports.defaultOptions={sourceType:"script",sourceFilename:void 0,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowSuperOutsideMethod:!1,plugins:[],strictMode:null};

/***/ },

/***/ "./node_modules/babylon/lib/tokenizer/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function _classCallCheck(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}function codePointToString(t){return t<=65535?String.fromCharCode(t):String.fromCharCode((t-65536>>10)+55296,(t-65536&1023)+56320)}exports.__esModule=!0,exports.Token=void 0;var _identifier=__webpack_require__("./node_modules/babylon/lib/util/identifier.js"),_types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),_context=__webpack_require__("./node_modules/babylon/lib/tokenizer/context.js"),_location=__webpack_require__("./node_modules/babylon/lib/util/location.js"),_whitespace=__webpack_require__("./node_modules/babylon/lib/util/whitespace.js"),_state=__webpack_require__("./node_modules/babylon/lib/tokenizer/state.js"),_state2=_interopRequireDefault(_state),Token=exports.Token=function t(s){_classCallCheck(this,t),this.type=s.type,this.value=s.value,this.start=s.start,this.end=s.end,this.loc=new _location.SourceLocation(s.startLoc,s.endLoc)},Tokenizer=function(){function t(s,e){_classCallCheck(this,t),this.state=new _state2["default"],this.state.init(s,e)}return t.prototype.next=function(){this.isLookahead||this.state.tokens.push(new Token(this.state)),this.state.lastTokEnd=this.state.end,this.state.lastTokStart=this.state.start,this.state.lastTokEndLoc=this.state.endLoc,this.state.lastTokStartLoc=this.state.startLoc,this.nextToken()},t.prototype.eat=function(t){return!!this.match(t)&&(this.next(),!0)},t.prototype.match=function(t){return this.state.type===t},t.prototype.isKeyword=function(t){return(0,_identifier.isKeyword)(t)},t.prototype.lookahead=function(){var t=this.state;this.state=t.clone(!0),this.isLookahead=!0,this.next(),this.isLookahead=!1;var s=this.state.clone(!0);return this.state=t,s},t.prototype.setStrict=function(t){if(this.state.strict=t,this.match(_types.types.num)||this.match(_types.types.string)){for(this.state.pos=this.state.start;this.state.pos<this.state.lineStart;)this.state.lineStart=this.input.lastIndexOf("\n",this.state.lineStart-2)+1,--this.state.curLine;this.nextToken()}},t.prototype.curContext=function(){return this.state.context[this.state.context.length-1]},t.prototype.nextToken=function(){var t=this.curContext();return t&&t.preserveSpace||this.skipSpace(),this.state.containsOctal=!1,this.state.octalPosition=null,this.state.start=this.state.pos,this.state.startLoc=this.state.curPosition(),this.state.pos>=this.input.length?this.finishToken(_types.types.eof):t.override?t.override(this):this.readToken(this.fullCharCodeAtPos())},t.prototype.readToken=function(t){return(0,_identifier.isIdentifierStart)(t)||92===t?this.readWord():this.getTokenFromCode(t)},t.prototype.fullCharCodeAtPos=function(){var t=this.input.charCodeAt(this.state.pos);if(t<=55295||t>=57344)return t;var s=this.input.charCodeAt(this.state.pos+1);return(t<<10)+s-56613888},t.prototype.pushComment=function(t,s,e,i,a,r){var n={type:t?"CommentBlock":"CommentLine",value:s,start:e,end:i,loc:new _location.SourceLocation(a,r)};this.isLookahead||(this.state.tokens.push(n),this.state.comments.push(n),this.addComment(n))},t.prototype.skipBlockComment=function(){var t=this.state.curPosition(),s=this.state.pos,e=this.input.indexOf("*/",this.state.pos+=2);e===-1&&this.raise(this.state.pos-2,"Unterminated comment"),this.state.pos=e+2,_whitespace.lineBreakG.lastIndex=s;for(var i=void 0;(i=_whitespace.lineBreakG.exec(this.input))&&i.index<this.state.pos;)++this.state.curLine,this.state.lineStart=i.index+i[0].length;this.pushComment(!0,this.input.slice(s+2,e),s,this.state.pos,t,this.state.curPosition())},t.prototype.skipLineComment=function(t){for(var s=this.state.pos,e=this.state.curPosition(),i=this.input.charCodeAt(this.state.pos+=t);this.state.pos<this.input.length&&10!==i&&13!==i&&8232!==i&&8233!==i;)++this.state.pos,i=this.input.charCodeAt(this.state.pos);this.pushComment(!1,this.input.slice(s+t,this.state.pos),s,this.state.pos,e,this.state.curPosition())},t.prototype.skipSpace=function(){t:for(;this.state.pos<this.input.length;){var t=this.input.charCodeAt(this.state.pos);switch(t){case 32:case 160:++this.state.pos;break;case 13:10===this.input.charCodeAt(this.state.pos+1)&&++this.state.pos;case 10:case 8232:case 8233:++this.state.pos,++this.state.curLine,this.state.lineStart=this.state.pos;break;case 47:switch(this.input.charCodeAt(this.state.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break t}break;default:if(!(t>8&&t<14||t>=5760&&_whitespace.nonASCIIwhitespace.test(String.fromCharCode(t))))break t;++this.state.pos}}},t.prototype.finishToken=function(t,s){this.state.end=this.state.pos,this.state.endLoc=this.state.curPosition();var e=this.state.type;this.state.type=t,this.state.value=s,this.updateContext(e)},t.prototype.readToken_dot=function(){var t=this.input.charCodeAt(this.state.pos+1);if(t>=48&&t<=57)return this.readNumber(!0);var s=this.input.charCodeAt(this.state.pos+2);return 46===t&&46===s?(this.state.pos+=3,this.finishToken(_types.types.ellipsis)):(++this.state.pos,this.finishToken(_types.types.dot))},t.prototype.readToken_slash=function(){if(this.state.exprAllowed)return++this.state.pos,this.readRegexp();var t=this.input.charCodeAt(this.state.pos+1);return 61===t?this.finishOp(_types.types.assign,2):this.finishOp(_types.types.slash,1)},t.prototype.readToken_mult_modulo=function(t){var s=42===t?_types.types.star:_types.types.modulo,e=1,i=this.input.charCodeAt(this.state.pos+1);return 42===i&&(e++,i=this.input.charCodeAt(this.state.pos+2),s=_types.types.exponent),61===i&&(e++,s=_types.types.assign),this.finishOp(s,e)},t.prototype.readToken_pipe_amp=function(t){var s=this.input.charCodeAt(this.state.pos+1);return s===t?this.finishOp(124===t?_types.types.logicalOR:_types.types.logicalAND,2):61===s?this.finishOp(_types.types.assign,2):124===t&&125===s&&this.hasPlugin("flow")?this.finishOp(_types.types.braceBarR,2):this.finishOp(124===t?_types.types.bitwiseOR:_types.types.bitwiseAND,1)},t.prototype.readToken_caret=function(){var t=this.input.charCodeAt(this.state.pos+1);return 61===t?this.finishOp(_types.types.assign,2):this.finishOp(_types.types.bitwiseXOR,1)},t.prototype.readToken_plus_min=function(t){var s=this.input.charCodeAt(this.state.pos+1);return s===t?45===s&&62===this.input.charCodeAt(this.state.pos+2)&&_whitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd,this.state.pos))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(_types.types.incDec,2):61===s?this.finishOp(_types.types.assign,2):this.finishOp(_types.types.plusMin,1)},t.prototype.readToken_lt_gt=function(t){var s=this.input.charCodeAt(this.state.pos+1),e=1;return s===t?(e=62===t&&62===this.input.charCodeAt(this.state.pos+2)?3:2,61===this.input.charCodeAt(this.state.pos+e)?this.finishOp(_types.types.assign,e+1):this.finishOp(_types.types.bitShift,e)):33===s&&60===t&&45===this.input.charCodeAt(this.state.pos+2)&&45===this.input.charCodeAt(this.state.pos+3)?(this.inModule&&this.unexpected(),this.skipLineComment(4),this.skipSpace(),this.nextToken()):(61===s&&(e=2),this.finishOp(_types.types.relational,e))},t.prototype.readToken_eq_excl=function(t){var s=this.input.charCodeAt(this.state.pos+1);return 61===s?this.finishOp(_types.types.equality,61===this.input.charCodeAt(this.state.pos+2)?3:2):61===t&&62===s?(this.state.pos+=2,this.finishToken(_types.types.arrow)):this.finishOp(61===t?_types.types.eq:_types.types.prefix,1)},t.prototype.getTokenFromCode=function(t){switch(t){case 46:return this.readToken_dot();case 40:return++this.state.pos,this.finishToken(_types.types.parenL);case 41:return++this.state.pos,this.finishToken(_types.types.parenR);case 59:return++this.state.pos,this.finishToken(_types.types.semi);case 44:return++this.state.pos,this.finishToken(_types.types.comma);case 91:return++this.state.pos,this.finishToken(_types.types.bracketL);case 93:return++this.state.pos,this.finishToken(_types.types.bracketR);case 123:return this.hasPlugin("flow")&&124===this.input.charCodeAt(this.state.pos+1)?this.finishOp(_types.types.braceBarL,2):(++this.state.pos,this.finishToken(_types.types.braceL));case 125:return++this.state.pos,this.finishToken(_types.types.braceR);case 58:return this.hasPlugin("functionBind")&&58===this.input.charCodeAt(this.state.pos+1)?this.finishOp(_types.types.doubleColon,2):(++this.state.pos,this.finishToken(_types.types.colon));case 63:return++this.state.pos,this.finishToken(_types.types.question);case 64:return++this.state.pos,this.finishToken(_types.types.at);case 96:return++this.state.pos,this.finishToken(_types.types.backQuote);case 48:var s=this.input.charCodeAt(this.state.pos+1);if(120===s||88===s)return this.readRadixNumber(16);if(111===s||79===s)return this.readRadixNumber(8);if(98===s||66===s)return this.readRadixNumber(2);case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(t);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo(t);case 124:case 38:return this.readToken_pipe_amp(t);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(t);case 60:case 62:return this.readToken_lt_gt(t);case 61:case 33:return this.readToken_eq_excl(t);case 126:return this.finishOp(_types.types.prefix,1)}this.raise(this.state.pos,"Unexpected character '"+codePointToString(t)+"'")},t.prototype.finishOp=function(t,s){var e=this.input.slice(this.state.pos,this.state.pos+s);return this.state.pos+=s,this.finishToken(t,e)},t.prototype.readRegexp=function(){for(var t=void 0,s=void 0,e=this.state.pos;;){this.state.pos>=this.input.length&&this.raise(e,"Unterminated regular expression");var i=this.input.charAt(this.state.pos);if(_whitespace.lineBreak.test(i)&&this.raise(e,"Unterminated regular expression"),t)t=!1;else{if("["===i)s=!0;else if("]"===i&&s)s=!1;else if("/"===i&&!s)break;t="\\"===i}++this.state.pos}var a=this.input.slice(e,this.state.pos);++this.state.pos;var r=this.readWord1();if(r){var n=/^[gmsiyu]*$/;n.test(r)||this.raise(e,"Invalid regular expression flag")}return this.finishToken(_types.types.regexp,{pattern:a,flags:r})},t.prototype.readInt=function(t,s){for(var e=this.state.pos,i=0,a=0,r=null==s?1/0:s;a<r;++a){var n=this.input.charCodeAt(this.state.pos),o=void 0;if(o=n>=97?n-97+10:n>=65?n-65+10:n>=48&&n<=57?n-48:1/0,o>=t)break;++this.state.pos,i=i*t+o}return this.state.pos===e||null!=s&&this.state.pos-e!==s?null:i},t.prototype.readRadixNumber=function(t){this.state.pos+=2;var s=this.readInt(t);return null==s&&this.raise(this.state.start+2,"Expected number in radix "+t),(0,_identifier.isIdentifierStart)(this.fullCharCodeAtPos())&&this.raise(this.state.pos,"Identifier directly after number"),this.finishToken(_types.types.num,s)},t.prototype.readNumber=function(t){var s=this.state.pos,e=!1,i=48===this.input.charCodeAt(this.state.pos);t||null!==this.readInt(10)||this.raise(s,"Invalid number");var a=this.input.charCodeAt(this.state.pos);46===a&&(++this.state.pos,this.readInt(10),e=!0,a=this.input.charCodeAt(this.state.pos)),69!==a&&101!==a||(a=this.input.charCodeAt(++this.state.pos),43!==a&&45!==a||++this.state.pos,null===this.readInt(10)&&this.raise(s,"Invalid number"),e=!0),(0,_identifier.isIdentifierStart)(this.fullCharCodeAtPos())&&this.raise(this.state.pos,"Identifier directly after number");var r=this.input.slice(s,this.state.pos),n=void 0;return e?n=parseFloat(r):i&&1!==r.length?/[89]/.test(r)||this.state.strict?this.raise(s,"Invalid number"):n=parseInt(r,8):n=parseInt(r,10),this.finishToken(_types.types.num,n)},t.prototype.readCodePoint=function(){var t=this.input.charCodeAt(this.state.pos),s=void 0;if(123===t){var e=++this.state.pos;s=this.readHexChar(this.input.indexOf("}",this.state.pos)-this.state.pos),++this.state.pos,s>1114111&&this.raise(e,"Code point out of bounds")}else s=this.readHexChar(4);return s},t.prototype.readString=function(t){for(var s="",e=++this.state.pos;;){this.state.pos>=this.input.length&&this.raise(this.state.start,"Unterminated string constant");var i=this.input.charCodeAt(this.state.pos);if(i===t)break;92===i?(s+=this.input.slice(e,this.state.pos),s+=this.readEscapedChar(!1),e=this.state.pos):((0,_whitespace.isNewLine)(i)&&this.raise(this.state.start,"Unterminated string constant"),++this.state.pos)}return s+=this.input.slice(e,this.state.pos++),this.finishToken(_types.types.string,s)},t.prototype.readTmplToken=function(){for(var t="",s=this.state.pos;;){this.state.pos>=this.input.length&&this.raise(this.state.start,"Unterminated template");var e=this.input.charCodeAt(this.state.pos);if(96===e||36===e&&123===this.input.charCodeAt(this.state.pos+1))return this.state.pos===this.state.start&&this.match(_types.types.template)?36===e?(this.state.pos+=2,this.finishToken(_types.types.dollarBraceL)):(++this.state.pos,this.finishToken(_types.types.backQuote)):(t+=this.input.slice(s,this.state.pos),this.finishToken(_types.types.template,t));if(92===e)t+=this.input.slice(s,this.state.pos),t+=this.readEscapedChar(!0),s=this.state.pos;else if((0,_whitespace.isNewLine)(e)){switch(t+=this.input.slice(s,this.state.pos),++this.state.pos,e){case 13:10===this.input.charCodeAt(this.state.pos)&&++this.state.pos;case 10:t+="\n";break;default:t+=String.fromCharCode(e)}++this.state.curLine,this.state.lineStart=this.state.pos,s=this.state.pos}else++this.state.pos}},t.prototype.readEscapedChar=function(t){var s=this.input.charCodeAt(++this.state.pos);switch(++this.state.pos,s){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return codePointToString(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\x0B";case 102:return"\f";case 13:10===this.input.charCodeAt(this.state.pos)&&++this.state.pos;case 10:return this.state.lineStart=this.state.pos,++this.state.curLine,"";default:if(s>=48&&s<=55){var e=this.input.substr(this.state.pos-1,3).match(/^[0-7]+/)[0],i=parseInt(e,8);return i>255&&(e=e.slice(0,-1),i=parseInt(e,8)),i>0&&(this.state.containsOctal||(this.state.containsOctal=!0,this.state.octalPosition=this.state.pos-2),(this.state.strict||t)&&this.raise(this.state.pos-2,"Octal literal in strict mode")),this.state.pos+=e.length-1,String.fromCharCode(i)}return String.fromCharCode(s)}},t.prototype.readHexChar=function(t){var s=this.state.pos,e=this.readInt(16,t);return null===e&&this.raise(s,"Bad character escape sequence"),e},t.prototype.readWord1=function(){this.state.containsEsc=!1;for(var t="",s=!0,e=this.state.pos;this.state.pos<this.input.length;){var i=this.fullCharCodeAtPos();if((0,_identifier.isIdentifierChar)(i))this.state.pos+=i<=65535?1:2;else{if(92!==i)break;this.state.containsEsc=!0,t+=this.input.slice(e,this.state.pos);var a=this.state.pos;117!==this.input.charCodeAt(++this.state.pos)&&this.raise(this.state.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.state.pos;var r=this.readCodePoint();(s?_identifier.isIdentifierStart:_identifier.isIdentifierChar)(r,!0)||this.raise(a,"Invalid Unicode escape"),t+=codePointToString(r),e=this.state.pos}s=!1}return t+this.input.slice(e,this.state.pos)},t.prototype.readWord=function(){var t=this.readWord1(),s=_types.types.name;return!this.state.containsEsc&&this.isKeyword(t)&&(s=_types.keywords[t]),this.finishToken(s,t)},t.prototype.braceIsBlock=function(t){if(t===_types.types.colon){var s=this.curContext();if(s===_context.types.braceStatement||s===_context.types.braceExpression)return!s.isExpr}return t===_types.types._return?_whitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd,this.state.start)):t===_types.types._else||t===_types.types.semi||t===_types.types.eof||t===_types.types.parenR||(t===_types.types.braceL?this.curContext()===_context.types.braceStatement:!this.state.exprAllowed)},t.prototype.updateContext=function(t){var s=void 0,e=this.state.type;e.keyword&&t===_types.types.dot?this.state.exprAllowed=!1:(s=e.updateContext)?s.call(this,t):this.state.exprAllowed=e.beforeExpr},t}();exports["default"]=Tokenizer;

/***/ },

/***/ "./node_modules/babylon/lib/tokenizer/types.js":
/***/ function(module, exports) {

	"use strict";function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function binop(e,r){return new TokenType(e,{beforeExpr:!0,binop:r})}function kw(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};r.keyword=e,keywords[e]=types["_"+e]=new TokenType(e,r)}exports.__esModule=!0;var TokenType=exports.TokenType=function e(r){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};_classCallCheck(this,e),this.label=r,this.keyword=o.keyword,this.beforeExpr=!!o.beforeExpr,this.startsExpr=!!o.startsExpr,this.rightAssociative=!!o.rightAssociative,this.isLoop=!!o.isLoop,this.isAssign=!!o.isAssign,this.prefix=!!o.prefix,this.postfix=!!o.postfix,this.binop=o.binop||null,this.updateContext=null},beforeExpr={beforeExpr:!0},startsExpr={startsExpr:!0},types=exports.types={num:new TokenType("num",startsExpr),regexp:new TokenType("regexp",startsExpr),string:new TokenType("string",startsExpr),name:new TokenType("name",startsExpr),eof:new TokenType("eof"),bracketL:new TokenType("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new TokenType("]"),braceL:new TokenType("{",{beforeExpr:!0,startsExpr:!0}),braceBarL:new TokenType("{|",{beforeExpr:!0,startsExpr:!0}),braceR:new TokenType("}"),braceBarR:new TokenType("|}"),parenL:new TokenType("(",{beforeExpr:!0,startsExpr:!0}),parenR:new TokenType(")"),comma:new TokenType(",",beforeExpr),semi:new TokenType(";",beforeExpr),colon:new TokenType(":",beforeExpr),doubleColon:new TokenType("::",beforeExpr),dot:new TokenType("."),question:new TokenType("?",beforeExpr),arrow:new TokenType("=>",beforeExpr),template:new TokenType("template"),ellipsis:new TokenType("...",beforeExpr),backQuote:new TokenType("`",startsExpr),dollarBraceL:new TokenType("${",{beforeExpr:!0,startsExpr:!0}),at:new TokenType("@"),eq:new TokenType("=",{beforeExpr:!0,isAssign:!0}),assign:new TokenType("_=",{beforeExpr:!0,isAssign:!0}),incDec:new TokenType("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new TokenType("prefix",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:binop("||",1),logicalAND:binop("&&",2),bitwiseOR:binop("|",3),bitwiseXOR:binop("^",4),bitwiseAND:binop("&",5),equality:binop("==/!=",6),relational:binop("</>",7),bitShift:binop("<</>>",8),plusMin:new TokenType("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:binop("%",10),star:binop("*",10),slash:binop("/",10),exponent:new TokenType("**",{beforeExpr:!0,binop:11,rightAssociative:!0})},keywords=exports.keywords={};kw("break"),kw("case",beforeExpr),kw("catch"),kw("continue"),kw("debugger"),kw("default",beforeExpr),kw("do",{isLoop:!0,beforeExpr:!0}),kw("else",beforeExpr),kw("finally"),kw("for",{isLoop:!0}),kw("function",startsExpr),kw("if"),kw("return",beforeExpr),kw("switch"),kw("throw",beforeExpr),kw("try"),kw("var"),kw("let"),kw("const"),kw("while",{isLoop:!0}),kw("with"),kw("new",{beforeExpr:!0,startsExpr:!0}),kw("this",startsExpr),kw("super",startsExpr),kw("class"),kw("extends",beforeExpr),kw("export"),kw("import"),kw("yield",{beforeExpr:!0,startsExpr:!0}),kw("null",startsExpr),kw("true",startsExpr),kw("false",startsExpr),kw("in",{beforeExpr:!0,binop:7}),kw("instanceof",{beforeExpr:!0,binop:7}),kw("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),kw("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),kw("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0});

/***/ },

/***/ "./node_modules/babylon/lib/tokenizer/context.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}exports.__esModule=!0,exports.types=exports.TokContext=void 0;var _types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),_whitespace=__webpack_require__("./node_modules/babylon/lib/util/whitespace.js"),TokContext=exports.TokContext=function t(e,s,p,n){_classCallCheck(this,t),this.token=e,this.isExpr=!!s,this.preserveSpace=!!p,this.override=n},types=exports.types={braceStatement:new TokContext("{",(!1)),braceExpression:new TokContext("{",(!0)),templateQuasi:new TokContext("${",(!0)),parenStatement:new TokContext("(",(!1)),parenExpression:new TokContext("(",(!0)),template:new TokContext("`",(!0),(!0),function(t){return t.readTmplToken()}),functionExpression:new TokContext("function",(!0))};_types.types.parenR.updateContext=_types.types.braceR.updateContext=function(){if(1===this.state.context.length)return void(this.state.exprAllowed=!0);var t=this.state.context.pop();t===types.braceStatement&&this.curContext()===types.functionExpression?(this.state.context.pop(),this.state.exprAllowed=!1):t===types.templateQuasi?this.state.exprAllowed=!0:this.state.exprAllowed=!t.isExpr},_types.types.name.updateContext=function(t){this.state.exprAllowed=!1,t!==_types.types._let&&t!==_types.types._const&&t!==_types.types._var||_whitespace.lineBreak.test(this.input.slice(this.state.end))&&(this.state.exprAllowed=!0)},_types.types.braceL.updateContext=function(t){this.state.context.push(this.braceIsBlock(t)?types.braceStatement:types.braceExpression),this.state.exprAllowed=!0},_types.types.dollarBraceL.updateContext=function(){this.state.context.push(types.templateQuasi),this.state.exprAllowed=!0},_types.types.parenL.updateContext=function(t){var e=t===_types.types._if||t===_types.types._for||t===_types.types._with||t===_types.types._while;this.state.context.push(e?types.parenStatement:types.parenExpression),this.state.exprAllowed=!0},_types.types.incDec.updateContext=function(){},_types.types._function.updateContext=function(){this.curContext()!==types.braceStatement&&this.state.context.push(types.functionExpression),this.state.exprAllowed=!1},_types.types.backQuote.updateContext=function(){this.curContext()===types.template?this.state.context.pop():this.state.context.push(types.template),this.state.exprAllowed=!1};

/***/ },

/***/ "./node_modules/babylon/lib/util/whitespace.js":
/***/ function(module, exports) {

	"use strict";function isNewLine(e){return 10===e||13===e||8232===e||8233===e}exports.__esModule=!0,exports.isNewLine=isNewLine;var lineBreak=exports.lineBreak=/\r\n?|\n|\u2028|\u2029/,lineBreakG=exports.lineBreakG=new RegExp(lineBreak.source,"g"),nonASCIIwhitespace=exports.nonASCIIwhitespace=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

/***/ },

/***/ "./node_modules/babylon/lib/util/location.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function getLineInfo(e,t){for(var i=1,n=0;;){_whitespace.lineBreakG.lastIndex=n;var o=_whitespace.lineBreakG.exec(e);if(!(o&&o.index<t))return new Position(i,t-n);++i,n=o.index+o[0].length}}exports.__esModule=!0,exports.SourceLocation=exports.Position=void 0,exports.getLineInfo=getLineInfo;var _whitespace=__webpack_require__("./node_modules/babylon/lib/util/whitespace.js"),Position=exports.Position=function e(t,i){_classCallCheck(this,e),this.line=t,this.column=i},SourceLocation=exports.SourceLocation=function t(e,i){_classCallCheck(this,t),this.start=e,this.end=i};

/***/ },

/***/ "./node_modules/babylon/lib/tokenizer/state.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}exports.__esModule=!0;var _location=__webpack_require__("./node_modules/babylon/lib/util/location.js"),_context=__webpack_require__("./node_modules/babylon/lib/tokenizer/context.js"),_types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),State=function(){function t(){_classCallCheck(this,t)}return t.prototype.init=function(t,i){return this.strict=t.strictMode!==!1&&"module"===t.sourceType,this.input=i,this.potentialArrowAt=-1,this.inMethod=this.inFunction=this.inGenerator=this.inAsync=this.inType=!1,this.labels=[],this.decorators=[],this.tokens=[],this.comments=[],this.trailingComments=[],this.leadingComments=[],this.commentStack=[],this.pos=this.lineStart=0,this.curLine=1,this.type=_types.types.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=[_context.types.braceStatement],this.exprAllowed=!0,this.containsEsc=this.containsOctal=!1,this.octalPosition=null,this.exportedIdentifiers=[],this},t.prototype.curPosition=function(){return new _location.Position(this.curLine,this.pos-this.lineStart)},t.prototype.clone=function(i){var s=new t;for(var e in this){var n=this[e];i&&"context"!==e||!Array.isArray(n)||(n=n.slice()),s[e]=n}return s},t}();exports["default"]=State;

/***/ },

/***/ "./node_modules/babylon/lib/parser/util.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),_index=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_index2=_interopRequireDefault(_index),_whitespace=__webpack_require__("./node_modules/babylon/lib/util/whitespace.js"),pp=_index2["default"].prototype;pp.addExtra=function(t,e,n){if(t){var i=t.extra=t.extra||{};i[e]=n}},pp.isRelational=function(t){return this.match(_types.types.relational)&&this.state.value===t},pp.expectRelational=function(t){this.isRelational(t)?this.next():this.unexpected(null,_types.types.relational)},pp.isContextual=function(t){return this.match(_types.types.name)&&this.state.value===t},pp.eatContextual=function(t){return this.state.value===t&&this.eat(_types.types.name)},pp.expectContextual=function(t,e){this.eatContextual(t)||this.unexpected(null,e)},pp.canInsertSemicolon=function(){return this.match(_types.types.eof)||this.match(_types.types.braceR)||_whitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd,this.state.start))},pp.isLineTerminator=function(){return this.eat(_types.types.semi)||this.canInsertSemicolon()},pp.semicolon=function(){this.isLineTerminator()||this.unexpected(null,_types.types.semi)},pp.expect=function(t,e){return this.eat(t)||this.unexpected(e,t)},pp.unexpected=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Unexpected token";e&&"object"===("undefined"==typeof e?"undefined":_typeof(e))&&e.label&&(e="Unexpected token, expected "+e.label),this.raise(null!=t?t:this.state.start,e)};

/***/ },

/***/ "./node_modules/babylon/lib/parser/statement.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}var _types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),_index=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_index2=_interopRequireDefault(_index),_whitespace=__webpack_require__("./node_modules/babylon/lib/util/whitespace.js"),pp=_index2["default"].prototype;pp.parseTopLevel=function(t,e){return e.sourceType=this.options.sourceType,this.parseBlockBody(e,!0,!0,_types.types.eof),t.program=this.finishNode(e,"Program"),t.comments=this.state.comments,t.tokens=this.state.tokens,this.finishNode(t,"File")};var loopLabel={kind:"loop"},switchLabel={kind:"switch"};pp.stmtToDirective=function(t){var e=t.expression,s=this.startNodeAt(e.start,e.loc.start),i=this.startNodeAt(t.start,t.loc.start),a=this.input.slice(e.start,e.end),r=s.value=a.slice(1,-1);return this.addExtra(s,"raw",a),this.addExtra(s,"rawValue",r),i.value=this.finishNodeAt(s,"DirectiveLiteral",e.end,e.loc.end),this.finishNodeAt(i,"Directive",t.end,t.loc.end)},pp.parseStatement=function(t,e){this.match(_types.types.at)&&this.parseDecorators(!0);var s=this.state.type,i=this.startNode();switch(s){case _types.types._break:case _types.types._continue:return this.parseBreakContinueStatement(i,s.keyword);case _types.types._debugger:return this.parseDebuggerStatement(i);case _types.types._do:return this.parseDoStatement(i);case _types.types._for:return this.parseForStatement(i);case _types.types._function:return t||this.unexpected(),this.parseFunctionStatement(i);case _types.types._class:return t||this.unexpected(),this.takeDecorators(i),this.parseClass(i,!0);case _types.types._if:return this.parseIfStatement(i);case _types.types._return:return this.parseReturnStatement(i);case _types.types._switch:return this.parseSwitchStatement(i);case _types.types._throw:return this.parseThrowStatement(i);case _types.types._try:return this.parseTryStatement(i);case _types.types._let:case _types.types._const:t||this.unexpected();case _types.types._var:return this.parseVarStatement(i,s);case _types.types._while:return this.parseWhileStatement(i);case _types.types._with:return this.parseWithStatement(i);case _types.types.braceL:return this.parseBlock();case _types.types.semi:return this.parseEmptyStatement(i);case _types.types._export:case _types.types._import:if(this.hasPlugin("dynamicImport")&&this.lookahead().type===_types.types.parenL)break;return this.options.allowImportExportEverywhere||(e||this.raise(this.state.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.state.start,"'import' and 'export' may appear only with 'sourceType: module'")),s===_types.types._import?this.parseImport(i):this.parseExport(i);case _types.types.name:if("async"===this.state.value){var a=this.state.clone();if(this.next(),this.match(_types.types._function)&&!this.canInsertSemicolon())return this.expect(_types.types._function),this.parseFunction(i,!0,!1,!0);this.state=a}}var r=this.state.value,p=this.parseExpression();return s===_types.types.name&&"Identifier"===p.type&&this.eat(_types.types.colon)?this.parseLabeledStatement(i,r,p):this.parseExpressionStatement(i,p)},pp.takeDecorators=function(t){this.state.decorators.length&&(t.decorators=this.state.decorators,this.state.decorators=[])},pp.parseDecorators=function(t){for(;this.match(_types.types.at);)this.state.decorators.push(this.parseDecorator());t&&this.match(_types.types._export)||this.match(_types.types._class)||this.raise(this.state.start,"Leading decorators must be attached to a class declaration")},pp.parseDecorator=function(){this.hasPlugin("decorators")||this.unexpected();var t=this.startNode();return this.next(),t.expression=this.parseMaybeAssign(),this.finishNode(t,"Decorator")},pp.parseBreakContinueStatement=function(t,e){var s="break"===e;this.next(),this.isLineTerminator()?t.label=null:this.match(_types.types.name)?(t.label=this.parseIdentifier(),this.semicolon()):this.unexpected();var i=void 0;for(i=0;i<this.state.labels.length;++i){var a=this.state.labels[i];if(null==t.label||a.name===t.label.name){if(null!=a.kind&&(s||"loop"===a.kind))break;if(t.label&&s)break}}return i===this.state.labels.length&&this.raise(t.start,"Unsyntactic "+e),this.finishNode(t,s?"BreakStatement":"ContinueStatement")},pp.parseDebuggerStatement=function(t){return this.next(),this.semicolon(),this.finishNode(t,"DebuggerStatement")},pp.parseDoStatement=function(t){return this.next(),this.state.labels.push(loopLabel),t.body=this.parseStatement(!1),this.state.labels.pop(),this.expect(_types.types._while),t.test=this.parseParenExpression(),this.eat(_types.types.semi),this.finishNode(t,"DoWhileStatement")},pp.parseForStatement=function(t){this.next(),this.state.labels.push(loopLabel);var e=!1;if(this.hasPlugin("asyncGenerators")&&this.state.inAsync&&this.isContextual("await")&&(e=!0,this.next()),this.expect(_types.types.parenL),this.match(_types.types.semi))return e&&this.unexpected(),this.parseFor(t,null);if(this.match(_types.types._var)||this.match(_types.types._let)||this.match(_types.types._const)){var s=this.startNode(),i=this.state.type;return this.next(),this.parseVar(s,!0,i),this.finishNode(s,"VariableDeclaration"),!this.match(_types.types._in)&&!this.isContextual("of")||1!==s.declarations.length||s.declarations[0].init?(e&&this.unexpected(),this.parseFor(t,s)):this.parseForIn(t,s,e)}var a={start:0},r=this.parseExpression(!0,a);if(this.match(_types.types._in)||this.isContextual("of")){var p=this.isContextual("of")?"for-of statement":"for-in statement";return this.toAssignable(r,void 0,p),this.checkLVal(r,void 0,void 0,p),this.parseForIn(t,r,e)}return a.start&&this.unexpected(a.start),e&&this.unexpected(),this.parseFor(t,r)},pp.parseFunctionStatement=function(t){return this.next(),this.parseFunction(t,!0)},pp.parseIfStatement=function(t){return this.next(),t.test=this.parseParenExpression(),t.consequent=this.parseStatement(!1),t.alternate=this.eat(_types.types._else)?this.parseStatement(!1):null,this.finishNode(t,"IfStatement")},pp.parseReturnStatement=function(t){return this.state.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.state.start,"'return' outside of function"),this.next(),this.isLineTerminator()?t.argument=null:(t.argument=this.parseExpression(),this.semicolon()),this.finishNode(t,"ReturnStatement")},pp.parseSwitchStatement=function(t){this.next(),t.discriminant=this.parseParenExpression(),t.cases=[],this.expect(_types.types.braceL),this.state.labels.push(switchLabel);for(var e,s=void 0;!this.match(_types.types.braceR);)if(this.match(_types.types._case)||this.match(_types.types._default)){var i=this.match(_types.types._case);s&&this.finishNode(s,"SwitchCase"),t.cases.push(s=this.startNode()),s.consequent=[],this.next(),i?s.test=this.parseExpression():(e&&this.raise(this.state.lastTokStart,"Multiple default clauses"),e=!0,s.test=null),this.expect(_types.types.colon)}else s?s.consequent.push(this.parseStatement(!0)):this.unexpected();return s&&this.finishNode(s,"SwitchCase"),this.next(),this.state.labels.pop(),this.finishNode(t,"SwitchStatement")},pp.parseThrowStatement=function(t){return this.next(),_whitespace.lineBreak.test(this.input.slice(this.state.lastTokEnd,this.state.start))&&this.raise(this.state.lastTokEnd,"Illegal newline after throw"),t.argument=this.parseExpression(),this.semicolon(),this.finishNode(t,"ThrowStatement")};var empty=[];pp.parseTryStatement=function(t){if(this.next(),t.block=this.parseBlock(),t.handler=null,this.match(_types.types._catch)){var e=this.startNode();this.next(),this.expect(_types.types.parenL),e.param=this.parseBindingAtom(),this.checkLVal(e.param,!0,Object.create(null),"catch clause"),this.expect(_types.types.parenR),e.body=this.parseBlock(),t.handler=this.finishNode(e,"CatchClause")}return t.guardedHandlers=empty,t.finalizer=this.eat(_types.types._finally)?this.parseBlock():null,t.handler||t.finalizer||this.raise(t.start,"Missing catch or finally clause"),this.finishNode(t,"TryStatement")},pp.parseVarStatement=function(t,e){return this.next(),this.parseVar(t,!1,e),this.semicolon(),this.finishNode(t,"VariableDeclaration")},pp.parseWhileStatement=function(t){return this.next(),t.test=this.parseParenExpression(),this.state.labels.push(loopLabel),t.body=this.parseStatement(!1),this.state.labels.pop(),this.finishNode(t,"WhileStatement")},pp.parseWithStatement=function(t){return this.state.strict&&this.raise(this.state.start,"'with' in strict mode"),this.next(),t.object=this.parseParenExpression(),t.body=this.parseStatement(!1),this.finishNode(t,"WithStatement")},pp.parseEmptyStatement=function(t){return this.next(),this.finishNode(t,"EmptyStatement")},pp.parseLabeledStatement=function(t,e,s){for(var i=this.state.labels,a=Array.isArray(i),r=0,i=a?i:i[Symbol.iterator]();;){var p;if(a){if(r>=i.length)break;p=i[r++]}else{if(r=i.next(),r.done)break;p=r.value}var n=p;n.name===e&&this.raise(s.start,"Label '"+e+"' is already declared")}for(var h=this.state.type.isLoop?"loop":this.match(_types.types._switch)?"switch":null,o=this.state.labels.length-1;o>=0;o--){var c=this.state.labels[o];if(c.statementStart!==t.start)break;c.statementStart=this.state.start,c.kind=h}return this.state.labels.push({name:e,kind:h,statementStart:this.state.start}),t.body=this.parseStatement(!0),this.state.labels.pop(),t.label=s,this.finishNode(t,"LabeledStatement")},pp.parseExpressionStatement=function(t,e){return t.expression=e,this.semicolon(),this.finishNode(t,"ExpressionStatement")},pp.parseBlock=function(t){var e=this.startNode();return this.expect(_types.types.braceL),this.parseBlockBody(e,t,!1,_types.types.braceR),this.finishNode(e,"BlockStatement")},pp.parseBlockBody=function(t,e,s,i){t.body=[],t.directives=[];for(var a=!1,r=void 0,p=void 0;!this.eat(i);){a||!this.state.containsOctal||p||(p=this.state.octalPosition);var n=this.parseStatement(!0,s);if(!e||a||"ExpressionStatement"!==n.type||"StringLiteral"!==n.expression.type||n.expression.extra.parenthesized)a=!0,t.body.push(n);else{var h=this.stmtToDirective(n);t.directives.push(h),void 0===r&&"use strict"===h.value.value&&(r=this.state.strict,this.setStrict(!0),p&&this.raise(p,"Octal literal in strict mode"))}}r===!1&&this.setStrict(!1)},pp.parseFor=function(t,e){return t.init=e,this.expect(_types.types.semi),t.test=this.match(_types.types.semi)?null:this.parseExpression(),this.expect(_types.types.semi),t.update=this.match(_types.types.parenR)?null:this.parseExpression(),this.expect(_types.types.parenR),t.body=this.parseStatement(!1),this.state.labels.pop(),this.finishNode(t,"ForStatement")},pp.parseForIn=function(t,e,s){var i=void 0;return s?(this.eatContextual("of"),i="ForAwaitStatement"):(i=this.match(_types.types._in)?"ForInStatement":"ForOfStatement",this.next()),t.left=e,t.right=this.parseExpression(),this.expect(_types.types.parenR),t.body=this.parseStatement(!1),this.state.labels.pop(),this.finishNode(t,i)},pp.parseVar=function(t,e,s){for(t.declarations=[],t.kind=s.keyword;;){var i=this.startNode();if(this.parseVarHead(i),this.eat(_types.types.eq)?i.init=this.parseMaybeAssign(e):s!==_types.types._const||this.match(_types.types._in)||this.isContextual("of")?"Identifier"===i.id.type||e&&(this.match(_types.types._in)||this.isContextual("of"))?i.init=null:this.raise(this.state.lastTokEnd,"Complex binding patterns require an initialization value"):this.unexpected(),t.declarations.push(this.finishNode(i,"VariableDeclarator")),!this.eat(_types.types.comma))break}return t},pp.parseVarHead=function(t){t.id=this.parseBindingAtom(),this.checkLVal(t.id,!0,void 0,"variable declaration")},pp.parseFunction=function(t,e,s,i,a){var r=this.state.inMethod;return this.state.inMethod=!1,this.initFunction(t,i),this.match(_types.types.star)&&(t.async&&!this.hasPlugin("asyncGenerators")?this.unexpected():(t.generator=!0,this.next())),!e||a||this.match(_types.types.name)||this.match(_types.types._yield)||this.unexpected(),(this.match(_types.types.name)||this.match(_types.types._yield))&&(t.id=this.parseBindingIdentifier()),this.parseFunctionParams(t),this.parseFunctionBody(t,s),this.state.inMethod=r,this.finishNode(t,e?"FunctionDeclaration":"FunctionExpression")},pp.parseFunctionParams=function(t){this.expect(_types.types.parenL),t.params=this.parseBindingList(_types.types.parenR)},pp.parseClass=function(t,e,s){return this.next(),this.parseClassId(t,e,s),this.parseClassSuper(t),this.parseClassBody(t),this.finishNode(t,e?"ClassDeclaration":"ClassExpression")},pp.isClassProperty=function(){return this.match(_types.types.eq)||this.isLineTerminator()},pp.isClassMutatorStarter=function(){return!1},pp.parseClassBody=function(t){var e=this.state.strict;this.state.strict=!0;var s=!1,i=!1,a=[],r=this.startNode();for(r.body=[],this.expect(_types.types.braceL);!this.eat(_types.types.braceR);)if(!this.eat(_types.types.semi))if(this.match(_types.types.at))a.push(this.parseDecorator());else{var p=this.startNode();a.length&&(p.decorators=a,a=[]);var n=!1,h=this.match(_types.types.name)&&"static"===this.state.value,o=this.eat(_types.types.star),c=!1,l=!1;if(this.parsePropertyName(p),p["static"]=h&&!this.match(_types.types.parenL),p["static"]&&(o=this.eat(_types.types.star),this.parsePropertyName(p)),!o){if(this.isClassProperty()){r.body.push(this.parseClassProperty(p));continue}"Identifier"===p.key.type&&!p.computed&&this.hasPlugin("classConstructorCall")&&"call"===p.key.name&&this.match(_types.types.name)&&"constructor"===this.state.value&&(n=!0,this.parsePropertyName(p))}var y=!this.match(_types.types.parenL)&&!p.computed&&"Identifier"===p.key.type&&"async"===p.key.name;if(y&&(this.hasPlugin("asyncGenerators")&&this.eat(_types.types.star)&&(o=!0),l=!0,this.parsePropertyName(p)),p.kind="method",!p.computed){var u=p.key;l||o||this.isClassMutatorStarter()||"Identifier"!==u.type||this.match(_types.types.parenL)||"get"!==u.name&&"set"!==u.name||(c=!0,p.kind=u.name,u=this.parsePropertyName(p));var d=!n&&!p["static"]&&("Identifier"===u.type&&"constructor"===u.name||"StringLiteral"===u.type&&"constructor"===u.value);d&&(i&&this.raise(u.start,"Duplicate constructor in the same class"),c&&this.raise(u.start,"Constructor can't have get/set modifier"),o&&this.raise(u.start,"Constructor can't be a generator"),l&&this.raise(u.start,"Constructor can't be an async function"),p.kind="constructor",i=!0);var f=p["static"]&&("Identifier"===u.type&&"prototype"===u.name||"StringLiteral"===u.type&&"prototype"===u.value);f&&this.raise(u.start,"Classes may not have static property named prototype")}if(n&&(s&&this.raise(p.start,"Duplicate constructor call in the same class"),p.kind="constructorCall",s=!0),"constructor"!==p.kind&&"constructorCall"!==p.kind||!p.decorators||this.raise(p.start,"You can't attach decorators to a class constructor"),this.parseClassMethod(r,p,o,l),c){var m="get"===p.kind?0:1;if(p.params.length!==m){var x=p.start;"get"===p.kind?this.raise(x,"getter should have no params"):this.raise(x,"setter should have exactly one param")}}}a.length&&this.raise(this.state.start,"You have trailing decorators with no method"),t.body=this.finishNode(r,"ClassBody"),this.state.strict=e},pp.parseClassProperty=function(t){return this.match(_types.types.eq)?(this.hasPlugin("classProperties")||this.unexpected(),this.next(),t.value=this.parseMaybeAssign()):t.value=null,this.semicolon(),this.finishNode(t,"ClassProperty")},pp.parseClassMethod=function(t,e,s,i){this.parseMethod(e,s,i),t.body.push(this.finishNode(e,"ClassMethod"))},pp.parseClassId=function(t,e,s){this.match(_types.types.name)?t.id=this.parseIdentifier():s||!e?t.id=null:this.unexpected()},pp.parseClassSuper=function(t){t.superClass=this.eat(_types.types._extends)?this.parseExprSubscripts():null},pp.parseExport=function(t){if(this.next(),this.match(_types.types.star)){var e=this.startNode();if(this.next(),!this.hasPlugin("exportExtensions")||!this.eatContextual("as"))return this.parseExportFrom(t,!0),this.finishNode(t,"ExportAllDeclaration");e.exported=this.parseIdentifier(),t.specifiers=[this.finishNode(e,"ExportNamespaceSpecifier")],this.parseExportSpecifiersMaybe(t),this.parseExportFrom(t,!0)}else if(this.hasPlugin("exportExtensions")&&this.isExportDefaultSpecifier()){var s=this.startNode();if(s.exported=this.parseIdentifier(!0),t.specifiers=[this.finishNode(s,"ExportDefaultSpecifier")],this.match(_types.types.comma)&&this.lookahead().type===_types.types.star){this.expect(_types.types.comma);var i=this.startNode();this.expect(_types.types.star),this.expectContextual("as"),i.exported=this.parseIdentifier(),t.specifiers.push(this.finishNode(i,"ExportNamespaceSpecifier"))}else this.parseExportSpecifiersMaybe(t);this.parseExportFrom(t,!0)}else{if(this.eat(_types.types._default)){var a=this.startNode(),r=!1;return this.eat(_types.types._function)?a=this.parseFunction(a,!0,!1,!1,!0):this.match(_types.types._class)?a=this.parseClass(a,!0,!0):(r=!0,a=this.parseMaybeAssign()),t.declaration=a,r&&this.semicolon(),this.checkExport(t,!0,!0),this.finishNode(t,"ExportDefaultDeclaration")}this.state.type.keyword||this.shouldParseExportDeclaration()?(t.specifiers=[],t.source=null,t.declaration=this.parseExportDeclaration(t)):(t.declaration=null,t.specifiers=this.parseExportSpecifiers(),this.parseExportFrom(t))}return this.checkExport(t,!0),this.finishNode(t,"ExportNamedDeclaration")},pp.parseExportDeclaration=function(){return this.parseStatement(!0)},pp.isExportDefaultSpecifier=function(){if(this.match(_types.types.name))return"type"!==this.state.value&&"async"!==this.state.value&&"interface"!==this.state.value;if(!this.match(_types.types._default))return!1;var t=this.lookahead();return t.type===_types.types.comma||t.type===_types.types.name&&"from"===t.value},pp.parseExportSpecifiersMaybe=function(t){this.eat(_types.types.comma)&&(t.specifiers=t.specifiers.concat(this.parseExportSpecifiers()))},pp.parseExportFrom=function(t,e){this.eatContextual("from")?(t.source=this.match(_types.types.string)?this.parseExprAtom():this.unexpected(),this.checkExport(t)):e?this.unexpected():t.source=null,this.semicolon()},pp.shouldParseExportDeclaration=function(){return this.isContextual("async")},pp.checkExport=function(t,e,s){if(e)if(s)this.checkDuplicateExports(t,"default");else if(t.specifiers&&t.specifiers.length)for(var i=t.specifiers,a=Array.isArray(i),r=0,i=a?i:i[Symbol.iterator]();;){var p;if(a){if(r>=i.length)break;p=i[r++]}else{if(r=i.next(),r.done)break;p=r.value}var n=p;this.checkDuplicateExports(n,n.exported.name)}else if(t.declaration)if("FunctionDeclaration"===t.declaration.type||"ClassDeclaration"===t.declaration.type)this.checkDuplicateExports(t,t.declaration.id.name);else if("VariableDeclaration"===t.declaration.type)for(var h=t.declaration.declarations,o=Array.isArray(h),c=0,h=o?h:h[Symbol.iterator]();;){var l;if(o){if(c>=h.length)break;l=h[c++]}else{if(c=h.next(),c.done)break;l=c.value}var y=l;this.checkDeclaration(y.id)}if(this.state.decorators.length){var u=t.declaration&&("ClassDeclaration"===t.declaration.type||"ClassExpression"===t.declaration.type);t.declaration&&u||this.raise(t.start,"You can only use decorators on an export when exporting a class"),this.takeDecorators(t.declaration)}},pp.checkDeclaration=function(t){if("ObjectPattern"===t.type)for(var e=t.properties,s=Array.isArray(e),i=0,e=s?e:e[Symbol.iterator]();;){var a;if(s){if(i>=e.length)break;a=e[i++]}else{if(i=e.next(),i.done)break;a=i.value}var r=a;this.checkDeclaration(r)}else if("ArrayPattern"===t.type)for(var p=t.elements,n=Array.isArray(p),h=0,p=n?p:p[Symbol.iterator]();;){var o;if(n){if(h>=p.length)break;o=p[h++]}else{if(h=p.next(),h.done)break;o=h.value}var c=o;c&&this.checkDeclaration(c)}else"ObjectProperty"===t.type?this.checkDeclaration(t.value):"RestElement"===t.type||"RestProperty"===t.type?this.checkDeclaration(t.argument):"Identifier"===t.type&&this.checkDuplicateExports(t,t.name)},pp.checkDuplicateExports=function(t,e){this.state.exportedIdentifiers.indexOf(e)>-1&&this.raiseDuplicateExportError(t,e),this.state.exportedIdentifiers.push(e)},pp.raiseDuplicateExportError=function(t,e){this.raise(t.start,"default"===e?"Only one default export allowed per module.":"`"+e+"` has already been exported. Exported identifiers must be unique.")},pp.parseExportSpecifiers=function(){var t=[],e=!0,s=void 0;for(this.expect(_types.types.braceL);!this.eat(_types.types.braceR);){if(e)e=!1;else if(this.expect(_types.types.comma),this.eat(_types.types.braceR))break;var i=this.match(_types.types._default);i&&!s&&(s=!0);var a=this.startNode();a.local=this.parseIdentifier(i),a.exported=this.eatContextual("as")?this.parseIdentifier(!0):a.local.__clone(),t.push(this.finishNode(a,"ExportSpecifier"))}return s&&!this.isContextual("from")&&this.unexpected(),t},pp.parseImport=function(t){return this.next(),this.match(_types.types.string)?(t.specifiers=[],t.source=this.parseExprAtom()):(t.specifiers=[],this.parseImportSpecifiers(t),this.expectContextual("from"),t.source=this.match(_types.types.string)?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(t,"ImportDeclaration")},pp.parseImportSpecifiers=function(t){var e=!0;if(this.match(_types.types.name)){var s=this.state.start,i=this.state.startLoc;if(t.specifiers.push(this.parseImportSpecifierDefault(this.parseIdentifier(),s,i)),!this.eat(_types.types.comma))return}if(this.match(_types.types.star)){var a=this.startNode();return this.next(),this.expectContextual("as"),a.local=this.parseIdentifier(),this.checkLVal(a.local,!0,void 0,"import namespace specifier"),void t.specifiers.push(this.finishNode(a,"ImportNamespaceSpecifier"))}for(this.expect(_types.types.braceL);!this.eat(_types.types.braceR);){if(e)e=!1;else if(this.expect(_types.types.comma),this.eat(_types.types.braceR))break;var r=this.startNode();r.imported=this.parseIdentifier(!0),r.local=this.eatContextual("as")?this.parseIdentifier():r.imported.__clone(),this.checkLVal(r.local,!0,void 0,"import specifier"),t.specifiers.push(this.finishNode(r,"ImportSpecifier"))}},pp.parseImportSpecifierDefault=function(t,e,s){var i=this.startNodeAt(e,s);return i.local=t,this.checkLVal(i.local,!0,void 0,"default import specifier"),this.finishNode(i,"ImportDefaultSpecifier")};

/***/ },

/***/ "./node_modules/babylon/lib/parser/lval.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),_index=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_index2=_interopRequireDefault(_index),_identifier=__webpack_require__("./node_modules/babylon/lib/util/identifier.js"),pp=_index2["default"].prototype;pp.toAssignable=function(e,t,s){if(e)switch(e.type){case"Identifier":case"ObjectPattern":case"ArrayPattern":case"AssignmentPattern":break;case"ObjectExpression":e.type="ObjectPattern";for(var r=e.properties,i=Array.isArray(r),a=0,r=i?r:r[Symbol.iterator]();;){var n;if(i){if(a>=r.length)break;n=r[a++]}else{if(a=r.next(),a.done)break;n=a.value}var p=n;"ObjectMethod"===p.type?"get"===p.kind||"set"===p.kind?this.raise(p.key.start,"Object pattern can't contain getter or setter"):this.raise(p.key.start,"Object pattern can't contain methods"):this.toAssignable(p,t,"object destructuring pattern")}break;case"ObjectProperty":this.toAssignable(e.value,t,s);break;case"SpreadProperty":e.type="RestProperty";break;case"ArrayExpression":e.type="ArrayPattern",this.toAssignableList(e.elements,t,s);break;case"AssignmentExpression":"="===e.operator?(e.type="AssignmentPattern",delete e.operator):this.raise(e.left.end,"Only '=' operator can be used for specifying default value.");break;case"MemberExpression":if(!t)break;default:var o="Invalid left-hand side"+(s?" in "+s:"expression");this.raise(e.start,o)}return e},pp.toAssignableList=function(e,t,s){var r=e.length;if(r){var i=e[r-1];if(i&&"RestElement"===i.type)--r;else if(i&&"SpreadElement"===i.type){i.type="RestElement";var a=i.argument;this.toAssignable(a,t,s),"Identifier"!==a.type&&"MemberExpression"!==a.type&&"ArrayPattern"!==a.type&&this.unexpected(a.start),--r}}for(var n=0;n<r;n++){var p=e[n];p&&this.toAssignable(p,t,s)}return e},pp.toReferencedList=function(e){return e},pp.parseSpread=function(e){var t=this.startNode();return this.next(),t.argument=this.parseMaybeAssign(!1,e),this.finishNode(t,"SpreadElement")},pp.parseRest=function(){var e=this.startNode();return this.next(),e.argument=this.parseBindingIdentifier(),this.finishNode(e,"RestElement")},pp.shouldAllowYieldIdentifier=function(){return this.match(_types.types._yield)&&!this.state.strict&&!this.state.inGenerator},pp.parseBindingIdentifier=function(){return this.parseIdentifier(this.shouldAllowYieldIdentifier())},pp.parseBindingAtom=function(){switch(this.state.type){case _types.types._yield:(this.state.strict||this.state.inGenerator)&&this.unexpected();case _types.types.name:return this.parseIdentifier(!0);case _types.types.bracketL:var e=this.startNode();return this.next(),e.elements=this.parseBindingList(_types.types.bracketR,!0),this.finishNode(e,"ArrayPattern");case _types.types.braceL:return this.parseObj(!0);default:this.unexpected()}},pp.parseBindingList=function(e,t){for(var s=[],r=!0;!this.eat(e);)if(r?r=!1:this.expect(_types.types.comma),t&&this.match(_types.types.comma))s.push(null);else{if(this.eat(e))break;if(this.match(_types.types.ellipsis)){s.push(this.parseAssignableListItemTypes(this.parseRest())),this.expect(e);break}for(var i=[];this.match(_types.types.at);)i.push(this.parseDecorator());var a=this.parseMaybeDefault();i.length&&(a.decorators=i),this.parseAssignableListItemTypes(a),s.push(this.parseMaybeDefault(a.start,a.loc.start,a))}return s},pp.parseAssignableListItemTypes=function(e){return e},pp.parseMaybeDefault=function(e,t,s){if(t=t||this.state.startLoc,e=e||this.state.start,s=s||this.parseBindingAtom(),!this.eat(_types.types.eq))return s;var r=this.startNodeAt(e,t);return r.left=s,r.right=this.parseMaybeAssign(),this.finishNode(r,"AssignmentPattern")},pp.checkLVal=function(e,t,s,r){switch(e.type){case"Identifier":if(this.state.strict&&(_identifier.reservedWords.strictBind(e.name)||_identifier.reservedWords.strict(e.name))&&this.raise(e.start,(t?"Binding ":"Assigning to ")+e.name+" in strict mode"),s){var i="_"+e.name;s[i]?this.raise(e.start,"Argument name clash in strict mode"):s[i]=!0}break;case"MemberExpression":t&&this.raise(e.start,(t?"Binding":"Assigning to")+" member expression");break;case"ObjectPattern":for(var a=e.properties,n=Array.isArray(a),p=0,a=n?a:a[Symbol.iterator]();;){var o;if(n){if(p>=a.length)break;o=a[p++]}else{if(p=a.next(),p.done)break;o=p.value}var h=o;"ObjectProperty"===h.type&&(h=h.value),this.checkLVal(h,t,s,"object destructuring pattern")}break;case"ArrayPattern":for(var c=e.elements,d=Array.isArray(c),l=0,c=d?c:c[Symbol.iterator]();;){var u;if(d){if(l>=c.length)break;u=c[l++]}else{if(l=c.next(),l.done)break;u=l.value}var y=u;y&&this.checkLVal(y,t,s,"array destructuring pattern")}break;case"AssignmentPattern":this.checkLVal(e.left,t,s,"assignment pattern");break;case"RestProperty":this.checkLVal(e.argument,t,s,"rest property");break;case"RestElement":this.checkLVal(e.argument,t,s,"rest element");break;default:var f=(t?"Binding invalid":"Invalid")+" left-hand side"+(r?" in "+r:"expression");this.raise(e.start,f)}};

/***/ },

/***/ "./node_modules/babylon/lib/parser/expression.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}var _types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),_index=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_index2=_interopRequireDefault(_index),_identifier=__webpack_require__("./node_modules/babylon/lib/util/identifier.js"),pp=_index2["default"].prototype;pp.checkPropClash=function(t,e){if(!t.computed){var s=t.key,i=void 0;switch(s.type){case"Identifier":i=s.name;break;case"StringLiteral":case"NumericLiteral":i=String(s.value);break;default:return}"__proto__"!==i||t.kind||(e.proto&&this.raise(s.start,"Redefinition of __proto__ property"),e.proto=!0)}},pp.parseExpression=function(t,e){var s=this.state.start,i=this.state.startLoc,r=this.parseMaybeAssign(t,e);if(this.match(_types.types.comma)){var a=this.startNodeAt(s,i);for(a.expressions=[r];this.eat(_types.types.comma);)a.expressions.push(this.parseMaybeAssign(t,e));return this.toReferencedList(a.expressions),this.finishNode(a,"SequenceExpression")}return r},pp.parseMaybeAssign=function(t,e,s,i){var r=this.state.start,a=this.state.startLoc;if(this.match(_types.types._yield)&&this.state.inGenerator){var p=this.parseYield();return s&&(p=s.call(this,p,r,a)),p}var n=void 0;e?n=!1:(e={start:0},n=!0),(this.match(_types.types.parenL)||this.match(_types.types.name))&&(this.state.potentialArrowAt=this.state.start);var h=this.parseMaybeConditional(t,e,i);if(s&&(h=s.call(this,h,r,a)),this.state.type.isAssign){var o=this.startNodeAt(r,a);if(o.operator=this.state.value,o.left=this.match(_types.types.eq)?this.toAssignable(h,void 0,"assignment expression"):h,e.start=0,this.checkLVal(h,void 0,void 0,"assignment expression"),h.extra&&h.extra.parenthesized){var c=void 0;"ObjectPattern"===h.type?c="`({a}) = 0` use `({a} = 0)`":"ArrayPattern"===h.type&&(c="`([a]) = 0` use `([a] = 0)`"),c&&this.raise(h.start,"You're trying to assign to a parenthesized expression, eg. instead of "+c)}return this.next(),o.right=this.parseMaybeAssign(t),this.finishNode(o,"AssignmentExpression")}return n&&e.start&&this.unexpected(e.start),h},pp.parseMaybeConditional=function(t,e,s){var i=this.state.start,r=this.state.startLoc,a=this.parseExprOps(t,e);return e&&e.start?a:this.parseConditional(a,t,i,r,s)},pp.parseConditional=function(t,e,s,i){if(this.eat(_types.types.question)){var r=this.startNodeAt(s,i);return r.test=t,r.consequent=this.parseMaybeAssign(),this.expect(_types.types.colon),r.alternate=this.parseMaybeAssign(e),this.finishNode(r,"ConditionalExpression")}return t},pp.parseExprOps=function(t,e){var s=this.state.start,i=this.state.startLoc,r=this.parseMaybeUnary(e);return e&&e.start?r:this.parseExprOp(r,s,i,-1,t)},pp.parseExprOp=function(t,e,s,i,r){var a=this.state.type.binop;if(!(null==a||r&&this.match(_types.types._in))&&a>i){var p=this.startNodeAt(e,s);p.left=t,p.operator=this.state.value,"**"!==p.operator||"UnaryExpression"!==t.type||!t.extra||t.extra.parenthesizedArgument||t.extra.parenthesized||this.raise(t.argument.start,"Illegal expression. Wrap left hand side or entire exponentiation in parentheses.");var n=this.state.type;this.next();var h=this.state.start,o=this.state.startLoc;return p.right=this.parseExprOp(this.parseMaybeUnary(),h,o,n.rightAssociative?a-1:a,r),this.finishNode(p,n===_types.types.logicalOR||n===_types.types.logicalAND?"LogicalExpression":"BinaryExpression"),this.parseExprOp(p,e,s,i,r)}return t},pp.parseMaybeUnary=function(t){if(this.state.type.prefix){var e=this.startNode(),s=this.match(_types.types.incDec);e.operator=this.state.value,e.prefix=!0,this.next();var i=this.state.type;return e.argument=this.parseMaybeUnary(),this.addExtra(e,"parenthesizedArgument",!(i!==_types.types.parenL||e.argument.extra&&e.argument.extra.parenthesized)),t&&t.start&&this.unexpected(t.start),s?this.checkLVal(e.argument,void 0,void 0,"prefix operation"):this.state.strict&&"delete"===e.operator&&"Identifier"===e.argument.type&&this.raise(e.start,"Deleting local variable in strict mode"),this.finishNode(e,s?"UpdateExpression":"UnaryExpression")}var r=this.state.start,a=this.state.startLoc,p=this.parseExprSubscripts(t);if(t&&t.start)return p;for(;this.state.type.postfix&&!this.canInsertSemicolon();){var n=this.startNodeAt(r,a);n.operator=this.state.value,n.prefix=!1,n.argument=p,this.checkLVal(p,void 0,void 0,"postfix operation"),this.next(),p=this.finishNode(n,"UpdateExpression")}return p},pp.parseExprSubscripts=function(t){var e=this.state.start,s=this.state.startLoc,i=this.state.potentialArrowAt,r=this.parseExprAtom(t);return"ArrowFunctionExpression"===r.type&&r.start===i?r:t&&t.start?r:this.parseSubscripts(r,e,s)},pp.parseSubscripts=function(t,e,s,i){for(;;){if(!i&&this.eat(_types.types.doubleColon)){var r=this.startNodeAt(e,s);return r.object=t,r.callee=this.parseNoCallExpr(),this.parseSubscripts(this.finishNode(r,"BindExpression"),e,s,i)}if(this.eat(_types.types.dot)){var a=this.startNodeAt(e,s);a.object=t,a.property=this.parseIdentifier(!0),a.computed=!1,t=this.finishNode(a,"MemberExpression")}else if(this.eat(_types.types.bracketL)){var p=this.startNodeAt(e,s);p.object=t,p.property=this.parseExpression(),p.computed=!0,this.expect(_types.types.bracketR),t=this.finishNode(p,"MemberExpression")}else if(!i&&this.match(_types.types.parenL)){var n=this.state.potentialArrowAt===t.start&&"Identifier"===t.type&&"async"===t.name&&!this.canInsertSemicolon();this.next();var h=this.startNodeAt(e,s);if(h.callee=t,h.arguments=this.parseCallExpressionArguments(_types.types.parenR,n),"Import"===h.callee.type&&1!==h.arguments.length&&this.raise(h.start,"import() requires exactly one argument"),t=this.finishNode(h,"CallExpression"),n&&this.shouldParseAsyncArrow())return this.parseAsyncArrowFromCallExpression(this.startNodeAt(e,s),h);this.toReferencedList(h.arguments)}else{if(!this.match(_types.types.backQuote))return t;var o=this.startNodeAt(e,s);o.tag=t,o.quasi=this.parseTemplate(),t=this.finishNode(o,"TaggedTemplateExpression")}}},pp.parseCallExpressionArguments=function(t,e){for(var s=void 0,i=[],r=!0;!this.eat(t);){if(r)r=!1;else if(this.expect(_types.types.comma),this.eat(t))break;this.match(_types.types.parenL)&&!s&&(s=this.state.start),i.push(this.parseExprListItem(void 0,e?{start:0}:void 0))}return e&&s&&this.shouldParseAsyncArrow()&&this.unexpected(),i},pp.shouldParseAsyncArrow=function(){return this.match(_types.types.arrow)},pp.parseAsyncArrowFromCallExpression=function(t,e){return this.expect(_types.types.arrow),this.parseArrowExpression(t,e.arguments,!0)},pp.parseNoCallExpr=function(){var t=this.state.start,e=this.state.startLoc;return this.parseSubscripts(this.parseExprAtom(),t,e,!0)},pp.parseExprAtom=function(t){var e=void 0,s=this.state.potentialArrowAt===this.state.start;switch(this.state.type){case _types.types._super:return this.state.inMethod||this.options.allowSuperOutsideMethod||this.raise(this.state.start,"'super' outside of function or class"),e=this.startNode(),this.next(),this.match(_types.types.parenL)||this.match(_types.types.bracketL)||this.match(_types.types.dot)||this.unexpected(),this.match(_types.types.parenL)&&"constructor"!==this.state.inMethod&&!this.options.allowSuperOutsideMethod&&this.raise(e.start,"super() outside of class constructor"),this.finishNode(e,"Super");case _types.types._import:return this.hasPlugin("dynamicImport")||this.unexpected(),e=this.startNode(),this.next(),this.match(_types.types.parenL)||this.unexpected(null,_types.types.parenL),this.finishNode(e,"Import");case _types.types._this:return e=this.startNode(),this.next(),this.finishNode(e,"ThisExpression");case _types.types._yield:this.state.inGenerator&&this.unexpected();case _types.types.name:e=this.startNode();var i="await"===this.state.value&&this.state.inAsync,r=this.shouldAllowYieldIdentifier(),a=this.parseIdentifier(i||r);if("await"===a.name){if(this.state.inAsync||this.inModule)return this.parseAwait(e)}else{if("async"===a.name&&this.match(_types.types._function)&&!this.canInsertSemicolon())return this.next(),this.parseFunction(e,!1,!1,!0);if(s&&"async"===a.name&&this.match(_types.types.name)){var p=[this.parseIdentifier()];return this.expect(_types.types.arrow),this.parseArrowExpression(e,p,!0)}}return s&&!this.canInsertSemicolon()&&this.eat(_types.types.arrow)?this.parseArrowExpression(e,[a]):a;case _types.types._do:if(this.hasPlugin("doExpressions")){var n=this.startNode();this.next();var h=this.state.inFunction,o=this.state.labels;return this.state.labels=[],this.state.inFunction=!1,n.body=this.parseBlock(!1,!0),this.state.inFunction=h,this.state.labels=o,this.finishNode(n,"DoExpression")}case _types.types.regexp:var c=this.state.value;return e=this.parseLiteral(c.value,"RegExpLiteral"),e.pattern=c.pattern,e.flags=c.flags,e;case _types.types.num:return this.parseLiteral(this.state.value,"NumericLiteral");case _types.types.string:return this.parseLiteral(this.state.value,"StringLiteral");case _types.types._null:return e=this.startNode(),this.next(),this.finishNode(e,"NullLiteral");case _types.types._true:case _types.types._false:return e=this.startNode(),e.value=this.match(_types.types._true),this.next(),this.finishNode(e,"BooleanLiteral");case _types.types.parenL:return this.parseParenAndDistinguishExpression(null,null,s);case _types.types.bracketL:return e=this.startNode(),this.next(),e.elements=this.parseExprList(_types.types.bracketR,!0,t),this.toReferencedList(e.elements),this.finishNode(e,"ArrayExpression");case _types.types.braceL:return this.parseObj(!1,t);case _types.types._function:return this.parseFunctionExpression();case _types.types.at:this.parseDecorators();case _types.types._class:return e=this.startNode(),this.takeDecorators(e),this.parseClass(e,!1);case _types.types._new:return this.parseNew();case _types.types.backQuote:return this.parseTemplate();case _types.types.doubleColon:e=this.startNode(),this.next(),e.object=null;var y=e.callee=this.parseNoCallExpr();if("MemberExpression"===y.type)return this.finishNode(e,"BindExpression");this.raise(y.start,"Binding should be performed on object property.");default:this.unexpected()}},pp.parseFunctionExpression=function(){var t=this.startNode(),e=this.parseIdentifier(!0);return this.state.inGenerator&&this.eat(_types.types.dot)&&this.hasPlugin("functionSent")?this.parseMetaProperty(t,e,"sent"):this.parseFunction(t,!1)},pp.parseMetaProperty=function(t,e,s){return t.meta=e,t.property=this.parseIdentifier(!0),t.property.name!==s&&this.raise(t.property.start,"The only valid meta property for new is "+e.name+"."+s),this.finishNode(t,"MetaProperty")},pp.parseLiteral=function(t,e){var s=this.startNode();return this.addExtra(s,"rawValue",t),this.addExtra(s,"raw",this.input.slice(this.state.start,this.state.end)),s.value=t,this.next(),this.finishNode(s,e)},pp.parseParenExpression=function(){this.expect(_types.types.parenL);var t=this.parseExpression();return this.expect(_types.types.parenR),t},pp.parseParenAndDistinguishExpression=function(t,e,s){t=t||this.state.start,e=e||this.state.startLoc;var i=void 0;this.expect(_types.types.parenL);for(var r=this.state.start,a=this.state.startLoc,p=[],n=!0,h={start:0},o=void 0,c=void 0,y={start:0};!this.match(_types.types.parenR);){if(n)n=!1;else if(this.expect(_types.types.comma,y.start||null),this.match(_types.types.parenR)){c=this.state.start;break}if(this.match(_types.types.ellipsis)){var u=this.state.start,d=this.state.startLoc;o=this.state.start,p.push(this.parseParenItem(this.parseRest(),d,u));break}p.push(this.parseMaybeAssign(!1,h,this.parseParenItem,y))}var l=this.state.start,f=this.state.startLoc;this.expect(_types.types.parenR);var m=this.startNodeAt(t,e);if(s&&this.shouldParseArrow()&&(m=this.parseArrow(m))){for(var x=p,_=Array.isArray(x),v=0,x=_?x:x[Symbol.iterator]();;){var b;if(_){if(v>=x.length)break;b=x[v++]}else{if(v=x.next(),v.done)break;b=v.value}var g=b;g.extra&&g.extra.parenthesized&&this.unexpected(g.extra.parenStart)}return this.parseArrowExpression(m,p)}return p.length||this.unexpected(this.state.lastTokStart),c&&this.unexpected(c),o&&this.unexpected(o),h.start&&this.unexpected(h.start),y.start&&this.unexpected(y.start),p.length>1?(i=this.startNodeAt(r,a),i.expressions=p,this.toReferencedList(i.expressions),this.finishNodeAt(i,"SequenceExpression",l,f)):i=p[0],this.addExtra(i,"parenthesized",!0),this.addExtra(i,"parenStart",t),i},pp.shouldParseArrow=function(){return!this.canInsertSemicolon()},pp.parseArrow=function(t){if(this.eat(_types.types.arrow))return t},pp.parseParenItem=function(t){return t},pp.parseNew=function(){var t=this.startNode(),e=this.parseIdentifier(!0);return this.eat(_types.types.dot)?this.parseMetaProperty(t,e,"target"):(t.callee=this.parseNoCallExpr(),this.eat(_types.types.parenL)?(t.arguments=this.parseExprList(_types.types.parenR),this.toReferencedList(t.arguments)):t.arguments=[],this.finishNode(t,"NewExpression"))},pp.parseTemplateElement=function(){var t=this.startNode();return t.value={raw:this.input.slice(this.state.start,this.state.end).replace(/\r\n?/g,"\n"),cooked:this.state.value},this.next(),t.tail=this.match(_types.types.backQuote),this.finishNode(t,"TemplateElement")},pp.parseTemplate=function(){var t=this.startNode();this.next(),t.expressions=[];var e=this.parseTemplateElement();for(t.quasis=[e];!e.tail;)this.expect(_types.types.dollarBraceL),t.expressions.push(this.parseExpression()),this.expect(_types.types.braceR),t.quasis.push(e=this.parseTemplateElement());return this.next(),this.finishNode(t,"TemplateLiteral")},pp.parseObj=function(t,e){var s=[],i=Object.create(null),r=!0,a=this.startNode();a.properties=[],this.next();for(var p=null;!this.eat(_types.types.braceR);){if(r)r=!1;else if(this.expect(_types.types.comma),this.eat(_types.types.braceR))break;for(;this.match(_types.types.at);)s.push(this.parseDecorator());var n=this.startNode(),h=!1,o=!1,c=void 0,y=void 0;if(s.length&&(n.decorators=s,s=[]),this.hasPlugin("objectRestSpread")&&this.match(_types.types.ellipsis)){if(n=this.parseSpread(),n.type=t?"RestProperty":"SpreadProperty",a.properties.push(n),!t)continue;var u=this.state.start;if(null===p){if(this.eat(_types.types.braceR))break;if(this.match(_types.types.comma)&&this.lookahead().type===_types.types.braceR)continue;p=u;continue}this.unexpected(p,"Cannot have multiple rest elements when destructuring")}if(n.method=!1,n.shorthand=!1,(t||e)&&(c=this.state.start,y=this.state.startLoc),t||(h=this.eat(_types.types.star)),!t&&this.isContextual("async")){h&&this.unexpected();var d=this.parseIdentifier();this.match(_types.types.colon)||this.match(_types.types.parenL)||this.match(_types.types.braceR)||this.match(_types.types.eq)||this.match(_types.types.comma)?n.key=d:(o=!0,this.hasPlugin("asyncGenerators")&&(h=this.eat(_types.types.star)),this.parsePropertyName(n))}else this.parsePropertyName(n);this.parseObjPropValue(n,c,y,h,o,t,e),this.checkPropClash(n,i),n.shorthand&&this.addExtra(n,"shorthand",!0),a.properties.push(n)}return null!==p&&this.unexpected(p,"The rest element has to be the last element when destructuring"),s.length&&this.raise(this.state.start,"You have trailing decorators with no property"),this.finishNode(a,t?"ObjectPattern":"ObjectExpression")},pp.parseObjPropValue=function(t,e,s,i,r,a,p){if(r||i||this.match(_types.types.parenL))return a&&this.unexpected(),t.kind="method",t.method=!0,this.parseMethod(t,i,r),this.finishNode(t,"ObjectMethod");if(this.eat(_types.types.colon))return t.value=a?this.parseMaybeDefault(this.state.start,this.state.startLoc):this.parseMaybeAssign(!1,p),this.finishNode(t,"ObjectProperty");if(!(a||t.computed||"Identifier"!==t.key.type||"get"!==t.key.name&&"set"!==t.key.name||this.match(_types.types.comma)||this.match(_types.types.braceR))){(i||r)&&this.unexpected(),t.kind=t.key.name,this.parsePropertyName(t),this.parseMethod(t,!1);var n="get"===t.kind?0:1;if(t.params.length!==n){var h=t.start;"get"===t.kind?this.raise(h,"getter should have no params"):this.raise(h,"setter should have exactly one param")}return this.finishNode(t,"ObjectMethod")}if(!t.computed&&"Identifier"===t.key.type){if(a){var o=this.isKeyword(t.key.name);!o&&this.state.strict&&(o=_identifier.reservedWords.strictBind(t.key.name)||_identifier.reservedWords.strict(t.key.name)),o&&this.raise(t.key.start,"Binding "+t.key.name),t.value=this.parseMaybeDefault(e,s,t.key.__clone())}else this.match(_types.types.eq)&&p?(p.start||(p.start=this.state.start),t.value=this.parseMaybeDefault(e,s,t.key.__clone())):t.value=t.key.__clone();return t.shorthand=!0,this.finishNode(t,"ObjectProperty")}this.unexpected()},pp.parsePropertyName=function(t){return this.eat(_types.types.bracketL)?(t.computed=!0,t.key=this.parseMaybeAssign(),this.expect(_types.types.bracketR),t.key):(t.computed=!1,t.key=this.match(_types.types.num)||this.match(_types.types.string)?this.parseExprAtom():this.parseIdentifier(!0))},pp.initFunction=function(t,e){t.id=null,t.generator=!1,t.expression=!1,t.async=!!e},pp.parseMethod=function(t,e,s){var i=this.state.inMethod;return this.state.inMethod=t.kind||!0,this.initFunction(t,s),this.expect(_types.types.parenL),t.params=this.parseBindingList(_types.types.parenR),t.generator=e,this.parseFunctionBody(t),this.state.inMethod=i,t},pp.parseArrowExpression=function(t,e,s){return this.initFunction(t,s),t.params=this.toAssignableList(e,!0,"arrow function parameters"),this.parseFunctionBody(t,!0),this.finishNode(t,"ArrowFunctionExpression")},pp.parseFunctionBody=function(t,e){var s=e&&!this.match(_types.types.braceL),i=this.state.inAsync;if(this.state.inAsync=t.async,s)t.body=this.parseMaybeAssign(),t.expression=!0;else{var r=this.state.inFunction,a=this.state.inGenerator,p=this.state.labels;this.state.inFunction=!0,this.state.inGenerator=t.generator,this.state.labels=[],t.body=this.parseBlock(!0),t.expression=!1,this.state.inFunction=r,this.state.inGenerator=a,this.state.labels=p}this.state.inAsync=i;var n=this.state.strict,h=!1;if(e&&(n=!0),!s&&t.body.directives.length)for(var o=t.body.directives,c=Array.isArray(o),y=0,o=c?o:o[Symbol.iterator]();;){var u;if(c){if(y>=o.length)break;u=o[y++]}else{if(y=o.next(),y.done)break;u=y.value}var d=u;if("use strict"===d.value.value){h=!0,n=!0;break}}if(h&&t.id&&"Identifier"===t.id.type&&"yield"===t.id.name&&this.raise(t.id.start,"Binding yield in strict mode"),n){var l=Object.create(null),f=this.state.strict;h&&(this.state.strict=!0),t.id&&this.checkLVal(t.id,!0,void 0,"function name");for(var m=t.params,x=Array.isArray(m),_=0,m=x?m:m[Symbol.iterator]();;){var v;if(x){if(_>=m.length)break;v=m[_++]}else{if(_=m.next(),_.done)break;v=_.value}var b=v;h&&"Identifier"!==b.type&&this.raise(b.start,"Non-simple parameter in strict mode"),this.checkLVal(b,!0,l,"function parameter list")}this.state.strict=f}},pp.parseExprList=function(t,e,s){for(var i=[],r=!0;!this.eat(t);){if(r)r=!1;else if(this.expect(_types.types.comma),this.eat(t))break;i.push(this.parseExprListItem(e,s))}return i},pp.parseExprListItem=function(t,e){var s=void 0;return s=t&&this.match(_types.types.comma)?null:this.match(_types.types.ellipsis)?this.parseSpread(e):this.parseMaybeAssign(!1,e,this.parseParenItem)},pp.parseIdentifier=function(t){var e=this.startNode();return this.match(_types.types.name)?(!t&&this.state.strict&&_identifier.reservedWords.strict(this.state.value)&&this.raise(this.state.start,"The keyword '"+this.state.value+"' is reserved"),e.name=this.state.value):t&&this.state.type.keyword?e.name=this.state.type.keyword:this.unexpected(),!t&&"await"===e.name&&this.state.inAsync&&this.raise(e.start,"invalid use of await inside of an async function"),e.loc.identifierName=e.name,this.next(),this.finishNode(e,"Identifier")},pp.parseAwait=function(t){return this.state.inAsync||this.unexpected(),this.match(_types.types.star)&&this.raise(t.start,"await* has been removed from the async functions proposal. Use Promise.all() instead."),t.argument=this.parseMaybeUnary(),this.finishNode(t,"AwaitExpression")},pp.parseYield=function(){var t=this.startNode();return this.next(),this.match(_types.types.semi)||this.canInsertSemicolon()||!this.match(_types.types.star)&&!this.state.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(_types.types.star),t.argument=this.parseMaybeAssign()),this.finishNode(t,"YieldExpression")};

/***/ },

/***/ "./node_modules/babylon/lib/parser/node.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function finishNodeAt(t,e,n,i){return t.type=e,t.end=n,t.loc.end=i,this.processComment(t),t}var _index=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_index2=_interopRequireDefault(_index),_location=__webpack_require__("./node_modules/babylon/lib/util/location.js"),pp=_index2["default"].prototype,commentKeys=["leadingComments","trailingComments","innerComments"],Node=function(){function t(e,n,i){_classCallCheck(this,t),this.type="",this.start=e,this.end=0,this.loc=new _location.SourceLocation(n),i&&(this.loc.filename=i)}return t.prototype.__clone=function(){var e=new t;for(var n in this)commentKeys.indexOf(n)<0&&(e[n]=this[n]);return e},t}();pp.startNode=function(){return new Node(this.state.start,this.state.startLoc,this.filename)},pp.startNodeAt=function(t,e){return new Node(t,e,this.filename)},pp.finishNode=function(t,e){return finishNodeAt.call(this,t,e,this.state.lastTokEnd,this.state.lastTokEndLoc)},pp.finishNodeAt=function(t,e,n,i){return finishNodeAt.call(this,t,e,n,i)};

/***/ },

/***/ "./node_modules/babylon/lib/parser/location.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _location=__webpack_require__("./node_modules/babylon/lib/util/location.js"),_index=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_index2=_interopRequireDefault(_index),pp=_index2["default"].prototype;pp.raise=function(e,i){var n=(0,_location.getLineInfo)(this.input,e);i+=" ("+n.line+":"+n.column+")";var t=new SyntaxError(i);throw t.pos=e,t.loc=n,t};

/***/ },

/***/ "./node_modules/babylon/lib/parser/comments.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function last(t){return t[t.length-1]}var _index=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_index2=_interopRequireDefault(_index),pp=_index2["default"].prototype;pp.addComment=function(t){this.filename&&(t.loc.filename=this.filename),this.state.trailingComments.push(t),this.state.leadingComments.push(t)},pp.processComment=function(t){if(!("Program"===t.type&&t.body.length>0)){var e=this.state.commentStack,n=void 0,s=void 0,i=void 0,m=void 0;if(this.state.trailingComments.length>0)this.state.trailingComments[0].start>=t.end?(s=this.state.trailingComments,this.state.trailingComments=[]):this.state.trailingComments.length=0;else{var a=last(e);e.length>0&&a.trailingComments&&a.trailingComments[0].start>=t.end&&(s=a.trailingComments,a.trailingComments=null)}for(;e.length>0&&last(e).start>=t.start;)n=e.pop();if(n){if(n.leadingComments)if(n!==t&&last(n.leadingComments).end<=t.start)t.leadingComments=n.leadingComments,n.leadingComments=null;else for(i=n.leadingComments.length-2;i>=0;--i)if(n.leadingComments[i].end<=t.start){t.leadingComments=n.leadingComments.splice(0,i+1);break}}else if(this.state.leadingComments.length>0)if(last(this.state.leadingComments).end<=t.start){if(this.state.commentPreviousNode)for(m=0;m<this.state.leadingComments.length;m++)this.state.leadingComments[m].end<this.state.commentPreviousNode.end&&(this.state.leadingComments.splice(m,1),m--);this.state.leadingComments.length>0&&(t.leadingComments=this.state.leadingComments,this.state.leadingComments=[])}else{for(i=0;i<this.state.leadingComments.length&&!(this.state.leadingComments[i].end>t.start);i++);t.leadingComments=this.state.leadingComments.slice(0,i),0===t.leadingComments.length&&(t.leadingComments=null),s=this.state.leadingComments.slice(i),0===s.length&&(s=null)}this.state.commentPreviousNode=t,s&&(s.length&&s[0].start>=t.start&&last(s).end<=t.end?t.innerComments=s:t.trailingComments=s),e.push(t)}};

/***/ },

/***/ "./node_modules/babylon/lib/plugins/flow.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}exports.__esModule=!0,exports["default"]=function(t){t.extend("parseFunctionBody",function(t){return function(e,s){return this.match(_types.types.colon)&&!s&&(e.returnType=this.flowParseTypeAnnotation()),t.call(this,e,s)}}),t.extend("parseStatement",function(t){return function(e,s){if(this.state.strict&&this.match(_types.types.name)&&"interface"===this.state.value){var i=this.startNode();return this.next(),this.flowParseInterface(i)}return t.call(this,e,s)}}),t.extend("parseExpressionStatement",function(t){return function(e,s){if("Identifier"===s.type)if("declare"===s.name){if(this.match(_types.types._class)||this.match(_types.types.name)||this.match(_types.types._function)||this.match(_types.types._var))return this.flowParseDeclare(e)}else if(this.match(_types.types.name)){if("interface"===s.name)return this.flowParseInterface(e);if("type"===s.name)return this.flowParseTypeAlias(e)}return t.call(this,e,s)}}),t.extend("shouldParseExportDeclaration",function(t){return function(){return this.isContextual("type")||this.isContextual("interface")||t.call(this)}}),t.extend("parseConditional",function(t){return function(e,s,i,a,n){if(n&&this.match(_types.types.question)){var r=this.state.clone();try{return t.call(this,e,s,i,a)}catch(p){if(p instanceof SyntaxError)return this.state=r,n.start=p.pos||this.state.start,e;throw p}}return t.call(this,e,s,i,a)}}),t.extend("parseParenItem",function(t){return function(e,s,i){if(e=t.call(this,e,s,i),this.eat(_types.types.question)&&(e.optional=!0),this.match(_types.types.colon)){var a=this.startNodeAt(s,i);return a.expression=e,a.typeAnnotation=this.flowParseTypeAnnotation(),this.finishNode(a,"TypeCastExpression")}return e}}),t.extend("parseExport",function(t){return function(e){return e=t.call(this,e),"ExportNamedDeclaration"===e.type&&(e.exportKind=e.exportKind||"value"),e}}),t.extend("parseExportDeclaration",function(t){return function(e){if(this.isContextual("type")){e.exportKind="type";var s=this.startNode();return this.next(),this.match(_types.types.braceL)?(e.specifiers=this.parseExportSpecifiers(),this.parseExportFrom(e),null):this.flowParseTypeAlias(s)}if(this.isContextual("interface")){e.exportKind="type";var i=this.startNode();return this.next(),this.flowParseInterface(i)}return t.call(this,e)}}),t.extend("parseClassId",function(t){return function(e){t.apply(this,arguments),this.isRelational("<")&&(e.typeParameters=this.flowParseTypeParameterDeclaration())}}),t.extend("isKeyword",function(t){return function(e){return(!this.state.inType||"void"!==e)&&t.call(this,e)}}),t.extend("parsePropertyName",function(t){return function(e){var s=this.state.inType;this.state.inType=!0;var i=t.call(this,e);return this.state.inType=s,i}}),t.extend("readToken",function(t){return function(e){return!this.state.inType||62!==e&&60!==e?t.call(this,e):this.finishOp(_types.types.relational,1)}}),t.extend("jsx_readToken",function(t){return function(){if(!this.state.inType)return t.call(this)}}),t.extend("toAssignable",function(t){return function(e,s,i){return"TypeCastExpression"===e.type?t.call(this,this.typeCastToParameter(e),s,i):t.call(this,e,s,i)}}),t.extend("toAssignableList",function(t){return function(e,s,i){for(var a=0;a<e.length;a++){var n=e[a];n&&"TypeCastExpression"===n.type&&(e[a]=this.typeCastToParameter(n))}return t.call(this,e,s,i)}}),t.extend("toReferencedList",function(){return function(t){for(var e=0;e<t.length;e++){var s=t[e];s&&s._exprListItem&&"TypeCastExpression"===s.type&&this.raise(s.start,"Unexpected type cast")}return t}}),t.extend("parseExprListItem",function(t){return function(e,s){var i=this.startNode(),a=t.call(this,e,s);return this.match(_types.types.colon)?(i._exprListItem=!0,i.expression=a,i.typeAnnotation=this.flowParseTypeAnnotation(),this.finishNode(i,"TypeCastExpression")):a}}),t.extend("checkLVal",function(t){return function(e){if("TypeCastExpression"!==e.type)return t.apply(this,arguments)}}),t.extend("parseClassProperty",function(t){return function(e){return delete e.variancePos,this.match(_types.types.colon)&&(e.typeAnnotation=this.flowParseTypeAnnotation()),t.call(this,e)}}),t.extend("isClassProperty",function(t){return function(){return this.match(_types.types.colon)||t.call(this)}}),t.extend("parseClassMethod",function(){return function(t,e,s,i){e.variance&&this.unexpected(e.variancePos),delete e.variance,delete e.variancePos,this.isRelational("<")&&(e.typeParameters=this.flowParseTypeParameterDeclaration()),this.parseMethod(e,s,i),t.body.push(this.finishNode(e,"ClassMethod"))}}),t.extend("parseClassSuper",function(t){return function(e,s){if(t.call(this,e,s),e.superClass&&this.isRelational("<")&&(e.superTypeParameters=this.flowParseTypeParameterInstantiation()),this.isContextual("implements")){this.next();var i=e["implements"]=[];do{var a=this.startNode();a.id=this.parseIdentifier(),this.isRelational("<")?a.typeParameters=this.flowParseTypeParameterInstantiation():a.typeParameters=null,i.push(this.finishNode(a,"ClassImplements"))}while(this.eat(_types.types.comma))}}}),t.extend("parsePropertyName",function(t){return function(e){var s=this.state.start,i=this.flowParseVariance(),a=t.call(this,e);return e.variance=i,e.variancePos=s,a}}),t.extend("parseObjPropValue",function(t){return function(e){e.variance&&this.unexpected(e.variancePos),delete e.variance,delete e.variancePos;var s=void 0;this.isRelational("<")&&(s=this.flowParseTypeParameterDeclaration(),this.match(_types.types.parenL)||this.unexpected()),t.apply(this,arguments),s&&((e.value||e).typeParameters=s)}}),t.extend("parseAssignableListItemTypes",function(){return function(t){return this.eat(_types.types.question)&&(t.optional=!0),this.match(_types.types.colon)&&(t.typeAnnotation=this.flowParseTypeAnnotation()),this.finishNode(t,t.type),t}}),t.extend("parseMaybeDefault",function(t){return function(){for(var e=arguments.length,s=Array(e),i=0;i<e;i++)s[i]=arguments[i];var a=t.apply(this,s);return"AssignmentPattern"===a.type&&a.typeAnnotation&&a.right.start<a.typeAnnotation.start&&this.raise(a.typeAnnotation.start,"Type annotations must come before default assignments, e.g. instead of `age = 25: number` use `age: number = 25`"),a}}),t.extend("parseImportSpecifiers",function(t){return function(e){e.importKind="value";var s=null;if(this.match(_types.types._typeof)?s="typeof":this.isContextual("type")&&(s="type"),s){var i=this.lookahead();(i.type===_types.types.name&&"from"!==i.value||i.type===_types.types.braceL||i.type===_types.types.star)&&(this.next(),e.importKind=s)}t.call(this,e)}}),t.extend("parseFunctionParams",function(t){return function(e){this.isRelational("<")&&(e.typeParameters=this.flowParseTypeParameterDeclaration()),t.call(this,e)}}),t.extend("parseVarHead",function(t){return function(e){t.call(this,e),this.match(_types.types.colon)&&(e.id.typeAnnotation=this.flowParseTypeAnnotation(),this.finishNode(e.id,e.id.type))}}),t.extend("parseAsyncArrowFromCallExpression",function(t){return function(e,s){return this.match(_types.types.colon)&&(e.returnType=this.flowParseTypeAnnotation()),t.call(this,e,s)}}),t.extend("shouldParseAsyncArrow",function(t){return function(){return this.match(_types.types.colon)||t.call(this)}}),t.extend("parseMaybeAssign",function(t){return function(){for(var e=null,s=arguments.length,i=Array(s),a=0;a<s;a++)i[a]=arguments[a];if(_types.types.jsxTagStart&&this.match(_types.types.jsxTagStart)){var n=this.state.clone();try{return t.apply(this,i)}catch(r){if(!(r instanceof SyntaxError))throw r;this.state=n,e=r}}if(this.state.context.push(_context.types.parenExpression),null!=e||this.isRelational("<")){var p=void 0,o=void 0;try{o=this.flowParseTypeParameterDeclaration(),p=t.apply(this,i),p.typeParameters=o,p.start=o.start,p.loc.start=o.loc.start}catch(r){throw e||r}if("ArrowFunctionExpression"===p.type)return p;if(null!=e)throw e;this.raise(o.start,"Expected an arrow function after this type parameter declaration")}return this.state.context.pop(),t.apply(this,i)}}),t.extend("parseArrow",function(t){return function(e){if(this.match(_types.types.colon)){var s=this.state.clone();try{var i=this.flowParseTypeAnnotation();this.canInsertSemicolon()&&this.unexpected(),this.match(_types.types.arrow)||this.unexpected(),e.returnType=i}catch(a){if(!(a instanceof SyntaxError))throw a;this.state=s}}return t.call(this,e)}}),t.extend("shouldParseArrow",function(t){return function(){return this.match(_types.types.colon)||t.call(this)}}),t.extend("isClassMutatorStarter",function(t){return function(){return!!this.isRelational("<")||t.call(this)}})};var _types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),_context=__webpack_require__("./node_modules/babylon/lib/tokenizer/context.js"),_parser=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_parser2=_interopRequireDefault(_parser),pp=_parser2["default"].prototype;pp.flowParseTypeInitialiser=function(t,e){var s=this.state.inType;this.state.inType=!0,this.expect(t||_types.types.colon),e&&(this.match(_types.types.bitwiseAND)||this.match(_types.types.bitwiseOR))&&this.next();var i=this.flowParseType();return this.state.inType=s,i},pp.flowParseDeclareClass=function(t){return this.next(),this.flowParseInterfaceish(t,!0),this.finishNode(t,"DeclareClass")},pp.flowParseDeclareFunction=function(t){this.next();var e=t.id=this.parseIdentifier(),s=this.startNode(),i=this.startNode();this.isRelational("<")?s.typeParameters=this.flowParseTypeParameterDeclaration():s.typeParameters=null,this.expect(_types.types.parenL);var a=this.flowParseFunctionTypeParams();return s.params=a.params,s.rest=a.rest,this.expect(_types.types.parenR),s.returnType=this.flowParseTypeInitialiser(),i.typeAnnotation=this.finishNode(s,"FunctionTypeAnnotation"),e.typeAnnotation=this.finishNode(i,"TypeAnnotation"),this.finishNode(e,e.type),this.semicolon(),this.finishNode(t,"DeclareFunction")},pp.flowParseDeclare=function(t){return this.match(_types.types._class)?this.flowParseDeclareClass(t):this.match(_types.types._function)?this.flowParseDeclareFunction(t):this.match(_types.types._var)?this.flowParseDeclareVariable(t):this.isContextual("module")?this.lookahead().type===_types.types.dot?this.flowParseDeclareModuleExports(t):this.flowParseDeclareModule(t):this.isContextual("type")?this.flowParseDeclareTypeAlias(t):this.isContextual("interface")?this.flowParseDeclareInterface(t):void this.unexpected()},pp.flowParseDeclareVariable=function(t){return this.next(),t.id=this.flowParseTypeAnnotatableIdentifier(),this.semicolon(),this.finishNode(t,"DeclareVariable")},pp.flowParseDeclareModule=function(t){this.next(),this.match(_types.types.string)?t.id=this.parseExprAtom():t.id=this.parseIdentifier();var e=t.body=this.startNode(),s=e.body=[];for(this.expect(_types.types.braceL);!this.match(_types.types.braceR);){var i=this.startNode();this.expectContextual("declare","Unexpected token. Only declares are allowed inside declare module"),s.push(this.flowParseDeclare(i))}return this.expect(_types.types.braceR),this.finishNode(e,"BlockStatement"),this.finishNode(t,"DeclareModule")},pp.flowParseDeclareModuleExports=function(t){return this.expectContextual("module"),this.expect(_types.types.dot),this.expectContextual("exports"),t.typeAnnotation=this.flowParseTypeAnnotation(),this.finishNode(t,"DeclareModuleExports")},pp.flowParseDeclareTypeAlias=function(t){return this.next(),this.flowParseTypeAlias(t),this.finishNode(t,"DeclareTypeAlias")},pp.flowParseDeclareInterface=function(t){return this.next(),this.flowParseInterfaceish(t),this.finishNode(t,"DeclareInterface")},pp.flowParseInterfaceish=function(t,e){if(t.id=this.parseIdentifier(),this.isRelational("<")?t.typeParameters=this.flowParseTypeParameterDeclaration():t.typeParameters=null,t["extends"]=[],t.mixins=[],this.eat(_types.types._extends))do t["extends"].push(this.flowParseInterfaceExtends());while(this.eat(_types.types.comma));if(this.isContextual("mixins")){this.next();do t.mixins.push(this.flowParseInterfaceExtends());while(this.eat(_types.types.comma))}t.body=this.flowParseObjectType(e)},pp.flowParseInterfaceExtends=function(){var t=this.startNode();return t.id=this.flowParseQualifiedTypeIdentifier(),this.isRelational("<")?t.typeParameters=this.flowParseTypeParameterInstantiation():t.typeParameters=null,this.finishNode(t,"InterfaceExtends")},pp.flowParseInterface=function(t){return this.flowParseInterfaceish(t,!1),this.finishNode(t,"InterfaceDeclaration")},pp.flowParseTypeAlias=function(t){return t.id=this.parseIdentifier(),this.isRelational("<")?t.typeParameters=this.flowParseTypeParameterDeclaration():t.typeParameters=null,t.right=this.flowParseTypeInitialiser(_types.types.eq,!0),this.semicolon(),this.finishNode(t,"TypeAlias")},pp.flowParseTypeParameter=function(){var t=this.startNode(),e=this.flowParseVariance(),s=this.flowParseTypeAnnotatableIdentifier();return t.name=s.name,t.variance=e,t.bound=s.typeAnnotation,this.match(_types.types.eq)&&(this.eat(_types.types.eq),t["default"]=this.flowParseType()),this.finishNode(t,"TypeParameter")},pp.flowParseTypeParameterDeclaration=function(){var t=this.state.inType,e=this.startNode();e.params=[],this.state.inType=!0,this.isRelational("<")||this.match(_types.types.jsxTagStart)?this.next():this.unexpected();do e.params.push(this.flowParseTypeParameter()),this.isRelational(">")||this.expect(_types.types.comma);while(!this.isRelational(">"));return this.expectRelational(">"),this.state.inType=t,this.finishNode(e,"TypeParameterDeclaration")},pp.flowParseTypeParameterInstantiation=function(){var t=this.startNode(),e=this.state.inType;for(t.params=[],this.state.inType=!0,this.expectRelational("<");!this.isRelational(">");)t.params.push(this.flowParseType()),this.isRelational(">")||this.expect(_types.types.comma);return this.expectRelational(">"),this.state.inType=e,this.finishNode(t,"TypeParameterInstantiation")},pp.flowParseObjectPropertyKey=function(){return this.match(_types.types.num)||this.match(_types.types.string)?this.parseExprAtom():this.parseIdentifier(!0)},pp.flowParseObjectTypeIndexer=function(t,e,s){return t["static"]=e,this.expect(_types.types.bracketL),t.id=this.flowParseObjectPropertyKey(),t.key=this.flowParseTypeInitialiser(),this.expect(_types.types.bracketR),t.value=this.flowParseTypeInitialiser(),t.variance=s,this.flowObjectTypeSemicolon(),this.finishNode(t,"ObjectTypeIndexer")},pp.flowParseObjectTypeMethodish=function(t){for(t.params=[],t.rest=null,t.typeParameters=null,this.isRelational("<")&&(t.typeParameters=this.flowParseTypeParameterDeclaration()),this.expect(_types.types.parenL);this.match(_types.types.name);)t.params.push(this.flowParseFunctionTypeParam()),this.match(_types.types.parenR)||this.expect(_types.types.comma);return this.eat(_types.types.ellipsis)&&(t.rest=this.flowParseFunctionTypeParam()),this.expect(_types.types.parenR),t.returnType=this.flowParseTypeInitialiser(),this.finishNode(t,"FunctionTypeAnnotation")},pp.flowParseObjectTypeMethod=function(t,e,s,i){var a=this.startNodeAt(t,e);return a.value=this.flowParseObjectTypeMethodish(this.startNodeAt(t,e)),a["static"]=s,a.key=i,a.optional=!1,this.flowObjectTypeSemicolon(),this.finishNode(a,"ObjectTypeProperty")},pp.flowParseObjectTypeCallProperty=function(t,e){var s=this.startNode();return t["static"]=e,t.value=this.flowParseObjectTypeMethodish(s),this.flowObjectTypeSemicolon(),this.finishNode(t,"ObjectTypeCallProperty")},pp.flowParseObjectType=function(t,e){var s=this.state.inType;this.state.inType=!0;var i=this.startNode(),a=void 0,n=void 0,r=!1;i.callProperties=[],i.properties=[],i.indexers=[];var p=void 0,o=void 0;for(e&&this.match(_types.types.braceBarL)?(this.expect(_types.types.braceBarL),p=_types.types.braceBarR,o=!0):(this.expect(_types.types.braceL),p=_types.types.braceR,o=!1),i.exact=o;!this.match(p);){var h=!1,y=this.state.start,l=this.state.startLoc;a=this.startNode(),t&&this.isContextual("static")&&this.lookahead().type!==_types.types.colon&&(this.next(),r=!0);var c=this.state.start,u=this.flowParseVariance();this.match(_types.types.bracketL)?i.indexers.push(this.flowParseObjectTypeIndexer(a,r,u)):this.match(_types.types.parenL)||this.isRelational("<")?(u&&this.unexpected(c),i.callProperties.push(this.flowParseObjectTypeCallProperty(a,t))):(n=this.flowParseObjectPropertyKey(),this.isRelational("<")||this.match(_types.types.parenL)?(u&&this.unexpected(c),i.properties.push(this.flowParseObjectTypeMethod(y,l,r,n))):(this.eat(_types.types.question)&&(h=!0),a.key=n,a.value=this.flowParseTypeInitialiser(),a.optional=h,a["static"]=r,a.variance=u,this.flowObjectTypeSemicolon(),i.properties.push(this.finishNode(a,"ObjectTypeProperty")))),r=!1}this.expect(p);var f=this.finishNode(i,"ObjectTypeAnnotation");return this.state.inType=s,f},pp.flowObjectTypeSemicolon=function(){this.eat(_types.types.semi)||this.eat(_types.types.comma)||this.match(_types.types.braceR)||this.match(_types.types.braceBarR)||this.unexpected()},pp.flowParseQualifiedTypeIdentifier=function(t,e,s){t=t||this.state.start,e=e||this.state.startLoc;for(var i=s||this.parseIdentifier();this.eat(_types.types.dot);){var a=this.startNodeAt(t,e);a.qualification=i,a.id=this.parseIdentifier(),i=this.finishNode(a,"QualifiedTypeIdentifier")}return i},pp.flowParseGenericType=function(t,e,s){var i=this.startNodeAt(t,e);return i.typeParameters=null,i.id=this.flowParseQualifiedTypeIdentifier(t,e,s),this.isRelational("<")&&(i.typeParameters=this.flowParseTypeParameterInstantiation()),this.finishNode(i,"GenericTypeAnnotation")},pp.flowParseTypeofType=function(){var t=this.startNode();return this.expect(_types.types._typeof),t.argument=this.flowParsePrimaryType(),this.finishNode(t,"TypeofTypeAnnotation")},pp.flowParseTupleType=function(){var t=this.startNode();for(t.types=[],this.expect(_types.types.bracketL);this.state.pos<this.input.length&&!this.match(_types.types.bracketR)&&(t.types.push(this.flowParseType()),!this.match(_types.types.bracketR));)this.expect(_types.types.comma);return this.expect(_types.types.bracketR),this.finishNode(t,"TupleTypeAnnotation")},pp.flowParseFunctionTypeParam=function(){var t=!1,e=this.startNode();return e.name=this.parseIdentifier(),this.eat(_types.types.question)&&(t=!0),e.optional=t,e.typeAnnotation=this.flowParseTypeInitialiser(),this.finishNode(e,"FunctionTypeParam")},pp.flowParseFunctionTypeParams=function(){for(var t={params:[],rest:null};this.match(_types.types.name);)t.params.push(this.flowParseFunctionTypeParam()),this.match(_types.types.parenR)||this.expect(_types.types.comma);return this.eat(_types.types.ellipsis)&&(t.rest=this.flowParseFunctionTypeParam()),t},pp.flowIdentToTypeAnnotation=function(t,e,s,i){switch(i.name){case"any":return this.finishNode(s,"AnyTypeAnnotation");case"void":return this.finishNode(s,"VoidTypeAnnotation");case"bool":case"boolean":return this.finishNode(s,"BooleanTypeAnnotation");case"mixed":return this.finishNode(s,"MixedTypeAnnotation");case"empty":return this.finishNode(s,"EmptyTypeAnnotation");case"number":return this.finishNode(s,"NumberTypeAnnotation");case"string":return this.finishNode(s,"StringTypeAnnotation");default:return this.flowParseGenericType(t,e,i)}},pp.flowParsePrimaryType=function(){var t=this.state.start,e=this.state.startLoc,s=this.startNode(),i=void 0,a=void 0,n=!1;switch(this.state.type){case _types.types.name:return this.flowIdentToTypeAnnotation(t,e,s,this.parseIdentifier());case _types.types.braceL:return this.flowParseObjectType(!1,!1);case _types.types.braceBarL:return this.flowParseObjectType(!1,!0);case _types.types.bracketL:return this.flowParseTupleType();case _types.types.relational:if("<"===this.state.value)return s.typeParameters=this.flowParseTypeParameterDeclaration(),this.expect(_types.types.parenL),i=this.flowParseFunctionTypeParams(),s.params=i.params,s.rest=i.rest,this.expect(_types.types.parenR),this.expect(_types.types.arrow),s.returnType=this.flowParseType(),this.finishNode(s,"FunctionTypeAnnotation");break;case _types.types.parenL:if(this.next(),!this.match(_types.types.parenR)&&!this.match(_types.types.ellipsis))if(this.match(_types.types.name)){var r=this.lookahead().type;n=r!==_types.types.question&&r!==_types.types.colon}else n=!0;return n?(a=this.flowParseType(),this.expect(_types.types.parenR),a):(i=this.flowParseFunctionTypeParams(),s.params=i.params,s.rest=i.rest,this.expect(_types.types.parenR),this.expect(_types.types.arrow),s.returnType=this.flowParseType(),s.typeParameters=null,this.finishNode(s,"FunctionTypeAnnotation"));case _types.types.string:return s.value=this.state.value,this.addExtra(s,"rawValue",s.value),this.addExtra(s,"raw",this.input.slice(this.state.start,this.state.end)),this.next(),this.finishNode(s,"StringLiteralTypeAnnotation");case _types.types._true:case _types.types._false:return s.value=this.match(_types.types._true),this.next(),this.finishNode(s,"BooleanLiteralTypeAnnotation");case _types.types.plusMin:if("-"===this.state.value)return this.next(),this.match(_types.types.num)||this.unexpected(),s.value=-this.state.value,this.addExtra(s,"rawValue",s.value),this.addExtra(s,"raw",this.input.slice(this.state.start,this.state.end)),this.next(),this.finishNode(s,"NumericLiteralTypeAnnotation");case _types.types.num:return s.value=this.state.value,this.addExtra(s,"rawValue",s.value),this.addExtra(s,"raw",this.input.slice(this.state.start,this.state.end)),this.next(),this.finishNode(s,"NumericLiteralTypeAnnotation");case _types.types._null:return s.value=this.match(_types.types._null),this.next(),this.finishNode(s,"NullLiteralTypeAnnotation");case _types.types._this:return s.value=this.match(_types.types._this),this.next(),this.finishNode(s,"ThisTypeAnnotation");case _types.types.star:return this.next(),this.finishNode(s,"ExistentialTypeParam");default:if("typeof"===this.state.type.keyword)return this.flowParseTypeofType()}this.unexpected()},pp.flowParsePostfixType=function(){var t=this.startNode(),e=t.elementType=this.flowParsePrimaryType();return this.match(_types.types.bracketL)?(this.expect(_types.types.bracketL),this.expect(_types.types.bracketR),this.finishNode(t,"ArrayTypeAnnotation")):e},pp.flowParsePrefixType=function(){var t=this.startNode();return this.eat(_types.types.question)?(t.typeAnnotation=this.flowParsePrefixType(),this.finishNode(t,"NullableTypeAnnotation")):this.flowParsePostfixType()},pp.flowParseIntersectionType=function(){var t=this.startNode(),e=this.flowParsePrefixType();for(t.types=[e];this.eat(_types.types.bitwiseAND);)t.types.push(this.flowParsePrefixType());return 1===t.types.length?e:this.finishNode(t,"IntersectionTypeAnnotation")},pp.flowParseUnionType=function(){var t=this.startNode(),e=this.flowParseIntersectionType();for(t.types=[e];this.eat(_types.types.bitwiseOR);)t.types.push(this.flowParseIntersectionType());return 1===t.types.length?e:this.finishNode(t,"UnionTypeAnnotation")},pp.flowParseType=function(){var t=this.state.inType;this.state.inType=!0;var e=this.flowParseUnionType();return this.state.inType=t,e},pp.flowParseTypeAnnotation=function(){var t=this.startNode();return t.typeAnnotation=this.flowParseTypeInitialiser(),this.finishNode(t,"TypeAnnotation")},pp.flowParseTypeAnnotatableIdentifier=function(){var t=this.parseIdentifier();return this.match(_types.types.colon)&&(t.typeAnnotation=this.flowParseTypeAnnotation(),this.finishNode(t,t.type)),t},pp.typeCastToParameter=function(t){return t.expression.typeAnnotation=t.typeAnnotation,this.finishNodeAt(t.expression,t.expression.type,t.typeAnnotation.end,t.typeAnnotation.loc.end)},pp.flowParseVariance=function(){var t=null;return this.match(_types.types.plusMin)&&("+"===this.state.value?t="plus":"-"===this.state.value&&(t="minus"),this.next()),t};

/***/ },

/***/ "./node_modules/babylon/lib/plugins/jsx/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function getQualifiedJSXName(t){return"JSXIdentifier"===t.type?t.name:"JSXNamespacedName"===t.type?t.namespace.name+":"+t.name.name:"JSXMemberExpression"===t.type?getQualifiedJSXName(t.object)+"."+getQualifiedJSXName(t.property):void 0}exports.__esModule=!0,exports["default"]=function(t){t.extend("parseExprAtom",function(t){return function(e){if(this.match(_types.types.jsxText)){var s=this.parseLiteral(this.state.value,"JSXText");return s.extra=null,s}return this.match(_types.types.jsxTagStart)?this.jsxParseElement():t.call(this,e)}}),t.extend("readToken",function(t){return function(e){var s=this.curContext();if(s===_context.types.j_expr)return this.jsxReadToken();if(s===_context.types.j_oTag||s===_context.types.j_cTag){if((0,_identifier.isIdentifierStart)(e))return this.jsxReadWord();if(62===e)return++this.state.pos,this.finishToken(_types.types.jsxTagEnd);if((34===e||39===e)&&s===_context.types.j_oTag)return this.jsxReadString(e)}return 60===e&&this.state.exprAllowed?(++this.state.pos,this.finishToken(_types.types.jsxTagStart)):t.call(this,e)}}),t.extend("updateContext",function(t){return function(e){if(this.match(_types.types.braceL)){var s=this.curContext();s===_context.types.j_oTag?this.state.context.push(_context.types.braceExpression):s===_context.types.j_expr?this.state.context.push(_context.types.templateQuasi):t.call(this,e),this.state.exprAllowed=!0}else{if(!this.match(_types.types.slash)||e!==_types.types.jsxTagStart)return t.call(this,e);this.state.context.length-=2,this.state.context.push(_context.types.j_cTag),this.state.exprAllowed=!1}}})};var _xhtml=__webpack_require__("./node_modules/babylon/lib/plugins/jsx/xhtml.js"),_xhtml2=_interopRequireDefault(_xhtml),_types=__webpack_require__("./node_modules/babylon/lib/tokenizer/types.js"),_context=__webpack_require__("./node_modules/babylon/lib/tokenizer/context.js"),_parser=__webpack_require__("./node_modules/babylon/lib/parser/index.js"),_parser2=_interopRequireDefault(_parser),_identifier=__webpack_require__("./node_modules/babylon/lib/util/identifier.js"),_whitespace=__webpack_require__("./node_modules/babylon/lib/util/whitespace.js"),HEX_NUMBER=/^[\da-fA-F]+$/,DECIMAL_NUMBER=/^\d+$/;_context.types.j_oTag=new _context.TokContext("<tag",(!1)),_context.types.j_cTag=new _context.TokContext("</tag",(!1)),_context.types.j_expr=new _context.TokContext("<tag>...</tag>",(!0),(!0)),_types.types.jsxName=new _types.TokenType("jsxName"),_types.types.jsxText=new _types.TokenType("jsxText",{beforeExpr:!0}),_types.types.jsxTagStart=new _types.TokenType("jsxTagStart",{startsExpr:!0}),_types.types.jsxTagEnd=new _types.TokenType("jsxTagEnd"),_types.types.jsxTagStart.updateContext=function(){this.state.context.push(_context.types.j_expr),this.state.context.push(_context.types.j_oTag),this.state.exprAllowed=!1},_types.types.jsxTagEnd.updateContext=function(t){var e=this.state.context.pop();e===_context.types.j_oTag&&t===_types.types.slash||e===_context.types.j_cTag?(this.state.context.pop(),this.state.exprAllowed=this.curContext()===_context.types.j_expr):this.state.exprAllowed=!0};var pp=_parser2["default"].prototype;pp.jsxReadToken=function(){for(var t="",e=this.state.pos;;){this.state.pos>=this.input.length&&this.raise(this.state.start,"Unterminated JSX contents");var s=this.input.charCodeAt(this.state.pos);switch(s){case 60:case 123:return this.state.pos===this.state.start?60===s&&this.state.exprAllowed?(++this.state.pos,this.finishToken(_types.types.jsxTagStart)):this.getTokenFromCode(s):(t+=this.input.slice(e,this.state.pos),this.finishToken(_types.types.jsxText,t));case 38:t+=this.input.slice(e,this.state.pos),t+=this.jsxReadEntity(),e=this.state.pos;break;default:(0,_whitespace.isNewLine)(s)?(t+=this.input.slice(e,this.state.pos),t+=this.jsxReadNewLine(!0),e=this.state.pos):++this.state.pos}}},pp.jsxReadNewLine=function(t){var e=this.input.charCodeAt(this.state.pos),s=void 0;return++this.state.pos,13===e&&10===this.input.charCodeAt(this.state.pos)?(++this.state.pos,s=t?"\n":"\r\n"):s=String.fromCharCode(e),++this.state.curLine,this.state.lineStart=this.state.pos,s},pp.jsxReadString=function(t){for(var e="",s=++this.state.pos;;){this.state.pos>=this.input.length&&this.raise(this.state.start,"Unterminated string constant");var i=this.input.charCodeAt(this.state.pos);if(i===t)break;38===i?(e+=this.input.slice(s,this.state.pos),e+=this.jsxReadEntity(),s=this.state.pos):(0,_whitespace.isNewLine)(i)?(e+=this.input.slice(s,this.state.pos),e+=this.jsxReadNewLine(!1),s=this.state.pos):++this.state.pos}return e+=this.input.slice(s,this.state.pos++),this.finishToken(_types.types.string,e)},pp.jsxReadEntity=function(){for(var t="",e=0,s=void 0,i=this.input[this.state.pos],a=++this.state.pos;this.state.pos<this.input.length&&e++<10;){if(i=this.input[this.state.pos++],";"===i){"#"===t[0]?"x"===t[1]?(t=t.substr(2),HEX_NUMBER.test(t)&&(s=String.fromCharCode(parseInt(t,16)))):(t=t.substr(1),DECIMAL_NUMBER.test(t)&&(s=String.fromCharCode(parseInt(t,10)))):s=_xhtml2["default"][t];break}t+=i}return s?s:(this.state.pos=a,"&")},pp.jsxReadWord=function(){var t=void 0,e=this.state.pos;do t=this.input.charCodeAt(++this.state.pos);while((0,_identifier.isIdentifierChar)(t)||45===t);return this.finishToken(_types.types.jsxName,this.input.slice(e,this.state.pos))},pp.jsxParseIdentifier=function(){var t=this.startNode();return this.match(_types.types.jsxName)?t.name=this.state.value:this.state.type.keyword?t.name=this.state.type.keyword:this.unexpected(),this.next(),this.finishNode(t,"JSXIdentifier")},pp.jsxParseNamespacedName=function(){var t=this.state.start,e=this.state.startLoc,s=this.jsxParseIdentifier();if(!this.eat(_types.types.colon))return s;var i=this.startNodeAt(t,e);return i.namespace=s,i.name=this.jsxParseIdentifier(),this.finishNode(i,"JSXNamespacedName")},pp.jsxParseElementName=function(){for(var t=this.state.start,e=this.state.startLoc,s=this.jsxParseNamespacedName();this.eat(_types.types.dot);){var i=this.startNodeAt(t,e);i.object=s,i.property=this.jsxParseIdentifier(),s=this.finishNode(i,"JSXMemberExpression")}return s},pp.jsxParseAttributeValue=function(){var t=void 0;switch(this.state.type){case _types.types.braceL:if(t=this.jsxParseExpressionContainer(),"JSXEmptyExpression"!==t.expression.type)return t;this.raise(t.start,"JSX attributes must only be assigned a non-empty expression");case _types.types.jsxTagStart:case _types.types.string:return t=this.parseExprAtom(),t.extra=null,t;default:this.raise(this.state.start,"JSX value should be either an expression or a quoted JSX text")}},pp.jsxParseEmptyExpression=function(){var t=this.startNodeAt(this.lastTokEnd,this.lastTokEndLoc);return this.finishNodeAt(t,"JSXEmptyExpression",this.start,this.startLoc)},pp.jsxParseSpreadChild=function(){var t=this.startNode();return this.expect(_types.types.braceL),this.expect(_types.types.ellipsis),t.expression=this.parseExpression(),this.expect(_types.types.braceR),this.finishNode(t,"JSXSpreadChild")},pp.jsxParseExpressionContainer=function(){var t=this.startNode();return this.next(),this.match(_types.types.braceR)?t.expression=this.jsxParseEmptyExpression():t.expression=this.parseExpression(),this.expect(_types.types.braceR),this.finishNode(t,"JSXExpressionContainer")},pp.jsxParseAttribute=function(){var t=this.startNode();return this.eat(_types.types.braceL)?(this.expect(_types.types.ellipsis),t.argument=this.parseMaybeAssign(),this.expect(_types.types.braceR),this.finishNode(t,"JSXSpreadAttribute")):(t.name=this.jsxParseNamespacedName(),t.value=this.eat(_types.types.eq)?this.jsxParseAttributeValue():null,this.finishNode(t,"JSXAttribute"))},pp.jsxParseOpeningElementAt=function(t,e){var s=this.startNodeAt(t,e);for(s.attributes=[],s.name=this.jsxParseElementName();!this.match(_types.types.slash)&&!this.match(_types.types.jsxTagEnd);)s.attributes.push(this.jsxParseAttribute());return s.selfClosing=this.eat(_types.types.slash),this.expect(_types.types.jsxTagEnd),this.finishNode(s,"JSXOpeningElement")},pp.jsxParseClosingElementAt=function(t,e){var s=this.startNodeAt(t,e);return s.name=this.jsxParseElementName(),this.expect(_types.types.jsxTagEnd),this.finishNode(s,"JSXClosingElement")},pp.jsxParseElementAt=function(t,e){var s=this.startNodeAt(t,e),i=[],a=this.jsxParseOpeningElementAt(t,e),r=null;if(!a.selfClosing){t:for(;;)switch(this.state.type){case _types.types.jsxTagStart:if(t=this.state.start,e=this.state.startLoc,this.next(),this.eat(_types.types.slash)){r=this.jsxParseClosingElementAt(t,e);break t}i.push(this.jsxParseElementAt(t,e));break;case _types.types.jsxText:i.push(this.parseExprAtom());break;case _types.types.braceL:this.lookahead().type===_types.types.ellipsis?i.push(this.jsxParseSpreadChild()):i.push(this.jsxParseExpressionContainer());break;default:this.unexpected()}getQualifiedJSXName(r.name)!==getQualifiedJSXName(a.name)&&this.raise(r.start,"Expected corresponding JSX closing tag for <"+getQualifiedJSXName(a.name)+">")}return s.openingElement=a,s.closingElement=r,s.children=i,this.match(_types.types.relational)&&"<"===this.state.value&&this.raise(this.state.start,"Adjacent JSX elements must be wrapped in an enclosing tag"),this.finishNode(s,"JSXElement")},pp.jsxParseElement=function(){var t=this.state.start,e=this.state.startLoc;return this.next(),this.jsxParseElementAt(t,e)};

/***/ },

/***/ "./node_modules/babylon/lib/plugins/jsx/xhtml.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]={quot:'"',amp:"&",apos:"'",lt:"<",gt:">",nbsp:" ",iexcl:"¡",cent:"¢",pound:"£",curren:"¤",yen:"¥",brvbar:"¦",sect:"§",uml:"¨",copy:"©",ordf:"ª",laquo:"«",not:"¬",shy:"­",reg:"®",macr:"¯",deg:"°",plusmn:"±",sup2:"²",sup3:"³",acute:"´",micro:"µ",para:"¶",middot:"·",cedil:"¸",sup1:"¹",ordm:"º",raquo:"»",frac14:"¼",frac12:"½",frac34:"¾",iquest:"¿",Agrave:"À",Aacute:"Á",Acirc:"Â",Atilde:"Ã",Auml:"Ä",Aring:"Å",AElig:"Æ",Ccedil:"Ç",Egrave:"È",Eacute:"É",Ecirc:"Ê",Euml:"Ë",Igrave:"Ì",Iacute:"Í",Icirc:"Î",Iuml:"Ï",ETH:"Ð",Ntilde:"Ñ",Ograve:"Ò",Oacute:"Ó",Ocirc:"Ô",Otilde:"Õ",Ouml:"Ö",times:"×",Oslash:"Ø",Ugrave:"Ù",Uacute:"Ú",Ucirc:"Û",Uuml:"Ü",Yacute:"Ý",THORN:"Þ",szlig:"ß",agrave:"à",aacute:"á",acirc:"â",atilde:"ã",auml:"ä",aring:"å",aelig:"æ",ccedil:"ç",egrave:"è",eacute:"é",ecirc:"ê",euml:"ë",igrave:"ì",iacute:"í",icirc:"î",iuml:"ï",eth:"ð",ntilde:"ñ",ograve:"ò",oacute:"ó",ocirc:"ô",otilde:"õ",ouml:"ö",divide:"÷",oslash:"ø",ugrave:"ù",uacute:"ú",ucirc:"û",uuml:"ü",yacute:"ý",thorn:"þ",yuml:"ÿ",OElig:"Œ",oelig:"œ",Scaron:"Š",scaron:"š",Yuml:"Ÿ",fnof:"ƒ",circ:"ˆ",tilde:"˜",Alpha:"Α",Beta:"Β",Gamma:"Γ",Delta:"Δ",Epsilon:"Ε",Zeta:"Ζ",Eta:"Η",Theta:"Θ",Iota:"Ι",Kappa:"Κ",Lambda:"Λ",Mu:"Μ",Nu:"Ν",Xi:"Ξ",Omicron:"Ο",Pi:"Π",Rho:"Ρ",Sigma:"Σ",Tau:"Τ",Upsilon:"Υ",Phi:"Φ",Chi:"Χ",Psi:"Ψ",Omega:"Ω",alpha:"α",beta:"β",gamma:"γ",delta:"δ",epsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",iota:"ι",kappa:"κ",lambda:"λ",mu:"μ",nu:"ν",xi:"ξ",omicron:"ο",pi:"π",rho:"ρ",sigmaf:"ς",sigma:"σ",tau:"τ",upsilon:"υ",phi:"φ",chi:"χ",psi:"ψ",omega:"ω",thetasym:"ϑ",upsih:"ϒ",piv:"ϖ",ensp:" ",emsp:" ",thinsp:" ",zwnj:"‌",zwj:"‍",lrm:"‎",rlm:"‏",ndash:"–",mdash:"—",lsquo:"‘",rsquo:"’",sbquo:"‚",ldquo:"“",rdquo:"”",bdquo:"„",dagger:"†",Dagger:"‡",bull:"•",hellip:"…",permil:"‰",prime:"′",Prime:"″",lsaquo:"‹",rsaquo:"›",oline:"‾",frasl:"⁄",euro:"€",image:"ℑ",weierp:"℘",real:"ℜ",trade:"™",alefsym:"ℵ",larr:"←",uarr:"↑",rarr:"→",darr:"↓",harr:"↔",crarr:"↵",lArr:"⇐",uArr:"⇑",rArr:"⇒",dArr:"⇓",hArr:"⇔",forall:"∀",part:"∂",exist:"∃",empty:"∅",nabla:"∇",isin:"∈",notin:"∉",ni:"∋",prod:"∏",sum:"∑",minus:"−",lowast:"∗",radic:"√",prop:"∝",infin:"∞",ang:"∠",and:"∧",or:"∨",cap:"∩",cup:"∪","int":"∫",there4:"∴",sim:"∼",cong:"≅",asymp:"≈",ne:"≠",equiv:"≡",le:"≤",ge:"≥",sub:"⊂",sup:"⊃",nsub:"⊄",sube:"⊆",supe:"⊇",oplus:"⊕",otimes:"⊗",perp:"⊥",sdot:"⋅",lceil:"⌈",rceil:"⌉",lfloor:"⌊",rfloor:"⌋",lang:"〈",rang:"〉",loz:"◊",spades:"♠",clubs:"♣",hearts:"♥",diams:"♦"};

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/evaluation.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function evaluateTruthy(){var e=this.evaluate();if(e.confident)return!!e.value}function evaluate(){function e(e){n&&(a=e,n=!1)}function r(r){var a=r.node;if(i.has(a)){var u=i.get(a);return u.resolved?u.value:void e(r)}var s={resolved:!1};i.set(a,s);var o=t(r);return n&&(s.resolved=!0,s.value=o),o}function t(t){if(n){var a=t.node;if(t.isSequenceExpression()){var i=t.get("expressions");return r(i[i.length-1])}if(t.isStringLiteral()||t.isNumericLiteral()||t.isBooleanLiteral())return a.value;if(t.isNullLiteral())return null;if(t.isTemplateLiteral()){for(var u="",s=0,o=t.get("expressions"),f=a.quasis,l=Array.isArray(f),v=0,f=l?f:(0,_getIterator3["default"])(f);;){var d;if(l){if(v>=f.length)break;d=f[v++]}else{if(v=f.next(),v.done)break;d=v.value}var p=d;if(!n)break;u+=p.value.cooked;var c=o[s++];c&&(u+=String(r(c)))}if(!n)return;return u}if(t.isConditionalExpression()){var g=r(t.get("test"));if(!n)return;return r(g?t.get("consequent"):t.get("alternate"))}if(t.isExpressionWrapper())return r(t.get("expression"));if(t.isMemberExpression()&&!t.parentPath.isCallExpression({callee:a})){var m=t.get("property"),_=t.get("object");if(_.isLiteral()&&m.isIdentifier()){var y=_.node.value,x="undefined"==typeof y?"undefined":(0,_typeof3["default"])(y);if("number"===x||"string"===x)return y[m.node.name]}}if(t.isReferencedIdentifier()){var h=t.scope.getBinding(a.name);if(h&&h.constantViolations.length>0)return e(h.path);if(h&&h.hasValue)return h.value;if("undefined"===a.name)return;if("Infinity"===a.name)return 1/0;if("NaN"===a.name)return NaN;var b=t.resolve();return b===t?e(t):r(b)}if(t.isUnaryExpression({prefix:!0})){if("void"===a.operator)return;var E=t.get("argument");if("typeof"===a.operator&&(E.isFunction()||E.isClass()))return"function";var I=r(E);if(!n)return;switch(a.operator){case"!":return!I;case"+":return+I;case"-":return-I;case"~":return~I;case"typeof":return"undefined"==typeof I?"undefined":(0,_typeof3["default"])(I)}}if(t.isArrayExpression()){for(var L=[],A=t.get("elements"),D=A,q=Array.isArray(D),N=0,D=q?D:(0,_getIterator3["default"])(D);;){var S;if(q){if(N>=D.length)break;S=D[N++]}else{if(N=D.next(),N.done)break;S=N.value}var M=S;if(M=M.evaluate(),!M.confident)return e(M);L.push(M.value)}return L}if(t.isObjectExpression(),t.isLogicalExpression()){var C=n,V=r(t.get("left")),k=n;n=C;var O=r(t.get("right")),T=n;switch(n=k&&T,a.operator){case"||":if(V&&k)return n=!0,V;if(!n)return;return V||O;case"&&":if((!V&&k||!O&&T)&&(n=!0),!n)return;return V&&O}}if(t.isBinaryExpression()){var j=r(t.get("left"));if(!n)return;var w=r(t.get("right"));if(!n)return;switch(a.operator){case"-":return j-w;case"+":return j+w;case"/":return j/w;case"*":return j*w;case"%":return j%w;case"**":return Math.pow(j,w);case"<":return j<w;case">":return j>w;case"<=":return j<=w;case">=":return j>=w;case"==":return j==w;case"!=":return j!=w;case"===":return j===w;case"!==":return j!==w;case"|":return j|w;case"&":return j&w;case"^":return j^w;case"<<":return j<<w;case">>":return j>>w;case">>>":return j>>>w}}if(t.isCallExpression()){var R=t.get("callee"),B=void 0,H=void 0;if(R.isIdentifier()&&!t.scope.getBinding(R.node.name,!0)&&VALID_CALLEES.indexOf(R.node.name)>=0&&(H=global[a.callee.name]),R.isMemberExpression()){var F=R.get("object"),P=R.get("property");if(F.isIdentifier()&&P.isIdentifier()&&VALID_CALLEES.indexOf(F.node.name)>=0&&INVALID_METHODS.indexOf(P.node.name)<0&&(B=global[F.node.name],H=B[P.node.name]),F.isLiteral()&&P.isIdentifier()){var U=(0,_typeof3["default"])(F.node.value);"string"!==U&&"number"!==U||(B=F.node.value,H=B[P.node.name])}}if(H){var W=t.get("arguments").map(r);if(!n)return;return H.apply(B,W)}}e(t)}}var n=!0,a=void 0,i=new _map2["default"],u=r(this);return n||(u=void 0),{confident:n,deopt:a,value:u}}exports.__esModule=!0;var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_map=__webpack_require__("./node_modules/babel-runtime/core-js/map.js"),_map2=_interopRequireDefault(_map);exports.evaluateTruthy=evaluateTruthy,exports.evaluate=evaluate;var VALID_CALLEES=["String","Number","Math"],INVALID_METHODS=["random"];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/conversion.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(o[r]=e[r]);return o["default"]=e,o}function toComputedKey(){var e=this.node,o=void 0;if(this.isMemberExpression())o=e.property;else{if(!this.isProperty()&&!this.isMethod())throw new ReferenceError("todo");o=e.key}return e.computed||t.isIdentifier(o)&&(o=t.stringLiteral(o.name)),o}function ensureBlock(){return t.ensureBlock(this.node)}function arrowFunctionToShadowed(){if(this.isArrowFunctionExpression()){this.ensureBlock();var e=this.node;e.expression=!1,e.type="FunctionExpression",e.shadow=e.shadow||!0}}exports.__esModule=!0,exports.toComputedKey=toComputedKey,exports.ensureBlock=ensureBlock,exports.arrowFunctionToShadowed=arrowFunctionToShadowed;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/introspection.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function matchesPattern(e,r){function i(e){var t=n[o];return"*"===t||e===t}if(!this.isMemberExpression())return!1;for(var n=e.split("."),s=[this.node],o=0;s.length;){var a=s.shift();if(r&&o===n.length)return!0;if(t.isIdentifier(a)){if(!i(a.name))return!1}else if(t.isLiteral(a)){if(!i(a.value))return!1}else{if(t.isMemberExpression(a)){if(a.computed&&!t.isLiteral(a.property))return!1;s.unshift(a.property),s.unshift(a.object);continue}if(!t.isThisExpression(a))return!1;if(!i("this"))return!1}if(++o>n.length)return!1}return o===n.length}function has(e){var t=this.node&&this.node[e];return t&&Array.isArray(t)?!!t.length:!!t}function isStatic(){return this.scope.isStatic(this.node)}function isnt(e){return!this.has(e)}function equals(e,t){return this.node[e]===t}function isNodeType(e){return t.isType(this.type,e)}function canHaveVariableDeclarationOrExpression(){return("init"===this.key||"left"===this.key)&&this.parentPath.isFor()}function canSwapBetweenExpressionAndStatement(e){return!("body"!==this.key||!this.parentPath.isArrowFunctionExpression())&&(this.isExpression()?t.isBlockStatement(e):!!this.isBlockStatement()&&t.isExpression(e))}function isCompletionRecord(e){var t=this,r=!0;do{var i=t.container;if(t.isFunction()&&!r)return!!e;if(r=!1,Array.isArray(i)&&t.key!==i.length-1)return!1}while((t=t.parentPath)&&!t.isProgram());return!0}function isStatementOrBlock(){return!this.parentPath.isLabeledStatement()&&!t.isBlockStatement(this.container)&&(0,_includes2["default"])(t.STATEMENT_OR_BLOCK_KEYS,this.key)}function referencesImport(e,t){if(!this.isReferencedIdentifier())return!1;var r=this.scope.getBinding(this.node.name);if(!r||"module"!==r.kind)return!1;var i=r.path,n=i.parentPath;return!!n.isImportDeclaration()&&(n.node.source.value===e&&(!t||(!(!i.isImportDefaultSpecifier()||"default"!==t)||(!(!i.isImportNamespaceSpecifier()||"*"!==t)||!(!i.isImportSpecifier()||i.node.imported.name!==t)))))}function getSource(){var e=this.node;return e.end?this.hub.file.code.slice(e.start,e.end):""}function willIMaybeExecuteBefore(e){return"after"!==this._guessExecutionStatusRelativeTo(e)}function _guessExecutionStatusRelativeTo(e){var r=e.scope.getFunctionParent(),i=this.scope.getFunctionParent();if(r.node!==i.node){var n=this._guessExecutionStatusRelativeToDifferentFunctions(r);if(n)return n;e=r.path}var s=e.getAncestry();if(s.indexOf(this)>=0)return"after";var o=this.getAncestry(),a=void 0,u=void 0,f=void 0;for(f=0;f<o.length;f++){var l=o[f];if(u=s.indexOf(l),u>=0){a=l;break}}if(!a)return"before";var c=s[u-1],p=o[f-1];if(!c||!p)return"before";if(c.listKey&&c.container===p.container)return c.key>p.key?"before":"after";var d=t.VISITOR_KEYS[c.type].indexOf(c.key),h=t.VISITOR_KEYS[p.type].indexOf(p.key);return d>h?"before":"after"}function _guessExecutionStatusRelativeToDifferentFunctions(e){var t=e.path;if(t.isFunctionDeclaration()){var r=t.scope.getBinding(t.node.id.name);if(!r.references)return"before";for(var i=r.referencePaths,n=i,s=Array.isArray(n),o=0,n=s?n:(0,_getIterator3["default"])(n);;){var a;if(s){if(o>=n.length)break;a=n[o++]}else{if(o=n.next(),o.done)break;a=o.value}var u=a;if("callee"!==u.key||!u.parentPath.isCallExpression())return}for(var f=void 0,l=i,c=Array.isArray(l),p=0,l=c?l:(0,_getIterator3["default"])(l);;){var d;if(c){if(p>=l.length)break;d=l[p++]}else{if(p=l.next(),p.done)break;d=p.value}var h=d,v=!!h.find(function(e){return e.node===t.node});if(!v){var x=this._guessExecutionStatusRelativeTo(h);if(f){if(f!==x)return}else f=x}}return f}}function resolve(e,t){return this._resolve(e,t)||this}function _resolve(e,r){var i=this;if(!(r&&r.indexOf(this)>=0))if(r=r||[],r.push(this),this.isVariableDeclarator()){if(this.get("id").isIdentifier())return this.get("init").resolve(e,r)}else if(this.isReferencedIdentifier()){var n=this.scope.getBinding(this.node.name);if(!n)return;if(!n.constant)return;if("module"===n.kind)return;if(n.path!==this){var s=function(){var t=n.path.resolve(e,r);return i.find(function(e){return e.node===t.node})?{v:void 0}:{v:t}}();if("object"===("undefined"==typeof s?"undefined":(0,_typeof3["default"])(s)))return s.v}}else{if(this.isTypeCastExpression())return this.get("expression").resolve(e,r);if(e&&this.isMemberExpression()){var o=this.toComputedKey();if(!t.isLiteral(o))return;var a=o.value,u=this.get("object").resolve(e,r);if(u.isObjectExpression())for(var f=u.get("properties"),l=f,c=Array.isArray(l),p=0,l=c?l:(0,_getIterator3["default"])(l);;){var d;if(c){if(p>=l.length)break;d=l[p++]}else{if(p=l.next(),p.done)break;d=p.value}var h=d;if(h.isProperty()){var v=h.get("key"),x=h.isnt("computed")&&v.isIdentifier({name:a});if(x=x||v.isLiteral({value:a}))return h.get("value").resolve(e,r)}}else if(u.isArrayExpression()&&!isNaN(+a)){var y=u.get("elements"),g=y[a];if(g)return g.resolve(e,r)}}}}exports.__esModule=!0,exports.is=void 0;var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.matchesPattern=matchesPattern,exports.has=has,exports.isStatic=isStatic,exports.isnt=isnt,exports.equals=equals,exports.isNodeType=isNodeType,exports.canHaveVariableDeclarationOrExpression=canHaveVariableDeclarationOrExpression,exports.canSwapBetweenExpressionAndStatement=canSwapBetweenExpressionAndStatement,exports.isCompletionRecord=isCompletionRecord,exports.isStatementOrBlock=isStatementOrBlock,exports.referencesImport=referencesImport,exports.getSource=getSource,exports.willIMaybeExecuteBefore=willIMaybeExecuteBefore,exports._guessExecutionStatusRelativeTo=_guessExecutionStatusRelativeTo,exports._guessExecutionStatusRelativeToDifferentFunctions=_guessExecutionStatusRelativeToDifferentFunctions,exports.resolve=resolve,exports._resolve=_resolve;var _includes=__webpack_require__("./node_modules/lodash/includes.js"),_includes2=_interopRequireDefault(_includes),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),is=exports.is=has;

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/context.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function call(t){var e=this.opts;return this.debug(function(){return t}),!(!this.node||!this._call(e[t]))||!!this.node&&this._call(e[this.node.type]&&e[this.node.type][t])}function _call(t){if(!t)return!1;for(var e=t,s=Array.isArray(e),i=0,e=s?e:(0,_getIterator3["default"])(e);;){var n;if(s){if(i>=e.length)break;n=e[i++]}else{if(i=e.next(),i.done)break;n=i.value}var o=n;if(o){var r=this.node;if(!r)return!0;var h=o.call(this.state,this,this.state);if(h)throw new Error("Unexpected return value from visitor method "+o);if(this.node!==r)return!0;if(this.shouldStop||this.shouldSkip||this.removed)return!0}}return!1}function isBlacklisted(){var t=this.opts.blacklist;return t&&t.indexOf(this.node.type)>-1}function visit(){return!!this.node&&(!this.isBlacklisted()&&((!this.opts.shouldSkip||!this.opts.shouldSkip(this))&&(this.call("enter")||this.shouldSkip?(this.debug(function(){return"Skip..."}),this.shouldStop):(this.debug(function(){return"Recursing into..."}),_index2["default"].node(this.node,this.opts,this.scope,this.state,this,this.skipKeys),this.call("exit"),this.shouldStop))))}function skip(){this.shouldSkip=!0}function skipKey(t){this.skipKeys[t]=!0}function stop(){this.shouldStop=!0,this.shouldSkip=!0}function setScope(){if(!this.opts||!this.opts.noScope){var t=this.context&&this.context.scope;if(!t)for(var e=this.parentPath;e&&!t;){if(e.opts&&e.opts.noScope)return;t=e.scope,e=e.parentPath}this.scope=this.getScope(t),this.scope&&this.scope.init()}}function setContext(t){return this.shouldSkip=!1,this.shouldStop=!1,this.removed=!1,this.skipKeys={},t&&(this.context=t,this.state=t.state,this.opts=t.opts),this.setScope(),this}function resync(){this.removed||(this._resyncParent(),this._resyncList(),this._resyncKey())}function _resyncParent(){this.parentPath&&(this.parent=this.parentPath.node)}function _resyncKey(){if(this.container&&this.node!==this.container[this.key]){if(Array.isArray(this.container)){for(var t=0;t<this.container.length;t++)if(this.container[t]===this.node)return this.setKey(t)}else for(var e in this.container)if(this.container[e]===this.node)return this.setKey(e);this.key=null}}function _resyncList(){if(this.parent&&this.inList){var t=this.parent[this.listKey];this.container!==t&&(this.container=t||null)}}function _resyncRemoved(){null!=this.key&&this.container&&this.container[this.key]===this.node||this._markRemoved()}function popContext(){this.contexts.pop(),this.setContext(this.contexts[this.contexts.length-1])}function pushContext(t){this.contexts.push(t),this.setContext(t)}function setup(t,e,s,i){this.inList=!!s,this.listKey=s,this.parentKey=s||i,this.container=e,this.parentPath=t||this.parentPath,this.setKey(i)}function setKey(t){this.key=t,this.node=this.container[this.key],this.type=this.node&&this.node.type}function requeue(){var t=arguments.length<=0||void 0===arguments[0]?this:arguments[0];if(!t.removed)for(var e=this.contexts,s=e,i=Array.isArray(s),n=0,s=i?s:(0,_getIterator3["default"])(s);;){var o;if(i){if(n>=s.length)break;o=s[n++]}else{if(n=s.next(),n.done)break;o=n.value}var r=o;r.maybeQueue(t)}}function _getQueueContexts(){for(var t=this,e=this.contexts;!e.length;)t=t.parentPath,e=t.contexts;return e}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.call=call,exports._call=_call,exports.isBlacklisted=isBlacklisted,exports.visit=visit,exports.skip=skip,exports.skipKey=skipKey,exports.stop=stop,exports.setScope=setScope,exports.setContext=setContext,exports.resync=resync,exports._resyncParent=_resyncParent,exports._resyncKey=_resyncKey,exports._resyncList=_resyncList,exports._resyncRemoved=_resyncRemoved,exports.popContext=popContext,exports.pushContext=pushContext,exports.setup=setup,exports.setKey=setKey,exports.requeue=requeue,exports._getQueueContexts=_getQueueContexts;var _index=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_index2=_interopRequireDefault(_index);

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/removal.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function remove(){return this._assertUnremoved(),this.resync(),this._callRemovalHooks()?void this._markRemoved():(this.shareCommentsWithSiblings(),this._remove(),void this._markRemoved())}function _callRemovalHooks(){for(var e=_removalHooks.hooks,r=Array.isArray(e),o=0,e=r?e:(0,_getIterator3["default"])(e);;){var t;if(r){if(o>=e.length)break;t=e[o++]}else{if(o=e.next(),o.done)break;t=o.value}var s=t;if(s(this,this.parentPath))return!0}}function _remove(){Array.isArray(this.container)?(this.container.splice(this.key,1),this.updateSiblingKeys(this.key,-1)):this._replaceWith(null)}function _markRemoved(){this.shouldSkip=!0,this.removed=!0,this.node=null}function _assertUnremoved(){if(this.removed)throw this.buildCodeFrameError("NodePath has been removed so is read-only.")}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.remove=remove,exports._callRemovalHooks=_callRemovalHooks,exports._remove=_remove,exports._markRemoved=_markRemoved,exports._assertUnremoved=_assertUnremoved;var _removalHooks=__webpack_require__("./node_modules/babel-traverse/lib/path/lib/removal-hooks.js");

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/lib/removal-hooks.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0;var hooks=exports.hooks=[function(e,t){if("body"===e.key&&t.isArrowFunctionExpression())return e.replaceWith(e.scope.buildUndefinedNode()),!0},function(e,t){var i=!1;if(i=i||"test"===e.key&&(t.isWhile()||t.isSwitchCase()),i=i||"declaration"===e.key&&t.isExportDeclaration(),i=i||"body"===e.key&&t.isLabeledStatement(),i=i||"declarations"===e.listKey&&t.isVariableDeclaration()&&1===t.node.declarations.length,i=i||"expression"===e.key&&t.isExpressionStatement())return t.remove(),!0},function(e,t){if(t.isSequenceExpression()&&1===t.node.expressions.length)return t.replaceWith(t.node.expressions[0]),!0},function(e,t){if(t.isBinary())return"left"===e.key?t.replaceWith(t.node.right):t.replaceWith(t.node.left),!0},function(e,t){if(t.isIfStatement()&&("consequent"===e.key||"alternate"===e.key)||t.isLoop()&&"body"===e.key)return e.replaceWith({type:"BlockStatement",body:[]}),!0}];

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/modification.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function insertBefore(e){if(this._assertUnremoved(),e=this._verifyNodeList(e),this.parentPath.isExpressionStatement()||this.parentPath.isLabeledStatement())return this.parentPath.insertBefore(e);if(this.isNodeType("Expression")||this.parentPath.isForStatement()&&"init"===this.key)this.node&&e.push(this.node),this.replaceExpressionWithStatements(e);else{if(this._maybePopFromStatements(e),Array.isArray(this.container))return this._containerInsertBefore(e);if(!this.isStatementOrBlock())throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");this.node&&e.push(this.node),this._replaceWith(t.blockStatement(e))}return[this]}function _containerInsert(e,t){this.updateSiblingKeys(e,t.length);for(var r=[],i=0;i<t.length;i++){var n=e+i,s=t[i];if(this.container.splice(n,0,s),this.context){var o=this.context.create(this.parent,this.container,n,this.listKey);this.context.queue&&o.pushContext(this.context),r.push(o)}else r.push(_index2["default"].get({parentPath:this.parentPath,parent:this.parent,container:this.container,listKey:this.listKey,key:n}))}for(var a=this._getQueueContexts(),h=r,f=Array.isArray(h),u=0,h=f?h:(0,_getIterator3["default"])(h);;){var p;if(f){if(u>=h.length)break;p=h[u++]}else{if(u=h.next(),u.done)break;p=u.value}var d=p;d.setScope(),d.debug(function(){return"Inserted."});for(var c=a,l=Array.isArray(c),_=0,c=l?c:(0,_getIterator3["default"])(c);;){var y;if(l){if(_>=c.length)break;y=c[_++]}else{if(_=c.next(),_.done)break;y=_.value}var m=y;m.maybeQueue(d,!0)}}return r}function _containerInsertBefore(e){return this._containerInsert(this.key,e)}function _containerInsertAfter(e){return this._containerInsert(this.key+1,e)}function _maybePopFromStatements(e){var r=e[e.length-1],i=t.isIdentifier(r)||t.isExpressionStatement(r)&&t.isIdentifier(r.expression);i&&!this.isCompletionRecord()&&e.pop()}function insertAfter(e){if(this._assertUnremoved(),e=this._verifyNodeList(e),this.parentPath.isExpressionStatement()||this.parentPath.isLabeledStatement())return this.parentPath.insertAfter(e);if(this.isNodeType("Expression")||this.parentPath.isForStatement()&&"init"===this.key){if(this.node){var r=this.scope.generateDeclaredUidIdentifier();e.unshift(t.expressionStatement(t.assignmentExpression("=",r,this.node))),e.push(t.expressionStatement(r))}this.replaceExpressionWithStatements(e)}else{if(this._maybePopFromStatements(e),Array.isArray(this.container))return this._containerInsertAfter(e);if(!this.isStatementOrBlock())throw new Error("We don't know what to do with this node type. We were previously a Statement but we can't fit in here?");this.node&&e.unshift(this.node),this._replaceWith(t.blockStatement(e))}return[this]}function updateSiblingKeys(e,t){if(this.parent)for(var r=_cache.path.get(this.parent),i=0;i<r.length;i++){var n=r[i];n.key>=e&&(n.key+=t)}}function _verifyNodeList(e){if(!e)return[];e.constructor!==Array&&(e=[e]);for(var t=0;t<e.length;t++){var r=e[t],i=void 0;if(r?"object"!==("undefined"==typeof r?"undefined":(0,_typeof3["default"])(r))?i="contains a non-object node":r.type?r instanceof _index2["default"]&&(i="has a NodePath when it expected a raw object"):i="without a type":i="has falsy node",i){var n=Array.isArray(r)?"array":"undefined"==typeof r?"undefined":(0,_typeof3["default"])(r);throw new Error("Node list "+i+" with the index of "+t+" and type of "+n)}}return e}function unshiftContainer(e,t){this._assertUnremoved(),t=this._verifyNodeList(t);var r=_index2["default"].get({parentPath:this,parent:this.node,container:this.node[e],listKey:e,key:0});return r.insertBefore(t)}function pushContainer(e,t){this._assertUnremoved(),t=this._verifyNodeList(t);var r=this.node[e],i=_index2["default"].get({parentPath:this,parent:this.node,container:r,listKey:e,key:r.length});return i.replaceWithMultiple(t)}function hoist(){var e=arguments.length<=0||void 0===arguments[0]?this.scope:arguments[0],t=new _hoister2["default"](this,e);return t.run()}exports.__esModule=!0;var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.insertBefore=insertBefore,exports._containerInsert=_containerInsert,exports._containerInsertBefore=_containerInsertBefore,exports._containerInsertAfter=_containerInsertAfter,exports._maybePopFromStatements=_maybePopFromStatements,exports.insertAfter=insertAfter,exports.updateSiblingKeys=updateSiblingKeys,exports._verifyNodeList=_verifyNodeList,exports.unshiftContainer=unshiftContainer,exports.pushContainer=pushContainer,exports.hoist=hoist;var _cache=__webpack_require__("./node_modules/babel-traverse/lib/cache.js"),_hoister=__webpack_require__("./node_modules/babel-traverse/lib/path/lib/hoister.js"),_hoister2=_interopRequireDefault(_hoister),_index=__webpack_require__("./node_modules/babel-traverse/lib/path/index.js"),_index2=_interopRequireDefault(_index),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/lib/hoister.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),referenceVisitor={ReferencedIdentifier:function(e,t){if(!e.isJSXIdentifier()||!_babelTypes.react.isCompatTag(e.node.name)){var i=e.scope.getBinding(e.node.name);if(i&&i===t.scope.getBinding(e.node.name))if(i.constant)t.bindings[e.node.name]=i;else for(var r=i.constantViolations,n=Array.isArray(r),a=0,r=n?r:(0,_getIterator3["default"])(r);;){var s;if(n){if(a>=r.length)break;s=r[a++]}else{if(a=r.next(),a.done)break;s=a.value}var o=s;t.breakOnScopePaths=t.breakOnScopePaths.concat(o.getAncestry())}}}},PathHoister=function(){function e(t,i){(0,_classCallCheck3["default"])(this,e),this.breakOnScopePaths=[],this.bindings={},this.scopes=[],this.scope=i,this.path=t}return e.prototype.isCompatibleScope=function(e){for(var t in this.bindings){var i=this.bindings[t];if(!e.bindingIdentifierEquals(t,i.identifier))return!1}return!0},e.prototype.getCompatibleScopes=function(){var e=this.path.scope;do{if(!this.isCompatibleScope(e))break;if(this.scopes.push(e),this.breakOnScopePaths.indexOf(e.path)>=0)break}while(e=e.parent)},e.prototype.getAttachmentPath=function(){var e=this._getAttachmentPath();if(e){var t=e.scope;if(t.path===e&&(t=e.scope.parent),t.path.isProgram()||t.path.isFunction())for(var i in this.bindings)if(t.hasOwnBinding(i)){var r=this.bindings[i];if("param"!==r.kind&&r.path.getStatementParent().key>e.key)return}return e}},e.prototype._getAttachmentPath=function(){var e=this.scopes,t=e.pop();if(t){if(t.path.isFunction()){if(this.hasOwnParamBindings(t)){if(this.scope===t)return;return t.path.get("body").get("body")[0]}return this.getNextScopeStatementParent()}return t.path.isProgram()?this.getNextScopeStatementParent():void 0}},e.prototype.getNextScopeStatementParent=function(){var e=this.scopes.pop();if(e)return e.path.getStatementParent()},e.prototype.hasOwnParamBindings=function(e){for(var t in this.bindings)if(e.hasOwnBinding(t)){var i=this.bindings[t];if("param"===i.kind)return!0}return!1},e.prototype.run=function(){var e=this.path.node;if(!e._hoisted){e._hoisted=!0,this.path.traverse(referenceVisitor,this),this.getCompatibleScopes();var i=this.getAttachmentPath();if(i&&i.getFunctionParent()!==this.path.getFunctionParent()){var r=i.scope.generateUidIdentifier("ref");i.insertBefore([t.variableDeclaration("var",[t.variableDeclarator(r,this.path.node)])]);var n=this.path.parentPath;n.isJSXElement()&&this.path.container===n.node.children&&(r=t.JSXExpressionContainer(r)),this.path.replaceWith(r)}}},e}();exports["default"]=PathHoister,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/family.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e["default"]=t,e}function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function getStatementParent(){var t=this;do{if(!t.parentPath||Array.isArray(t.container)&&t.isStatement())break;t=t.parentPath}while(t);if(t&&(t.isProgram()||t.isFile()))throw new Error("File/Program node, we can't possibly find a statement parent to this");return t}function getOpposite(){return"left"===this.key?this.getSibling("right"):"right"===this.key?this.getSibling("left"):void 0}function getCompletionRecords(){var t=[],e=function(e){e&&(t=t.concat(e.getCompletionRecords()))};if(this.isIfStatement())e(this.get("consequent")),e(this.get("alternate"));else if(this.isDoExpression()||this.isFor()||this.isWhile())e(this.get("body"));else if(this.isProgram()||this.isBlockStatement())e(this.get("body").pop());else{if(this.isFunction())return this.get("body").getCompletionRecords();this.isTryStatement()?(e(this.get("block")),e(this.get("handler")),e(this.get("finalizer"))):t.push(this)}return t}function getSibling(t){return _index2["default"].get({parentPath:this.parentPath,parent:this.parent,container:this.container,listKey:this.listKey,key:t})}function get(t,e){e===!0&&(e=this.context);var i=t.split(".");return 1===i.length?this._getKey(t,e):this._getPattern(i,e)}function _getKey(t,e){var i=this,r=this.node,n=r[t];return Array.isArray(n)?n.map(function(s,a){return _index2["default"].get({listKey:t,parentPath:i,parent:r,container:n,key:a}).setContext(e)}):_index2["default"].get({parentPath:this,parent:r,container:r,key:t}).setContext(e)}function _getPattern(t,e){for(var i=this,r=t,n=Array.isArray(r),s=0,r=n?r:(0,_getIterator3["default"])(r);;){var a;if(n){if(s>=r.length)break;a=r[s++]}else{if(s=r.next(),s.done)break;a=s.value}var o=a;i="."===o?i.parentPath:Array.isArray(i)?i[o]:i.get(o,e)}return i}function getBindingIdentifiers(e){return t.getBindingIdentifiers(this.node,e)}function getOuterBindingIdentifiers(e){return t.getOuterBindingIdentifiers(this.node,e)}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.getStatementParent=getStatementParent,exports.getOpposite=getOpposite,exports.getCompletionRecords=getCompletionRecords,exports.getSibling=getSibling,exports.get=get,exports._getKey=_getKey,exports._getPattern=_getPattern,exports.getBindingIdentifiers=getBindingIdentifiers,exports.getOuterBindingIdentifiers=getOuterBindingIdentifiers;var _index=__webpack_require__("./node_modules/babel-traverse/lib/path/index.js"),_index2=_interopRequireDefault(_index),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/comments.js":
/***/ function(module, exports) {

	"use strict";function shareCommentsWithSiblings(){var t=this.node;if(t){var e=t.trailingComments,n=t.leadingComments;if(e||n){var i=this.getSibling(this.key-1),m=this.getSibling(this.key+1);i.node||(i=m),m.node||(m=i),i.addComments("trailing",n),m.addComments("leading",e)}}}function addComment(t,e,n){this.addComments(t,[{type:n?"CommentLine":"CommentBlock",value:e}])}function addComments(t,e){if(e){var n=this.node;if(n){var i=t+"Comments";n[i]?n[i]=n[i].concat(e):n[i]=e}}}exports.__esModule=!0,exports.shareCommentsWithSiblings=shareCommentsWithSiblings,exports.addComment=addComment,exports.addComments=addComments;

/***/ },

/***/ "./node_modules/babel-traverse/lib/hub.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),Hub=function e(l,s){(0,_classCallCheck3["default"])(this,e),this.file=l,this.options=s};exports["default"]=Hub,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-traverse/lib/context.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_path2=__webpack_require__("./node_modules/babel-traverse/lib/path/index.js"),_path3=_interopRequireDefault(_path2),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),testing="test"===("production"),TraversalContext=function(){function e(t,r,i,u){(0,_classCallCheck3["default"])(this,e),this.queue=null,this.parentPath=u,this.scope=t,this.state=i,this.opts=r}return e.prototype.shouldVisit=function(e){var r=this.opts;if(r.enter||r.exit)return!0;if(r[e.type])return!0;var i=t.VISITOR_KEYS[e.type];if(!i||!i.length)return!1;for(var u=i,s=Array.isArray(u),a=0,u=s?u:(0,_getIterator3["default"])(u);;){var n;if(s){if(a>=u.length)break;n=u[a++]}else{if(a=u.next(),a.done)break;n=a.value}var o=n;if(e[o])return!0}return!1},e.prototype.create=function(e,t,r,i){return _path3["default"].get({parentPath:this.parentPath,parent:e,container:t,key:r,listKey:i})},e.prototype.maybeQueue=function(e,t){if(this.trap)throw new Error("Infinite cycle detected");this.queue&&(t?this.queue.push(e):this.priorityQueue.push(e))},e.prototype.visitMultiple=function(e,t,r){if(0===e.length)return!1;for(var i=[],u=0;u<e.length;u++){var s=e[u];s&&this.shouldVisit(s)&&i.push(this.create(t,e,u,r))}return this.visitQueue(i)},e.prototype.visitSingle=function(e,t){return!!this.shouldVisit(e[t])&&this.visitQueue([this.create(e,e,t)])},e.prototype.visitQueue=function(e){this.queue=e,this.priorityQueue=[];for(var t=[],r=!1,i=e,u=Array.isArray(i),s=0,i=u?i:(0,_getIterator3["default"])(i);;){var a;if(u){if(s>=i.length)break;a=i[s++]}else{if(s=i.next(),s.done)break;a=s.value}var n=a;if(n.resync(),0!==n.contexts.length&&n.contexts[n.contexts.length-1]===this||n.pushContext(this),null!==n.key&&(testing&&e.length>=1e4&&(this.trap=!0),!(t.indexOf(n.node)>=0))){if(t.push(n.node),n.visit()){r=!0;break}if(this.priorityQueue.length&&(r=this.visitQueue(this.priorityQueue),this.priorityQueue=[],this.queue=e,r))break}}for(var o=e,l=Array.isArray(o),h=0,o=l?o:(0,_getIterator3["default"])(o);;){var p;if(l){if(h>=o.length)break;p=o[h++]}else{if(h=o.next(),h.done)break;p=h.value}var f=p;f.popContext()}return this.queue=null,r},e.prototype.visit=function(e,t){var r=e[t];return!!r&&(Array.isArray(r)?this.visitMultiple(r,e,t):this.visitSingle(e,t))},e}();exports["default"]=TraversalContext,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-traverse/lib/visitors.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function explode(e){if(e._exploded)return e;e._exploded=!0;for(var r in e)if(!shouldIgnoreKey(r)){var i=r.split("|");if(1!==i.length){var a=e[r];delete e[r];for(var n=i,o=Array.isArray(n),f=0,n=o?n:(0,_getIterator3["default"])(n);;){var u;if(o){if(f>=n.length)break;u=n[f++]}else{if(f=n.next(),f.done)break;u=f.value}var l=u;e[l]=a}}}verify(e),delete e.__esModule,ensureEntranceObjects(e),ensureCallbackArrays(e);for(var s=(0,_keys2["default"])(e),d=Array.isArray(s),v=0,s=d?s:(0,_getIterator3["default"])(s);;){var y;if(d){if(v>=s.length)break;y=s[v++]}else{if(v=s.next(),v.done)break;y=v.value}var p=y;if(!shouldIgnoreKey(p)){var c=virtualTypes[p];if(c){var _=e[p];for(var g in _)_[g]=wrapCheck(c,_[g]);if(delete e[p],c.types)for(var b=c.types,h=Array.isArray(b),k=0,b=h?b:(0,_getIterator3["default"])(b);;){var x;if(h){if(k>=b.length)break;x=b[k++]}else{if(k=b.next(),k.done)break;x=k.value}var A=x;e[A]?mergePair(e[A],_):e[A]=_}else mergePair(e,_)}}}for(var m in e)if(!shouldIgnoreKey(m)){var I=e[m],q=t.FLIPPED_ALIAS_KEYS[m],w=t.DEPRECATED_KEYS[m];if(w&&(console.trace("Visitor defined for "+m+" but it has been renamed to "+w),q=[w]),q){delete e[m];for(var E=q,P=Array.isArray(E),R=0,E=P?E:(0,_getIterator3["default"])(E);;){var K;if(P){if(R>=E.length)break;K=E[R++]}else{if(R=E.next(),R.done)break;K=R.value}var S=K,T=e[S];T?mergePair(T,I):e[S]=(0,_clone2["default"])(I)}}}for(var M in e)shouldIgnoreKey(M)||ensureCallbackArrays(e[M]);return e}function verify(e){if(!e._verified){if("function"==typeof e)throw new Error(messages.get("traverseVerifyRootFunction"));for(var r in e)if("enter"!==r&&"exit"!==r||validateVisitorMethods(r,e[r]),!shouldIgnoreKey(r)){if(t.TYPES.indexOf(r)<0)throw new Error(messages.get("traverseVerifyNodeType",r));var i=e[r];if("object"===("undefined"==typeof i?"undefined":(0,_typeof3["default"])(i)))for(var a in i){if("enter"!==a&&"exit"!==a)throw new Error(messages.get("traverseVerifyVisitorProperty",r,a));validateVisitorMethods(r+"."+a,i[a])}}e._verified=!0}}function validateVisitorMethods(e,r){for(var t=[].concat(r),i=t,a=Array.isArray(i),n=0,i=a?i:(0,_getIterator3["default"])(i);;){var o;if(a){if(n>=i.length)break;o=i[n++]}else{if(n=i.next(),n.done)break;o=n.value}var f=o;if("function"!=typeof f)throw new TypeError("Non-function found defined in "+e+" with type "+("undefined"==typeof f?"undefined":(0,_typeof3["default"])(f)))}}function merge(e){for(var r=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],t=arguments[2],i={},a=0;a<e.length;a++){var n=e[a],o=r[a];explode(n);for(var f in n){var u=n[f];(o||t)&&(u=wrapWithStateOrWrapper(u,o,t));var l=i[f]=i[f]||{};mergePair(l,u)}}return i}function wrapWithStateOrWrapper(e,r,t){var i={},a=function(a){var n=e[a];return Array.isArray(n)?(n=n.map(function(e){var i=e;return r&&(i=function(t){return e.call(r,t,r)}),t&&(i=t(r.key,a,i)),i}),void(i[a]=n)):"continue"};for(var n in e){a(n)}return i}function ensureEntranceObjects(e){for(var r in e)if(!shouldIgnoreKey(r)){var t=e[r];"function"==typeof t&&(e[r]={enter:t})}}function ensureCallbackArrays(e){e.enter&&!Array.isArray(e.enter)&&(e.enter=[e.enter]),e.exit&&!Array.isArray(e.exit)&&(e.exit=[e.exit])}function wrapCheck(e,r){var t=function(t){if(e.checkPath(t))return r.apply(this,arguments)};return t.toString=function(){return r.toString()},t}function shouldIgnoreKey(e){return"_"===e[0]||("enter"===e||"exit"===e||"shouldSkip"===e||("blacklist"===e||"noScope"===e||"skipKeys"===e))}function mergePair(e,r){for(var t in r)e[t]=[].concat(e[t]||[],r[t])}exports.__esModule=!0;var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.explode=explode,exports.verify=verify,exports.merge=merge;var _virtualTypes=__webpack_require__("./node_modules/babel-traverse/lib/path/lib/virtual-types.js"),virtualTypes=_interopRequireWildcard(_virtualTypes),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_clone=__webpack_require__("./node_modules/lodash/clone.js"),_clone2=_interopRequireDefault(_clone);

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/metadata.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function ExportDeclaration(e,r){var a=e.node,o=a.source?a.source.value:null,i=r.metadata.modules.exports,l=e.get("declaration");if(l.isStatement()){var s=l.getBindingIdentifiers();for(var p in s)i.exported.push(p),i.specifiers.push({kind:"local",local:p,exported:e.isExportDefaultDeclaration()?"default":p})}if(e.isExportNamedDeclaration()&&a.specifiers)for(var n=a.specifiers,u=Array.isArray(n),c=0,n=u?n:(0,_getIterator3["default"])(n);;){var d;if(u){if(c>=n.length)break;d=n[c++]}else{if(c=n.next(),c.done)break;d=c.value}var f=d,x=f.exported.name;i.exported.push(x),t.isExportDefaultSpecifier(f)&&i.specifiers.push({kind:"external",local:x,exported:x,source:o}),t.isExportNamespaceSpecifier(f)&&i.specifiers.push({kind:"external-namespace",exported:x,source:o});var m=f.local;m&&(o&&i.specifiers.push({kind:"external",local:m.name,exported:x,source:o}),o||i.specifiers.push({kind:"local",local:m.name,exported:x}))}e.isExportAllDeclaration()&&i.specifiers.push({kind:"external-all",source:o})}function Scope(e){e.skip()}exports.__esModule=!0,exports.ImportDeclaration=exports.ModuleDeclaration=void 0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.ExportDeclaration=ExportDeclaration,exports.Scope=Scope;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),ModuleDeclaration=exports.ModuleDeclaration={enter:function(e,r){var t=e.node;t.source&&(t.source.value=r.resolveModuleSource(t.source.value))}},ImportDeclaration=exports.ImportDeclaration={exit:function(e,r){var t=e.node,a=[],o=[];r.metadata.modules.imports.push({source:t.source.value,imported:o,specifiers:a});for(var i=e.get("specifiers"),l=Array.isArray(i),s=0,i=l?i:(0,_getIterator3["default"])(i);;){var p;if(l){if(s>=i.length)break;p=i[s++]}else{if(s=i.next(),s.done)break;p=s.value}var n=p,u=n.node.local.name;if(n.isImportDefaultSpecifier()&&(o.push("default"),a.push({kind:"named",imported:"default",local:u})),n.isImportSpecifier()){var c=n.node.imported.name;o.push(c),a.push({kind:"named",imported:c,local:u})}n.isImportNamespaceSpecifier()&&(o.push("*"),a.push({kind:"namespace",local:u}))}}};

/***/ },

/***/ "./node_modules/convert-source-map/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {"use strict";function decodeBase64(e){return new Buffer(e,"base64").toString()}function stripComment(e){return e.split(",").pop()}function readFromFileMap(e,t){var r=mapFileCommentRx.exec(e);mapFileCommentRx.lastIndex=0;var o=r[1]||r[2],n=path.resolve(t,o);try{return fs.readFileSync(n,"utf8")}catch(m){throw new Error("An error occurred while trying to read the map file at "+n+"\n"+m)}}function Converter(e,t){t=t||{},t.isFileComment&&(e=readFromFileMap(e,t.commentFileDir)),t.hasComment&&(e=stripComment(e)),t.isEncoded&&(e=decodeBase64(e)),(t.isJSON||t.isEncoded)&&(e=JSON.parse(e)),this.sourcemap=e}function convertFromLargeSource(e){for(var t,r=e.split("\n"),o=r.length-1;o>0;o--)if(t=r[o],~t.indexOf("sourceMappingURL=data:"))return exports.fromComment(t)}var fs=__webpack_require__("./node_modules/webpack/node_modules/node-libs-browser/mock/empty.js"),path=__webpack_require__("./node_modules/path-browserify/index.js"),commentRx=/^\s*\/(?:\/|\*)[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+;)?base64,(.*)$/gm,mapFileCommentRx=/(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)|(?:\/\*[@#][ \t]+sourceMappingURL=([^\*]+?)[ \t]*(?:\*\/){1}[ \t]*$)/gm;Converter.prototype.toJSON=function(e){return JSON.stringify(this.sourcemap,null,e)},Converter.prototype.toBase64=function(){var e=this.toJSON();return new Buffer(e).toString("base64")},Converter.prototype.toComment=function(e){var t=this.toBase64(),r="sourceMappingURL=data:application/json;base64,"+t;return e&&e.multiline?"/*# "+r+" */":"//# "+r},Converter.prototype.toObject=function(){return JSON.parse(this.toJSON())},Converter.prototype.addProperty=function(e,t){if(this.sourcemap.hasOwnProperty(e))throw new Error("property %s already exists on the sourcemap, use set property instead");return this.setProperty(e,t)},Converter.prototype.setProperty=function(e,t){return this.sourcemap[e]=t,this},Converter.prototype.getProperty=function(e){return this.sourcemap[e]},exports.fromObject=function(e){return new Converter(e)},exports.fromJSON=function(e){return new Converter(e,{isJSON:!0})},exports.fromBase64=function(e){return new Converter(e,{isEncoded:!0})},exports.fromComment=function(e){return e=e.replace(/^\/\*/g,"//").replace(/\*\/$/g,""),new Converter(e,{isEncoded:!0,hasComment:!0})},exports.fromMapFileComment=function(e,t){return new Converter(e,{commentFileDir:t,isFileComment:!0,isJSON:!0})},exports.fromSource=function(e,t){if(t){var r=convertFromLargeSource(e);return r?r:null}var o=e.match(commentRx);return commentRx.lastIndex=0,o?exports.fromComment(o.pop()):null},exports.fromMapFileSource=function(e,t){var r=e.match(mapFileCommentRx);return mapFileCommentRx.lastIndex=0,r?exports.fromMapFileComment(r.pop(),t):null},exports.removeComments=function(e){return commentRx.lastIndex=0,e.replace(commentRx,"")},exports.removeMapFileComments=function(e){return mapFileCommentRx.lastIndex=0,e.replace(mapFileCommentRx,"")},exports.generateMapFileComment=function(e,t){var r="sourceMappingURL="+e;return t&&t.multiline?"/*# "+r+" */":"//# "+r},Object.defineProperty(exports,"commentRegex",{get:function(){return commentRx.lastIndex=0,commentRx}}),Object.defineProperty(exports,"mapFileCommentRegex",{get:function(){return mapFileCommentRx.lastIndex=0,mapFileCommentRx}});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/buffer/index.js").Buffer))

/***/ },

/***/ "./node_modules/buffer/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {"use strict";function typedArraySupport(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(e){return!1}}function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function createBuffer(t,e){if(kMaxLength()<e)throw new RangeError("Invalid typed array length");return Buffer.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e),t.__proto__=Buffer.prototype):(null===t&&(t=new Buffer(e)),t.length=e),t}function Buffer(t,e,r){if(!(Buffer.TYPED_ARRAY_SUPPORT||this instanceof Buffer))return new Buffer(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return allocUnsafe(this,t)}return from(this,t,e,r)}function from(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?fromArrayBuffer(t,e,r,n):"string"==typeof e?fromString(t,e,r):fromObject(t,e)}function assertSize(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function alloc(t,e,r,n){return assertSize(e),e<=0?createBuffer(t,e):void 0!==r?"string"==typeof n?createBuffer(t,e).fill(r,n):createBuffer(t,e).fill(r):createBuffer(t,e)}function allocUnsafe(t,e){if(assertSize(e),t=createBuffer(t,e<0?0:0|checked(e)),!Buffer.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function fromString(t,e,r){if("string"==typeof r&&""!==r||(r="utf8"),!Buffer.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|byteLength(e,r);t=createBuffer(t,n);var f=t.write(e,r);return f!==n&&(t=t.slice(0,f)),t}function fromArrayLike(t,e){var r=e.length<0?0:0|checked(e.length);t=createBuffer(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function fromArrayBuffer(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");return e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n),Buffer.TYPED_ARRAY_SUPPORT?(t=e,t.__proto__=Buffer.prototype):t=fromArrayLike(t,e),t}function fromObject(t,e){if(Buffer.isBuffer(e)){var r=0|checked(e.length);return t=createBuffer(t,r),0===t.length?t:(e.copy(t,0,0,r),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||isnan(e.length)?createBuffer(t,0):fromArrayLike(t,e);if("Buffer"===e.type&&isArray(e.data))return fromArrayLike(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function checked(t){if(t>=kMaxLength())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+kMaxLength().toString(16)+" bytes");return 0|t}function SlowBuffer(t){return+t!=t&&(t=0),Buffer.alloc(+t)}function byteLength(t,e){if(Buffer.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return utf8ToBytes(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(t).length;default:if(n)return utf8ToBytes(t).length;e=(""+e).toLowerCase(),n=!0}}function slowToString(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if(r>>>=0,e>>>=0,r<=e)return"";for(t||(t="utf8");;)switch(t){case"hex":return hexSlice(this,e,r);case"utf8":case"utf-8":return utf8Slice(this,e,r);case"ascii":return asciiSlice(this,e,r);case"latin1":case"binary":return latin1Slice(this,e,r);case"base64":return base64Slice(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}function swap(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function bidirectionalIndexOf(t,e,r,n,f){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=f?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(f)return-1;r=t.length-1}else if(r<0){if(!f)return-1;r=0}if("string"==typeof e&&(e=Buffer.from(e,n)),Buffer.isBuffer(e))return 0===e.length?-1:arrayIndexOf(t,e,r,n,f);if("number"==typeof e)return e=255&e,Buffer.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?f?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):arrayIndexOf(t,[e],r,n,f);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(t,e,r,n,f){function i(t,e){return 1===o?t[e]:t.readUInt16BE(e*o)}var o=1,u=t.length,s=e.length;if(void 0!==n&&(n=String(n).toLowerCase(),"ucs2"===n||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;o=2,u/=2,s/=2,r/=2}var a;if(f){var h=-1;for(a=r;a<u;a++)if(i(t,a)===i(e,h===-1?0:a-h)){if(h===-1&&(h=a),a-h+1===s)return h*o}else h!==-1&&(a-=a-h),h=-1}else for(r+s>u&&(r=u-s),a=r;a>=0;a--){for(var c=!0,l=0;l<s;l++)if(i(t,a+l)!==i(e,l)){c=!1;break}if(c)return a}return-1}function hexWrite(t,e,r,n){r=Number(r)||0;var f=t.length-r;n?(n=Number(n),n>f&&(n=f)):n=f;var i=e.length;if(i%2!==0)throw new TypeError("Invalid hex string");n>i/2&&(n=i/2);for(var o=0;o<n;++o){var u=parseInt(e.substr(2*o,2),16);if(isNaN(u))return o;t[r+o]=u}return o}function utf8Write(t,e,r,n){return blitBuffer(utf8ToBytes(e,t.length-r),t,r,n)}function asciiWrite(t,e,r,n){return blitBuffer(asciiToBytes(e),t,r,n)}function latin1Write(t,e,r,n){return asciiWrite(t,e,r,n)}function base64Write(t,e,r,n){return blitBuffer(base64ToBytes(e),t,r,n)}function ucs2Write(t,e,r,n){return blitBuffer(utf16leToBytes(e,t.length-r),t,r,n)}function base64Slice(t,e,r){return 0===e&&r===t.length?base64.fromByteArray(t):base64.fromByteArray(t.slice(e,r))}function utf8Slice(t,e,r){r=Math.min(t.length,r);for(var n=[],f=e;f<r;){var i=t[f],o=null,u=i>239?4:i>223?3:i>191?2:1;if(f+u<=r){var s,a,h,c;switch(u){case 1:i<128&&(o=i);break;case 2:s=t[f+1],128===(192&s)&&(c=(31&i)<<6|63&s,c>127&&(o=c));break;case 3:s=t[f+1],a=t[f+2],128===(192&s)&&128===(192&a)&&(c=(15&i)<<12|(63&s)<<6|63&a,c>2047&&(c<55296||c>57343)&&(o=c));break;case 4:s=t[f+1],a=t[f+2],h=t[f+3],128===(192&s)&&128===(192&a)&&128===(192&h)&&(c=(15&i)<<18|(63&s)<<12|(63&a)<<6|63&h,c>65535&&c<1114112&&(o=c))}}null===o?(o=65533,u=1):o>65535&&(o-=65536,n.push(o>>>10&1023|55296),o=56320|1023&o),n.push(o),f+=u}return decodeCodePointsArray(n)}function decodeCodePointsArray(t){var e=t.length;if(e<=MAX_ARGUMENTS_LENGTH)return String.fromCharCode.apply(String,t);for(var r="",n=0;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=MAX_ARGUMENTS_LENGTH));return r}function asciiSlice(t,e,r){var n="";r=Math.min(t.length,r);for(var f=e;f<r;++f)n+=String.fromCharCode(127&t[f]);return n}function latin1Slice(t,e,r){var n="";r=Math.min(t.length,r);for(var f=e;f<r;++f)n+=String.fromCharCode(t[f]);return n}function hexSlice(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var f="",i=e;i<r;++i)f+=toHex(t[i]);return f}function utf16leSlice(t,e,r){for(var n=t.slice(e,r),f="",i=0;i<n.length;i+=2)f+=String.fromCharCode(n[i]+256*n[i+1]);return f}function checkOffset(t,e,r){if(t%1!==0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(t,e,r,n,f,i){if(!Buffer.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>f||e<i)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function objectWriteUInt16(t,e,r,n){e<0&&(e=65535+e+1);for(var f=0,i=Math.min(t.length-r,2);f<i;++f)t[r+f]=(e&255<<8*(n?f:1-f))>>>8*(n?f:1-f)}function objectWriteUInt32(t,e,r,n){e<0&&(e=4294967295+e+1);for(var f=0,i=Math.min(t.length-r,4);f<i;++f)t[r+f]=e>>>8*(n?f:3-f)&255}function checkIEEE754(t,e,r,n,f,i){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function writeFloat(t,e,r,n,f){return f||checkIEEE754(t,e,r,4,3.4028234663852886e38,-3.4028234663852886e38),ieee754.write(t,e,r,n,23,4),r+4}function writeDouble(t,e,r,n,f){return f||checkIEEE754(t,e,r,8,1.7976931348623157e308,-1.7976931348623157e308),ieee754.write(t,e,r,n,52,8),r+8}function base64clean(t){if(t=stringtrim(t).replace(INVALID_BASE64_RE,""),t.length<2)return"";for(;t.length%4!==0;)t+="=";return t}function stringtrim(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}function toHex(t){return t<16?"0"+t.toString(16):t.toString(16)}function utf8ToBytes(t,e){e=e||1/0;for(var r,n=t.length,f=null,i=[],o=0;o<n;++o){if(r=t.charCodeAt(o),r>55295&&r<57344){if(!f){if(r>56319){(e-=3)>-1&&i.push(239,191,189);continue}if(o+1===n){(e-=3)>-1&&i.push(239,191,189);continue}f=r;continue}if(r<56320){(e-=3)>-1&&i.push(239,191,189),f=r;continue}r=(f-55296<<10|r-56320)+65536}else f&&(e-=3)>-1&&i.push(239,191,189);if(f=null,r<128){if((e-=1)<0)break;i.push(r)}else if(r<2048){if((e-=2)<0)break;i.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;i.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;i.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return i}function asciiToBytes(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}function utf16leToBytes(t,e){for(var r,n,f,i=[],o=0;o<t.length&&!((e-=2)<0);++o)r=t.charCodeAt(o),n=r>>8,f=r%256,i.push(f),i.push(n);return i}function base64ToBytes(t){return base64.toByteArray(base64clean(t))}function blitBuffer(t,e,r,n){for(var f=0;f<n&&!(f+r>=e.length||f>=t.length);++f)e[f+r]=t[f];return f}function isnan(t){return t!==t}var base64=__webpack_require__("./node_modules/base64-js/index.js"),ieee754=__webpack_require__("./node_modules/ieee754/index.js"),isArray=__webpack_require__("./node_modules/isarray/index.js");exports.Buffer=Buffer,exports.SlowBuffer=SlowBuffer,exports.INSPECT_MAX_BYTES=50,Buffer.TYPED_ARRAY_SUPPORT=void 0!==global.TYPED_ARRAY_SUPPORT?global.TYPED_ARRAY_SUPPORT:typedArraySupport(),exports.kMaxLength=kMaxLength(),Buffer.poolSize=8192,Buffer._augment=function(t){return t.__proto__=Buffer.prototype,t},Buffer.from=function(t,e,r){return from(null,t,e,r)},Buffer.TYPED_ARRAY_SUPPORT&&(Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0})),Buffer.alloc=function(t,e,r){return alloc(null,t,e,r)},Buffer.allocUnsafe=function(t){return allocUnsafe(null,t)},Buffer.allocUnsafeSlow=function(t){return allocUnsafe(null,t)},Buffer.isBuffer=function(t){return!(null==t||!t._isBuffer)},Buffer.compare=function(t,e){if(!Buffer.isBuffer(t)||!Buffer.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,f=0,i=Math.min(r,n);f<i;++f)if(t[f]!==e[f]){r=t[f],n=e[f];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function(t,e){if(!isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return Buffer.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=Buffer.allocUnsafe(e),f=0;for(r=0;r<t.length;++r){var i=t[r];if(!Buffer.isBuffer(i))throw new TypeError('"list" argument must be an Array of Buffers');i.copy(n,f),f+=i.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function(){var t=this.length;if(t%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)swap(this,e,e+1);return this},Buffer.prototype.swap32=function(){var t=this.length;if(t%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)swap(this,e,e+3),swap(this,e+1,e+2);return this},Buffer.prototype.swap64=function(){var t=this.length;if(t%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)swap(this,e,e+7),swap(this,e+1,e+6),swap(this,e+2,e+5),swap(this,e+3,e+4);return this},Buffer.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?utf8Slice(this,0,t):slowToString.apply(this,arguments)},Buffer.prototype.equals=function(t){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===Buffer.compare(this,t)},Buffer.prototype.inspect=function(){var t="",e=exports.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},Buffer.prototype.compare=function(t,e,r,n,f){if(!Buffer.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===f&&(f=this.length),e<0||r>t.length||n<0||f>this.length)throw new RangeError("out of range index");if(n>=f&&e>=r)return 0;if(n>=f)return-1;if(e>=r)return 1;if(e>>>=0,r>>>=0,n>>>=0,f>>>=0,this===t)return 0;for(var i=f-n,o=r-e,u=Math.min(i,o),s=this.slice(n,f),a=t.slice(e,r),h=0;h<u;++h)if(s[h]!==a[h]){i=s[h],o=a[h];break}return i<o?-1:o<i?1:0},Buffer.prototype.includes=function(t,e,r){return this.indexOf(t,e,r)!==-1},Buffer.prototype.indexOf=function(t,e,r){return bidirectionalIndexOf(this,t,e,r,!0)},Buffer.prototype.lastIndexOf=function(t,e,r){return bidirectionalIndexOf(this,t,e,r,!1)},Buffer.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e=0|e,isFinite(r)?(r=0|r,void 0===n&&(n="utf8")):(n=r,r=void 0)}var f=this.length-e;if((void 0===r||r>f)&&(r=f),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var i=!1;;)switch(n){case"hex":return hexWrite(this,t,e,r);case"utf8":case"utf-8":return utf8Write(this,t,e,r);case"ascii":return asciiWrite(this,t,e,r);case"latin1":case"binary":return latin1Write(this,t,e,r);case"base64":return base64Write(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,t,e,r);default:if(i)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),i=!0}},Buffer.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var MAX_ARGUMENTS_LENGTH=4096;Buffer.prototype.slice=function(t,e){var r=this.length;t=~~t,e=void 0===e?r:~~e,t<0?(t+=r,t<0&&(t=0)):t>r&&(t=r),e<0?(e+=r,e<0&&(e=0)):e>r&&(e=r),e<t&&(e=t);var n;if(Buffer.TYPED_ARRAY_SUPPORT)n=this.subarray(t,e),n.__proto__=Buffer.prototype;else{var f=e-t;n=new Buffer(f,(void 0));for(var i=0;i<f;++i)n[i]=this[i+t]}return n},Buffer.prototype.readUIntLE=function(t,e,r){t=0|t,e=0|e,r||checkOffset(t,e,this.length);for(var n=this[t],f=1,i=0;++i<e&&(f*=256);)n+=this[t+i]*f;return n},Buffer.prototype.readUIntBE=function(t,e,r){t=0|t,e=0|e,r||checkOffset(t,e,this.length);for(var n=this[t+--e],f=1;e>0&&(f*=256);)n+=this[t+--e]*f;return n},Buffer.prototype.readUInt8=function(t,e){return e||checkOffset(t,1,this.length),this[t]},Buffer.prototype.readUInt16LE=function(t,e){return e||checkOffset(t,2,this.length),this[t]|this[t+1]<<8},Buffer.prototype.readUInt16BE=function(t,e){return e||checkOffset(t,2,this.length),this[t]<<8|this[t+1]},Buffer.prototype.readUInt32LE=function(t,e){return e||checkOffset(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},Buffer.prototype.readUInt32BE=function(t,e){return e||checkOffset(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},Buffer.prototype.readIntLE=function(t,e,r){t=0|t,e=0|e,r||checkOffset(t,e,this.length);for(var n=this[t],f=1,i=0;++i<e&&(f*=256);)n+=this[t+i]*f;return f*=128,n>=f&&(n-=Math.pow(2,8*e)),n},Buffer.prototype.readIntBE=function(t,e,r){t=0|t,e=0|e,r||checkOffset(t,e,this.length);for(var n=e,f=1,i=this[t+--n];n>0&&(f*=256);)i+=this[t+--n]*f;return f*=128,i>=f&&(i-=Math.pow(2,8*e)),i},Buffer.prototype.readInt8=function(t,e){return e||checkOffset(t,1,this.length),128&this[t]?(255-this[t]+1)*-1:this[t]},Buffer.prototype.readInt16LE=function(t,e){e||checkOffset(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function(t,e){e||checkOffset(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function(t,e){return e||checkOffset(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},Buffer.prototype.readInt32BE=function(t,e){return e||checkOffset(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},Buffer.prototype.readFloatLE=function(t,e){return e||checkOffset(t,4,this.length),ieee754.read(this,t,!0,23,4)},Buffer.prototype.readFloatBE=function(t,e){return e||checkOffset(t,4,this.length),ieee754.read(this,t,!1,23,4)},Buffer.prototype.readDoubleLE=function(t,e){return e||checkOffset(t,8,this.length),ieee754.read(this,t,!0,52,8)},Buffer.prototype.readDoubleBE=function(t,e){return e||checkOffset(t,8,this.length),ieee754.read(this,t,!1,52,8)},Buffer.prototype.writeUIntLE=function(t,e,r,n){if(t=+t,e=0|e,r=0|r,!n){var f=Math.pow(2,8*r)-1;checkInt(this,t,e,r,f,0)}var i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},Buffer.prototype.writeUIntBE=function(t,e,r,n){if(t=+t,e=0|e,r=0|r,!n){var f=Math.pow(2,8*r)-1;checkInt(this,t,e,r,f,0)}var i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},Buffer.prototype.writeUInt8=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},Buffer.prototype.writeUInt16LE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):objectWriteUInt16(this,t,e,!0),e+2},Buffer.prototype.writeUInt16BE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):objectWriteUInt16(this,t,e,!1),e+2},Buffer.prototype.writeUInt32LE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):objectWriteUInt32(this,t,e,!0),e+4},Buffer.prototype.writeUInt32BE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):objectWriteUInt32(this,t,e,!1),e+4},Buffer.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e=0|e,!n){var f=Math.pow(2,8*r-1);checkInt(this,t,e,r,f-1,-f)}var i=0,o=1,u=0;for(this[e]=255&t;++i<r&&(o*=256);)t<0&&0===u&&0!==this[e+i-1]&&(u=1),this[e+i]=(t/o>>0)-u&255;return e+r},Buffer.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e=0|e,!n){var f=Math.pow(2,8*r-1);checkInt(this,t,e,r,f-1,-f)}var i=r-1,o=1,u=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===u&&0!==this[e+i+1]&&(u=1),this[e+i]=(t/o>>0)-u&255;return e+r},Buffer.prototype.writeInt8=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},Buffer.prototype.writeInt16LE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):objectWriteUInt16(this,t,e,!0),e+2},Buffer.prototype.writeInt16BE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):objectWriteUInt16(this,t,e,!1),e+2},Buffer.prototype.writeInt32LE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):objectWriteUInt32(this,t,e,!0),e+4},Buffer.prototype.writeInt32BE=function(t,e,r){return t=+t,e=0|e,r||checkInt(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),Buffer.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):objectWriteUInt32(this,t,e,!1),e+4},Buffer.prototype.writeFloatLE=function(t,e,r){return writeFloat(this,t,e,!0,r)},Buffer.prototype.writeFloatBE=function(t,e,r){return writeFloat(this,t,e,!1,r)},Buffer.prototype.writeDoubleLE=function(t,e,r){return writeDouble(this,t,e,!0,r)},Buffer.prototype.writeDoubleBE=function(t,e,r){return writeDouble(this,t,e,!1,r)},Buffer.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var f,i=n-r;if(this===t&&r<e&&e<n)for(f=i-1;f>=0;--f)t[f+e]=this[f+r];else if(i<1e3||!Buffer.TYPED_ARRAY_SUPPORT)for(f=0;f<i;++f)t[f+e]=this[f+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+i),e);return i},Buffer.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===t.length){var f=t.charCodeAt(0);f<256&&(t=f)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t=255&t);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0);var i;if("number"==typeof t)for(i=e;i<r;++i)this[i]=t;else{var o=Buffer.isBuffer(t)?t:utf8ToBytes(new Buffer(t,n).toString()),u=o.length;for(i=0;i<r-e;++i)this[i+e]=o[i%u]}return this};var INVALID_BASE64_RE=/[^+\/0-9A-Za-z-_]/g;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/buffer/index.js").Buffer, (function() { return this; }())))

/***/ },

/***/ "./node_modules/base64-js/index.js":
/***/ function(module, exports) {

	"use strict";function placeHoldersCount(o){var r=o.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===o[r-2]?2:"="===o[r-1]?1:0}function byteLength(o){return 3*o.length/4-placeHoldersCount(o)}function toByteArray(o){var r,e,t,u,n,p,a=o.length;n=placeHoldersCount(o),p=new Arr(3*a/4-n),t=n>0?a-4:a;var l=0;for(r=0,e=0;r<t;r+=4,e+=3)u=revLookup[o.charCodeAt(r)]<<18|revLookup[o.charCodeAt(r+1)]<<12|revLookup[o.charCodeAt(r+2)]<<6|revLookup[o.charCodeAt(r+3)],p[l++]=u>>16&255,p[l++]=u>>8&255,p[l++]=255&u;return 2===n?(u=revLookup[o.charCodeAt(r)]<<2|revLookup[o.charCodeAt(r+1)]>>4,p[l++]=255&u):1===n&&(u=revLookup[o.charCodeAt(r)]<<10|revLookup[o.charCodeAt(r+1)]<<4|revLookup[o.charCodeAt(r+2)]>>2,p[l++]=u>>8&255,p[l++]=255&u),p}function tripletToBase64(o){return lookup[o>>18&63]+lookup[o>>12&63]+lookup[o>>6&63]+lookup[63&o]}function encodeChunk(o,r,e){for(var t,u=[],n=r;n<e;n+=3)t=(o[n]<<16)+(o[n+1]<<8)+o[n+2],u.push(tripletToBase64(t));return u.join("")}function fromByteArray(o){for(var r,e=o.length,t=e%3,u="",n=[],p=16383,a=0,l=e-t;a<l;a+=p)n.push(encodeChunk(o,a,a+p>l?l:a+p));return 1===t?(r=o[e-1],u+=lookup[r>>2],u+=lookup[r<<4&63],u+="=="):2===t&&(r=(o[e-2]<<8)+o[e-1],u+=lookup[r>>10],u+=lookup[r>>4&63],u+=lookup[r<<2&63],u+="="),n.push(u),n.join("")}exports.byteLength=byteLength,exports.toByteArray=toByteArray,exports.fromByteArray=fromByteArray;for(var lookup=[],revLookup=[],Arr="undefined"!=typeof Uint8Array?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;revLookup["-".charCodeAt(0)]=62,revLookup["_".charCodeAt(0)]=63;

/***/ },

/***/ "./node_modules/ieee754/index.js":
/***/ function(module, exports) {

	exports.read=function(a,o,t,r,h){var M,p,w=8*h-r-1,f=(1<<w)-1,e=f>>1,i=-7,N=t?h-1:0,n=t?-1:1,s=a[o+N];for(N+=n,M=s&(1<<-i)-1,s>>=-i,i+=w;i>0;M=256*M+a[o+N],N+=n,i-=8);for(p=M&(1<<-i)-1,M>>=-i,i+=r;i>0;p=256*p+a[o+N],N+=n,i-=8);if(0===M)M=1-e;else{if(M===f)return p?NaN:(s?-1:1)*(1/0);p+=Math.pow(2,r),M-=e}return(s?-1:1)*p*Math.pow(2,M-r)},exports.write=function(a,o,t,r,h,M){var p,w,f,e=8*M-h-1,i=(1<<e)-1,N=i>>1,n=23===h?Math.pow(2,-24)-Math.pow(2,-77):0,s=r?0:M-1,u=r?1:-1,l=o<0||0===o&&1/o<0?1:0;for(o=Math.abs(o),isNaN(o)||o===1/0?(w=isNaN(o)?1:0,p=i):(p=Math.floor(Math.log(o)/Math.LN2),o*(f=Math.pow(2,-p))<1&&(p--,f*=2),o+=p+N>=1?n/f:n*Math.pow(2,1-N),o*f>=2&&(p++,f/=2),p+N>=i?(w=0,p=i):p+N>=1?(w=(o*f-1)*Math.pow(2,h),p+=N):(w=o*Math.pow(2,N-1)*Math.pow(2,h),p=0));h>=8;a[t+s]=255&w,s+=u,w/=256,h-=8);for(p=p<<h|w,e+=h;e>0;a[t+s]=255&p,s+=u,p/=256,e-=8);a[t+s-u]|=128*l};

/***/ },

/***/ "./node_modules/isarray/index.js":
/***/ function(module, exports) {

	var toString={}.toString;module.exports=Array.isArray||function(r){return"[object Array]"==toString.call(r)};

/***/ },

/***/ "./node_modules/webpack/node_modules/node-libs-browser/mock/empty.js":
/***/ function(module, exports) {

	

/***/ },

/***/ "./node_modules/path-browserify/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {function normalizeArray(r,t){for(var e=0,n=r.length-1;n>=0;n--){var s=r[n];"."===s?r.splice(n,1):".."===s?(r.splice(n,1),e++):e&&(r.splice(n,1),e--)}if(t)for(;e--;e)r.unshift("..");return r}function filter(r,t){if(r.filter)return r.filter(t);for(var e=[],n=0;n<r.length;n++)t(r[n],n,r)&&e.push(r[n]);return e}var splitPathRe=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,splitPath=function(r){return splitPathRe.exec(r).slice(1)};exports.resolve=function(){for(var r="",t=!1,e=arguments.length-1;e>=-1&&!t;e--){var n=e>=0?arguments[e]:process.cwd();if("string"!=typeof n)throw new TypeError("Arguments to path.resolve must be strings");n&&(r=n+"/"+r,t="/"===n.charAt(0))}return r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"),(t?"/":"")+r||"."},exports.normalize=function(r){var t=exports.isAbsolute(r),e="/"===substr(r,-1);return r=normalizeArray(filter(r.split("/"),function(r){return!!r}),!t).join("/"),r||t||(r="."),r&&e&&(r+="/"),(t?"/":"")+r},exports.isAbsolute=function(r){return"/"===r.charAt(0)},exports.join=function(){var r=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(r,function(r,t){if("string"!=typeof r)throw new TypeError("Arguments to path.join must be strings");return r}).join("/"))},exports.relative=function(r,t){function e(r){for(var t=0;t<r.length&&""===r[t];t++);for(var e=r.length-1;e>=0&&""===r[e];e--);return t>e?[]:r.slice(t,e-t+1)}r=exports.resolve(r).substr(1),t=exports.resolve(t).substr(1);for(var n=e(r.split("/")),s=e(t.split("/")),i=Math.min(n.length,s.length),o=i,u=0;u<i;u++)if(n[u]!==s[u]){o=u;break}for(var l=[],u=o;u<n.length;u++)l.push("..");return l=l.concat(s.slice(o)),l.join("/")},exports.sep="/",exports.delimiter=":",exports.dirname=function(r){var t=splitPath(r),e=t[0],n=t[1];return e||n?(n&&(n=n.substr(0,n.length-1)),e+n):"."},exports.basename=function(r,t){var e=splitPath(r)[2];return t&&e.substr(-1*t.length)===t&&(e=e.substr(0,e.length-t.length)),e},exports.extname=function(r){return splitPath(r)[3]};var substr="b"==="ab".substr(-1)?function(r,t,e){return r.substr(t,e)}:function(r,t,e){return t<0&&(t=r.length+t),r.substr(t,e)};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/options/option-manager.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _objectWithoutProperties2=__webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js"),_objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2),_stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_assign=__webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js"),_assign2=_interopRequireDefault(_assign),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_node=__webpack_require__("./node_modules/babel-core/lib/api/node.js"),context=_interopRequireWildcard(_node),_plugin2=__webpack_require__("./node_modules/babel-core/lib/transformation/plugin.js"),_plugin3=_interopRequireDefault(_plugin2),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_index=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/index.js"),_resolve=__webpack_require__("./node_modules/babel-core/lib/helpers/resolve.js"),_resolve2=_interopRequireDefault(_resolve),_cloneDeepWith=__webpack_require__("./node_modules/lodash/cloneDeepWith.js"),_cloneDeepWith2=_interopRequireDefault(_cloneDeepWith),_clone=__webpack_require__("./node_modules/lodash/clone.js"),_clone2=_interopRequireDefault(_clone),_merge=__webpack_require__("./node_modules/babel-core/lib/helpers/merge.js"),_merge2=_interopRequireDefault(_merge),_config2=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/config.js"),_config3=_interopRequireDefault(_config2),_removed=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/removed.js"),_removed2=_interopRequireDefault(_removed),_buildConfigChain=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/build-config-chain.js"),_buildConfigChain2=_interopRequireDefault(_buildConfigChain),_path=__webpack_require__("./node_modules/path-browserify/index.js"),_path2=_interopRequireDefault(_path),OptionManager=function(){function e(r){(0,_classCallCheck3["default"])(this,e),this.resolvedConfigs=[],this.options=e.createBareOptions(),this.log=r}return e.memoisePluginContainer=function(r,t,i,o){for(var n=e.memoisedPlugins,a=Array.isArray(n),s=0,n=a?n:(0,_getIterator3["default"])(n);;){var u;if(a){if(s>=n.length)break;u=n[s++]}else{if(s=n.next(),s.done)break;u=s.value}var l=u;if(l.container===r)return l.plugin}var f=void 0;if(f="function"==typeof r?r(context):r,"object"===("undefined"==typeof f?"undefined":(0,_typeof3["default"])(f))){var p=new _plugin3["default"](f,o);return e.memoisedPlugins.push({container:r,plugin:p}),p}throw new TypeError(messages.get("pluginNotObject",t,i,"undefined"==typeof f?"undefined":(0,_typeof3["default"])(f))+t+i)},e.createBareOptions=function(){var e={};for(var r in _config3["default"]){var t=_config3["default"][r];e[r]=(0,_clone2["default"])(t["default"])}return e},e.normalisePlugin=function(r,t,i,o){if(r=r.__esModule?r["default"]:r,!(r instanceof _plugin3["default"])){if("function"!=typeof r&&"object"!==("undefined"==typeof r?"undefined":(0,_typeof3["default"])(r)))throw new TypeError(messages.get("pluginNotFunction",t,i,"undefined"==typeof r?"undefined":(0,_typeof3["default"])(r)));r=e.memoisePluginContainer(r,t,i,o)}return r.init(t,i),r},e.normalisePlugins=function(r,t,i){return i.map(function(i,o){var n=void 0,a=void 0;if(!i)throw new TypeError("Falsy value found in plugins");Array.isArray(i)?(n=i[0],a=i[1]):n=i;var s="string"==typeof n?n:r+"$"+o;if("string"==typeof n){var u=(0,_resolve2["default"])("babel-plugin-"+n,t)||(0,_resolve2["default"])(n,t);if(!u)throw new ReferenceError(messages.get("pluginUnknown",n,r,o,t));n=__webpack_require__(6)(u)}return n=e.normalisePlugin(n,r,o,s),[n,a]})},e.prototype.mergeOptions=function(r){var t=this,i=r.options,o=r.extending,n=r.alias,a=r.loc,s=r.dirname;if(n=n||"foreign",i){("object"!==("undefined"==typeof i?"undefined":(0,_typeof3["default"])(i))||Array.isArray(i))&&this.log.error("Invalid options type for "+n,TypeError);var u=(0,_cloneDeepWith2["default"])(i,function(e){if(e instanceof _plugin3["default"])return e});s=s||process.cwd(),a=a||n;for(var l in u){var f=_config3["default"][l];if(!f&&this.log){var p="Check out http://babeljs.io/docs/usage/options/ for more info";_removed2["default"][l]?this.log.error("Using removed Babel 5 option: "+n+"."+l+" - "+_removed2["default"][l].message,ReferenceError):this.log.error("Unknown option: "+n+"."+l+". "+p,ReferenceError)}}(0,_index.normaliseOptions)(u),u.plugins&&(u.plugins=e.normalisePlugins(a,s,u.plugins)),u.presets&&(u.passPerPreset?u.presets=this.resolvePresets(u.presets,s,function(e,r){t.mergeOptions({options:e,extending:e,alias:r,loc:r,dirname:s})}):(this.mergePresets(u.presets,s),delete u.presets)),i===o?(0,_assign2["default"])(o,u):(0,_merge2["default"])(o||this.options,u)}},e.prototype.mergePresets=function(e,r){var t=this;this.resolvePresets(e,r,function(e,r){t.mergeOptions({options:e,alias:r,loc:r,dirname:_path2["default"].dirname(r||"")})})},e.prototype.resolvePresets=function(e,r,t){return e.map(function(e){var i=void 0;if(Array.isArray(e)){if(e.length>2)throw new Error("Unexpected extra options "+(0,_stringify2["default"])(e.slice(2))+" passed to preset.");var o=e;e=o[0],i=o[1]}var n=void 0;try{if("string"==typeof e){if(n=(0,_resolve2["default"])("babel-preset-"+e,r)||(0,_resolve2["default"])(e,r),!n){var a=e.match(/^(@[^\/]+)\/(.+)$/);if(a){var s=a[1],u=a[2];e=s+"/babel-preset-"+u,n=(0,_resolve2["default"])(e,r)}}if(!n)throw new Error("Couldn't find preset "+(0,_stringify2["default"])(e)+" relative to directory "+(0,_stringify2["default"])(r));e=__webpack_require__(6)(n)}if("object"===("undefined"==typeof e?"undefined":(0,_typeof3["default"])(e))&&e.__esModule)if(e["default"])e=e["default"];else{var l=e,f=(l.__esModule,(0,_objectWithoutProperties3["default"])(l,["__esModule"]));e=f}if("object"===("undefined"==typeof e?"undefined":(0,_typeof3["default"])(e))&&e.buildPreset&&(e=e.buildPreset),"function"!=typeof e&&void 0!==i)throw new Error("Options "+(0,_stringify2["default"])(i)+" passed to "+(n||"a preset")+" which does not accept options.");if("function"==typeof e&&(e=e(context,i)),"object"!==("undefined"==typeof e?"undefined":(0,_typeof3["default"])(e)))throw new Error("Unsupported preset format: "+e+".");t&&t(e,n)}catch(p){throw n&&(p.message+=" (While processing preset: "+(0,_stringify2["default"])(n)+")"),p}return e})},e.prototype.normaliseOptions=function(){var e=this.options;for(var r in _config3["default"]){var t=_config3["default"][r],i=e[r];!i&&t.optional||(t.alias?e[t.alias]=e[t.alias]||i:e[r]=i)}},e.prototype.init=function(){for(var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=(0,_buildConfigChain2["default"])(e,this.log),t=Array.isArray(r),i=0,r=t?r:(0,_getIterator3["default"])(r);;){var o;if(t){if(i>=r.length)break;o=r[i++]}else{if(i=r.next(),i.done)break;o=i.value}var n=o;this.mergeOptions(n)}return this.normaliseOptions(e),this.options},e}();exports["default"]=OptionManager,OptionManager.memoisedPlugins=[],module.exports=exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/plugin.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_optionManager=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/option-manager.js"),_optionManager2=_interopRequireDefault(_optionManager),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_store=__webpack_require__("./node_modules/babel-core/lib/store.js"),_store2=_interopRequireDefault(_store),_babelTraverse=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_babelTraverse2=_interopRequireDefault(_babelTraverse),_assign=__webpack_require__("./node_modules/lodash/assign.js"),_assign2=_interopRequireDefault(_assign),_clone=__webpack_require__("./node_modules/lodash/clone.js"),_clone2=_interopRequireDefault(_clone),GLOBAL_VISITOR_PROPS=["enter","exit"],Plugin=function(e){function Plugin(r,t){(0,_classCallCheck3["default"])(this,Plugin);var i=(0,_possibleConstructorReturn3["default"])(this,e.call(this));return i.initialized=!1,i.raw=(0,_assign2["default"])({},r),i.key=i.take("name")||t,i.manipulateOptions=i.take("manipulateOptions"),i.post=i.take("post"),i.pre=i.take("pre"),i.visitor=i.normaliseVisitor((0,_clone2["default"])(i.take("visitor"))||{}),i}return(0,_inherits3["default"])(Plugin,e),Plugin.prototype.take=function(e){var r=this.raw[e];return delete this.raw[e],r},Plugin.prototype.chain=function(e,r){if(!e[r])return this[r];if(!this[r])return e[r];var t=[e[r],this[r]];return function(){for(var e=void 0,r=arguments.length,i=Array(r),a=0;a<r;a++)i[a]=arguments[a];for(var s=t,n=Array.isArray(s),o=0,s=n?s:(0,_getIterator3["default"])(s);;){var l;if(n){if(o>=s.length)break;l=s[o++]}else{if(o=s.next(),o.done)break;l=o.value}var u=l;if(u){var p=u.apply(this,i);null!=p&&(e=p)}}return e}},Plugin.prototype.maybeInherit=function(e){var r=this.take("inherits");r&&(r=_optionManager2["default"].normalisePlugin(r,e,"inherits"),this.manipulateOptions=this.chain(r,"manipulateOptions"),this.post=this.chain(r,"post"),this.pre=this.chain(r,"pre"),this.visitor=_babelTraverse2["default"].visitors.merge([r.visitor,this.visitor]))},Plugin.prototype.init=function(e,r){if(!this.initialized){this.initialized=!0,this.maybeInherit(e);for(var t in this.raw)throw new Error(messages.get("pluginInvalidProperty",e,r,t))}},Plugin.prototype.normaliseVisitor=function(e){for(var r=GLOBAL_VISITOR_PROPS,t=Array.isArray(r),i=0,r=t?r:(0,_getIterator3["default"])(r);;){var a;if(t){if(i>=r.length)break;a=r[i++]}else{if(i=r.next(),i.done)break;a=i.value}var s=a;if(e[s])throw new Error("Plugins aren't allowed to specify catch-all enter/exit handlers. Please target individual nodes.")}return _babelTraverse2["default"].explode(e),e},Plugin}(_store2["default"]);exports["default"]=Plugin,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-core/lib/store.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _map=__webpack_require__("./node_modules/babel-runtime/core-js/map.js"),_map2=_interopRequireDefault(_map),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),Store=function(e){function t(){(0,_classCallCheck3["default"])(this,t);var r=(0,_possibleConstructorReturn3["default"])(this,e.call(this));return r.dynamicData={},r}return(0,_inherits3["default"])(t,e),t.prototype.setDynamic=function(e,t){this.dynamicData[e]=t},t.prototype.get=function(t){if(this.has(t))return e.prototype.get.call(this,t);if(Object.prototype.hasOwnProperty.call(this.dynamicData,t)){var r=this.dynamicData[t]();return this.set(t,r),r}},t}(_map2["default"]);exports["default"]=Store,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/options/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(r){return r&&r.__esModule?r:{"default":r}}function _interopRequireWildcard(r){if(r&&r.__esModule)return r;var e={};if(null!=r)for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);return e["default"]=r,e}function normaliseOptions(){var r=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];for(var e in r){var i=r[e];if(null!=i){var o=_config2["default"][e];if(o&&o.alias&&(o=_config2["default"][o.alias]),o){var n=parsers[o.type];n&&(i=n(i)),r[e]=i}}}return r}exports.__esModule=!0,exports.config=void 0,exports.normaliseOptions=normaliseOptions;var _parsers=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/parsers.js"),parsers=_interopRequireWildcard(_parsers),_config=__webpack_require__("./node_modules/babel-core/lib/transformation/file/options/config.js"),_config2=_interopRequireDefault(_config);exports.config=_config2["default"];

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/options/parsers.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function boolean(e){return!!e}function booleanString(e){return util.booleanify(e)}function list(e){return util.list(e)}exports.__esModule=!0,exports.filename=void 0,exports["boolean"]=boolean,exports.booleanString=booleanString,exports.list=list;var _slash=__webpack_require__("./node_modules/slash/index.js"),_slash2=_interopRequireDefault(_slash),_util=__webpack_require__("./node_modules/babel-core/lib/util.js"),util=_interopRequireWildcard(_util),filename=exports.filename=_slash2["default"];

/***/ },

/***/ "./node_modules/slash/index.js":
/***/ function(module, exports) {

	"use strict";module.exports=function(t){var e=/^\\\\\?\\/.test(t),r=/[^\x00-\x80]+/.test(t);return e||r?t:t.replace(/\\/g,"/")};

/***/ },

/***/ "./node_modules/babel-core/lib/util.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function canCompile(e,r){var t=r||canCompile.EXTENSIONS,i=_path2["default"].extname(e);return(0,_includes2["default"])(t,i)}function list(e){return e?Array.isArray(e)?e:"string"==typeof e?e.split(","):[e]:[]}function regexify(e){if(!e)return new RegExp(/.^/);if(Array.isArray(e)&&(e=new RegExp(e.map(_escapeRegExp2["default"]).join("|"),"i")),"string"==typeof e){e=(0,_slash2["default"])(e),((0,_startsWith2["default"])(e,"./")||(0,_startsWith2["default"])(e,"*/"))&&(e=e.slice(2)),(0,_startsWith2["default"])(e,"**/")&&(e=e.slice(3));var r=_minimatch2["default"].makeRe(e,{nocase:!0});return new RegExp(r.source.slice(1,-1),"i")}if((0,_isRegExp2["default"])(e))return e;throw new TypeError("illegal type for regexify")}function arrayify(e,r){return e?(0,_isBoolean2["default"])(e)?arrayify([e],r):(0,_isString2["default"])(e)?arrayify(list(e),r):Array.isArray(e)?(r&&(e=e.map(r)),e):[e]:[]}function booleanify(e){return"true"===e||1==e||!("false"===e||0==e||!e)&&e}function shouldIgnore(e){var r=arguments.length<=1||void 0===arguments[1]?[]:arguments[1],t=arguments[2];if(e=(0,_slash2["default"])(e),t){for(var i=t,a=Array.isArray(i),n=0,i=a?i:(0,_getIterator3["default"])(i);;){var s;if(a){if(n>=i.length)break;s=i[n++]}else{if(n=i.next(),n.done)break;s=n.value}var u=s;if(_shouldIgnore(u,e))return!1}return!0}if(r.length)for(var o=r,l=Array.isArray(o),f=0,o=l?o:(0,_getIterator3["default"])(o);;){var _;if(l){if(f>=o.length)break;_=o[f++]}else{if(f=o.next(),f.done)break;_=f.value}var p=_;if(_shouldIgnore(p,e))return!0}return!1}function _shouldIgnore(e,r){return"function"==typeof e?e(r):e.test(r)}exports.__esModule=!0,exports.inspect=exports.inherits=void 0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_util=__webpack_require__("./node_modules/util/util.js");Object.defineProperty(exports,"inherits",{enumerable:!0,get:function(){return _util.inherits}}),Object.defineProperty(exports,"inspect",{enumerable:!0,get:function(){return _util.inspect}}),exports.canCompile=canCompile,exports.list=list,exports.regexify=regexify,exports.arrayify=arrayify,exports.booleanify=booleanify,exports.shouldIgnore=shouldIgnore;var _escapeRegExp=__webpack_require__("./node_modules/lodash/escapeRegExp.js"),_escapeRegExp2=_interopRequireDefault(_escapeRegExp),_startsWith=__webpack_require__("./node_modules/lodash/startsWith.js"),_startsWith2=_interopRequireDefault(_startsWith),_isBoolean=__webpack_require__("./node_modules/lodash/isBoolean.js"),_isBoolean2=_interopRequireDefault(_isBoolean),_minimatch=__webpack_require__("./node_modules/minimatch/minimatch.js"),_minimatch2=_interopRequireDefault(_minimatch),_includes=__webpack_require__("./node_modules/lodash/includes.js"),_includes2=_interopRequireDefault(_includes),_isString=__webpack_require__("./node_modules/lodash/isString.js"),_isString2=_interopRequireDefault(_isString),_isRegExp=__webpack_require__("./node_modules/lodash/isRegExp.js"),_isRegExp2=_interopRequireDefault(_isRegExp),_path=__webpack_require__("./node_modules/path-browserify/index.js"),_path2=_interopRequireDefault(_path),_slash=__webpack_require__("./node_modules/slash/index.js"),_slash2=_interopRequireDefault(_slash);canCompile.EXTENSIONS=[".js",".jsx",".es6",".es"];

/***/ },

/***/ "./node_modules/lodash/escapeRegExp.js":
/***/ function(module, exports, __webpack_require__) {

	function escapeRegExp(e){return e=toString(e),e&&reHasRegExpChar.test(e)?e.replace(reRegExpChar,"\\$&"):e}var toString=__webpack_require__("./node_modules/lodash/toString.js"),reRegExpChar=/[\\^$.*+?()[\]{}|]/g,reHasRegExpChar=RegExp(reRegExpChar.source);module.exports=escapeRegExp;

/***/ },

/***/ "./node_modules/lodash/startsWith.js":
/***/ function(module, exports, __webpack_require__) {

	function startsWith(e,t,r){return e=toString(e),r=baseClamp(toInteger(r),0,e.length),t=baseToString(t),e.slice(r,r+t.length)==t}var baseClamp=__webpack_require__("./node_modules/lodash/_baseClamp.js"),baseToString=__webpack_require__("./node_modules/lodash/_baseToString.js"),toInteger=__webpack_require__("./node_modules/lodash/toInteger.js"),toString=__webpack_require__("./node_modules/lodash/toString.js");module.exports=startsWith;

/***/ },

/***/ "./node_modules/lodash/_baseClamp.js":
/***/ function(module, exports) {

	function baseClamp(e,o,a){return e===e&&(void 0!==a&&(e=e<=a?e:a),void 0!==o&&(e=e>=o?e:o)),e}module.exports=baseClamp;

/***/ },

/***/ "./node_modules/lodash/isBoolean.js":
/***/ function(module, exports, __webpack_require__) {

	function isBoolean(o){return o===!0||o===!1||isObjectLike(o)&&objectToString.call(o)==boolTag}var isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js"),boolTag="[object Boolean]",objectProto=Object.prototype,objectToString=objectProto.toString;module.exports=isBoolean;

/***/ },

/***/ "./node_modules/minimatch/minimatch.js":
/***/ function(module, exports, __webpack_require__) {

	function charSet(t){return t.split("").reduce(function(t,e){return t[e]=!0,t},{})}function filter(t,e){return e=e||{},function(n,i,r){return minimatch(n,t,e)}}function ext(t,e){t=t||{},e=e||{};var n={};return Object.keys(e).forEach(function(t){n[t]=e[t]}),Object.keys(t).forEach(function(e){n[e]=t[e]}),n}function minimatch(t,e,n){if("string"!=typeof e)throw new TypeError("glob pattern string required");return n||(n={}),!(!n.nocomment&&"#"===e.charAt(0))&&(""===e.trim()?""===t:new Minimatch(e,n).match(t))}function Minimatch(t,e){if(!(this instanceof Minimatch))return new Minimatch(t,e);if("string"!=typeof t)throw new TypeError("glob pattern string required");e||(e={}),t=t.trim(),"/"!==path.sep&&(t=t.split(path.sep).join("/")),this.options=e,this.set=[],this.pattern=t,this.regexp=null,this.negate=!1,this.comment=!1,this.empty=!1,this.make()}function make(){if(!this._made){var t=this.pattern,e=this.options;if(!e.nocomment&&"#"===t.charAt(0))return void(this.comment=!0);if(!t)return void(this.empty=!0);this.parseNegate();var n=this.globSet=this.braceExpand();e.debug&&(this.debug=console.error),this.debug(this.pattern,n),n=this.globParts=n.map(function(t){return t.split(slashSplit)}),this.debug(this.pattern,n),n=n.map(function(t,e,n){return t.map(this.parse,this)},this),this.debug(this.pattern,n),n=n.filter(function(t){return t.indexOf(!1)===-1}),this.debug(this.pattern,n),this.set=n}}function parseNegate(){var t=this.pattern,e=!1,n=this.options,i=0;if(!n.nonegate){for(var r=0,a=t.length;r<a&&"!"===t.charAt(r);r++)e=!e,i++;i&&(this.pattern=t.substr(i)),this.negate=e}}function braceExpand(t,e){if(e||(e=this instanceof Minimatch?this.options:{}),t="undefined"==typeof t?this.pattern:t,"undefined"==typeof t)throw new TypeError("undefined pattern");return e.nobrace||!t.match(/\{.*\}/)?[t]:expand(t)}function parse(t,e){function n(){if(r){switch(r){case"*":s+=star,h=!0;break;case"?":s+=qmark,h=!0;break;default:s+="\\"+r}g.debug("clearStateChar %j %j",r,s),r=!1}}if(t.length>65536)throw new TypeError("pattern is too long");var i=this.options;if(!i.noglobstar&&"**"===t)return GLOBSTAR;if(""===t)return"";for(var r,a,s="",h=!!i.nocase,c=!1,o=[],p=[],u=!1,f=-1,l=-1,m="."===t.charAt(0)?"":i.dot?"(?!(?:^|\\/)\\.{1,2}(?:$|\\/))":"(?!\\.)",g=this,d=0,b=t.length;d<b&&(a=t.charAt(d));d++)if(this.debug("%s\t%s %s %j",t,d,s,a),c&&reSpecials[a])s+="\\"+a,c=!1;else switch(a){case"/":return!1;case"\\":n(),c=!0;continue;case"?":case"*":case"+":case"@":case"!":if(this.debug("%s\t%s %s %j <-- stateChar",t,d,s,a),u){this.debug("  in class"),"!"===a&&d===l+1&&(a="^"),s+=a;continue}g.debug("call clearStateChar %j",r),n(),r=a,i.noext&&n();continue;case"(":if(u){s+="(";continue}if(!r){s+="\\(";continue}o.push({type:r,start:d-1,reStart:s.length,open:plTypes[r].open,close:plTypes[r].close}),s+="!"===r?"(?:(?!(?:":"(?:",this.debug("plType %j %j",r,s),r=!1;continue;case")":if(u||!o.length){s+="\\)";continue}n(),h=!0;var v=o.pop();s+=v.close,"!"===v.type&&p.push(v),v.reEnd=s.length;continue;case"|":if(u||!o.length||c){s+="\\|",c=!1;continue}n(),s+="|";continue;case"[":if(n(),u){s+="\\"+a;continue}u=!0,l=d,f=s.length,s+=a;continue;case"]":if(d===l+1||!u){s+="\\"+a,c=!1;continue}if(u){var y=t.substring(l+1,d);try{RegExp("["+y+"]")}catch(S){var w=this.parse(y,SUBPARSE);s=s.substr(0,f)+"\\["+w[0]+"\\]",h=h||w[1],u=!1;continue}}h=!0,u=!1,s+=a;continue;default:n(),c?c=!1:!reSpecials[a]||"^"===a&&u||(s+="\\"),s+=a}for(u&&(y=t.substr(l+1),w=this.parse(y,SUBPARSE),s=s.substr(0,f)+"\\["+w[0],h=h||w[1]),v=o.pop();v;v=o.pop()){var E=s.slice(v.reStart+v.open.length);this.debug("setting tail",s,v),E=E.replace(/((?:\\{2}){0,64})(\\?)\|/g,function(t,e,n){return n||(n="\\"),e+e+n+"|"}),this.debug("tail=%j\n   %s",E,E,v,s);var x="*"===v.type?star:"?"===v.type?qmark:"\\"+v.type;h=!0,s=s.slice(0,v.reStart)+x+"\\("+E}n(),c&&(s+="\\\\");var M=!1;switch(s.charAt(0)){case".":case"[":case"(":M=!0}for(var R=p.length-1;R>-1;R--){var k=p[R],A=s.slice(0,k.reStart),O=s.slice(k.reStart,k.reEnd-8),j=s.slice(k.reEnd-8,k.reEnd),T=s.slice(k.reEnd);j+=T;var B=A.split("(").length-1,$=T;for(d=0;d<B;d++)$=$.replace(/\)[+*?]?/,"");T=$;var L="";""===T&&e!==SUBPARSE&&(L="$");var q=A+O+T+L+j;s=q}if(""!==s&&h&&(s="(?=.)"+s),M&&(s=m+s),e===SUBPARSE)return[s,h];if(!h)return globUnescape(t);var N=i.nocase?"i":"";try{var G=new RegExp("^"+s+"$",N)}catch(S){return new RegExp("$.")}return G._glob=t,G._src=s,G}function makeRe(){if(this.regexp||this.regexp===!1)return this.regexp;var t=this.set;if(!t.length)return this.regexp=!1,this.regexp;var e=this.options,n=e.noglobstar?star:e.dot?twoStarDot:twoStarNoDot,i=e.nocase?"i":"",r=t.map(function(t){return t.map(function(t){return t===GLOBSTAR?n:"string"==typeof t?regExpEscape(t):t._src}).join("\\/")}).join("|");r="^(?:"+r+")$",this.negate&&(r="^(?!"+r+").*$");try{this.regexp=new RegExp(r,i)}catch(a){this.regexp=!1}return this.regexp}function match(t,e){if(this.debug("match",t,this.pattern),this.comment)return!1;if(this.empty)return""===t;if("/"===t&&e)return!0;var n=this.options;"/"!==path.sep&&(t=t.split(path.sep).join("/")),t=t.split(slashSplit),this.debug(this.pattern,"split",t);var i=this.set;this.debug(this.pattern,"set",i);var r,a;for(a=t.length-1;a>=0&&!(r=t[a]);a--);for(a=0;a<i.length;a++){var s=i[a],h=t;n.matchBase&&1===s.length&&(h=[r]);var c=this.matchOne(h,s,e);if(c)return!!n.flipNegate||!this.negate}return!n.flipNegate&&this.negate}function globUnescape(t){return t.replace(/\\(.)/g,"$1")}function regExpEscape(t){return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}module.exports=minimatch,minimatch.Minimatch=Minimatch;var path={sep:"/"};try{path=__webpack_require__("./node_modules/path-browserify/index.js")}catch(er){}var GLOBSTAR=minimatch.GLOBSTAR=Minimatch.GLOBSTAR={},expand=__webpack_require__("./node_modules/brace-expansion/index.js"),plTypes={"!":{open:"(?:(?!(?:",close:"))[^/]*?)"},"?":{open:"(?:",close:")?"},"+":{open:"(?:",close:")+"},"*":{open:"(?:",close:")*"},"@":{open:"(?:",close:")"}},qmark="[^/]",star=qmark+"*?",twoStarDot="(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?",twoStarNoDot="(?:(?!(?:\\/|^)\\.).)*?",reSpecials=charSet("().*{}+?[]^$\\!"),slashSplit=/\/+/;minimatch.filter=filter,minimatch.defaults=function(t){if(!t||!Object.keys(t).length)return minimatch;var e=minimatch,n=function(n,i,r){return e.minimatch(n,i,ext(t,r))};return n.Minimatch=function(n,i){return new e.Minimatch(n,ext(t,i))},n},Minimatch.defaults=function(t){return t&&Object.keys(t).length?minimatch.defaults(t).Minimatch:Minimatch},Minimatch.prototype.debug=function(){},Minimatch.prototype.make=make,Minimatch.prototype.parseNegate=parseNegate,minimatch.braceExpand=function(t,e){return braceExpand(t,e)},Minimatch.prototype.braceExpand=braceExpand,Minimatch.prototype.parse=parse;var SUBPARSE={};minimatch.makeRe=function(t,e){return new Minimatch(t,e||{}).makeRe()},Minimatch.prototype.makeRe=makeRe,minimatch.match=function(t,e,n){n=n||{};var i=new Minimatch(e,n);return t=t.filter(function(t){return i.match(t)}),i.options.nonull&&!t.length&&t.push(e),t},Minimatch.prototype.match=match,Minimatch.prototype.matchOne=function(t,e,n){var i=this.options;this.debug("matchOne",{"this":this,file:t,pattern:e}),this.debug("matchOne",t.length,e.length);for(var r=0,a=0,s=t.length,h=e.length;r<s&&a<h;r++,a++){this.debug("matchOne loop");var c=e[a],o=t[r];if(this.debug(e,c,o),c===!1)return!1;if(c===GLOBSTAR){this.debug("GLOBSTAR",[e,c,o]);var p=r,u=a+1;if(u===h){for(this.debug("** at the end");r<s;r++)if("."===t[r]||".."===t[r]||!i.dot&&"."===t[r].charAt(0))return!1;return!0}for(;p<s;){var f=t[p];if(this.debug("\nglobstar while",t,p,e,u,f),this.matchOne(t.slice(p),e.slice(u),n))return this.debug("globstar found match!",p,s,f),!0;if("."===f||".."===f||!i.dot&&"."===f.charAt(0)){this.debug("dot detected!",t,p,e,u);break}this.debug("globstar swallow a segment, and continue"),p++}return!(!n||(this.debug("\n>>> no match, partial?",t,p,e,u),p!==s))}var l;if("string"==typeof c?(l=i.nocase?o.toLowerCase()===c.toLowerCase():o===c,this.debug("string match",c,o,l)):(l=o.match(c),this.debug("pattern match",c,o,l)),!l)return!1}if(r===s&&a===h)return!0;if(r===s)return n;if(a===h){var m=r===s-1&&""===t[r];return m}throw new Error("wtf?")};

/***/ },

/***/ "./node_modules/brace-expansion/index.js":
/***/ function(module, exports, __webpack_require__) {

	function numeric(e){return parseInt(e,10)==e?parseInt(e,10):e.charCodeAt(0)}function escapeBraces(e){return e.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod)}function unescapeBraces(e){return e.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".")}function parseCommaParts(e){if(!e)return[""];var n=[],t=balanced("{","}",e);if(!t)return e.split(",");var r=t.pre,a=t.body,s=t.post,o=r.split(",");o[o.length-1]+="{"+a+"}";var i=parseCommaParts(s);return s.length&&(o[o.length-1]+=i.shift(),o.push.apply(o,i)),n.push.apply(n,o),n}function expandTop(e){return e?("{}"===e.substr(0,2)&&(e="\\{\\}"+e.substr(2)),expand(escapeBraces(e),!0).map(unescapeBraces)):[]}function identity(e){return e}function embrace(e){return"{"+e+"}"}function isPadded(e){return/^-?0\d/.test(e)}function lte(e,n){return e<=n}function gte(e,n){return e>=n}function expand(e,n){var t=[],r=balanced("{","}",e);if(!r||/\$$/.test(r.pre))return[e];var a=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(r.body),s=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(r.body),o=a||s,i=/^(.*,)+(.+)?$/.test(r.body);if(!o&&!i)return r.post.match(/,.*\}/)?(e=r.pre+"{"+r.body+escClose+r.post,expand(e)):[e];var p;if(o)p=r.body.split(/\.\./);else if(p=parseCommaParts(r.body),1===p.length&&(p=expand(p[0],!1).map(embrace),1===p.length)){var c=r.post.length?expand(r.post,!1):[""];return c.map(function(e){return r.pre+p[0]+e})}var l,u=r.pre,c=r.post.length?expand(r.post,!1):[""];if(o){var d=numeric(p[0]),m=numeric(p[1]),h=Math.max(p[0].length,p[1].length),f=3==p.length?Math.abs(numeric(p[2])):1,v=lte,g=m<d;g&&(f*=-1,v=gte);var b=p.some(isPadded);l=[];for(var C=d;v(C,m);C+=f){var j;if(s)j=String.fromCharCode(C),"\\"===j&&(j="");else if(j=String(C),b){var x=h-j.length;if(x>0){var y=new Array(x+1).join("0");j=C<0?"-"+y+j.slice(1):y+j}}l.push(j)}}else l=concatMap(p,function(e){return expand(e,!1)});for(var M=0;M<l.length;M++)for(var P=0;P<c.length;P++){var S=u+l[M]+c[P];(!n||o||S)&&t.push(S)}return t}var concatMap=__webpack_require__("./node_modules/concat-map/index.js"),balanced=__webpack_require__("./node_modules/balanced-match/index.js");module.exports=expandTop;var escSlash="\0SLASH"+Math.random()+"\0",escOpen="\0OPEN"+Math.random()+"\0",escClose="\0CLOSE"+Math.random()+"\0",escComma="\0COMMA"+Math.random()+"\0",escPeriod="\0PERIOD"+Math.random()+"\0";

/***/ },

/***/ "./node_modules/concat-map/index.js":
/***/ function(module, exports) {

	module.exports=function(r,t){for(var a=[],o=0;o<r.length;o++){var e=t(r[o],o);isArray(e)?a.push.apply(a,e):a.push(e)}return a};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)};

/***/ },

/***/ "./node_modules/balanced-match/index.js":
/***/ function(module, exports) {

	function balanced(e,n,a){e instanceof RegExp&&(e=maybeMatch(e,a)),n instanceof RegExp&&(n=maybeMatch(n,a));var t=range(e,n,a);return t&&{start:t[0],end:t[1],pre:a.slice(0,t[0]),body:a.slice(t[0]+e.length,t[1]),post:a.slice(t[1]+n.length)}}function maybeMatch(e,n){var a=n.match(e);return a?a[0]:null}function range(e,n,a){var t,r,c,l,i,o=a.indexOf(e),f=a.indexOf(n,o+1),g=o;if(o>=0&&f>0){for(t=[],c=a.length;g>=0&&!i;)g==o?(t.push(g),o=a.indexOf(e,g+1)):1==t.length?i=[t.pop(),f]:(r=t.pop(),r<c&&(c=r,l=f),f=a.indexOf(n,g+1)),g=o<f&&o>=0?o:f;t.length&&(i=[c,l])}return i}module.exports=balanced,balanced.range=range;

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/options/config.js":
/***/ function(module, exports) {

	"use strict";module.exports={filename:{type:"filename",description:"filename to use when reading from stdin - this will be used in source-maps, errors etc","default":"unknown",shorthand:"f"},filenameRelative:{hidden:!0,type:"string"},inputSourceMap:{hidden:!0},env:{hidden:!0,"default":{}},mode:{description:"",hidden:!0},retainLines:{type:"boolean","default":!1,description:"retain line numbers - will result in really ugly code"},highlightCode:{description:"enable/disable ANSI syntax highlighting of code frames (on by default)",type:"boolean","default":!0},suppressDeprecationMessages:{type:"boolean","default":!1,hidden:!0},presets:{type:"list",description:"","default":[]},plugins:{type:"list","default":[],description:""},ignore:{type:"list",description:"list of glob paths to **not** compile","default":[]},only:{type:"list",description:"list of glob paths to **only** compile"},code:{hidden:!0,"default":!0,type:"boolean"},metadata:{hidden:!0,"default":!0,type:"boolean"},ast:{hidden:!0,"default":!0,type:"boolean"},"extends":{type:"string",hidden:!0},comments:{type:"boolean","default":!0,description:"write comments to generated output (true by default)"},shouldPrintComment:{hidden:!0,description:"optional callback to control whether a comment should be inserted, when this is used the comments option is ignored"},wrapPluginVisitorMethod:{hidden:!0,description:"optional callback to wrap all visitor methods"},compact:{type:"booleanString","default":"auto",description:"do not include superfluous whitespace characters and line terminators [true|false|auto]"},minified:{type:"boolean","default":!1,description:"save as much bytes when printing [true|false]"},sourceMap:{alias:"sourceMaps",hidden:!0},sourceMaps:{type:"booleanString",description:"[true|false|inline]","default":!1,shorthand:"s"},sourceMapTarget:{type:"string",description:"set `file` on returned source map"},sourceFileName:{type:"string",description:"set `sources[0]` on returned source map"},sourceRoot:{type:"filename",description:"the root from which all sources are relative"},babelrc:{description:"Whether or not to look up .babelrc and .babelignore files",type:"boolean","default":!0},sourceType:{description:"","default":"module"},auxiliaryCommentBefore:{type:"string",description:"print a comment before any injected non-user code"},auxiliaryCommentAfter:{type:"string",description:"print a comment after any injected non-user code"},resolveModuleSource:{hidden:!0},getModuleId:{hidden:!0},moduleRoot:{type:"filename",description:"optional prefix for the AMD module formatter that will be prepend to the filename on module definitions"},moduleIds:{type:"boolean","default":!1,shorthand:"M",description:"insert an explicit id for modules"},moduleId:{description:"specify a custom name for module ids",type:"string"},passPerPreset:{description:"Whether to spawn a traversal pass per a preset. By default all presets are merged.",type:"boolean","default":!1,hidden:!0},parserOpts:{description:"Options to pass into the parser, or to change parsers (parserOpts.parser)","default":!1},generatorOpts:{description:"Options to pass into the generator, or to change generators (generatorOpts.generator)","default":!1}};

/***/ },

/***/ "./node_modules/babel-core/lib/helpers/resolve.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2);exports["default"]=function(e){var t=arguments.length<=1||void 0===arguments[1]?process.cwd():arguments[1];if("object"===("undefined"==typeof _module2["default"]?"undefined":(0,_typeof3["default"])(_module2["default"])))return null;var u=relativeModules[t];if(!u){u=new _module2["default"];var l=_path2["default"].join(t,".babelrc");u.id=l,u.filename=l,u.paths=_module2["default"]._nodeModulePaths(t),relativeModules[t]=u}try{return _module2["default"]._resolveFilename(e,u)}catch(r){return null}};var _module=__webpack_require__("./node_modules/webpack/node_modules/node-libs-browser/mock/empty.js"),_module2=_interopRequireDefault(_module),_path=__webpack_require__("./node_modules/path-browserify/index.js"),_path2=_interopRequireDefault(_path),relativeModules={};module.exports=exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/lodash/cloneDeepWith.js":
/***/ function(module, exports, __webpack_require__) {

	function cloneDeepWith(e,n){return baseClone(e,!0,!0,n)}var baseClone=__webpack_require__("./node_modules/lodash/_baseClone.js");module.exports=cloneDeepWith;

/***/ },

/***/ "./node_modules/babel-core/lib/helpers/merge.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e,r){if(e&&r)return(0,_mergeWith2["default"])(e,r,function(e,r){if(r&&Array.isArray(e)){for(var t=r.slice(0),i=e,a=Array.isArray(i),u=0,i=a?i:(0,_getIterator3["default"])(i);;){var o;if(a){if(u>=i.length)break;o=i[u++]}else{if(u=i.next(),u.done)break;o=u.value}var f=o;t.indexOf(f)<0&&t.push(f)}return t}})};var _mergeWith=__webpack_require__("./node_modules/lodash/mergeWith.js"),_mergeWith2=_interopRequireDefault(_mergeWith);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/lodash/mergeWith.js":
/***/ function(module, exports, __webpack_require__) {

	var baseMerge=__webpack_require__("./node_modules/lodash/_baseMerge.js"),createAssigner=__webpack_require__("./node_modules/lodash/_createAssigner.js"),mergeWith=createAssigner(function(e,r,s,g){baseMerge(e,r,s,g)});module.exports=mergeWith;

/***/ },

/***/ "./node_modules/lodash/_baseMerge.js":
/***/ function(module, exports, __webpack_require__) {

	function baseMerge(e,r,s,a,i){e!==r&&baseFor(r,function(b,g){if(isObject(b))i||(i=new Stack),baseMergeDeep(e,r,g,s,baseMerge,a,i);else{var u=a?a(e[g],b,g+"",e,r,i):void 0;void 0===u&&(u=b),assignMergeValue(e,g,u)}},keysIn)}var Stack=__webpack_require__("./node_modules/lodash/_Stack.js"),assignMergeValue=__webpack_require__("./node_modules/lodash/_assignMergeValue.js"),baseFor=__webpack_require__("./node_modules/lodash/_baseFor.js"),baseMergeDeep=__webpack_require__("./node_modules/lodash/_baseMergeDeep.js"),isObject=__webpack_require__("./node_modules/lodash/isObject.js"),keysIn=__webpack_require__("./node_modules/lodash/keysIn.js");module.exports=baseMerge;

/***/ },

/***/ "./node_modules/lodash/_assignMergeValue.js":
/***/ function(module, exports, __webpack_require__) {

	function assignMergeValue(e,s,a){(void 0===a||eq(e[s],a))&&(void 0!==a||s in e)||baseAssignValue(e,s,a)}var baseAssignValue=__webpack_require__("./node_modules/lodash/_baseAssignValue.js"),eq=__webpack_require__("./node_modules/lodash/eq.js");module.exports=assignMergeValue;

/***/ },

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/***/ function(module, exports, __webpack_require__) {

	function baseMergeDeep(e,r,i,s,a,n,t){var u=e[i],c=r[i],y=t.get(c);if(y)return void assignMergeValue(e,i,y);var o=n?n(u,c,i+"",e,r,t):void 0,l=void 0===o;if(l){var A=isArray(c),b=!A&&isBuffer(c),f=!A&&!b&&isTypedArray(c);o=c,A||b||f?isArray(u)?o=u:isArrayLikeObject(u)?o=copyArray(u):b?(l=!1,o=cloneBuffer(c,!0)):f?(l=!1,o=cloneTypedArray(c,!0)):o=[]:isPlainObject(c)||isArguments(c)?(o=u,isArguments(u)?o=toPlainObject(u):(!isObject(u)||s&&isFunction(u))&&(o=initCloneObject(c))):l=!1}l&&(t.set(c,o),a(o,c,s,n,t),t["delete"](c)),assignMergeValue(e,i,o)}var assignMergeValue=__webpack_require__("./node_modules/lodash/_assignMergeValue.js"),cloneBuffer=__webpack_require__("./node_modules/lodash/_cloneBuffer.js"),cloneTypedArray=__webpack_require__("./node_modules/lodash/_cloneTypedArray.js"),copyArray=__webpack_require__("./node_modules/lodash/_copyArray.js"),initCloneObject=__webpack_require__("./node_modules/lodash/_initCloneObject.js"),isArguments=__webpack_require__("./node_modules/lodash/isArguments.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js"),isArrayLikeObject=__webpack_require__("./node_modules/lodash/isArrayLikeObject.js"),isBuffer=__webpack_require__("./node_modules/lodash/isBuffer.js"),isFunction=__webpack_require__("./node_modules/lodash/isFunction.js"),isObject=__webpack_require__("./node_modules/lodash/isObject.js"),isPlainObject=__webpack_require__("./node_modules/lodash/isPlainObject.js"),isTypedArray=__webpack_require__("./node_modules/lodash/isTypedArray.js"),toPlainObject=__webpack_require__("./node_modules/lodash/toPlainObject.js");module.exports=baseMergeDeep;

/***/ },

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/***/ function(module, exports, __webpack_require__) {

	function isArrayLikeObject(e){return isObjectLike(e)&&isArrayLike(e)}var isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js"),isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js");module.exports=isArrayLikeObject;

/***/ },

/***/ "./node_modules/lodash/toPlainObject.js":
/***/ function(module, exports, __webpack_require__) {

	function toPlainObject(e){return copyObject(e,keysIn(e))}var copyObject=__webpack_require__("./node_modules/lodash/_copyObject.js"),keysIn=__webpack_require__("./node_modules/lodash/keysIn.js");module.exports=toPlainObject;

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/options/removed.js":
/***/ function(module, exports) {

	"use strict";module.exports={auxiliaryComment:{message:"Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"},blacklist:{message:"Put the specific transforms you want in the `plugins` option"},breakConfig:{message:"This is not a necessary option in Babel 6"},experimental:{message:"Put the specific transforms you want in the `plugins` option"},externalHelpers:{message:"Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"},extra:{message:""},jsxPragma:{message:"use the `pragma` option in the `react-jsx` plugin . Check out http://babeljs.io/docs/plugins/transform-react-jsx/"},loose:{message:"Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."},metadataUsedHelpers:{message:"Not required anymore as this is enabled by default"},modules:{message:"Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"},nonStandard:{message:"Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"},optional:{message:"Put the specific transforms you want in the `plugins` option"},sourceMapName:{message:"Use the `sourceMapTarget` option"},stage:{message:"Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"},whitelist:{message:"Put the specific transforms you want in the `plugins` option"}};

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/options/build-config-chain.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function exists(e){var i=existsCache[e];return null==i?existsCache[e]=_pathExists2["default"].sync(e):i}function buildConfigChain(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],i=arguments[1],t=e.filename,s=new ConfigChainBuilder(i);return e.babelrc!==!1&&s.findConfigs(t),s.mergeConfig({options:e,alias:"base",dirname:t&&_path2["default"].dirname(t)}),s.configs}exports.__esModule=!0;var _assign=__webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js"),_assign2=_interopRequireDefault(_assign),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2);exports["default"]=buildConfigChain;var _resolve=__webpack_require__("./node_modules/babel-core/lib/helpers/resolve.js"),_resolve2=_interopRequireDefault(_resolve),_json=__webpack_require__("./node_modules/json5/lib/json5.js"),_json2=_interopRequireDefault(_json),_pathIsAbsolute=__webpack_require__("./node_modules/path-is-absolute/index.js"),_pathIsAbsolute2=_interopRequireDefault(_pathIsAbsolute),_pathExists=__webpack_require__("./node_modules/path-exists/index.js"),_pathExists2=_interopRequireDefault(_pathExists),_path=__webpack_require__("./node_modules/path-browserify/index.js"),_path2=_interopRequireDefault(_path),_fs=__webpack_require__("./node_modules/webpack/node_modules/node-libs-browser/mock/empty.js"),_fs2=_interopRequireDefault(_fs),existsCache={},jsonCache={},BABELIGNORE_FILENAME=".babelignore",BABELRC_FILENAME=".babelrc",PACKAGE_FILENAME="package.json",ConfigChainBuilder=function(){function e(i){(0,_classCallCheck3["default"])(this,e),this.resolvedConfigs=[],this.configs=[],this.log=i}return e.prototype.findConfigs=function(e){if(e){(0,_pathIsAbsolute2["default"])(e)||(e=_path2["default"].join(process.cwd(),e));for(var i=!1,t=!1;e!==(e=_path2["default"].dirname(e));){if(!i){var s=_path2["default"].join(e,BABELRC_FILENAME);exists(s)&&(this.addConfig(s),i=!0);var a=_path2["default"].join(e,PACKAGE_FILENAME);!i&&exists(a)&&(i=this.addConfig(a,"babel",JSON))}if(!t){var n=_path2["default"].join(e,BABELIGNORE_FILENAME);exists(n)&&(this.addIgnoreConfig(n),t=!0)}if(t&&i)return}}},e.prototype.addIgnoreConfig=function(e){var i=_fs2["default"].readFileSync(e,"utf8"),t=i.split("\n");t=t.map(function(e){return e.replace(/#(.*?)$/,"").trim()}).filter(function(e){return!!e}),t.length&&this.mergeConfig({options:{ignore:t},alias:e,dirname:_path2["default"].dirname(e)})},e.prototype.addConfig=function(e,i){var t=arguments.length<=2||void 0===arguments[2]?_json2["default"]:arguments[2];if(this.resolvedConfigs.indexOf(e)>=0)return!1;this.resolvedConfigs.push(e);var s=_fs2["default"].readFileSync(e,"utf8"),a=void 0;try{a=jsonCache[s]=jsonCache[s]||t.parse(s),i&&(a=a[i])}catch(n){throw n.message=e+": Error while parsing JSON - "+n.message,n}return this.mergeConfig({options:a,alias:e,dirname:_path2["default"].dirname(e)}),!!a},e.prototype.mergeConfig=function(e){var i=e.options,t=e.alias,s=e.loc,a=e.dirname;if(!i)return!1;if(i=(0,_assign2["default"])({},i),a=a||process.cwd(),s=s||t,i["extends"]){var n=(0,_resolve2["default"])(i["extends"],a);n?this.addConfig(n):this.log&&this.log.error("Couldn't resolve extends clause of "+i["extends"]+" in "+t),delete i["extends"]}this.configs.push({options:i,alias:t,loc:s,dirname:a});var r=void 0,o=process.env.BABEL_ENV||("production")||"development";i.env&&(r=i.env[o],delete i.env),this.mergeConfig({options:r,alias:t+".env."+o,dirname:a})},e}();module.exports=exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/json5/lib/json5.js":
/***/ function(module, exports, __webpack_require__) {

	var JSON5= true?exports:{};JSON5.parse=function(){"use strict";var r,t,n,e,f={"'":"'",'"':'"',"\\":"\\","/":"/","\n":"",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},i=[" ","\t","\r","\n","\x0B","\f"," ","\ufeff"],o=function(t){var e=new SyntaxError;throw e.message=t,e.at=r,e.text=n,e},u=function(e){return e&&e!==t&&o("Expected '"+e+"' instead of '"+t+"'"),t=n.charAt(r),r+=1,t},a=function(){return n.charAt(r)},c=function(){var r=t;for("_"!==t&&"$"!==t&&(t<"a"||t>"z")&&(t<"A"||t>"Z")&&o("Bad identifier");u()&&("_"===t||"$"===t||t>="a"&&t<="z"||t>="A"&&t<="Z"||t>="0"&&t<="9");)r+=t;return r},s=function(){var r,n="",e="",f=10;if("-"!==t&&"+"!==t||(n=t,u(t)),"I"===t)return r=v(),("number"!=typeof r||isNaN(r))&&o("Unexpected word for number"),"-"===n?-r:r;if("N"===t)return r=v(),isNaN(r)||o("expected word to be NaN"),r;switch("0"===t&&(e+=t,u(),"x"===t||"X"===t?(e+=t,u(),f=16):t>="0"&&t<="9"&&o("Octal literal")),f){case 10:for(;t>="0"&&t<="9";)e+=t,u();if("."===t)for(e+=".";u()&&t>="0"&&t<="9";)e+=t;if("e"===t||"E"===t)for(e+=t,u(),"-"!==t&&"+"!==t||(e+=t,u());t>="0"&&t<="9";)e+=t,u();break;case 16:for(;t>="0"&&t<="9"||t>="A"&&t<="F"||t>="a"&&t<="f";)e+=t,u()}return r="-"===n?-e:+e,isFinite(r)?r:void o("Bad number")},l=function(){var r,n,e,i,c="";if('"'===t||"'"===t)for(e=t;u();){if(t===e)return u(),c;if("\\"===t)if(u(),"u"===t){for(i=0,n=0;n<4&&(r=parseInt(u(),16),isFinite(r));n+=1)i=16*i+r;c+=String.fromCharCode(i)}else if("\r"===t)"\n"===a()&&u();else{if("string"!=typeof f[t])break;c+=f[t]}else{if("\n"===t)break;c+=t}}o("Bad string")},p=function(){"/"!==t&&o("Not an inline comment");do if(u(),"\n"===t||"\r"===t)return void u();while(t)},d=function(){"*"!==t&&o("Not a block comment");do for(u();"*"===t;)if(u("*"),"/"===t)return void u("/");while(t);o("Unterminated block comment")},y=function(){"/"!==t&&o("Not a comment"),u("/"),"/"===t?p():"*"===t?d():o("Unrecognized comment")},g=function(){for(;t;)if("/"===t)y();else{if(!(i.indexOf(t)>=0))return;u()}},v=function(){switch(t){case"t":return u("t"),u("r"),u("u"),u("e"),!0;case"f":return u("f"),u("a"),u("l"),u("s"),u("e"),!1;case"n":return u("n"),u("u"),u("l"),u("l"),null;case"I":return u("I"),u("n"),u("f"),u("i"),u("n"),u("i"),u("t"),u("y"),1/0;case"N":return u("N"),u("a"),u("N"),NaN}o("Unexpected '"+t+"'")},b=function(){var r=[];if("["===t)for(u("["),g();t;){if("]"===t)return u("]"),r;if(","===t?o("Missing array element"):r.push(e()),g(),","!==t)return u("]"),r;u(","),g()}o("Bad array")},N=function(){var r,n={};if("{"===t)for(u("{"),g();t;){if("}"===t)return u("}"),n;if(r='"'===t||"'"===t?l():c(),g(),u(":"),n[r]=e(),g(),","!==t)return u("}"),n;u(","),g()}o("Bad object")};return e=function(){switch(g(),t){case"{":return N();case"[":return b();case'"':case"'":return l();case"-":case"+":case".":return s();default:return t>="0"&&t<="9"?s():v()}},function(f,i){var u;return n=String(f),r=0,t=" ",u=e(),g(),t&&o("Syntax error"),"function"==typeof i?function a(r,t){var n,e,f=r[t];if(f&&"object"==typeof f)for(n in f)Object.prototype.hasOwnProperty.call(f,n)&&(e=a(f,n),void 0!==e?f[n]=e:delete f[n]);return i.call(r,t,f)}({"":u},""):u}}(),JSON5.stringify=function(r,t,n){function e(r){return r>="a"&&r<="z"||r>="A"&&r<="Z"||r>="0"&&r<="9"||"_"===r||"$"===r}function f(r){return r>="a"&&r<="z"||r>="A"&&r<="Z"||"_"===r||"$"===r}function i(r){if("string"!=typeof r)return!1;if(!f(r[0]))return!1;for(var t=1,n=r.length;t<n;){if(!e(r[t]))return!1;t++}return!0}function o(r){return Array.isArray?Array.isArray(r):"[object Array]"===Object.prototype.toString.call(r)}function u(r){return"[object Date]"===Object.prototype.toString.call(r)}function a(r){for(var t=0;t<y.length;t++)if(y[t]===r)throw new TypeError("Converting circular structure to JSON")}function c(r,t,n){if(!r)return"";r.length>10&&(r=r.substring(0,10));for(var e=n?"":"\n",f=0;f<t;f++)e+=r;return e}function s(r){return g.lastIndex=0,g.test(r)?'"'+r.replace(g,function(r){var t=v[r];return"string"==typeof t?t:"\\u"+("0000"+r.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+r+'"'}function l(r,t,n){var e,f,g=p(r,t,n);switch(g&&!u(g)&&(g=g.valueOf()),typeof g){case"boolean":return g.toString();case"number":return isNaN(g)||!isFinite(g)?"null":g.toString();case"string":return s(g.toString());case"object":if(null===g)return"null";if(o(g)){a(g),e="[",y.push(g);for(var v=0;v<g.length;v++)f=l(g,v,!1),e+=c(d,y.length),e+=null===f||"undefined"==typeof f?"null":f,v<g.length-1?e+=",":d&&(e+="\n");y.pop(),e+=c(d,y.length,!0)+"]"}else{a(g),e="{";var b=!1;y.push(g);for(var N in g)if(g.hasOwnProperty(N)){var h=l(g,N,!1);if(n=!1,"undefined"!=typeof h&&null!==h){e+=c(d,y.length),b=!0;var t=i(N)?N:s(N);e+=t+":"+(d?" ":"")+h+","}}y.pop(),e=b?e.substring(0,e.length-1)+c(d,y.length)+"}":"{}"}return e;default:return}}if(t&&"function"!=typeof t&&!o(t))throw new Error("Replacer must be a function or an array");var p=function(r,n,e){var f=r[n];return f&&f.toJSON&&"function"==typeof f.toJSON&&(f=f.toJSON()),"function"==typeof t?t.call(r,n,f):t?e||o(r)||t.indexOf(n)>=0?f:void 0:f};JSON5.isWord=i,isNaN=isNaN||function(r){return"number"==typeof r&&r!==r};var d,y=[];n&&("string"==typeof n?d=n:"number"==typeof n&&n>=0&&(d=c(" ",n,!0)));var g=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,v={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},b={"":r};return void 0===r?p(b,"",!0):l(b,"",!0)};

/***/ },

/***/ "./node_modules/path-is-absolute/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";function posix(o){return"/"===o.charAt(0)}function win32(o){var e=/^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/,n=e.exec(o),r=n[1]||"",i=Boolean(r&&":"!==r.charAt(1));return Boolean(n[2]||i)}module.exports="win32"===process.platform?win32:posix,module.exports.posix=posix,module.exports.win32=win32;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/path-exists/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var fs=__webpack_require__("./node_modules/webpack/node_modules/node-libs-browser/mock/empty.js");module.exports=function(s,c){var t="function"==typeof fs.access?fs.access:fs.stat;t(s,function(s){c(null,!s)})},module.exports.sync=function(s){var c="function"==typeof fs.accessSync?fs.accessSync:fs.statSync;try{return c(s),!0}catch(t){return!1}};

/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./build-config-chain": "./node_modules/babel-core/lib/transformation/file/options/build-config-chain.js",
		"./build-config-chain.js": "./node_modules/babel-core/lib/transformation/file/options/build-config-chain.js",
		"./config": "./node_modules/babel-core/lib/transformation/file/options/config.js",
		"./config.js": "./node_modules/babel-core/lib/transformation/file/options/config.js",
		"./index": "./node_modules/babel-core/lib/transformation/file/options/index.js",
		"./index.js": "./node_modules/babel-core/lib/transformation/file/options/index.js",
		"./option-manager": "./node_modules/babel-core/lib/transformation/file/options/option-manager.js",
		"./option-manager.js": "./node_modules/babel-core/lib/transformation/file/options/option-manager.js",
		"./parsers": "./node_modules/babel-core/lib/transformation/file/options/parsers.js",
		"./parsers.js": "./node_modules/babel-core/lib/transformation/file/options/parsers.js",
		"./removed": "./node_modules/babel-core/lib/transformation/file/options/removed.js",
		"./removed.js": "./node_modules/babel-core/lib/transformation/file/options/removed.js"
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
	webpackContext.id = 6;


/***/ },

/***/ "./node_modules/babel-core/lib/transformation/plugin-pass.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_store=__webpack_require__("./node_modules/babel-core/lib/store.js"),_store2=_interopRequireDefault(_store),_file5=__webpack_require__("./node_modules/babel-core/lib/transformation/file/index.js"),_file6=_interopRequireDefault(_file5),PluginPass=function(e){function r(t,l){var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];(0,_classCallCheck3["default"])(this,r);var u=(0,_possibleConstructorReturn3["default"])(this,e.call(this));return u.plugin=l,u.key=l.key,u.file=t,u.opts=i,u}return(0,_inherits3["default"])(r,e),r.prototype.addHelper=function(){var e;return(e=this.file).addHelper.apply(e,arguments)},r.prototype.addImport=function(){var e;return(e=this.file).addImport.apply(e,arguments)},r.prototype.getModuleName=function(){var e;return(e=this.file).getModuleName.apply(e,arguments)},r.prototype.buildCodeFrameError=function(){var e;return(e=this.file).buildCodeFrameError.apply(e,arguments)},r}(_store2["default"]);exports["default"]=PluginPass,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/shebang-regex/index.js":
/***/ function(module, exports) {

	"use strict";module.exports=/^#!.*/;

/***/ },

/***/ "./node_modules/source-map/source-map.js":
/***/ function(module, exports, __webpack_require__) {

	exports.SourceMapGenerator=__webpack_require__("./node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator,exports.SourceMapConsumer=__webpack_require__("./node_modules/source-map/lib/source-map-consumer.js").SourceMapConsumer,exports.SourceNode=__webpack_require__("./node_modules/source-map/lib/source-node.js").SourceNode;

/***/ },

/***/ "./node_modules/source-map/lib/source-map-generator.js":
/***/ function(module, exports, __webpack_require__) {

	function SourceMapGenerator(e){e||(e={}),this._file=util.getArg(e,"file",null),this._sourceRoot=util.getArg(e,"sourceRoot",null),this._skipValidation=util.getArg(e,"skipValidation",!1),this._sources=new ArraySet,this._names=new ArraySet,this._mappings=new MappingList,this._sourcesContents=null}var base64VLQ=__webpack_require__("./node_modules/source-map/lib/base64-vlq.js"),util=__webpack_require__("./node_modules/source-map/lib/util.js"),ArraySet=__webpack_require__("./node_modules/source-map/lib/array-set.js").ArraySet,MappingList=__webpack_require__("./node_modules/source-map/lib/mapping-list.js").MappingList;SourceMapGenerator.prototype._version=3,SourceMapGenerator.fromSourceMap=function(e){var n=e.sourceRoot,t=new SourceMapGenerator({file:e.file,sourceRoot:n});return e.eachMapping(function(e){var r={generated:{line:e.generatedLine,column:e.generatedColumn}};null!=e.source&&(r.source=e.source,null!=n&&(r.source=util.relative(n,r.source)),r.original={line:e.originalLine,column:e.originalColumn},null!=e.name&&(r.name=e.name)),t.addMapping(r)}),e.sources.forEach(function(n){var r=e.sourceContentFor(n);null!=r&&t.setSourceContent(n,r)}),t},SourceMapGenerator.prototype.addMapping=function(e){var n=util.getArg(e,"generated"),t=util.getArg(e,"original",null),r=util.getArg(e,"source",null),o=util.getArg(e,"name",null);this._skipValidation||this._validateMapping(n,t,r,o),null!=r&&(r=String(r),this._sources.has(r)||this._sources.add(r)),null!=o&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:n.line,generatedColumn:n.column,originalLine:null!=t&&t.line,originalColumn:null!=t&&t.column,source:r,name:o})},SourceMapGenerator.prototype.setSourceContent=function(e,n){var t=e;null!=this._sourceRoot&&(t=util.relative(this._sourceRoot,t)),null!=n?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[util.toSetString(t)]=n):this._sourcesContents&&(delete this._sourcesContents[util.toSetString(t)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},SourceMapGenerator.prototype.applySourceMap=function(e,n,t){var r=n;if(null==n){if(null==e.file)throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');r=e.file}var o=this._sourceRoot;null!=o&&(r=util.relative(o,r));var i=new ArraySet,s=new ArraySet;this._mappings.unsortedForEach(function(n){if(n.source===r&&null!=n.originalLine){var u=e.originalPositionFor({line:n.originalLine,column:n.originalColumn});null!=u.source&&(n.source=u.source,null!=t&&(n.source=util.join(t,n.source)),null!=o&&(n.source=util.relative(o,n.source)),n.originalLine=u.line,n.originalColumn=u.column,null!=u.name&&(n.name=u.name))}var l=n.source;null==l||i.has(l)||i.add(l);var a=n.name;null==a||s.has(a)||s.add(a)},this),this._sources=i,this._names=s,e.sources.forEach(function(n){var r=e.sourceContentFor(n);null!=r&&(null!=t&&(n=util.join(t,n)),null!=o&&(n=util.relative(o,n)),this.setSourceContent(n,r))},this)},SourceMapGenerator.prototype._validateMapping=function(e,n,t,r){if((!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0)||n||t||r)&&!(e&&"line"in e&&"column"in e&&n&&"line"in n&&"column"in n&&e.line>0&&e.column>=0&&n.line>0&&n.column>=0&&t))throw new Error("Invalid mapping: "+JSON.stringify({generated:e,source:t,original:n,name:r}))},SourceMapGenerator.prototype._serializeMappings=function(){for(var e,n,t,r,o=0,i=1,s=0,u=0,l=0,a=0,c="",p=this._mappings.toArray(),g=0,h=p.length;g<h;g++){if(n=p[g],e="",n.generatedLine!==i)for(o=0;n.generatedLine!==i;)e+=";",i++;else if(g>0){if(!util.compareByGeneratedPositionsInflated(n,p[g-1]))continue;e+=","}e+=base64VLQ.encode(n.generatedColumn-o),o=n.generatedColumn,null!=n.source&&(r=this._sources.indexOf(n.source),e+=base64VLQ.encode(r-a),a=r,e+=base64VLQ.encode(n.originalLine-1-u),u=n.originalLine-1,e+=base64VLQ.encode(n.originalColumn-s),s=n.originalColumn,null!=n.name&&(t=this._names.indexOf(n.name),e+=base64VLQ.encode(t-l),l=t)),c+=e}return c},SourceMapGenerator.prototype._generateSourcesContent=function(e,n){return e.map(function(e){if(!this._sourcesContents)return null;null!=n&&(e=util.relative(n,e));var t=util.toSetString(e);return Object.prototype.hasOwnProperty.call(this._sourcesContents,t)?this._sourcesContents[t]:null},this)},SourceMapGenerator.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()};return null!=this._file&&(e.file=this._file),null!=this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},SourceMapGenerator.prototype.toString=function(){return JSON.stringify(this.toJSON())},exports.SourceMapGenerator=SourceMapGenerator;

/***/ },

/***/ "./node_modules/source-map/lib/mapping-list.js":
/***/ function(module, exports, __webpack_require__) {

	function generatedPositionAfter(t,e){var r=t.generatedLine,i=e.generatedLine,a=t.generatedColumn,n=e.generatedColumn;return i>r||i==r&&n>=a||util.compareByGeneratedPositionsInflated(t,e)<=0}function MappingList(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}var util=__webpack_require__("./node_modules/source-map/lib/util.js");MappingList.prototype.unsortedForEach=function(t,e){this._array.forEach(t,e)},MappingList.prototype.add=function(t){generatedPositionAfter(this._last,t)?(this._last=t,this._array.push(t)):(this._sorted=!1,this._array.push(t))},MappingList.prototype.toArray=function(){return this._sorted||(this._array.sort(util.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},exports.MappingList=MappingList;

/***/ },

/***/ "./node_modules/source-map/lib/source-node.js":
/***/ function(module, exports, __webpack_require__) {

	function SourceNode(e,n,o,r,t){this.children=[],this.sourceContents={},this.line=null==e?null:e,this.column=null==n?null:n,this.source=null==o?null:o,this.name=null==t?null:t,this[isSourceNode]=!0,null!=r&&this.add(r)}var SourceMapGenerator=__webpack_require__("./node_modules/source-map/lib/source-map-generator.js").SourceMapGenerator,util=__webpack_require__("./node_modules/source-map/lib/util.js"),REGEX_NEWLINE=/(\r?\n)/,NEWLINE_CODE=10,isSourceNode="$$$isSourceNode$$$";SourceNode.fromStringWithSourceMap=function(e,n,o){function r(e,n){if(null===e||void 0===e.source)t.add(n);else{var r=o?util.join(o,e.source):e.source;t.add(new SourceNode(e.originalLine,e.originalColumn,r,n,e.name))}}var t=new SourceNode,i=e.split(REGEX_NEWLINE),u=function(){var e=i.shift(),n=i.shift()||"";return e+n},l=1,c=0,s=null;return n.eachMapping(function(e){if(null!==s){if(!(l<e.generatedLine)){var n=i[0],o=n.substr(0,e.generatedColumn-c);return i[0]=n.substr(e.generatedColumn-c),c=e.generatedColumn,r(s,o),void(s=e)}r(s,u()),l++,c=0}for(;l<e.generatedLine;)t.add(u()),l++;if(c<e.generatedColumn){var n=i[0];t.add(n.substr(0,e.generatedColumn)),i[0]=n.substr(e.generatedColumn),c=e.generatedColumn}s=e},this),i.length>0&&(s&&r(s,u()),t.add(i.join(""))),n.sources.forEach(function(e){var r=n.sourceContentFor(e);null!=r&&(null!=o&&(e=util.join(o,e)),t.setSourceContent(e,r))}),t},SourceNode.prototype.add=function(e){if(Array.isArray(e))e.forEach(function(e){this.add(e)},this);else{if(!e[isSourceNode]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);e&&this.children.push(e)}return this},SourceNode.prototype.prepend=function(e){if(Array.isArray(e))for(var n=e.length-1;n>=0;n--)this.prepend(e[n]);else{if(!e[isSourceNode]&&"string"!=typeof e)throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got "+e);this.children.unshift(e)}return this},SourceNode.prototype.walk=function(e){for(var n,o=0,r=this.children.length;o<r;o++)n=this.children[o],n[isSourceNode]?n.walk(e):""!==n&&e(n,{source:this.source,line:this.line,column:this.column,name:this.name})},SourceNode.prototype.join=function(e){var n,o,r=this.children.length;if(r>0){for(n=[],o=0;o<r-1;o++)n.push(this.children[o]),n.push(e);n.push(this.children[o]),this.children=n}return this},SourceNode.prototype.replaceRight=function(e,n){var o=this.children[this.children.length-1];return o[isSourceNode]?o.replaceRight(e,n):"string"==typeof o?this.children[this.children.length-1]=o.replace(e,n):this.children.push("".replace(e,n)),this},SourceNode.prototype.setSourceContent=function(e,n){this.sourceContents[util.toSetString(e)]=n},SourceNode.prototype.walkSourceContents=function(e){for(var n=0,o=this.children.length;n<o;n++)this.children[n][isSourceNode]&&this.children[n].walkSourceContents(e);for(var r=Object.keys(this.sourceContents),n=0,o=r.length;n<o;n++)e(util.fromSetString(r[n]),this.sourceContents[r[n]])},SourceNode.prototype.toString=function(){var e="";return this.walk(function(n){e+=n}),e},SourceNode.prototype.toStringWithSourceMap=function(e){var n={code:"",line:1,column:0},o=new SourceMapGenerator(e),r=!1,t=null,i=null,u=null,l=null;return this.walk(function(e,c){n.code+=e,null!==c.source&&null!==c.line&&null!==c.column?(t===c.source&&i===c.line&&u===c.column&&l===c.name||o.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:n.line,column:n.column},name:c.name}),t=c.source,i=c.line,u=c.column,l=c.name,r=!0):r&&(o.addMapping({generated:{line:n.line,column:n.column}}),t=null,r=!1);for(var s=0,a=e.length;s<a;s++)e.charCodeAt(s)===NEWLINE_CODE?(n.line++,n.column=0,s+1===a?(t=null,r=!1):r&&o.addMapping({source:c.source,original:{line:c.line,column:c.column},generated:{line:n.line,column:n.column},name:c.name})):n.column++}),this.walkSourceContents(function(e,n){o.setSourceContent(e,n)}),{code:n.code,map:o}},exports.SourceNode=SourceNode;

/***/ },

/***/ "./node_modules/babel-generator/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function normalizeOptions(e,t,r){var n="  ";if(e&&"string"==typeof e){var i=(0,_detectIndent2["default"])(e).indent;i&&" "!==i&&(n=i)}var o={auxiliaryCommentBefore:t.auxiliaryCommentBefore,auxiliaryCommentAfter:t.auxiliaryCommentAfter,shouldPrintComment:t.shouldPrintComment,retainLines:t.retainLines,retainFunctionParens:t.retainFunctionParens,comments:null==t.comments||t.comments,compact:t.compact,minified:t.minified,concise:t.concise,quotes:t.quotes||findCommonStringDelimiter(e,r),indent:{adjustMultilineComment:!0,style:n,base:0}};return o.minified?(o.compact=!0,o.shouldPrintComment=o.shouldPrintComment||function(){return o.comments}):o.shouldPrintComment=o.shouldPrintComment||function(e){return o.comments||e.indexOf("@license")>=0||e.indexOf("@preserve")>=0},"auto"===o.compact&&(o.compact=e.length>1e5,o.compact&&console.error("[BABEL] "+messages.get("codeGeneratorDeopt",t.filename,"100KB"))),o.compact&&(o.indent.adjustMultilineComment=!1),o}function findCommonStringDelimiter(e,t){var r="double";if(!e)return r;for(var n={single:0,"double":0},i=0,o=0;o<t.length;o++){var s=t[o];if("string"===s.type.label){var a=e.slice(s.start,s.end);if("'"===a[0]?n.single++:n["double"]++,i++,i>=3)break}}return n.single>n["double"]?"single":"double"}exports.__esModule=!0,exports.CodeGenerator=void 0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2);exports["default"]=function(e,t,r){var n=new Generator(e,t,r);return n.generate()};var _detectIndent=__webpack_require__("./node_modules/detect-indent/index.js"),_detectIndent2=_interopRequireDefault(_detectIndent),_sourceMap=__webpack_require__("./node_modules/babel-generator/lib/source-map.js"),_sourceMap2=_interopRequireDefault(_sourceMap),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_printer=__webpack_require__("./node_modules/babel-generator/lib/printer.js"),_printer2=_interopRequireDefault(_printer),Generator=function(e){function t(r,n,i){(0,_classCallCheck3["default"])(this,t),n=n||{};var o=r.tokens||[],s=normalizeOptions(i,n,o),a=n.sourceMaps?new _sourceMap2["default"](n,i):null,u=(0,_possibleConstructorReturn3["default"])(this,e.call(this,s,a,o));return u.ast=r,u}return(0,_inherits3["default"])(t,e),t.prototype.generate=function(){return e.prototype.generate.call(this,this.ast)},t}(_printer2["default"]),CodeGenerator=exports.CodeGenerator=function(){function e(t,r,n){(0,_classCallCheck3["default"])(this,e),this._generator=new Generator(t,r,n)}return e.prototype.generate=function(){return this._generator.generate()},e}();

/***/ },

/***/ "./node_modules/detect-indent/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function getMostUsed(t){var e=0,r=0,n=0;for(var a in t){var i=t[a],o=i[0],p=i[1];(o>r||o===r&&p>n)&&(r=o,n=p,e=+a)}return e}var repeating=__webpack_require__("./node_modules/repeating/index.js"),INDENT_RE=/^(?:( )+|\t+)/;module.exports=function(t){if("string"!=typeof t)throw new TypeError("Expected a string");var e,r,n=0,a=0,i=0,o={};t.split(/\n/g).forEach(function(t){if(t){var p,s=t.match(INDENT_RE);s?(p=s[0].length,s[1]?a++:n++):p=0;var g=p-i;i=p,g?(r=g>0,e=o[r?g:-g],e?e[0]++:e=o[g]=[1,0]):e&&(e[1]+=+r)}});var p,s,g=getMostUsed(o);return g?a>=n?(p="space",s=repeating(" ",g)):(p="tab",s=repeating("\t",g)):(p=null,s=""),{amount:g,type:p,indent:s}};

/***/ },

/***/ "./node_modules/repeating/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var isFinite=__webpack_require__("./node_modules/is-finite/index.js");module.exports=function(e,i){if("string"!=typeof e)throw new TypeError("Expected a string as the first argument");if(i<0||!isFinite(i))throw new TypeError("Expected a finite positive number");var r="";do 1&i&&(r+=e),e+=e;while(i>>=1);return r};

/***/ },

/***/ "./node_modules/is-finite/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var numberIsNan=__webpack_require__("./node_modules/number-is-nan/index.js");module.exports=Number.isFinite||function(e){return!("number"!=typeof e||numberIsNan(e)||e===1/0||e===-(1/0))};

/***/ },

/***/ "./node_modules/number-is-nan/index.js":
/***/ function(module, exports) {

	"use strict";module.exports=Number.isNaN||function(e){return e!==e};

/***/ },

/***/ "./node_modules/babel-generator/lib/source-map.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_sourceMap=__webpack_require__("./node_modules/source-map/source-map.js"),_sourceMap2=_interopRequireDefault(_sourceMap),SourceMap=function(){function e(t,o){var u=this;(0,_classCallCheck3["default"])(this,e),this._opts=t,this._map=new _sourceMap2["default"].SourceMapGenerator({file:t.sourceMapTarget,sourceRoot:t.sourceRoot}),"string"==typeof o?this._map.setSourceContent(t.sourceFileName,o):"object"===("undefined"==typeof o?"undefined":(0,_typeof3["default"])(o))&&(0,_keys2["default"])(o).forEach(function(e){u._map.setSourceContent(e,o[e])})}return e.prototype.get=function(){return this._map.toJSON()},e.prototype.mark=function(e,t,o,u,r,s){this._lastGenLine!==e&&null===o||this._lastGenLine===e&&this._lastSourceLine===o&&this._lastSourceColumn===u||(this._lastGenLine=e,this._lastSourceLine=o,this._lastSourceColumn=u,this._map.addMapping({name:r,generated:{line:e,column:t},source:null==o?null:s||this._opts.sourceFileName,original:null==o?null:{line:o,column:u}}))},e}();exports["default"]=SourceMap,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-generator/lib/printer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e["default"]=t,e}function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function commaSeparator(){this.token(","),this.space()}exports.__esModule=!0;var _assign=__webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js"),_assign2=_interopRequireDefault(_assign),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_weakSet=__webpack_require__("./node_modules/babel-runtime/core-js/weak-set.js"),_weakSet2=_interopRequireDefault(_weakSet),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_find=__webpack_require__("./node_modules/lodash/find.js"),_find2=_interopRequireDefault(_find),_findLast=__webpack_require__("./node_modules/lodash/findLast.js"),_findLast2=_interopRequireDefault(_findLast),_isInteger=__webpack_require__("./node_modules/lodash/isInteger.js"),_isInteger2=_interopRequireDefault(_isInteger),_repeat=__webpack_require__("./node_modules/lodash/repeat.js"),_repeat2=_interopRequireDefault(_repeat),_buffer=__webpack_require__("./node_modules/babel-generator/lib/buffer.js"),_buffer2=_interopRequireDefault(_buffer),_node=__webpack_require__("./node_modules/babel-generator/lib/node/index.js"),n=_interopRequireWildcard(_node),_whitespace=__webpack_require__("./node_modules/babel-generator/lib/whitespace.js"),_whitespace2=_interopRequireDefault(_whitespace),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),SCIENTIFIC_NOTATION=/e/i,ZERO_DECIMAL_INTEGER=/\.0+$/,NON_DECIMAL_LITERAL=/^0[box]/,Printer=function(){function e(t,i,n){(0,_classCallCheck3["default"])(this,e),this.inForStatementInitCounter=0,this._printStack=[],this._indent=0,this._insideAux=!1,this._printedCommentStarts={},this._parenPushNewlineState=null,this._printAuxAfterOnNextUserNode=!1,this._printedComments=new _weakSet2["default"],this._endsWithInteger=!1,this._endsWithWord=!1,this.format=t||{},this._buf=new _buffer2["default"](i),this._whitespace=n.length>0?new _whitespace2["default"](n):null}return e.prototype.generate=function(t){return this.print(t),this._maybeAddAuxComment(),this._buf.get()},e.prototype.indent=function(){this.format.compact||this.format.concise||this._indent++},e.prototype.dedent=function(){this.format.compact||this.format.concise||this._indent--},e.prototype.semicolon=function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];this._maybeAddAuxComment(),this._append(";",!t)},e.prototype.rightBrace=function(){this.format.minified&&this._buf.removeLastSemicolon(),this.token("}")},e.prototype.space=function(){var t=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];this.format.compact||(this._buf.hasContent()&&!this.endsWith(" ")&&!this.endsWith("\n")||t)&&this._space()},e.prototype.word=function(t){this._endsWithWord&&this._space(),this._maybeAddAuxComment(),this._append(t),this._endsWithWord=!0},e.prototype.number=function(t){this.word(t),this._endsWithInteger=(0,_isInteger2["default"])(+t)&&!NON_DECIMAL_LITERAL.test(t)&&!SCIENTIFIC_NOTATION.test(t)&&!ZERO_DECIMAL_INTEGER.test(t)&&"."!==t[t.length-1]},e.prototype.token=function(t){("--"===t&&this.endsWith("!")||"+"===t[0]&&this.endsWith("+")||"-"===t[0]&&this.endsWith("-")||"."===t[0]&&this._endsWithInteger)&&this._space(),this._maybeAddAuxComment(),this._append(t)},e.prototype.newline=function(t){if(!this.format.retainLines&&!this.format.compact){if(this.format.concise)return void this.space();if(!(this.endsWith("\n\n")||("number"!=typeof t&&(t=1),t=Math.min(2,t),(this.endsWith("{\n")||this.endsWith(":\n"))&&t--,t<=0)))for(var e=0;e<t;e++)this._newline()}},e.prototype.endsWith=function(t){return this._buf.endsWith(t)},e.prototype.removeTrailingNewline=function(){this._buf.removeTrailingNewline()},e.prototype.source=function(t,e){this._catchUp(t,e),this._buf.source(t,e)},e.prototype.withSource=function(t,e,i){this._catchUp(t,e),this._buf.withSource(t,e,i)},e.prototype._space=function(){this._append(" ",!0)},e.prototype._newline=function(){this._append("\n",!0)},e.prototype._append=function(t){var e=!(arguments.length<=1||void 0===arguments[1])&&arguments[1];this._maybeAddParen(t),this._maybeIndent(t),e?this._buf.queue(t):this._buf.append(t),this._endsWithWord=!1,this._endsWithInteger=!1},e.prototype._maybeIndent=function(t){this._indent&&this.endsWith("\n")&&"\n"!==t[0]&&this._buf.queue(this._getIndent())},e.prototype._maybeAddParen=function(t){var e=this._parenPushNewlineState;if(e){this._parenPushNewlineState=null;var i=void 0;for(i=0;i<t.length&&" "===t[i];i++);if(i!==t.length){var n=t[i];"\n"!==n&&"/"!==n||(this.token("("),this.indent(),e.printed=!0)}}},e.prototype._catchUp=function(t,e){if(this.format.retainLines){var i=e?e[t]:null;if(i&&null!==i.line)for(var n=i.line-this._buf.getCurrentLine(),r=0;r<n;r++)this._newline()}},e.prototype._getIndent=function(){return(0,_repeat2["default"])(this.format.indent.style,this._indent)},e.prototype.startTerminatorless=function(){return this._parenPushNewlineState={printed:!1}},e.prototype.endTerminatorless=function(t){t.printed&&(this.dedent(),this.newline(),this.token(")"))},e.prototype.print=function(e,i){var r=this;if(e){var s=this.format.concise;e._compact&&(this.format.concise=!0);var o=this[e.type];if(!o)throw new ReferenceError("unknown node of type "+(0,_stringify2["default"])(e.type)+" with constructor "+(0,_stringify2["default"])(e&&e.constructor.name));this._printStack.push(e);var a=this._insideAux;this._insideAux=!e.loc,this._maybeAddAuxComment(this._insideAux&&!a);var h=n.needsParens(e,i,this._printStack);this.format.retainFunctionParens&&"FunctionExpression"===e.type&&e.extra&&e.extra.parenthesized&&(h=!0),h&&this.token("("),this._printLeadingComments(e,i);var p=t.isProgram(e)||t.isFile(e)?null:e.loc;this.withSource("start",p,function(){r[e.type](e,i)}),this._printTrailingComments(e,i),h&&this.token(")"),this._printStack.pop(),this.format.concise=s,this._insideAux=a}},e.prototype._maybeAddAuxComment=function(t){t&&this._printAuxBeforeComment(),this._insideAux||this._printAuxAfterComment()},e.prototype._printAuxBeforeComment=function(){if(!this._printAuxAfterOnNextUserNode){this._printAuxAfterOnNextUserNode=!0;var t=this.format.auxiliaryCommentBefore;t&&this._printComment({type:"CommentBlock",value:t})}},e.prototype._printAuxAfterComment=function(){if(this._printAuxAfterOnNextUserNode){this._printAuxAfterOnNextUserNode=!1;var t=this.format.auxiliaryCommentAfter;t&&this._printComment({type:"CommentBlock",value:t})}},e.prototype.getPossibleRaw=function(t){if(!this.format.minified){var e=t.extra;return e&&null!=e.raw&&null!=e.rawValue&&t.value===e.rawValue?e.raw:void 0}},e.prototype.printJoin=function(t,e){var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];if(t&&t.length){i.indent&&this.indent();for(var n={addNewlines:i.addNewlines},r=0;r<t.length;r++){var s=t[r];s&&(i.statement&&this._printNewline(!0,s,e,n),this.print(s,e),i.iterator&&i.iterator(s,r),i.separator&&r<t.length-1&&i.separator.call(this),i.statement&&this._printNewline(!1,s,e,n))}i.indent&&this.dedent()}},e.prototype.printAndIndentOnComments=function(t,e){var i=!!t.leadingComments;i&&this.indent(),this.print(t,e),i&&this.dedent()},e.prototype.printBlock=function(e){var i=e.body;t.isEmptyStatement(i)||this.space(),this.print(i,e)},e.prototype._printTrailingComments=function(t,e){this._printComments(this._getComments(!1,t,e))},e.prototype._printLeadingComments=function(t,e){this._printComments(this._getComments(!0,t,e))},e.prototype.printInnerComments=function(t){var e=arguments.length<=1||void 0===arguments[1]||arguments[1];t.innerComments&&(e&&this.indent(),this._printComments(t.innerComments),e&&this.dedent())},e.prototype.printSequence=function(t,e){var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return i.statement=!0,this.printJoin(t,e,i)},e.prototype.printList=function(t,e){var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return null==i.separator&&(i.separator=commaSeparator),this.printJoin(t,e,i)},e.prototype._printNewline=function(t,e,i,r){var s=this;if(!this.format.retainLines&&!this.format.compact){if(this.format.concise)return void this.space();var o=0;if(null!=e.start&&!e._ignoreUserWhitespace&&this._whitespace)if(t){var a=e.leadingComments,h=a&&(0,_find2["default"])(a,function(t){return!!t.loc&&s.format.shouldPrintComment(t.value)});o=this._whitespace.getNewlinesBefore(h||e)}else{var p=e.trailingComments,u=p&&(0,_findLast2["default"])(p,function(t){return!!t.loc&&s.format.shouldPrintComment(t.value)});o=this._whitespace.getNewlinesAfter(u||e)}else{t||o++,r.addNewlines&&(o+=r.addNewlines(t,e)||0);var f=n.needsWhitespaceAfter;t&&(f=n.needsWhitespaceBefore),f(e,i)&&o++,this._buf.hasContent()||(o=0)}this.newline(o)}},e.prototype._getComments=function(t,e){return e&&(t?e.leadingComments:e.trailingComments)||[]},e.prototype._printComment=function(t){var e=this;if(this.format.shouldPrintComment(t.value)&&!t.ignore&&!this._printedComments.has(t)){if(this._printedComments.add(t),null!=t.start){if(this._printedCommentStarts[t.start])return;this._printedCommentStarts[t.start]=!0}this.newline(this._whitespace?this._whitespace.getNewlinesBefore(t):0),this.endsWith("[")||this.endsWith("{")||this.space();var i="CommentLine"===t.type?"//"+t.value+"\n":"/*"+t.value+"*/";if("CommentBlock"===t.type&&this.format.indent.adjustMultilineComment){var n=t.loc&&t.loc.start.column;if(n){var r=new RegExp("\\n\\s{1,"+n+"}","g");i=i.replace(r,"\n")}var s=Math.max(this._getIndent().length,this._buf.getCurrentColumn());i=i.replace(/\n(?!$)/g,"\n"+(0,_repeat2["default"])(" ",s))}this.withSource("start",t.loc,function(){e._append(i)}),this.newline((this._whitespace?this._whitespace.getNewlinesAfter(t):0)+("CommentLine"===t.type?-1:0))}},e.prototype._printComments=function(t){if(t&&t.length)for(var e=t,i=Array.isArray(e),n=0,e=i?e:(0,_getIterator3["default"])(e);;){var r;if(i){if(n>=e.length)break;r=e[n++]}else{if(n=e.next(),n.done)break;r=n.value}var s=r;this._printComment(s)}},e}();exports["default"]=Printer;for(var _arr=[__webpack_require__("./node_modules/babel-generator/lib/generators/template-literals.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/expressions.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/statements.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/classes.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/methods.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/modules.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/types.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/flow.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/base.js"),__webpack_require__("./node_modules/babel-generator/lib/generators/jsx.js")],_i2=0;_i2<_arr.length;_i2++){var generator=_arr[_i2];(0,_assign2["default"])(Printer.prototype,generator)}module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-runtime/core-js/weak-set.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/weak-set.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/weak-set.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js"),__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.weak-set.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").WeakSet;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.weak-set.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var weak=__webpack_require__("./node_modules/core-js/library/modules/_collection-weak.js");__webpack_require__("./node_modules/core-js/library/modules/_collection.js")("WeakSet",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{add:function(e){return weak.def(this,e,!0)}},weak,!1,!0);

/***/ },

/***/ "./node_modules/lodash/find.js":
/***/ function(module, exports, __webpack_require__) {

	var createFind=__webpack_require__("./node_modules/lodash/_createFind.js"),findIndex=__webpack_require__("./node_modules/lodash/findIndex.js"),find=createFind(findIndex);module.exports=find;

/***/ },

/***/ "./node_modules/lodash/_createFind.js":
/***/ function(module, exports, __webpack_require__) {

	function createFind(e){return function(r,i,t){var a=Object(r);if(!isArrayLike(r)){var n=baseIteratee(i,3);r=keys(r),i=function(e){return n(a[e],e,a)}}var s=e(r,i,t);return s>-1?a[n?r[s]:s]:void 0}}var baseIteratee=__webpack_require__("./node_modules/lodash/_baseIteratee.js"),isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js"),keys=__webpack_require__("./node_modules/lodash/keys.js");module.exports=createFind;

/***/ },

/***/ "./node_modules/lodash/findIndex.js":
/***/ function(module, exports, __webpack_require__) {

	function findIndex(e,n,r){var t=e?e.length:0;if(!t)return-1;var a=null==r?0:toInteger(r);return a<0&&(a=nativeMax(t+a,0)),baseFindIndex(e,baseIteratee(n,3),a)}var baseFindIndex=__webpack_require__("./node_modules/lodash/_baseFindIndex.js"),baseIteratee=__webpack_require__("./node_modules/lodash/_baseIteratee.js"),toInteger=__webpack_require__("./node_modules/lodash/toInteger.js"),nativeMax=Math.max;module.exports=findIndex;

/***/ },

/***/ "./node_modules/lodash/findLast.js":
/***/ function(module, exports, __webpack_require__) {

	var createFind=__webpack_require__("./node_modules/lodash/_createFind.js"),findLastIndex=__webpack_require__("./node_modules/lodash/findLastIndex.js"),findLast=createFind(findLastIndex);module.exports=findLast;

/***/ },

/***/ "./node_modules/lodash/findLastIndex.js":
/***/ function(module, exports, __webpack_require__) {

	function findLastIndex(e,n,t){var a=e?e.length:0;if(!a)return-1;var r=a-1;return void 0!==t&&(r=toInteger(t),r=t<0?nativeMax(a+r,0):nativeMin(r,a-1)),baseFindIndex(e,baseIteratee(n,3),r,!0)}var baseFindIndex=__webpack_require__("./node_modules/lodash/_baseFindIndex.js"),baseIteratee=__webpack_require__("./node_modules/lodash/_baseIteratee.js"),toInteger=__webpack_require__("./node_modules/lodash/toInteger.js"),nativeMax=Math.max,nativeMin=Math.min;module.exports=findLastIndex;

/***/ },

/***/ "./node_modules/lodash/isInteger.js":
/***/ function(module, exports, __webpack_require__) {

	function isInteger(e){return"number"==typeof e&&e==toInteger(e)}var toInteger=__webpack_require__("./node_modules/lodash/toInteger.js");module.exports=isInteger;

/***/ },

/***/ "./node_modules/babel-generator/lib/buffer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_trimEnd=__webpack_require__("./node_modules/lodash/trimEnd.js"),_trimEnd2=_interopRequireDefault(_trimEnd),SPACES_RE=/^[ \t]+$/,Buffer=function(){function e(t){(0,_classCallCheck3["default"])(this,e),this._map=null,this._buf=[],this._last="",this._queue=[],this._position={line:1,column:0},this._sourcePosition={identifierName:null,line:null,column:null,filename:null},this._map=t}return e.prototype.get=function(){return this._flush(),{code:(0,_trimEnd2["default"])(this._buf.join("")),map:this._map?this._map.get():null}},e.prototype.append=function(e){this._flush();var t=this._sourcePosition,i=t.line,n=t.column,o=t.filename,u=t.identifierName;this._append(e,i,n,u,o)},e.prototype.queue=function(e){if("\n"===e)for(;this._queue.length>0&&SPACES_RE.test(this._queue[0][0]);)this._queue.shift();var t=this._sourcePosition,i=t.line,n=t.column,o=t.filename,u=t.identifierName;this._queue.unshift([e,i,n,u,o])},e.prototype._flush=function(){for(var e=void 0;e=this._queue.pop();)this._append.apply(this,e)},e.prototype._append=function(e,t,i,n,o){this._map&&"\n"!==e[0]&&this._map.mark(this._position.line,this._position.column,t,i,n,o),this._buf.push(e),this._last=e[e.length-1];for(var u=0;u<e.length;u++)"\n"===e[u]?(this._position.line++,this._position.column=0):this._position.column++},e.prototype.removeTrailingNewline=function(){this._queue.length>0&&"\n"===this._queue[0][0]&&this._queue.shift()},e.prototype.removeLastSemicolon=function(){this._queue.length>0&&";"===this._queue[0][0]&&this._queue.shift()},e.prototype.endsWith=function(e){if(1===e.length){var t=void 0;if(this._queue.length>0){var i=this._queue[0][0];t=i[i.length-1]}else t=this._last;return t===e}var n=this._last+this._queue.reduce(function(e,t){return t[0]+e},"");return e.length<=n.length&&n.slice(-e.length)===e},e.prototype.hasContent=function(){return this._queue.length>0||!!this._last},e.prototype.source=function(e,t){if(!e||t){var i=t?t[e]:null;this._sourcePosition.identifierName=t&&t.identifierName||null,this._sourcePosition.line=i?i.line:null,this._sourcePosition.column=i?i.column:null,this._sourcePosition.filename=t&&t.filename||null}},e.prototype.withSource=function(e,t,i){if(!this._map)return i();var n=this._sourcePosition.line,o=this._sourcePosition.column,u=this._sourcePosition.filename,s=this._sourcePosition.identifierName;this.source(e,t),i(),this._sourcePosition.line=n,this._sourcePosition.column=o,this._sourcePosition.filename=u,this._sourcePosition.identifierName=s},e.prototype.getCurrentColumn=function(){var e=this._queue.reduce(function(e,t){return t[0]+e},""),t=e.lastIndexOf("\n");return t===-1?this._position.column+e.length:e.length-1-t},e.prototype.getCurrentLine=function(){for(var e=this._queue.reduce(function(e,t){return t[0]+e},""),t=0,i=0;i<e.length;i++)"\n"===e[i]&&t++;return this._position.line+t},e}();exports["default"]=Buffer,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/lodash/trimEnd.js":
/***/ function(module, exports, __webpack_require__) {

	function trimEnd(r,e,i){if(r=toString(r),r&&(i||void 0===e))return r.replace(reTrimEnd,"");if(!r||!(e=baseToString(e)))return r;var n=stringToArray(r),t=charsEndIndex(n,stringToArray(e))+1;return castSlice(n,0,t).join("")}var baseToString=__webpack_require__("./node_modules/lodash/_baseToString.js"),castSlice=__webpack_require__("./node_modules/lodash/_castSlice.js"),charsEndIndex=__webpack_require__("./node_modules/lodash/_charsEndIndex.js"),stringToArray=__webpack_require__("./node_modules/lodash/_stringToArray.js"),toString=__webpack_require__("./node_modules/lodash/toString.js"),reTrimEnd=/\s+$/;module.exports=trimEnd;

/***/ },

/***/ "./node_modules/lodash/_castSlice.js":
/***/ function(module, exports, __webpack_require__) {

	function castSlice(e,c,i){var a=e.length;return i=void 0===i?a:i,!c&&i>=a?e:baseSlice(e,c,i)}var baseSlice=__webpack_require__("./node_modules/lodash/_baseSlice.js");module.exports=castSlice;

/***/ },

/***/ "./node_modules/lodash/_baseSlice.js":
/***/ function(module, exports) {

	function baseSlice(e,r,a){var l=-1,n=e.length;r<0&&(r=-r>n?0:n+r),a=a>n?n:a,a<0&&(a+=n),n=r>a?0:a-r>>>0,r>>>=0;for(var o=Array(n);++l<n;)o[l]=e[l+r];return o}module.exports=baseSlice;

/***/ },

/***/ "./node_modules/lodash/_charsEndIndex.js":
/***/ function(module, exports, __webpack_require__) {

	function charsEndIndex(e,n){for(var r=e.length;r--&&baseIndexOf(n,e[r],0)>-1;);return r}var baseIndexOf=__webpack_require__("./node_modules/lodash/_baseIndexOf.js");module.exports=charsEndIndex;

/***/ },

/***/ "./node_modules/lodash/_stringToArray.js":
/***/ function(module, exports, __webpack_require__) {

	function stringToArray(r){return hasUnicode(r)?unicodeToArray(r):asciiToArray(r)}var asciiToArray=__webpack_require__("./node_modules/lodash/_asciiToArray.js"),hasUnicode=__webpack_require__("./node_modules/lodash/_hasUnicode.js"),unicodeToArray=__webpack_require__("./node_modules/lodash/_unicodeToArray.js");module.exports=stringToArray;

/***/ },

/***/ "./node_modules/lodash/_asciiToArray.js":
/***/ function(module, exports) {

	function asciiToArray(r){return r.split("")}module.exports=asciiToArray;

/***/ },

/***/ "./node_modules/lodash/_hasUnicode.js":
/***/ function(module, exports) {

	function hasUnicode(e){return reHasUnicode.test(e)}var rsAstralRange="\\ud800-\\udfff",rsComboMarksRange="\\u0300-\\u036f\\ufe20-\\ufe23",rsComboSymbolsRange="\\u20d0-\\u20f0",rsVarRange="\\ufe0e\\ufe0f",rsZWJ="\\u200d",reHasUnicode=RegExp("["+rsZWJ+rsAstralRange+rsComboMarksRange+rsComboSymbolsRange+rsVarRange+"]");module.exports=hasUnicode;

/***/ },

/***/ "./node_modules/lodash/_unicodeToArray.js":
/***/ function(module, exports) {

	function unicodeToArray(r){return r.match(reUnicode)||[]}var rsAstralRange="\\ud800-\\udfff",rsComboMarksRange="\\u0300-\\u036f\\ufe20-\\ufe23",rsComboSymbolsRange="\\u20d0-\\u20f0",rsVarRange="\\ufe0e\\ufe0f",rsAstral="["+rsAstralRange+"]",rsCombo="["+rsComboMarksRange+rsComboSymbolsRange+"]",rsFitz="\\ud83c[\\udffb-\\udfff]",rsModifier="(?:"+rsCombo+"|"+rsFitz+")",rsNonAstral="[^"+rsAstralRange+"]",rsRegional="(?:\\ud83c[\\udde6-\\uddff]){2}",rsSurrPair="[\\ud800-\\udbff][\\udc00-\\udfff]",rsZWJ="\\u200d",reOptMod=rsModifier+"?",rsOptVar="["+rsVarRange+"]?",rsOptJoin="(?:"+rsZWJ+"(?:"+[rsNonAstral,rsRegional,rsSurrPair].join("|")+")"+rsOptVar+reOptMod+")*",rsSeq=rsOptVar+reOptMod+rsOptJoin,rsSymbol="(?:"+[rsNonAstral+rsCombo+"?",rsCombo,rsRegional,rsSurrPair,rsAstral].join("|")+")",reUnicode=RegExp(rsFitz+"(?="+rsFitz+")|"+rsSymbol+rsSeq,"g");module.exports=unicodeToArray;

/***/ },

/***/ "./node_modules/babel-generator/lib/node/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function expandAliases(e){function r(e,r){var t=s[e];s[e]=t?function(e,s,a){var n=t(e,s,a);return null==n?r(e,s,a):n}:r}for(var s={},a=(0,_keys2["default"])(e),n=Array.isArray(a),i=0,a=n?a:(0,_getIterator3["default"])(a);;){var p;if(n){if(i>=a.length)break;p=a[i++]}else{if(i=a.next(),i.done)break;p=i.value}var o=p,u=t.FLIPPED_ALIAS_KEYS[o];if(u)for(var d=u,l=Array.isArray(d),f=0,d=l?d:(0,_getIterator3["default"])(d);;){var c;if(l){if(f>=d.length)break;c=d[f++]}else{if(f=d.next(),f.done)break;c=f.value}var _=c;r(_,e[o])}else r(o,e[o])}return s}function find(e,r,t,s){var a=e[r.type];return a?a(r,t,s):null}function isOrHasCallExpression(e){return!!t.isCallExpression(e)||!!t.isMemberExpression(e)&&(isOrHasCallExpression(e.object)||!e.computed&&isOrHasCallExpression(e.property))}function needsWhitespace(e,r,s){if(!e)return 0;t.isExpressionStatement(e)&&(e=e.expression);var a=find(expandedWhitespaceNodes,e,r);if(!a){var n=find(expandedWhitespaceList,e,r);if(n)for(var i=0;i<n.length&&!(a=needsWhitespace(n[i],e,s));i++);}return a&&a[s]||0}function needsWhitespaceBefore(e,r){return needsWhitespace(e,r,"before")}function needsWhitespaceAfter(e,r){return needsWhitespace(e,r,"after")}function needsParens(e,r,s){return!!r&&(!(!t.isNewExpression(r)||r.callee!==e||!isOrHasCallExpression(e))||find(expandedParens,e,r,s))}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys);exports.needsWhitespace=needsWhitespace,exports.needsWhitespaceBefore=needsWhitespaceBefore,exports.needsWhitespaceAfter=needsWhitespaceAfter,exports.needsParens=needsParens;var _whitespace=__webpack_require__("./node_modules/babel-generator/lib/node/whitespace.js"),_whitespace2=_interopRequireDefault(_whitespace),_parentheses=__webpack_require__("./node_modules/babel-generator/lib/node/parentheses.js"),parens=_interopRequireWildcard(_parentheses),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),expandedParens=expandAliases(parens),expandedWhitespaceNodes=expandAliases(_whitespace2["default"].nodes),expandedWhitespaceList=expandAliases(_whitespace2["default"].list);

/***/ },

/***/ "./node_modules/babel-generator/lib/node/whitespace.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function crawl(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return t.isMemberExpression(e)?(crawl(e.object,r),e.computed&&crawl(e.property,r)):t.isBinary(e)||t.isAssignmentExpression(e)?(crawl(e.left,r),crawl(e.right,r)):t.isCallExpression(e)?(r.hasCall=!0,crawl(e.callee,r)):t.isFunction(e)?r.hasFunction=!0:t.isIdentifier(e)&&(r.hasHelper=r.hasHelper||isHelper(e.callee)),r}function isHelper(e){return t.isMemberExpression(e)?isHelper(e.object)||isHelper(e.property):t.isIdentifier(e)?"require"===e.name||"_"===e.name[0]:t.isCallExpression(e)?isHelper(e.callee):!(!t.isBinary(e)&&!t.isAssignmentExpression(e))&&(t.isIdentifier(e.left)&&isHelper(e.left)||isHelper(e.right))}function isType(e){return t.isLiteral(e)||t.isObjectExpression(e)||t.isArrayExpression(e)||t.isIdentifier(e)||t.isMemberExpression(e)}var _isBoolean=__webpack_require__("./node_modules/lodash/isBoolean.js"),_isBoolean2=_interopRequireDefault(_isBoolean),_each=__webpack_require__("./node_modules/lodash/each.js"),_each2=_interopRequireDefault(_each),_map=__webpack_require__("./node_modules/lodash/map.js"),_map2=_interopRequireDefault(_map),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);exports.nodes={AssignmentExpression:function(e){var t=crawl(e.right);if(t.hasCall&&t.hasHelper||t.hasFunction)return{before:t.hasFunction,after:!0}},SwitchCase:function(e,t){return{before:e.consequent.length||t.cases[0]===e}},LogicalExpression:function(e){if(t.isFunction(e.left)||t.isFunction(e.right))return{after:!0}},Literal:function(e){if("use strict"===e.value)return{after:!0}},CallExpression:function(e){if(t.isFunction(e.callee)||isHelper(e))return{before:!0,after:!0}},VariableDeclaration:function(e){for(var t=0;t<e.declarations.length;t++){var r=e.declarations[t],i=isHelper(r.id)&&!isType(r.init);if(!i){var n=crawl(r.init);i=isHelper(r.init)&&n.hasCall||n.hasFunction}if(i)return{before:!0,after:!0}}},IfStatement:function(e){if(t.isBlockStatement(e.consequent))return{before:!0,after:!0}}},exports.nodes.ObjectProperty=exports.nodes.ObjectTypeProperty=exports.nodes.ObjectMethod=exports.nodes.SpreadProperty=function(e,t){if(t.properties[0]===e)return{before:!0}},exports.list={VariableDeclaration:function(e){return(0,_map2["default"])(e.declarations,"init")},ArrayExpression:function(e){return e.elements},ObjectExpression:function(e){return e.properties}},(0,_each2["default"])({Function:!0,Class:!0,Loop:!0,LabeledStatement:!0,SwitchStatement:!0,TryStatement:!0},function(e,r){(0,_isBoolean2["default"])(e)&&(e={after:e,before:e}),(0,_each2["default"])([r].concat(t.FLIPPED_ALIAS_KEYS[r]||[]),function(t){exports.nodes[t]=function(){return e}})});

/***/ },

/***/ "./node_modules/lodash/map.js":
/***/ function(module, exports, __webpack_require__) {

	function map(a,r){var e=isArray(a)?arrayMap:baseMap;return e(a,baseIteratee(r,3))}var arrayMap=__webpack_require__("./node_modules/lodash/_arrayMap.js"),baseIteratee=__webpack_require__("./node_modules/lodash/_baseIteratee.js"),baseMap=__webpack_require__("./node_modules/lodash/_baseMap.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js");module.exports=map;

/***/ },

/***/ "./node_modules/lodash/_baseMap.js":
/***/ function(module, exports, __webpack_require__) {

	function baseMap(r,a){var e=-1,i=isArrayLike(r)?Array(r.length):[];return baseEach(r,function(r,s,n){i[++e]=a(r,s,n)}),i}var baseEach=__webpack_require__("./node_modules/lodash/_baseEach.js"),isArrayLike=__webpack_require__("./node_modules/lodash/isArrayLike.js");module.exports=baseMap;

/***/ },

/***/ "./node_modules/babel-generator/lib/node/parentheses.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function NullableTypeAnnotation(e,n){return t.isArrayTypeAnnotation(n)}function UpdateExpression(e,n){return!(!t.isMemberExpression(n)||n.object!==e)}function ObjectExpression(e,t,n){return isFirstInStatement(n,{considerArrow:!0})}function Binary(e,n){if((t.isCallExpression(n)||t.isNewExpression(n))&&n.callee===e)return!0;if(t.isUnaryLike(n))return!0;if(t.isMemberExpression(n)&&n.object===e)return!0;if(t.isBinary(n)){var i=n.operator,s=PRECEDENCE[i],r=e.operator,o=PRECEDENCE[r];if(s>o)return!0;if(s===o&&n.right===e&&!t.isLogicalExpression(n))return!0}return!1}function BinaryExpression(e,n){if("in"===e.operator){if(t.isVariableDeclarator(n))return!0;if(t.isFor(n))return!0}return!1}function SequenceExpression(e,n){return!t.isForStatement(n)&&((!t.isExpressionStatement(n)||n.expression!==e)&&(!t.isReturnStatement(n)&&(!t.isThrowStatement(n)&&((!t.isSwitchStatement(n)||n.discriminant!==e)&&((!t.isWhileStatement(n)||n.test!==e)&&((!t.isIfStatement(n)||n.test!==e)&&(!t.isForInStatement(n)||n.right!==e)))))))}function YieldExpression(e,n){return t.isBinary(n)||t.isUnaryLike(n)||t.isCallExpression(n)||t.isMemberExpression(n)||t.isNewExpression(n)||t.isConditionalExpression(n)&&e===n.test}function ClassExpression(e,t,n){return isFirstInStatement(n,{considerDefaultExports:!0})}function UnaryLike(e,n){return!!t.isMemberExpression(n,{object:e})||!(!t.isCallExpression(n,{callee:e})&&!t.isNewExpression(n,{callee:e}))}function FunctionExpression(e,t,n){return isFirstInStatement(n,{considerDefaultExports:!0})}function ArrowFunctionExpression(e,n){return!!t.isExportDeclaration(n)||(!(!t.isBinaryExpression(n)&&!t.isLogicalExpression(n))||(!!t.isUnaryExpression(n)||UnaryLike(e,n)))}function ConditionalExpression(e,n){return!!t.isUnaryLike(n)||(!!t.isBinary(n)||(!!t.isConditionalExpression(n,{test:e})||UnaryLike(e,n)))}function AssignmentExpression(e){return!!t.isObjectPattern(e.left)||ConditionalExpression.apply(void 0,arguments)}function isFirstInStatement(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=n.considerArrow,s=void 0!==i&&i,r=n.considerDefaultExports,o=void 0!==r&&r,p=e.length-1,a=e[p];p--;for(var x=e[p];p>0;){if(t.isExpressionStatement(x,{expression:a}))return!0;if(o&&t.isExportDefaultDeclaration(x,{declaration:a}))return!0;if(s&&t.isArrowFunctionExpression(x,{body:a}))return!0;if(!(t.isCallExpression(x,{callee:a})||t.isSequenceExpression(x)&&x.expressions[0]===a||t.isMemberExpression(x,{object:a})||t.isConditional(x,{test:a})||t.isBinary(x,{left:a})||t.isAssignmentExpression(x,{left:a})))return!1;a=x,p--,x=e[p]}return!1}exports.__esModule=!0,exports.AwaitExpression=exports.FunctionTypeAnnotation=void 0,exports.NullableTypeAnnotation=NullableTypeAnnotation,exports.UpdateExpression=UpdateExpression,exports.ObjectExpression=ObjectExpression,exports.Binary=Binary,exports.BinaryExpression=BinaryExpression,exports.SequenceExpression=SequenceExpression,exports.YieldExpression=YieldExpression,exports.ClassExpression=ClassExpression,exports.UnaryLike=UnaryLike,exports.FunctionExpression=FunctionExpression,exports.ArrowFunctionExpression=ArrowFunctionExpression,exports.ConditionalExpression=ConditionalExpression,exports.AssignmentExpression=AssignmentExpression;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),PRECEDENCE={"||":0,"&&":1,"|":2,"^":3,"&":4,"==":5,"===":5,"!=":5,"!==":5,"<":6,">":6,"<=":6,">=":6,"in":6,"instanceof":6,">>":7,"<<":7,">>>":7,"+":8,"-":8,"*":9,"/":9,"%":9,"**":10};exports.FunctionTypeAnnotation=NullableTypeAnnotation,exports.AwaitExpression=YieldExpression;

/***/ },

/***/ "./node_modules/babel-generator/lib/whitespace.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),Whitespace=function(){function e(t){(0,_classCallCheck3["default"])(this,e),this.tokens=t,this.used={}}return e.prototype.getNewlinesBefore=function(e){var t=void 0,n=void 0,i=this.tokens,r=this._findToken(function(t){return t.start-e.start},0,i.length);if(r>=0){for(;r&&e.start===i[r-1].start;)--r;t=i[r-1],n=i[r]}return this._getNewlinesBetween(t,n)},e.prototype.getNewlinesAfter=function(e){var t=void 0,n=void 0,i=this.tokens,r=this._findToken(function(t){return t.end-e.end},0,i.length);if(r>=0){for(;r&&e.end===i[r-1].end;)--r;t=i[r],n=i[r+1],","===n.type.label&&(n=i[r+2])}return n&&"eof"===n.type.label?1:this._getNewlinesBetween(t,n)},e.prototype._getNewlinesBetween=function(e,t){if(!t||!t.loc)return 0;for(var n=e?e.loc.end.line:1,i=t.loc.start.line,r=0,s=n;s<i;s++)"undefined"==typeof this.used[s]&&(this.used[s]=!0,r++);return r},e.prototype._findToken=function(e,t,n){if(t>=n)return-1;var i=t+n>>>1,r=e(this.tokens[i]);return r<0?this._findToken(e,i+1,n):r>0?this._findToken(e,t,i):0===r?i:-1},e}();exports["default"]=Whitespace,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/template-literals.js":
/***/ function(module, exports) {

	"use strict";function TaggedTemplateExpression(e){this.print(e.tag,e),this.print(e.quasi,e)}function TemplateElement(e,t){var s=t.quasis[0]===e,a=t.quasis[t.quasis.length-1]===e,i=(s?"`":"}")+e.value.raw+(a?"`":"${");s||this.space(),this.token(i),a||this.space()}function TemplateLiteral(e){for(var t=e.quasis,s=0;s<t.length;s++)this.print(t[s],e),s+1<t.length&&this.print(e.expressions[s],e)}exports.__esModule=!0,exports.TaggedTemplateExpression=TaggedTemplateExpression,exports.TemplateElement=TemplateElement,exports.TemplateLiteral=TemplateLiteral;

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/expressions.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function UnaryExpression(e){"void"===e.operator||"delete"===e.operator||"typeof"===e.operator?(this.word(e.operator),this.space()):this.token(e.operator),this.print(e.argument,e)}function DoExpression(e){this.word("do"),this.space(),this.print(e.body,e)}function ParenthesizedExpression(e){this.token("("),this.print(e.expression,e),this.token(")")}function UpdateExpression(e){e.prefix?(this.token(e.operator),this.print(e.argument,e)):(this.print(e.argument,e),this.token(e.operator))}function ConditionalExpression(e){this.print(e.test,e),this.space(),this.token("?"),this.space(),this.print(e.consequent,e),this.space(),this.token(":"),this.space(),this.print(e.alternate,e)}function NewExpression(e,s){this.word("new"),this.space(),this.print(e.callee,e),(0!==e.arguments.length||!this.format.minified||t.isCallExpression(s,{callee:e})||t.isMemberExpression(s)||t.isNewExpression(s))&&(this.token("("),this.printList(e.arguments,e),this.token(")"))}function SequenceExpression(e){this.printList(e.expressions,e)}function ThisExpression(){this.word("this")}function Super(){this.word("super")}function Decorator(e){this.token("@"),this.print(e.expression,e),this.newline()}function commaSeparatorNewline(){this.token(","),this.newline(),this.endsWith("\n")||this.space()}function CallExpression(e){this.print(e.callee,e),this.token("(");var t=e._prettyCall,s=void 0;t&&(s=commaSeparatorNewline,this.newline(),this.indent()),this.printList(e.arguments,e,{separator:s}),t&&(this.newline(),this.dedent()),this.token(")")}function buildYieldAwait(e){return function(t){if(this.word(e),t.delegate&&this.token("*"),t.argument){this.space();var s=this.startTerminatorless();this.print(t.argument,t),this.endTerminatorless(s)}}}function EmptyStatement(){this.semicolon(!0)}function ExpressionStatement(e){this.print(e.expression,e),this.semicolon()}function AssignmentPattern(e){this.print(e.left,e),this.space(),this.token("="),this.space(),this.print(e.right,e)}function AssignmentExpression(e,t){var s=this.inForStatementInitCounter&&"in"===e.operator&&!n.needsParens(e,t);s&&this.token("("),this.print(e.left,e),this.space(),"in"===e.operator||"instanceof"===e.operator?this.word(e.operator):this.token(e.operator),this.space(),this.print(e.right,e),s&&this.token(")")}function BindExpression(e){this.print(e.object,e),this.token("::"),this.print(e.callee,e)}function MemberExpression(e){if(this.print(e.object,e),!e.computed&&t.isMemberExpression(e.property))throw new TypeError("Got a MemberExpression for MemberExpression property");var s=e.computed;t.isLiteral(e.property)&&(0,_isNumber2["default"])(e.property.value)&&(s=!0),s?(this.token("["),this.print(e.property,e),this.token("]")):(this.token("."),this.print(e.property,e))}function MetaProperty(e){this.print(e.meta,e),this.token("."),this.print(e.property,e)}exports.__esModule=!0,exports.LogicalExpression=exports.BinaryExpression=exports.AwaitExpression=exports.YieldExpression=void 0,exports.UnaryExpression=UnaryExpression,exports.DoExpression=DoExpression,exports.ParenthesizedExpression=ParenthesizedExpression,exports.UpdateExpression=UpdateExpression,exports.ConditionalExpression=ConditionalExpression,exports.NewExpression=NewExpression,exports.SequenceExpression=SequenceExpression,exports.ThisExpression=ThisExpression,exports.Super=Super,exports.Decorator=Decorator,exports.CallExpression=CallExpression,exports.EmptyStatement=EmptyStatement,exports.ExpressionStatement=ExpressionStatement,exports.AssignmentPattern=AssignmentPattern,exports.AssignmentExpression=AssignmentExpression,exports.BindExpression=BindExpression,exports.MemberExpression=MemberExpression,exports.MetaProperty=MetaProperty;var _isNumber=__webpack_require__("./node_modules/lodash/isNumber.js"),_isNumber2=_interopRequireDefault(_isNumber),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_node=__webpack_require__("./node_modules/babel-generator/lib/node/index.js"),n=_interopRequireWildcard(_node),YieldExpression=exports.YieldExpression=buildYieldAwait("yield"),AwaitExpression=exports.AwaitExpression=buildYieldAwait("await");exports.BinaryExpression=AssignmentExpression,exports.LogicalExpression=AssignmentExpression;

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/statements.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e["default"]=t,e}function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function WithStatement(t){this.word("with"),this.space(),this.token("("),this.print(t.object,t),this.token(")"),this.printBlock(t)}function IfStatement(e){this.word("if"),this.space(),this.token("("),this.print(e.test,e),this.token(")"),this.space();var i=e.alternate&&t.isIfStatement(getLastStatement(e.consequent));i&&(this.token("{"),this.newline(),this.indent()),this.printAndIndentOnComments(e.consequent,e),i&&(this.dedent(),this.newline(),this.token("}")),e.alternate&&(this.endsWith("}")&&this.space(),this.word("else"),this.space(),this.printAndIndentOnComments(e.alternate,e))}function getLastStatement(e){return t.isStatement(e.body)?getLastStatement(e.body):e}function ForStatement(t){this.word("for"),this.space(),this.token("("),this.inForStatementInitCounter++,this.print(t.init,t),this.inForStatementInitCounter--,this.token(";"),t.test&&(this.space(),this.print(t.test,t)),this.token(";"),t.update&&(this.space(),this.print(t.update,t)),this.token(")"),this.printBlock(t)}function WhileStatement(t){this.word("while"),this.space(),this.token("("),this.print(t.test,t),this.token(")"),this.printBlock(t)}function DoWhileStatement(t){this.word("do"),this.space(),this.print(t.body,t),this.space(),this.word("while"),this.space(),this.token("("),this.print(t.test,t),this.token(")"),this.semicolon()}function buildLabelStatement(t){var e=arguments.length<=1||void 0===arguments[1]?"label":arguments[1];return function(i){this.word(t);var n=i[e];if(n){this.space();var s=this.startTerminatorless();this.print(n,i),this.endTerminatorless(s)}this.semicolon()}}function LabeledStatement(t){this.print(t.label,t),this.token(":"),this.space(),this.print(t.body,t)}function TryStatement(t){this.word("try"),this.space(),this.print(t.block,t),this.space(),t.handlers?this.print(t.handlers[0],t):this.print(t.handler,t),t.finalizer&&(this.space(),this.word("finally"),this.space(),this.print(t.finalizer,t))}function CatchClause(t){this.word("catch"),this.space(),this.token("("),this.print(t.param,t),this.token(")"),this.space(),this.print(t.body,t)}function SwitchStatement(t){this.word("switch"),this.space(),this.token("("),this.print(t.discriminant,t),this.token(")"),this.space(),this.token("{"),this.printSequence(t.cases,t,{indent:!0,addNewlines:function(e,i){if(!e&&t.cases[t.cases.length-1]===i)return-1}}),this.token("}")}function SwitchCase(t){t.test?(this.word("case"),this.space(),this.print(t.test,t),this.token(":")):(this.word("default"),this.token(":")),t.consequent.length&&(this.newline(),this.printSequence(t.consequent,t,{indent:!0}))}function DebuggerStatement(){this.word("debugger"),this.semicolon()}function variableDeclarationIdent(){if(this.token(","),this.newline(),this.endsWith("\n"))for(var t=0;t<4;t++)this.space(!0)}function constDeclarationIdent(){if(this.token(","),this.newline(),this.endsWith("\n"))for(var t=0;t<6;t++)this.space(!0)}function VariableDeclaration(e,i){this.word(e.kind),this.space();var n=!1;if(!t.isFor(i))for(var s=e.declarations,a=Array.isArray(s),r=0,s=a?s:(0,_getIterator3["default"])(s);;){var o;if(a){if(r>=s.length)break;o=s[r++]}else{if(r=s.next(),r.done)break;o=r.value}var h=o;h.init&&(n=!0)}var c=void 0;n&&(c="const"===e.kind?constDeclarationIdent:variableDeclarationIdent),this.printList(e.declarations,e,{separator:c}),(!t.isFor(i)||i.left!==e&&i.init!==e)&&this.semicolon()}function VariableDeclarator(t){this.print(t.id,t),this.print(t.id.typeAnnotation,t),t.init&&(this.space(),this.token("="),this.space(),this.print(t.init,t))}exports.__esModule=!0,exports.ThrowStatement=exports.BreakStatement=exports.ReturnStatement=exports.ContinueStatement=exports.ForAwaitStatement=exports.ForOfStatement=exports.ForInStatement=void 0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.WithStatement=WithStatement,exports.IfStatement=IfStatement,exports.ForStatement=ForStatement,exports.WhileStatement=WhileStatement,exports.DoWhileStatement=DoWhileStatement,exports.LabeledStatement=LabeledStatement,exports.TryStatement=TryStatement,exports.CatchClause=CatchClause,exports.SwitchStatement=SwitchStatement,exports.SwitchCase=SwitchCase,exports.DebuggerStatement=DebuggerStatement,exports.VariableDeclaration=VariableDeclaration,exports.VariableDeclarator=VariableDeclarator;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),buildForXStatement=function(t){return function(e){this.word("for"),this.space(),"await"===t&&(this.word("await"),this.space(),t="of"),this.token("("),this.print(e.left,e),this.space(),this.word(t),this.space(),this.print(e.right,e),this.token(")"),this.printBlock(e)}},ForInStatement=exports.ForInStatement=buildForXStatement("in"),ForOfStatement=exports.ForOfStatement=buildForXStatement("of"),ForAwaitStatement=exports.ForAwaitStatement=buildForXStatement("await"),ContinueStatement=exports.ContinueStatement=buildLabelStatement("continue"),ReturnStatement=exports.ReturnStatement=buildLabelStatement("return","argument"),BreakStatement=exports.BreakStatement=buildLabelStatement("break"),ThrowStatement=exports.ThrowStatement=buildLabelStatement("throw","argument");

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/classes.js":
/***/ function(module, exports) {

	"use strict";function ClassDeclaration(s){this.printJoin(s.decorators,s),this.word("class"),s.id&&(this.space(),this.print(s.id,s)),this.print(s.typeParameters,s),s.superClass&&(this.space(),this.word("extends"),this.space(),this.print(s.superClass,s),this.print(s.superTypeParameters,s)),s["implements"]&&(this.space(),this.word("implements"),this.space(),this.printList(s["implements"],s)),this.space(),this.print(s.body,s)}function ClassBody(s){this.token("{"),this.printInnerComments(s),0===s.body.length?this.token("}"):(this.newline(),this.indent(),this.printSequence(s.body,s),this.dedent(),this.endsWith("\n")||this.newline(),this.rightBrace())}function ClassProperty(s){this.printJoin(s.decorators,s),s["static"]&&(this.word("static"),this.space()),s.computed?(this.token("["),this.print(s.key,s),this.token("]")):this.print(s.key,s),this.print(s.typeAnnotation,s),s.value&&(this.space(),this.token("="),this.space(),this.print(s.value,s)),this.semicolon()}function ClassMethod(s){this.printJoin(s.decorators,s),s["static"]&&(this.word("static"),this.space()),"constructorCall"===s.kind&&(this.word("call"),this.space()),this._method(s)}exports.__esModule=!0,exports.ClassDeclaration=ClassDeclaration,exports.ClassBody=ClassBody,exports.ClassProperty=ClassProperty,exports.ClassMethod=ClassMethod,exports.ClassExpression=ClassDeclaration;

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/methods.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var i={};if(null!=t)for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=t[s]);return i["default"]=t,i}function _params(t){var i=this;this.print(t.typeParameters,t),this.token("("),this.printList(t.params,t,{iterator:function(t){t.optional&&i.token("?"),i.print(t.typeAnnotation,t)}}),this.token(")"),t.returnType&&this.print(t.returnType,t)}function _method(t){var i=t.kind,s=t.key;"method"!==i&&"init"!==i||t.generator&&this.token("*"),"get"!==i&&"set"!==i||(this.word(i),this.space()),t.async&&(this.word("async"),this.space()),t.computed?(this.token("["),this.print(s,t),this.token("]")):this.print(s,t),this._params(t),this.space(),this.print(t.body,t)}function FunctionExpression(t){t.async&&(this.word("async"),this.space()),this.word("function"),t.generator&&this.token("*"),t.id?(this.space(),this.print(t.id,t)):this.space(),this._params(t),this.space(),this.print(t.body,t)}function ArrowFunctionExpression(i){i.async&&(this.word("async"),this.space());var s=i.params[0];1===i.params.length&&t.isIdentifier(s)&&!hasTypes(i,s)?this.print(s,i):this._params(i),this.space(),this.token("=>"),this.space(),this.print(i.body,i)}function hasTypes(t,i){return t.typeParameters||t.returnType||i.typeAnnotation||i.optional||i.trailingComments}exports.__esModule=!0,exports.FunctionDeclaration=void 0,exports._params=_params,exports._method=_method,exports.FunctionExpression=FunctionExpression,exports.ArrowFunctionExpression=ArrowFunctionExpression;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);exports.FunctionDeclaration=FunctionExpression;

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/modules.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e["default"]=t,e}function ImportSpecifier(t){this.print(t.imported,t),t.local&&t.local.name!==t.imported.name&&(this.space(),this.word("as"),this.space(),this.print(t.local,t))}function ImportDefaultSpecifier(t){this.print(t.local,t)}function ExportDefaultSpecifier(t){this.print(t.exported,t)}function ExportSpecifier(t){this.print(t.local,t),t.exported&&t.local.name!==t.exported.name&&(this.space(),this.word("as"),this.space(),this.print(t.exported,t))}function ExportNamespaceSpecifier(t){this.token("*"),this.space(),this.word("as"),this.space(),this.print(t.exported,t)}function ExportAllDeclaration(t){this.word("export"),this.space(),this.token("*"),t.exported&&(this.space(),this.word("as"),this.space(),this.print(t.exported,t)),this.space(),this.word("from"),this.space(),this.print(t.source,t),this.semicolon()}function ExportNamedDeclaration(){this.word("export"),this.space(),ExportDeclaration.apply(this,arguments)}function ExportDefaultDeclaration(){this.word("export"),this.space(),this.word("default"),this.space(),ExportDeclaration.apply(this,arguments)}function ExportDeclaration(e){if(e.declaration){var i=e.declaration;this.print(i,e),t.isStatement(i)||this.semicolon()}else{"type"===e.exportKind&&(this.word("type"),this.space());for(var r=e.specifiers.slice(0),s=!1;;){var p=r[0];if(!t.isExportDefaultSpecifier(p)&&!t.isExportNamespaceSpecifier(p))break;s=!0,this.print(r.shift(),e),r.length&&(this.token(","),this.space())}(r.length||!r.length&&!s)&&(this.token("{"),r.length&&(this.space(),this.printList(r,e),this.space()),this.token("}")),e.source&&(this.space(),this.word("from"),this.space(),this.print(e.source,e)),this.semicolon()}}function ImportDeclaration(e){this.word("import"),this.space(),"type"!==e.importKind&&"typeof"!==e.importKind||(this.word(e.importKind),this.space());var i=e.specifiers.slice(0);if(i&&i.length){for(;;){var r=i[0];if(!t.isImportDefaultSpecifier(r)&&!t.isImportNamespaceSpecifier(r))break;this.print(i.shift(),e),i.length&&(this.token(","),this.space())}i.length&&(this.token("{"),this.space(),this.printList(i,e),this.space(),this.token("}")),this.space(),this.word("from"),this.space()}this.print(e.source,e),this.semicolon()}function ImportNamespaceSpecifier(t){this.token("*"),this.space(),this.word("as"),this.space(),this.print(t.local,t)}exports.__esModule=!0,exports.ImportSpecifier=ImportSpecifier,exports.ImportDefaultSpecifier=ImportDefaultSpecifier,exports.ExportDefaultSpecifier=ExportDefaultSpecifier,exports.ExportSpecifier=ExportSpecifier,exports.ExportNamespaceSpecifier=ExportNamespaceSpecifier,exports.ExportAllDeclaration=ExportAllDeclaration,exports.ExportNamedDeclaration=ExportNamedDeclaration,exports.ExportDefaultDeclaration=ExportDefaultDeclaration,exports.ImportDeclaration=ImportDeclaration,exports.ImportNamespaceSpecifier=ImportNamespaceSpecifier;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/types.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function Identifier(e){e.variance&&("plus"===e.variance?this.token("+"):"minus"===e.variance&&this.token("-")),this.word(e.name)}function RestElement(e){this.token("..."),this.print(e.argument,e)}function ObjectExpression(e){var t=e.properties;this.token("{"),this.printInnerComments(e),t.length&&(this.space(),this.printList(t,e,{indent:!0,statement:!0}),this.space()),this.token("}")}function ObjectMethod(e){this.printJoin(e.decorators,e),this._method(e)}function ObjectProperty(e){if(this.printJoin(e.decorators,e),e.computed)this.token("["),this.print(e.key,e),this.token("]");else{if(t.isAssignmentPattern(e.value)&&t.isIdentifier(e.key)&&e.key.name===e.value.left.name)return void this.print(e.value,e);if(this.print(e.key,e),e.shorthand&&t.isIdentifier(e.key)&&t.isIdentifier(e.value)&&e.key.name===e.value.name)return}this.token(":"),this.space(),this.print(e.value,e)}function ArrayExpression(e){var t=e.elements,r=t.length;this.token("["),this.printInnerComments(e);for(var i=0;i<t.length;i++){var s=t[i];s?(i>0&&this.space(),this.print(s,e),i<r-1&&this.token(",")):this.token(",")}this.token("]")}function RegExpLiteral(e){this.word("/"+e.pattern+"/"+e.flags)}function BooleanLiteral(e){this.word(e.value?"true":"false")}function NullLiteral(){this.word("null")}function NumericLiteral(e){var t=this.getPossibleRaw(e);this.number(null==t?e.value+"":t)}function StringLiteral(e,r){var i=this.getPossibleRaw(e);if(null!=i)return void this.token(i);var s=(0,_jsesc2["default"])(e.value,{quotes:t.isJSX(r)?"double":this.format.quotes,wrap:!0});return this.token(s)}exports.__esModule=!0,exports.ArrayPattern=exports.ObjectPattern=exports.RestProperty=exports.SpreadProperty=exports.SpreadElement=void 0,exports.Identifier=Identifier,exports.RestElement=RestElement,exports.ObjectExpression=ObjectExpression,exports.ObjectMethod=ObjectMethod,exports.ObjectProperty=ObjectProperty,exports.ArrayExpression=ArrayExpression,exports.RegExpLiteral=RegExpLiteral,exports.BooleanLiteral=BooleanLiteral,exports.NullLiteral=NullLiteral,exports.NumericLiteral=NumericLiteral,exports.StringLiteral=StringLiteral;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_jsesc=__webpack_require__("./node_modules/jsesc/jsesc.js"),_jsesc2=_interopRequireDefault(_jsesc);exports.SpreadElement=RestElement,exports.SpreadProperty=RestElement,exports.RestProperty=RestElement,exports.ObjectPattern=ObjectExpression,exports.ArrayPattern=ArrayExpression;

/***/ },

/***/ "./node_modules/jsesc/jsesc.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {!function(e){var n="object"==typeof exports&&exports,t="object"==typeof module&&module&&module.exports==n&&module,r="object"==typeof global&&global;r.global!==r&&r.window!==r||(e=r);var i={},o=i.hasOwnProperty,c=function(e,n){var t;for(t in e)o.call(e,t)&&n(t,e[t])},u=function(e,n){return n?(c(n,function(n,t){e[n]=t}),e):e},a=function(e,n){for(var t=e.length,r=-1;++r<t;)n(e[r])},l=i.toString,f=function(e){return"[object Array]"==l.call(e)},s=function(e){return"[object Object]"==l.call(e)},_=function(e){return"string"==typeof e||"[object String]"==l.call(e)},p=function(e){return"number"==typeof e||"[object Number]"==l.call(e)},b=function(e){return"function"==typeof e||"[object Function]"==l.call(e)},d=function(e){return"[object Map]"==l.call(e)},g=function(e){return"[object Set]"==l.call(e)},m={'"':'\\"',"'":"\\'","\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},j=/["'\\\b\f\n\r\t]/,y=/[0-9]/,S=/[ !#-&\(-\[\]-~]/,h=function(e,n){var t={escapeEverything:!1,escapeEtago:!1,quotes:"single",wrap:!1,es6:!1,json:!1,compact:!0,lowercaseHex:!1,numbers:"decimal",indent:"\t",__indent__:"",__inline1__:!1,__inline2__:!1},r=n&&n.json;r&&(t.quotes="double",t.wrap=!0),n=u(t,n),"single"!=n.quotes&&"double"!=n.quotes&&(n.quotes="single");var i,o="double"==n.quotes?'"':"'",l=n.compact,v=n.indent,w=n.lowercaseHex,x="",A=n.__inline1__,q=n.__inline2__,C=l?"":"\n",O=!0,N="binary"==n.numbers,E="octal"==n.numbers,J="decimal"==n.numbers,M="hexadecimal"==n.numbers;if(r&&e&&b(e.toJSON)&&(e=e.toJSON()),!_(e)){if(d(e))return 0==e.size?"new Map()":(l||(n.__inline1__=!0),"new Map("+h(Array.from(e),n)+")");if(g(e))return 0==e.size?"new Set()":"new Set("+h(Array.from(e),n)+")";if(f(e))return i=[],n.wrap=!0,A?(n.__inline1__=!1,n.__inline2__=!0):(x=n.__indent__,v+=x,n.__indent__=v),a(e,function(e){O=!1,q&&(n.__inline2__=!1),i.push((l||q?"":v)+h(e,n))}),O?"[]":q?"["+i.join(", ")+"]":"["+C+i.join(","+C)+C+(l?"":x)+"]";if(!p(e))return s(e)?(i=[],n.wrap=!0,x=n.__indent__,v+=x,n.__indent__=v,c(e,function(e,t){O=!1,i.push((l?"":v)+h(e,n)+":"+(l?"":" ")+h(t,n))}),O?"{}":"{"+C+i.join(","+C)+C+(l?"":x)+"}"):r?JSON.stringify(e)||"null":String(e);if(r)return JSON.stringify(e);if(J)return String(e);if(M){var U=e.toString(16);return w||(U=U.toUpperCase()),"0x"+U}if(N)return"0b"+e.toString(2);if(E)return"0o"+e.toString(8)}var z,H,F,P=e,T=-1,$=P.length;for(i="";++T<$;){var k=P.charAt(T);if(n.es6&&(z=P.charCodeAt(T),z>=55296&&z<=56319&&$>T+1&&(H=P.charCodeAt(T+1),H>=56320&&H<=57343))){F=1024*(z-55296)+H-56320+65536;var B=F.toString(16);w||(B=B.toUpperCase()),i+="\\u{"+B+"}",T++}else{if(!n.escapeEverything){if(S.test(k)){i+=k;continue}if('"'==k){i+=o==k?'\\"':k;continue}if("'"==k){i+=o==k?"\\'":k;continue}}if("\0"!=k||r||y.test(P.charAt(T+1)))if(j.test(k))i+=m[k];else{var D=k.charCodeAt(0),B=D.toString(16);w||(B=B.toUpperCase());var G=B.length>2||r,I="\\"+(G?"u":"x")+("0000"+B).slice(G?-4:-2);i+=I}else i+="\\0"}}return n.wrap&&(i=o+i+o),n.escapeEtago?i.replace(/<\/(script|style)/gi,"<\\/$1"):i};h.version="1.3.0", true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return h}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):n&&!n.nodeType?t?t.exports=h:n.jsesc=h:e.jsesc=h}(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module), (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/flow.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function AnyTypeAnnotation(){this.word("any")}function ArrayTypeAnnotation(t){this.print(t.elementType,t),this.token("["),this.token("]")}function BooleanTypeAnnotation(){this.word("bool")}function BooleanLiteralTypeAnnotation(t){this.word(t.value?"true":"false")}function NullLiteralTypeAnnotation(){this.word("null")}function DeclareClass(t){this.word("declare"),this.space(),this.word("class"),this.space(),this._interfaceish(t)}function DeclareFunction(t){this.word("declare"),this.space(),this.word("function"),this.space(),this.print(t.id,t),this.print(t.id.typeAnnotation.typeAnnotation,t),this.semicolon()}function DeclareInterface(t){this.word("declare"),this.space(),this.InterfaceDeclaration(t)}function DeclareModule(t){this.word("declare"),this.space(),this.word("module"),this.space(),this.print(t.id,t),this.space(),this.print(t.body,t)}function DeclareModuleExports(t){this.word("declare"),this.space(),this.word("module"),this.token("."),this.word("exports"),this.print(t.typeAnnotation,t)}function DeclareTypeAlias(t){this.word("declare"),this.space(),this.TypeAlias(t)}function DeclareVariable(t){this.word("declare"),this.space(),this.word("var"),this.space(),this.print(t.id,t),this.print(t.id.typeAnnotation,t),this.semicolon()}function ExistentialTypeParam(){this.token("*")}function FunctionTypeAnnotation(t,e){this.print(t.typeParameters,t),this.token("("),this.printList(t.params,t),t.rest&&(t.params.length&&(this.token(","),this.space()),this.token("..."),this.print(t.rest,t)),this.token(")"),"ObjectTypeCallProperty"===e.type||"DeclareFunction"===e.type?this.token(":"):(this.space(),this.token("=>")),this.space(),this.print(t.returnType,t)}function FunctionTypeParam(t){this.print(t.name,t),t.optional&&this.token("?"),this.token(":"),this.space(),this.print(t.typeAnnotation,t)}function InterfaceExtends(t){this.print(t.id,t),this.print(t.typeParameters,t)}function _interfaceish(t){this.print(t.id,t),this.print(t.typeParameters,t),t["extends"].length&&(this.space(),this.word("extends"),this.space(),this.printList(t["extends"],t)),t.mixins&&t.mixins.length&&(this.space(),this.word("mixins"),this.space(),this.printList(t.mixins,t)),this.space(),this.print(t.body,t)}function InterfaceDeclaration(t){this.word("interface"),this.space(),this._interfaceish(t)}function andSeparator(){this.space(),this.token("&"),this.space()}function IntersectionTypeAnnotation(t){this.printJoin(t.types,t,{separator:andSeparator})}function MixedTypeAnnotation(){this.word("mixed")}function NullableTypeAnnotation(t){this.token("?"),this.print(t.typeAnnotation,t)}function NumberTypeAnnotation(){this.word("number")}function StringTypeAnnotation(){this.word("string")}function ThisTypeAnnotation(){this.word("this")}function TupleTypeAnnotation(t){this.token("["),this.printList(t.types,t),this.token("]")}function TypeofTypeAnnotation(t){this.word("typeof"),this.space(),this.print(t.argument,t)}function TypeAlias(t){this.word("type"),this.space(),this.print(t.id,t),this.print(t.typeParameters,t),this.space(),this.token("="),this.space(),this.print(t.right,t),this.semicolon()}function TypeAnnotation(t){this.token(":"),this.space(),t.optional&&this.token("?"),this.print(t.typeAnnotation,t)}function TypeParameter(t){"plus"===t.variance?this.token("+"):"minus"===t.variance&&this.token("-"),this.word(t.name),t.bound&&this.print(t.bound,t),t["default"]&&(this.space(),this.token("="),this.space(),this.print(t["default"],t))}function TypeParameterInstantiation(t){this.token("<"),this.printList(t.params,t,{}),this.token(">")}function ObjectTypeAnnotation(t){var e=this;t.exact?this.token("{|"):this.token("{");var n=t.properties.concat(t.callProperties,t.indexers);n.length&&(this.space(),this.printJoin(n,t,{indent:!0,statement:!0,iterator:function(){1!==n.length&&(e.semicolon(),e.space())}}),this.space()),t.exact?this.token("|}"):this.token("}")}function ObjectTypeCallProperty(t){t["static"]&&(this.word("static"),this.space()),this.print(t.value,t)}function ObjectTypeIndexer(t){t["static"]&&(this.word("static"),this.space()),this.token("["),this.print(t.id,t),this.token(":"),this.space(),this.print(t.key,t),this.token("]"),this.token(":"),this.space(),this.print(t.value,t)}function ObjectTypeProperty(t){t["static"]&&(this.word("static"),this.space()),this.print(t.key,t),t.optional&&this.token("?"),this.token(":"),this.space(),this.print(t.value,t)}function QualifiedTypeIdentifier(t){this.print(t.qualification,t),this.token("."),this.print(t.id,t)}function orSeparator(){this.space(),this.token("|"),this.space()}function UnionTypeAnnotation(t){this.printJoin(t.types,t,{separator:orSeparator})}function TypeCastExpression(t){this.token("("),this.print(t.expression,t),this.print(t.typeAnnotation,t),this.token(")")}function VoidTypeAnnotation(){this.word("void")}exports.__esModule=!0,exports.AnyTypeAnnotation=AnyTypeAnnotation,exports.ArrayTypeAnnotation=ArrayTypeAnnotation,exports.BooleanTypeAnnotation=BooleanTypeAnnotation,exports.BooleanLiteralTypeAnnotation=BooleanLiteralTypeAnnotation,exports.NullLiteralTypeAnnotation=NullLiteralTypeAnnotation,exports.DeclareClass=DeclareClass,exports.DeclareFunction=DeclareFunction,exports.DeclareInterface=DeclareInterface,exports.DeclareModule=DeclareModule,exports.DeclareModuleExports=DeclareModuleExports,exports.DeclareTypeAlias=DeclareTypeAlias,exports.DeclareVariable=DeclareVariable,exports.ExistentialTypeParam=ExistentialTypeParam,exports.FunctionTypeAnnotation=FunctionTypeAnnotation,exports.FunctionTypeParam=FunctionTypeParam,exports.InterfaceExtends=InterfaceExtends,exports._interfaceish=_interfaceish,exports.InterfaceDeclaration=InterfaceDeclaration,exports.IntersectionTypeAnnotation=IntersectionTypeAnnotation,exports.MixedTypeAnnotation=MixedTypeAnnotation,exports.NullableTypeAnnotation=NullableTypeAnnotation;var _types=__webpack_require__("./node_modules/babel-generator/lib/generators/types.js");Object.defineProperty(exports,"NumericLiteralTypeAnnotation",{enumerable:!0,get:function(){return _types.NumericLiteral}}),Object.defineProperty(exports,"StringLiteralTypeAnnotation",{enumerable:!0,get:function(){return _types.StringLiteral}}),exports.NumberTypeAnnotation=NumberTypeAnnotation,exports.StringTypeAnnotation=StringTypeAnnotation,exports.ThisTypeAnnotation=ThisTypeAnnotation,exports.TupleTypeAnnotation=TupleTypeAnnotation,exports.TypeofTypeAnnotation=TypeofTypeAnnotation,exports.TypeAlias=TypeAlias,exports.TypeAnnotation=TypeAnnotation,exports.TypeParameter=TypeParameter,exports.TypeParameterInstantiation=TypeParameterInstantiation,exports.ObjectTypeAnnotation=ObjectTypeAnnotation,exports.ObjectTypeCallProperty=ObjectTypeCallProperty,exports.ObjectTypeIndexer=ObjectTypeIndexer,exports.ObjectTypeProperty=ObjectTypeProperty,exports.QualifiedTypeIdentifier=QualifiedTypeIdentifier,exports.UnionTypeAnnotation=UnionTypeAnnotation,exports.TypeCastExpression=TypeCastExpression,exports.VoidTypeAnnotation=VoidTypeAnnotation,exports.ClassImplements=InterfaceExtends,exports.GenericTypeAnnotation=InterfaceExtends,exports.TypeParameterDeclaration=TypeParameterInstantiation;

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/base.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function File(e){this.print(e.program,e)}function Program(e){this.printInnerComments(e,!1),this.printSequence(e.directives,e),e.directives&&e.directives.length&&this.newline(),this.printSequence(e.body,e)}function BlockStatement(e){this.token("{"),this.printInnerComments(e),e.body.length?(this.newline(),this.printSequence(e.directives,e,{indent:!0}),e.directives&&e.directives.length&&this.newline(),this.printSequence(e.body,e,{indent:!0}),this.removeTrailingNewline(),this.source("end",e.loc),this.endsWith("\n")||this.newline(),this.rightBrace()):(this.source("end",e.loc),this.token("}"))}function Noop(){}function Directive(e){this.print(e.value,e),this.semicolon()}exports.__esModule=!0,exports.File=File,exports.Program=Program,exports.BlockStatement=BlockStatement,exports.Noop=Noop,exports.Directive=Directive;var _types=__webpack_require__("./node_modules/babel-generator/lib/generators/types.js");Object.defineProperty(exports,"DirectiveLiteral",{enumerable:!0,get:function(){return _types.StringLiteral}});

/***/ },

/***/ "./node_modules/babel-generator/lib/generators/jsx.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function JSXAttribute(t){this.print(t.name,t),t.value&&(this.token("="),this.print(t.value,t))}function JSXIdentifier(t){this.word(t.name)}function JSXNamespacedName(t){this.print(t.namespace,t),this.token(":"),this.print(t.name,t)}function JSXMemberExpression(t){this.print(t.object,t),this.token("."),this.print(t.property,t)}function JSXSpreadAttribute(t){this.token("{"),this.token("..."),this.print(t.argument,t),this.token("}")}function JSXExpressionContainer(t){this.token("{"),this.print(t.expression,t),this.token("}")}function JSXText(t){this.token(t.value)}function JSXElement(t){var e=t.openingElement;if(this.print(e,t),!e.selfClosing){this.indent();for(var n=t.children,i=Array.isArray(n),r=0,n=i?n:(0,_getIterator3["default"])(n);;){var s;if(i){if(r>=n.length)break;s=n[r++]}else{if(r=n.next(),r.done)break;s=r.value}var o=s;this.print(o,t)}this.dedent(),this.print(t.closingElement,t)}}function spaceSeparator(){this.space()}function JSXOpeningElement(t){this.token("<"),this.print(t.name,t),t.attributes.length>0&&(this.space(),this.printJoin(t.attributes,t,{separator:spaceSeparator})),t.selfClosing?(this.space(),this.token("/>")):this.token(">")}function JSXClosingElement(t){this.token("</"),this.print(t.name,t),this.token(">")}function JSXEmptyExpression(){}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports.JSXAttribute=JSXAttribute,exports.JSXIdentifier=JSXIdentifier,exports.JSXNamespacedName=JSXNamespacedName,exports.JSXMemberExpression=JSXMemberExpression,exports.JSXSpreadAttribute=JSXSpreadAttribute,exports.JSXExpressionContainer=JSXExpressionContainer,exports.JSXText=JSXText,exports.JSXElement=JSXElement,exports.JSXOpeningElement=JSXOpeningElement,exports.JSXClosingElement=JSXClosingElement,exports.JSXEmptyExpression=JSXEmptyExpression;

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/file/logger.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_node=__webpack_require__("./node_modules/debug/node.js"),_node2=_interopRequireDefault(_node),verboseDebug=(0,_node2["default"])("babel:verbose"),generalDebug=(0,_node2["default"])("babel"),seenDeprecatedMessages=[],Logger=function(){function e(s,t){(0,_classCallCheck3["default"])(this,e),this.filename=t,this.file=s}return e.prototype._buildMessage=function(e){var s="[BABEL] "+this.filename;return e&&(s+=": "+e),s},e.prototype.warn=function(e){console.warn(this._buildMessage(e))},e.prototype.error=function(e){var s=arguments.length<=1||void 0===arguments[1]?Error:arguments[1];throw new s(this._buildMessage(e))},e.prototype.deprecate=function(e){this.file.opts&&this.file.opts.suppressDeprecationMessages||(e=this._buildMessage(e),seenDeprecatedMessages.indexOf(e)>=0||(seenDeprecatedMessages.push(e),console.error(e)))},e.prototype.verbose=function(e){verboseDebug.enabled&&verboseDebug(this._buildMessage(e))},e.prototype.debug=function(e){generalDebug.enabled&&generalDebug(this._buildMessage(e))},e.prototype.deopt=function(e,s){this.debug(s)},e}();exports["default"]=Logger,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/debug/node.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {function useColors(){var e=(process.env.DEBUG_COLORS||"").trim().toLowerCase();return 0===e.length?tty.isatty(fd):"0"!==e&&"no"!==e&&"false"!==e&&"disabled"!==e}function formatArgs(){var e=arguments,r=this.useColors,t=this.namespace;if(r){var s=this.color;e[0]="  [3"+s+";1m"+t+" [0m"+e[0]+"[3"+s+"m +"+exports.humanize(this.diff)+"[0m"}else e[0]=(new Date).toUTCString()+" "+t+" "+e[0];return e}function log(){return stream.write(util.format.apply(this,arguments)+"\n")}function save(e){null==e?delete process.env.DEBUG:process.env.DEBUG=e}function load(){return process.env.DEBUG}function createWritableStdioStream(e){var r,t=process.binding("tty_wrap");switch(t.guessHandleType(e)){case"TTY":r=new tty.WriteStream(e),r._type="tty",r._handle&&r._handle.unref&&r._handle.unref();break;case"FILE":var s=__webpack_require__("./node_modules/webpack/node_modules/node-libs-browser/mock/empty.js");r=new s.SyncWriteStream(e,{autoClose:!1}),r._type="fs";break;case"PIPE":case"TCP":var o=__webpack_require__("./node_modules/webpack/node_modules/node-libs-browser/mock/empty.js");r=new o.Socket({fd:e,readable:!1,writable:!0}),r.readable=!1,r.read=null,r._type="pipe",r._handle&&r._handle.unref&&r._handle.unref();break;default:throw new Error("Implement me. Unknown stream file type!")}return r.fd=e,r._isStdio=!0,r}var tty=__webpack_require__("./node_modules/tty-browserify/index.js"),util=__webpack_require__("./node_modules/util/util.js");exports=module.exports=__webpack_require__("./node_modules/debug/debug.js"),exports.log=log,exports.formatArgs=formatArgs,exports.save=save,exports.load=load,exports.useColors=useColors,exports.colors=[6,2,3,4,5,1];var fd=parseInt(process.env.DEBUG_FD,10)||2,stream=1===fd?process.stdout:2===fd?process.stderr:createWritableStdioStream(fd),inspect=4===util.inspect.length?function(e,r){return util.inspect(e,void 0,void 0,r)}:function(e,r){return util.inspect(e,{colors:r})};exports.formatters.o=function(e){return inspect(e,this.useColors).replace(/\s*\n\s*/g," ")},exports.enable(load());
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/tty-browserify/index.js":
/***/ function(module, exports) {

	function ReadStream(){throw new Error("tty.ReadStream is not implemented")}function WriteStream(){throw new Error("tty.ReadStream is not implemented")}exports.isatty=function(){return!1},exports.ReadStream=ReadStream,exports.WriteStream=WriteStream;

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/internal-plugins/block-hoist.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _plugin=__webpack_require__("./node_modules/babel-core/lib/transformation/plugin.js"),_plugin2=_interopRequireDefault(_plugin),_sortBy=__webpack_require__("./node_modules/lodash/sortBy.js"),_sortBy2=_interopRequireDefault(_sortBy);exports["default"]=new _plugin2["default"]({name:"internal.blockHoist",visitor:{Block:{exit:function(e){for(var t=e.node,o=!1,r=0;r<t.body.length;r++){var u=t.body[r];if(u&&null!=u._blockHoist){o=!0;break}}o&&(t.body=(0,_sortBy2["default"])(t.body,function(e){var t=e&&e._blockHoist;return null==t&&(t=1),t===!0&&(t=2),-1*t}))}}}}),module.exports=exports["default"];

/***/ },

/***/ "./node_modules/lodash/sortBy.js":
/***/ function(module, exports, __webpack_require__) {

	var baseFlatten=__webpack_require__("./node_modules/lodash/_baseFlatten.js"),baseOrderBy=__webpack_require__("./node_modules/lodash/_baseOrderBy.js"),baseRest=__webpack_require__("./node_modules/lodash/_baseRest.js"),isIterateeCall=__webpack_require__("./node_modules/lodash/_isIterateeCall.js"),sortBy=baseRest(function(e,r){if(null==e)return[];var t=r.length;return t>1&&isIterateeCall(e,r[0],r[1])?r=[]:t>2&&isIterateeCall(r[0],r[1],r[2])&&(r=[r[0]]),baseOrderBy(e,baseFlatten(r,1),[])});module.exports=sortBy;

/***/ },

/***/ "./node_modules/lodash/_baseFlatten.js":
/***/ function(module, exports, __webpack_require__) {

	function baseFlatten(a,e,r,t,l){var n=-1,s=a.length;for(r||(r=isFlattenable),l||(l=[]);++n<s;){var u=a[n];e>0&&r(u)?e>1?baseFlatten(u,e-1,r,t,l):arrayPush(l,u):t||(l[l.length]=u)}return l}var arrayPush=__webpack_require__("./node_modules/lodash/_arrayPush.js"),isFlattenable=__webpack_require__("./node_modules/lodash/_isFlattenable.js");module.exports=baseFlatten;

/***/ },

/***/ "./node_modules/lodash/_isFlattenable.js":
/***/ function(module, exports, __webpack_require__) {

	function isFlattenable(e){return isArray(e)||isArguments(e)||!!(spreadableSymbol&&e&&e[spreadableSymbol])}var Symbol=__webpack_require__("./node_modules/lodash/_Symbol.js"),isArguments=__webpack_require__("./node_modules/lodash/isArguments.js"),isArray=__webpack_require__("./node_modules/lodash/isArray.js"),spreadableSymbol=Symbol?Symbol.isConcatSpreadable:void 0;module.exports=isFlattenable;

/***/ },

/***/ "./node_modules/lodash/_baseOrderBy.js":
/***/ function(module, exports, __webpack_require__) {

	function baseOrderBy(e,r,a){var t=-1;r=arrayMap(r.length?r:[identity],baseUnary(baseIteratee));var i=baseMap(e,function(e,a,i){var n=arrayMap(r,function(r){return r(e)});return{criteria:n,index:++t,value:e}});return baseSortBy(i,function(e,r){return compareMultiple(e,r,a)})}var arrayMap=__webpack_require__("./node_modules/lodash/_arrayMap.js"),baseIteratee=__webpack_require__("./node_modules/lodash/_baseIteratee.js"),baseMap=__webpack_require__("./node_modules/lodash/_baseMap.js"),baseSortBy=__webpack_require__("./node_modules/lodash/_baseSortBy.js"),baseUnary=__webpack_require__("./node_modules/lodash/_baseUnary.js"),compareMultiple=__webpack_require__("./node_modules/lodash/_compareMultiple.js"),identity=__webpack_require__("./node_modules/lodash/identity.js");module.exports=baseOrderBy;

/***/ },

/***/ "./node_modules/lodash/_baseSortBy.js":
/***/ function(module, exports) {

	function baseSortBy(r,e){var o=r.length;for(r.sort(e);o--;)r[o]=r[o].value;return r}module.exports=baseSortBy;

/***/ },

/***/ "./node_modules/lodash/_compareMultiple.js":
/***/ function(module, exports, __webpack_require__) {

	function compareMultiple(e,r,i){for(var n=-1,c=e.criteria,a=r.criteria,t=c.length,o=i.length;++n<t;){var p=compareAscending(c[n],a[n]);if(p){if(n>=o)return p;var u=i[n];return p*("desc"==u?-1:1)}}return e.index-r.index}var compareAscending=__webpack_require__("./node_modules/lodash/_compareAscending.js");module.exports=compareMultiple;

/***/ },

/***/ "./node_modules/lodash/_compareAscending.js":
/***/ function(module, exports, __webpack_require__) {

	function compareAscending(i,r){if(i!==r){var e=void 0!==i,n=null===i,o=i===i,l=isSymbol(i),u=void 0!==r,m=null===r,s=r===r,c=isSymbol(r);if(!m&&!c&&!l&&i>r||l&&u&&s&&!m&&!c||n&&u&&s||!e&&s||!o)return 1;if(!n&&!l&&!c&&i<r||c&&e&&o&&!n&&!l||m&&e&&o||!u&&o||!s)return-1}return 0}var isSymbol=__webpack_require__("./node_modules/lodash/isSymbol.js");module.exports=compareAscending;

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/internal-plugins/shadow-functions.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(r[i]=e[i]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function shouldShadow(e,r){return!!e.is("_forceShadow")||r}function remap(e,r){var i=e.inShadow(r);if(shouldShadow(e,i)){var n=e.node._shadowedFunctionLiteral,s=void 0,o=!1,u=e.findParent(function(e){if((e.isProgram()||e.isFunction())&&(s=s||e),e.isProgram())return o=!0,!0;if(e.isFunction()&&!e.isArrowFunctionExpression()){if(n){if(e===n||e.node===n.node)return!0}else if(!e.is("shadow"))return!0;return o=!0,!1}return!1});if(n&&u.isProgram()&&!n.isProgram()&&(u=e.findParent(function(e){return e.isProgram()||e.isFunction()})),u!==s&&o){var a=u.getData(r);if(a)return e.replaceWith(a);var d=e.scope.generateUidIdentifier(r);u.setData(r,d);var l=u.findParent(function(e){return e.isClass()}),p=!!(l&&l.node&&l.node.superClass);if("this"===r&&u.isMethod({kind:"constructor"})&&p)u.scope.push({id:d}),u.traverse(superVisitor,{id:d});else{var f="this"===r?t.thisExpression():t.identifier(r);n&&(f._shadowedFunctionLiteral=n),u.scope.push({id:d,init:f})}return e.replaceWith(d)}}}exports.__esModule=!0;var _symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol),_plugin=__webpack_require__("./node_modules/babel-core/lib/transformation/plugin.js"),_plugin2=_interopRequireDefault(_plugin),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),SUPER_THIS_BOUND=(0,_symbol2["default"])("super this bound"),superVisitor={CallExpression:function(e){if(e.get("callee").isSuper()){var r=e.node;r[SUPER_THIS_BOUND]||(r[SUPER_THIS_BOUND]=!0,e.replaceWith(t.assignmentExpression("=",this.id,r)))}}};exports["default"]=new _plugin2["default"]({name:"internal.shadowFunctions",visitor:{ThisExpression:function(e){remap(e,"this")},ReferencedIdentifier:function(e){"arguments"===e.node.name&&remap(e,"arguments")}}}),module.exports=exports["default"];

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./index": "./node_modules/babel-core/lib/transformation/file/index.js",
		"./index.js": "./node_modules/babel-core/lib/transformation/file/index.js",
		"./logger": "./node_modules/babel-core/lib/transformation/file/logger.js",
		"./logger.js": "./node_modules/babel-core/lib/transformation/file/logger.js",
		"./metadata": "./node_modules/babel-core/lib/transformation/file/metadata.js",
		"./metadata.js": "./node_modules/babel-core/lib/transformation/file/metadata.js",
		"./options/build-config-chain": "./node_modules/babel-core/lib/transformation/file/options/build-config-chain.js",
		"./options/build-config-chain.js": "./node_modules/babel-core/lib/transformation/file/options/build-config-chain.js",
		"./options/config": "./node_modules/babel-core/lib/transformation/file/options/config.js",
		"./options/config.js": "./node_modules/babel-core/lib/transformation/file/options/config.js",
		"./options/index": "./node_modules/babel-core/lib/transformation/file/options/index.js",
		"./options/index.js": "./node_modules/babel-core/lib/transformation/file/options/index.js",
		"./options/option-manager": "./node_modules/babel-core/lib/transformation/file/options/option-manager.js",
		"./options/option-manager.js": "./node_modules/babel-core/lib/transformation/file/options/option-manager.js",
		"./options/parsers": "./node_modules/babel-core/lib/transformation/file/options/parsers.js",
		"./options/parsers.js": "./node_modules/babel-core/lib/transformation/file/options/parsers.js",
		"./options/removed": "./node_modules/babel-core/lib/transformation/file/options/removed.js",
		"./options/removed.js": "./node_modules/babel-core/lib/transformation/file/options/removed.js"
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
	webpackContext.id = 14;


/***/ },

/***/ "./node_modules/babel-core/lib/tools/build-external-helpers.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function buildGlobal(e,r){var a=[],i=t.functionExpression(null,[t.identifier("global")],t.blockStatement(a)),l=t.program([t.expressionStatement(t.callExpression(i,[helpers.get("selfGlobal")]))]);return a.push(t.variableDeclaration("var",[t.variableDeclarator(e,t.assignmentExpression("=",t.memberExpression(t.identifier("global"),e),t.objectExpression([])))])),r(a),l}function buildUmd(e,r){var a=[];return a.push(t.variableDeclaration("var",[t.variableDeclarator(e,t.identifier("global"))])),r(a),t.program([buildUmdWrapper({FACTORY_PARAMETERS:t.identifier("global"),BROWSER_ARGUMENTS:t.assignmentExpression("=",t.memberExpression(t.identifier("root"),e),t.objectExpression([])),COMMON_ARGUMENTS:t.identifier("exports"),AMD_ARGUMENTS:t.arrayExpression([t.stringLiteral("exports")]),FACTORY_BODY:a,UMD_ROOT:t.identifier("this")})])}function buildVar(e,r){var a=[];return a.push(t.variableDeclaration("var",[t.variableDeclarator(e,t.objectExpression([]))])),r(a),a.push(t.expressionStatement(e)),t.program(a)}function buildHelpers(e,r,a){(0,_each2["default"])(helpers.list,function(i){if(!(a&&a.indexOf(i)<0)){var l=t.identifier(i);e.push(t.expressionStatement(t.assignmentExpression("=",t.memberExpression(r,l),helpers.get(i))))}})}exports.__esModule=!0,exports["default"]=function(e){var r=arguments.length<=1||void 0===arguments[1]?"global":arguments[1],a=t.identifier("babelHelpers"),i=function(r){return buildHelpers(r,a,e)},l=void 0,n={global:buildGlobal,umd:buildUmd,"var":buildVar}[r];if(!n)throw new Error(messages.get("unsupportedOutputType",r));return l=n(a,i),(0,_babelGenerator2["default"])(l).code};var _babelHelpers=__webpack_require__("./node_modules/babel-helpers/lib/index.js"),helpers=_interopRequireWildcard(_babelHelpers),_babelGenerator=__webpack_require__("./node_modules/babel-generator/lib/index.js"),_babelGenerator2=_interopRequireDefault(_babelGenerator),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_each=__webpack_require__("./node_modules/lodash/each.js"),_each2=_interopRequireDefault(_each),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),buildUmdWrapper=(0,_babelTemplate2["default"])('\n  (function (root, factory) {\n    if (typeof define === "function" && define.amd) {\n      define(AMD_ARGUMENTS, factory);\n    } else if (typeof exports === "object") {\n      factory(COMMON_ARGUMENTS);\n    } else {\n      factory(BROWSER_ARGUMENTS);\n    }\n  })(UMD_ROOT, function (FACTORY_PARAMETERS) {\n    FACTORY_BODY\n  });\n');module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-core/lib/transformation/pipeline.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_normalizeAst=__webpack_require__("./node_modules/babel-core/lib/helpers/normalize-ast.js"),_normalizeAst2=_interopRequireDefault(_normalizeAst),_plugin=__webpack_require__("./node_modules/babel-core/lib/transformation/plugin.js"),_plugin2=_interopRequireDefault(_plugin),_file=__webpack_require__("./node_modules/babel-core/lib/transformation/file/index.js"),_file2=_interopRequireDefault(_file),Pipeline=function(){function e(){(0,_classCallCheck3["default"])(this,e)}return e.prototype.lint=function(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return r.code=!1,r.mode="lint",this.transform(e,r)},e.prototype.pretransform=function(e,r){var t=new _file2["default"](r,this);return t.wrap(e,function(){return t.addCode(e),t.parseCode(e),t})},e.prototype.transform=function(e,r){var t=new _file2["default"](r,this);return t.wrap(e,function(){return t.addCode(e),t.parseCode(e),t.transform()})},e.prototype.analyse=function(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t=arguments[2];return r.code=!1,t&&(r.plugins=r.plugins||[],r.plugins.push(new _plugin2["default"]({visitor:t}))),this.transform(e,r).metadata},e.prototype.transformFromAst=function(e,r,t){e=(0,_normalizeAst2["default"])(e);var n=new _file2["default"](t,this);return n.wrap(r,function(){return n.addCode(r),n.addAst(e),n.transform()})},e}();exports["default"]=Pipeline,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-core/lib/helpers/normalize-ast.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}exports.__esModule=!0,exports["default"]=function(e,r,i){if(e){if("Program"===e.type)return t.file(e,r||[],i||[]);if("File"===e.type)return e}throw new Error("Not a valid ast?")};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-preset-es2015/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function preset(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],s=["commonjs","amd","umd","systemjs"],l=!1,a="commonjs",n=!1;if(void 0!==r&&(void 0!==r.loose&&(l=r.loose),void 0!==r.modules&&(a=r.modules),void 0!==r.spec&&(n=r.spec)),"boolean"!=typeof l)throw new Error("Preset es2015 'loose' option must be a boolean.");if("boolean"!=typeof n)throw new Error("Preset es2015 'spec' option must be a boolean.");if(a!==!1&&s.indexOf(a)===-1)throw new Error("Preset es2015 'modules' option must be 'false' to indicate no modules\nor a module type which be be one of: 'commonjs' (default), 'amd', 'umd', 'systemjs'");var o={loose:l};return{plugins:[[_babelPluginTransformEs2015TemplateLiterals2["default"],{loose:l,spec:n}],_babelPluginTransformEs2015Literals2["default"],_babelPluginTransformEs2015FunctionName2["default"],[_babelPluginTransformEs2015ArrowFunctions2["default"],{spec:n}],_babelPluginTransformEs2015BlockScopedFunctions2["default"],[_babelPluginTransformEs2015Classes2["default"],o],_babelPluginTransformEs2015ObjectSuper2["default"],_babelPluginTransformEs2015ShorthandProperties2["default"],_babelPluginTransformEs2015DuplicateKeys2["default"],[_babelPluginTransformEs2015ComputedProperties2["default"],o],[_babelPluginTransformEs2015ForOf2["default"],o],_babelPluginTransformEs2015StickyRegex2["default"],_babelPluginTransformEs2015UnicodeRegex2["default"],_babelPluginCheckEs2015Constants2["default"],[_babelPluginTransformEs2015Spread2["default"],o],_babelPluginTransformEs2015Parameters2["default"],[_babelPluginTransformEs2015Destructuring2["default"],o],_babelPluginTransformEs2015BlockScoping2["default"],_babelPluginTransformEs2015TypeofSymbol2["default"],"commonjs"===a&&[_babelPluginTransformEs2015ModulesCommonjs2["default"],o],"systemjs"===a&&[_babelPluginTransformEs2015ModulesSystemjs2["default"],o],"amd"===a&&[_babelPluginTransformEs2015ModulesAmd2["default"],o],"umd"===a&&[_babelPluginTransformEs2015ModulesUmd2["default"],o],[_babelPluginTransformRegenerator2["default"],{async:!1,asyncGenerators:!1}]].filter(Boolean)}}exports.__esModule=!0;var _babelPluginTransformEs2015TemplateLiterals=__webpack_require__("./node_modules/babel-plugin-transform-es2015-template-literals/lib/index.js"),_babelPluginTransformEs2015TemplateLiterals2=_interopRequireDefault(_babelPluginTransformEs2015TemplateLiterals),_babelPluginTransformEs2015Literals=__webpack_require__("./node_modules/babel-plugin-transform-es2015-literals/lib/index.js"),_babelPluginTransformEs2015Literals2=_interopRequireDefault(_babelPluginTransformEs2015Literals),_babelPluginTransformEs2015FunctionName=__webpack_require__("./node_modules/babel-plugin-transform-es2015-function-name/lib/index.js"),_babelPluginTransformEs2015FunctionName2=_interopRequireDefault(_babelPluginTransformEs2015FunctionName),_babelPluginTransformEs2015ArrowFunctions=__webpack_require__("./node_modules/babel-plugin-transform-es2015-arrow-functions/lib/index.js"),_babelPluginTransformEs2015ArrowFunctions2=_interopRequireDefault(_babelPluginTransformEs2015ArrowFunctions),_babelPluginTransformEs2015BlockScopedFunctions=__webpack_require__("./node_modules/babel-plugin-transform-es2015-block-scoped-functions/lib/index.js"),_babelPluginTransformEs2015BlockScopedFunctions2=_interopRequireDefault(_babelPluginTransformEs2015BlockScopedFunctions),_babelPluginTransformEs2015Classes=__webpack_require__("./node_modules/babel-plugin-transform-es2015-classes/lib/index.js"),_babelPluginTransformEs2015Classes2=_interopRequireDefault(_babelPluginTransformEs2015Classes),_babelPluginTransformEs2015ObjectSuper=__webpack_require__("./node_modules/babel-plugin-transform-es2015-object-super/lib/index.js"),_babelPluginTransformEs2015ObjectSuper2=_interopRequireDefault(_babelPluginTransformEs2015ObjectSuper),_babelPluginTransformEs2015ShorthandProperties=__webpack_require__("./node_modules/babel-plugin-transform-es2015-shorthand-properties/lib/index.js"),_babelPluginTransformEs2015ShorthandProperties2=_interopRequireDefault(_babelPluginTransformEs2015ShorthandProperties),_babelPluginTransformEs2015DuplicateKeys=__webpack_require__("./node_modules/babel-plugin-transform-es2015-duplicate-keys/lib/index.js"),_babelPluginTransformEs2015DuplicateKeys2=_interopRequireDefault(_babelPluginTransformEs2015DuplicateKeys),_babelPluginTransformEs2015ComputedProperties=__webpack_require__("./node_modules/babel-plugin-transform-es2015-computed-properties/lib/index.js"),_babelPluginTransformEs2015ComputedProperties2=_interopRequireDefault(_babelPluginTransformEs2015ComputedProperties),_babelPluginTransformEs2015ForOf=__webpack_require__("./node_modules/babel-plugin-transform-es2015-for-of/lib/index.js"),_babelPluginTransformEs2015ForOf2=_interopRequireDefault(_babelPluginTransformEs2015ForOf),_babelPluginTransformEs2015StickyRegex=__webpack_require__("./node_modules/babel-plugin-transform-es2015-sticky-regex/lib/index.js"),_babelPluginTransformEs2015StickyRegex2=_interopRequireDefault(_babelPluginTransformEs2015StickyRegex),_babelPluginTransformEs2015UnicodeRegex=__webpack_require__("./node_modules/babel-plugin-transform-es2015-unicode-regex/lib/index.js"),_babelPluginTransformEs2015UnicodeRegex2=_interopRequireDefault(_babelPluginTransformEs2015UnicodeRegex),_babelPluginCheckEs2015Constants=__webpack_require__("./node_modules/babel-plugin-check-es2015-constants/lib/index.js"),_babelPluginCheckEs2015Constants2=_interopRequireDefault(_babelPluginCheckEs2015Constants),_babelPluginTransformEs2015Spread=__webpack_require__("./node_modules/babel-plugin-transform-es2015-spread/lib/index.js"),_babelPluginTransformEs2015Spread2=_interopRequireDefault(_babelPluginTransformEs2015Spread),_babelPluginTransformEs2015Parameters=__webpack_require__("./node_modules/babel-plugin-transform-es2015-parameters/lib/index.js"),_babelPluginTransformEs2015Parameters2=_interopRequireDefault(_babelPluginTransformEs2015Parameters),_babelPluginTransformEs2015Destructuring=__webpack_require__("./node_modules/babel-plugin-transform-es2015-destructuring/lib/index.js"),_babelPluginTransformEs2015Destructuring2=_interopRequireDefault(_babelPluginTransformEs2015Destructuring),_babelPluginTransformEs2015BlockScoping=__webpack_require__("./node_modules/babel-plugin-transform-es2015-block-scoping/lib/index.js"),_babelPluginTransformEs2015BlockScoping2=_interopRequireDefault(_babelPluginTransformEs2015BlockScoping),_babelPluginTransformEs2015TypeofSymbol=__webpack_require__("./node_modules/babel-plugin-transform-es2015-typeof-symbol/lib/index.js"),_babelPluginTransformEs2015TypeofSymbol2=_interopRequireDefault(_babelPluginTransformEs2015TypeofSymbol),_babelPluginTransformEs2015ModulesCommonjs=__webpack_require__("./node_modules/babel-plugin-transform-es2015-modules-commonjs/lib/index.js"),_babelPluginTransformEs2015ModulesCommonjs2=_interopRequireDefault(_babelPluginTransformEs2015ModulesCommonjs),_babelPluginTransformEs2015ModulesSystemjs=__webpack_require__("./node_modules/babel-plugin-transform-es2015-modules-systemjs/lib/index.js"),_babelPluginTransformEs2015ModulesSystemjs2=_interopRequireDefault(_babelPluginTransformEs2015ModulesSystemjs),_babelPluginTransformEs2015ModulesAmd=__webpack_require__("./node_modules/babel-plugin-transform-es2015-modules-amd/lib/index.js"),_babelPluginTransformEs2015ModulesAmd2=_interopRequireDefault(_babelPluginTransformEs2015ModulesAmd),_babelPluginTransformEs2015ModulesUmd=__webpack_require__("./node_modules/babel-plugin-transform-es2015-modules-umd/lib/index.js"),_babelPluginTransformEs2015ModulesUmd2=_interopRequireDefault(_babelPluginTransformEs2015ModulesUmd),_babelPluginTransformRegenerator=__webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/index.js"),_babelPluginTransformRegenerator2=_interopRequireDefault(_babelPluginTransformRegenerator),oldConfig=preset({});exports["default"]=oldConfig,Object.defineProperty(oldConfig,"buildPreset",{configurable:!0,writable:!0,enumerable:!1,value:preset}),module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-template-literals/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){function r(e){return a.isLiteral(e)&&"string"==typeof e.value}function t(e,r){return a.binaryExpression("+",e,r)}var a=e.types;return{visitor:{TaggedTemplateExpression:function(e,r){for(var t=e.node,i=t.quasi,s=[],n=[],o=[],l=i.quasis,u=Array.isArray(l),f=0,l=u?l:(0,_getIterator3["default"])(l);;){var p;if(u){if(f>=l.length)break;p=l[f++]}else{if(f=l.next(),f.done)break;p=f.value}var g=p;n.push(a.stringLiteral(g.value.cooked)),o.push(a.stringLiteral(g.value.raw))}n=a.arrayExpression(n),o=a.arrayExpression(o);var d="taggedTemplateLiteral";r.opts.loose&&(d+="Loose");var v=r.file.addTemplateObject(d,n,o);s.push(v),s=s.concat(i.expressions),e.replaceWith(a.callExpression(t.tag,s))},TemplateLiteral:function(e,i){for(var s=[],n=e.get("expressions"),o=e.node.quasis,l=Array.isArray(o),u=0,o=l?o:(0,_getIterator3["default"])(o);;){var f;if(l){if(u>=o.length)break;f=o[u++]}else{if(u=o.next(),u.done)break;f=u.value}var p=f;s.push(a.stringLiteral(p.value.cooked));var g=n.shift();g&&(!i.opts.spec||g.isBaseType("string")||g.isBaseType("number")?s.push(g.node):s.push(a.callExpression(a.identifier("String"),[g.node])))}if(s=s.filter(function(e){return!a.isLiteral(e,{value:""})}),r(s[0])||r(s[1])||s.unshift(a.stringLiteral("")),s.length>1){for(var d=t(s.shift(),s.shift()),v=s,c=Array.isArray(v),h=0,v=c?v:(0,_getIterator3["default"])(v);;){var x;if(c){if(h>=v.length)break;x=v[h++]}else{if(h=v.next(),h.done)break;x=h.value}var y=x;d=t(d,y)}e.replaceWith(d)}else e.replaceWith(s[0])}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-literals/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{visitor:{NumericLiteral:function(t){var e=t.node;e.extra&&/^0[ob]/i.test(e.extra.raw)&&(e.extra=void 0)},StringLiteral:function(t){var e=t.node;e.extra&&/\\[u]/gi.test(e.extra.raw)&&(e.extra=void 0)}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-function-name/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports["default"]=function(){return{visitor:{"ArrowFunctionExpression|FunctionExpression":{exit:function(e){if("value"!==e.key&&!e.parentPath.isObjectProperty()){var t=(0,_babelHelperFunctionName2["default"])(e);t&&e.replaceWith(t)}}},ObjectProperty:function(e){var t=e.get("value");if(t.isFunction()){var r=(0,_babelHelperFunctionName2["default"])(t);r&&t.replaceWith(r)}}}}};var _babelHelperFunctionName=__webpack_require__("./node_modules/babel-helper-function-name/lib/index.js"),_babelHelperFunctionName2=_interopRequireDefault(_babelHelperFunctionName);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-function-name/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function wrap(e,n,r,i){if(e.selfReference){if(!i.hasBinding(r.name)||i.hasGlobal(r.name)){if(!t.isFunction(n))return;var a=buildPropertyMethodAssignmentWrapper;n.generator&&(a=buildGeneratorPropertyMethodAssignmentWrapper);var l=a({FUNCTION:n,FUNCTION_ID:r,FUNCTION_KEY:i.generateUidIdentifier(r.name)}).expression;l.callee._skipModulesRemap=!0;for(var o=l.callee.body.body[0].params,u=0,s=(0,_babelHelperGetFunctionArity2["default"])(n);u<s;u++)o.push(i.generateUidIdentifier("x"));return l}i.rename(r.name)}n.id=r,i.getProgramParent().references[r.name]=!0}function visit(e,n,t){var r={selfAssignment:!1,selfReference:!1,outerDeclar:t.getBindingIdentifier(n),references:[],name:n},i=t.getOwnBinding(n);return i?"param"===i.kind&&(r.selfReference=!0):(r.outerDeclar||t.hasGlobal(n))&&t.traverse(e,visitor,r),r}exports.__esModule=!0,exports["default"]=function(e){var n=e.node,r=e.parent,i=e.scope,a=e.id;if(!n.id){if(!t.isObjectProperty(r)&&!t.isObjectMethod(r,{kind:"method"})||r.computed&&!t.isLiteral(r.key)){if(t.isVariableDeclarator(r)){if(a=r.id,t.isIdentifier(a)){var l=i.parent.getBinding(a.name);if(l&&l.constant&&i.getBinding(a.name)===l)return n.id=a,void(n.id[t.NOT_LOCAL_BINDING]=!0)}}else if(t.isAssignmentExpression(r))a=r.left;else if(!a)return}else a=r.key;var o=void 0;if(a&&t.isLiteral(a))o=a.value;else{if(!a||!t.isIdentifier(a))return;o=a.name}o=t.toBindingIdentifierName(o),a=t.identifier(o),a[t.NOT_LOCAL_BINDING]=!0;var u=visit(n,o,i);return wrap(u,n,a,i)||n}};var _babelHelperGetFunctionArity=__webpack_require__("./node_modules/babel-helper-get-function-arity/lib/index.js"),_babelHelperGetFunctionArity2=_interopRequireDefault(_babelHelperGetFunctionArity),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),buildPropertyMethodAssignmentWrapper=(0,_babelTemplate2["default"])("\n  (function (FUNCTION_KEY) {\n    function FUNCTION_ID() {\n      return FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    }\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"),buildGeneratorPropertyMethodAssignmentWrapper=(0,_babelTemplate2["default"])("\n  (function (FUNCTION_KEY) {\n    function* FUNCTION_ID() {\n      return yield* FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    };\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"),visitor={"ReferencedIdentifier|BindingIdentifier":function(e,n){if(e.node.name===n.name){var t=e.scope.getBindingIdentifier(n.name);t===n.outerDeclar&&(n.selfReference=!0,e.stop())}}};module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-get-function-arity/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}exports.__esModule=!0,exports["default"]=function(e){for(var r=e.params,n=0;n<r.length;n++){var a=r[n];if(t.isAssignmentPattern(a)||t.isRestElement(a))return n}return r.length};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-arrow-functions/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(e){var s=e.types;return{visitor:{ArrowFunctionExpression:function(e,o){if(o.opts.spec){var r=e.node;if(r.shadow)return;r.shadow={"this":!1},r.type="FunctionExpression";var t=s.thisExpression();t._forceShadow=e,e.ensureBlock(),e.get("body").unshiftContainer("body",s.expressionStatement(s.callExpression(o.addHelper("newArrowCheck"),[s.thisExpression(),t]))),e.replaceWith(s.callExpression(s.memberExpression(r,s.identifier("bind")),[s.thisExpression()]))}else e.arrowFunctionToShadowed()}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-block-scoped-functions/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){function t(e,t){for(var a=t.get(e),o=a,i=Array.isArray(o),n=0,o=i?o:(0,_getIterator3["default"])(o);;){var u;if(i){if(n>=o.length)break;u=o[n++]}else{if(n=o.next(),n.done)break;u=n.value}var l=u,s=l.node;if(l.isFunctionDeclaration()){var c=r.variableDeclaration("let",[r.variableDeclarator(s.id,r.toExpression(s))]);c._blockHoist=2,s.id=null,l.replaceWith(c)}}}var r=e.types;return{visitor:{BlockStatement:function(e){var a=e.node,o=e.parent;r.isFunction(o,{body:a})||r.isExportDeclaration(o)||t("body",e)},SwitchCase:function(e){t("consequent",e)}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-classes/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol);exports["default"]=function(e){var a=e.types,r=(0,_symbol2["default"])();return{visitor:{ExportDefaultDeclaration:function(e){if(e.get("declaration").isClassDeclaration()){var r=e.node,l=r.declaration.id||e.scope.generateUidIdentifier("class");r.declaration.id=l,e.replaceWith(r.declaration),e.insertAfter(a.exportDefaultDeclaration(l))}},ClassDeclaration:function(e){var r=e.node,l=r.id||e.scope.generateUidIdentifier("class");e.replaceWith(a.variableDeclaration("let",[a.variableDeclarator(l,a.toExpression(r))]))},ClassExpression:function(e,a){var l=e.node;if(!l[r]){var t=(0,_babelHelperFunctionName2["default"])(e);if(t&&t!==l)return e.replaceWith(t);l[r]=!0;var i=_vanilla2["default"];a.opts.loose&&(i=_loose2["default"]),e.replaceWith(new i(e,a.file).run())}}}}};var _loose=__webpack_require__("./node_modules/babel-plugin-transform-es2015-classes/lib/loose.js"),_loose2=_interopRequireDefault(_loose),_vanilla=__webpack_require__("./node_modules/babel-plugin-transform-es2015-classes/lib/vanilla.js"),_vanilla2=_interopRequireDefault(_vanilla),_babelHelperFunctionName=__webpack_require__("./node_modules/babel-helper-function-name/lib/index.js"),_babelHelperFunctionName2=_interopRequireDefault(_babelHelperFunctionName);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-classes/lib/loose.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_babelHelperFunctionName=__webpack_require__("./node_modules/babel-helper-function-name/lib/index.js"),_babelHelperFunctionName2=_interopRequireDefault(_babelHelperFunctionName),_vanilla=__webpack_require__("./node_modules/babel-plugin-transform-es2015-classes/lib/vanilla.js"),_vanilla2=_interopRequireDefault(_vanilla),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),LooseClassTransformer=function(e){function r(){(0,_classCallCheck3["default"])(this,r);var t=(0,_possibleConstructorReturn3["default"])(this,e.apply(this,arguments));return t.isLoose=!0,t}return(0,_inherits3["default"])(r,e),r.prototype._processMethod=function(e,r){if(!e.decorators){var i=this.classRef;e["static"]||(i=t.memberExpression(i,t.identifier("prototype")));var s=t.memberExpression(i,e.key,e.computed||t.isLiteral(e.key)),l=t.functionExpression(null,e.params,e.body,e.generator,e.async),n=t.toComputedKey(e,e.key);t.isStringLiteral(n)&&(l=(0,_babelHelperFunctionName2["default"])({node:l,id:n,scope:r}));var a=t.expressionStatement(t.assignmentExpression("=",s,l));return t.inheritsComments(a,e),this.body.push(a),!0}},r}(_vanilla2["default"]);exports["default"]=LooseClassTransformer,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-classes/lib/vanilla.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_babelTraverse=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_babelHelperReplaceSupers=__webpack_require__("./node_modules/babel-helper-replace-supers/lib/index.js"),_babelHelperReplaceSupers2=_interopRequireDefault(_babelHelperReplaceSupers),_babelHelperOptimiseCallExpression=__webpack_require__("./node_modules/babel-helper-optimise-call-expression/lib/index.js"),_babelHelperOptimiseCallExpression2=_interopRequireDefault(_babelHelperOptimiseCallExpression),_babelHelperDefineMap=__webpack_require__("./node_modules/babel-helper-define-map/lib/index.js"),defineMap=_interopRequireWildcard(_babelHelperDefineMap),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),buildDerivedConstructor=(0,_babelTemplate2["default"])("\n  (function () {\n    super(...arguments);\n  })\n"),noMethodVisitor={"FunctionExpression|FunctionDeclaration":function(e){e.is("shadow")||e.skip()},Method:function(e){e.skip()}},verifyConstructorVisitor=_babelTraverse.visitors.merge([noMethodVisitor,{Super:function(e){if(this.isDerived&&!this.hasBareSuper&&!e.parentPath.isCallExpression({callee:e.node}))throw e.buildCodeFrameError("'super.*' is not allowed before super()")},CallExpression:{exit:function(e){if(e.get("callee").isSuper()&&(this.hasBareSuper=!0,!this.isDerived))throw e.buildCodeFrameError("super() is only allowed in a derived constructor")}},ThisExpression:function(e){if(this.isDerived&&!this.hasBareSuper&&!e.inShadow("this"))throw e.buildCodeFrameError("'this' is not allowed before super()")}}]),findThisesVisitor=_babelTraverse.visitors.merge([noMethodVisitor,{ThisExpression:function(e){this.superThises.push(e)}}]),ClassTransformer=function(){function e(s,r){(0,_classCallCheck3["default"])(this,e),this.parent=s.parent,this.scope=s.scope,this.node=s.node,this.path=s,this.file=r,this.clearDescriptors(),this.instancePropBody=[],this.instancePropRefs={},this.staticPropBody=[],this.body=[],this.bareSuperAfter=[],this.bareSupers=[],this.pushedConstructor=!1,this.pushedInherits=!1,this.isLoose=!1,this.superThises=[],this.classId=this.node.id,this.classRef=this.node.id?t.identifier(this.node.id.name):this.scope.generateUidIdentifier("class"),this.superName=this.node.superClass||t.identifier("Function"),this.isDerived=!!this.node.superClass}return e.prototype.run=function(){var e=this,s=this.superName,r=this.file,i=this.body,o=this.constructorBody=t.blockStatement([]);this.constructor=this.buildConstructor();var a=[],n=[];if(this.isDerived&&(n.push(s),s=this.scope.generateUidIdentifierBasedOnNode(s),a.push(s),this.superName=s),this.buildBody(),o.body.unshift(t.expressionStatement(t.callExpression(r.addHelper("classCallCheck"),[t.thisExpression(),this.classRef]))),i=i.concat(this.staticPropBody.map(function(t){return t(e.classRef)})),this.classId&&1===i.length)return t.toExpression(i[0]);i.push(t.returnStatement(this.classRef));var h=t.functionExpression(null,a,t.blockStatement(i));return h.shadow=!0,t.callExpression(h,n)},e.prototype.buildConstructor=function(){var e=t.functionDeclaration(this.classRef,[],this.constructorBody);return t.inherits(e,this.node),e},e.prototype.pushToMap=function(e,s){var r=arguments.length<=2||void 0===arguments[2]?"value":arguments[2],i=arguments[3],o=void 0;e["static"]?(this.hasStaticDescriptors=!0,o=this.staticMutatorMap):(this.hasInstanceDescriptors=!0,o=this.instanceMutatorMap);var a=defineMap.push(o,e,r,this.file,i);return s&&(a.enumerable=t.booleanLiteral(!0)),a},e.prototype.constructorMeMaybe=function(){for(var e=!1,s=this.path.get("body.body"),r=s,i=Array.isArray(r),o=0,r=i?r:(0,_getIterator3["default"])(r);;){var a;if(i){if(o>=r.length)break;a=r[o++]}else{if(o=r.next(),o.done)break;a=o.value}var n=a;if(e=n.equals("kind","constructor"))break}if(!e){var h=void 0,p=void 0;if(this.isDerived){var l=buildDerivedConstructor().expression;h=l.params,p=l.body}else h=[],p=t.blockStatement([]);this.path.get("body").unshiftContainer("body",t.classMethod("constructor",t.identifier("constructor"),h,p))}},e.prototype.buildBody=function(){if(this.constructorMeMaybe(),this.pushBody(),this.verifyConstructor(),this.userConstructor){var e=this.constructorBody;e.body=e.body.concat(this.userConstructor.body.body),t.inherits(this.constructor,this.userConstructor),t.inherits(e,this.userConstructor.body)}this.pushDescriptors()},e.prototype.pushBody=function(){for(var e=this.path.get("body.body"),s=e,r=Array.isArray(s),i=0,s=r?s:(0,_getIterator3["default"])(s);;){var o;if(r){if(i>=s.length)break;o=s[i++]}else{if(i=s.next(),i.done)break;o=i.value}var a=o,n=a.node;if(a.isClassProperty())throw a.buildCodeFrameError("Missing class properties transform.");if(n.decorators)throw a.buildCodeFrameError("Method has decorators, put the decorator plugin before the classes one.");if(t.isClassMethod(n)){var h="constructor"===n.kind;if(h&&(a.traverse(verifyConstructorVisitor,this),!this.hasBareSuper&&this.isDerived))throw a.buildCodeFrameError("missing super() call in constructor");var p=new _babelHelperReplaceSupers2["default"]({forceSuperMemoisation:h,methodPath:a,methodNode:n,objectRef:this.classRef,superRef:this.superName,isStatic:n["static"],isLoose:this.isLoose,scope:this.scope,file:this.file},(!0));p.replace(),h?this.pushConstructor(p,n,a):this.pushMethod(n,a)}}},e.prototype.clearDescriptors=function(){this.hasInstanceDescriptors=!1,this.hasStaticDescriptors=!1,this.instanceMutatorMap={},this.staticMutatorMap={}},e.prototype.pushDescriptors=function(){this.pushInherits();var e=this.body,s=void 0,r=void 0;if(this.hasInstanceDescriptors&&(s=defineMap.toClassObject(this.instanceMutatorMap)),this.hasStaticDescriptors&&(r=defineMap.toClassObject(this.staticMutatorMap)),s||r){s&&(s=defineMap.toComputedObjectFromClass(s)),r&&(r=defineMap.toComputedObjectFromClass(r));var i=t.nullLiteral(),o=[this.classRef,i,i,i,i];s&&(o[1]=s),r&&(o[2]=r),this.instanceInitializersId&&(o[3]=this.instanceInitializersId,e.unshift(this.buildObjectAssignment(this.instanceInitializersId))),this.staticInitializersId&&(o[4]=this.staticInitializersId,e.unshift(this.buildObjectAssignment(this.staticInitializersId)));for(var a=0,n=0;n<o.length;n++)o[n]!==i&&(a=n);o=o.slice(0,a+1),e.push(t.expressionStatement(t.callExpression(this.file.addHelper("createClass"),o)))}this.clearDescriptors()},e.prototype.buildObjectAssignment=function(e){return t.variableDeclaration("var",[t.variableDeclarator(e,t.objectExpression([]))])},e.prototype.wrapSuperCall=function(e,s,r,i){var o=e.node;this.isLoose?(o.arguments.unshift(t.thisExpression()),2===o.arguments.length&&t.isSpreadElement(o.arguments[1])&&t.isIdentifier(o.arguments[1].argument,{name:"arguments"})?(o.arguments[1]=o.arguments[1].argument,o.callee=t.memberExpression(s,t.identifier("apply"))):o.callee=t.memberExpression(s,t.identifier("call"))):o=(0,_babelHelperOptimiseCallExpression2["default"])(t.logicalExpression("||",t.memberExpression(this.classRef,t.identifier("__proto__")),t.callExpression(t.memberExpression(t.identifier("Object"),t.identifier("getPrototypeOf")),[this.classRef])),t.thisExpression(),o.arguments);var a=t.callExpression(this.file.addHelper("possibleConstructorReturn"),[t.thisExpression(),o]),n=this.bareSuperAfter.map(function(e){return e(r)});e.parentPath.isExpressionStatement()&&e.parentPath.container===i.node.body&&i.node.body.length-1===e.parentPath.key?((this.superThises.length||n.length)&&(e.scope.push({id:r}),a=t.assignmentExpression("=",r,a)),n.length&&(a=t.toSequenceExpression([a].concat(n,[r]))),e.parentPath.replaceWith(t.returnStatement(a))):e.replaceWithMultiple([t.variableDeclaration("var",[t.variableDeclarator(r,a)])].concat(n,[t.expressionStatement(r)]))},e.prototype.verifyConstructor=function(){var e=this;if(this.isDerived){var s=this.userConstructorPath,r=s.get("body");s.traverse(findThisesVisitor,this);for(var i=!!this.bareSupers.length,o=this.superName||t.identifier("Function"),a=s.scope.generateUidIdentifier("this"),n=this.bareSupers,h=Array.isArray(n),p=0,n=h?n:(0,_getIterator3["default"])(n);;){var l;if(h){if(p>=n.length)break;l=n[p++]}else{if(p=n.next(),p.done)break;l=p.value}var u=l;this.wrapSuperCall(u,o,a,r),i&&u.find(function(e){return e===s||(e.isLoop()||e.isConditional()?(i=!1,!0):void 0)})}for(var c=this.superThises,d=Array.isArray(c),f=0,c=d?c:(0,_getIterator3["default"])(c);;){var b;if(d){if(f>=c.length)break;b=c[f++]}else{if(f=c.next(),f.done)break;b=f.value}var m=b;m.replaceWith(a)}var v=function(s){return t.callExpression(e.file.addHelper("possibleConstructorReturn"),[a].concat(s||[]))},y=r.get("body");y.length&&!y.pop().isReturnStatement()&&r.pushContainer("body",t.returnStatement(i?a:v()));for(var C=this.superReturns,g=Array.isArray(C),_=0,C=g?C:(0,_getIterator3["default"])(C);;){var x;if(g){if(_>=C.length)break;x=C[_++]}else{if(_=C.next(),_.done)break;x=_.value}var M=x;if(M.node.argument){var D=M.scope.generateDeclaredUidIdentifier("ret");M.get("argument").replaceWithMultiple([t.assignmentExpression("=",D,M.node.argument),v(D)])}else M.get("argument").replaceWith(v())}}},e.prototype.pushMethod=function(e,t){var s=t?t.scope:this.scope;"method"===e.kind&&this._processMethod(e,s)||this.pushToMap(e,!1,null,s)},e.prototype._processMethod=function(){return!1},e.prototype.pushConstructor=function(e,s,r){this.bareSupers=e.bareSupers,this.superReturns=e.returns,r.scope.hasOwnBinding(this.classRef.name)&&r.scope.rename(this.classRef.name);var i=this.constructor;this.userConstructorPath=r,this.userConstructor=s,this.hasConstructor=!0,t.inheritsComments(i,s),i._ignoreUserWhitespace=!0,i.params=s.params,t.inherits(i.body,s.body),i.body.directives=s.body.directives,this._pushConstructor()},e.prototype._pushConstructor=function(){this.pushedConstructor||(this.pushedConstructor=!0,(this.hasInstanceDescriptors||this.hasStaticDescriptors)&&this.pushDescriptors(),this.body.push(this.constructor),this.pushInherits())},e.prototype.pushInherits=function(){this.isDerived&&!this.pushedInherits&&(this.pushedInherits=!0,this.body.unshift(t.expressionStatement(t.callExpression(this.file.addHelper("inherits"),[this.classRef,this.superName]))))},e}();exports["default"]=ClassTransformer,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-replace-supers/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function isIllegalBareSuper(e,r){return!!t.isSuper(e)&&(!t.isMemberExpression(r,{computed:!1})&&!t.isCallExpression(r,{callee:e}))}function isMemberExpressionSuper(e){return t.isMemberExpression(e)&&t.isSuper(e.object)}function getPrototypeOfExpression(e,r){var s=r?e:t.memberExpression(e,t.identifier("prototype"));return t.logicalExpression("||",t.memberExpression(s,t.identifier("__proto__")),t.callExpression(t.memberExpression(t.identifier("Object"),t.identifier("getPrototypeOf")),[s]))}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol),_babelHelperOptimiseCallExpression=__webpack_require__("./node_modules/babel-helper-optimise-call-expression/lib/index.js"),_babelHelperOptimiseCallExpression2=_interopRequireDefault(_babelHelperOptimiseCallExpression),_babelMessages=__webpack_require__("./node_modules/babel-messages/lib/index.js"),messages=_interopRequireWildcard(_babelMessages),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),HARDCORE_THIS_REF=(0,_symbol2["default"])(),visitor={Function:function(e){e.inShadow("this")||e.skip()},ReturnStatement:function(e,t){e.inShadow("this")||t.returns.push(e)},ThisExpression:function(e,t){e.node[HARDCORE_THIS_REF]||t.thises.push(e)},enter:function(e,t){var r=t.specHandle;t.isLoose&&(r=t.looseHandle);var s=e.isCallExpression()&&e.get("callee").isSuper(),i=r.call(t,e);i&&(t.hasSuper=!0),s&&t.bareSupers.push(e),i===!0&&e.requeue(),i!==!0&&i&&(Array.isArray(i)?e.replaceWithMultiple(i):e.replaceWith(i))}},ReplaceSupers=function(){function e(t){var r=!(arguments.length<=1||void 0===arguments[1])&&arguments[1];(0,_classCallCheck3["default"])(this,e),this.forceSuperMemoisation=t.forceSuperMemoisation,this.methodPath=t.methodPath,this.methodNode=t.methodNode,this.superRef=t.superRef,this.isStatic=t.isStatic,this.hasSuper=!1,this.inClass=r,this.isLoose=t.isLoose,this.scope=this.methodPath.scope,this.file=t.file,this.opts=t,this.bareSupers=[],this.returns=[],this.thises=[]}return e.prototype.getObjectRef=function(){return this.opts.objectRef||this.opts.getObjectRef()},e.prototype.setSuperProperty=function(e,r,s){return t.callExpression(this.file.addHelper("set"),[getPrototypeOfExpression(this.getObjectRef(),this.isStatic),s?e:t.stringLiteral(e.name),r,t.thisExpression()])},e.prototype.getSuperProperty=function(e,r){return t.callExpression(this.file.addHelper("get"),[getPrototypeOfExpression(this.getObjectRef(),this.isStatic),r?e:t.stringLiteral(e.name),t.thisExpression()])},e.prototype.replace=function(){this.methodPath.traverse(visitor,this)},e.prototype.getLooseSuperProperty=function(e,r){var s=this.methodNode,i=this.superRef||t.identifier("Function");return r.property===e?void 0:t.isCallExpression(r,{callee:e})?void 0:t.isMemberExpression(r)&&!s["static"]?t.memberExpression(i,t.identifier("prototype")):i},e.prototype.looseHandle=function(e){var r=e.node;if(e.isSuper())return this.getLooseSuperProperty(r,e.parent);if(e.isCallExpression()){var s=r.callee;if(!t.isMemberExpression(s))return;if(!t.isSuper(s.object))return;return t.appendToMemberExpression(s,t.identifier("call")),r.arguments.unshift(t.thisExpression()),!0}},e.prototype.specHandleAssignmentExpression=function(e,r,s){return"="===s.operator?this.setSuperProperty(s.left.property,s.right,s.left.computed):(e=e||r.scope.generateUidIdentifier("ref"),[t.variableDeclaration("var",[t.variableDeclarator(e,s.left)]),t.expressionStatement(t.assignmentExpression("=",s.left,t.binaryExpression(s.operator[0],e,s.right)))])},e.prototype.specHandle=function(e){var r=void 0,s=void 0,i=void 0,o=e.parent,n=e.node;if(isIllegalBareSuper(n,o))throw e.buildCodeFrameError(messages.get("classesIllegalBareSuper"));if(t.isCallExpression(n)){var p=n.callee;if(t.isSuper(p))return;isMemberExpressionSuper(p)&&(r=p.property,s=p.computed,i=n.arguments)}else if(t.isMemberExpression(n)&&t.isSuper(n.object))r=n.property,s=n.computed;else{if(t.isUpdateExpression(n)&&isMemberExpressionSuper(n.argument)){var a=t.binaryExpression(n.operator[0],n.argument,t.numericLiteral(1));if(n.prefix)return this.specHandleAssignmentExpression(null,e,a);var l=e.scope.generateUidIdentifier("ref");return this.specHandleAssignmentExpression(l,e,a).concat(t.expressionStatement(l))}if(t.isAssignmentExpression(n)&&isMemberExpressionSuper(n.left))return this.specHandleAssignmentExpression(null,e,n)}if(r){var u=this.getSuperProperty(r,s);return i?this.optimiseCall(u,i):u}},e.prototype.optimiseCall=function(e,r){var s=t.thisExpression();return s[HARDCORE_THIS_REF]=!0,(0,_babelHelperOptimiseCallExpression2["default"])(e,s,r)},e}();exports["default"]=ReplaceSupers,module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-optimise-call-expression/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}exports.__esModule=!0,exports["default"]=function(e,r,i){return 1===i.length&&t.isSpreadElement(i[0])&&t.isIdentifier(i[0].argument,{name:"arguments"})?t.callExpression(t.memberExpression(e,t.identifier("apply")),[r,i[0].argument]):t.callExpression(t.memberExpression(e,t.identifier("call")),[r].concat(i))};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-define-map/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function toKind(e){return!t.isClassMethod(e)&&!t.isObjectMethod(e)||"get"!==e.kind&&"set"!==e.kind?"value":e.kind}function push(e,r,o,i,s){var a=t.toKeyAlias(r),n={};if((0,_has2["default"])(e,a)&&(n=e[a]),e[a]=n,n._inherits=n._inherits||[],n._inherits.push(r),n._key=r.key,r.computed&&(n._computed=!0),r.decorators){var u=n.decorators=n.decorators||t.arrayExpression([]);u.elements=u.elements.concat(r.decorators.map(function(e){return e.expression}).reverse())}if(n.value||n.initializer)throw i.buildCodeFrameError(r,"Key conflict with sibling node");var l=void 0,p=void 0;(t.isObjectProperty(r)||t.isObjectMethod(r)||t.isClassMethod(r))&&(l=t.toComputedKey(r,r.key)),t.isObjectProperty(r)||t.isClassProperty(r)?p=r.value:(t.isObjectMethod(r)||t.isClassMethod(r))&&(p=t.functionExpression(null,r.params,r.body,r.generator,r.async));var c=toKind(r);return o&&"value"===c||(o=c),s&&t.isStringLiteral(l)&&("value"===o||"initializer"===o)&&t.isFunctionExpression(p)&&(p=(0,_babelHelperFunctionName2["default"])({id:l,node:p,scope:s})),p&&(t.inheritsComments(p,r),n[o]=p),n}function hasComputed(e){for(var t in e)if(e[t]._computed)return!0;return!1}function toComputedObjectFromClass(e){for(var r=t.arrayExpression([]),o=0;o<e.properties.length;o++){var i=e.properties[o],s=i.value;s.properties.unshift(t.objectProperty(t.identifier("key"),t.toComputedKey(i))),r.elements.push(s)}return r}function toClassObject(e){var r=t.objectExpression([]);return(0,_each2["default"])(e,function(e){var o=t.objectExpression([]),i=t.objectProperty(e._key,o,e._computed);(0,_each2["default"])(e,function(e,r){if("_"!==r[0]){var i=e;(t.isClassMethod(e)||t.isClassProperty(e))&&(e=e.value);var s=t.objectProperty(t.identifier(r),e);t.inheritsComments(s,i),t.removeComments(i),o.properties.push(s)}}),r.properties.push(i)}),r}function toDefineObject(e){return(0,_each2["default"])(e,function(e){e.value&&(e.writable=t.booleanLiteral(!0)),e.configurable=t.booleanLiteral(!0),e.enumerable=t.booleanLiteral(!0)}),toClassObject(e)}exports.__esModule=!0,exports.push=push,exports.hasComputed=hasComputed,exports.toComputedObjectFromClass=toComputedObjectFromClass,exports.toClassObject=toClassObject,exports.toDefineObject=toDefineObject;var _babelHelperFunctionName=__webpack_require__("./node_modules/babel-helper-function-name/lib/index.js"),_babelHelperFunctionName2=_interopRequireDefault(_babelHelperFunctionName),_each=__webpack_require__("./node_modules/lodash/each.js"),_each2=_interopRequireDefault(_each),_has=__webpack_require__("./node_modules/lodash/has.js"),_has2=_interopRequireDefault(_has),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-object-super/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol);exports["default"]=function(e){function r(e,r,t,o,a){var i=new _babelHelperReplaceSupers2["default"]({getObjectRef:o,methodNode:r,methodPath:e,isStatic:!0,scope:t,file:a});i.replace()}var t=e.types,o=(0,_symbol2["default"])();return{visitor:{Super:function(e){var r=e.findParent(function(e){return e.isObjectExpression()});r&&(r.node[o]=!0)},ObjectExpression:{exit:function(e,a){if(e.node[o]){for(var i=void 0,u=function(){return i=i||e.scope.generateUidIdentifier("obj")},l=e.get("properties"),s=l,n=Array.isArray(s),p=0,s=n?s:(0,_getIterator3["default"])(s);;){var b;if(n){if(p>=s.length)break;b=s[p++]}else{if(p=s.next(),p.done)break;b=p.value}var c=b;c.isObjectProperty()&&(c=c.get("value")),r(c,c.node,e.scope,u,a)}i&&(e.scope.push({id:i}),e.replaceWith(t.assignmentExpression("=",i,e.node)))}}}}}};var _babelHelperReplaceSupers=__webpack_require__("./node_modules/babel-helper-replace-supers/lib/index.js"),_babelHelperReplaceSupers2=_interopRequireDefault(_babelHelperReplaceSupers);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-shorthand-properties/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}exports.__esModule=!0,exports["default"]=function(){return{visitor:{ObjectMethod:function(e){var r=e.node;"method"===r.kind&&e.replaceWith(t.objectProperty(r.key,t.functionExpression(null,r.params,r.body,r.generator,r.async),r.computed))},ObjectProperty:function(e){var r=e.node;r.shorthand&&(r.shorthand=!1)}}}};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-duplicate-keys/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getName(e){return t.isIdentifier(e)?e.name:e.value.toString()}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create);exports["default"]=function(){return{visitor:{ObjectExpression:function(e){for(var r=e.node,a=r.properties.filter(function(e){return!t.isSpreadProperty(e)&&!e.computed}),u=(0,_create2["default"])(null),i=(0,_create2["default"])(null),n=(0,_create2["default"])(null),o=a,l=Array.isArray(o),s=0,o=l?o:(0,_getIterator3["default"])(o);;){var c;if(l){if(s>=o.length)break;c=o[s++]}else{if(s=o.next(),s.done)break;c=s.value}var f=c,d=getName(f.key),_=!1;switch(f.kind){case"get":(u[d]||i[d])&&(_=!0),i[d]=!0;break;case"set":(u[d]||n[d])&&(_=!0),n[d]=!0;break;default:(u[d]||i[d]||n[d])&&(_=!0),u[d]=!0}_&&(f.computed=!0,f.key=t.stringLiteral(d))}}}}};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-computed-properties/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){function r(e){return n.isObjectProperty(e)?e.value:n.isObjectMethod(e)?n.functionExpression(null,e.params,e.body,e.generator,e.async):void 0}function t(e,t,i){"get"===t.kind&&"set"===t.kind?a(e,t,i):i.push(n.expressionStatement(n.assignmentExpression("=",n.memberExpression(e,t.key,t.computed||n.isLiteral(t.key)),r(t))))}function a(e,t){var a=(e.objId,e.body),i=e.getMutatorId,o=e.scope,s=!t.computed&&n.isIdentifier(t.key)?n.stringLiteral(t.key.name):t.key,d=o.maybeGenerateMemoised(s);d&&(a.push(n.expressionStatement(n.assignmentExpression("=",d,s))),s=d),a.push.apply(a,p({MUTATOR_MAP_REF:i(),KEY:s,VALUE:r(t),KIND:n.identifier(t.kind)}))}function i(e){for(var r=e.computedProps,i=Array.isArray(r),o=0,r=i?r:(0,_getIterator3["default"])(r);;){var n;if(i){if(o>=r.length)break;n=r[o++]}else{if(o=r.next(),o.done)break;n=o.value}var s=n;"get"===s.kind||"set"===s.kind?a(e,s):t(e.objId,s,e.body)}}function o(e){for(var i=e.objId,o=e.body,s=e.computedProps,p=e.state,d=s,u=Array.isArray(d),l=0,d=u?d:(0,_getIterator3["default"])(d);;){var f;if(u){if(l>=d.length)break;f=d[l++]}else{if(l=d.next(),l.done)break;f=l.value}var c=f,v=n.toComputedKey(c);if("get"===c.kind||"set"===c.kind)a(e,c);else if(n.isStringLiteral(v,{value:"__proto__"}))t(i,c,o);else{if(1===s.length)return n.callExpression(p.addHelper("defineProperty"),[e.initPropExpression,v,r(c)]);o.push(n.expressionStatement(n.callExpression(p.addHelper("defineProperty"),[i,v,r(c)])))}}}var n=e.types,s=e.template,p=s("\n    MUTATOR_MAP_REF[KEY] = MUTATOR_MAP_REF[KEY] || {};\n    MUTATOR_MAP_REF[KEY].KIND = VALUE;\n  ");return{visitor:{ObjectExpression:{exit:function(e,r){for(var t=e.node,a=e.parent,s=e.scope,p=!1,d=t.properties,u=Array.isArray(d),l=0,d=u?d:(0,_getIterator3["default"])(d);;){var f;if(u){if(l>=d.length)break;f=d[l++]}else{if(l=d.next(),l.done)break;f=l.value}var c=f;if(p=c.computed===!0)break}if(p){for(var v=[],b=[],m=!1,x=t.properties,y=Array.isArray(x),g=0,x=y?x:(0,_getIterator3["default"])(x);;){var _;if(y){if(g>=x.length)break;_=x[g++]}else{if(g=x.next(),g.done)break;_=g.value}var E=_;E.computed&&(m=!0),m?b.push(E):v.push(E)}var k=s.generateUidIdentifierBasedOnNode(a),h=n.objectExpression(v),A=[];A.push(n.variableDeclaration("var",[n.variableDeclarator(k,h)]));var I=o;r.opts.loose&&(I=i);var M=void 0,P=function(){return M||(M=s.generateUidIdentifier("mutatorMap"),A.push(n.variableDeclaration("var",[n.variableDeclarator(M,n.objectExpression([]))]))),M},j=I({scope:s,objId:k,body:A,computedProps:b,initPropExpression:h,getMutatorId:P,state:r});M&&A.push(n.expressionStatement(n.callExpression(r.addHelper("defineEnumerableProperties"),[k,M]))),j?e.replaceWith(j):(A.push(n.expressionStatement(k)),e.replaceWithMultiple(A))}}}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-for-of/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(e){function r(e){var r=e.node,n=e.scope,t=[],i=r.right;if(!o.isIdentifier(i)||!n.hasBinding(i.name)){var a=n.generateUidIdentifier("arr");t.push(o.variableDeclaration("var",[o.variableDeclarator(a,i)])),i=a}var E=n.generateUidIdentifier("i"),l=d({BODY:r.body,KEY:E,ARR:i});o.inherits(l,r),o.ensureBlock(l);var s=o.memberExpression(i,E,!0),R=r.left;return o.isVariableDeclaration(R)?(R.declarations[0].init=s,l.body.body.unshift(R)):l.body.body.unshift(o.expressionStatement(o.assignmentExpression("=",R,s))),e.parentPath.isLabeledStatement()&&(l=o.labeledStatement(e.parentPath.node.label,l)),t.push(l),t}function n(e,r){var n=e.node,t=e.scope,a=n.left,d=void 0,l=void 0;if(o.isIdentifier(a)||o.isPattern(a)||o.isMemberExpression(a))l=a;else{if(!o.isVariableDeclaration(a))throw r.buildCodeFrameError(a,i.get("unknownForHead",a.type));l=t.generateUidIdentifier("ref"),d=o.variableDeclaration(a.kind,[o.variableDeclarator(a.declarations[0].id,l)])}var s=t.generateUidIdentifier("iterator"),R=t.generateUidIdentifier("isArray"),O=E({LOOP_OBJECT:s,IS_ARRAY:R,OBJECT:n.right,INDEX:t.generateUidIdentifier("i"),ID:l});return d||O.body.body.shift(),{declar:d,node:O,loop:O}}function t(e,r){var n=e.node,t=e.scope,a=e.parent,d=n.left,E=void 0,s=t.generateUidIdentifier("step"),R=o.memberExpression(s,o.identifier("value"));if(o.isIdentifier(d)||o.isPattern(d)||o.isMemberExpression(d))E=o.expressionStatement(o.assignmentExpression("=",d,R));else{if(!o.isVariableDeclaration(d))throw r.buildCodeFrameError(d,i.get("unknownForHead",d.type));E=o.variableDeclaration(d.kind,[o.variableDeclarator(d.declarations[0].id,R)])}var O=t.generateUidIdentifier("iterator"),T=l({ITERATOR_HAD_ERROR_KEY:t.generateUidIdentifier("didIteratorError"),ITERATOR_COMPLETION:t.generateUidIdentifier("iteratorNormalCompletion"),ITERATOR_ERROR_KEY:t.generateUidIdentifier("iteratorError"),ITERATOR_KEY:O,STEP_KEY:s,OBJECT:n.right,BODY:null}),I=o.isLabeledStatement(a),f=T[3].block.body,_=f[0];return I&&(f[0]=o.labeledStatement(a.label,_)),{replaceParent:I,declar:E,loop:_,node:T}}var i=e.messages,a=e.template,o=e.types,d=a("\n    for (var KEY = 0; KEY < ARR.length; KEY++) BODY;\n  "),E=a("\n    for (var LOOP_OBJECT = OBJECT,\n             IS_ARRAY = Array.isArray(LOOP_OBJECT),\n             INDEX = 0,\n             LOOP_OBJECT = IS_ARRAY ? LOOP_OBJECT : LOOP_OBJECT[Symbol.iterator]();;) {\n      var ID;\n      if (IS_ARRAY) {\n        if (INDEX >= LOOP_OBJECT.length) break;\n        ID = LOOP_OBJECT[INDEX++];\n      } else {\n        INDEX = LOOP_OBJECT.next();\n        if (INDEX.done) break;\n        ID = INDEX.value;\n      }\n    }\n  "),l=a("\n    var ITERATOR_COMPLETION = true;\n    var ITERATOR_HAD_ERROR_KEY = false;\n    var ITERATOR_ERROR_KEY = undefined;\n    try {\n      for (var ITERATOR_KEY = OBJECT[Symbol.iterator](), STEP_KEY; !(ITERATOR_COMPLETION = (STEP_KEY = ITERATOR_KEY.next()).done); ITERATOR_COMPLETION = true) {\n      }\n    } catch (err) {\n      ITERATOR_HAD_ERROR_KEY = true;\n      ITERATOR_ERROR_KEY = err;\n    } finally {\n      try {\n        if (!ITERATOR_COMPLETION && ITERATOR_KEY.return) {\n          ITERATOR_KEY.return();\n        }\n      } finally {\n        if (ITERATOR_HAD_ERROR_KEY) {\n          throw ITERATOR_ERROR_KEY;\n        }\n      }\n    }\n  ");return{visitor:{ForOfStatement:function(e,i){if(e.get("right").isArrayExpression())return e.replaceWithMultiple(r.call(this,e,i));var a=t;i.opts.loose&&(a=n);var d=e.node,E=a(e,i),l=E.declar,s=E.loop,R=s.body;e.ensureBlock(),l&&R.body.push(l),R.body=R.body.concat(d.body.body),o.inherits(s,d),o.inherits(s.body,d.body),E.replaceParent?(e.parentPath.replaceWithMultiple(E.node),e.remove()):e.replaceWithMultiple(E.node)}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-sticky-regex/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}exports.__esModule=!0,exports["default"]=function(){return{visitor:{RegExpLiteral:function(e){var r=e.node;regex.is(r,"y")&&e.replaceWith(t.newExpression(t.identifier("RegExp"),[t.stringLiteral(r.pattern),t.stringLiteral(r.flags)]))}}}};var _babelHelperRegex=__webpack_require__("./node_modules/babel-helper-regex/lib/index.js"),regex=_interopRequireWildcard(_babelHelperRegex),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-regex/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var l={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(l[r]=e[r]);return l["default"]=e,l}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function is(e,l){return t.isRegExpLiteral(e)&&e.flags.indexOf(l)>=0}function pullFlag(e,l){var r=e.flags.split("");e.flags.indexOf(l)<0||((0,_pull2["default"])(r,l),e.flags=r.join(""))}exports.__esModule=!0,exports.is=is,exports.pullFlag=pullFlag;var _pull=__webpack_require__("./node_modules/lodash/pull.js"),_pull2=_interopRequireDefault(_pull),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);

/***/ },

/***/ "./node_modules/lodash/pull.js":
/***/ function(module, exports, __webpack_require__) {

	var baseRest=__webpack_require__("./node_modules/lodash/_baseRest.js"),pullAll=__webpack_require__("./node_modules/lodash/pullAll.js"),pull=baseRest(pullAll);module.exports=pull;

/***/ },

/***/ "./node_modules/lodash/pullAll.js":
/***/ function(module, exports, __webpack_require__) {

	function pullAll(l,e){return l&&l.length&&e&&e.length?basePullAll(l,e):l}var basePullAll=__webpack_require__("./node_modules/lodash/_basePullAll.js");module.exports=pullAll;

/***/ },

/***/ "./node_modules/lodash/_basePullAll.js":
/***/ function(module, exports, __webpack_require__) {

	function basePullAll(r,a,e,l){var s=l?baseIndexOfWith:baseIndexOf,y=-1,o=a.length,i=r;for(r===a&&(a=copyArray(a)),e&&(i=arrayMap(r,baseUnary(e)));++y<o;)for(var n=0,p=a[y],b=e?e(p):p;(n=s(i,b,n,l))>-1;)i!==r&&splice.call(i,n,1),splice.call(r,n,1);return r}var arrayMap=__webpack_require__("./node_modules/lodash/_arrayMap.js"),baseIndexOf=__webpack_require__("./node_modules/lodash/_baseIndexOf.js"),baseIndexOfWith=__webpack_require__("./node_modules/lodash/_baseIndexOfWith.js"),baseUnary=__webpack_require__("./node_modules/lodash/_baseUnary.js"),copyArray=__webpack_require__("./node_modules/lodash/_copyArray.js"),arrayProto=Array.prototype,splice=arrayProto.splice;module.exports=basePullAll;

/***/ },

/***/ "./node_modules/lodash/_baseIndexOfWith.js":
/***/ function(module, exports) {

	function baseIndexOfWith(e,n,r,t){for(var f=r-1,i=e.length;++f<i;)if(t(e[f],n))return f;return-1}module.exports=baseIndexOfWith;

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-unicode-regex/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports["default"]=function(){return{visitor:{RegExpLiteral:function(e){var r=e.node;regex.is(r,"u")&&(r.pattern=(0,_regexpuCore2["default"])(r.pattern,r.flags),regex.pullFlag(r,"u"))}}}};var _regexpuCore=__webpack_require__("./node_modules/regexpu-core/rewrite-pattern.js"),_regexpuCore2=_interopRequireDefault(_regexpuCore),_babelHelperRegex=__webpack_require__("./node_modules/babel-helper-regex/lib/index.js"),regex=_interopRequireWildcard(_babelHelperRegex);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/regexpu-core/rewrite-pattern.js":
/***/ function(module, exports, __webpack_require__) {

	function getCharacterClassEscapeSet(e){return unicode?ignoreCase?ESCAPE_SETS.UNICODE_IGNORE_CASE[e]:ESCAPE_SETS.UNICODE[e]:ESCAPE_SETS.REGULAR[e]}function has(e,a){return hasOwnProperty.call(e,a)}function assign(e,a){for(var r in a)e[r]=a[r]}function update(e,a){if(a){var r=parse(a,"");switch(r.type){case"characterClass":case"group":case"value":break;default:r=wrap(r,a)}assign(e,r)}}function wrap(e,a){return{type:"group",behavior:"ignore",body:[e],raw:"(?:"+a+")"}}function caseFold(e){return!!has(iuMappings,e)&&iuMappings[e]}function processCharacterClass(e){var a=regenerate();e.body.forEach(function(e){switch(e.type){case"value":if(a.add(e.codePoint),ignoreCase&&unicode){var r=caseFold(e.codePoint);r&&a.add(r)}break;case"characterClassRange":var n=e.min.codePoint,t=e.max.codePoint;a.addRange(n,t),ignoreCase&&unicode&&a.iuAddRange(n,t);break;case"characterClassEscape":a.add(getCharacterClassEscapeSet(e.value));break;default:throw Error("Unknown term type: "+e.type)}});return e.negative&&(a=(unicode?UNICODE_SET:BMP_SET).clone().remove(a)),update(e,a.toString()),e}function processTerm(e){switch(e.type){case"dot":update(e,(unicode?DOT_SET_UNICODE:DOT_SET).toString());break;case"characterClass":e=processCharacterClass(e);break;case"characterClassEscape":update(e,getCharacterClassEscapeSet(e.value).toString());break;case"alternative":case"disjunction":case"group":case"quantifier":e.body=e.body.map(processTerm);break;case"value":var a=e.codePoint,r=regenerate(a);if(ignoreCase&&unicode){var n=caseFold(a);n&&r.add(n)}update(e,r.toString());break;case"anchor":case"empty":case"group":case"reference":break;default:throw Error("Unknown term type: "+e.type)}return e}var generate=__webpack_require__("./node_modules/regjsgen/regjsgen.js").generate,parse=__webpack_require__("./node_modules/regjsparser/parser.js").parse,regenerate=__webpack_require__("./node_modules/regenerate/regenerate.js"),iuMappings=__webpack_require__("./node_modules/regexpu-core/data/iu-mappings.json"),ESCAPE_SETS=__webpack_require__("./node_modules/regexpu-core/data/character-class-escape-sets.js"),object={},hasOwnProperty=object.hasOwnProperty,UNICODE_SET=regenerate().addRange(0,1114111),BMP_SET=regenerate().addRange(0,65535),DOT_SET_UNICODE=UNICODE_SET.clone().remove(10,13,8232,8233),DOT_SET=DOT_SET_UNICODE.clone().intersection(BMP_SET);regenerate.prototype.iuAddRange=function(e,a){var r=this;do{var n=caseFold(e);n&&r.add(n)}while(++e<=a);return r};var ignoreCase=!1,unicode=!1;module.exports=function(e,a){var r=parse(e,a);return ignoreCase=!!a&&a.indexOf("i")>-1,unicode=!!a&&a.indexOf("u")>-1,assign(r,processTerm(r)),generate(r)};

/***/ },

/***/ "./node_modules/regjsgen/regjsgen.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {(function(){"use strict";function e(){var e,r,t=16384,a=[],n=-1,o=arguments.length;if(!o)return"";for(var c="";++n<o;){var i=Number(arguments[n]);if(!isFinite(i)||i<0||i>1114111||k(i)!=i)throw RangeError("Invalid code point: "+i);i<=65535?a.push(i):(i-=65536,e=(i>>10)+55296,r=i%1024+56320,a.push(e,r)),(n+1==o||a.length>t)&&(c+=m.apply(null,a),a.length=0)}return c}function r(e,t){if(t.indexOf("|")==-1){if(e==t)return;throw Error("Invalid node type: "+e)}if(t=r.hasOwnProperty(t)?r[t]:r[t]=RegExp("^(?:"+t+")$"),!t.test(e))throw Error("Invalid node type: "+e)}function t(e){var r=e.type;if(t.hasOwnProperty(r)&&"function"==typeof t[r])return t[r](e);throw Error("Invalid node type: "+r)}function a(e){r(e.type,"alternative");var t=e.body,a=t?t.length:0;if(1==a)return y(t[0]);for(var n=-1,o="";++n<a;)o+=y(t[n]);return o}function n(e){switch(r(e.type,"anchor"),e.kind){case"start":return"^";case"end":return"$";case"boundary":return"\\b";case"not-boundary":return"\\B";default:throw Error("Invalid assertion")}}function o(e){return r(e.type,"anchor|characterClass|characterClassEscape|dot|group|reference|value"),t(e)}function c(e){r(e.type,"characterClass");var t=e.body,a=t?t.length:0,n=-1,o="[";for(e.negative&&(o+="^");++n<a;)o+=u(t[n]);return o+="]"}function i(e){return r(e.type,"characterClassEscape"),"\\"+e.value}function s(e){r(e.type,"characterClassRange");var t=e.min,a=e.max;if("characterClassRange"==t.type||"characterClassRange"==a.type)throw Error("Invalid character class range");return u(t)+"-"+u(a)}function u(e){return r(e.type,"anchor|characterClassEscape|characterClassRange|dot|value"),t(e)}function l(e){r(e.type,"disjunction");var a=e.body,n=a?a.length:0;if(0==n)throw Error("No body");if(1==n)return t(a[0]);for(var o=-1,c="";++o<n;)0!=o&&(c+="|"),c+=t(a[o]);return c}function f(e){return r(e.type,"dot"),"."}function d(e){r(e.type,"group");var a="(";switch(e.behavior){case"normal":break;case"ignore":a+="?:";break;case"lookahead":a+="?=";break;case"negativeLookahead":a+="?!";break;default:throw Error("Invalid behaviour: "+e.behaviour)}var n=e.body,o=n?n.length:0;if(1==o)a+=t(n[0]);else for(var c=-1;++c<o;)a+=t(n[c]);return a+=")"}function p(e){r(e.type,"quantifier");var t="",a=e.min,n=e.max;switch(n){case void 0:case null:switch(a){case 0:t="*";break;case 1:t="+";break;default:t="{"+a+",}"}break;default:t=a==n?"{"+a+"}":0==a&&1==n?"?":"{"+a+","+n+"}"}return e.greedy||(t+="?"),o(e.body[0])+t}function h(e){return r(e.type,"reference"),"\\"+e.matchIndex}function y(e){return r(e.type,"anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|value"),t(e)}function v(t){r(t.type,"value");var a=t.kind,n=t.codePoint;switch(a){case"controlLetter":return"\\c"+e(n+64);case"hexadecimalEscape":return"\\x"+("00"+n.toString(16).toUpperCase()).slice(-2);case"identifier":return"\\"+e(n);case"null":return"\\"+n;case"octal":return"\\"+n.toString(8);case"singleEscape":switch(n){case 8:return"\\b";case 9:return"\\t";case 10:return"\\n";case 11:return"\\v";case 12:return"\\f";case 13:return"\\r";default:throw Error("Invalid codepoint: "+n)}case"symbol":return e(n);case"unicodeEscape":return"\\u"+("0000"+n.toString(16).toUpperCase()).slice(-4);case"unicodeCodePointEscape":return"\\u{"+n.toString(16).toUpperCase()+"}";default:throw Error("Unsupported node kind: "+a)}}var g={"function":!0,object:!0},b=g[typeof window]&&window||this,w=g[typeof exports]&&exports,C=g[typeof module]&&module&&!module.nodeType&&module,E=w&&C&&"object"==typeof global&&global;!E||E.global!==E&&E.window!==E&&E.self!==E||(b=E);var m=String.fromCharCode,k=Math.floor;t.alternative=a,t.anchor=n,t.characterClass=c,t.characterClassEscape=i,t.characterClassRange=s,t.disjunction=l,t.dot=f,t.group=d,t.quantifier=p,t.reference=h,t.value=v, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return{generate:t}}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):w&&C?w.generate=t:b.regjsgen={generate:t}}).call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module), (function() { return this; }())))

/***/ },

/***/ "./node_modules/regjsparser/parser.js":
/***/ function(module, exports) {

	!function(){function n(n,r){function e(r){return r.raw=n.substring(r.range[0],r.range[1]),r}function t(n,r){return n.range[0]=r,e(n)}function a(n,r){return e({type:"anchor",kind:n,range:[X-r,X]})}function u(n,r,t,a){return e({type:"value",kind:n,codePoint:r,range:[t,a]})}function o(n,r,e,t){return t=t||0,u(n,r,X-(e.length+t),X)}function i(n){var r=n[0],e=r.charCodeAt(0);if(V){var t;if(1===r.length&&e>=55296&&e<=56319&&(t=C().charCodeAt(0),t>=56320&&t<=57343))return X++,u("symbol",1024*(e-55296)+t-56320+65536,X-2,X)}return u("symbol",e,X-1,X)}function c(n,r,t){return e({type:"disjunction",body:n,range:[r,t]})}function s(){return e({type:"dot",range:[X-1,X]})}function f(n){return e({type:"characterClassEscape",value:n,range:[X-2,X]})}function g(n){return e({type:"reference",matchIndex:parseInt(n,10),range:[X-1-n.length,X]})}function l(n,r,t,a){return e({type:"group",behavior:n,body:r,range:[t,a]})}function d(n,r,t,a){return null==a&&(t=X-1,a=X),e({type:"quantifier",min:n,max:r,greedy:!0,body:null,range:[t,a]})}function p(n,r,t){return e({type:"alternative",body:n,range:[r,t]})}function v(n,r,t,a){return e({type:"characterClass",body:n,negative:r,range:[t,a]})}function h(n,r,t,a){return n.codePoint>r.codePoint&&K("invalid range in character class",n.raw+"-"+r.raw,t,a),e({type:"characterClassRange",min:n,max:r,range:[t,a]})}function y(n){return"alternative"===n.type?n.body:[n]}function m(r){r=r||1;var e=n.substring(X,X+r);return X+=r||1,e}function b(n){E(n)||K("character",n)}function E(r){if(n.indexOf(r,X)===X)return m(r.length)}function C(){return n[X]}function x(r){return n.indexOf(r,X)===X}function k(r){return n[X+1]===r}function A(r){var e=n.substring(X),t=e.match(r);return t&&(t.range=[],t.range[0]=X,m(t[0].length),t.range[1]=X),t}function I(){var n=[],r=X;for(n.push(w());E("|");)n.push(w());return 1===n.length?n[0]:c(n,r,X)}function w(){for(var n,r=[],e=X;n=P();)r.push(n);return 1===r.length?r[0]:p(r,e,X)}function P(){if(X>=n.length||x("|")||x(")"))return null;var r=j();if(r)return r;var e=B();e||K("Expected atom");var a=S()||!1;return a?(a.body=y(e),t(a,e.range[0]),a):e}function R(n,r,e,t){var a=null,u=X;if(E(n))a=r;else{if(!E(e))return!1;a=t}var o=I();o||K("Expected disjunction"),b(")");var i=l(a,y(o),u,X);return"normal"==a&&U&&T++,i}function j(){return E("^")?a("start",1):E("$")?a("end",1):E("\\b")?a("boundary",2):E("\\B")?a("not-boundary",2):R("(?=","lookahead","(?!","negativeLookahead")}function S(){var n,r,e,t,a=X;return E("*")?r=d(0):E("+")?r=d(1):E("?")?r=d(0,1):(n=A(/^\{([0-9]+)\}/))?(e=parseInt(n[1],10),r=d(e,e,n.range[0],n.range[1])):(n=A(/^\{([0-9]+),\}/))?(e=parseInt(n[1],10),r=d(e,void 0,n.range[0],n.range[1])):(n=A(/^\{([0-9]+),([0-9]+)\}/))&&(e=parseInt(n[1],10),t=parseInt(n[2],10),e>t&&K("numbers out of order in {} quantifier","",a,X),r=d(e,t,n.range[0],n.range[1])),r&&E("?")&&(r.greedy=!1,r.range[1]+=1),r}function B(){var n;return(n=A(/^[^^$\\.*+?(){[|]/))?i(n):E(".")?s():E("\\")?(n=$(),n||K("atomEscape"),n):(n=z())?n:R("(?:","ignore","(","normal")}function F(n){if(V){var r,t;if("unicodeEscape"==n.kind&&(r=n.codePoint)>=55296&&r<=56319&&x("\\")&&k("u")){var a=X;X++;var u=O();"unicodeEscape"==u.kind&&(t=u.codePoint)>=56320&&t<=57343?(n.range[1]=u.range[1],n.codePoint=1024*(r-55296)+t-56320+65536,n.type="value",n.kind="unicodeCodePointEscape",e(n)):X=a}}return n}function O(){return $(!0)}function $(n){var r,e=X;if(r=q())return r;if(n){if(E("b"))return o("singleEscape",8,"\\b");E("B")&&K("\\B not possible inside of CharacterClass","",e)}return r=D()}function q(){var n,r;if(n=A(/^(?!0)\d+/)){r=n[0];var e=parseInt(n[0],10);return e<=T?g(n[0]):(Q.push(e),m(-n[0].length),(n=A(/^[0-7]{1,3}/))?o("octal",parseInt(n[0],8),n[0],1):(n=i(A(/^[89]/)),t(n,n.range[0]-1)))}return(n=A(/^[0-7]{1,3}/))?(r=n[0],/^0{1,3}$/.test(r)?o("null",0,"0",r.length+1):o("octal",parseInt(r,8),r,1)):!!(n=A(/^[dDsSwW]/))&&f(n[0])}function D(){var n;if(n=A(/^[fnrtv]/)){var r=0;switch(n[0]){case"t":r=9;break;case"n":r=10;break;case"v":r=11;break;case"f":r=12;break;case"r":r=13}return o("singleEscape",r,"\\"+n[0])}return(n=A(/^c([a-zA-Z])/))?o("controlLetter",n[1].charCodeAt(0)%32,n[1],2):(n=A(/^x([0-9a-fA-F]{2})/))?o("hexadecimalEscape",parseInt(n[1],16),n[1],2):(n=A(/^u([0-9a-fA-F]{4})/))?F(o("unicodeEscape",parseInt(n[1],16),n[1],2)):V&&(n=A(/^u\{([0-9a-fA-F]+)\}/))?o("unicodeCodePointEscape",parseInt(n[1],16),n[1],4):M()}function L(n){var r=new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԯԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠ-ࢲࣤ-ॣ०-९ॱ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఀ-ఃఅ-ఌఎ-ఐఒ-నప-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಁ-ಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲഁ-ഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟ෦-෯ෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤞᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧ᪰-᪽ᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶ᳸᳹ᴀ-᷵᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚝꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꧠ-ꧾꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︭︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]");return 36===n||95===n||n>=65&&n<=90||n>=97&&n<=122||n>=48&&n<=57||92===n||n>=128&&r.test(String.fromCharCode(n))}function M(){var n,r="‌",e="‍";return L(C())?E(r)?o("identifier",8204,r):E(e)?o("identifier",8205,e):null:(n=m(),o("identifier",n.charCodeAt(0),n,1))}function z(){var n,r=X;return(n=A(/^\[\^/))?(n=N(),b("]"),v(n,!0,r,X)):E("[")?(n=N(),b("]"),v(n,!1,r,X)):null}function N(){var n;return x("]")?[]:(n=Z(),n||K("nonEmptyClassRanges"),n)}function W(n){var r,e,t;if(x("-")&&!k("]")){b("-"),t=H(),t||K("classAtom"),e=X;var a=N();return a||K("classRanges"),r=n.range[0],"empty"===a.type?[h(n,t,r,e)]:[h(n,t,r,e)].concat(a)}return t=G(),t||K("nonEmptyClassRangesNoDash"),[n].concat(t)}function Z(){var n=H();return n||K("classAtom"),x("]")?[n]:W(n)}function G(){var n=H();return n||K("classAtom"),x("]")?n:W(n)}function H(){return E("-")?i("-"):J()}function J(){var n;return(n=A(/^[^\\\]-]/))?i(n[0]):E("\\")?(n=O(),n||K("classEscape"),F(n)):void 0}function K(r,e,t,a){t=null==t?X:t,a=null==a?t:a;var u=Math.max(0,t-10),o=Math.min(a+10,n.length),i="    "+n.substring(u,o),c="    "+new Array(t-u+1).join(" ")+"^";throw SyntaxError(r+" at position "+t+(e?": "+e:"")+"\n"+i+"\n"+c)}var Q=[],T=0,U=!0,V=(r||"").indexOf("u")!==-1,X=0;n=String(n),""===n&&(n="(?:)");var Y=I();Y.range[1]!==n.length&&K("Could not parse entire input - got stuck","",Y.range[1]);for(var _=0;_<Q.length;_++)if(Q[_]<=T)return X=0,U=!1,I();return Y}var r={parse:n};"undefined"!=typeof module&&module.exports?module.exports=r:window.regjsparser=r}();

/***/ },

/***/ "./node_modules/regenerate/regenerate.js":
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {!function(r){var n="object"==typeof exports&&exports,t="object"==typeof module&&module&&module.exports==n&&module,e="object"==typeof global&&global;e.global!==e&&e.window!==e||(r=e);var u={rangeOrder:"A range’s `stop` value must be greater than or equal to the `start` value.",codePointRange:"Invalid code point value. Code points range from U+000000 to U+10FFFF."},o=55296,a=56319,i=56320,f=57343,s=/\\x00([^0123456789]|$)/g,h={},l=h.hasOwnProperty,c=function(r,n){var t;for(t in n)l.call(n,t)&&(r[t]=n[t]);return r},p=function(r,n){for(var t=-1,e=r.length;++t<e;)n(r[t],t)},g=h.toString,d=function(r){return"[object Array]"==g.call(r)},v=function(r){return"number"==typeof r||"[object Number]"==g.call(r)},m="0000",b=function(r,n){var t=String(r);return t.length<n?(m+t).slice(-n):t},y=function(r){return Number(r).toString(16).toUpperCase()},w=[].slice,F=function(r){for(var n,t=-1,e=r.length,u=e-1,o=[],a=!0,i=0;++t<e;)if(n=r[t],a)o.push(n),i=n,a=!1;else if(n==i+1){if(t!=u){i=n;continue}a=!0,o.push(n+1)}else o.push(i+1,n),i=n;return a||o.push(n+1),o},S=function(r,n){for(var t,e,u=0,o=r.length;u<o;){if(t=r[u],e=r[u+1],n>=t&&n<e)return n==t?e==t+1?(r.splice(u,2),r):(r[u]=n+1,r):n==e-1?(r[u+1]=n,r):(r.splice(u,2,t,n,n+1,e),r);u+=2}return r},x=function(r,n,t){if(t<n)throw Error(u.rangeOrder);for(var e,o,a=0;a<r.length;){if(e=r[a],o=r[a+1]-1,e>t)return r;if(n<=e&&t>=o)r.splice(a,2);else{if(n>=e&&t<o)return n==e?(r[a]=t+1,r[a+1]=o+1,r):(r.splice(a,2,e,n,t+1,o+1),r);if(n>=e&&n<=o)r[a+1]=n;else if(t>=e&&t<=o)return r[a]=t+1,r;a+=2}}return r},R=function(r,n){var t,e,o=0,a=null,i=r.length;if(n<0||n>1114111)throw RangeError(u.codePointRange);for(;o<i;){if(t=r[o],e=r[o+1],n>=t&&n<e)return r;if(n==t-1)return r[o]=n,r;if(t>n)return r.splice(null!=a?a+2:0,0,n,n+1),r;if(n==e)return n+1==r[o+2]?(r.splice(o,4,t,r[o+3]),r):(r[o+1]=n+1,r);a=o,o+=2}return r.push(n,n+1),r},j=function(r,n){for(var t,e,u=0,o=r.slice(),a=n.length;u<a;)t=n[u],e=n[u+1]-1,o=t==e?R(o,t):O(o,t,e),u+=2;return o},C=function(r,n){for(var t,e,u=0,o=r.slice(),a=n.length;u<a;)t=n[u],e=n[u+1]-1,o=t==e?S(o,t):x(o,t,e),u+=2;return o},O=function(r,n,t){if(t<n)throw Error(u.rangeOrder);if(n<0||n>1114111||t<0||t>1114111)throw RangeError(u.codePointRange);for(var e,o,a=0,i=!1,f=r.length;a<f;){if(e=r[a],o=r[a+1],i){if(e==t+1)return r.splice(a-1,2),r;if(e>t)return r;e>=n&&e<=t&&(o>n&&o-1<=t?(r.splice(a,2),a-=2):(r.splice(a-1,2),a-=2))}else{if(e==t+1)return r[a]=n,r;if(e>t)return r.splice(a,0,n,t+1),r;if(n>=e&&n<o&&t+1<=o)return r;n>=e&&n<o||o==n?(r[a+1]=t+1,i=!0):n<=e&&t+1>=o&&(r[a]=n,r[a+1]=t+1,i=!0)}a+=2}return i||r.push(n,t+1),r},E=function(r,n){var t=0,e=r.length,u=r[t],o=r[e-1];if(e>=2&&(n<u||n>o))return!1;for(;t<e;){if(u=r[t],o=r[t+1],n>=u&&n<o)return!0;t+=2}return!1},U=function(r,n){for(var t,e=0,u=n.length,o=[];e<u;)t=n[e],E(r,t)&&o.push(t),++e;return F(o)},A=function(r){return!r.length},D=function(r){return 2==r.length&&r[0]+1==r[1]},P=function(r){for(var n,t,e=0,u=[],o=r.length;e<o;){for(n=r[e],t=r[e+1];n<t;)u.push(n),++n;e+=2}return u},I=Math.floor,H=function(r){return parseInt(I((r-65536)/1024)+o,10)},L=function(r){return parseInt((r-65536)%1024+i,10)},N=String.fromCharCode,$=function(r){var n;return n=9==r?"\\t":10==r?"\\n":12==r?"\\f":13==r?"\\r":92==r?"\\\\":36==r||r>=40&&r<=43||45==r||46==r||63==r||r>=91&&r<=94||r>=123&&r<=125?"\\"+N(r):r>=32&&r<=126?N(r):r<=255?"\\x"+b(y(r),2):"\\u"+b(y(r),4)},q=function(r){return r<=65535?$(r):"\\u{"+r.toString(16).toUpperCase()+"}"},B=function(r){var n,t=r.length,e=r.charCodeAt(0);return e>=o&&e<=a&&t>1?(n=r.charCodeAt(1),1024*(e-o)+n-i+65536):e},M=function(r){var n,t,e="",u=0,o=r.length;if(D(r))return $(r[0]);for(;u<o;)n=r[u],t=r[u+1]-1,e+=n==t?$(n):n+1==t?$(n)+$(t):$(n)+"-"+$(t),u+=2;return"["+e+"]"},T=function(r){var n,t,e="",u=0,o=r.length;if(D(r))return q(r[0]);for(;u<o;)n=r[u],t=r[u+1]-1,e+=n==t?q(n):n+1==t?q(n)+q(t):q(n)+"-"+q(t),u+=2;return"["+e+"]"},k=function(r){for(var n,t,e=[],u=[],s=[],h=[],l=0,c=r.length;l<c;)n=r[l],t=r[l+1]-1,n<o?(t<o&&s.push(n,t+1),t>=o&&t<=a&&(s.push(n,o),e.push(o,t+1)),t>=i&&t<=f&&(s.push(n,o),e.push(o,a+1),u.push(i,t+1)),t>f&&(s.push(n,o),e.push(o,a+1),u.push(i,f+1),t<=65535?s.push(f+1,t+1):(s.push(f+1,65536),h.push(65536,t+1)))):n>=o&&n<=a?(t>=o&&t<=a&&e.push(n,t+1),t>=i&&t<=f&&(e.push(n,a+1),u.push(i,t+1)),t>f&&(e.push(n,a+1),u.push(i,f+1),t<=65535?s.push(f+1,t+1):(s.push(f+1,65536),h.push(65536,t+1)))):n>=i&&n<=f?(t>=i&&t<=f&&u.push(n,t+1),t>f&&(u.push(n,f+1),t<=65535?s.push(f+1,t+1):(s.push(f+1,65536),h.push(65536,t+1)))):n>f&&n<=65535?t<=65535?s.push(n,t+1):(s.push(n,65536),h.push(65536,t+1)):h.push(n,t+1),l+=2;return{loneHighSurrogates:e,loneLowSurrogates:u,bmp:s,astral:h}},z=function(r){for(var n,t,e,u,o,a,i=[],f=[],s=!1,h=-1,l=r.length;++h<l;)if(n=r[h],t=r[h+1]){for(e=n[0],u=n[1],o=t[0],a=t[1],f=u;o&&e[0]==o[0]&&e[1]==o[1];)f=D(a)?R(f,a[0]):O(f,a[0],a[1]-1),++h,n=r[h],e=n[0],u=n[1],t=r[h+1],o=t&&t[0],a=t&&t[1],s=!0;i.push([e,s?f:u]),s=!1}else i.push(n);return G(i)},G=function(r){if(1==r.length)return r;for(var n=-1,t=-1;++n<r.length;){var e=r[n],u=e[1],o=u[0],a=u[1];for(t=n;++t<r.length;){var i=r[t],f=i[1],s=f[0],h=f[1];o==s&&a==h&&(D(i[0])?e[0]=R(e[0],i[0][0]):e[0]=O(e[0],i[0][0],i[0][1]-1),r.splice(t,1),--t)}}return r},J=function(r){if(!r.length)return[];for(var n,t,e,u,o,a,s=0,h=0,l=0,c=[],p=r.length;s<p;){n=r[s],t=r[s+1]-1,e=H(n),u=L(n),o=H(t),a=L(t);var g=u==i,d=a==f,v=!1;e==o||g&&d?(c.push([[e,o+1],[u,a+1]]),v=!0):c.push([[e,e+1],[u,f+1]]),!v&&e+1<o&&(d?(c.push([[e+1,o+1],[i,a+1]]),v=!0):c.push([[e+1,o],[i,f+1]])),v||c.push([[o,o+1],[i,a+1]]),h=e,l=o,s+=2}return z(c)},K=function(r){var n=[];return p(r,function(r){var t=r[0],e=r[1];n.push(M(t)+M(e))}),n.join("|")},Q=function(r,n,t){if(t)return T(r);var e=[],u=k(r),o=u.loneHighSurrogates,a=u.loneLowSurrogates,i=u.bmp,f=u.astral,s=(!A(u.astral),!A(o)),h=!A(a),l=J(f);return n&&(i=j(i,o),s=!1,i=j(i,a),h=!1),A(i)||e.push(M(i)),l.length&&e.push(K(l)),s&&e.push(M(o)+"(?![\\uDC00-\\uDFFF])"),h&&e.push("(?:[^\\uD800-\\uDBFF]|^)"+M(a)),e.join("|")},V=function(r){return arguments.length>1&&(r=w.call(arguments)),this instanceof V?(this.data=[],r?this.add(r):this):(new V).add(r)};V.version="1.3.1";var W=V.prototype;c(W,{add:function(r){var n=this;return null==r?n:r instanceof V?(n.data=j(n.data,r.data),n):(arguments.length>1&&(r=w.call(arguments)),d(r)?(p(r,function(r){n.add(r)}),n):(n.data=R(n.data,v(r)?r:B(r)),n))},remove:function(r){var n=this;return null==r?n:r instanceof V?(n.data=C(n.data,r.data),n):(arguments.length>1&&(r=w.call(arguments)),d(r)?(p(r,function(r){n.remove(r)}),n):(n.data=S(n.data,v(r)?r:B(r)),n))},addRange:function(r,n){var t=this;return t.data=O(t.data,v(r)?r:B(r),v(n)?n:B(n)),t},removeRange:function(r,n){var t=this,e=v(r)?r:B(r),u=v(n)?n:B(n);return t.data=x(t.data,e,u),t},intersection:function(r){var n=this,t=r instanceof V?P(r.data):r;return n.data=U(n.data,t),n},contains:function(r){return E(this.data,v(r)?r:B(r))},clone:function(){var r=new V;return r.data=this.data.slice(0),r},toString:function(r){var n=Q(this.data,!!r&&r.bmpOnly,!!r&&r.hasUnicodeFlag);return n?n.replace(s,"\\0$1"):"[]"},toRegExp:function(r){var n=this.toString(r&&r.indexOf("u")!=-1?{hasUnicodeFlag:!0}:null);return RegExp(n,r||"")},valueOf:function(){return P(this.data)}}),W.toArray=W.valueOf, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return V}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):n&&!n.nodeType?t?t.exports=V:n.regenerate=V:r.regenerate=V}(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module), (function() { return this; }())))

/***/ },

/***/ "./node_modules/regexpu-core/data/iu-mappings.json":
/***/ function(module, exports) {

	module.exports = {
		"75": 8490,
		"83": 383,
		"107": 8490,
		"115": 383,
		"181": 924,
		"197": 8491,
		"383": 83,
		"452": 453,
		"453": 452,
		"455": 456,
		"456": 455,
		"458": 459,
		"459": 458,
		"497": 498,
		"498": 497,
		"837": 8126,
		"914": 976,
		"917": 1013,
		"920": 1012,
		"921": 8126,
		"922": 1008,
		"924": 181,
		"928": 982,
		"929": 1009,
		"931": 962,
		"934": 981,
		"937": 8486,
		"962": 931,
		"976": 914,
		"977": 1012,
		"981": 934,
		"982": 928,
		"1008": 922,
		"1009": 929,
		"1012": [
			920,
			977
		],
		"1013": 917,
		"7776": 7835,
		"7835": 7776,
		"8126": [
			837,
			921
		],
		"8486": 937,
		"8490": 75,
		"8491": 197,
		"66560": 66600,
		"66561": 66601,
		"66562": 66602,
		"66563": 66603,
		"66564": 66604,
		"66565": 66605,
		"66566": 66606,
		"66567": 66607,
		"66568": 66608,
		"66569": 66609,
		"66570": 66610,
		"66571": 66611,
		"66572": 66612,
		"66573": 66613,
		"66574": 66614,
		"66575": 66615,
		"66576": 66616,
		"66577": 66617,
		"66578": 66618,
		"66579": 66619,
		"66580": 66620,
		"66581": 66621,
		"66582": 66622,
		"66583": 66623,
		"66584": 66624,
		"66585": 66625,
		"66586": 66626,
		"66587": 66627,
		"66588": 66628,
		"66589": 66629,
		"66590": 66630,
		"66591": 66631,
		"66592": 66632,
		"66593": 66633,
		"66594": 66634,
		"66595": 66635,
		"66596": 66636,
		"66597": 66637,
		"66598": 66638,
		"66599": 66639,
		"66600": 66560,
		"66601": 66561,
		"66602": 66562,
		"66603": 66563,
		"66604": 66564,
		"66605": 66565,
		"66606": 66566,
		"66607": 66567,
		"66608": 66568,
		"66609": 66569,
		"66610": 66570,
		"66611": 66571,
		"66612": 66572,
		"66613": 66573,
		"66614": 66574,
		"66615": 66575,
		"66616": 66576,
		"66617": 66577,
		"66618": 66578,
		"66619": 66579,
		"66620": 66580,
		"66621": 66581,
		"66622": 66582,
		"66623": 66583,
		"66624": 66584,
		"66625": 66585,
		"66626": 66586,
		"66627": 66587,
		"66628": 66588,
		"66629": 66589,
		"66630": 66590,
		"66631": 66591,
		"66632": 66592,
		"66633": 66593,
		"66634": 66594,
		"66635": 66595,
		"66636": 66596,
		"66637": 66597,
		"66638": 66598,
		"66639": 66599,
		"68736": 68800,
		"68737": 68801,
		"68738": 68802,
		"68739": 68803,
		"68740": 68804,
		"68741": 68805,
		"68742": 68806,
		"68743": 68807,
		"68744": 68808,
		"68745": 68809,
		"68746": 68810,
		"68747": 68811,
		"68748": 68812,
		"68749": 68813,
		"68750": 68814,
		"68751": 68815,
		"68752": 68816,
		"68753": 68817,
		"68754": 68818,
		"68755": 68819,
		"68756": 68820,
		"68757": 68821,
		"68758": 68822,
		"68759": 68823,
		"68760": 68824,
		"68761": 68825,
		"68762": 68826,
		"68763": 68827,
		"68764": 68828,
		"68765": 68829,
		"68766": 68830,
		"68767": 68831,
		"68768": 68832,
		"68769": 68833,
		"68770": 68834,
		"68771": 68835,
		"68772": 68836,
		"68773": 68837,
		"68774": 68838,
		"68775": 68839,
		"68776": 68840,
		"68777": 68841,
		"68778": 68842,
		"68779": 68843,
		"68780": 68844,
		"68781": 68845,
		"68782": 68846,
		"68783": 68847,
		"68784": 68848,
		"68785": 68849,
		"68786": 68850,
		"68800": 68736,
		"68801": 68737,
		"68802": 68738,
		"68803": 68739,
		"68804": 68740,
		"68805": 68741,
		"68806": 68742,
		"68807": 68743,
		"68808": 68744,
		"68809": 68745,
		"68810": 68746,
		"68811": 68747,
		"68812": 68748,
		"68813": 68749,
		"68814": 68750,
		"68815": 68751,
		"68816": 68752,
		"68817": 68753,
		"68818": 68754,
		"68819": 68755,
		"68820": 68756,
		"68821": 68757,
		"68822": 68758,
		"68823": 68759,
		"68824": 68760,
		"68825": 68761,
		"68826": 68762,
		"68827": 68763,
		"68828": 68764,
		"68829": 68765,
		"68830": 68766,
		"68831": 68767,
		"68832": 68768,
		"68833": 68769,
		"68834": 68770,
		"68835": 68771,
		"68836": 68772,
		"68837": 68773,
		"68838": 68774,
		"68839": 68775,
		"68840": 68776,
		"68841": 68777,
		"68842": 68778,
		"68843": 68779,
		"68844": 68780,
		"68845": 68781,
		"68846": 68782,
		"68847": 68783,
		"68848": 68784,
		"68849": 68785,
		"68850": 68786,
		"71840": 71872,
		"71841": 71873,
		"71842": 71874,
		"71843": 71875,
		"71844": 71876,
		"71845": 71877,
		"71846": 71878,
		"71847": 71879,
		"71848": 71880,
		"71849": 71881,
		"71850": 71882,
		"71851": 71883,
		"71852": 71884,
		"71853": 71885,
		"71854": 71886,
		"71855": 71887,
		"71856": 71888,
		"71857": 71889,
		"71858": 71890,
		"71859": 71891,
		"71860": 71892,
		"71861": 71893,
		"71862": 71894,
		"71863": 71895,
		"71864": 71896,
		"71865": 71897,
		"71866": 71898,
		"71867": 71899,
		"71868": 71900,
		"71869": 71901,
		"71870": 71902,
		"71871": 71903,
		"71872": 71840,
		"71873": 71841,
		"71874": 71842,
		"71875": 71843,
		"71876": 71844,
		"71877": 71845,
		"71878": 71846,
		"71879": 71847,
		"71880": 71848,
		"71881": 71849,
		"71882": 71850,
		"71883": 71851,
		"71884": 71852,
		"71885": 71853,
		"71886": 71854,
		"71887": 71855,
		"71888": 71856,
		"71889": 71857,
		"71890": 71858,
		"71891": 71859,
		"71892": 71860,
		"71893": 71861,
		"71894": 71862,
		"71895": 71863,
		"71896": 71864,
		"71897": 71865,
		"71898": 71866,
		"71899": 71867,
		"71900": 71868,
		"71901": 71869,
		"71902": 71870,
		"71903": 71871
	};

/***/ },

/***/ "./node_modules/regexpu-core/data/character-class-escape-sets.js":
/***/ function(module, exports, __webpack_require__) {

	var regenerate=__webpack_require__("./node_modules/regenerate/regenerate.js");exports.REGULAR={d:regenerate().addRange(48,57),D:regenerate().addRange(0,47).addRange(58,65535),s:regenerate(32,160,5760,8239,8287,12288,65279).addRange(9,13).addRange(8192,8202).addRange(8232,8233),S:regenerate().addRange(0,8).addRange(14,31).addRange(33,159).addRange(161,5759).addRange(5761,8191).addRange(8203,8231).addRange(8234,8238).addRange(8240,8286).addRange(8288,12287).addRange(12289,65278).addRange(65280,65535),w:regenerate(95).addRange(48,57).addRange(65,90).addRange(97,122),W:regenerate(96).addRange(0,47).addRange(58,64).addRange(91,94).addRange(123,65535)},exports.UNICODE={d:regenerate().addRange(48,57),D:regenerate().addRange(0,47).addRange(58,1114111),s:regenerate(32,160,5760,8239,8287,12288,65279).addRange(9,13).addRange(8192,8202).addRange(8232,8233),S:regenerate().addRange(0,8).addRange(14,31).addRange(33,159).addRange(161,5759).addRange(5761,8191).addRange(8203,8231).addRange(8234,8238).addRange(8240,8286).addRange(8288,12287).addRange(12289,65278).addRange(65280,1114111),w:regenerate(95).addRange(48,57).addRange(65,90).addRange(97,122),W:regenerate(96).addRange(0,47).addRange(58,64).addRange(91,94).addRange(123,1114111)},exports.UNICODE_IGNORE_CASE={d:regenerate().addRange(48,57),D:regenerate().addRange(0,47).addRange(58,1114111),s:regenerate(32,160,5760,8239,8287,12288,65279).addRange(9,13).addRange(8192,8202).addRange(8232,8233),S:regenerate().addRange(0,8).addRange(14,31).addRange(33,159).addRange(161,5759).addRange(5761,8191).addRange(8203,8231).addRange(8234,8238).addRange(8240,8286).addRange(8288,12287).addRange(12289,65278).addRange(65280,1114111),w:regenerate(95,383,8490).addRange(48,57).addRange(65,90).addRange(97,122),W:regenerate(75,83,96).addRange(0,47).addRange(58,64).addRange(91,94).addRange(123,1114111)};

/***/ },

/***/ "./node_modules/babel-plugin-check-es2015-constants/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){var r=e.messages;return{visitor:{Scope:function(e){var t=e.scope;for(var o in t.bindings){var a=t.bindings[o];if("const"===a.kind||"module"===a.kind)for(var i=a.constantViolations,n=Array.isArray(i),u=0,i=n?i:(0,_getIterator3["default"])(i);;){var s;if(n){if(u>=i.length)break;s=i[u++]}else{if(u=i.next(),u.done)break;s=u.value}var l=s;throw l.buildCodeFrameError(r.get("readOnly",o))}}}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-spread/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){function r(e,r,i){return i.opts.loose&&!t.isIdentifier(e.argument,{name:"arguments"})?e.argument:r.toArray(e.argument,!0)}function i(e){for(var r=0;r<e.length;r++)if(t.isSpreadElement(e[r]))return!0;return!1}function n(e,i,n){function s(){o.length&&(a.push(t.arrayExpression(o)),o=[])}for(var a=[],o=[],p=e,u=Array.isArray(p),l=0,p=u?p:(0,_getIterator3["default"])(p);;){var f;if(u){if(l>=p.length)break;f=p[l++]}else{if(l=p.next(),l.done)break;f=l.value}var m=f;t.isSpreadElement(m)?(s(),a.push(r(m,i,n))):o.push(m)}return s(),a}var t=e.types;return{visitor:{ArrayExpression:function(e,r){var s=e.node,a=e.scope,o=s.elements;if(i(o)){var p=n(o,a,r),u=p.shift();t.isArrayExpression(u)||(p.unshift(u),u=t.arrayExpression([])),e.replaceWith(t.callExpression(t.memberExpression(u,t.identifier("concat")),p))}},CallExpression:function(e,r){var s=e.node,a=e.scope,o=s.arguments;if(i(o)){var p=e.get("callee");if(!p.isSuper()){var u=t.identifier("undefined");s.arguments=[];var l=void 0;l=1===o.length&&"arguments"===o[0].argument.name?[o[0].argument]:n(o,a,r);var f=l.shift();l.length?s.arguments.push(t.callExpression(t.memberExpression(f,t.identifier("concat")),l)):s.arguments.push(f);var m=s.callee;if(p.isMemberExpression()){var c=a.maybeGenerateMemoised(m.object);c?(m.object=t.assignmentExpression("=",c,m.object),u=c):u=m.object,t.appendToMemberExpression(m,t.identifier("apply"))}else s.callee=t.memberExpression(s.callee,t.identifier("apply"));t.isSuper(u)&&(u=t.thisExpression()),s.arguments.unshift(u)}}},NewExpression:function(e,r){var s=e.node,a=e.scope,o=s.arguments;if(i(o)){var p=n(o,a,r),u=t.arrayExpression([t.nullLiteral()]);o=t.callExpression(t.memberExpression(u,t.identifier("concat")),p),e.replaceWith(t.newExpression(t.callExpression(t.memberExpression(t.memberExpression(t.memberExpression(t.identifier("Function"),t.identifier("prototype")),t.identifier("bind")),t.identifier("apply")),[s.callee,o]),[]))}}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-parameters/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(){return{visitor:_babelTraverse.visitors.merge([{ArrowFunctionExpression:function(e){for(var r=e.get("params"),t=r,i=Array.isArray(t),u=0,t=i?t:(0,_getIterator3["default"])(t);;){var a;if(i){if(u>=t.length)break;a=t[u++]}else{if(u=t.next(),u.done)break;a=u.value}var o=a;if(o.isRestElement()||o.isAssignmentPattern()){e.arrowFunctionToShadowed();break}}}},destructuring.visitor,rest.visitor,def.visitor])}};var _babelTraverse=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_destructuring=__webpack_require__("./node_modules/babel-plugin-transform-es2015-parameters/lib/destructuring.js"),destructuring=_interopRequireWildcard(_destructuring),_default=__webpack_require__("./node_modules/babel-plugin-transform-es2015-parameters/lib/default.js"),def=_interopRequireWildcard(_default),_rest=__webpack_require__("./node_modules/babel-plugin-transform-es2015-parameters/lib/rest.js"),rest=_interopRequireWildcard(_rest);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-parameters/lib/destructuring.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}exports.__esModule=!0,exports.visitor=void 0;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),visitor=exports.visitor={Function:function(e){for(var r=e.get("params"),i=t.isRestElement(r[r.length-1])?1:0,a=r.length-i,o=0;o<a;o++){var n=r[o];if(n.isArrayPattern()||n.isObjectPattern()){var l=e.scope.generateUidIdentifier("ref"),s=t.variableDeclaration("let",[t.variableDeclarator(n.node,l)]);s._blockHoist=a-o,e.ensureBlock(),e.get("body").unshiftContainer("body",s),n.replaceWith(l)}}}};

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-parameters/lib/default.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function hasDefaults(e){for(var r=e.params,a=Array.isArray(r),i=0,r=a?r:(0,_getIterator3["default"])(r);;){var l;if(a){if(i>=r.length)break;l=r[i++]}else{if(i=r.next(),i.done)break;l=i.value}var n=l;if(!t.isIdentifier(n))return!0}return!1}exports.__esModule=!0,exports.visitor=void 0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_babelHelperGetFunctionArity=__webpack_require__("./node_modules/babel-helper-get-function-arity/lib/index.js"),_babelHelperGetFunctionArity2=_interopRequireDefault(_babelHelperGetFunctionArity),_babelHelperCallDelegate=__webpack_require__("./node_modules/babel-helper-call-delegate/lib/index.js"),_babelHelperCallDelegate2=_interopRequireDefault(_babelHelperCallDelegate),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),buildDefaultParam=(0,_babelTemplate2["default"])("\n  let VARIABLE_NAME =\n    ARGUMENTS.length > ARGUMENT_KEY && ARGUMENTS[ARGUMENT_KEY] !== undefined ?\n      ARGUMENTS[ARGUMENT_KEY]\n    :\n      DEFAULT_VALUE;\n"),buildCutOff=(0,_babelTemplate2["default"])("\n  let $0 = $1[$2];\n"),iifeVisitor={ReferencedIdentifier:function(e,t){var r=e.node.name;("eval"===r||e.scope.hasOwnBinding(r)&&"param"!==e.scope.getOwnBinding(r).kind)&&(t.iife=!0,e.stop())},Scope:function(e){e.skip()}},visitor=exports.visitor={Function:function(e){function r(e,r,i){var l=buildDefaultParam({VARIABLE_NAME:e,DEFAULT_VALUE:r,ARGUMENT_KEY:t.numericLiteral(i),ARGUMENTS:o});l._blockHoist=a.params.length-i,n.push(l)}var a=e.node,i=e.scope;if(hasDefaults(a)){e.ensureBlock();var l={iife:!1,scope:i},n=[],o=t.identifier("arguments");o._shadowedFunctionLiteral=e;for(var u=(0,_babelHelperGetFunctionArity2["default"])(a),s=e.get("params"),f=0;f<s.length;f++){var p=s[f];if(p.isAssignmentPattern()){var b=p.get("left"),d=p.get("right");if(f>=u||b.isPattern()){var _=i.generateUidIdentifier("x");_._isDefaultPlaceholder=!0,a.params[f]=_}else a.params[f]=b.node;l.iife||(d.isIdentifier()&&i.hasOwnBinding(d.node.name)&&"param"!==i.getOwnBinding(d.node.name).kind?l.iife=!0:d.traverse(iifeVisitor,l)),r(b.node,d.node,f)}else l.iife||p.isIdentifier()||p.traverse(iifeVisitor,l)}for(var c=u+1;c<a.params.length;c++){var g=a.params[c];if(!g._isDefaultPlaceholder){var m=buildCutOff(g,o,t.numericLiteral(c));m._blockHoist=a.params.length-c,n.push(m)}}a.params=a.params.slice(0,u),l.iife?(n.push((0,_babelHelperCallDelegate2["default"])(e,i)),e.set("body",t.blockStatement(n))):e.get("body").unshiftContainer("body",n)}}};

/***/ },

/***/ "./node_modules/babel-helper-call-delegate/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports["default"]=function(e){var r=arguments.length<=1||void 0===arguments[1]?e.scope:arguments[1],i=e.node,n=t.functionExpression(null,[],i.body,i.generator,i.async),s=n,u=[];(0,_babelHelperHoistVariables2["default"])(e,function(e){return r.push({id:e})});var o={foundThis:!1,foundArguments:!1};e.traverse(visitor,o),o.foundArguments&&(s=t.memberExpression(n,t.identifier("apply")),u=[],o.foundThis&&u.push(t.thisExpression()),o.foundArguments&&(o.foundThis||u.push(t.nullLiteral()),u.push(t.identifier("arguments"))));var a=t.callExpression(s,u);return i.generator&&(a=t.yieldExpression(a,!0)),t.returnStatement(a)};var _babelHelperHoistVariables=__webpack_require__("./node_modules/babel-helper-hoist-variables/lib/index.js"),_babelHelperHoistVariables2=_interopRequireDefault(_babelHelperHoistVariables),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),visitor={enter:function(e,r){e.isThisExpression()&&(r.foundThis=!0),e.isReferencedIdentifier({name:"arguments"})&&(r.foundArguments=!0)},Function:function(e){e.skip()}};module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-hoist-variables/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e,t){var r=arguments.length<=2||void 0===arguments[2]?"var":arguments[2];e.traverse(visitor,{kind:r,emit:t})};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),visitor={Scope:function(e,t){"let"===t.kind&&e.skip()},Function:function(e){e.skip()},VariableDeclaration:function(e,r){if(!r.kind||e.node.kind===r.kind){for(var i=[],n=e.get("declarations"),a=void 0,o=n,l=Array.isArray(o),d=0,o=l?o:(0,_getIterator3["default"])(o);;){var u;if(l){if(d>=o.length)break;u=o[d++]}else{if(d=o.next(),d.done)break;u=d.value}var s=u;a=s.node.id,s.node.init&&i.push(t.expressionStatement(t.assignmentExpression("=",s.node.id,s.node.init)));for(var f in s.getBindingIdentifiers())r.emit(t.identifier(f),f)}e.parentPath.isFor({left:e.node})?e.replaceWith(a):e.replaceWithMultiple(i)}}};module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-parameters/lib/rest.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function hasRest(e){return t.isRestElement(e.params[e.params.length-1])}function optimiseIndexGetter(e,r,n){var i=void 0;i=t.isNumericLiteral(e.parent.property)?t.numericLiteral(e.parent.property.value+n):t.binaryExpression("+",e.parent.property,t.numericLiteral(n)),e.parentPath.replaceWith(restIndex({ARGUMENTS:r,INDEX:i}))}function optimiseLengthGetter(e,r,n){n?e.parentPath.replaceWith(restLength({ARGUMENTS:r,OFFSET:t.numericLiteral(n)})):e.replaceWith(r)}exports.__esModule=!0,exports.visitor=void 0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),buildRest=(0,_babelTemplate2["default"])("\n  for (var LEN = ARGUMENTS.length,\n           ARRAY = Array(ARRAY_LEN),\n           KEY = START;\n       KEY < LEN;\n       KEY++) {\n    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];\n  }\n"),restIndex=(0,_babelTemplate2["default"])("\n  ARGUMENTS.length <= INDEX ? undefined : ARGUMENTS[INDEX]\n"),restLength=(0,_babelTemplate2["default"])("\n  ARGUMENTS.length <= OFFSET ? 0 : ARGUMENTS.length - OFFSET\n"),memberExpressionOptimisationVisitor={Scope:function(e,t){e.scope.bindingIdentifierEquals(t.name,t.outerBinding)||e.skip()},Flow:function(e){e.isTypeCastExpression()||e.skip()},"Function|ClassProperty":function(e,t){var r=t.noOptimise;t.noOptimise=!0,e.traverse(memberExpressionOptimisationVisitor,t),t.noOptimise=r,e.skip()},ReferencedIdentifier:function(e,t){var r=e.node;if("arguments"===r.name&&(t.deopted=!0),r.name===t.name)if(t.noOptimise)t.deopted=!0;else{var n=e.parentPath;if(n.isMemberExpression({object:r})){var i=n.parentPath,a=!t.deopted&&!(i.isAssignmentExpression()&&n.node===i.node.left||i.isLVal()||i.isForXStatement()||i.isUpdateExpression()||i.isUnaryExpression({operator:"delete"})||(i.isCallExpression()||i.isNewExpression())&&n.node===i.node.callee);if(a)if(n.node.computed){if(n.get("property").isBaseType("number"))return void t.candidates.push({cause:"indexGetter",path:e})}else if("length"===n.node.property.name)return void t.candidates.push({cause:"lengthGetter",path:e})}if(0===t.offset&&n.isSpreadElement()){var s=n.parentPath;if(s.isCallExpression()&&1===s.node.arguments.length)return void t.candidates.push({cause:"argSpread",path:e})}t.references.push(e)}},BindingIdentifier:function(e,t){var r=e.node;r.name===t.name&&(t.deopted=!0)}},visitor=exports.visitor={Function:function(e){var r=e.node,n=e.scope;if(hasRest(r)){var i=r.params.pop().argument,a=t.identifier("arguments");a._shadowedFunctionLiteral=e;var s={references:[],offset:r.params.length,argumentsNode:a,outerBinding:n.getBindingIdentifier(i.name),candidates:[],name:i.name,deopted:!1};if(e.traverse(memberExpressionOptimisationVisitor,s),s.deopted||s.references.length){s.references=s.references.concat(s.candidates.map(function(e){var t=e.path;return t})),s.deopted=s.deopted||!!r.shadow;var o=t.numericLiteral(r.params.length),p=n.generateUidIdentifier("key"),d=n.generateUidIdentifier("len"),l=p,u=d;r.params.length&&(l=t.binaryExpression("-",p,o),u=t.conditionalExpression(t.binaryExpression(">",d,o),t.binaryExpression("-",d,o),t.numericLiteral(0)));var f=buildRest({ARGUMENTS:a,ARRAY_KEY:l,ARRAY_LEN:u,START:o,ARRAY:i,KEY:p,LEN:d});if(s.deopted)f._blockHoist=r.params.length+1,r.body.body.unshift(f);else{f._blockHoist=1;var c=e.getEarliestCommonAncestorFrom(s.references).getStatementParent();c.findParent(function(e){return e.isLoop()?void(c=e):e.isFunction()}),c.insertBefore(f)}}else for(var m=s.candidates,E=Array.isArray(m),b=0,m=E?m:(0,_getIterator3["default"])(m);;){var h;if(E){if(b>=m.length)break;h=m[b++]}else{if(b=m.next(),b.done)break;h=b.value}var g=h,R=g.path,v=g.cause;switch(v){case"indexGetter":optimiseIndexGetter(R,a,s.offset);break;case"lengthGetter":optimiseLengthGetter(R,a,s.offset);break;default:R.replaceWith(a)}}}}};

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-destructuring/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){function t(e){for(var t=e.declarations,r=Array.isArray(t),a=0,t=r?t:(0,_getIterator3["default"])(t);;){var s;if(r){if(a>=t.length)break;s=t[a++]}else{if(a=t.next(),a.done)break;s=a.value}var n=s;if(i.isPattern(n.id))return!0}return!1}function r(e){for(var t=e.elements,r=Array.isArray(t),a=0,t=r?t:(0,_getIterator3["default"])(t);;){var s;if(r){if(a>=t.length)break;s=t[a++]}else{if(a=t.next(),a.done)break;s=a.value}var n=s;if(i.isRestElement(n))return!0}return!1}var i=e.types,a={ReferencedIdentifier:function(e,t){t.bindings[e.node.name]&&(t.deopt=!0,e.stop())}},s=function(){function e(t){(0,_classCallCheck3["default"])(this,e),this.blockHoist=t.blockHoist,this.operator=t.operator,this.arrays={},this.nodes=t.nodes||[],this.scope=t.scope,this.file=t.file,this.kind=t.kind}return e.prototype.buildVariableAssignment=function(e,t){var r=this.operator;i.isMemberExpression(e)&&(r="=");var a=void 0;return a=r?i.expressionStatement(i.assignmentExpression(r,e,t)):i.variableDeclaration(this.kind,[i.variableDeclarator(e,t)]),a._blockHoist=this.blockHoist,a},e.prototype.buildVariableDeclaration=function(e,t){var r=i.variableDeclaration("var",[i.variableDeclarator(e,t)]);return r._blockHoist=this.blockHoist,r},e.prototype.push=function(e,t){i.isObjectPattern(e)?this.pushObjectPattern(e,t):i.isArrayPattern(e)?this.pushArrayPattern(e,t):i.isAssignmentPattern(e)?this.pushAssignmentPattern(e,t):this.nodes.push(this.buildVariableAssignment(e,t))},e.prototype.toArray=function(e,t){return this.file.opts.loose||i.isIdentifier(e)&&this.arrays[e.name]?e:this.scope.toArray(e,t)},e.prototype.pushAssignmentPattern=function(e,t){var r=this.scope.generateUidIdentifierBasedOnNode(t),a=i.variableDeclaration("var",[i.variableDeclarator(r,t)]);a._blockHoist=this.blockHoist,this.nodes.push(a);var s=i.conditionalExpression(i.binaryExpression("===",r,i.identifier("undefined")),e.right,r),n=e.left;if(i.isPattern(n)){var o=i.expressionStatement(i.assignmentExpression("=",r,s));o._blockHoist=this.blockHoist,this.nodes.push(o),this.push(n,r)}else this.nodes.push(this.buildVariableAssignment(n,s))},e.prototype.pushObjectRest=function(e,t,r,a){for(var s=[],n=0;n<e.properties.length;n++){var o=e.properties[n];if(n>=a)break;if(!i.isRestProperty(o)){var l=o.key;i.isIdentifier(l)&&!o.computed&&(l=i.stringLiteral(o.key.name)),s.push(l)}}s=i.arrayExpression(s);var p=i.callExpression(this.file.addHelper("objectWithoutProperties"),[t,s]);this.nodes.push(this.buildVariableAssignment(r.argument,p))},e.prototype.pushObjectProperty=function(e,t){i.isLiteral(e.key)&&(e.computed=!0);var r=e.value,a=i.memberExpression(t,e.key,e.computed);i.isPattern(r)?this.push(r,a):this.nodes.push(this.buildVariableAssignment(r,a))},e.prototype.pushObjectPattern=function(e,t){if(e.properties.length||this.nodes.push(i.expressionStatement(i.callExpression(this.file.addHelper("objectDestructuringEmpty"),[t]))),e.properties.length>1&&!this.scope.isStatic(t)){var r=this.scope.generateUidIdentifierBasedOnNode(t);this.nodes.push(this.buildVariableDeclaration(r,t)),t=r}for(var a=0;a<e.properties.length;a++){var s=e.properties[a];i.isRestProperty(s)?this.pushObjectRest(e,t,s,a):this.pushObjectProperty(s,t)}},e.prototype.canUnpackArrayPattern=function(e,t){if(!i.isArrayExpression(t))return!1;if(!(e.elements.length>t.elements.length)){if(e.elements.length<t.elements.length&&!r(e))return!1;for(var s=e.elements,n=Array.isArray(s),o=0,s=n?s:(0,_getIterator3["default"])(s);;){var l;if(n){if(o>=s.length)break;l=s[o++]}else{if(o=s.next(),o.done)break;l=o.value}var p=l;if(!p)return!1;if(i.isMemberExpression(p))return!1}for(var d=t.elements,u=Array.isArray(d),c=0,d=u?d:(0,_getIterator3["default"])(d);;){var h;if(u){if(c>=d.length)break;h=d[c++]}else{if(c=d.next(),c.done)break;h=c.value}var f=h;if(i.isSpreadElement(f))return!1;if(i.isCallExpression(f))return!1;if(i.isMemberExpression(f))return!1}var b=i.getBindingIdentifiers(e),v={deopt:!1,bindings:b};return this.scope.traverse(t,a,v),!v.deopt}},e.prototype.pushUnpackedArrayPattern=function(e,t){for(var r=0;r<e.elements.length;r++){var a=e.elements[r];i.isRestElement(a)?this.push(a.argument,i.arrayExpression(t.elements.slice(r))):this.push(a,t.elements[r])}},e.prototype.pushArrayPattern=function(e,t){if(e.elements){if(this.canUnpackArrayPattern(e,t))return this.pushUnpackedArrayPattern(e,t);var a=!r(e)&&e.elements.length,s=this.toArray(t,a);i.isIdentifier(s)?t=s:(t=this.scope.generateUidIdentifierBasedOnNode(t),this.arrays[t.name]=!0,this.nodes.push(this.buildVariableDeclaration(t,s)));for(var n=0;n<e.elements.length;n++){var o=e.elements[n];if(o){var l=void 0;i.isRestElement(o)?(l=this.toArray(t),n>0&&(l=i.callExpression(i.memberExpression(l,i.identifier("slice")),[i.numericLiteral(n)])),o=o.argument):l=i.memberExpression(t,i.numericLiteral(n),!0),this.push(o,l)}}}},e.prototype.init=function(e,t){if(!i.isArrayExpression(t)&&!i.isMemberExpression(t)){var r=this.scope.maybeGenerateMemoised(t,!0);r&&(this.nodes.push(this.buildVariableDeclaration(r,t)),t=r)}return this.push(e,t),this.nodes},e}();return{visitor:{ExportNamedDeclaration:function(e){var r=e.get("declaration");if(r.isVariableDeclaration()&&t(r.node)){var a=[];for(var s in e.getOuterBindingIdentifiers(e)){var n=i.identifier(s);a.push(i.exportSpecifier(n,n))}e.replaceWith(r.node),e.insertAfter(i.exportNamedDeclaration(null,a))}},ForXStatement:function(e,t){var r=e.node,a=e.scope,n=r.left;if(i.isPattern(n)){var o=a.generateUidIdentifier("ref");return r.left=i.variableDeclaration("var",[i.variableDeclarator(o)]),e.ensureBlock(),void r.body.body.unshift(i.variableDeclaration("var",[i.variableDeclarator(n,o)]))}if(i.isVariableDeclaration(n)){var l=n.declarations[0].id;if(i.isPattern(l)){var p=a.generateUidIdentifier("ref");r.left=i.variableDeclaration(n.kind,[i.variableDeclarator(p,null)]);var d=[],u=new s({kind:n.kind,file:t,scope:a,nodes:d});u.init(l,p),e.ensureBlock();var c=r.body;c.body=d.concat(c.body)}}},CatchClause:function(e,t){var r=e.node,a=e.scope,n=r.param;if(i.isPattern(n)){var o=a.generateUidIdentifier("ref");r.param=o;var l=[],p=new s({kind:"let",file:t,scope:a,nodes:l});p.init(n,o),r.body.body=l.concat(r.body.body)}},AssignmentExpression:function(e,t){var r=e.node,a=e.scope;if(i.isPattern(r.left)){var n=[],o=new s({operator:r.operator,file:t,scope:a,nodes:n}),l=void 0;!e.isCompletionRecord()&&e.parentPath.isExpressionStatement()||(l=a.generateUidIdentifierBasedOnNode(r.right,"ref"),n.push(i.variableDeclaration("var",[i.variableDeclarator(l,r.right)])),i.isArrayExpression(r.right)&&(o.arrays[l.name]=!0)),o.init(r.left,l||r.right),l&&n.push(i.expressionStatement(l)),e.replaceWithMultiple(n)}},VariableDeclaration:function(e,r){var a=e.node,n=e.scope,o=e.parent;if(!i.isForXStatement(o)&&o&&e.container&&t(a)){for(var l=[],p=void 0,d=0;d<a.declarations.length;d++){p=a.declarations[d];var u=p.init,c=p.id,h=new s({blockHoist:a._blockHoist,nodes:l,scope:n,kind:a.kind,file:r});i.isPattern(c)?(h.init(c,u),+d!==a.declarations.length-1&&i.inherits(l[l.length-1],p)):l.push(i.inherits(h.buildVariableAssignment(p.id,p.init),p))}e.replaceWithMultiple(l)}}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-block-scoping/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function ignoreBlock(e){return t.isLoop(e.parent)||t.isCatchClause(e.parent)}function isBlockScoped(e){return!!t.isVariableDeclaration(e)&&(!!e[t.BLOCK_SCOPED_SYMBOL]||("let"===e.kind||"const"===e.kind))}function convertBlockScopedToVar(e,i,n,r){var a=!(arguments.length<=4||void 0===arguments[4])&&arguments[4];if(i||(i=e.node),!t.isFor(n))for(var s=0;s<i.declarations.length;s++){var o=i.declarations[s];o.init=o.init||r.buildUndefinedNode()}if(i[t.BLOCK_SCOPED_SYMBOL]=!0,i.kind="var",a){var l=r.getFunctionParent(),c=e.getBindingIdentifiers();for(var p in c){var u=r.getOwnBinding(p);u&&(u.kind="var"),r.moveBindingTo(p,l)}}}function isVar(e){return t.isVariableDeclaration(e,{kind:"var"})&&!isBlockScoped(e)}function loopNodeTo(e){return t.isBreakStatement(e)?"break":t.isContinueStatement(e)?"continue":void 0}exports.__esModule=!0;var _symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol),_create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2);exports["default"]=function(){return{visitor:{VariableDeclaration:function(e,i){var n=e.node,r=e.parent,a=e.scope;if(isBlockScoped(n)&&(convertBlockScopedToVar(e,null,r,a,!0),n._tdzThis)){for(var s=[n],o=0;o<n.declarations.length;o++){var l=n.declarations[o];if(l.init){var c=t.assignmentExpression("=",l.id,l.init);c._ignoreBlockScopingTDZ=!0,s.push(t.expressionStatement(c))}l.init=i.addHelper("temporalUndefined")}n._blockHoist=2,e.isCompletionRecord()&&s.push(t.expressionStatement(a.buildUndefinedNode())),e.replaceWithMultiple(s)}},Loop:function(e,i){var n=e.node,r=e.parent,a=e.scope;t.ensureBlock(n);var s=new BlockScoping(e,e.get("body"),r,a,i),o=s.run();o&&e.replaceWith(o)},CatchClause:function(e,t){var i=e.parent,n=e.scope,r=new BlockScoping(null,e.get("body"),i,n,t);r.run()},"BlockStatement|SwitchStatement|Program":function(e,t){if(!ignoreBlock(e)){var i=new BlockScoping(null,e,e.parent,e.scope,t);i.run()}}}}};var _babelTraverse=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_babelTraverse2=_interopRequireDefault(_babelTraverse),_tdz=__webpack_require__("./node_modules/babel-plugin-transform-es2015-block-scoping/lib/tdz.js"),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_values=__webpack_require__("./node_modules/lodash/values.js"),_values2=_interopRequireDefault(_values),_extend=__webpack_require__("./node_modules/lodash/extend.js"),_extend2=_interopRequireDefault(_extend),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),buildRetCheck=(0,_babelTemplate2["default"])('\n  if (typeof RETURN === "object") return RETURN.v;\n'),letReferenceBlockVisitor=_babelTraverse2["default"].visitors.merge([{Function:function(e,t){return e.traverse(letReferenceFunctionVisitor,t),e.skip()}},_tdz.visitor]),letReferenceFunctionVisitor=_babelTraverse2["default"].visitors.merge([{ReferencedIdentifier:function(e,t){var i=t.letReferences[e.node.name];if(i){var n=e.scope.getBindingIdentifier(e.node.name);n&&n!==i||(t.closurify=!0)}}},_tdz.visitor]),hoistVarDeclarationsVisitor={enter:function(e,i){var n=e.node,r=e.parent;if(e.isForStatement()){if(isVar(n.init,n)){var a=i.pushDeclar(n.init);1===a.length?n.init=a[0]:n.init=t.sequenceExpression(a)}}else if(e.isFor())isVar(n.left,n)&&(i.pushDeclar(n.left),n.left=n.left.declarations[0].id);else if(isVar(n,r))e.replaceWithMultiple(i.pushDeclar(n).map(function(e){return t.expressionStatement(e)}));else if(e.isFunction())return e.skip()}},loopLabelVisitor={LabeledStatement:function(e,t){var i=e.node;t.innerLabels.push(i.label.name)}},continuationVisitor={enter:function(e,t){if(e.isAssignmentExpression()||e.isUpdateExpression()){var i=e.getBindingIdentifiers();for(var n in i)t.outsideReferences[n]===e.scope.getBindingIdentifier(n)&&(t.reassignments[n]=!0)}}},loopVisitor={Loop:function(e,t){var i=t.ignoreLabeless;t.ignoreLabeless=!0,e.traverse(loopVisitor,t),t.ignoreLabeless=i,e.skip()},Function:function(e){e.skip()},SwitchCase:function(e,t){var i=t.inSwitchCase;t.inSwitchCase=!0,e.traverse(loopVisitor,t),t.inSwitchCase=i,e.skip()},"BreakStatement|ContinueStatement|ReturnStatement":function(e,i){var n=e.node,r=e.parent,a=e.scope;if(!n[this.LOOP_IGNORE]){var s=void 0,o=loopNodeTo(n);if(o){if(n.label){if(i.innerLabels.indexOf(n.label.name)>=0)return;o=o+"|"+n.label.name}else{if(i.ignoreLabeless)return;if(i.inSwitchCase)return;if(t.isBreakStatement(n)&&t.isSwitchCase(r))return}i.hasBreakContinue=!0,i.map[o]=n,s=t.stringLiteral(o)}e.isReturnStatement()&&(i.hasReturn=!0,s=t.objectExpression([t.objectProperty(t.identifier("v"),n.argument||a.buildUndefinedNode())])),s&&(s=t.returnStatement(s),s[this.LOOP_IGNORE]=!0,e.skip(),e.replaceWith(t.inherits(s,n)))}}},BlockScoping=function(){function e(i,n,r,a,s){(0,_classCallCheck3["default"])(this,e),this.parent=r,this.scope=a,this.file=s,this.blockPath=n,this.block=n.node,this.outsideLetReferences=(0,_create2["default"])(null),this.hasLetReferences=!1,this.letReferences=(0,_create2["default"])(null),this.body=[],i&&(this.loopParent=i.parent,this.loopLabel=t.isLabeledStatement(this.loopParent)&&this.loopParent.label,this.loopPath=i,this.loop=i.node)}return e.prototype.run=function(){var e=this.block;if(!e._letDone){e._letDone=!0;var i=this.getLetReferences();if(t.isFunction(this.parent)||t.isProgram(this.block))return void this.updateScopeInfo();if(this.hasLetReferences)return i?this.wrapClosure():this.remap(),this.updateScopeInfo(),this.loopLabel&&!t.isLabeledStatement(this.loopParent)?t.labeledStatement(this.loopLabel,this.loop):void 0}},e.prototype.updateScopeInfo=function(){var e=this.scope,t=e.getFunctionParent(),i=this.letReferences;for(var n in i){var r=i[n],a=e.getBinding(r.name);a&&("let"!==a.kind&&"const"!==a.kind||(a.kind="var",e.moveBindingTo(r.name,t)))}},e.prototype.remap=function(){var e=this.letReferences,t=this.scope;for(var i in e){var n=e[i];(t.parentHasBinding(i)||t.hasGlobal(i))&&(t.hasOwnBinding(i)&&t.rename(n.name),this.blockPath.scope.hasOwnBinding(i)&&this.blockPath.scope.rename(n.name))}},e.prototype.wrapClosure=function(){var e=this.block,i=this.outsideLetReferences;if(this.loop)for(var n in i){var r=i[n];(this.scope.hasGlobal(r.name)||this.scope.parentHasBinding(r.name))&&(delete i[r.name],delete this.letReferences[r.name],this.scope.rename(r.name),this.letReferences[r.name]=r,i[r.name]=r)}this.has=this.checkLoop(),this.hoistVarDeclarations();var a=(0,_values2["default"])(i),s=(0,_values2["default"])(i),o=this.blockPath.isSwitchStatement(),l=t.functionExpression(null,a,t.blockStatement(o?[e]:e.body));l.shadow=!0,this.addContinuations(l);var c=l;this.loop&&(c=this.scope.generateUidIdentifier("loop"),this.loopPath.insertBefore(t.variableDeclaration("var",[t.variableDeclarator(c,l)])));var p=t.callExpression(c,s),u=this.scope.generateUidIdentifier("ret"),h=_babelTraverse2["default"].hasType(l.body,this.scope,"YieldExpression",t.FUNCTION_TYPES);h&&(l.generator=!0,p=t.yieldExpression(p,!0));var d=_babelTraverse2["default"].hasType(l.body,this.scope,"AwaitExpression",t.FUNCTION_TYPES);d&&(l.async=!0,p=t.awaitExpression(p)),this.buildClosure(u,p),o?this.blockPath.replaceWithMultiple(this.body):e.body=this.body},e.prototype.buildClosure=function(e,i){var n=this.has;n.hasReturn||n.hasBreakContinue?this.buildHas(e,i):this.body.push(t.expressionStatement(i))},e.prototype.addContinuations=function(e){var i={reassignments:{},outsideReferences:this.outsideLetReferences};this.scope.traverse(e,continuationVisitor,i);for(var n=0;n<e.params.length;n++){var r=e.params[n];if(i.reassignments[r.name]){var a=this.scope.generateUidIdentifier(r.name);e.params[n]=a,this.scope.rename(r.name,a.name,e),e.body.body.push(t.expressionStatement(t.assignmentExpression("=",r,a)))}}},e.prototype.getLetReferences=function(){var e=this.block,i=[];if(this.loop){var n=this.loop.left||this.loop.init;isBlockScoped(n)&&(i.push(n),(0,_extend2["default"])(this.outsideLetReferences,t.getBindingIdentifiers(n)))}if(e.body)for(var r=0;r<e.body.length;r++){var a=e.body[r];if(t.isClassDeclaration(a)||t.isFunctionDeclaration(a)||isBlockScoped(a)){var s=this.blockPath.get("body")[r];isBlockScoped(a)&&convertBlockScopedToVar(s,null,e,this.scope),i=i.concat(a.declarations||a)}}if(e.cases)for(var o=0;o<e.cases.length;o++)for(var l=e.cases[o].consequent,c=0;c<l.length;c++){var p=l[c];if(t.isClassDeclaration(p)||t.isFunctionDeclaration(p)||isBlockScoped(p)){var u=this.blockPath.get("cases")[o];isBlockScoped(p)&&convertBlockScopedToVar(u,p,e,this.scope),i=i.concat(p.declarations||p)}}for(var h=0;h<i.length;h++){var d=i[h],f=t.getBindingIdentifiers(d);(0,_extend2["default"])(this.letReferences,f),this.hasLetReferences=!0}if(this.hasLetReferences){var b={letReferences:this.letReferences,closurify:!1,file:this.file};return this.blockPath.traverse(letReferenceBlockVisitor,b),b.closurify}},e.prototype.checkLoop=function(){var e={hasBreakContinue:!1,ignoreLabeless:!1,inSwitchCase:!1,innerLabels:[],hasReturn:!1,isLoop:!!this.loop,map:{},LOOP_IGNORE:(0,_symbol2["default"])()};return this.blockPath.traverse(loopLabelVisitor,e),this.blockPath.traverse(loopVisitor,e),e},e.prototype.hoistVarDeclarations=function(){this.blockPath.traverse(hoistVarDeclarationsVisitor,this)},e.prototype.pushDeclar=function(e){var i=[],n=t.getBindingIdentifiers(e);for(var r in n)i.push(t.variableDeclarator(n[r]));this.body.push(t.variableDeclaration(e.kind,i));for(var a=[],s=0;s<e.declarations.length;s++){var o=e.declarations[s];if(o.init){var l=t.assignmentExpression("=",o.id,o.init);a.push(t.inherits(l,o))}}return a},e.prototype.buildHas=function(e,i){var n=this.body;n.push(t.variableDeclaration("var",[t.variableDeclarator(e,i)]));var r=void 0,a=this.has,s=[];if(a.hasReturn&&(r=buildRetCheck({RETURN:e})),a.hasBreakContinue){for(var o in a.map)s.push(t.switchCase(t.stringLiteral(o),[a.map[o]]));if(a.hasReturn&&s.push(t.switchCase(null,[r])),1===s.length){var l=s[0];n.push(t.ifStatement(t.binaryExpression("===",e,l.test),l.consequent[0]))}else{if(this.loop)for(var c=0;c<s.length;c++){var p=s[c].consequent[0];t.isBreakStatement(p)&&!p.label&&(p.label=this.loopLabel=this.loopLabel||this.scope.generateUidIdentifier("loop"))}n.push(t.switchStatement(e,s))}}else a.hasReturn&&n.push(r)},e}();module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-block-scoping/lib/tdz.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t["default"]=e,t}function getTDZStatus(e,t){var i=t._guessExecutionStatusRelativeTo(e);return"before"===i?"inside":"after"===i?"outside":"maybe"}function buildTDZAssert(e,i){return t.callExpression(i.addHelper("temporalRef"),[e,t.stringLiteral(e.name),i.addHelper("temporalUndefined")])}function isReference(e,t,i){var r=i.letReferences[e.name];return!!r&&t.getBindingIdentifier(e.name)===r}exports.__esModule=!0,exports.visitor=void 0;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),visitor=exports.visitor={ReferencedIdentifier:function(e,i){if(this.file.opts.tdz){var r=e.node,n=e.parent,s=e.scope;if(!e.parentPath.isFor({left:r})&&isReference(r,s,i)){var a=s.getBinding(r.name).path,o=getTDZStatus(e,a);if("inside"!==o)if("maybe"===o){var p=buildTDZAssert(r,i.file);if(a.parent._tdzThis=!0,e.skip(),e.parentPath.isUpdateExpression()){if(n._ignoreBlockScopingTDZ)return;e.parentPath.replaceWith(t.sequenceExpression([p,n]))}else e.replaceWith(p)}else"outside"===o&&e.replaceWith(t.throwStatement(t.inherits(t.newExpression(t.identifier("ReferenceError"),[t.stringLiteral(r.name+" is not defined - temporal dead zone")]),r)))}}},AssignmentExpression:{exit:function(e,i){if(this.file.opts.tdz){var r=e.node;if(!r._ignoreBlockScopingTDZ){var n=[],s=e.getBindingIdentifiers();for(var a in s){var o=s[a];isReference(o,e.scope,i)&&n.push(buildTDZAssert(o,i.file))}n.length&&(r._ignoreBlockScopingTDZ=!0,n.push(r),e.replaceWithMultiple(n.map(t.expressionStatement)))}}}}};

/***/ },

/***/ "./node_modules/lodash/extend.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/lodash/assignIn.js");

/***/ },

/***/ "./node_modules/lodash/assignIn.js":
/***/ function(module, exports, __webpack_require__) {

	var copyObject=__webpack_require__("./node_modules/lodash/_copyObject.js"),createAssigner=__webpack_require__("./node_modules/lodash/_createAssigner.js"),keysIn=__webpack_require__("./node_modules/lodash/keysIn.js"),assignIn=createAssigner(function(e,r){copyObject(r,keysIn(r),e)});module.exports=assignIn;

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-typeof-symbol/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol);exports["default"]=function(e){var r=e.types,t=(0,_symbol2["default"])();return{visitor:{Scope:function(e){var r=e.scope;r.getBinding("Symbol")&&r.rename("Symbol")},UnaryExpression:function(e){var n=e.node,o=e.parent;if(!n[t]&&!e.find(function(e){return e.node&&!!e.node._generated})){if(e.parentPath.isBinaryExpression()&&r.EQUALITY_BINARY_OPERATORS.indexOf(o.operator)>=0){var i=e.getOpposite();if(i.isLiteral()&&"symbol"!==i.node.value&&"object"!==i.node.value)return}if("typeof"===n.operator){var a=r.callExpression(this.addHelper("typeof"),[n.argument]);if(e.get("argument").isIdentifier()){var s=r.stringLiteral("undefined"),u=r.unaryExpression("typeof",n.argument);u[t]=!0,e.replaceWith(r.conditionalExpression(r.binaryExpression("===",u,s),s,a))}else e.replaceWith(a)}}}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-modules-commonjs/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol);exports["default"]=function(){var e=(0,_symbol2["default"])(),r={ReferencedIdentifier:function(e){var r=e.node.name,i=this.remaps[r];i&&this.scope.getBinding(r)===e.scope.getBinding(r)&&(e.parentPath.isCallExpression({callee:e.node})?e.replaceWith(t.sequenceExpression([t.numericLiteral(0),i])):e.replaceWith(i),this.requeueInParent(e))},AssignmentExpression:function(r){var t=r.node;if(!t[e]){var i=r.get("left");if(i.isIdentifier()){var a=i.node.name,n=this.exports[a];if(n&&this.scope.getBinding(a)===r.scope.getBinding(a)){t[e]=!0;for(var o=n,l=Array.isArray(o),s=0,o=l?o:(0,_getIterator3["default"])(o);;){var u;if(l){if(s>=o.length)break;u=o[s++]}else{if(s=o.next(),s.done)break;u=s.value}var d=u;t=buildExportsAssignment(d,t).expression}r.replaceWith(t),this.requeueInParent(r)}}}},UpdateExpression:function(e){var r=e.get("argument");if(r.isIdentifier()){var i=r.node.name,a=this.exports[i];if(a&&this.scope.getBinding(i)===e.scope.getBinding(i)){var n=t.assignmentExpression(e.node.operator[0]+"=",r.node,t.numericLiteral(1));if(e.parentPath.isExpressionStatement()&&!e.isCompletionRecord()||e.node.prefix)return e.replaceWith(n),void this.requeueInParent(e);var o=[];o.push(n);var l=void 0;l="--"===e.node.operator?"+":"-",o.push(t.binaryExpression(l,r.node,t.numericLiteral(1))),e.replaceWithMultiple(t.sequenceExpression(o))}}}};return{inherits:__webpack_require__("./node_modules/babel-plugin-transform-strict-mode/lib/index.js"),visitor:{ThisExpression:function(e,r){this.ranCommonJS||r.opts.allowTopLevelThis===!0||e.findParent(function(e){return!e.is("shadow")&&THIS_BREAK_KEYS.indexOf(e.type)>=0})||e.replaceWith(t.identifier("undefined"))},Program:{exit:function(e){function i(r,i){var a=m[r];if(a)return a;var n=e.scope.generateUidIdentifier((0,_path2.basename)(r,(0,_path2.extname)(r))),o=t.variableDeclaration("var",[t.variableDeclarator(n,buildRequire(t.stringLiteral(r)).expression)]);return d[r]&&(o.loc=d[r].loc),"number"==typeof i&&i>0&&(o._blockHoist=i),c.push(o),m[r]=n}function a(e,r,t){var i=e[r]||[];e[r]=i.concat(t)}this.ranCommonJS=!0;var n=!!this.opts.strict,o=e.scope;o.rename("module"),o.rename("exports"),o.rename("require");for(var l=!1,s=!1,u=e.get("body"),d=(0,_create2["default"])(null),p=(0,_create2["default"])(null),f=(0,_create2["default"])(null),c=[],b=(0,_create2["default"])(null),m=(0,_create2["default"])(null),v=u,x=Array.isArray(v),h=0,v=x?v:(0,_getIterator3["default"])(v);;){var _;if(x){if(h>=v.length)break;_=v[h++]}else{if(h=v.next(),h.done)break;_=h.value}var g=_;if(g.isExportDeclaration()){l=!0;for(var E=[].concat(g.get("declaration"),g.get("specifiers")),y=E,k=Array.isArray(y),q=0,y=k?y:(0,_getIterator3["default"])(y);;){var A;if(k){if(q>=y.length)break;A=y[q++]}else{if(q=y.next(),q.done)break;A=q.value}var D=A,I=D.getBindingIdentifiers();if(I.__esModule)throw D.buildCodeFrameError('Illegal export "__esModule"')}}if(g.isImportDeclaration()){var W;s=!0;var M=g.node.source.value,T=d[M]||{specifiers:[],maxBlockHoist:0,loc:g.node.loc};(W=T.specifiers).push.apply(W,g.node.specifiers),"number"==typeof g.node._blockHoist&&(T.maxBlockHoist=Math.max(g.node._blockHoist,T.maxBlockHoist)),d[M]=T,g.remove()}else if(g.isExportDefaultDeclaration()){var H=g.get("declaration");if(H.isFunctionDeclaration()){var R=H.node.id,B=t.identifier("default");R?(a(p,R.name,B),c.push(buildExportsAssignment(B,R)),g.replaceWith(H.node)):(c.push(buildExportsAssignment(B,t.toExpression(H.node))),g.remove())}else if(H.isClassDeclaration()){var S=H.node.id,P=t.identifier("default");S?(a(p,S.name,P),g.replaceWithMultiple([H.node,buildExportsAssignment(P,S)])):(g.replaceWith(buildExportsAssignment(P,t.toExpression(H.node))),g.parentPath.requeue(g.get("expression.left")))}else g.replaceWith(buildExportsAssignment(t.identifier("default"),H.node)),g.parentPath.requeue(g.get("expression.left"))}else if(g.isExportNamedDeclaration()){var C=g.get("declaration");if(C.node){if(C.isFunctionDeclaration()){var j=C.node.id;a(p,j.name,j),c.push(buildExportsAssignment(j,j)),g.replaceWith(C.node)}else if(C.isClassDeclaration()){var L=C.node.id;a(p,L.name,L),g.replaceWithMultiple([C.node,buildExportsAssignment(L,L)]),f[L.name]=!0}else if(C.isVariableDeclaration()){for(var O=C.get("declarations"),F=O,J=Array.isArray(F),$=0,F=J?F:(0,_getIterator3["default"])(F);;){var w;if(J){if($>=F.length)break;w=F[$++]}else{if($=F.next(),$.done)break;w=$.value}var K=w,N=K.get("id"),U=K.get("init");U.node||U.replaceWith(t.identifier("undefined")),N.isIdentifier()&&(a(p,N.node.name,N.node),U.replaceWith(buildExportsAssignment(N.node,U.node).expression),f[N.node.name]=!0)}g.replaceWith(C.node)}continue}var Y=g.get("specifiers"),V=[],z=g.node.source;if(z)for(var G=i(z.value,g.node._blockHoist),Q=Y,X=Array.isArray(Q),Z=0,Q=X?Q:(0,_getIterator3["default"])(Q);;){var ee;if(X){if(Z>=Q.length)break;ee=Q[Z++]}else{if(Z=Q.next(),Z.done)break;ee=Z.value}var re=ee;re.isExportNamespaceSpecifier()||re.isExportDefaultSpecifier()||re.isExportSpecifier()&&("default"===re.node.local.name?c.push(buildExportsFrom(t.stringLiteral(re.node.exported.name),t.memberExpression(t.callExpression(this.addHelper("interopRequireDefault"),[G]),re.node.local))):c.push(buildExportsFrom(t.stringLiteral(re.node.exported.name),t.memberExpression(G,re.node.local))),f[re.node.exported.name]=!0)}else for(var te=Y,ie=Array.isArray(te),ae=0,te=ie?te:(0,_getIterator3["default"])(te);;){var ne;if(ie){if(ae>=te.length)break;ne=te[ae++]}else{if(ae=te.next(),ae.done)break;ne=ae.value}var oe=ne;oe.isExportSpecifier()&&(a(p,oe.node.local.name,oe.node.exported),f[oe.node.exported.name]=!0,V.push(buildExportsAssignment(oe.node.exported,oe.node.local)))}g.replaceWithMultiple(V)}else if(g.isExportAllDeclaration()){var le=buildExportAll({OBJECT:i(g.node.source.value,g.node._blockHoist)});le.loc=g.node.loc,c.push(le),g.remove()}}for(var se in d){var ue=d[se],E=ue.specifiers,de=ue.maxBlockHoist;if(E.length){for(var pe=i(se,de),fe=void 0,ce=0;ce<E.length;ce++){var be=E[ce];if(t.isImportNamespaceSpecifier(be)){if(n)b[be.local.name]=pe;else{var me=t.variableDeclaration("var",[t.variableDeclarator(be.local,t.callExpression(this.addHelper("interopRequireWildcard"),[pe]))]);de>0&&(me._blockHoist=de),c.push(me)}fe=be.local}else t.isImportDefaultSpecifier(be)&&(E[ce]=t.importSpecifier(be.local,t.identifier("default")))}for(var ve=E,xe=Array.isArray(ve),he=0,ve=xe?ve:(0,_getIterator3["default"])(ve);;){var _e;if(xe){if(he>=ve.length)break;_e=ve[he++]}else{if(he=ve.next(),he.done)break;_e=he.value}var ge=_e;if(t.isImportSpecifier(ge)){var Ee=pe;if("default"===ge.imported.name)if(fe)Ee=fe;else{Ee=fe=e.scope.generateUidIdentifier(pe.name);var ye=t.variableDeclaration("var",[t.variableDeclarator(Ee,t.callExpression(this.addHelper("interopRequireDefault"),[pe]))]);de>0&&(ye._blockHoist=de),c.push(ye)}b[ge.local.name]=t.memberExpression(Ee,t.cloneWithoutLoc(ge.imported))}}}else{var ke=buildRequire(t.stringLiteral(se));ke.loc=d[se].loc,c.push(ke)}}if(s&&(0,_keys2["default"])(f).length){var qe=t.identifier("undefined");for(var Ae in f)qe=buildExportsAssignment(t.identifier(Ae),qe).expression;var De=t.expressionStatement(qe);De._blockHoist=3,c.unshift(De)}if(l&&!n){var Ie=buildExportsModuleDeclaration;this.opts.loose&&(Ie=buildLooseExportsModuleDeclaration);var We=Ie();We._blockHoist=3,c.unshift(We)}e.unshiftContainer("body",c),e.traverse(r,{remaps:b,scope:o,exports:p,requeueInParent:function(r){return e.requeue(r)}})}}}}};var _path2=__webpack_require__("./node_modules/path-browserify/index.js"),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),buildRequire=(0,_babelTemplate2["default"])("\n  require($0);\n"),buildExportsModuleDeclaration=(0,_babelTemplate2["default"])('\n  Object.defineProperty(exports, "__esModule", {\n    value: true\n  });\n'),buildExportsFrom=(0,_babelTemplate2["default"])("\n  Object.defineProperty(exports, $0, {\n    enumerable: true,\n    get: function () {\n      return $1;\n    }\n  });\n"),buildLooseExportsModuleDeclaration=(0,_babelTemplate2["default"])("\n  exports.__esModule = true;\n"),buildExportsAssignment=(0,_babelTemplate2["default"])("\n  exports.$0 = $1;\n"),buildExportAll=(0,_babelTemplate2["default"])('\n  Object.keys(OBJECT).forEach(function (key) {\n    if (key === "default" || key === "__esModule") return;\n    Object.defineProperty(exports, key, {\n      enumerable: true,\n      get: function () {\n        return OBJECT[key];\n      }\n    });\n  });\n'),THIS_BREAK_KEYS=["FunctionExpression","FunctionDeclaration","ClassProperty","ClassMethod","ObjectMethod"];module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-strict-mode/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(){return{visitor:{Program:function(e,r){if(r.opts.strict!==!1&&r.opts.strictMode!==!1){for(var i=e.node,a=i.directives,o=Array.isArray(a),u=0,a=o?a:(0,_getIterator3["default"])(a);;){var n;if(o){if(u>=a.length)break;n=a[u++]}else{if(u=a.next(),u.done)break;n=u.value}var s=n;if("use strict"===s.value.value)return}e.unshiftContainer("directives",t.directive(t.directiveLiteral("use strict")))}}}}};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-modules-systemjs/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol);exports["default"]=function(e){var r=e.types,t=(0,_symbol2["default"])(),i={"AssignmentExpression|UpdateExpression":function(e){if(!e.node[t]){e.node[t]=!0;var i=e.get(e.isAssignmentExpression()?"left":"argument");if(i.isIdentifier()){var a=i.node.name;if(this.scope.getBinding(a)===e.scope.getBinding(a)){var n=this.exports[a];if(n){var o=e.node,s=e.isUpdateExpression()&&!o.prefix;s&&("++"===o.operator?o=r.binaryExpression("+",o.argument,r.numericLiteral(1)):"--"===o.operator?o=r.binaryExpression("-",o.argument,r.numericLiteral(1)):s=!1);for(var l=n,p=Array.isArray(l),u=0,l=p?l:(0,_getIterator3["default"])(l);;){var f;if(p){if(u>=l.length)break;f=l[u++]}else{if(u=l.next(),u.done)break;f=u.value}var d=f;o=this.buildCall(d,o).expression}s&&(o=r.sequenceExpression([o,e.node])),e.replaceWith(o)}}}}}};return{visitor:{ReferencedIdentifier:function(e,t){"__moduleName"!=e.node.name||e.scope.hasBinding("__moduleName")||e.replaceWith(r.memberExpression(t.contextIdent,r.identifier("id")))},Program:{enter:function(e,r){r.contextIdent=e.scope.generateUidIdentifier("context")},exit:function(e,t){function a(e,r){p[e]=p[e]||[],p[e].push(r)}function n(e,r,t){var i=u[e]=u[e]||{imports:[],exports:[]};i[r]=i[r].concat(t)}function o(e,t){return r.expressionStatement(r.callExpression(s,[r.stringLiteral(e),t]))}for(var s=e.scope.generateUidIdentifier("export"),l=t.contextIdent,p=(0,_create2["default"])(null),u=(0,_create2["default"])(null),f=[],d=[],c=[],b=[],m=[],E=e.get("body"),v=!0,x=E,_=Array.isArray(x),g=0,x=_?x:(0,_getIterator3["default"])(x);;){var h;if(_){if(g>=x.length)break;h=x[g++]}else{if(g=x.next(),g.done)break;h=g.value}var I=h;if(I.isExportDeclaration()&&(I=I.get("declaration")),I.isVariableDeclaration()&&"var"!==I.node.kind){v=!1;break}}for(var D=E,T=Array.isArray(D),y=0,D=T?D:(0,_getIterator3["default"])(D);;){var R;if(T){if(y>=D.length)break;R=D[y++]}else{if(y=D.next(),y.done)break;R=y.value}var A=R;if(v&&A.isFunctionDeclaration())f.push(A.node),m.push(A);else if(A.isImportDeclaration()){var S=A.node.source.value;n(S,"imports",A.node.specifiers);for(var O in A.getBindingIdentifiers())A.scope.removeBinding(O),b.push(r.identifier(O));A.remove()}else if(A.isExportAllDeclaration())n(A.node.source.value,"exports",A.node),A.remove();else if(A.isExportDefaultDeclaration()){var k=A.get("declaration");if(k.isClassDeclaration()||k.isFunctionDeclaration()){var B=k.node.id,N=[];B?(N.push(k.node),N.push(o("default",B)),a(B.name,"default")):N.push(o("default",r.toExpression(k.node))),!v||k.isClassDeclaration()?A.replaceWithMultiple(N):(f=f.concat(N),m.push(A))}else A.replaceWith(o("default",k.node))}else if(A.isExportNamedDeclaration()){var q=A.get("declaration");if(q.node){A.replaceWith(q);var M=[],Y=void 0;if(A.isFunction()){var U=q.node,F=U.id.name;if(v)a(F,F),f.push(U),f.push(o(F,U.id)),m.push(A);else{var C;C={},C[F]=U.id,Y=C}}else Y=q.getBindingIdentifiers();for(var H in Y)a(H,H),M.push(o(H,r.identifier(H)));A.insertAfter(M)}else{var L=A.node.specifiers;if(L&&L.length)if(A.node.source)n(A.node.source.value,"exports",L),A.remove();else{for(var j=[],G=L,K=Array.isArray(G),W=0,G=K?G:(0,_getIterator3["default"])(G);;){var X;if(K){if(W>=G.length)break;X=G[W++]}else{if(W=G.next(),W.done)break;X=W.value}var P=X;j.push(o(P.exported.name,P.local)),a(P.local.name,P.exported.name)}A.replaceWithMultiple(j)}}}}for(var V in u){for(var J=u[V],w=[],z=e.scope.generateUidIdentifier(V),Q=J.imports,Z=Array.isArray(Q),$=0,Q=Z?Q:(0,_getIterator3["default"])(Q);;){var ee;if(Z){if($>=Q.length)break;ee=Q[$++]}else{if($=Q.next(),$.done)break;ee=$.value}var re=ee;r.isImportNamespaceSpecifier(re)?w.push(r.expressionStatement(r.assignmentExpression("=",re.local,z))):r.isImportDefaultSpecifier(re)&&(re=r.importSpecifier(re.local,r.identifier("default"))),r.isImportSpecifier(re)&&w.push(r.expressionStatement(r.assignmentExpression("=",re.local,r.memberExpression(z,re.imported))))}if(J.exports.length){var te=e.scope.generateUidIdentifier("exportObj");w.push(r.variableDeclaration("var",[r.variableDeclarator(te,r.objectExpression([]))]));for(var ie=J.exports,ae=Array.isArray(ie),ne=0,ie=ae?ie:(0,_getIterator3["default"])(ie);;){var oe;if(ae){if(ne>=ie.length)break;oe=ie[ne++]}else{if(ne=ie.next(),ne.done)break;oe=ne.value}var se=oe;r.isExportAllDeclaration(se)?w.push(buildExportAll({KEY:e.scope.generateUidIdentifier("key"),EXPORT_OBJ:te,TARGET:z})):r.isExportSpecifier(se)&&w.push(r.expressionStatement(r.assignmentExpression("=",r.memberExpression(te,se.exported),r.memberExpression(z,se.local))))}w.push(r.expressionStatement(r.callExpression(s,[te])))}c.push(r.stringLiteral(V)),d.push(r.functionExpression(null,[z],r.blockStatement(w)))}var le=this.getModuleName();le&&(le=r.stringLiteral(le)),v&&(0,_babelHelperHoistVariables2["default"])(e,function(e){return b.push(e)}),b.length&&f.unshift(r.variableDeclaration("var",b.map(function(e){return r.variableDeclarator(e)}))),e.traverse(i,{exports:p,buildCall:o,scope:e.scope});for(var pe=m,ue=Array.isArray(pe),fe=0,pe=ue?pe:(0,_getIterator3["default"])(pe);;){var de;if(ue){if(fe>=pe.length)break;de=pe[fe++]}else{if(fe=pe.next(),fe.done)break;de=fe.value}var ce=de;ce.remove()}e.node.body=[buildTemplate({SYSTEM_REGISTER:r.memberExpression(r.identifier(t.opts.systemGlobal||"System"),r.identifier("register")),BEFORE_BODY:f,MODULE_NAME:le,SETTERS:d,SOURCES:c,BODY:e.node.body,EXPORT_IDENTIFIER:s,CONTEXT_IDENTIFIER:l})]}}}}};var _babelHelperHoistVariables=__webpack_require__("./node_modules/babel-helper-hoist-variables/lib/index.js"),_babelHelperHoistVariables2=_interopRequireDefault(_babelHelperHoistVariables),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),buildTemplate=(0,_babelTemplate2["default"])('\n  SYSTEM_REGISTER(MODULE_NAME, [SOURCES], function (EXPORT_IDENTIFIER, CONTEXT_IDENTIFIER) {\n    "use strict";\n    BEFORE_BODY;\n    return {\n      setters: [SETTERS],\n      execute: function () {\n        BODY;\n      }\n    };\n  });\n'),buildExportAll=(0,_babelTemplate2["default"])('\n  for (var KEY in TARGET) {\n    if (KEY !== "default" && KEY !== "__esModule") EXPORT_OBJ[KEY] = TARGET[KEY];\n  }\n');module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-modules-amd/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create);exports["default"]=function(e){function t(e){if(!e.isCallExpression())return!1;if(!e.get("callee").isIdentifier({name:"require"}))return!1;if(e.scope.getBinding("require"))return!1;var t=e.get("arguments");if(1!==t.length)return!1;var r=t[0];return!!r.isStringLiteral()}var r=e.types,i={ReferencedIdentifier:function(e){var t=e.node,r=e.scope;"exports"!==t.name||r.getBinding("exports")||(this.hasExports=!0),"module"!==t.name||r.getBinding("module")||(this.hasModule=!0)},CallExpression:function(e){t(e)&&(this.bareSources.push(e.node.arguments[0]),e.remove())},VariableDeclarator:function(e){var r=e.get("id");if(r.isIdentifier()){var i=e.get("init");if(t(i)){var s=i.node.arguments[0];this.sourceNames[s.value]=!0,this.sources.push([r.node,s]),e.remove()}}}};return{inherits:__webpack_require__("./node_modules/babel-plugin-transform-es2015-modules-commonjs/lib/index.js"),pre:function(){this.sources=[],this.sourceNames=(0,_create2["default"])(null),this.bareSources=[],this.hasExports=!1,this.hasModule=!1},visitor:{Program:{exit:function(e){var t=this;if(!this.ran){this.ran=!0,e.traverse(i,this);var s=this.sources.map(function(e){return e[0]}),n=this.sources.map(function(e){return e[1]});n=n.concat(this.bareSources.filter(function(e){return!t.sourceNames[e.value]}));var a=this.getModuleName();a&&(a=r.stringLiteral(a)),this.hasExports&&(n.unshift(r.stringLiteral("exports")),s.unshift(r.identifier("exports"))),this.hasModule&&(n.unshift(r.stringLiteral("module")),s.unshift(r.identifier("module")));var u=e.node,o=buildFactory({PARAMS:s,BODY:u.body});o.expression.body.directives=u.directives,u.directives=[],u.body=[buildDefine({MODULE_NAME:a,SOURCES:n,FACTORY:o})]}}}}}};var _babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),buildDefine=(0,_babelTemplate2["default"])("\n  define(MODULE_NAME, [SOURCES], FACTORY);\n"),buildFactory=(0,_babelTemplate2["default"])("\n  (function (PARAMS) {\n    BODY;\n  })\n");module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-es2015-modules-umd/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports["default"]=function(e){function i(e){if(e.isExpressionStatement()){var i=e.get("expression");if(!i.isCallExpression())return!1;if(!i.get("callee").isIdentifier({name:"define"}))return!1;var r=i.get("arguments");return!(3===r.length&&!r.shift().isStringLiteral())&&(2===r.length&&(!!r.shift().isArrayExpression()&&!!r.shift().isFunctionExpression()))}}var r=e.types;return{inherits:__webpack_require__("./node_modules/babel-plugin-transform-es2015-modules-amd/lib/index.js"),visitor:{Program:{exit:function(e,t){var n=e.get("body").pop();if(i(n)){var a=n.node.expression,l=a.arguments,s=3===l.length?l.shift():null,o=a.arguments[0],u=a.arguments[1],f=t.opts.globals||{},p=o.elements.map(function(e){return"module"===e.value||"exports"===e.value?r.identifier(e.value):r.callExpression(r.identifier("require"),[e])}),d=o.elements.map(function(e){if("module"===e.value)return r.identifier("mod");if("exports"===e.value)return r.memberExpression(r.identifier("mod"),r.identifier("exports"));var i=void 0;if(t.opts.exactGlobals){var n=f[e.value];i=n?n.split(".").reduce(function(e,i){return r.memberExpression(e,r.identifier(i))},r.identifier("global")):r.memberExpression(r.identifier("global"),r.identifier(r.toIdentifier(e.value)))}else{var a=(0,_path.basename)(e.value,(0,_path.extname)(e.value)),l=f[a]||a;i=r.memberExpression(r.identifier("global"),r.identifier(r.toIdentifier(l)))}return i}),m=s?s.value:this.file.opts.basename,E=r.memberExpression(r.identifier("global"),r.identifier(r.toIdentifier(m))),b=null;if(t.opts.exactGlobals){var _=f[m];if(_){b=[];var x=_.split(".");E=x.slice(1).reduce(function(e,i){return b.push(buildPrerequisiteAssignment({GLOBAL_REFERENCE:e})),r.memberExpression(e,r.identifier(i))},r.memberExpression(r.identifier("global"),r.identifier(x[0])))}}var v=buildGlobalExport({BROWSER_ARGUMENTS:d,PREREQUISITE_ASSIGNMENTS:b,GLOBAL_TO_ASSIGN:E});n.replaceWith(buildWrapper({MODULE_NAME:s,AMD_ARGUMENTS:o,COMMON_ARGUMENTS:p,GLOBAL_EXPORT:v,FUNC:u}))}}}}}};var _path=__webpack_require__("./node_modules/path-browserify/index.js"),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),buildPrerequisiteAssignment=(0,_babelTemplate2["default"])("\n  GLOBAL_REFERENCE = GLOBAL_REFERENCE || {}\n"),buildGlobalExport=(0,_babelTemplate2["default"])("\n  var mod = { exports: {} };\n  factory(BROWSER_ARGUMENTS);\n  PREREQUISITE_ASSIGNMENTS\n  GLOBAL_TO_ASSIGN = mod.exports;\n"),buildWrapper=(0,_babelTemplate2["default"])('\n  (function (global, factory) {\n    if (typeof define === "function" && define.amd) {\n      define(MODULE_NAME, AMD_ARGUMENTS, factory);\n    } else if (typeof exports !== "undefined") {\n      factory(COMMON_ARGUMENTS);\n    } else {\n      GLOBAL_EXPORT\n    }\n  })(this, FUNC);\n');module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-regenerator/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return __webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/visit.js")},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-regenerator/lib/visit.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getOuterFnExpr(e){var r=e.node;if(t.assertFunction(r),r.id||(r.id=e.scope.parent.generateUidIdentifier("callee")),r.generator&&t.isFunctionDeclaration(r)){var i=e.findParent(function(e){return e.isProgram()||e.isBlockStatement()});if(!i)return r.id;var n=getRuntimeMarkDecl(i),a=n.declarations[0].id,s=n.declarations[0].init.callee.object;t.assertArrayExpression(s);var o=s.elements.length;return s.elements.push(r.id),t.memberExpression(a,t.numericLiteral(o),!0)}return r.id}function getRuntimeMarkDecl(e){var r=e.node;_assert2["default"].ok(Array.isArray(r.body));var i=getMarkInfo(r);return i.decl?i.decl:(i.decl=t.variableDeclaration("var",[t.variableDeclarator(e.scope.generateUidIdentifier("marked"),t.callExpression(t.memberExpression(t.arrayExpression([]),t.identifier("map"),!1),[util.runtimeProperty("mark")]))]),e.unshiftContainer("body",i.decl),i.decl)}function renameArguments(e,r){var t={didRenameArguments:!1,argsId:r};return e.traverse(argumentsVisitor,t),t.didRenameArguments}var _assert=__webpack_require__("./node_modules/assert/assert.js"),_assert2=_interopRequireDefault(_assert),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_hoist=__webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/hoist.js"),_emit=__webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/emit.js"),_util=__webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/util.js"),util=_interopRequireWildcard(_util),getMarkInfo=__webpack_require__("./node_modules/private/private.js").makeAccessor();exports.visitor={Function:{exit:function(e,r){var i=e.node;if(i.generator){if(i.async){if(r.opts.asyncGenerators===!1)return}else if(r.opts.generators===!1)return}else{if(!i.async)return;if(r.opts.async===!1)return}var n=e.scope.generateUidIdentifier("context"),a=e.scope.generateUidIdentifier("args");e.ensureBlock();var s=e.get("body");i.async&&s.traverse(awaitVisitor),s.traverse(functionSentVisitor,{context:n});var o=[],u=[];s.get("body").forEach(function(e){var r=e.node;r&&null!=r._blockHoist?o.push(r):u.push(r)}),o.length>0&&(s.node.body=u);var c=getOuterFnExpr(e);t.assertIdentifier(i.id);var l=t.identifier(i.id.name+"$"),d=(0,_hoist.hoist)(e),p=renameArguments(e,a);p&&(d=d||t.variableDeclaration("var",[]),d.declarations.push(t.variableDeclarator(a,t.identifier("arguments"))));var f=new _emit.Emitter(n);f.explode(e.get("body")),d&&d.declarations.length>0&&o.push(d);var m=[f.getContextFunction(l),i.generator?c:t.nullLiteral(),t.thisExpression()],g=f.getTryLocsList();g&&m.push(g);var v=t.callExpression(util.runtimeProperty(i.async?"async":"wrap"),m);o.push(t.returnStatement(v)),i.body=t.blockStatement(o);var y=i.generator;y&&(i.generator=!1),i.async&&(i.async=!1),y&&t.isExpression(i)&&e.replaceWith(t.callExpression(util.runtimeProperty("mark"),[i])),e.requeue()}}};var argumentsVisitor={"FunctionExpression|FunctionDeclaration":function(e){e.skip()},Identifier:function(e,r){"arguments"===e.node.name&&util.isReference(e)&&(e.replaceWith(r.argsId),r.didRenameArguments=!0)}},functionSentVisitor={MetaProperty:function(e){var r=e.node;"function"===r.meta.name&&"sent"===r.property.name&&e.replaceWith(t.memberExpression(this.context,t.identifier("_sent")))}},awaitVisitor={Function:function(e){e.skip()},AwaitExpression:function(e){var r=e.node.argument;e.replaceWith(t.yieldExpression(t.callExpression(util.runtimeProperty("awrap"),[r]),!1))}};

/***/ },

/***/ "./node_modules/assert/assert.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function compare(e,t){if(e===t)return 0;for(var r=e.length,n=t.length,i=0,a=Math.min(r,n);i<a;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0}function isBuffer(e){return global.Buffer&&"function"==typeof global.Buffer.isBuffer?global.Buffer.isBuffer(e):!(null==e||!e._isBuffer)}function pToString(e){return Object.prototype.toString.call(e)}function isView(e){return!isBuffer(e)&&("function"==typeof global.ArrayBuffer&&("function"==typeof ArrayBuffer.isView?ArrayBuffer.isView(e):!!e&&(e instanceof DataView||!!(e.buffer&&e.buffer instanceof ArrayBuffer))))}function getName(e){if(util.isFunction(e)){if(functionsHaveNames)return e.name;var t=e.toString(),r=t.match(regex);return r&&r[1]}}function truncate(e,t){return"string"==typeof e?e.length<t?e:e.slice(0,t):e}function inspect(e){if(functionsHaveNames||!util.isFunction(e))return util.inspect(e);var t=getName(e),r=t?": "+t:"";return"[Function"+r+"]"}function getMessage(e){return truncate(inspect(e.actual),128)+" "+e.operator+" "+truncate(inspect(e.expected),128)}function fail(e,t,r,n,i){throw new assert.AssertionError({message:r,actual:e,expected:t,operator:n,stackStartFunction:i})}function ok(e,t){e||fail(e,!0,t,"==",assert.ok)}function _deepEqual(e,t,r,n){if(e===t)return!0;if(isBuffer(e)&&isBuffer(t))return 0===compare(e,t);if(util.isDate(e)&&util.isDate(t))return e.getTime()===t.getTime();if(util.isRegExp(e)&&util.isRegExp(t))return e.source===t.source&&e.global===t.global&&e.multiline===t.multiline&&e.lastIndex===t.lastIndex&&e.ignoreCase===t.ignoreCase;if(null!==e&&"object"==typeof e||null!==t&&"object"==typeof t){if(isView(e)&&isView(t)&&pToString(e)===pToString(t)&&!(e instanceof Float32Array||e instanceof Float64Array))return 0===compare(new Uint8Array(e.buffer),new Uint8Array(t.buffer));if(isBuffer(e)!==isBuffer(t))return!1;n=n||{actual:[],expected:[]};var i=n.actual.indexOf(e);return i!==-1&&i===n.expected.indexOf(t)||(n.actual.push(e),n.expected.push(t),objEquiv(e,t,r,n))}return r?e===t:e==t}function isArguments(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function objEquiv(e,t,r,n){if(null===e||void 0===e||null===t||void 0===t)return!1;if(util.isPrimitive(e)||util.isPrimitive(t))return e===t;if(r&&Object.getPrototypeOf(e)!==Object.getPrototypeOf(t))return!1;var i=isArguments(e),a=isArguments(t);if(i&&!a||!i&&a)return!1;if(i)return e=pSlice.call(e),t=pSlice.call(t),_deepEqual(e,t,r);var s,u,o=objectKeys(e),f=objectKeys(t);if(o.length!==f.length)return!1;for(o.sort(),f.sort(),u=o.length-1;u>=0;u--)if(o[u]!==f[u])return!1;for(u=o.length-1;u>=0;u--)if(s=o[u],!_deepEqual(e[s],t[s],r,n))return!1;return!0}function notDeepStrictEqual(e,t,r){_deepEqual(e,t,!0)&&fail(e,t,r,"notDeepStrictEqual",notDeepStrictEqual)}function expectedException(e,t){if(!e||!t)return!1;if("[object RegExp]"==Object.prototype.toString.call(t))return t.test(e);try{if(e instanceof t)return!0}catch(r){}return!Error.isPrototypeOf(t)&&t.call({},e)===!0}function _tryBlock(e){var t;try{e()}catch(r){t=r}return t}function _throws(e,t,r,n){var i;if("function"!=typeof t)throw new TypeError('"block" argument must be a function');"string"==typeof r&&(n=r,r=null),i=_tryBlock(t),n=(r&&r.name?" ("+r.name+").":".")+(n?" "+n:"."),e&&!i&&fail(i,r,"Missing expected exception"+n);var a="string"==typeof n,s=!e&&util.isError(i),u=!e&&i&&!r;if((s&&a&&expectedException(i,r)||u)&&fail(i,r,"Got unwanted exception"+n),e&&i&&r&&!expectedException(i,r)||!e&&i)throw i}var util=__webpack_require__("./node_modules/util/util.js"),hasOwn=Object.prototype.hasOwnProperty,pSlice=Array.prototype.slice,functionsHaveNames=function(){return"foo"===function(){}.name}(),assert=module.exports=ok,regex=/\s*function\s+([^\(\s]*)\s*/;assert.AssertionError=function(e){this.name="AssertionError",this.actual=e.actual,this.expected=e.expected,this.operator=e.operator,e.message?(this.message=e.message,this.generatedMessage=!1):(this.message=getMessage(this),this.generatedMessage=!0);var t=e.stackStartFunction||fail;if(Error.captureStackTrace)Error.captureStackTrace(this,t);else{var r=new Error;if(r.stack){var n=r.stack,i=getName(t),a=n.indexOf("\n"+i);if(a>=0){var s=n.indexOf("\n",a+1);n=n.substring(s+1)}this.stack=n}}},util.inherits(assert.AssertionError,Error),assert.fail=fail,assert.ok=ok,assert.equal=function(e,t,r){e!=t&&fail(e,t,r,"==",assert.equal)},assert.notEqual=function(e,t,r){e==t&&fail(e,t,r,"!=",assert.notEqual)},assert.deepEqual=function(e,t,r){_deepEqual(e,t,!1)||fail(e,t,r,"deepEqual",assert.deepEqual)},assert.deepStrictEqual=function(e,t,r){_deepEqual(e,t,!0)||fail(e,t,r,"deepStrictEqual",assert.deepStrictEqual)},assert.notDeepEqual=function(e,t,r){_deepEqual(e,t,!1)&&fail(e,t,r,"notDeepEqual",assert.notDeepEqual)},assert.notDeepStrictEqual=notDeepStrictEqual,assert.strictEqual=function(e,t,r){e!==t&&fail(e,t,r,"===",assert.strictEqual)},assert.notStrictEqual=function(e,t,r){e===t&&fail(e,t,r,"!==",assert.notStrictEqual)},assert["throws"]=function(e,t,r){_throws(!0,e,t,r)},assert.doesNotThrow=function(e,t,r){_throws(!1,e,t,r)},assert.ifError=function(e){if(e)throw e};var objectKeys=Object.keys||function(e){var t=[];for(var r in e)hasOwn.call(e,r)&&t.push(r);return t};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-plugin-transform-regenerator/lib/hoist.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),hasOwn=Object.prototype.hasOwnProperty;exports.hoist=function(e){function n(e,n){t.assertVariableDeclaration(e);var i=[];return e.declarations.forEach(function(e){r[e.id.name]=t.identifier(e.id.name),e.init?i.push(t.assignmentExpression("=",e.id,e.init)):n&&i.push(e.id)}),0===i.length?null:1===i.length?i[0]:t.sequenceExpression(i)}t.assertFunction(e.node);var r={};e.get("body").traverse({VariableDeclaration:{exit:function(e){var r=n(e.node,!1);null===r?e.remove():e.replaceWith(t.expressionStatement(r)),e.skip()}},ForStatement:function(e){var r=e.node.init;t.isVariableDeclaration(r)&&e.get("init").replaceWith(n(r,!1))},ForXStatement:function(e){var t=e.get("left");t.isVariableDeclaration()&&t.replaceWith(n(t.node,!0))},FunctionDeclaration:function(e){var n=e.node;r[n.id.name]=n.id;var i=t.expressionStatement(t.assignmentExpression("=",n.id,t.functionExpression(n.id,n.params,n.body,n.generator,n.expression)));e.parentPath.isBlockStatement()?(e.parentPath.unshiftContainer("body",i),e.remove()):e.replaceWith(i),e.skip()},FunctionExpression:function(e){e.skip()}});var i={};e.get("params").forEach(function(e){var n=e.node;t.isIdentifier(n)&&(i[n.name]=n)});var a=[];return(0,_keys2["default"])(r).forEach(function(e){hasOwn.call(i,e)||a.push(t.variableDeclarator(r[e],null))}),0===a.length?null:t.variableDeclaration("var",a)};

/***/ },

/***/ "./node_modules/babel-plugin-transform-regenerator/lib/emit.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function Emitter(e){_assert2["default"].ok(this instanceof Emitter),t.assertIdentifier(e),this.nextTempId=0,this.contextId=e,this.listing=[],this.marked=[!0],this.finalLoc=loc(),this.tryEntries=[],this.leapManager=new leap.LeapManager(this)}function loc(){return t.numericLiteral(-1)}function getDeclError(e){return new Error("all declarations should have been transformed into assignments before the Exploder began its work: "+(0,_stringify2["default"])(e))}function isValidCompletion(e){var r=e.type;return"normal"===r?!hasOwn.call(e,"target"):"break"===r||"continue"===r?!hasOwn.call(e,"value")&&t.isLiteral(e.target):("return"===r||"throw"===r)&&(hasOwn.call(e,"value")&&!hasOwn.call(e,"target"))}var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_assert=__webpack_require__("./node_modules/assert/assert.js"),_assert2=_interopRequireDefault(_assert),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_leap=__webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/leap.js"),leap=_interopRequireWildcard(_leap),_meta=__webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/meta.js"),meta=_interopRequireWildcard(_meta),_util=__webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/util.js"),util=_interopRequireWildcard(_util),hasOwn=Object.prototype.hasOwnProperty,Ep=Emitter.prototype;exports.Emitter=Emitter,Ep.mark=function(e){t.assertLiteral(e);var r=this.listing.length;return e.value===-1?e.value=r:_assert2["default"].strictEqual(e.value,r),this.marked[r]=!0,e},Ep.emit=function(e){t.isExpression(e)&&(e=t.expressionStatement(e)),t.assertStatement(e),this.listing.push(e)},Ep.emitAssign=function(e,t){return this.emit(this.assign(e,t)),e},Ep.assign=function(e,r){return t.expressionStatement(t.assignmentExpression("=",e,r))},Ep.contextProperty=function(e,r){return t.memberExpression(this.contextId,r?t.stringLiteral(e):t.identifier(e),!!r)},Ep.stop=function(e){e&&this.setReturnValue(e),this.jump(this.finalLoc)},Ep.setReturnValue=function(e){t.assertExpression(e.value),this.emitAssign(this.contextProperty("rval"),this.explodeExpression(e))},Ep.clearPendingException=function(e,r){t.assertLiteral(e);var n=t.callExpression(this.contextProperty("catch",!0),[e]);r?this.emitAssign(r,n):this.emit(n)},Ep.jump=function(e){this.emitAssign(this.contextProperty("next"),e),this.emit(t.breakStatement())},Ep.jumpIf=function(e,r){t.assertExpression(e),t.assertLiteral(r),this.emit(t.ifStatement(e,t.blockStatement([this.assign(this.contextProperty("next"),r),t.breakStatement()])))},Ep.jumpIfNot=function(e,r){t.assertExpression(e),t.assertLiteral(r);var n=void 0;n=t.isUnaryExpression(e)&&"!"===e.operator?e.argument:t.unaryExpression("!",e),this.emit(t.ifStatement(n,t.blockStatement([this.assign(this.contextProperty("next"),r),t.breakStatement()])))},Ep.makeTempVar=function(){return this.contextProperty("t"+this.nextTempId++)},Ep.getContextFunction=function(e){return t.functionExpression(e||null,[this.contextId],t.blockStatement([this.getDispatchLoop()]),!1,!1)},Ep.getDispatchLoop=function(){var e=this,r=[],n=void 0,a=!1;return e.listing.forEach(function(i,s){e.marked.hasOwnProperty(s)&&(r.push(t.switchCase(t.numericLiteral(s),n=[])),a=!1),a||(n.push(i),t.isCompletionStatement(i)&&(a=!0))}),this.finalLoc.value=this.listing.length,r.push(t.switchCase(this.finalLoc,[]),t.switchCase(t.stringLiteral("end"),[t.returnStatement(t.callExpression(this.contextProperty("stop"),[]))])),t.whileStatement(t.numericLiteral(1),t.switchStatement(t.assignmentExpression("=",this.contextProperty("prev"),this.contextProperty("next")),r))},Ep.getTryLocsList=function(){if(0===this.tryEntries.length)return null;var e=0;return t.arrayExpression(this.tryEntries.map(function(r){var n=r.firstLoc.value;_assert2["default"].ok(n>=e,"try entries out of order"),e=n;var a=r.catchEntry,i=r.finallyEntry,s=[r.firstLoc,a?a.firstLoc:null];return i&&(s[2]=i.firstLoc,s[3]=i.afterLoc),t.arrayExpression(s)}))},Ep.explode=function(e,r){var n=e.node,a=this;if(t.assertNode(n),t.isDeclaration(n))throw getDeclError(n);if(t.isStatement(n))return a.explodeStatement(e);if(t.isExpression(n))return a.explodeExpression(e,r);switch(n.type){case"Program":return e.get("body").map(a.explodeStatement,a);case"VariableDeclarator":throw getDeclError(n);case"Property":case"SwitchCase":case"CatchClause":throw new Error(n.type+" nodes should be handled by their parents");default:throw new Error("unknown Node of type "+(0,_stringify2["default"])(n.type))}},Ep.explodeStatement=function(e,r){var n=e.node,a=this,i=void 0,s=void 0,o=void 0;if(t.assertStatement(n),r?t.assertIdentifier(r):r=null,t.isBlockStatement(n))return void e.get("body").forEach(function(e){a.explodeStatement(e)});if(!meta.containsLeap(n))return void a.emit(n);var p=function(){switch(n.type){case"ExpressionStatement":a.explodeExpression(e.get("expression"),!0);break;case"LabeledStatement":s=loc(),a.leapManager.withEntry(new leap.LabeledEntry(s,n.label),function(){a.explodeStatement(e.get("body"),n.label)}),a.mark(s);break;case"WhileStatement":i=loc(),s=loc(),a.mark(i),a.jumpIfNot(a.explodeExpression(e.get("test")),s),a.leapManager.withEntry(new leap.LoopEntry(s,i,r),function(){a.explodeStatement(e.get("body"))}),a.jump(i),a.mark(s);break;case"DoWhileStatement":var p=loc(),l=loc();s=loc(),a.mark(p),a.leapManager.withEntry(new leap.LoopEntry(s,l,r),function(){a.explode(e.get("body"))}),a.mark(l),a.jumpIf(a.explodeExpression(e.get("test")),p),a.mark(s);break;case"ForStatement":o=loc();var u=loc();s=loc(),n.init&&a.explode(e.get("init"),!0),a.mark(o),n.test&&a.jumpIfNot(a.explodeExpression(e.get("test")),s),a.leapManager.withEntry(new leap.LoopEntry(s,u,r),function(){a.explodeStatement(e.get("body"))}),a.mark(u),n.update&&a.explode(e.get("update"),!0),a.jump(o),a.mark(s);break;case"TypeCastExpression":return{v:a.explodeExpression(e.get("expression"))};case"ForInStatement":o=loc(),s=loc();var c=a.makeTempVar();a.emitAssign(c,t.callExpression(util.runtimeProperty("keys"),[a.explodeExpression(e.get("right"))])),a.mark(o);var m=a.makeTempVar();a.jumpIf(t.memberExpression(t.assignmentExpression("=",m,t.callExpression(c,[])),t.identifier("done"),!1),s),a.emitAssign(n.left,t.memberExpression(m,t.identifier("value"),!1)),a.leapManager.withEntry(new leap.LoopEntry(s,o,r),function(){a.explodeStatement(e.get("body"))}),a.jump(o),a.mark(s);break;case"BreakStatement":a.emitAbruptCompletion({type:"break",target:a.leapManager.getBreakLoc(n.label)});break;case"ContinueStatement":a.emitAbruptCompletion({type:"continue",target:a.leapManager.getContinueLoc(n.label)});break;case"SwitchStatement":var d=a.emitAssign(a.makeTempVar(),a.explodeExpression(e.get("discriminant")));s=loc();for(var f=loc(),x=f,E=[],g=n.cases||[],h=g.length-1;h>=0;--h){var y=g[h];t.assertSwitchCase(y),y.test?x=t.conditionalExpression(t.binaryExpression("===",d,y.test),E[h]=loc(),x):E[h]=f}var v=e.get("discriminant");v.replaceWith(x),a.jump(a.explodeExpression(v)),a.leapManager.withEntry(new leap.SwitchEntry(s),function(){e.get("cases").forEach(function(e){var t=e.key;a.mark(E[t]),e.get("consequent").forEach(function(e){a.explodeStatement(e)})})}),a.mark(s),f.value===-1&&(a.mark(f),_assert2["default"].strictEqual(s.value,f.value));break;case"IfStatement":var b=n.alternate&&loc();s=loc(),a.jumpIfNot(a.explodeExpression(e.get("test")),b||s),a.explodeStatement(e.get("consequent")),b&&(a.jump(s),a.mark(b),a.explodeStatement(e.get("alternate"))),a.mark(s);break;case"ReturnStatement":a.emitAbruptCompletion({type:"return",value:a.explodeExpression(e.get("argument"))});break;case"WithStatement":throw new Error("WithStatement not supported in generator functions.");case"TryStatement":s=loc();var k=n.handler,w=k&&loc(),S=w&&new leap.CatchEntry(w,k.param),L=n.finalizer&&loc(),_=L&&new leap.FinallyEntry(L,s),P=new leap.TryEntry(a.getUnmarkedCurrentLoc(),S,_);a.tryEntries.push(P),a.updateContextPrevLoc(P.firstLoc),a.leapManager.withEntry(P,function(){a.explodeStatement(e.get("block")),w&&!function(){L?a.jump(L):a.jump(s),a.updateContextPrevLoc(a.mark(w));var t=e.get("handler.body"),r=a.makeTempVar();a.clearPendingException(P.firstLoc,r),t.traverse(catchParamVisitor,{safeParam:r,catchParamName:k.param.name}),a.leapManager.withEntry(S,function(){a.explodeStatement(t)})}(),L&&(a.updateContextPrevLoc(a.mark(L)),a.leapManager.withEntry(_,function(){a.explodeStatement(e.get("finalizer"))}),a.emit(t.returnStatement(t.callExpression(a.contextProperty("finish"),[_.firstLoc]))))}),a.mark(s);break;case"ThrowStatement":a.emit(t.throwStatement(a.explodeExpression(e.get("argument"))));break;default:throw new Error("unknown Statement of type "+(0,_stringify2["default"])(n.type))}}();return"object"===("undefined"==typeof p?"undefined":(0,_typeof3["default"])(p))?p.v:void 0};var catchParamVisitor={Identifier:function(e,t){e.node.name===t.catchParamName&&util.isReference(e)&&e.replaceWith(t.safeParam)},Scope:function(e,t){e.scope.hasOwnBinding(t.catchParamName)&&e.skip()}};Ep.emitAbruptCompletion=function(e){isValidCompletion(e)||_assert2["default"].ok(!1,"invalid completion record: "+(0,_stringify2["default"])(e)),_assert2["default"].notStrictEqual(e.type,"normal","normal completions are not abrupt");var r=[t.stringLiteral(e.type)];"break"===e.type||"continue"===e.type?(t.assertLiteral(e.target),r[1]=e.target):"return"!==e.type&&"throw"!==e.type||e.value&&(t.assertExpression(e.value),r[1]=e.value),this.emit(t.returnStatement(t.callExpression(this.contextProperty("abrupt"),r)))},Ep.getUnmarkedCurrentLoc=function(){return t.numericLiteral(this.listing.length)},Ep.updateContextPrevLoc=function(e){e?(t.assertLiteral(e),e.value===-1?e.value=this.listing.length:_assert2["default"].strictEqual(e.value,this.listing.length)):e=this.getUnmarkedCurrentLoc(),this.emitAssign(this.contextProperty("prev"),e)},Ep.explodeExpression=function(e,r){function n(e){return t.assertExpression(e),r?void s.emit(e):e}function a(e,r,n){_assert2["default"].ok(!n||!e,"Ignoring the result of a child expression but forcing it to be assigned to a temporary variable?");var a=s.explodeExpression(r,n);return n||(e||l&&!t.isLiteral(a))&&(a=s.emitAssign(e||s.makeTempVar(),a)),a}var i=e.node;if(!i)return i;t.assertExpression(i);var s=this,o=void 0,p=void 0;if(!meta.containsLeap(i))return n(i);var l=meta.containsLeap.onlyChildren(i),u=function(){switch(i.type){case"MemberExpression":return{v:n(t.memberExpression(s.explodeExpression(e.get("object")),i.computed?a(null,e.get("property")):i.property,i.computed))};case"CallExpression":var l=e.get("callee"),u=e.get("arguments"),c=void 0,m=[],d=!1;if(u.forEach(function(e){d=d||meta.containsLeap(e.node)}),t.isMemberExpression(l.node))if(d){var f=a(s.makeTempVar(),l.get("object")),x=l.node.computed?a(null,l.get("property")):l.node.property;m.unshift(f),c=t.memberExpression(t.memberExpression(f,x,l.node.computed),t.identifier("call"),!1)}else c=s.explodeExpression(l);else c=s.explodeExpression(l),t.isMemberExpression(c)&&(c=t.sequenceExpression([t.numericLiteral(0),c]));return u.forEach(function(e){m.push(a(null,e))}),{v:n(t.callExpression(c,m))};case"NewExpression":return{v:n(t.newExpression(a(null,e.get("callee")),e.get("arguments").map(function(e){return a(null,e)})))};case"ObjectExpression":return{v:n(t.objectExpression(e.get("properties").map(function(e){return e.isObjectProperty()?t.objectProperty(e.node.key,a(null,e.get("value")),e.node.computed):e.node})))};case"ArrayExpression":return{v:n(t.arrayExpression(e.get("elements").map(function(e){return a(null,e)})))};case"SequenceExpression":var E=i.expressions.length-1;return e.get("expressions").forEach(function(e){e.key===E?o=s.explodeExpression(e,r):s.explodeExpression(e,!0)}),{v:o};case"LogicalExpression":p=loc(),r||(o=s.makeTempVar());var g=a(o,e.get("left"));return"&&"===i.operator?s.jumpIfNot(g,p):(_assert2["default"].strictEqual(i.operator,"||"),s.jumpIf(g,p)),a(o,e.get("right"),r),s.mark(p),{v:o};case"ConditionalExpression":var h=loc();p=loc();var y=s.explodeExpression(e.get("test"));return s.jumpIfNot(y,h),r||(o=s.makeTempVar()),a(o,e.get("consequent"),r),s.jump(p),s.mark(h),a(o,e.get("alternate"),r),s.mark(p),{v:o};case"UnaryExpression":return{v:n(t.unaryExpression(i.operator,s.explodeExpression(e.get("argument")),!!i.prefix))};case"BinaryExpression":return{v:n(t.binaryExpression(i.operator,a(null,e.get("left")),a(null,e.get("right"))))};case"AssignmentExpression":return{v:n(t.assignmentExpression(i.operator,s.explodeExpression(e.get("left")),s.explodeExpression(e.get("right"))))};case"UpdateExpression":return{v:n(t.updateExpression(i.operator,s.explodeExpression(e.get("argument")),i.prefix))};case"YieldExpression":p=loc();var v=i.argument&&s.explodeExpression(e.get("argument"));if(v&&i.delegate){var b=s.makeTempVar();return s.emit(t.returnStatement(t.callExpression(s.contextProperty("delegateYield"),[v,t.stringLiteral(b.property.name),p]))),s.mark(p),{v:b}}return s.emitAssign(s.contextProperty("next"),p),s.emit(t.returnStatement(v||null)),s.mark(p),{v:s.contextProperty("sent")};default:throw new Error("unknown Expression of type "+(0,_stringify2["default"])(i.type))}}();return"object"===("undefined"==typeof u?"undefined":(0,_typeof3["default"])(u))?u.v:void 0};

/***/ },

/***/ "./node_modules/babel-plugin-transform-regenerator/lib/leap.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(r[e]=t[e]);return r["default"]=t,r}function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function Entry(){_assert2["default"].ok(this instanceof Entry)}function FunctionEntry(r){Entry.call(this),t.assertLiteral(r),this.returnLoc=r}function LoopEntry(r,e,n){Entry.call(this),t.assertLiteral(r),t.assertLiteral(e),n?t.assertIdentifier(n):n=null,this.breakLoc=r,this.continueLoc=e,this.label=n}function SwitchEntry(r){Entry.call(this),t.assertLiteral(r),this.breakLoc=r}function TryEntry(r,e,n){Entry.call(this),t.assertLiteral(r),e?_assert2["default"].ok(e instanceof CatchEntry):e=null,n?_assert2["default"].ok(n instanceof FinallyEntry):n=null,_assert2["default"].ok(e||n),this.firstLoc=r,this.catchEntry=e,this.finallyEntry=n}function CatchEntry(r,e){Entry.call(this),t.assertLiteral(r),t.assertIdentifier(e),this.firstLoc=r,this.paramId=e}function FinallyEntry(r,e){Entry.call(this),t.assertLiteral(r),t.assertLiteral(e),this.firstLoc=r,this.afterLoc=e}function LabeledEntry(r,e){Entry.call(this),t.assertLiteral(r),t.assertIdentifier(e),this.breakLoc=r,this.label=e}function LeapManager(t){_assert2["default"].ok(this instanceof LeapManager);var r=__webpack_require__("./node_modules/babel-plugin-transform-regenerator/lib/emit.js").Emitter;_assert2["default"].ok(t instanceof r),this.emitter=t,this.entryStack=[new FunctionEntry(t.finalLoc)]}var _assert=__webpack_require__("./node_modules/assert/assert.js"),_assert2=_interopRequireDefault(_assert),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_util=__webpack_require__("./node_modules/util/util.js");(0,_util.inherits)(FunctionEntry,Entry),exports.FunctionEntry=FunctionEntry,(0,_util.inherits)(LoopEntry,Entry),exports.LoopEntry=LoopEntry,(0,_util.inherits)(SwitchEntry,Entry),exports.SwitchEntry=SwitchEntry,(0,_util.inherits)(TryEntry,Entry),exports.TryEntry=TryEntry,(0,_util.inherits)(CatchEntry,Entry),exports.CatchEntry=CatchEntry,(0,_util.inherits)(FinallyEntry,Entry),exports.FinallyEntry=FinallyEntry,(0,_util.inherits)(LabeledEntry,Entry),exports.LabeledEntry=LabeledEntry;var LMp=LeapManager.prototype;exports.LeapManager=LeapManager,LMp.withEntry=function(t,r){_assert2["default"].ok(t instanceof Entry),this.entryStack.push(t);try{r.call(this.emitter)}finally{var e=this.entryStack.pop();_assert2["default"].strictEqual(e,t)}},LMp._findLeapLocation=function(t,r){for(var e=this.entryStack.length-1;e>=0;--e){var n=this.entryStack[e],i=n[t];if(i)if(r){if(n.label&&n.label.name===r.name)return i}else if(!(n instanceof LabeledEntry))return i}return null},LMp.getBreakLoc=function(t){return this._findLeapLocation("breakLoc",t)},LMp.getContinueLoc=function(t){return this._findLeapLocation("continueLoc",t)};

/***/ },

/***/ "./node_modules/babel-plugin-transform-regenerator/lib/meta.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function makePredicate(e,r){function s(e){function r(e){return s||(Array.isArray(e)?e.some(r):t.isNode(e)&&(_assert2["default"].strictEqual(s,!1),s=a(e))),s}t.assertNode(e);var s=!1,n=t.VISITOR_KEYS[e.type];if(n)for(var i=0;i<n.length;i++){var p=n[i],o=e[p];r(o)}return s}function a(a){t.assertNode(a);var n=m(a);return hasOwn.call(n,e)?n[e]:hasOwn.call(opaqueTypes,a.type)?n[e]=!1:hasOwn.call(r,a.type)?n[e]=!0:n[e]=s(a)}return a.onlyChildren=s,a}var _assert=__webpack_require__("./node_modules/assert/assert.js"),_assert2=_interopRequireDefault(_assert),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),m=__webpack_require__("./node_modules/private/private.js").makeAccessor(),hasOwn=Object.prototype.hasOwnProperty,opaqueTypes={FunctionExpression:!0},sideEffectTypes={CallExpression:!0,ForInStatement:!0,UnaryExpression:!0,BinaryExpression:!0,AssignmentExpression:!0,UpdateExpression:!0,NewExpression:!0},leapTypes={YieldExpression:!0,BreakStatement:!0,ContinueStatement:!0,ReturnStatement:!0,ThrowStatement:!0};for(var type in leapTypes)hasOwn.call(leapTypes,type)&&(sideEffectTypes[type]=leapTypes[type]);exports.hasSideEffects=makePredicate("hasSideEffects",sideEffectTypes),exports.containsLeap=makePredicate("containsLeap",leapTypes);

/***/ },

/***/ "./node_modules/private/private.js":
/***/ function(module, exports) {

	"use strict";function defProp(e,r,n){if(originalDefProp)try{originalDefProp.call(originalObject,e,r,{value:n})}catch(a){e[r]=n}else e[r]=n}function makeSafeToCall(e){return e&&(defProp(e,"call",e.call),defProp(e,"apply",e.apply)),e}function create(e){return originalCreate?originalCreate.call(originalObject,e):(cloner.prototype=e||null,new cloner)}function makeUniqueKey(){do var e=internString(strSlice.call(numToStr.call(rand(),36),2));while(hasOwn.call(uniqueKeys,e));return uniqueKeys[e]=e}function internString(e){var r={};return r[e]=!0,Object.keys(r)[0]}function defaultCreatorFn(e){return create(null)}function makeAccessor(e){function r(r){function n(n,a){if(n===t)return a?o=null:o||(o=e(r))}var o;defProp(r,a,n)}function n(e){return hasOwn.call(e,a)||r(e),e[a](t)}var a=makeUniqueKey(),t=create(null);return e=e||defaultCreatorFn,n.forget=function(e){hasOwn.call(e,a)&&e[a](t,!0)},n}var originalObject=Object,originalDefProp=Object.defineProperty,originalCreate=Object.create;makeSafeToCall(originalDefProp),makeSafeToCall(originalCreate);var hasOwn=makeSafeToCall(Object.prototype.hasOwnProperty),numToStr=makeSafeToCall(Number.prototype.toString),strSlice=makeSafeToCall(String.prototype.slice),cloner=function(){},rand=Math.random,uniqueKeys=create(null);defProp(exports,"makeUniqueKey",makeUniqueKey);var originalGetOPNs=Object.getOwnPropertyNames;Object.getOwnPropertyNames=function(e){for(var r=originalGetOPNs(e),n=0,a=0,t=r.length;n<t;++n)hasOwn.call(uniqueKeys,r[n])||(n>a&&(r[a]=r[n]),++a);return r.length=a,r},defProp(exports,"makeAccessor",makeAccessor);

/***/ },

/***/ "./node_modules/babel-plugin-transform-regenerator/lib/util.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function runtimeProperty(e){return t.memberExpression(t.identifier("regeneratorRuntime"),t.identifier(e),!1)}function isReference(e){return e.isReferenced()||e.parentPath.isAssignmentExpression({left:e.node})}exports.__esModule=!0,exports.runtimeProperty=runtimeProperty,exports.isReference=isReference;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);

/***/ },

/***/ "./node_modules/babel-preset-stage-1/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _babelPresetStage=__webpack_require__("./node_modules/babel-preset-stage-2/lib/index.js"),_babelPresetStage2=_interopRequireDefault(_babelPresetStage),_babelPluginTransformClassConstructorCall=__webpack_require__("./node_modules/babel-plugin-transform-class-constructor-call/lib/index.js"),_babelPluginTransformClassConstructorCall2=_interopRequireDefault(_babelPluginTransformClassConstructorCall),_babelPluginTransformExportExtensions=__webpack_require__("./node_modules/babel-plugin-transform-export-extensions/lib/index.js"),_babelPluginTransformExportExtensions2=_interopRequireDefault(_babelPluginTransformExportExtensions);exports["default"]={presets:[_babelPresetStage2["default"]],plugins:[_babelPluginTransformClassConstructorCall2["default"],_babelPluginTransformExportExtensions2["default"]]},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-preset-stage-2/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _babelPresetStage=__webpack_require__("./node_modules/babel-preset-stage-3/lib/index.js"),_babelPresetStage2=_interopRequireDefault(_babelPresetStage),_babelPluginTransformClassProperties=__webpack_require__("./node_modules/babel-plugin-transform-class-properties/lib/index.js"),_babelPluginTransformClassProperties2=_interopRequireDefault(_babelPluginTransformClassProperties),_babelPluginTransformDecorators=__webpack_require__("./node_modules/babel-plugin-transform-decorators/lib/index.js"),_babelPluginTransformDecorators2=_interopRequireDefault(_babelPluginTransformDecorators);exports["default"]={presets:[_babelPresetStage2["default"]],plugins:[_babelPluginTransformClassProperties2["default"],_babelPluginTransformDecorators2["default"]]},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-preset-stage-3/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _babelPluginSyntaxTrailingFunctionCommas=__webpack_require__("./node_modules/babel-plugin-syntax-trailing-function-commas/lib/index.js"),_babelPluginSyntaxTrailingFunctionCommas2=_interopRequireDefault(_babelPluginSyntaxTrailingFunctionCommas),_babelPluginTransformAsyncToGenerator=__webpack_require__("./node_modules/babel-plugin-transform-async-to-generator/lib/index.js"),_babelPluginTransformAsyncToGenerator2=_interopRequireDefault(_babelPluginTransformAsyncToGenerator),_babelPluginTransformExponentiationOperator=__webpack_require__("./node_modules/babel-plugin-transform-exponentiation-operator/lib/index.js"),_babelPluginTransformExponentiationOperator2=_interopRequireDefault(_babelPluginTransformExponentiationOperator),_babelPluginTransformObjectRestSpread=__webpack_require__("./node_modules/babel-plugin-transform-object-rest-spread/lib/index.js"),_babelPluginTransformObjectRestSpread2=_interopRequireDefault(_babelPluginTransformObjectRestSpread),_babelPluginTransformAsyncGeneratorFunctions=__webpack_require__("./node_modules/babel-plugin-transform-async-generator-functions/lib/index.js"),_babelPluginTransformAsyncGeneratorFunctions2=_interopRequireDefault(_babelPluginTransformAsyncGeneratorFunctions);exports["default"]={plugins:[_babelPluginSyntaxTrailingFunctionCommas2["default"],_babelPluginTransformAsyncToGenerator2["default"],_babelPluginTransformExponentiationOperator2["default"],_babelPluginTransformAsyncGeneratorFunctions2["default"],_babelPluginTransformObjectRestSpread2["default"]]},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-trailing-function-commas/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(t,e){e.plugins.push("trailingFunctionCommas")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-async-to-generator/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports["default"]=function(){return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-async-functions/lib/index.js"),visitor:{Function:function(e,r){e.node.async&&!e.node.generator&&(0,_babelHelperRemapAsyncToGenerator2["default"])(e,r.file,{wrapAsync:r.addHelper("asyncToGenerator")})}}}};var _babelHelperRemapAsyncToGenerator=__webpack_require__("./node_modules/babel-helper-remap-async-to-generator/lib/index.js"),_babelHelperRemapAsyncToGenerator2=_interopRequireDefault(_babelHelperRemapAsyncToGenerator);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-async-functions/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(t,e){e.plugins.push("asyncFunctions")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-remap-async-to-generator/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function classOrObjectMethod(e,r){var a=e.node,n=a.body;a.async=!1;var i=t.functionExpression(null,[],t.blockStatement(n.body),!0);i.shadow=!0,n.body=[t.returnStatement(t.callExpression(t.callExpression(r,[i]),[]))]}function plainFunction(e,r){var a=e.node,n=e.isFunctionDeclaration(),i=a.id,o=buildWrapper;e.isArrowFunctionExpression()?e.arrowFunctionToShadowed():!n&&i&&(o=namedBuildWrapper),a.async=!1,a.generator=!0,a.id=null,n&&(a.type="FunctionExpression");var l=t.callExpression(r,[a]),p=o({NAME:i,REF:e.scope.generateUidIdentifier("ref"),FUNCTION:l,PARAMS:a.params.map(function(){return e.scope.generateUidIdentifier("x")})}).expression;if(n){var u=t.variableDeclaration("let",[t.variableDeclarator(t.identifier(i.name),t.callExpression(p,[]))]);u._blockHoist=!0,e.replaceWith(u)}else{var s=p.body.body[1].argument;i||(0,_babelHelperFunctionName2["default"])({node:s,parent:e.parent,scope:e.scope}),!s||s.id||a.params.length?e.replaceWith(t.callExpression(p,[])):e.replaceWith(l)}}exports.__esModule=!0,exports["default"]=function(e,t,r){r||(r={wrapAsync:t},t=null),e.traverse(awaitVisitor,{file:t,wrapAwait:r.wrapAwait}),e.isClassMethod()||e.isObjectMethod()?classOrObjectMethod(e,r.wrapAsync):plainFunction(e,r.wrapAsync)};var _babelHelperFunctionName=__webpack_require__("./node_modules/babel-helper-function-name/lib/index.js"),_babelHelperFunctionName2=_interopRequireDefault(_babelHelperFunctionName),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_forAwait=__webpack_require__("./node_modules/babel-helper-remap-async-to-generator/lib/for-await.js"),_forAwait2=_interopRequireDefault(_forAwait),buildWrapper=(0,_babelTemplate2["default"])("\n  (() => {\n    var REF = FUNCTION;\n    return function NAME(PARAMS) {\n      return REF.apply(this, arguments);\n    };\n  })\n"),namedBuildWrapper=(0,_babelTemplate2["default"])("\n  (() => {\n    var REF = FUNCTION;\n    function NAME(PARAMS) {\n      return REF.apply(this, arguments);\n    }\n    return NAME;\n  })\n"),awaitVisitor={Function:function(e){return e.isArrowFunctionExpression()&&!e.node.async?void e.arrowFunctionToShadowed():void e.skip()},AwaitExpression:function(e,r){var a=e.node,n=r.wrapAwait;a.type="YieldExpression",n&&(a.argument=t.callExpression(n,[a.argument]))},ForAwaitStatement:function(e,r){var a=r.file,n=r.wrapAwait,i=e.node,o=(0,_forAwait2["default"])(e,{getAsyncIterator:a.addHelper("asyncIterator"),wrapAwait:n}),l=o.declar,p=o.loop,u=p.body;e.ensureBlock(),l&&u.body.push(l),u.body=u.body.concat(i.body.body),t.inherits(p,i),t.inherits(p.body,i.body),o.replaceParent?(e.parentPath.replaceWithMultiple(o.node),e.remove()):e.replaceWithMultiple(o.node)}};module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-remap-async-to-generator/lib/for-await.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}exports.__esModule=!0,exports["default"]=function(e,r){var n=e.node,a=e.scope,i=e.parent,l=a.generateUidIdentifier("step"),T=a.generateUidIdentifier("value"),E=n.left,R=void 0;t.isIdentifier(E)||t.isPattern(E)||t.isMemberExpression(E)?R=t.expressionStatement(t.assignmentExpression("=",E,T)):t.isVariableDeclaration(E)&&(R=t.variableDeclaration(E.kind,[t.variableDeclarator(E.declarations[0].id,T)]));var o=buildForAwait();(0,_babelTraverse2["default"])(o,forAwaitVisitor,null,{ITERATOR_HAD_ERROR_KEY:a.generateUidIdentifier("didIteratorError"),ITERATOR_COMPLETION:a.generateUidIdentifier("iteratorNormalCompletion"),ITERATOR_ERROR_KEY:a.generateUidIdentifier("iteratorError"),ITERATOR_KEY:a.generateUidIdentifier("iterator"),GET_ITERATOR:r.getAsyncIterator,OBJECT:n.right,STEP_VALUE:T,STEP_KEY:l,AWAIT:r.wrapAwait}),o=o.body.body;var _=t.isLabeledStatement(i),d=o[3].block.body,A=d[0];return _&&(d[0]=t.labeledStatement(i.label,A)),{replaceParent:_,node:o,declar:R,loop:A}};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes),_babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_babelTraverse=__webpack_require__("./node_modules/babel-traverse/lib/index.js"),_babelTraverse2=_interopRequireDefault(_babelTraverse),buildForAwait=(0,_babelTemplate2["default"])("\n  function* wrapper() {\n    var ITERATOR_COMPLETION = true;\n    var ITERATOR_HAD_ERROR_KEY = false;\n    var ITERATOR_ERROR_KEY = undefined;\n    try {\n      for (\n        var ITERATOR_KEY = GET_ITERATOR(OBJECT), STEP_KEY, STEP_VALUE;\n        (\n          STEP_KEY = yield AWAIT(ITERATOR_KEY.next()),\n          ITERATOR_COMPLETION = STEP_KEY.done,\n          STEP_VALUE = yield AWAIT(STEP_KEY.value),\n          !ITERATOR_COMPLETION\n        );\n        ITERATOR_COMPLETION = true) {\n      }\n    } catch (err) {\n      ITERATOR_HAD_ERROR_KEY = true;\n      ITERATOR_ERROR_KEY = err;\n    } finally {\n      try {\n        if (!ITERATOR_COMPLETION && ITERATOR_KEY.return) {\n          yield AWAIT(ITERATOR_KEY.return());\n        }\n      } finally {\n        if (ITERATOR_HAD_ERROR_KEY) {\n          throw ITERATOR_ERROR_KEY;\n        }\n      }\n    }\n  }\n"),forAwaitVisitor={noScope:!0,Identifier:function(e,r){e.node.name in r&&e.replaceInline(r[e.node.name])},CallExpression:function(e,r){var n=e.node.callee;t.isIdentifier(n)&&"AWAIT"===n.name&&!r.AWAIT&&e.replaceWith(e.node.arguments[0])}};module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-exponentiation-operator/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports["default"]=function(e){var r=e.types;return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-exponentiation-operator/lib/index.js"),visitor:(0,_babelHelperBuilderBinaryAssignmentOperatorVisitor2["default"])({operator:"**",build:function(e,i){return r.callExpression(r.memberExpression(r.identifier("Math"),r.identifier("pow")),[e,i])}})}};var _babelHelperBuilderBinaryAssignmentOperatorVisitor=__webpack_require__("./node_modules/babel-helper-builder-binary-assignment-operator-visitor/lib/index.js"),_babelHelperBuilderBinaryAssignmentOperatorVisitor2=_interopRequireDefault(_babelHelperBuilderBinaryAssignmentOperatorVisitor);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-exponentiation-operator/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(t,e){e.plugins.push("exponentiationOperator")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-builder-binary-assignment-operator-visitor/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports["default"]=function(e){function r(r){return r&&r.operator===e.operator+"="}function i(e,r){return t.assignmentExpression("=",e,r)}var l={};return l.ExpressionStatement=function(l,n){if(!l.isCompletionRecord()){var o=l.node.expression;if(r(o)){var s=[],p=(0,_babelHelperExplodeAssignableExpression2["default"])(o.left,s,n,l.scope,!0);s.push(t.expressionStatement(i(p.ref,e.build(p.uid,o.right)))),l.replaceWithMultiple(s)}}},l.AssignmentExpression=function(t,l){var n=t.node,o=t.scope;if(r(n)){var s=[],p=(0,_babelHelperExplodeAssignableExpression2["default"])(n.left,s,l,o);s.push(i(p.ref,e.build(p.uid,n.right))),t.replaceWithMultiple(s)}},l.BinaryExpression=function(r){var t=r.node;t.operator===e.operator&&r.replaceWith(e.build(t.left,t.right))},l};var _babelHelperExplodeAssignableExpression=__webpack_require__("./node_modules/babel-helper-explode-assignable-expression/lib/index.js"),_babelHelperExplodeAssignableExpression2=_interopRequireDefault(_babelHelperExplodeAssignableExpression),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-explode-assignable-expression/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function getObjRef(e,r,i,a){var n=void 0;if(t.isIdentifier(e)){if(a.hasBinding(e.name))return e;n=e}else{if(!t.isMemberExpression(e))throw new Error("We can't explode this node type "+e.type);if(n=e.object,t.isIdentifier(n)&&a.hasBinding(n.name))return n}var o=a.generateUidIdentifierBasedOnNode(n);return r.push(t.variableDeclaration("var",[t.variableDeclarator(o,n)])),o}function getPropRef(e,r,i,a){var n=e.property,o=t.toComputedKey(e,n);if(t.isLiteral(o))return o;var d=a.generateUidIdentifierBasedOnNode(n);return r.push(t.variableDeclaration("var",[t.variableDeclarator(d,n)])),d}exports.__esModule=!0,exports["default"]=function(e,r,i,a,n){var o=void 0;o=t.isIdentifier(e)&&n?e:getObjRef(e,r,i,a);var d=void 0,s=void 0;if(t.isIdentifier(e))d=e,s=o;else{var l=getPropRef(e,r,i,a),u=e.computed||t.isLiteral(l);s=d=t.memberExpression(o,l,u)}return{uid:s,ref:d}};var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-object-rest-spread/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){function r(e){for(var r=e.properties,o=Array.isArray(r),s=0,r=o?r:(0,_getIterator3["default"])(r);;){var i;if(o){if(s>=r.length)break;i=r[s++]}else{if(s=r.next(),s.done)break;i=s.value}var a=i;if(t.isSpreadProperty(a))return!0}return!1}var t=e.types;return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-object-rest-spread/lib/index.js"),visitor:{ObjectExpression:function(e,o){function s(){n.length&&(a.push(t.objectExpression(n)),n=[])}if(r(e.node)){var i=o.opts.useBuiltIns||!1;if("boolean"!=typeof i)throw new Error("transform-object-rest-spread currently only accepts a boolean option for useBuiltIns (defaults to false)");for(var a=[],n=[],u=e.node.properties,p=Array.isArray(u),l=0,u=p?u:(0,_getIterator3["default"])(u);;){var f;if(p){if(l>=u.length)break;f=u[l++]}else{if(l=u.next(),l.done)break;f=l.value}var d=f;t.isSpreadProperty(d)?(s(),a.push(d.argument)):n.push(d)}s(),t.isObjectExpression(a[0])||a.unshift(t.objectExpression([]));var c=i?t.memberExpression(t.identifier("Object"),t.identifier("assign")):o.addHelper("extends");e.replaceWith(t.callExpression(c,a))}}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-object-rest-spread/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(e,t){t.plugins.push("objectRestSpread")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-async-generator-functions/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports["default"]=function(e){var r=e.types,a={Function:function(e){e.skip()},YieldExpression:function(e,a){var n=e.node;if(n.delegate){var t=a.addHelper("asyncGeneratorDelegate");n.argument=r.callExpression(t,[r.callExpression(a.addHelper("asyncIterator"),[n.argument]),r.memberExpression(a.addHelper("asyncGenerator"),r.identifier("await"))])}}};return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-async-generators/lib/index.js"),visitor:{Function:function(e,n){e.node.async&&e.node.generator&&(e.traverse(a,n),(0,_babelHelperRemapAsyncToGenerator2["default"])(e,n.file,{wrapAsync:r.memberExpression(n.addHelper("asyncGenerator"),r.identifier("wrap")),wrapAwait:r.memberExpression(n.addHelper("asyncGenerator"),r.identifier("await"))}))}}}};var _babelHelperRemapAsyncToGenerator=__webpack_require__("./node_modules/babel-helper-remap-async-to-generator/lib/index.js"),_babelHelperRemapAsyncToGenerator2=_interopRequireDefault(_babelHelperRemapAsyncToGenerator);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-async-generators/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(e,t){t.plugins.push("asyncGenerators")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-class-properties/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){var r=e.types,t={Super:function(e){e.parentPath.isCallExpression({callee:e.node})&&this.push(e.parentPath)}},a={ReferencedIdentifier:function(e){this.scope.hasOwnBinding(e.node.name)&&(this.collision=!0,e.skip())}};return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-class-properties/lib/index.js"),visitor:{Class:function(e){for(var i=!!e.node.superClass,s=void 0,n=[],o=e.get("body"),l=o.get("body"),u=Array.isArray(l),p=0,l=u?l:(0,_getIterator3["default"])(l);;){var d;if(u){if(p>=l.length)break;d=l[p++]}else{if(p=l.next(),p.done)break;d=p.value}var f=d;f.isClassProperty()?n.push(f):f.isClassMethod({kind:"constructor"})&&(s=f)}if(n.length){var c=[],v=void 0;e.isClassExpression()||!e.node.id?((0,_babelHelperFunctionName2["default"])(e),v=e.scope.generateUidIdentifier("class")):v=e.node.id;for(var b=[],g=n,h=Array.isArray(g),x=0,g=h?g:(0,_getIterator3["default"])(g);;){var m;if(h){if(x>=g.length)break;m=g[x++]}else{if(x=g.next(),x.done)break;m=x.value}var y=m,k=y.node;if(!(k.decorators&&k.decorators.length>0)&&k.value){var E=k["static"],_=k.computed||r.isLiteral(y.key);E?c.push(r.expressionStatement(r.assignmentExpression("=",r.memberExpression(v,k.key,_),k.value))):b.push(r.expressionStatement(r.assignmentExpression("=",r.memberExpression(r.thisExpression(),k.key,_),k.value)))}}if(b.length){if(!s){var A=r.classMethod("constructor",r.identifier("constructor"),[],r.blockStatement([]));i&&(A.params=[r.restElement(r.identifier("args"))],A.body.body.push(r.returnStatement(r.callExpression(r["super"](),[r.spreadElement(r.identifier("args"))]))));var C=o.unshiftContainer("body",A);s=C[0]}for(var I={collision:!1,scope:s.scope},P=n,S=Array.isArray(P),q=0,P=S?P:(0,_getIterator3["default"])(P);;){var D;if(S){if(q>=P.length)break;D=P[q++]}else{if(q=P.next(),q.done)break;D=q.value}var F=D;if(F.traverse(a,I),I.collision)break}if(I.collision){var H=e.scope.generateUidIdentifier("initialiseProps");c.push(r.variableDeclaration("var",[r.variableDeclarator(H,r.functionExpression(null,[],r.blockStatement(b)))])),b=[r.expressionStatement(r.callExpression(r.memberExpression(H,r.identifier("call")),[r.thisExpression()]))]}if(i){var M=[];s.traverse(t,M);for(var N=M,R=Array.isArray(N),w=0,N=R?N:(0,_getIterator3["default"])(N);;){var B;if(R){if(w>=N.length)break;B=N[w++]}else{if(w=N.next(),w.done)break;B=w.value}var U=B;U.insertAfter(b)}}else s.get("body").unshiftContainer("body",b)}for(var j=n,L=Array.isArray(j),O=0,j=L?j:(0,_getIterator3["default"])(j);;){var W;if(L){if(O>=j.length)break;W=j[O++]}else{if(O=j.next(),O.done)break;W=O.value}var z=W;z.remove()}c.length&&(e.isClassExpression()?(e.scope.push({id:v}),e.replaceWith(r.assignmentExpression("=",v,e.node))):(e.node.id||(e.node.id=v),e.parentPath.isExportDeclaration()&&(e=e.parentPath)),e.insertAfter(c))}},ArrowFunctionExpression:function(e){var r=e.get("body");if(r.isClassExpression()){var t=r.get("body"),a=t.get("body");a.some(function(e){return e.isClassProperty()})&&e.ensureBlock()}}}}};var _babelHelperFunctionName=__webpack_require__("./node_modules/babel-helper-function-name/lib/index.js"),_babelHelperFunctionName2=_interopRequireDefault(_babelHelperFunctionName);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-class-properties/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(e,t){t.plugins.push("classProperties")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-decorators/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){function r(e){return e.reverse().map(function(e){return e.expression})}function t(e,t,a){var o=[],l=e.node.decorators;if(l){e.node.decorators=null,l=r(l);for(var s=l,i=Array.isArray(s),u=0,s=i?s:(0,_getIterator3["default"])(s);;){var f;if(i){if(u>=s.length)break;f=s[u++]}else{if(u=s.next(),u.done)break;f=u.value}var d=f;o.push(buildClassDecorator({CLASS_REF:t,DECORATOR:d}))}}for(var p=(0,_create2["default"])(null),c=e.get("body.body"),b=Array.isArray(c),_=0,c=b?c:(0,_getIterator3["default"])(c);;){var v;if(b){if(_>=c.length)break;v=c[_++]}else{if(_=c.next(),_.done)break;v=_.value}var g=v,y=g.node.decorators;if(y){var x=n.toKeyAlias(g.node);p[x]=p[x]||[],p[x].push(g.node),g.remove()}}for(var h in p)var m=p[h];return o}function a(e){if(e.isClass()){if(e.node.decorators)return!0;for(var r=e.node.body.body,t=Array.isArray(r),a=0,r=t?r:(0,_getIterator3["default"])(r);;){var o;if(t){if(a>=r.length)break;o=r[a++]}else{if(a=r.next(),a.done)break;o=a.value}var n=o;if(n.decorators)return!0}}else if(e.isObjectExpression())for(var l=e.node.properties,s=Array.isArray(l),i=0,l=s?l:(0,_getIterator3["default"])(l);;){var u;if(s){if(i>=l.length)break;u=l[i++]}else{if(i=l.next(),i.done)break;u=i.value}var f=u;if(f.decorators)return!0}return!1}function o(e){throw e.buildCodeFrameError('Decorators are not officially supported yet in 6.x pending a proposal update.\nHowever, if you need to use them you can install the legacy decorators transform with:\n\nnpm install babel-plugin-transform-decorators-legacy --save-dev\n\nand add the following line to your .babelrc file:\n\n{\n  "plugins": ["transform-decorators-legacy"]\n}\n\nThe repo url is: https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy.\n    ')}var n=e.types;return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-decorators/lib/index.js"),visitor:{ClassExpression:function(e){if(a(e)){o(e),(0,_babelHelperExplodeClass2["default"])(e);var r=e.scope.generateDeclaredUidIdentifier("ref"),l=[];l.push(n.assignmentExpression("=",r,e.node)),l=l.concat(t(e,r,this)),l.push(r),e.replaceWith(n.sequenceExpression(l))}},ClassDeclaration:function(e){if(a(e)){o(e),(0,_babelHelperExplodeClass2["default"])(e);var r=e.node.id,l=[];l=l.concat(t(e,r,this).map(function(e){return n.expressionStatement(e)})),l.push(n.expressionStatement(r)),e.insertAfter(l)}},ObjectExpression:function(e){a(e)&&o(e)}}}};var _babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),_babelHelperExplodeClass=__webpack_require__("./node_modules/babel-helper-explode-class/lib/index.js"),_babelHelperExplodeClass2=_interopRequireDefault(_babelHelperExplodeClass),buildClassDecorator=(0,_babelTemplate2["default"])("\n  CLASS_REF = DECORATOR(CLASS_REF) || CLASS_REF;\n");module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-decorators/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(t,e){e.plugins.push("decorators")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-explode-class/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){function r(r){if(r.node&&!r.isPure()){var a=e.scope.generateDeclaredUidIdentifier();o.push(t.assignmentExpression("=",a,r.node)),r.replaceWith(a)}}function a(e){if(Array.isArray(e)&&e.length){e=e.reverse(),(0,_babelHelperBindifyDecorators2["default"])(e);for(var t=e,a=Array.isArray(t),o=0,t=a?t:(0,_getIterator3["default"])(t);;){var i;if(a){if(o>=t.length)break;i=t[o++]}else{if(o=t.next(),o.done)break;i=o.value}var n=i;r(n)}}}e.assertClass();var o=[];r(e.get("superClass")),a(e.get("decorators"),!0);for(var i=e.get("body.body"),n=i,s=Array.isArray(n),l=0,n=s?n:(0,_getIterator3["default"])(n);;){var u;if(s){if(l>=n.length)break;u=n[l++]}else{if(l=n.next(),l.done)break;u=l.value}var f=u;f.is("computed")&&r(f.get("key")),f.has("decorators")&&a(e.get("decorators"))}o&&e.insertBefore(o.map(function(e){return t.expressionStatement(e)}))};var _babelHelperBindifyDecorators=__webpack_require__("./node_modules/babel-helper-bindify-decorators/lib/index.js"),_babelHelperBindifyDecorators2=_interopRequireDefault(_babelHelperBindifyDecorators),_babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-helper-bindify-decorators/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function bindifyDecorators(e){for(var r=e,o=Array.isArray(r),i=0,r=o?r:(0,_getIterator3["default"])(r);;){var s;if(o){if(i>=r.length)break;s=r[i++]}else{if(i=r.next(),i.done)break;s=i.value}var a=s,n=a.node,u=n.expression;if(t.isMemberExpression(u)){var p=a.scope.maybeGenerateMemoised(u.object),l=void 0,d=[];p?(l=p,d.push(t.assignmentExpression("=",p,u.object))):l=u.object,d.push(t.callExpression(t.memberExpression(t.memberExpression(l,u.property,u.computed),t.identifier("bind")),[l])),1===d.length?n.expression=d[0]:n.expression=t.sequenceExpression(d)}}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=bindifyDecorators;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-class-constructor-call/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol);exports["default"]=function(e){function r(e){for(var r=e.get("body.body"),t=r,a=Array.isArray(t),n=0,t=a?t:(0,_getIterator3["default"])(t);;){var l;if(a){if(n>=t.length)break;l=t[n++]}else{if(n=t.next(),n.done)break;l=n.value}var o=l;if("constructorCall"===o.node.kind)return o}return null}function t(e,r){var t=r,n=t.node,l=n.id||r.scope.generateUidIdentifier("class");r.parentPath.isExportDefaultDeclaration()&&(r=r.parentPath,r.insertAfter(a.exportDefaultDeclaration(l))),r.replaceWithMultiple(buildWrapper({CLASS_REF:r.scope.generateUidIdentifier(l.name),CALL_REF:r.scope.generateUidIdentifier(l.name+"Call"),CALL:a.functionExpression(null,e.node.params,e.node.body),CLASS:a.toExpression(n),WRAPPER_REF:l})),e.remove()}var a=e.types,n=(0,_symbol2["default"])();return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-class-constructor-call/lib/index.js"),visitor:{Class:function(e){if(!e.node[n]){e.node[n]=!0;var a=r(e);a&&t(a,e)}}}}};var _babelTemplate=__webpack_require__("./node_modules/babel-template/lib/index.js"),_babelTemplate2=_interopRequireDefault(_babelTemplate),buildWrapper=(0,_babelTemplate2["default"])("\n  let CLASS_REF = CLASS;\n  var CALL_REF = CALL;\n  var WRAPPER_REF = function (...args) {\n    if (this instanceof WRAPPER_REF) {\n      return Reflect.construct(CLASS_REF, args);\n    } else {\n      return CALL_REF.apply(this, args);\n    }\n  };\n  WRAPPER_REF.__proto__ = CLASS_REF;\n  WRAPPER_REF;\n");module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-class-constructor-call/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(t,s){s.plugins.push("classConstructorCall")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-export-extensions/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";exports.__esModule=!0,exports["default"]=function(e){function i(e,t,p){var s=e.specifiers[0];if(r.isExportNamespaceSpecifier(s)||r.isExportDefaultSpecifier(s)){var o=e.specifiers.shift(),a=p.generateUidIdentifier(o.exported.name),c=void 0;c=r.isExportNamespaceSpecifier(o)?r.importNamespaceSpecifier(a):r.importDefaultSpecifier(a),t.push(r.importDeclaration([c],e.source)),t.push(r.exportNamedDeclaration(null,[r.exportSpecifier(a,o.exported)])),i(e,t,p)}}var r=e.types;return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-export-extensions/lib/index.js"),visitor:{ExportNamedDeclaration:function(e){var r=e.node,t=e.scope,p=[];i(r,p,t),p.length&&(r.specifiers.length>=1&&p.push(r),e.replaceWithMultiple(p))}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-syntax-export-extensions/lib/index.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(){return{manipulateOptions:function(t,e){e.plugins.push("exportExtensions")}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-plugin-transform-flow-strip-types/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(e){var r=e.types,t="@flow";return{inherits:__webpack_require__("./node_modules/babel-plugin-syntax-flow/lib/index.js"),visitor:{Program:function(e,r){for(var o=r.file.ast.comments,n=o,a=Array.isArray(n),i=0,n=a?n:(0,_getIterator3["default"])(n);;){var l;if(a){if(i>=n.length)break;l=n[i++]}else{if(i=n.next(),i.done)break;l=i.value}var u=l;u.value.indexOf(t)>=0&&(u.value=u.value.replace(t,""),u.value.replace(/\*/g,"").trim()||(u.ignore=!0))}},Flow:function(e){e.remove()},ClassProperty:function(e){e.node.typeAnnotation=null,e.node.value||e.remove()},Class:function(e){e.node["implements"]=null,e.get("body.body").forEach(function(e){e.isClassProperty()&&(e.node.typeAnnotation=null,e.node.value||e.remove())})},Function:function(e){for(var r=e.node,t=0;t<r.params.length;t++){var o=r.params[t];o.optional=!1}},TypeCastExpression:function(e){var t=e.node;do t=t.expression;while(r.isTypeCastExpression(t));e.replaceWith(t)}}}},module.exports=exports["default"];

/***/ },

/***/ "./node_modules/babel-traverse/lib/path/inference/inferers.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n["default"]=e,n}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function VariableDeclarator(){var e=this.get("id");return e.isIdentifier()?this.get("init").getTypeAnnotation():void 0}function TypeCastExpression(e){return e.typeAnnotation}function NewExpression(e){if(this.get("callee").isIdentifier())return t.genericTypeAnnotation(e.callee)}function TemplateLiteral(){return t.stringTypeAnnotation()}function UnaryExpression(e){var n=e.operator;return"void"===n?t.voidTypeAnnotation():t.NUMBER_UNARY_OPERATORS.indexOf(n)>=0?t.numberTypeAnnotation():t.STRING_UNARY_OPERATORS.indexOf(n)>=0?t.stringTypeAnnotation():t.BOOLEAN_UNARY_OPERATORS.indexOf(n)>=0?t.booleanTypeAnnotation():void 0}function BinaryExpression(e){var n=e.operator;if(t.NUMBER_BINARY_OPERATORS.indexOf(n)>=0)return t.numberTypeAnnotation();if(t.BOOLEAN_BINARY_OPERATORS.indexOf(n)>=0)return t.booleanTypeAnnotation();if("+"===n){var r=this.get("right"),i=this.get("left");return i.isBaseType("number")&&r.isBaseType("number")?t.numberTypeAnnotation():i.isBaseType("string")||r.isBaseType("string")?t.stringTypeAnnotation():t.unionTypeAnnotation([t.stringTypeAnnotation(),t.numberTypeAnnotation()])}}function LogicalExpression(){return t.createUnionTypeAnnotation([this.get("left").getTypeAnnotation(),this.get("right").getTypeAnnotation()])}function ConditionalExpression(){return t.createUnionTypeAnnotation([this.get("consequent").getTypeAnnotation(),this.get("alternate").getTypeAnnotation()])}function SequenceExpression(){return this.get("expressions").pop().getTypeAnnotation()}function AssignmentExpression(){return this.get("right").getTypeAnnotation()}function UpdateExpression(e){var n=e.operator;if("++"===n||"--"===n)return t.numberTypeAnnotation()}function StringLiteral(){return t.stringTypeAnnotation()}function NumericLiteral(){return t.numberTypeAnnotation()}function BooleanLiteral(){return t.booleanTypeAnnotation()}function NullLiteral(){return t.nullLiteralTypeAnnotation()}function RegExpLiteral(){return t.genericTypeAnnotation(t.identifier("RegExp"))}function ObjectExpression(){return t.genericTypeAnnotation(t.identifier("Object"))}function ArrayExpression(){return t.genericTypeAnnotation(t.identifier("Array"))}function RestElement(){return ArrayExpression()}function Func(){return t.genericTypeAnnotation(t.identifier("Function"))}function CallExpression(){return resolveCall(this.get("callee"))}function TaggedTemplateExpression(){return resolveCall(this.get("tag"))}function resolveCall(e){if(e=e.resolve(),e.isFunction()){if(e.is("async"))return e.is("generator")?t.genericTypeAnnotation(t.identifier("AsyncIterator")):t.genericTypeAnnotation(t.identifier("Promise"));if(e.node.returnType)return e.node.returnType}}exports.__esModule=!0,exports.Class=exports.Function=exports.Identifier=void 0;var _infererReference=__webpack_require__("./node_modules/babel-traverse/lib/path/inference/inferer-reference.js");Object.defineProperty(exports,"Identifier",{enumerable:!0,get:function(){return _interopRequireDefault(_infererReference)["default"]}}),exports.VariableDeclarator=VariableDeclarator,exports.TypeCastExpression=TypeCastExpression,exports.NewExpression=NewExpression,exports.TemplateLiteral=TemplateLiteral,exports.UnaryExpression=UnaryExpression,exports.BinaryExpression=BinaryExpression,exports.LogicalExpression=LogicalExpression,exports.ConditionalExpression=ConditionalExpression,exports.SequenceExpression=SequenceExpression,exports.AssignmentExpression=AssignmentExpression,exports.UpdateExpression=UpdateExpression,exports.StringLiteral=StringLiteral,exports.NumericLiteral=NumericLiteral,exports.BooleanLiteral=BooleanLiteral,exports.NullLiteral=NullLiteral,exports.RegExpLiteral=RegExpLiteral,exports.ObjectExpression=ObjectExpression,exports.ArrayExpression=ArrayExpression,exports.RestElement=RestElement,exports.CallExpression=CallExpression,exports.TaggedTemplateExpression=TaggedTemplateExpression;var _babelTypes=__webpack_require__("./node_modules/babel-types/lib/index.js"),t=_interopRequireWildcard(_babelTypes);TypeCastExpression.validParent=!0,RestElement.validParent=!0,exports.Function=Func,exports.Class=Func;

/***/ }

});