import React, { Component } from 'react';

import { StyleSheet, TabBarIOS, NavigatorIOS, Text, View } from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import ServiceRequestList from './ServiceRequestList';
import ServiceRequestDetail from './ServiceRequestDetail';

import Teams from './Teams';
import Feed from './Feed';
import Sync from './Sync';

export default class ProviderResponseApp extends Component {
  constructor(props) {
    super(props);

    // Fetch on initial app load.
    props.fetchServiceRequests();
  }

  render() {
    const serviceRequests = this.props;

    return (      
      <TabBarIOS barTintColor="black" tintColor="white" >
        <TabBarIOS.Item title="My Requests" selected={true} >
          <NavigatorIOS 
            initialRoute = {{
              component: ServiceRequestList,
              title: 'ServiceRequestList',
              passProps: serviceRequests
            }}
            
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item title='Feed' selected={false} >
          <NavigatorIOS 
            initialRoute = {{
              component: Feed,
              title: 'Feed'
            }}
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
      
    );
  }
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
});