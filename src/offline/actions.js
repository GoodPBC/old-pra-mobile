import {
  NetInfo,
} from 'react-native';

import {
  NETWORK_STATUS_CHANGE,
  SYNC_SERVICE_REQUESTS,
} from './actionTypes';

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