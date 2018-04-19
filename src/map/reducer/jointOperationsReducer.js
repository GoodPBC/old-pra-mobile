import * as types from '../actionTypes';
import { handleRequest, handleSuccess, handleFailure } from './reducerHelpers';

const initialState = {
  isFetching: false,
  lastUpdated: null,
  allSurveys: [],
};

export default function jointOperationsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_JOINT_OPERATIONS_REQUEST: {
      return handleRequest(state, action);
    }
    case types.FETCH_JOINT_OPERATIONS_SUCCESS: {
      return handleSuccess(state, action);
    }
    case types.FETCH_JOINT_OPERATIONS_FAILURE: {
      return handleFailure(state, action);
    }
    default:
      return state;
  }
}