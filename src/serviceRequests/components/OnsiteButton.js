import React, { Component, PropTypes } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import OnsiteTime from './OnsiteTime';

export default class OnsiteButton extends Component {
  _renderOnState() {
    const { serviceRequest } = this.props;
    return <OnsiteTime serviceRequest={serviceRequest} />;
  }

  _renderPendingState() {
    const { serviceRequest } = this.props;

    return (
      <View style={styles.offContainer}>
        <Text>Pending</Text>
        <Switch
          value
          disabled={serviceRequest.pendingOnsite}
        />
      </View>
    );
  }

  _renderOffState() {
    const { serviceRequest, updateOnsiteStatus } = this.props;
    return (
      <View style={styles.offContainer}>
        <Text style={styles.onsiteText}>I&apos;m on site</Text>
        <Switch
          onValueChange={() => updateOnsiteStatus(serviceRequest)}
          disabled={serviceRequest.pendingOnsite} />
      </View>
    );
  }

  render() {
    const { serviceRequest } = this.props;
    let content = null;
    if (serviceRequest.onsite_status) {
      content = this._renderOnState();
    } else if (serviceRequest.pendingOnsite) {
      content = this._renderPendingState();
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

OnsiteButton.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  updateOnsiteStatus: PropTypes.func.isRequired,
};

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