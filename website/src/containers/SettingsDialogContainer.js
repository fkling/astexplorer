import {connect} from 'react-redux';
import {closeSettingsDialog, setParserSettings} from '../store/actions';
import {showSettingsDialog, getParser, getParserSettings} from '../store/selectors';
import SettingsDialog from '../components/dialogs/SettingsDialog';

function mapStateToProps(state) {
  return {
    visible: showSettingsDialog(state),
    parser: getParser(state),
    parserSettings: getParserSettings(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: (parser, newSettings) => dispatch(setParserSettings(newSettings)),
    onWantToClose: () => dispatch(closeSettingsDialog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
