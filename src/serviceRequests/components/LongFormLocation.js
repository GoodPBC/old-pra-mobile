import React, { PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { formatLocationData, prioritizeLocationData } from '../address';

export default function LongFormLocation({ serviceRequest }) {
  /**
   * Display all available location fields, excluding those without data.
   */
  const { primaryLocation } = prioritizeLocationData(serviceRequest);
  const fieldNames = ['cross_streets', 'city', 'state', 'zip', 'borough', 'location_details'];
  const remainingFields = fieldNames.filter(fieldName => !!serviceRequest[fieldName] && fieldName !== primaryLocation);
  const textBlocks = remainingFields.map(fieldName => <Text key={fieldName}>{formatLocationData(serviceRequest, fieldName)}</Text>);

  return (
    <View>
      <Text style={styles.primary}>{formatLocationData(serviceRequest, primaryLocation)}</Text>
      {textBlocks}
    </View>
  );
}

LongFormLocation.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  primary: {
    fontWeight: 'bold',
  },
  secondary: {},
});