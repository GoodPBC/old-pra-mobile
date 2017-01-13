import React, { PropTypes } from 'react';

import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {
  InvertButton,
  InvertText,
  GradientBackground,
  Navigation,
  Separator,
  X_AXIS_PADDING,
} from '../../shared';

import iconName from './img/icon_logout_name.png';
import iconEmail from './img/icon_logout_email.png';

function LogoutScene({ logoutUser, name, email }) {
  return (
    <GradientBackground style={styles.container}>
      <View>
        <View style={styles.row}>
          <Image source={iconName} />
          <InvertText style={styles.text}>{name}</InvertText>
        </View>
        <Separator style={styles.separator} />
        <View style={styles.row}>
          <Image source={iconEmail} />
          <InvertText style={styles.text}>{email}</InvertText>
        </View>
        <Separator style={styles.separator} />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    paddingLeft: 20,
  }
});
