import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';
import { Button, Separator } from '../../shared';
import DescriptionSection from './DescriptionSection';
import AddressSection from './AddressSection';

export default function DetailsSection({ serviceRequest }) {
  return (
    <View style={styles.detailsContainer}>
      <AddressSection serviceRequest={serviceRequest} />
      <Separator />
      <DescriptionSection serviceRequest={serviceRequest} />
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