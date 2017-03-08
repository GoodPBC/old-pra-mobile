/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyRequestsScreen from '../components/MyRequestsScreen';
import * as ServiceRequestActions from '../actions';
import { getActiveServiceRequests, showNoSRWarning } from '../selectors';
import {  getCurrentTeam } from '../../teams/selectors';

/**
 * Map only necessary data for the 'My Requests' screen.
 */
function mapStateToProps(state) {
  return {
    currentTeam: getCurrentTeam(state),
    showNoSRWarning: showNoSRWarning(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsScreen);
