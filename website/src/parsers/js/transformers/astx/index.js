import compileModule from '../../../utils/compileModule';
import pkg from 'astx/package.json';

const ID = 'astx';

export default {
  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage || 'https://github.com/codemodsquad/astx',

  defaultParserID: 'babylon7',
  compatibleParserIDs: new Set(['recast', 'babylon7']),

  formatCodeExample(codeExample) {
    return codeExample;
  },

  loadTransformer(callback) {
    require([
      '../../../transpilers/babel',
      'astx/cjs/Astx',
      'astx/cjs/babel/BabelBackend',
      'astx/cjs/recast/RecastBackend',
      'astx/cjs/util/CodeFrameError',
      '@babel/parser',
    ], (
      transpile,
      Astx,
      BabelBackend,
      RecastBackend,
      CodeFrameError,
      babelParser
    ) => {
      callback({
        transpile: transpile.default,
        Astx: Astx.default,
        BabelBackend: BabelBackend.default,
        RecastBackend: RecastBackend.default,
        CodeFrameError: CodeFrameError.default,
        babelParser,
      });
    });
  },

  async transform(props, transformCode, source, { parser, parserSettings }) {
    const {
      transpile,
      Astx,
      BabelBackend,
      RecastBackend,
      CodeFrameError,
      babelParser,
    } = props;
    const file = 'file.js';
    try {
      transformCode = transpile(transformCode);
      const transform = compileModule(transformCode);

      let transformFn = transform.astx;

      const { find, replace } = transform;
      if (typeof transformFn !== 'function' && find) {
        transformFn = ({ astx }) => {
          const result = astx.find(find, { where: transform.where });
          if (replace) result.replace(replace);
          if (!result.size) return null;
        };
      }
      if (typeof transformFn === 'function') {
        const backend =
          parser === 'recast'
            ? new RecastBackend({
                wrapped: new BabelBackend({
                  parserOptions: parserSettings.babylon7,
                }),
                parseOptions: { ...parserSettings },
              })
            : new BabelBackend({
                parserOptions: parser === 'babylon7' ? parserSettings : null,
              });
        const { t } = backend;

        let ast, root;
        try {
          ast = backend.parse(source);
          root = new backend.t.NodePath(ast);
        } catch (error) {
          if (error instanceof Error) {
            CodeFrameError.rethrow(error, { filename: file, source });
          }
          throw error;
        }

        const astx = new Astx(backend, [root]);

        const options = {
          source,
          file,
          root,
          t,
          report: (msg) => {
            transform.onReport?.({ file, report: msg });
            console.log('astx report:', msg);
          },
          ...backend.template,
          astx,
        };

        const _result = await transformFn(options);
        let transformed;

        if (transform.astx || transform.replace) {
          transformed = _result;
          if (transformed === undefined) {
            transformed = backend.generate(ast).code;
          }
          if (transformed === null) transformed = undefined;
        }

        return transformed;
      }
    } catch (error) {
      if (error instanceof CodeFrameError) {
        throw new Error(error.format({ highlightCode: true }));
      }
      throw error;
    }
  },
};
