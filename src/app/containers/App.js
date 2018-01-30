/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import {
  selectTab,
  updateDeviceInfo,
  gaTrackScreenView,
  clearErrorMessage
} from '../actions';
import { updateNetworkStatus } from '../../offline/actions';
import { getCurrentTeam } from '../../teams/selectors';

function mapStateToProps(state) {
  return {
    selectedTab: state.app.selectedTab,
    deviceInfo: state.app.deviceInfo,
    apiRequestInProgress: state.app.apiRequestInProgress,
    errorTitle: state.app.errorTitle,
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
    selectTab,
    updateDeviceInfo,
    gaTrackScreenView,
    clearErrorMessage,
    updateNetworkStatus,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
