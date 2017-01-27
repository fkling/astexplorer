const {AUTH_TOKEN} = require('../constants');
const GitHub = require('github-api');

module.exports = function loadGist(req, res, next) {
  const gh = new GitHub({token: AUTH_TOKEN});
  const gist = gh.getGist(req.params.snippetid);
  (req.params.revisionid === 'latest' ?
    gist.read() :
    gist.getRevision(req.params.revisionid)
  )
    .then(response => res.json(response.data))
    .catch(next);
};
