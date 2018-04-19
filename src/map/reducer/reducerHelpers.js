import moment from 'moment';
import { parseSyncedAt, maxSince } from '../helpers';

export function handleRequest(state, action) {
  return {
    ...state,
    isFetching: true,
  };
}

export function handleSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    lastUpdated: parseSyncedAt(action.payload.Synced_At),
    allSurveys: filterSurveys([
      ...state.allSurveys,
      ...action.payload.Service_Requests,
    ]),
  };
}

export function handleFailure(state, action) {
  return {
    ...state,
    isFetching: false,
  };
}

function filterSurveys(surveys) {
  return surveys.filter(survey => {
    const submittedDate = moment(survey.SubmittedDate, 'YYYY-MM-DD HH:mm:ss.SSS');
    return (
      submittedDate.isValid()
      && submittedDate.isSameOrAfter(maxSince)
    );
  });
}