import React, { Component } from 'react';

import { StyleSheet, View, Text, Picker, TextInput, Platform } from 'react-native';

import { Button } from '../../shared';


export default class UrgentServiceRequestModalItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      reason: 'enroute',
      timeOnsite: null,
    };
    this.saveServiceRequest = this.saveServiceRequest.bind(this);
  }

  saveServiceRequest() {
    this.setState({
      saved: true
    });
    const data = {
      sr_number: this.props.serviceRequest.sr_number,
      reason: this.state.reason,
      timeOnsite: this.state.timeOnsite
    };
    this.props.update(data);
  }

  render() {
    const serviceRequest = this.props.serviceRequest;
    return (
      <View style={styles.container}>
        <Text style={styles.textItem}>
          <Text style={styles.boldText}>SR Number: </Text>{serviceRequest.sr_number}
        </Text>
        <Text style={styles.textItem}>
          <Text style={styles.boldText}>Location: </Text>{serviceRequest.complaint_details}
        </Text>
        <Text style={styles.textItem}>
          <Text style={styles.boldText}>Description: </Text>{serviceRequest.address}
        </Text>
        <Text style={styles.textItem}>What's your status?</Text>
        <Picker
          selectedValue={this.state.reason}
          onValueChange={(reas) => this.setState({ reason: reas })}
          mode="dropdown"
        >
          <Picker.Item label="Enroute" value="enroute" />
          <Picker.Item label="Stuck in Traffic" value="traffic" />
          <Picker.Item label="Forgot to Update" value="forgot" />
        </Picker>
        {this.state.reason === 'forgot'
        ? (
            <View>
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => this.setState({ timeOnsite: text })}
                  value={this.state.timeOnsite}
                  autoCorrect={false}
                  multiline
                  placeholder="Actual time you arrived on site"
                />
              </View>
            </View>
          )
        : null
        }
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
    marginBottom: 3
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