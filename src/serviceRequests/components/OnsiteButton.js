import React, { Component, PropTypes } from 'react';
import { StyleSheet, Switch, TouchableHighlight, Text, View } from 'react-native';

export default class OnsiteButton extends Component {
  _renderOnState() {
    const { serviceRequest, updateOnsiteStatus } = this.props;
    return <Text>ONSITE since {serviceRequest.onsite_status.reported_at}</Text>;
  }

  _renderOffState() {
    const { serviceRequest, updateOnsiteStatus } = this.props;
    return (
      <View style={styles.offContainer}>
        <Text style={styles.onsiteText}>I'm on site</Text>
        <Switch onValueChange={() => updateOnsiteStatus(serviceRequest)} />
      </View>
    );
  }

  render() {
    const { serviceRequest } = this.props;
    let content = null;
    if (serviceRequest.onsite_status) {
      content = this._renderOnState();
    } else {
      content = this._renderOffState();
    }
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  offContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  onsiteText: {
    width: 100,
    fontSize: 20,
    fontWeight: 'bold',
  }
});