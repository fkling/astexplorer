/**
 * @jsx React.DOM
 */

var React = require('react/addons');

var PropertyList = React.createClass({
  getDefaultProps: function() {
    return {
      object: {},
      deepOpen: false
    };
  },

  render: function() {
    var Element = require('./Element');
    var focusPath = this.props.focusPath;
    var level = this.props.level;

    var properties = Object.keys(this.props.object).map(key => {
      if (key === 'loc') return;
      var v = this.props.object[key];
      return (
        <Element
          key={key}
          name={key}
          focusPath={focusPath}
          deepOpen={this.props.deepOpen}
          value={v}
          level={level}
        />
      );
    });
    return <div>{properties}</div>;
  }
});

module.exports = PropertyList;
