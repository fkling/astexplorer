import PropTypes from 'prop-types';
import React from 'react';
import CategoryButton from './buttons/CategoryButton';
import ParserButton from './buttons/ParserButton';
import SnippetButton from './buttons/SnippetButton';
import TransformButton from './buttons/TransformButton';

export default function Toolbar(props) {
  let {parser, transformer, showTransformer} = props;
  let parserInfo = parser.id;
  let transformerInfo = '';
  if (parser) {
    if (parser.version) {
      parserInfo += '-' + parser.version;
    }
    if (parser.homepage) {
      parserInfo =
        <a href={parser.homepage} target="_blank">{parserInfo}</a>;
    }
  }
  if (showTransformer) {
    transformerInfo = transformer.displayName;
    if (transformer.version) {
      transformerInfo += '-' + transformer.version;
    }
    if (transformer.homepage) {
      transformerInfo =
        <a href={transformer.homepage} target="_blank">{transformerInfo}</a>;
    }
    transformerInfo = <span>Transformer: {transformerInfo}</span>;
  }

  return (
    <div id="Toolbar">
      <h1>AST Explorer</h1>
      <SnippetButton {...props} />
      <CategoryButton {...props} />
      <ParserButton {...props} />
      <TransformButton {...props} />
      <a
        style={{minWidth: 0}}
        target="_blank"
        title="Help"
        href="https://github.com/fkling/esprima_ast_explorer#features">
        <i className="fa fa-lg fa-question fa-fw" />
      </a>
      <div id="info" className={transformerInfo ? 'small' : ''}>
        Parser: {parserInfo}<br />
        {transformerInfo}
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  saving: PropTypes.bool,
  forking: PropTypes.bool,
  onSave: PropTypes.func,
  onFork: PropTypes.func,
  onParserChange: PropTypes.func,
  onParserSettingsButtonClick: PropTypes.func,
  onShareButtonClick: PropTypes.func,
  onTransformChange: PropTypes.func,
  parser: PropTypes.object,
  transformer: PropTypes.object,
  showTransformer: PropTypes.bool,
  canSave: PropTypes.bool,
  canFork: PropTypes.bool,
};
