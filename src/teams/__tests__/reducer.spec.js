import { Reducer } from 'redux-testkit';
import * as actionTypes from '../actionTypes';
import uut, { initialState } from '../reducer';
import { LOGOUT_USER } from '../../user/actionTypes';

describe('team reducer', () => {
  it ('should return the initial state', () => {
    expect(uut(undefined, {})).toEqual(initialState);
  });

  it('should reset to initialState on logout', () => {
    const action = {
      type: LOGOUT_USER,
    };
    const existingState = {
      ...initialState,
      currentTeamId: 1,
      teams: [
        { id: 1, name: 'Team 1' },
        { id: 2, name: 'Team 2' },
      ],
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(initialState);
  });

  it('should handle FETCH_TEAMS_SUCCESS with teams', () => {
    const action = {
      type: actionTypes.FETCH_TEAMS_SUCCESS,
      data: {
        Team_Info: [
          { TeamId: 1, Team_Name: 'Team 1' },
          { TeamId: 2, Team_Name: 'Team 2' },
        ],
      },
    };
    const expectedState = {
      ...initialState,
      canSelectTeams: true,
      teams: [
        { id: 1, name: 'Team 1' },
        { id: 2, name: 'Team 2' },
      ],
    };
    Reducer(uut).expect(action).toReturnState(expectedState);
  });

  it('should handle FETCH_TEAMS_SUCCESS with no teams', () => {
    const action = {
      type: actionTypes.FETCH_TEAMS_SUCCESS,
      data: {
        Team_Info: null,
      },
    };
    const existingState = {
      ...initialState,
      canSelectTeams: true,
      teams: [
        { id: 1, name: 'Team 1' },
        { id: 2, name: 'Team 2' },
      ],
    };
    const expectedState = {
      ...existingState,
      canSelectTeams: false,
      teams: [],
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  })

  it('should handle JOIN_TEAM', () => {
    const action = {
      type: actionTypes.JOIN_TEAM,
      team: {
        id: 3,
        name: 'Team 3',
      },
    };
    const expectedState = {
      ...initialState,
      currentTeamId: 3,
    };
    Reducer(uut).expect(action).toReturnState(expectedState);
  });

  it('should handle SELECT_TEAM', () => {
    const action = {
      type: actionTypes.SELECT_TEAM,
      team: {
        id: 4,
        name: 'Team 4',
      },
    };
    const expectedState = {
      ...initialState,
      selectedTeamId: 4,
    };
    Reducer(uut).expect(action).toReturnState(expectedState);
  })
});
