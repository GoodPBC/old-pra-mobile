import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import Config from 'react-native-config';

import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import {
  API_REQUEST,
} from '../../shared';

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
    ];

    const store = mockStore({ user: {} });

    return store.dispatch(actions.logoutUser({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
})
