import React, { Component, PropTypes } from 'react';

import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import DescriptionSection from './DescriptionSection';
import AddressSection from './AddressSection';

import {
  LIGHT_BLUE,
  DARK_BLUE,
} from '../../shared';

function OnsiteTime({ serviceRequest }) {
  let content = null;
  if (serviceRequest['onsite_status']) {
    content = <Text style={styles.bold}>{serviceRequest['onsite_status']['reported_at']}</Text>;
  } else {
    content = <Text>Not onsite yet</Text>
  }

  return (
    <View style={styles.contentSection}>
      {content}
    </View>
  );
}

export default class ServiceRequestListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { serviceRequest, selectServiceRequest } = this.props;
    return (
      <TouchableHighlight
        onPress={() => selectServiceRequest(serviceRequest)}
        underlayColor={'gray'}>
        <View key={serviceRequest['id']}>
          <View style={styles.header}>
            <Text style={styles.headerText}>SR# {serviceRequest['original_request_number']}</Text>
          </View>
          <View style={styles.content}>
            <OnsiteTime serviceRequest={serviceRequest} />
            <AddressSection serviceRequest={serviceRequest} />
            <DescriptionSection
              serviceRequest={serviceRequest}
              numberOfLines={3} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

ServiceRequestListItem.propTypes = {
  selectServiceRequest: PropTypes.func.isRequired,
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  content: {
    padding: 5,
    borderColor: 'lightgray',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  contentSection: {
    padding: 5,
  },
  descriptionHeader: {
    color: LIGHT_BLUE,
  },
  header: {
    alignItems: 'center',
    backgroundColor: DARK_BLUE,
    paddingBottom: 5,
    paddingTop: 5,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  }
});