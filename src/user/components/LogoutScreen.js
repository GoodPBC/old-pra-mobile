import React, { PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';
import { Button, X_AXIS_PADDING } from '../../shared';

export default function LoginScreen({ logoutUser }) {
  return (
    <View style={styles.container}>
      <Button onPress={logoutUser}>
        Logout
      </Button>
    </View>
  );
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
