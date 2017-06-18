import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import {getCategoryByID, categories} from '../../parsers';

const categoryIcon = {
  javascript: 'fa-jsfiddle',
  css: 'fa-css3',
  graphql: 'icon-GraphQL_Logo',
  handlebars: 'icon-handlebars',
  htmlmixed: 'fa-html5',
  icu: 'icon-icu',
  sql: 'fa-database',
  webidl: 'fa-th-list',
  yaml: 'fa-yc',
};

export default class CategoryButton extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick({currentTarget}) {
    let categoryID = currentTarget.getAttribute('data-id');
    this.props.onCategoryChange(getCategoryByID(categoryID));
  }

  render() {
    return (
      <div className="button menuButton categoryButton">
        <span>
          <i
            className={cx(categoryIcon[this.props.category.id] || 'fa-file-o', {
              fa: true,
              'fa-lg': true,
              'fa-fw': true,
            })}
          />
          &nbsp;{this.props.category.displayName}
        </span>
        <ul>
          {categories.map(category => (
            <li key={category.id} onClick={this._onClick} data-id={category.id}>
              <button type="button">
                <i
                  className={cx(categoryIcon[category.id] || 'fa-file-o', {
                    fa: true,
                    'fa-fw': true,
                  })}
                />
                &nbsp;{category.displayName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

CategoryButton.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};
