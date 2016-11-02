import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';

import ServiceRequestList from './ServiceRequestList';

export default class MyRequestsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchServiceRequests();
  }

  render() {
    return (
      <View style={styles.container}>
        <ServiceRequestList serviceRequests={this.props.serviceRequests} />
      </View>
    );
  }
}

MyRequestsScreen.propTypes = {
  serviceRequests: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});