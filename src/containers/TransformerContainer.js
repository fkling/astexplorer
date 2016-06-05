import {connect} from 'react-redux';
import Transformer from '../Transformer';
import {setTransformState} from '../store/actions';
import {defaultTransformCode} from '../store/selectors';

function mapStateToProps(state) {
  return {
    transformer: state.transform.transformer,
    // Either the transform example or the transform code from the current
    // revision. This is what we compare against to determine whether something
    // changed and we can save.
    defaultTransformCode: defaultTransformCode(state),
    transformCode: state.transform.code,
    mode: state.parser.category.id,
    code: state.code,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onContentChange: ({value, cursor}) => {
      dispatch(setTransformState({code: value, cursor}));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Transformer);
