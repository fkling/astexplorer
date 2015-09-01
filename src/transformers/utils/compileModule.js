export default function compileModule(code) {
  var m = {};
  var f = new Function('module', `(function() {var exports = {}; ${code}}())`);
  f(m);
  return m.exports;
}
