import React, { Component, PropTypes } from 'react';

import {
  Alert,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import { ServiceRequestNavigation } from '../../serviceRequests';
import { TeamNavigation } from '../../teams';
import { OfflineBanner, SyncNavigation } from '../../offline';

import { LoginScreen, LogoutScreen } from '../../user';
import TabBar from './TabBar';

import {
  DARK_BLUE,
  GRAY_TEXT,
} from '../../shared';

const Tabs = {
  my_requests: 0,
  sync: 1,
  teams: 2,
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
      <ScrollableTabView
        renderTabBar={() => <TabBar style={styles.tabBar}/>}
        tabBarInactiveTextColor={GRAY_TEXT}
        tabBarActiveTextColor={DARK_BLUE}
        tabBarPosition="bottom"
        tabBarUnderlineStyle={{ backgroundColor: 'white' }}
      >
        <ServiceRequestNavigation tabLabel="My Requests" />
        <TeamNavigation tabLabel="Teams" />
        <SyncNavigation tabLabel="Sync" />
        <LogoutScreen tabLabel="Logout" />
      </ScrollableTabView>
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