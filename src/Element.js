/**
 * @jsx React.DOM
 */
"use strict";

var ArrayElements = require('./ArrayElements');
var PropertyList = require('./PropertyList');
var ArrayFormatter = require('./ArrayFormatter');
var ObjectFormatter = require('./ObjectFormatter');

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

var Element = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    value: React.PropTypes.any
  },

  getInitialState: function() {
    return {
      open: false
    };
  },

  _toggleClick: function() {
    this.setState({open: !this.state.open});
  },

  render: function() {
    /* jshint ignore:start */
    var value = this.props.value;
    var value_output = null;
    var content = null;
    var prefix = null;
    var suffix = null;
    var toggler = null;
    var showToggler = true;
    var isType = this.props.name === 'type';

    if (isArray(value)) {
      content = <ArrayElements array={value} />;
      if (value.length > 0 && this.state.open) {
        prefix = "[";
        suffix = "]";
      } else {
        value_output = <ArrayFormatter array={value} />
        showToggler = value.length > 0;
      }
    }
    else if (value && typeof value === "object") {
      var valueIsType = !!value.type;
      content = <PropertyList object={value} />;
      if (this.state.open) {
        if (value.type) {
          value_output = <span className="nc">{value.type} </span>;
        }
        prefix = '{';
        suffix = '}';
      }
      else {
        value_output = <ObjectFormatter object={value} />;
      }
    }
    else {
      value_output = <span className="l">{JSON.stringify(value)}</span>;
      showToggler = false;
    }
    if (showToggler) {
    toggler =
      <a href="#"
        className={"toggler" + (this.state.open ? " open" : '')}
        onClick={this._toggleClick}>
        {this.state.open ? '-' : '+'}
      </a>;
    }

    var name = this.props.name ?
      <span className="k">{this.props.name}<span className="p">: </span></span> :
      null;

    return (
      <div className="entry" onMousover={this.onMouseover}>
        <div>
          {toggler}
          <span className="name k">{name}</span>
          <span className="value">{value_output}</span>
          {prefix ? <span className="prefix p">{prefix}</span> : null}
        </div>
        <div className="value-body" style={{display: this.state.open ? 'block' : 'none'}}>{content}</div>
        {suffix ? <div className="suffix p">{suffix}</div> : null}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = Element;
