import React, { Component, PropTypes } from 'react';

import {
  Alert,
  Image,
  Modal,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import { ServiceRequestNavigation } from '../../serviceRequests';
import { TeamNavigation } from '../../teams';
import { OfflineBanner, SyncNavigation } from '../../offline';

import { LoginScreen, LogoutScreen } from '../../user';

import myRequestsActiveIcon from './img/my-requests-icon-active.png';
import myRequestsInactiveIcon from './img/my-requests-icon-inactive.png';
import teamsActiveIcon from './img/teams-icon-active.png';
import teamsInactiveIcon from './img/teams-icon-inactive.png';
import syncActiveIcon from './img/sync-icon-active.png';
import syncInactiveIcon from './img/sync-icon-inactive.png';

import {
  DARK_BLUE,
  GRAY_TEXT,
} from '../../shared';

const Tabs = {
  my_requests: 0,
  sync: 1,
  teams: 2,
  logout: 3,
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: Tabs.my_requests,
    };
  }

  componentWillMount() {
    this.props.monitorNetworkChanges();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errorMessage) {
      Alert.alert('Error', newProps.errorMessage, [
        { text: 'OK', onPress: this.props.clearErrorMessage },
      ]);
    }
  }

  _renderLogin() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.userIsAuthenticated !== true}
          onRequestClose={() => {}}
        >
          <LoginScreen {...this.props} />
        </Modal>
      </View>
    );
  }

  _renderTabs() {
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === Tabs.my_requests}
          title="My Requests"
          renderIcon={() => <Image source={myRequestsInactiveIcon} />}
          renderSelectedIcon={() => <Image source={myRequestsActiveIcon} />}
          onPress={() => this.setState({ selectedTab: Tabs.my_requests })}
          titleStyle={{ color: GRAY_TEXT }}
          selectedTitleStyle={{ color: DARK_BLUE }}
        >
          <ServiceRequestNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === Tabs.teams}
          title="Teams"
          renderIcon={() => <Image source={teamsInactiveIcon} />}
          renderSelectedIcon={() => <Image source={teamsActiveIcon} />}
          onPress={() => this.setState({ selectedTab: Tabs.teams })}
          titleStyle={{ color: GRAY_TEXT }}
          selectedTitleStyle={{ color: DARK_BLUE }}
        >
          <TeamNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === Tabs.sync}
          title="Sync"
          renderIcon={() => <Image source={syncInactiveIcon} />}
          renderSelectedIcon={() => <Image source={syncActiveIcon} />}
          onPress={() => this.setState({ selectedTab: Tabs.sync })}
          titleStyle={{ color: GRAY_TEXT }}
          selectedTitleStyle={{ color: DARK_BLUE }}
        >
          <SyncNavigation />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === Tabs.logout}
          title="Logout"
          renderIcon={() => <Image source={myRequestsInactiveIcon} />}
          renderSelectedIcon={() => <Image source={myRequestsActiveIcon} />}
          onPress={() => this.setState({ selectedTab: Tabs.logout })}
          titleStyle={{ color: GRAY_TEXT }}
          selectedTitleStyle={{ color: DARK_BLUE }}
        >
          <LogoutScreen />
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

  render() {
    let content = null;
    if (this.props.userIsAuthenticated) {
      content = this._renderTabs();
    } else {
      content = this._renderLogin();
    }
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          networkActivityIndicatorVisible={this.props.apiRequestInProgress}
        />
        {!this.props.networkIsConnected && <OfflineBanner />}
        {content}
      </View>
    );
  }
}

App.propTypes = {
  apiRequestInProgress: PropTypes.bool.isRequired,
  clearErrorMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  monitorNetworkChanges: PropTypes.func.isRequired,
  networkIsConnected: PropTypes.bool,
  userIsAuthenticated: PropTypes.bool,
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabBarNavigator: {
    flex: 1,
  },
  tabBar: {
    shadowColor: '#333333',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8
  }
});