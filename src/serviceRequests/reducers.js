import {
  FETCH_SERVICE_REQUESTS_SUCCESS,
  MARK_PENDING_STATUS,
  RERENDER_SERVICE_REQUESTS,
  SELECT_SERVICE_REQUEST,
  SELECT_SERVICE_REQUEST_RESOLUTION,
  UPDATE_RESOLUTION_NOTES,

  RESOLUTION_CODES,
} from './actionTypes';

import {
  SYNC_SERVICE_REQUESTS,
} from '../offline/actionTypes';

const initialState = {
  // Optimistic check for loading SRs
  hasLoadedServiceRequests: false,
  // Look up the SR to display on details
  currentSrNumber: null,
  // If updating SRs while offline, keep track of all pending updates
  // updatePending: {},
  // All SRs that have been retrieved from the API
  serviceRequests: [],

  // Display a spinner when refreshing.
  isRefreshing: false,

  selectedResolutionCode: null,
  resolutionNotes: null,
};

/**
 * After fetching SRs, convert them into a format usable by the app and update
 * the currently-selected SR if necessary.
 */
function processServiceRequestFetch(state, action) {
  const serviceRequests = transformStreetSmartServiceRequests(action.data.Service_Requests);
  return {
    ...state,
    serviceRequests,
    hasLoadedServiceRequests: true,
    isRefreshing: false,
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

function touchAllServiceRequests(state) {
  const touchedServiceRequests = state.serviceRequests.map(sr => ({ ...sr }));
  return {
    ...state,
    serviceRequests: touchedServiceRequests,
  };
}

function trim(str) {
  if (str && typeof str === 'string') {
    return str.trim();
  } else {
    return str;
  }
}

/**
 * NOTE: This is kind of a hack. The app has been using
 * the integer resolution code and looking up the name when necessary.
 *
 * In this case, SS passes back the name directly. For now to keep continuity
 * we transform it back into the integer representation.
 */
const RAW_RESOLUTION_TO_CODE = {
  'Assistance Offered': RESOLUTION_CODES.assistance_offered,
  'Insufficient Information': RESOLUTION_CODES.insufficient_information,
  'Person Not Found': RESOLUTION_CODES.person_not_found,
  'Referred to 911': RESOLUTION_CODES.referred_to_911,
  'Refused Assistance': RESOLUTION_CODES.refused_assistance,
  'Out of Jurisdiction': RESOLUTION_CODES.out_of_jurisdiction
};

function transformResolutionCode(rawResolutionCode) {
  if (rawResolutionCode) {
    return RAW_RESOLUTION_TO_CODE[rawResolutionCode];
  }
  return null;
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
      resolution_code: transformResolutionCode(sr.ResolutionCode),
      resolution_notes: sr.ResolutionNotes,
      provider_name: sr.Assigned_Provider,
      provider_assigned_time: sr.ProviderAssignedTime,
    }));
  return convertedServiceRequests;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICE_REQUESTS_SUCCESS:
      return processServiceRequestFetch(state, action);
    case MARK_PENDING_STATUS:
      return updatePendingStatus(state, action);
    case RERENDER_SERVICE_REQUESTS:
      return touchAllServiceRequests(state);
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
    case SYNC_SERVICE_REQUESTS:
      return {
        ...state,
        isRefreshing: true,
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

function updatePendingStatus(state, action) {
  const { pendingStatus, serviceRequest } = action;
  const serviceRequests = [...state.serviceRequests];
  const idx = serviceRequests.indexOf(serviceRequest);
  if (idx === -1) {
    throw 'invalid SR';
  }
  let updatedServiceRequest = null;
  switch (pendingStatus) {
    case 'resolved':
      updatedServiceRequest = {
        ...serviceRequest,
        status: 'visit_complete',
        updated_at: action.updatedAt.format('YYYY-MM-DD HH:mm:ss.SSS'),
        updated_by: action.name,
        resolution_code: action.resolutionCode,
        resolution_notes: action.resolutionNotes,
        unsynced: true,
      };
      break;
    case 'onsite':
      updatedServiceRequest = {
        ...serviceRequest,
        status: 'on_site',
        actual_onsite_time: action.updatedAt.format('YYYY-MM-DD HH:mm:ss.SSS'),
        updated_by: action.name,
        unsynced: true,
      };
      break;
    case null: throw 'invalid null status ';
    default:
      throw 'unknown pending status';
  }
  serviceRequests[idx] = updatedServiceRequest;
  return {
    ...state,
    serviceRequests,
  };
}
