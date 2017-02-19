import React from 'react';
import api from './storage/api';

export function loadParsers() {
  return api('/tools/inventory.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(parsers => {
      return parsers.map(parser => {
        parser.id = parser.name + '@latest';
        parser.versions = [
          {name: 'latest', value: parser.id},
          ...parser.versions.map(
            v => ({name: v, value: `${parser.name}@${v}`})
          ).reverse(),
        ];
        return parser;
      });
    });
}

export function loadParser(id) {
  const [,tool,version='latest'] = id.match(/^([^@]+)(?:@(.+))?$/);
  return load(`${tool}/${version}`)
    .then(parser => {
      parser = parser.default || parser;
      parser.load = memorize(parser.load, parser);
      return parser;
    });
}

function memorize(f, obj) {
  let memo;
  return function(...args) {
    if (memo !== undefined) {
      return memo;
    }
    return memo = f.apply(obj, args);
  }
}

// Loader functions
const modules = new Map();
const pending = new Map();

function load(id) {
  if (modules.has(id)) {
    return modules.get(id);
  }
  const promise = new Promise((resolve, reject) => {
    pending.set(id, {resolve, reject});

    const script = global.document.createElement('script');
    script.async = true;
    script.onerror = function(error) {
      // TODO: error reporting
      console.log(error);
      reject(error);
      pending.delete(id);
    };
    script.src = '/api/v1/tools/' + id;
    global.document.head.appendChild(script);
  });
  modules.set(id, promise);
  return promise;
}



function define(id, dependencies, factory) {
  if (typeof dependencies === 'function') {
    factory = dependencies;
    dependencies = [];
  }

  Promise.all(dependencies.map(d => load(d))).then(deps => {
    if (pending.has(id)) {
      const resolver = pending.get(id);
      try {
        resolver.resolve(factory(...deps));
      } catch(e) {
        resolver.reject(e);
      } finally {
        pending.delete(id);
      }
    }
  });
}
global.astexplorerDefine = define;

// Prime modules
modules.set('react', Promise.resolve(React));
