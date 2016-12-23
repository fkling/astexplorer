export default function debounce(f, timeout=100) {
  let timer;
  let lastArgs;
  let lastThis;

  return function(...args) {
    lastThis = this;
    lastArgs = args;
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      timer = null;
      f.apply(lastThis, lastArgs);
    }, timeout);
  };
}
