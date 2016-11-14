import React, { Component, PropTypes } from 'react';

import { StyleSheet, TextInput, TouchableHighlight, Text, View } from 'react-native';

import SyncServiceRequestList from '../containers/SyncServiceRequestList';
import SyncButton from '../containers/SyncButton';

export default class SyncScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <SyncButton />
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
  }
});