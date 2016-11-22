import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SectionWithIcon from './SectionWithIcon';

export default function AddressSection({ serviceRequest }) {
  return (
    <SectionWithIcon icon={require('./img/location-icon-active.png')}>
      <Text style={styles.text}>{serviceRequest['address']}</Text>
    </SectionWithIcon>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});