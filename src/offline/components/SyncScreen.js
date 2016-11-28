import React, { PropTypes } from 'react';

import { StyleSheet, View } from 'react-native';

import SyncServiceRequestList from '../containers/SyncServiceRequestList';
import SyncButton from '../containers/SyncButton';
import {
  X_AXIS_PADDING,
} from '../../shared';

export default function SyncScreen({ navigator }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <SyncButton />
      </View>
      <SyncServiceRequestList navigator={navigator} />
    </View>
  );
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
  },
});