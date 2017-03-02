import {
  FETCH_RESOLUTION_CODES_SUCCESS,
  FETCH_SERVICE_REQUESTS_SUCCESS,
  FETCH_SERVICE_REQUEST_DETAILS_SUCCESS,
  FETCH_SERVICE_REQUEST_DETAILS,
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
  resolutionCodes: {
    assistance_offered: 0,
    insufficient_information: 1,
    person_not_found: 2,
    referred_to_911: 3,
    refused_assistance: 4,
  },
  serviceRequests: [],
  selectedResolutionCode: null,
};

/**
 * Return SR from the list.
 */
function lookupServiceRequest(serviceRequests, srNumber) {
  return serviceRequests.find(sr => sr.sr_number === srNumber);
}

/**
 * After fetching SRs, convert them into a format usable by the app and update
 * the currently-selected SR if necessary.
 */
function processServiceRequestFetch(state, action) {
  const serviceRequests = transformStreetSmartServiceRequests(action.data.Service_Requests);
  return {
    ...state,
    serviceRequests,
    currentServiceRequest: updateCurrentServiceRequest(state.currentServiceRequest, serviceRequests),
  };
}

/**
 * Set the currently-visible service request.
 */
function setCurrentServiceRequest(state, action) {
  const { srNumber } = action;

  return {
    ...state,
    currentServiceRequest: lookupServiceRequest(state.serviceRequests, srNumber),
  };
}

/**
 * Update the currently-visible SR after a recent API fetch.
 */
function updateCurrentServiceRequest(currentServiceRequest, serviceRequests) {
  if (currentServiceRequest) {
    return lookupServiceRequest(serviceRequests, currentServiceRequest.sr_number);
  }
  return currentServiceRequest;
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

function trim(str) {
  if (str && typeof str === 'string') {
    return str.trim();
  } else {
    return str;
  }
}

function transformStatus(status) {
  switch (status) {
    case 'Assigned': return 'assigned';
    case 'In The Field': return 'in_the_field';
    case 'On Site': return 'on_site';
    case 'Visit Complete': return 'visit_complete';
    case 'Closed': return 'closed';
    default:
      console.log('received SR with unknown status: ', status);
  }

  return status;
}

function transformStreetSmartServiceRequests(serviceRequests) {
  const convertedServiceRequests = serviceRequests.map(sr => ({
      address: trim(sr.Address),
      borough: trim(sr.Borough),
      city: trim(sr.City),
      complaint_details: trim(sr.Complaint_Details),
      created_at: trim(sr.Created_At),
      cross_streets: trim(sr.Cross_Streets),
      location_details: trim(sr.Location_Details),
      sr_number: trim(sr.SR_Number),
      state: trim(sr.State),
      zip: trim(sr.Zip),
      status: transformStatus(sr.SR_Status),
      // New fields
      email_data_id: trim(sr.EmailDataId),
      team: trim(sr.Assigned_Team),
      // Assigned_Provider

      // FIXME: Missing fields

    }));
  return convertedServiceRequests;
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
      return processServiceRequestFetch(state, action);
    case FETCH_RESOLUTION_CODES_SUCCESS:
      return {
        ...state,
        resolutionCodes: action.data.resolutions,
      };
    case FETCH_SERVICE_REQUEST_DETAILS:
      return setCurrentServiceRequest(state, action);
    case RESOLVE_SERVICE_REQUEST_SUCCESS:
      return updateCurrentServiceRequest(state, action);
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
      return updateCurrentServiceRequest(state, action);
    case ADD_CONTACT_TO_SERVICE_REQUEST:
      return {
        ...state,
        currentServiceRequest: action.serviceRequest,
      };
    default:
      return state;
  }
}