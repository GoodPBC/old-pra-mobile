import React, { PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import SectionWithIcon from './SectionWithIcon';
import ShortFormLocation from './ShortFormLocation';
import LongFormLocation from './LongFormLocation';
import locationIcon from './img/location-icon-active.png';

export default function AddressSection({ serviceRequest, fullLength }) {
  return (
    <SectionWithIcon icon={locationIcon}>
      {fullLength ? <LongFormLocation serviceRequest={serviceRequest} />
        : <ShortFormLocation serviceRequest={serviceRequest} />}
    </SectionWithIcon>
  );
}

AddressSection.propTypes = {
  fullLength: PropTypes.bool,
  serviceRequest: PropTypes.object.isRequired,
};