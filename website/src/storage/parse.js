import Parse from './parse/Parse';
import isEqual from 'lodash.isequal';
import Snippet from './parse/Snippet';
import SnippetRevision from './parse/SnippetRevision';

const cache = {};

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

const getQuery = (() => {
  let query;
  return () => query || (query = new Parse.Query(Snippet));
})();

function getIDAndRevisionFromHash() {
  let match = global.location.hash.match(/^#\/(?!gist\/)([^\/]+)(?:\/(\d*))?/);
  if (match) {
    return {
      id: match[1],
      rev: match[2] || 0,
    };
  }
  return null;
}

function makeSettingsSafe(settings) {
  // Parse doesn't allow us to store objects containing `.` or `$` in their
  // property names. That's why we serialize all settings to JSON.
  return Object.keys(settings).reduce(
    (obj, name) => ((obj[name] = JSON.stringify(settings[name])), obj),
    {}
  );
}

function fetchSnippet(snippetID) {
  let cacheEntry = getFromCache(snippetID);
  if (cacheEntry.snippet) {
    return Promise.resolve(cacheEntry.snippet);
  }
  return getQuery().get(snippetID).then(snippet => {
    setInCache(snippet);
    return snippet;
  });
}

function fetchRevision(snippetID, revisionID) {
  let cacheEntry = getFromCache(snippetID, revisionID);
  if (cacheEntry.revision) {
    return Promise.resolve(cacheEntry.revision);
  }
  let { snippet } = cacheEntry;
  if (!snippet) {
    snippet = getQuery().get(snippetID);
  }
  return Promise.resolve(snippet).then(snippet => {
    const revisions = snippet.get('revisions');
    if (!revisions[revisionID]) {
      throw new Error(`Revision "${snippetID}/${revisionID}" does not exist.`);
    }
    return revisions[revisionID].fetch().then(revision => {
      revision.setSnippet(snippet);
      setInCache(snippet, revision);
      return revision;
    });
  });
}

function newRevisionFromData(data) {
  const revision = new SnippetRevision();
  revision.set('code', data.code);
  revision.set('transform', data.transform);
  revision.set('toolID', data.toolID);
  revision.set('parserID', data.parserID);
  revision.set('settings', makeSettingsSafe(data.settings));
  revision.set('versions', data.versions);
  return revision;
}

function fetchLatestRevision(snippetID) {
  return fetchSnippet(snippetID).then(
    snippet => fetchRevision(snippetID, snippet.get('revisions').length - 1)
  );
}

export function owns(snippet) {
  return snippet instanceof SnippetRevision;
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
    return fetchRevision(urlParameters.id, urlParameters.rev);
  }
  return Promise.resolve(null);
}

/**
 * Create a new snippet.
 */
export function create(data) {
  const snippet = new Snippet();

  newRevisionFromData(data)
    .save()
    .then(revision => {
      snippet.add('revisions', revision);
      return snippet.save().then(snippet => {
        revision.setSnippet(snippet);
        setInCache(snippet, revision);
        return revision;
      });
    });
}

/**
 * Update an existing snippet.
 */
export function update(revision, data) {
  const snippetID = revision.getSnippetID();
  const latestRevision = fetchLatestRevision(snippetID);
  const snippet = fetchSnippet(snippetID);

  return Promise.all([snippet, latestRevision])
    .then(([snippet, revision]) => {
      const isNew = !revision ||
        revision.get('code') !== data.code ||
        revision.get('transform') !== data.transform ||
        revision.get('toolID') !== data.toolID ||
        revision.get('parserID') !== data.parserID ||
        !isEqual(revision.get('settings'), data.settings);

      if (isNew) {
        const newRevision = newRevisionFromData(data);

        return newRevision.save().then(revision => {
          snippet.add('revisions', revision);
          return snippet.save().then(snippet => {
            revision.setSnippet(snippet);
            setInCache(snippet, revision);
            return revision;
          });
        });
      }
      return revision;
    });
}

/**
 * Fork existing snippet.
 */
export function fork(revision, data) {
  return create(data);
}
