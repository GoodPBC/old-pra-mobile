import React from 'react';
import { Text, StyleSheet } from 'react-native';
import moment from 'moment';

export default function OnsiteTime({ serviceRequest }) {
  let content = null;
  if (serviceRequest.onsite_status) {
    const date = serviceRequest.onsite_status.reported_at;
    const timeSince = moment(date).fromNow();
    content = <Text style={styles.bold}>Onsite {timeSince}</Text>;
  } else {
    content = <Text>Not onsite yet</Text>;
  }

  return content;
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
});