/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServiceRequestNavigation from '../components/ServiceRequestNavigation';
import * as ServiceRequestActions from '../actions';
import { syncServiceRequests } from '../../offline/actions';

function mapStateToProps(state) {
  return {
    isRefreshing: state.serviceRequests.isRefreshing,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    syncServiceRequests,
    ...ServiceRequestActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestNavigation);
