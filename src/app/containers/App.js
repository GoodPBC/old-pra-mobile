/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/App';
import {
  selectTab,
  updateDeviceInfo,
  gaTrackEvent,
  gaTrackScreenView,
  clearErrorMessage
} from '../actions';
import { updateNetworkStatus } from '../../offline/actions';
import { updateUserPosition } from '../../user/actions';
import * as mapActions from '../../map/actions';
import { getCurrentTeam } from '../../teams/selectors';

function mapStateToProps(state) {
  return {
    entireState: state,
    selectedTab: state.app.selectedTab,
    deviceInfo: state.app.deviceInfo,
    apiRequestInProgress: state.app.apiRequestInProgress,
    errorTitle: state.app.errorTitle,
    errorMessage: state.app.errorMessage,
    hasSelectedTeam: !!getCurrentTeam(state),
    networkIsConnected: state.offline.networkIsConnected,
    userIsAuthenticated: state.user.userIsAuthenticated,
    userAccountName: state.user.userAccountName,
  };
}

/**
 * Don't need to pass any actions to the App container.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    selectTab,
    updateDeviceInfo,
    gaTrackEvent,
    gaTrackScreenView,
    clearErrorMessage,
    updateNetworkStatus,
    updateUserPosition,
    ...mapActions,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
