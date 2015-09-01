import React from 'react';
import cx from 'classnames';
import * as transformers from './transformers';

export default class TransformButton extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick({target}) {
    let transform;
    if (target.nodeName.toLowerCase() === 'li') {
      transform = target.children[0].value;
    } else {
      transform = target.value;
    }
    this.props.onTransformChange(transform);
  }

  render() {
    return (
      <div
        className="button parserButton">
        <button type="button">
          <i
            className={cx({
              fa: true,
              'fa-lg': true,
              'fa-toggle-off': !this.props.transformPanelIsEnabled,
              'fa-toggle-on': this.props.transformPanelIsEnabled,
              'fa-fw': true,
            })}
          />
          &nbsp;Transform
        </button>
        <ul>
          {Object.keys(transformers).map(name => (
            <li key={name} onClick={this._onClick}>
              <button value={name} type="button" >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
