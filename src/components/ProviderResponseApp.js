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
import Teams from './Teams';
import Feed from './Feed';
import Sync from './Sync';

export default class ProviderResponseApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userIsAuthenticated: false,
    }
  }

  _renderLogin() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.userIsAuthenticated !== true}
          >
          <LoginScreen {...this.props}/>
        </Modal>
      </View>
    )
  }

  _renderTabs() {
    return (
      <TabBarIOS barTintColor="black" tintColor="white" style={styles.tabBarNavigator} >
        <TabBarIOS.Item title="My Requests" selected={true} >
          <NavigatorIOS
            initialRoute = {{
              component: MyRequests,
              title: 'My Requests'
            }}
            style={{flex: 1}}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Feed' selected={false} >
          <NavigatorIOS
            initialRoute = {{
              component: Feed,
              title: 'Feed'
            }}
            style={{flex: 1}}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Teams' selected={false} >
          <NavigatorIOS
            initialRoute = {{
              component: Teams,
              title: 'Teams'
            }}
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