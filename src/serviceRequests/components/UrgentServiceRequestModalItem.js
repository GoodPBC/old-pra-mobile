import React, { Component } from 'react';

import { StyleSheet, View, Text } from 'react-native';

export default class UrgentServiceRequestModalItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const serviceRequest = this.props.serviceRequest;
    return(
      <View style={styles.container}>
        <Text>{serviceRequest.sr_number}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5
  }
})