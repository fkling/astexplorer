import React from 'react';

export default class CompactObjectView {
  render() {
    let {keys} = this.props;

    if (keys.length === 0) {
      return <span className="p">{"{ }"}</span>;
    } else {
      if (keys.length > 5) {
        keys = keys.slice(0, 5).concat([`... +${keys.length - 5}`]);
      }
      return (
        <span>
          <span className="p">{" {"}</span>
          <span className="placeholder ge">{keys.join(', ')}</span>
          <span className="p">{"}"}</span>
        </span>
      );
    }
  }
}
