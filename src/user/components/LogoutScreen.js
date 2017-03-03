import React, { PropTypes } from 'react';

import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  InvertButton,
  InvertText,
  GradientBackground,
  Navigation,
  Separator,
  LIGHT_BLUE,
  X_AXIS_PADDING,
} from '../../shared';

import iconName from './img/icon_logout_name.png';
import iconEmail from './img/icon_logout_email.png';

function LogoutScene({ logoutUser, name, email }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View>
          <Text style={[styles.text, styles.header]}>Logged In</Text>
        </View>
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
      <InvertButton onPress={logoutUser} withBorder>
        Log Out
      </InvertButton>
    </View>
  );
}

LogoutScene.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default function LogoutScreen({ logoutUser, name, email }) {
  const initialRoute = {
    title: 'User',
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
    paddingLeft: X_AXIS_PADDING - 15,
    paddingRight: X_AXIS_PADDING - 15,
    justifyContent: 'space-around',
  },
  card: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 20,
    marginTop: 25,

    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
  },
  header: {
    alignSelf: 'center',
    fontSize: 25,
    paddingBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    marginBottom: 30,
    marginTop: 10,
    backgroundColor: LIGHT_BLUE,
  },
  text: {
    paddingLeft: 20,
    fontSize: 16,
    color: LIGHT_BLUE,
  }
});
