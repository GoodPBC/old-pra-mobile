import {
  API_REQUEST_FAILURE,
  FORBIDDEN_RESPONSE_STATUS,
} from '../shared';

import {
  FETCH_TEAMS_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER,
  LOGOUT_USER,
} from './actionTypes';

const initialState = {
  authenticationToken: null,
  email: null,
  firstName: null,
  lastName: null,
  name: null,
  userId: null,
  userIdString: null, // NOTE: Need this for getuserteams endpoint.
  userIsAuthenticated: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN_USER:
    // FIXME: Remove this fake authentication.
    return {
      ...state,
      userIdString: action.userIdString,
      userIsAuthenticated: true,
    };
  case LOGIN_USER_SUCCESS:
    // FIXME: Test to make sure this is working once StreetSmart auth has been created.
    return {
      ...state,
      authenticationToken: action.data.Response.TokenString,
      email: action.data.Response.UserName,
      userId: action.data.Response.UserId,
      firstName: action.data.Response.FirstName,
      lastName: action.data.Response.LastName,
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