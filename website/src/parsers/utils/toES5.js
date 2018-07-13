import halts, {loopProtect} from 'halting-problem';

function loadJSTransformer(callback) {
  require(['./transformJSCode'], toES5 => callback(toES5.default));
}

export default code => new Promise(loadJSTransformer).then(toES5 => {
  let es5Code = toES5(code);
  // assert that there are no obvious infinite loops
  halts(es5Code);
  // guard against non-obvious loops with a timeout of 5 seconds
  let start = Date.now();
  es5Code = loopProtect(
    es5Code,
    [
      // this function gets called in all possible loops
      // it gets passed the line number as its only argument
      '(function (line) {',
      'if (Date.now() > ' + (start + 5000) + ') {',
      '  throw new Error("Infinite loop detected on line " + line);',
      '}',
      '})',
    ].join('')
  );

  return es5Code;
});
