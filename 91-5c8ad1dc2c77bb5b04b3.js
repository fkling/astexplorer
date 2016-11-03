webpackJsonp([91],{

/***/ "./node_modules/tern/lib/tern.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){return true?t(exports,__webpack_require__("./node_modules/tern/lib/infer.js"),__webpack_require__("./node_modules/tern/lib/signal.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/walk.js")):"function"==typeof define&&define.amd?define(["exports","./infer","./signal","acorn/dist/acorn","acorn/dist/walk"],t):void t(e.tern||(e.tern={}),tern,tern.signal,acorn,acorn.walk)}(this,function(e,t,n,r,i){"use strict";function o(e,t){this.name=e,this.parent=t,this.scope=this.text=this.ast=this.lineOffsets=null}function s(e,n){var r={directSourceFile:n,allowReturnOutsideFunction:!0,allowImportExportEverywhere:!0,ecmaVersion:e.options.ecmaVersion,allowHashBang:!0},i=e.signalReturnFirst("preParse",n.text,r)||n.text,o=t.parse(i,r);return e.signal("postParse",o,i),o}function a(e,n,r){e.text=r.options.stripCRs?n.replace(/\r\n/g,"\n"):n,t.withContext(r.cx,function(){e.ast=s(r,e)}),e.lineOffsets=null}function f(e,n,r){if(n.query&&!J.hasOwnProperty(n.query.type))return r("No query type '"+n.query.type+"' defined");var i=n.query;i||r(null,{});var o=n.files||[];o.length&&++e.uses;for(var s=0;s<o.length;++s){var a=o[s];a.name=e.normalizeFilename(a.name),"delete"==a.type?e.delFile(a.name):u(e,a.name,null,"full"==a.type?a.text:null)}var f="number"==typeof n.timeout?[n.timeout]:null;if(!i)return void c(e,f,function(){});var l=J[i.type];if(l.takesFile){if("string"!=typeof i.file)return r(".query.file must be a string");/^#/.test(i.file)||u(e,i.file,null)}c(e,f,function(n){if(n)return r(n);var s=l.takesFile&&v(e,o,i.file);return l.fullFile&&"part"==s.type?r("Can't run a "+i.type+" query on a file fragment"):(t.resetGuessing(),void t.withContext(e.cx,function(){var n,o=function(){n=l.run(e,i,s)};try{f?t.withTimeout(f[0],o):o()}catch(t){return e.options.debug&&"TernError"!=t.name&&console.error(t.stack),r(t)}r(null,n)}))})}function l(e,n){return t.withContext(e.cx,function(){n.scope=e.cx.topScope,e.signal("beforeLoad",n),t.analyze(n.ast,n.name,n.scope),e.signal("afterLoad",n)}),n}function u(e,t,n,r){var i=e.findFile(t);if(i)return null!=r&&(i.scope&&(e.needsPurge.push(t),i.scope=null),a(i,r,e)),void(x(e,i.parent)>x(e,n)&&(i.parent=n,i.excluded&&(i.excluded=null)));var s=new o(t,n);e.files.push(s),e.fileMap[t]=s,null!=r?a(s,r,e):e.options.async?(e.startAsyncAction(),e.options.getFile(t,function(t,n){a(s,n||"",e),e.finishAsyncAction(t)})):a(s,e.options.getFile(t)||"",e)}function p(e,t,n){var r=function(){e.off("everythingFetched",r),clearTimeout(i),c(e,t,n)};e.on("everythingFetched",r);var i=setTimeout(r,e.options.fetchTimeout)}function c(e,n,r){if(e.pending)return p(e,n,r);var i=e.fetchError;if(i)return e.fetchError=null,r(i);e.needsPurge.length>0&&t.withContext(e.cx,function(){t.purge(e.needsPurge),e.needsPurge.length=0});for(var o=!0,s=0;s<e.files.length;){for(var a=[];s<e.files.length;++s){var f=e.files[s];null==f.text?o=!1:null!=f.scope||f.excluded||a.push(f)}a.sort(function(t,n){return x(e,t.parent)-x(e,n.parent)});for(var u=0;u<a.length;u++){var f=a[u];if(f.parent&&!w(e,f))f.excluded=!0;else if(n){var c=+new Date;try{t.withTimeout(n[0],function(){l(e,f)})}catch(e){if(e instanceof t.TimedOut)return r(e);throw e}n[0]-=+new Date-c}else l(e,f)}}o?r():p(e,n,r)}function d(e){var t=e.indexOf("\n");return t<0?e:e.slice(0,t)}function h(e,t,n){var r=Math.max(0,n-500),i=null;if(!/^\s*$/.test(e))for(;;){var o=t.indexOf(e,r);if(o<0||o>n+500)break;(null==i||Math.abs(i-n)>Math.abs(o-n))&&(i=o),r=o+e.length}return i}function g(e){for(var t=0;e;++t,e=e.prev);return t}function y(e){var t=new Error(e);return t.name="TernError",t}function v(e,n,r){var o=r.match(/^#(\d+)$/);if(!o)return e.findFile(r);var a=n[o[1]];if(!a||"delete"==a.type)throw y("Reference to unknown file "+r);if("full"==a.type)return e.fileMap[a.name];var f=a.backing=e.fileMap[a.name],l=a.offset;a.offsetLines&&(l={line:a.offsetLines,ch:0}),a.offset=l=Y(f,null==a.offsetLines?a.offset:{line:a.offsetLines,ch:0},!0);var u,p,c=d(a.text),v=h(c,f.text,l),m=null==v?Math.max(0,f.text.lastIndexOf("\n",l)):v;return t.withContext(e.cx,function(){t.purge(a.name,m,m+a.text.length);var n,r=a.text;if(n=r.match(/(?:"([^"]*)"|([\w$]+))\s*:\s*function\b/)){var o=i.findNodeAround(a.backing.ast,m,"ObjectExpression");o&&o.node.objType&&(u={type:o.node.objType,prop:n[2]||n[1]})}if(v&&(n=c.match(/^(.*?)\bfunction\b/))){for(var l=n[1].length,d="",h=0;h<l;++h)d+=" ";a.text=d+r.slice(l),p=!0}var y=t.scopeAt(f.ast,m,f.scope),x=t.scopeAt(f.ast,m+r.length,f.scope),b=a.scope=g(y)<g(x)?x:y;a.ast=s(e,a),t.analyze(a.ast,a.name,b);e:if(u||p){var w=t.scopeAt(a.ast,c.length,y);if(!w.fnType)break e;if(u){var F=u.type.getProp(u.prop);F.addType(w.fnType)}else if(p){var O=t.scopeAt(f.ast,m+c.length,f.scope);if(O==y||!O.fnType)break e;var P=O.fnType,j=w.fnType;if(!j||j.name!=P.name&&P.name)break e;for(var h=0,A=Math.min(P.args.length,j.args.length);h<A;++h)P.args[h].propagate(j.args[h]);P.self.propagate(j.self),j.retval.propagate(P.retval)}}}),a}function m(e){var t=0;return i.simple(e,{Expression:function(){++t}}),t}function x(e,t){for(var n=0;t;)t=e.fileMap[t].parent,++n;return n}function b(e,t){for(;;){var n=e.fileMap[t.parent];if(!n.parent)break;t=n}return t.name}function w(e,t){var n=b(e,t),r=m(t.ast),i=e.budgets[n];return null==i&&(i=e.budgets[n]=e.options.dependencyBudget),!(i<r)&&(e.budgets[n]=i-r,!0)}function F(e){return"number"==typeof e||"object"==typeof e&&"number"==typeof e.line&&"number"==typeof e.ch}function O(e){if(e.query){if("string"!=typeof e.query.type)return".query.type must be a string";if(e.query.start&&!F(e.query.start))return".query.start must be a position";if(e.query.end&&!F(e.query.end))return".query.end must be a position"}if(e.files){if(!Array.isArray(e.files))return"Files property must be an array";for(var t=0;t<e.files.length;++t){var n=e.files[t];if("object"!=typeof n)return".files[n] must be objects";if("string"!=typeof n.name)return".files[n].name must be a string";if("delete"!=n.type){if("string"!=typeof n.text)return".files[n].text must be a string";if("part"==n.type){if(!F(n.offset)&&"number"!=typeof n.offsetLines)return".files[n].offset must be a position"}else if("full"!=n.type)return'.files[n].type must be "full" or "part"'}}}}function P(e,t){for(var n=e.text,r=e.lineOffsets||(e.lineOffsets=[0]),i=0,o=0,s=Math.min(Math.floor(t/X),r.length-1),i=r[s],o=s*X;o<t;){if(++o,i=n.indexOf("\n",i)+1,0===i)return null;o%X===0&&r.push(i)}return i}function j(e,t){if(!e)return{line:0,ch:0};for(var n,r,i=e.lineOffsets||(e.lineOffsets=[0]),o=e.text,s=i.length-1;s>=0;--s)i[s]<=t&&(n=s*X,r=i[s]);for(;;){var a=o.indexOf("\n",r);if(a>=t||a<0)break;r=a+1,++n}return{line:n,ch:t-r}}function A(e){for(var t in e)null==e[t]&&delete e[t];return e}function k(e,t,n){null!=n&&(e[t]=n)}function C(e,t){"string"!=typeof e&&(e=e.name,t=t.name);var n=/^[A-Z]/.test(e),r=/^[A-Z]/.test(t);return n==r?e<t?-1:e==t?0:1:n?1:-1}function T(e,t,n){return"Literal"==e.type&&"string"==typeof e.value&&e.start==t-1&&e.end<=n+1}function M(e,t){for(var n=0;n<e.properties.length;n++){var r=e.properties[n];if(r.key.start<=t&&r.key.end>=t)return r}}function q(e,n,i){function o(t,r,i,o){if((!x&&n.omitObjectPrototype===!1||r!=e.cx.protos.Object||p)&&!(n.filter!==!1&&p&&0!==(n.caseInsensitive?t.toLowerCase():t).indexOf(p)||u&&u.props[t])){var s=ne(n,c,t,r&&r.props[t],i);o&&s&&"string"!=typeof s&&o(s)}}if(null==n.end)throw y("missing .query.end field");var s=e.signalReturnFirst("completion",i,n);if(s)return s;for(var a=Y(i,n.end),f=a,l=i.text;a&&r.isIdentifierChar(l.charCodeAt(a-1));)--a;if(n.expandWordForward!==!1)for(;f<l.length&&r.isIdentifierChar(l.charCodeAt(f));)++f;var u,p=l.slice(a,f),c=[];n.caseInsensitive&&(p=p.toLowerCase());var d,h,g,v,m,x,b=t.findExpressionAround(i.ast,null,a,i.scope);if(b){var w=b.node;if(n.inLiteral===!1&&"Literal"===w.type&&("string"==typeof w.value||w.regex))return{start:_(n,i,a),end:_(n,i,f),completions:[]};if("MemberExpression"==w.type&&w.object.end<a)m=b;else if(T(w,a,f)){var F=t.parentNode(w,i.ast);"MemberExpression"==F.type&&F.property==w&&(m={node:F,state:b.state})}else if("ObjectExpression"==w.type){var O=M(w,f);O?(x=b,h=v=O.key.name):p||/:\s*$/.test(i.text.slice(0,a))||(x=b,h=v=!0)}}if(x)g=t.typeFromContext(i.ast,x),u=x.node.objType;else if(m)h=m.node.property,h="Literal"==h.type?h.value.slice(1):h.name,m.node=m.node.object,g=t.expressionType(m);else if("."==l.charAt(a-1)){for(var P=a-1;P&&("."==l.charAt(P-1)||r.isIdentifierChar(l.charCodeAt(P-1)));)P--;var j=l.slice(P,a-1);j&&(g=t.def.parsePath(j,i.scope).getObjType(),h=p)}if(null!=h){if(e.cx.completingProperty=h,g&&t.forAllPropertiesOf(g,o),!c.length&&n.guess!==!1&&g&&g.guessProperties&&g.guessProperties(function(e,t,n){e!=h&&"✖"!=e&&o(e,t,n)}),!c.length&&p.length>=2&&n.guess!==!1)for(var h in e.cx.props)o(h,e.cx.props[h][0],0);d="memberCompletion"}else t.forAllLocalsAt(i.ast,a,i.scope,o),n.includeKeywords&&(e.options.ecmaVersion>=6?te:ee).forEach(function(e){o(e,null,0,function(e){e.isKeyword=!0})}),d="variableCompletion";return e.signal(d,i,a,f,o),n.sort!==!1&&c.sort(C),e.cx.completingProperty=null,{start:_(n,i,a),end:_(n,i,f),isProperty:!!h,isObjectKey:!!v,completions:c}}function E(e,t){var n=t.prefix,r=[];for(var i in e.cx.props)"<i>"==i||n&&0!==i.indexOf(n)||r.push(i);return t.sort!==!1&&r.sort(C),{completions:r}}function N(e,t){var n,r,i=e.body;return!!i&&(Array.isArray(i)?(n=i[0].start,r=i[i.length-1].end):(n=i.start,r=i.end),n<=t&&r>=t)}function L(e,t,n){var r=re(e,t,n);if(r)return r;throw y("No expression at the given position.")}function D(e){return e&&(e=e.getType())&&e instanceof t.Obj?e:null}function R(e,n,r,i){var o;i&&(t.resetGuessing(),o=t.expressionType(i));var s=e.hasHandler("typeAt");if(s)for(var a=Y(r,n.end),f=0;f<s.length;f++)o=s[f](r,a,i,o);if(!o)throw y("No type found at the given position.");var l;if("ObjectExpression"==i.node.type&&null!=n.end&&(l=M(i.node,Y(r,n.end)))){var u=l.key.name,p=D(t.typeFromContext(r.ast,i));if(p&&p.hasProp(u))o=p.hasProp(u);else{var c=D(o);c&&c.hasProp(u)&&(o=c.hasProp(u))}}return o}function I(e,n,r){var i,o=re(r,n),s=R(e,n,r,o),a=s;if(s=n.preferFunction?s.getFunctionType()||s.getType():s.getType(),o&&("Identifier"==o.node.type?i=o.node.name:"MemberExpression"!=o.node.type||o.node.computed?"MethodDefinition"!=o.node.type||o.node.computed||(i=o.node.key.name):i=o.node.property.name),null!=n.depth&&"number"!=typeof n.depth)throw y(".query.depth must be a number");var f={guess:t.didGuess(),type:t.toString(a,n.depth),name:s&&s.name,exprName:i,doc:a.doc,url:a.url};return s&&G(n,s,f),A(f)}function S(e,t){if(!t)return null;if("full"==e.docFormat)return t;var n=/.\n[\s@\n]/.exec(t);if(n&&(t=t.slice(0,n.index+1)),t=t.replace(/\n\s*/g," "),t.length<100)return t;var r=/[\.!?] [A-Z]/g;r.lastIndex=80;var i=r.exec(t);return i&&(t=t.slice(0,i.index+1)),t}function z(e,n,r){var i=re(r,n),o=R(e,n,r,i),s={url:o.url,doc:S(n,o.doc),type:t.toString(o)},a=o.getType();return a&&G(n,a,s),A(s)}function G(e,n,r){r.url||(r.url=n.url),r.doc||(r.doc=S(e,n.doc)),r.origin||(r.origin=n.origin);var i,o=t.cx().protos;!r.url&&!r.doc&&n.proto&&(i=n.proto.hasCtor)&&n.proto!=o.Object&&n.proto!=o.Function&&n.proto!=o.Array&&(r.url=i.url,r.doc=S(e,i.doc))}function $(e,n,r){var i=re(r,n),o=R(e,n,r,i);if(t.didGuess())return{};var s=ie(o),a={url:o.url,doc:S(n,o.doc),origin:o.origin};if(o.types)for(var f=o.types.length-1;f>=0;--f){var l=o.types[f];G(n,l,a),s||(s=ie(l))}if(s&&s.node){var u=s.node.sourceFile||e.fileMap[s.origin],p=_(n,u,s.node.start),c=_(n,u,s.node.end);a.start=p,a.end=c,a.file=s.origin;var d=Math.max(0,s.node.start-50);a.contextOffset=s.node.start-d,a.context=u.text.slice(d,d+50)}else s&&(a.file=s.origin,oe(e,n,s,a));return A(a)}function V(e,n,r,i,o){function s(e){return function(t,r,i){var s={file:e.name,start:_(n,e,t.start),end:_(n,e,t.end)};if(o){for(var l=r;l!=f;l=l.prev){var p=l.hasProp(o);if(p)throw y("Renaming `"+a+"` to `"+o+"` would make a variable at line "+(j(e,t.start).line+1)+" point to the definition at line "+(j(e,p.name.start).line+1))}var c=i[i.length-2];c&&"Property"==c.type&&c.key==c.value&&(s.isShorthand=!0)}u.push(s)}}for(var a=i.node.name,f=i.state;f&&!(a in f.props);f=f.prev);if(!f)throw y("Could not find a definition for "+a);var l,u=[];if(f.originNode){if(l="local",o){for(var p=f.prev;p&&!(o in p.props);p=p.prev);p&&t.findRefs(f.originNode,f,o,p,function(e){throw y("Renaming `"+a+"` to `"+o+"` would shadow the definition used at line "+(j(r,e.start).line+1))})}t.findRefs(f.originNode,f,a,f,s(r))}else if(l="global",n.onlySourceFile)t.findRefs(r.ast,r.scope,a,f,s(r));else for(var c=0;c<e.files.length;++c){var d=e.files[c];t.findRefs(d.ast,d.scope,a,f,s(d))}return{refs:u,type:l,name:a}}function B(e,n,r,i,o){function s(e){return function(t){l.push({file:e.name,start:_(n,e,t.start),end:_(n,e,t.end)})}}var a=t.expressionType(i);"MethodDefinition"==i.node.type&&(a=a.propertyOf);var f=a.getObjType();if(!f)throw y("Couldn't determine type of base object.");var l=[];if(n.onlySourceFile)t.findPropRefs(r.ast,r.scope,f,o.name,s(r));else for(var u=0;u<e.files.length;++u){var p=e.files[u];t.findPropRefs(p.ast,p.scope,f,o.name,s(p))}return{refs:l,name:o.name}}function K(e,t,n){var r=L(n,t,!0);if(r&&"Identifier"==r.node.type)return V(e,t,n,r);if(r&&"MemberExpression"==r.node.type&&!r.node.computed){var i=r.node.property;return r.node=r.node.object,B(e,t,n,r,i)}if(r&&"ObjectExpression"==r.node.type)for(var o=Y(n,t.end),s=0;s<r.node.properties.length;++s){var a=r.node.properties[s].key;if(a.start<=o&&a.end>=o)return B(e,t,n,r,a)}else if(r&&"MethodDefinition"==r.node.type){var i=r.node.key;return B(e,t,n,r,i)}throw y("Not at a variable or property name.")}function Z(e,t,n){if("string"!=typeof t.newName)throw y(".query.newName should be a string");var r=L(n,t);if(!r||"Identifier"!=r.node.type)throw y("Not at a variable.");var i=V(e,t,n,r,t.newName),o=i.refs;delete i.refs,i.files=e.files.map(function(e){return e.name});for(var s=i.changes=[],a=0;a<o.length;++a){var f=o[a];f.isShorthand?f.text=r.node.name+": "+t.newName:f.text=t.newName,s.push(f)}return i}function H(e){return{files:e.files.map(function(e){return e.name})}}var Q=Object.create(null);e.registerPlugin=function(e,t){Q[e]=t};var W=e.defaultOptions={debug:!1,async:!1,getFile:function(e,t){this.async&&t(null,null)},normalizeFilename:function(e){return e},defs:[],plugins:{},fetchTimeout:1e3,dependencyBudget:2e4,reuseInstances:!0,stripCRs:!1,ecmaVersion:6,projectDir:"/",parent:null},J={completions:{takesFile:!0,run:q},properties:{run:E},type:{takesFile:!0,run:I},documentation:{takesFile:!0,run:z},definition:{takesFile:!0,run:$},refs:{takesFile:!0,fullFile:!0,run:K},rename:{takesFile:!0,fullFile:!0,run:Z},files:{run:H}};e.defineQueryType=function(e,t){J[e]=t},o.prototype.asLineChar=function(e){return j(this,e)};var U=e.Server=function(e){this.cx=null,this.options=e||{};for(var t in W)e.hasOwnProperty(t)||(e[t]=W[t]);this.projectDir=e.projectDir.replace(/\\/g,"/"),/\/$/.test(this.projectDir)||(this.projectDir+="/"),this.parent=e.parent,this.handlers=Object.create(null),this.files=[],this.fileMap=Object.create(null),this.needsPurge=[],this.budgets=Object.create(null),this.uses=0,this.pending=0,this.asyncError=null,this.mod={},this.defs=e.defs.slice(0),this.plugins=Object.create(null);for(var n in e.plugins)e.plugins.hasOwnProperty(n)&&this.loadPlugin(n,e.plugins[n]);this.reset()};U.prototype=n.mixin({addFile:function(e,t,n){!n||n in this.fileMap||(n=null),e in this.fileMap||(e=this.normalizeFilename(e)),u(this,e,n,t)},delFile:function(e){var t=this.findFile(e);if(t){this.needsPurge.push(t.name);for(var n=0;n<this.files.length;n++)this.files[n]==t?this.files.splice(n--,1):this.files[n].parent==e&&(this.files[n].parent=null);delete this.fileMap[t.name]}},reset:function(){this.signal("reset"),this.cx=new t.Context(this.defs,this),this.uses=0,this.budgets=Object.create(null);for(var e=0;e<this.files.length;++e){var n=this.files[e];n.scope=null}this.signal("postReset")},request:function(e,t){var n=O(e);if(n)return t(n);var r=this;f(this,e,function(e,n){t(e,n),r.uses>40&&(r.reset(),c(r,null,function(){}))})},findFile:function(e){return this.fileMap[this.normalizeFilename(e)]},flush:function(e){var n=this.cx;c(this,null,function(r){return r?e(r):void t.withContext(n,e)})},startAsyncAction:function(){++this.pending},finishAsyncAction:function(e){e&&(this.asyncError=e),0===--this.pending&&this.signal("everythingFetched")},addDefs:function(e,t){t?this.defs.unshift(e):this.defs.push(e),this.cx&&this.reset()},deleteDefs:function(e){for(var t=0;t<this.defs.length;t++)if(this.defs[t]["!name"]==e)return this.defs.splice(t,1),void(this.cx&&this.reset())},loadPlugin:function(e,t){if(1==arguments.length&&(t=this.options.plugins[e]||!0),!(e in this.plugins)&&e in Q&&t){this.plugins[e]=!0;var n=Q[e](this,t);if(n&&(n.defs&&this.addDefs(n.defs,n.loadFirst),n.passes))for(var r in n.passes)n.passes.hasOwnProperty(r)&&this.on(r,n.passes[r])}},normalizeFilename:function(e){var t=this.options.normalizeFilename(e).replace(/\\/g,"/");return 0==t.indexOf(this.projectDir)&&(t=t.slice(this.projectDir.length)),t}});var X=25,Y=e.resolvePos=function(e,t,n){if("number"!=typeof t){var r=P(e,t.line);if(null==r){if(!n)throw y("File doesn't contain a line "+t.line);t=e.text.length}else t=r+t.ch}if(t>e.text.length){if(!n)throw y("Position "+t+" is outside of file.");t=e.text.length}return t},_=e.outputPos=function(e,t,n){if(e.lineCharPositions){var r=j(t,n);return"part"==t.type&&(r.line+=null!=t.offsetLines?t.offsetLines:j(t.backing,t.offset).line),r}return n+("part"==t.type?t.offset:0)},ee="break do instanceof typeof case else new var catch finally return void continue for switch while debugger function this with default if throw delete in try".split(" "),te=ee.concat("export class extends const super yield import let static".split(" ")),ne=e.addCompletion=function(e,n,r,i,o){for(var s=e.types||e.docs||e.urls||e.origins,a=s||e.depths,f=0;f<n.length;++f){var l=n[f];if((a?l.name:l)==r)return}var u=a?{name:r}:r;if(n.push(u),i&&s){t.resetGuessing();var p=i.getType();u.guess=t.didGuess(),e.types&&(u.type=t.toString(i)),e.docs&&k(u,"doc",S(e,i.doc||p&&p.doc)),e.urls&&k(u,"url",i.url||p&&p.url),e.origins&&k(u,"origin",i.origin||p&&p.origin)}return e.depths&&(u.depth=o||0),u},re=e.findQueryExpr=function(e,n,r){if(null==n.end)throw y("missing .query.end field");if(n.variable){var i=t.scopeAt(e.ast,Y(e,n.end),e.scope);return{node:{type:"Identifier",name:n.variable,start:n.end,end:n.end+1},state:i}}var o=n.start&&Y(e,n.start),s=Y(e,n.end),a=t.findExpressionAt(e.ast,o,s,e.scope);if(!a){var f=t.findExpressionAround(e.ast,o,s,e.scope);f&&!N(f.node,s)&&("ObjectExpression"==f.node.type||r||(null==o?s:o)-f.node.start<20||f.node.end-s<20)&&(a=f)}return a},ie=e.getSpan=function(e){if(e.origin){if(e.originNode){var t=e.originNode;return/^Function/.test(t.type)&&t.id&&(t=t.id),{origin:e.origin,node:t}}return e.span?{origin:e.origin,span:e.span}:void 0}},oe=e.storeSpan=function(e,t,n,r){if(r.origin=n.origin,n.span){var i=/^(\d+)\[(\d+):(\d+)\]-(\d+)\[(\d+):(\d+)\]$/.exec(n.span);r.start=t.lineCharPositions?{line:Number(i[2]),ch:Number(i[3])}:Number(i[1]),r.end=t.lineCharPositions?{line:Number(i[5]),ch:Number(i[6])}:Number(i[4])}else{var o=e.fileMap[n.origin];r.start=_(t,o,n.node.start),r.end=_(t,o,n.node.end)}};e.version="0.20.0"});

/***/ },

/***/ "./node_modules/tern/defs/ecmascript.json":
/***/ function(module, exports) {

	module.exports = {
		"!name": "ecmascript",
		"!define": {
			"Error.prototype": "Error.prototype",
			"propertyDescriptor": {
				"enumerable": "bool",
				"configurable": "bool",
				"value": "?",
				"writable": "bool",
				"get": "fn() -> ?",
				"set": "fn(value: ?)"
			},
			"Promise.prototype": {
				"catch": {
					"!doc": "The catch() method returns a Promise and deals with rejected cases only. It behaves the same as calling Promise.prototype.then(undefined, onRejected).",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch",
					"!type": "fn(onRejected: fn(reason: ?)) -> !this"
				},
				"then": {
					"!doc": "The then() method returns a Promise. It takes two arguments, both are callback functions for the success and failure cases of the Promise.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then",
					"!type": "fn(onFulfilled: fn(value: ?), onRejected: fn(reason: ?)) -> !custom:Promise_then",
					"!effects": [
						"call !0 !this.:t"
					]
				}
			},
			"Promise_reject": {
				"!type": "fn(reason: ?) -> !this",
				"!doc": "The Promise.reject(reason) method returns a Promise object that is rejected with the given reason.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject"
			},
			"iter_prototype": {
				":Symbol.iterator": "fn() -> !this"
			},
			"iter": {
				"!proto": "iter_prototype",
				"next": {
					"!type": "fn() -> +iter_result[value=!this.:t]",
					"!doc": "Return the next item in the sequence.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators"
				},
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators"
			},
			"iter_result": {
				"done": "bool",
				"value": "?"
			},
			"generator_prototype": {
				"!proto": "iter_prototype",
				"next": "fn(value?: ?) -> iter_result",
				"return": "fn(value?: ?) -> iter_result",
				"throw": "fn(exception: +Error)"
			},
			"Proxy_handler": {
				"!doc": "The proxy's handler object is a placeholder object which contains traps for proxies.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler",
				"getPrototypeOf": "fn(target: ?)",
				"setPrototypeOf": "fn(target: ?, prototype: ?)",
				"isExtensible": "fn(target: ?)",
				"preventExtensions": "fn(target: ?)",
				"getOwnPropertyDescriptor": "fn(target: ?, property: string) -> propertyDescriptor",
				"defineProperty": "fn(target: ?, property: string, descriptor: propertyDescriptor)",
				"has": "fn(target: ?, property: string)",
				"get": "fn(target: ?, property: string)",
				"set": "fn(target: ?, property: string, value: ?)",
				"deleteProperty": "fn(target: ?, property: string)",
				"enumerate": "fn(target: ?)",
				"ownKeys": "fn(target: ?)",
				"apply": "fn(target: ?, self: ?, arguments: [?])",
				"construct": "fn(target: ?, arguments: [?])"
			},
			"Proxy_revocable": {
				"proxy": "+Proxy",
				"revoke": "fn()"
			},
			"TypedArray": {
				"!type": "fn(size: number)",
				"!doc": "A TypedArray object describes an array-like view of an underlying binary data buffer. There is no global property named TypedArray, nor is there a directly visible TypedArray constructor.  Instead, there are a number of different global properties, whose values are typed array constructors for specific element types, listed below. On the following pages you will find common properties and methods that can be used with any typed array containing elements of any type.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray",
				"from": {
					"!type": "fn(arrayLike: ?, mapFn?: fn(elt: ?, i: number) -> number, thisArg?: ?) -> +TypedArray",
					"!effects": [
						"call !1 this=!2 !0.<i> number"
					],
					"!doc": "Creates a new typed array from an array-like or iterable object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from"
				},
				"of": {
					"!type": "fn(elements: number) -> +TypedArray",
					"!doc": "Creates a new typed array from a variable number of arguments.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/of"
				},
				"BYTES_PER_ELEMENT": {
					"!type": "number",
					"!doc": "The TypedArray.BYTES_PER_ELEMENT property represents the size in bytes of each element in an typed array.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT"
				},
				"name": {
					"!type": "string",
					"!doc": "The TypedArray.name property represents a string value of the typed array constructor name.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/name"
				},
				"prototype": {
					"<i>": "number",
					"buffer": {
						"!type": "+ArrayBuffer",
						"!doc": "The buffer accessor property represents the ArrayBuffer referenced by a TypedArray at construction time.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer"
					},
					"byteLength": {
						"!type": "number",
						"!doc": "The byteLength accessor property represents the length (in bytes) of a typed array from the start of its ArrayBuffer.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteLength"
					},
					"byteOffset": {
						"!type": "number",
						"!doc": "The byteOffset accessor property represents the offset (in bytes) of a typed array from the start of its ArrayBuffer.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/byteOffset"
					},
					"copyWithin": {
						"!type": "fn(target: number, start: number, end?: number) -> ?",
						"!doc": "The copyWithin() method copies the sequence of array elements within the array to the position starting at target. The copy is taken from the index positions of the second and third arguments start and end. The end argument is optional and defaults to the length of the array. This method has the same algorithm as Array.prototype.copyWithin. TypedArray is one of the typed array types here.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/copyWithin"
					},
					"entries": {
						"!type": "fn() -> +iter[:t=number]",
						"!doc": "The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/entries"
					},
					"every": {
						"!type": "fn(callback: fn(element: number, index: number, array: TypedArray) -> bool, thisArg?: ?) -> bool",
						"!effects": [
							"call !0 this=!1 number number !this"
						],
						"!doc": "The every() method tests whether all elements in the typed array pass the test implemented by the provided function. This method has the same algorithm as Array.prototype.every(). TypedArray is one of the typed array types here.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/every"
					},
					"fill": {
						"!type": "fn(value: number, start?: number, end?: number)",
						"!doc": "The fill() method fills all the elements of a typed array from a start index to an end index with a static value. This method has the same algorithm as Array.prototype.fill(). TypedArray is one of the typed array types here.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/fill"
					},
					"filter": {
						"!type": "fn(test: fn(element: number, i: number) -> bool, context?: ?) -> !this",
						"!effects": [
							"call !0 this=!1 number number"
						],
						"!doc": "Creates a new array with all of the elements of this array for which the provided filtering function returns true. See also Array.prototype.filter().",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/filter"
					},
					"find": {
						"!type": "fn(callback: fn(element: number, index: number, array: +TypedArray) -> bool, thisArg?: ?) -> number",
						"!effects": [
							"call !0 this=!1 number number !this"
						],
						"!doc": "The find() method returns a value in the typed array, if an element satisfies the provided testing function. Otherwise undefined is returned. TypedArray is one of the typed array types here.\nSee also the findIndex() method, which returns the index of a found element in the typed array instead of its value.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/find"
					},
					"findIndex": {
						"!type": "fn(callback: fn(element: number, index: number, array: +TypedArray) -> bool, thisArg?: ?) -> number",
						"!effects": [
							"call !0 this=!1 number number !this"
						],
						"!doc": "The findIndex() method returns an index in the typed array, if an element in the typed array satisfies the provided testing function. Otherwise -1 is returned.\nSee also the find() method, which returns the value of a found element in the typed array instead of its index.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findIndex"
					},
					"forEach": {
						"!type": "fn(callback: fn(value: number, key: number, array: +TypedArray), thisArg?: ?)",
						"!effects": [
							"call !0 this=!1 number number !this"
						],
						"!doc": "Executes a provided function once per array element.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/forEach"
					},
					"indexOf": {
						"!type": "fn(searchElement: number, fromIndex?: number) -> number",
						"!doc": "The indexOf() method returns the first index at which a given element can be found in the typed array, or -1 if it is not present. This method has the same algorithm as Array.prototype.indexOf(). TypedArray is one of the typed array types here.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/indexOf"
					},
					"join": {
						"!type": "fn(separator?: string) -> string",
						"!doc": "The join() method joins all elements of an array into a string. This method has the same algorithm as Array.prototype.join(). TypedArray is one of the typed array types here.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/join"
					},
					"keys": {
						"!type": "fn() -> +iter[:t=number]",
						"!doc": "The keys() method returns a new Array Iterator object that contains the keys for each index in the array.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/keys"
					},
					"lastIndexOf": {
						"!type": "fn(searchElement: number, fromIndex?: number) -> number",
						"!doc": "The lastIndexOf() method returns the last index at which a given element can be found in the typed array, or -1 if it is not present. The typed array is searched backwards, starting at fromIndex. This method has the same algorithm as Array.prototype.lastIndexOf(). TypedArray is one of the typed array types here.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/lastIndexOf"
					},
					"length": {
						"!type": "number",
						"!doc": "Returns the number of elements hold in the typed array. Fixed at construction time and thus read only.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/length"
					},
					"map": {
						"!type": "fn(f: fn(element: number, i: number) -> number, context?: ?) -> +TypedArray",
						"!effects": [
							"call !0 this=!1 number number"
						],
						"!doc": "Creates a new array with the results of calling a provided function on every element in this array. See also Array.prototype.map().",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map"
					},
					"reduce": {
						"!type": "fn(combine: fn(sum: ?, elt: number, i: number) -> ?, init?: ?) -> !0.!ret",
						"!effects": [
							"call !0 !1 number number"
						],
						"!doc": "Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value. See also Array.prototype.reduce().",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduce"
					},
					"reduceRight": {
						"!type": "fn(combine: fn(sum: ?, elt: number, i: number) -> ?, init?: ?) -> !0.!ret",
						"!effects": [
							"call !0 !1 number number"
						],
						"!doc": "Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value. See also Array.prototype.reduceRight().",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reduceRight"
					},
					"reverse": {
						"!type": "fn()",
						"!doc": "The reverse() method reverses a typed array in place. The first typed array element becomes the last and the last becomes the first. This method has the same algorithm as Array.prototype.reverse(). TypedArray is one of the typed array types here.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/reverse"
					},
					"set": {
						"!type": "fn(array: [number], offset?: number)",
						"!doc": "The set() method stores multiple values in the typed array, reading input values from a specified array.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set"
					},
					"slice": {
						"!type": "fn(from: number, to?: number) -> +TypedArray",
						"!doc": "Extracts a section of an array and returns a new array. See also Array.prototype.slice().",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice"
					},
					"some": {
						"!type": "fn(test: fn(elt: number, i: number) -> bool, context?: ?) -> bool",
						"!effects": [
							"call !0 this=!1 number number"
						],
						"!doc": "The some() method tests whether some element in the typed array passes the test implemented by the provided function. This method has the same algorithm as Array.prototype.some(). TypedArray is one of the typed array types here.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/some"
					},
					"sort": {
						"!type": "fn(compare?: fn(a: number, b: number) -> number)",
						"!effects": [
							"call !0 number number"
						],
						"!doc": "Sorts the elements of an array in place and returns the array. See also Array.prototype.sort().",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort"
					},
					"subarray": {
						"!type": "fn(begin?: number, end?: number) -> +TypedArray",
						"!doc": "The subarray() method returns a new TypedArray on the same ArrayBuffer store and with the same element types as for this TypedArray object. The begin offset is inclusive and the end offset is exclusive. TypedArray is one of the typed array types.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray"
					},
					"values": {
						"!type": "fn() -> +iter[:t=number]",
						"!doc": "The values() method returns a new Array Iterator object that contains the values for each index in the array.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/values"
					},
					":Symbol.iterator": {
						"!type": "fn() -> +iter[:t=number]",
						"!doc": "Returns a new Array Iterator object that contains the values for each index in the array.",
						"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/@@iterator"
					}
				}
			}
		},
		"Infinity": {
			"!type": "number",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Infinity",
			"!doc": "A numeric value representing infinity."
		},
		"undefined": {
			"!type": "?",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/undefined",
			"!doc": "The value undefined."
		},
		"NaN": {
			"!type": "number",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/NaN",
			"!doc": "A value representing Not-A-Number."
		},
		"Object": {
			"!type": "fn()",
			"getPrototypeOf": {
				"!type": "fn(obj: ?) -> ?",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getPrototypeOf",
				"!doc": "Returns the prototype (i.e. the internal prototype) of the specified object."
			},
			"create": {
				"!type": "fn(proto: ?) -> !custom:Object_create",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create",
				"!doc": "Creates a new object with the specified prototype object and properties."
			},
			"defineProperty": {
				"!type": "fn(obj: ?, prop: string, desc: propertyDescriptor) -> !custom:Object_defineProperty",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty",
				"!doc": "Defines a new property directly on an object, or modifies an existing property on an object, and returns the object. If you want to see how to use the Object.defineProperty method with a binary-flags-like syntax, see this article."
			},
			"defineProperties": {
				"!type": "fn(obj: ?, props: ?) -> !custom:Object_defineProperties",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty",
				"!doc": "Defines a new property directly on an object, or modifies an existing property on an object, and returns the object. If you want to see how to use the Object.defineProperty method with a binary-flags-like syntax, see this article."
			},
			"getOwnPropertyDescriptor": {
				"!type": "fn(obj: ?, prop: string) -> propertyDescriptor",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor",
				"!doc": "Returns a property descriptor for an own property (that is, one directly present on an object, not present by dint of being along an object's prototype chain) of a given object."
			},
			"keys": {
				"!type": "fn(obj: ?) -> [string]",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys",
				"!doc": "Returns an array of a given object's own enumerable properties, in the same order as that provided by a for-in loop (the difference being that a for-in loop enumerates properties in the prototype chain as well)."
			},
			"getOwnPropertyNames": {
				"!type": "fn(obj: ?) -> [string]",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames",
				"!doc": "Returns an array of all properties (enumerable or not) found directly upon a given object."
			},
			"seal": {
				"!type": "fn(obj: ?)",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/seal",
				"!doc": "Seals an object, preventing new properties from being added to it and marking all existing properties as non-configurable. Values of present properties can still be changed as long as they are writable."
			},
			"isSealed": {
				"!type": "fn(obj: ?) -> bool",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/isSealed",
				"!doc": "Determine if an object is sealed."
			},
			"freeze": {
				"!type": "fn(obj: ?) -> !0",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/freeze",
				"!doc": "Freezes an object: that is, prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed. In essence the object is made effectively immutable. The method returns the object being frozen."
			},
			"isFrozen": {
				"!type": "fn(obj: ?) -> bool",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/isFrozen",
				"!doc": "Determine if an object is frozen."
			},
			"preventExtensions": {
				"!type": "fn(obj: ?)",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions",
				"!doc": "Prevents new properties from ever being added to an object."
			},
			"isExtensible": {
				"!type": "fn(obj: ?) -> bool",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible",
				"!doc": "The Object.isExtensible() method determines if an object is extensible (whether it can have new properties added to it)."
			},
			"assign": {
				"!type": "fn(target: ?, source: ?, source?: ?) -> !0",
				"!effects": [
					"copy !1 !0"
				],
				"!doc": "The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign"
			},
			"getOwnPropertySymbols": {
				"!type": "fn(obj: ?) -> !custom:getOwnPropertySymbols",
				"!doc": "The Object.getOwnPropertySymbols() method returns an array of all symbol properties found directly upon a given object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols"
			},
			"is": {
				"!type": "fn(value1: ?, value2: ?) -> bool",
				"!doc": "The Object.is() method determines whether two values are the same value.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is"
			},
			"setPrototypeOf": {
				"!type": "fn(obj: ?, prototype: ?)",
				"!doc": "The Object.setPrototype() method sets the prototype (i.e., the internal [[Prototype]] property) of a specified object to another object or null.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf"
			},
			"prototype": {
				"!stdProto": "Object",
				"toString": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/toString",
					"!doc": "Returns a string representing the object."
				},
				"toLocaleString": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/toLocaleString",
					"!doc": "Returns a string representing the object. This method is meant to be overriden by derived objects for locale-specific purposes."
				},
				"valueOf": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/valueOf",
					"!doc": "Returns the primitive value of the specified object"
				},
				"hasOwnProperty": {
					"!type": "fn(prop: string) -> bool",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/hasOwnProperty",
					"!doc": "Returns a boolean indicating whether the object has the specified property."
				},
				"propertyIsEnumerable": {
					"!type": "fn(prop: string) -> bool",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable",
					"!doc": "Returns a Boolean indicating whether the specified property is enumerable."
				},
				"isPrototypeOf": {
					"!type": "fn(obj: ?) -> bool",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isPrototypeOf",
					"!doc": "Tests for an object in another object's prototype chain."
				}
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object",
			"!doc": "Creates an object wrapper."
		},
		"Function": {
			"!type": "fn(body: string) -> fn()",
			"prototype": {
				"!stdProto": "Function",
				"apply": {
					"!type": "fn(this: ?, args: [?])",
					"!effects": [
						"call and return !this this=!0 !1.<i> !1.<i> !1.<i>"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/apply",
					"!doc": "Calls a function with a given this value and arguments provided as an array (or an array like object)."
				},
				"call": {
					"!type": "fn(this: ?, args?: ?) -> !this.!ret",
					"!effects": [
						"call and return !this this=!0 !1 !2 !3 !4"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call",
					"!doc": "Calls a function with a given this value and arguments provided individually."
				},
				"bind": {
					"!type": "fn(this: ?, args?: ?) -> !custom:Function_bind",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind",
					"!doc": "Creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function was called."
				},
				"prototype": "?"
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function",
			"!doc": "Every function in JavaScript is actually a Function object."
		},
		"Array": {
			"!type": "fn(size: number) -> !custom:Array_ctor",
			"isArray": {
				"!type": "fn(value: ?) -> bool",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/isArray",
				"!doc": "Returns true if an object is an array, false if it is not."
			},
			"from": {
				"!type": "fn(arrayLike: ?, mapFn?: fn(elt: ?, i: number) -> ?, thisArg?: ?) -> [!0.<i>]",
				"!effects": [
					"call !1 this=!2 !0.<i> number"
				],
				"!doc": "The Array.from() method creates a new Array instance from an array-like or iterable object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from"
			},
			"of": {
				"!type": "fn(elementN: ?) -> [!0]",
				"!doc": "The Array.of() method creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of"
			},
			"prototype": {
				"!stdProto": "Array",
				"length": {
					"!type": "number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/length",
					"!doc": "An unsigned, 32-bit integer that specifies the number of elements in an array."
				},
				"concat": {
					"!type": "fn(other: [?]) -> !this",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/concat",
					"!doc": "Returns a new array comprised of this array joined with other array(s) and/or value(s)."
				},
				"join": {
					"!type": "fn(separator?: string) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/join",
					"!doc": "Joins all elements of an array into a string."
				},
				"splice": {
					"!type": "fn(pos: number, amount: number, newelt?: ?) -> [?]",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/splice",
					"!doc": "Changes the content of an array, adding new elements while removing old elements."
				},
				"pop": {
					"!type": "fn() -> !this.<i>",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/pop",
					"!doc": "Removes the last element from an array and returns that element."
				},
				"push": {
					"!type": "fn(newelt: ?) -> number",
					"!effects": [
						"propagate !0 !this.<i>"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/push",
					"!doc": "Mutates an array by appending the given elements and returning the new length of the array."
				},
				"shift": {
					"!type": "fn() -> !this.<i>",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/shift",
					"!doc": "Removes the first element from an array and returns that element. This method changes the length of the array."
				},
				"unshift": {
					"!type": "fn(newelt: ?) -> number",
					"!effects": [
						"propagate !0 !this.<i>"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/unshift",
					"!doc": "Adds one or more elements to the beginning of an array and returns the new length of the array."
				},
				"slice": {
					"!type": "fn(from?: number, to?: number) -> !this",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/slice",
					"!doc": "Returns a shallow copy of a portion of an array."
				},
				"reverse": {
					"!type": "fn()",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/reverse",
					"!doc": "Reverses an array in place.  The first array element becomes the last and the last becomes the first."
				},
				"sort": {
					"!type": "fn(compare?: fn(a: ?, b: ?) -> number)",
					"!effects": [
						"call !0 !this.<i> !this.<i>"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/sort",
					"!doc": "Sorts the elements of an array in place and returns the array."
				},
				"indexOf": {
					"!type": "fn(elt: ?, from?: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/indexOf",
					"!doc": "Returns the first index at which a given element can be found in the array, or -1 if it is not present."
				},
				"lastIndexOf": {
					"!type": "fn(elt: ?, from?: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/lastIndexOf",
					"!doc": "Returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex."
				},
				"every": {
					"!type": "fn(test: fn(elt: ?, i: number, array: +Array) -> bool, context?: ?) -> bool",
					"!effects": [
						"call !0 this=!1 !this.<i> number !this"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/every",
					"!doc": "Tests whether all elements in the array pass the test implemented by the provided function."
				},
				"some": {
					"!type": "fn(test: fn(elt: ?, i: number, array: +Array) -> bool, context?: ?) -> bool",
					"!effects": [
						"call !0 this=!1 !this.<i> number !this"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/some",
					"!doc": "Tests whether some element in the array passes the test implemented by the provided function."
				},
				"filter": {
					"!type": "fn(test: fn(elt: ?, i: number, array: +Array) -> bool, context?: ?) -> !this",
					"!effects": [
						"call !0 this=!1 !this.<i> number !this"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter",
					"!doc": "Creates a new array with all elements that pass the test implemented by the provided function."
				},
				"forEach": {
					"!type": "fn(f: fn(elt: ?, i: number, array: +Array), context?: ?)",
					"!effects": [
						"call !0 this=!1 !this.<i> number !this"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/forEach",
					"!doc": "Executes a provided function once per array element."
				},
				"map": {
					"!type": "fn(f: fn(elt: ?, i: number, array: +Array) -> ?, context?: ?) -> [!0.!ret]",
					"!effects": [
						"call !0 this=!1 !this.<i> number !this"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map",
					"!doc": "Creates a new array with the results of calling a provided function on every element in this array."
				},
				"reduce": {
					"!type": "fn(combine: fn(sum: ?, elt: ?, i: number, array: +Array) -> ?, init?: ?) -> !0.!ret",
					"!effects": [
						"call !0 !1 !this.<i> number !this"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/Reduce",
					"!doc": "Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value."
				},
				"reduceRight": {
					"!type": "fn(combine: fn(sum: ?, elt: ?, i: number, array: +Array) -> ?, init?: ?) -> !0.!ret",
					"!effects": [
						"call !0 !1 !this.<i> number !this"
					],
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/ReduceRight",
					"!doc": "Apply a function simultaneously against two values of the array (from right-to-left) as to reduce it to a single value."
				},
				"copyWithin": {
					"!type": "fn(target: number, start: number, end?: number) -> !this",
					"!doc": "The copyWithin() method copies the sequence of array elements within the array to the position starting at target. The copy is taken from the index positions of the second and third arguments start and end.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin"
				},
				"entries": {
					"!type": "fn() -> +iter[:t=[number, !this.<i>]]",
					"!doc": "The entries() method returns a new Array Iterator object that contains the key/value pairs for each index in the array.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries"
				},
				"fill": {
					"!type": "fn(value: ?, start?: number, end?: number) -> !this",
					"!doc": "The fill() method fills all the elements of an array from a start index to an end index with a static value.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill"
				},
				"find": {
					"!type": "fn(callback: fn(element: ?, index: number, array: [?]) -> bool, thisArg?: ?) -> !this.<i>",
					"!effects": [
						"call !0 this=!2 !this.<i> number"
					],
					"!doc": "The find() method returns a value in the array, if an element in the array satisfies the provided testing function. Otherwise undefined is returned.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find"
				},
				"findIndex": {
					"!type": "fn(callback: fn(element: ?, index: number, array: [?]), thisArg?: ?) -> number",
					"!effects": [
						"call !0 this=!2 !this.<i> number"
					],
					"!doc": "The findIndex() method returns an index in the array, if an element in the array satisfies the provided testing function. Otherwise -1 is returned.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex"
				},
				"keys": {
					"!type": "fn() -> +iter[:t=number]",
					"!doc": "The keys() method returns a new Array Iterator that contains the keys for each index in the array.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys"
				},
				"values": {
					"!type": "fn() -> +iter[:t=!this.<i>]",
					"!doc": "The values() method returns a new Array Iterator object that contains the values for each index in the array.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values"
				},
				":Symbol.iterator": {
					"!type": "fn() -> +iter[:t=!this.<i>]",
					"!doc": "Returns a new Array Iterator object that contains the values for each index in the array.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator"
				},
				"includes": {
					"!type": "fn(value: ?) -> bool",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes",
					"!doc": "Determines whether an array includes a certain element, returning true or false as appropriate."
				}
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array",
			"!doc": "The JavaScript Array global object is a constructor for arrays, which are high-level, list-like objects."
		},
		"String": {
			"!type": "fn(value: ?) -> string",
			"fromCharCode": {
				"!type": "fn(code: number) -> string",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/fromCharCode",
				"!doc": "Returns a string created by using the specified sequence of Unicode values."
			},
			"fromCodePoint": {
				"!type": "fn(point: number, point?: number) -> string",
				"!doc": "The static String.fromCodePoint() method returns a string created by using the specified sequence of code points.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint"
			},
			"raw": {
				"!type": "fn(template: [string], substitutions: ?, templateString: ?) -> string",
				"!doc": "The static String.raw() method is a tag function of template strings, used to get the raw string form of template strings.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw"
			},
			"prototype": {
				"!stdProto": "String",
				"length": {
					"!type": "number",
					"!url": "https://developer.mozilla.org/en/docs/JavaScript/Reference/Global_Objects/String/length",
					"!doc": "Represents the length of a string."
				},
				"<i>": "string",
				"charAt": {
					"!type": "fn(i: number) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/charAt",
					"!doc": "Returns the specified character from a string."
				},
				"charCodeAt": {
					"!type": "fn(i: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/charCodeAt",
					"!doc": "Returns the numeric Unicode value of the character at the given index (except for unicode codepoints > 0x10000)."
				},
				"indexOf": {
					"!type": "fn(char: string, from?: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/indexOf",
					"!doc": "Returns the index within the calling String object of the first occurrence of the specified value, starting the search at fromIndex,\nreturns -1 if the value is not found."
				},
				"lastIndexOf": {
					"!type": "fn(char: string, from?: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/lastIndexOf",
					"!doc": "Returns the index within the calling String object of the last occurrence of the specified value, or -1 if not found. The calling string is searched backward, starting at fromIndex."
				},
				"substring": {
					"!type": "fn(from: number, to?: number) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/substring",
					"!doc": "Returns a subset of a string between one index and another, or through the end of the string."
				},
				"substr": {
					"!type": "fn(from: number, length?: number) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/substr",
					"!doc": "Returns the characters in a string beginning at the specified location through the specified number of characters."
				},
				"slice": {
					"!type": "fn(from: number, to?: number) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/slice",
					"!doc": "Extracts a section of a string and returns a new string."
				},
				"trim": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/Trim",
					"!doc": "Removes whitespace from both ends of the string."
				},
				"toUpperCase": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toUpperCase",
					"!doc": "Returns the calling string value converted to uppercase."
				},
				"toLowerCase": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLowerCase",
					"!doc": "Returns the calling string value converted to lowercase."
				},
				"toLocaleUpperCase": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase",
					"!doc": "Returns the calling string value converted to upper case, according to any locale-specific case mappings."
				},
				"toLocaleLowerCase": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase",
					"!doc": "Returns the calling string value converted to lower case, according to any locale-specific case mappings."
				},
				"split": {
					"!type": "fn(pattern?: string|+RegExp, limit?: number) -> [string]",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/split",
					"!doc": "Splits a String object into an array of strings by separating the string into substrings."
				},
				"concat": {
					"!type": "fn(other: string) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/concat",
					"!doc": "Combines the text of two or more strings and returns a new string."
				},
				"localeCompare": {
					"!type": "fn(other: string) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/localeCompare",
					"!doc": "Returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order."
				},
				"match": {
					"!type": "fn(pattern: +RegExp) -> [string]",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/match",
					"!doc": "Used to retrieve the matches when matching a string against a regular expression."
				},
				"replace": {
					"!type": "fn(pattern: string|+RegExp, replacement: string) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/replace",
					"!doc": "Returns a new string with some or all matches of a pattern replaced by a replacement.  The pattern can be a string or a RegExp, and the replacement can be a string or a function to be called for each match."
				},
				"search": {
					"!type": "fn(pattern: +RegExp) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/search",
					"!doc": "Executes the search for a match between a regular expression and this String object."
				},
				"codePointAt": {
					"!type": "fn(pos: number) -> number",
					"!doc": "The codePointAt() method returns a non-negative integer that is the UTF-16 encoded code point value.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt"
				},
				"endsWith": {
					"!type": "fn(searchString: string, position?: number) -> bool",
					"!doc": "The endsWith() method determines whether a string ends with the characters of another string, returning true or false as appropriate.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith"
				},
				"includes": {
					"!type": "fn(searchString: string, position?: number) -> bool",
					"!doc": "The includes() method determines whether one string may be found within another string, returning true or false as appropriate.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains"
				},
				"normalize": {
					"!type": "fn(form: string) -> string",
					"!doc": "The normalize() method returns the Unicode Normalization Form of a given string (if the value isn't a string, it will be converted to one first).",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize"
				},
				"repeat": {
					"!type": "fn(count: number) -> string",
					"!doc": "The repeat() method constructs and returns a new string which contains the specified number of copies of the string on which it was called, concatenated together.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat"
				},
				"startsWith": {
					"!type": "fn(searchString: string, position?: number) -> bool",
					"!doc": "The startsWith() method determines whether a string begins with the characters of another string, returning true or false as appropriate.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith"
				},
				":Symbol.iterator": {
					"!type": "fn() -> +iter[:t=string]",
					"!doc": "Returns a new Iterator object that iterates over the code points of a String value, returning each code point as a String value.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator"
				}
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String",
			"!doc": "The String global object is a constructor for strings, or a sequence of characters."
		},
		"Number": {
			"!type": "fn(value: ?) -> number",
			"MAX_VALUE": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/MAX_VALUE",
				"!doc": "The maximum numeric value representable in JavaScript."
			},
			"MIN_VALUE": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/MIN_VALUE",
				"!doc": "The smallest positive numeric value representable in JavaScript."
			},
			"POSITIVE_INFINITY": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY",
				"!doc": "A value representing the positive Infinity value."
			},
			"NEGATIVE_INFINITY": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY",
				"!doc": "A value representing the negative Infinity value."
			},
			"prototype": {
				"!stdProto": "Number",
				"toString": {
					"!type": "fn(radix?: number) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toString",
					"!doc": "Returns a string representing the specified Number object"
				},
				"toFixed": {
					"!type": "fn(digits: number) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toFixed",
					"!doc": "Formats a number using fixed-point notation"
				},
				"toExponential": {
					"!type": "fn(digits: number) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toExponential",
					"!doc": "Returns a string representing the Number object in exponential notation"
				},
				"toPrecision": {
					"!type": "fn(digits: number) -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number/toPrecision",
					"!doc": "The toPrecision() method returns a string representing the number to the specified precision."
				}
			},
			"EPSILON": {
				"!type": "number",
				"!doc": "The Number.EPSILON property represents the difference between one and the smallest value greater than one that can be represented as a Number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON"
			},
			"MAX_SAFE_INTEGER": {
				"!type": "number",
				"!doc": "The Number.MAX_SAFE_INTEGER constant represents the maximum safe integer in JavaScript (253 - 1).",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER"
			},
			"MIN_SAFE_INTEGER": {
				"!type": "number",
				"!doc": "The Number.MIN_SAFE_INTEGER constant represents the minimum safe integer in JavaScript (-(253 - 1)).",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER"
			},
			"isFinite": {
				"!type": "fn(testValue: ?) -> bool",
				"!doc": "The Number.isFinite() method determines whether the passed value is finite.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite"
			},
			"isInteger": {
				"!type": "fn(testValue: ?) -> bool",
				"!doc": "The Number.isInteger() method determines whether the passed value is an integer.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger"
			},
			"isNaN": {
				"!type": "fn(testValue: ?) -> bool",
				"!doc": "The Number.isNaN() method determines whether the passed value is NaN. More robust version of the original global isNaN().",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN"
			},
			"isSafeInteger": {
				"!type": "fn(testValue: ?) -> bool",
				"!doc": "The Number.isSafeInteger() method determines whether the provided value is a number that is a safe integer. A safe integer is an integer that",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger"
			},
			"parseFloat": {
				"!type": "fn(string: string) -> number",
				"!doc": "The Number.parseFloat() method parses a string argument and returns a floating point number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat"
			},
			"parseInt": {
				"!type": "fn(string: string, radix?: number) -> number",
				"!doc": "The Number.parseInt() method parses a string argument and returns an integer of the specified radix or base.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt"
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Number",
			"!doc": "The Number JavaScript object is a wrapper object allowing you to work with numerical values. A Number object is created using the Number() constructor."
		},
		"Boolean": {
			"!type": "fn(value: ?) -> bool",
			"prototype": {
				"!stdProto": "Boolean"
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Boolean",
			"!doc": "The Boolean object is an object wrapper for a boolean value."
		},
		"RegExp": {
			"!type": "fn(source: string, flags?: string)",
			"prototype": {
				"!stdProto": "RegExp",
				"exec": {
					"!type": "fn(input: string) -> [string]",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/exec",
					"!doc": "Executes a search for a match in a specified string. Returns a result array, or null."
				},
				"test": {
					"!type": "fn(input: string) -> bool",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/test",
					"!doc": "Executes the search for a match between a regular expression and a specified string. Returns true or false."
				},
				"global": {
					"!type": "bool",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp",
					"!doc": "Creates a regular expression object for matching text with a pattern."
				},
				"ignoreCase": {
					"!type": "bool",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp",
					"!doc": "Creates a regular expression object for matching text with a pattern."
				},
				"multiline": {
					"!type": "bool",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/multiline",
					"!doc": "Reflects whether or not to search in strings across multiple lines.\n"
				},
				"source": {
					"!type": "string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/source",
					"!doc": "A read-only property that contains the text of the pattern, excluding the forward slashes.\n"
				},
				"lastIndex": {
					"!type": "number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp/lastIndex",
					"!doc": "A read/write integer property that specifies the index at which to start the next match."
				},
				"flags": {
					"!type": "string",
					"!doc": "The flags property returns a string consisting of the flags of the current regular expression object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags"
				},
				"sticky": {
					"!type": "bool",
					"!doc": "The sticky property reflects whether or not the search is sticky (searches in strings only from the index indicated by the lastIndex property of this regular expression). sticky is a read-only property of an individual regular expression object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky"
				},
				"unicode": {
					"!type": "bool",
					"!doc": "The 'u' flag enables various Unicode-related features.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode"
				}
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RegExp",
			"!doc": "Creates a regular expression object for matching text with a pattern."
		},
		"Date": {
			"!type": "fn(ms: number)",
			"parse": {
				"!type": "fn(source: string) -> +Date",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse",
				"!doc": "Parses a string representation of a date, and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC."
			},
			"UTC": {
				"!type": "fn(year: number, month: number, date: number, hour?: number, min?: number, sec?: number, ms?: number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/UTC",
				"!doc": "Accepts the same parameters as the longest form of the constructor, and returns the number of milliseconds in a Date object since January 1, 1970, 00:00:00, universal time."
			},
			"now": {
				"!type": "fn() -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/now",
				"!doc": "Returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC."
			},
			"prototype": {
				"toUTCString": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toUTCString",
					"!doc": "Converts a date to a string, using the universal time convention."
				},
				"toISOString": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toISOString",
					"!doc": "JavaScript provides a direct way to convert a date object into a string in ISO format, the ISO 8601 Extended Format."
				},
				"toDateString": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toDateString",
					"!doc": "Returns the date portion of a Date object in human readable form in American English."
				},
				"toTimeString": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toTimeString",
					"!doc": "Returns the time portion of a Date object in human readable form in American English."
				},
				"toLocaleDateString": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toLocaleDateString",
					"!doc": "Converts a date to a string, returning the \"date\" portion using the operating system's locale's conventions.\n"
				},
				"toLocaleTimeString": {
					"!type": "fn() -> string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString",
					"!doc": "Converts a date to a string, returning the \"time\" portion using the current locale's conventions."
				},
				"getTime": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getTime",
					"!doc": "Returns the numeric value corresponding to the time for the specified date according to universal time."
				},
				"getFullYear": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getFullYear",
					"!doc": "Returns the year of the specified date according to local time."
				},
				"getYear": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getYear",
					"!doc": "Returns the year in the specified date according to local time."
				},
				"getMonth": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMonth",
					"!doc": "Returns the month in the specified date according to local time."
				},
				"getUTCMonth": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCMonth",
					"!doc": "Returns the month of the specified date according to universal time.\n"
				},
				"getDate": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getDate",
					"!doc": "Returns the day of the month for the specified date according to local time."
				},
				"getUTCDate": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCDate",
					"!doc": "Returns the day (date) of the month in the specified date according to universal time.\n"
				},
				"getDay": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getDay",
					"!doc": "Returns the day of the week for the specified date according to local time."
				},
				"getUTCDay": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCDay",
					"!doc": "Returns the day of the week in the specified date according to universal time.\n"
				},
				"getHours": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getHours",
					"!doc": "Returns the hour for the specified date according to local time."
				},
				"getUTCHours": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCHours",
					"!doc": "Returns the hours in the specified date according to universal time.\n"
				},
				"getMinutes": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMinutes",
					"!doc": "Returns the minutes in the specified date according to local time."
				},
				"getUTCMinutes": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date",
					"!doc": "Creates JavaScript Date instances which let you work with dates and times."
				},
				"getSeconds": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getSeconds",
					"!doc": "Returns the seconds in the specified date according to local time."
				},
				"getUTCSeconds": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCSeconds",
					"!doc": "Returns the seconds in the specified date according to universal time.\n"
				},
				"getMilliseconds": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getMilliseconds",
					"!doc": "Returns the milliseconds in the specified date according to local time."
				},
				"getUTCMilliseconds": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getUTCMilliseconds",
					"!doc": "Returns the milliseconds in the specified date according to universal time.\n"
				},
				"getTimezoneOffset": {
					"!type": "fn() -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset",
					"!doc": "Returns the time-zone offset from UTC, in minutes, for the current locale."
				},
				"setTime": {
					"!type": "fn(date: +Date) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setTime",
					"!doc": "Sets the Date object to the time represented by a number of milliseconds since January 1, 1970, 00:00:00 UTC.\n"
				},
				"setFullYear": {
					"!type": "fn(year: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setFullYear",
					"!doc": "Sets the full year for a specified date according to local time.\n"
				},
				"setUTCFullYear": {
					"!type": "fn(year: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCFullYear",
					"!doc": "Sets the full year for a specified date according to universal time.\n"
				},
				"setMonth": {
					"!type": "fn(month: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMonth",
					"!doc": "Set the month for a specified date according to local time."
				},
				"setUTCMonth": {
					"!type": "fn(month: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMonth",
					"!doc": "Sets the month for a specified date according to universal time.\n"
				},
				"setDate": {
					"!type": "fn(day: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setDate",
					"!doc": "Sets the day of the month for a specified date according to local time."
				},
				"setUTCDate": {
					"!type": "fn(day: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCDate",
					"!doc": "Sets the day of the month for a specified date according to universal time.\n"
				},
				"setHours": {
					"!type": "fn(hour: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setHours",
					"!doc": "Sets the hours for a specified date according to local time, and returns the number of milliseconds since 1 January 1970 00:00:00 UTC until the time represented by the updated Date instance."
				},
				"setUTCHours": {
					"!type": "fn(hour: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCHours",
					"!doc": "Sets the hour for a specified date according to universal time.\n"
				},
				"setMinutes": {
					"!type": "fn(min: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMinutes",
					"!doc": "Sets the minutes for a specified date according to local time."
				},
				"setUTCMinutes": {
					"!type": "fn(min: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMinutes",
					"!doc": "Sets the minutes for a specified date according to universal time.\n"
				},
				"setSeconds": {
					"!type": "fn(sec: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setSeconds",
					"!doc": "Sets the seconds for a specified date according to local time."
				},
				"setUTCSeconds": {
					"!type": "fn(sec: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCSeconds",
					"!doc": "Sets the seconds for a specified date according to universal time.\n"
				},
				"setMilliseconds": {
					"!type": "fn(ms: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setMilliseconds",
					"!doc": "Sets the milliseconds for a specified date according to local time.\n"
				},
				"setUTCMilliseconds": {
					"!type": "fn(ms: number) -> number",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/setUTCMilliseconds",
					"!doc": "Sets the milliseconds for a specified date according to universal time.\n"
				},
				"toJSON": {
					"!type": "fn() -> string",
					"!doc": "Returns a string (using toISOString()) representing the Date object's value.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON"
				}
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date",
			"!doc": "Creates JavaScript Date instances which let you work with dates and times."
		},
		"Error": {
			"!type": "fn(message: string)",
			"prototype": {
				"name": {
					"!type": "string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error/name",
					"!doc": "A name for the type of error."
				},
				"message": {
					"!type": "string",
					"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error/message",
					"!doc": "A human-readable description of the error."
				}
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Error",
			"!doc": "Creates an error object."
		},
		"SyntaxError": {
			"!type": "fn(message: string)",
			"prototype": "Error.prototype",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/SyntaxError",
			"!doc": "Represents an error when trying to interpret syntactically invalid code."
		},
		"ReferenceError": {
			"!type": "fn(message: string)",
			"prototype": "Error.prototype",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/ReferenceError",
			"!doc": "Represents an error when a non-existent variable is referenced."
		},
		"URIError": {
			"!type": "fn(message: string)",
			"prototype": "Error.prototype",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/URIError",
			"!doc": "Represents an error when a malformed URI is encountered."
		},
		"EvalError": {
			"!type": "fn(message: string)",
			"prototype": "Error.prototype",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/EvalError",
			"!doc": "Represents an error regarding the eval function."
		},
		"RangeError": {
			"!type": "fn(message: string)",
			"prototype": "Error.prototype",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/RangeError",
			"!doc": "Represents an error when a number is not within the correct range allowed."
		},
		"TypeError": {
			"!type": "fn(message: string)",
			"prototype": "Error.prototype",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/TypeError",
			"!doc": "Represents an error an error when a value is not of the expected type."
		},
		"parseInt": {
			"!type": "fn(string: string, radix?: number) -> number",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/parseInt",
			"!doc": "Parses a string argument and returns an integer of the specified radix or base."
		},
		"parseFloat": {
			"!type": "fn(string: string) -> number",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/parseFloat",
			"!doc": "Parses a string argument and returns a floating point number."
		},
		"isNaN": {
			"!type": "fn(value: number) -> bool",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/isNaN",
			"!doc": "Determines whether a value is NaN or not. Be careful, this function is broken. You may be interested in ECMAScript 6 Number.isNaN."
		},
		"isFinite": {
			"!type": "fn(value: number) -> bool",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/isFinite",
			"!doc": "Determines whether the passed value is a finite number."
		},
		"eval": {
			"!type": "fn(code: string) -> ?",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/eval",
			"!doc": "Evaluates JavaScript code represented as a string."
		},
		"encodeURI": {
			"!type": "fn(uri: string) -> string",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURI",
			"!doc": "Encodes a Uniform Resource Identifier (URI) by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two \"surrogate\" characters)."
		},
		"encodeURIComponent": {
			"!type": "fn(uri: string) -> string",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent",
			"!doc": "Encodes a Uniform Resource Identifier (URI) component by replacing each instance of certain characters by one, two, three, or four escape sequences representing the UTF-8 encoding of the character (will only be four escape sequences for characters composed of two \"surrogate\" characters)."
		},
		"decodeURI": {
			"!type": "fn(uri: string) -> string",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/decodeURI",
			"!doc": "Decodes a Uniform Resource Identifier (URI) previously created by encodeURI or by a similar routine."
		},
		"decodeURIComponent": {
			"!type": "fn(uri: string) -> string",
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/decodeURIComponent",
			"!doc": "Decodes a Uniform Resource Identifier (URI) component previously created by encodeURIComponent or by a similar routine."
		},
		"Math": {
			"E": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/E",
				"!doc": "The base of natural logarithms, e, approximately 2.718."
			},
			"LN2": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/LN2",
				"!doc": "The natural logarithm of 2, approximately 0.693."
			},
			"LN10": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/LN10",
				"!doc": "The natural logarithm of 10, approximately 2.302."
			},
			"LOG2E": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/LOG2E",
				"!doc": "The base 2 logarithm of E (approximately 1.442)."
			},
			"LOG10E": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/LOG10E",
				"!doc": "The base 10 logarithm of E (approximately 0.434)."
			},
			"SQRT1_2": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/SQRT1_2",
				"!doc": "The square root of 1/2; equivalently, 1 over the square root of 2, approximately 0.707."
			},
			"SQRT2": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/SQRT2",
				"!doc": "The square root of 2, approximately 1.414."
			},
			"PI": {
				"!type": "number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/PI",
				"!doc": "The ratio of the circumference of a circle to its diameter, approximately 3.14159."
			},
			"abs": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/abs",
				"!doc": "Returns the absolute value of a number."
			},
			"cos": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/cos",
				"!doc": "Returns the cosine of a number."
			},
			"sin": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/sin",
				"!doc": "Returns the sine of a number."
			},
			"tan": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/tan",
				"!doc": "Returns the tangent of a number."
			},
			"acos": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/acos",
				"!doc": "Returns the arccosine (in radians) of a number."
			},
			"asin": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/asin",
				"!doc": "Returns the arcsine (in radians) of a number."
			},
			"atan": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/atan",
				"!doc": "Returns the arctangent (in radians) of a number."
			},
			"atan2": {
				"!type": "fn(y: number, x: number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/atan2",
				"!doc": "Returns the arctangent of the quotient of its arguments."
			},
			"ceil": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/ceil",
				"!doc": "Returns the smallest integer greater than or equal to a number."
			},
			"floor": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/floor",
				"!doc": "Returns the largest integer less than or equal to a number."
			},
			"round": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/round",
				"!doc": "Returns the value of a number rounded to the nearest integer."
			},
			"exp": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/exp",
				"!doc": "Returns Ex, where x is the argument, and E is Euler's constant, the base of the natural logarithms."
			},
			"log": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/log",
				"!doc": "Returns the natural logarithm (base E) of a number."
			},
			"sqrt": {
				"!type": "fn(number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/sqrt",
				"!doc": "Returns the square root of a number."
			},
			"pow": {
				"!type": "fn(number, number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/pow",
				"!doc": "Returns base to the exponent power, that is, baseexponent."
			},
			"max": {
				"!type": "fn(number, number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/max",
				"!doc": "Returns the largest of zero or more numbers."
			},
			"min": {
				"!type": "fn(number, number) -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/min",
				"!doc": "Returns the smallest of zero or more numbers."
			},
			"random": {
				"!type": "fn() -> number",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math/random",
				"!doc": "Returns a floating-point, pseudo-random number in the range [0, 1) that is, from 0 (inclusive) up to but not including 1 (exclusive), which you can then scale to your desired range."
			},
			"acosh": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.acosh() function returns the hyperbolic arc-cosine of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acosh"
			},
			"asinh": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.asinh() function returns the hyperbolic arcsine of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/asinh"
			},
			"atanh": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.atanh() function returns the hyperbolic arctangent of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atanh"
			},
			"cbrt": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.cbrt() function returns the cube root of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cbrt"
			},
			"clz32": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.clz32() function returns the number of leading zero bits in the 32-bit binary representation of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32"
			},
			"cosh": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.cosh() function returns the hyperbolic cosine of a number, that can be expressed using the constant e:",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cosh"
			},
			"expm1": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.expm1() function returns ex - 1, where x is the argument, and e the base of the natural logarithms.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/expm1"
			},
			"fround": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.fround() function returns the nearest single precision float representation of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround"
			},
			"hypot": {
				"!type": "fn(value: number) -> number",
				"!doc": "The Math.hypot() function returns the square root of the sum of squares of its arguments.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot"
			},
			"imul": {
				"!type": "fn(a: number, b: number) -> number",
				"!doc": "The Math.imul() function returns the result of the C-like 32-bit multiplication of the two parameters.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul"
			},
			"log10": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.log10() function returns the base 10 logarithm of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log10"
			},
			"log1p": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.log1p() function returns the natural logarithm (base e) of 1 + a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log1p"
			},
			"log2": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.log2() function returns the base 2 logarithm of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log2"
			},
			"sign": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.sign() function returns the sign of a number, indicating whether the number is positive, negative or zero.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign"
			},
			"sinh": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.sinh() function returns the hyperbolic sine of a number, that can be expressed using the constant e:",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sinh"
			},
			"tanh": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.tanh() function returns the hyperbolic tangent of a number.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tanh"
			},
			"trunc": {
				"!type": "fn(x: number) -> number",
				"!doc": "The Math.trunc() function returns the integral part of a number by removing any fractional digits. It does not round any numbers. The function can be expressed with the floor() and ceil() function:",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc"
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math",
			"!doc": "A built-in object that has properties and methods for mathematical constants and functions."
		},
		"JSON": {
			"parse": {
				"!type": "fn(json: string, reviver?: fn(key: string, value: ?) -> ?) -> ?",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/parse",
				"!doc": "Parse a string as JSON, optionally transforming the value produced by parsing."
			},
			"stringify": {
				"!type": "fn(value: ?, replacer?: fn(key: string, value: ?) -> ?, space?: string|number) -> string",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/JSON/stringify",
				"!doc": "Convert a value to JSON, optionally replacing values if a replacer function is specified, or optionally including only the specified properties if a replacer array is specified."
			},
			"!url": "https://developer.mozilla.org/en-US/docs/JSON",
			"!doc": "JSON (JavaScript Object Notation) is a data-interchange format.  It closely resembles a subset of JavaScript syntax, although it is not a strict subset. (See JSON in the JavaScript Reference for full details.)  It is useful when writing any kind of JavaScript-based application, including websites and browser extensions.  For example, you might store user information in JSON format in a cookie, or you might store extension preferences in JSON in a string-valued browser preference."
		},
		"ArrayBuffer": {
			"!type": "fn(length: number)",
			"!doc": "The ArrayBuffer object is used to represent a generic, fixed-length raw binary data buffer.",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer",
			"isView": {
				"!type": "fn(arg: +ArrayBuffer) -> bool",
				"!doc": "The ArrayBuffer.isView() method returns true if arg is one of the ArrayBuffer views, such as typed array objects or a DataView; false otherwise.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/isView"
			},
			"prototype": {
				"byteLength": {
					"!type": "number",
					"!doc": "The byteLength accessor property represents the length of an ArrayBuffer in bytes.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/byteLength"
				},
				"slice": {
					"!type": "fn(begin: number, end?: number) -> +ArrayBuffer",
					"!doc": "The slice() method returns a new ArrayBuffer whose contents are a copy of this ArrayBuffer's bytes from begin, inclusive, up to end, exclusive.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer/slice"
				}
			}
		},
		"DataView": {
			"!type": "fn(buffer: +ArrayBuffer, byteOffset?: number, byteLength?: number)",
			"!doc": "The DataView view provides a low-level interface for reading data from and writing it to an ArrayBuffer.",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView",
			"prototype": {
				"buffer": {
					"!type": "+ArrayBuffer",
					"!doc": "The buffer accessor property represents the ArrayBuffer referenced by the DataView at construction time.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/buffer"
				},
				"byteLength": {
					"!type": "number",
					"!doc": "The byteLength accessor property represents the length (in bytes) of this view from the start of its ArrayBuffer.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteLength"
				},
				"byteOffset": {
					"!type": "number",
					"!doc": "The byteOffset accessor property represents the offset (in bytes) of this view from the start of its ArrayBuffer.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/byteOffset"
				},
				"getFloat32": {
					"!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
					"!doc": "The getFloat32() method gets a signed 32-bit integer (float) at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat32"
				},
				"getFloat64": {
					"!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
					"!doc": "The getFloat64() method gets a signed 64-bit float (double) at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat64"
				},
				"getInt16": {
					"!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
					"!doc": "The getInt16() method gets a signed 16-bit integer (short) at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt16"
				},
				"getInt32": {
					"!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
					"!doc": "The getInt32() method gets a signed 32-bit integer (long) at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt32"
				},
				"getInt8": {
					"!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
					"!doc": "The getInt8() method gets a signed 8-bit integer (byte) at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getInt8"
				},
				"getUint16": {
					"!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
					"!doc": "The getUint16() method gets an unsigned 16-bit integer (unsigned short) at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint16"
				},
				"getUint32": {
					"!type": "fn(byteOffset: number, littleEndian?: bool) -> number",
					"!doc": "The getUint32() method gets an unsigned 32-bit integer (unsigned long) at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint32"
				},
				"getUint8": {
					"!type": "fn(byteOffset: number) -> number",
					"!doc": "The getUint8() method gets an unsigned 8-bit integer (unsigned byte) at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint8"
				},
				"setFloat32": {
					"!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
					"!doc": "The setFloat32() method stores a signed 32-bit integer (float) value at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat32"
				},
				"setFloat64": {
					"!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
					"!doc": "The setFloat64() method stores a signed 64-bit integer (double) value at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setFloat64"
				},
				"setInt16": {
					"!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
					"!doc": "The setInt16() method stores a signed 16-bit integer (short) value at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt16"
				},
				"setInt32": {
					"!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
					"!doc": "The setInt32() method stores a signed 32-bit integer (long) value at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt32"
				},
				"setInt8": {
					"!type": "fn(byteOffset: number, value: number)",
					"!doc": "The setInt8() method stores a signed 8-bit integer (byte) value at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setInt8"
				},
				"setUint16": {
					"!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
					"!doc": "The setUint16() method stores an unsigned 16-bit integer (unsigned short) value at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint16"
				},
				"setUint32": {
					"!type": "fn(byteOffset: number, value: number, littleEndian?: bool)",
					"!doc": "The setUint32() method stores an unsigned 32-bit integer (unsigned long) value at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint32"
				},
				"setUint8": {
					"!type": "fn(byteOffset: number, value: number)",
					"!doc": "The setUint8() method stores an unsigned 8-bit integer (byte) value at the specified byte offset from the start of the DataView.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setUint8"
				}
			}
		},
		"Float32Array": "TypedArray",
		"Float64Array": "TypedArray",
		"Int16Array": "TypedArray",
		"Int32Array": "TypedArray",
		"Int8Array": "TypedArray",
		"Map": {
			"!type": "fn(iterable?: [?])",
			"!doc": "The Map object is a simple key/value map. Any value (both objects and primitive values) may be used as either a key or a value.",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map",
			"prototype": {
				"clear": {
					"!type": "fn()",
					"!doc": "The clear() method removes all elements from a Map object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear"
				},
				"delete": {
					"!type": "fn(key: ?)",
					"!doc": "The delete() method removes the specified element from a Map object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete"
				},
				"entries": {
					"!type": "fn() -> +iter[:t=[!this.:key, !this.:value]]",
					"!doc": "The entries() method returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries"
				},
				"forEach": {
					"!type": "fn(callback: fn(value: ?, key: ?, map: +Map), thisArg?: ?)",
					"!effects": [
						"call !0 this=!1 !this.:value !this.:key !this"
					],
					"!doc": "The forEach() method executes a provided function once per each key/value pair in the Map object, in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach"
				},
				"get": {
					"!type": "fn(key: ?) -> !this.:value",
					"!doc": "The get() method returns a specified element from a Map object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get"
				},
				"has": {
					"!type": "fn(key: ?) -> bool",
					"!doc": "The has() method returns a boolean indicating whether an element with the specified key exists or not.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has"
				},
				"keys": {
					"!type": "fn() -> +iter[:t=!this.:key]",
					"!doc": "The keys() method returns a new Iterator object that contains the keys for each element in the Map object in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys"
				},
				"set": {
					"!type": "fn(key: ?, value: ?) -> !this",
					"!effects": [
						"propagate !0 !this.:key",
						"propagate !1 !this.:value"
					],
					"!doc": "The set() method adds a new element with a specified key and value to a Map object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set"
				},
				"size": {
					"!type": "number",
					"!doc": "The size accessor property returns the number of elements in a Map object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size"
				},
				"values": {
					"!type": "fn() -> +iter[:t=!this.:value]",
					"!doc": "The values() method returns a new Iterator object that contains the values for each element in the Map object in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values"
				},
				":Symbol.iterator": {
					"!type": "fn() -> +iter[:t=[!this.:key, !this.:value]]",
					"!doc": "Returns a new Iterator object that contains the [key, value] pairs for each element in the Map object in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator"
				}
			}
		},
		"Promise": {
			"!type": "fn(executor: fn(resolve: fn(value: ?), reject: fn(reason: ?))) -> !custom:Promise_ctor",
			"!doc": "The Promise object is used for deferred and asynchronous computations. A Promise is in one of the three states:",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
			"all": {
				"!type": "fn(iterable: [+Promise]) -> +Promise[:t=[!0.<i>.:t]]",
				"!doc": "The Promise.all(iterable) method returns a promise that resolves when all of the promises in the iterable argument have resolved.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all"
			},
			"race": {
				"!type": "fn(iterable: [+Promise]) -> !0.<i>",
				"!doc": "The Promise.race(iterable) method returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects, with the value or reason from that promise.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race"
			},
			"reject": "Promise_reject",
			"resolve": {
				"!type": "fn(value: ?) -> !custom:Promise_resolve",
				"!doc": "The Promise.resolve(value) method returns a Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will 'follow' that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve"
			},
			"prototype": "Promise.prototype"
		},
		"Proxy": {
			"!type": "fn(target: ?, handler: Proxy_handler)",
			"!doc": "The Proxy object is used to define the custom behavior in JavaScript fundamental operation (e.g. property lookup, assignment, enumeration, function invocation, etc).",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",
			"revocable": {
				"!type": "fn(target: ?, handler: Proxy_handler) -> Proxy_revocable",
				"!doc": "The Proxy.revocable() method is used to create a revocable Proxy object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable"
			}
		},
		"Reflect": {
			"!doc": "Reflect is a built-in object that provides methods for interceptable JavaScript operations.",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect",
			"apply": {
				"!type": "fn(target: fn(), thisArg?: ?, argumentList?: [?]) -> !0.!ret",
				"!doc": "Calls a target function with arguments as specified.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply"
			},
			"construct": {
				"!type": "fn(target: fn(), argumentList?: [?]) -> ?",
				"!doc": "Acts like the new operator as a function. It is equivalent to calling new target(...args).",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct"
			},
			"defineProperty": {
				"!type": "fn(target: ?, property: string, descriptor: propertyDescriptor) -> bool",
				"!doc": "The static Reflect.defineProperty() method is like Object.defineProperty() but returns a Boolean.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty"
			},
			"deleteProperty": {
				"!type": "fn(target: ?, property: string) -> bool",
				"!doc": "Works like the delete operator as a function.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty"
			},
			"enumerate": {
				"!type": "fn(target: ?) -> +iter[:t=string]",
				"!doc": "Returns an iterator with the enumerable own and inherited properties of the target object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/enumerate"
			},
			"get": {
				"!type": "fn(target: ?, property: string) -> ?",
				"!doc": "Gets a property from an object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get"
			},
			"getOwnPropertyDescriptor": {
				"!type": "fn(target: ?, property: string) -> ?",
				"!doc": "Returns a property descriptor of the given property if it exists on the object, undefined otherwise.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor"
			},
			"getPrototypeOf": {
				"!type": "fn(target: ?) -> ?",
				"!doc": "Returns the prototype of the specified object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getPrototypeOf"
			},
			"has": {
				"!type": "fn(target: ?, property: string) -> bool",
				"!doc": "The static Reflect.has() method works like the in operator as a function.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has"
			},
			"isExtensible": {
				"!type": "fn(target: ?) -> bool",
				"!doc": "Determines if an object is extensible (whether it can have new properties added to it).",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/isExtensible"
			},
			"ownKeys": {
				"!type": "fn(target: ?) -> [string]",
				"!doc": "Returns an array of the target object's own property keys.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys"
			},
			"preventExtensions": {
				"!type": "fn(target: ?) -> bool",
				"!doc": "Prevents new properties from ever being added to an object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/preventExtensions"
			},
			"set": {
				"!type": "fn(target: ?, property: string, value: ?) -> bool",
				"!doc": "Set a property on an object.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set"
			},
			"setPrototypeOf": {
				"!type": "fn(target: ?, prototype: ?) -> bool",
				"!doc": "Sets the prototype of a specified object to another object or to null.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/setPrototypeOf"
			}
		},
		"Set": {
			"!type": "fn(iterable?: [?])",
			"!doc": "The Set object lets you store unique values of any type, whether primitive values or object references.",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set",
			"prototype": {
				"add": {
					"!type": "fn(value: ?) -> !this",
					"!effects": [
						"propagate !0 !this.:t"
					],
					"!doc": "The add() method appends a new element with a specified value to the end of a Set object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add"
				},
				"clear": {
					"!type": "fn()",
					"!doc": "The clear() method removes all elements from a Set object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear"
				},
				"delete": {
					"!type": "fn(value: ?) -> bool",
					"!doc": "The delete() method removes the specified element from a Set object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete"
				},
				"entries": {
					"!type": "fn() -> +iter[:t=[!this.:t]]",
					"!doc": "The entries() method returns a new Iterator object that contains an array of [value, value] for each element in the Set object, in insertion order. For Set objects there is no key like in Map objects. However, to keep the API similar to the Map object, each entry has the same value for its key and value here, so that an array [value, value] is returned.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries"
				},
				"forEach": {
					"!type": "fn(callback: fn(value: ?, value2: ?, set: +Set), thisArg?: ?)",
					"!effects": [
						"call !0 this=!1 !this.:t number !this"
					],
					"!doc": "The forEach() method executes a provided function once per each value in the Set object, in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach"
				},
				"has": {
					"!type": "fn(value: ?) -> bool",
					"!doc": "The has() method returns a boolean indicating whether an element with the specified value exists in a Set object or not.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has"
				},
				"keys": {
					"!type": "fn() -> +iter[:t=!this.:t]",
					"!doc": "The values() method returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys"
				},
				"size": {
					"!type": "number",
					"!doc": "The size accessor property returns the number of elements in a Set object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size"
				},
				"values": {
					"!type": "fn() -> +iter[:t=!this.:t]",
					"!doc": "The values() method returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values"
				},
				":Symbol.iterator": {
					"!type": "fn() -> +iter[:t=!this.:t]",
					"!doc": "Returns a new Iterator object that contains the values for each element in the Set object in insertion order.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator"
				}
			}
		},
		"Symbol": {
			"!type": "fn(description?: string) -> !custom:getSymbol",
			"!doc": "A symbol is a unique and immutable data type and may be used as an identifier for object properties. The symbol object is an implicit object wrapper for the symbol primitive data type.",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol",
			"for": {
				"!type": "fn(key: string) -> !custom:getSymbol",
				"!doc": "The Symbol.for(key) method searches for existing symbols in a runtime-wide symbol registry with the given key and returns it if found. Otherwise a new symbol gets created in the global symbol registry with this key.",
				"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/for"
			},
			"keyFor": ":Symbol.keyFor",
			"hasInstance": ":Symbol.hasInstance",
			"isConcatSpreadable": ":Symbol.isConcatSpreadable",
			"iterator": ":Symbol.iterator",
			"match": ":Symbol.match",
			"replace": ":Symbol.replace",
			"search": ":Symbol.search",
			"species": ":Symbol.species",
			"split": ":Symbol.split",
			"toStringTag": ":Symbol.toStringTag",
			"unscopables": ":Symbol.unscopables",
			"prototype": {
				"!stdProto": "Symbol"
			}
		},
		"Uint16Array": "TypedArray",
		"Uint32Array": "TypedArray",
		"Uint8Array": "TypedArray",
		"Uint8ClampedArray": "TypedArray",
		"WeakMap": {
			"!type": "fn(iterable?: [?])",
			"!doc": "The WeakMap object is a collection of key/value pairs in which the keys are objects and the values can be arbitrary values.",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
			"prototype": {
				"delete": {
					"!type": "fn(key: ?) -> bool",
					"!doc": "The delete() method removes the specified element from a WeakMap object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete"
				},
				"get": {
					"!type": "fn(key: ?) -> !this.:value",
					"!doc": "The get() method returns a specified element from a WeakMap object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get"
				},
				"has": {
					"!type": "fn(key: ?) -> bool",
					"!doc": "The has() method returns a boolean indicating whether an element with the specified key exists in the WeakMap object or not.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has"
				},
				"set": {
					"!type": "fn(key: ?, value: ?)",
					"!effects": [
						"propagate !0 !this.:key",
						"propagate !1 !this.:value"
					],
					"!doc": "The set() method adds a new element with a specified key and value to a WeakMap object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set"
				}
			}
		},
		"WeakSet": {
			"!type": "fn(iterable?: [?])",
			"!doc": "The WeakSet object lets you store weakly held objects in a collection.",
			"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet",
			"prototype": {
				"add": {
					"!type": "fn(value: ?)",
					"!doc": "The add() method appends a new object to the end of a WeakSet object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/add"
				},
				"delete": {
					"!type": "fn(value: ?) -> bool",
					"!doc": "The delete() method removes the specified element from a WeakSet object.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/delete"
				},
				"has": {
					"!type": "fn(value: ?) -> bool",
					"!doc": "The has() method returns a boolean indicating whether an object exists in a WeakSet or not.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has"
				}
			}
		}
	};

/***/ },

/***/ "./node_modules/tern/node_modules/acorn/dist/acorn.js":
/***/ function(module, exports) {

	!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.acorn=t.acorn||{})}(this,function(t){"use strict";function e(t,e){for(var s=65536,i=0;i<e.length;i+=2){if(s+=e[i],s>t)return!1;if(s+=e[i+1],s>=t)return!0}}function s(t,s){return t<65?36===t:t<91||(t<97?95===t:t<123||(t<=65535?t>=170&&C.test(String.fromCharCode(t)):s!==!1&&e(t,A)))}function i(t,s){return t<48?36===t:t<58||!(t<65)&&(t<91||(t<97?95===t:t<123||(t<=65535?t>=170&&S.test(String.fromCharCode(t)):s!==!1&&(e(t,A)||e(t,_)))))}function r(t,e){return new L(t,{beforeExpr:!0,binop:e})}function n(t,e){return void 0===e&&(e={}),e.keyword=t,I[t]=new L(t,e)}function a(t){return 10===t||13===t||8232===t||8233==t}function o(t){return"[object Array]"===Object.prototype.toString.call(t)}function h(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function p(t,e){for(var s=1,i=0;;){V.lastIndex=i;var r=V.exec(t);if(!(r&&r.index<e))return new B(s,e-i);++s,i=r.index+r[0].length}}function c(t){var e={};for(var s in D)e[s]=t&&h(t,s)?t[s]:D[s];if(null==e.allowReserved&&(e.allowReserved=e.ecmaVersion<5),o(e.onToken)){var i=e.onToken;e.onToken=function(t){return i.push(t)}}return o(e.onComment)&&(e.onComment=u(e,e.onComment)),e}function u(t,e){return function(s,i,r,n,a,o){var h={type:s?"Block":"Line",value:i,start:r,end:n};t.locations&&(h.loc=new M(this,a,o)),t.ranges&&(h.range=[r,n]),e.push(h)}}function l(t){return new RegExp("^("+t.replace(/ /g,"|")+")$")}function d(t,e,s,i){return t.type=e,t.end=s,this.options.locations&&(t.loc.end=i),this.options.ranges&&(t.range[1]=s),t}function f(t,e,s,i){try{return new RegExp(t,e)}catch(t){if(void 0!==s)throw t instanceof SyntaxError&&i.raise(s,"Error parsing regular expression: "+t.message),t}}function m(t){return t<=65535?String.fromCharCode(t):(t-=65536,String.fromCharCode((t>>10)+55296,(1023&t)+56320))}function x(t,e){return new W(e,t).parse()}function v(t,e,s){var i=new W(s,t,e);return i.nextToken(),i.parseExpression()}function y(t,e){return new W(e,t)}var b={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",7:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"},g="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",k={5:g,6:g+" const class extends export import super"},E="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",w="‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣔ-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿",C=new RegExp("["+E+"]"),S=new RegExp("["+E+w+"]");E=w=null;var A=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,19,35,5,35,5,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,66,18,2,1,11,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,56,50,14,50,785,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,2,0,36,17,2,24,85,6,2,0,2,3,2,14,2,9,8,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,19,0,13,4,159,52,19,3,54,47,21,1,2,0,185,46,42,3,37,47,21,0,60,42,86,25,391,63,32,0,449,56,264,8,2,36,18,0,50,29,881,921,103,110,18,195,2749,1070,4050,582,8634,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,65,0,32,6124,20,754,9486,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,60,67,1213,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,3,5761,10591,541],_=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,10,2,4,9,83,11,7,0,161,11,6,9,7,3,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,193,17,10,9,87,19,13,9,214,6,3,8,28,1,83,16,16,9,82,12,9,9,84,14,5,9,423,9,838,7,2,7,17,9,57,21,2,13,19882,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,513,54,5,49,9,0,15,0,23,4,2,14,1361,6,2,16,3,6,2,1,2,4,2214,6,110,6,6,9,792487,239],L=function(t,e){void 0===e&&(e={}),this.label=t,this.keyword=e.keyword,this.beforeExpr=!!e.beforeExpr,this.startsExpr=!!e.startsExpr,this.isLoop=!!e.isLoop,this.isAssign=!!e.isAssign,this.prefix=!!e.prefix,this.postfix=!!e.postfix,this.binop=e.binop||null,this.updateContext=null},N={beforeExpr:!0},T={startsExpr:!0},I={},R={num:new L("num",T),regexp:new L("regexp",T),string:new L("string",T),name:new L("name",T),eof:new L("eof"),bracketL:new L("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new L("]"),braceL:new L("{",{beforeExpr:!0,startsExpr:!0}),braceR:new L("}"),parenL:new L("(",{beforeExpr:!0,startsExpr:!0}),parenR:new L(")"),comma:new L(",",N),semi:new L(";",N),colon:new L(":",N),dot:new L("."),question:new L("?",N),arrow:new L("=>",N),template:new L("template"),ellipsis:new L("...",N),backQuote:new L("`",T),dollarBraceL:new L("${",{beforeExpr:!0,startsExpr:!0}),eq:new L("=",{beforeExpr:!0,isAssign:!0}),assign:new L("_=",{beforeExpr:!0,isAssign:!0}),incDec:new L("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new L("prefix",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:r("||",1),logicalAND:r("&&",2),bitwiseOR:r("|",3),bitwiseXOR:r("^",4),bitwiseAND:r("&",5),equality:r("==/!=",6),relational:r("</>",7),bitShift:r("<</>>",8),plusMin:new L("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:r("%",10),star:r("*",10),slash:r("/",10),starstar:new L("**",{beforeExpr:!0}),_break:n("break"),_case:n("case",N),_catch:n("catch"),_continue:n("continue"),_debugger:n("debugger"),_default:n("default",N),_do:n("do",{isLoop:!0,beforeExpr:!0}),_else:n("else",N),_finally:n("finally"),_for:n("for",{isLoop:!0}),_function:n("function",T),_if:n("if"),_return:n("return",N),_switch:n("switch"),_throw:n("throw",N),_try:n("try"),_var:n("var"),_const:n("const"),_while:n("while",{isLoop:!0}),_with:n("with"),_new:n("new",{beforeExpr:!0,startsExpr:!0}),_this:n("this",T),_super:n("super",T),_class:n("class"),_extends:n("extends",N),_export:n("export"),_import:n("import"),_null:n("null",T),_true:n("true",T),_false:n("false",T),_in:n("in",{beforeExpr:!0,binop:7}),_instanceof:n("instanceof",{beforeExpr:!0,binop:7}),_typeof:n("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_void:n("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),_delete:n("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},P=/\r\n?|\n|\u2028|\u2029/,V=new RegExp(P.source,"g"),F=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,O=/(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,B=function(t,e){this.line=t,this.column=e};B.prototype.offset=function(t){return new B(this.line,this.column+t)};var M=function(t,e,s){this.start=e,this.end=s,null!==t.sourceFile&&(this.source=t.sourceFile)},D={ecmaVersion:6,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1,plugins:{}},q={},W=function(t,e,s){this.options=t=c(t),this.sourceFile=t.sourceFile,this.keywords=l(k[t.ecmaVersion>=6?6:5]);var i=t.allowReserved?"":b[t.ecmaVersion]+("module"==t.sourceType?" await":"");this.reservedWords=l(i);var r=(i?i+" ":"")+b.strict;this.reservedWordsStrict=l(r),this.reservedWordsStrictBind=l(r+" "+b.strictBind),this.input=String(e),this.containsEsc=!1,this.loadPlugins(t.plugins),s?(this.pos=s,this.lineStart=Math.max(0,this.input.lastIndexOf("\n",s)),this.curLine=this.input.slice(0,this.lineStart).split(P).length):(this.pos=this.lineStart=0,this.curLine=1),this.type=R.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.strict=this.inModule="module"===t.sourceType,this.potentialArrowAt=-1,this.inFunction=this.inGenerator=!1,this.labels=[],0===this.pos&&t.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2)};W.prototype.isKeyword=function(t){return this.keywords.test(t)},W.prototype.isReservedWord=function(t){return this.reservedWords.test(t)},W.prototype.extend=function(t,e){this[t]=e(this[t])},W.prototype.loadPlugins=function(t){var e=this;for(var s in t){var i=q[s];if(!i)throw new Error("Plugin '"+s+"' not found");i(e,t[s])}},W.prototype.parse=function(){var t=this.options.program||this.startNode();return this.nextToken(),this.parseTopLevel(t)};var U=W.prototype;U.isUseStrict=function(t){return this.options.ecmaVersion>=5&&"ExpressionStatement"===t.type&&"Literal"===t.expression.type&&"use strict"===t.expression.raw.slice(1,-1)},U.eat=function(t){return this.type===t&&(this.next(),!0)},U.isContextual=function(t){return this.type===R.name&&this.value===t},U.eatContextual=function(t){return this.value===t&&this.eat(R.name)},U.expectContextual=function(t){this.eatContextual(t)||this.unexpected()},U.canInsertSemicolon=function(){return this.type===R.eof||this.type===R.braceR||P.test(this.input.slice(this.lastTokEnd,this.start))},U.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0},U.semicolon=function(){this.eat(R.semi)||this.insertSemicolon()||this.unexpected()},U.afterTrailingComma=function(t){if(this.type==t)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),this.next(),!0},U.expect=function(t){this.eat(t)||this.unexpected()},U.unexpected=function(t){this.raise(null!=t?t:this.start,"Unexpected token")};var j=function(){this.shorthandAssign=0,this.trailingComma=0};U.checkPatternErrors=function(t,e){var s=t&&t.trailingComma;return e?void(s&&this.raise(s,"Comma is not permitted after the rest element")):!!s},U.checkExpressionErrors=function(t,e){var s=t&&t.shorthandAssign;return e?void(s&&this.raise(s,"Shorthand property assignments are valid only in destructuring patterns")):!!s};var G=W.prototype;G.parseTopLevel=function(t){var e=this,s=!0;for(t.body||(t.body=[]);this.type!==R.eof;){var i=e.parseStatement(!0,!0);t.body.push(i),s&&(e.isUseStrict(i)&&e.setStrict(!0),s=!1)}return this.next(),this.options.ecmaVersion>=6&&(t.sourceType=this.options.sourceType),this.finishNode(t,"Program")};var z={kind:"loop"},Q={kind:"switch"};G.isLet=function(){if(this.type!==R.name||this.options.ecmaVersion<6||"let"!=this.value)return!1;O.lastIndex=this.pos;var t=O.exec(this.input),e=this.pos+t[0].length,r=this.input.charCodeAt(e);if(91===r||123==r)return!0;if(s(r,!0)){for(var n=e+1;i(this.input.charCodeAt(n),!0);++n);var a=this.input.slice(e,n);if(!this.isKeyword(a))return!0}return!1},G.parseStatement=function(t,e){var s,i=this.type,r=this.startNode();switch(this.isLet()&&(i=R._var,s="let"),i){case R._break:case R._continue:return this.parseBreakContinueStatement(r,i.keyword);case R._debugger:return this.parseDebuggerStatement(r);case R._do:return this.parseDoStatement(r);case R._for:return this.parseForStatement(r);case R._function:return!t&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(r);case R._class:return t||this.unexpected(),this.parseClass(r,!0);case R._if:return this.parseIfStatement(r);case R._return:return this.parseReturnStatement(r);case R._switch:return this.parseSwitchStatement(r);case R._throw:return this.parseThrowStatement(r);case R._try:return this.parseTryStatement(r);case R._const:case R._var:return s=s||this.value,t||"var"==s||this.unexpected(),this.parseVarStatement(r,s);case R._while:return this.parseWhileStatement(r);case R._with:return this.parseWithStatement(r);case R.braceL:return this.parseBlock();case R.semi:return this.parseEmptyStatement(r);case R._export:case R._import:return this.options.allowImportExportEverywhere||(e||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),i===R._import?this.parseImport(r):this.parseExport(r);default:var n=this.value,a=this.parseExpression();return i===R.name&&"Identifier"===a.type&&this.eat(R.colon)?this.parseLabeledStatement(r,n,a):this.parseExpressionStatement(r,a)}},G.parseBreakContinueStatement=function(t,e){var s=this,i="break"==e;this.next(),this.eat(R.semi)||this.insertSemicolon()?t.label=null:this.type!==R.name?this.unexpected():(t.label=this.parseIdent(),this.semicolon());for(var r=0;r<this.labels.length;++r){var n=s.labels[r];if(null==t.label||n.name===t.label.name){if(null!=n.kind&&(i||"loop"===n.kind))break;if(t.label&&i)break}}return r===this.labels.length&&this.raise(t.start,"Unsyntactic "+e),this.finishNode(t,i?"BreakStatement":"ContinueStatement")},G.parseDebuggerStatement=function(t){return this.next(),this.semicolon(),this.finishNode(t,"DebuggerStatement")},G.parseDoStatement=function(t){return this.next(),this.labels.push(z),t.body=this.parseStatement(!1),this.labels.pop(),this.expect(R._while),t.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(R.semi):this.semicolon(),this.finishNode(t,"DoWhileStatement")},G.parseForStatement=function(t){if(this.next(),this.labels.push(z),this.expect(R.parenL),this.type===R.semi)return this.parseFor(t,null);var e=this.isLet();if(this.type===R._var||this.type===R._const||e){var s=this.startNode(),i=e?"let":this.value;return this.next(),this.parseVar(s,!0,i),this.finishNode(s,"VariableDeclaration"),!(this.type===R._in||this.options.ecmaVersion>=6&&this.isContextual("of"))||1!==s.declarations.length||"var"!==i&&s.declarations[0].init?this.parseFor(t,s):this.parseForIn(t,s)}var r=new j,n=this.parseExpression(!0,r);return this.type===R._in||this.options.ecmaVersion>=6&&this.isContextual("of")?(this.checkPatternErrors(r,!0),this.toAssignable(n),this.checkLVal(n),this.parseForIn(t,n)):(this.checkExpressionErrors(r,!0),this.parseFor(t,n))},G.parseFunctionStatement=function(t){return this.next(),this.parseFunction(t,!0)},G.parseIfStatement=function(t){return this.next(),t.test=this.parseParenExpression(),t.consequent=this.parseStatement(!1),t.alternate=this.eat(R._else)?this.parseStatement(!1):null,this.finishNode(t,"IfStatement")},G.parseReturnStatement=function(t){return this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(R.semi)||this.insertSemicolon()?t.argument=null:(t.argument=this.parseExpression(),this.semicolon()),this.finishNode(t,"ReturnStatement")},G.parseSwitchStatement=function(t){var e=this;this.next(),t.discriminant=this.parseParenExpression(),t.cases=[],this.expect(R.braceL),this.labels.push(Q);for(var s,i=!1;this.type!=R.braceR;)if(e.type===R._case||e.type===R._default){var r=e.type===R._case;s&&e.finishNode(s,"SwitchCase"),t.cases.push(s=e.startNode()),s.consequent=[],e.next(),r?s.test=e.parseExpression():(i&&e.raiseRecoverable(e.lastTokStart,"Multiple default clauses"),i=!0,s.test=null),e.expect(R.colon)}else s||e.unexpected(),s.consequent.push(e.parseStatement(!0));return s&&this.finishNode(s,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(t,"SwitchStatement")},G.parseThrowStatement=function(t){return this.next(),P.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),t.argument=this.parseExpression(),this.semicolon(),this.finishNode(t,"ThrowStatement")};var H=[];G.parseTryStatement=function(t){if(this.next(),t.block=this.parseBlock(),t.handler=null,this.type===R._catch){var e=this.startNode();this.next(),this.expect(R.parenL),e.param=this.parseBindingAtom(),this.checkLVal(e.param,!0),this.expect(R.parenR),e.body=this.parseBlock(),t.handler=this.finishNode(e,"CatchClause")}return t.finalizer=this.eat(R._finally)?this.parseBlock():null,t.handler||t.finalizer||this.raise(t.start,"Missing catch or finally clause"),this.finishNode(t,"TryStatement")},G.parseVarStatement=function(t,e){return this.next(),this.parseVar(t,!1,e),this.semicolon(),this.finishNode(t,"VariableDeclaration")},G.parseWhileStatement=function(t){return this.next(),t.test=this.parseParenExpression(),this.labels.push(z),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,"WhileStatement")},G.parseWithStatement=function(t){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),t.object=this.parseParenExpression(),t.body=this.parseStatement(!1),this.finishNode(t,"WithStatement")},G.parseEmptyStatement=function(t){return this.next(),this.finishNode(t,"EmptyStatement")},G.parseLabeledStatement=function(t,e,s){for(var i=this,r=0;r<this.labels.length;++r)i.labels[r].name===e&&i.raise(s.start,"Label '"+e+"' is already declared");for(var n=this.type.isLoop?"loop":this.type===R._switch?"switch":null,a=this.labels.length-1;a>=0;a--){var o=i.labels[a];if(o.statementStart!=t.start)break;o.statementStart=i.start,o.kind=n}return this.labels.push({name:e,kind:n,statementStart:this.start}),t.body=this.parseStatement(!0),this.labels.pop(),t.label=s,this.finishNode(t,"LabeledStatement")},G.parseExpressionStatement=function(t,e){return t.expression=e,this.semicolon(),this.finishNode(t,"ExpressionStatement")},G.parseBlock=function(t){var e,s=this,i=this.startNode(),r=!0;for(i.body=[],this.expect(R.braceL);!this.eat(R.braceR);){var n=s.parseStatement(!0);i.body.push(n),r&&t&&s.isUseStrict(n)&&(e=s.strict,s.setStrict(s.strict=!0)),r=!1}return e===!1&&this.setStrict(!1),this.finishNode(i,"BlockStatement")},G.parseFor=function(t,e){return t.init=e,this.expect(R.semi),t.test=this.type===R.semi?null:this.parseExpression(),this.expect(R.semi),t.update=this.type===R.parenR?null:this.parseExpression(),this.expect(R.parenR),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,"ForStatement")},G.parseForIn=function(t,e){var s=this.type===R._in?"ForInStatement":"ForOfStatement";return this.next(),t.left=e,t.right=this.parseExpression(),this.expect(R.parenR),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,s)},G.parseVar=function(t,e,s){var i=this;for(t.declarations=[],t.kind=s;;){var r=i.startNode();if(i.parseVarId(r),i.eat(R.eq)?r.init=i.parseMaybeAssign(e):"const"!==s||i.type===R._in||i.options.ecmaVersion>=6&&i.isContextual("of")?"Identifier"==r.id.type||e&&(i.type===R._in||i.isContextual("of"))?r.init=null:i.raise(i.lastTokEnd,"Complex binding patterns require an initialization value"):i.unexpected(),t.declarations.push(i.finishNode(r,"VariableDeclarator")),!i.eat(R.comma))break}return t},G.parseVarId=function(t){t.id=this.parseBindingAtom(),this.checkLVal(t.id,!0)},G.parseFunction=function(t,e,s){this.initFunction(t),this.options.ecmaVersion>=6&&(t.generator=this.eat(R.star));var i=this.inGenerator;return this.inGenerator=t.generator,(e||this.type===R.name)&&(t.id=this.parseIdent()),this.parseFunctionParams(t),this.parseFunctionBody(t,s),this.inGenerator=i,this.finishNode(t,e?"FunctionDeclaration":"FunctionExpression")},G.parseFunctionParams=function(t){this.expect(R.parenL),t.params=this.parseBindingList(R.parenR,!1,!1,!0)},G.parseClass=function(t,e){var s=this;this.next(),this.parseClassId(t,e),this.parseClassSuper(t);var i=this.startNode(),r=!1;for(i.body=[],this.expect(R.braceL);!this.eat(R.braceR);)if(!s.eat(R.semi)){var n=s.startNode(),a=s.eat(R.star),o=s.type===R.name&&"static"===s.value;s.parsePropertyName(n),n.static=o&&s.type!==R.parenL,n.static&&(a&&s.unexpected(),a=s.eat(R.star),s.parsePropertyName(n)),n.kind="method";var h=!1;if(!n.computed){var p=n.key;a||"Identifier"!==p.type||s.type===R.parenL||"get"!==p.name&&"set"!==p.name||(h=!0,n.kind=p.name,p=s.parsePropertyName(n)),!n.static&&("Identifier"===p.type&&"constructor"===p.name||"Literal"===p.type&&"constructor"===p.value)&&(r&&s.raise(p.start,"Duplicate constructor in the same class"),h&&s.raise(p.start,"Constructor can't have get/set modifier"),a&&s.raise(p.start,"Constructor can't be a generator"),n.kind="constructor",r=!0)}if(s.parseClassMethod(i,n,a),h){var c="get"===n.kind?0:1;if(n.value.params.length!==c){var u=n.value.start;"get"===n.kind?s.raiseRecoverable(u,"getter should have no params"):s.raiseRecoverable(u,"setter should have exactly one param")}"set"===n.kind&&"RestElement"===n.value.params[0].type&&s.raise(n.value.params[0].start,"Setter cannot use rest params")}}return t.body=this.finishNode(i,"ClassBody"),this.finishNode(t,e?"ClassDeclaration":"ClassExpression")},G.parseClassMethod=function(t,e,s){e.value=this.parseMethod(s),t.body.push(this.finishNode(e,"MethodDefinition"))},G.parseClassId=function(t,e){t.id=this.type===R.name?this.parseIdent():e?this.unexpected():null},G.parseClassSuper=function(t){t.superClass=this.eat(R._extends)?this.parseExprSubscripts():null},G.parseExport=function(t){var e=this;if(this.next(),this.eat(R.star))return this.expectContextual("from"),t.source=this.type===R.string?this.parseExprAtom():this.unexpected(),this.semicolon(),this.finishNode(t,"ExportAllDeclaration");if(this.eat(R._default)){var s=this.type==R.parenL,i=this.parseMaybeAssign(),r=!0;return s||"FunctionExpression"!=i.type&&"ClassExpression"!=i.type||(r=!1,i.id&&(i.type="FunctionExpression"==i.type?"FunctionDeclaration":"ClassDeclaration")),t.declaration=i,r&&this.semicolon(),this.finishNode(t,"ExportDefaultDeclaration")}if(this.shouldParseExportStatement())t.declaration=this.parseStatement(!0),t.specifiers=[],t.source=null;else{if(t.declaration=null,t.specifiers=this.parseExportSpecifiers(),this.eatContextual("from"))t.source=this.type===R.string?this.parseExprAtom():this.unexpected();else{for(var n=0;n<t.specifiers.length;n++)(e.keywords.test(t.specifiers[n].local.name)||e.reservedWords.test(t.specifiers[n].local.name))&&e.unexpected(t.specifiers[n].local.start);t.source=null}this.semicolon()}return this.finishNode(t,"ExportNamedDeclaration")},G.shouldParseExportStatement=function(){return this.type.keyword||this.isLet()},G.parseExportSpecifiers=function(){var t=this,e=[],s=!0;for(this.expect(R.braceL);!this.eat(R.braceR);){if(s)s=!1;else if(t.expect(R.comma),t.afterTrailingComma(R.braceR))break;var i=t.startNode();i.local=t.parseIdent(t.type===R._default),i.exported=t.eatContextual("as")?t.parseIdent(!0):i.local,e.push(t.finishNode(i,"ExportSpecifier"))}return e},G.parseImport=function(t){return this.next(),this.type===R.string?(t.specifiers=H,t.source=this.parseExprAtom()):(t.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),t.source=this.type===R.string?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(t,"ImportDeclaration")},G.parseImportSpecifiers=function(){var t=this,e=[],s=!0;if(this.type===R.name){var i=this.startNode();if(i.local=this.parseIdent(),this.checkLVal(i.local,!0),e.push(this.finishNode(i,"ImportDefaultSpecifier")),!this.eat(R.comma))return e}if(this.type===R.star){var r=this.startNode();return this.next(),this.expectContextual("as"),r.local=this.parseIdent(),this.checkLVal(r.local,!0),e.push(this.finishNode(r,"ImportNamespaceSpecifier")),e}for(this.expect(R.braceL);!this.eat(R.braceR);){if(s)s=!1;else if(t.expect(R.comma),t.afterTrailingComma(R.braceR))break;var n=t.startNode();n.imported=t.parseIdent(!0),t.eatContextual("as")?n.local=t.parseIdent():(n.local=n.imported,t.isKeyword(n.local.name)&&t.unexpected(n.local.start),t.reservedWordsStrict.test(n.local.name)&&t.raise(n.local.start,"The keyword '"+n.local.name+"' is reserved")),t.checkLVal(n.local,!0),e.push(t.finishNode(n,"ImportSpecifier"))}return e};var X=W.prototype;X.toAssignable=function(t,e){var s=this;if(this.options.ecmaVersion>=6&&t)switch(t.type){case"Identifier":case"ObjectPattern":case"ArrayPattern":break;case"ObjectExpression":t.type="ObjectPattern";for(var i=0;i<t.properties.length;i++){var r=t.properties[i];"init"!==r.kind&&s.raise(r.key.start,"Object pattern can't contain getter or setter"),s.toAssignable(r.value,e)}break;case"ArrayExpression":t.type="ArrayPattern",this.toAssignableList(t.elements,e);break;case"AssignmentExpression":if("="!==t.operator){this.raise(t.left.end,"Only '=' operator can be used for specifying default value.");break}t.type="AssignmentPattern",delete t.operator;case"AssignmentPattern":"YieldExpression"===t.right.type&&this.raise(t.right.start,"Yield expression cannot be a default value");break;case"ParenthesizedExpression":t.expression=this.toAssignable(t.expression,e);break;case"MemberExpression":if(!e)break;default:this.raise(t.start,"Assigning to rvalue")}return t},X.toAssignableList=function(t,e){var s=this,i=t.length;if(i){var r=t[i-1];if(r&&"RestElement"==r.type)--i;else if(r&&"SpreadElement"==r.type){r.type="RestElement";var n=r.argument;this.toAssignable(n,e),"Identifier"!==n.type&&"MemberExpression"!==n.type&&"ArrayPattern"!==n.type&&this.unexpected(n.start),--i}e&&r&&"RestElement"===r.type&&"Identifier"!==r.argument.type&&this.unexpected(r.argument.start)}for(var a=0;a<i;a++){var o=t[a];o&&s.toAssignable(o,e)}return t},X.parseSpread=function(t){var e=this.startNode();return this.next(),e.argument=this.parseMaybeAssign(!1,t),this.finishNode(e,"SpreadElement")},X.parseRest=function(t){var e=this.startNode();return this.next(),t?e.argument=this.type===R.name?this.parseIdent():this.unexpected():e.argument=this.type===R.name||this.type===R.bracketL?this.parseBindingAtom():this.unexpected(),this.finishNode(e,"RestElement")},X.parseBindingAtom=function(){if(this.options.ecmaVersion<6)return this.parseIdent();switch(this.type){case R.name:return this.parseIdent();case R.bracketL:var t=this.startNode();return this.next(),t.elements=this.parseBindingList(R.bracketR,!0,!0),this.finishNode(t,"ArrayPattern");case R.braceL:return this.parseObj(!0);default:this.unexpected()}},X.parseBindingList=function(t,e,s,i){for(var r=this,n=[],a=!0;!this.eat(t);)if(a?a=!1:r.expect(R.comma),e&&r.type===R.comma)n.push(null);else{if(s&&r.afterTrailingComma(t))break;if(r.type===R.ellipsis){var o=r.parseRest(i);r.parseBindingListItem(o),n.push(o),r.type===R.comma&&r.raise(r.start,"Comma is not permitted after the rest element"),r.expect(t);break}var h=r.parseMaybeDefault(r.start,r.startLoc);r.parseBindingListItem(h),n.push(h)}return n},X.parseBindingListItem=function(t){return t},X.parseMaybeDefault=function(t,e,s){if(s=s||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(R.eq))return s;var i=this.startNodeAt(t,e);return i.left=s,i.right=this.parseMaybeAssign(),this.finishNode(i,"AssignmentPattern")},X.checkLVal=function(t,e,s){var i=this;switch(t.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(t.name)&&this.raiseRecoverable(t.start,(e?"Binding ":"Assigning to ")+t.name+" in strict mode"),s&&(h(s,t.name)&&this.raiseRecoverable(t.start,"Argument name clash"),s[t.name]=!0);break;case"MemberExpression":e&&this.raiseRecoverable(t.start,(e?"Binding":"Assigning to")+" member expression");break;case"ObjectPattern":for(var r=0;r<t.properties.length;r++)i.checkLVal(t.properties[r].value,e,s);break;case"ArrayPattern":for(var n=0;n<t.elements.length;n++){var a=t.elements[n];a&&i.checkLVal(a,e,s)}break;case"AssignmentPattern":this.checkLVal(t.left,e,s);break;case"RestElement":this.checkLVal(t.argument,e,s);break;case"ParenthesizedExpression":this.checkLVal(t.expression,e,s);break;default:this.raise(t.start,(e?"Binding":"Assigning to")+" rvalue")}};var $=W.prototype;$.checkPropClash=function(t,e){if(!(this.options.ecmaVersion>=6&&(t.computed||t.method||t.shorthand))){var s,i=t.key;switch(i.type){case"Identifier":s=i.name;break;case"Literal":s=String(i.value);break;default:return}var r=t.kind;if(this.options.ecmaVersion>=6)return void("__proto__"===s&&"init"===r&&(e.proto&&this.raiseRecoverable(i.start,"Redefinition of __proto__ property"),e.proto=!0));s="$"+s;var n=e[s];if(n){var a="init"!==r;(!this.strict&&!a||!n[r])&&a^n.init||this.raiseRecoverable(i.start,"Redefinition of property")}else n=e[s]={init:!1,get:!1,set:!1};n[r]=!0}},$.parseExpression=function(t,e){var s=this,i=this.start,r=this.startLoc,n=this.parseMaybeAssign(t,e);if(this.type===R.comma){var a=this.startNodeAt(i,r);for(a.expressions=[n];this.eat(R.comma);)a.expressions.push(s.parseMaybeAssign(t,e));return this.finishNode(a,"SequenceExpression")}return n},$.parseMaybeAssign=function(t,e,s){if(this.inGenerator&&this.isContextual("yield"))return this.parseYield();var i=!1;e||(e=new j,i=!0);var r=this.start,n=this.startLoc;this.type!=R.parenL&&this.type!=R.name||(this.potentialArrowAt=this.start);var a=this.parseMaybeConditional(t,e);if(s&&(a=s.call(this,a,r,n)),this.type.isAssign){this.checkPatternErrors(e,!0),i||j.call(e);var o=this.startNodeAt(r,n);return o.operator=this.value,o.left=this.type===R.eq?this.toAssignable(a):a,e.shorthandAssign=0,this.checkLVal(a),this.next(),o.right=this.parseMaybeAssign(t),this.finishNode(o,"AssignmentExpression")}return i&&this.checkExpressionErrors(e,!0),a},$.parseMaybeConditional=function(t,e){var s=this.start,i=this.startLoc,r=this.parseExprOps(t,e);if(this.checkExpressionErrors(e))return r;if(this.eat(R.question)){var n=this.startNodeAt(s,i);return n.test=r,n.consequent=this.parseMaybeAssign(),this.expect(R.colon),n.alternate=this.parseMaybeAssign(t),this.finishNode(n,"ConditionalExpression")}return r},$.parseExprOps=function(t,e){var s=this.start,i=this.startLoc,r=this.parseMaybeUnary(e,!1);return this.checkExpressionErrors(e)?r:this.parseExprOp(r,s,i,-1,t)},$.parseExprOp=function(t,e,s,i,r){var n=this.type.binop;if(null!=n&&(!r||this.type!==R._in)&&n>i){var a=this.type===R.logicalOR||this.type===R.logicalAND,o=this.value;this.next();var h=this.start,p=this.startLoc,c=this.parseExprOp(this.parseMaybeUnary(null,!1),h,p,n,r),u=this.buildBinary(e,s,t,c,o,a);return this.parseExprOp(u,e,s,i,r)}return t},$.buildBinary=function(t,e,s,i,r,n){var a=this.startNodeAt(t,e);return a.left=s,a.operator=r,a.right=i,this.finishNode(a,n?"LogicalExpression":"BinaryExpression")},$.parseMaybeUnary=function(t,e){var s,i=this,r=this.start,n=this.startLoc;if(this.type.prefix){var a=this.startNode(),o=this.type===R.incDec;a.operator=this.value,a.prefix=!0,this.next(),a.argument=this.parseMaybeUnary(null,!0),this.checkExpressionErrors(t,!0),o?this.checkLVal(a.argument):this.strict&&"delete"===a.operator&&"Identifier"===a.argument.type?this.raiseRecoverable(a.start,"Deleting local variable in strict mode"):e=!0,
	s=this.finishNode(a,o?"UpdateExpression":"UnaryExpression")}else{if(s=this.parseExprSubscripts(t),this.checkExpressionErrors(t))return s;for(;this.type.postfix&&!this.canInsertSemicolon();){var h=i.startNodeAt(r,n);h.operator=i.value,h.prefix=!1,h.argument=s,i.checkLVal(s),i.next(),s=i.finishNode(h,"UpdateExpression")}}return!e&&this.eat(R.starstar)?this.buildBinary(r,n,s,this.parseMaybeUnary(null,!1),"**",!1):s},$.parseExprSubscripts=function(t){var e=this.start,s=this.startLoc,i=this.parseExprAtom(t),r="ArrowFunctionExpression"===i.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd);return this.checkExpressionErrors(t)||r?i:this.parseSubscripts(i,e,s)},$.parseSubscripts=function(t,e,s,i){for(var r=this;;)if(r.eat(R.dot)){var n=r.startNodeAt(e,s);n.object=t,n.property=r.parseIdent(!0),n.computed=!1,t=r.finishNode(n,"MemberExpression")}else if(r.eat(R.bracketL)){var a=r.startNodeAt(e,s);a.object=t,a.property=r.parseExpression(),a.computed=!0,r.expect(R.bracketR),t=r.finishNode(a,"MemberExpression")}else if(!i&&r.eat(R.parenL)){var o=r.startNodeAt(e,s);o.callee=t,o.arguments=r.parseExprList(R.parenR,!1),t=r.finishNode(o,"CallExpression")}else{if(r.type!==R.backQuote)return t;var h=r.startNodeAt(e,s);h.tag=t,h.quasi=r.parseTemplate(),t=r.finishNode(h,"TaggedTemplateExpression")}},$.parseExprAtom=function(t){var e,s=this.potentialArrowAt==this.start;switch(this.type){case R._super:this.inFunction||this.raise(this.start,"'super' outside of function or class");case R._this:var i=this.type===R._this?"ThisExpression":"Super";return e=this.startNode(),this.next(),this.finishNode(e,i);case R.name:var r=this.start,n=this.startLoc,a=this.parseIdent(this.type!==R.name);return s&&!this.canInsertSemicolon()&&this.eat(R.arrow)?this.parseArrowExpression(this.startNodeAt(r,n),[a]):a;case R.regexp:var o=this.value;return e=this.parseLiteral(o.value),e.regex={pattern:o.pattern,flags:o.flags},e;case R.num:case R.string:return this.parseLiteral(this.value);case R._null:case R._true:case R._false:return e=this.startNode(),e.value=this.type===R._null?null:this.type===R._true,e.raw=this.type.keyword,this.next(),this.finishNode(e,"Literal");case R.parenL:return this.parseParenAndDistinguishExpression(s);case R.bracketL:return e=this.startNode(),this.next(),e.elements=this.parseExprList(R.bracketR,!0,!0,t),this.finishNode(e,"ArrayExpression");case R.braceL:return this.parseObj(!1,t);case R._function:return e=this.startNode(),this.next(),this.parseFunction(e,!1);case R._class:return this.parseClass(this.startNode(),!1);case R._new:return this.parseNew();case R.backQuote:return this.parseTemplate();default:this.unexpected()}},$.parseLiteral=function(t){var e=this.startNode();return e.value=t,e.raw=this.input.slice(this.start,this.end),this.next(),this.finishNode(e,"Literal")},$.parseParenExpression=function(){this.expect(R.parenL);var t=this.parseExpression();return this.expect(R.parenR),t},$.parseParenAndDistinguishExpression=function(t){var e,s=this,i=this.start,r=this.startLoc;if(this.options.ecmaVersion>=6){this.next();for(var n,a,o=this.start,h=this.startLoc,p=[],c=!0,u=new j;this.type!==R.parenR;){if(c?c=!1:s.expect(R.comma),s.type===R.ellipsis){n=s.start,p.push(s.parseParenItem(s.parseRest()));break}s.type!==R.parenL||a||(a=s.start),p.push(s.parseMaybeAssign(!1,u,s.parseParenItem))}var l=this.start,d=this.startLoc;if(this.expect(R.parenR),t&&!this.canInsertSemicolon()&&this.eat(R.arrow))return this.checkPatternErrors(u,!0),a&&this.unexpected(a),this.parseParenArrowList(i,r,p);p.length||this.unexpected(this.lastTokStart),n&&this.unexpected(n),this.checkExpressionErrors(u,!0),p.length>1?(e=this.startNodeAt(o,h),e.expressions=p,this.finishNodeAt(e,"SequenceExpression",l,d)):e=p[0]}else e=this.parseParenExpression();if(this.options.preserveParens){var f=this.startNodeAt(i,r);return f.expression=e,this.finishNode(f,"ParenthesizedExpression")}return e},$.parseParenItem=function(t){return t},$.parseParenArrowList=function(t,e,s){return this.parseArrowExpression(this.startNodeAt(t,e),s)};var Y=[];$.parseNew=function(){var t=this.startNode(),e=this.parseIdent(!0);if(this.options.ecmaVersion>=6&&this.eat(R.dot))return t.meta=e,t.property=this.parseIdent(!0),"target"!==t.property.name&&this.raiseRecoverable(t.property.start,"The only valid meta property for new is new.target"),this.inFunction||this.raiseRecoverable(t.start,"new.target can only be used in functions"),this.finishNode(t,"MetaProperty");var s=this.start,i=this.startLoc;return t.callee=this.parseSubscripts(this.parseExprAtom(),s,i,!0),this.eat(R.parenL)?t.arguments=this.parseExprList(R.parenR,!1):t.arguments=Y,this.finishNode(t,"NewExpression")},$.parseTemplateElement=function(){var t=this.startNode();return t.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value},this.next(),t.tail=this.type===R.backQuote,this.finishNode(t,"TemplateElement")},$.parseTemplate=function(){var t=this,e=this.startNode();this.next(),e.expressions=[];var s=this.parseTemplateElement();for(e.quasis=[s];!s.tail;)t.expect(R.dollarBraceL),e.expressions.push(t.parseExpression()),t.expect(R.braceR),e.quasis.push(s=t.parseTemplateElement());return this.next(),this.finishNode(e,"TemplateLiteral")},$.parseObj=function(t,e){var s=this,i=this.startNode(),r=!0,n={};for(i.properties=[],this.next();!this.eat(R.braceR);){if(r)r=!1;else if(s.expect(R.comma),s.afterTrailingComma(R.braceR))break;var a,o,h,p=s.startNode();s.options.ecmaVersion>=6&&(p.method=!1,p.shorthand=!1,(t||e)&&(o=s.start,h=s.startLoc),t||(a=s.eat(R.star))),s.parsePropertyName(p),s.parsePropertyValue(p,t,a,o,h,e),s.checkPropClash(p,n),i.properties.push(s.finishNode(p,"Property"))}return this.finishNode(i,t?"ObjectPattern":"ObjectExpression")},$.parsePropertyValue=function(t,e,s,i,r,n){if(this.eat(R.colon))t.value=e?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,n),t.kind="init";else if(this.options.ecmaVersion>=6&&this.type===R.parenL)e&&this.unexpected(),t.kind="init",t.method=!0,t.value=this.parseMethod(s);else if(this.options.ecmaVersion>=5&&!t.computed&&"Identifier"===t.key.type&&("get"===t.key.name||"set"===t.key.name)&&this.type!=R.comma&&this.type!=R.braceR){(s||e)&&this.unexpected(),t.kind=t.key.name,this.parsePropertyName(t),t.value=this.parseMethod(!1);var a="get"===t.kind?0:1;if(t.value.params.length!==a){var o=t.value.start;"get"===t.kind?this.raiseRecoverable(o,"getter should have no params"):this.raiseRecoverable(o,"setter should have exactly one param")}"set"===t.kind&&"RestElement"===t.value.params[0].type&&this.raiseRecoverable(t.value.params[0].start,"Setter cannot use rest params")}else this.options.ecmaVersion>=6&&!t.computed&&"Identifier"===t.key.type?((this.keywords.test(t.key.name)||(this.strict?this.reservedWordsStrictBind:this.reservedWords).test(t.key.name)||this.inGenerator&&"yield"==t.key.name)&&this.raiseRecoverable(t.key.start,"'"+t.key.name+"' can not be used as shorthand property"),t.kind="init",e?t.value=this.parseMaybeDefault(i,r,t.key):this.type===R.eq&&n?(n.shorthandAssign||(n.shorthandAssign=this.start),t.value=this.parseMaybeDefault(i,r,t.key)):t.value=t.key,t.shorthand=!0):this.unexpected()},$.parsePropertyName=function(t){if(this.options.ecmaVersion>=6){if(this.eat(R.bracketL))return t.computed=!0,t.key=this.parseMaybeAssign(),this.expect(R.bracketR),t.key;t.computed=!1}return t.key=this.type===R.num||this.type===R.string?this.parseExprAtom():this.parseIdent(!0)},$.initFunction=function(t){t.id=null,this.options.ecmaVersion>=6&&(t.generator=!1,t.expression=!1)},$.parseMethod=function(t){var e=this.startNode(),s=this.inGenerator;return this.inGenerator=t,this.initFunction(e),this.expect(R.parenL),e.params=this.parseBindingList(R.parenR,!1,!1),this.options.ecmaVersion>=6&&(e.generator=t),this.parseFunctionBody(e,!1),this.inGenerator=s,this.finishNode(e,"FunctionExpression")},$.parseArrowExpression=function(t,e){var s=this.inGenerator;return this.inGenerator=!1,this.initFunction(t),t.params=this.toAssignableList(e,!0),this.parseFunctionBody(t,!0),this.inGenerator=s,this.finishNode(t,"ArrowFunctionExpression")},$.parseFunctionBody=function(t,e){var s=e&&this.type!==R.braceL;if(s)t.body=this.parseMaybeAssign(),t.expression=!0;else{var i=this.inFunction,r=this.labels;this.inFunction=!0,this.labels=[],t.body=this.parseBlock(!0),t.expression=!1,this.inFunction=i,this.labels=r}var n=!s&&t.body.body.length&&this.isUseStrict(t.body.body[0])?t.body.body[0]:null;if(this.strict||n){var a=this.strict;this.strict=!0,t.id&&this.checkLVal(t.id,!0),this.checkParams(t,n),this.strict=a}else e&&this.checkParams(t,n)},$.checkParams=function(t,e){for(var s=this,i={},r=0;r<t.params.length;r++)e&&s.options.ecmaVersion>=7&&"Identifier"!==t.params[r].type&&s.raiseRecoverable(e.start,"Illegal 'use strict' directive in function with non-simple parameter list"),s.checkLVal(t.params[r],!0,i)},$.parseExprList=function(t,e,s,i){for(var r=this,n=[],a=!0;!this.eat(t);){if(a)a=!1;else if(r.expect(R.comma),e&&r.afterTrailingComma(t))break;var o;s&&r.type===R.comma?o=null:r.type===R.ellipsis?(o=r.parseSpread(i),r.type===R.comma&&i&&!i.trailingComma&&(i.trailingComma=r.lastTokStart)):o=r.parseMaybeAssign(!1,i),n.push(o)}return n},$.parseIdent=function(t){var e=this.startNode();return t&&"never"==this.options.allowReserved&&(t=!1),this.type===R.name?(!t&&(this.strict?this.reservedWordsStrict:this.reservedWords).test(this.value)&&(this.options.ecmaVersion>=6||this.input.slice(this.start,this.end).indexOf("\\")==-1)&&this.raiseRecoverable(this.start,"The keyword '"+this.value+"' is reserved"),!t&&this.inGenerator&&"yield"===this.value&&this.raiseRecoverable(this.start,"Can not use 'yield' as identifier inside a generator"),e.name=this.value):t&&this.type.keyword?e.name=this.type.keyword:this.unexpected(),this.next(),this.finishNode(e,"Identifier")},$.parseYield=function(){var t=this.startNode();return this.next(),this.type==R.semi||this.canInsertSemicolon()||this.type!=R.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(R.star),t.argument=this.parseMaybeAssign()),this.finishNode(t,"YieldExpression")};var K=W.prototype;K.raise=function(t,e){var s=p(this.input,t);e+=" ("+s.line+":"+s.column+")";var i=new SyntaxError(e);throw i.pos=t,i.loc=s,i.raisedAt=this.pos,i},K.raiseRecoverable=K.raise,K.curPosition=function(){if(this.options.locations)return new B(this.curLine,this.pos-this.lineStart)};var J=function(t,e,s){this.type="",this.start=e,this.end=0,t.options.locations&&(this.loc=new M(t,s)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[e,0])},Z=W.prototype;Z.startNode=function(){return new J(this,this.start,this.startLoc)},Z.startNodeAt=function(t,e){return new J(this,t,e)},Z.finishNode=function(t,e){return d.call(this,t,e,this.lastTokEnd,this.lastTokEndLoc)},Z.finishNodeAt=function(t,e,s,i){return d.call(this,t,e,s,i)};var tt=function(t,e,s,i){this.token=t,this.isExpr=!!e,this.preserveSpace=!!s,this.override=i},et={b_stat:new tt("{",!1),b_expr:new tt("{",!0),b_tmpl:new tt("${",!0),p_stat:new tt("(",!1),p_expr:new tt("(",!0),q_tmpl:new tt("`",!0,!0,function(t){return t.readTmplToken()}),f_expr:new tt("function",!0)},st=W.prototype;st.initialContext=function(){return[et.b_stat]},st.braceIsBlock=function(t){if(t===R.colon){var e=this.curContext();if(e===et.b_stat||e===et.b_expr)return!e.isExpr}return t===R._return?P.test(this.input.slice(this.lastTokEnd,this.start)):t===R._else||t===R.semi||t===R.eof||t===R.parenR||(t==R.braceL?this.curContext()===et.b_stat:!this.exprAllowed)},st.updateContext=function(t){var e,s=this.type;s.keyword&&t==R.dot?this.exprAllowed=!1:(e=s.updateContext)?e.call(this,t):this.exprAllowed=s.beforeExpr},R.parenR.updateContext=R.braceR.updateContext=function(){if(1==this.context.length)return void(this.exprAllowed=!0);var t=this.context.pop();t===et.b_stat&&this.curContext()===et.f_expr?(this.context.pop(),this.exprAllowed=!1):t===et.b_tmpl?this.exprAllowed=!0:this.exprAllowed=!t.isExpr},R.braceL.updateContext=function(t){this.context.push(this.braceIsBlock(t)?et.b_stat:et.b_expr),this.exprAllowed=!0},R.dollarBraceL.updateContext=function(){this.context.push(et.b_tmpl),this.exprAllowed=!0},R.parenL.updateContext=function(t){var e=t===R._if||t===R._for||t===R._with||t===R._while;this.context.push(e?et.p_stat:et.p_expr),this.exprAllowed=!0},R.incDec.updateContext=function(){},R._function.updateContext=function(t){t.beforeExpr&&t!==R.semi&&t!==R._else&&(t!==R.colon&&t!==R.braceL||this.curContext()!==et.b_stat)&&this.context.push(et.f_expr),this.exprAllowed=!1},R.backQuote.updateContext=function(){this.curContext()===et.q_tmpl?this.context.pop():this.context.push(et.q_tmpl),this.exprAllowed=!1};var it=function(t){this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new M(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])},rt=W.prototype,nt="object"==typeof Packages&&"[object JavaPackage]"==Object.prototype.toString.call(Packages);rt.next=function(){this.options.onToken&&this.options.onToken(new it(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},rt.getToken=function(){return this.next(),new it(this)},"undefined"!=typeof Symbol&&(rt[Symbol.iterator]=function(){var t=this;return{next:function(){var e=t.getToken();return{done:e.type===R.eof,value:e}}}}),rt.setStrict=function(t){var e=this;if(this.strict=t,this.type===R.num||this.type===R.string){if(this.pos=this.start,this.options.locations)for(;this.pos<this.lineStart;)e.lineStart=e.input.lastIndexOf("\n",e.lineStart-2)+1,--e.curLine;this.nextToken()}},rt.curContext=function(){return this.context[this.context.length-1]},rt.nextToken=function(){var t=this.curContext();return t&&t.preserveSpace||this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length?this.finishToken(R.eof):t.override?t.override(this):void this.readToken(this.fullCharCodeAtPos())},rt.readToken=function(t){return s(t,this.options.ecmaVersion>=6)||92===t?this.readWord():this.getTokenFromCode(t)},rt.fullCharCodeAtPos=function(){var t=this.input.charCodeAt(this.pos);if(t<=55295||t>=57344)return t;var e=this.input.charCodeAt(this.pos+1);return(t<<10)+e-56613888},rt.skipBlockComment=function(){var t=this,e=this.options.onComment&&this.curPosition(),s=this.pos,i=this.input.indexOf("*/",this.pos+=2);if(i===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=i+2,this.options.locations){V.lastIndex=s;for(var r;(r=V.exec(this.input))&&r.index<this.pos;)++t.curLine,t.lineStart=r.index+r[0].length}this.options.onComment&&this.options.onComment(!0,this.input.slice(s+2,i),s,this.pos,e,this.curPosition())},rt.skipLineComment=function(t){for(var e=this,s=this.pos,i=this.options.onComment&&this.curPosition(),r=this.input.charCodeAt(this.pos+=t);this.pos<this.input.length&&10!==r&&13!==r&&8232!==r&&8233!==r;)++e.pos,r=e.input.charCodeAt(e.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(s+t,this.pos),s,this.pos,i,this.curPosition())},rt.skipSpace=function(){var t=this;t:for(;this.pos<this.input.length;){var e=t.input.charCodeAt(t.pos);switch(e){case 32:case 160:++t.pos;break;case 13:10===t.input.charCodeAt(t.pos+1)&&++t.pos;case 10:case 8232:case 8233:++t.pos,t.options.locations&&(++t.curLine,t.lineStart=t.pos);break;case 47:switch(t.input.charCodeAt(t.pos+1)){case 42:t.skipBlockComment();break;case 47:t.skipLineComment(2);break;default:break t}break;default:if(!(e>8&&e<14||e>=5760&&F.test(String.fromCharCode(e))))break t;++t.pos}}},rt.finishToken=function(t,e){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var s=this.type;this.type=t,this.value=e,this.updateContext(s)},rt.readToken_dot=function(){var t=this.input.charCodeAt(this.pos+1);if(t>=48&&t<=57)return this.readNumber(!0);var e=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&46===t&&46===e?(this.pos+=3,this.finishToken(R.ellipsis)):(++this.pos,this.finishToken(R.dot))},rt.readToken_slash=function(){var t=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):61===t?this.finishOp(R.assign,2):this.finishOp(R.slash,1)},rt.readToken_mult_modulo_exp=function(t){var e=this.input.charCodeAt(this.pos+1),s=1,i=42===t?R.star:R.modulo;return this.options.ecmaVersion>=7&&42===e&&(++s,i=R.starstar,e=this.input.charCodeAt(this.pos+2)),61===e?this.finishOp(R.assign,s+1):this.finishOp(i,s)},rt.readToken_pipe_amp=function(t){var e=this.input.charCodeAt(this.pos+1);return e===t?this.finishOp(124===t?R.logicalOR:R.logicalAND,2):61===e?this.finishOp(R.assign,2):this.finishOp(124===t?R.bitwiseOR:R.bitwiseAND,1)},rt.readToken_caret=function(){var t=this.input.charCodeAt(this.pos+1);return 61===t?this.finishOp(R.assign,2):this.finishOp(R.bitwiseXOR,1)},rt.readToken_plus_min=function(t){var e=this.input.charCodeAt(this.pos+1);return e===t?45==e&&62==this.input.charCodeAt(this.pos+2)&&P.test(this.input.slice(this.lastTokEnd,this.pos))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(R.incDec,2):61===e?this.finishOp(R.assign,2):this.finishOp(R.plusMin,1)},rt.readToken_lt_gt=function(t){var e=this.input.charCodeAt(this.pos+1),s=1;return e===t?(s=62===t&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+s)?this.finishOp(R.assign,s+1):this.finishOp(R.bitShift,s)):33==e&&60==t&&45==this.input.charCodeAt(this.pos+2)&&45==this.input.charCodeAt(this.pos+3)?(this.inModule&&this.unexpected(),this.skipLineComment(4),this.skipSpace(),this.nextToken()):(61===e&&(s=2),this.finishOp(R.relational,s))},rt.readToken_eq_excl=function(t){var e=this.input.charCodeAt(this.pos+1);return 61===e?this.finishOp(R.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===t&&62===e&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(R.arrow)):this.finishOp(61===t?R.eq:R.prefix,1)},rt.getTokenFromCode=function(t){switch(t){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(R.parenL);case 41:return++this.pos,this.finishToken(R.parenR);case 59:return++this.pos,this.finishToken(R.semi);case 44:return++this.pos,this.finishToken(R.comma);case 91:return++this.pos,this.finishToken(R.bracketL);case 93:return++this.pos,this.finishToken(R.bracketR);case 123:return++this.pos,this.finishToken(R.braceL);case 125:return++this.pos,this.finishToken(R.braceR);case 58:return++this.pos,this.finishToken(R.colon);case 63:return++this.pos,this.finishToken(R.question);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(R.backQuote);case 48:var e=this.input.charCodeAt(this.pos+1);if(120===e||88===e)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(111===e||79===e)return this.readRadixNumber(8);if(98===e||66===e)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(t);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo_exp(t);case 124:case 38:return this.readToken_pipe_amp(t);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(t);case 60:case 62:return this.readToken_lt_gt(t);case 61:case 33:return this.readToken_eq_excl(t);case 126:return this.finishOp(R.prefix,1)}this.raise(this.pos,"Unexpected character '"+m(t)+"'")},rt.finishOp=function(t,e){var s=this.input.slice(this.pos,this.pos+e);return this.pos+=e,this.finishToken(t,s)};var at=!!f("￿","u");rt.readRegexp=function(){for(var t,e,s=this,i=this.pos;;){s.pos>=s.input.length&&s.raise(i,"Unterminated regular expression");var r=s.input.charAt(s.pos);if(P.test(r)&&s.raise(i,"Unterminated regular expression"),t)t=!1;else{if("["===r)e=!0;else if("]"===r&&e)e=!1;else if("/"===r&&!e)break;t="\\"===r}++s.pos}var n=this.input.slice(i,this.pos);++this.pos;var a=this.readWord1(),o=n,h="";if(a){var p=/^[gim]*$/;this.options.ecmaVersion>=6&&(p=/^[gimuy]*$/),p.test(a)||this.raise(i,"Invalid regular expression flag"),a.indexOf("u")>=0&&(at?h="u":(o=o.replace(/\\u\{([0-9a-fA-F]+)\}/g,function(t,e,r){return e=Number("0x"+e),e>1114111&&s.raise(i+r+3,"Code point out of bounds"),"x"}),o=o.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"),h=h.replace("u","")))}var c=null;return nt||(f(o,h,i,this),c=f(n,a)),this.finishToken(R.regexp,{pattern:n,flags:a,value:c})},rt.readInt=function(t,e){for(var s=this,i=this.pos,r=0,n=0,a=null==e?1/0:e;n<a;++n){var o,h=s.input.charCodeAt(s.pos);if(o=h>=97?h-97+10:h>=65?h-65+10:h>=48&&h<=57?h-48:1/0,o>=t)break;++s.pos,r=r*t+o}return this.pos===i||null!=e&&this.pos-i!==e?null:r},rt.readRadixNumber=function(t){this.pos+=2;var e=this.readInt(t);return null==e&&this.raise(this.start+2,"Expected number in radix "+t),s(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(R.num,e)},rt.readNumber=function(t){var e=this.pos,i=!1,r=48===this.input.charCodeAt(this.pos);t||null!==this.readInt(10)||this.raise(e,"Invalid number");var n=this.input.charCodeAt(this.pos);46===n&&(++this.pos,this.readInt(10),i=!0,n=this.input.charCodeAt(this.pos)),69!==n&&101!==n||(n=this.input.charCodeAt(++this.pos),43!==n&&45!==n||++this.pos,null===this.readInt(10)&&this.raise(e,"Invalid number"),i=!0),s(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var a,o=this.input.slice(e,this.pos);return i?a=parseFloat(o):r&&1!==o.length?/[89]/.test(o)||this.strict?this.raise(e,"Invalid number"):a=parseInt(o,8):a=parseInt(o,10),this.finishToken(R.num,a)},rt.readCodePoint=function(){var t,e=this.input.charCodeAt(this.pos);if(123===e){this.options.ecmaVersion<6&&this.unexpected();var s=++this.pos;t=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,t>1114111&&this.raise(s,"Code point out of bounds")}else t=this.readHexChar(4);return t},rt.readString=function(t){for(var e=this,s="",i=++this.pos;;){e.pos>=e.input.length&&e.raise(e.start,"Unterminated string constant");var r=e.input.charCodeAt(e.pos);if(r===t)break;92===r?(s+=e.input.slice(i,e.pos),s+=e.readEscapedChar(!1),i=e.pos):(a(r)&&e.raise(e.start,"Unterminated string constant"),++e.pos)}return s+=this.input.slice(i,this.pos++),this.finishToken(R.string,s)},rt.readTmplToken=function(){for(var t=this,e="",s=this.pos;;){t.pos>=t.input.length&&t.raise(t.start,"Unterminated template");var i=t.input.charCodeAt(t.pos);if(96===i||36===i&&123===t.input.charCodeAt(t.pos+1))return t.pos===t.start&&t.type===R.template?36===i?(t.pos+=2,t.finishToken(R.dollarBraceL)):(++t.pos,t.finishToken(R.backQuote)):(e+=t.input.slice(s,t.pos),t.finishToken(R.template,e));if(92===i)e+=t.input.slice(s,t.pos),e+=t.readEscapedChar(!0),s=t.pos;else if(a(i)){switch(e+=t.input.slice(s,t.pos),++t.pos,i){case 13:10===t.input.charCodeAt(t.pos)&&++t.pos;case 10:e+="\n";break;default:e+=String.fromCharCode(i)}t.options.locations&&(++t.curLine,t.lineStart=t.pos),s=t.pos}else++t.pos}},rt.readEscapedChar=function(t){var e=this.input.charCodeAt(++this.pos);switch(++this.pos,e){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return m(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 13:10===this.input.charCodeAt(this.pos)&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";default:if(e>=48&&e<=55){var s=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],i=parseInt(s,8);return i>255&&(s=s.slice(0,-1),i=parseInt(s,8)),"0"!==s&&(this.strict||t)&&this.raise(this.pos-2,"Octal literal in strict mode"),this.pos+=s.length-1,String.fromCharCode(i)}return String.fromCharCode(e)}},rt.readHexChar=function(t){var e=this.pos,s=this.readInt(16,t);return null===s&&this.raise(e,"Bad character escape sequence"),s},rt.readWord1=function(){var t=this;this.containsEsc=!1;for(var e="",r=!0,n=this.pos,a=this.options.ecmaVersion>=6;this.pos<this.input.length;){var o=t.fullCharCodeAtPos();if(i(o,a))t.pos+=o<=65535?1:2;else{if(92!==o)break;t.containsEsc=!0,e+=t.input.slice(n,t.pos);var h=t.pos;117!=t.input.charCodeAt(++t.pos)&&t.raise(t.pos,"Expecting Unicode escape sequence \\uXXXX"),++t.pos;var p=t.readCodePoint();(r?s:i)(p,a)||t.raise(h,"Invalid Unicode escape"),e+=m(p),n=t.pos}r=!1}return e+this.input.slice(n,this.pos)},rt.readWord=function(){var t=this.readWord1(),e=R.name;return(this.options.ecmaVersion>=6||!this.containsEsc)&&this.keywords.test(t)&&(e=I[t]),this.finishToken(e,t)};var ot="3.3.0";t.version=ot,t.parse=x,t.parseExpressionAt=v,t.tokenizer=y,t.Parser=W,t.plugins=q,t.defaultOptions=D,t.Position=B,t.SourceLocation=M,t.getLineInfo=p,t.Node=J,t.TokenType=L,t.tokTypes=R,t.TokContext=tt,t.tokContexts=et,t.isIdentifierChar=i,t.isIdentifierStart=s,t.Token=it,t.isNewLine=a,t.lineBreak=P,t.lineBreakG=V,Object.defineProperty(t,"__esModule",{value:!0})});

/***/ },

/***/ "./node_modules/tern/node_modules/acorn/dist/acorn_loose.js":
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?e(exports,__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn.js")):"function"==typeof define&&define.amd?define(["exports","./acorn.js"],e):e((t.acorn=t.acorn||{},t.acorn.loose=t.acorn.loose||{}),t.acorn)}(this,function(t,e){"use strict";function s(t){return t<14&&t>8||32===t||160===t||e.isNewLine(t)}function i(t){return"✖"==t.name}function r(t,e){var s=new a(t,e);return s.next(),s.parseTopLevel()}var o="default"in e?e.default:e,n={},a=function(t,s){if(void 0===s&&(s={}),this.toks=e.tokenizer(t,s),this.options=this.toks.options,this.input=this.toks.input,this.tok=this.last={type:e.tokTypes.eof,start:0,end:0},this.options.locations){var i=this.toks.curPosition();this.tok.loc=new e.SourceLocation(this.toks,i,i)}this.ahead=[],this.context=[],this.curIndent=0,this.curLineStart=0,this.nextLineStart=this.lineEnd(this.curLineStart)+1,this.options.pluginsLoose=s.pluginsLoose||{},this.loadPlugins(this.options.pluginsLoose)};a.prototype.startNode=function(){return new e.Node(this.toks,this.tok.start,this.options.locations?this.tok.loc.start:null)},a.prototype.storeCurrentPos=function(){return this.options.locations?[this.tok.start,this.tok.loc.start]:this.tok.start},a.prototype.startNodeAt=function(t){return this.options.locations?new e.Node(this.toks,t[0],t[1]):new e.Node(this.toks,t)},a.prototype.finishNode=function(t,e){return t.type=e,t.end=this.last.end,this.options.locations&&(t.loc.end=this.last.loc.end),this.options.ranges&&(t.range[1]=this.last.end),t},a.prototype.dummyNode=function(t){var s=this.startNode();return s.type=t,s.end=s.start,this.options.locations&&(s.loc.end=s.loc.start),this.options.ranges&&(s.range[1]=s.start),this.last={type:e.tokTypes.name,start:s.start,end:s.start,loc:s.loc},s},a.prototype.dummyIdent=function(){var t=this.dummyNode("Identifier");return t.name="✖",t},a.prototype.dummyString=function(){var t=this.dummyNode("Literal");return t.value=t.raw="✖",t},a.prototype.eat=function(t){return this.tok.type===t&&(this.next(),!0)},a.prototype.isContextual=function(t){return this.tok.type===e.tokTypes.name&&this.tok.value===t},a.prototype.eatContextual=function(t){return this.tok.value===t&&this.eat(e.tokTypes.name)},a.prototype.canInsertSemicolon=function(){return this.tok.type===e.tokTypes.eof||this.tok.type===e.tokTypes.braceR||e.lineBreak.test(this.input.slice(this.last.end,this.tok.start))},a.prototype.semicolon=function(){return this.eat(e.tokTypes.semi)},a.prototype.expect=function(t){var e=this;if(this.eat(t))return!0;for(var s=1;s<=2;s++)if(e.lookAhead(s).type==t){for(var i=0;i<s;i++)e.next();return!0}},a.prototype.pushCx=function(){this.context.push(this.curIndent)},a.prototype.popCx=function(){this.curIndent=this.context.pop()},a.prototype.lineEnd=function(t){for(;t<this.input.length&&!e.isNewLine(this.input.charCodeAt(t));)++t;return t},a.prototype.indentationAfter=function(t){for(var e=this,s=0;;++t){var i=e.input.charCodeAt(t);if(32===i)++s;else{if(9!==i)return s;s+=e.options.tabSize}}},a.prototype.closes=function(t,s,i,r){return this.tok.type===t||this.tok.type===e.tokTypes.eof||i!=this.curLineStart&&this.curIndent<s&&this.tokenStartsLine()&&(!r||this.nextLineStart>=this.input.length||this.indentationAfter(this.nextLineStart)<s)},a.prototype.tokenStartsLine=function(){for(var t=this,e=this.tok.start-1;e>=this.curLineStart;--e){var s=t.input.charCodeAt(e);if(9!==s&&32!==s)return!1}return!0},a.prototype.extend=function(t,e){this[t]=e(this[t])},a.prototype.loadPlugins=function(t){var e=this;for(var s in t){var i=n[s];if(!i)throw new Error("Plugin '"+s+"' not found");i(e,t[s])}};var p=a.prototype;p.next=function(){var t=this;if(this.last=this.tok,this.ahead.length?this.tok=this.ahead.shift():this.tok=this.readToken(),this.tok.start>=this.nextLineStart){for(;this.tok.start>=this.nextLineStart;)t.curLineStart=t.nextLineStart,t.nextLineStart=t.lineEnd(t.curLineStart)+1;this.curIndent=this.indentationAfter(this.curLineStart)}},p.readToken=function(){for(var t=this;;)try{return t.toks.next(),t.toks.type===e.tokTypes.dot&&"."===t.input.substr(t.toks.end,1)&&t.options.ecmaVersion>=6&&(t.toks.end++,t.toks.type=e.tokTypes.ellipsis),new e.Token(t.toks)}catch(p){if(!(p instanceof SyntaxError))throw p;var i=p.message,r=p.raisedAt,o=!0;if(/unterminated/i.test(i))if(r=t.lineEnd(p.pos+1),/string/.test(i))o={start:p.pos,end:r,type:e.tokTypes.string,value:t.input.slice(p.pos+1,r)};else if(/regular expr/i.test(i)){var n=t.input.slice(p.pos,r);try{n=new RegExp(n)}catch(t){}o={start:p.pos,end:r,type:e.tokTypes.regexp,value:n}}else o=!!/template/.test(i)&&{start:p.pos,end:r,type:e.tokTypes.template,value:t.input.slice(p.pos,r)};else if(/invalid (unicode|regexp|number)|expecting unicode|octal literal|is reserved|directly after number|expected number in radix/i.test(i))for(;r<this.input.length&&!s(this.input.charCodeAt(r));)++r;else if(/character escape|expected hexadecimal/i.test(i))for(;r<this.input.length;){var a=t.input.charCodeAt(r++);if(34===a||39===a||e.isNewLine(a))break}else if(/unexpected character/i.test(i))r++,o=!1;else{if(!/regular expression/i.test(i))throw p;o=!0}if(t.resetTo(r),o===!0&&(o={start:r,end:r,type:e.tokTypes.name,value:"✖"}),o)return t.options.locations&&(o.loc=new e.SourceLocation(t.toks,e.getLineInfo(t.input,o.start),e.getLineInfo(t.input,o.end))),o}},p.resetTo=function(t){var s=this;this.toks.pos=t;var i=this.input.charAt(t-1);if(this.toks.exprAllowed=!i||/[\[\{\(,;:?\/*=+\-~!|&%^<>]/.test(i)||/[enwfd]/.test(i)&&/\b(keywords|case|else|return|throw|new|in|(instance|type)of|delete|void)$/.test(this.input.slice(t-10,t)),this.options.locations){this.toks.curLine=1,this.toks.lineStart=e.lineBreakG.lastIndex=0;for(var r;(r=e.lineBreakG.exec(this.input))&&r.index<t;)++s.toks.curLine,s.toks.lineStart=r.index+r[0].length}},p.lookAhead=function(t){for(var e=this;t>this.ahead.length;)e.ahead.push(e.readToken());return this.ahead[t-1]};var h=a.prototype;h.parseTopLevel=function(){var t=this,s=this.startNodeAt(this.options.locations?[0,e.getLineInfo(this.input,0)]:0);for(s.body=[];this.tok.type!==e.tokTypes.eof;)s.body.push(t.parseStatement());return this.last=this.tok,this.options.ecmaVersion>=6&&(s.sourceType=this.options.sourceType),this.finishNode(s,"Program")},h.parseStatement=function(){var t,s=this,r=this.tok.type,o=this.startNode();switch(this.toks.isLet()&&(r=e.tokTypes._var,t="let"),r){case e.tokTypes._break:case e.tokTypes._continue:this.next();var n=r===e.tokTypes._break;return this.semicolon()||this.canInsertSemicolon()?o.label=null:(o.label=this.tok.type===e.tokTypes.name?this.parseIdent():null,this.semicolon()),this.finishNode(o,n?"BreakStatement":"ContinueStatement");case e.tokTypes._debugger:return this.next(),this.semicolon(),this.finishNode(o,"DebuggerStatement");case e.tokTypes._do:return this.next(),o.body=this.parseStatement(),o.test=this.eat(e.tokTypes._while)?this.parseParenExpression():this.dummyIdent(),this.semicolon(),this.finishNode(o,"DoWhileStatement");case e.tokTypes._for:if(this.next(),this.pushCx(),this.expect(e.tokTypes.parenL),this.tok.type===e.tokTypes.semi)return this.parseFor(o,null);var a=this.toks.isLet();if(a||this.tok.type===e.tokTypes._var||this.tok.type===e.tokTypes._const){var p=this.parseVar(!0,a?"let":this.tok.value);return 1!==p.declarations.length||this.tok.type!==e.tokTypes._in&&!this.isContextual("of")?this.parseFor(o,p):this.parseForIn(o,p)}var h=this.parseExpression(!0);return this.tok.type===e.tokTypes._in||this.isContextual("of")?this.parseForIn(o,this.toAssignable(h)):this.parseFor(o,h);case e.tokTypes._function:return this.next(),this.parseFunction(o,!0);case e.tokTypes._if:return this.next(),o.test=this.parseParenExpression(),o.consequent=this.parseStatement(),o.alternate=this.eat(e.tokTypes._else)?this.parseStatement():null,this.finishNode(o,"IfStatement");case e.tokTypes._return:return this.next(),this.eat(e.tokTypes.semi)||this.canInsertSemicolon()?o.argument=null:(o.argument=this.parseExpression(),this.semicolon()),this.finishNode(o,"ReturnStatement");case e.tokTypes._switch:var u=this.curIndent,c=this.curLineStart;this.next(),o.discriminant=this.parseParenExpression(),o.cases=[],this.pushCx(),this.expect(e.tokTypes.braceL);for(var y;!this.closes(e.tokTypes.braceR,u,c,!0);)if(s.tok.type===e.tokTypes._case||s.tok.type===e.tokTypes._default){var l=s.tok.type===e.tokTypes._case;y&&s.finishNode(y,"SwitchCase"),o.cases.push(y=s.startNode()),y.consequent=[],s.next(),l?y.test=s.parseExpression():y.test=null,s.expect(e.tokTypes.colon)}else y||(o.cases.push(y=s.startNode()),y.consequent=[],y.test=null),y.consequent.push(s.parseStatement());return y&&this.finishNode(y,"SwitchCase"),this.popCx(),this.eat(e.tokTypes.braceR),this.finishNode(o,"SwitchStatement");case e.tokTypes._throw:return this.next(),o.argument=this.parseExpression(),this.semicolon(),this.finishNode(o,"ThrowStatement");case e.tokTypes._try:if(this.next(),o.block=this.parseBlock(),o.handler=null,this.tok.type===e.tokTypes._catch){var d=this.startNode();this.next(),this.expect(e.tokTypes.parenL),d.param=this.toAssignable(this.parseExprAtom(),!0),this.expect(e.tokTypes.parenR),d.body=this.parseBlock(),o.handler=this.finishNode(d,"CatchClause")}return o.finalizer=this.eat(e.tokTypes._finally)?this.parseBlock():null,o.handler||o.finalizer?this.finishNode(o,"TryStatement"):o.block;case e.tokTypes._var:case e.tokTypes._const:return this.parseVar(!1,t||this.tok.value);case e.tokTypes._while:return this.next(),o.test=this.parseParenExpression(),o.body=this.parseStatement(),this.finishNode(o,"WhileStatement");case e.tokTypes._with:return this.next(),o.object=this.parseParenExpression(),o.body=this.parseStatement(),this.finishNode(o,"WithStatement");case e.tokTypes.braceL:return this.parseBlock();case e.tokTypes.semi:return this.next(),this.finishNode(o,"EmptyStatement");case e.tokTypes._class:return this.parseClass(!0);case e.tokTypes._import:return this.parseImport();case e.tokTypes._export:return this.parseExport();default:var k=this.parseExpression();return i(k)?(this.next(),this.tok.type===e.tokTypes.eof?this.finishNode(o,"EmptyStatement"):this.parseStatement()):r===e.tokTypes.name&&"Identifier"===k.type&&this.eat(e.tokTypes.colon)?(o.body=this.parseStatement(),o.label=k,this.finishNode(o,"LabeledStatement")):(o.expression=k,this.semicolon(),this.finishNode(o,"ExpressionStatement"))}},h.parseBlock=function(){var t=this,s=this.startNode();this.pushCx(),this.expect(e.tokTypes.braceL);var i=this.curIndent,r=this.curLineStart;for(s.body=[];!this.closes(e.tokTypes.braceR,i,r,!0);)s.body.push(t.parseStatement());return this.popCx(),this.eat(e.tokTypes.braceR),this.finishNode(s,"BlockStatement")},h.parseFor=function(t,s){return t.init=s,t.test=t.update=null,this.eat(e.tokTypes.semi)&&this.tok.type!==e.tokTypes.semi&&(t.test=this.parseExpression()),this.eat(e.tokTypes.semi)&&this.tok.type!==e.tokTypes.parenR&&(t.update=this.parseExpression()),this.popCx(),this.expect(e.tokTypes.parenR),t.body=this.parseStatement(),this.finishNode(t,"ForStatement")},h.parseForIn=function(t,s){var i=this.tok.type===e.tokTypes._in?"ForInStatement":"ForOfStatement";return this.next(),t.left=s,t.right=this.parseExpression(),this.popCx(),this.expect(e.tokTypes.parenR),t.body=this.parseStatement(),this.finishNode(t,i)},h.parseVar=function(t,s){var i=this,r=this.startNode();r.kind=s,this.next(),r.declarations=[];do{var o=i.startNode();o.id=i.options.ecmaVersion>=6?i.toAssignable(i.parseExprAtom(),!0):i.parseIdent(),o.init=i.eat(e.tokTypes.eq)?i.parseMaybeAssign(t):null,r.declarations.push(i.finishNode(o,"VariableDeclarator"))}while(this.eat(e.tokTypes.comma));if(!r.declarations.length){var n=this.startNode();n.id=this.dummyIdent(),r.declarations.push(this.finishNode(n,"VariableDeclarator"))}return t||this.semicolon(),this.finishNode(r,"VariableDeclaration")},h.parseClass=function(t){var s=this,r=this.startNode();this.next(),this.tok.type===e.tokTypes.name?r.id=this.parseIdent():t?r.id=this.dummyIdent():r.id=null,r.superClass=this.eat(e.tokTypes._extends)?this.parseExpression():null,r.body=this.startNode(),r.body.body=[],this.pushCx();var o=this.curIndent+1,n=this.curLineStart;for(this.eat(e.tokTypes.braceL),this.curIndent+1<o&&(o=this.curIndent,n=this.curLineStart);!this.closes(e.tokTypes.braceR,o,n);)if(!s.semicolon()){var a,p=s.startNode();s.options.ecmaVersion>=6&&(p.static=!1,a=s.eat(e.tokTypes.star)),s.parsePropertyName(p),i(p.key)?(i(s.parseMaybeAssign())&&s.next(),s.eat(e.tokTypes.comma)):("Identifier"!==p.key.type||p.computed||"static"!==p.key.name||s.tok.type==e.tokTypes.parenL||s.tok.type==e.tokTypes.braceL?p.static=!1:(p.static=!0,a=s.eat(e.tokTypes.star),s.parsePropertyName(p)),s.options.ecmaVersion>=5&&"Identifier"===p.key.type&&!p.computed&&("get"===p.key.name||"set"===p.key.name)&&s.tok.type!==e.tokTypes.parenL&&s.tok.type!==e.tokTypes.braceL?(p.kind=p.key.name,s.parsePropertyName(p),p.value=s.parseMethod(!1)):(p.computed||p.static||a||!("Identifier"===p.key.type&&"constructor"===p.key.name||"Literal"===p.key.type&&"constructor"===p.key.value)?p.kind="method":p.kind="constructor",p.value=s.parseMethod(a)),r.body.body.push(s.finishNode(p,"MethodDefinition")))}return this.popCx(),this.eat(e.tokTypes.braceR)||(this.last.end=this.tok.start,this.options.locations&&(this.last.loc.end=this.tok.loc.start)),this.semicolon(),this.finishNode(r.body,"ClassBody"),this.finishNode(r,t?"ClassDeclaration":"ClassExpression")},h.parseFunction=function(t,s){return this.initFunction(t),this.options.ecmaVersion>=6&&(t.generator=this.eat(e.tokTypes.star)),this.tok.type===e.tokTypes.name?t.id=this.parseIdent():s&&(t.id=this.dummyIdent()),t.params=this.parseFunctionParams(),t.body=this.parseBlock(),this.finishNode(t,s?"FunctionDeclaration":"FunctionExpression")},h.parseExport=function(){var t=this.startNode();if(this.next(),this.eat(e.tokTypes.star))return t.source=this.eatContextual("from")?this.parseExprAtom():this.dummyString(),this.finishNode(t,"ExportAllDeclaration");if(this.eat(e.tokTypes._default)){var s=this.parseMaybeAssign();if(s.id)switch(s.type){case"FunctionExpression":s.type="FunctionDeclaration";break;case"ClassExpression":s.type="ClassDeclaration"}return t.declaration=s,this.semicolon(),this.finishNode(t,"ExportDefaultDeclaration")}return this.tok.type.keyword||this.toks.isLet()?(t.declaration=this.parseStatement(),t.specifiers=[],t.source=null):(t.declaration=null,t.specifiers=this.parseExportSpecifierList(),t.source=this.eatContextual("from")?this.parseExprAtom():null,this.semicolon()),this.finishNode(t,"ExportNamedDeclaration")},h.parseImport=function(){var t=this.startNode();if(this.next(),this.tok.type===e.tokTypes.string)t.specifiers=[],t.source=this.parseExprAtom(),t.kind="";else{var s;this.tok.type===e.tokTypes.name&&"from"!==this.tok.value&&(s=this.startNode(),s.local=this.parseIdent(),this.finishNode(s,"ImportDefaultSpecifier"),this.eat(e.tokTypes.comma)),t.specifiers=this.parseImportSpecifierList(),t.source=this.eatContextual("from")&&this.tok.type==e.tokTypes.string?this.parseExprAtom():this.dummyString(),s&&t.specifiers.unshift(s)}return this.semicolon(),this.finishNode(t,"ImportDeclaration")},h.parseImportSpecifierList=function(){var t=this,s=[];if(this.tok.type===e.tokTypes.star){var r=this.startNode();this.next(),r.local=this.eatContextual("as")?this.parseIdent():this.dummyIdent(),s.push(this.finishNode(r,"ImportNamespaceSpecifier"))}else{var o=this.curIndent,n=this.curLineStart,a=this.nextLineStart;for(this.pushCx(),this.eat(e.tokTypes.braceL),this.curLineStart>a&&(a=this.curLineStart);!this.closes(e.tokTypes.braceR,o+(this.curLineStart<=a?1:0),n);){var p=t.startNode();if(t.eat(e.tokTypes.star))p.local=t.eatContextual("as")?t.parseIdent():t.dummyIdent(),t.finishNode(p,"ImportNamespaceSpecifier");else{if(t.isContextual("from"))break;if(p.imported=t.parseIdent(),i(p.imported))break;p.local=t.eatContextual("as")?t.parseIdent():p.imported,t.finishNode(p,"ImportSpecifier")}s.push(p),t.eat(e.tokTypes.comma)}this.eat(e.tokTypes.braceR),this.popCx()}return s},h.parseExportSpecifierList=function(){var t=this,s=[],r=this.curIndent,o=this.curLineStart,n=this.nextLineStart;for(this.pushCx(),this.eat(e.tokTypes.braceL),this.curLineStart>n&&(n=this.curLineStart);!this.closes(e.tokTypes.braceR,r+(this.curLineStart<=n?1:0),o)&&!t.isContextual("from");){var a=t.startNode();if(a.local=t.parseIdent(),i(a.local))break;a.exported=t.eatContextual("as")?t.parseIdent():a.local,t.finishNode(a,"ExportSpecifier"),s.push(a),t.eat(e.tokTypes.comma)}return this.eat(e.tokTypes.braceR),this.popCx(),s};var u=a.prototype;u.checkLVal=function(t){if(!t)return t;switch(t.type){case"Identifier":case"MemberExpression":return t;case"ParenthesizedExpression":return t.expression=this.checkLVal(t.expression),t;default:return this.dummyIdent()}},u.parseExpression=function(t){var s=this,i=this.storeCurrentPos(),r=this.parseMaybeAssign(t);if(this.tok.type===e.tokTypes.comma){var o=this.startNodeAt(i);for(o.expressions=[r];this.eat(e.tokTypes.comma);)o.expressions.push(s.parseMaybeAssign(t));return this.finishNode(o,"SequenceExpression")}return r},u.parseParenExpression=function(){this.pushCx(),this.expect(e.tokTypes.parenL);var t=this.parseExpression();return this.popCx(),this.expect(e.tokTypes.parenR),t},u.parseMaybeAssign=function(t){if(this.toks.isContextual("yield")){var s=this.startNode();return this.next(),this.semicolon()||this.canInsertSemicolon()||this.tok.type!=e.tokTypes.star&&!this.tok.type.startsExpr?(s.delegate=!1,s.argument=null):(s.delegate=this.eat(e.tokTypes.star),s.argument=this.parseMaybeAssign()),this.finishNode(s,"YieldExpression")}var i=this.storeCurrentPos(),r=this.parseMaybeConditional(t);if(this.tok.type.isAssign){var o=this.startNodeAt(i);return o.operator=this.tok.value,o.left=this.tok.type===e.tokTypes.eq?this.toAssignable(r):this.checkLVal(r),this.next(),o.right=this.parseMaybeAssign(t),this.finishNode(o,"AssignmentExpression")}return r},u.parseMaybeConditional=function(t){var s=this.storeCurrentPos(),i=this.parseExprOps(t);if(this.eat(e.tokTypes.question)){var r=this.startNodeAt(s);return r.test=i,r.consequent=this.parseMaybeAssign(),r.alternate=this.expect(e.tokTypes.colon)?this.parseMaybeAssign(t):this.dummyIdent(),this.finishNode(r,"ConditionalExpression")}return i},u.parseExprOps=function(t){var e=this.storeCurrentPos(),s=this.curIndent,i=this.curLineStart;return this.parseExprOp(this.parseMaybeUnary(!1),e,-1,t,s,i)},u.parseExprOp=function(t,s,i,r,o,n){if(this.curLineStart!=n&&this.curIndent<o&&this.tokenStartsLine())return t;var a=this.tok.type.binop;if(null!=a&&(!r||this.tok.type!==e.tokTypes._in)&&a>i){var p=this.startNodeAt(s);if(p.left=t,p.operator=this.tok.value,this.next(),this.curLineStart!=n&&this.curIndent<o&&this.tokenStartsLine())p.right=this.dummyIdent();else{var h=this.storeCurrentPos();p.right=this.parseExprOp(this.parseMaybeUnary(!1),h,a,r,o,n)}return this.finishNode(p,/&&|\|\|/.test(p.operator)?"LogicalExpression":"BinaryExpression"),this.parseExprOp(p,s,i,r,o,n)}return t},u.parseMaybeUnary=function(t){var s,i=this,r=this.storeCurrentPos();if(this.tok.type.prefix){var o=this.startNode(),n=this.tok.type===e.tokTypes.incDec;n||(t=!0),o.operator=this.tok.value,o.prefix=!0,this.next(),o.argument=this.parseMaybeUnary(!0),n&&(o.argument=this.checkLVal(o.argument)),s=this.finishNode(o,n?"UpdateExpression":"UnaryExpression")}else if(this.tok.type===e.tokTypes.ellipsis){var a=this.startNode();this.next(),a.argument=this.parseMaybeUnary(t),s=this.finishNode(a,"SpreadElement")}else for(s=this.parseExprSubscripts();this.tok.type.postfix&&!this.canInsertSemicolon();){var p=i.startNodeAt(r);p.operator=i.tok.value,p.prefix=!1,p.argument=i.checkLVal(s),i.next(),s=i.finishNode(p,"UpdateExpression")}if(!t&&this.eat(e.tokTypes.starstar)){var h=this.startNodeAt(r);return h.operator="**",h.left=s,h.right=this.parseMaybeUnary(!1),this.finishNode(h,"BinaryExpression")}return s},u.parseExprSubscripts=function(){var t=this.storeCurrentPos();return this.parseSubscripts(this.parseExprAtom(),t,!1,this.curIndent,this.curLineStart)},u.parseSubscripts=function(t,s,i,r,o){for(var n=this;;){if(n.curLineStart!=o&&n.curIndent<=r&&n.tokenStartsLine()){if(n.tok.type!=e.tokTypes.dot||n.curIndent!=r)return t;--r}if(n.eat(e.tokTypes.dot)){var a=n.startNodeAt(s);a.object=t,n.curLineStart!=o&&n.curIndent<=r&&n.tokenStartsLine()?a.property=n.dummyIdent():a.property=n.parsePropertyAccessor()||n.dummyIdent(),a.computed=!1,t=n.finishNode(a,"MemberExpression")}else if(n.tok.type==e.tokTypes.bracketL){n.pushCx(),n.next();var p=n.startNodeAt(s);p.object=t,p.property=n.parseExpression(),p.computed=!0,n.popCx(),n.expect(e.tokTypes.bracketR),t=n.finishNode(p,"MemberExpression")}else if(i||n.tok.type!=e.tokTypes.parenL){if(n.tok.type!=e.tokTypes.backQuote)return t;var h=n.startNodeAt(s);h.tag=t,h.quasi=n.parseTemplate(),t=n.finishNode(h,"TaggedTemplateExpression")}else{var u=n.startNodeAt(s);u.callee=t,u.arguments=n.parseExprList(e.tokTypes.parenR),t=n.finishNode(u,"CallExpression")}}},u.parseExprAtom=function(){var t;switch(this.tok.type){case e.tokTypes._this:case e.tokTypes._super:var s=this.tok.type===e.tokTypes._this?"ThisExpression":"Super";return t=this.startNode(),this.next(),this.finishNode(t,s);case e.tokTypes.name:var r=this.storeCurrentPos(),o=this.parseIdent();return this.eat(e.tokTypes.arrow)?this.parseArrowExpression(this.startNodeAt(r),[o]):o;case e.tokTypes.regexp:t=this.startNode();var n=this.tok.value;return t.regex={pattern:n.pattern,flags:n.flags},t.value=n.value,t.raw=this.input.slice(this.tok.start,this.tok.end),this.next(),this.finishNode(t,"Literal");case e.tokTypes.num:case e.tokTypes.string:return t=this.startNode(),t.value=this.tok.value,t.raw=this.input.slice(this.tok.start,this.tok.end),this.next(),this.finishNode(t,"Literal");case e.tokTypes._null:case e.tokTypes._true:case e.tokTypes._false:return t=this.startNode(),t.value=this.tok.type===e.tokTypes._null?null:this.tok.type===e.tokTypes._true,t.raw=this.tok.type.keyword,this.next(),this.finishNode(t,"Literal");case e.tokTypes.parenL:var a=this.storeCurrentPos();this.next();var p=this.parseExpression();if(this.expect(e.tokTypes.parenR),this.eat(e.tokTypes.arrow))return this.parseArrowExpression(this.startNodeAt(a),p.expressions||(i(p)?[]:[p]));if(this.options.preserveParens){var h=this.startNodeAt(a);h.expression=p,p=this.finishNode(h,"ParenthesizedExpression")}return p;case e.tokTypes.bracketL:return t=this.startNode(),t.elements=this.parseExprList(e.tokTypes.bracketR,!0),this.finishNode(t,"ArrayExpression");case e.tokTypes.braceL:return this.parseObj();case e.tokTypes._class:return this.parseClass();case e.tokTypes._function:return t=this.startNode(),this.next(),this.parseFunction(t,!1);case e.tokTypes._new:return this.parseNew();case e.tokTypes.backQuote:return this.parseTemplate();default:return this.dummyIdent()}},u.parseNew=function(){var t=this.startNode(),s=this.curIndent,i=this.curLineStart,r=this.parseIdent(!0);if(this.options.ecmaVersion>=6&&this.eat(e.tokTypes.dot))return t.meta=r,t.property=this.parseIdent(!0),this.finishNode(t,"MetaProperty");var o=this.storeCurrentPos();return t.callee=this.parseSubscripts(this.parseExprAtom(),o,!0,s,i),this.tok.type==e.tokTypes.parenL?t.arguments=this.parseExprList(e.tokTypes.parenR):t.arguments=[],this.finishNode(t,"NewExpression")},u.parseTemplateElement=function(){var t=this.startNode();return t.value={raw:this.input.slice(this.tok.start,this.tok.end).replace(/\r\n?/g,"\n"),cooked:this.tok.value},this.next(),t.tail=this.tok.type===e.tokTypes.backQuote,this.finishNode(t,"TemplateElement")},u.parseTemplate=function(){var t=this,s=this.startNode();this.next(),s.expressions=[];var i=this.parseTemplateElement();for(s.quasis=[i];!i.tail;)t.next(),s.expressions.push(t.parseExpression()),t.expect(e.tokTypes.braceR)?i=t.parseTemplateElement():(i=t.startNode(),i.value={cooked:"",raw:""},i.tail=!0,t.finishNode(i,"TemplateElement")),s.quasis.push(i);return this.expect(e.tokTypes.backQuote),this.finishNode(s,"TemplateLiteral")},u.parseObj=function(){var t=this,s=this.startNode();s.properties=[],this.pushCx();var r=this.curIndent+1,o=this.curLineStart;for(this.eat(e.tokTypes.braceL),this.curIndent+1<r&&(r=this.curIndent,o=this.curLineStart);!this.closes(e.tokTypes.braceR,r,o);){var n,a,p=t.startNode();if(t.options.ecmaVersion>=6&&(a=t.storeCurrentPos(),p.method=!1,p.shorthand=!1,n=t.eat(e.tokTypes.star)),t.parsePropertyName(p),i(p.key))i(t.parseMaybeAssign())&&t.next(),t.eat(e.tokTypes.comma);else{if(t.eat(e.tokTypes.colon))p.kind="init",p.value=t.parseMaybeAssign();else if(t.options.ecmaVersion>=6&&(t.tok.type===e.tokTypes.parenL||t.tok.type===e.tokTypes.braceL))p.kind="init",p.method=!0,p.value=t.parseMethod(n);else if(t.options.ecmaVersion>=5&&"Identifier"===p.key.type&&!p.computed&&("get"===p.key.name||"set"===p.key.name)&&t.tok.type!=e.tokTypes.comma&&t.tok.type!=e.tokTypes.braceR)p.kind=p.key.name,t.parsePropertyName(p),p.value=t.parseMethod(!1);else{if(p.kind="init",t.options.ecmaVersion>=6)if(t.eat(e.tokTypes.eq)){var h=t.startNodeAt(a);h.operator="=",h.left=p.key,h.right=t.parseMaybeAssign(),p.value=t.finishNode(h,"AssignmentExpression")}else p.value=p.key;else p.value=t.dummyIdent();p.shorthand=!0}s.properties.push(t.finishNode(p,"Property")),t.eat(e.tokTypes.comma)}}return this.popCx(),this.eat(e.tokTypes.braceR)||(this.last.end=this.tok.start,this.options.locations&&(this.last.loc.end=this.tok.loc.start)),this.finishNode(s,"ObjectExpression")},u.parsePropertyName=function(t){if(this.options.ecmaVersion>=6){if(this.eat(e.tokTypes.bracketL))return t.computed=!0,t.key=this.parseExpression(),void this.expect(e.tokTypes.bracketR);t.computed=!1}var s=this.tok.type===e.tokTypes.num||this.tok.type===e.tokTypes.string?this.parseExprAtom():this.parseIdent();t.key=s||this.dummyIdent()},u.parsePropertyAccessor=function(){if(this.tok.type===e.tokTypes.name||this.tok.type.keyword)return this.parseIdent()},u.parseIdent=function(){var t=this.tok.type===e.tokTypes.name?this.tok.value:this.tok.type.keyword;if(!t)return this.dummyIdent();var s=this.startNode();return this.next(),s.name=t,this.finishNode(s,"Identifier")},u.initFunction=function(t){t.id=null,t.params=[],this.options.ecmaVersion>=6&&(t.generator=!1,t.expression=!1)},u.toAssignable=function(t,e){var s=this;if(!t||"Identifier"==t.type||"MemberExpression"==t.type&&!e);else if("ParenthesizedExpression"==t.type)t.expression=this.toAssignable(t.expression,e);else{if(this.options.ecmaVersion<6)return this.dummyIdent();if("ObjectExpression"==t.type){t.type="ObjectPattern";for(var i=t.properties,r=0;r<i.length;r++)i[r].value=s.toAssignable(i[r].value,e)}else if("ArrayExpression"==t.type)t.type="ArrayPattern",this.toAssignableList(t.elements,e);else if("SpreadElement"==t.type)t.type="RestElement",t.argument=this.toAssignable(t.argument,e);else{if("AssignmentExpression"!=t.type)return this.dummyIdent();t.type="AssignmentPattern",delete t.operator}}return t},u.toAssignableList=function(t,e){for(var s=this,i=0;i<t.length;i++)t[i]=s.toAssignable(t[i],e);return t},u.parseFunctionParams=function(t){return t=this.parseExprList(e.tokTypes.parenR),this.toAssignableList(t,!0)},u.parseMethod=function(t){var s=this.startNode();return this.initFunction(s),s.params=this.parseFunctionParams(),s.generator=t||!1,s.expression=this.options.ecmaVersion>=6&&this.tok.type!==e.tokTypes.braceL,s.body=s.expression?this.parseMaybeAssign():this.parseBlock(),this.finishNode(s,"FunctionExpression")},u.parseArrowExpression=function(t,s){return this.initFunction(t),t.params=this.toAssignableList(s,!0),t.expression=this.tok.type!==e.tokTypes.braceL,t.body=t.expression?this.parseMaybeAssign():this.parseBlock(),this.finishNode(t,"ArrowFunctionExpression")},u.parseExprList=function(t,s){var r=this;this.pushCx();var o=this.curIndent,n=this.curLineStart,a=[];for(this.next();!this.closes(t,o+1,n);)if(r.eat(e.tokTypes.comma))a.push(s?null:r.dummyIdent());else{var p=r.parseMaybeAssign();if(i(p)){if(r.closes(t,o,n))break;r.next()}else a.push(p);r.eat(e.tokTypes.comma)}return this.popCx(),this.eat(t)||(this.last.end=this.tok.start,this.options.locations&&(this.last.loc.end=this.tok.loc.start)),a},o.defaultOptions.tabSize=4,o.parse_dammit=r,o.LooseParser=a,o.pluginsLoose=n,t.parse_dammit=r,t.LooseParser=a,t.pluginsLoose=n,Object.defineProperty(t,"__esModule",{value:!0})});

/***/ },

/***/ "./node_modules/tern/node_modules/acorn/dist/walk.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){ true?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e.acorn=e.acorn||{},e.acorn.walk=e.acorn.walk||{}))}(this,function(e){"use strict";function t(t,n,r,o,i){r||(r=e.base),function e(t,o,i){var s=i||t.type,a=n[s];r[s](t,o,e),a&&a(t,o)}(t,o,i)}function n(t,n,r,o){r||(r=e.base);var i=[];!function e(t,o,s){var a=s||t.type,c=n[a],p=t!=i[i.length-1];p&&i.push(t),r[a](t,o,e),c&&c(t,o||i,i),p&&i.pop()}(t,o)}function r(t,n,r,o,i){var s=r?e.make(r,o):o;!function e(t,n,r){s[r||t.type](t,n,e)}(t,n,i)}function o(e){return"string"==typeof e?function(t){return t==e}:e?e:function(){return!0}}function i(t,n,r,i,s,a){i=o(i),s||(s=e.base);try{!function e(t,o,a){var c=a||t.type;if((null==n||t.start<=n)&&(null==r||t.end>=r)&&s[c](t,o,e),(null==n||t.start==n)&&(null==r||t.end==r)&&i(c,t))throw new l(t,o)}(t,a)}catch(e){if(e instanceof l)return e;throw e}}function s(t,n,r,i,s){r=o(r),i||(i=e.base);try{!function e(t,o,s){var a=s||t.type;if(!(t.start>n||t.end<n)&&(i[a](t,o,e),r(a,t)))throw new l(t,o)}(t,s)}catch(e){if(e instanceof l)return e;throw e}}function a(t,n,r,i,s){r=o(r),i||(i=e.base);try{!function e(t,o,s){if(!(t.end<n)){var a=s||t.type;if(t.start>=n&&r(a,t))throw new l(t,o);i[a](t,o,e)}}(t,s)}catch(e){if(e instanceof l)return e;throw e}}function c(t,n,r,i,s){r=o(r),i||(i=e.base);var a;return function e(t,o,s){if(!(t.start>n)){var c=s||t.type;t.end<=n&&(!a||a.node.end<t.end)&&r(c,t)&&(a=new l(t,o)),i[c](t,o,e)}}(t,s),a}function p(t,n){n||(n=e.base);var r=m(n);for(var o in t)r[o]=t[o];return r}function u(e,t,n){n(e,t)}function f(e,t,n){}var l=function(e,t){this.node=e,this.state=t},m=Object.create||function(e){function t(){}return t.prototype=e,new t},d={};d.Program=d.BlockStatement=function(e,t,n){for(var r=0;r<e.body.length;++r)n(e.body[r],t,"Statement")},d.Statement=u,d.EmptyStatement=f,d.ExpressionStatement=d.ParenthesizedExpression=function(e,t,n){return n(e.expression,t,"Expression")},d.IfStatement=function(e,t,n){n(e.test,t,"Expression"),n(e.consequent,t,"Statement"),e.alternate&&n(e.alternate,t,"Statement")},d.LabeledStatement=function(e,t,n){return n(e.body,t,"Statement")},d.BreakStatement=d.ContinueStatement=f,d.WithStatement=function(e,t,n){n(e.object,t,"Expression"),n(e.body,t,"Statement")},d.SwitchStatement=function(e,t,n){n(e.discriminant,t,"Expression");for(var r=0;r<e.cases.length;++r){var o=e.cases[r];o.test&&n(o.test,t,"Expression");for(var i=0;i<o.consequent.length;++i)n(o.consequent[i],t,"Statement")}},d.ReturnStatement=d.YieldExpression=function(e,t,n){e.argument&&n(e.argument,t,"Expression")},d.ThrowStatement=d.SpreadElement=function(e,t,n){return n(e.argument,t,"Expression")},d.TryStatement=function(e,t,n){n(e.block,t,"Statement"),e.handler&&n(e.handler,t),e.finalizer&&n(e.finalizer,t,"Statement")},d.CatchClause=function(e,t,n){n(e.param,t,"Pattern"),n(e.body,t,"ScopeBody")},d.WhileStatement=d.DoWhileStatement=function(e,t,n){n(e.test,t,"Expression"),n(e.body,t,"Statement")},d.ForStatement=function(e,t,n){e.init&&n(e.init,t,"ForInit"),e.test&&n(e.test,t,"Expression"),e.update&&n(e.update,t,"Expression"),n(e.body,t,"Statement")},d.ForInStatement=d.ForOfStatement=function(e,t,n){n(e.left,t,"ForInit"),n(e.right,t,"Expression"),n(e.body,t,"Statement")},d.ForInit=function(e,t,n){"VariableDeclaration"==e.type?n(e,t):n(e,t,"Expression")},d.DebuggerStatement=f,d.FunctionDeclaration=function(e,t,n){return n(e,t,"Function")},d.VariableDeclaration=function(e,t,n){for(var r=0;r<e.declarations.length;++r)n(e.declarations[r],t)},d.VariableDeclarator=function(e,t,n){n(e.id,t,"Pattern"),e.init&&n(e.init,t,"Expression")},d.Function=function(e,t,n){e.id&&n(e.id,t,"Pattern");for(var r=0;r<e.params.length;r++)n(e.params[r],t,"Pattern");n(e.body,t,e.expression?"ScopeExpression":"ScopeBody")},d.ScopeBody=function(e,t,n){return n(e,t,"Statement")},d.ScopeExpression=function(e,t,n){return n(e,t,"Expression")},d.Pattern=function(e,t,n){"Identifier"==e.type?n(e,t,"VariablePattern"):"MemberExpression"==e.type?n(e,t,"MemberPattern"):n(e,t)},d.VariablePattern=f,d.MemberPattern=u,d.RestElement=function(e,t,n){return n(e.argument,t,"Pattern")},d.ArrayPattern=function(e,t,n){for(var r=0;r<e.elements.length;++r){var o=e.elements[r];o&&n(o,t,"Pattern")}},d.ObjectPattern=function(e,t,n){for(var r=0;r<e.properties.length;++r)n(e.properties[r].value,t,"Pattern")},d.Expression=u,d.ThisExpression=d.Super=d.MetaProperty=f,d.ArrayExpression=function(e,t,n){for(var r=0;r<e.elements.length;++r){var o=e.elements[r];o&&n(o,t,"Expression")}},d.ObjectExpression=function(e,t,n){for(var r=0;r<e.properties.length;++r)n(e.properties[r],t)},d.FunctionExpression=d.ArrowFunctionExpression=d.FunctionDeclaration,d.SequenceExpression=d.TemplateLiteral=function(e,t,n){for(var r=0;r<e.expressions.length;++r)n(e.expressions[r],t,"Expression")},d.UnaryExpression=d.UpdateExpression=function(e,t,n){n(e.argument,t,"Expression")},d.BinaryExpression=d.LogicalExpression=function(e,t,n){n(e.left,t,"Expression"),n(e.right,t,"Expression")},d.AssignmentExpression=d.AssignmentPattern=function(e,t,n){n(e.left,t,"Pattern"),n(e.right,t,"Expression")},d.ConditionalExpression=function(e,t,n){n(e.test,t,"Expression"),n(e.consequent,t,"Expression"),n(e.alternate,t,"Expression")},d.NewExpression=d.CallExpression=function(e,t,n){if(n(e.callee,t,"Expression"),e.arguments)for(var r=0;r<e.arguments.length;++r)n(e.arguments[r],t,"Expression")},d.MemberExpression=function(e,t,n){n(e.object,t,"Expression"),e.computed&&n(e.property,t,"Expression")},d.ExportNamedDeclaration=d.ExportDefaultDeclaration=function(e,t,n){e.declaration&&n(e.declaration,t,"ExportNamedDeclaration"==e.type||e.declaration.id?"Statement":"Expression"),e.source&&n(e.source,t,"Expression")},d.ExportAllDeclaration=function(e,t,n){n(e.source,t,"Expression")},d.ImportDeclaration=function(e,t,n){for(var r=0;r<e.specifiers.length;r++)n(e.specifiers[r],t);n(e.source,t,"Expression")},d.ImportSpecifier=d.ImportDefaultSpecifier=d.ImportNamespaceSpecifier=d.Identifier=d.Literal=f,d.TaggedTemplateExpression=function(e,t,n){n(e.tag,t,"Expression"),n(e.quasi,t)},d.ClassDeclaration=d.ClassExpression=function(e,t,n){return n(e,t,"Class")},d.Class=function(e,t,n){e.id&&n(e.id,t,"Pattern"),e.superClass&&n(e.superClass,t,"Expression");for(var r=0;r<e.body.body.length;r++)n(e.body.body[r],t)},d.MethodDefinition=d.Property=function(e,t,n){e.computed&&n(e.key,t,"Expression"),n(e.value,t,"Expression")},e.simple=t,e.ancestor=n,e.recursive=r,e.findNodeAt=i,e.findNodeAround=s,e.findNodeAfter=a,e.findNodeBefore=c,e.make=p,e.base=d,Object.defineProperty(e,"__esModule",{value:!0})});

/***/ },

/***/ "./node_modules/tern/lib/infer.js":
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){return true?e(exports,__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn_loose.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/walk.js"),__webpack_require__("./node_modules/tern/lib/def.js"),__webpack_require__("./node_modules/tern/lib/signal.js")):"function"==typeof define&&define.amd?define(["exports","acorn/dist/acorn","acorn/dist/acorn_loose","acorn/dist/walk","./def","./signal"],e):void e(t.tern||(t.tern={}),acorn,acorn,acorn.walk,tern.def,tern.signal)}(this,function(t,e,r,n,o,i){"use strict";function s(t,e){var r=Object.create(t);if(e)for(var n in e)r[n]=e[n];return r}function p(t,e,r){var n=t.getType(!1),o=e.getType(!1);return!n||!o||a(n,o,r)}function a(t,e,r){if(!t||r>=5)return e;if(!t||t==e)return t;if(!e)return t;if(t.constructor!=e.constructor)return!1;if(t.constructor!=jt){if(t.constructor==St){var n=0,o=0,i=0;for(var s in t.props)n++,s in e.props&&p(t.props[s],e.props[s],r+1)&&i++;for(var s in e.props)o++;return!(n&&o&&i<Math.max(n,o)/2)&&(n>o?t:e)}return t.constructor==Ot&&(!!(t.args.length==e.args.length&&t.args.every(function(t,n){return p(t,e.args[n],r+1)})&&p(t.retval,e.retval,r+1)&&p(t.self,e.self,r+1))&&t)}var u=t.getProp("<i>").getType(!1);if(!u)return e;var f=e.getProp("<i>").getType(!1);return!f||a(u,f,r+1)?e:void 0}function u(t){for(var e=0,r=0,n=0,o=null,i=0;i<t.length;++i){var s=t[i];if(s instanceof jt)++e;else if(s instanceof Ot)++r;else if(s instanceof St)++n;else if(s instanceof Et){if(o&&s.name!=o.name)return null;o=s}}var p=(e&&1)+(r&&1)+(n&&1)+(o&&1);if(p>1)return null;if(o)return o;for(var a=0,u=null,i=0;i<t.length;++i){var s=t[i],f=0;if(e)f=s.getProp("<i>").isEmpty()?1:2;else if(r){f=1;for(var c=0;c<s.args.length;++c)s.args[c].isEmpty()||++f;s.retval.isEmpty()||++f}else n&&(f=s.name?100:2);f>=a&&(a=f,u=s)}return u}function f(t,e){At.disabledComputing={fn:t,prev:At.disabledComputing};var r=e();return At.disabledComputing=At.disabledComputing.prev,r}function c(t){var e=t.charCodeAt(0);return e>=48&&e<=57&&!/\D/.test(t)}function l(t){return"__proto__"==t||"✖"==t||Nt&&"__iterator__"==t}function h(t,e){var r=At.props[t]||(At.props[t]=[]);r.push(e)}function g(t){return At.props[t]}function y(e){if(At.workList)return e(At.workList);for(var r=[],n=0,o=At.workList=function(t,e,o){n<kt-It*r.length&&r.push(t,e,o,n)},i=e(o),s=0;s<r.length;s+=4){if(Ft&&+new Date>=Ft)throw new t.TimedOut;n=r[s+3]+1,r[s+1].addType(r[s],r[s+2])}return At.workList=null,i}function d(t,e,r){var n=At.curSuperCtor,o=At.curSuper;At.curSuperCtor=t,At.curSuper=e;var i=r();return At.curSuperCtor=n,At.curSuper=o,i}function v(t,e){for(;t.isBlock||t.isCatch||e===!1&&t.fnType&&t.fnType.isArrowFn();)t=t.prev;return t}function m(t,e){var r=v(t).fnType;r&&(r.instantiateScore=(r.instantiateScore||0)+e)}function P(t,e){try{return n.simple(t,{Expression:function(){if(--e<=0)throw Dt}}),!0}catch(t){if(t==Dt)return!1;throw t}}function b(t,e){var r=e.instantiateScore;return!At.disabledComputing&&r&&e.args.length&&P(t,5*r)?(m(v(e.originNode.scope.prev),r/2),w(t,e),!0):void(e.instantiateScore=null)}function w(t,e){for(var r=0;r<e.args.length;++r)e.args[r]=new st;e.self=new st,e.computeRet=function(r,o){return f(e,function(){var i=At.curOrigin;At.curOrigin=e.origin;var s=t.scope,p=new Ht(s.prev,s.originNode);for(var a in s.props)for(var u=p.defProp(a,s.props[a].originNode),f=0;f<o.length;++f)e.argNames[f]==a&&f<o.length&&o[f].propagate(u);for(var c=e.argNames.length!=o.length?e.argNames.slice(0,o.length):e.argNames;c.length<o.length;)c.push("?");if(p.fnType=new Ot(e.name,r,o,c,K,e.generator),p.fnType.originNode=e.originNode,e.arguments){var l=p.fnType.arguments=new st;p.defProp("arguments").addType(new jt(l));for(var f=0;f<o.length;++f)o[f].propagate(l)}return t.scope=p,n.recursive(t.body,p,null,Mt),n.recursive(t.body,p,null,qt),At.curOrigin=i,p.fnType.retval})}}function T(t){function e(t,n,o){if(!(o>3)&&t.forward)for(var i=0;i<t.forward.length;++i){var s=t.forward[i].propagatesTo();if(s){var p,a=n;if(s instanceof st)p=s;else{if(!(s.target instanceof st))continue;a+=s.pathExt,p=s.target}if(p==r)return a;var u=e(p,a,o+1);if(u)return u}}}var r=t.retval;if(r!=K&&!t.isArrowFn()){var n,i;!r.isEmpty()&&(n=r.getType())instanceof jt&&(r=i=n.getProp("<i>"));for(var s=e(t.self,"!this",0),p=0;!s&&p<t.args.length;++p)s=e(t.args[p],"!"+p,0);if(s){i&&(s="["+s+"]");var a=new o.TypeParser(s),u=a.parseType(!0);return t.computeRet=u.apply?u:function(){return u},t.computeRetSource=s,!0}}}function x(t,e){return t.defProp(e.name,e)}function E(t){return"Identifier"==t.type?t.name:"AssignmentPattern"==t.type?E(t.left):"ObjectPattern"==t.type?"{"+t.properties.map(function(t){return E(t.value)}).join(", ")+"}":"ArrayPattern"==t.type?"["+t.elements.map(function(t){return t?E(t):""}).join(", ")+"]":"RestElement"==t.type?"..."+E(t.argument):"_"}function S(t){return"VariableDeclaration"==t.type&&"var"!=t.kind||"FunctionDeclaration"==t.type||"ClassDeclaration"==t.type}function N(t,e){return{inner:t,outer:e||t}}function O(t){var e=t.getSymbolType();if(e)return e.asPropName()}function j(t){switch(t){case"+":case"-":case"~":return At.num;case"!":return At.bool;case"typeof":return At.str;case"void":case"delete":return K}}function C(t){switch(t){case"==":case"!=":case"===":case"!==":case"<":case">":case">=":case"<=":case"in":case"instanceof":return!0}}function A(t){if(t.regex)return yt(At.protos.RegExp);switch(typeof t.value){case"boolean":return At.bool;case"number":return At.num;case"string":return At.str;case"object":case"function":return t.value?yt(At.protos.RegExp):K}}function F(t,e){if(t==e||e==K)return t;if(t==K)return e;var r=new st;return t.propagate(r),e.propagate(r),r}function k(t,e){for(var r=0;r<t.params.length;r++){var n=t.params[r];"Identifier"!=n.type&&H(n,e,t.scope.fnType.args[r])}}function I(t,e){return e.hasProp(t.name)||At.topScope.defProp(t.name,t)}function H(t,e,r){var n=_t[t.type];n&&n(t,e,r)}function D(t){var e=v(t);return e.fnType?e.fnType.self:e}function M(t){t.isEmpty()&&t.propertyOf&&(t.propertyOf.getProp(t.propertyName).addType(new St,rt),M(t.propertyOf))}function R(t,e,r){!r&&t.id&&(r=t.id.name);var n,o,i=At.protos.Object;if(t.superClass)if("Literal"==t.superClass.type&&null==t.superClass.value)i=null;else{var s,p=V(t.superClass,e);n=p.getFunctionType(),n&&(s=n.getProp("prototype").getObjType())?i=s:(n=p,o=p.getProp("prototype"))}var a=new St(i,r&&r+".prototype");return o&&o.propagate(new wt(a)),d(n,o||i,function(){for(var n,o=t.body.body,i=0;i<o.length;i++)"constructor"==o[i].kind&&(n=o[i].value);var s=t.objType=n?V(n,e):new Ot(r,K,[],null,K);s.originNode=t.id||n||t;var p=yt(a,s);s.self.addType(p),s.defProp("prototype",t).addType(a);for(var i=0;i<o.length;i++){var u,f=o[i];if("constructor"!=f.kind){var c=Rt(f,e);"<i>"==c||"set"==f.kind?u=K:(u=(f.static?s:a).defProp(c,f.key),u.initializer=!0,"get"==f.kind&&(u=new lt(p,[],null,u))),V(f.value,e,u);var l=u.getFunctionType();l&&l.self.addType(p)}}return s})}function _(t,e,r){var n=t.length>1&&t.length<6;if(n){for(var o,i=!0,s=0;s<t.length;s++){var p=t[s];p?"Literal"!=p.type||o&&o!=typeof p.value?i=!1:o=typeof p.value:n=!1}i&&(n=!1)}if(n){for(var a=[],s=0;s<t.length;++s)a.push(r(t[s],e));return new jt(a)}if(t.length<2)return new jt(t[0]&&r(t[0],e));for(var u=new st,s=0;s<t.length;s++)t[s]&&r(t[s],e).propagate(u);return new jt(u)}function L(t){return function(e,r,n,o){var i=t(e,r,o);return n&&i.propagate(n),i}}function q(t){return function(e,r,n,o){return n||(n=new st),t(e,r,n,o),n}}function V(t,e,r,n){var o=Lt[t.type];return o?o(t,e,r,n):K}function G(t){return"VariableDeclaration"==t.type?t.declarations[0].id:t}function B(t,e,r){var n=Array.isArray(t);return n&&1==t.length&&(t=t[0],n=!1),n?null==r?function(e){return t.indexOf(e.origin)>-1}:function(n,o){return o&&o.start>=e&&o.end<=r&&t.indexOf(n.origin)>-1}:null==r?function(e){return e.origin==t}:function(n,o){return o&&o.start>=e&&o.end<=r&&n.origin==t}}function U(t){zt=!0;var e=g(t);if(e)for(var r=0;r<e.length;++r){var n=e[r].getProp(t);if(!n.isEmpty())return n}return K}function z(t,e){var r=new St(!0);r.defProp("done").addType(At.bool),e.propagate(r.defProp("value"));var n=new Ot(null,K,t?[t]:[],t?["?"]:[],r),o=new St(At.definitions.ecmascript&&At.definitions.ecmascript.generator_prototype||!0);return o.defProp("next").addType(n),o}function W(t,e){return t.generator?t.computeRet?z(t.yieldval,e):(t.generator===!0&&(t.generator=z(t.yieldval,e)),t.generator):e}function $(t,e,r){var n=Y(t,r).getFunctionType();if(!n)return K;var o=n.retval;if(n.computeRet){for(var i=0,s=[];i<e.length;++i)s.push(Y(e[i],r));var p=K;"MemberExpression"==t.type&&(p=Y(t.object,r)),o=n.computeRet(p,s,e)}return W(n,o)}function Y(t,e){var r=Gt[t.type];return r?r(t,e):K}var J=t.toString=function(t,e,r){return!t||t==r||e&&e<-3?"?":t.toString(e,r)},K=t.ANull=i.mixin({addType:function(){},propagate:function(){},getProp:function(){return K},forAllProps:function(){},hasType:function(){return!1},isEmpty:function(){return!0},getFunctionType:function(){},getObjType:function(){},getSymbolType:function(){},getType:function(){},gatherProperties:function(){},propagatesTo:function(){},typeHint:function(){},propHint:function(){},toString:function(){return"?"}}),Q=100,X=90,Z=10,tt=6,et=6,rt=1,nt=90,ot=2,it=4,st=t.AVal=function(){this.types=[],this.forward=null,this.maxWeight=0};st.prototype=s(K,{addType:function(t,e){if(e=e||Q,this.maxWeight<e){if(this.maxWeight=e,1==this.types.length&&this.types[0]==t)return;this.types.length=0}else if(this.maxWeight>e||this.types.indexOf(t)>-1)return;this.signal("addType",t),this.types.push(t);var r=this.forward;r&&y(function(n){for(var o=0;o<r.length;++o)n(t,r[o],e)})},propagate:function(t,e){if(!(t==K||t instanceof xt&&this.forward&&this.forward.length>2)){e&&e!=Q&&(t=new Tt(t,e)),(this.forward||(this.forward=[])).push(t);var r=this.types;r.length&&y(function(n){for(var o=0;o<r.length;++o)n(r[o],t,e)})}},getProp:function(t){if(l(t))return K;var e=(this.props||(this.props=Object.create(null)))[t];return e||(e=this.props[t]=new st,this.propagate(new ut(t,e))),e},forAllProps:function(t){this.propagate(new ct(t))},hasType:function(t){return this.types.indexOf(t)>-1},isEmpty:function(){return 0===this.types.length},getFunctionType:function(){for(var t=this.types.length-1;t>=0;--t)if(this.types[t]instanceof Ot)return this.types[t]},getObjType:function(){for(var t=null,e=this.types.length-1;e>=0;--e){var r=this.types[e];if(r instanceof St){if(r.name)return r;t||(t=r)}}return t},getSymbolType:function(){for(var t=this.types.length-1;t>=0;--t)if(this.types[t]instanceof Ct)return this.types[t]},getType:function(t){return 0===this.types.length&&t!==!1?this.makeupType():1===this.types.length?this.types[0]:u(this.types)},toString:function(t,e){if(0==this.types.length)return J(this.makeupType(),t,e);if(1==this.types.length)return J(this.types[0],t,e);var r=pt(this.types);return r.length>2?"?":r.map(function(r){return J(r,t,e)}).join("|")},makeupPropType:function(t){var e=this.propertyName,r=t.proto&&t.proto.hasProp(e);if(r){var n=r.getType();if(n)return n}if("<i>"!=e){var o=t.hasProp("<i>");if(o)return o.getType()}else if(t.props["<i>"]!=this)for(var i in t.props){var s=t.props[i];if(!s.isEmpty())return s.getType()}},makeupType:function(){var t=this.propertyOf&&this.makeupPropType(this.propertyOf);if(t)return t;if(!this.forward)return null;for(var e=this.forward.length-1;e>=0;--e){var r=this.forward[e].typeHint();if(r&&!r.isEmpty())return zt=!0,r}for(var n=Object.create(null),o=null,e=0;e<this.forward.length;++e){var i=this.forward[e].propHint();i&&"length"!=i&&"<i>"!=i&&"✖"!=i&&i!=At.completingProperty&&(n[i]=!0,o=i)}if(!o)return null;var s=g(o);if(s){var p=[];t:for(var e=0;e<s.length;++e){var a=s[e];for(var i in n)if(!a.hasProp(i))continue t;a.hasCtor&&(a=yt(a)),p.push(a)}var f=u(p);if(f)return zt=!0,f}},typeHint:function(){return this.types.length?this.getType():null},propagatesTo:function(){return this},gatherProperties:function(t,e){for(var r=0;r<this.types.length;++r)this.types[r].gatherProperties(t,e)},guessProperties:function(t){if(this.forward)for(var e=0;e<this.forward.length;++e){var r=this.forward[e].propHint();r&&t(r,null,0)}var n=this.makeupType();n&&n.gatherProperties(t)}});var pt=t.simplifyTypes=function(t){var e=[];t:for(var r=0;r<t.length;++r){for(var n=t[r],o=0;o<e.length;o++){var i=a(n,e[o],0);if(i){e[o]=i;continue t}}e.push(n)}return e},at=t.constraint=function(t){var e=function(){this.origin=At.curOrigin,this.construct.apply(this,arguments)};e.prototype=Object.create(K);for(var r in t)t.hasOwnProperty(r)&&(e.prototype[r]=t[r]);return e},ut=at({construct:function(t,e){this.prop=t,this.target=e},addType:function(t,e){t.getProp&&t.getProp(this.prop).propagate(this.target,e)},propHint:function(){return this.prop},propagatesTo:function(){if("<i>"==this.prop||!/[^\w_]/.test(this.prop))return{target:this.target,pathExt:"."+this.prop}}}),ft=t.PropHasSubset=t.DefProp=at({construct:function(t,e,r){this.prop=t,this.type=e,this.originNode=r},addType:function(t,e){if(t instanceof St){var r=t.defProp(this.prop,this.originNode);r.origin||(r.origin=this.origin),this.type.propagate(r,e)}},propHint:function(){return this.prop}}),ct=at({construct:function(t){this.c=t},addType:function(t){t instanceof St&&t.forAllProps(this.c)}}),lt=t.IsCallee=at({construct:function(t,e,r,n){this.self=t,this.args=e,this.argNodes=r,this.retval=n,this.disabled=At.disabledComputing},addType:function(t,e){if(t instanceof Ot){for(var r=0;r<this.args.length;++r)r<t.args.length&&this.args[r].propagate(t.args[r],e),t.arguments&&this.args[r].propagate(t.arguments,e);t.isArrowFn()||this.self.propagate(t.self,this.self==At.topScope?nt:e);var n=t.computeRet,o=t.retval;if(n)for(var i=this.disabled;i;i=i.prev)(i.fn==t||t.originNode&&i.fn.originNode==t.originNode)&&(n=null);if(n){var s=At.disabledComputing;At.disabledComputing=this.disabled,o=n(this.self,this.args,this.argNodes),At.disabledComputing=s}W(t,o).propagate(this.retval,e)}},typeHint:function(){for(var t=[],e=0;e<this.args.length;++e)t.push("?");return new Ot(null,this.self,this.args,t,K)},propagatesTo:function(){return{target:this.retval,pathExt:".!ret"}}}),ht=at({construct:function(t,e,r,n){this.propName=t,this.args=e,this.argNodes=r,this.retval=n,this.disabled=At.disabledComputing},addType:function(t,e){var r=new lt(t,this.args,this.argNodes,this.retval);r.disabled=this.disabled,t.getProp(this.propName).propagate(r,e)},propHint:function(){return this.propName}}),gt=t.IsCtor=at({construct:function(t,e){this.target=t,this.noReuse=e},addType:function(t,e){t instanceof Ot&&(At.parent&&!At.parent.options.reuseInstances&&(this.noReuse=!0),t.getProp("prototype").propagate(new dt(!this.noReuse&&t,this.target),e))}}),yt=t.getInstance=function(t,e){if(e===!1)return new St(t);e||(e=t.hasCtor),t.instances||(t.instances=[]);for(var r=0;r<t.instances.length;++r){var n=t.instances[r];if(n.ctor==e)return n.instance}var o=new St(t,e&&e.name);return o.origin=t.origin,t.instances.push({ctor:e,instance:o}),o},dt=t.IsProto=at({construct:function(t,e){this.ctor=t,this.target=e},addType:function(t,e){t instanceof St&&((this.count=(this.count||0)+1)>8||(t==At.protos.Array?this.target.addType(new jt):this.target.addType(yt(t,this.ctor))))}}),vt=at({construct:function(t){this.fn=t},addType:function(t,e){if(t instanceof St&&!t.hasCtor){t.hasCtor=this.fn;var r=new bt(t,this.fn);r.addType(this.fn),t.forAllProps(function(t,e,n){n&&e.propagate(r)})}}}),mt=at({construct:function(t,e){this.other=t,this.target=e},addType:function(t,e){t==At.str?this.target.addType(At.str,e):t==At.num&&this.other.hasType(At.num)&&this.target.addType(At.num,e)},typeHint:function(){return this.other}}),Pt=t.IfObj=at({construct:function(t){this.target=t},addType:function(t,e){t instanceof St&&this.target.addType(t,e)},propagatesTo:function(){return this.target}}),bt=at({construct:function(t,e){this.obj=t,this.ctor=e},addType:function(t){t instanceof Ot&&t.self&&t.self.addType(yt(this.obj,this.ctor),it)}}),wt=at({construct:function(t){this.obj=t},addType:function(t){t instanceof St&&this.obj.proto==At.protos.Object&&this.obj.replaceProto(t)}}),Tt=at({construct:function(t,e){this.inner=t,this.weight=e},addType:function(t,e){this.inner.addType(t,Math.min(e,this.weight))},propagatesTo:function(){return this.inner.propagatesTo()},typeHint:function(){return this.inner.typeHint()},propHint:function(){return this.inner.propHint()}}),xt=t.Type=function(){};xt.prototype=s(K,{constructor:xt,propagate:function(t,e){t.addType(this,e)},hasType:function(t){return t==this},isEmpty:function(){return!1},typeHint:function(){return this},getType:function(){return this}});var Et=t.Prim=function(t,e){this.name=e,this.proto=t};Et.prototype=s(xt.prototype,{constructor:Et,toString:function(){return this.name},getProp:function(t){return this.proto.hasProp(t)||K},gatherProperties:function(t,e){this.proto&&this.proto.gatherProperties(t,e)}});var St=t.Obj=function(t,e){if(this.props||(this.props=Object.create(null)),this.proto=t===!0?At.protos.Object:t,t&&t!=At.protos.Object&&!e&&t.name&&!(this instanceof Ot)){var r=/^(.*)\.prototype$/.exec(this.proto.name);r&&(e=r[1])}this.name=e,this.maybeProps=null,this.origin=At.curOrigin};St.prototype=s(xt.prototype,{constructor:St,toString:function(t){if(null==t&&(t=0),t<=0&&this.name)return this.name;var e=[],r=!1;for(var n in this.props)if("<i>"!=n){if(e.length>5){r=!0;break}t?e.push(n+": "+J(this.props[n],t-1,this)):e.push(n)}return e.sort(),r&&e.push("..."),"{"+e.join(", ")+"}"},hasProp:function(t,e){c(t)&&(t=this.normalizeIntegerProp(t));var r=this.props[t];if(e!==!1)for(var n=this.proto;n&&!r;n=n.proto)r=n.props[t];return r},defProp:function(t,e){var r=this.hasProp(t,!1);if(r)return e&&!r.originNode&&(r.originNode=e),r;if(l(t))return K;c(t)&&(t=this.normalizeIntegerProp(t));var n=this.maybeProps&&this.maybeProps[t];return n?(delete this.maybeProps[t],this.maybeUnregProtoPropHandler()):(n=new st,n.propertyOf=this,n.propertyName=t),this.props[t]=n,n.originNode=e,n.origin=At.curOrigin,this.broadcastProp(t,n,!0),n},getProp:function(t){var e=this.hasProp(t,!0)||this.maybeProps&&this.maybeProps[t];if(e)return e;if(l(t))return K;c(t)&&(t=this.normalizeIntegerProp(t));var r=this.ensureMaybeProps()[t]=new st;return r.propertyOf=this,r.propertyName=t,r},normalizeIntegerProp:function(t){return"<i>"},broadcastProp:function(t,e,r){if(r&&(this.signal("addProp",t,e),this instanceof Ht||h(t,this)),this.onNewProp)for(var n=0;n<this.onNewProp.length;++n){var o=this.onNewProp[n];o.onProtoProp?o.onProtoProp(t,e,r):o(t,e,r)}},onProtoProp:function(t,e,r){var n=this.maybeProps&&this.maybeProps[t];n&&(delete this.maybeProps[t],this.maybeUnregProtoPropHandler(),this.proto.getProp(t).propagate(n)),this.broadcastProp(t,e,!1)},replaceProto:function(t){this.proto&&this.maybeProps&&this.proto.unregPropHandler(this),this.proto=t,this.maybeProps&&this.proto.forAllProps(this)},ensureMaybeProps:function(){return this.maybeProps||(this.proto&&this.proto.forAllProps(this),this.maybeProps=Object.create(null)),this.maybeProps},removeProp:function(t){var e=this.props[t];delete this.props[t],this.ensureMaybeProps()[t]=e,e.types.length=0},forAllProps:function(t){this.onNewProp||(this.onNewProp=[],this.proto&&this.proto.forAllProps(this)),this.onNewProp.push(t);for(var e=this;e;e=e.proto)for(var r in e.props)t.onProtoProp?t.onProtoProp(r,e.props[r],e==this):t(r,e.props[r],e==this)},maybeUnregProtoPropHandler:function(){if(this.maybeProps){for(var t in this.maybeProps)return;this.maybeProps=null}!this.proto||this.onNewProp&&this.onNewProp.length||this.proto.unregPropHandler(this)},unregPropHandler:function(t){for(var e=0;e<this.onNewProp.length;++e)if(this.onNewProp[e]==t){this.onNewProp.splice(e,1);break}this.maybeUnregProtoPropHandler()},gatherProperties:function(t,e){for(var r in this.props)"<i>"!=r&&":"!=r.charAt(0)&&t(r,this,e);this.proto&&this.proto.gatherProperties(t,e+1)},getObjType:function(){return this}});var Nt="undefined"!=typeof StopIteration,Ot=t.Fn=function(t,e,r,n,o,i){St.call(this,At.protos.Function,t),this.self=e,this.args=r,this.argNames=n,this.retval=o,this.generator=i};Ot.prototype=s(St.prototype,{constructor:Ot,toString:function(t){null==t&&(t=0);for(var e=this.generator?"fn*(":"fn(",r=0;r<this.args.length;++r){r&&(e+=", ");var n=this.argNames[r];n&&"?"!=n&&(e+=n+": "),e+=t>-3?J(this.args[r],t-1,this):"?"}return e+=")",this.retval.isEmpty()||(e+=" -> "+(t>-3?J(this.retval,t-1,this):"?")),e},getProp:function(t){if("prototype"==t){var e=this.hasProp(t,!1);if(!e){e=this.defProp(t);var r=new St(!0,this.name&&this.name+".prototype");r.origin=this.origin,e.addType(r,Z)}return e}return St.prototype.getProp.call(this,t)},defProp:function(t,e){if("prototype"==t){var r=this.hasProp(t,!1);return r?r:(r=St.prototype.defProp.call(this,t,e),r.origin=this.origin,r.propagate(new vt(this)),r)}return St.prototype.defProp.call(this,t,e)},getFunctionType:function(){return this},isArrowFn:function(){return this.originNode&&"ArrowFunctionExpression"==this.originNode.type}});var jt=t.Arr=function(t){St.call(this,At.protos.Array);var e=this.defProp("<i>");if(Array.isArray(t)){this.tuple=t.length;for(var r=0;r<t.length;r++){var n=this.defProp(String(r));t[r].propagate(n),n.propagate(e)}}else t&&(this.tuple=0,t.propagate(e))};jt.prototype=s(St.prototype,{constructor:jt,toString:function(t){if(null==t&&(t=0),t<=-3)return"[?]";var e="";if(this.tuple){for(var r,n=0;n in this.props;n++){var o=J(this.getProp(String(n)),t-1,this);r=null==r?o:r==o&&o,e+=(e?", ":"")+o}r&&(e=r)}else e=J(this.getProp("<i>"),t-1,this);return"["+e+"]"},normalizeIntegerProp:function(t){return+t<this.tuple?t:"<i>"}});var Ct=t.Sym=function(t,e){Et.call(this,At.protos.Symbol,"Symbol"),this.symName=t,this.originNode=e};Ct.prototype=s(Et.prototype,{constructor:Ct,asPropName:function(){return":"+this.symName},getSymbolType:function(){return this}}),t.getSymbol=function(t,e){var r=t.replace(/[^\w$\.]/g,"_"),n=At.symbols[r];return n?(e&&!n.originNode&&(n.originNode=e),n):At.symbols[r]=new Ct(r,e)},t.Context=function(e,r){this.parent=r,this.props=Object.create(null),this.protos=Object.create(null),this.origins=[],this.curOrigin="ecmascript",this.paths=Object.create(null),this.definitions=Object.create(null),this.purgeGen=0,this.workList=null,this.disabledComputing=null,this.curSuperCtor=this.curSuper=null,this.symbols=Object.create(null),t.withContext(this,function(){if(At.protos.Object=new St(null,"Object.prototype"),At.topScope=new Ht,At.topScope.name="<top>",At.protos.Array=new St(!0,"Array.prototype"),At.protos.Function=new Ot("Function.prototype",K,[],[],K),At.protos.Function.proto=At.protos.Object,At.protos.RegExp=new St(!0,"RegExp.prototype"),At.protos.String=new St(!0,"String.prototype"),At.protos.Number=new St(!0,"Number.prototype"),At.protos.Boolean=new St(!0,"Boolean.prototype"),At.protos.Symbol=new St(!0,"Symbol.prototype"),At.str=new Et(At.protos.String,"string"),At.bool=new Et(At.protos.Boolean,"bool"),At.num=new Et(At.protos.Number,"number"),At.curOrigin=null,e)for(var t=0;t<e.length;++t)o.load(e[t])})},t.Context.prototype.startAnalysis=function(){this.disabledComputing=this.workList=this.curSuperCtor=this.curSuper=null};var At=null;t.cx=function(){return At},t.withContext=function(t,e){var r=At;At=t;try{return e()}finally{At=r}},t.TimedOut=function(){this.message="Timed out",this.stack=(new Error).stack},t.TimedOut.prototype=Object.create(Error.prototype),t.TimedOut.prototype.name="infer.TimedOut";var Ft;t.withTimeout=function(t,e){var r=+new Date+t,n=Ft;if(n&&n<r)return e();Ft=r;try{return e()}finally{Ft=n}},t.addOrigin=function(t){At.origins.indexOf(t)<0&&At.origins.push(t)};var kt=20,It=1e-4,Ht=t.Scope=function(t,e,r,n){St.call(this,t||!0),this.prev=t,this.originNode=e,this.isBlock=!!r,this.isCatch=!!n};Ht.prototype=s(St.prototype,{constructor:Ht,defVar:function(t,e){for(var r=this;;r=r.proto){var n=r.props[t];if(n)return n;if(!r.prev)return r.defProp(t,e)}}});var Dt={},Mt=t.scopeGatherer=n.make({VariablePattern:function(t,e){e.inner&&x(e.inner,t)},AssignmentPattern:function(t,e,r){r(t.left,e,"Pattern"),r(t.right,e.outer,"Expression")},AssignmentExpression:function(t,e,r){"MemberExpression"==t.left.type?r(t.left,e,"Expression"):r(t.left,N(!1,e),"Pattern"),r(t.right,e,"Expression")},MemberPattern:function(t,e,r){r(t,e.outer)},Function:function(t,e,r){for(var n=t.scope=new Ht(e,t),o=[],i=[],s=0;s<t.params.length;++s){var p=t.params[s];if(i.push(E(p)),"Identifier"==p.type)o.push(x(n,p));else{var a=new st;o.push(a),a.originNode=p,r(p,N(n),"Pattern")}}if(n.fnType=new Ot(t.id&&t.id.name,new st,o,i,K,t.generator),n.fnType.originNode=t,t.id){var u="FunctionDeclaration"==t.type;x(u?e:n,t.id)}r(t.body,n,t.expression?"Expression":"Statement")},BlockStatement:function(t,e,r){!t.scope&&t.body.some(S)&&(e=t.scope=new Ht(e,t,!0)),n.base.BlockStatement(t,e,r)},CatchClause:function(t,e,r){if(e=t.scope=new Ht(e,t,!1,!0),"Identifier"==t.param.type){var n=x(e,t.param);r(t.body,e,"Statement");var o=At.definitions.ecmascript;o&&n.isEmpty()&&yt(o["Error.prototype"]).propagate(n,et)}else r(t.param,N(e),"Pattern")},VariableDeclaration:function(t,e,r){for(var n="var"==t.kind?v(e):e,o=0;o<t.declarations.length;++o){var i=t.declarations[o];r(i.id,N(n,e),"Pattern"),i.init&&r(i.init,e,"Expression")}},ClassDeclaration:function(t,e,r){x(e,t.id),t.superClass&&r(t.superClass,e,"Expression");for(var n=0;n<t.body.body.length;n++)r(t.body.body[n],e)},ForInStatement:function(t,e,r){!t.scope&&S(t.left)&&(e=t.scope=new Ht(e,t,!0)),n.base.ForInStatement(t,e,r)},ForStatement:function(t,e,r){!t.scope&&t.init&&S(t.init)&&(e=t.scope=new Ht(e,t,!0)),n.base.ForStatement(t,e,r)},ImportDeclaration:function(t,e){for(var r=0;r<t.specifiers.length;r++)x(e,t.specifiers[r].local)}});Mt.ForOfStatement=Mt.ForInStatement;var Rt=t.propName=function(t,e){var r=t.property||t.key;if(!t.computed&&"Identifier"==r.type)return r.name;if("Literal"==r.type){if("string"==typeof r.value)return r.value;if("number"==typeof r.value)return String(r.value)}if(e){var n=O(V(r,e));if(n)return t.propName=n}else if(t.propName)return t.propName;return"<i>"},_t=t.inferPatternVisitor={Identifier:function(t,e,r){r.propagate(I(t,e))},MemberExpression:function(t,e,r){var n=V(t.object,e),o=Rt(t,e);n.propagate(new ft(o,r,t.property))},RestElement:function(t,e,r){H(t.argument,e,new jt(r))},ObjectPattern:function(t,e,r){for(var n=0;n<t.properties.length;++n){var o=t.properties[n];H(o.value,e,r.getProp(Rt(o)))}},ArrayPattern:function(t,e,r){for(var n=0;n<t.elements.length;n++)t.elements[n]&&H(t.elements[n],e,r.getProp(String(n)))},AssignmentPattern:function(t,e,r){H(t.left,e,F(r,V(t.right,e)))}},Lt=t.inferExprVisitor={ArrayExpression:L(function(t,e){return _(t.elements,e,V)}),ObjectExpression:L(function(t,e,r){for(var n,o=At.protos.Object,i=0;i<t.properties.length;++i){var s=t.properties[i];if("__proto__"==s.key.name)if("Literal"==s.value.type&&null==s.value.value)o=null;else{var p=V(s.value,e),a=p.getObjType();a?o=a:n=p}}var u=t.objType=new St(o,r);return n&&n.propagate(new wt(u)),u.originNode=t,d(null,n||o,function(){for(var r=0;r<t.properties.length;++r){var n=t.properties[r],o=n.key;if(!l(n.key.name)){var i,s=Rt(n,e);if("<i>"==s||"set"==n.kind)i=K;else{var p=i=u.defProp(s,o);p.initializer=!0,"get"==n.kind&&(i=new lt(u,[],null,p))}V(n.value,e,i,s),"FunctionExpression"==n.value.type&&n.value.scope.fnType.self.addType(u,ot)}}}),u}),FunctionExpression:L(function(t,e,r){var o=t.scope,i=o.fnType;return r&&!i.name&&(i.name=r),k(t,o),t.expression?V(t.body,o,o.fnType.retval=new st):n.recursive(t.body,o,null,qt,"Statement"),"ArrowFunctionExpression"==t.type&&D(e).propagate(i.self),b(t,i)||T(i),t.id&&o.getProp(t.id.name).addType(i),i}),ClassExpression:L(R),SequenceExpression:L(function(t,e){for(var r=0,n=t.expressions.length-1;r<n;++r)V(t.expressions[r],e,K);return V(t.expressions[n],e)}),UnaryExpression:L(function(t,e){return V(t.argument,e,K),j(t.operator)}),UpdateExpression:L(function(t,e){return V(t.argument,e,K),At.num}),BinaryExpression:L(function(t,e){if("+"==t.operator){var r=V(t.left,e),n=V(t.right,e);if(r.hasType(At.str)||n.hasType(At.str))return At.str;if(r.hasType(At.num)&&n.hasType(At.num))return At.num;var o=new st;return r.propagate(new mt(n,o)),n.propagate(new mt(r,o)),o}return V(t.left,e,K),V(t.right,e,K),C(t.operator)?At.bool:At.num}),AssignmentExpression:L(function(t,e,r){var n,o;if("MemberExpression"==t.left.type?(o=Rt(t.left,e),r||(r="Identifier"==t.left.object.type?t.left.object.name+"."+o:o)):r||"Identifier"!=t.left.type||(r=t.left.name),t.operator&&"="!=t.operator&&"+="!=t.operator?(V(t.right,e,K),n=At.num):n=V(t.right,e,null,r),"MemberExpression"==t.left.type){var i=V(t.left.object,e);if("prototype"==o&&m(e,20),"<i>"==o){var s=t.left.property.name,p=e.props[s],a=p&&p.iteratesOver;if(a){m(e,20);var u="MemberExpression"==t.right.type&&t.right.computed&&t.right.property.name==s;return a.forAllProps(function(t,e,r){r&&"prototype"!=t&&"<i>"!=t&&i.propagate(new ft(t,u?e:K))}),n}}i.propagate(new ft(o,n,t.left.property)),M(i),"FunctionExpression"==t.right.type&&i.propagate(t.right.scope.fnType.self,ot)}else H(t.left,e,n);return n}),LogicalExpression:q(function(t,e,r){V(t.left,e,r),V(t.right,e,r)}),ConditionalExpression:q(function(t,e,r){V(t.test,e,K),V(t.consequent,e,r),V(t.alternate,e,r)}),NewExpression:q(function(t,e,r,n){"Identifier"==t.callee.type&&t.callee.name in e.props&&m(e,20);for(var o=0,i=[];o<t.arguments.length;++o)i.push(V(t.arguments[o],e));var s=V(t.callee,e),p=new st;s.propagate(new gt(p,n&&/\.prototype$/.test(n))),p.propagate(r,X),s.propagate(new lt(p,i,t.arguments,new Pt(r)))}),CallExpression:q(function(t,e,r){for(var n=0,o=[];n<t.arguments.length;++n)o.push(V(t.arguments[n],e));var i=v(e).fnType;if("MemberExpression"==t.callee.type){var s=V(t.callee.object,e),p=Rt(t.callee,e);i&&("call"==p||"apply"==p)&&i.args.indexOf(s)>-1&&m(e,30),s.propagate(new ht(p,o,t.arguments,r))}else if("Super"==t.callee.type&&At.curSuperCtor)t.callee.superType=At.curSuperCtor,At.curSuperCtor.propagate(new lt(D(e),o,t.arguments,r)),D(e).propagate(r,X);else{var a=V(t.callee,e);i&&i.args.indexOf(a)>-1&&m(e,30);var u=a.getFunctionType();u&&u.instantiateScore&&i&&m(e,u.instantiateScore/5),a.propagate(new lt(At.topScope,o,t.arguments,r))}}),MemberExpression:q(function(t,e,r){var n,o=Rt(t);if("<i>"==o){var i=V(t.property,e),s=O(i);s?o=t.propName=s:i.hasType(At.num)||(n=tt)}V(t.object,e).getProp(o).propagate(r,n)}),Identifier:L(function(t,e){if("arguments"==t.name){var r=v(e,!1);!r.fnType||t.name in r.props||r.defProp(t.name,r.fnType.originNode).addType(new jt(r.fnType.arguments=new st))}return e.getProp(t.name)}),ThisExpression:L(function(t,e){return D(e)}),Super:L(function(t){return t.superType=At.curSuper||K}),Literal:L(function(t){return A(t)}),TemplateLiteral:L(function(t,e){for(var r=0;r<t.expressions.length;++r)V(t.expressions[r],e,K);return At.str}),TaggedTemplateExpression:q(function(t,e,r){for(var n=[new jt(At.str)],o=0;o<t.quasi.expressions.length;++o)n.push(V(t.quasi.expressions[o],e));V(t.tag,e,new lt(At.topScope,n,t.quasi.expressions,r))}),YieldExpression:L(function(t,e){var r=K,n=v(e).fnType;return n&&(n.retval==K&&(n.retval=new st),n.yieldval||(n.yieldval=new st),r=n.retval),t.argument&&(t.delegate?V(t.argument,e,new ht("next",[],null,new ut("value",r))):V(t.argument,e,r)),n?n.yieldval:K})};Lt.ArrowFunctionExpression=Lt.FunctionExpression;var qt=t.inferWrapper=n.make({Expression:function(t,e){V(t,t.scope||e,K)},FunctionDeclaration:function(t,e,r){var n=t.scope,o=n.fnType;k(t,n),r(t.body,n,"Statement"),b(t,o)||T(o),e.getProp(t.id.name).addType(o)},Statement:function(t,e,r){r(t,t.scope||e)},VariableDeclaration:function(t,e){for(var r=0;r<t.declarations.length;++r){var n=t.declarations[r];if("Identifier"==n.id.type){var o=e.getProp(n.id.name);n.init&&V(n.init,e,o,n.id.name)}else n.init&&H(n.id,e,V(n.init,e))}},ClassDeclaration:function(t,e){e.getProp(t.id.name).addType(R(t,e,t.id.name))},ReturnStatement:function(t,e){if(t.argument){var r=K,n=v(e).fnType;n&&(n.retval==K&&(n.retval=new st),r=n.retval),V(t.argument,e,r)}},ForInStatement:function(t,e,r){
	var n=V(t.right,e);if("Identifier"==t.right.type&&t.right.name in e.props||"MemberExpression"==t.right.type&&"prototype"==t.right.property.name){m(e,5);var o=G(t.left);"Identifier"==o.type?(o.name in e.props&&(e.getProp(o.name).iteratesOver=n),n.getProp("<i>").propagate(I(o,e))):H(o,e,n.getProp("<i>"))}r(t.body,e,"Statement")},ForOfStatement:function(t,e,r){var n,o=G(t.left);"Identifier"==o.type?n=I(o,e):H(o,e,n=new st),V(t.right,e,new ht(":Symbol.iterator",[],null,new ht("next",[],null,new ut("value",n)))),r(t.body,e,"Statement")}}),Vt=t.parse=function(t,n,o){n&&!Array.isArray(n)||(n=o);var i;try{i=e.parse(t,n)}catch(e){i=r.parse_dammit(t,n)}return i};t.analyze=function(e,r,o){"string"==typeof e&&(e=Vt(e)),r||(r="file#"+At.origins.length),t.addOrigin(At.curOrigin=r),o||(o=At.topScope),At.startAnalysis(),n.recursive(e,o,null,Mt),At.parent&&At.parent.signal("preInfer",e,o),n.recursive(e,o,null,qt),At.parent&&At.parent.signal("postInfer",e,o),At.curOrigin=null},t.purge=function(t,e,r){var n=B(t,e,r);++At.purgeGen,At.topScope.purge(n);for(var o in At.props){for(var i=At.props[o],s=0;s<i.length;++s){var p=i[s],a=p.props[o];a&&!n(a,a.originNode)||i.splice(s--,1)}i.length||delete At.props[o]}},st.prototype.purge=function(t){if(this.purgeGen!=At.purgeGen){this.purgeGen=At.purgeGen;for(var e=0;e<this.types.length;++e){var r=this.types[e];t(r,r.originNode)?this.types.splice(e--,1):r.purge(t)}if(this.types.length||(this.maxWeight=0),this.forward)for(var e=0;e<this.forward.length;++e){var n=this.forward[e];t(n)?(this.forward.splice(e--,1),this.props&&(this.props=null)):n.purge&&n.purge(t)}}},K.purge=function(){},St.prototype.purge=function(t){if(this.purgeGen==At.purgeGen)return!0;this.purgeGen=At.purgeGen;for(var e in this.props){var r=this.props[e];t(r,r.originNode)&&this.removeProp(e),r.purge(t)}},Ot.prototype.purge=function(t){if(!St.prototype.purge.call(this,t)){this.self.purge(t),this.retval.purge(t);for(var e=0;e<this.args.length;++e)this.args[e].purge(t)}};var Gt=t.typeFinder={ArrayExpression:function(t,e){return _(t.elements,e,Y)},ObjectExpression:function(t){return t.objType},ClassExpression:function(t){return t.objType},FunctionExpression:function(t){return t.scope.fnType},ArrowFunctionExpression:function(t){return t.scope.fnType},SequenceExpression:function(t,e){return Y(t.expressions[t.expressions.length-1],e)},UnaryExpression:function(t){return j(t.operator)},UpdateExpression:function(){return At.num},BinaryExpression:function(t,e){if(C(t.operator))return At.bool;if("+"==t.operator){var r=Y(t.left,e),n=Y(t.right,e);if(r.hasType(At.str)||n.hasType(At.str))return At.str}return At.num},AssignmentExpression:function(t,e){return Y(t.right,e)},LogicalExpression:function(t,e){var r=Y(t.left,e);return r.isEmpty()?Y(t.right,e):r},ConditionalExpression:function(t,e){var r=Y(t.consequent,e);return r.isEmpty()?Y(t.alternate,e):r},NewExpression:function(t,e){var r=Y(t.callee,e).getFunctionType(),n=r&&r.getProp("prototype").getObjType();return n?yt(n,r):K},CallExpression:function(t,e){return $(t.callee,t.arguments,e)},MemberExpression:function(t,e){var r=Rt(t),n=Y(t.object,e).getType();return n?n.getProp(r):"<i>"==r?K:U(r)},MethodDefinition:function(t){var e=Rt(t),r=D(t.value.scope).getType();return r?r.getProp(e):K},Identifier:function(t,e){return e.hasProp(t.name)||K},ThisExpression:function(t,e){return D(e)},Literal:function(t){return A(t)},Super:L(function(t){return t.superType}),TemplateLiteral:function(){return At.str},TaggedTemplateExpression:function(t,e){return $(t.tag,t.quasi.expressions,e)},YieldExpression:function(t,e){var r=v(e).fnType;return r?r.yieldval:K}},Bt=t.searchVisitor=n.make({Function:function(t,e,r){n.base.Function(t,t.scope,r)},CatchClause:function(t,e,r){n.base.CatchClause(t,t.scope,r)},Property:function(t,e,r){t.computed&&r(t.key,e,"Expression"),t.key!=t.value&&r(t.value,e,"Expression")},Statement:function(t,e,r){r(t,t.scope||e)},ImportSpecifier:function(t,e,r){r(t.local,e)},ImportDefaultSpecifier:function(t,e,r){r(t.local,e)},ImportNamespaceSpecifier:function(t,e,r){r(t.local,e)}});t.fullVisitor=n.make({MemberExpression:function(t,e,r){r(t.object,e,"Expression"),r(t.property,e,t.computed?"Expression":null)},Property:function(t,e,r){t.computed&&r(t.key,e,"Expression"),r(t.value,e,"Expression")}},Bt),t.findExpressionAt=function(t,e,r,o,i){var s=i||function(t,e){return("Identifier"!=e.type||"✖"!=e.name)&&Gt.hasOwnProperty(e.type)};return n.findNodeAt(t,e,r,s,Bt,o||At.topScope)},t.findExpressionAround=function(t,e,r,o,i){var s=i||function(t,r){return!(null!=e&&r.start>e)&&(("Identifier"!=r.type||"✖"!=r.name)&&Gt.hasOwnProperty(r.type))};return n.findNodeAround(t,r,s,Bt,o||At.topScope)},t.expressionType=function(t){return Y(t.node,t.state)},t.parentNode=function(t,e){function r(e,i,s){if(e.start<=t.start&&e.end>=t.end){var p=o[o.length-1];if(e==t)throw{found:p};p!=e&&o.push(e),n.base[s||e.type](e,i,r),p!=e&&o.pop()}}var o=[];try{r(e,null)}catch(t){if(t.found)return t.found;throw t}};var Ut=t.findTypeFromContext={ArrayExpression:function(t,e,r){return r(t,!0).getProp("<i>")},ObjectExpression:function(t,e,r){for(var n=0;n<t.properties.length;++n){var o=e.properties[n];if(o.value==e)return r(t,!0).getProp(Rt(o))}},UnaryExpression:function(t){return j(t.operator)},UpdateExpression:function(){return At.num},BinaryExpression:function(t){return C(t.operator)?At.bool:At.num},AssignmentExpression:function(t,e,r){return r(t.left)},LogicalExpression:function(t,e,r){return r(t,!0)},ConditionalExpression:function(t,e,r){if(t.consequent==e||t.alternate==e)return r(t,!0)},CallExpression:function(t,e,r){for(var n=0;n<t.arguments.length;n++){var o=t.arguments[n];if(o==e){var i=r(t.callee).getFunctionType();if(i instanceof Ot)return i.args[n];break}}},ReturnStatement:function(t,e,r){var o=n.findNodeAround(e.sourceFile.ast,e.start-1,"Function");if(o){var i="FunctionDeclaration"!=o.node.type?r(o.node,!0).getFunctionType():o.node.scope.fnType;if(i)return i.retval.getType()}},VariableDeclarator:function(t,e,r){if(t.init==e)return r(t.id)}};Ut.NewExpression=Ut.CallExpression,t.typeFromContext=function(e,r){var n=t.parentNode(r.node,e),o=null;if(Ut.hasOwnProperty(n.type)){var i=Ut[n.type];o=i&&i(n,r.node,function(n,o){var i={node:n,state:r.state},s=o?t.typeFromContext(e,i):t.expressionType(i);return s||K})}return o||t.expressionType(r)};var zt=!1;t.resetGuessing=function(t){zt=t},t.didGuess=function(){return zt},t.forAllPropertiesOf=function(t,e){t.gatherProperties(e,0)},t.findRefs=function(e,r,o,i,s){function p(t,r,n){if(t.name==o&&(t!=e.id||"FunctionDeclaration"!=e.type))for(var p=r;p;p=p.prev)if(p==i&&s(t,r,n),o in p.props)return}n.ancestor(e,{Identifier:p,VariablePattern:p},t.fullVisitor,r)};var Wt=n.make({Function:function(t,e,r){r(t.body,t.scope,t.expression?"Expression":"Statement")},Statement:function(t,e,r){r(t,t.scope||e)}});t.findPropRefs=function(t,e,r,o,i){function s(t){for(;t&&t!=r;){if(t.props[o]||t.maybeProps&&t.maybeProps[o])return!1;t=t.proto}return t}for(;r&&!r.props[o]&&(!r.maybeProps||!r.maybeProps[o]);)r=r.proto;if(!r)throw new Error("Couldn't locate property in the base object type.");n.simple(t,{MemberExpression:function(t,e){t.computed||Rt(t)!=o||s(Y(t.object,e).getType())&&i(t.property,e)},ObjectExpression:function(t,e){if(Y(t,e).getType()==r)for(var n=0;n<t.properties.length;++n)Rt(t.properties[n])==o&&i(t.properties[n].key,e)},MethodDefinition:function(t){Rt(t)==o&&t.value&&s(D(t.value.scope).getType())&&i(t.key,t.value.scope)}},Wt,e)};var $t=t.scopeAt=function(t,e,r){var o=n.findNodeAround(t,e,function(t,e){return e.scope});return o?o.node.scope:r||At.topScope};t.forAllLocalsAt=function(t,e,r,n){var o=$t(t,e,r);o.gatherProperties(n,0)},o=t.def=o.init({},t)});

/***/ },

/***/ "./node_modules/tern/lib/signal.js":
/***/ function(module, exports, __webpack_require__) {

	!function(n,t){return true?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):void t((n.tern||(n.tern={})).signal={})}(this,function(n){function t(n,t){var e=this._handlers||(this._handlers=Object.create(null));(e[n]||(e[n]=[])).push(t)}function e(n,t){var e=this._handlers&&this._handlers[n];if(e)for(var r=0;r<e.length;++r)if(e[r]==t){e.splice(r,1);break}}function r(n,t){var e=n._handlers&&n._handlers[t];return e&&e.length?e.slice():h}function i(n,t,e,i,s){for(var a=r(this,n),h=0;h<a.length;++h)a[h].call(this,t,e,i,s)}function s(n,t,e,i,s){for(var a=r(this,n),h=0;h<a.length;++h){var l=a[h].call(this,t,e,i,s);if(l)return l}}function a(n){var t=this._handlers&&this._handlers[n];return t&&t.length>0&&t}var h=[];n.mixin=function(n){return n.on=t,n.off=e,n.signal=i,n.signalReturnFirst=s,n.hasHandler=a,n}});

/***/ },

/***/ "./node_modules/tern/plugin/doc_comment.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){return true?e(__webpack_require__("./node_modules/tern/lib/infer.js"),__webpack_require__("./node_modules/tern/lib/tern.js"),__webpack_require__("./node_modules/tern/lib/comment.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/walk.js")):"function"==typeof define&&define.amd?define(["../lib/infer","../lib/tern","../lib/comment","acorn/dist/acorn","acorn/dist/walk"],e):void e(tern,tern,tern.comment,acorn,acorn.walk)}(function(e,r,n,t,o){"use strict";function a(e,r){function t(e){n.ensureCommentsBefore(r,e)}o.simple(e,{VariableDeclaration:t,FunctionDeclaration:t,MethodDefinition:t,Property:t,AssignmentExpression:function(e){"="==e.operator&&t(e)},CallExpression:function(e){i(e)&&t(e)},ExportNamedDeclaration:function(e){t(e)},ExportDefaultDeclaration:function(e){t(e)}})}function i(e){return"MemberExpression"==e.callee.type&&"Object"==e.callee.object.name&&"defineProperty"==e.callee.property.name&&e.arguments.length>=3&&"string"==typeof e.arguments[1].value}function c(r,n){A(r.sourceFile.text,n),o.simple(r,{VariableDeclaration:function(e,r){var n=e.declarations[0].id;e.commentsBefore&&"Identifier"==n.type&&f(e,e.commentsBefore,r,r.getProp(e.declarations[0].id.name))},FunctionDeclaration:function(e,r){e.commentsBefore&&f(e,e.commentsBefore,r,r.getProp(e.id.name),e.scope.fnType)},ClassDeclaration:function(e,r){e.commentsBefore&&f(e,e.commentsBefore,r,r.getProp(e.id.name),e.objType)},AssignmentExpression:function(r,n){r.commentsBefore&&f(r,r.commentsBefore,n,e.expressionType({node:r.left,state:n}))},ObjectExpression:function(r,n){for(var t=0;t<r.properties.length;++t){var o=r.properties[t],a=e.propName(o);"<i>"!=a&&o.commentsBefore&&f(o,o.commentsBefore,n,r.objType.getProp(a))}},Class:function(r,n){var t=r.objType.getProp("prototype").getObjType();if(t)for(var o=0;o<r.body.body.length;o++){var a,i=r.body.body[o];i.commentsBefore&&("constructor"==i.kind?f(i,i.commentsBefore,n,r.objType):"<i>"!=(a=e.propName(i))&&f(i,i.commentsBefore,n,t.getProp(a)))}},CallExpression:function(r,n){if(r.commentsBefore&&i(r)){var t=e.expressionType({node:r.arguments[0],state:n}).getObjType();if(t&&t instanceof e.Obj){var o=t.props[r.arguments[1].value];o&&f(r,r.commentsBefore,n,o)}}},ExportNamedDeclaration:function(e,r){e.commentsBefore&&e.declaration&&"FunctionDeclaration"===e.declaration.type&&f(e.declaration,e.commentsBefore,r,r.getProp(e.declaration.id.name),e.declaration.scope.fnType)},ExportDefaultDeclaration:function(e,r){e.commentsBefore&&e.declaration&&"FunctionDeclaration"===e.declaration.type&&f(e.declaration,e.commentsBefore,r,r.getProp(e.declaration.id.name),e.declaration.scope.fnType)}},e.searchVisitor,n)}function l(r){var n=r["!typedef"],t=e.cx(),o=r["!name"];if(n)for(var a in n)t.parent.mod.jsdocTypedefs[a]=g(e.def.parse(n[a],o,a),a)}function s(e){for(var r,n=1;n<e.length;n++){var t=e[n],o=t.match(/^[\s\*]*/)[0];if(o!=t)if(null==r)r=o;else{for(var a=0;a<r.length&&r.charCodeAt(a)==o.charCodeAt(a);)++a;a<r.length&&(r=r.slice(0,a))}}for(e=e.map(function(e,n){if(e=e.replace(/\s+$/,""),0==n&&null!=r)for(var t=0;t<r.length;t++){var o=e.indexOf(r.slice(t));if(0==o)return e.slice(r.length-t)}return null==r||0==n?e.replace(/^[\s\*]*/,""):e.length<r.length?"":e.slice(r.length)});e.length&&!e[e.length-1];)e.pop();for(;e.length&&!e[0];)e.shift();return e}function f(r,n,t,o,a){b(r,t,o,n);var i=e.cx();!a&&o instanceof e.AVal&&o.types.length&&(a=o.types[o.types.length-1],a instanceof e.Obj&&a.origin==i.curOrigin&&!a.doc||(a=null));for(var c=n.length-1;c>=0;c--){var l=s(n[c].split(/\r\n?|\n/)).join("\n");if(l){o instanceof e.AVal&&(o.doc=l),a&&(a.doc=l);break}}}function p(e,r){for(;/\s/.test(e.charAt(r));)++r;return r}function u(e){if(!t.isIdentifierStart(e.charCodeAt(0)))return!1;for(var r=1;r<e.length;r++)if(!t.isIdentifierChar(e.charCodeAt(r)))return!1;return!0}function d(e,r,n,t){for(var o=[],a=[],i=!1,c=!0;n=p(r,n),!c||r.charAt(n)!=t;c=!1){var l=r.indexOf(":",n);if(l<0)return null;var s=r.slice(n,l);if(!u(s))return null;o.push(s),n=l+1;var f=y(e,r,n);if(!f)return null;n=f.end,i=i||f.madeUp,a.push(f.type),n=p(r,n);var d=r.charAt(n);if(++n,d==t)break;if(","!=d)return null}return{labels:o,types:a,end:n,madeUp:i}}function m(r,n,t){var o=h(r,n,t);return o?"[]"==n.slice(o.end,o.end+2)?{madeUp:o.madeUp,end:o.end+2,type:new e.Arr(o.type)}:o:null}function y(r,n,t){for(var o,a=!1,i=!1;;){var c=m(r,n,t);if(!c)return null;if(i=i||c.madeUp,a?c.type.propagate(a):o=c.type,t=p(n,c.end),"|"!=n.charAt(t))break;t++,a||(a=new e.AVal,o.propagate(a),o=a)}var l=!1;return"="==n.charAt(t)&&(++t,l=!0),{type:o,end:t,isOptional:l,madeUp:i}}function h(r,n,o){o=p(n,o);var a,i=!1;if(n.indexOf("function(",o)==o){var c=d(r,n,o+9,")"),l=e.ANull;if(!c)return null;if(o=p(n,c.end),":"==n.charAt(o)){++o;var s=y(r,n,o+1);if(!s)return null;o=s.end,l=s.type,i=s.madeUp}a=new e.Fn(null,e.ANull,c.types,c.labels,l)}else if("["==n.charAt(o)){var f=y(r,n,o+1);if(!f)return null;if(o=p(n,f.end),i=f.madeUp,"]"!=n.charAt(o))return null;++o,a=new e.Arr(f.type)}else if("{"==n.charAt(o)){var u=d(r,n,o+1,"}");if(!u)return null;a=new e.Obj(!0);for(var m=0;m<u.types.length;++m){var h=a.defProp(u.labels[m]);h.initializer=!0,u.types[m].propagate(h)}o=u.end,i=u.madeUp}else if("("==n.charAt(o)){var f=y(r,n,o+1);if(!f)return null;if(o=p(n,f.end),")"!=n.charAt(o))return null;++o,a=f.type}else{var v=o;if(!t.isIdentifierStart(n.charCodeAt(o)))return null;for(;t.isIdentifierChar(n.charCodeAt(o));)++o;if(v==o)return null;var b=n.slice(v,o);if(/^(number|integer)$/i.test(b))a=e.cx().num;else if(/^bool(ean)?$/i.test(b))a=e.cx().bool;else if(/^string$/i.test(b))a=e.cx().str;else if(/^(null|undefined)$/i.test(b))a=e.ANull;else if(/^array$/i.test(b)){var f=null;if("."==n.charAt(o)&&"<"==n.charAt(o+1)){var A=y(r,n,o+2);if(!A)return null;if(o=p(n,A.end),i=A.madeUp,">"!=n.charAt(o++))return null;f=A.type}a=new e.Arr(f)}else if(/^object$/i.test(b)){if(a=new e.Obj(!0),"."==n.charAt(o)&&"<"==n.charAt(o+1)){var j=y(r,n,o+2);if(!j)return null;if(o=p(n,j.end),i=i||j.madeUp,","!=n.charAt(o++))return null;var x=y(r,n,o);if(!x)return null;if(o=p(n,x.end),i=j.madeUp||x.madeUp,">"!=n.charAt(o++))return null;x.type.propagate(a.defProp("<i>"))}}else{for(;46==n.charCodeAt(o)||t.isIdentifierChar(n.charCodeAt(o));)++o;var O,P=n.slice(v,o),T=e.cx(),B=T.parent&&T.parent.mod.jsdocTypedefs;B&&P in B?a=B[P]:(O=e.def.parsePath(P,r).getObjType())?a=g(O,P):(T.jsdocPlaceholders||(T.jsdocPlaceholders=Object.create(null)),a=P in T.jsdocPlaceholders?T.jsdocPlaceholders[P]:T.jsdocPlaceholders[P]=new e.Obj(null,P),i=!0)}}return{type:a,end:o,madeUp:i}}function g(r,n){if(r instanceof e.Fn&&/(?:^|\.)[A-Z][^\.]*$/.test(n)){var t=r.getProp("prototype").getObjType();if(t instanceof e.Obj)return e.getInstance(t)}return r}function v(e,r,n){if(n=p(r,n||0),"{"!=r.charAt(n))return null;var t=y(e,r,n+1);if(!t)return null;var o=p(r,t.end);return"}"!=r.charAt(o)?null:(t.end=o+1,t)}function b(e,r,n,t){for(var o,a,i,c,l,s,f=0;f<t.length;++f)for(var p,u=t[f],d=/(?:\n|$|\*)\s*@(type|param|arg(?:ument)?|returns?|this|class|constructor)\s+(.*)/g;p=d.exec(u);)if("class"!=p[1]&&"constructor"!=p[1]){if("this"==p[1]&&(s=y(r,p[2],0)))l=s,c=!0;else if(s=v(r,p[2]))switch(c=!0,p[1]){case"returns":case"return":i=s;break;case"type":o=s;break;case"param":case"arg":case"argument":var m=p[2].slice(s.end).match(/^\s*(\[?)\s*([^\]\s=]+)\s*(?:=[^\]]+\s*)?(\]?).*/);if(!m)continue;var h=m[2]+(s.isOptional||"["===m[1]&&"]"===m[3]?"?":"");(a||(a=Object.create(null)))[h]=s}}else l=c=!0;c&&O(o,l,a,i,e,n)}function A(r,n){for(var t,o=e.cx(),a=/\s@typedef\s+(.*)/g;t=a.exec(r);){var i=v(n,t[1]),c=i&&t[1].slice(i.end).match(/^\s*(\S+)/);if(c&&i.type instanceof e.Obj){for(var l=r.slice(t.index+t[0].length);t=/\s+@prop(?:erty)?\s+(.*)/.exec(l);){var s,f=v(n,t[1]);f&&(s=t[1].slice(f.end).match(/^\s*(\S+)/))&&f.type.propagate(i.type.defProp(s[1])),l=l.slice(t[0].length)}o.parent.mod.jsdocTypedefs[c[1]]=i.type}}}function j(r,n){var t=e.cx().parent.mod.docComment.weight;r.type.propagate(n,t||(r.madeUp?P:void 0))}function x(e){return"FunctionExpression"==e.type||"ArrowFunctionExpression"==e.type}function O(r,n,t,o,a,i){var c;if("VariableDeclaration"==a.type){var l=a.declarations[0];l.init&&x(l.init)&&(c=l.init.scope.fnType)}else"FunctionDeclaration"==a.type?c=a.scope.fnType:"AssignmentExpression"==a.type?x(a.right)&&(c=a.right.scope.fnType):"CallExpression"==a.type||x(a.value)&&(c=a.value.scope.fnType);if(c&&(t||o||n)){if(t)for(var s=0;s<c.argNames.length;++s){var f=c.argNames[s],p=t[f];!p&&(p=t[f+"?"])&&(c.argNames[s]+="?"),p&&j(p,c.args[s])}if(o&&(c.retval==e.ANull&&(c.retval=new e.AVal),j(o,c.retval)),n===!0){var u=c.getProp("prototype").getObjType();n=u&&{type:e.getInstance(u,c)}}n&&j(n,c.self)}else r&&j(r,i)}var P=1,T=101;r.registerPlugin("doc_comment",function(e,r){e.mod.jsdocTypedefs=Object.create(null),e.on("reset",function(){e.mod.jsdocTypedefs=Object.create(null)}),e.mod.docComment={weight:r&&r.strong?T:void 0,fullDocs:r&&r.fullDocs},e.on("postParse",a),e.on("postInfer",c),e.on("postLoadDef",l)})});

/***/ },

/***/ "./node_modules/tern/lib/comment.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){return true?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):void e(tern.comment||(tern.comment={}))}(function(e){function r(e){return e<14&&e>8||32===e||160===e}function t(e,t){for(;t>0;--t){var n=e.charCodeAt(t-1);if(10==n)break;if(!r(n))return!1}return!0}e.commentsBefore=function(e,n){var o,f=null,i=0;e:for(;n>0;){var c=e.charCodeAt(n-1);if(10==c)for(var a=--n,u=!1;a>0;--a){if(c=e.charCodeAt(a-1),47==c&&47==e.charCodeAt(a-2)){if(!t(e,a-2))break e;var m=e.slice(a,n);!i&&o?f[0]=m+"\n"+f[0]:(f||(f=[])).unshift(m),o=!0,i=0,n=a-2;break}if(10==c){if(!u&&++i>1)break e;break}u||r(c)||(u=!0)}else if(47==c&&42==e.charCodeAt(n-2)){for(var a=n-2;a>1;--a)if(42==e.charCodeAt(a-1)&&47==e.charCodeAt(a-2)){if(!t(e,a-2))break e;(f||(f=[])).unshift(e.slice(a,n-2)),o=!1,i=0;break}n=a-2}else{if(!r(c))break;--n}}return f},e.commentAfter=function(e,t){for(;t<e.length;){var n=e.charCodeAt(t);if(47==n){var o,f=e.charCodeAt(t+1);if(47==f)o=e.indexOf("\n",t+2);else{if(42!=f)return;o=e.indexOf("*/",t+2)}return e.slice(t+2,o<0?e.length:o)}r(n)&&++t}},e.ensureCommentsBefore=function(r,t){return t.hasOwnProperty("commentsBefore")?t.commentsBefore:t.commentsBefore=e.commentsBefore(r,t.start)}});

/***/ },

/***/ "./src/defs/jscodeshift.json":
/***/ function(module, exports) {

	module.exports = {
		"!name": "jscodeshift",
		"!define": {
			"file": {
				"source": {
					"!type": "string",
					"!doc": "The source code of the current file."
				},
				"path": {
					"!type": "string",
					"!doc": "The absolute path to the current file"
				}
			},
			"apiObject": {
				"stats": {
					"!type": "fn(value: string)",
					"!doc": "Helper function to collect data during --dry runs. This function keeps a counter for how often it was called with a specific argument. The result is shown in the console. Useful for finding out how many files match a criterion."
				},
				"jscodeshift": {
					"!type": "fn(source: string|+NodePath) -> +Collection",
					"template": {
						"expression": {
							"!type": "fn(strings: [string], value: ?, value: ?) -> Expression",
							"!doc": "Tagged template function. Parses the string as source and returns an Expression AST node."
						},
						"statement": {
							"!type": "fn(strings: [string], value: ?, value: ?) -> Statement",
							"!doc": "Tagged template function. Parses the string as source and returns an Statement AST node."
						},
						"statements": {
							"!type": "fn(strings: [string], value: ?, value: ?) -> [Statement]",
							"!doc": "Tagged template function. Parses the string as source and returns an array of Statement AST nodes."
						}
					},
					"match": {
						"!type": "fn(node: ASTNode, pattern: object) -> bool",
						"!doc": "Returns true if node matches the pattern, else false"
					},
					"ModuleSpecifier": "TypeDefinition",
					"ConditionalExpression": "TypeDefinition",
					"Node": "TypeDefinition",
					"MixedTypeAnnotation": "TypeDefinition",
					"XMLAttributeSelector": "TypeDefinition",
					"JSXNamespacedName": "TypeDefinition",
					"GenericTypeAnnotation": "TypeDefinition",
					"XMLFunctionQualifiedIdentifier": "TypeDefinition",
					"ClassPropertyDefinition": "TypeDefinition",
					"NullableTypeAnnotation": "TypeDefinition",
					"ForInStatement": "TypeDefinition",
					"YieldExpression": "TypeDefinition",
					"ClassProperty": "TypeDefinition",
					"XMLDefaultDeclaration": "TypeDefinition",
					"TemplateElement": "TypeDefinition",
					"ExportDefaultDeclaration": "TypeDefinition",
					"TupleTypeAnnotation": "TypeDefinition",
					"GraphExpression": "TypeDefinition",
					"MemberExpression": "TypeDefinition",
					"ImportDeclaration": "TypeDefinition",
					"File": "TypeDefinition",
					"JSXSpreadAttribute": "TypeDefinition",
					"XMLName": "TypeDefinition",
					"ClassExpression": "TypeDefinition",
					"TemplateLiteral": "TypeDefinition",
					"ClassImplements": "TypeDefinition",
					"TypeAlias": "TypeDefinition",
					"StringLiteralTypeAnnotation": "TypeDefinition",
					"TaggedTemplateExpression": "TypeDefinition",
					"Identifier": "TypeDefinition",
					"JSXElement": "TypeDefinition",
					"BooleanLiteralTypeAnnotation": "TypeDefinition",
					"MethodDefinition": "TypeDefinition",
					"Line": "TypeDefinition",
					"GeneratorExpression": "TypeDefinition",
					"LetStatement": "TypeDefinition",
					"Literal": "TypeDefinition",
					"BooleanTypeAnnotation": "TypeDefinition",
					"JSXAttribute": "TypeDefinition",
					"ExportNamespaceSpecifier": "TypeDefinition",
					"ArrayTypeAnnotation": "TypeDefinition",
					"BlockStatement": "TypeDefinition",
					"WithStatement": "TypeDefinition",
					"XMLProcessingInstruction": "TypeDefinition",
					"SpreadPropertyPattern": "TypeDefinition",
					"WhileStatement": "TypeDefinition",
					"ThrowStatement": "TypeDefinition",
					"InterfaceDeclaration": "TypeDefinition",
					"TypeofTypeAnnotation": "TypeDefinition",
					"LetExpression": "TypeDefinition",
					"ExportSpecifier": "TypeDefinition",
					"ContinueStatement": "TypeDefinition",
					"Printable": "TypeDefinition",
					"ThisExpression": "TypeDefinition",
					"IntersectionTypeAnnotation": "TypeDefinition",
					"JSXClosingElement": "TypeDefinition",
					"DeclareFunction": "TypeDefinition",
					"VariableDeclaration": "TypeDefinition",
					"BreakStatement": "TypeDefinition",
					"ImportSpecifier": "TypeDefinition",
					"ParenthesizedExpression": "TypeDefinition",
					"RestElement": "TypeDefinition",
					"Specifier": "TypeDefinition",
					"ArrayExpression": "TypeDefinition",
					"XMLAnyName": "TypeDefinition",
					"ExportDeclaration": "TypeDefinition",
					"ObjectTypeAnnotation": "TypeDefinition",
					"ExportAllDeclaration": "TypeDefinition",
					"SourceLocation": "TypeDefinition",
					"TypeAnnotation": "TypeDefinition",
					"Statement": "TypeDefinition",
					"Position": "TypeDefinition",
					"ObjectExpression": "TypeDefinition",
					"Program": "TypeDefinition",
					"Comment": "TypeDefinition",
					"AssignmentPattern": "TypeDefinition",
					"ObjectTypeIndexer": "TypeDefinition",
					"ArrowFunctionExpression": "TypeDefinition",
					"XMLAttribute": "TypeDefinition",
					"Noop": "TypeDefinition",
					"DeclareClass": "TypeDefinition",
					"XMLEndTag": "TypeDefinition",
					"JSXIdentifier": "TypeDefinition",
					"VoidTypeAnnotation": "TypeDefinition",
					"ComprehensionBlock": "TypeDefinition",
					"FunctionTypeAnnotation": "TypeDefinition",
					"ComprehensionExpression": "TypeDefinition",
					"MetaProperty": "TypeDefinition",
					"XMLQualifiedIdentifier": "TypeDefinition",
					"DoWhileStatement": "TypeDefinition",
					"EmptyStatement": "TypeDefinition",
					"VariableDeclarator": "TypeDefinition",
					"ObjectPattern": "TypeDefinition",
					"AssignmentExpression": "TypeDefinition",
					"Declaration": "TypeDefinition",
					"DoExpression": "TypeDefinition",
					"GraphIndexExpression": "TypeDefinition",
					"DeclareVariable": "TypeDefinition",
					"ObjectTypeProperty": "TypeDefinition",
					"IfStatement": "TypeDefinition",
					"BindExpression": "TypeDefinition",
					"LogicalExpression": "TypeDefinition",
					"CommentLine": "TypeDefinition",
					"ObjectTypeCallProperty": "TypeDefinition",
					"FunctionDeclaration": "TypeDefinition",
					"NewExpression": "TypeDefinition",
					"TypeCastExpression": "TypeDefinition",
					"XMLStartTag": "TypeDefinition",
					"XMLPointTag": "TypeDefinition",
					"Pattern": "TypeDefinition",
					"ImportDefaultSpecifier": "TypeDefinition",
					"XMLFilterExpression": "TypeDefinition",
					"XMLEscape": "TypeDefinition",
					"JSXEmptyExpression": "TypeDefinition",
					"SequenceExpression": "TypeDefinition",
					"InterfaceExtends": "TypeDefinition",
					"PropertyPattern": "TypeDefinition",
					"CatchClause": "TypeDefinition",
					"SpreadElement": "TypeDefinition",
					"FunctionTypeParam": "TypeDefinition",
					"Property": "TypeDefinition",
					"JSXOpeningElement": "TypeDefinition",
					"StringTypeAnnotation": "TypeDefinition",
					"ForStatement": "TypeDefinition",
					"Decorator": "TypeDefinition",
					"SpreadElementPattern": "TypeDefinition",
					"JSXMemberExpression": "TypeDefinition",
					"FunctionExpression": "TypeDefinition",
					"BinaryExpression": "TypeDefinition",
					"TryStatement": "TypeDefinition",
					"Expression": "TypeDefinition",
					"ExportNamedDeclaration": "TypeDefinition",
					"SwitchStatement": "TypeDefinition",
					"Block": "TypeDefinition",
					"ExportBatchSpecifier": "TypeDefinition",
					"ExpressionStatement": "TypeDefinition",
					"ArrayPattern": "TypeDefinition",
					"XMLList": "TypeDefinition",
					"ReturnStatement": "TypeDefinition",
					"CallExpression": "TypeDefinition",
					"DeclareModule": "TypeDefinition",
					"NumberLiteralTypeAnnotation": "TypeDefinition",
					"Type": "TypeDefinition",
					"TypeParameterDeclaration": "TypeDefinition",
					"XMLText": "TypeDefinition",
					"Function": "TypeDefinition",
					"UnaryExpression": "TypeDefinition",
					"XML": "TypeDefinition",
					"Super": "TypeDefinition",
					"TypeParameterInstantiation": "TypeDefinition",
					"XMLComment": "TypeDefinition",
					"MemberTypeAnnotation": "TypeDefinition",
					"SwitchCase": "TypeDefinition",
					"AwaitExpression": "TypeDefinition",
					"ExportDefaultSpecifier": "TypeDefinition",
					"XMLElement": "TypeDefinition",
					"AnyTypeAnnotation": "TypeDefinition",
					"CommentBlock": "TypeDefinition",
					"ClassBody": "TypeDefinition",
					"ImportNamespaceSpecifier": "TypeDefinition",
					"JSXExpressionContainer": "TypeDefinition",
					"DeclareExportDeclaration": "TypeDefinition",
					"UnionTypeAnnotation": "TypeDefinition",
					"XMLCdata": "TypeDefinition",
					"JSXText": "TypeDefinition",
					"QualifiedTypeIdentifier": "TypeDefinition",
					"DebuggerStatement": "TypeDefinition",
					"ForOfStatement": "TypeDefinition",
					"LabeledStatement": "TypeDefinition",
					"SpreadProperty": "TypeDefinition",
					"UpdateExpression": "TypeDefinition",
					"ClassDeclaration": "TypeDefinition",
					"NumberTypeAnnotation": "TypeDefinition",
					"switchStatement": {
						"!type": "fn(discriminant: Expression, cases: [SwitchCase], lexical: boolean) -> SwitchStatement",
						"!doc": "Builds an AST node of type 'SwitchStatement'.\nSuper types: Statement, Node, Printable"
					},
					"identifier": {
						"!type": "fn(name: string) -> Identifier",
						"!doc": "Builds an AST node of type 'Identifier'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"classPropertyDefinition": {
						"!type": "fn(definition: MethodDefinition|VariableDeclarator|ClassPropertyDefinition|ClassProperty) -> ClassPropertyDefinition",
						"!doc": "Builds an AST node of type 'ClassPropertyDefinition'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"jsxMemberExpression": {
						"!type": "fn(object: JSXIdentifier|JSXMemberExpression, property: JSXIdentifier) -> JSXMemberExpression",
						"!doc": "Builds an AST node of type 'JSXMemberExpression'.\nSuper types: MemberExpression, Expression, Pattern, Node, Printable"
					},
					"exportNamespaceSpecifier": {
						"!type": "fn(exported: Identifier) -> ExportNamespaceSpecifier",
						"!doc": "Builds an AST node of type 'ExportNamespaceSpecifier'.\nSuper types: Specifier, Node, Printable"
					},
					"conditionalExpression": {
						"!type": "fn(test: Expression, consequent: Expression, alternate: Expression) -> ConditionalExpression",
						"!doc": "Builds an AST node of type 'ConditionalExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"parenthesizedExpression": {
						"!type": "fn(expression: Expression) -> ParenthesizedExpression",
						"!doc": "Builds an AST node of type 'ParenthesizedExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"yieldExpression": {
						"!type": "fn(argument: Expression|null, delegate: boolean) -> YieldExpression",
						"!doc": "Builds an AST node of type 'YieldExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"typeParameterInstantiation": {
						"!type": "fn(params: [Type]) -> TypeParameterInstantiation",
						"!doc": "Builds an AST node of type 'TypeParameterInstantiation'.\nSuper types: Node, Printable"
					},
					"bindExpression": {
						"!type": "fn(object: Expression|null, callee: Expression) -> BindExpression",
						"!doc": "Builds an AST node of type 'BindExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"expressionStatement": {
						"!type": "fn(expression: Expression) -> ExpressionStatement",
						"!doc": "Builds an AST node of type 'ExpressionStatement'.\nSuper types: Statement, Node, Printable"
					},
					"spreadElement": {
						"!type": "fn(argument: Expression) -> SpreadElement",
						"!doc": "Builds an AST node of type 'SpreadElement'.\nSuper types: Node, Printable"
					},
					"program": {
						"!type": "fn(body: [Statement]) -> Program",
						"!doc": "Builds an AST node of type 'Program'.\nSuper types: Node, Printable"
					},
					"jsxElement": {
						"!type": "fn(openingElement: JSXOpeningElement, closingElement: JSXClosingElement|null, children: [JSXElement|JSXExpressionContainer|JSXText|Literal]) -> JSXElement",
						"!doc": "Builds an AST node of type 'JSXElement'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"memberTypeAnnotation": {
						"!type": "fn(object: Identifier, property: MemberTypeAnnotation|GenericTypeAnnotation) -> MemberTypeAnnotation",
						"!doc": "Builds an AST node of type 'MemberTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"importNamespaceSpecifier": {
						"!type": "fn(local: Identifier|null) -> ImportNamespaceSpecifier",
						"!doc": "Builds an AST node of type 'ImportNamespaceSpecifier'.\nSuper types: ModuleSpecifier, Specifier, Node, Printable"
					},
					"numberLiteralTypeAnnotation": {
						"!type": "fn(value: number, raw: string) -> NumberLiteralTypeAnnotation",
						"!doc": "Builds an AST node of type 'NumberLiteralTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"typeofTypeAnnotation": {
						"!type": "fn(argument: Type) -> TypeofTypeAnnotation",
						"!doc": "Builds an AST node of type 'TypeofTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"declareClass": {
						"!type": "fn(id: Identifier) -> DeclareClass",
						"!doc": "Builds an AST node of type 'DeclareClass'.\nSuper types: InterfaceDeclaration, Statement, Node, Printable"
					},
					"declareFunction": {
						"!type": "fn(id: Identifier) -> DeclareFunction",
						"!doc": "Builds an AST node of type 'DeclareFunction'.\nSuper types: Statement, Node, Printable"
					},
					"logicalExpression": {
						"!type": "fn(operator: string, left: Expression, right: Expression) -> LogicalExpression",
						"!doc": "Builds an AST node of type 'LogicalExpression'.\nSuper types: Expression, Pattern, Node, Printable\n\n operator (string) one of: |||&&\n"
					},
					"jsxNamespacedName": {
						"!type": "fn(namespace: JSXIdentifier, name: JSXIdentifier) -> JSXNamespacedName",
						"!doc": "Builds an AST node of type 'JSXNamespacedName'.\nSuper types: Node, Printable"
					},
					"debuggerStatement": {
						"!type": "fn() -> DebuggerStatement",
						"!doc": "Builds an AST node of type 'DebuggerStatement'.\nSuper types: Statement, Node, Printable"
					},
					"methodDefinition": {
						"!type": "fn(kind: string, key: Literal|Identifier|Expression, value: Function, static: boolean) -> MethodDefinition",
						"!doc": "Builds an AST node of type 'MethodDefinition'.\nSuper types: Declaration, Statement, Node, Printable\n\n kind (string) one of: constructor|method|get|set\n"
					},
					"functionTypeAnnotation": {
						"!type": "fn(params: [FunctionTypeParam], returnType: Type, rest: FunctionTypeParam|null, typeParameters: TypeParameterDeclaration|null) -> FunctionTypeAnnotation",
						"!doc": "Builds an AST node of type 'FunctionTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"objectPattern": {
						"!type": "fn(properties: [Property|PropertyPattern|SpreadPropertyPattern|SpreadProperty]) -> ObjectPattern",
						"!doc": "Builds an AST node of type 'ObjectPattern'.\nSuper types: Pattern, Node, Printable"
					},
					"unionTypeAnnotation": {
						"!type": "fn(types: [Type]) -> UnionTypeAnnotation",
						"!doc": "Builds an AST node of type 'UnionTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"ifStatement": {
						"!type": "fn(test: Expression, consequent: Statement, alternate: Statement|null) -> IfStatement",
						"!doc": "Builds an AST node of type 'IfStatement'.\nSuper types: Statement, Node, Printable"
					},
					"forInStatement": {
						"!type": "fn(left: VariableDeclaration|Expression, right: Expression, body: Statement, each: boolean) -> ForInStatement",
						"!doc": "Builds an AST node of type 'ForInStatement'.\nSuper types: Statement, Node, Printable"
					},
					"letStatement": {
						"!type": "fn(head: [VariableDeclarator], body: Statement) -> LetStatement",
						"!doc": "Builds an AST node of type 'LetStatement'.\nSuper types: Statement, Node, Printable"
					},
					"jsxEmptyExpression": {
						"!type": "fn() -> JSXEmptyExpression",
						"!doc": "Builds an AST node of type 'JSXEmptyExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"qualifiedTypeIdentifier": {
						"!type": "fn(qualification: Identifier|QualifiedTypeIdentifier, id: Identifier) -> QualifiedTypeIdentifier",
						"!doc": "Builds an AST node of type 'QualifiedTypeIdentifier'.\nSuper types: Node, Printable"
					},
					"metaProperty": {
						"!type": "fn(meta: Identifier, property: Identifier) -> MetaProperty",
						"!doc": "Builds an AST node of type 'MetaProperty'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"tryStatement": {
						"!type": "fn(block: BlockStatement, handler: CatchClause|null, finalizer: BlockStatement|null) -> TryStatement",
						"!doc": "Builds an AST node of type 'TryStatement'.\nSuper types: Statement, Node, Printable"
					},
					"arrayTypeAnnotation": {
						"!type": "fn(elementType: Type) -> ArrayTypeAnnotation",
						"!doc": "Builds an AST node of type 'ArrayTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"taggedTemplateExpression": {
						"!type": "fn(tag: Expression, quasi: TemplateLiteral) -> TaggedTemplateExpression",
						"!doc": "Builds an AST node of type 'TaggedTemplateExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"spreadPropertyPattern": {
						"!type": "fn(argument: Pattern) -> SpreadPropertyPattern",
						"!doc": "Builds an AST node of type 'SpreadPropertyPattern'.\nSuper types: Pattern, Node, Printable"
					},
					"stringTypeAnnotation": {
						"!type": "fn() -> StringTypeAnnotation",
						"!doc": "Builds an AST node of type 'StringTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"objectTypeProperty": {
						"!type": "fn(key: Literal|Identifier, value: Type, optional: boolean) -> ObjectTypeProperty",
						"!doc": "Builds an AST node of type 'ObjectTypeProperty'.\nSuper types: Node, Printable"
					},
					"labeledStatement": {
						"!type": "fn(label: Identifier, body: Statement) -> LabeledStatement",
						"!doc": "Builds an AST node of type 'LabeledStatement'.\nSuper types: Statement, Node, Printable"
					},
					"typeAlias": {
						"!type": "fn(id: Identifier, typeParameters: TypeParameterDeclaration|null, right: Type) -> TypeAlias",
						"!doc": "Builds an AST node of type 'TypeAlias'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"exportSpecifier": {
						"!type": "fn(local: Identifier|null, exported: Identifier) -> ExportSpecifier",
						"!doc": "Builds an AST node of type 'ExportSpecifier'.\nSuper types: ModuleSpecifier, Specifier, Node, Printable"
					},
					"whileStatement": {
						"!type": "fn(test: Expression, body: Statement) -> WhileStatement",
						"!doc": "Builds an AST node of type 'WhileStatement'.\nSuper types: Statement, Node, Printable"
					},
					"functionDeclaration": {
						"!type": "fn(id: Identifier, params: [Pattern], body: BlockStatement|Expression, generator: boolean, expression: boolean) -> FunctionDeclaration",
						"!doc": "Builds an AST node of type 'FunctionDeclaration'.\nSuper types: Function, Declaration, Statement, Node, Printable"
					},
					"stringLiteralTypeAnnotation": {
						"!type": "fn(value: string, raw: string) -> StringLiteralTypeAnnotation",
						"!doc": "Builds an AST node of type 'StringLiteralTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"callExpression": {
						"!type": "fn(callee: Expression, arguments: [Expression|SpreadElement]) -> CallExpression",
						"!doc": "Builds an AST node of type 'CallExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"assignmentPattern": {
						"!type": "fn(left: Pattern, right: Expression) -> AssignmentPattern",
						"!doc": "Builds an AST node of type 'AssignmentPattern'.\nSuper types: Pattern, Node, Printable"
					},
					"declareVariable": {
						"!type": "fn(id: Identifier) -> DeclareVariable",
						"!doc": "Builds an AST node of type 'DeclareVariable'.\nSuper types: Statement, Node, Printable"
					},
					"assignmentExpression": {
						"!type": "fn(operator: string, left: Pattern, right: Expression) -> AssignmentExpression",
						"!doc": "Builds an AST node of type 'AssignmentExpression'.\nSuper types: Expression, Pattern, Node, Printable\n\n operator (string) one of: =|+=|-=|*=|/=|%=|<<=|>>=|>>>=||=|^=|&=\n"
					},
					"arrayPattern": {
						"!type": "fn(elements: [Pattern|SpreadElement|null]) -> ArrayPattern",
						"!doc": "Builds an AST node of type 'ArrayPattern'.\nSuper types: Pattern, Node, Printable"
					},
					"generatorExpression": {
						"!type": "fn(body: Expression, blocks: [ComprehensionBlock], filter: Expression|null) -> GeneratorExpression",
						"!doc": "Builds an AST node of type 'GeneratorExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"forStatement": {
						"!type": "fn(init: VariableDeclaration|Expression|null, test: Expression|null, update: Expression|null, body: Statement) -> ForStatement",
						"!doc": "Builds an AST node of type 'ForStatement'.\nSuper types: Statement, Node, Printable"
					},
					"graphExpression": {
						"!type": "fn(index: number, expression: Literal) -> GraphExpression",
						"!doc": "Builds an AST node of type 'GraphExpression'.\nSuper types: Expression, Pattern, Node, Printable\n\n ${name} (number) must be >= 0"
					},
					"commentLine": {
						"!type": "fn(value: string, leading: boolean, trailing: boolean) -> CommentLine",
						"!doc": "Builds an AST node of type 'CommentLine'.\nSuper types: Comment, Printable"
					},
					"functionExpression": {
						"!type": "fn(id: Identifier|null, params: [Pattern], body: BlockStatement|Expression, generator: boolean, expression: boolean) -> FunctionExpression",
						"!doc": "Builds an AST node of type 'FunctionExpression'.\nSuper types: Function, Expression, Pattern, Node, Printable"
					},
					"thisExpression": {
						"!type": "fn() -> ThisExpression",
						"!doc": "Builds an AST node of type 'ThisExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"jsxOpeningElement": {
						"!type": "fn(name: JSXIdentifier|JSXNamespacedName|JSXMemberExpression, attributes: [JSXAttribute|JSXSpreadAttribute], selfClosing: boolean) -> JSXOpeningElement",
						"!doc": "Builds an AST node of type 'JSXOpeningElement'.\nSuper types: Node, Printable"
					},
					"exportNamedDeclaration": {
						"!type": "fn(declaration: Declaration|null, specifiers: [ExportSpecifier], source: Literal|null) -> ExportNamedDeclaration",
						"!doc": "Builds an AST node of type 'ExportNamedDeclaration'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"mixedTypeAnnotation": {
						"!type": "fn() -> MixedTypeAnnotation",
						"!doc": "Builds an AST node of type 'MixedTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"objectTypeCallProperty": {
						"!type": "fn(value: FunctionTypeAnnotation) -> ObjectTypeCallProperty",
						"!doc": "Builds an AST node of type 'ObjectTypeCallProperty'.\nSuper types: Node, Printable"
					},
					"classBody": {
						"!type": "fn(body: [MethodDefinition|VariableDeclarator|ClassPropertyDefinition|ClassProperty]) -> ClassBody",
						"!doc": "Builds an AST node of type 'ClassBody'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"position": {
						"!type": "fn(line: number, column: number) -> Position",
						"!doc": "Builds an AST node of type 'Position'.\n\n ${name} (number) must be >= 1${name} (number) must be >= 0"
					},
					"importSpecifier": {
						"!type": "fn(imported: Identifier, local: Identifier|null) -> ImportSpecifier",
						"!doc": "Builds an AST node of type 'ImportSpecifier'.\nSuper types: ModuleSpecifier, Specifier, Node, Printable"
					},
					"jsxExpressionContainer": {
						"!type": "fn(expression: Expression) -> JSXExpressionContainer",
						"!doc": "Builds an AST node of type 'JSXExpressionContainer'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"booleanTypeAnnotation": {
						"!type": "fn() -> BooleanTypeAnnotation",
						"!doc": "Builds an AST node of type 'BooleanTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"classProperty": {
						"!type": "fn(key: Literal|Identifier|Expression, value: Expression|null, typeAnnotation: TypeAnnotation|null, static: boolean) -> ClassProperty",
						"!doc": "Builds an AST node of type 'ClassProperty'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"withStatement": {
						"!type": "fn(object: Expression, body: Statement) -> WithStatement",
						"!doc": "Builds an AST node of type 'WithStatement'.\nSuper types: Statement, Node, Printable"
					},
					"typeAnnotation": {
						"!type": "fn(typeAnnotation: Type) -> TypeAnnotation",
						"!doc": "Builds an AST node of type 'TypeAnnotation'.\nSuper types: Node, Printable"
					},
					"variableDeclarator": {
						"!type": "fn(id: Pattern, init: Expression|null) -> VariableDeclarator",
						"!doc": "Builds an AST node of type 'VariableDeclarator'.\nSuper types: Node, Printable"
					},
					"exportDeclaration": {
						"!type": "fn(default: boolean, declaration: Declaration|Expression|null, specifiers: [ExportSpecifier|ExportBatchSpecifier], source: Literal|null) -> ExportDeclaration",
						"!doc": "Builds an AST node of type 'ExportDeclaration'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"jsxAttribute": {
						"!type": "fn(name: JSXIdentifier|JSXNamespacedName, value: Literal|JSXExpressionContainer|null) -> JSXAttribute",
						"!doc": "Builds an AST node of type 'JSXAttribute'.\nSuper types: Node, Printable"
					},
					"spreadElementPattern": {
						"!type": "fn(argument: Pattern) -> SpreadElementPattern",
						"!doc": "Builds an AST node of type 'SpreadElementPattern'.\nSuper types: Pattern, Node, Printable"
					},
					"jsxIdentifier": {
						"!type": "fn(name: string) -> JSXIdentifier",
						"!doc": "Builds an AST node of type 'JSXIdentifier'.\nSuper types: Identifier, Expression, Pattern, Node, Printable"
					},
					"objectTypeIndexer": {
						"!type": "fn(id: Identifier, key: Type, value: Type) -> ObjectTypeIndexer",
						"!doc": "Builds an AST node of type 'ObjectTypeIndexer'.\nSuper types: Node, Printable"
					},
					"block": {
						"!type": "fn(value: string, leading: boolean, trailing: boolean) -> Block",
						"!doc": "Builds an AST node of type 'Block'.\nSuper types: Comment, Printable"
					},
					"declareModule": {
						"!type": "fn(id: Identifier|Literal, body: BlockStatement) -> DeclareModule",
						"!doc": "Builds an AST node of type 'DeclareModule'.\nSuper types: Statement, Node, Printable"
					},
					"exportDefaultDeclaration": {
						"!type": "fn(declaration: Declaration|Expression) -> ExportDefaultDeclaration",
						"!doc": "Builds an AST node of type 'ExportDefaultDeclaration'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"emptyStatement": {
						"!type": "fn() -> EmptyStatement",
						"!doc": "Builds an AST node of type 'EmptyStatement'.\nSuper types: Statement, Node, Printable"
					},
					"sequenceExpression": {
						"!type": "fn(expressions: [Expression]) -> SequenceExpression",
						"!doc": "Builds an AST node of type 'SequenceExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"spreadProperty": {
						"!type": "fn(argument: Expression) -> SpreadProperty",
						"!doc": "Builds an AST node of type 'SpreadProperty'.\nSuper types: Node, Printable"
					},
					"awaitExpression": {
						"!type": "fn(argument: Expression|null, all: boolean) -> AwaitExpression",
						"!doc": "Builds an AST node of type 'AwaitExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"classDeclaration": {
						"!type": "fn(id: Identifier|null, body: ClassBody, superClass: Expression|null) -> ClassDeclaration",
						"!doc": "Builds an AST node of type 'ClassDeclaration'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"literal": {
						"!type": "fn(value: string|boolean|null|number|RegExp) -> Literal",
						"!doc": "Builds an AST node of type 'Literal'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"letExpression": {
						"!type": "fn(head: [VariableDeclarator], body: Expression) -> LetExpression",
						"!doc": "Builds an AST node of type 'LetExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"exportAllDeclaration": {
						"!type": "fn(exported: Identifier|null, source: Literal) -> ExportAllDeclaration",
						"!doc": "Builds an AST node of type 'ExportAllDeclaration'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"forOfStatement": {
						"!type": "fn(left: VariableDeclaration|Expression, right: Expression, body: Statement) -> ForOfStatement",
						"!doc": "Builds an AST node of type 'ForOfStatement'.\nSuper types: Statement, Node, Printable"
					},
					"doWhileStatement": {
						"!type": "fn(body: Statement, test: Expression) -> DoWhileStatement",
						"!doc": "Builds an AST node of type 'DoWhileStatement'.\nSuper types: Statement, Node, Printable"
					},
					"booleanLiteralTypeAnnotation": {
						"!type": "fn(value: boolean, raw: string) -> BooleanLiteralTypeAnnotation",
						"!doc": "Builds an AST node of type 'BooleanLiteralTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"genericTypeAnnotation": {
						"!type": "fn(id: Identifier|QualifiedTypeIdentifier, typeParameters: TypeParameterInstantiation|null) -> GenericTypeAnnotation",
						"!doc": "Builds an AST node of type 'GenericTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"declareExportDeclaration": {
						"!type": "fn(default: boolean, declaration: DeclareVariable|DeclareFunction|DeclareClass|Type|null, specifiers: [ExportSpecifier|ExportBatchSpecifier], source: Literal|null) -> DeclareExportDeclaration",
						"!doc": "Builds an AST node of type 'DeclareExportDeclaration'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"classExpression": {
						"!type": "fn(id: Identifier|null, body: ClassBody, superClass: Expression|null) -> ClassExpression",
						"!doc": "Builds an AST node of type 'ClassExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"templateElement": {
						"!type": "fn(value: TemplateElementValue, tail: boolean) -> TemplateElement",
						"!doc": "Builds an AST node of type 'TemplateElement'.\nSuper types: Node, Printable\n\n value (object) has form {cooked: string, raw: string}"
					},
					"intersectionTypeAnnotation": {
						"!type": "fn(types: [Type]) -> IntersectionTypeAnnotation",
						"!doc": "Builds an AST node of type 'IntersectionTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"noop": {
						"!type": "fn() -> Noop",
						"!doc": "Builds an AST node of type 'Noop'.\nSuper types: Node, Printable"
					},
					"jsxSpreadAttribute": {
						"!type": "fn(argument: Expression) -> JSXSpreadAttribute",
						"!doc": "Builds an AST node of type 'JSXSpreadAttribute'.\nSuper types: Node, Printable"
					},
					"line": {
						"!type": "fn(value: string, leading: boolean, trailing: boolean) -> Line",
						"!doc": "Builds an AST node of type 'Line'.\nSuper types: Comment, Printable"
					},
					"jsxText": {
						"!type": "fn(value: string) -> JSXText",
						"!doc": "Builds an AST node of type 'JSXText'.\nSuper types: Literal, Expression, Pattern, Node, Printable"
					},
					"voidTypeAnnotation": {
						"!type": "fn() -> VoidTypeAnnotation",
						"!doc": "Builds an AST node of type 'VoidTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"comprehensionExpression": {
						"!type": "fn(body: Expression, blocks: [ComprehensionBlock], filter: Expression|null) -> ComprehensionExpression",
						"!doc": "Builds an AST node of type 'ComprehensionExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"jsxClosingElement": {
						"!type": "fn(name: JSXIdentifier|JSXNamespacedName|JSXMemberExpression) -> JSXClosingElement",
						"!doc": "Builds an AST node of type 'JSXClosingElement'.\nSuper types: Node, Printable"
					},
					"typeParameterDeclaration": {
						"!type": "fn(params: [Identifier]) -> TypeParameterDeclaration",
						"!doc": "Builds an AST node of type 'TypeParameterDeclaration'.\nSuper types: Node, Printable"
					},
					"super": {
						"!type": "fn() -> Super",
						"!doc": "Builds an AST node of type 'Super'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"numberTypeAnnotation": {
						"!type": "fn() -> NumberTypeAnnotation",
						"!doc": "Builds an AST node of type 'NumberTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"throwStatement": {
						"!type": "fn(argument: Expression) -> ThrowStatement",
						"!doc": "Builds an AST node of type 'ThrowStatement'.\nSuper types: Statement, Node, Printable"
					},
					"catchClause": {
						"!type": "fn(param: Pattern, guard: Expression|null, body: BlockStatement) -> CatchClause",
						"!doc": "Builds an AST node of type 'CatchClause'.\nSuper types: Node, Printable"
					},
					"variableDeclaration": {
						"!type": "fn(kind: string, declarations: [VariableDeclarator|Identifier]) -> VariableDeclaration",
						"!doc": "Builds an AST node of type 'VariableDeclaration'.\nSuper types: Declaration, Statement, Node, Printable\n\n kind (string) one of: var|let|const\n"
					},
					"exportDefaultSpecifier": {
						"!type": "fn(exported: Identifier) -> ExportDefaultSpecifier",
						"!doc": "Builds an AST node of type 'ExportDefaultSpecifier'.\nSuper types: Specifier, Node, Printable"
					},
					"newExpression": {
						"!type": "fn(callee: Expression, arguments: [Expression|SpreadElement]) -> NewExpression",
						"!doc": "Builds an AST node of type 'NewExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"graphIndexExpression": {
						"!type": "fn(index: number) -> GraphIndexExpression",
						"!doc": "Builds an AST node of type 'GraphIndexExpression'.\nSuper types: Expression, Pattern, Node, Printable\n\n ${name} (number) must be >= 0"
					},
					"updateExpression": {
						"!type": "fn(operator: string, argument: Expression, prefix: boolean) -> UpdateExpression",
						"!doc": "Builds an AST node of type 'UpdateExpression'.\nSuper types: Expression, Pattern, Node, Printable\n\n operator (string) one of: ++|--\n"
					},
					"commentBlock": {
						"!type": "fn(value: string, leading: boolean, trailing: boolean) -> CommentBlock",
						"!doc": "Builds an AST node of type 'CommentBlock'.\nSuper types: Comment, Printable"
					},
					"typeCastExpression": {
						"!type": "fn(expression: Expression, typeAnnotation: TypeAnnotation) -> TypeCastExpression",
						"!doc": "Builds an AST node of type 'TypeCastExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"property": {
						"!type": "fn(kind: string, key: Literal|Identifier|Expression, value: Expression|Pattern) -> Property",
						"!doc": "Builds an AST node of type 'Property'.\nSuper types: Node, Printable\n\n kind (string) one of: init|get|set\n"
					},
					"interfaceDeclaration": {
						"!type": "fn(id: Identifier, body: ObjectTypeAnnotation, extends: [InterfaceExtends]) -> InterfaceDeclaration",
						"!doc": "Builds an AST node of type 'InterfaceDeclaration'.\nSuper types: Statement, Node, Printable"
					},
					"functionTypeParam": {
						"!type": "fn(name: Identifier, typeAnnotation: Type, optional: boolean) -> FunctionTypeParam",
						"!doc": "Builds an AST node of type 'FunctionTypeParam'.\nSuper types: Node, Printable"
					},
					"returnStatement": {
						"!type": "fn(argument: Expression|null) -> ReturnStatement",
						"!doc": "Builds an AST node of type 'ReturnStatement'.\nSuper types: Statement, Node, Printable"
					},
					"exportBatchSpecifier": {
						"!type": "fn() -> ExportBatchSpecifier",
						"!doc": "Builds an AST node of type 'ExportBatchSpecifier'.\nSuper types: Specifier, Node, Printable"
					},
					"decorator": {
						"!type": "fn(expression: Expression) -> Decorator",
						"!doc": "Builds an AST node of type 'Decorator'.\nSuper types: Node, Printable"
					},
					"sourceLocation": {
						"!type": "fn(start: Position, end: Position, source: string|null) -> SourceLocation",
						"!doc": "Builds an AST node of type 'SourceLocation'."
					},
					"file": {
						"!type": "fn(program: Program) -> File",
						"!doc": "Builds an AST node of type 'File'.\nSuper types: Node, Printable"
					},
					"binaryExpression": {
						"!type": "fn(operator: string, left: Expression, right: Expression) -> BinaryExpression",
						"!doc": "Builds an AST node of type 'BinaryExpression'.\nSuper types: Expression, Pattern, Node, Printable\n\n operator (string) one of: ==|!=|===|!==|<|<=|>|>=|<<|>>|>>>|+|-|*|/|%|&|||^|in|instanceof|..\n"
					},
					"propertyPattern": {
						"!type": "fn(key: Literal|Identifier|Expression, pattern: Pattern) -> PropertyPattern",
						"!doc": "Builds an AST node of type 'PropertyPattern'.\nSuper types: Pattern, Node, Printable"
					},
					"importDeclaration": {
						"!type": "fn(specifiers: [ImportSpecifier|ImportNamespaceSpecifier|ImportDefaultSpecifier], source: Literal) -> ImportDeclaration",
						"!doc": "Builds an AST node of type 'ImportDeclaration'.\nSuper types: Declaration, Statement, Node, Printable"
					},
					"doExpression": {
						"!type": "fn(body: [Statement]) -> DoExpression",
						"!doc": "Builds an AST node of type 'DoExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"restElement": {
						"!type": "fn(argument: Pattern) -> RestElement",
						"!doc": "Builds an AST node of type 'RestElement'.\nSuper types: Pattern, Node, Printable"
					},
					"anyTypeAnnotation": {
						"!type": "fn() -> AnyTypeAnnotation",
						"!doc": "Builds an AST node of type 'AnyTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"templateLiteral": {
						"!type": "fn(quasis: [TemplateElement], expressions: [Expression]) -> TemplateLiteral",
						"!doc": "Builds an AST node of type 'TemplateLiteral'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"nullableTypeAnnotation": {
						"!type": "fn(typeAnnotation: Type) -> NullableTypeAnnotation",
						"!doc": "Builds an AST node of type 'NullableTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"continueStatement": {
						"!type": "fn(label: Identifier|null) -> ContinueStatement",
						"!doc": "Builds an AST node of type 'ContinueStatement'.\nSuper types: Statement, Node, Printable"
					},
					"arrayExpression": {
						"!type": "fn(elements: [Expression|SpreadElement|RestElement|null]) -> ArrayExpression",
						"!doc": "Builds an AST node of type 'ArrayExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"classImplements": {
						"!type": "fn(id: Identifier) -> ClassImplements",
						"!doc": "Builds an AST node of type 'ClassImplements'.\nSuper types: Node, Printable"
					},
					"objectTypeAnnotation": {
						"!type": "fn(properties: [ObjectTypeProperty]) -> ObjectTypeAnnotation",
						"!doc": "Builds an AST node of type 'ObjectTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"memberExpression": {
						"!type": "fn(object: Expression, property: Identifier|Expression, computed: boolean) -> MemberExpression",
						"!doc": "Builds an AST node of type 'MemberExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"comprehensionBlock": {
						"!type": "fn(left: Pattern, right: Expression, each: boolean) -> ComprehensionBlock",
						"!doc": "Builds an AST node of type 'ComprehensionBlock'.\nSuper types: Node, Printable"
					},
					"breakStatement": {
						"!type": "fn(label: Identifier|null) -> BreakStatement",
						"!doc": "Builds an AST node of type 'BreakStatement'.\nSuper types: Statement, Node, Printable"
					},
					"arrowFunctionExpression": {
						"!type": "fn(params: [Pattern], body: BlockStatement|Expression, expression: boolean) -> ArrowFunctionExpression",
						"!doc": "Builds an AST node of type 'ArrowFunctionExpression'.\nSuper types: Function, Expression, Pattern, Node, Printable"
					},
					"switchCase": {
						"!type": "fn(test: Expression|null, consequent: [Statement]) -> SwitchCase",
						"!doc": "Builds an AST node of type 'SwitchCase'.\nSuper types: Node, Printable"
					},
					"blockStatement": {
						"!type": "fn(body: [Statement]) -> BlockStatement",
						"!doc": "Builds an AST node of type 'BlockStatement'.\nSuper types: Statement, Node, Printable"
					},
					"unaryExpression": {
						"!type": "fn(operator: string, argument: Expression, prefix: boolean) -> UnaryExpression",
						"!doc": "Builds an AST node of type 'UnaryExpression'.\nSuper types: Expression, Pattern, Node, Printable\n\n operator (string) one of: -|+|!|~|typeof|void|delete\n"
					},
					"objectExpression": {
						"!type": "fn(properties: [Property|SpreadProperty]) -> ObjectExpression",
						"!doc": "Builds an AST node of type 'ObjectExpression'.\nSuper types: Expression, Pattern, Node, Printable"
					},
					"tupleTypeAnnotation": {
						"!type": "fn(types: [Type]) -> TupleTypeAnnotation",
						"!doc": "Builds an AST node of type 'TupleTypeAnnotation'.\nSuper types: Type, Node, Printable"
					},
					"interfaceExtends": {
						"!type": "fn(id: Identifier) -> InterfaceExtends",
						"!doc": "Builds an AST node of type 'InterfaceExtends'.\nSuper types: Node, Printable"
					},
					"importDefaultSpecifier": {
						"!type": "fn(local: Identifier|null) -> ImportDefaultSpecifier",
						"!doc": "Builds an AST node of type 'ImportDefaultSpecifier'.\nSuper types: ModuleSpecifier, Specifier, Node, Printable"
					}
				}
			},
			"Collection": {
				"!type:": "fn(source: [+NodePath], parent: +Collection)",
				"prototype": {
					"filter": {
						"!type": "fn(callback: fn(path: +NodePath) -> bool) -> +Collection",
						"!doc": "Returns a new collection containing the nodes for which the callback returns true.",
						"!effects": [
							"call !0 this=+NodePath +NodePath"
						]
					},
					"forEach": {
						"!type": "fn(callback: fn(path: +NodePath)) -> !this",
						"!doc": "Executes callback for each NodePath in the collection.",
						"!effects": [
							"call !0 this=+NodePath +NodePath"
						]
					},
					"map": {
						"!type": "fn(callback: fn(path: +NodePath) -> +NodePath|[+NodePath]) -> +Collection",
						"!doc": "Executes the callback for every path in the collection and returns a\nnew collection from the return values (which must be paths).\n\nThe callback can return null to remove the element from the new collection.\n\nIf an array is returned, it will be flattened into the result colletion.\n",
						"!effects": [
							"call !0 this=+NodePath +NodePath"
						]
					},
					"size": {
						"!type": "fn() -> number",
						"!doc": "Returns the number of elements in this collection."
					},
					"nodes": {
						"!type": "fn() -> [ASTNode]",
						"!doc": "Returns an array of AST nodes in this collection."
					},
					"paths": {
						"!type": "fn() -> [NodePath]",
						"!doc": "Returns an array of NodePaths in this this collection."
					},
					"toSource": {
						"!type": "fn(options?: object) -> string",
						"!doc": "Converts the AST back to a string, using recast. The options are directly passed to recast's printer."
					},
					"at": {
						"!type": "fn(index: number) -> +Collection",
						"!doc": "Returns a new collection containing only the element at the position\n`index`. In case of a negative index, the element is taken from the end.\n"
					},
					"get": {
						"!type": "fn(name: string|number) -> +NodePath",
						"!doc": "Calls \"get\" on the first path (same as \"collection.paths(0).get(...)\")."
					},
					"find": {
						"!type": "fn(type: TypeDefinition, filter?: object) -> +Collection",
						"!doc": "Finds descendants of a specific type within the Nodes of this collection."
					},
					"closestScope": {
						"!type": "fn() -> +Collection",
						"!doc": "Returns a collection containing the Paths that create the scope which contains the selected Nodes."
					},
					"closest": {
						"!type": "fn(type: TypeDefinition, filter?: object) -> +Collection",
						"!doc": "For each node in the collection, traverses the AST up and finds the closest node that matches the type and filter."
					},
					"replaceWith": {
						"!type": "fn(nodes: ASTNode|fn(path: +NodePath, index: number) -> ASTNode|[ASTNode]) -> !this",
						"!doc": "Replaces the selected nodes with the provided node(s). If a function is\nprovided, it is executed for every node and the node is replaced with\nthe return value of the function.\n",
						"!effects": [
							"call !0 this=+NodePath +NodePath number"
						]
					},
					"insertBefore": {
						"!type": "fn(nodes: ASTNode|[ASTNode]|fn(path: +NodePath, index: number) -> ASTNode|[ASTNode]) -> !this",
						"!doc": "Inserts the new node(s) before each of the selected nodes. If a function\nis provided, it is executed for every node and return value is inserted\nbefore that node.\n",
						"!effects": [
							"call !0 this=+NodePath +NodePath"
						]
					},
					"insertAfter": {
						"!type": "fn(nodes: ASTNode|[ASTNode]|fn(path: +NodePath, index: number) -> ASTNode|[ASTNode]) -> !this",
						"!doc": "Inserts the new node(s) after each of the selected nodes. If a function\nis provided, it is executed for every node and return value is inserted\nafter that node.\n",
						"!effects": [
							"call !0 this=+NodePath +NodePath"
						]
					},
					"remove": {
						"!type": "fn() -> !this",
						"!doc": "Calls \"prune\" on every selected NodePath."
					}
				}
			},
			"NodePath": {
				"!type": "fn(value: ASTNode|[ASTNode], parentPath: +NodePath, name: string)",
				"!effects": [
					"propagate !0 !this.value"
				],
				"prototype": {
					"parentPath": "+NodePath",
					"name": "string",
					"node": {
						"!type": "ASTNode",
						"!doc": "The value of the first ancestor NodePath whose value is a Node."
					},
					"parent": {
						"!type": "+NodePath",
						"!doc": "The first ancestor Path whose value is a Node distinct from this.node."
					},
					"scope": {
						"!type": "+Scope",
						"!doc": "The closest enclosing scope that governs this node."
					},
					"replace": {
						"!type": "fn(newNode?: ASTNode|[ASTNode])",
						"!doc": "Replaces the Node(s) represented by this Path, or removes it if no argument is passed."
					},
					"prune": {
						"!type": "fn()",
						"!doc": "Removes this Node and any ancestor that would become \"empty\"."
					},
					"getValueProperty": {
						"!type": "fn(name: string) -> ?",
						"!doc": "Returns the value of of that property. This is different from 'path.node.value' because\nit will return the default value for that field as defined in the Node definition.\n"
					},
					"each": {
						"!type": "fn(callback: fn(childPath: +NodePath), context?: ?)",
						"!doc": "If the Path represents an array of nodes, applies the provided function to each\nNode in the array.\n",
						"!effects": [
							"call !0 this=!1 !this.value.<i> !this"
						]
					},
					"map": {
						"!type": "fn(callback: fn(childPath: +NodePath) -> ?, context?: ?) -> [?]",
						"!doc": "If the Path represents an array of nodes, applies the provided function to each\nNode in the array and returns an array of the results.\n",
						"!effects": [
							"call !0 this=!1 !this.value.<i> !this"
						]
					},
					"filter": {
						"!type": "fn(callback: fn(childPath: +NodePath) -> bool, context?: ?) -> [+NodePath]",
						"!doc": "If the Path represents an array of nodes, applies the provided function to each\nNode in the array and returns an array of Paths for which the callback returned true.\n",
						"!effects": [
							"call !0 this=!1 !this.value.<i> !this"
						]
					},
					"shift": {
						"!type": "fn() -> +NodePath",
						"!doc": "If the Path represents an array of nodes, removes the first Node in that array and returns it.\n"
					},
					"unshift": {
						"!type": "fn(newNode: ASTNode)"
					},
					"push": {
						"!type": "fn(newNode: ASTNode)"
					},
					"pop": {
						"!type": "fn() -> NodePath"
					},
					"insertAt": {
						"!type": "fn(index: number, node: ASTNode)"
					},
					"inserBefore": {
						"!type": "fn(node: ASTNode)"
					},
					"inserAfter": {
						"!type": "fn(node: ASTNode)"
					}
				}
			},
			"ASTNode": {
				"type": {
					"!type": "string",
					"!doc": "The type of this AST node."
				}
			},
			"Scope": {
				"!type": "fn(path: +NodePath, parentScope: +Scope)",
				"isEstablishedBy": "fn(node: ASTNode) -> bool",
				"prototype": {
					"declares": "fn(name: string) -> bool",
					"declaresType": "fn(name: string) -> bool",
					"declareTemporary": "fn(prefix: string) -> Identifier",
					"injectTemporary": "fn(prefix: string, init?: ASTNode) -> Identifier",
					"getBindings": "fn() -> [ASTNode]",
					"getTypes": "fn() -> [ASTNode]",
					"lookup": "fn(name: string) -> +Scope",
					"lookupType": "fn(name: string) -> +Scope"
				},
				"getGlobalScope": "fn() -> +Scope"
			},
			"ModuleSpecifier": {
				"!proto": "ASTNode"
			},
			"ConditionalExpression": {
				"!proto": "ASTNode"
			},
			"Node": {
				"!proto": "ASTNode"
			},
			"MixedTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"XMLAttributeSelector": {
				"!proto": "ASTNode"
			},
			"JSXNamespacedName": {
				"!proto": "ASTNode"
			},
			"GenericTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"XMLFunctionQualifiedIdentifier": {
				"!proto": "ASTNode"
			},
			"ClassPropertyDefinition": {
				"!proto": "ASTNode"
			},
			"NullableTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"ForInStatement": {
				"!proto": "ASTNode"
			},
			"YieldExpression": {
				"!proto": "ASTNode"
			},
			"ClassProperty": {
				"!proto": "ASTNode"
			},
			"XMLDefaultDeclaration": {
				"!proto": "ASTNode"
			},
			"TemplateElement": {
				"!proto": "ASTNode"
			},
			"ExportDefaultDeclaration": {
				"!proto": "ASTNode"
			},
			"TupleTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"GraphExpression": {
				"!proto": "ASTNode"
			},
			"MemberExpression": {
				"!proto": "ASTNode"
			},
			"ImportDeclaration": {
				"!proto": "ASTNode"
			},
			"File": {
				"!proto": "ASTNode"
			},
			"JSXSpreadAttribute": {
				"!proto": "ASTNode"
			},
			"XMLName": {
				"!proto": "ASTNode"
			},
			"ClassExpression": {
				"!proto": "ASTNode"
			},
			"TemplateLiteral": {
				"!proto": "ASTNode"
			},
			"ClassImplements": {
				"!proto": "ASTNode"
			},
			"TypeAlias": {
				"!proto": "ASTNode"
			},
			"StringLiteralTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"TaggedTemplateExpression": {
				"!proto": "ASTNode"
			},
			"Identifier": {
				"!proto": "ASTNode"
			},
			"JSXElement": {
				"!proto": "ASTNode"
			},
			"BooleanLiteralTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"MethodDefinition": {
				"!proto": "ASTNode"
			},
			"Line": {
				"!proto": "ASTNode"
			},
			"GeneratorExpression": {
				"!proto": "ASTNode"
			},
			"LetStatement": {
				"!proto": "ASTNode"
			},
			"Literal": {
				"!proto": "ASTNode"
			},
			"BooleanTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"JSXAttribute": {
				"!proto": "ASTNode"
			},
			"ExportNamespaceSpecifier": {
				"!proto": "ASTNode"
			},
			"ArrayTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"BlockStatement": {
				"!proto": "ASTNode"
			},
			"WithStatement": {
				"!proto": "ASTNode"
			},
			"XMLProcessingInstruction": {
				"!proto": "ASTNode"
			},
			"SpreadPropertyPattern": {
				"!proto": "ASTNode"
			},
			"WhileStatement": {
				"!proto": "ASTNode"
			},
			"ThrowStatement": {
				"!proto": "ASTNode"
			},
			"InterfaceDeclaration": {
				"!proto": "ASTNode"
			},
			"TypeofTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"LetExpression": {
				"!proto": "ASTNode"
			},
			"ExportSpecifier": {
				"!proto": "ASTNode"
			},
			"ContinueStatement": {
				"!proto": "ASTNode"
			},
			"Printable": {
				"!proto": "ASTNode"
			},
			"ThisExpression": {
				"!proto": "ASTNode"
			},
			"IntersectionTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"JSXClosingElement": {
				"!proto": "ASTNode"
			},
			"DeclareFunction": {
				"!proto": "ASTNode"
			},
			"VariableDeclaration": {
				"!proto": "ASTNode"
			},
			"BreakStatement": {
				"!proto": "ASTNode"
			},
			"ImportSpecifier": {
				"!proto": "ASTNode"
			},
			"ParenthesizedExpression": {
				"!proto": "ASTNode"
			},
			"RestElement": {
				"!proto": "ASTNode"
			},
			"Specifier": {
				"!proto": "ASTNode"
			},
			"ArrayExpression": {
				"!proto": "ASTNode"
			},
			"XMLAnyName": {
				"!proto": "ASTNode"
			},
			"ExportDeclaration": {
				"!proto": "ASTNode"
			},
			"ObjectTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"ExportAllDeclaration": {
				"!proto": "ASTNode"
			},
			"SourceLocation": {
				"!proto": "ASTNode"
			},
			"TypeAnnotation": {
				"!proto": "ASTNode"
			},
			"Statement": {
				"!proto": "ASTNode"
			},
			"Position": {
				"!proto": "ASTNode"
			},
			"ObjectExpression": {
				"!proto": "ASTNode"
			},
			"Program": {
				"!proto": "ASTNode"
			},
			"Comment": {
				"!proto": "ASTNode"
			},
			"AssignmentPattern": {
				"!proto": "ASTNode"
			},
			"ObjectTypeIndexer": {
				"!proto": "ASTNode"
			},
			"ArrowFunctionExpression": {
				"!proto": "ASTNode"
			},
			"XMLAttribute": {
				"!proto": "ASTNode"
			},
			"Noop": {
				"!proto": "ASTNode"
			},
			"DeclareClass": {
				"!proto": "ASTNode"
			},
			"XMLEndTag": {
				"!proto": "ASTNode"
			},
			"JSXIdentifier": {
				"!proto": "ASTNode"
			},
			"VoidTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"ComprehensionBlock": {
				"!proto": "ASTNode"
			},
			"FunctionTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"ComprehensionExpression": {
				"!proto": "ASTNode"
			},
			"MetaProperty": {
				"!proto": "ASTNode"
			},
			"XMLQualifiedIdentifier": {
				"!proto": "ASTNode"
			},
			"DoWhileStatement": {
				"!proto": "ASTNode"
			},
			"EmptyStatement": {
				"!proto": "ASTNode"
			},
			"VariableDeclarator": {
				"!proto": "ASTNode"
			},
			"ObjectPattern": {
				"!proto": "ASTNode"
			},
			"AssignmentExpression": {
				"!proto": "ASTNode"
			},
			"Declaration": {
				"!proto": "ASTNode"
			},
			"DoExpression": {
				"!proto": "ASTNode"
			},
			"GraphIndexExpression": {
				"!proto": "ASTNode"
			},
			"DeclareVariable": {
				"!proto": "ASTNode"
			},
			"ObjectTypeProperty": {
				"!proto": "ASTNode"
			},
			"IfStatement": {
				"!proto": "ASTNode"
			},
			"BindExpression": {
				"!proto": "ASTNode"
			},
			"LogicalExpression": {
				"!proto": "ASTNode"
			},
			"CommentLine": {
				"!proto": "ASTNode"
			},
			"ObjectTypeCallProperty": {
				"!proto": "ASTNode"
			},
			"FunctionDeclaration": {
				"!proto": "ASTNode"
			},
			"NewExpression": {
				"!proto": "ASTNode"
			},
			"TypeCastExpression": {
				"!proto": "ASTNode"
			},
			"XMLStartTag": {
				"!proto": "ASTNode"
			},
			"XMLPointTag": {
				"!proto": "ASTNode"
			},
			"Pattern": {
				"!proto": "ASTNode"
			},
			"ImportDefaultSpecifier": {
				"!proto": "ASTNode"
			},
			"XMLFilterExpression": {
				"!proto": "ASTNode"
			},
			"XMLEscape": {
				"!proto": "ASTNode"
			},
			"JSXEmptyExpression": {
				"!proto": "ASTNode"
			},
			"SequenceExpression": {
				"!proto": "ASTNode"
			},
			"InterfaceExtends": {
				"!proto": "ASTNode"
			},
			"PropertyPattern": {
				"!proto": "ASTNode"
			},
			"CatchClause": {
				"!proto": "ASTNode"
			},
			"SpreadElement": {
				"!proto": "ASTNode"
			},
			"FunctionTypeParam": {
				"!proto": "ASTNode"
			},
			"Property": {
				"!proto": "ASTNode"
			},
			"JSXOpeningElement": {
				"!proto": "ASTNode"
			},
			"StringTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"ForStatement": {
				"!proto": "ASTNode"
			},
			"Decorator": {
				"!proto": "ASTNode"
			},
			"SpreadElementPattern": {
				"!proto": "ASTNode"
			},
			"JSXMemberExpression": {
				"!proto": "ASTNode"
			},
			"FunctionExpression": {
				"!proto": "ASTNode"
			},
			"BinaryExpression": {
				"!proto": "ASTNode"
			},
			"TryStatement": {
				"!proto": "ASTNode"
			},
			"Expression": {
				"!proto": "ASTNode"
			},
			"ExportNamedDeclaration": {
				"!proto": "ASTNode"
			},
			"SwitchStatement": {
				"!proto": "ASTNode"
			},
			"Block": {
				"!proto": "ASTNode"
			},
			"ExportBatchSpecifier": {
				"!proto": "ASTNode"
			},
			"ExpressionStatement": {
				"!proto": "ASTNode"
			},
			"ArrayPattern": {
				"!proto": "ASTNode"
			},
			"XMLList": {
				"!proto": "ASTNode"
			},
			"ReturnStatement": {
				"!proto": "ASTNode"
			},
			"CallExpression": {
				"!proto": "ASTNode"
			},
			"DeclareModule": {
				"!proto": "ASTNode"
			},
			"NumberLiteralTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"Type": {
				"!proto": "ASTNode"
			},
			"TypeParameterDeclaration": {
				"!proto": "ASTNode"
			},
			"XMLText": {
				"!proto": "ASTNode"
			},
			"Function": {
				"!proto": "ASTNode"
			},
			"UnaryExpression": {
				"!proto": "ASTNode"
			},
			"XML": {
				"!proto": "ASTNode"
			},
			"Super": {
				"!proto": "ASTNode"
			},
			"TypeParameterInstantiation": {
				"!proto": "ASTNode"
			},
			"XMLComment": {
				"!proto": "ASTNode"
			},
			"MemberTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"SwitchCase": {
				"!proto": "ASTNode"
			},
			"AwaitExpression": {
				"!proto": "ASTNode"
			},
			"ExportDefaultSpecifier": {
				"!proto": "ASTNode"
			},
			"XMLElement": {
				"!proto": "ASTNode"
			},
			"AnyTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"CommentBlock": {
				"!proto": "ASTNode"
			},
			"ClassBody": {
				"!proto": "ASTNode"
			},
			"ImportNamespaceSpecifier": {
				"!proto": "ASTNode"
			},
			"JSXExpressionContainer": {
				"!proto": "ASTNode"
			},
			"DeclareExportDeclaration": {
				"!proto": "ASTNode"
			},
			"UnionTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"XMLCdata": {
				"!proto": "ASTNode"
			},
			"JSXText": {
				"!proto": "ASTNode"
			},
			"QualifiedTypeIdentifier": {
				"!proto": "ASTNode"
			},
			"DebuggerStatement": {
				"!proto": "ASTNode"
			},
			"ForOfStatement": {
				"!proto": "ASTNode"
			},
			"LabeledStatement": {
				"!proto": "ASTNode"
			},
			"SpreadProperty": {
				"!proto": "ASTNode"
			},
			"UpdateExpression": {
				"!proto": "ASTNode"
			},
			"ClassDeclaration": {
				"!proto": "ASTNode"
			},
			"NumberTypeAnnotation": {
				"!proto": "ASTNode"
			},
			"TemplateElementValue": {
				"cooked": "string",
				"raw": "string"
			},
			"TypeDefinition": {
				"name": "string",
				"check": "fn(node: Node, deep: ?) -> bool"
			}
		}
	};

/***/ },

/***/ "./node_modules/tern/lib/def.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){return true?exports.init=e:"function"==typeof define&&define.amd?define({init:e}):void(tern.def={init:e})}(function(e,t){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function n(e,t,r){return e.call?e(t,r):e}function a(e,r){if("!ret"==r){if(e.retval)return e.retval;var n=new t.AVal;return e.propagate(new t.IsCallee(t.ANull,[],null,n)),n}return e.getProp(r)}function i(e,r,a,i){return function(o,s){for(var l=[],p=0;p<r.length;p++)l.push(n(r[p],o,s));return new t.Fn(e,t.ANull,l,n(a,o,s),i)}}function o(e){return function(r,a){for(var i=new t.AVal,o=0;o<e.length;o++)n(e[o],r,a).propagate(i);return i.maxWeight=1e5,i}}function s(e){return function(r,n){return new t.Arr(e(r,n))}}function l(e){return function(r,a){return new t.Arr(e.map(function(e){return n(e,r,a)}))}}function p(e){if(e instanceof t.Fn&&e.args)for(var r=0;r<e.args.length;++r){var n=e.args[r];n instanceof t.Fn&&n.args&&n.args.length&&u(e,r)}}function u(e,r){c(e,function(n,a){a[r]&&a[r].propagate(new t.IsCallee(t.cx().topScope,e.args[r].args,null,t.ANull))})}function f(e,r,n,a){var i=new m(e,null,n,a).parseType(!1,r,!0);return i instanceof t.AVal?i.types.forEach(p):p(i),i}function c(e,t,r){var n=e.computeRet,a=e.retval;e.computeRet=function(e,i,o){var s=t(e,i,o),l=n?n(e,i,o):a;return r?s:l}}function h(e,r){for(var n=0;n<r.length&&e!=t.ANull;++n){var a=r[n];if("!"==a.charAt(0))if("!proto"==a)e=e instanceof t.Obj&&e.proto||t.ANull;else{var i=e.getFunctionType();if(i)if("!ret"==a)e=i.retval&&i.retval.getType(!1)||t.ANull;else{var o=i.args&&i.args[Number(a.slice(1))];e=o&&o.getType(!1)||t.ANull}else e=t.ANull}else if(e instanceof t.Obj&&("prototype"==a&&e instanceof t.Fn||e.hasProp(a))){var s=e.getProp(a);e=!s||s.isEmpty()?t.ANull:s.types[0]}else e=t.ANull}return e}function g(e){var t=Object.create(e.prototype);return t.props=Object.create(null),t.isShell=!0,t}function v(e){if(!e["!type"]||/^(fn\(|\[|\+)/.test(e["!type"]))return!1;for(var t in e)if("!type"!=t&&"!doc"!=t&&"!url"!=t&&"!span"!=t&&"!data"!=t)return!1;return!0}function y(e,n,a){if(!e){var i=n["!type"];if(i)if(/^fn\(/.test(i))e=g(t.Fn);else if("["==i.charAt(0))e=g(t.Arr);else{if("+"!=i.charAt(0))throw new Error("Invalid !type spec: "+i);e=g(t.Obj)}else e=n["!stdProto"]?t.cx().protos[n["!stdProto"]]:g(t.Obj);e.name=a}for(var o in n)if(r(n,o)&&33!=o.charCodeAt(0)){var s=n[o];if("string"==typeof s||v(s))continue;var l=e.defProp(o);y(l.getObjType(),s,a?a+"."+o:o).propagate(l)}return e}function d(e,n,a){if(e.isShell){delete e.isShell;var i=n["!type"];if(i)f(i,a,e);else{var o=n["!proto"]&&f(n["!proto"]);t.Obj.call(e,!(o instanceof t.Obj)||o,a)}}var s=n["!effects"];if(s&&e instanceof t.Fn)for(var l=0;l<s.length;++l)O(s[l],e);w(n,e);for(var p in n)if(r(n,p)&&33!=p.charCodeAt(0)){var u=n[p],c=e.defProp(p),h=a?a+"."+p:p;if("string"==typeof u)c.isEmpty()&&f(u,h).propagate(c);else{if(v(u)){if(!c.isEmpty())continue;f(u["!type"],h,null,!0).propagate(c)}else d(c.getObjType(),u,h);u["!doc"]&&(c.doc=u["!doc"]),u["!url"]&&(c.url=u["!url"]),u["!span"]&&(c.span=u["!span"])}}return e}function w(e,t){e["!doc"]&&(t.doc=e["!doc"]),e["!url"]&&(t.url=e["!url"]),e["!span"]&&(t.span=e["!span"]),e["!data"]&&(t.metaData=e["!data"])}function A(e,r){var n=t.cx(),a=n.parent;t.addOrigin(n.curOrigin=e["!name"]||"env#"+n.origins.length),n.localDefs=n.definitions[n.curOrigin]=Object.create(null),a&&a.signal("preLoadDef",e),y(r,e);var i=e["!define"];if(i){for(var o in i){var s=i[o];n.localDefs[o]="string"==typeof s?T(s):y(null,s,o)}for(var o in i){var s=i[o];"string"!=typeof s&&d(n.localDefs[o],i[o],o)}}d(r,e),a&&a.signal("postLoadDef",e),n.curOrigin=n.localDefs=null}function b(){var e=t.cx().definitions.ecmascript;return e&&new t.Obj(e["Promise.prototype"])}var m=e.TypeParser=function(e,t,r,n){this.pos=t||0,this.spec=e,this.base=r,this.forceNew=n};m.prototype={eat:function(e){if(1==e.length?this.spec.charAt(this.pos)==e:this.spec.indexOf(e,this.pos)==this.pos)return this.pos+=e.length,!0},word:function(e){for(var t,r="",e=e||/[\w$]/;(t=this.spec.charAt(this.pos))&&e.test(t);)r+=t,++this.pos;return r},error:function(){throw new Error("Unrecognized type spec: "+this.spec+" (at "+this.pos+")")},parseFnType:function(e,r,n,a){var o=[],s=[],l=!1;if(!this.eat(")"))for(var p=0;;++p){var u,f=this.spec.indexOf(": ",this.pos);f!=-1&&(u=this.spec.slice(this.pos,f),/^[$\w?]+$/.test(u)?this.pos=f+2:u=null),s.push(u);var c=this.parseType(e);if(c.call&&(l=!0),o.push(c),!this.eat(", ")){this.eat(")")||this.error();break}}var h,g,v,y;if(this.eat(" -> ")){var d=this.pos;h=this.parseType(!0),h.call&&!l&&(g=h,h=t.ANull,v=d)}else h=t.ANull;return l?i(r,o,h,a):(n&&(y=this.base)?t.Fn.call(this.base,r,t.ANull,o,s,h,a):y=new t.Fn(r,t.ANull,o,s,h,a),g&&(y.computeRet=g),null!=v&&(y.computeRetSource=this.spec.slice(v,this.pos)),y)},parseType:function(e,r,n){var a=this.parseTypeMaybeProp(e,r,n);if(!this.eat("|"))return a;for(var i=[a],s=a.call;;){var l=this.parseTypeMaybeProp(e,r,n);if(i.push(l),l.call&&(s=!0),!this.eat("|"))break}if(s)return o(i);for(var p=new t.AVal,u=0;u<i.length;u++)i[u].propagate(p);return p.maxWeight=1e5,p},parseTypeMaybeProp:function(e,t,r){for(var n=this.parseTypeInner(e,t,r);e&&this.eat(".");)n=this.extendWithProp(n);return n},extendWithProp:function(e){var t=this.word(/[\w<>$!:]/)||this.error();return e.apply?function(r,n){return a(e(r,n),t)}:a(e,t)},parseTypeInner:function(e,r,n){var a;if(this.eat("fn(")||(a=this.eat("fn*(")))return this.parseFnType(e,r,n,a);if(this.eat("[")){for(var i,o=this.parseType(e),p=o.call;this.eat(", ");){i||(i=[o]);var u=this.parseType(e);i.push(u),p=p||u.call}return this.eat("]")||this.error(),p?i?l(i):s(o):n&&this.base?(t.Arr.call(this.base,i||o),this.base):new t.Arr(i||o)}if(this.eat("+")){var f=this.word(/[\w$<>\.:!]/),c=t.cx().localDefs[f+".prototype"];if(!c){var c=T(f);if(!(c instanceof t.Obj))return c;var g=h(c,["prototype"]);g&&(g=g.getObjType())&&(c=g)}if(e&&this.eat("["))return this.parsePoly(c);if(n&&this.base){this.base.proto=c;var r=c.hasCtor&&c.hasCtor.name||c.name;return r&&(this.base.name=r),this.base}return n&&this.forceNew?new t.Obj(c):t.getInstance(c)}if(this.eat(":")){var r=this.word(/[\w$\.]/);return t.getSymbol(r)}if(e&&this.eat("!")){var v=this.word(/\d/);if(v)return v=Number(v),function(e,r){return r[v]||t.ANull};if(this.eat("this"))return function(e){return e};if(this.eat("custom:")){var y=this.word(/[\w$]/);return N[y]||function(){return t.ANull}}return this.fromWord("!"+this.word(/[\w$<>\.!:]/))}return this.eat("?")?t.ANull:this.fromWord(this.word(/[\w$<>\.!:`]/))},fromWord:function(e){var r=t.cx();switch(e){case"number":return r.num;case"string":return r.str;case"bool":return r.bool;case"<top>":return r.topScope}return r.localDefs&&e in r.localDefs?r.localDefs[e]:T(e)},parsePoly:function(e){var r,n="<i>";(r=this.spec.slice(this.pos).match(/^\s*([\w$:]+)\s*=\s*/))&&(n=r[1],this.pos+=r[0].length);var a=this.parseType(!0);if(this.eat("]")||this.error(),a.call)return function(r,i){var o=new t.Obj(e);return a(r,i).propagate(o.defProp(n)),o};var i=new t.Obj(e);return a.propagate(i.defProp(n)),i}};var P,O=e.parseEffect=function(e,r){var a;if(0==e.indexOf("propagate ")){var i=new m(e,10),o=i.parseType(!0);i.eat(" ")||i.error();var s=i.parseType(!0);c(r,function(e,t){n(o,e,t).propagate(n(s,e,t))})}else if(0==e.indexOf("call ")){var l=5==e.indexOf("and return ",5),i=new m(e,l?16:5),p=i.parseType(!0),u=null,f=[];for(i.eat(" this=")&&(u=i.parseType(!0));i.eat(" ");)f.push(i.parseType(!0));c(r,function(e,r){for(var a=n(p,e,r),i=u?n(u,e,r):t.ANull,o=[],s=0;s<f.length;++s)o.push(n(f[s],e,r));var c=l?new t.AVal:t.ANull;return a.propagate(new t.IsCallee(i,o,null,c)),c},l)}else if(a=e.match(/^custom (\S+)\s*(.*)/)){var h=N[a[1]];h&&c(r,a[2]?h(a[2]):h)}else{if(0!=e.indexOf("copy "))throw new Error("Unknown effect type: "+e);var i=new m(e,5),g=i.parseType(!0);i.eat(" ");var v=i.parseType(!0);c(r,function(e,r){var a=n(g,e,r),i=n(v,e,r);a.forAllProps(function(e,r,n){n&&"<i>"!=e&&i.propagate(new t.DefProp(e,r))})})}},T=e.parsePath=function(e,r){var n=t.cx(),a=n.paths[e],i=e;if(null!=a)return a;n.paths[e]=t.ANull;var o=r||P||n.topScope;if(n.localDefs)for(var s in n.localDefs)if(0==e.indexOf(s)){if(e==s)return n.paths[e]=n.localDefs[e];if("."==e.charAt(s.length)){o=n.localDefs[s],e=e.slice(s.length+1);break}}var l=h(o,e.split("."));return n.paths[i]=l==t.ANull?null:l,l};e.load=function(e,r){r||(r=t.cx().topScope);var n=P;P=r;try{A(e,r)}finally{P=n}},e.parse=function(e,r,n){var a=t.cx();r&&(a.origin=r,a.localDefs=a.definitions[r]);try{return"string"==typeof e?f(e,n):d(y(null,e,n),e,n)}finally{r&&(a.origin=a.localDefs=null)}};var N=Object.create(null);t.registerFunction=function(e,t){N[e]=t};var j=t.constraint({construct:function(e,t,r){this.created=e,this.target=t,this.spec=r},addType:function(e){if(e instanceof t.Obj&&this.created++<5){var r=new t.Obj(e),n=this.spec;if(n instanceof t.AVal&&(n=n.getObjType(!1)),n instanceof t.Obj)for(var a in n.props){var i=n.props[a].types[0],o=r.defProp(a);if(i&&i instanceof t.Obj&&i.props.value){var s=i.props.value.getType(!1);s&&o.addType(s)}}this.target.addType(r)}}});t.registerFunction("Object_create",function(e,r,n){if(n&&n.length&&"Literal"==n[0].type&&null==n[0].value)return new t.Obj;var a=new t.AVal;return r[0]&&r[0].propagate(new j(0,a,r[1])),a});var F=t.constraint({construct:function(e){this.target=e},addType:function(e){e instanceof t.Obj&&(e.hasProp("value")?e.getProp("value").propagate(this.target):e.hasProp("get")&&e.getProp("get").propagate(new t.IsCallee(t.ANull,[],null,this.target)))}});t.registerFunction("Object_defineProperty",function(e,r,n){if(n&&n.length>=3&&"Literal"==n[1].type&&"string"==typeof n[1].value){var a=r[0],i=new t.AVal;a.propagate(new t.DefProp(n[1].value,i,n[1])),r[2].propagate(new F(i))}return t.ANull}),t.registerFunction("Object_defineProperties",function(e,r,n){if(r.length>=2){var a=r[0];r[1].forAllProps(function(e,r,i){if(i){var o=new t.AVal;a.propagate(new t.DefProp(e,o,n&&n[1])),r.propagate(new F(o))}})}return t.ANull});var x=t.constraint({construct:function(e,t,r){this.self=e,this.args=t,this.target=r},addType:function(e){if(e instanceof t.Fn){this.target.addType(new t.Fn(e.name,t.ANull,e.args.slice(this.args.length),e.argNames.slice(this.args.length),e.retval,e.generator)),this.self.propagate(e.self);for(var r=0;r<Math.min(e.args.length,this.args.length);++r)this.args[r].propagate(e.args[r])}}});t.registerFunction("Function_bind",function(e,r){if(!r.length)return t.ANull;var n=new t.AVal;return e.propagate(new x(r[0],r.slice(1),n)),n}),t.registerFunction("Array_ctor",function(e,r){var n=new t.Arr;if(1!=r.length||!r[0].hasType(t.cx().num))for(var a=n.getProp("<i>"),i=0;i<r.length;++i)r[i].propagate(a);return n}),t.registerFunction("Promise_ctor",function(e,r,n){var a=b();if(!a||r.length<1)return t.ANull;var i=a.defProp(":t",n&&n[0]),o=new t.AVal;o.propagate(i);var s=new t.Fn("execute",t.ANull,[o],["value"],t.ANull),l=t.cx().definitions.ecmascript.Promise_reject;return r[0].propagate(new t.IsCallee(t.ANull,[s,l],null,t.ANull)),a}),t.registerFunction("Promise_resolve",function(e,r,n){var a=b();if(!a)return t.ANull;if(r.length){var i=a.defProp(":t",n&&n[0]),o=new t.AVal;o.propagate(i),r[0].propagate(new D(o))}return a});var D=t.constraint({construct:function(e){this.output=e},addType:function(e){e.constructor==t.Obj&&"Promise"==e.name&&e.hasProp(":t")?e.getProp(":t").propagate(this.output):e.propagate(this.output)}}),S=50;return t.registerFunction("Promise_then",function(e,r,n){var a=r.length&&r[0].getFunctionType(),i=t.cx().definitions.ecmascript;if(!a||!i)return e;var o,s=new t.Obj(i["Promise.prototype"]),l=s.defProp(":t",n&&n[0]);return a.retval.isEmpty()&&(o=e.getType())instanceof t.Obj&&o.hasProp(":t")&&o.getProp(":t").propagate(l,S),a.retval.propagate(new D(l)),s}),t.registerFunction("getOwnPropertySymbols",function(e,r){if(!r.length)return t.ANull;var n=new t.AVal;return r[0].forAllProps(function(e,r,a){a&&":"==e.charAt(0)&&n.addType(t.getSymbol(e.slice(1)))}),n}),t.registerFunction("getSymbol",function(e,r,n){return n&&n.length&&"Literal"==n[0].type&&"string"==typeof n[0].value?t.getSymbol(n[0].value):t.ANull}),e});

/***/ }

});