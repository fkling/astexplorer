import {connect} from 'react-redux';
import ASTOutput from '../components/ASTOutput';
import * as selectors from '../store/selectors';

function mapStateToProps(state) {
  return {
    parser: selectors.getParser(state),
    parseResult: selectors.getParseResult(state),
    cursor: selectors.getCursor(state),
  };
}

export default connect(mapStateToProps)(ASTOutput);
