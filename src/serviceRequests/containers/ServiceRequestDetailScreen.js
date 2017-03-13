/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServiceRequestDetailScreen from '../components/ServiceRequestDetailScreen';
import * as ServiceRequestActions from '../actions';
import { getCurrentServiceRequestUpdateStatus, getCurrentServiceRequest } from '../selectors';

function mapStateToProps(state) {
  return {
    serviceRequest: getCurrentServiceRequest(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestDetailScreen);
