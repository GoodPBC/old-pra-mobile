import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { API_REQUEST } from '../shared';

//const USER_LOGIN_PATH = 'users/sign_in';
const USER_LOGIN_PATH = 'dhsmobile/inspectionsqa/api/login'

export function submitLoginCredentials(email, password) {
  // FIXME: Re-enable authentication once StreetSmart has built it.
  return {
    type: LOGIN_USER,
    userIdString: email,
  };

  // return {
  //   type: API_REQUEST,
  //   actionName: LOGIN_USER,
  //   requestPath: USER_LOGIN_PATH,
  //   requestMethod: 'POST',
  //   endpoint: 'login',
  //   requestParams: {
  //     UserName: email,
  //     Password: password,
  //     IsMobileDevice: true
  //   }
  //   /*
  //   requestParams: {
  //     user: {
  //       email,
  //       password,
  //     }
  //   }
  //   */
  // };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}