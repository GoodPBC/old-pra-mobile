/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ResolutionScreen from '../components/resolution/ResolutionScreen';
import * as ServiceRequestActions from '../actions';
import {
  getCurrentServiceRequestUpdateStatus,
  getCurrentServiceRequest,
} from '../selectors';

function mapStateToProps(state) {
  return {
    resolutionNotes: state.serviceRequests.resolutionNotes,
    selectedResolutionCode: state.serviceRequests.selectedResolutionCode,
    serviceRequest: getCurrentServiceRequest(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResolutionScreen);
