import {connect} from 'react-redux';
import {
  save,
  selectCategory,
  openSettingsDialog,
  selectTransformer,
  hideTransformer,
  setWorkbenchState,
} from '../store/actions';
import Toolbar from '../Toolbar';
import {canSave, canFork} from '../store/selectors';
import * as LocalStorage from '../LocalStorage';

function mapStateToProps(state) {
  const {
    parser,
    transform: {transformer, showTransformer},
  } = state;

  return {
    forking: state.forking,
    saving: state.saving,
    canSave: canSave(state),
    canFork: canFork(state),
    category: parser.category,
    parser,
    transformer,
    showTransformer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onParserChange: parser => {
      LocalStorage.setParser(parser);
      dispatch(setWorkbenchState({parser}));
    },
    onCategoryChange: category => {
      LocalStorage.setCategory(category.id);
      dispatch(selectCategory(category));
    },
    onParserSettingsButtonClick: () => dispatch(openSettingsDialog()),
    onTransformChange: transformer => dispatch(
      transformer ? selectTransformer(transformer) : hideTransformer()
    ),
    onSave: () => dispatch(save(false)),
    onFork: () => dispatch(save(true)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

