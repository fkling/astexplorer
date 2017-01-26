const {ASTEXPLORER_TOKEN} = require('../constants');
const GitHub = require('github-api');

module.exports = function loadGist(req, res, next) {
  const gh = new GitHub({token: ASTEXPLORER_TOKEN});
  const gist = gh.getGist(req.params.snippetid);
  (req.params.revisionid ? gist.getRevision(req.params.revisionid) : gist.read())
    .then(response => res.json(response.data))
    .catch(next);
};
