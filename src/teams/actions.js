import { Alert } from 'react-native';

import {
  ASSIGN_SERVICE_REQUESTS,
  CREATE_TEAM,
  FETCH_CURRENT_TEAM,
  FETCH_TEAMS,
  FETCH_TEAM_USERS,
  JOIN_TEAM,
  LEAVE_TEAM,
  SELECT_TEAM,
  UNASSIGN_SERVICE_REQUESTS,
} from './actionTypes';

import { API_REQUEST } from '../shared';

export function assignServiceRequestsForTeam(team) {
  function createAction() {
    return {
      type: API_REQUEST,
      actionName: ASSIGN_SERVICE_REQUESTS,
      requestPath: 'me/assignments',
      requestMethod: 'POST',
      requestParams: {
        team_id: team.id,
      },
    };
  }

  return (dispatch) => {
    Alert.alert('Joining new team', 'Do you want to receive all current assignments for this team?', [
      { text: 'No', onPress: () => {} },
      { text: 'Yes', onPress: () => dispatch(createAction()) }
    ]);
  };
}

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

export function fetchCurrentTeam() {
  return {
    type: API_REQUEST,
    actionName: FETCH_CURRENT_TEAM,
    requestPath: 'me/team',
    requestMethod: 'GET',
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

export function unassignServiceRequestsForTeam(team) {
  function createAction() {
    return {
      type: API_REQUEST,
      actionName: UNASSIGN_SERVICE_REQUESTS,
      requestPath: 'me/assignments',
      requestMethod: 'DELETE',
      requestParams: {
        team_id: team.id,
      },
    };
  }

  return (dispatch) => {
    Alert.alert('Leaving old team', 'Do you want to remove all assignments from your previous team?', [
      { text: 'No',
        onPress: () => {} },
      { text: 'Yes',
        onPress: () => dispatch(createAction()) },
    ]);
  };
 }

 export function joinTeamAndProcessAssignments(team) {
  return (dispatch, getState) => {
    const { currentTeam } = getState().teams;
    dispatch(joinTeam(team));
    // Changing teams (as opposed to going from nil -> team)
    if (currentTeam && currentTeam.id !== team.id) {
      dispatch(unassignServiceRequestsForTeam(currentTeam));
    }
    // Ask to assign if changing teams or going from nil -> team
    if (!currentTeam || currentTeam.id !== team.id) {
      dispatch(assignServiceRequestsForTeam(team));
    }
  };
}