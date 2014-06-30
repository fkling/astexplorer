/**
 * @jsx React.DOM
 */
"use strict";

var TokenName = require('./TokenName');

var ObjectFormatter = React.createClass({
  render: function() {
    var object = this.props.object;
    var keys = Object.keys(object).filter(function(k) { return k !== 'loc';});

    /* jshint ignore:start */
    if (keys.length === 0) {
      return <span className="p">{"{ }"}</span>;
    }
    else {
      return (
        <span>
          {object.type ? <TokenName object={object} /> : null}
          <span className="p">{" {"}</span>
          <span className="placeholder ge">{keys.join(', ')}</span>
          <span className="p">{"}"}</span>
        </span>
      );
    }
    /* jshint ignore:end */
  }
});

module.exports = ObjectFormatter;
