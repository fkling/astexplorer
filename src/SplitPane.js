"use strict";

var React = require('react/addons');

var cloneWithProps = React.addons.cloneWithProps;

/**
 * Creates a left-right split pane inside its container.
 */
var SplitPane = React.createClass({
  getInitialState: function() {
    return {
      dividerPosition: 50
    };
  },

  _onMouseDown: function() {
    var width = global.innerWidth;
    global.document.body.style.cursor = 'col-resize';
    var moveHandler = function(event) {
      event.preventDefault();
      this.setState({dividerPosition: (event.pageX / width) * 100});
    }.bind(this);
    var upHandler = function() {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
      global.document.body.style.cursor = '';

      if (this.props.onResize) {
        this.props.onResize();
      }
    }.bind(this);

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  },

  render: function() {
    var dividerPos = this.state.dividerPosition;
    var baseStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      boxSizing: 'border-box'
    };
    var styleLeft = {
      ...baseStyle,
      left: 0,
      width: dividerPos + '%',
      paddingRight: 3
    };
    var styleRight = {
      ...baseStyle,
      right: 0,
      width: (100 - dividerPos) + '%',
      paddingLeft: 3
    };

    return (
      <div className={this.props.className}>
        <div style={styleLeft}>
          {this.props.children[0]}
        </div>
        <div
          className="splitpane-divider"
          onMouseDown={this._onMouseDown}
          style={{
            ...baseStyle,
           left: dividerPos + '%',
           width: 5,
           marginLeft: -2.5,
           zIndex: 100
          }}
        />
        <div style={styleRight}>
          {this.props.children[1]}
        </div>
      </div>
    );
  }
});

module.exports = SplitPane;
