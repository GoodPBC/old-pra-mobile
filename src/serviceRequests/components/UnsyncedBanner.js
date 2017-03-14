import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  DARK_BLUE,
  GRAY_TEXT,
  Separator,
} from '../../shared';

import alertIcon from './img/info-icon-inactive.png';

export default function UnsyncedBanner({ serviceRequest }) {
  if (!(serviceRequest && serviceRequest.unsynced)) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Image source={alertIcon} />
      <View style={styles.content}>
        <Text style={styles.banner}>Not Synced</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  banner: {
    color: GRAY_TEXT,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#F6E3CC',
    paddingLeft: 5,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 10,
  },
});