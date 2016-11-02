let initialState = {
  serviceRequests: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case 'FETCH_SERVICE_REQUESTS_SUCCESS':
    return {
      ...state,
      serviceRequests: action.data,
    };
  case 'LOGIN_USER_SUCCESS':
    return {
      ...state,
      loginData: action.data
    };
  default:
    return state;
  }
}