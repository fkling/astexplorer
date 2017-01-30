const {AUTH_TOKEN} = require('../../constants');
const GitHub = require('github-api');

module.exports = function loadGist(req, res, next) {
  const gh = new GitHub({token: AUTH_TOKEN});
  const gist = gh.getGist(req.params.snippetid);
  const latest = req.params.revisionid === 'latest';
  (latest ?
    gist.read() :
    gist.getRevision(req.params.revisionid)
  )
    .then(response => {
      res.append('Cache-Control', latest ? 'no-cache' : 'max-age=1800, public');
      res.json(response.data);
    })
    .catch(next);
};
