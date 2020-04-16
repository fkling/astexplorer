import {getParser, getParserSettings, getCode} from './selectors';
import {ignoreKeysFilter, locationInformationFilter, functionFilter, emptyKeysFilter, typeKeysFilter} from '../core/TreeAdapter.js';

async function parse(parser, code, parserSettings) {
  if (!parser._promise) {
    parser._promise = new Promise(parser.loadParser);
  }
  let realParser;
  try {
    realParser = await parser._promise;
    const start = Date.now();
    const ast = await parser.parse(
      realParser,
      code,
      parserSettings || parser.getDefaultOptions(),
    );
    // Temporary adapter for parsers that haven't been migrated yet.
    const treeAdapter = {
      type: 'default',
      options: {
        openByDefault: (parser.opensByDefault || (() => false)).bind(parser),
        nodeToRange: parser.nodeToRange.bind(parser),
        nodeToName: parser.getNodeName.bind(parser),
        walkNode: parser.forEachProperty.bind(parser),
        filters: [
          ignoreKeysFilter(parser._ignoredProperties),
          functionFilter(),
          emptyKeysFilter(),
          locationInformationFilter(parser.locationProps),
          typeKeysFilter(parser.typeProps),
        ],
      },
    };
    return {
      time: Date.now() - start,
      ast: ast,
      error: null,
      treeAdapter,
      version: realParser.version || parser.version,
    };
  } catch(error) {
    return {
      time: null,
      ast: null,
      error,
      treeAdapter: null,
      version: realParser && realParser.version || parser.version,
    };
  }
}

export default store => next => async (action) => {
  const oldState = store.getState();
  next(action);
  const newState = store.getState();

  const newParser = getParser(newState);
  const newParserSettings = getParserSettings(newState);
  const newCode = getCode(newState);

  if (
    action.type === 'INIT' ||
    getParser(oldState) !== newParser ||
    getParserSettings(oldState) !== newParserSettings ||
    getCode(oldState) !== newCode
  ) {
    if (!newParser || newCode == null) {
      return;
    }

    let result;
    try {
      result = await parse(newParser, newCode, newParserSettings);
      // Did anything change in the meantime?
      if (
        newParser !== getParser(store.getState()) ||
        newParserSettings !== getParserSettings(store.getState()) ||
        newCode !== getCode(store.getState())
      ) {
        return;
      }
    } catch(error) {
      result = {
        time: null,
        ast: null,
        treeAdapter: null,
        error,
      };
    }
    next({
      type: 'SET_PARSE_RESULT',
      result,
    });
  }
};
