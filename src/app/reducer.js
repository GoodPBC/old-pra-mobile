import uuidv4 from 'uuid/v4';

import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_REQUEST_NETWORK_ERROR,
  FORBIDDEN_RESPONSE_STATUS,
  Tabs,
} from '../shared';
import * as appActionTypes from './actionTypes';

export const initialState = {
  selectedTab: Tabs.MY_REQUESTS,
  selectedTabContext: null,
  deviceInfo: {},
  apiRequestInProgress: false,
  alertQueue: [],
  activeAlertId: null,
  errorTitle: null,
  errorMessage: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case appActionTypes.SELECT_TAB: {
      return {
        ...state,
        selectedTab: action.selectedTab,
      }
    }
    case appActionTypes.UPDATE_TAB_CONTEXT: {
      return {
        ...state,
        selectedTabContext: action.context,
      };
    }
    case appActionTypes.UPDATE_DEVICE_INFO: {
      return {
        ...state,
        deviceInfo: { ...state.deviceInfo, ...action.deviceInfo },
      }
    }
    // Start the network activity indicator
    case appActionTypes.SET_API_REQUEST_IN_PROGRESS: {
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
      const newAlert = { id: uuidv4() };

      if (action.status === FORBIDDEN_RESPONSE_STATUS) {
        newAlert = null;
      } else if (action.error.match(/invalid token/i)) {
        newAlert.title = 'Session Expired';
        newAlert.message = 'Your session has expired. Please log in again.';
      } else {
        newAlert.message = action.error;
      }

      return {
        ...state,
        apiRequestInProgress: false,
        alertQueue: newAlert ? [
          ...state.alertQueue,
          newAlert
        ] : state.alertQueue,
      };
    // Network errors will happen if the app is offline.
    // Stop the network indicator but don't blow up with an error.
    case API_REQUEST_NETWORK_ERROR:
      return {
        ...state,
        apiRequestInProgress: false,
      };
    case appActionTypes.SET_ACTIVE_ALERT_ID:
      return {
        ...state,
        activeAlertId: action.alertId,
      };
    case appActionTypes.ADD_ALERT:
      return {
        ...state,
        alertQueue: [
          ...state.alertQueue,
          action.alert,
        ],
      };
    case appActionTypes.REMOVE_ALERT:
      return {
        ...state,
        alertQueue: state.alertQueue.slice(1),
      };
    default:
      return state;
  }
}
