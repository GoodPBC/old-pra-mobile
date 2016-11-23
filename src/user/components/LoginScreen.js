import React, { Component, PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';
import {
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
      password: null
    }

    this._submitForm = this._submitForm.bind(this);
  }

  _submitForm() {
    this.props.submitLoginCredentials(this.state.email, this.state.password);
  }

  render() {
    return (
      <GradientBackground style={styles.container}>
        <View style={styles.wrapper}>
          <InvertText>Email</InvertText>
          <InvertTextInput
            style={styles.loginModalInput}
            onChangeText={(email) => this.setState({ email })}
            autoCapitalize={'none'}
            value={this.state.email}
          />
          <InvertText>Password</InvertText>
          <InvertTextInput
            style={styles.loginModalInput}
            onChangeText={(password) => this.setState({ password })}
            autoCapitalize={'none'}
            value={this.state.password}
          />
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
    marginBottom: 30,
  },
  wrapper: { // Transparent wrapper for the text
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
