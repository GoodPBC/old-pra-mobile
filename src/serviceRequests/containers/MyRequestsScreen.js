/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MyRequestsScreen from '../components/MyRequestsScreen';
import * as ServiceRequestActions from '../actions';

/**
 * Map only necessary data for the 'My Requests' screen.
 */
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServiceRequestActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRequestsScreen);
