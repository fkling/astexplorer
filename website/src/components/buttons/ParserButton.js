import PropTypes from 'prop-types';
import React from 'react';
import {getParserByID} from '../../parsers';

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
    const parsers = this.props.category.parsers.filter(p => p.showInMenu);
    return (
      <div className="button menuButton">
        <span>
          <i className='fa fa-lg fa-code fa-fw' />
          &nbsp;{this.props.parser.displayName}
        </span>
        <ul>
          {parsers.map(parser => (
            <li key={parser.id} onClick={this._onClick} data-id={parser.id}>
              <button type="button" >
                {parser.displayName}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          title="Parser Settings"
          style={{minWidth: 0}}
          disabled={!this.props.parser.hasSettings()}
          onClick={this.props.onParserSettingsButtonClick}>
          <i className="fa fa-cog fa-fw" />
        </button>
      </div>
    );
  }
}

ParserButton.propTypes = {
  onParserChange: PropTypes.func,
  onParserSettingsButtonClick: PropTypes.func,
  parser: PropTypes.object,
  category: PropTypes.object,
};
