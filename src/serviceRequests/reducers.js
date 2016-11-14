import {
  FETCH_RESOLUTION_CODES_SUCCESS,
  FETCH_SERVICE_REQUESTS_SUCCESS,
  FETCH_SERVICE_REQUESTS_FAILURE,
  FETCH_SERVICE_REQUEST_DETAILS_SUCCESS,
  RESOLVE_SERVICE_REQUEST_SUCCESS,
  SELECT_SERVICE_REQUEST,
  SELECT_SERVICE_REQUEST_RESOLUTION,
  UPDATE_ONSITE_STATUS_SUCCESS,
} from './actionTypes';

let initialState = {
  currentServiceRequest: null,
  resolutionCodes: [],
  serviceRequests: [],
  selectedResolutionCode: null,
};

function updateServiceRequestDetails(state, action) {
  return {
    ...state,
    currentServiceRequest: action.data.service_request,
  };
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case FETCH_SERVICE_REQUESTS_SUCCESS:
    return {
      ...state,
      serviceRequests: action.data.service_requests,
    };
  case FETCH_RESOLUTION_CODES_SUCCESS:
    return {
      ...state,
      resolutionCodes: action.data.resolutions,
    };
  case FETCH_SERVICE_REQUEST_DETAILS_SUCCESS:
    return updateServiceRequestDetails(state, action);
  case RESOLVE_SERVICE_REQUEST_SUCCESS:
    return updateServiceRequestDetails(state, action);
  case SELECT_SERVICE_REQUEST: // Works offline
    return {
      ...state,
      currentServiceRequest: action.serviceRequest,
    };
  case SELECT_SERVICE_REQUEST_RESOLUTION:
    return {
      ...state,
      selectedResolutionCode: action.selectedResolutionCode,
    };
  case UPDATE_ONSITE_STATUS_SUCCESS:
    return updateServiceRequestDetails(state, action);
  default:
    return state;
  }
}