import {
  SELECT_TAB,
  UPDATE_TAB_CONTEXT,
  UPDATE_DEVICE_INFO,
  GA_TRACK_EVENT,
  GA_TRACK_SCREEN_VIEW,
  CLEAR_ERROR_MESSAGE,
} from './actionTypes';

export const selectTab = (selectedTab, context = null) => dispatch => {
  dispatch({
    type: SELECT_TAB,
    selectedTab,
  });
  dispatch(updateTabContext(context));
};

export const updateTabContext = context => ({
  type: UPDATE_TAB_CONTEXT,
  context,
});

export const updateDeviceInfo = deviceInfo => ({
  type: UPDATE_DEVICE_INFO,
  deviceInfo,
});

export const gaTrackPressEvent = eventLabel => {
  return gaTrackEvent('Interactions', 'Pressed', eventLabel);
}

export const gaTrackEvent = (eventCategory, eventAction, eventLabel) => ({
  type: GA_TRACK_EVENT,
  eventCategory,
  eventAction,
  eventLabel,
});

export const gaTrackScreenView = screenName => ({
  type: GA_TRACK_SCREEN_VIEW,
  screenName,
});

export function clearErrorMessage() {
  return {
    type: CLEAR_ERROR_MESSAGE,
  };
}
