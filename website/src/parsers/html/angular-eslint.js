import defaultParserInterface from '../js/utils/defaultESTreeParserInterface';
import pkg from '@angular-eslint/template-parser/package.json';

const ID = '@angular-eslint/template-parser';

function wrapParesr(callback, { parseForESLint }) {
  const parse = (code, options) => {
    const {
      ast,
      visitorKeys,
      services: { convertNodeSourceSpanToLoc },
    } = parseForESLint(code, options);

    // Traverse AST in order to add `loc` and `range` for each child
    const addLocation = node => {
      if (!node.startSourceSpan || !node.endSourceSpan) {
        if (!node.sourceSpan) return node;
        const range = node.range || [
          node.sourceSpan.start.offset,
          node.sourceSpan.end.offset,
        ];
        const loc = node.loc || convertNodeSourceSpanToLoc(node.sourceSpan);
        return {
          ...node,
          range,
          loc,
        };
      } else {
        const range = node.range || [
          node.startSourceSpan.start.offset,
          node.endSourceSpan.end.offset,
        ];
        const loc = node.loc || { 
          start: convertNodeSourceSpanToLoc(node.startSourceSpan).start,
          end: convertNodeSourceSpanToLoc(node.endSourceSpan).end,
        };
        return {
          ...node,
          range,
          loc,
        };
      }
    };

    const visit = node => {
      const keys = visitorKeys[node.type] || [];
      const newNode = keys.reduce((acc, key) => {
        const child = node[key];
        if (Array.isArray(child)) {
          const children = child;
          return { ...acc, [key]: children.map(visit) };
        } else if (child != null) {
          return { ...acc, [key]: visit(child) };
        } else {
          return acc;
        }
      }, node);
      return addLocation(newNode);
    };
    return visit(ast);
  };

  return callback({ parse });
}

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/angular-eslint/angular-eslint',
  locationProps: new Set(['loc', 'start', 'end', 'range', 'startSourceSpan', 'endSourceSpan', 'sourceSpan', 'handlerSpan', 'location']),

  loadParser(callback) {
    require(['@angular-eslint/template-parser'], wrapParesr.bind(null, callback));
  },

  parse(parser, code, options) {
    return parser.parse(code, options);
  },
};
