import moment from 'moment';

export const maxSince = __DEV__
  ? moment().subtract(7, 'days')
  : moment().subtract(2, 'hours');