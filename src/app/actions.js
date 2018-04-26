import uuidv4 from 'uuid/v4';
import * as appActionTypes from './actionTypes';

export const selectTab = (selectedTab, context = null) => dispatch => {
  dispatch({
    type: appActionTypes.SELECT_TAB,
    selectedTab,
  });
  dispatch(updateTabContext(context));
};

export const updateTabContext = context => ({
  type: appActionTypes.UPDATE_TAB_CONTEXT,
  context,
});

export const updateDeviceInfo = deviceInfo => ({
  type: appActionTypes.UPDATE_DEVICE_INFO,
  deviceInfo,
});

export const gaTrackPressEvent = eventLabel => {
  return gaTrackEvent('Interactions', 'Pressed', eventLabel);
}

export const gaTrackEvent = (eventCategory, eventAction, eventLabel) => ({
  type: appActionTypes.GA_TRACK_EVENT,
  eventCategory,
  eventAction,
  eventLabel,
});

export const gaTrackScreenView = screenName => ({
  type: appActionTypes.GA_TRACK_SCREEN_VIEW,
  screenName,
});

export const setApiRequestInProgress = apiRequestInProgress => ({
  type: appActionTypes.SET_API_REQUEST_IN_PROGRESS,
  apiRequestInProgress,
});

export function addAlertToQueue(title, message, buttons) {
  return {
    type: appActionTypes.ADD_ALERT_TO_QUEUE,
    alert: {
      id: uuidv4(),
      title,
      message,
      buttons,
    },
  };
}

export function removeAlert() {
  return {
    type: appActionTypes.REMOVE_ALERT,
  };
}

export function setActiveAlertId(alertId) {
  return {
    type: appActionTypes.SET_ACTIVE_ALERT_ID,
    alertId,
  };
}
