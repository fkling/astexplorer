import babel_options from 'recast/parsers/_babel_options';
import { parser } from 'recast/parsers/babel';

// modified version of recast/parsers/typescript.js that also
// adds the jsx plugin
export function parse(source, options) {
  var babelOptions = babel_options(options);
  babelOptions.plugins.push('typescript');
  babelOptions.plugins.push('jsx');
  return parser.parse(source, babelOptions);
}
