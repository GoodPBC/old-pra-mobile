import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LIGHT_BLUE } from '../../shared';

export default function AddressSection({ serviceRequest }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{serviceRequest['address']}</Text>
    </View>
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