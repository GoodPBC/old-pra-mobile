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

export default function CreateTeamWarningHeader({ currentTeam }) {
  return (
    <View style={styles.warning}>
      <InvertText style={styles.warningText}>BY CREATING THIS TEAM YOU WILL BE REMOVED FROM TEAM</InvertText>
      <Separator style={{width: 200, marginTop: 20, marginBottom: 20}}/>
      <InvertText style={styles.teamName}>{currentTeam.name}</InvertText>
    </View>
  );
}

const styles = StyleSheet.create({
  teamName: {
    fontStyle: 'italic',
    fontSize: 30,
  },
  warningText: {
    fontSize: 18,
    textAlign: 'center'
  },
  warning: {
    alignItems: 'center',
  }
});