import moment from 'moment';

export function parseSyncedAt(timeString) {
  const syncedAt = moment(timeString, 'M/D/YYYY h:m:s a');

  if (!syncedAt.isValid()) {
    return null;
  }
  
  return syncedAt;
}