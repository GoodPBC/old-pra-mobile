import React, { Component, PropTypes } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

import StatusWithTime from './StatusWithTime';

function OnState({ serviceRequest }) {
  return (
    <View style={styles.offContainer}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.onsiteText}>On-Site</Text>
        <StatusWithTime serviceRequest={serviceRequest} />
      </View>
      <Switch
        value
        disabled />
    </View>
  );
}

function OffState({ serviceRequest, updateOnsiteStatus }) {
  return (
    <View style={styles.offContainer}>
      <View style={{flexDirection: 'column'}}>
        <Text style={styles.onsiteText}>On-Site</Text>
        <Text>Toggle when on-site</Text>
      </View>
      <Switch
        onValueChange={() => updateOnsiteStatus(serviceRequest)}
        disabled={serviceRequest.pendingOnsite} />
    </View>
  );
}

function PendingState({ serviceRequest }) {
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

function ResolvedState({ serviceRequest }) {
  return (
    <View>
      <Text>Resolved</Text>
      <StatusWithTime serviceRequest={serviceRequest} />
    </View>
  );
}

export default class OnsiteButton extends Component {
  render() {
    const { serviceRequest, updateOnsiteStatus } = this.props;
    let content = null;
    if (serviceRequest.resolution) {
      content = <ResolvedState serviceRequest={serviceRequest} />;
    } else if (serviceRequest.onsite_status) {
      content = <OnState serviceRequest={serviceRequest} />;
    } else if (serviceRequest.pendingOnsite) {
      content = <PendingState serviceRequest={serviceRequest} />;
    } else {
      content = <OffState serviceRequest={serviceRequest} updateOnsiteStatus={updateOnsiteStatus} />;
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