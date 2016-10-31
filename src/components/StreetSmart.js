import React, { Component } from 'react';

import { StyleSheet, TabBarIOS, Text, View } from 'react-native';

import ServiceRequestList from './ServiceRequestList';

export default class StreetSmart extends Component {
  constructor(props) {
    super(props);

    // Fetch on initial app load.
    props.fetchServiceRequests();
  }

  render() {
    const {
      serviceRequests,
    } = this.props;

    return (
      <TabBarIOS
      barTintColor="black"
      tintColor="white">
        <TabBarIOS.Item
        title="My Requests"
        selected={true}>
        <ServiceRequestList serviceRequests={serviceRequests} />
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