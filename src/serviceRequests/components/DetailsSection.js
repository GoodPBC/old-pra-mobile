import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';
import { Button, Separator } from '../../shared';

export default function DetailsSection({ serviceRequest }) {
  return (
    <View style={styles.detailsContainer}>
      <Separator />
      <Text>{serviceRequest['request_created_at']}</Text>
      <Separator />
      <Text>{serviceRequest['complaint_details']}</Text>
      <Text>{serviceRequest['location_type']}</Text>
      <Text>{serviceRequest['address']}</Text>
      <Text>{serviceRequest['location_details']}</Text>
      <Separator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
    marginBottom: 50, // Otherwise we can't scroll to the button at the bottom
  },
  label: {
    fontWeight: 'bold',
  },
});