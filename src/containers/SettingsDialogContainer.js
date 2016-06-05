import {connect} from 'react-redux';
import {closeSettingsDialog} from '../store/actions';
import PubSub from 'pubsub-js';
import SettingsDialog from '../SettingsDialog';

function mapStateToProps(state) {
  return {
    visible: state.showSettingsDialog,
    parser: state.parser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: () => PubSub.publish('FORCE_PARSE'),
    onWantToClose: () => dispatch(closeSettingsDialog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
