import {connect} from 'react-redux';
import LoadingIndicator from '../LoadingIndicator';
import {isLoadingSnippet} from '../store/selectors';

function mapStateToProps(state) {
  return {
    visible: isLoadingSnippet(state),
  };
}

export default connect(mapStateToProps)(LoadingIndicator);
