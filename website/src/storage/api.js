import 'isomorphic-fetch';

const API_HOST = process.env.API_HOST || '';

export default function api(path, options) {
  return fetch(`${API_HOST}/api/v1${path}`, options);
}
