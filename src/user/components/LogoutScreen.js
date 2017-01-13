import React, { PropTypes } from 'react';

import {
  StyleSheet,
  View } from 'react-native';
import {
  InvertButton,
  InvertText,
  GradientBackground,
  Navigation,
  Separator,
  X_AXIS_PADDING,
} from '../../shared';

function LogoutScene({ logoutUser, name, email }) {
  return (
    <GradientBackground style={styles.container}>
      <View>
        <InvertText style={styles.text}>{name}</InvertText>
        <Separator />
        <InvertText style={styles.text}>{email}</InvertText>
        <Separator />
      </View>
      <InvertButton onPress={logoutUser}>
        Logout
      </InvertButton>
    </GradientBackground>
  );
}

LogoutScene.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default function LogoutScreen({ logoutUser, name, email }) {

  const initialRoute = {
    title: 'Log Out',
    index: 0,
  };

  return (
    <Navigation
      initialRoute={initialRoute}
      renderScene={() => <LogoutScene logoutUser={logoutUser} name={name} email={email} />}
      onBack={() => {}}
    />
  );
}

LogoutScreen.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    justifyContent: 'space-around',
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
  }
});
