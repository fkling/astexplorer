var React = require('react/addons');

var ErrorMessage = React.createClass({
  render: function() {
    return <div id="Error">{this.props.message}</div>;
  }
});

module.exports = ErrorMessage;
