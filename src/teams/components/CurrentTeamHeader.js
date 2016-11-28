import React, { PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  InvertText,
  Separator,
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