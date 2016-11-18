import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';
import { Button, X_AXIS_PADDING } from '../../shared';

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
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    justifyContent: 'center',
  }
});
