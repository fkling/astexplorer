import PropTypes from 'prop-types';
import React from 'react';
import ForkButton from './ForkButton';
import NewButton from './NewButton';
import SaveButton from './SaveButton';
import ShareButton from './ShareButton';
import cx from '../../utils/classnames.js';

export default function SnippetButton(props) {
  const canForkAndNotSave = props.canFork && !props.canSave;
  const savingOrForking = props.saving || props.forking;

  return (
    <div className="button menuButton">
      <span>
        <i className='fa fa-lg fa-file-code-o fa-fw' />
        &nbsp;Snippet
      </span>
      <ul>
        <li><NewButton {...props} /></li>
        <li><SaveButton {...props} /></li>
        <li><ForkButton {...props} /></li>
        <li><ShareButton {...props}/></li>
      </ul>
      <button
        type="button"
        title={canForkAndNotSave ? 'Fork' : 'Save'}
        style={{minWidth: 0}}
        disabled={
          savingOrForking || !(props.canSave || props.canFork)
        }
        onClick={canForkAndNotSave ? props.onFork : props.onSave}>
        <i
          className={cx({
            fa: true,
            'fa-spinner': savingOrForking,
            'fa-pulse': savingOrForking,
            'fa-floppy-o': !savingOrForking && !canForkAndNotSave,
            'fa-code-fork': !savingOrForking && canForkAndNotSave,
            'fa-fw': true,
          })}
        />
      </button>
    </div>
  );
}

SnippetButton.propTypes = {
  canFork: PropTypes.bool,
  canSave: PropTypes.bool,
  forking: PropTypes.bool,
  onFork: PropTypes.func,
  onSave: PropTypes.func,
  saving: PropTypes.bool,
};
