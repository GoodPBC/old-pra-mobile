import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import Config from 'react-native-config';

import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import { API_REQUEST, API_REQUEST_FAILURE } from '../../shared';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User Redux Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create an action to fetch teams', () => {
    const expectedActions = [
      {
        type: API_REQUEST,
        actionName: actionTypes.FETCH_TEAMS,
        requestPath: `getuserteams/sample_user`,
        requestMethod: 'GET',
        endpoint: 'getuserteams',
      }
    ];

    const store = mockStore({
      user: { userAccountName: 'sample_user' },
    });

    store.dispatch(actions.fetchTeams());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create a join-team action', () => {

  })
});
