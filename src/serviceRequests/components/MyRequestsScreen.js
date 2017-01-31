import React, { Component, PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';

import ServiceRequestList from '../containers/ServiceRequestList';
import EmptyServiceRequestList from './EmptyServiceRequestList';

export default class MyRequestsScreen extends Component {
  componentWillMount() {
    this.props.fetchServiceRequests();
  }

  render() {
    return (
      <View style={styles.container}>
      {this.props.serviceRequests === undefined || this.props.serviceRequests.length == 0 ?
        <EmptyServiceRequestList />
      : <ServiceRequestList navigator={this.props.navigator} enableFilters />
      }
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