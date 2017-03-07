/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyRequestsScreen from '../components/MyRequestsScreen';
import * as ServiceRequestActions from '../actions';
import { getAllServiceRequests } from '../selectors';

/**
 * Map only necessary data for the 'My Requests' screen.
 */
function mapStateToProps(state) {
  return {
    serviceRequests: getAllServiceRequests(state),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsScreen);
