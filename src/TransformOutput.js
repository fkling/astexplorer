var Editor = require('./Editor');
var React = require('react/addons');

var TransformOutput = React.createClass({
  propTypes: {
    transform: React.PropTypes.string,
    code: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      result: '',
      error: null,
    };
  },

  componentDidMount() {
    this.transform(this.props).then(
      result => this.setState({result: result}),
      error => this.setState({error: error})
    );
  },

  componentWillReceiveProps: function(nextProps) {
    if (this.props.transform !== nextProps.transform ||
        this.props.code !== nextProps.code) {
      this.transform(nextProps).then(
        result => this.setState({result: result, error: null}),
        error => this.setState({error: error})
      );
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state.result !== nextState.result ||
      this.state.error !== nextState.error;
  },

  transform: function(props) {
    return new Promise((resolve, reject) => {
      loadjs(['babel-core', 'jscodeshift'], (babel, jscodeshift) => {
        try {
          // This might throw
          var transform = babel.transform(props.transform).code;
          var module = {};
          var args = [
            {
              path: 'Live.js',
              source: props.code,
            },
            {jscodeshift},
            {},
          ];
          resolve(eval([
            '(function() {',
            transform,
            '})();',
            'module.exports.apply(module.exports, args);',
          ].join('\n')));
        } catch(ex) {
          reject(ex);
        }
      });
    });
  },

  render: function() {
    return (
      <div className="output highlight">
        {this.state.error ?
          <Editor
            highlight={false}
            key="error"
            lineNumbers={false}
            readOnly={true}
            value={this.state.error.message}
          /> :
          <Editor
            highlight={false}
            key="output"
            readOnly={true}
            value={this.state.result}
          />
        }
      </div>
    );
  },
});

module.exports = TransformOutput;
