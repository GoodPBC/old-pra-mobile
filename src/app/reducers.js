import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  FORBIDDEN_RESPONSE_STATUS,
} from '../shared';

import {
  CLEAR_ERROR_MESSAGE,
} from './actionTypes';

let initialState = {
  apiRequestInProgress: false,
  errorMessage: null,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case API_REQUEST:
    return {
      ...state,
      apiRequestInProgress: true,
    }
  case API_REQUEST_SUCCESS:
    return {
      ...state,
      apiRequestInProgress: false,
    };
  case API_REQUEST_FAILURE:
    let newState = {
      ...state,
      apiRequestInProgress: false,
    };
    if (action.status === FORBIDDEN_RESPONSE_STATUS) {
      newState.errorMessage = null;
    } else {
      newState.errorMessage = action.error.toString();
    }
    return newState;
    break;
  case CLEAR_ERROR_MESSAGE:
    return {
      ...state,
      errorMessage: null,
    }
  default:
    return state;
  }
}