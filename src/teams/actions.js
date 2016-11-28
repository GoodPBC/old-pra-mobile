import {
  CREATE_TEAM,
  FETCH_TEAMS,
  FETCH_TEAM_USERS,
  JOIN_TEAM,
  LEAVE_TEAM,
  SELECT_TEAM,
} from './actionTypes';

import { API_REQUEST } from '../shared';

export function createTeam(teamName) {
  return {
    type: API_REQUEST,
    actionName: CREATE_TEAM,
    requestPath: 'teams',
    requestMethod: 'POST',
    requestParams: {
      team: {
        name: teamName,
      }
    }
  };
}

export function fetchTeams() {
  return {
      type: API_REQUEST,
      actionName: FETCH_TEAMS,
      requestPath: 'teams',
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