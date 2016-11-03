let initialState = {
  serviceRequests: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case 'FETCH_SERVICE_REQUESTS_SUCCESS':
    return {
      ...state,
      serviceRequests: action.data.service_requests,
    };
  default:
    return state;
  }
}