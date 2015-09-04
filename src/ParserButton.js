import React from 'react';
import cx from 'classnames';
import {getParserByID, parsers} from './parsers';

export default class ParserButton extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick({target}) {
    let parserID;
    if (target.nodeName.toLowerCase() === 'li') {
      parserID = target.children[0].value;
    } else {
      parserID = target.value;
    }
    this.props.onParserChange(getParserByID(parserID));
  }

  render() {
    return (
      <div
        className="button menuButton">
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
          &nbsp;{this.props.parser.displayName}
        </button>
        <ul>
          {parsers.map(parser => (
            <li key={parser.id} onClick={this._onClick}>
              <button value={parser.id} type="button" >
                {parser.displayName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
