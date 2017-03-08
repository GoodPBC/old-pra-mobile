import React, { PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { formatLocationData, prioritizeLocationData } from '../helpers';

export default function ShortFormLocation({ serviceRequest }) {
  const { primaryLocation, secondaryLocation } = prioritizeLocationData(serviceRequest);
  const formattedSecondaryLocation = formatLocationData(serviceRequest, secondaryLocation);
  return (
    <View>
      <Text style={styles.primary} numberOfLines={2}>{formatLocationData(serviceRequest, primaryLocation)}</Text>
      {formattedSecondaryLocation && <Text style={styles.secondary} numberOfLines={1}>{formattedSecondaryLocation}</Text>}
    </View>
  );
}

ShortFormLocation.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  primary: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondary: {},
});