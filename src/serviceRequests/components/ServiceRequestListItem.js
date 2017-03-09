import React, { PropTypes } from 'react';

import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import DescriptionSection from './DescriptionSection';
import AddressSection from './AddressSection';
import TimeSection from './TimeSection';
import {
  LIGHT_BLUE,
  DARK_BLUE,
  X_AXIS_PADDING,
} from '../../shared';


export default function ServiceRequestListItem({ serviceRequest, selectServiceRequest }){
  return (
    <TouchableHighlight
      onPress={() => selectServiceRequest(serviceRequest)}
      underlayColor={'lightgray'}>
      <View key={serviceRequest.id}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SR# {serviceRequest.sr_number}</Text>
        </View>
        <View style={styles.content}>
          <TimeSection serviceRequest={serviceRequest} />
          <AddressSection serviceRequest={serviceRequest} />
          <DescriptionSection
            serviceRequest={serviceRequest}
            numberOfLines={3}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
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
    maxHeight: 250,
    padding: 5,
    paddingRight: X_AXIS_PADDING,
    borderColor: 'lightgray',
    borderLeftWidth: 1,
    borderRightWidth: 1
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
  },
});