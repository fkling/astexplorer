import Parse from './Parse';

export default class Snippet extends Parse.Object {
  constructor() {
    super('Snippet');
  }
}

Parse.Object.registerSubclass('Snippet', Snippet);
