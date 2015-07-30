import React from 'react';

export default class ErrorMessage {
  render() {
    return <div id="Error">{this.props.message}</div>;
  }
}
