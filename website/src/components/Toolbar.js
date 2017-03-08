import React from 'react';
import CategoryButton from './buttons/CategoryButton';
import NewParserButton from './buttons/NewParserButton';
import SnippetButton from './buttons/SnippetButton';
import TransformButton from './buttons/TransformButton';

export default function Toolbar(props) {
  let {parser, transformer, showTransformer} = props;
  let transformerInfo = '';
  let parserInfo = '';
  if (parser) {
    parserInfo = parser.displayName;
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
      <NewParserButton {...props} />
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
  saving: React.PropTypes.bool,
  forking: React.PropTypes.bool,
  onSave: React.PropTypes.func,
  onFork: React.PropTypes.func,
  onParserChange: React.PropTypes.func,
  onParserSettingsButtonClick: React.PropTypes.func,
  onShareButtonClick: React.PropTypes.func,
  onTransformChange: React.PropTypes.func,
  parser: React.PropTypes.object,
  transformer: React.PropTypes.object,
  showTransformer: React.PropTypes.bool,
  canSave: React.PropTypes.bool,
  canFork: React.PropTypes.bool,
};
