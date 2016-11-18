import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Separator({ style }) {
  return <View style={[styles.separator, style]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
  }
});