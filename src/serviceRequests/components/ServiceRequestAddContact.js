import React, { Component, PropTypes } from 'react';

import { StyleSheet, View, ScrollView, Text, TextInput } from 'react-native';

import { Button } from '../../shared';

export default class ServiceRequestAddContact extends Component {

  constructor(props) {
    super(props);

    this.state = {
      description: null,
      location: null,
      tattoo: null,
      race: null,
      age: null,
      hair_color: null,
      observations: null,
      risk_assessment: null,
      placement: null,
      outcome: null
    };

    this._addContactToServiceRequest = this._addContactToServiceRequest.bind(this);
    this._onFinish = this._onFinish.bind(this);
  }

  _addContactToServiceRequest() {
    const contact = {
      service_request_id: this.props.serviceRequest.id,
      description: this.state.description,
      location: this.state.location,
      tattoo: this.state.tattoo,
      race: this.state.race,
      age: this.state.age,
      hair_color: this.state.hair_color,
      observations: this.state.observations,
      risk_assessment: this.state.risk_assessment,
      placement: this.state.placement,
      outcome: this.state.outcome
    };
    this.props.addContactToServiceRequest(contact);
    this._onFinish();
  }

  _onFinish() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container} >
        <ScrollView style={styles.detailsContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              multiline
              numberOfLines={3}
              value={this.state.description}
              style={styles.textInput}
              onChangeText={
                (text) => {
                  this.setState({
                    description: text
                  });
                }
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              value={this.state.location}
              style={styles.textInput}
              onChangeText={
                (text) => {
                  this.setState({
                    location: text
                  });
                }
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Tattoo</Text>
            <TextInput
              value={this.state.tattoo}
              style={styles.textInput}
              onChangeText={
                (text) => {
                  this.setState({
                    tattoo: text
                  });
                }
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Race</Text>
            <TextInput
              value={this.state.age}
              style={styles.textInput}
              onChangeText={
                (text) => {
                  this.setState({
                    age: text
                  });
                }
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Hair Color</Text>
            <TextInput
              value={this.state.hair_color}
              style={styles.textInput}
              onChangeText={
                (text) => {
                  this.setState({
                    hair_color: text
                  });
                }
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Observations</Text>
            <TextInput
              value={this.state.observations}
              style={styles.textInput}
              onChangeText={
                (text) => {
                  this.setState({
                    observations: text
                  });
                }
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Risk Assessment</Text>
            <TextInput
              value={this.state.risk_assessment}
              style={styles.textInput}
              onChangeText={
                (text) => {
                  this.setState({
                    risk_assessment: text
                  });
                }
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Placement</Text>
            <TextInput
              value={this.state.placement}
              style={styles.textInput}
              onChangeText={
                (text) => {
                  this.setState({
                    placement: text
                  });
                }
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Button onPress={ () => { this._addContactToServiceRequest(); } } >Add Contact</Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}


ServiceRequestAddContact.propTypes = {
  navigator: PropTypes.object.isRequired,
  addContactToServiceRequest: PropTypes.func.isRequired,
  serviceRequest: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 10,
  },
  formGroup: {
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold',
  },
  textInput: {
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 35,
  }
});