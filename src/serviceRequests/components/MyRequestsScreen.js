import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';

import ServiceRequestList from './ServiceRequestList';
import ServiceRequestDetailScreen from './ServiceRequestDetailScreen';

export default class MyRequestsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchServiceRequests();
  }

  _goToDetail(serviceRequest) {
    this.props.navigator.push({
      component: ServiceRequestDetailScreen,
      title: `SR# ${serviceRequest['original_request_number']}`,
      passProps: {
        serviceRequest,
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ServiceRequestList
          goToDetails={this._goToDetail.bind(this)}
          serviceRequests={this.props.serviceRequests} />
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