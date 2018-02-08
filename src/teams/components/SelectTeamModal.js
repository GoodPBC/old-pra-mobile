import React, { Component } from 'react';
import { StatusBar, Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import SelectTeamScreen from '../containers/SelectTeamScreen';
import {
  Button,
  DARK_BLUE,
} from '../../shared';

export default class SelectTeamModal extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    this.props.fetchTeams();
  }

  handleLogout() {
    const { logoutUser, user } = this.props;
    logoutUser(user);
  }

  render() {
    const { user } = this.props;

    if (!this.props.canSelectTeams) {
      return (
        <View style={[styles.container, {padding: 20, justifyContent: 'center'}]}>
          <StatusBar barStyle="dark-content" />
          <Text style={styles.warning}>You are unable to join a street team. You are currently logged in as {user.userAccountName}. Please contact a DHS
            administrator if you believe that you should
            have a provider account with Street Smart.</Text>
          <Button
            onPress={this.handleLogout}
            style={styles.logout}
          >Log Out</Button>
        </View>
      );
    }

    const iPhoneXStyle = DeviceInfo.getModel() === 'iPhone X' ? { borderTopWidth: 24, borderTopColor: DARK_BLUE } : {};

    return (
      <View style={[styles.container, iPhoneXStyle]}>
        <View style={[styles.nav, Platform.OS === 'android' ? styles.androidNav : null]}>
          <Text style={styles.header}>Select a team</Text>
        </View>
        <SelectTeamScreen isModal />
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
  androidNav: {
    justifyContent: 'center',
  },
  nav: {
    backgroundColor: DARK_BLUE,
    height: 64,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  warning: {
    alignSelf: 'center',
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  }
});
