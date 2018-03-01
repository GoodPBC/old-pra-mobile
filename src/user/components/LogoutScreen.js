import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  InvertButton,
  InvertText,
  Separator,
  LIGHT_BLUE,
  BODY_BACKGROUND,
  CARD_BORDER,
  X_AXIS_PADDING,
  LIGHT_GRAY,
} from '../../shared';
import Spinner from './LoginSpinner';

const ICON_SIZE = 22;

export default class LogoutScene extends React.Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { logoutUser, user } = this.props;
    logoutUser(user);
  }

  render() {
    const { user, apiRequestInProgress } = this.props;
    return (
      <View style={styles.container}>
        <Modal visible={apiRequestInProgress} transparent>
          <Spinner />
        </Modal>
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
  apiRequestInProgress: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

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
