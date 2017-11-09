import React, { Component, PropTypes } from 'react';

import {
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import {
  InvertButton,
  InvertText,
  InvertTextInput,
  Radio,
  ImageContainer,
  Separator,
  X_AXIS_PADDING,
} from '../../shared';

import loginBackgroundImage from './img/LoginBackground.png';
import logoImage from './img/NYC_DHS-Logo.png';
import OfflineBanner from '../../offline/components/OfflineBanner';
import LoginSpinner from './LoginSpinner';

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

  _enableLoginButton() {
    return (this.state.password && this.state.password.length)
        && (this.state.email && this.state.email.length)
        && (this.props.networkIsConnected);
  }

  _toggleShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  _submitForm() {
    this.props.submitLoginCredentials(this.state.email, this.state.password);
  }

  render() {
    return (
      <ImageContainer>
        {!this.props.networkIsConnected && <OfflineBanner />}
        <View style={styles.wrapper}>
        {this.props.apiRequestInProgress && !this.props.userIsAuthenticated ? <LoginSpinner /> : null}
          <Image resizeMode="contain" source={logoImage} style={styles.logo} />
          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <InvertTextInput
              style={styles.loginModalInput}
              onChangeText={(email) => this.setState({ email })}
              autoCorrect={false}
              autoCapitalize={'none'}
              placeholder="User ID"
              value={this.state.email}
            />
            <InvertTextInput
              style={styles.loginModalInput}
              onChangeText={(password) => this.setState({ password })}
              autoCorrect={false}
              autoCapitalize={'none'}
              secureTextEntry={!this.state.showPassword}
              placeholder="Password"
              value={this.state.password}
            />
            <View style={styles.showPassword}>
              <TouchableOpacity style={styles.showPasswordRadio} onPress={this._toggleShowPassword}>
                <Radio checked={this.state.showPassword} />
              </TouchableOpacity>
              <InvertText>Show Password</InvertText>
            </View>
            <InvertButton
              disabled={!this._enableLoginButton()}
              onPress={this._submitForm}>
              Login
            </InvertButton>
          </KeyboardAvoidingView>
        </View>
      </ImageContainer>
    );
  }
}

LoginScreen.propTypes = {
  submitLoginCredentials: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  form: {},
  loginModalInput: {
    marginBottom: 15,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 40,
    width: 300
  },
  showPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  showPasswordRadio: {
    marginRight: 7
  },
  wrapper: { // Transparent wrapper for the text
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
  },
});
