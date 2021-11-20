import * as babel from 'babel-core';
import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import protect from '../utils/protectFromLoops';

const options = {
  presets: [es2015, stage0],
  plugins: [],
  ast: false,
  babelrc: false,
  highlightCode: false,
};

export default function transpile(code) {
  let es5Code = babel.transform(code, options).code;
  es5Code = protect(es5Code);
  return es5Code;
}
