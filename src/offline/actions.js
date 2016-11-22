import {
  SYNC_SERVICE_REQUESTS,
} from './actionTypes';

export function syncServiceRequests() {
  return {
    type: SYNC_SERVICE_REQUESTS,
  };
}