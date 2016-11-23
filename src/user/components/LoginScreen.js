import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';
import { Button } from '../../shared';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    }
  }

  _submitForm() {
    this.props.submitLoginCredentials(this.state.email, this.state.password);
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <View style={styles.loginModal}>
          <Text>email</Text>
          <TextInput
            style={styles.loginModalInput}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize={'none'}
            value={this.state.email}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.loginModalInput}
            onChangeText={(password) => this.setState({ password })}
            autoCapitalize={'none'}
            value={this.state.password}
          />
          <Button onPress={this._submitForm.bind(this)}>
            Login
          </Button>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  submitLoginCredentials: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  loginModal: {
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40
  },
  loginModalInput: {
    marginTop: 0,
    marginBottom: 30,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1
  },
});
