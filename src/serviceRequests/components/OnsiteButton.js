import React, { Component, PropTypes } from 'react';
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';

import {
  Button,
  Separator
} from '../../shared';

function confirmAndUpdateStatus(serviceRequest, updateOnsiteStatus) {
  const description = 'Are you sure you want to update this SR to status: on site?';
  Alert.alert(
    'Confirm On Site',
    description,
    [
      { text: 'Yes',
        onPress: () => {
          updateOnsiteStatus(serviceRequest);
      } },
      { text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
    ],
    { cancelable: true }
  );
}

export default class OnsiteButton extends Component {
  render() {
    const { serviceRequest, updatePending, updateOnsiteStatus } = this.props;
    let content = null;

    content = (
      <Button
        onPress={() => confirmAndUpdateStatus(serviceRequest, updateOnsiteStatus)}
        disabled={updatePending}>Tap To Go On Site</Button>
    );
    return (
      <View style={styles.container}>
        {content}
        <Separator />
      </View>
    );
  }
}

OnsiteButton.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  updatePending: PropTypes.string,
  updateOnsiteStatus: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  offContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingBottom: 10,
  },
  onsiteSwitch: {
    height: 25,
  },
  statusText: {
    width: 100,
    fontSize: 24,
  }
});