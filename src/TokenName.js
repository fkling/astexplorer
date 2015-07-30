import React from 'react';

export default class TokenName {
  render() {
    return (
      <span className="tokenName nc" onClick={this.props.onClick}>
        {this.props.object.type}
      </span>
    );
  }
}
