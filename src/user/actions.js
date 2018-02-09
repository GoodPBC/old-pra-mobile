import Config from 'react-native-config';
import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER_POSITION,
} from './actionTypes';
import {
  API_REQUEST,
  API_REQUEST_NETWORK_ERROR,
} from '../shared';
import { updateTeamLocation } from '../teams/actions';

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
    const url = Config.BASE_URL + USER_LOGOUT_PATH;
    const header = {
      'Content-Type': 'application/json',
      token: user.authenticationToken,
      userid: user.userId,
    };
    return fetch(url, { header })
      .then(res => {
        dispatch({ type: LOGOUT_USER, user });
      })
      .catch(e => {
        dispatch({ type: API_REQUEST_NETWORK_ERROR });
        dispatch({ type: LOGOUT_USER, user });
      });
  }
}

export function updateUserPosition(position) {
  return dispatch => {
    dispatch({
      type: UPDATE_USER_POSITION,
      position,
    });
    dispatch(updateTeamLocation());
  };
}
