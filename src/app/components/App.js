import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Alert,
  Modal,
  StatusBar,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import { ServiceRequestNavigation } from '../../serviceRequests';
import { TeamNavigation } from '../../teams';
import { SyncNavigation } from '../../offline';

import { LoginScreen } from '../../user';

const Tabs = {
  my_requests: 0,
  sync: 1,
  teams: 2,
};

export default class ProviderResponseApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: Tabs.my_requests,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errorMessage) {
      Alert.alert('Error', newProps.errorMessage, [
        { text: 'OK', onPress: this.props.clearErrorMessage }
      ]);
    }
  }

  _renderLogin() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.userIsAuthenticated !== true}
          >
          <LoginScreen {...this.props}/>
        </Modal>
      </View>
    )
  }

  _renderTabs() {
    return (
      <TabBarIOS barTintColor="black" tintColor="white" style={styles.tabBarNavigator} >
        <TabBarIOS.Item
          title="My Requests"
          selected={this.state.selectedTab === Tabs.my_requests}
          onPress={() => {
            this.setState({
              selectedTab: Tabs.my_requests,
            });
          }}>
          <ServiceRequestNavigation />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Teams'
          selected={this.state.selectedTab === Tabs.teams}
          onPress={() => {
            this.setState({
              selectedTab: Tabs.teams,
            });
          }}>
          <TeamNavigation />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Sync'
          selected={this.state.selectedTab === Tabs.sync}
          onPress={() => {
            this.setState({
              selectedTab: Tabs.sync,
            });
          }} >
          <SyncNavigation />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
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
            networkActivityIndicatorVisible={this.props.apiRequestInProgress}
          />
          {content}
        </View>
      );
  }
}

ProviderResponseApp.propTypes = {
  apiRequestInProgress: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  userIsAuthenticated: PropTypes.bool,
}

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
});