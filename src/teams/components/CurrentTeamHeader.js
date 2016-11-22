import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  InvertButton,
  InvertText,
  InvertTextInput,
  Separator,
  LIGHT_BLUE,
  X_AXIS_PADDING,
} from '../../shared';

export default function CurrentTeamHeader({ currentTeam, userName }) {
  return (
    <View style={styles.warning}>
      <InvertText style={styles.header}>{userName}</InvertText>
      <Separator style={styles.separator} />
      <InvertText style={styles.tinyHeader}>TEAM</InvertText>
      <InvertText style={styles.teamName}>{currentTeam ? currentTeam.name : 'Unassigned'}</InvertText>
    </View>
  );
}

const styles = StyleSheet.create({
  teamName: {
    fontStyle: 'italic',
    fontSize: 30,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  separator: {
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  tinyHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  warning: {
    alignItems: 'center',
  }
});