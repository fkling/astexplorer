/**
 * Paste some code here and explore the syntax tree
 * created by esprima or babel. You can use all the
 * cool new features from ES6. Enjoy!
 */

var tips = [
  "Click on any AST node with a '+' to expand it",

  "Hovering over a node highlights the \
   corresponding part in the source code",

  "Shift click on an AST node expands the whole substree"
];

function printTips() {
  tips.forEach((tip, i) => console.log(`Tip ${i}:` + tip));
}
