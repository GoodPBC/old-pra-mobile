import {
  GA_TRACK_EVENT,
  GA_TRACK_SCREEN_VIEW,
  CLEAR_ERROR_MESSAGE,
} from './actionTypes';

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
