var React = require('react/addons');

var ArrayElements = React.createClass({
  getDefaultProps: function() {
    return {
      deepOpen: false,
      array: [],
    };
  },

  render: function() {
    var Element = require('./Element');
    var focusPath = this.props.focusPath;
    var level = this.props.level;

    var elements = this.props.array.map(
      (v, i) =>
        <Element
          key={i}
          focusPath={focusPath}
          deepOpen={this.props.deepOpen}
          value={v}
          level={level}
        />
    );
    return <ul className="value-body">{elements}</ul>;
  }
});

module.exports = ArrayElements;
