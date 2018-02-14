import { Reducer } from 'redux-testkit';
import * as actionTypes from '../actionTypes';
import uut, { initialState } from '../reducers';
import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_REQUEST_NETWORK_ERROR,
} from '../../shared';

describe('app reducer', () => {
  it ('should return the initial state', () => {
    expect(uut(undefined, {})).toEqual(initialState);
  });

  it('should handle API failure by displaying an error message', () => {
    const action = {
      type: API_REQUEST_FAILURE,
      error: 'Oops!',
    };
    const existingState = {
      ...initialState,
      apiRequestInProgress: true,
    };
    const expectedState = {
      ...existingState,
      apiRequestInProgress: false,
      errorMessage: 'Oops!',
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle invalid token error', () => {
    const action = {
      type: API_REQUEST_FAILURE,
      error: '... invalid token ...',
    };
    const existingState = {
      ...initialState,
      apiRequestInProgress: true,
    };
    const expectedState = {
      ...existingState,
      apiRequestInProgress: false,
      errorTitle: 'Session Expired',
      errorMessage: 'Your session has expired. Please log in again.',
    };
    Reducer(uut).expect(action).toReturnState(expectedState);
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
    const expectedState = {
      ...existingState,
      errorTitle: null,
      errorMessage: null,
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle network error', () => {
    const action = {
      type: API_REQUEST_NETWORK_ERROR,
    };
    const existingState = {
      ...initialState,
      apiRequestInProgress: true,
    };
    const expectedState = {
      ...existingState,
      apiRequestInProgress: false,
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  })

  it('should set apiRequestInProgress to false with API_REQUEST_SUCCESS', () => {
    const action = {
      type: API_REQUEST_SUCCESS,
    };
    const existingState = {
      ...initialState,
      apiRequestInProgress: true,
    };
    const expectedState = {
      ...existingState,
      apiRequestInProgress: false,
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should set apiRequestInProgress to true with API_REQUEST', () => {
    const action = {
      type: API_REQUEST,
    };
    const existingState = {
      ...initialState,
      apiRequestInProgress: false,
    };
    const expectedState = {
      ...existingState,
      apiRequestInProgress: true,
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle UPDATE_DEVICE_INFO when no existing info', () => {
    const action = {
      type: actionTypes.UPDATE_DEVICE_INFO,
      deviceInfo: {
        someKey: 'someValue',
      },
    };
    const expectedState = {
      ...initialState,
      deviceInfo: {
        someKey: 'someValue',
      },
    };
    Reducer(uut).expect(action).toReturnState(expectedState);
  });

  it('should handle UPDATE_DEVICE_INFO by only updating the new info', () => {
    const action = {
      type: actionTypes.UPDATE_DEVICE_INFO,
      deviceInfo: {
        os: 'ios',
        someKey: 'newValue',
      },
    };
    const existingState = {
      ...initialState,
      deviceInfo: {
        someKey: 'oldValue',
      },
    };
    const expectedState = {
      ...existingState,
      deviceInfo: {
        os: 'ios',
        someKey: 'newValue',
      },
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle UPDATE_TAB_CONTEXT', () => {
    const action = {
      type: actionTypes.UPDATE_TAB_CONTEXT,
      context: '12345',
    };
    const existingState = {
      ...initialState,
      selectedTabContext: '00000',
    };
    const expectedState = {
      ...existingState,
      selectedTabContext: '12345',
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle tab change', () => {
    const action = {
      type: actionTypes.SELECT_TAB,
      selectedTab: 'newView',
    };
    const existingState = {
      ...initialState,
      selectedTab: 'oldView',
    };
    const expectedState = {
      ...existingState,
      selectedTab: 'newView',
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });
});
