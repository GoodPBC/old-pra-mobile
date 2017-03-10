import React, { Component, PropTypes } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SelectTeamScreen from '../containers/SelectTeamScreen';
import {
  Button,
  DARK_BLUE,
} from '../../shared';

export default class SelectTeamModal extends Component {
  componentWillMount() {
    this.props.fetchTeams();
  }

  render() {
    if (!this.props.canSelectTeams) {
      return (
        <View style={styles.container}>
          <Text style={styles.warning}>You are unable to join a street team. You are currently logged in as {this.props.userAccountName}. Please contact a DHS
            administrator if you believe that you should
            have a provider account with Street Smart.</Text>
          <Button
            onPress={this.props.logoutUser}
            style={styles.logout}
          >Log Out</Button>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Text style={styles.header}>Select a team</Text>
        </View>
        <SelectTeamScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  logout: {
    marginTop: 40,
  },
  nav: {
    backgroundColor: DARK_BLUE,
    height: 64,
    justifyContent: 'center',
  },
  warning: {
    alignSelf: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  }
});