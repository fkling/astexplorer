// These properties are contained in some AST and are problematic because
// they may be circular dependencies
export default new Set(['parent', '__path']);
