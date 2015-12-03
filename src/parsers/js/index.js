export { default as codeExample } from './codeExample.txt';
import acorn from './acorn';
import babelEslint from './babel-eslint';
import babylon from './babylon';
import babylon6 from './babylon6';
import espree from './espree';
import esprima from './esprima';
import recast from './recast';
import shift from './shift';
import traceur from './traceur';
import typescript from './typescript';
import uglify from './uglify';

export const id = 'javascript';
export const displayName = 'JavaScript';

export const parsers = [
  acorn,
  babelEslint,
  babylon,
  babylon6,
  espree,
  esprima,
  recast,
  shift,
  traceur,
  typescript,
  uglify,
];

export function getDefaultParser() {
  return parsers[0];
}
