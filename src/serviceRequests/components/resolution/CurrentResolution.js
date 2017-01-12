import React, { PropTypes } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import {
  X_AXIS_PADDING,
  LIGHT_BLUE,
} from '../../../shared';


export default function CurrentResolution({ serviceRequest }) {
  const resDate = new Date(serviceRequest.resolution.reported_at);
  const resDateDisplay = `${resDate.getHours()}:${resDate.getMinutes()}, ${resDate.toDateString()}`;
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsContainerInner}>
        <Text style={styles.header}>Resolution</Text>
        <Text>Service Request Resolved</Text>
        <Text>Status Code: {serviceRequest.resolution.resolution_code}</Text>
        <Text>Resolved At: {resDateDisplay}</Text>
      </View>
    </View>
  );
}

CurrentResolution.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'lightgray',
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    paddingTop: 20,
    paddingBottom: 30,
  },
  srNumber: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
  },
  header: {
    color: LIGHT_BLUE,
    marginBottom: 3,
  },
  detailsContainer: {
    padding: 10,
  },
  detailsContainerInner: {
    paddingLeft: 30,
    paddingBottom: 10,
    marginBottom: 10
  },
});
