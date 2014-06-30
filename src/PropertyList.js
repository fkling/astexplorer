/**
 * @jsx React.DOM
 */

var PropertyList = React.createClass({
  getDefaultProps: function() {
    return {
      object: {},
    };
  },

  render: function() {
    var Element = require('./Element');
    /* jshint ignore:start */
    var properties = Object.keys(this.props.object).map(function(key) {
      if (key === 'loc') return;
      return <Element
        name={key}
        value={this.props.object[key]}
      />;
    }, this);
    return <div>{properties}</div>;
    /* jshint ignore:end */
  }
});

module.exports = PropertyList;
