import { CREATE_TEAM_SUCCESS } from '../actions/actionTypes';

let initialState = {
  currentTeam: null
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