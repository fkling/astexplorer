import React from 'react';
import TokenName from './TokenName';

export default class ObjectFormatter {
  render() {
    var object = this.props.object;
    var keys = Object.keys(object);

    if (keys.length === 0) {
      return <span className="p">{"{ }"}</span>;
    }
    else {
      return (
        <span>
          {object.type ?
            <TokenName onClick={this.props.onClick} object={object} /> :
            null
          }
          <span className="p">{" {"}</span>
          <span className="placeholder ge">{keys.join(', ')}</span>
          <span className="p">{"}"}</span>
        </span>
      );
    }
  }
}
