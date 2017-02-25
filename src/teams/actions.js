import {
  FETCH_TEAMS,
  FETCH_TEAM_USERS,
  JOIN_TEAM,
  LEAVE_TEAM,
  SELECT_TEAM,
} from './actionTypes';

import { API_REQUEST } from '../shared';

// FIXME: Fetch teams for the actual user.
export function fetchTeams() {
  console.error('TODO: Fix team fetch, need a user ID that has teams');
  return {
      type: API_REQUEST,
      actionName: FETCH_TEAMS,
      endpoint: 'getuserteams',
      requestPath: `getuserteams/vkaura`,
      requestMethod: 'GET',
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
    type: API_REQUEST,
    actionName: JOIN_TEAM,
    requestPath: 'me/team',
    requestMethod: 'PUT',
    requestParams: {
      team,
    }
  };
}

export function leaveTeam() {
  return {
    type: API_REQUEST,
    actionName: LEAVE_TEAM,
    requestPath: 'me/team',
    requestMethod: 'DELETE',
    requestParams: {}
  };
}

export function selectTeam(team) {
  return {
    type: SELECT_TEAM,
    team,
  };
}