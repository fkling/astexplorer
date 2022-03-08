const express = require('express');
const loadGist = require('./loadGist');
const saveAnonymousGist = require('./saveAnonymousGist');

module.exports = express.Router()
  // Load snippet
  .get('/:snippetid/:revisionid', loadGist)
  // Create new "anonymous" snippet
  .post('/', saveAnonymousGist.create)
  // Update "anonymous" snippet
  .patch('/:snippetid', saveAnonymousGist.update)
  // Fork "anonymous" snippet
  .post('/:snippetid/:revisionid', saveAnonymousGist.fork);
