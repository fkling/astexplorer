import React from 'react';

export default class CompactArrayView extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.array.length !== this.props.array.length;
  }

  render() {
    let {array} = this.props;
    let count = array.length;

    if (count === 0) {
      return <span className="p">{"[ ]"}</span>;
    }
    else {
      return (
        <span>
          <span className="p">{"["}</span>
          <span className="compact placeholder ge" onClick={this.props.onClick}>
            {count + ' element' + (count > 1 ? 's' : '')}
          </span>
          <span className="p">{"]"}</span>
        </span>
      );
    }
  }
}

CompactArrayView.propTypes = {
  /**
   * The array of elements to represent.
   */
  array: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.shape({ length: React.PropTypes.number }),
  ]).isRequired,
  onClick: React.PropTypes.func,
};
