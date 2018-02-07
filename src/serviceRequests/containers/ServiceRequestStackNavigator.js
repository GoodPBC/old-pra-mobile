/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServiceRequestStackNavigator from '../components/ServiceRequestStackNavigator';
import * as ServiceRequestActions from '../actions';
import { syncServiceRequests } from '../../offline/actions';

function mapStateToProps(state) {
  return {
    isRefreshing: state.serviceRequests.isRefreshing,
    networkIsConnected: state.offline.networkIsConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    syncServiceRequests,
    ...ServiceRequestActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestStackNavigator);
