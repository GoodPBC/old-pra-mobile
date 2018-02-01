import PropTypes from 'prop-types';
import React from 'react';
import {
  Linking,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Platform,
  ActionSheetIOS,
  Alert,
  Modal,
} from 'react-native';
import { formatLocationData, prioritizeLocationData } from '../helpers';
import MapIconActionSheet from '../containers/MapIconActionSheet';

function mapsURL(serviceRequest) {
  return `http://maps.apple.com/?q=${serviceRequest.address}+${serviceRequest.city}+${serviceRequest.state}`;
}

function hasFullAddress(serviceRequest) {
  return serviceRequest.address && serviceRequest.city && serviceRequest.state && serviceRequest.zip;
}

export default class LongFormLocation extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { serviceRequest } = this.props;
    /**
    * Display all available location fields, excluding those without data.
    */
    const { primaryLocation } = prioritizeLocationData(serviceRequest);
    const fieldNames = [
      'cross_streets',
      'city',
      'state',
      'zip',
      'borough',
      'location_details'
    ];
    const remainingFields = fieldNames.filter(fieldName => !!serviceRequest[fieldName] && fieldName !== primaryLocation);
    const textBlocks = remainingFields.map(fieldName => <Text key={fieldName}>{formatLocationData(serviceRequest, fieldName)}</Text>);

    return (
      <View style={styles.addressWrapper}>
        <View style={styles.content}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'flex-start' }}>
              <Text style={styles.primary}>{formatLocationData(serviceRequest, primaryLocation)}</Text>
              {textBlocks}
            </View>
            <MapIconActionSheet selectTab={this.props.selectTab} serviceRequest={serviceRequest} />
          </View>
        </View>
      </View>
    );
  }
}

LongFormLocation.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  selectTab: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  primary: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  secondary: {},
  addressWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    flex: 1
  },
});
