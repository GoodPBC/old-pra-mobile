import React, { Component } from 'react';

import { StyleSheet, View, Text, Modal } from 'react-native';

export default class UrgentServiceRequestModal extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false,
    }

    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState(
      {modalVisible: visible}
    ); 
  }

  componentWillReceiveProps(nextProps) {
    if ( nextProps.urgentServiceRequests.length && nextProps.urgentServiceRequests.length > 0 ) {
      this.setModalVisible(true)
    }
  }

  render() {
    const urgentServiceRequests = this.props.urgentServiceRequests
    return(
      <View style={styles.container}>
        <Text>Urgent Service Requests are more than an hour old and need attention</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20
  }
})