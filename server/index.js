const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const loadGist = require('./handlers/loadGist');
const saveAnonymousGist = require('./handlers/saveAnonymousGist');

const app = express();
app.use(bodyParser.json());

app.use(
  '/api/v1/gist',
  express.Router()
    // Load snippet
    .get('/:snippetid/:revisionid', loadGist)
    // Create new "anonymous" snippet
    .post('/', saveAnonymousGist.create)
    // Update "anonymous" snippet
    .patch('/:snippetid', saveAnonymousGist.update)
    // Fork "anonymous" snippet
    .post('/:snippetid/:revisionid', saveAnonymousGist.fork)
);


// `next` is needed here to mark this as an error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error((new Date()).toLocaleString(), err);
  if (err.response) {
    res.status(err.response.status).send(err.response.statusText);
    return;
  }
  // eslint-disable-next-line no-console
  res.status(500).send('Something went wrong');
});

if (process.env.STATIC) {
  app.use(express.static(path.join(__dirname, process.env.STATIC)));
}

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  'localhost',
  () => {
    console.log(`Server listening on port ${PORT}!`);
  }
);
