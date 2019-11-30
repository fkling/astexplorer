import { connect } from 'react-redux';
import { closeSettingsDrawer } from '../store/actions';
import { showSettingsDrawer } from '../store/selectors';
import SettingsDrawer from '../components/SettingsDrawer';

function mapStateToProps(state) {
  return {
    visible: showSettingsDrawer(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onWantToClose: () => dispatch(closeSettingsDrawer()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsDrawer);
