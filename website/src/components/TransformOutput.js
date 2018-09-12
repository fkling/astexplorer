/*eslint no-new-func: 0*/
import Editor from './Editor';
import JSONEditor from './JSONEditor';
import PropTypes from 'prop-types';
import React from 'react';
import {SourceMapConsumer} from 'source-map/lib/source-map-consumer';

import stringify from 'json-stringify-safe';

function transform(transformer, transformCode, code) {
  if (!transformer._promise) {
    transformer._promise = new Promise(transformer.loadTransformer);
  }
  // Use Promise.resolve(null) to return all errors as rejected promises
  return transformer._promise.then((realTransformer) => {
    let result = transformer.transform(
      realTransformer,
      transformCode,
      code
    );
    return Promise.resolve(result).then(result => {
      let map = null;
      if (typeof result !== 'string') {
        if (result.map) {
          map = new SourceMapConsumer(result.map);
        }
        result = result.code;
      }
      return { result, map };
    });
  });
}

export default class TransformOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      map: null,
      error: null,
    };
    this._posFromIndex = this._posFromIndex.bind(this);
  }

  componentDidMount() {
    transform(
      this.props.transformer,
      this.props.transformCode,
      this.props.code
    ).then(
      ({ result, map }) => this.setState({ result, map }),
      error => this.setState({ error })
    );
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.transformCode !== nextProps.transformCode ||
        this.props.code !== nextProps.code ||
        this.props.transformer !== nextProps.transformer) {
      if (console.clear) { // eslint-disable-line no-console
        console.clear(); // eslint-disable-line no-console
      }
      transform(
        nextProps.transformer,
        nextProps.transformCode,
        nextProps.code
      ).then(
        ({ result, map }) => ({ result, map, error: null }),
        error => {
          console.error(error); // eslint-disable-line no-console
          return { error };
        }
      ).then(state => this.setState(state));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.result !== nextState.result ||
      this.state.error !== nextState.error;
  }

  _posFromIndex(index) {
    const {map} = this.state;
    if (!map) {
      return;
    }
    const src = map.sourcesContent[0];
    if (index === 0) {
      return { line: 0, ch: 0 };
    }
    let lineStart = src.lastIndexOf('\n', index - 1);
    let column = index - lineStart - 1;
    let line = 1;
    while (lineStart > 0) {
        lineStart = src.lastIndexOf('\n', lineStart - 1);
          line++;
    }
    if (lineStart === 0) {
          line++;
    }
    ({ line, column } = map.generatedPositionFor({
      line,
      column,
      source: map.sources[0],
    }));
    if (line === null || column === null) {
      return;
    }
    return { line: line - 1, ch: column };
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
            value={this.state.error.message}
          /> : (
            typeof this.state.result === 'string' ?
            <Editor
              posFromIndex={this._posFromIndex}
              mode={this.props.mode}
              key="output"
              readOnly={true}
              value={this.state.result}
            /> :
            <JSONEditor
              className="container no-toolbar"
              value={stringify(this.state.result, null, 2)}
            />
          )
        }
      </div>
    );
  }
}

TransformOutput.propTypes = {
  transformer: PropTypes.object,
  transformCode: PropTypes.string,
  mode: PropTypes.string,
  code: PropTypes.string,
};
