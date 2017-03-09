import React from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  DARK_BLUE,
  Separator,
} from '../../shared';

export default function BannerWithNumber({ serviceRequest }) {
  return (
    <View>
      <Separator />
      <Text style={styles.banner}>SR #{serviceRequest.sr_number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: DARK_BLUE,
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
