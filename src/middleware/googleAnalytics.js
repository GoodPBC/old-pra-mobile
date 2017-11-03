import { LOGOUT_USER } from '../user/actionTypes';

import GoogleAnalytics from '../analytics/googleAnalytics';

const googleAnalytics = store => next => action => {
  switch (action.type) {
    case LOGOUT_USER: {
      const { userAccountName } = action.user;
      GoogleAnalytics.trackEvent(
        'Users',
        'Logged Out',
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
