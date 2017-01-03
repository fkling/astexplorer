import Parse from './parse/Parse';
import isEqual from 'lodash.isequal';
import Snippet from './parse/Snippet';
import SnippetRevision from './parse/SnippetRevision';

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

const getQuery = (() => {
  let query;
  return () => query || (query = new Parse.Query(Snippet));
})();

function getIDAndRevisionFromHash() {
  let match = global.location.hash.match(/^#\/([^\/]+)(?:\/(\d*))?/);
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

export function fetchFromURL() {
  const urlParameters = getIDAndRevisionFromHash();
  if (urlParameters) {
    return fetch(urlParameters.id, urlParameters.rev);
  }
  return Promise.resolve(null);
}

export function fetchLatestRevision(snippetID) {
  return fetchSnippet(snippetID).then(
    snippet => fetch(snippetID, snippet.get('revisions').length - 1)
  );
}

export function fetch(snippetID, revisionID) {
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

/**
 * Create new or update existing snippet.
 */
export function save(snippetID, data) {
  debugger;
  const revision = snippetID ? fetchLatestRevision(snippetID) : null;
  const snippet = snippetID ? fetchSnippet(snippetID) : new Snippet();

  return Promise.all([snippet, revision])
    .then(([snippet, revision]) => {
      const isNew = !revision ||
        revision.get('code') !== data.code ||
        revision.get('transform') !== data.transform ||
        revision.get('toolID') !== data.toolID ||
        revision.get('parserID') !== data.parserID ||
        !isEqual(revision.get('settings'), data.settings);

      if (isNew) {
        let newRevision = new SnippetRevision();
        newRevision.set('code', data.code);
        newRevision.set('transform', data.transform);
        newRevision.set('toolID', data.toolID);
        newRevision.set('parserID', data.parserID);
        newRevision.set('settings', makeSettingsSafe(data.settings));
        newRevision.set('versions', data.versions);

        return newRevision.save().then(revision => {
          snippet.add('revisions', revision);
          return snippet.save().then(snippet => {
            revision.setSnippet(snippet);
            setInCache(snippet, revision);
            return revision;
          });
        });
      }
      return null;
    });
}

/**
 * Fork existing snippet.
 */
export function fork(snippetID, data) {
  return save(null, data);
}
