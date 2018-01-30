import PropTypes from 'prop-types';
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import {
  LIGHT_BLUE,
} from '../../../shared';

export default function ResolutionPending() {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsContainerInner}>
        <Text style={styles.header}>Resolution</Text>
        <Text>Resolution submission pending</Text>
      </View>
    </View>
  );
}

ResolutionPending.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
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