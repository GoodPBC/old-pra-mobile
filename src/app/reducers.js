import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
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
    // Clear out the existing requests if the fetch failed, because we don't
    // know whether the data is out of sync.
    return {
      ...state,
      apiRequestInProgress: false,
      errorMessage: action.error.toString(),
    }
  case CLEAR_ERROR_MESSAGE:
    return {
      ...state,
      errorMessage: null,
    }
  default:
    return state;
  }
}