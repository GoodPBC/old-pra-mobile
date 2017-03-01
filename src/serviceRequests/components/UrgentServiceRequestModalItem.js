import React, { Component } from 'react';

import { StyleSheet, View, Text, Picker, TextInput } from 'react-native';

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
    let data = {
      sr_number: this.props.serviceRequest.sr_number,
      reason: this.state.reason,
      timeOnsite: this.state.timeOnsite
    }
    this.props.update(data)
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
                <Text style={styles.boldText}>Update SR:</Text>
              </View>
              <View>
                <Text>Actual time on site</Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={(text) => this.setState({ timeOnsite: text })}
                  value={this.state.timeOnsite}
                />
              </View>
            </View>
          )
        : null
        }
        <Button
          onPress={this.saveServiceRequest}
          style={styles.button}
          disabled={this.state.saved}
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
    marginTop: 5
  },
});