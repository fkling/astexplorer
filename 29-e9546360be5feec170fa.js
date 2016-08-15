webpackJsonp([29],{

/***/ "./node_modules/tern/lib/tern.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e,t){return true?t(exports,__webpack_require__("./node_modules/tern/lib/infer.js"),__webpack_require__("./node_modules/tern/lib/signal.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/walk.js")):"function"==typeof define&&define.amd?define(["exports","./infer","./signal","acorn/dist/acorn","acorn/dist/walk"],t):void t(e.tern||(e.tern={}),tern,tern.signal,acorn,acorn.walk)}(this,function(e,t,n,r,i){"use strict";function o(e,t){this.name=e,this.parent=t,this.scope=this.text=this.ast=this.lineOffsets=null}function s(e,n){var r={directSourceFile:n,allowReturnOutsideFunction:!0,allowImportExportEverywhere:!0,ecmaVersion:e.options.ecmaVersion},i=e.signalReturnFirst("preParse",n.text,r)||n.text,o=t.parse(i,r);return e.signal("postParse",o,i),o}function a(e,n,r){e.text=r.options.stripCRs?n.replace(/\r\n/g,"\n"):n,t.withContext(r.cx,function(){e.ast=s(r,e)}),e.lineOffsets=null}function f(e,n,r){if(n.query&&!J.hasOwnProperty(n.query.type))return r("No query type '"+n.query.type+"' defined");var i=n.query;i||r(null,{});var o=n.files||[];o.length&&++e.uses;for(var s=0;s<o.length;++s){var a=o[s];a.name=e.normalizeFilename(a.name),"delete"==a.type?e.delFile(a.name):u(e,a.name,null,"full"==a.type?a.text:null)}var f="number"==typeof n.timeout?[n.timeout]:null;if(!i)return void c(e,f,function(){});var l=J[i.type];if(l.takesFile){if("string"!=typeof i.file)return r(".query.file must be a string");/^#/.test(i.file)||u(e,i.file,null)}c(e,f,function(n){if(n)return r(n);var s=l.takesFile&&v(e,o,i.file);return l.fullFile&&"part"==s.type?r("Can't run a "+i.type+" query on a file fragment"):(t.resetGuessing(),void t.withContext(e.cx,function(){var n,o=function(){n=l.run(e,i,s)};try{f?t.withTimeout(f[0],o):o()}catch(a){return e.options.debug&&"TernError"!=a.name&&console.error(a.stack),r(a)}r(null,n)}))})}function l(e,n){return t.withContext(e.cx,function(){n.scope=e.cx.topScope,e.signal("beforeLoad",n),t.analyze(n.ast,n.name,n.scope),e.signal("afterLoad",n)}),n}function u(e,t,n,r){var i=e.findFile(t);if(i)return null!=r&&(i.scope&&(e.needsPurge.push(t),i.scope=null),a(i,r,e)),void(x(e,i.parent)>x(e,n)&&(i.parent=n,i.excluded&&(i.excluded=null)));var s=new o(t,n);e.files.push(s),e.fileMap[t]=s,null!=r?a(s,r,e):e.options.async?(e.startAsyncAction(),e.options.getFile(t,function(t,n){a(s,n||"",e),e.finishAsyncAction(t)})):a(s,e.options.getFile(t)||"",e)}function p(e,t,n){var r=function(){e.off("everythingFetched",r),clearTimeout(i),c(e,t,n)};e.on("everythingFetched",r);var i=setTimeout(r,e.options.fetchTimeout)}function c(e,n,r){if(e.pending)return p(e,n,r);var i=e.fetchError;if(i)return e.fetchError=null,r(i);e.needsPurge.length>0&&t.withContext(e.cx,function(){t.purge(e.needsPurge),e.needsPurge.length=0});for(var o=!0,s=0;s<e.files.length;){for(var a=[];s<e.files.length;++s){var f=e.files[s];null==f.text?o=!1:null!=f.scope||f.excluded||a.push(f)}a.sort(function(t,n){return x(e,t.parent)-x(e,n.parent)});for(var u=0;u<a.length;u++){var f=a[u];if(f.parent&&!w(e,f))f.excluded=!0;else if(n){var c=+new Date;t.withTimeout(n[0],function(){l(e,f)}),n[0]-=+new Date-c}else l(e,f)}}o?r():p(e,n,r)}function d(e){var t=e.indexOf("\n");return t<0?e:e.slice(0,t)}function h(e,t,n){var r=Math.max(0,n-500),i=null;if(!/^\s*$/.test(e))for(;;){var o=t.indexOf(e,r);if(o<0||o>n+500)break;(null==i||Math.abs(i-n)>Math.abs(o-n))&&(i=o),r=o+e.length}return i}function g(e){for(var t=0;e;++t,e=e.prev);return t}function y(e){var t=new Error(e);return t.name="TernError",t}function v(e,n,r){var o=r.match(/^#(\d+)$/);if(!o)return e.findFile(r);var a=n[o[1]];if(!a||"delete"==a.type)throw y("Reference to unknown file "+r);if("full"==a.type)return e.fileMap[a.name];var f=a.backing=e.fileMap[a.name],l=a.offset;a.offsetLines&&(l={line:a.offsetLines,ch:0}),a.offset=l=Y(f,null==a.offsetLines?a.offset:{line:a.offsetLines,ch:0},!0);var u,p,c=d(a.text),v=h(c,f.text,l),m=null==v?Math.max(0,f.text.lastIndexOf("\n",l)):v;return t.withContext(e.cx,function(){t.purge(a.name,m,m+a.text.length);var n,r=a.text;if(n=r.match(/(?:"([^"]*)"|([\w$]+))\s*:\s*function\b/)){var o=i.findNodeAround(a.backing.ast,m,"ObjectExpression");o&&o.node.objType&&(u={type:o.node.objType,prop:n[2]||n[1]})}if(v&&(n=c.match(/^(.*?)\bfunction\b/))){for(var l=n[1].length,d="",h=0;h<l;++h)d+=" ";a.text=d+r.slice(l),p=!0}var y=t.scopeAt(f.ast,m,f.scope),x=t.scopeAt(f.ast,m+r.length,f.scope),b=a.scope=g(y)<g(x)?x:y;a.ast=s(e,a),t.analyze(a.ast,a.name,b);e:if(u||p){var w=t.scopeAt(a.ast,c.length,y);if(!w.fnType)break e;if(u){var F=u.type.getProp(u.prop);F.addType(w.fnType)}else if(p){var O=t.scopeAt(f.ast,m+c.length,f.scope);if(O==y||!O.fnType)break e;var j=O.fnType,P=w.fnType;if(!P||P.name!=j.name&&j.name)break e;for(var h=0,A=Math.min(j.args.length,P.args.length);h<A;++h)j.args[h].propagate(P.args[h]);j.self.propagate(P.self),P.retval.propagate(j.retval)}}}),a}function m(e){var t=0;return i.simple(e,{Expression:function(){++t}}),t}function x(e,t){for(var n=0;t;)t=e.fileMap[t].parent,++n;return n}function b(e,t){for(;;){var n=e.fileMap[t.parent];if(!n.parent)break;t=n}return t.name}function w(e,t){var n=b(e,t),r=m(t.ast),i=e.budgets[n];return null==i&&(i=e.budgets[n]=e.options.dependencyBudget),!(i<r)&&(e.budgets[n]=i-r,!0)}function F(e){return"number"==typeof e||"object"==typeof e&&"number"==typeof e.line&&"number"==typeof e.ch}function O(e){if(e.query){if("string"!=typeof e.query.type)return".query.type must be a string";if(e.query.start&&!F(e.query.start))return".query.start must be a position";if(e.query.end&&!F(e.query.end))return".query.end must be a position"}if(e.files){if(!Array.isArray(e.files))return"Files property must be an array";for(var t=0;t<e.files.length;++t){var n=e.files[t];if("object"!=typeof n)return".files[n] must be objects";if("string"!=typeof n.name)return".files[n].name must be a string";if("delete"!=n.type){if("string"!=typeof n.text)return".files[n].text must be a string";if("part"==n.type){if(!F(n.offset)&&"number"!=typeof n.offsetLines)return".files[n].offset must be a position"}else if("full"!=n.type)return'.files[n].type must be "full" or "part"'}}}}function j(e,t){for(var n=e.text,r=e.lineOffsets||(e.lineOffsets=[0]),i=0,o=0,s=Math.min(Math.floor(t/X),r.length-1),i=r[s],o=s*X;o<t;){if(++o,i=n.indexOf("\n",i)+1,0===i)return null;o%X===0&&r.push(i)}return i}function P(e,t){if(!e)return{line:0,ch:0};for(var n,r,i=e.lineOffsets||(e.lineOffsets=[0]),o=e.text,s=i.length-1;s>=0;--s)i[s]<=t&&(n=s*X,r=i[s]);for(;;){var a=o.indexOf("\n",r);if(a>=t||a<0)break;r=a+1,++n}return{line:n,ch:t-r}}function A(e){for(var t in e)null==e[t]&&delete e[t];return e}function k(e,t,n){null!=n&&(e[t]=n)}function C(e,t){"string"!=typeof e&&(e=e.name,t=t.name);var n=/^[A-Z]/.test(e),r=/^[A-Z]/.test(t);return n==r?e<t?-1:e==t?0:1:n?1:-1}function T(e,t,n){return"Literal"==e.type&&"string"==typeof e.value&&e.start==t-1&&e.end<=n+1}function M(e,t){for(var n=0;n<e.properties.length;n++){var r=e.properties[n];if(r.key.start<=t&&r.key.end>=t)return r}}function q(e,n,i){function o(t,r,i,o){if((!x&&n.omitObjectPrototype===!1||r!=e.cx.protos.Object||p)&&!(n.filter!==!1&&p&&0!==(n.caseInsensitive?t.toLowerCase():t).indexOf(p)||u&&u.props[t])){var s=te(n,c,t,r&&r.props[t],i);o&&s&&"string"!=typeof s&&o(s)}}if(null==n.end)throw y("missing .query.end field");var s=e.signalReturnFirst("completion",i,n);if(s)return s;for(var a=Y(i,n.end),f=a,l=i.text;a&&r.isIdentifierChar(l.charCodeAt(a-1));)--a;if(n.expandWordForward!==!1)for(;f<l.length&&r.isIdentifierChar(l.charCodeAt(f));)++f;var u,p=l.slice(a,f),c=[];n.caseInsensitive&&(p=p.toLowerCase());var d,h,g,v,m,x,b=t.findExpressionAround(i.ast,null,a,i.scope);if(b){var w=b.node;if("MemberExpression"==w.type&&w.object.end<a)m=b;else if(T(w,a,f)){var F=t.parentNode(w,i.ast);"MemberExpression"==F.type&&F.property==w&&(m={node:F,state:b.state})}else if("ObjectExpression"==w.type){var O=M(w,f);O?(x=b,h=v=O.key.name):p||/:\s*$/.test(i.text.slice(0,a))||(x=b,h=v=!0)}}if(x)g=t.typeFromContext(i.ast,x),u=x.node.objType;else if(m)h=m.node.property,h="Literal"==h.type?h.value.slice(1):h.name,m.node=m.node.object,g=t.expressionType(m);else if("."==l.charAt(a-1)){for(var j=a-1;j&&("."==l.charAt(j-1)||r.isIdentifierChar(l.charCodeAt(j-1)));)j--;var P=l.slice(j,a-1);P&&(g=t.def.parsePath(P,i.scope).getObjType(),h=p)}if(null!=h){if(e.cx.completingProperty=h,g&&t.forAllPropertiesOf(g,o),!c.length&&n.guess!==!1&&g&&g.guessProperties&&g.guessProperties(function(e,t,n){e!=h&&"✖"!=e&&o(e,t,n)}),!c.length&&p.length>=2&&n.guess!==!1)for(var h in e.cx.props)o(h,e.cx.props[h][0],0);d="memberCompletion"}else t.forAllLocalsAt(i.ast,a,i.scope,o),n.includeKeywords&&ee.forEach(function(e){o(e,null,0,function(e){e.isKeyword=!0})}),d="variableCompletion";return e.signal(d,i,a,f,o),n.sort!==!1&&c.sort(C),e.cx.completingProperty=null,{start:_(n,i,a),end:_(n,i,f),isProperty:!!h,isObjectKey:!!v,completions:c}}function E(e,t){var n=t.prefix,r=[];for(var i in e.cx.props)"<i>"==i||n&&0!==i.indexOf(n)||r.push(i);return t.sort!==!1&&r.sort(C),{completions:r}}function N(e,t){var n,r,i=e.body;return!!i&&(Array.isArray(i)?(n=i[0].start,r=i[i.length-1].end):(n=i.start,r=i.end),n<=t&&r>=t)}function D(e,t,n){var r=ne(e,t,n);if(r)return r;throw y("No expression at the given position.")}function L(e){return e&&(e=e.getType())&&e instanceof t.Obj?e:null}function R(e,n,r,i){var o;i&&(t.resetGuessing(),o=t.expressionType(i));var s=e.hasHandler("typeAt");if(s)for(var a=Y(r,n.end),f=0;f<s.length;f++)o=s[f](r,a,i,o);if(!o)throw y("No type found at the given position.");var l;if("ObjectExpression"==i.node.type&&null!=n.end&&(l=M(i.node,Y(r,n.end)))){var u=l.key.name,p=L(t.typeFromContext(r.ast,i));if(p&&p.hasProp(u))o=p.hasProp(u);else{var c=L(o);c&&c.hasProp(u)&&(o=c.hasProp(u))}}return o}function I(e,n,r){var i,o=ne(r,n),s=R(e,n,r,o),a=s;if(s=n.preferFunction?s.getFunctionType()||s.getType():s.getType(),o&&("Identifier"==o.node.type?i=o.node.name:"MemberExpression"!=o.node.type||o.node.computed?"MethodDefinition"!=o.node.type||o.node.computed||(i=o.node.key.name):i=o.node.property.name),null!=n.depth&&"number"!=typeof n.depth)throw y(".query.depth must be a number");var f={guess:t.didGuess(),type:t.toString(a,n.depth),name:s&&s.name,exprName:i,doc:a.doc,url:a.url};return s&&G(n,s,f),A(f)}function S(e,t){if(!t)return null;if("full"==e.docFormat)return t;var n=/.\n[\s@\n]/.exec(t);if(n&&(t=t.slice(0,n.index+1)),t=t.replace(/\n\s*/g," "),t.length<100)return t;var r=/[\.!?] [A-Z]/g;r.lastIndex=80;var i=r.exec(t);return i&&(t=t.slice(0,i.index+1)),t}function z(e,n,r){var i=ne(r,n),o=R(e,n,r,i),s={url:o.url,doc:S(n,o.doc),type:t.toString(o)},a=o.getType();return a&&G(n,a,s),A(s)}function G(e,n,r){r.url||(r.url=n.url),r.doc||(r.doc=S(e,n.doc)),r.origin||(r.origin=n.origin);var i,o=t.cx().protos;!r.url&&!r.doc&&n.proto&&(i=n.proto.hasCtor)&&n.proto!=o.Object&&n.proto!=o.Function&&n.proto!=o.Array&&(r.url=i.url,r.doc=S(e,i.doc))}function $(e,n,r){var i=ne(r,n),o=R(e,n,r,i);if(t.didGuess())return{};var s=re(o),a={url:o.url,doc:S(n,o.doc),origin:o.origin};if(o.types)for(var f=o.types.length-1;f>=0;--f){var l=o.types[f];G(n,l,a),s||(s=re(l))}if(s&&s.node){var u=s.node.sourceFile||e.fileMap[s.origin],p=_(n,u,s.node.start),c=_(n,u,s.node.end);a.start=p,a.end=c,a.file=s.origin;var d=Math.max(0,s.node.start-50);a.contextOffset=s.node.start-d,a.context=u.text.slice(d,d+50)}else s&&(a.file=s.origin,ie(e,n,s,a));return A(a)}function K(e,n,r,i,o){function s(e){return function(t,r){if(o)for(var i=r;i!=f;i=i.prev){var s=i.hasProp(o);if(s)throw y("Renaming `"+a+"` to `"+o+"` would make a variable at line "+(P(e,t.start).line+1)+" point to the definition at line "+(P(e,s.name.start).line+1))}u.push({file:e.name,start:_(n,e,t.start),end:_(n,e,t.end)})}}for(var a=i.node.name,f=i.state;f&&!(a in f.props);f=f.prev);if(!f)throw y("Could not find a definition for "+a);var l,u=[];if(f.originNode){if(l="local",o){for(var p=f.prev;p&&!(o in p.props);p=p.prev);p&&t.findRefs(f.originNode,f,o,p,function(e){throw y("Renaming `"+a+"` to `"+o+"` would shadow the definition used at line "+(P(r,e.start).line+1))})}t.findRefs(f.originNode,f,a,f,s(r))}else if(l="global",n.onlySourceFile)t.findRefs(r.ast,r.scope,a,f,s(r));else for(var c=0;c<e.files.length;++c){var d=e.files[c];t.findRefs(d.ast,d.scope,a,f,s(d))}return{refs:u,type:l,name:a}}function V(e,n,r,i,o){function s(e){return function(t){l.push({file:e.name,start:_(n,e,t.start),end:_(n,e,t.end)})}}var a=t.expressionType(i);"MethodDefinition"==i.node.type&&(a=a.propertyOf);var f=a.getObjType();if(!f)throw y("Couldn't determine type of base object.");var l=[];if(n.onlySourceFile)t.findPropRefs(r.ast,r.scope,f,o.name,s(r));else for(var u=0;u<e.files.length;++u){var p=e.files[u];t.findPropRefs(p.ast,p.scope,f,o.name,s(p))}return{refs:l,name:o.name}}function Z(e,t,n){var r=D(n,t,!0);if(r&&"Identifier"==r.node.type)return K(e,t,n,r);if(r&&"MemberExpression"==r.node.type&&!r.node.computed){var i=r.node.property;return r.node=r.node.object,V(e,t,n,r,i)}if(r&&"ObjectExpression"==r.node.type)for(var o=Y(n,t.end),s=0;s<r.node.properties.length;++s){var a=r.node.properties[s].key;if(a.start<=o&&a.end>=o)return V(e,t,n,r,a)}else if(r&&"MethodDefinition"==r.node.type){var i=r.node.key;return V(e,t,n,r,i)}throw y("Not at a variable or property name.")}function B(e,t,n){if("string"!=typeof t.newName)throw y(".query.newName should be a string");var r=D(n,t);if(!r||"Identifier"!=r.node.type)throw y("Not at a variable.");var i=K(e,t,n,r,t.newName),o=i.refs;delete i.refs,i.files=e.files.map(function(e){return e.name});for(var s=i.changes=[],a=0;a<o.length;++a){var f=o[a];f.text=t.newName,s.push(f)}return i}function Q(e){return{files:e.files.map(function(e){return e.name})}}var H=Object.create(null);e.registerPlugin=function(e,t){H[e]=t};var W=e.defaultOptions={debug:!1,async:!1,getFile:function(e,t){this.async&&t(null,null)},normalizeFilename:function(e){return e},defs:[],plugins:{},fetchTimeout:1e3,dependencyBudget:2e4,reuseInstances:!0,stripCRs:!1,ecmaVersion:6,projectDir:"/",parent:null},J={completions:{takesFile:!0,run:q},properties:{run:E},type:{takesFile:!0,run:I},documentation:{takesFile:!0,run:z},definition:{takesFile:!0,run:$},refs:{takesFile:!0,fullFile:!0,run:Z},rename:{takesFile:!0,fullFile:!0,run:B},files:{run:Q}};e.defineQueryType=function(e,t){J[e]=t},o.prototype.asLineChar=function(e){return P(this,e)};var U=e.Server=function(e){this.cx=null,this.options=e||{};for(var t in W)e.hasOwnProperty(t)||(e[t]=W[t]);this.projectDir=e.projectDir.replace(/\\/g,"/"),/\/$/.test(this.projectDir)||(this.projectDir+="/"),this.parent=e.parent,this.handlers=Object.create(null),this.files=[],this.fileMap=Object.create(null),this.needsPurge=[],this.budgets=Object.create(null),this.uses=0,this.pending=0,this.asyncError=null,this.mod={},this.defs=e.defs.slice(0),this.plugins=Object.create(null);for(var n in e.plugins)e.plugins.hasOwnProperty(n)&&this.loadPlugin(n,e.plugins[n]);this.reset()};U.prototype=n.mixin({addFile:function(e,t,n){!n||n in this.fileMap||(n=null),e in this.fileMap||(e=this.normalizeFilename(e)),u(this,e,n,t)},delFile:function(e){var t=this.findFile(e);t&&(this.needsPurge.push(t.name),this.files.splice(this.files.indexOf(t),1),delete this.fileMap[t.name])},reset:function(){this.signal("reset"),this.cx=new t.Context(this.defs,this),this.uses=0,this.budgets=Object.create(null);for(var e=0;e<this.files.length;++e){var n=this.files[e];n.scope=null}this.signal("postReset")},request:function(e,t){var n=O(e);if(n)return t(n);var r=this;f(this,e,function(e,n){t(e,n),r.uses>40&&(r.reset(),c(r,null,function(){}))})},findFile:function(e){return this.fileMap[this.normalizeFilename(e)]},flush:function(e){var n=this.cx;c(this,null,function(r){return r?e(r):void t.withContext(n,e)})},startAsyncAction:function(){++this.pending},finishAsyncAction:function(e){e&&(this.asyncError=e),0===--this.pending&&this.signal("everythingFetched")},addDefs:function(e,t){t?this.defs.unshift(e):this.defs.push(e),this.cx&&this.reset()},deleteDefs:function(e){for(var t=0;t<this.defs.length;t++)if(this.defs[t]["!name"]==e)return this.defs.splice(t,1),void(this.cx&&this.reset())},loadPlugin:function(e,t){if(1==arguments.length&&(t=this.options.plugins[e]||!0),!(e in this.plugins)&&e in H&&t){this.plugins[e]=!0;var n=H[e](this,t);if(n&&(n.defs&&this.addDefs(n.defs,n.loadFirst),n.passes))for(var r in n.passes)n.passes.hasOwnProperty(r)&&this.on(r,n.passes[r])}},normalizeFilename:function(e){var t=this.options.normalizeFilename(e).replace(/\\/g,"/");return 0==t.indexOf(this.projectDir)&&(t=t.slice(this.projectDir.length)),t}});var X=25,Y=e.resolvePos=function(e,t,n){if("number"!=typeof t){var r=j(e,t.line);if(null==r){if(!n)throw y("File doesn't contain a line "+t.line);t=e.text.length}else t=r+t.ch}if(t>e.text.length){if(!n)throw y("Position "+t+" is outside of file.");t=e.text.length}return t},_=e.outputPos=function(e,t,n){if(e.lineCharPositions){var r=P(t,n);return"part"==t.type&&(r.line+=null!=t.offsetLines?t.offsetLines:P(t.backing,t.offset).line),r}return n+("part"==t.type?t.offset:0)},ee="break do instanceof typeof case else new var catch finally return void continue for switch while debugger function this with default if throw delete in try".split(" "),te=e.addCompletion=function(e,n,r,i,o){for(var s=e.types||e.docs||e.urls||e.origins,a=s||e.depths,f=0;f<n.length;++f){var l=n[f];if((a?l.name:l)==r)return}var u=a?{name:r}:r;if(n.push(u),i&&s){t.resetGuessing();var p=i.getType();u.guess=t.didGuess(),e.types&&(u.type=t.toString(i)),e.docs&&k(u,"doc",S(e,i.doc||p&&p.doc)),e.urls&&k(u,"url",i.url||p&&p.url),e.origins&&k(u,"origin",i.origin||p&&p.origin)}return e.depths&&(u.depth=o||0),u},ne=e.findQueryExpr=function(e,n,r){if(null==n.end)throw y("missing .query.end field");if(n.variable){var i=t.scopeAt(e.ast,Y(e,n.end),e.scope);return{node:{type:"Identifier",name:n.variable,start:n.end,end:n.end+1},state:i}}var o=n.start&&Y(e,n.start),s=Y(e,n.end),a=t.findExpressionAt(e.ast,o,s,e.scope);if(!a){var f=t.findExpressionAround(e.ast,o,s,e.scope);f&&!N(f.node,s)&&("ObjectExpression"==f.node.type||r||(null==o?s:o)-f.node.start<20||f.node.end-s<20)&&(a=f)}return a},re=e.getSpan=function(e){if(e.origin){if(e.originNode){var t=e.originNode;return/^Function/.test(t.type)&&t.id&&(t=t.id),{origin:e.origin,node:t}}return e.span?{origin:e.origin,span:e.span}:void 0}},ie=e.storeSpan=function(e,t,n,r){if(r.origin=n.origin,n.span){var i=/^(\d+)\[(\d+):(\d+)\]-(\d+)\[(\d+):(\d+)\]$/.exec(n.span);r.start=t.lineCharPositions?{line:Number(i[2]),ch:Number(i[3])}:Number(i[1]),r.end=t.lineCharPositions?{line:Number(i[5]),ch:Number(i[6])}:Number(i[4])}else{var o=e.fileMap[n.origin];r.start=_(t,o,n.node.start),r.end=_(t,o,n.node.end)}};e.version="0.17.0"});

/***/ },

/***/ "./node_modules/tern/defs/ecma6.json":
/***/ function(module, exports) {

	module.exports = {
		"!name": "ecma6",
		"!define": {
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
				"getOwnPropertyDescriptor": "fn(target: ?, property: string)",
				"defineProperty": "fn(target: ?, property: string, descriptor: ?)",
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
		"Array": {
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
				}
			}
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
		"Date": {
			"prototype": {
				"toJSON": {
					"!type": "fn() -> string",
					"!doc": "Returns a string (using toISOString()) representing the Date object's value.",
					"!url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON"
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
		"Math": {
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
			}
		},
		"Number": {
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
			}
		},
		"Object": {
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
				"!type": "fn(value: ?) -> +Promise[:t=!0]",
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
				"!type": "fn(target: ?, property: string, attributes: ?) -> bool",
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
		"RegExp": {
			"prototype": {
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
		"String": {
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

	!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.acorn=t()}}(function(){return function t(e,s,i){function r(a,o){if(!s[a]){if(!e[a]){var h="function"==typeof require&&require;if(!o&&h)return h(a,!0);if(n)return n(a,!0);var p=new Error("Cannot find module '"+a+"'");throw p.code="MODULE_NOT_FOUND",p}var c=s[a]={exports:{}};e[a][0].call(c.exports,function(t){var s=e[a][1][t];return r(s?s:t)},c,c.exports,t,e,s,i)}return s[a].exports}for(var n="function"==typeof require&&require,a=0;a<i.length;a++)r(i[a]);return r}({1:[function(t,e,s){"use strict";var i=t("./tokentype"),r=t("./state"),n=r.Parser.prototype;n.checkPropClash=function(t,e){if(!(this.options.ecmaVersion>=6&&(t.computed||t.method||t.shorthand))){var s=t.key,i=void 0;switch(s.type){case"Identifier":i=s.name;break;case"Literal":i=String(s.value);break;default:return}var r=t.kind;if(this.options.ecmaVersion>=6)return void("__proto__"===i&&"init"===r&&(e.proto&&this.raise(s.start,"Redefinition of __proto__ property"),e.proto=!0));i="$"+i;var n=e[i];if(n){var a="init"!==r;(!this.strict&&!a||!n[r])&&a^n.init||this.raise(s.start,"Redefinition of property")}else n=e[i]={init:!1,get:!1,set:!1};n[r]=!0}},n.parseExpression=function(t,e){var s=this.start,r=this.startLoc,n=this.parseMaybeAssign(t,e);if(this.type===i.types.comma){var a=this.startNodeAt(s,r);for(a.expressions=[n];this.eat(i.types.comma);)a.expressions.push(this.parseMaybeAssign(t,e));return this.finishNode(a,"SequenceExpression")}return n},n.parseMaybeAssign=function(t,e,s){if(this.type==i.types._yield&&this.inGenerator)return this.parseYield();var r=!1;e||(e={shorthandAssign:0,trailingComma:0},r=!0);var n=this.start,a=this.startLoc;this.type!=i.types.parenL&&this.type!=i.types.name||(this.potentialArrowAt=this.start);var o=this.parseMaybeConditional(t,e);if(s&&(o=s.call(this,o,n,a)),this.type.isAssign){r&&this.checkPatternErrors(e,!0);var h=this.startNodeAt(n,a);return h.operator=this.value,h.left=this.type===i.types.eq?this.toAssignable(o):o,e.shorthandAssign=0,this.checkLVal(o),this.next(),h.right=this.parseMaybeAssign(t),this.finishNode(h,"AssignmentExpression")}return r&&this.checkExpressionErrors(e,!0),o},n.parseMaybeConditional=function(t,e){var s=this.start,r=this.startLoc,n=this.parseExprOps(t,e);if(this.checkExpressionErrors(e))return n;if(this.eat(i.types.question)){var a=this.startNodeAt(s,r);return a.test=n,a.consequent=this.parseMaybeAssign(),this.expect(i.types.colon),a.alternate=this.parseMaybeAssign(t),this.finishNode(a,"ConditionalExpression")}return n},n.parseExprOps=function(t,e){var s=this.start,i=this.startLoc,r=this.parseMaybeUnary(e);return this.checkExpressionErrors(e)?r:this.parseExprOp(r,s,i,-1,t)},n.parseExprOp=function(t,e,s,r,n){var a=this.type.binop;if(null!=a&&(!n||this.type!==i.types._in)&&a>r){var o=this.startNodeAt(e,s);o.left=t,o.operator=this.value;var h=this.type;this.next();var p=this.start,c=this.startLoc;return o.right=this.parseExprOp(this.parseMaybeUnary(),p,c,a,n),this.finishNode(o,h===i.types.logicalOR||h===i.types.logicalAND?"LogicalExpression":"BinaryExpression"),this.parseExprOp(o,e,s,r,n)}return t},n.parseMaybeUnary=function(t){if(this.type.prefix){var e=this.startNode(),s=this.type===i.types.incDec;return e.operator=this.value,e.prefix=!0,this.next(),e.argument=this.parseMaybeUnary(),this.checkExpressionErrors(t,!0),s?this.checkLVal(e.argument):this.strict&&"delete"===e.operator&&"Identifier"===e.argument.type&&this.raise(e.start,"Deleting local variable in strict mode"),this.finishNode(e,s?"UpdateExpression":"UnaryExpression")}var r=this.start,n=this.startLoc,a=this.parseExprSubscripts(t);if(this.checkExpressionErrors(t))return a;for(;this.type.postfix&&!this.canInsertSemicolon();){var e=this.startNodeAt(r,n);e.operator=this.value,e.prefix=!1,e.argument=a,this.checkLVal(a),this.next(),a=this.finishNode(e,"UpdateExpression")}return a},n.parseExprSubscripts=function(t){var e=this.start,s=this.startLoc,i=this.parseExprAtom(t),r="ArrowFunctionExpression"===i.type&&")"!==this.input.slice(this.lastTokStart,this.lastTokEnd);return this.checkExpressionErrors(t)||r?i:this.parseSubscripts(i,e,s)},n.parseSubscripts=function(t,e,s,r){for(;;)if(this.eat(i.types.dot)){var n=this.startNodeAt(e,s);n.object=t,n.property=this.parseIdent(!0),n.computed=!1,t=this.finishNode(n,"MemberExpression")}else if(this.eat(i.types.bracketL)){var n=this.startNodeAt(e,s);n.object=t,n.property=this.parseExpression(),n.computed=!0,this.expect(i.types.bracketR),t=this.finishNode(n,"MemberExpression")}else if(!r&&this.eat(i.types.parenL)){var n=this.startNodeAt(e,s);n.callee=t,n.arguments=this.parseExprList(i.types.parenR,!1),t=this.finishNode(n,"CallExpression")}else{if(this.type!==i.types.backQuote)return t;var n=this.startNodeAt(e,s);n.tag=t,n.quasi=this.parseTemplate(),t=this.finishNode(n,"TaggedTemplateExpression")}},n.parseExprAtom=function(t){var e=void 0,s=this.potentialArrowAt==this.start;switch(this.type){case i.types._super:this.inFunction||this.raise(this.start,"'super' outside of function or class");case i.types._this:var r=this.type===i.types._this?"ThisExpression":"Super";return e=this.startNode(),this.next(),this.finishNode(e,r);case i.types._yield:this.inGenerator&&this.unexpected();case i.types.name:var n=this.start,a=this.startLoc,o=this.parseIdent(this.type!==i.types.name);return s&&!this.canInsertSemicolon()&&this.eat(i.types.arrow)?this.parseArrowExpression(this.startNodeAt(n,a),[o]):o;case i.types.regexp:var h=this.value;return e=this.parseLiteral(h.value),e.regex={pattern:h.pattern,flags:h.flags},e;case i.types.num:case i.types.string:return this.parseLiteral(this.value);case i.types._null:case i.types._true:case i.types._false:return e=this.startNode(),e.value=this.type===i.types._null?null:this.type===i.types._true,e.raw=this.type.keyword,this.next(),this.finishNode(e,"Literal");case i.types.parenL:return this.parseParenAndDistinguishExpression(s);case i.types.bracketL:return e=this.startNode(),this.next(),this.options.ecmaVersion>=7&&this.type===i.types._for?this.parseComprehension(e,!1):(e.elements=this.parseExprList(i.types.bracketR,!0,!0,t),this.finishNode(e,"ArrayExpression"));case i.types.braceL:return this.parseObj(!1,t);case i.types._function:return e=this.startNode(),this.next(),this.parseFunction(e,!1);case i.types._class:return this.parseClass(this.startNode(),!1);case i.types._new:return this.parseNew();case i.types.backQuote:return this.parseTemplate();default:this.unexpected()}},n.parseLiteral=function(t){var e=this.startNode();return e.value=t,e.raw=this.input.slice(this.start,this.end),this.next(),this.finishNode(e,"Literal")},n.parseParenExpression=function(){this.expect(i.types.parenL);var t=this.parseExpression();return this.expect(i.types.parenR),t},n.parseParenAndDistinguishExpression=function(t){var e=this.start,s=this.startLoc,r=void 0;if(this.options.ecmaVersion>=6){if(this.next(),this.options.ecmaVersion>=7&&this.type===i.types._for)return this.parseComprehension(this.startNodeAt(e,s),!0);for(var n=this.start,a=this.startLoc,o=[],h=!0,p={shorthandAssign:0,trailingComma:0},c=void 0,u=void 0;this.type!==i.types.parenR;){if(h?h=!1:this.expect(i.types.comma),this.type===i.types.ellipsis){c=this.start,o.push(this.parseParenItem(this.parseRest()));break}this.type!==i.types.parenL||u||(u=this.start),o.push(this.parseMaybeAssign(!1,p,this.parseParenItem))}var l=this.start,d=this.startLoc;if(this.expect(i.types.parenR),t&&!this.canInsertSemicolon()&&this.eat(i.types.arrow))return this.checkPatternErrors(p,!0),u&&this.unexpected(u),this.parseParenArrowList(e,s,o);o.length||this.unexpected(this.lastTokStart),c&&this.unexpected(c),this.checkExpressionErrors(p,!0),o.length>1?(r=this.startNodeAt(n,a),r.expressions=o,this.finishNodeAt(r,"SequenceExpression",l,d)):r=o[0]}else r=this.parseParenExpression();if(this.options.preserveParens){var f=this.startNodeAt(e,s);return f.expression=r,this.finishNode(f,"ParenthesizedExpression")}return r},n.parseParenItem=function(t){return t},n.parseParenArrowList=function(t,e,s){return this.parseArrowExpression(this.startNodeAt(t,e),s)};var a=[];n.parseNew=function(){var t=this.startNode(),e=this.parseIdent(!0);if(this.options.ecmaVersion>=6&&this.eat(i.types.dot))return t.meta=e,t.property=this.parseIdent(!0),"target"!==t.property.name&&this.raise(t.property.start,"The only valid meta property for new is new.target"),this.inFunction||this.raise(t.start,"new.target can only be used in functions"),this.finishNode(t,"MetaProperty");var s=this.start,r=this.startLoc;return t.callee=this.parseSubscripts(this.parseExprAtom(),s,r,!0),this.eat(i.types.parenL)?t.arguments=this.parseExprList(i.types.parenR,!1):t.arguments=a,this.finishNode(t,"NewExpression")},n.parseTemplateElement=function(){var t=this.startNode();return t.value={raw:this.input.slice(this.start,this.end).replace(/\r\n?/g,"\n"),cooked:this.value},this.next(),t.tail=this.type===i.types.backQuote,this.finishNode(t,"TemplateElement")},n.parseTemplate=function(){var t=this.startNode();this.next(),t.expressions=[];var e=this.parseTemplateElement();for(t.quasis=[e];!e.tail;)this.expect(i.types.dollarBraceL),t.expressions.push(this.parseExpression()),this.expect(i.types.braceR),t.quasis.push(e=this.parseTemplateElement());return this.next(),this.finishNode(t,"TemplateLiteral")},n.parseObj=function(t,e){var s=this.startNode(),r=!0,n={};for(s.properties=[],this.next();!this.eat(i.types.braceR);){if(r)r=!1;else if(this.expect(i.types.comma),this.afterTrailingComma(i.types.braceR))break;var a=this.startNode(),o=void 0,h=void 0,p=void 0;this.options.ecmaVersion>=6&&(a.method=!1,a.shorthand=!1,(t||e)&&(h=this.start,p=this.startLoc),t||(o=this.eat(i.types.star))),this.parsePropertyName(a),this.parsePropertyValue(a,t,o,h,p,e),this.checkPropClash(a,n),s.properties.push(this.finishNode(a,"Property"))}return this.finishNode(s,t?"ObjectPattern":"ObjectExpression")},n.parsePropertyValue=function(t,e,s,r,n,a){if(this.eat(i.types.colon))t.value=e?this.parseMaybeDefault(this.start,this.startLoc):this.parseMaybeAssign(!1,a),t.kind="init";else if(this.options.ecmaVersion>=6&&this.type===i.types.parenL)e&&this.unexpected(),t.kind="init",t.method=!0,t.value=this.parseMethod(s);else if(this.options.ecmaVersion>=5&&!t.computed&&"Identifier"===t.key.type&&("get"===t.key.name||"set"===t.key.name)&&this.type!=i.types.comma&&this.type!=i.types.braceR){(s||e)&&this.unexpected(),t.kind=t.key.name,this.parsePropertyName(t),t.value=this.parseMethod(!1);var o="get"===t.kind?0:1;if(t.value.params.length!==o){var h=t.value.start;"get"===t.kind?this.raise(h,"getter should have no params"):this.raise(h,"setter should have exactly one param")}"set"===t.kind&&"RestElement"===t.value.params[0].type&&this.raise(t.value.params[0].start,"Setter cannot use rest params")}else this.options.ecmaVersion>=6&&!t.computed&&"Identifier"===t.key.type?(t.kind="init",e?((this.keywords.test(t.key.name)||(this.strict?this.reservedWordsStrictBind:this.reservedWords).test(t.key.name))&&this.raise(t.key.start,"Binding "+t.key.name),t.value=this.parseMaybeDefault(r,n,t.key)):this.type===i.types.eq&&a?(a.shorthandAssign||(a.shorthandAssign=this.start),t.value=this.parseMaybeDefault(r,n,t.key)):t.value=t.key,t.shorthand=!0):this.unexpected()},n.parsePropertyName=function(t){if(this.options.ecmaVersion>=6){if(this.eat(i.types.bracketL))return t.computed=!0,t.key=this.parseMaybeAssign(),this.expect(i.types.bracketR),t.key;t.computed=!1}return t.key=this.type===i.types.num||this.type===i.types.string?this.parseExprAtom():this.parseIdent(!0)},n.initFunction=function(t){t.id=null,this.options.ecmaVersion>=6&&(t.generator=!1,t.expression=!1)},n.parseMethod=function(t){var e=this.startNode();return this.initFunction(e),this.expect(i.types.parenL),e.params=this.parseBindingList(i.types.parenR,!1,!1),this.options.ecmaVersion>=6&&(e.generator=t),this.parseFunctionBody(e,!1),this.finishNode(e,"FunctionExpression")},n.parseArrowExpression=function(t,e){return this.initFunction(t),t.params=this.toAssignableList(e,!0),this.parseFunctionBody(t,!0),this.finishNode(t,"ArrowFunctionExpression")},n.parseFunctionBody=function(t,e){var s=e&&this.type!==i.types.braceL;if(s)t.body=this.parseMaybeAssign(),t.expression=!0;else{var r=this.inFunction,n=this.inGenerator,a=this.labels;this.inFunction=!0,this.inGenerator=t.generator,this.labels=[],t.body=this.parseBlock(!0),t.expression=!1,this.inFunction=r,this.inGenerator=n,this.labels=a}if(this.strict||!s&&t.body.body.length&&this.isUseStrict(t.body.body[0])){var o=this.strict;this.strict=!0,t.id&&this.checkLVal(t.id,!0),this.checkParams(t),this.strict=o}else e&&this.checkParams(t)},n.checkParams=function(t){for(var e={},s=0;s<t.params.length;s++)this.checkLVal(t.params[s],!0,e)},n.parseExprList=function(t,e,s,r){for(var n=[],a=!0;!this.eat(t);){if(a)a=!1;else if(this.expect(i.types.comma),this.type===t&&r&&!r.trailingComma&&(r.trailingComma=this.lastTokStart),e&&this.afterTrailingComma(t))break;var o=void 0;o=s&&this.type===i.types.comma?null:this.type===i.types.ellipsis?this.parseSpread(r):this.parseMaybeAssign(!1,r),n.push(o)}return n},n.parseIdent=function(t){var e=this.startNode();return t&&"never"==this.options.allowReserved&&(t=!1),this.type===i.types.name?(!t&&(this.strict?this.reservedWordsStrict:this.reservedWords).test(this.value)&&(this.options.ecmaVersion>=6||this.input.slice(this.start,this.end).indexOf("\\")==-1)&&this.raise(this.start,"The keyword '"+this.value+"' is reserved"),e.name=this.value):t&&this.type.keyword?e.name=this.type.keyword:this.unexpected(),this.next(),this.finishNode(e,"Identifier")},n.parseYield=function(){var t=this.startNode();return this.next(),this.type==i.types.semi||this.canInsertSemicolon()||this.type!=i.types.star&&!this.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(i.types.star),t.argument=this.parseMaybeAssign()),this.finishNode(t,"YieldExpression")},n.parseComprehension=function(t,e){for(t.blocks=[];this.type===i.types._for;){var s=this.startNode();this.next(),this.expect(i.types.parenL),s.left=this.parseBindingAtom(),this.checkLVal(s.left,!0),this.expectContextual("of"),s.right=this.parseExpression(),this.expect(i.types.parenR),t.blocks.push(this.finishNode(s,"ComprehensionBlock"))}return t.filter=this.eat(i.types._if)?this.parseParenExpression():null,t.body=this.parseExpression(),this.expect(e?i.types.parenR:i.types.bracketR),t.generator=e,this.finishNode(t,"ComprehensionExpression")}},{"./state":10,"./tokentype":14}],2:[function(t,e,s){"use strict";function i(t,e){for(var s=65536,i=0;i<e.length;i+=2){if(s+=e[i],s>t)return!1;if(s+=e[i+1],s>=t)return!0}}function r(t,e){return t<65?36===t:t<91||(t<97?95===t:t<123||(t<=65535?t>=170&&u.test(String.fromCharCode(t)):e!==!1&&i(t,d)))}function n(t,e){return t<48?36===t:t<58||!(t<65)&&(t<91||(t<97?95===t:t<123||(t<=65535?t>=170&&l.test(String.fromCharCode(t)):e!==!1&&(i(t,d)||i(t,f)))))}s.__esModule=!0,s.isIdentifierStart=r,s.isIdentifierChar=n;var a={3:"abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",5:"class enum extends super const export import",6:"enum",strict:"implements interface let package private protected public static yield",strictBind:"eval arguments"};s.reservedWords=a;var o="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",h={5:o,6:o+" let const class extends export import yield super"};s.keywords=h;var p="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",c="‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏ᦰ-ᧀᧈᧉ᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷼-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︭︳︴﹍-﹏０-９＿",u=new RegExp("["+p+"]"),l=new RegExp("["+p+c+"]");p=c=null;var d=[0,11,2,25,2,18,2,1,2,14,3,13,35,122,70,52,268,28,4,48,48,31,17,26,6,37,11,29,3,35,5,7,2,4,43,157,99,39,9,51,157,310,10,21,11,7,153,5,3,0,2,43,2,1,4,0,3,22,11,22,10,30,98,21,11,25,71,55,7,1,65,0,16,3,2,2,2,26,45,28,4,28,36,7,2,27,28,53,11,21,11,18,14,17,111,72,955,52,76,44,33,24,27,35,42,34,4,0,13,47,15,3,22,0,38,17,2,24,133,46,39,7,3,1,3,21,2,6,2,1,2,4,4,0,32,4,287,47,21,1,2,0,185,46,82,47,21,0,60,42,502,63,32,0,449,56,1288,920,104,110,2962,1070,13266,568,8,30,114,29,19,47,17,3,32,20,6,18,881,68,12,0,67,12,16481,1,3071,106,6,12,4,8,8,9,5991,84,2,70,2,1,3,0,3,1,3,3,2,11,2,0,2,6,2,64,2,3,3,7,2,6,2,27,2,3,2,4,2,0,4,6,2,339,3,24,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,30,2,24,2,7,4149,196,1340,3,2,26,2,1,2,0,3,0,2,9,2,3,2,0,2,0,7,0,5,0,2,0,2,0,2,2,2,1,2,0,3,0,2,0,2,0,2,0,2,0,2,1,2,0,3,3,2,6,2,3,2,3,2,0,2,9,2,16,6,2,2,4,2,16,4421,42710,42,4148,12,221,16355,541],f=[509,0,227,0,150,4,294,9,1368,2,2,1,6,3,41,2,5,0,166,1,1306,2,54,14,32,9,16,3,46,10,54,9,7,2,37,13,2,9,52,0,13,2,49,13,16,9,83,11,168,11,6,9,8,2,57,0,2,6,3,1,3,2,10,0,11,1,3,6,4,4,316,19,13,9,214,6,3,8,112,16,16,9,82,12,9,9,535,9,20855,9,135,4,60,6,26,9,1016,45,17,3,19723,1,5319,4,4,5,9,7,3,6,31,3,149,2,1418,49,4305,6,792618,239]},{}],3:[function(t,e,s){"use strict";function i(t,e){return new a.Parser(e,t).parse()}function r(t,e,s){var i=new a.Parser(s,t,e);return i.nextToken(),i.parseExpression()}function n(t,e){return new a.Parser(e,t)}s.__esModule=!0,s.parse=i,s.parseExpressionAt=r,s.tokenizer=n;var a=t("./state");t("./parseutil"),t("./statement"),t("./lval"),t("./expression"),t("./location"),s.Parser=a.Parser,s.plugins=a.plugins;var o=t("./options");s.defaultOptions=o.defaultOptions;var h=t("./locutil");s.Position=h.Position,s.SourceLocation=h.SourceLocation,s.getLineInfo=h.getLineInfo;var p=t("./node");s.Node=p.Node;var c=t("./tokentype");s.TokenType=c.TokenType,s.tokTypes=c.types;var u=t("./tokencontext");s.TokContext=u.TokContext,s.tokContexts=u.types;var l=t("./identifier");s.isIdentifierChar=l.isIdentifierChar,s.isIdentifierStart=l.isIdentifierStart;var d=t("./tokenize");s.Token=d.Token;var f=t("./whitespace");s.isNewLine=f.isNewLine,s.lineBreak=f.lineBreak,s.lineBreakG=f.lineBreakG;var y="2.7.0";s.version=y},{"./expression":1,"./identifier":2,"./location":4,"./locutil":5,"./lval":6,"./node":7,"./options":8,"./parseutil":9,"./state":10,"./statement":11,"./tokencontext":12,"./tokenize":13,"./tokentype":14,"./whitespace":16}],4:[function(t,e,s){"use strict";var i=t("./state"),r=t("./locutil"),n=i.Parser.prototype;n.raise=function(t,e){var s=r.getLineInfo(this.input,t);e+=" ("+s.line+":"+s.column+")";var i=new SyntaxError(e);throw i.pos=t,i.loc=s,i.raisedAt=this.pos,i},n.curPosition=function(){if(this.options.locations)return new r.Position(this.curLine,this.pos-this.lineStart)}},{"./locutil":5,"./state":10}],5:[function(t,e,s){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var s=1,i=0;;){n.lineBreakG.lastIndex=i;var r=n.lineBreakG.exec(t);if(!(r&&r.index<e))return new a(s,e-i);++s,i=r.index+r[0].length}}s.__esModule=!0,s.getLineInfo=r;var n=t("./whitespace"),a=function(){function t(e,s){i(this,t),this.line=e,this.column=s}return t.prototype.offset=function(e){return new t(this.line,this.column+e)},t}();s.Position=a;var o=function h(t,e,s){i(this,h),this.start=e,this.end=s,null!==t.sourceFile&&(this.source=t.sourceFile)};s.SourceLocation=o},{"./whitespace":16}],6:[function(t,e,s){"use strict";var i=t("./tokentype"),r=t("./state"),n=t("./util"),a=r.Parser.prototype;a.toAssignable=function(t,e){if(this.options.ecmaVersion>=6&&t)switch(t.type){case"Identifier":case"ObjectPattern":case"ArrayPattern":break;case"ObjectExpression":t.type="ObjectPattern";for(var s=0;s<t.properties.length;s++){var i=t.properties[s];"init"!==i.kind&&this.raise(i.key.start,"Object pattern can't contain getter or setter"),this.toAssignable(i.value,e)}break;case"ArrayExpression":t.type="ArrayPattern",this.toAssignableList(t.elements,e);break;case"AssignmentExpression":if("="!==t.operator){this.raise(t.left.end,"Only '=' operator can be used for specifying default value.");break}t.type="AssignmentPattern",delete t.operator;case"AssignmentPattern":"YieldExpression"===t.right.type&&this.raise(t.right.start,"Yield expression cannot be a default value");break;case"ParenthesizedExpression":t.expression=this.toAssignable(t.expression,e);break;case"MemberExpression":if(!e)break;default:this.raise(t.start,"Assigning to rvalue")}return t},a.toAssignableList=function(t,e){var s=t.length;if(s){var i=t[s-1];if(i&&"RestElement"==i.type)--s;else if(i&&"SpreadElement"==i.type){i.type="RestElement";var r=i.argument;this.toAssignable(r,e),"Identifier"!==r.type&&"MemberExpression"!==r.type&&"ArrayPattern"!==r.type&&this.unexpected(r.start),--s}e&&"RestElement"===i.type&&"Identifier"!==i.argument.type&&this.unexpected(i.argument.start)}for(var n=0;n<s;n++){var a=t[n];a&&this.toAssignable(a,e)}return t},a.parseSpread=function(t){var e=this.startNode();return this.next(),e.argument=this.parseMaybeAssign(t),this.finishNode(e,"SpreadElement")},a.parseRest=function(t){var e=this.startNode();return this.next(),t?e.argument=this.type===i.types.name?this.parseIdent():this.unexpected():e.argument=this.type===i.types.name||this.type===i.types.bracketL?this.parseBindingAtom():this.unexpected(),this.finishNode(e,"RestElement")},a.parseBindingAtom=function(){if(this.options.ecmaVersion<6)return this.parseIdent();switch(this.type){case i.types.name:return this.parseIdent();case i.types.bracketL:var t=this.startNode();return this.next(),t.elements=this.parseBindingList(i.types.bracketR,!0,!0),this.finishNode(t,"ArrayPattern");case i.types.braceL:return this.parseObj(!0);default:this.unexpected()}},a.parseBindingList=function(t,e,s,r){for(var n=[],a=!0;!this.eat(t);)if(a?a=!1:this.expect(i.types.comma),e&&this.type===i.types.comma)n.push(null);else{if(s&&this.afterTrailingComma(t))break;if(this.type===i.types.ellipsis){var o=this.parseRest(r);this.parseBindingListItem(o),n.push(o),this.expect(t);break}var h=this.parseMaybeDefault(this.start,this.startLoc);this.parseBindingListItem(h),n.push(h)}return n},a.parseBindingListItem=function(t){return t},a.parseMaybeDefault=function(t,e,s){if(s=s||this.parseBindingAtom(),this.options.ecmaVersion<6||!this.eat(i.types.eq))return s;var r=this.startNodeAt(t,e);return r.left=s,r.right=this.parseMaybeAssign(),this.finishNode(r,"AssignmentPattern")},a.checkLVal=function(t,e,s){switch(t.type){case"Identifier":this.strict&&this.reservedWordsStrictBind.test(t.name)&&this.raise(t.start,(e?"Binding ":"Assigning to ")+t.name+" in strict mode"),s&&(n.has(s,t.name)&&this.raise(t.start,"Argument name clash"),s[t.name]=!0);break;case"MemberExpression":e&&this.raise(t.start,(e?"Binding":"Assigning to")+" member expression");break;case"ObjectPattern":for(var i=0;i<t.properties.length;i++)this.checkLVal(t.properties[i].value,e,s);break;case"ArrayPattern":for(var i=0;i<t.elements.length;i++){var r=t.elements[i];r&&this.checkLVal(r,e,s)}break;case"AssignmentPattern":this.checkLVal(t.left,e,s);break;case"RestElement":this.checkLVal(t.argument,e,s);break;case"ParenthesizedExpression":this.checkLVal(t.expression,e,s);break;default:this.raise(t.start,(e?"Binding":"Assigning to")+" rvalue")}}},{"./state":10,"./tokentype":14,"./util":15}],7:[function(t,e,s){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e,s,i){return t.type=e,t.end=s,this.options.locations&&(t.loc.end=i),this.options.ranges&&(t.range[1]=s),t}s.__esModule=!0;var n=t("./state"),a=t("./locutil"),o=function p(t,e,s){i(this,p),this.type="",this.start=e,this.end=0,t.options.locations&&(this.loc=new a.SourceLocation(t,s)),t.options.directSourceFile&&(this.sourceFile=t.options.directSourceFile),t.options.ranges&&(this.range=[e,0])};s.Node=o;var h=n.Parser.prototype;h.startNode=function(){return new o(this,this.start,this.startLoc)},h.startNodeAt=function(t,e){return new o(this,t,e)},h.finishNode=function(t,e){return r.call(this,t,e,this.lastTokEnd,this.lastTokEndLoc)},h.finishNodeAt=function(t,e,s,i){return r.call(this,t,e,s,i)}},{"./locutil":5,"./state":10}],8:[function(t,e,s){"use strict";function i(t){var e={};for(var s in o)e[s]=t&&n.has(t,s)?t[s]:o[s];return null==e.allowReserved&&(e.allowReserved=e.ecmaVersion<5),n.isArray(e.onToken)&&!function(){var t=e.onToken;e.onToken=function(e){return t.push(e)}}(),n.isArray(e.onComment)&&(e.onComment=r(e,e.onComment)),e}function r(t,e){return function(s,i,r,n,o,h){var p={type:s?"Block":"Line",value:i,start:r,end:n};t.locations&&(p.loc=new a.SourceLocation(this,o,h)),t.ranges&&(p.range=[r,n]),e.push(p)}}s.__esModule=!0,s.getOptions=i;var n=t("./util"),a=t("./locutil"),o={ecmaVersion:5,sourceType:"script",onInsertedSemicolon:null,onTrailingComma:null,allowReserved:null,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,locations:!1,onToken:null,onComment:null,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1,plugins:{}};s.defaultOptions=o},{"./locutil":5,"./util":15}],9:[function(t,e,s){"use strict";var i=t("./tokentype"),r=t("./state"),n=t("./whitespace"),a=r.Parser.prototype;a.isUseStrict=function(t){return this.options.ecmaVersion>=5&&"ExpressionStatement"===t.type&&"Literal"===t.expression.type&&"use strict"===t.expression.raw.slice(1,-1)},a.eat=function(t){return this.type===t&&(this.next(),!0)},a.isContextual=function(t){return this.type===i.types.name&&this.value===t},a.eatContextual=function(t){return this.value===t&&this.eat(i.types.name)},a.expectContextual=function(t){this.eatContextual(t)||this.unexpected()},a.canInsertSemicolon=function(){return this.type===i.types.eof||this.type===i.types.braceR||n.lineBreak.test(this.input.slice(this.lastTokEnd,this.start))},a.insertSemicolon=function(){if(this.canInsertSemicolon())return this.options.onInsertedSemicolon&&this.options.onInsertedSemicolon(this.lastTokEnd,this.lastTokEndLoc),!0},a.semicolon=function(){this.eat(i.types.semi)||this.insertSemicolon()||this.unexpected()},a.afterTrailingComma=function(t){if(this.type==t)return this.options.onTrailingComma&&this.options.onTrailingComma(this.lastTokStart,this.lastTokStartLoc),this.next(),!0},a.expect=function(t){this.eat(t)||this.unexpected()},a.unexpected=function(t){this.raise(null!=t?t:this.start,"Unexpected token")},a.checkPatternErrors=function(t,e){var s=t&&t.trailingComma;return e?void(s&&this.raise(s,"Trailing comma is not permitted in destructuring patterns")):!!s},a.checkExpressionErrors=function(t,e){var s=t&&t.shorthandAssign;return e?void(s&&this.raise(s,"Shorthand property assignments are valid only in destructuring patterns")):!!s}},{"./state":10,"./tokentype":14,"./whitespace":16}],10:[function(t,e,s){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){return new RegExp("^("+t.replace(/ /g,"|")+")$")}s.__esModule=!0;var n=t("./identifier"),a=t("./tokentype"),o=t("./whitespace"),h=t("./options"),p={};s.plugins=p;var c=function(){function t(e,s,p){i(this,t),this.options=e=h.getOptions(e),this.sourceFile=e.sourceFile,this.keywords=r(n.keywords[e.ecmaVersion>=6?6:5]);var c=e.allowReserved?"":n.reservedWords[e.ecmaVersion]+("module"==e.sourceType?" await":"");this.reservedWords=r(c);var u=(c?c+" ":"")+n.reservedWords.strict;this.reservedWordsStrict=r(u),this.reservedWordsStrictBind=r(u+" "+n.reservedWords.strictBind),this.input=String(s),this.containsEsc=!1,this.loadPlugins(e.plugins),p?(this.pos=p,this.lineStart=Math.max(0,this.input.lastIndexOf("\n",p)),this.curLine=this.input.slice(0,this.lineStart).split(o.lineBreak).length):(this.pos=this.lineStart=0,this.curLine=1),this.type=a.types.eof,this.value=null,this.start=this.end=this.pos,this.startLoc=this.endLoc=this.curPosition(),this.lastTokEndLoc=this.lastTokStartLoc=null,this.lastTokStart=this.lastTokEnd=this.pos,this.context=this.initialContext(),this.exprAllowed=!0,this.strict=this.inModule="module"===e.sourceType,this.potentialArrowAt=-1,this.inFunction=this.inGenerator=!1,this.labels=[],0===this.pos&&e.allowHashBang&&"#!"===this.input.slice(0,2)&&this.skipLineComment(2)}return t.prototype.isKeyword=function(t){return this.keywords.test(t)},t.prototype.isReservedWord=function(t){return this.reservedWords.test(t)},t.prototype.extend=function(t,e){this[t]=e(this[t])},t.prototype.loadPlugins=function(t){for(var e in t){var s=p[e];if(!s)throw new Error("Plugin '"+e+"' not found");s(this,t[e])}},t.prototype.parse=function(){var t=this.options.program||this.startNode();return this.nextToken(),this.parseTopLevel(t)},t}();s.Parser=c},{"./identifier":2,"./options":8,"./tokentype":14,"./whitespace":16}],11:[function(t,e,s){"use strict";var i=t("./tokentype"),r=t("./state"),n=t("./whitespace"),a=r.Parser.prototype;a.parseTopLevel=function(t){var e=!0;for(t.body||(t.body=[]);this.type!==i.types.eof;){var s=this.parseStatement(!0,!0);t.body.push(s),e&&(this.isUseStrict(s)&&this.setStrict(!0),e=!1)}return this.next(),this.options.ecmaVersion>=6&&(t.sourceType=this.options.sourceType),this.finishNode(t,"Program")};var o={kind:"loop"},h={kind:"switch"};a.parseStatement=function(t,e){var s=this.type,r=this.startNode();switch(s){case i.types._break:case i.types._continue:return this.parseBreakContinueStatement(r,s.keyword);case i.types._debugger:return this.parseDebuggerStatement(r);case i.types._do:return this.parseDoStatement(r);case i.types._for:return this.parseForStatement(r);case i.types._function:return!t&&this.options.ecmaVersion>=6&&this.unexpected(),this.parseFunctionStatement(r);case i.types._class:return t||this.unexpected(),this.parseClass(r,!0);case i.types._if:return this.parseIfStatement(r);case i.types._return:return this.parseReturnStatement(r);case i.types._switch:return this.parseSwitchStatement(r);case i.types._throw:return this.parseThrowStatement(r);case i.types._try:return this.parseTryStatement(r);case i.types._let:case i.types._const:t||this.unexpected();case i.types._var:return this.parseVarStatement(r,s);case i.types._while:return this.parseWhileStatement(r);case i.types._with:return this.parseWithStatement(r);case i.types.braceL:return this.parseBlock();case i.types.semi:return this.parseEmptyStatement(r);case i.types._export:case i.types._import:return this.options.allowImportExportEverywhere||(e||this.raise(this.start,"'import' and 'export' may only appear at the top level"),this.inModule||this.raise(this.start,"'import' and 'export' may appear only with 'sourceType: module'")),
	s===i.types._import?this.parseImport(r):this.parseExport(r);default:var n=this.value,a=this.parseExpression();return s===i.types.name&&"Identifier"===a.type&&this.eat(i.types.colon)?this.parseLabeledStatement(r,n,a):this.parseExpressionStatement(r,a)}},a.parseBreakContinueStatement=function(t,e){var s="break"==e;this.next(),this.eat(i.types.semi)||this.insertSemicolon()?t.label=null:this.type!==i.types.name?this.unexpected():(t.label=this.parseIdent(),this.semicolon());for(var r=0;r<this.labels.length;++r){var n=this.labels[r];if(null==t.label||n.name===t.label.name){if(null!=n.kind&&(s||"loop"===n.kind))break;if(t.label&&s)break}}return r===this.labels.length&&this.raise(t.start,"Unsyntactic "+e),this.finishNode(t,s?"BreakStatement":"ContinueStatement")},a.parseDebuggerStatement=function(t){return this.next(),this.semicolon(),this.finishNode(t,"DebuggerStatement")},a.parseDoStatement=function(t){return this.next(),this.labels.push(o),t.body=this.parseStatement(!1),this.labels.pop(),this.expect(i.types._while),t.test=this.parseParenExpression(),this.options.ecmaVersion>=6?this.eat(i.types.semi):this.semicolon(),this.finishNode(t,"DoWhileStatement")},a.parseForStatement=function(t){if(this.next(),this.labels.push(o),this.expect(i.types.parenL),this.type===i.types.semi)return this.parseFor(t,null);if(this.type===i.types._var||this.type===i.types._let||this.type===i.types._const){var e=this.startNode(),s=this.type;return this.next(),this.parseVar(e,!0,s),this.finishNode(e,"VariableDeclaration"),!(this.type===i.types._in||this.options.ecmaVersion>=6&&this.isContextual("of"))||1!==e.declarations.length||s!==i.types._var&&e.declarations[0].init?this.parseFor(t,e):this.parseForIn(t,e)}var r={shorthandAssign:0,trailingComma:0},n=this.parseExpression(!0,r);return this.type===i.types._in||this.options.ecmaVersion>=6&&this.isContextual("of")?(this.checkPatternErrors(r,!0),this.toAssignable(n),this.checkLVal(n),this.parseForIn(t,n)):(this.checkExpressionErrors(r,!0),this.parseFor(t,n))},a.parseFunctionStatement=function(t){return this.next(),this.parseFunction(t,!0)},a.parseIfStatement=function(t){return this.next(),t.test=this.parseParenExpression(),t.consequent=this.parseStatement(!1),t.alternate=this.eat(i.types._else)?this.parseStatement(!1):null,this.finishNode(t,"IfStatement")},a.parseReturnStatement=function(t){return this.inFunction||this.options.allowReturnOutsideFunction||this.raise(this.start,"'return' outside of function"),this.next(),this.eat(i.types.semi)||this.insertSemicolon()?t.argument=null:(t.argument=this.parseExpression(),this.semicolon()),this.finishNode(t,"ReturnStatement")},a.parseSwitchStatement=function(t){this.next(),t.discriminant=this.parseParenExpression(),t.cases=[],this.expect(i.types.braceL),this.labels.push(h);for(var e,s=!1;this.type!=i.types.braceR;)if(this.type===i.types._case||this.type===i.types._default){var r=this.type===i.types._case;e&&this.finishNode(e,"SwitchCase"),t.cases.push(e=this.startNode()),e.consequent=[],this.next(),r?e.test=this.parseExpression():(s&&this.raise(this.lastTokStart,"Multiple default clauses"),s=!0,e.test=null),this.expect(i.types.colon)}else e||this.unexpected(),e.consequent.push(this.parseStatement(!0));return e&&this.finishNode(e,"SwitchCase"),this.next(),this.labels.pop(),this.finishNode(t,"SwitchStatement")},a.parseThrowStatement=function(t){return this.next(),n.lineBreak.test(this.input.slice(this.lastTokEnd,this.start))&&this.raise(this.lastTokEnd,"Illegal newline after throw"),t.argument=this.parseExpression(),this.semicolon(),this.finishNode(t,"ThrowStatement")};var p=[];a.parseTryStatement=function(t){if(this.next(),t.block=this.parseBlock(),t.handler=null,this.type===i.types._catch){var e=this.startNode();this.next(),this.expect(i.types.parenL),e.param=this.parseBindingAtom(),this.checkLVal(e.param,!0),this.expect(i.types.parenR),e.body=this.parseBlock(),t.handler=this.finishNode(e,"CatchClause")}return t.finalizer=this.eat(i.types._finally)?this.parseBlock():null,t.handler||t.finalizer||this.raise(t.start,"Missing catch or finally clause"),this.finishNode(t,"TryStatement")},a.parseVarStatement=function(t,e){return this.next(),this.parseVar(t,!1,e),this.semicolon(),this.finishNode(t,"VariableDeclaration")},a.parseWhileStatement=function(t){return this.next(),t.test=this.parseParenExpression(),this.labels.push(o),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,"WhileStatement")},a.parseWithStatement=function(t){return this.strict&&this.raise(this.start,"'with' in strict mode"),this.next(),t.object=this.parseParenExpression(),t.body=this.parseStatement(!1),this.finishNode(t,"WithStatement")},a.parseEmptyStatement=function(t){return this.next(),this.finishNode(t,"EmptyStatement")},a.parseLabeledStatement=function(t,e,s){for(var r=0;r<this.labels.length;++r)this.labels[r].name===e&&this.raise(s.start,"Label '"+e+"' is already declared");for(var n=this.type.isLoop?"loop":this.type===i.types._switch?"switch":null,r=this.labels.length-1;r>=0;r--){var a=this.labels[r];if(a.statementStart!=t.start)break;a.statementStart=this.start,a.kind=n}return this.labels.push({name:e,kind:n,statementStart:this.start}),t.body=this.parseStatement(!0),this.labels.pop(),t.label=s,this.finishNode(t,"LabeledStatement")},a.parseExpressionStatement=function(t,e){return t.expression=e,this.semicolon(),this.finishNode(t,"ExpressionStatement")},a.parseBlock=function(t){var e=this.startNode(),s=!0,r=void 0;for(e.body=[],this.expect(i.types.braceL);!this.eat(i.types.braceR);){var n=this.parseStatement(!0);e.body.push(n),s&&t&&this.isUseStrict(n)&&(r=this.strict,this.setStrict(this.strict=!0)),s=!1}return r===!1&&this.setStrict(!1),this.finishNode(e,"BlockStatement")},a.parseFor=function(t,e){return t.init=e,this.expect(i.types.semi),t.test=this.type===i.types.semi?null:this.parseExpression(),this.expect(i.types.semi),t.update=this.type===i.types.parenR?null:this.parseExpression(),this.expect(i.types.parenR),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,"ForStatement")},a.parseForIn=function(t,e){var s=this.type===i.types._in?"ForInStatement":"ForOfStatement";return this.next(),t.left=e,t.right=this.parseExpression(),this.expect(i.types.parenR),t.body=this.parseStatement(!1),this.labels.pop(),this.finishNode(t,s)},a.parseVar=function(t,e,s){for(t.declarations=[],t.kind=s.keyword;;){var r=this.startNode();if(this.parseVarId(r),this.eat(i.types.eq)?r.init=this.parseMaybeAssign(e):s!==i.types._const||this.type===i.types._in||this.options.ecmaVersion>=6&&this.isContextual("of")?"Identifier"==r.id.type||e&&(this.type===i.types._in||this.isContextual("of"))?r.init=null:this.raise(this.lastTokEnd,"Complex binding patterns require an initialization value"):this.unexpected(),t.declarations.push(this.finishNode(r,"VariableDeclarator")),!this.eat(i.types.comma))break}return t},a.parseVarId=function(t){t.id=this.parseBindingAtom(),this.checkLVal(t.id,!0)},a.parseFunction=function(t,e,s){return this.initFunction(t),this.options.ecmaVersion>=6&&(t.generator=this.eat(i.types.star)),(e||this.type===i.types.name)&&(t.id=this.parseIdent()),this.parseFunctionParams(t),this.parseFunctionBody(t,s),this.finishNode(t,e?"FunctionDeclaration":"FunctionExpression")},a.parseFunctionParams=function(t){this.expect(i.types.parenL),t.params=this.parseBindingList(i.types.parenR,!1,!1,!0)},a.parseClass=function(t,e){this.next(),this.parseClassId(t,e),this.parseClassSuper(t);var s=this.startNode(),r=!1;for(s.body=[],this.expect(i.types.braceL);!this.eat(i.types.braceR);)if(!this.eat(i.types.semi)){var n=this.startNode(),a=this.eat(i.types.star),o=this.type===i.types.name&&"static"===this.value;this.parsePropertyName(n),n["static"]=o&&this.type!==i.types.parenL,n["static"]&&(a&&this.unexpected(),a=this.eat(i.types.star),this.parsePropertyName(n)),n.kind="method";var h=!1;if(!n.computed){var p=n.key;a||"Identifier"!==p.type||this.type===i.types.parenL||"get"!==p.name&&"set"!==p.name||(h=!0,n.kind=p.name,p=this.parsePropertyName(n)),!n["static"]&&("Identifier"===p.type&&"constructor"===p.name||"Literal"===p.type&&"constructor"===p.value)&&(r&&this.raise(p.start,"Duplicate constructor in the same class"),h&&this.raise(p.start,"Constructor can't have get/set modifier"),a&&this.raise(p.start,"Constructor can't be a generator"),n.kind="constructor",r=!0)}if(this.parseClassMethod(s,n,a),h){var c="get"===n.kind?0:1;if(n.value.params.length!==c){var u=n.value.start;"get"===n.kind?this.raise(u,"getter should have no params"):this.raise(u,"setter should have exactly one param")}"set"===n.kind&&"RestElement"===n.value.params[0].type&&this.raise(n.value.params[0].start,"Setter cannot use rest params")}}return t.body=this.finishNode(s,"ClassBody"),this.finishNode(t,e?"ClassDeclaration":"ClassExpression")},a.parseClassMethod=function(t,e,s){e.value=this.parseMethod(s),t.body.push(this.finishNode(e,"MethodDefinition"))},a.parseClassId=function(t,e){t.id=this.type===i.types.name?this.parseIdent():e?this.unexpected():null},a.parseClassSuper=function(t){t.superClass=this.eat(i.types._extends)?this.parseExprSubscripts():null},a.parseExport=function(t){if(this.next(),this.eat(i.types.star))return this.expectContextual("from"),t.source=this.type===i.types.string?this.parseExprAtom():this.unexpected(),this.semicolon(),this.finishNode(t,"ExportAllDeclaration");if(this.eat(i.types._default)){var e=this.parseMaybeAssign(),s=!0;return"FunctionExpression"!=e.type&&"ClassExpression"!=e.type||(s=!1,e.id&&(e.type="FunctionExpression"==e.type?"FunctionDeclaration":"ClassDeclaration")),t.declaration=e,s&&this.semicolon(),this.finishNode(t,"ExportDefaultDeclaration")}if(this.shouldParseExportStatement())t.declaration=this.parseStatement(!0),t.specifiers=[],t.source=null;else{if(t.declaration=null,t.specifiers=this.parseExportSpecifiers(),this.eatContextual("from"))t.source=this.type===i.types.string?this.parseExprAtom():this.unexpected();else{for(var r=0;r<t.specifiers.length;r++)(this.keywords.test(t.specifiers[r].local.name)||this.reservedWords.test(t.specifiers[r].local.name))&&this.unexpected(t.specifiers[r].local.start);t.source=null}this.semicolon()}return this.finishNode(t,"ExportNamedDeclaration")},a.shouldParseExportStatement=function(){return this.type.keyword},a.parseExportSpecifiers=function(){var t=[],e=!0;for(this.expect(i.types.braceL);!this.eat(i.types.braceR);){if(e)e=!1;else if(this.expect(i.types.comma),this.afterTrailingComma(i.types.braceR))break;var s=this.startNode();s.local=this.parseIdent(this.type===i.types._default),s.exported=this.eatContextual("as")?this.parseIdent(!0):s.local,t.push(this.finishNode(s,"ExportSpecifier"))}return t},a.parseImport=function(t){return this.next(),this.type===i.types.string?(t.specifiers=p,t.source=this.parseExprAtom()):(t.specifiers=this.parseImportSpecifiers(),this.expectContextual("from"),t.source=this.type===i.types.string?this.parseExprAtom():this.unexpected()),this.semicolon(),this.finishNode(t,"ImportDeclaration")},a.parseImportSpecifiers=function(){var t=[],e=!0;if(this.type===i.types.name){var s=this.startNode();if(s.local=this.parseIdent(),this.checkLVal(s.local,!0),t.push(this.finishNode(s,"ImportDefaultSpecifier")),!this.eat(i.types.comma))return t}if(this.type===i.types.star){var s=this.startNode();return this.next(),this.expectContextual("as"),s.local=this.parseIdent(),this.checkLVal(s.local,!0),t.push(this.finishNode(s,"ImportNamespaceSpecifier")),t}for(this.expect(i.types.braceL);!this.eat(i.types.braceR);){if(e)e=!1;else if(this.expect(i.types.comma),this.afterTrailingComma(i.types.braceR))break;var s=this.startNode();s.imported=this.parseIdent(!0),this.eatContextual("as")?s.local=this.parseIdent():(s.local=s.imported,this.isKeyword(s.local.name)&&this.unexpected(s.local.start),this.reservedWordsStrict.test(s.local.name)&&this.raise(s.local.start,"The keyword '"+s.local.name+"' is reserved")),this.checkLVal(s.local,!0),t.push(this.finishNode(s,"ImportSpecifier"))}return t}},{"./state":10,"./tokentype":14,"./whitespace":16}],12:[function(t,e,s){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}s.__esModule=!0;var r=t("./state"),n=t("./tokentype"),a=t("./whitespace"),o=function c(t,e,s,r){i(this,c),this.token=t,this.isExpr=!!e,this.preserveSpace=!!s,this.override=r};s.TokContext=o;var h={b_stat:new o("{",(!1)),b_expr:new o("{",(!0)),b_tmpl:new o("${",(!0)),p_stat:new o("(",(!1)),p_expr:new o("(",(!0)),q_tmpl:new o("`",(!0),(!0),function(t){return t.readTmplToken()}),f_expr:new o("function",(!0))};s.types=h;var p=r.Parser.prototype;p.initialContext=function(){return[h.b_stat]},p.braceIsBlock=function(t){if(t===n.types.colon){var e=this.curContext();if(e===h.b_stat||e===h.b_expr)return!e.isExpr}return t===n.types._return?a.lineBreak.test(this.input.slice(this.lastTokEnd,this.start)):t===n.types._else||t===n.types.semi||t===n.types.eof||t===n.types.parenR||(t==n.types.braceL?this.curContext()===h.b_stat:!this.exprAllowed)},p.updateContext=function(t){var e=void 0,s=this.type;s.keyword&&t==n.types.dot?this.exprAllowed=!1:(e=s.updateContext)?e.call(this,t):this.exprAllowed=s.beforeExpr},n.types.parenR.updateContext=n.types.braceR.updateContext=function(){if(1==this.context.length)return void(this.exprAllowed=!0);var t=this.context.pop();t===h.b_stat&&this.curContext()===h.f_expr?(this.context.pop(),this.exprAllowed=!1):t===h.b_tmpl?this.exprAllowed=!0:this.exprAllowed=!t.isExpr},n.types.braceL.updateContext=function(t){this.context.push(this.braceIsBlock(t)?h.b_stat:h.b_expr),this.exprAllowed=!0},n.types.dollarBraceL.updateContext=function(){this.context.push(h.b_tmpl),this.exprAllowed=!0},n.types.parenL.updateContext=function(t){var e=t===n.types._if||t===n.types._for||t===n.types._with||t===n.types._while;this.context.push(e?h.p_stat:h.p_expr),this.exprAllowed=!0},n.types.incDec.updateContext=function(){},n.types._function.updateContext=function(){this.curContext()!==h.b_stat&&this.context.push(h.f_expr),this.exprAllowed=!1},n.types.backQuote.updateContext=function(){this.curContext()===h.q_tmpl?this.context.pop():this.context.push(h.q_tmpl),this.exprAllowed=!1}},{"./state":10,"./tokentype":14,"./whitespace":16}],13:[function(t,e,s){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e,s,i){try{return new RegExp(t,e)}catch(r){if(void 0!==s)throw r instanceof SyntaxError&&i.raise(s,"Error parsing regular expression: "+r.message),r}}function n(t){return t<=65535?String.fromCharCode(t):(t-=65536,String.fromCharCode((t>>10)+55296,(1023&t)+56320))}s.__esModule=!0;var a=t("./identifier"),o=t("./tokentype"),h=t("./state"),p=t("./locutil"),c=t("./whitespace"),u=function y(t){i(this,y),this.type=t.type,this.value=t.value,this.start=t.start,this.end=t.end,t.options.locations&&(this.loc=new p.SourceLocation(t,t.startLoc,t.endLoc)),t.options.ranges&&(this.range=[t.start,t.end])};s.Token=u;var l=h.Parser.prototype,d="object"==typeof Packages&&"[object JavaPackage]"==Object.prototype.toString.call(Packages);l.next=function(){this.options.onToken&&this.options.onToken(new u(this)),this.lastTokEnd=this.end,this.lastTokStart=this.start,this.lastTokEndLoc=this.endLoc,this.lastTokStartLoc=this.startLoc,this.nextToken()},l.getToken=function(){return this.next(),new u(this)},"undefined"!=typeof Symbol&&(l[Symbol.iterator]=function(){var t=this;return{next:function(){var e=t.getToken();return{done:e.type===o.types.eof,value:e}}}}),l.setStrict=function(t){if(this.strict=t,this.type===o.types.num||this.type===o.types.string){if(this.pos=this.start,this.options.locations)for(;this.pos<this.lineStart;)this.lineStart=this.input.lastIndexOf("\n",this.lineStart-2)+1,--this.curLine;this.nextToken()}},l.curContext=function(){return this.context[this.context.length-1]},l.nextToken=function(){var t=this.curContext();return t&&t.preserveSpace||this.skipSpace(),this.start=this.pos,this.options.locations&&(this.startLoc=this.curPosition()),this.pos>=this.input.length?this.finishToken(o.types.eof):t.override?t.override(this):void this.readToken(this.fullCharCodeAtPos())},l.readToken=function(t){return a.isIdentifierStart(t,this.options.ecmaVersion>=6)||92===t?this.readWord():this.getTokenFromCode(t)},l.fullCharCodeAtPos=function(){var t=this.input.charCodeAt(this.pos);if(t<=55295||t>=57344)return t;var e=this.input.charCodeAt(this.pos+1);return(t<<10)+e-56613888},l.skipBlockComment=function(){var t=this.options.onComment&&this.curPosition(),e=this.pos,s=this.input.indexOf("*/",this.pos+=2);if(s===-1&&this.raise(this.pos-2,"Unterminated comment"),this.pos=s+2,this.options.locations){c.lineBreakG.lastIndex=e;for(var i=void 0;(i=c.lineBreakG.exec(this.input))&&i.index<this.pos;)++this.curLine,this.lineStart=i.index+i[0].length}this.options.onComment&&this.options.onComment(!0,this.input.slice(e+2,s),e,this.pos,t,this.curPosition())},l.skipLineComment=function(t){for(var e=this.pos,s=this.options.onComment&&this.curPosition(),i=this.input.charCodeAt(this.pos+=t);this.pos<this.input.length&&10!==i&&13!==i&&8232!==i&&8233!==i;)++this.pos,i=this.input.charCodeAt(this.pos);this.options.onComment&&this.options.onComment(!1,this.input.slice(e+t,this.pos),e,this.pos,s,this.curPosition())},l.skipSpace=function(){t:for(;this.pos<this.input.length;){var t=this.input.charCodeAt(this.pos);switch(t){case 32:case 160:++this.pos;break;case 13:10===this.input.charCodeAt(this.pos+1)&&++this.pos;case 10:case 8232:case 8233:++this.pos,this.options.locations&&(++this.curLine,this.lineStart=this.pos);break;case 47:switch(this.input.charCodeAt(this.pos+1)){case 42:this.skipBlockComment();break;case 47:this.skipLineComment(2);break;default:break t}break;default:if(!(t>8&&t<14||t>=5760&&c.nonASCIIwhitespace.test(String.fromCharCode(t))))break t;++this.pos}}},l.finishToken=function(t,e){this.end=this.pos,this.options.locations&&(this.endLoc=this.curPosition());var s=this.type;this.type=t,this.value=e,this.updateContext(s)},l.readToken_dot=function(){var t=this.input.charCodeAt(this.pos+1);if(t>=48&&t<=57)return this.readNumber(!0);var e=this.input.charCodeAt(this.pos+2);return this.options.ecmaVersion>=6&&46===t&&46===e?(this.pos+=3,this.finishToken(o.types.ellipsis)):(++this.pos,this.finishToken(o.types.dot))},l.readToken_slash=function(){var t=this.input.charCodeAt(this.pos+1);return this.exprAllowed?(++this.pos,this.readRegexp()):61===t?this.finishOp(o.types.assign,2):this.finishOp(o.types.slash,1)},l.readToken_mult_modulo=function(t){var e=this.input.charCodeAt(this.pos+1);return 61===e?this.finishOp(o.types.assign,2):this.finishOp(42===t?o.types.star:o.types.modulo,1)},l.readToken_pipe_amp=function(t){var e=this.input.charCodeAt(this.pos+1);return e===t?this.finishOp(124===t?o.types.logicalOR:o.types.logicalAND,2):61===e?this.finishOp(o.types.assign,2):this.finishOp(124===t?o.types.bitwiseOR:o.types.bitwiseAND,1)},l.readToken_caret=function(){var t=this.input.charCodeAt(this.pos+1);return 61===t?this.finishOp(o.types.assign,2):this.finishOp(o.types.bitwiseXOR,1)},l.readToken_plus_min=function(t){var e=this.input.charCodeAt(this.pos+1);return e===t?45==e&&62==this.input.charCodeAt(this.pos+2)&&c.lineBreak.test(this.input.slice(this.lastTokEnd,this.pos))?(this.skipLineComment(3),this.skipSpace(),this.nextToken()):this.finishOp(o.types.incDec,2):61===e?this.finishOp(o.types.assign,2):this.finishOp(o.types.plusMin,1)},l.readToken_lt_gt=function(t){var e=this.input.charCodeAt(this.pos+1),s=1;return e===t?(s=62===t&&62===this.input.charCodeAt(this.pos+2)?3:2,61===this.input.charCodeAt(this.pos+s)?this.finishOp(o.types.assign,s+1):this.finishOp(o.types.bitShift,s)):33==e&&60==t&&45==this.input.charCodeAt(this.pos+2)&&45==this.input.charCodeAt(this.pos+3)?(this.inModule&&this.unexpected(),this.skipLineComment(4),this.skipSpace(),this.nextToken()):(61===e&&(s=61===this.input.charCodeAt(this.pos+2)?3:2),this.finishOp(o.types.relational,s))},l.readToken_eq_excl=function(t){var e=this.input.charCodeAt(this.pos+1);return 61===e?this.finishOp(o.types.equality,61===this.input.charCodeAt(this.pos+2)?3:2):61===t&&62===e&&this.options.ecmaVersion>=6?(this.pos+=2,this.finishToken(o.types.arrow)):this.finishOp(61===t?o.types.eq:o.types.prefix,1)},l.getTokenFromCode=function(t){switch(t){case 46:return this.readToken_dot();case 40:return++this.pos,this.finishToken(o.types.parenL);case 41:return++this.pos,this.finishToken(o.types.parenR);case 59:return++this.pos,this.finishToken(o.types.semi);case 44:return++this.pos,this.finishToken(o.types.comma);case 91:return++this.pos,this.finishToken(o.types.bracketL);case 93:return++this.pos,this.finishToken(o.types.bracketR);case 123:return++this.pos,this.finishToken(o.types.braceL);case 125:return++this.pos,this.finishToken(o.types.braceR);case 58:return++this.pos,this.finishToken(o.types.colon);case 63:return++this.pos,this.finishToken(o.types.question);case 96:if(this.options.ecmaVersion<6)break;return++this.pos,this.finishToken(o.types.backQuote);case 48:var e=this.input.charCodeAt(this.pos+1);if(120===e||88===e)return this.readRadixNumber(16);if(this.options.ecmaVersion>=6){if(111===e||79===e)return this.readRadixNumber(8);if(98===e||66===e)return this.readRadixNumber(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return this.readNumber(!1);case 34:case 39:return this.readString(t);case 47:return this.readToken_slash();case 37:case 42:return this.readToken_mult_modulo(t);case 124:case 38:return this.readToken_pipe_amp(t);case 94:return this.readToken_caret();case 43:case 45:return this.readToken_plus_min(t);case 60:case 62:return this.readToken_lt_gt(t);case 61:case 33:return this.readToken_eq_excl(t);case 126:return this.finishOp(o.types.prefix,1)}this.raise(this.pos,"Unexpected character '"+n(t)+"'")},l.finishOp=function(t,e){var s=this.input.slice(this.pos,this.pos+e);return this.pos+=e,this.finishToken(t,s)};var f=!!r("￿","u");l.readRegexp=function(){for(var t=this,e=void 0,s=void 0,i=this.pos;;){this.pos>=this.input.length&&this.raise(i,"Unterminated regular expression");var n=this.input.charAt(this.pos);if(c.lineBreak.test(n)&&this.raise(i,"Unterminated regular expression"),e)e=!1;else{if("["===n)s=!0;else if("]"===n&&s)s=!1;else if("/"===n&&!s)break;e="\\"===n}++this.pos}var a=this.input.slice(i,this.pos);++this.pos;var h=this.readWord1(),p=a;if(h){var u=/^[gim]*$/;this.options.ecmaVersion>=6&&(u=/^[gimuy]*$/),u.test(h)||this.raise(i,"Invalid regular expression flag"),h.indexOf("u")>=0&&!f&&(p=p.replace(/\\u\{([0-9a-fA-F]+)\}/g,function(e,s,r){return s=Number("0x"+s),s>1114111&&t.raise(i+r+3,"Code point out of bounds"),"x"}),p=p.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x"))}var l=null;return d||(r(p,void 0,i,this),l=r(a,h)),this.finishToken(o.types.regexp,{pattern:a,flags:h,value:l})},l.readInt=function(t,e){for(var s=this.pos,i=0,r=0,n=null==e?1/0:e;r<n;++r){var a=this.input.charCodeAt(this.pos),o=void 0;if(o=a>=97?a-97+10:a>=65?a-65+10:a>=48&&a<=57?a-48:1/0,o>=t)break;++this.pos,i=i*t+o}return this.pos===s||null!=e&&this.pos-s!==e?null:i},l.readRadixNumber=function(t){this.pos+=2;var e=this.readInt(t);return null==e&&this.raise(this.start+2,"Expected number in radix "+t),a.isIdentifierStart(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number"),this.finishToken(o.types.num,e)},l.readNumber=function(t){var e=this.pos,s=!1,i=48===this.input.charCodeAt(this.pos);t||null!==this.readInt(10)||this.raise(e,"Invalid number");var r=this.input.charCodeAt(this.pos);46===r&&(++this.pos,this.readInt(10),s=!0,r=this.input.charCodeAt(this.pos)),69!==r&&101!==r||(r=this.input.charCodeAt(++this.pos),43!==r&&45!==r||++this.pos,null===this.readInt(10)&&this.raise(e,"Invalid number"),s=!0),a.isIdentifierStart(this.fullCharCodeAtPos())&&this.raise(this.pos,"Identifier directly after number");var n=this.input.slice(e,this.pos),h=void 0;return s?h=parseFloat(n):i&&1!==n.length?/[89]/.test(n)||this.strict?this.raise(e,"Invalid number"):h=parseInt(n,8):h=parseInt(n,10),this.finishToken(o.types.num,h)},l.readCodePoint=function(){var t=this.input.charCodeAt(this.pos),e=void 0;if(123===t){this.options.ecmaVersion<6&&this.unexpected();var s=++this.pos;e=this.readHexChar(this.input.indexOf("}",this.pos)-this.pos),++this.pos,e>1114111&&this.raise(s,"Code point out of bounds")}else e=this.readHexChar(4);return e},l.readString=function(t){for(var e="",s=++this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated string constant");var i=this.input.charCodeAt(this.pos);if(i===t)break;92===i?(e+=this.input.slice(s,this.pos),e+=this.readEscapedChar(!1),s=this.pos):(c.isNewLine(i)&&this.raise(this.start,"Unterminated string constant"),++this.pos)}return e+=this.input.slice(s,this.pos++),this.finishToken(o.types.string,e)},l.readTmplToken=function(){for(var t="",e=this.pos;;){this.pos>=this.input.length&&this.raise(this.start,"Unterminated template");var s=this.input.charCodeAt(this.pos);if(96===s||36===s&&123===this.input.charCodeAt(this.pos+1))return this.pos===this.start&&this.type===o.types.template?36===s?(this.pos+=2,this.finishToken(o.types.dollarBraceL)):(++this.pos,this.finishToken(o.types.backQuote)):(t+=this.input.slice(e,this.pos),this.finishToken(o.types.template,t));if(92===s)t+=this.input.slice(e,this.pos),t+=this.readEscapedChar(!0),e=this.pos;else if(c.isNewLine(s)){switch(t+=this.input.slice(e,this.pos),++this.pos,s){case 13:10===this.input.charCodeAt(this.pos)&&++this.pos;case 10:t+="\n";break;default:t+=String.fromCharCode(s)}this.options.locations&&(++this.curLine,this.lineStart=this.pos),e=this.pos}else++this.pos}},l.readEscapedChar=function(t){var e=this.input.charCodeAt(++this.pos);switch(++this.pos,e){case 110:return"\n";case 114:return"\r";case 120:return String.fromCharCode(this.readHexChar(2));case 117:return n(this.readCodePoint());case 116:return"\t";case 98:return"\b";case 118:return"\x0B";case 102:return"\f";case 13:10===this.input.charCodeAt(this.pos)&&++this.pos;case 10:return this.options.locations&&(this.lineStart=this.pos,++this.curLine),"";default:if(e>=48&&e<=55){var s=this.input.substr(this.pos-1,3).match(/^[0-7]+/)[0],i=parseInt(s,8);return i>255&&(s=s.slice(0,-1),i=parseInt(s,8)),"0"!==s&&(this.strict||t)&&this.raise(this.pos-2,"Octal literal in strict mode"),this.pos+=s.length-1,String.fromCharCode(i)}return String.fromCharCode(e)}},l.readHexChar=function(t){var e=this.pos,s=this.readInt(16,t);return null===s&&this.raise(e,"Bad character escape sequence"),s},l.readWord1=function(){this.containsEsc=!1;for(var t="",e=!0,s=this.pos,i=this.options.ecmaVersion>=6;this.pos<this.input.length;){var r=this.fullCharCodeAtPos();if(a.isIdentifierChar(r,i))this.pos+=r<=65535?1:2;else{if(92!==r)break;this.containsEsc=!0,t+=this.input.slice(s,this.pos);var o=this.pos;117!=this.input.charCodeAt(++this.pos)&&this.raise(this.pos,"Expecting Unicode escape sequence \\uXXXX"),++this.pos;var h=this.readCodePoint();(e?a.isIdentifierStart:a.isIdentifierChar)(h,i)||this.raise(o,"Invalid Unicode escape"),t+=n(h),s=this.pos}e=!1}return t+this.input.slice(s,this.pos)},l.readWord=function(){var t=this.readWord1(),e=o.types.name;return(this.options.ecmaVersion>=6||!this.containsEsc)&&this.keywords.test(t)&&(e=o.keywords[t]),this.finishToken(e,t)}},{"./identifier":2,"./locutil":5,"./state":10,"./tokentype":14,"./whitespace":16}],14:[function(t,e,s){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){return new a(t,{beforeExpr:!0,binop:e})}function n(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];e.keyword=t,c[t]=p["_"+t]=new a(t,e)}s.__esModule=!0;var a=function u(t){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];i(this,u),this.label=t,this.keyword=e.keyword,this.beforeExpr=!!e.beforeExpr,this.startsExpr=!!e.startsExpr,this.isLoop=!!e.isLoop,this.isAssign=!!e.isAssign,this.prefix=!!e.prefix,this.postfix=!!e.postfix,this.binop=e.binop||null,this.updateContext=null};s.TokenType=a;var o={beforeExpr:!0},h={startsExpr:!0},p={num:new a("num",h),regexp:new a("regexp",h),string:new a("string",h),name:new a("name",h),eof:new a("eof"),bracketL:new a("[",{beforeExpr:!0,startsExpr:!0}),bracketR:new a("]"),braceL:new a("{",{beforeExpr:!0,startsExpr:!0}),braceR:new a("}"),parenL:new a("(",{beforeExpr:!0,startsExpr:!0}),parenR:new a(")"),comma:new a(",",o),semi:new a(";",o),colon:new a(":",o),dot:new a("."),question:new a("?",o),arrow:new a("=>",o),template:new a("template"),ellipsis:new a("...",o),backQuote:new a("`",h),dollarBraceL:new a("${",{beforeExpr:!0,startsExpr:!0}),eq:new a("=",{beforeExpr:!0,isAssign:!0}),assign:new a("_=",{beforeExpr:!0,isAssign:!0}),incDec:new a("++/--",{prefix:!0,postfix:!0,startsExpr:!0}),prefix:new a("prefix",{beforeExpr:!0,prefix:!0,startsExpr:!0}),logicalOR:r("||",1),logicalAND:r("&&",2),bitwiseOR:r("|",3),bitwiseXOR:r("^",4),bitwiseAND:r("&",5),equality:r("==/!=",6),relational:r("</>",7),bitShift:r("<</>>",8),plusMin:new a("+/-",{beforeExpr:!0,binop:9,prefix:!0,startsExpr:!0}),modulo:r("%",10),star:r("*",10),slash:r("/",10)};s.types=p;var c={};s.keywords=c,n("break"),n("case",o),n("catch"),n("continue"),n("debugger"),n("default",o),n("do",{isLoop:!0,beforeExpr:!0}),n("else",o),n("finally"),n("for",{isLoop:!0}),n("function",h),n("if"),n("return",o),n("switch"),n("throw",o),n("try"),n("var"),n("let"),n("const"),n("while",{isLoop:!0}),n("with"),n("new",{beforeExpr:!0,startsExpr:!0}),n("this",h),n("super",h),n("class"),n("extends",o),n("export"),n("import"),n("yield",{beforeExpr:!0,startsExpr:!0}),n("null",h),n("true",h),n("false",h),n("in",{beforeExpr:!0,binop:7}),n("instanceof",{beforeExpr:!0,binop:7}),n("typeof",{beforeExpr:!0,prefix:!0,startsExpr:!0}),n("void",{beforeExpr:!0,prefix:!0,startsExpr:!0}),n("delete",{beforeExpr:!0,prefix:!0,startsExpr:!0})},{}],15:[function(t,e,s){"use strict";function i(t){return"[object Array]"===Object.prototype.toString.call(t)}function r(t,e){return Object.prototype.hasOwnProperty.call(t,e)}s.__esModule=!0,s.isArray=i,s.has=r},{}],16:[function(t,e,s){"use strict";function i(t){return 10===t||13===t||8232===t||8233==t}s.__esModule=!0,s.isNewLine=i;var r=/\r\n?|\n|\u2028|\u2029/;s.lineBreak=r;var n=new RegExp(r.source,"g");s.lineBreakG=n;var a=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;s.nonASCIIwhitespace=a},{}]},{},[3])(3)});

/***/ },

/***/ "./node_modules/tern/node_modules/acorn/dist/acorn_loose.js":
/***/ function(module, exports, __webpack_require__) {

	var require;var require;!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(e.acorn||(e.acorn={})).loose=t()}}(function(){return function t(e,s,i){function r(n,a){if(!s[n]){if(!e[n]){var h="function"==typeof require&&require;if(!a&&h)return require(n,!0);if(o)return o(n,!0);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}var u=s[n]={exports:{}};e[n][0].call(u.exports,function(t){var s=e[n][1][t];return r(s?s:t)},u,u.exports,t,e,s,i)}return s[n].exports}for(var o="function"==typeof require&&require,n=0;n<i.length;n++)r(i[n]);return r}({1:[function(t,e,s){"use strict";e.exports="undefined"!=typeof acorn?acorn:__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn.js")},{}],2:[function(t,e,s){"use strict";var i=t("./state"),r=t("./parseutil"),o=t(".."),n=i.LooseParser.prototype;n.checkLVal=function(t){if(!t)return t;switch(t.type){case"Identifier":case"MemberExpression":return t;case"ParenthesizedExpression":return t.expression=this.checkLVal(t.expression),t;default:return this.dummyIdent()}},n.parseExpression=function(t){var e=this.storeCurrentPos(),s=this.parseMaybeAssign(t);if(this.tok.type===o.tokTypes.comma){var i=this.startNodeAt(e);for(i.expressions=[s];this.eat(o.tokTypes.comma);)i.expressions.push(this.parseMaybeAssign(t));return this.finishNode(i,"SequenceExpression")}return s},n.parseParenExpression=function(){this.pushCx(),this.expect(o.tokTypes.parenL);var t=this.parseExpression();return this.popCx(),this.expect(o.tokTypes.parenR),t},n.parseMaybeAssign=function(t){var e=this.storeCurrentPos(),s=this.parseMaybeConditional(t);if(this.tok.type.isAssign){var i=this.startNodeAt(e);return i.operator=this.tok.value,i.left=this.tok.type===o.tokTypes.eq?this.toAssignable(s):this.checkLVal(s),this.next(),i.right=this.parseMaybeAssign(t),this.finishNode(i,"AssignmentExpression")}return s},n.parseMaybeConditional=function(t){var e=this.storeCurrentPos(),s=this.parseExprOps(t);if(this.eat(o.tokTypes.question)){var i=this.startNodeAt(e);return i.test=s,i.consequent=this.parseMaybeAssign(),i.alternate=this.expect(o.tokTypes.colon)?this.parseMaybeAssign(t):this.dummyIdent(),this.finishNode(i,"ConditionalExpression")}return s},n.parseExprOps=function(t){var e=this.storeCurrentPos(),s=this.curIndent,i=this.curLineStart;return this.parseExprOp(this.parseMaybeUnary(t),e,-1,t,s,i)},n.parseExprOp=function(t,e,s,i,r,n){if(this.curLineStart!=n&&this.curIndent<r&&this.tokenStartsLine())return t;var a=this.tok.type.binop;if(null!=a&&(!i||this.tok.type!==o.tokTypes._in)&&a>s){var h=this.startNodeAt(e);if(h.left=t,h.operator=this.tok.value,this.next(),this.curLineStart!=n&&this.curIndent<r&&this.tokenStartsLine())h.right=this.dummyIdent();else{var p=this.storeCurrentPos();h.right=this.parseExprOp(this.parseMaybeUnary(i),p,a,i,r,n)}return this.finishNode(h,/&&|\|\|/.test(h.operator)?"LogicalExpression":"BinaryExpression"),this.parseExprOp(h,e,s,i,r,n)}return t},n.parseMaybeUnary=function(t){if(this.tok.type.prefix){var e=this.startNode(),s=this.tok.type===o.tokTypes.incDec;return e.operator=this.tok.value,e.prefix=!0,this.next(),e.argument=this.parseMaybeUnary(t),s&&(e.argument=this.checkLVal(e.argument)),this.finishNode(e,s?"UpdateExpression":"UnaryExpression")}if(this.tok.type===o.tokTypes.ellipsis){var e=this.startNode();return this.next(),e.argument=this.parseMaybeUnary(t),this.finishNode(e,"SpreadElement")}for(var i=this.storeCurrentPos(),r=this.parseExprSubscripts();this.tok.type.postfix&&!this.canInsertSemicolon();){var e=this.startNodeAt(i);e.operator=this.tok.value,e.prefix=!1,e.argument=this.checkLVal(r),this.next(),r=this.finishNode(e,"UpdateExpression")}return r},n.parseExprSubscripts=function(){var t=this.storeCurrentPos();return this.parseSubscripts(this.parseExprAtom(),t,!1,this.curIndent,this.curLineStart)},n.parseSubscripts=function(t,e,s,i,r){for(;;){if(this.curLineStart!=r&&this.curIndent<=i&&this.tokenStartsLine()){if(this.tok.type!=o.tokTypes.dot||this.curIndent!=i)return t;--i}if(this.eat(o.tokTypes.dot)){var n=this.startNodeAt(e);n.object=t,this.curLineStart!=r&&this.curIndent<=i&&this.tokenStartsLine()?n.property=this.dummyIdent():n.property=this.parsePropertyAccessor()||this.dummyIdent(),n.computed=!1,t=this.finishNode(n,"MemberExpression")}else if(this.tok.type==o.tokTypes.bracketL){this.pushCx(),this.next();var n=this.startNodeAt(e);n.object=t,n.property=this.parseExpression(),n.computed=!0,this.popCx(),this.expect(o.tokTypes.bracketR),t=this.finishNode(n,"MemberExpression")}else if(s||this.tok.type!=o.tokTypes.parenL){if(this.tok.type!=o.tokTypes.backQuote)return t;var n=this.startNodeAt(e);n.tag=t,n.quasi=this.parseTemplate(),t=this.finishNode(n,"TaggedTemplateExpression")}else{var n=this.startNodeAt(e);n.callee=t,n.arguments=this.parseExprList(o.tokTypes.parenR),t=this.finishNode(n,"CallExpression")}}},n.parseExprAtom=function(){var t=void 0;switch(this.tok.type){case o.tokTypes._this:case o.tokTypes._super:var e=this.tok.type===o.tokTypes._this?"ThisExpression":"Super";return t=this.startNode(),this.next(),this.finishNode(t,e);case o.tokTypes.name:var s=this.storeCurrentPos(),i=this.parseIdent();return this.eat(o.tokTypes.arrow)?this.parseArrowExpression(this.startNodeAt(s),[i]):i;case o.tokTypes.regexp:t=this.startNode();var n=this.tok.value;return t.regex={pattern:n.pattern,flags:n.flags},t.value=n.value,t.raw=this.input.slice(this.tok.start,this.tok.end),this.next(),this.finishNode(t,"Literal");case o.tokTypes.num:case o.tokTypes.string:return t=this.startNode(),t.value=this.tok.value,t.raw=this.input.slice(this.tok.start,this.tok.end),this.next(),this.finishNode(t,"Literal");case o.tokTypes._null:case o.tokTypes._true:case o.tokTypes._false:return t=this.startNode(),t.value=this.tok.type===o.tokTypes._null?null:this.tok.type===o.tokTypes._true,t.raw=this.tok.type.keyword,this.next(),this.finishNode(t,"Literal");case o.tokTypes.parenL:var a=this.storeCurrentPos();this.next();var h=this.parseExpression();if(this.expect(o.tokTypes.parenR),this.eat(o.tokTypes.arrow))return this.parseArrowExpression(this.startNodeAt(a),h.expressions||(r.isDummy(h)?[]:[h]));if(this.options.preserveParens){var p=this.startNodeAt(a);p.expression=h,h=this.finishNode(p,"ParenthesizedExpression")}return h;case o.tokTypes.bracketL:return t=this.startNode(),t.elements=this.parseExprList(o.tokTypes.bracketR,!0),this.finishNode(t,"ArrayExpression");case o.tokTypes.braceL:return this.parseObj();case o.tokTypes._class:return this.parseClass();case o.tokTypes._function:return t=this.startNode(),this.next(),this.parseFunction(t,!1);case o.tokTypes._new:return this.parseNew();case o.tokTypes._yield:return t=this.startNode(),this.next(),this.semicolon()||this.canInsertSemicolon()||this.tok.type!=o.tokTypes.star&&!this.tok.type.startsExpr?(t.delegate=!1,t.argument=null):(t.delegate=this.eat(o.tokTypes.star),t.argument=this.parseMaybeAssign()),this.finishNode(t,"YieldExpression");case o.tokTypes.backQuote:return this.parseTemplate();default:return this.dummyIdent()}},n.parseNew=function(){var t=this.startNode(),e=this.curIndent,s=this.curLineStart,i=this.parseIdent(!0);if(this.options.ecmaVersion>=6&&this.eat(o.tokTypes.dot))return t.meta=i,t.property=this.parseIdent(!0),this.finishNode(t,"MetaProperty");var r=this.storeCurrentPos();return t.callee=this.parseSubscripts(this.parseExprAtom(),r,!0,e,s),this.tok.type==o.tokTypes.parenL?t.arguments=this.parseExprList(o.tokTypes.parenR):t.arguments=[],this.finishNode(t,"NewExpression")},n.parseTemplateElement=function(){var t=this.startNode();return t.value={raw:this.input.slice(this.tok.start,this.tok.end).replace(/\r\n?/g,"\n"),cooked:this.tok.value},this.next(),t.tail=this.tok.type===o.tokTypes.backQuote,this.finishNode(t,"TemplateElement")},n.parseTemplate=function(){var t=this.startNode();this.next(),t.expressions=[];var e=this.parseTemplateElement();for(t.quasis=[e];!e.tail;)this.next(),t.expressions.push(this.parseExpression()),this.expect(o.tokTypes.braceR)?e=this.parseTemplateElement():(e=this.startNode(),e.value={cooked:"",raw:""},e.tail=!0),t.quasis.push(e);return this.expect(o.tokTypes.backQuote),this.finishNode(t,"TemplateLiteral")},n.parseObj=function(){var t=this.startNode();t.properties=[],this.pushCx();var e=this.curIndent+1,s=this.curLineStart;for(this.eat(o.tokTypes.braceL),this.curIndent+1<e&&(e=this.curIndent,s=this.curLineStart);!this.closes(o.tokTypes.braceR,e,s);){var i=this.startNode(),n=void 0,a=void 0;if(this.options.ecmaVersion>=6&&(a=this.storeCurrentPos(),i.method=!1,i.shorthand=!1,n=this.eat(o.tokTypes.star)),this.parsePropertyName(i),r.isDummy(i.key))r.isDummy(this.parseMaybeAssign())&&this.next(),this.eat(o.tokTypes.comma);else{if(this.eat(o.tokTypes.colon))i.kind="init",i.value=this.parseMaybeAssign();else if(this.options.ecmaVersion>=6&&(this.tok.type===o.tokTypes.parenL||this.tok.type===o.tokTypes.braceL))i.kind="init",i.method=!0,i.value=this.parseMethod(n);else if(this.options.ecmaVersion>=5&&"Identifier"===i.key.type&&!i.computed&&("get"===i.key.name||"set"===i.key.name)&&this.tok.type!=o.tokTypes.comma&&this.tok.type!=o.tokTypes.braceR)i.kind=i.key.name,this.parsePropertyName(i),i.value=this.parseMethod(!1);else{if(i.kind="init",this.options.ecmaVersion>=6)if(this.eat(o.tokTypes.eq)){var h=this.startNodeAt(a);h.operator="=",h.left=i.key,h.right=this.parseMaybeAssign(),i.value=this.finishNode(h,"AssignmentExpression")}else i.value=i.key;else i.value=this.dummyIdent();i.shorthand=!0}t.properties.push(this.finishNode(i,"Property")),this.eat(o.tokTypes.comma)}}return this.popCx(),this.eat(o.tokTypes.braceR)||(this.last.end=this.tok.start,this.options.locations&&(this.last.loc.end=this.tok.loc.start)),this.finishNode(t,"ObjectExpression")},n.parsePropertyName=function(t){if(this.options.ecmaVersion>=6){if(this.eat(o.tokTypes.bracketL))return t.computed=!0,t.key=this.parseExpression(),void this.expect(o.tokTypes.bracketR);t.computed=!1}var e=this.tok.type===o.tokTypes.num||this.tok.type===o.tokTypes.string?this.parseExprAtom():this.parseIdent();t.key=e||this.dummyIdent()},n.parsePropertyAccessor=function(){if(this.tok.type===o.tokTypes.name||this.tok.type.keyword)return this.parseIdent()},n.parseIdent=function(){var t=this.tok.type===o.tokTypes.name?this.tok.value:this.tok.type.keyword;if(!t)return this.dummyIdent();var e=this.startNode();return this.next(),e.name=t,this.finishNode(e,"Identifier")},n.initFunction=function(t){t.id=null,t.params=[],this.options.ecmaVersion>=6&&(t.generator=!1,t.expression=!1)},n.toAssignable=function(t,e){if(!t||"Identifier"==t.type||"MemberExpression"==t.type&&!e);else if("ParenthesizedExpression"==t.type)t.expression=this.toAssignable(t.expression,e);else{if(this.options.ecmaVersion<6)return this.dummyIdent();if("ObjectExpression"==t.type){t.type="ObjectPattern";for(var s=t.properties,i=0;i<s.length;i++)s[i].value=this.toAssignable(s[i].value,e)}else if("ArrayExpression"==t.type)t.type="ArrayPattern",this.toAssignableList(t.elements,e);else if("SpreadElement"==t.type)t.type="RestElement",t.argument=this.toAssignable(t.argument,e);else{if("AssignmentExpression"!=t.type)return this.dummyIdent();t.type="AssignmentPattern",delete t.operator}}return t},n.toAssignableList=function(t,e){for(var s=0;s<t.length;s++)t[s]=this.toAssignable(t[s],e);return t},n.parseFunctionParams=function(t){return t=this.parseExprList(o.tokTypes.parenR),this.toAssignableList(t,!0)},n.parseMethod=function(t){var e=this.startNode();return this.initFunction(e),e.params=this.parseFunctionParams(),e.generator=t||!1,e.expression=this.options.ecmaVersion>=6&&this.tok.type!==o.tokTypes.braceL,e.body=e.expression?this.parseMaybeAssign():this.parseBlock(),this.finishNode(e,"FunctionExpression")},n.parseArrowExpression=function(t,e){return this.initFunction(t),t.params=this.toAssignableList(e,!0),t.expression=this.tok.type!==o.tokTypes.braceL,t.body=t.expression?this.parseMaybeAssign():this.parseBlock(),this.finishNode(t,"ArrowFunctionExpression")},n.parseExprList=function(t,e){this.pushCx();var s=this.curIndent,i=this.curLineStart,n=[];for(this.next();!this.closes(t,s+1,i);)if(this.eat(o.tokTypes.comma))n.push(e?null:this.dummyIdent());else{var a=this.parseMaybeAssign();if(r.isDummy(a)){if(this.closes(t,s,i))break;this.next()}else n.push(a);this.eat(o.tokTypes.comma)}return this.popCx(),this.eat(t)||(this.last.end=this.tok.start,this.options.locations&&(this.last.loc.end=this.tok.loc.start)),n}},{"..":1,"./parseutil":4,"./state":5}],3:[function(t,e,s){"use strict";function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e["default"]=t,e}function r(t,e){var s=new a.LooseParser(t,e);return s.next(),s.parseTopLevel()}s.__esModule=!0,s.parse_dammit=r;var o=t(".."),n=i(o),a=t("./state");t("./tokenize"),t("./statement"),t("./expression"),s.LooseParser=a.LooseParser,s.pluginsLoose=a.pluginsLoose,n.defaultOptions.tabSize=4,n.parse_dammit=r,n.LooseParser=a.LooseParser,n.pluginsLoose=a.pluginsLoose},{"..":1,"./expression":2,"./state":5,"./statement":6,"./tokenize":7}],4:[function(t,e,s){"use strict";function i(t){return"✖"==t.name}s.__esModule=!0,s.isDummy=i},{}],5:[function(t,e,s){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}s.__esModule=!0;var r=t(".."),o={};s.pluginsLoose=o;var n=function(){function t(e,s){if(i(this,t),this.toks=r.tokenizer(e,s),this.options=this.toks.options,this.input=this.toks.input,this.tok=this.last={type:r.tokTypes.eof,start:0,end:0},this.options.locations){var o=this.toks.curPosition();this.tok.loc=new r.SourceLocation(this.toks,o,o)}this.ahead=[],this.context=[],this.curIndent=0,this.curLineStart=0,this.nextLineStart=this.lineEnd(this.curLineStart)+1,this.options.pluginsLoose=s.pluginsLoose||{},this.loadPlugins(this.options.pluginsLoose)}return t.prototype.startNode=function(){return new r.Node(this.toks,this.tok.start,this.options.locations?this.tok.loc.start:null)},t.prototype.storeCurrentPos=function(){return this.options.locations?[this.tok.start,this.tok.loc.start]:this.tok.start},t.prototype.startNodeAt=function(t){return this.options.locations?new r.Node(this.toks,t[0],t[1]):new r.Node(this.toks,t)},t.prototype.finishNode=function(t,e){return t.type=e,t.end=this.last.end,this.options.locations&&(t.loc.end=this.last.loc.end),this.options.ranges&&(t.range[1]=this.last.end),t},t.prototype.dummyNode=function(t){var e=this.startNode();return e.type=t,e.end=e.start,this.options.locations&&(e.loc.end=e.loc.start),this.options.ranges&&(e.range[1]=e.start),this.last={type:r.tokTypes.name,start:e.start,end:e.start,loc:e.loc},e},t.prototype.dummyIdent=function(){var t=this.dummyNode("Identifier");return t.name="✖",t},t.prototype.dummyString=function(){var t=this.dummyNode("Literal");return t.value=t.raw="✖",t},t.prototype.eat=function(t){return this.tok.type===t&&(this.next(),!0)},t.prototype.isContextual=function(t){return this.tok.type===r.tokTypes.name&&this.tok.value===t},t.prototype.eatContextual=function(t){return this.tok.value===t&&this.eat(r.tokTypes.name)},t.prototype.canInsertSemicolon=function(){return this.tok.type===r.tokTypes.eof||this.tok.type===r.tokTypes.braceR||r.lineBreak.test(this.input.slice(this.last.end,this.tok.start))},t.prototype.semicolon=function(){return this.eat(r.tokTypes.semi)},t.prototype.expect=function(t){if(this.eat(t))return!0;for(var e=1;e<=2;e++)if(this.lookAhead(e).type==t){for(var s=0;s<e;s++)this.next();return!0}},t.prototype.pushCx=function(){this.context.push(this.curIndent)},t.prototype.popCx=function(){this.curIndent=this.context.pop()},t.prototype.lineEnd=function(t){for(;t<this.input.length&&!r.isNewLine(this.input.charCodeAt(t));)++t;return t},t.prototype.indentationAfter=function(t){for(var e=0;;++t){var s=this.input.charCodeAt(t);if(32===s)++e;else{if(9!==s)return e;e+=this.options.tabSize}}},t.prototype.closes=function(t,e,s,i){return this.tok.type===t||this.tok.type===r.tokTypes.eof||s!=this.curLineStart&&this.curIndent<e&&this.tokenStartsLine()&&(!i||this.nextLineStart>=this.input.length||this.indentationAfter(this.nextLineStart)<e)},t.prototype.tokenStartsLine=function(){for(var t=this.tok.start-1;t>=this.curLineStart;--t){var e=this.input.charCodeAt(t);if(9!==e&&32!==e)return!1}return!0},t.prototype.extend=function(t,e){this[t]=e(this[t])},t.prototype.loadPlugins=function(t){for(var e in t){var s=o[e];if(!s)throw new Error("Plugin '"+e+"' not found");s(this,t[e])}},t}();s.LooseParser=n},{"..":1}],6:[function(t,e,s){"use strict";var i=t("./state"),r=t("./parseutil"),o=t(".."),n=i.LooseParser.prototype;n.parseTopLevel=function(){var t=this.startNodeAt(this.options.locations?[0,o.getLineInfo(this.input,0)]:0);for(t.body=[];this.tok.type!==o.tokTypes.eof;)t.body.push(this.parseStatement());return this.last=this.tok,this.options.ecmaVersion>=6&&(t.sourceType=this.options.sourceType),this.finishNode(t,"Program")},n.parseStatement=function(){var t=this.tok.type,e=this.startNode();switch(t){case o.tokTypes._break:case o.tokTypes._continue:this.next();var s=t===o.tokTypes._break;return this.semicolon()||this.canInsertSemicolon()?e.label=null:(e.label=this.tok.type===o.tokTypes.name?this.parseIdent():null,this.semicolon()),this.finishNode(e,s?"BreakStatement":"ContinueStatement");case o.tokTypes._debugger:return this.next(),this.semicolon(),this.finishNode(e,"DebuggerStatement");case o.tokTypes._do:return this.next(),e.body=this.parseStatement(),e.test=this.eat(o.tokTypes._while)?this.parseParenExpression():this.dummyIdent(),this.semicolon(),this.finishNode(e,"DoWhileStatement");case o.tokTypes._for:if(this.next(),this.pushCx(),this.expect(o.tokTypes.parenL),this.tok.type===o.tokTypes.semi)return this.parseFor(e,null);if(this.tok.type===o.tokTypes._var||this.tok.type===o.tokTypes._let||this.tok.type===o.tokTypes._const){var i=this.parseVar(!0);return 1!==i.declarations.length||this.tok.type!==o.tokTypes._in&&!this.isContextual("of")?this.parseFor(e,i):this.parseForIn(e,i)}var n=this.parseExpression(!0);return this.tok.type===o.tokTypes._in||this.isContextual("of")?this.parseForIn(e,this.toAssignable(n)):this.parseFor(e,n);case o.tokTypes._function:return this.next(),this.parseFunction(e,!0);case o.tokTypes._if:return this.next(),e.test=this.parseParenExpression(),e.consequent=this.parseStatement(),e.alternate=this.eat(o.tokTypes._else)?this.parseStatement():null,this.finishNode(e,"IfStatement");case o.tokTypes._return:return this.next(),this.eat(o.tokTypes.semi)||this.canInsertSemicolon()?e.argument=null:(e.argument=this.parseExpression(),this.semicolon()),this.finishNode(e,"ReturnStatement");case o.tokTypes._switch:var a=this.curIndent,h=this.curLineStart;this.next(),e.discriminant=this.parseParenExpression(),e.cases=[],this.pushCx(),this.expect(o.tokTypes.braceL);for(var p=void 0;!this.closes(o.tokTypes.braceR,a,h,!0);)if(this.tok.type===o.tokTypes._case||this.tok.type===o.tokTypes._default){var u=this.tok.type===o.tokTypes._case;p&&this.finishNode(p,"SwitchCase"),e.cases.push(p=this.startNode()),p.consequent=[],this.next(),u?p.test=this.parseExpression():p.test=null,this.expect(o.tokTypes.colon)}else p||(e.cases.push(p=this.startNode()),p.consequent=[],p.test=null),p.consequent.push(this.parseStatement());return p&&this.finishNode(p,"SwitchCase"),this.popCx(),this.eat(o.tokTypes.braceR),this.finishNode(e,"SwitchStatement");case o.tokTypes._throw:return this.next(),e.argument=this.parseExpression(),this.semicolon(),this.finishNode(e,"ThrowStatement");case o.tokTypes._try:if(this.next(),e.block=this.parseBlock(),e.handler=null,this.tok.type===o.tokTypes._catch){var c=this.startNode();this.next(),this.expect(o.tokTypes.parenL),c.param=this.toAssignable(this.parseExprAtom(),!0),this.expect(o.tokTypes.parenR),c.body=this.parseBlock(),e.handler=this.finishNode(c,"CatchClause")}return e.finalizer=this.eat(o.tokTypes._finally)?this.parseBlock():null,e.handler||e.finalizer?this.finishNode(e,"TryStatement"):e.block;case o.tokTypes._var:case o.tokTypes._let:case o.tokTypes._const:return this.parseVar();case o.tokTypes._while:return this.next(),e.test=this.parseParenExpression(),e.body=this.parseStatement(),this.finishNode(e,"WhileStatement");case o.tokTypes._with:return this.next(),e.object=this.parseParenExpression(),e.body=this.parseStatement(),this.finishNode(e,"WithStatement");case o.tokTypes.braceL:return this.parseBlock();case o.tokTypes.semi:return this.next(),this.finishNode(e,"EmptyStatement");case o.tokTypes._class:return this.parseClass(!0);case o.tokTypes._import:return this.parseImport();case o.tokTypes._export:return this.parseExport();default:var l=this.parseExpression();return r.isDummy(l)?(this.next(),this.tok.type===o.tokTypes.eof?this.finishNode(e,"EmptyStatement"):this.parseStatement()):t===o.tokTypes.name&&"Identifier"===l.type&&this.eat(o.tokTypes.colon)?(e.body=this.parseStatement(),e.label=l,this.finishNode(e,"LabeledStatement")):(e.expression=l,this.semicolon(),this.finishNode(e,"ExpressionStatement"))}},n.parseBlock=function(){var t=this.startNode();this.pushCx(),this.expect(o.tokTypes.braceL);var e=this.curIndent,s=this.curLineStart;for(t.body=[];!this.closes(o.tokTypes.braceR,e,s,!0);)t.body.push(this.parseStatement());return this.popCx(),this.eat(o.tokTypes.braceR),this.finishNode(t,"BlockStatement")},n.parseFor=function(t,e){return t.init=e,t.test=t.update=null,this.eat(o.tokTypes.semi)&&this.tok.type!==o.tokTypes.semi&&(t.test=this.parseExpression()),this.eat(o.tokTypes.semi)&&this.tok.type!==o.tokTypes.parenR&&(t.update=this.parseExpression()),this.popCx(),this.expect(o.tokTypes.parenR),t.body=this.parseStatement(),this.finishNode(t,"ForStatement")},n.parseForIn=function(t,e){var s=this.tok.type===o.tokTypes._in?"ForInStatement":"ForOfStatement";return this.next(),t.left=e,t.right=this.parseExpression(),this.popCx(),this.expect(o.tokTypes.parenR),t.body=this.parseStatement(),this.finishNode(t,s)},n.parseVar=function(t){var e=this.startNode();e.kind=this.tok.type.keyword,this.next(),e.declarations=[];do{var s=this.startNode();s.id=this.options.ecmaVersion>=6?this.toAssignable(this.parseExprAtom(),!0):this.parseIdent(),s.init=this.eat(o.tokTypes.eq)?this.parseMaybeAssign(t):null,e.declarations.push(this.finishNode(s,"VariableDeclarator"))}while(this.eat(o.tokTypes.comma));if(!e.declarations.length){var s=this.startNode();s.id=this.dummyIdent(),e.declarations.push(this.finishNode(s,"VariableDeclarator"))}return t||this.semicolon(),this.finishNode(e,"VariableDeclaration")},n.parseClass=function(t){var e=this.startNode();this.next(),this.tok.type===o.tokTypes.name?e.id=this.parseIdent():t?e.id=this.dummyIdent():e.id=null,e.superClass=this.eat(o.tokTypes._extends)?this.parseExpression():null,e.body=this.startNode(),e.body.body=[],this.pushCx();var s=this.curIndent+1,i=this.curLineStart;for(this.eat(o.tokTypes.braceL),this.curIndent+1<s&&(s=this.curIndent,i=this.curLineStart);!this.closes(o.tokTypes.braceR,s,i);)if(!this.semicolon()){var n=this.startNode(),a=void 0;this.options.ecmaVersion>=6&&(n["static"]=!1,a=this.eat(o.tokTypes.star)),this.parsePropertyName(n),r.isDummy(n.key)?(r.isDummy(this.parseMaybeAssign())&&this.next(),this.eat(o.tokTypes.comma)):("Identifier"!==n.key.type||n.computed||"static"!==n.key.name||this.tok.type==o.tokTypes.parenL||this.tok.type==o.tokTypes.braceL?n["static"]=!1:(n["static"]=!0,a=this.eat(o.tokTypes.star),this.parsePropertyName(n)),this.options.ecmaVersion>=5&&"Identifier"===n.key.type&&!n.computed&&("get"===n.key.name||"set"===n.key.name)&&this.tok.type!==o.tokTypes.parenL&&this.tok.type!==o.tokTypes.braceL?(n.kind=n.key.name,this.parsePropertyName(n),n.value=this.parseMethod(!1)):(n.computed||n["static"]||a||!("Identifier"===n.key.type&&"constructor"===n.key.name||"Literal"===n.key.type&&"constructor"===n.key.value)?n.kind="method":n.kind="constructor",n.value=this.parseMethod(a)),e.body.body.push(this.finishNode(n,"MethodDefinition")))}return this.popCx(),this.eat(o.tokTypes.braceR)||(this.last.end=this.tok.start,this.options.locations&&(this.last.loc.end=this.tok.loc.start)),this.semicolon(),this.finishNode(e.body,"ClassBody"),this.finishNode(e,t?"ClassDeclaration":"ClassExpression")},n.parseFunction=function(t,e){return this.initFunction(t),this.options.ecmaVersion>=6&&(t.generator=this.eat(o.tokTypes.star)),this.tok.type===o.tokTypes.name?t.id=this.parseIdent():e&&(t.id=this.dummyIdent()),t.params=this.parseFunctionParams(),t.body=this.parseBlock(),this.finishNode(t,e?"FunctionDeclaration":"FunctionExpression")},n.parseExport=function(){var t=this.startNode();if(this.next(),this.eat(o.tokTypes.star))return t.source=this.eatContextual("from")?this.parseExprAtom():null,this.finishNode(t,"ExportAllDeclaration");if(this.eat(o.tokTypes._default)){var e=this.parseMaybeAssign();if(e.id)switch(e.type){case"FunctionExpression":e.type="FunctionDeclaration";break;case"ClassExpression":e.type="ClassDeclaration"}return t.declaration=e,this.semicolon(),this.finishNode(t,"ExportDefaultDeclaration")}return this.tok.type.keyword?(t.declaration=this.parseStatement(),t.specifiers=[],t.source=null):(t.declaration=null,t.specifiers=this.parseExportSpecifierList(),t.source=this.eatContextual("from")?this.parseExprAtom():null,this.semicolon()),this.finishNode(t,"ExportNamedDeclaration")},n.parseImport=function(){var t=this.startNode();if(this.next(),this.tok.type===o.tokTypes.string)t.specifiers=[],t.source=this.parseExprAtom(),t.kind="";else{var e=void 0;this.tok.type===o.tokTypes.name&&"from"!==this.tok.value&&(e=this.startNode(),e.local=this.parseIdent(),this.finishNode(e,"ImportDefaultSpecifier"),this.eat(o.tokTypes.comma)),t.specifiers=this.parseImportSpecifierList(),t.source=this.eatContextual("from")&&this.tok.type==o.tokTypes.string?this.parseExprAtom():this.dummyString(),e&&t.specifiers.unshift(e)}return this.semicolon(),this.finishNode(t,"ImportDeclaration")},n.parseImportSpecifierList=function(){var t=[];if(this.tok.type===o.tokTypes.star){var e=this.startNode();this.next(),this.eatContextual("as")&&(e.local=this.parseIdent()),t.push(this.finishNode(e,"ImportNamespaceSpecifier"))}else{var s=this.curIndent,i=this.curLineStart,n=this.nextLineStart;for(this.pushCx(),this.eat(o.tokTypes.braceL),this.curLineStart>n&&(n=this.curLineStart);!this.closes(o.tokTypes.braceR,s+(this.curLineStart<=n?1:0),i);){var e=this.startNode();if(this.eat(o.tokTypes.star))e.local=this.eatContextual("as")?this.parseIdent():this.dummyIdent(),this.finishNode(e,"ImportNamespaceSpecifier");else{if(this.isContextual("from"))break;if(e.imported=this.parseIdent(),r.isDummy(e.imported))break;e.local=this.eatContextual("as")?this.parseIdent():e.imported,this.finishNode(e,"ImportSpecifier")}t.push(e),this.eat(o.tokTypes.comma)}this.eat(o.tokTypes.braceR),this.popCx()}return t},n.parseExportSpecifierList=function(){var t=[],e=this.curIndent,s=this.curLineStart,i=this.nextLineStart;for(this.pushCx(),this.eat(o.tokTypes.braceL),this.curLineStart>i&&(i=this.curLineStart);!this.closes(o.tokTypes.braceR,e+(this.curLineStart<=i?1:0),s)&&!this.isContextual("from");){var n=this.startNode();if(n.local=this.parseIdent(),r.isDummy(n.local))break;n.exported=this.eatContextual("as")?this.parseIdent():n.local,this.finishNode(n,"ExportSpecifier"),t.push(n),this.eat(o.tokTypes.comma)}return this.eat(o.tokTypes.braceR),this.popCx(),t}},{"..":1,"./parseutil":4,"./state":5}],7:[function(t,e,s){"use strict";function i(t){return t<14&&t>8||32===t||160===t||r.isNewLine(t)}var r=t(".."),o=t("./state"),n=o.LooseParser.prototype;n.next=function(){if(this.last=this.tok,this.ahead.length?this.tok=this.ahead.shift():this.tok=this.readToken(),this.tok.start>=this.nextLineStart){for(;this.tok.start>=this.nextLineStart;)this.curLineStart=this.nextLineStart,this.nextLineStart=this.lineEnd(this.curLineStart)+1;this.curIndent=this.indentationAfter(this.curLineStart)}},n.readToken=function(){for(;;)try{return this.toks.next(),this.toks.type===r.tokTypes.dot&&"."===this.input.substr(this.toks.end,1)&&this.options.ecmaVersion>=6&&(this.toks.end++,this.toks.type=r.tokTypes.ellipsis),new r.Token(this.toks)}catch(t){if(!(t instanceof SyntaxError))throw t;var e=t.message,s=t.raisedAt,o=!0;if(/unterminated/i.test(e))if(s=this.lineEnd(t.pos+1),/string/.test(e))o={start:t.pos,end:s,type:r.tokTypes.string,value:this.input.slice(t.pos+1,s)};else if(/regular expr/i.test(e)){var n=this.input.slice(t.pos,s);try{n=new RegExp(n)}catch(t){}o={start:t.pos,end:s,type:r.tokTypes.regexp,value:n}}else o=!!/template/.test(e)&&{start:t.pos,end:s,type:r.tokTypes.template,value:this.input.slice(t.pos,s)};else if(/invalid (unicode|regexp|number)|expecting unicode|octal literal|is reserved|directly after number|expected number in radix/i.test(e))for(;s<this.input.length&&!i(this.input.charCodeAt(s));)++s;else if(/character escape|expected hexadecimal/i.test(e))for(;s<this.input.length;){var a=this.input.charCodeAt(s++);if(34===a||39===a||r.isNewLine(a))break}else if(/unexpected character/i.test(e))s++,o=!1;else{if(!/regular expression/i.test(e))throw t;o=!0}if(this.resetTo(s),o===!0&&(o={start:s,end:s,type:r.tokTypes.name,value:"✖"}),o)return this.options.locations&&(o.loc=new r.SourceLocation(this.toks,r.getLineInfo(this.input,o.start),r.getLineInfo(this.input,o.end))),o}},n.resetTo=function(t){this.toks.pos=t;var e=this.input.charAt(t-1);if(this.toks.exprAllowed=!e||/[\[\{\(,;:?\/*=+\-~!|&%^<>]/.test(e)||/[enwfd]/.test(e)&&/\b(keywords|case|else|return|throw|new|in|(instance|type)of|delete|void)$/.test(this.input.slice(t-10,t)),this.options.locations){this.toks.curLine=1,this.toks.lineStart=r.lineBreakG.lastIndex=0;for(var s=void 0;(s=r.lineBreakG.exec(this.input))&&s.index<t;)++this.toks.curLine,this.toks.lineStart=s.index+s[0].length}},n.lookAhead=function(t){for(;t>this.ahead.length;)this.ahead.push(this.readToken());return this.ahead[t-1]}},{"..":1,"./state":5}]},{},[3])(3)});

/***/ },

/***/ "./node_modules/tern/node_modules/acorn/dist/walk.js":
/***/ function(module, exports, __webpack_require__) {

	var require;var require;!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,(n.acorn||(n.acorn={})).walk=e()}}(function(){return function e(n,t,r){function o(s,a){if(!t[s]){if(!n[s]){var u="function"==typeof require&&require;if(!a&&u)return require(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=t[s]={exports:{}};n[s][0].call(f.exports,function(e){var t=n[s][1][e];return o(t?t:e)},f,f.exports,e,n,t,r)}return t[s].exports}for(var i="function"==typeof require&&require,s=0;s<r.length;s++)o(r[s]);return o}({1:[function(e,n,t){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function o(e,n,r,o,i){r||(r=t.base),function s(e,t,o){var i=o||e.type,a=n[i];r[i](e,t,s),a&&a(e,t)}(e,o,i)}function i(e,n,r,o){r||(r=t.base),o||(o=[]),function i(e,t,o){var s=o||e.type,a=n[s];e!=t[t.length-1]&&(t=t.slice(),t.push(e)),r[s](e,t,i),a&&a(e,t)}(e,o)}function s(e,n,r,o,i){var s=r?t.make(r,o):o;!function a(e,n,t){s[t||e.type](e,n,a)}(e,n,i)}function a(e){return"string"==typeof e?function(n){return n==e}:e?e:function(){return!0}}function u(e,n,r,o,i,s){o=a(o),i||(i=t.base);try{!function c(e,t,s){var a=s||e.type;if((null==n||e.start<=n)&&(null==r||e.end>=r)&&i[a](e,t,c),(null==n||e.start==n)&&(null==r||e.end==r)&&o(a,e))throw new x(e,t)}(e,s)}catch(u){if(u instanceof x)return u;throw u}}function c(e,n,r,o,i){r=a(r),o||(o=t.base);try{!function u(e,t,i){var s=i||e.type;if(!(e.start>n||e.end<n)&&(o[s](e,t,u),r(s,e)))throw new x(e,t)}(e,i)}catch(s){if(s instanceof x)return s;throw s}}function f(e,n,r,o,i){r=a(r),o||(o=t.base);try{!function u(e,t,i){if(!(e.end<n)){var s=i||e.type;if(e.start>=n&&r(s,e))throw new x(e,t);o[s](e,t,u)}}(e,i)}catch(s){if(s instanceof x)return s;throw s}}function p(e,n,r,o,i){r=a(r),o||(o=t.base);var s=void 0;return function u(e,t,i){if(!(e.start>n)){var a=i||e.type;e.end<=n&&(!s||s.node.end<e.end)&&r(a,e)&&(s=new x(e,t)),o[a](e,t,u)}}(e,i),s}function l(e,n){n||(n=t.base);var r={};for(var o in n)r[o]=n[o];for(var o in e)r[o]=e[o];return r}function d(e,n,t){t(e,n)}function m(e,n,t){}t.__esModule=!0,t.simple=o,t.ancestor=i,t.recursive=s,t.findNodeAt=u,t.findNodeAround=c,t.findNodeAfter=f,t.findNodeBefore=p,t.make=l;var x=function y(e,n){r(this,y),this.node=e,this.state=n},E={};t.base=E,E.Program=E.BlockStatement=function(e,n,t){for(var r=0;r<e.body.length;++r)t(e.body[r],n,"Statement")},E.Statement=d,E.EmptyStatement=m,E.ExpressionStatement=E.ParenthesizedExpression=function(e,n,t){return t(e.expression,n,"Expression")},E.IfStatement=function(e,n,t){t(e.test,n,"Expression"),t(e.consequent,n,"Statement"),e.alternate&&t(e.alternate,n,"Statement")},E.LabeledStatement=function(e,n,t){return t(e.body,n,"Statement")},E.BreakStatement=E.ContinueStatement=m,E.WithStatement=function(e,n,t){t(e.object,n,"Expression"),t(e.body,n,"Statement")},E.SwitchStatement=function(e,n,t){t(e.discriminant,n,"Expression");for(var r=0;r<e.cases.length;++r){var o=e.cases[r];o.test&&t(o.test,n,"Expression");for(var i=0;i<o.consequent.length;++i)t(o.consequent[i],n,"Statement")}},E.ReturnStatement=E.YieldExpression=function(e,n,t){e.argument&&t(e.argument,n,"Expression")},E.ThrowStatement=E.SpreadElement=function(e,n,t){return t(e.argument,n,"Expression")},E.TryStatement=function(e,n,t){t(e.block,n,"Statement"),e.handler&&(t(e.handler.param,n,"Pattern"),t(e.handler.body,n,"ScopeBody")),e.finalizer&&t(e.finalizer,n,"Statement")},E.WhileStatement=E.DoWhileStatement=function(e,n,t){t(e.test,n,"Expression"),t(e.body,n,"Statement")},E.ForStatement=function(e,n,t){e.init&&t(e.init,n,"ForInit"),e.test&&t(e.test,n,"Expression"),e.update&&t(e.update,n,"Expression"),t(e.body,n,"Statement")},E.ForInStatement=E.ForOfStatement=function(e,n,t){t(e.left,n,"ForInit"),t(e.right,n,"Expression"),t(e.body,n,"Statement")},E.ForInit=function(e,n,t){"VariableDeclaration"==e.type?t(e,n):t(e,n,"Expression")},E.DebuggerStatement=m,E.FunctionDeclaration=function(e,n,t){return t(e,n,"Function")},E.VariableDeclaration=function(e,n,t){for(var r=0;r<e.declarations.length;++r)t(e.declarations[r],n)},E.VariableDeclarator=function(e,n,t){t(e.id,n,"Pattern"),e.init&&t(e.init,n,"Expression")},E.Function=function(e,n,t){e.id&&t(e.id,n,"Pattern");for(var r=0;r<e.params.length;r++)t(e.params[r],n,"Pattern");t(e.body,n,e.expression?"ScopeExpression":"ScopeBody")},E.ScopeBody=function(e,n,t){return t(e,n,"Statement")},E.ScopeExpression=function(e,n,t){return t(e,n,"Expression")},E.Pattern=function(e,n,t){"Identifier"==e.type?t(e,n,"VariablePattern"):"MemberExpression"==e.type?t(e,n,"MemberPattern"):t(e,n)},E.VariablePattern=m,E.MemberPattern=d,E.RestElement=function(e,n,t){return t(e.argument,n,"Pattern")},E.ArrayPattern=function(e,n,t){for(var r=0;r<e.elements.length;++r){var o=e.elements[r];o&&t(o,n,"Pattern")}},E.ObjectPattern=function(e,n,t){for(var r=0;r<e.properties.length;++r)t(e.properties[r].value,n,"Pattern")},E.Expression=d,E.ThisExpression=E.Super=E.MetaProperty=m,E.ArrayExpression=function(e,n,t){for(var r=0;r<e.elements.length;++r){var o=e.elements[r];o&&t(o,n,"Expression")}},E.ObjectExpression=function(e,n,t){for(var r=0;r<e.properties.length;++r)t(e.properties[r],n)},E.FunctionExpression=E.ArrowFunctionExpression=E.FunctionDeclaration,E.SequenceExpression=E.TemplateLiteral=function(e,n,t){for(var r=0;r<e.expressions.length;++r)t(e.expressions[r],n,"Expression")},E.UnaryExpression=E.UpdateExpression=function(e,n,t){t(e.argument,n,"Expression")},E.BinaryExpression=E.LogicalExpression=function(e,n,t){t(e.left,n,"Expression"),t(e.right,n,"Expression")},E.AssignmentExpression=E.AssignmentPattern=function(e,n,t){t(e.left,n,"Pattern"),t(e.right,n,"Expression")},E.ConditionalExpression=function(e,n,t){t(e.test,n,"Expression"),t(e.consequent,n,"Expression"),t(e.alternate,n,"Expression")},E.NewExpression=E.CallExpression=function(e,n,t){if(t(e.callee,n,"Expression"),e.arguments)for(var r=0;r<e.arguments.length;++r)t(e.arguments[r],n,"Expression")},E.MemberExpression=function(e,n,t){t(e.object,n,"Expression"),e.computed&&t(e.property,n,"Expression")},E.ExportNamedDeclaration=E.ExportDefaultDeclaration=function(e,n,t){e.declaration&&t(e.declaration,n,"ExportNamedDeclaration"==e.type||e.declaration.id?"Statement":"Expression"),e.source&&t(e.source,n,"Expression")},E.ExportAllDeclaration=function(e,n,t){t(e.source,n,"Expression")},E.ImportDeclaration=function(e,n,t){for(var r=0;r<e.specifiers.length;r++)t(e.specifiers[r],n);t(e.source,n,"Expression")},E.ImportSpecifier=E.ImportDefaultSpecifier=E.ImportNamespaceSpecifier=E.Identifier=E.Literal=m,E.TaggedTemplateExpression=function(e,n,t){t(e.tag,n,"Expression"),t(e.quasi,n)},E.ClassDeclaration=E.ClassExpression=function(e,n,t){return t(e,n,"Class")},E.Class=function(e,n,t){e.id&&t(e.id,n,"Pattern"),e.superClass&&t(e.superClass,n,"Expression");for(var r=0;r<e.body.body.length;r++)t(e.body.body[r],n)},E.MethodDefinition=E.Property=function(e,n,t){e.computed&&t(e.key,n,"Expression"),t(e.value,n,"Expression")},E.ComprehensionExpression=function(e,n,t){for(var r=0;r<e.blocks.length;r++)t(e.blocks[r].right,n,"Expression");t(e.body,n,"Expression")}},{}]},{},[1])(1)});

/***/ },

/***/ "./node_modules/tern/lib/def.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){return true?exports.init=e:"function"==typeof define&&define.amd?define({init:e}):void(tern.def={init:e})}(function(e,t){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function n(e,t,r){return e.call?e(t,r):e}function a(e,r){if("!ret"==r){if(e.retval)return e.retval;var n=new t.AVal;return e.propagate(new t.IsCallee(t.ANull,[],null,n)),n}return e.getProp(r)}function i(e,r,a,i){return function(o,s){for(var l=[],p=0;p<r.length;p++)l.push(n(r[p],o,s));return new t.Fn(e,t.ANull,l,n(a,o,s),i)}}function o(e){return function(r,a){for(var i=new t.AVal,o=0;o<e.length;o++)n(e[o],r,a).propagate(i);return i.maxWeight=1e5,i}}function s(e){return function(r,n){return new t.Arr(e(r,n))}}function l(e){return function(r,a){return new t.Arr(e.map(function(e){return n(e,r,a)}))}}function p(e,r,n,a){var i=new w(e,null,n,a).parseType(!1,r,!0);if(/^fn\(/.test(e))for(var o=0;o<i.args.length;++o)(function(e){var r=i.args[e];r instanceof t.Fn&&r.args&&r.args.length&&u(i,function(n,a){var i=a[e];i&&i.propagate(new t.IsCallee(t.cx().topScope,r.args,null,t.ANull))})})(o);return i}function u(e,t,r){var n=e.computeRet,a=e.retval;e.computeRet=function(e,i,o){var s=t(e,i,o),l=n?n(e,i,o):a;return r?s:l}}function f(e,r){for(var n=0;n<r.length&&e!=t.ANull;++n){var a=r[n];if("!"==a.charAt(0))if("!proto"==a)e=e instanceof t.Obj&&e.proto||t.ANull;else{var i=e.getFunctionType();if(i)if("!ret"==a)e=i.retval&&i.retval.getType(!1)||t.ANull;else{var o=i.args&&i.args[Number(a.slice(1))];e=o&&o.getType(!1)||t.ANull}else e=t.ANull}else if(e instanceof t.Obj&&("prototype"==a&&e instanceof t.Fn||e.hasProp(a))){var s=e.getProp(a);e=!s||s.isEmpty()?t.ANull:s.types[0]}else e=t.ANull}return e}function c(e){var t=Object.create(e.prototype);return t.props=Object.create(null),t.isShell=!0,t}function h(e){if(!e["!type"]||/^(fn\(|\[)/.test(e["!type"]))return!1;for(var t in e)if("!type"!=t&&"!doc"!=t&&"!url"!=t&&"!span"!=t&&"!data"!=t)return!1;return!0}function g(e,n,a){if(!e){var i=n["!type"];if(i)if(/^fn\(/.test(i))e=c(t.Fn);else{if("["!=i.charAt(0))throw new Error("Invalid !type spec: "+i);e=c(t.Arr)}else e=n["!stdProto"]?t.cx().protos[n["!stdProto"]]:c(t.Obj);e.name=a}for(var o in n)if(r(n,o)&&33!=o.charCodeAt(0)){var s=n[o];if("string"==typeof s||h(s))continue;var l=e.defProp(o);g(l.getObjType(),s,a?a+"."+o:o).propagate(l)}return e}function v(e,n,a){if(e.isShell){delete e.isShell;var i=n["!type"];if(i)p(i,a,e);else{var o=n["!proto"]&&p(n["!proto"]);t.Obj.call(e,!(o instanceof t.Obj)||o,a)}}var s=n["!effects"];if(s&&e instanceof t.Fn)for(var l=0;l<s.length;++l)b(s[l],e);y(n,e);for(var u in n)if(r(n,u)&&33!=u.charCodeAt(0)){var f=n[u],c=e.defProp(u),g=a?a+"."+u:u;if("string"==typeof f)c.isEmpty()&&p(f,g).propagate(c);else{if(h(f)){if(!c.isEmpty())continue;p(f["!type"],g,null,!0).propagate(c)}else v(c.getObjType(),f,g);f["!doc"]&&(c.doc=f["!doc"]),f["!url"]&&(c.url=f["!url"]),f["!span"]&&(c.span=f["!span"])}}return e}function y(e,t){e["!doc"]&&(t.doc=e["!doc"]),e["!url"]&&(t.url=e["!url"]),e["!span"]&&(t.span=e["!span"]),e["!data"]&&(t.metaData=e["!data"])}function d(e,r){var n=t.cx(),a=n.parent;t.addOrigin(n.curOrigin=e["!name"]||"env#"+n.origins.length),n.localDefs=n.definitions[n.curOrigin]=Object.create(null),a&&a.signal("preLoadDef",e),g(r,e);var i=e["!define"];if(i){for(var o in i){var s=i[o];n.localDefs[o]="string"==typeof s?P(s):g(null,s,o)}for(var o in i){var s=i[o];"string"!=typeof s&&v(n.localDefs[o],i[o],o)}}v(r,e),a&&a.signal("postLoadDef",e),n.curOrigin=n.localDefs=null}var w=e.TypeParser=function(e,t,r,n){this.pos=t||0,this.spec=e,this.base=r,this.forceNew=n};w.prototype={eat:function(e){if(1==e.length?this.spec.charAt(this.pos)==e:this.spec.indexOf(e,this.pos)==this.pos)return this.pos+=e.length,!0},word:function(e){for(var t,r="",e=e||/[\w$]/;(t=this.spec.charAt(this.pos))&&e.test(t);)r+=t,++this.pos;return r},error:function(){throw new Error("Unrecognized type spec: "+this.spec+" (at "+this.pos+")")},parseFnType:function(e,r,n,a){var o=[],s=[],l=!1;if(!this.eat(")"))for(var p=0;;++p){var u,f=this.spec.indexOf(": ",this.pos);f!=-1&&(u=this.spec.slice(this.pos,f),/^[$\w?]+$/.test(u)?this.pos=f+2:u=null),s.push(u);var c=this.parseType(e);if(c.call&&(l=!0),o.push(c),!this.eat(", ")){this.eat(")")||this.error();break}}var h,g,v,y;if(this.eat(" -> ")){var d=this.pos;h=this.parseType(!0),h.call&&!l&&(g=h,h=t.ANull,v=d)}else h=t.ANull;return l?i(r,o,h,a):(n&&(y=this.base)?t.Fn.call(this.base,r,t.ANull,o,s,h,a):y=new t.Fn(r,t.ANull,o,s,h,a),g&&(y.computeRet=g),null!=v&&(y.computeRetSource=this.spec.slice(v,this.pos)),y)},parseType:function(e,r,n){var a=this.parseTypeMaybeProp(e,r,n);if(!this.eat("|"))return a;for(var i=[a],s=a.call;;){var l=this.parseTypeMaybeProp(e,r,n);if(i.push(l),l.call&&(s=!0),!this.eat("|"))break}if(s)return o(i);for(var p=new t.AVal,u=0;u<i.length;u++)i[u].propagate(p);return p.maxWeight=1e5,p},parseTypeMaybeProp:function(e,t,r){for(var n=this.parseTypeInner(e,t,r);e&&this.eat(".");)n=this.extendWithProp(n);return n},extendWithProp:function(e){var t=this.word(/[\w<>$!:]/)||this.error();return e.apply?function(r,n){return a(e(r,n),t)}:a(e,t)},parseTypeInner:function(e,r,n){var a;if(this.eat("fn(")||(a=this.eat("fn*(")))return this.parseFnType(e,r,n,a);if(this.eat("[")){for(var i,o=this.parseType(e),p=o.call;this.eat(", ");){i||(i=[o]);var u=this.parseType(e);i.push(u),p=p||u.call}return this.eat("]")||this.error(),p?i?l(i):s(o):n&&this.base?(t.Arr.call(this.base,i||o),this.base):new t.Arr(i||o)}if(this.eat("+")){var c=this.word(/[\w$<>\.:!]/),h=t.cx().localDefs[c+".prototype"];if(!h){var h=P(c);if(!(h instanceof t.Obj))return h;var g=f(h,["prototype"]);g&&(g=g.getObjType())&&(h=g)}return e&&this.eat("[")?this.parsePoly(h):n&&this.forceNew?new t.Obj(h):t.getInstance(h)}if(this.eat(":")){var r=this.word(/[\w$\.]/);return t.getSymbol(r)}if(e&&this.eat("!")){var v=this.word(/\d/);if(v)return v=Number(v),function(e,r){return r[v]||t.ANull};if(this.eat("this"))return function(e){return e};if(this.eat("custom:")){var y=this.word(/[\w$]/);return m[y]||function(){return t.ANull}}return this.fromWord("!"+this.word(/[\w$<>\.!:]/))}return this.eat("?")?t.ANull:this.fromWord(this.word(/[\w$<>\.!:`]/))},fromWord:function(e){var r=t.cx();switch(e){case"number":return r.num;case"string":return r.str;case"bool":return r.bool;case"<top>":return r.topScope}return r.localDefs&&e in r.localDefs?r.localDefs[e]:P(e)},parsePoly:function(e){var r,n="<i>";(r=this.spec.slice(this.pos).match(/^\s*([\w$:]+)\s*=\s*/))&&(n=r[1],this.pos+=r[0].length);var a=this.parseType(!0);if(this.eat("]")||this.error(),a.call)return function(r,i){var o=new t.Obj(e);return a(r,i).propagate(o.defProp(n)),o};var i=new t.Obj(e);return a.propagate(i.defProp(n)),i}};var A,b=e.parseEffect=function(e,r){var a;if(0==e.indexOf("propagate ")){var i=new w(e,10),o=i.parseType(!0);i.eat(" ")||i.error();var s=i.parseType(!0);u(r,function(e,t){n(o,e,t).propagate(n(s,e,t))})}else if(0==e.indexOf("call ")){var l=5==e.indexOf("and return ",5),i=new w(e,l?16:5),p=i.parseType(!0),f=null,c=[];for(i.eat(" this=")&&(f=i.parseType(!0));i.eat(" ");)c.push(i.parseType(!0));u(r,function(e,r){for(var a=n(p,e,r),i=f?n(f,e,r):t.ANull,o=[],s=0;s<c.length;++s)o.push(n(c[s],e,r));var u=l?new t.AVal:t.ANull;return a.propagate(new t.IsCallee(i,o,null,u)),u},l)}else if(a=e.match(/^custom (\S+)\s*(.*)/)){var h=m[a[1]];h&&u(r,a[2]?h(a[2]):h)}else{if(0!=e.indexOf("copy "))throw new Error("Unknown effect type: "+e);var i=new w(e,5),g=i.parseType(!0);i.eat(" ");var v=i.parseType(!0);u(r,function(e,r){var a=n(g,e,r),i=n(v,e,r);a.forAllProps(function(e,r,n){n&&"<i>"!=e&&i.propagate(new t.DefProp(e,r))})})}},P=e.parsePath=function(e,r){var n=t.cx(),a=n.paths[e],i=e;if(null!=a)return a;n.paths[e]=t.ANull;var o=r||A||n.topScope;if(n.localDefs)for(var s in n.localDefs)if(0==e.indexOf(s)){if(e==s)return n.paths[e]=n.localDefs[e];if("."==e.charAt(s.length)){o=n.localDefs[s],e=e.slice(s.length+1);break}}var l=f(o,e.split("."));return n.paths[i]=l==t.ANull?null:l,l};e.load=function(e,r){r||(r=t.cx().topScope);var n=A;A=r;try{d(e,r)}finally{A=n}},e.parse=function(e,r,n){var a=t.cx();r&&(a.origin=r,a.localDefs=a.definitions[r]);try{return"string"==typeof e?p(e,n):v(g(null,e,n),e,n)}finally{r&&(a.origin=a.localDefs=null)}};var m=Object.create(null);t.registerFunction=function(e,t){m[e]=t};var O=t.constraint({construct:function(e,t,r){this.created=e,this.target=t,this.spec=r},addType:function(e){if(e instanceof t.Obj&&this.created++<5){var r=new t.Obj(e),n=this.spec;if(n instanceof t.AVal&&(n=n.getObjType(!1)),n instanceof t.Obj)for(var a in n.props){var i=n.props[a].types[0],o=r.defProp(a);if(i&&i instanceof t.Obj&&i.props.value){var s=i.props.value.getType(!1);s&&o.addType(s)}}this.target.addType(r)}}});t.registerFunction("Object_create",function(e,r,n){if(n&&n.length&&"Literal"==n[0].type&&null==n[0].value)return new t.Obj;var a=new t.AVal;return r[0]&&r[0].propagate(new O(0,a,r[1])),a});var T=t.constraint({construct:function(e){this.target=e},addType:function(e){e instanceof t.Obj&&(e.hasProp("value")?e.getProp("value").propagate(this.target):e.hasProp("get")&&e.getProp("get").propagate(new t.IsCallee(t.ANull,[],null,this.target)))}});t.registerFunction("Object_defineProperty",function(e,r,n){if(n&&n.length>=3&&"Literal"==n[1].type&&"string"==typeof n[1].value){var a=r[0],i=new t.AVal;a.propagate(new t.DefProp(n[1].value,i,n[1])),r[2].propagate(new T(i))}return t.ANull}),t.registerFunction("Object_defineProperties",function(e,r,n){if(r.length>=2){var a=r[0];r[1].forAllProps(function(e,r,i){if(i){var o=new t.AVal;a.propagate(new t.DefProp(e,o,n&&n[1])),r.propagate(new T(o))}})}return t.ANull});var N=t.constraint({construct:function(e,t,r){this.self=e,this.args=t,this.target=r},addType:function(e){if(e instanceof t.Fn){this.target.addType(new t.Fn(e.name,t.ANull,e.args.slice(this.args.length),e.argNames.slice(this.args.length),e.retval,e.generator)),this.self.propagate(e.self);for(var r=0;r<Math.min(e.args.length,this.args.length);++r)this.args[r].propagate(e.args[r])}}});t.registerFunction("Function_bind",function(e,r){if(!r.length)return t.ANull;var n=new t.AVal;return e.propagate(new N(r[0],r.slice(1),n)),n}),t.registerFunction("Array_ctor",function(e,r){var n=new t.Arr;if(1!=r.length||!r[0].hasType(t.cx().num))for(var a=n.getProp("<i>"),i=0;i<r.length;++i)r[i].propagate(a);return n}),t.registerFunction("Promise_ctor",function(e,r,n){var a=t.cx().definitions.ecma6;if(!a||r.length<1)return t.ANull;var i=new t.Obj(a["Promise.prototype"]),o=i.defProp(":t",n&&n[0]),s=new t.AVal;s.propagate(o);var l=new t.Fn("execute",t.ANull,[s],["value"],t.ANull),p=a.Promise_reject;return r[0].propagate(new t.IsCallee(t.ANull,[l,p],null,t.ANull)),i});var j=t.constraint({construct:function(e){this.output=e},addType:function(e){e.constructor==t.Obj&&"Promise"==e.name&&e.hasProp(":t")?e.getProp(":t").propagate(this.output):e.propagate(this.output)}}),x=50;return t.registerFunction("Promise_then",function(e,r,n){var a=r.length&&r[0].getFunctionType(),i=t.cx().definitions.ecma6;if(!a||!i)return e;var o,s=new t.Obj(i["Promise.prototype"]),l=s.defProp(":t",n&&n[0]);return a.retval.isEmpty()&&(o=e.getType())instanceof t.Obj&&o.hasProp(":t")&&o.getProp(":t").propagate(l,x),a.retval.propagate(new j(l)),s}),t.registerFunction("getOwnPropertySymbols",function(e,r){if(!r.length)return t.ANull;var n=new t.AVal;return r[0].forAllProps(function(e,r,a){a&&":"==e.charAt(0)&&n.addType(t.getSymbol(e.slice(1)))}),n}),t.registerFunction("getSymbol",function(e,r,n){return n.length&&"Literal"==n[0].type&&"string"==typeof n[0].value?t.getSymbol(n[0].value):t.ANull}),e});

/***/ },

/***/ "./node_modules/tern/lib/infer.js":
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){return true?e(exports,__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn_loose.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/walk.js"),__webpack_require__("./node_modules/tern/lib/def.js"),__webpack_require__("./node_modules/tern/lib/signal.js")):"function"==typeof define&&define.amd?define(["exports","acorn/dist/acorn","acorn/dist/acorn_loose","acorn/dist/walk","./def","./signal"],e):void e(t.tern||(t.tern={}),acorn,acorn,acorn.walk,tern.def,tern.signal)}(this,function(t,e,r,n,o,i){"use strict";function s(t,e){var r=Object.create(t);if(e)for(var n in e)r[n]=e[n];return r}function p(t,e,r){var n=t.getType(!1),o=e.getType(!1);return!n||!o||a(n,o,r)}function a(t,e,r){if(!t||r>=5)return e;if(!t||t==e)return t;if(!e)return t;if(t.constructor!=e.constructor)return!1;if(t.constructor!=jt){if(t.constructor==St){var n=0,o=0,i=0;for(var s in t.props)n++,s in e.props&&p(t.props[s],e.props[s],r+1)&&i++;for(var s in e.props)o++;return!(n&&o&&i<Math.max(n,o)/2)&&(n>o?t:e)}return t.constructor==Ot&&(!!(t.args.length==e.args.length&&t.args.every(function(t,n){return p(t,e.args[n],r+1)})&&p(t.retval,e.retval,r+1)&&p(t.self,e.self,r+1))&&t)}var u=t.getProp("<i>").getType(!1);if(!u)return e;var f=e.getProp("<i>").getType(!1);return!f||a(u,f,r+1)?e:void 0}function u(t){for(var e=0,r=0,n=0,o=null,i=0;i<t.length;++i){var s=t[i];if(s instanceof jt)++e;else if(s instanceof Ot)++r;else if(s instanceof St)++n;else if(s instanceof Et){if(o&&s.name!=o.name)return null;o=s}}var p=(e&&1)+(r&&1)+(n&&1)+(o&&1);if(p>1)return null;if(o)return o;for(var a=0,u=null,i=0;i<t.length;++i){var s=t[i],f=0;if(e)f=s.getProp("<i>").isEmpty()?1:2;else if(r){f=1;for(var c=0;c<s.args.length;++c)s.args[c].isEmpty()||++f;s.retval.isEmpty()||++f}else n&&(f=s.name?100:2);f>=a&&(a=f,u=s)}return u}function f(t,e){Ct.disabledComputing={fn:t,prev:Ct.disabledComputing};var r=e();return Ct.disabledComputing=Ct.disabledComputing.prev,r}function c(t){var e=t.charCodeAt(0);return e>=48&&e<=57&&!/\D/.test(t)}function l(t){return"__proto__"==t||"✖"==t||Nt&&"__iterator__"==t}function h(t,e){var r=Ct.props[t]||(Ct.props[t]=[]);r.push(e)}function g(t){return Ct.props[t]}function y(e){if(Ct.workList)return e(Ct.workList);for(var r=[],n=0,o=Ct.workList=function(t,e,o){n<Ft-It*r.length&&r.push(t,e,o,n)},i=e(o),s=0;s<r.length;s+=4){if(At&&+new Date>=At)throw new t.TimedOut;n=r[s+3]+1,r[s+1].addType(r[s],r[s+2])}return Ct.workList=null,i}function d(t,e,r){var n=Ct.curSuperCtor,o=Ct.curSuper;Ct.curSuperCtor=t,Ct.curSuper=e;var i=r();return Ct.curSuperCtor=n,Ct.curSuper=o,i}function v(t){for(;t.isBlock;)t=t.prev;return t}function m(t,e){var r=v(t).fnType;r&&(r.instantiateScore=(r.instantiateScore||0)+e)}function P(t,e){try{return n.simple(t,{Expression:function(){if(--e<=0)throw Dt}}),!0}catch(r){if(r==Dt)return!1;throw r}}function b(t,e){var r=e.instantiateScore;return!Ct.disabledComputing&&r&&e.args.length&&P(t,5*r)?(m(v(e.originNode.scope.prev),r/2),w(t,e),!0):void(e.instantiateScore=null)}function w(t,e){for(var r=0;r<e.args.length;++r)e.args[r]=new st;e.self=new st,e.computeRet=function(r,o){return f(e,function(){var i=Ct.curOrigin;Ct.curOrigin=e.origin;var s=t.scope,p=new Ht(s.prev,s.originNode);for(var a in s.props)for(var u=p.defProp(a,s.props[a].originNode),f=0;f<o.length;++f)e.argNames[f]==a&&f<o.length&&o[f].propagate(u);for(var c=e.argNames.length!=o.length?e.argNames.slice(0,o.length):e.argNames;c.length<o.length;)c.push("?");if(p.fnType=new Ot(e.name,r,o,c,K,e.generator),p.fnType.originNode=e.originNode,e.arguments){var l=p.fnType.arguments=new st;p.defProp("arguments").addType(new jt(l));for(var f=0;f<o.length;++f)o[f].propagate(l)}return t.scope=p,n.recursive(t.body,p,null,Rt),n.recursive(t.body,p,null,qt),Ct.curOrigin=i,p.fnType.retval})}}function T(t){function e(t,n,o){if(!(o>3)&&t.forward)for(var i=0;i<t.forward.length;++i){var s=t.forward[i].propagatesTo();if(s){var p,a=n;if(s instanceof st)p=s;else{if(!(s.target instanceof st))continue;a+=s.pathExt,p=s.target}if(p==r)return a;var u=e(p,a,o+1);if(u)return u}}}var r=t.retval;if(r!=K){var n,i;!r.isEmpty()&&(n=r.getType())instanceof jt&&(r=i=n.getProp("<i>"));for(var s=e(t.self,"!this",0),p=0;!s&&p<t.args.length;++p)s=e(t.args[p],"!"+p,0);if(s){i&&(s="["+s+"]");var a=new o.TypeParser(s),u=a.parseType(!0);return t.computeRet=u.apply?u:function(){return u},t.computeRetSource=s,!0}}}function x(t,e){return t.defProp(e.name,e)}function E(t){return"Identifier"==t.type?t.name:"AssignmentPattern"==t.type?E(t.left):"ObjectPattern"==t.type?"{"+t.properties.map(function(t){return E(t.value)}).join(", ")+"}":"ArrayPattern"==t.type?"["+t.elements.map(E).join(", ")+"]":"RestElement"==t.type?"..."+E(t.argument):"_"}function S(t){return"VariableDeclaration"==t.type&&"var"!=t.kind||"FunctionDeclaration"==t.type||"ClassDeclaration"==t.type}function N(t,e){return{inner:t,outer:e||t}}function O(t){var e=t.getSymbolType();if(e)return e.asPropName()}function j(t){switch(t){case"+":case"-":case"~":return Ct.num;case"!":return Ct.bool;case"typeof":return Ct.str;case"void":case"delete":return K}}function k(t){switch(t){case"==":case"!=":case"===":case"!==":case"<":case">":case">=":case"<=":case"in":case"instanceof":return!0}}function C(t){if(t.regex)return yt(Ct.protos.RegExp);switch(typeof t.value){case"boolean":return Ct.bool;case"number":return Ct.num;case"string":return Ct.str;case"object":case"function":return t.value?yt(Ct.protos.RegExp):K}}function A(t,e){if(t==e||e==K)return t;if(t==K)return e;var r=new st;return t.propagate(r),e.propagate(r),r}function F(t,e){for(var r=0;r<t.params.length;r++){var n=t.params[r];"Identifier"!=n.type&&H(n,e,t.scope.fnType.args[r])}}function I(t,e){return e.hasProp(t.name)||Ct.topScope.defProp(t.name,t)}function H(t,e,r){var n=_t[t.type];n&&n(t,e,r)}function D(t){var e=v(t);return e.fnType?e.fnType.self:e}function R(t){t.isEmpty()&&t.propertyOf&&(t.propertyOf.getProp(t.propertyName).addType(new St,rt),R(t.propertyOf))}function M(t,e,r){!r&&t.id&&(r=t.id.name);var n,o,i=Ct.protos.Object;if(t.superClass)if("Literal"==t.superClass.type&&null==t.superClass.value)i=null;else{var s,p=G(t.superClass,e);n=p.getFunctionType(),n&&(s=n.getProp("prototype").getObjType())?i=s:(n=p,o=p.getProp("prototype"))}var a=new St(i,r&&r+".prototype");return o&&o.propagate(new wt(a)),d(n,o||i,function(){for(var n,o=t.body.body,i=0;i<o.length;i++)"constructor"==o[i].kind&&(n=o[i].value);var s=t.objType=n?G(n,e):new Ot(r,K,[],null,K);s.originNode=t.id||n||t;var p=yt(a,s);s.self.addType(p),s.defProp("prototype",t).addType(a);for(var i=0;i<o.length;i++){var u,f=o[i];if("constructor"!=f.kind){var c=Mt(f,e);"<i>"==c||"set"==f.kind?u=K:(u=(f["static"]?s:a).defProp(c,f.key),u.initializer=!0,"get"==f.kind&&(u=new lt(p,[],null,u))),G(f.value,e,u);var l=u.getFunctionType();l&&l.self.addType(p)}}return s})}function _(t,e,r){var n=t.length>1&&t.length<6;if(n){for(var o,i=!0,s=0;s<t.length;s++){var p=t[s];p?"Literal"!=p.type||o&&o!=typeof p.value?i=!1:o=typeof p.value:n=!1}i&&(n=!1)}if(n){for(var a=[],s=0;s<t.length;++s)a.push(r(t[s],e));return new jt(a)}if(t.length<2)return new jt(t[0]&&r(t[0],e));for(var u=new st,s=0;s<t.length;s++)t[s]&&r(t[s],e).propagate(u);return new jt(u)}function L(t){return function(e,r,n,o){var i=t(e,r,o);return n&&i.propagate(n),i}}function q(t){return function(e,r,n,o){return n||(n=new st),t(e,r,n,o),n}}function G(t,e,r,n){var o=Lt[t.type];return o?o(t,e,r,n):K}function V(t){return"VariableDeclaration"==t.type?t.declarations[0].id:t}function z(t,e,r){var n=Array.isArray(t);return n&&1==t.length&&(t=t[0],n=!1),n?null==r?function(e){return t.indexOf(e.origin)>-1}:function(n,o){return o&&o.start>=e&&o.end<=r&&t.indexOf(n.origin)>-1}:null==r?function(e){return e.origin==t}:function(n,o){return o&&o.start>=e&&o.end<=r&&n.origin==t}}function B(t){Ut=!0;var e=g(t);if(e)for(var r=0;r<e.length;++r){var n=e[r].getProp(t);if(!n.isEmpty())return n}return K}function U(t,e){var r=new St((!0));r.defProp("done").addType(Ct.bool),e.propagate(r.defProp("value"));var n=new Ot(null,K,t?[t]:[],t?["?"]:[],r),o=new St(Ct.definitions.ecma6&&Ct.definitions.ecma6.generator_prototype||!0);return o.defProp("next").addType(n),o}function W(t,e){return t.generator?t.computeRet?U(t.yieldval,e):(t.generator===!0&&(t.generator=U(t.yieldval,e)),t.generator):e}function $(t,e,r){var n=Y(t,r).getFunctionType();if(!n)return K;var o=n.retval;if(n.computeRet){for(var i=0,s=[];i<e.length;++i)s.push(Y(e[i],r));var p=K;"MemberExpression"==t.type&&(p=Y(t.object,r)),o=n.computeRet(p,s,e)}return W(n,o)}function Y(t,e){var r=Vt[t.type];return r?r(t,e):K}var J=t.toString=function(t,e,r){return!t||t==r||e&&e<-3?"?":t.toString(e,r)},K=t.ANull=i.mixin({addType:function(){},propagate:function(){},getProp:function(){return K},forAllProps:function(){},hasType:function(){return!1},isEmpty:function(){return!0},getFunctionType:function(){},getObjType:function(){},getSymbolType:function(){},getType:function(){},gatherProperties:function(){},propagatesTo:function(){},typeHint:function(){},propHint:function(){},toString:function(){return"?"}}),Q=100,X=90,Z=10,tt=6,et=6,rt=1,nt=90,ot=2,it=4,st=t.AVal=function(){this.types=[],this.forward=null,this.maxWeight=0};st.prototype=s(K,{addType:function(t,e){if(e=e||Q,this.maxWeight<e){if(this.maxWeight=e,1==this.types.length&&this.types[0]==t)return;this.types.length=0}else if(this.maxWeight>e||this.types.indexOf(t)>-1)return;this.signal("addType",t),this.types.push(t);var r=this.forward;r&&y(function(n){for(var o=0;o<r.length;++o)n(t,r[o],e)})},propagate:function(t,e){if(!(t==K||t instanceof xt&&this.forward&&this.forward.length>2)){e&&e!=Q&&(t=new Tt(t,e)),(this.forward||(this.forward=[])).push(t);var r=this.types;r.length&&y(function(n){for(var o=0;o<r.length;++o)n(r[o],t,e)})}},getProp:function(t){if(l(t))return K;var e=(this.props||(this.props=Object.create(null)))[t];return e||(e=this.props[t]=new st,this.propagate(new ut(t,e))),e},forAllProps:function(t){this.propagate(new ct(t))},hasType:function(t){return this.types.indexOf(t)>-1},isEmpty:function(){return 0===this.types.length},getFunctionType:function(){for(var t=this.types.length-1;t>=0;--t)if(this.types[t]instanceof Ot)return this.types[t]},getObjType:function(){for(var t=null,e=this.types.length-1;e>=0;--e){var r=this.types[e];if(r instanceof St){if(r.name)return r;t||(t=r)}}return t},getSymbolType:function(){for(var t=this.types.length-1;t>=0;--t)if(this.types[t]instanceof kt)return this.types[t]},getType:function(t){return 0===this.types.length&&t!==!1?this.makeupType():1===this.types.length?this.types[0]:u(this.types)},toString:function(t,e){if(0==this.types.length)return J(this.makeupType(),t,e);if(1==this.types.length)return J(this.types[0],t,e);var r=pt(this.types);return r.length>2?"?":r.map(function(r){return J(r,t,e)}).join("|")},makeupPropType:function(t){var e=this.propertyName,r=t.proto&&t.proto.hasProp(e);if(r){var n=r.getType();if(n)return n}if("<i>"!=e){var o=t.hasProp("<i>");if(o)return o.getType()}else if(t.props["<i>"]!=this)for(var i in t.props){var s=t.props[i];if(!s.isEmpty())return s.getType()}},makeupType:function(){var t=this.propertyOf&&this.makeupPropType(this.propertyOf);if(t)return t;if(!this.forward)return null;for(var e=this.forward.length-1;e>=0;--e){var r=this.forward[e].typeHint();if(r&&!r.isEmpty())return Ut=!0,r}for(var n=Object.create(null),o=null,e=0;e<this.forward.length;++e){var i=this.forward[e].propHint();i&&"length"!=i&&"<i>"!=i&&"✖"!=i&&i!=Ct.completingProperty&&(n[i]=!0,o=i)}if(!o)return null;var s=g(o);if(s){var p=[];t:for(var e=0;e<s.length;++e){var a=s[e];for(var i in n)if(!a.hasProp(i))continue t;a.hasCtor&&(a=yt(a)),p.push(a)}var f=u(p);if(f)return Ut=!0,f}},typeHint:function(){return this.types.length?this.getType():null},propagatesTo:function(){return this},gatherProperties:function(t,e){for(var r=0;r<this.types.length;++r)this.types[r].gatherProperties(t,e)},guessProperties:function(t){if(this.forward)for(var e=0;e<this.forward.length;++e){var r=this.forward[e].propHint();r&&t(r,null,0)}var n=this.makeupType();n&&n.gatherProperties(t)}});var pt=t.simplifyTypes=function(t){var e=[];t:for(var r=0;r<t.length;++r){for(var n=t[r],o=0;o<e.length;o++){var i=a(n,e[o],0);if(i){e[o]=i;continue t}}e.push(n)}return e},at=t.constraint=function(t){var e=function(){this.origin=Ct.curOrigin,this.construct.apply(this,arguments)};e.prototype=Object.create(K);for(var r in t)t.hasOwnProperty(r)&&(e.prototype[r]=t[r]);return e},ut=at({construct:function(t,e){this.prop=t,this.target=e},addType:function(t,e){t.getProp&&t.getProp(this.prop).propagate(this.target,e)},propHint:function(){return this.prop},propagatesTo:function(){if("<i>"==this.prop||!/[^\w_]/.test(this.prop))return{target:this.target,pathExt:"."+this.prop}}}),ft=t.PropHasSubset=t.DefProp=at({construct:function(t,e,r){this.prop=t,this.type=e,this.originNode=r},addType:function(t,e){if(t instanceof St){var r=t.defProp(this.prop,this.originNode);r.origin||(r.origin=this.origin),this.type.propagate(r,e)}},propHint:function(){return this.prop}}),ct=at({construct:function(t){this.c=t},addType:function(t){t instanceof St&&t.forAllProps(this.c)}}),lt=t.IsCallee=at({construct:function(t,e,r,n){this.self=t,this.args=e,this.argNodes=r,this.retval=n,this.disabled=Ct.disabledComputing},addType:function(t,e){if(t instanceof Ot){for(var r=0;r<this.args.length;++r)r<t.args.length&&this.args[r].propagate(t.args[r],e),t.arguments&&this.args[r].propagate(t.arguments,e);this.self.propagate(t.self,this.self==Ct.topScope?nt:e);var n=t.computeRet,o=t.retval;if(n)for(var i=this.disabled;i;i=i.prev)(i.fn==t||t.originNode&&i.fn.originNode==t.originNode)&&(n=null);if(n){var s=Ct.disabledComputing;Ct.disabledComputing=this.disabled,o=n(this.self,this.args,this.argNodes),Ct.disabledComputing=s}W(t,o).propagate(this.retval,e)}},typeHint:function(){for(var t=[],e=0;e<this.args.length;++e)t.push("?");return new Ot(null,this.self,this.args,t,K)},propagatesTo:function(){return{target:this.retval,pathExt:".!ret"}}}),ht=at({construct:function(t,e,r,n){this.propName=t,this.args=e,this.argNodes=r,this.retval=n,this.disabled=Ct.disabledComputing},addType:function(t,e){var r=new lt(t,this.args,this.argNodes,this.retval);r.disabled=this.disabled,t.getProp(this.propName).propagate(r,e)},propHint:function(){return this.propName}}),gt=t.IsCtor=at({construct:function(t,e){this.target=t,this.noReuse=e},addType:function(t,e){t instanceof Ot&&(Ct.parent&&!Ct.parent.options.reuseInstances&&(this.noReuse=!0),t.getProp("prototype").propagate(new dt(!this.noReuse&&t,this.target),e))}}),yt=t.getInstance=function(t,e){if(e===!1)return new St(t);e||(e=t.hasCtor),t.instances||(t.instances=[]);for(var r=0;r<t.instances.length;++r){var n=t.instances[r];if(n.ctor==e)return n.instance}var o=new St(t,e&&e.name);return o.origin=t.origin,t.instances.push({ctor:e,instance:o}),o},dt=t.IsProto=at({construct:function(t,e){this.ctor=t,this.target=e},addType:function(t,e){t instanceof St&&((this.count=(this.count||0)+1)>8||(t==Ct.protos.Array?this.target.addType(new jt):this.target.addType(yt(t,this.ctor))))}}),vt=at({construct:function(t){this.fn=t},addType:function(t,e){if(t instanceof St&&!t.hasCtor){t.hasCtor=this.fn;var r=new bt(t,this.fn);r.addType(this.fn),t.forAllProps(function(t,e,n){n&&e.propagate(r)})}}}),mt=at({construct:function(t,e){this.other=t,this.target=e},addType:function(t,e){t==Ct.str?this.target.addType(Ct.str,e):t==Ct.num&&this.other.hasType(Ct.num)&&this.target.addType(Ct.num,e)},typeHint:function(){return this.other}}),Pt=t.IfObj=at({construct:function(t){this.target=t},addType:function(t,e){t instanceof St&&this.target.addType(t,e)},propagatesTo:function(){return this.target}}),bt=at({construct:function(t,e){this.obj=t,this.ctor=e},addType:function(t){t instanceof Ot&&t.self&&t.self.addType(yt(this.obj,this.ctor),it)}}),wt=at({construct:function(t){this.obj=t},addType:function(t){t instanceof St&&this.obj.proto==Ct.protos.Object&&this.obj.replaceProto(t)}}),Tt=at({construct:function(t,e){this.inner=t,this.weight=e},addType:function(t,e){this.inner.addType(t,Math.min(e,this.weight))},propagatesTo:function(){return this.inner.propagatesTo()},typeHint:function(){return this.inner.typeHint()},propHint:function(){return this.inner.propHint()}}),xt=t.Type=function(){};xt.prototype=s(K,{constructor:xt,propagate:function(t,e){t.addType(this,e)},hasType:function(t){return t==this},isEmpty:function(){return!1},typeHint:function(){return this},getType:function(){return this}});var Et=t.Prim=function(t,e){this.name=e,this.proto=t};Et.prototype=s(xt.prototype,{constructor:Et,toString:function(){return this.name},getProp:function(t){return this.proto.hasProp(t)||K},gatherProperties:function(t,e){this.proto&&this.proto.gatherProperties(t,e)}});var St=t.Obj=function(t,e){if(this.props||(this.props=Object.create(null)),this.proto=t===!0?Ct.protos.Object:t,this.proto&&!(this.proto instanceof St))throw new Error("bad "+Object.keys(this.proto).join());if(t&&!e&&t.name&&!(this instanceof Ot)){var r=/^(.*)\.prototype$/.exec(this.proto.name);r&&(e=r[1])}this.name=e,this.maybeProps=null,this.origin=Ct.curOrigin};St.prototype=s(xt.prototype,{constructor:St,toString:function(t){if(null==t&&(t=0),t<=0&&this.name)return this.name;var e=[],r=!1;for(var n in this.props)if("<i>"!=n){if(e.length>5){r=!0;break}t?e.push(n+": "+J(this.props[n],t-1,this)):e.push(n)}return e.sort(),r&&e.push("..."),"{"+e.join(", ")+"}"},hasProp:function(t,e){c(t)&&(t=this.normalizeIntegerProp(t));var r=this.props[t];if(e!==!1)for(var n=this.proto;n&&!r;n=n.proto)r=n.props[t];return r},defProp:function(t,e){var r=this.hasProp(t,!1);if(r)return e&&!r.originNode&&(r.originNode=e),r;if(l(t))return K;c(t)&&(t=this.normalizeIntegerProp(t));var n=this.maybeProps&&this.maybeProps[t];return n?(delete this.maybeProps[t],this.maybeUnregProtoPropHandler()):(n=new st,n.propertyOf=this,n.propertyName=t),this.props[t]=n,n.originNode=e,n.origin=Ct.curOrigin,this.broadcastProp(t,n,!0),n},getProp:function(t){var e=this.hasProp(t,!0)||this.maybeProps&&this.maybeProps[t];if(e)return e;if(l(t))return K;c(t)&&(t=this.normalizeIntegerProp(t));var r=this.ensureMaybeProps()[t]=new st;return r.propertyOf=this,r.propertyName=t,r},normalizeIntegerProp:function(t){return"<i>"},broadcastProp:function(t,e,r){if(r&&(this.signal("addProp",t,e),this instanceof Ht||h(t,this)),this.onNewProp)for(var n=0;n<this.onNewProp.length;++n){var o=this.onNewProp[n];o.onProtoProp?o.onProtoProp(t,e,r):o(t,e,r)}},onProtoProp:function(t,e,r){var n=this.maybeProps&&this.maybeProps[t];n&&(delete this.maybeProps[t],this.maybeUnregProtoPropHandler(),this.proto.getProp(t).propagate(n)),this.broadcastProp(t,e,!1)},replaceProto:function(t){this.proto&&this.maybeProps&&this.proto.unregPropHandler(this),this.proto=t,this.maybeProps&&this.proto.forAllProps(this)},ensureMaybeProps:function(){return this.maybeProps||(this.proto&&this.proto.forAllProps(this),this.maybeProps=Object.create(null)),this.maybeProps},removeProp:function(t){var e=this.props[t];delete this.props[t],this.ensureMaybeProps()[t]=e,e.types.length=0},forAllProps:function(t){this.onNewProp||(this.onNewProp=[],this.proto&&this.proto.forAllProps(this)),this.onNewProp.push(t);for(var e=this;e;e=e.proto)for(var r in e.props)t.onProtoProp?t.onProtoProp(r,e.props[r],e==this):t(r,e.props[r],e==this)},maybeUnregProtoPropHandler:function(){if(this.maybeProps){for(var t in this.maybeProps)return;this.maybeProps=null}!this.proto||this.onNewProp&&this.onNewProp.length||this.proto.unregPropHandler(this)},unregPropHandler:function(t){for(var e=0;e<this.onNewProp.length;++e)if(this.onNewProp[e]==t){this.onNewProp.splice(e,1);break}this.maybeUnregProtoPropHandler()},gatherProperties:function(t,e){for(var r in this.props)"<i>"!=r&&":"!=r.charAt(0)&&t(r,this,e);this.proto&&this.proto.gatherProperties(t,e+1)},getObjType:function(){return this}});var Nt="undefined"!=typeof StopIteration,Ot=t.Fn=function(t,e,r,n,o,i){St.call(this,Ct.protos.Function,t),this.self=e,this.args=r,this.argNames=n,this.retval=o,this.generator=i};Ot.prototype=s(St.prototype,{constructor:Ot,toString:function(t){null==t&&(t=0);for(var e=this.generator?"fn*(":"fn(",r=0;r<this.args.length;++r){r&&(e+=", ");var n=this.argNames[r];n&&"?"!=n&&(e+=n+": "),e+=t>-3?J(this.args[r],t-1,this):"?"}return e+=")",this.retval.isEmpty()||(e+=" -> "+(t>-3?J(this.retval,t-1,this):"?")),e},getProp:function(t){if("prototype"==t){var e=this.hasProp(t,!1);if(!e){e=this.defProp(t);var r=new St((!0),this.name&&this.name+".prototype");r.origin=this.origin,e.addType(r,Z)}return e}return St.prototype.getProp.call(this,t)},defProp:function(t,e){if("prototype"==t){var r=this.hasProp(t,!1);return r?r:(r=St.prototype.defProp.call(this,t,e),r.origin=this.origin,r.propagate(new vt(this)),r)}return St.prototype.defProp.call(this,t,e)},getFunctionType:function(){return this}});var jt=t.Arr=function(t){St.call(this,Ct.protos.Array);var e=this.defProp("<i>");if(Array.isArray(t)){this.tuple=t.length;for(var r=0;r<t.length;r++){var n=this.defProp(String(r));t[r].propagate(n),n.propagate(e)}}else t&&(this.tuple=0,t.propagate(e))};jt.prototype=s(St.prototype,{constructor:jt,toString:function(t){if(null==t&&(t=0),t<=-3)return"[?]";var e="";if(this.tuple){for(var r,n=0;n in this.props;n++){var o=J(this.getProp(String(n)),t-1,this);r=null==r?o:r==o&&o,e+=(e?", ":"")+o}r&&(e=r)}else e=J(this.getProp("<i>"),t-1,this);return"["+e+"]"},normalizeIntegerProp:function(t){return+t<this.tuple?t:"<i>"}});var kt=t.Sym=function(t,e){Et.call(this,Ct.protos.Symbol,"Symbol"),this.symName=t,this.originNode=e};kt.prototype=s(Et.prototype,{constructor:kt,asPropName:function(){return":"+this.symName},getSymbolType:function(){return this}}),t.getSymbol=function(t,e){var r=t.replace(/[^\w$\.]/g,"_"),n=Ct.symbols[r];return n?(e&&!n.originNode&&(n.originNode=e),n):Ct.symbols[r]=new kt(r,e)},t.Context=function(e,r){this.parent=r,this.props=Object.create(null),this.protos=Object.create(null),this.origins=[],this.curOrigin="ecma5",this.paths=Object.create(null),this.definitions=Object.create(null),this.purgeGen=0,this.workList=null,this.disabledComputing=null,this.curSuperCtor=this.curSuper=null,this.symbols=Object.create(null),t.withContext(this,function(){if(Ct.protos.Object=new St(null,"Object.prototype"),Ct.topScope=new Ht,Ct.topScope.name="<top>",Ct.protos.Array=new St((!0),"Array.prototype"),Ct.protos.Function=new Ot("Function.prototype",K,[],[],K),Ct.protos.Function.proto=Ct.protos.Object,Ct.protos.RegExp=new St((!0),"RegExp.prototype"),Ct.protos.String=new St((!0),"String.prototype"),Ct.protos.Number=new St((!0),"Number.prototype"),Ct.protos.Boolean=new St((!0),"Boolean.prototype"),Ct.protos.Symbol=new St((!0),"Symbol.prototype"),Ct.str=new Et(Ct.protos.String,"string"),Ct.bool=new Et(Ct.protos.Boolean,"bool"),Ct.num=new Et(Ct.protos.Number,"number"),Ct.curOrigin=null,e)for(var t=0;t<e.length;++t)o.load(e[t])})},t.Context.prototype.startAnalysis=function(){this.disabledComputing=this.workList=this.curSuperCtor=this.curSuper=null};var Ct=null;t.cx=function(){return Ct},t.withContext=function(t,e){var r=Ct;Ct=t;try{return e()}finally{Ct=r}},t.TimedOut=function(){this.message="Timed out",this.stack=(new Error).stack},t.TimedOut.prototype=Object.create(Error.prototype),t.TimedOut.prototype.name="infer.TimedOut";var At;t.withTimeout=function(t,e){var r=+new Date+t,n=At;if(n&&n<r)return e();At=r;try{return e()}finally{At=n}},t.addOrigin=function(t){Ct.origins.indexOf(t)<0&&Ct.origins.push(t)};var Ft=20,It=1e-4,Ht=t.Scope=function(t,e,r){St.call(this,t||!0),this.prev=t,this.originNode=e,this.isBlock=!!r};Ht.prototype=s(St.prototype,{constructor:Ht,defVar:function(t,e){for(var r=this;;r=r.proto){var n=r.props[t];if(n)return n;if(!r.prev)return r.defProp(t,e)}}});var Dt={},Rt=t.scopeGatherer=n.make({VariablePattern:function(t,e){e.inner&&x(e.inner,t)},AssignmentPattern:function(t,e,r){r(t.left,e,"Pattern"),r(t.right,e.outer,"Expression")},AssignmentExpression:function(t,e,r){"MemberExpression"==t.left.type?r(t.left,e,"Expression"):r(t.left,N(!1,e),"Pattern"),r(t.right,e,"Expression")},Function:function(t,e,r){if(e.inner)throw new Error("problem at "+t.start+" "+t.type);for(var n=t.scope=new Ht(e,t),o=[],i=[],s=0;s<t.params.length;++s){var p=t.params[s];if(i.push(E(p)),"Identifier"==p.type)o.push(x(n,p));else{var a=new st;o.push(a),a.originNode=p,r(p,N(n),"Pattern")}}if(n.fnType=new Ot(t.id&&t.id.name,new st,o,i,K,t.generator),n.fnType.originNode=t,t.id){var u="FunctionDeclaration"==t.type;x(u?e:n,t.id)}r(t.body,n,t.expression?"Expression":"Statement")},BlockStatement:function(t,e,r){!t.scope&&t.body.some(S)&&(e=t.scope=new Ht(e,t,(!0))),n.base.BlockStatement(t,e,r)},TryStatement:function(t,e,r){if(r(t.block,e,"Statement"),t.handler)if("Identifier"==t.handler.param.type){var n=x(e,t.handler.param);r(t.handler.body,e,"Statement");var o=Ct.definitions.ecma5;o&&n.isEmpty()&&yt(o["Error.prototype"]).propagate(n,et)}else r(t.handler.param,N(e),"Pattern");t.finalizer&&r(t.finalizer,e,"Statement")},VariableDeclaration:function(t,e,r){for(var n="var"==t.kind?v(e):e,o=0;o<t.declarations.length;++o){var i=t.declarations[o];r(i.id,N(n,e),"Pattern"),i.init&&r(i.init,e,"Expression")}},ClassDeclaration:function(t,e,r){x(e,t.id),t.superClass&&r(t.superClass,e,"Expression");for(var n=0;n<t.body.body.length;n++)r(t.body.body[n],e)},ForInStatement:function(t,e,r){!t.scope&&S(t.left)&&(e=t.scope=new Ht(e,t,(!0))),n.base.ForInStatement(t,e,r)},ForStatement:function(t,e,r){!t.scope&&t.init&&S(t.init)&&(e=t.scope=new Ht(e,t,(!0))),n.base.ForStatement(t,e,r)},ImportDeclaration:function(t,e){for(var r=0;r<t.specifiers.length;r++)x(e,t.specifiers[r].local)}});Rt.ForOfStatement=Rt.ForInStatement;var Mt=t.propName=function(t,e){var r=t.property||t.key;if(!t.computed&&"Identifier"==r.type)return r.name;if("Literal"==r.type){if("string"==typeof r.value)return r.value;if("number"==typeof r.value)return String(r.value)}if(e){var n=O(G(r,e));if(n)return t.propName=n}else if(t.propName)return t.propName;return"<i>"},_t=t.inferPatternVisitor={Identifier:function(t,e,r){r.propagate(I(t,e))},MemberExpression:function(t,e,r){var n=G(t.object,e),o=Mt(t,e);n.propagate(new ft(o,r,t.property))},RestElement:function(t,e,r){H(t.argument,e,new jt(r))},ObjectPattern:function(t,e,r){for(var n=0;n<t.properties.length;++n){var o=t.properties[n];H(o.value,e,r.getProp(o.key.name))}},ArrayPattern:function(t,e,r){for(var n=0;n<t.elements.length;n++)t.elements[n]&&H(t.elements[n],e,r.getProp(String(n)))},AssignmentPattern:function(t,e,r){H(t.left,e,A(r,G(t.right,e)))}},Lt=t.inferExprVisitor={ArrayExpression:L(function(t,e){return _(t.elements,e,G)}),ObjectExpression:L(function(t,e,r){for(var n,o=!0,i=0;i<t.properties.length;++i){var s=t.properties[i];if("__proto__"==s.key.name)if("Literal"==s.value.type&&null==s.value.value)o=null;else{var p=G(s.value,e),a=p.getObjType();a?o=a:n=p}}var u=t.objType=new St(o,r);return n&&n.propagate(new wt(u)),u.originNode=t,d(null,n||o,function(){for(var r=0;r<t.properties.length;++r){var n=t.properties[r],o=n.key;if(!l(n.key.name)){var i,s=Mt(n,e);if("<i>"==s||"set"==n.kind)i=K;else{var p=i=u.defProp(s,o);p.initializer=!0,"get"==n.kind&&(i=new lt(u,[],null,p))}G(n.value,e,i,s),"FunctionExpression"==n.value.type&&n.value.scope.fnType.self.addType(u,ot)}}}),u}),FunctionExpression:L(function(t,e,r){var o=t.scope,i=o.fnType;return r&&!i.name&&(i.name=r),F(t,o),t.expression?G(t.body,o,o.fnType.retval=new st):n.recursive(t.body,o,null,qt,"Statement"),"ArrowFunctionExpression"==t.type&&(D(e).propagate(i.self),i.self=K),b(t,i)||T(i),t.id&&o.getProp(t.id.name).addType(i),i}),ClassExpression:L(M),SequenceExpression:L(function(t,e){for(var r=0,n=t.expressions.length-1;r<n;++r)G(t.expressions[r],e,K);return G(t.expressions[n],e)}),UnaryExpression:L(function(t,e){return G(t.argument,e,K),j(t.operator)}),UpdateExpression:L(function(t,e){return G(t.argument,e,K),Ct.num}),BinaryExpression:L(function(t,e){if("+"==t.operator){var r=G(t.left,e),n=G(t.right,e);if(r.hasType(Ct.str)||n.hasType(Ct.str))return Ct.str;if(r.hasType(Ct.num)&&n.hasType(Ct.num))return Ct.num;var o=new st;return r.propagate(new mt(n,o)),n.propagate(new mt(r,o)),o}return G(t.left,e,K),G(t.right,e,K),k(t.operator)?Ct.bool:Ct.num}),AssignmentExpression:L(function(t,e,r){var n,o;if("MemberExpression"==t.left.type?(o=Mt(t.left,e),r||(r="Identifier"==t.left.object.type?t.left.object.name+"."+o:o)):r||"Identifier"!=t.left.type||(r=t.left.name),t.operator&&"="!=t.operator&&"+="!=t.operator?(G(t.right,e,K),n=Ct.num):n=G(t.right,e,null,r),"MemberExpression"==t.left.type){var i=G(t.left.object,e);if("prototype"==o&&m(e,20),"<i>"==o){var s=t.left.property.name,p=e.props[s],a=p&&p.iteratesOver;if(a){m(e,20);var u="MemberExpression"==t.right.type&&t.right.computed&&t.right.property.name==s;return a.forAllProps(function(t,e,r){r&&"prototype"!=t&&"<i>"!=t&&i.propagate(new ft(t,u?e:K))}),n}}i.propagate(new ft(o,n,t.left.property)),R(i),"FunctionExpression"==t.right.type&&i.propagate(t.right.scope.fnType.self,ot)}else H(t.left,e,n);return n}),LogicalExpression:q(function(t,e,r){G(t.left,e,r),G(t.right,e,r)}),ConditionalExpression:q(function(t,e,r){G(t.test,e,K),G(t.consequent,e,r),G(t.alternate,e,r)}),NewExpression:q(function(t,e,r,n){"Identifier"==t.callee.type&&t.callee.name in e.props&&m(e,20);for(var o=0,i=[];o<t.arguments.length;++o)i.push(G(t.arguments[o],e));var s=G(t.callee,e),p=new st;s.propagate(new gt(p,n&&/\.prototype$/.test(n))),p.propagate(r,X),s.propagate(new lt(p,i,t.arguments,new Pt(r)))}),CallExpression:q(function(t,e,r){for(var n=0,o=[];n<t.arguments.length;++n)o.push(G(t.arguments[n],e));var i=v(e).fnType;if("MemberExpression"==t.callee.type){var s=G(t.callee.object,e),p=Mt(t.callee,e);i&&("call"==p||"apply"==p)&&i.args.indexOf(s)>-1&&m(e,30),s.propagate(new ht(p,o,t.arguments,r))}else if("Super"==t.callee.type&&Ct.curSuperCtor)Ct.curSuperCtor.propagate(new lt(D(e),o,t.arguments,r));else{var a=G(t.callee,e);i&&i.args.indexOf(a)>-1&&m(e,30);var u=a.getFunctionType();u&&u.instantiateScore&&i&&m(e,u.instantiateScore/5),a.propagate(new lt(Ct.topScope,o,t.arguments,r))}}),MemberExpression:q(function(t,e,r){var n,o=Mt(t);if("<i>"==o){var i=G(t.property,e),s=O(i);s?o=t.propName=s:i.hasType(Ct.num)||(n=tt)}G(t.object,e).getProp(o).propagate(r,n)}),Identifier:L(function(t,e){if("arguments"==t.name){var r=v(e);!r.fnType||t.name in r.props||e.defProp(t.name,r.fnType.originNode).addType(new jt(r.fnType.arguments=new st))}return e.getProp(t.name)}),ThisExpression:L(function(t,e){return D(e)}),Super:L(function(t){return t.superType=Ct.curSuper||K}),Literal:L(function(t){return C(t)}),TemplateLiteral:L(function(t,e){for(var r=0;r<t.expressions.length;++r)G(t.expressions[r],e,K);return Ct.str}),TaggedTemplateExpression:q(function(t,e,r){for(var n=[new jt(Ct.str)],o=0;o<t.quasi.expressions.length;++o)n.push(G(t.quasi.expressions[o],e));G(t.tag,e,new lt(Ct.topScope,n,t.quasi.expressions,r))}),YieldExpression:L(function(t,e){var r=K,n=v(e).fnType;return n&&(n.retval==K&&(n.retval=new st),n.yieldval||(n.yieldval=new st),r=n.retval),t.argument&&(t.delegate?G(t.argument,e,new ht("next",[],null,new ut("value",r))):G(t.argument,e,r)),n?n.yieldval:K})};Lt.ArrowFunctionExpression=Lt.FunctionExpression;var qt=t.inferWrapper=n.make({Expression:function(t,e){G(t,t.scope||e,K)},FunctionDeclaration:function(t,e,r){var n=t.scope,o=n.fnType;F(t,n),r(t.body,n,"Statement"),b(t,o)||T(o),e.getProp(t.id.name).addType(o)},Statement:function(t,e,r){r(t,t.scope||e)},VariableDeclaration:function(t,e){for(var r=0;r<t.declarations.length;++r){var n=t.declarations[r];if("Identifier"==n.id.type){var o=e.getProp(n.id.name);n.init&&G(n.init,e,o,n.id.name)}else n.init&&H(n.id,e,G(n.init,e))}},ClassDeclaration:function(t,e){e.getProp(t.id.name).addType(M(t,e,t.id.name))},ReturnStatement:function(t,e){if(t.argument){var r=K,n=v(e).fnType;n&&(n.retval==K&&(n.retval=new st),r=n.retval),G(t.argument,e,r)}},ForInStatement:function(t,e,r){var n=G(t.right,e);if("Identifier"==t.right.type&&t.right.name in e.props||"MemberExpression"==t.right.type&&"prototype"==t.right.property.name){
	m(e,5);var o=V(t.left);"Identifier"==o.type?(o.name in e.props&&(e.getProp(o.name).iteratesOver=n),n.getProp("<i>").propagate(I(o,e))):H(o,e,n.getProp("<i>"))}r(t.body,e,"Statement")},ForOfStatement:function(t,e,r){var n,o=V(t.left);"Identifier"==o.type?n=I(o,e):H(o,e,n=new st),G(t.right,e,new ht(":Symbol.iterator",[],null,new ht("next",[],null,new ut("value",n)))),r(t.body,e,"Statement")}}),Gt=t.parse=function(t,n,o){n&&!Array.isArray(n)||(n=o);var i;try{i=e.parse(t,n)}catch(s){i=r.parse_dammit(t,n)}return i};t.analyze=function(e,r,o){"string"==typeof e&&(e=Gt(e)),r||(r="file#"+Ct.origins.length),t.addOrigin(Ct.curOrigin=r),o||(o=Ct.topScope),Ct.startAnalysis(),n.recursive(e,o,null,Rt),Ct.parent&&Ct.parent.signal("preInfer",e,o),n.recursive(e,o,null,qt),Ct.parent&&Ct.parent.signal("postInfer",e,o),Ct.curOrigin=null},t.purge=function(t,e,r){var n=z(t,e,r);++Ct.purgeGen,Ct.topScope.purge(n);for(var o in Ct.props){for(var i=Ct.props[o],s=0;s<i.length;++s){var p=i[s],a=p.props[o];a&&!n(a,a.originNode)||i.splice(s--,1)}i.length||delete Ct.props[o]}},st.prototype.purge=function(t){if(this.purgeGen!=Ct.purgeGen){this.purgeGen=Ct.purgeGen;for(var e=0;e<this.types.length;++e){var r=this.types[e];t(r,r.originNode)?this.types.splice(e--,1):r.purge(t)}if(this.types.length||(this.maxWeight=0),this.forward)for(var e=0;e<this.forward.length;++e){var n=this.forward[e];t(n)?(this.forward.splice(e--,1),this.props&&(this.props=null)):n.purge&&n.purge(t)}}},K.purge=function(){},St.prototype.purge=function(t){if(this.purgeGen==Ct.purgeGen)return!0;this.purgeGen=Ct.purgeGen;for(var e in this.props){var r=this.props[e];t(r,r.originNode)&&this.removeProp(e),r.purge(t)}},Ot.prototype.purge=function(t){if(!St.prototype.purge.call(this,t)){this.self.purge(t),this.retval.purge(t);for(var e=0;e<this.args.length;++e)this.args[e].purge(t)}};var Vt=t.typeFinder={ArrayExpression:function(t,e){return _(t.elements,e,Y)},ObjectExpression:function(t){return t.objType},ClassExpression:function(t){return t.objType},FunctionExpression:function(t){return t.scope.fnType},ArrowFunctionExpression:function(t){return t.scope.fnType},SequenceExpression:function(t,e){return Y(t.expressions[t.expressions.length-1],e)},UnaryExpression:function(t){return j(t.operator)},UpdateExpression:function(){return Ct.num},BinaryExpression:function(t,e){if(k(t.operator))return Ct.bool;if("+"==t.operator){var r=Y(t.left,e),n=Y(t.right,e);if(r.hasType(Ct.str)||n.hasType(Ct.str))return Ct.str}return Ct.num},AssignmentExpression:function(t,e){return Y(t.right,e)},LogicalExpression:function(t,e){var r=Y(t.left,e);return r.isEmpty()?Y(t.right,e):r},ConditionalExpression:function(t,e){var r=Y(t.consequent,e);return r.isEmpty()?Y(t.alternate,e):r},NewExpression:function(t,e){var r=Y(t.callee,e).getFunctionType(),n=r&&r.getProp("prototype").getObjType();return n?yt(n,r):K},CallExpression:function(t,e){return $(t.callee,t.arguments,e)},MemberExpression:function(t,e){var r=Mt(t),n=Y(t.object,e).getType();return n?n.getProp(r):"<i>"==r?K:B(r)},MethodDefinition:function(t){var e=t.key.name,r=D(t.value.scope).getType();return r?r.getProp(e):K},Identifier:function(t,e){return e.hasProp(t.name)||K},ThisExpression:function(t,e){return D(e)},Literal:function(t){return C(t)},Super:L(function(t){return t.superType}),TemplateLiteral:function(){return Ct.str},TaggedTemplateExpression:function(t,e){return $(t.tag,t.quasi.expressions,e)},YieldExpression:function(t,e){var r=v(e).fnType;return r?r.yieldval:K}},zt=t.searchVisitor=n.make({Function:function(t,e,r){n.base.Function(t,t.scope,r)},Property:function(t,e,r){t.computed&&r(t.key,e,"Expression"),t.key!=t.value&&r(t.value,e,"Expression")},Statement:function(t,e,r){r(t,t.scope||e)},ImportSpecifier:function(t,e,r){r(t.local,e)},ImportDefaultSpecifier:function(t,e,r){r(t.local,e)},ImportNamespaceSpecifier:function(t,e,r){r(t.local,e)}});t.fullVisitor=n.make({MemberExpression:function(t,e,r){r(t.object,e,"Expression"),r(t.property,e,t.computed?"Expression":null)},ObjectExpression:function(t,e,r){for(var n=0;n<t.properties.length;++n)r(t.properties[n].value,e,"Expression"),r(t.properties[n].key,e)}},zt),t.findExpressionAt=function(t,e,r,o,i){var s=i||function(t,e){return("Identifier"!=e.type||"✖"!=e.name)&&Vt.hasOwnProperty(e.type)};return n.findNodeAt(t,e,r,s,zt,o||Ct.topScope)},t.findExpressionAround=function(t,e,r,o,i){var s=i||function(t,r){return!(null!=e&&r.start>e)&&(("Identifier"!=r.type||"✖"!=r.name)&&Vt.hasOwnProperty(r.type))};return n.findNodeAround(t,r,s,zt,o||Ct.topScope)},t.expressionType=function(t){return Y(t.node,t.state)},t.parentNode=function(t,e){function r(e,i,s){if(e.start<=t.start&&e.end>=t.end){var p=o[o.length-1];if(e==t)throw{found:p};p!=e&&o.push(e),n.base[s||e.type](e,i,r),p!=e&&o.pop()}}var o=[];try{r(e,null)}catch(i){if(i.found)return i.found;throw i}};var Bt=t.findTypeFromContext={ArrayExpression:function(t,e,r){return r(t,!0).getProp("<i>")},ObjectExpression:function(t,e,r){for(var n=0;n<t.properties.length;++n){var o=e.properties[n];if(o.value==e)return r(t,!0).getProp(o.key.name)}},UnaryExpression:function(t){return j(t.operator)},UpdateExpression:function(){return Ct.num},BinaryExpression:function(t){return k(t.operator)?Ct.bool:Ct.num},AssignmentExpression:function(t,e,r){return r(t.left)},LogicalExpression:function(t,e,r){return r(t,!0)},ConditionalExpression:function(t,e,r){if(t.consequent==e||t.alternate==e)return r(t,!0)},CallExpression:function(t,e,r){for(var n=0;n<t.arguments.length;n++){var o=t.arguments[n];if(o==e){var i=r(t.callee).getFunctionType();if(i instanceof Ot)return i.args[n];break}}},ReturnStatement:function(t,e,r){var o=n.findNodeAround(e.sourceFile.ast,e.start,"Function");if(o){var i="FunctionDeclaration"!=o.node.type?r(o.node,!0).getFunctionType():o.node.scope.fnType;if(i)return i.retval.getType()}},VariableDeclarator:function(t,e,r){if(t.init==e)return r(t.id)}};Bt.NewExpression=Bt.CallExpression,t.typeFromContext=function(e,r){var n=t.parentNode(r.node,e),o=null;if(Bt.hasOwnProperty(n.type)){var i=Bt[n.type];o=i&&i(n,r.node,function(n,o){var i={node:n,state:r.state},s=o?t.typeFromContext(e,i):t.expressionType(i);return s||K})}return o||t.expressionType(r)};var Ut=!1;t.resetGuessing=function(t){Ut=t},t.didGuess=function(){return Ut},t.forAllPropertiesOf=function(t,e){t.gatherProperties(e,0)};var Wt=n.make({},zt);t.findRefs=function(t,e,r,o,i){Wt.Identifier=Wt.VariablePattern=function(t,e){if(t.name==r)for(var n=e;n;n=n.prev)if(n==o&&i(t,e),r in n.props)return},n.recursive(t,e,null,Wt)};var $t=n.make({Function:function(t,e,r){r(t.body,t.scope,t.expression?"Expression":"Statement")},Statement:function(t,e,r){r(t,t.scope||e)}});t.findPropRefs=function(t,e,r,o,i){function s(t){for(;t&&t!=r;){if(t.props[o]||t.maybeProps&&t.maybeProps[o])return!1;t=t.proto}return t}for(;r&&!r.props[o]&&(!r.maybeProps||!r.maybeProps[o]);)r=r.proto;if(!r)throw new Error("Couldn't locate property in the base object type.");n.simple(t,{MemberExpression:function(t,e){t.computed||t.property.name!=o||s(Y(t.object,e).getType())&&i(t.property,e)},ObjectExpression:function(t,e){if(Y(t,e).getType()==r)for(var n=0;n<t.properties.length;++n)t.properties[n].key.name==o&&i(t.properties[n].key,e)},MethodDefinition:function(t){t.key.name==o&&t.value&&s(D(t.value.scope).getType())&&i(t.key,t.value.scope)}},$t,e)};var Yt=t.scopeAt=function(t,e,r){var o=n.findNodeAround(t,e,function(t,e){return e.scope});return o?o.node.scope:r||Ct.topScope};t.forAllLocalsAt=function(t,e,r,n){var o=Yt(t,e,r);o.gatherProperties(n,0)},o=t.def=o.init({},t)});

/***/ },

/***/ "./node_modules/tern/plugin/doc_comment.js":
/***/ function(module, exports, __webpack_require__) {

	!function(e){return true?e(__webpack_require__("./node_modules/tern/lib/infer.js"),__webpack_require__("./node_modules/tern/lib/tern.js"),__webpack_require__("./node_modules/tern/lib/comment.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/acorn.js"),__webpack_require__("./node_modules/tern/node_modules/acorn/dist/walk.js")):"function"==typeof define&&define.amd?define(["../lib/infer","../lib/tern","../lib/comment","acorn/dist/acorn","acorn/dist/walk"],e):void e(tern,tern,tern.comment,acorn,acorn.walk)}(function(e,r,n,t,o){"use strict";function a(e,r){function t(e){n.ensureCommentsBefore(r,e)}o.simple(e,{VariableDeclaration:t,FunctionDeclaration:t,MethodDefinition:t,Property:t,AssignmentExpression:function(e){"="==e.operator&&t(e)},CallExpression:function(e){i(e)&&t(e)}})}function i(e){return"MemberExpression"==e.callee.type&&"Object"==e.callee.object.name&&"defineProperty"==e.callee.property.name&&e.arguments.length>=3&&"string"==typeof e.arguments[1].value}function s(r,n){A(r.sourceFile.text,n),o.simple(r,{VariableDeclaration:function(e,r){var n=e.declarations[0].id;e.commentsBefore&&"Identifier"==n.type&&f(e,e.commentsBefore,r,r.getProp(e.declarations[0].id.name))},FunctionDeclaration:function(e,r){e.commentsBefore&&f(e,e.commentsBefore,r,r.getProp(e.id.name),e.scope.fnType)},ClassDeclaration:function(e,r){e.commentsBefore&&f(e,e.commentsBefore,r,r.getProp(e.id.name),e.objType)},AssignmentExpression:function(r,n){r.commentsBefore&&f(r,r.commentsBefore,n,e.expressionType({node:r.left,state:n}))},ObjectExpression:function(r,n){for(var t=0;t<r.properties.length;++t){var o=r.properties[t],a=e.propName(o);"<i>"!=a&&o.commentsBefore&&f(o,o.commentsBefore,n,r.objType.getProp(a))}},Class:function(r,n){var t=r.objType.getProp("prototype").getObjType();if(t)for(var o=0;o<r.body.body.length;o++){var a,i=r.body.body[o];i.commentsBefore&&("constructor"==i.kind?f(i,i.commentsBefore,n,r.objType):"<i>"!=(a=e.propName(i))&&f(i,i.commentsBefore,n,t.getProp(a)))}},CallExpression:function(r,n){if(r.commentsBefore&&i(r)){var t=e.expressionType({node:r.arguments[0],state:n}).getObjType();if(t&&t instanceof e.Obj){var o=t.props[r.arguments[1].value];o&&f(r,r.commentsBefore,n,o)}}}},e.searchVisitor,n)}function l(r){var n=r["!typedef"],t=e.cx(),o=r["!name"];if(n)for(var a in n)t.parent.mod.jsdocTypedefs[a]=g(e.def.parse(n[a],o,a),a)}function c(e){for(var r,n=1;n<e.length;n++){var t=e[n],o=t.match(/^[\s\*]*/)[0];if(o!=t)if(null==r)r=o;else{for(var a=0;a<r.length&&r.charCodeAt(a)==o.charCodeAt(a);)++a;a<r.length&&(r=r.slice(0,a))}}for(e=e.map(function(e,n){if(e=e.replace(/\s+$/,""),0==n&&null!=r)for(var t=0;t<r.length;t++){var o=e.indexOf(r.slice(t));if(0==o)return e.slice(r.length-t)}return null==r||0==n?e.replace(/^[\s\*]*/,""):e.length<r.length?"":e.slice(r.length)});e.length&&!e[e.length-1];)e.pop();for(;e.length&&!e[0];)e.shift();return e}function f(r,n,t,o,a){b(r,t,o,n);var i=e.cx();!a&&o instanceof e.AVal&&o.types.length&&(a=o.types[o.types.length-1],a instanceof e.Obj&&a.origin==i.curOrigin&&!a.doc||(a=null));for(var s=n.length-1;s>=0;s--){var l=c(n[s].split(/\r\n?|\n/)).join("\n");if(l){o instanceof e.AVal&&(o.doc=l),a&&(a.doc=l);break}}}function p(e,r){for(;/\s/.test(e.charAt(r));)++r;return r}function u(e){if(!t.isIdentifierStart(e.charCodeAt(0)))return!1;for(var r=1;r<e.length;r++)if(!t.isIdentifierChar(e.charCodeAt(r)))return!1;return!0}function d(e,r,n,t){for(var o=[],a=[],i=!1,s=!0;n=p(r,n),!s||r.charAt(n)!=t;s=!1){var l=r.indexOf(":",n);if(l<0)return null;var c=r.slice(n,l);if(!u(c))return null;o.push(c),n=l+1;var f=h(e,r,n);if(!f)return null;n=f.end,i=i||f.madeUp,a.push(f.type),n=p(r,n);var d=r.charAt(n);if(++n,d==t)break;if(","!=d)return null}return{labels:o,types:a,end:n,madeUp:i}}function m(r,n,t){var o=y(r,n,t);return o?"[]"==n.slice(o.end,o.end+2)?{madeUp:o.madeUp,end:o.end+2,type:new e.Arr(o.type)}:o:null}function h(r,n,t){for(var o,a=!1,i=!1;;){var s=m(r,n,t);if(!s)return null;if(i=i||s.madeUp,a?s.type.propagate(a):o=s.type,t=p(n,s.end),"|"!=n.charAt(t))break;t++,a||(a=new e.AVal,o.propagate(a),o=a)}var l=!1;return"="==n.charAt(t)&&(++t,l=!0),{type:o,end:t,isOptional:l,madeUp:i}}function y(r,n,o){o=p(n,o);var a,i=!1;if(n.indexOf("function(",o)==o){var s=d(r,n,o+9,")"),l=e.ANull;if(!s)return null;if(o=p(n,s.end),":"==n.charAt(o)){++o;var c=h(r,n,o+1);if(!c)return null;o=c.end,l=c.type,i=c.madeUp}a=new e.Fn(null,e.ANull,s.types,s.labels,l)}else if("["==n.charAt(o)){var f=h(r,n,o+1);if(!f)return null;if(o=p(n,f.end),i=f.madeUp,"]"!=n.charAt(o))return null;++o,a=new e.Arr(f.type)}else if("{"==n.charAt(o)){var u=d(r,n,o+1,"}");if(!u)return null;a=new e.Obj((!0));for(var m=0;m<u.types.length;++m){var y=a.defProp(u.labels[m]);y.initializer=!0,u.types[m].propagate(y)}o=u.end,i=u.madeUp}else if("("==n.charAt(o)){var f=h(r,n,o+1);if(!f)return null;if(o=p(n,f.end),")"!=n.charAt(o))return null;++o,a=f.type}else{var v=o;if(!t.isIdentifierStart(n.charCodeAt(o)))return null;for(;t.isIdentifierChar(n.charCodeAt(o));)++o;if(v==o)return null;var b=n.slice(v,o);if(/^(number|integer)$/i.test(b))a=e.cx().num;else if(/^bool(ean)?$/i.test(b))a=e.cx().bool;else if(/^string$/i.test(b))a=e.cx().str;else if(/^(null|undefined)$/i.test(b))a=e.ANull;else if(/^array$/i.test(b)){var f=null;if("."==n.charAt(o)&&"<"==n.charAt(o+1)){var A=h(r,n,o+2);if(!A)return null;if(o=p(n,A.end),i=A.madeUp,">"!=n.charAt(o++))return null;f=A.type}a=new e.Arr(f)}else if(/^object$/i.test(b)){if(a=new e.Obj((!0)),"."==n.charAt(o)&&"<"==n.charAt(o+1)){var j=h(r,n,o+2);if(!j)return null;if(o=p(n,j.end),i=i||j.madeUp,","!=n.charAt(o++))return null;var x=h(r,n,o);if(!x)return null;if(o=p(n,x.end),i=j.madeUp||x.madeUp,">"!=n.charAt(o++))return null;x.type.propagate(a.defProp("<i>"))}}else{for(;46==n.charCodeAt(o)||t.isIdentifierChar(n.charCodeAt(o));)++o;var O,P=n.slice(v,o),T=e.cx(),C=T.parent&&T.parent.mod.jsdocTypedefs;C&&P in C?a=C[P]:(O=e.def.parsePath(P,r).getObjType())?a=g(O,P):(T.jsdocPlaceholders||(T.jsdocPlaceholders=Object.create(null)),a=P in T.jsdocPlaceholders?T.jsdocPlaceholders[P]:T.jsdocPlaceholders[P]=new e.Obj(null,P),i=!0)}}return{type:a,end:o,madeUp:i}}function g(r,n){if(r instanceof e.Fn&&/(?:^|\.)[A-Z][^\.]*$/.test(n)){var t=r.getProp("prototype").getObjType();if(t instanceof e.Obj)return e.getInstance(t)}return r}function v(e,r,n){if(n=p(r,n||0),"{"!=r.charAt(n))return null;var t=h(e,r,n+1);if(!t)return null;var o=p(r,t.end);return"}"!=r.charAt(o)?null:(t.end=o+1,t)}function b(e,r,n,t){for(var o,a,i,s,l,c,f=0;f<t.length;++f)for(var p,u=t[f],d=/(?:\n|$|\*)\s*@(type|param|arg(?:ument)?|returns?|this|class|constructor)\s+(.*)/g;p=d.exec(u);)if("class"!=p[1]&&"constructor"!=p[1]){if("this"==p[1]&&(c=h(r,p[2],0)))l=c,s=!0;else if(c=v(r,p[2]))switch(s=!0,p[1]){case"returns":case"return":i=c;break;case"type":o=c;break;case"param":case"arg":case"argument":var m=p[2].slice(c.end).match(/^\s*(\[?)\s*([^\]\s=]+)\s*(?:=[^\]]+\s*)?(\]?).*/);if(!m)continue;var y=m[2]+(c.isOptional||"["===m[1]&&"]"===m[3]?"?":"");(a||(a=Object.create(null)))[y]=c}}else l=s=!0;s&&O(o,l,a,i,e,n)}function A(r,n){for(var t,o=e.cx(),a=/\s@typedef\s+(.*)/g;t=a.exec(r);){var i=v(n,t[1]),s=i&&t[1].slice(i.end).match(/^\s*(\S+)/);if(s&&i.type instanceof e.Obj){for(var l=r.slice(t.index+t[0].length);t=/\s+@prop(?:erty)?\s+(.*)/.exec(l);){var c,f=v(n,t[1]);f&&(c=t[1].slice(f.end).match(/^\s*(\S+)/))&&f.type.propagate(i.type.defProp(c[1])),l=l.slice(t[0].length)}o.parent.mod.jsdocTypedefs[s[1]]=i.type}}}function j(r,n){var t=e.cx().parent.mod.docComment.weight;r.type.propagate(n,t||(r.madeUp?P:void 0))}function x(e){return"FunctionExpression"==e.type||"ArrowFunctionExpression"==e.type}function O(r,n,t,o,a,i){var s;if("VariableDeclaration"==a.type){var l=a.declarations[0];l.init&&x(l.init)&&(s=l.init.scope.fnType)}else"FunctionDeclaration"==a.type?s=a.scope.fnType:"AssignmentExpression"==a.type?x(a.right)&&(s=a.right.scope.fnType):"CallExpression"==a.type||x(a.value)&&(s=a.value.scope.fnType);if(s&&(t||o||n)){if(t)for(var c=0;c<s.argNames.length;++c){var f=s.argNames[c],p=t[f];!p&&(p=t[f+"?"])&&(s.argNames[c]+="?"),p&&j(p,s.args[c])}if(o&&(s.retval==e.ANull&&(s.retval=new e.AVal),j(o,s.retval)),n===!0){var u=s.getProp("prototype").getObjType();n=u&&{type:e.getInstance(u,s)}}n&&j(n,s.self)}else r&&j(r,i)}var P=1,T=101;r.registerPlugin("doc_comment",function(e,r){e.mod.jsdocTypedefs=Object.create(null),e.on("reset",function(){e.mod.jsdocTypedefs=Object.create(null)}),e.mod.docComment={weight:r&&r.strong?T:void 0,fullDocs:r&&r.fullDocs},e.on("postParse",a),e.on("postInfer",s),e.on("postLoadDef",l)})});

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

/***/ "./node_modules/tern/defs/ecma5.json":
/***/ function(module, exports) {

	module.exports = {
		"!name": "ecma5",
		"!define": {
			"Error.prototype": "Error.prototype"
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
				"!type": "fn(obj: ?, prop: string, desc: ?) -> !custom:Object_defineProperty",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty",
				"!doc": "Defines a new property directly on an object, or modifies an existing property on an object, and returns the object. If you want to see how to use the Object.defineProperty method with a binary-flags-like syntax, see this article."
			},
			"defineProperties": {
				"!type": "fn(obj: ?, props: ?) -> !custom:Object_defineProperties",
				"!url": "https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty",
				"!doc": "Defines a new property directly on an object, or modifies an existing property on an object, and returns the object. If you want to see how to use the Object.defineProperty method with a binary-flags-like syntax, see this article."
			},
			"getOwnPropertyDescriptor": {
				"!type": "fn(obj: ?, prop: string) -> ?",
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
		}
	};

/***/ },

/***/ "./node_modules/tern/lib/signal.js":
/***/ function(module, exports, __webpack_require__) {

	!function(n,t){return true?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):void t((n.tern||(n.tern={})).signal={})}(this,function(n){function t(n,t){var e=this._handlers||(this._handlers=Object.create(null));(e[n]||(e[n]=[])).push(t)}function e(n,t){var e=this._handlers&&this._handlers[n];if(e)for(var r=0;r<e.length;++r)if(e[r]==t){e.splice(r,1);break}}function r(n,t){var e=n._handlers&&n._handlers[t];return e&&e.length?e.slice():h}function i(n,t,e,i,s){for(var a=r(this,n),h=0;h<a.length;++h)a[h].call(this,t,e,i,s)}function s(n,t,e,i,s){for(var a=r(this,n),h=0;h<a.length;++h){var l=a[h].call(this,t,e,i,s);if(l)return l}}function a(n){var t=this._handlers&&this._handlers[n];return t&&t.length>0&&t}var h=[];n.mixin=function(n){return n.on=t,n.off=e,n.signal=i,n.signalReturnFirst=s,n.hasHandler=a,n}});

/***/ }

});