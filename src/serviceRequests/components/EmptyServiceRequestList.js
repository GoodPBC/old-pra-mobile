import React, { Component, PropTypes } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { BODY_BACKGROUND } from '../../shared'

export default class EmptyServiceRequestList extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>You don't currently have any service request assignments. Please join a team to receive additional service requests.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: BODY_BACKGROUND
  },
  text: {
    textAlign: 'center'
  }
});