import React from 'react';
import cx from 'classnames';
import CategoryButton from './CategoryButton';
import ParserButton from './ParserButton';
import TransformButton from './TransformButton';
import ParserSettingsButton from './ParserSettingsButton';

export default class Toolbar {
  static propTypes = {
    saving: React.PropTypes.bool,
    forking: React.PropTypes.bool,
    onSave: React.PropTypes.func,
    onFork: React.PropTypes.func,
    onParserChange: React.PropTypes.func,
    onTransformChange: React.PropTypes.func,
    parser: React.PropTypes.object,
    transformer: React.PropTypes.object,
  };

  render() {
    let {parser, transformer, transformPanelIsEnabled} = this.props;
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
    if (transformPanelIsEnabled) {
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
            !this.props.canSave || this.props.saving || this.props.forking
          }
          onClick={this.props.onSave}>
          <i
            className={cx({
              fa: true,
              'fa-spinner': this.props.saving,
              'fa-floppy-o': !this.props.saving,
              'fa-lg': true,
              'fa-fw': true,
            })}
          />
          Save
        </button>
        <button
          type="button"
          disabled={
            !this.props.canFork || this.props.saving || this.props.forking
          }
          onClick={this.props.onFork}>
          <i
            className={cx({
              fa: true,
              'fa-spinner': this.props.forking,
              'fa-code-fork': !this.props.forking,
              'fa-lg': true,
              'fa-fw': true,
            })}
          />
          Fork
        </button>
        <CategoryButton {...this.props} />
        <ParserButton {...this.props} />
        <ParserSettingsButton {...this.props} />
        <TransformButton {...this.props} />
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
}
