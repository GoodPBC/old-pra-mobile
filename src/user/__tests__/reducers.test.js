import { Reducer } from 'redux-testkit';
import * as actionTypes from '../actionTypes';
import uut, { initialState } from '../reducers';

describe('user reducer', () => {
  it ('should return the initial state', () => {
    expect(uut(undefined, {})).toEqual(initialState);
  })

  it('should handle UPDATE_USER_POSITION', () => {
    const latitude = 0.123456789;
    const longitude = 0.987654321;
    const timestamp = 1518457844013;

    const action = {
      type: actionTypes.UPDATE_USER_POSITION,
      position: { latitude, longitude, timestamp },
    };
    const result = {
      ...initialState,
      latitude,
      longitude,
      positionTimestamp: timestamp,
    };

    Reducer(uut).expect(action).toReturnState(result);
  });

  it('should handle LOGIN_USER_SUCCESS', () => {
    const action = {
      type: actionTypes.LOGIN_USER_SUCCESS,
      data: {
        TokenString: 'AUTH_TOKEN',
        UserEmail: 'foo@example.com',
        UserId: 0,
        UserName: 'Foo Bar',
        UserAccountName: 'test',
      },
    };
    const result = {
      ...initialState,
      authenticationToken: 'AUTH_TOKEN',
      email: 'foo@example.com',
      userId: 0,
      name: 'Foo Bar',
      userAccountName: 'test',
      userIsAuthenticated: true,
    };
    Reducer(uut).expect(action).toReturnState(result);
  });

  it('should handle LOGIN_USER_FAILURE', () => {
    const action = {
      type: actionTypes.LOGIN_USER_FAILURE,
    };
    const result = {
      ...initialState,
      userIsAuthenticated: false,
    };
    Reducer(uut).expect(action).toReturnState(result);
  });

  it('handles 403 API failures by clearing the auth token', () => {
    const action = {
      type: 'API_REQUEST_FAILURE',
      status: 403,
      error: 'Bad stuff',
    };
    const existingState = {
      ...initialState,
      userIsAuthenticated: true,
      authenticationToken: '12345',
      email: 'foo@example.com',
    }
    Reducer(uut).withState(existingState).expect(action).toReturnState(initialState);
  });

  it('should handle LOGOUT_USER', () => {
    const action = {
      type: actionTypes.LOGOUT_USER,
    };
    const existingState = {
      ...initialState,
      authenticationToken: 'AUTH_TOKEN',
      email: 'foo@example.com',
      userId: 0,
      name: 'Foo Bar',
      userAccountName: 'test',
      userIsAuthenticated: true,
    }
    Reducer(uut).withState(existingState).expect(action).toReturnState(initialState);
  });

});
