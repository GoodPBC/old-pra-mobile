import {
  CREATE_TEAM_SUCCESS,
  FETCH_CURRENT_TEAM_SUCCESS,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAM_USERS_SUCCESS,
  JOIN_TEAM,
  LEAVE_TEAM,
  SELECT_TEAM,
} from './actionTypes';

const initialState = {
  currentTeam: null,
  selectedTeam: null,
  teams: [],
  teamUsers: [], // Represents the set of users for the currently-viewed team.
};

function updateSelectedTeam(selectedTeam, state) {
    const { teams } = state;

    // Flip a flag on the selected team.
    // This allows the ListView to pick up on the fact
    // that the rows have changed and need to re-render.
    const updatedTeams = teams.map((team) => {
      if (selectedTeam && selectedTeam.id === team.id) {
        return {
          ...team,
          selected: true,
        };
      }

      return {
        ...team,
        selected: false,
      };
    });
    return {
      ...state,
      teams: updatedTeams,
      selectedTeam: selectedTeam ? {
        ...selectedTeam,
      } : null,
    };
}

function transformTeamInfoFromStreetSmart(json) {
  if (!json.Team_Info) {
    return [];
  }

  return json.Team_Info.map(teamJson => {
    return {
      id: teamJson.TeamId,
      name: teamJson.Team_Name,
    };
  });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case CREATE_TEAM_SUCCESS:
    return {
      ...state,
      currentTeam: action.data.team,
    };
  case FETCH_CURRENT_TEAM_SUCCESS: {
    return {
      ...state,
      currentTeam: action.data.team,
    };
  }
  case FETCH_TEAMS_SUCCESS:
    return {
      ...state,
      teams: transformTeamInfoFromStreetSmart(action.data),
    };
  case FETCH_TEAM_USERS_SUCCESS:
    return {
      ...state,
      teamUsers: action.data.users,
    };
  case JOIN_TEAM:
    return {
      ...state,
      currentTeam: action.team,
    };
  case LEAVE_TEAM:
    return {
      ...state,
      currentTeam: null,
    };
  case SELECT_TEAM:
    const selectedTeam = action.team;
    return updateSelectedTeam(selectedTeam, state);
  default:
    return state;
  }
}