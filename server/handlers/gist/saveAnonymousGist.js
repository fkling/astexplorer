const {AUTH_TOKEN, SETTINGS_FORMAT} = require('../../constants');
const GitHub = require('github-api');

const gh = new GitHub({token: AUTH_TOKEN});

/**
 * Expects an array of the form [[filename, content], [filename, content], ...]
 */
function makeFiles(files) {
  return files.reduce(
    (obj, [filename, content]) => (obj[filename] = (content ? {content} : content), obj),
    {}
  );
}

function getDataFromBody(body, additionalData={}) {
  const files = [
    [
      'astexplorer.json',
      JSON.stringify(
        Object.assign(
          {
            v: SETTINGS_FORMAT,
            parserID: body.parserID,
            toolID: body.toolID,
            settings: body.settings,
            versions: body.versions,
          },
          additionalData
        ),
        null,
        2
      ),
    ],
    [body.filename, body.code],
  ];

  // null value indicates deletion
  if (body.transform || body.transform === null) {
    files.push(['transform.js', body.transform]);
  }

  return {
    files: makeFiles(files),
    description: body.description,
    public: Boolean(body.public),
  };
}

exports.create = (req, res, next) => {
  gh.getGist()
    .create(getDataFromBody(req.body))
    .then(response => res.json(response.data))
    .catch(next);
};

exports.update = (req, res, next) => {
  gh.getGist(req.params.snippetid)
    .update(getDataFromBody(req.body))
    .then(response => res.json(response.data))
    .catch(next);
};

exports.fork = (req, res, next) => {
  // We cannot really "fork" an "anonymous" snippet because a user (astexplorer)
  // cannot fork it's own gist.
  const data = getDataFromBody(req.body);

  gh.getGist()
    .create(data)
    .then(response => res.json(response.data))
    .catch(next);
};
