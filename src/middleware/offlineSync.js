import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
} from '../shared';

import {
  addToSyncQueue,
} from '../offline/actions';

import {
  FINISH_SYNC,
  NETWORK_STATUS_CHANGE,
  QUEUEABLE_ACTIONS,
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
  // store.dispatch({
  //   type: FINISH_SYNC,
  // });
}

/**
 * Queue the action if we're offline, otherwise
 */
function queueActionIfOffline(store, action, callback) {
  const state = store.getState().offline;
  if (!state.networkIsConnected && action.type === API_REQUEST) {
  // Works for a subset of actions, provided that the service
  // request is also passed along. Otherwise can't see it in the
  // sync list.
    const isQueueable =
      QUEUEABLE_ACTIONS.indexOf(action.actionName) !== -1 &&
      !!action.serviceRequest;
    if (isQueueable) {
      console.log('queuing action', {actionType: action.type });
      store.dispatch(addToSyncQueue(action));
    }

  } else {
    console.log('skipping queuing', { actionType: action.type });
    callback();
  }
}

export default store => next => action => {
  if (action.type === NETWORK_STATUS_CHANGE) {
    return next(action);
  }

  queueActionIfOffline(store, action, () => {
    next(action);
    const drainTriggerActions = [
      API_REQUEST_SUCCESS, // Any successful API request
      SYNC_SERVICE_REQUESTS, // tapping the 'Sync' button
    ];

    if (drainTriggerActions.indexOf(action.type) !== -1) {
      drainSyncQueue(store);
    }
  });
};