import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  InvertText,
  X_AXIS_PADDING,
} from '../../shared';

export default function TeamUserListItem({ user }) {
  return (
    <View key={user.full_name} style={styles.container}>
      <View>
        <InvertText>{user.full_name}</InvertText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: X_AXIS_PADDING,
    paddingTop: 30,
    paddingBottom: 30,
  },
});