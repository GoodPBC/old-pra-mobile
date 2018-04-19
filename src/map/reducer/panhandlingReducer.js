import * as types from '../actionTypes';
import { handleRequest, handleSuccess, handleFailure } from './reducerHelpers';

const initialState = {
  isFetching: false,
  lastUpdated: null,
  allSurveys: [],
};

export default function panhandlingReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PANHANDLING_REQUEST: {
      return handleRequest(state, action);
    }
    case types.FETCH_PANHANDLING_SUCCESS: {
      return handleSuccess(state, action);
    }
    case types.FETCH_PANHANDLING_FAILURE: {
      return handleFailure(state, action);
    }
    default:
      return state;
  }
}