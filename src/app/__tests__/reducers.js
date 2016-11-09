import appReducer from '../reducers';

describe('app reducer', () => {
  it('has an initial state', () => {
    const action = {
      type: 'foo',
    };
    expect(appReducer(undefined, action)).toBeTruthy();
  });

  it('handles API failures by displaying an error message', () => {
    const action = {
      type: 'API_REQUEST_FAILURE',
      error: 'Here is an error',
    };
    expect(appReducer(undefined, action).errorMessage).toBe('Here is an error');
  });
});