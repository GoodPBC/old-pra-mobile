import {
  UPDATE_NETWORK_STATUS,
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

export function updateNetworkStatus(isConnected) {
  return {
    type: UPDATE_NETWORK_STATUS,
    isConnected,
  };
}
