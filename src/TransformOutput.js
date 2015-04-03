/**
 * @jsx React.DOM
 */
"use strict";

var Editor = require('./Editor');
var React = require('react/addons');

var babel = require('babel');
var jscodeshift = require('jscodeshift');

var cx = React.addons.classSet;

var TransformOutput = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    transform: React.PropTypes.string,
    code: React.PropTypes.string,
  },

  transform: function() {
    // This might throw
    var transform = babel.transform(this.props.transform).code;
    var module = {};
    var args = [
      {
        path: 'Live.js',
        source: this.props.code,
      },
      {jscodeshift},
      {}
    ];
    return eval([
      "(function() {",
      transform,
      "})();",
      "module.exports.apply(module.exports, args);"
    ].join("\n"));
  },

  renderTransform: function() {
    try {
      return (
        <Editor
          highlight={false}
          key="output"
          readOnly={true}
          value={this.transform()}
        />
      );
    } catch (e) {
      return (
        <Editor
          highlight={false}
          key="error"
          lineNumbers={false}
          readOnly={true}
          value={e.message}
        />
      );
    }
  },

  render: function() {
    return (
      <div className="output highlight">
        {this.renderTransform()}
      </div>
    );
  }
});

module.exports = TransformOutput;
