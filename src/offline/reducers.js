import {
  UPDATE_ONSITE_STATUS,
  RESOLVE_SERVICE_REQUEST,
} from '../serviceRequests';

import {
  NETWORK_STATUS_CHANGE,
} from './actionTypes';

import {
  API_REQUEST_NETWORK_ERROR,
} from '../shared';

const initialState = {
  syncQueue: [],
  networkIsConnected: true,
};

const QUEUEABLE_ACTIONS = [
  UPDATE_ONSITE_STATUS,
  RESOLVE_SERVICE_REQUEST,
];

function addToSyncQueue(state, action) {
  // Works for a subset of actions, provided that the service
  // request is also passed along. Otherwise can't see it in the
  // sync list.
  const isQueueable =
    QUEUEABLE_ACTIONS.indexOf(action.action.actionName) !== -1 &&
    !!action.action.serviceRequest;

  if (!isQueueable) {
    return state;
  }

  state.syncQueue.push(action.action);
  return state;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case API_REQUEST_NETWORK_ERROR:
      return addToSyncQueue(state, action);
    case NETWORK_STATUS_CHANGE:
      return {
        ...state,
        networkIsConnected: action.isConnected,
      };
    default:
      return state;
  }
}