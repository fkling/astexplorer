import React from 'react';
import Parse from './Parse';
import {getTransformerByID, getParserByID} from '../../parsers';

export default class SnippetRevision extends Parse.Object {
	constructor() {
		super('SnippetRevision');
	}

  setSnippet(snippet) {
    this._snippet = snippet;
  }

  getSnippetID() {
    return this._snippet.id;
  }

  getRevisionID() {
    const revisions = this._snippet.get('revisions');
    for (let i = 0; i < revisions.length; i++) {
      if (revisions[i].id === this.id) {
        return i;
      }
    }
  }

  getTransformerID() {
    const transformerID = this.get('toolID');
    if (!transformerID && this.getTransformCode()) {
      // jscodeshift was the first transformer tool. Instead of updating
      // existing rows in the DB, we do this:
      return 'jscodeshift';
    }
    return transformerID;
  }

  getTransformCode() {
    const transform = this.get('transform');
    if (transform) {
      return transform;
    }
    if (this.get('toolID')) {
      return getTransformerByID(this.get('toolID')).defaultTransform;
    }
    return '';
  }

  getParserID() {
    const transformerID = this.getTransformerID();
    if (transformerID) {
      return getTransformerByID(transformerID).defaultParserID;
    }
    return this.get('parserID');
  }

  getCode() {
    const parserID = this.getParserID();
    return this.get('code') || getParserByID(parserID).category.codeExample;
  }

  getParserSettings() {
    const settings = this.get('settings');
    if (!settings) {
      return null;
    }
    const parserSettings = settings[this.getParserID()];
    return !!parserSettings && JSON.parse(parserSettings);
  }

  getShareInfo() {
    const snippetID = this.getSnippetID();
    const revisionID = this.getRevisionID();
    const latestRevision = this._snippet.get('revisions').length - 1;
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
              value={`https://astexplorer.net/#/gist/${snippetID}/${latestRevision}`}
            />
          </dd>
        </dl>
      </div>
    );
  }
}

Parse.Object.registerSubclass('SnippetRevision', SnippetRevision);
