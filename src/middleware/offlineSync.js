import {
  API_REQUEST_SUCCESS,
} from '../shared';

import {
  SYNC_SERVICE_REQUESTS,
} from '../offline/actionTypes';

/**
 * Dispatch all actions that were stored in the queue.
 */
function drainSyncQueue(store) {
  const pendingActions = store.getState().offline.syncQueue;
  let action = null;
  while (action = pendingActions.shift()) { // FIFO
    store.dispatch(action);
  }
}

export default store => next => action => {
  next(action);

  const drainTriggerActions = [
    API_REQUEST_SUCCESS, // Any successful API request
    SYNC_SERVICE_REQUESTS, // tapping the 'Sync' button
  ];

  if (drainTriggerActions.indexOf(action.type) !== -1) {
    drainSyncQueue(store);
  }
};