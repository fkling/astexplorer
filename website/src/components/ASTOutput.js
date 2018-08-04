import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import visualizations from './visualization';
import getFocusPath from './getFocusPath';

function parse(parser, code, parserSettings) {
  if (!parser._promise) {
    parser._promise = new Promise(parser.loadParser);
  }
  return parser._promise.then(
    realParser => parser.parse(
      realParser,
      code,
      parserSettings || parser.getDefaultOptions(),
    )
  );
}

function formatTime(time) {
  if (!time) {
    return null;
  }
  if (time < 1000) {
    return `${time}ms`;
  }
  return `${(time / 1000).toFixed(2)}s`;
}

export default class ASTOutput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._changeOutput = this._changeOutput.bind(this);

    this.state = {
      output: 0,
      parseError: null,
      ast: null,
      parseTime: null,
    };
  }

  componentDidMount() {
    this._parse(this.props.parser, this.props.code, this.props.parserSettings);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.parser !== this.props.parser ||
        nextProps.code !== this.props.code ||
        nextProps.parserSettings !== this.props.parserSettings) {
      this._parse(nextProps.parser, nextProps.code, nextProps.parserSettings);
    } else if (nextProps.cursor !== this.props.cursor) {
      this.setState({
        focusPath: (this.state.parseError || nextProps.cursor == null) ?
          [] :
          getFocusPath(this.state.ast, nextProps.cursor, nextProps.parser),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.ast !== this.state.ast ||
      nextState.parseError !== this.state.parseError ||
      nextState.focusPath !== this.state.focusPath ||
      nextState.output !== this.state.output;
  }

  _parse(parser, code, parserSettings) {
    if (!parser || code == null) {
      return;
    }
    const start = Date.now();
    parse(parser, code, parserSettings).then(
      ast => {
        // Did the parser or code change in the meantime?
        if (parser !== this.props.parser && code !== this.props.code) {
          return;
        }
        this.setState({
          parseTime: Date.now() - start,
          ast: ast,
          focusPath: this.props.cursor != null ?
            getFocusPath(ast, this.props.cursor, parser) :
            [],
          parseError: null,
        });
        this.props.onParseError(null);
      },
      parseError => {
        console.error(parseError); // eslint-disable-line no-console
        this.setState({parseError, parseTime: null});
        this.props.onParseError(parseError);
      }
    );
  }

  _changeOutput(event) {
    this.setState({output: event.target.value});
  }

  render() {
    let output;
    if (this.state.parseError) {
      output =
        <div style={{padding: 20}}>
          {this.state.parseError.message}
        </div>;
    } else if (this.state.ast) {
      output = React.createElement(
        visualizations[this.state.output],
        {
          ast: this.state.ast,
          focusPath: this.state.focusPath,
          parser: this.props.parser,
        }
      );
    }

    let buttons = visualizations.map(
      (cls, index) =>
        <button
          key={index}
          value={index}
          onClick={this._changeOutput}
          className={cx({
            active: this.state.output == index,
          })}>
          {cls.name}
        </button>
    );

    return (
      <div className="output highlight">
        <div className="toolbar">
          {buttons}
          <span className="time">
            {formatTime(this.state.parseTime)}
          </span>
        </div>
        {output}
      </div>
    );
  }
}

ASTOutput.propTypes = {
  code: PropTypes.string,
  parser: PropTypes.object.isRequired,
  parserSettings: PropTypes.object,
  cursor: PropTypes.any,
  onParseError: PropTypes.func.isRequired,
};

