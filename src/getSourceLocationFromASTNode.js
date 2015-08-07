export default function getSourceLocationFromASTNode(node) {
  var range;
  if (node.range) {
    range = node.range;
  } else if (node.start || node.end) {
    range = [node.start, node.end];
  }
  return range;
}
