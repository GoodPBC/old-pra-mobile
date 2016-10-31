/**
 * StreetSmart
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StreetSmart from '../components/StreetSmart';
import * as ServiceRequestActions from '../actions/serviceRequests';

function mapStateToProps(state) {
  return {
    serviceRequests: state.serviceRequests.serviceRequests
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StreetSmart)
