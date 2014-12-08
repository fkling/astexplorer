/**
 * @jsx React.DOM
 */
"use strict";

var ArrayElements = require('./ArrayElements');
var ArrayFormatter = require('./ArrayFormatter');
var ObjectFormatter = require('./ObjectFormatter');
var PropertyList = require('./PropertyList');
var PubSub = require('pubsub-js');
var React = require('react/addons');
var TokenName = require('./TokenName');

var cx = React.addons.classSet;

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

var Element = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.any,
    deepOpen: React.PropTypes.bool,
    focusPath: React.PropTypes.array,
    level: React.PropTypes.number,
  },

  getInitialState: function() {
    // Some elements should be open by default
    var open =
      this.props.level === 0 ||
      this.props.deepOpen ||
      this.props.name === 'body';

    return {
      open: open,
      deepOpen: this.props.deepOpen
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    var thisValue = this.props.value;
    var nextValue = nextProps.value;

    var toggleChange = this.state.open !== nextState.open ||
      this.state.deepOpen !== nextState.deepOpen;
    if (toggleChange) {
      return true;
    }

    var possibleFocusChange =
      this.state.open && this.props.focusPath.indexOf(thisValue) > -1 ||
      nextProps.focusPath.indexOf(nextValue) > -1 !==
      this.props.focusPath.indexOf(thisValue) > -1;

    if (possibleFocusChange) {
      return true;
    }

    var noVisualChanges =
      this.props.name === nextProps.name &&
      (thisValue === nextValue || thisValue.type === nextValue.type);

    if (noVisualChanges) {
      return false;
    }

    return this.props.name !== nextProps.name ||
      this.state.open !== nextState.open ||
      this.props.deepOpen !== nextProps.deepOpen ||
      thisValue !== nextValue;
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      open: nextProps.deepOpen || this.state.open,
      deepOpen: nextProps.deepOpen,
    });
  },

  _toggleClick: function(event) {
    this.setState({
      open: event.shiftKey  || !this.state.open,
      deepOpen: event.shiftKey,
    });
  },

  _onMouseOver: function(e) {
    e.stopPropagation();
    PubSub.publish('HIGHLIGHT', this.props.value);
  },

  _onMouseLeave: function() {
    PubSub.publish('CLEAR_HIGHLIGHT', this.props.value);
  },

  _isFocused: function(level, path, value, open) {
    return level !== 0 &&
      path.indexOf(value) > -1 &&
      (!open || path[path.length - 1] === value);
  },

  render: function() {
    var value = this.props.value;
    var value_output = null;
    var content = null;
    var prefix = null;
    var suffix = null;
    var showToggler = false;
    var isType = value && value.type;
    var enableHighlight = isType && value.type !== 'Program';
    var focusPath = this.props.focusPath;
    var open = this.state.open;
    var focused = this._isFocused(this.props.level, focusPath, value, open);

    if (isArray(value)) {
      if (value.length > 0 && open) {
        prefix = "[";
        suffix = "]";
        content =
          <ArrayElements
            focusPath={focusPath}
            array={value}
            deepOpen={this.props.deepOpen}
          />;
      } else {
        value_output = <ArrayFormatter array={value} />;
      }
      showToggler = value.length > 0;
    }
    else if (value && typeof value === "object") {
      if (this.state.open) {
        if (isType) {
          value_output =
            <TokenName
              onClick={this._toggleClick}
              object={value}
            />;
        }
        prefix = ' {';
        suffix = '}';
        content =
          <PropertyList
            focusPath={focusPath}
            object={value}
            deepOpen={this.state.deepOpen}
          />;
      }
      else {
        value_output =
          <ObjectFormatter
            onClick={this._toggleClick}
            object={value}
          />;
      }
      showToggler = Object.keys(value).length > 0;
    }
    else {
      value_output =
        <span className="s">
          {typeof value === 'undefined' ? 'undefined' : JSON.stringify(value)}
      </span>;
      showToggler = false;
    }

    var name = this.props.name ?
      <span
        className="key"
        onClick={showToggler ? this._toggleClick : null}>
        <span className="name nb">{this.props.name}</span>
        <span className="p">: </span>
      </span> :
      null;

    var classNames = cx({
      entry: true,
      focused: focused,
      toggable: showToggler,
      open: open
    });

    return (
      <li
        ref="container"
        className={classNames}
        onMouseOver={enableHighlight ? this._onMouseOver : null}
        onMouseLeave={enableHighlight ? this._onMouseLeave : null}>
        {name}
        <span className="value">{value_output}</span>
        {prefix ? <span className="prefix p">{prefix}</span> : null}
        <ul className="value-body">{content}</ul>
        {suffix ? <div className="suffix p">{suffix}</div> : null}
      </li>
    );
  }
});

module.exports = Element;
