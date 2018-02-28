import Config from 'react-native-config';
import providerAPI from '../providerAPI';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
} from '../../shared';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('provider API middleware', () => {
  const create = mockedStore => {
    const store = mockedStore || {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();
    const invoke = action => providerAPI(store)(next)(action);
    return { store, next, invoke };
  };

  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('throws an error if endpoint does not exist', () => {
    const { invoke } = create();
    const actionName = 'TEST_ACTION';
    const requestPath = 'REQUEST_PATH';
    const action = {
      type: API_REQUEST,
      endpoint: 'does_not_exist',
      actionName,
      requestPath,
    };
    expect(() => invoke(action)).toThrow(`Invalid endpoint: ${requestPath} for action: ${actionName}`);
  });
  
  it('should dispatch API_REQUEST_SUCCESS and SUCCESS actions when the api request is successful', async () => {
    const store = mockStore({
      user: { userIsAuthenticated: true },
    });
    const { next, invoke } = create(store);
    const action = {
      type: 'API_REQUEST',
      requestMethod: 'get',
      endpoint: 'Get311ServiceRequests',
      requestPath: 'foobar',
      actionName: 'FOOBAR',
    };
    const mockResponse = {
      serviceRequests: [
        {
          sr_number: '1234',
        },
      ],
    };
    const expectedActions = [
      {
        type: API_REQUEST_SUCCESS,
      },
      {
        type: 'FOOBAR_SUCCESS',
        data: mockResponse,
      },
    ];
    
    fetchMock.getOnce(Config.BASE_URL + 'foobar', mockResponse);
    await invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches a failure action and API_REQUEST_FAILURE when an api request fails', async () => {
    const store = mockStore({ 
      user: { userIsAuthenticated: true },
    });
    const { next, invoke } = create(store);
    const action = {
      type: 'API_REQUEST',
      endpoint: 'Get311ServiceRequests',
      requestMethod: 'get',
      requestPath: 'foobar',
      actionName: 'FOOBAR',
    };

    const mockResponse = {
      body: {
        ErrorMessage: 'Some Error Message',
      },
      status: 400,
    };

    const expectedActions = [
      {
        type: API_REQUEST_FAILURE,
        action,
        status: 400,
        error: "400 Some Error Message",
      },
      {
        type: 'FOOBAR_FAILURE',
        request: action,
        status: 400,
        error: "400 Some Error Message",
      },
    ];

    fetchMock.getOnce(Config.BASE_URL + 'foobar', mockResponse);
    await invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('should dispatch LOG_OUT when failure is due to invalid token', async () => {
    const user = { userIsAuthenticated: true, userId: 'bear' };
    const store = mockStore({ user });
    const { next, invoke } = create(store);
    const action = {
      type: 'API_REQUEST',
      endpoint: 'Get311ServiceRequests',
      requestMethod: 'get',
      requestPath: 'foobar',
      actionName: 'FOOBAR',
    };

    const mockResponse = {
      body: {
        ErrorMessage: 'invalid token',
      },
      status: 400,
    };

    const expectedAction = {
      type: 'LOGOUT_USER',
      user,
    };

    fetchMock.getOnce(Config.BASE_URL + 'foobar', mockResponse);
    await invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});