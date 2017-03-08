const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const constants = require('./constants');

const app = express();
app.use(bodyParser.json());

if (constants.AUTH_TOKEN) {
  console.log('Enabling gists...');
  app.use('/api/v1/gist', require('./handlers/gist'));
}

if (constants.SNIPPET_FILE && constants.REVISION_FILE) {
  console.log('Serving Parse snippets enabled.');
  app.use('/api/v1/parse', require('./handlers/parse'));
}

if (constants.REGISTRY && constants.BUNDLE_DIR) {
  console.log('Serving tools..');
  app.use('/api/v1/tools', require('./handlers/tools'));
}

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

if (constants.STATIC) {
  console.log('Serving static files...');
  app.use(express.static(path.join(__dirname, constants.STATIC)));
}

const PORT = process.env.PORT || 8080;
app.listen(
  PORT,
  'localhost',
  () => {
    console.log(`Server listening on port ${PORT}!`);
  }
);
