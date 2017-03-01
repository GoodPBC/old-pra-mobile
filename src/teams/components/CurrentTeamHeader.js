import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Separator,
} from '../../shared';
import { GRAY_TEXT, LIGHT_BLUE } from '../../shared/constants';

export default function CurrentTeamHeader({ currentTeam, userName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tinyHeader}>TEAM</Text>
      <Text style={styles.teamName}>{currentTeam ? currentTeam.name : 'Unassigned'}</Text>
      <Separator style={styles.separator} />
      <Text style={styles.tinyHeader}>MEMBER</Text>
      <Text style={styles.userName}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  teamName: {
    fontStyle: 'italic',
    fontSize: 28,
    color: LIGHT_BLUE,
  },
  userName: {
    fontSize: 22,
    textAlign: 'center',
    color: '#A8A8A8',
    marginTop: 10,
  },
  separator: {
    backgroundColor: LIGHT_BLUE,
    width: 200,
    marginTop: 25,
    marginBottom: 25,
  },
  tinyHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: LIGHT_BLUE,
  },
  container: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  }
});