import {
  UPDATE_ONSITE_STATUS,
  RESOLVE_SERVICE_REQUEST,
} from '../serviceRequests';

import {
  API_REQUEST_FAILURE,
} from '../shared';

const initialState = {
  syncQueue: [],
};

const QUEUEABLE_ACTIONS = [
  UPDATE_ONSITE_STATUS,
  RESOLVE_SERVICE_REQUEST,
];

export default function reducer(state = initialState, action) {
  if (action.type !== API_REQUEST_FAILURE) {
    return state;
  }

  const isQueueable =
    QUEUEABLE_ACTIONS.indexOf(action.action.actionName) !== -1 &&
    !!action.action.serviceRequest;
  if (!isQueueable)  {
    return state;
  }

  state.syncQueue.push(action.action);
  return state;
}