import React from 'react';
import cx from 'classnames';
import CategoryButton from './CategoryButton';
import ParserButton from './ParserButton';
import TransformButton from './TransformButton';
import ParserSettingsButton from './ParserSettingsButton';

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
      <button
        type="button"
        disabled={
          !props.canSave || props.saving || props.forking
        }
        onClick={props.onSave}>
        <i
          className={cx({
            fa: true,
            'fa-spinner': props.saving,
            'fa-floppy-o': !props.saving,
            'fa-lg': true,
            'fa-fw': true,
          })}
        />
        Save
      </button>
      <button
        type="button"
        disabled={
          !props.canFork || props.saving || props.forking
        }
        onClick={props.onFork}>
        <i
          className={cx({
            fa: true,
            'fa-spinner': props.forking,
            'fa-code-fork': !props.forking,
            'fa-lg': true,
            'fa-fw': true,
          })}
        />
        Fork
      </button>
      <CategoryButton {...props} />
      <ParserButton {...props} />
      <ParserSettingsButton {...props} />
      <TransformButton {...props} />
      <a
        target="_blank"
        href="https://github.com/fkling/esprima_ast_explorer#features">
        <i
          className={cx({
            fa: true,
            'fa-lg': true,
            'fa-question': true,
            'fa-fw': true,
          })}
        />
        Help
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
  onTransformChange: React.PropTypes.func,
  parser: React.PropTypes.object,
  transformer: React.PropTypes.object,
  showTransformer: React.PropTypes.bool,
  canSave: React.PropTypes.bool,
  canFork: React.PropTypes.bool,
};

