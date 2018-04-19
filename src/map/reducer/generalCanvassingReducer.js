import * as types from '../actionTypes';
import { handleRequest, handleSuccess, handleFailure } from './reducerHelpers';

const initialState = {
  isFetching: false,
  lastUpdated: null,
  allSurveys: [],
};

export default function generalCanvassingReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_GENERAL_CANVASSING_REQUEST: {
      return handleRequest(state, action);
    }
    case types.FETCH_GENERAL_CANVASSING_SUCCESS: {
      return handleSuccess(state, action);
    }
    case types.FETCH_GENERAL_CANVASSING_FAILURE: {
      return handleFailure(state, action);
    }
    default:
      return state;
  }
}