import React, { Component, PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';

import ServiceRequestList from '../containers/ServiceRequestList';

export default class MyRequestsScreen extends Component {
  componentWillMount() {
    this.props.fetchServiceRequests();
  }

  render() {
    return (
      <View style={styles.container}>
        <ServiceRequestList navigator={this.props.navigator} enableFilters />
      </View>
    );
  }
}

MyRequestsScreen.propTypes = {
  fetchServiceRequests: PropTypes.func.isRequired,
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
});