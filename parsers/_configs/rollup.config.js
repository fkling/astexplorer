import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import {terser} from 'rollup-plugin-terser';
import globals from 'rollup-plugin-node-globals';

export const output = {
  // Create a UMD build so that we can require it in node as well to extract
  // the final version number.
  format: 'umd',
  name: 'parser',
  amd: {
    id: 'parser',
  },
  plugins: [terser()],
};

export default {
  input: 'index.js',
  output,
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    json(),
    globals(),
  ],
}
