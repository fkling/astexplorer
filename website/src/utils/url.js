import queryString from 'query-string';

const DATA_PATTERN = /^#(?:\/([^/?]+)(?:\/(\d*))?\/?)?(?:\?(.+))?/;


export function getDataFromURI() {
  const match = global.location.hash.match(DATA_PATTERN);
  if (match) {
    let params = {
      id: match[1],
      rev: Number(match[2]) || 0,
    };
    if (match[3]) {
      Object.assign(params, queryString.parse(match[3]));
    }
    return params;
  }
  return {};
}

export function updateURI(data) {
  const currentParams = getDataFromURI();
  const {id, rev, ...params} = Object.assign(currentParams, data);

  let hash = '';
  if (id) {
    hash += '/' + id;
    if (rev) {
      hash += '/' + rev;
    }
  }
  if (Object.keys(params).length > 0) {
    hash += '?' + queryString.stringify(params);
  }

  global.location.hash = hash;
}
