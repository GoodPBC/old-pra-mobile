/* global fetch */
import moment from 'moment';
import {
    FETCH_SERVICE_REQUESTS,
    FETCH_SERVICE_REQUEST_DETAILS,
    RESOLVE_SERVICE_REQUEST,
    MARK_PENDING_STATUS,
    SELECT_SERVICE_REQUEST,
    SELECT_SERVICE_REQUEST_RESOLUTION,
    UPDATE_ONSITE_STATUS,
    ADD_CONTACT_TO_SERVICE_REQUEST,
    UPDATE_SERVICE_REQUESTS_WITH_NOTES
} from './actionTypes';
import { API_REQUEST } from '../shared';

const STATUS_CODES = {
  in_process: 1,
  assigned: 2,
  in_the_field: 3,
  on_site: 4,
  visit_complete: 5,
  closed: 6,
};

function momentToStr(momentDate) {
  return momentDate.format('YYYY-MM-DD HH-mm-ss');
}

export function selectServiceRequestResolution(resolutionCode) {
  return {
    type: SELECT_SERVICE_REQUEST_RESOLUTION,
    selectedResolutionCode: resolutionCode,
  };
}

export function fetchServiceRequests(onSuccess) {
  const yesterday = momentToStr(moment().subtract(5, 'days'));
  // const yesterday = '2017-02-28%2010-10-10';
  return {
    type: API_REQUEST,
    actionName: FETCH_SERVICE_REQUESTS,
    requestPath: `Get311ServiceRequests/${encodeURIComponent(yesterday)}`,
    endpoint: 'Get311ServiceRequests',
    requestMethod: 'GET',
    onSuccess,
  };
}

export function fetchServiceRequestDetails(serviceRequest) {
  return (dispatch) => {
    dispatch(fetchServiceRequests());
    dispatch({
      type: FETCH_SERVICE_REQUEST_DETAILS,
      srNumber: serviceRequest.sr_number,
    });
  };
}

export function refreshCurrentServiceRequest() {
  return (dispatch) => {
    dispatch(fetchServiceRequests());
  };
}

export function resolveServiceRequest(serviceRequest, resolutionCode) {
  return (dispatch, getState) => {
    const { userId } = getState().user;

    const requestParams = [
      {
        SR_Number: serviceRequest.sr_number,
        ModifiedAt: momentToStr(moment()),
        PRASRStatusId: STATUS_CODES.visit_complete,
        ModifiedBy: userId,
        PRASRResolutionCodeId: resolutionCode,
        // PRASRResolutionNote: 'Note content here',
      }
    ];

    dispatch({
      type: MARK_PENDING_STATUS,
      serviceRequest,
      pendingStatus: 'resolved',
    });

    dispatch({
      type: API_REQUEST,
      actionName: RESOLVE_SERVICE_REQUEST,
      requestPath: 'update311servicerequests',
      endpoint: 'update311servicerequests',
      requestMethod: 'POST',
      requestParams,
      serviceRequest, // Needed for sync

      // Refresh SRs after the update
      onSuccess: () => {
        dispatch(fetchServiceRequests(() => {
          dispatch({
            type: MARK_PENDING_STATUS,
            serviceRequest,
            pendingStatus: null,
          });
        }));
      }
    });
  };
}

export function selectServiceRequest(serviceRequest) {
  return {
    type: SELECT_SERVICE_REQUEST,
    serviceRequest,
  };
}

export function unselectServiceRequest() {
  return {
    type: SELECT_SERVICE_REQUEST,
    serviceRequest: null,
  };
}

export function updateOnsiteStatus(serviceRequest) {
  return (dispatch, getState) => {
    const { userId } = getState().user;

    const requestParams = [
      {
        SR_Number: serviceRequest.sr_number,
        ModifiedAt: momentToStr(moment()),
        PRASRStatusId: STATUS_CODES.on_site,

        ModifiedBy: userId,
        PRASRResolutionCodeId: null,
        // PRASRResolutionNote: 'Note content here',
      }
    ];

    dispatch({
      type: MARK_PENDING_STATUS,
      serviceRequest,
      pendingStatus: 'onsite',
    });

    dispatch({
      type: API_REQUEST,
      actionName: UPDATE_ONSITE_STATUS,
      requestPath: 'update311servicerequests',
      endpoint: 'update311servicerequests',
      requestMethod: 'POST',
      requestParams,
      serviceRequest, // Needed for sync

      // Refresh SRs after the update
      onSuccess: () => {
        dispatch(fetchServiceRequests(() => {
          dispatch({
            type: MARK_PENDING_STATUS,
            serviceRequest,
            pendingStatus: null,
          });
        }));
      }
    });
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