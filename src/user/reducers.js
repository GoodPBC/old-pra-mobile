import {
  API_REQUEST_FAILURE,
  FORBIDDEN_RESPONSE_STATUS,
} from '../shared';

import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from './actionTypes';

const initialState = {
  authenticationToken: null,
  email: null,
  firstName: null,
  lastName: null,
  name: null,
  userId: null,
  userAccountName: null, // NOTE: Need this for getuserteams endpoint.
  userIsAuthenticated: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_USER_SUCCESS:
    return {
      ...state,
      authenticationToken: action.data.TokenString,
      email: action.data.UserEmail,
      userId: action.data.UserId,
      name: action.data.UserName,
      userAccountName: action.data.UserAccountName,
      userIsAuthenticated: true,
    };
  case LOGIN_USER_FAILURE:
    return {
      ...state,
      userIsAuthenticated: false,
    };
  case API_REQUEST_FAILURE: // Reset the user auth status if necessary.
    if (action.status === FORBIDDEN_RESPONSE_STATUS) {
      return {
        ...state,
        userIsAuthenticated: false,
        authenticationToken: null,
        email: null,
        firstName: null,
        lastName: null,
        name: null,
        userId: null,
      };
    }
    return state;
  case LOGOUT_USER:
    return {
      ...state,
      authenticationToken: null,
      email: null,
      firstName: null,
      lastName: null,
      name: null,
      userId: null,
      userIsAuthenticated: false,
    };
  default:
    return state;
  }
}