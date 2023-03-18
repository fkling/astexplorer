import PropTypes from 'prop-types';
import React from 'react';
import cx from '../../utils/classnames.js';
import {getTransformerByID} from '../../parsers';

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
      this.props.onTransformChange(null);
    }
  }

  render() {
    const transformers = this.props.category.transformers.filter(
      t => t.showInMenu !== false || t == this.props.transformer,
    );
    return (
      <div className={cx({
        button: true,
        menuButton: true,
        disabled: !this.props.category.transformers.length,
      })}>
        <button
          type="button"
          onClick={this._onToggle}
          disabled={!this.props.category.transformers.length}>
          <i
            className={cx({
              fa: true,
              'fa-lg': true,
              'fa-toggle-off': !this.props.showTransformer,
              'fa-toggle-on': this.props.showTransformer,
              'fa-fw': true,
            })}
          />
          &nbsp;Transform
        </button>
        {!!transformers.length && <ul>
          {transformers.map(transformer => (
            <li
              key={transformer.id}
              className={cx({
                selected: this.props.showTransformer &&
                  this.props.transformer === transformer,
              })}
              onClick={this._onClick}>
              <button value={transformer.id} type="button" >
                {transformer.displayName}
              </button>
            </li>
          ))}
        </ul>}
      </div>
    );
  }
}

TransformButton.propTypes = {
  category: PropTypes.object,
  transformer: PropTypes.object,
  showTransformer: PropTypes.bool,
  onTransformChange: PropTypes.func,
};
