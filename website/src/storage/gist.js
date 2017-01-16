import 'isomorphic-fetch';
import Revision from './gist/Revision';

const cache = {};
// global.__cache = cache;

function getFromCache(snippetID, rev) {
  let cacheEntry = cache[snippetID];
  return {
    snippet: cacheEntry && cacheEntry.snippet || null,
    revision: rev != null ? cacheEntry && cacheEntry[rev] || null : null,
  };
}

function setInCache(snippet, revision) {
  let cacheEntry = cache[snippet.id] || (cache[snippet.id] = {});
  cacheEntry.snippet = snippet;
  if (revision) {
    cacheEntry[revision.getRevisionID()] = revision;
  }
}

function getIDAndRevisionFromHash() {
  let match = global.location.hash.match(/^#\/gist\/([^\/]+)(?:\/([^\/]+))?/);
  if (match) {
    return {
      id: match[1],
      rev: match[2],
    };
  }
  return null;
}

function fetchSnippet(snippetID, revisionID) {
  return fetch(
    `/api/gist/${snippetID}` + (revisionID ? `/${revisionID}` : ''),
    {
      method: 'GET',
    }
  )
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    switch (response.status) {
      case 404:
        throw new Error(`Snippet with ID ${snippetID} doesn't exist.`);
      default:
        throw new Error('Unknown error.');
    }
  })
  .then(response => {
    console.log(response);
    return new Revision(response);
  });
}

export function matchesURL() {
  return getIDAndRevisionFromHash() !== null;
}

export function updateHash(revision) {
  global.location.hash =
    `/gist/${revision.getSnippetID()}/${revision.getRevisionID()}`;
}

export function fetchFromURL() {
  const data = getIDAndRevisionFromHash();
  if (!data) {
    return Promise.resolve(null);
  }
  return fetchSnippet(data.id, data.rev);
}

/**
 * Create a new snippet.
 */
export function create(data) {
  return fetch(
    '/api/gist',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Unable to create snippet.');
  })
  .then(data => new Revision(data));
}

/**
 * Update an existing snippet.
 */
export function update(revision, data) {
  // Fetch latest version of snippet
  return fetchSnippet(revision.getSnippetID())
    .then(latestRevision => {
      if (latestRevision.getTransformerID() && !data.toolID) {
        // Revision was updated to *remove* the transformer, hence we have
        // to signal the server to delete the transform.js file
        data.transform = null;
      }
      return fetch(
        `/api/gist/${revision.getSnippetID()}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Unable to update snippet.');
      })
      .then(data => new Revision(data));
    });
}

/**
 * Fork existing snippet.
 */
export function fork(revision, data) {
  return fetch(
    `/api/gist/${revision.getSnippetID()}/${revision.getRevisionID()}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  )
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Unable to fork snippet.');
  })
  .then(data => new Revision(data));
}
