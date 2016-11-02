import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginTop: 10,
    marginBottom: 10,
  }
});