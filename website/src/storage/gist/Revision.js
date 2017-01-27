import React from 'react';
import {getParserByID} from '../../parsers';

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
    if (this._code == null) {
      this._code = getSource(this._config, this._gist) || '';
    }
    return this._code;
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
              value={`https://astexplorer.net/#/gist/${snippetID}/latest`}
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

function getSource(config, gist) {
  switch (config.v) {
    case 1:
      return gist.files['code.js'].content;
    case 2: {
      const ext = getParserByID(config.parserID).category.fileExtension;
      return gist.files[`source.${ext}`].content;
    }
  }
}
