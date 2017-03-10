/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serviceRequestList from '../components/ServiceRequestList';
import * as ServiceRequestActions from '../actions';
import {
  getActiveServiceRequests,
  getInactiveServiceRequests,
} from '../selectors';

/**
 * Map only necessary data for the 'Service Requests' list.
 */
function mapStateToProps(state) {
  return {
    activeServiceRequests: getActiveServiceRequests(state),
    inactiveServiceRequests: getInactiveServiceRequests(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(serviceRequestList);
