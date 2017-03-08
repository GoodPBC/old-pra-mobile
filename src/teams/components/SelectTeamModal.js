import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectTeamScreen from '../containers/SelectTeamScreen';
import { Button } from '../../shared';

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
        <Text style={styles.header}>Select a team</Text>
        <SelectTeamScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 20,
    alignSelf: 'center',
  },
  logout: {
    marginTop: 40,
  },
  warning: {
    alignSelf: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  }
});