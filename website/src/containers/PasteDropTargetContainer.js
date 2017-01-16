import {connect} from 'react-redux';
import PasteDropTarget from '../components/PasteDropTarget';
import {setError, dropText} from '../store/actions';

function mapDispatchToProps(dispatch) {
  return {
    onText: (type, event, code, categoryId) => {
      dispatch(dropText(code, categoryId));
    },
    onError: error => dispatch(setError(error)),
  };
}

export default connect(null, mapDispatchToProps)(PasteDropTarget);
