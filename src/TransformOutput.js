/*eslint no-new-func: 0*/
import Editor from './Editor';
import React from 'react';

function module(code) {
  var m = {};
  var f = new Function('module', `(function() {${code}}())`);
  f(m);
  return m.exports;
}

export default class TransformOutput extends React.Component {
  static propTypes = {
    transform: React.PropTypes.string,
    code: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      result: '',
      error: null,
    };
  }

  componentDidMount() {
    this.transform(this.props).then(
      result => this.setState({result: result}),
      error => this.setState({error: error})
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.transform !== nextProps.transform ||
        this.props.code !== nextProps.code) {
      if (console.clear) {
        console.clear();
      }
      this.transform(nextProps).then(
        result => this.setState({result, error: null}),
        error => {
          console.error(error);
          this.setState({error});
        }
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.result !== nextState.result ||
      this.state.error !== nextState.error;
  }

  transform(props) {
    return new Promise((resolve, reject) => {
      loadjs(['babel-core', 'jscodeshift'], (babel, jscodeshift) => {
        try {
          // This might throw
          var transform = module(
              babel.transform(props.transform).code
          );
          resolve(transform(
            {
              path: 'Live.js',
              source: props.code,
            },
            {jscodeshift},
            {}
          ));
        } catch(ex) {
          reject(ex);
        }
      });
    });
  }

  render() {
    return (
      <div className="output highlight">
        {this.state.error ?
          <Editor
            highlight={false}
            key="error"
            lineNumbers={false}
            readOnly={true}
            defaultValue={this.state.error.message}
          /> :
          <Editor
            highlight={false}
            key="output"
            readOnly={true}
            defaultValue={this.state.result}
          />
        }
      </div>
    );
  }
}
