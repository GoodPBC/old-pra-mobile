import { createSelector } from 'reselect';
import { getCurrentTeam } from '../teams/selectors';
import { lastUpdateTime } from './helpers';

const DISPLAYABLE_STATUSES = [
  'in_the_field',
  'on_site',
  'visit_complete',
  'resolved',
];


export const getAllServiceRequests = (state) => state.serviceRequests.serviceRequests;

export const getSortedServiceRequests = createSelector(
  [getAllServiceRequests],
  (serviceRequests) => sortServiceRequests(serviceRequests)
);

const getCurrentSRNumber = (state) => state.serviceRequests.currentSrNumber;

function sortServiceRequests(serviceRequests) {
  function compare(a, b){
    if (statusMap[a.status] < statusMap[b.status]) {
      return -1;
    }
    if (statusMap[a.status] > statusMap[b.status]) {
      return 1;
    }

    const aTime = lastUpdateTime(a);
    const bTime = lastUpdateTime(b);
    // If either is null, no way to compare.
    if (!(aTime && bTime)) {
      return 0;
    }
    // Oldest first.
    return aTime > bTime ? 1 : -1;
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

export const getDisplayableServiceRequests = createSelector(
  [getSortedServiceRequests, getCurrentTeam],
  (serviceRequests, currentTeam) => serviceRequests.filter(sr => {
      const isOnTeam = currentTeam && sr.team_id === currentTeam.id;
      const isDisplayable = DISPLAYABLE_STATUSES.indexOf(sr.status) !== -1;

      // FIXME: Filter based on the selected filter.
      return isOnTeam && isDisplayable;
    })
);

export const getActiveServiceRequests = createSelector(
  [getDisplayableServiceRequests],
  (serviceRequests) => serviceRequests.filter(sr => sr.status === 'in_the_field' || sr.status === 'on_site')
);

export const getInactiveServiceRequests = createSelector(
  [getDisplayableServiceRequests],
  (serviceRequests) => serviceRequests.filter(sr => sr.status === 'visit_complete' || sr.status === 'closed')
);

const getOfflineSyncQueue = state => state.offline.syncQueue;
export const getSyncableServiceRequests = createSelector(
  [getOfflineSyncQueue], queue => queue.map(queuedAction => queuedAction.serviceRequest).filter(sr => !!sr)
);


export const getCurrentServiceRequest = createSelector(
  [getDisplayableServiceRequests, getCurrentSRNumber],
  (serviceRequests, currentSrNumber) => serviceRequests.find(sr => sr.sr_number === currentSrNumber)
);

const hasLoadedServiceRequests = state => state.serviceRequests.hasLoadedServiceRequests;
export const showNoSRWarning = createSelector(
  [
    getDisplayableServiceRequests,
    hasLoadedServiceRequests
  ],
  (serviceRequests, hasLoaded) => hasLoaded && serviceRequests.length === 0
);
