import { LOGIN_USER_SUCCESS, LOGOUT_USER } from '../user/actionTypes';
import { JOIN_TEAM } from '../teams/actionTypes';

import GoogleAnalytics from '../analytics/googleAnalytics';

const Categories = {
  TEAMS: 'Teams',
  USERS: 'Users',
  SERVICE_REQUESTS: 'Service Requests',
};

const Actions = {
  CHANGED: 'Changed',
  JOINED: 'Joined',
  LOGGED_OUT: 'Logged Out',
  LOGGED_IN: 'Logged In',
};

const googleAnalytics = store => next => action => {
  switch (action.type) {
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
