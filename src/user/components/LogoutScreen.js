import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';
import Button from '../../shared/components/Button';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button onPress={this.props.logoutUser}>
          Logout
        </Button>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
