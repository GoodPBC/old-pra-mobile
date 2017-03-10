import React, { PropTypes } from 'react';
import { StyleSheet, Text } from 'react-native';
import SectionWithIcon from './SectionWithIcon';
import { GRAY_TEXT } from '../../shared';
import infoIcon from './img/info-icon-inactive.png';

export default function DescriptionSection({ serviceRequest, numberOfLines }) {
  return (
    <SectionWithIcon icon={infoIcon} header="Description">
      <Text
        style={styles.text}
        numberOfLines={numberOfLines}
      >{serviceRequest.complaint_details}</Text>
    </SectionWithIcon>
  );
}

DescriptionSection.propTypes = {
  serviceRequest: PropTypes.object.isRequired,
  numberOfLines: PropTypes.number,
};

const styles = StyleSheet.create({
  text: {
    color: GRAY_TEXT,
  },
});