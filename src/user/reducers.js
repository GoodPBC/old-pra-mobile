import {
  API_REQUEST,
  API_REQUEST_FAILURE,
  FORBIDDEN_RESPONSE_STATUS,
} from '../shared';

import {
  LOGOUT_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER_SUCCESS,
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
        ...initialState,
      };
    }
    return state;
  case LOGOUT_USER:
    return {
      ...initialState,
    }
  case LOGOUT_USER_SUCCESS:
    return {
      ...initialState,
    };
  default:
    return state;
  }
}