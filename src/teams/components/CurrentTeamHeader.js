import React, { PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Separator,
} from '../../shared';
import {
  GRAY_TEXT,
  LIGHT_GRAY,
  LIGHT_BLUE,
  CARD_BORDER
}
   from '../../shared/constants';

export default function CurrentTeamHeader({ currentTeam, userName }) {
  return (
    <View style={styles.container}>
      <Text style={styles.tinyHeader}>CURRENT TEAM</Text>
      <Text style={[styles.text, styles.teamName]}>{currentTeam ? currentTeam.name : 'Unassigned'}</Text>
      <Separator style={styles.separator} />
      <Text style={styles.tinyHeader}>MEMBER</Text>
      <Text style={[styles.text, styles.userName]}>{userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: LIGHT_GRAY,
    textAlign: 'center',
    marginTop: 10,
  },
  teamName: {
    fontSize: 28,
  },
  userName: {
    fontSize: 22,
  },
  separator: {
    backgroundColor: LIGHT_BLUE,
    width: 200,
    marginVertical: 25,
  },
  tinyHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: LIGHT_BLUE,
  },
  container: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    /*
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    */
  }
});
