import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import Config from 'react-native-config';
import titleCase from 'title-case';

import {
  GA_TRACK_EVENT,
  GA_TRACK_SCREEN_VIEW,
} from '../../app/actionTypes';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from '../../user/actionTypes';
import { JOIN_TEAM } from '../../teams/actionTypes';
import {
  FETCH_SERVICE_REQUESTS_SUCCESS,
  FETCH_SERVICE_REQUESTS_FAILURE,
  UPDATE_ONSITE_STATUS_SUCCESS,
  UPDATE_ONSITE_STATUS_FAILURE,
  RESOLVE_SERVICE_REQUEST_SUCCESS,
  RESOLVE_SERVICE_REQUEST_FAILURE,
  RESOLUTION_CODES,
  SELECT_SERVICE_REQUEST,
} from '../../serviceRequests/actionTypes';
import { SYNC_SERVICE_REQUESTS } from '../../offline/actionTypes';
import {
  API_REQUEST_NETWORK_ERROR,
  API_REQUEST_FAILURE,
} from '../../shared/actionTypes';

import { Tabs } from '../../shared';

function getKeyByValue(obj, val) {
  return Object.keys(obj).find(key => obj[key] === val);
}

const GoogleAnalytics = new GoogleAnalyticsTracker(Config.GOOGLE_ANALYTICS_TRACKING_ID);

const Categories = {
  TEAMS: 'Teams',
  USERS: 'Users',
  SERVICE_REQUESTS: 'Service Requests',
  INTERACTIONS: 'Interactions',
};

const Actions = {
  CHANGED: 'Changed',
  JOINED: 'Joined',
  LOGGED_OUT: 'Logged Out',
  LOGGED_IN: 'Logged In',
  WENT_ONSITE: 'Went On-site',
  FETCHED: 'Fetched',
  PRESSED: 'Pressed',
  VIEWED: 'Viewed',
};


/* SAMPLE_SERVICE_REQUEST RESPONSE ACTION
 * action = {
 *   type: 'UPDATE_ONSITE_STATUS_SUCCESS',
 *   data: {
 *     Service_Requests: [
 *       {
 *         ModifiedAt: "2017-11-06 11-08-29",
 *         ModifiedBy: 667,
 *         PRASRResolutionCodeId: null,
 *         PRASRResolutionNote: null,
 *         PRASRStatusID: 4,
 *         SR_Number: "1-1-1392104381"
 *       }
 *     ]
 *   }
 * }
 */

const googleAnalytics = store => next => action => {
  switch (action.type) {
    case API_REQUEST_FAILURE:
    case API_REQUEST_NETWORK_ERROR: {
      const { action: { requestMethod, requestPath }, error } = action;
      const errorMessage = `${requestMethod} /${requestPath} ${error}`;
      GoogleAnalytics.trackException(errorMessage, false);
      return next(action);
    }
    case GA_TRACK_EVENT: {
      const { eventCategory, eventAction, eventLabel } = action;
      GoogleAnalytics.trackEvent(
        eventCategory,
        eventAction,
        { label: eventLabel }
      );
      break;
    }
    case GA_TRACK_SCREEN_VIEW: {
      const screenName = titleCase(getKeyByValue(Tabs, action.screenName));
      GoogleAnalytics.trackScreenView(screenName);
      break;
    }
    case SELECT_SERVICE_REQUEST: {
      if (action.serviceRequest) {
        const { sr_number } = action.serviceRequest;
        GoogleAnalytics.trackEvent(
          Categories.INTERACTIONS,
          Actions.VIEWED,
          { label: sr_number }
        );
      }
      return next(action);
    }
    case SYNC_SERVICE_REQUESTS: {
      GoogleAnalytics.trackEvent(
        Categories.INTERACTIONS,
        Actions.PRESSED,
        { label: 'Refresh' }
      );
      return next(action);
    }
    case FETCH_SERVICE_REQUESTS_SUCCESS: {
      const { userAccountName } = store.getState().user;
      GoogleAnalytics.trackEvent(
        Categories.SERVICE_REQUESTS,
        Actions.FETCHED,
        { label: userAccountName }
      );
      return next(action);
    }
    case RESOLVE_SERVICE_REQUEST_SUCCESS: {
      const {
        PRASRResolutionCodeId,
        SR_Number,
      } = action.data.Service_Requests[0];

      const getTitleizedResolution = code => {
        const resolution = Object.keys(RESOLUTION_CODES).find(key => {
          return RESOLUTION_CODES[key] === code;
        });
        return titleCase(resolution);
      };

      GoogleAnalytics.trackEvent(
        Categories.SERVICE_REQUESTS,
        `Resolved: ${getTitleizedResolution(PRASRResolutionCodeId)}`,
        { label: SR_Number }
      )
      return next(action);
    }
    case UPDATE_ONSITE_STATUS_SUCCESS: {
      const { SR_Number } = action.data.Service_Requests[0];
      GoogleAnalytics.trackEvent(
        Categories.SERVICE_REQUESTS,
        Actions.WENT_ONSITE,
        { label: SR_Number }
      )
      return next(action);
    }
    case JOIN_TEAM: {
      const { team, oldTeam } = action;
      if (oldTeam) {
        GoogleAnalytics.trackEvent(
          Categories.TEAMS,
          Actions.CHANGED,
          { label: `${oldTeam.name} -> ${team.name}` }
        )
      } else {
        GoogleAnalytics.trackEvent(
          Categories.TEAMS,
          Actions.JOINED,
          { label: team.name }
        )
      }
      return next(action);
    }
    case LOGIN_USER_SUCCESS: {
      const { UserAccountName } = action.data;
      GoogleAnalytics.trackEvent(
        Categories.USERS,
        Actions.LOGGED_IN,
        { label: UserAccountName }
      )
      return next(action);
    }
    case LOGOUT_USER: {
      const { userAccountName } = action.user;
      GoogleAnalytics.trackEvent(
        Categories.USERS,
        Actions.LOGGED_OUT,
        { label: userAccountName }
      )
      return next(action);
    }
    default: {
      return next(action);
    }
  }
};

export default googleAnalytics;
