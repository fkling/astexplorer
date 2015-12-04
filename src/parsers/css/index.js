export { default as codeExample } from './codeExample.txt';

import rework from './rework';
import postcss from './postcss';

export const id = 'css';
export const displayName = 'CSS';

export const parsers = [
  rework,
  postcss,
];
