/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serviceRequestList from '../components/ServiceRequestList';
import * as ServiceRequestActions from '../actions';

/**
 * Map only necessary data for the 'Service Requests' list.
 */
function mapStateToProps(state) {
  return {
    serviceRequests: state.serviceRequests.serviceRequests,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(serviceRequestList);
