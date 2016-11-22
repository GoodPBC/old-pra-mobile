import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { API_REQUEST } from '../shared';

const USER_LOGIN_PATH = 'users/sign_in';

export function submitLoginCredentials(email, password) {
  return {
    type: API_REQUEST,
    actionName: LOGIN_USER,
    requestPath: USER_LOGIN_PATH,
    requestMethod: 'POST',
    requestParams: {
      user: {
        email: email,
        password: password,
      }
    }
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}