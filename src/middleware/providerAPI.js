import { API_REQUEST, API_REQUEST_SUCCESS, API_REQUEST_FAILURE } from '../shared';

export const BASE_URL = 'http://0.0.0.0:3000/api/v1/';
// export const BASE_URL = 'https://pra-cms-stage.herokuapp.com/api/v1/';

function authenticationHeaders(store) {
  const state = store.getState().user;
  if (state.userIsAuthenticated) {
    return {
      'X-User-Email': state.email,
      'X-User-Token': state.authenticationToken
    };
  } else {
    return {};
  }
}

async function makeRequestAndDispatchResponse({ url, requestMethod, requestParams, actionName, next, store }) {
  let body = '';
  if (requestParams) {
    body = JSON.stringify(requestParams);
  }
  const headers = {
    'Content-Type': 'application/json'
  };
  Object.assign(headers, authenticationHeaders(store));
  const response = await fetch(url, {
    method: requestMethod,
    body,
    headers,
  });
  return dispatchFetchResponse(response, actionName, next);
}

/**
 * Dispatch appropriate success / failure actions based on the status
 * of the response.
 *
 * Non-2xx responses will dispatch as failure with an error message.
 * Errors parsing the response will dispatch as failures.
 */
async function dispatchFetchResponse(response, actionName, next) {
  function dispatchSuccess(json) {
    next({
      type: API_REQUEST_SUCCESS,
    })
    return next({
      type: `${actionName}_SUCCESS`,
      data: json
    });
  }

  function dispatchFailure(error, status) {
    next({
      type: API_REQUEST_FAILURE,
      status,
      error,
    })

    return next({
      type: `${actionName}_FAILURE`,
      status,
      error: error
    });
  }

  try {
    const json = await response.json();
    if (response.ok) {
      dispatchSuccess(json);
    } else {
      dispatchFailure(json['error'], response.status);
    }
  } catch(e) {
    dispatchFailure(e, response.status);
  }
}

export default store => next => action => {
  next(action)
  if (action.type !== API_REQUEST) {
    return;
  }
  const url = `${BASE_URL}${action.requestPath}`;
  return makeRequestAndDispatchResponse({
    url: url,
    requestParams: action.requestParams,
    requestMethod: action.requestMethod,
    actionName: action.actionName,
    next, store });
};