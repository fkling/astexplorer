import {connect} from 'react-redux';
import {closeSettingsDialog, setParserSettings} from '../store/actions';
import SettingsDialog from '../SettingsDialog';
import * as LocalStorage from '../LocalStorage';

function mapStateToProps(state) {
  return {
    visible: state.showSettingsDialog,
    parser: state.parser,
    parserSettings: state.parserSettings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSave: (parser, newSettings) => {
      LocalStorage.setParserSettings(parser.id, newSettings);
      dispatch(setParserSettings(newSettings));
    },
    onWantToClose: () => dispatch(closeSettingsDialog()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
