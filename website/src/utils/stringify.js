/**
 * Converts a JS value to a sensible string representation.
 */
export default function stringify(value) {
  switch (typeof value) {
    case 'function':
      return value.toString().match(/function[^(]*\([^)]*\)/)[0];
    case 'object':
      return value ? JSON.stringify(value, stringify) : 'null';
    case 'undefined':
      return 'undefined';
    case 'number':
    case 'bigint':
      return Number.isNaN(value) ? 'NaN' : String(value);
    default:
      return JSON.stringify(value);
  }
}
