import {
  FETCH_TEAMS,
  FETCH_TEAM_USERS,
  JOIN_TEAM,
  LEAVE_TEAM,
  SELECT_TEAM,
} from './actionTypes';

import { API_REQUEST } from '../shared';

// FIXME: Duplicated.
const PRA_BASE_PATH = 'dhsmobile/PRAService/SSPRAService.svc';

// FIXME: Fetch teams for the actual user.
export function fetchTeams() {
  return (dispatch, getState) => {
    const { userIdString } = getState().user;
    dispatch({
      type: API_REQUEST,
      actionName: FETCH_TEAMS,
      endpoint: 'getuserteams',
      requestPath: `${PRA_BASE_PATH}/getuserteams/${userIdString}`,
      requestMethod: 'GET',
    });
  };
}

export function fetchTeamUsers(team) {
  return {
    type: API_REQUEST,
    actionName: FETCH_TEAM_USERS,
    requestPath: `teams/${team.id}/users`,
    requestMethod: 'GET',
  };
}

export function joinTeam(team) {
  return {
    type: JOIN_TEAM,
    team,
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