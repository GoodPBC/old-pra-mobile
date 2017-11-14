/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import {
  updateDeviceInfo,
  gaTrackScreenView,
  clearErrorMessage
} from '../actions';
import { monitorNetworkChanges } from '../../offline/actions';
import { getCurrentTeam } from '../../teams/selectors';

function mapStateToProps(state) {
  return {
    deviceInfo: state.app.deviceInfo,
    apiRequestInProgress: state.app.apiRequestInProgress,
    errorMessage: state.app.errorMessage,
    hasSelectedTeam: !!getCurrentTeam(state),
    networkIsConnected: state.offline.networkIsConnected,
    userIsAuthenticated: state.user.userIsAuthenticated,
  };
}

/**
 * Don't need to pass any actions to the App container.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateDeviceInfo,
    gaTrackScreenView,
    clearErrorMessage,
    monitorNetworkChanges,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
