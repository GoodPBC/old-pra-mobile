import React, { Component } from 'react';

import { StyleSheet, ScrollView, View, Text, Modal, TouchableHighlight } from 'react-native';

import UrgentServiceRequestModalItem from './UrgentServiceRequestModalItem';

import { Button } from '../../shared';
import Separator from '../../shared/components/Separator';

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

  /*
  componentWillReceiveProps(nextProps) {
    if ( nextProps.urgentServiceRequests.length && nextProps.urgentServiceRequests.length > 0 ) {
      this.setModalVisible(true)
    }
  }
  */
  componentWillMount(){
    if ( this.props.urgentServiceRequests.length ) {
      this.setModalVisible(true)
    }
  }

  render() {
    const urgentServiceRequests = this.props.urgentServiceRequests
    return(
      <ScrollView style={styles.container}>
        <Button 
          onPress={this.props.dismissUrgentServiceRequests} 
          style={styles.button}
        >
          <Text>Dismiss Notification</Text>
        </Button>
        <Text>The following service requests are more than an hour old. Please provide additional information:</Text>
        <Separator style={styles.mainSeparator}/>
        {urgentServiceRequests.map( (serviceRequest, key) => {
          return (
            <View key={key}>
              <UrgentServiceRequestModalItem serviceRequest={serviceRequest} />
            <Separator />
            </View>
          )
        })
      }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    padding: 20,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'white'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 6,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15
  },
  mainSeparator: {
    marginTop: 4,
    marginBottom: 2
  }
})