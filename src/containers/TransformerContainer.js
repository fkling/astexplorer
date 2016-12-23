import {connect} from 'react-redux';
import Transformer from '../Transformer';
import {setTransformState} from '../store/actions';
import * as selectors from '../store/selectors';

function mapStateToProps(state) {
  return {
    transformer: selectors.getTransformer(state),
    // Either the transform example or the transform code from the current
    // revision. This is what we compare against to determine whether something
    // changed and we can save.
    defaultTransformCode: selectors.getInitialTransformCode(state),
    transformCode: selectors.getTransformCode(state),
    mode: selectors.getParser(state).category.id,
    code: selectors.getCode(state),
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
