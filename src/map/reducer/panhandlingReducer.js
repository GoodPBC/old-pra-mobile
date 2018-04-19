import * as types from '../actionTypes';

const initialState = {
  isFetching: false,
  lastUpdated: null,
  allSurveys: [],
};

export default function panhandlingReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PANHANDLING_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.FETCH_PANHANDLING_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lastUpdated: null,
        allSurveys: action.payload.Service_Requests,
      };
    }
    case types.FETCH_PANHANDLING_FAILURE: {
      return {
        ...state,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}