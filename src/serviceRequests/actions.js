/* global fetch */
import moment from 'moment';
import {
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

const STATUS_CODES = {
  in_process: 1,
  assigned: 2,
  in_the_field: 3,
  on_site: 4,
  visit_complete: 5,
  closed: 6,
};

const PRA_BASE_PATH = 'dhsmobile/PRAService/SSPRAService.svc';

function momentToStr(momentDate) {
  return momentDate.format('YYYY-MM-DD%20HH-mm-ss');
}

export function selectServiceRequestResolution(resolutionCode) {
  return {
    type: SELECT_SERVICE_REQUEST_RESOLUTION,
    selectedResolutionCode: resolutionCode,
  };
}

export function fetchServiceRequests() {
  // FIXME: Uncomment this when we have updated data.
  // const yesterday = momentToStr(moment().subtract(1, 'days'));
  const yesterday = '2017-02-28%2010-10-10';
  return {
    type: API_REQUEST,
    actionName: FETCH_SERVICE_REQUESTS,
    requestPath: `${PRA_BASE_PATH}/Get311ServiceRequests/${yesterday}`,
    endpoint: 'Get311ServiceRequests',
    requestMethod: 'GET',
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
  return (dispatch, getState) => {
    const currentServiceRequest = getState().serviceRequests.currentServiceRequest;
    dispatch(fetchServiceRequestDetails(currentServiceRequest));
  };
}

export function resolveServiceRequest(serviceRequest, resolutionCode) {
  const reportedAtDate = Date();

  console.log('resolution code recieved by resolveservierequest function');
  console.log(resolutionCode);

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

  // [{
  // 	"AssignedTeamId":2147483647,
  // 	"ModifiedAt":"\/Date(928164000000-0400)\/",
  // 	"ModifiedBy":2147483647,
  // 	"PRASRResolutionCodeId":2147483647,
  // 	"PRASRResolutionNote":"String content",
  // 	"PRASRStatusId":2147483647,
  // 	"ProviderId":2147483647,
  // 	"SR_Number":"String content"
  // }]

  console.warn('FIXME: Need to fix onsite status update');
  return {
    type: API_REQUEST,
    actionName: UPDATE_ONSITE_STATUS,
    requestPath: 'update311servicerequests',
    endpoint: 'update311servicerequests',
    requestMethod: 'POST',
    requestParams: [
      {
        SR_Number: serviceRequest.sr_number,
        ModifiedAt: momentToStr(moment()),
        PRASRStatusId: STATUS_CODES.on_site,

        // FIXME: Need to use correct values here.
        AssignedTeamId: null,
        ModifiedBy: null,
        PRASRResolutionCodeId: 1,
        PRASRResolutionNote: 'Note content here',
        ProviderId: null,
      }
    ],
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