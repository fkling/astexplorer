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
    var focusPath = this.props.focusPath;
    var level = this.props.level + 1;
    var focusElement = focusPath[level];
    var lastFocusElement = focusPath[focusPath.length - 1];

    /* jshint ignore:start */
    var properties = Object.keys(this.props.object).map(function(key) {
      if (key === 'loc') return;
      var v = this.props.object[key];
      return <Element
        name={key}
        open={v === focusElement}
        focusPath={focusPath}
        focused={v === lastFocusElement}
        value={v}
        level={level}
      />;
    }, this);
    return <div>{properties}</div>;
    /* jshint ignore:end */
  }
});

module.exports = PropertyList;
