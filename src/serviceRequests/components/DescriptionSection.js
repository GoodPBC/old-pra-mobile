import React from 'react';
import { StyleSheet, Text } from 'react-native';
import SectionWithIcon from './SectionWithIcon';
import { GRAY_TEXT } from '../../shared';

export default function DescriptionSection({ serviceRequest, numberOfLines }) {
  return (
    <SectionWithIcon icon={require('./img/info-icon-active.png')} header="Description">
      <Text
        style={styles.text}
        numberOfLines={numberOfLines}>{serviceRequest['complaint_details']}</Text>
    </SectionWithIcon>
  );
}

const styles = StyleSheet.create({
  text: {
    color: GRAY_TEXT,
  }
});