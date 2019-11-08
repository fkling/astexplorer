import React from 'react';
import api from './api';
import {getTransformerByID, getParserByID} from '../parsers';

function getIDAndRevisionFromHash() {
  let match = global.location.hash.match(/^#\/(?!gist\/)([^/]+)(?:\/(latest|\d*))?/);
  if (match) {
    return {
      id: match[1],
      rev: match[2] || 0,
    };
  }
  return null;
}

function fetchSnippet(snippetID, revisionID='latest') {
  return api(`/parse/${snippetID}/${revisionID}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      switch (response.status) {
        case 404:
          throw new Error(`Snippet with ID ${snippetID}/${revisionID} doesn't exist.`);
        default:
          throw new Error('Unknown error.');
      }
    })
    .then(response => new Revision(response));
}

export function owns(snippet) {
  return snippet instanceof Revision;
}

export function matchesURL() {
  return getIDAndRevisionFromHash() !== null;
}

export function updateHash(revision) {
  const rev = revision.getRevisionID();
  const newHash = '/' + revision.getSnippetID() + (rev && rev !== 0 ? '/' + rev : '');
  global.location.hash = newHash;
}

export function fetchFromURL() {
  const urlParameters = getIDAndRevisionFromHash();
  if (urlParameters) {
    return fetchSnippet(urlParameters.id, urlParameters.rev);
  }
  return Promise.resolve(null);
}

/**
 * Create a new snippet.
 */
export function create() {
  return Promise.reject(
    new Error('Saving Parse snippets is not supported anymore.'),
  );
}

/**
 * Update an existing snippet.
 */
export function update() {
  return Promise.reject(
    new Error('Saving Parse snippets is not supported anymore.'),
  );
}

/**
 * Fork existing snippet.
 */
export function fork() {
  return Promise.reject(
    new Error('Saving Parse snippets is not supported anymore.'),
  );
}

class Revision {
	constructor(data) {
    this._data = data;
	}

  canSave() {
    return false;
  }

  getPath() {
    const rev = this.getRevisionID();
    return '/' + this.getSnippetID() + (rev && rev !== 0 ? '/' + rev : '');
  }

  getSnippetID() {
    return this._data.snippetID;
  }

  getRevisionID() {
    return this._data.revisionID;
  }

  getTransformerID() {
    const transformerID = this._data.toolID;
    if (!transformerID && this.getTransformCode()) {
      // jscodeshift was the first transformer tool. Instead of updating
      // existing rows in the DB, we hardcode the value here
      return 'jscodeshift';
    }
    return transformerID;
  }

  getTransformCode() {
    const transform = this._data.transform;
    if (transform) {
      return transform;
    }
    if (this._data.toolID) {
      // Default transforms where never stored
      return getTransformerByID(this._data.toolID).defaultTransform;
    }
    return '';
  }

  getParserID() {
    const transformerID = this.getTransformerID();
    if (transformerID) {
      return getTransformerByID(transformerID).defaultParserID;
    }
    return this._data.parserID;
  }

  getCode() {
    const parserID = this.getParserID();
    // Code examples where never stored
    return this._data.code || getParserByID(parserID).category.codeExample;
  }

  getParserSettings() {
    const settings = this._data.settings;
    if (!settings) {
      return null;
    }
    const parserSettings = settings[this.getParserID()];
    return !!parserSettings && JSON.parse(parserSettings);
  }

  getShareInfo() {
    const snippetID = this.getSnippetID();
    const revisionID = this.getRevisionID();
    return (
      <div className="shareInfo">
        <dl>
          <dt>Current Revision</dt>
          <dd>
            <input
              readOnly={true}
              onFocus={e => e.target.select()}
              value={`https://astexplorer.net/#/gist/${snippetID}/${revisionID}`}
            />
          </dd>
          <dt>Latest Revision</dt>
          <dd>
            <input
              readOnly={true}
              onFocus={e => e.target.select()}
              value={`https://astexplorer.net/#/gist/${snippetID}/latest`}
            />
          </dd>
        </dl>
      </div>
    );
  }
}
