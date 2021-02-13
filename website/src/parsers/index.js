const localRequire = require.context('./', true, /^\.\/(?!utils|transpilers)[^/]+\/(transformers\/([^/]+)\/)?(codeExample\.txt|[^/]+?\.js)$/);

function interopRequire(module) {
  return module.__esModule ? module.default : module;
}

const files =
  localRequire.keys()
  .map(name => name.split('/').slice(1));

const categoryByID = {};
const parserByID = {};
const transformerByID = {};

const restrictedParserNames = new Set([
  'index.js',
  'codeExample.txt',
  'transformers',
  'utils',
]);

export const categories =
  files
  .filter(name => name[1] === 'index.js')
  .map(([catName]) => {
    let category = localRequire(`./${catName}/index.js`);

    categoryByID[category.id] = category;

    category.codeExample = interopRequire(localRequire(`./${catName}/codeExample.txt`))

    let catFiles =
      files
      .filter(([curCatName]) => curCatName === catName)
      .map(name => name.slice(1));

    category.parsers =
      catFiles
      .filter(([parserName]) => !restrictedParserNames.has(parserName))
      .map(([parserName]) => {
        let parser = interopRequire(localRequire(`./${catName}/${parserName}`));
        parserByID[parser.id] = parser;
        parser.category = category;
        return parser;
      });

    category.transformers =
      catFiles
      .filter(([dirName, , fileName]) => dirName === 'transformers' && fileName === 'index.js')
      .map(([, transformerName]) => {
        const transformerDir = `./${catName}/transformers/${transformerName}`;
        const transformer = interopRequire(localRequire(`${transformerDir}/index.js`));
        transformerByID[transformer.id] = transformer;
        transformer.defaultTransform = interopRequire(localRequire(`${transformerDir}/codeExample.txt`));
        return transformer;
      });

    return category;
  });

export function getDefaultCategory() {
  return categoryByID.javascript;
}

export function getDefaultParser(category = getDefaultCategory()) {
  return category.parsers.filter(p => p.showInMenu)[0];
}

export function getCategoryByID(id) {
  return categoryByID[id];
}

export function getParserByID(id) {
  return parserByID[id];
}

export function getTransformerByID(id) {
  return transformerByID[id];
}
