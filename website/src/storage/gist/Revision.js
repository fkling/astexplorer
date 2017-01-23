import React from 'react';

export default class Revision {
  constructor(gist) {
    this._gist = gist;
    this._config = JSON.parse(gist.files['astexplorer.json'].content);
  }

  getPath() {
    return `/gist/${this.getSnippetID()}/${this.getRevisionID()}`;
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

  getShareInfo() {
    const snippetID = this.getSnippetID();
    const revisionID = this.getRevisionID();
    return (
      <div className="shareInfo">
        <dl>
          <dt>Current Revision</dt>
          <dd>
            <input
              readOnly={true}
              onFocus={e => e.target.select()}
              value={`https://astexplorer.net/#/gist/${snippetID}/${revisionID}`}
            />
          </dd>
          <dt>Latest Revision</dt>
          <dd>
            <input
              readOnly={true}
              onFocus={e => e.target.select()}
              value={`https://astexplorer.net/#/gist/${snippetID}`}
            />
          </dd>
          <dt>Gist</dt>
          <dd>
            <input
              readOnly={true}
              onFocus={e => e.target.select()}
              value={`https://gist.github.com/${snippetID}/${revisionID}`}
            />
          </dd>
        </dl>
      </div>
    );
  }
}
