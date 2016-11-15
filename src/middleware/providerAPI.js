import {
  API_REQUEST,
  API_REQUEST_SUCCESS,
  API_REQUEST_FAILURE,
  API_REQUEST_NETWORK_ERROR,
} from '../shared';

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

async function makeRequestAndDispatchResponse({action, next, store }) {
  const { requestMethod, requestParams, actionName } = action;
  const url = `${BASE_URL}${action.requestPath}`;

  function dispatchSuccess(json) {
    store.dispatch({
      type: API_REQUEST_SUCCESS,
    })
    return store.dispatch({
      type: `${actionName}_SUCCESS`,
      data: json
    });
  }

  function dispatchNetworkFailure(action, error) {
    store.dispatch({
      type: API_REQUEST_NETWORK_ERROR,
      action,
      error,
    });
  }

  function dispatchFailure(error, status) {
    store.dispatch({
      type: API_REQUEST_FAILURE,
      action: action,
      status,
      error,
    })

    return store.dispatch({
      type: `${actionName}_FAILURE`,
      status,
      error: error
    });
  }

  let body = '';
  if (requestParams) {
    body = JSON.stringify(requestParams);
  }
  const headers = {
    'Content-Type': 'application/json'
  };
  Object.assign(headers, authenticationHeaders(store));
  let response = null;
  try {
    response = await fetch(url, {
      method: requestMethod,
      body,
      headers,
    });
    const json = await response.json();
    if (response.ok) {
      dispatchSuccess(json);
    } else {
      dispatchFailure(json['error'], response.status);
    }
  } catch (e) {
    dispatchNetworkFailure(action, e);
  }
}

export default store => next => action => {
  next(action)
  if (action.type !== API_REQUEST) {
    return;
  }
  return makeRequestAndDispatchResponse({
    action, next, store });
};