/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServiceRequestDetailScreen from '../components/ServiceRequestDetailScreen';
import * as ServiceRequestActions from '../actions';

function mapStateToProps(state) {
  return {
    serviceRequest: state.serviceRequests.currentServiceRequest,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestDetailScreen);
