import React from 'react';
import {
  Text,
} from 'react-native';

function timeDescriptor(serviceRequest) {
  let name = null;
  switch (serviceRequest.status) {
    case 'in_the_field': return 'Received';
    case 'on_site':
      name = serviceRequest.onsite_status.user.full_name;
      return `${name} went on-site`;
    case 'visit_complete':
      name = serviceRequest.onsite_status.user.full_name;
      return `${name} resolved`;
    default: return 'unknown';
  }
}

export default function StatusWithTime({ serviceRequest }) {
  return <Text>{timeDescriptor(serviceRequest)} {serviceRequest.time_since_status_changed}</Text>;
}