import { LOGOUT_USER } from '../user/actionTypes';
import { JOIN_TEAM } from '../teams/actionTypes';

import GoogleAnalytics from '../analytics/googleAnalytics';

const Categories = {
  TEAMS: 'Teams',
  USERS: 'Users',
  SERVICE_REQUESTS: 'Service Requests',
};

const Actions = {
  CHANGE: 'Changed',
  JOIN: 'Joined',
  LOGOUT: 'Logged Out',
  LOGIN: 'Logged In',
};

const googleAnalytics = store => next => action => {
  switch (action.type) {
    case JOIN_TEAM: {
      const { team, oldTeam } = action;
      if (oldTeam) {
        GoogleAnalytics.trackEvent(
          Categories.TEAMS,
          Actions.CHANGE,
          { label: `${oldTeam.name} -> ${team.name}` }
        )
      } else {
        GoogleAnalytics.trackEvent(
          Categories.TEAMS,
          Actions.JOIN,
          { label: team.name }
        )
      }
      return next(action);
    }
    case LOGOUT_USER: {
      const { userAccountName } = action.user;
      GoogleAnalytics.trackEvent(
        Categories.USERS,
        Actions.LOGOUT,
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
