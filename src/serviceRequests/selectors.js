import { createSelector } from 'reselect';

const DISPLAYABLE_STATUSES = [
  'in_the_field',
  'on_site',
  'visit_complete',
  'resolved',
];

const getAllServiceRequests = (state) => state.serviceRequests.serviceRequests;
const getCurrentSRNumber = (state) => state.serviceRequests.currentSrNumber;
const getCurrentTeam = (state) => state.teams.currentTeam;


export const getFilteredServiceRequests = createSelector(
  [getAllServiceRequests, getCurrentTeam],
  (serviceRequests, currentTeam) => {
    return serviceRequests.filter(sr => {
      const isOnTeam = sr.team === currentTeam.name;
      const isDisplayable = DISPLAYABLE_STATUSES.indexOf(sr.status) !== -1;
      // FIXME: Filter by the user's provider.

      // FIXME: Filter based on the selected filter.
      return isOnTeam && isDisplayable;
    });
  }
);


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