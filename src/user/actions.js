import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { API_REQUEST } from '../shared';

//const USER_LOGIN_PATH = 'users/sign_in';
const USER_LOGIN_PATH = 'dhsmobile/inspectionsqa/api/login'

export function submitLoginCredentials(email, password) {
  return {
    type: API_REQUEST,
    actionName: LOGIN_USER,
    requestPath: USER_LOGIN_PATH,
    requestMethod: 'POST',
    requestParams: {
      UserName: email,
      Password: password,
      IsMobileDevice: true
    }
    /*
    requestParams: {
      user: {
        email,
        password,
      }
    }
    */
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}