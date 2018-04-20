import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_REQUEST_NETWORK_ERROR,
  FORBIDDEN_RESPONSE_STATUS,
  Tabs,
} from '../shared';

import {
  SELECT_TAB,
  UPDATE_TAB_CONTEXT,
  UPDATE_DEVICE_INFO,
  CLEAR_ERROR_MESSAGE,
  SET_API_REQUEST_IN_PROGRESS,
} from './actionTypes';

export const initialState = {
  selectedTab: Tabs.MY_REQUESTS,
  selectedTabContext: null,
  deviceInfo: {},
  apiRequestInProgress: false,
  errorTitle: null,
  errorMessage: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_TAB: {
      return {
        ...state,
        selectedTab: action.selectedTab,
      }
    }
    case UPDATE_TAB_CONTEXT: {
      return {
        ...state,
        selectedTabContext: action.context,
      };
    }
    case UPDATE_DEVICE_INFO: {
      return {
        ...state,
        deviceInfo: { ...state.deviceInfo, ...action.deviceInfo },
      }
    }
    // Start the network activity indicator
    case SET_API_REQUEST_IN_PROGRESS: {
      const { apiRequestInProgress } = action;
      return {
        ...state,
        apiRequestInProgress,
      };
    }
    case API_REQUEST:
      return {
        ...state,
        apiRequestInProgress: true,
      };
    // Disable the network activity indicator
    case API_REQUEST_SUCCESS:
      return {
        ...state,
        apiRequestInProgress: false,
      };
    // Stop the network activity indicator
    // Display an error message if necessary.
    case API_REQUEST_FAILURE:
      const newState = {
        ...state,
        apiRequestInProgress: false,
      };
      if (action.status === FORBIDDEN_RESPONSE_STATUS) {
        newState.errorMessage = null;
      } else if (action.error.match(/invalid token/i)) {
        newState.errorTitle = 'Session Expired';
        newState.errorMessage = 'Your session has expired. Please log in again.';
      } else {
        newState.errorMessage = action.error;
      }
      return newState;
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
        errorTitle: null,
        errorMessage: null,
      };
    default:
      return state;
  }
}
