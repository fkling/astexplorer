/**
 * @jsx React.DOM
 */
"use strict";

var ObjectFormatter = React.createClass({
  render: function() {
    var object = this.props.object;
    var keys = Object.keys(object);

    /* jshint ignore:start */
    if (keys.length === 0) {
      return <span className="p">{"{ }"}</span>;
    }
    else {
      return (
        <span>
          {object.type ? <span className="nc">{object.type} </span> : null}
          <span className="p">{"{"}</span>
          <span className="placeholder ge">{keys.join(', ')}</span>
          <span className="p">{"}"}</span>
        </span>
      );
    }
    /* jshint ignore:end */
  }
});

module.exports = ObjectFormatter;
