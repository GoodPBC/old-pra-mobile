import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
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
  LIGHT_GRAY,
} from '../../shared';

import Icon from 'react-native-vector-icons/FontAwesome';

const ICON_SIZE = 22;

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
            <Icon style={styles.icon} name="bars" />
            <InvertText style={styles.text}>{user.name}</InvertText>
          </View>
          <Separator style={styles.separator} />
          <View style={styles.row}>
            <Icon style={styles.icon} name="envelope-o" />
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

export default LogoutScene;
// export default function LogoutScreen({ logoutUser, user }) {
//   const initialRoute = {
//     title: 'User',
//     index: 0,
//   };
//
//   return (
//     <Navigation
//       initialRoute={initialRoute}
//       renderScene={() => <LogoutScene logoutUser={logoutUser} user={user} />}
//       onBack={() => {}}
//     />
//   );
// }
//
// LogoutScreen.propTypes = {
//   user: PropTypes.object.isRequired,
//   logoutUser: PropTypes.func.isRequired,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BODY_BACKGROUND,
    paddingHorizontal: X_AXIS_PADDING,
  },
  card: {
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
    borderRadius: 4,
    borderColor: CARD_BORDER,
    borderWidth: 1,
    backgroundColor: 'white',
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
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: ICON_SIZE,
    color: LIGHT_GRAY,
    marginRight: 15,
  },
  separator: {
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: LIGHT_BLUE,
  },
  text: {
    fontSize: 16,
    color: LIGHT_BLUE,
  }
});
