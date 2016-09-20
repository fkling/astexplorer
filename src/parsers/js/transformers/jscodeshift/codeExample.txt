export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.Identifier)
    .forEach(path => {
      j(path).replaceWith(
        j.identifier(path.node.name.split('').reverse().join(''))
      );
    })
    .toSource();
}
