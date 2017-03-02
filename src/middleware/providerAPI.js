/* global fetch */
import Config from 'react-native-config';

import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_REQUEST_NETWORK_ERROR,
} from '../shared';

const API_ENDPOINTS = [
  'Get311ServiceRequests',
  'getuserteams',
  'update311servicerequests',
  'updatepingresponse',
  'login',
];

function authenticationHeaders(store) {
  const state = store.getState().user;
  if (state.userIsAuthenticated) {
    return {
      'TokenString': state.authenticationToken,
      'Id': state.userId,
    };
  }
  return {};
}

async function makeRequestAndDispatchResponse({ action, store }) {
  const { requestMethod, requestParams, actionName } = action;
  const url = `${Config.BASE_URL}${action.requestPath}`;
  function dispatchSuccess(json) {
    store.dispatch({
      type: API_REQUEST_SUCCESS,
    });
    return store.dispatch({
      type: `${actionName}_SUCCESS`,
      data: json,
    });
  }

  function dispatchNetworkFailure(error) {
    store.dispatch({
      type: API_REQUEST_NETWORK_ERROR,
      action,
      error,
    });
  }

  function dispatchFailure(error, status) {
    store.dispatch({
      type: API_REQUEST_FAILURE,
      action,
      status,
      error,
    });

    return store.dispatch({
      type: `${actionName}_FAILURE`,
      status,
      error,
    });
  }
  console.log('url', url);
  let body = '';
  if (requestMethod === 'GET' || requestMethod === 'get') {
    // Otherwise fails on Android.
    body = null;
  } else if (requestParams) {
    body = JSON.stringify(requestParams);
  }
  const headers = {
    'Content-Type': 'application/json',
  };
  Object.assign(headers, authenticationHeaders(store));
  let response = null;
  try {
    response = await fetch(url, {
      method: requestMethod,
      body,
      headers,
    });
  } catch (e) {
    dispatchNetworkFailure(e);
    return;
  }

  try {
    // const textBody = await response.text();
    // console.log('body', textBody);
    const json = await response.json();
    // console.log('json response', json);
    if (response.ok) {
      dispatchSuccess(json);
    } else {
      dispatchFailure(json.error, response.status);
    }
  } catch (e) {
    dispatchFailure(e, response.status);
  }
}

export default store => next => action => {
  next(action);
  if (action.type === API_REQUEST) {
    if (API_ENDPOINTS.indexOf(action.endpoint) === -1) {
      throw `Invalid endpoint: ${action.requestPath} for action: ${action.actionName}`;
    }
    makeRequestAndDispatchResponse({
      action, store });
  }
};