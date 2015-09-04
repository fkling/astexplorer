import React from 'react';
import cx from 'classnames';
import {getTransformerByID, transformers} from './transformers';

export default class TransformButton extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
    this._onToggle = this._onToggle.bind(this);
  }

  _onClick({target}) {
    let transformID;
    if (target.nodeName.toLowerCase() === 'li') {
      transformID = target.children[0].value;
    } else {
      transformID = target.value;
    }
    this.props.onTransformChange(getTransformerByID(transformID));
  }

  _onToggle() {
    if (this.props.transformer) {
      this.props.onTransformChange(this.props.transformer);
    }
  }

  render() {
    return (
      <div
        className="button menuButton">
        <button type="button" onClick={this._onToggle}>
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
          {transformers.map(transformer => (
            <li
              key={transformer.id}
              className={cx({
                selected: this.props.transformPanelIsEnabled &&
                  this.props.transformer === transformer,
              })}
              onClick={this._onClick}>
              <button value={transformer.id} type="button" >
                {transformer.displayName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
