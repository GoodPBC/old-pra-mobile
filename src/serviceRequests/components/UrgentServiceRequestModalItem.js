import React, { Component } from 'react';

import { StyleSheet, View, Text, Picker, TextInput, Platform } from 'react-native';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';


import { Button } from '../../shared';

import UrgentServiceRequestModalItemResolutionPicker from './UrgentServiceRequestModalItemResolutionPicker';

const RESPONSE_REASONS = {
  1: "Enroute",
  2: "Client Transport",
  3: "911 Call",
  4: "Inclement Weather",
  5: "Multiple 311 calls at once",
  6: "Traffic",
  7: "Unforeseen circumstances",
};

export default class UrgentServiceRequestModalItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reasonId: null,
      timeOnsite: null,
    };
    this.saveServiceRequest = this.saveServiceRequest.bind(this);
    this.updateServiceRequestReason = this.updateServiceRequestReason.bind(this);
  }

  saveServiceRequest() {
    const { sr_number } = this.props.serviceRequest;
    const { reasonId, timeOnsite } = this.state;
    const data = {
      sr_number,
      reasonId: Number(reasonId),
      reasonName: RESPONSE_REASONS[reasonId],
      timeOnsite,
    };
    this.props.update(data);
    this.setState({
      reasonId: null,
      timeOnsite: null
    })
  }

  updateServiceRequestReason(reasonId) {
    this.setState({ reasonId });
  }

  renderContent(title, content) {
    return (
      <Text style={styles.textItem}>
        <Text style={styles.boldText}>{title}: </Text>{content}
      </Text>
    );
  }

  render() {
    const { serviceRequest } = this.props;
    return (
      <View style={styles.container}>
        {this.renderContent('SR Number', serviceRequest.sr_number)}
        {this.renderContent('Location', serviceRequest.address)}
        {this.renderContent('Description', serviceRequest.complaint_details)}
        <Text style={styles.statusTextItem}>What's your status?</Text>
        <UrgentServiceRequestModalItemResolutionPicker
          responseReasons={RESPONSE_REASONS}
          updateServiceRequestReason={this.updateServiceRequestReason}
          selectedReasonId={this.state.reasonId}
        />
        <Button
          onPress={this.saveServiceRequest}
          style={styles.button}
        >
          <Text>Save Service Request</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10
  },
  textItem: {
    marginTop: 3,
    marginBottom: 3,
  },
  statusTextItem: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5
  },
  boldText: {
    fontWeight: 'bold'
  },
  picker: {
    height: 100
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 6,
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    marginTop: 25
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingLeft: 5,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,

  }
});
