import { CREATE_TEAM_SUCCESS } from './actionTypes';

let initialState = {
  currentTeam: null,
  teams: [],
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  // Add yourself to the team that was created.
  case CREATE_TEAM_SUCCESS:
    return {
      ...state,
      currentTeam: action.data.team,
    };
  default:
    return state;
  }
}