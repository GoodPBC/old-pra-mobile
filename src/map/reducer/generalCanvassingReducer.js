import * as types from '../actionTypes';

const initialState = {
  isFetching: false,
  lastUpdated: null,
  allSurveys: [],
};

export default function generalCanvassingReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_GENERAL_CANVASSING_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case types.FETCH_GENERAL_CANVASSING_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        lastUpdated: null,
        allSurveys: action.payload.Service_Requests,
      };
    }
    case types.FETCH_GENERAL_CANVASSING_FAILURE: {
      return {
        ...state,
        isFetching: false,
      };
    }
    default:
      return state;
  }
}