// const BASE_URL = 'http://0.0.0.0:3000/api/v1/'
const BASE_URL = 'https://pra-cms-stage.herokuapp.com/api/v1/';

const SERVICE_REQUEST_GET_URL =  BASE_URL + 'service_requests';
const LOGIN_USER_URL = BASE_URL + 'users/sign_in';

function authenticationHeaders(store) {
  const state = store.getState().user;
  if (state.userIsAuthenticated) {
    return {
      'X-User-Email': state.email,
      'X-User-Token': state.authenticationToken
    }
  } else {
    return {};
  }
}

function getAndDispatchResponse({ url, actionName, next, store }) {
  const fetchOptions = {
    headers: authenticationHeaders(store)
  };
  return dispatchFetchResponse(fetch(url, fetchOptions), actionName, next, store);
}

function postAndDispatchResponse({url, postParams, actionName, next, store}) {
  const body = JSON.stringify(postParams);
  const headers = {
    'Content-Type': 'application/json'
  };
  Object.assign(headers, authenticationHeaders(store));
  let fetchPromise = fetch(url, {
    method: 'post',
    body,
    headers,
  });
  return dispatchFetchResponse(fetchPromise, actionName, next);
}

/**
 * Dispatch appropriate success / failure actions based on the status
 * of the response.
 *
 * Non-2xx responses will dispatch as failure with an error message.
 * Errors parsing the response will dispatch as failures.
 */
function dispatchFetchResponse(fetchPromise, actionName, next) {
  function dispatchSuccess(json) {
    return next({
      type: `${actionName}_SUCCESS`,
      data: json
    });
  }

  function dispatchFailure(error) {
    return next({
      type: `${actionName}_FAILURE`,
      error: error
    });
  }

  return fetchPromise.then(response => {
    return response.json().then(json => {
      if (response.ok) {
        return dispatchSuccess(json);
      } else {
        return dispatchFailure(json['error']);
      }
    });
  })
  .catch(dispatchFailure);
}

export default store => next => action => {
  next(action)
  switch (action.type) {
  case 'FETCH_SERVICE_REQUESTS':
    getAndDispatchResponse({url: SERVICE_REQUEST_GET_URL, actionName: 'FETCH_SERVICE_REQUESTS', next, store });
    break;
  case 'LOGIN_USER':
    const postParams = {
      user: {
        email: action.data.email,
        password: action.data.password
      }
    };
    postAndDispatchResponse({url: LOGIN_USER_URL, actionName: 'LOGIN_USER', postParams, next, store });
    break;
  default:
    break
  }
};