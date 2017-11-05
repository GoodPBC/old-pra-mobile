import {
  FETCH_TEAMS,
  JOIN_TEAM,
  LEAVE_TEAM,
  SELECT_TEAM,
} from './actionTypes';

import { API_REQUEST } from '../shared';

export function fetchTeams() {
  return (dispatch, getState) => {
    const { userAccountName } = getState().user;
    dispatch({
      type: API_REQUEST,
      actionName: FETCH_TEAMS,
      endpoint: 'getuserteams',
      requestPath: `getuserteams/${userAccountName}`,
      requestMethod: 'GET',
    });
  };
}

export function joinTeam(team, oldTeam = null) {
  return {
    type: JOIN_TEAM,
    team,
    oldTeam,
  };
}

export function leaveTeam() {
  return {
    type: LEAVE_TEAM,
  };
}

export function selectTeam(team) {
  return {
    type: SELECT_TEAM,
    team,
  };
}
