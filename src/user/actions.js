import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { API_REQUEST } from '../shared';

const USER_LOGIN_PATH = 'authenticateuser';
const USER_LOGOUT_PATH = 'logoutuser';

export function submitLoginCredentials(email, password) {
  return {
    type: API_REQUEST,
    actionName: LOGIN_USER,
    requestPath: USER_LOGIN_PATH,
    requestMethod: 'POST',
    endpoint: 'login',
    requestParams: {
      UserName: email,
      Password: password,
    }
  };
}

export function logoutUser(user) {
  return (dispatch, getState) => {
    dispatch({
      type: API_REQUEST,
      actionName: LOGOUT_USER,
      requestPath: USER_LOGOUT_PATH,
      requestMethod: 'GET',
      endpoint: 'login',
    });
    // Works offline as well.
    dispatch({
      type: LOGOUT_USER,
      user,
    });
  }
}
