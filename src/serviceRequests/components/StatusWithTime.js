import React from 'react';
import {
  Text,
} from 'react-native';
import moment from 'moment';
import { lastUpdateTime, timeDescriptor } from '../helpers';

export default function StatusWithTime({ serviceRequest }) {
  const updatedAt = lastUpdateTime(serviceRequest);
  let timeDescription = null;
  if (updatedAt) {
    timeDescription = updatedAt.from(moment());
  } else {
    timeDescription = 'time unknown';
  }
  return <Text>{timeDescriptor(serviceRequest)} {timeDescription}</Text>;
}