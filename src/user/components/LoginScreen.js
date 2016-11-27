import React, { Component, PropTypes } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Checkbox,
  GradientBackground,
  InvertButton,
  InvertText,
  InvertTextInput,
  X_AXIS_PADDING,
} from '../../shared';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      showPassword: false,
    };

    this._submitForm = this._submitForm.bind(this);
    this._toggleShowPassword = this._toggleShowPassword.bind(this);
  }

  _toggleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  _submitForm() {
    this.props.submitLoginCredentials(this.state.email, this.state.password);
  }

  render() {
    return (
      <GradientBackground style={styles.container}>
        <View style={styles.wrapper}>
          <InvertTextInput
            style={styles.loginModalInput}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize={'none'}
            keyboardType="email-address"
            placeholder="Email"
            value={this.state.email}
          />
          <InvertTextInput
            style={styles.loginModalInput}
            onChangeText={(password) => this.setState({ password })}
            autoCapitalize={'none'}
            secureTextEntry={!this.state.showPassword}
            placeholder="Password"
            value={this.state.password}
          />
          <View style={styles.showPassword}>
            <TouchableOpacity onPress={this._toggleShowPassword}>
              <Checkbox checked={this.state.showPassword} />
            </TouchableOpacity>
            <InvertText>Show Password</InvertText>
          </View>
          <InvertButton onPress={this._submitForm}>
            Login
          </InvertButton>
        </View>
      </GradientBackground>
    );
  }
}

LoginScreen.propTypes = {
  submitLoginCredentials: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    justifyContent: 'center',
  },
  loginModalInput: {
    marginBottom: 15,
  },
  showPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  wrapper: { // Transparent wrapper for the text
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
