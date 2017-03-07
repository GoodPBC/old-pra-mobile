import {
  FETCH_RESOLUTION_CODES_SUCCESS,
  FETCH_SERVICE_REQUESTS_SUCCESS,
  FETCH_SERVICE_REQUEST_DETAILS_SUCCESS,
  FETCH_SERVICE_REQUEST_DETAILS,
  MARK_PENDING_STATUS,
  RESOLVE_SERVICE_REQUEST,
  RESOLVE_SERVICE_REQUEST_SUCCESS,
  SELECT_SERVICE_REQUEST,
  SELECT_SERVICE_REQUEST_RESOLUTION,
  UPDATE_ONSITE_STATUS,
  UPDATE_ONSITE_STATUS_SUCCESS,
  ADD_CONTACT_TO_SERVICE_REQUEST,
  UPDATE_RESOLUTION_NOTES,

  RESOLUTION_CODES,
} from './actionTypes';

import {
  API_REQUEST,
} from '../shared';

const initialState = {
  currentSrNumber: null,
  updatePending: {},
  serviceRequests: [],
  selectedResolutionCode: null,
  resolutionNotes: null,
};

/**
 * After fetching SRs, convert them into a format usable by the app and update
 * the currently-selected SR if necessary.
 */
function processServiceRequestFetch(state, action) {
  return {
    ...state,
    serviceRequests: transformStreetSmartServiceRequests(action.data.Service_Requests),
  };
}

/**
 * Set the currently-visible service request.
 */
function selectServiceRequest(state, action) {
  const { serviceRequest } = action;
  return {
    ...state,
    currentSrNumber: serviceRequest ? serviceRequest.sr_number : null,

    // Clear out stale data from the last SR.
    resolutionNotes: null,
    selectedResolutionCode: null,
  };
}

function updatePendingStatus(state, action) {
  const { pendingStatus, serviceRequest } = action;
  let { updatePending = {} } = state;
  if (typeof updatePending !== 'object') {
    updatePending = {};
  }
  updatePending[serviceRequest.sr_number] = pendingStatus;
  const newState = {
    ...state,
    updatePending: {
      ...updatePending,
    },
  };
  return newState;
}

function trim(str) {
  if (str && typeof str === 'string') {
    return str.trim();
  } else {
    return str;
  }
}

function transformStatus(status) {
  // NOTE: StreetSmart uses the 'Assigned' status instead of 'In The Field',
  // so we'll map that to in_the_field for expediency here.
  switch (status) {
    case 'Unassigned': return 'in_process';
    case 'Assigned': return 'in_the_field';
    case 'Onsite': return 'on_site';
    case 'Resolved': return 'visit_complete';
    case 'Closed': return 'closed';
    default:
      console.log('received SR with unknown status: ', status);
  }

  return status;
}

function transformStreetSmartServiceRequests(serviceRequests) {
  console.log(`Fetched ${serviceRequests.length} SRs`);
  if (!serviceRequests) {
    return [];
  }
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

      email_data_id: trim(sr.EmailDataId),
      team: trim(sr.Assigned_Team),
      team_id: sr.Assigned_Team_Id,
      updated_at: sr.Updated_At,
      updated_by: sr.Updated_By,
      actual_onsite_time: sr.Actual_Onsite_Time,
      resolution_code: sr.ResolutionCode,
      resolution_notes: sr.ResolutionNotes,
      provider_name: sr.Assigned_Provider,
    }));
  return convertedServiceRequests;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICE_REQUESTS_SUCCESS:
      return processServiceRequestFetch(state, action);
    case MARK_PENDING_STATUS:
      return updatePendingStatus(state, action);
    case SELECT_SERVICE_REQUEST: // Works offline
      return selectServiceRequest(state, action);
    case SELECT_SERVICE_REQUEST_RESOLUTION:
      return {
        ...state,
        selectedResolutionCode: action.selectedResolutionCode,
        // Wipe this out so we don't accidentally send notes
        // with res codes that don't need them.
        resolutionNotes: null,
      };
    case UPDATE_RESOLUTION_NOTES:
      return {
        ...state,
        resolutionNotes: action.notes,
      };
    default:
      return state;
  }
}