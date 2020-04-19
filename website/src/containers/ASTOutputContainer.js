import {connect} from 'react-redux';
import ASTOutput from '../components/ASTOutput';
import * as selectors from '../store/selectors';

function mapStateToProps(state) {
  return {
    parseResult: selectors.getParseResult(state),
    position: selectors.getCursor(state),
  };
}

export default connect(mapStateToProps)(ASTOutput);
