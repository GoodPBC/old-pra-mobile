import {
  FETCH_SERVICE_REQUESTS_SUCCESS,
  FETCH_SERVICE_REQUESTS_FAILURE,
} from './actionTypes';

let initialState = {
  serviceRequests: []
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case FETCH_SERVICE_REQUESTS_SUCCESS:
    return {
      ...state,
      serviceRequests: action.data.service_requests,
    };
  case FETCH_SERVICE_REQUESTS_FAILURE:
    // Clear out the existing requests if the fetch failed, because we don't
    // know whether the data is out of sync.
    return {
      ...state,
      serviceRequests: [],
    }
  default:
    return state;
  }
}