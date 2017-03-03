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
      // NOTE: This is not entirely accurate. We don't have the info about who in particular went onsite.
      name = serviceRequest.updated_by;
      return `${name} went on-site`;
    case 'visit_complete':
      name = serviceRequest.updated_by;
      return `${name} resolved`;
    default: return 'unknown';
  }
}

export default function StatusWithTime({ serviceRequest }) {
  let time = null;
  let timeDescription = null;
  if (serviceRequest.status === 'on_site') {
    console.log('actual onsite time', serviceRequest.actual_onsite_time);
    if (serviceRequest.actual_onsite_time) {
      time = parseTime(serviceRequest.actual_onsite_time);
      timeDescription = time.from(moment());
    } else {
      timeDescription = ', waiting for ping response';
    }
  } else if (serviceRequest.updated_at) {
    time = parseTime(serviceRequest.updated_at);
    timeDescription = time.from(moment());
  }
  return <Text>{timeDescriptor(serviceRequest)} {timeDescription}</Text>;
}