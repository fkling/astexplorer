import React from 'react';
import cx from 'classnames';
import {getParserByID} from './parsers';

export default class ParserButton extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick({currentTarget}) {
    let parserID = currentTarget.getAttribute('data-id');
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
          {this.props.category.parsers.map(parser => (
            <li key={parser.id} onClick={this._onClick} data-id={parser.id}>
              <button type="button" >
                {parser.displayName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
