import * as babel from 'babel-core';
import es2015 from 'babel-preset-es2015';
import stage0 from 'babel-preset-stage-0';
import flowStripTypes from 'babel-plugin-transform-flow-strip-types';

const options = {
  presets: [es2015, stage0],
  plugins: [flowStripTypes],
  ast: false,
  babelrc: false,
  highlightCode: false,
};

export default function transform(code) {
  return babel.transform(code, options).code;
}
