import {connect} from 'react-redux';
import ASTOutput from '../ASTOutput';
import {setParseError} from '../store/actions';

function mapStateToProps(state) {
  return {
    code: state.code,
    parser: state.parser,
    cursor: state.cursor,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onParseError: error => dispatch(setParseError(error)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ASTOutput);
