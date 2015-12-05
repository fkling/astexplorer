const requireParser = require.context('./', true, /^\.\/(?!utils)[^/]+\/(codeExample\.txt|[^/]+?\.js)$/);

const files =
  requireParser.keys()
  .map(name => name.match(/\.\/(.*?)\/(.*)/).slice(1));

const categoryByID = {};
const parserByID = {};

export const categories =
  files
  .filter(([, fileName]) => fileName === 'index.js')
  .map(([catName]) => {
    let category = requireParser(`./${catName}/index.js`);
    categoryByID[category.id] = category;
    category.codeExample = requireParser(`./${catName}/codeExample.txt`);
    category.parsers =
      files
      .filter(([curCatName, curFileName]) => (
        curCatName === catName &&
        curFileName !== 'index.js' &&
        curFileName !== 'codeExample.txt'
      ))
      .map(([catName, curParserName]) => {
        let parser = requireParser(`./${catName}/${curParserName}`);
        parserByID[parser.id] = parser;
        parser.category = category;
        return parser;
      });
    return category;
  });

export function getDefaultCategory() {
  return categoryByID.javascript;
}

export function getDefaultParser(category = getDefaultCategory()) {
  return category.parsers[0];
}

export function getCategoryByID(id) {
  return categoryByID[id];
}

export function getParserByID(id) {
  return parserByID[id];
}
