import {connect} from 'react-redux';
import {
  save,
  selectCategory,
  openSettingsDialog,
  selectTransformer,
  hideTransformer,
  setParser,
} from '../store/actions';
import Toolbar from '../components/Toolbar';
import * as selectors from '../store/selectors';
import {logEvent} from '../utils/logger';

function mapStateToProps(state) {
  const parser = selectors.getParser(state);

  return {
    forking: selectors.isForking(state),
    saving: selectors.isSaving(state),
    canSave: selectors.canSave(state),
    canFork: selectors.canFork(state),
    category: parser.category,
    parser,
    transformer: selectors.getTransformer(state),
    showTransformer: selectors.showTransformer(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onParserChange: parser => {
      dispatch(setParser(parser));
      logEvent('parser', 'select', parser.id);
    },
    onCategoryChange: category => {
      dispatch(selectCategory(category));
      logEvent('category', 'select', category.id);
    },
    onParserSettingsButtonClick: () => {
      dispatch(openSettingsDialog());
      logEvent('parser', 'open_settings');
    },
    onTransformChange: transformer => {
      dispatch(transformer ? selectTransformer(transformer) : hideTransformer());
      if (transformer) {
        logEvent('tool', 'select', transformer.id);
      }
    },
    onSave: () => dispatch(save(false)),
    onFork: () => dispatch(save(true)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

