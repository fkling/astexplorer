import {connect} from 'react-redux';
import LoadingIndicator from '../LoadingIndicator';

function mapStateToProps(state) {
  return {
    visible: state.loadingSnippet,
  };
}

export default connect(mapStateToProps)(LoadingIndicator);
