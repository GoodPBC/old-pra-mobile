import React, { Component, PropTypes } from 'react';

import { StyleSheet, TabBarIOS, NavigatorIOS, Modal, TextInput, TouchableHighlight, Text, View } from 'react-native';

import ServiceRequestList from './ServiceRequestList';
import ServiceRequestDetail from './ServiceRequestDetail';

import LoginScreen from './LoginScreen';
import Teams from './Teams';
import Feed from './Feed';
import Sync from './Sync';

export default class ProviderResponseApp extends Component {
  constructor(props) {
    super(props);

    // Fetch on initial app load.
    props.fetchServiceRequests();

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
        <TabBarIOS.Item title="My Requests" selected={false} >
          <ServiceRequestList serviceRequests={this.props.serviceRequests} />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Feed' selected={false} >
          <NavigatorIOS
            initialRoute = {{
              component: Feed,
              title: 'Feed'
            }}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Teams' selected={true} >
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
        <View style={styles.homeContainer}>
          {content}
        </View>
      );
  }
}

ProviderResponseApp.propTypes = {
  serviceRequests: PropTypes.array.isRequired,
  userIsAuthenticated: PropTypes.bool,
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  tabBarNavigator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
});