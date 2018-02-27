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
  
  // it('dispatches a success action for successful API_REQUEST actions', () => {
  //   const { store, next, invoke } = create();
  //   const action = {
  //     type: API_REQUEST,
  //     requestMethod: 'get',
  //     endpoint: 'Get311ServiceRequests',
  //     requestPath: 'foobar',
  //     actionName: 'FOOBAR',
  //   };
  //   // fetchMock.get(
  //   //   Config.BASE_URL + 'foobar',
  //   //   {
  //   //     serviceRequests: [],
  //   //   }
  //   // );
  //   invoke(action);
  //   expect(store.dispatch).toHaveBeenCalledWith({
  //     type: API_REQUEST_SUCCESS,
  //   });
  // });

  it('dispatches a failure action for failed API_REQUEST actions', async () => {
    const store = mockStore({ 
      user: { },
    })
    const { next, invoke } = create(store);
    const action = {
      type: 'API_REQUEST',
      endpoint: 'Get311ServiceRequests',
      requestMethod: 'get',
      requestPath: 'foobar',
      actionName: 'FOOBAR',
    };

    fetchMock.mock(`${Config.BASE_URL}foobar`, {
      body: {
        error: 'Some error message',
      },
      status: 400,
    });

    await invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(store.getActions()).toEqual([]);
    // expect(next).toHaveBeenLastCalledWith({
      // type: 'FETCH_FOOBAR_FAILURE',
      // error: 'Some error message',
      // status: 400,
    // });
  });


  it('should dispatch with appropriate authentication headers');
  it('should log the user out when failure is due to invalid token');
  it('should dispatch API_REQUEST_SUCCESS and another SUCCESS action when the request is successful');
});

// describe('API middleware', () => {

// });
