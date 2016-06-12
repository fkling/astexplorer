import * as LocalStorage from '../LocalStorage';
import {
  getParserByID,
  getDefaultParser,
  getTransformerByID,
} from '../parsers';

export default function getDataFromRevision(revision) {
  const transformerID = revision.get('toolID');
  let transformer = transformerID && getTransformerByID(transformerID);
  let transformCode = revision.get('transform');
  if (transformCode && !transformer) {
    // jscodeshift was the first transformer tool. Instead of updating
    // existing rows in the DB, we do this
    transformer = getTransformerByID('jscodeshift');
  } else if (transformer && !transformCode) {
    transformCode = transformer.defaultTransform;
  }

  // Get parser from transformer > revision > local storage > default
  let parser;
  if (transformer) {
    parser = getParserByID(transformer.defaultParserID);
  }
  if (!parser) {
    parser = getParserByID(revision.get('parserID'));
  }
  if (!parser) {
    parser = getParserByID(LocalStorage.getParser());
  }
  if (!parser) {
    parser = getDefaultParser();
  }

  const code = revision.get('code') || parser.category.codeExample;
  let parserSettings = revision.getParserSettings();
  if (!parserSettings) {
    parserSettings = LocalStorage.getParserSettings(parser.id) || {};
  }

  return {parser, transformer, code, transformCode, parserSettings};
}
