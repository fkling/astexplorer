import express from "express";
import loadGist from "./loadGist.js";
import saveAnonymousGist from "./saveAnonymousGist.js";

export default express.Router()
  // Load snippet
  .get('/:snippetid/:revisionid', loadGist)
  // Create new "anonymous" snippet
  .post('/', saveAnonymousGist.create)
  // Update "anonymous" snippet
  .patch('/:snippetid', saveAnonymousGist.update)
  // Fork "anonymous" snippet
  .post('/:snippetid/:revisionid', saveAnonymousGist.fork);
