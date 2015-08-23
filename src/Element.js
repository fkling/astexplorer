import ArrayElements from './ArrayElements';
import ArrayFormatter from './ArrayFormatter';
import ObjectFormatter from './ObjectFormatter';
import PropertyList from './PropertyList';
import PubSub from 'pubsub-js';
import React from 'react';
import TokenName from './TokenName';

import cx from 'classnames';

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

export default React.createClass({
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
      this.props.name === 'program' ||
      this.props.name === 'body' ||
      this.props.name === 'elements' || // array literals
      this.props.name === 'declarations'; // variable declarations

    return {
      open: open,
      deepOpen: this.props.deepOpen,
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    // There are two reasons why an AST could be rerendered
    //
    // 1. The node was clicked and it has to either expand or collapse
    // 2. The code was edited and it lies "in the path" of that edit.
    var thisValue = this.props.value;
    var nextValue = nextProps.value;
    var thisName = this.props.name;
    var nextName = nextProps.name;

    // Always rerender program
    if (nextValue && nextValue.type === 'Program') {
      return true;
    }
    // In both cases there is no need to rerender the node if it is a leaf,
    // i.e. a primitive value, and has the same value and name
    if (thisValue == null || typeof thisValue !== 'object') {
      return thisValue !== nextValue || thisName !== nextName;
    }

    // Always rerender if open
    if (this.state.open) {
      return true;
    }

    // 1. Node was clicked
    // Either the node itself was clicked or one of its ancestors with shift
    // We always updated when deepOpen is in the next state, since we don't know
    // whether
    var toggleChange = this.state.open !== nextState.open || nextState.deepOpen;
    if (toggleChange) {
      return true;
    }

    // 2. Code was edited. We have to rerender a node if the cursor was or
    // is "in" it.
    if (nextProps.focusPath.indexOf(nextValue) > -1) {
      return true;
    }

    // Possible change of focus
    if (nextProps.focusPath.indexOf(nextValue) > -1 !==
      this.props.focusPath.indexOf(thisValue) > -1) {
      return true;
    }

    // The above two tests don't always capture new nodes, because the cursor
    // is just after the new node, i.e. the new node is not in the focus path
    if (thisName !== nextName ||
        Boolean(thisValue) !== Boolean(nextValue) ||
        (thisValue && thisValue.type !== nextValue.type) ||
        (thisValue && thisValue.length !== nextValue.length) ||
        (thisValue && Object.keys(thisValue).length !==
           Object.keys(nextValue).length)) {
      return true;
    }

    return false;
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      open: nextProps.deepOpen || this.state.open,
      deepOpen: nextProps.deepOpen,
    });
  },

  _toggleClick: function(event) {
    this.setState({
      open: event.shiftKey || !this.state.open,
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
    var valueOutput = null;
    var content = null;
    var prefix = null;
    var suffix = null;
    var showToggler = false;
    var isType = value && value.type;
    var enableHighlight = isType && value.type !== 'Program';
    var focusPath = this.props.focusPath;
    var open = this.state.open;
    var focused = this._isFocused(this.props.level, focusPath, value, open);

    if (Array.isArray(value)) {
      if (value.length > 0 && open) {
        prefix = '[';
        suffix = ']';
        content =
          <ArrayElements
            focusPath={focusPath}
            array={value}
            deepOpen={this.state.deepOpen}
          />;
      } else {
        valueOutput =
          <ArrayFormatter
            array={value}
            onClick={this._toggleClick}
          />;
      }
      showToggler = value.length > 0;
    }
    else if (value && typeof value === 'object') {
      if (this.state.open) {
        if (isType) {
          valueOutput =
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
        valueOutput =
          <ObjectFormatter
            onClick={this._toggleClick}
            object={value}
          />;
      }
      showToggler = Object.keys(value).length > 0;
    }
    else {
      valueOutput =
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
      open: open,
    });

    return (
      <li
        ref="container"
        className={classNames}
        onMouseOver={enableHighlight ? this._onMouseOver : null}
        onMouseLeave={enableHighlight ? this._onMouseLeave : null}>
        {name}
        <span className="value">{valueOutput}</span>
        {prefix ? <span className="prefix p">{prefix}</span> : null}
        {content}
        {suffix ? <div className="suffix p">{suffix}</div> : null}
      </li>
    );
  },
});
