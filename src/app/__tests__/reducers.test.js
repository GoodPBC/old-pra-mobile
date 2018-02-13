import { Reducer } from 'redux-testkit';
import * as actionTypes from '../actionTypes';
import uut, { initialState } from '../reducers';
import { API_REQUEST_FAILURE } from '../../shared';

describe('app reducer', () => {
  it ('should return the initial state', () => {
    expect(uut(undefined, {})).toEqual(initialState);
  });

  it('should handle API failure by displaying an error message', () => {
    const action = {
      type: API_REQUEST_FAILURE,
      error: 'Oops!',
    };
    const result = {
      ...initialState,
      errorMessage: 'Oops!',
    };
    Reducer(uut).expect(action).toReturnState(result);
  });

  it('should handle invalid token error', () => {
    const action = {
      type: API_REQUEST_FAILURE,
      error: '... invalid token ...',
    };
    const result = {
      ...initialState,
      errorTitle: 'Session Expired',
      errorMessage: 'Your session has expired. Please log in again.',
    };
    Reducer(uut).expect(action).toReturnState(result);
  });

  it('should clear error message', () => {
    const action = {
      type: actionTypes.CLEAR_ERROR_MESSAGE,
    };
    const existingState = {
      ...initialState,
      errorTitle: 'Error Title',
      errorMessage: 'Error Message',
    };
    const result = {
      ...existingState,
      errorTitle: null,
      errorMessage: null,
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(result);
  });

});
