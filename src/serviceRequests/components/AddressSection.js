import React, { PropTypes } from 'react';
import { StyleSheet, Text } from 'react-native';
import SectionWithIcon from './SectionWithIcon';
import locationIcon from './img/location-icon-active.png';

export default function AddressSection({ serviceRequest }) {
  return (
    <SectionWithIcon icon={locationIcon}>
      <Text style={styles.text}>{serviceRequest.address}</Text>
    </SectionWithIcon>
  );
}

AddressSection.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    fontWeight: 'bold',
  },
});