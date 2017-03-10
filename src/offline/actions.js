import {
  NetInfo,
} from 'react-native';

import {
  ADD_TO_SYNC_QUEUE,
  NETWORK_STATUS_CHANGE,
  SYNC_SERVICE_REQUESTS,
} from './actionTypes';

export function addToSyncQueue(action) {
  return {
    type: ADD_TO_SYNC_QUEUE,
    action,
  };
}

export function syncServiceRequests() {
  return {
    type: SYNC_SERVICE_REQUESTS,
  };
}

export function monitorNetworkChanges() {
  return (dispatch) => {
    NetInfo.isConnected.fetch().then(isConnected => {
      dispatch({
        type: NETWORK_STATUS_CHANGE,
        isConnected,
      });
    });
    NetInfo.isConnected.addEventListener('change', isConnected => {
      dispatch({
        type: NETWORK_STATUS_CHANGE,
        isConnected,
      });
    });
  };
}