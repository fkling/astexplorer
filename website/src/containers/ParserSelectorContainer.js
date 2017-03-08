import {connect} from 'react-redux';
import ParserSelector from '../components/ParserSelector';
import {loadParser} from '../store/actions';

function mapDispatchToProps(dispatch) {
  return {
    loadParser: id => dispatch(loadParser(id)),
  };
}

export default connect(null, mapDispatchToProps)(ParserSelector);
