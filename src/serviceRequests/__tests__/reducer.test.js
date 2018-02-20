import { Reducer } from 'redux-testkit';
import * as actionTypes from '../actionTypes';
import uut, { initialState } from '../reducer';
import { LOGOUT_USER } from '../../user/actionTypes';

describe('team reducer', () => {
  it('should return the initial state', () => {
    expect(uut(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_SERVICE_REQUESTS_SUCCESS');
  it('should handle MARK_PENDING_STATUS');
  it('should handle RERENDER_SERVICE_REQUESTS');
  it('should handle SELECT_SERVICE_REQUEST');
  it('should handle SELECT_SERVICE_REQUEST_RESOLUTION');
  it('should handle SYNC_SERVICE_REQUESTS');
  it('should handle UPDATE_RESOLUTION_NOTES');
  
  it('should reset to initialState on LOGOUT_USER', () => {
    const action = {
      type: LOGOUT_USER,
    };
    const existingState = {
      ...initialState,
      serviceRequests: [
        { sr_number: 1 },
        { sr_number: 2 },
      ],
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(initialState);
  });

});