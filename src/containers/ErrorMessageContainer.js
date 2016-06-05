import {connect} from 'react-redux';
import ErrorMessage from '../ErrorMessage';
import {setError} from '../store/actions';

function mapStateToProps(state) {
  return {
    error: state.error,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    onWantToClose: () => dispatch(setError(null)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
