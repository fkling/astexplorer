import React from 'react';
import cx from 'classnames';
import visualizations from './components/visualization';
import getFocusPath from './getFocusPath';
import PubSub from 'pubsub-js';

const {PropTypes} = React;

function parse(parser, code) {
  if (!parser._promise) {
    parser._promise = new Promise(parser.loadParser);
  }
  return parser._promise.then(
    realParser => parser.parse(realParser, code)
  );
}

export default class ASTOutput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this._changeOutput = this._changeOutput.bind(this);

    this.state = {
      output: 0,
      parseError: null,
      ast: null,
    };
  }

  componentDidMount() {
    this._parse(this.props.parser, this.props.code);
    this._subscription = PubSub.subscribe('FORCE_PARSE', () => {
      this._parse(this.props.parser, this.props.code);
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe('FORCE_PARSE');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parser !== this.props.parser ||
        nextProps.code !== this.props.code) {
      this._parse(nextProps.parser, nextProps.code);
    } else if (nextProps.cursor !== this.props.cursor) {
      this.setState({
        focusPath: nextProps.cursor != null ?
          getFocusPath(this.state.ast, nextProps.cursor, nextProps.parser) :
          [],
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.ast !== this.state.ast ||
      nextState.parseError !== this.state.parseError ||
      nextState.focusPath !== this.state.focusPath ||
      nextState.output !== this.state.output;
  }

  _parse(parser, code) {
    if (!parser || code == null) {
      return;
    }
    parse(parser, code).then(
      ast => {
        // Did the parser or code change in the meantime?
        if (parser !== this.props.parser && code !== this.props.code) {
          return;
        }
        this.setState({
          ast: ast,
          focusPath: this.props.cursor != null ?
            getFocusPath(ast, this.props.cursor, parser) :
            [],
          parseError: null,
        });
        this.props.onParseError(null);
      },
      parseError => {
        this.setState({parseError});
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
        <div className="toolbar">{buttons}</div>
        {output}
      </div>
    );
  }
}

ASTOutput.propTypes = {
  code: React.PropTypes.string,
  parser: PropTypes.object.isRequired,
  cursor: PropTypes.any,
  onParseError: React.PropTypes.func.isRequired,
};

