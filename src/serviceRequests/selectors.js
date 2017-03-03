import { createSelector } from 'reselect';

// FIXME: Add filtering here.
const getFilteredServiceRequests = (state) => state.serviceRequests.serviceRequests;
const getCurrentSRNumber = (state) => state.serviceRequests.currentSrNumber;

export const getCurrentServiceRequest = createSelector(
  [getFilteredServiceRequests, getCurrentSRNumber],
  (serviceRequests, currentSrNumber) => serviceRequests.find(sr => sr.sr_number === currentSrNumber)
);

const getUpdateStatuses = (state) => state.serviceRequests.updatePending;

export const getCurrentServiceRequestUpdateStatus = createSelector(
  [getCurrentServiceRequest, getUpdateStatuses],
  (currentServiceRequest, updateStatuses) => {
    if (!currentServiceRequest) {
      return null;
    }
    return updateStatuses[currentServiceRequest.sr_number];
  }
);