import CompactArrayView from './CompactArrayView';
import CompactObjectView from './CompactObjectView';
import PubSub from 'pubsub-js';
import React from 'react';
import RecursiveTreeElement from './RecursiveTreeElement';

import cx from 'classnames';
import stringify from '../../utils/stringify';

const {PropTypes} = React;

/*
// For debugging
function log(f) {
  return function(a, b) {
    var result = f.call(this, a,b);
    console.log(a.name, a.name || a.value && a.value.type, 'Updates', result);
    return result;
  };
}
*/

const Element = RecursiveTreeElement(React.createClass({
  propTypes: {
    name: PropTypes.string,
    value: PropTypes.any.isRequired,
    deepOpen: PropTypes.bool,
    focusPath: PropTypes.array.isRequired,
    level: PropTypes.number,
    parser: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    parent: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
  },

  getInitialState: function() {
    const {value, name, deepOpen, parser, focusPath, settings} = this.props;
    // Some elements should be open by default
    var open =
      this.props.level === 0 ||
      deepOpen ||
      (!!value && parser.opensByDefault(value, name)) ||
      (!!settings.autofocus && focusPath.indexOf(value) > -1);

    return {
      open,
      deepOpen,
      value,
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      open: nextProps.deepOpen ||
        this.state.open ||
        this._shouldAutoFocus(this.props, nextProps),
      deepOpen: nextProps.deepOpen,
      value: nextProps.value,
    });
  },

  _shouldAutoFocus(thisProps, nextProps) {
    const {focusPath: thisFocusPath} = thisProps;
    const {settings: nextSettings, focusPath: nextFocusPath} = nextProps;

    return (
      thisFocusPath !== nextFocusPath &&
      nextFocusPath.indexOf(nextProps.value) > -1 &&
      nextSettings.autofocus
    );
  },

  componentDidMount: function() {
    if (this.props.settings.autofocus) {
      this._scrollIntoView();
    }
  },

  componentDidUpdate: function(prevProps) {
    if (this._shouldAutoFocus(prevProps, this.props)) {
      this._scrollIntoView();
    }
  },

  _scrollIntoView: function() {
    const {focusPath, value} = this.props;
    if (focusPath.length > 0 && focusPath[focusPath.length -1] === value) {
      setTimeout(() => {
        const node = React.findDOMNode(this);
        node.scrollIntoView();
      }, 0);
    }
  },

  _toggleClick: function(event) {
    // Make AST node accessible
    global.$node = this.state.value;

    this.setState({
      open: event.shiftKey || !this.state.open,
      deepOpen: event.shiftKey,
    });
  },

  _onMouseOver: function(e) {
    e.stopPropagation();
    PubSub.publish('HIGHLIGHT', this.state.value);
  },

  _onMouseLeave: function() {
    PubSub.publish('CLEAR_HIGHLIGHT', this.state.value);
  },

  _isFocused: function(level, path, value, open) {
    return level !== 0 &&
      path.indexOf(value) > -1 &&
      (!open || path[path.length - 1] === value);
  },

  _getProperties: function(parser, value) {
    const {hideFunctions, hideEmptyKeys} = this.props.settings;
    let properties = [];
    parser.forEachProperty(value, o => properties.push(o));
    return properties
      .filter(({value}) => !hideFunctions || typeof value !== 'function')
      .filter(({value}) => !hideEmptyKeys || value != null);
  },

  _execFunction: function() {
    let state = {error: null};
    try {
      state.value = this.state.value.call(this.props.parent);
      console.log(state.value);
    } catch(err) {
      console.error(`Unable to run "${this.props.name}": `, err.message);
      state.error = err;
    }
    this.setState(state);
  },

  render: function() {
    const {
      focusPath,
      parser,
      level,
      settings,
    } = this.props;
    const {
      open,
      value,
    } = this.state;
    const focused = this._isFocused(level, focusPath, value, open);
    let valueOutput = null;
    let content = null;
    let prefix = null;
    let suffix = null;
    let showToggler = false;
    let enableHighlight = false;

    if (Array.isArray(value)) {
      if (value.length > 0 && open) {
        prefix = '[';
        suffix = ']';
        var elements = value.map(
          (v, i) =>
            <Element
              key={i}
              focusPath={focusPath}
              deepOpen={this.state.deepOpen}
              value={v}
              level={this.props.level + 1}
              parser={parser}
              settings={settings}
              parent={value}
            />
        );
        content = <ul className="value-body">{elements}</ul>;
      } else {
        valueOutput =
          <CompactArrayView
            array={value}
            onClick={this._toggleClick}
          />;
      }
      showToggler = value.length > 0;
    } else if (value && typeof value === 'object') {
      enableHighlight = parser.nodeToRange(value) && this.props.level !== 0;

      const nodeName = parser.getNodeName(value);

      if (nodeName) {
        valueOutput =
          <span className="tokenName nc" onClick={this._toggleClick}>
            {nodeName}
          </span>
      }

      if (this.state.open) {
        prefix = ' {';
        suffix = '}';
        let elements = this._getProperties(parser, value)
          .map(
            ({value: v, key}) =>
              <Element
                key={key}
                name={key}
                focusPath={focusPath}
                deepOpen={this.state.deepOpen}
                value={v}
                level={level + 1}
                parser={parser}
                settings={settings}
                parent={value}
              />
          );
        content = <ul className="value-body">{elements}</ul>;
        showToggler = elements.length > 0;
      } else {
        let keys = this._getProperties(parser, value)
          .map(({key}) => key);
        valueOutput =
          <span>
            {valueOutput}
            <CompactObjectView
              onClick={this._toggleClick}
              keys={keys}
            />
          </span>;
        showToggler = keys.length > 0;
      }
    } else {
      valueOutput = <span className="s">{stringify(value)}</span>;
      showToggler = false;
    }

    var name = this.props.name ?
      <span
        className="key"
        onClick={
          showToggler ?
            this._toggleClick :
            (typeof value === 'function' ?
              this._execFunction :
              null
            )
        }>
        <span className="name nb">{this.props.name}</span>
        <span className="p">: </span>
      </span> :
      null;

    var classNames = cx({
      entry: true,
      focused: focused,
      toggable: showToggler,
      open: open,
      func: typeof value === 'function',
    });
    return (
      <li
        ref="container"
        className={classNames}
        onMouseOver={enableHighlight ? this._onMouseOver : null}
        onMouseLeave={enableHighlight ? this._onMouseLeave : null}>
        {name}
        <span
          className="value"
          onClick={typeof value === 'function' ? this._execFunction : null}>
            {valueOutput}
        </span>
        {prefix ? <span className="prefix p">{prefix}</span> : null}
        {content}
        {suffix ? <div className="suffix p">{suffix}</div> : null}
        {this.state.error  ?
          <span>
            {' '}
            <i
              title={this.state.error.message}
              className="fa fa-exclamation-triangle"
            />
          </span> :
          null
        }
      </li>
    );
  },
}));

export default Element;
