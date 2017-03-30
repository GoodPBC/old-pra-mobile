import React, { PropTypes } from 'react';
import {
  Linking,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image
} from 'react-native';
import { formatLocationData, prioritizeLocationData } from '../helpers';

import mapIcon from './img/icon-map.png'

function mapsURL(serviceRequest) {
  return `http://maps.apple.com/?q=${serviceRequest.address}+${serviceRequest.city}+${serviceRequest.state}`;
}

function onClickAddress(serviceRequest) {
  const url = mapsURL(serviceRequest);
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URI: ${url}`);
    }
  });
}

function hasFullAddress(serviceRequest) {
  return serviceRequest.address && serviceRequest.city && serviceRequest.state && serviceRequest.zip;
}

export default function LongFormLocation({ serviceRequest }) {
  /**
   * Display all available location fields, excluding those without data.
   */
  const { primaryLocation } = prioritizeLocationData(serviceRequest);
  const fieldNames = ['cross_streets', 'city', 'state', 'zip', 'borough', 'location_details'];
  const remainingFields = fieldNames.filter(fieldName => !!serviceRequest[fieldName] && fieldName !== primaryLocation);
  const textBlocks = remainingFields.map(fieldName => <Text key={fieldName}>{formatLocationData(serviceRequest, fieldName)}</Text>);

  const content = (
    <View style={styles.addressWrapper}>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, alignSelf: 'flex-start' }}>
            <Text style={styles.primary}>{formatLocationData(serviceRequest, primaryLocation)}</Text>
            {textBlocks}
          </View>
          <Image source={mapIcon} style={{alignSelf: 'center'}}/>
        </View>
      </View>  
    </View>)
  ;
  if (hasFullAddress(serviceRequest)) {
    return (
      <TouchableOpacity onPress={() => onClickAddress(serviceRequest)}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

LongFormLocation.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
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