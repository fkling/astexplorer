export default function(context) {
  return {
    TemplateLiteral(node) {
      context.report({
        node,
        message: 'Do not use template literals',

        fix(fixer) {
          if (node.expressions.length) {
            // Can't auto-fix template literal with expressions
            return;
          }
          
          return [
            fixer.replaceTextRange([node.start, node.start + 1], '"'),
            fixer.replaceTextRange([node.end - 1, node.end], '"'),
          ];
        },
      });
    }
  };
};
