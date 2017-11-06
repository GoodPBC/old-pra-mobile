/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serviceRequestList from '../components/ServiceRequestList';
import * as ServiceRequestActions from '../actions';
import { gaTrackEvent } from '../../app/actions';
import {
  getActiveServiceRequests,
  getInactiveServiceRequests,
} from '../selectors';
import { getCurrentTeam } from '../../teams/selectors';

/**
 * Map only necessary data for the 'Service Requests' list.
 */
function mapStateToProps(state) {
  return {
    currentTeam: getCurrentTeam(state),
    activeServiceRequests: getActiveServiceRequests(state),
    inactiveServiceRequests: getInactiveServiceRequests(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    gaTrackEvent,
    ...ServiceRequestActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(serviceRequestList);
