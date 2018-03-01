import Config from 'react-native-config';
import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER_POSITION,
} from './actionTypes';
import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
} from '../shared';
import { setApiRequestInProgress } from '../app/actions';
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
  return dispatch => {
    dispatch(setApiRequestInProgress(true));

    const url = Config.BASE_URL + USER_LOGOUT_PATH;
    const header = {
      'Content-Type': 'application/json',
      token: user.authenticationToken,
      userid: user.userId,
    };
    return fetch(url, { header })
      .then(res => {
        if (!res.ok) {
          throw Error(`${res.status} ${res.statusText}`);
        } else {
          dispatch({ type: LOGOUT_USER, user });
          dispatch({ type: API_REQUEST_SUCCESS });
        }
      })
      .catch(e => {
        dispatch({ type: LOGOUT_USER, user });
        dispatch({ type: API_REQUEST_FAILURE, error: e.message });
      });
  };
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
