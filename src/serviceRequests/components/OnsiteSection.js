import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SectionWithIcon from './SectionWithIcon';
import OnsiteTime from './OnsiteTime';

export default function OnsiteSection({ serviceRequest }) {
  return (
    <SectionWithIcon icon={require('./img/time-icon-active.png')}>
      <OnsiteTime serviceRequest={serviceRequest} />
    </SectionWithIcon>
  );
}