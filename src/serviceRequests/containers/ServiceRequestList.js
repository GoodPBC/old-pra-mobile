/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serviceRequestList from '../components/ServiceRequestList';
import * as ServiceRequestActions from '../actions';

const DISPLAYABLE_STATUSES = [
  'assigned', // FIXME: Showing assigned SRs as well until we get Street Smart access.
  'in_the_field',
  'on_site',
  'visit_complete',
  'resolved',
];

/**
 * Map only necessary data for the 'Service Requests' list.
 */
function mapStateToProps(state) {
  // Filter SRs based on the currently-selected team
  const { currentTeam } = state.teams;
  let serviceRequests = [];
  if (currentTeam) {
    serviceRequests = state.serviceRequests.serviceRequests.filter(sr => sr.team === currentTeam.name);
  }

  // Only display dispatched, onsite, resolved SRs

  serviceRequests = serviceRequests.filter(sr => DISPLAYABLE_STATUSES.indexOf(sr.status) !== -1);

  return {
    serviceRequests,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(serviceRequestList);
