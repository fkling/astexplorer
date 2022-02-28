## AST explorer

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/fkling/astexplorer)
[![Join the chat at https://gitter.im/astexplorer/Lobby](https://badges.gitter.im/astexplorer/Lobby.svg)](https://gitter.im/astexplorer/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/fkling/astexplorer.svg?branch=master)](https://travis-ci.org/fkling/astexplorer)

Paste or drop code into the editor and inspect the generated AST on https://astexplorer.net/

The AST explorer provides following code parsers:

- CSS:
  - [cssom][]
  - [csstree][]
  - [postcss][] + [postcss-safe-parser][] & [postcss-scss][]
  - [rework][]
- [GraphQL][]
- Graphviz:
  - [redot][]
- Handlebars:
  - [glimmer][]
  - [handlebars][]
  - [ember-template-recast][]
- HTML:
  - [htmlparser2][]
  - [parse5][]
  - [@angular/compiler][]
  - [@angular-eslint/template-parser][]
  - [svelte][]
  - [posthtml][]
  - [hyntax][]
- Vue:
  - [vue-template-compiler][]
  - [@vue/compiler-core][]
  - [vue-eslint-parser][]
- [ICU][]
- Java
  - [java-parser][]
- JavaScript:
  - [acorn][] + [acorn-jsx][]
  - [babel-eslint][]
  - [babylon][]
  - [espree][]
  - [esformatter][]
  - [esprima][]
  - [flow-parser][]
  - [hermes-parser][]
  - [meriyah][]
  - [recast][]
  - [seafox][]
  - [shift][]
  - [swc][]
  - [traceur][]
  - [typescript][]
  - [typescript-eslint-parser][]
  - [uglify-js][]
- JSON:
  - [JSON][]
  - [Momoa][]
- Lua:
  - [luaparse][]
- Markdown:
  - [remark][]
- [MDX][]:
  - [mdxhast][]
- Monkey
  - [monkey][]
- PHP
  - [php-parser][]
- [Pug][]
- Regular Expressions:
  - [regexp-tree][]
  - [regexpp][]
  - [regjsparser][]
- Protocol Buffers:
  - [pbkit][]
- Scala
  - [Scalameta][]
- Solidity:
  - [solidity-parser-antlr][]
- SQL:
  - [sqlite-parser][]
- [WebIDL][]
- YAML:
  - [yaml][]
  - [yaml-ast-parser][]

### Experimental / custom syntax

Depending on the parser settings, it not only supports ES5/CSS3 but also

- ES6: [arrow functions](https://github.com/lukehoban/es6features#arrows), [destructuring](https://github.com/lukehoban/es6features#destructuring),
  [classes](https://github.com/lukehoban/es6features#classes), ...
- ES7 proposals: [async/await](https://github.com/lukehoban/ecmascript-asyncawait), [object rest / spread](https://github.com/sebmarkbage/ecmascript-rest-spread), ...
- [JSX](https://facebook.github.io/jsx/), known through [React](https://facebook.github.io/react/).
- Typed JavaScript ([Flow](http://flowtype.org/) and [TypeScript](http://typescriptlang.org/))
- [SASS](http://sass-lang.com/)

### Transforms

Since future syntax is supported, the AST explorer is a useful tool for
developers who want to create AST transforms. In fact, following transformers
are included so you can prototype your own plugins:

- JavaScript
  - [babel][] (v5, v6)
  - [ESLint][] (v1, v2, v3)
  - [jscodeshift][]
  - [tslint][]
- HTML
  - [posthtml][]
- CSS
  - [postcss][]
- MDX
  - [mdx][]
- Regular Expressions
  - [regexp-tree][]
- Handlebars
  - [glimmer][]

### More Features

- Save and fork code snippets. Copy the URL to share them.
- Copying an AST or dropping a file containing an AST into the window will
  parse the AST and update the code using [escodegen][].
- Otherwise, the content of text editor will be replaced with the content of the
  file (i.e. you can drag and drop JS files).
- Choose between multiple parsers and configure them.
- shift+click on a node expands the full subtree.
- Hovering over a node highlights the corresponding text in the source code
- Editing the source or moving the cursor around will automatically highlight
  the corresponding AST node (or its ancestors of it isn't expanded)
- You can use `$node` in the console to refer to the last opened/toggled AST
  node.

[acorn-jsx]: https://github.com/RReverser/acorn-jsx
[acorn]: https://github.com/ternjs/acorn
[@angular/compiler]: https://angular.io/
[@angular-eslint/template-parser]: https://github.com/angular-eslint/angular-eslint/tree/master/packages/template-parser
[babel-eslint]: https://github.com/babel/babel-eslint
[babel]: https://babeljs.io/docs/advanced/plugins/
[babylon]: https://babeljs.io/
[cssom]: https://github.com/NV/CSSOM
[csstree]: https://github.com/csstree/csstree
[ember-template-recast]: https://github.com/ember-template-lint/ember-template-recast
[escodegen]: https://github.com/estools/escodegen
[eslint]: http://eslint.org/
[espree]: https://github.com/eslint/espree
[esprima]: https://github.com/jQuery/esprima
[flow-parser]: https://github.com/facebook/flow/tree/master/src/parser
[graphql]: https://facebook.github.io/graphql/
[hermes-parser]: https://github.com/facebook/hermes/tree/master/tools/hermes-parser/js/hermes-parser
[htmlparser2]: https://github.com/fb55/htmlparser2
[jscodeshift]: https://github.com/facebook/jscodeshift
[luaparse]: https://oxyc.github.io/luaparse/
[meriyah]: https://github.com/meriyah/meriyah/
[parse5]: https://github.com/inikulin/parse5
[pbkit]: https://github.com/pbkit/pbkit
[postcss-safe-parser]: https://github.com/postcss/postcss-safe-parser
[postcss-scss]: https://github.com/postcss/postcss-scss
[postcss]: https://github.com/postcss/postcss
[posthtml]: https://github.com/posthtml/posthtml
[recast]: https://github.com/benjamn/recast
[seafox]: https://github.com/KFlash/seafox
[rework]: https://github.com/reworkcss/rework
[shift]: https://github.com/shapesecurity/shift-parser-js
[swc]: https://github.com/swc-project/swc
[traceur]: https://github.com/google/traceur-compiler
[typescript]: https://github.com/Microsoft/TypeScript/
[typescript-eslint-parser]: https://github.com/eslint/typescript-eslint-parser/
[tslint]: https://palantir.github.io/tslint/
[uglify-js]: https://github.com/mishoo/UglifyJS2
[webidl]: https://github.com/darobin/webidl2.js
[redot]: https://github.com/redotjs/redot
[remark]: https://github.com/remarkjs/remark
[regexp-tree]: https://github.com/DmitrySoshnikov/regexp-tree
[regexpp]: https://github.com/mysticatea/regexpp
[regjsparser]: https://github.com/jviereck/regjsparser
[php-parser]: https://github.com/glayzzle/php-parser
[pug]: https://github.com/pugjs/pug
[glimmer]: https://github.com/glimmerjs/glimmer-vm
[handlebars]: http://handlebarsjs.com/
[icu]: https://formatjs.io/docs/intl-messageformat-parser/
[json]: https://github.com/vtrushin/json-to-ast
[Momoa]: https://github.com/humanwhocodes/momoa
[sqlite-parser]: https://github.com/codeschool/sqlite-parser
[yaml]: https://github.com/eemeli/yaml
[yaml-ast-parser]: https://github.com/mulesoft-labs/yaml-ast-parser
[esformatter]: https://github.com/millermedeiros/esformatter-parser#readme
[mdx]: https://mdxjs.com/
[mdxhast]: https://mdxjs.com/advanced/ast#mdxhast
[mdx]: https://mdxjs.com/advanced/sync-api
[monkey]: https://github.com/gengjiawen/monkey-rust
[scalameta]: http://scalameta.org/
[solidity-parser-antlr]: https://github.com/federicobond/solidity-parser-antlr
[vue-template-compiler]: https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler
[@vue/compiler-core]: https://github.com/vuejs/vue-next/blob/master/packages/compiler-core/README.md
[vue-eslint-parser]: https://github.com/mysticatea/vue-eslint-parser
[svelte]: https://github.com/sveltejs/svelte
[hyntax]: https://github.com/nik-garmash/hyntax
[java-parser]: https://github.com/jhipster/prettier-java/tree/master/packages/java-parser

### Contributions

I'm happy about any feedback, feature request or PR to make this tool as useful
as possible!

---

#### How to add a new parser

1. Go to `website/`.
2. Install the new parser as dependency: `yarn add theParser` (or `npm install -S theParser`)
3. Copy one of the existing examples in `src/parsers/{language}`.
4. Adjust the code as necessary:

- Update metadata.
- Load the right parser (`loadParser`).
- Call the right parsing method with the right/necessary options in `parse`.
- Implement the `nodeToRange` method (this is for highlighting).
- Implement the `getNodeName` method (this is for quick look through the tree).
- Implement `opensByDefault` method for auto-expansion of specific properties.
- Define `_ignoredProperties` set or implement `forEachProperty` generator method for filtering.
- Provide a `renderSettings` method if applicable.

#### How to add a new transformer

0. Go to `website/`.
1. Install the new transformer as dependency.
1. Copy one of the existing examples in `src/parsers/{language}/transformers`.
1. Adjust the code as necessary:

- Update metadata and `defaultParserID`.
- Load the right transformer (`loadTransformer`).
- Call the transformation method in `transform`.
- Change sample transformation code in `codeExample.txt`.

#### Build your own version for development

1. Clone the repository.
2. Go to `website/`.
3. Install all dependencies with `yarn install` (you can run `npm install` as
   well).

Run `yarn run build` for the final minimized version.
Run `yarn run watch` for incremental builds.

Run `yarn start` to start a simple static webserver.
