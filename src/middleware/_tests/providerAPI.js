// import 'react-native';
// import React from 'react';
// import providerAPI, { BASE_URL } from '../providerAPI.js';
// import { createStore } from 'redux';
// import fetchMock from 'fetch-mock';
//
// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';
//
// describe('API middleware', () => {
//   let reducer = null;
//   let initialState = null;
//   let store = null;
//   let next = null;
//   let middleware = null;
//
//   beforeEach(() => {
//     fetchMock.reset();
//
//     initialState = {
//       user: {}
//     };
//     reducer = () => { return initialState };
//     store = createStore(reducer);
//     next = jest.fn();
//     middleware = providerAPI(store)(next);
//   });
//
//   it('passes all actions through', async () => {
//     const action = {
//       type: 'foo',
//     };
//
//     await middleware(action);
//
//     expect(next).toHaveBeenCalledWith(action);
//   });
//
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
//
//       await middleware(action);
//
//       expect(next).toHaveBeenLastCalledWith({
//         type: 'FETCH_SERVICE_REQUESTS_SUCCESS',
//         data: {
//           serviceRequests: []
//         }
//       });
//     });
//
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
//
//       await middleware(action);
//
//       expect(next).toHaveBeenLastCalledWith({
//         type: 'FETCH_FOOBAR_FAILURE',
//         error: 'Some error message',
//         status: 400,
//       });
//     });
//   });
// });
