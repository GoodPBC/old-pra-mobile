import {
  FETCH_TEAMS,
  JOIN_TEAM,
  LEAVE_TEAM,
  SELECT_TEAM,
  UPDATE_TEAM_LOCATION,
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
  return dispatch => {
    dispatch({
      type: JOIN_TEAM,
      team,
      oldTeam,
    });
    dispatch(updateTeamLocation());
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

export function updateTeamLocation() {
  return (dispatch, getState) => {
    const { app, user, teams } = getState();
    const DeviceId = app.deviceInfo.deviceToken;
    const Platform = app.deviceInfo.os;
    const Latitude = user.latitude;
    const Longitude = user.longitude;
    const TeamId = teams.currentTeamId;
    const UserId = user.userId;

    if (DeviceId && Platform && Latitude && Longitude && TeamId && UserId) {
      dispatch({
        type: API_REQUEST,
        actionName: UPDATE_TEAM_LOCATION,
        endpoint: 'updateteamlocation',
        requestPath: 'updateteamlocation',
        requestMethod: 'POST',
        requestParams: {
          DeviceId,
          Platform,
          Latitude,
          Longitude,
          TeamId,
          UserId,
        },
      });
    }
  };
}
