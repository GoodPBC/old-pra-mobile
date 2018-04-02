import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import Config from 'react-native-config';

import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import { API_REQUEST, API_REQUEST_FAILURE, API_REQUEST_SUCCESS } from '../../shared';
import { UPDATE_TEAM_LOCATION } from '../../teams/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Redux Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to log in an user', () => {
    const username = 'username';
    const password = 'password';
    const expectedAction = {
      type: API_REQUEST,
      actionName: actionTypes.LOGIN_USER,
      requestPath: 'authenticateuser',
      requestMethod: 'POST',
      endpoint: 'login',
      requestParams: {
        UserName: username,
        Password: password,
      },
    };
    expect(actions.submitLoginCredentials(username, password)).toEqual(expectedAction);
  });

  it('should create an action to log out an user', () => {
    fetchMock.getOnce(
      Config.BASE_URL + 'logoutuser',
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const expectedActions = [
      { type: actionTypes.LOGOUT_USER, user: {} },
      { type: 'SET_API_REQUEST_IN_PROGRESS', apiRequestInProgress: true },
      { type: API_REQUEST_SUCCESS },
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(actions.logoutUser({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should still log out with non-OK status', () => {
    fetchMock.getOnce(
      Config.BASE_URL + 'logoutuser',
      {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
        body: {
          ErrorMessage: 'Something went wrong!'
        }
      }
    );

    const expectedActions = [
      { type: actionTypes.LOGOUT_USER, user: {} },
      { type: 'SET_API_REQUEST_IN_PROGRESS', apiRequestInProgress: true },
      { type: API_REQUEST_FAILURE, error: '400 Bad Request' },
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(actions.logoutUser({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to update user location', () => {
    const position = {
      latitude: 'LATITUDE',
      longitude: 'LONGITUDE',
      timestamp: 'TIMESTAMP',
    };

    const expectedActions = [
      { type: actionTypes.UPDATE_USER_POSITION, position },
      {
        type: API_REQUEST,
        actionName: UPDATE_TEAM_LOCATION,
        endpoint: 'updateteamlocation',
        requestPath: 'updateteamlocation',
        requestMethod: 'POST',
        requestParams: {
          DeviceId: 'DEVICE_TOKEN',
          Platform: 'OS',
          Latitude: 'LATITUDE',
          Longitude: 'LONGITUDE',
          TeamId: 'CURRENT_TEAM_ID',
          UserId: 'USER_ID',
        },
      },
    ];

    const store = mockStore({
      user: { userId: 'USER_ID', latitude: position.latitude, longitude: position.longitude, positionTimestamp: position.timestamp },
      app: { deviceInfo: { deviceToken: 'DEVICE_TOKEN', os: 'OS' } },
      teams: { currentTeamId: 'CURRENT_TEAM_ID' },
    });

    store.dispatch(actions.updateUserPosition(position));
    expect(store.getActions()).toEqual(expectedActions);
  });
})
