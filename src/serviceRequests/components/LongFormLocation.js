import React, { PropTypes } from 'react';
import {
  Linking,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
} from 'react-native';
import { formatLocationData, prioritizeLocationData } from '../helpers';

function mapsURL(serviceRequest) {
  return `http://maps.apple.com/?q=${encodeURIComponent(serviceRequest.address)}+${serviceRequest.city}`;
}

function onClickAddress(serviceRequest) {
  const url = mapsURL(serviceRequest);
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log('Don\'t know how to open URI: ' + url);
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
  const textBlocks = remainingFields.map(fieldName => {
    return <Text key={fieldName}>{formatLocationData(serviceRequest, fieldName)}</Text>;
  });

  const content = (
    <View>
      <Text style={styles.primary}>{formatLocationData(serviceRequest, primaryLocation)}</Text>
      {textBlocks}
    </View>)
  ;
  if (hasFullAddress(serviceRequest)) {
    return (
      <TouchableHighlight onPress={() => onClickAddress(serviceRequest)}>
        {content}
      </TouchableHighlight>
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
});