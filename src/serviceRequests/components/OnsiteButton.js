import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import SectionWithIcon from './SectionWithIcon';
import StatusWithTime from './StatusWithTime';

import iconResolved from './img/icon-resolved_star.png';
import {
  Separator
} from '../../shared';

function OnState({ serviceRequest }) {
  return (
    <View style={styles.offContainer}>
      <View style={{ flexDirection: 'column', flex: 3 }}>
        <Text style={styles.statusText}>On-Site</Text>
        <StatusWithTime serviceRequest={serviceRequest} />
      </View>
      <View style={{ flex: 1 }}>
        <Switch
          value
          disabled />
      </View>
    </View>
  );
}

function OffState({ serviceRequest, updateOnsiteStatus }) {
  return (
    <View style={styles.offContainer}>
      <View style={{ flexDirection: 'column' }}>
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
    <SectionWithIcon icon={iconResolved}>
        <Text style={styles.statusText}>Resolved</Text>
        <StatusWithTime serviceRequest={serviceRequest} />
    </SectionWithIcon>
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
        <Separator />
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
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
  },
  offContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 30,
  },
  statusText: {
    width: 100,
    fontSize: 20,
    fontWeight: 'bold',
  }
});