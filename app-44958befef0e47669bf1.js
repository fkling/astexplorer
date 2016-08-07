webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function resize(){_pubsubJs2["default"].publish("PANEL_RESIZE")}function App(e){return _react2["default"].createElement("div",null,_react2["default"].createElement(_ErrorMessageContainer2["default"],null),_react2["default"].createElement("div",{className:"dropTarget"+(e.hasError?" hasError":"")},_react2["default"].createElement(_PasteDropTargetContainer2["default"],null,_react2["default"].createElement(_ToolbarContainer2["default"],null),_react2["default"].createElement(_SplitPane2["default"],{className:"splitpane-content",vertical:!0,onResize:resize},_react2["default"].createElement(_SplitPane2["default"],{className:"splitpane",onResize:resize},_react2["default"].createElement(_CodeEditorContainer2["default"],null),_react2["default"].createElement(_ASTOutputContainer2["default"],null)),e.showTransformer?_react2["default"].createElement(_TransformerContainer2["default"],null):null),_react2["default"].createElement(_LoadingIndicatorContainer2["default"],null),_react2["default"].createElement(_SettingsDialogContainer2["default"],null))))}var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_LocalStorage=__webpack_require__("./src/LocalStorage.js"),LocalStorage=_interopRequireWildcard(_LocalStorage),_sagas=__webpack_require__("./src/store/sagas.js"),sagas=_interopRequireWildcard(_sagas),_ASTOutputContainer=__webpack_require__("./src/containers/ASTOutputContainer.js"),_ASTOutputContainer2=_interopRequireDefault(_ASTOutputContainer),_CodeEditorContainer=__webpack_require__("./src/containers/CodeEditorContainer.js"),_CodeEditorContainer2=_interopRequireDefault(_CodeEditorContainer),_ErrorMessageContainer=__webpack_require__("./src/containers/ErrorMessageContainer.js"),_ErrorMessageContainer2=_interopRequireDefault(_ErrorMessageContainer),_LoadingIndicatorContainer=__webpack_require__("./src/containers/LoadingIndicatorContainer.js"),_LoadingIndicatorContainer2=_interopRequireDefault(_LoadingIndicatorContainer),_PasteDropTargetContainer=__webpack_require__("./src/containers/PasteDropTargetContainer.js"),_PasteDropTargetContainer2=_interopRequireDefault(_PasteDropTargetContainer),_pubsubJs=__webpack_require__("./node_modules/pubsub-js/src/pubsub.js"),_pubsubJs2=_interopRequireDefault(_pubsubJs),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_SettingsDialogContainer=__webpack_require__("./src/containers/SettingsDialogContainer.js"),_SettingsDialogContainer2=_interopRequireDefault(_SettingsDialogContainer),_SplitPane=__webpack_require__("./src/SplitPane.js"),_SplitPane2=_interopRequireDefault(_SplitPane),_ToolbarContainer=__webpack_require__("./src/containers/ToolbarContainer.js"),_ToolbarContainer2=_interopRequireDefault(_ToolbarContainer),_TransformerContainer=__webpack_require__("./src/containers/TransformerContainer.js"),_TransformerContainer2=_interopRequireDefault(_TransformerContainer),_reduxSaga=__webpack_require__("./node_modules/redux-saga/lib/index.js"),_reduxSaga2=_interopRequireDefault(_reduxSaga),_reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_reducers=__webpack_require__("./src/store/reducers.js"),_redux=__webpack_require__("./node_modules/redux/lib/index.js"),_selectors=__webpack_require__("./src/store/selectors.js"),_reduxBatchedActions=__webpack_require__("./node_modules/redux-batched-actions/lib/index.js"),_parsers=__webpack_require__("./src/parsers/index.js"),_actions=__webpack_require__("./src/store/actions.js"),_reactDom=__webpack_require__("./node_modules/react-dom/index.js");App.propTypes={hasError:_react2["default"].PropTypes.bool,showTransformer:_react2["default"].PropTypes.bool};var AppContainer=(0,_reactRedux.connect)(function(e){return{showTransformer:e.transform.showTransformer,hasError:!!e.error}})(App),parser=(0,_parsers.getParserByID)(LocalStorage.getParser())||(0,_parsers.getDefaultParser)((0,_parsers.getCategoryByID)(LocalStorage.getCategory())),parserSettings=LocalStorage.getParserSettings(parser.id)||{},store=(0,_redux.createStore)((0,_reduxBatchedActions.enableBatching)(_reducers.astexplorer),(0,_extends3["default"])({},_reducers.initialState,{parser:parser,parserSettings:parserSettings}),(0,_redux.applyMiddleware)((0,_reduxSaga2["default"])(sagas.watchSelectTransformer,sagas.watchSnippetURI,sagas.watchCategoryChange,sagas.watchSave,sagas.watchDropText)));(0,_reactDom.render)(_react2["default"].createElement(_reactRedux.Provider,{store:store},_react2["default"].createElement(AppContainer,null)),document.getElementById("container")),global.onhashchange=function(){store.dispatch((0,_actions.loadSnippet)())},global.onhashchange(),global.onbeforeunload=function(){var e=store.getState();if(e.transform.code!==(0,_selectors.defaultTransformCode)(e))return"You have unsaved transform code. Do you really want to leave?"};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./src/store/reducers.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function astexplorer(){var e=arguments.length<=0||void 0===arguments[0]?initialState:arguments[0],t=arguments[1];switch(t.type){case actions.SET_WORKBENCH_STATE:var r=t.state;return r.parser&&e.parser.category!==r.parser.category&&(r.code=r.parser.category.codeExample),"code"in r&&null==r.cursor&&(r.cursor=null),(0,_extends3["default"])({},e,r);case actions.SET_PARSER_SETTINGS:return(0,_extends3["default"])({},e,{parserSettings:t.settings});case actions.SET_PARSE_ERROR:return(0,_extends3["default"])({},e,{parseError:t.error});case actions.SET_SNIPPET:return(0,_extends3["default"])({},e,{selectedSnippet:t.snippet,selectedRevision:t.revision,droppedText:null});case actions.CLEAR_SNIPPET:return(0,_extends3["default"])({},e,{selectedSnippet:null,selectedRevision:null,code:e.parser.category.codeExample,cursor:null,droppedText:null});case actions.START_LOADING_SNIPPET:return(0,_extends3["default"])({},e,{loadingSnippet:!0});case actions.DONE_LOADING_SNIPPET:return(0,_extends3["default"])({},e,{loadingSnippet:!1});case actions.OPEN_SETTINGS_DIALOG:return(0,_extends3["default"])({},e,{showSettingsDialog:!0});case actions.CLOSE_SETTINGS_DIALOG:return(0,_extends3["default"])({},e,{showSettingsDialog:!1});case actions.SET_ERROR:return(0,_extends3["default"])({},e,{error:t.error});case actions.SET_TRANSFORM:return(0,_extends3["default"])({},e,{transform:(0,_extends3["default"])({},e.transform,{showTransformer:!0},t.state)});case actions.HIDE_TRANSFORMER:return(0,_extends3["default"])({},e,{transform:(0,_extends3["default"])({},e.transform,{showTransformer:!1})});case actions.START_SAVE:return(0,_extends3["default"])({},e,{saving:!t.fork,forking:t.fork});case actions.END_SAVE:return(0,_extends3["default"])({},e,{saving:!1,forking:!1});case actions.DROP_TEXT:return(0,_extends3["default"])({},e,{code:t.text,droppedText:t.text})}return e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.initialState=void 0;var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2);exports.astexplorer=astexplorer;var _actions=__webpack_require__("./src/store/actions.js"),actions=_interopRequireWildcard(_actions),initialState=exports.initialState={showSettingsDialog:!1,loadingSnippet:!0,selectedSnippet:null,selectedRevision:null,forking:!1,saving:!1,parser:null,parserSettings:null,droppedText:null,code:null,focusPath:[],cursor:null,error:null,parseError:null,transform:{code:"",transformer:null,showTransformPanel:!1}};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/assign.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/assign.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/assign.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.assign.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object.assign;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.assign.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js");$export($export.S+$export.F,"Object",{assign:__webpack_require__("./node_modules/core-js/library/modules/_object-assign.js")});

/***/ },

/***/ "./node_modules/core-js/library/modules/_export.js":
/***/ function(module, exports, __webpack_require__) {

	var global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),core=__webpack_require__("./node_modules/core-js/library/modules/_core.js"),ctx=__webpack_require__("./node_modules/core-js/library/modules/_ctx.js"),hide=__webpack_require__("./node_modules/core-js/library/modules/_hide.js"),PROTOTYPE="prototype",$export=function(e,r,t){var o,n,p,i=e&$export.F,x=e&$export.G,c=e&$export.S,l=e&$export.P,u=e&$export.B,a=e&$export.W,$=x?core:core[r]||(core[r]={}),P=$[PROTOTYPE],f=x?global:c?global[r]:(global[r]||{})[PROTOTYPE];x&&(t=r);for(o in t)n=!i&&f&&void 0!==f[o],n&&o in $||(p=n?f[o]:t[o],$[o]=x&&"function"!=typeof f[o]?t[o]:u&&n?ctx(p,global):a&&f[o]==p?function(e){var r=function(r,t,o){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(r);case 2:return new e(r,t)}return new e(r,t,o)}return e.apply(this,arguments)};return r[PROTOTYPE]=e[PROTOTYPE],r}(p):l&&"function"==typeof p?ctx(Function.call,p):p,l&&(($.virtual||($.virtual={}))[o]=p,e&$export.R&&P&&!P[o]&&hide(P,o,p)))};$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,$export.U=64,$export.R=128,module.exports=$export;

/***/ },

/***/ "./node_modules/core-js/library/modules/_global.js":
/***/ function(module, exports) {

	var global=module.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=global);

/***/ },

/***/ "./node_modules/core-js/library/modules/_core.js":
/***/ function(module, exports) {

	var core=module.exports={version:"2.4.0"};"number"==typeof __e&&(__e=core);

/***/ },

/***/ "./node_modules/core-js/library/modules/_ctx.js":
/***/ function(module, exports, __webpack_require__) {

	var aFunction=__webpack_require__("./node_modules/core-js/library/modules/_a-function.js");module.exports=function(n,r,t){if(aFunction(n),void 0===r)return n;switch(t){case 1:return function(t){return n.call(r,t)};case 2:return function(t,u){return n.call(r,t,u)};case 3:return function(t,u,e){return n.call(r,t,u,e)}}return function(){return n.apply(r,arguments)}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_a-function.js":
/***/ function(module, exports) {

	module.exports=function(o){if("function"!=typeof o)throw TypeError(o+" is not a function!");return o};

/***/ },

/***/ "./node_modules/core-js/library/modules/_hide.js":
/***/ function(module, exports, __webpack_require__) {

	var dP=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js"),createDesc=__webpack_require__("./node_modules/core-js/library/modules/_property-desc.js");module.exports=__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js")?function(e,r,t){return dP.f(e,r,createDesc(1,t))}:function(e,r,t){return e[r]=t,e};

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-dp.js":
/***/ function(module, exports, __webpack_require__) {

	var anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),IE8_DOM_DEFINE=__webpack_require__("./node_modules/core-js/library/modules/_ie8-dom-define.js"),toPrimitive=__webpack_require__("./node_modules/core-js/library/modules/_to-primitive.js"),dP=Object.defineProperty;exports.f=__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js")?Object.defineProperty:function(e,r,t){if(anObject(e),r=toPrimitive(r,!0),anObject(t),IE8_DOM_DEFINE)try{return dP(e,r,t)}catch(i){}if("get"in t||"set"in t)throw TypeError("Accessors not supported!");return"value"in t&&(e[r]=t.value),e};

/***/ },

/***/ "./node_modules/core-js/library/modules/_an-object.js":
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js");module.exports=function(e){if(!isObject(e))throw TypeError(e+" is not an object!");return e};

/***/ },

/***/ "./node_modules/core-js/library/modules/_is-object.js":
/***/ function(module, exports) {

	module.exports=function(o){return"object"==typeof o?null!==o:"function"==typeof o};

/***/ },

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=!__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js")&&!__webpack_require__("./node_modules/core-js/library/modules/_fails.js")(function(){return 7!=Object.defineProperty(__webpack_require__("./node_modules/core-js/library/modules/_dom-create.js")("div"),"a",{get:function(){return 7}}).a});

/***/ },

/***/ "./node_modules/core-js/library/modules/_descriptors.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=!__webpack_require__("./node_modules/core-js/library/modules/_fails.js")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a});

/***/ },

/***/ "./node_modules/core-js/library/modules/_fails.js":
/***/ function(module, exports) {

	module.exports=function(r){try{return!!r()}catch(t){return!0}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_dom-create.js":
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),document=__webpack_require__("./node_modules/core-js/library/modules/_global.js").document,is=isObject(document)&&isObject(document.createElement);module.exports=function(e){return is?document.createElement(e):{}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_to-primitive.js":
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js");module.exports=function(t,e){if(!isObject(t))return t;var r,i;if(e&&"function"==typeof(r=t.toString)&&!isObject(i=r.call(t)))return i;if("function"==typeof(r=t.valueOf)&&!isObject(i=r.call(t)))return i;if(!e&&"function"==typeof(r=t.toString)&&!isObject(i=r.call(t)))return i;throw TypeError("Can't convert object to primitive value")};

/***/ },

/***/ "./node_modules/core-js/library/modules/_property-desc.js":
/***/ function(module, exports) {

	module.exports=function(e,r){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:r}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-assign.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var getKeys=__webpack_require__("./node_modules/core-js/library/modules/_object-keys.js"),gOPS=__webpack_require__("./node_modules/core-js/library/modules/_object-gops.js"),pIE=__webpack_require__("./node_modules/core-js/library/modules/_object-pie.js"),toObject=__webpack_require__("./node_modules/core-js/library/modules/_to-object.js"),IObject=__webpack_require__("./node_modules/core-js/library/modules/_iobject.js"),$assign=Object.assign;module.exports=!$assign||__webpack_require__("./node_modules/core-js/library/modules/_fails.js")(function(){var e={},t={},r=Symbol(),s="abcdefghijklmnopqrst";return e[r]=7,s.split("").forEach(function(e){t[e]=e}),7!=$assign({},e)[r]||Object.keys($assign({},t)).join("")!=s})?function(e,t){for(var r=toObject(e),s=arguments.length,i=1,o=gOPS.f,c=pIE.f;s>i;)for(var n,a=IObject(arguments[i++]),g=o?getKeys(a).concat(o(a)):getKeys(a),b=g.length,j=0;b>j;)c.call(a,n=g[j++])&&(r[n]=a[n]);return r}:$assign;

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-keys.js":
/***/ function(module, exports, __webpack_require__) {

	var $keys=__webpack_require__("./node_modules/core-js/library/modules/_object-keys-internal.js"),enumBugKeys=__webpack_require__("./node_modules/core-js/library/modules/_enum-bug-keys.js");module.exports=Object.keys||function(e){return $keys(e,enumBugKeys)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-keys-internal.js":
/***/ function(module, exports, __webpack_require__) {

	var has=__webpack_require__("./node_modules/core-js/library/modules/_has.js"),toIObject=__webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js"),arrayIndexOf=__webpack_require__("./node_modules/core-js/library/modules/_array-includes.js")(!1),IE_PROTO=__webpack_require__("./node_modules/core-js/library/modules/_shared-key.js")("IE_PROTO");module.exports=function(r,e){var a,t=toIObject(r),u=0,O=[];for(a in t)a!=IE_PROTO&&has(t,a)&&O.push(a);for(;e.length>u;)has(t,a=e[u++])&&(~arrayIndexOf(O,a)||O.push(a));return O};

/***/ },

/***/ "./node_modules/core-js/library/modules/_has.js":
/***/ function(module, exports) {

	var hasOwnProperty={}.hasOwnProperty;module.exports=function(r,e){return hasOwnProperty.call(r,e)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_to-iobject.js":
/***/ function(module, exports, __webpack_require__) {

	var IObject=__webpack_require__("./node_modules/core-js/library/modules/_iobject.js"),defined=__webpack_require__("./node_modules/core-js/library/modules/_defined.js");module.exports=function(e){return IObject(defined(e))};

/***/ },

/***/ "./node_modules/core-js/library/modules/_iobject.js":
/***/ function(module, exports, __webpack_require__) {

	var cof=__webpack_require__("./node_modules/core-js/library/modules/_cof.js");module.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==cof(e)?e.split(""):Object(e)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_cof.js":
/***/ function(module, exports) {

	var toString={}.toString;module.exports=function(t){return toString.call(t).slice(8,-1)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_defined.js":
/***/ function(module, exports) {

	module.exports=function(o){if(void 0==o)throw TypeError("Can't call method on  "+o);return o};

/***/ },

/***/ "./node_modules/core-js/library/modules/_array-includes.js":
/***/ function(module, exports, __webpack_require__) {

	var toIObject=__webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js"),toLength=__webpack_require__("./node_modules/core-js/library/modules/_to-length.js"),toIndex=__webpack_require__("./node_modules/core-js/library/modules/_to-index.js");module.exports=function(e){return function(t,r,n){var o,i=toIObject(t),u=toLength(i.length),f=toIndex(n,u);if(e&&r!=r){for(;u>f;)if(o=i[f++],o!=o)return!0}else for(;u>f;f++)if((e||f in i)&&i[f]===r)return e||f||0;return!e&&-1}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_to-length.js":
/***/ function(module, exports, __webpack_require__) {

	var toInteger=__webpack_require__("./node_modules/core-js/library/modules/_to-integer.js"),min=Math.min;module.exports=function(e){return e>0?min(toInteger(e),9007199254740991):0};

/***/ },

/***/ "./node_modules/core-js/library/modules/_to-integer.js":
/***/ function(module, exports) {

	var ceil=Math.ceil,floor=Math.floor;module.exports=function(o){return isNaN(o=+o)?0:(o>0?floor:ceil)(o)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_to-index.js":
/***/ function(module, exports, __webpack_require__) {

	var toInteger=__webpack_require__("./node_modules/core-js/library/modules/_to-integer.js"),max=Math.max,min=Math.min;module.exports=function(e,t){return e=toInteger(e),e<0?max(e+t,0):min(e,t)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_shared-key.js":
/***/ function(module, exports, __webpack_require__) {

	var shared=__webpack_require__("./node_modules/core-js/library/modules/_shared.js")("keys"),uid=__webpack_require__("./node_modules/core-js/library/modules/_uid.js");module.exports=function(e){return shared[e]||(shared[e]=uid(e))};

/***/ },

/***/ "./node_modules/core-js/library/modules/_shared.js":
/***/ function(module, exports, __webpack_require__) {

	var global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),SHARED="__core-js_shared__",store=global[SHARED]||(global[SHARED]={});module.exports=function(o){return store[o]||(store[o]={})};

/***/ },

/***/ "./node_modules/core-js/library/modules/_uid.js":
/***/ function(module, exports) {

	var id=0,px=Math.random();module.exports=function(o){return"Symbol(".concat(void 0===o?"":o,")_",(++id+px).toString(36))};

/***/ },

/***/ "./node_modules/core-js/library/modules/_enum-bug-keys.js":
/***/ function(module, exports) {

	module.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-gops.js":
/***/ function(module, exports) {

	exports.f=Object.getOwnPropertySymbols;

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-pie.js":
/***/ function(module, exports) {

	exports.f={}.propertyIsEnumerable;

/***/ },

/***/ "./node_modules/core-js/library/modules/_to-object.js":
/***/ function(module, exports, __webpack_require__) {

	var defined=__webpack_require__("./node_modules/core-js/library/modules/_defined.js");module.exports=function(e){return Object(defined(e))};

/***/ },

/***/ "./src/LocalStorage.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getParser(e){return config.parser[e||getCategory()]}function setParser(e){config.parser[e.category.id]=e.id,writeConfig()}function getCategory(){return config.category}function setCategory(e){config.category=e,writeConfig()}function getParserSettings(e){return config.parserSettings[e]||{}}function setParserSettings(e,t){config.parserSettings[e]=t,writeConfig()}function setVisualizationSettings(e,t){config.visualizationSettings[e]=t,writeConfig()}function getVisualizationSettings(e,t){return config.visualizationSettings[e]||t||{}}Object.defineProperty(exports,"__esModule",{value:!0});var _stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_assign=__webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js"),_assign2=_interopRequireDefault(_assign);exports.getParser=getParser,exports.setParser=setParser,exports.getCategory=getCategory,exports.setCategory=setCategory,exports.getParserSettings=getParserSettings,exports.setParserSettings=setParserSettings,exports.setVisualizationSettings=setVisualizationSettings,exports.getVisualizationSettings=getVisualizationSettings;var storage=global.localStorage,defaultConfig={parser:{},parserSettings:{},visualizationSettings:{},category:"javascript"},config=storage?JSON.parse(storage.getItem("explorerSettings")||"0")||{}:{};config=(0,_assign2["default"])(defaultConfig,config);var writeConfig=storage?function(){return storage.setItem("explorerSettings",(0,_stringify2["default"])(config))}:function(){},_config=config,parser=_config.parser;null!=parser&&"string"!=typeof parser||(config.parser={},writeConfig());
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-runtime/core-js/json/stringify.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/json/stringify.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/json/stringify.js":
/***/ function(module, exports, __webpack_require__) {

	var core=__webpack_require__("./node_modules/core-js/library/modules/_core.js"),$JSON=core.JSON||(core.JSON={stringify:JSON.stringify});module.exports=function(r){return $JSON.stringify.apply($JSON,arguments)};

/***/ },

/***/ "./src/store/sagas.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function updateHashWithIDAndRevision(e,t){global.location.hash="/"+e+(t&&0!==t?"/"+t:"")}function getParserForCategory(e){var t=(0,_parsers.getParserByID)(LocalStorage.getParser(e.id))||(0,_parsers.getDefaultParser)(e);return t.category!==e&&(t=(0,_parsers.getDefaultParser)(e)),t}function getParserSettingsForParser(e){return LocalStorage.getParserSettings(e.id)||{}}function save(e){var t,r,a,n,s,c,o,i,f;return _regenerator2["default"].wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,[(0,_effects.select)(getSnippet),(0,_effects.select)(getParser),(0,_effects.select)(getCode),(0,_effects.select)(getTransformerCode),(0,_effects.select)(getTransformer)];case 2:return t=u.sent,r=(0,_slicedToArray3["default"])(t,5),a=r[0],n=r[1],s=r[2],c=r[3],o=r[4],!e&&a||(a=new _Snippet2["default"]),i={parserID:n.id},s!==n.category.codeExample&&(i.code=s),o&&(i.toolID=o.id),c&&c!==o.defaultTransform&&(i.transform=c),u.prev=14,u.next=17,a.createNewRevision(i);case 17:f=u.sent,f&&updateHashWithIDAndRevision(a.id,f.revisionNumber),u.next=25;break;case 21:return u.prev=21,u.t0=u["catch"](14),u.next=25,(0,_effects.put)(actions.setError(u.t0));case 25:case"end":return u.stop()}},_marked[0],this,[[14,21]])}function getParser(e){return e.parser}function getCode(e){return e.code}function isSaving(e){return e.saving}function isForking(e){return e.forking}function getSnippet(e){return e.selectedSnippet}function getTransformer(e){return e.transform.transformer}function getTransformerCode(e){return e.transform.code}function watchSave(){var e,t;return _regenerator2["default"].wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=3,(0,_effects.take)(actions.SAVE);case 3:return e=r.sent,t=e.fork,r.next=7,(0,_effects.put)(actions.startSave(t));case 7:return r.delegateYield(save(t),"t0",8);case 8:return r.next=10,(0,_effects.put)(actions.endSave(t));case 10:r.next=0;break;case 12:case"end":return r.stop()}},_marked[1],this)}function watchCategoryChange(){var e,t,r;return _regenerator2["default"].wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=3,(0,_effects.take)(actions.SELECT_CATEGORY);case 3:return e=a.sent,t=e.category,r=getParserForCategory(t),a.next=8,(0,_effects.put)((0,_reduxBatchedActions.batchActions)([actions.setWorkbenchState({parser:r,parserSettings:getParserSettingsForParser(r)}),actions.clearSnippet()]));case 8:a.next=0;break;case 10:case"end":return a.stop()}},_marked[2],this)}function watchSnippetChange(){var e,t,r,a,n,s;return _regenerator2["default"].wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=3,(0,_effects.take)(actions.SET_SNIPPET);case 3:return e=c.sent,t=e.snippet,r=e.revision,a=(0,_getDataFromRevision4["default"])(r),n=a.parser,s=a.code,c.next=11,(0,_effects.put)((0,_reduxBatchedActions.batchActions)([actions.setWorkbenchState({parser:n,parserSettings:getParserSettingsForParser(n),code:s}),actions.setSnippet(t,r)]));case 11:c.next=0;break;case 13:case"end":return c.stop()}},_marked[3],this)}function watchSnippetURI(){var e,t,r,a,n,s,c,o,i,f,u;return _regenerator2["default"].wrap(function(p){for(;;)switch(p.prev=p.next){case 0:return p.next=3,(0,_effects.take)(actions.LOAD_SNIPPET);case 3:return p.next=5,[(0,_effects.select)(isSaving),(0,_effects.select)(isForking)];case 5:if(e=p.sent,t=e.saving,r=e.forking,!t&&!r){p.next=10;break}return p.abrupt("continue",0);case 10:return p.next=12,(0,_effects.put)((0,_reduxBatchedActions.batchActions)([actions.setError(null),actions.startLoadingSnippet()]));case 12:return a=void 0,p.prev=13,p.next=16,(0,_effects.call)(_Snippet2["default"].fetchFromURL);case 16:a=p.sent,p.next=24;break;case 19:return p.prev=19,p.t0=p["catch"](13),p.next=23,(0,_effects.put)((0,_reduxBatchedActions.batchActions)([actions.setError(new Error("Failed to fetch revision: "+p.t0.message)),actions.doneLoadingSnippet()]));case 23:return p.abrupt("continue",0);case 24:if(!a){p.next=34;break}return n=(0,_getDataFromRevision4["default"])(a.revision),s=n.parser,c=n.code,o=n.transformer,i=n.transformCode,p.next=32,(0,_effects.put)((0,_reduxBatchedActions.batchActions)([actions.setSnippet(a.snippet,a.revision),actions.setWorkbenchState({code:c,parser:s,parserSettings:getParserSettingsForParser(s)}),actions.doneLoadingSnippet(),o?actions.setTransformState({transformer:o,code:i}):actions.hideTransformer()]));case 32:p.next=40;break;case 34:return p.next=36,(0,_effects.select)(getParser);case 36:return f=p.sent,u=f.category.codeExample,p.next=40,(0,_effects.put)((0,_reduxBatchedActions.batchActions)([actions.clearSnippet(),actions.setWorkbenchState({code:u}),actions.doneLoadingSnippet()]));case 40:p.next=0;break;case 42:case"end":return p.stop()}},_marked[4],this,[[13,19]])}function watchSelectTransformer(){var e,t,r,a,n;return _regenerator2["default"].wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=3,(0,_effects.take)(actions.SELECT_TRANSFORMER);case 3:return e=s.sent,t=e.transformer,s.next=7,(0,_effects.put)(actions.startLoadingSnippet());case 7:if(s.t0=(0,_parsers.getParserByID)(t.defaultParserID),s.t0){s.next=12;break}return s.next=11,(0,_effects.select)(getParser);case 11:s.t0=s.sent;case 12:return r=s.t0,a=t.defaultTransform,n=[actions.setTransformState({transformer:t,code:a}),actions.doneLoadingSnippet()],s.t1=r,s.next=18,(0,_effects.select)(getParser);case 18:if(s.t2=s.sent,s.t1===s.t2){s.next=21;break}n.push(actions.setWorkbenchState({parser:r,parserSettings:getParserSettingsForParser(r)}));case 21:return s.next=23,(0,_effects.put)((0,_reduxBatchedActions.batchActions)(n));case 23:s.next=0;break;case 25:case"end":return s.stop()}},_marked[5],this)}function watchDropText(){var e,t,r,a;return _regenerator2["default"].wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=3,(0,_effects.take)(actions.DROP_TEXT);case 3:return e=n.sent,t=e.categoryId,n.next=7,(0,_effects.select)(getParser);case 7:if(r=n.sent,r.category.id===t){n.next=12;break}return a=getParserForCategory((0,_parsers.getCategoryByID)(t)),n.next=12,(0,_effects.put)(actions.setWorkbenchState({parser:a,parserSettings:getParserSettingsForParser(a)}));case 12:n.next=0;break;case 14:case"end":return n.stop()}},_marked[6],this)}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=__webpack_require__("./node_modules/babel-runtime/regenerator/index.js"),_regenerator2=_interopRequireDefault(_regenerator),_slicedToArray2=__webpack_require__("./node_modules/babel-runtime/helpers/slicedToArray.js"),_slicedToArray3=_interopRequireDefault(_slicedToArray2);exports.getParser=getParser,exports.getCode=getCode,exports.isSaving=isSaving,exports.isForking=isForking,exports.getSnippet=getSnippet,exports.getTransformer=getTransformer,exports.getTransformerCode=getTransformerCode,exports.watchSave=watchSave,exports.watchCategoryChange=watchCategoryChange,exports.watchSnippetChange=watchSnippetChange,exports.watchSnippetURI=watchSnippetURI,exports.watchSelectTransformer=watchSelectTransformer,exports.watchDropText=watchDropText;var _actions=__webpack_require__("./src/store/actions.js"),actions=_interopRequireWildcard(_actions),_effects=__webpack_require__("./node_modules/redux-saga/effects.js"),_LocalStorage=__webpack_require__("./src/LocalStorage.js"),LocalStorage=_interopRequireWildcard(_LocalStorage),_parsers=__webpack_require__("./src/parsers/index.js"),_reduxBatchedActions=__webpack_require__("./node_modules/redux-batched-actions/lib/index.js"),_getDataFromRevision3=__webpack_require__("./src/store/getDataFromRevision.js"),_getDataFromRevision4=_interopRequireDefault(_getDataFromRevision3),_Snippet=__webpack_require__("./src/Snippet.js"),_Snippet2=_interopRequireDefault(_Snippet),_marked=[save,watchSave,watchCategoryChange,watchSnippetChange,watchSnippetURI,watchSelectTransformer,watchDropText].map(_regenerator2["default"].mark);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-runtime/regenerator/index.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/regenerator-runtime/runtime-module.js");

/***/ },

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var g="object"==typeof global?global:"object"==typeof window?window:"object"==typeof self?self:this,hadRuntime=g.regeneratorRuntime&&Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime")>=0,oldRuntime=hadRuntime&&g.regeneratorRuntime;if(g.regeneratorRuntime=void 0,module.exports=__webpack_require__("./node_modules/regenerator-runtime/runtime.js"),hadRuntime)g.regeneratorRuntime=oldRuntime;else try{delete g.regeneratorRuntime}catch(e){g.regeneratorRuntime=void 0}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/regenerator-runtime/runtime.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {!function(t){"use strict";function r(t,r,e,o){var i=Object.create((r||n).prototype),a=new h(o||[]);return i._invoke=f(t,e,a),i}function e(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(n){return{type:"throw",arg:n}}}function n(){}function o(){}function i(){}function a(t){["next","throw","return"].forEach(function(r){t[r]=function(t){return this._invoke(r,t)}})}function c(t){this.arg=t}function u(t){function r(n,o,i,a){var u=e(t[n],t,o);if("throw"!==u.type){var f=u.arg,l=f.value;return l instanceof c?Promise.resolve(l.arg).then(function(t){r("next",t,i,a)},function(t){r("throw",t,i,a)}):Promise.resolve(l).then(function(t){f.value=t,i(f)},a)}a(u.arg)}function n(t,e){function n(){return new Promise(function(n,o){r(t,e,n,o)})}return o=o?o.then(n,n):n()}"object"==typeof process&&process.domain&&(r=process.domain.bind(r));var o;this._invoke=n}function f(t,r,n){var o=b;return function(i,a){if(o===j)throw new Error("Generator is already running");if(o===_){if("throw"===i)throw a;return y()}for(;;){var c=n.delegate;if(c){if("return"===i||"throw"===i&&c.iterator[i]===v){n.delegate=null;var u=c.iterator["return"];if(u){var f=e(u,c.iterator,a);if("throw"===f.type){i="throw",a=f.arg;continue}}if("return"===i)continue}var f=e(c.iterator[i],c.iterator,a);if("throw"===f.type){n.delegate=null,i="throw",a=f.arg;continue}i="next",a=v;var l=f.arg;if(!l.done)return o=E,l;n[c.resultName]=l.value,n.next=c.nextLoc,n.delegate=null}if("next"===i)n.sent=n._sent=a;else if("throw"===i){if(o===b)throw o=_,a;n.dispatchException(a)&&(i="next",a=v)}else"return"===i&&n.abrupt("return",a);o=j;var f=e(t,r,n);if("normal"===f.type){o=n.done?_:E;var l={value:f.arg,done:n.done};if(f.arg!==k)return l;n.delegate&&"next"===i&&(a=v)}else"throw"===f.type&&(o=_,i="throw",a=f.arg)}}}function l(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function s(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function h(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(l,this),this.reset(!0)}function p(t){if(t){var r=t[w];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,n=function o(){for(;++e<t.length;)if(g.call(t,e))return o.value=t[e],o.done=!1,o;return o.value=v,o.done=!0,o};return n.next=n}}return{next:y}}function y(){return{value:v,done:!0}}var v,g=Object.prototype.hasOwnProperty,d="function"==typeof Symbol?Symbol:{},w=d.iterator||"@@iterator",m=d.toStringTag||"@@toStringTag",L="object"==typeof module,x=t.regeneratorRuntime;if(x)return void(L&&(module.exports=x));x=t.regeneratorRuntime=L?module.exports:{},x.wrap=r;var b="suspendedStart",E="suspendedYield",j="executing",_="completed",k={},G=i.prototype=n.prototype;o.prototype=G.constructor=i,i.constructor=o,i[m]=o.displayName="GeneratorFunction",x.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===o||"GeneratorFunction"===(r.displayName||r.name))},x.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,i):(t.__proto__=i,m in t||(t[m]="GeneratorFunction")),t.prototype=Object.create(G),t},x.awrap=function(t){return new c(t)},a(u.prototype),x.async=function(t,e,n,o){var i=new u(r(t,e,n,o));return x.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},a(G),G[w]=function(){return this},G[m]="Generator",G.toString=function(){return"[object Generator]"},x.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function n(){for(;r.length;){var e=r.pop();if(e in t)return n.value=e,n.done=!1,n}return n.done=!0,n}},x.values=p,h.prototype={constructor:h,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=v,this.done=!1,this.delegate=null,this.tryEntries.forEach(s),!t)for(var r in this)"t"===r.charAt(0)&&g.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=v)},stop:function(){this.done=!0;var t=this.tryEntries[0],r=t.completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(t){function r(r,n){return i.type="throw",i.arg=t,e.next=r,!!n}if(this.done)throw t;for(var e=this,n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var a=g.call(o,"catchLoc"),c=g.call(o,"finallyLoc");if(a&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&g.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=r&&r<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=r,o?this.next=o.finallyLoc:this.complete(i),k},complete:function(t,r){if("throw"===t.type)throw t.arg;"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=t.arg,this.next="end"):"normal"===t.type&&r&&(this.next=r)},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),s(e),k}},"catch":function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;s(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:p(t),resultName:r,nextLoc:e},k}}}("object"==typeof global?global:"object"==typeof window?window:"object"==typeof self?self:this);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./node_modules/babel-runtime/helpers/slicedToArray.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _isIterable2=__webpack_require__("./node_modules/babel-runtime/core-js/is-iterable.js"),_isIterable3=_interopRequireDefault(_isIterable2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2);exports["default"]=function(){function e(e,r){var t=[],a=!0,i=!1,u=void 0;try{for(var n,o=(0,_getIterator3["default"])(e);!(a=(n=o.next()).done)&&(t.push(n.value),!r||t.length!==r);a=!0);}catch(l){i=!0,u=l}finally{try{!a&&o["return"]&&o["return"]()}finally{if(i)throw u}}return t}return function(r,t){if(Array.isArray(r))return r;if((0,_isIterable3["default"])(Object(r)))return e(r,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();

/***/ },

/***/ "./node_modules/babel-runtime/core-js/is-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/is-iterable.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/is-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/core.is-iterable.js");

/***/ },

/***/ "./node_modules/core-js/library/modules/web.dom.iterable.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.array.iterator.js");for(var global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),hide=__webpack_require__("./node_modules/core-js/library/modules/_hide.js"),Iterators=__webpack_require__("./node_modules/core-js/library/modules/_iterators.js"),TO_STRING_TAG=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("toStringTag"),collections=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],i=0;i<5;i++){var NAME=collections[i],Collection=global[NAME],proto=Collection&&Collection.prototype;proto&&!proto[TO_STRING_TAG]&&hide(proto,TO_STRING_TAG,NAME),Iterators[NAME]=Iterators.Array}

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.array.iterator.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var addToUnscopables=__webpack_require__("./node_modules/core-js/library/modules/_add-to-unscopables.js"),step=__webpack_require__("./node_modules/core-js/library/modules/_iter-step.js"),Iterators=__webpack_require__("./node_modules/core-js/library/modules/_iterators.js"),toIObject=__webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js");module.exports=__webpack_require__("./node_modules/core-js/library/modules/_iter-define.js")(Array,"Array",function(e,t){this._t=toIObject(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,s=this._i++;return!e||s>=e.length?(this._t=void 0,step(1)):"keys"==t?step(0,s):"values"==t?step(0,e[s]):step(0,[s,e[s]])},"values"),Iterators.Arguments=Iterators.Array,addToUnscopables("keys"),addToUnscopables("values"),addToUnscopables("entries");

/***/ },

/***/ "./node_modules/core-js/library/modules/_add-to-unscopables.js":
/***/ function(module, exports) {

	module.exports=function(){};

/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-step.js":
/***/ function(module, exports) {

	module.exports=function(e,n){return{value:n,done:!!e}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_iterators.js":
/***/ function(module, exports) {

	module.exports={};

/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-define.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var LIBRARY=__webpack_require__("./node_modules/core-js/library/modules/_library.js"),$export=__webpack_require__("./node_modules/core-js/library/modules/_export.js"),redefine=__webpack_require__("./node_modules/core-js/library/modules/_redefine.js"),hide=__webpack_require__("./node_modules/core-js/library/modules/_hide.js"),has=__webpack_require__("./node_modules/core-js/library/modules/_has.js"),Iterators=__webpack_require__("./node_modules/core-js/library/modules/_iterators.js"),$iterCreate=__webpack_require__("./node_modules/core-js/library/modules/_iter-create.js"),setToStringTag=__webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js"),getPrototypeOf=__webpack_require__("./node_modules/core-js/library/modules/_object-gpo.js"),ITERATOR=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("iterator"),BUGGY=!([].keys&&"next"in[].keys()),FF_ITERATOR="@@iterator",KEYS="keys",VALUES="values",returnThis=function(){return this};module.exports=function(e,r,t,i,n,o,s){$iterCreate(t,r,i);var u,a,T,R=function(e){if(!BUGGY&&e in h)return h[e];switch(e){case KEYS:return function(){return new t(this,e)};case VALUES:return function(){return new t(this,e)}}return function(){return new t(this,e)}},A=r+" Iterator",c=n==VALUES,f=!1,h=e.prototype,E=h[ITERATOR]||h[FF_ITERATOR]||n&&h[n],I=E||R(n),p=n?c?R("entries"):I:void 0,_="Array"==r?h.entries||E:E;if(_&&(T=getPrototypeOf(_.call(new e)),T!==Object.prototype&&(setToStringTag(T,A,!0),LIBRARY||has(T,ITERATOR)||hide(T,ITERATOR,returnThis))),c&&E&&E.name!==VALUES&&(f=!0,I=function(){return E.call(this)}),LIBRARY&&!s||!BUGGY&&!f&&h[ITERATOR]||hide(h,ITERATOR,I),Iterators[r]=I,Iterators[A]=returnThis,n)if(u={values:c?I:R(VALUES),keys:o?I:R(KEYS),entries:p},s)for(a in u)a in h||redefine(h,a,u[a]);else $export($export.P+$export.F*(BUGGY||f),r,u);return u};

/***/ },

/***/ "./node_modules/core-js/library/modules/_library.js":
/***/ function(module, exports) {

	module.exports=!0;

/***/ },

/***/ "./node_modules/core-js/library/modules/_redefine.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/core-js/library/modules/_hide.js");

/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-create.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var create=__webpack_require__("./node_modules/core-js/library/modules/_object-create.js"),descriptor=__webpack_require__("./node_modules/core-js/library/modules/_property-desc.js"),setToStringTag=__webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js"),IteratorPrototype={};__webpack_require__("./node_modules/core-js/library/modules/_hide.js")(IteratorPrototype,__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("iterator"),function(){return this}),module.exports=function(r,t,e){r.prototype=create(IteratorPrototype,{next:descriptor(1,e)}),setToStringTag(r,t+" Iterator")};

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-create.js":
/***/ function(module, exports, __webpack_require__) {

	var anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),dPs=__webpack_require__("./node_modules/core-js/library/modules/_object-dps.js"),enumBugKeys=__webpack_require__("./node_modules/core-js/library/modules/_enum-bug-keys.js"),IE_PROTO=__webpack_require__("./node_modules/core-js/library/modules/_shared-key.js")("IE_PROTO"),Empty=function(){},PROTOTYPE="prototype",createDict=function(){var e,t=__webpack_require__("./node_modules/core-js/library/modules/_dom-create.js")("iframe"),r=enumBugKeys.length,c="<",n=">";for(t.style.display="none",__webpack_require__("./node_modules/core-js/library/modules/_html.js").appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(c+"script"+n+"document.F=Object"+c+"/script"+n),e.close(),createDict=e.F;r--;)delete createDict[PROTOTYPE][enumBugKeys[r]];return createDict()};module.exports=Object.create||function(e,t){var r;return null!==e?(Empty[PROTOTYPE]=anObject(e),r=new Empty,Empty[PROTOTYPE]=null,r[IE_PROTO]=e):r=createDict(),void 0===t?r:dPs(r,t)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-dps.js":
/***/ function(module, exports, __webpack_require__) {

	var dP=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js"),anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),getKeys=__webpack_require__("./node_modules/core-js/library/modules/_object-keys.js");module.exports=__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js")?Object.defineProperties:function(e,r){anObject(e);for(var t,o=getKeys(r),c=o.length,i=0;c>i;)dP.f(e,t=o[i++],r[t]);return e};

/***/ },

/***/ "./node_modules/core-js/library/modules/_html.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/core-js/library/modules/_global.js").document&&document.documentElement;

/***/ },

/***/ "./node_modules/core-js/library/modules/_set-to-string-tag.js":
/***/ function(module, exports, __webpack_require__) {

	var def=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f,has=__webpack_require__("./node_modules/core-js/library/modules/_has.js"),TAG=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("toStringTag");module.exports=function(e,r,o){e&&!has(e=o?e:e.prototype,TAG)&&def(e,TAG,{configurable:!0,value:r})};

/***/ },

/***/ "./node_modules/core-js/library/modules/_wks.js":
/***/ function(module, exports, __webpack_require__) {

	var store=__webpack_require__("./node_modules/core-js/library/modules/_shared.js")("wks"),uid=__webpack_require__("./node_modules/core-js/library/modules/_uid.js"),Symbol=__webpack_require__("./node_modules/core-js/library/modules/_global.js").Symbol,USE_SYMBOL="function"==typeof Symbol,$exports=module.exports=function(o){return store[o]||(store[o]=USE_SYMBOL&&Symbol[o]||(USE_SYMBOL?Symbol:uid)("Symbol."+o))};$exports.store=store;

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-gpo.js":
/***/ function(module, exports, __webpack_require__) {

	var has=__webpack_require__("./node_modules/core-js/library/modules/_has.js"),toObject=__webpack_require__("./node_modules/core-js/library/modules/_to-object.js"),IE_PROTO=__webpack_require__("./node_modules/core-js/library/modules/_shared-key.js")("IE_PROTO"),ObjectProto=Object.prototype;module.exports=Object.getPrototypeOf||function(t){return t=toObject(t),has(t,IE_PROTO)?t[IE_PROTO]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?ObjectProto:null};

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var $at=__webpack_require__("./node_modules/core-js/library/modules/_string-at.js")(!0);__webpack_require__("./node_modules/core-js/library/modules/_iter-define.js")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,i=this._t,e=this._i;return e>=i.length?{value:void 0,done:!0}:(t=$at(i,e),this._i+=t.length,{value:t,done:!1})});

/***/ },

/***/ "./node_modules/core-js/library/modules/_string-at.js":
/***/ function(module, exports, __webpack_require__) {

	var toInteger=__webpack_require__("./node_modules/core-js/library/modules/_to-integer.js"),defined=__webpack_require__("./node_modules/core-js/library/modules/_defined.js");module.exports=function(e){return function(r,t){var n,i,d=String(defined(r)),o=toInteger(t),u=d.length;return o<0||o>=u?e?"":void 0:(n=d.charCodeAt(o),n<55296||n>56319||o+1===u||(i=d.charCodeAt(o+1))<56320||i>57343?e?d.charAt(o):n:e?d.slice(o,o+2):(n-55296<<10)+(i-56320)+65536)}};

/***/ },

/***/ "./node_modules/core-js/library/modules/core.is-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	var classof=__webpack_require__("./node_modules/core-js/library/modules/_classof.js"),ITERATOR=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("iterator"),Iterators=__webpack_require__("./node_modules/core-js/library/modules/_iterators.js");module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").isIterable=function(r){var e=Object(r);return void 0!==e[ITERATOR]||"@@iterator"in e||Iterators.hasOwnProperty(classof(e))};

/***/ },

/***/ "./node_modules/core-js/library/modules/_classof.js":
/***/ function(module, exports, __webpack_require__) {

	var cof=__webpack_require__("./node_modules/core-js/library/modules/_cof.js"),TAG=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("toStringTag"),ARG="Arguments"==cof(function(){return arguments}()),tryGet=function(t,e){try{return t[e]}catch(r){}};module.exports=function(t){var e,r,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=tryGet(e=Object(t),TAG))?r:ARG?cof(e):"Object"==(n=cof(e))&&"function"==typeof e.callee?"Arguments":n};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/get-iterator.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/get-iterator.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/get-iterator.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/core.get-iterator.js");

/***/ },

/***/ "./node_modules/core-js/library/modules/core.get-iterator.js":
/***/ function(module, exports, __webpack_require__) {

	var anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),get=__webpack_require__("./node_modules/core-js/library/modules/core.get-iterator-method.js");module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").getIterator=function(e){var r=get(e);if("function"!=typeof r)throw TypeError(e+" is not iterable!");return anObject(r.call(e))};

/***/ },

/***/ "./node_modules/core-js/library/modules/core.get-iterator-method.js":
/***/ function(module, exports, __webpack_require__) {

	var classof=__webpack_require__("./node_modules/core-js/library/modules/_classof.js"),ITERATOR=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("iterator"),Iterators=__webpack_require__("./node_modules/core-js/library/modules/_iterators.js");module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").getIteratorMethod=function(r){if(void 0!=r)return r[ITERATOR]||r["@@iterator"]||Iterators[classof(r)]};

/***/ },

/***/ "./src/store/actions.js":
/***/ function(module, exports) {

	"use strict";function setParserSettings(e){return{type:SET_PARSER_SETTINGS,settings:e}}function save(){var e=!(arguments.length<=0||void 0===arguments[0])&&arguments[0];return{type:SAVE,fork:e}}function startSave(e){return{type:START_SAVE,fork:e}}function endSave(e){return{type:END_SAVE,fork:e}}function setSnippet(e,t){return{type:SET_SNIPPET,snippet:e,revision:t}}function setParseError(e){return{type:SET_PARSE_ERROR,error:e}}function selectCategory(e){return{type:SELECT_CATEGORY,category:e}}function clearSnippet(){return{type:CLEAR_SNIPPET}}function startLoadingSnippet(){return{type:START_LOADING_SNIPPET}}function doneLoadingSnippet(){return{type:DONE_LOADING_SNIPPET}}function loadSnippet(){return{type:LOAD_SNIPPET}}function openSettingsDialog(){return{type:OPEN_SETTINGS_DIALOG}}function closeSettingsDialog(){return{type:CLOSE_SETTINGS_DIALOG}}function setError(e){return{type:SET_ERROR,error:e}}function selectTransformer(e){return{type:SELECT_TRANSFORMER,transformer:e}}function hideTransformer(){return{type:HIDE_TRANSFORMER}}function setTransformState(e){return{type:SET_TRANSFORM,state:e}}function setWorkbenchState(e){return{type:SET_WORKBENCH_STATE,state:e}}function dropText(e,t){return{type:DROP_TEXT,text:e,categoryId:t}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.setParserSettings=setParserSettings,exports.save=save,exports.startSave=startSave,exports.endSave=endSave,exports.setSnippet=setSnippet,exports.setParseError=setParseError,exports.selectCategory=selectCategory,exports.clearSnippet=clearSnippet,exports.startLoadingSnippet=startLoadingSnippet,exports.doneLoadingSnippet=doneLoadingSnippet,exports.loadSnippet=loadSnippet,exports.openSettingsDialog=openSettingsDialog,exports.closeSettingsDialog=closeSettingsDialog,exports.setError=setError,exports.selectTransformer=selectTransformer,exports.hideTransformer=hideTransformer,exports.setTransformState=setTransformState,exports.setWorkbenchState=setWorkbenchState,exports.dropText=dropText;var SET_ERROR=exports.SET_ERROR="SET_ERROR",LOAD_SNIPPET=exports.LOAD_SNIPPET="LOAD_SNIPPET",START_LOADING_SNIPPET=exports.START_LOADING_SNIPPET="START_LOADING_SNIPPET",DONE_LOADING_SNIPPET=exports.DONE_LOADING_SNIPPET="DONE_LOADING_SNIPPET",CLEAR_SNIPPET=exports.CLEAR_SNIPPET="CLEAR_SNIPPET",SELECT_CATEGORY=exports.SELECT_CATEGORY="CHANGE_CATEGORY",SELECT_TRANSFORMER=exports.SELECT_TRANSFORMER="SELECT_TRANSFORMER",HIDE_TRANSFORMER=exports.HIDE_TRANSFORMER="HIDE_TRANSFORMER",SET_TRANSFORM=exports.SET_TRANSFORM="SET_TRANSFORM",SET_PARSER_SETTINGS=exports.SET_PARSER_SETTINGS="SET_PARSER_SETTINGS",SET_PARSE_ERROR=exports.SET_PARSE_ERROR="SET_PARSE_ERROR",SET_SNIPPET=exports.SET_SNIPPET="SET_SNIPPET",OPEN_SETTINGS_DIALOG=exports.OPEN_SETTINGS_DIALOG="OPEN_SETTINGS_DIALOG",CLOSE_SETTINGS_DIALOG=exports.CLOSE_SETTINGS_DIALOG="CLOSE_SETTINGS_DIALOG",SET_WORKBENCH_STATE=exports.SET_WORKBENCH_STATE="SET_WORKBENCH_STATE",DROP_TEXT=exports.DROP_TEXT="DROP_TEXT",SAVE=exports.SAVE="SAVE",START_SAVE=exports.START_SAVE="START_SAVE",END_SAVE=exports.END_SAVE="END_SAVE";

/***/ },

/***/ "./node_modules/redux-saga/effects.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/redux-saga/lib/effects.js");

/***/ },

/***/ "./node_modules/redux-saga/lib/effects.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.select=exports.cancel=exports.join=exports.fork=exports.cps=exports.apply=exports.call=exports.race=exports.put=exports.take=void 0;var _io=__webpack_require__("./node_modules/redux-saga/lib/internal/io.js");exports.take=_io.take,exports.put=_io.put,exports.race=_io.race,exports.call=_io.call,exports.apply=_io.apply,exports.cps=_io.cps,exports.fork=_io.fork,exports.join=_io.join,exports.cancel=_io.cancel,exports.select=_io.select;

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/io.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _defineProperty(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function matcher(t){return("*"===t?matchers.wildcard:_utils.is.array(t)?matchers.array:_utils.is.func(t)?matchers.predicate:matchers["default"])(t)}function take(t){if(arguments.length>0&&_utils.is.undef(t))throw new Error(INVALID_PATTERN);return effect(TAKE,_utils.is.undef(t)?"*":t)}function put(t){return effect(PUT,t)}function race(t){return effect(RACE,t)}function getFnCallDesc(t,e){(0,_utils.check)(t,_utils.is.notUndef,CALL_FUNCTION_ARG_ERROR);var r=null;if(_utils.is.array(t)){var n=t,o=_slicedToArray(n,2);r=o[0],t=o[1]}else if(t.fn){var u=t;r=u.context,t=u.fn}return(0,_utils.check)(t,_utils.is.func,CALL_FUNCTION_ARG_ERROR),{context:r,fn:t,args:e}}function call(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return effect(CALL,getFnCallDesc(t,r))}function apply(t,e){var r=arguments.length<=2||void 0===arguments[2]?[]:arguments[2];return effect(CALL,getFnCallDesc({context:t,fn:e},r))}function cps(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return effect(CPS,getFnCallDesc(t,r))}function fork(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return effect(FORK,getFnCallDesc(t,r))}function join(t){if(!isForkedTask(t))throw new Error(JOIN_ARG_ERROR);return effect(JOIN,t)}function cancel(t){if(!isForkedTask(t))throw new Error(CANCEL_ARG_ERROR);return effect(CANCEL,t)}function select(t){for(var e=arguments.length,r=Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return 0===arguments.length?t=_utils.ident:(0,_utils.check)(t,_utils.is.func,SELECT_ARG_ERROR),effect(SELECT,{selector:t,args:r})}Object.defineProperty(exports,"__esModule",{value:!0}),exports.asEffect=exports.SELECT_ARG_ERROR=exports.INVALID_PATTERN=exports.CANCEL_ARG_ERROR=exports.JOIN_ARG_ERROR=exports.FORK_ARG_ERROR=exports.CALL_FUNCTION_ARG_ERROR=void 0;var _slicedToArray=function(){function t(t,e){var r=[],n=!0,o=!1,u=void 0;try{for(var c,a=t[Symbol.iterator]();!(n=(c=a.next()).done)&&(r.push(c.value),!e||r.length!==e);n=!0);}catch(i){o=!0,u=i}finally{try{!n&&a["return"]&&a["return"]()}finally{if(o)throw u}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();exports.matcher=matcher,exports.take=take,exports.put=put,exports.race=race,exports.call=call,exports.apply=apply,exports.cps=cps,exports.fork=fork,exports.join=join,exports.cancel=cancel,exports.select=select;var _utils=__webpack_require__("./node_modules/redux-saga/lib/internal/utils.js"),CALL_FUNCTION_ARG_ERROR=exports.CALL_FUNCTION_ARG_ERROR="call/cps/fork first argument must be a function, an array [context, function] or an object {context, fn}",FORK_ARG_ERROR=exports.FORK_ARG_ERROR="fork first argument must be a generator function or an iterator",JOIN_ARG_ERROR=exports.JOIN_ARG_ERROR="join argument must be a valid task (a result of a fork)",CANCEL_ARG_ERROR=exports.CANCEL_ARG_ERROR="cancel argument must be a valid task (a result of a fork)",INVALID_PATTERN=exports.INVALID_PATTERN="Invalid pattern passed to `take` (HINT: check if you didn't mispell a constant)",SELECT_ARG_ERROR=exports.SELECT_ARG_ERROR="select first argument must be a function",IO=(0,_utils.sym)("IO"),TAKE="TAKE",PUT="PUT",RACE="RACE",CALL="CALL",CPS="CPS",FORK="FORK",JOIN="JOIN",CANCEL="CANCEL",SELECT="SELECT",effect=function(t,e){var r;return r={},_defineProperty(r,IO,!0),_defineProperty(r,t,e),r},matchers={wildcard:function(){return _utils.kTrue},"default":function(t){return function(e){return e.type===t}},array:function(t){return function(e){return t.some(function(t){return t===e.type})}},predicate:function(t){return function(e){return t(e)}}},isForkedTask=function(t){return t[_utils.TASK]},asEffect=exports.asEffect={take:function(t){return t&&t[IO]&&t[TAKE]},put:function(t){return t&&t[IO]&&t[PUT]},race:function(t){return t&&t[IO]&&t[RACE]},call:function(t){return t&&t[IO]&&t[CALL]},cps:function(t){return t&&t[IO]&&t[CPS]},fork:function(t){return t&&t[IO]&&t[FORK]},join:function(t){return t&&t[IO]&&t[JOIN]},cancel:function(t){return t&&t[IO]&&t[CANCEL]},select:function(t){return t&&t[IO]&&t[SELECT]}};

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/utils.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";function ident(e){return e}function check(e,r,n){if(!r(e))throw new Error(n)}function remove(e,r){var n=e.indexOf(r);n>=0&&e.splice(n,1)}function deferred(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=_extends({},e),n=new Promise(function(e,n){r.resolve=e,r.reject=n});return r.promise=n,r}function arrayOfDeffered(e){for(var r=[],n=0;n<e;n++)r.push(deferred());return r}function autoInc(){var e=arguments.length<=0||void 0===arguments[0]?0:arguments[0];return function(){return++e}}function asap(e){return Promise.resolve(1).then(function(){return e()})}function warnDeprecated(e){isDev&&console.warn("DEPRECATION WARNING",e)}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var n=arguments[r];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};exports.ident=ident,exports.check=check,exports.remove=remove,exports.deferred=deferred,exports.arrayOfDeffered=arrayOfDeffered,exports.autoInc=autoInc,exports.asap=asap,exports.warnDeprecated=warnDeprecated;var sym=exports.sym=function(e){return"@@redux-saga/"+e},TASK=exports.TASK=sym("TASK"),kTrue=exports.kTrue=function(){return!0},noop=exports.noop=function(){},isDev=exports.isDev="undefined"!=typeof process&&process.env&&"development"===("production"),is=exports.is={undef:function(e){return null===e||void 0===e},notUndef:function(e){return null!==e&&void 0!==e},func:function(e){return"function"==typeof e},array:Array.isArray,promise:function(e){return e&&is.func(e.then)},iterator:function(e){return e&&is.func(e.next)&&is.func(e["throw"])},task:function(e){return e&&e[TASK]}};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/process/browser.js")))

/***/ },

/***/ "./src/parsers/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getDefaultCategory(){return categoryByID.javascript}function getDefaultParser(){var e=arguments.length<=0||void 0===arguments[0]?getDefaultCategory():arguments[0];return e.parsers[0]}function getCategoryByID(e){return categoryByID[e]}function getParserByID(e){return parserByID[e]}function getTransformerByID(e){return transformerByID[e]}Object.defineProperty(exports,"__esModule",{value:!0}),exports.categories=void 0;var _slicedToArray2=__webpack_require__("./node_modules/babel-runtime/helpers/slicedToArray.js"),_slicedToArray3=_interopRequireDefault(_slicedToArray2),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set);exports.getDefaultCategory=getDefaultCategory,exports.getDefaultParser=getDefaultParser,exports.getCategoryByID=getCategoryByID,exports.getParserByID=getParserByID,exports.getTransformerByID=getTransformerByID;var localRequire=__webpack_require__(1),files=localRequire.keys().map(function(e){return e.split("/").slice(1)}),categoryByID={},parserByID={},transformerByID={},restrictedParserNames=new _set2["default"](["index.js","codeExample.txt","transformers","utils"]),categories=exports.categories=files.filter(function(e){return"index.js"===e[1]}).map(function(e){var r=(0,_slicedToArray3["default"])(e,1),t=r[0],a=localRequire("./"+t+"/index.js");categoryByID[a.id]=a,a.codeExample=localRequire("./"+t+"/codeExample.txt");var s=files.filter(function(e){var r=(0,_slicedToArray3["default"])(e,1),a=r[0];return a===t}).map(function(e){return e.slice(1)});return a.parsers=s.filter(function(e){var r=(0,_slicedToArray3["default"])(e,1),t=r[0];return!restrictedParserNames.has(t)}).map(function(e){var r=(0,_slicedToArray3["default"])(e,1),s=r[0],o=localRequire("./"+t+"/"+s);return o=o.__esModule?o["default"]:o,parserByID[o.id]=o,o.category=a,o}),a.transformers=s.filter(function(e){var r=(0,_slicedToArray3["default"])(e,3),t=r[0],a=r[2];return"transformers"===t&&"index.js"===a}).map(function(e){var r=(0,_slicedToArray3["default"])(e,2),a=r[1],s="./"+t+"/transformers/"+a,o=localRequire(s+"/index.js");return o=o.__esModule?o["default"]:o,transformerByID[o.id]=o,o.defaultTransform=localRequire(s+"/codeExample.txt"),o}),a});

/***/ },

/***/ "./node_modules/babel-runtime/core-js/set.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/set.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/set.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js"),__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.set.js"),__webpack_require__("./node_modules/core-js/library/modules/es7.set.to-json.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Set;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.to-string.js":
/***/ function(module, exports) {

	

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.set.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var strong=__webpack_require__("./node_modules/core-js/library/modules/_collection-strong.js");module.exports=__webpack_require__("./node_modules/core-js/library/modules/_collection.js")("Set",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return strong.def(this,t=0===t?0:t,t)}},strong);

/***/ },

/***/ "./node_modules/core-js/library/modules/_collection-strong.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var dP=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f,create=__webpack_require__("./node_modules/core-js/library/modules/_object-create.js"),redefineAll=__webpack_require__("./node_modules/core-js/library/modules/_redefine-all.js"),ctx=__webpack_require__("./node_modules/core-js/library/modules/_ctx.js"),anInstance=__webpack_require__("./node_modules/core-js/library/modules/_an-instance.js"),defined=__webpack_require__("./node_modules/core-js/library/modules/_defined.js"),forOf=__webpack_require__("./node_modules/core-js/library/modules/_for-of.js"),$iterDefine=__webpack_require__("./node_modules/core-js/library/modules/_iter-define.js"),step=__webpack_require__("./node_modules/core-js/library/modules/_iter-step.js"),setSpecies=__webpack_require__("./node_modules/core-js/library/modules/_set-species.js"),DESCRIPTORS=__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js"),fastKey=__webpack_require__("./node_modules/core-js/library/modules/_meta.js").fastKey,SIZE=DESCRIPTORS?"_s":"size",getEntry=function(e,t){var r,i=fastKey(t);if("F"!==i)return e._i[i];for(r=e._f;r;r=r.n)if(r.k==t)return r};module.exports={getConstructor:function(e,t,r,i){var n=e(function(e,f){anInstance(e,n,t,"_i"),e._i=create(null),e._f=void 0,e._l=void 0,e[SIZE]=0,void 0!=f&&forOf(f,r,e[i],e)});return redefineAll(n.prototype,{clear:function(){for(var e=this,t=e._i,r=e._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete t[r.i];e._f=e._l=void 0,e[SIZE]=0},"delete":function(e){var t=this,r=getEntry(t,e);if(r){var i=r.n,n=r.p;delete t._i[r.i],r.r=!0,n&&(n.n=i),i&&(i.p=n),t._f==r&&(t._f=i),t._l==r&&(t._l=n),t[SIZE]--}return!!r},forEach:function(e){anInstance(this,n,"forEach");for(var t,r=ctx(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.n:this._f;)for(r(t.v,t.k,this);t&&t.r;)t=t.p},has:function(e){return!!getEntry(this,e)}}),DESCRIPTORS&&dP(n.prototype,"size",{get:function(){return defined(this[SIZE])}}),n},def:function(e,t,r){var i,n,f=getEntry(e,t);return f?f.v=r:(e._l=f={i:n=fastKey(t,!0),k:t,v:r,p:i=e._l,n:void 0,r:!1},e._f||(e._f=f),i&&(i.n=f),e[SIZE]++,"F"!==n&&(e._i[n]=f)),e},getEntry:getEntry,setStrong:function(e,t,r){$iterDefine(e,t,function(e,t){this._t=e,this._k=t,this._l=void 0},function(){for(var e=this,t=e._k,r=e._l;r&&r.r;)r=r.p;return e._t&&(e._l=r=r?r.n:e._t._f)?"keys"==t?step(0,r.k):"values"==t?step(0,r.v):step(0,[r.k,r.v]):(e._t=void 0,step(1))},r?"entries":"values",!r,!0),setSpecies(t)}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_redefine-all.js":
/***/ function(module, exports, __webpack_require__) {

	var hide=__webpack_require__("./node_modules/core-js/library/modules/_hide.js");module.exports=function(e,r,i){for(var d in r)i&&e[d]?e[d]=r[d]:hide(e,d,r[d]);return e};

/***/ },

/***/ "./node_modules/core-js/library/modules/_an-instance.js":
/***/ function(module, exports) {

	module.exports=function(o,n,r,i){if(!(o instanceof n)||void 0!==i&&i in o)throw TypeError(r+": incorrect invocation!");return o};

/***/ },

/***/ "./node_modules/core-js/library/modules/_for-of.js":
/***/ function(module, exports, __webpack_require__) {

	var ctx=__webpack_require__("./node_modules/core-js/library/modules/_ctx.js"),call=__webpack_require__("./node_modules/core-js/library/modules/_iter-call.js"),isArrayIter=__webpack_require__("./node_modules/core-js/library/modules/_is-array-iter.js"),anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),toLength=__webpack_require__("./node_modules/core-js/library/modules/_to-length.js"),getIterFn=__webpack_require__("./node_modules/core-js/library/modules/core.get-iterator-method.js"),BREAK={},RETURN={},exports=module.exports=function(e,r,t,o,i){var n,a,R,c,l=i?function(){return e}:getIterFn(e),u=ctx(t,o,r?2:1),E=0;if("function"!=typeof l)throw TypeError(e+" is not iterable!");if(isArrayIter(l)){for(n=toLength(e.length);n>E;E++)if(c=r?u(anObject(a=e[E])[0],a[1]):u(e[E]),c===BREAK||c===RETURN)return c}else for(R=l.call(e);!(a=R.next()).done;)if(c=call(R,u,a.value,r),c===BREAK||c===RETURN)return c};exports.BREAK=BREAK,exports.RETURN=RETURN;

/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-call.js":
/***/ function(module, exports, __webpack_require__) {

	var anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js");module.exports=function(r,t,e,a){try{return a?t(anObject(e)[0],e[1]):t(e)}catch(c){var n=r["return"];throw void 0!==n&&anObject(n.call(r)),c}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_is-array-iter.js":
/***/ function(module, exports, __webpack_require__) {

	var Iterators=__webpack_require__("./node_modules/core-js/library/modules/_iterators.js"),ITERATOR=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("iterator"),ArrayProto=Array.prototype;module.exports=function(r){return void 0!==r&&(Iterators.Array===r||ArrayProto[ITERATOR]===r)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_set-species.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),core=__webpack_require__("./node_modules/core-js/library/modules/_core.js"),dP=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js"),DESCRIPTORS=__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js"),SPECIES=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("species");module.exports=function(e){var r="function"==typeof core[e]?core[e]:global[e];DESCRIPTORS&&r&&!r[SPECIES]&&dP.f(r,SPECIES,{configurable:!0,get:function(){return this}})};

/***/ },

/***/ "./node_modules/core-js/library/modules/_meta.js":
/***/ function(module, exports, __webpack_require__) {

	var META=__webpack_require__("./node_modules/core-js/library/modules/_uid.js")("meta"),isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),has=__webpack_require__("./node_modules/core-js/library/modules/_has.js"),setDesc=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f,id=0,isExtensible=Object.isExtensible||function(){return!0},FREEZE=!__webpack_require__("./node_modules/core-js/library/modules/_fails.js")(function(){return isExtensible(Object.preventExtensions({}))}),setMeta=function(e){setDesc(e,META,{value:{i:"O"+ ++id,w:{}}})},fastKey=function(e,t){if(!isObject(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!has(e,META)){if(!isExtensible(e))return"F";if(!t)return"E";setMeta(e)}return e[META].i},getWeak=function(e,t){if(!has(e,META)){if(!isExtensible(e))return!0;if(!t)return!1;setMeta(e)}return e[META].w},onFreeze=function(e){return FREEZE&&meta.NEED&&isExtensible(e)&&!has(e,META)&&setMeta(e),e},meta=module.exports={KEY:META,NEED:!1,fastKey:fastKey,getWeak:getWeak,onFreeze:onFreeze};

/***/ },

/***/ "./node_modules/core-js/library/modules/_collection.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),$export=__webpack_require__("./node_modules/core-js/library/modules/_export.js"),meta=__webpack_require__("./node_modules/core-js/library/modules/_meta.js"),fails=__webpack_require__("./node_modules/core-js/library/modules/_fails.js"),hide=__webpack_require__("./node_modules/core-js/library/modules/_hide.js"),redefineAll=__webpack_require__("./node_modules/core-js/library/modules/_redefine-all.js"),forOf=__webpack_require__("./node_modules/core-js/library/modules/_for-of.js"),anInstance=__webpack_require__("./node_modules/core-js/library/modules/_an-instance.js"),isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),setToStringTag=__webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js"),dP=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f,each=__webpack_require__("./node_modules/core-js/library/modules/_array-methods.js")(0),DESCRIPTORS=__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js");module.exports=function(e,r,t,i,o,n){var a=global[e],s=a,c=o?"set":"add",u=s&&s.prototype,f={};return DESCRIPTORS&&"function"==typeof s&&(n||u.forEach&&!fails(function(){(new s).entries().next()}))?(s=r(function(r,t){anInstance(r,s,e,"_c"),r._c=new a,void 0!=t&&forOf(t,o,r[c],r)}),each("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(e){var r="add"==e||"set"==e;e in u&&(!n||"clear"!=e)&&hide(s.prototype,e,function(t,i){if(anInstance(this,s,e),!r&&n&&!isObject(t))return"get"==e&&void 0;var o=this._c[e](0===t?0:t,i);return r?this:o})}),"size"in u&&dP(s.prototype,"size",{get:function(){return this._c.size}})):(s=i.getConstructor(r,e,o,c),redefineAll(s.prototype,t),meta.NEED=!0),setToStringTag(s,e),f[e]=s,$export($export.G+$export.W+$export.F,f),n||i.setStrong(s,e,o),s};

/***/ },

/***/ "./node_modules/core-js/library/modules/_array-methods.js":
/***/ function(module, exports, __webpack_require__) {

	var ctx=__webpack_require__("./node_modules/core-js/library/modules/_ctx.js"),IObject=__webpack_require__("./node_modules/core-js/library/modules/_iobject.js"),toObject=__webpack_require__("./node_modules/core-js/library/modules/_to-object.js"),toLength=__webpack_require__("./node_modules/core-js/library/modules/_to-length.js"),asc=__webpack_require__("./node_modules/core-js/library/modules/_array-species-create.js");module.exports=function(e,r){var t=1==e,c=2==e,i=3==e,n=4==e,u=6==e,o=5==e||u,s=r||asc;return function(r,a,f){for(var b,h,j=toObject(r),l=IObject(j),q=ctx(a,f,3),_=toLength(l.length),g=0,v=t?s(r,_):c?s(r,0):void 0;_>g;g++)if((o||g in l)&&(b=l[g],h=q(b,g,j),e))if(t)v[g]=h;else if(h)switch(e){case 3:return!0;case 5:return b;case 6:return g;case 2:v.push(b)}else if(n)return!1;return u?-1:i||n?n:v}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_array-species-create.js":
/***/ function(module, exports, __webpack_require__) {

	var speciesConstructor=__webpack_require__("./node_modules/core-js/library/modules/_array-species-constructor.js");module.exports=function(r,e){return new(speciesConstructor(r))(e)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_array-species-constructor.js":
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),isArray=__webpack_require__("./node_modules/core-js/library/modules/_is-array.js"),SPECIES=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("species");module.exports=function(r){var e;return isArray(r)&&(e=r.constructor,"function"!=typeof e||e!==Array&&!isArray(e.prototype)||(e=void 0),isObject(e)&&(e=e[SPECIES],null===e&&(e=void 0))),void 0===e?Array:e};

/***/ },

/***/ "./node_modules/core-js/library/modules/_is-array.js":
/***/ function(module, exports, __webpack_require__) {

	var cof=__webpack_require__("./node_modules/core-js/library/modules/_cof.js");module.exports=Array.isArray||function(r){return"Array"==cof(r)};

/***/ },

/***/ "./node_modules/core-js/library/modules/es7.set.to-json.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js");$export($export.P+$export.R,"Set",{toJSON:__webpack_require__("./node_modules/core-js/library/modules/_collection-to-json.js")("Set")});

/***/ },

/***/ "./node_modules/core-js/library/modules/_collection-to-json.js":
/***/ function(module, exports, __webpack_require__) {

	var classof=__webpack_require__("./node_modules/core-js/library/modules/_classof.js"),from=__webpack_require__("./node_modules/core-js/library/modules/_array-from-iterable.js");module.exports=function(r){return function(){if(classof(this)!=r)throw TypeError(r+"#toJSON isn't generic");return from(this)}};

/***/ },

/***/ "./node_modules/core-js/library/modules/_array-from-iterable.js":
/***/ function(module, exports, __webpack_require__) {

	var forOf=__webpack_require__("./node_modules/core-js/library/modules/_for-of.js");module.exports=function(r,f){var o=[];return forOf(r,!1,o.push,o,f),o};

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
		"./js/esformatter.js": "./src/parsers/js/esformatter.js",
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
		"./js/transformers/eslint1/codeExample.txt": "./src/parsers/js/transformers/eslint1/codeExample.txt",
		"./js/transformers/eslint1/index.js": "./src/parsers/js/transformers/eslint1/index.js",
		"./js/transformers/eslint1/loadRulesShim.js": "./src/parsers/js/transformers/eslint1/loadRulesShim.js",
		"./js/transformers/eslint2/codeExample.txt": "./src/parsers/js/transformers/eslint2/codeExample.txt",
		"./js/transformers/eslint2/index.js": "./src/parsers/js/transformers/eslint2/index.js",
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

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./node_modules/cssom/package.json"),_package2=_interopRequireDefault(_package),ID="cssom";exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["__starts","__ends"]),loadParser:function(e){__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/cssom/lib/parse.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,t){return e.parse(t)},getNodeName:function(e){return e.constructor.name},nodeToRange:function(e){var t=e.__starts,r=e.__ends;if(void 0===r&&e.parentRule&&(r=e.parentRule.__ends),void 0!==r)return[t,r]},opensByDefault:function(e,t){return"cssRules"===t||"style"===t},_ignoredProperties:new _set2["default"](["parentRule","parentStyleSheet","_importants"])});

/***/ },

/***/ "./src/parsers/utils/defaultParserInterface.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=__webpack_require__("./node_modules/babel-runtime/regenerator/index.js"),_regenerator2=_interopRequireDefault(_regenerator),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set);exports["default"]={_ignoredProperties:new _set2["default"],locationProps:new _set2["default"],opensByDefault:function(){return!1},nodeToRange:function(e){return e.range},getNodeName:function(e){return e.type},forEachProperty:_regenerator2["default"].mark(function e(r){var t;return _regenerator2["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=_regenerator2["default"].keys(r);case 1:if((e.t1=e.t0()).done){e.next=9;break}if(t=e.t1.value,!this._ignoredProperties.has(t)){e.next=5;break}return e.abrupt("continue",1);case 5:return e.next=7,{value:r[t],key:t,computed:!1};case 7:e.next=1;break;case 9:case"end":return e.stop()}},e,this)})};

/***/ },

/***/ "./node_modules/cssom/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"cssom@^0.3.0",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "cssom@>=0.3.0 <0.4.0",
		"_id": "cssom@0.3.1",
		"_inCache": true,
		"_installable": true,
		"_location": "/cssom",
		"_nodeVersion": "5.3.0",
		"_npmUser": {
			"email": "d@domenic.me",
			"name": "domenic"
		},
		"_npmVersion": "3.3.12",
		"_phantomChildren": {},
		"_requested": {
			"name": "cssom",
			"raw": "cssom@^0.3.0",
			"rawSpec": "^0.3.0",
			"scope": null,
			"spec": ">=0.3.0 <0.4.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/cssom/-/cssom-0.3.1.tgz",
		"_shasum": "c9e37ef2490e64f6d1baa10fda852257082c25d3",
		"_shrinkwrap": null,
		"_spec": "cssom@^0.3.0",
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
		"directories": {},
		"dist": {
			"shasum": "c9e37ef2490e64f6d1baa10fda852257082c25d3",
			"tarball": "https://registry.npmjs.org/cssom/-/cssom-0.3.1.tgz"
		},
		"files": [
			"lib/"
		],
		"gitHead": "c82ca18e35e207bb8ce57ffa2d3b783c026f7a52",
		"homepage": "https://github.com/nv/CSSOM#readme",
		"keywords": [
			"CSS",
			"CSSOM",
			"parser",
			"styleSheet"
		],
		"license": "MIT",
		"main": "./lib/index.js",
		"maintainers": [
			{
				"email": "me@elv1s.ru",
				"name": "nv"
			},
			{
				"email": "domenic@domenicdenicola.com",
				"name": "domenic"
			}
		],
		"name": "cssom",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
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

	"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mimeTypes=exports.displayName=exports.id=void 0,__webpack_require__("./node_modules/codemirror/mode/css/css.js");var id=exports.id="css",displayName=exports.displayName="CSS",mimeTypes=exports.mimeTypes=["text/css"];

/***/ },

/***/ "./node_modules/codemirror/mode/css/css.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){ true?e(__webpack_require__("./node_modules/codemirror/lib/codemirror.js")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e){for(var t={},r=0;r<e.length;++r)t[e[r]]=!0;return t}function r(e,t){for(var r,o=!1;null!=(r=e.next());){if(o&&"/"==r){t.tokenize=null;break}o="*"==r}return["comment","comment"]}e.defineMode("css",function(t,r){function o(e,t){return h=t,e}function a(e,t){var r=e.next();if(f[r]){var a=f[r](e,t);if(a!==!1)return a}return"@"==r?(e.eatWhile(/[\w\\\-]/),o("def",e.current())):"="==r||("~"==r||"|"==r)&&e.eat("=")?o(null,"compare"):'"'==r||"'"==r?(t.tokenize=i(r),t.tokenize(e,t)):"#"==r?(e.eatWhile(/[\w\\\-]/),o("atom","hash")):"!"==r?(e.match(/^\s*\w*/),o("keyword","important")):/\d/.test(r)||"."==r&&e.eat(/\d/)?(e.eatWhile(/[\w.%]/),o("number","unit")):"-"!==r?/[,+>*\/]/.test(r)?o(null,"select-op"):"."==r&&e.match(/^-?[_a-z][_a-z0-9-]*/i)?o("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(r)?o(null,r):"u"==r&&e.match(/rl(-prefix)?\(/)||"d"==r&&e.match("omain(")||"r"==r&&e.match("egexp(")?(e.backUp(1),t.tokenize=n,o("property","word")):/[\w\\\-]/.test(r)?(e.eatWhile(/[\w\\\-]/),o("property","word")):o(null,null):/[\d.]/.test(e.peek())?(e.eatWhile(/[\w.%]/),o("number","unit")):e.match(/^-[\w\\\-]+/)?(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?o("variable-2","variable-definition"):o("variable-2","variable")):e.match(/^\w+-/)?o("meta","meta"):void 0}function i(e){return function(t,r){for(var a,i=!1;null!=(a=t.next());){if(a==e&&!i){")"==e&&t.backUp(1);break}i=!i&&"\\"==a}return(a==e||!i&&")"!=e)&&(r.tokenize=null),o("string","string")}}function n(e,t){return e.next(),e.match(/\s*[\"\')]/,!1)?t.tokenize=null:t.tokenize=i(")"),o(null,"(")}function l(e,t,r){this.type=e,this.indent=t,this.prev=r}function s(e,t,r,o){return e.context=new l(r,t.indentation()+(o===!1?0:b),e.context),r}function c(e){return e.context.prev&&(e.context=e.context.prev),e.context.type}function d(e,t,r){return _[r.context.type](e,t,r)}function p(e,t,r,o){for(var a=o||1;a>0;a--)r.context=r.context.prev;return d(e,t,r)}function u(e){var t=e.current().toLowerCase();g=K.hasOwnProperty(t)?"atom":j.hasOwnProperty(t)?"keyword":"variable"}var m=r.inline;r.propertyKeywords||(r=e.resolveMode("text/css"));var h,g,b=t.indentUnit,f=r.tokenHooks,y=r.documentTypes||{},w=r.mediaTypes||{},k=r.mediaFeatures||{},v=r.mediaValueKeywords||{},x=r.propertyKeywords||{},z=r.nonStandardPropertyKeywords||{},q=r.fontProperties||{},P=r.counterDescriptors||{},j=r.colorKeywords||{},K=r.valueKeywords||{},B=r.allowNested,T=r.supportsAtComponent===!0,_={};return _.top=function(e,t,r){if("{"==e)return s(r,t,"block");if("}"==e&&r.context.prev)return c(r);if(T&&/@component/.test(e))return s(r,t,"atComponentBlock");if(/^@(-moz-)?document$/.test(e))return s(r,t,"documentTypes");if(/^@(media|supports|(-moz-)?document|import)$/.test(e))return s(r,t,"atBlock");if(/^@(font-face|counter-style)/.test(e))return r.stateArg=e,"restricted_atBlock_before";if(/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(e))return"keyframes";if(e&&"@"==e.charAt(0))return s(r,t,"at");if("hash"==e)g="builtin";else if("word"==e)g="tag";else{if("variable-definition"==e)return"maybeprop";if("interpolation"==e)return s(r,t,"interpolation");if(":"==e)return"pseudo";if(B&&"("==e)return s(r,t,"parens")}return r.context.type},_.block=function(e,t,r){if("word"==e){var o=t.current().toLowerCase();return x.hasOwnProperty(o)?(g="property","maybeprop"):z.hasOwnProperty(o)?(g="string-2","maybeprop"):B?(g=t.match(/^\s*:(?:\s|$)/,!1)?"property":"tag","block"):(g+=" error","maybeprop")}return"meta"==e?"block":B||"hash"!=e&&"qualifier"!=e?_.top(e,t,r):(g="error","block")},_.maybeprop=function(e,t,r){return":"==e?s(r,t,"prop"):d(e,t,r)},_.prop=function(e,t,r){if(";"==e)return c(r);if("{"==e&&B)return s(r,t,"propBlock");if("}"==e||"{"==e)return p(e,t,r);if("("==e)return s(r,t,"parens");if("hash"!=e||/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())){if("word"==e)u(t);else if("interpolation"==e)return s(r,t,"interpolation")}else g+=" error";return"prop"},_.propBlock=function(e,t,r){return"}"==e?c(r):"word"==e?(g="property","maybeprop"):r.context.type},_.parens=function(e,t,r){return"{"==e||"}"==e?p(e,t,r):")"==e?c(r):"("==e?s(r,t,"parens"):"interpolation"==e?s(r,t,"interpolation"):("word"==e&&u(t),"parens")},_.pseudo=function(e,t,r){return"word"==e?(g="variable-3",r.context.type):d(e,t,r)},_.documentTypes=function(e,t,r){return"word"==e&&y.hasOwnProperty(t.current())?(g="tag",r.context.type):_.atBlock(e,t,r)},_.atBlock=function(e,t,r){if("("==e)return s(r,t,"atBlock_parens");if("}"==e||";"==e)return p(e,t,r);if("{"==e)return c(r)&&s(r,t,B?"block":"top");if("interpolation"==e)return s(r,t,"interpolation");if("word"==e){var o=t.current().toLowerCase();g="only"==o||"not"==o||"and"==o||"or"==o?"keyword":w.hasOwnProperty(o)?"attribute":k.hasOwnProperty(o)?"property":v.hasOwnProperty(o)?"keyword":x.hasOwnProperty(o)?"property":z.hasOwnProperty(o)?"string-2":K.hasOwnProperty(o)?"atom":j.hasOwnProperty(o)?"keyword":"error"}return r.context.type},_.atComponentBlock=function(e,t,r){return"}"==e?p(e,t,r):"{"==e?c(r)&&s(r,t,B?"block":"top",!1):("word"==e&&(g="error"),r.context.type)},_.atBlock_parens=function(e,t,r){return")"==e?c(r):"{"==e||"}"==e?p(e,t,r,2):_.atBlock(e,t,r)},_.restricted_atBlock_before=function(e,t,r){return"{"==e?s(r,t,"restricted_atBlock"):"word"==e&&"@counter-style"==r.stateArg?(g="variable","restricted_atBlock_before"):d(e,t,r)},_.restricted_atBlock=function(e,t,r){return"}"==e?(r.stateArg=null,c(r)):"word"==e?(g="@font-face"==r.stateArg&&!q.hasOwnProperty(t.current().toLowerCase())||"@counter-style"==r.stateArg&&!P.hasOwnProperty(t.current().toLowerCase())?"error":"property","maybeprop"):"restricted_atBlock"},_.keyframes=function(e,t,r){return"word"==e?(g="variable","keyframes"):"{"==e?s(r,t,"top"):d(e,t,r)},_.at=function(e,t,r){return";"==e?c(r):"{"==e||"}"==e?p(e,t,r):("word"==e?g="tag":"hash"==e&&(g="builtin"),"at")},_.interpolation=function(e,t,r){return"}"==e?c(r):"{"==e||";"==e?p(e,t,r):("word"==e?g="variable":"variable"!=e&&"("!=e&&")"!=e&&(g="error"),"interpolation")},{startState:function(e){return{tokenize:null,state:m?"block":"top",stateArg:null,context:new l(m?"block":"top",e||0,null)}},token:function(e,t){if(!t.tokenize&&e.eatSpace())return null;var r=(t.tokenize||a)(e,t);return r&&"object"==typeof r&&(h=r[1],r=r[0]),g=r,t.state=_[t.state](h,e,t),g},indent:function(e,t){var r=e.context,o=t&&t.charAt(0),a=r.indent;return"prop"!=r.type||"}"!=o&&")"!=o||(r=r.prev),r.prev&&("}"!=o||"block"!=r.type&&"top"!=r.type&&"interpolation"!=r.type&&"restricted_atBlock"!=r.type?(")"!=o||"parens"!=r.type&&"atBlock_parens"!=r.type)&&("{"!=o||"at"!=r.type&&"atBlock"!=r.type)||(a=Math.max(0,r.indent-b),r=r.prev):(r=r.prev,a=r.indent)),a},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",fold:"brace"}});var o=["domain","regexp","url","url-prefix"],a=t(o),i=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],n=t(i),l=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid","orientation","device-pixel-ratio","min-device-pixel-ratio","max-device-pixel-ratio","pointer","any-pointer","hover","any-hover"],s=t(l),c=["landscape","portrait","none","coarse","fine","on-demand","hover","interlace","progressive"],d=t(c),p=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marker-offset","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-overflow","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","word-break","word-spacing","word-wrap","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],u=t(p),m=["scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","shape-inside","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","zoom"],h=t(m),g=["font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"],b=t(g),f=["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"],y=t(f),w=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],k=t(w),v=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","avoid","avoid-column","avoid-page","avoid-region","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","contain","content","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","devanagari","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","georgian","graytext","grid","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hard-light","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","hue","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","luminosity","malayalam","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","multiply","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","somali","source-atop","source-in","source-out","source-over","space","space-around","space-between","spell-out","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","symbolic","symbols","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"],x=t(v),z=o.concat(i).concat(l).concat(c).concat(p).concat(m).concat(w).concat(v);e.registerHelper("hintWords","css",z),e.defineMIME("text/css",{documentTypes:a,mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,fontProperties:b,counterDescriptors:y,colorKeywords:k,valueKeywords:x,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=r,r(e,t))}},name:"css"}),e.defineMIME("text/x-scss",{mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,colorKeywords:k,valueKeywords:x,fontProperties:b,allowNested:!0,tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=r,r(e,t)):["operator","operator"]},":":function(e){return!!e.match(/\s*\{/)&&[null,"{"]},$:function(e){return e.match(/^[\w-]+/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(e){return!!e.eat("{")&&[null,"interpolation"]}},name:"css",helperType:"scss"}),e.defineMIME("text/x-less",{mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,colorKeywords:k,valueKeywords:x,fontProperties:b,allowNested:!0,tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=r,r(e,t)):["operator","operator"]},"@":function(e){return e.eat("{")?[null,"interpolation"]:!e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/,!1)&&(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"}),e.defineMIME("text/x-gss",{documentTypes:a,mediaTypes:n,mediaFeatures:s,propertyKeywords:u,nonStandardPropertyKeywords:h,fontProperties:b,counterDescriptors:y,colorKeywords:k,valueKeywords:x,supportsAtComponent:!0,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=r,r(e,t))}},name:"css",helperType:"gss"})});

/***/ },

/***/ "./src/parsers/css/postcss.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultCSSParserInterface=__webpack_require__("./src/parsers/css/utils/defaultCSSParserInterface.js"),_defaultCSSParserInterface2=_interopRequireDefault(_defaultCSSParserInterface),_package=__webpack_require__("./node_modules/postcss/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="postcss",defaultOptions={parser:"built-in"},parserSettingsConfiguration={fields:[["parser",["built-in","scss","less","safe-parser"]]]};exports["default"]=(0,_extends3["default"])({},_defaultCSSParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["source"]),loadParser:function(e){__webpack_require__.e/* require */(2, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/postcss/lib/parse.js"),__webpack_require__("./node_modules/postcss-scss/lib/scss-parse.js"),__webpack_require__("./node_modules/postcss-less/dist/less-parse.js"),__webpack_require__("./node_modules/postcss-safe-parser/lib/safe-parse.js")]; (function(t,r,s,a){e({"built-in":t,scss:r,less:s,"safe-parser":a})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,t,r){return _defaultCSSParserInterface2["default"].parse.call(this,e[r.parser||defaultOptions.parser],t)},nodeToRange:function(e){var t=e.source;if(t&&t.end)return[this.getOffset(t.start),this.getOffset(t.end)+1]},opensByDefault:function(e,t){return"nodes"===t},_ignoredProperties:new _set2["default"](["parent","input"]),renderSettings:function(e,t){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:t})}});

/***/ },

/***/ "./src/parsers/css/utils/defaultCSSParserInterface.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface);exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{getOffset:function(e){var t=e.line,r=e.column;return this.lineOffsets[t-1]+r-1},parse:function(e,t){this.lineOffsets=[];var r=0;do this.lineOffsets.push(r);while(r=t.indexOf("\n",r)+1);return e(t)}});

/***/ },

/***/ "./node_modules/postcss/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"postcss@^5.0.12",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "postcss@>=5.0.12 <6.0.0",
		"_id": "postcss@5.1.1",
		"_inCache": true,
		"_installable": true,
		"_location": "/postcss",
		"_nodeVersion": "6.3.0",
		"_npmOperationalInternal": {
			"host": "packages-16-east.internal.npmjs.com",
			"tmp": "tmp/postcss-5.1.1.tgz_1469523811504_0.9466930476482958"
		},
		"_npmUser": {
			"email": "andrey@sitnik.ru",
			"name": "ai"
		},
		"_npmVersion": "3.10.3",
		"_phantomChildren": {
			"has-flag": "1.0.0"
		},
		"_requested": {
			"name": "postcss",
			"raw": "postcss@^5.0.12",
			"rawSpec": "^5.0.12",
			"scope": null,
			"spec": ">=5.0.12 <6.0.0",
			"type": "range"
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
			"/postcss-discard-overridden",
			"/postcss-discard-unused",
			"/postcss-filter-plugins",
			"/postcss-less",
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
			"/postcss-reduce-initial",
			"/postcss-reduce-transforms",
			"/postcss-safe-parser",
			"/postcss-scss",
			"/postcss-svgo",
			"/postcss-unique-selectors",
			"/postcss-zindex"
		],
		"_resolved": "https://registry.npmjs.org/postcss/-/postcss-5.1.1.tgz",
		"_shasum": "c7947993b76d8f3e069b2c223b185581a7e54164",
		"_shrinkwrap": null,
		"_spec": "postcss@^5.0.12",
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
			"source-map": "^0.5.6",
			"supports-color": "^3.1.2"
		},
		"description": "Tool for transforming styles with JS plugins",
		"devDependencies": {
			"ava": "0.15.2",
			"babel-core": "6.11.4",
			"babel-eslint": "6.1.2",
			"babel-plugin-add-module-exports": "0.2.1",
			"babel-plugin-precompile-charcodes": "1.0.0",
			"babel-preset-es2015": "6.9.0",
			"babel-preset-es2015-loose": "7.0.0",
			"concat-with-sourcemaps": "1.0.4",
			"del": "2.2.1",
			"docdash": "0.4.0",
			"eslint": "3.1.1",
			"eslint-config-postcss": "2.0.2",
			"fs-extra": "0.30.0",
			"gulp": "3.9.1",
			"gulp-ava": "0.12.1",
			"gulp-babel": "6.1.2",
			"gulp-eslint": "3.0.1",
			"gulp-jsdoc3": "0.3.0",
			"gulp-run": "1.7.1",
			"gulp-sourcemaps": "1.6.0",
			"postcss-parser-tests": "5.0.9",
			"sinon": "1.17.4",
			"strip-ansi": "3.0.1",
			"yaspeller": "2.8.2"
		},
		"directories": {},
		"dist": {
			"shasum": "c7947993b76d8f3e069b2c223b185581a7e54164",
			"tarball": "https://registry.npmjs.org/postcss/-/postcss-5.1.1.tgz"
		},
		"engines": {
			"node": ">=0.12"
		},
		"homepage": "http://postcss.org/",
		"keywords": [
			"css",
			"postcss",
			"rework",
			"preprocessor",
			"parser",
			"source map",
			"transform",
			"manipulation",
			"transpiler"
		],
		"license": "MIT",
		"main": "lib/postcss",
		"maintainers": [
			{
				"email": "andrey@sitnik.ru",
				"name": "ai"
			},
			{
				"email": "beneb.info@gmail.com",
				"name": "beneb"
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
		"typings": "d.ts/postcss.d.ts",
		"version": "5.1.1"
	};

/***/ },

/***/ "./src/parsers/utils/SettingsRenderer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function valuesFromArray(e){return e.reduce(function(t,r){return t[r]=e.indexOf(r)>-1,t},{})}function getValuesFromSettings(e){return Array.isArray(e)?valuesFromArray(e):e}function defaultUpdater(e,t,r){return(0,_extends5["default"])({},e,(0,_defineProperty3["default"])({},t,r))}function arrayUpdater(e,t,r){return e=new _set2["default"](e),r?e.add(t):e["delete"](t),(0,_from2["default"])(e)}function getUpdateStrategy(e){return Array.isArray(e)?arrayUpdater:defaultUpdater}function SettingsRenderer(e){var t=e.settingsConfiguration,r=e.parserSettings,a=e.onChange,n=t.title,u=t.fields,i=t.required,l=void 0===i?new _set2["default"]:i,d=t.update,f=void 0===d?getUpdateStrategy(r):d,o=(t.values||getValuesFromSettings)(r);return _react2["default"].createElement("div",null,n?_react2["default"].createElement("h4",null,n):null,_react2["default"].createElement("ul",{className:"settings"},u.map(function(e){if("string"==typeof e)return _react2["default"].createElement("li",{key:e},_react2["default"].createElement("label",null,_react2["default"].createElement("input",{type:"checkbox",readOnly:l.has(e),disabled:l.has(e),checked:o[e],onChange:function(t){var n=t.target;return a(f(r,e,n.checked))}})," ",e));if(Array.isArray(e)){var t=function(){var t=(0,_slicedToArray3["default"])(e,3),n=t[0],u=t[1],i=t[2],l=void 0===i?identity:i;return{v:_react2["default"].createElement("li",{key:n},_react2["default"].createElement("label",null,n,": ",_react2["default"].createElement("select",{onChange:function(e){var t=e.target;return a(f(r,n,l(t.value)))},value:o[n]},u.map(function(e){return _react2["default"].createElement("option",{key:e,value:e},e)}))))}}();if("object"===("undefined"==typeof t?"undefined":(0,_typeof3["default"])(t)))return t.v}else if(e&&"object"===("undefined"==typeof e?"undefined":(0,_typeof3["default"])(e)))return _react2["default"].createElement(SettingsRenderer,{key:e.key,settingsConfiguration:e,parserSettings:e.settings(r),onChange:function(t){return a((0,_extends5["default"])({},r,(0,_defineProperty3["default"])({},e.key,t)))}})})))}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=void 0;var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_slicedToArray2=__webpack_require__("./node_modules/babel-runtime/helpers/slicedToArray.js"),_slicedToArray3=_interopRequireDefault(_slicedToArray2),_from=__webpack_require__("./node_modules/babel-runtime/core-js/array/from.js"),_from2=_interopRequireDefault(_from),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_defineProperty2=__webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js"),_defineProperty3=_interopRequireDefault(_defineProperty2),_extends4=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends5=_interopRequireDefault(_extends4),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),identity=function(e){return e};exports["default"]=SettingsRenderer,SettingsRenderer.propTypes={settingsConfiguration:_react2["default"].PropTypes.object.isRequired,parserSettings:_react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.object,_react2["default"].PropTypes.array]).isRequired,onChange:_react2["default"].PropTypes.func.isRequired};

/***/ },

/***/ "./node_modules/babel-runtime/helpers/typeof.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _iterator=__webpack_require__("./node_modules/babel-runtime/core-js/symbol/iterator.js"),_iterator2=_interopRequireDefault(_iterator),_symbol=__webpack_require__("./node_modules/babel-runtime/core-js/symbol.js"),_symbol2=_interopRequireDefault(_symbol),_typeof="function"==typeof _symbol2["default"]&&"symbol"==typeof _iterator2["default"]?function(e){return typeof e}:function(e){return e&&"function"==typeof _symbol2["default"]&&e.constructor===_symbol2["default"]?"symbol":typeof e};exports["default"]="function"==typeof _symbol2["default"]&&"symbol"===_typeof(_iterator2["default"])?function(e){return"undefined"==typeof e?"undefined":_typeof(e)}:function(e){return e&&"function"==typeof _symbol2["default"]&&e.constructor===_symbol2["default"]?"symbol":"undefined"==typeof e?"undefined":_typeof(e)};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/symbol/iterator.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/symbol/iterator.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/symbol/iterator.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js"),__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_wks-ext.js").f("iterator");

/***/ },

/***/ "./node_modules/core-js/library/modules/_wks-ext.js":
/***/ function(module, exports, __webpack_require__) {

	exports.f=__webpack_require__("./node_modules/core-js/library/modules/_wks.js");

/***/ },

/***/ "./node_modules/babel-runtime/core-js/symbol.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/symbol/index.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/symbol/index.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.symbol.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js"),__webpack_require__("./node_modules/core-js/library/modules/es7.symbol.async-iterator.js"),__webpack_require__("./node_modules/core-js/library/modules/es7.symbol.observable.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Symbol;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.symbol.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),has=__webpack_require__("./node_modules/core-js/library/modules/_has.js"),DESCRIPTORS=__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js"),$export=__webpack_require__("./node_modules/core-js/library/modules/_export.js"),redefine=__webpack_require__("./node_modules/core-js/library/modules/_redefine.js"),META=__webpack_require__("./node_modules/core-js/library/modules/_meta.js").KEY,$fails=__webpack_require__("./node_modules/core-js/library/modules/_fails.js"),shared=__webpack_require__("./node_modules/core-js/library/modules/_shared.js"),setToStringTag=__webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js"),uid=__webpack_require__("./node_modules/core-js/library/modules/_uid.js"),wks=__webpack_require__("./node_modules/core-js/library/modules/_wks.js"),wksExt=__webpack_require__("./node_modules/core-js/library/modules/_wks-ext.js"),wksDefine=__webpack_require__("./node_modules/core-js/library/modules/_wks-define.js"),keyOf=__webpack_require__("./node_modules/core-js/library/modules/_keyof.js"),enumKeys=__webpack_require__("./node_modules/core-js/library/modules/_enum-keys.js"),isArray=__webpack_require__("./node_modules/core-js/library/modules/_is-array.js"),anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),toIObject=__webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js"),toPrimitive=__webpack_require__("./node_modules/core-js/library/modules/_to-primitive.js"),createDesc=__webpack_require__("./node_modules/core-js/library/modules/_property-desc.js"),_create=__webpack_require__("./node_modules/core-js/library/modules/_object-create.js"),gOPNExt=__webpack_require__("./node_modules/core-js/library/modules/_object-gopn-ext.js"),$GOPD=__webpack_require__("./node_modules/core-js/library/modules/_object-gopd.js"),$DP=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js"),$keys=__webpack_require__("./node_modules/core-js/library/modules/_object-keys.js"),gOPD=$GOPD.f,dP=$DP.f,gOPN=gOPNExt.f,$Symbol=global.Symbol,$JSON=global.JSON,_stringify=$JSON&&$JSON.stringify,PROTOTYPE="prototype",HIDDEN=wks("_hidden"),TO_PRIMITIVE=wks("toPrimitive"),isEnum={}.propertyIsEnumerable,SymbolRegistry=shared("symbol-registry"),AllSymbols=shared("symbols"),OPSymbols=shared("op-symbols"),ObjectProto=Object[PROTOTYPE],USE_NATIVE="function"==typeof $Symbol,QObject=global.QObject,setter=!QObject||!QObject[PROTOTYPE]||!QObject[PROTOTYPE].findChild,setSymbolDesc=DESCRIPTORS&&$fails(function(){return 7!=_create(dP({},"a",{get:function(){return dP(this,"a",{value:7}).a}})).a})?function(e,r,t){var o=gOPD(ObjectProto,r);o&&delete ObjectProto[r],dP(e,r,t),o&&e!==ObjectProto&&dP(ObjectProto,r,o)}:dP,wrap=function(e){var r=AllSymbols[e]=_create($Symbol[PROTOTYPE]);return r._k=e,r},isSymbol=USE_NATIVE&&"symbol"==typeof $Symbol.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof $Symbol},$defineProperty=function(e,r,t){return e===ObjectProto&&$defineProperty(OPSymbols,r,t),anObject(e),r=toPrimitive(r,!0),anObject(t),has(AllSymbols,r)?(t.enumerable?(has(e,HIDDEN)&&e[HIDDEN][r]&&(e[HIDDEN][r]=!1),t=_create(t,{enumerable:createDesc(0,!1)})):(has(e,HIDDEN)||dP(e,HIDDEN,createDesc(1,{})),e[HIDDEN][r]=!0),setSymbolDesc(e,r,t)):dP(e,r,t)},$defineProperties=function(e,r){anObject(e);for(var t,o=enumKeys(r=toIObject(r)),i=0,s=o.length;s>i;)$defineProperty(e,t=o[i++],r[t]);return e},$create=function(e,r){return void 0===r?_create(e):$defineProperties(_create(e),r)},$propertyIsEnumerable=function(e){var r=isEnum.call(this,e=toPrimitive(e,!0));return!(this===ObjectProto&&has(AllSymbols,e)&&!has(OPSymbols,e))&&(!(r||!has(this,e)||!has(AllSymbols,e)||has(this,HIDDEN)&&this[HIDDEN][e])||r)},$getOwnPropertyDescriptor=function(e,r){if(e=toIObject(e),r=toPrimitive(r,!0),e!==ObjectProto||!has(AllSymbols,r)||has(OPSymbols,r)){var t=gOPD(e,r);return!t||!has(AllSymbols,r)||has(e,HIDDEN)&&e[HIDDEN][r]||(t.enumerable=!0),t}},$getOwnPropertyNames=function(e){for(var r,t=gOPN(toIObject(e)),o=[],i=0;t.length>i;)has(AllSymbols,r=t[i++])||r==HIDDEN||r==META||o.push(r);return o},$getOwnPropertySymbols=function(e){for(var r,t=e===ObjectProto,o=gOPN(t?OPSymbols:toIObject(e)),i=[],s=0;o.length>s;)!has(AllSymbols,r=o[s++])||t&&!has(ObjectProto,r)||i.push(AllSymbols[r]);return i};USE_NATIVE||($Symbol=function(){if(this instanceof $Symbol)throw TypeError("Symbol is not a constructor!");var e=uid(arguments.length>0?arguments[0]:void 0),r=function(t){this===ObjectProto&&r.call(OPSymbols,t),has(this,HIDDEN)&&has(this[HIDDEN],e)&&(this[HIDDEN][e]=!1),setSymbolDesc(this,e,createDesc(1,t))};return DESCRIPTORS&&setter&&setSymbolDesc(ObjectProto,e,{configurable:!0,set:r}),wrap(e)},redefine($Symbol[PROTOTYPE],"toString",function(){return this._k}),$GOPD.f=$getOwnPropertyDescriptor,$DP.f=$defineProperty,__webpack_require__("./node_modules/core-js/library/modules/_object-gopn.js").f=gOPNExt.f=$getOwnPropertyNames,__webpack_require__("./node_modules/core-js/library/modules/_object-pie.js").f=$propertyIsEnumerable,__webpack_require__("./node_modules/core-js/library/modules/_object-gops.js").f=$getOwnPropertySymbols,DESCRIPTORS&&!__webpack_require__("./node_modules/core-js/library/modules/_library.js")&&redefine(ObjectProto,"propertyIsEnumerable",$propertyIsEnumerable,!0),wksExt.f=function(e){return wrap(wks(e))}),$export($export.G+$export.W+$export.F*!USE_NATIVE,{Symbol:$Symbol});for(var symbols="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),i=0;symbols.length>i;)wks(symbols[i++]);for(var symbols=$keys(wks.store),i=0;symbols.length>i;)wksDefine(symbols[i++]);$export($export.S+$export.F*!USE_NATIVE,"Symbol",{"for":function(e){return has(SymbolRegistry,e+="")?SymbolRegistry[e]:SymbolRegistry[e]=$Symbol(e)},keyFor:function(e){if(isSymbol(e))return keyOf(SymbolRegistry,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){setter=!0},useSimple:function(){setter=!1}}),$export($export.S+$export.F*!USE_NATIVE,"Object",{create:$create,defineProperty:$defineProperty,defineProperties:$defineProperties,getOwnPropertyDescriptor:$getOwnPropertyDescriptor,getOwnPropertyNames:$getOwnPropertyNames,getOwnPropertySymbols:$getOwnPropertySymbols}),$JSON&&$export($export.S+$export.F*(!USE_NATIVE||$fails(function(){var e=$Symbol();return"[null]"!=_stringify([e])||"{}"!=_stringify({a:e})||"{}"!=_stringify(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!isSymbol(e)){for(var r,t,o=[e],i=1;arguments.length>i;)o.push(arguments[i++]);return r=o[1],"function"==typeof r&&(t=r),!t&&isArray(r)||(r=function(e,r){if(t&&(r=t.call(this,e,r)),!isSymbol(r))return r}),o[1]=r,_stringify.apply($JSON,o)}}}),$Symbol[PROTOTYPE][TO_PRIMITIVE]||__webpack_require__("./node_modules/core-js/library/modules/_hide.js")($Symbol[PROTOTYPE],TO_PRIMITIVE,$Symbol[PROTOTYPE].valueOf),setToStringTag($Symbol,"Symbol"),setToStringTag(Math,"Math",!0),setToStringTag(global.JSON,"JSON",!0);

/***/ },

/***/ "./node_modules/core-js/library/modules/_wks-define.js":
/***/ function(module, exports, __webpack_require__) {

	var global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),core=__webpack_require__("./node_modules/core-js/library/modules/_core.js"),LIBRARY=__webpack_require__("./node_modules/core-js/library/modules/_library.js"),wksExt=__webpack_require__("./node_modules/core-js/library/modules/_wks-ext.js"),defineProperty=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f;module.exports=function(e){var r=core.Symbol||(core.Symbol=LIBRARY?{}:global.Symbol||{});"_"==e.charAt(0)||e in r||defineProperty(r,e,{value:wksExt.f(e)})};

/***/ },

/***/ "./node_modules/core-js/library/modules/_keyof.js":
/***/ function(module, exports, __webpack_require__) {

	var getKeys=__webpack_require__("./node_modules/core-js/library/modules/_object-keys.js"),toIObject=__webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js");module.exports=function(e,t){for(var r,o=toIObject(e),c=getKeys(o),i=c.length,u=0;i>u;)if(o[r=c[u++]]===t)return r};

/***/ },

/***/ "./node_modules/core-js/library/modules/_enum-keys.js":
/***/ function(module, exports, __webpack_require__) {

	var getKeys=__webpack_require__("./node_modules/core-js/library/modules/_object-keys.js"),gOPS=__webpack_require__("./node_modules/core-js/library/modules/_object-gops.js"),pIE=__webpack_require__("./node_modules/core-js/library/modules/_object-pie.js");module.exports=function(e){var r=getKeys(e),t=gOPS.f;if(t)for(var o,u=t(e),g=pIE.f,i=0;u.length>i;)g.call(e,o=u[i++])&&r.push(o);return r};

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-gopn-ext.js":
/***/ function(module, exports, __webpack_require__) {

	var toIObject=__webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js"),gOPN=__webpack_require__("./node_modules/core-js/library/modules/_object-gopn.js").f,toString={}.toString,windowNames="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],getWindowNames=function(e){try{return gOPN(e)}catch(t){return windowNames.slice()}};module.exports.f=function(e){return windowNames&&"[object Window]"==toString.call(e)?getWindowNames(e):gOPN(toIObject(e))};

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-gopn.js":
/***/ function(module, exports, __webpack_require__) {

	var $keys=__webpack_require__("./node_modules/core-js/library/modules/_object-keys-internal.js"),hiddenKeys=__webpack_require__("./node_modules/core-js/library/modules/_enum-bug-keys.js").concat("length","prototype");exports.f=Object.getOwnPropertyNames||function(e){return $keys(e,hiddenKeys)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-gopd.js":
/***/ function(module, exports, __webpack_require__) {

	var pIE=__webpack_require__("./node_modules/core-js/library/modules/_object-pie.js"),createDesc=__webpack_require__("./node_modules/core-js/library/modules/_property-desc.js"),toIObject=__webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js"),toPrimitive=__webpack_require__("./node_modules/core-js/library/modules/_to-primitive.js"),has=__webpack_require__("./node_modules/core-js/library/modules/_has.js"),IE8_DOM_DEFINE=__webpack_require__("./node_modules/core-js/library/modules/_ie8-dom-define.js"),gOPD=Object.getOwnPropertyDescriptor;exports.f=__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js")?gOPD:function(e,r){if(e=toIObject(e),r=toPrimitive(r,!0),IE8_DOM_DEFINE)try{return gOPD(e,r)}catch(t){}if(has(e,r))return createDesc(!pIE.f.call(e,r),e[r])};

/***/ },

/***/ "./node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/_wks-define.js")("asyncIterator");

/***/ },

/***/ "./node_modules/core-js/library/modules/es7.symbol.observable.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/_wks-define.js")("observable");

/***/ },

/***/ "./node_modules/babel-runtime/core-js/array/from.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/array/from.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/array/from.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.array.from.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Array.from;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.array.from.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var ctx=__webpack_require__("./node_modules/core-js/library/modules/_ctx.js"),$export=__webpack_require__("./node_modules/core-js/library/modules/_export.js"),toObject=__webpack_require__("./node_modules/core-js/library/modules/_to-object.js"),call=__webpack_require__("./node_modules/core-js/library/modules/_iter-call.js"),isArrayIter=__webpack_require__("./node_modules/core-js/library/modules/_is-array-iter.js"),toLength=__webpack_require__("./node_modules/core-js/library/modules/_to-length.js"),createProperty=__webpack_require__("./node_modules/core-js/library/modules/_create-property.js"),getIterFn=__webpack_require__("./node_modules/core-js/library/modules/core.get-iterator-method.js");$export($export.S+$export.F*!__webpack_require__("./node_modules/core-js/library/modules/_iter-detect.js")(function(e){Array.from(e)}),"Array",{from:function(e){var r,t,o,i,a=toObject(e),c="function"==typeof this?this:Array,n=arguments.length,u=n>1?arguments[1]:void 0,l=void 0!==u,y=0,p=getIterFn(a);if(l&&(u=ctx(u,n>2?arguments[2]:void 0,2)),void 0==p||c==Array&&isArrayIter(p))for(r=toLength(a.length),t=new c(r);r>y;y++)createProperty(t,y,l?u(a[y],y):a[y]);else for(i=p.call(a),t=new c;!(o=i.next()).done;y++)createProperty(t,y,l?call(i,u,[o.value,y],!0):o.value);return t.length=y,t}});

/***/ },

/***/ "./node_modules/core-js/library/modules/_create-property.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var $defineProperty=__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js"),createDesc=__webpack_require__("./node_modules/core-js/library/modules/_property-desc.js");module.exports=function(e,r,t){r in e?$defineProperty.f(e,r,createDesc(0,t)):e[r]=t};

/***/ },

/***/ "./node_modules/core-js/library/modules/_iter-detect.js":
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("iterator"),SAFE_CLOSING=!1;try{var riter=[7][ITERATOR]();riter["return"]=function(){SAFE_CLOSING=!0},Array.from(riter,function(){throw 2})}catch(e){}module.exports=function(r,t){if(!t&&!SAFE_CLOSING)return!1;var n=!1;try{var e=[7],u=e[ITERATOR]();u.next=function(){return{done:n=!0}},e[ITERATOR]=function(){return u},r(e)}catch(i){}return n};

/***/ },

/***/ "./node_modules/babel-runtime/helpers/defineProperty.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _defineProperty=__webpack_require__("./node_modules/babel-runtime/core-js/object/define-property.js"),_defineProperty2=_interopRequireDefault(_defineProperty);exports["default"]=function(e,r,t){return r in e?(0,_defineProperty2["default"])(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/define-property.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/define-property.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/define-property.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.define-property.js");var $Object=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object;module.exports=function(e,r,o){return $Object.defineProperty(e,r,o)};

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js");$export($export.S+$export.F*!__webpack_require__("./node_modules/core-js/library/modules/_descriptors.js"),"Object",{defineProperty:__webpack_require__("./node_modules/core-js/library/modules/_object-dp.js").f});

/***/ },

/***/ "./src/parsers/css/rework.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_defaultCSSParserInterface=__webpack_require__("./src/parsers/css/utils/defaultCSSParserInterface.js"),_defaultCSSParserInterface2=_interopRequireDefault(_defaultCSSParserInterface),_package=__webpack_require__("./node_modules/css/package.json"),_package2=_interopRequireDefault(_package),ID="rework";exports["default"]=(0,_extends3["default"])({},_defaultCSSParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["position"]),loadParser:function(e){__webpack_require__.e/* require */(3, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/css/lib/parse/index.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},nodeToRange:function(e){var r=this,t=e.position;if(t)return[t.start,t.end].map(function(e){return r.getOffset(e)})},opensByDefault:function(e,r){return"rules"===r},_ignoredProperties:new _set2["default"](["parsingErrors","source","content"])});

/***/ },

/***/ "./node_modules/css/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"css@^2.2.1",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "css@>=2.2.1 <3.0.0",
		"_id": "css@2.2.1",
		"_inCache": true,
		"_installable": true,
		"_location": "/css",
		"_nodeVersion": "2.2.1",
		"_npmUser": {
			"email": "me@conradz.com",
			"name": "conradz"
		},
		"_npmVersion": "2.11.0",
		"_phantomChildren": {
			"amdefine": "1.0.0"
		},
		"_requested": {
			"name": "css",
			"raw": "css@^2.2.1",
			"rawSpec": "^2.2.1",
			"scope": null,
			"spec": ">=2.2.1 <3.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/css/-/css-2.2.1.tgz",
		"_shasum": "73a4c81de85db664d4ee674f7d47085e3b2d55dc",
		"_shrinkwrap": null,
		"_spec": "css@^2.2.1",
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
		"directories": {},
		"dist": {
			"shasum": "73a4c81de85db664d4ee674f7d47085e3b2d55dc",
			"tarball": "https://registry.npmjs.org/css/-/css-2.2.1.tgz"
		},
		"files": [
			"index.js",
			"lib"
		],
		"gitHead": "e38b6f1cc03aa36ff161a3da96b5c7510bd41ca7",
		"homepage": "https://github.com/reworkcss/css#readme",
		"keywords": [
			"css",
			"parser",
			"stringifier",
			"stylesheet"
		],
		"license": "MIT",
		"main": "index",
		"maintainers": [
			{
				"email": "tj@vision-media.ca",
				"name": "tjholowaychuk"
			},
			{
				"email": "jonathanrichardong@gmail.com",
				"name": "jonathanong"
			},
			{
				"email": "jonathanrichardong@gmail.com",
				"name": "jongleberry"
			},
			{
				"email": "me@conradz.com",
				"name": "conradz"
			},
			{
				"email": "nicolasgallagher@gmail.com",
				"name": "necolas"
			},
			{
				"email": "antshort@gmail.com",
				"name": "anthonyshort"
			},
			{
				"email": "ian@ianstormtaylor.com",
				"name": "ianstormtaylor"
			},
			{
				"email": "m@moox.io",
				"name": "moox"
			},
			{
				"email": "clint@anotherway.co.za",
				"name": "clintwood"
			},
			{
				"email": "simon.lydell@gmail.com",
				"name": "lydell"
			},
			{
				"email": "alexsexton@gmail.com",
				"name": "slexaxton"
			}
		],
		"name": "css",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
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

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _compileModule=__webpack_require__("./src/parsers/utils/compileModule.js"),_compileModule2=_interopRequireDefault(_compileModule),_package=__webpack_require__("./node_modules/postcss/package.json"),_package2=_interopRequireDefault(_package),ID="postcss";exports["default"]={id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,defaultParserID:"postcss",loadTransformer:function(e){__webpack_require__.e/* require */(4, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/postcss/lib/postcss.js")]; (function(o){e({postcss:o})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},transform:function e(o,r,s){var t=o.postcss,e=(0,_compileModule2["default"])(r,{require:function(e){switch(e){case"postcss":return t;default:throw new Error("Cannot find module '"+e+"'")}}});return t([(e["default"]||e)()]).process(s).css}};

/***/ },

/***/ "./src/parsers/utils/compileModule.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function compileModule(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],t={},o={exports:t},u=(0,_keys2["default"])(r),a=["module","exports"].concat((0,_toConsumableArray3["default"])(u)),n=[o,t].concat((0,_toConsumableArray3["default"])(u.map(function(e){return r[e]})));return new Function(a.join(),e).apply(t,n),o.exports}Object.defineProperty(exports,"__esModule",{value:!0});var _toConsumableArray2=__webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js"),_toConsumableArray3=_interopRequireDefault(_toConsumableArray2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys);exports["default"]=compileModule;

/***/ },

/***/ "./node_modules/babel-runtime/helpers/toConsumableArray.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(r){return r&&r.__esModule?r:{"default":r}}exports.__esModule=!0;var _from=__webpack_require__("./node_modules/babel-runtime/core-js/array/from.js"),_from2=_interopRequireDefault(_from);exports["default"]=function(r){if(Array.isArray(r)){for(var e=0,t=Array(r.length);e<r.length;e++)t[e]=r[e];return t}return(0,_from2["default"])(r)};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/keys.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/keys.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/keys.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.keys.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object.keys;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.keys.js":
/***/ function(module, exports, __webpack_require__) {

	var toObject=__webpack_require__("./node_modules/core-js/library/modules/_to-object.js"),$keys=__webpack_require__("./node_modules/core-js/library/modules/_object-keys.js");__webpack_require__("./node_modules/core-js/library/modules/_object-sap.js")("keys",function(){return function(e){return $keys(toObject(e))}});

/***/ },

/***/ "./node_modules/core-js/library/modules/_object-sap.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js"),core=__webpack_require__("./node_modules/core-js/library/modules/_core.js"),fails=__webpack_require__("./node_modules/core-js/library/modules/_fails.js");module.exports=function(e,r){var o=(core.Object||{})[e]||Object[e],t={};t[e]=r(o),$export($export.S+$export.F*fails(function(){o(1)}),"Object",t)};

/***/ },

/***/ "./src/parsers/graphql/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "# Paste or drop some GraphQL queries or schema\n# definitions here and explore the syntax tree\n# created by the GraphQL parser.\n\nquery GetUser($userId: ID!) {\n  user(id: $userId) {\n    id,\n    name,\n    isViewerFriend,\n    profilePicture(size: 50)  {\n      ...PictureFragment\n    }\n  }\n}\n\nfragment PictureFragment on Picture {\n  uri,\n  width,\n  height\n}\n"

/***/ },

/***/ "./src/parsers/graphql/graphql-js.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./node_modules/graphql/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="graphql-js",defaultOptions={noLocation:!1,noSource:!1},parserSettingsConfiguration={fields:(0,_keys2["default"])(defaultOptions)};exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["loc"]),loadParser:function(e){__webpack_require__.e/* require */(5, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/graphql/language/index.js")]; (function(t){var r=t.parse;e({parse:r})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,t,r){var a=e.parse;return a(t,(0,_extends3["default"])({},defaultOptions,r))},nodeToRange:function(e){if(e.loc)return[e.loc.start,e.loc.end]},getNodeName:function(e){return e.kind},opensByDefault:function(e,t){return"definitions"===t},renderSettings:function(e,t){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:t})}});

/***/ },

/***/ "./node_modules/graphql/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"graphql@^0.6.2",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "graphql@>=0.6.2 <0.7.0",
		"_id": "graphql@0.6.2",
		"_inCache": true,
		"_installable": true,
		"_location": "/graphql",
		"_nodeVersion": "6.3.0",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/graphql-0.6.2.tgz_1469135170549_0.9132720122579485"
		},
		"_npmUser": {
			"email": "lee@leebyron.com",
			"name": "leebyron"
		},
		"_npmVersion": "3.10.3",
		"_phantomChildren": {},
		"_requested": {
			"name": "graphql",
			"raw": "graphql@^0.6.2",
			"rawSpec": "^0.6.2",
			"scope": null,
			"spec": ">=0.6.2 <0.7.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/graphql/-/graphql-0.6.2.tgz",
		"_shasum": "19cdcb17e5862d64396a0684f92f7be64e90e7af",
		"_shrinkwrap": null,
		"_spec": "graphql@^0.6.2",
		"_where": "/Users/fkling/git/astexplorer",
		"bugs": {
			"url": "https://github.com/graphql/graphql-js/issues"
		},
		"contributors": [
			{
				"email": "lee@leebyron.com",
				"name": "Lee Byron",
				"url": "http://leebyron.com/"
			},
			{
				"email": "schrockn@fb.com",
				"name": "Nicholas Schrock"
			},
			{
				"email": "dschafer@fb.com",
				"name": "Daniel Schafer"
			}
		],
		"dependencies": {
			"iterall": "1.0.2"
		},
		"description": "A Query Language and Runtime which can target any service.",
		"devDependencies": {
			"babel-cli": "6.10.1",
			"babel-eslint": "6.1.0",
			"babel-plugin-check-es2015-constants": "6.8.0",
			"babel-plugin-syntax-async-functions": "6.8.0",
			"babel-plugin-transform-class-properties": "6.10.2",
			"babel-plugin-transform-es2015-arrow-functions": "6.8.0",
			"babel-plugin-transform-es2015-block-scoped-functions": "6.8.0",
			"babel-plugin-transform-es2015-block-scoping": "6.10.1",
			"babel-plugin-transform-es2015-classes": "6.9.0",
			"babel-plugin-transform-es2015-computed-properties": "6.8.0",
			"babel-plugin-transform-es2015-destructuring": "6.9.0",
			"babel-plugin-transform-es2015-duplicate-keys": "6.8.0",
			"babel-plugin-transform-es2015-function-name": "6.9.0",
			"babel-plugin-transform-es2015-literals": "6.8.0",
			"babel-plugin-transform-es2015-modules-commonjs": "6.10.3",
			"babel-plugin-transform-es2015-object-super": "6.8.0",
			"babel-plugin-transform-es2015-parameters": "6.9.0",
			"babel-plugin-transform-es2015-shorthand-properties": "6.8.0",
			"babel-plugin-transform-es2015-spread": "6.8.0",
			"babel-plugin-transform-es2015-template-literals": "6.8.0",
			"babel-plugin-transform-flow-strip-types": "6.8.0",
			"babel-plugin-transform-object-rest-spread": "6.8.0",
			"babel-plugin-transform-regenerator": "6.9.0",
			"chai": "3.5.0",
			"chai-json-equal": "0.0.1",
			"chai-subset": "1.2.2",
			"coveralls": "2.11.9",
			"eslint": "3.1.1",
			"eslint-plugin-babel": "3.3.0",
			"eslint-plugin-flow-vars": "0.4.0",
			"eslint-plugin-flowtype": "2.3.1",
			"flow-bin": "0.29.0",
			"isparta": "4.0.0",
			"mocha": "2.5.3",
			"sane": "1.3.4"
		},
		"directories": {},
		"dist": {
			"shasum": "19cdcb17e5862d64396a0684f92f7be64e90e7af",
			"tarball": "https://registry.npmjs.org/graphql/-/graphql-0.6.2.tgz"
		},
		"gitHead": "2aa060007dda62be2cd5b480ada3b9270cee0454",
		"homepage": "https://github.com/graphql/graphql-js",
		"license": "BSD-3-Clause",
		"main": "index.js",
		"maintainers": [
			{
				"email": "lee@leebyron.com",
				"name": "leebyron"
			},
			{
				"email": "dschafer@fb.com",
				"name": "dschafer"
			},
			{
				"email": "schrockn@gmail.com",
				"name": "schrockn"
			}
		],
		"name": "graphql",
		"optionalDependencies": {},
		"options": {
			"mocha": "--require ./resources/mocha-bootload --check-leaks --full-trace src/**/__tests__/**/*-test.js"
		},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+ssh://git@github.com/graphql/graphql-js.git"
		},
		"scripts": {
			"build": "babel src --ignore __tests__ --out-dir dist/ && cp package.json dist/",
			"check": "flow check",
			"check-cover": "for file in {src/*.js,src/**/*.js}; do echo $file; flow coverage $file; done",
			"cover": "babel-node ./node_modules/.bin/isparta cover --root src --report html _mocha -- $npm_package_options_mocha",
			"cover:lcov": "babel-node ./node_modules/.bin/isparta cover --root src --report lcovonly _mocha -- $npm_package_options_mocha",
			"lint": "eslint src",
			"prepublish": ". ./resources/prepublish.sh",
			"preversion": ". ./resources/checkgit.sh && npm test",
			"t": "babel-node ./node_modules/.bin/_mocha --require ./resources/mocha-bootload",
			"test": "npm run lint && npm run check && npm run testonly",
			"testonly": "babel-node ./node_modules/.bin/_mocha $npm_package_options_mocha",
			"watch": "babel-node ./resources/watch.js"
		},
		"version": "0.6.2"
	};

/***/ },

/***/ "./src/parsers/graphql/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mimeTypes=exports.displayName=exports.id=void 0,__webpack_require__("./node_modules/codemirror-graphql/mode.js");var id=exports.id="graphql",displayName=exports.displayName="GraphQL",mimeTypes=exports.mimeTypes=["application/graphql"];

/***/ },

/***/ "./node_modules/codemirror-graphql/mode.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function indent(e,t){var r=e.levels,i=r&&0!==r.length?r[r.length-1]-(this.electricInput.test(t)?1:0):e.indentLevel;return i*this.config.indentUnit}var _codemirror=__webpack_require__("./node_modules/codemirror/lib/codemirror.js"),_codemirror2=_interopRequireDefault(_codemirror),_utilsOnlineParser=__webpack_require__("./node_modules/codemirror-graphql/utils/onlineParser.js"),_utilsOnlineParser2=_interopRequireDefault(_utilsOnlineParser),_utilsRules=__webpack_require__("./node_modules/codemirror-graphql/utils/Rules.js");_codemirror2["default"].defineMode("graphql",function(e){var t=_utilsOnlineParser2["default"]({eatWhitespace:function(e){return e.eatWhile(_utilsRules.isIgnored)},LexRules:_utilsRules.LexRules,ParseRules:_utilsRules.ParseRules,editorConfig:{tabSize:e.tabSize}});return{config:e,startState:t.startState,token:t.token,indent:indent,electricInput:/^\s*[})\]]/,fold:"brace",lineComment:"#",closeBrackets:{pairs:'()[]{}""',explode:"()[]{}"}}});

/***/ },

/***/ "./node_modules/codemirror-graphql/utils/onlineParser.js":
/***/ function(module, exports) {

	"use strict";function onlineParser(e){return{startState:function(){var t={level:0};return pushRule(e.ParseRules,t,"Document"),t},token:function(t,r){return getToken(t,r,e)}}}function getToken(e,t,r){var n=r.LexRules,a=r.ParseRules,s=r.eatWhitespace,u=r.editorConfig;if(t.needsAdvance&&(t.needsAdvance=!1,advanceRule(t,!0)),e.sol()){var l=u&&u.tabSize||2;t.indentLevel=Math.floor(e.indentation()/l)}if(s(e))return"ws";if("#"===e.peek())return e.skipToEnd(),"comment";var i=lex(n,e);if(!i)return e.match(/\S+/),"invalidchar";if(saveState(t),"Punctuation"===i.kind)if(/^[{([]/.test(i.value))t.levels=(t.levels||[]).concat(t.indentLevel+1);else if(/^[})\]]/.test(i.value)){var o=t.levels=(t.levels||[]).slice(0,-1);o.length>0&&o[o.length-1]<t.indentLevel&&(t.indentLevel=o[o.length-1])}for(;t.rule;){var p="function"==typeof t.rule?0===t.step?t.rule(i,e):null:t.rule[t.step];if(t.needsSeperator&&(p=p&&p.separator),p){if(p.ofRule&&(p=p.ofRule),"string"==typeof p){pushRule(a,t,p);continue}if(p.match&&p.match(i))return p.update&&p.update(t,i),"Punctuation"===i.kind?advanceRule(t,!0):t.needsAdvance=!0,p.style}unsuccessful(t)}return restoreState(t),"invalidchar"}function assign(e,t){for(var r=Object.keys(t),n=0;n<r.length;n++)e[r[n]]=t[r[n]];return e}function saveState(e){assign(stateCache,e)}function restoreState(e){assign(e,stateCache)}function pushRule(e,t,r){t.prevState=assign({},t),t.kind=r,t.name=null,t.type=null,t.rule=e[r],t.step=0,t.needsSeperator=!1}function popRule(e){e.kind=e.prevState.kind,e.name=e.prevState.name,e.type=e.prevState.type,e.rule=e.prevState.rule,e.step=e.prevState.step,e.needsSeperator=e.prevState.needsSeperator,e.prevState=e.prevState.prevState}function advanceRule(e,t){if(isList(e)){if(e.rule[e.step].separator&&(e.needsSeperator=!e.needsSeperator,!e.needsSeperator))return;if(t)return}for(e.needsSeperator=!1,e.step++;e.rule&&!(Array.isArray(e.rule)&&e.step<e.rule.length);)popRule(e),e.rule&&(isList(e)?e.rule[e.step].separator&&(e.needsSeperator=!e.needsSeperator):(e.needsSeperator=!1,e.step++))}function isList(e){return Array.isArray(e.rule)&&e.rule[e.step].isList}function unsuccessful(e){for(;e.rule&&(!Array.isArray(e.rule)||!e.rule[e.step].ofRule);)popRule(e);e.rule&&advanceRule(e,!1)}function lex(e,t){for(var r=Object.keys(e),n=0;n<r.length;n++){var a=t.match(e[r[n]]);if(a)return{kind:r[n],value:a[0]}}}exports.__esModule=!0,exports["default"]=onlineParser;var stateCache={};module.exports=exports["default"];

/***/ },

/***/ "./node_modules/codemirror-graphql/utils/Rules.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function word(e){return{style:"keyword",match:function(l){return"Name"===l.kind&&l.value===e}}}function name(e){return{style:e,match:function(e){return"Name"===e.kind},update:function(e,l){e.name=l.value}}}function type(e){return{style:e,match:function(e){return"Name"===e.kind},update:function(e,l){e.prevState.type=l.value}}}exports.__esModule=!0;var _utilsRuleHelpers=__webpack_require__("./node_modules/codemirror-graphql/utils/RuleHelpers.js"),isIgnored=function(e){return" "===e||"\t"===e||","===e||"\n"===e||"\r"===e||"\ufeff"===e};exports.isIgnored=isIgnored;var LexRules={Name:/^[_A-Za-z][_0-9A-Za-z]*/,Punctuation:/^(?:!|\$|\(|\)|\.\.\.|:|=|@|\[|\]|\{|\})/,Number:/^-?(?:0|(?:[1-9][0-9]*))(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?/,String:/^"(?:[^"\\]|\\(?:"|\/|\\|b|f|n|r|t|u[0-9a-fA-F]{4}))*"?/};exports.LexRules=LexRules;var ParseRules={Document:[_utilsRuleHelpers.list("Definition")],Definition:function(e){switch(e.value){case"query":return"Query";case"mutation":return"Mutation";case"subscription":return"Subscription";case"fragment":return"FragmentDefinition";case"{":return"ShortQuery"}},Query:[word("query"),_utilsRuleHelpers.opt(name("def")),_utilsRuleHelpers.opt("VariableDefinitions"),_utilsRuleHelpers.list("Directive"),"SelectionSet"],ShortQuery:["SelectionSet"],Mutation:[word("mutation"),_utilsRuleHelpers.opt(name("def")),_utilsRuleHelpers.opt("VariableDefinitions"),_utilsRuleHelpers.list("Directive"),"SelectionSet"],Subscription:[word("subscription"),_utilsRuleHelpers.opt(name("def")),_utilsRuleHelpers.opt("VariableDefinitions"),_utilsRuleHelpers.list("Directive"),"SelectionSet"],VariableDefinitions:[_utilsRuleHelpers.p("("),_utilsRuleHelpers.list("VariableDefinition"),_utilsRuleHelpers.p(")")],VariableDefinition:["Variable",_utilsRuleHelpers.p(":"),"Type",_utilsRuleHelpers.opt("DefaultValue")],Variable:[_utilsRuleHelpers.p("$","variable"),name("variable")],DefaultValue:[_utilsRuleHelpers.p("="),"Value"],SelectionSet:[_utilsRuleHelpers.p("{"),_utilsRuleHelpers.list("Selection"),_utilsRuleHelpers.p("}")],Selection:function(e,l){return"..."===e.value?l.match(/[\s\u00a0,]*(on\b|@|{)/,!1)?"InlineFragment":"FragmentSpread":l.match(/[\s\u00a0,]*:/,!1)?"AliasedField":"Field"},AliasedField:[name("qualifier"),_utilsRuleHelpers.p(":"),"Field"],Field:[name("property"),_utilsRuleHelpers.opt("Arguments"),_utilsRuleHelpers.list("Directive"),_utilsRuleHelpers.opt("SelectionSet")],Arguments:[_utilsRuleHelpers.p("("),_utilsRuleHelpers.list("Argument"),_utilsRuleHelpers.p(")")],Argument:[name("attribute"),_utilsRuleHelpers.p(":"),"Value"],FragmentSpread:[_utilsRuleHelpers.p("..."),name("def"),_utilsRuleHelpers.list("Directive")],InlineFragment:[_utilsRuleHelpers.p("..."),_utilsRuleHelpers.opt("TypeCondition"),_utilsRuleHelpers.list("Directive"),"SelectionSet"],FragmentDefinition:[word("fragment"),_utilsRuleHelpers.opt(_utilsRuleHelpers.butNot(name("def"),[word("on")])),"TypeCondition",_utilsRuleHelpers.list("Directive"),"SelectionSet"],TypeCondition:[word("on"),type("atom")],Value:function(e){switch(e.kind){case"Number":return"NumberValue";case"String":return"StringValue";case"Punctuation":switch(e.value){case"[":return"ListValue";case"{":return"ObjectValue";case"$":return"Variable"}return null;case"Name":switch(e.value){case"true":case"false":return"BooleanValue"}return"EnumValue"}},NumberValue:[_utilsRuleHelpers.t("Number","number")],StringValue:[_utilsRuleHelpers.t("String","string")],BooleanValue:[_utilsRuleHelpers.t("Name","builtin")],EnumValue:[name("string-2")],ListValue:[_utilsRuleHelpers.p("["),_utilsRuleHelpers.list("Value"),_utilsRuleHelpers.p("]")],ObjectValue:[_utilsRuleHelpers.p("{"),_utilsRuleHelpers.list("ObjectField"),_utilsRuleHelpers.p("}")],ObjectField:[name("attribute"),_utilsRuleHelpers.p(":"),"Value"],Type:function(e){return"["===e.value?"ListType":"NamedType"},ListType:[_utilsRuleHelpers.p("["),"NamedType",_utilsRuleHelpers.p("]"),_utilsRuleHelpers.opt(_utilsRuleHelpers.p("!"))],NamedType:[name("atom"),_utilsRuleHelpers.opt(_utilsRuleHelpers.p("!"))],Directive:[_utilsRuleHelpers.p("@","meta"),name("meta"),_utilsRuleHelpers.opt("Arguments")]};exports.ParseRules=ParseRules;

/***/ },

/***/ "./node_modules/codemirror-graphql/utils/RuleHelpers.js":
/***/ function(module, exports) {

	"use strict";function opt(t){return{ofRule:t}}function list(t,n){return{ofRule:t,isList:!0,separator:n}}function butNot(t,n){var u=t.match;return t.match=function(t){return u(t)&&n.every(function(n){return!n.match(t)})},t}function t(t,n){return{style:n,match:function(n){return n.kind===t}}}function p(t,n){return{style:n||"punctuation",match:function(n){return"Punctuation"===n.kind&&n.value===t}}}exports.__esModule=!0,exports.opt=opt,exports.list=list,exports.butNot=butNot,exports.t=t,exports.p=p;

/***/ },

/***/ "./src/parsers/html/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html>\n\n<body>\n    <h1>My First Heading</h1>\n    <p>My first paragraph.</p>\n</body>\n\n</html>\n"

/***/ },

/***/ "./src/parsers/html/htmlparser2.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_get2=__webpack_require__("./node_modules/babel-runtime/helpers/get.js"),_get3=_interopRequireDefault(_get2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./node_modules/htmlparser2/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="htmlparser2",defaultOptions={xmlMode:!1,lowerCaseAttributeNames:!0,lowerCaseTags:!0},parserSettingsConfiguration={fields:(0,_keys2["default"])(defaultOptions)};exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["startIndex"]),loadParser:function(e){__webpack_require__.e/* require */(6, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/htmlparser2/lib/Parser.js"),__webpack_require__("./node_modules/domhandler/index.js")]; (function(t,r){var n=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,{withStartIndices:!0}))}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"_setEnd",value:function(e){e.endIndex=this._parser.endIndex+1}},{key:"onprocessinginstruction",value:function(e,r){this._parser.endIndex=this._parser._tokenizer._index,(0,_get3["default"])((0,_getPrototypeOf2["default"])(t.prototype),"onprocessinginstruction",this).call(this,e,r)}},{key:"_addDomElement",value:function(e){(0,_get3["default"])((0,_getPrototypeOf2["default"])(t.prototype),"_addDomElement",this).call(this,e),this._setEnd(e)}}]),t}(r);n.prototype.onclosetag=n.prototype.oncommentend=n.prototype.oncdataend=function(){this._setEnd(this._tagStack.pop())},e({Parser:t,Handler:n})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,t,r){var n=e.Parser,a=e.Handler,s=new a;return new n(s,(0,_extends3["default"])({},defaultOptions,r)).end(t),s.dom},nodeToRange:function(e){if(e.type)return[e.startIndex,e.endIndex]},opensByDefault:function(e,t){return"children"===t},getNodeName:function(e){var t=e.type;return t&&e.name&&(t+="("+e.name+")"),t},renderSettings:function(e,t){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:t})},_ignoredProperties:new _set2["default"](["prev","next","parent","endIndex"])});

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/get-prototype-of.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/get-prototype-of.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.get-prototype-of.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object.getPrototypeOf;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/***/ function(module, exports, __webpack_require__) {

	var toObject=__webpack_require__("./node_modules/core-js/library/modules/_to-object.js"),$getPrototypeOf=__webpack_require__("./node_modules/core-js/library/modules/_object-gpo.js");__webpack_require__("./node_modules/core-js/library/modules/_object-sap.js")("getPrototypeOf",function(){return function(t){return $getPrototypeOf(toObject(t))}});

/***/ },

/***/ "./node_modules/babel-runtime/helpers/classCallCheck.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};

/***/ },

/***/ "./node_modules/babel-runtime/helpers/createClass.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _defineProperty=__webpack_require__("./node_modules/babel-runtime/core-js/object/define-property.js"),_defineProperty2=_interopRequireDefault(_defineProperty);exports["default"]=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),(0,_defineProperty2["default"])(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}();

/***/ },

/***/ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2);exports["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,_typeof3["default"])(t))&&"function"!=typeof t?e:t};

/***/ },

/***/ "./node_modules/babel-runtime/helpers/get.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_getOwnPropertyDescriptor=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-own-property-descriptor.js"),_getOwnPropertyDescriptor2=_interopRequireDefault(_getOwnPropertyDescriptor);exports["default"]=function e(t,r,o){null===t&&(t=Function.prototype);var u=(0,_getOwnPropertyDescriptor2["default"])(t,r);if(void 0===u){var i=(0,_getPrototypeOf2["default"])(t);return null===i?void 0:e(i,r,o)}if("value"in u)return u.value;var p=u.get;if(void 0!==p)return p.call(o)};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/get-own-property-descriptor.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/get-own-property-descriptor.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/get-own-property-descriptor.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js");var $Object=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object;module.exports=function(e,r){return $Object.getOwnPropertyDescriptor(e,r)};

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js":
/***/ function(module, exports, __webpack_require__) {

	var toIObject=__webpack_require__("./node_modules/core-js/library/modules/_to-iobject.js"),$getOwnPropertyDescriptor=__webpack_require__("./node_modules/core-js/library/modules/_object-gopd.js").f;__webpack_require__("./node_modules/core-js/library/modules/_object-sap.js")("getOwnPropertyDescriptor",function(){return function(r,e){return $getOwnPropertyDescriptor(toIObject(r),e)}});

/***/ },

/***/ "./node_modules/babel-runtime/helpers/inherits.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _setPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/set-prototype-of.js"),_setPrototypeOf2=_interopRequireDefault(_setPrototypeOf),_create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create),_typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2);exports["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,_typeof3["default"])(t)));e.prototype=(0,_create2["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(_setPrototypeOf2["default"]?(0,_setPrototypeOf2["default"])(e,t):e.__proto__=t)};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/set-prototype-of.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/set-prototype-of.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/set-prototype-of.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.set-prototype-of.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object.setPrototypeOf;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.set-prototype-of.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js");$export($export.S,"Object",{setPrototypeOf:__webpack_require__("./node_modules/core-js/library/modules/_set-proto.js").set});

/***/ },

/***/ "./node_modules/core-js/library/modules/_set-proto.js":
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),check=function(t,e){if(anObject(t),!isObject(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};module.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,c){try{c=__webpack_require__("./node_modules/core-js/library/modules/_ctx.js")(Function.call,__webpack_require__("./node_modules/core-js/library/modules/_object-gopd.js").f(Object.prototype,"__proto__").set,2),c(t,[]),e=!(t instanceof Array)}catch(r){e=!0}return function(t,r){return check(t,r),e?t.__proto__=r:c(t,r),t}}({},!1):void 0),check:check};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/create.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/create.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/create.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.create.js");var $Object=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object;module.exports=function(e,r){return $Object.create(e,r)};

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.create.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js");$export($export.S,"Object",{create:__webpack_require__("./node_modules/core-js/library/modules/_object-create.js")});

/***/ },

/***/ "./node_modules/babel-runtime/helpers/extends.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _assign=__webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js"),_assign2=_interopRequireDefault(_assign);exports["default"]=_assign2["default"]||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e};

/***/ },

/***/ "./src/parsers/html/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mimeTypes=exports.displayName=exports.id=void 0,__webpack_require__("./node_modules/codemirror/mode/htmlmixed/htmlmixed.js");var id=exports.id="htmlmixed",displayName=exports.displayName="HTML",mimeTypes=exports.mimeTypes=["text/html"];

/***/ },

/***/ "./node_modules/codemirror/mode/htmlmixed/htmlmixed.js":
/***/ function(module, exports, __webpack_require__) {

	!function(t){ true?t(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"),__webpack_require__("./node_modules/codemirror/mode/xml/xml.js"),__webpack_require__("./node_modules/codemirror/mode/javascript/javascript.js"),__webpack_require__("./node_modules/codemirror/mode/css/css.js")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../javascript/javascript","../css/css"],t):t(CodeMirror)}(function(t){"use strict";function e(t,e,a){var n=t.current(),l=n.search(e);return l>-1?t.backUp(n.length-l):n.match(/<\/?$/)&&(t.backUp(n.length),t.match(e,!1)||t.match(n)),a}function a(t){var e=i[t];return e?e:i[t]=new RegExp("\\s+"+t+"\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*")}function n(t,e){var n=t.match(a(e));return n?n[2]:""}function l(t,e){return new RegExp((e?"^":"")+"</s*"+t+"s*>","i")}function r(t,e){for(var a in t)for(var n=e[a]||(e[a]=[]),l=t[a],r=l.length-1;r>=0;r--)n.unshift(l[r])}function o(t,e){for(var a=0;a<t.length;a++){var l=t[a];if(!l[0]||l[1].test(n(e,l[0])))return l[2]}}var c={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",/./,"text/plain"],[null,null,"css"]]},i={};t.defineMode("htmlmixed",function(a,n){function i(n,r){var c,m=s.token(n,r.htmlState),d=/\btag\b/.test(m);if(d&&!/[<>\s\/]/.test(n.current())&&(c=r.htmlState.tagName&&r.htmlState.tagName.toLowerCase())&&u.hasOwnProperty(c))r.inTag=c+" ";else if(r.inTag&&d&&/>$/.test(n.current())){var f=/^([\S]+) (.*)/.exec(r.inTag);r.inTag=null;var p=">"==n.current()&&o(u[f[1]],f[2]),g=t.getMode(a,p),h=l(f[1],!0),v=l(f[1],!1);r.token=function(t,a){return t.match(h,!1)?(a.token=i,a.localState=a.localMode=null,null):e(t,v,a.localMode.token(t,a.localState))},r.localMode=g,r.localState=t.startState(g,s.indent(r.htmlState,""))}else r.inTag&&(r.inTag+=n.current(),n.eol()&&(r.inTag+=" "));return m}var s=t.getMode(a,{name:"xml",htmlMode:!0,multilineTagIndentFactor:n.multilineTagIndentFactor,multilineTagIndentPastTag:n.multilineTagIndentPastTag}),u={},m=n&&n.tags,d=n&&n.scriptTypes;if(r(c,u),m&&r(m,u),d)for(var f=d.length-1;f>=0;f--)u.script.unshift(["type",d[f].matches,d[f].mode]);return{startState:function(){var e=t.startState(s);return{token:i,inTag:null,localMode:null,localState:null,htmlState:e}},copyState:function(e){var a;return e.localState&&(a=t.copyState(e.localMode,e.localState)),{token:e.token,inTag:e.inTag,localMode:e.localMode,localState:a,htmlState:t.copyState(s,e.htmlState)}},token:function(t,e){return e.token(t,e)},indent:function(e,a){return!e.localMode||/^\s*<\//.test(a)?s.indent(e.htmlState,a):e.localMode.indent?e.localMode.indent(e.localState,a):t.Pass},innerMode:function(t){return{state:t.localState||t.htmlState,mode:t.localMode||s}}}},"xml","javascript","css"),t.defineMIME("text/html","htmlmixed")});

/***/ },

/***/ "./node_modules/codemirror/mode/xml/xml.js":
/***/ function(module, exports, __webpack_require__) {

	!function(t){ true?t(__webpack_require__("./node_modules/codemirror/lib/codemirror.js")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],t):t(CodeMirror)}(function(t){"use strict";var e={autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0},n={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,caseFold:!1};t.defineMode("xml",function(r,o){function a(t,e){function n(n){return e.tokenize=n,n(t,e)}var r=t.next();if("<"==r)return t.eat("!")?t.eat("[")?t.match("CDATA[")?n(u("atom","]]>")):null:t.match("--")?n(u("comment","-->")):t.match("DOCTYPE",!0,!0)?(t.eatWhile(/[\w\._\-]/),n(d(1))):null:t.eat("?")?(t.eatWhile(/[\w\._\-]/),e.tokenize=u("meta","?>"),"meta"):(C=t.eat("/")?"closeTag":"openTag",e.tokenize=i,"tag bracket");if("&"==r){var o;return o=t.eat("#")?t.eat("x")?t.eatWhile(/[a-fA-F\d]/)&&t.eat(";"):t.eatWhile(/[\d]/)&&t.eat(";"):t.eatWhile(/[\w\.\-:]/)&&t.eat(";"),o?"atom":"error"}return t.eatWhile(/[^&<]/),null}function i(t,e){var n=t.next();if(">"==n||"/"==n&&t.eat(">"))return e.tokenize=a,C=">"==n?"endTag":"selfcloseTag","tag bracket";if("="==n)return C="equals",null;if("<"==n){e.tokenize=a,e.state=m,e.tagName=e.tagStart=null;var r=e.tokenize(t,e);return r?r+" tag error":"tag error"}return/[\'\"]/.test(n)?(e.tokenize=l(n),e.stringStartCol=t.column(),e.tokenize(t,e)):(t.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function l(t){var e=function(e,n){for(;!e.eol();)if(e.next()==t){n.tokenize=i;break}return"string"};return e.isInAttribute=!0,e}function u(t,e){return function(n,r){for(;!n.eol();){if(n.match(e)){r.tokenize=a;break}n.next()}return t}}function d(t){return function(e,n){for(var r;null!=(r=e.next());){if("<"==r)return n.tokenize=d(t+1),n.tokenize(e,n);if(">"==r){if(1==t){n.tokenize=a;break}return n.tokenize=d(t-1),n.tokenize(e,n)}}return"meta"}}function c(t,e,n){this.prev=t.context,this.tagName=e,this.indent=t.indented,this.startOfLine=n,(z.doNotIndent.hasOwnProperty(e)||t.context&&t.context.noIndent)&&(this.noIndent=!0)}function f(t){t.context&&(t.context=t.context.prev)}function s(t,e){for(var n;;){if(!t.context)return;if(n=t.context.tagName,!z.contextGrabbers.hasOwnProperty(n)||!z.contextGrabbers[n].hasOwnProperty(e))return;f(t)}}function m(t,e,n){return"openTag"==t?(n.tagStart=e.column(),g):"closeTag"==t?p:m}function g(t,e,n){return"word"==t?(n.tagName=e.current(),I="tag",x):(I="error",g)}function p(t,e,n){if("word"==t){var r=e.current();return n.context&&n.context.tagName!=r&&z.implicitlyClosed.hasOwnProperty(n.context.tagName)&&f(n),n.context&&n.context.tagName==r||z.matchClosing===!1?(I="tag",h):(I="tag error",b)}return I="error",b}function h(t,e,n){return"endTag"!=t?(I="error",h):(f(n),m)}function b(t,e,n){return I="error",h(t,e,n)}function x(t,e,n){if("word"==t)return I="attribute",k;if("endTag"==t||"selfcloseTag"==t){var r=n.tagName,o=n.tagStart;return n.tagName=n.tagStart=null,"selfcloseTag"==t||z.autoSelfClosers.hasOwnProperty(r)?s(n,r):(s(n,r),n.context=new c(n,r,o==n.indented)),m}return I="error",x}function k(t,e,n){return"equals"==t?v:(z.allowMissing||(I="error"),x(t,e,n))}function v(t,e,n){return"string"==t?w:"word"==t&&z.allowUnquoted?(I="string",x):(I="error",x(t,e,n))}function w(t,e,n){return"string"==t?w:x(t,e,n)}var y=r.indentUnit,z={},N=o.htmlMode?e:n;for(var T in N)z[T]=N[T];for(var T in o)z[T]=o[T];var C,I;return a.isInText=!0,{startState:function(t){var e={tokenize:a,state:m,indented:t||0,tagName:null,tagStart:null,context:null};return null!=t&&(e.baseIndent=t),e},token:function(t,e){if(!e.tagName&&t.sol()&&(e.indented=t.indentation()),t.eatSpace())return null;C=null;var n=e.tokenize(t,e);return(n||C)&&"comment"!=n&&(I=null,e.state=e.state(C||n,t,e),I&&(n="error"==I?n+" error":I)),n},indent:function(e,n,r){var o=e.context;if(e.tokenize.isInAttribute)return e.tagStart==e.indented?e.stringStartCol+1:e.indented+y;if(o&&o.noIndent)return t.Pass;if(e.tokenize!=i&&e.tokenize!=a)return r?r.match(/^(\s*)/)[0].length:0;if(e.tagName)return z.multilineTagIndentPastTag!==!1?e.tagStart+e.tagName.length+2:e.tagStart+y*(z.multilineTagIndentFactor||1);if(z.alignCDATA&&/<!\[CDATA\[/.test(n))return 0;var l=n&&/^<(\/)?([\w_:\.-]*)/.exec(n);if(l&&l[1])for(;o;){if(o.tagName==l[2]){o=o.prev;break}if(!z.implicitlyClosed.hasOwnProperty(o.tagName))break;o=o.prev}else if(l)for(;o;){var u=z.contextGrabbers[o.tagName];if(!u||!u.hasOwnProperty(l[2]))break;o=o.prev}for(;o&&o.prev&&!o.startOfLine;)o=o.prev;return o?o.indent+y:e.baseIndent||0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"<!--",blockCommentEnd:"-->",configuration:z.htmlMode?"html":"xml",helperType:z.htmlMode?"html":"xml",skipAttribute:function(t){t.state==v&&(t.state=x)}}}),t.defineMIME("text/xml","xml"),t.defineMIME("application/xml","xml"),t.mimeModes.hasOwnProperty("text/html")||t.defineMIME("text/html",{name:"xml",htmlMode:!0})});

/***/ },

/***/ "./node_modules/codemirror/mode/javascript/javascript.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){ true?e(__webpack_require__("./node_modules/codemirror/lib/codemirror.js")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t,r){return/^(?:operator|sof|keyword c|case|new|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}e.defineMode("javascript",function(r,n){function a(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return;"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}function i(e,t,r){return xe=e,he=r,t}function o(e,r){var n=e.next();if('"'==n||"'"==n)return r.tokenize=c(n),r.tokenize(e,r);if("."==n&&e.match(/^\d+(?:[eE][+\-]?\d+)?/))return i("number","number");if("."==n&&e.match(".."))return i("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(n))return i(n);if("="==n&&e.eat(">"))return i("=>","operator");if("0"==n&&e.eat(/x/i))return e.eatWhile(/[\da-f]/i),i("number","number");if("0"==n&&e.eat(/o/i))return e.eatWhile(/[0-7]/i),i("number","number");if("0"==n&&e.eat(/b/i))return e.eatWhile(/[01]/i),i("number","number");if(/\d/.test(n))return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),i("number","number");if("/"==n)return e.eat("*")?(r.tokenize=u,u(e,r)):e.eat("/")?(e.skipToEnd(),i("comment","comment")):t(e,r,1)?(a(e),e.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/),i("regexp","string-2")):(e.eatWhile(ze),i("operator","operator",e.current()));if("`"==n)return r.tokenize=l,l(e,r);if("#"==n)return e.skipToEnd(),i("error","error");if(ze.test(n))return e.eatWhile(ze),i("operator","operator",e.current());if(Ee.test(n)){e.eatWhile(Ee);var o=e.current(),s=Ie.propertyIsEnumerable(o)&&Ie[o];return s&&"."!=r.lastType?i(s.type,s.style,o):i("variable","variable",o)}}function c(e){return function(t,r){var n,a=!1;if(je&&"@"==t.peek()&&t.match(Ae))return r.tokenize=o,i("jsonld-keyword","meta");for(;null!=(n=t.next())&&(n!=e||a);)a=!a&&"\\"==n;return a||(r.tokenize=o),i("string","string")}}function u(e,t){for(var r,n=!1;r=e.next();){if("/"==r&&n){t.tokenize=o;break}n="*"==r}return i("comment","comment")}function l(e,t){for(var r,n=!1;null!=(r=e.next());){if(!n&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=o;break}n=!n&&"\\"==r}return i("quasi","string-2",e.current())}function s(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){for(var n=0,a=!1,i=r-1;i>=0;--i){var o=e.string.charAt(i),c=Te.indexOf(o);if(c>=0&&c<3){if(!n){++i;break}if(0==--n)break}else if(c>=3&&c<6)++n;else if(Ee.test(o))a=!0;else{if(/["'\/]/.test(o))return;if(a&&!n){++i;break}}}a&&!n&&(t.fatArrowAt=i)}}function f(e,t,r,n,a,i){this.indented=e,this.column=t,this.type=r,this.prev=a,this.info=i,null!=n&&(this.align=n)}function d(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return!0;for(var n=e.context;n;n=n.prev)for(var r=n.vars;r;r=r.next)if(r.name==t)return!0}function p(e,t,r,n,a){var i=e.cc;for(qe.state=e,qe.stream=a,qe.marked=null,qe.cc=i,qe.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;){var o=i.length?i.pop():Me?j:g;if(o(r,n)){for(;i.length&&i[i.length-1].lex;)i.pop()();return qe.marked?qe.marked:"variable"==r&&d(e,n)?"variable-2":t}}}function m(){for(var e=arguments.length-1;e>=0;e--)qe.cc.push(arguments[e])}function v(){return m.apply(null,arguments),!0}function y(e){function t(t){for(var r=t;r;r=r.next)if(r.name==e)return!0;return!1}var r=qe.state;if(qe.marked="def",r.context){if(t(r.localVars))return;r.localVars={name:e,next:r.localVars}}else{if(t(r.globalVars))return;n.globalVars&&(r.globalVars={name:e,next:r.globalVars})}}function k(){qe.state.context={prev:qe.state.context,vars:qe.state.localVars},qe.state.localVars=Ce}function b(){qe.state.localVars=qe.state.context.vars,qe.state.context=qe.state.context.prev}function x(e,t){var r=function(){var r=qe.state,n=r.indented;if("stat"==r.lexical.type)n=r.lexical.indented;else for(var a=r.lexical;a&&")"==a.type&&a.align;a=a.prev)n=a.indented;r.lexical=new f(n,qe.stream.column(),e,null,r.lexical,t)};return r.lex=!0,r}function h(){var e=qe.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function w(e){function t(r){return r==e?v():";"==e?m():v(t)}return t}function g(e,t){return"var"==e?v(x("vardef",t.length),R,w(";"),h):"keyword a"==e?v(x("form"),j,g,h):"keyword b"==e?v(x("form"),g,h):"{"==e?v(x("}"),G,h):";"==e?v():"if"==e?("else"==qe.state.lexical.info&&qe.state.cc[qe.state.cc.length-1]==h&&qe.state.cc.pop()(),v(x("form"),j,g,h,ee)):"function"==e?v(oe):"for"==e?v(x("form"),te,g,h):"variable"==e?v(x("stat"),S):"switch"==e?v(x("form"),j,x("}","switch"),w("{"),G,h,h):"case"==e?v(j,w(":")):"default"==e?v(w(":")):"catch"==e?v(x("form"),k,w("("),ce,w(")"),g,h,b):"class"==e?v(x("form"),ue,h):"export"==e?v(x("stat"),de,h):"import"==e?v(x("stat"),pe,h):"module"==e?v(x("form"),X,x("}"),w("{"),G,h,h):"async"==e?v(g):m(x("stat"),j,w(";"),h)}function j(e){return V(e,!1)}function M(e){return V(e,!0)}function V(e,t){if(qe.state.fatArrowAt==qe.stream.start){var r=t?C:q;if("("==e)return v(k,x(")"),D(X,")"),h,w("=>"),r,b);if("variable"==e)return m(k,X,w("=>"),r,b)}var n=t?A:z;return $e.hasOwnProperty(e)?v(n):"function"==e?v(oe,n):"keyword c"==e||"async"==e?v(t?I:E):"("==e?v(x(")"),E,w(")"),h,n):"operator"==e||"spread"==e?v(t?M:j):"["==e?v(x("]"),ke,h,n):"{"==e?F(B,"}",null,n):"quasi"==e?m(T,n):"new"==e?v(W(t)):v()}function E(e){return e.match(/[;\}\)\],]/)?m():m(j)}function I(e){return e.match(/[;\}\)\],]/)?m():m(M)}function z(e,t){return","==e?v(j):A(e,t,!1)}function A(e,t,r){var n=0==r?z:A,a=0==r?j:M;return"=>"==e?v(k,r?C:q,b):"operator"==e?/\+\+|--/.test(t)?v(n):"?"==t?v(j,w(":"),a):v(a):"quasi"==e?m(T,n):";"!=e?"("==e?F(M,")","call",n):"."==e?v(N,n):"["==e?v(x("]"),E,w("]"),h,n):void 0:void 0}function T(e,t){return"quasi"!=e?m():"${"!=t.slice(t.length-2)?v(T):v(j,$)}function $(e){if("}"==e)return qe.marked="string-2",qe.state.tokenize=l,v(T)}function q(e){return s(qe.stream,qe.state),m("{"==e?g:j)}function C(e){return s(qe.stream,qe.state),m("{"==e?g:M)}function W(e){return function(t){return"."==t?v(e?P:O):m(e?M:j)}}function O(e,t){if("target"==t)return qe.marked="keyword",v(z)}function P(e,t){if("target"==t)return qe.marked="keyword",v(A)}function S(e){return":"==e?v(h,g):m(z,w(";"),h)}function N(e){if("variable"==e)return qe.marked="property",v()}function B(e,t){return"async"==e?v(B):"variable"==e||"keyword"==qe.style?(qe.marked="property",v("get"==t||"set"==t?H:U)):"number"==e||"string"==e?(qe.marked=je?"property":qe.style+" property",v(U)):"jsonld-keyword"==e?v(U):"modifier"==e?v(B):"["==e?v(j,w("]"),U):"spread"==e?v(j):void 0}function H(e){return"variable"!=e?m(U):(qe.marked="property",v(oe))}function U(e){return":"==e?v(M):"("==e?m(oe):void 0}function D(e,t){function r(n,a){if(","==n){var i=qe.state.lexical;return"call"==i.info&&(i.pos=(i.pos||0)+1),v(function(r,n){return r==t||n==t?m():m(e)},r)}return n==t||a==t?v():v(w(t))}return function(n,a){return n==t||a==t?v():m(e,r)}}function F(e,t,r){for(var n=3;n<arguments.length;n++)qe.cc.push(arguments[n]);return v(x(t,r),D(e,t),h)}function G(e){return"}"==e?v():m(g,G)}function J(e){if(Ve&&":"==e)return v(L)}function K(e,t){if("="==t)return v(M)}function L(e){if("variable"==e)return qe.marked="variable-3",v(Q)}function Q(e,t){return"<"==t?v(D(L,">"),Q):"["==e?v(w("]"),Q):void 0}function R(){return m(X,J,Z,_)}function X(e,t){return"modifier"==e?v(X):"variable"==e?(y(t),v()):"spread"==e?v(X):"["==e?F(X,"]"):"{"==e?F(Y,"}"):void 0}function Y(e,t){return"variable"!=e||qe.stream.match(/^\s*:/,!1)?("variable"==e&&(qe.marked="property"),"spread"==e?v(X):"}"==e?m():v(w(":"),X,Z)):(y(t),v(Z))}function Z(e,t){if("="==t)return v(M)}function _(e){if(","==e)return v(R)}function ee(e,t){if("keyword b"==e&&"else"==t)return v(x("form","else"),g,h)}function te(e){if("("==e)return v(x(")"),re,w(")"),h)}function re(e){return"var"==e?v(R,w(";"),ae):";"==e?v(ae):"variable"==e?v(ne):m(j,w(";"),ae)}function ne(e,t){return"in"==t||"of"==t?(qe.marked="keyword",v(j)):v(z,ae)}function ae(e,t){return";"==e?v(ie):"in"==t||"of"==t?(qe.marked="keyword",v(j)):m(j,w(";"),ie)}function ie(e){")"!=e&&v(j)}function oe(e,t){return"*"==t?(qe.marked="keyword",v(oe)):"variable"==e?(y(t),v(oe)):"("==e?v(k,x(")"),D(ce,")"),h,J,g,b):void 0}function ce(e){return"spread"==e?v(ce):m(X,J,K)}function ue(e,t){if("variable"==e)return y(t),v(le)}function le(e,t){return"extends"==t?v(j,le):"{"==e?v(x("}"),se,h):void 0}function se(e,t){return"variable"==e||"keyword"==qe.style?"static"==t?(qe.marked="keyword",v(se)):(qe.marked="property","get"==t||"set"==t?v(fe,oe,se):v(oe,se)):"*"==t?(qe.marked="keyword",v(se)):";"==e?v(se):"}"==e?v():void 0}function fe(e){return"variable"!=e?m():(qe.marked="property",v())}function de(e,t){return"*"==t?(qe.marked="keyword",v(ye,w(";"))):"default"==t?(qe.marked="keyword",v(j,w(";"))):m(g)}function pe(e){return"string"==e?v():m(me,ye)}function me(e,t){return"{"==e?F(me,"}"):("variable"==e&&y(t),"*"==t&&(qe.marked="keyword"),v(ve))}function ve(e,t){if("as"==t)return qe.marked="keyword",v(me)}function ye(e,t){if("from"==t)return qe.marked="keyword",v(j)}function ke(e){return"]"==e?v():m(M,D(M,"]"))}function be(e,t){return"operator"==e.lastType||","==e.lastType||ze.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}var xe,he,we=r.indentUnit,ge=n.statementIndent,je=n.jsonld,Me=n.json||je,Ve=n.typescript,Ee=n.wordCharacters||/[\w$\xa1-\uffff]/,Ie=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),a=e("operator"),i={type:"atom",style:"atom"},o={"if":e("if"),"while":t,"with":t,"else":r,"do":r,"try":r,"finally":r,"return":n,"break":n,"continue":n,"new":e("new"),"delete":n,"throw":n,"debugger":n,"var":e("var"),"const":e("var"),"let":e("var"),"function":e("function"),"catch":e("catch"),"for":e("for"),"switch":e("switch"),"case":e("case"),"default":e("default"),"in":a,"typeof":a,"instanceof":a,"true":i,"false":i,"null":i,undefined:i,NaN:i,Infinity:i,"this":e("this"),"class":e("class"),"super":e("atom"),"yield":n,"export":e("export"),"import":e("import"),"extends":n,await:n,async:e("async")};if(Ve){var c={type:"variable",style:"variable-3"},u={"interface":e("class"),"implements":n,namespace:n,module:e("module"),"enum":e("module"),"public":e("modifier"),"private":e("modifier"),"protected":e("modifier"),"abstract":e("modifier"),as:a,string:c,number:c,"boolean":c,any:c};for(var l in u)o[l]=u[l]}return o}(),ze=/[+\-*&%=<>!?|~^]/,Ae=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,Te="([{}])",$e={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,"this":!0,"jsonld-keyword":!0},qe={state:null,column:null,marked:null,cc:null},Ce={name:"this",next:{name:"arguments"}};return h.lex=!0,{startState:function(e){var t={tokenize:o,lastType:"sof",cc:[],lexical:new f((e||0)-we,0,"block",(!1)),localVars:n.localVars,context:n.localVars&&{vars:n.localVars},indented:e||0};return n.globalVars&&"object"==typeof n.globalVars&&(t.globalVars=n.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),s(e,t)),t.tokenize!=u&&e.eatSpace())return null;var r=t.tokenize(e,t);return"comment"==xe?r:(t.lastType="operator"!=xe||"++"!=he&&"--"!=he?xe:"incdec",p(t,r,xe,he,e))},indent:function(t,r){if(t.tokenize==u)return e.Pass;if(t.tokenize!=o)return 0;var a=r&&r.charAt(0),i=t.lexical;if(!/^\s*else\b/.test(r))for(var c=t.cc.length-1;c>=0;--c){var l=t.cc[c];if(l==h)i=i.prev;else if(l!=ee)break}"stat"==i.type&&"}"==a&&(i=i.prev),ge&&")"==i.type&&"stat"==i.prev.type&&(i=i.prev);var s=i.type,f=a==s;return"vardef"==s?i.indented+("operator"==t.lastType||","==t.lastType?i.info+1:0):"form"==s&&"{"==a?i.indented:"form"==s?i.indented+we:"stat"==s?i.indented+(be(t,r)?ge||we:0):"switch"!=i.info||f||0==n.doubleIndentSwitch?i.align?i.column+(f?0:1):i.indented+(f?0:we):i.indented+(/^(?:case|default)\b/.test(r)?we:2*we)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:Me?null:"/*",blockCommentEnd:Me?null:"*/",lineComment:Me?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:Me?"json":"javascript",jsonldMode:je,jsonMode:Me,expressionAllowed:t,skipExpression:function(e){var t=e.cc[e.cc.length-1];t!=j&&t!=M||e.cc.pop()}}}),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})});

/***/ },

/***/ "./src/parsers/html/parse5.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./node_modules/parse5/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="parse5",defaultOptions={treeAdapter:"default"},parserSettingsConfiguration={fields:[["treeAdapter",["default","htmlparser2"]]]};exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["__location"]),loadParser:function(e){__webpack_require__.e/* require */(7, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/parse5/lib/parser/index.js"),__webpack_require__("./node_modules/parse5/lib/tree_adapters/default.js"),__webpack_require__("./node_modules/parse5/lib/tree_adapters/htmlparser2.js")]; (function(t,r,a){e({Parser:t,TreeAdapters:{"default":r,htmlparser2:a}})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,t,r){var a=e.Parser,n=e.TreeAdapters;return this.options=(0,_extends3["default"])({},defaultOptions,r),new a({treeAdapter:n[this.options.treeAdapter],locationInfo:!0}).parse(t)},getNodeName:function(e){return"htmlparser2"===this.options.treeAdapter?e.type+(e.name&&"root"!==e.type?"("+e.name+")":""):e.nodeName},nodeToRange:function(e){var t=e.__location;if(t)return[t.startOffset,t.endOffset]},opensByDefault:function(e,t){return"children"===t||"childNodes"===t},renderSettings:function(e,t){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:t})},_ignoredProperties:new _set2["default"](["parentNode","prev","next","parent","firstChild","lastChild"])});

/***/ },

/***/ "./node_modules/parse5/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"parse5@^2.0.0",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "parse5@>=2.0.0 <3.0.0",
		"_id": "parse5@2.1.5",
		"_inCache": true,
		"_installable": true,
		"_location": "/parse5",
		"_nodeVersion": "4.2.2",
		"_npmUser": {
			"email": "ifaaan@gmail.com",
			"name": "inikulin"
		},
		"_npmVersion": "2.14.7",
		"_phantomChildren": {},
		"_requested": {
			"name": "parse5",
			"raw": "parse5@^2.0.0",
			"rawSpec": "^2.0.0",
			"scope": null,
			"spec": ">=2.0.0 <3.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/parse5/-/parse5-2.1.5.tgz",
		"_shasum": "7a8677ade25ddac04237905f7be54645572dcf05",
		"_shrinkwrap": null,
		"_spec": "parse5@^2.0.0",
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
				"email": "s.agg2021@gmail.com",
				"name": "Saksham Aggarwal"
			},
			{
				"email": "sebmaster16@gmail.com",
				"name": "Sebastian Mayr",
				"url": "http://blog.smayr.name"
			},
			{
				"email": "slang800@gmail.com",
				"name": "Sean Lang",
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
		"directories": {},
		"dist": {
			"shasum": "7a8677ade25ddac04237905f7be54645572dcf05",
			"tarball": "https://registry.npmjs.org/parse5/-/parse5-2.1.5.tgz"
		},
		"files": [
			"lib"
		],
		"gitHead": "3c195ec374422497fdce1f98528dab9e7ebbeb9b",
		"homepage": "https://github.com/inikulin/parse5",
		"keywords": [
			"html",
			"parser",
			"html5",
			"WHATWG",
			"specification",
			"fast",
			"html parser",
			"html5 parser",
			"htmlparser",
			"parse5",
			"serializer",
			"html serializer",
			"htmlserializer",
			"sax",
			"simple api",
			"parse",
			"tokenize",
			"serialize",
			"tokenizer"
		],
		"license": "MIT",
		"main": "./lib/index.js",
		"maintainers": [
			{
				"email": "ifaaan@gmail.com",
				"name": "inikulin"
			}
		],
		"name": "parse5",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
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

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _assign=__webpack_require__("./node_modules/babel-runtime/core-js/object/assign.js"),_assign2=_interopRequireDefault(_assign),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_package=__webpack_require__("./node_modules/acorn/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="acorn",defaultOptions={ecmaVersion:6,sourceType:"module",allowReserved:!1,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,locations:!1,loose:!1,ranges:!1,preserveParens:!1,"plugins.jsx":!0},settingsConfiguration={fields:[["ecmaVersion",[3,5,6,7],function(e){return Number(e)}],["sourceType",["script","module"]],"allowReserved","allowReturnOutsideFunction","allowImportExportEverywhere","allowHashBang","locations","loose","ranges","preserveParens","plugins.jsx"]};exports["default"]=(0,_extends3["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:ID,version:""+_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["range","loc","start","end"]),loadParser:function(e){__webpack_require__.e/* require */(8, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/acorn/dist/acorn.js"),__webpack_require__("./node_modules/acorn/dist/acorn_loose.js"),__webpack_require__("./node_modules/acorn-jsx/inject.js")]; (function(r,t,a){r=a(r),e({acorn:r,acornLoose:t})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,r){var t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];t=(0,_assign2["default"])({},defaultOptions,t);var a=t.loose?e.acornLoose.parse_dammit:e.acorn.parse;return a(r,(0,_extends3["default"])({},t,{plugins:t["plugins.jsx"]&&!t.loose?{jsx:!0}:{}}))},nodeToRange:function(e){if("number"==typeof e.start)return[e.start,e.end]},renderSettings:function(e,r){return _react2["default"].createElement("div",null,_react2["default"].createElement("p",null,_react2["default"].createElement("a",{href:"https://github.com/marijnh/acorn/blob/master/src/options.js",target:"_blank"},"Option descriptions")),_react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:settingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:r}))}});

/***/ },

/***/ "./src/parsers/js/utils/defaultESTreeParserInterface.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface);exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{opensByDefault:function(e,r){return"Program"===e.type||"body"===r||"elements"===r||"declarations"===r||"expression"===r}});

/***/ },

/***/ "./node_modules/acorn/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"acorn@^3.0.4",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "acorn@>=3.0.4 <4.0.0",
		"_id": "acorn@3.3.0",
		"_inCache": true,
		"_installable": true,
		"_location": "/acorn",
		"_nodeVersion": "6.3.0",
		"_npmOperationalInternal": {
			"host": "packages-16-east.internal.npmjs.com",
			"tmp": "tmp/acorn-3.3.0.tgz_1469481913382_0.3856039580423385"
		},
		"_npmUser": {
			"email": "marijnh@gmail.com",
			"name": "marijn"
		},
		"_npmVersion": "3.10.3",
		"_phantomChildren": {},
		"_requested": {
			"name": "acorn",
			"raw": "acorn@^3.0.4",
			"rawSpec": "^3.0.4",
			"scope": null,
			"spec": ">=3.0.4 <4.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/",
			"/acorn-jsx",
			"/espree",
			"/webpack"
		],
		"_resolved": "https://registry.npmjs.org/acorn/-/acorn-3.3.0.tgz",
		"_shasum": "45e37fb39e8da3f25baee3ff5369e2bb5f22017a",
		"_shrinkwrap": null,
		"_spec": "acorn@^3.0.4",
		"_where": "/Users/fkling/git/astexplorer",
		"bin": {
			"acorn": "./bin/acorn"
		},
		"bugs": {
			"url": "https://github.com/ternjs/acorn/issues"
		},
		"contributors": [
			{
				"name": "List of Acorn contributors. Updated before every release."
			},
			{
				"name": "Adrian Rakovsky"
			},
			{
				"name": "Alistair Braidwood"
			},
			{
				"name": "Amila Welihinda"
			},
			{
				"name": "Andres Suarez"
			},
			{
				"name": "Angelo"
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
				"name": "Daniel Tschinder"
			},
			{
				"name": "David Bonnet"
			},
			{
				"name": "Domenico Matteo"
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
				"name": "Jackson Ray Hamilton"
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
				"name": "Jordan Klassen"
			},
			{
				"name": "Jürg Lehni"
			},
			{
				"name": "keeyipchan"
			},
			{
				"name": "Keheliya Gallaba"
			},
			{
				"name": "Kevin Irish"
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
				"name": "Matthew Bastien"
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
				"name": "Nicholas C. Zakas"
			},
			{
				"name": "Nick Fitzgerald"
			},
			{
				"name": "Olivier Thomann"
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
				"name": "Prayag Verma"
			},
			{
				"name": "ReadmeCritic"
			},
			{
				"name": "r-e-d"
			},
			{
				"name": "Richard Gibson"
			},
			{
				"name": "Rich Harris"
			},
			{
				"name": "Rich-Harris"
			},
			{
				"name": "Sebastian McKenzie"
			},
			{
				"name": "Timothy Gu"
			},
			{
				"name": "Toru Nagashima"
			},
			{
				"name": "zsjforcn"
			}
		],
		"dependencies": {},
		"description": "ECMAScript parser",
		"devDependencies": {
			"rollup": "^0.34.1",
			"rollup-plugin-buble": "^0.11.0",
			"unicode-9.0.0": "^0.7.0"
		},
		"directories": {},
		"dist": {
			"shasum": "45e37fb39e8da3f25baee3ff5369e2bb5f22017a",
			"tarball": "https://registry.npmjs.org/acorn/-/acorn-3.3.0.tgz"
		},
		"engines": {
			"node": ">=0.4.0"
		},
		"gitHead": "693c5fe9257c3e114a7097dc9196d6e484e52809",
		"homepage": "https://github.com/ternjs/acorn",
		"jsnext:main": "dist/acorn.es.js",
		"license": "MIT",
		"main": "dist/acorn.js",
		"maintainers": [
			{
				"email": "marijnh@gmail.com",
				"name": "marijn"
			},
			{
				"email": "me@rreverser.com",
				"name": "rreverser"
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
			"build": "npm run build:main && npm run build:walk && npm run build:loose && npm run build:bin",
			"build:bin": "rollup -c rollup/config.bin.js",
			"build:loose": "rollup -c rollup/config.loose.js",
			"build:main": "rollup -c rollup/config.main.js",
			"build:walk": "rollup -c rollup/config.walk.js",
			"prepublish": "npm test",
			"pretest": "npm run build",
			"test": "node test/run.js"
		},
		"version": "3.3.0"
	};

/***/ },

/***/ "./src/parsers/js/babel-eslint.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_package=__webpack_require__("./node_modules/acorn-to-esprima/package.json"),_package2=_interopRequireDefault(_package),ID="acorn-to-esprima",name="babel-eslint";exports["default"]=(0,_extends3["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:name,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["loc","start","end","range"]),loadParser:function(e){__webpack_require__.e/* require */(9, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/acorn-to-esprima/src/index.js"),__webpack_require__("./node_modules/babel5/index.js")]; (function(t,r){var a=r.acorn.tokTypes,n=r.traverse,s=r.parse;e((0,_extends3["default"])({},t,{tokTypes:a,traverse:n,parse:s}))}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,t){var r={locations:!0,ranges:!0},a=r.onComment=[],n=r.onToken=[],s=e.parse(t,r);return s.tokens=e.toTokens(n,e.tokTypes),e.convertComments(a),s.comments=a,e.attachComments(s,a,s.tokens),e.toAST(s,e.traverse),s},nodeToRange:function(e){if("undefined"!=typeof e.start)return[e.start,e.end]},_ignoredProperties:new _set2["default"](["_paths","_babelType","__clone"])});

/***/ },

/***/ "./node_modules/acorn-to-esprima/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"acorn-to-esprima@^1.0.2",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "acorn-to-esprima@>=1.0.2 <2.0.0",
		"_id": "acorn-to-esprima@1.0.7",
		"_inCache": true,
		"_installable": true,
		"_location": "/acorn-to-esprima",
		"_nodeVersion": "0.12.7",
		"_npmUser": {
			"email": "hi@henryzoo.com",
			"name": "hzoo"
		},
		"_npmVersion": "2.13.4",
		"_phantomChildren": {},
		"_requested": {
			"name": "acorn-to-esprima",
			"raw": "acorn-to-esprima@^1.0.2",
			"rawSpec": "^1.0.2",
			"scope": null,
			"spec": ">=1.0.2 <2.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/acorn-to-esprima/-/acorn-to-esprima-1.0.7.tgz",
		"_shasum": "9436259760098f9ead9b9da2242fab2f4850281b",
		"_shrinkwrap": null,
		"_spec": "acorn-to-esprima@^1.0.2",
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
		"directories": {},
		"dist": {
			"shasum": "9436259760098f9ead9b9da2242fab2f4850281b",
			"tarball": "https://registry.npmjs.org/acorn-to-esprima/-/acorn-to-esprima-1.0.7.tgz"
		},
		"gitHead": "f0df07bd87bb82dccff10d72f756be81c666ae83",
		"homepage": "https://github.com/babel/acorn-to-esprima#readme",
		"keywords": [
			"acorn",
			"esprima",
			"babel-eslint",
			"babel-jscs",
			"babel"
		],
		"license": "MIT",
		"main": "src/index.js",
		"maintainers": [
			{
				"email": "hi@henryzoo.com",
				"name": "hzoo"
			},
			{
				"email": "sebmck@gmail.com",
				"name": "sebmck"
			}
		],
		"name": "acorn-to-esprima",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/babel/acorn-to-esprima.git"
		},
		"scripts": {},
		"version": "1.0.7"
	};

/***/ },

/***/ "./src/parsers/js/babylon.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_defineProperty2=__webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js"),_defineProperty3=_interopRequireDefault(_defineProperty2),_extends3=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends4=_interopRequireDefault(_extends3),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_babylonPackage=__webpack_require__("./node_modules/babylon5/babylon-package.js"),_babylonPackage2=_interopRequireDefault(_babylonPackage),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="babylon",defaultOptions={sourceType:"module",allowReserved:!1,allowReturnOutsideFunction:!1,strictMode:!1,features:{"es7.asyncFunctions":!0,"es7.classProperties":!0,"es7.comprehensions":!0,"es7.decorators":!0,"es7.exportExtensions":!0,"es7.functionBind":!0,"es7.objectRestSpread":!0,"es7.trailingFunctionCommas":!0},plugins:{jsx:!0,flow:!0}},parserSettingsConfiguration={fields:[["sourceType",["module","script"]],"allowReserved","allowReturnOutsideFunction","strictMode",{key:"features",title:"Features",fields:(0,_keys2["default"])(defaultOptions.features),settings:function(e){return e.features||(0,_extends4["default"])({},defaultOptions.features)}},{key:"plugins",title:"Plugins",fields:(0,_keys2["default"])(defaultOptions.plugins),settings:function(e){return e.plugins||(0,_extends4["default"])({},defaultOptions.plugins)},values:function(e){return(0,_keys2["default"])(defaultOptions.plugins).reduce(function(t,r){return t[r]=r in e,t},{})},update:function(e,t,r){return r?(0,_extends4["default"])({},e,(0,_defineProperty3["default"])({},t,!0)):(e=(0,_extends4["default"])({},e),delete e[t],e)}}]};exports["default"]=(0,_extends4["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:ID,version:_babylonPackage2["default"].version,homepage:_babylonPackage2["default"].homepage,locationProps:new _set2["default"](["loc","start","end"]),loadParser:function(e){__webpack_require__.e/* require */(10, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/babylon5/index.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,t,r){return e.parse(t,(0,_extends4["default"])({},defaultOptions,r))},getNodeName:function(e){switch((0,_typeof3["default"])(e.type)){case"string":return e.type;case"object":return"Token ("+e.type.label+")"}},nodeToRange:function(e){if("undefined"!=typeof e.start)return[e.start,e.end]},_ignoredProperties:new _set2["default"](["__clone"]),renderSettings:function(e,t){return _react2["default"].createElement("div",null,_react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:e,onChange:t}))}});

/***/ },

/***/ "./node_modules/babylon5/babylon-package.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/babylon5/node_modules/babylon/package.json");

/***/ },

/***/ "./node_modules/babylon5/node_modules/babylon/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"babylon@^5.8.38",
				"/Users/fkling/git/astexplorer/packages/babylon5"
			]
		],
		"_from": "babylon@>=5.8.38 <6.0.0",
		"_id": "babylon@5.8.38",
		"_inCache": true,
		"_installable": true,
		"_location": "/babylon5/babylon",
		"_nodeVersion": "5.5.0",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/babylon-5.8.38.tgz_1458687018469_0.5434813795145601"
		},
		"_npmUser": {
			"email": "sebmck@gmail.com",
			"name": "sebmck"
		},
		"_npmVersion": "3.3.12",
		"_phantomChildren": {},
		"_requested": {
			"name": "babylon",
			"raw": "babylon@^5.8.38",
			"rawSpec": "^5.8.38",
			"scope": null,
			"spec": ">=5.8.38 <6.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/babylon5"
		],
		"_resolved": "https://registry.npmjs.org/babylon/-/babylon-5.8.38.tgz",
		"_shasum": "ec9b120b11bf6ccd4173a18bf217e60b79859ffd",
		"_shrinkwrap": null,
		"_spec": "babylon@^5.8.38",
		"_where": "/Users/fkling/git/astexplorer/packages/babylon5",
		"author": {
			"email": "sebmck@gmail.com",
			"name": "Sebastian McKenzie"
		},
		"bugs": {
			"url": "https://github.com/babel/babel/issues"
		},
		"contributors": [
			{
				"name": "List of Acorn contributors. Updated before every release."
			},
			{
				"name": "Adrian Rakovsky"
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
				"name": "keeyipchan"
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
		"directories": {},
		"dist": {
			"shasum": "ec9b120b11bf6ccd4173a18bf217e60b79859ffd",
			"tarball": "https://registry.npmjs.org/babylon/-/babylon-5.8.38.tgz"
		},
		"homepage": "https://babeljs.io/",
		"license": "MIT",
		"main": "lib/index.js",
		"maintainers": [
			{
				"email": "amjad.masad@gmail.com",
				"name": "amasad"
			},
			{
				"email": "hi@henryzoo.com",
				"name": "hzoo"
			},
			{
				"email": "npm-public@jessemccarthy.net",
				"name": "jmm"
			},
			{
				"email": "loganfsmyth@gmail.com",
				"name": "loganfsmyth"
			},
			{
				"email": "sebmck@gmail.com",
				"name": "sebmck"
			},
			{
				"email": "me@thejameskyle.com",
				"name": "thejameskyle"
			}
		],
		"name": "babylon",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/babel/babel.git"
		},
		"scripts": {},
		"version": "5.8.38"
	};

/***/ },

/***/ "./src/parsers/js/babylon6.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_babylonPackage=__webpack_require__("./node_modules/babylon6/babylon-package.js"),_babylonPackage2=_interopRequireDefault(_babylonPackage),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="babylon6",defaultOptions={sourceType:"module",allowImportExportEverywhere:!1,allowReturnOutsideFunction:!1,plugins:["asyncFunctions","asyncGenerators","classConstructorCall","classProperties","decorators","doExpressions","exponentiationOperator","exportExtensions","flow","functionSent","functionBind","jsx","objectRestSpread","trailingFunctionCommas"]},parserSettingsConfiguration={fields:[["sourceType",["module","script"]],"allowReturnOutsideFunction","allowImportExportEverywhere",{key:"plugins",title:"Plugins",fields:defaultOptions.plugins,settings:function(e){return e.plugins||defaultOptions.plugins},values:function(e){return defaultOptions.plugins.reduce(function(t,r){return t[r]=e.indexOf(r)>-1,t},{})}}]};exports["default"]=(0,_extends3["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:ID,version:_babylonPackage2["default"].version,homepage:_babylonPackage2["default"].homepage,locationProps:new _set2["default"](["loc","start","end"]),loadParser:function(e){__webpack_require__.e/* require */(11, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/babylon6/index.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,t,r){return e.parse(t,(0,_extends3["default"])({},defaultOptions,r))},getNodeName:function(e){switch((0,_typeof3["default"])(e.type)){case"string":return e.type;case"object":return"Token ("+e.type.label+")"}},nodeToRange:function(e){if("undefined"!=typeof e.start)return[e.start,e.end]},renderSettings:function(e,t){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:t})}});

/***/ },

/***/ "./node_modules/babylon6/babylon-package.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/babylon/package.json");

/***/ },

/***/ "./node_modules/babylon/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"babylon@^6.0.18",
				"/Users/fkling/git/astexplorer/node_modules/babel-eslint"
			]
		],
		"_from": "babylon@>=6.0.18 <7.0.0",
		"_id": "babylon@6.8.4",
		"_inCache": true,
		"_installable": true,
		"_location": "/babylon",
		"_nodeVersion": "5.11.1",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/babylon-6.8.4.tgz_1467848136699_0.6809531478211284"
		},
		"_npmUser": {
			"email": "hi@henryzoo.com",
			"name": "hzoo"
		},
		"_npmVersion": "3.10.3",
		"_phantomChildren": {},
		"_requested": {
			"name": "babylon",
			"raw": "babylon@^6.0.18",
			"rawSpec": "^6.0.18",
			"scope": null,
			"spec": ">=6.0.18 <7.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/babel-core",
			"/babel-eslint",
			"/babel-plugin-transform-regenerator",
			"/babel-template",
			"/babel-traverse",
			"/babylon6",
			"/esformatter-parser",
			"/jscodeshift"
		],
		"_resolved": "https://registry.npmjs.org/babylon/-/babylon-6.8.4.tgz",
		"_shasum": "097306b8dabae95159225cf29b3ea55912053180",
		"_shrinkwrap": null,
		"_spec": "babylon@^6.0.18",
		"_where": "/Users/fkling/git/astexplorer/node_modules/babel-eslint",
		"author": {
			"email": "sebmck@gmail.com",
			"name": "Sebastian McKenzie"
		},
		"bin": {
			"babylon": "./bin/babylon.js"
		},
		"bugs": {
			"url": "https://github.com/babel/babylon/issues"
		},
		"contributors": [
			{
				"name": "List of Acorn contributors. Updated before every release."
			},
			{
				"name": "Adrian Rakovsky"
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
				"name": "keeyipchan"
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
			"babel-runtime": "^6.0.0"
		},
		"description": "A JavaScript parser",
		"devDependencies": {
			"ava": "^0.15.2",
			"babel-cli": "^6.0.0",
			"babel-helper-fixtures": "^6.6.5",
			"babel-plugin-transform-class-properties": "^6.6.0",
			"babel-plugin-transform-runtime": "^6.0.0",
			"babel-preset-es2015": "^6.0.0",
			"babel-preset-react": "^6.0.0",
			"babel-preset-stage-0": "^6.5.0",
			"kcheck": "^2.0.1",
			"lodash": "^4.6.1",
			"unicode-9.0.0": "~0.7.0"
		},
		"directories": {},
		"dist": {
			"shasum": "097306b8dabae95159225cf29b3ea55912053180",
			"tarball": "https://registry.npmjs.org/babylon/-/babylon-6.8.4.tgz"
		},
		"files": [
			"bin",
			"lib"
		],
		"gitHead": "46fc22438224a73db3149b1eabcc1525eeafeb9e",
		"homepage": "https://babeljs.io/",
		"license": "MIT",
		"main": "lib/index.js",
		"maintainers": [
			{
				"email": "amjad.masad@gmail.com",
				"name": "amasad"
			},
			{
				"email": "gabelevi@gmail.com",
				"name": "gabelevi"
			},
			{
				"email": "hi@henryzoo.com",
				"name": "hzoo"
			},
			{
				"email": "npm-public@jessemccarthy.net",
				"name": "jmm"
			},
			{
				"email": "loganfsmyth@gmail.com",
				"name": "loganfsmyth"
			},
			{
				"email": "sebmck@gmail.com",
				"name": "sebmck"
			},
			{
				"email": "me@thejameskyle.com",
				"name": "thejameskyle"
			}
		],
		"name": "babylon",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/babel/babylon.git"
		},
		"scripts": {
			"build": "babel src --out-dir lib",
			"lint": "kcheck",
			"test": "npm run build && npm run lint && ava test/",
			"watch": "babel src --out-dir lib --watch"
		},
		"version": "6.8.4"
	};

/***/ },

/***/ "./src/parsers/js/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "/**\n * Paste or drop some JavaScript here and explore\n * the syntax tree created by chosen parser.\n * You can use all the cool new features from ES6\n * and even more. Enjoy!\n */\n\nlet tips = [\n  \"Click on any AST node with a '+' to expand it\",\n\n  \"Hovering over a node highlights the \\\n   corresponding part in the source code\",\n\n  \"Shift click on an AST node expands the whole substree\"\n];\n\nfunction printTips() {\n  tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip));\n}\n"

/***/ },

/***/ "./src/parsers/js/esformatter.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=__webpack_require__("./node_modules/babel-runtime/regenerator/index.js"),_regenerator2=_interopRequireDefault(_regenerator),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_package=__webpack_require__("./node_modules/esformatter-parser/package.json"),_package2=_interopRequireDefault(_package),ID="esformatter-parser",name="esformatter";exports["default"]=(0,_extends3["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:name,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["loc","start","end","range"]),loadParser:function(e){__webpack_require__.e/* require */(12, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/esformatter-parser/esformatter-parser.js")]; (function(r){e(r)}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,r){return e.parse(r)},forEachProperty:_regenerator2["default"].mark(function e(r){var t,a;return _regenerator2["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=_regenerator2["default"].keys(r);case 1:if((e.t1=e.t0()).done){e.next=11;break}if(t=e.t1.value,!this._ignoredProperties.has(t)){e.next=5;break}return e.abrupt("continue",1);case 5:return a=r[t],"Program"!==r.type&&"parent"===t&&(a="[Circular]"),e.next=9,{value:a,key:t,computed:!1};case 9:e.next=1;break;case 11:case"end":return e.stop()}},e,this)}),_ignoredProperties:new _set2["default"](["_paths","_babelType","__clone","comments","directives","extra","leadingComments","root","sourceType","tokens","trailingComments"])});

/***/ },

/***/ "./node_modules/esformatter-parser/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"esformatter-parser@^1.0.0",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "esformatter-parser@>=1.0.0 <2.0.0",
		"_id": "esformatter-parser@1.0.0",
		"_inCache": true,
		"_installable": true,
		"_location": "/esformatter-parser",
		"_nodeVersion": "4.2.1",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/esformatter-parser-1.0.0.tgz_1464205052948_0.8728667397517711"
		},
		"_npmUser": {
			"email": "miller@millermedeiros.com",
			"name": "millermedeiros"
		},
		"_npmVersion": "2.14.7",
		"_phantomChildren": {},
		"_requested": {
			"name": "esformatter-parser",
			"raw": "esformatter-parser@^1.0.0",
			"rawSpec": "^1.0.0",
			"scope": null,
			"spec": ">=1.0.0 <2.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/esformatter-parser/-/esformatter-parser-1.0.0.tgz",
		"_shasum": "0854072d0487539ed39cae38d8a5432c17ec11d3",
		"_shrinkwrap": null,
		"_spec": "esformatter-parser@^1.0.0",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"name": "Miller Medeiros"
		},
		"bugs": {
			"url": "https://github.com/millermedeiros/esformatter-parser/issues"
		},
		"dependencies": {
			"acorn-to-esprima": "^2.0.8",
			"babel-traverse": "^6.9.0",
			"babylon": "^6.8.0",
			"rocambole": "^0.7.0"
		},
		"description": "JavaScript parser used by esformatter",
		"devDependencies": {},
		"directories": {},
		"dist": {
			"shasum": "0854072d0487539ed39cae38d8a5432c17ec11d3",
			"tarball": "https://registry.npmjs.org/esformatter-parser/-/esformatter-parser-1.0.0.tgz"
		},
		"gitHead": "96a2e58ed9a930f7b93136cee9cb59da548dbae4",
		"homepage": "https://github.com/millermedeiros/esformatter-parser#readme",
		"keywords": [
			"babel",
			"babylon",
			"esformatter",
			"esprima",
			"parser",
			"rocambole"
		],
		"license": "MIT",
		"main": "esformatter-parser.js",
		"maintainers": [
			{
				"email": "miller@millermedeiros.com",
				"name": "millermedeiros"
			}
		],
		"name": "esformatter-parser",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/millermedeiros/esformatter-parser.git"
		},
		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1"
		},
		"version": "1.0.0"
	};

/***/ },

/***/ "./src/parsers/js/espree.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_package=__webpack_require__("./node_modules/espree/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="espree",defaultOptions={range:!0,loc:!1,comment:!1,attachComment:!1,tokens:!1,tolerant:!0,ecmaVersion:6,sourceType:"module",ecmaFeatures:{jsx:!0,globalReturn:!0,experimentalObjectRestSpread:!0}},parserSettingsConfiguration={fields:[["ecmaVersion",[3,5,6,7],function(e){return Number(e)}],["sourceType",["script","module"]],"range","loc","comment","attachComment","tokens","tolerant",{key:"ecmaFeatures",title:"ecmaFeatures",fields:(0,_keys2["default"])(defaultOptions.ecmaFeatures),settings:function(e){return e.ecmaFeatures||(0,_extends3["default"])({},defaultOptions.ecmaFeatures)}}]};exports["default"]=(0,_extends3["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["range","loc","start","end"]),loadParser:function(e){__webpack_require__.e/* require */(13, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/espree/espree.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,t,r){return e.parse(t,(0,_extends3["default"])({},defaultOptions,r))},nodeToRange:function(e){if("number"==typeof e.start)return[e.start,e.end]},renderSettings:function(e,t){return _react2["default"].createElement("div",null,_react2["default"].createElement("p",null,_react2["default"].createElement("a",{href:"https://github.com/eslint/espree#usage",target:"_blank"},"Option descriptions")),_react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:t}))}});

/***/ },

/***/ "./node_modules/espree/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"espree@^3.1.0",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "espree@>=3.1.0 <4.0.0",
		"_id": "espree@3.1.7",
		"_inCache": true,
		"_installable": true,
		"_location": "/espree",
		"_nodeVersion": "4.4.7",
		"_npmOperationalInternal": {
			"host": "packages-16-east.internal.npmjs.com",
			"tmp": "tmp/espree-3.1.7.tgz_1469818741131_0.25705570145510137"
		},
		"_npmUser": {
			"email": "nicholas+eslint@nczconsulting.com",
			"name": "eslint"
		},
		"_npmVersion": "2.15.8",
		"_phantomChildren": {},
		"_requested": {
			"name": "espree",
			"raw": "espree@^3.1.0",
			"rawSpec": "^3.1.0",
			"scope": null,
			"spec": ">=3.1.0 <4.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/",
			"/eslint",
			"/eslint2/eslint"
		],
		"_resolved": "https://registry.npmjs.org/espree/-/espree-3.1.7.tgz",
		"_shasum": "fd5deec76a97a5120a9cd3a7cb1177a0923b11d2",
		"_shrinkwrap": null,
		"_spec": "espree@^3.1.0",
		"_where": "/Users/fkling/git/astexplorer",
		"author": {
			"email": "nicholas+npm@nczconsulting.com",
			"name": "Nicholas C. Zakas"
		},
		"bugs": {
			"url": "http://github.com/eslint/espree.git"
		},
		"dependencies": {
			"acorn": "^3.3.0",
			"acorn-jsx": "^3.0.0"
		},
		"description": "An Esprima-compatible JavaScript parser built on Acorn",
		"devDependencies": {
			"browserify": "^7.0.0",
			"chai": "^1.10.0",
			"eslint": "^2.0.0-beta.1",
			"eslint-config-eslint": "^3.0.0",
			"eslint-release": "^0.6.4",
			"esprima": "latest",
			"esprima-fb": "^8001.2001.0-dev-harmony-fb",
			"istanbul": "~0.2.6",
			"json-diff": "~0.3.1",
			"leche": "^1.0.1",
			"mocha": "^2.0.1",
			"regenerate": "~0.5.4",
			"shelljs": "^0.3.0",
			"shelljs-nodecli": "^0.1.1",
			"unicode-6.3.0": "~0.1.0"
		},
		"directories": {},
		"dist": {
			"shasum": "fd5deec76a97a5120a9cd3a7cb1177a0923b11d2",
			"tarball": "https://registry.npmjs.org/espree/-/espree-3.1.7.tgz"
		},
		"engines": {
			"node": ">=0.10.0"
		},
		"files": [
			"lib",
			"espree.js"
		],
		"gitHead": "4ddfacba95c96732541d94521efbcdccce2fad99",
		"homepage": "https://github.com/eslint/espree",
		"keywords": [
			"ast",
			"ecmascript",
			"javascript",
			"parser",
			"syntax",
			"acorn"
		],
		"license": "BSD-2-Clause",
		"main": "espree.js",
		"maintainers": [
			{
				"email": "nicholas+eslint@nczconsulting.com",
				"name": "eslint"
			},
			{
				"email": "nicholas@nczconsulting.com",
				"name": "nzakas"
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
			"ci-release": "eslint-ci-release",
			"generate-regex": "node tools/generate-identifier-regex.js",
			"lint": "node Makefile.js lint",
			"release": "eslint-release",
			"test": "npm run-script lint && node Makefile.js test"
		},
		"version": "3.1.7"
	};

/***/ },

/***/ "./src/parsers/js/esprima.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=__webpack_require__("./node_modules/babel-runtime/regenerator/index.js"),_regenerator2=_interopRequireDefault(_regenerator),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_package=__webpack_require__("./node_modules/esprima/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="esprima",defaultOptions={sourceType:"module",loc:!1,range:!0,tokens:!1,comment:!1,attachComment:!1,tolerant:!1},parserSettingsConfiguration={fields:[["sourceType",["script","module"]],"range","loc","attachComment","comment","tokens","tolerant"],required:new _set2["default"](["range"])};exports["default"]=(0,_extends3["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["range","loc"]),loadParser:function(e){__webpack_require__.e/* require */(14, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/esprima/esprima.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,r,t){return e.parse(r,(0,_extends3["default"])({},defaultOptions,t))},forEachProperty:_regenerator2["default"].mark(function e(r){var t;return _regenerator2["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=_regenerator2["default"].keys(r);case 1:if((e.t1=e.t0()).done){e.next=9;break}if(t=e.t1.value,"function"!=typeof r[t]){e.next=5;break}return e.abrupt("continue",1);case 5:return e.next=7,{value:r[t],key:t,computed:!1};case 7:e.next=1;break;case 9:case"end":return e.stop()}},e,this)}),renderSettings:function(e,r){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:r})}});

/***/ },

/***/ "./node_modules/esprima/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"esprima@^2.5",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "esprima@>=2.5.0 <3.0.0",
		"_id": "esprima@2.7.2",
		"_inCache": true,
		"_installable": true,
		"_location": "/esprima",
		"_nodeVersion": "4.2.2",
		"_npmOperationalInternal": {
			"host": "packages-9-west.internal.npmjs.com",
			"tmp": "tmp/esprima-2.7.2.tgz_1454477276067_0.014412595424801111"
		},
		"_npmUser": {
			"email": "ariya.hidayat@gmail.com",
			"name": "ariya"
		},
		"_npmVersion": "2.14.7",
		"_phantomChildren": {},
		"_requested": {
			"name": "esprima",
			"raw": "esprima@^2.5",
			"rawSpec": "^2.5",
			"scope": null,
			"spec": ">=2.5.0 <3.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/",
			"/escodegen",
			"/eslint2/js-yaml",
			"/js-yaml",
			"/recast",
			"/regexpu",
			"/rocambole"
		],
		"_resolved": "https://registry.npmjs.org/esprima/-/esprima-2.7.2.tgz",
		"_shasum": "f43be543609984eae44c933ac63352a6af35f339",
		"_shrinkwrap": null,
		"_spec": "esprima@^2.5",
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
		"directories": {},
		"dist": {
			"shasum": "f43be543609984eae44c933ac63352a6af35f339",
			"tarball": "https://registry.npmjs.org/esprima/-/esprima-2.7.2.tgz"
		},
		"engines": {
			"node": ">=0.10.0"
		},
		"files": [
			"bin",
			"unit-tests.js",
			"esprima.js"
		],
		"gitHead": "eb05a03b18b8433ab1ebeabea635a949219cd75e",
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
				"email": "ariya.hidayat@gmail.com",
				"name": "ariya"
			}
		],
		"name": "esprima",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
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

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_package=__webpack_require__("./node_modules/flow-parser/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="flow",defaultOptions={esproposal_class_instance_fields:!0,esproposal_class_static_fields:!0,esproposal_decorators:!0,esproposal_export_star_as:!0,types:!0},parserSettingsConfiguration={fields:["esproposal_class_instance_fields","esproposal_class_static_fields","esproposal_decorators","esproposal_export_star_as","types"]};exports["default"]=(0,_extends3["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["range","loc"]),loadParser:function(e){__webpack_require__.e/* require */(15, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/flow-parser/flow_parser.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,r,t){return e.parse(r,(0,_extends3["default"])({},defaultOptions,t))},renderSettings:function(e,r){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:r})}});

/***/ },

/***/ "./node_modules/flow-parser/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"flow-parser@^0.28.0",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "flow-parser@>=0.28.0 <0.29.0",
		"_id": "flow-parser@0.28.0",
		"_inCache": true,
		"_installable": true,
		"_location": "/flow-parser",
		"_nodeVersion": "5.0.0",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/flow-parser-0.28.0.tgz_1468108489705_0.7863475005142391"
		},
		"_npmUser": {
			"email": "lbljeffmo@gmail.com",
			"name": "jeffmo"
		},
		"_npmVersion": "3.8.9",
		"_phantomChildren": {},
		"_requested": {
			"name": "flow-parser",
			"raw": "flow-parser@^0.28.0",
			"rawSpec": "^0.28.0",
			"scope": null,
			"spec": ">=0.28.0 <0.29.0",
			"type": "range"
		},
		"_requiredBy": [
			"/",
			"/jscodeshift"
		],
		"_resolved": "https://registry.npmjs.org/flow-parser/-/flow-parser-0.28.0.tgz",
		"_shasum": "67f2b9dba91f97e25768879048af46a7aa69a3be",
		"_shrinkwrap": null,
		"_spec": "flow-parser@^0.28.0",
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
			"ast-types": "0.8.16",
			"colors": ">=0.6.2",
			"minimist": ">=0.2.0"
		},
		"description": "JavaScript parser written in OCaml. Produces SpiderMonkey AST",
		"devDependencies": {
			"esprima-fb": "15001.1001.0-dev-harmony-fb"
		},
		"directories": {},
		"dist": {
			"shasum": "67f2b9dba91f97e25768879048af46a7aa69a3be",
			"tarball": "https://registry.npmjs.org/flow-parser/-/flow-parser-0.28.0.tgz"
		},
		"engines": {
			"node": ">=0.4.0"
		},
		"license": "BSD-3-Clause",
		"main": "flow_parser.js",
		"maintainers": [
			{
				"email": "marshall@mroch.com",
				"name": "mroch"
			},
			{
				"email": "lbljeffmo@gmail.com",
				"name": "jeffmo"
			},
			{
				"email": "gabelevi@gmail.com",
				"name": "gabelevi"
			}
		],
		"name": "flow-parser",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"private": true
		},
		"scripts": {
			"prepublish": "make js",
			"test": "node test/run_tests.js"
		},
		"version": "0.28.0"
	};

/***/ },

/***/ "./src/parsers/js/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mimeTypes=exports.displayName=exports.id=void 0,__webpack_require__("./node_modules/codemirror/mode/javascript/javascript.js");var id=exports.id="javascript",displayName=exports.displayName="JavaScript",mimeTypes=exports.mimeTypes=["text/javascript"];

/***/ },

/***/ "./src/parsers/js/recast.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=__webpack_require__("./node_modules/babel-runtime/regenerator/index.js"),_regenerator2=_interopRequireDefault(_regenerator),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultESTreeParserInterface=__webpack_require__("./src/parsers/js/utils/defaultESTreeParserInterface.js"),_defaultESTreeParserInterface2=_interopRequireDefault(_defaultESTreeParserInterface),_package=__webpack_require__("./node_modules/recast/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="recast",defaultOptions={tolerant:!1,range:!0,parser:"esprima"},parserSettingsConfiguration={fields:[["parser",["esprima","babel5","babylon6","flow"]],"range","tolerant"],required:new _set2["default"](["range"])};exports["default"]=(0,_extends3["default"])({},_defaultESTreeParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["range","loc","start","end"]),loadParser:function(e){__webpack_require__.e/* require */(16, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/recast/main.js"),__webpack_require__("./node_modules/babel5/index.js"),__webpack_require__("./node_modules/babylon6/index.js"),__webpack_require__("./node_modules/flow-parser/flow_parser.js")]; (function(r,t,a,n){e({recast:r,parsers:{babel5:t,babylon6:a,flow:n}})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,r,t){var a=e.recast,n=e.parsers;switch(t=(0,_extends3["default"])({},defaultOptions,t),t.parser){case"esprima":delete t.parser;break;default:t.parser=n[t.parser]}return a.parse(r,t)},_ignoredProperties:new _set2["default"](["__clone"]),forEachProperty:_regenerator2["default"].mark(function e(r){var t;return _regenerator2["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=_regenerator2["default"].keys(r);case 1:if((e.t1=e.t0()).done){e.next=9;break}if(t=e.t1.value,!this._ignoredProperties.has(t)&&"function"!=typeof r[t]){e.next=5;break}return e.abrupt("continue",1);case 5:return e.next=7,{value:r[t],key:t,computed:!1};case 7:e.next=1;break;case 9:case"end":return e.stop()}},e,this)}),nodeToRange:function(e){return"number"==typeof e.start?[e.start,e.end]:e.range},renderSettings:function(e,r){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:r})}});

/***/ },

/***/ "./node_modules/recast/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"recast@^0.11.0",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "recast@>=0.11.0 <0.12.0",
		"_id": "recast@0.11.11",
		"_inCache": true,
		"_installable": true,
		"_location": "/recast",
		"_nodeVersion": "6.0.0",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/recast-0.11.11.tgz_1470432216701_0.015340972226113081"
		},
		"_npmUser": {
			"email": "bn@cs.stanford.edu",
			"name": "benjamn"
		},
		"_npmVersion": "3.10.6",
		"_phantomChildren": {},
		"_requested": {
			"name": "recast",
			"raw": "recast@^0.11.0",
			"rawSpec": "^0.11.0",
			"scope": null,
			"spec": ">=0.11.0 <0.12.0",
			"type": "range"
		},
		"_requiredBy": [
			"/",
			"/jscodeshift"
		],
		"_resolved": "https://registry.npmjs.org/recast/-/recast-0.11.11.tgz",
		"_shasum": "7c4a097387b8865ff3a1122057726874be4b3101",
		"_shrinkwrap": null,
		"_spec": "recast@^0.11.0",
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
			"ast-types": "0.8.18",
			"esprima": "~2.7.1",
			"private": "~0.1.5",
			"source-map": "~0.5.0"
		},
		"description": "JavaScript syntax tree transformer, nondestructive pretty-printer, and automatic source map generator",
		"devDependencies": {
			"babylon": "~6.8.0",
			"esprima-fb": "^15001.1001.0-dev-harmony-fb",
			"mocha": "~3.0.1"
		},
		"directories": {},
		"dist": {
			"shasum": "7c4a097387b8865ff3a1122057726874be4b3101",
			"tarball": "https://registry.npmjs.org/recast/-/recast-0.11.11.tgz"
		},
		"engines": {
			"node": ">= 0.8"
		},
		"gitHead": "38ef7be1969c84546ee6e5f2802cd663ee5bc9f4",
		"homepage": "http://github.com/benjamn/recast",
		"keywords": [
			"ast",
			"rewriting",
			"refactoring",
			"codegen",
			"syntax",
			"transformation",
			"parsing",
			"pretty-printing"
		],
		"license": "MIT",
		"main": "main.js",
		"maintainers": [
			{
				"email": "bn@cs.stanford.edu",
				"name": "benjamn"
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
		"version": "0.11.11"
	};

/***/ },

/***/ "./src/parsers/js/shift.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./node_modules/shift-parser/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="shift",defaultOptions={loc:!0,earlyErrors:!1,sourceType:"module"},parserSettingsConfiguration={fields:[["sourceType",["script","module"]],"loc","earlyErrors"],required:new _set2["default"](["loc"])};exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["loc"]),loadParser:function(e){__webpack_require__.e/* require */(17, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/shift-parser/dist/index.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,r,t){t=(0,_extends3["default"])({},defaultOptions,t);var a="module"===t.sourceType?"parseModule":"parseScript";return e[a](r,t)},nodeToRange:function(e){var r=e.loc;if(r)return[r.start.offset,r.end.offset]},renderSettings:function(e,r){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:r})},opensByDefault:function(e,r){return"items"===r||"declaration"===r||"declarators"===r||"statements"===r||"expression"===r||"body"===r}});

/***/ },

/***/ "./node_modules/shift-parser/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"shift-parser@^5.0.1",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "shift-parser@>=5.0.1 <6.0.0",
		"_id": "shift-parser@5.0.1",
		"_inCache": true,
		"_installable": true,
		"_location": "/shift-parser",
		"_nodeVersion": "6.0.0",
		"_npmOperationalInternal": {
			"host": "packages-16-east.internal.npmjs.com",
			"tmp": "tmp/shift-parser-5.0.1.tgz_1465606611136_0.9064245035406202"
		},
		"_npmUser": {
			"email": "npm@michael.ficarra.me",
			"name": "michaelficarra"
		},
		"_npmVersion": "3.8.6",
		"_phantomChildren": {},
		"_requested": {
			"name": "shift-parser",
			"raw": "shift-parser@^5.0.1",
			"rawSpec": "^5.0.1",
			"scope": null,
			"spec": ">=5.0.1 <6.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/shift-parser/-/shift-parser-5.0.1.tgz",
		"_shasum": "8f6e25b05edfdc47f2d9e1c335f185b42a7834ef",
		"_shrinkwrap": null,
		"_spec": "shift-parser@^5.0.1",
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
			"shift-ast": "^4.0.0",
			"shift-reducer": "^4.0.0"
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
			"mocha": "2.3.4",
			"shift-spec": "^2016.0.0",
			"tick": "0.1.1",
			"traceur": "0.0.91",
			"uglifyjs": "2.4.10"
		},
		"directories": {},
		"dist": {
			"shasum": "8f6e25b05edfdc47f2d9e1c335f185b42a7834ef",
			"tarball": "https://registry.npmjs.org/shift-parser/-/shift-parser-5.0.1.tgz"
		},
		"files": [
			"dist"
		],
		"gitHead": "2e34679437e5c24abecc03e6d67d4240d3fe0d27",
		"homepage": "https://github.com/shapesecurity/shift-parser-js",
		"keywords": [
			"Shift",
			"AST",
			"node",
			"parser",
			"SpiderMonkey",
			"Parser",
			"API",
			"parse",
			"spider",
			"monkey",
			"abstract",
			"syntax",
			"tree"
		],
		"license": "Apache-2.0",
		"main": "dist/index.js",
		"maintainers": [
			{
				"email": "ariya.hidayat@gmail.com",
				"name": "ariya"
			},
			{
				"email": "bakkot@gmail.com",
				"name": "bakkot"
			},
			{
				"email": "ikarienator@gmail.com",
				"name": "ikarienator"
			},
			{
				"email": "npm@michael.ficarra.me",
				"name": "michaelficarra"
			}
		],
		"name": "shift-parser",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
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
		"version": "5.0.1"
	};

/***/ },

/***/ "./src/parsers/js/traceur.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=__webpack_require__("./node_modules/babel-runtime/regenerator/index.js"),_regenerator2=_interopRequireDefault(_regenerator),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_toConsumableArray2=__webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js"),_toConsumableArray3=_interopRequireDefault(_toConsumableArray2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./node_modules/traceur/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="traceur",FILENAME="astExplorer.js",defaultOptions={SourceType:"Module",TolerateErrors:!1,commentCallback:!0,annotations:!1,arrayComprehension:!1,arrowFunctions:!0,asyncFunctions:!1,asyncGenerators:!1,blockBinding:!0,classes:!0,computedPropertyNames:!0,destructuring:!0,exponentiation:!1,exportFromExtended:!1,forOf:!0,forOn:!1,generatorComprehension:!1,generators:!0,jsx:!0,memberVariables:!1,numericLiterals:!0,propertyMethods:!0,propertyNameShorthand:!0,restParameters:!0,spread:!0,templateLiterals:!0,types:!1,unicodeEscapeSequences:!0},parserSettingsConfiguration={fields:[["SourceType",["Script","Module"]]].concat((0,_toConsumableArray3["default"])((0,_keys2["default"])(defaultOptions).filter(function(e){return"SourceType"!==e})))},Comment=function e(r){(0,_classCallCheck3["default"])(this,e),this.type="COMMENT",Object.defineProperty(this,"location",{value:r}),this.value=r.toString()};exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["location"]),loadParser:function(e){__webpack_require__.e/* require */(18, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/exports-loader/index.js?traceur!./node_modules/traceur/bin/traceur.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,r,t){t=(0,_extends3["default"])({},defaultOptions,t);var a=new e.syntax.SourceFile(FILENAME,r),n=new e.util.ErrorReporter;n.reportMessageInternal=function(e,r){if(!t.TolerateErrors){var a=e.start,n=e.end;a.offset<n.offset&&(r+=": "+e);var o=new SyntaxError(r);throw o.lineNumber=a.line+1,o.columnNumber=a.column,o}};var o=new e.syntax.Parser(a,n,new e.util.Options(t)),s=[];o.handleComment=function(e){s.push(new Comment(e))};var u="Script"===t.SourceType?o.parseScript():o.parseModule();return u.comments=s,u},getNodeName:function(e){return e.constructor.name},forEachProperty:_regenerator2["default"].mark(function r(e){var t;return _regenerator2["default"].wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(!("type"in e)){r.next=3;break}return r.next=3,{value:e.type,key:"type"};case 3:r.t0=_regenerator2["default"].keys(e);case 4:if((r.t1=r.t0()).done){r.next=13;break}if(t=r.t1.value,"line_"!==t&&"column_"!==t||(t=t.slice(0,-1)),"type"!==t&&"lineNumberTable"!==t){r.next=9;break}return r.abrupt("continue",4);case 9:return r.next=11,{value:e[t],key:t};case 11:r.next=4;break;case 13:case"end":return r.stop()}},r,this)}),nodeToRange:function(e){var r=e.location;if(r)return[r.start.offset,r.end.offset]},opensByDefault:function(e,r){return"scriptItemList"===r||"declarations"===r||"statements"===r||"parameters"===r||Array.isArray(e)&&"args"===r||"binding"===r||"expression"===r||"expressions"===r||"literalToken"===r||"identifierToken"===r},renderSettings:function(e,r){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:r})}});

/***/ },

/***/ "./node_modules/traceur/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"traceur@0.0.111",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "traceur@0.0.111",
		"_id": "traceur@0.0.111",
		"_inCache": true,
		"_installable": true,
		"_location": "/traceur",
		"_nodeVersion": "6.2.1",
		"_npmOperationalInternal": {
			"host": "packages-16-east.internal.npmjs.com",
			"tmp": "tmp/traceur-0.0.111.tgz_1465442611894_0.9058660811278969"
		},
		"_npmUser": {
			"email": "erik.arvidsson@gmail.com",
			"name": "arv"
		},
		"_npmVersion": "3.9.3",
		"_phantomChildren": {},
		"_requested": {
			"name": "traceur",
			"raw": "traceur@0.0.111",
			"rawSpec": "0.0.111",
			"scope": null,
			"spec": "0.0.111",
			"type": "version"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/traceur/-/traceur-0.0.111.tgz",
		"_shasum": "c04de74d14696c3373427de4fc08ecaf913fc3a1",
		"_shrinkwrap": null,
		"_spec": "traceur@0.0.111",
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
		"contributors": [
			{
				"email": "*@chromium.org",
				"name": "The Chromium Authors"
			},
			{
				"email": "*@google.com",
				"name": "Google Inc."
			},
			{
				"email": "viktor.kronvall@gmail.com",
				"name": "Viktor Kronvall"
			},
			{
				"email": "usrbincc@yahoo.com",
				"name": "Ben Chan"
			},
			{
				"email": "edy.burt@gmail.com",
				"name": "Eduard Burtescu"
			},
			{
				"email": "peter@peterhallam.com",
				"name": "Peter Hallam"
			},
			{
				"email": "nschonni@gmail.com",
				"name": "Nick Schonning"
			},
			{
				"email": "terasaka.k@gmail.com",
				"name": "Kinya TERASAKA"
			},
			{
				"email": "sean@seanmiddleditch.com",
				"name": "Sean Middleditch"
			},
			{
				"email": "ross@rhadden.com",
				"name": "Ross Hadden"
			},
			{
				"email": "stephan.seidt@gmail.com",
				"name": "Stephan Seidt"
			},
			{
				"email": "mathias@qiwi.be",
				"name": "Mathias Bynens"
			},
			{
				"email": "tommy.odom@gmail.com",
				"name": "Tommy Odom"
			},
			{
				"email": "r.w.timmermans@gmail.com",
				"name": "Rolf Timmermans"
			},
			{
				"email": "tomi.belan@gmail.com",
				"name": "Tomi Belan"
			},
			{
				"email": "james@lightsofapollo.com",
				"name": "James Lal"
			},
			{
				"email": "dmt021@gmail.com",
				"name": "Galimzyanov Dmitry"
			},
			{
				"email": "waldron.rick@gmail.com",
				"name": "Rick Waldron"
			},
			{
				"email": "amatiasq@gmail.com",
				"name": "A. Matías Quezada"
			},
			{
				"email": "sday@atlassian.com",
				"name": "Sam Day"
			},
			{
				"email": "guybedford@gmail.com",
				"name": "Guy Bedford"
			},
			{
				"email": "jmcriffey@gmail.com",
				"name": "Jeff McRiffey"
			},
			{
				"email": "m@mariusnita.com",
				"name": "Marius Nita"
			},
			{
				"email": "fitzgen@mozilla.com",
				"name": "Nick Fitzgerald"
			},
			{
				"email": "gil@tayar.org",
				"name": "Gil Tayar"
			},
			{
				"email": "alxandr@alxandr.me",
				"name": "Aleksander Heintz"
			},
			{
				"email": "ulrikdem@gmail.com",
				"name": "Ulrik de Muelenaere"
			},
			{
				"email": "nison.mael@gmail.com",
				"name": "Maël Nison"
			},
			{
				"email": "snnskwtnb@gmail.com",
				"name": "Shinnosuke Watanabe"
			},
			{
				"email": "terminal2010@gmail.com",
				"name": "Vyacheslav Shebanov"
			},
			{
				"email": "ultcombo@gmail.com",
				"name": "Fabrício Matté"
			},
			{
				"email": "ljharb@gmail.com",
				"name": "Jordan Harband"
			},
			{
				"email": "mciparelli@gmail.com",
				"name": "Martín Ciparelli"
			},
			{
				"email": "hasather@gmail.com",
				"name": "David Håsäther"
			},
			{
				"email": "amjad.masad@gmail.com",
				"name": "Amjad Masad"
			},
			{
				"email": "flannery.peter@ntlworld.com",
				"name": "Peter Flannery"
			},
			{
				"email": "liubko.qwert@gmail.com",
				"name": "Liubomyr Mykhalchenko"
			},
			{
				"email": "dmitry.soshnikov@gmail.com",
				"name": "Dmitry Soshnikov"
			},
			{
				"email": "victor@suumit.com",
				"name": "Victor Berchet"
			},
			{
				"email": "pselden4@gmail.com",
				"name": "Paul Selden"
			},
			{
				"email": "contact@svachon.com",
				"name": "Steven Vachon"
			},
			{
				"email": "denelxan@gmail.com",
				"name": "Maga D. Zandaqo"
			},
			{
				"email": "valeriy.sorokobatko@gmail.com",
				"name": "Valeriy Sorokobatko"
			},
			{
				"email": "iwillig@gmail.com",
				"name": "Ivan Willig"
			},
			{
				"email": "oliverjash@gmail.com",
				"name": "Oliver Joseph Ash"
			},
			{
				"email": "jeffpalentine@gmail.com",
				"name": "Chris Truter"
			},
			{
				"email": "marc.nieper@gmail.com",
				"name": "Marc Nieper-Wißkirchen"
			},
			{
				"email": "me@ro.ger.io",
				"name": "Rogério Yokomizo"
			},
			{
				"email": "caitpotter88@gmail.com",
				"name": "Caitlin Potter"
			},
			{
				"email": "srinivasan.sekar1990@gmail.com",
				"name": "Srinivasan Sekar"
			},
			{
				"email": "jeffshen86@gmail.com",
				"name": "Jeff Shen"
			},
			{
				"email": "erik.arvidsson@gmail.com",
				"name": "Erik Arvidsson"
			}
		],
		"dependencies": {
			"commander": "2.9.x",
			"glob": "5.0.x",
			"rsvp": "^3.0.13",
			"semver": "^4.3.3",
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
			"traceur": "0.0.110",
			"webcomponents.js": "^0.5.4-1"
		},
		"directories": {},
		"dist": {
			"shasum": "c04de74d14696c3373427de4fc08ecaf913fc3a1",
			"tarball": "https://registry.npmjs.org/traceur/-/traceur-0.0.111.tgz"
		},
		"engines": {
			"node": ">=0.10"
		},
		"files": [
			"bin/traceur.js",
			"bin/traceur.js.map",
			"bin/traceur-runtime.js",
			"bin/BrowserSystem.js",
			"src/",
			"dist/",
			"traceur"
		],
		"gitHead": "2ddade7061e895b7dddb56ed4b89df310386860b",
		"homepage": "https://github.com/google/traceur-compiler",
		"keywords": [
			"javascript",
			"ecmascript",
			"language",
			"es5",
			"es6",
			"ES.next",
			"harmony",
			"compiler",
			"transpiler"
		],
		"license": "Apache-2.0",
		"main": "./src/node/api.js",
		"maintainers": [
			{
				"email": "arv@chromium.org",
				"name": "arv"
			},
			{
				"email": "johnjbarton@johnjbarton.com",
				"name": "johnjbarton"
			}
		],
		"name": "traceur",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
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
		"version": "0.0.111"
	};

/***/ },

/***/ "./src/parsers/js/transformers/babel/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "export default function ({Plugin, types: t}) {\n  return new Plugin('ast-transform', {\n    visitor: {\n      Identifier(node) {\n        return t.identifier(node.name.split('').reverse().join(''));\n      }\n    }\n  });\n}\n"

/***/ },

/***/ "./src/parsers/js/transformers/babel/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _compileModule=__webpack_require__("./src/parsers/utils/compileModule.js"),_compileModule2=_interopRequireDefault(_compileModule),_babel5Package=__webpack_require__("./node_modules/babel5/babel5-package.js"),_babel5Package2=_interopRequireDefault(_babel5Package),ID="babel";exports["default"]={id:ID,displayName:ID,version:_babel5Package2["default"].version,homepage:_babel5Package2["default"].homepage,defaultParserID:"babylon",loadTransformer:function(e){__webpack_require__.e/* require */(19, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/babel5/index.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},transform:function e(a,l,r){var e=(0,_compileModule2["default"])(l);return a.transform(r,{whitelist:[],plugins:[e["default"]||e],sourceMaps:!0})}};

/***/ },

/***/ "./node_modules/babel5/babel5-package.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/babel5/node_modules/babel-core/package.json");

/***/ },

/***/ "./node_modules/babel5/node_modules/babel-core/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"babel-core@^5.8.38",
				"/Users/fkling/git/astexplorer/packages/babel5"
			]
		],
		"_from": "babel-core@>=5.8.38 <6.0.0",
		"_id": "babel-core@5.8.38",
		"_inCache": true,
		"_installable": true,
		"_location": "/babel5/babel-core",
		"_nodeVersion": "5.5.0",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/babel-core-5.8.38.tgz_1458687002807_0.9978649774566293"
		},
		"_npmUser": {
			"email": "sebmck@gmail.com",
			"name": "sebmck"
		},
		"_npmVersion": "3.3.12",
		"_phantomChildren": {},
		"_requested": {
			"name": "babel-core",
			"raw": "babel-core@^5.8.38",
			"rawSpec": "^5.8.38",
			"scope": null,
			"spec": ">=5.8.38 <6.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/babel5"
		],
		"_resolved": "https://registry.npmjs.org/babel-core/-/babel-core-5.8.38.tgz",
		"_shasum": "1fcaee79d7e61b750b00b8e54f6dfc9d0af86558",
		"_shrinkwrap": null,
		"_spec": "babel-core@^5.8.38",
		"_where": "/Users/fkling/git/astexplorer/packages/babel5",
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
			"babylon": "^5.8.38",
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
		"directories": {},
		"dist": {
			"shasum": "1fcaee79d7e61b750b00b8e54f6dfc9d0af86558",
			"tarball": "https://registry.npmjs.org/babel-core/-/babel-core-5.8.38.tgz"
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
		"maintainers": [
			{
				"email": "amjad.masad@gmail.com",
				"name": "amasad"
			},
			{
				"email": "hi@henryzoo.com",
				"name": "hzoo"
			},
			{
				"email": "npm-public@jessemccarthy.net",
				"name": "jmm"
			},
			{
				"email": "loganfsmyth@gmail.com",
				"name": "loganfsmyth"
			},
			{
				"email": "sebmck@gmail.com",
				"name": "sebmck"
			},
			{
				"email": "me@thejameskyle.com",
				"name": "thejameskyle"
			}
		],
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
		"version": "5.8.38"
	};

/***/ },

/***/ "./src/parsers/js/transformers/babel6/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "export default function ({types: t}) {\n  return {\n    visitor: {\n      Identifier(path) {\n        path.node.name = path.node.name.split('').reverse().join('');\n      }\n    }\n  };\n}\n"

/***/ },

/***/ "./src/parsers/js/transformers/babel6/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _compileModule=__webpack_require__("./src/parsers/utils/compileModule.js"),_compileModule2=_interopRequireDefault(_compileModule),_babel6Package=__webpack_require__("./node_modules/babel6/babel6-package.js"),_babel6Package2=_interopRequireDefault(_babel6Package),ID="babelv6";exports["default"]={id:ID,displayName:ID,version:_babel6Package2["default"].version,homepage:_babel6Package2["default"].homepage,defaultParserID:"babylon6",loadTransformer:function(e){__webpack_require__.e/* require */(20, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/babel6/index.js"),__webpack_require__("./node_modules/babel-preset-syntax-from-presets/lib/index.js")]; (function(a,r){return e({babel:a,syntaxPreset:r})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},transform:function e(a,r,l){var t=a.babel,u=a.syntaxPreset,e=(a.presets,(0,_compileModule2["default"])(r));return t.transform(l,{presets:[u],plugins:[(e["default"]||e)(t)],sourceMaps:!0})}};

/***/ },

/***/ "./node_modules/babel6/babel6-package.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/babel-core/package.json");

/***/ },

/***/ "./node_modules/babel-core/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"babel-core@^6.11.4",
				"/Users/fkling/git/astexplorer/node_modules/babel-plugin-transform-regenerator"
			]
		],
		"_from": "babel-core@>=6.11.4 <7.0.0",
		"_id": "babel-core@6.13.2",
		"_inCache": true,
		"_installable": true,
		"_location": "/babel-core",
		"_nodeVersion": "5.11.1",
		"_npmOperationalInternal": {
			"host": "packages-16-east.internal.npmjs.com",
			"tmp": "tmp/babel-core-6.13.2.tgz_1470405096180_0.20206776657141745"
		},
		"_npmUser": {
			"email": "hi@henryzoo.com",
			"name": "hzoo"
		},
		"_npmVersion": "3.10.3",
		"_phantomChildren": {},
		"_requested": {
			"name": "babel-core",
			"raw": "babel-core@^6.11.4",
			"rawSpec": "^6.11.4",
			"scope": null,
			"spec": ">=6.11.4 <7.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"#DEV:/",
			"/babel-plugin-transform-regenerator",
			"/babel-register",
			"/babel6"
		],
		"_resolved": "https://registry.npmjs.org/babel-core/-/babel-core-6.13.2.tgz",
		"_shasum": "f761e1199361d5a6ed16f93ce801ad50acadb338",
		"_shrinkwrap": null,
		"_spec": "babel-core@^6.11.4",
		"_where": "/Users/fkling/git/astexplorer/node_modules/babel-plugin-transform-regenerator",
		"author": {
			"email": "sebmck@gmail.com",
			"name": "Sebastian McKenzie"
		},
		"dependencies": {
			"babel-code-frame": "^6.8.0",
			"babel-generator": "^6.11.4",
			"babel-helpers": "^6.8.0",
			"babel-messages": "^6.8.0",
			"babel-register": "^6.9.0",
			"babel-runtime": "^6.9.1",
			"babel-template": "^6.9.0",
			"babel-traverse": "^6.13.0",
			"babel-types": "^6.13.0",
			"babylon": "^6.7.0",
			"convert-source-map": "^1.1.0",
			"debug": "^2.1.1",
			"json5": "^0.4.0",
			"lodash": "^4.2.0",
			"minimatch": "^3.0.2",
			"path-exists": "^1.0.0",
			"path-is-absolute": "^1.0.0",
			"private": "^0.1.6",
			"shebang-regex": "^1.0.0",
			"slash": "^1.0.0",
			"source-map": "^0.5.0"
		},
		"description": "Babel compiler core.",
		"devDependencies": {
			"babel-helper-fixtures": "^6.9.0",
			"babel-helper-transform-fixture-test-runner": "^6.13.2",
			"babel-polyfill": "^6.13.0"
		},
		"directories": {},
		"dist": {
			"shasum": "f761e1199361d5a6ed16f93ce801ad50acadb338",
			"tarball": "https://registry.npmjs.org/babel-core/-/babel-core-6.13.2.tgz"
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
		"maintainers": [
			{
				"email": "amjad.masad@gmail.com",
				"name": "amasad"
			},
			{
				"email": "hi@henryzoo.com",
				"name": "hzoo"
			},
			{
				"email": "npm-public@jessemccarthy.net",
				"name": "jmm"
			},
			{
				"email": "loganfsmyth@gmail.com",
				"name": "loganfsmyth"
			},
			{
				"email": "sebmck@gmail.com",
				"name": "sebmck"
			},
			{
				"email": "me@thejameskyle.com",
				"name": "thejameskyle"
			}
		],
		"name": "babel-core",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "https://github.com/babel/babel/tree/master/packages/babel-core"
		},
		"scripts": {
			"bench": "make bench",
			"test": "make test"
		},
		"version": "6.13.2"
	};

/***/ },

/***/ "./src/parsers/js/transformers/eslint1/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "export default function(context) {\n  return {\n    TemplateLiteral(node) {\n      context.report(node, 'Do not use template literals');\n    }\n  };\n};\n"

/***/ },

/***/ "./src/parsers/js/transformers/eslint1/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_package=__webpack_require__("./node_modules/eslint1/package.js"),_package2=_interopRequireDefault(_package),ID="eslint-v1",name="ESLint v1";exports["default"]={id:ID,displayName:name,version:_package2["default"].version,homepage:_package2["default"].homepage,defaultParserID:"acorn-to-esprima",loadTransformer:function(e){__webpack_require__.e/* require */(21, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/eslint1/index.js"),__webpack_require__("./src/parsers/js/utils/eslintUtils.js")]; (function(t,r){return e((0,_extends3["default"])({},t,{utils:r}))}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},transform:function(e,t,r){var a=e.eslint,n=e.sourceCode,u=e.rules,i=e.utils;return i.defineRule(u,t),i.runRule(r,a,n)}};

/***/ },

/***/ "./node_modules/eslint1/package.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports=__webpack_require__("./node_modules/eslint1/node_modules/eslint/package.json");

/***/ },

/***/ "./node_modules/eslint1/node_modules/eslint/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"eslint@^1.10.3",
				"/Users/fkling/git/astexplorer/packages/eslint1"
			]
		],
		"_from": "eslint@>=1.10.3 <2.0.0",
		"_id": "eslint@1.10.3",
		"_inCache": true,
		"_installable": true,
		"_location": "/eslint1/eslint",
		"_npmUser": {
			"email": "nicholas@nczconsulting.com",
			"name": "nzakas"
		},
		"_npmVersion": "1.4.28",
		"_phantomChildren": {},
		"_requested": {
			"name": "eslint",
			"raw": "eslint@^1.10.3",
			"rawSpec": "^1.10.3",
			"scope": null,
			"spec": ">=1.10.3 <2.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/eslint1"
		],
		"_resolved": "https://registry.npmjs.org/eslint/-/eslint-1.10.3.tgz",
		"_shasum": "fb19a91b13c158082bbca294b17d979bc8353a0a",
		"_shrinkwrap": null,
		"_spec": "eslint@^1.10.3",
		"_where": "/Users/fkling/git/astexplorer/packages/eslint1",
		"author": {
			"email": "nicholas+npm@nczconsulting.com",
			"name": "Nicholas C. Zakas"
		},
		"bin": {
			"eslint": "./bin/eslint.js"
		},
		"bugs": {
			"url": "https://github.com/eslint/eslint/issues/"
		},
		"dependencies": {
			"chalk": "^1.0.0",
			"concat-stream": "^1.4.6",
			"debug": "^2.1.1",
			"doctrine": "^0.7.1",
			"escape-string-regexp": "^1.0.2",
			"escope": "^3.3.0",
			"espree": "^2.2.4",
			"estraverse": "^4.1.1",
			"estraverse-fb": "^1.3.1",
			"esutils": "^2.0.2",
			"file-entry-cache": "^1.1.1",
			"glob": "^5.0.14",
			"globals": "^8.11.0",
			"handlebars": "^4.0.0",
			"inquirer": "^0.11.0",
			"is-my-json-valid": "^2.10.0",
			"is-resolvable": "^1.0.0",
			"js-yaml": "3.4.5",
			"json-stable-stringify": "^1.0.0",
			"lodash.clonedeep": "^3.0.1",
			"lodash.merge": "^3.3.2",
			"lodash.omit": "^3.1.0",
			"minimatch": "^3.0.0",
			"mkdirp": "^0.5.0",
			"object-assign": "^4.0.1",
			"optionator": "^0.6.0",
			"path-is-absolute": "^1.0.0",
			"path-is-inside": "^1.0.1",
			"shelljs": "^0.5.3",
			"strip-json-comments": "~1.0.1",
			"text-table": "~0.2.0",
			"user-home": "^2.0.0",
			"xml-escape": "~1.0.0"
		},
		"description": "An AST-based pattern checker for JavaScript.",
		"devDependencies": {
			"beefy": "^1.0.0",
			"brfs": "0.0.9",
			"browserify": "^12.0.1",
			"chai": "^3.4.0",
			"cheerio": "^0.19.0",
			"coveralls": "2.11.4",
			"dateformat": "^1.0.8",
			"ejs": "^2.3.3",
			"esprima": "^2.4.1",
			"esprima-fb": "^15001.1001.0-dev-harmony-fb",
			"gh-got": "^2.2.0",
			"istanbul": "^0.4.0",
			"jsdoc": "^3.3.0-beta1",
			"jsonlint": "^1.6.2",
			"leche": "^2.1.1",
			"linefix": "^0.1.1",
			"load-perf": "^0.2.0",
			"markdownlint": "^0.0.8",
			"mocha": "^2.1.0",
			"mocha-phantomjs": "4.0.1",
			"npm-license": "^0.3.1",
			"phantomjs": "1.9.18",
			"proxyquire": "^1.0.0",
			"rewire": "^2.3.4",
			"semver": "^5.0.3",
			"shelljs-nodecli": "~0.1.0",
			"sinon": "1.17.2",
			"through": "^2.3.6"
		},
		"directories": {},
		"dist": {
			"shasum": "fb19a91b13c158082bbca294b17d979bc8353a0a",
			"tarball": "https://registry.npmjs.org/eslint/-/eslint-1.10.3.tgz"
		},
		"engines": {
			"node": ">=0.10"
		},
		"files": [
			"LICENSE",
			"README.md",
			"bin",
			"conf",
			"lib"
		],
		"gitHead": "2436cc6c1816a7890e35dab38e609daee84d7530",
		"homepage": "http://eslint.org",
		"keywords": [
			"ast",
			"lint",
			"javascript",
			"ecmascript",
			"espree"
		],
		"license": "MIT",
		"main": "./lib/api.js",
		"maintainers": [
			{
				"email": "nicholas@nczconsulting.com",
				"name": "nzakas"
			},
			{
				"email": "ivolodin@gmail.com",
				"name": "ivolodin"
			}
		],
		"name": "eslint",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/eslint/eslint.git"
		},
		"scripts": {
			"browserify": "node Makefile.js browserify",
			"check-commit": "node Makefile.js checkGitCommit",
			"coveralls": "cat ./coverage/lcov.info | coveralls",
			"docs": "node Makefile.js docs",
			"gensite": "node Makefile.js gensite",
			"lint": "node Makefile.js lint",
			"major": "node Makefile.js major",
			"minor": "node Makefile.js minor",
			"patch": "node Makefile.js patch",
			"perf": "node Makefile.js perf",
			"profile": "beefy tests/bench/bench.js --open -- -t brfs -t ./tests/bench/xform-rules.js -r espree",
			"test": "node Makefile.js test"
		},
		"version": "1.10.3"
	};

/***/ },

/***/ "./src/parsers/js/transformers/eslint1/loadRulesShim.js":
/***/ function(module, exports) {

	"use strict";module.exports=function(){return[]};

/***/ },

/***/ "./src/parsers/js/transformers/eslint2/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "export default function(context) {\n  return {\n    TemplateLiteral(node) {\n      context.report(node, 'Do not use template literals');\n    }\n  };\n};\n"

/***/ },

/***/ "./src/parsers/js/transformers/eslint2/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_package=__webpack_require__("./node_modules/eslint2/node_modules/eslint/package.json"),_package2=_interopRequireDefault(_package),ID="eslint-v2",name="ESLint v2";exports["default"]={id:ID,displayName:name,version:_package2["default"].version,homepage:_package2["default"].homepage,defaultParserID:"espree",loadTransformer:function(e){__webpack_require__.e/* require */(22, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/eslint2/index.js"),__webpack_require__("./src/parsers/js/utils/eslintUtils.js")]; (function(t,r){return e((0,_extends3["default"])({},t,{utils:r}))}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},transform:function(e,t,r){var n=e.eslint,u=e.rules,a=e.sourceCode,s=e.utils;return s.defineRule(u,t),s.runRule(r,n,a)}};

/***/ },

/***/ "./node_modules/eslint2/node_modules/eslint/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"eslint@^2.5.3",
				"/Users/fkling/git/astexplorer/packages/eslint2"
			]
		],
		"_from": "eslint@>=2.5.3 <3.0.0",
		"_id": "eslint@2.13.1",
		"_inCache": true,
		"_installable": true,
		"_location": "/eslint2/eslint",
		"_nodeVersion": "4.4.2",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/eslint-2.13.1.tgz_1466445641361_0.2213528158608824"
		},
		"_npmUser": {
			"email": "nicholas@nczconsulting.com",
			"name": "nzakas"
		},
		"_npmVersion": "2.15.0",
		"_phantomChildren": {},
		"_requested": {
			"name": "eslint",
			"raw": "eslint@^2.5.3",
			"rawSpec": "^2.5.3",
			"scope": null,
			"spec": ">=2.5.3 <3.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/eslint2"
		],
		"_resolved": "https://registry.npmjs.org/eslint/-/eslint-2.13.1.tgz",
		"_shasum": "e4cc8fa0f009fb829aaae23855a29360be1f6c11",
		"_shrinkwrap": null,
		"_spec": "eslint@^2.5.3",
		"_where": "/Users/fkling/git/astexplorer/packages/eslint2",
		"author": {
			"email": "nicholas+npm@nczconsulting.com",
			"name": "Nicholas C. Zakas"
		},
		"bin": {
			"eslint": "./bin/eslint.js"
		},
		"bugs": {
			"url": "https://github.com/eslint/eslint/issues/"
		},
		"dependencies": {
			"chalk": "^1.1.3",
			"concat-stream": "^1.4.6",
			"debug": "^2.1.1",
			"doctrine": "^1.2.2",
			"es6-map": "^0.1.3",
			"escope": "^3.6.0",
			"espree": "^3.1.6",
			"estraverse": "^4.2.0",
			"esutils": "^2.0.2",
			"file-entry-cache": "^1.1.1",
			"glob": "^7.0.3",
			"globals": "^9.2.0",
			"ignore": "^3.1.2",
			"imurmurhash": "^0.1.4",
			"inquirer": "^0.12.0",
			"is-my-json-valid": "^2.10.0",
			"is-resolvable": "^1.0.0",
			"js-yaml": "^3.5.1",
			"json-stable-stringify": "^1.0.0",
			"levn": "^0.3.0",
			"lodash": "^4.0.0",
			"mkdirp": "^0.5.0",
			"optionator": "^0.8.1",
			"path-is-absolute": "^1.0.0",
			"path-is-inside": "^1.0.1",
			"pluralize": "^1.2.1",
			"progress": "^1.1.8",
			"require-uncached": "^1.0.2",
			"shelljs": "^0.6.0",
			"strip-json-comments": "~1.0.1",
			"table": "^3.7.8",
			"text-table": "~0.2.0",
			"user-home": "^2.0.0"
		},
		"description": "An AST-based pattern checker for JavaScript.",
		"devDependencies": {
			"beefy": "^2.0.0",
			"brfs": "0.0.9",
			"browserify": "^12.0.1",
			"chai": "^3.5.0",
			"cheerio": "^0.19.0",
			"coveralls": "2.11.4",
			"dateformat": "^1.0.8",
			"ejs": "^2.3.3",
			"eslint-release": "^0.5.0",
			"esprima": "^2.4.1",
			"esprima-fb": "^15001.1001.0-dev-harmony-fb",
			"gh-got": "^2.2.0",
			"istanbul": "^0.4.0",
			"jsdoc": "^3.3.0-beta1",
			"karma": "^0.13.22",
			"karma-mocha": "^1.0.1",
			"karma-mocha-reporter": "^2.0.3",
			"karma-phantomjs-launcher": "^1.0.0",
			"leche": "^2.1.1",
			"linefix": "^0.1.1",
			"load-perf": "^0.2.0",
			"markdownlint": "^0.1.0",
			"mocha": "^2.4.5",
			"mock-fs": "^3.9.0",
			"npm-license": "^0.3.2",
			"phantomjs-prebuilt": "^2.1.7",
			"proxyquire": ">=1.0.0 <1.7.5",
			"semver": "^5.0.3",
			"shelljs-nodecli": "~0.1.0",
			"sinon": "^1.17.2",
			"temp": "^0.8.3",
			"through": "^2.3.6"
		},
		"directories": {},
		"dist": {
			"shasum": "e4cc8fa0f009fb829aaae23855a29360be1f6c11",
			"tarball": "https://registry.npmjs.org/eslint/-/eslint-2.13.1.tgz"
		},
		"engines": {
			"node": ">=0.10"
		},
		"files": [
			"LICENSE",
			"README.md",
			"bin",
			"conf",
			"lib",
			"messages"
		],
		"gitHead": "031a35614f9353b57c072ba14aff16f930ab6520",
		"homepage": "http://eslint.org",
		"keywords": [
			"ast",
			"lint",
			"javascript",
			"ecmascript",
			"espree"
		],
		"license": "MIT",
		"main": "./lib/api.js",
		"maintainers": [
			{
				"email": "nicholas@nczconsulting.com",
				"name": "nzakas"
			},
			{
				"email": "ivolodin@gmail.com",
				"name": "ivolodin"
			}
		],
		"name": "eslint",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/eslint/eslint.git"
		},
		"scripts": {
			"alpharelease": "node Makefile.js prerelease -- alpha",
			"betarelease": "node Makefile.js prerelease -- beta",
			"browserify": "node Makefile.js browserify",
			"check-commit": "node Makefile.js checkGitCommit",
			"coveralls": "cat ./coverage/lcov.info | coveralls",
			"docs": "node Makefile.js docs",
			"gensite": "node Makefile.js gensite",
			"lint": "node Makefile.js lint",
			"perf": "node Makefile.js perf",
			"profile": "beefy tests/bench/bench.js --open -- -t brfs -t ./tests/bench/xform-rules.js -r espree",
			"release": "node Makefile.js release",
			"test": "node Makefile.js test"
		},
		"version": "2.13.1"
	};

/***/ },

/***/ "./src/parsers/js/transformers/jscodeshift/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "export default function transformer(file, api) {\n  const j = api.jscodeshift;\n  const {expression, statement, statements} = j.template;\n\n  return j(file.source)\n    .find(j.Identifier)\n    .replaceWith(\n      p => j.identifier(p.node.name.split('').reverse().join(''))\n    )\n    .toSource();\n};\n"

/***/ },

/***/ "./src/parsers/js/transformers/jscodeshift/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_create=__webpack_require__("./node_modules/babel-runtime/core-js/object/create.js"),_create2=_interopRequireDefault(_create),_getOwnPropertyNames=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-own-property-names.js"),_getOwnPropertyNames2=_interopRequireDefault(_getOwnPropertyNames),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_compileModule=__webpack_require__("./src/parsers/utils/compileModule.js"),_compileModule2=_interopRequireDefault(_compileModule),_package=__webpack_require__("./node_modules/jscodeshift/package.json"),_package2=_interopRequireDefault(_package),ID="jscodeshift",sessionMethods=new _set2["default"];exports["default"]={id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,defaultParserID:"recast",loadTransformer:function(e){__webpack_require__.e/* require */(23, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/jscodeshift/index.js")]; (function(r){var t=r.registerMethods,s=void 0;r.registerMethods({hasOwnProperty:function(e){return s||(s=new _set2["default"]((0,_getOwnPropertyNames2["default"])(this))),s.has(e)||sessionMethods.has(e)}}),r.registerMethods=function(e){t.apply(this,arguments);for(var r in e)sessionMethods.add(r)},e({jscodeshift:r})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},transform:function e(r,t,s){var o=r.jscodeshift;sessionMethods.clear();var i=(0,_compileModule2["default"])(t),e=i.__esModule?i["default"]:i,a=(0,_create2["default"])(null),n=!1,u=e({path:"Live.js",source:s},{jscodeshift:i.parser?o.withParser(i.parser):o,stats:function(e){var r=arguments.length<=1||void 0===arguments[1]?1:arguments[1];n=!0,a[e]=(a[e]?a[e]:0)+r}},{});if(n&&console.log((0,_stringify2["default"])(a,null,4)),null==u)return s;if("string"!=typeof u)throw new Error("Transformers must either return undefined, null or a string, not "+('"'+("undefined"==typeof u?"undefined":(0,_typeof3["default"])(u))+'".'));return u}};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/object/get-own-property-names.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/object/get-own-property-names.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/object/get-own-property-names.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.get-own-property-names.js");var $Object=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Object;module.exports=function(e){return $Object.getOwnPropertyNames(e)};

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.object.get-own-property-names.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/_object-sap.js")("getOwnPropertyNames",function(){return __webpack_require__("./node_modules/core-js/library/modules/_object-gopn-ext.js").f});

/***/ },

/***/ "./node_modules/jscodeshift/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"jscodeshift@^0.3",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "jscodeshift@>=0.3.0 <0.4.0",
		"_id": "jscodeshift@0.3.27",
		"_inCache": true,
		"_installable": true,
		"_location": "/jscodeshift",
		"_nodeVersion": "5.12.0",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/jscodeshift-0.3.27.tgz_1469833067237_0.09810599707998335"
		},
		"_npmUser": {
			"email": "felix.kling@gmx.net",
			"name": "fkling"
		},
		"_npmVersion": "3.8.6",
		"_phantomChildren": {
			"babel-plugin-constant-folding": "1.0.1",
			"babel-plugin-dead-code-elimination": "1.0.2",
			"babel-plugin-eval": "1.0.1",
			"babel-plugin-inline-environment-variables": "1.0.1",
			"babel-plugin-jscript": "1.0.4",
			"babel-plugin-member-expression-literals": "1.0.1",
			"babel-plugin-property-literals": "1.0.1",
			"babel-plugin-proto-to-assign": "1.0.4",
			"babel-plugin-react-constant-elements": "1.0.3",
			"babel-plugin-react-display-name": "1.0.3",
			"babel-plugin-remove-console": "1.0.1",
			"babel-plugin-remove-debugger": "1.0.1",
			"babel-plugin-runtime": "1.0.7",
			"babel-plugin-undeclared-variables-check": "1.0.2",
			"babel-plugin-undefined-to-void": "1.1.6",
			"bluebird": "2.10.2",
			"brace-expansion": "1.1.6",
			"chalk": "1.1.3",
			"convert-source-map": "1.3.0",
			"debug": "2.2.0",
			"detect-indent": "3.0.1",
			"esutils": "2.0.2",
			"fs-readdir-recursive": "0.1.2",
			"home-or-tmp": "1.0.0",
			"is-integer": "1.0.6",
			"json5": "0.4.0",
			"output-file-sync": "1.1.2",
			"path-exists": "1.0.0",
			"path-is-absolute": "1.0.0",
			"private": "0.1.6",
			"regenerator": "0.8.40",
			"regexpu": "1.3.0",
			"repeating": "1.1.3",
			"resolve": "1.1.7",
			"shebang-regex": "1.0.0",
			"slash": "1.0.0",
			"source-map": "0.5.6",
			"source-map-support": "0.2.10",
			"to-fast-properties": "1.0.2",
			"trim-right": "1.0.1",
			"try-resolve": "1.0.1"
		},
		"_requested": {
			"name": "jscodeshift",
			"raw": "jscodeshift@^0.3",
			"rawSpec": "^0.3",
			"scope": null,
			"spec": ">=0.3.0 <0.4.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/jscodeshift/-/jscodeshift-0.3.27.tgz",
		"_shasum": "a5ecab3329e2fe8debfbc3d5994409cb33238adc",
		"_shrinkwrap": null,
		"_spec": "jscodeshift@^0.3",
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
			"babel-core": "^5",
			"babel-plugin-transform-flow-strip-types": "^6.8.0",
			"babel-preset-es2015": "^6.9.0",
			"babel-preset-stage-1": "^6.5.0",
			"babel-register": "^6.9.0",
			"babylon": "^6.8.1",
			"colors": "^1.1.2",
			"es6-promise": "^3.0.0",
			"flow-parser": "^0.*",
			"lodash": "^4.13.1",
			"micromatch": "^2.3.7",
			"node-dir": "0.1.8",
			"nomnom": "^1.8.1",
			"recast": "^0.11.8",
			"temp": "^0.8.1"
		},
		"description": "A toolkit for JavaScript codemods",
		"devDependencies": {
			"babel-eslint": "^6.1.2",
			"eslint": "^3.1.1",
			"jest-cli": "^12.0.0",
			"mkdirp": "^0.5.1"
		},
		"directories": {},
		"dist": {
			"shasum": "a5ecab3329e2fe8debfbc3d5994409cb33238adc",
			"tarball": "https://registry.npmjs.org/jscodeshift/-/jscodeshift-0.3.27.tgz"
		},
		"engines": {
			"node": ">=4"
		},
		"gitHead": "d4ec75956d8d05421df6e3abe05645370da0f91a",
		"homepage": "https://github.com/facebook/jscodeshift#readme",
		"jest": {
			"testPathDirs": [
				"src",
				"bin",
				"sample"
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
				"email": "felix.kling@gmx.net",
				"name": "fkling"
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
			"build": "cp -R src/ dist/",
			"prepublish": "npm run build && npm run test",
			"test": "jest --bail"
		},
		"version": "0.3.27"
	};

/***/ },

/***/ "./src/parsers/js/typescript.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _regenerator=__webpack_require__("./node_modules/babel-runtime/regenerator/index.js"),_regenerator2=_interopRequireDefault(_regenerator),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./node_modules/typescript/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="typescript",FILENAME="astExplorer.ts",defaultOptions={experimentalDecorators:!0,experimentalAsyncFunctions:!0,jsx:!0},parserSettingsConfiguration={fields:["experimentalDecorators","experimentalAsyncFunctions","jsx"]},ts=void 0,getComments=void 0;exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["pos","end"]),loadParser:function(e){__webpack_require__.e/* require */(24, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/typescript/lib/typescript.js")]; (function(t){return e(ts=t)}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,t,r){r=(0,_extends3["default"])({},defaultOptions,r);var n={fileExists:function(){return!0},getCanonicalFileName:function(e){return e},getCurrentDirectory:function(){return""},getDefaultLibFileName:function(){return"lib.d.ts"},getNewLine:function(){return"\n"},getSourceFile:function(r){return e.createSourceFile(r,t,e.ScriptTarget.Latest,!0)},readFile:function(){return null},useCaseSensitiveFileNames:function(){return!0},writeFile:function(){return null}},a=FILENAME+(r.jsx?"x":""),i=e.createProgram([a],{noResolve:!0,target:e.ScriptTarget.Latest,experimentalDecorators:r.experimentalDecorators,experimentalAsyncFunctions:r.experimentalAsyncFunctions,jsx:r.jsx?"preserve":void 0},n),u=i.getSourceFile(a);return getComments=function(t,r){if(t.parent){var n=r?t.end:t.pos,a=r?t.parent.end:t.parent.pos;if(t.parent.kind===e.SyntaxKind.SourceFile||n!==a){var i=r?e.getTrailingCommentRanges(u.text,n):e.getLeadingCommentRanges(u.text,n);if(Array.isArray(i))return i.forEach(function(t){t.type=e.SyntaxKind[t.kind],t.text=u.text.substring(t.pos,t.end)}),i}}},u},getNodeName:function(e){if(e.kind)return ts.SyntaxKind[e.kind]},_ignoredProperties:new _set2["default"](["constructor","parent"]),forEachProperty:_regenerator2["default"].mark(function e(t){var r;return _regenerator2["default"].wrap(function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=_regenerator2["default"].keys(t);case 1:if((e.t1=e.t0()).done){e.next=9;break}if(r=e.t1.value,!this._ignoredProperties.has(r)&&"_"!==r.charAt(0)){e.next=5;break}return e.abrupt("continue",1);case 5:return e.next=7,{value:t[r],key:r};case 7:e.next=1;break;case 9:if(!t.parent){e.next=14;break}return e.next=12,{value:getComments(t),key:"leadingComments",computed:!0};case 12:return e.next=14,{value:getComments(t,!0),key:"trailingCommments",computed:!0};case 14:case"end":return e.stop()}},e,this)}),nodeToRange:function(e){return"function"==typeof e.getStart&&"function"==typeof e.getEnd?[e.getStart(),e.getEnd()]:"undefined"!=typeof e.pos&&"undefined"!=typeof e.end?[e.pos,e.end]:void 0},opensByDefault:function(e,t){return"statements"===t||"declarationList"===t||"declarations"===t},renderSettings:function(e,t){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,e),onChange:t})}});

/***/ },

/***/ "./node_modules/typescript/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"typescript@^1.7.5",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "typescript@>=1.7.5 <2.0.0",
		"_id": "typescript@1.8.10",
		"_inCache": true,
		"_installable": true,
		"_location": "/typescript",
		"_nodeVersion": "5.9.0",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/typescript-1.8.10.tgz_1460493736776_0.9304528103675693"
		},
		"_npmUser": {
			"email": "typescript@microsoft.com",
			"name": "typescript"
		},
		"_npmVersion": "2.14.2",
		"_phantomChildren": {},
		"_requested": {
			"name": "typescript",
			"raw": "typescript@^1.7.5",
			"rawSpec": "^1.7.5",
			"scope": null,
			"spec": ">=1.7.5 <2.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/typescript/-/typescript-1.8.10.tgz",
		"_shasum": "b475d6e0dff0bf50f296e5ca6ef9fbb5c7320f1e",
		"_shrinkwrap": null,
		"_spec": "typescript@^1.7.5",
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
			"shasum": "b475d6e0dff0bf50f296e5ca6ef9fbb5c7320f1e",
			"tarball": "https://registry.npmjs.org/typescript/-/typescript-1.8.10.tgz"
		},
		"engines": {
			"node": ">=0.8.0"
		},
		"gitHead": "794c57478ec2a44ee15fb3e245a4c5d2d1612375",
		"homepage": "http://typescriptlang.org/",
		"keywords": [
			"TypeScript",
			"Microsoft",
			"compiler",
			"language",
			"javascript"
		],
		"license": "Apache-2.0",
		"main": "./lib/typescript.js",
		"maintainers": [
			{
				"email": "typescript@microsoft.com",
				"name": "typescript"
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
		"version": "1.8.10"
	};

/***/ },

/***/ "./src/parsers/js/uglify.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set),_extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./packages/uglify2-harmony/package.json"),_package2=_interopRequireDefault(_package),_compileModule=__webpack_require__("./src/parsers/utils/compileModule.js"),_compileModule2=_interopRequireDefault(_compileModule),ID="uglify-js";exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,locationProps:new _set2["default"](["start","end"]),loadParser:function(e){__webpack_require__.e/* require */(25, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/raw-loader/index.js!./packages/uglify2-harmony/lib/utils.js"),__webpack_require__("./node_modules/raw-loader/index.js!./packages/uglify2-harmony/lib/ast.js"),__webpack_require__("./node_modules/raw-loader/index.js!./packages/uglify2-harmony/lib/parse.js")]; (function(){for(var r=arguments.length,a=Array(r),t=0;t<r;t++)a[t]=arguments[t];a.push("exports.parse = parse;"),e((0,_compileModule2["default"])(a.join("\n\n")))}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})},parse:function(e,r){return e.parse(r)},getNodeName:function(e){var r=e.TYPE;return"Token"===r&&(r+="("+e.type+")"),r},nodeToRange:function(e){var r=void 0,a=void 0;switch(e.TYPE){case"Token":r=a=e;break;case void 0:return;default:r=e.start,a=e.end}return[r.pos,a.endpos]},opensByDefault:function(e,r){return"body"===r||"elements"===r||"definitions"===r||"properties"===r},_ignoredProperties:new _set2["default"](["_walk","CTOR"])});

/***/ },

/***/ "./packages/uglify2-harmony/package.json":
/***/ function(module, exports) {

	module.exports = {
		"name": "uglify-js",
		"description": "JavaScript parser, mangler/compressor and beautifier toolkit",
		"homepage": "http://lisperator.net/uglifyjs",
		"author": "Mihai Bazon <mihai.bazon@gmail.com> (http://lisperator.net/)",
		"license": "BSD-2-Clause",
		"version": "2.6.4",
		"engines": {
			"node": ">=0.8.0"
		},
		"maintainers": [
			"Mihai Bazon <mihai.bazon@gmail.com> (http://lisperator.net/)"
		],
		"repository": {
			"type": "git",
			"url": "https://github.com/mishoo/UglifyJS2.git"
		},
		"bugs": {
			"url": "https://github.com/mishoo/UglifyJS2/issues"
		},
		"main": "tools/node.js",
		"bin": {
			"uglifyjs": "bin/uglifyjs"
		},
		"files": [
			"bin",
			"lib",
			"tools",
			"LICENSE"
		],
		"dependencies": {
			"async": "~0.2.6",
			"source-map": "~0.5.1",
			"uglify-to-browserify": "~1.0.0",
			"yargs": "~3.10.0"
		},
		"devDependencies": {
			"acorn": "~0.6.0",
			"escodegen": "~1.3.3",
			"esfuzz": "~0.3.1",
			"estraverse": "~1.5.1",
			"mocha": "~2.3.4"
		},
		"browserify": {
			"transform": [
				"uglify-to-browserify"
			]
		},
		"scripts": {
			"shrinkwrap": "rm ./npm-shrinkwrap.json; rm -rf ./node_modules; npm i && npm shrinkwrap && npm outdated",
			"test": "node test/run-tests.js"
		},
		"keywords": [
			"uglify",
			"uglify-js",
			"minify",
			"minifier"
		]
	};

/***/ },

/***/ "./src/parsers/webidl/codeExample.txt":
/***/ function(module, exports) {

	module.exports = "[\n  Constructor(ArrayBuffer buffer,\n              optional unsigned long byteOffset,\n              optional unsigned long byteLength)\n]\ninterface DataView {\n    // Gets the value of the given type at the specified byte offset\n    // from the start of the view. There is no alignment constraint;\n    // multi-byte values may be fetched from any offset.\n    //\n    // For multi-byte values, the optional littleEndian argument\n    // indicates whether a big-endian or little-endian value should be\n    // read. If false or undefined, a big-endian value is read.\n    //\n    // These methods raise an exception if they would read\n    // beyond the end of the view.\n    byte getInt8(unsigned long byteOffset);\n    octet getUint8(unsigned long byteOffset);\n    short getInt16(unsigned long byteOffset,\n                   optional boolean littleEndian);\n    unsigned short getUint16(unsigned long byteOffset,\n                             optional boolean littleEndian);\n    long getInt32(unsigned long byteOffset,\n                  optional boolean littleEndian);\n    unsigned long getUint32(unsigned long byteOffset,\n                            optional boolean littleEndian);\n    float getFloat32(unsigned long byteOffset,\n                     optional boolean littleEndian);\n    double getFloat64(unsigned long byteOffset,\n                      optional boolean littleEndian);\n\n    // Stores a value of the given type at the specified byte offset\n    // from the start of the view. There is no alignment constraint;\n    // multi-byte values may be stored at any offset.\n    //\n    // For multi-byte values, the optional littleEndian argument\n    // indicates whether the value should be stored in big-endian or\n    // little-endian byte order. If false or undefined, the value is\n    // stored in big-endian byte order.\n    //\n    // These methods raise an exception if they would write\n    // beyond the end of the view.\n    void setInt8(unsigned long byteOffset,\n                 byte value);\n    void setUint8(unsigned long byteOffset,\n                  octet value);\n    void setInt16(unsigned long byteOffset,\n                  short value,\n                  optional boolean littleEndian);\n    void setUint16(unsigned long byteOffset,\n                   unsigned short value,\n                   optional boolean littleEndian);\n    void setInt32(unsigned long byteOffset,\n                  long value,\n                  optional boolean littleEndian);\n    void setUint32(unsigned long byteOffset,\n                   unsigned long value,\n                   optional boolean littleEndian);\n    void setFloat32(unsigned long byteOffset,\n                    float value,\n                    optional boolean littleEndian);\n    void setFloat64(unsigned long byteOffset,\n                    double value,\n                    optional boolean littleEndian);\n};\nDataView implements ArrayBufferView;\n"

/***/ },

/***/ "./src/parsers/webidl/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.mimeTypes=exports.displayName=exports.id=void 0,__webpack_require__("./node_modules/codemirror/mode/webidl/webidl.js");var id=exports.id="webidl",displayName=exports.displayName="Web IDL",mimeTypes=exports.mimeTypes=["text/x-webidl"];

/***/ },

/***/ "./node_modules/codemirror/mode/webidl/webidl.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){ true?e(__webpack_require__("./node_modules/codemirror/lib/codemirror.js")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}function r(e,t){if(e.eatSpace())return null;if(t.inComment)return e.match(w)?(t.inComment=!1,"comment"):(e.skipToEnd(),"comment");if(e.match("//"))return e.skipToEnd(),"comment";if(e.match(D))return"comment";if(e.match(E))return t.inComment=!0,"comment";if(e.match(/^-?[0-9\.]/,!1)&&(e.match(p)||e.match(h)))return"number";if(e.match(k))return"string";if(t.startDef&&e.match(A))return"def";if(t.endDef&&e.match(g))return t.endDef=!1,"def";if(e.match(l))return"keyword";if(e.match(o)){var r=t.lastToken,n=(e.match(/^\s*(.+?)\b/,!1)||[])[1];return":"===r||"implements"===r||"implements"===n||"="===n?"builtin":"variable-3"}return e.match(a)?"builtin":e.match(f)?"atom":e.match(A)?"variable":e.match(y)?"operator":(e.next(),null)}var n=["Clamp","Constructor","EnforceRange","Exposed","ImplicitThis","Global","PrimaryGlobal","LegacyArrayClass","LegacyUnenumerableNamedProperties","LenientThis","NamedConstructor","NewObject","NoInterfaceObject","OverrideBuiltins","PutForwards","Replaceable","SameObject","TreatNonObjectAsNull","TreatNullAs","EmptyString","Unforgeable","Unscopeable"],a=t(n),i=["unsigned","short","long","unrestricted","float","double","boolean","byte","octet","Promise","ArrayBuffer","DataView","Int8Array","Int16Array","Int32Array","Uint8Array","Uint16Array","Uint32Array","Uint8ClampedArray","Float32Array","Float64Array","ByteString","DOMString","USVString","sequence","object","RegExp","Error","DOMException","FrozenArray","any","void"],o=t(i),c=["attribute","callback","const","deleter","dictionary","enum","getter","implements","inherit","interface","iterable","legacycaller","maplike","partial","required","serializer","setlike","setter","static","stringifier","typedef","optional","readonly","or"],l=t(c),m=["true","false","Infinity","NaN","null"],f=t(m);e.registerHelper("hintWords","webidl",n.concat(i).concat(c).concat(m));var u=["callback","dictionary","enum","interface"],s=t(u),d=["typedef"],b=t(d),y=/^[:<=>?]/,p=/^-?([1-9][0-9]*|0[Xx][0-9A-Fa-f]+|0[0-7]*)/,h=/^-?(([0-9]+\.[0-9]*|[0-9]*\.[0-9]+)([Ee][+-]?[0-9]+)?|[0-9]+[Ee][+-]?[0-9]+)/,A=/^_?[A-Za-z][0-9A-Z_a-z-]*/,g=/^_?[A-Za-z][0-9A-Z_a-z-]*(?=\s*;)/,k=/^"[^"]*"/,D=/^\/\*.*?\*\//,E=/^\/\*.*/,w=/^.*?\*\//;e.defineMode("webidl",function(){return{startState:function(){return{inComment:!1,lastToken:"",startDef:!1,endDef:!1}},token:function(e,t){var n=r(e,t);if(n){var a=e.current();t.lastToken=a,"keyword"===n?(t.startDef=s.test(a),t.endDef=t.endDef||b.test(a)):t.startDef=!1}return n}}}),e.defineMIME("text/x-webidl","webidl")});

/***/ },

/***/ "./src/parsers/webidl/webidl2.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_keys=__webpack_require__("./node_modules/babel-runtime/core-js/object/keys.js"),_keys2=_interopRequireDefault(_keys),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_defaultParserInterface=__webpack_require__("./src/parsers/utils/defaultParserInterface.js"),_defaultParserInterface2=_interopRequireDefault(_defaultParserInterface),_package=__webpack_require__("./node_modules/webidl2/package.json"),_package2=_interopRequireDefault(_package),_SettingsRenderer=__webpack_require__("./src/parsers/utils/SettingsRenderer.js"),_SettingsRenderer2=_interopRequireDefault(_SettingsRenderer),ID="webidl2",defaultOptions={allowNestedTypedefs:!1},parserSettingsConfiguration={fields:(0,_keys2["default"])(defaultOptions)};exports["default"]=(0,_extends3["default"])({},_defaultParserInterface2["default"],{id:ID,displayName:ID,version:_package2["default"].version,homepage:_package2["default"].homepage,getNodeName:function(e){return e.name?e.name+(e.optional?"?":""):e.type?e.type:e.idlType?e.idlType.idlType||e.idlType:void 0},loadParser:function(e){__webpack_require__.e/* require */(26, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/webidl2/index.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))},parse:function(e,t,r){var a=e.parse;return a(t,(0,_extends3["default"])({},defaultOptions,r))},opensByDefault:function(e,t){return"members"===t},renderSettings:function(e,t){return _react2["default"].createElement(_SettingsRenderer2["default"],{settingsConfiguration:parserSettingsConfiguration,parserSettings:(0,_extends3["default"])({},defaultOptions,{parserSettings:e}),onChange:t})}});

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
			"tarball": "https://registry.npmjs.org/webidl2/-/webidl2-2.0.11.tgz"
		},
		"gitHead": "bd216bcd5596d60734450adc938155deab1e1a80",
		"homepage": "https://github.com/darobin/webidl2.js",
		"license": "MIT",
		"main": "index",
		"maintainers": [
			{
				"email": "robin@berjon.com",
				"name": "robin.berjon"
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

/***/ "./node_modules/redux-batched-actions/lib/index.js":
/***/ function(module, exports) {

	"use strict";function batchActions(e){return{type:BATCH,payload:e}}function enableBatching(e){return function t(n,a){switch(a.type){case BATCH:return a.payload.reduce(t,n);default:return e(n,a)}}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.batchActions=batchActions,exports.enableBatching=enableBatching;var BATCH=exports.BATCH="BATCHING_REDUCER.BATCH";

/***/ },

/***/ "./src/store/getDataFromRevision.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(r){if(r&&r.__esModule)return r;var e={};if(null!=r)for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e["default"]=r,e}function getDataFromRevision(r){var e=r.get("toolID"),a=e&&(0,_parsers.getTransformerByID)(e),t=r.get("transform");t&&!a?a=(0,_parsers.getTransformerByID)("jscodeshift"):a&&!t&&(t=a.defaultTransform);var o=void 0;a&&(o=(0,_parsers.getParserByID)(a.defaultParserID)),o||(o=(0,_parsers.getParserByID)(r.get("parserID"))),o||(o=(0,_parsers.getParserByID)(LocalStorage.getParser())),o||(o=(0,_parsers.getDefaultParser)());var s=r.get("code")||o.category.codeExample;return{parser:o,transformer:a,code:s,transformCode:t}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=getDataFromRevision;var _LocalStorage=__webpack_require__("./src/LocalStorage.js"),LocalStorage=_interopRequireWildcard(_LocalStorage),_parsers=__webpack_require__("./src/parsers/index.js");

/***/ },

/***/ "./src/Snippet.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getIDAndRevisionFromHash(){var e=global.location.hash.match(/^#\/([^\/]+)(?:\/(\d*))?/);return e?{id:e[1],rev:e[2]||0}:null}function getFromCache(e,t){var r=cache[e];return{snippet:r&&r.snippet||null,revision:r&&r[t]||null}}function setInCache(e,t,r){var i=cache[e.id]||(cache[e.id]={});i.snippet=e,i[r]=t}Object.defineProperty(exports,"__esModule",{value:!0});var _promise=__webpack_require__("./node_modules/babel-runtime/core-js/promise.js"),_promise2=_interopRequireDefault(_promise),_getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_Parse=__webpack_require__("./src/Parse.js"),_Parse2=_interopRequireDefault(_Parse),_SnippetRevision=__webpack_require__("./src/SnippetRevision.js"),_SnippetRevision2=_interopRequireDefault(_SnippetRevision),snippetQuery=void 0,cache={},Snippet=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,"Snippet"))}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"fetchLatestRevision",value:function(){var e=this;if(this._latestRevision)return _promise2["default"].resolve(this._latestRevision);var t=this.get("revisions");return t&&0!==t.length?t[t.length-1].fetch(function(t){e._latestRevision=t}):_promise2["default"].resolve(null)}},{key:"createNewRevision",value:function(e){var t=this;return this.fetchLatestRevision().then(function(r){var i=!r||r.get("code")!==e.code||r.get("transform")!==e.transform||r.get("toolID")!==e.toolID||r.get("parserID")!==e.parserID;if(i){var n=new _SnippetRevision2["default"];return n.set("code",e.code),n.set("transform",e.transform),n.set("toolID",e.toolID),n.set("parserID",e.parserID),n.save().then(function(e){return t.add("revisions",e),t.save().then(function(r){var i=r.get("revisions").length-1;return t._latestRevision=e,setInCache(r,e,i),{snippet:r,revision:e,revisionNumber:i}})})}return null})}}],[{key:"fetch",value:function(e,r){var i=getFromCache(e,r);if(i.snippet&&i.revision)return _promise2["default"].resolve(i);var n=i.snippet;return n||(snippetQuery||(snippetQuery=new _Parse2["default"].Query(t)),n=snippetQuery.get(e)),_promise2["default"].resolve(n).then(function(t){var i=t.get("revisions");if(!i[r])throw new Error('Revision "'+e+"/"+r+'" does not exist.');return i[r].fetch().then(function(e){return setInCache(t,e,r),{snippet:t,revision:e}})})}},{key:"fetchFromURL",value:function(){var e=getIDAndRevisionFromHash();return e?t.fetch(e.id,e.rev).then(function(t){return t.revisionNumber=e.rev,t}):_promise2["default"].resolve(null)}}]),t}(_Parse2["default"].Object);exports["default"]=Snippet,_Parse2["default"].Object.registerSubclass("Snippet",Snippet);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-runtime/core-js/promise.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/promise.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/promise.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js"),__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.promise.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Promise;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.promise.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var LIBRARY=__webpack_require__("./node_modules/core-js/library/modules/_library.js"),global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),ctx=__webpack_require__("./node_modules/core-js/library/modules/_ctx.js"),classof=__webpack_require__("./node_modules/core-js/library/modules/_classof.js"),$export=__webpack_require__("./node_modules/core-js/library/modules/_export.js"),isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),aFunction=__webpack_require__("./node_modules/core-js/library/modules/_a-function.js"),anInstance=__webpack_require__("./node_modules/core-js/library/modules/_an-instance.js"),forOf=__webpack_require__("./node_modules/core-js/library/modules/_for-of.js"),speciesConstructor=__webpack_require__("./node_modules/core-js/library/modules/_species-constructor.js"),task=__webpack_require__("./node_modules/core-js/library/modules/_task.js").set,microtask=__webpack_require__("./node_modules/core-js/library/modules/_microtask.js")(),PROMISE="Promise",TypeError=global.TypeError,process=global.process,$Promise=global[PROMISE],process=global.process,isNode="process"==classof(process),empty=function(){},Internal,GenericPromiseCapability,Wrapper,USE_NATIVE=!!function(){try{var e=$Promise.resolve(1),r=(e.constructor={})[__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("species")]=function(e){e(empty,empty)};return(isNode||"function"==typeof PromiseRejectionEvent)&&e.then(empty)instanceof r}catch(t){}}(),sameConstructor=function(e,r){return e===r||e===$Promise&&r===Wrapper},isThenable=function(e){var r;return!(!isObject(e)||"function"!=typeof(r=e.then))&&r},newPromiseCapability=function(e){return sameConstructor($Promise,e)?new PromiseCapability(e):new GenericPromiseCapability(e)},PromiseCapability=GenericPromiseCapability=function(e){var r,t;this.promise=new e(function(e,o){if(void 0!==r||void 0!==t)throw TypeError("Bad Promise constructor");r=e,t=o}),this.resolve=aFunction(r),this.reject=aFunction(t)},perform=function(e){try{e()}catch(r){return{error:r}}},notify=function(e,r){if(!e._n){e._n=!0;var t=e._c;microtask(function(){for(var o=e._v,i=1==e._s,n=0,s=function(r){var t,n,s=i?r.ok:r.fail,c=r.resolve,a=r.reject,l=r.domain;try{s?(i||(2==e._h&&onHandleUnhandled(e),e._h=1),s===!0?t=o:(l&&l.enter(),t=s(o),l&&l.exit()),t===r.promise?a(TypeError("Promise-chain cycle")):(n=isThenable(t))?n.call(t,c,a):c(t)):a(o)}catch(u){a(u)}};t.length>n;)s(t[n++]);e._c=[],e._n=!1,r&&!e._h&&onUnhandled(e)})}},onUnhandled=function(e){task.call(global,function(){var r,t,o,i=e._v;if(isUnhandled(e)&&(r=perform(function(){isNode?process.emit("unhandledRejection",i,e):(t=global.onunhandledrejection)?t({promise:e,reason:i}):(o=global.console)&&o.error&&o.error("Unhandled promise rejection",i)}),e._h=isNode||isUnhandled(e)?2:1),e._a=void 0,r)throw r.error})},isUnhandled=function(e){if(1==e._h)return!1;for(var r,t=e._a||e._c,o=0;t.length>o;)if(r=t[o++],r.fail||!isUnhandled(r.promise))return!1;return!0},onHandleUnhandled=function(e){task.call(global,function(){var r;isNode?process.emit("rejectionHandled",e):(r=global.onrejectionhandled)&&r({promise:e,reason:e._v})})},$reject=function(e){var r=this;r._d||(r._d=!0,r=r._w||r,r._v=e,r._s=2,r._a||(r._a=r._c.slice()),notify(r,!0))},$resolve=function(e){var r,t=this;if(!t._d){t._d=!0,t=t._w||t;try{if(t===e)throw TypeError("Promise can't be resolved itself");(r=isThenable(e))?microtask(function(){var o={_w:t,_d:!1};try{r.call(e,ctx($resolve,o,1),ctx($reject,o,1))}catch(i){$reject.call(o,i)}}):(t._v=e,t._s=1,notify(t,!1))}catch(o){$reject.call({_w:t,_d:!1},o)}}};USE_NATIVE||($Promise=function(e){anInstance(this,$Promise,PROMISE,"_h"),aFunction(e),Internal.call(this);try{e(ctx($resolve,this,1),ctx($reject,this,1))}catch(r){$reject.call(this,r)}},Internal=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},Internal.prototype=__webpack_require__("./node_modules/core-js/library/modules/_redefine-all.js")($Promise.prototype,{then:function(e,r){var t=newPromiseCapability(speciesConstructor(this,$Promise));return t.ok="function"!=typeof e||e,t.fail="function"==typeof r&&r,t.domain=isNode?process.domain:void 0,this._c.push(t),this._a&&this._a.push(t),this._s&&notify(this,!1),t.promise},"catch":function(e){return this.then(void 0,e)}}),PromiseCapability=function(){var e=new Internal;this.promise=e,this.resolve=ctx($resolve,e,1),this.reject=ctx($reject,e,1)}),$export($export.G+$export.W+$export.F*!USE_NATIVE,{Promise:$Promise}),__webpack_require__("./node_modules/core-js/library/modules/_set-to-string-tag.js")($Promise,PROMISE),__webpack_require__("./node_modules/core-js/library/modules/_set-species.js")(PROMISE),Wrapper=__webpack_require__("./node_modules/core-js/library/modules/_core.js")[PROMISE],$export($export.S+$export.F*!USE_NATIVE,PROMISE,{reject:function(e){var r=newPromiseCapability(this),t=r.reject;return t(e),r.promise}}),$export($export.S+$export.F*(LIBRARY||!USE_NATIVE),PROMISE,{resolve:function(e){if(e instanceof $Promise&&sameConstructor(e.constructor,this))return e;var r=newPromiseCapability(this),t=r.resolve;return t(e),r.promise}}),$export($export.S+$export.F*!(USE_NATIVE&&__webpack_require__("./node_modules/core-js/library/modules/_iter-detect.js")(function(e){$Promise.all(e)["catch"](empty)})),PROMISE,{all:function(e){var r=this,t=newPromiseCapability(r),o=t.resolve,i=t.reject,n=perform(function(){var t=[],n=0,s=1;forOf(e,!1,function(e){var c=n++,a=!1;t.push(void 0),s++,r.resolve(e).then(function(e){a||(a=!0,t[c]=e,--s||o(t))},i)}),--s||o(t)});return n&&i(n.error),t.promise},race:function(e){var r=this,t=newPromiseCapability(r),o=t.reject,i=perform(function(){forOf(e,!1,function(e){r.resolve(e).then(t.resolve,o)})});return i&&o(i.error),t.promise}});

/***/ },

/***/ "./node_modules/core-js/library/modules/_species-constructor.js":
/***/ function(module, exports, __webpack_require__) {

	var anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),aFunction=__webpack_require__("./node_modules/core-js/library/modules/_a-function.js"),SPECIES=__webpack_require__("./node_modules/core-js/library/modules/_wks.js")("species");module.exports=function(e,n){var r,t=anObject(e).constructor;return void 0===t||void 0==(r=anObject(t)[SPECIES])?n:aFunction(r)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_task.js":
/***/ function(module, exports, __webpack_require__) {

	var ctx=__webpack_require__("./node_modules/core-js/library/modules/_ctx.js"),invoke=__webpack_require__("./node_modules/core-js/library/modules/_invoke.js"),html=__webpack_require__("./node_modules/core-js/library/modules/_html.js"),cel=__webpack_require__("./node_modules/core-js/library/modules/_dom-create.js"),global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),process=global.process,setTask=global.setImmediate,clearTask=global.clearImmediate,MessageChannel=global.MessageChannel,counter=0,queue={},ONREADYSTATECHANGE="onreadystatechange",defer,channel,port,run=function(){var e=+this;if(queue.hasOwnProperty(e)){var n=queue[e];delete queue[e],n()}},listener=function(e){run.call(e.data)};setTask&&clearTask||(setTask=function(e){for(var n=[],t=1;arguments.length>t;)n.push(arguments[t++]);return queue[++counter]=function(){invoke("function"==typeof e?e:Function(e),n)},defer(counter),counter},clearTask=function(e){delete queue[e]},"process"==__webpack_require__("./node_modules/core-js/library/modules/_cof.js")(process)?defer=function(e){process.nextTick(ctx(run,e,1))}:MessageChannel?(channel=new MessageChannel,port=channel.port2,channel.port1.onmessage=listener,defer=ctx(port.postMessage,port,1)):global.addEventListener&&"function"==typeof postMessage&&!global.importScripts?(defer=function(e){global.postMessage(e+"","*")},global.addEventListener("message",listener,!1)):defer=ONREADYSTATECHANGE in cel("script")?function(e){html.appendChild(cel("script"))[ONREADYSTATECHANGE]=function(){html.removeChild(this),run.call(e)}}:function(e){setTimeout(ctx(run,e,1),0)}),module.exports={set:setTask,clear:clearTask};

/***/ },

/***/ "./node_modules/core-js/library/modules/_invoke.js":
/***/ function(module, exports) {

	module.exports=function(e,r,l){var a=void 0===l;switch(r.length){case 0:return a?e():e.call(l);case 1:return a?e(r[0]):e.call(l,r[0]);case 2:return a?e(r[0],r[1]):e.call(l,r[0],r[1]);case 3:return a?e(r[0],r[1],r[2]):e.call(l,r[0],r[1],r[2]);case 4:return a?e(r[0],r[1],r[2],r[3]):e.call(l,r[0],r[1],r[2],r[3])}return e.apply(l,r)};

/***/ },

/***/ "./node_modules/core-js/library/modules/_microtask.js":
/***/ function(module, exports, __webpack_require__) {

	var global=__webpack_require__("./node_modules/core-js/library/modules/_global.js"),macrotask=__webpack_require__("./node_modules/core-js/library/modules/_task.js").set,Observer=global.MutationObserver||global.WebKitMutationObserver,process=global.process,Promise=global.Promise,isNode="process"==__webpack_require__("./node_modules/core-js/library/modules/_cof.js")(process);module.exports=function(){var e,r,o,s=function(){var s,t;for(isNode&&(s=process.domain)&&s.exit();e;){t=e.fn,e=e.next;try{t()}catch(a){throw e?o():r=void 0,a}}r=void 0,s&&s.enter()};if(isNode)o=function(){process.nextTick(s)};else if(Observer){var t=!0,a=document.createTextNode("");new Observer(s).observe(a,{characterData:!0}),o=function(){a.data=t=!t}}else if(Promise&&Promise.resolve){var i=Promise.resolve();o=function(){i.then(s)}}else o=function(){macrotask.call(global,s)};return function(s){var t={fn:s,next:void 0};r&&(r.next=t),e||(e=t,o()),r=t}};

/***/ },

/***/ "./src/Parse.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _parse=__webpack_require__("./node_modules/parse/index.js"),_parse2=_interopRequireDefault(_parse);_parse2["default"].initialize("PFIYect6yceEsU1m43fONUUKbJe89SRBZRuzJOGj","0L4YKtVRqey2vRG0hjemm9TKb4edjNBSnZXC5Lni"),exports["default"]=_parse2["default"];

/***/ },

/***/ "./src/SnippetRevision.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_Parse=__webpack_require__("./src/Parse.js"),_Parse2=_interopRequireDefault(_Parse),SnippetRevision=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,"SnippetRevision"))}return(0,_inherits3["default"])(t,e),t}(_Parse2["default"].Object);exports["default"]=SnippetRevision,_Parse2["default"].Object.registerSubclass("SnippetRevision",SnippetRevision);

/***/ },

/***/ "./src/containers/ASTOutputContainer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function mapStateToProps(e){return{code:e.code,parser:e.parser,parserSettings:e.parserSettings,cursor:e.cursor}}function mapDispatchToProps(e){return{onParseError:function(r){return e((0,_actions.setParseError)(r))}}}Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_ASTOutput=__webpack_require__("./src/ASTOutput.js"),_ASTOutput2=_interopRequireDefault(_ASTOutput),_actions=__webpack_require__("./src/store/actions.js");exports["default"]=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(_ASTOutput2["default"]);

/***/ },

/***/ "./node_modules/react-redux/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.connect=exports.Provider=void 0;var _Provider=__webpack_require__("./node_modules/react-redux/lib/components/Provider.js"),_Provider2=_interopRequireDefault(_Provider),_connect=__webpack_require__("./node_modules/react-redux/lib/components/connect.js"),_connect2=_interopRequireDefault(_connect);exports.Provider=_Provider2["default"],exports.connect=_connect2["default"];

/***/ },

/***/ "./node_modules/react-redux/lib/components/Provider.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function warnAboutReceivingStore(){didWarnAboutReceivingStore||(didWarnAboutReceivingStore=!0,(0,_warning2["default"])("<Provider> does not support changing `store` on the fly. It is most likely that you see this error because you updated to Redux 2.x and React Redux 2.x which no longer hot reload reducers automatically. See https://github.com/reactjs/react-redux/releases/tag/v2.0.0 for the migration instructions."))}exports.__esModule=!0,exports["default"]=void 0;var _react=__webpack_require__("./node_modules/react/react.js"),_storeShape=__webpack_require__("./node_modules/react-redux/lib/utils/storeShape.js"),_storeShape2=_interopRequireDefault(_storeShape),_warning=__webpack_require__("./node_modules/react-redux/lib/utils/warning.js"),_warning2=_interopRequireDefault(_warning),didWarnAboutReceivingStore=!1,Provider=function(e){function t(r,o){_classCallCheck(this,t);var n=_possibleConstructorReturn(this,e.call(this,r,o));return n.store=r.store,n}return _inherits(t,e),t.prototype.getChildContext=function(){return{store:this.store}},t.prototype.render=function(){var e=this.props.children;return _react.Children.only(e)},t}(_react.Component);exports["default"]=Provider,"production"!==("production")&&(Provider.prototype.componentWillReceiveProps=function(e){var t=this.store,r=e.store;t!==r&&warnAboutReceivingStore()}),Provider.propTypes={store:_storeShape2["default"].isRequired,children:_react.PropTypes.element.isRequired},Provider.childContextTypes={store:_storeShape2["default"].isRequired};

/***/ },

/***/ "./node_modules/react-redux/lib/utils/storeShape.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";exports.__esModule=!0;var _react=__webpack_require__("./node_modules/react/react.js");exports["default"]=_react.PropTypes.shape({subscribe:_react.PropTypes.func.isRequired,dispatch:_react.PropTypes.func.isRequired,getState:_react.PropTypes.func.isRequired});

/***/ },

/***/ "./node_modules/react-redux/lib/utils/warning.js":
/***/ function(module, exports) {

	"use strict";function warning(o){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(o);try{throw new Error(o)}catch(e){}}exports.__esModule=!0,exports["default"]=warning;

/***/ },

/***/ "./node_modules/react-redux/lib/components/connect.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function getDisplayName(t){return t.displayName||t.name||"Component"}function tryCatch(t,e){try{return t.apply(e)}catch(r){return errorObject.value=r,errorObject}}function connect(t,e,r){var o=arguments.length<=3||void 0===arguments[3]?{}:arguments[3],s=Boolean(t),a=t||defaultMapStateToProps,n=void 0;n="function"==typeof e?e:e?(0,_wrapActionCreators2["default"])(e):defaultMapDispatchToProps;var i=r||defaultMergeProps,p=o.pure,u=void 0===p||p,c=o.withRef,h=void 0!==c&&c,l=u&&i!==defaultMergeProps,d=nextVersion++;return function(t){function e(t,e){(0,_isPlainObject2["default"])(t)||(0,_warning2["default"])(e+"() in "+o+" must return a plain object. "+("Instead received "+t+"."))}function r(t,r,o){var s=i(t,r,o);return"production"!==("production")&&e(s,"mergeProps"),s}var o="Connect("+getDisplayName(t)+")",p=function(i){function p(t,e){_classCallCheck(this,p);var r=_possibleConstructorReturn(this,i.call(this,t,e));r.version=d,r.store=t.store||e.store,(0,_invariant2["default"])(r.store,'Could not find "store" in either the context or '+('props of "'+o+'". ')+"Either wrap the root component in a <Provider>, "+('or explicitly pass "store" as a prop to "'+o+'".'));var s=r.store.getState();return r.state={storeState:s},r.clearCache(),r}return _inherits(p,i),p.prototype.shouldComponentUpdate=function(){return!u||this.haveOwnPropsChanged||this.hasStoreStateChanged},p.prototype.computeStateProps=function(t,r){if(!this.finalMapStateToProps)return this.configureFinalMapState(t,r);var o=t.getState(),s=this.doStatePropsDependOnOwnProps?this.finalMapStateToProps(o,r):this.finalMapStateToProps(o);return"production"!==("production")&&e(s,"mapStateToProps"),s},p.prototype.configureFinalMapState=function(t,r){var o=a(t.getState(),r),s="function"==typeof o;return this.finalMapStateToProps=s?o:a,this.doStatePropsDependOnOwnProps=1!==this.finalMapStateToProps.length,s?this.computeStateProps(t,r):("production"!==("production")&&e(o,"mapStateToProps"),o)},p.prototype.computeDispatchProps=function(t,r){if(!this.finalMapDispatchToProps)return this.configureFinalMapDispatch(t,r);var o=t.dispatch,s=this.doDispatchPropsDependOnOwnProps?this.finalMapDispatchToProps(o,r):this.finalMapDispatchToProps(o);return"production"!==("production")&&e(s,"mapDispatchToProps"),s},p.prototype.configureFinalMapDispatch=function(t,r){var o=n(t.dispatch,r),s="function"==typeof o;return this.finalMapDispatchToProps=s?o:n,this.doDispatchPropsDependOnOwnProps=1!==this.finalMapDispatchToProps.length,s?this.computeDispatchProps(t,r):("production"!==("production")&&e(o,"mapDispatchToProps"),o)},p.prototype.updateStatePropsIfNeeded=function(){var t=this.computeStateProps(this.store,this.props);return(!this.stateProps||!(0,_shallowEqual2["default"])(t,this.stateProps))&&(this.stateProps=t,!0)},p.prototype.updateDispatchPropsIfNeeded=function(){var t=this.computeDispatchProps(this.store,this.props);return(!this.dispatchProps||!(0,_shallowEqual2["default"])(t,this.dispatchProps))&&(this.dispatchProps=t,!0)},p.prototype.updateMergedPropsIfNeeded=function(){var t=r(this.stateProps,this.dispatchProps,this.props);return!(this.mergedProps&&l&&(0,_shallowEqual2["default"])(t,this.mergedProps))&&(this.mergedProps=t,!0)},p.prototype.isSubscribed=function(){return"function"==typeof this.unsubscribe},p.prototype.trySubscribe=function(){s&&!this.unsubscribe&&(this.unsubscribe=this.store.subscribe(this.handleChange.bind(this)),this.handleChange())},p.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)},p.prototype.componentDidMount=function(){this.trySubscribe()},p.prototype.componentWillReceiveProps=function(t){u&&(0,_shallowEqual2["default"])(t,this.props)||(this.haveOwnPropsChanged=!0)},p.prototype.componentWillUnmount=function(){this.tryUnsubscribe(),this.clearCache()},p.prototype.clearCache=function(){this.dispatchProps=null,this.stateProps=null,this.mergedProps=null,this.haveOwnPropsChanged=!0,this.hasStoreStateChanged=!0,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,this.renderedElement=null,this.finalMapDispatchToProps=null,this.finalMapStateToProps=null},p.prototype.handleChange=function(){if(this.unsubscribe){var t=this.store.getState(),e=this.state.storeState;if(!u||e!==t){if(u&&!this.doStatePropsDependOnOwnProps){var r=tryCatch(this.updateStatePropsIfNeeded,this);if(!r)return;r===errorObject&&(this.statePropsPrecalculationError=errorObject.value),this.haveStatePropsBeenPrecalculated=!0}this.hasStoreStateChanged=!0,this.setState({storeState:t})}}},p.prototype.getWrappedInstance=function(){return(0,_invariant2["default"])(h,"To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."),this.refs.wrappedInstance},p.prototype.render=function(){var e=this.haveOwnPropsChanged,r=this.hasStoreStateChanged,o=this.haveStatePropsBeenPrecalculated,s=this.statePropsPrecalculationError,a=this.renderedElement;if(this.haveOwnPropsChanged=!1,this.hasStoreStateChanged=!1,this.haveStatePropsBeenPrecalculated=!1,this.statePropsPrecalculationError=null,s)throw s;var n=!0,i=!0;u&&a&&(n=r||e&&this.doStatePropsDependOnOwnProps,i=e&&this.doDispatchPropsDependOnOwnProps);var p=!1,c=!1;o?p=!0:n&&(p=this.updateStatePropsIfNeeded()),i&&(c=this.updateDispatchPropsIfNeeded());var l=!0;return l=!!(p||c||e)&&this.updateMergedPropsIfNeeded(),!l&&a?a:(h?this.renderedElement=(0,_react.createElement)(t,_extends({},this.mergedProps,{ref:"wrappedInstance"})):this.renderedElement=(0,_react.createElement)(t,this.mergedProps),this.renderedElement)},p}(_react.Component);return p.displayName=o,p.WrappedComponent=t,p.contextTypes={store:_storeShape2["default"]},p.propTypes={store:_storeShape2["default"]},"production"!==("production")&&(p.prototype.componentWillUpdate=function(){this.version!==d&&(this.version=d,this.trySubscribe(),this.clearCache())}),(0,_hoistNonReactStatics2["default"])(p,t)}}var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t};exports.__esModule=!0,exports["default"]=connect;var _react=__webpack_require__("./node_modules/react/react.js"),_storeShape=__webpack_require__("./node_modules/react-redux/lib/utils/storeShape.js"),_storeShape2=_interopRequireDefault(_storeShape),_shallowEqual=__webpack_require__("./node_modules/react-redux/lib/utils/shallowEqual.js"),_shallowEqual2=_interopRequireDefault(_shallowEqual),_wrapActionCreators=__webpack_require__("./node_modules/react-redux/lib/utils/wrapActionCreators.js"),_wrapActionCreators2=_interopRequireDefault(_wrapActionCreators),_warning=__webpack_require__("./node_modules/react-redux/lib/utils/warning.js"),_warning2=_interopRequireDefault(_warning),_isPlainObject=__webpack_require__("./node_modules/lodash/isPlainObject.js"),_isPlainObject2=_interopRequireDefault(_isPlainObject),_hoistNonReactStatics=__webpack_require__("./node_modules/hoist-non-react-statics/index.js"),_hoistNonReactStatics2=_interopRequireDefault(_hoistNonReactStatics),_invariant=__webpack_require__("./node_modules/invariant/browser.js"),_invariant2=_interopRequireDefault(_invariant),defaultMapStateToProps=function(t){return{}},defaultMapDispatchToProps=function(t){return{dispatch:t}},defaultMergeProps=function(t,e,r){return _extends({},r,t,e)},errorObject={value:null},nextVersion=0;

/***/ },

/***/ "./node_modules/react-redux/lib/utils/shallowEqual.js":
/***/ function(module, exports) {

	"use strict";function shallowEqual(e,t){if(e===t)return!0;var r=Object.keys(e),l=Object.keys(t);if(r.length!==l.length)return!1;for(var n=Object.prototype.hasOwnProperty,o=0;o<r.length;o++)if(!n.call(t,r[o])||e[r[o]]!==t[r[o]])return!1;return!0}exports.__esModule=!0,exports["default"]=shallowEqual;

/***/ },

/***/ "./node_modules/react-redux/lib/utils/wrapActionCreators.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function wrapActionCreators(r){return function(e){return(0,_redux.bindActionCreators)(r,e)}}exports.__esModule=!0,exports["default"]=wrapActionCreators;var _redux=__webpack_require__("./node_modules/redux/lib/index.js");

/***/ },

/***/ "./node_modules/redux/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function isCrushed(){}exports.__esModule=!0,exports.compose=exports.applyMiddleware=exports.bindActionCreators=exports.combineReducers=exports.createStore=void 0;var _createStore=__webpack_require__("./node_modules/redux/lib/createStore.js"),_createStore2=_interopRequireDefault(_createStore),_combineReducers=__webpack_require__("./node_modules/redux/lib/combineReducers.js"),_combineReducers2=_interopRequireDefault(_combineReducers),_bindActionCreators=__webpack_require__("./node_modules/redux/lib/bindActionCreators.js"),_bindActionCreators2=_interopRequireDefault(_bindActionCreators),_applyMiddleware=__webpack_require__("./node_modules/redux/lib/applyMiddleware.js"),_applyMiddleware2=_interopRequireDefault(_applyMiddleware),_compose=__webpack_require__("./node_modules/redux/lib/compose.js"),_compose2=_interopRequireDefault(_compose),_warning=__webpack_require__("./node_modules/redux/lib/utils/warning.js"),_warning2=_interopRequireDefault(_warning);"production"!==("production")&&"string"==typeof isCrushed.name&&"isCrushed"!==isCrushed.name&&(0,_warning2["default"])("You are currently using minified code outside of NODE_ENV === 'production'. This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) to ensure you have the correct code for your production build."),exports.createStore=_createStore2["default"],exports.combineReducers=_combineReducers2["default"],exports.bindActionCreators=_bindActionCreators2["default"],exports.applyMiddleware=_applyMiddleware2["default"],exports.compose=_compose2["default"];

/***/ },

/***/ "./node_modules/redux/lib/createStore.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function createStore(e,t,r){function n(){l===b&&(l=b.slice())}function o(){return p}function i(e){if("function"!=typeof e)throw new Error("Expected listener to be a function.");var t=!0;return n(),l.push(e),function(){if(t){t=!1,n();var r=l.indexOf(e);l.splice(r,1)}}}function c(e){if(!(0,_isPlainObject2["default"])(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if("undefined"==typeof e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(d)throw new Error("Reducers may not dispatch actions.");try{d=!0,p=a(p,e)}finally{d=!1}for(var t=b=l,r=0;r<t.length;r++)t[r]();return e}function u(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");a=e,c({type:ActionTypes.INIT})}function s(){var e,t=i;return e={subscribe:function(e){function r(){e.next&&e.next(o())}if("object"!=typeof e)throw new TypeError("Expected the observer to be an object.");r();var n=t(r);return{unsubscribe:n}}},e[_symbolObservable2["default"]]=function(){return this},e}var f;if("function"==typeof t&&"undefined"==typeof r&&(r=t,t=void 0),"undefined"!=typeof r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function.");return r(createStore)(e,t)}if("function"!=typeof e)throw new Error("Expected the reducer to be a function.");var a=e,p=t,b=[],l=b,d=!1;return c({type:ActionTypes.INIT}),f={dispatch:c,subscribe:i,getState:o,replaceReducer:u},f[_symbolObservable2["default"]]=s,f}exports.__esModule=!0,exports.ActionTypes=void 0,exports["default"]=createStore;var _isPlainObject=__webpack_require__("./node_modules/lodash/isPlainObject.js"),_isPlainObject2=_interopRequireDefault(_isPlainObject),_symbolObservable=__webpack_require__("./node_modules/symbol-observable/index.js"),_symbolObservable2=_interopRequireDefault(_symbolObservable),ActionTypes=exports.ActionTypes={INIT:"@@redux/INIT"};

/***/ },

/***/ "./node_modules/lodash/isPlainObject.js":
/***/ function(module, exports, __webpack_require__) {

	function isPlainObject(t){if(!isObjectLike(t)||objectToString.call(t)!=objectTag||isHostObject(t))return!1;var o=getPrototype(t);if(null===o)return!0;var e=hasOwnProperty.call(o,"constructor")&&o.constructor;return"function"==typeof e&&e instanceof e&&funcToString.call(e)==objectCtorString}var getPrototype=__webpack_require__("./node_modules/lodash/_getPrototype.js"),isHostObject=__webpack_require__("./node_modules/lodash/_isHostObject.js"),isObjectLike=__webpack_require__("./node_modules/lodash/isObjectLike.js"),objectTag="[object Object]",objectProto=Object.prototype,funcToString=Function.prototype.toString,hasOwnProperty=objectProto.hasOwnProperty,objectCtorString=funcToString.call(Object),objectToString=objectProto.toString;module.exports=isPlainObject;

/***/ },

/***/ "./node_modules/lodash/_getPrototype.js":
/***/ function(module, exports, __webpack_require__) {

	var overArg=__webpack_require__("./node_modules/lodash/_overArg.js"),nativeGetPrototype=Object.getPrototypeOf,getPrototype=overArg(nativeGetPrototype,Object);module.exports=getPrototype;

/***/ },

/***/ "./node_modules/lodash/_overArg.js":
/***/ function(module, exports) {

	function overArg(r,e){return function(n){return r(e(n))}}module.exports=overArg;

/***/ },

/***/ "./node_modules/lodash/_isHostObject.js":
/***/ function(module, exports) {

	function isHostObject(t){var o=!1;if(null!=t&&"function"!=typeof t.toString)try{o=!!(t+"")}catch(n){}return o}module.exports=isHostObject;

/***/ },

/***/ "./node_modules/lodash/isObjectLike.js":
/***/ function(module, exports) {

	function isObjectLike(e){return!!e&&"object"==typeof e}module.exports=isObjectLike;

/***/ },

/***/ "./node_modules/symbol-observable/index.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";module.exports=__webpack_require__("./node_modules/symbol-observable/ponyfill.js")(global||window||this);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/symbol-observable/ponyfill.js":
/***/ function(module, exports) {

	"use strict";module.exports=function(e){var b,o=e.Symbol;return"function"==typeof o?o.observable?b=o.observable:(b=o("observable"),o.observable=b):b="@@observable",b};

/***/ },

/***/ "./node_modules/redux/lib/combineReducers.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function getUndefinedStateErrorMessage(e,t){var n=t&&t.type,r=n&&'"'+n.toString()+'"'||"an action";return"Given action "+r+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state.'}function getUnexpectedStateShapeWarningMessage(e,t,n){var r=Object.keys(t),i=n&&n.type===_createStore.ActionTypes.INIT?"initialState argument passed to createStore":"previous state received by the reducer";if(0===r.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!(0,_isPlainObject2["default"])(e))return"The "+i+' has unexpected type of "'+{}.toString.call(e).match(/\s([a-z|A-Z]+)/)[1]+'". Expected argument to be an object with the following '+('keys: "'+r.join('", "')+'"');var a=Object.keys(e).filter(function(e){return!t.hasOwnProperty(e)});return a.length>0?"Unexpected "+(a.length>1?"keys":"key")+" "+('"'+a.join('", "')+'" found in '+i+". ")+"Expected to find one of the known reducer keys instead: "+('"'+r.join('", "')+'". Unexpected keys will be ignored.'):void 0}function assertReducerSanity(e){Object.keys(e).forEach(function(t){var n=e[t],r=n(void 0,{type:_createStore.ActionTypes.INIT});if("undefined"==typeof r)throw new Error('Reducer "'+t+'" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');var i="@@redux/PROBE_UNKNOWN_ACTION_"+Math.random().toString(36).substring(7).split("").join(".");if("undefined"==typeof n(void 0,{type:i}))throw new Error('Reducer "'+t+'" returned undefined when probed with a random type. '+("Don't try to handle "+_createStore.ActionTypes.INIT+' or other actions in "redux/*" ')+"namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.")})}function combineReducers(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++){var i=t[r];"function"==typeof e[i]&&(n[i]=e[i])}var a,o=Object.keys(n);try{assertReducerSanity(n)}catch(u){a=u}return function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments[1];if(a)throw a;if(false){var r=getUnexpectedStateShapeWarningMessage(e,n,t);r&&(0,_warning2["default"])(r)}for(var i=!1,u={},s=0;s<o.length;s++){var d=o[s],c=n[d],f=e[d],l=c(f,t);if("undefined"==typeof l){var h=getUndefinedStateErrorMessage(d,t);throw new Error(h)}u[d]=l,i=i||l!==f}return i?u:e}}exports.__esModule=!0,exports["default"]=combineReducers;var _createStore=__webpack_require__("./node_modules/redux/lib/createStore.js"),_isPlainObject=__webpack_require__("./node_modules/lodash/isPlainObject.js"),_isPlainObject2=_interopRequireDefault(_isPlainObject),_warning=__webpack_require__("./node_modules/redux/lib/utils/warning.js"),_warning2=_interopRequireDefault(_warning);

/***/ },

/***/ "./node_modules/redux/lib/utils/warning.js":
/***/ function(module, exports) {

	"use strict";function warning(o){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(o);try{throw new Error(o)}catch(e){}}exports.__esModule=!0,exports["default"]=warning;

/***/ },

/***/ "./node_modules/redux/lib/bindActionCreators.js":
/***/ function(module, exports) {

	"use strict";function bindActionCreator(t,o){return function(){return o(t.apply(void 0,arguments))}}function bindActionCreators(t,o){if("function"==typeof t)return bindActionCreator(t,o);if("object"!=typeof t||null===t)throw new Error("bindActionCreators expected an object or a function, instead received "+(null===t?"null":typeof t)+'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');for(var r=Object.keys(t),n={},e=0;e<r.length;e++){var i=r[e],c=t[i];"function"==typeof c&&(n[i]=bindActionCreator(c,o))}return n}exports.__esModule=!0,exports["default"]=bindActionCreators;

/***/ },

/***/ "./node_modules/redux/lib/applyMiddleware.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function applyMiddleware(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(r,n,o){var a=e(r,n,o),u=a.dispatch,p=[],i={getState:a.getState,dispatch:function(e){return u(e)}};return p=t.map(function(e){return e(i)}),u=_compose2["default"].apply(void 0,p)(a.dispatch),_extends({},a,{dispatch:u})}}}exports.__esModule=!0;var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e};exports["default"]=applyMiddleware;var _compose=__webpack_require__("./node_modules/redux/lib/compose.js"),_compose2=_interopRequireDefault(_compose);

/***/ },

/***/ "./node_modules/redux/lib/compose.js":
/***/ function(module, exports) {

	"use strict";function compose(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];if(0===r.length)return function(e){return e};var n=function(){var e=r[r.length-1],t=r.slice(0,-1);return{v:function(){return t.reduceRight(function(e,r){return r(e)},e.apply(void 0,arguments))}}}();return"object"==typeof n?n.v:void 0}exports.__esModule=!0,exports["default"]=compose;

/***/ },

/***/ "./node_modules/hoist-non-react-statics/index.js":
/***/ function(module, exports) {

	"use strict";var REACT_STATICS={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,mixins:!0,propTypes:!0,type:!0},KNOWN_STATICS={name:!0,length:!0,prototype:!0,caller:!0,arguments:!0,arity:!0},isGetOwnPropertySymbolsAvailable="function"==typeof Object.getOwnPropertySymbols;module.exports=function(t,e,r){if("string"!=typeof e){var o=Object.getOwnPropertyNames(e);isGetOwnPropertySymbolsAvailable&&(o=o.concat(Object.getOwnPropertySymbols(e)));for(var n=0;n<o.length;++n)if(!(REACT_STATICS[o[n]]||KNOWN_STATICS[o[n]]||r&&r[o[n]]))try{t[o[n]]=e[o[n]]}catch(p){}}return t};

/***/ },

/***/ "./node_modules/invariant/browser.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var invariant=function(r,e,n,i,o,a,t,s){if(false)throw new Error("invariant requires an error message argument");if(!r){var u;if(void 0===e)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var v=[n,i,o,a,t,s],d=0;u=new Error(e.replace(/%s/g,function(){return v[d++]})),u.name="Invariant Violation"}throw u.framesToPop=1,u}};module.exports=invariant;

/***/ },

/***/ "./src/ASTOutput.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function parse(e,t,r){return e._promise||(e._promise=new _promise2["default"](e.loadParser)),e._promise.then(function(s){return e.parse(s,t,r)})}function formatTime(e){return e?e<1e3?e+"ms":(e/1e3).toFixed(2)+"s":null}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_promise=__webpack_require__("./node_modules/babel-runtime/core-js/promise.js"),_promise2=_interopRequireDefault(_promise),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_classnames=__webpack_require__("./node_modules/classnames/index.js"),_classnames2=_interopRequireDefault(_classnames),_visualization=__webpack_require__("./src/components/visualization/index.js"),_visualization2=_interopRequireDefault(_visualization),_getFocusPath=__webpack_require__("./src/getFocusPath.js"),_getFocusPath2=_interopRequireDefault(_getFocusPath),_pubsubJs=__webpack_require__("./node_modules/pubsub-js/src/pubsub.js"),_pubsubJs2=_interopRequireDefault(_pubsubJs),PropTypes=_react2["default"].PropTypes,ASTOutput=function(e){function t(e,r){(0,_classCallCheck3["default"])(this,t);var s=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,e,r));return s._changeOutput=s._changeOutput.bind(s),s.state={output:0,parseError:null,ast:null,parseTime:null},s}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"componentDidMount",value:function(){var e=this;this._parse(this.props.parser,this.props.code,this.props.parserSettings),this._subscription=_pubsubJs2["default"].subscribe("FORCE_PARSE",function(){e._parse(e.props.parser,e.props.code)})}},{key:"componentWillUnmount",value:function(){_pubsubJs2["default"].unsubscribe("FORCE_PARSE")}},{key:"componentWillReceiveProps",value:function(e){e.parser!==this.props.parser||e.code!==this.props.code||e.parserSettings!==this.props.parserSettings?this._parse(e.parser,e.code,e.parserSettings):e.cursor!==this.props.cursor&&this.setState({focusPath:null!=e.cursor?(0,_getFocusPath2["default"])(this.state.ast,e.cursor,e.parser):[]})}},{key:"shouldComponentUpdate",value:function(e,t){return t.ast!==this.state.ast||t.parseError!==this.state.parseError||t.focusPath!==this.state.focusPath||t.output!==this.state.output}},{key:"_parse",value:function(e,t,r){var s=this;if(e&&null!=t){var a=Date.now();parse(e,t,r).then(function(r){e!==s.props.parser&&t!==s.props.code||(s.setState({parseTime:Date.now()-a,ast:r,focusPath:null!=s.props.cursor?(0,_getFocusPath2["default"])(r,s.props.cursor,e):[],parseError:null}),s.props.onParseError(null))},function(e){console.error(e),s.setState({parseError:e,parseTime:null}),s.props.onParseError(e)})}}},{key:"_changeOutput",value:function(e){this.setState({output:e.target.value})}},{key:"render",value:function(){var e=this,t=void 0;this.state.parseError?t=_react2["default"].createElement("div",{style:{padding:20}},this.state.parseError.message):this.state.ast&&(t=_react2["default"].createElement(_visualization2["default"][this.state.output],{ast:this.state.ast,focusPath:this.state.focusPath,parser:this.props.parser}));var r=_visualization2["default"].map(function(t,r){return _react2["default"].createElement("button",{key:r,value:r,onClick:e._changeOutput,className:(0,_classnames2["default"])({active:e.state.output==r})},t.name)});return _react2["default"].createElement("div",{className:"output highlight"},_react2["default"].createElement("div",{className:"toolbar"},r,_react2["default"].createElement("span",{className:"time"},formatTime(this.state.parseTime))),t)}}]),t}(_react2["default"].Component);exports["default"]=ASTOutput,ASTOutput.propTypes={code:_react2["default"].PropTypes.string,parser:PropTypes.object.isRequired,parserSettings:PropTypes.object,cursor:PropTypes.any,onParseError:_react2["default"].PropTypes.func.isRequired};

/***/ },

/***/ "./src/components/visualization/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _JSON=__webpack_require__("./src/components/visualization/JSON.js"),_JSON2=_interopRequireDefault(_JSON),_Tree=__webpack_require__("./src/components/visualization/Tree.js"),_Tree2=_interopRequireDefault(_Tree);exports["default"]=[_Tree2["default"],_JSON2["default"]];

/***/ },

/***/ "./src/components/visualization/JSON.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_JSONEditor=__webpack_require__("./src/JSONEditor.js"),_JSONEditor2=_interopRequireDefault(_JSONEditor),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_jsonStringifySafe=__webpack_require__("./node_modules/json-stringify-safe/stringify.js"),_jsonStringifySafe2=_interopRequireDefault(_jsonStringifySafe),JSON=function(){function JSON(){(0,_classCallCheck3["default"])(this,JSON)}return(0,_createClass3["default"])(JSON,[{key:"render",value:function(){return _react2["default"].createElement(_JSONEditor2["default"],{className:"container",value:(0,_jsonStringifySafe2["default"])(this.props.ast,null,2)})}}]),JSON}();exports["default"]=JSON;

/***/ },

/***/ "./src/JSONEditor.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_codemirror=__webpack_require__("./node_modules/codemirror/lib/codemirror.js"),_codemirror2=_interopRequireDefault(_codemirror);__webpack_require__("./node_modules/codemirror/mode/javascript/javascript.js"),__webpack_require__("./node_modules/codemirror/addon/fold/foldgutter.js"),__webpack_require__("./node_modules/codemirror/addon/fold/foldcode.js"),__webpack_require__("./node_modules/codemirror/addon/fold/brace-fold.js");var _pubsubJs=__webpack_require__("./node_modules/pubsub-js/src/pubsub.js"),_pubsubJs2=_interopRequireDefault(_pubsubJs),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),Editor=function(e){function r(){return(0,_classCallCheck3["default"])(this,r),(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(r).apply(this,arguments))}return(0,_inherits3["default"])(r,e),(0,_createClass3["default"])(r,[{key:"getValue",value:function(){return this.codeMirror&&this.codeMirror.getValue()}},{key:"componentWillReceiveProps",value:function(e){if(e.value!==this.codeMirror.getValue()){var r=this.codeMirror.getScrollInfo();this.codeMirror.setValue(e.value),this.codeMirror.scrollTo(r.left,r.top)}}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"componentDidMount",value:function(){var e=this;this._CMHandlers=[],this._subscriptions=[],this.codeMirror=(0,_codemirror2["default"])(this.refs.container.getDOMNode(),{value:this.props.value,mode:{name:"javascript",json:!0},readOnly:!0,lineNumbers:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]}),this.props.onContentChange&&this._onContentChange(),this._subscriptions.push(_pubsubJs2["default"].subscribe("PANEL_RESIZE",function(){e.codeMirror&&e.codeMirror.refresh()}))}},{key:"componentWillUnmount",value:function(){this._unbindHandlers();var e=this.refs.container.getDOMNode();e.removeChild(e.children[0]),this.codeMirror=null}},{key:"_bindCMHandler",value:function(e,r){this._CMHandlers.push(e,r),this.codeMirror.on(e,r)}},{key:"_unbindHandlers",value:function(){for(var e=this._CMHandlers,r=0;r<e.length;r+=2)this.codeMirror.off(e[r],e[r+1])}},{key:"render",value:function(){return _react2["default"].createElement("div",{id:"JSONEditor",className:this.props.className,ref:"container"})}}]),r}(_react2["default"].Component);exports["default"]=Editor,Editor.propTypes={value:_react2["default"].PropTypes.string,className:_react2["default"].PropTypes.string,onContentChange:_react2["default"].PropTypes.func};

/***/ },

/***/ "./node_modules/codemirror/addon/fold/foldgutter.js":
/***/ function(module, exports, __webpack_require__) {

	!function(o){ true?o(__webpack_require__("./node_modules/codemirror/lib/codemirror.js"),__webpack_require__("./node_modules/codemirror/addon/fold/foldcode.js")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./foldcode"],o):o(CodeMirror)}(function(o){"use strict";function t(o){this.options=o,this.from=this.to=0}function e(o){return o===!0&&(o={}),null==o.gutter&&(o.gutter="CodeMirror-foldgutter"),null==o.indicatorOpen&&(o.indicatorOpen="CodeMirror-foldgutter-open"),null==o.indicatorFolded&&(o.indicatorFolded="CodeMirror-foldgutter-folded"),o}function r(o,t){for(var e=o.findMarks(c(t,0),c(t+1,0)),r=0;r<e.length;++r)if(e[r].__isFold&&e[r].find().from.line==t)return e[r]}function n(o){if("string"==typeof o){var t=document.createElement("div");return t.className=o+" CodeMirror-guttermarker-subtle",t}return o.cloneNode(!0)}function i(o,t,e){var i=o.state.foldGutter.options,f=t,d=o.foldOption(i,"minFoldSize"),a=o.foldOption(i,"rangeFinder");o.eachLine(t,e,function(t){var e=null;if(r(o,f))e=n(i.indicatorFolded);else{var u=c(f,0),l=a&&a(o,u);l&&l.to.line-l.from.line>=d&&(e=n(i.indicatorOpen))}o.setGutterMarker(t,i.gutter,e),++f})}function f(o){var t=o.getViewport(),e=o.state.foldGutter;e&&(o.operation(function(){i(o,t.from,t.to)}),e.from=t.from,e.to=t.to)}function d(o,t,e){var n=o.state.foldGutter;if(n){var i=n.options;if(e==i.gutter){var f=r(o,t);f?f.clear():o.foldCode(c(t,0),i.rangeFinder)}}}function a(o){var t=o.state.foldGutter;if(t){var e=t.options;t.from=t.to=0,clearTimeout(t.changeUpdate),t.changeUpdate=setTimeout(function(){f(o)},e.foldOnChangeTimeSpan||600)}}function u(o){var t=o.state.foldGutter;if(t){var e=t.options;clearTimeout(t.changeUpdate),t.changeUpdate=setTimeout(function(){var e=o.getViewport();t.from==t.to||e.from-t.to>20||t.from-e.to>20?f(o):o.operation(function(){e.from<t.from&&(i(o,e.from,t.from),t.from=e.from),e.to>t.to&&(i(o,t.to,e.to),t.to=e.to)})},e.updateViewportTimeSpan||400)}}function l(o,t){var e=o.state.foldGutter;if(e){var r=t.line;r>=e.from&&r<e.to&&i(o,r,r+1)}}o.defineOption("foldGutter",!1,function(r,n,i){i&&i!=o.Init&&(r.clearGutter(r.state.foldGutter.options.gutter),r.state.foldGutter=null,r.off("gutterClick",d),r.off("change",a),r.off("viewportChange",u),r.off("fold",l),r.off("unfold",l),r.off("swapDoc",a)),n&&(r.state.foldGutter=new t(e(n)),f(r),r.on("gutterClick",d),r.on("change",a),r.on("viewportChange",u),r.on("fold",l),r.on("unfold",l),r.on("swapDoc",a))});var c=o.Pos});

/***/ },

/***/ "./node_modules/codemirror/addon/fold/foldcode.js":
/***/ function(module, exports, __webpack_require__) {

	!function(n){ true?n(__webpack_require__("./node_modules/codemirror/lib/codemirror.js")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],n):n(CodeMirror)}(function(n){"use strict";function o(o,i,t,l){function f(n){var e=d(o,i);if(!e||e.to.line-e.from.line<u)return null;for(var r=o.findMarksAt(e.from),t=0;t<r.length;++t)if(r[t].__isFold&&"fold"!==l){if(!n)return null;e.cleared=!0,r[t].clear()}return e}if(t&&t.call){var d=t;t=null}else var d=r(o,t,"rangeFinder");"number"==typeof i&&(i=n.Pos(i,0));var u=r(o,t,"minFoldSize"),a=f(!0);if(r(o,t,"scanUp"))for(;!a&&i.line>o.firstLine();)i=n.Pos(i.line-1,0),a=f(!1);if(a&&!a.cleared&&"unfold"!==l){var c=e(o,t);n.on(c,"mousedown",function(o){s.clear(),n.e_preventDefault(o)});var s=o.markText(a.from,a.to,{replacedWith:c,clearOnEnter:r(o,t,"clearOnEnter"),__isFold:!0});s.on("clear",function(e,r){n.signal(o,"unfold",o,e,r)}),n.signal(o,"fold",o,a.from,a.to)}}function e(n,o){var e=r(n,o,"widget");if("string"==typeof e){var i=document.createTextNode(e);e=document.createElement("span"),e.appendChild(i),e.className="CodeMirror-foldmarker"}return e}function r(n,o,e){if(o&&void 0!==o[e])return o[e];var r=n.options.foldOptions;return r&&void 0!==r[e]?r[e]:i[e]}n.newFoldFunction=function(n,e){return function(r,i){o(r,i,{rangeFinder:n,widget:e})}},n.defineExtension("foldCode",function(n,e,r){o(this,n,e,r)}),n.defineExtension("isFolded",function(n){for(var o=this.findMarksAt(n),e=0;e<o.length;++e)if(o[e].__isFold)return!0}),n.commands.toggleFold=function(n){n.foldCode(n.getCursor())},n.commands.fold=function(n){n.foldCode(n.getCursor(),null,"fold")},n.commands.unfold=function(n){n.foldCode(n.getCursor(),null,"unfold")},n.commands.foldAll=function(o){o.operation(function(){for(var e=o.firstLine(),r=o.lastLine();e<=r;e++)o.foldCode(n.Pos(e,0),null,"fold")})},n.commands.unfoldAll=function(o){o.operation(function(){for(var e=o.firstLine(),r=o.lastLine();e<=r;e++)o.foldCode(n.Pos(e,0),null,"unfold")})},n.registerHelper("fold","combine",function(){var n=Array.prototype.slice.call(arguments,0);return function(o,e){for(var r=0;r<n.length;++r){var i=n[r](o,e);if(i)return i}}}),n.registerHelper("fold","auto",function(n,o){for(var e=n.getHelpers(o,"fold"),r=0;r<e.length;r++){var i=e[r](n,o);if(i)return i}});var i={rangeFinder:n.fold.auto,widget:"↔",minFoldSize:0,scanUp:!1,clearOnEnter:!0};n.defineOption("foldOptions",null),n.defineExtension("foldOption",function(n,o){return r(this,n,o)})});

/***/ },

/***/ "./node_modules/codemirror/addon/fold/brace-fold.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){ true?e(__webpack_require__("./node_modules/codemirror/lib/codemirror.js")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";e.registerHelper("fold","brace",function(r,n){function t(t){for(var f=n.ch,s=0;;){var u=f<=0?-1:l.lastIndexOf(t,f-1);if(u!=-1){if(1==s&&u<n.ch)break;if(i=r.getTokenTypeAt(e.Pos(o,u+1)),!/^(comment|string)/.test(i))return u+1;f=u-1}else{if(1==s)break;s=1,f=l.length}}}var i,o=n.line,l=r.getLine(o),f="{",s="}",u=t("{");if(null==u&&(f="[",s="]",u=t("[")),null!=u){var a,d,c=1,g=r.lastLine();e:for(var v=o;v<=g;++v)for(var p=r.getLine(v),m=v==o?u:0;;){var P=p.indexOf(f,m),k=p.indexOf(s,m);if(P<0&&(P=p.length),k<0&&(k=p.length),m=Math.min(P,k),m==p.length)break;if(r.getTokenTypeAt(e.Pos(v,m+1))==i)if(m==P)++c;else if(!--c){a=v,d=m;break e}++m}if(null!=a&&(o!=a||d!=u))return{from:e.Pos(o,u),to:e.Pos(a,d)}}}),e.registerHelper("fold","import",function(r,n){function t(n){if(n<r.firstLine()||n>r.lastLine())return null;var t=r.getTokenAt(e.Pos(n,1));if(/\S/.test(t.string)||(t=r.getTokenAt(e.Pos(n,t.end+1))),"keyword"!=t.type||"import"!=t.string)return null;for(var i=n,o=Math.min(r.lastLine(),n+10);i<=o;++i){var l=r.getLine(i),f=l.indexOf(";");if(f!=-1)return{startCh:t.end,end:e.Pos(i,f)}}}var i,o=n.line,l=t(o);if(!l||t(o-1)||(i=t(o-2))&&i.end.line==o-1)return null;for(var f=l.end;;){var s=t(f.line+1);if(null==s)break;f=s.end}return{from:r.clipPos(e.Pos(o,l.startCh+1)),to:f}}),e.registerHelper("fold","include",function(r,n){function t(n){if(n<r.firstLine()||n>r.lastLine())return null;var t=r.getTokenAt(e.Pos(n,1));return/\S/.test(t.string)||(t=r.getTokenAt(e.Pos(n,t.end+1))),"meta"==t.type&&"#include"==t.string.slice(0,8)?t.start+8:void 0}var i=n.line,o=t(i);if(null==o||null!=t(i-1))return null;for(var l=i;;){var f=t(l+1);if(null==f)break;++l}return{from:e.Pos(i,o+1),to:r.clipPos(e.Pos(l))}})});

/***/ },

/***/ "./src/components/visualization/Tree.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _defineProperty2=__webpack_require__("./node_modules/babel-runtime/helpers/defineProperty.js"),_defineProperty3=_interopRequireDefault(_defineProperty2),_getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_Element=__webpack_require__("./src/components/ast/Element.js"),_Element2=_interopRequireDefault(_Element),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_pubsubJs=__webpack_require__("./node_modules/pubsub-js/src/pubsub.js"),_pubsubJs2=_interopRequireDefault(_pubsubJs),_LocalStorage=__webpack_require__("./src/LocalStorage.js");__webpack_require__("./src/components/visualization/css/tree.css");var ID="tree",Tree=function(e){function Tree(e){(0,_classCallCheck3["default"])(this,Tree);var t=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(Tree).call(this,e));return t.state=(0,_LocalStorage.getVisualizationSettings)(ID,{autofocus:!0,hideFunctions:!0}),t}return(0,_inherits3["default"])(Tree,e),(0,_createClass3["default"])(Tree,[{key:"_setOption",value:function(e,t){var r=this;this.setState((0,_defineProperty3["default"])({},e,t.target.checked),function(){return(0,_LocalStorage.setVisualizationSettings)(ID,r.state)})}},{key:"render",value:function(){return _react2["default"].createElement("div",{className:"tree-visualization container"},_react2["default"].createElement("div",{className:"toolbar"},_react2["default"].createElement("label",{title:"Auto open the node at the cursor in the source code"},_react2["default"].createElement("input",{type:"checkbox",checked:this.state.autofocus,onChange:this._setOption.bind(this,"autofocus")}),"Autofocus"),_react2["default"].createElement("label",null,_react2["default"].createElement("input",{type:"checkbox",checked:this.state.hideFunctions,onChange:this._setOption.bind(this,"hideFunctions")}),"Hide methods"),_react2["default"].createElement("label",null,_react2["default"].createElement("input",{type:"checkbox",checked:this.state.hideEmptyKeys,onChange:this._setOption.bind(this,"hideEmptyKeys")}),"Hide empty keys"),_react2["default"].createElement("label",null,_react2["default"].createElement("input",{type:"checkbox",checked:this.state.hideLocationData,onChange:this._setOption.bind(this,"hideLocationData")}),"Hide location data")),_react2["default"].createElement("ul",{onMouseLeave:function(){_pubsubJs2["default"].publish("CLEAR_HIGHLIGHT")}},_react2["default"].createElement(_Element2["default"],{focusPath:this.props.focusPath,value:this.props.ast,level:0,parser:this.props.parser,settings:this.state})))}}]),Tree}(_react2["default"].Component);exports["default"]=Tree,Tree.propTypes={focusPath:_react2["default"].PropTypes.array,ast:_react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.array,_react2["default"].PropTypes.object]),parser:_react2["default"].PropTypes.object};

/***/ },

/***/ "./src/components/ast/Element.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _isInteger=__webpack_require__("./node_modules/babel-runtime/core-js/number/is-integer.js"),_isInteger2=_interopRequireDefault(_isInteger),_typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_toConsumableArray2=__webpack_require__("./node_modules/babel-runtime/helpers/toConsumableArray.js"),_toConsumableArray3=_interopRequireDefault(_toConsumableArray2),_getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_CompactArrayView=__webpack_require__("./src/components/ast/CompactArrayView.js"),_CompactArrayView2=_interopRequireDefault(_CompactArrayView),_CompactObjectView=__webpack_require__("./src/components/ast/CompactObjectView.js"),_CompactObjectView2=_interopRequireDefault(_CompactObjectView),_pubsubJs=__webpack_require__("./node_modules/pubsub-js/src/pubsub.js"),_pubsubJs2=_interopRequireDefault(_pubsubJs),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_reactDom=__webpack_require__("./node_modules/react-dom/index.js"),_reactDom2=_interopRequireDefault(_reactDom),_RecursiveTreeElement=__webpack_require__("./src/components/ast/RecursiveTreeElement.js"),_RecursiveTreeElement2=_interopRequireDefault(_RecursiveTreeElement),_getFocusPath=__webpack_require__("./src/getFocusPath.js"),_classnames=__webpack_require__("./node_modules/classnames/index.js"),_classnames2=_interopRequireDefault(_classnames),_stringify=__webpack_require__("./src/utils/stringify.js"),_stringify2=_interopRequireDefault(_stringify),PropTypes=_react2["default"].PropTypes,lastClickedElement=void 0,_Element=function(e){function t(e,r){(0,_classCallCheck3["default"])(this,t);var a=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,e,r));a._execFunction=a._execFunction.bind(a),a._onMouseLeave=a._onMouseLeave.bind(a),a._onMouseOver=a._onMouseOver.bind(a),a._toggleClick=a._toggleClick.bind(a);var l=e.value,n=e.name,s=e.deepOpen,o=e.parser,u=e.open||0===e.level||s||!!l&&o.opensByDefault(l,n);return a.state={open:u,deepOpen:s,value:l},a}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({open:e.open||e.deepOpen||this.state.open,deepOpen:e.deepOpen,value:e.value})}},{key:"componentWillUnmount",value:function(){lastClickedElement===this&&(lastClickedElement=null)}},{key:"_shouldAutoFocus",value:function(e,t){var r=e.focusPath,a=t.settings,l=t.focusPath;return r!==l&&l.indexOf(t.value)>-1&&a.autofocus}},{key:"componentDidMount",value:function(){this.props.settings.autofocus&&this._scrollIntoView()}},{key:"componentDidUpdate",value:function(e){this._shouldAutoFocus(e,this.props)&&this._scrollIntoView()}},{key:"_scrollIntoView",value:function(){var e=this,t=this.props,r=t.focusPath,a=t.value;r.length>0&&r[r.length-1]===a&&setTimeout(function(){var t=_reactDom2["default"].findDOMNode(e);t.scrollIntoView()},0)}},{key:"_toggleClick",value:function(e){var t=this,r=e.shiftKey,a=r||!this.state.open,l=function(){a?global.$node=t.state.value:delete global.$node,t.setState({open:a,deepOpen:r})};if(lastClickedElement&&lastClickedElement!==this){var n=lastClickedElement;return lastClickedElement=a?this:null,void n.forceUpdate(l)}lastClickedElement=a?this:null,l()}},{key:"_onMouseOver",value:function(e){e.stopPropagation();var t=this.state.value;_pubsubJs2["default"].publish("HIGHLIGHT",{node:t,range:(0,_getFocusPath.nodeToRange)(this.props.parser,t)})}},{key:"_onMouseLeave",value:function(){var e=this.state.value;_pubsubJs2["default"].publish("CLEAR_HIGHLIGHT",{node:e,range:(0,_getFocusPath.nodeToRange)(this.props.parser,e)})}},{key:"_isFocused",value:function(e,t,r,a){return 0!==e&&t.indexOf(r)>-1&&(!a||t[t.length-1]===r)}},{key:"_getProperties",value:function(e,t){var r=this.props.settings,a=r.hideFunctions,l=r.hideEmptyKeys,n=r.hideLocationData,s=[].concat((0,_toConsumableArray3["default"])(e.forEachProperty(t)));return s.filter(function(e){var t=e.value;return!a||"function"!=typeof t}).filter(function(e){var t=e.value;return!l||null!=t}).filter(function(t){var r=t.key;return!n||!e.locationProps.has(r)})}},{key:"_execFunction",value:function(){var e={error:null};try{e.value=this.state.value.call(this.props.parent),console.log(e.value)}catch(t){console.error('Unable to run "'+this.props.name+'": ',t.message),e.error=t}this.setState(e)}},{key:"_createSubElement",value:function(e,t,r,a){return _react2["default"].createElement(_Element,{key:e,name:r,focusPath:this.props.focusPath,deepOpen:this.state.deepOpen,value:t,computed:a,level:this.props.level+1,parser:this.props.parser,settings:this.props.settings,parent:this.props.value})}},{key:"render",value:function(){var e=this,t=this.props,r=t.focusPath,a=t.parser,l=t.level,n=this.state,s=n.open,o=n.value,u=this._isFocused(l,r,o,s),i=null,c=null,p=null,_=null,f=!1,m=!1;if(o&&"object"===("undefined"==typeof o?"undefined":(0,_typeof3["default"])(o))){if(Array.isArray(o))m=!0;else{var d=a.getNodeName(o);d&&(i=_react2["default"].createElement("span",{className:"tokenName nc",onClick:this._toggleClick},d,lastClickedElement===this?_react2["default"].createElement("span",{className:"ge",style:{fontSize:"0.8em"}}," = $node"):null)),m=a.nodeToRange(o)&&0!==l}if("number"==typeof o.length){if(o.length>0&&s){p="[",_="]";var h=this._getProperties(a,o).filter(function(e){var t=e.key;return"length"!==t}).map(function(t){var r=t.key,a=t.value,l=t.computed;return e._createSubElement(r,a,(0,_isInteger2["default"])(+r)?void 0:r,l)});c=_react2["default"].createElement("ul",{className:"value-body"},h)}else i=_react2["default"].createElement("span",null,i,_react2["default"].createElement(_CompactArrayView2["default"],{array:o,onClick:this._toggleClick}));f=o.length>0}else if(s){p="{",_="}";var v=this._getProperties(a,o).map(function(t){var r=t.key,a=t.value,l=t.computed;return e._createSubElement(r,a,r,l)});c=_react2["default"].createElement("ul",{className:"value-body"},v),f=v.length>0}else{var y=this._getProperties(a,o).map(function(e){var t=e.key;return t});i=_react2["default"].createElement("span",null,i,_react2["default"].createElement(_CompactObjectView2["default"],{onClick:this._toggleClick,keys:y})),f=y.length>0}}else"function"==typeof o?(i=_react2["default"].createElement("span",{className:"ge invokeable",title:"Click to invoke function",onClick:this._execFunction},"(...)"),f=!1):(i=_react2["default"].createElement("span",{className:"s"},(0,_stringify2["default"])(o)),f=!1);var b=this.props.name?_react2["default"].createElement("span",{className:"key",onClick:f?this._toggleClick:null},_react2["default"].createElement("span",{className:"name nb"},this.props.computed?_react2["default"].createElement("span",{title:"computed"},"*",this.props.name):this.props.name),_react2["default"].createElement("span",{className:"p"},": ")):null,g=(0,_classnames2["default"])({entry:!0,focused:u,toggable:f,open:s});return _react2["default"].createElement("li",{ref:"container",className:g,onMouseOver:m?this._onMouseOver:null,onMouseLeave:m?this._onMouseLeave:null},b,_react2["default"].createElement("span",{className:"value"},i),p?_react2["default"].createElement("span",{className:"prefix p"}," ",p):null,c,_?_react2["default"].createElement("div",{className:"suffix p"},_):null,this.state.error?_react2["default"].createElement("span",null," ",_react2["default"].createElement("i",{title:this.state.error.message,className:"fa fa-exclamation-triangle"})):null)}}]),t}(_react2["default"].Component);_Element.propTypes={name:PropTypes.string,value:PropTypes.any,computed:PropTypes.bool,open:PropTypes.bool,deepOpen:PropTypes.bool,focusPath:PropTypes.array.isRequired,level:PropTypes.number,parser:PropTypes.object.isRequired,settings:PropTypes.object.isRequired,parent:PropTypes.oneOfType([PropTypes.object,PropTypes.array])},exports["default"]=_Element=(0,_RecursiveTreeElement2["default"])(_Element);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./node_modules/babel-runtime/core-js/number/is-integer.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/number/is-integer.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/number/is-integer.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.number.is-integer.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Number.isInteger;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.number.is-integer.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js");$export($export.S,"Number",{isInteger:__webpack_require__("./node_modules/core-js/library/modules/_is-integer.js")});

/***/ },

/***/ "./node_modules/core-js/library/modules/_is-integer.js":
/***/ function(module, exports, __webpack_require__) {

	var isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),floor=Math.floor;module.exports=function(o){return!isObject(o)&&isFinite(o)&&floor(o)===o};

/***/ },

/***/ "./src/components/ast/CompactArrayView.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),CompactArrayView=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).apply(this,arguments))}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"shouldComponentUpdate",value:function(e){return e.array.length!==this.props.array.length}},{key:"render",value:function(){var e=this.props.array,t=e.length;return 0===t?_react2["default"].createElement("span",{className:"p"},"[ ]"):_react2["default"].createElement("span",null,_react2["default"].createElement("span",{className:"p"},"["),_react2["default"].createElement("span",{className:"compact placeholder ge",onClick:this.props.onClick},t+" element"+(t>1?"s":"")),_react2["default"].createElement("span",{className:"p"},"]"))}}]),t}(_react2["default"].Component);exports["default"]=CompactArrayView,CompactArrayView.propTypes={array:_react2["default"].PropTypes.oneOfType([_react2["default"].PropTypes.array,_react2["default"].PropTypes.shape({length:_react2["default"].PropTypes.number})]).isRequired,onClick:_react2["default"].PropTypes.func};

/***/ },

/***/ "./src/components/ast/CompactObjectView.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function CompactObjectView(e){var t=e.keys,a=e.onClick;return 0===t.length?_react2["default"].createElement("span",{className:"p"},"{ }"):(t.length>5&&(t=t.slice(0,5).concat(["... +"+(t.length-5)])),_react2["default"].createElement("span",null,_react2["default"].createElement("span",{className:"p"}," {"),_react2["default"].createElement("span",{className:"compact placeholder ge",onClick:a},t.join(", ")),_react2["default"].createElement("span",{className:"p"},"}")))}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=CompactObjectView;var _react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react);CompactObjectView.propTypes={keys:_react2["default"].PropTypes.arrayOf(_react2["default"].PropTypes.string).isRequired,onClick:_react2["default"].PropTypes.func};

/***/ },

/***/ "./node_modules/react-dom/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";module.exports=__webpack_require__("./node_modules/react/lib/ReactDOM.js");

/***/ },

/***/ "./src/components/ast/RecursiveTreeElement.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function shouldAutoFocus(e){var t=e.value,r=e.settings,u=e.focusPath;return!!r.autofocus&&u.indexOf(t)>-1}function RecursiveTreeElement(e){function t(e){u.has(e)?u.set(e,u.get(e)+1):u.set(e,1)}function r(e){var t=u.get(e)-1;0===t?u["delete"](e):u.set(e,t)}var u=new _weakMap2["default"],a=function(a){function s(e){(0,_classCallCheck3["default"])(this,s);var r=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(s).call(this,e)),a=e.deepOpen,l=shouldAutoFocus(e);return e.value&&"object"===(0,_typeof3["default"])(e.value)&&(u.has(e.value)&&(a=!1,l=!1),t(e.value)),r.state={deepOpen:a,open:l},r}return(0,_inherits3["default"])(s,a),(0,_createClass3["default"])(s,[{key:"componentWillUnmount",value:function(){var e=this.props.value;e&&"object"===("undefined"==typeof e?"undefined":(0,_typeof3["default"])(e))&&r(e)}},{key:"componentWillReceiveProps",value:function(e){var a=e.deepOpen,s=shouldAutoFocus(e);!this.props.value!==e.value&&(this.props.value&&"object"===(0,_typeof3["default"])(this.props.value)&&r(this.props.value),e.value&&"object"===(0,_typeof3["default"])(e.value)&&(u.has(e.value)&&(a=!1,s=!1),t(e.value))),this.setState({deepOpen:a,open:s})}},{key:"render",value:function(){var t=this.props;return _react2["default"].createElement(e,(0,_extends3["default"])({},t,{open:this.state.open,deepOpen:this.state.deepOpen}))}}]),s}(_react2["default"].Component);return a.propTypes={deepOpen:_react2["default"].PropTypes.bool,value:_react2["default"].PropTypes.any},a}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_weakMap=__webpack_require__("./node_modules/babel-runtime/core-js/weak-map.js"),_weakMap2=_interopRequireDefault(_weakMap);exports["default"]=RecursiveTreeElement;var _react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react);

/***/ },

/***/ "./node_modules/babel-runtime/core-js/weak-map.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/weak-map.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/weak-map.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js"),__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.weak-map.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").WeakMap;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.weak-map.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var each=__webpack_require__("./node_modules/core-js/library/modules/_array-methods.js")(0),redefine=__webpack_require__("./node_modules/core-js/library/modules/_redefine.js"),meta=__webpack_require__("./node_modules/core-js/library/modules/_meta.js"),assign=__webpack_require__("./node_modules/core-js/library/modules/_object-assign.js"),weak=__webpack_require__("./node_modules/core-js/library/modules/_collection-weak.js"),isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),getWeak=meta.getWeak,isExtensible=Object.isExtensible,uncaughtFrozenStore=weak.ufstore,tmp={},InternalMap,wrapper=function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},methods={get:function(e){if(isObject(e)){var t=getWeak(e);return t===!0?uncaughtFrozenStore(this).get(e):t?t[this._i]:void 0}},set:function(e,t){return weak.def(this,e,t)}},$WeakMap=module.exports=__webpack_require__("./node_modules/core-js/library/modules/_collection.js")("WeakMap",wrapper,methods,weak,!0,!0);7!=(new $WeakMap).set((Object.freeze||Object)(tmp),7).get(tmp)&&(InternalMap=weak.getConstructor(wrapper),assign(InternalMap.prototype,methods),meta.NEED=!0,each(["delete","has","get","set"],function(e){var t=$WeakMap.prototype,r=t[e];redefine(t,e,function(t,a){if(isObject(t)&&!isExtensible(t)){this._f||(this._f=new InternalMap);var i=this._f[e](t,a);return"set"==e?this:i}return r.call(this,t,a)})}));

/***/ },

/***/ "./node_modules/core-js/library/modules/_collection-weak.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var redefineAll=__webpack_require__("./node_modules/core-js/library/modules/_redefine-all.js"),getWeak=__webpack_require__("./node_modules/core-js/library/modules/_meta.js").getWeak,anObject=__webpack_require__("./node_modules/core-js/library/modules/_an-object.js"),isObject=__webpack_require__("./node_modules/core-js/library/modules/_is-object.js"),anInstance=__webpack_require__("./node_modules/core-js/library/modules/_an-instance.js"),forOf=__webpack_require__("./node_modules/core-js/library/modules/_for-of.js"),createArrayMethod=__webpack_require__("./node_modules/core-js/library/modules/_array-methods.js"),$has=__webpack_require__("./node_modules/core-js/library/modules/_has.js"),arrayFind=createArrayMethod(5),arrayFindIndex=createArrayMethod(6),id=0,uncaughtFrozenStore=function(e){return e._l||(e._l=new UncaughtFrozenStore)},UncaughtFrozenStore=function(){this.a=[]},findUncaughtFrozen=function(e,r){return arrayFind(e.a,function(e){return e[0]===r})};UncaughtFrozenStore.prototype={get:function(e){var r=findUncaughtFrozen(this,e);if(r)return r[1]},has:function(e){return!!findUncaughtFrozen(this,e)},set:function(e,r){var t=findUncaughtFrozen(this,e);t?t[1]=r:this.a.push([e,r])},"delete":function(e){var r=arrayFindIndex(this.a,function(r){return r[0]===e});return~r&&this.a.splice(r,1),!!~r}},module.exports={getConstructor:function(e,r,t,n){var i=e(function(e,a){anInstance(e,i,r,"_i"),e._i=id++,e._l=void 0,void 0!=a&&forOf(a,t,e[n],e)});return redefineAll(i.prototype,{"delete":function(e){if(!isObject(e))return!1;var r=getWeak(e);return r===!0?uncaughtFrozenStore(this)["delete"](e):r&&$has(r,this._i)&&delete r[this._i]},has:function(e){if(!isObject(e))return!1;var r=getWeak(e);return r===!0?uncaughtFrozenStore(this).has(e):r&&$has(r,this._i)}}),i},def:function(e,r,t){var n=getWeak(anObject(r),!0);return n===!0?uncaughtFrozenStore(e).set(r,t):n[e._i]=t,e},ufstore:uncaughtFrozenStore};

/***/ },

/***/ "./src/getFocusPath.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function isInRange(e,t){return t>=e[0]&&t<=e[1]}function nodeToRange(e,t){var r=e.nodeToRange(t);if(r)return r;if(t.length>0){var n=t[0]&&e.nodeToRange(t[0]),o=t[t.length-1]&&e.nodeToRange(t[t.length-1]);if(n&&o)return[n[0],o[1]]}}function getFocusPath(e,t,r){var n=arguments.length<=3||void 0===arguments[3]?new _set2["default"]:arguments[3];n.add(e);var o=[],a=nodeToRange(r,e);if(a){if(!isInRange(a,t))return[];o.push(e)}var u=!0,i=!1,f=void 0;try{for(var l,d=(0,_getIterator3["default"])(r.forEachProperty(e));!(u=(l=d.next()).done);u=!0){var g=l.value.value;if(g&&"object"===("undefined"==typeof g?"undefined":(0,_typeof3["default"])(g))&&!n.has(g)){var s=getFocusPath(g,t,r,n);if(s.length>0){o=o.concat(s);break}}}}catch(_){i=!0,f=_}finally{try{!u&&d["return"]&&d["return"]()}finally{if(i)throw f}}return o}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2),_getIterator2=__webpack_require__("./node_modules/babel-runtime/core-js/get-iterator.js"),_getIterator3=_interopRequireDefault(_getIterator2),_set=__webpack_require__("./node_modules/babel-runtime/core-js/set.js"),_set2=_interopRequireDefault(_set);exports.nodeToRange=nodeToRange,exports["default"]=getFocusPath;

/***/ },

/***/ "./src/utils/stringify.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function stringify(e){switch("undefined"==typeof e?"undefined":(0,_typeof3["default"])(e)){case"function":return e.toString().match(/function[^(]*\([^)]*\)/)[0];case"object":return e?(0,_stringify2["default"])(e,stringify):"null";case"undefined":return"undefined";case"number":return global.isNaN(e)?"NaN":e;default:return(0,_stringify2["default"])(e)}}Object.defineProperty(exports,"__esModule",{value:!0});var _stringify=__webpack_require__("./node_modules/babel-runtime/core-js/json/stringify.js"),_stringify2=_interopRequireDefault(_stringify),_typeof2=__webpack_require__("./node_modules/babel-runtime/helpers/typeof.js"),_typeof3=_interopRequireDefault(_typeof2);exports["default"]=stringify;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./src/components/visualization/css/tree.css":
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ "./src/containers/CodeEditorContainer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function mapStateToProps(e){return{defaultValue:(0,_selectors.defaultValue)(e),mode:e.parser.category.id,error:e.parseError}}function mapDispatchToProps(e){return{onContentChange:function(r){var t=r.value,o=r.cursor;e((0,_actions.setWorkbenchState)({code:t,cursor:o}))},onActivity:function(r){e((0,_actions.setWorkbenchState)({cursor:r}))}}}Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_actions=__webpack_require__("./src/store/actions.js"),_Editor=__webpack_require__("./src/Editor.js"),_Editor2=_interopRequireDefault(_Editor),_selectors=__webpack_require__("./src/store/selectors.js");exports["default"]=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(_Editor2["default"]);

/***/ },

/***/ "./src/Editor.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _slicedToArray2=__webpack_require__("./node_modules/babel-runtime/helpers/slicedToArray.js"),_slicedToArray3=_interopRequireDefault(_slicedToArray2),_getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_codemirror=__webpack_require__("./node_modules/codemirror/lib/codemirror.js"),_codemirror2=_interopRequireDefault(_codemirror),_pubsubJs=__webpack_require__("./node_modules/pubsub-js/src/pubsub.js"),_pubsubJs2=_interopRequireDefault(_pubsubJs),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),Editor=function(e){function r(){return(0,_classCallCheck3["default"])(this,r),(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(r).apply(this,arguments))}return(0,_inherits3["default"])(r,e),(0,_createClass3["default"])(r,[{key:"getValue",value:function(){return this.codeMirror&&this.codeMirror.getValue()}},{key:"_getErrorLine",value:function(e){return e.loc?e.loc.line:e.lineNumber||e.line}},{key:"_setError",value:function(e){if(this.codeMirror){var r=this.props.error;if(r){var t=this._getErrorLine(r);t&&this.codeMirror.removeLineClass(t-1,"text","errorMarker")}if(e){var o=this._getErrorLine(e);o&&this.codeMirror.addLineClass(o-1,"text","errorMarker")}}}},{key:"componentWillReceiveProps",value:function(e){e.defaultValue!==this.props.defaultValue&&this.codeMirror.setValue(e.defaultValue),e.mode!==this.props.mode&&this.codeMirror.setOption("mode",e.mode),this._setError(e.error)}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"_posFromIndex",value:function(e,r){return(this.props.posFromIndex?this.props:e).posFromIndex(r)}},{key:"componentDidMount",value:function(){var e=this;this._CMHandlers=[],this._subscriptions=[],this.codeMirror=(0,_codemirror2["default"])(this.refs.container,{value:this.props.defaultValue,mode:this.props.mode,lineNumbers:this.props.lineNumbers,readOnly:this.props.readOnly}),this._bindCMHandler("changes",function(){clearTimeout(e._updateTimer),e._updateTimer=setTimeout(e._onContentChange.bind(e),200)}),this._bindCMHandler("cursorActivity",function(){clearTimeout(e._updateTimer),e._updateTimer=setTimeout(e._onActivity.bind(e,!0),100)}),this._subscriptions.push(_pubsubJs2["default"].subscribe("PANEL_RESIZE",function(){e.codeMirror&&e.codeMirror.refresh()})),this.props.highlight&&(this._markerRange=null,this._mark=null,this._subscriptions.push(_pubsubJs2["default"].subscribe("HIGHLIGHT",function(r,t){var o=t.range;if(o){var i=e.codeMirror.getDoc();e._markerRange=o,e._mark&&e._mark.clear();var s=o.map(function(r){return e._posFromIndex(i,r)}),n=(0,_slicedToArray3["default"])(s,2),u=n[0],a=n[1];return u&&a?void(e._mark=e.codeMirror.markText(u,a,{className:"marked"})):void(e._markerRange=e._mark=null)}}),_pubsubJs2["default"].subscribe("CLEAR_HIGHLIGHT",function(r){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=t.range;(!o||e._markerRange&&o[0]===e._markerRange[0]&&o[1]===e._markerRange[1])&&(e._markerRange=null,e._mark&&(e._mark.clear(),e._mark=null))}))),this.props.error&&this._setError(this.props.error)}},{key:"componentWillUnmount",value:function(){clearTimeout(this._updateTimer),this._unbindHandlers(),this._markerRange=null,this._mark=null;var e=this.refs.container;e.removeChild(e.children[0]),this.codeMirror=null}},{key:"_bindCMHandler",value:function(e,r){this._CMHandlers.push(e,r),this.codeMirror.on(e,r)}},{key:"_unbindHandlers",value:function(){for(var e=this._CMHandlers,r=0;r<e.length;r+=2)this.codeMirror.off(e[r],e[r+1]);this._subscriptions.forEach(function(e){_pubsubJs2["default"].unsubscribe(e)})}},{key:"_onContentChange",value:function(e){var r=this.codeMirror.getDoc(),t={value:r.getValue()};e&&(t.cursor=r.indexFromPos(r.getCursor())),this.props.onContentChange(t)}},{key:"_onActivity",value:function(){this.props.onActivity(this.codeMirror.getDoc().indexFromPos(this.codeMirror.getCursor()))}},{key:"render",value:function(){return _react2["default"].createElement("div",{className:"editor",ref:"container"})}}]),r}(_react2["default"].Component);exports["default"]=Editor,Editor.propTypes={defaultValue:_react2["default"].PropTypes.string,highlight:_react2["default"].PropTypes.bool,lineNumbers:_react2["default"].PropTypes.bool,readOnly:_react2["default"].PropTypes.bool,onContentChange:_react2["default"].PropTypes.func,onActivity:_react2["default"].PropTypes.func,posFromIndex:_react2["default"].PropTypes.func,error:_react2["default"].PropTypes.object,mode:_react2["default"].PropTypes.string},Editor.defaultProps={highlight:!0,lineNumbers:!0,readOnly:!1,mode:"javascript",onContentChange:function(){},onActivity:function(){}};

/***/ },

/***/ "./src/store/selectors.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function getParser(e){return e.parser}function getSnippet(e){return e.selectedSnippet}function getCode(e){return e.code}function getRevision(e){return e.selectedRevision}function getCodeExample(e){return e.parser.category.codeExample}function getDroppedText(e){return e.droppedText}function getTransformExample(e){return e.transform.transformer?e.transform.transformer.defaultTransform:""}function getTransformCode(e){return e.transform.code}function showTransformer(e){return e.transform.showTransformer}Object.defineProperty(exports,"__esModule",{value:!0}),exports.canSave=exports.canSaveTransform=exports.canSaveCode=exports.defaultTransformCode=exports.defaultValue=exports.canFork=void 0;var _reselect=__webpack_require__("./node_modules/reselect/lib/index.js"),canFork=exports.canFork=(0,_reselect.createSelector)([getSnippet],function(e){return!!e}),defaultValue=(0,_reselect.createSelector)([getRevision,getCodeExample,getDroppedText,getParser],function(e,r,t,o){return e?e.get("code")||o.category.codeExample:null!=t?t:r});exports.defaultValue=defaultValue;var defaultTransformCode=(0,_reselect.createSelector)([getRevision,getTransformExample],function(e,r){return e?e.get("transform")||r:r});exports.defaultTransformCode=defaultTransformCode;var canSaveCode=exports.canSaveCode=(0,_reselect.createSelector)([defaultValue,getCode],function(e,r){return e!==r}),canSaveTransform=exports.canSaveTransform=(0,_reselect.createSelector)([showTransformer,defaultTransformCode,getTransformCode],function(e,r,t){return e&&r!==t}),canSave=exports.canSave=(0,_reselect.createSelector)([canSaveCode,canSaveTransform],function(e,r){return e||r});

/***/ },

/***/ "./node_modules/reselect/lib/index.js":
/***/ function(module, exports) {

	"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var r=0,t=Array(e.length);r<e.length;r++)t[r]=e[r];return t}return Array.from(e)}function defaultEqualityCheck(e,r){return e===r}function defaultMemoize(e){var r=arguments.length<=1||void 0===arguments[1]?defaultEqualityCheck:arguments[1],t=null,n=null;return function(){for(var o=arguments.length,c=Array(o),a=0;a<o;a++)c[a]=arguments[a];return null!==t&&t.length===c.length&&c.every(function(e,n){return r(e,t[n])})?n:(n=e.apply(void 0,c),t=c,n)}}function getDependencies(e){var r=Array.isArray(e[0])?e[0]:e;if(!r.every(function(e){return"function"==typeof e})){var t=r.map(function(e){return typeof e}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, "+("instead received the following types: ["+t+"]"))}return r}function createSelectorCreator(e){for(var r=arguments.length,t=Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];return function(){for(var r=arguments.length,n=Array(r),o=0;o<r;o++)n[o]=arguments[o];var c=0,a=n.pop(),u=getDependencies(n),i=e.apply(void 0,[function(){return c++,a.apply(void 0,arguments)}].concat(t)),l=function(e,r){for(var t=arguments.length,n=Array(t>2?t-2:0),o=2;o<t;o++)n[o-2]=arguments[o];var c=u.map(function(t){return t.apply(void 0,[e,r].concat(n))});return i.apply(void 0,_toConsumableArray(c))};return l.resultFunc=a,l.recomputations=function(){return c},l.resetRecomputations=function(){return c=0},l}}function createSelector(){return createSelectorCreator(defaultMemoize).apply(void 0,arguments)}function createStructuredSelector(e){var r=arguments.length<=1||void 0===arguments[1]?createSelector:arguments[1];if("object"!=typeof e)throw new Error("createStructuredSelector expects first argument to be an object where each property is a selector, instead received a "+typeof e);var t=Object.keys(e);return r(t.map(function(r){return e[r]}),function(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return r.reduce(function(e,r,n){return e[t[n]]=r,e},{})})}exports.__esModule=!0,exports.defaultMemoize=defaultMemoize,exports.createSelectorCreator=createSelectorCreator,exports.createSelector=createSelector,exports.createStructuredSelector=createStructuredSelector;

/***/ },

/***/ "./src/containers/ErrorMessageContainer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function mapStateToProps(e){return{error:e.error}}function mapDispatchToProps(e){return{onWantToClose:function(){return e((0,_actions.setError)(null))}}}Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_ErrorMessage=__webpack_require__("./src/ErrorMessage.js"),_ErrorMessage2=_interopRequireDefault(_ErrorMessage),_actions=__webpack_require__("./src/store/actions.js");exports["default"]=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(_ErrorMessage2["default"]);

/***/ },

/***/ "./src/ErrorMessage.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),ErrorMessage=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).apply(this,arguments))}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"render",value:function(){return this.props.error?_react2["default"].createElement("div",{className:"cover"},_react2["default"].createElement("div",{className:"errorMessage"},_react2["default"].createElement("h3",null,_react2["default"].createElement("i",{className:"fa fa-exclamation-triangle"})," ","Error"),_react2["default"].createElement("div",null,this.props.error.message),_react2["default"].createElement("div",{style:{marginTop:15}},_react2["default"].createElement("button",{type:"button",onClick:this.props.onWantToClose},"OK")))):null}}]),t}(_react2["default"].Component);exports["default"]=ErrorMessage,ErrorMessage.propTypes={error:_react2["default"].PropTypes.object,onWantToClose:_react2["default"].PropTypes.func};

/***/ },

/***/ "./src/containers/LoadingIndicatorContainer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function mapStateToProps(e){return{visible:e.loadingSnippet}}Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_LoadingIndicator=__webpack_require__("./src/LoadingIndicator.js"),_LoadingIndicator2=_interopRequireDefault(_LoadingIndicator);exports["default"]=(0,_reactRedux.connect)(mapStateToProps)(_LoadingIndicator2["default"]);

/***/ },

/***/ "./src/LoadingIndicator.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function LoadingIndicator(e){return _react2["default"].createElement("div",{className:"loadingIndicator cover",style:{display:e.visible?"flex":"none"}},_react2["default"].createElement("div",null,_react2["default"].createElement("i",{className:"fa fa-lg fa-circle-o-notch fa-spin"})))}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=LoadingIndicator;var _react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react);LoadingIndicator.propTypes={visible:_react2["default"].PropTypes.bool};

/***/ },

/***/ "./src/containers/PasteDropTargetContainer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function mapDispatchToProps(e){return{onText:function(r,t,o,a){e((0,_actions.dropText)(o,a))},onError:function(r){return e((0,_actions.setError)(r))}}}Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_PasteDropTarget=__webpack_require__("./src/PasteDropTarget.js"),_PasteDropTarget2=_interopRequireDefault(_PasteDropTarget),_actions=__webpack_require__("./src/store/actions.js");exports["default"]=(0,_reactRedux.connect)(null,mapDispatchToProps)(_PasteDropTarget2["default"]);

/***/ },

/***/ "./src/PasteDropTarget.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function importEscodegen(){return new _promise2["default"](function(e){return __webpack_require__.e/* require */(27, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/escodegen/escodegen.js")]; (e.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this))})}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_objectWithoutProperties2=__webpack_require__("./node_modules/babel-runtime/helpers/objectWithoutProperties.js"),_objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2),_slicedToArray2=__webpack_require__("./node_modules/babel-runtime/helpers/slicedToArray.js"),_slicedToArray3=_interopRequireDefault(_slicedToArray2),_getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_map=__webpack_require__("./node_modules/babel-runtime/core-js/map.js"),_map2=_interopRequireDefault(_map),_promise=__webpack_require__("./node_modules/babel-runtime/core-js/promise.js"),_promise2=_interopRequireDefault(_promise),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_parsers=__webpack_require__("./src/parsers/index.js"),acceptedFileTypes=new _map2["default"]([["application/json","JSON"],["text/plain","TEXT"]]);_parsers.categories.forEach(function(e){var t=e.id,r=e.mimeTypes;r.forEach(function(e){acceptedFileTypes.set(e,t)})});var PasteDropTarget=function(e){function t(e){(0,_classCallCheck3["default"])(this,t);var r=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,e));return r.state={dragging:!1},r}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"_onASTError",value:function(e,t,r){throw this.props.onError(e,t,"Cannot process pasted AST: "+r.message),r}},{key:"componentDidMount",value:function(){var e=this;this._listeners=[];var t=this.refs.container;this._bindListener(document,"paste",function(t){if(t.clipboardData){var r=t.clipboardData;!r.types.indexOf||!r.types.indexOf("text/plain")>-1||(t.stopPropagation(),t.preventDefault(),e._jsonToCode(r.getData("text/plain")).then(function(r){return e.props.onText("paste",t,r)},function(r){"TEXTAREA"!==t.target.nodeName&&e._onASTError("paste",t,r)}))}},!0);var r=void 0;this._bindListener(t,"dragenter",function(t){clearTimeout(r),t.preventDefault(),e.setState({dragging:!0})},!0),this._bindListener(t,"dragover",function(e){clearTimeout(r),e.preventDefault(),e.dataTransfer.dropEffect="copy"},!0),this._bindListener(t,"drop",function(t){e.setState({dragging:!1});var r=t.dataTransfer.files[0],n=acceptedFileTypes.get(r.type);if(n&&e.props.onText){t.preventDefault(),t.stopPropagation();var i=new FileReader;i.onload=function(t){var r=t.target.result;"JSON"!==n&&"TEXT"!==n||(r=e._jsonToCode(r).then(function(e){return n="javascript",e},function(i){return"JSON"!==n?(n=void 0,r):void e._onASTError("drop",t,i)})),_promise2["default"].resolve(r).then(function(r){e.props.onText("drop",t,r,n)})},i.readAsText(r)}},!0),this._bindListener(t,"dragleave",function(){clearTimeout(r),r=setTimeout(function(){return e.setState({dragging:!1})},50)},!0)}},{key:"componentWillUnmount",value:function(){for(var e=0;e<this._listeners.length;e+=4){var t=(0,_slicedToArray3["default"])(this._listeners[e],4),r=t[0],n=t[1],i=t[2],o=t[3];r.removeEventListener(n,i,o)}this._listeners=null}},{key:"_jsonToCode",value:function(e){var t=void 0;try{t=JSON.parse(e)}catch(r){return _promise2["default"].resolve(e)}return importEscodegen().then(function(e){return e.generate(t,{format:{indent:{style:"  "}}})})}},{key:"_bindListener",value:function(e,t,r,n){var i=this;t.split(/\s+/).forEach(function(t){e.addEventListener(t,r,n),i._listeners.push(e,r,n)})}},{key:"render",value:function(){var e=this.props,t=e.children,r=(0,_objectWithoutProperties3["default"])(e,["children"]),n=this.state.dragging?_react2["default"].createElement("div",{className:"dropIndicator"},_react2["default"].createElement("div",null,"Drop the code or (JSON-encoded) AST file here")):null;return _react2["default"].createElement("div",(0,_extends3["default"])({ref:"container"},r),n,t)}}]),t}(_react2["default"].Component);exports["default"]=PasteDropTarget,PasteDropTarget.propTypes={onText:_react2["default"].PropTypes.func,onError:_react2["default"].PropTypes.func,children:_react2["default"].PropTypes.node};

/***/ },

/***/ "./node_modules/babel-runtime/helpers/objectWithoutProperties.js":
/***/ function(module, exports) {

	"use strict";exports.__esModule=!0,exports["default"]=function(e,r){var t={};for(var o in e)r.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t};

/***/ },

/***/ "./node_modules/babel-runtime/core-js/map.js":
/***/ function(module, exports, __webpack_require__) {

	module.exports={"default":__webpack_require__("./node_modules/core-js/library/fn/map.js"),__esModule:!0};

/***/ },

/***/ "./node_modules/core-js/library/fn/map.js":
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__("./node_modules/core-js/library/modules/es6.object.to-string.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.string.iterator.js"),__webpack_require__("./node_modules/core-js/library/modules/web.dom.iterable.js"),__webpack_require__("./node_modules/core-js/library/modules/es6.map.js"),__webpack_require__("./node_modules/core-js/library/modules/es7.map.to-json.js"),module.exports=__webpack_require__("./node_modules/core-js/library/modules/_core.js").Map;

/***/ },

/***/ "./node_modules/core-js/library/modules/es6.map.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";var strong=__webpack_require__("./node_modules/core-js/library/modules/_collection-strong.js");module.exports=__webpack_require__("./node_modules/core-js/library/modules/_collection.js")("Map",function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var r=strong.getEntry(this,t);return r&&r.v},set:function(t,r){return strong.def(this,0===t?0:t,r)}},strong,!0);

/***/ },

/***/ "./node_modules/core-js/library/modules/es7.map.to-json.js":
/***/ function(module, exports, __webpack_require__) {

	var $export=__webpack_require__("./node_modules/core-js/library/modules/_export.js");$export($export.P+$export.R,"Map",{toJSON:__webpack_require__("./node_modules/core-js/library/modules/_collection-to-json.js")("Map")});

/***/ },

/***/ "./src/containers/SettingsDialogContainer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t["default"]=e,t}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function mapStateToProps(e){return{visible:e.showSettingsDialog,parser:e.parser,parserSettings:e.parserSettings}}function mapDispatchToProps(e){return{onSave:function(t,r){LocalStorage.setParserSettings(t.id,r),e((0,_actions.setParserSettings)(r))},onWantToClose:function(){return e((0,_actions.closeSettingsDialog)())}}}Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_actions=__webpack_require__("./src/store/actions.js"),_SettingsDialog=__webpack_require__("./src/SettingsDialog.js"),_SettingsDialog2=_interopRequireDefault(_SettingsDialog),_LocalStorage=__webpack_require__("./src/LocalStorage.js"),LocalStorage=_interopRequireWildcard(_LocalStorage);exports["default"]=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(_SettingsDialog2["default"]);

/***/ },

/***/ "./src/SettingsDialog.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),SettingsDialog=function(e){function t(e){(0,_classCallCheck3["default"])(this,t);var r=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,e));return r._outerClick=r._outerClick.bind(r),r._onChange=r._onChange.bind(r),r._reset=r._reset.bind(r),r._saveAndClose=r._saveAndClose.bind(r),r.state={parserSettings:r.props.parserSettings},r}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({parserSettings:e.parserSettings})}},{key:"_outerClick",value:function(e){e.target===document.getElementById("SettingsDialog")&&this._saveAndClose()}},{key:"_onChange",value:function(e){this.setState({parserSettings:e})}},{key:"_saveAndClose",value:function(){this.props.onSave(this.props.parser,this.state.parserSettings),this.props.onWantToClose()}},{key:"_reset",value:function(){this.setState({parserSettings:{}})}},{key:"render",value:function(){return this.props.visible&&this.props.parser.renderSettings?_react2["default"].createElement("div",{id:"SettingsDialog",onClick:this._outerClick},_react2["default"].createElement("div",{className:"inner"},_react2["default"].createElement("div",{className:"header"},_react2["default"].createElement("h3",null,this.props.parser.displayName," Settings")),_react2["default"].createElement("div",{className:"body"},this.props.parser.renderSettings(this.state.parserSettings,this._onChange)),_react2["default"].createElement("div",{className:"footer"},_react2["default"].createElement("button",{style:{marginRight:10},onClick:this._reset},"Reset"),_react2["default"].createElement("button",{onClick:this._saveAndClose},"Close")))):null}}]),t}(_react2["default"].Component);exports["default"]=SettingsDialog,SettingsDialog.propTypes={onSave:_react2["default"].PropTypes.func,onWantToClose:_react2["default"].PropTypes.func,visible:_react2["default"].PropTypes.bool,parser:_react2["default"].PropTypes.object.isRequired,parserSettings:_react2["default"].PropTypes.object};

/***/ },

/***/ "./src/SplitPane.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _extends2=__webpack_require__("./node_modules/babel-runtime/helpers/extends.js"),_extends3=_interopRequireDefault(_extends2),_getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),baseStyleHorizontal={position:"absolute",top:0,bottom:0,boxSizing:"border-box"},baseStyleVertical={position:"absolute",left:0,right:0,boxSizing:"border-box"},SplitPane=function(e){function t(e,r){(0,_classCallCheck3["default"])(this,t);var o=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,e,r));return o._onMouseDown=o._onMouseDown.bind(o),o.state={dividerPosition:50},o}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"_onMouseDown",value:function(){var e=this,t=this.props.vertical,r=t?global.innerHeight:global.innerWidth;global.document.body.style.cursor=t?"row-resize":"col-resize";var o=function(o){o.preventDefault(),e.setState({dividerPosition:(t?o.pageY:o.pageX)/r*100})},i=function s(){document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",s),global.document.body.style.cursor="",e.props.onResize&&e.props.onResize()};document.addEventListener("mousemove",o),document.addEventListener("mouseup",i)}},{key:"render",value:function(){var e=this.props.children,t=this.state.dividerPosition,r=void 0,o=void 0,i=void 0;return Array.isArray(e)&&2===e.filter(function(e){return e}).length?(this.props.vertical?(r=(0,_extends3["default"])({},baseStyleVertical,{top:0,height:t+"%",paddingBottom:3}),o=(0,_extends3["default"])({},baseStyleVertical,{bottom:0,height:100-t+"%",paddingTop:3}),i=(0,_extends3["default"])({},baseStyleVertical,{top:t+"%",height:5,marginTop:-2.5,zIndex:100})):(r=(0,_extends3["default"])({},baseStyleHorizontal,{left:0,width:t+"%",paddingRight:3}),o=(0,_extends3["default"])({},baseStyleHorizontal,{right:0,width:100-t+"%",paddingLeft:3}),i=(0,_extends3["default"])({},baseStyleHorizontal,{left:t+"%",width:5,marginLeft:-2.5,zIndex:100})),_react2["default"].createElement("div",{className:this.props.className},_react2["default"].createElement("div",{style:r},this.props.children[0]),_react2["default"].createElement("div",{className:"splitpane-divider"+(this.props.vertical?" vertical":""),onMouseDown:this._onMouseDown,style:i}),_react2["default"].createElement("div",{style:o},this.props.children[1]))):_react2["default"].createElement("div",{className:this.props.className},_react2["default"].createElement("div",{style:{position:"absolute",top:0,bottom:0,left:0,right:0}},this.props.children))}}]),t}(_react2["default"].Component);exports["default"]=SplitPane,SplitPane.propTypes={vertical:_react2["default"].PropTypes.bool,className:_react2["default"].PropTypes.string,children:_react2["default"].PropTypes.node,onResize:_react2["default"].PropTypes.func};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ "./src/containers/ToolbarContainer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(r){if(r&&r.__esModule)return r;var e={};if(null!=r)for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);return e["default"]=r,e}function _interopRequireDefault(r){return r&&r.__esModule?r:{"default":r}}function mapStateToProps(r){var e=r.parser,o=r.transform,t=o.transformer,a=o.showTransformer;return{forking:r.forking,saving:r.saving,canSave:(0,_selectors.canSave)(r),canFork:(0,_selectors.canFork)(r),category:e.category,parser:e,transformer:t,showTransformer:a}}function mapDispatchToProps(r){return{onParserChange:function(e){LocalStorage.setParser(e),r((0,_actions.setWorkbenchState)({parser:e,parserSettings:LocalStorage.getParserSettings(e.id)||{}}))},onCategoryChange:function(e){LocalStorage.setCategory(e.id),r((0,_actions.selectCategory)(e))},onParserSettingsButtonClick:function(){return r((0,_actions.openSettingsDialog)())},onTransformChange:function(e){return r(e?(0,_actions.selectTransformer)(e):(0,_actions.hideTransformer)())},onSave:function(){return r((0,_actions.save)(!1))},onFork:function(){return r((0,_actions.save)(!0))}}}Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_actions=__webpack_require__("./src/store/actions.js"),_Toolbar=__webpack_require__("./src/Toolbar.js"),_Toolbar2=_interopRequireDefault(_Toolbar),_selectors=__webpack_require__("./src/store/selectors.js"),_LocalStorage=__webpack_require__("./src/LocalStorage.js"),LocalStorage=_interopRequireWildcard(_LocalStorage);exports["default"]=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(_Toolbar2["default"]);

/***/ },

/***/ "./src/Toolbar.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function Toolbar(e){var a=e.parser,t=e.transformer,r=e.showTransformer,o=a.id,n="";return a&&(a.version&&(o+="-"+a.version),a.homepage&&(o=_react2["default"].createElement("a",{href:a.homepage,target:"_blank"},o))),r&&(n=t.displayName,t.version&&(n+="-"+t.version),t.homepage&&(n=_react2["default"].createElement("a",{href:t.homepage,target:"_blank"},n)),n=_react2["default"].createElement("span",null,"Transformer: ",n)),_react2["default"].createElement("div",{id:"Toolbar"},_react2["default"].createElement("h1",null,"AST Explorer"),_react2["default"].createElement("button",{type:"button",disabled:!e.canSave||e.saving||e.forking,onClick:e.onSave},_react2["default"].createElement("i",{className:(0,_classnames2["default"])({fa:!0,"fa-spinner":e.saving,"fa-floppy-o":!e.saving,"fa-lg":!0,"fa-fw":!0})}),"Save"),_react2["default"].createElement("button",{type:"button",disabled:!e.canFork||e.saving||e.forking,onClick:e.onFork},_react2["default"].createElement("i",{className:(0,_classnames2["default"])({fa:!0,"fa-spinner":e.forking,"fa-code-fork":!e.forking,"fa-lg":!0,"fa-fw":!0})}),"Fork"),_react2["default"].createElement(_CategoryButton2["default"],e),_react2["default"].createElement(_ParserButton2["default"],e),_react2["default"].createElement(_TransformButton2["default"],e),_react2["default"].createElement("a",{style:{minWidth:0},target:"_blank",title:"Help",href:"https://github.com/fkling/esprima_ast_explorer#features"},_react2["default"].createElement("i",{className:"fa fa-lg fa-question fa-fw"})),_react2["default"].createElement("div",{id:"info",className:n?"small":""},"Parser: ",o,_react2["default"].createElement("br",null),n))}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=Toolbar;var _react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_classnames=__webpack_require__("./node_modules/classnames/index.js"),_classnames2=_interopRequireDefault(_classnames),_CategoryButton=__webpack_require__("./src/CategoryButton.js"),_CategoryButton2=_interopRequireDefault(_CategoryButton),_ParserButton=__webpack_require__("./src/ParserButton.js"),_ParserButton2=_interopRequireDefault(_ParserButton),_TransformButton=__webpack_require__("./src/TransformButton.js"),_TransformButton2=_interopRequireDefault(_TransformButton);Toolbar.propTypes={saving:_react2["default"].PropTypes.bool,forking:_react2["default"].PropTypes.bool,onSave:_react2["default"].PropTypes.func,onFork:_react2["default"].PropTypes.func,onParserChange:_react2["default"].PropTypes.func,onParserSettingsButtonClick:_react2["default"].PropTypes.func,onTransformChange:_react2["default"].PropTypes.func,parser:_react2["default"].PropTypes.object,transformer:_react2["default"].PropTypes.object,showTransformer:_react2["default"].PropTypes.bool,canSave:_react2["default"].PropTypes.bool,canFork:_react2["default"].PropTypes.bool};

/***/ },

/***/ "./src/CategoryButton.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_classnames=__webpack_require__("./node_modules/classnames/index.js"),_classnames2=_interopRequireDefault(_classnames),_parsers=__webpack_require__("./src/parsers/index.js"),categoryIcon={javascript:"fa-jsfiddle",css:"fa-css3",htmlmixed:"fa-html5",webidl:"fa-th-list"},CategoryButton=function(e){function t(e){(0,_classCallCheck3["default"])(this,t);var r=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,e));return r._onClick=r._onClick.bind(r),r}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"_onClick",value:function(e){var t=e.currentTarget,r=t.getAttribute("data-id");this.props.onCategoryChange((0,_parsers.getCategoryByID)(r))}},{key:"render",value:function(){var e=this;return _react2["default"].createElement("div",{className:"button menuButton categoryButton"},_react2["default"].createElement("button",{type:"button"},_react2["default"].createElement("i",{className:(0,_classnames2["default"])(categoryIcon[this.props.category.id]||"fa-file-o",{fa:!0,"fa-lg":!0,"fa-fw":!0})})," ",this.props.category.displayName),_react2["default"].createElement("ul",null,_parsers.categories.map(function(t){return _react2["default"].createElement("li",{key:t.id,onClick:e._onClick,"data-id":t.id},_react2["default"].createElement("button",{type:"button"},_react2["default"].createElement("i",{className:(0,_classnames2["default"])(categoryIcon[t.id]||"fa-file-o",{fa:!0,"fa-lg":!0,"fa-fw":!0})})," ",t.displayName))})))}}]),t}(_react2["default"].Component);exports["default"]=CategoryButton,CategoryButton.propTypes={onCategoryChange:_react2["default"].PropTypes.func.isRequired,category:_react2["default"].PropTypes.object.isRequired};

/***/ },

/***/ "./src/ParserButton.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_parsers=__webpack_require__("./src/parsers/index.js"),ParserButton=function(e){function t(e){(0,_classCallCheck3["default"])(this,t);var r=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(t).call(this,e));return r._onClick=r._onClick.bind(r),r}return(0,_inherits3["default"])(t,e),(0,_createClass3["default"])(t,[{key:"_onClick",value:function(e){var t=e.currentTarget,r=t.getAttribute("data-id");this.props.onParserChange((0,_parsers.getParserByID)(r))}},{key:"render",value:function(){var e=this;return _react2["default"].createElement("div",{className:"button"},_react2["default"].createElement("div",{className:"menuButton",style:{display:"inline-block"}},_react2["default"].createElement("button",{type:"button"},_react2["default"].createElement("i",{className:"fa fa-lg fa-code fa-fw"})," ",this.props.parser.displayName),_react2["default"].createElement("ul",null,this.props.category.parsers.map(function(t){return _react2["default"].createElement("li",{key:t.id,onClick:e._onClick,"data-id":t.id},_react2["default"].createElement("button",{type:"button"},t.displayName))}))),_react2["default"].createElement("button",{type:"button",title:"Parser Settings",style:{minWidth:0},disabled:!this.props.parser.renderSettings,onClick:this.props.onParserSettingsButtonClick},_react2["default"].createElement("i",{className:"fa fa-cog fa-fw"})))}}]),t}(_react2["default"].Component);exports["default"]=ParserButton,ParserButton.propTypes={onParserChange:_react2["default"].PropTypes.func,onParserSettingsButtonClick:_react2["default"].PropTypes.func,parser:_react2["default"].PropTypes.object,category:_react2["default"].PropTypes.object};

/***/ },

/***/ "./src/TransformButton.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_classnames=__webpack_require__("./node_modules/classnames/index.js"),_classnames2=_interopRequireDefault(_classnames),_parsers=__webpack_require__("./src/parsers/index.js"),TransformButton=function(e){function r(e){(0,_classCallCheck3["default"])(this,r);var t=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(r).call(this,e));return t._onClick=t._onClick.bind(t),t._onToggle=t._onToggle.bind(t),t}return(0,_inherits3["default"])(r,e),(0,_createClass3["default"])(r,[{key:"_onClick",value:function(e){var r=e.target,t=void 0;t="li"===r.nodeName.toLowerCase()?r.children[0].value:r.value,this.props.onTransformChange((0,_parsers.getTransformerByID)(t))}},{key:"_onToggle",value:function(){this.props.transformer&&this.props.onTransformChange(null)}},{key:"render",value:function(){var e=this;return _react2["default"].createElement("div",{className:(0,_classnames2["default"])({button:!0,menuButton:!0,disabled:!this.props.category.transformers.length})},_react2["default"].createElement("button",{type:"button",onClick:this._onToggle,disabled:!this.props.category.transformers.length},_react2["default"].createElement("i",{className:(0,_classnames2["default"])({fa:!0,"fa-lg":!0,"fa-toggle-off":!this.props.showTransformer,"fa-toggle-on":this.props.showTransformer,"fa-fw":!0})})," Transform"),!!this.props.category.transformers.length&&_react2["default"].createElement("ul",null,this.props.category.transformers.map(function(r){return _react2["default"].createElement("li",{key:r.id,className:(0,_classnames2["default"])({selected:e.props.showTransformer&&e.props.transformer===r}),onClick:e._onClick},_react2["default"].createElement("button",{value:r.id,type:"button"},r.displayName))})))}}]),r}(_react2["default"].Component);exports["default"]=TransformButton,TransformButton.propTypes={category:_react2["default"].PropTypes.object,transformer:_react2["default"].PropTypes.object,showTransformer:_react2["default"].PropTypes.bool,onTransformChange:_react2["default"].PropTypes.func};

/***/ },

/***/ "./src/containers/TransformerContainer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(r){return r&&r.__esModule?r:{"default":r}}function mapStateToProps(r){return{transformer:r.transform.transformer,defaultTransformCode:(0,_selectors.defaultTransformCode)(r),transformCode:r.transform.code,mode:r.parser.category.id,code:r.code}}function mapDispatchToProps(r){return{onContentChange:function(e){var o=e.value,t=e.cursor;r((0,_actions.setTransformState)({code:o,cursor:t}))}}}Object.defineProperty(exports,"__esModule",{value:!0});var _reactRedux=__webpack_require__("./node_modules/react-redux/lib/index.js"),_Transformer=__webpack_require__("./src/Transformer.js"),_Transformer2=_interopRequireDefault(_Transformer),_actions=__webpack_require__("./src/store/actions.js"),_selectors=__webpack_require__("./src/store/selectors.js");exports["default"]=(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(_Transformer2["default"]);

/***/ },

/***/ "./src/Transformer.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function resize(){_pubsubJs2["default"].publish("PANEL_RESIZE")}function Transformer(e){var r=_react2["default"].createElement("jscodeshift"===e.transformer.id?_JSCodeshiftEditor2["default"]:_Editor2["default"],{highlight:!1,defaultValue:e.defaultTransformCode,onContentChange:e.onContentChange});return _react2["default"].createElement(_SplitPane2["default"],{className:"splitpane",onResize:resize},r,_react2["default"].createElement(_TransformOutput2["default"],{transformer:e.transformer,transformCode:e.transformCode,code:e.code,mode:e.mode}))}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=Transformer;var _Editor=__webpack_require__("./src/Editor.js"),_Editor2=_interopRequireDefault(_Editor),_JSCodeshiftEditor=__webpack_require__("./src/JSCodeshiftEditor.js"),_JSCodeshiftEditor2=_interopRequireDefault(_JSCodeshiftEditor),_pubsubJs=__webpack_require__("./node_modules/pubsub-js/src/pubsub.js"),_pubsubJs2=_interopRequireDefault(_pubsubJs),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_SplitPane=__webpack_require__("./src/SplitPane.js"),_SplitPane2=_interopRequireDefault(_SplitPane),_TransformOutput=__webpack_require__("./src/TransformOutput.js"),_TransformOutput2=_interopRequireDefault(_TransformOutput);Transformer.propTypes={defaultTransformCode:_react2["default"].PropTypes.string,transformCode:_react2["default"].PropTypes.string,transformer:_react2["default"].PropTypes.object,code:_react2["default"].PropTypes.string,mode:_react2["default"].PropTypes.string,onContentChange:_react2["default"].PropTypes.func};

/***/ },

/***/ "./src/JSCodeshiftEditor.js":
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function loadTern(){__webpack_require__.e/* require */(28, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/codemirror/addon/hint/show-hint.js"),__webpack_require__("./node_modules/codemirror/addon/tern/tern.js"),__webpack_require__("./node_modules/acorn/dist/acorn.js")]; (function(e,r,t){global.acorn=t,__webpack_require__.e/* require */(29, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./node_modules/tern/lib/tern.js"),__webpack_require__("./node_modules/tern/plugin/doc_comment.js"),__webpack_require__("./node_modules/tern/lib/infer.js"),__webpack_require__("./src/defs/jscodeshift.json"),__webpack_require__("./node_modules/tern/defs/ecma5.json"),__webpack_require__("./node_modules/tern/defs/ecma6.json")]; (function(e,r,t,o,i,n){global.tern=e,e.registerPlugin("transformer",function(e){e.on("afterLoad",function(e){var r=e.scope.props.transformer;if(r){var o=r.getFunctionType(),i=t.cx();o.propagate(new t.IsCallee(t.cx().topScope,[i.definitions.jscodeshift.file,i.definitions.jscodeshift.apiObject],null,t.ANull))}})}),server=new _codemirror2["default"].TernServer({defs:[o,n,i],plugins:{transformer:{strong:!0}}})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_codemirror=__webpack_require__("./node_modules/codemirror/lib/codemirror.js"),_codemirror2=_interopRequireDefault(_codemirror),_pubsubJs=__webpack_require__("./node_modules/pubsub-js/src/pubsub.js"),_pubsubJs2=_interopRequireDefault(_pubsubJs),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react);__webpack_require__("./node_modules/codemirror/addon/hint/show-hint.css"),__webpack_require__("./node_modules/codemirror/addon/tern/tern.css");var server=void 0,JSCodeshiftEditor=function(e){function r(e){(0,_classCallCheck3["default"])(this,r);var t=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(r).call(this,e));return loadTern(),t}return(0,_inherits3["default"])(r,e),(0,_createClass3["default"])(r,[{key:"getValue",value:function(){return this.codeMirror&&this.codeMirror.getValue()}},{key:"_getErrorLine",value:function(e){return e.loc?e.loc.line:e.lineNumber||e.line}},{key:"_setError",value:function(e){if(this.codeMirror){var r=this.props.error;if(r){var t=this._getErrorLine(r);t&&this.codeMirror.removeLineClass(t-1,"text","errorMarker")}if(e){var o=this._getErrorLine(e);o&&this.codeMirror.addLineClass(o-1,"text","errorMarker")}}}},{key:"componentWillReceiveProps",value:function(e){e.defaultValue!==this.props.defaultValue&&this.codeMirror.setValue(e.defaultValue),e.mode!==this.props.mode&&this.codeMirror.setOption("mode",e.mode),this._setError(e.error)}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"_posFromIndex",value:function(e,r){return(this.props.posFromIndex?this.props:e).posFromIndex(r)}},{key:"componentDidMount",value:function(){var e=this;this._CMHandlers=[],this._subscriptions=[],this.codeMirror=(0,_codemirror2["default"])(this.refs.container,{value:this.props.defaultValue,mode:"javascript",lineNumbers:!0}),this.codeMirror.setOption("extraKeys",{"Ctrl-Space":function(e){return server&&server.complete(e)},"Ctrl-I":function(e){return server&&server.showType(e)},"Ctrl-O":function(e){return server&&server.showDocs(e)}}),this.props.onContentChange&&this._onContentChange(),this._bindCMHandler("changes",function(){clearTimeout(e._updateTimer),e._updateTimer=setTimeout(e._onContentChange.bind(e),200)}),this._bindCMHandler("cursorActivity",function(r){clearTimeout(e._updateTimer),e._updateTimer=setTimeout(e._onActivity.bind(e),100),server&&server.updateArgHints(r)}),this._subscriptions.push(_pubsubJs2["default"].subscribe("PANEL_RESIZE",function(){e.codeMirror&&e.codeMirror.refresh()})),this.props.error&&this._setError(this.props.error)}},{key:"componentWillUnmount",value:function(){this._unbindHandlers(),this._markerRange=null,this._mark=null;var e=this.refs.container.getDOMNode();e.removeChild(e.children[0]),this.codeMirror=null}},{key:"_bindCMHandler",value:function(e,r){this._CMHandlers.push(e,r),this.codeMirror.on(e,r)}},{key:"_unbindHandlers",value:function(){for(var e=this._CMHandlers,r=0;r<e.length;r+=2)this.codeMirror.off(e[r],e[r+1]);this._subscriptions.forEach(function(e){_pubsubJs2["default"].unsubscribe(e)})}},{key:"_onContentChange",value:function(){var e=this.codeMirror.getDoc();this.props.onContentChange({value:e.getValue(),cursor:e.indexFromPos(e.getCursor())})}},{key:"_onActivity",value:function(){this.props.onActivity(this.codeMirror.getDoc().indexFromPos(this.codeMirror.getCursor()))}},{key:"render",value:function(){return _react2["default"].createElement("div",{className:"editor",ref:"container"})}}]),r}(_react2["default"].Component);exports["default"]=JSCodeshiftEditor,JSCodeshiftEditor.propTypes={defaultValue:_react2["default"].PropTypes.string,onContentChange:_react2["default"].PropTypes.func,onActivity:_react2["default"].PropTypes.func,error:_react2["default"].PropTypes.object,mode:_react2["default"].PropTypes.string,posFromIndex:_react2["default"].PropTypes.func},JSCodeshiftEditor.defaultProps={onContentChange:function(){},onActivity:function(){}};
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

/***/ "./src/TransformOutput.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function loadJSTransformer(e){__webpack_require__.e/* require */(30, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__("./src/parsers/utils/transformJSCode.js")]; (function(r){return e(r["default"])}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));})}function transform(e,r,t){return e._promise||(e._promise=_promise2["default"].all([new _promise2["default"](e.loadTransformer),new _promise2["default"](loadJSTransformer)])),e._promise.then(function(o){var n=(0,_slicedToArray3["default"])(o,2),s=n[0],a=n[1];(0,_haltingProblem2["default"])(r);var u=Date.now();r=(0,_haltingProblem.loopProtect)(r,["(function (line) {","if (Date.now() > "+(u+5e3)+") {",'  throw new Error("Infinite loop detected on line " + line);',"}","})"].join(""));var l=e.transform(s,a(r),t);return _promise2["default"].resolve(l).then(function(e){var r=null;return"string"!=typeof e&&(r=new _sourceMapConsumer.SourceMapConsumer(e.map),e=e.code),{result:e,map:r}})})}Object.defineProperty(exports,"__esModule",{value:!0});var _getPrototypeOf=__webpack_require__("./node_modules/babel-runtime/core-js/object/get-prototype-of.js"),_getPrototypeOf2=_interopRequireDefault(_getPrototypeOf),_classCallCheck2=__webpack_require__("./node_modules/babel-runtime/helpers/classCallCheck.js"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_createClass2=__webpack_require__("./node_modules/babel-runtime/helpers/createClass.js"),_createClass3=_interopRequireDefault(_createClass2),_possibleConstructorReturn2=__webpack_require__("./node_modules/babel-runtime/helpers/possibleConstructorReturn.js"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=__webpack_require__("./node_modules/babel-runtime/helpers/inherits.js"),_inherits3=_interopRequireDefault(_inherits2),_slicedToArray2=__webpack_require__("./node_modules/babel-runtime/helpers/slicedToArray.js"),_slicedToArray3=_interopRequireDefault(_slicedToArray2),_promise=__webpack_require__("./node_modules/babel-runtime/core-js/promise.js"),_promise2=_interopRequireDefault(_promise),_Editor=__webpack_require__("./src/Editor.js"),_Editor2=_interopRequireDefault(_Editor),_react=__webpack_require__("./node_modules/react/react.js"),_react2=_interopRequireDefault(_react),_haltingProblem=__webpack_require__("./node_modules/halting-problem/index.js"),_haltingProblem2=_interopRequireDefault(_haltingProblem),_sourceMapConsumer=__webpack_require__("./node_modules/source-map/lib/source-map-consumer.js"),TransformOutput=function(e){function r(e){(0,_classCallCheck3["default"])(this,r);var t=(0,_possibleConstructorReturn3["default"])(this,(0,_getPrototypeOf2["default"])(r).call(this,e));return t.state={result:"",map:null,error:null},t._posFromIndex=t._posFromIndex.bind(t),t}return(0,_inherits3["default"])(r,e),(0,_createClass3["default"])(r,[{key:"componentDidMount",value:function(){var e=this;transform(this.props.transformer,this.props.transformCode,this.props.code).then(function(r){var t=r.result,o=r.map;return e.setState({result:t,map:o})},function(r){return e.setState({error:r})})}},{key:"componentWillReceiveProps",value:function(e){var r=this;this.props.transformCode===e.transformCode&&this.props.code===e.code||(console.clear&&console.clear(),transform(e.transformer,e.transformCode,e.code).then(function(e){var r=e.result,t=e.map;return{result:r,map:t,error:null}},function(e){return console.error(e),{error:e}}).then(function(e){return r.setState(e)}))}},{key:"shouldComponentUpdate",value:function(e,r){return this.state.result!==r.result||this.state.error!==r.error}},{key:"_posFromIndex",value:function(e){var r=this.state.map;if(r){var t=r.sourcesContent[0];if(0===e)return{line:0,ch:0};for(var o=t.lastIndexOf("\n",e-1),n=e-o-1,s=1;o>0;)o=t.lastIndexOf("\n",o-1),s++;0===o&&s++;var a=r.generatedPositionFor({line:s,column:n,source:r.sources[0]});if(s=a.line,n=a.column,null!==s&&null!==n)return{line:s-1,ch:n}}}},{key:"render",value:function(){return _react2["default"].createElement("div",{className:"output highlight"},this.state.error?_react2["default"].createElement(_Editor2["default"],{highlight:!1,key:"error",lineNumbers:!1,readOnly:!0,defaultValue:this.state.error.message}):_react2["default"].createElement(_Editor2["default"],{posFromIndex:this._posFromIndex,mode:this.props.mode,key:"output",readOnly:!0,defaultValue:this.state.result}))}}]),r}(_react2["default"].Component);exports["default"]=TransformOutput,TransformOutput.propTypes={transformer:_react2["default"].PropTypes.object,transformCode:_react2["default"].PropTypes.string,mode:_react2["default"].PropTypes.string,code:_react2["default"].PropTypes.string};

/***/ },

/***/ "./node_modules/source-map/lib/source-map-consumer.js":
/***/ function(module, exports, __webpack_require__) {

	function SourceMapConsumer(e){var r=e;return"string"==typeof e&&(r=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=r.sections?new IndexedSourceMapConsumer(r):new BasicSourceMapConsumer(r)}function BasicSourceMapConsumer(e){var r=e;"string"==typeof e&&(r=JSON.parse(e.replace(/^\)\]\}'/,"")));var n=util.getArg(r,"version"),o=util.getArg(r,"sources"),t=util.getArg(r,"names",[]),i=util.getArg(r,"sourceRoot",null),s=util.getArg(r,"sourcesContent",null),u=util.getArg(r,"mappings"),a=util.getArg(r,"file",null);if(n!=this._version)throw new Error("Unsupported version: "+n);o=o.map(String).map(util.normalize).map(function(e){return i&&util.isAbsolute(i)&&util.isAbsolute(e)?util.relative(i,e):e}),this._names=ArraySet.fromArray(t.map(String),!0),this._sources=ArraySet.fromArray(o,!0),this.sourceRoot=i,this.sourcesContent=s,this._mappings=u,this.file=a}function Mapping(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function IndexedSourceMapConsumer(e){var r=e;"string"==typeof e&&(r=JSON.parse(e.replace(/^\)\]\}'/,"")));var n=util.getArg(r,"version"),o=util.getArg(r,"sections");if(n!=this._version)throw new Error("Unsupported version: "+n);this._sources=new ArraySet,this._names=new ArraySet;var t={line:-1,column:0};this._sections=o.map(function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var r=util.getArg(e,"offset"),n=util.getArg(r,"line"),o=util.getArg(r,"column");if(n<t.line||n===t.line&&o<t.column)throw new Error("Section offsets must be ordered and non-overlapping.");return t=r,{generatedOffset:{generatedLine:n+1,generatedColumn:o+1},consumer:new SourceMapConsumer(util.getArg(e,"map"))}})}var util=__webpack_require__("./node_modules/source-map/lib/util.js"),binarySearch=__webpack_require__("./node_modules/source-map/lib/binary-search.js"),ArraySet=__webpack_require__("./node_modules/source-map/lib/array-set.js").ArraySet,base64VLQ=__webpack_require__("./node_modules/source-map/lib/base64-vlq.js"),quickSort=__webpack_require__("./node_modules/source-map/lib/quick-sort.js").quickSort;SourceMapConsumer.fromSourceMap=function(e){return BasicSourceMapConsumer.fromSourceMap(e)},SourceMapConsumer.prototype._version=3,SourceMapConsumer.prototype.__generatedMappings=null,Object.defineProperty(SourceMapConsumer.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),SourceMapConsumer.prototype.__originalMappings=null,Object.defineProperty(SourceMapConsumer.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),SourceMapConsumer.prototype._charIsMappingSeparator=function(e,r){var n=e.charAt(r);return";"===n||","===n},SourceMapConsumer.prototype._parseMappings=function(e,r){throw new Error("Subclasses must implement _parseMappings")},SourceMapConsumer.GENERATED_ORDER=1,SourceMapConsumer.ORIGINAL_ORDER=2,SourceMapConsumer.GREATEST_LOWER_BOUND=1,SourceMapConsumer.LEAST_UPPER_BOUND=2,SourceMapConsumer.prototype.eachMapping=function(e,r,n){var o,t=r||null,i=n||SourceMapConsumer.GENERATED_ORDER;switch(i){case SourceMapConsumer.GENERATED_ORDER:o=this._generatedMappings;break;case SourceMapConsumer.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var s=this.sourceRoot;o.map(function(e){var r=null===e.source?null:this._sources.at(e.source);return null!=r&&null!=s&&(r=util.join(s,r)),{source:r,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,t)},SourceMapConsumer.prototype.allGeneratedPositionsFor=function(e){var r=util.getArg(e,"line"),n={source:util.getArg(e,"source"),originalLine:r,originalColumn:util.getArg(e,"column",0)};if(null!=this.sourceRoot&&(n.source=util.relative(this.sourceRoot,n.source)),!this._sources.has(n.source))return[];n.source=this._sources.indexOf(n.source);var o=[],t=this._findMapping(n,this._originalMappings,"originalLine","originalColumn",util.compareByOriginalPositions,binarySearch.LEAST_UPPER_BOUND);if(t>=0){var i=this._originalMappings[t];if(void 0===e.column)for(var s=i.originalLine;i&&i.originalLine===s;)o.push({line:util.getArg(i,"generatedLine",null),column:util.getArg(i,"generatedColumn",null),lastColumn:util.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++t];else for(var u=i.originalColumn;i&&i.originalLine===r&&i.originalColumn==u;)o.push({line:util.getArg(i,"generatedLine",null),column:util.getArg(i,"generatedColumn",null),lastColumn:util.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++t]}return o},exports.SourceMapConsumer=SourceMapConsumer,BasicSourceMapConsumer.prototype=Object.create(SourceMapConsumer.prototype),BasicSourceMapConsumer.prototype.consumer=SourceMapConsumer,BasicSourceMapConsumer.fromSourceMap=function(e){var r=Object.create(BasicSourceMapConsumer.prototype),n=r._names=ArraySet.fromArray(e._names.toArray(),!0),o=r._sources=ArraySet.fromArray(e._sources.toArray(),!0);r.sourceRoot=e._sourceRoot,r.sourcesContent=e._generateSourcesContent(r._sources.toArray(),r.sourceRoot),r.file=e._file;for(var t=e._mappings.toArray().slice(),i=r.__generatedMappings=[],s=r.__originalMappings=[],u=0,a=t.length;u<a;u++){var l=t[u],c=new Mapping;c.generatedLine=l.generatedLine,c.generatedColumn=l.generatedColumn,l.source&&(c.source=o.indexOf(l.source),c.originalLine=l.originalLine,c.originalColumn=l.originalColumn,l.name&&(c.name=n.indexOf(l.name)),s.push(c)),i.push(c)}return quickSort(r.__originalMappings,util.compareByOriginalPositions),r},BasicSourceMapConsumer.prototype._version=3,Object.defineProperty(BasicSourceMapConsumer.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?util.join(this.sourceRoot,e):e},this)}}),BasicSourceMapConsumer.prototype._parseMappings=function(e,r){for(var n,o,t,i,s,u=1,a=0,l=0,c=0,g=0,p=0,m=e.length,h=0,d={},f={},_=[],C=[];h<m;)if(";"===e.charAt(h))u++,h++,a=0;else if(","===e.charAt(h))h++;else{for(n=new Mapping,n.generatedLine=u,i=h;i<m&&!this._charIsMappingSeparator(e,i);i++);if(o=e.slice(h,i),t=d[o])h+=o.length;else{for(t=[];h<i;)base64VLQ.decode(e,h,f),s=f.value,h=f.rest,t.push(s);if(2===t.length)throw new Error("Found a source, but no line and column");if(3===t.length)throw new Error("Found a source and line, but no column");d[o]=t}n.generatedColumn=a+t[0],a=n.generatedColumn,t.length>1&&(n.source=g+t[1],g+=t[1],n.originalLine=l+t[2],l=n.originalLine,n.originalLine+=1,n.originalColumn=c+t[3],c=n.originalColumn,t.length>4&&(n.name=p+t[4],p+=t[4])),C.push(n),"number"==typeof n.originalLine&&_.push(n)}quickSort(C,util.compareByGeneratedPositionsDeflated),this.__generatedMappings=C,quickSort(_,util.compareByOriginalPositions),this.__originalMappings=_},BasicSourceMapConsumer.prototype._findMapping=function(e,r,n,o,t,i){if(e[n]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[n]);if(e[o]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[o]);return binarySearch.search(e,r,t,i)},BasicSourceMapConsumer.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var r=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var n=this._generatedMappings[e+1];if(r.generatedLine===n.generatedLine){r.lastGeneratedColumn=n.generatedColumn-1;continue}}r.lastGeneratedColumn=1/0}},BasicSourceMapConsumer.prototype.originalPositionFor=function(e){var r={generatedLine:util.getArg(e,"line"),generatedColumn:util.getArg(e,"column")},n=this._findMapping(r,this._generatedMappings,"generatedLine","generatedColumn",util.compareByGeneratedPositionsDeflated,util.getArg(e,"bias",SourceMapConsumer.GREATEST_LOWER_BOUND));if(n>=0){var o=this._generatedMappings[n];if(o.generatedLine===r.generatedLine){var t=util.getArg(o,"source",null);null!==t&&(t=this._sources.at(t),null!=this.sourceRoot&&(t=util.join(this.sourceRoot,t)));var i=util.getArg(o,"name",null);return null!==i&&(i=this._names.at(i)),{source:t,line:util.getArg(o,"originalLine",null),column:util.getArg(o,"originalColumn",null),name:i}}}return{source:null,line:null,column:null,name:null}},BasicSourceMapConsumer.prototype.hasContentsOfAllSources=function(){return!!this.sourcesContent&&(this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}))},BasicSourceMapConsumer.prototype.sourceContentFor=function(e,r){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=util.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var n;if(null!=this.sourceRoot&&(n=util.urlParse(this.sourceRoot))){var o=e.replace(/^file:\/\//,"");if("file"==n.scheme&&this._sources.has(o))return this.sourcesContent[this._sources.indexOf(o)];if((!n.path||"/"==n.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(r)return null;throw new Error('"'+e+'" is not in the SourceMap.')},BasicSourceMapConsumer.prototype.generatedPositionFor=function(e){var r=util.getArg(e,"source");if(null!=this.sourceRoot&&(r=util.relative(this.sourceRoot,r)),!this._sources.has(r))return{line:null,column:null,lastColumn:null};r=this._sources.indexOf(r);var n={source:r,originalLine:util.getArg(e,"line"),originalColumn:util.getArg(e,"column")},o=this._findMapping(n,this._originalMappings,"originalLine","originalColumn",util.compareByOriginalPositions,util.getArg(e,"bias",SourceMapConsumer.GREATEST_LOWER_BOUND));if(o>=0){var t=this._originalMappings[o];if(t.source===n.source)return{line:util.getArg(t,"generatedLine",null),column:util.getArg(t,"generatedColumn",null),lastColumn:util.getArg(t,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},exports.BasicSourceMapConsumer=BasicSourceMapConsumer,IndexedSourceMapConsumer.prototype=Object.create(SourceMapConsumer.prototype),IndexedSourceMapConsumer.prototype.constructor=SourceMapConsumer,IndexedSourceMapConsumer.prototype._version=3,Object.defineProperty(IndexedSourceMapConsumer.prototype,"sources",{get:function(){for(var e=[],r=0;r<this._sections.length;r++)for(var n=0;n<this._sections[r].consumer.sources.length;n++)e.push(this._sections[r].consumer.sources[n]);return e}}),IndexedSourceMapConsumer.prototype.originalPositionFor=function(e){var r={generatedLine:util.getArg(e,"line"),generatedColumn:util.getArg(e,"column")},n=binarySearch.search(r,this._sections,function(e,r){var n=e.generatedLine-r.generatedOffset.generatedLine;return n?n:e.generatedColumn-r.generatedOffset.generatedColumn}),o=this._sections[n];return o?o.consumer.originalPositionFor({line:r.generatedLine-(o.generatedOffset.generatedLine-1),column:r.generatedColumn-(o.generatedOffset.generatedLine===r.generatedLine?o.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},IndexedSourceMapConsumer.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},IndexedSourceMapConsumer.prototype.sourceContentFor=function(e,r){for(var n=0;n<this._sections.length;n++){var o=this._sections[n],t=o.consumer.sourceContentFor(e,!0);if(t)return t}if(r)return null;throw new Error('"'+e+'" is not in the SourceMap.')},IndexedSourceMapConsumer.prototype.generatedPositionFor=function(e){for(var r=0;r<this._sections.length;r++){var n=this._sections[r];if(n.consumer.sources.indexOf(util.getArg(e,"source"))!==-1){var o=n.consumer.generatedPositionFor(e);if(o){var t={line:o.line+(n.generatedOffset.generatedLine-1),column:o.column+(n.generatedOffset.generatedLine===o.line?n.generatedOffset.generatedColumn-1:0)};return t}}}return{line:null,column:null}},IndexedSourceMapConsumer.prototype._parseMappings=function(e,r){this.__generatedMappings=[],this.__originalMappings=[];for(var n=0;n<this._sections.length;n++)for(var o=this._sections[n],t=o.consumer._generatedMappings,i=0;i<t.length;i++){var s=t[i],u=o.consumer._sources.at(s.source);null!==o.consumer.sourceRoot&&(u=util.join(o.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var a=o.consumer._names.at(s.name);this._names.add(a),a=this._names.indexOf(a);var l={source:u,generatedLine:s.generatedLine+(o.generatedOffset.generatedLine-1),generatedColumn:s.generatedColumn+(o.generatedOffset.generatedLine===s.generatedLine?o.generatedOffset.generatedColumn-1:0),originalLine:s.originalLine,originalColumn:s.originalColumn,name:a};this.__generatedMappings.push(l),"number"==typeof l.originalLine&&this.__originalMappings.push(l)}quickSort(this.__generatedMappings,util.compareByGeneratedPositionsDeflated),quickSort(this.__originalMappings,util.compareByOriginalPositions)},exports.IndexedSourceMapConsumer=IndexedSourceMapConsumer;

/***/ },

/***/ "./node_modules/source-map/lib/util.js":
/***/ function(module, exports) {

	function getArg(e,r,t){if(r in e)return e[r];if(3===arguments.length)return t;throw new Error('"'+r+'" is a required argument.')}function urlParse(e){var r=e.match(urlRegexp);return r?{scheme:r[1],auth:r[2],host:r[3],port:r[4],path:r[5]}:null}function urlGenerate(e){var r="";return e.scheme&&(r+=e.scheme+":"),r+="//",e.auth&&(r+=e.auth+"@"),e.host&&(r+=e.host),e.port&&(r+=":"+e.port),e.path&&(r+=e.path),r}function normalize(e){var r=e,t=urlParse(e);if(t){if(!t.path)return e;r=t.path}for(var n,o=exports.isAbsolute(r),i=r.split(/\/+/),a=0,u=i.length-1;u>=0;u--)n=i[u],"."===n?i.splice(u,1):".."===n?a++:a>0&&(""===n?(i.splice(u+1,a),a=0):(i.splice(u,2),a--));return r=i.join("/"),""===r&&(r=o?"/":"."),t?(t.path=r,urlGenerate(t)):r}function join(e,r){""===e&&(e="."),""===r&&(r=".");var t=urlParse(r),n=urlParse(e);if(n&&(e=n.path||"/"),t&&!t.scheme)return n&&(t.scheme=n.scheme),urlGenerate(t);if(t||r.match(dataUrlRegexp))return r;if(n&&!n.host&&!n.path)return n.host=r,urlGenerate(n);var o="/"===r.charAt(0)?r:normalize(e.replace(/\/+$/,"")+"/"+r);return n?(n.path=o,urlGenerate(n)):o}function relative(e,r){""===e&&(e="."),e=e.replace(/\/$/,"");for(var t=0;0!==r.indexOf(e+"/");){var n=e.lastIndexOf("/");if(n<0)return r;if(e=e.slice(0,n),e.match(/^([^\/]+:\/)?\/*$/))return r;++t}return Array(t+1).join("../")+r.substr(e.length+1)}function identity(e){return e}function toSetString(e){return isProtoString(e)?"$"+e:e}function fromSetString(e){return isProtoString(e)?e.slice(1):e}function isProtoString(e){if(!e)return!1;var r=e.length;if(r<9)return!1;if(95!==e.charCodeAt(r-1)||95!==e.charCodeAt(r-2)||111!==e.charCodeAt(r-3)||116!==e.charCodeAt(r-4)||111!==e.charCodeAt(r-5)||114!==e.charCodeAt(r-6)||112!==e.charCodeAt(r-7)||95!==e.charCodeAt(r-8)||95!==e.charCodeAt(r-9))return!1;for(var t=r-10;t>=0;t--)if(36!==e.charCodeAt(t))return!1;return!0}function compareByOriginalPositions(e,r,t){var n=e.source-r.source;return 0!==n?n:(n=e.originalLine-r.originalLine,0!==n?n:(n=e.originalColumn-r.originalColumn,0!==n||t?n:(n=e.generatedColumn-r.generatedColumn,0!==n?n:(n=e.generatedLine-r.generatedLine,0!==n?n:e.name-r.name))))}function compareByGeneratedPositionsDeflated(e,r,t){var n=e.generatedLine-r.generatedLine;return 0!==n?n:(n=e.generatedColumn-r.generatedColumn,0!==n||t?n:(n=e.source-r.source,0!==n?n:(n=e.originalLine-r.originalLine,0!==n?n:(n=e.originalColumn-r.originalColumn,0!==n?n:e.name-r.name))))}function strcmp(e,r){return e===r?0:e>r?1:-1}function compareByGeneratedPositionsInflated(e,r){var t=e.generatedLine-r.generatedLine;return 0!==t?t:(t=e.generatedColumn-r.generatedColumn,0!==t?t:(t=strcmp(e.source,r.source),0!==t?t:(t=e.originalLine-r.originalLine,0!==t?t:(t=e.originalColumn-r.originalColumn,0!==t?t:strcmp(e.name,r.name)))))}exports.getArg=getArg;var urlRegexp=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,dataUrlRegexp=/^data:.+\,.+$/;exports.urlParse=urlParse,exports.urlGenerate=urlGenerate,exports.normalize=normalize,exports.join=join,exports.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(urlRegexp)},exports.relative=relative;var supportsNullProto=function(){var e=Object.create(null);return!("__proto__"in e)}();exports.toSetString=supportsNullProto?identity:toSetString,exports.fromSetString=supportsNullProto?identity:fromSetString,exports.compareByOriginalPositions=compareByOriginalPositions,exports.compareByGeneratedPositionsDeflated=compareByGeneratedPositionsDeflated,exports.compareByGeneratedPositionsInflated=compareByGeneratedPositionsInflated;

/***/ },

/***/ "./node_modules/source-map/lib/binary-search.js":
/***/ function(module, exports) {

	function recursiveSearch(r,e,t,E,c,n){var o=Math.floor((e-r)/2)+r,s=c(t,E[o],!0);return 0===s?o:s>0?e-o>1?recursiveSearch(o,e,t,E,c,n):n==exports.LEAST_UPPER_BOUND?e<E.length?e:-1:o:o-r>1?recursiveSearch(r,o,t,E,c,n):n==exports.LEAST_UPPER_BOUND?o:r<0?-1:r}exports.GREATEST_LOWER_BOUND=1,exports.LEAST_UPPER_BOUND=2,exports.search=function(r,e,t,E){if(0===e.length)return-1;var c=recursiveSearch(-1,e.length,r,e,t,E||exports.GREATEST_LOWER_BOUND);if(c<0)return-1;for(;c-1>=0&&0===t(e[c],e[c-1],!0);)--c;return c};

/***/ },

/***/ "./node_modules/source-map/lib/array-set.js":
/***/ function(module, exports, __webpack_require__) {

	function ArraySet(){this._array=[],this._set=Object.create(null)}var util=__webpack_require__("./node_modules/source-map/lib/util.js"),has=Object.prototype.hasOwnProperty;ArraySet.fromArray=function(t,r){for(var e=new ArraySet,a=0,n=t.length;a<n;a++)e.add(t[a],r);return e},ArraySet.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},ArraySet.prototype.add=function(t,r){var e=util.toSetString(t),a=has.call(this._set,e),n=this._array.length;a&&!r||this._array.push(t),a||(this._set[e]=n)},ArraySet.prototype.has=function(t){var r=util.toSetString(t);return has.call(this._set,r)},ArraySet.prototype.indexOf=function(t){var r=util.toSetString(t);if(has.call(this._set,r))return this._set[r];throw new Error('"'+t+'" is not in the set.')},ArraySet.prototype.at=function(t){if(t>=0&&t<this._array.length)return this._array[t];throw new Error("No element indexed by "+t)},ArraySet.prototype.toArray=function(){return this._array.slice()},exports.ArraySet=ArraySet;

/***/ },

/***/ "./node_modules/source-map/lib/base64-vlq.js":
/***/ function(module, exports, __webpack_require__) {

	function toVLQSigned(e){return e<0?(-e<<1)+1:(e<<1)+0}function fromVLQSigned(e){var r=1===(1&e),_=e>>1;return r?-_:_}var base64=__webpack_require__("./node_modules/source-map/lib/base64.js"),VLQ_BASE_SHIFT=5,VLQ_BASE=1<<VLQ_BASE_SHIFT,VLQ_BASE_MASK=VLQ_BASE-1,VLQ_CONTINUATION_BIT=VLQ_BASE;exports.encode=function(e){var r,_="",n=toVLQSigned(e);do r=n&VLQ_BASE_MASK,n>>>=VLQ_BASE_SHIFT,n>0&&(r|=VLQ_CONTINUATION_BIT),_+=base64.encode(r);while(n>0);return _},exports.decode=function(e,r,_){var n,o,S=e.length,t=0,i=0;do{if(r>=S)throw new Error("Expected more digits in base 64 VLQ value.");if(o=base64.decode(e.charCodeAt(r++)),o===-1)throw new Error("Invalid base64 digit: "+e.charAt(r-1));n=!!(o&VLQ_CONTINUATION_BIT),o&=VLQ_BASE_MASK,t+=o<<i,i+=VLQ_BASE_SHIFT}while(n);_.value=fromVLQSigned(t),_.rest=r};

/***/ },

/***/ "./node_modules/source-map/lib/base64.js":
/***/ function(module, exports) {

	var intToCharMap="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");exports.encode=function(e){if(0<=e&&e<intToCharMap.length)return intToCharMap[e];throw new TypeError("Must be between 0 and 63: "+e)},exports.decode=function(e){var r=65,n=90,t=97,o=122,a=48,i=57,p=43,h=47,u=26,c=52;return r<=e&&e<=n?e-r:t<=e&&e<=o?e-t+u:a<=e&&e<=i?e-a+c:e==p?62:e==h?63:-1};

/***/ },

/***/ "./node_modules/source-map/lib/quick-sort.js":
/***/ function(module, exports) {

	function swap(n,o,r){var t=n[o];n[o]=n[r],n[r]=t}function randomIntInRange(n,o){return Math.round(n+Math.random()*(o-n))}function doQuickSort(n,o,r,t){if(r<t){var a=randomIntInRange(r,t),u=r-1;swap(n,a,t);for(var i=n[t],c=r;c<t;c++)o(n[c],i)<=0&&(u+=1,swap(n,u,c));swap(n,u+1,c);var d=u+1;doQuickSort(n,o,r,d-1),doQuickSort(n,o,d+1,t)}}exports.quickSort=function(n,o){doQuickSort(n,o,0,n.length-1)};

/***/ },

/***/ "./node_modules/redux-saga/lib/index.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.utils=exports.effects=exports.takeLatest=exports.takeEvery=exports.storeIO=exports.runSaga=exports.isCancelError=exports.SagaCancellationException=void 0;var _runSaga=__webpack_require__("./node_modules/redux-saga/lib/internal/runSaga.js");Object.defineProperty(exports,"runSaga",{enumerable:!0,get:function(){return _runSaga.runSaga}}),Object.defineProperty(exports,"storeIO",{enumerable:!0,get:function(){return _runSaga.storeIO}});var _sagaHelpers=__webpack_require__("./node_modules/redux-saga/lib/internal/sagaHelpers.js");Object.defineProperty(exports,"takeEvery",{enumerable:!0,get:function(){return _sagaHelpers.takeEvery}}),Object.defineProperty(exports,"takeLatest",{enumerable:!0,get:function(){return _sagaHelpers.takeLatest}});var _middleware=__webpack_require__("./node_modules/redux-saga/lib/internal/middleware.js"),_middleware2=_interopRequireDefault(_middleware),_SagaCancellationException2=__webpack_require__("./node_modules/redux-saga/lib/internal/SagaCancellationException.js"),_SagaCancellationException3=_interopRequireDefault(_SagaCancellationException2),_effects=__webpack_require__("./node_modules/redux-saga/lib/effects.js"),effects=_interopRequireWildcard(_effects),_utils=__webpack_require__("./node_modules/redux-saga/lib/utils.js"),utils=_interopRequireWildcard(_utils);exports["default"]=_middleware2["default"];var SagaCancellationException=exports.SagaCancellationException=_SagaCancellationException3["default"],isCancelError=exports.isCancelError=function(e){return e instanceof SagaCancellationException};exports.effects=effects,exports.utils=utils;

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/runSaga.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function storeIO(e){if((0,_utils.warnDeprecated)("storeIO is deprecated, to run Saga dynamically, use 'run' method of the middleware"),e[IO])return e[IO];var t=(0,_emitter2["default"])(),r=e.dispatch;return e.dispatch=function(e){var i=r(e);return t.emit(e),i},e[IO]={subscribe:t.subscribe,dispatch:e.dispatch,getState:e.getState},e[IO]}function runSaga(e,t){var r=t.subscribe,i=t.dispatch,u=t.getState,a=arguments.length<=2||void 0===arguments[2]?_utils.noop:arguments[2];return(0,_utils.check)(e,_utils.is.iterator,NOT_ITERATOR_ERROR),(0,_proc2["default"])(e,r,i,u,a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.NOT_ITERATOR_ERROR=void 0,exports.storeIO=storeIO,exports.runSaga=runSaga;var _utils=__webpack_require__("./node_modules/redux-saga/lib/internal/utils.js"),_proc=__webpack_require__("./node_modules/redux-saga/lib/internal/proc.js"),_proc2=_interopRequireDefault(_proc),_emitter=__webpack_require__("./node_modules/redux-saga/lib/internal/emitter.js"),_emitter2=_interopRequireDefault(_emitter),NOT_ITERATOR_ERROR=exports.NOT_ITERATOR_ERROR="runSaga must be called on an iterator",IO=(0,_utils.sym)("IO");

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/proc.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(n){return n&&n.__esModule?n:{"default":n}}function _interopRequireWildcard(n){if(n&&n.__esModule)return n;var e={};if(null!=n)for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t]);return e["default"]=n,e}function _toConsumableArray(n){if(Array.isArray(n)){for(var e=0,t=Array(n.length);e<n.length;e++)t[e]=n[e];return t}return Array.from(n)}function _defineProperty(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function proc(n){function e(n,e,t){"undefined"==typeof window?console.log("redux-saga "+n+": "+e+"\n"+t.stack):console[n].call(console,e,t)}function t(i,a){if(!n._isRunning)throw new Error("Trying to resume an already finished generator");try{var c=i?n["throw"](i):n.next(a);c.done?r(c.value):o(c.value,R,"",t)}catch(i){r(i,!0),i instanceof _SagaCancellationException2["default"]?_utils.isDev&&e("warn",L+": uncaught",i):e("error",L+": uncaught",i)}}function r(e,t){n._isRunning=!1,t?(n._error=e,O.reject(e)):(n._result=e,O.resolve(e)),T()}function o(n,e){function t(n,e){v||(v=!0,o.cancel=_utils.noop,y(n?monitorActions.effectRejected(C,n):monitorActions.effectResolved(C,e)),o(n,e))}var r=arguments.length<=2||void 0===arguments[2]?"":arguments[2],o=arguments[3],C=nextEffectId();y(monitorActions.effectTriggered(C,e,r,n));var v=void 0;t.cancel=_utils.noop,o.cancel=function(n){if(!v){v=!0;try{t.cancel(n)}catch(e){}t.cancel=_utils.noop,o(n),y(monitorActions.effectRejected(C,n))}};var g=void 0;return _utils.is.promise(n)?i(n,t):_utils.is.iterator(n)?a(n,C,L,t):_utils.is.array(n)?p(n,C,t):_utils.is.notUndef(g=_io.asEffect.take(n))?c(g,t):_utils.is.notUndef(g=_io.asEffect.put(n))?u(g,t):_utils.is.notUndef(g=_io.asEffect.race(n))?A(g,C,t):_utils.is.notUndef(g=_io.asEffect.call(n))?l(g,C,t):_utils.is.notUndef(g=_io.asEffect.cps(n))?s(g,t):_utils.is.notUndef(g=_io.asEffect.fork(n))?f(g,C,t):_utils.is.notUndef(g=_io.asEffect.join(n))?_(g,t):_utils.is.notUndef(g=_io.asEffect.cancel(n))?d(g,t):_utils.is.notUndef(g=_io.asEffect.select(n))?E(g,t):t(null,n)}function i(n,e){var t=n[CANCEL];"function"==typeof t&&(e.cancel=t),n.then(function(n){return e(null,n)},function(n){return e(n)})}function a(n,e,t,r){i(proc(n,v,g,h,y,e,t).done,r)}function c(n,e){var t={match:(0,_io.matcher)(n),pattern:n,resolve:function(n){return e(null,n)}};N.push(t),e.cancel=function(){return(0,_utils.remove)(N,t)}}function u(n,e){(0,_utils.asap)(function(){return e(null,g(n))})}function l(n,e,t){var r=n.context,o=n.fn,c=n.args,u=void 0;try{u=o.apply(r,c)}catch(l){return t(l)}return _utils.is.promise(u)?i(u,t):_utils.is.iterator(u)?a(u,e,o.name,t):t(null,u)}function s(n,e){var t=n.context,r=n.fn,o=n.args;try{r.apply(t,o.concat(e))}catch(i){return e(i)}}function f(n,e,t){var r=n.context,o=n.fn,i=n.args,a=void 0,c=void 0,u=void 0;try{a=o.apply(r,i)}catch(l){c=c}u=_utils.is.iterator(a)?a:(c?regeneratorRuntime.mark(function s(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:throw c;case 1:case"end":return n.stop()}},s,this)}):regeneratorRuntime.mark(function f(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a;case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}},f,this)}))(),t(null,proc(u,v,g,h,y,e,o.name,!0))}function _(n,e){i(n.done,e)}function d(n,e){n.done[CANCEL](new _SagaCancellationException2["default"](MANUAL_CANCEL,L,L)),e()}function p(n,e,t){function r(){i===c.length&&(a=!0,t(null,c))}if(!n.length)return void t(null,[]);var i=0,a=void 0,c=Array(n.length),u=n.map(function(n,e){var o=function(n,o){if(!a)if(n){try{t.cancel(new _SagaCancellationException2["default"](PARALLEL_AUTO_CANCEL,L,L))}catch(n){}t(n)}else c[e]=o,i++,r()};return o.cancel=_utils.noop,o});t.cancel=function(n){a||(a=!0,u.forEach(function(e){return e.cancel(n)}))},n.forEach(function(n,t){return o(n,e,t,u[t])})}function A(n,e,t){var r=void 0,i=Object.keys(n),a={};i.forEach(function(n){var e=function(e,o){if(!r)if(e){try{t.cancel(new _SagaCancellationException2["default"](RACE_AUTO_CANCEL,L,L))}catch(e){}t(_defineProperty({},n,e))}else{try{t.cancel(new _SagaCancellationException2["default"](RACE_AUTO_CANCEL,L,L))}catch(e){}r=!0,t(null,_defineProperty({},n,o))}};e.cancel=_utils.noop,a[n]=e}),t.cancel=function(n){r||(r=!0,i.forEach(function(e){return a[e].cancel(n)}))},i.forEach(function(t){return o(n[t],e,t,a[t])})}function E(n,e){var t=n.selector,r=n.args;try{var o=t.apply(void 0,[h()].concat(_toConsumableArray(r)));e(null,o)}catch(i){e(i)}}function C(n,e,t,r,o){var i;return i={},_defineProperty(i,_utils.TASK,!0),_defineProperty(i,"id",n),_defineProperty(i,"name",e),_defineProperty(i,"done",r),_defineProperty(i,"forked",o),_defineProperty(i,"cancel",function(n){n instanceof _SagaCancellationException2["default"]||(n=new _SagaCancellationException2["default"](MANUAL_CANCEL,e,n)),r[CANCEL](n)}),_defineProperty(i,"isRunning",function(){return t._isRunning}),_defineProperty(i,"result",function(){return t._result}),_defineProperty(i,"error",function(){return t._error}),i}var v=arguments.length<=1||void 0===arguments[1]?function(){return _utils.noop}:arguments[1],g=arguments.length<=2||void 0===arguments[2]?_utils.noop:arguments[2],h=arguments.length<=3||void 0===arguments[3]?_utils.noop:arguments[3],y=arguments.length<=4||void 0===arguments[4]?_utils.noop:arguments[4],R=arguments.length<=5||void 0===arguments[5]?0:arguments[5],L=arguments.length<=6||void 0===arguments[6]?"anonymous":arguments[6],x=arguments[7];(0,_utils.check)(n,_utils.is.iterator,NOT_ITERATOR_ERROR);var m=undefindInputError(L),N=[],O=(0,_utils.deferred)(),T=v(function(n){if(void 0===n)throw m;for(var e=0;e<N.length;e++){var t=N[e];t.match(n)&&(N=[],t.resolve(n))}});t.cancel=_utils.noop;var U=C(R,L,n,O.promise,x);return U.done[CANCEL]=function(n){var e=n.type,r=n.origin;t.cancel(new _SagaCancellationException2["default"](e,L,r))},n._isRunning=!0,t(),U}Object.defineProperty(exports,"__esModule",{value:!0}),exports.MANUAL_CANCEL=exports.RACE_AUTO_CANCEL=exports.PARALLEL_AUTO_CANCEL=exports.CANCEL=exports.undefindInputError=exports.NOT_ITERATOR_ERROR=void 0,exports["default"]=proc;var _utils=__webpack_require__("./node_modules/redux-saga/lib/internal/utils.js"),_io=__webpack_require__("./node_modules/redux-saga/lib/internal/io.js"),_monitorActions=__webpack_require__("./node_modules/redux-saga/lib/internal/monitorActions.js"),monitorActions=_interopRequireWildcard(_monitorActions),_SagaCancellationException=__webpack_require__("./node_modules/redux-saga/lib/internal/SagaCancellationException.js"),_SagaCancellationException2=_interopRequireDefault(_SagaCancellationException),NOT_ITERATOR_ERROR=exports.NOT_ITERATOR_ERROR="proc first argument (Saga function result) must be an iterator",undefindInputError=exports.undefindInputError=function(n){return"\n  "+n+" saga was provided with an undefined input action\n  Hints :\n  - check that your Action Creator returns a non undefined value\n  - if the Saga was started using runSaga, check that your subscribe source provides the action to its listeners\n"},CANCEL=exports.CANCEL=(0,_utils.sym)("@@redux-saga/cancelPromise"),PARALLEL_AUTO_CANCEL=exports.PARALLEL_AUTO_CANCEL="PARALLEL_AUTO_CANCEL",RACE_AUTO_CANCEL=exports.RACE_AUTO_CANCEL="RACE_AUTO_CANCEL",MANUAL_CANCEL=exports.MANUAL_CANCEL="MANUAL_CANCEL",nextEffectId=(0,_utils.autoInc)();

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/monitorActions.js":
/***/ function(module, exports) {

	"use strict";function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function effectTriggered(e,r,t,E){var f;return f={},_defineProperty(f,MONITOR_ACTION,!0),_defineProperty(f,"type",EFFECT_TRIGGERED),_defineProperty(f,"effectId",e),_defineProperty(f,"parentEffectId",r),_defineProperty(f,"label",t),_defineProperty(f,"effect",E),f}function effectResolved(e,r){var t;return t={},_defineProperty(t,MONITOR_ACTION,!0),_defineProperty(t,"type",EFFECT_RESOLVED),_defineProperty(t,"effectId",e),_defineProperty(t,"result",r),t}function effectRejected(e,r){var t;return t={},_defineProperty(t,MONITOR_ACTION,!0),_defineProperty(t,"type",EFFECT_REJECTED),_defineProperty(t,"effectId",e),_defineProperty(t,"error",r),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.effectTriggered=effectTriggered,exports.effectResolved=effectResolved,exports.effectRejected=effectRejected;var MONITOR_ACTION=exports.MONITOR_ACTION="MONITOR_ACTION",EFFECT_TRIGGERED=exports.EFFECT_TRIGGERED="EFFECT_TRIGGERED",EFFECT_RESOLVED=exports.EFFECT_RESOLVED="EFFECT_RESOLVED",EFFECT_REJECTED=exports.EFFECT_REJECTED="EFFECT_REJECTED";

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/SagaCancellationException.js":
/***/ function(module, exports) {

	"use strict";function SagaCancellationException(t,a,e){var o="SagaCancellationException; type: "+t+", saga: "+a+", origin: "+e;this.name="SagaCancellationException",this.message=o,this.type=t,this.saga=a,this.origin=e,this.stack=(new Error).stack}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=SagaCancellationException,SagaCancellationException.prototype=Object.create(Error.prototype),SagaCancellationException.prototype.constructor=SagaCancellationException;

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/emitter.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function emitter(){function e(e){return r.push(e),function(){return(0,_utils.remove)(r,e)}}function t(e){r.slice().forEach(function(t){return t(e)})}var r=[];return{subscribe:e,emit:t}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=emitter;var _utils=__webpack_require__("./node_modules/redux-saga/lib/internal/utils.js");

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/sagaHelpers.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function fsmIterator(e,t){function r(r,n){if(o)return done;if(n){if(o=!0,!(n instanceof _SagaCancellationException2["default"]))throw n;return done}a&&a(r);var i=_slicedToArray(e[t],3),u=i[0],l=i[1],c=i[2];return a=c,t=resume(l,r),resume(u,r)}var n=arguments.length<=2||void 0===arguments[2]?"iterator":arguments[2],o=void 0,a=void 0,i={name:n,next:r,"throw":function(e){return r(null,e)}};return"undefined"!=typeof Symbol&&(i[Symbol.iterator]=function(){return i}),i}function takeEvery(e,t){for(var r=arguments.length,n=Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];var a={done:!1,value:(0,_io.take)(e)},i=function(e){return{done:!1,value:_io.fork.apply(void 0,[t].concat(n,[e]))}};return fsmIterator({take:[a,"fork"],fork:[i,"take"]},"take","takeEvery("+e+", "+t.name+")")}function takeLatest(e,t){for(var r=arguments.length,n=Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];var a={done:!1,value:(0,_io.take)(e)},i=function(){return{done:!1,value:_io.fork.apply(void 0,[t].concat(n,[f]))}},u=function(){return{done:!1,value:(0,_io.cancel)(c)}},l=function(){return c?"cancel":"fork"},c=void 0,f=void 0;return fsmIterator({take:[a,l,function(e){return f=e}],cancel:[u,"fork"],fork:[i,"take",function(e){return c=e}]},"take","takeLatest("+e+", "+t.name+")")}Object.defineProperty(exports,"__esModule",{value:!0});var _slicedToArray=function(){function e(e,t){var r=[],n=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(l){o=!0,a=l}finally{try{!n&&u["return"]&&u["return"]()}finally{if(o)throw a}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();exports.takeEvery=takeEvery,exports.takeLatest=takeLatest;var _utils=__webpack_require__("./node_modules/redux-saga/lib/internal/utils.js"),_io=__webpack_require__("./node_modules/redux-saga/lib/internal/io.js"),_SagaCancellationException=__webpack_require__("./node_modules/redux-saga/lib/internal/SagaCancellationException.js"),_SagaCancellationException2=_interopRequireDefault(_SagaCancellationException),resume=function(e,t){return _utils.is.func(e)?e(t):e},done={done:!0};

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/middleware.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function sagaMiddlewareFactory(){function e(e){function r(e){for(var r=arguments.length,t=Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];return(0,_proc2["default"])(e.apply(void 0,[c].concat(t)),i.subscribe,o,a,u,0,e.name)}var a=e.getState,o=e.dispatch,i=(0,_emitter2["default"])(),u=_utils.isDev?function(e){return(0,_utils.asap)(function(){return o(e)})}:void 0,c=function(){return(0,_utils.warnDeprecated)(GET_STATE_DEPRECATED_WARNING),a()};return n=r,t.forEach(r),function(e){return function(r){var t=e(r);return r[_monitorActions.MONITOR_ACTION]||i.emit(r),t}}}for(var r=arguments.length,t=Array(r),a=0;a<r;a++)t[a]=arguments[a];var n=void 0;return t.forEach(function(e,r){return(0,_utils.check)(e,_utils.is.func,sagaArgError("createSagaMiddleware",r,e))}),e.run=function(e){for(var r=arguments.length,t=Array(r>1?r-1:0),a=1;a<r;a++)t[a-1]=arguments[a];if(!n)throw new Error(RUN_SAGA_DYNAMIC_ERROR);(0,_utils.check)(e,_utils.is.func,sagaArgError("sagaMiddleware.run",0,e));var o=n.apply(void 0,[e].concat(t));return o.done["catch"](function(e){if(!(e instanceof _SagaCancellationException2["default"]))throw e}),o},e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.GET_STATE_DEPRECATED_WARNING=exports.RUN_SAGA_DYNAMIC_ERROR=exports.sagaArgError=void 0,exports["default"]=sagaMiddlewareFactory;var _utils=__webpack_require__("./node_modules/redux-saga/lib/internal/utils.js"),_proc=__webpack_require__("./node_modules/redux-saga/lib/internal/proc.js"),_proc2=_interopRequireDefault(_proc),_emitter=__webpack_require__("./node_modules/redux-saga/lib/internal/emitter.js"),_emitter2=_interopRequireDefault(_emitter),_monitorActions=__webpack_require__("./node_modules/redux-saga/lib/internal/monitorActions.js"),_SagaCancellationException=__webpack_require__("./node_modules/redux-saga/lib/internal/SagaCancellationException.js"),_SagaCancellationException2=_interopRequireDefault(_SagaCancellationException),sagaArgError=exports.sagaArgError=function(e,r,t){return"\n  "+e+" can only be called on Generator functions\n  Argument "+t+" at position "+r+" is not function!\n"},RUN_SAGA_DYNAMIC_ERROR=exports.RUN_SAGA_DYNAMIC_ERROR="Before running a Saga dynamically using middleware.run, you must mount the Saga middleware on the Store using applyMiddleware",GET_STATE_DEPRECATED_WARNING=exports.GET_STATE_DEPRECATED_WARNING="\n  Using the 'getState' param of Sagas to access the state is deprecated since 0.9.1\n  To access the Store's state use 'yield select()' instead\n  For more infos see http://yelouafi.github.io/redux-saga/docs/api/index.html#selectselector-args\n";

/***/ },

/***/ "./node_modules/redux-saga/lib/utils.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r["default"]=e,r}Object.defineProperty(exports,"__esModule",{value:!0}),exports.monitorActions=exports.createMockTask=exports.MANUAL_CANCEL=exports.PARALLEL_AUTO_CANCEL=exports.RACE_AUTO_CANCEL=exports.CANCEL=exports.asap=exports.arrayOfDeffered=exports.deferred=exports.asEffect=exports.is=exports.noop=exports.TASK=void 0;var _utils=__webpack_require__("./node_modules/redux-saga/lib/internal/utils.js"),_io=__webpack_require__("./node_modules/redux-saga/lib/internal/io.js"),_proc=__webpack_require__("./node_modules/redux-saga/lib/internal/proc.js"),_testUtils=__webpack_require__("./node_modules/redux-saga/lib/internal/testUtils.js"),_monitorActions=__webpack_require__("./node_modules/redux-saga/lib/internal/monitorActions.js"),monitorActions=_interopRequireWildcard(_monitorActions);exports.TASK=_utils.TASK,exports.noop=_utils.noop,exports.is=_utils.is,exports.asEffect=_io.asEffect,exports.deferred=_utils.deferred,exports.arrayOfDeffered=_utils.arrayOfDeffered,exports.asap=_utils.asap,exports.CANCEL=_proc.CANCEL,exports.RACE_AUTO_CANCEL=_proc.RACE_AUTO_CANCEL,exports.PARALLEL_AUTO_CANCEL=_proc.PARALLEL_AUTO_CANCEL,exports.MANUAL_CANCEL=_proc.MANUAL_CANCEL,exports.createMockTask=_testUtils.createMockTask,exports.monitorActions=monitorActions;

/***/ },

/***/ "./node_modules/redux-saga/lib/internal/testUtils.js":
/***/ function(module, exports, __webpack_require__) {

	"use strict";function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function createMockTask(){var e,r=!0,t=void 0,n=void 0;return e={},_defineProperty(e,_utils.TASK,!0),_defineProperty(e,"isRunning",function(){return r}),_defineProperty(e,"result",function(){return t}),_defineProperty(e,"error",function(){return n}),_defineProperty(e,"setRunning",function(e){return r=e}),_defineProperty(e,"setResult",function(e){return t=e}),_defineProperty(e,"setError",function(e){return n=e}),e}Object.defineProperty(exports,"__esModule",{value:!0}),exports.createMockTask=createMockTask;var _utils=__webpack_require__("./node_modules/redux-saga/lib/internal/utils.js");

/***/ },

/***/ "./node_modules/htmlparser2/package.json":
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"htmlparser2@^3.9.0",
				"/Users/fkling/git/astexplorer"
			]
		],
		"_from": "htmlparser2@>=3.9.0 <4.0.0",
		"_id": "htmlparser2@3.9.1",
		"_inCache": true,
		"_installable": true,
		"_location": "/htmlparser2",
		"_nodeVersion": "6.2.1",
		"_npmOperationalInternal": {
			"host": "packages-12-west.internal.npmjs.com",
			"tmp": "tmp/htmlparser2-3.9.1.tgz_1465693408619_0.5511430425103754"
		},
		"_npmUser": {
			"email": "me@feedic.com",
			"name": "feedic"
		},
		"_npmVersion": "3.9.6",
		"_phantomChildren": {},
		"_requested": {
			"name": "htmlparser2",
			"raw": "htmlparser2@^3.9.0",
			"rawSpec": "^3.9.0",
			"scope": null,
			"spec": ">=3.9.0 <4.0.0",
			"type": "range"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.9.1.tgz",
		"_shasum": "621b7a58bc9acd003f7af0a2c9a00aa67c8505d2",
		"_shrinkwrap": null,
		"_spec": "htmlparser2@^3.9.0",
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
			"inherits": "^2.0.1",
			"readable-stream": "^2.0.2"
		},
		"description": "Fast & forgiving HTML/XML/RSS parser",
		"devDependencies": {
			"coveralls": "^2.11.4",
			"eslint": "^2.12.0",
			"istanbul": "^0.4.3",
			"mocha": "^2.2.5",
			"mocha-lcov-reporter": "^1.2.0"
		},
		"directories": {
			"lib": "lib/"
		},
		"dist": {
			"shasum": "621b7a58bc9acd003f7af0a2c9a00aa67c8505d2",
			"tarball": "https://registry.npmjs.org/htmlparser2/-/htmlparser2-3.9.1.tgz"
		},
		"files": [
			"lib"
		],
		"gitHead": "f4651bd5dc1315a9949ff24361cce012b105861f",
		"homepage": "https://github.com/fb55/htmlparser2#readme",
		"keywords": [
			"html",
			"parser",
			"streams",
			"xml",
			"dom",
			"rss",
			"feed",
			"atom"
		],
		"license": "MIT",
		"main": "lib/index.js",
		"maintainers": [
			{
				"email": "me@feedic.com",
				"name": "feedic"
			}
		],
		"name": "htmlparser2",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git://github.com/fb55/htmlparser2.git"
		},
		"scripts": {
			"coveralls": "npm run lint && npm run lcov && (cat coverage/lcov.info | coveralls || exit 0)",
			"lcov": "istanbul cover _mocha --report lcovonly -- -R spec",
			"lint": "eslint lib test",
			"test": "mocha && npm run lint"
		},
		"version": "3.9.1"
	};

/***/ }

});