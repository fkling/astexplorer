import React from 'react';

export default class ParserButton extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick({currentTarget}) {
    let parserID = currentTarget.getAttribute('data-id');
    this.props.onParserChange(parserID);
  }

  render() {
    const {parser} = this.props;
    return (
      <div className="button menuButton">
        <span>
          <i className='fa fa-lg fa-code fa-fw' />
          {' Tool'}
        </span>
        <ul>
          <li onClick={this.props.showParserSelector}>
            Choose tool...
          </li>
        </ul>
      </div>
    );
  }
}

ParserButton.propTypes = {
  onParserChange: React.PropTypes.func,
  onParserSettingsButtonClick: React.PropTypes.func,
  parser: React.PropTypes.object,
};
