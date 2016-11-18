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

  render() {
    return (
      <View style={styles.container}>
        <ServiceRequestList navigator={this.props.navigator} />
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
    borderTopWidth: 1,
    borderTopColor: 'white',
  }
});