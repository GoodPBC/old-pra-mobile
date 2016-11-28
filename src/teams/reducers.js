import {
  CREATE_TEAM_SUCCESS,
  FETCH_TEAMS_SUCCESS,
  FETCH_TEAM_USERS_SUCCESS,
  JOIN_TEAM_SUCCESS,
  LEAVE_TEAM_SUCCESS,
  SELECT_TEAM,
} from './actionTypes';

const initialState = {
  currentTeam: null,
  selectedTeam: null,
  teams: [],
  teamUsers: [], // Represents the set of users for the currently-viewed team.
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
  case SELECT_TEAM:
    const { teams } = state;
    const selectedTeam = action.team;

    // Flip a flag on the selected team.
    // This allows the ListView to pick up on the fact
    // that the rows have changed and need to re-render.
    const updatedTeams = teams.map((team) => {
      if (selectedTeam.id === team.id) {
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
      selectedTeam: {
        ...action.team,
      },
    };
  default:
    return state;
  }
}