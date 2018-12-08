import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from '@angular/compiler/package.json';

const ID = 'angular';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set([
    'span',
    'sourceSpan',
    'startSourceSpan',
    'endSourceSpan',
  ]),

  loadParser(callback) {
    require(['@angular/compiler'], callback);
  },

  parse(ng, code, options) {
    const ast = ng.parseTemplate(code, 'astexplorer.html', options);
    fixSpan(ast, code);
    return ast;
  },

  nodeToRange(node) {
    if (node.startSourceSpan) {
      if (node.endSourceSpan) {
        return [
          node.startSourceSpan.start.offset,
          node.endSourceSpan.end.offset,
        ];
      }
      return [
        node.startSourceSpan.start.offset,
        node.startSourceSpan.end.offset,
      ];
    }
    if (node.sourceSpan) {
      return [node.sourceSpan.start.offset, node.sourceSpan.end.offset];
    }
    if (node.span) {
      return [node.span.start, node.span.end];
    }
  },

  getNodeName,

  getDefaultOptions() {
    return {
      preserveWhitespaces: false,
    };
  },
};

function getNodeName(node) {
  return node.constructor && node.constructor.name;
}

function fixSpan(ast, code) {
  const KEEP_VISIT = 1;
  function visitTarget(value, isTarget, fn, parent) {
    if (value !== null && typeof value === 'object') {
      if (isTarget(value)) {
        if (fn(value, parent) !== KEEP_VISIT) {
          return;
        }
      }
      if (Array.isArray(value)) {
        value.forEach(subValue => visitTarget(subValue, isTarget, fn, value));
      } else {
        for (const key in value) {
          visitTarget(value[key], isTarget, fn, value);
        }
      }
    }
  }

  function getBaseStart(parent) {
    const nodeName = getNodeName(parent);
    switch (nodeName) {
      case 'BoundAttribute': {
        let offset = parent.sourceSpan.start.offset;
        while (code[offset++] !== '=');
        if (code[offset] === "'" || code[offset] === '"') offset++;
        return offset;
      }
      case 'BoundText':
        return parent.sourceSpan.start.offset;
      default:
        throw new Error(`Unexpected node ${nodeName}`);
    }
  }

  visitTarget(
    ast,
    value => getNodeName(value) === 'ASTWithSource',
    (node, parent) => {
      const baseStart = getBaseStart(parent);
      visitTarget(
        node,
        value => value.span,
        node => {
          node.span.start += baseStart;
          node.span.end += baseStart;
          return KEEP_VISIT;
        }
      );
    }
  );
}
