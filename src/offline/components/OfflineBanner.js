import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  InvertText,
  DARK_BLUE,
} from '../../shared';

export default function OfflineBanner() {
  return (
    <View style={styles.container}>
      <InvertText style={styles.text}>OFFLINE</InvertText>
    </View>
  );
}

const styles = StyleSheet.create({
  // Correct colors for the status bar.
  background: {
    backgroundColor: DARK_BLUE,
  },
  container: {
    backgroundColor: 'gray',
    paddingTop: 20,
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  }
});