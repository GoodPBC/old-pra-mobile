import {
  CREATE_TEAM_SUCCESS,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAM_USERS_SUCCESS,
  JOIN_TEAM_SUCCESS,
  LEAVE_TEAM_SUCCESS,
} from './actionTypes';

let initialState = {
  currentTeam: null,
  teams: [],
  teamUsers: [], // Represents the set of users for the currently-viewed team.
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case CREATE_TEAM_SUCCESS:
    return {
      ...state,
      currentTeam: action.data.team,
    };
  case FETCH_TEAMS_SUCCESS:
    return {
      ...state,
      teams: action.data.teams,
    };
  case FETCH_TEAM_USERS_SUCCESS:
    return {
      ...state,
      teamUsers: action.data.users,
    };
  case JOIN_TEAM_SUCCESS:
    return {
      ...state,
      currentTeam: action.data.team,
    };
  case LEAVE_TEAM_SUCCESS:
    return {
      ...state,
      currentTeam: null,
    };
  default:
    return state;
  }
}