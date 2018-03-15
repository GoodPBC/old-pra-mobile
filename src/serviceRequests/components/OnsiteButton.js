import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
} from 'react-native';

import {
  Button,
  Separator
} from '../../shared';


export default class OnsiteButton extends Component {
  constructor(props) {
    super(props);
    this.confirmAndUpdateStatus = this.confirmAndUpdateStatus.bind(this);
  }

  confirmAndUpdateStatus() {
    const { serviceRequest, updateOnsiteStatus } = this.props;
    const description = 'Are you sure you want to update this SR to status: on site?';
    Alert.alert(
      'Confirm On Site',
      description,
      [
        {
          text: 'Yes',
          onPress: () => { updateOnsiteStatus(serviceRequest); },
        },
        { text: 'No',
          onPress: () => { console.log('Cancel Pressed'); },
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Button onPress={this.confirmAndUpdateStatus}>
            On Site
          </Button>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Separator />
        </View>
      </View>
    );
  }
}

OnsiteButton.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  updateOnsiteStatus: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 20,
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
