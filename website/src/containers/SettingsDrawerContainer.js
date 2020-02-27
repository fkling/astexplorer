import { connect } from 'react-redux';
import { expandSettingsDrawer, collapseSettingsDrawer } from '../store/actions';
import { showSettingsDrawer } from '../store/selectors';
import SettingsDrawer from '../components/SettingsDrawer';

function mapStateToProps(state) {
  return {
    isOpen: showSettingsDrawer(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onWantToExpand: () => dispatch(expandSettingsDrawer()),
    onWantToCollapse: () => dispatch(collapseSettingsDrawer()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsDrawer);
