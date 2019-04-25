import defaultParserInterface from '../../utils/defaultParserInterface';

export default {
  ...defaultParserInterface,

  opensByDefault(node, key) {
    return (
      Boolean(node) && node.type === 'Program' ||
      key === 'body' ||
      key === 'elements' || // array literals
      key === 'declarations' || // variable declaration
      key === 'expression' // expression statements
    );
  },

};
