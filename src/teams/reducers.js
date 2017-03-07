import {
  CREATE_TEAM_SUCCESS,
  FETCH_CURRENT_TEAM_SUCCESS,
  FETCH_TEAMS_SUCCESS,
  JOIN_TEAM,
  LEAVE_TEAM,
  SELECT_TEAM,
} from './actionTypes';

import {
  LOGOUT_USER_SUCCESS,
} from '../user/actionTypes';

const initialState = {
  currentTeamId: null,
  selectedTeamId: null,
  teams: [],
};

function transformTeamInfoFromStreetSmart(json) {
  if (!json.Team_Info) {
    return [];
  }

  return json.Team_Info.map(teamJson => ({
      id: teamJson.TeamId,
      name: teamJson.Team_Name,
    }));
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_TEAMS_SUCCESS:
    return {
      ...state,
      teams: transformTeamInfoFromStreetSmart(action.data),
    };
  case JOIN_TEAM:
    return {
      ...state,
      currentTeamId: action.team.id,
    };
  case LOGOUT_USER_SUCCESS:
    return {
      ...initialState,
    };
  case SELECT_TEAM:
    const selectedTeam = action.team;
    const selectedTeamId = selectedTeam ? selectedTeam.id : null;
    return {
      ...state,
      selectedTeamId,
    };
  default:
    return state;
  }
}