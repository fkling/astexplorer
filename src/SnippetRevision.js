import Parse from './Parse';
import {getTransformerByID, getParserByID} from './parsers';

export default class SnippetRevision extends Parse.Object {
	constructor() {
		super('SnippetRevision');
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
}

Parse.Object.registerSubclass('SnippetRevision', SnippetRevision);
