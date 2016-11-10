import {
  FETCH_SERVICE_REQUESTS_SUCCESS,
  FETCH_SERVICE_REQUESTS_FAILURE,
  FETCH_SERVICE_REQUEST_DETAILS_SUCCESS,
  SELECT_SERVICE_REQUEST,
  UPDATE_ONSITE_STATUS_SUCCESS,
} from './actionTypes';

let initialState = {
  currentServiceRequest: null,
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
    };
  case FETCH_SERVICE_REQUEST_DETAILS_SUCCESS:
    return {
      ...state,
      currentServiceRequest: action.data.service_request,
    };
  case SELECT_SERVICE_REQUEST: // Works offline
    return {
      ...state,
      currentServiceRequest: action.serviceRequest,
    };
  case UPDATE_ONSITE_STATUS_SUCCESS:
    return {
      ...state,
      currentServiceRequest: action.data.service_request,
    }
  default:
    return state;
  }
}