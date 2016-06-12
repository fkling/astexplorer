import React from 'react';
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
      <div className="button">
        <div
          className="menuButton"
          style={{display: 'inline-block'}}>
          <button
            type="button">
            <i className='fa fa-lg fa-code fa-fw' />
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
        <button
          type="button"
          title="Parser Settings"
          style={{minWidth: 0}}
          disabled={!this.props.parser.renderSettings}
          onClick={this.props.onParserSettingsButtonClick}>
          <i className="fa fa-cog fa-fw" />
        </button>
      </div>
    );
  }
}

ParserButton.propTypes = {
  onParserChange: React.PropTypes.func,
  onParserSettingsButtonClick: React.PropTypes.func,
  parser: React.PropTypes.object,
  category: React.PropTypes.object,
};
