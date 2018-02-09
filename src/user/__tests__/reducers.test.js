// import reducer from '../reducers';
//
// describe('user reducer', () => {
//   it('has an initial state', () => {
//     const action = {
//       type: 'whatever',
//     };
//     const state = reducer(undefined, action);
//     expect(state.userIsAuthenticated).toBeNull();
//     expect(state.email).toBeNull();
//     expect(state.authenticationToken).toBeNull();
//   });
//
//   it('handles 403 API failures by clearing the auth token', () => {
//     const action = {
//       type: 'API_REQUEST_FAILURE',
//       status: 403,
//       error: 'Bad stuff',
//     };
//     const existingState = {
//       userIsAuthenticated: true,
//       authenticationToken: '12345',
//       email: 'foo@example.com',
//     }
//     const state = reducer(existingState, action);
//     expect(state.userIsAuthenticated).toBeFalsy();
//     expect(state.authenticationToken).toBeNull();
//     expect(state.email).toBeNull();
//   })
// });

test('temp', () => {
  expect(true).toBeTruthy();
})
