import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import {
  InvertText,
  Separator,
} from '../../shared';

export default function CreateTeamWarningHeader({ currentTeam }) {
  return (
    <View style={styles.warning}>
      <InvertText
        style={styles.warningText}>BY CREATING THIS TEAM YOU WILL BE REMOVED FROM TEAM
      </InvertText>
      <Separator style={{ width: 200, marginTop: 20, marginBottom: 20 }} />
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
