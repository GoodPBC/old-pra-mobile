const SERVICE_REQUEST_GET_URL = 'http://localhost:3000/api/v1/service_requests';

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
  default:
    break
  }

};