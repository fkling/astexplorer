import Parse from './Parse';

export default class SnippetRevision extends Parse.Object {
	constructor() {
		super('SnippetRevision');
	}
}

Parse.Object.registerSubclass('SnippetRevision', SnippetRevision);
