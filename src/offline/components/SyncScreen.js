import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';

import SyncServiceRequestList from '../containers/SyncServiceRequestList';
import SyncButton from '../containers/SyncButton';
import {
  X_AXIS_PADDING,
} from '../../shared';

export default class SyncScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <SyncButton />
        </View>
        <SyncServiceRequestList navigator={this.props.navigator} />
      </View>
    );
  }
}

SyncScreen.propTypes = {
  navigator: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    paddingTop: 20,
    paddingBottom: 20,
  }
});