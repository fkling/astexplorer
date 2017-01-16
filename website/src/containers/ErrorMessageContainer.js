import {connect} from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';
import {setError} from '../store/actions';
import {getError} from '../store/selectors';

function mapStateToProps(state) {
  return {
    error: getError(state),
  };
}


function mapDispatchToProps(dispatch) {
  return {
    onWantToClose: () => dispatch(setError(null)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
