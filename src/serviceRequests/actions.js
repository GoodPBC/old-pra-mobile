/* global fetch */
import moment from 'moment';
import {
  FETCH_SERVICE_REQUESTS,
  FETCH_SERVICE_REQUEST_DETAILS,
  RESOLVE_SERVICE_REQUEST,
  MARK_PENDING_STATUS,
  RERENDER_SERVICE_REQUESTS,
  SELECT_SERVICE_REQUEST,
  SELECT_SERVICE_REQUEST_RESOLUTION,
  UPDATE_ONSITE_STATUS,
  ADD_CONTACT_TO_SERVICE_REQUEST,
  UPDATE_RESOLUTION_NOTES,
  UPDATE_PING_RESPONSE,
  UPDATE_PANHANDLING_RESPONSE,
  UPDATE_PANHANDLING_RESPONSE_REQUEST,
  UPDATE_PANHANDLING_RESPONSE_SUCCESS,
  UPDATE_PANHANDLING_RESPONSE_FAILURE,
} from './actionTypes';
import {
  momentToStr,
} from './helpers';
import { API_REQUEST } from '../shared';

export const STATUS_CODES = {
  in_process: 1,
  assigned: 2,
  in_the_field: 3,
  on_site: 4,
  visit_complete: 5,
  closed: 6,
};

export function selectServiceRequestResolution(resolutionCode) {
  return {
    type: SELECT_SERVICE_REQUEST_RESOLUTION,
    selectedResolutionCode: resolutionCode,
  };
}

export function fetchServiceRequests(onSuccess) {
  const numDays = __DEV__ ? 100 : 1;
  const since = momentToStr(moment().subtract(numDays, 'days'));
  return {
    type: API_REQUEST,
    actionName: FETCH_SERVICE_REQUESTS,
    requestPath: `Get311ServiceRequests/${encodeURIComponent(since)}`,
    endpoint: 'Get311ServiceRequests',
    requestMethod: 'GET',
    onSuccess,
  };
}

export function rerenderServiceRequests() {
  return {
    type: RERENDER_SERVICE_REQUESTS,
  };
}

export function resolveServiceRequest(serviceRequest, resolutionCode) {
  return (dispatch, getState) => {
    const { name, userId } = getState().user;
    const { resolutionNotes } = getState().serviceRequests;
    const updatedAt = moment();

    // console.log(`Resolving SR #${serviceRequest.sr_number} with code: ${resolutionCode}`);
    const requestParams = [{
      SR_Number: serviceRequest.sr_number,
      ModifiedAt: momentToStr(updatedAt),
      PRASRStatusId: STATUS_CODES.visit_complete,
      ModifiedBy: userId,
      PRASRResolutionCodeId: resolutionCode,
    }];
    if (resolutionNotes && resolutionNotes.trim().length) {
      requestParams.PRASRResolutionNote = resolutionNotes;
    }

    dispatch({
      type: MARK_PENDING_STATUS,
      serviceRequest,
      pendingStatus: 'resolved',
      updatedAt,
      name,
      resolutionNotes,
      resolutionCode,
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
      onSuccess: () => { dispatch(fetchServiceRequests()); },
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
    const { name, userId } = getState().user;
    const updatedAt = moment();

    const requestParams = [{
      SR_Number: serviceRequest.sr_number,
      ModifiedAt: momentToStr(updatedAt),
      PRASRStatusId: STATUS_CODES.on_site,
      ModifiedBy: userId,
      PRASRResolutionCodeId: null,
    }];

    dispatch({
      type: MARK_PENDING_STATUS,
      serviceRequest,
      pendingStatus: 'onsite',
      updatedAt,
      name,
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
      onSuccess: () => { dispatch(fetchServiceRequests()); },
    });
  };
}

export function addContactToServiceRequest(contact) {
  return {
    type: API_REQUEST,
    actionName: ADD_CONTACT_TO_SERVICE_REQUEST,
    requestMethod: 'POST',
    requestPath: 'contacts',
    requestParams: { contact },
  };
}

export function updateResolutionNotes(notes) {
  return {
    type: UPDATE_RESOLUTION_NOTES,
    notes,
  };
}

export function updateServiceRequestPingResponse(pingResponse) {
  return (dispatch, getState) => {
    const { userId } = getState().user;

    const requestParams = {
      ActualOnsiteTime: pingResponse.actualOnsiteTime,
      ModifiedAt: momentToStr(pingResponse.modifiedAt),
      ModifiedBy: userId,
      PingNote: pingResponse.pingNote,
      ReasonId: pingResponse.reasonId,
      SR_Number: pingResponse.srNumber
    };

    dispatch({
      type: API_REQUEST,
      actionName: UPDATE_PING_RESPONSE,
      requestMethod: 'POST',
      requestPath: 'updatepingresponse',
      endpoint: 'updatepingresponse',
      requestParams,
    });
  };
}

export function updatePanhandlingResponse(serviceRequest, response) {
  return (dispatch, getState) => {
    const { userId } = getState().user;
    const { interactionSummary, isClientPanhandling, modifiedAt } = response;

    const requestParams = [{
      InteractionSummary: interactionSummary,
      IsClientPanhandling: isClientPanhandling,
      ModifiedAt: momentToStr(modifiedAt),
      ModifiedBy: userId,
      SR_Number: serviceRequest.sr_number,
    }];

    dispatch({
      type: UPDATE_PANHANDLING_RESPONSE_REQUEST,
      serviceRequest,
    });

    dispatch({
      type: API_REQUEST,
      actionName: UPDATE_PANHANDLING_RESPONSE,
      requestMethod: 'POST',
      requestPath: 'updatepanhandlingresponse',
      endpoint: 'updatepanhandlingresponse',
      requestParams,
    });
  }
}