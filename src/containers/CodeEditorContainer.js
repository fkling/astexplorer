import {connect} from 'react-redux';
import {setWorkbenchState} from '../store/actions';
import Editor from '../Editor';
import {defaultValue} from '../store/selectors';

function mapStateToProps(state) {
  return {
    defaultValue: defaultValue(state),
    mode: state.parser.category.id,
    error: state.parseError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onContentChange: ({value, cursor}) => {
      dispatch(setWorkbenchState({code: value, cursor}));
    },
    onActivity: cursor => {
      dispatch(setWorkbenchState({cursor}));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
