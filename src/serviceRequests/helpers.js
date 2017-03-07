import moment from 'moment';
import { RESOLUTION_CODES } from './actionTypes';

export function formatLocationData(serviceRequest, dataField) {
  if (dataField === 'cross_streets') {
    return `Cross Streets: ${serviceRequest.cross_streets}`;
  }
  return serviceRequest[dataField];
}

export function formattedStatus(serviceRequest) {
  switch (serviceRequest.status) {
    case 'in_the_field': return 'Received';
    case 'on_site': return 'On Site';
    case 'visit_complete': return 'Resolved';
    default: return serviceRequest.status;
  }
}

export function lastUpdateTime(serviceRequest) {
  if (serviceRequest.status === 'on_site') {
    if (serviceRequest.actual_onsite_time) {
      return parseTime(serviceRequest.actual_onsite_time);
    }
  } else if (serviceRequest.updated_at) {
    return parseTime(serviceRequest.updated_at);
  }
  return null;
}

export function parseTime(timeStr) {
  return moment(timeStr, 'MMM D YYYY h:mmA');
}

export function prioritizeLocationData(serviceRequest) {
  const {
    address,
    cross_streets: crossStreets,
  } = serviceRequest;
  let primaryLocation = null;
  let secondaryLocation = null;
  if (address && address.trim()) {
    primaryLocation = 'address';
    secondaryLocation = crossStreets ? 'cross_streets' : 'location_details';
  } else if (crossStreets && crossStreets.trim()) {
    primaryLocation = 'cross_streets';
    secondaryLocation = 'location_details';
  } else {
    primaryLocation = 'location_details';
  }
  return { primaryLocation, secondaryLocation };
}

const RESOLUTION_CODE_DISPLAY_NAMES = {
  [RESOLUTION_CODES.assistance_offered]: 'Assistance Offered',
  [RESOLUTION_CODES.insufficient_information]: 'Insufficient Information',
  [RESOLUTION_CODES.person_not_found]: 'Person not found',
  [RESOLUTION_CODES.referred_to_911]: 'Referred to 911',
  [RESOLUTION_CODES.refused_assistance]: 'Refused Assistance',
};

export function resolutionCodeDisplayName(resolutionCode) {
  if (RESOLUTION_CODE_DISPLAY_NAMES[resolutionCode]) {
    return RESOLUTION_CODE_DISPLAY_NAMES[resolutionCode];
  } else {
    console.log(resolutionCode);
    return `Unknown resolution code: ${resolutionCode}`;
  }
}

export function timeDescriptor(serviceRequest) {
  let name = null;
  switch (serviceRequest.status) {
    case 'in_the_field': return 'Received';
    case 'on_site':
      // NOTE: This is not entirely accurate. We don't have the info about who in particular went onsite.
      name = serviceRequest.updated_by;
      return `${name} went on-site`;
    case 'visit_complete':
      name = serviceRequest.updated_by;
      return `${name} resolved`;
    default: return 'unknown';
  }
}