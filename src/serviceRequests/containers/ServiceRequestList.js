/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serviceRequestList from '../components/ServiceRequestList';
import * as ServiceRequestActions from '../actions';
import { getFilteredServiceRequests } from '../selectors';

/**
 * Map only necessary data for the 'Service Requests' list.
 */
function mapStateToProps(state) {
  return {
    serviceRequests: getFilteredServiceRequests(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(serviceRequestList);
