import React, { PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { formatLocationData, prioritizeLocationData } from '../address';

export default function ShortFormLocation({ serviceRequest }) {
  const { primaryLocation, secondaryLocation } = prioritizeLocationData(serviceRequest);
  return (
    <View>
      <Text style={styles.primary}>{formatLocationData(serviceRequest, primaryLocation)}</Text>
      <Text style={styles.secondary} numberOfLines={1}>{formatLocationData(serviceRequest, secondaryLocation)}</Text>
    </View>
  );
}

ShortFormLocation.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  primary: {
    fontWeight: 'bold',
  },
  secondary: {},
});