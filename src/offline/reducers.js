import {
  ADD_TO_SYNC_QUEUE,
  FINISH_SYNC,
  NETWORK_STATUS_CHANGE,
} from './actionTypes';

const initialState = {
  syncQueue: [],
  networkIsConnected: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_SYNC_QUEUE:
      const { syncQueue } = state;
      return {
        ...state,
        syncQueue: syncQueue.concat([action.action]),
      };
    case FINISH_SYNC:
      return {
        ...state,
        syncQueue: [],
      };
    case NETWORK_STATUS_CHANGE:
      return {
        ...state,
        networkIsConnected: action.isConnected,
      };
    default:
      return state;
  }
}