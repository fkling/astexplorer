import compileModule from '../../../utils/compileModule';
import pkg from 'typescript/package.json';

const ID = 'typescript';
const FILENAME = 'astExplorer.tsx';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  showInMenu: true,

  defaultParserID: 'typescript',

  loadTransformer(callback) {
    require(['../../../transpilers/typescript', 'typescript'], (
      transpile,
      typescript,
    ) => callback({ transpile: transpile.default, ts: typescript }));
  },

  transform({ transpile, ts }, transformCode, code) {
    transformCode = transpile(transformCode);
    const mod = compileModule(
      // eslint-disable-line no-shadow
      transformCode,
      { ts },
    );

    const createTransformer = mod.default || mod;

    const host /*: ts.host*/ = {
      fileExists: () => true,
      getCanonicalFileName: (filename) => filename,
      getCurrentDirectory: () => '',
      getDefaultLibFileName: () => 'lib.d.ts',
      getNewLine: () => '\n',
      getSourceFile: (filename) => {
        return ts.createSourceFile(
          filename,
          code,
          ts.ScriptTarget.Latest,
          true,
        );
      },
      readFile: () => null,
      useCaseSensitiveFileNames: () => true,
      writeFile: () => null,
    };

    const program = ts.createProgram([FILENAME], {
      noResolve: true,
      target: ts.ScriptTarget.Latest,
      experimentalDecorators: true,
      experimentalAsyncFunctions: true,
      jsx: true,
    }, host);

    const transformerFactory = createTransformer(program);

    const sourceFile = program.getSourceFile(FILENAME)
    const transformResult = ts.transform(sourceFile, [transformerFactory], program.getCompilerOptions());
    const resultFile = transformResult.transformed[0];

    const writer = ts.createTextWriter(host.getNewLine());
    const printer = ts.createPrinter();

    printer.writeFile(resultFile, writer, void 0);
    const result = writer.getText();
    writer.clear();

    return result;
  },
};
