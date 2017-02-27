import {
    FETCH_RESOLUTION_CODES,
    FETCH_SERVICE_REQUESTS,
    FETCH_SERVICE_REQUEST_DETAILS,
    RESOLVE_SERVICE_REQUEST,
    SELECT_SERVICE_REQUEST,
    SELECT_SERVICE_REQUEST_RESOLUTION,
    UPDATE_ONSITE_STATUS,
    ADD_CONTACT_TO_SERVICE_REQUEST,
    UPDATE_SERVICE_REQUESTS_WITH_NOTES
} from './actionTypes';
import { API_REQUEST } from '../shared';

const RESOLUTION_CODES_PATH = 'resolutions';
const SERVICE_REQUESTS_PATH = 'service_requests';

export function selectServiceRequestResolution(resolutionCode) {
  return {
    type: SELECT_SERVICE_REQUEST_RESOLUTION,
    selectedResolutionCode: resolutionCode,
  };
}

export function fetchResolutionCodes() {
  return (dispatch, getState) => {
    // Only fetch the list of resolution codes if they aren't already loaded.
    if (!getState().serviceRequests.resolutionCodes.length) {
      dispatch({
        type: API_REQUEST,
        actionName: FETCH_RESOLUTION_CODES,
        requestPath: RESOLUTION_CODES_PATH,
        requestMethod: 'GET',
      });
    }
  };
}

export function fetchServiceRequests() {
  return {
    type: API_REQUEST,
    actionName: FETCH_SERVICE_REQUESTS,
    requestPath: SERVICE_REQUESTS_PATH,
    requestMethod: 'GET',
  };
}

export function fetchServiceRequestDetails(serviceRequest) {
  return {
    type: API_REQUEST,
    actionName: FETCH_SERVICE_REQUEST_DETAILS,
    requestPath: `service_requests/${serviceRequest.id}`,
    requestMethod: 'GET',
  };
}

export function refreshCurrentServiceRequest() {
  return (dispatch, getState) => {
    const currentServiceRequest = getState().serviceRequests.currentServiceRequest;
    dispatch(fetchServiceRequestDetails(currentServiceRequest));
  };
}

export function resolveServiceRequest(serviceRequest, resolutionCode) {
  const reportedAtDate = Date();

  console.log('resolution code recieved by resolveservierequest function')
  console.log(resolutionCode)

  return {
    type: API_REQUEST,
    actionName: RESOLVE_SERVICE_REQUEST,
    requestPath: `service_requests/${serviceRequest.id}/resolution`,
    requestMethod: 'POST',
    requestParams: {
      status: {
        reported_at: reportedAtDate,
        resolution_code: resolutionCode,
      },
    },
    serviceRequest, // Needed for sync
  };
}

export function selectServiceRequest(serviceRequest) {
  return {
    type: SELECT_SERVICE_REQUEST,
    serviceRequest,
  };
}

export function updateOnsiteStatus(serviceRequest) {
  const reportedAtDate = Date();

  return {
    type: API_REQUEST,
    actionName: UPDATE_ONSITE_STATUS,
    requestPath: `service_requests/${serviceRequest.id}/onsite`,
    requestMethod: 'POST',
    requestParams: {
      status: {
        reported_at: reportedAtDate,
      },
    },
    serviceRequest, // Needed for sync
  };
}

export function addContactToServiceRequest(contact) {
  return {
    type: API_REQUEST,
    actionName: ADD_CONTACT_TO_SERVICE_REQUEST,
    requestMethod: 'POST',
    requestPath: 'contacts',
    requestParams: {
      contact
    }
  };
}

export function updateServiceRequestsWithNotes(serviceRequests) {
  return {
    type: API_REQUEST,
    actionName: UPDATE_SERVICE_REQUESTS_WITH_NOTES,
    requestMethod: 'POST',
    requestPath: 'service_requests/create_notes',
    requestParams: {
      service_requests: serviceRequests
    }
  };
}