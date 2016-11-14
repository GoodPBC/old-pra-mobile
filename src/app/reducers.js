import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_REQUEST_NETWORK_ERROR,
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
  // Start the network activity indicator
  case API_REQUEST:
    return {
      ...state,
      apiRequestInProgress: true,
    }
  // Disable the network activity indicator
  case API_REQUEST_SUCCESS:
    return {
      ...state,
      apiRequestInProgress: false,
    };
  // Stop the network activity indicator
  // Display an error message if necessary.
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
  // Network errors will happen if the app is offline.
  // Stop the network indicator but don't blow up with an error.
  case API_REQUEST_NETWORK_ERROR:
    return {
      ...state,
      apiRequestInProgress: false,
    };
  // Clear the error so it doesn't keep popping up for the user.
  case CLEAR_ERROR_MESSAGE:
    return {
      ...state,
      errorMessage: null,
    }
  default:
    return state;
  }
}