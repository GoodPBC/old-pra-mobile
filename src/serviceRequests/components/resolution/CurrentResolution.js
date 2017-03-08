import React, { PropTypes } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import {
  X_AXIS_PADDING,
  LIGHT_BLUE,
} from '../../../shared';

import StatusWithTime from '../StatusWithTime';
import { resolutionCodeDisplayName } from '../../helpers';

export default function CurrentResolution({ serviceRequest }) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsContainerInner}>
        <Text style={styles.header}>Resolution</Text>
        <StatusWithTime serviceRequest={serviceRequest} />
        <Text style={{ fontWeight: 'bold' }}>{resolutionCodeDisplayName(serviceRequest.resolution_code)}</Text>
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
