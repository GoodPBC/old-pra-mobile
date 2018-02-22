import 'react-native';
import React from 'react';
import providerAPI, { BASE_URL } from '../providerAPI';
import { createStore } from 'redux';
import fetchMock from 'fetch-mock';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
describe('API middleware', () => {
  const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();
    const invoke = action => providerAPI(store)(next)(action);
    return { store, next, invoke };
  };

  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('calls the function', () => {
    const { invoke } = create();
    const fn = jest.fn();
    invoke(fn);
    expect(fn).toHaveBeenCalled();
  });

  it('passes dispatch and getState', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch('TEST DISPATCH');
      getState();
    })
    expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
    expect(store.getState).toHaveBeenCalled();
  });

  describe('dispatching API actions', () => {
    it('dispatches a success action for successful API_REQUEST actions');
    it('dispatches a failure action for failed API_REQUEST actions');
  });

});

// describe('API middleware', () => {
  // let reducer = null;
  // let initialState = null;
  // let store = null;
  // let next = null;
  // let middleware = null;

  // beforeEach(() => {
  //   fetchMock.reset();

  //   initialState = {
  //     user: {}
  //   };
  //   reducer = () => { return initialState };
  //   store = createStore(reducer);
  //   next = jest.fn();
  //   middleware = providerAPI(store)(next);
  // });

  // it('passes all actions through', async () => {
  //   const action = {
  //     type: 'foo',
  //   };

  //   await middleware(action);

  //   expect(next).toHaveBeenCalledWith(action);
  // });

//   describe('dispatching API actions', () => {
//     it('dispatches a success action for successful API_REQUEST actions', async () => {
//       const action = {
//         type: 'API_REQUEST',
//         requestMethod: 'get',
//         requestPath: 'service_requests',
//         actionName: 'FETCH_SERVICE_REQUESTS',
//       };
//       fetchMock.get(`${BASE_URL}service_requests`, {
//         serviceRequests: [],
//       });

//       await middleware(action);

//       expect(next).toHaveBeenLastCalledWith({
//         type: 'FETCH_SERVICE_REQUESTS_SUCCESS',
//         data: {
//           serviceRequests: []
//         }
//       });
//     });

//     it('dispatches a failure action for failed API_REQUEST actions', async () => {
//       const action = {
//         type: 'API_REQUEST',
//         requestMethod: 'get',
//         requestPath: 'bogus_path',
//         actionName: 'FETCH_FOOBAR',
//       };
//       fetchMock.mock(`${BASE_URL}bogus_path`, {
//         body: {
//           error: 'Some error message',
//         },
//         status: 400,
//       });

//       await middleware(action);

//       expect(next).toHaveBeenLastCalledWith({
//         type: 'FETCH_FOOBAR_FAILURE',
//         error: 'Some error message',
//         status: 400,
//       });
//     });
//   });
// });
