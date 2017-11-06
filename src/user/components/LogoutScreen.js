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
  BODY_BACKGROUND,
  CARD_BORDER,
  X_AXIS_PADDING,
} from '../../shared';

import iconName from './img/icon_logout_name.png';
import iconEmail from './img/icon_logout_email.png';

class LogoutScene extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { logoutUser, user } = this.props;
    logoutUser(user);
  }

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View>
            <Text style={[styles.text, styles.header]}>Logged In</Text>
          </View>
          <View style={styles.row}>
            <Image source={iconName} />
            <InvertText style={styles.text}>{user.name}</InvertText>
          </View>
          <Separator style={styles.separator} />
          <View style={styles.row}>
            <Image source={iconEmail} />
            <InvertText style={styles.text}>{user.email}</InvertText>
          </View>
          <Separator style={styles.separator} />
        </View>
        <InvertButton onPress={this.handleLogout} withBorder>
          Log Out
        </InvertButton>
      </View>
    );
  }
}

LogoutScene.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default function LogoutScreen({ logoutUser, user }) {
  const initialRoute = {
    title: 'User',
    index: 0,
  };

  return (
    <Navigation
      initialRoute={initialRoute}
      renderScene={() => <LogoutScene logoutUser={logoutUser} user={user} />}
      onBack={() => {}}
    />
  );
}

LogoutScreen.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BODY_BACKGROUND,
    flex: 1,
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    justifyContent: 'space-around',
  },
  card: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 20,
    marginTop: 25,
    borderRadius: 4,
    borderColor: CARD_BORDER,
    borderWidth: 1,
    backgroundColor: 'white'
    /*
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    */
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
    fontSize: 16,
    color: LIGHT_BLUE,
  }
});
