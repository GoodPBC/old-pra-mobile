let initialState = {
  authenticationToken: null,
  email: null,
  userIsAuthenticated: null,
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case 'LOGIN_USER_SUCCESS':
    return {
      ...state,
      authenticationToken: action.data.user.authentication_token,
      email: action.data.user.email,
      userIsAuthenticated: true,
    };

  case 'LOGIN_USER_FAILURE':
    return {
      ...state,
      userIsAuthenticated: false,
    }
  default:
    return state;
  }
}