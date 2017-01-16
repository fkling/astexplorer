export default class Revision {
  constructor(gist) {
    this._gist = gist;
    this._config = JSON.parse(gist.files['astexplorer.json'].content);
  }

  getSnippetID() {
    return this._gist.id;
  }

  getRevisionID() {
    return this._gist.history[0].version;
  }

  getTransformerID() {
    return this._config.toolID;
  }

  getTransformCode() {
    const transformFile = this._gist.files['transform.js'];
    return transformFile ? transformFile.content : '';
  }

  getParserID() {
    return this._config.parserID;
  }

  getCode() {
    const sourceFile = this._gist.files['code.js'];
    return sourceFile ? sourceFile.content : '';
  }

  getParserSettings() {
    return this._config.settings[this._config.parserID];
  }
}
