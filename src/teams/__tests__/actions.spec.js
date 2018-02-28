import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import Config from 'react-native-config';

import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import { API_REQUEST, API_REQUEST_FAILURE } from '../../shared';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Team Redux Actions', () => {
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
    const expectedActions = [
      {
        type: actionTypes.JOIN_TEAM,
        team: { id: 1, name: 'Team 1' },
        oldTeam: null,
      },
      {
        type: API_REQUEST,
        actionName: actionTypes.UPDATE_TEAM_LOCATION,
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
      user: { userId: 'USER_ID', latitude: 'LATITUDE', longitude: 'LONGITUDE' },
      app: { deviceInfo: { deviceToken: 'DEVICE_TOKEN', os: 'OS' } },
      teams: { currentTeamId: 'CURRENT_TEAM_ID' },
    });

    store.dispatch(actions.joinTeam({ id: 1, name: 'Team 1' }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  
});
