const BASE_URL = 'http://localhost:3000/api/v1/'
//const BASE_URL = 'https://provider-response-app-staging.herokuapp.com/api/v1/'

const SERVICE_REQUEST_GET_URL =  BASE_URL + 'service_requests';
const LOGIN_USER_URL = BASE_URL + 'users/sign_in';

function getAndDispatchResponse(url, actionName, next) {
  return dispatchFetchResponse(fetch(url), actionName, next);
}

function postAndDispatchResponse(url, postParams, actionName, next) {
  const body = JSON.stringify(postParams);
  const headers = {
    'Content-Type': 'application/json'
  };
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
    getAndDispatchResponse(SERVICE_REQUEST_GET_URL, 'FETCH_SERVICE_REQUESTS', next);
    break;
  case 'LOGIN_USER':
    const postParams = {
      user: {
        email: action.data.email,
        password: action.data.password
      }
    };
    postAndDispatchResponse(LOGIN_USER_URL, postParams, 'LOGIN_USER', next);
    break;
  default:
    break
  }
};