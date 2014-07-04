/**
 * @jsx React.DOM
 */
"use strict";

var React = require('react/addons');

var ArrayFormatter = React.createClass({
  render: function() {
    var array = this.props.array;
    var count = array.length;

    /* jshint ignore:start */
    if (count === 0) {
      return <span className="p">{"[ ]"}</span>;
    }
    else {
      return (
        <span>
          <span className="p">{"["}</span>
          <span className="placeholder ge">
            {count + ' element' + (count > 1 ? 's' : '')}
          </span>
          <span className="p">{"]"}</span>
        </span>
      );
    }
    /* jshint ignore:end */
  }
});

module.exports = ArrayFormatter;
