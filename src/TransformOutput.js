/*eslint no-new-func: 0*/
import Editor from './Editor';
import React from 'react';
import halts, {loopProtect} from 'halting-problem';

function transform(transformer, transformCode, code) {
  if (!transformer._promise) {
    transformer._promise = new Promise(transformer.loadTransformer);
  }
  // Use Promise.resolve(null) to return all errors as rejected promises
  return transformer._promise.then(realTransformer => {
    // assert that there are no obvious infinite loops
    halts(transformCode);
    // guard against non-obvious loops with a timeout of 5 seconds
    var start = Date.now();
    transformCode = loopProtect(
      transformCode,
      [
        // this function gets called in all possible loops
        // it gets passed the line number as its only argument
        '(function (line) {',
        'if (Date.now() > ' + (start + 5000) + ') {',
        '  throw new Error("Infinite loop detected on line " + line);',
        '}',
        '})',
      ].join('')
    );
    return transformer.transform(
      realTransformer,
      transformCode,
      code,
    );
  });
}

export default class TransformOutput extends React.Component {
  static propTypes = {
    transformer: React.PropTypes.object,
    transformCode: React.PropTypes.string,
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
    transform(
      this.props.transformer,
      this.props.transformCode,
      this.props.code,
    ).then(
      result => this.setState({result: result}),
      error => this.setState({error: error})
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.transformCode !== nextProps.transformCode ||
        this.props.code !== nextProps.code) {
      if (console.clear) {
        console.clear();
      }
      transform(
        nextProps.transformer,
        nextProps.transformCode,
        nextProps.code,
      ).then(
        result => {
          let error = null;
          if (typeof result !== 'string') {
            result = '';
            error = new Error('Transform did not return a string.');
          }
          this.setState({result, error});
        },
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
            mode={this.props.mode}
            key="output"
            readOnly={true}
            defaultValue={this.state.result}
          />
        }
      </div>
    );
  }
}
