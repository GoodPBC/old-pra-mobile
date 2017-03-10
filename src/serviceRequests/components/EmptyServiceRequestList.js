import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import { BODY_BACKGROUND } from '../../shared';

export default class EmptyServiceRequestList extends Component {

  render() {
    const { currentTeam } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>There are no active service requests for {currentTeam.name}.</Text>
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