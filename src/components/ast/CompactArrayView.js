import React from 'react';

export default class CompactArrayView {
  static propTypes = {
    /**
     * The array of elements to represent.
     */
    array: React.PropTypes.array.isRequired,
    onClick: React.PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.array.length !== this.props.array.length;
  }

  render() {
    var array = this.props.array;
    var count = array.length;

    if (count === 0) {
      return <span className="p">{"[ ]"}</span>;
    }
    else {
      return (
        <span>
          <span className="p">{"["}</span>
          <span className="array placeholder ge" onClick={this.props.onClick}>
            {count + ' element' + (count > 1 ? 's' : '')}
          </span>
          <span className="p">{"]"}</span>
        </span>
      );
    }
  }
}
