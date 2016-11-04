import React, { Component, PropTypes } from 'react';

import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
  Text,
  View
} from 'react-native';

import ServiceRequestList from './ServiceRequestList';
import ServiceRequestDetail from './ServiceRequestDetail';
import MyRequests from '../containers/MyRequests';

import LoginScreen from './LoginScreen';
import CurrentTeamScreen from '../containers/CurrentTeamScreen';
import Feed from './Feed';
import Sync from './Sync';

const Tabs = {
  my_requests: 0,
  feed: 1,
  teams: 2,
};

export default class ProviderResponseApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: Tabs.my_requests,
    };
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
          <NavigatorIOS
            initialRoute = {{
              component: MyRequests,
              title: 'My Requests'
            }}
            style={{flex: 1}}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Feed'
          selected={this.state.selectedTab === Tabs.feed}
          onPress={() => {
            this.setState({
              selectedTab: Tabs.feed,
            });
          }}>
          <NavigatorIOS
            initialRoute = {{
              component: Feed,
              title: 'Feed'
            }}
            style={{flex: 1}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Teams'
          selected={this.state.selectedTab === Tabs.teams}
          onPress={() => {
            this.setState({
              selectedTab: Tabs.teams,
            });
          }}>
          <NavigatorIOS
            initialRoute = {{
              component: CurrentTeamScreen,
              title: 'Teams'
            }}
            style={{flex: 1}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Sync' selected={false} >
          <NavigatorIOS
            initialRoute = {{
              component: Sync,
              title: 'Sync'
            }}
          />
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
          {content}
        </View>
      );
  }
}

ProviderResponseApp.propTypes = {
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