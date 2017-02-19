import curl from 'exports-loader?window.curl!curl-amd/dist/curl/curl';
import React from 'react';
import api from './storage/api';

curl.config({
  baseUrl: '/api/v1/tools',
  dontAddFileExt: /./,
  defineName: 'astexplorerDefine',
});

global.astexplorerDefine('react', () => React);
global.astexplorerDefine('regeneratorRuntime', () => global.regeneratorRuntime);


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
  return new Promise((resolve, reject) => {
    curl(
      [`${tool}/${version}`],
      parser => {
        parser = parser.default || parser;
        parser.load = memorize(parser.load, parser);
        resolve(parser);
      },
      error => {
        reject(error);
      }
    );
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
