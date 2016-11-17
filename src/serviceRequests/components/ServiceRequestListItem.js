import React, { Component, PropTypes } from 'react';

import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import {
  LIGHT_BLUE,
  DARK_BLUE,
} from '../../shared';

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
            <View style={styles.contentSection}>
              <Text style={styles.bold}>{serviceRequest['onsite_status']['reported_at']}</Text>
            </View>
            <View style={styles.contentSection}>
              <Text style={styles.bold}>{serviceRequest['address']}</Text>
            </View>
            <View style={styles.contentSection}>
              <Text style={styles.descriptionHeader}>Description</Text>
              <Text numberOfLines={3}>{serviceRequest['complaint_details']}</Text>
            </View>
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
  }
});