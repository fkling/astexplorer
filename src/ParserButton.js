import React from 'react';
import cx from 'classnames';
import * as parsers from './parsers';

export default class ParserButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showParserList: false};
    this._onClick = this._onClick.bind(this);
  }

  _onClick({target}) {
    let parser;
    if (target.nodeName.toLowerCase() === 'li') {
      parser = target.children[0].value;
    } else {
      parser = target.value;
    }
    this.props.onParserChange(parser);
  }

  render() {
    return (
      <div
        className="button parserButton">
        <button
          type="button">
          <i
            className={cx({
              fa: true,
              'fa-lg': true,
              'fa-code': true,
              'fa-fw': true,
            })}
          />
          &nbsp;{this.props.parserName}
        </button>
        <ul>
          {Object.keys(parsers).filter(p => p !== 'defaultParser').map(name => (
            <li key={name} onClick={this._onClick}>
              <button value={name} type="button" >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
