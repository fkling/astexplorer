## AMF Model Playground

Paste or drop code into the editor and inspect the generated AST on https://amf-model-playground.herokuapp.com/

The AMF Model Playground support the following specs:

- AsyncAPI 2.0
- OAS 2.0
- OAS 3.0
- RAML 0.8
- RAML 1.0


#### How to add a new spec

1. Go to `website/`.
2. Copy one of the existing examples in `src/parsers/{language}`.
3. Adjust the code as necessary:

- Update metadata.
- Call the right parsing method with the right/necessary options in `parse`.
- Implement the `nodeToRange` method (this is for highlighting).
- Implement the `getNodeName` method (this is for quick look through the tree).


#### Build your own version for development

1. Clone the repository.
2. Go to `website/`.
3. Install all dependencies with `yarn install` (you can run `npm install` as
   well).

Run `yarn run build` for the final minimized version.
Run `yarn run watch` for incremental builds.

Run `yarn start` to start a simple static webserver.

#### Deploy to Heroku

1. Add a remote to your local repository with: heroku `git:remote -a amf-model-playground`
2. Use `git push heroku master` to push the code from local directory to heroku remote
