import PropTypes from 'prop-types';
import React from 'react';

import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import DescriptionSection from './DescriptionSection';
import AddressSection from './AddressSection';
import TimeSection from './TimeSection';
import UnsyncedBanner from './UnsyncedBanner';
import {
  LIGHT_BLUE,
  DARK_BLUE,
  X_AXIS_PADDING,
} from '../../shared';
import detailArrow from './img/details-arrow-icon-inactive.png';

export default function ServiceRequestListItem({ serviceRequest, selectServiceRequest }){
  return (
    <TouchableHighlight
      onPress={() => selectServiceRequest(serviceRequest)}
      underlayColor={'lightgray'}>
      <View key={serviceRequest.id}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SR# {serviceRequest.sr_number}</Text>
        </View>
        <UnsyncedBanner serviceRequest={serviceRequest} />
        <View style={styles.contentWithArrow}>
          <View style={styles.content}>
            <TimeSection serviceRequest={serviceRequest} />
            <AddressSection serviceRequest={serviceRequest} />
            <DescriptionSection
              serviceRequest={serviceRequest}
              numberOfLines={3}
            />
          </View>
          <Image source={detailArrow} style={styles.detailArrow} />
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
  contentContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  contentWithArrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    maxHeight: 250,
    padding: 5,
    borderColor: 'lightgray',
    borderLeftWidth: 1,
  },
  contentSection: {
    padding: 5,
  },
  descriptionHeader: {
    color: LIGHT_BLUE,
  },
  detailArrow: {
    width: 30,
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