/**
 * @flow
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  fetchServiceRequestDetails,
  selectServiceRequest,
  ServiceRequestList
} from '../../serviceRequests';
import * as SyncActions from '../actions';

function syncQueueServiceRequests(syncQueue) {
  return syncQueue.map(queuedAction => queuedAction.serviceRequest)
    .filter(sr => !!sr)
}

function mapStateToProps(state) {
  // Extract the list of pending service requests from the sync queue.
  const serviceRequests = syncQueueServiceRequests(state.offline.syncQueue);

  return {
    serviceRequests,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...SyncActions,
    fetchServiceRequestDetails,
    selectServiceRequest
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestList);
