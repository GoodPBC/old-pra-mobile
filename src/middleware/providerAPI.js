const BASE_URL = 'http://localhost:3000/api/v1/'
//const BASE_URL = 'https://provider-response-app-staging.herokuapp.com/api/v1/' 

const SERVICE_REQUEST_GET_URL =  BASE_URL + 'service_requests';
const LOGIN_USER_URL = BASE_URL + 'users/sign_in';

export default store => next => action => {
  next(action)
  switch (action.type) {
  case 'FETCH_SERVICE_REQUESTS':
    fetch(SERVICE_REQUEST_GET_URL)
      .then(response => {
        return response.json();
      })
      .then(json => {
        next({
          type: 'FETCH_SERVICE_REQUESTS_SUCCESS',
          data: json
        })
      })
      .catch(err => {
        return next({
          type: 'FETCH_SERVICE_REQUESTS_FAILURE',
          error: err
        })
      })
    break
  case 'LOGIN_USER':
    fetch(LOGIN_USER_URL)
      .then(response => {
        return response.json()
      })
      .then(json => {
        next({
          type: 'LOGIN_USER_SUCCESS',
          data: json
        })
      })
      .catch(err => {
        return next({
          type: 'LOGIN_USER_FAILURE',
          error: err
        })
      })
    break
  default:
    break
  }

};