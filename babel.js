
loadjs.d("704",function(require,module,exports){
"use strict";function _classCallCheck(t,s){if(!(t instanceof s))throw new TypeError("Cannot call a class as a function")}exports.__esModule=!0;var _utilLocation=require("../util/location"),_context=require("./context"),_types=require("./types"),State=function(){function t(){_classCallCheck(this,t)}return t.prototype.init=function(t){return this.input=t,this.potentialArrowAt=-1,this.inFunction=this.inGenerator=!1,this.labels=[],this.decorators=[],this.tokens=[],this.comments=[],this.trailingComments=[],this.leadingComments=[],this.commentStack=[],this.pos=this.lineStart=0,this.curLine=1,this.type=_types.types.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=[_context.types.b_stat],this.exprAllowed=!0,this.containsEsc=!1,this},t.prototype.curPosition=function(){return new _utilLocation.Position(this.curLine,this.pos-this.lineStart)},t.prototype.clone=function(){var s=new t;for(var i in this){var o=this[i];Array.isArray(o)&&(o=o.slice()),s[i]=o}return s},t}();exports["default"]=State,module.exports=exports["default"];

},{"../util/location":707,"./context":702,"./types":705});

loadjs.d("690",function(require,module,exports){
"use strict";function getOptions(t){var e={};for(var o in defaultOptions)e[o]=t&&o in t?t[o]:defaultOptions[o];return e}exports.__esModule=!0,exports.getOptions=getOptions;var defaultOptions={sourceType:"script",allowReserved:!0,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,plugins:{},features:{},strictMode:null};exports.defaultOptions=defaultOptions;

},{});

loadjs.d("babylon",function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function parse(e,r){return new _parser2["default"](r,e).parse()}exports.__esModule=!0,exports.parse=parse;var _parser=require("./parser"),_parser2=_interopRequireDefault(_parser);require("./parser/util"),require("./parser/statement"),require("./parser/lval"),require("./parser/expression"),require("./parser/node"),require("./parser/location"),require("./parser/comments");var _tokenizerTypes=require("./tokenizer/types");require("./tokenizer"),require("./tokenizer/context");var _pluginsFlow=require("./plugins/flow"),_pluginsFlow2=_interopRequireDefault(_pluginsFlow),_pluginsJsx=require("./plugins/jsx"),_pluginsJsx2=_interopRequireDefault(_pluginsJsx);_parser.plugins.flow=_pluginsFlow2["default"],_parser.plugins.jsx=_pluginsJsx2["default"],exports.tokTypes=_tokenizerTypes.types;

},{"./parser":693,"./parser/comments":691,"./parser/expression":692,"./parser/location":694,"./parser/lval":695,"./parser/node":696,"./parser/statement":697,"./parser/util":698,"./plugins/flow":699,"./plugins/jsx":700,"./tokenizer":703,"./tokenizer/context":702,"./tokenizer/types":705});
