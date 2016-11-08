import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';

import ServiceRequestList from '../containers/ServiceRequestList';

export default class MyRequestsScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchServiceRequests();
  }

  _goToDetail(serviceRequest) {
    this.props.navigator.push({
      index: 1,
      title: `SR# ${serviceRequest['original_request_number']}`,
      serviceRequest,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ServiceRequestList
          onSelectServiceRequest={this._goToDetail.bind(this)} />
      </View>
    );
  }
}

MyRequestsScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});