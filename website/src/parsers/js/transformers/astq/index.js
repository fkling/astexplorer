import pkg from 'astq/package.json';

const ID = 'astq';
const name = 'ASTQ';

export default {
  id: ID,
  displayName: name,
  version: pkg.version,
  homepage: pkg.homepage,

  defaultParserID: 'esprima',

  loadTransformer (callback) {
    require(['esprima', 'astq'], (esprima, astq) =>
      callback({ esprima, astq }));
  },

  transform ({ esprima, astq }, xPathQuery, code) {
    const ASTQ = new astq();
    ASTQ.adapter('mozast');

    let results = {
      matches: 0,
      nodes: [],
    };
    if (!xPathQuery || xPathQuery === '') {
      return JSON.stringify(results, null, 2);
    }

    try {
      const ast = esprima.parseScript(code);
      const nodes = ASTQ.query(ast, xPathQuery);
      results = {
        matches: nodes.length,
        nodes,
      };
      return JSON.stringify(results, null, 2);
    } catch ({ message }) {
      return message;
    }
  },
};
