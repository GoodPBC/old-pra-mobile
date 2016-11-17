import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LIGHT_BLUE } from '../../shared';

export default function DescriptionSection({ serviceRequest, numberOfLines }) {
  return (
    <View style={styles.contentSection}>
      <Text style={styles.descriptionHeader}>Description</Text>
      <Text numberOfLines={numberOfLines}>{serviceRequest['complaint_details']}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  contentSection: {
    padding: 5,
  },
  descriptionHeader: {
    color: LIGHT_BLUE,
  },
});