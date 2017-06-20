export default class StorageHandler {
  constructor(backends) {
    this._backends = backends;
  }

  _first() {
    return this._backends[0];
  }

  _owns(revision) {
    for (const backend of this._backends) {
      if (backend.owns(revision)) {
        return backend;
      }
    }
    return null;
  }

  updateHash(revision) {
    global.location.hash = revision.getPath();
  }

  fetchFromURL() {
    if (/^#?\/?$/.test(global.location.hash)) {
      return Promise.resolve(null);
    }
    for (const backend of this._backends) {
      if (backend.matchesURL()) {
        return backend.fetchFromURL();
      }
    }
    return Promise.reject(new Error('Unknown URL format.'));
  }

  /**
   * Create a new snippet.
   */
  create(data) {
    return this._first().create(data);
  }

  /**
   * Update an existing snippet.
   */
  update(revision, data) {
    return this._first().update(revision, data);
  }

  /**
   * Fork existing snippet.
   */
  fork(revision, data) {
    return this._first().fork(revision, data);
  }
}
