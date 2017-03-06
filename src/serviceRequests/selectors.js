import { createSelector } from 'reselect';
import { getCurrentTeam } from '../teams/selectors';

const DISPLAYABLE_STATUSES = [
  'in_the_field',
  'on_site',
  'visit_complete',
  'resolved',
];

const getAllServiceRequests = (state) => {
 return sortServiceRequests(state.serviceRequests.serviceRequests);
};

const getCurrentSRNumber = (state) => state.serviceRequests.currentSrNumber;

function sortServiceRequests(serviceRequests) {
  function compare(a, b){
    if (statusMap[a] < statusMap[b]) {
      return -1;
    }
    if (statusMap[a] > statusMap[b]) {
      return 1;
    }
    return 0;
  }

  let statusMap = {
    on_site: 0,
    in_the_field: 1,
    visit_complete: 2,
    closed: 3,
    in_process: 4,
    assigned: 5
  };

  return serviceRequests.sort(compare);
}

export const getFilteredServiceRequests = createSelector(
  [getAllServiceRequests, getCurrentTeam],
  (serviceRequests, currentTeam) => {
    return serviceRequests.filter(sr => {
      const isOnTeam = currentTeam && sr.team_id === currentTeam.id;
      const isDisplayable = DISPLAYABLE_STATUSES.indexOf(sr.status) !== -1;

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