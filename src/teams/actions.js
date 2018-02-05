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
    console.log('deviceId', app.deviceInfo.deviceToken);
    console.log('latitude', user.latitude);
    console.log('longitude', user.longitude);
    console.log('userId', user.userId);
    console.log('teamId', teams.currentTeamId);
    console.log('@ ', new Date());
    // dispatch({
    //   type: API_REQUEST,
    //   actionName: UPDATE_TEAM_LOCATION,
    //   endpoint: 'updateteamlocation',
    //   requestPath: 'updateteamlocation',
    //   requestMethod: 'POST',
    //   requestParams: {
    //     DeviceId: app.deviceInfo.deviceToken,
    //     Latitude: user.latitude,
    //     Longitude: user.longitude,
    //     TeamId: teams.currentTeamId,
    //     UserId: user.userId,
    //   },
    //   quiet: true,
    // });
  };
}
