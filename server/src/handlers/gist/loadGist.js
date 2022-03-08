import { AUTH_TOKEN } from "../../constants";
import GitHub from "github-api";

export default function loadGist(req, res, next) {
  const gh = new GitHub({token: AUTH_TOKEN});
  const gist = gh.getGist(req.params.snippetid);
  const latest = req.params.revisionid === 'latest';
  (latest ?
    gist.read() :
    gist.getRevision(req.params.revisionid)
  )
    .then(response => res.json(response.data))
    .catch(next);
};
