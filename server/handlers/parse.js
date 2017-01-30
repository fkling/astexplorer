const express = require('express');
const path = require('path');
const snippets = prepareData(require(process.env.SNIPPET_FILE));
const snippetRevisions = prepareData(require(process.env.REVISION_FILE));

function notFound(req, res) {
  console.error(`Not found: ${req.path}`);
  res.sendStatus(404);
}

module.exports = express.Router()
  // Load snippet
  .get('/:snippetid/:revisionid', load);

function prepareData(data) {
  // Array of objects -> Map index by object ID
  const m = new Map();
  data.forEach(obj => m.set(obj._id, obj));
  return m;
}

function load(req, res, next) {
  const snippet = snippets.get(req.params.snippetid);
  let revisionID = req.params.revisionid;

  if (!snippet) {
    return notFound(req, res);
  }

  if (revisionID === 'latest') {
    revisionID = snippet.revisions.length - 1;
  }

  if (+revisionID != revisionID || revisionID >= snippet.revisions.length) {
    return notFound(req, res);
  }

  const revision = snippetRevisions.get(snippet.revisions[revisionID].objectId);

  if (!revision) {
    return notFound(req, res);
  }

  const copy = Object.assign(
    {
      revisionID: +revisionID,
      snippetID: snippet._id,
    },
    revision
  );
  delete copy._id;

  // The data will never change but we don't want to keep it in caches
  // unnecessarily
  // res.append('Cache-Control', 'max-age=86400, public'); // 24h
  res.json(copy);
}
