import React from 'react';
import CategoryButton from './components/buttons/CategoryButton';
import ForkButton from './components/buttons/ForkButton';
import ParserButton from './components/buttons/ParserButton';
import SaveButton from './components/buttons/SaveButton';
import TransformButton from './components/buttons/TransformButton';

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
      <SaveButton {...props} />
      <ForkButton {...props} />
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
  saving: React.PropTypes.bool,
  forking: React.PropTypes.bool,
  onSave: React.PropTypes.func,
  onFork: React.PropTypes.func,
  onParserChange: React.PropTypes.func,
  onParserSettingsButtonClick: React.PropTypes.func,
  onTransformChange: React.PropTypes.func,
  parser: React.PropTypes.object,
  transformer: React.PropTypes.object,
  showTransformer: React.PropTypes.bool,
  canSave: React.PropTypes.bool,
  canFork: React.PropTypes.bool,
};
