import {connect} from 'react-redux';
import ASTOutput from '../ASTOutput';
import {setParseError} from '../store/actions';
import * as selectors from '../store/selectors';

function mapStateToProps(state) {
  return {
    code: selectors.getCode(state),
    parser: selectors.getParser(state),
    parserSettings: selectors.getParserSettings(state),
    cursor: selectors.getCursor(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onParseError: error => dispatch(setParseError(error)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ASTOutput);
