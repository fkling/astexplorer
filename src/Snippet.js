import Parse from './Parse';
import SnippetRevision from './SnippetRevision';
import isEqual from 'lodash.isequal';
let snippetQuery;
let cache = {};
// global.__cache = cache;

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

function getFromCache(snippetID, rev) {
  let cacheEntry = cache[snippetID];
  return {
    snippet: cacheEntry && cacheEntry.snippet || null,
    revision: cacheEntry && cacheEntry[rev] || null,
  };
}

function setInCache(snippet, revision, rev) {
  let cacheEntry = cache[snippet.id] || (cache[snippet.id] = {});
  cacheEntry.snippet = snippet;
  cacheEntry[rev] = revision;
}

function makeSettingsSafe(settings) {
  // Parse doesn't allow us to store objects containing `.` or `$` in their
  // property names. That's why we serialize all settings to JSON.
  return Object.keys(settings).reduce(
    (obj, name) => ((obj[name] = JSON.stringify(settings[name])), obj),
    {}
  );
}

export default class Snippet extends Parse.Object {
  constructor() {
    super('Snippet');
  }

  fetchLatestRevision() {
    if (this._latestRevision) {
      return Promise.resolve(this._latestRevision);
    } else {
      let revisions = this.get('revisions');
      if (!revisions || revisions.length === 0) {
        return Promise.resolve(null);
      }
      return revisions[revisions.length - 1].fetch(revision => {
        this._latestRevision = revision;
      });
    }
  }

  createNewRevision(data) {
    // we only create a new revision if the code is different from the previous
    // revision
    return this.fetchLatestRevision().then(revision => {
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
          this.add('revisions', revision);
          return this.save().then(snippet => {
            let revisionNumber = snippet.get('revisions').length - 1;
            this._latestRevision = revision;
            setInCache(snippet, revision, revisionNumber);
            return {
              snippet,
              revision,
              revisionNumber,
            };
          });
        });
      }
      return null;
    });
  }

  static fetch(snippetID, rev) {
    let cacheEntry = getFromCache(snippetID, rev);
    if (cacheEntry.snippet && cacheEntry.revision) {
      return Promise.resolve(cacheEntry);
    }
    let { snippet } = cacheEntry;
    if (!snippet) {
      if (!snippetQuery) {
        snippetQuery = new Parse.Query(Snippet);
      }
      snippet = snippetQuery.get(snippetID);
    }
    return Promise.resolve(snippet).then(snippet => {
      const revisions = snippet.get('revisions');
      if (!revisions[rev]) {
        throw new Error(`Revision "${snippetID}/${rev}" does not exist.`);
      }
      return revisions[rev].fetch().then(revision => {
        setInCache(snippet, revision, rev);
        return {snippet, revision};
      });
    });
  }

  static fetchFromURL() {
    let urlParameters = getIDAndRevisionFromHash();
    if (urlParameters) {
      return Snippet.fetch(urlParameters.id, urlParameters.rev).then(
        data => {
          data.revisionNumber = urlParameters.rev;
          return data;
        }
      );
    }
    return Promise.resolve(null);
  }
}

Parse.Object.registerSubclass('Snippet', Snippet);
