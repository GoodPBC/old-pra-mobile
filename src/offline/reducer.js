import {
  ADD_TO_SYNC_QUEUE,
  FINISH_SYNC,
  UPDATE_NETWORK_STATUS,
} from './actionTypes';

export const initialState = {
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
    case UPDATE_NETWORK_STATUS:
      return {
        ...state,
        networkIsConnected: action.isConnected,
      };
    default:
      return state;
  }
}
