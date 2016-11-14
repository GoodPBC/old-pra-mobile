import {
  SYNC_SERVICE_REQUESTS,
} from './actionTypes';

export function syncServiceRequests() {
  return (dispatch, getState) => {
    const pendingActions = getState().offline.syncQueue;
    let action = null;
    while(action = pendingActions.shift()) { // FIFO
      dispatch(action);
    }
  };
}