import Parse from './Parse';

export default class SnippetRevision extends Parse.Object {
	constructor() {
		super('SnippetRevision');
	}

  getParserSettings() {
    const settings = this.get('settings');
    if (!settings) {
      return null;
    }
    const parserSettings = settings[this.get('parserID')];
    return !!parserSettings && JSON.parse(parserSettings);
  }
}

Parse.Object.registerSubclass('SnippetRevision', SnippetRevision);
