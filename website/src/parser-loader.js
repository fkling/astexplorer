// This is an amd like loader function to load parser bundles that are built
// separately. See <REPO ROOT>/parsers for more information.

const loading = new Map();

global.define = function(parserID, deps, factory) {
  const url = document.currentScript.getAttribute('src');
  const entry = loading.get(url);
  if (!entry) {
    console.error(`Tried to load parser '${url}' with lost request.`);
    return;
  }

  try {
    // Should we call resolve outside try...catch ?
    if (typeof deps === 'function') {
      factory = deps;
    }
    entry.resolve(factory());
  } catch(error) {
    entry.reject(error);
  }
}
global.define.amd = true;

export function loadParser(parserID) {
  const url = `parser/${parserID}.js`;
  if (loading.has(url)) {
    return loading.get(url).promise;
  }

  const entry = {};
  loading.set(url, entry);

  return entry.promise = new Promise((resolve, reject) => {
    entry.resolve = resolve;
    entry.reject  = reject;
    const script = document.createElement('script');
    script.onload = function() {
      document.head.removeChild(this);
      // Promise will be resolved (or rejected) in the 'define' function called
      // by the loaded script.
    };
    script.onerror = function() {
      document.head.removeChild(this);
      // It's OK to call reject here because 'define' won't be called
      // anyways.
      reject(new Error(`Unable to load parser "${parserID}" (from ${this.src}). See network tab/developer tools for more information.`));
    };
    document.head.appendChild(script);
    script.src = url;
  });
}
