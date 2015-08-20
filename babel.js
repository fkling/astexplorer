
loadjs.d("./src/babylon",function(require,module,exports){
"use strict";var _Object$assign=require("babel-runtime/core-js/object/assign")["default"];Object.defineProperty(exports,"__esModule",{value:!0});var _babylon=require("babylon");exports["default"]={parse:function(e,s){return _babylon.parse(e,_Object$assign({sourceType:"module",features:{"es7.decorators":!0,"es7.comprehensions":!0,"es7.classProperties":!0,"es7.asyncFunctions":!0,"es7.exportExtensions":!0,"es7.objectRestSpread":!0,"es7.trailingFunctionCommas":!0},plugins:{jsx:!0,flow:!0}},s))}},module.exports=exports["default"];

},{"babel-runtime/core-js/object/assign":600,"babylon":690});

loadjs.d("705",function(require,module,exports){
"use strict";function _classCallCheck(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}exports.__esModule=!0;var _utilLocation=require("../util/location"),_context=require("./context"),_types=require("./types"),State=function(){function t(){_classCallCheck(this,t)}return t.prototype.init=function(t){return this.input=t,this.potentialArrowAt=-1,this.inFunction=this.inGenerator=!1,this.labels=[],this.decorators=[],this.tokens=[],this.comments=[],this.trailingComments=[],this.leadingComments=[],this.commentStack=[],this.pos=this.lineStart=0,this.curLine=1,this.type=_types.types.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=[_context.types.b_stat],this.exprAllowed=!0,this.containsEsc=!1,this},t.prototype.curPosition=function(){return new _utilLocation.Position(this.curLine,this.pos-this.lineStart)},t.prototype.clone=function(){var s=new t;for(var i in this){var o=this[i];Array.isArray(o)&&(o=o.slice()),s[i]=o}return s},t}();exports["default"]=State,module.exports=exports["default"];

},{"../util/location":708,"./context":703,"./types":706});

loadjs.d("691",function(require,module,exports){
"use strict";function getOptions(t){var e={};for(var o in defaultOptions)e[o]=t&&o in t?t[o]:defaultOptions[o];return e}exports.__esModule=!0,exports.getOptions=getOptions;var defaultOptions={sourceType:"script",allowReserved:!0,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,plugins:{},features:{},strictMode:null};exports.defaultOptions=defaultOptions;

},{});
