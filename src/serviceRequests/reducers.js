import {
  FETCH_RESOLUTION_CODES_SUCCESS,
  FETCH_SERVICE_REQUESTS_SUCCESS,
  FETCH_SERVICE_REQUEST_DETAILS_SUCCESS,
  RESOLVE_SERVICE_REQUEST,
  RESOLVE_SERVICE_REQUEST_SUCCESS,
  SELECT_SERVICE_REQUEST,
  SELECT_SERVICE_REQUEST_RESOLUTION,
  UPDATE_ONSITE_STATUS,
  UPDATE_ONSITE_STATUS_SUCCESS,
  ADD_CONTACT_TO_SERVICE_REQUEST
} from './actionTypes';

import {
  API_REQUEST,
} from '../shared';

const initialState = {
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

function setFlagOnCurrentServiceRequest(state, flagName) {
  // Send a pending flag to avoid running the action multiple times.
  const { currentServiceRequest } = state;
  // Kind of hack-y because it involves mutating state.
  currentServiceRequest[flagName] = true;
  return {
    ...state,
    currentServiceRequest: {
      ...currentServiceRequest,
    },
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case API_REQUEST:
      if (action.actionName === UPDATE_ONSITE_STATUS) {
        return setFlagOnCurrentServiceRequest(state, 'pendingOnsite');
      } else if (action.actionName === RESOLVE_SERVICE_REQUEST) {
        return setFlagOnCurrentServiceRequest(state, 'pendingResolution');
      }

      return state;
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
    case ADD_CONTACT_TO_SERVICE_REQUEST:
      return {
        ...state,
        currentServiceRequest: action.serviceRequest,
      };
    default:
      return state;
  }
}