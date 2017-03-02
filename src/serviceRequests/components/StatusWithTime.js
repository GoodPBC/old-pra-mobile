import React from 'react';
import {
  Text,
} from 'react-native';
import moment from 'moment';

function parseTime(timeStr) {
  return moment(timeStr, 'MMM D YYYY h:mmA');
}

function timeDescriptor(serviceRequest) {
  let name = null;
  switch (serviceRequest.status) {
    case 'in_the_field': return 'Received';
    case 'on_site':
      name = serviceRequest.onsite_status.user.full_name;
      return `${name} went on-site`;
    case 'visit_complete':
      name = serviceRequest.resolution.user.full_name;
      return `${name} resolved`;
    default: return 'unknown';
  }
}

export default function StatusWithTime({ serviceRequest }) {
  // NOTE: StreetSmart API does not hav
  let time = null;
  if (serviceRequest.status === 'on_site') {
    time = parseTime(serviceRequest.actual_onsite_time);
  } else if (serviceRequest.updated_at) {
    time = parseTime(serviceRequest.updated_at);
  }
  let timeAgo = null;
  if (time) {
    timeAgo = time.from(moment());
  }
  return <Text>{timeDescriptor(serviceRequest)} {timeAgo}</Text>;
}