export default function compileModule(code) {
  var m = {exports: {}};
  var f = new Function('module, exports', `(function() {${code}}())`);
  f(m, m.exports);
  return m.exports;
}
