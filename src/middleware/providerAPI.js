/* global fetch */
/** eslint no-console: 0 */
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
      token: state.authenticationToken,
      userid: state.userId,
    };
  }
  return {};
}

async function makeRequestAndDispatchResponse({ action, store }) {
  const { onSuccess, requestMethod, requestParams, actionName, requestType } = action;

  function dispatchSuccess(json) {
    console.log('request succesful');
    console.log(json);
    store.dispatch({
      type: API_REQUEST_SUCCESS,
    });
    store.dispatch({
      type: `${actionName}_SUCCESS`,
      data: json,
    });
    if (onSuccess) {
      onSuccess();
    }
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
  //if (requestType && requestType === 'external'){
  //  console.log('hitting external api');
  //} else {
    const url = `${Config.BASE_URL}${action.requestPath}`;
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

    let responseText = null;

    try {
      // const textBody = await response.text();
      // console.log('body', textBody);
      responseText = await response.text();
      const json = JSON.parse(responseText);
      // console.log('json response', json);
      // console.log('response text', responseText);
      if (json.Update_Status) {
        console.log('Updating SR', json.Update_Status);
      }
      if (response.ok && !(json.ErrorMessage && json.ErrorMessage.length)) {
        dispatchSuccess(json);
      } else {
        dispatchFailure(json.ErrorMessage, response.status);
      }
    } catch (e) {
      console.log('response text', responseText);
      dispatchFailure(e, response.status);
    }
  //}
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