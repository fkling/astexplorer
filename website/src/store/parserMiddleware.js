import {getParser, getParserSettings, getCode, getParseResult} from './selectors';
import {ignoreKeysFilter, locationInformationFilter, functionFilter, emptyKeysFilter, typeKeysFilter} from '../core/TreeAdapter.js';

function parse(parser, code, parserSettings, prevResult) {
  if (!parser._promise) {
    parser._promise = new Promise(parser.loadParser);
  }
  return parser._promise.then(
    realParser => parser.parse(
      realParser,
      code,
      parserSettings || parser.getDefaultOptions(),
      prevResult,
    )
  );
}

export default store => next => action => {
  const oldState = store.getState();
  const oldParser = getParser(oldState);
  next(action);
  const newState = store.getState();

  const newParser = getParser(newState);
  const newParserSettings = getParserSettings(newState);
  const newCode = getCode(newState);

  if (
    action.type === 'INIT' ||
    oldParser !== newParser ||
    getParserSettings(oldState) !== newParserSettings ||
    getCode(oldState) !== newCode
  ) {
    if (!newParser || newCode == null) {
      return;
    }
    const start = Date.now();
    const prevParserResult = (
      action.type !== 'INIT' && oldParser === newParser
    ) ? getParseResult(oldState) : undefined;
    return parse(newParser, newCode, newParserSettings, prevParserResult).then(
      ast => {
        // Did anything change in the meantime?
        if (
          newParser !== getParser(store.getState()) ||
          newParserSettings !== getParserSettings(store.getState()) ||
          newCode !== getCode(store.getState())
        ) {
          return;
        }
        // Temporary adapter for parsers that haven't been migrated yet.
        const treeAdapter = {
          type: 'default',
          options: {
            openByDefault: (newParser.opensByDefault || (() => false)).bind(newParser),
            nodeToRange: newParser.nodeToRange.bind(newParser),
            nodeToName: newParser.getNodeName.bind(newParser),
            walkNode: newParser.forEachProperty.bind(newParser),
            filters: [
              ignoreKeysFilter(newParser._ignoredProperties),
              functionFilter(),
              emptyKeysFilter(),
              locationInformationFilter(newParser.locationProps),
              typeKeysFilter(newParser.typeProps),
            ],
          },
        };
        next({
          type: 'SET_PARSE_RESULT',
          result: {
            time: Date.now() - start,
            ast: ast,
            error: null,
            treeAdapter,
          },
        });
      },
      error => {
        console.error(error); // eslint-disable-line no-console
        next({
          type: 'SET_PARSE_RESULT',
          result: {
            time: null,
            ast: null,
            treeAdapter: null,
            error,
          },
        });
      }
    );
  }

};
