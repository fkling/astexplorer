import ts from 'typescript';
import protect from '../utils/protectFromLoops';

let compilerOptions = { module: ts.ModuleKind.System };

export default function transpile(code) {
  let es5Code = ts.transpileModule(code, compilerOptions).outputText;
  es5Code = protect(es5Code);
  return es5Code;
}
