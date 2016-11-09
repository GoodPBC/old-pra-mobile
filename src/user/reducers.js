import {
  FORBIDDEN_RESPONSE_STATUS,
} from '../shared';

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
  case 'API_REQUEST_FAILURE': // Reset the user auth status if necessary.
    if (action.status === FORBIDDEN_RESPONSE_STATUS) {
      return {
        ...state,
        userIsAuthenticated: false,
        authenticationToken: null,
        email: null,
      };
    } else {
      return state;
    }
  default:
    return state;
  }
}